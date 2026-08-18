import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';

interface MathPart {
  kind: 'text' | 'math' | 'fraction';
  value?: string;
  sign?: string;
  numerator?: string;
  denominator?: string;
}

@Component({
  selector: 'app-math-text',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './math-text.component.html',
  styleUrls: ['./math-text.component.scss']
})
export class MathTextComponent implements OnChanges {
  @Input() text: string | number | boolean | string[] | null | undefined = '';

  parts: MathPart[] = [];

  ngOnChanges(): void {
    this.parts = this.parse(this.stringify(this.text));
  }

  stringify(value: string | number | boolean | string[] | null | undefined): string {
    if (Array.isArray(value)) return this.normalizeVisibleMath(value.join(', '));
    if (typeof value === 'boolean') return value ? 'True' : 'False';
    if (value === null || value === undefined) return '';
    return this.normalizeVisibleMath(String(value));
  }

  private normalizeVisibleMath(text: string): string {
    return text
      .replace(/Theta\(/g, '\u0398(')
      .replace(/Omega\(/g, '\u03a9(')
      .replace(/\?\(([^)]*)\)/g, (full, body: string) => {
        const lowerBoundContext = /\bat least|lower bound|lower-bound|lower\s+estimate|>=|\\ge/.test(text.toLowerCase());
        return `${lowerBoundContext ? '\u03a9' : '\u0398'}(${body})`;
      })
      .replace(/\^\{([^}\n]{1,32})\}/g, (_full, exponent: string) => this.toSuperscript(exponent))
      .replace(/\^\(([^)\n]{1,32})\)/g, (_full, exponent: string) => this.toSuperscript(exponent))
      .replace(/\^([A-Za-z0-9+\-=]{1,12})/g, (_full, exponent: string) => this.toSuperscript(exponent));
  }

  private toSuperscript(exponent: string): string {
    const chars: Record<string, string> = {
      '0': '\u2070',
      '1': '\u00b9',
      '2': '\u00b2',
      '3': '\u00b3',
      '4': '\u2074',
      '5': '\u2075',
      '6': '\u2076',
      '7': '\u2077',
      '8': '\u2078',
      '9': '\u2079',
      '+': '\u207a',
      '-': '\u207b',
      '=': '\u207c',
      '(': '\u207d',
      ')': '\u207e',
      '/': '\u2044',
      '_': '_',
      'a': '\u1d43',
      'b': '\u1d47',
      'c': '\u1d9c',
      'd': '\u1d48',
      'e': '\u1d49',
      'f': '\u1da0',
      'g': '\u1d4d',
      'h': '\u02b0',
      'i': '\u2071',
      'j': '\u02b2',
      'k': '\u1d4f',
      'l': '\u02e1',
      'm': '\u1d50',
      'n': '\u207f',
      'o': '\u1d52',
      'p': '\u1d56',
      'r': '\u02b3',
      's': '\u02e2',
      't': '\u1d57',
      'x': '\u02e3',
      'y': '\u02b8'
    };

    return exponent
      .split('')
      .map((char) => {
        if (char === ' ') return ' ';
        const key = char.toLowerCase();
        return chars[char] ?? chars[key] ?? char;
      })
      .join('');
  }

  parse(text: string): MathPart[] {
    const parts: MathPart[] = [];
    const normalizedText = text
      .replace(/−|âˆ’/g, '-')
      .replace(/≤|â‰¤/g, '<=')
      .replace(/≥|â‰¥/g, '>=')
      .replace(/×|Ã—/g, '*')
      .replace(/÷|Ã·/g, '/');

    const fractionPattern = /\{\{frac:([^:}]+):([^}]+)\}\}/gu;
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = fractionPattern.exec(normalizedText)) !== null) {
      const full = match[0];
      this.pushTextParts(parts, normalizedText.slice(cursor, match.index));

      const numerator = match[1];
      const denominator = match[2];
      parts.push(this.buildFraction(numerator, denominator));

      cursor = match.index + full.length;
    }

    this.pushTextParts(parts, normalizedText.slice(cursor));
    return parts.filter((part) => part.kind !== 'text' || part.value !== '');
  }

  pushTextParts(parts: MathPart[], text: string): void {
    if (!text) return;

    const valueToken = String.raw`(?:best|key|total|sum|NIL|[A-Z]\[[^\]]+\]|[A-Za-z]|\d+(?:\.\.[A-Za-z0-9]+)?|\([^)]*\))`;
    const expressionToken = String.raw`${valueToken}(?:\s*(?:\+|-|\*|/|\^)\s*${valueToken})*`;
    const mathPattern = new RegExp(
      String.raw`(?:\b(?:O|Θ|Omega|Ω)\([^)]+\)|\b(?:T|S|f|g|h)\([^)]+\)|\b(?:lg|log|sqrt)\b(?:\s*(?:\([^)]*\)|[A-Za-z0-9_{}^]+))?|${valueToken}\s*(?:==|<=|>=|=|<|>)\s*${expressionToken}|[A-Z]\[[^\]]+\])`,
      'gu'
    );
    let cursor = 0;
    let match: RegExpExecArray | null;

    while ((match = mathPattern.exec(text)) !== null) {
      const value = match[0];
      if (!this.shouldTreatAsMath(value)) continue;

      parts.push({ kind: 'text', value: text.slice(cursor, match.index) });
      parts.push({ kind: 'math', value: value.trim() });
      cursor = match.index + value.length;
    }

    parts.push({ kind: 'text', value: text.slice(cursor) });
  }

  shouldTreatAsMath(value: string): boolean {
    const trimmed = value.trim();
    if (!trimmed) return false;

    if (trimmed.length > 44) return false;
    if (/\b(?:with|between|feature|shipping|outage|modern|systems|handle|inputs|size|roughly|orders|magnitude)\b/i.test(trimmed)) return false;
    if (/[A-Za-z]{2,}\s*\/\s*[A-Za-z]{2,}/.test(trimmed)) return false;
    if (/^n\s*=/.test(trimmed)) return false;
    if (/\b(?:algorithm|program|input|output|perform|grows|integer|machine|primitive)\b/i.test(trimmed)) return false;

    return /(?:\b(?:T|S|f|g|h)\s*\(|\b(?:O|Θ|Omega|Ω)\s*\(|\b(?:lg|log|sqrt)\b|[A-Z]\[[^\]]+\]|==|<=|>=|=|<|>|\^|\*)/.test(trimmed);
  }

  buildFraction(rawNumerator: string, rawDenominator: string): MathPart {
    let numerator = rawNumerator.trim();
    let denominator = rawDenominator.trim();
    let negative = false;

    if (numerator.startsWith('-')) {
      negative = !negative;
      numerator = numerator.slice(1);
    } else if (numerator.startsWith('+')) {
      numerator = numerator.slice(1);
    }

    if (denominator.startsWith('-')) {
      negative = !negative;
      denominator = denominator.slice(1);
    } else if (denominator.startsWith('+')) {
      denominator = denominator.slice(1);
    }

    return {
      kind: 'fraction',
      sign: negative ? '-' : '',
      numerator,
      denominator
    };
  }
}
