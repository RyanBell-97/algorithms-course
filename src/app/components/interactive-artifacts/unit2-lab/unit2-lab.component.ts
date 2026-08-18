import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type MethodId = 'iteration' | 'tree' | 'substitution' | 'transform' | 'master';

interface RuleLine {
  id: string;
  text: string;
}

interface IterationPreset {
  id: string;
  label: string;
  recurrence: string;
  baseCase: string;
  steps: { title: string; expression: string; rule: string; active: string }[];
  series: string;
  closed: string;
  theta: string;
  trap: string;
}

interface RecurrencePreset {
  id: string;
  label: string;
  recurrence: string;
  a: number;
  b: number;
  k: number;
  fLabel: string;
  example: string;
}

interface TreeLevel {
  level: number;
  nodes: number;
  displayNodes: number;
  compressed: boolean;
  size: string;
  perNode: string;
  total: string;
  trend: 'root' | 'flat' | 'leaf';
}

interface ProofScenario {
  id: string;
  label: string;
  recurrence: string;
  claim: string;
  answer: string;
  steps: { phase: string; statement: string; active: string; note: string }[];
  mistakes: { label: string; fix: string }[];
}

interface TransformScenario {
  id: string;
  label: string;
  original: string;
  substitution: string;
  transformed: string;
  solved: string;
  back: string;
  rows: { item: string; before: string; after: string }[];
}

interface ReviewProblem {
  id: string;
  recurrence: string;
  method: MethodId;
  answer: string;
  why: string;
}

@Component({
  selector: 'app-unit2-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit2-lab.component.html',
  styleUrls: ['./unit2-lab.component.scss']
})
export class Unit2LabComponent implements OnChanges {
  @Input() artifact = '';

  ngOnChanges(): void {
    this.resetForArtifact();
  }

  private resetForArtifact(): void {
    this.iterIdx = 0;
    this.iterStep = 0;
    this.treeIdx = 0;
    this.treeLevel = 0;
    this.proofIdx = 0;
    this.proofStep = 0;
    this.transformIdx = 0;
    this.transformStep = 0;
    this.mtA = 2;
    this.mtB = 2;
    this.mtK = 1;
    this.mtLogPower = 0;
    this.mtChecked = false;
    this.reviewAnswers = {};
    this.reviewChecked = false;
  }

  readonly methodNames: Record<MethodId, string> = {
    iteration: 'Iteration / unrolling',
    tree: 'Recursion tree',
    substitution: 'Substitution proof',
    transform: 'Variable transform',
    master: 'Master theorem'
  };

  readonly sourceRules: RuleLine[] = [
    { id: 'base', text: '1. Identify the base case and the stopping depth.' },
    { id: 'expand', text: '2. Replace recursive T(...) terms using the same recurrence.' },
    { id: 'collect', text: '3. Collect non-recursive work into a level sum or series.' },
    { id: 'solve-sum', text: '4. Evaluate the arithmetic/geometric/logarithmic sum.' },
    { id: 'theta', text: '5. Drop constants and lower-order terms to state Theta.' }
  ];

