"use client";

import { useRef, useEffect, useState, useCallback, useMemo, memo, startTransition } from "react";
import {
  Stage,
  Layer,
  Rect,
  Ellipse,
  Line,
  Text,
  Image as KImage,
  Transformer,
  Group,
} from "react-konva";
import type Konva from "konva";
import {
  generateId,
  measureTextWidth,
  measureTextSize,
  SYMBOL_MAP,
  type EditorElement,
  type EditorState,
  type FreehandElement,
  type PageData,
} from "./editor-types";
import type { EditorDispatch } from "./use-editor-store";

/* ── Props ──────────────────────────────────────────────────── */

interface PageCanvasProps {
  page: PageData;
  pageIndex: number;
  annotations: EditorElement[];
  state: EditorState;
  dispatch: EditorDispatch;
  scale: number;
  isVisible: boolean;
}

/* ── Component ──────────────────────────────────────────────── */

export function PageCanvas({
  page,
  pageIndex,
  annotations,
  state,
  dispatch,
  scale,
  isVisible,
}: PageCanvasProps) {
  const { activeTool, selectedElementId } = state;

  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const drawingRef = useRef<FreehandElement | null>(null);
  const lineStartRef = useRef<{ x: number; y: number } | null>(null);

  const [pageImg, setPageImg] = useState<HTMLImageElement | null>(null);
  const [editingTextId, setEditingTextId] = useState<string | null>(null);

  /* live position/size of text overlays during drag/transform */
  const liveTextRef = useRef<
    Record<string, { x: number; y: number; w: number; h: number }>
  >({});
  const [, forceOverlay] = useState(0);
  const tickOverlay = useCallback(() => forceOverlay((t) => t + 1), []);

  const stageWidth = page.width * scale;
  const stageHeight = page.height * scale;

  /* ── Load page image ──────────────────────────────────── */

  useEffect(() => {
    const img = new window.Image();
    img.onload = () => setPageImg(img);
    img.src = page.imageUrl;
    return () => {
      img.onload = null;
    };
  }, [page.imageUrl]);

  /* ── Transformer ──────────────────────────────────────── */

  useEffect(() => {
    const transformer = transformerRef.current;
    const stage = stageRef.current;
    if (!transformer || !stage) return;

    // Only activate for elements on THIS page
    const selectedOnThisPage =
      selectedElementId && annotations.some((a) => a.id === selectedElementId);

    if (selectedOnThisPage && activeTool === "select") {
      const node = stage.findOne(`#${selectedElementId}`);
      if (node) {
        transformer.nodes([node]);
        transformer.getLayer()?.batchDraw();
        return;
      }
    }
    transformer.nodes([]);
    transformer.getLayer()?.batchDraw();
  }, [selectedElementId, activeTool, annotations]);

  /* ── Coordinate conversion ────────────────────────────── */

  const stageToPage = useCallback(
    (sx: number, sy: number) => ({ x: sx / scale, y: sy / scale }),
    [scale],
  );

  /* ── Mouse Down ───────────────────────────────────────── */

  const handleStageMouseDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      const stage = stageRef.current;
      if (!stage) return;
      const pos = stage.getPointerPosition();
      if (!pos) return;
      const { x, y } = stageToPage(pos.x, pos.y);

      // Click on empty space → deselect
      if (e.target === stage || e.target.getParent()?.name() === "page-bg") {
        dispatch({ type: "SELECT_ELEMENT", id: null });
      }

      // Set active page
      if (state.activePageIndex !== pageIndex) {
        dispatch({ type: "SET_PAGE", index: pageIndex });
      }

      if (activeTool === "select") return;

      // Bounds check
      if (x < 0 || y < 0 || x > page.width || y > page.height) return;

      switch (activeTool) {
        case "text": {
          const defaults = state.textDefaults;
          const measuredWidth = measureTextWidth(
            "Text",
            defaults.fontSize,
            defaults.fontFamily,
            defaults.bold,
            defaults.italic,
          );
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "text",
              pageIndex,
              x,
              y,
              width: measuredWidth,
              height: state.textDefaults.fontSize,
              rotation: 0,
              opacity: 1,
              content: "Text",
              fontFamily: state.textDefaults.fontFamily,
              fontSize: state.textDefaults.fontSize,
              fontColor: state.textDefaults.fontColor,
              backgroundColor: state.textDefaults.backgroundColor,
              bold: state.textDefaults.bold,
              italic: state.textDefaults.italic,
              underline: state.textDefaults.underline,
              align: state.textDefaults.align,
            },
          });
          dispatch({ type: "SET_TOOL", tool: "select" });
          break;
        }

        case "rectangle":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "rectangle",
              pageIndex,
              x,
              y,
              width: 120,
              height: 80,
              rotation: 0,
              opacity: state.shapeDefaults.opacity,
              borderColor: state.shapeDefaults.borderColor,
              fillColor: state.shapeDefaults.fillColor,
              strokeWidth: state.shapeDefaults.strokeWidth,
            },
          });
          dispatch({ type: "SET_TOOL", tool: "select" });
          break;

        case "ellipse":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "ellipse",
              pageIndex,
              x: x - 60,
              y: y - 40,
              width: 120,
              height: 80,
              rotation: 0,
              opacity: state.shapeDefaults.opacity,
              borderColor: state.shapeDefaults.borderColor,
              fillColor: state.shapeDefaults.fillColor,
              strokeWidth: state.shapeDefaults.strokeWidth,
            },
          });
          dispatch({ type: "SET_TOOL", tool: "select" });
          break;

        case "line":
          lineStartRef.current = { x, y };
          break;

        case "freehand": {
          const el: FreehandElement = {
            id: generateId(),
            type: "freehand",
            pageIndex,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rotation: 0,
            opacity: 1,
            points: [x, y],
            strokeColor: state.drawDefaults.strokeColor,
            strokeWidth: state.drawDefaults.strokeWidth,
          };
          drawingRef.current = el;
          dispatch({ type: "ADD_ELEMENT", element: el });
          break;
        }

        default:
          break;
      }
    },
    [activeTool, pageIndex, page, state, stageToPage, dispatch],
  );

  /* ── Mouse Move ───────────────────────────────────────── */

  const handleStageMouseMove = useCallback(
    () => {
      if (activeTool === "freehand" && drawingRef.current) {
        const stage = stageRef.current;
        if (!stage) return;
        const pos = stage.getPointerPosition();
        if (!pos) return;
        const { x, y } = stageToPage(pos.x, pos.y);
        drawingRef.current.points = [...drawingRef.current.points, x, y];
        dispatch({
          type: "UPDATE_ELEMENT",
          id: drawingRef.current.id,
          changes: { points: [...drawingRef.current.points] },
        });
      }
    },
    [activeTool, stageToPage, dispatch],
  );

  /* ── Mouse Up ─────────────────────────────────────────── */

  const handleStageMouseUp = useCallback(() => {
    if (activeTool === "freehand" && drawingRef.current) {
      drawingRef.current = null;
    }
    if (activeTool === "line" && lineStartRef.current) {
      const stage = stageRef.current;
      if (!stage) return;
      const pos = stage.getPointerPosition();
      if (!pos) return;
      const { x, y } = stageToPage(pos.x, pos.y);
      const start = lineStartRef.current;

      if (Math.abs(x - start.x) > 5 || Math.abs(y - start.y) > 5) {
        dispatch({
          type: "ADD_ELEMENT",
          element: {
            id: generateId(),
            type: "line",
            pageIndex,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            rotation: 0,
            opacity: state.shapeDefaults.opacity,
            points: [start.x, start.y, x, y],
            strokeColor: state.shapeDefaults.borderColor,
            strokeWidth: state.shapeDefaults.strokeWidth,
          },
        });
      }
      lineStartRef.current = null;
      dispatch({ type: "SET_TOOL", tool: "select" });
    }
  }, [activeTool, pageIndex, state.shapeDefaults, stageToPage, dispatch]);

  /* ── Transform / Drag End ─────────────────────────────── */

  const handleTransformEnd = useCallback(
    (el: EditorElement, node: Konva.Node) => {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      const nodeX = node.x() / scale;
      const nodeY = node.y() / scale;
      node.scaleX(1);
      node.scaleY(1);

      if (el.type === "text") {
        const textPad = 10;
        // Reset hit-Rect scale that onTransform applied
        const rectChild = (node as unknown as Konva.Group).findOne?.("Rect");
        rectChild?.scaleX(1);
        rectChild?.scaleY(1);

        // Clear live overlay tracking
        delete liveTextRef.current[el.id];
        tickOverlay();

        // Compensate for padding offset (Group is offset by -textPad)
        const correctedX = (node.x() + textPad) / scale;
        const correctedY = (node.y() + textPad) / scale;

        const newWidth = Math.max(20, el.width * scaleX);
        const page = state.pages[el.pageIndex];
        const maxW = page ? page.width - correctedX : 9999;
        const clampedWidth = Math.min(newWidth, maxW);
        const { height: h } = measureTextSize(
          el.content,
          el.fontSize,
          el.fontFamily,
          el.bold,
          el.italic,
          clampedWidth,
        );
        // Force-sync Konva node so react-konva picks up correct state
        node.x(correctedX * scale - textPad);
        node.y(correctedY * scale - textPad);
        const rectChild2 = (node as unknown as Konva.Group).findOne?.("Rect");
        if (rectChild2) {
          rectChild2.width(clampedWidth * scale + textPad * 2);
          rectChild2.height(h * scale + textPad * 2);
        }

        dispatch({
          type: "UPDATE_ELEMENT",
          id: el.id,
          changes: {
            x: correctedX,
            y: correctedY,
            width: clampedWidth,
            height: h,
            rotation: node.rotation(),
            manualWidth: true,
          },
        });
      } else {
        const newWidth = Math.max(5, (el.width || 1) * scaleX);
        const newHeight = Math.max(5, (el.height || 1) * scaleY);
        dispatch({
          type: "UPDATE_ELEMENT",
          id: el.id,
          changes: {
            x: nodeX,
            y: nodeY,
            width: newWidth,
            height: newHeight,
            rotation: node.rotation(),
          },
        });
      }
    },
    [dispatch, scale, state.pages],
  );

  const handleTextTransform = useCallback(
    (el: EditorElement & { type: "text" }, group: Konva.Group) => {
      const textPad = 10;
      const scaleX = group.scaleX();
      const scaleY = group.scaleY();
      if (scaleX === 1 && scaleY === 1) return;

      const newWidth = Math.max(20, el.width * scaleX);
      const pg = state.pages[el.pageIndex];
      const correctedX = (group.x() + textPad) / scale;
      const maxW = pg ? pg.width - correctedX : 9999;
      const clampedWidth = Math.min(newWidth, maxW);

      const { height: h } = measureTextSize(
        el.content,
        el.fontSize,
        el.fontFamily,
        el.bold,
        el.italic,
        clampedWidth,
      );

      // Counter-scale the hit Rect so Transformer stays correct
      const invX = 1 / scaleX;
      const invY = 1 / scaleY;
      const rectNode = group.findOne("Rect") as Konva.Node | undefined;
      if (rectNode) {
        rectNode.scaleX(invX);
        rectNode.scaleY(invY);
        rectNode.width(clampedWidth * scale + textPad * 2);
        rectNode.height(h * scale + textPad * 2);
      }

      // Sync HTML overlay — position includes pad offset already
      liveTextRef.current[el.id] = {
        x: group.x() + textPad,
        y: group.y() + textPad,
        w: clampedWidth * scale,
        h: h * scale,
      };
      tickOverlay();
    },
    [scale, state.pages, tickOverlay],
  );

  const handleDragEnd = useCallback(
    (el: EditorElement, node: Konva.Node) => {
      // Clear live overlay tracking for text
      if (el.type === "text") {
        delete liveTextRef.current[el.id];
        tickOverlay();
      }
      const textPad = el.type === "text" ? 10 : 0;
      dispatch({
        type: "UPDATE_ELEMENT",
        id: el.id,
        changes: {
          x: (node.x() + textPad) / scale,
          y: (node.y() + textPad) / scale,
        },
      });
    },
    [dispatch, scale, tickOverlay],
  );

  /* ── Render Element ───────────────────────────────────── */

  const renderElement = useCallback(
    (el: EditorElement) => {
      const commonProps = {
        id: el.id,
        x: el.x * scale,
        y: el.y * scale,
        rotation: el.rotation,
        opacity: el.opacity,
        draggable: activeTool === "select",
        onClick: () => dispatch({ type: "SELECT_ELEMENT", id: el.id }),
        onTap: () => dispatch({ type: "SELECT_ELEMENT", id: el.id }),
        onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) =>
          handleDragEnd(el, e.target),
        onTransformEnd: (e: Konva.KonvaEventObject<Event>) =>
          handleTransformEnd(el, e.target),
      };

      switch (el.type) {
        case "rectangle":
          return (
            <Rect
              key={el.id}
              {...commonProps}
              width={el.width * scale}
              height={el.height * scale}
              fill={el.fillColor === "transparent" ? undefined : el.fillColor}
              stroke={el.borderColor}
              strokeWidth={el.strokeWidth}
            />
          );

        case "ellipse":
          return (
            <Ellipse
              key={el.id}
              {...commonProps}
              x={(el.x + el.width / 2) * scale}
              y={(el.y + el.height / 2) * scale}
              radiusX={(el.width / 2) * scale}
              radiusY={(el.height / 2) * scale}
              fill={el.fillColor === "transparent" ? undefined : el.fillColor}
              stroke={el.borderColor}
              strokeWidth={el.strokeWidth}
            />
          );

        case "line":
          return (
            <Line
              key={el.id}
              id={el.id}
              points={el.points.map((p) => p * scale)}
              stroke={el.strokeColor}
              strokeWidth={el.strokeWidth}
              opacity={el.opacity}
              draggable={activeTool === "select"}
              onClick={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              onTap={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              hitStrokeWidth={20}
            />
          );

        case "freehand":
          return (
            <Line
              key={el.id}
              id={el.id}
              points={el.points.map((p) => p * scale)}
              stroke={el.strokeColor}
              strokeWidth={el.strokeWidth}
              opacity={el.opacity}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              draggable={activeTool === "select"}
              onClick={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              onTap={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              hitStrokeWidth={20}
            />
          );

        case "text": {
          const textPad = 10;
          return (
            <Group
              key={el.id}
              {...commonProps}
              x={el.x * scale - textPad}
              y={el.y * scale - textPad}
              onTransform={(e: Konva.KonvaEventObject<Event>) =>
                handleTextTransform(el, e.target as unknown as Konva.Group)
              }
              onDragMove={(e: Konva.KonvaEventObject<DragEvent>) => {
                const n = e.target;
                liveTextRef.current[el.id] = {
                  x: n.x() + textPad,
                  y: n.y() + textPad,
                  w: el.width * scale,
                  h: el.height * scale,
                };
                tickOverlay();
              }}
              onDblClick={() => {
                setEditingTextId(el.id);
                dispatch({ type: "SELECT_ELEMENT", id: el.id });
              }}
              onDblTap={() => {
                setEditingTextId(el.id);
                dispatch({ type: "SELECT_ELEMENT", id: el.id });
              }}
            >
              {/* Invisible hit area — includes padding */}
              <Rect
                width={el.width * scale + textPad * 2}
                height={el.height * scale + textPad * 2}
                fill="rgba(0,0,0,0.001)"
              />
            </Group>
          );
        }

        case "symbol":
          return (
            <Text
              key={el.id}
              {...commonProps}
              text={SYMBOL_MAP[el.symbol]}
              fontSize={el.width * scale}
              fill={el.color}
            />
          );

        case "image":
          return (
            <ImageNode
              key={el.id}
              el={el}
              commonProps={commonProps}
              scale={scale}
            />
          );

        default:
          return null;
      }
    },
    [scale, activeTool, dispatch, handleDragEnd, handleTransformEnd, handleTextTransform, editingTextId, tickOverlay],
  );

  /* ── Cursor ───────────────────────────────────────────── */

  const cursorStyle = useMemo(() => {
    switch (activeTool) {
      case "select":
        return "default";
      case "text":
        return "text";
      default:
        return "crosshair";
    }
  }, [activeTool]);

  /* ── Non-visible placeholder ──────────────────────────── */

  if (!isVisible) {
    return (
      <div className="bg-white" style={{ width: stageWidth, height: stageHeight }}>
        {pageImg && (
          <img
            src={page.imageUrl}
            alt=""
            width={stageWidth}
            height={stageHeight}
            className="block"
          />
        )}
      </div>
    );
  }

  /* ── Render ───────────────────────────────────────────── */


  return (
    <div style={{ cursor: cursorStyle, position: "relative" }}>
      <Stage
        ref={stageRef}
        width={stageWidth}
        height={stageHeight}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
        onTouchStart={handleStageMouseDown}
        onTouchMove={handleStageMouseMove}
        onTouchEnd={handleStageMouseUp}
      >
        {/* Page background */}
        <Layer name="page-bg">
          <Rect width={stageWidth} height={stageHeight} fill="white" />
          {pageImg && (
            <KImage
              width={stageWidth}
              height={stageHeight}
              image={pageImg}
              listening={false}
            />
          )}
        </Layer>

        {/* Annotations */}
        <Layer>
          {annotations.map(renderElement)}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(_, newBox) => {
              const selEl = annotations.find(
                (a) => a.id === selectedElementId,
              );
              if (selEl?.type === "text") {
                const textPad = 10;
                // Box includes padding, subtract it for text measurement
                const contentWidth = Math.max(20, newBox.width - textPad * 2) / scale;
                const { height: h } = measureTextSize(
                  selEl.content,
                  selEl.fontSize,
                  selEl.fontFamily,
                  selEl.bold,
                  selEl.italic,
                  contentWidth,
                );
                return {
                  ...newBox,
                  width: Math.max(20 + textPad * 2, newBox.width),
                  height: h * scale + textPad * 2,
                };
              }
              return {
                ...newBox,
                width: Math.max(10, newBox.width),
                height: Math.max(10, newBox.height),
              };
            }}
            rotateEnabled
            enabledAnchors={
              annotations.find((a) => a.id === selectedElementId)?.type === "text"
                ? ["middle-left", "middle-right"]
                : [
                    "top-left",
                    "top-right",
                    "bottom-left",
                    "bottom-right",
                    "middle-left",
                    "middle-right",
                    "top-center",
                    "bottom-center",
                  ]
            }
            anchorFill="#3b82f6"
            anchorStroke="#2563eb"
            anchorStrokeWidth={1}
            anchorSize={8}
            borderStroke="#3b82f6"
            borderStrokeWidth={1.5}
          />
        </Layer>
      </Stage>

      {/* HTML text overlays — always DOM-rendered for sharpness */}
      {annotations
        .filter((a): a is Extract<EditorElement, { type: "text" }> => a.type === "text")
        .map((el) => {
          const live = liveTextRef.current[el.id];
          const tx = live ? live.x : el.x * scale;
          const ty = live ? live.y : el.y * scale;
          const tw = live ? live.w : el.width * scale;
          const th = live ? live.h : el.height * scale;
          const isEditing = editingTextId === el.id;
          const pad = 10;
          const hasBg = el.backgroundColor && el.backgroundColor !== "transparent";

          const textStyle: React.CSSProperties = {
            fontSize: el.fontSize * scale,
            fontFamily: el.fontFamily,
            fontWeight: el.bold ? "bold" : "normal",
            fontStyle: el.italic ? "italic" : "normal",
            textDecoration: el.underline ? "underline" : "none",
            textAlign: el.align as React.CSSProperties["textAlign"],
            color: el.fontColor,
            lineHeight: 1,
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            overflow: "hidden",
          };

          return (
            <div
              key={`txt-overlay-${el.id}`}
              style={{
                position: "absolute",
                left: tx - pad,
                top: ty - pad,
                padding: pad,
                backgroundColor: hasBg ? el.backgroundColor : undefined,
                opacity: el.opacity,
                pointerEvents: "none",
                transform: el.rotation ? `rotate(${el.rotation}deg)` : undefined,
                transformOrigin: `${pad}px ${pad}px`,
                zIndex: isEditing ? 10 : 1,
              }}
            >
              {isEditing ? (
                <EditingTextarea
                  initialContent={el.content}
                  elId={el.id}
                  dispatch={dispatch}
                  onDone={() => setEditingTextId(null)}
                  textStyle={textStyle}
                  width={tw}
                  height={th}
                  fixedWidth={!!el.manualWidth}
                  scale={scale}
                />
              ) : (
                <div
                  style={{
                    ...textStyle,
                    width: tw,
                    height: th,
                  }}
                >
                  {el.content}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

/* ── Image Node ─────────────────────────────────────────────── */

function ImageNode({
  el,
  commonProps,
  scale,
}: {
  el: Extract<EditorElement, { type: "image" }>;
  commonProps: Record<string, unknown>;
  scale: number;
}) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const image = new window.Image();
    image.onload = () => setImg(image);
    image.src = el.dataUrl;
  }, [el.dataUrl]);

  if (!img) return null;

  return (
    <KImage
      {...commonProps}
      image={img}
      width={el.width * scale}
      height={el.height * scale}
    />
  );
}

/* ── Editing Textarea (memo prevents re-render on content change) ── */

const EditingTextarea = memo(function EditingTextarea({
  initialContent,
  elId,
  dispatch,
  onDone,
  textStyle,
  width,
  fixedWidth,
  scale,
}: {
  initialContent: string;
  elId: string;
  dispatch: EditorDispatch;
  onDone: () => void;
  textStyle: React.CSSProperties;
  width: number;
  height: number;
  fixedWidth: boolean;
  scale: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef(initialContent);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      el.innerText = initialContent;
      el.focus();
      // Place cursor at end
      const sel = window.getSelection();
      if (sel) {
        sel.selectAllChildren(el);
        sel.collapseToEnd();
      }
    }
  }, []);

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      onBlur={() => {
        const el = ref.current;
        if (!el) return;
        const val = el.innerText ?? "";
        const h = el.scrollHeight / scale;
        if (val !== initialContent) {
          dispatch({
            type: "UPDATE_ELEMENT",
            id: elId,
            changes: { content: val, height: h },
          });
        }
        onDone();
      }}
      onInput={() => {
        const el = ref.current;
        if (!el) return;
        const val = el.innerText ?? "";
        contentRef.current = val;
        const h = el.scrollHeight / scale;
        startTransition(() => {
          dispatch({
            type: "UPDATE_ELEMENT",
            id: elId,
            changes: { content: val, height: h },
            skipHistory: true,
          });
        });
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          ref.current?.blur();
        }
      }}
      style={{
        ...textStyle,
        ...(fixedWidth ? { width } : { minWidth: width }),
        minHeight: textStyle.fontSize,
        outline: "none",
        pointerEvents: "auto",
        cursor: "text",
      }}
    />
  );
}, () => true); // Never re-render — fully uncontrolled DOM element
