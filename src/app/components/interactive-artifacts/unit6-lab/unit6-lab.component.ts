import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* ===========================================================================
 * Unit 6 — Binomial Heaps: interactive laboratory.
 * A small binomial-tree engine powers five artifacts; every action is tied to
 * the responsible structural rule, pseudocode line, or binary-addition step.
 * ======================================================================== */

type U6Artifact =
  | 'binomial-tree-explorer'
  | 'binomial-heap-anatomy'
  | 'binomial-heap-union'
  | 'binomial-heap-operations'
  | 'binomial-heap-review';

interface BNode {
  id: number;
  key: number;
  children: BNode[];   // ordered by DECREASING degree (B_{d-1} first)
}

interface LaidNode { id: number; key: number; x: number; y: number; depth: number; root: boolean; }
interface LaidEdge { x1: number; y1: number; x2: number; y2: number; }
interface Layout { nodes: LaidNode[]; edges: LaidEdge[]; w: number; h: number; }

/* ── engine ─────────────────────────────────────────────────────────────── */
let bhSeq = 0;
const mkNode = (key: number): BNode => ({ id: bhSeq++, key, children: [] });

const degreeOf = (n: BNode): number => n.children.length;

/* structural B_d, then BFS-assign ascending keys so the result is min-heap ordered */
function buildBinomial(degree: number, keysAsc: number[]): BNode {
  const shape = (d: number): BNode => {
    const n = mkNode(0);
    for (let j = d - 1; j >= 0; j--) n.children.push(shape(j));
    return n;
  };
  const root = shape(degree);
  const q: BNode[] = [root];
  let i = 0;
  while (q.length) {
    const n = q.shift()!;
    n.key = keysAsc[i++] ?? 0;
    for (const c of n.children) q.push(c);
  }
  return root;
}

/* link two equal-degree trees: the smaller root becomes the parent */
function linkTrees(a: BNode, b: BNode): BNode {
  if (a.key <= b.key) { a.children.unshift(b); return a; }
  b.children.unshift(a); return b;
}

/* union of two heaps (root lists, <=1 tree per degree).
 * Degrees are bucketed up front so the loop never re-scans a tree whose
 * degree changed mid-link — that would create a self-referential cycle. */
function unionForest(f1: BNode[], f2: BNode[]): BNode[] {
  const buckets = new Map<number, BNode[]>();
  for (const t of [...f1, ...f2]) {
    const d = degreeOf(t);
    if (!buckets.has(d)) buckets.set(d, []);
    buckets.get(d)!.push(t);
  }
  const result: BNode[] = [];
  let carry: BNode | null = null;
  const maxD = Math.max(0, ...Array.from(buckets.keys()));
  for (let d = 0; d <= maxD + 1; d++) {
    const here: BNode[] = (buckets.get(d) || []).slice();
    if (carry) { here.push(carry); carry = null; }
    if (here.length === 1) result.push(here[0]);
    else if (here.length === 2) carry = linkTrees(here[0], here[1]);
    else if (here.length >= 3) { result.push(here[0]); carry = linkTrees(here[1], here[2]); }
  }
  if (carry) result.push(carry);
  return result.sort((a, b) => degreeOf(a) - degreeOf(b));
}

function minRoot(roots: BNode[]): BNode | null {
  let m: BNode | null = null;
  for (const r of roots) if (!m || r.key < m.key) m = r;
  return m;
}

/* ── component ──────────────────────────────────────────────────────────── */
@Component({
  selector: 'app-unit6-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit6-lab.component.html',
  styleUrls: ['./unit6-lab.component.scss']
})
export class Unit6LabComponent implements OnChanges {
  @Input() artifact: U6Artifact | string = '';

  get artifactId(): U6Artifact | '' { return (this.artifact || '') as U6Artifact | ''; }

  ngOnChanges(): void {
    this.treeReset();
    this.anatomyReset();
    this.unionReset();
    this.opReset();
    this.reviewReset();
  }

