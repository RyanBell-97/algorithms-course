import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/* ===========================================================================
 * Unit 5 — Hashing: interactive hashing laboratory.
 * Every action ties a visual change to the responsible pseudocode line,
 * hash formula, probe rule, or analysis bound.
 * ======================================================================== */

type U5Artifact =
  | 'hash-direct-address'
  | 'hash-chaining'
  | 'hash-function-explorer'
  | 'hash-universal'
  | 'hash-linear-probing'
  | 'hash-quadratic-probing'
  | 'hash-double-hashing';

/* ── Direct addressing ──────────────────────────────────────────────────── */
interface DaScale { label: string; universe: number; note: string; }

/* ── Chaining ───────────────────────────────────────────────────────────── */
interface ChainFrame {
  bucket: number;
  nodeIndex: number;
  line: number;
  comparisons: number;
  note: string;
  status: 'hash' | 'walk' | 'found' | 'miss' | 'insert';
}

/* ── Open addressing ────────────────────────────────────────────────────── */
type ProbeStrategy = 'linear' | 'quadratic' | 'double';
interface OaSlot { key: number | null; deleted: boolean; }
interface OaFrame {
  table: OaSlot[];
  i: number;
  j: number;
  line: number;
  note: string;
  status: 'probe' | 'place' | 'found' | 'miss' | 'overflow';
}

@Component({
  selector: 'app-unit5-lab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './unit5-lab.component.html',
  styleUrls: ['./unit5-lab.component.scss']
})
export class Unit5LabComponent implements OnChanges {
  @Input() artifact: U5Artifact | string = '';

  get artifactId(): U5Artifact | '' {
    return (this.artifact || '') as U5Artifact | '';
  }

  ngOnChanges(): void {
    this.daReset();
    this.chainReset();
    this.hfeReset();
    this.uniReset();
    this.oaStrategy = this.artifact === 'hash-quadratic-probing' ? 'quadratic'
      : this.artifact === 'hash-double-hashing' ? 'double' : 'linear';
    this.oaReset();
  }

  /* =====================================================================
   * L1 — DIRECT-ADDRESS TABLE LAB
   * =================================================================== */
  readonly daPseudocode = [
    'DIRECT-ADDRESS-SEARCH(T, k)',
    '    return T[k]',
    '',
    'DIRECT-ADDRESS-INSERT(T, x)',
    '    T[key[x]] = x',
    '',
    'DIRECT-ADDRESS-DELETE(T, x)',
    '    T[key[x]] = NIL'
  ];

  readonly daU = 13;
  daTable: (number | null)[] = [];
  daKey = 6;
  daActiveSlot: number | null = null;
  daActiveLine = -1;
  daMessage = 'Every key is its own index, so each operation is a single array access — Θ(1).';
  daMessageTone: 'info' | 'ok' | 'bad' = 'info';

  readonly daScales: DaScale[] = [
    { label: 'Day of month', universe: 31, note: 'A 31-slot table is fine — the universe is tiny.' },
    { label: 'ASCII character', universe: 128, note: 'Still cheap: 128 slots for 128 possible keys.' },
    { label: '16-bit ID', universe: 65536, note: '64K slots to store maybe a few hundred records.' },
    { label: '32-bit integer key', universe: 4294967296, note: '4.3 billion slots — impossible. This is why hashing exists.' }
  ];
  daScaleIndex = 0;

  daReset(): void {
    this.daTable = new Array(this.daU).fill(null);
    this.daTable[3] = 3;
    this.daTable[6] = 6;
    this.daTable[10] = 10;
    this.daKey = 8;
    this.daActiveSlot = null;
    this.daActiveLine = -1;
    this.daScaleIndex = 0;
    this.daMessage = 'Every key is its own index, so each operation is a single array access — Θ(1).';
    this.daMessageTone = 'info';
  }

  get daCount(): number { return this.daTable.filter(v => v !== null).length; }

