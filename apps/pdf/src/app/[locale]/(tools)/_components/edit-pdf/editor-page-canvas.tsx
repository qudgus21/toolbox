"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback, useMemo, memo, startTransition } from "react";
import {
  Stage,
  Layer,
  Rect,
  Circle as KCircle,
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
  const linePreviewRef = useRef<Konva.Line>(null);

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

  // Track whether there's a selected element on this page (stable boolean)
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

    // Skip transformer updates when not in select mode to avoid
    // re-render loops during drawing (freehand dispatches every mousemove)
    if (activeTool !== "select") return;

    if (hasSelectionOnPage) {
      const node = stage.findOne(`#${selectedElementId}`);
      if (node) {
        transformer.nodes([node]);

        // Configure per element type
        if (selectedType === "ellipse") {
          transformer.keepRatio(true);
          transformer.enabledAnchors(["top-left", "top-right", "bottom-left", "bottom-right"]);
        } else if (selectedType === "text") {
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
              height: state.textDefaults.fontSize * state.textDefaults.lineHeight,
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
              lineHeight: state.textDefaults.lineHeight,
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
              x: x - 50,
              y: y - 50,
              width: 100,
              height: 100,
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

        case "symbol": {
          if (!state.pendingSymbol) break;
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "symbol",
              pageIndex,
              x,
              y,
              width: 40,
              height: 40,
              rotation: 0,
              opacity: 1,
              symbol: state.pendingSymbol,
              color: "#000000",
            },
          });
          dispatch({ type: "SET_TOOL", tool: "select" });
          break;
        }

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
      // Line preview: update Konva node directly (no dispatch)
      if (activeTool === "line" && lineStartRef.current) {
        const stage = stageRef.current;
        if (stage) {
          const pos = stage.getPointerPosition();
          if (pos) {
            const { x, y } = stageToPage(pos.x, pos.y);
            const s = lineStartRef.current;
            const node = linePreviewRef.current;
            if (node) {
              node.points([s.x * scale, s.y * scale, x * scale, y * scale]);
              node.visible(true);
              node.getLayer()?.batchDraw();
            }
          }
        }
      }

      if (activeTool === "freehand" && drawingRef.current) {
        const stage = stageRef.current;
        if (!stage) return;
        const pos = stage.getPointerPosition();
        if (!pos) return;
        const { x, y } = stageToPage(pos.x, pos.y);
        drawingRef.current.points = [...drawingRef.current.points, x, y];

        // Update Konva node directly to avoid dispatch → re-render on every mousemove
        const node = stage.findOne(`#${drawingRef.current.id}`) as Konva.Line | null;
        if (node) {
          node.points(drawingRef.current.points.map((p) => p * scale));
          node.getLayer()?.batchDraw();
        }
      }
    },
    [activeTool, stageToPage, scale],
  );

  /* ── Mouse Up ─────────────────────────────────────────── */

  const handleStageMouseUp = useCallback(() => {
    if (activeTool === "freehand" && drawingRef.current) {
      // Sync final points to state (mousemove only updated Konva node directly)
      dispatch({
        type: "UPDATE_ELEMENT",
        id: drawingRef.current.id,
        changes: { points: [...drawingRef.current.points] },
      });
      drawingRef.current = null;
    }
    if (activeTool === "line" && lineStartRef.current) {
      // Hide preview line
      if (linePreviewRef.current) {
        linePreviewRef.current.visible(false);
        linePreviewRef.current.getLayer()?.batchDraw();
      }

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
        let newWidth = Math.max(5, (el.width || 1) * scaleX);
        let newHeight = Math.max(5, (el.height || 1) * scaleY);

        // Circle: enforce equal width/height
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
          {/* Line drawing preview */}
          <Line
            ref={linePreviewRef}
            points={[0, 0, 0, 0]}
            stroke={state.shapeDefaults.borderColor}
            strokeWidth={state.shapeDefaults.strokeWidth}
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
              <TextOverlayDiv
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

/* ── Unified text overlay — always the same DOM element.
     Editing just toggles contentEditable; no element swap = no mismatch. ── */

const TextOverlayDiv = memo(function TextOverlayDiv({
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
  el: Extract<EditorElement, { type: "text" }>;
  isEditing: boolean;
  dispatch: EditorDispatch;
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
        startTransition(() => {
          if (blurredRef.current) return;
          dispatch({
            type: "UPDATE_ELEMENT",
            id: el.id,
            changes: { content: val, height: h },
            skipHistory: true,
          });
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
