import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CODE, CodeBlock, Color, NIL, OperationResult, TreeState, TreeStep,
  blackHeight, buildBST, buildRB, treeHeight,
  opDelete, opInsert, opLeftRotate, opMaximum, opMinimum, opPredecessor,
  opRbDelete, opRbInsert, opRightRotate, opSearch, opSuccessor, opTraversal,
} from './tree-engine';

interface Placed {
  id: number; key: number; color: Color;
  x: number; y: number; role: string;
}
interface NilLeaf { x: number; y: number; px: number; py: number; }
interface Edge { x1: number; y1: number; x2: number; y2: number; faded: boolean; }

interface OpDef { id: string; label: string; needsKey: boolean; }

interface Preset { label: string; keys: number[]; }

@Component({
  selector: 'app-tree-visualizer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tree-visualizer.component.html',
  styleUrls: ['./tree-visualizer.component.scss'],
})
export class TreeVisualizerComponent implements OnChanges, OnDestroy {
  /** 'bst' = ordinary binary search tree, 'rb' = red-black tree. */
  @Input() mode: 'bst' | 'rb' = 'bst';

  // committed-state history (for undo / redo of mutating operations)
  private history: TreeState[] = [];
  private historyIndex = 0;

  // current operation animation
  steps: TreeStep[] = [];
  stepIndex = -1;            // -1 = no active operation, show committed tree
  opSummary = '';

  // controls
  selectedOp = 'search';
  keyInput = 13;
  customInput = '';
  playing = false;
  speedMs = 1100;
  showCode = true;

  // operation log
  log: { text: string; tone: 'info' | 'mut' | 'warn' }[] = [];

  // layout output
  placed: Placed[] = [];
  nilLeaves: NilLeaf[] = [];
  edges: Edge[] = [];
  nilEdges: { x1: number; y1: number; x2: number; y2: number }[] = [];
  viewW = 400;
  viewH = 240;
  nodeR = 21;
  nilW = 34;
  nilH = 24;

  private timer: ReturnType<typeof setInterval> | null = null;

  private readonly baseNodeR = 21;
  private readonly baseXGap = 56;
  private readonly baseYGap = 74;

  readonly bstOps: OpDef[] = [
    { id: 'traverse', label: 'In-order traversal', needsKey: false },
    { id: 'search', label: 'Search', needsKey: true },
    { id: 'minimum', label: 'Minimum', needsKey: false },
    { id: 'maximum', label: 'Maximum', needsKey: false },
    { id: 'successor', label: 'Successor', needsKey: true },
    { id: 'predecessor', label: 'Predecessor', needsKey: true },
    { id: 'insert', label: 'Insert', needsKey: true },
    { id: 'delete', label: 'Delete', needsKey: true },
  ];
  readonly rbOps: OpDef[] = [
    { id: 'rb-insert', label: 'RB-INSERT', needsKey: true },
    { id: 'rb-delete', label: 'RB-DELETE', needsKey: true },
    { id: 'left-rotate', label: 'LEFT-ROTATE at key', needsKey: true },
    { id: 'right-rotate', label: 'RIGHT-ROTATE at key', needsKey: true },
  ];

  readonly bstPresets: Preset[] = [
    { label: 'Classic CLRS tree', keys: [15, 6, 18, 3, 7, 17, 20, 13] },
    { label: 'Balanced', keys: [8, 4, 12, 2, 6, 10, 14] },
    { label: 'Skewed (worst case)', keys: [1, 2, 3, 4, 5, 6, 7] },
  ];
  readonly rbPresets: Preset[] = [
    { label: 'Classic RB tree', keys: [10, 5, 15, 2, 7, 12, 18] },
    { label: 'Larger RB tree', keys: [20, 10, 30, 5, 15, 25, 35, 1, 8] },
  ];

