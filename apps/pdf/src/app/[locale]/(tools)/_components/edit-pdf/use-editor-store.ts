"use client";

import { useReducer, useCallback, useEffect, type Dispatch } from "react";
import {
  measureTextSize,
  type EditorState,
  type EditorAction,
  type EditorElement,
  type TextDefaults,
  type ShapeDefaults,
  type DrawDefaults,
} from "./editor-types";

const MAX_HISTORY = 50;
const STORAGE_KEY = "pdf-editor-text-prefs";

function loadTextPrefs(): Partial<TextDefaults> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const prefs: Partial<TextDefaults> = {};
    if (typeof parsed.fontFamily === "string") prefs.fontFamily = parsed.fontFamily;
    if (typeof parsed.fontSize === "number") prefs.fontSize = parsed.fontSize;
    return prefs;
  } catch {
    return {};
  }
}

function saveTextPrefs(fontFamily: string, fontSize: number) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ fontFamily, fontSize }));
  } catch {
    // storage full or unavailable
  }
}

const INITIAL_TEXT_DEFAULTS: TextDefaults = {
  fontFamily: "Helvetica",
  fontSize: 14,
  fontColor: "#000000",
  backgroundColor: "transparent",
  bold: false,
  italic: false,
  underline: false,
  align: "left",
};

const INITIAL_SHAPE_DEFAULTS: ShapeDefaults = {
  borderColor: "#000000",
  fillColor: "transparent",
  strokeWidth: 2,
  opacity: 1,
};

const INITIAL_DRAW_DEFAULTS: DrawDefaults = {
  strokeColor: "#000000",
  strokeWidth: 3,
};

const INITIAL_STATE: EditorState = {
  pages: [],
  annotations: [],
  activeTool: "select",
  selectedElementId: null,
  activePageIndex: 0,
  zoom: 1,
  history: { past: [], future: [] },
  textDefaults: INITIAL_TEXT_DEFAULTS,
  shapeDefaults: INITIAL_SHAPE_DEFAULTS,
  drawDefaults: INITIAL_DRAW_DEFAULTS,
};

// Push current annotations to history before mutation
function pushHistory(state: EditorState): EditorState["history"] {
  const past = [...state.history.past, state.annotations];
  if (past.length > MAX_HISTORY) past.shift();
  return { past, future: [] };
}

function editorReducer(
  state: EditorState,
  action: EditorAction,
): EditorState {
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

      // Auto-adjust text size when text properties change
      if (prev.type === "text") {
        const merged = { ...prev, ...changes } as typeof prev;
        const needsResize =
          "fontSize" in changes ||
          "content" in changes ||
          "fontFamily" in changes ||
          "bold" in changes ||
          "italic" in changes;
        if (needsResize) {
          const fontChanged =
            "fontSize" in changes ||
            "fontFamily" in changes ||
            "bold" in changes ||
            "italic" in changes;

          // If height is already provided from DOM measurement, prefer it
          const directHeight = "height" in changes ? (changes as { height: number }).height : null;

          if (fontChanged) {
            // Font properties changed → recalculate both width and height
            const page = state.pages[merged.pageIndex];
            const maxW = page ? page.width - merged.x : 9999;
            const { width: w, height: h } = measureTextSize(
              merged.content,
              merged.fontSize,
              merged.fontFamily,
              merged.bold,
              merged.italic,
              maxW,
            );
            changes = { ...changes, width: w, height: h };
          } else if (merged.manualWidth) {
            // User manually resized → keep width, only adjust height
            if (directHeight === null) {
              const { height: h } = measureTextSize(
                merged.content,
                merged.fontSize,
                merged.fontFamily,
                merged.bold,
                merged.italic,
                merged.width,
              );
              changes = { ...changes, height: h };
            }
          } else {
            // Auto width → expand/shrink to fit content
            const page = state.pages[merged.pageIndex];
            const maxW = page ? page.width - merged.x : 9999;
            const { width: w, height: h } = measureTextSize(
              merged.content,
              merged.fontSize,
              merged.fontFamily,
              merged.bold,
              merged.italic,
              maxW,
            );
            // If text hit the page boundary, lock the width
            if (w >= maxW) {
              changes = { ...changes, width: w, manualWidth: true, ...(directHeight === null ? { height: h } : {}) };
            } else {
              changes = { ...changes, width: w, ...(directHeight === null ? { height: h } : {}) };
            }
          }
        }
      }

      updated[idx] = { ...prev, ...changes } as EditorElement;
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
          state.selectedElementId === action.id
            ? null
            : state.selectedElementId,
        history: pushHistory(state),
      };

    case "SELECT_ELEMENT":
      return { ...state, selectedElementId: action.id };

    case "SET_TOOL":
      return {
        ...state,
        activeTool: action.tool,
        selectedElementId:
          action.tool !== "select" ? null : state.selectedElementId,
      };

    case "SET_PAGE":
      if (state.activePageIndex === action.index) return state;
      return {
        ...state,
        activePageIndex: action.index,
      };

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

    case "UPDATE_TEXT_DEFAULTS":
      return {
        ...state,
        textDefaults: { ...state.textDefaults, ...action.changes },
      };

    case "UPDATE_SHAPE_DEFAULTS":
      return {
        ...state,
        shapeDefaults: { ...state.shapeDefaults, ...action.changes },
      };

    case "UPDATE_DRAW_DEFAULTS":
      return {
        ...state,
        drawDefaults: { ...state.drawDefaults, ...action.changes },
      };

    default:
      return state;
  }
}

export function useEditorStore() {
  const [state, dispatch] = useReducer(editorReducer, INITIAL_STATE, (init) => {
    const prefs = loadTextPrefs();
    if (Object.keys(prefs).length === 0) return init;
    return {
      ...init,
      textDefaults: { ...init.textDefaults, ...prefs },
    };
  });

  // Persist font preferences on change
  useEffect(() => {
    saveTextPrefs(state.textDefaults.fontFamily, state.textDefaults.fontSize);
  }, [state.textDefaults.fontFamily, state.textDefaults.fontSize]);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  return { state, dispatch, undo, redo };
}

export type EditorDispatch = Dispatch<EditorAction>;
