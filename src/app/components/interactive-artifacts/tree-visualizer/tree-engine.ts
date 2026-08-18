/*
 * tree-engine.ts
 * Deterministic step engine for binary-search-tree and red-black-tree
 * operations. Every user-facing step references the exact CLRS pseudocode
 * line(s) responsible for the visual change, so the visualizer can keep the
 * tree, the explanation, and the code panel in lock-step.
 */

export type Color = 'R' | 'B';

export interface VNode {
  id: number;
  key: number;
  color: Color;
  left: number;
  right: number;
  parent: number;
}

/** A complete tree state. `NIL` (id 0) is the shared black sentinel. */
export interface TreeState {
  nodes: Record<number, VNode>;
  root: number;
  nextId: number;
}

export const NIL = 0;

export interface Metrics {
  comparisons: number;
  pointerWrites: number;
  rotations: number;
  recolors: number;
}

export interface TreeStep {
  algo: string;          // pseudocode block key, e.g. 'TREE-DELETE'
  lines: string[];       // stable line IDs to highlight, e.g. ['TD-6']
  title: string;
  explanation: string;
  active: number[];      // primary node(s) acted on
  compared: number[];    // node(s) being compared
  path: number[];        // nodes already walked this operation
  removed: number[];     // node(s) being spliced out
  found: number[];       // result node(s)
  pointerNote?: string;  // explicit pointer write, e.g. 'y.p = z.p'
  invariant?: string;    // invariant being preserved / restored
  log?: string;          // one-line operation-log entry
  caseTag?: string;      // e.g. 'Case 1', used by RB fix-ups
  metrics: Metrics;
  state: TreeState;      // snapshot AFTER this step's mutation
}

/* ────────────────────────────── pseudocode ────────────────────────────── */

export interface CodeLine {
  id: string;
  n: number | '';   // visible line number ('' for continuation/header)
  text: string;
  indent: number;
  note?: string;
}
export interface CodeBlock {
  name: string;
  lines: CodeLine[];
}

function blk(name: string, rows: [string, number | '', number, string, string?][]): CodeBlock {
  return {
    name,
    lines: rows.map(([id, n, indent, text, note]) => ({ id, n, indent, text, note })),
  };
}

export const CODE: Record<string, CodeBlock> = {
  'INORDER-TREE-WALK': blk('INORDER-TREE-WALK', [
    ['IW-1', '', 0, 'INORDER-TREE-WALK(x)'],
    ['IW-2', 1, 1, 'if x ≠ NIL'],
    ['IW-3', 2, 2, 'INORDER-TREE-WALK(x.left)'],
    ['IW-4', 3, 2, 'print x.key', 'visit the node'],
    ['IW-5', 4, 2, 'INORDER-TREE-WALK(x.right)'],
  ]),
  'ITERATIVE-TREE-SEARCH': blk('ITERATIVE-TREE-SEARCH', [
    ['TS-1', '', 0, 'ITERATIVE-TREE-SEARCH(x, k)'],
    ['TS-2', 1, 1, 'while x ≠ NIL and k ≠ x.key'],
    ['TS-3', 2, 2, 'if k < x.key'],
    ['TS-4', 3, 3, 'x = x.left'],
    ['TS-5', 4, 2, 'else x = x.right'],
    ['TS-6', 5, 1, 'return x'],
  ]),
  'TREE-MINIMUM': blk('TREE-MINIMUM', [
    ['MIN-1', '', 0, 'TREE-MINIMUM(x)'],
    ['MIN-2', 1, 1, 'while x.left ≠ NIL'],
    ['MIN-3', 2, 2, 'x = x.left'],
    ['MIN-4', 3, 1, 'return x'],
  ]),
  'TREE-MAXIMUM': blk('TREE-MAXIMUM', [
    ['MAX-1', '', 0, 'TREE-MAXIMUM(x)'],
    ['MAX-2', 1, 1, 'while x.right ≠ NIL'],
    ['MAX-3', 2, 2, 'x = x.right'],
    ['MAX-4', 3, 1, 'return x'],
  ]),
  'TREE-SUCCESSOR': blk('TREE-SUCCESSOR', [
    ['SUC-1', '', 0, 'TREE-SUCCESSOR(x)'],
    ['SUC-2', 1, 1, 'if x.right ≠ NIL'],
    ['SUC-3', 2, 2, 'return TREE-MINIMUM(x.right)'],
    ['SUC-4', 3, 1, 'y = x.p'],
    ['SUC-5', 4, 1, 'while y ≠ NIL and x == y.right'],
    ['SUC-6', 5, 2, 'x = y'],
    ['SUC-7', 6, 2, 'y = y.p'],
    ['SUC-8', 7, 1, 'return y'],
  ]),
  'TREE-PREDECESSOR': blk('TREE-PREDECESSOR', [
    ['PRE-1', '', 0, 'TREE-PREDECESSOR(x)'],
    ['PRE-2', 1, 1, 'if x.left ≠ NIL'],
    ['PRE-3', 2, 2, 'return TREE-MAXIMUM(x.left)'],
    ['PRE-4', 3, 1, 'y = x.p'],
    ['PRE-5', 4, 1, 'while y ≠ NIL and x == y.left'],
    ['PRE-6', 5, 2, 'x = y'],
    ['PRE-7', 6, 2, 'y = y.p'],
    ['PRE-8', 7, 1, 'return y'],
  ]),
  'TREE-INSERT': blk('TREE-INSERT', [
    ['INS-1', '', 0, 'TREE-INSERT(T, z)'],
    ['INS-2', 1, 1, 'y = NIL'],
    ['INS-3', 2, 1, 'x = T.root'],
    ['INS-4', 3, 1, 'while x ≠ NIL'],
    ['INS-5', 4, 2, 'y = x'],
    ['INS-6', 5, 2, 'if z.key < x.key'],
    ['INS-7', 6, 3, 'x = x.left'],
    ['INS-8', 7, 2, 'else x = x.right'],
    ['INS-9', 8, 1, 'z.p = y'],
    ['INS-10', 9, 1, 'if y == NIL'],
    ['INS-11', 10, 2, 'T.root = z'],
    ['INS-12', 11, 1, 'elseif z.key < y.key'],
    ['INS-13', 12, 2, 'y.left = z'],
    ['INS-14', 13, 1, 'else y.right = z'],
  ]),
  'TRANSPLANT': blk('TRANSPLANT', [
    ['TP-1', '', 0, 'TRANSPLANT(T, u, v)'],
    ['TP-2', 1, 1, 'if u.p == NIL'],
    ['TP-3', 2, 2, 'T.root = v'],
    ['TP-4', 3, 1, 'elseif u == u.p.left'],
    ['TP-5', 4, 2, 'u.p.left = v'],
    ['TP-6', 5, 1, 'else u.p.right = v'],
    ['TP-7', 6, 1, 'if v ≠ NIL'],
    ['TP-8', 7, 2, 'v.p = u.p'],
  ]),
  'TREE-DELETE': blk('TREE-DELETE', [
    ['TD-1', '', 0, 'TREE-DELETE(T, z)'],
    ['TD-2', 1, 1, 'if z.left == NIL'],
    ['TD-3', 2, 2, 'TRANSPLANT(T, z, z.right)'],
    ['TD-4', 3, 1, 'elseif z.right == NIL'],
    ['TD-5', 4, 2, 'TRANSPLANT(T, z, z.left)'],
    ['TD-6', 5, 1, 'else y = TREE-MINIMUM(z.right)'],
    ['TD-7', 6, 2, 'if y.p ≠ z'],
    ['TD-8', 7, 3, 'TRANSPLANT(T, y, y.right)'],
    ['TD-9', 8, 3, 'y.right = z.right'],
    ['TD-10', 9, 3, 'y.right.p = y'],
    ['TD-11', 10, 2, 'TRANSPLANT(T, z, y)'],
    ['TD-12', 11, 2, 'y.left = z.left'],
    ['TD-13', 12, 2, 'y.left.p = y'],
  ]),
  'LEFT-ROTATE': blk('LEFT-ROTATE', [
    ['LR-1', '', 0, 'LEFT-ROTATE(T, x)'],
    ['LR-2', 1, 1, 'y = x.right'],
    ['LR-3', 2, 1, 'x.right = y.left'],
    ['LR-4', 3, 1, 'if y.left ≠ NIL'],
    ['LR-5', 4, 2, 'y.left.p = x'],
    ['LR-6', 5, 1, 'y.p = x.p'],
    ['LR-7', 6, 1, 'if x.p == NIL'],
    ['LR-8', 7, 2, 'T.root = y'],
    ['LR-9', 8, 1, 'elseif x == x.p.left'],
    ['LR-10', 9, 2, 'x.p.left = y'],
    ['LR-11', 10, 1, 'else x.p.right = y'],
    ['LR-12', 11, 1, 'y.left = x'],
    ['LR-13', 12, 1, 'x.p = y'],
  ]),
  'RIGHT-ROTATE': blk('RIGHT-ROTATE', [
    ['RR-1', '', 0, 'RIGHT-ROTATE(T, x)'],
    ['RR-2', 1, 1, 'y = x.left'],
    ['RR-3', 2, 1, 'x.left = y.right'],
    ['RR-4', 3, 1, 'if y.right ≠ NIL'],
    ['RR-5', 4, 2, 'y.right.p = x'],
    ['RR-6', 5, 1, 'y.p = x.p'],
    ['RR-7', 6, 1, 'if x.p == NIL'],
    ['RR-8', 7, 2, 'T.root = y'],
    ['RR-9', 8, 1, 'elseif x == x.p.right'],
    ['RR-10', 9, 2, 'x.p.right = y'],
    ['RR-11', 10, 1, 'else x.p.left = y'],
    ['RR-12', 11, 1, 'y.right = x'],
    ['RR-13', 12, 1, 'x.p = y'],
  ]),
  'RB-INSERT': blk('RB-INSERT', [
    ['RBI-1', '', 0, 'RB-INSERT(T, z)'],
    ['RBI-2', 1, 1, 'y = NIL ;  x = T.root'],
    ['RBI-3', 2, 1, 'while x ≠ NIL'],
    ['RBI-4', 3, 2, 'y = x'],
    ['RBI-5', 4, 2, 'if z.key < x.key  x = x.left  else  x = x.right'],
    ['RBI-6', 5, 1, 'z.p = y    (attach z under y)'],
    ['RBI-7', 6, 1, 'z.left = NIL ;  z.right = NIL ;  z.color = RED'],
    ['RBI-8', 7, 1, 'RB-INSERT-FIXUP(T, z)'],
  ]),
  'RB-INSERT-FIXUP': blk('RB-INSERT-FIXUP', [
    ['RIF-1', '', 0, 'RB-INSERT-FIXUP(T, z)'],
    ['RIF-2', 1, 1, 'while z.p.color == RED'],
    ['RIF-3', 2, 2, 'if z.p == z.p.p.left'],
    ['RIF-4', 3, 3, 'y = z.p.p.right        // uncle'],
    ['RIF-5', 4, 3, 'if y.color == RED', 'Case 1'],
    ['RIF-6', 5, 4, 'z.p.color = BLACK', 'Case 1'],
    ['RIF-7', 6, 4, 'y.color = BLACK', 'Case 1'],
    ['RIF-8', 7, 4, 'z.p.p.color = RED', 'Case 1'],
    ['RIF-9', 8, 4, 'z = z.p.p', 'Case 1'],
    ['RIF-10', 9, 3, 'else if z == z.p.right', 'Case 2'],
    ['RIF-11', 10, 4, 'z = z.p', 'Case 2'],
    ['RIF-12', 11, 4, 'LEFT-ROTATE(T, z)', 'Case 2'],
    ['RIF-13', 12, 3, 'z.p.color = BLACK', 'Case 3'],
    ['RIF-14', 13, 3, 'z.p.p.color = RED', 'Case 3'],
    ['RIF-15', 14, 3, 'RIGHT-ROTATE(T, z.p.p)', 'Case 3'],
    ['RIF-16', 15, 2, 'else  (mirror: exchange left and right)'],
    ['RIF-17', 16, 1, 'T.root.color = BLACK'],
  ]),
  'RB-TRANSPLANT': blk('RB-TRANSPLANT', [
    ['RBT-1', '', 0, 'RB-TRANSPLANT(T, u, v)'],
    ['RBT-2', 1, 1, 'if u.p == NIL'],
    ['RBT-3', 2, 2, 'T.root = v'],
    ['RBT-4', 3, 1, 'elseif u == u.p.left'],
    ['RBT-5', 4, 2, 'u.p.left = v'],
    ['RBT-6', 5, 1, 'else u.p.right = v'],
    ['RBT-7', 6, 1, 'v.p = u.p'],
  ]),
  'RB-DELETE': blk('RB-DELETE', [
    ['RBD-1', '', 0, 'RB-DELETE(T, z)'],
    ['RBD-2', 1, 1, 'y = z ;  y-original-color = y.color'],
    ['RBD-3', 2, 1, 'if z.left == NIL'],
    ['RBD-4', 3, 2, 'x = z.right ;  RB-TRANSPLANT(T, z, z.right)'],
    ['RBD-5', 4, 1, 'elseif z.right == NIL'],
    ['RBD-6', 5, 2, 'x = z.left ;  RB-TRANSPLANT(T, z, z.left)'],
    ['RBD-7', 6, 1, 'else y = TREE-MINIMUM(z.right)'],
    ['RBD-8', 7, 2, 'y-original-color = y.color'],
    ['RBD-9', 8, 2, 'x = y.right'],
    ['RBD-10', 9, 2, 'if y.p == z   x.p = y'],
    ['RBD-11', 10, 2, 'else RB-TRANSPLANT(T, y, y.right)'],
    ['RBD-12', 11, 3, 'y.right = z.right ;  y.right.p = y'],
    ['RBD-13', 12, 2, 'RB-TRANSPLANT(T, z, y)'],
    ['RBD-14', 13, 2, 'y.left = z.left ;  y.left.p = y'],
    ['RBD-15', 14, 2, 'y.color = z.color'],
    ['RBD-16', 15, 1, 'if y-original-color == BLACK'],
    ['RBD-17', 16, 2, 'RB-DELETE-FIXUP(T, x)'],
  ]),
  'RB-DELETE-FIXUP': blk('RB-DELETE-FIXUP', [
    ['RDF-1', '', 0, 'RB-DELETE-FIXUP(T, x)'],
    ['RDF-2', 1, 1, 'while x ≠ T.root and x.color == BLACK'],
    ['RDF-3', 2, 2, 'if x == x.p.left'],
    ['RDF-4', 3, 3, 'w = x.p.right          // sibling'],
    ['RDF-5', 4, 3, 'if w.color == RED', 'Case 1'],
    ['RDF-6', 5, 4, 'w.color = BLACK ;  x.p.color = RED', 'Case 1'],
    ['RDF-7', 6, 4, 'LEFT-ROTATE(T, x.p) ;  w = x.p.right', 'Case 1'],
    ['RDF-8', 7, 3, 'if w.left.color == BLACK and w.right.color == BLACK', 'Case 2'],
    ['RDF-9', 8, 4, 'w.color = RED ;  x = x.p', 'Case 2'],
    ['RDF-10', 9, 3, 'else if w.right.color == BLACK', 'Case 3'],
    ['RDF-11', 10, 4, 'w.left.color = BLACK ;  w.color = RED', 'Case 3'],
    ['RDF-12', 11, 4, 'RIGHT-ROTATE(T, w) ;  w = x.p.right', 'Case 3'],
    ['RDF-13', 12, 3, 'w.color = x.p.color', 'Case 4'],
    ['RDF-14', 13, 3, 'x.p.color = BLACK ;  w.right.color = BLACK', 'Case 4'],
    ['RDF-15', 14, 3, 'LEFT-ROTATE(T, x.p) ;  x = T.root', 'Case 4'],
    ['RDF-16', 15, 2, 'else  (mirror: exchange left and right)'],
    ['RDF-17', 16, 1, 'x.color = BLACK'],
  ]),
};

