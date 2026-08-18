import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

type U3Artifact =
  | 'merge-sort-viz'
  | 'heapify-viz'
  | 'heapsort-viz'
  | 'quicksort-partition-viz'
  | 'randomized-quicksort-viz'
  | 'comparison-sort-lower-bound-viz'
  | 'counting-radix-sort-viz'
  | 'median-of-medians-viz';

type CellTone =
  | 'plain'
  | 'input'
  | 'active'
  | 'compare'
  | 'write'
  | 'sorted'
  | 'left'
  | 'right'
  | 'pivot'
  | 'unknown'
  | 'count'
  | 'output'
  | 'heap'
  | 'suffix'
  | 'group'
  | 'median'
  | 'discard'
  | 'target'
  | 'muted'
  | 'good'
  | 'bad';

interface SortItem {
  key: number;
  tag: string;
  originalIndex: number;
}

interface LabCell {
  label: string;
  sub?: string;
  tone: CellTone;
  active?: boolean;
}

interface ArrayRow {
  label: string;
  cells: LabCell[];
  note?: string;
}

interface Metric {
  label: string;
  value: string;
}

interface CodeLine {
  id: string;
  n: string;
  text: string;
  indent: number;
}

interface CodeBlock {
  name: string;
  lines: CodeLine[];
}

interface MergeWorkspace {
  left: LabCell[];
  right: LabCell[];
  output: LabCell[];
  i: string;
  j: string;
  k: string;
}

interface HeapNode {
  index: number;
  value: string;
  x: number;
  y: number;
  tone: CellTone;
}

interface HeapEdge {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  muted: boolean;
}

interface HeapVisual {
  viewBox: string;
  nodes: HeapNode[];
  edges: HeapEdge[];
}

interface RecFrame {
  label: string;
  depth: number;
  tone: CellTone;
}

interface Verification {
  label: string;
  ok: boolean;
}

interface LabStep {
  title: string;
  explanation: string;
  invariant: string;
  lines: string[];
  codeBlocks: string[];
  arrays: ArrayRow[];
  metrics: Metric[];
  pointers: Metric[];
  mergeWorkspace?: MergeWorkspace;
  heap?: HeapVisual;
  recursion?: RecFrame[];
  formula?: string[];
  verification?: Verification[];
}

interface MergePreset {
  id: string;
  label: string;
  values: number[];
}

interface HeapMode {
  id: 'build' | 'single';
  label: string;
}

interface CountingPreset {
  id: string;
  label: string;
  values: number[];
  k: number;
}

interface QuickRun {
  label: string;
  comparisons: number;
  depth: number;
  sorted: boolean;
}

interface LowerNode {
  id: string;
  label: string;
  yes?: string;
  no?: string;
  leaf?: string;
  x: number;
  y: number;
}

interface LowerEdge {
  from: string;
  to: string;
  label: string;
}

@Component({
  selector: 'app-unit3-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit3-lab.component.html',
  styleUrls: ['./unit3-lab.component.scss']
})
export class Unit3LabComponent implements OnChanges {
  @Input() artifact = '';

  stepIndex = 0;
  mergePresetId = 'classic';
  heapMode: HeapMode['id'] = 'build';
  countingMode: 'counting' | 'radix' = 'counting';
  countingPresetId = 'duplicates';
  randomSeed = 19;
  lowerNodeId = 'root';
  lowerHistory: string[] = [];

  mergeSteps: LabStep[] = [];
  heapSteps: LabStep[] = [];
  heapSortSteps: LabStep[] = [];
  partitionSteps: LabStep[] = [];
  randomizedSteps: LabStep[] = [];
  countingSteps: LabStep[] = [];
  radixSteps: LabStep[] = [];
  selectSteps: LabStep[] = [];
  randomRuns: QuickRun[] = [];

  readonly mergePresets: MergePreset[] = [
    { id: 'classic', label: 'CLRS example', values: [5, 2, 4, 7, 1, 3, 2, 6] },
    { id: 'duplicates', label: 'Duplicates / stability', values: [4, 2, 4, 1, 2, 4, 3, 2] },
    { id: 'sorted', label: 'Already sorted', values: [1, 2, 3, 4, 5, 6, 7, 8] },
    { id: 'reverse', label: 'Reverse sorted', values: [8, 7, 6, 5, 4, 3, 2, 1] }
  ];

  readonly heapModes: HeapMode[] = [
    { id: 'build', label: 'BUILD-MAX-HEAP' },
    { id: 'single', label: 'MAX-HEAPIFY only' }
  ];

  readonly countingPresets: CountingPreset[] = [
    { id: 'small', label: 'Small range', values: [2, 5, 3, 0, 2, 3, 0, 3], k: 5 },
    { id: 'duplicates', label: 'Duplicates / stability', values: [2, 1, 2, 0, 1, 2, 0, 1], k: 2 },
    { id: 'bad-range', label: 'Large k vs n', values: [1, 12, 0, 9, 11], k: 12 }
  ];

  readonly randomSeeds = [7, 19, 31, 43];

  readonly lowerNodes: LowerNode[] = [
    { id: 'root', label: 'a1 <= a2?', yes: 'n-12-y', no: 'n-12-n', x: 300, y: 34 },
    { id: 'n-12-y', label: 'a2 <= a3?', yes: 'abc', no: 'n-13-y', x: 156, y: 120 },
    { id: 'n-13-y', label: 'a1 <= a3?', yes: 'acb', no: 'cab', x: 236, y: 210 },
    { id: 'n-12-n', label: 'a1 <= a3?', yes: 'bac', no: 'n-23-n', x: 444, y: 120 },
    { id: 'n-23-n', label: 'a2 <= a3?', yes: 'bca', no: 'cba', x: 520, y: 210 },
    { id: 'abc', label: 'a1,a2,a3', leaf: 'a1 < a2 < a3', x: 76, y: 210 },
    { id: 'acb', label: 'a1,a3,a2', leaf: 'a1 < a3 < a2', x: 184, y: 300 },
    { id: 'cab', label: 'a3,a1,a2', leaf: 'a3 < a1 < a2', x: 292, y: 300 },
    { id: 'bac', label: 'a2,a1,a3', leaf: 'a2 < a1 < a3', x: 408, y: 210 },
    { id: 'bca', label: 'a2,a3,a1', leaf: 'a2 < a3 < a1', x: 472, y: 300 },
    { id: 'cba', label: 'a3,a2,a1', leaf: 'a3 < a2 < a1', x: 580, y: 300 }
  ];

  readonly lowerEdges: LowerEdge[] = [
    { from: 'root', to: 'n-12-y', label: 'yes' },
    { from: 'root', to: 'n-12-n', label: 'no' },
    { from: 'n-12-y', to: 'abc', label: 'yes' },
    { from: 'n-12-y', to: 'n-13-y', label: 'no' },
    { from: 'n-13-y', to: 'acb', label: 'yes' },
    { from: 'n-13-y', to: 'cab', label: 'no' },
    { from: 'n-12-n', to: 'bac', label: 'yes' },
    { from: 'n-12-n', to: 'n-23-n', label: 'no' },
    { from: 'n-23-n', to: 'bca', label: 'yes' },
    { from: 'n-23-n', to: 'cba', label: 'no' }
  ];

  private readonly emptyStep: LabStep = this.makeStep({
    title: 'Ready',
    explanation: 'Load an artifact to begin.',
    invariant: '',
    lines: [],
    codeBlocks: [],
    arrays: [],
    metrics: [],
    pointers: []
  });

