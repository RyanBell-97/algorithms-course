import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* ===========================================================================
 * Unit 1 — Introduction & Algorithm Analysis: interactive analysis laboratory.
 * Every artifact ties a visual action to the exact source of reasoning:
 * a pseudocode line, a RAM cost line, a proof phase, an asymptotic rule,
 * or a case-analysis category.
 * ======================================================================== */

/* ── L1: Algorithm Classifier ───────────────────────────────────────────── */
type PropKey = 'input' | 'output' | 'definiteness' | 'finiteness' | 'effectiveness';

interface PropTest { pass: boolean; note: string; }

interface ClassProc {
  id: string;
  text: string;
  isAlgo: boolean;
  props: Record<PropKey, PropTest>;
  verdict: string;
  repair?: string;
}

/* ── L2: RAM Cost Counter ───────────────────────────────────────────────── */
interface RamLineDef { text: string; cost: string; }

interface RamFrame {
  line: number;
  i: number | null;
  focus: number | null;
  result: string;
  resultLabel: string;
  ops: number;
  counts: number[];
  note: string;
}

interface RamProgram {
  id: string;
  label: string;
  blurb: string;
  lines: RamLineDef[];
  array: number[];
  target?: number;
  resultLabel: string;
  symbolic: string;
  asymptotic: string;
  guardNote: string;
}

/* ── L3: Insertion Sort ─────────────────────────────────────────────────── */
interface SortFrame {
  arr: number[];
  line: number;
  roles: string[];
  j: number;
  i: number;
  key: number | null;
  comparisons: number;
  shifts: number;
  writes: number;
  inversions: number;
  note: string;
}

/* ── L4: Loop Invariant Builder ─────────────────────────────────────────── */
interface LiOption { text: string; correct: boolean; mistake?: string; }

interface LiPhase {
  key: 'init' | 'maint' | 'term';
  label: string;
  prompt: string;
  options: LiOption[];
}

interface LiAlgo {
  id: string;
  label: string;
  pseudocode: string[];
  invariant: string;
  phases: LiPhase[];
}

/* ── L5: Growth Rate ────────────────────────────────────────────────────── */
interface GrowthFn {
  key: string;
  label: string;
  color: string;
  f: (n: number) => number;
  rank: number;
}

/* ── L6: Case Analysis ──────────────────────────────────────────────────── */
type CaseClass = 'best' | 'worst' | 'average' | 'na';

interface CaseCell {
  ops: number | null;
  cls: CaseClass;
  formula: string;
  why: string;
  rule: string;
}

/* ── L7: Sweep Line ─────────────────────────────────────────────────────── */
interface SweepPoint { x: number; y: number; id: number; }

/* ── L8: Complexity Match ───────────────────────────────────────────────── */
interface CmAlgo { id: string; label: string; sub: string; correct: string; why: string; }

/* ── L8: Proof Error Finder ─────────────────────────────────────────────── */
interface PefStep { id: 'init' | 'maint' | 'term'; label: string; text: string; }

interface PefScenario {
  algo: string;
  invariant: string;
  invariantNote?: string;
  steps: PefStep[];
  errorStep: 'init' | 'maint' | 'term' | 'invariant';
  category: string;
  errorExplain: string;
}

@Component({
  selector: 'app-unit1-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit1-lab.component.html',
  styleUrls: ['./unit1-lab.component.scss']
})
export class Unit1LabComponent implements OnChanges, OnDestroy {
  @Input() artifact = '';

  ngOnChanges(): void { this.resetAll(); }
  ngOnDestroy(): void { this.sortStopPlay(); }

  private resetAll(): void {
    this.classAnswers = {};
    this.classRepair = {};
    this.ramSelect('sum-array');
    this.sortPreset('random');
    this.liSelect('linear');
    this.growthSelected = new Set(['n', 'nlogn', 'n2', '2n']);
    this.growthProofC = 6;
    this.growthProofN0 = 1;
    this.domPick = null;
    this.caseAlgo = 'linear-search';
    this.caseInput = null;
    this.sweepStep = 0;
    this.cmReset();
    this.invInput = '4 1 5 2 6 3';
    this.pefIndex = 0; this.pefSelected = null; this.pefRevealed = false;
  }

  /* =====================================================================
   * L1 — ALGORITHM CLASSIFIER LAB
   * =================================================================== */
  readonly knuthChecklist: { key: PropKey; name: string; test: string }[] = [
    { key: 'input', name: 'Input', test: 'Zero or more inputs from a clearly specified set.' },
    { key: 'output', name: 'Output', test: 'One or more outputs, related to the input by the problem.' },
    { key: 'definiteness', name: 'Definiteness', test: 'Every step is precise and unambiguous.' },
    { key: 'finiteness', name: 'Finiteness', test: 'It always halts after finitely many steps.' },
    { key: 'effectiveness', name: 'Effectiveness', test: 'Each step is basic enough to be carried out exactly.' }
  ];