/* ────────────────────────────── helpers ───────────────────────────────── */

export function emptyState(): TreeState {
  return {
    nodes: { 0: { id: 0, key: NaN, color: 'B', left: 0, right: 0, parent: 0 } },
    root: NIL,
    nextId: 1,
  };
}

export function cloneState(s: TreeState): TreeState {
  const nodes: Record<number, VNode> = {};
  for (const k of Object.keys(s.nodes)) {
    const id = Number(k);
    nodes[id] = { ...s.nodes[id] };
  }
  return { nodes, root: s.root, nextId: s.nextId };
}

const N = (s: TreeState, id: number) => s.nodes[id];
const keyOf = (s: TreeState, id: number) => (id === NIL ? 'NIL' : String(s.nodes[id].key));

/* ── silent mutators (used to build initial / preset trees) ─────────────── */

export function bstInsertMut(s: TreeState, key: number): number {
  const z: VNode = { id: s.nextId++, key, color: 'B', left: NIL, right: NIL, parent: NIL };
  s.nodes[z.id] = z;
  let y = NIL;
  let x = s.root;
  while (x !== NIL) {
    y = x;
    x = key < N(s, x).key ? N(s, x).left : N(s, x).right;
  }
  z.parent = y;
  if (y === NIL) s.root = z.id;
  else if (key < N(s, y).key) N(s, y).left = z.id;
  else N(s, y).right = z.id;
  return z.id;
}

function leftRotateMut(s: TreeState, xId: number): void {
  const x = N(s, xId);
  const yId = x.right;
  const y = N(s, yId);
  x.right = y.left;
  if (y.left !== NIL) N(s, y.left).parent = xId;
  y.parent = x.parent;
  if (x.parent === NIL) s.root = yId;
  else if (xId === N(s, x.parent).left) N(s, x.parent).left = yId;
  else N(s, x.parent).right = yId;
  y.left = xId;
  x.parent = yId;
}

function rightRotateMut(s: TreeState, xId: number): void {
  const x = N(s, xId);
  const yId = x.left;
  const y = N(s, yId);
  x.left = y.right;
  if (y.right !== NIL) N(s, y.right).parent = xId;
  y.parent = x.parent;
  if (x.parent === NIL) s.root = yId;
  else if (xId === N(s, x.parent).right) N(s, x.parent).right = yId;
  else N(s, x.parent).left = yId;
  y.right = xId;
  x.parent = yId;
}

export function rbInsertMut(s: TreeState, key: number): number {
  const zId = bstInsertMut(s, key);
  N(s, zId).color = 'R';
  // fix-up
  let z = zId;
  while (N(s, N(s, z).parent).color === 'R') {
    const p = N(s, z).parent;
    const g = N(s, p).parent;
    if (p === N(s, g).left) {
      const u = N(s, g).right;
      if (N(s, u).color === 'R') {
        N(s, p).color = 'B';
        N(s, u).color = 'B';
        N(s, g).color = 'R';
        z = g;
      } else {
        if (z === N(s, p).right) {
          z = p;
          leftRotateMut(s, z);
        }
        N(s, N(s, z).parent).color = 'B';
        N(s, N(s, N(s, z).parent).parent).color = 'R';
        rightRotateMut(s, N(s, N(s, z).parent).parent);
      }
    } else {
      const u = N(s, g).left;
      if (N(s, u).color === 'R') {
        N(s, p).color = 'B';
        N(s, u).color = 'B';
        N(s, g).color = 'R';
        z = g;
      } else {
        if (z === N(s, p).left) {
          z = p;
          rightRotateMut(s, z);
        }
        N(s, N(s, z).parent).color = 'B';
        N(s, N(s, N(s, z).parent).parent).color = 'R';
        leftRotateMut(s, N(s, N(s, z).parent).parent);
      }
    }
  }
  N(s, s.root).color = 'B';
  return zId;
}

export function buildBST(keys: number[]): TreeState {
  const s = emptyState();
  for (const k of keys) bstInsertMut(s, k);
  return s;
}

export function buildRB(keys: number[]): TreeState {
  const s = emptyState();
  for (const k of keys) rbInsertMut(s, k);
  return s;
}