  /* ------------------------------------------------------------------
   * L1: iteration / unrolling
   * ------------------------------------------------------------------ */
  readonly iterationPresets: IterationPreset[] = [
    {
      id: 'linear-sum',
      label: 'T(n) = T(n-1) + n',
      recurrence: 'T(n) = T(n - 1) + n',
      baseCase: 'T(1) = c',
      steps: [
        { title: 'Start', expression: 'T(n) = T(n - 1) + n', rule: 'The recurrence says: solve size n-1, then pay n work.', active: 'expand' },
        { title: 'First substitution', expression: 'T(n) = T(n - 2) + (n - 1) + n', rule: 'Replace T(n-1) by T(n-2) + (n-1).', active: 'expand' },
        { title: 'After i substitutions', expression: 'T(n) = T(n - i) + (n - i + 1) + ... + (n - 1) + n', rule: 'The added terms form the tail of the arithmetic series.', active: 'collect' },
        { title: 'Stop at the base case', expression: 'T(n) = T(1) + 2 + 3 + ... + n', rule: 'Stop when n - i = 1, so i = n - 1.', active: 'base' },
        { title: 'Evaluate the sum', expression: 'T(n) = c + sum_{k=2}^{n} k = n(n + 1)/2 + O(1)', rule: 'Use the arithmetic-series identity.', active: 'solve-sum' },
        { title: 'Asymptotic result', expression: 'T(n) = Theta(n^2)', rule: 'The n^2 term dominates.', active: 'theta' }
      ],
      series: '1 + 2 + ... + n = n(n + 1)/2',
      closed: 'n(n + 1)/2 + O(1)',
      theta: 'Theta(n^2)',
      trap: 'Do not write Theta(n) just because there are n substitutions. Each substitution contributes a different amount of work.'
    },
    {
      id: 'geometric',
      label: 'T(n) = 2T(n/2) + 1',
      recurrence: 'T(n) = 2T(n / 2) + 1',
      baseCase: 'T(1) = c',
      steps: [
        { title: 'Start', expression: 'T(n) = 2T(n/2) + 1', rule: 'Two subproblems of half size, plus constant work.', active: 'expand' },
        { title: 'First substitution', expression: 'T(n) = 4T(n/4) + 2 + 1', rule: 'Each of the two T(n/2) terms expands again.', active: 'expand' },
        { title: 'After i substitutions', expression: 'T(n) = 2^i T(n / 2^i) + (2^i - 1)', rule: 'The constants form 1 + 2 + 4 + ... + 2^{i-1}.', active: 'collect' },
        { title: 'Stop at leaves', expression: 'n / 2^i = 1, so i = lg n', rule: 'The tree depth is lg n.', active: 'base' },
        { title: 'Evaluate', expression: 'T(n) = nT(1) + (n - 1)', rule: 'Substitute 2^i = n.', active: 'solve-sum' },
        { title: 'Asymptotic result', expression: 'T(n) = Theta(n)', rule: 'The total number of leaves is n.', active: 'theta' }
      ],
      series: '1 + 2 + 4 + ... + n/2 = n - 1',
      closed: 'nT(1) + n - 1',
      theta: 'Theta(n)',
      trap: 'The depth is lg n, but the number of leaves is n. The leaves dominate here.'
    },
    {
      id: 'squares',
      label: 'T(n) = T(n-1) + n^2',
      recurrence: 'T(n) = T(n - 1) + n^2',
      baseCase: 'T(1) = c',
      steps: [
        { title: 'Start', expression: 'T(n) = T(n - 1) + n^2', rule: 'The current level pays n^2 work.', active: 'expand' },
        { title: 'First substitution', expression: 'T(n) = T(n - 2) + (n - 1)^2 + n^2', rule: 'Replace T(n-1) with its recurrence.', active: 'expand' },
        { title: 'Pattern', expression: 'T(n) = T(n - i) + (n - i + 1)^2 + ... + n^2', rule: 'The terms form a sum of squares.', active: 'collect' },
        { title: 'Base case', expression: 'T(n) = T(1) + 2^2 + 3^2 + ... + n^2', rule: 'Stop when n - i = 1.', active: 'base' },
        { title: 'Evaluate', expression: 'T(n) = sum_{k=1}^{n} k^2 = n(n+1)(2n+1)/6', rule: 'Use the sum-of-squares identity.', active: 'solve-sum' },
        { title: 'Asymptotic result', expression: 'T(n) = Theta(n^3)', rule: 'The cubic term dominates.', active: 'theta' }
      ],
      series: '1^2 + 2^2 + ... + n^2 = n(n+1)(2n+1)/6',
      closed: 'n(n+1)(2n+1)/6 + O(1)',
      theta: 'Theta(n^3)',
      trap: 'The last term is n^2, but the sum of n squared terms grows as n^3.'
    }
  ];
  iterIdx = 0;
  iterStep = 0;

  get iterPreset(): IterationPreset { return this.iterationPresets[this.iterIdx]; }
  get iterFrame() { return this.iterPreset.steps[this.iterStep]; }
  iterSelect(index: number): void { this.iterIdx = index; this.iterStep = 0; }
  iterPrev(): void { this.iterStep = Math.max(0, this.iterStep - 1); }
  iterNext(): void { this.iterStep = Math.min(this.iterPreset.steps.length - 1, this.iterStep + 1); }
  iterReset(): void { this.iterStep = 0; }

