"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
  memo,
} from "react";
import {
  Stage,
  Layer,
  Rect,
  Image as KImage,
  Text as KText,
  Transformer,
  Group,
} from "react-konva";
import type Konva from "konva";
import { Copy, Trash2 } from "lucide-react";
import type { SignElement, PageData, SignPdfLabels } from "./sign-types";
import type { SignDispatch } from "./use-sign-store";
import type { SignState } from "./sign-types";

/* ── Props ──────────────────────────────────────────────────── */

interface SignPageCanvasProps {
  page: PageData;
  pageIndex: number;
  elements: SignElement[];
  state: SignState;
  dispatch: SignDispatch;
  scale: number;
  isVisible: boolean;
  labels: SignPdfLabels;
}

/* ── Component ──────────────────────────────────────────────── */

export const SignPageCanvas = memo(function SignPageCanvas({
  page,
  pageIndex,
  elements,
  state,
  dispatch,
  scale,
  isVisible,
  labels,
}: SignPageCanvasProps) {
  const { selectedElementId } = state;

  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);

  const [pageImg, setPageImg] = useState<HTMLImageElement | null>(null);

  const stageWidth = page.width * scale;
  const stageHeight = page.height * scale;

  /* ── Load page image ──────────────────────────────────── */
  useEffect(() => {
    if (!isVisible) return;
    const img = new window.Image();
    img.src = page.imageUrl;
    img.onload = () => setPageImg(img);
    return () => {
      img.onload = null;
    };
  }, [page.imageUrl, isVisible]);

  /* ── Loaded element images ─────────────────────────────── */
  const [elImages, setElImages] = useState<Record<string, HTMLImageElement>>({});

  useEffect(() => {
    const needLoad = elements.filter(
      (e) => (e.type === "signature" || e.type === "initials") && !elImages[e.id],
    );
    if (needLoad.length === 0) return;

    const loaded: Record<string, HTMLImageElement> = {};
    let count = 0;

    for (const el of needLoad) {
      if (el.type !== "signature" && el.type !== "initials") continue;
      const img = new window.Image();
      img.src = el.imageDataUrl;
      img.onload = () => {
        loaded[el.id] = img;
        count++;
        if (count === needLoad.length) {
          setElImages((prev) => ({ ...prev, ...loaded }));
        }
      };
    }
  }, [elements, elImages]);

  /* ── Attach Transformer to selected node ───────────────── */
  useEffect(() => {
    const tr = transformerRef.current;
    if (!tr) return;
    const stage = stageRef.current;
    if (!stage) return;

    const selectedOnPage = selectedElementId
      ? elements.find((e) => e.id === selectedElementId)
      : null;

    if (selectedOnPage) {
      const node = stage.findOne(`#${selectedOnPage.id}`);
      if (node) {
        tr.nodes([node]);
        tr.getLayer()?.batchDraw();
        return;
      }
    }
    tr.nodes([]);
    tr.getLayer()?.batchDraw();
  }, [selectedElementId, elements]);

  /* ── Handle stage click (select / deselect) ────────────── */
  const handleStageClick = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      const target = e.target;
      // Click on empty area
      if (target === stageRef.current || target.name() === "page-bg" || target.name() === "page-img") {
        dispatch({ type: "SELECT_ELEMENT", id: null });
        return;
      }
      // Click on element
      const group = target.findAncestor("Group") || target;
      const id = group.id();
      if (id && elements.find((el) => el.id === id)) {
        dispatch({ type: "SELECT_ELEMENT", id });
      }
    },
    [dispatch, elements],
  );

  /* ── Handle drag end ───────────────────────────────────── */
  const handleDragEnd = useCallback(
    (e: Konva.KonvaEventObject<DragEvent>, el: SignElement) => {
      const node = e.target;
      dispatch({
        type: "UPDATE_ELEMENT",
        id: el.id,
        changes: {
          x: node.x() / scale,
          y: node.y() / scale,
        },
      });
    },
    [dispatch, scale],
  );

  /* ── Handle transform end ──────────────────────────────── */
  const handleTransformEnd = useCallback(
    (e: Konva.KonvaEventObject<Event>, el: SignElement) => {
      const node = e.target;
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      node.scaleX(1);
      node.scaleY(1);

      dispatch({
        type: "UPDATE_ELEMENT",
        id: el.id,
        changes: {
          x: node.x() / scale,
          y: node.y() / scale,
          width: Math.max(20, (node.width() * scaleX) / scale),
          height: Math.max(10, (node.height() * scaleY) / scale),
          rotation: node.rotation(),
        },
      });
    },
    [dispatch, scale],
  );

  /* ── Selected element for floating buttons ─────────────── */
  const selectedEl = selectedElementId
    ? elements.find((e) => e.id === selectedElementId)
    : null;

  const floatingPos = useMemo(() => {
    if (!selectedEl) return null;
    const x = selectedEl.x * scale;
    const y = selectedEl.y * scale;
    const w = selectedEl.width * scale;
    return { x: x + w / 2, y: y - 12 };
  }, [selectedEl, scale]);

  /* ── Render Element ────────────────────────────────────── */
  const renderElement = useCallback(
    (el: SignElement) => {
      const isSelected = el.id === selectedElementId;

      if (el.type === "signature" || el.type === "initials") {
        const img = elImages[el.id];
        if (!img) return null;

        return (
          <KImage
            key={el.id}
            id={el.id}
            image={img}
            x={el.x * scale}
            y={el.y * scale}
            width={el.width * scale}
            height={el.height * scale}
            rotation={el.rotation}
            opacity={el.opacity}
            draggable
            onDragEnd={(e) => handleDragEnd(e, el)}
            onTransformEnd={(e) => handleTransformEnd(e, el)}
            onClick={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
            onTap={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
          />
        );
      }

      // Text-based elements (name, date, text)
      const textEl = el as import("./sign-types").TextFieldElement;
      return (
        <Group
          key={el.id}
          id={el.id}
          x={el.x * scale}
          y={el.y * scale}
          width={el.width * scale}
          height={el.height * scale}
          rotation={el.rotation}
          opacity={el.opacity}
          draggable
          onDragEnd={(e) => handleDragEnd(e, el)}
          onTransformEnd={(e) => handleTransformEnd(e, el)}
          onClick={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
          onTap={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
        >
          {/* Background for text visibility */}
          <Rect
            width={el.width * scale}
            height={el.height * scale}
            fill="transparent"
            stroke={isSelected ? "#3B82F6" : "transparent"}
            strokeWidth={isSelected ? 1 : 0}
            dash={isSelected ? [4, 4] : undefined}
          />
          <KText
            text={textEl.content}
            width={el.width * scale}
            height={el.height * scale}
            fontSize={textEl.fontSize * scale}
            fontFamily={textEl.fontFamily}
            fill={textEl.fontColor}
            verticalAlign="middle"
            listening={false}
          />
        </Group>
      );
    },
    [selectedElementId, scale, elImages, handleDragEnd, handleTransformEnd, dispatch],
  );

  /* ── Skeleton when not visible ─────────────────────────── */
  if (!isVisible) {
    return (
      <div
        style={{ width: stageWidth, height: stageHeight }}
        className="bg-zinc-100 dark:bg-zinc-800"
      />
    );
  }

  return (
    <div className="relative" style={{ width: stageWidth, height: stageHeight }}>
      <Stage
        ref={stageRef}
        width={stageWidth}
        height={stageHeight}
        onClick={handleStageClick}
        onTap={handleStageClick}
      >
        {/* Page Background */}
        <Layer>
          <Rect
            name="page-bg"
            x={0}
            y={0}
            width={stageWidth}
            height={stageHeight}
            fill="white"
          />
          {pageImg && (
            <KImage
              name="page-img"
              image={pageImg}
              x={0}
              y={0}
              width={stageWidth}
              height={stageHeight}
              listening={false}
            />
          )}
        </Layer>

        {/* Elements */}
        <Layer>
          {elements.map(renderElement)}

          {/* Transformer */}
          <Transformer
            ref={transformerRef}
            rotateEnabled
            keepRatio={false}
            boundBoxFunc={(oldBox, newBox) => {
              if (newBox.width < 20 || newBox.height < 10) return oldBox;
              return newBox;
            }}
            enabledAnchors={[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
              "middle-left",
              "middle-right",
            ]}
            borderStroke="#3B82F6"
            anchorStroke="#3B82F6"
            anchorFill="white"
            anchorSize={8}
            anchorCornerRadius={2}
          />
        </Layer>
      </Stage>

      {/* Floating action buttons */}
      {selectedEl && floatingPos && (
        <div
          className="pointer-events-auto absolute z-10 flex gap-1 rounded-lg border border-zinc-200 bg-white px-1 py-0.5 shadow-md dark:border-zinc-700 dark:bg-zinc-800"
          style={{
            left: floatingPos.x,
            top: floatingPos.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <button
            onClick={() =>
              dispatch({ type: "DUPLICATE_ELEMENT", id: selectedEl.id })
            }
            className="rounded p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700"
            title={labels.duplicate}
          >
            <Copy className="h-4 w-4" />
          </button>
          <button
            onClick={() =>
              dispatch({ type: "DELETE_ELEMENT", id: selectedEl.id })
            }
            className="rounded p-1 text-zinc-500 hover:bg-red-50 hover:text-red-600 dark:text-zinc-400 dark:hover:bg-red-950/30 dark:hover:text-red-400"
            title={labels.deleteElement}
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
});