export function findByKey(s: TreeState, key: number): number {
  let x = s.root;
  while (x !== NIL && N(s, x).key !== key) {
    x = key < N(s, x).key ? N(s, x).left : N(s, x).right;
  }
  return x;
}

export function treeHeight(s: TreeState, id = s.root): number {
  if (id === NIL) return -1;
  return 1 + Math.max(treeHeight(s, N(s, id).left), treeHeight(s, N(s, id).right));
}

/** Black-height of the root (black nodes on a root→NIL path, NIL counted). */
export function blackHeight(s: TreeState): number {
  let x = s.root;
  let bh = 1; // the NIL leaf
  while (x !== NIL) {
    if (N(s, x).color === 'B') bh++;
    x = N(s, x).left;
  }
  return s.root === NIL ? 0 : bh;
}

/* ──────────────────────────── recorder ─────────────────────────────────── */

interface StepInput {
  algo: string;
  lines: string[];
  title: string;
  explanation: string;
  active?: number[];
  compared?: number[];
  removed?: number[];
  found?: number[];
  pointerNote?: string;
  invariant?: string;
  log?: string;
  caseTag?: string;
}

class Run {
  s: TreeState;
  steps: TreeStep[] = [];
  path: number[] = [];
  metrics: Metrics = { comparisons: 0, pointerWrites: 0, rotations: 0, recolors: 0 };

  constructor(s: TreeState) {
    this.s = cloneState(s);
  }

  emit(i: StepInput): void {
    this.steps.push({
      algo: i.algo,
      lines: i.lines,
      title: i.title,
      explanation: i.explanation,
      active: i.active ?? [],
      compared: i.compared ?? [],
      path: [...this.path],
      removed: i.removed ?? [],
      found: i.found ?? [],
      pointerNote: i.pointerNote,
      invariant: i.invariant,
      log: i.log,
      caseTag: i.caseTag,
      metrics: { ...this.metrics },
      state: cloneState(this.s),
    });
  }
}

export interface OperationResult {
  steps: TreeStep[];
  finalState: TreeState;
  mutates: boolean;
  summary: string;
}

/* ─────────────────────── BST: in-order traversal ──────────────────────── */

export function opTraversal(start: TreeState): OperationResult {
  const r = new Run(start);
  const out: number[] = [];
  if (r.s.root === NIL) {
    r.emit({ algo: 'INORDER-TREE-WALK', lines: ['IW-2'], title: 'Empty tree',
      explanation: 'The tree is empty, so the walk prints nothing.' });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: 'Empty tree.' };
  }
  const walk = (id: number) => {
    if (id === NIL) return;
    const k = N(r.s, id).key;
    r.path = [...out];
    r.emit({ algo: 'INORDER-TREE-WALK', lines: ['IW-2', 'IW-3'], title: `Descend into left of ${k}`,
      explanation: `x = ${k} is not NIL, so recurse on its left subtree before printing ${k}.`,
      active: [id] });
    walk(N(r.s, id).left);
    out.push(id);
    r.path = [...out];
    r.emit({ algo: 'INORDER-TREE-WALK', lines: ['IW-4'], title: `Print ${k}`,
      explanation: `Left subtree is done. Print x.key = ${k}. Output so far: ${out.map(i => N(r.s, i).key).join(', ')}.`,
      active: [id], found: [id],
      invariant: 'Keys are emitted in sorted order: every left-subtree key ≤ x.key ≤ every right-subtree key.' });
    walk(N(r.s, id).right);
  };
  walk(r.s.root);
  r.path = [...out];
  r.emit({ algo: 'INORDER-TREE-WALK', lines: ['IW-2'], title: 'Traversal complete',
    explanation: `In-order output: ${out.map(i => N(r.s, i).key).join(', ')} — sorted ascending.`,
    found: out });
  return { steps: r.steps, finalState: r.s, mutates: false,
    summary: `In-order: ${out.map(i => N(r.s, i).key).join(', ')}` };
}

/* ───────────────────────────── BST: search ────────────────────────────── */

export function opSearch(start: TreeState, k: number): OperationResult {
  const r = new Run(start);
  let x = r.s.root;
  r.emit({ algo: 'ITERATIVE-TREE-SEARCH', lines: ['TS-1'], title: `Search for ${k}`,
    explanation: `Start ITERATIVE-TREE-SEARCH at the root with key k = ${k}.`,
    active: [x] });
  while (x !== NIL && N(r.s, x).key !== k) {
    r.path.push(x);
    r.metrics.comparisons++;
    const kx = N(r.s, x).key;
    r.emit({ algo: 'ITERATIVE-TREE-SEARCH', lines: ['TS-2', 'TS-3'], title: `Compare ${k} with ${kx}`,
      explanation: `x ≠ NIL and k ≠ x.key, so the loop continues. Test k < x.key: ${k} < ${kx} is ${k < kx}.`,
      compared: [x] });
    if (k < kx) {
      r.emit({ algo: 'ITERATIVE-TREE-SEARCH', lines: ['TS-4'], title: `Go left of ${kx}`,
        explanation: `${k} < ${kx}, so the key cannot be in the right subtree — descend to x.left.`,
        compared: [x] });
      x = N(r.s, x).left;
    } else {
      r.emit({ algo: 'ITERATIVE-TREE-SEARCH', lines: ['TS-5'], title: `Go right of ${kx}`,
        explanation: `${k} ≥ ${kx}, so the key cannot be in the left subtree — descend to x.right.`,
        compared: [x] });
      x = N(r.s, x).right;
    }
  }
  if (x === NIL) {
    r.emit({ algo: 'ITERATIVE-TREE-SEARCH', lines: ['TS-2', 'TS-6'], title: 'Reached NIL — not found',
      explanation: `x is NIL: the search fell off the tree. Key ${k} is not present. Return NIL.`,
      invariant: 'The search invariant held to the end: if k were present it would lie on this path.' });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `${k} not found.` };
  }
  r.path.push(x);
  r.emit({ algo: 'ITERATIVE-TREE-SEARCH', lines: ['TS-2', 'TS-6'], title: `Found ${k}`,
    explanation: `k == x.key, so the while-loop stops. Return the node holding ${k}.`,
    found: [x], active: [x] });
  return { steps: r.steps, finalState: r.s, mutates: false, summary: `${k} found.` };
}

/* ───────────────────────── BST: minimum / maximum ─────────────────────── */

export function opMinimum(start: TreeState): OperationResult {
  const r = new Run(start);
  let x = r.s.root;
  if (x === NIL) {
    r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-1'], title: 'Empty tree',
      explanation: 'There is no minimum in an empty tree.' });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: 'Empty tree.' };
  }
  r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-1'], title: 'Start at the root',
    explanation: 'The minimum is the leftmost node. Follow left pointers until none remain.',
    active: [x] });
  while (N(r.s, x).left !== NIL) {
    r.path.push(x);
    r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-2', 'MIN-3'], title: `Go left of ${N(r.s, x).key}`,
      explanation: `x.left ≠ NIL, so a smaller key exists in the left subtree. Move x = x.left.`,
      compared: [x] });
    x = N(r.s, x).left;
  }
  r.path.push(x);
  r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-2', 'MIN-4'], title: `Minimum is ${N(r.s, x).key}`,
    explanation: `x.left == NIL, so no smaller key exists. The minimum is ${N(r.s, x).key}.`,
    found: [x], active: [x] });
  return { steps: r.steps, finalState: r.s, mutates: false, summary: `Minimum = ${N(r.s, x).key}` };
}

export function opMaximum(start: TreeState): OperationResult {
  const r = new Run(start);
  let x = r.s.root;
  if (x === NIL) {
    r.emit({ algo: 'TREE-MAXIMUM', lines: ['MAX-1'], title: 'Empty tree',
      explanation: 'There is no maximum in an empty tree.' });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: 'Empty tree.' };
  }
  r.emit({ algo: 'TREE-MAXIMUM', lines: ['MAX-1'], title: 'Start at the root',
    explanation: 'The maximum is the rightmost node. Follow right pointers until none remain.',
    active: [x] });
  while (N(r.s, x).right !== NIL) {
    r.path.push(x);
    r.emit({ algo: 'TREE-MAXIMUM', lines: ['MAX-2', 'MAX-3'], title: `Go right of ${N(r.s, x).key}`,
      explanation: `x.right ≠ NIL, so a larger key exists in the right subtree. Move x = x.right.`,
      compared: [x] });
    x = N(r.s, x).right;
  }
  r.path.push(x);
  r.emit({ algo: 'TREE-MAXIMUM', lines: ['MAX-2', 'MAX-4'], title: `Maximum is ${N(r.s, x).key}`,
    explanation: `x.right == NIL, so no larger key exists. The maximum is ${N(r.s, x).key}.`,
    found: [x], active: [x] });
  return { steps: r.steps, finalState: r.s, mutates: false, summary: `Maximum = ${N(r.s, x).key}` };
}

/* ─────────────────────── BST: successor / predecessor ─────────────────── */

