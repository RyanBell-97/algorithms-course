import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import katex from 'katex';

@Component({
  selector: 'app-formula-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span
      class="formula-renderer"
      [class.formula-renderer--display]="display"
      [innerHTML]="html">
    </span>
  `,
  styles: [`
    :host {
      direction: ltr;
      display: block;
      max-width: 100%;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: thin;
      unicode-bidi: isolate;
    }

    .formula-renderer {
      display: inline-block;
      max-width: 100%;
    }

    .formula-renderer--display {
      display: block;
      min-width: max-content;
      padding: .15rem 0;
      text-align: center;
    }

    :host ::ng-deep .katex-display {
      margin: 0;
      overflow-x: auto;
      overflow-y: hidden;
      padding: .08rem 0;
    }

    :host ::ng-deep .katex {
      white-space: nowrap;
    }

    @media (max-width: 640px) {
      .formula-renderer--display {
        font-size: .92rem;
      }
    }
  `]
})
export class FormulaRendererComponent implements OnChanges {
  @Input() latex = '';
  @Input() display = false;

  html: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    this.html = this.render(this.latex, this.display);
  }

  private render(latex: string, displayMode: boolean): SafeHtml {
    try {
      const html = katex.renderToString(this.normalizeLatex(latex || ''), {
        displayMode,
        throwOnError: false,
        strict: 'ignore',
        trust: false
      });
      return this.sanitizer.bypassSecurityTrustHtml(html);
    } catch {
      return this.toReadableFallback(latex || '');
    }
  }

  private normalizeLatex(latex: string): string {
    const commandNames = [
      'mathcal',
      'mathrm',
      'mathbb',
      'text',
      'sum',
      'frac',
      'tfrac',
      'binom',
      'cdot',
      'cdots',
      'exists',
      'forall',
      'ge',
      'le',
      'iff',
      'Rightarrow',
      'land',
      'quad',
      'to',
      'infty',
      'begin',
      'end',
      'cases',
      'max',
      'min',
      'Pr',
      'log'
    ];

    let normalized = latex
      .replace(/\bnge\b/g, 'n\\ge')
      .replace(/\bnle\b/g, 'n\\le')
      .replace(/\bnlog\b/g, 'n\\log');

    for (const command of commandNames) {
      // Don't prepend a backslash if the word is already escaped (\command)
      // or if it appears inside braces (e.g. \begin{cases} — the cases token there is an env name, not a macro)
      normalized = normalized.replace(new RegExp(`(?<![\\\\{])\\b${command}(?=\\{|_|\\b)`, 'g'), `\\${command}`);
    }

    normalized = normalized.replace(/(?<![\\{])\bin\b/g, '\\in');
    return normalized;
  }

  private toReadableFallback(latex: string): string {
    return this.normalizeLatex(latex)
      .replace(/\\Theta/g, '\u0398')
      .replace(/\\Omega/g, '\u03a9')
      .replace(/\\mathbb\{([^}]+)\}/g, '$1')
      .replace(/\\mathrm\{([^}]+)\}/g, '$1')
      .replace(/\\text\{([^}]+)\}/g, '$1')
      .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '($1)/($2)')
      .replace(/\\binom\{([^}]+)\}\{([^}]+)\}/g, 'C($1,$2)')
      .replace(/\\sum/g, '\u03a3')
      .replace(/\\cdots/g, '...')
      .replace(/\\cdot/g, '\u00b7')
      .replace(/\\le/g, '\u2264')
      .replace(/\\ge/g, '\u2265')
      .replace(/\\iff/g, '\u21d4')
      .replace(/\\Rightarrow/g, '\u21d2')
      .replace(/\\forall/g, '\u2200')
      .replace(/\\exists/g, '\u2203')
      .replace(/\\log/g, 'log')
      .replace(/\\quad/g, ' ')
      .replace(/\^\{([^}\n]{1,32})\}/g, (_full, exponent: string) => this.toSuperscript(exponent))
      .replace(/\^\(([^)\n]{1,32})\)/g, (_full, exponent: string) => this.toSuperscript(exponent))
      .replace(/\^([A-Za-z0-9+\-=]{1,12})/g, (_full, exponent: string) => this.toSuperscript(exponent))
      .replace(/\\/g, '');
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
}