  readonly classProcs: ClassProc[] = [
    {
      id: 'cp1',
      text: '"Repeat swapping elements until the array looks sorted."',
      isAlgo: false,
      props: {
        input: { pass: true, note: 'The array is a clear input.' },
        output: { pass: true, note: 'A sorted array is the intended output.' },
        definiteness: { pass: false, note: '"looks sorted" is subjective — a machine needs the test A[i] <= A[i+1] for every adjacent pair.' },
        finiteness: { pass: false, note: 'With no precise stopping test, the loop has no guaranteed halt.' },
        effectiveness: { pass: true, note: 'Swapping two elements is a basic step.' }
      },
      verdict: 'Not an algorithm: the stopping condition is not definite, so termination is not guaranteed.',
      repair: 'Repeat: scan adjacent pairs and swap any A[i] > A[i+1]. Stop only once a full scan finds no such pair (bubble sort). Now the stopping test is precise and halts in <= n passes.'
    },
    {
      id: 'cp2',
      text: '"Find the maximum: scan A[1..n] keeping the largest value seen so far, then return it."',
      isAlgo: true,
      props: {
        input: { pass: true, note: 'A non-empty array A[1..n].' },
        output: { pass: true, note: 'Returns one value: the maximum.' },
        definiteness: { pass: true, note: 'Each step — compare, update, advance — is unambiguous.' },
        finiteness: { pass: true, note: 'Exactly n - 1 iterations, then it halts.' },
        effectiveness: { pass: true, note: 'Compare and assign are basic operations.' }
      },
      verdict: 'An algorithm: all five properties hold. Finite loop, definite steps, clear input/output contract.'
    },
    {
      id: 'cp3',
      text: '"Try numbers until one looks good."',
      isAlgo: false,
      props: {
        input: { pass: false, note: 'No input set is named — numbers from where, in what range?' },
        output: { pass: false, note: '"good" is undefined, so the output condition is unspecified.' },
        definiteness: { pass: false, note: '"looks good" cannot be evaluated by a machine.' },
        finiteness: { pass: false, note: 'No bound and no precise success test, so it may never stop.' },
        effectiveness: { pass: true, note: 'Picking a number is itself basic.' }
      },
      verdict: 'Not an algorithm: it fails four of the five properties. This is wishful thinking, not a method.',
      repair: 'Define a precise predicate P(x) (e.g. x*x = target), then test x = 1, 2, 3, ... in order, returning the first x with P(x) true or NIL after a fixed bound B.'
    },
    {
      id: 'cp4',
      text: 'LINEAR-SEARCH that scans A[1..n] for v, but the loop body never increments i.',
      isAlgo: false,
      props: {
        input: { pass: true, note: 'Array A and value v are clear inputs.' },
        output: { pass: true, note: 'An index or NIL is the intended output.' },
        definiteness: { pass: true, note: 'Every individual step is precisely defined.' },
        finiteness: { pass: false, note: 'Without i = i + 1, the loop guard never changes — it runs forever when A[1] != v.' },
        effectiveness: { pass: true, note: 'Comparisons are basic steps.' }
      },
      verdict: 'Not an algorithm: definite steps are not enough. A missing progress update breaks finiteness.',
      repair: 'Add i = i + 1 as the last step of the loop body. The index now strictly increases toward n + 1, which is the decreasing-measure that forces termination.'
    },
    {
      id: 'cp5',
      text: '"Given a non-empty integer array, return A[1] + A[2] + ... + A[n]."',
      isAlgo: true,
      props: {
        input: { pass: true, note: 'A non-empty integer array.' },
        output: { pass: true, note: 'A single integer: the sum.' },
        definiteness: { pass: true, note: 'The accumulation order is fixed and unambiguous.' },
        finiteness: { pass: true, note: 'Exactly n additions, then halt.' },
        effectiveness: { pass: true, note: 'Integer addition is a basic operation.' }
      },
      verdict: 'An algorithm: a finite accumulation with a definite order and a clear output.'
    },
    {
      id: 'cp6',
      text: '"Use the fastest known method to sort the array."',
      isAlgo: false,
      props: {
        input: { pass: true, note: 'The array is a clear input.' },
        output: { pass: true, note: 'A sorted array is the intended output.' },
        definiteness: { pass: false, note: 'It names no concrete comparisons, moves, or recursive calls.' },
        finiteness: { pass: true, note: 'Any real sort halts — but this text does not specify one.' },
        effectiveness: { pass: false, note: 'There are no executable steps at all, only a goal.' }
      },
      verdict: 'Not an algorithm: this is a goal, not a method. It says what to achieve, never how.',
      repair: 'Name a concrete algorithm and its steps, e.g. MERGE-SORT(A): split A in half, recursively sort each half, then merge the two sorted halves.'
    },
    {
      id: 'cp7',
      text: 'FACTORIAL(n): if n = 0 return 1, else return n * FACTORIAL(n - 1), for integer n >= 0.',
      isAlgo: true,
      props: {
        input: { pass: true, note: 'A non-negative integer n.' },
        output: { pass: true, note: 'Returns the value n!.' },
        definiteness: { pass: true, note: 'Base case and recursive case are both precise.' },
        finiteness: { pass: true, note: 'Each call decreases n; it reaches the base case 0 after n steps.' },
        effectiveness: { pass: true, note: 'Multiplication and the test n = 0 are basic.' }
      },
      verdict: 'An algorithm: recursion is fine. The argument strictly decreases toward a base case, so it halts.'
    },
    {
      id: 'cp8',
      text: '"Compute and print the exact decimal expansion of pi."',
      isAlgo: false,
      props: {
        input: { pass: true, note: 'No input is needed — that is allowed (zero inputs).' },
        output: { pass: false, note: 'The "exact expansion" is infinitely long — it is never a finished output.' },
        definiteness: { pass: true, note: 'Each digit-producing step can be made precise.' },
        finiteness: { pass: false, note: 'It never halts: there is always one more digit.' },
        effectiveness: { pass: true, note: 'Producing one more digit is a basic, finite step.' }
      },
      verdict: 'Not an algorithm: producing every digit of pi never terminates and never delivers a final output.',
      repair: 'Take a precision k as input and compute pi to exactly k digits. The loop now runs k times and halts with a finite output.'
    }
  ];

  classAnswers: Record<string, boolean> = {};
  classRepair: Record<string, boolean> = {};

  classPick(id: string, answer: boolean): void { this.classAnswers[id] = answer; }
  classToggleRepair(id: string): void { this.classRepair[id] = !this.classRepair[id]; }
  classReset(): void { this.classAnswers = {}; this.classRepair = {}; }

  get classAnswered(): number { return Object.keys(this.classAnswers).length; }
  get classCorrect(): number {
    return this.classProcs.filter(p => this.classAnswers[p.id] === p.isAlgo).length;
  }
  get classComplete(): boolean { return this.classAnswered === this.classProcs.length; }

  classProp(p: ClassProc, key: PropKey): PropTest { return p.props[key]; }
  classFailCount(p: ClassProc): number {
    return this.knuthChecklist.filter(c => !p.props[c.key].pass).length;
  }

  /* =====================================================================
   * L2 — RAM COST COUNTER LAB
   * =================================================================== */
  readonly ramPrograms: RamProgram[] = [
    {
      id: 'sum-array',
      label: 'Array sum',
      blurb: 'Accumulate every element of A into a running total.',
      lines: [
        { text: 'sum = 0', cost: 'c₁' },
        { text: 'for i = 1 to n', cost: 'c₂' },
        { text: '    sum = sum + A[i]', cost: 'c₃' },
        { text: 'return sum', cost: 'c₄' }
      ],
      array: [3, 1, 4, 1, 5],
      resultLabel: 'sum',
      symbolic: 'T(n) = c₁ + c₂(n+1) + c₃·n + c₄',
      asymptotic: 'Θ(n)',
      guardNote: 'The loop guard on line 2 runs n+1 times — n successes plus one final failure. The body on line 3 runs exactly n times.'
    },
    {
      id: 'maximum',
      label: 'Maximum',
      blurb: 'Scan for the largest element, keeping the best seen so far.',
      lines: [
        { text: 'best = A[1]', cost: 'c₁' },
        { text: 'for i = 2 to n', cost: 'c₂' },
        { text: '    if A[i] > best', cost: 'c₃' },
        { text: '        best = A[i]', cost: 'c₄' },
        { text: 'return best', cost: 'c₅' }
      ],
      array: [3, 1, 4, 1, 5],
      resultLabel: 'best',
      symbolic: 'T(n) = c₁ + c₂·n + c₃(n-1) + c₄·u + c₅',
      asymptotic: 'Θ(n)',
      guardNote: 'Line 4 runs only u times, where u is the number of new maxima found. The asymptotic class is Θ(n) regardless of u, since 0 <= u <= n-1.'
    },
    {
      id: 'search-found',
      label: 'Linear search (found early)',
      blurb: 'Search for a value that sits near the front of the array.',
      lines: [
        { text: 'for i = 1 to n', cost: 'c₁' },
        { text: '    if A[i] == v', cost: 'c₂' },
        { text: '        return i', cost: 'c₃' },
        { text: 'return NIL', cost: 'c₄' }
      ],
      array: [3, 7, 4, 1, 5, 9],
      target: 7,
      resultLabel: 'result',
      symbolic: 'T(n) = c₁·k + c₂·k + c₃   (target at index k)',
      asymptotic: 'Θ(1) here, Θ(n) worst case',
      guardNote: 'An early return makes the exact count depend on k, the index of the target. This is why one algorithm needs a best/worst/average analysis.'
    },
    {
      id: 'search-absent',
      label: 'Linear search (absent)',
      blurb: 'Search for a value that never appears — the worst case.',
      lines: [
        { text: 'for i = 1 to n', cost: 'c₁' },
        { text: '    if A[i] == v', cost: 'c₂' },
        { text: '        return i', cost: 'c₃' },
        { text: 'return NIL', cost: 'c₄' }
      ],
      array: [3, 7, 4, 1, 5, 9],
      target: 8,
      resultLabel: 'result',
      symbolic: 'T(n) = c₁(n+1) + c₂·n + c₄',
      asymptotic: 'Θ(n)',
      guardNote: 'No element matches, so line 3 never runs. Every guard and every comparison is paid in full — this is the worst case.'
    }
  ];