export function opSuccessor(start: TreeState, key: number): OperationResult {
  const r = new Run(start);
  const xId = findByKey(r.s, key);
  if (xId === NIL) {
    r.emit({ algo: 'TREE-SUCCESSOR', lines: ['SUC-1'], title: `Key ${key} not in tree`,
      explanation: `There is no node with key ${key}, so its successor is undefined.` });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `${key} not in tree.` };
  }
  let x = xId;
  r.path.push(x);
  r.emit({ algo: 'TREE-SUCCESSOR', lines: ['SUC-1', 'SUC-2'], title: `Successor of ${key}`,
    explanation: `Test x.right ≠ NIL. ${N(r.s, x).right === NIL ? 'It is NIL — Case 2.' : 'A right subtree exists — Case 1.'}`,
    active: [x] });
  if (N(r.s, x).right !== NIL) {
    r.emit({ algo: 'TREE-SUCCESSOR', lines: ['SUC-3'], title: 'Case 1: right subtree exists',
      explanation: 'The successor is the smallest key larger than x — that is TREE-MINIMUM of the right subtree.',
      active: [N(r.s, x).right],
      invariant: 'Every key in x.right is larger than x; its minimum is the next key in sorted order.' });
    let m = N(r.s, x).right;
    while (N(r.s, m).left !== NIL) {
      r.path.push(m);
      r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-2', 'MIN-3'], title: `Go left of ${N(r.s, m).key}`,
        explanation: 'Inside TREE-MINIMUM: follow left pointers to the smallest key of the right subtree.',
        compared: [m] });
      m = N(r.s, m).left;
    }
    r.path.push(m);
    r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-4'], title: `Successor is ${N(r.s, m).key}`,
      explanation: `The leftmost node of the right subtree is ${N(r.s, m).key} — the successor of ${key}.`,
      found: [m], active: [m] });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `successor(${key}) = ${N(r.s, m).key}` };
  }
  let y = N(r.s, x).parent;
  r.emit({ algo: 'TREE-SUCCESSOR', lines: ['SUC-4'], title: 'Case 2: climb to find an ancestor',
    explanation: `No right subtree, so the successor is an ancestor. Set y = x.p (${keyOf(r.s, y)}).`,
    active: [x], compared: y === NIL ? [] : [y],
    invariant: 'Climb past right-child links: those ancestors are smaller than x.' });
  while (y !== NIL && x === N(r.s, y).right) {
    r.path.push(y);
    r.emit({ algo: 'TREE-SUCCESSOR', lines: ['SUC-5', 'SUC-6', 'SUC-7'], title: `${N(r.s, x).key} is a right child — climb`,
      explanation: `x is the right child of ${N(r.s, y).key}, so ${N(r.s, y).key} < x. Climb: x = y, y = y.p.`,
      compared: [y] });
    x = y;
    y = N(r.s, y).parent;
  }
  if (y === NIL) {
    r.emit({ algo: 'TREE-SUCCESSOR', lines: ['SUC-5', 'SUC-8'], title: 'No successor',
      explanation: `Climbed to the root from the right; y is NIL. ${key} is the maximum key — it has no successor.` });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `${key} is the maximum.` };
  }
  r.path.push(y);
  r.emit({ algo: 'TREE-SUCCESSOR', lines: ['SUC-5', 'SUC-8'], title: `Successor is ${N(r.s, y).key}`,
    explanation: `x is now a left child of ${N(r.s, y).key}, so ${N(r.s, y).key} is the first ancestor larger than ${key}.`,
    found: [y], active: [y] });
  return { steps: r.steps, finalState: r.s, mutates: false, summary: `successor(${key}) = ${N(r.s, y).key}` };
}

export function opPredecessor(start: TreeState, key: number): OperationResult {
  const r = new Run(start);
  const xId = findByKey(r.s, key);
  if (xId === NIL) {
    r.emit({ algo: 'TREE-PREDECESSOR', lines: ['PRE-1'], title: `Key ${key} not in tree`,
      explanation: `There is no node with key ${key}, so its predecessor is undefined.` });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `${key} not in tree.` };
  }
  let x = xId;
  r.path.push(x);
  r.emit({ algo: 'TREE-PREDECESSOR', lines: ['PRE-1', 'PRE-2'], title: `Predecessor of ${key}`,
    explanation: `Test x.left ≠ NIL. ${N(r.s, x).left === NIL ? 'It is NIL — climb to an ancestor.' : 'A left subtree exists — take its maximum.'}`,
    active: [x] });
  if (N(r.s, x).left !== NIL) {
    r.emit({ algo: 'TREE-PREDECESSOR', lines: ['PRE-3'], title: 'Left subtree exists',
      explanation: 'The predecessor is the largest key smaller than x — TREE-MAXIMUM of the left subtree.',
      active: [N(r.s, x).left],
      invariant: 'Every key in x.left is smaller than x; its maximum is the previous key in sorted order.' });
    let m = N(r.s, x).left;
    while (N(r.s, m).right !== NIL) {
      r.path.push(m);
      r.emit({ algo: 'TREE-MAXIMUM', lines: ['MAX-2', 'MAX-3'], title: `Go right of ${N(r.s, m).key}`,
        explanation: 'Inside TREE-MAXIMUM: follow right pointers to the largest key of the left subtree.',
        compared: [m] });
      m = N(r.s, m).right;
    }
    r.path.push(m);
    r.emit({ algo: 'TREE-MAXIMUM', lines: ['MAX-4'], title: `Predecessor is ${N(r.s, m).key}`,
      explanation: `The rightmost node of the left subtree is ${N(r.s, m).key} — the predecessor of ${key}.`,
      found: [m], active: [m] });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `predecessor(${key}) = ${N(r.s, m).key}` };
  }
  let y = N(r.s, x).parent;
  r.emit({ algo: 'TREE-PREDECESSOR', lines: ['PRE-4'], title: 'Climb to find an ancestor',
    explanation: `No left subtree, so the predecessor is an ancestor. Set y = x.p (${keyOf(r.s, y)}).`,
    active: [x], compared: y === NIL ? [] : [y] });
  while (y !== NIL && x === N(r.s, y).left) {
    r.path.push(y);
    r.emit({ algo: 'TREE-PREDECESSOR', lines: ['PRE-5', 'PRE-6', 'PRE-7'], title: `${N(r.s, x).key} is a left child — climb`,
      explanation: `x is the left child of ${N(r.s, y).key}, so ${N(r.s, y).key} > x. Climb: x = y, y = y.p.`,
      compared: [y] });
    x = y;
    y = N(r.s, y).parent;
  }
  if (y === NIL) {
    r.emit({ algo: 'TREE-PREDECESSOR', lines: ['PRE-5', 'PRE-8'], title: 'No predecessor',
      explanation: `Climbed to the root from the left; y is NIL. ${key} is the minimum key — it has no predecessor.` });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `${key} is the minimum.` };
  }
  r.path.push(y);
  r.emit({ algo: 'TREE-PREDECESSOR', lines: ['PRE-5', 'PRE-8'], title: `Predecessor is ${N(r.s, y).key}`,
    explanation: `x is now a right child of ${N(r.s, y).key}, so ${N(r.s, y).key} is the first ancestor smaller than ${key}.`,
    found: [y], active: [y] });
  return { steps: r.steps, finalState: r.s, mutates: false, summary: `predecessor(${key}) = ${N(r.s, y).key}` };
}

/* ───────────────────────────── BST: insert ────────────────────────────── */

export function opInsert(start: TreeState, k: number, asRed = false): OperationResult {
  const r = new Run(start);
  const z: VNode = { id: r.s.nextId++, key: k, color: asRed ? 'R' : 'B', left: NIL, right: NIL, parent: NIL };
  r.s.nodes[z.id] = z;
  let y = NIL;
  let x = r.s.root;
  r.emit({ algo: 'TREE-INSERT', lines: ['INS-2', 'INS-3'], title: `Insert ${k}: initialise`,
    explanation: `Set trailing pointer y = NIL and walker x = T.root. y always lags one step behind x.`,
    active: [x] });
  while (x !== NIL) {
    y = x;
    r.path.push(x);
    r.metrics.comparisons++;
    const kx = N(r.s, x).key;
    r.emit({ algo: 'TREE-INSERT', lines: ['INS-4', 'INS-5', 'INS-6'], title: `Compare ${k} with ${kx}`,
      explanation: `x ≠ NIL: set y = x = ${kx}. Test z.key < x.key: ${k} < ${kx} is ${k < kx}.`,
      compared: [x] });
    if (k < kx) {
      r.emit({ algo: 'TREE-INSERT', lines: ['INS-7'], title: `Descend left`,
        explanation: `${k} < ${kx}, so x = x.left (${keyOf(r.s, N(r.s, x).left)}).`,
        compared: [x] });
      x = N(r.s, x).left;
    } else {
      r.emit({ algo: 'TREE-INSERT', lines: ['INS-8'], title: `Descend right`,
        explanation: `${k} ≥ ${kx}, so x = x.right (${keyOf(r.s, N(r.s, x).right)}).`,
        compared: [x] });
      x = N(r.s, x).right;
    }
  }
  z.parent = y;
  r.metrics.pointerWrites++;
  r.emit({ algo: 'TREE-INSERT', lines: ['INS-9'], title: 'Found the NIL slot',
    explanation: `x is NIL — the descent stopped. y = ${keyOf(r.s, y)} is the parent. Set z.p = y.`,
    active: [z.id], pointerNote: `z.p = ${keyOf(r.s, y)}` });
  if (y === NIL) {
    r.s.root = z.id;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'TREE-INSERT', lines: ['INS-10', 'INS-11'], title: 'Tree was empty',
      explanation: `y == NIL, so the tree was empty. z becomes the root.`,
      active: [z.id], pointerNote: 'T.root = z' });
  } else if (k < N(r.s, y).key) {
    N(r.s, y).left = z.id;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'TREE-INSERT', lines: ['INS-12', 'INS-13'], title: `Attach as left child of ${N(r.s, y).key}`,
      explanation: `z.key < y.key, so z becomes y.left. Only this one pointer changes.`,
      active: [z.id], pointerNote: `${N(r.s, y).key}.left = ${k}`,
      invariant: 'Every ancestor comparison placed z in the correct key range — the BST property still holds.' });
  } else {
    N(r.s, y).right = z.id;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'TREE-INSERT', lines: ['INS-12', 'INS-14'], title: `Attach as right child of ${N(r.s, y).key}`,
      explanation: `z.key ≥ y.key, so z becomes y.right. Only this one pointer changes.`,
      active: [z.id], pointerNote: `${N(r.s, y).key}.right = ${k}`,
      invariant: 'Every ancestor comparison placed z in the correct key range — the BST property still holds.' });
  }
  return { steps: r.steps, finalState: r.s, mutates: true, summary: `Inserted ${k}.` };
}

/* ── BST delete: transplant / minimum sub-routines that record steps ────── */