  // RB demos: build a tree, then run one operation that exercises a named case
  readonly rbDemos: { label: string; build: number[]; op: string; key: number; note: string }[] = [
    { label: 'Insert · Case 1 (uncle red)', build: [10, 5, 15], op: 'rb-insert', key: 2,
      note: 'Inserting 2 gives a red parent (5) with a red uncle (15); RB-INSERT-FIXUP runs Case 1 (recolor + move up).' },
    { label: 'Insert · Case 2 → 3', build: [10, 30], op: 'rb-insert', key: 20,
      note: 'Inserting 20 makes a "triangle": Case 2 rotates it to a line, then Case 3 recolors and rotates.' },
    { label: 'Insert · Case 3 (line)', build: [10, 20], op: 'rb-insert', key: 30,
      note: 'Inserting 30 makes a straight "line": RB-INSERT-FIXUP applies Case 3 directly.' },
    { label: 'Delete · black node + fix-up', build: [30, 20, 40, 10], op: 'rb-delete', key: 40,
      note: 'Deleting black leaf 40 leaves a doubly-black NIL; RB-DELETE-FIXUP repairs the deficit.' },
  ];

  /* ───────────────────────────── lifecycle ──────────────────────────── */

  ngOnChanges(): void {
    this.selectedOp = this.mode === 'rb' ? 'rb-insert' : 'search';
    this.resetTree();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  /* ───────────────────────────── getters ────────────────────────────── */

  get ops(): OpDef[] { return this.mode === 'rb' ? this.rbOps : this.bstOps; }
  get presets(): Preset[] { return this.mode === 'rb' ? this.rbPresets : this.bstPresets; }

  get committed(): TreeState { return this.history[this.historyIndex]; }

  get displayState(): TreeState {
    if (this.stepIndex >= 0 && this.steps[this.stepIndex]) return this.steps[this.stepIndex].state;
    return this.committed;
  }

  get currentStep(): TreeStep | null {
    return this.stepIndex >= 0 ? this.steps[this.stepIndex] ?? null : null;
  }

  get hasSteps(): boolean { return this.steps.length > 0 && this.stepIndex >= 0; }

  get atStart(): boolean { return this.stepIndex <= 0; }
  get atEnd(): boolean { return this.stepIndex >= this.steps.length - 1; }

  get canUndo(): boolean { return this.historyIndex > 0; }
  get canRedo(): boolean { return this.historyIndex < this.history.length - 1; }

  get currentOpDef(): OpDef | undefined {
    return this.ops.find(o => o.id === this.selectedOp);
  }
  get needsKey(): boolean { return !!this.currentOpDef?.needsKey; }

  get nodeCount(): number { return Object.keys(this.displayState.nodes).length - 1; }
  get heightLabel(): string {
    const h = treeHeight(this.displayState);
    return h < 0 ? '—' : String(h);
  }
  get blackHeightLabel(): string {
    return this.displayState.root === NIL ? '—' : String(blackHeight(this.displayState));
  }

  get metricLabels(): { label: string; value: string }[] {
    const m = this.currentStep?.metrics;
    const out = [
      { label: 'Nodes', value: String(this.nodeCount) },
      { label: 'Height h', value: this.heightLabel },
    ];
    if (this.mode === 'rb') out.push({ label: 'Black-height', value: this.blackHeightLabel });
    out.push({ label: 'Comparisons', value: String(m?.comparisons ?? 0) });
    out.push({ label: 'Pointer writes', value: String(m?.pointerWrites ?? 0) });
    if (this.mode === 'rb') {
      out.push({ label: 'Rotations', value: String(m?.rotations ?? 0) });
      out.push({ label: 'Recolors', value: String(m?.recolors ?? 0) });
    }
    return out;
  }

  get nodeFontSize(): number {
    return Math.max(10, Math.round(this.nodeR * 0.76));
  }

  get nilFontSize(): number {
    return Math.max(7, Math.round(this.nilH * 0.38));
  }

  /* ───────────────────────── pseudocode panel ───────────────────────── */

  private algosForOp(op: string): string[] {
    switch (op) {
      case 'traverse': return ['INORDER-TREE-WALK'];
      case 'search': return ['ITERATIVE-TREE-SEARCH'];
      case 'minimum': return ['TREE-MINIMUM'];
      case 'maximum': return ['TREE-MAXIMUM'];
      case 'successor': return ['TREE-SUCCESSOR', 'TREE-MINIMUM'];
      case 'predecessor': return ['TREE-PREDECESSOR', 'TREE-MAXIMUM'];
      case 'insert': return ['TREE-INSERT'];
      case 'delete': return ['TREE-DELETE', 'TRANSPLANT', 'TREE-MINIMUM'];
      case 'left-rotate': return ['LEFT-ROTATE'];
      case 'right-rotate': return ['RIGHT-ROTATE'];
      case 'rb-insert': return ['RB-INSERT', 'RB-INSERT-FIXUP', 'LEFT-ROTATE', 'RIGHT-ROTATE'];
      case 'rb-delete': return ['RB-DELETE', 'RB-TRANSPLANT', 'TREE-MINIMUM', 'RB-DELETE-FIXUP', 'LEFT-ROTATE', 'RIGHT-ROTATE'];
      default: return [];
    }
  }

  get codeBlocks(): CodeBlock[] {
    return this.algosForOp(this.selectedOp).map(name => CODE[name]).filter(Boolean);
  }

  isLineActive(lineId: string): boolean {
    return !!this.currentStep && this.currentStep.lines.includes(lineId);
  }
  isBlockActive(name: string): boolean {
    return !!this.currentStep && this.currentStep.algo === name;
  }

  /* ───────────────────────────── tree setup ─────────────────────────── */

  private setHistory(state: TreeState): void {
    this.history = [state];
    this.historyIndex = 0;
    this.steps = [];
    this.stepIndex = -1;
    this.opSummary = '';
    this.refresh();
  }

  resetTree(): void {
    this.stopTimer();
    const preset = this.presets[0];
    this.setHistory(this.mode === 'rb' ? buildRB(preset.keys) : buildBST(preset.keys));
    this.log = [{ text: `Loaded preset: ${preset.label}.`, tone: 'info' }];
    this.syncKeyDefault();
  }

  loadPreset(p: Preset): void {
    this.stopTimer();
    this.setHistory(this.mode === 'rb' ? buildRB(p.keys) : buildBST(p.keys));
    this.log.unshift({ text: `Loaded preset: ${p.label}.`, tone: 'info' });
    this.syncKeyDefault();
  }

  buildCustom(): void {
    const keys = this.customInput
      .split(/[\s,]+/).map(Number).filter(n => Number.isFinite(n)).slice(0, 24);
    if (keys.length === 0) {
      this.log.unshift({ text: 'Custom input had no valid numbers.', tone: 'warn' });
      return;
    }
    this.stopTimer();
    this.setHistory(this.mode === 'rb' ? buildRB(keys) : buildBST(keys));
    this.log.unshift({ text: `Built tree from: ${keys.join(' ')}.`, tone: 'info' });
    this.syncKeyDefault();
  }

  private syncKeyDefault(): void {
    const nodes = Object.values(this.committed.nodes).filter(n => n.id !== NIL);
    if (nodes.length) this.keyInput = nodes[Math.floor(nodes.length / 2)].key;
  }

  /* ─────────────────────────── run operations ───────────────────────── */

  runSelected(): void {
    this.runOp(this.selectedOp, this.keyInput);
  }

  runDemo(d: { build: number[]; op: string; key: number; note: string; label: string }): void {
    this.stopTimer();
    this.setHistory(buildRB(d.build));
    this.selectedOp = d.op;
    this.keyInput = d.key;
    this.log.unshift({ text: d.label + ' — ' + d.note, tone: 'info' });
    this.runOp(d.op, d.key);
  }

  private runOp(op: string, key: number): void {
    this.stopTimer();
    let result: OperationResult;
    try {
      switch (op) {
        case 'traverse': result = opTraversal(this.committed); break;
        case 'search': result = opSearch(this.committed, key); break;
        case 'minimum': result = opMinimum(this.committed); break;
        case 'maximum': result = opMaximum(this.committed); break;
        case 'successor': result = opSuccessor(this.committed, key); break;
        case 'predecessor': result = opPredecessor(this.committed, key); break;
        case 'insert': result = opInsert(this.committed, key); break;
        case 'delete': result = opDelete(this.committed, key); break;
        case 'left-rotate': result = opLeftRotate(this.committed, key); break;
        case 'right-rotate': result = opRightRotate(this.committed, key); break;
        case 'rb-insert': result = opRbInsert(this.committed, key); break;
        case 'rb-delete': result = opRbDelete(this.committed, key); break;
        default: return;
      }
    } catch (e) {
      this.log.unshift({ text: 'Operation failed: ' + (e as Error).message, tone: 'warn' });
      return;
    }
    this.steps = result.steps;
    this.stepIndex = 0;
    this.opSummary = result.summary;
    if (result.mutates) {
      this.history = this.history.slice(0, this.historyIndex + 1);
      this.history.push(result.finalState);
      this.historyIndex++;
    }
    this.log.unshift({ text: result.summary, tone: result.mutates ? 'mut' : 'info' });
    this.refresh();
  }

  /* ───────────────────────── playback controls ──────────────────────── */

  next(): void {
    if (this.atEnd) { this.stopTimer(); return; }
    this.stepIndex++;
    this.refresh();
  }
  prev(): void {
    if (this.atStart) return;
    this.stopTimer();
    this.stepIndex--;
    this.refresh();
  }
  jumpStart(): void { this.stopTimer(); this.stepIndex = 0; this.refresh(); }
  jumpEnd(): void { this.stopTimer(); this.stepIndex = this.steps.length - 1; this.refresh(); }

  togglePlay(): void {
    if (!this.hasSteps) return;
    if (this.playing) { this.stopTimer(); return; }
    if (this.atEnd) this.stepIndex = 0;
    this.playing = true;
    this.timer = setInterval(() => {
      if (this.atEnd) { this.stopTimer(); return; }
      this.stepIndex++;
      this.refresh();
    }, this.speedMs);
  }

  private stopTimer(): void {
    if (this.timer) { clearInterval(this.timer); this.timer = null; }
    this.playing = false;
  }

  onSpeedChange(): void {
    if (this.playing) { this.stopTimer(); this.togglePlay(); }
  }

  clearOp(): void {
    this.stopTimer();
    this.steps = [];
    this.stepIndex = -1;
    this.opSummary = '';
    this.refresh();
  }

  undo(): void {
    if (!this.canUndo) return;
    this.stopTimer();
    this.historyIndex--;
    this.steps = [];
    this.stepIndex = -1;
    this.log.unshift({ text: 'Undo — reverted to the previous tree.', tone: 'info' });
    this.refresh();
  }
  redo(): void {
    if (!this.canRedo) return;
    this.stopTimer();
    this.historyIndex++;
    this.steps = [];
    this.stepIndex = -1;
    this.log.unshift({ text: 'Redo — re-applied the next tree.', tone: 'info' });
    this.refresh();
  }

  /* ───────────────────────────── layout ─────────────────────────────── */

  private refresh(): void {
    const s = this.displayState;
    const showNil = this.mode === 'rb';
    const realNodeCount = Math.max(0, Object.keys(s.nodes).length - 1);
    const currentHeight = Math.max(0, treeHeight(s));
    this.applyResponsiveScale(realNodeCount, currentHeight, showNil);

    const pos: Record<number, { col: number; depth: number }> = {};
    const nils: { col: number; depth: number; parent: number }[] = [];
    let col = 0;
    let maxDepth = 0;

    const rec = (id: number, depth: number, parent: number): void => {
      if (id === NIL) {
        if (showNil && parent !== NIL) {
          nils.push({ col: col++, depth, parent });
          maxDepth = Math.max(maxDepth, depth);
        }
        return;
      }
      maxDepth = Math.max(maxDepth, depth);
      rec(s.nodes[id].left, depth + 1, id);
      pos[id] = { col: col++, depth };
      rec(s.nodes[id].right, depth + 1, id);
    };
    rec(s.root, 0, NIL);

    const xGap = this.currentXGap(realNodeCount, currentHeight, showNil);
    const yGap = this.currentYGap(realNodeCount, currentHeight, showNil);
    const haloMargin = this.nodeR + 12;
    const nilMarginX = this.nilW / 2 + 8;
    const nilMarginY = this.nilH / 2 + 8;
    const sidePad = Math.ceil(Math.max(haloMargin, nilMarginX, 30));
    const topPad = Math.ceil(Math.max(haloMargin, nilMarginY, 30));
    const bottomPad = Math.ceil(Math.max(haloMargin + 2, nilMarginY + 4, 32));

    const X = (c: number) => sidePad + c * xGap;
    const Y = (d: number) => topPad + d * yGap;

    const step = this.currentStep;
    const roleOf = (id: number): string => {
      if (!step) return '';
      if (step.removed.includes(id)) return 'removed';
      if (step.found.includes(id)) return 'found';
      if (step.active.includes(id)) return 'active';
      if (step.compared.includes(id)) return 'compared';
      if (step.path.includes(id)) return 'path';
      return '';
    };

    this.placed = Object.keys(pos).map(k => {
      const id = +k;
      const n = s.nodes[id];
      return { id, key: n.key, color: n.color, x: X(pos[id].col), y: Y(pos[id].depth), role: roleOf(id) };
    });

    this.edges = [];
    for (const k of Object.keys(pos)) {
      const id = +k;
      const p = s.nodes[id].parent;
      if (p !== NIL && pos[p]) {
        this.edges.push({
          x1: X(pos[p].col), y1: Y(pos[p].depth),
          x2: X(pos[id].col), y2: Y(pos[id].depth),
          faded: !!step && step.path.length > 0 && !step.path.includes(id) && !step.path.includes(p)
            && step.active.length === 0,
        });
      }
    }

    this.nilLeaves = nils.map(nl => ({
      x: X(nl.col), y: Y(nl.depth),
      px: pos[nl.parent] ? X(pos[nl.parent].col) : X(nl.col),
      py: pos[nl.parent] ? Y(pos[nl.parent].depth) : Y(nl.depth),
    }));
    this.nilEdges = this.nilLeaves.map(nl => ({ x1: nl.px, y1: nl.py, x2: nl.x, y2: nl.y }));

    const usedColumns = Math.max(1, col);
    this.viewW = Math.max(360, Math.ceil(sidePad * 2 + (usedColumns - 1) * xGap));
    this.viewH = Math.max(200, Math.ceil(topPad + bottomPad + maxDepth * yGap));
  }

  private applyResponsiveScale(nodeCount: number, height: number, showNil: boolean): void {
    const density = Math.max(nodeCount, height * 2, showNil ? nodeCount * 1.6 : nodeCount);

    if (density >= 34) {
      this.nodeR = 12;
      this.nilW = 26;
      this.nilH = 18;
      return;
    }
    if (density >= 24) {
      this.nodeR = 14;
      this.nilW = 28;
      this.nilH = 20;
      return;
    }
    if (density >= 16) {
      this.nodeR = 17;
      this.nilW = 30;
      this.nilH = 22;
      return;
    }

    this.nodeR = this.baseNodeR;
    this.nilW = 34;
    this.nilH = 24;
  }

  private currentXGap(nodeCount: number, height: number, showNil: boolean): number {
    const density = Math.max(nodeCount, height * 2, showNil ? nodeCount * 1.6 : nodeCount);
    if (density >= 34) return 34;
    if (density >= 24) return 40;
    if (density >= 16) return 48;
    return this.baseXGap;
  }

  private currentYGap(nodeCount: number, height: number, showNil: boolean): number {
    const density = Math.max(nodeCount, height * 2, showNil ? nodeCount * 1.6 : nodeCount);
    if (density >= 34) return 46;
    if (density >= 24) return 52;
    if (density >= 16) return 62;
    return this.baseYGap;
  }

  trackNode = (_: number, p: Placed) => p.id;
}