  ramProgram: RamProgram = this.ramPrograms[0];
  ramFrames: RamFrame[] = [];
  ramStep = 0;

  ramSelect(id: string): void {
    this.ramProgram = this.ramPrograms.find(p => p.id === id) ?? this.ramPrograms[0];
    this.ramFrames = this.buildRamTrace(this.ramProgram);
    this.ramStep = 0;
  }

  private mkRamFrame(line: number, i: number | null, focus: number | null,
                     result: string, ops: number, counts: number[], note: string,
                     resultLabel: string): RamFrame {
    return { line, i, focus, result, resultLabel, ops, counts: [...counts], note };
  }

  private buildRamTrace(prog: RamProgram): RamFrame[] {
    const A = prog.array;
    const n = A.length;
    const frames: RamFrame[] = [];
    const counts = new Array(prog.lines.length).fill(0);
    let ops = 0;
    const emit = (line: number, i: number | null, focus: number | null,
                  result: string, note: string) => {
      counts[line]++;
      ops++;
      frames.push(this.mkRamFrame(line, i, focus, result, ops, counts, note, prog.resultLabel));
    };

    if (prog.id === 'sum-array') {
      let sum = 0;
      emit(0, null, null, '0', 'Line 1: initialise the accumulator. sum = 0.');
      for (let i = 1; i <= n; i++) {
        emit(1, i, null, String(sum), `Line 2: loop guard i <= n with i = ${i}. True — enter the body.`);
        sum += A[i - 1];
        emit(2, i, i - 1, String(sum), `Line 3: sum = sum + A[${i}] = ${sum}. The body runs once per element.`);
      }
      emit(1, n + 1, null, String(sum), `Line 2: loop guard with i = ${n + 1}. False — the loop ends. Guard ran ${n + 1} times.`);
      emit(3, null, null, String(sum), `Line 4: return sum = ${sum}.`);
    } else if (prog.id === 'maximum') {
      let best = A[0];
      emit(0, null, 0, String(best), `Line 1: best = A[1] = ${best}.`);
      for (let i = 2; i <= n; i++) {
        emit(1, i, null, String(best), `Line 2: loop guard with i = ${i}. True — enter the body.`);
        const isBigger = A[i - 1] > best;
        emit(2, i, i - 1, String(best), `Line 3: compare A[${i}] = ${A[i - 1]} > best = ${best}? ${isBigger ? 'True' : 'False'}.`);
        if (isBigger) {
          best = A[i - 1];
          emit(3, i, i - 1, String(best), `Line 4: best = A[${i}] = ${best}. A new maximum was found.`);
        }
      }
      emit(1, n + 1, null, String(best), `Line 2: loop guard with i = ${n + 1}. False — the loop ends.`);
      emit(4, null, null, String(best), `Line 5: return best = ${best}.`);
    } else {
      const v = prog.target!;
      let found = -1;
      for (let i = 1; i <= n; i++) {
        emit(0, i, null, found >= 0 ? String(found) : 'NIL', `Line 1: loop guard with i = ${i}. True — enter the body.`);
        const match = A[i - 1] === v;
        emit(1, i, i - 1, found >= 0 ? String(found) : 'NIL', `Line 2: compare A[${i}] = ${A[i - 1]} == v = ${v}? ${match ? 'True' : 'False'}.`);
        if (match) {
          found = i;
          emit(2, i, i - 1, String(found), `Line 3: return i = ${i}. The algorithm halts immediately — later elements are never inspected.`);
          break;
        }
      }
      if (found < 0) {
        emit(0, n + 1, null, 'NIL', `Line 1: loop guard with i = ${n + 1}. False — the loop ends.`);
        emit(3, null, null, 'NIL', `Line 4: return NIL. The value ${v} is absent.`);
      }
    }
    return frames;
  }

  get ramFrame(): RamFrame { return this.ramFrames[this.ramStep]; }
  get ramDone(): boolean { return this.ramStep >= this.ramFrames.length - 1; }
  get ramStarted(): boolean { return this.ramStep > 0; }
  ramNext(): void { if (!this.ramDone) this.ramStep++; }
  ramPrev(): void { if (this.ramStep > 0) this.ramStep--; }
  ramRun(): void { this.ramStep = this.ramFrames.length - 1; }
  ramRestart(): void { this.ramStep = 0; }
  ramN(): number { return this.ramProgram.array.length; }

  /* =====================================================================
   * L3 — INSERTION SORT VISUALIZER
   * =================================================================== */
  readonly sortPseudocode = [
    'INSERTION-SORT(A)',
    'for j = 2 to A.length',
    '    key = A[j]',
    '    // insert A[j] into the sorted A[1..j-1]',
    '    i = j - 1',
    '    while i > 0 and A[i] > key',
    '        A[i + 1] = A[i]',
    '        i = i - 1',
    '    A[i + 1] = key'
  ];

  readonly sortPresets: { id: string; label: string; values: number[] }[] = [
    { id: 'sorted', label: 'Sorted', values: [1, 2, 3, 4, 5, 6, 7] },
    { id: 'reverse', label: 'Reverse', values: [7, 6, 5, 4, 3, 2, 1] },
    { id: 'random', label: 'Random', values: [5, 2, 4, 6, 1, 3] },
    { id: 'nearly', label: 'Nearly sorted', values: [1, 2, 4, 3, 5, 7, 6] },
    { id: 'dups', label: 'Duplicates', values: [4, 2, 4, 2, 3, 4, 1] }
  ];

  sortPresetId = 'random';
  sortInput = '5 2 4 6 1 3';
  sortFrames: SortFrame[] = [];
  sortStep = 0;
  sortPlaying = false;
  sortSpeed = 1;
  private sortTimer: ReturnType<typeof setInterval> | null = null;

  sortPreset(id: string): void {
    const preset = this.sortPresets.find(p => p.id === id);
    if (!preset) return;
    this.sortPresetId = id;
    this.sortInput = preset.values.join(' ');
    this.sortBuild(preset.values);
  }

  sortApplyInput(): void {
    const nums = this.sortInput.split(/[\s,]+/).map(Number).filter(x => !isNaN(x)).slice(0, 9);
    if (nums.length < 2) return;
    this.sortPresetId = 'custom';
    this.sortBuild(nums);
  }

  private sortBuild(values: number[]): void {
    this.sortStopPlay();
    this.sortFrames = this.buildSortTrace(values);
    this.sortStep = 0;
  }

  private countInversions(a: number[]): number {
    let c = 0;
    for (let x = 0; x < a.length; x++)
      for (let y = x + 1; y < a.length; y++)
        if (a[x] > a[y]) c++;
    return c;
  }