function recTransplant(r: Run, u: number, v: number, algo: string, lineFor: (s: string) => string): void {
  const up = N(r.s, u).parent;
  if (up === NIL) {
    r.s.root = v;
    r.metrics.pointerWrites++;
    r.emit({ algo, lines: [lineFor('root')], title: 'TRANSPLANT: u was the root',
      explanation: `u.p == NIL, so T.root = ${keyOf(r.s, v)}.`,
      active: v === NIL ? [] : [v], pointerNote: `T.root = ${keyOf(r.s, v)}` });
  } else if (u === N(r.s, up).left) {
    N(r.s, up).left = v;
    r.metrics.pointerWrites++;
    r.emit({ algo, lines: [lineFor('left')], title: `TRANSPLANT: relink ${N(r.s, up).key}.left`,
      explanation: `u was u.p.left, so ${N(r.s, up).key}.left = ${keyOf(r.s, v)}.`,
      active: [up], pointerNote: `${N(r.s, up).key}.left = ${keyOf(r.s, v)}` });
  } else {
    N(r.s, up).right = v;
    r.metrics.pointerWrites++;
    r.emit({ algo, lines: [lineFor('right')], title: `TRANSPLANT: relink ${N(r.s, up).key}.right`,
      explanation: `u was u.p.right, so ${N(r.s, up).key}.right = ${keyOf(r.s, v)}.`,
      active: [up], pointerNote: `${N(r.s, up).key}.right = ${keyOf(r.s, v)}` });
  }
  if (v !== NIL) {
    N(r.s, v).parent = up;
    r.metrics.pointerWrites++;
    r.emit({ algo, lines: [lineFor('vp')], title: 'TRANSPLANT: fix the parent pointer',
      explanation: `v ≠ NIL, so ${keyOf(r.s, v)}.p = ${keyOf(r.s, up)}. The subtree is now fully relinked.`,
      active: [v], pointerNote: `${keyOf(r.s, v)}.p = ${keyOf(r.s, up)}` });
  } else {
    // sentinel parent (used by RB delete fix-up)
    N(r.s, NIL).parent = up;
  }
}

const bstTpLine = (s: string) =>
  s === 'root' ? 'TP-3' : s === 'left' ? 'TP-5' : s === 'right' ? 'TP-6' : 'TP-8';
const rbTpLine = (s: string) =>
  s === 'root' ? 'RBT-3' : s === 'left' ? 'RBT-5' : s === 'right' ? 'RBT-6' : 'RBT-7';

/* ───────────────────────────── BST: delete ────────────────────────────── */

export function opDelete(start: TreeState, key: number): OperationResult {
  const r = new Run(start);
  const z = findByKey(r.s, key);
  if (z === NIL) {
    r.emit({ algo: 'TREE-DELETE', lines: ['TD-1'], title: `Key ${key} not in tree`,
      explanation: `No node holds key ${key}, so there is nothing to delete.` });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `${key} not in tree.` };
  }
  r.path.push(z);
  r.emit({ algo: 'TREE-DELETE', lines: ['TD-1', 'TD-2'], title: `Delete ${key}`,
    explanation: `z = node ${key}. Test z.left == NIL: ${N(r.s, z).left === NIL}.`,
    active: [z], removed: [z] });

  if (N(r.s, z).left === NIL) {
    r.emit({ algo: 'TREE-DELETE', lines: ['TD-2', 'TD-3'], title: 'Case A: no left child',
      explanation: `z has no left child, so replace z by its right child (possibly NIL) using TRANSPLANT.`,
      active: [z], removed: [z], invariant: 'z had no left subtree, so the right subtree alone slots into z\'s place.' });
    recTransplant(r, z, N(r.s, z).right, 'TRANSPLANT', bstTpLine);
  } else if (N(r.s, z).right === NIL) {
    r.emit({ algo: 'TREE-DELETE', lines: ['TD-4', 'TD-5'], title: 'Case B: no right child',
      explanation: `z has a left child but no right child, so replace z by its left child using TRANSPLANT.`,
      active: [z], removed: [z], invariant: 'z had no right subtree, so the left subtree alone slots into z\'s place.' });
    recTransplant(r, z, N(r.s, z).left, 'TRANSPLANT', bstTpLine);
  } else {
    // two children
    r.emit({ algo: 'TREE-DELETE', lines: ['TD-6'], title: 'Case C: two children — find successor',
      explanation: `z has both children. Set y = TREE-MINIMUM(z.right): the successor of z.`,
      active: [z], removed: [z] });
    let y = N(r.s, z).right;
    while (N(r.s, y).left !== NIL) {
      r.path.push(y);
      r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-2', 'MIN-3'], title: `Walk left to the successor`,
        explanation: `Inside TREE-MINIMUM(z.right): y.left ≠ NIL, so y = y.left.`,
        compared: [y], removed: [z] });
      y = N(r.s, y).left;
    }
    r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-4'], title: `Successor y = ${N(r.s, y).key}`,
      explanation: `y = ${N(r.s, y).key} is the leftmost node of z.right — it has no left child.`,
      active: [y], removed: [z],
      invariant: 'The successor has no left child, so its old slot has at most one (right) child.' });

    if (N(r.s, y).parent !== z) {
      r.emit({ algo: 'TREE-DELETE', lines: ['TD-7', 'TD-8'], title: 'y is deeper than z.right',
        explanation: `y.p ≠ z. First detach y: TRANSPLANT(T, y, y.right) lifts y's right child into y's slot.`,
        active: [y], removed: [z] });
      recTransplant(r, y, N(r.s, y).right, 'TRANSPLANT', bstTpLine);
      N(r.s, y).right = N(r.s, z).right;
      r.metrics.pointerWrites++;
      r.emit({ algo: 'TREE-DELETE', lines: ['TD-9'], title: 'Give y the old right subtree of z',
        explanation: `y.right = z.right (${keyOf(r.s, N(r.s, z).right)}).`,
        active: [y], removed: [z], pointerNote: `${N(r.s, y).key}.right = ${keyOf(r.s, N(r.s, z).right)}` });
      N(r.s, N(r.s, y).right).parent = y;
      r.metrics.pointerWrites++;
      r.emit({ algo: 'TREE-DELETE', lines: ['TD-10'], title: 'Fix that subtree\'s parent pointer',
        explanation: `y.right.p = y, so the right subtree now points back up to y.`,
        active: [y], removed: [z], pointerNote: `${N(r.s, N(r.s, y).right).key}.p = ${N(r.s, y).key}` });
    } else {
      r.emit({ algo: 'TREE-DELETE', lines: ['TD-7'], title: 'y is z.right itself',
        explanation: `y.p == z, so y is already directly below z — no detach needed.`,
        active: [y], removed: [z] });
    }
    r.emit({ algo: 'TREE-DELETE', lines: ['TD-11'], title: 'Move y into z\'s position',
      explanation: `TRANSPLANT(T, z, y) replaces z by y in z's parent.`,
      active: [y], removed: [z] });
    recTransplant(r, z, y, 'TRANSPLANT', bstTpLine);
    N(r.s, y).left = N(r.s, z).left;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'TREE-DELETE', lines: ['TD-12'], title: 'Give y the old left subtree of z',
      explanation: `y.left = z.left (${keyOf(r.s, N(r.s, z).left)}).`,
      active: [y], pointerNote: `${N(r.s, y).key}.left = ${keyOf(r.s, N(r.s, z).left)}` });
    N(r.s, N(r.s, y).left).parent = y;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'TREE-DELETE', lines: ['TD-13'], title: 'Fix that subtree\'s parent pointer',
      explanation: `y.left.p = y. y now has both of z's old subtrees and the deletion is done.`,
      active: [y], pointerNote: `${N(r.s, N(r.s, y).left).key}.p = ${N(r.s, y).key}`,
      invariant: 'y was z\'s successor, so it fits between z\'s left and right subtrees — BST order is preserved.' });
  }
  delete r.s.nodes[z];
  return { steps: r.steps, finalState: r.s, mutates: true, summary: `Deleted ${key}.` };
}

/* ─────────────────────── rotations (recording) ────────────────────────── */

function recLeftRotate(r: Run, xId: number): void {
  const x = N(r.s, xId);
  const yId = x.right;
  r.metrics.rotations++;
  r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-2'], title: `LEFT-ROTATE at ${x.key}`,
    explanation: `y = x.right = ${N(r.s, yId).key}. y will rise into x's position.`,
    active: [xId, yId] });
  x.right = N(r.s, yId).left;
  r.metrics.pointerWrites++;
  r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-3'], title: 'Move y\'s left subtree (β) to x.right',
    explanation: `x.right = y.left (${keyOf(r.s, N(r.s, yId).left)}). β sits between x and y, so it becomes x's right subtree.`,
    active: [xId], pointerNote: `${x.key}.right = ${keyOf(r.s, N(r.s, yId).left)}` });
  if (N(r.s, yId).left !== NIL) {
    N(r.s, N(r.s, yId).left).parent = xId;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-4', 'LR-5'], title: 'Fix β\'s parent pointer',
      explanation: `y.left ≠ NIL, so y.left.p = x.`,
      active: [xId], pointerNote: `${N(r.s, N(r.s, yId).left).key}.p = ${x.key}` });
  }
  N(r.s, yId).parent = x.parent;
  r.metrics.pointerWrites++;
  r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-6'], title: 'Link y to x\'s old parent',
    explanation: `y.p = x.p (${keyOf(r.s, x.parent)}).`,
    active: [yId], pointerNote: `${N(r.s, yId).key}.p = ${keyOf(r.s, x.parent)}` });
  if (x.parent === NIL) {
    r.s.root = yId;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-7', 'LR-8'], title: 'y becomes the root',
      explanation: `x.p == NIL, so T.root = y.`,
      active: [yId], pointerNote: 'T.root = y' });
  } else if (xId === N(r.s, x.parent).left) {
    N(r.s, x.parent).left = yId;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-9', 'LR-10'], title: 'Hook y under x\'s old parent',
      explanation: `x was a left child, so x.p.left = y.`,
      active: [yId], pointerNote: `${N(r.s, x.parent).key}.left = ${N(r.s, yId).key}` });
  } else {
    N(r.s, x.parent).right = yId;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-9', 'LR-11'], title: 'Hook y under x\'s old parent',
      explanation: `x was a right child, so x.p.right = y.`,
      active: [yId], pointerNote: `${N(r.s, x.parent).key}.right = ${N(r.s, yId).key}` });
  }
  N(r.s, yId).left = xId;
  r.metrics.pointerWrites++;
  x.parent = yId;
  r.metrics.pointerWrites++;
  r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-12', 'LR-13'], title: 'Make x the left child of y',
    explanation: `y.left = x and x.p = y. The rotation is done — in-order order is unchanged.`,
    active: [xId, yId], pointerNote: `${N(r.s, yId).key}.left = ${x.key}; ${x.key}.p = ${N(r.s, yId).key}`,
    invariant: 'In-order sequence α, x, β, y, γ is identical before and after — the BST property is preserved.' });
}

