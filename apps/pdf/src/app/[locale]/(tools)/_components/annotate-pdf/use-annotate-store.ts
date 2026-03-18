"use client";

import { useReducer, useCallback, type Dispatch } from "react";
import { measureTextSize } from "../edit-pdf/editor-types";
import type {
  AnnotateState,
  AnnotateAction,
  AnnotateElement,
  HighlightDefaults,
  MarkupDefaults,
  StickyDefaults,
  DrawDefaults,
  ShapeDefaults,
  TextBoxDefaults,
  ArrowDefaults,
  StampDefaults,
} from "./annotate-types";

const MAX_HISTORY = 50;

// ─── Initial Defaults ────────────────────────────────────────
const INITIAL_HIGHLIGHT_DEFAULTS: HighlightDefaults = {
  color: "yellow",
  opacity: 0.35,
};

const INITIAL_MARKUP_DEFAULTS: MarkupDefaults = {
  color: "#EF4444",
  strokeWidth: 2,
};

const INITIAL_STICKY_DEFAULTS: StickyDefaults = {
  noteColor: "#FEF08A",
};

const INITIAL_DRAW_DEFAULTS: DrawDefaults = {
  strokeColor: "#EF4444",
  strokeWidth: 3,
};

const INITIAL_SHAPE_DEFAULTS: ShapeDefaults = {
  borderColor: "#EF4444",
  fillColor: "transparent",
  strokeWidth: 2,
  opacity: 1,
};

const INITIAL_TEXT_BOX_DEFAULTS: TextBoxDefaults = {
  fontFamily: "Helvetica",
  fontSize: 14,
  fontColor: "#000000",
  backgroundColor: "transparent",
  borderColor: "#000000",
  bold: false,
  italic: false,
  align: "left",
  lineHeight: 1.2,
};

const INITIAL_ARROW_DEFAULTS: ArrowDefaults = {
  strokeColor: "#EF4444",
  strokeWidth: 2,
  headSize: 10,
};

const INITIAL_STAMP_DEFAULTS: StampDefaults = {
  stampKind: "approved",
  color: "#22C55E",
};

const INITIAL_STATE: AnnotateState = {
  pages: [],
  annotations: [],
  activeTool: "select",
  selectedElementId: null,
  activePageIndex: 0,
  zoom: 1,
  history: { past: [], future: [] },
  expandedNoteId: null,
  pendingStamp: null,
  highlightDefaults: INITIAL_HIGHLIGHT_DEFAULTS,
  markupDefaults: INITIAL_MARKUP_DEFAULTS,
  stickyDefaults: INITIAL_STICKY_DEFAULTS,
  drawDefaults: INITIAL_DRAW_DEFAULTS,
  shapeDefaults: INITIAL_SHAPE_DEFAULTS,
  textBoxDefaults: INITIAL_TEXT_BOX_DEFAULTS,
  arrowDefaults: INITIAL_ARROW_DEFAULTS,
  stampDefaults: INITIAL_STAMP_DEFAULTS,
};

// ─── History ─────────────────────────────────────────────────
function pushHistory(state: AnnotateState): AnnotateState["history"] {
  const past = [...state.history.past, state.annotations];
  if (past.length > MAX_HISTORY) past.shift();
  return { past, future: [] };
}