  private buildSortTrace(values: number[]): SortFrame[] {
    const arr = [...values];
    const n = arr.length;
    const frames: SortFrame[] = [];
    let comparisons = 0, shifts = 0, writes = 0;

    const snapshot = (line: number, j: number, i: number, key: number | null,
                      roleSpec: { i?: number; key?: number; gap?: number; sortedTo?: number },
                      note: string) => {
      const roles = new Array(n).fill('');
      const sortedTo = roleSpec.sortedTo ?? -1;
      for (let k = 0; k <= sortedTo && k < n; k++) roles[k] = 'sorted';
      if (roleSpec.gap !== undefined && roleSpec.gap >= 0 && roleSpec.gap < n) roles[roleSpec.gap] = 'gap';
      if (roleSpec.i !== undefined && roleSpec.i >= 0 && roleSpec.i < n) roles[roleSpec.i] = 'compare';
      if (roleSpec.key !== undefined && roleSpec.key >= 0 && roleSpec.key < n) roles[roleSpec.key] = 'key';
      frames.push({
        arr: [...arr], line, roles, j, i, key,
        comparisons, shifts, writes,
        inversions: this.countInversions(arr), note
      });
    };

    snapshot(0, 1, 0, null, { sortedTo: 0 },
      'Start. By convention A[1] alone is a trivially sorted prefix of length 1.');

    for (let j = 2; j <= n; j++) {
      const j0 = j - 1;
      snapshot(1, j, 0, null, { sortedTo: j0 - 1, key: j0 },
        `Line 1: outer loop, j = ${j}. The sorted prefix is A[1..${j - 1}]; A[${j}] is the next element to insert.`);
      const key = arr[j0];
      snapshot(2, j, 0, key, { sortedTo: j0 - 1, key: j0 },
        `Line 2: key = A[${j}] = ${key}. This value is lifted out, leaving a gap.`);
      let i = j0 - 1;
      snapshot(4, j, i, key, { sortedTo: j0 - 1, gap: j0, i },
        `Line 4: i = j - 1 = ${j}. The pointer i starts at the right end of the sorted prefix.`);

      while (i >= 0 && arr[i] > key) {
        comparisons++;
        snapshot(5, j, i, key, { sortedTo: j0 - 1, gap: i + 1, i },
          `Line 5: i = ${i + 1} > 0 and A[${i + 1}] = ${arr[i]} > key = ${key}? Both true — shift.`);
        arr[i + 1] = arr[i];
        shifts++; writes++;
        snapshot(6, j, i, key, { sortedTo: j0 - 1, gap: i, i },
          `Line 6: A[${i + 2}] = A[${i + 1}] = ${arr[i]}. The larger value slides one place right; the gap moves left.`);
        i--;
        snapshot(7, j, i, key, { sortedTo: j0 - 1, gap: i + 1, i: i >= 0 ? i : -1 },
          `Line 7: i = i - 1 = ${i + 1}. Step the pointer left and re-test the while guard.`);
      }
      if (i >= 0) {
        comparisons++;
        snapshot(5, j, i, key, { sortedTo: j0 - 1, gap: i + 1, i },
          `Line 5: A[${i + 1}] = ${arr[i]} > key = ${key}? False — stop shifting. The gap at index ${i + 2} is key's home.`);
      } else {
        snapshot(5, j, -1, key, { sortedTo: j0 - 1, gap: 0 },
          `Line 5: i = 0, the guard i > 0 is false — stop. key = ${key} is the new smallest, it belongs at index 1.`);
      }
      arr[i + 1] = key;
      writes++;
      snapshot(8, j, i, key, { sortedTo: j0 },
        `Line 8: A[${i + 2}] = key = ${key}. The sorted prefix is now A[1..${j}].`);
    }

    const finalRoles = new Array(n).fill('sorted');
    frames.push({
      arr: [...arr], line: 9, roles: finalRoles, j: n + 1, i: 0, key: null,
      comparisons, shifts, writes, inversions: 0,
      note: `Done. j reached A.length + 1, so the for-loop exits. The whole array A[1..${n}] is sorted.`
    });
    return frames;
  }

  get sortFrame(): SortFrame { return this.sortFrames[this.sortStep]; }
  get sortDone(): boolean { return this.sortStep >= this.sortFrames.length - 1; }
  get sortN(): number { return this.sortFrames.length ? this.sortFrames[0].arr.length : 0; }
  get sortLineActive(): number { return this.sortFrame ? this.sortFrame.line : -1; }

  sortNext(): void { if (!this.sortDone) this.sortStep++; else this.sortStopPlay(); }
  sortPrev(): void { this.sortStopPlay(); if (this.sortStep > 0) this.sortStep--; }
  sortRestart(): void { this.sortStopPlay(); this.sortStep = 0; }

  sortTogglePlay(): void {
    if (this.sortPlaying) { this.sortStopPlay(); return; }
    if (this.sortDone) this.sortStep = 0;
    this.sortPlaying = true;
    this.sortTimer = setInterval(() => {
      if (this.sortDone) { this.sortStopPlay(); return; }
      this.sortStep++;
    }, 900 / this.sortSpeed);
  }

  sortStopPlay(): void {
    this.sortPlaying = false;
    if (this.sortTimer) { clearInterval(this.sortTimer); this.sortTimer = null; }
  }

  sortSetSpeed(s: number): void {
    this.sortSpeed = s;
    if (this.sortPlaying) { this.sortStopPlay(); this.sortTogglePlay(); }
  }

  get sortInversionStart(): number {
    return this.sortFrames.length ? this.countInversions(this.sortFrames[0].arr) : 0;
  }

  get sortBehaviour(): { tag: string; text: string } {
    const inv = this.sortInversionStart;
    const n = this.sortN;
    const max = (n * (n - 1)) / 2;
    if (inv === 0) return { tag: 'Θ(n) — best case', text: 'Already sorted: the while-guard fails immediately every time, so no shifts occur. Only n-1 comparisons.' };
    if (inv === max) return { tag: 'Θ(n²) — worst case', text: 'Reverse sorted: every element shifts past the entire prefix. Shifts = n(n-1)/2, the maximum possible.' };
    return { tag: 'Θ(n + I) — input sensitive', text: `This input has I = ${inv} inversions. Insertion sort does exactly ${inv} shifts — its running time grows as Θ(n + I).` };
  }