  private daValidKey(): boolean {
    return Number.isInteger(this.daKey) && this.daKey >= 0 && this.daKey < this.daU;
  }

  daInsert(): void {
    if (!this.daValidKey()) { this.daBadKey(); return; }
    this.daTable[this.daKey] = this.daKey;
    this.daActiveSlot = this.daKey;
    this.daActiveLine = 4;
    this.daMessage = `INSERT: line "T[key[x]] = x" writes directly into slot ${this.daKey}. No search, no probe — Θ(1).`;
    this.daMessageTone = 'ok';
  }

  daSearch(): void {
    if (!this.daValidKey()) { this.daBadKey(); return; }
    this.daActiveSlot = this.daKey;
    this.daActiveLine = 1;
    const hit = this.daTable[this.daKey] !== null;
    this.daMessage = hit
      ? `SEARCH: line "return T[k]" reads slot ${this.daKey} directly and finds the element — Θ(1).`
      : `SEARCH: slot ${this.daKey} holds NIL, so the key is absent. Still a single Θ(1) read.`;
    this.daMessageTone = hit ? 'ok' : 'bad';
  }

  daDelete(): void {
    if (!this.daValidKey()) { this.daBadKey(); return; }
    this.daTable[this.daKey] = null;
    this.daActiveSlot = this.daKey;
    this.daActiveLine = 7;
    this.daMessage = `DELETE: line "T[key[x]] = NIL" clears slot ${this.daKey}. No shifting needed — Θ(1).`;
    this.daMessageTone = 'info';
  }

  private daBadKey(): void {
    this.daActiveSlot = null;
    this.daActiveLine = -1;
    this.daMessage = `Key must be an integer in 0..${this.daU - 1}. That ceiling is the catch: the table needs one slot per possible key.`;
    this.daMessageTone = 'bad';
  }

  get daScale(): DaScale { return this.daScales[this.daScaleIndex]; }
  get daWastePct(): number {
    const used = Math.min(this.daCount, this.daScale.universe);
    return Math.max(0, 100 - (used / this.daScale.universe) * 100);
  }
  get daUniverseLabel(): string {
    const u = this.daScale.universe;
    if (u >= 1e9) return (u / 1e9).toFixed(1) + ' billion';
    if (u >= 1e6) return (u / 1e6).toFixed(0) + ' million';
    if (u >= 1e3) return (u / 1e3).toFixed(0) + 'K';
    return String(u);
  }

  /* =====================================================================
   * L2 — CHAINING LAB
   * =================================================================== */
  readonly chainPseudocode = [
    'CHAINED-HASH-INSERT(T, x)',
    '    insert x at the head of list T[h(key[x])]',
    '',
    'CHAINED-HASH-SEARCH(T, k)',
    '    h = h(k)',
    '    walk list T[h], comparing each key with k'
  ];

  chainM = 7;
  readonly chainMOptions = [5, 7, 11];
  chainBuckets: number[][] = [];
  chainKey = 24;
  chainFrames: ChainFrame[] = [];
  chainStep = 0;
  chainMode: 'insert' | 'search' = 'insert';
  chainActiveLine = -1;

  chainReset(): void {
    this.chainM = 7;
    this.chainRebuild([3, 12, 17, 22, 28, 35, 41, 8]);
    this.chainKey = 24;
    this.chainFrames = [];
    this.chainStep = 0;
    this.chainMode = 'insert';
    this.chainActiveLine = -1;
  }

  private chainRebuild(keys: number[]): void {
    this.chainBuckets = Array.from({ length: this.chainM }, () => [] as number[]);
    for (const k of keys) this.chainBuckets[k % this.chainM].unshift(k);
  }

  setChainM(m: number): void {
    const all = this.chainBuckets.flat();
    this.chainM = m;
    this.chainRebuild(all);
    this.chainFrames = [];
    this.chainStep = 0;
    this.chainActiveLine = -1;
  }