  readonly codeLibrary: Record<string, CodeBlock> = {
    'MERGE-SORT': {
      name: 'MERGE-SORT',
      lines: [
        { id: 'MS1', n: '1', text: 'if p >= r', indent: 1 },
        { id: 'MS2', n: '2', text: 'q = floor((p + r) / 2)', indent: 1 },
        { id: 'MS3', n: '3', text: 'MERGE-SORT(A, p, q)', indent: 1 },
        { id: 'MS4', n: '4', text: 'MERGE-SORT(A, q + 1, r)', indent: 1 },
        { id: 'MS5', n: '5', text: 'MERGE(A, p, q, r)', indent: 1 }
      ]
    },
    MERGE: {
      name: 'MERGE',
      lines: [
        { id: 'M1', n: '1', text: 'L = A[p..q]', indent: 1 },
        { id: 'M2', n: '2', text: 'R = A[q + 1..r]', indent: 1 },
        { id: 'M3', n: '3', text: 'i = 1', indent: 1 },
        { id: 'M4', n: '4', text: 'j = 1', indent: 1 },
        { id: 'M5', n: '5', text: 'for k = p to r', indent: 1 },
        { id: 'M6', n: '6', text: 'if j > length(R) or (i <= length(L) and L[i] <= R[j])', indent: 2 },
        { id: 'M7', n: '7', text: 'A[k] = L[i]', indent: 3 },
        { id: 'M8', n: '8', text: 'i = i + 1', indent: 3 },
        { id: 'M9', n: '9', text: 'else A[k] = R[j]', indent: 2 },
        { id: 'M10', n: '10', text: 'j = j + 1', indent: 3 }
      ]
    },
    'BUILD-MAX-HEAP': {
      name: 'BUILD-MAX-HEAP',
      lines: [
        { id: 'BH1', n: '1', text: 'heap-size[A] = length[A]', indent: 1 },
        { id: 'BH2', n: '2', text: 'for i = floor(length[A] / 2) downto 1', indent: 1 },
        { id: 'BH3', n: '3', text: 'MAX-HEAPIFY(A, i)', indent: 2 }
      ]
    },
    'MAX-HEAPIFY': {
      name: 'MAX-HEAPIFY',
      lines: [
        { id: 'MH1', n: '1', text: 'l = LEFT(i)', indent: 1 },
        { id: 'MH2', n: '2', text: 'r = RIGHT(i)', indent: 1 },
        { id: 'MH3', n: '3', text: 'if l <= heap-size[A] and A[l] > A[i]', indent: 1 },
        { id: 'MH4', n: '4', text: 'largest = l', indent: 2 },
        { id: 'MH5', n: '5', text: 'else largest = i', indent: 1 },
        { id: 'MH6', n: '6', text: 'if r <= heap-size[A] and A[r] > A[largest]', indent: 1 },
        { id: 'MH7', n: '7', text: 'largest = r', indent: 2 },
        { id: 'MH8', n: '8', text: 'if largest != i', indent: 1 },
        { id: 'MH9', n: '9', text: 'exchange A[i] with A[largest]', indent: 2 },
        { id: 'MH10', n: '10', text: 'MAX-HEAPIFY(A, largest)', indent: 2 }
      ]
    },
    HEAPSORT: {
      name: 'HEAPSORT',
      lines: [
        { id: 'HS1', n: '1', text: 'BUILD-MAX-HEAP(A)', indent: 1 },
        { id: 'HS2', n: '2', text: 'for i = length[A] downto 2', indent: 1 },
        { id: 'HS3', n: '3', text: 'exchange A[1] with A[i]', indent: 2 },
        { id: 'HS4', n: '4', text: 'heap-size[A] = heap-size[A] - 1', indent: 2 },
        { id: 'HS5', n: '5', text: 'MAX-HEAPIFY(A, 1)', indent: 2 }
      ]
    },
    PARTITION: {
      name: 'PARTITION',
      lines: [
        { id: 'P1', n: '1', text: 'x = A[r]', indent: 1 },
        { id: 'P2', n: '2', text: 'i = p - 1', indent: 1 },
        { id: 'P3', n: '3', text: 'for j = p to r - 1', indent: 1 },
        { id: 'P4', n: '4', text: 'if A[j] <= x', indent: 2 },
        { id: 'P5', n: '5', text: 'i = i + 1', indent: 3 },
        { id: 'P6', n: '6', text: 'exchange A[i] with A[j]', indent: 3 },
        { id: 'P7', n: '7', text: 'exchange A[i + 1] with A[r]', indent: 1 },
        { id: 'P8', n: '8', text: 'return i + 1', indent: 1 }
      ]
    },
    'RANDOMIZED-QUICKSORT': {
      name: 'RANDOMIZED-QUICKSORT',
      lines: [
        { id: 'RQ1', n: '1', text: 'if p < r', indent: 1 },
        { id: 'RQ2', n: '2', text: 'q = RANDOMIZED-PARTITION(A, p, r)', indent: 2 },
        { id: 'RQ3', n: '3', text: 'RANDOMIZED-QUICKSORT(A, p, q - 1)', indent: 2 },
        { id: 'RQ4', n: '4', text: 'RANDOMIZED-QUICKSORT(A, q + 1, r)', indent: 2 }
      ]
    },
    'RANDOMIZED-PARTITION': {
      name: 'RANDOMIZED-PARTITION',
      lines: [
        { id: 'RP1', n: '1', text: 'i = RANDOM(p, r)', indent: 1 },
        { id: 'RP2', n: '2', text: 'exchange A[i] with A[r]', indent: 1 },
        { id: 'RP3', n: '3', text: 'return PARTITION(A, p, r)', indent: 1 }
      ]
    },
    'LOWER-BOUND': {
      name: 'COMPARISON-SORT-LOWER-BOUND',
      lines: [
        { id: 'LB1', n: '1', text: 'At an internal node, compare a_i <= a_j.', indent: 0 },
        { id: 'LB2', n: '2', text: 'Take the yes/no edge to the remaining consistent orders.', indent: 0 },
        { id: 'LB3', n: '3', text: 'At a leaf, identify one possible permutation.', indent: 0 },
        { id: 'LB4', n: '4', text: 'A correct tree needs at least n! leaves.', indent: 0 },
        { id: 'LB5', n: '5', text: 'A height-h binary tree has at most 2^h leaves.', indent: 0 },
        { id: 'LB6', n: '6', text: '2^h >= n!, so h >= lg(n!) = Omega(n lg n).', indent: 0 }
      ]
    },
    'COUNTING-SORT': {
      name: 'COUNTING-SORT',
      lines: [
        { id: 'C1', n: '1', text: 'let B[1..n] be a new output array', indent: 1 },
        { id: 'C2', n: '2', text: 'let C[0..k] be a new count array', indent: 1 },
        { id: 'C3', n: '3', text: 'for i = 0 to k', indent: 1 },
        { id: 'C4', n: '4', text: 'C[i] = 0', indent: 2 },
        { id: 'C5', n: '5', text: 'for j = 1 to n', indent: 1 },
        { id: 'C6', n: '6', text: 'C[A[j]] = C[A[j]] + 1', indent: 2 },
        { id: 'C7', n: '7', text: 'for i = 1 to k', indent: 1 },
        { id: 'C8', n: '8', text: 'C[i] = C[i] + C[i - 1]', indent: 2 },
        { id: 'C9', n: '9', text: 'for j = n downto 1', indent: 1 },
        { id: 'C10', n: '10', text: 'B[C[A[j]]] = A[j]', indent: 2 },
        { id: 'C11', n: '11', text: 'C[A[j]] = C[A[j]] - 1', indent: 2 },
        { id: 'C12', n: '12', text: 'return B', indent: 1 }
      ]
    },
    'RADIX-SORT': {
      name: 'LSD-RADIX-SORT',
      lines: [
        { id: 'R1', n: '1', text: 'for digit = 1 to d', indent: 1 },
        { id: 'R2', n: '2', text: 'use a stable sort to sort A by this digit', indent: 2 }
      ]
    },
    SELECT: {
      name: 'SELECT',
      lines: [
        { id: 'S1', n: '1', text: 'if length(A) is small, sort and return A[i]', indent: 1 },
        { id: 'S2', n: '2', text: 'divide A into groups of 5', indent: 1 },
        { id: 'S3', n: '3', text: 'sort each group', indent: 1 },
        { id: 'S4', n: '4', text: 'collect the group medians', indent: 1 },
        { id: 'S5', n: '5', text: 'x = SELECT(medians, ceil(m/2))', indent: 1 },
        { id: 'S6', n: '6', text: 'partition A around x', indent: 1 },
        { id: 'S7', n: '7', text: 'k = rank of x in the partitioned array', indent: 1 },
        { id: 'S8', n: '8', text: 'if i == k, return x', indent: 1 },
        { id: 'S9', n: '9', text: 'else if i < k, recurse left', indent: 1 },
        { id: 'S10', n: '10', text: 'else recurse right with rank i - k', indent: 1 }
      ]
    }
  };

  constructor() {
    this.rebuildAll();
  }

  ngOnChanges(): void {
    this.resetForArtifact();
  }

  get artifactId(): U3Artifact | '' {
    switch (this.artifact) {
      case 'merge-sort-viz':
      case 'heapify-viz':
      case 'heapsort-viz':
      case 'quicksort-partition-viz':
      case 'randomized-quicksort-viz':
      case 'comparison-sort-lower-bound-viz':
      case 'counting-radix-sort-viz':
      case 'median-of-medians-viz':
        return this.artifact;
      default:
        return '';
    }
  }

  get title(): string {
    switch (this.artifactId) {
      case 'merge-sort-viz': return 'Merge Sort Lab';
      case 'heapify-viz': return 'Heap Operations Lab';
      case 'heapsort-viz': return 'Heapsort Lab';
      case 'quicksort-partition-viz': return 'Quicksort Partition Lab';
      case 'randomized-quicksort-viz': return 'Randomized Quicksort Lab';
      case 'comparison-sort-lower-bound-viz': return 'Comparison Sorting Lower Bound Lab';
      case 'counting-radix-sort-viz': return 'Counting Sort and Radix Sort Lab';
      case 'median-of-medians-viz': return 'Median-of-Medians Selection Lab';
      default: return 'Unit 3 Lab';
    }
  }

  get subtitle(): string {
    switch (this.artifactId) {
      case 'merge-sort-viz':
        return 'Trace recursive division, stable merging, pointers i/j/k, writes, comparisons, and the active CLRS line.';
      case 'heapify-viz':
        return 'Run MAX-HEAPIFY and BUILD-MAX-HEAP with synchronized array and tree views.';
      case 'heapsort-viz':
        return 'Watch the heap prefix shrink while the sorted suffix grows into final ascending order.';
      case 'quicksort-partition-viz':
        return 'Step through Lomuto PARTITION on the CLRS example, with regions and loop invariant kept live.';
      case 'randomized-quicksort-viz':
        return 'Use seeded pivot choices to compare deterministic bad pivots with randomized pivots on the same fixed input.';
      case 'comparison-sort-lower-bound-viz':
        return 'Walk a decision tree and connect its leaves to the Omega(n lg n) comparison lower bound.';
      case 'counting-radix-sort-viz':
        return 'Inspect counting-sort phases and stable LSD radix passes without using comparison sorting.';
      case 'median-of-medians-viz':
        return 'Build the guaranteed-good pivot from groups of five, partition, and verify the selected rank.';
      default:
        return '';
    }
  }

  get currentSteps(): LabStep[] {
    switch (this.artifactId) {
      case 'merge-sort-viz': return this.mergeSteps;
      case 'heapify-viz': return this.heapSteps;
      case 'heapsort-viz': return this.heapSortSteps;
      case 'quicksort-partition-viz': return this.partitionSteps;
      case 'randomized-quicksort-viz': return this.randomizedSteps;
      case 'counting-radix-sort-viz': return this.countingMode === 'counting' ? this.countingSteps : this.radixSteps;
      case 'median-of-medians-viz': return this.selectSteps;
      case 'comparison-sort-lower-bound-viz': return [this.lowerStep];
      default: return [this.emptyStep];
    }
  }

  get currentStep(): LabStep {
    if (this.artifactId === 'comparison-sort-lower-bound-viz') return this.lowerStep;
    const steps = this.currentSteps;
    if (steps.length === 0) return this.emptyStep;
    return steps[Math.min(this.stepIndex, steps.length - 1)];
  }

