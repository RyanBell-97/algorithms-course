import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* ===========================================================================
 * Unit 7 — Amortized Analysis: interactive laboratory.
 * Four artifacts make the aggregate, accounting and potential methods concrete:
 * a bank-balance lab, a multipop stack, a binary counter, and a Φ stepper.
 * ======================================================================== */

type U7Artifact =
  | 'amortized-bank'
  | 'multipop-stack'
  | 'binary-counter-amortized'
  | 'potential-method';

interface StackOp { kind: 'push' | 'pop' | 'multipop'; cost: number; note: string; }
interface PotRow { i: number; before: string; after: string; c: number; dPhi: number; amortized: number; }

@Component({
  selector: 'app-unit7-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit7-lab.component.html',
  styleUrls: ['./unit7-lab.component.scss']
})
export class Unit7LabComponent implements OnChanges {
  @Input() artifact: U7Artifact | string = '';

  get artifactId(): U7Artifact | '' { return (this.artifact || '') as U7Artifact | ''; }

  ngOnChanges(): void {
    this.bankReset();
    this.stackReset();
    this.counterReset();
    this.potReset();
  }

  /* =====================================================================
   * L1 — AMORTIZED BANK (accounting method)
   * =================================================================== */
  readonly methodCards = [
    { name: 'Aggregate', tone: 'blue',
      idea: 'Bound the total cost T(m) of any m-operation sequence, then the amortized cost is T(m) / m.' },
    { name: 'Accounting', tone: 'gold',
      idea: 'Charge each operation a fixed amount; surplus is stored as credit. The proof: credit is never negative.' },
    { name: 'Potential', tone: 'green',
      idea: 'Define a potential Φ on the data structure. Amortized cost = actual cost + ΔΦ; it telescopes over the sequence.' }
  ];

  /* a fixed 14-operation sequence; cheap ops cost 1, two spikes cost 8 and 6 */
  readonly bankCosts = [1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 6, 1, 1];
  bankCharge = 2;

  bankReset(): void { this.bankCharge = 2; }

  get bankTotalActual(): number { return this.bankCosts.reduce((s, c) => s + c, 0); }
  get bankM(): number { return this.bankCosts.length; }

  /* running bank balance after each prefix: Σ(charge − actual) */
  get bankBalances(): { cost: number; balance: number; negative: boolean }[] {
    let bal = 0;
    return this.bankCosts.map(cost => {
      bal += this.bankCharge - cost;
      return { cost, balance: bal, negative: bal < 0 };
    });
  }
  get bankValid(): boolean { return this.bankBalances.every(b => !b.negative); }
  get bankFirstBreak(): number {
    const idx = this.bankBalances.findIndex(b => b.negative);
    return idx;
  }
  get bankMaxAbs(): number {
    return Math.max(1, ...this.bankBalances.map(b => Math.abs(b.balance)), this.bankCharge);
  }
  bankBarHeight(v: number): number { return Math.round((Math.abs(v) / this.bankMaxAbs) * 100); }
  bankCostHeight(c: number): number {
    const max = Math.max(...this.bankCosts, this.bankCharge);
    return Math.round((c / max) * 100);
  }

  /* =====================================================================
   * L2 — MULTIPOP STACK (aggregate + accounting)
   * =================================================================== */
  readonly stackPseudocode = [
    'PUSH(S, x)        // cost 1',
    'POP(S)            // cost 1',
    'MULTIPOP(S, k)    // cost min(k, |S|)',
    '    while not STACK-EMPTY(S) and k > 0',
    '        POP(S);  k = k - 1'
  ];

  stackItems: number[] = [];
  stackPushSeq = 1;
  stackMultipopK = 3;
  stackOps: StackOp[] = [];
  stackActualTotal = 0;
  stackPushCount = 0;
  stackLastCost = 0;
  stackActiveLine = -1;

  stackReset(): void {
    this.stackItems = [];
    this.stackPushSeq = 1;
    this.stackMultipopK = 3;
    this.stackOps = [];
    this.stackActualTotal = 0;
    this.stackPushCount = 0;
    this.stackLastCost = 0;
    this.stackActiveLine = -1;
  }

  stackPush(): void {
    this.stackItems.push(this.stackPushSeq++);
    this.stackPushCount++;
    this.stackActualTotal += 1;
    this.stackLastCost = 1;
    this.stackActiveLine = 0;
    this.stackOps.unshift({ kind: 'push', cost: 1, note: `PUSH — actual cost 1. The item carries 1 credit to pay for its own future pop.` });
    this.stackTrim();
  }

  stackPop(): void {
    if (!this.stackItems.length) {
      this.stackActiveLine = 1;
      this.stackLastCost = 0;
      this.stackOps.unshift({ kind: 'pop', cost: 0, note: 'POP on an empty stack — underflow. Nothing happens.' });
      return;
    }
    this.stackItems.pop();
    this.stackActualTotal += 1;
    this.stackLastCost = 1;
    this.stackActiveLine = 1;
    this.stackOps.unshift({ kind: 'pop', cost: 1, note: 'POP — actual cost 1, paid by the credit the item carried since its PUSH.' });
    this.stackTrim();
  }