  get chainN(): number { return this.chainBuckets.reduce((s, b) => s + b.length, 0); }
  get chainAlpha(): string { return (this.chainN / this.chainM).toFixed(2); }
  get chainLongest(): number { return Math.max(0, ...this.chainBuckets.map(b => b.length)); }
  chainHash(k: number): number { return ((k % this.chainM) + this.chainM) % this.chainM; }

  private chainValidKey(): boolean {
    return Number.isInteger(this.chainKey) && this.chainKey >= 0 && this.chainKey <= 999;
  }

  chainInsert(): void {
    if (!this.chainValidKey()) return;
    const k = this.chainKey;
    const h = this.chainHash(k);
    this.chainBuckets[h].unshift(k);
    this.chainMode = 'insert';
    this.chainFrames = [
      { bucket: h, nodeIndex: -1, line: 1, comparisons: 0, status: 'hash',
        note: `h(${k}) = ${k} mod ${this.chainM} = ${h}. The element is prepended to bucket ${h} in Θ(1) — no scan on insert.` },
      { bucket: h, nodeIndex: 0, line: 1, comparisons: 0, status: 'insert',
        note: `Key ${k} now sits at the head of bucket ${h}. Insertion is always Θ(1) for chaining.` }
    ];
    this.chainStep = 0;
    this.chainActiveLine = 1;
  }

  chainSearch(): void {
    if (!this.chainValidKey()) return;
    const k = this.chainKey;
    const h = this.chainHash(k);
    this.chainMode = 'search';
    const frames: ChainFrame[] = [
      { bucket: h, nodeIndex: -1, line: 4, comparisons: 0, status: 'hash',
        note: `h(${k}) = ${k} mod ${this.chainM} = ${h}. Search jumps straight to bucket ${h}.` }
    ];
    const list = this.chainBuckets[h];
    let comparisons = 0;
    let found = false;
    for (let idx = 0; idx < list.length; idx++) {
      comparisons++;
      const hit = list[idx] === k;
      frames.push({
        bucket: h, nodeIndex: idx, line: 5, comparisons,
        status: hit ? 'found' : 'walk',
        note: hit
          ? `Comparison ${comparisons}: list node ${idx} holds ${list[idx]} = ${k}. Found after ${comparisons} comparison(s).`
          : `Comparison ${comparisons}: list node ${idx} holds ${list[idx]} ≠ ${k}. Advance to the next node.`
      });
      if (hit) { found = true; break; }
    }
    if (!found) {
      frames.push({
        bucket: h, nodeIndex: -1, line: 5, comparisons, status: 'miss',
        note: `Bucket ${h} exhausted after ${comparisons} comparison(s) — key ${k} is absent. Expected work is Θ(1 + α).`
      });
    }
    this.chainFrames = frames;
    this.chainStep = 0;
    this.chainActiveLine = frames[0].line;
  }

  get chainFrame(): ChainFrame | null { return this.chainFrames[this.chainStep] ?? null; }
  get chainDone(): boolean { return this.chainStep >= this.chainFrames.length - 1; }
  chainNext(): void {
    if (!this.chainDone) { this.chainStep++; this.chainActiveLine = this.chainFrame!.line; }
  }
  chainPrev(): void {
    if (this.chainStep > 0) { this.chainStep--; this.chainActiveLine = this.chainFrame!.line; }
  }
  chainRunReset(): void { this.chainFrames = []; this.chainStep = 0; this.chainActiveLine = -1; }

  chainNodeActive(bucket: number, idx: number): boolean {
    const f = this.chainFrame;
    return !!f && f.bucket === bucket && f.nodeIndex === idx;
  }
  chainBucketActive(bucket: number): boolean {
    const f = this.chainFrame;
    return !!f && f.bucket === bucket;
  }

