import { Component, Input, OnChanges, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface U3ArrayRow {
  label: string;
  values: number[];
  role?: 'input' | 'split' | 'sorted' | 'merge' | 'pivot' | 'left' | 'right' | 'unknown' | 'count' | 'output' | 'group' | 'median' | 'discard' | 'target' | 'root' | 'path' | 'found' | 'candidate';
}

interface U3ArrayStage {
  label: string;
  note: string;
  rows?: U3ArrayRow[];
  arr?: number[];
  heapSize?: number;
  focusIndex?: number;
  sortedStart?: number;
}

interface LazyArtifactView {
  component: Type<unknown>;
  inputs: Record<string, unknown>;
}

@Component({
  selector: 'app-algo-ds-artifacts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './algo-ds-artifacts.component.html',
  styleUrls: ['./algo-ds-artifacts.component.scss']
})
export class AlgoDsArtifactsComponent implements OnChanges {
  @Input() artifact = '';
  lazyArtifact: LazyArtifactView | null = null;
  loadingLazyArtifact = false;
  private lazyArtifactToken = 0;

  private readonly unit1Artifacts = new Set([
    'algo-classifier',
    'ram-cost-counter',
    'insertion-sort-viz',
    'loop-invariant-builder',
    'growth-rate-explorer',
    'case-analysis-sim',
    'sweep-line-viz',
    'complexity-match',
    'inversion-counter',
    'proof-error-finder'
  ]);

  private readonly unit2Artifacts = new Set([
    'iteration-unroller-lab',
    'substitution-proof-lab',
    'variable-transform-lab',
    'recurrence-method-review',
    'recursion-tree-builder',
    'master-theorem-calc'
  ]);

  private readonly unit3Artifacts = new Set([
    'merge-sort-viz',
    'heapify-viz',
    'heapsort-viz',
    'quicksort-partition-viz',
    'randomized-quicksort-viz',
    'comparison-sort-lower-bound-viz',
    'counting-radix-sort-viz',
    'median-of-medians-viz'
  ]);

  private readonly unit5Artifacts = new Set([
    'hash-direct-address',
    'hash-chaining',
    'hash-function-explorer',
    'hash-universal',
    'hash-linear-probing',
    'hash-quadratic-probing',
    'hash-double-hashing'
  ]);

  private readonly unit6Artifacts = new Set([
    'binomial-tree-explorer',
    'binomial-heap-anatomy',
    'binomial-heap-union',
    'binomial-heap-operations',
    'binomial-heap-review'
  ]);

  private readonly unit7Artifacts = new Set([
    'amortized-bank',
    'multipop-stack',
    'binary-counter-amortized',
    'potential-method'
  ]);

  // ── Unit 2: Recursion-tree builder (L2) ────────────────────────────────
  // Unit 3: Merge sort / heap visualizers
  readonly mergeStages: U3ArrayStage[] = [
    {
      label: '1. Start',
      note: 'The input is unsorted. Merge sort splits by position first; comparisons happen during merge.',
      rows: [
        { label: 'A', values: [5, 2, 4, 7, 1, 3, 2, 6], role: 'input' }
      ]
    },
    {
      label: '2. Divide',
      note: 'The array is recursively divided until each leaf has one element.',
      rows: [
        { label: 'Left half', values: [5, 2, 4, 7], role: 'split' },
        { label: 'Right half', values: [1, 3, 2, 6], role: 'split' },
        { label: 'Leaves', values: [5, 2, 4, 7, 1, 3, 2, 6], role: 'input' }
      ]
    },
    {
      label: '3. Merge small runs',
      note: 'Pairs are merged into sorted runs of length 2.',
      rows: [
        { label: 'Runs', values: [2, 5, 4, 7, 1, 3, 2, 6], role: 'merge' }
      ]
    },
    {
      label: '4. Merge halves',
      note: 'Each half is sorted. The final merge repeatedly compares the two front elements.',
      rows: [
        { label: 'Sorted left', values: [2, 4, 5, 7], role: 'sorted' },
        { label: 'Sorted right', values: [1, 2, 3, 6], role: 'sorted' }
      ]
    },
    {
      label: '5. Done',
      note: 'The final array is sorted. Stable merge sort keeps equal keys in left-to-right order.',
      rows: [
        { label: 'A', values: [1, 2, 2, 3, 4, 5, 6, 7], role: 'sorted' }
      ]
    }
  ];
  mergeStepIndex = 0;

  readonly heapifyStages: U3ArrayStage[] = [
    {
      label: '1. Raw input',
      note: 'Leaves already satisfy the heap property. BUILD-MAX-HEAP starts at the last internal node.',
      arr: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7],
      heapSize: 10,
      focusIndex: 5
    },
    {
      label: '2. Heapify i = 5',
      note: 'Node 5 has child 10 with value 7. Since 16 is larger, no swap is needed.',
      arr: [4, 1, 3, 2, 16, 9, 10, 14, 8, 7],
      heapSize: 10,
      focusIndex: 5
    },
    {
      label: '3. Heapify i = 4',
      note: 'Node 4 has value 2, children 14 and 8. Swap with 14.',
      arr: [4, 1, 3, 14, 16, 9, 10, 2, 8, 7],
      heapSize: 10,
      focusIndex: 4
    },
    {
      label: '4. Heapify i = 2',
      note: 'Node 2 has value 1, children 14 and 16. Swap with 16, then sift 1 downward.',
      arr: [4, 16, 3, 14, 7, 9, 10, 2, 8, 1],
      heapSize: 10,
      focusIndex: 2
    },
    {
      label: '5. Heapify i = 1',
      note: 'The root 4 is too small. It swaps with 16, then 14, then 8.',
      arr: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1],
      heapSize: 10,
      focusIndex: 1
    }
  ];
  heapifyStepIndex = 0;

  readonly heapSortStages: U3ArrayStage[] = [
    {
      label: '1. Built max-heap',
      note: 'The maximum element is at the root. The sorted suffix is empty.',
      arr: [16, 14, 10, 8, 7, 9, 3, 2, 4, 1],
      heapSize: 10,
      sortedStart: 10,
      focusIndex: 1
    },
    {
      label: '2. Extract 16',
      note: 'Swap the root with the last heap cell, shrink heap-size, then heapify.',
      arr: [14, 8, 10, 4, 7, 9, 3, 2, 1, 16],
      heapSize: 9,
      sortedStart: 9,
      focusIndex: 1
    },
    {
      label: '3. Extract 14',
      note: 'The sorted suffix now contains [14, 16]. The heap prefix stores the remaining elements.',
      arr: [10, 8, 9, 4, 7, 1, 3, 2, 14, 16],
      heapSize: 8,
      sortedStart: 8,
      focusIndex: 1
    },
    {
      label: '4. Extract 10',
      note: 'Each iteration places exactly one more maximum into its final position.',
      arr: [9, 8, 3, 4, 7, 1, 2, 10, 14, 16],
      heapSize: 7,
      sortedStart: 7,
      focusIndex: 1
    },
    {
      label: '5. Sorted',
      note: 'When the heap size reaches 1, the whole array is sorted in ascending order.',
      arr: [1, 2, 3, 4, 7, 8, 9, 10, 14, 16],
      heapSize: 1,
      sortedStart: 1,
      focusIndex: 1
    }
  ];
  heapSortStepIndex = 0;

  readonly quickSortStages: U3ArrayStage[] = [
    {
      label: '1. Choose pivot',
      note: 'Lomuto partition uses the last element as the pivot. Here x = 4.',
      rows: [
        { label: 'Unknown', values: [2, 8, 7, 1, 3, 5, 6], role: 'unknown' },
        { label: 'Pivot', values: [4], role: 'pivot' }
      ]
    },
    {
      label: '2. Scan from left to right',
      note: 'Values at most 4 are moved into the left region; larger values stay in the middle region for now.',
      rows: [
        { label: '<= pivot', values: [2, 1, 3], role: 'left' },
        { label: '> pivot', values: [8, 7, 5, 6], role: 'right' },
        { label: 'Pivot', values: [4], role: 'pivot' }
      ]
    },
    {
      label: '3. Final pivot swap',
      note: 'The pivot swaps into the first position after the <= region. Its final sorted index is now fixed.',
      rows: [
        { label: '<= pivot', values: [2, 1, 3], role: 'left' },
        { label: 'Pivot fixed', values: [4], role: 'pivot' },
        { label: '> pivot', values: [7, 5, 6, 8], role: 'right' }
      ]
    },
    {
      label: '4. Recurse',
      note: 'Quicksort recursively sorts only the two sides. The pivot 4 is never moved again.',
      rows: [
        { label: 'Left subproblem', values: [2, 1, 3], role: 'split' },
        { label: 'Fixed pivot', values: [4], role: 'pivot' },
        { label: 'Right subproblem', values: [7, 5, 6, 8], role: 'split' }
      ]
    }
  ];
  quickSortStepIndex = 0;

  readonly countingSortStages: U3ArrayStage[] = [
    {
      label: '1. Input keys',
      note: 'The keys are integers in the range 0..5, so a count array can store one counter per key.',
      rows: [
        { label: 'A', values: [2, 5, 3, 0, 2, 3, 0, 3], role: 'input' },
        { label: 'Keys', values: [0, 1, 2, 3, 4, 5], role: 'unknown' }
      ]
    },
    {
      label: '2. Count occurrences',
      note: 'C[v] stores how many input keys equal v.',
      rows: [
        { label: 'Key', values: [0, 1, 2, 3, 4, 5], role: 'unknown' },
        { label: 'Count C', values: [2, 0, 2, 3, 0, 1], role: 'count' }
      ]
    },
    {
      label: '3. Prefix sums',
      note: 'After prefix sums, C[v] stores how many keys are at most v. That is the final rightmost position for key v.',
      rows: [
        { label: 'Key', values: [0, 1, 2, 3, 4, 5], role: 'unknown' },
        { label: 'Prefix C', values: [2, 2, 4, 7, 7, 8], role: 'count' }
      ]
    },
    {
      label: '4. Stable scatter',
      note: 'Scan A from right to left. Place each key into B[C[key]], then decrement C[key]. Right-to-left scanning preserves equal-key order.',
      rows: [
        { label: 'A right-to-left', values: [3, 0, 3, 2, 0, 3, 5, 2], role: 'input' },
        { label: 'B', values: [0, 0, 2, 2, 3, 3, 3, 5], role: 'output' }
      ]
    },
    {
      label: '5. Radix idea',
      note: 'Radix sort repeats a stable digit sort from least significant digit to most significant digit.',
      rows: [
        { label: 'After ones digit', values: [720, 355, 436, 457, 657, 329], role: 'merge' },
        { label: 'After tens digit', values: [720, 329, 436, 355, 457, 657], role: 'merge' },
        { label: 'After hundreds', values: [329, 355, 436, 457, 657, 720], role: 'sorted' }
      ]
    }
  ];
  countingSortStepIndex = 0;

  readonly medianSelectStages: U3ArrayStage[] = [
    {
      label: '1. Group into fives',
      note: 'The algorithm splits the input into groups of five. Small leftover groups are allowed.',
      rows: [
        { label: 'Group 1', values: [12, 3, 5, 7, 4], role: 'group' },
        { label: 'Group 2', values: [19, 26, 23, 2, 1], role: 'group' },
        { label: 'Group 3', values: [17, 8, 14, 6, 10], role: 'group' }
      ]
    },
    {
      label: '2. Median of each group',
      note: 'Sort each tiny group locally and take its median. These local sorts cost Θ(n) total because every group has constant size.',
      rows: [
        { label: 'Sorted group 1', values: [3, 4, 5, 7, 12], role: 'group' },
        { label: 'Sorted group 2', values: [1, 2, 19, 23, 26], role: 'group' },
        { label: 'Sorted group 3', values: [6, 8, 10, 14, 17], role: 'group' },
        { label: 'Medians', values: [5, 19, 10], role: 'median' }
      ]
    },
    {
      label: '3. Choose pivot',
      note: 'Recursively select the median of the medians. In this example, the pivot is 10.',
      rows: [
        { label: 'Medians', values: [5, 10, 19], role: 'median' },
        { label: 'Pivot', values: [10], role: 'pivot' }
      ]
    },
    {
      label: '4. Partition around pivot',
      note: 'Keys below the pivot go left; keys above the pivot go right. If we seek rank i = 9, the pivot 10 is exactly the answer.',
      rows: [
        { label: '< 10', values: [3, 5, 7, 4, 2, 1, 8, 6], role: 'left' },
        { label: '= 10', values: [10], role: 'target' },
        { label: '> 10', values: [12, 19, 26, 23, 17, 14], role: 'right' }
      ]
    },
    {
      label: '5. Why it is safe',
      note: 'The pivot guarantee discards a constant fraction on every recursive partition step, which is what makes the worst-case time linear.',
      rows: [
        { label: 'Definitely small side', values: [3, 4, 5, 1, 2, 6, 8], role: 'discard' },
        { label: 'Good pivot', values: [10], role: 'pivot' },
        { label: 'Definitely large side', values: [12, 19, 23, 26, 14, 17], role: 'discard' }
      ]
    }
  ];
  medianSelectStepIndex = 0;

  get mergeStage(): U3ArrayStage { return this.mergeStages[this.mergeStepIndex]; }
  get heapifyStage(): U3ArrayStage { return this.heapifyStages[this.heapifyStepIndex]; }
  get heapSortStage(): U3ArrayStage { return this.heapSortStages[this.heapSortStepIndex]; }
  get quickSortStage(): U3ArrayStage { return this.quickSortStages[this.quickSortStepIndex]; }
  get countingSortStage(): U3ArrayStage { return this.countingSortStages[this.countingSortStepIndex]; }
  get medianSelectStage(): U3ArrayStage { return this.medianSelectStages[this.medianSelectStepIndex]; }

  mergeNext(): void { this.mergeStepIndex = Math.min(this.mergeStepIndex + 1, this.mergeStages.length - 1); }
  mergePrev(): void { this.mergeStepIndex = Math.max(this.mergeStepIndex - 1, 0); }
  mergeReset(): void { this.mergeStepIndex = 0; }

  heapifyNext(): void { this.heapifyStepIndex = Math.min(this.heapifyStepIndex + 1, this.heapifyStages.length - 1); }
  heapifyPrev(): void { this.heapifyStepIndex = Math.max(this.heapifyStepIndex - 1, 0); }
  heapifyReset(): void { this.heapifyStepIndex = 0; }

  heapSortNext(): void { this.heapSortStepIndex = Math.min(this.heapSortStepIndex + 1, this.heapSortStages.length - 1); }
  heapSortPrev(): void { this.heapSortStepIndex = Math.max(this.heapSortStepIndex - 1, 0); }
  heapSortReset(): void { this.heapSortStepIndex = 0; }

  quickSortNext(): void { this.quickSortStepIndex = Math.min(this.quickSortStepIndex + 1, this.quickSortStages.length - 1); }
  quickSortPrev(): void { this.quickSortStepIndex = Math.max(this.quickSortStepIndex - 1, 0); }
  quickSortReset(): void { this.quickSortStepIndex = 0; }

  countingSortNext(): void { this.countingSortStepIndex = Math.min(this.countingSortStepIndex + 1, this.countingSortStages.length - 1); }
  countingSortPrev(): void { this.countingSortStepIndex = Math.max(this.countingSortStepIndex - 1, 0); }
  countingSortReset(): void { this.countingSortStepIndex = 0; }

  medianSelectNext(): void { this.medianSelectStepIndex = Math.min(this.medianSelectStepIndex + 1, this.medianSelectStages.length - 1); }
  medianSelectPrev(): void { this.medianSelectStepIndex = Math.max(this.medianSelectStepIndex - 1, 0); }
  medianSelectReset(): void { this.medianSelectStepIndex = 0; }

  u3TreeClass(index: number): string {
    return `u3-tree-node u3-node-pos-${index + 1}`;
  }

  isU3Focus(stage: U3ArrayStage, index: number): boolean {
    return stage.focusIndex === index + 1;
  }

  isU3OutsideHeap(stage: U3ArrayStage, index: number): boolean {
    return stage.heapSize !== undefined && index + 1 > stage.heapSize;
  }

  isU3Sorted(stage: U3ArrayStage, index: number): boolean {
    return stage.sortedStart !== undefined && index >= stage.sortedStart;
  }

  readonly rtPresets: { label: string; a: number; b: number; fLabel: string; fExp: number; answer: string }[] = [
    { label: 'Merge sort', a: 2, b: 2, fLabel: 'n', fExp: 1, answer: 'Each level costs n. There are log₂n levels. Total = Θ(n log n).' },
    { label: 'Strassen', a: 7, b: 2, fLabel: 'n²', fExp: 2, answer: 'Leaves dominate. The exponent is lg 7 ≈ 2.81, so the total is Θ(n²·⁸¹).' },
    { label: 'Karatsuba', a: 3, b: 2, fLabel: 'n', fExp: 1, answer: 'Leaves dominate. The exponent is lg 3 ≈ 1.58, so the total is Θ(n¹·⁵⁸).' },
    { label: 'Binary search', a: 1, b: 2, fLabel: '1', fExp: 0, answer: 'Each level costs 1. There are log₂n levels. Total = Θ(log n).' },
    { label: 'T(n) = 4T(n/2) + n²', a: 4, b: 2, fLabel: 'n²', fExp: 2, answer: 'Each level costs n². There are log₂n levels. Total = Θ(n² log n).' },
    { label: 'T(n) = 3T(n/4) + cn²', a: 3, b: 4, fLabel: 'n²', fExp: 2, answer: 'Root dominates: geometric series shrinks. Total = Θ(n²).' }
  ];
  rtChoice = 0;
  rtShowAnswer = false;

  get rtPreset() { return this.rtPresets[this.rtChoice]; }

  get rtLevels(): { level: number; nodes: number; nodeSize: string; perNode: string; levelCost: string }[] {
    const { a, b, fLabel } = this.rtPreset;
    const maxLvl = Math.min(4, Math.ceil(Math.log(64) / Math.log(b)));
    const levels = [];
    for (let i = 0; i <= maxLvl; i++) {
      const nodes = Math.pow(a, i);
      const sizeStr = i === 0 ? 'n' : `n/${Math.pow(b, i)}`;
      const perNode = fLabel === '1' ? '1' : (i === 0 ? fLabel : `(n/${Math.pow(b, i)})${fLabel.includes('²') ? '²' : ''}`);
      const lvlCost = fLabel === '1'
        ? `${nodes}`
        : (fLabel.includes('²')
          ? `${nodes} × (n/${Math.pow(b, i)})² = ${nodes}n²/${Math.pow(b, 2 * i)}`
          : `${nodes} × n/${Math.pow(b, i)} = ${nodes}n/${Math.pow(b, i)}`);
      levels.push({ level: i, nodes, nodeSize: sizeStr, perNode, levelCost: lvlCost });
    }
    return levels;
  }

  rtSelectPreset(idx: number): void {
    this.rtChoice = idx;
    this.rtShowAnswer = false;
  }

  // ── Unit 2: Master-theorem calculator (L5) ────────────────────────────
  mtA = 2;
  mtB = 2;
  mtFExp = 1;   // exponent k in f(n)
  mtFLogK = 0;  // extra log factor in f(n)
  mtChecked = false;

  get mtLogBA(): number { return Math.log(this.mtA) / Math.log(this.mtB); }

  private mtSup(value: number | string): string {
    const chars: Record<string, string> = {
      '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
      '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
      '.': '·', '-': '⁻', '+': '⁺'
    };
    return String(value).split('').map((char) => chars[char] ?? char).join('');
  }

  private mtPower(base: string, exponent: number | string): string {
    const raw = String(exponent);
    if (raw === '0') return '1';
    if (raw === '1') return base;
    return `${base}${this.mtSup(raw)}`;
  }

  get mtResult(): { caseNum: number; label: string; answer: string; explain: string } {
    const logba = this.mtLogBA;
    const k = this.mtFExp;
    const eps = 0.001;
    const logPower = this.mtPower('n', logba % 1 === 0 ? logba.toFixed(0) : logba.toFixed(2));
    const fPower = this.mtPower('n', k);
    const logFactor = this.mtFLogK > 0 ? ` log${this.mtSup(this.mtFLogK)} n` : '';

    if (k < logba - eps) {
      return {
        caseNum: 1,
        label: 'Case 1 — Leaf-heavy',
        answer: `Θ(${logPower})`,
        explain: `f(n) = ${fPower} is polynomially smaller than n with exponent log_${this.mtB} ${this.mtA} ≈ ${logPower}. Leaves dominate.`
      };
    } else if (k > logba + eps) {
      return {
        caseNum: 3,
        label: 'Case 3 — Root-heavy',
        answer: `Θ(${fPower}${logFactor})`,
        explain: `f(n) = ${fPower} is polynomially larger than n with exponent log_${this.mtB} ${this.mtA} ≈ ${logPower}. Root dominates (check regularity!).`
      };
    } else {
      return {
        caseNum: 2,
        label: 'Case 2 — Balanced',
        answer: `Θ(${fPower} log${this.mtFLogK > 0 ? this.mtSup(this.mtFLogK + 1) : ''} n)`,
        explain: `f(n) = ${fPower} matches n with exponent log_${this.mtB} ${this.mtA} ≈ ${logPower}. Each level costs the same, so multiply by log n.`
      };
    }
  }

  mtCheck(): void { this.mtChecked = true; }
  mtReset(): void { this.mtA = 2; this.mtB = 2; this.mtFExp = 1; this.mtFLogK = 0; this.mtChecked = false; }

  // ── Lifecycle ────────────────────────────────────────────────────────────
  ngOnChanges(): void {
    this.reset();
    void this.loadLazyArtifact();
  }

  private async loadLazyArtifact(): Promise<void> {
    const artifact = this.artifact;
    const token = ++this.lazyArtifactToken;
    this.lazyArtifact = null;

    const loader = this.lazyLoaderFor(artifact);
    if (!loader) {
      this.loadingLazyArtifact = false;
      return;
    }

    this.loadingLazyArtifact = true;
    const component = await loader();
    if (token !== this.lazyArtifactToken) return;
    this.lazyArtifact = { component, inputs: this.inputsFor(artifact) };
    this.loadingLazyArtifact = false;
  }

  private lazyLoaderFor(artifact: string): (() => Promise<Type<unknown>>) | null {
    if (this.unit1Artifacts.has(artifact)) {
      return () => import('../unit1-lab/unit1-lab.component').then((m) => m.Unit1LabComponent);
    }
    if (this.unit2Artifacts.has(artifact)) {
      return () => import('../unit2-lab/unit2-lab.component').then((m) => m.Unit2LabComponent);
    }
    if (this.unit3Artifacts.has(artifact)) {
      return () => import('../unit3-lab/unit3-lab.component').then((m) => m.Unit3LabComponent);
    }
    if (this.unit5Artifacts.has(artifact)) {
      return () => import('../unit5-lab/unit5-lab.component').then((m) => m.Unit5LabComponent);
    }
    if (this.unit6Artifacts.has(artifact)) {
      return () => import('../unit6-lab/unit6-lab.component').then((m) => m.Unit6LabComponent);
    }
    if (this.unit7Artifacts.has(artifact)) {
      return () => import('../unit7-lab/unit7-lab.component').then((m) => m.Unit7LabComponent);
    }
    if (artifact === 'bst-tree-visualizer' || artifact === 'rb-tree-visualizer') {
      return () => import('../tree-visualizer/tree-visualizer.component').then((m) => m.TreeVisualizerComponent);
    }
    return null;
  }

  private inputsFor(artifact: string): Record<string, unknown> {
    if (artifact === 'bst-tree-visualizer') return { mode: 'bst' };
    if (artifact === 'rb-tree-visualizer') return { mode: 'rb' };
    return { artifact };
  }

  private reset(): void {
    this.mergeStepIndex = 0; this.heapifyStepIndex = 0; this.heapSortStepIndex = 0; this.quickSortStepIndex = 0; this.countingSortStepIndex = 0; this.medianSelectStepIndex = 0;
    this.rtChoice = 0; this.rtShowAnswer = false;
    this.mtA = 2; this.mtB = 2; this.mtFExp = 1; this.mtFLogK = 0; this.mtChecked = false;
  }
}
