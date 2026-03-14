"use client";

import { useReducer, useCallback, type Dispatch } from "react";
import type {
  EditorState,
  EditorAction,
  EditorElement,
  TextDefaults,
  ShapeDefaults,
  DrawDefaults,
} from "./editor-types";

const MAX_HISTORY = 50;

const INITIAL_TEXT_DEFAULTS: TextDefaults = {
  fontFamily: "Helvetica",
  fontSize: 16,
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
      updated[idx] = { ...updated[idx], ...action.changes } as EditorElement;
      return {
        ...state,
        annotations: updated,
        history: pushHistory(state),
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
      return {
        ...state,
        activePageIndex: action.index,
        selectedElementId: null,
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
  const [state, dispatch] = useReducer(editorReducer, INITIAL_STATE);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  return { state, dispatch, undo, redo };
}

export type EditorDispatch = Dispatch<EditorAction>;