  /* ------------------------------------------------------------------
   * L2: recursion tree
   * ------------------------------------------------------------------ */
  readonly treePresets: RecurrencePreset[] = [
    { id: 'merge', label: 'Merge sort', recurrence: 'T(n) = 2T(n/2) + n', a: 2, b: 2, k: 1, fLabel: 'n', example: 'Uniform: each level costs n.' },
    { id: 'binary', label: 'Binary search', recurrence: 'T(n) = T(n/2) + 1', a: 1, b: 2, k: 0, fLabel: '1', example: 'Uniform in constant work per level: lg n levels.' },
    { id: 'root-heavy', label: 'Root-heavy', recurrence: 'T(n) = 3T(n/4) + n^2', a: 3, b: 4, k: 2, fLabel: 'n^2', example: 'Work shrinks by 3/16 each level.' },
    { id: 'leaf-heavy', label: 'Leaf-heavy', recurrence: 'T(n) = 4T(n/2) + n', a: 4, b: 2, k: 1, fLabel: 'n', example: 'Work doubles each level; leaves dominate.' },
    { id: 'strassen', label: 'Strassen shape', recurrence: 'T(n) = 7T(n/2) + n^2', a: 7, b: 2, k: 2, fLabel: 'n^2', example: 'Leaf-heavy: n^(lg 7) dominates n^2.' }
  ];
  treeIdx = 0;
  treeLevel = 0;

  get treePreset(): RecurrencePreset { return this.treePresets[this.treeIdx]; }
  get treeCritical(): number { return Math.log(this.treePreset.a) / Math.log(this.treePreset.b); }
  get treeRatio(): number { return this.treePreset.a / Math.pow(this.treePreset.b, this.treePreset.k); }
  get treePattern(): 'root' | 'flat' | 'leaf' {
    const r = this.treeRatio;
    if (Math.abs(r - 1) < 0.0001) return 'flat';
    return r < 1 ? 'root' : 'leaf';
  }
  get treeAnswer(): string {
    const p = this.treePreset;
    const c = this.treeCritical;
    if (p.k < c - 0.0001) return `Theta(n^${this.round(c)}) -- leaves dominate.`;
    if (Math.abs(p.k - c) < 0.0001) {
      return p.k === 0 ? 'Theta(log n) -- one constant-cost level per depth.' : `Theta(${p.fLabel} log n) -- every level has the same cost.`;
    }
    return `Theta(${p.fLabel}) -- the root-level work dominates.`;
  }
  get treeLevels(): TreeLevel[] {
    const p = this.treePreset;
    const levels: TreeLevel[] = [];
    for (let i = 0; i <= 5; i++) {
      const nodes = Math.pow(p.a, i);
      const denominator = Math.pow(p.b, i);
      const ratioPow = Math.pow(this.treeRatio, i);
      const trend = this.treePattern;
      levels.push({
        level: i,
        nodes,
        displayNodes: Math.min(nodes, 18),
        compressed: nodes > 18,
        size: i === 0 ? 'n' : `n/${denominator}`,
        perNode: p.k === 0 ? '1' : (i === 0 ? p.fLabel : `(n/${denominator})^${p.k}`),
        total: this.levelCostLabel(i, ratioPow),
        trend
      });
    }
    return levels;
  }
  get treeVisibleLevels(): TreeLevel[] { return this.treeLevels.slice(0, this.treeLevel + 1); }
  treeSelect(index: number): void { this.treeIdx = index; this.treeLevel = 0; }
  treePrev(): void { this.treeLevel = Math.max(0, this.treeLevel - 1); }
  treeNext(): void { this.treeLevel = Math.min(5, this.treeLevel + 1); }
  treeReset(): void { this.treeLevel = 0; }

  treeNodeX(level: TreeLevel, idx: number): number {
    const count = level.displayNodes;
    return 34 + (idx + 0.5) * (432 / Math.max(1, count));
  }
  treeNodeY(level: TreeLevel): number { return 34 + level.level * 54; }
  treeNodeR(level: TreeLevel): number { return level.displayNodes > 12 ? 9 : 13; }
  nodeSlots(count: number): number[] { return Array.from({ length: count }, (_, i) => i); }

  private levelCostLabel(i: number, ratioPow: number): string {
    const p = this.treePreset;
    if (i === 0) return p.fLabel;
    if (this.treePattern === 'flat') return p.fLabel === '1' ? '1' : p.fLabel;
    if (p.k === 0) return `${Math.pow(p.a, i)}`;
    return `${p.fLabel} * ${this.round(ratioPow)}`;
  }