function recRightRotate(r: Run, xId: number): void {
  const x = N(r.s, xId);
  const yId = x.left;
  r.metrics.rotations++;
  r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-2'], title: `RIGHT-ROTATE at ${x.key}`,
    explanation: `y = x.left = ${N(r.s, yId).key}. y will rise into x's position.`,
    active: [xId, yId] });
  x.left = N(r.s, yId).right;
  r.metrics.pointerWrites++;
  r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-3'], title: 'Move y\'s right subtree (β) to x.left',
    explanation: `x.left = y.right (${keyOf(r.s, N(r.s, yId).right)}). β sits between y and x, so it becomes x's left subtree.`,
    active: [xId], pointerNote: `${x.key}.left = ${keyOf(r.s, N(r.s, yId).right)}` });
  if (N(r.s, yId).right !== NIL) {
    N(r.s, N(r.s, yId).right).parent = xId;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-4', 'RR-5'], title: 'Fix β\'s parent pointer',
      explanation: `y.right ≠ NIL, so y.right.p = x.`,
      active: [xId], pointerNote: `${N(r.s, N(r.s, yId).right).key}.p = ${x.key}` });
  }
  N(r.s, yId).parent = x.parent;
  r.metrics.pointerWrites++;
  r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-6'], title: 'Link y to x\'s old parent',
    explanation: `y.p = x.p (${keyOf(r.s, x.parent)}).`,
    active: [yId], pointerNote: `${N(r.s, yId).key}.p = ${keyOf(r.s, x.parent)}` });
  if (x.parent === NIL) {
    r.s.root = yId;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-7', 'RR-8'], title: 'y becomes the root',
      explanation: `x.p == NIL, so T.root = y.`,
      active: [yId], pointerNote: 'T.root = y' });
  } else if (xId === N(r.s, x.parent).right) {
    N(r.s, x.parent).right = yId;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-9', 'RR-10'], title: 'Hook y under x\'s old parent',
      explanation: `x was a right child, so x.p.right = y.`,
      active: [yId], pointerNote: `${N(r.s, x.parent).key}.right = ${N(r.s, yId).key}` });
  } else {
    N(r.s, x.parent).left = yId;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-9', 'RR-11'], title: 'Hook y under x\'s old parent',
      explanation: `x was a left child, so x.p.left = y.`,
      active: [yId], pointerNote: `${N(r.s, x.parent).key}.left = ${N(r.s, yId).key}` });
  }
  N(r.s, yId).right = xId;
  r.metrics.pointerWrites++;
  x.parent = yId;
  r.metrics.pointerWrites++;
  r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-12', 'RR-13'], title: 'Make x the right child of y',
    explanation: `y.right = x and x.p = y. The rotation is done — in-order order is unchanged.`,
    active: [xId, yId], pointerNote: `${N(r.s, yId).key}.right = ${x.key}; ${x.key}.p = ${N(r.s, yId).key}`,
    invariant: 'In-order sequence α, y, β, x, γ is identical before and after — the BST property is preserved.' });
}

export function opLeftRotate(start: TreeState, key: number): OperationResult {
  const r = new Run(start);
  const x = findByKey(r.s, key);
  if (x === NIL || N(r.s, x).right === NIL) {
    r.emit({ algo: 'LEFT-ROTATE', lines: ['LR-1'], title: 'Rotation not possible',
      explanation: x === NIL ? `No node with key ${key}.`
        : `LEFT-ROTATE needs x.right ≠ NIL, but ${key} has no right child.` });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: 'Rotation illegal.' };
  }
  recLeftRotate(r, x);
  return { steps: r.steps, finalState: r.s, mutates: true, summary: `Left-rotated at ${key}.` };
}

export function opRightRotate(start: TreeState, key: number): OperationResult {
  const r = new Run(start);
  const x = findByKey(r.s, key);
  if (x === NIL || N(r.s, x).left === NIL) {
    r.emit({ algo: 'RIGHT-ROTATE', lines: ['RR-1'], title: 'Rotation not possible',
      explanation: x === NIL ? `No node with key ${key}.`
        : `RIGHT-ROTATE needs x.left ≠ NIL, but ${key} has no left child.` });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: 'Rotation illegal.' };
  }
  recRightRotate(r, x);
  return { steps: r.steps, finalState: r.s, mutates: true, summary: `Right-rotated at ${key}.` };
}

/* ──────────────────────────── RB-INSERT ────────────────────────────────── */

function recolor(r: Run, id: number, c: Color, algo: string, line: string, why: string): void {
  if (id === NIL) return;
  N(r.s, id).color = c;
  r.metrics.recolors++;
  r.emit({ algo, lines: [line], title: `Recolor ${N(r.s, id).key} ${c === 'R' ? 'RED' : 'BLACK'}`,
    explanation: why, active: [id] });
}

export function opRbInsert(start: TreeState, k: number): OperationResult {
  const r = new Run(start);
  // BST descent
  const z: VNode = { id: r.s.nextId++, key: k, color: 'R', left: NIL, right: NIL, parent: NIL };
  r.s.nodes[z.id] = z;
  let y = NIL;
  let x = r.s.root;
  r.emit({ algo: 'RB-INSERT', lines: ['RBI-2'], title: `RB-INSERT ${k}`,
    explanation: 'Begin with an ordinary BST descent to find the NIL slot for the new key.',
    active: [x] });
  while (x !== NIL) {
    y = x;
    r.path.push(x);
    r.metrics.comparisons++;
    const kx = N(r.s, x).key;
    r.emit({ algo: 'RB-INSERT', lines: ['RBI-3', 'RBI-4', 'RBI-5'], title: `Compare ${k} with ${kx}`,
      explanation: `Descend: ${k} ${k < kx ? '<' : '≥'} ${kx}, so move ${k < kx ? 'left' : 'right'}.`,
      compared: [x] });
    x = k < kx ? N(r.s, x).left : N(r.s, x).right;
  }
  z.parent = y;
  r.metrics.pointerWrites++;
  if (y === NIL) r.s.root = z.id;
  else if (k < N(r.s, y).key) N(r.s, y).left = z.id;
  else N(r.s, y).right = z.id;
  r.metrics.pointerWrites++;
  r.emit({ algo: 'RB-INSERT', lines: ['RBI-6', 'RBI-7'], title: `Attach ${k} as a RED leaf`,
    explanation: `Link z under ${keyOf(r.s, y)} and color it RED. A red node keeps every black-height unchanged, so property 5 is safe — only a red-red edge (property 4) can be wrong.`,
    active: [z.id],
    invariant: 'New node is RED so black-heights are untouched; the only possible violation is red parent + red child.' });
  r.emit({ algo: 'RB-INSERT', lines: ['RBI-8'], title: 'Call RB-INSERT-FIXUP',
    explanation: 'Hand control to RB-INSERT-FIXUP to repair any red-red violation.',
    active: [z.id] });

  rbInsertFixup(r, z.id);
  return { steps: r.steps, finalState: r.s, mutates: true, summary: `RB-INSERT ${k} done.` };
}