  /* =====================================================================
   * L4 — LOOP INVARIANT PROOF BUILDER
   * =================================================================== */
  readonly liAlgos: LiAlgo[] = [
    {
      id: 'linear',
      label: 'Linear search',
      pseudocode: [
        'LINEAR-SEARCH(A, v)',
        'for i = 1 to A.length',
        '    if A[i] == v',
        '        return i',
        'return NIL'
      ],
      invariant: 'At the start of each iteration with index i, the value v does not appear in A[1..i-1].',
      phases: [
        {
          key: 'init', label: 'Initialization',
          prompt: 'Show the invariant holds before the first iteration (i = 1).',
          options: [
            { text: 'Before i = 1 the prefix A[1..0] is empty, so v trivially does not appear in it.', correct: true },
            { text: 'Before i = 1, A[1] has already been checked and differs from v.', correct: false, mistake: 'true only after the iteration, not before — an off-by-one error.' },
            { text: 'The array A is sorted, so v cannot be in the prefix.', correct: false, mistake: 'uses an assumption the algorithm never makes; linear search needs no sortedness.' }
          ]
        },
        {
          key: 'maint', label: 'Maintenance',
          prompt: 'Assume the invariant holds for i; show it holds for i + 1.',
          options: [
            { text: 'If A[i] == v the loop returns i; otherwise A[i] != v, so v is absent from A[1..i] — the invariant for i + 1.', correct: true },
            { text: 'We increment i, so the prefix grows and the invariant still holds.', correct: false, mistake: 'never uses the loop body (the comparison A[i] == v) — maintenance must use what the body does.' },
            { text: 'v is not in A at all, so it is certainly not in A[1..i].', correct: false, mistake: 'assumes the conclusion; the invariant is about a prefix, not the whole array.' }
          ]
        },
        {
          key: 'term', label: 'Termination',
          prompt: 'Use the invariant when the loop ends to prove the output is correct.',
          options: [
            { text: 'The loop ends at i = n + 1; the invariant says v is absent from A[1..n], so returning NIL is correct.', correct: true },
            { text: 'The loop terminates because n is finite.', correct: false, mistake: 'only argues that the loop halts — it never connects the invariant to the returned answer.' },
            { text: 'After the loop, A[1..n-1] does not contain v.', correct: false, mistake: 'too weak: it leaves A[n] unaccounted for, so it cannot justify returning NIL.' }
          ]
        }
      ]
    },
    {
      id: 'maximum',
      label: 'Maximum',
      pseudocode: [
        'MAXIMUM(A)',
        'best = A[1]',
        'for i = 2 to A.length',
        '    if A[i] > best',
        '        best = A[i]',
        'return best'
      ],
      invariant: 'At the start of each iteration with index i, best equals the maximum of A[1..i-1].',
      phases: [
        {
          key: 'init', label: 'Initialization',
          prompt: 'Show the invariant holds before the first iteration (i = 2).',
          options: [
            { text: 'Before i = 2, best = A[1], and the maximum of the one-element prefix A[1..1] is A[1].', correct: true },
            { text: 'Before i = 2, best already equals the maximum of A[1..2].', correct: false, mistake: 'true only after processing index 2 — an off-by-one error.' },
            { text: 'best = 0, which is a safe starting value for any array.', correct: false, mistake: 'too weak / wrong: 0 is not the max of A[1..1] and fails on negative arrays.' }
          ]
        },
        {
          key: 'maint', label: 'Maintenance',
          prompt: 'Assume the invariant holds for i; show it holds for i + 1.',
          options: [
            { text: 'If A[i] > best we set best = A[i]; otherwise best is unchanged. Either way best = max(A[1..i]).', correct: true },
            { text: 'Each iteration advances i, so the prefix A[1..i-1] grows correctly.', correct: false, mistake: 'never uses the loop body (the compare-and-update) — maintenance must use what the body does.' },
            { text: 'best is the maximum of the whole array A, so it is the maximum of any prefix.', correct: false, mistake: 'true only after the loop, not during it — it assumes the postcondition.' }
          ]
        },
        {
          key: 'term', label: 'Termination',
          prompt: 'Use the invariant when the loop ends to prove the output is correct.',
          options: [
            { text: 'The loop ends at i = n + 1; the invariant gives best = max(A[1..n]), exactly the required output.', correct: true },
            { text: 'The for-loop runs a fixed n - 1 times, so it terminates.', correct: false, mistake: 'only argues that the loop halts — it never links the invariant to the returned value.' },
            { text: 'best is greater than A[1], so it is a valid maximum.', correct: false, mistake: 'too weak: being above A[1] does not make best the maximum of the array.' }
          ]
        }
      ]
    },
    {
      id: 'insertion',
      label: 'Insertion sort',
      pseudocode: [
        'INSERTION-SORT(A)',
        'for j = 2 to A.length',
        '    key = A[j]',
        '    i = j - 1',
        '    while i > 0 and A[i] > key',
        '        A[i + 1] = A[i]',
        '        i = i - 1',
        '    A[i + 1] = key'
      ],
      invariant: 'At the start of each for-loop iteration j, A[1..j-1] holds the original first j-1 elements, in sorted order.',
      phases: [
        {
          key: 'init', label: 'Initialization',
          prompt: 'Show the invariant holds before the first iteration (j = 2).',
          options: [
            { text: 'Before j = 2, A[1..1] is a single element — trivially sorted, and a permutation of the original A[1..1].', correct: true },
            { text: 'Before j = 2, the prefix A[1..1] is empty.', correct: false, mistake: 'factually wrong: A[1..1] contains exactly one element.' },
            { text: 'Before j = 2, A[1..2] is already sorted.', correct: false, mistake: 'true only after the first iteration — an off-by-one error.' }
          ]
        },
        {
          key: 'maint', label: 'Maintenance',
          prompt: 'Assume the invariant holds for j; show it holds for j + 1.',
          options: [
            { text: 'The while-loop shifts every element greater than key one place right, then drops key into the gap, so A[1..j] is sorted and a permutation of the original prefix.', correct: true },
            { text: 'The for-loop increases j, so the sorted prefix automatically grows.', correct: false, mistake: 'never uses the loop body (the shifting and insertion) — maintenance must use what the body does.' },
            { text: 'A[1..j-1] is sorted because the original array A was already sorted.', correct: false, mistake: 'assumes a precondition the problem never gives; the input is arbitrary.' }
          ]
        },
        {
          key: 'term', label: 'Termination',
          prompt: 'Use the invariant when the loop ends to prove the output is correct.',
          options: [
            { text: 'The loop ends at j = n + 1; the invariant gives A[1..n] sorted and a permutation of the input — a fully sorted array.', correct: true },
            { text: 'The for-loop terminates because j increases to A.length.', correct: false, mistake: 'only argues that the loop halts — it never connects the invariant to the postcondition "A is sorted".' },
            { text: 'A[1..n-1] is sorted, so the whole array is essentially sorted.', correct: false, mistake: 'too weak: it ignores A[n], so it does not prove the full array is sorted.' }
          ]
        }
      ]
    }
  ];

  liAlgo: LiAlgo = this.liAlgos[0];
  liChoice: Record<string, number> = {};

  liSelect(id: string): void {
    this.liAlgo = this.liAlgos.find(a => a.id === id) ?? this.liAlgos[0];
    this.liChoice = {};
  }

  liPick(phaseKey: string, optIdx: number): void { this.liChoice[phaseKey] = optIdx; }

  liStatus(phase: LiPhase): 'correct' | 'wrong' | null {
    const idx = this.liChoice[phase.key];
    if (idx === undefined) return null;
    return phase.options[idx].correct ? 'correct' : 'wrong';
  }

  liMistake(phase: LiPhase): string | null {
    const idx = this.liChoice[phase.key];
    if (idx === undefined) return null;
    return phase.options[idx].mistake ?? null;
  }

  get liSolved(): number {
    return this.liAlgo.phases.filter(p => this.liStatus(p) === 'correct').length;
  }
  get liComplete(): boolean { return this.liSolved === this.liAlgo.phases.length; }

  /* =====================================================================
   * L5 — GROWTH RATE EXPLORER
   * =================================================================== */
  readonly growthFns: GrowthFn[] = [
    { key: '1', label: '1', color: '#64748b', rank: 0, f: () => 1 },
    { key: 'loglogn', label: 'log log n', color: '#22d3ee', rank: 1, f: n => Math.max(0.1, Math.log2(Math.max(2, Math.log2(Math.max(2, n))))) },
    { key: 'logn', label: 'log n', color: '#38bdf8', rank: 2, f: n => Math.max(0.1, Math.log2(Math.max(2, n))) },
    { key: 'sqrtn', label: '√n', color: '#34d399', rank: 3, f: n => Math.sqrt(n) },
    { key: 'n', label: 'n', color: '#a3e635', rank: 4, f: n => n },
    { key: 'nlogn', label: 'n log n', color: '#facc15', rank: 5, f: n => n * Math.log2(Math.max(2, n)) },
    { key: 'n2', label: 'n²', color: '#fb923c', rank: 6, f: n => n * n },
    { key: 'n3', label: 'n³', color: '#f87171', rank: 7, f: n => n * n * n },
    { key: '2n', label: '2ⁿ', color: '#e879f9', rank: 8, f: n => Math.pow(2, n) },
    { key: 'nfact', label: 'n!', color: '#c084fc', rank: 9, f: n => { let p = 1; for (let k = 2; k <= n; k++) p *= k; return p; } }
  ];

  growthSelected = new Set<string>(['n', 'nlogn', 'n2', '2n']);
  readonly growthTableNs = [1, 4, 8, 16, 32, 64, 256, 1024];
  readonly growthPlotMaxN = 24;
  readonly growthPlotW = 640;
  readonly growthPlotH = 300;