  /* ------------------------------------------------------------------
   * L3: substitution proof
   * ------------------------------------------------------------------ */
  readonly proofScenarios: ProofScenario[] = [
    {
      id: 'merge-proof',
      label: 'Merge-sort upper bound',
      recurrence: 'T(n) = 2T(n/2) + n',
      claim: 'Claim: T(n) <= c n lg n for a sufficiently large c.',
      answer: 'T(n) = O(n lg n). A matching tree lower bound gives Theta(n lg n).',
      steps: [
        { phase: 'Guess', statement: 'Use the recursion tree: every level costs n and there are lg n levels.', active: 'guess', note: 'The tree gives the shape n lg n.' },
        { phase: 'Induction hypothesis', statement: 'Assume T(k) <= c k lg k for every smaller k.', active: 'ih', note: 'Strong induction applies to recursive subproblem sizes.' },
        { phase: 'Substitute', statement: 'T(n) <= 2[c(n/2)lg(n/2)] + n = c n lg n - c n + n.', active: 'sub', note: 'The active source of truth is the recurrence line.' },
        { phase: 'Choose constants', statement: 'If c >= 1, then -c n + n <= 0, so T(n) <= c n lg n.', active: 'constant', note: 'The negative slack absorbs the +n.' },
        { phase: 'Base range', statement: 'Increase c if needed so the claim holds for all small n.', active: 'base', note: 'Never skip base cases in a formal proof.' }
      ],
      mistakes: [
        { label: 'Forgetting the -c n slack', fix: 'Use lg(n/2) = lg n - 1. That subtraction is what absorbs the +n.' },
        { label: 'Claiming Theta from one upper proof', fix: 'An O proof is only an upper bound. Add a lower bound from the recursion tree.' }
      ]
    },
    {
      id: 'linear-proof',
      label: 'Arithmetic-series upper bound',
      recurrence: 'T(n) = T(n-1) + n',
      claim: 'Claim: T(n) <= c n^2.',
      answer: 'T(n) = O(n^2), and iteration gives Theta(n^2).',
      steps: [
        { phase: 'Guess', statement: 'Unrolling gives 1 + 2 + ... + n, so guess n^2.', active: 'guess', note: 'Iteration supplies the target form.' },
        { phase: 'Induction hypothesis', statement: 'Assume T(n-1) <= c(n-1)^2.', active: 'ih', note: 'Only the smaller argument n-1 is allowed.' },
        { phase: 'Substitute', statement: 'T(n) <= c(n-1)^2 + n = c n^2 - 2cn + c + n.', active: 'sub', note: 'Expand carefully; this is where algebra errors happen.' },
        { phase: 'Choose constants', statement: 'For c >= 1 and n large enough, -2cn + c + n <= 0.', active: 'constant', note: 'The negative linear term absorbs the extra +n.' },
        { phase: 'Conclusion', statement: 'Therefore T(n) <= c n^2 for all sufficiently large n.', active: 'base', note: 'Small n are handled by increasing c.' }
      ],
      mistakes: [
        { label: 'Using T(n) in the IH', fix: 'The IH only applies to smaller arguments, here T(n-1).' },
        { label: 'Ignoring base range', fix: 'State that c is chosen large enough for the finite base range.' }
      ]
    },
    {
      id: 'unequal-proof',
      label: 'Unequal split upper bound',
      recurrence: 'T(n) = T(n/3) + T(2n/3) + n',
      claim: 'Claim: T(n) <= c n lg n.',
      answer: 'T(n) = O(n lg n); the split is unequal, so standard Master theorem does not apply.',
      steps: [
        { phase: 'Guess', statement: 'The recursion tree has O(lg n) levels and each level costs at most n.', active: 'guess', note: 'The tree still gives the right guess.' },
        { phase: 'Induction hypothesis', statement: 'Assume the claim for n/3 and 2n/3.', active: 'ih', note: 'Both subproblem sizes are smaller than n.' },
        { phase: 'Substitute', statement: 'T(n) <= c(n/3)lg(n/3) + c(2n/3)lg(2n/3) + n.', active: 'sub', note: 'The two recursive terms keep their own sizes.' },
        { phase: 'Slack term', statement: 'This equals c n lg n - c n[lg 3 - (2/3)lg 2] + n.', active: 'constant', note: 'The bracket is a positive constant.' },
        { phase: 'Choose c', statement: 'Choose c large enough that the negative slack absorbs +n.', active: 'base', note: 'This is the same lower-order trick as merge sort, but with a different constant.' }
      ],
      mistakes: [
        { label: 'Applying standard Master theorem', fix: 'The subproblems are n/3 and 2n/3, not a copies of n/b.' },
        { label: 'Replacing both subproblems by n/2', fix: 'That changes the recurrence. Keep n/3 and 2n/3 in the proof.' }
      ]
    }
  ];
  proofIdx = 0;
  proofStep = 0;
  get proofScenario(): ProofScenario { return this.proofScenarios[this.proofIdx]; }
  get proofFrame() { return this.proofScenario.steps[this.proofStep]; }
  proofSelect(index: number): void { this.proofIdx = index; this.proofStep = 0; }
  proofPrev(): void { this.proofStep = Math.max(0, this.proofStep - 1); }
  proofNext(): void { this.proofStep = Math.min(this.proofScenario.steps.length - 1, this.proofStep + 1); }