  /* shared layout: position a forest of roots on a unit grid */
  private layoutForest(roots: BNode[]): Layout {
    const COLW = 42, ROWH = 50, PAD = 26;
    let leaf = 0, maxDepth = 0;
    const lx = new Map<number, number>();
    const place = (n: BNode, depth: number) => {
      maxDepth = Math.max(maxDepth, depth);
      if (n.children.length === 0) { lx.set(n.id, leaf); leaf += 1; }
      else {
        for (const c of n.children) place(c, depth + 1);
        const xs = n.children.map(c => lx.get(c.id)!);
        lx.set(n.id, (Math.min(...xs) + Math.max(...xs)) / 2);
      }
    };
    for (const r of roots) { place(r, 0); leaf += 0.7; }
    const nodes: LaidNode[] = [];
    const edges: LaidEdge[] = [];
    const walk = (n: BNode, depth: number, root: boolean) => {
      const x = PAD + lx.get(n.id)! * COLW + COLW / 2;
      const y = PAD + depth * ROWH;
      nodes.push({ id: n.id, key: n.key, x, y, depth, root });
      for (const c of n.children) {
        const cx = PAD + lx.get(c.id)! * COLW + COLW / 2;
        const cy = PAD + (depth + 1) * ROWH;
        edges.push({ x1: x, y1: y, x2: cx, y2: cy });
        walk(c, depth + 1, false);
      }
    };
    for (const r of roots) walk(r, 0, true);
    return {
      nodes, edges,
      w: PAD * 2 + Math.max(1, leaf) * COLW,
      h: PAD * 2 + maxDepth * ROWH
    };
  }

  /* =====================================================================
   * L1 — BINOMIAL TREE EXPLORER
   * =================================================================== */
  treeK = 3;
  treeShowSplit = false;
  private treeRoot!: BNode;

  treeReset(): void {
    this.treeK = 3;
    this.treeShowSplit = false;
    this.treeBuild();
  }
  private treeBuild(): void {
    const keys: number[] = [];
    for (let i = 1; i <= Math.pow(2, this.treeK); i++) keys.push(i);
    this.treeRoot = buildBinomial(this.treeK, keys);
  }
  setTreeK(k: number): void { this.treeK = k; this.treeBuild(); }

  get treeLayout(): Layout { return this.layoutForest([this.treeRoot]); }

  /* nodes of the leftmost-child subtree = the "linked" B_{k-1} */
  private treeLinkedIds(): Set<number> {
    const ids = new Set<number>();
    if (this.treeK >= 1 && this.treeRoot.children.length) {
      const collect = (n: BNode) => { ids.add(n.id); n.children.forEach(collect); };
      collect(this.treeRoot.children[0]);
    }
    return ids;
  }
  treeNodeHalf(id: number): 'linked' | 'original' {
    return this.treeShowSplit && this.treeLinkedIds().has(id) ? 'linked' : 'original';
  }

  get treeNodeCount(): number { return Math.pow(2, this.treeK); }
  get treeDepthRows(): { depth: number; count: number }[] {
    /* C(k, depth) nodes at each depth */
    const rows: { depth: number; count: number }[] = [];
    const choose = (n: number, r: number): number => {
      let c = 1;
      for (let i = 0; i < r; i++) c = (c * (n - i)) / (i + 1);
      return Math.round(c);
    };
    for (let d = 0; d <= this.treeK; d++) rows.push({ depth: d, count: choose(this.treeK, d) });
    return rows;
  }

  /* =====================================================================
   * L2 — BINOMIAL HEAP ANATOMY
   * =================================================================== */
  anatomyN = 13;
  private anatomyRoots: BNode[] = [];
  anatomyScanStep = -1;