  growthToggle(key: string): void {
    if (this.growthSelected.has(key)) {
      if (this.growthSelected.size > 1) this.growthSelected.delete(key);
    } else {
      this.growthSelected.add(key);
    }
  }

  get growthActiveFns(): GrowthFn[] {
    return this.growthFns.filter(f => this.growthSelected.has(f.key))
      .sort((a, b) => a.rank - b.rank);
  }

  private growthPlotCeil(): number {
    let max = 1;
    for (const fn of this.growthActiveFns) {
      const v = fn.f(this.growthPlotMaxN);
      if (isFinite(v) && v > max) max = v;
    }
    return Math.log10(max + 1);
  }

  growthPath(fn: GrowthFn): string {
    const ceil = this.growthPlotCeil();
    const padL = 46, padR = 16, padT = 14, padB = 30;
    const w = this.growthPlotW - padL - padR;
    const h = this.growthPlotH - padT - padB;
    const pts: string[] = [];
    for (let step = 0; step <= 60; step++) {
      const n = 1 + (step / 60) * (this.growthPlotMaxN - 1);
      const v = fn.f(n);
      const y = ceil > 0 ? Math.log10(Math.max(0.5, v) + 1) / ceil : 0;
      const px = padL + (step / 60) * w;
      const py = padT + h - Math.min(1, Math.max(0, y)) * h;
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return 'M' + pts.join(' L');
  }

  growthYTicks(): { y: number; label: string }[] {
    const ceil = this.growthPlotCeil();
    const padT = 14, padB = 30;
    const h = this.growthPlotH - padT - padB;
    const ticks: { y: number; label: string }[] = [];
    const maxPow = Math.ceil(ceil);
    const stepPow = Math.max(1, Math.ceil(maxPow / 5));
    for (let p = 0; p <= maxPow; p += stepPow) {
      const y = padT + h - (ceil > 0 ? (p / ceil) * h : 0);
      ticks.push({ y, label: p === 0 ? '1' : '10' + this.toSuper(p) });
    }
    return ticks;
  }

  private toSuper(n: number): string {
    const map: Record<string, string> = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
    return String(n).split('').map(c => map[c] ?? c).join('');
  }

  growthFmt(v: number): string {
    if (!isFinite(v)) return '∞';
    if (v >= 1e15) return '> 10¹⁵';
    if (v >= 1e9) {
      const exp = Math.floor(Math.log10(v));
      const mant = v / Math.pow(10, exp);
      return (Math.round(mant * 10) / 10) + '·10' + this.toSuper(exp);
    }
    if (v >= 1e6) return (Math.round(v / 1e5) / 10) + 'M';
    if (v >= 1e3) return (Math.round(v / 100) / 10) + 'k';
    if (v >= 10) return String(Math.round(v));
    return (Math.round(v * 10) / 10).toString();
  }

  growthCell(fn: GrowthFn, n: number): string { return this.growthFmt(fn.f(n)); }

  /* dominant-term detector */
  readonly domExamples: { id: string; expr: string; theta: string; why: string }[] = [
    { id: 'd1', expr: '3n² + 5n + 100', theta: 'Θ(n²)', why: 'The n² term dominates: for large n, 5n and 100 are negligible beside 3n². Constants (the 3) are dropped.' },
    { id: 'd2', expr: '7n + 2n log n + 40', theta: 'Θ(n log n)', why: 'n log n grows faster than n, which grows faster than the constant 40. The fastest-growing term wins.' },
    { id: 'd3', expr: '100n + 2ⁿ', theta: 'Θ(2ⁿ)', why: 'An exponential beats every polynomial. Even 100n is swallowed by 2ⁿ for large n.' },
    { id: 'd4', expr: '6n³ + 1000n²', theta: 'Θ(n³)', why: 'n³ dominates n² no matter how large the constant 1000 is — constants never change the growth class.' },
    { id: 'd5', expr: '50 + 8 log n', theta: 'Θ(log n)', why: 'log n grows without bound while 50 is fixed, so log n is the dominant term.' }
  ];
  domPick: string | null = null;

  /* O / Omega / Theta / o / omega cards */
  readonly boundCards: { sym: string; name: string; meaning: string; tone: string }[] = [
    { sym: 'O(g)', name: 'Big-O', meaning: 'Upper bound. f grows no faster than g: f(n) <= c·g(n) eventually. "At most."', tone: 'blue' },
    { sym: 'Ω(g)', name: 'Big-Omega', meaning: 'Lower bound. f grows no slower than g: f(n) >= c·g(n) eventually. "At least."', tone: 'gold' },
    { sym: 'Θ(g)', name: 'Big-Theta', meaning: 'Tight bound. f grows exactly like g: O(g) and Ω(g) hold together. "Same class."', tone: 'green' },
    { sym: 'o(g)', name: 'little-o', meaning: 'Strict upper bound. f grows strictly slower: f(n)/g(n) → 0. "Negligible against g."', tone: 'cyan' },
    { sym: 'ω(g)', name: 'little-omega', meaning: 'Strict lower bound. f grows strictly faster: f(n)/g(n) → ∞. "Dominates g."', tone: 'purple' }
  ];

  /* proof mode: f(n) = 3n^2 + 5n + 100 = O(n^2) */
  growthProofC = 6;
  growthProofN0 = 1;
  private growthProofF(n: number): number { return 3 * n * n + 5 * n + 100; }
  private growthProofBound(n: number): number { return this.growthProofC * n * n; }

  get growthProofRows(): { n: number; f: number; cn2: number; state: 'hold' | 'break' | 'below' }[] {
    const rows: { n: number; f: number; cn2: number; state: 'hold' | 'break' | 'below' }[] = [];
    for (const n of [1, 2, 5, 10, 20, 50]) {
      const f = this.growthProofF(n);
      const cn2 = this.growthProofBound(n);
      const state = n < this.growthProofN0 ? 'below' : (cn2 >= f ? 'hold' : 'break');
      rows.push({ n, f, cn2, state });
    }
    return rows;
  }

  get growthProofValid(): boolean {
    for (let n = this.growthProofN0; n <= 400; n++) {
      if (this.growthProofBound(n) < this.growthProofF(n)) return false;
    }
    return this.growthProofN0 >= 1;
  }

  get growthProofFirstFail(): number {
    for (let n = this.growthProofN0; n <= 400; n++) {
      if (this.growthProofBound(n) < this.growthProofF(n)) return n;
    }
    return -1;
  }

  /* =====================================================================
   * L6 — CASE ANALYSIS SIMULATOR
   * =================================================================== */
  caseAlgo: 'linear-search' | 'insertion-sort' = 'linear-search';
  caseInput: string | null = null;

  readonly caseInputs: { id: string; label: string; algos: string[] }[] = [
    { id: 'first', label: 'Target is first', algos: ['linear-search'] },
    { id: 'last', label: 'Target is last', algos: ['linear-search'] },
    { id: 'absent', label: 'Target absent', algos: ['linear-search'] },
    { id: 'middle', label: 'Target in the middle', algos: ['linear-search'] },
    { id: 'sorted', label: 'Already sorted', algos: ['insertion-sort'] },
    { id: 'reverse', label: 'Reverse sorted', algos: ['insertion-sort'] },
    { id: 'nearly', label: 'Nearly sorted', algos: ['insertion-sort'] },
    { id: 'random', label: 'Random order', algos: ['insertion-sort'] }
  ];

  private readonly caseN = 8;

  readonly caseData: Record<string, Record<string, CaseCell>> = {
    'linear-search': {
      first: { ops: 1, cls: 'best', formula: 'T(n) = Θ(1)', rule: 'Best case = the minimum cost over all inputs of size n.', why: 'The target sits at index 1, so a single comparison succeeds. No input of this size can do fewer comparisons.' },
      middle: { ops: 4, cls: 'average', formula: 'T(n) ≈ Θ(n/2) = Θ(n)', rule: 'Average case = expected cost over a distribution of inputs.', why: 'A target equally likely at any index needs (n+1)/2 comparisons on average. That is still Θ(n) — half of a linear scan.' },
      last: { ops: 8, cls: 'worst', formula: 'T(n) = Θ(n)', rule: 'Worst case = the maximum cost over all inputs of size n.', why: 'The target is the very last element, so all n comparisons are made before it is found.' },
      absent: { ops: 8, cls: 'worst', formula: 'T(n) = Θ(n)', rule: 'Worst case = the maximum cost over all inputs of size n.', why: 'No element matches, so the algorithm must inspect all n elements to be certain — the same cost as the last-element case.' }
    },
    'insertion-sort': {
      sorted: { ops: 7, cls: 'best', formula: 'T(n) = Θ(n)', rule: 'Best case = the minimum cost over all inputs of size n.', why: 'Every while-guard fails on its first test, so 0 shifts occur. Only n-1 comparisons total — a linear scan.' },
      nearly: { ops: 11, cls: 'average', formula: 'T(n) = Θ(n + I)', rule: 'Input-sensitive case: cost depends on the inversion count I.', why: 'A nearly-sorted array has few inversions I, so few shifts. The running time Θ(n + I) sits between best and worst.' },
      random: { ops: 21, cls: 'average', formula: 'T(n) = Θ(n²)', rule: 'Average case = expected cost over uniformly random permutations.', why: 'A random permutation has about n²/4 inversions on average, so insertion sort averages Θ(n²) — only a constant factor below the worst case.' },
      reverse: { ops: 28, cls: 'worst', formula: 'T(n) = Θ(n²)', rule: 'Worst case = the maximum cost over all inputs of size n.', why: 'A reverse-sorted array has the maximum n(n-1)/2 inversions, so every element shifts past the whole prefix.' }
    }
  };

  selectCaseAlgo(algo: 'linear-search' | 'insertion-sort'): void {
    this.caseAlgo = algo;
    this.caseInput = null;
  }

  get caseAvailableInputs() {
    return this.caseInputs.filter(i => i.algos.includes(this.caseAlgo));
  }

  get caseCell(): CaseCell | null {
    if (!this.caseInput) return null;
    return this.caseData[this.caseAlgo][this.caseInput] ?? null;
  }

  get caseBars(): { id: string; label: string; ops: number; cls: CaseClass; active: boolean }[] {
    const cells = this.caseData[this.caseAlgo];
    return this.caseAvailableInputs.map(inp => ({
      id: inp.id,
      label: inp.label,
      ops: cells[inp.id]?.ops ?? 0,
      cls: cells[inp.id]?.cls ?? 'na',
      active: this.caseInput === inp.id
    }));
  }

  get caseMaxOps(): number {
    return Math.max(...this.caseBars.map(b => b.ops), 1);
  }

  caseBarPct(ops: number): number { return Math.round((ops / this.caseMaxOps) * 100); }

  /* =====================================================================
   * L7 — PLANE SWEEP TASTE
   * =================================================================== */
  readonly sweepPoints: SweepPoint[] = [
    { x: 38, y: 150, id: 1 }, { x: 86, y: 70, id: 2 }, { x: 120, y: 196, id: 3 },
    { x: 165, y: 116, id: 4 }, { x: 210, y: 168, id: 5 }, { x: 252, y: 84, id: 6 },
    { x: 300, y: 142, id: 7 }, { x: 344, y: 56, id: 8 }, { x: 384, y: 188, id: 9 }
  ];
  sweepStep = 0;

  get sweepVisited(): SweepPoint[] { return this.sweepPoints.slice(0, this.sweepStep); }
  get sweepDone(): boolean { return this.sweepStep >= this.sweepPoints.length; }

  get sweepX(): number {
    if (this.sweepStep === 0) return 20;
    return this.sweepPoints[Math.min(this.sweepStep, this.sweepPoints.length) - 1].x;
  }

  get sweepDelta(): number {
    const pts = this.sweepVisited;
    if (pts.length < 2) return Infinity;
    let min = Infinity;
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++) {
        const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
        if (d < min) min = d;
      }
    return min;
  }