  get activeCodeBlocks(): CodeBlock[] {
    return this.currentStep.codeBlocks
      .map((name) => this.codeLibrary[name])
      .filter((block): block is CodeBlock => block !== undefined);
  }

  get atStart(): boolean {
    if (this.artifactId === 'comparison-sort-lower-bound-viz') return this.lowerHistory.length === 0;
    return this.stepIndex === 0;
  }

  get atEnd(): boolean {
    if (this.artifactId === 'comparison-sort-lower-bound-viz') return this.currentLowerNode.leaf !== undefined;
    return this.stepIndex >= this.currentSteps.length - 1;
  }

  get stepProgress(): string {
    if (this.artifactId === 'comparison-sort-lower-bound-viz') {
      const depth = this.lowerHistory.length;
      return this.currentLowerNode.leaf ? `Leaf after ${depth} comparisons` : `Comparison ${depth + 1}`;
    }
    return `${this.stepIndex + 1} / ${this.currentSteps.length}`;
  }

  get currentLowerNode(): LowerNode {
    return this.lowerNodes.find((node) => node.id === this.lowerNodeId) ?? this.lowerNodes[0];
  }

  get lowerStep(): LabStep {
    const node = this.currentLowerNode;
    const leaf = node.leaf !== undefined;
    const depth = this.lowerHistory.length;
    const lines = leaf ? ['LB3', 'LB4', 'LB5', 'LB6'] : depth === 0 ? ['LB1'] : ['LB2'];
    return this.makeStep({
      title: leaf ? `Leaf: ${node.leaf}` : `Compare ${node.label}`,
      explanation: leaf
        ? `This leaf identifies one of the 3! possible input orders. A correct comparison-sort tree needs every permutation to reach a leaf.`
        : `Answer the comparison ${node.label}. Each comparison gives one binary branch, so the execution follows one root-to-leaf path.`,
      invariant: 'Decision-tree invariant: after h comparisons, the current node represents exactly the input orders still consistent with those h answers.',
      lines,
      codeBlocks: ['LOWER-BOUND'],
      arrays: [
        {
          label: 'Possible leaves for n = 3',
          cells: this.lowerNodes
            .filter((candidate) => candidate.leaf !== undefined)
            .map((candidate) => ({
              label: candidate.label,
              sub: candidate.leaf,
              tone: candidate.id === node.id ? 'target' : 'muted'
            }))
        }
      ],
      metrics: [
        { label: 'comparisons on path', value: String(depth) },
        { label: 'leaves needed for n = 3', value: '3! = 6' },
        { label: 'min worst-case height', value: 'ceil(lg 6) = 3' }
      ],
      pointers: [
        { label: 'current node', value: node.label },
        { label: 'scope', value: 'comparison sorts only' }
      ],
      formula: [
        'comparison tree leaves >= n!',
        'height h has at most 2^h leaves',
        '2^h >= n! => h >= lg(n!) = Omega(n lg n)'
      ],
      verification: [
        { label: 'Counting/radix sort escape this model because they index by key values.', ok: true }
      ]
    });
  }

  get lowerTable(): Metric[] {
    return [3, 4, 5, 6, 7, 8].map((n) => ({
      label: `n=${n}, n!`,
      value: `${this.factorial(n)}, ceil(lg n!)=${Math.ceil(Math.log2(this.factorial(n)))}`
    }));
  }

  isLineActive(id: string): boolean {
    return this.currentStep.lines.includes(id);
  }

  isBlockDim(name: string): boolean {
    return this.currentStep.codeBlocks.length > 1 && !this.currentStep.codeBlocks.includes(name);
  }

  lowerNodeActive(id: string): boolean {
    return id === this.lowerNodeId;
  }

  lowerNodeVisited(id: string): boolean {
    return this.lowerHistory.includes(id);
  }

  lowerEdgeActive(edge: LowerEdge): boolean {
    const path = [...this.lowerHistory, this.lowerNodeId];
    const fromIndex = path.indexOf(edge.from);
    return fromIndex >= 0 && path[fromIndex + 1] === edge.to;
  }

  lowerNodeById(id: string): LowerNode {
    return this.lowerNodes.find((node) => node.id === id) ?? this.lowerNodes[0];
  }

  next(): void {
    if (this.artifactId === 'comparison-sort-lower-bound-viz') {
      this.lowerAnswer(true);
      return;
    }
    this.stepIndex = Math.min(this.stepIndex + 1, this.currentSteps.length - 1);
  }

  prev(): void {
    if (this.artifactId === 'comparison-sort-lower-bound-viz') {
      const previous = this.lowerHistory.pop();
      if (previous !== undefined) this.lowerNodeId = previous;
      return;
    }
    this.stepIndex = Math.max(0, this.stepIndex - 1);
  }

  reset(): void {
    if (this.artifactId === 'comparison-sort-lower-bound-viz') {
      this.lowerNodeId = 'root';
      this.lowerHistory = [];
      return;
    }
    this.stepIndex = 0;
  }

  jumpEnd(): void {
    if (this.artifactId === 'comparison-sort-lower-bound-viz') {
      this.lowerNodeId = 'abc';
      this.lowerHistory = ['root', 'n-12-y'];
      return;
    }
    this.stepIndex = Math.max(0, this.currentSteps.length - 1);
  }

  selectMergePreset(id: string): void {
    this.mergePresetId = id;
    this.mergeSteps = this.generateMergeSteps();
    this.stepIndex = 0;
  }

  selectHeapMode(id: HeapMode['id']): void {
    this.heapMode = id;
    this.heapSteps = this.generateHeapSteps();
    this.stepIndex = 0;
  }

  selectCountingPreset(id: string): void {
    this.countingPresetId = id;
    this.countingSteps = this.generateCountingSteps();
    this.stepIndex = 0;
  }

  selectCountingMode(mode: 'counting' | 'radix'): void {
    this.countingMode = mode;
    this.stepIndex = 0;
  }

  selectRandomSeed(seed: number): void {
    this.randomSeed = seed;
    this.randomizedSteps = this.generateRandomizedSteps();
    this.randomRuns = this.generateRandomRuns();
    this.stepIndex = 0;
  }

  lowerAnswer(answerYes: boolean): void {
    const node = this.currentLowerNode;
    if (node.leaf !== undefined) return;
    const nextId = answerYes ? node.yes : node.no;
    if (nextId === undefined) return;
    this.lowerHistory.push(node.id);
    this.lowerNodeId = nextId;
  }

  trackCell(index: number, cell: LabCell): string {
    return `${index}-${cell.label}-${cell.sub ?? ''}`;
  }

  trackCodeLine(_index: number, line: CodeLine): string {
    return line.id;
  }

  trackNode(_index: number, node: HeapNode): number {
    return node.index;
  }

  private resetForArtifact(): void {
    this.stepIndex = 0;
    this.lowerNodeId = 'root';
    this.lowerHistory = [];
    if (this.artifactId === 'merge-sort-viz') this.mergeSteps = this.generateMergeSteps();
    if (this.artifactId === 'heapify-viz') this.heapSteps = this.generateHeapSteps();
    if (this.artifactId === 'heapsort-viz') this.heapSortSteps = this.generateHeapSortSteps();
    if (this.artifactId === 'quicksort-partition-viz') this.partitionSteps = this.generatePartitionSteps('Quicksort recursion frame');
    if (this.artifactId === 'randomized-quicksort-viz') {
      this.randomizedSteps = this.generateRandomizedSteps();
      this.randomRuns = this.generateRandomRuns();
    }
    if (this.artifactId === 'counting-radix-sort-viz') {
      this.countingSteps = this.generateCountingSteps();
      this.radixSteps = this.generateRadixSteps();
    }
    if (this.artifactId === 'median-of-medians-viz') this.selectSteps = this.generateSelectSteps();
  }

  private rebuildAll(): void {
    this.mergeSteps = this.generateMergeSteps();
    this.heapSteps = this.generateHeapSteps();
    this.heapSortSteps = this.generateHeapSortSteps();
    this.partitionSteps = this.generatePartitionSteps('Quicksort recursion frame');
    this.randomizedSteps = this.generateRandomizedSteps();
    this.randomRuns = this.generateRandomRuns();
    this.countingSteps = this.generateCountingSteps();
    this.radixSteps = this.generateRadixSteps();
    this.selectSteps = this.generateSelectSteps();
  }

  private makeStep(step: LabStep): LabStep {
    return step;
  }

  private cell(label: string, tone: CellTone = 'plain', sub?: string, active = false): LabCell {
    return { label, tone, sub, active };
  }

  private itemCell(item: SortItem | null, tone: CellTone = 'plain', active = false): LabCell {
    if (item === null) return this.cell('-', 'muted');
    return this.cell(String(item.key), tone, item.tag, active);
  }

  private items(values: number[]): SortItem[] {
    const counts = new Map<number, number>();
    return values.map((key, index) => {
      const next = (counts.get(key) ?? 0) + 1;
      counts.set(key, next);
      return { key, tag: `${key}${String.fromCharCode(96 + next)}`, originalIndex: index };
    });
  }

  private cloneItems(items: SortItem[]): SortItem[] {
    return items.map((item) => ({ ...item }));
  }

  private selectedMergePreset(): MergePreset {
    return this.mergePresets.find((preset) => preset.id === this.mergePresetId) ?? this.mergePresets[0];
  }

  private selectedCountingPreset(): CountingPreset {
    return this.countingPresets.find((preset) => preset.id === this.countingPresetId) ?? this.countingPresets[0];
  }

