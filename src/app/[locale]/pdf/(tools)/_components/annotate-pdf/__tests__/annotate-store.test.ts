import { describe, it, expect, vi, beforeEach } from "vitest";
import type {
  AnnotateState,
  AnnotateElement,
  HighlightElement,
  RectangleElement,
  TextBoxElement,
  FreehandElement,
  EllipseElement,
  ArrowElement,
  StampElement,
  UnderlineElement,
  StrikethroughElement,
  PageData,
} from "../annotate-types";

// Mock measureTextSize before importing the store
vi.mock("../../edit-pdf/editor-types", async (importOriginal) => {
  const orig = (await importOriginal()) as Record<string, unknown>;
  return {
    ...orig,
    measureTextSize: vi.fn(
      (
        _text: string,
        fontSize: number,
        _fontFamily: string,
        _bold: boolean,
        _italic: boolean,
        maxWidth: number,
        lineHeight = 1.2,
      ) => {
        // Simplified mock: width = fontSize * text.length * 0.6, height = fontSize * lineHeight
        const w = fontSize * (_text || " ").length * 0.6;
        return {
          width: Math.ceil(Math.min(w, maxWidth)),
          height: Math.ceil(fontSize * lineHeight),
          lineCount: 1,
        };
      },
    ),
  };
});

import { annotateReducer, INITIAL_STATE } from "../use-annotate-store";
import { measureTextSize } from "../../edit-pdf/editor-types";

/** Deep-clone INITIAL_STATE so no test can mutate it. */
function freshState(): AnnotateState {
  return JSON.parse(JSON.stringify(INITIAL_STATE));
}

// ─── Helpers ────────────────────────────────────────────────
let _testId = 0;
function testId(): string {
  return `test_${++_testId}`;
}

function makeHighlight(overrides: Partial<HighlightElement> = {}): HighlightElement {
  return {
    id: testId(),
    type: "highlight",
    pageIndex: 0,
    x: 10,
    y: 20,
    width: 100,
    height: 20,
    rotation: 0,
    opacity: 0.35,
    color: "yellow",
    ...overrides,
  };
}

function makeRectangle(overrides: Partial<RectangleElement> = {}): RectangleElement {
  return {
    id: testId(),
    type: "rectangle",
    pageIndex: 0,
    x: 50,
    y: 50,
    width: 80,
    height: 60,
    rotation: 0,
    opacity: 1,
    borderColor: "#EF4444",
    fillColor: "transparent",
    strokeWidth: 2,
    ...overrides,
  };
}

function makeTextBox(overrides: Partial<TextBoxElement> = {}): TextBoxElement {
  return {
    id: testId(),
    type: "text-box",
    pageIndex: 0,
    x: 10,
    y: 10,
    width: 100,
    height: 20,
    rotation: 0,
    opacity: 1,
    content: "Hello",
    fontFamily: "Helvetica",
    fontSize: 14,
    fontColor: "#000000",
    backgroundColor: "transparent",
    borderColor: "#000000",
    bold: false,
    italic: false,
    align: "left",
    lineHeight: 1.2,
    ...overrides,
  };
}

function makeArrow(overrides: Partial<ArrowElement> = {}): ArrowElement {
  return {
    id: testId(),
    type: "arrow",
    pageIndex: 0,
    x: 0,
    y: 0,
    width: 100,
    height: 50,
    rotation: 0,
    opacity: 1,
    points: [0, 0, 100, 50],
    strokeColor: "#EF4444",
    strokeWidth: 2,
    headSize: 10,
    ...overrides,
  };
}

function makeStamp(overrides: Partial<StampElement> = {}): StampElement {
  return {
    id: testId(),
    type: "stamp",
    pageIndex: 0,
    x: 100,
    y: 100,
    width: 120,
    height: 40,
    rotation: 0,
    opacity: 1,
    stampKind: "approved",
    color: "#22C55E",
    ...overrides,
  };
}

function makePage(overrides: Partial<PageData> = {}): PageData {
  return { width: 612, height: 792, imageUrl: "data:image/png;base64,", ...overrides };
}

/** Build a state with some annotations already added (no history). */
function stateWith(
  annotations: AnnotateElement[],
  extra: Partial<AnnotateState> = {},
): AnnotateState {
  return { ...freshState(), annotations, pages: [makePage()], ...extra };
}