  stackMultipop(): void {
    const k = Math.max(0, Math.min(this.stackMultipopK || 0, 20));
    const popped = Math.min(k, this.stackItems.length);
    this.stackItems.splice(this.stackItems.length - popped, popped);
    this.stackActualTotal += popped;
    this.stackLastCost = popped;
    this.stackActiveLine = 2;
    this.stackOps.unshift({
      kind: 'multipop', cost: popped,
      note: `MULTIPOP(S, ${k}) — actual cost ${popped} (popped min(${k}, stack size)). Each pop is still prepaid: no item is popped twice.`
    });
    this.stackTrim();
  }

  private stackTrim(): void { if (this.stackOps.length > 9) this.stackOps = this.stackOps.slice(0, 9); }

  get stackAmortizedBound(): number { return 2 * this.stackPushCount; }

  /* =====================================================================
   * L3 — BINARY COUNTER (aggregate method)
   * =================================================================== */
  readonly counterBitsN = 8;
  readonly counterPseudocode = [
    'INCREMENT(A)',
    '    i = 0',
    '    while i < A.length and A[i] == 1',
    '        A[i] = 0',
    '        i = i + 1',
    '    if i < A.length',
    '        A[i] = 1'
  ];

  counterBits: number[] = [];     // index 0 = least significant
  counterValue = 0;
  counterIncrements = 0;
  counterTotalFlips = 0;
  counterLastFlips = 0;
  counterFlipped = new Set<number>();

  counterReset(): void {
    this.counterBits = new Array(this.counterBitsN).fill(0);
    this.counterValue = 0;
    this.counterIncrements = 0;
    this.counterTotalFlips = 0;
    this.counterLastFlips = 0;
    this.counterFlipped = new Set();
  }

  counterIncrement(): void {
    if (this.counterValue >= Math.pow(2, this.counterBitsN) - 1) return;
    const flipped = new Set<number>();
    let i = 0;
    while (i < this.counterBitsN && this.counterBits[i] === 1) {
      this.counterBits[i] = 0; flipped.add(i); i++;
    }
    if (i < this.counterBitsN) { this.counterBits[i] = 1; flipped.add(i); }
    this.counterFlipped = flipped;
    this.counterLastFlips = flipped.size;
    this.counterTotalFlips += flipped.size;
    this.counterIncrements++;
    this.counterValue++;
  }

  counterRun(times: number): void {
    for (let t = 0; t < times; t++) this.counterIncrement();
  }

  get counterBitsHigh(): { idx: number; val: number; flipped: boolean }[] {
    /* most-significant first for display */
    const out: { idx: number; val: number; flipped: boolean }[] = [];
    for (let i = this.counterBitsN - 1; i >= 0; i--) {
      out.push({ idx: i, val: this.counterBits[i], flipped: this.counterFlipped.has(i) });
    }
    return out;
  }
  get counterAvgFlips(): string {
    return this.counterIncrements === 0 ? '—' : (this.counterTotalFlips / this.counterIncrements).toFixed(3);
  }
  get counterBound(): number { return 2 * this.counterIncrements; }
  get counterBitFreq(): { bit: number; flips: number; period: number }[] {
    const out: { bit: number; flips: number; period: number }[] = [];
    for (let j = 0; j < this.counterBitsN; j++) {
      out.push({ bit: j, period: Math.pow(2, j), flips: Math.floor(this.counterIncrements / Math.pow(2, j)) });
    }
    return out;
  }

  /* =====================================================================
   * L4 — POTENTIAL METHOD (Φ = number of 1-bits on a binary counter)
   * =================================================================== */
  readonly potBitsN = 6;
  readonly potChecklist = [
    'define a state D_i after each operation i',
    'choose Φ with Φ(D_0) = 0 and Φ(D_i) ≥ 0',
    'compute c_i (actual cost) for each operation',
    'compute ΔΦ = Φ(D_i) − Φ(D_{i-1})',
    'amortized ĉ_i = c_i + ΔΦ — bound it',
    'Σ ĉ_i = Σ c_i + Φ(D_n) − Φ(D_0) bounds the total'
  ];

  potBits: number[] = [];
  potRows: PotRow[] = [];
  potValue = 0;

  potReset(): void {
    this.potBits = new Array(this.potBitsN).fill(0);
    this.potRows = [];
    this.potValue = 0;
  }

  private potPhi(bits: number[]): number { return bits.reduce((s, b) => s + b, 0); }
  private potString(bits: number[]): string {
    return bits.slice().reverse().join('');
  }

  potStep(): void {
    if (this.potValue >= Math.pow(2, this.potBitsN) - 1) return;
    const before = this.potBits.slice();
    const phiBefore = this.potPhi(before);
    let i = 0, flips = 0;
    while (i < this.potBitsN && this.potBits[i] === 1) { this.potBits[i] = 0; flips++; i++; }
    if (i < this.potBitsN) { this.potBits[i] = 1; flips++; }
    const after = this.potBits.slice();
    const phiAfter = this.potPhi(after);
    const dPhi = phiAfter - phiBefore;
    this.potValue++;
    this.potRows.push({
      i: this.potValue,
      before: this.potString(before),
      after: this.potString(after),
      c: flips,
      dPhi,
      amortized: flips + dPhi
    });
  }

  get potTotalActual(): number { return this.potRows.reduce((s, r) => s + r.c, 0); }
  get potTotalAmortized(): number { return this.potRows.reduce((s, r) => s + r.amortized, 0); }
  get potPhiNow(): number { return this.potPhi(this.potBits); }
  get potDone(): boolean { return this.potValue >= Math.pow(2, this.potBitsN) - 1; }
  get potBitsHigh(): number[] { return this.potBits.slice().reverse(); }
}