  anatomyReset(): void {
    this.anatomyN = 13;
    this.anatomyScanStep = -1;
    this.anatomyBuild();
  }
  private anatomyBuild(): void {
    const pool = [27, 9, 41, 6, 18, 33, 12, 25, 8, 47, 15, 30, 21, 4, 38, 11,
      19, 36, 7, 44, 13, 28, 16, 39, 10, 23, 5, 42, 17, 31, 20];
    let cursor = 0;
    const roots: BNode[] = [];
    for (let k = 0; k < 5; k++) {
      if ((this.anatomyN >> k) & 1) {
        const cnt = Math.pow(2, k);
        const keys = pool.slice(cursor, cursor + cnt).sort((a, b) => a - b);
        cursor += cnt;
        roots.push(buildBinomial(k, keys));
      }
    }
    this.anatomyRoots = roots;
  }
  setAnatomyN(n: number): void {
    this.anatomyN = Math.min(31, Math.max(1, n));
    this.anatomyScanStep = -1;
    this.anatomyBuild();
  }

  get anatomyBinary(): string { return this.anatomyN.toString(2).padStart(5, '0'); }
  get anatomyBits(): { bit: number; set: boolean; degree: number }[] {
    const bin = this.anatomyBinary;
    return bin.split('').map((c, i) => ({ bit: i, set: c === '1', degree: bin.length - 1 - i }));
  }
  get anatomyRootList(): BNode[] { return this.anatomyRoots; }
  get anatomyLayout(): Layout { return this.layoutForest(this.anatomyRoots); }
  get anatomyTreeCount(): number { return this.anatomyRoots.length; }
  get anatomyMaxRoots(): number { return Math.floor(Math.log2(this.anatomyN)) + 1; }

  anatomyScanNext(): void {
    if (this.anatomyScanStep < this.anatomyRoots.length - 1) this.anatomyScanStep++;
  }
  anatomyScanReset(): void { this.anatomyScanStep = -1; }
  get anatomyScannedMin(): number | null {
    if (this.anatomyScanStep < 0) return null;
    let m = Infinity;
    for (let i = 0; i <= this.anatomyScanStep; i++) m = Math.min(m, this.anatomyRoots[i].key);
    return m;
  }
  get anatomyScanDone(): boolean { return this.anatomyScanStep >= this.anatomyRoots.length - 1; }
  anatomyRootActive(idx: number): boolean { return idx === this.anatomyScanStep; }
  anatomyRootScanned(idx: number): boolean { return idx <= this.anatomyScanStep; }

  /* =====================================================================
   * L3 — BINOMIAL HEAP UNION (binary addition view)
   * =================================================================== */
  readonly unionPseudocode = [
    'UNION(H1, H2)  // viewed as binary addition',
    '    carry = NIL',
    '    for d = 0, 1, 2, ...',
    '        trees = degree-d trees from H1, H2, carry',
    '        if trees has 2 or 3 of them',
    '            link two equal-degree trees',
    '            (smaller root becomes the parent)',
    '            carry = the linked degree-(d+1) tree',
    '        result keeps the leftover degree-d tree'
  ];

  /* fixed instructive example: 11 + 5 = 16 — a full carry cascade */
  readonly unionH1 = [
    { degree: 0, key: 18 }, { degree: 1, key: 7 }, { degree: 3, key: 3 }
  ];
  readonly unionH2 = [
    { degree: 0, key: 9 }, { degree: 2, key: 4 }
  ];
  unionFrames: {
    degree: number;
    inputs: { src: string; degree: number; key: number }[];
    carryIn: { degree: number; key: number } | null;
    action: 'keep' | 'link' | 'empty';
    line: number;
    result: { degree: number; key: number } | null;
    carryOut: { degree: number; key: number } | null;
    note: string;
  }[] = [];
  unionStep = 0;

  unionReset(): void {
    this.unionBuildFrames();
    this.unionStep = 0;
  }