// ─── Tests ──────────────────────────────────────────────────
let FRESH: AnnotateState;

beforeEach(() => {
  _testId = 0;
  vi.clearAllMocks();
  FRESH = freshState();
});

// ──────────────────────────────────────────────────────────────
// 1. ADD_ELEMENT
// ──────────────────────────────────────────────────────────────
describe("ADD_ELEMENT", () => {
  it("appends element to annotations", () => {
    const el = makeHighlight();
    const next = annotateReducer(FRESH, { type: "ADD_ELEMENT", element: el });
    expect(next.annotations).toHaveLength(1);
    expect(next.annotations[0]).toBe(el);
  });

  it("selects the newly added element", () => {
    const el = makeRectangle();
    const next = annotateReducer(FRESH, { type: "ADD_ELEMENT", element: el });
    expect(next.selectedElementId).toBe(el.id);
  });

  it("pushes current annotations to history.past and clears future", () => {
    const existing = makeHighlight();
    const state = stateWith([existing]);
    state.history.future = [[existing]]; // simulate a future stack

    const newEl = makeRectangle();
    const next = annotateReducer(state, { type: "ADD_ELEMENT", element: newEl });

    expect(next.history.past).toHaveLength(1);
    expect(next.history.past[0]).toEqual([existing]);
    expect(next.history.future).toHaveLength(0);
  });
});

// ──────────────────────────────────────────────────────────────
// 2. UPDATE_ELEMENT
// ──────────────────────────────────────────────────────────────
describe("UPDATE_ELEMENT", () => {
  it("updates element by id", () => {
    const el = makeHighlight({ id: "h1" });
    const state = stateWith([el]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "h1",
      changes: { color: "pink" },
    });
    expect((next.annotations[0] as HighlightElement).color).toBe("pink");
  });

  it("pushes history by default", () => {
    const el = makeRectangle({ id: "r1" });
    const state = stateWith([el]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "r1",
      changes: { x: 99 },
    });
    expect(next.history.past).toHaveLength(1);
  });

  it("skips history when skipHistory is true", () => {
    const el = makeRectangle({ id: "r1" });
    const state = stateWith([el]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "r1",
      changes: { x: 99 },
      skipHistory: true,
    });
    expect(next.history.past).toHaveLength(0);
  });

  it("returns same state if id not found", () => {
    const el = makeHighlight({ id: "h1" });
    const state = stateWith([el]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "nonexistent",
      changes: { x: 0 },
    });
    expect(next).toBe(state);
  });
});