  get sweepDeltaLabel(): string {
    const d = this.sweepDelta;
    return isFinite(d) ? d.toFixed(0) : '∞';
  }

  get sweepActiveSet(): SweepPoint[] {
    const pts = this.sweepVisited;
    if (pts.length < 2) return pts;
    const last = pts[pts.length - 1];
    const delta = this.sweepDelta;
    return pts.filter(p => last.x - p.x <= delta);
  }

  /* naive: every new point compares against ALL earlier points */
  get sweepNaiveComparisons(): number {
    const k = this.sweepVisited.length;
    return (k * (k - 1)) / 2;
  }

  /* sweep: every new point compares only against the active strip */
  sweepStripComparisons = 0;

  get sweepNaiveFull(): number {
    const n = this.sweepPoints.length;
    return (n * (n - 1)) / 2;
  }

  sweepNext(): void {
    if (this.sweepDone) return;
    this.sweepStep++;
    this.sweepStripComparisons += Math.max(0, this.sweepActiveSet.length - 1);
  }

  sweepReset(): void { this.sweepStep = 0; this.sweepStripComparisons = 0; }

  sweepInStrip(p: SweepPoint): boolean { return this.sweepActiveSet.some(a => a.id === p.id); }

  /* =====================================================================
   * L8 — COMPLEXITY MATCH GAME
   * =================================================================== */
  readonly cmBuckets = ['Θ(1)', 'Θ(log n)', 'Θ(n)', 'Θ(n log n)', 'Θ(n²)'];
  readonly cmAlgos: CmAlgo[] = [
    { id: 'a1', label: 'Linear search, worst case', sub: 'scan A[1..n] for v', correct: 'Θ(n)', why: 'One pass over all n elements when v is last or absent.' },
    { id: 'a2', label: 'Binary search', sub: 'sorted array, halve the interval', correct: 'Θ(log n)', why: 'Each step discards half the interval, so log₂ n steps suffice.' },
    { id: 'a3', label: 'Insertion sort, reverse input', sub: 'every element shifts fully', correct: 'Θ(n²)', why: 'n(n-1)/2 shifts — the maximum inversion count.' },
    { id: 'a4', label: 'Insertion sort, sorted input', sub: 'no shifts needed', correct: 'Θ(n)', why: 'Every while-guard fails immediately: n-1 comparisons, 0 shifts.' },
    { id: 'a5', label: 'Push onto a stack', sub: 'one operation, no scan', correct: 'Θ(1)', why: 'A single write at the top — independent of n.' },
    { id: 'a6', label: 'Merge sort', sub: 'split, recurse, merge', correct: 'Θ(n log n)', why: 'log n levels, each doing Θ(n) merge work.' },
    { id: 'a7', label: 'Plane-sweep closest pair', sub: 'sort + active-set queries', correct: 'Θ(n log n)', why: 'Sorting is n log n; each strip query is O(log n) with a balanced BST.' },
    { id: 'a8', label: 'Sum of an array', sub: 'one accumulator pass', correct: 'Θ(n)', why: 'Exactly n additions, then return.' }
  ];

  cmActive: string | null = null;
  cmAssign: Record<string, string> = {};
  cmChecked = false;