  private unionBuildFrames(): void {
    const frames: typeof this.unionFrames = [];
    let carry: { degree: number; key: number } | null = null;
    for (let d = 0; d <= 4; d++) {
      const inputs: { src: string; degree: number; key: number }[] = [];
      const a = this.unionH1.find(t => t.degree === d);
      const b = this.unionH2.find(t => t.degree === d);
      if (a) inputs.push({ src: 'H1', degree: d, key: a.key });
      if (b) inputs.push({ src: 'H2', degree: d, key: b.key });
      const carryIn = carry && carry.degree === d ? carry : null;
      const all = [...inputs.map(i => ({ degree: i.degree, key: i.key }))];
      if (carryIn) all.push(carryIn);
      let result: { degree: number; key: number } | null = null;
      let carryOut: { degree: number; key: number } | null = null;
      let action: 'keep' | 'link' | 'empty' = 'empty';
      let note = '';
      if (all.length === 0) {
        action = 'empty';
        note = `Degree ${d}: no trees here. Result bit ${d} = 0, no carry.`;
      } else if (all.length === 1) {
        action = 'keep';
        result = all[0];
        note = `Degree ${d}: one tree (root ${all[0].key}). It passes straight through — result bit ${d} = 1.`;
      } else {
        action = 'link';
        const sorted = [...all].sort((x, y) => x.key - y.key);
        if (all.length === 3) result = sorted[2];
        const pair = all.length === 3 ? [sorted[0], sorted[1]] : [sorted[0], sorted[1]];
        const winner = pair[0].key <= pair[1].key ? pair[0] : pair[1];
        carryOut = { degree: d + 1, key: winner.key };
        note = all.length === 3
          ? `Degree ${d}: three trees. Keep one (root ${result!.key}); link the other two — root ${winner.key} wins — into a B${d + 1} carry.`
          : `Degree ${d}: two trees. Link them — smaller root ${winner.key} becomes the parent — producing a B${d + 1} carry. Result bit ${d} = 0.`;
      }
      frames.push({
        degree: d, inputs, carryIn, action,
        line: action === 'link' ? 5 : (action === 'keep' ? 8 : 3),
        result, carryOut, note
      });
      carry = carryOut;
    }
    if (carry) {
      frames.push({
        degree: carry.degree, inputs: [], carryIn: carry, action: 'keep', line: 8,
        result: carry, carryOut: null,
        note: `Degree ${carry.degree}: only the incoming carry (root ${carry.key}). It becomes the final tree — result bit ${carry.degree} = 1.`
      });
    }
    this.unionFrames = frames;
  }

  get unionFrame() { return this.unionFrames[this.unionStep]; }
  get unionDegree(): number { return this.unionFrame ? this.unionFrame.degree : -1; }
  get unionDone(): boolean { return this.unionStep >= this.unionFrames.length - 1; }
  get unionActiveLine(): number { return this.unionFrame ? this.unionFrame.line : -1; }
  unionNext(): void { if (!this.unionDone) this.unionStep++; }
  unionPrev(): void { if (this.unionStep > 0) this.unionStep--; }
  unionRun(): void { this.unionStep = this.unionFrames.length - 1; }
  unionRestart(): void { this.unionStep = 0; }

  /* committed result trees up to (not including) the current frame */
  get unionResultSoFar(): { degree: number; key: number }[] {
    const out: { degree: number; key: number }[] = [];
    for (let i = 0; i <= this.unionStep; i++) {
      const f = this.unionFrames[i];
      if (f && f.result) out.push(f.result);
    }
    return out;
  }
  get unionN1(): number { return this.unionH1.reduce((s, t) => s + Math.pow(2, t.degree), 0); }
  get unionN2(): number { return this.unionH2.reduce((s, t) => s + Math.pow(2, t.degree), 0); }

  unionBitClass(heap: { degree: number }[], d: number): boolean {
    return heap.some(t => t.degree === d);
  }

