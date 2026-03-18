"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eraser, Upload, Check } from "lucide-react";
import {
  SIGNATURE_COLORS,
  SIGNATURE_FONTS,
  type SignCreateMethod,
  type SignatureData,
  type SignPdfLabels,
  type SignatureColor,
} from "./sign-types";

interface SignCreateModalProps {
  open: boolean;
  target: "signature" | "initials";
  labels: SignPdfLabels;
  onSave: (data: SignatureData) => void;
  onClose: () => void;
}

// ─── Font Loader ────────────────────────────────────────────
const loadedFonts = new Set<string>();

function ensureFontsLoaded() {
  if (loadedFonts.size === SIGNATURE_FONTS.length) return;
  const families = SIGNATURE_FONTS.filter((f) => !loadedFonts.has(f.name)).map((f) => f.url);
  if (families.length === 0) return;

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${families.map((f) => `family=${f}`).join("&")}&display=swap`;
  document.head.appendChild(link);
  SIGNATURE_FONTS.forEach((f) => loadedFonts.add(f.name));
}

// ─── Crop transparent pixels ────────────────────────────────
function cropCanvas(src: HTMLCanvasElement): { dataUrl: string; w: number; h: number } | null {
  const ctx = src.getContext("2d");
  if (!ctx) return null;
  const { width: sw, height: sh } = src;
  const data = ctx.getImageData(0, 0, sw, sh).data;

  let top = sh, left = sw, right = 0, bottom = 0;
  for (let y = 0; y < sh; y++) {
    for (let x = 0; x < sw; x++) {
      if (data[(y * sw + x) * 4 + 3] > 10) {
        if (y < top) top = y;
        if (y > bottom) bottom = y;
        if (x < left) left = x;
        if (x > right) right = x;
      }
    }
  }
  if (right <= left || bottom <= top) return null;

  const pad = 8;
  const cx = Math.max(0, left - pad);
  const cy = Math.max(0, top - pad);
  const cw = Math.min(sw, right - left + pad * 2);
  const ch = Math.min(sh, bottom - top + pad * 2);

  const out = document.createElement("canvas");
  out.width = cw;
  out.height = ch;
  const oc = out.getContext("2d")!;
  oc.drawImage(src, cx, cy, cw, ch, 0, 0, cw, ch);
  return { dataUrl: out.toDataURL("image/png"), w: cw, h: ch };
}

// ─── Text to Image ──────────────────────────────────────────
function textToSignatureImage(
  text: string,
  fontCss: string,
  color: string,
): { dataUrl: string; w: number; h: number } | null {
  if (!text.trim()) return null;
  const fontSize = 64;
  const c = document.createElement("canvas");
  const ctx = c.getContext("2d")!;
  ctx.font = `${fontSize}px ${fontCss}`;
  const m = ctx.measureText(text);
  const w = Math.ceil(m.width) + 24;
  const h = fontSize + 24;
  c.width = w * 2;
  c.height = h * 2;
  const ctx2 = c.getContext("2d")!;
  ctx2.scale(2, 2);
  ctx2.font = `${fontSize}px ${fontCss}`;
  ctx2.fillStyle = color;
  ctx2.textBaseline = "middle";
  ctx2.fillText(text, 12, h / 2);
  return cropCanvas(c) ?? { dataUrl: c.toDataURL("image/png"), w: w * 2, h: h * 2 };
}

// ─── Component ──────────────────────────────────────────────
export function SignCreateModal({ open, target, labels, onSave, onClose }: SignCreateModalProps) {
  const [tab, setTab] = useState<SignCreateMethod>("draw");
  const [color, setColor] = useState<SignatureColor>("#000000");

  // Draw state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef(false);
  const hasContentRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);

  // Type state
  const [typeText, setTypeText] = useState("");
  const [selectedFont, setSelectedFont] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);

  // Image state
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploadedSize, setUploadedSize] = useState({ w: 0, h: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load fonts when type tab is selected
  useEffect(() => {
    if (tab !== "type" || fontsReady) return;
    ensureFontsLoaded();
    const promises = SIGNATURE_FONTS.map((f) =>
      document.fonts.load(`48px ${f.css}`).catch(() => {}),
    );
    Promise.all(promises).then(() => setFontsReady(true));
  }, [tab, fontsReady]);

  // Clear canvas when opened
  useEffect(() => {
    if (!open) return;
    setTab("draw");
    setTypeText("");
    setUploadedImage(null);
    hasContentRef.current = false;
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
    }, 50);
    return () => clearTimeout(timer);
  }, [open]);

  // ─── Drawing Handlers ──────────────────────────────────────
  const getCanvasPoint = useCallback((canvas: HTMLCanvasElement, clientX: number, clientY: number) => {
    const rect = canvas.getBoundingClientRect();
    return { x: clientX - rect.left, y: clientY - rect.top };
  }, []);

  const startDrawing = useCallback((clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    isDrawingRef.current = true;
    const pt = getCanvasPoint(canvas, clientX, clientY);
    lastPointRef.current = pt;
    const ctx = canvas.getContext("2d")!;
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
  }, [color, getCanvasPoint]);

  const continueDrawing = useCallback((clientX: number, clientY: number) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const pt = getCanvasPoint(canvas, clientX, clientY);
    const last = lastPointRef.current;
    if (last) {
      const midX = (last.x + pt.x) / 2;
      const midY = (last.y + pt.y) / 2;
      ctx.quadraticCurveTo(last.x, last.y, midX, midY);
      ctx.stroke();
    }
    lastPointRef.current = pt;
    hasContentRef.current = true;
  }, [getCanvasPoint]);

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
    lastPointRef.current = null;
  }, []);

  const handleMouseDown = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    startDrawing(e.clientX, e.clientY);
  }, [startDrawing]);

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLCanvasElement>) => {
    continueDrawing(e.clientX, e.clientY);
  }, [continueDrawing]);

  const handleMouseUp = useCallback(() => stopDrawing(), [stopDrawing]);

  const handleTouchStart = useCallback((e: ReactTouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrawing(touch.clientX, touch.clientY);
  }, [startDrawing]);

  const handleTouchMove = useCallback((e: ReactTouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    continueDrawing(touch.clientX, touch.clientY);
  }, [continueDrawing]);

  const handleTouchEnd = useCallback(() => stopDrawing(), [stopDrawing]);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasContentRef.current = false;
  }, []);

  // ─── Image Upload ──────────────────────────────────────────
  const handleImageUpload = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        let w = img.width;
        let h = img.height;
        const MAX = 800;
        if (w > MAX || h > MAX) {
          const ratio = Math.min(MAX / w, MAX / h);
          w = Math.round(w * ratio);
          h = Math.round(h * ratio);
        }
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        const ctx = c.getContext("2d")!;
        ctx.drawImage(img, 0, 0, w, h);
        setUploadedImage(c.toDataURL("image/png"));
        setUploadedSize({ w, h });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleImageUpload(file);
  }, [handleImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  }, [handleImageUpload]);

  // ─── Save ──────────────────────────────────────────────────
  const handleSave = useCallback(() => {
    let result: { dataUrl: string; w: number; h: number } | null = null;
    const method = tab;

    if (tab === "draw") {
      const canvas = canvasRef.current;
      if (!canvas || !hasContentRef.current) return;
      result = cropCanvas(canvas);
    } else if (tab === "type") {
      if (!typeText.trim()) return;
      const font = SIGNATURE_FONTS[selectedFont];
      result = textToSignatureImage(typeText, font.css, color);
    } else if (tab === "image") {
      if (!uploadedImage) return;
      result = { dataUrl: uploadedImage, w: uploadedSize.w, h: uploadedSize.h };
    }

    if (!result) return;

    onSave({
      id: `sig_${Date.now()}`,
      imageDataUrl: result.dataUrl,
      method,
      width: result.w,
      height: result.h,
    });
  }, [tab, typeText, selectedFont, color, uploadedImage, uploadedSize, onSave]);

  // ─── Render ────────────────────────────────────────────────
  if (!open) return null;

  const title = target === "signature" ? labels.createSignature : labels.createInitials;
  const tabs: { key: SignCreateMethod; label: string }[] = [
    { key: "draw", label: labels.tabDraw },
    { key: "type", label: labels.tabType },
    { key: "image", label: labels.tabImage },
  ];

  const canSave =
    (tab === "draw" && hasContentRef.current) ||
    (tab === "type" && typeText.trim().length > 0) ||
    (tab === "image" && !!uploadedImage);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative mx-4 w-full max-w-lg rounded-xl bg-white shadow-2xl dark:bg-zinc-900"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 dark:hover:bg-zinc-800 dark:hover:text-zinc-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-200 dark:border-zinc-700">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    tab === t.key
                      ? "border-b-2 border-red-500 text-red-600 dark:text-red-400"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="px-6 py-5">
              {/* Draw Tab */}
              {tab === "draw" && (
                <div>
                  <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">{labels.drawHint}</p>
                  <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-zinc-300 bg-white dark:border-zinc-600">
                    <canvas
                      ref={canvasRef}
                      className="h-[200px] w-full cursor-crosshair touch-none"
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                      onTouchStart={handleTouchStart}
                      onTouchMove={handleTouchMove}
                      onTouchEnd={handleTouchEnd}
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <ColorPicker colors={SIGNATURE_COLORS} value={color} onChange={setColor} label={labels.colorLabel} />
                    <button
                      onClick={clearCanvas}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-zinc-500 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    >
                      <Eraser className="h-4 w-4" />
                      {labels.clearCanvas}
                    </button>
                  </div>
                </div>
              )}

              {/* Type Tab */}
              {tab === "type" && (
                <div>
                  <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">{labels.typeHint}</p>
                  <input
                    type="text"
                    value={typeText}
                    onChange={(e) => setTypeText(e.target.value)}
                    placeholder={labels.typePlaceholder}
                    className="mb-4 w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-zinc-900 outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus:border-red-500 dark:focus:ring-red-900/30"
                    autoFocus
                  />

                  {/* Font Style Label */}
                  <p className="mb-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {labels.fontStyleLabel}
                  </p>

                  <div className="mb-4 max-h-[200px] space-y-1.5 overflow-y-auto">
                    {SIGNATURE_FONTS.map((font, i) => (
                      <button
                        key={font.name}
                        onClick={() => setSelectedFont(i)}
                        className={`flex w-full items-center rounded-lg border px-4 py-3 transition-colors ${
                          selectedFont === i
                            ? "border-red-400 bg-red-50 dark:border-red-600 dark:bg-red-950/30"
                            : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              selectedFont === i
                                ? "border-red-500 bg-red-500"
                                : "border-zinc-300 dark:border-zinc-600"
                            }`}
                          >
                            {selectedFont === i && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <span
                            className="text-xl"
                            style={{
                              fontFamily: font.css,
                              color,
                              minHeight: "32px",
                              display: "inline-flex",
                              alignItems: "center",
                            }}
                          >
                            {typeText || labels.typePlaceholder}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  <ColorPicker colors={SIGNATURE_COLORS} value={color} onChange={setColor} label={labels.colorLabel} />
                </div>
              )}

              {/* Image Tab */}
              {tab === "image" && (
                <div>
                  <p className="mb-3 text-sm text-zinc-500 dark:text-zinc-400">{labels.uploadHint}</p>
                  {!uploadedImage ? (
                    <div
                      className="flex h-[200px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-zinc-300 bg-zinc-50 transition-colors hover:border-red-400 hover:bg-red-50/30 dark:border-zinc-600 dark:bg-zinc-800/50 dark:hover:border-red-600"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={handleDrop}
                    >
                      <Upload className="mb-2 h-8 w-8 text-zinc-400" />
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {labels.uploadButton}
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex items-center justify-center rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={uploadedImage}
                          alt="Signature"
                          className="max-h-[160px] max-w-full object-contain"
                        />
                      </div>
                      <button
                        onClick={() => {
                          setUploadedImage(null);
                          fileInputRef.current?.click();
                        }}
                        className="text-sm text-red-500 hover:text-red-600"
                      >
                        {labels.uploadButton}
                      </button>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-zinc-200 px-6 py-4 dark:border-zinc-700">
              <button
                onClick={onClose}
                className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
              >
                {labels.cancelButton}
              </button>
              <button
                onClick={handleSave}
                disabled={!canSave}
                className="rounded-lg bg-red-500 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {labels.saveButton}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

// ─── Color Picker ───────────────────────────────────────────
function ColorPicker({
  colors,
  value,
  onChange,
  label,
}: {
  colors: readonly string[];
  value: string;
  onChange: (c: SignatureColor) => void;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
      {colors.map((c) => (
        <button
          key={c}
          onClick={() => onChange(c as SignatureColor)}
          className={`h-7 w-7 rounded-full border-2 transition-transform ${
            value === c
              ? "scale-110 border-zinc-400 dark:border-zinc-300"
              : "border-transparent hover:scale-105"
          }`}
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  );
}