// ──────────────────────────────────────────────────────────────
// 3. UPDATE_ELEMENT — text-box auto-resize
// ──────────────────────────────────────────────────────────────
describe("UPDATE_ELEMENT text-box auto-resize", () => {
  it("recalculates width/height when fontSize changes", () => {
    const tb = makeTextBox({ id: "tb1", content: "Hello", fontSize: 14 });
    const state = stateWith([tb]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "tb1",
      changes: { fontSize: 24 },
    });
    expect(measureTextSize).toHaveBeenCalled();
    const updated = next.annotations[0] as TextBoxElement;
    // mock: width = ceil(min(24 * 5 * 0.6, maxW)) = ceil(72) = 72
    expect(updated.fontSize).toBe(24);
    expect(updated.width).toBe(72);
  });

  it("recalculates when content changes (no manualWidth)", () => {
    const tb = makeTextBox({ id: "tb1", content: "Hi" });
    const state = stateWith([tb]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "tb1",
      changes: { content: "Hello World" },
    });
    expect(measureTextSize).toHaveBeenCalled();
    const updated = next.annotations[0] as TextBoxElement;
    // content changed but not fontFamily/fontSize/bold/italic => not "fontChanged", goes to else branch
    // mock: width = ceil(min(14 * 11 * 0.6, maxW)) = ceil(92.4) = 93
    expect(updated.width).toBe(93);
  });

  it("recalculates when fontFamily changes", () => {
    const tb = makeTextBox({ id: "tb1" });
    const state = stateWith([tb]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "tb1",
      changes: { fontFamily: "Arial" },
    });
    expect(measureTextSize).toHaveBeenCalled();
    const updated = next.annotations[0] as TextBoxElement;
    expect(updated.fontFamily).toBe("Arial");
  });

  it("recalculates when bold changes", () => {
    const tb = makeTextBox({ id: "tb1" });
    const state = stateWith([tb]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "tb1",
      changes: { bold: true },
    });
    expect(measureTextSize).toHaveBeenCalled();
    const updated = next.annotations[0] as TextBoxElement;
    expect(updated.bold).toBe(true);
  });

  it("recalculates when italic changes", () => {
    const tb = makeTextBox({ id: "tb1" });
    const state = stateWith([tb]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "tb1",
      changes: { italic: true },
    });
    expect(measureTextSize).toHaveBeenCalled();
  });

  it("skips resize when skipResize is true", () => {
    const tb = makeTextBox({ id: "tb1" });
    const state = stateWith([tb]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "tb1",
      changes: { fontSize: 30 },
      skipResize: true,
    });
    expect(measureTextSize).not.toHaveBeenCalled();
    expect((next.annotations[0] as TextBoxElement).fontSize).toBe(30);
  });

  it("does not resize for non-text-box elements", () => {
    const el = makeRectangle({ id: "r1" });
    const state = stateWith([el]);
    annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "r1",
      changes: { width: 200 },
    });
    expect(measureTextSize).not.toHaveBeenCalled();
  });

  it("recalculates height only when manualWidth is set and content changes", () => {
    const tb = makeTextBox({ id: "tb1", manualWidth: true, width: 200, content: "Hi" });
    const state = stateWith([tb]);
    const next = annotateReducer(state, {
      type: "UPDATE_ELEMENT",
      id: "tb1",
      changes: { content: "Longer text here" },
    });
    expect(measureTextSize).toHaveBeenCalled();
    const updated = next.annotations[0] as TextBoxElement;
    // manualWidth + content change (not fontChanged) => only height recalculated, width stays
    expect(updated.width).toBe(200);
  });
});

// ──────────────────────────────────────────────────────────────
// 4. DELETE_ELEMENT
// ──────────────────────────────────────────────────────────────
describe("DELETE_ELEMENT", () => {
  it("removes the element", () => {
    const el = makeHighlight({ id: "h1" });
    const state = stateWith([el]);
    const next = annotateReducer(state, { type: "DELETE_ELEMENT", id: "h1" });
    expect(next.annotations).toHaveLength(0);
  });

  it("clears selection if the deleted element was selected", () => {
    const el = makeHighlight({ id: "h1" });
    const state = stateWith([el], { selectedElementId: "h1" });
    const next = annotateReducer(state, { type: "DELETE_ELEMENT", id: "h1" });
    expect(next.selectedElementId).toBeNull();
  });

  it("preserves selection if a different element was selected", () => {
    const el1 = makeHighlight({ id: "h1" });
    const el2 = makeRectangle({ id: "r1" });
    const state = stateWith([el1, el2], { selectedElementId: "r1" });
    const next = annotateReducer(state, { type: "DELETE_ELEMENT", id: "h1" });
    expect(next.selectedElementId).toBe("r1");
  });

  it("pushes history", () => {
    const el = makeHighlight({ id: "h1" });
    const state = stateWith([el]);
    const next = annotateReducer(state, { type: "DELETE_ELEMENT", id: "h1" });
    expect(next.history.past).toHaveLength(1);
    expect(next.history.past[0]).toEqual([el]);
  });
});

// ──────────────────────────────────────────────────────────────
// 5. SELECT_ELEMENT
// ──────────────────────────────────────────────────────────────
describe("SELECT_ELEMENT", () => {
  it("sets selectedElementId", () => {
    const next = annotateReducer(FRESH, { type: "SELECT_ELEMENT", id: "abc" });
    expect(next.selectedElementId).toBe("abc");
  });

  it("can set to null to deselect", () => {
    const state = { ...FRESH, selectedElementId: "abc" };
    const next = annotateReducer(state, { type: "SELECT_ELEMENT", id: null });
    expect(next.selectedElementId).toBeNull();
  });
});