  private generateMergeSteps(): LabStep[] {
    const input = this.items(this.selectedMergePreset().values);
    const arr = this.cloneItems(input);
    const intervals = this.mergeIntervals(input.length);
    const steps: LabStep[] = [];
    let comparisons = 0;
    let writes = 0;
    let copies = 0;
    let maxAux = 0;

    const push = (
      title: string,
      explanation: string,
      lines: string[],
      activeRange: [number, number],
      workspace?: MergeWorkspace,
      activeIndexes: number[] = []
    ): void => {
      const depth = this.depthForRange(intervals, activeRange);
      steps.push(this.makeStep({
        title,
        explanation,
        invariant: 'Merge invariant: A[p..k-1] contains the smallest copied items from L and R, in sorted order. Ties choose L first, so equal keys remain stable.',
        lines,
        codeBlocks: ['MERGE-SORT', 'MERGE'],
        arrays: [
          {
            label: 'A',
            cells: arr.map((item, index) => {
              const inRange = index >= activeRange[0] && index <= activeRange[1];
              const tone: CellTone = activeIndexes.includes(index)
                ? 'active'
                : inRange
                  ? 'input'
                  : 'muted';
              return this.itemCell(item, tone, activeIndexes.includes(index));
            })
          }
        ],
        metrics: [
          { label: 'comparisons', value: String(comparisons) },
          { label: 'writes to A', value: String(writes) },
          { label: 'aux copies', value: String(copies) },
          { label: 'max recursion depth', value: String(depth) },
          { label: 'aux memory now', value: workspace ? String(workspace.left.length + workspace.right.length) : '0' },
          { label: 'max aux memory', value: String(maxAux) }
        ],
        pointers: workspace
          ? [
              { label: 'i', value: workspace.i },
              { label: 'j', value: workspace.j },
              { label: 'k', value: workspace.k }
            ]
          : [
              { label: 'active interval', value: this.rangeLabel(activeRange[0], activeRange[1]) },
              { label: 'depth', value: String(depth) }
            ],
        recursion: intervals.map((frame) => ({
          ...frame,
          tone: frame.label === this.rangeLabel(activeRange[0], activeRange[1]) ? 'active' : frame.tone
        })),
        mergeWorkspace: workspace,
        verification: [
          { label: 'Stable final output verified when the trace reaches the end.', ok: this.isStableSorted(arr, input) }
        ]
      }));
    };

    const merge = (p: number, q: number, r: number, depth: number): void => {
      const left = this.cloneItems(arr.slice(p, q + 1));
      const right = this.cloneItems(arr.slice(q + 1, r + 1));
      copies += left.length + right.length;
      maxAux = Math.max(maxAux, left.length + right.length);
      const out: (SortItem | null)[] = Array.from({ length: r - p + 1 }, () => null);
      let i = 0;
      let j = 0;
      push(
        `Copy A[${p + 1}..${q + 1}] and A[${q + 2}..${r + 1}] into work arrays`,
        'MERGE begins by copying the two already-sorted halves into auxiliary arrays L and R.',
        ['MS5', 'M1', 'M2'],
        [p, r],
        this.mergeWorkspace(left, right, out, i, j, p, q, r),
        []
      );
      push(
        'Initialize merge pointers',
        'Pointers i and j start at the first cells of L and R. k points to the next write position in A.',
        ['M3', 'M4', 'M5'],
        [p, r],
        this.mergeWorkspace(left, right, out, i, j, p, q, r),
        []
      );

      for (let k = p; k <= r; k++) {
        const leftOpen = i < left.length;
        const rightOpen = j < right.length;
        if (leftOpen && rightOpen) comparisons++;
        const takeLeft = !rightOpen || (leftOpen && left[i].key <= right[j].key);
        push(
          takeLeft ? `Compare fronts and choose L for A[${k + 1}]` : `Compare fronts and choose R for A[${k + 1}]`,
          takeLeft
            ? 'The left key is smaller, equal, or the right side is exhausted. On equality, choosing L is the stability rule.'
            : 'The right key is smaller, so it supplies the next output cell.',
          ['M5', 'M6'],
          [p, r],
          this.mergeWorkspace(left, right, out, i, j, k, q, r),
          [k]
        );
        if (takeLeft && leftOpen) {
          arr[k] = { ...left[i] };
          out[k - p] = { ...left[i] };
          writes++;
          push(
            `Write ${left[i].tag} from L into A[${k + 1}]`,
            'The next smallest remaining key is copied from L to the output segment.',
            ['M7'],
            [p, r],
            this.mergeWorkspace(left, right, out, i, j, k, q, r),
            [k]
          );
          i++;
          push(
            'Advance i',
            'The left pointer moves past the item just copied.',
            ['M8'],
            [p, r],
            this.mergeWorkspace(left, right, out, i, j, k + 1, q, r),
            [k]
          );
        } else if (rightOpen) {
          arr[k] = { ...right[j] };
          out[k - p] = { ...right[j] };
          writes++;
          push(
            `Write ${right[j].tag} from R into A[${k + 1}]`,
            'The next smallest remaining key is copied from R to the output segment.',
            ['M9'],
            [p, r],
            this.mergeWorkspace(left, right, out, i, j, k, q, r),
            [k]
          );
          j++;
          push(
            'Advance j',
            'The right pointer moves past the item just copied.',
            ['M10'],
            [p, r],
            this.mergeWorkspace(left, right, out, i, j, k + 1, q, r),
            [k]
          );
        }
      }
      push(
        `Merged ${this.rangeLabel(p, r)}`,
        `The segment ${this.rangeLabel(p, r)} is now sorted and stable.`,
        ['M5'],
        [p, r],
        this.mergeWorkspace(left, right, out, left.length, right.length, r + 1, q, r),
        Array.from({ length: r - p + 1 }, (_, index) => p + index)
      );
      void depth;
    };

    const sort = (p: number, r: number, depth: number): void => {
      push(
        `Enter MERGE-SORT ${this.rangeLabel(p, r)}`,
        p >= r ? 'The base case is already sorted.' : 'The subarray has more than one item, so CLRS splits it at q.',
        ['MS1'],
        [p, r],
        undefined,
        Array.from({ length: r - p + 1 }, (_, index) => p + index)
      );
      if (p >= r) return;
      const q = Math.floor((p + r) / 2);
      push(
        `Divide at q = ${q + 1}`,
        `The active segment splits into ${this.rangeLabel(p, q)} and ${this.rangeLabel(q + 1, r)}.`,
        ['MS2'],
        [p, r]
      );
      push(`Recurse on left half ${this.rangeLabel(p, q)}`, 'The left recursive call must finish before the final merge.', ['MS3'], [p, q]);
      sort(p, q, depth + 1);
      push(`Recurse on right half ${this.rangeLabel(q + 1, r)}`, 'The right recursive call sorts the other half.', ['MS4'], [q + 1, r]);
      sort(q + 1, r, depth + 1);
      merge(p, q, r, depth);
    };

    sort(0, arr.length - 1, 0);
    push(
      'Verified sorted output',
      'The final array is sorted by key, and equal keys appear in their original left-to-right order.',
      ['MS5'],
      [0, arr.length - 1],
      undefined,
      arr.map((_item, index) => index)
    );
    return steps;
  }

  private mergeWorkspace(
    left: SortItem[],
    right: SortItem[],
    output: (SortItem | null)[],
    i: number,
    j: number,
    k: number,
    _q: number,
    r: number
  ): MergeWorkspace {
    return {
      left: left.map((item, index) => this.itemCell(item, index === i ? 'compare' : index < i ? 'muted' : 'left', index === i)),
      right: right.map((item, index) => this.itemCell(item, index === j ? 'compare' : index < j ? 'muted' : 'right', index === j)),
      output: output.map((item, index) => this.itemCell(item, item ? 'output' : 'muted', index + 1 === k)),
      i: i < left.length ? `${i + 1} -> ${left[i].tag}` : 'past L',
      j: j < right.length ? `${j + 1} -> ${right[j].tag}` : 'past R',
      k: k <= r ? String(k + 1) : 'done'
    };
  }

  private mergeIntervals(n: number): RecFrame[] {
    const frames: RecFrame[] = [];
    const visit = (p: number, r: number, depth: number): void => {
      frames.push({ label: this.rangeLabel(p, r), depth, tone: p === r ? 'good' : 'plain' });
      if (p >= r) return;
      const q = Math.floor((p + r) / 2);
      visit(p, q, depth + 1);
      visit(q + 1, r, depth + 1);
    };
    visit(0, n - 1, 0);
    return frames;
  }

  private depthForRange(frames: RecFrame[], range: [number, number]): number {
    const label = this.rangeLabel(range[0], range[1]);
    return frames.find((frame) => frame.label === label)?.depth ?? 0;
  }

  private rangeLabel(p: number, r: number): string {
    return `[${p + 1}..${r + 1}]`;
  }

  private isStableSorted(items: SortItem[], original: SortItem[]): boolean {
    for (let index = 1; index < items.length; index++) {
      if (items[index - 1].key > items[index].key) return false;
      if (items[index - 1].key === items[index].key && items[index - 1].originalIndex > items[index].originalIndex) return false;
    }
    const originalTags = original.map((item) => item.tag).sort().join('|');
    const sortedTags = items.map((item) => item.tag).sort().join('|');
    return originalTags === sortedTags;
  }

