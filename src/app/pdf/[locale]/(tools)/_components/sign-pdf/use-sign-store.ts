"use client";

import { useReducer, useCallback, type Dispatch } from "react";
import type {
  SignState,
  SignAction,
  SignElement,
} from "./sign-types";

const MAX_HISTORY = 50;

const INITIAL_STATE: SignState = {
  pages: [],
  elements: [],
  selectedElementId: null,
  activePageIndex: 0,
  zoom: 1,
  history: { past: [], future: [] },
  savedSignature: null,
  savedInitials: null,
  userName: "",
  dateFormat: "iso",
  createModalOpen: false,
  createModalTarget: "signature",
};

// ─── History ────────────────────────────────────────────────
function pushHistory(state: SignState): SignState["history"] {
  const past = [...state.history.past, state.elements];
  if (past.length > MAX_HISTORY) past.shift();
  return { past, future: [] };
}

// ─── Reducer ────────────────────────────────────────────────
function signReducer(state: SignState, action: SignAction): SignState {
  switch (action.type) {
    case "SET_PAGES":
      return { ...state, pages: action.pages };

    case "ADD_ELEMENT":
      return {
        ...state,
        elements: [...state.elements, action.element],
        selectedElementId: action.element.id,
        history: pushHistory(state),
      };

    case "UPDATE_ELEMENT": {
      const idx = state.elements.findIndex((e) => e.id === action.id);
      if (idx === -1) return state;
      const updated = [...state.elements];
      updated[idx] = { ...updated[idx], ...action.changes } as SignElement;
      return {
        ...state,
        elements: updated,
        history: action.skipHistory ? state.history : pushHistory(state),
      };
    }

    case "DELETE_ELEMENT":
      return {
        ...state,
        elements: state.elements.filter((e) => e.id !== action.id),
        selectedElementId:
          state.selectedElementId === action.id ? null : state.selectedElementId,
        history: pushHistory(state),
      };

    case "DUPLICATE_ELEMENT": {
      const src = state.elements.find((e) => e.id === action.id);
      if (!src) return state;
      const dup: SignElement = {
        ...src,
        id: `sign_${Date.now()}_dup`,
        x: src.x + 20,
        y: src.y + 20,
      };
      return {
        ...state,
        elements: [...state.elements, dup],
        selectedElementId: dup.id,
        history: pushHistory(state),
      };
    }

    case "SELECT_ELEMENT":
      return { ...state, selectedElementId: action.id };

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
        elements: prev,
        selectedElementId: null,
        history: {
          past,
          future: [state.elements, ...state.history.future],
        },
      };
    }

    case "REDO": {
      if (state.history.future.length === 0) return state;
      const future = [...state.history.future];
      const next = future.shift()!;
      return {
        ...state,
        elements: next,
        selectedElementId: null,
        history: {
          past: [...state.history.past, state.elements],
          future,
        },
      };
    }

    case "SET_SIGNATURE":
      return { ...state, savedSignature: action.data };

    case "SET_INITIALS":
      return { ...state, savedInitials: action.data };

    case "SET_USER_NAME":
      return { ...state, userName: action.name };

    case "SET_DATE_FORMAT":
      return { ...state, dateFormat: action.format };

    case "OPEN_CREATE_MODAL":
      return {
        ...state,
        createModalOpen: true,
        createModalTarget: action.target,
      };

    case "CLOSE_CREATE_MODAL":
      return { ...state, createModalOpen: false };

    default:
      return state;
  }
}

// ─── Hook ───────────────────────────────────────────────────
export function useSignStore() {
  const [state, dispatch] = useReducer(signReducer, INITIAL_STATE);

  const undo = useCallback(() => dispatch({ type: "UNDO" }), []);
  const redo = useCallback(() => dispatch({ type: "REDO" }), []);

  return { state, dispatch, undo, redo };
}

export type SignDispatch = Dispatch<SignAction>;

// Export for testing
export { signReducer, INITIAL_STATE };