  /* =====================================================================
   * L4 — BINOMIAL HEAP OPERATIONS
   * =================================================================== */
  readonly opPseudocodes: Record<string, string[]> = {
    insert: [
      'INSERT(H, k)',
      '    H2 = single node with key k   (a B0 tree)',
      '    H = UNION(H, H2)'
    ],
    'extract-min': [
      'EXTRACT-MIN(H)',
      '    x = root with the minimum key',
      '    remove x from the root list',
      '    H2 = REVERSE(x.children)   // B0..B_{d-1}',
      '    H = UNION(H, H2)',
      '    return x'
    ],
    'decrease-key': [
      'DECREASE-KEY(H, x, k)',
      '    x.key = k',
      '    while x has a parent and x.key < parent.key',
      '        exchange x.key with parent.key',
      '        x = parent'
    ]
  };

  opRoots: BNode[] = [];
  opKey = 14;
  opMode: 'insert' | 'extract-min' | 'decrease-key' = 'insert';
  opMessage = '';
  opHighlight = new Set<number>();

  opReset(): void {
    const b0 = buildBinomial(0, [29]);
    const b1 = buildBinomial(1, [12, 26]);
    const b3 = buildBinomial(3, [3, 8, 15, 10, 22, 19, 35, 27]);
    this.opRoots = [b0, b1, b3];
    this.opKey = 14;
    this.opMode = 'insert';
    this.opMessage = 'A binomial heap of 11 nodes — trees B0, B1, B3 (11 = 1011 in binary). Run an operation.';
    this.opHighlight = new Set();
  }

  get opLayout(): Layout { return this.layoutForest(this.opRoots); }
  get opN(): number { return this.opRoots.reduce((s, r) => s + Math.pow(2, degreeOf(r)), 0); }
  get opTreeCount(): number { return this.opRoots.length; }
  get opMinKey(): number | null { const m = minRoot(this.opRoots); return m ? m.key : null; }

  private opAllNodes(): BNode[] {
    const out: BNode[] = [];
    const walk = (n: BNode) => { out.push(n); n.children.forEach(walk); };
    this.opRoots.forEach(walk);
    return out;
  }

  opInsert(): void {
    if (!Number.isInteger(this.opKey) || this.opKey < 0 || this.opKey > 99) return;
    this.opMode = 'insert';
    const fresh = buildBinomial(0, [this.opKey]);
    this.opRoots = unionForest(this.opRoots, [fresh]);
    this.opHighlight = new Set([fresh.id]);
    this.opMessage = `INSERT ${this.opKey}: a one-node B0 tree is created, then UNION merges it in — exactly like adding 1 to a binary counter. Equal-degree trees link and carry.`;
  }

  opExtractMin(): void {
    this.opMode = 'extract-min';
    const m = minRoot(this.opRoots);
    if (!m) { this.opMessage = 'The heap is empty.'; return; }
    const rest = this.opRoots.filter(r => r.id !== m.id);
    const childHeap = [...m.children].reverse(); // B0..B_{d-1}, ascending degree
    this.opRoots = unionForest(rest, childHeap);
    this.opHighlight = new Set(childHeap.map(c => c.id));
    this.opMessage = `EXTRACT-MIN: root ${m.key} was the minimum. Its ${m.children.length} child subtree(s) are reversed into a heap (B0..B${m.children.length - 1}) and UNION-ed back. Returned key: ${m.key}.`;
  }