function rbInsertFixup(r: Run, zId: number): void {
  let z = zId;
  while (N(r.s, N(r.s, z).parent).color === 'R') {
    const p = N(r.s, z).parent;
    const g = N(r.s, p).parent;
    r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-2'], title: 'Red-red violation detected',
      explanation: `z.p (${N(r.s, p).key}) is RED, so z and its parent are both red — property 4 is violated. Enter the fix-up loop.`,
      active: [z], compared: [p],
      invariant: 'Loop invariant: z is red; the only violation is a red z with a red parent.' });
    if (p === N(r.s, g).left) {
      const u = N(r.s, g).right;
      r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-3', 'RIF-4'], title: 'Parent is a left child — inspect the uncle',
        explanation: `z.p is the left child of g (${N(r.s, g).key}). Uncle y = g.right = ${keyOf(r.s, u)} (${N(r.s, u).color === 'R' ? 'RED' : 'BLACK'}).`,
        active: [z], compared: [g, u].filter(i => i !== NIL) });
      if (N(r.s, u).color === 'R') {
        r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-5'], title: 'Case 1: uncle is RED', caseTag: 'Case 1',
          explanation: 'Uncle is red. Push blackness down from the grandparent: recolor parent and uncle BLACK, grandparent RED.',
          active: [z], compared: [p, u, g] });
        recolor(r, p, 'B', 'RB-INSERT-FIXUP', 'RIF-6', 'z.p.color = BLACK — the red-red edge below g is removed.');
        recolor(r, u, 'B', 'RB-INSERT-FIXUP', 'RIF-7', 'y.color = BLACK — keeps black-heights balanced under g.');
        recolor(r, g, 'R', 'RB-INSERT-FIXUP', 'RIF-8', 'z.p.p.color = RED — black-height under g is unchanged overall.');
        z = g;
        r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-9'], title: 'Case 1: move z up to the grandparent', caseTag: 'Case 1',
          explanation: `z = z.p.p (${N(r.s, g).key}). The possible violation has moved up two levels; re-test the loop.`,
          active: [z],
          invariant: 'Black-heights preserved; any new violation is again a red z with a red parent, higher up.' });
      } else {
        if (z === N(r.s, p).right) {
          r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-10', 'RIF-11'], title: 'Case 2: z is an inner (right) child', caseTag: 'Case 2',
            explanation: 'Uncle is black and z is a "triangle". Set z = z.p and left-rotate to turn the triangle into a line.',
            active: [z, p] });
          z = p;
          recLeftRotate(r, z);
        }
        r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-13', 'RIF-14'], title: 'Case 3: recolor for the line', caseTag: 'Case 3',
          explanation: 'Now z is an outer child (a "line"). Recolor z.p BLACK and z.p.p RED before the final rotation.',
          active: [z, N(r.s, z).parent] });
        recolor(r, N(r.s, z).parent, 'B', 'RB-INSERT-FIXUP', 'RIF-13', 'z.p.color = BLACK.');
        recolor(r, N(r.s, N(r.s, z).parent).parent, 'R', 'RB-INSERT-FIXUP', 'RIF-14', 'z.p.p.color = RED.');
        r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-15'], title: 'Case 3: rotate the grandparent', caseTag: 'Case 3',
          explanation: 'RIGHT-ROTATE the grandparent. The black parent rises above two red children — property 4 is restored locally.',
          active: [N(r.s, N(r.s, z).parent).parent] });
        recRightRotate(r, N(r.s, N(r.s, z).parent).parent);
      }
    } else {
      const u = N(r.s, g).left;
      r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-16', 'RIF-3', 'RIF-4'], title: 'Mirror: parent is a right child',
        explanation: `z.p is the right child of g (${N(r.s, g).key}). Uncle y = g.left = ${keyOf(r.s, u)} (${N(r.s, u).color === 'R' ? 'RED' : 'BLACK'}). Use the left/right-exchanged cases.`,
        active: [z], compared: [g, u].filter(i => i !== NIL) });
      if (N(r.s, u).color === 'R') {
        r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-16', 'RIF-5'], title: 'Case 1 (mirror): uncle is RED', caseTag: 'Case 1',
          explanation: 'Uncle is red. Recolor parent and uncle BLACK, grandparent RED, then move up.',
          active: [z], compared: [p, u, g] });
        recolor(r, p, 'B', 'RB-INSERT-FIXUP', 'RIF-6', 'z.p.color = BLACK.');
        recolor(r, u, 'B', 'RB-INSERT-FIXUP', 'RIF-7', 'y.color = BLACK.');
        recolor(r, g, 'R', 'RB-INSERT-FIXUP', 'RIF-8', 'z.p.p.color = RED.');
        z = g;
        r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-9'], title: 'Case 1: move z up to the grandparent', caseTag: 'Case 1',
          explanation: `z = z.p.p (${N(r.s, g).key}). Re-test the loop two levels higher.`,
          active: [z] });
      } else {
        if (z === N(r.s, p).left) {
          r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-16', 'RIF-10', 'RIF-11'], title: 'Case 2 (mirror): inner (left) child', caseTag: 'Case 2',
            explanation: 'Uncle is black and z is a triangle. Set z = z.p and right-rotate to form a line.',
            active: [z, p] });
          z = p;
          recRightRotate(r, z);
        }
        r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-16', 'RIF-13', 'RIF-14'], title: 'Case 3 (mirror): recolor for the line', caseTag: 'Case 3',
          explanation: 'z is an outer child. Recolor z.p BLACK and z.p.p RED before the final rotation.',
          active: [z, N(r.s, z).parent] });
        recolor(r, N(r.s, z).parent, 'B', 'RB-INSERT-FIXUP', 'RIF-13', 'z.p.color = BLACK.');
        recolor(r, N(r.s, N(r.s, z).parent).parent, 'R', 'RB-INSERT-FIXUP', 'RIF-14', 'z.p.p.color = RED.');
        r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-16', 'RIF-15'], title: 'Case 3 (mirror): rotate the grandparent', caseTag: 'Case 3',
          explanation: 'LEFT-ROTATE the grandparent to restore property 4 locally.',
          active: [N(r.s, N(r.s, z).parent).parent] });
        recLeftRotate(r, N(r.s, N(r.s, z).parent).parent);
      }
    }
  }
  r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-2'], title: 'Loop ends — no red-red edge',
    explanation: `z.p is BLACK (or z is the root), so property 4 holds everywhere.`,
    active: [z] });
  if (N(r.s, r.s.root).color !== 'B') {
    recolor(r, r.s.root, 'B', 'RB-INSERT-FIXUP', 'RIF-17',
      'T.root.color = BLACK — enforce property 2. This never changes any black-height.');
  } else {
    r.emit({ algo: 'RB-INSERT-FIXUP', lines: ['RIF-17'], title: 'Root is already BLACK',
      explanation: 'T.root.color = BLACK enforces property 2. The tree is a valid red-black tree again.',
      active: [r.s.root],
      invariant: 'All five red-black properties now hold; height stays ≤ 2·lg(n+1).' });
  }
}

/* ──────────────────────────── RB-DELETE ────────────────────────────────── */

export function opRbDelete(start: TreeState, key: number): OperationResult {
  const r = new Run(start);
  const z = findByKey(r.s, key);
  if (z === NIL) {
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-1'], title: `Key ${key} not in tree`,
      explanation: `No node holds key ${key}.` });
    return { steps: r.steps, finalState: r.s, mutates: false, summary: `${key} not in tree.` };
  }
  r.path.push(z);
  let y = z;
  let yOrig = N(r.s, y).color;
  let x: number;
  r.emit({ algo: 'RB-DELETE', lines: ['RBD-2'], title: `RB-DELETE ${key}`,
    explanation: `y = z. y-original-color = ${yOrig === 'R' ? 'RED' : 'BLACK'}. If a BLACK node leaves the tree, a black-height drops and the fix-up is needed.`,
    active: [z], removed: [z] });

  if (N(r.s, z).left === NIL) {
    x = N(r.s, z).right;
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-3', 'RBD-4'], title: 'No left child',
      explanation: `z.left == NIL. x = z.right (${keyOf(r.s, x)}) will move into z's place via RB-TRANSPLANT.`,
      active: [z], removed: [z] });
    recTransplant(r, z, N(r.s, z).right, 'RB-TRANSPLANT', rbTpLine);
  } else if (N(r.s, z).right === NIL) {
    x = N(r.s, z).left;
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-5', 'RBD-6'], title: 'No right child',
      explanation: `z.right == NIL. x = z.left (${keyOf(r.s, x)}) will move into z's place via RB-TRANSPLANT.`,
      active: [z], removed: [z] });
    recTransplant(r, z, N(r.s, z).left, 'RB-TRANSPLANT', rbTpLine);
  } else {
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-7'], title: 'Two children — find the successor',
      explanation: `y = TREE-MINIMUM(z.right): the successor that will physically replace z.`,
      active: [z], removed: [z] });
    y = N(r.s, z).right;
    while (N(r.s, y).left !== NIL) {
      r.path.push(y);
      r.emit({ algo: 'TREE-MINIMUM', lines: ['MIN-2', 'MIN-3'], title: 'Walk left to the successor',
        explanation: 'Inside TREE-MINIMUM(z.right): y = y.left.', compared: [y], removed: [z] });
      y = N(r.s, y).left;
    }
    yOrig = N(r.s, y).color;
    x = N(r.s, y).right;
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-8', 'RBD-9'], title: `Successor y = ${N(r.s, y).key}`,
      explanation: `y-original-color = ${yOrig === 'R' ? 'RED' : 'BLACK'} (it is y, not z, that physically leaves its slot). x = y.right (${keyOf(r.s, x)}) takes y's old place.`,
      active: [y], removed: [z] });
    if (N(r.s, y).parent === z) {
      N(r.s, NIL).parent = y; // sentinel parent, harmless for real x too
      if (x !== NIL) N(r.s, x).parent = y;
      r.emit({ algo: 'RB-DELETE', lines: ['RBD-10'], title: 'y is z\'s right child',
        explanation: `y.p == z, so x stays directly under y. Set x.p = y (this also sets the NIL sentinel's parent for the fix-up).`,
        active: [y], removed: [z], pointerNote: `${keyOf(r.s, x)}.p = ${N(r.s, y).key}` });
    } else {
      r.emit({ algo: 'RB-DELETE', lines: ['RBD-11'], title: 'y is deeper than z.right',
        explanation: 'Detach y first: RB-TRANSPLANT(T, y, y.right) lifts x into y\'s old slot.',
        active: [y], removed: [z] });
      recTransplant(r, y, N(r.s, y).right, 'RB-TRANSPLANT', rbTpLine);
      N(r.s, y).right = N(r.s, z).right;
      r.metrics.pointerWrites++;
      N(r.s, N(r.s, y).right).parent = y;
      r.metrics.pointerWrites++;
      r.emit({ algo: 'RB-DELETE', lines: ['RBD-12'], title: 'Give y the old right subtree of z',
        explanation: `y.right = z.right and y.right.p = y.`,
        active: [y], removed: [z], pointerNote: `${N(r.s, y).key}.right = ${keyOf(r.s, N(r.s, z).right)}` });
    }
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-13'], title: 'Move y into z\'s position',
      explanation: 'RB-TRANSPLANT(T, z, y) replaces z by y in z\'s parent.',
      active: [y], removed: [z] });
    recTransplant(r, z, y, 'RB-TRANSPLANT', rbTpLine);
    N(r.s, y).left = N(r.s, z).left;
    r.metrics.pointerWrites++;
    N(r.s, N(r.s, y).left).parent = y;
    r.metrics.pointerWrites++;
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-14'], title: 'Give y the old left subtree of z',
      explanation: `y.left = z.left and y.left.p = y.`,
      active: [y], pointerNote: `${N(r.s, y).key}.left = ${keyOf(r.s, N(r.s, z).left)}` });
    N(r.s, y).color = N(r.s, z).color;
    r.metrics.recolors++;
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-15'], title: 'y takes z\'s color',
      explanation: `y.color = z.color (${N(r.s, z).color === 'R' ? 'RED' : 'BLACK'}). y now looks exactly like z did, so any color problem is purely about the node that left: y-original-color.`,
      active: [y] });
  }

  delete r.s.nodes[z];
  if (yOrig === 'B') {
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-16', 'RBD-17'], title: 'A BLACK node was removed — fix up',
      explanation: `y-original-color was BLACK, so one root-to-NIL path lost a black node. x = ${keyOf(r.s, x)} now carries an extra "doubly-black" token; call RB-DELETE-FIXUP.`,
      active: x === NIL ? [] : [x],
      invariant: 'x carries one unit of extra blackness; the fix-up restores property 5 without breaking the BST.' });
    rbDeleteFixup(r, x);
  } else {
    r.emit({ algo: 'RB-DELETE', lines: ['RBD-16'], title: 'A RED node was removed — done',
      explanation: 'y-original-color was RED. Removing a red node changes no black-height and creates no red-red edge, so no fix-up is needed.',
      active: x === NIL ? [] : [x],
      invariant: 'All five red-black properties still hold.' });
  }
  return { steps: r.steps, finalState: r.s, mutates: true, summary: `RB-DELETE ${key} done.` };
}

