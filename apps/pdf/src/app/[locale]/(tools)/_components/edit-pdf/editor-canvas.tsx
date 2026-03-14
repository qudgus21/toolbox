"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { Stage, Layer, Rect, Ellipse, Line, Text, Image as KImage, Transformer, Group } from "react-konva";
import type Konva from "konva";
import {
  generateId,
  SYMBOL_MAP,
  type EditorElement,
  type EditorState,
  type ToolType,
  type FreehandElement,
} from "./editor-types";
import type { EditorDispatch } from "./use-editor-store";

interface EditorCanvasProps {
  state: EditorState;
  dispatch: EditorDispatch;
  containerWidth: number;
  containerHeight: number;
}

export function EditorCanvas({
  state,
  dispatch,
  containerWidth,
  containerHeight,
}: EditorCanvasProps) {
  const { pages, annotations, activeTool, selectedElementId, activePageIndex, zoom } = state;

  const stageRef = useRef<Konva.Stage>(null);
  const transformerRef = useRef<Konva.Transformer>(null);
  const drawingRef = useRef<FreehandElement | null>(null);
  const lineStartRef = useRef<{ x: number; y: number } | null>(null);

  const [pageImages, setPageImages] = useState<Map<number, HTMLImageElement>>(new Map());

  const currentPage = pages[activePageIndex];

  // Calculate stage dimensions to fit the page
  const stageSize = useMemo(() => {
    if (!currentPage) return { width: containerWidth, height: containerHeight, scale: 1 };
    const pageAspect = currentPage.width / currentPage.height;
    const containerAspect = containerWidth / containerHeight;

    let fitScale: number;
    if (pageAspect > containerAspect) {
      fitScale = (containerWidth - 40) / currentPage.width;
    } else {
      fitScale = (containerHeight - 40) / currentPage.height;
    }

    const finalScale = fitScale * zoom;
    return {
      width: Math.max(currentPage.width * finalScale, containerWidth),
      height: Math.max(currentPage.height * finalScale, containerHeight),
      scale: finalScale,
    };
  }, [currentPage, containerWidth, containerHeight, zoom]);

  // Page offset to center
  const pageOffset = useMemo(() => {
    if (!currentPage) return { x: 0, y: 0 };
    const pw = currentPage.width * stageSize.scale;
    const ph = currentPage.height * stageSize.scale;
    return {
      x: Math.max((containerWidth - pw) / 2, 20),
      y: Math.max((containerHeight - ph) / 2, 20),
    };
  }, [currentPage, containerWidth, containerHeight, stageSize.scale]);

  // Load page images
  useEffect(() => {
    if (!currentPage) return;
    if (pageImages.has(activePageIndex)) return;

    const img = new window.Image();
    img.onload = () => {
      setPageImages((prev) => new Map(prev).set(activePageIndex, img));
    };
    img.src = currentPage.imageUrl;
  }, [currentPage, activePageIndex, pageImages]);

  // Annotations for current page
  const currentAnnotations = useMemo(
    () => annotations.filter((a) => a.pageIndex === activePageIndex),
    [annotations, activePageIndex],
  );

  // Update transformer when selection changes
  useEffect(() => {
    const transformer = transformerRef.current;
    const stage = stageRef.current;
    if (!transformer || !stage) return;

    if (selectedElementId && activeTool === "select") {
      const node = stage.findOne(`#${selectedElementId}`);
      if (node) {
        transformer.nodes([node]);
        transformer.getLayer()?.batchDraw();
        return;
      }
    }
    transformer.nodes([]);
    transformer.getLayer()?.batchDraw();
  }, [selectedElementId, activeTool, currentAnnotations]);

  // Convert stage coordinates to page-relative coordinates
  const stageToPage = useCallback(
    (stageX: number, stageY: number) => ({
      x: (stageX - pageOffset.x) / stageSize.scale,
      y: (stageY - pageOffset.y) / stageSize.scale,
    }),
    [pageOffset, stageSize.scale],
  );

  // ─── Event Handlers ──────────────────────────────────────────
  const handleStageMouseDown = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
      const stage = stageRef.current;
      if (!stage) return;

      const pos = stage.getPointerPosition();
      if (!pos) return;
      const { x, y } = stageToPage(pos.x, pos.y);

      // Clicked on empty space while in select mode => deselect
      if (e.target === stage || e.target.getParent()?.name() === "page-bg") {
        dispatch({ type: "SELECT_ELEMENT", id: null });
      }

      if (activeTool === "select") return;

      // Check if click is within page bounds
      if (!currentPage || x < 0 || y < 0 || x > currentPage.width || y > currentPage.height) return;

      switch (activeTool) {
        case "text":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "text",
              pageIndex: activePageIndex,
              x,
              y,
              width: 200,
              height: 30,
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

        case "rectangle":
          dispatch({
            type: "ADD_ELEMENT",
            element: {
              id: generateId(),
              type: "rectangle",
              pageIndex: activePageIndex,
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
              pageIndex: activePageIndex,
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
          const freehandEl: FreehandElement = {
            id: generateId(),
            type: "freehand",
            pageIndex: activePageIndex,
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
          drawingRef.current = freehandEl;
          dispatch({ type: "ADD_ELEMENT", element: freehandEl });
          break;
        }

        case "symbol":
          // Symbol is handled by the toolbar's symbol picker
          break;

        case "image":
          // Image is handled by the toolbar's upload button
          break;
      }
    },
    [activeTool, activePageIndex, currentPage, state.textDefaults, state.shapeDefaults, state.drawDefaults, stageToPage, dispatch],
  );

  const handleStageMouseMove = useCallback(
    (e: Konva.KonvaEventObject<MouseEvent | TouchEvent>) => {
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

  const handleStageMouseUp = useCallback(
    () => {
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
              pageIndex: activePageIndex,
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
    },
    [activeTool, activePageIndex, state.shapeDefaults, stageToPage, dispatch],
  );

  // Handle element transform end (move/resize/rotate)
  const handleTransformEnd = useCallback(
    (el: EditorElement, node: Konva.Node) => {
      const scaleX = node.scaleX();
      const scaleY = node.scaleY();

      // Convert back to page coordinates
      const nodeX = (node.x() - pageOffset.x) / stageSize.scale;
      const nodeY = (node.y() - pageOffset.y) / stageSize.scale;

      node.scaleX(1);
      node.scaleY(1);

      dispatch({
        type: "UPDATE_ELEMENT",
        id: el.id,
        changes: {
          x: nodeX,
          y: nodeY,
          width: Math.max(5, (el.width || 1) * scaleX),
          height: Math.max(5, (el.height || 1) * scaleY),
          rotation: node.rotation(),
        },
      });
    },
    [dispatch, pageOffset, stageSize.scale],
  );

  const handleDragEnd = useCallback(
    (el: EditorElement, node: Konva.Node) => {
      const nodeX = (node.x() - pageOffset.x) / stageSize.scale;
      const nodeY = (node.y() - pageOffset.y) / stageSize.scale;

      dispatch({
        type: "UPDATE_ELEMENT",
        id: el.id,
        changes: { x: nodeX, y: nodeY },
      });
    },
    [dispatch, pageOffset, stageSize.scale],
  );

  // ─── Render Helpers ──────────────────────────────────────────
  const renderElement = useCallback(
    (el: EditorElement) => {
      const commonProps = {
        id: el.id,
        x: el.x * stageSize.scale + pageOffset.x,
        y: el.y * stageSize.scale + pageOffset.y,
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
              width={el.width * stageSize.scale}
              height={el.height * stageSize.scale}
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
              x={(el.x + el.width / 2) * stageSize.scale + pageOffset.x}
              y={(el.y + el.height / 2) * stageSize.scale + pageOffset.y}
              radiusX={(el.width / 2) * stageSize.scale}
              radiusY={(el.height / 2) * stageSize.scale}
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
              points={el.points.map((p, i) =>
                i % 2 === 0
                  ? p * stageSize.scale + pageOffset.x
                  : p * stageSize.scale + pageOffset.y,
              )}
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
              points={el.points.map((p, i) =>
                i % 2 === 0
                  ? p * stageSize.scale + pageOffset.x
                  : p * stageSize.scale + pageOffset.y,
              )}
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

        case "text":
          return (
            <Text
              key={el.id}
              {...commonProps}
              text={el.content}
              fontSize={el.fontSize * stageSize.scale}
              fontFamily={el.fontFamily}
              fill={el.fontColor}
              fontStyle={`${el.bold ? "bold" : ""} ${el.italic ? "italic" : ""}`}
              textDecoration={el.underline ? "underline" : ""}
              align={el.align}
              width={el.width * stageSize.scale}
              onDblClick={() => {
                // Simple inline edit: prompt for text
                const newText = window.prompt("Edit text", el.content);
                if (newText !== null) {
                  dispatch({
                    type: "UPDATE_ELEMENT",
                    id: el.id,
                    changes: { content: newText },
                  });
                }
              }}
            />
          );

        case "symbol":
          return (
            <Text
              key={el.id}
              {...commonProps}
              text={SYMBOL_MAP[el.symbol]}
              fontSize={el.width * stageSize.scale}
              fill={el.color}
            />
          );

        case "image":
          return (
            <ImageNode
              key={el.id}
              el={el}
              commonProps={commonProps}
              scale={stageSize.scale}
              pageOffset={pageOffset}
            />
          );

        default:
          return null;
      }
    },
    [stageSize.scale, pageOffset, activeTool, dispatch, handleDragEnd, handleTransformEnd],
  );

  const cursorStyle = useMemo(() => {
    switch (activeTool) {
      case "select":
        return "default";
      case "text":
        return "text";
      case "freehand":
        return "crosshair";
      case "line":
        return "crosshair";
      default:
        return "crosshair";
    }
  }, [activeTool]);

  if (!currentPage) return null;

  const pageImg = pageImages.get(activePageIndex);

  return (
    <div
      className="relative overflow-auto bg-background-muted"
      style={{ width: containerWidth, height: containerHeight, cursor: cursorStyle }}
    >
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        onMouseDown={handleStageMouseDown}
        onMouseMove={handleStageMouseMove}
        onMouseUp={handleStageMouseUp}
        onTouchStart={handleStageMouseDown}
        onTouchMove={handleStageMouseMove}
        onTouchEnd={handleStageMouseUp}
      >
        {/* PDF Page Background */}
        <Layer name="page-bg">
          {/* Page shadow */}
          <Rect
            x={pageOffset.x + 3}
            y={pageOffset.y + 3}
            width={currentPage.width * stageSize.scale}
            height={currentPage.height * stageSize.scale}
            fill="rgba(0,0,0,0.1)"
            cornerRadius={2}
          />
          {/* White page */}
          <Rect
            x={pageOffset.x}
            y={pageOffset.y}
            width={currentPage.width * stageSize.scale}
            height={currentPage.height * stageSize.scale}
            fill="white"
            stroke="#d1d5db"
            strokeWidth={1}
          />
          {/* Rendered PDF content */}
          {pageImg && (
            <KImage
              x={pageOffset.x}
              y={pageOffset.y}
              width={currentPage.width * stageSize.scale}
              height={currentPage.height * stageSize.scale}
              image={pageImg}
              listening={false}
            />
          )}
        </Layer>

        {/* Annotations Layer */}
        <Layer>
          {currentAnnotations.map(renderElement)}
          <Transformer
            ref={transformerRef}
            boundBoxFunc={(_, newBox) => ({
              ...newBox,
              width: Math.max(10, newBox.width),
              height: Math.max(10, newBox.height),
            })}
            rotateEnabled
            enabledAnchors={[
              "top-left",
              "top-right",
              "bottom-left",
              "bottom-right",
              "middle-left",
              "middle-right",
              "top-center",
              "bottom-center",
            ]}
          />
        </Layer>
      </Stage>
    </div>
  );
}

// ─── Image Element (loads async) ─────────────────────────────
function ImageNode({
  el,
  commonProps,
  scale,
  pageOffset,
}: {
  el: Extract<EditorElement, { type: "image" }>;
  commonProps: Record<string, unknown>;
  scale: number;
  pageOffset: { x: number; y: number };
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