// ──────────────────────────────────────────────────────────────
// 6. SET_TOOL
// ──────────────────────────────────────────────────────────────
describe("SET_TOOL", () => {
  it("changes the active tool", () => {
    const next = annotateReducer(FRESH, { type: "SET_TOOL", tool: "rectangle" });
    expect(next.activeTool).toBe("rectangle");
  });

  it("clears selection for non-select tools", () => {
    const state = { ...FRESH, selectedElementId: "abc" };
    const next = annotateReducer(state, { type: "SET_TOOL", tool: "highlight" });
    expect(next.selectedElementId).toBeNull();
  });

  it("preserves selection when switching to select tool", () => {
    const state = { ...FRESH, selectedElementId: "abc", activeTool: "rectangle" as const };
    const next = annotateReducer(state, { type: "SET_TOOL", tool: "select" });
    expect(next.selectedElementId).toBe("abc");
  });

  it("clears pendingStamp for non-stamp tools", () => {
    const state = { ...FRESH, pendingStamp: "approved" as const };
    const next = annotateReducer(state, { type: "SET_TOOL", tool: "select" });
    expect(next.pendingStamp).toBeNull();
  });

  it("preserves pendingStamp when switching to stamp tool", () => {
    const state = { ...FRESH, pendingStamp: "draft" as const };
    const next = annotateReducer(state, { type: "SET_TOOL", tool: "stamp" });
    expect(next.pendingStamp).toBe("draft");
  });
});

// ──────────────────────────────────────────────────────────────
// 7. SET_PAGE
// ──────────────────────────────────────────────────────────────
describe("SET_PAGE", () => {
  it("changes page index", () => {
    const next = annotateReducer(FRESH, { type: "SET_PAGE", index: 3 });
    expect(next.activePageIndex).toBe(3);
  });

  it("returns same state if page is already active (no-op)", () => {
    const state = { ...FRESH, activePageIndex: 5 };
    const next = annotateReducer(state, { type: "SET_PAGE", index: 5 });
    expect(next).toBe(state);
  });
});

// ──────────────────────────────────────────────────────────────
// 8. SET_ZOOM
// ──────────────────────────────────────────────────────────────
describe("SET_ZOOM", () => {
  it("changes zoom level", () => {
    const next = annotateReducer(FRESH, { type: "SET_ZOOM", zoom: 1.5 });
    expect(next.zoom).toBe(1.5);
  });
});

// ──────────────────────────────────────────────────────────────
// 9. UNDO / REDO
// ──────────────────────────────────────────────────────────────
describe("UNDO / REDO", () => {
  it("UNDO restores previous annotations", () => {
    const el = makeHighlight({ id: "h1" });
    let state = FRESH;
    state = annotateReducer(state, { type: "ADD_ELEMENT", element: el });
    expect(state.annotations).toHaveLength(1);

    const undone = annotateReducer(state, { type: "UNDO" });
    expect(undone.annotations).toHaveLength(0);
  });

  it("UNDO clears selection", () => {
    const el = makeHighlight({ id: "h1" });
    let state = FRESH;
    state = annotateReducer(state, { type: "ADD_ELEMENT", element: el });
    expect(state.selectedElementId).toBe("h1");

    const undone = annotateReducer(state, { type: "UNDO" });
    expect(undone.selectedElementId).toBeNull();
  });

  it("UNDO is no-op when past is empty", () => {
    const s = freshState();
    const next = annotateReducer(s, { type: "UNDO" });
    expect(next).toBe(s);
  });

  it("REDO restores future annotations", () => {
    const el = makeHighlight({ id: "h1" });
    let state = freshState();
    state = annotateReducer(state, { type: "ADD_ELEMENT", element: el });
    state = annotateReducer(state, { type: "UNDO" });
    expect(state.annotations).toHaveLength(0);

    state = annotateReducer(state, { type: "REDO" });
    expect(state.annotations).toHaveLength(1);
    expect(state.annotations[0].id).toBe("h1");
  });

  it("REDO is no-op when future is empty", () => {
    const s = freshState();
    const next = annotateReducer(s, { type: "REDO" });
    expect(next).toBe(s);
  });

  it("new action after UNDO clears the future stack", () => {
    const el1 = makeHighlight({ id: "h1" });
    const el2 = makeRectangle({ id: "r1" });
    let state = FRESH;
    state = annotateReducer(state, { type: "ADD_ELEMENT", element: el1 });
    state = annotateReducer(state, { type: "ADD_ELEMENT", element: el2 });
    state = annotateReducer(state, { type: "UNDO" });
    expect(state.history.future).toHaveLength(1);

    // New action clears future
    const el3 = makeStamp({ id: "s1" });
    state = annotateReducer(state, { type: "ADD_ELEMENT", element: el3 });
    expect(state.history.future).toHaveLength(0);
  });

  it("multiple UNDO/REDO round-trip works", () => {
    const el1 = makeHighlight({ id: "h1" });
    const el2 = makeRectangle({ id: "r1" });
    let state = FRESH;
    state = annotateReducer(state, { type: "ADD_ELEMENT", element: el1 });
    state = annotateReducer(state, { type: "ADD_ELEMENT", element: el2 });

    // Undo twice
    state = annotateReducer(state, { type: "UNDO" });
    expect(state.annotations).toHaveLength(1);
    state = annotateReducer(state, { type: "UNDO" });
    expect(state.annotations).toHaveLength(0);

    // Redo twice
    state = annotateReducer(state, { type: "REDO" });
    expect(state.annotations).toHaveLength(1);
    state = annotateReducer(state, { type: "REDO" });
    expect(state.annotations).toHaveLength(2);
  });
});