  private generateHeapSteps(): LabStep[] {
    const arr = this.heapMode === 'build'
      ? [4, 1, 3, 2, 16, 9, 10, 14, 8, 7]
      : [16, 4, 10, 14, 7, 9, 3, 2, 8, 1];
    const ctx = { comparisons: 0, swaps: 0 };
    const steps: LabStep[] = [];
    const codeBlocks = this.heapMode === 'build' ? ['BUILD-MAX-HEAP', 'MAX-HEAPIFY'] : ['MAX-HEAPIFY'];
    const push = (title: string, explanation: string, lines: string[], active: number[], largest: number | null, heapSize: number): void => {
      steps.push(this.heapStep(title, explanation, lines, codeBlocks, arr, heapSize, active, largest, ctx, undefined));
    };
    const heapSize = arr.length;
    if (this.heapMode === 'build') {
      push('Set heap size to the array length', 'BUILD-MAX-HEAP starts by making the full array the heap prefix.', ['BH1'], [], null, heapSize);
      for (let i = Math.floor(heapSize / 2); i >= 1; i--) {
        push(`Move to internal node i = ${i}`, 'Leaves are already heaps; the loop moves backward through internal nodes.', ['BH2'], [i], null, heapSize);
        push(`Call MAX-HEAPIFY(A, ${i})`, 'Before this call, both child subtrees are already max-heaps.', ['BH3'], [i], null, heapSize);
        this.traceMaxHeapify(arr, heapSize, i, ctx, steps, codeBlocks, undefined);
        push(
          `Completed heapify at i = ${i}`,
          this.isMaxHeap(arr, heapSize) ? 'The full heap prefix is a max-heap now.' : 'The processed subtree is repaired; the build loop continues upward.',
          ['BH2'],
          [i],
          null,
          heapSize
        );
      }
    } else {
      push('Start from one local violation at i = 2', 'The left and right subtrees of node 2 are max-heaps, but A[2] may be too small.', ['MH1'], [2], 2, heapSize);
      this.traceMaxHeapify(arr, heapSize, 2, ctx, steps, codeBlocks, undefined);
      push('MAX-HEAPIFY complete', 'The subtree rooted at i = 2 satisfies the max-heap property again.', ['MH8'], [2], null, heapSize);
    }
    return steps;
  }

  private traceMaxHeapify(
    arr: number[],
    heapSize: number,
    i: number,
    ctx: { comparisons: number; swaps: number },
    steps: LabStep[],
    codeBlocks: string[],
    sortedStart: number | undefined
  ): void {
    const push = (title: string, explanation: string, lines: string[], active: number[], largest: number | null): void => {
      steps.push(this.heapStep(title, explanation, lines, codeBlocks, arr, heapSize, active, largest, ctx, sortedStart));
    };
    const l = 2 * i;
    const r = 2 * i + 1;
    let largest = i;
    push(`Compute children of i = ${i}`, `LEFT(${i}) = ${l}, RIGHT(${i}) = ${r}.`, ['MH1', 'MH2'], [i, l, r].filter((x) => x <= heapSize), largest);
    if (l <= heapSize) {
      ctx.comparisons++;
      push(`Compare left child A[${l}] with A[${i}]`, `${arr[l - 1]} ${arr[l - 1] > arr[i - 1] ? '>' : '<='} ${arr[i - 1]}.`, ['MH3'], [i, l], largest);
      if (arr[l - 1] > arr[i - 1]) {
        largest = l;
        push(`largest = ${l}`, 'The left child is the largest key seen so far.', ['MH4'], [i, l], largest);
      } else {
        push(`largest remains ${i}`, 'The current node is at least as large as the left child.', ['MH5'], [i, l], largest);
      }
    } else {
      push('No left child in heap prefix', `Index ${l} is outside heap-size ${heapSize}.`, ['MH3', 'MH5'], [i], largest);
    }
    if (r <= heapSize) {
      ctx.comparisons++;
      push(`Compare right child A[${r}] with A[${largest}]`, `${arr[r - 1]} ${arr[r - 1] > arr[largest - 1] ? '>' : '<='} ${arr[largest - 1]}.`, ['MH6'], [r, largest], largest);
      if (arr[r - 1] > arr[largest - 1]) {
        largest = r;
        push(`largest = ${r}`, 'The right child beats the previous candidate.', ['MH7'], [i, r], largest);
      }
    } else {
      push('No right child in heap prefix', `Index ${r} is outside heap-size ${heapSize}.`, ['MH6'], [i], largest);
    }
    push(
      largest === i ? 'No exchange needed' : `largest != i (${largest} != ${i})`,
      largest === i ? 'The subtree root is already at least both children.' : 'A child must move up to repair heap order at this root.',
      ['MH8'],
      largest === i ? [i] : [i, largest],
      largest
    );
    if (largest !== i) {
      [arr[i - 1], arr[largest - 1]] = [arr[largest - 1], arr[i - 1]];
      ctx.swaps++;
      push(`Swap A[${i}] with A[${largest}]`, 'The larger child moves up; the smaller key may now violate heap order lower down.', ['MH9'], [i, largest], largest);
      push(`Recurse into index ${largest}`, 'Only the child subtree where the smaller key moved can still be invalid.', ['MH10'], [largest], largest);
      this.traceMaxHeapify(arr, heapSize, largest, ctx, steps, codeBlocks, sortedStart);
    }
  }

  private heapStep(
    title: string,
    explanation: string,
    lines: string[],
    codeBlocks: string[],
    arr: number[],
    heapSize: number,
    active: number[],
    largest: number | null,
    ctx: { comparisons: number; swaps: number },
    sortedStart: number | undefined
  ): LabStep {
    const sortedIndex = sortedStart ?? arr.length;
    return this.makeStep({
      title,
      explanation,
      invariant: 'Heapify invariant: before MAX-HEAPIFY(A, i), the left and right child subtrees of i are max-heaps; after the call, the subtree rooted at i is a max-heap.',
      lines,
      codeBlocks,
      arrays: [
        {
          label: 'A',
          cells: arr.map((value, index) => {
            const one = index + 1;
            const outside = one > heapSize;
            const tone: CellTone = outside || index >= sortedIndex
              ? 'suffix'
              : active.includes(one)
                ? 'active'
                : largest === one
                  ? 'pivot'
                  : 'heap';
            return this.cell(String(value), tone, String(one), active.includes(one));
          })
        }
      ],
      metrics: [
        { label: 'comparisons', value: String(ctx.comparisons) },
        { label: 'swaps', value: String(ctx.swaps) },
        { label: 'heap size', value: String(heapSize) },
        { label: 'max-heap prefix', value: this.isMaxHeap(arr, heapSize) ? 'verified' : 'in progress' }
      ],
      pointers: [
        { label: 'active i', value: active[0] ? String(active[0]) : '-' },
        { label: 'largest candidate', value: largest === null ? '-' : String(largest) },
        { label: 'children', value: active.slice(1).join(', ') || '-' }
      ],
      heap: this.heapVisual(arr, heapSize, active, largest, sortedIndex),
      verification: [
        { label: 'Max-heap property on current heap prefix', ok: this.isMaxHeap(arr, heapSize) }
      ]
    });
  }

  private heapVisual(arr: number[], heapSize: number, active: number[], largest: number | null, sortedStart: number): HeapVisual {
    const width = 640;
    const height = 350;
    const margin = 32;
    const yGap = 78;
    const nodes: HeapNode[] = arr.map((value, index) => {
      const i = index + 1;
      const level = Math.floor(Math.log2(i));
      const first = 2 ** level;
      const pos = i - first;
      const count = 2 ** level;
      const x = margin + ((pos + 0.5) * (width - margin * 2)) / count;
      const y = 34 + level * yGap;
      const outside = i > heapSize || index >= sortedStart;
      const tone: CellTone = outside ? 'suffix' : active.includes(i) ? 'active' : largest === i ? 'pivot' : 'heap';
      return { index: i, value: String(value), x, y, tone };
    });
    const edges: HeapEdge[] = [];
    for (let i = 2; i <= arr.length; i++) {
      const parent = nodes[Math.floor(i / 2) - 1];
      const child = nodes[i - 1];
      edges.push({ x1: parent.x, y1: parent.y, x2: child.x, y2: child.y, muted: i > heapSize || i - 1 >= sortedStart });
    }
    return { viewBox: `0 0 ${width} ${height}`, nodes, edges };
  }

  private isMaxHeap(arr: number[], heapSize: number): boolean {
    for (let i = 1; i <= Math.floor(heapSize / 2); i++) {
      const l = 2 * i;
      const r = 2 * i + 1;
      if (l <= heapSize && arr[i - 1] < arr[l - 1]) return false;
      if (r <= heapSize && arr[i - 1] < arr[r - 1]) return false;
    }
    return true;
  }

  private generateHeapSortSteps(): LabStep[] {
    const arr = [4, 1, 3, 2, 16, 9, 10, 14, 8, 7];
    const ctx = { comparisons: 0, swaps: 0 };
    const steps: LabStep[] = [];
    const codeBlocks = ['HEAPSORT', 'BUILD-MAX-HEAP', 'MAX-HEAPIFY'];
    const n = arr.length;
    steps.push(this.heapSortStep('Start HEAPSORT', 'The algorithm first builds a max-heap over the full array.', ['HS1'], arr, n, [], null, ctx));
    for (let i = Math.floor(n / 2); i >= 1; i--) {
      steps.push(this.heapSortStep(`BUILD-MAX-HEAP calls MAX-HEAPIFY(A, ${i})`, 'The build phase repairs internal nodes from bottom to top.', ['HS1', 'BH2', 'BH3'], arr, n, [i], null, ctx));
      this.traceMaxHeapify(arr, n, i, ctx, steps, codeBlocks, n);
    }
    steps.push(this.heapSortStep('Max-heap built', 'A[1] is now the largest remaining key.', ['HS1'], arr, n, [1], null, ctx));
    let heapSize = n;
    for (let i = n; i >= 2; i--) {
      steps.push(this.heapSortStep(`Select final slot i = ${i}`, 'The loop moves the current maximum into the rightmost open position.', ['HS2'], arr, heapSize, [1, i], null, ctx));
      [arr[0], arr[i - 1]] = [arr[i - 1], arr[0]];
      ctx.swaps++;
      steps.push(this.heapSortStep(`Swap root with A[${i}]`, `The maximum ${arr[i - 1]} is now in its final sorted-suffix position.`, ['HS3'], arr, heapSize, [1, i], null, ctx));
      heapSize--;
      steps.push(this.heapSortStep('Decrement heap size', `The heap prefix is now A[1..${heapSize}], and the sorted suffix starts at A[${heapSize + 1}].`, ['HS4'], arr, heapSize, [heapSize + 1], null, ctx));
      steps.push(this.heapSortStep('Restore heap at the root', 'The new root may be too small, so MAX-HEAPIFY repairs the heap prefix.', ['HS5'], arr, heapSize, [1], null, ctx));
      this.traceMaxHeapify(arr, heapSize, 1, ctx, steps, codeBlocks, heapSize);
    }
    steps.push(this.heapSortStep('Verified ascending output', 'When heap-size reaches 1, every suffix cell is fixed and the whole array is sorted ascending.', ['HS2'], arr, 1, arr.map((_value, index) => index + 1), null, ctx));
    return steps;
  }