  /* ------------------------------------------------------------------
   * L4: variable transformation
   * ------------------------------------------------------------------ */
  readonly transformScenarios: TransformScenario[] = [
    {
      id: 'sqrt-one',
      label: 'T(n) = T(sqrt(n)) + 1',
      original: 'T(n) = T(sqrt(n)) + 1',
      substitution: 'Let m = lg n and S(m) = T(2^m).',
      transformed: 'S(m) = S(m/2) + 1',
      solved: 'S(m) = Theta(lg m)',
      back: 'T(n) = Theta(lg lg n)',
      rows: [
        { item: 'n', before: 'n', after: '2^m' },
        { item: 'sqrt(n)', before: 'sqrt(n)', after: '2^(m/2)' },
        { item: 'T(sqrt(n))', before: 'T(sqrt(n))', after: 'S(m/2)' },
        { item: 'constant work', before: '+ 1', after: '+ 1' }
      ]
    },
    {
      id: 'sqrt-merge',
      label: 'T(n) = 2T(sqrt(n)) + lg n',
      original: 'T(n) = 2T(sqrt(n)) + lg n',
      substitution: 'Let m = lg n and S(m) = T(2^m).',
      transformed: 'S(m) = 2S(m/2) + m',
      solved: 'S(m) = Theta(m lg m)',
      back: 'T(n) = Theta(lg n * lg lg n)',
      rows: [
        { item: 'n', before: 'n', after: '2^m' },
        { item: 'sqrt(n)', before: 'sqrt(n)', after: '2^(m/2)' },
        { item: 'T(sqrt(n))', before: 'T(sqrt(n))', after: 'S(m/2)' },
        { item: 'lg n', before: 'lg n', after: 'm' }
      ]
    },
    {
      id: 'cube-root',
      label: 'T(n) = T(n^(1/3)) + 1',
      original: 'T(n) = T(n^(1/3)) + 1',
      substitution: 'Let m = lg n and S(m) = T(2^m).',
      transformed: 'S(m) = S(m/3) + 1',
      solved: 'S(m) = Theta(log_3 m)',
      back: 'T(n) = Theta(lg lg n)',
      rows: [
        { item: 'n', before: 'n', after: '2^m' },
        { item: 'n^(1/3)', before: 'n^(1/3)', after: '2^(m/3)' },
        { item: 'T(n^(1/3))', before: 'T(n^(1/3))', after: 'S(m/3)' },
        { item: 'constant work', before: '+ 1', after: '+ 1' }
      ]
    }
  ];
  transformIdx = 0;
  transformStep = 0;
  get transformScenario(): TransformScenario { return this.transformScenarios[this.transformIdx]; }
  transformSelect(index: number): void { this.transformIdx = index; this.transformStep = 0; }
  transformPrev(): void { this.transformStep = Math.max(0, this.transformStep - 1); }
  transformNext(): void { this.transformStep = Math.min(4, this.transformStep + 1); }

  /* ------------------------------------------------------------------
   * L5: Master theorem classifier
   * ------------------------------------------------------------------ */
  mtA = 2;
  mtB = 2;
  mtK = 1;
  mtLogPower = 0;
  mtChecked = false;