// ──────────────────────────────────────────────────────────────
// 10. UNDO/REDO — MAX_HISTORY limit
// ──────────────────────────────────────────────────────────────
describe("UNDO/REDO history limit (MAX_HISTORY=50)", () => {
  it("past stack is capped at 50 entries", () => {
    let state = FRESH;
    for (let i = 0; i < 60; i++) {
      state = annotateReducer(state, {
        type: "ADD_ELEMENT",
        element: makeHighlight({ id: `h_${i}` }),
      });
    }
    expect(state.history.past.length).toBe(50);
  });

  it("oldest history is dropped when limit is exceeded", () => {
    let state = FRESH;
    for (let i = 0; i < 55; i++) {
      state = annotateReducer(state, {
        type: "ADD_ELEMENT",
        element: makeHighlight({ id: `h_${i}` }),
      });
    }
    // The first 5 entries should have been shifted out
    // past[0] should correspond to the state after adding the 6th element (index 5)
    // which had 5 annotations [h_0..h_4]
    expect(state.history.past[0]).toHaveLength(5);
  });
});

// ──────────────────────────────────────────────────────────────
// 11. MOVE_LAYER
// ──────────────────────────────────────────────────────────────
describe("MOVE_LAYER", () => {
  function threeElements() {
    const a = makeHighlight({ id: "a", pageIndex: 0 });
    const b = makeRectangle({ id: "b", pageIndex: 0 });
    const c = makeStamp({ id: "c", pageIndex: 0 });
    return stateWith([a, b, c]);
  }

  it("moves element up (higher z-index)", () => {
    const state = threeElements();
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "a", direction: "up" });
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toEqual(["b", "a", "c"]);
  });

  it("moves element down (lower z-index)", () => {
    const state = threeElements();
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "b", direction: "down" });
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toEqual(["b", "a", "c"]);
  });

  it("moves element to top", () => {
    const state = threeElements();
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "a", direction: "top" });
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toEqual(["b", "c", "a"]);
  });

  it("moves element to bottom", () => {
    const state = threeElements();
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "c", direction: "bottom" });
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toEqual(["c", "a", "b"]);
  });

  it("up is no-op when element is already at top", () => {
    const state = threeElements();
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "c", direction: "up" });
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toEqual(["a", "b", "c"]);
  });

  it("down is no-op when element is already at bottom", () => {
    const state = threeElements();
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "a", direction: "down" });
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toEqual(["a", "b", "c"]);
  });

  it("does not affect elements on other pages", () => {
    const a = makeHighlight({ id: "a", pageIndex: 0 });
    const b = makeRectangle({ id: "b", pageIndex: 0 });
    const other = makeStamp({ id: "other", pageIndex: 1 });
    const state = stateWith([a, b, other]);
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "a", direction: "top" });
    // other-page elements come first (otherAnnotations), then page 0
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toContain("other");
    expect(ids.indexOf("b")).toBeLessThan(ids.indexOf("a"));
  });

  it("returns same state if id not found on active page", () => {
    const state = threeElements();
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "nonexistent", direction: "up" });
    expect(next).toBe(state);
  });

  it("pushes history", () => {
    const state = threeElements();
    const next = annotateReducer(state, { type: "MOVE_LAYER", id: "a", direction: "top" });
    expect(next.history.past).toHaveLength(1);
  });
});