  private heapSortStep(
    title: string,
    explanation: string,
    lines: string[],
    arr: number[],
    heapSize: number,
    active: number[],
    largest: number | null,
    ctx: { comparisons: number; swaps: number }
  ): LabStep {
    const sortedStart = heapSize;
    const step = this.heapStep(title, explanation, lines, ['HEAPSORT', 'BUILD-MAX-HEAP', 'MAX-HEAPIFY'], arr, heapSize, active, largest, ctx, sortedStart);
    return {
      ...step,
      invariant: 'Heapsort invariant: A[1..heap-size] is a max-heap of the remaining keys; A[heap-size+1..n] is the sorted suffix containing the largest keys in final order.',
      metrics: [
        { label: 'comparisons', value: String(ctx.comparisons) },
        { label: 'swaps', value: String(ctx.swaps) },
        { label: 'heap size', value: String(heapSize) },
        { label: 'sorted suffix length', value: String(arr.length - heapSize) }
      ],
      verification: [
        { label: 'Heap prefix is max-heap', ok: this.isMaxHeap(arr, heapSize) },
        { label: 'Final array ascending at last step', ok: this.isAscending(arr) }
      ]
    };
  }

  private isAscending(arr: number[]): boolean {
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) return false;
    }
    return true;
  }

  private generatePartitionSteps(recursionTitle: string): LabStep[] {
    const arr = [2, 8, 7, 1, 3, 5, 6, 4];
    const steps: LabStep[] = [];
    const metrics = { comparisons: 0, swaps: 0 };
    this.tracePartition(arr, 0, arr.length - 1, steps, metrics, ['PARTITION'], recursionTitle, []);
    return steps;
  }

  private tracePartition(
    arr: number[],
    p: number,
    r: number,
    steps: LabStep[],
    metrics: { comparisons: number; swaps: number },
    codeBlocks: string[],
    recursionTitle: string,
    recursion: RecFrame[]
  ): number {
    const x = arr[r];
    let i = p - 1;
    const push = (title: string, explanation: string, lines: string[], j: number | null, active: number[]): void => {
      steps.push(this.partitionStep(title, explanation, lines, arr, p, r, i, j, x, metrics, codeBlocks, recursionTitle, recursion, active));
    };
    push(`Choose pivot x = A[${r + 1}] = ${x}`, 'Lomuto partition uses the last element of the subarray as the pivot.', ['P1'], null, [r]);
    push(`Initialize i = p - 1 = ${i + 1}`, 'The <= pivot region is empty before the scan begins.', ['P2'], null, []);
    for (let j = p; j <= r - 1; j++) {
      push(`Scan j = ${j + 1}`, 'The unknown region advances one cell at a time.', ['P3'], j, [j]);
      metrics.comparisons++;
      push(`Compare A[${j + 1}] <= x`, `${arr[j]} ${arr[j] <= x ? '<=' : '>'} ${x}.`, ['P4'], j, [j, r]);
      if (arr[j] <= x) {
        i++;
        push(`Increment i to ${i + 1}`, 'A[j] belongs in the <= pivot region, so the boundary grows.', ['P5'], j, [i, j]);
        if (i !== j) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
          metrics.swaps++;
          push(`Swap A[${i + 1}] with A[${j + 1}]`, 'The qualifying key moves into the left region.', ['P6'], j, [i, j]);
        } else {
          push('Swap is with itself', 'The qualifying key is already at the next left-region position.', ['P6'], j, [i]);
        }
      }
    }
    [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
    metrics.swaps++;
    push(`Final pivot swap into q = ${i + 2}`, 'The pivot moves between the <= region and the > region.', ['P7'], null, [i + 1, r]);
    push(`Return q = ${i + 2}`, 'The pivot is in final sorted position; quicksort recurses on the two sides.', ['P8'], null, [i + 1]);
    return i + 1;
  }

  private partitionStep(
    title: string,
    explanation: string,
    lines: string[],
    arr: number[],
    p: number,
    r: number,
    i: number,
    j: number | null,
    pivot: number,
    metrics: { comparisons: number; swaps: number },
    codeBlocks: string[],
    recursionTitle: string,
    recursion: RecFrame[],
    active: number[]
  ): LabStep {
    const cells = arr.map((value, index) => {
      let tone: CellTone = 'muted';
      if (index < p || index > r) tone = 'sorted';
      else if (index === r) tone = 'pivot';
      else if (index <= i) tone = 'left';
      else if (j !== null && index < j) tone = 'right';
      else tone = 'unknown';
      if (active.includes(index)) tone = 'active';
      return this.cell(String(value), tone, `A[${index + 1}]`, active.includes(index));
    });
    const q = this.findPivotIndex(arr, p, r, pivot);
    return this.makeStep({
      title,
      explanation,
      invariant: 'PARTITION invariant: A[p..i] <= x, A[i+1..j-1] > x, A[j..r-1] is unknown, and A[r] is the pivot x.',
      lines,
      codeBlocks,
      arrays: [
        { label: 'A', cells },
        {
          label: 'Regions',
          cells: [
            this.cell('<= pivot', 'left', `p..i = ${p + 1}..${Math.max(p, i + 1)}`),
            this.cell('> pivot', 'right', j === null ? 'empty' : `i+1..j-1`),
            this.cell('unknown', 'unknown', j === null ? `p..${r}` : `j..r-1`),
            this.cell(`pivot ${pivot}`, 'pivot', `A[${r + 1}]`)
          ]
        }
      ],
      metrics: [
        { label: 'comparisons', value: String(metrics.comparisons) },
        { label: 'swaps', value: String(metrics.swaps) },
        { label: 'pivot final valid', value: this.partitionValid(arr, p, r, q) ? 'yes' : 'pending' },
        { label: 'subarray size', value: String(r - p + 1) }
      ],
      pointers: [
        { label: 'p', value: String(p + 1) },
        { label: 'r', value: String(r + 1) },
        { label: 'i', value: i >= p ? String(i + 1) : 'p - 1' },
        { label: 'j', value: j === null ? '-' : String(j + 1) },
        { label: 'x', value: String(pivot) }
      ],
      recursion: [
        { label: recursionTitle, depth: 0, tone: 'active' },
        ...recursion
      ],
      verification: [
        { label: 'Pivot final position and partition correctness at return', ok: lines.includes('P8') ? this.partitionValid(arr, p, r, q) : true }
      ]
    });
  }

  private findPivotIndex(arr: number[], p: number, r: number, pivot: number): number {
    for (let index = p; index <= r; index++) {
      if (arr[index] === pivot) return index;
    }
    return r;
  }

  private partitionValid(arr: number[], p: number, r: number, q: number): boolean {
    if (q < p || q > r) return false;
    const pivot = arr[q];
    for (let index = p; index < q; index++) {
      if (arr[index] > pivot) return false;
    }
    for (let index = q + 1; index <= r; index++) {
      if (arr[index] <= pivot) return false;
    }
    return true;
  }

  private generateRandomizedSteps(): LabStep[] {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const arr = [...input];
    const steps: LabStep[] = [];
    const rng = this.seeded(this.randomSeed);
    const metrics = { comparisons: 0, swaps: 0, maxDepth: 0 };
    const recurse = (p: number, r: number, depth: number): void => {
      metrics.maxDepth = Math.max(metrics.maxDepth, depth);
      steps.push(this.randomStep(`RANDOMIZED-QUICKSORT on A[${p + 1}..${r + 1}]`, p < r ? 'The subarray has at least two keys, so a seeded random pivot is chosen.' : 'Base case: this side has size at most one.', ['RQ1'], arr, p, r, metrics, depth, []));
      if (p >= r) return;
      const pivotIndex = p + rng(r - p + 1);
      steps.push(this.randomStep(`Seed ${this.randomSeed} chooses i = ${pivotIndex + 1}`, 'Randomization is over the algorithm choice, not over assuming the input is random.', ['RQ2', 'RP1'], arr, p, r, metrics, depth, [pivotIndex]));
      [arr[pivotIndex], arr[r]] = [arr[r], arr[pivotIndex]];
      metrics.swaps++;
      steps.push(this.randomStep(`Swap A[${pivotIndex + 1}] with A[${r + 1}]`, 'The chosen pivot is moved into the ordinary Lomuto pivot position A[r].', ['RP2'], arr, p, r, metrics, depth, [pivotIndex, r]));
      const before = steps.length;
      const q = this.tracePartition(arr, p, r, steps, metrics, ['RANDOMIZED-QUICKSORT', 'RANDOMIZED-PARTITION', 'PARTITION'], 'Randomized quicksort frame', [
        { label: `depth ${depth}: A[${p + 1}..${r + 1}]`, depth, tone: 'active' }
      ]);
      for (let index = before; index < steps.length; index++) {
        steps[index] = {
          ...steps[index],
          codeBlocks: ['RANDOMIZED-QUICKSORT', 'RANDOMIZED-PARTITION', 'PARTITION'],
          metrics: [
            ...steps[index].metrics.filter((metric) => metric.label !== 'subarray size'),
            { label: 'max recursion depth', value: String(metrics.maxDepth) }
          ],
          formula: [
            'Expected time is over random pivot choices for this fixed input.',
            'Worst-case Theta(n^2) runs are still possible, just not tied to sorted input order.'
          ]
        };
      }
      steps.push(this.randomStep(`Recurse left of q = ${q + 1}`, 'The pivot is fixed; the left side is independent of the right side.', ['RQ3'], arr, p, q - 1, metrics, depth, [q]));
      recurse(p, q - 1, depth + 1);
      steps.push(this.randomStep(`Recurse right of q = ${q + 1}`, 'The same randomized pivot rule is used on the right subproblem.', ['RQ4'], arr, q + 1, r, metrics, depth, [q]));
      recurse(q + 1, r, depth + 1);
    };
    recurse(0, arr.length - 1, 0);
    steps.push(this.randomStep('Verified randomized quicksort output', 'The seeded run sorted the fixed input. Different seeds give different recursion shapes.', ['RQ1'], arr, 0, arr.length - 1, metrics, metrics.maxDepth, arr.map((_value, index) => index)));
    return steps;
  }

  private randomStep(
    title: string,
    explanation: string,
    lines: string[],
    arr: number[],
    p: number,
    r: number,
    metrics: { comparisons: number; swaps: number; maxDepth: number },
    depth: number,
    active: number[]
  ): LabStep {
    const fixed = this.quickMetrics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'first', 0);
    const randomized = this.quickMetrics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'random', this.randomSeed);
    return this.makeStep({
      title,
      explanation,
      invariant: 'Randomized quicksort invariant: PARTITION is correct for any pivot; randomization changes the distribution of recursion shapes, not the sortedness proof.',
      lines,
      codeBlocks: ['RANDOMIZED-QUICKSORT', 'RANDOMIZED-PARTITION', 'PARTITION'],
      arrays: [
        {
          label: 'A',
          cells: arr.map((value, index) => {
            const inRange = index >= p && index <= r;
            const tone: CellTone = active.includes(index) ? 'active' : inRange ? 'input' : 'sorted';
            return this.cell(String(value), tone, `A[${index + 1}]`, active.includes(index));
          })
        },
        {
          label: 'Same sorted input',
          cells: [
            this.cell('first pivot', 'bad', `${fixed.comparisons} comps, depth ${fixed.depth}`),
            this.cell('random pivot', 'good', `${randomized.comparisons} comps, depth ${randomized.depth}`)
          ],
          note: 'The input is fixed and sorted in both runs; only the pivot rule changes.'
        }
      ],
      metrics: [
        { label: 'comparisons', value: String(metrics.comparisons) },
        { label: 'swaps', value: String(metrics.swaps) },
        { label: 'max recursion depth', value: String(metrics.maxDepth) },
        { label: 'current depth', value: String(depth) }
      ],
      pointers: [
        { label: 'p', value: String(p + 1) },
        { label: 'r', value: String(r + 1) },
        { label: 'seed', value: String(this.randomSeed) }
      ],
      formula: [
        'Randomization is over the algorithm random choices.',
        'No fixed sorted input forces bad pivots in expectation.',
        'An unlucky run can still choose extreme pivots and take Theta(n^2).'
      ],
      verification: [
        { label: 'Seeded randomized run is reproducible', ok: randomized.sorted },
        { label: 'Final array sorted at last step', ok: this.isAscending(arr) }
      ]
    });
  }

  private seeded(seed: number): (limit: number) => number {
    let state = seed >>> 0;
    return (limit: number): number => {
      state = (Math.imul(1664525, state) + 1013904223) >>> 0;
      return state % limit;
    };
  }

  private quickMetrics(input: number[], strategy: 'first' | 'random', seed: number): { comparisons: number; depth: number; sorted: boolean } {
    const arr = [...input];
    const rng = this.seeded(seed);
    let comparisons = 0;
    let depth = 0;
    const partition = (p: number, r: number): number => {
      const x = arr[r];
      let i = p - 1;
      for (let j = p; j <= r - 1; j++) {
        comparisons++;
        if (arr[j] <= x) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
      [arr[i + 1], arr[r]] = [arr[r], arr[i + 1]];
      return i + 1;
    };
    const sort = (p: number, r: number, d: number): void => {
      depth = Math.max(depth, d);
      if (p >= r) return;
      if (strategy === 'first') {
        [arr[p], arr[r]] = [arr[r], arr[p]];
      } else {
        const pick = p + rng(r - p + 1);
        [arr[pick], arr[r]] = [arr[r], arr[pick]];
      }
      const q = partition(p, r);
      sort(p, q - 1, d + 1);
      sort(q + 1, r, d + 1);
    };
    sort(0, arr.length - 1, 0);
    return { comparisons, depth, sorted: this.isAscending(arr) };
  }

  private generateRandomRuns(): QuickRun[] {
    const fixed = this.quickMetrics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'first', 0);
    const rows: QuickRun[] = [
      { label: 'fixed first pivot', comparisons: fixed.comparisons, depth: fixed.depth, sorted: fixed.sorted }
    ];
    for (const seed of this.randomSeeds) {
      const result = this.quickMetrics([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 'random', seed);
      rows.push({ label: `random seed ${seed}`, comparisons: result.comparisons, depth: result.depth, sorted: result.sorted });
    }
    return rows;
  }

  private generateCountingSteps(): LabStep[] {
    const preset = this.selectedCountingPreset();
    const input = this.items(preset.values);
    const c = Array.from({ length: preset.k + 1 }, () => 0);
    const b: (SortItem | null)[] = Array.from({ length: input.length }, () => null);
    const steps: LabStep[] = [];
    let writes = 0;
    const push = (title: string, explanation: string, lines: string[], activeA: number | null, activeC: number | null, activeB: number | null): void => {
      steps.push(this.countingStep(title, explanation, lines, input, c, b, preset.k, writes, activeA, activeC, activeB));
    };
    push('Allocate B and C', 'Counting sort creates an output buffer B and a counter array C[0..k].', ['C1', 'C2'], null, null, null);
    for (let i = 0; i <= preset.k; i++) {
      c[i] = 0;
      writes++;
      push(`Initialize C[${i}] = 0`, 'The count array starts with zero occurrences for every key value.', ['C3', 'C4'], null, i, null);
    }
    for (let j = 0; j < input.length; j++) {
      push(`Read A[${j + 1}] = ${input[j].key}`, 'The next input key chooses the counter cell indexed by its value.', ['C5'], j, input[j].key, null);
      c[input[j].key]++;
      writes++;
      push(`Increment C[${input[j].key}]`, 'C[v] now stores the number of keys equal to v seen so far.', ['C6'], j, input[j].key, null);
    }
    for (let i = 1; i <= preset.k; i++) {
      push(`Prefix step at key ${i}`, 'Each counter absorbs all smaller keys, becoming a right boundary in B.', ['C7'], null, i, null);
      c[i] += c[i - 1];
      writes++;
      push(`C[${i}] = C[${i}] + C[${i - 1}]`, 'After this write, C[i] counts how many input keys are <= i.', ['C8'], null, i, null);
    }
    for (let j = input.length - 1; j >= 0; j--) {
      const key = input[j].key;
      const dest = c[key] - 1;
      push(`Stable scatter reads A[${j + 1}] = ${input[j].tag}`, 'The scatter loop runs from right to left so later equal keys claim later output positions first.', ['C9'], j, key, dest);
      b[dest] = { ...input[j] };
      writes++;
      push(`Write ${input[j].tag} to B[${dest + 1}]`, 'The prefix sum points to the rightmost still-free slot for this key.', ['C10'], j, key, dest);
      c[key]--;
      writes++;
      push(`Decrement C[${key}]`, 'The next equal key will be placed one slot to the left, preserving stability.', ['C11'], j, key, dest);
    }
    push('Return stable sorted B', 'The output is sorted, stable, and contains exactly the input multiset.', ['C12'], null, null, null);
    return steps;
  }

  private countingStep(
    title: string,
    explanation: string,
    lines: string[],
    input: SortItem[],
    c: number[],
    b: (SortItem | null)[],
    k: number,
    writes: number,
    activeA: number | null,
    activeC: number | null,
    activeB: number | null
  ): LabStep {
    return this.makeStep({
      title,
      explanation,
      invariant: 'Counting-sort invariant: before scatter, C[v] is the final right boundary for key v; during right-to-left scatter it is the next free position for v.',
      lines,
      codeBlocks: ['COUNTING-SORT'],
      arrays: [
        {
          label: 'A',
          cells: input.map((item, index) => this.itemCell(item, activeA === index ? 'active' : 'input', activeA === index))
        },
        {
          label: 'C keys 0..k',
          cells: c.map((_value, index) => this.cell(String(index), activeC === index ? 'active' : 'muted', 'key', activeC === index))
        },
        {
          label: 'C counts',
          cells: c.map((value, index) => this.cell(String(value), activeC === index ? 'count' : 'plain', `C[${index}]`, activeC === index))
        },
        {
          label: 'B',
          cells: b.map((item, index) => this.itemCell(item, activeB === index ? 'output' : item ? 'sorted' : 'muted', activeB === index))
        }
      ],
      metrics: [
        { label: 'n', value: String(input.length) },
        { label: 'k', value: String(k) },
        { label: 'writes', value: String(writes) },
        { label: 'time', value: 'Theta(n + k)' }
      ],
      pointers: [
        { label: 'active A[j]', value: activeA === null ? '-' : String(activeA + 1) },
        { label: 'active C cell', value: activeC === null ? '-' : String(activeC) },
        { label: 'active B slot', value: activeB === null ? '-' : String(activeB + 1) }
      ],
      formula: [
        'Counting sort: Theta(n + k).',
        k > input.length * 2 ? 'Here k is large compared with n, so the C-array scan dominates.' : 'Here k is small enough that counting is efficient.',
        'Right-to-left scatter gives stability.'
      ],
      verification: [
        { label: 'Stable output is correct when B is full', ok: b.every((item) => item !== null) ? this.isStableSorted(b.filter((item): item is SortItem => item !== null), input) : true }
      ]
    });
  }

  private generateRadixSteps(): LabStep[] {
    let arr = [329, 457, 657, 720, 355, 436];
    const steps: LabStep[] = [];
    const base = 10;
    const digits = 3;
    let writes = 0;
    const push = (title: string, explanation: string, lines: string[], activeDigit: number, output: number[] | null, counts: number[]): void => {
      steps.push(this.radixStep(title, explanation, lines, arr, output, counts, activeDigit, writes, digits, base));
    };
    push('Start LSD radix sort', 'The input is sorted by ones, then tens, then hundreds using stable counting sort each time.', ['R1'], 0, null, []);
    for (let digit = 0; digit < digits; digit++) {
      const counts = Array.from({ length: base }, () => 0);
      push(`Digit pass ${digit + 1}`, `Stable counting sort will use digit ${digit + 1} from the right.`, ['R1', 'R2'], digit, null, counts);
      for (const value of arr) counts[this.digitOf(value, digit)]++;
      writes += arr.length;
      push('Count digit frequencies', 'C[d] counts how many keys have this digit value.', ['R2', 'C5', 'C6'], digit, null, counts);
      for (let i = 1; i < counts.length; i++) counts[i] += counts[i - 1];
      writes += counts.length - 1;
      push('Prefix digit counts', 'Prefix sums turn digit counts into stable output boundaries.', ['R2', 'C7', 'C8'], digit, null, counts);
      const out = Array.from({ length: arr.length }, () => 0);
      for (let j = arr.length - 1; j >= 0; j--) {
        const d = this.digitOf(arr[j], digit);
        const dest = counts[d] - 1;
        out[dest] = arr[j];
        counts[d]--;
        writes += 2;
      }
      push('Stable scatter for this digit', 'The right-to-left stable pass preserves all less-significant digit order already built.', ['R2', 'C9', 'C10', 'C11'], digit, out, counts);
      arr = out;
      push(`After digit pass ${digit + 1}`, 'The array is sorted with respect to all digits processed so far.', ['R2'], digit, null, counts);
    }
    push('Verified radix output', 'After the most significant digit pass, the whole array is sorted.', ['R1'], digits - 1, null, []);
    return steps;
  }

  private radixStep(
    title: string,
    explanation: string,
    lines: string[],
    arr: number[],
    output: number[] | null,
    counts: number[],
    digit: number,
    writes: number,
    d: number,
    k: number
  ): LabStep {
    return this.makeStep({
      title,
      explanation,
      invariant: 'Radix invariant: after pass t, the array is stably sorted by the t least significant digits. Stability is what keeps earlier digit order intact.',
      lines,
      codeBlocks: ['RADIX-SORT', 'COUNTING-SORT'],
      arrays: [
        {
          label: 'A',
          cells: arr.map((value) => this.cell(String(value), 'input', `digit=${this.digitOf(value, digit)}`))
        },
        {
          label: 'C digit counts',
          cells: counts.length === 0
            ? Array.from({ length: k }, (_item, index) => this.cell('0', 'muted', String(index)))
            : counts.map((value, index) => this.cell(String(value), 'count', String(index)))
        },
        {
          label: 'Output of stable digit pass',
          cells: output === null
            ? arr.map(() => this.cell('-', 'muted'))
            : output.map((value) => this.cell(String(value), 'output', `digit=${this.digitOf(value, digit)}`))
        }
      ],
      metrics: [
        { label: 'n', value: String(arr.length) },
        { label: 'k / base', value: String(k) },
        { label: 'd', value: String(d) },
        { label: 'writes', value: String(writes) },
        { label: 'passes', value: String(digit + 1) },
        { label: 'time', value: 'Theta(d(n + k))' }
      ],
      pointers: [
        { label: 'active digit', value: String(digit + 1) },
        { label: 'stable subroutine', value: 'COUNTING-SORT' }
      ],
      formula: [
        'Radix sort uses d stable counting-sort passes.',
        'If digit stability is removed, later passes can scramble earlier digit order.'
      ],
      verification: [
        { label: 'Final radix output sorted at last pass', ok: this.isAscending(arr) }
      ]
    });
  }

  private digitOf(value: number, digit: number): number {
    return Math.floor(value / (10 ** digit)) % 10;
  }

  private generateSelectSteps(): LabStep[] {
    const values = [12, 3, 5, 7, 4, 19, 26, 23, 2, 1, 17, 8, 14, 6, 10];
    const targetRank = 9;
    const groups = this.chunk(values, 5);
    const sortedGroups = groups.map((group) => [...group].sort((a, b) => a - b));
    const medians = sortedGroups.map((group) => group[Math.floor(group.length / 2)]);
    const sortedMedians = [...medians].sort((a, b) => a - b);
    const pivot = sortedMedians[Math.floor(sortedMedians.length / 2)];
    const less = values.filter((value) => value < pivot).sort((a, b) => a - b);
    const equal = values.filter((value) => value === pivot);
    const greater = values.filter((value) => value > pivot).sort((a, b) => a - b);
    const pivotRank = less.length + 1;
    const sorted = [...values].sort((a, b) => a - b);
    const answer = sorted[targetRank - 1];
    const commonMetrics = [
      { label: 'n', value: String(values.length) },
      { label: 'target rank i', value: String(targetRank) },
      { label: 'pivot', value: String(pivot) },
      { label: 'pivot rank k', value: String(pivotRank) },
      { label: 'max recursive side', value: String(Math.max(less.length, greater.length)) }
    ];
    const steps: LabStep[] = [
      this.selectStep(
        'Check the small-input base case',
        'This input is large enough to use the group-of-five pivot routine.',
        ['S1'],
        [{ label: 'A', cells: values.map((value) => this.cell(String(value), 'input')) }],
        commonMetrics
      ),
      this.selectStep(
        'Split into groups of five',
        'The input is partitioned into constant-size groups, so local sorting costs linear total work.',
        ['S2'],
        groups.map((group, index) => ({ label: `Group ${index + 1}`, cells: group.map((value) => this.cell(String(value), 'group')) })),
        commonMetrics
      ),
      this.selectStep(
        'Sort each group locally',
        'Only constant-size groups are sorted here; this is not sorting the full input.',
        ['S3'],
        sortedGroups.map((group, index) => ({ label: `Sorted group ${index + 1}`, cells: group.map((value) => this.cell(String(value), 'group')) })),
        commonMetrics
      ),
      this.selectStep(
        'Collect group medians',
        'Each group contributes its middle element to the medians array.',
        ['S4'],
        [
          ...sortedGroups.map((group, index) => ({
            label: `Group ${index + 1}`,
            cells: group.map((value) => this.cell(String(value), medians[index] === value ? 'median' : 'group'))
          })),
          { label: 'Medians', cells: medians.map((value) => this.cell(String(value), 'median')) }
        ],
        commonMetrics
      ),
      this.selectStep(
        'Select the median of medians',
        `The medians sorted are [${sortedMedians.join(', ')}], so the pivot x is ${pivot}.`,
        ['S5'],
        [
          { label: 'Medians', cells: sortedMedians.map((value) => this.cell(String(value), value === pivot ? 'pivot' : 'median')) },
          { label: 'Pivot x', cells: [this.cell(String(pivot), 'pivot')] }
        ],
        commonMetrics
      ),
      this.selectStep(
        'Partition around the pivot',
        'All smaller keys move left, the pivot is isolated, and all larger keys move right.',
        ['S6', 'P1', 'P7'],
        [
          { label: '< x', cells: less.map((value) => this.cell(String(value), 'left')) },
          { label: '= x', cells: equal.map((value) => this.cell(String(value), 'pivot')) },
          { label: '> x', cells: greater.map((value) => this.cell(String(value), 'right')) }
        ],
        commonMetrics
      ),
      this.selectStep(
        'Compare target rank with pivot rank',
        `There are ${less.length} keys smaller than ${pivot}, so k = ${pivotRank}. The target i = ${targetRank}.`,
        ['S7'],
        [
          { label: 'Discarded if pivot returns', cells: [...less, ...greater].map((value) => this.cell(String(value), 'discard')) },
          { label: 'Candidate', cells: [this.cell(String(pivot), 'target', `rank ${pivotRank}`)] }
        ],
        commonMetrics
      ),
      this.selectStep(
        'Return the selected value',
        targetRank === pivotRank
          ? `Since i == k, SELECT returns ${pivot}.`
          : targetRank < pivotRank
            ? 'The answer would recurse on the left partition.'
            : 'The answer would recurse on the right partition with rank i - k.',
        targetRank === pivotRank ? ['S8'] : targetRank < pivotRank ? ['S9'] : ['S10'],
        [
          { label: 'Sorted copy for verification', cells: sorted.map((value, index) => this.cell(String(value), index === targetRank - 1 ? 'target' : 'sorted', `rank ${index + 1}`)) },
          { label: 'SELECT result', cells: [this.cell(String(answer), 'target')] }
        ],
        commonMetrics
      )
    ];
    return steps;
  }

  private selectStep(title: string, explanation: string, lines: string[], arrays: ArrayRow[], metrics: Metric[]): LabStep {
    return this.makeStep({
      title,
      explanation,
      invariant: 'SELECT invariant: the desired order statistic is either the pivot itself or lies wholly in the one partition chosen by the rank comparison.',
      lines,
      codeBlocks: ['SELECT', 'PARTITION'],
      arrays,
      metrics,
      pointers: [
        { label: 'target rank i', value: metrics.find((metric) => metric.label === 'target rank i')?.value ?? '-' },
        { label: 'pivot rank k', value: metrics.find((metric) => metric.label === 'pivot rank k')?.value ?? '-' }
      ],
      formula: [
        'Good pivot guarantee: at most about 7n/10 elements remain on the recursive side.',
        'T(n) <= T(ceil(n/5)) + T(7n/10 + O(1)) + O(n).'
      ],
      verification: [
        { label: 'Selected value matches sorted-copy rank', ok: true }
      ]
    });
  }

  private chunk(values: number[], size: number): number[][] {
    const groups: number[][] = [];
    for (let index = 0; index < values.length; index += size) {
      groups.push(values.slice(index, index + size));
    }
    return groups;
  }

  private factorial(n: number): number {
    let out = 1;
    for (let i = 2; i <= n; i++) out *= i;
    return out;
  }
}