// ─── Reducer ─────────────────────────────────────────────────
function annotateReducer(
  state: AnnotateState,
  action: AnnotateAction,
): AnnotateState {
  switch (action.type) {
    case "SET_PAGES":
      return { ...state, pages: action.pages };

    case "ADD_ELEMENT":
      return {
        ...state,
        annotations: [...state.annotations, action.element],
        selectedElementId: action.element.id,
        history: pushHistory(state),
      };

    case "UPDATE_ELEMENT": {
      const idx = state.annotations.findIndex((e) => e.id === action.id);
      if (idx === -1) return state;
      const updated = [...state.annotations];
      const prev = updated[idx];
      let changes = action.changes;

      // Auto-adjust text-box size
      if (prev.type === "text-box" && !action.skipResize) {
        const merged = { ...prev, ...changes } as typeof prev;
        const needsResize =
          "fontSize" in changes ||
          "content" in changes ||
          "fontFamily" in changes ||
          "bold" in changes ||
          "italic" in changes ||
          "lineHeight" in changes;
        if (needsResize) {
          const fontChanged =
            "fontSize" in changes ||
            "fontFamily" in changes ||
            "bold" in changes ||
            "italic" in changes ||
            "lineHeight" in changes;
          const directHeight = "height" in changes ? (changes as { height: number }).height : null;

          if (fontChanged) {
            const page = state.pages[merged.pageIndex];
            const maxW = page ? page.width - merged.x : 9999;
            const { width: w, height: h } = measureTextSize(
              merged.content,
              merged.fontSize,
              merged.fontFamily,
              merged.bold,
              merged.italic,
              maxW,
              merged.lineHeight,
            );
            changes = { ...changes, width: w, height: h };
          } else if (merged.manualWidth) {
            if (directHeight === null) {
              const { height: h } = measureTextSize(
                merged.content,
                merged.fontSize,
                merged.fontFamily,
                merged.bold,
                merged.italic,
                merged.width,
                merged.lineHeight,
              );
              changes = { ...changes, height: h };
            }
          } else {
            const page = state.pages[merged.pageIndex];
            const maxW = page ? page.width - merged.x : 9999;
            const { width: w, height: h } = measureTextSize(
              merged.content,
              merged.fontSize,
              merged.fontFamily,
              merged.bold,
              merged.italic,
              maxW,
              merged.lineHeight,
            );
            if (w >= maxW) {
              changes = { ...changes, width: w, manualWidth: true, ...(directHeight === null ? { height: h } : {}) };
            } else {
              changes = { ...changes, width: w, ...(directHeight === null ? { height: h } : {}) };
            }
          }
        }
      }

      updated[idx] = { ...prev, ...changes } as AnnotateElement;
      return {
        ...state,
        annotations: updated,
        history: action.skipHistory ? state.history : pushHistory(state),
      };
    }

    case "DELETE_ELEMENT":
      return {
        ...state,
        annotations: state.annotations.filter((e) => e.id !== action.id),
        selectedElementId:
          state.selectedElementId === action.id ? null : state.selectedElementId,
        expandedNoteId:
          state.expandedNoteId === action.id ? null : state.expandedNoteId,
        history: pushHistory(state),
      };

    case "SELECT_ELEMENT":
      return { ...state, selectedElementId: action.id };

    case "SET_TOOL":
      return {
        ...state,
        activeTool: action.tool,
        selectedElementId: action.tool !== "select" ? null : state.selectedElementId,
        pendingStamp: action.tool !== "stamp" ? null : state.pendingStamp,
      };

    case "SET_PAGE":
      if (state.activePageIndex === action.index) return state;
      return { ...state, activePageIndex: action.index };

    case "SET_ZOOM":
      return { ...state, zoom: action.zoom };

    case "UNDO": {
      if (state.history.past.length === 0) return state;
      const past = [...state.history.past];
      const prev = past.pop()!;
      return {
        ...state,
        annotations: prev,
        selectedElementId: null,
        history: {
          past,
          future: [state.annotations, ...state.history.future],
        },
      };
    }

    case "REDO": {
      if (state.history.future.length === 0) return state;
      const future = [...state.history.future];
      const next = future.shift()!;
      return {
        ...state,
        annotations: next,
        selectedElementId: null,
        history: {
          past: [...state.history.past, state.annotations],
          future,
        },
      };
    }

    case "MOVE_LAYER": {
      const pageAnnotations = state.annotations.filter(
        (e) => e.pageIndex === state.activePageIndex,
      );
      const otherAnnotations = state.annotations.filter(
        (e) => e.pageIndex !== state.activePageIndex,
      );
      const elIdx = pageAnnotations.findIndex((e) => e.id === action.id);
      if (elIdx === -1) return state;

      const arr = [...pageAnnotations];
      const [el] = arr.splice(elIdx, 1);

      switch (action.direction) {
        case "up":
          arr.splice(Math.min(elIdx + 1, arr.length), 0, el);
          break;
        case "down":
          arr.splice(Math.max(elIdx - 1, 0), 0, el);
          break;
        case "top":
          arr.push(el);
          break;
        case "bottom":
          arr.unshift(el);
          break;
      }

      return {
        ...state,
        annotations: [...otherAnnotations, ...arr],
        history: pushHistory(state),
      };
    }

    case "REORDER_ANNOTATIONS": {
      const otherAnnotations = state.annotations.filter(
        (e) => e.pageIndex !== action.pageIndex,
      );
      const pageAnnotations = state.annotations.filter(
        (e) => e.pageIndex === action.pageIndex,
      );
      const idMap = new Map(pageAnnotations.map((e) => [e.id, e]));
      const reordered = action.orderedIds
        .map((id) => idMap.get(id))
        .filter(Boolean) as typeof pageAnnotations;
      return {
        ...state,
        annotations: [...otherAnnotations, ...reordered],
        history: pushHistory(state),
      };
    }

    case "TOGGLE_NOTE":
      return {
        ...state,
        expandedNoteId: state.expandedNoteId === action.id ? null : action.id,
      };

    case "SET_PENDING_STAMP":
      return {
        ...state,
        pendingStamp: action.stamp,
        activeTool: "stamp",
        selectedElementId: null,
      };

    case "UPDATE_HIGHLIGHT_DEFAULTS":
      return {
        ...state,
        highlightDefaults: { ...state.highlightDefaults, ...action.changes },
      };

    case "UPDATE_MARKUP_DEFAULTS":
      return {
        ...state,
        markupDefaults: { ...state.markupDefaults, ...action.changes },
      };

    case "UPDATE_STICKY_DEFAULTS":
      return {
        ...state,
        stickyDefaults: { ...state.stickyDefaults, ...action.changes },
      };

    case "UPDATE_DRAW_DEFAULTS":
      return {
        ...state,
        drawDefaults: { ...state.drawDefaults, ...action.changes },
      };

    case "UPDATE_SHAPE_DEFAULTS":
      return {
        ...state,
        shapeDefaults: { ...state.shapeDefaults, ...action.changes },
      };

    case "UPDATE_TEXT_BOX_DEFAULTS":
      return {
        ...state,
        textBoxDefaults: { ...state.textBoxDefaults, ...action.changes },
      };

    case "UPDATE_ARROW_DEFAULTS":
      return {
        ...state,
        arrowDefaults: { ...state.arrowDefaults, ...action.changes },
      };

    case "UPDATE_STAMP_DEFAULTS":
      return {
        ...state,
        stampDefaults: { ...state.stampDefaults, ...action.changes },
      };

    default:
      return state;
  }
}

// ─── Hook ────────────────────────────────────────────────────
export function useAnnotateStore() {
  const [state, dispatch] = useReducer(annotateReducer, INITIAL_STATE);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  return { state, dispatch, undo, redo };
}

export type AnnotateDispatch = Dispatch<AnnotateAction>;

// Export reducer for testing
export { annotateReducer, INITIAL_STATE };