// ──────────────────────────────────────────────────────────────
// 12. REORDER_ANNOTATIONS
// ──────────────────────────────────────────────────────────────
describe("REORDER_ANNOTATIONS", () => {
  it("reorders annotations on a page by id list", () => {
    const a = makeHighlight({ id: "a", pageIndex: 0 });
    const b = makeRectangle({ id: "b", pageIndex: 0 });
    const c = makeStamp({ id: "c", pageIndex: 0 });
    const state = stateWith([a, b, c]);

    const next = annotateReducer(state, {
      type: "REORDER_ANNOTATIONS",
      pageIndex: 0,
      orderedIds: ["c", "a", "b"],
    });
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toEqual(["c", "a", "b"]);
  });

  it("does not affect other pages", () => {
    const a = makeHighlight({ id: "a", pageIndex: 0 });
    const b = makeRectangle({ id: "b", pageIndex: 1 });
    const c = makeStamp({ id: "c", pageIndex: 0 });
    const state = stateWith([a, b, c]);

    const next = annotateReducer(state, {
      type: "REORDER_ANNOTATIONS",
      pageIndex: 0,
      orderedIds: ["c", "a"],
    });
    // other page (b) comes first, then reordered page 0
    const ids = next.annotations.map((e) => e.id);
    expect(ids).toEqual(["b", "c", "a"]);
  });

  it("pushes history", () => {
    const a = makeHighlight({ id: "a", pageIndex: 0 });
    const state = stateWith([a]);
    const next = annotateReducer(state, {
      type: "REORDER_ANNOTATIONS",
      pageIndex: 0,
      orderedIds: ["a"],
    });
    expect(next.history.past).toHaveLength(1);
  });
});

// ──────────────────────────────────────────────────────────────
// 13. SET_PENDING_STAMP
// ──────────────────────────────────────────────────────────────
describe("SET_PENDING_STAMP", () => {
  it("sets the pending stamp kind", () => {
    const next = annotateReducer(FRESH, {
      type: "SET_PENDING_STAMP",
      stamp: "confidential",
    });
    expect(next.pendingStamp).toBe("confidential");
  });

  it("activates stamp tool", () => {
    const next = annotateReducer(FRESH, {
      type: "SET_PENDING_STAMP",
      stamp: "draft",
    });
    expect(next.activeTool).toBe("stamp");
  });

  it("clears selection", () => {
    const state = { ...FRESH, selectedElementId: "abc" };
    const next = annotateReducer(state, {
      type: "SET_PENDING_STAMP",
      stamp: "approved",
    });
    expect(next.selectedElementId).toBeNull();
  });
});