  get mtCritical(): number { return Math.log(this.mtA) / Math.log(this.mtB); }
  get mtFLabel(): string {
    const base = this.mtK === 0 ? '1' : (this.mtK === 1 ? 'n' : `n^${this.mtK}`);
    if (this.mtLogPower === 0) return base;
    const log = this.mtLogPower === 1 ? 'lg n' : `lg^${this.mtLogPower} n`;
    return base === '1' ? log : `${base} ${log}`;
  }
  get mtResult(): { caseName: string; answer: string; explanation: string; tone: string; regularity: string } {
    const c = this.mtCritical;
    const k = this.mtK;
    const eps = 0.0001;
    if (k < c - eps) {
      return {
        caseName: 'Case 1: leaf-heavy',
        answer: `Theta(n^${this.round(c)})`,
        explanation: `f(n) = ${this.mtFLabel} is polynomially smaller than n^log_b(a). Leaves dominate.`,
        tone: 'leaf',
        regularity: 'No regularity check is needed for Case 1.'
      };
    }
    if (Math.abs(k - c) <= eps) {
      const logPower = this.mtLogPower + 1;
      const base = k === 0 ? '' : (k === 1 ? 'n ' : `n^${this.round(k)} `);
      const log = logPower === 1 ? 'lg n' : `lg^${logPower} n`;
      const logFactor = this.mtLogPower === 0 ? 'one log factor' : `one more log factor, from log^${this.mtLogPower} n to ${log}`;
      return {
        caseName: 'Case 2: balanced',
        answer: `Theta(${base}${log})`,
        explanation: `f(n) matches the critical function, so multiply by ${logFactor}.`,
        tone: 'flat',
        regularity: 'This is the extended CLRS-style Case 2 for nonnegative log powers.'
      };
    }
    return {
      caseName: 'Case 3: root-heavy',
      answer: `Theta(${this.mtFLabel})`,
      explanation: `f(n) is polynomially larger than n^log_b(a). Root work dominates if the regularity condition holds.`,
      tone: 'root',
      regularity: `Regularity check: a f(n/b) <= c f(n). Here the polynomial ratio is about ${this.round(this.mtA / Math.pow(this.mtB, this.mtK))}, below 1 for large n.`
    };
  }
  mtClassify(): void { this.mtChecked = true; }
  mtReset(): void { this.mtA = 2; this.mtB = 2; this.mtK = 1; this.mtLogPower = 0; this.mtChecked = false; }

  /* ------------------------------------------------------------------
   * L6: review / method selection
   * ------------------------------------------------------------------ */
  readonly reviewProblems: ReviewProblem[] = [
    { id: 'r1', recurrence: 'T(n) = T(n-1) + n^2', method: 'iteration', answer: 'Theta(n^3)', why: 'Linear decrement plus a polynomial toll: unroll into sum k^2.' },
    { id: 'r2', recurrence: 'T(n) = 2T(n/2) + n', method: 'master', answer: 'Theta(n lg n)', why: 'Standard Master form; Case 2.' },
    { id: 'r3', recurrence: 'T(n) = T(n/3) + T(2n/3) + n', method: 'substitution', answer: 'Theta(n lg n)', why: 'Unequal split, so standard Master theorem does not apply. Tree gives the guess; substitution proves it.' },
    { id: 'r4', recurrence: 'T(n) = 2T(sqrt(n)) + lg n', method: 'transform', answer: 'Theta(lg n lg lg n)', why: 'Use m = lg n, then solve S(m)=2S(m/2)+m.' },
    { id: 'r5', recurrence: 'T(n) = 3T(n/4) + n^2', method: 'master', answer: 'Theta(n^2)', why: 'Standard Master form; f(n) is polynomially larger than n^log_4 3.' },
    { id: 'r6', recurrence: 'T(n) = 4T(n/2) + n', method: 'tree', answer: 'Theta(n^2)', why: 'Master works too, but the tree makes the leaf-heavy geometric growth obvious.' },
    { id: 'r7', recurrence: 'T(n) = T(n/2) + 1', method: 'master', answer: 'Theta(lg n)', why: 'a=1, b=2, critical exponent 0; Case 2.' },
    { id: 'r8', recurrence: 'T(n) = T(n-1) + 1', method: 'iteration', answer: 'Theta(n)', why: 'Unroll into 1+1+...+1.' }
  ];
  readonly methodOrder: MethodId[] = ['iteration', 'tree', 'substitution', 'transform', 'master'];
  reviewAnswers: Record<string, MethodId> = {};
  reviewChecked = false;
  reviewPick(problemId: string, method: MethodId): void { if (!this.reviewChecked) this.reviewAnswers[problemId] = method; }
  reviewCheck(): void { this.reviewChecked = true; }
  reviewReset(): void { this.reviewAnswers = {}; this.reviewChecked = false; }
  get reviewCorrect(): number {
    return this.reviewProblems.filter(p => this.reviewAnswers[p.id] === p.method).length;
  }

  reviewState(problem: ReviewProblem): 'correct' | 'wrong' | null {
    if (!this.reviewChecked || !this.reviewAnswers[problem.id]) return null;
    return this.reviewAnswers[problem.id] === problem.method ? 'correct' : 'wrong';
  }

  private round(n: number): string {
    if (Math.abs(n - Math.round(n)) < 0.0001) return String(Math.round(n));
    return n.toFixed(3).replace(/0+$/, '').replace(/\.$/, '');
  }
}