  /* =====================================================================
   * L3 — HASH FUNCTION EXPLORER
   * =================================================================== */
  readonly hfeKeySets: { id: string; label: string; keys: number[]; note: string }[] = [
    { id: 'pow2', label: 'Keys that share low bits', keys: [16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192],
      note: 'Every key is a multiple of 16. With a power-of-two table, all of them collide.' },
    { id: 'ids', label: 'Consecutive record IDs', keys: [1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011],
      note: 'Sequential IDs — a very common real-world key pattern.' },
    { id: 'mixed', label: 'Scattered keys', keys: [7, 23, 41, 58, 66, 79, 94, 103, 118, 127, 135, 152],
      note: 'Irregular keys that most hash functions spread well.' }
  ];
  hfeKeySetId = 'pow2';
  hfeMethod: 'division' | 'multiplication' = 'division';
  hfeM = 16;
  readonly hfeMOptions = [8, 13, 16];
  readonly hfeA = 0.6180339887; // (sqrt(5)-1)/2

  hfeReset(): void {
    this.hfeKeySetId = 'pow2';
    this.hfeMethod = 'division';
    this.hfeM = 16;
  }

  get hfeKeys(): number[] {
    return this.hfeKeySets.find(s => s.id === this.hfeKeySetId)?.keys ?? [];
  }
  get hfeKeySetNote(): string {
    return this.hfeKeySets.find(s => s.id === this.hfeKeySetId)?.note ?? '';
  }
  hfeIsPow2(m: number): boolean { return (m & (m - 1)) === 0; }

  hfeHash(k: number): number {
    if (this.hfeMethod === 'division') return ((k % this.hfeM) + this.hfeM) % this.hfeM;
    const frac = (k * this.hfeA) % 1;
    return Math.floor(this.hfeM * frac);
  }

  get hfeBuckets(): number[][] {
    const buckets: number[][] = Array.from({ length: this.hfeM }, () => []);
    for (const k of this.hfeKeys) buckets[this.hfeHash(k)].push(k);
    return buckets;
  }
  get hfeMaxBucket(): number { return Math.max(1, ...this.hfeBuckets.map(b => b.length)); }
  get hfeUsedBuckets(): number { return this.hfeBuckets.filter(b => b.length > 0).length; }
  get hfeEmptyBuckets(): number { return this.hfeM - this.hfeUsedBuckets; }

  get hfeQuality(): { tag: string; tone: 'ok' | 'warn' | 'bad'; text: string } {
    const peak = Math.max(...this.hfeBuckets.map(b => b.length));
    const ideal = Math.ceil(this.hfeKeys.length / this.hfeM);
    if (this.hfeMethod === 'division' && this.hfeIsPow2(this.hfeM) && peak >= this.hfeKeys.length) {
      return { tag: 'Catastrophic clustering', tone: 'bad',
        text: `h(k) = k mod ${this.hfeM} keeps only the lowest ${Math.log2(this.hfeM)} bits. These keys share those bits, so they all land in one slot — search degrades to Θ(n).` };
    }
    if (peak <= ideal + 1) {
      return { tag: 'Well spread', tone: 'ok',
        text: `The tallest slot holds ${peak} key(s); a perfect spread would hold ${ideal}. This hash function suits this key set.` };
    }
    return { tag: 'Uneven spread', tone: 'warn',
      text: `The tallest slot holds ${peak} key(s) versus an ideal of ${ideal}. Some clustering remains — try a prime table size.` };
  }

  get hfeFormulaLine(): string {
    return this.hfeMethod === 'division'
      ? `h(k) = k mod ${this.hfeM}`
      : `h(k) = ⌊${this.hfeM} · (k · A mod 1)⌋,  A ≈ 0.618`;
  }

  /* =====================================================================
   * L4 — UNIVERSAL HASHING LAB
   * =================================================================== */
  readonly uniP = 17;
  readonly uniM = 5;
  readonly uniKeys = [2, 5, 9, 12, 20, 29, 41];
  uniA = 3;
  uniB = 4;
  uniRolls = 0;
  uniCollisionSum = 0;