  opDecreaseKey(): void {
    this.opMode = 'decrease-key';
    /* pick the deepest, largest-key node so the sift-up is visible */
    const nodes = this.opAllNodes().filter(n => true);
    let target: BNode | null = null;
    let bestDepthKey = -1;
    const depthOf = new Map<number, number>();
    const setDepth = (n: BNode, d: number) => { depthOf.set(n.id, d); n.children.forEach(c => setDepth(c, d + 1)); };
    this.opRoots.forEach(r => setDepth(r, 0));
    for (const n of nodes) {
      const d = depthOf.get(n.id)!;
      if (d >= 2 && n.key > bestDepthKey) { bestDepthKey = n.key; target = n; }
    }
    if (!target) { this.opMessage = 'No deep node available to decrease — try after an insert.'; return; }
    /* find root->target path */
    let path: BNode[] = [];
    const find = (n: BNode, trail: BNode[]): boolean => {
      const t = [...trail, n];
      if (n.id === target!.id) { path = t; return true; }
      return n.children.some(c => find(c, t));
    };
    this.opRoots.forEach(r => find(r, []));
    const min = this.opMinKey ?? 0;
    const newKey = Math.max(0, min - 1);
    const oldKey = target.key;
    /* sift up: bubble newKey toward the root by swapping keys */
    path[path.length - 1].key = newKey;
    for (let i = path.length - 1; i > 0; i--) {
      if (path[i].key < path[i - 1].key) {
        const tmp = path[i].key; path[i].key = path[i - 1].key; path[i - 1].key = tmp;
      } else break;
    }
    this.opHighlight = new Set(path.map(p => p.id));
    this.opMessage = `DECREASE-KEY: node ${oldKey} dropped to ${newKey}. Because a binomial tree is min-heap ordered, the new key sifts up its root path, swapping with each larger parent — O(log n) swaps.`;
  }

  opNodeState(id: number): string {
    return this.opHighlight.has(id) ? 'mark' : 'plain';
  }

  /* =====================================================================
   * L5 — BINOMIAL HEAP REVIEW: INSERT is a binary counter
   * =================================================================== */
  readonly reviewKeys = [42, 17, 8, 35, 23, 50, 14, 29, 6, 38, 11, 47, 20, 33, 3, 26];
  reviewRoots: BNode[] = [];
  reviewCount = 0;
  reviewLinks = 0;

  reviewReset(): void {
    this.reviewRoots = [];
    this.reviewCount = 0;
    this.reviewLinks = 0;
  }

  reviewInsert(): void {
    if (this.reviewCount >= this.reviewKeys.length) return;
    const before = this.countTrees(this.reviewRoots);
    const fresh = buildBinomial(0, [this.reviewKeys[this.reviewCount]]);
    const beforeNodes = this.reviewRoots.length;
    this.reviewRoots = unionForest(this.reviewRoots, [fresh]);
    /* links performed = trees lost from the root list (each link removes one) */
    const after = this.countTrees(this.reviewRoots);
    this.reviewLinks += Math.max(0, before + 1 - after);
    this.reviewCount++;
  }
  private countTrees(roots: BNode[]): number { return roots.length; }

  get reviewLayout(): Layout { return this.layoutForest(this.reviewRoots); }
  get reviewBinary(): string {
    return this.reviewCount === 0 ? '0' : this.reviewCount.toString(2);
  }
  get reviewTreeCount(): number { return this.reviewRoots.length; }
  get reviewAmortized(): string {
    return this.reviewCount === 0 ? '—' : (this.reviewLinks / this.reviewCount).toFixed(2);
  }
  get reviewDone(): boolean { return this.reviewCount >= this.reviewKeys.length; }

  readonly reviewComplexity = [
    { op: 'MAKE-HEAP', cost: 'Θ(1)', why: 'Just an empty root list.' },
    { op: 'MINIMUM', cost: 'O(log n)', why: 'Scan the O(log n) roots.' },
    { op: 'UNION', cost: 'O(log n)', why: 'Binary addition over O(log n) degrees.' },
    { op: 'INSERT', cost: 'O(log n) worst, O(1) amortized', why: 'A union with a B0 tree — like incrementing a counter.' },
    { op: 'EXTRACT-MIN', cost: 'O(log n)', why: 'Find min root, reverse children, union.' },
    { op: 'DECREASE-KEY', cost: 'O(log n)', why: 'Sift up a path of length ≤ height = O(log n).' },
    { op: 'DELETE', cost: 'O(log n)', why: 'Decrease-key to −∞, then extract-min.' }
  ];
}
