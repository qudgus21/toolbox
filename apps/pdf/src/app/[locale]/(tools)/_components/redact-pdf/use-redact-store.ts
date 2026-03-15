"use client";

import { useReducer, useCallback, type Dispatch } from "react";
import {
  generateRedactId,
  type RedactState,
  type RedactAction,
  type RedactArea,
} from "./redact-types";

const MAX_HISTORY = 50;

function pushHistory(state: RedactState): RedactState["history"] {
  const past = [...state.history.past, state.redactions];
  if (past.length > MAX_HISTORY) past.shift();
  return { past, future: [] };
}

const INITIAL_STATE: RedactState = {
  pages: [],
  redactions: [],
  activeTool: "redactArea",
  selectedRedactionId: null,
  activePageIndex: 0,
  redactColor: "#000000",
  searchQuery: "",
  searchResults: [],
  history: { past: [], future: [] },
};

function redactReducer(state: RedactState, action: RedactAction): RedactState {
  switch (action.type) {
    case "SET_PAGES":
      return { ...state, pages: action.pages };

    case "ADD_REDACTION":
      return {
        ...state,
        redactions: [...state.redactions, action.redaction],
        selectedRedactionId: action.redaction.id,
        history: pushHistory(state),
      };

    case "UPDATE_REDACTION": {
      const idx = state.redactions.findIndex((r) => r.id === action.id);
      if (idx === -1) return state;
      const updated = [...state.redactions];
      updated[idx] = { ...updated[idx], ...action.changes };
      return {
        ...state,
        redactions: updated,
        history: pushHistory(state),
      };
    }

    case "DELETE_REDACTION":
      return {
        ...state,
        redactions: state.redactions.filter((r) => r.id !== action.id),
        selectedRedactionId:
          state.selectedRedactionId === action.id ? null : state.selectedRedactionId,
        history: pushHistory(state),
      };

    case "SELECT_REDACTION":
      return { ...state, selectedRedactionId: action.id };

    case "SET_TOOL":
      return {
        ...state,
        activeTool: action.tool,
        selectedRedactionId: action.tool !== "select" ? null : state.selectedRedactionId,
      };

    case "SET_PAGE":
      if (state.activePageIndex === action.index) return state;
      return { ...state, activePageIndex: action.index };

    case "SET_COLOR":
      return { ...state, redactColor: action.color };

    case "SET_SEARCH_QUERY":
      return { ...state, searchQuery: action.query };

    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.results };

    case "ADD_TEXT_REDACTIONS": {
      const newRedactions = action.results.map((r) => ({
        id: generateRedactId(),
        pageIndex: r.pageIndex,
        x: r.x,
        y: r.y,
        width: r.width,
        height: r.height,
        color: state.redactColor,
        type: "text" as const,
        label: r.text,
      }));
      return {
        ...state,
        redactions: [...state.redactions, ...newRedactions],
        searchResults: [],
        searchQuery: "",
        history: pushHistory(state),
      };
    }

    case "CLEAR_ALL":
      return {
        ...state,
        redactions: [],
        selectedRedactionId: null,
        history: pushHistory(state),
      };

    case "UNDO": {
      if (state.history.past.length === 0) return state;
      const past = [...state.history.past];
      const prev = past.pop()!;
      return {
        ...state,
        redactions: prev,
        selectedRedactionId: null,
        history: {
          past,
          future: [state.redactions, ...state.history.future],
        },
      };
    }

    case "REDO": {
      if (state.history.future.length === 0) return state;
      const future = [...state.history.future];
      const next = future.shift()!;
      return {
        ...state,
        redactions: next,
        selectedRedactionId: null,
        history: {
          past: [...state.history.past, state.redactions],
          future,
        },
      };
    }

    default:
      return state;
  }
}

export function useRedactStore() {
  const [state, dispatch] = useReducer(redactReducer, INITIAL_STATE);
  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);
  return { state, dispatch, undo, redo };
}

export type RedactDispatch = Dispatch<RedactAction>;