  uniReset(): void {
    this.uniA = 3;
    this.uniB = 4;
    this.uniRolls = 0;
    this.uniCollisionSum = 0;
  }

  uniHash(k: number): number {
    return (((this.uniA * k + this.uniB) % this.uniP) % this.uniM + this.uniM) % this.uniM;
  }

  get uniBuckets(): number[][] {
    const buckets: number[][] = Array.from({ length: this.uniM }, () => []);
    for (const k of this.uniKeys) buckets[this.uniHash(k)].push(k);
    return buckets;
  }

  get uniCollisions(): number {
    let c = 0;
    for (const b of this.uniBuckets) c += (b.length * (b.length - 1)) / 2;
    return c;
  }

  uniRoll(): void {
    this.uniA = 1 + Math.floor(Math.random() * (this.uniP - 1));      // a in 1..p-1
    this.uniB = Math.floor(Math.random() * this.uniP);                // b in 0..p-1
    this.uniRolls++;
    this.uniCollisionSum += this.uniCollisions;
  }

  get uniAvgCollisions(): string {
    return this.uniRolls === 0 ? '—' : (this.uniCollisionSum / this.uniRolls).toFixed(2);
  }

  /* Expected collisions for a fixed key set: each of the C(n,2) pairs
     collides with probability <= 1/m. */
  get uniPairs(): number {
    const n = this.uniKeys.length;
    return (n * (n - 1)) / 2;
  }
  get uniExpectedBound(): string {
    return (this.uniPairs / this.uniM).toFixed(2);
  }

  /* =====================================================================
   * L5/L6/L7 — OPEN ADDRESSING LAB
   * =================================================================== */
  readonly oaPseudocode = [
    'HASH-INSERT(T, k)',
    '    i = 0',
    '    repeat',
    '        j = h(k, i)',
    '        if T[j] == NIL or T[j] == DELETED',
    '            T[j] = k',
    '            return j',
    '        i = i + 1',
    '    until i == m',
    '    error "hash table overflow"'
  ];
  readonly oaSearchPseudocode = [
    'HASH-SEARCH(T, k)',
    '    i = 0',
    '    repeat',
    '        j = h(k, i)',
    '        if T[j] == k',
    '            return j',
    '        i = i + 1',
    '    until T[j] == NIL or i == m',
    '    return NIL'
  ];

  readonly oaM = 11;
  oaStrategy: ProbeStrategy = 'linear';
  oaTable: OaSlot[] = [];
  oaKey = 25;
  oaFrames: OaFrame[] = [];
  oaStep = 0;
  oaActiveCode: 'insert' | 'search' = 'insert';
  oaMessage = '';

  readonly oaStrategyInfo: Record<ProbeStrategy, { label: string; probe: string; clustering: string }> = {
    linear: {
      label: 'Linear probing',
      probe: 'h(k, i) = (h′(k) + i) mod m',
      clustering: 'Linear probing suffers primary clustering: long runs of full slots grow and merge, lengthening every probe through them.'
    },
    quadratic: {
      label: 'Quadratic probing',
      probe: 'h(k, i) = (h′(k) + i + i²) mod m',
      clustering: 'Quadratic probing removes primary clustering but keeps secondary clustering: keys with the same h′(k) follow the identical jump pattern.'
    },
    double: {
      label: 'Double hashing',
      probe: 'h(k, i) = (h₁(k) + i·h₂(k)) mod m',
      clustering: 'Double hashing gives each key its own stride h₂(k); with m prime the probe sequence is a full permutation of all m slots.'
    }
  };