function rbDeleteFixup(r: Run, xId: number): void {
  let x = xId;
  let guard = 0;
  while (x !== r.s.root && N(r.s, x).color === 'B' && guard++ < 60) {
    const xp = N(r.s, x).parent;
    if (x === N(r.s, xp).left) {
      let w = N(r.s, xp).right;
      r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-2', 'RDF-3', 'RDF-4'], title: 'x is a left child — inspect sibling w',
        explanation: `x is doubly-black and a left child of ${N(r.s, xp).key}. Sibling w = x.p.right = ${keyOf(r.s, w)} (${N(r.s, w).color === 'R' ? 'RED' : 'BLACK'}).`,
        active: x === NIL ? [] : [x], compared: w === NIL ? [xp] : [xp, w] });
      if (N(r.s, w).color === 'R') {
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-5', 'RDF-6'], title: 'Case 1: sibling w is RED', caseTag: 'Case 1',
          explanation: 'Recolor w BLACK and x.p RED, then left-rotate x.p. This gives x a black sibling, converting to Case 2, 3 or 4.',
          active: x === NIL ? [] : [x], compared: [w, xp] });
        recolor(r, w, 'B', 'RB-DELETE-FIXUP', 'RDF-6', 'w.color = BLACK.');
        recolor(r, xp, 'R', 'RB-DELETE-FIXUP', 'RDF-6', 'x.p.color = RED.');
        recLeftRotate(r, xp);
        w = N(r.s, N(r.s, x).parent).right;
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-7'], title: 'Case 1: recompute sibling w', caseTag: 'Case 1',
          explanation: `After the rotation w = x.p.right = ${keyOf(r.s, w)}, which is now BLACK.`,
          active: x === NIL ? [] : [x], compared: w === NIL ? [] : [w] });
      }
      if (N(r.s, N(r.s, w).left).color === 'B' && N(r.s, N(r.s, w).right).color === 'B') {
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-8', 'RDF-9'], title: 'Case 2: w\'s children are both BLACK', caseTag: 'Case 2',
          explanation: 'Move the extra blackness up: recolor w RED and set x = x.p. Now x.p carries the deficit.',
          active: x === NIL ? [] : [x], compared: [w] });
        recolor(r, w, 'R', 'RB-DELETE-FIXUP', 'RDF-9', 'w.color = RED — both subtrees under x.p now lack one black.');
        x = N(r.s, x).parent;
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-9'], title: 'Case 2: move x up', caseTag: 'Case 2',
          explanation: `x = x.p (${keyOf(r.s, x)}). Re-test the loop one level higher.`,
          active: [x],
          invariant: 'The extra-black token moved up; property 5 holds once that token is discharged.' });
      } else {
        if (N(r.s, N(r.s, w).right).color === 'B') {
          r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-10', 'RDF-11'], title: 'Case 3: w\'s right child is BLACK', caseTag: 'Case 3',
            explanation: 'w\'s near (left) child is red, far (right) child is black. Recolor and right-rotate w to turn this into Case 4.',
            active: x === NIL ? [] : [x], compared: [w] });
          recolor(r, N(r.s, w).left, 'B', 'RB-DELETE-FIXUP', 'RDF-11', 'w.left.color = BLACK.');
          recolor(r, w, 'R', 'RB-DELETE-FIXUP', 'RDF-11', 'w.color = RED.');
          recRightRotate(r, w);
          w = N(r.s, N(r.s, x).parent).right;
          r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-12'], title: 'Case 3: recompute sibling w', caseTag: 'Case 3',
            explanation: `w = x.p.right = ${keyOf(r.s, w)}; its right child is now RED, so Case 4 applies.`,
            active: x === NIL ? [] : [x], compared: [w] });
        }
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-13', 'RDF-14'], title: 'Case 4: w\'s right child is RED', caseTag: 'Case 4',
          explanation: 'Recolor: w takes x.p\'s color, x.p becomes BLACK, w.right becomes BLACK. A red node is about to absorb the extra blackness.',
          active: x === NIL ? [] : [x], compared: [w] });
        N(r.s, w).color = N(r.s, N(r.s, x).parent).color;
        r.metrics.recolors++;
        recolor(r, N(r.s, x).parent, 'B', 'RB-DELETE-FIXUP', 'RDF-14', 'x.p.color = BLACK — absorbs the extra blackness.');
        recolor(r, N(r.s, w).right, 'B', 'RB-DELETE-FIXUP', 'RDF-14', 'w.right.color = BLACK — pays for the rotation.');
        recLeftRotate(r, N(r.s, x).parent);
        x = r.s.root;
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-15'], title: 'Case 4: rotation done — set x = T.root', caseTag: 'Case 4',
          explanation: 'LEFT-ROTATE(x.p) finishes the repair. Setting x = T.root ends the loop.',
          active: [r.s.root],
          invariant: 'Property 5 is fully restored; the extra-black token is discharged.' });
      }
    } else {
      // mirror
      let w = N(r.s, xp).left;
      r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-3', 'RDF-4'], title: 'Mirror: x is a right child — inspect sibling w',
        explanation: `x is a right child of ${N(r.s, xp).key}. Sibling w = x.p.left = ${keyOf(r.s, w)} (${N(r.s, w).color === 'R' ? 'RED' : 'BLACK'}). Use the left/right-exchanged cases.`,
        active: x === NIL ? [] : [x], compared: w === NIL ? [xp] : [xp, w] });
      if (N(r.s, w).color === 'R') {
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-5', 'RDF-6'], title: 'Case 1 (mirror): sibling w is RED', caseTag: 'Case 1',
          explanation: 'Recolor w BLACK and x.p RED, then right-rotate x.p.',
          active: x === NIL ? [] : [x], compared: [w, xp] });
        recolor(r, w, 'B', 'RB-DELETE-FIXUP', 'RDF-6', 'w.color = BLACK.');
        recolor(r, xp, 'R', 'RB-DELETE-FIXUP', 'RDF-6', 'x.p.color = RED.');
        recRightRotate(r, xp);
        w = N(r.s, N(r.s, x).parent).left;
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-7'], title: 'Case 1 (mirror): recompute w', caseTag: 'Case 1',
          explanation: `w = x.p.left = ${keyOf(r.s, w)}, now BLACK.`,
          active: x === NIL ? [] : [x], compared: w === NIL ? [] : [w] });
      }
      if (N(r.s, N(r.s, w).right).color === 'B' && N(r.s, N(r.s, w).left).color === 'B') {
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-8', 'RDF-9'], title: 'Case 2 (mirror): w\'s children both BLACK', caseTag: 'Case 2',
          explanation: 'Recolor w RED and move x up to x.p.',
          active: x === NIL ? [] : [x], compared: [w] });
        recolor(r, w, 'R', 'RB-DELETE-FIXUP', 'RDF-9', 'w.color = RED.');
        x = N(r.s, x).parent;
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-9'], title: 'Case 2 (mirror): move x up', caseTag: 'Case 2',
          explanation: `x = x.p (${keyOf(r.s, x)}).`, active: [x] });
      } else {
        if (N(r.s, N(r.s, w).left).color === 'B') {
          r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-10', 'RDF-11'], title: 'Case 3 (mirror): w\'s left child is BLACK', caseTag: 'Case 3',
            explanation: 'Recolor and left-rotate w to reach Case 4.',
            active: x === NIL ? [] : [x], compared: [w] });
          recolor(r, N(r.s, w).right, 'B', 'RB-DELETE-FIXUP', 'RDF-11', 'w.right.color = BLACK.');
          recolor(r, w, 'R', 'RB-DELETE-FIXUP', 'RDF-11', 'w.color = RED.');
          recLeftRotate(r, w);
          w = N(r.s, N(r.s, x).parent).left;
          r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-12'], title: 'Case 3 (mirror): recompute w', caseTag: 'Case 3',
            explanation: `w = x.p.left = ${keyOf(r.s, w)}.`, active: x === NIL ? [] : [x], compared: [w] });
        }
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-13', 'RDF-14'], title: 'Case 4 (mirror): w\'s left child is RED', caseTag: 'Case 4',
          explanation: 'w takes x.p\'s color; x.p and w.left become BLACK; right-rotate x.p.',
          active: x === NIL ? [] : [x], compared: [w] });
        N(r.s, w).color = N(r.s, N(r.s, x).parent).color;
        r.metrics.recolors++;
        recolor(r, N(r.s, x).parent, 'B', 'RB-DELETE-FIXUP', 'RDF-14', 'x.p.color = BLACK.');
        recolor(r, N(r.s, w).left, 'B', 'RB-DELETE-FIXUP', 'RDF-14', 'w.left.color = BLACK.');
        recRightRotate(r, N(r.s, x).parent);
        x = r.s.root;
        r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-16', 'RDF-15'], title: 'Case 4 (mirror): done — set x = T.root', caseTag: 'Case 4',
          explanation: 'The repair is complete.', active: [r.s.root] });
      }
    }
  }
  if (x !== NIL && N(r.s, x).color !== 'B') {
    recolor(r, x, 'B', 'RB-DELETE-FIXUP', 'RDF-17',
      'x.color = BLACK — a red-or-doubly-black x simply becomes black, discharging the extra blackness.');
  } else {
    r.emit({ algo: 'RB-DELETE-FIXUP', lines: ['RDF-17'], title: 'Fix-up complete',
      explanation: 'x.color = BLACK. The loop ended because x is the root or x is red; the extra blackness is absorbed.',
      active: x === NIL ? [] : [x],
      invariant: 'All five red-black properties hold again.' });
  }
}