// ──────────────────────────────────────────────────────────────
// 15. UPDATE_*_DEFAULTS — all 8 default update actions
// ──────────────────────────────────────────────────────────────
describe("UPDATE_*_DEFAULTS", () => {
  it("UPDATE_HIGHLIGHT_DEFAULTS merges changes", () => {
    const next = annotateReducer(FRESH, {
      type: "UPDATE_HIGHLIGHT_DEFAULTS",
      changes: { color: "pink", opacity: 0.5 },
    });
    expect(next.highlightDefaults.color).toBe("pink");
    expect(next.highlightDefaults.opacity).toBe(0.5);
  });

  it("UPDATE_HIGHLIGHT_DEFAULTS preserves unset fields", () => {
    const next = annotateReducer(FRESH, {
      type: "UPDATE_HIGHLIGHT_DEFAULTS",
      changes: { color: "blue" },
    });
    expect(next.highlightDefaults.opacity).toBe(0.35);
  });

  it("UPDATE_MARKUP_DEFAULTS merges changes", () => {
    const next = annotateReducer(FRESH, {
      type: "UPDATE_MARKUP_DEFAULTS",
      changes: { color: "#00FF00", strokeWidth: 4 },
    });
    expect(next.markupDefaults.color).toBe("#00FF00");
    expect(next.markupDefaults.strokeWidth).toBe(4);
  });

  it("UPDATE_DRAW_DEFAULTS merges changes", () => {
    const next = annotateReducer(FRESH, {
      type: "UPDATE_DRAW_DEFAULTS",
      changes: { strokeColor: "#0000FF", strokeWidth: 5 },
    });
    expect(next.drawDefaults.strokeColor).toBe("#0000FF");
    expect(next.drawDefaults.strokeWidth).toBe(5);
  });

  it("UPDATE_SHAPE_DEFAULTS merges changes", () => {
    const next = annotateReducer(FRESH, {
      type: "UPDATE_SHAPE_DEFAULTS",
      changes: { borderColor: "#111", fillColor: "#222", opacity: 0.8 },
    });
    expect(next.shapeDefaults.borderColor).toBe("#111");
    expect(next.shapeDefaults.fillColor).toBe("#222");
    expect(next.shapeDefaults.opacity).toBe(0.8);
    // strokeWidth preserved
    expect(next.shapeDefaults.strokeWidth).toBe(2);
  });

  it("UPDATE_TEXT_BOX_DEFAULTS merges changes", () => {
    const next = annotateReducer(FRESH, {
      type: "UPDATE_TEXT_BOX_DEFAULTS",
      changes: { fontSize: 24, bold: true, align: "center" },
    });
    expect(next.textBoxDefaults.fontSize).toBe(24);
    expect(next.textBoxDefaults.bold).toBe(true);
    expect(next.textBoxDefaults.align).toBe("center");
    // preserved
    expect(next.textBoxDefaults.fontFamily).toBe("Helvetica");
    expect(next.textBoxDefaults.italic).toBe(false);
  });

  it("UPDATE_ARROW_DEFAULTS merges changes", () => {
    const next = annotateReducer(FRESH, {
      type: "UPDATE_ARROW_DEFAULTS",
      changes: { strokeColor: "#000", headSize: 20 },
    });
    expect(next.arrowDefaults.strokeColor).toBe("#000");
    expect(next.arrowDefaults.headSize).toBe(20);
    expect(next.arrowDefaults.strokeWidth).toBe(2);
  });

  it("UPDATE_STAMP_DEFAULTS merges changes", () => {
    const next = annotateReducer(FRESH, {
      type: "UPDATE_STAMP_DEFAULTS",
      changes: { stampKind: "rejected", color: "#EF4444" },
    });
    expect(next.stampDefaults.stampKind).toBe("rejected");
    expect(next.stampDefaults.color).toBe("#EF4444");
  });
});

// ──────────────────────────────────────────────────────────────
// SET_PAGES
// ──────────────────────────────────────────────────────────────
describe("SET_PAGES", () => {
  it("sets pages data", () => {
    const pages = [makePage(), makePage({ width: 800 })];
    const next = annotateReducer(FRESH, { type: "SET_PAGES", pages });
    expect(next.pages).toHaveLength(2);
    expect(next.pages[1].width).toBe(800);
  });
});

// ──────────────────────────────────────────────────────────────
// INITIAL_STATE shape
// ──────────────────────────────────────────────────────────────
describe("INITIAL_STATE defaults", () => {
  it("has expected default values", () => {
    expect(FRESH.annotations).toEqual([]);
    expect(FRESH.activeTool).toBe("select");
    expect(FRESH.selectedElementId).toBeNull();
    expect(FRESH.activePageIndex).toBe(0);
    expect(FRESH.zoom).toBe(1);
    expect(FRESH.history).toEqual({ past: [], future: [] });
    expect(FRESH.pendingStamp).toBeNull();
  });

  it("has correct highlight defaults", () => {
    expect(FRESH.highlightDefaults).toEqual({ color: "yellow", opacity: 0.35 });
  });

  it("has correct text-box defaults", () => {
    expect(FRESH.textBoxDefaults).toEqual({
      fontFamily: "Helvetica",
      fontSize: 14,
      fontColor: "#000000",
      backgroundColor: "transparent",
      borderColor: "#000000",
      bold: false,
      italic: false,
      align: "left",
      lineHeight: 1.2,
    });
  });
});