  oaReset(): void {
    this.oaTable = Array.from({ length: this.oaM }, () => ({ key: null, deleted: false }));
    this.oaKey = 25;
    this.oaFrames = [];
    this.oaStep = 0;
    this.oaActiveCode = 'insert';
    this.oaMessage = 'Insert keys and watch the probe sequence. Switch strategy to compare how clusters form.';
    // seed a couple of keys so clustering is visible
    this.oaApplyInsert(14, true);
    this.oaApplyInsert(25, true);
    this.oaApplyInsert(36, true);
    this.oaFrames = [];
    this.oaStep = 0;
  }

  setOaStrategy(s: ProbeStrategy): void {
    this.oaStrategy = s;
    this.oaReset();
  }

  private oaHPrime(k: number): number { return ((k % this.oaM) + this.oaM) % this.oaM; }
  private oaH2(k: number): number { return 1 + (k % (this.oaM - 1)); }

  oaProbe(k: number, i: number): number {
    const m = this.oaM;
    if (this.oaStrategy === 'linear') return (this.oaHPrime(k) + i) % m;
    if (this.oaStrategy === 'quadratic') return (this.oaHPrime(k) + i + i * i) % m;
    return (this.oaHPrime(k) + i * this.oaH2(k)) % m;
  }

  oaProbeLabel(k: number, i: number): string {
    const m = this.oaM;
    if (this.oaStrategy === 'linear') return `(${this.oaHPrime(k)} + ${i}) mod ${m}`;
    if (this.oaStrategy === 'quadratic') return `(${this.oaHPrime(k)} + ${i} + ${i}²) mod ${m}`;
    return `(${this.oaHPrime(k)} + ${i}·${this.oaH2(k)}) mod ${m}`;
  }

  private oaSnapshot(): OaSlot[] {
    return this.oaTable.map(s => ({ key: s.key, deleted: s.deleted }));
  }

  private oaValidKey(): boolean {
    return Number.isInteger(this.oaKey) && this.oaKey >= 0 && this.oaKey <= 999;
  }

  private oaApplyInsert(k: number, silent: boolean): OaFrame[] {
    const frames: OaFrame[] = [];
    let placed = false;
    for (let i = 0; i < this.oaM; i++) {
      const j = this.oaProbe(k, i);
      const slot = this.oaTable[j];
      const empty = slot.key === null;
      if (!silent) {
        frames.push({
          table: this.oaSnapshot(), i, j, line: 3, status: 'probe',
          note: `Probe i = ${i}: j = h(${k}, ${i}) = ${this.oaProbeLabel(k, i)} = ${j}. ` +
            (empty ? `Slot ${j} is free.` : `Slot ${j} already holds ${slot.key} — collision, probe again.`)
        });
      }
      if (empty) {
        this.oaTable[j] = { key: k, deleted: false };
        placed = true;
        if (!silent) {
          frames.push({
            table: this.oaSnapshot(), i, j, line: 5, status: 'place',
            note: `Line "T[j] = k": key ${k} stored in slot ${j} after ${i + 1} probe(s).`
          });
        }
        break;
      }
    }
    if (!placed && !silent) {
      frames.push({
        table: this.oaSnapshot(), i: this.oaM, j: -1, line: 9, status: 'overflow',
        note: `All ${this.oaM} probes hit occupied slots — "hash table overflow". The probe sequence for this key cannot reach a free slot.`
      });
    }
    return frames;
  }

  oaInsert(): void {
    if (!this.oaValidKey()) return;
    this.oaActiveCode = 'insert';
    this.oaFrames = this.oaApplyInsert(this.oaKey, false);
    this.oaStep = 0;
    this.oaMessage = `Inserting ${this.oaKey} with ${this.oaStrategyInfo[this.oaStrategy].label.toLowerCase()}.`;
  }

