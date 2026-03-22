"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback, useMemo, memo } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle as KCircle,
  Line,
  Text,
  Arrow as KArrow,
  Image as KImage,
  Transformer,
  Group,
} from "react-konva";
import type Konva from "konva";
import type {
  AnnotateElement,
  AnnotateState,
  FreehandElement as AnnotateFreehandElement,
  PageData,
  AnnotatePdfLabels,
} from "./annotate-types";
import {
  generateId,
  HIGHLIGHT_COLORS,
  STAMP_TEXT,
  STAMP_DEFAULT_COLORS,
  measureTextSize,
  measureTextWidth,
} from "./annotate-types";
import type { AnnotateDispatch } from "./use-annotate-store";

/* ── Props ──────────────────────────────────────────────────── */

interface AnnotatePageCanvasProps {
  page: PageData;
  pageIndex: number;
  annotations: AnnotateElement[];
  state: AnnotateState;
  dispatch: AnnotateDispatch;
  scale: number;
  isVisible: boolean;
}

/* ── Component ──────────────────────────────────────────────── */

export function AnnotatePageCanvas({
  page,
  pageIndex,
  annotations,
  state,
  dispatch,
  scale,
  isVisible,
}: AnnotatePageCanvasProps) {
  const { activeTool, selectedElementId } = state;

  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const drawingRef = useRef<AnnotateFreehandElement | null>(null);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const arrowStartRef = useRef<{ x: number; y: number } | null>(null);
  const previewRectRef = useRef<Konva.Rect>(null);
  const previewLineRef = useRef<Konva.Line>(null);
  const previewArrowRef = useRef<Konva.Arrow>(null);

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

  const selectedType = useMemo(() => {
    if (!selectedElementId) return null;
    return annotations.find((a) => a.id === selectedElementId)?.type ?? null;
  }, [annotations, selectedElementId]);

  const hasSelectionOnPage = useMemo(
    () => !!selectedElementId && annotations.some((a) => a.id === selectedElementId),
    [annotations, selectedElementId],
  );

  /* Track selected element dimensions to force transformer redraw on resize */
  const selectedDims = useMemo(() => {
    if (!selectedElementId) return "";
    const el = annotations.find((a) => a.id === selectedElementId);
    if (!el) return "";
    return `${el.width}:${el.height}`;
  }, [annotations, selectedElementId]);

  useEffect(() => {
    const transformer = transformerRef.current;
    const stage = stageRef.current;
    if (!transformer || !stage) return;

    if (activeTool !== "select") return;

    if (hasSelectionOnPage) {
      const node = stage.findOne(`#${selectedElementId}`);
      if (node) {
        transformer.nodes([node]);

        if (selectedType === "text-box") {
          transformer.keepRatio(false);
          transformer.enabledAnchors(["middle-left", "middle-right"]);
        } else if (selectedType === "ellipse") {
          transformer.keepRatio(true);
          transformer.enabledAnchors(["top-left", "top-right", "bottom-left", "bottom-right"]);
        } else if (
          selectedType === "highlight" ||
          selectedType === "underline" ||
          selectedType === "strikethrough"
        ) {
          transformer.keepRatio(false);
          transformer.enabledAnchors(["middle-left", "middle-right"]);
        } else {
          transformer.keepRatio(false);
          transformer.enabledAnchors([
            "top-left", "top-right", "bottom-left", "bottom-right",
            "middle-left", "middle-right", "top-center", "bottom-center",
          ]);
        }

        transformer.getLayer()?.batchDraw();
        return;
      }
    }
    transformer.nodes([]);
    transformer.getLayer()?.batchDraw();
  }, [selectedElementId, activeTool, hasSelectionOnPage, selectedType, selectedDims]);

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

      // Click on empty space -> deselect
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
        case "highlight":
        case "underline":
        case "strikethrough":
        case "rectangle":
        case "ellipse":
          dragStartRef.current = { x, y };
          break;

        case "arrow":
          arrowStartRef.current = { x, y };
          break;

        case "freehand": {
          const el: AnnotateFreehandElement = {
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

        case "text-box": {
          const defaults = state.textBoxDefaults;
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
              type: "text-box",
              pageIndex,
              x,
              y,
              width: measuredWidth,
              height: defaults.fontSize * defaults.lineHeight,
              rotation: 0,
              opacity: 1,
              content: "Text",
              fontFamily: defaults.fontFamily,
              fontSize: defaults.fontSize,
              fontColor: defaults.fontColor,
              backgroundColor: defaults.backgroundColor,
              borderColor: defaults.borderColor,
              bold: defaults.bold,
              italic: defaults.italic,
              align: defaults.align,
              lineHeight: defaults.lineHeight,
            },
          });
          dispatch({ type: "SET_TOOL", tool: "select" });
          break;
        }

        case "stamp": {
          const stampKind = state.pendingStamp ?? state.stampDefaults.stampKind;
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "stamp",
              pageIndex,
              x,
              y,
              width: 150,
              height: 50,
              rotation: 0,
              opacity: 1,
              stampKind,
              color: state.stampDefaults.color,
            },
          });
          dispatch({ type: "SET_TOOL", tool: "select" });
          break;
        }

        default:
          break;
      }
    },
    [activeTool, pageIndex, page, state, stageToPage, dispatch],
  );

  /* ── Mouse Move ───────────────────────────────────────── */

  const handleStageMouseMove = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;
    const { x, y } = stageToPage(pos.x, pos.y);

    // Freehand: update Konva node directly (skip dispatch for performance)
    if (activeTool === "freehand" && drawingRef.current) {
      drawingRef.current.points = [...drawingRef.current.points, x, y];
      const node = stage.findOne(`#${drawingRef.current.id}`) as Konva.Line | null;
      if (node) {
        node.points(drawingRef.current.points.map((p) => p * scale));
        node.getLayer()?.batchDraw();
      }
      return;
    }

    // Drag-based shapes preview (highlight, underline, strikethrough, rectangle, ellipse)
    if (
      dragStartRef.current &&
      (activeTool === "highlight" ||
        activeTool === "underline" ||
        activeTool === "strikethrough" ||
        activeTool === "rectangle" ||
        activeTool === "ellipse")
    ) {
      const s = dragStartRef.current;
      const node = previewRectRef.current;
      if (node) {
        const rx = Math.min(s.x, x) * scale;
        const ry = Math.min(s.y, y) * scale;
        const rw = Math.abs(x - s.x) * scale;
        const rh = Math.abs(y - s.y) * scale;
        node.x(rx);
        node.y(ry);
        node.width(rw);
        node.height(rh);
        node.visible(true);
        node.getLayer()?.batchDraw();
      }
      return;
    }

    // Arrow preview
    if (activeTool === "arrow" && arrowStartRef.current) {
      const s = arrowStartRef.current;
      const node = previewArrowRef.current;
      if (node) {
        node.points([s.x * scale, s.y * scale, x * scale, y * scale]);
        node.visible(true);
        node.getLayer()?.batchDraw();
      }
    }
  }, [activeTool, stageToPage, scale]);

  /* ── Mouse Up ─────────────────────────────────────────── */

  const handleStageMouseUp = useCallback(() => {
    // Freehand: sync final points to state
    if (activeTool === "freehand" && drawingRef.current) {
      dispatch({
        type: "UPDATE_ELEMENT",
        id: drawingRef.current.id,
        changes: { points: [...drawingRef.current.points] },
      });
      drawingRef.current = null;
      return;
    }

    const stage = stageRef.current;
    if (!stage) return;
    const pos = stage.getPointerPosition();
    if (!pos) return;
    const { x, y } = stageToPage(pos.x, pos.y);

    // Hide previews
    if (previewRectRef.current) {
      previewRectRef.current.visible(false);
      previewRectRef.current.getLayer()?.batchDraw();
    }
    if (previewArrowRef.current) {
      previewArrowRef.current.visible(false);
      previewArrowRef.current.getLayer()?.batchDraw();
    }

    // Drag-based shapes
    if (dragStartRef.current) {
      const start = dragStartRef.current;
      dragStartRef.current = null;
      const dx = Math.abs(x - start.x);
      const dy = Math.abs(y - start.y);
      const minX = Math.min(start.x, x);
      const minY = Math.min(start.y, y);
      const w = dx;
      const h = dy;

      if (dx < 5 && dy < 5) return;

      switch (activeTool) {
        case "highlight":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "highlight",
              pageIndex,
              x: minX,
              y: minY,
              width: w,
              height: h,
              rotation: 0,
              opacity: 0.35,
              color: state.highlightDefaults.color,
            },
          });
          break;

        case "underline":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "underline",
              pageIndex,
              x: minX,
              y: minY,
              width: w,
              height: h,
              rotation: 0,
              opacity: 1,
              color: state.markupDefaults.color,
              strokeWidth: state.markupDefaults.strokeWidth,
            },
          });
          break;

        case "strikethrough":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "strikethrough",
              pageIndex,
              x: minX,
              y: minY,
              width: w,
              height: h,
              rotation: 0,
              opacity: 1,
              color: state.markupDefaults.color,
              strokeWidth: state.markupDefaults.strokeWidth,
            },
          });
          break;

        case "rectangle":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "rectangle",
              pageIndex,
              x: minX,
              y: minY,
              width: w,
              height: h,
              rotation: 0,
              opacity: state.shapeDefaults.opacity,
              borderColor: state.shapeDefaults.borderColor,
              fillColor: state.shapeDefaults.fillColor,
              strokeWidth: state.shapeDefaults.strokeWidth,
            },
          });
          break;

        case "ellipse":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "ellipse",
              pageIndex,
              x: minX,
              y: minY,
              width: w,
              height: h,
              rotation: 0,
              opacity: state.shapeDefaults.opacity,
              borderColor: state.shapeDefaults.borderColor,
              fillColor: state.shapeDefaults.fillColor,
              strokeWidth: state.shapeDefaults.strokeWidth,
            },
          });
          break;

        default:
          break;
      }
      dispatch({ type: "SET_TOOL", tool: "select" });
      return;
    }

    // Arrow
    if (arrowStartRef.current) {
      const start = arrowStartRef.current;
      arrowStartRef.current = null;
      const dx = Math.abs(x - start.x);
      const dy = Math.abs(y - start.y);

      if (dx < 5 && dy < 5) return;

      dispatch({
        type: "ADD_ELEMENT",
        element: {
          id: generateId(),
          type: "arrow",
          pageIndex,
          x: 0,
          y: 0,
          width: 0,
          height: 0,
          rotation: 0,
          opacity: 1,
          points: [start.x, start.y, x, y],
          strokeColor: state.arrowDefaults.strokeColor,
          strokeWidth: state.arrowDefaults.strokeWidth,
          headSize: state.arrowDefaults.headSize,
        },
      });
      dispatch({ type: "SET_TOOL", tool: "select" });
    }
  }, [activeTool, pageIndex, state, stageToPage, dispatch]);

  /* ── Transform / Drag End ─────────────────────────────── */

  const handleTransformEnd = useCallback(
    (el: AnnotateElement, node: Konva.Node) => {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();
      const nodeX = node.x() / scale;
      const nodeY = node.y() / scale;
      node.scaleX(1);
      node.scaleY(1);

      if (el.type === "text-box") {
        const textPad = 10;
        const rectChild = (node as unknown as Konva.Group).findOne?.("Rect");
        rectChild?.scaleX(1);
        rectChild?.scaleY(1);

        delete liveTextRef.current[el.id];
        tickOverlay();

        const correctedX = (node.x() + textPad) / scale;
        const correctedY = (node.y() + textPad) / scale;

        const newWidth = Math.max(20, el.width * scaleX);
        const pg = state.pages[el.pageIndex];
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
      } else if (el.type === "highlight" || el.type === "underline" || el.type === "strikethrough") {
        // Height-locked: only width changes
        const newWidth = Math.max(5, (el.width || 1) * scaleX);
        dispatch({
          type: "UPDATE_ELEMENT",
          id: el.id,
          changes: {
            x: nodeX,
            y: nodeY,
            width: newWidth,
            rotation: node.rotation(),
          },
        });
      } else {
        let newWidth = Math.max(5, (el.width || 1) * scaleX);
        let newHeight = Math.max(5, (el.height || 1) * scaleY);

        if (el.type === "ellipse") {
          const size = Math.max(newWidth, newHeight);
          newWidth = size;
          newHeight = size;
        }

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
    [dispatch, scale, state.pages, tickOverlay],
  );

  const handleTextBoxTransform = useCallback(
    (el: AnnotateElement & { type: "text-box" }, group: Konva.Group) => {
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

      const invX = 1 / scaleX;
      const invY = 1 / scaleY;
      const rectNode = group.findOne("Rect") as Konva.Node | undefined;
      if (rectNode) {
        rectNode.scaleX(invX);
        rectNode.scaleY(invY);
        rectNode.width(clampedWidth * scale + textPad * 2);
        rectNode.height(h * scale + textPad * 2);
      }

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
    (el: AnnotateElement, node: Konva.Node) => {
      if (el.type === "text-box") {
        delete liveTextRef.current[el.id];
        tickOverlay();
      }
      const textPad = el.type === "text-box" ? 10 : 0;
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
    (el: AnnotateElement) => {
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
        case "highlight":
          return (
            <Rect
              key={el.id}
              {...commonProps}
              width={el.width * scale}
              height={el.height * scale}
              fill={HIGHLIGHT_COLORS[el.color]}
              opacity={0.35}
            />
          );

        case "underline":
          return (
            <Line
              key={el.id}
              id={el.id}
              points={[
                el.x * scale,
                (el.y + el.height) * scale,
                (el.x + el.width) * scale,
                (el.y + el.height) * scale,
              ]}
              stroke={el.color}
              strokeWidth={el.strokeWidth}
              opacity={el.opacity}
              draggable={activeTool === "select"}
              onClick={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              onTap={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) =>
                handleDragEnd(el, e.target)
              }
              onTransformEnd={(e: Konva.KonvaEventObject<Event>) =>
                handleTransformEnd(el, e.target)
              }
              hitStrokeWidth={20}
            />
          );

        case "strikethrough":
          return (
            <Line
              key={el.id}
              id={el.id}
              points={[
                el.x * scale,
                (el.y + el.height / 2) * scale,
                (el.x + el.width) * scale,
                (el.y + el.height / 2) * scale,
              ]}
              stroke={el.color}
              strokeWidth={el.strokeWidth}
              opacity={el.opacity}
              draggable={activeTool === "select"}
              onClick={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              onTap={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) =>
                handleDragEnd(el, e.target)
              }
              onTransformEnd={(e: Konva.KonvaEventObject<Event>) =>
                handleTransformEnd(el, e.target)
              }
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
              onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) =>
                handleDragEnd(el, e.target)
              }
              onTransformEnd={(e: Konva.KonvaEventObject<Event>) =>
                handleTransformEnd(el, e.target)
              }
              hitStrokeWidth={20}
            />
          );

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

        case "ellipse": {
          const r = (el.width / 2) * scale;
          return (
            <KCircle
              key={el.id}
              {...commonProps}
              offsetX={-r}
              offsetY={-r}
              radius={r}
              fill={el.fillColor === "transparent" ? undefined : el.fillColor}
              stroke={el.borderColor}
              strokeWidth={el.strokeWidth}
            />
          );
        }

        case "arrow":
          return (
            <KArrow
              key={el.id}
              id={el.id}
              points={el.points.map((p) => p * scale)}
              stroke={el.strokeColor}
              strokeWidth={el.strokeWidth}
              fill={el.strokeColor}
              pointerLength={el.headSize}
              pointerWidth={el.headSize}
              opacity={el.opacity}
              draggable={activeTool === "select"}
              onClick={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              onTap={() => dispatch({ type: "SELECT_ELEMENT", id: el.id })}
              onDragEnd={(e: Konva.KonvaEventObject<DragEvent>) =>
                handleDragEnd(el, e.target)
              }
              onTransformEnd={(e: Konva.KonvaEventObject<Event>) =>
                handleTransformEnd(el, e.target)
              }
              hitStrokeWidth={20}
            />
          );

        case "text-box": {
          const textPad = 10;
          return (
            <Group
              key={el.id}
              {...commonProps}
              x={el.x * scale - textPad}
              y={el.y * scale - textPad}
              onTransform={(e: Konva.KonvaEventObject<Event>) =>
                handleTextBoxTransform(el, e.target as unknown as Konva.Group)
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

        case "stamp": {
          const stampColor = el.color;
          return (
            <Group
              key={el.id}
              {...commonProps}
            >
              <Rect
                width={el.width * scale}
                height={el.height * scale}
                stroke={stampColor}
                strokeWidth={3}
                cornerRadius={8}
                fill="rgba(255,255,255,0.9)"
              />
              <Text
                text={STAMP_TEXT[el.stampKind]}
                fontSize={Math.min(el.width * scale * 0.15, el.height * scale * 0.5)}
                fontStyle="bold"
                fill={stampColor}
                width={el.width * scale}
                height={el.height * scale}
                align="center"
                verticalAlign="middle"
                letterSpacing={2}
              />
            </Group>
          );
        }

        default:
          return null;
      }
    },
    [scale, activeTool, dispatch, handleDragEnd, handleTransformEnd, handleTextBoxTransform, editingTextId, tickOverlay],
  );

  /* ── Cursor ───────────────────────────────────────────── */

  const cursorStyle = useMemo(() => {
    switch (activeTool) {
      case "select":
        return "default";
      case "text-box":
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

          {/* Drag preview rect (highlight, underline, strikethrough, rectangle, ellipse) */}
          <Rect
            ref={previewRectRef}
            x={0}
            y={0}
            width={0}
            height={0}
            fill="rgba(59,130,246,0.15)"
            stroke="#3b82f6"
            strokeWidth={1}
            visible={false}
            listening={false}
          />

          {/* Arrow preview */}
          <KArrow
            ref={previewArrowRef}
            points={[0, 0, 0, 0]}
            stroke={state.arrowDefaults.strokeColor}
            strokeWidth={state.arrowDefaults.strokeWidth}
            fill={state.arrowDefaults.strokeColor}
            pointerLength={state.arrowDefaults.headSize}
            pointerWidth={state.arrowDefaults.headSize}
            opacity={0.6}
            visible={false}
            listening={false}
          />

          <Transformer
            ref={transformerRef}
            boundBoxFunc={(_, newBox) => {
              const selEl = annotations.find(
                (a) => a.id === selectedElementId,
              );
              if (selEl?.type === "text-box") {
                const textPad = 10;
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
              if (
                selEl?.type === "highlight" ||
                selEl?.type === "underline" ||
                selEl?.type === "strikethrough"
              ) {
                // Lock height
                return {
                  ...newBox,
                  width: Math.max(10, newBox.width),
                  height: newBox.height,
                };
              }
              return {
                ...newBox,
                width: Math.max(10, newBox.width),
                height: Math.max(10, newBox.height),
              };
            }}
            rotateEnabled
            anchorFill="#3b82f6"
            anchorStroke="#2563eb"
            anchorStrokeWidth={1}
            anchorSize={8}
            borderStroke="#3b82f6"
            borderStrokeWidth={1.5}
          />
        </Layer>
      </Stage>

      {/* HTML text overlays for text-box elements */}
      {annotations
        .filter(
          (a): a is Extract<AnnotateElement, { type: "text-box" }> =>
            a.type === "text-box",
        )
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
            textAlign: el.align as React.CSSProperties["textAlign"],
            color: el.fontColor,
            lineHeight: el.lineHeight ?? 1.2,
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
              <TextBoxOverlayDiv
                el={el}
                isEditing={isEditing}
                dispatch={dispatch}
                onEndEdit={() => setEditingTextId(null)}
                textStyle={textStyle}
                tw={tw}
                th={th}
                scale={scale}
                maxW={(page.width - el.x) * scale}
              />
            </div>
          );
        })}
    </div>
  );
}

/* ── TextBox Overlay — HTML DOM text rendering for sharpness ── */

const TextBoxOverlayDiv = memo(function TextBoxOverlayDiv({
  el,
  isEditing,
  dispatch,
  onEndEdit,
  textStyle,
  tw,
  th,
  scale,
  maxW,
}: {
  el: Extract<AnnotateElement, { type: "text-box" }>;
  isEditing: boolean;
  dispatch: AnnotateDispatch;
  onEndEdit: () => void;
  textStyle: React.CSSProperties;
  tw: number;
  th: number;
  scale: number;
  maxW: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const contentRef = useRef(el.content);
  const blurredRef = useRef(!isEditing);

  // Mount only: set initial content
  useLayoutEffect(() => {
    if (ref.current) {
      ref.current.innerText = el.content;
      contentRef.current = el.content;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // External content change (undo/redo) — skip if user is typing
  useLayoutEffect(() => {
    if (!isEditing && ref.current && el.content !== contentRef.current) {
      ref.current.innerText = el.content;
      contentRef.current = el.content;
    }
  }, [el.content]); // intentionally omit isEditing

  // Focus when entering edit mode
  useEffect(() => {
    if (isEditing) {
      blurredRef.current = false;
      if (ref.current) {
        ref.current.focus();
        const sel = window.getSelection();
        if (sel) {
          sel.selectAllChildren(ref.current);
          sel.collapseToEnd();
        }
      }
    }
  }, [isEditing]);

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      tabIndex={isEditing ? 0 : -1}
      onBlur={() => {
        if (!isEditing) return;
        blurredRef.current = true;
        const div = ref.current;
        if (!div) return;
        const raw = div.innerText ?? "";
        const val = raw.endsWith("\n") ? raw.slice(0, -1) : raw;
        if (val !== contentRef.current) {
          dispatch({
            type: "UPDATE_ELEMENT",
            id: el.id,
            changes: { content: val },
            skipResize: true,
          });
          contentRef.current = val;
        }
        onEndEdit();
      }}
      onInput={() => {
        const div = ref.current;
        if (!div) return;
        const val = div.innerText ?? "";
        contentRef.current = val;
        const h = div.scrollHeight / scale;
        if (blurredRef.current) return;
        dispatch({
          type: "UPDATE_ELEMENT",
          id: el.id,
          changes: { content: val, height: h },
          skipHistory: true,
        });
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") ref.current?.blur();
      }}
      style={{
        ...textStyle,
        ...(el.manualWidth
          ? { width: tw }
          : { width: "max-content", minWidth: tw, maxWidth: maxW }),
        minHeight: th,
        outline: "none",
        pointerEvents: isEditing ? "auto" : "none",
        cursor: isEditing ? "text" : "default",
      }}
    />
  );
});