  cmPick(id: string): void {
    if (this.cmChecked) return;
    this.cmActive = this.cmActive === id ? null : id;
  }
  cmDrop(bucket: string): void {
    if (this.cmChecked || !this.cmActive) return;
    this.cmAssign[this.cmActive] = bucket;
    this.cmActive = null;
  }
  cmCheck(): void { this.cmChecked = true; }
  cmReset(): void { this.cmActive = null; this.cmAssign = {}; this.cmChecked = false; }

  get cmAssigned(): number { return Object.keys(this.cmAssign).length; }
  get cmCorrect(): number {
    return this.cmAlgos.filter(a => this.cmAssign[a.id] === a.correct).length;
  }
  cmState(id: string): 'correct' | 'wrong' | null {
    if (!this.cmChecked || this.cmAssign[id] === undefined) return null;
    const algo = this.cmAlgos.find(a => a.id === id);
    return algo && this.cmAssign[id] === algo.correct ? 'correct' : 'wrong';
  }

  /* =====================================================================
   * L8 — INVERSION COUNTER
   * =================================================================== */
  invInput = '4 1 5 2 6 3';

  get invArr(): number[] {
    return this.invInput.split(/[\s,]+/).map(Number).filter(x => !isNaN(x)).slice(0, 9);
  }

  get invPairs(): { i: number; j: number }[] {
    const arr = this.invArr;
    const out: { i: number; j: number }[] = [];
    for (let i = 0; i < arr.length; i++)
      for (let j = i + 1; j < arr.length; j++)
        if (arr[i] > arr[j]) out.push({ i, j });
    return out;
  }

  get invCount(): number { return this.invPairs.length; }
  get invMax(): number { const n = this.invArr.length; return (n * (n - 1)) / 2; }

  invX(idx: number): number { return 40 + idx * 56; }
  invSvgWidth(): number { return Math.max(360, 60 + this.invArr.length * 56); }

  invArc(p: { i: number; j: number }): string {
    const x1 = this.invX(p.i), x2 = this.invX(p.j);
    const r = (x2 - x1) / 2;
    return `M ${x1} 64 A ${r} ${Math.min(r, 42)} 0 0 1 ${x2} 64`;
  }

  get invRuntime(): { tag: string; text: string } {
    const n = this.invArr.length, I = this.invCount, max = this.invMax;
    if (I === 0) return { tag: 'Θ(n) — best case', text: 'Zero inversions: the array is already sorted. Insertion sort does 0 shifts and runs in linear time.' };
    if (I === max) return { tag: 'Θ(n²) — worst case', text: `${I} inversions is the maximum for length ${n}. This is the reverse-sorted worst case.` };
    return { tag: 'Θ(n + I)', text: `Insertion sort performs exactly I = ${I} shifts on this array — one shift per inversion. Its running time is Θ(n + I).` };
  }

  /* =====================================================================
   * L8 — PROOF ERROR FINDER
   * =================================================================== */
  readonly pefScenarios: PefScenario[] = [
    {
      algo: 'INSERTION-SORT',
      invariant: 'At the start of iteration j, A[1..j-1] is in sorted order.',
      invariantNote: '(notice what this invariant does NOT say)',
      steps: [
        { id: 'init', label: 'Initialization', text: 'Before j = 2, A[1..1] has one element, which is trivially sorted.' },
        { id: 'maint', label: 'Maintenance', text: 'The while-loop shifts larger elements right and drops key into the gap, so A[1..j] is sorted.' },
        { id: 'term', label: 'Termination', text: 'After j = n, A[1..n] is sorted, so the array is sorted.' }
      ],
      errorStep: 'invariant',
      category: 'Invariant too weak',
      errorExplain: 'All three steps are valid for the invariant as written — that is exactly the trap. The invariant only says A[1..j-1] is "sorted". A buggy algorithm that overwrites every element with 0 also keeps A[1..j-1] sorted! The invariant must also say A[1..j-1] is a permutation of the original first j-1 elements. A too-weak invariant proves a too-weak theorem.'
    },
    {
      algo: 'MAXIMUM (largest element)',
      invariant: 'At the start of iteration i, best holds the maximum of A[1..i-1].',
      steps: [
        { id: 'init', label: 'Initialization', text: 'Before i = 2, best = A[1], and the maximum of A[1..1] is A[1].' },
        { id: 'maint', label: 'Maintenance', text: 'If A[i] < best, set best = A[i]; otherwise keep best. So best holds the maximum of A[1..i].' },
        { id: 'term', label: 'Termination', text: 'After the loop, best holds the maximum of A[1..n], the required output.' }
      ],
      errorStep: 'maint',
      category: 'Maintenance step is false',
      errorExplain: 'The maintenance step has the comparison reversed. "If A[i] < best, set best = A[i]" computes the MINIMUM, not the maximum. To find the maximum the body must update when A[i] > best. A trace on [3, 7, 2] with this bug ends with best = 2. The maintenance argument must faithfully match what the loop body actually does.'
    },
    {
      algo: 'BINARY-SEARCH',
      invariant: 'At the start of each while-iteration, if v is in A then v is in A[lo..hi].',
      steps: [
        { id: 'init', label: 'Initialization', text: 'Before the loop, lo = 1 and hi = n, so A[lo..hi] is the whole array.' },
        { id: 'maint', label: 'Maintenance', text: 'After computing mid: if A[mid] < v set lo = mid + 1; if A[mid] > v set hi = mid - 1. The invariant is preserved.' },
        { id: 'term', label: 'Termination', text: 'When lo > hi the interval is empty, so we return mid, the last midpoint computed.' }
      ],
      errorStep: 'term',
      category: 'Termination ignores the invariant',
      errorExplain: 'The termination step contradicts the invariant. When lo > hi the interval A[lo..hi] is empty, so by the invariant v cannot be in A — the correct return is NIL, not the last mid. Returning mid would falsely claim A contains v. Termination must USE the invariant to justify the output, not invent a new answer.'
    },
    {
      algo: 'SUM-ARRAY',
      invariant: 'After the loop ends, sum equals A[1] + ... + A[n].',
      invariantNote: '(look closely at WHEN this is asserted)',
      steps: [
        { id: 'init', label: 'Initialization', text: 'We cannot check the invariant before the first iteration — it only talks about "after the loop ends".' },
        { id: 'maint', label: 'Maintenance', text: 'We cannot show maintenance either: the invariant says nothing about a partial prefix during the loop.' },
        { id: 'term', label: 'Termination', text: 'After the loop, sum = A[1] + ... + A[n], so the invariant holds.' }
      ],
      errorStep: 'invariant',
      category: 'Invariant true only after the loop',
      errorExplain: 'This "invariant" is really just the postcondition. A loop invariant must be checkable at the START of every iteration — initialization and maintenance both need it to hold mid-loop. The fix: state it as "before iteration i, sum = A[1] + ... + A[i-1]". Then all three phases have something to prove.'
    }
  ];

  pefIndex = 0;
  pefSelected: 'init' | 'maint' | 'term' | 'invariant' | null = null;
  pefRevealed = false;

  get pefScenario(): PefScenario { return this.pefScenarios[this.pefIndex]; }
  pefPick(choice: 'init' | 'maint' | 'term' | 'invariant'): void {
    if (this.pefRevealed) return;
    this.pefSelected = choice;
  }
  pefReveal(): void { if (this.pefSelected) this.pefRevealed = true; }
  pefNext(): void {
    this.pefIndex = (this.pefIndex + 1) % this.pefScenarios.length;
    this.pefSelected = null;
    this.pefRevealed = false;
  }
  get pefCorrect(): boolean | null {
    if (!this.pefRevealed || !this.pefSelected) return null;
    return this.pefSelected === this.pefScenario.errorStep;
  }
}