  oaSearch(): void {
    if (!this.oaValidKey()) return;
    const k = this.oaKey;
    this.oaActiveCode = 'search';
    const frames: OaFrame[] = [];
    let result: 'found' | 'miss' = 'miss';
    for (let i = 0; i < this.oaM; i++) {
      const j = this.oaProbe(k, i);
      const slot = this.oaTable[j];
      if (slot.key === k) {
        frames.push({
          table: this.oaSnapshot(), i, j, line: 4, status: 'found',
          note: `Probe i = ${i}: T[${j}] = ${k}. Found after ${i + 1} probe(s).`
        });
        result = 'found';
        break;
      }
      if (slot.key === null && !slot.deleted) {
        frames.push({
          table: this.oaSnapshot(), i, j, line: 7, status: 'miss',
          note: `Probe i = ${i}: T[${j}] is NIL. The probe sequence stops — key ${k} is absent.`
        });
        result = 'miss';
        break;
      }
      frames.push({
        table: this.oaSnapshot(), i, j, line: 3, status: 'probe',
        note: `Probe i = ${i}: T[${j}] ${slot.deleted ? 'is a DELETED tombstone' : 'holds ' + slot.key} ≠ ${k}. ` +
          `Keep probing — a tombstone must not stop a search.`
      });
    }
    this.oaFrames = frames;
    this.oaStep = 0;
    this.oaMessage = result === 'found'
      ? `Search for ${k}: found.`
      : `Search for ${k}: not found. Tombstones are skipped, NIL ends the search.`;
  }

  oaDelete(): void {
    if (!this.oaValidKey()) return;
    const k = this.oaKey;
    for (let i = 0; i < this.oaM; i++) {
      const j = this.oaProbe(k, i);
      const slot = this.oaTable[j];
      if (slot.key === k) {
        this.oaTable[j] = { key: null, deleted: true };
        this.oaActiveCode = 'search';
        this.oaFrames = [];
        this.oaStep = 0;
        this.oaMessage = `Deleted ${k} from slot ${j}. The slot becomes a DELETED tombstone — a plain NIL would break later searches that probed past this slot.`;
        return;
      }
      if (slot.key === null && !slot.deleted) break;
    }
    this.oaFrames = [];
    this.oaStep = 0;
    this.oaMessage = `Key ${k} is not in the table — nothing to delete.`;
  }

  get oaFrame(): OaFrame | null { return this.oaFrames[this.oaStep] ?? null; }
  get oaViewTable(): OaSlot[] { return this.oaFrame ? this.oaFrame.table : this.oaTable; }
  get oaDone(): boolean { return this.oaStep >= this.oaFrames.length - 1; }
  get oaActiveLine(): number { return this.oaFrame ? this.oaFrame.line : -1; }
  oaNext(): void { if (!this.oaDone) this.oaStep++; }
  oaPrev(): void { if (this.oaStep > 0) this.oaStep--; }
  oaRunEnd(): void { if (this.oaFrames.length) this.oaStep = this.oaFrames.length - 1; }
  oaClearTrace(): void { this.oaFrames = []; this.oaStep = 0; }

  get oaCount(): number { return this.oaTable.filter(s => s.key !== null).length; }
  get oaLoad(): string { return (this.oaCount / this.oaM).toFixed(2); }

  /* longest run of consecutive occupied slots — primary clustering meter */
  get oaLongestRun(): number {
    let best = 0, run = 0;
    for (let r = 0; r < this.oaM * 2; r++) {
      const s = this.oaViewTable[r % this.oaM];
      if (s.key !== null) { run++; best = Math.max(best, run); }
      else run = 0;
    }
    return Math.min(best, this.oaM);
  }

  oaActivePseudocode(): string[] {
    return this.oaActiveCode === 'insert' ? this.oaPseudocode : this.oaSearchPseudocode;
  }

  oaSlotClass(idx: number): string {
    const f = this.oaFrame;
    const slot = this.oaViewTable[idx];
    if (f && f.j === idx) {
      if (f.status === 'place' || f.status === 'found') return 'hit';
      if (f.status === 'miss') return 'miss';
      return 'probe';
    }
    if (slot.deleted) return 'tomb';
    if (slot.key !== null) return 'full';
    return 'empty';
  }
}
