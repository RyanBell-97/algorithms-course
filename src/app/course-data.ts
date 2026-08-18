// @ts-nocheck
// University-level "Algorithms and Data Structures" course.
//
// English-only content. The syllabus follows a conventional university algorithms
// progression. Terminology is aligned with standard references, including CLRS.
// All course prose, diagrams, exercises, and interactive integrations in this
// repository are published under the terms described in LICENSE.md.

const courseId = 'algorithms-and-data-structures';

const block = (text, type = 'paragraph') => ({ type, text });

const tip = (text) => block(text, 'tip');
const example = (text) => block(text, 'example');

// Shared content patterns ----------------------------------------------------

const teachingArc = ({
  bigIdea,
  problem,
  intuition,
  formal,
  algorithm,
  worked,
  correctness,
  complexity,
  trace,
  takeaways,
  practice
}) => [
  block(`Big idea — ${bigIdea}`),
  block(`Problem being solved — ${problem}`),
  block(`Simple intuition — ${intuition}`),
  block(`Formal definition — ${formal}`),
  block(`Step-by-step — ${algorithm}`),
  example(`Worked example — ${worked}`),
  block(`Correctness — ${correctness}`),
  block(`Runtime and space — ${complexity}`),
  tip(`Interactive trace — ${trace}`),
  block(`Key takeaways — ${takeaways}`),
  example(`Practice exercise — ${practice}`)
];

const mcq = (id, prompt, options, answerIndex, explanation) => ({
  id,
  prompt,
  options,
  answerIndex,
  explanation
});

const l1MaximumScanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 360" role="img" aria-label="Maximum scan visual trace">
  <defs>
    <marker id="l1-scan-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f8a61"/>
    </marker>
    <linearGradient id="l1-scan-bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f4fbf7"/>
      <stop offset="1" stop-color="#fff7e8"/>
    </linearGradient>
  </defs>
  <rect x="12" y="12" width="796" height="336" rx="24" fill="url(#l1-scan-bg)" stroke="#d8e1ec"/>
  <text x="410" y="46" text-anchor="middle" font-size="24" font-weight="800" fill="#0f2038">MAXIMUM scans once and only updates when it sees a larger value</text>
  <text x="410" y="74" text-anchor="middle" font-size="14" fill="#52627a">Invariant during the scan: best is the maximum value in the prefix already inspected.</text>

  <g font-family="Inter, Arial, sans-serif" font-size="14" text-anchor="middle">
    <text x="82" y="120" fill="#60708a" font-weight="700">A[i]</text>
    <g transform="translate(130 96)">
      <rect x="0" y="0" width="54" height="48" rx="12" fill="#ffffff" stroke="#0f8a61" stroke-width="2"/>
      <text x="27" y="31" font-size="19" font-weight="800" fill="#0f2038">3</text>
      <text x="27" y="66" fill="#60708a">i=1</text>
    </g>
    <g transform="translate(198 96)">
      <rect x="0" y="0" width="54" height="48" rx="12" fill="#ffffff" stroke="#d8e1ec" stroke-width="2"/>
      <text x="27" y="31" font-size="19" font-weight="800" fill="#0f2038">1</text>
      <text x="27" y="66" fill="#60708a">i=2</text>
    </g>
    <g transform="translate(266 96)">
      <rect x="0" y="0" width="54" height="48" rx="12" fill="#ffffff" stroke="#0f8a61" stroke-width="2"/>
      <text x="27" y="31" font-size="19" font-weight="800" fill="#0f2038">4</text>
      <text x="27" y="66" fill="#60708a">i=3</text>
    </g>
    <g transform="translate(334 96)">
      <rect x="0" y="0" width="54" height="48" rx="12" fill="#ffffff" stroke="#d8e1ec" stroke-width="2"/>
      <text x="27" y="31" font-size="19" font-weight="800" fill="#0f2038">1</text>
      <text x="27" y="66" fill="#60708a">i=4</text>
    </g>
    <g transform="translate(402 96)">
      <rect x="0" y="0" width="54" height="48" rx="12" fill="#ffffff" stroke="#0f8a61" stroke-width="2"/>
      <text x="27" y="31" font-size="19" font-weight="800" fill="#0f2038">5</text>
      <text x="27" y="66" fill="#60708a">i=5</text>
    </g>
    <g transform="translate(470 96)">
      <rect x="0" y="0" width="54" height="48" rx="12" fill="#ffffff" stroke="#0f8a61" stroke-width="2"/>
      <text x="27" y="31" font-size="19" font-weight="800" fill="#0f2038">9</text>
      <text x="27" y="66" fill="#60708a">i=6</text>
    </g>
    <g transform="translate(538 96)">
      <rect x="0" y="0" width="54" height="48" rx="12" fill="#ffffff" stroke="#d8e1ec" stroke-width="2"/>
      <text x="27" y="31" font-size="19" font-weight="800" fill="#0f2038">2</text>
      <text x="27" y="66" fill="#60708a">i=7</text>
    </g>
    <g transform="translate(606 96)">
      <rect x="0" y="0" width="54" height="48" rx="12" fill="#ffffff" stroke="#d8e1ec" stroke-width="2"/>
      <text x="27" y="31" font-size="19" font-weight="800" fill="#0f2038">6</text>
      <text x="27" y="66" fill="#60708a">i=8</text>
    </g>
  </g>

  <path d="M158 196 H294 H430 H498" fill="none" stroke="#0f8a61" stroke-width="3" marker-end="url(#l1-scan-arrow)"/>
  <g font-size="13" fill="#52627a" text-anchor="middle">
    <text x="158" y="188">start best = 3</text>
    <text x="294" y="188">4 is larger</text>
    <text x="430" y="188">5 is larger</text>
    <text x="498" y="188">9 is larger</text>
  </g>

  <g font-family="Inter, Arial, sans-serif">
    <rect x="80" y="222" width="168" height="76" rx="16" fill="#ffffff" stroke="#0f8a61" stroke-width="2"/>
    <text x="164" y="250" text-anchor="middle" font-size="17" font-weight="800" fill="#0f2038">Prefix A[1..2]</text>
    <text x="164" y="275" text-anchor="middle" font-size="15" fill="#52627a">best = 3</text>
    <rect x="326" y="222" width="168" height="76" rx="16" fill="#ffffff" stroke="#0f8a61" stroke-width="2"/>
    <text x="410" y="250" text-anchor="middle" font-size="17" font-weight="800" fill="#0f2038">Prefix A[1..5]</text>
    <text x="410" y="275" text-anchor="middle" font-size="15" fill="#52627a">best = 5</text>
    <rect x="572" y="222" width="168" height="76" rx="16" fill="#ffffff" stroke="#0f8a61" stroke-width="2"/>
    <text x="656" y="250" text-anchor="middle" font-size="17" font-weight="800" fill="#0f2038">Whole array</text>
    <text x="656" y="275" text-anchor="middle" font-size="15" fill="#52627a">return 9</text>
  </g>
</svg>`;

const l2NestedLoopGridSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 500" role="img" aria-label="Nested loop execution grid">
  <defs>
    <linearGradient id="l2-grid-bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#f4fbf7"/>
      <stop offset="1" stop-color="#fff7e8"/>
    </linearGradient>
  </defs>
  <rect x="12" y="12" width="796" height="476" rx="24" fill="url(#l2-grid-bg)" stroke="#d8e1ec"/>
  <text x="410" y="48" text-anchor="middle" font-size="24" font-weight="800" fill="#0f2038">Nested loops are counted as a grid of executions</text>
  <text x="410" y="76" text-anchor="middle" font-size="14" fill="#52627a">Every filled square is one execution of the inner-loop body.</text>

  <g transform="translate(86 130)" font-family="Inter, Arial, sans-serif">
    <text x="120" y="-20" text-anchor="middle" font-size="17" font-weight="800" fill="#0f2038">Triangular inner loop</text>
    <text x="120" y="274" text-anchor="middle" font-size="14" fill="#52627a">for i = 1..n, for j = 1..i</text>
    <g stroke="#ffffff" stroke-width="3">
      <rect x="0" y="160" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="40" y="160" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="80" y="160" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="120" y="160" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="160" y="160" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="0" y="120" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="40" y="120" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="80" y="120" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="120" y="120" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="0" y="80" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="40" y="80" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="80" y="80" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="0" y="40" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="40" y="40" width="34" height="34" rx="7" fill="#0f8a61"/>
      <rect x="0" y="0" width="34" height="34" rx="7" fill="#0f8a61"/>
    </g>
    <text x="120" y="230" text-anchor="middle" font-size="16" font-weight="800" fill="#0f8a61">1 + 2 + ... + n</text>
    <text x="120" y="252" text-anchor="middle" font-size="16" font-weight="800" fill="#0f8a61">= Θ(n²)</text>
  </g>

  <g transform="translate(514 130)" font-family="Inter, Arial, sans-serif">
    <text x="120" y="-20" text-anchor="middle" font-size="17" font-weight="800" fill="#0f2038">Full rectangular loop</text>
    <text x="120" y="274" text-anchor="middle" font-size="14" fill="#52627a">for i = 1..n, for j = 1..n</text>
    <g stroke="#ffffff" stroke-width="3">
      <rect x="0" y="0" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="40" y="0" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="80" y="0" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="120" y="0" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="160" y="0" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="0" y="40" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="40" y="40" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="80" y="40" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="120" y="40" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="160" y="40" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="0" y="80" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="40" y="80" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="80" y="80" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="120" y="80" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="160" y="80" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="0" y="120" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="40" y="120" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="80" y="120" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="120" y="120" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="160" y="120" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="0" y="160" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="40" y="160" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="80" y="160" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="120" y="160" width="34" height="34" rx="7" fill="#d8a03a"/>
      <rect x="160" y="160" width="34" height="34" rx="7" fill="#d8a03a"/>
    </g>
    <text x="120" y="230" text-anchor="middle" font-size="16" font-weight="800" fill="#a56d0e">n · n</text>
    <text x="120" y="252" text-anchor="middle" font-size="16" font-weight="800" fill="#a56d0e">= Θ(n²)</text>
  </g>

  <rect x="230" y="420" width="360" height="42" rx="21" fill="#ffffff" stroke="#d8e1ec"/>
  <text x="410" y="447" text-anchor="middle" font-size="15" font-weight="800" fill="#0f2038">Different constants, same asymptotic class: Θ(n²)</text>
</svg>`;

// Refreshed Unit 1 diagrams ---------------------------------------------------
//
// The original Unit 1 lesson data below still contains inline SVGs. These
// centralised replacements are applied after the u1 object is constructed so
// the app gets cleaner, roomier diagrams without rewriting the lesson prose.

const u1Svg = (ariaLabel, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 540" role="img" aria-label="${ariaLabel}">
  <defs>
    <style>
      .u1-root { font-family: Inter, Arial, sans-serif; }
      .u1-title { fill: #10223a; font-size: 28px; font-weight: 900; letter-spacing: 0; }
      .u1-subtitle { fill: #52627a; font-size: 15px; font-weight: 600; }
      .u1-label { fill: #10223a; font-size: 17px; font-weight: 850; }
      .u1-small { fill: #52627a; font-size: 14px; font-weight: 600; }
      .u1-tiny { fill: #64748b; font-size: 12px; font-weight: 650; }
      .u1-card { fill: #ffffff; stroke: #d8e1ec; stroke-width: 2; }
      .u1-green { fill: #effaf4; stroke: #0f8a61; }
      .u1-blue { fill: #eef5ff; stroke: #2f5f9e; }
      .u1-gold { fill: #fff8e8; stroke: #d8a03a; }
      .u1-red { fill: #fff1f2; stroke: #d55252; }
      .u1-purple { fill: #f3efff; stroke: #7c3aed; }
      .u1-line { stroke: #10223a; stroke-width: 2; fill: none; }
      .u1-axis { stroke: #27405f; stroke-width: 2; fill: none; }
    </style>
  </defs>
  <g class="u1-root">
    <rect x="14" y="14" width="932" height="512" rx="26" fill="#fffdf7" stroke="#d8e1ec"/>
    ${body}
  </g>
</svg>`;

const u1Arrow = (x1, y1, x2, y2, color = '#0f8a61') => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
  const ux = dx / len;
  const uy = dy / len;
  const px = -uy;
  const py = ux;
  const bx = x2 - ux * 14;
  const by = y2 - uy * 14;
  const p1 = `${x2},${y2}`;
  const p2 = `${bx + px * 6},${by + py * 6}`;
  const p3 = `${bx - px * 6},${by - py * 6}`;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="3" stroke-linecap="round"/>
  <polygon points="${p1} ${p2} ${p3}" fill="${color}"/>`;
};

const u1Cell = (x, y, value, fill = '#ffffff', stroke = '#d8e1ec', note = '') => `<g>
  <rect x="${x}" y="${y}" width="58" height="52" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
  <text x="${x + 29}" y="${y + 33}" text-anchor="middle" font-size="21" font-weight="900" fill="#10223a">${value}</text>
  ${note ? `<text x="${x + 29}" y="${y + 72}" text-anchor="middle" class="u1-tiny">${note}</text>` : ''}
</g>`;

const u1CompactSvg = (ariaLabel, height, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 ${height}" role="img" aria-label="${ariaLabel}">
  <defs>
    <style>
      .u1c-root { font-family: Inter, Arial, sans-serif; }
      .u1c-title { fill: #10223a; font-size: 22px; font-weight: 900; letter-spacing: 0; }
      .u1c-subtitle { fill: #52627a; font-size: 13px; font-weight: 650; }
      .u1c-label { fill: #10223a; font-size: 15px; font-weight: 850; }
      .u1c-small { fill: #52627a; font-size: 13px; font-weight: 650; }
      .u1c-tiny { fill: #64748b; font-size: 11px; font-weight: 700; }
      .u1c-card { fill: #ffffff; stroke: #d8e1ec; stroke-width: 1.6; }
      .u1c-green { fill: #effaf4; stroke: #0f8a61; }
      .u1c-blue { fill: #eef5ff; stroke: #2f5f9e; }
      .u1c-gold { fill: #fff8e8; stroke: #d8a03a; }
      .u1c-red { fill: #fff1f2; stroke: #d55252; }
      .u1c-purple { fill: #f3efff; stroke: #7c3aed; }
      .u1c-axis { stroke: #27405f; stroke-width: 2; fill: none; }
    </style>
  </defs>
  <g class="u1c-root">
    <rect x="10" y="10" width="620" height="${height - 20}" rx="20" fill="#fffdf7" stroke="#d8e1ec"/>
    ${body}
  </g>
</svg>`;

const u1CompactCell = (x, y, value, fill = '#ffffff', stroke = '#d8e1ec', note = '') => `<g>
  <rect x="${x}" y="${y}" width="44" height="38" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
  <text x="${x + 22}" y="${y + 25}" text-anchor="middle" font-size="17" font-weight="900" fill="#10223a">${value}</text>
  ${note ? `<text x="${x + 22}" y="${y + 55}" text-anchor="middle" class="u1c-tiny">${note}</text>` : ''}
</g>`;

const u1AlgorithmContractSvg = u1CompactSvg('Algorithm contract diagram', 360, `
  <text x="320" y="48" text-anchor="middle" class="u1c-title">Algorithm contract</text>
  <text x="320" y="70" text-anchor="middle" class="u1c-subtitle">Specify the problem, run definite steps, then prove correctness and cost.</text>

  <rect x="44" y="104" width="150" height="76" rx="15" class="u1c-card u1c-green"/>
  <text x="119" y="133" text-anchor="middle" class="u1c-label">Problem</text>
  <text x="119" y="157" text-anchor="middle" class="u1c-small">input + output</text>

  <rect x="245" y="104" width="150" height="76" rx="15" class="u1c-card u1c-gold"/>
  <text x="320" y="133" text-anchor="middle" class="u1c-label">Algorithm</text>
  <text x="320" y="157" text-anchor="middle" class="u1c-small">finite clear steps</text>

  <rect x="446" y="104" width="150" height="76" rx="15" class="u1c-card u1c-blue"/>
  <text x="521" y="133" text-anchor="middle" class="u1c-label">Output</text>
  <text x="521" y="157" text-anchor="middle" class="u1c-small">satisfies goal</text>

  ${u1Arrow(198, 142, 238, 142)}
  ${u1Arrow(399, 142, 439, 142)}

  <rect x="84" y="246" width="200" height="68" rx="15" class="u1c-card u1c-purple"/>
  <text x="184" y="274" text-anchor="middle" class="u1c-label">Correctness</text>
  <text x="184" y="298" text-anchor="middle" class="u1c-small">works for every input</text>

  <rect x="356" y="246" width="200" height="68" rx="15" class="u1c-card u1c-green"/>
  <text x="456" y="274" text-anchor="middle" class="u1c-label">Cost analysis</text>
  <text x="456" y="298" text-anchor="middle" class="u1c-small">time + space vs n</text>

  <path d="M320 185 C278 210 230 218 184 240" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6" fill="none"/>
  <path d="M320 185 C362 210 410 218 456 240" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6" fill="none"/>
`);

const u1MaximumScanCleanSvg = u1CompactSvg('Maximum scan visual trace', 360, `
  <text x="320" y="46" text-anchor="middle" class="u1c-title">MAXIMUM scans once</text>
  <text x="320" y="68" text-anchor="middle" class="u1c-subtitle">Green cells are the only moments when best changes.</text>

  <text x="62" y="127" text-anchor="middle" class="u1c-label">A[i]</text>
  ${u1CompactCell(98, 102, 3, '#effaf4', '#0f8a61', 'i=1')}
  ${u1CompactCell(154, 102, 1, '#ffffff', '#d8e1ec', 'i=2')}
  ${u1CompactCell(210, 102, 4, '#effaf4', '#0f8a61', 'i=3')}
  ${u1CompactCell(266, 102, 1, '#ffffff', '#d8e1ec', 'i=4')}
  ${u1CompactCell(322, 102, 5, '#effaf4', '#0f8a61', 'i=5')}
  ${u1CompactCell(378, 102, 9, '#effaf4', '#0f8a61', 'i=6')}
  ${u1CompactCell(434, 102, 2, '#ffffff', '#d8e1ec', 'i=7')}
  ${u1CompactCell(490, 102, 6, '#ffffff', '#d8e1ec', 'i=8')}

  <rect x="84" y="214" width="118" height="56" rx="14" class="u1c-card u1c-green"/>
  <text x="143" y="238" text-anchor="middle" class="u1c-label">start</text>
  <text x="143" y="259" text-anchor="middle" class="u1c-small">best = 3</text>

  <rect x="242" y="214" width="118" height="56" rx="14" class="u1c-card u1c-green"/>
  <text x="301" y="238" text-anchor="middle" class="u1c-label">records</text>
  <text x="301" y="259" text-anchor="middle" class="u1c-small">4, 5, 9</text>

  <rect x="400" y="214" width="118" height="56" rx="14" class="u1c-card u1c-blue"/>
  <text x="459" y="238" text-anchor="middle" class="u1c-label">finish</text>
  <text x="459" y="259" text-anchor="middle" class="u1c-small">return 9</text>

  ${u1Arrow(206, 242, 236, 242)}
  ${u1Arrow(364, 242, 394, 242)}

  <rect x="116" y="304" width="408" height="34" rx="17" fill="#ffffff" stroke="#d8e1ec" stroke-width="1.6"/>
  <text x="320" y="326" text-anchor="middle" class="u1c-small">Invariant: after i, best is max(A[1..i]).</text>
`);

const u1RamModelCleanSvg = u1CompactSvg('RAM model diagram', 360, `
  <text x="320" y="46" text-anchor="middle" class="u1c-title">RAM model: count simple steps</text>
  <text x="320" y="68" text-anchor="middle" class="u1c-subtitle">Each primitive operation has unit cost.</text>

  <rect x="42" y="112" width="150" height="76" rx="15" class="u1c-card u1c-blue"/>
  <text x="117" y="141" text-anchor="middle" class="u1c-label">Line of code</text>
  <text x="117" y="164" text-anchor="middle" class="u1c-small">A[i] = A[i - 1]</text>

  <rect x="245" y="104" width="150" height="92" rx="15" fill="#10223a" stroke="#10223a"/>
  <text x="320" y="135" text-anchor="middle" font-size="16" font-weight="900" fill="#ffffff">Primitive ops</text>
  <text x="320" y="160" text-anchor="middle" font-size="12" font-weight="750" fill="#dbeafe">read / write</text>
  <text x="320" y="179" text-anchor="middle" font-size="12" font-weight="750" fill="#dbeafe">compare / branch</text>

  <rect x="448" y="112" width="150" height="76" rx="15" class="u1c-card u1c-green"/>
  <text x="523" y="141" text-anchor="middle" class="u1c-label">Total cost</text>
  <text x="523" y="164" text-anchor="middle" class="u1c-small">T(n) from counts</text>

  ${u1Arrow(196, 150, 238, 150, '#2f5f9e')}
  ${u1Arrow(399, 150, 441, 150, '#0f8a61')}

  <rect x="64" y="246" width="248" height="70" rx="15" class="u1c-card u1c-green"/>
  <text x="188" y="273" text-anchor="middle" class="u1c-label">Count these</text>
  <text x="188" y="297" text-anchor="middle" class="u1c-small">arithmetic, access, tests</text>

  <rect x="328" y="246" width="248" height="70" rx="15" class="u1c-card u1c-red"/>
  <text x="452" y="273" text-anchor="middle" class="u1c-label">Ignore at first</text>
  <text x="452" y="297" text-anchor="middle" class="u1c-small">cache, OS, compiler details</text>
`);

const u1NestedLoopGridCleanSvg = u1CompactSvg('Nested loop execution grid', 410, `
  <text x="320" y="44" text-anchor="middle" class="u1c-title">Nested loops become grids</text>
  <text x="320" y="66" text-anchor="middle" class="u1c-subtitle">Each square is one inner-loop run.</text>

  <rect x="42" y="98" width="262" height="268" rx="16" class="u1c-card"/>
  <text x="173" y="128" text-anchor="middle" class="u1c-label">Triangular loop</text>
  ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => {
    const filled = c <= r;
    return `<rect x="${97 + c * 32}" y="${150 + r * 32}" width="24" height="24" rx="5" fill="${filled ? '#0f8a61' : '#f8fafc'}" stroke="${filled ? '#ffffff' : '#d8e1ec'}" stroke-width="${filled ? '1.8' : '1.2'}"/>`;
  }).join('')).join('')}
  <text x="173" y="334" text-anchor="middle" class="u1c-small">1 + 2 + ... + n</text>
  <text x="173" y="356" text-anchor="middle" class="u1c-label">Theta(n^2)</text>

  <rect x="336" y="98" width="262" height="268" rx="16" class="u1c-card"/>
  <text x="467" y="128" text-anchor="middle" class="u1c-label">Rectangular loop</text>
  ${Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => `<rect x="${391 + c * 32}" y="${150 + r * 32}" width="24" height="24" rx="5" fill="#d8a03a" stroke="#ffffff" stroke-width="1.8"/>`).join('')).join('')}
  <text x="467" y="334" text-anchor="middle" class="u1c-small">n x n</text>
  <text x="467" y="356" text-anchor="middle" class="u1c-label">Theta(n^2)</text>

  <rect x="144" y="374" width="352" height="26" rx="13" fill="#effaf4" stroke="#0f8a61"/>
  <text x="320" y="392" text-anchor="middle" class="u1c-label">Half the square is still quadratic.</text>
`);

const u1StackedCostCleanSvg = u1CompactSvg('Stacked cost diagram', 360, `
  <text x="320" y="44" text-anchor="middle" class="u1c-title">SUM-ARRAY cost stacks</text>
  <text x="320" y="66" text-anchor="middle" class="u1c-subtitle">Five input sizes, five total costs.</text>

  <text x="66" y="102" text-anchor="middle" class="u1c-tiny">work</text>
  <line x1="92" y1="284" x2="448" y2="284" class="u1c-axis"/>
  <line x1="92" y1="284" x2="92" y2="102" class="u1c-axis"/>
  ${[0, 1, 2, 3, 4].map((i) => {
    const x = 128 + i * 64;
    const bodyHeight = 40 + i * 23;
    const overheadHeight = 24 + i * 8;
    const totalHeight = bodyHeight + overheadHeight;
    const topY = 284 - totalHeight;
    return `<rect x="${x}" y="${284 - bodyHeight}" width="46" height="${bodyHeight}" rx="8" fill="#dbeafe" stroke="#2f5f9e" stroke-width="1.8"/>
      <rect x="${x}" y="${topY}" width="46" height="${overheadHeight}" rx="8" fill="#effaf4" stroke="#0f8a61" stroke-width="1.8"/>
      <text x="${x + 23}" y="309" text-anchor="middle" class="u1c-tiny">n=${i + 1}</text>`;
  }).join('')}

  <rect x="470" y="120" width="124" height="80" rx="14" class="u1c-card"/>
  <rect x="488" y="140" width="20" height="13" rx="3" fill="#dbeafe" stroke="#2f5f9e"/>
  <text x="520" y="151" class="u1c-tiny">body work</text>
  <rect x="488" y="168" width="20" height="13" rx="3" fill="#effaf4" stroke="#0f8a61"/>
  <text x="520" y="179" class="u1c-tiny">loop/test</text>

  <text x="320" y="338" text-anchor="middle" class="u1c-small">More input items add proportional work.</text>
`);

const u1InsertionPrefixCleanSvg = u1Svg('Insertion sort sorted prefix diagram', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">Insertion sort grows a sorted prefix</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">At step j, A[1..j-1] is already sorted. The key slides left until it fits.</text>

  <text x="238" y="142" text-anchor="middle" class="u1-label">sorted prefix</text>
  <text x="483" y="142" text-anchor="middle" class="u1-label">key</text>
  <text x="660" y="142" text-anchor="middle" class="u1-label">unseen suffix</text>

  ${u1Cell(150, 178, 2, '#effaf4', '#0f8a61')}
  ${u1Cell(220, 178, 4, '#effaf4', '#0f8a61')}
  ${u1Cell(290, 178, 5, '#effaf4', '#0f8a61')}
  ${u1Cell(454, 178, 3, '#fff8e8', '#d8a03a')}
  ${u1Cell(608, 178, 6, '#eef5ff', '#2f5f9e')}
  ${u1Cell(678, 178, 1, '#eef5ff', '#2f5f9e')}

  <rect x="132" y="280" width="220" height="82" rx="18" class="u1-card u1-green"/>
  <text x="242" y="313" text-anchor="middle" class="u1-label">Invariant</text>
  <text x="242" y="340" text-anchor="middle" class="u1-small">prefix is sorted</text>

  <rect x="420" y="280" width="220" height="82" rx="18" class="u1-card u1-gold"/>
  <text x="530" y="313" text-anchor="middle" class="u1-label">Action</text>
  <text x="530" y="340" text-anchor="middle" class="u1-small">shift larger values right</text>

  <rect x="640" y="408" width="182" height="52" rx="18" class="u1-card u1-blue"/>
  <text x="731" y="441" text-anchor="middle" class="u1-small">then j moves forward</text>

  <path d="M482 244 C450 265 392 258 326 244" stroke="#d8a03a" stroke-width="4" fill="none"/>
  ${u1Arrow(353, 322, 412, 322, '#d8a03a')}
  ${u1Arrow(640, 322, 705, 402, '#2f5f9e')}
`);

const u1InsertionFramesCleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1038 691" role="img" aria-label="Frame-by-frame insertion sort trace">
  <defs>
    <filter id="u1-l3-frame-shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="9" stdDeviation="14" flood-color="#102142" flood-opacity="0.08"/>
    </filter>
    <linearGradient id="u1-l3-frame-blue" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#7cb5ff"/>
      <stop offset="1" stop-color="#4d83e6"/>
    </linearGradient>
    <linearGradient id="u1-l3-frame-green" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#87d9a6"/>
      <stop offset="1" stop-color="#52bd79"/>
    </linearGradient>
    <marker id="u1-l3-frame-red-arrow" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,10 L10,5 z" fill="#ef4444"/>
    </marker>
  </defs>

  <rect x="19" y="18" width="999" height="667" rx="17" fill="#ffffff" stroke="#e0e7f0" stroke-width="1.3"/>
  <circle cx="76" cy="75" r="37" fill="#eaf2ff"/>
  <path d="M59 92 V82 M74 92 V70 M89 92 V60" stroke="#6698ed" stroke-width="6" stroke-linecap="round"/>
  <path d="M57 73 L71 61 L79 66 L92 53" fill="none" stroke="#6698ed" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M86 53 H94 V61" fill="none" stroke="#6698ed" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>

  <text x="548" y="68" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="34" font-weight="900" fill="#071533">Frame-by-frame: sorting [5, 2, 4, 6, 1, 3]</text>
  <g font-family="Inter, Arial, sans-serif" font-size="17" fill="#071533">
    <circle cx="250" cy="100" r="8.5" fill="#58bf7c"/>
    <text x="267" y="106">Green = sorted prefix</text>
    <circle cx="466" cy="100" r="8.5" fill="#ffb21d"/>
    <text x="483" y="106">Yellow = current key</text>
    <circle cx="688" cy="100" r="8.5" fill="#ef4f55"/>
    <text x="705" y="106">Red = shifted right</text>
  </g>

  <rect x="39" y="133" width="958" height="445" rx="15" fill="#ffffff" stroke="#e1e7f0" stroke-width="1.2" filter="url(#u1-l3-frame-shadow)"/>

  ${[
    ['play', 'Start', [5, 2, 4, 6, 1, 3], ['green', 'plain', 'plain', 'plain', 'plain', 'plain'], ''],
    ['1', 'Insert 2', [2, 5, 4, 6, 1, 3], ['green', 'red', 'plain', 'plain', 'plain', 'plain'], '5 shifts right,\\n2 is inserted'],
    ['2', 'Insert 4', [2, 4, 5, 6, 1, 3], ['green', 'yellow', 'red', 'plain', 'plain', 'plain'], '5 shifts right,\\n4 is inserted'],
    ['3', 'Insert 6', [2, 4, 5, 6, 1, 3], ['green', 'green', 'green', 'yellow', 'plain', 'plain'], '6 already in place,\\nno shifts'],
    ['4', 'Insert 1', [1, 2, 4, 5, 6, 3], ['yellow', 'red', 'red', 'red', 'red', 'plain'], '2, 4, 5, 6 shift right,\\n1 is inserted'],
    ['5', 'Insert 3', [1, 2, 3, 4, 5, 6], ['green', 'green', 'yellow', 'red', 'red', 'red'], '4, 5, 6 shift right,\\n3 is inserted'],
    ['check', 'Finish', [1, 2, 3, 4, 5, 6], ['green', 'green', 'green', 'green', 'green', 'green'], 'Sorted!']
  ].map((row, rowIndex) => {
    const [badge, label, values, tones, note] = row;
    const y = 153 + rowIndex * 62;
    const line = rowIndex < 6 ? `<line x1="58" y1="${y + 52}" x2="980" y2="${y + 52}" stroke="#e3e8ef" stroke-width="1.2" stroke-dasharray="5 5"/>` : '';
    const badgeSvg = badge === 'play'
      ? `<circle cx="91" cy="${y + 19}" r="15" fill="#8fb7ff"/><path d="M87 ${y + 11} L99 ${y + 19} L87 ${y + 27} Z" fill="#ffffff"/>`
      : badge === 'check'
        ? `<circle cx="91" cy="${y + 19}" r="15" fill="#62c987"/><path d="M83 ${y + 18} L89 ${y + 24} L100 ${y + 12}" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>`
        : `<circle cx="91" cy="${y + 19}" r="15" fill="url(#u1-l3-frame-blue)"/><text x="91" y="${y + 25}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="900" fill="#ffffff">${badge}</text>`;
    const cells = values.map((value, index) => {
      const x = 246 + index * 82;
      const tone = tones[index];
      const fill = tone === 'green' ? '#edfff5' : tone === 'yellow' ? '#fff6dc' : tone === 'red' ? '#fff1f1' : '#ffffff';
      const stroke = tone === 'green' ? '#43c978' : tone === 'yellow' ? '#ffad17' : tone === 'red' ? '#fb6268' : '#b9c3d2';
      return `<rect x="${x}" y="${y}" width="73" height="42" rx="6" fill="${fill}" stroke="${stroke}" stroke-width="1.35"/>
        <text x="${x + 36.5}" y="${y + 29}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="900" fill="#071533">${value}</text>`;
    }).join('');
    const noteLines = String(note).split('\\n');
    const noteBox = note === ''
      ? ''
      : note === 'Sorted!'
        ? `<rect x="796" y="${y}" width="146" height="42" rx="7" fill="#f0fff5" stroke="#6bd18d" stroke-width="1.2"/>
          <text x="859" y="${y + 27}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="17" font-weight="900" fill="#0c8d45">Sorted!</text>
          <path d="M901 ${y + 12} L904 ${y + 19} L911 ${y + 22} L904 ${y + 25} L901 ${y + 32} L898 ${y + 25} L891 ${y + 22} L898 ${y + 19} Z" fill="#ffb21d"/>
          <path d="M917 ${y + 7} L919 ${y + 12} L924 ${y + 14} L919 ${y + 16} L917 ${y + 21} L915 ${y + 16} L910 ${y + 14} L915 ${y + 12} Z" fill="#ffb21d"/>`
        : `<path d="M797 ${y + 21} C772 ${y + 35} 753 ${y + 36} 736 ${y + 28}" fill="none" stroke="#ef4444" stroke-width="2" marker-end="url(#u1-l3-frame-red-arrow)"/>
          <rect x="803" y="${y - 4}" width="${note.includes('2, 4') ? 165 : 136}" height="48" rx="7" fill="#ffffff" stroke="#c8d1df" stroke-width="1.2"/>
          ${noteLines.map((lineText, lineIndex) => `<text x="816" y="${y + 14 + lineIndex * 19}" font-family="Inter, Arial, sans-serif" font-size="14" font-weight="750" fill="#071533">${lineText}</text>`).join('')}`;
    return `${badgeSvg}
      <text x="118" y="${y + 25}" font-family="Inter, Arial, sans-serif" font-size="16" font-weight="900" fill="#071533">${label}</text>
      ${cells}
      ${noteBox}
      ${line}`;
  }).join('')}

  <rect x="39" y="593" width="949" height="83" rx="11" fill="#f4f9ff" stroke="#cfe2ff" stroke-width="1.3"/>
  <g font-family="Inter, Arial, sans-serif">
    <rect x="79" y="608" width="20" height="20" rx="2" fill="#edfff5" stroke="#43c978"/>
    <text x="113" y="623" font-size="17" font-weight="900" fill="#16964d">Green</text>
    <text x="113" y="642" font-size="13.5" font-weight="800" fill="#071533">Sorted prefix</text>
    <text x="113" y="659" font-size="13.5" font-weight="800" fill="#071533">(in place)</text>
    <line x1="258" y1="606" x2="258" y2="662" stroke="#d6deeb" stroke-width="1.4"/>

    <rect x="288" y="608" width="20" height="20" rx="2" fill="#fff6dc" stroke="#ffad17"/>
    <text x="322" y="623" font-size="17" font-weight="900" fill="#f59a00">Yellow</text>
    <text x="322" y="642" font-size="13.5" font-weight="800" fill="#071533">Current key</text>
    <text x="322" y="659" font-size="13.5" font-weight="800" fill="#071533">being inserted</text>
    <line x1="473" y1="606" x2="473" y2="662" stroke="#d6deeb" stroke-width="1.4"/>

    <rect x="504" y="608" width="20" height="20" rx="2" fill="#fff1f1" stroke="#fb6268"/>
    <text x="538" y="623" font-size="17" font-weight="900" fill="#ef4444">Red</text>
    <text x="538" y="642" font-size="13.5" font-weight="800" fill="#071533">Elements shifted</text>
    <text x="538" y="659" font-size="13.5" font-weight="800" fill="#071533">one position right</text>
    <line x1="704" y1="606" x2="704" y2="662" stroke="#d6deeb" stroke-width="1.4"/>

    <circle cx="754" cy="634" r="21" fill="#dbeafe"/>
    <path d="M754 620 V641 M744 632 L754 642 L764 632" fill="none" stroke="#155fd2" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M742 648 H766" stroke="#155fd2" stroke-width="3.2" stroke-linecap="round"/>
    <text x="789" y="623" font-size="16" font-weight="900" fill="#155fd2">Read top to bottom</text>
    <text x="789" y="642" font-size="13.5" font-weight="800" fill="#071533">Each row shows the array</text>
    <text x="789" y="659" font-size="13.5" font-weight="800" fill="#071533">after one insertion step.</text>
  </g>
</svg>`;

const u1LoopInvariantCleanSvg = u1Svg('Loop invariant proof cycle', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">Loop invariants are induction for algorithms</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">A proof is complete only when all three steps connect cleanly.</text>

  <circle cx="480" cy="275" r="86" fill="#ffffff" stroke="#d8e1ec" stroke-width="2"/>
  <text x="480" y="264" text-anchor="middle" class="u1-label">Invariant</text>
  <text x="480" y="292" text-anchor="middle" class="u1-small">true before each</text>
  <text x="480" y="314" text-anchor="middle" class="u1-small">loop iteration</text>

  <rect x="84" y="138" width="230" height="106" rx="20" class="u1-card u1-blue"/>
  <text x="199" y="176" text-anchor="middle" class="u1-label">1. Initialization</text>
  <text x="199" y="205" text-anchor="middle" class="u1-small">true before the loop</text>
  <text x="199" y="228" text-anchor="middle" class="u1-small">starts</text>

  <rect x="646" y="138" width="230" height="106" rx="20" class="u1-card u1-gold"/>
  <text x="761" y="176" text-anchor="middle" class="u1-label">2. Maintenance</text>
  <text x="761" y="205" text-anchor="middle" class="u1-small">one iteration preserves</text>
  <text x="761" y="228" text-anchor="middle" class="u1-small">the statement</text>

  <rect x="365" y="392" width="230" height="106" rx="20" class="u1-card u1-green"/>
  <text x="480" y="430" text-anchor="middle" class="u1-label">3. Termination</text>
  <text x="480" y="459" text-anchor="middle" class="u1-small">when the loop stops,</text>
  <text x="480" y="482" text-anchor="middle" class="u1-small">the goal follows</text>

  ${u1Arrow(315, 206, 402, 244, '#2f5f9e')}
  ${u1Arrow(558, 244, 645, 206, '#d8a03a')}
  ${u1Arrow(735, 250, 575, 392, '#0f8a61')}
  ${u1Arrow(385, 392, 225, 250, '#7c3aed')}
`);

const u1GrowthHierarchyCleanSvg = u1Svg('Growth rate hierarchy', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">Growth classes, slowest to fastest</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">For large n, each step to the right eventually dominates every step to its left.</text>

  ${[
    ['1', 96, 300, 80, '#effaf4', '#0f8a61'],
    ['log n', 190, 280, 96, '#effaf4', '#0f8a61'],
    ['n', 300, 250, 112, '#effaf4', '#0f8a61'],
    ['n log n', 428, 215, 130, '#fff8e8', '#d8a03a'],
    ['n&#178;', 574, 176, 145, '#fff8e8', '#d8a03a'],
    ['2&#8319;', 736, 126, 165, '#fff1f2', '#d55252']
  ].map(([label, x, y, w, fill, stroke]) => `<rect x="${x}" y="${y}" width="${w}" height="${420 - y}" rx="16" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <text x="${x + w / 2}" y="${y - 18}" text-anchor="middle" class="u1-label">${label}</text>`).join('')}
  <line x1="82" y1="420" x2="880" y2="420" class="u1-axis"/>
  <text x="100" y="462" class="u1-small">more scalable</text>
  <text x="766" y="462" class="u1-small">explodes quickly</text>
  ${u1Arrow(220, 458, 740, 458, '#10223a')}
`);

const u1AsymptoticSetsCleanSvg = u1Svg('O Omega Theta as sets', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">O, &#920;, and &#937; are sets of functions</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">Theta is the overlap: functions that are both upper-bounded and lower-bounded by g.</text>

  <ellipse cx="388" cy="278" rx="230" ry="150" fill="#eef5ff" stroke="#2f5f9e" stroke-width="3"/>
  <ellipse cx="572" cy="278" rx="230" ry="150" fill="#fff8e8" stroke="#d8a03a" stroke-width="3" fill-opacity=".82"/>
  <ellipse cx="480" cy="278" rx="112" ry="90" fill="#effaf4" stroke="#0f8a61" stroke-width="3"/>

  <text x="298" y="178" text-anchor="middle" font-size="25" font-weight="900" fill="#2f5f9e">O(g)</text>
  <text x="662" y="178" text-anchor="middle" font-size="25" font-weight="900" fill="#a56d0e">&#937;(g)</text>
  <text x="480" y="268" text-anchor="middle" font-size="27" font-weight="900" fill="#0f8a61">&#920;(g)</text>
  <text x="480" y="300" text-anchor="middle" class="u1-small">tight growth</text>

  <rect x="84" y="438" width="792" height="48" rx="18" class="u1-card"/>
  <text x="480" y="469" text-anchor="middle" class="u1-small">Big-O: no faster. Big-Omega: no slower. Big-Theta: same growth up to constants.</text>
`);

const u1ThetaSandwichCleanSvg = u1Svg('Theta sandwich diagram', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">The Theta sandwich</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">After n0, f(n) must stay between two constant multiples of g(n).</text>

  <line x1="154" y1="420" x2="790" y2="420" class="u1-axis"/>
  <line x1="154" y1="420" x2="154" y2="130" class="u1-axis"/>
  <path d="M170 392 C270 366 352 304 438 258 C542 204 642 172 764 122" stroke="#d8a03a" stroke-width="4" fill="none"/>
  <path d="M170 407 C284 394 372 370 458 346 C560 316 646 296 764 270" stroke="#d8a03a" stroke-width="4" fill="none"/>
  <path d="M170 398 C250 350 310 385 370 330 C432 274 474 330 538 260 C604 198 672 285 764 188" stroke="#10223a" stroke-width="4" fill="none"/>
  <line x1="438" y1="420" x2="438" y2="124" stroke="#64748b" stroke-width="3" stroke-dasharray="8 8"/>

  <text x="780" y="124" class="u1-label">c2 g(n)</text>
  <text x="780" y="192" class="u1-label">f(n)</text>
  <text x="780" y="274" class="u1-label">c1 g(n)</text>
  <text x="438" y="448" text-anchor="middle" class="u1-label">n0</text>
  <text x="798" y="448" class="u1-small">n</text>
  <text x="112" y="150" class="u1-small" transform="rotate(-90 112 150)">value</text>
`);

const u1CaseRuntimeCleanSvg = u1Svg('Best worst average case runtime diagram', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">One input size can have many runtimes</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">Best case is the minimum, worst case is the maximum, and average needs probabilities.</text>

  <line x1="128" y1="420" x2="828" y2="420" class="u1-axis"/>
  <line x1="128" y1="420" x2="128" y2="130" class="u1-axis"/>
  ${[70, 98, 132, 154, 190, 222, 250, 286, 316, 354, 388, 430].map((h, i) => {
    const x = 178 + i * 48;
    const fill = i === 0 ? '#effaf4' : i === 11 ? '#fff1f2' : '#eef5ff';
    const stroke = i === 0 ? '#0f8a61' : i === 11 ? '#d55252' : '#2f5f9e';
    return `<rect x="${x}" y="${420 - h}" width="28" height="${h}" rx="7" fill="${fill}" stroke="${stroke}" stroke-width="2"/>`;
  }).join('')}
  <line x1="166" y1="250" x2="746" y2="250" stroke="#d8a03a" stroke-width="3" stroke-dasharray="8 8"/>
  <text x="190" y="330" text-anchor="middle" class="u1-label">best</text>
  <text x="732" y="80" text-anchor="middle" class="u1-label">worst</text>
  <text x="812" y="256" class="u1-label">average</text>
  <text x="472" y="470" text-anchor="middle" class="u1-small">all valid inputs of the same size n</text>
`);

const u1PlaneSweepCleanSvg = u1Svg('Plane sweep closest pair diagram', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">Plane sweep keeps only relevant nearby points</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">Sort by x-coordinate, move the sweep line, and keep an active set inside distance delta.</text>

  <rect x="118" y="124" width="620" height="330" rx="18" fill="#ffffff" stroke="#d8e1ec" stroke-width="2"/>
  <line x1="118" y1="454" x2="738" y2="454" class="u1-axis"/>
  <line x1="118" y1="454" x2="118" y2="124" class="u1-axis"/>
  <rect x="420" y="124" width="142" height="330" fill="#effaf4" stroke="#0f8a61" stroke-width="2" stroke-dasharray="8 8" opacity=".88"/>
  <line x1="562" y1="124" x2="562" y2="454" stroke="#0f8a61" stroke-width="4"/>
  <text x="562" y="112" text-anchor="middle" class="u1-label">sweep line</text>
  <text x="491" y="478" text-anchor="middle" class="u1-small">active strip: x within delta</text>

  ${[
    [170, 386, '#94a3b8'], [238, 255, '#94a3b8'], [316, 340, '#94a3b8'],
    [436, 286, '#0f8a61'], [492, 236, '#0f8a61'], [538, 316, '#0f8a61'],
    [612, 188, '#10223a'], [690, 374, '#10223a']
  ].map(([x, y, fill]) => `<circle cx="${x}" cy="${y}" r="10" fill="${fill}" stroke="#ffffff" stroke-width="3"/>`).join('')}
  <line x1="492" y1="236" x2="538" y2="316" stroke="#d8a03a" stroke-width="4"/>
  <text x="548" y="274" class="u1-label">delta</text>

  <rect x="770" y="164" width="126" height="194" rx="18" class="u1-card u1-green"/>
  <text x="833" y="198" text-anchor="middle" class="u1-label">Active set</text>
  <text x="833" y="228" text-anchor="middle" class="u1-small">ordered by y</text>
  <text x="833" y="270" text-anchor="middle" class="u1-small">query nearby</text>
  <text x="833" y="294" text-anchor="middle" class="u1-small">candidates</text>
  <text x="833" y="334" text-anchor="middle" class="u1-small">drop old points</text>
`);

const u1PackingCleanSvg = u1Svg('Packing argument rectangle', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">Packing keeps the candidate count constant</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">If every pair in the active set is at least delta apart, only one point fits in each small cell.</text>

  <rect x="214" y="136" width="360" height="280" rx="12" fill="#ffffff" stroke="#10223a" stroke-width="3"/>
  ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 2 }, (_, c) => `<rect x="${214 + c * 180}" y="${136 + r * 70}" width="180" height="70" fill="${(r + c) % 2 ? '#f8fafc' : '#effaf4'}" stroke="#cbd5e1" stroke-width="2"/>`).join('')).join('')}
  <line x1="214" y1="436" x2="574" y2="436" stroke="#d8a03a" stroke-width="3"/>
  <text x="394" y="466" text-anchor="middle" class="u1-label">width = delta</text>
  <line x1="594" y1="136" x2="594" y2="416" stroke="#d8a03a" stroke-width="3"/>
  <text x="628" y="282" class="u1-label" transform="rotate(90 628 282)">height = 2 delta</text>
  ${[[260, 178], [458, 230], [314, 302], [484, 378]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="10" fill="#0f8a61" stroke="#ffffff" stroke-width="3"/>`).join('')}
  <circle cx="676" cy="278" r="13" fill="#d8a03a" stroke="#ffffff" stroke-width="3"/>
  <text x="706" y="283" class="u1-label">current point</text>
  <rect x="690" y="344" width="182" height="70" rx="16" class="u1-card u1-blue"/>
  <text x="781" y="374" text-anchor="middle" class="u1-small">constant number</text>
  <text x="781" y="397" text-anchor="middle" class="u1-small">of comparisons</text>
`);

const u1ReviewPathCleanSvg = u1Svg('Lesson roadmap', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">Unit 1 review path</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">Refresh the map, practice with games, then finish with paper exercises and MCQs.</text>

  ${[
    ['1', 'Refresher', 'concept map', 78, '#eef5ff', '#2f5f9e'],
    ['2', 'Game 1', 'complexity match', 252, '#f3efff', '#7c3aed'],
    ['3', 'Game 2', 'inversions', 426, '#f3efff', '#7c3aed'],
    ['4', 'Game 3', 'proof bug', 600, '#f3efff', '#7c3aed'],
    ['5', 'Boss round', 'exercises + MCQs', 774, '#fff8e8', '#d8a03a']
  ].map(([n, title, sub, x, fill, stroke]) => `<rect x="${x}" y="190" width="128" height="122" rx="20" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <circle cx="${x + 64}" cy="170" r="24" fill="${stroke}"/>
    <text x="${x + 64}" y="178" text-anchor="middle" font-size="20" font-weight="900" fill="#ffffff">${n}</text>
    <text x="${x + 64}" y="232" text-anchor="middle" class="u1-label">${title}</text>
    <text x="${x + 64}" y="264" text-anchor="middle" class="u1-small">${sub}</text>`).join('')}
  ${u1Arrow(210, 252, 244, 252, '#7c3aed')}
  ${u1Arrow(384, 252, 418, 252, '#7c3aed')}
  ${u1Arrow(558, 252, 592, 252, '#7c3aed')}
  ${u1Arrow(732, 252, 766, 252, '#7c3aed')}
  <rect x="286" y="386" width="388" height="50" rx="18" class="u1-card u1-green"/>
  <text x="480" y="418" text-anchor="middle" class="u1-small">Do the three games before opening the solutions.</text>
`);

const u1ConceptMapCleanSvg = u1Svg('Unit 1 concept map', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">How the seven Unit 1 lessons connect</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">Definition -> cost model -> example algorithm -> proof -> growth -> cases -> better strategy.</text>

  ${[
    ['L1', 'Algorithm', 70, 150, '#effaf4', '#0f8a61'],
    ['L2', 'RAM model', 290, 150, '#eef5ff', '#2f5f9e'],
    ['L3', 'Insertion sort', 510, 150, '#fff8e8', '#d8a03a'],
    ['L4', 'Loop invariants', 730, 150, '#f3efff', '#7c3aed'],
    ['L5', 'Asymptotic notation', 180, 330, '#f3efff', '#7c3aed'],
    ['L6', 'Best / worst / avg', 400, 330, '#fff1f2', '#d55252'],
    ['L7', 'Plane sweep', 620, 330, '#effaf4', '#0f8a61']
  ].map(([code, title, x, y, fill, stroke]) => `<rect x="${x}" y="${y}" width="164" height="80" rx="18" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <text x="${x + 82}" y="${y + 31}" text-anchor="middle" class="u1-label">${code}</text>
    <text x="${x + 82}" y="${y + 58}" text-anchor="middle" class="u1-small">${title}</text>`).join('')}
  ${u1Arrow(236, 190, 280, 190, '#7c3aed')}
  ${u1Arrow(456, 190, 500, 190, '#7c3aed')}
  ${u1Arrow(676, 190, 720, 190, '#7c3aed')}
  ${u1Arrow(812, 236, 704, 324, '#7c3aed')}
  ${u1Arrow(620, 370, 574, 370, '#7c3aed')}
  ${u1Arrow(400, 370, 354, 370, '#7c3aed')}
`);

const u1GrowthLadderCleanSvg = u1Svg('Growth-rate ladder', `
  <text x="480" y="58" text-anchor="middle" class="u1-title">Growth ladder at n = 1,000</text>
  <text x="480" y="86" text-anchor="middle" class="u1-subtitle">The exact constants disappear; the growth class decides what survives scale.</text>

  ${[
    ['&#920;(1)', '1 op', 116, 394, 170, '#effaf4', '#0f8a61'],
    ['&#920;(log n)', '~10 ops', 116, 350, 210, '#effaf4', '#0f8a61'],
    ['&#920;(n)', '~1,000 ops', 116, 306, 270, '#effaf4', '#0f8a61'],
    ['&#920;(n log n)', '~10,000 ops', 116, 262, 360, '#fff8e8', '#d8a03a'],
    ['&#920;(n&#178;)', '~1,000,000 ops', 116, 218, 480, '#fff8e8', '#d8a03a'],
    ['&#920;(2&#8319;)', 'infeasible quickly', 116, 174, 650, '#fff1f2', '#d55252'],
    ['&#920;(n!)', 'explosive', 116, 130, 760, '#fff1f2', '#d55252']
  ].map(([label, detail, x, y, w, fill, stroke]) => `<rect x="${x}" y="${y}" width="${w}" height="28" rx="10" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
    <text x="${x + 18}" y="${y + 20}" class="u1-small">${label}</text>
    <text x="${x + w + 18}" y="${y + 20}" class="u1-tiny">${detail}</text>`).join('')}
  <line x1="102" y1="442" x2="102" y2="118" class="u1-axis"/>
  <polygon points="102,106 94,122 110,122" fill="#10223a"/>
  <text x="132" y="470" class="u1-small">slow / scalable</text>
  <text x="704" y="470" class="u1-small">fast-growing / dangerous</text>
`);

const unit1CleanDiagramSvgs = [
  [u1AlgorithmContractSvg, u1MaximumScanCleanSvg],
  [u1RamModelCleanSvg, u1NestedLoopGridCleanSvg, u1StackedCostCleanSvg],
  [null, u1InsertionFramesCleanSvg],
  [u1LoopInvariantCleanSvg],
  [u1GrowthHierarchyCleanSvg, u1AsymptoticSetsCleanSvg, u1ThetaSandwichCleanSvg],
  [u1CaseRuntimeCleanSvg],
  [u1PlaneSweepCleanSvg, u1PackingCleanSvg],
  [u1ReviewPathCleanSvg, u1ConceptMapCleanSvg, u1GrowthLadderCleanSvg]
];

// Lessons --------------------------------------------------------------------

const u1 = {
  id: 'algods-u1',
  title: 'Introduction and Algorithm Analysis',
  summary: 'What an algorithm is, the RAM cost model, insertion sort, loop invariants, and asymptotic notation.',
  lessons: [
    {
      title: 'What is an algorithm?',
      durationMinutes: 35,
      type: 'video',
      summary: 'A precise definition of "algorithm", the input and output contract, and what makes one correct.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'An algorithm is more than code. It is a precise method for solving a computational problem. Before we care about programming language syntax, we need to know the input, the required output, why the method always produces that output, and how much time and memory it uses.'
        },
        {
          type: 'diagram',
          title: 'The algorithm contract',
          caption: 'A complete solution separates the problem statement, the algorithm, the proof of correctness, and the runtime analysis.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 280" role="img" aria-label="Algorithm contract diagram">
  <defs>
    <marker id="algods-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f8a61"/>
    </marker>
  </defs>
  <rect x="20" y="26" width="165" height="86" rx="16" fill="#eef8f3" stroke="#0f8a61" stroke-width="2"/>
  <text x="102.5" y="59" text-anchor="middle" font-size="18" font-weight="700" fill="#0f2038">Problem P</text>
  <text x="102.5" y="86" text-anchor="middle" font-size="14" fill="#52627a">valid inputs and</text>
  <text x="102.5" y="104" text-anchor="middle" font-size="14" fill="#52627a">required outputs</text>
  <line x1="190" y1="69" x2="280" y2="69" stroke="#0f8a61" stroke-width="3" marker-end="url(#algods-arrow)"/>
  <rect x="285" y="26" width="190" height="86" rx="16" fill="#fff8e8" stroke="#d8a03a" stroke-width="2"/>
  <text x="380" y="59" text-anchor="middle" font-size="18" font-weight="700" fill="#0f2038">Algorithm A</text>
  <text x="380" y="86" text-anchor="middle" font-size="14" fill="#52627a">finite, effective,</text>
  <text x="380" y="104" text-anchor="middle" font-size="14" fill="#52627a">unambiguous steps</text>
  <line x1="480" y1="69" x2="570" y2="69" stroke="#0f8a61" stroke-width="3" marker-end="url(#algods-arrow)"/>
  <rect x="575" y="26" width="165" height="86" rx="16" fill="#eef5ff" stroke="#214a84" stroke-width="2"/>
  <text x="657.5" y="59" text-anchor="middle" font-size="18" font-weight="700" fill="#0f2038">Output</text>
  <text x="657.5" y="86" text-anchor="middle" font-size="14" fill="#52627a">satisfies the</text>
  <text x="657.5" y="104" text-anchor="middle" font-size="14" fill="#52627a">problem relation</text>
  <rect x="116" y="168" width="230" height="72" rx="16" fill="#fbfcfe" stroke="#d8e1ec" stroke-width="2"/>
  <text x="231" y="199" text-anchor="middle" font-size="17" font-weight="700" fill="#0f2038">Correctness proof</text>
  <text x="231" y="223" text-anchor="middle" font-size="14" fill="#52627a">works for every valid input</text>
  <rect x="414" y="168" width="230" height="72" rx="16" fill="#fbfcfe" stroke="#d8e1ec" stroke-width="2"/>
  <text x="529" y="199" text-anchor="middle" font-size="17" font-weight="700" fill="#0f2038">Cost analysis</text>
  <text x="529" y="223" text-anchor="middle" font-size="14" fill="#52627a">time and space as functions of n</text>
  <line x1="380" y1="116" x2="231" y2="164" stroke="#8ba0b8" stroke-width="2" stroke-dasharray="6 6"/>
  <line x1="380" y1="116" x2="529" y2="164" stroke="#8ba0b8" stroke-width="2" stroke-dasharray="6 6"/>
</svg>`
        },
        {
          type: 'heading',
          text: 'A short history of the word "algorithm"',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The word "algorithm" comes from the name of the 9th-century Persian mathematician Muhammad ibn Musa al-Khwarizmi, whose Latinized name became "Algorithmi". His textbook on Indian numerals introduced the decimal place-value system to medieval Europe, and "algorism" first meant the rules for arithmetic with these numerals. Over time, "algorithm" came to mean any precise calculation procedure, then any precise procedure, and today any finite, unambiguous method that solves a class of problems. The mathematics is much older than the word: Euclid\'s gcd procedure (~300 BC) and the Sieve of Eratosthenes are early examples that still appear in modern textbooks.'
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A useful timeline',
          text: 'Algorithms predate computers by millennia. The shift in the 20th century was not the invention of algorithms but the discovery of how to analyze them: input size n, asymptotic notation, lower bounds, and the very idea of an "uncomputable" problem (Turing, 1936).'
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'list',
          items: [
            'A computational problem describes which outputs are acceptable for each valid input. It is a specification, not yet an implementation.',
            'An instance is one concrete input for the problem, for example the array [3, 1, 4, 1, 5].',
            'An algorithm is a finite sequence of unambiguous, effectively executable steps.',
            'Correctness means that for every valid input, the algorithm halts and returns an output satisfying the problem specification.',
            'The input size n is the parameter used to measure cost. For an array problem, n is usually the number of elements.'
          ]
        },
        {
          type: 'heading',
          text: 'Knuth\'s five properties of an algorithm',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Donald Knuth, in The Art of Computer Programming (Vol. 1), states that every procedure must satisfy five properties to count as an algorithm. They generalize the requirements you have already seen and are the standard checklist used in textbooks and review questions.'
        },
        {
          type: 'table',
          caption: 'Knuth\'s five properties',
          columns: ['Property', 'Meaning', 'Typical violation'],
          rows: [
            ['Finiteness', 'The procedure must terminate after a finite number of steps for every valid input.', '"While true: keep guessing." — never halts on most inputs.'],
            ['Definiteness', 'Each step is precisely defined; the action to take is unambiguous.', '"Pick a good pivot." — what counts as good?'],
            ['Input', 'There are zero or more inputs from a specified set of valid inputs.', 'A procedure that silently assumes a sorted array without saying so.'],
            ['Output', 'There are one or more outputs related to the inputs in a specified way.', 'A procedure that prints intermediate state but never returns the requested answer.'],
            ['Effectiveness', 'Each operation must be basic enough to be performed exactly in a finite amount of time by a person using paper and pencil (or by a machine).', '"Compute the exact decimal expansion of pi." — not finite per step.']
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Quick mnemonic — "F-D-I-O-E"',
          text: 'Finiteness, Definiteness, Input, Output, Effectiveness. If you can defend each of the five for your procedure, it is an algorithm. If even one fails, it is at most a heuristic, a specification, or wishful thinking.'
        },
        {
          type: 'heading',
          text: 'Problem vs algorithm vs program',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A common source of confusion is treating these three layers as synonyms. They are not. The problem is fixed by the application; algorithms compete to solve it; a program is one concrete encoding of an algorithm in a particular language on a particular machine.'
        },
        {
          type: 'table',
          caption: 'Three distinct layers',
          columns: ['Layer', 'What it specifies', 'Example for sorting'],
          rows: [
            ['Problem', 'The valid inputs and the relation each output must satisfy.', 'Given an array of n integers, return a permutation in non-decreasing order.'],
            ['Algorithm', 'A finite, unambiguous, effective procedure that, for every valid input, produces an acceptable output.', 'Insertion sort, merge sort, quicksort, heap sort.'],
            ['Program', 'A specific implementation of the algorithm in a programming language and runtime.', 'A C++ function void sort(int* a, int n) using merge sort with malloc-allocated buffers.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Precise language',
          text: 'Do not prove correctness by showing one example. An example is a trace. A correctness proof explains why every valid input works.'
        },
        {
          type: 'heading',
          text: 'Intuition first',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Think of an algorithm as a recipe whose words leave no choices open. "Repeat until the array is sorted" is not precise enough unless you define how to test sortedness and what operation is repeated. "Scan from left to right and keep the largest value seen so far" is precise enough to become an algorithm for finding a maximum.'
        },
        {
          type: 'table',
          caption: 'Algorithm or not?',
          columns: ['Procedure', 'Algorithm?', 'Reason'],
          rows: [
            ['Try numbers until one looks good.', 'No', 'The stopping rule is subjective and may never halt.'],
            ['For i from 1 to n, compare A[i] with best and update best if larger.', 'Yes', 'The loop is finite and every step is unambiguous.'],
            ['Use the fastest possible sorting method.', 'No', 'It does not specify actual steps.'],
            ['Run binary search on a sorted array by repeatedly halving the search interval until the value is found or the interval is empty.', 'Yes', 'The sorted-input precondition and finite halving loop are clear.']
          ]
        },
        { type: 'interactive', artifact: 'algo-classifier' },
        {
          type: 'heading',
          text: 'Algorithm vs heuristic',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A heuristic is a procedure that often produces a useful answer but is not guaranteed to be correct or to halt within a stated bound. Many real systems combine a heuristic with a verifier: the heuristic is fast but uncertain, and the verifier checks whether the candidate output meets the specification. For this course, "algorithm" always means a procedure with a proof of correctness on every valid input. We study heuristics later, mostly for problems where exact algorithms are too slow (NP-hard problems, for example).'
        },
        {
          type: 'table',
          caption: 'Algorithm vs heuristic',
          columns: ['Criterion', 'Algorithm', 'Heuristic'],
          rows: [
            ['Always halts on every valid input', 'Yes — proved.', 'Often, but no proof of termination is required.'],
            ['Always returns a correct output', 'Yes — proved.', 'Usually approximate, sometimes wrong.'],
            ['Has a stated cost bound', 'Yes — for example O(n log n).', 'Often unanalyzed in the worst case.'],
            ['Typical use', 'Provable parts of a system: sorting, search, parsing, compilers.', 'NP-hard problems, machine-learning training, real-time decision-making under time pressure.']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common slip',
          text: 'Stochastic gradient descent on a neural network is a heuristic for non-convex optimization. The fact that it usually works does not make it an algorithm in the formal sense — there is no proof that it reaches a global optimum.'
        },
        {
          type: 'heading',
          text: 'Formal version',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Let P be a problem with a set of valid inputs and a solution relation Sol_P(I). An algorithm A solves P if the following statement is true.'
        },
        {
          type: 'formula',
          latex: 'forall I in mathcal{I}: A(I) text{ halts and } A(I) in mathrm{Sol}_P(I)',
          display: true,
          caption: 'Read this as: for every valid input I, A terminates and returns an acceptable solution for I.'
        },
        {
          type: 'heading',
          text: 'Step-by-step algorithm',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Here is a small example in CLRS-style pseudocode. The problem is: given a non-empty array A[1..n], return the maximum element.'
        },
        {
          type: 'code',
          title: 'MAXIMUM(A)',
          language: 'pseudocode',
          code: `MAXIMUM(A)
  best = A[1]
  for i = 2 to A.length
      if A[i] > best
          best = A[i]
  return best`
        },
        {
          type: 'diagram',
          title: 'Visual trace: best so far',
          caption: 'Only four positions change the current best. The grey comparisons still matter for runtime, because the algorithm must inspect every element to prove no larger value was missed.',
          svg: l1MaximumScanSvg
        },
        {
          type: 'heading',
          text: 'Pseudocode conventions',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'In this course we use CLRS-style pseudocode. It is precise enough to read like code but free of language-specific syntax so we can focus on the algorithm itself.'
        },
        {
          type: 'list',
          items: [
            'Indentation indicates block structure (no braces, no end-keywords).',
            'Assignment is written with "=" — distinct in context from the equality test "==". When clarity matters we write "←" for assignment.',
            'Arrays are 1-indexed unless stated otherwise: A[1..n] means A[1], A[2], ..., A[n]. The notation A.length gives the index of the last element.',
            'Variables declared inside a procedure are local; comments use //.',
            '"return x" terminates the procedure and produces output x. After return, no further statements run.',
            'Pass-by-reference is implicit for arrays and objects; pass-by-value otherwise. We never silently mutate inputs without saying so in the comment.',
            'NIL denotes a sentinel value standing for "no result" (analogous to null in Java or None in Python).'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why pseudocode and not Python?',
          text: 'Pseudocode lets us state an algorithm without worrying about whether the language has by-reference arrays, garbage collection, or fast hash tables. The complexity statement "Θ(n)" should be true regardless of the host language.'
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Trace MAXIMUM on A = [3, 1, 4, 1, 5, 9, 2, 6]. The important state variable is best.'
        },
        {
          type: 'table',
          caption: 'Trace of best so far',
          columns: ['Step', 'A[i]', 'Comparison', 'best after step'],
          rows: [
            ['Initial', 'A[1] = 3', 'none', '3'],
            ['i = 2', '1', '1 > 3 is false', '3'],
            ['i = 3', '4', '4 > 3 is true', '4'],
            ['i = 4', '1', '1 > 4 is false', '4'],
            ['i = 5', '5', '5 > 4 is true', '5'],
            ['i = 6', '9', '9 > 5 is true', '9'],
            ['i = 7', '2', '2 > 9 is false', '9'],
            ['i = 8', '6', '6 > 9 is false', '9']
          ]
        },
        {
          type: 'heading',
          text: 'A second example — Linear search',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A second algorithm to make the pattern stick. Problem: given a non-empty array A[1..n] and a value v, return the smallest index i such that A[i] = v, or NIL if v does not appear in A.'
        },
        {
          type: 'code',
          title: 'LINEAR-SEARCH(A, v)',
          language: 'pseudocode',
          code: `LINEAR-SEARCH(A, v)
  for i = 1 to A.length
      if A[i] == v
          return i
  return NIL`
        },
        {
          type: 'paragraph',
          text: 'Trace LINEAR-SEARCH on A = [3, 1, 4, 1, 5] looking for v = 4.'
        },
        {
          type: 'table',
          caption: 'Trace of LINEAR-SEARCH(A, 4)',
          columns: ['i', 'A[i]', 'A[i] == 4 ?', 'Action'],
          rows: [
            ['1', '3', 'false', 'continue to next i'],
            ['2', '1', 'false', 'continue to next i'],
            ['3', '4', 'true', 'return 3 — procedure halts immediately']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why two examples?',
          text: 'MAXIMUM always inspects every element; LINEAR-SEARCH may return early. Both are still algorithms: both halt, both are unambiguous, and both have a clear input and output contract. The difference is only the runtime profile, which is covered in the case-analysis lesson.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Loop invariant',
          text: 'At the start of each loop iteration with index i, best is the maximum element of A[1..i-1].'
        },
        {
          type: 'list',
          items: [
            'Initialization: before the first iteration, i = 2 and best = A[1], so best is the maximum of A[1..1].',
            'Maintenance: assume best is the maximum of A[1..i-1]. If A[i] > best, setting best = A[i] makes it the maximum of A[1..i]. Otherwise best remains the maximum of A[1..i].',
            'Termination: after the loop finishes, i = n + 1, so the invariant says best is the maximum of A[1..n]. That is exactly the required output.'
          ]
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why one example is not a proof',
          text: 'A trace shows the algorithm works on a single input. The loop-invariant argument shows it works on every input of every size, because the three checks (initialization, maintenance, termination) only assume the loop control flow — not the specific values. This is the gap between programming and algorithm correctness: we never test our way to "always works".'
        },
        {
          type: 'heading',
          text: 'Runtime and space complexity',
          level: 2
        },
        {
          type: 'formula',
          latex: 'T(n) = c_1 + c_2(n - 1) + c_3 = \\Theta(n)',
          display: true,
          caption: 'There are n - 1 loop iterations and constant work in each iteration.'
        },
        {
          type: 'table',
          caption: 'Cost summary',
          columns: ['Quantity', 'Value', 'Why'],
          rows: [
            ['Input size', 'n', 'The array contains n elements.'],
            ['Basic operation', 'comparison A[i] > best', 'This is the repeated operation that controls the loop cost.'],
            ['Worst-case time', 'Θ(n)', 'The loop still checks every element.'],
            ['Best-case time', 'Θ(n)', 'Even if A[1] is already the maximum, the algorithm must verify the rest.'],
            ['Extra space', 'O(1)', 'Only best and i are stored in addition to the input.']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common mistake',
          text: 'Do not say the best case is O(1) just because no update occurs. The comparisons still occur, so the running time is linear.'
        },
        {
          type: 'heading',
          text: 'Why study algorithms?',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A correct algorithm with a slow runtime can be the difference between a feature shipping and an outage. Modern systems handle inputs of size 10⁶ to 10⁹; the gap between a Θ(n²) and a Θ(n log n) algorithm at n = 10⁶ is roughly six orders of magnitude: minutes versus weeks on the same hardware.'
        },
        {
          type: 'list',
          items: [
            'Search engines: ranking billions of pages requires inverted indexes, near-linear merge, and probabilistic data structures.',
            'Routing: shortest paths in a city graph use Dijkstra or A* on tens of millions of edges.',
            'Cryptography: RSA, elliptic-curve signing, and hash-based proofs all rely on number-theoretic algorithms whose costs are precisely understood.',
            'Compilers: register allocation is graph coloring, and instruction scheduling is constrained search.',
            'Bioinformatics: aligning DNA sequences uses dynamic programming on grids of size in the millions.'
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Algorithms as a technology (CLRS Ch. 1.2)',
          text: 'Hardware speed roughly doubles every two years; a better algorithm can deliver a factor-1000 improvement in a single replacement of code. Both matter, but only one of them is something you control directly.'
        },
        {
          type: 'heading',
          text: 'Practice',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Write a loop invariant for finding the minimum of an array.',
            'Change MAXIMUM so it returns the index of the maximum value. What should the invariant track?',
            'Give one example of a precise algorithm and one example of an ambiguous procedure.',
            'Explain in one sentence why runtime analysis needs an input size parameter n.',
            'For each of Knuth\'s five properties, describe a concrete way it can fail and how to repair it.',
            'Modify LINEAR-SEARCH to return the LAST index where v occurs (instead of the first). State the new loop invariant.'
          ]
        },
        {
          type: 'heading',
          text: 'Summary',
          level: 2
        },
        {
          type: 'list',
          items: [
            'An algorithm is a finite, definite, effective procedure with a clear input and output contract that halts on every valid input.',
            'A problem specifies what; an algorithm specifies how; a program is one concrete realization in a programming language.',
            'Knuth\'s five properties — finiteness, definiteness, input, output, effectiveness — are the standard checklist.',
            'Correctness is proved with a loop invariant: initialization, maintenance, termination — never by example alone.',
            'Runtime is analyzed as a function T(n) of the input size n, in primitive operations of an idealized machine.',
            'A heuristic is not an algorithm: no termination or correctness guarantee on every valid input.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'You are ready for the next lesson',
          text: 'Lesson 2 introduces the RAM cost model — how we count "primitive operations" precisely so that the T(n) you saw in this lesson becomes a number you can compute by hand.'
        }
      ],
      content: teachingArc({
        bigIdea: 'an algorithm is a finite, unambiguous procedure that maps every valid input to the right output and halts.',
        problem: 'specify what a computation does — its input-output relation — without yet committing to how to do it.',
        intuition: 'a recipe with explicit steps and an unambiguous end state. "Cook until done" is not an algorithm.',
        formal: 'algorithm A solves problem P if for every input I, A halts and outputs an answer satisfying P. Required properties: finiteness, definiteness, effectiveness, and a clear input and output contract.',
        algorithm: 'specify the input type, the output condition, then list a finite sequence of steps that take any valid input to a satisfying output.',
        worked: 'Problem: given an integer array, return its maximum. Algorithm: scan once, maintain a "best so far" variable. Trivially halts (one pass) and is correct (the final "best so far" is the max).',
        correctness: 'use a loop invariant — "best so far is the maximum of A[1..i]" — and prove initialisation, maintenance, and termination.',
        complexity: 'Θ(n) time, O(1) extra space.',
        trace: 'walk through the maximum-finding scan on [3, 1, 4, 1, 5, 9, 2, 6] and predict the value of "best so far" after each step.',
        takeaways: 'an algorithm always halts; correctness needs proof, not just examples; runtime is measured in primitive operations under a chosen cost model.',
        practice: 'state the algorithm for "given a sorted array A and a value v, return whether v appears" without using language libraries, then identify the loop invariant.'
      }),
      practice: [
        mcq('algods-u1-l1-q1', 'Which property is NOT required for a procedure to count as an algorithm?',
          ['It always halts.', 'Each step is unambiguous.', 'It is the fastest known solution.', 'Its steps are effectively executable.'],
          2, 'Speed is desirable but not required. Algorithms can be slow and still be algorithms.'),
        mcq('algods-u1-l1-q2', 'What does "definiteness" mean in the definition of an algorithm?',
          ['It always returns an integer.', 'Every step is unambiguous.', 'It is implemented in code.', 'It is at most O(n) time.'],
          1, 'Definiteness means each step is precisely specified — no interpretation needed.')
      ]
    },
    {
      title: 'The RAM model',
      durationMinutes: 30,
      type: 'video',
      summary: 'The Random Access Machine: why we use it, what it includes, and what it deliberately ignores.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The RAM model is the standard measuring device for algorithms. It gives us a clean way to ask: how many basic steps does this algorithm perform as the input size n grows? The model deliberately ignores hardware details such as caches, branch prediction, operating systems, and compiler tricks, because the first goal is to compare algorithms rather than benchmark one laptop.'
        },
        {
          type: 'diagram',
          title: 'Random Access Machine model',
          caption: 'The RAM model treats simple operations on machine-word values as constant-time operations.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 330" role="img" aria-label="RAM model diagram">
  <defs>
    <marker id="ram-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f8a61"/>
    </marker>
  </defs>
  <rect x="24" y="42" width="150" height="76" rx="16" fill="#eef8f3" stroke="#0f8a61" stroke-width="2"/>
  <text x="99" y="76" text-anchor="middle" font-size="18" font-weight="700" fill="#0f2038">Input</text>
  <text x="99" y="101" text-anchor="middle" font-size="14" fill="#52627a">array A[1..n]</text>
  <line x1="179" y1="80" x2="275" y2="80" stroke="#0f8a61" stroke-width="3" marker-end="url(#ram-arrow)"/>
  <rect x="280" y="34" width="220" height="92" rx="18" fill="#fff8e8" stroke="#d8a03a" stroke-width="2"/>
  <text x="390" y="68" text-anchor="middle" font-size="18" font-weight="700" fill="#0f2038">Processor</text>
  <text x="390" y="94" text-anchor="middle" font-size="14" fill="#52627a">load, store, compare,</text>
  <text x="390" y="112" text-anchor="middle" font-size="14" fill="#52627a">add, branch: cost 1</text>
  <line x1="505" y1="80" x2="606" y2="80" stroke="#0f8a61" stroke-width="3" marker-end="url(#ram-arrow)"/>
  <rect x="612" y="42" width="144" height="76" rx="16" fill="#eef5ff" stroke="#214a84" stroke-width="2"/>
  <text x="684" y="76" text-anchor="middle" font-size="18" font-weight="700" fill="#0f2038">Output</text>
  <text x="684" y="101" text-anchor="middle" font-size="14" fill="#52627a">answer value</text>
  <line x1="390" y1="132" x2="390" y2="176" stroke="#0f8a61" stroke-width="3" marker-end="url(#ram-arrow)"/>
  <rect x="94" y="184" width="592" height="102" rx="18" fill="#fbfcfe" stroke="#d8e1ec" stroke-width="2"/>
  <text x="390" y="214" text-anchor="middle" font-size="18" font-weight="700" fill="#0f2038">Working memory</text>
  <g font-size="14" fill="#0f2038" text-anchor="middle">
    <rect x="130" y="236" width="74" height="32" rx="8" fill="#ffffff" stroke="#9fb0c8"/>
    <text x="167" y="257">cell 1</text>
    <rect x="212" y="236" width="74" height="32" rx="8" fill="#ffffff" stroke="#9fb0c8"/>
    <text x="249" y="257">cell 2</text>
    <rect x="294" y="236" width="74" height="32" rx="8" fill="#ffffff" stroke="#9fb0c8"/>
    <text x="331" y="257">cell 3</text>
    <text x="390" y="257" fill="#60708a">...</text>
    <rect x="454" y="236" width="74" height="32" rx="8" fill="#ffffff" stroke="#9fb0c8"/>
    <text x="491" y="257">cell k</text>
    <rect x="536" y="236" width="74" height="32" rx="8" fill="#ffffff" stroke="#9fb0c8"/>
    <text x="573" y="257">cell k+1</text>
  </g>
  <path d="M475 178 C530 145 570 135 627 122" fill="none" stroke="#8ba0b8" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="588" y="152" font-size="13" fill="#60708a">random access</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'list',
          items: [
            'A Random Access Machine is an idealized sequential computer used for algorithm analysis.',
            'Memory is a sequence of cells. Accessing any cell by address is counted as one primitive operation.',
            'A machine word is a value small enough to fit in one memory cell, often assumed to hold an input value or an index up to n.',
            'Primitive operations include arithmetic on words, comparison, assignment, array access, and branch instructions.',
            'The unit-cost assumption says each primitive operation costs O(1).',
            'The input size n is the variable used in the final running-time function T(n).'
          ]
        },
        {
          type: 'heading',
          text: 'What counts as primitive — and what does not',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The RAM model is precise about which operations cost one unit of time. The list below is the working definition for this course; it matches the CLRS textbook and is the standard model unless a problem states otherwise.'
        },
        {
          type: 'table',
          caption: 'RAM operations under the unit-cost model',
          columns: ['Operation', 'Cost', 'Note'],
          rows: [
            ['Add, subtract, multiply, divide on machine-word integers', 'Θ(1)', 'Provided operands fit in one word.'],
            ['Comparison (<, ≤, =, ≠) on words', 'Θ(1)', 'Branching on the result is also Θ(1).'],
            ['Assignment x = y', 'Θ(1)', 'A copy of one word.'],
            ['Array indexing A[i]', 'Θ(1)', 'Random access — independent of i.'],
            ['Following a pointer / object field access', 'Θ(1)', 'Treated as one address resolution.'],
            ['Procedure call and return', 'Θ(1) per call', 'Excluding the work done inside the body.'],
            ['Sorting an array of n elements', '✗ Not primitive', 'Must be expressed as Θ(n log n) primitive ops.'],
            ['Multiplying two integers of bit-length n', '✗ Not primitive when n is the input size', 'Needs the bit-cost model.'],
            ['Allocating a block of n cells', '✗ Not primitive', 'Costs Θ(n) under the standard model.']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'A common slip',
          text: 'Calling a library function such as sort(A) does not make sorting "free". The RAM cost of sort(A) is the number of primitive operations its implementation performs — usually Θ(n log n) — even if your code looks like one line.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Why this matters',
          text: 'When a problem asks for runtime, use RAM-model reasoning unless it explicitly asks for a bit-cost model.'
        },
        {
          type: 'heading',
          text: 'Intuition first',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Imagine each simple line of pseudocode has a tiny price tag. A line outside a loop is paid once. A line inside a loop is paid once per iteration. A line inside two nested loops is paid for every pair of iterations. RAM analysis is mostly careful counting of how often each line executes.'
        },
        {
          type: 'heading',
          text: 'Formal version',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'For a pseudocode listing, assign a constant cost c_i to line i, and let t_i(n) be the number of times line i executes on inputs of size n. Then the total running time is the sum of line cost times line frequency.'
        },
        {
          type: 'formula',
          latex: 'T(n) = sum_i c_i cdot t_i(n)',
          display: true,
          caption: 'Constants c_i depend on the chosen RAM instruction costs; execution counts t_i(n) depend on the algorithm and input size.'
        },
        {
          type: 'heading',
          text: 'Counting patterns you will use repeatedly',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'Most RAM analyses reduce to one of three sums. Memorize them — you will use them in every later runtime proof.'
        },
        {
          type: 'formula',
          latex: '\\sum_{k=1}^{n} 1 = n',
          display: true,
          caption: 'A loop body that runs n times: linear cost.'
        },
        {
          type: 'formula',
          latex: '\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2} = \\Theta(n^{2})',
          display: true,
          caption: 'Arithmetic series — appears whenever the inner-loop length grows linearly with the outer index.'
        },
        {
          type: 'formula',
          latex: '\\sum_{k=0}^{n-1} 2^{k} = 2^{n} - 1 = \\Theta(2^{n})',
          display: true,
          caption: 'Geometric series — appears in tree-shaped recursions and brute-force enumeration.'
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A handy shortcut',
          text: 'A double-nested loop where i = 1..n and j = 1..i has cost 1 + 2 + ... + n = n(n+1)/2 = Θ(n²). A double loop with j = 1..n (independent of i) has cost n · n = n² exactly.'
        },
        {
          type: 'diagram',
          title: 'Nested-loop counting picture',
          caption: 'Think of the inner loop as drawing squares. A triangular loop draws about half of an n by n square, but half of n² is still Θ(n²).',
          svg: l2NestedLoopGridSvg
        },
        {
          type: 'heading',
          text: 'Step-by-step algorithm',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Use SUM-ARRAY as a first counting example. The algorithm returns the sum of all elements in A[1..n].'
        },
        {
          type: 'code',
          title: 'SUM-ARRAY(A)',
          language: 'pseudocode',
          code: `SUM-ARRAY(A)
  total = 0
  for i = 1 to A.length
      total = total + A[i]
  return total`
        },
        {
          type: 'table',
          caption: 'Line-by-line RAM count',
          columns: ['Line', 'Cost', 'Executions', 'Contribution'],
          rows: [
            ['total = 0', 'c1', '1', 'c1'],
            ['for i = 1 to A.length', 'c2', 'n + 1 tests', 'c2(n + 1)'],
            ['total = total + A[i]', 'c3', 'n', 'c3 n'],
            ['return total', 'c4', '1', 'c4']
          ]
        },
        {
          type: 'formula',
          latex: 'T(n) = c_1 + c_2(n + 1) + c_3 n + c_4 = (c_2 + c_3)n + (c_1 + c_2 + c_4)',
          display: true,
          caption: 'The exact constants are not important for asymptotic growth.'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(n)',
          display: true,
          caption: 'The linear term dominates for large n.'
        },
        {
          type: 'heading',
          text: 'A harder example — line-by-line cost of insertion sort',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A linear-time algorithm is too easy a target. The real value of the RAM model appears when an algorithm has nested loops and the inner-loop length depends on the outer index. Insertion sort (covered in detail in the next lesson) is the canonical example.'
        },
        {
          type: 'code',
          title: 'INSERTION-SORT(A) — line numbers added for the cost table',
          language: 'pseudocode',
          code: `1  for j = 2 to A.length
2      key = A[j]
3      i = j - 1
4      while i > 0 and A[i] > key
5          A[i + 1] = A[i]
6          i = i - 1
7      A[i + 1] = key`
        },
        {
          type: 'paragraph',
          text: 'Let t_j be the number of times the while-condition on line 4 is tested during outer iteration j. The inner-loop body (lines 5 and 6) runs exactly t_j − 1 times. The full table follows the same pattern as SUM-ARRAY, but the inner-loop counts depend on the input.'
        },
        {
          type: 'table',
          caption: 'CLRS-style line-by-line cost of INSERTION-SORT',
          columns: ['Line', 'Cost', 'Times executed'],
          rows: [
            ['1: for j = 2 to A.length', 'c1', 'n'],
            ['2: key = A[j]', 'c2', 'n − 1'],
            ['3: i = j − 1', 'c3', 'n − 1'],
            ['4: while i > 0 and A[i] > key', 'c4', 'sum of t_j for j = 2..n'],
            ['5: A[i + 1] = A[i]', 'c5', 'sum of (t_j − 1)'],
            ['6: i = i − 1', 'c6', 'sum of (t_j − 1)'],
            ['7: A[i + 1] = key', 'c7', 'n − 1']
          ]
        },
        {
          type: 'formula',
          latex: 'T(n) = c_1 n + (c_2 + c_3 + c_7)(n - 1) + c_4 \\sum_{j=2}^{n} t_j + (c_5 + c_6) \\sum_{j=2}^{n} (t_j - 1)',
          display: true,
          caption: 'Exact RAM cost as a function of the inner-loop counts t_j. The shape of T(n) depends on the input.'
        },
        {
          type: 'table',
          caption: 'Best- and worst-case substitutions for t_j',
          columns: ['Case', 'Input', 't_j on iteration j', 'Sum sum(t_j)', 'T(n)'],
          rows: [
            ['Best', 'Already sorted', '1', 'n − 1', 'Θ(n)'],
            ['Worst', 'Reverse sorted', 'j', 'n(n+1)/2 − 1', 'Θ(n²)'],
            ['Average', 'Uniformly random', 'about j/2', 'about n²/4', 'Θ(n²)']
          ]
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why "asymptotically" the constants disappear',
          text: 'In the worst-case formula every c_i is multiplied by either a constant, an n, or a sum proportional to n². The largest term is the n² piece from the inner-loop sums. For n large enough, the n² term dominates, and the constants only shift T(n) by a bounded factor. That is exactly what Θ(n²) means.'
        },
        {
          type: 'heading',
          text: 'Visualising the cost stack',
          level: 3
        },
        {
          type: 'diagram',
          title: 'Stacked cost contributions for SUM-ARRAY at n = 5',
          caption: 'Each colored block is a per-line contribution. The total bar height is T(n). Linear-time algorithms grow as a single proportional band.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 240" role="img" aria-label="Stacked cost diagram">
  <text x="350" y="22" text-anchor="middle" font-size="16" font-weight="700" fill="#0f2038">T(n) for SUM-ARRAY as n grows</text>
  <g font-size="11" fill="#52627a">
    <text x="36" y="218">n = 1</text>
    <text x="142" y="218">n = 2</text>
    <text x="248" y="218">n = 4</text>
    <text x="354" y="218">n = 8</text>
    <text x="460" y="218">n = 16</text>
    <text x="566" y="218">n = 32</text>
  </g>
  <g>
    <rect x="20" y="190" width="60" height="14" fill="#fde68a" stroke="#92400e"/>
    <rect x="20" y="180" width="60" height="10" fill="#7dd3fc" stroke="#075985"/>
    <rect x="20" y="170" width="60" height="10" fill="#bbf7d0" stroke="#15803d"/>
  </g>
  <g>
    <rect x="126" y="190" width="60" height="14" fill="#fde68a" stroke="#92400e"/>
    <rect x="126" y="170" width="60" height="20" fill="#7dd3fc" stroke="#075985"/>
    <rect x="126" y="150" width="60" height="20" fill="#bbf7d0" stroke="#15803d"/>
  </g>
  <g>
    <rect x="232" y="190" width="60" height="14" fill="#fde68a" stroke="#92400e"/>
    <rect x="232" y="150" width="60" height="40" fill="#7dd3fc" stroke="#075985"/>
    <rect x="232" y="110" width="60" height="40" fill="#bbf7d0" stroke="#15803d"/>
  </g>
  <g>
    <rect x="338" y="190" width="60" height="14" fill="#fde68a" stroke="#92400e"/>
    <rect x="338" y="110" width="60" height="80" fill="#7dd3fc" stroke="#075985"/>
    <rect x="338" y="78"  width="60" height="32" fill="#bbf7d0" stroke="#15803d"/>
  </g>
  <g>
    <rect x="444" y="190" width="60" height="14" fill="#fde68a" stroke="#92400e"/>
    <rect x="444" y="78"  width="60" height="112" fill="#7dd3fc" stroke="#075985"/>
    <rect x="444" y="60"  width="60" height="18" fill="#bbf7d0" stroke="#15803d"/>
  </g>
  <g>
    <rect x="550" y="190" width="60" height="14" fill="#fde68a" stroke="#92400e"/>
    <rect x="550" y="60"  width="60" height="130" fill="#7dd3fc" stroke="#075985"/>
    <rect x="550" y="50"  width="60" height="10" fill="#bbf7d0" stroke="#15803d"/>
  </g>
  <g font-size="11" font-weight="700">
    <rect x="640" y="74"  width="14" height="14" fill="#bbf7d0" stroke="#15803d"/>
    <text x="658" y="86"  fill="#0f2038">return c4</text>
    <rect x="640" y="94"  width="14" height="14" fill="#7dd3fc" stroke="#075985"/>
    <text x="658" y="106" fill="#0f2038">loop body</text>
    <rect x="640" y="114" width="14" height="14" fill="#fde68a" stroke="#92400e"/>
    <text x="658" y="126" fill="#0f2038">init c1</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'For A = [4, 1, 7, 2, 6], the input size is n = 5. If we temporarily pretend every line cost is 1, the loop test happens 6 times and the body happens 5 times.'
        },
        {
          type: 'table',
          caption: 'Trace of SUM-ARRAY on [4, 1, 7, 2, 6]',
          columns: ['Iteration', 'A[i]', 'total before', 'total after'],
          rows: [
            ['1', '4', '0', '4'],
            ['2', '1', '4', '5'],
            ['3', '7', '5', '12'],
            ['4', '2', '12', '14'],
            ['5', '6', '14', '20']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness of the count',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Claim',
          text: 'SUM-ARRAY performs Θ(n) RAM operations under the unit-cost RAM model.'
        },
        {
          type: 'list',
          items: [
            'Upper bound: each loop iteration performs at most a constant number of RAM operations, and there are n iterations, plus constant setup and return work. Therefore T(n) <= a n + b for constants a, b.',
            'Lower bound: the algorithm reads every array element once. Reading n elements already costs at least d n operations for some positive constant d.',
            'Together, T(n) is O(n) and Ω(n), so T(n) is Θ(n).'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space complexity',
          level: 2
        },
        {
          type: 'table',
          caption: 'What the RAM model gives you',
          columns: ['Question', 'Answer for SUM-ARRAY', 'Reason'],
          rows: [
            ['Input size', 'n', 'The array contains n elements.'],
            ['Basic operation', 'read/add/store in the loop', 'Each is constant cost under the RAM model.'],
            ['Best case', 'Θ(n)', 'Every element must be included in the sum.'],
            ['Worst case', 'Θ(n)', 'The loop length is always n.'],
            ['Extra space', 'O(1)', 'The algorithm stores total and i only.']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common mistakes',
          text: 'Do not count each pseudocode line once. Count how many times it executes. Also remember that loop tests often happen n + 1 times, even though the loop body runs n times.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'A first lower bound: reading the input is Ω(n)',
          text: 'Any algorithm that examines every element of an input of size n performs at least n primitive operations. Therefore no algorithm that must look at all n inputs can run in time o(n). This is why "Θ(n)" is the gold standard for problems where you must touch every element (sum, max, copy).'
        },
        {
          type: 'heading',
          text: 'A feel for the numbers',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'Concrete RAM-operation counts make the difference between runtime classes feel real. A modern CPU does roughly 10⁹ primitive operations per second, so dividing the cell value by 10⁹ gives an estimate in seconds.'
        },
        {
          type: 'table',
          caption: 'Approximate operation counts at common input sizes',
          columns: ['n', 'log₂ n', 'n', 'n log₂ n', 'n²', '2ⁿ'],
          rows: [
            ['10', '3', '10', '33', '100', '1 024'],
            ['100', '7', '100', '664', '10 000', '~10³⁰'],
            ['1 000', '10', '1 000', '~10⁴', '10⁶', '> 10³⁰⁰'],
            ['1 000 000', '20', '10⁶', '~2·10⁷', '10¹²', 'overflows'],
            ['10⁹', '30', '10⁹', '~3·10¹⁰', '10¹⁸', 'absurd']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Reading the table',
          text: 'At n = 10⁶, an n² algorithm needs around 10¹² ops — roughly 17 minutes at 10⁹ ops/sec. An n log n algorithm finishes in under 0.1 seconds. The constants in the RAM cost formula change the multiplier, but they cannot close that gap.'
        },
        {
          type: 'heading',
          text: 'When the RAM model is not enough',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'If the numbers themselves grow very large, a single arithmetic operation may no longer be constant-time. Then a bit-cost model can be more honest. For this course, the RAM model is the default unless a lesson explicitly changes the cost model.'
        },
        {
          type: 'table',
          caption: 'Unit-cost RAM versus bit-cost RAM',
          columns: ['Aspect', 'Unit-cost RAM (default)', 'Bit-cost RAM'],
          rows: [
            ['Word size', 'Words hold any value used by the algorithm.', 'A word holds one bit; an n-bit number takes n cells.'],
            ['Add two integers a + b', 'Θ(1)', 'Θ(max(|a|, |b|)) bits.'],
            ['Multiply two n-bit integers', 'Θ(1)', 'Θ(n²) with schoolbook; Θ(n log n) with FFT.'],
            ['Comparison a < b', 'Θ(1)', 'Θ(max(|a|, |b|)).'],
            ['When to use it', 'Algorithm analysis where input values fit a machine word.', 'Cryptography, big-integer arithmetic, primality testing.']
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'How to spot when the bit-cost model matters',
          text: 'If your algorithm processes integers whose bit-length is part of the input size (RSA keys, factoring), use bit-cost. If your inputs are array elements that fit in 32 or 64 bits, the unit-cost RAM model is safe.'
        },
        {
          type: 'heading',
          text: 'Practice',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Count the RAM cost of a loop that computes the maximum of A[1..n].',
            'For a double loop with i = 1..n and j = 1..n, how many times does the body execute?',
            'Explain why T(n) = 7n + 20 is Θ(n).',
            'Give one example where a bit-cost model would matter more than the unit-cost RAM model.',
            'Write the line-by-line RAM cost table for LINEAR-SEARCH(A, v) and give T(n) in the worst case.',
            'A loop runs from i = 1 to n, and inside it another loop runs from j = i to n. Show that the body executes n(n+1)/2 times.'
          ]
        },
        { type: 'interactive', artifact: 'ram-cost-counter' },
        {
          type: 'heading',
          text: 'Summary',
          level: 2
        },
        {
          type: 'list',
          items: [
            'The RAM model assigns unit cost to each primitive operation: arithmetic, comparison, assignment, array access, branching.',
            'Total runtime is T(n) = sum over lines of (cost of line × number of times the line runs).',
            'For nested loops, the inner-loop count usually depends on the outer index — sum it as an arithmetic series 1 + 2 + ... + n = n(n+1)/2 = Θ(n²).',
            'Constants in T(n) are unavoidable but eventually dominated by the highest-order term — that is what asymptotic notation captures.',
            'Any algorithm that must read its full input has Ω(n) cost: there is no way around it under the RAM model.',
            'When integers grow with the input size (cryptography, big-number arithmetic), prefer the bit-cost model.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'You are ready for the next lesson',
          text: 'Lesson 3 puts the RAM-counting machinery to work on insertion sort: a real algorithm whose best- and worst-case runtimes differ by a full factor of n.'
        }
      ],
      content: teachingArc({
        bigIdea: 'count primitive operations on an idealised sequential machine where each op is unit cost.',
        problem: '"how fast is this algorithm?" needs a clock that depends only on the algorithm, not the cache, JIT, or OS scheduler.',
        intuition: 'pretend every basic op (+, *, comparison, load, store, branch) costs 1; then count ops as a function of input size n.',
        formal: 'the RAM has a read-only input tape, write-only output tape, working memory of unbounded integer cells, and primitive operations of unit cost.',
        algorithm: 'to count RAM cost: replace each line of pseudocode with a constant cost c_i, multiply by the number of times that line executes, and sum.',
        worked: 'For "sum = 0; for i in 1..n: sum += A[i]; return sum", the loop runs n times, doing constant work each iteration: T(n) = c1 + n*c2 + c3 = Θ(n).',
        correctness: 'cost-model neutrality — the analysis is unaffected by which constant we assign to each op as long as constants are bounded.',
        complexity: 'this is what we mean when we say "an O(n) algorithm" — n primitive RAM operations.',
        trace: 'predict the operation count for a nested loop "for i: for j: do op" given n=4.',
        takeaways: 'the RAM model is the default; mention bit-cost models when integer size grows with n (e.g., big-integer arithmetic).',
        practice: 'count the primitive operations of insertion sort line by line on an input of length n.'
      }),
      practice: [
        mcq('algods-u1-l2-q1', 'In the RAM model, what is the cost of a single comparison between two machine-word integers?',
          ['Θ(log n)', 'Θ(1)', 'Θ(n)', 'It depends on the bit length.'],
          1, 'Each primitive RAM operation costs unit time, regardless of the value of the operands (within machine-word size).'),
        mcq('algods-u1-l2-q2', 'Which of these is the RAM model NOT suited for as-is?',
          ['Counting comparisons in a sort.', 'Modeling the cost of CPU caches.', 'Worst-case time of insertion sort.', 'Analysing array index arithmetic.'],
          1, 'The RAM has no notion of cache hierarchies; it treats every memory access as constant time.')
      ]
    },
    {
      title: 'Insertion sort',
      durationMinutes: 45,
      type: 'interactive',
      summary: 'Build the sorted prefix one element at a time. Pseudocode, trace, correctness, and runtime.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Insertion sort is the first sorting algorithm worth understanding completely. It is not the fastest general-purpose sort, but it is perfect for learning how algorithms are specified, traced, proved correct, and analyzed. The central idea is simple: keep a sorted prefix on the left, then insert the next element into the correct position inside that prefix.'
        },
        {
          type: 'diagram',
          title: 'Sorted prefix idea',
          caption: 'At outer iteration j, the prefix A[1..j-1] is already sorted. The key A[j] is moved left until it fits.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1040 697" role="img" aria-label="Insertion sort grows a sorted prefix">
  <defs>
    <filter id="u1-l3-soft-shadow" x="-20%" y="-20%" width="140%" height="150%">
      <feDropShadow dx="0" dy="10" stdDeviation="16" flood-color="#102142" flood-opacity="0.08"/>
    </filter>
    <linearGradient id="u1-l3-green" x1="0" x2="1">
      <stop offset="0" stop-color="#34d399"/>
      <stop offset="1" stop-color="#20b26b"/>
    </linearGradient>
    <linearGradient id="u1-l3-orange" x1="0" x2="1">
      <stop offset="0" stop-color="#ffb33b"/>
      <stop offset="1" stop-color="#f58212"/>
    </linearGradient>
    <linearGradient id="u1-l3-blue" x1="0" x2="1">
      <stop offset="0" stop-color="#3b82f6"/>
      <stop offset="1" stop-color="#1f5fc9"/>
    </linearGradient>
    <linearGradient id="u1-l3-purple" x1="0" x2="1">
      <stop offset="0" stop-color="#8b5cf6"/>
      <stop offset="1" stop-color="#6d38d8"/>
    </linearGradient>
    <marker id="u1-l3-arrow-green" markerWidth="13" markerHeight="13" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,12 L12,6 z" fill="#34b979"/>
    </marker>
    <marker id="u1-l3-arrow-blue" markerWidth="13" markerHeight="13" refX="10" refY="6" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,12 L12,6 z" fill="#2f66d0"/>
    </marker>
    <marker id="u1-l3-arrow-orange" markerWidth="12" markerHeight="12" refX="9" refY="5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,10 L10,5 z" fill="#ff8b0e"/>
    </marker>
  </defs>

  <rect x="4" y="6" width="1032" height="687" rx="22" fill="#ffffff" stroke="#dbe3ef" stroke-width="1.5"/>

  <g fill="#8d7af7" opacity="0.9">
    <circle cx="35" cy="38" r="3"/><circle cx="51" cy="38" r="3"/><circle cx="67" cy="38" r="3"/>
    <circle cx="35" cy="54" r="3"/><circle cx="51" cy="54" r="3"/><circle cx="67" cy="54" r="3"/>
    <circle cx="35" cy="70" r="3"/><circle cx="51" cy="70" r="3"/><circle cx="67" cy="70" r="3"/>
    <circle cx="998" cy="51" r="5"/>
  </g>
  <path d="M998 66 C1001 91 982 93 960 103 C946 109 946 124 950 140" fill="none" stroke="#b8a9fb" stroke-width="2" stroke-dasharray="8 10"/>

  <text x="520" y="65" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="40" font-weight="900" fill="#071533">Insertion sort grows a sorted prefix</text>
  <text x="520" y="104" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="21" font-weight="600" fill="#606a80">At step j, A[1...j-1] is already sorted. The key slides left until it fits.</text>

  <rect x="72" y="131" width="890" height="183" rx="18" fill="#ffffff" stroke="#d9e1ed" stroke-width="1.5" filter="url(#u1-l3-soft-shadow)"/>

  <g font-family="Inter, Arial, sans-serif" font-size="20" font-weight="900" text-anchor="middle">
    <text x="290" y="169" fill="#07a24f">Sorted prefix</text>
    <text x="542" y="169" fill="#f58a00">Key</text>
    <text x="765" y="169" fill="#155fd2">Unseen suffix</text>
  </g>

  <path d="M168 201 Q168 192 176 192 H412 Q420 192 420 201" fill="none" stroke="#1fb568" stroke-width="2.3"/>
  <path d="M290 184 V193" fill="none" stroke="#1fb568" stroke-width="2.3"/>
  <path d="M672 201 Q672 192 680 192 H850 Q858 192 858 201" fill="none" stroke="#2563d8" stroke-width="2.3"/>
  <path d="M765 184 V193" fill="none" stroke="#2563d8" stroke-width="2.3"/>

  <g font-family="Inter, Arial, sans-serif" font-size="30" font-weight="900" fill="#071533" text-anchor="middle">
    <rect x="167" y="210" width="68" height="60" rx="9" fill="#f1fff8" stroke="#45d18e" stroke-width="1.6"/>
    <text x="201" y="250">2</text>
    <rect x="257" y="210" width="68" height="60" rx="9" fill="#f1fff8" stroke="#45d18e" stroke-width="1.6"/>
    <text x="291" y="250">4</text>
    <rect x="346" y="210" width="68" height="60" rx="9" fill="#f1fff8" stroke="#45d18e" stroke-width="1.6"/>
    <text x="380" y="250">5</text>
    <rect x="508" y="210" width="68" height="60" rx="9" fill="#fff4da" stroke="#ff8b0e" stroke-width="1.6"/>
    <text x="542" y="250">3</text>
    <rect x="686" y="210" width="68" height="60" rx="9" fill="#f3f8ff" stroke="#7bb2ff" stroke-width="1.6"/>
    <text x="720" y="250">6</text>
    <rect x="775" y="210" width="68" height="60" rx="9" fill="#f3f8ff" stroke="#7bb2ff" stroke-width="1.6"/>
    <text x="809" y="250">1</text>
  </g>

  <path d="M526 283 C474 304 386 306 319 289" fill="none" stroke="#ff8b0e" stroke-width="2.2" stroke-dasharray="8 7" marker-end="url(#u1-l3-arrow-orange)"/>

  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <rect x="68" y="365" width="252" height="153" rx="10" fill="#f0fff7" stroke="#27b76d" stroke-width="1.5"/>
    <circle cx="187" cy="369" r="33" fill="url(#u1-l3-green)"/>
    <path d="M176 356 L176 378 Q187 389 198 378 L198 356 Q187 352 176 356 Z" fill="none" stroke="#ffffff" stroke-width="4" stroke-linejoin="round"/>
    <path d="M182 368 L188 374 L199 362" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="194" y="433" font-size="23" font-weight="900" fill="#12a45c">Invariant</text>
    <text x="194" y="464" font-size="18" font-weight="600" fill="#071533">A[1..j-1] is</text>
    <text x="194" y="491" font-size="18" font-weight="600" fill="#071533">sorted.</text>

    <rect x="372" y="365" width="277" height="153" rx="10" fill="#fffaf0" stroke="#ff8b0e" stroke-width="1.5"/>
    <circle cx="510" cy="369" r="33" fill="url(#u1-l3-orange)"/>
    <path d="M492 358 H525 M517 349 L527 358 L517 367 M528 381 H496 M504 372 L494 381 L504 390" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="510" y="433" font-size="23" font-weight="900" fill="#f58a00">Action</text>
    <text x="510" y="464" font-size="18" font-weight="600" fill="#071533">Shift larger values</text>
    <text x="510" y="491" font-size="18" font-weight="600" fill="#071533">one position to the right.</text>

    <rect x="701" y="365" width="256" height="153" rx="10" fill="#f7fbff" stroke="#2f66d0" stroke-width="1.5"/>
    <circle cx="829" cy="369" r="33" fill="url(#u1-l3-blue)"/>
    <path d="M813 369 H846 M836 356 L850 369 L836 382" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="829" y="433" font-size="23" font-weight="900" fill="#155fd2">Then</text>
    <text x="829" y="464" font-size="18" font-weight="600" fill="#071533">Insert key in the</text>
    <text x="829" y="491" font-size="18" font-weight="600" fill="#071533">vacant position.</text>
  </g>

  <path d="M320 436 H360" fill="none" stroke="#34b979" stroke-width="5" marker-end="url(#u1-l3-arrow-green)"/>
  <path d="M649 436 H692" fill="none" stroke="#2f66d0" stroke-width="5" marker-end="url(#u1-l3-arrow-blue)"/>

  <g font-family="Inter, Arial, sans-serif">
    <rect x="58" y="542" width="916" height="85" rx="12" fill="#fbf8ff" stroke="#b58cff" stroke-width="1.4"/>
    <circle cx="108" cy="584" r="28" fill="url(#u1-l3-purple)"/>
    <path d="M99 579 C99 570 107 565 116 569 C124 573 126 583 119 590 C116 593 114 596 114 602 H104 C104 596 102 593 99 589 C96 586 95 583 99 579 Z" fill="none" stroke="#ffffff" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M104 608 H115 M104 614 H114" stroke="#ffffff" stroke-width="2.7" stroke-linecap="round"/>
    <text x="149" y="592" font-size="18" font-weight="900" fill="#4b1dba">What's happening?</text>
    <line x1="337" y1="557" x2="337" y2="612" stroke="#ddd2ff" stroke-width="2"/>
    <text x="360" y="574" font-size="16.5" fill="#1e293b">The sorted prefix grows by one element in every outer iteration j.</text>
    <text x="360" y="604" font-size="16.5" fill="#1e293b">Time complexity: <tspan font-weight="900" fill="#5b28cc">O(n^2)</tspan> in the worst case, <tspan font-weight="900" fill="#5b28cc">O(n)</tspan> in the best case.</text>
    <rect x="895" y="558" width="57" height="55" rx="8" fill="#eee7ff"/>
    <path d="M909 599 V588 M922 599 V579 M935 599 V569" stroke="#5b28cc" stroke-width="5" stroke-linecap="round"/>
    <path d="M907 581 L919 570 L927 575 L942 558" fill="none" stroke="#5b28cc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M937 558 H944 V565" fill="none" stroke="#5b28cc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>

  <g font-family="Inter, Arial, sans-serif">
    <rect x="182" y="642" width="690" height="44" rx="11" fill="#eaf4ff" stroke="#cfe2fb" stroke-width="1.4"/>
    <circle cx="218" cy="664" r="17" fill="url(#u1-l3-blue)"/>
    <path d="M218 654 L221 661 L229 661 L223 666 L225 674 L218 670 L211 674 L213 666 L207 661 L215 661 Z" fill="none" stroke="#ffffff" stroke-width="2" stroke-linejoin="round"/>
    <text x="252" y="670" font-size="16" fill="#1e293b">We maintain order by repeatedly "inserting" the key into its correct position.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Why this algorithm matters',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Insertion sort is the first non-trivial algorithm in CLRS for a reason. Its loop structure is small enough to fit on one page, but the analysis already touches every tool you will use for the rest of the course: pseudocode conventions, line-by-line RAM costs, loop invariants, best/worst/average cases, and asymptotic notation. Mastering insertion sort end-to-end is the cleanest entry point into algorithm analysis as a discipline.'
        },
        {
          type: 'list',
          items: [
            'It is correct on every input — provable, not just empirical.',
            'It is in-place: it uses Θ(1) extra memory beyond the input array.',
            'It is stable: equal keys keep their original relative order, which matters when sorting records by multiple fields.',
            'It is online: it can sort an array as elements arrive one at a time, without seeing the full input first.',
            'It is fast on small or nearly-sorted inputs, which is why production sorts (Java, .NET, V8) switch to insertion sort once a recursive subarray drops below ~16 elements.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Where you have already seen it',
          text: 'Most hybrid sorts — Timsort (Python, Java), introsort (C++ STL), pdqsort (Rust) — call insertion sort on the small subarrays inside their recursion. The reason is the small constant factor: at n ≤ 16, Θ(n²) operations on insertion sort beat Θ(n log n) operations on merge or quicksort.'
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Sorting problem: given A[1..n], rearrange the elements so that A[1] <= A[2] <= ... <= A[n].',
            'Permutation requirement: the output must contain exactly the original elements, only possibly in a different order.',
            'Sorted prefix: at iteration j, A[1..j-1] is already sorted.',
            'Key: the element A[j] currently being inserted into the sorted prefix.',
            'In-place algorithm: uses only O(1) extra memory beyond the array.',
            'Stable algorithm: equal keys keep their original relative order.'
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Learning focus',
          text: 'Insertion sort is often used to test whether you can write a loop invariant proof and distinguish best-case, worst-case, and average-case runtime.'
        },
        {
          type: 'heading',
          text: 'Intuition first',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Imagine sorting cards in your hand. Your left hand is sorted. You pick up the next card, slide larger cards one position to the right, and drop the new card into the empty slot. Insertion sort does exactly this inside an array.'
        },
        {
          type: 'diagram',
          title: 'Frame-by-frame: sorting [5, 2, 4, 6, 1, 3]',
          caption: 'Green = sorted prefix (already in place). Yellow = the key currently being inserted. Red = positions that shifted right during this iteration. Read top to bottom.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 460" role="img" aria-label="Insertion sort frame-by-frame visualization">
  <style>
    .cell { stroke: #1e293b; stroke-width: 1.5; }
    .lab  { font-size: 12px; fill: #475569; font-weight: 700; }
    .num  { font-size: 18px; font-weight: 700; text-anchor: middle; }
    .title { font-size: 13px; fill: #0f2038; font-weight: 700; }
    .arrow { stroke: #ef4444; stroke-width: 2; fill: none; }
    .sorted   { fill: #d1fae5; }
    .key      { fill: #fef3c7; }
    .shifted  { fill: #fee2e2; }
    .neutral  { fill: #f1f5f9; }
  </style>
  <text x="360" y="22" text-anchor="middle" font-size="15" font-weight="800" fill="#0f2038">INSERTION-SORT progress on [5, 2, 4, 6, 1, 3]</text>

  <!-- Frame: Start -->
  <text x="20" y="55" class="lab">Start</text>
  <g transform="translate(110, 38)">
    <rect class="cell neutral" x="0"   y="0" width="48" height="34"/><text class="num" x="24"  y="22">5</text>
    <rect class="cell neutral" x="50"  y="0" width="48" height="34"/><text class="num" x="74"  y="22">2</text>
    <rect class="cell neutral" x="100" y="0" width="48" height="34"/><text class="num" x="124" y="22">4</text>
    <rect class="cell neutral" x="150" y="0" width="48" height="34"/><text class="num" x="174" y="22">6</text>
    <rect class="cell neutral" x="200" y="0" width="48" height="34"/><text class="num" x="224" y="22">1</text>
    <rect class="cell neutral" x="250" y="0" width="48" height="34"/><text class="num" x="274" y="22">3</text>
  </g>

  <!-- Frame: j=2 -->
  <text x="20" y="105" class="lab">j = 2, key = 2</text>
  <g transform="translate(110, 88)">
    <rect class="cell shifted" x="0"   y="0" width="48" height="34"/><text class="num" x="24"  y="22">5</text>
    <rect class="cell key"     x="50"  y="0" width="48" height="34"/><text class="num" x="74"  y="22">2</text>
    <rect class="cell neutral" x="100" y="0" width="48" height="34"/><text class="num" x="124" y="22">4</text>
    <rect class="cell neutral" x="150" y="0" width="48" height="34"/><text class="num" x="174" y="22">6</text>
    <rect class="cell neutral" x="200" y="0" width="48" height="34"/><text class="num" x="224" y="22">1</text>
    <rect class="cell neutral" x="250" y="0" width="48" height="34"/><text class="num" x="274" y="22">3</text>
    <path class="arrow" d="M 74 -4 Q 50 -16 28 -4" marker-end="url(#l3-ar)"/>
  </g>

  <!-- After insert j=2 -->
  <text x="20" y="155" class="lab">after j = 2</text>
  <g transform="translate(110, 138)">
    <rect class="cell sorted" x="0"   y="0" width="48" height="34"/><text class="num" x="24"  y="22">2</text>
    <rect class="cell sorted" x="50"  y="0" width="48" height="34"/><text class="num" x="74"  y="22">5</text>
    <rect class="cell neutral" x="100" y="0" width="48" height="34"/><text class="num" x="124" y="22">4</text>
    <rect class="cell neutral" x="150" y="0" width="48" height="34"/><text class="num" x="174" y="22">6</text>
    <rect class="cell neutral" x="200" y="0" width="48" height="34"/><text class="num" x="224" y="22">1</text>
    <rect class="cell neutral" x="250" y="0" width="48" height="34"/><text class="num" x="274" y="22">3</text>
  </g>

  <!-- After j=3, key=4 -->
  <text x="20" y="205" class="lab">after j = 3 (key = 4)</text>
  <g transform="translate(110, 188)">
    <rect class="cell sorted"  x="0"   y="0" width="48" height="34"/><text class="num" x="24"  y="22">2</text>
    <rect class="cell sorted"  x="50"  y="0" width="48" height="34"/><text class="num" x="74"  y="22">4</text>
    <rect class="cell sorted"  x="100" y="0" width="48" height="34"/><text class="num" x="124" y="22">5</text>
    <rect class="cell neutral" x="150" y="0" width="48" height="34"/><text class="num" x="174" y="22">6</text>
    <rect class="cell neutral" x="200" y="0" width="48" height="34"/><text class="num" x="224" y="22">1</text>
    <rect class="cell neutral" x="250" y="0" width="48" height="34"/><text class="num" x="274" y="22">3</text>
  </g>

  <!-- After j=4, key=6 (no shifts) -->
  <text x="20" y="255" class="lab">after j = 4 (key = 6, no shift)</text>
  <g transform="translate(110, 238)">
    <rect class="cell sorted"  x="0"   y="0" width="48" height="34"/><text class="num" x="24"  y="22">2</text>
    <rect class="cell sorted"  x="50"  y="0" width="48" height="34"/><text class="num" x="74"  y="22">4</text>
    <rect class="cell sorted"  x="100" y="0" width="48" height="34"/><text class="num" x="124" y="22">5</text>
    <rect class="cell sorted"  x="150" y="0" width="48" height="34"/><text class="num" x="174" y="22">6</text>
    <rect class="cell neutral" x="200" y="0" width="48" height="34"/><text class="num" x="224" y="22">1</text>
    <rect class="cell neutral" x="250" y="0" width="48" height="34"/><text class="num" x="274" y="22">3</text>
  </g>

  <!-- After j=5, key=1 (4 shifts) -->
  <text x="20" y="305" class="lab">after j = 5 (key = 1, 4 shifts)</text>
  <g transform="translate(110, 288)">
    <rect class="cell sorted"  x="0"   y="0" width="48" height="34"/><text class="num" x="24"  y="22">1</text>
    <rect class="cell sorted"  x="50"  y="0" width="48" height="34"/><text class="num" x="74"  y="22">2</text>
    <rect class="cell sorted"  x="100" y="0" width="48" height="34"/><text class="num" x="124" y="22">4</text>
    <rect class="cell sorted"  x="150" y="0" width="48" height="34"/><text class="num" x="174" y="22">5</text>
    <rect class="cell sorted"  x="200" y="0" width="48" height="34"/><text class="num" x="224" y="22">6</text>
    <rect class="cell neutral" x="250" y="0" width="48" height="34"/><text class="num" x="274" y="22">3</text>
  </g>

  <!-- After j=6, key=3 (3 shifts) -->
  <text x="20" y="355" class="lab">after j = 6 (key = 3, 3 shifts)</text>
  <g transform="translate(110, 338)">
    <rect class="cell sorted" x="0"   y="0" width="48" height="34"/><text class="num" x="24"  y="22">1</text>
    <rect class="cell sorted" x="50"  y="0" width="48" height="34"/><text class="num" x="74"  y="22">2</text>
    <rect class="cell sorted" x="100" y="0" width="48" height="34"/><text class="num" x="124" y="22">3</text>
    <rect class="cell sorted" x="150" y="0" width="48" height="34"/><text class="num" x="174" y="22">4</text>
    <rect class="cell sorted" x="200" y="0" width="48" height="34"/><text class="num" x="224" y="22">5</text>
    <rect class="cell sorted" x="250" y="0" width="48" height="34"/><text class="num" x="274" y="22">6</text>
  </g>

  <!-- Legend -->
  <g transform="translate(80, 400)">
    <rect class="cell sorted"  x="0"   y="0" width="22" height="22"/><text x="32"  y="16" font-size="12" fill="#0f2038">sorted prefix</text>
    <rect class="cell key"     x="160" y="0" width="22" height="22"/><text x="192" y="16" font-size="12" fill="#0f2038">current key</text>
    <rect class="cell shifted" x="320" y="0" width="22" height="22"/><text x="352" y="16" font-size="12" fill="#0f2038">shifted this iteration</text>
    <rect class="cell neutral" x="510" y="0" width="22" height="22"/><text x="542" y="16" font-size="12" fill="#0f2038">unsorted suffix</text>
  </g>
</svg>`
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Watch the green grow',
          text: 'Each iteration extends the green prefix by exactly one cell. After n − 1 iterations the entire array is green and the algorithm halts. The interactive visualizer at the bottom of the lesson lets you step through this on your own input.'
        },
        {
          type: 'heading',
          text: 'Formal version',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'For every position j from 2 to n, insertion sort assumes the prefix A[1..j-1] is sorted. It stores A[j] as key, shifts every larger prefix element one position to the right, and writes key into the open position.'
        },
        {
          type: 'heading',
          text: 'Step-by-step algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'INSERTION-SORT(A)',
          language: 'pseudocode',
          code: `INSERTION-SORT(A)
  for j = 2 to A.length
      key = A[j]
      i = j - 1
      while i > 0 and A[i] > key
          A[i + 1] = A[i]
          i = i - 1
      A[i + 1] = key`
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why the comparison is strict',
          text: 'The test is A[i] > key, not A[i] >= key. That means equal elements are not shifted past each other, which is why insertion sort is stable.'
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Trace INSERTION-SORT on A = [5, 2, 4, 6, 1, 3]. Each row shows the array after the key has been inserted.'
        },
        {
          type: 'table',
          caption: 'Insertion sort trace',
          columns: ['Outer step', 'Key', 'What shifts?', 'Array after insertion'],
          rows: [
            ['Start', '-', '-', '[5, 2, 4, 6, 1, 3]'],
            ['j = 2', '2', '5 shifts right', '[2, 5, 4, 6, 1, 3]'],
            ['j = 3', '4', '5 shifts right', '[2, 4, 5, 6, 1, 3]'],
            ['j = 4', '6', 'nothing shifts', '[2, 4, 5, 6, 1, 3]'],
            ['j = 5', '1', '6, 5, 4, 2 shift right', '[1, 2, 4, 5, 6, 3]'],
            ['j = 6', '3', '6, 5, 4 shift right', '[1, 2, 3, 4, 5, 6]']
          ]
        },
        {
          type: 'table',
          caption: 'Zoom in on j = 5, key = 1',
          columns: ['Action', 'i', 'Array state'],
          rows: [
            ['Store key = 1', '4', '[2, 4, 5, 6, _, 3]'],
            ['6 > 1, shift 6', '3', '[2, 4, 5, 6, 6, 3]'],
            ['5 > 1, shift 5', '2', '[2, 4, 5, 5, 6, 3]'],
            ['4 > 1, shift 4', '1', '[2, 4, 4, 5, 6, 3]'],
            ['2 > 1, shift 2', '0', '[2, 2, 4, 5, 6, 3]'],
            ['Insert key at A[1]', '-', '[1, 2, 4, 5, 6, 3]']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Outer-loop invariant',
          text: 'At the start of each outer-loop iteration with index j, the subarray A[1..j-1] contains the original elements from positions 1 through j-1, but in sorted order.'
        },
        {
          type: 'list',
          items: [
            'Initialization: before the first iteration, j = 2, and A[1..1] has one element. A one-element array is sorted and is a permutation of itself.',
            'Maintenance: assume A[1..j-1] is sorted. The while-loop shifts exactly the elements greater than key one position right. Elements <= key remain to its left, elements > key move to its right, and key is inserted into the gap. Therefore A[1..j] is sorted and contains the original first j elements.',
            'Termination: the loop ends after j = n. The invariant then gives that A[1..n] is sorted and contains exactly the original elements. That is the sorting specification.'
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Proof trap',
          text: 'The invariant must include both sortedness and the permutation property. Sortedness alone would not rule out losing or duplicating elements.'
        },
        {
          type: 'heading',
          text: 'Runtime and space complexity',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Let t_j be the number of times the while-condition is tested during outer iteration j. The value of t_j depends on how far key moves left.'
        },
        {
          type: 'formula',
          latex: 'T(n) = a n + b \\sum_{j=2}^{n} t_j + c',
          display: true,
          caption: 'The constants hide the fixed RAM costs of assignments, comparisons, and loop control.'
        },
        {
          type: 'table',
          caption: 'Best, worst, and average cases',
          columns: ['Case', 'Input pattern', 'Behavior of t_j', 'Runtime'],
          rows: [
            ['Best case', 'Already sorted', 't_j = 1', 'Θ(n)'],
            ['Worst case', 'Reverse sorted', 't_j = j', 'Θ(n²)'],
            ['Average case', 'Random order', 'about j/2 shifts on average', 'Θ(n²)']
          ]
        },
        {
          type: 'formula',
          latex: '\\sum_{j=2}^{n} (j - 1) = \\frac{n(n-1)}{2} = \\Theta(n^{2})',
          display: true,
          caption: 'Reverse-sorted input forces the maximum possible number of shifts.'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(n + I)',
          display: true,
          caption: 'A sharper view: I is the number of inversions. Nearly sorted inputs have few inversions.'
        },
        {
          type: 'heading',
          text: 'Inversions — the right way to measure "nearly sorted"',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'An inversion is a pair of indices (i, j) with i < j but A[i] > A[j] — that is, two elements out of order relative to each other. The number of inversions, I, captures exactly how unsorted the array is.'
        },
        {
          type: 'formula',
          latex: 'I = \\#\\{(i, j) : 1 \\le i < j \\le n,\\ A[i] > A[j]\\}',
          display: true,
          caption: 'Formal definition of inversion count.'
        },
        {
          type: 'table',
          caption: 'Inversion count for some inputs',
          columns: ['Input', 'Inversions', 'Why'],
          rows: [
            ['[1, 2, 3, 4]', '0', 'Already sorted — no out-of-order pair.'],
            ['[2, 1, 3, 4]', '1', 'Only the pair (2, 1) is out of order.'],
            ['[3, 1, 2]', '2', 'Pairs (3, 1) and (3, 2) are inverted.'],
            ['[4, 3, 2, 1]', '6', 'Reverse-sorted: every pair is inverted = n(n−1)/2.']
          ]
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why insertion sort runs in Θ(n + I) time',
          text: 'Each shift inside the inner while-loop fixes exactly one inversion: it moves a larger value past a smaller value. Therefore the total number of shifts equals I. The outer loop adds Θ(n) bookkeeping. Hence T(n) = Θ(n + I). Best case I = 0 gives Θ(n); worst case I = n(n−1)/2 gives Θ(n²).'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Practical consequence',
          text: 'If you have an array that is already mostly sorted (only k elements out of place), insertion sort runs in Θ(n + k·n) ≈ Θ(n) when k is small. This is why hybrid sorts switch to insertion sort once a subarray becomes "nearly sorted" or short.'
        },
        {
          type: 'heading',
          text: 'Comparison with other Θ(n²) sorts',
          level: 3
        },
        {
          type: 'table',
          caption: 'Insertion sort, bubble sort, selection sort',
          columns: ['Property', 'Insertion sort', 'Bubble sort', 'Selection sort'],
          rows: [
            ['Best-case time', 'Θ(n)', 'Θ(n)', 'Θ(n²)'],
            ['Worst-case time', 'Θ(n²)', 'Θ(n²)', 'Θ(n²)'],
            ['Average-case time', 'Θ(n²)', 'Θ(n²)', 'Θ(n²)'],
            ['In-place', 'Yes', 'Yes', 'Yes'],
            ['Stable', 'Yes', 'Yes', 'No (in standard form)'],
            ['Adaptive (faster on near-sorted)', 'Yes', 'Yes (with early-exit flag)', 'No'],
            ['Number of writes (worst case)', 'Θ(n²)', 'Θ(n²)', 'Θ(n)'],
            ['Used in production?', 'Yes (small subarrays)', 'No (only didactic)', 'Rarely (when writes are expensive)']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'When selection sort wins',
          text: 'Selection sort always performs Θ(n) writes, regardless of input. On hardware where writes are far more expensive than reads (flash memory, slow remote storage), selection sort can outperform insertion sort.'
        },
        {
          type: 'table',
          caption: 'Properties to memorize',
          columns: ['Property', 'Insertion sort'],
          rows: [
            ['Best-case time', 'Θ(n)'],
            ['Worst-case time', 'Θ(n²)'],
            ['Average-case time', 'Θ(n²)'],
            ['Extra space', 'O(1)'],
            ['Stable?', 'Yes'],
            ['In-place?', 'Yes']
          ]
        },
        {
          type: 'heading',
          text: 'When insertion sort is useful',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Small arrays, where constant factors matter more than asymptotic growth.',
            'Nearly sorted arrays, where the number of inversions is small.',
            'As the base case inside faster divide-and-conquer sorting algorithms.',
            'As a teaching example for loop invariants and RAM-model counting.'
          ]
        },
        {
          type: 'heading',
          text: 'Practice',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Trace INSERTION-SORT on [3, 1, 4, 1, 5]. Write the array after each outer iteration.',
            'Modify the pseudocode to sort in non-increasing order.',
            'State the loop invariant for the non-increasing version.',
            'Count the exact number of comparisons on [6, 5, 4, 3, 2, 1].',
            'Explain why replacing A[i] > key with A[i] >= key breaks stability.',
            'Count the inversions in [3, 1, 4, 1, 5, 9, 2, 6] and verify the inner-loop shift count matches.',
            'Show that insertion sort is "online": describe what happens if a new element is appended to an already-sorted A and you call the inner-loop one more time on it.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Online algorithm — a useful side property',
          text: 'A streaming application can call the inner shift-and-insert routine on each new element as it arrives, with no need to wait for the full input. The cost per insertion is O(n) in the worst case, so n insertions total Θ(n²) — the same as standard insertion sort, but distributed in real time.'
        },
        { type: 'interactive', artifact: 'insertion-sort-viz' },
        {
          type: 'heading',
          text: 'Summary',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Insertion sort grows a sorted prefix one element at a time by shifting larger values right and dropping the new key into the gap.',
            'Loop invariant: at the start of outer iteration j, A[1..j−1] is a sorted permutation of the original first j−1 elements.',
            'Best-case Θ(n) on already sorted input; worst-case Θ(n²) on reverse-sorted input; average Θ(n²) on uniform random input.',
            'Tighter bound: T(n) = Θ(n + I), where I is the number of inversions.',
            'In-place (Θ(1) extra space), stable (strict comparison), online (works as elements stream in).',
            'Used in production hybrid sorts as the base case for short subarrays — the small constants beat Θ(n log n) under that threshold.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'You are ready for the next lesson',
          text: 'Lesson 4 abstracts the loop-invariant proof you just saw into a reusable three-step technique that you will apply to every loop in this course.'
        }
      ],
      content: teachingArc({
        bigIdea: 'extend a sorted prefix one element at a time by sliding the next element into place.',
        problem: 'given an array A[1..n], output a sorted permutation of it.',
        intuition: 'sorting a poker hand: pick up each card with the right hand and slide it left through the already-sorted left hand.',
        formal: 'for j = 2..n: shift every element of A[1..j-1] greater than key=A[j] one position right, then place key in the gap.',
        algorithm: 'see pseudocode in the lesson notes; the inner while-loop is the shifting step.',
        worked: 'on [5, 2, 4, 6, 1, 3] we get [2, 5, 4, 6, 1, 3] -> [2, 4, 5, 6, 1, 3] -> [2, 4, 5, 6, 1, 3] -> [1, 2, 4, 5, 6, 3] -> [1, 2, 3, 4, 5, 6].',
        correctness: 'loop invariant: A[1..j-1] holds the original first j-1 elements, sorted. Initialisation, maintenance, and termination are all simple.',
        complexity: 'best Θ(n) (sorted input), worst Θ(n²) (reverse sorted), average Θ(n²). In-place, stable.',
        trace: 'trace insertion sort on [3, 1, 4, 1, 5, 9, 2, 6] and predict the array after each outer iteration.',
        takeaways: 'know the invariant verbatim; know best/worst/average; know it is stable.',
        practice: 'modify insertion sort to sort in non-increasing order and re-prove correctness.'
      }),
      practice: [
        mcq('algods-u1-l3-q1', 'What input gives insertion sort its worst case?',
          ['Already sorted.', 'Reverse sorted.', 'All equal.', 'Random.'],
          1, 'Reverse-sorted input forces the inner loop to shift every previous element on every outer iteration: Θ(n²).'),
        mcq('algods-u1-l3-q2', 'Is insertion sort stable?',
          ['Yes, because the inner test is strict (A[i] > key).', 'No, swapping equal keys reorders them.', 'Only when the input has unique keys.', 'Only on sorted inputs.'],
          0, 'The strict comparison ensures equal keys do not pass each other, so insertion sort is stable.'),
        mcq('algods-u1-l3-q3', 'Best-case time of insertion sort on already-sorted input?',
          ['Θ(n²)', 'Θ(n log n)', 'Θ(n)', 'Θ(1)'],
          2, 'On sorted input the inner while-test fails immediately; we still scan once over n elements.')
      ]
    },
    {
      title: 'Correctness with loop invariants',
      durationMinutes: 30,
      type: 'video',
      summary: 'A reusable three-step proof technique: initialisation, maintenance, termination.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A loop invariant is the standard proof tool for showing that an iterative algorithm is correct. It is a statement that stays true every time the loop repeats. If it is true before the loop, preserved by one iteration, and strong enough when the loop stops, then the algorithm is correct.'
        },
        {
          type: 'diagram',
          title: 'The three-part invariant proof',
          caption: 'Loop-invariant proofs are induction proofs written in algorithm language.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 330" role="img" aria-label="Loop invariant proof cycle">
  <defs>
    <marker id="inv-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f8a61"/>
    </marker>
  </defs>
  <rect x="72" y="74" width="180" height="86" rx="18" fill="#eef8f3" stroke="#0f8a61" stroke-width="2"/>
  <text x="162" y="106" text-anchor="middle" font-size="18" font-weight="800" fill="#0f2038">1. Initialization</text>
  <text x="162" y="132" text-anchor="middle" font-size="14" fill="#52627a">true before the</text>
  <text x="162" y="150" text-anchor="middle" font-size="14" fill="#52627a">first iteration</text>
  <line x1="257" y1="117" x2="342" y2="117" stroke="#0f8a61" stroke-width="3" marker-end="url(#inv-arrow)"/>
  <rect x="348" y="74" width="180" height="86" rx="18" fill="#fff8e8" stroke="#d8a03a" stroke-width="2"/>
  <text x="438" y="106" text-anchor="middle" font-size="18" font-weight="800" fill="#0f2038">2. Maintenance</text>
  <text x="438" y="132" text-anchor="middle" font-size="14" fill="#52627a">one iteration keeps</text>
  <text x="438" y="150" text-anchor="middle" font-size="14" fill="#52627a">the statement true</text>
  <line x1="533" y1="117" x2="618" y2="117" stroke="#0f8a61" stroke-width="3" marker-end="url(#inv-arrow)"/>
  <rect x="624" y="74" width="180" height="86" rx="18" fill="#eef5ff" stroke="#214a84" stroke-width="2"/>
  <text x="714" y="106" text-anchor="middle" font-size="18" font-weight="800" fill="#0f2038">3. Termination</text>
  <text x="714" y="132" text-anchor="middle" font-size="14" fill="#52627a">invariant + exit</text>
  <text x="714" y="150" text-anchor="middle" font-size="14" fill="#52627a">condition imply goal</text>
  <path d="M438 166 C438 230 285 250 178 174" fill="none" stroke="#8ba0b8" stroke-width="2" stroke-dasharray="7 7" marker-end="url(#inv-arrow)"/>
  <text x="332" y="246" text-anchor="middle" font-size="15" fill="#60708a">repeat the same argument for every iteration</text>
  <rect x="188" y="260" width="444" height="44" rx="14" fill="#fbfcfe" stroke="#d8e1ec" stroke-width="2"/>
  <text x="410" y="288" text-anchor="middle" font-size="16" font-weight="700" fill="#0f2038">Same structure as mathematical induction</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'Loop invariants are induction in disguise',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A loop-invariant proof is mathematical induction on the loop counter. Initialization is the base case; maintenance is the inductive step. Termination is the extra ingredient that turns a fact about the loop counter into the postcondition of the algorithm.'
        },
        {
          type: 'table',
          caption: 'Side by side: induction vs loop invariants',
          columns: ['Step', 'Mathematical induction', 'Loop-invariant proof'],
          rows: [
            ['Statement', 'P(n) is true for all n ≥ 1.', 'Invariant I holds at the top of every iteration.'],
            ['Base case', 'P(1) is true.', 'Initialization: I holds before iteration 1.'],
            ['Inductive step', 'Assume P(k); prove P(k+1).', 'Maintenance: assume I before iteration k; show I before iteration k+1.'],
            ['Conclusion', 'P(n) for all n ≥ 1.', 'I holds when the loop exits — combined with the exit condition this gives the postcondition (Termination).']
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Why three steps and not two?',
          text: 'Mathematical induction proves a statement that holds for every natural number. A loop, on the other hand, runs only finitely many times. Termination is what closes the gap: it tells us the value of the loop counter when the proof must "land" on the postcondition.'
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'list',
          items: [
            'A loop invariant is a property that is true before and after every loop iteration.',
            'Initialization proves the invariant before the first iteration.',
            'Maintenance proves that if the invariant is true before one iteration, it is true before the next one.',
            'Termination proves that when the loop exits, the invariant implies the algorithm specification.',
            'The invariant is usually a statement about the part of the input already processed.',
            'A good invariant is strong enough to prove the final goal, but simple enough to maintain.'
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Proof template',
          text: 'State the invariant clearly, then write three labeled paragraphs: Initialization, Maintenance, Termination. This structure is expected and easy to grade.'
        },
        {
          type: 'heading',
          text: 'Intuition first',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A loop processes an input gradually. The invariant says what is already known after the processed part. In a maximum-finding loop, it says the best value so far is the maximum of the scanned prefix. In a search loop, it says the value has not appeared in the scanned prefix.'
        },
        {
          type: 'table',
          caption: 'Invariant intuition by algorithm',
          columns: ['Algorithm', 'Processed part', 'Typical invariant'],
          rows: [
            ['Find maximum', 'A[1..i-1]', 'best is the maximum of A[1..i-1]'],
            ['Linear search', 'A[1..i-1]', 'v does not appear in A[1..i-1]'],
            ['Insertion sort', 'A[1..j-1]', 'A[1..j-1] is sorted and contains the original prefix elements'],
            ['Sum array', 'A[1..i-1]', 'total equals the sum of A[1..i-1]']
          ]
        },
        {
          type: 'heading',
          text: 'Formal version',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Let I(k) be the invariant before iteration k. A loop-invariant proof has the same shape as induction.'
        },
        {
          type: 'formula',
          latex: 'I(1) quad text{and} quad forall k, I(k) Rightarrow I(k+1)',
          display: true,
          caption: 'Initialization is the base case. Maintenance is the inductive step.'
        },
        {
          type: 'formula',
          latex: 'I(m) land text{loop exits} Rightarrow text{postcondition}',
          display: true,
          caption: 'Termination connects the invariant to the algorithm specification.'
        },
        {
          type: 'heading',
          text: 'Step-by-step proof recipe',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Write the precondition: what is true about the input before the algorithm starts?',
            'Write the postcondition: what must be true when the algorithm returns?',
            'Identify the processed part of the input at the top of the loop.',
            'State an invariant about that processed part.',
            'Prove initialization, maintenance, and termination in that order.',
            'Check that the invariant is not too weak at termination.'
          ]
        },
        {
          type: 'heading',
          text: 'Worked example: linear search',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'LINEAR-SEARCH returns the first index i such that A[i] = v, or NIL if v does not occur.'
        },
        {
          type: 'code',
          title: 'LINEAR-SEARCH(A, v)',
          language: 'pseudocode',
          code: `LINEAR-SEARCH(A, v)
  for i = 1 to A.length
      if A[i] == v
          return i
  return NIL`
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Invariant',
          text: 'At the start of each iteration with index i, the value v does not appear in A[1..i-1].'
        },
        {
          type: 'list',
          items: [
            'Initialization: before i = 1, the prefix A[1..0] is empty, so v does not appear there.',
            'Maintenance: assume v does not appear in A[1..i-1]. If A[i] = v, the algorithm returns correctly. If A[i] != v, then v does not appear in A[1..i], so the invariant holds for the next iteration.',
            'Termination: if the loop finishes, every element A[1..n] was checked and none equaled v. Returning NIL is correct.'
          ]
        },
        {
          type: 'table',
          caption: 'Trace of LINEAR-SEARCH([4, 8, 1, 6], 6)',
          columns: ['Iteration', 'Checked value', 'Invariant before iteration', 'Action'],
          rows: [
            ['i = 1', '4', '6 is not in empty prefix', 'continue'],
            ['i = 2', '8', '6 is not in [4]', 'continue'],
            ['i = 3', '1', '6 is not in [4, 8]', 'continue'],
            ['i = 4', '6', '6 is not in [4, 8, 1]', 'return 4']
          ]
        },
        {
          type: 'heading',
          text: 'Worked example: maximum search',
          level: 2
        },
        {
          type: 'code',
          title: 'MAXIMUM(A)',
          language: 'pseudocode',
          code: `MAXIMUM(A)
  best = A[1]
  for i = 2 to A.length
      if A[i] > best
          best = A[i]
  return best`
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Invariant',
          text: 'At the start of each iteration with index i, best is the maximum value in A[1..i-1].'
        },
        {
          type: 'list',
          items: [
            'Initialization: before i = 2, best = A[1], so best is the maximum of A[1..1].',
            'Maintenance: if A[i] > best, update best to A[i]; otherwise keep best. In both cases best is the maximum of A[1..i].',
            'Termination: after the final iteration, best is the maximum of A[1..n], so returning best is correct.'
          ]
        },
        {
          type: 'heading',
          text: 'Worked example: binary search',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Binary search on a sorted array shows a different invariant style: the property is about the search interval, not a processed prefix. The invariant captures "the target, if present, lies in the current interval".'
        },
        {
          type: 'code',
          title: 'BINARY-SEARCH(A, v) — A sorted in non-decreasing order',
          language: 'pseudocode',
          code: `BINARY-SEARCH(A, v)
  lo = 1
  hi = A.length
  while lo <= hi
      mid = floor((lo + hi) / 2)
      if A[mid] == v
          return mid
      else if A[mid] < v
          lo = mid + 1
      else
          hi = mid - 1
  return NIL`
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Invariant',
          text: 'At the start of each iteration of the while-loop, if v appears anywhere in A, then v appears in A[lo..hi].'
        },
        {
          type: 'list',
          items: [
            'Initialization: before the first iteration, lo = 1 and hi = n, so A[lo..hi] is the entire array. If v occurs anywhere in A, it occurs in A[lo..hi].',
            'Maintenance: assume the invariant holds. The algorithm computes mid. If A[mid] = v, it returns mid (correct). If A[mid] < v, then since A is sorted, every element of A[lo..mid] is at most A[mid] < v, so v cannot occur in A[lo..mid]; if v occurs in A[lo..hi], it must occur in A[mid+1..hi]. Setting lo ← mid + 1 keeps the invariant. The case A[mid] > v is symmetric.',
            'Termination: the loop exits when lo > hi, so the interval A[lo..hi] is empty. The invariant then says: if v appears anywhere in A, it appears in an empty subarray — contradiction. Hence v does not occur in A, and returning NIL is correct.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why the loop terminates at all',
          text: 'After each iteration, hi − lo strictly decreases (because either lo grows or hi shrinks). The quantity hi − lo + 1 is a "decreasing measure" — it must eventually drop below 0, at which point lo > hi and the loop exits. We will use the same idea in the termination argument for any while-loop whose body has no obvious loop counter.'
        },
        {
          type: 'table',
          caption: 'Trace of BINARY-SEARCH on [1, 3, 5, 7, 9, 11, 13] for v = 11',
          columns: ['Step', 'lo', 'hi', 'mid', 'A[mid]', 'Action'],
          rows: [
            ['1', '1', '7', '4', '7',  '7 < 11 → lo = 5'],
            ['2', '5', '7', '6', '11', 'A[mid] = v → return 6']
          ]
        },
        {
          type: 'heading',
          text: 'Termination measures — the missing ingredient for while-loops',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'For-loops have an obvious counter, so termination is "the counter reached the upper bound". While-loops are different: the loop body must reduce some quantity, and that quantity must be bounded below. This decreasing measure is sometimes called the loop variant (a different word from invariant — be careful).'
        },
        {
          type: 'table',
          caption: 'Termination measures for common loop shapes',
          columns: ['Loop', 'Decreasing measure', 'Lower bound'],
          rows: [
            ['for i = 1 to n', 'n − i', '0 (loop ends at i = n + 1)'],
            ['Binary search while lo ≤ hi', 'hi − lo + 1', '0 (loop ends when interval empty)'],
            ['Insertion sort inner while', 'i (the inner index)', '0 (loop ends at i = 0 or A[i] ≤ key)'],
            ['Euclidean gcd while b ≠ 0', 'b (each step replaces b by a mod b < b)', '0']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Without a decreasing measure, the loop may never end',
          text: 'A loop with valid Initialization and Maintenance steps is still wrong if it never exits — the postcondition would never apply. Always check that some quantity strictly decreases (or strictly increases toward a bound) in every iteration.'
        },
        {
          type: 'heading',
          text: 'Choosing a good invariant',
          level: 2
        },
        {
          type: 'table',
          caption: 'Good vs weak invariants',
          columns: ['Candidate invariant', 'Good?', 'Why'],
          rows: [
            ['The loop has not crashed.', 'No', 'True but useless; it does not imply the postcondition.'],
            ['In insertion sort, A[1..j-1] is sorted.', 'Almost', 'Needs the permutation property too, otherwise elements could be lost.'],
            ['In maximum search, best is some element of A.', 'No', 'Too weak; it does not show best is maximum.'],
            ['In maximum search, best is max(A[1..i-1]).', 'Yes', 'It matches the processed prefix and implies the final result.']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common mistakes',
          text: 'Do not state the postcondition as the invariant unless it is already true during the loop. For example, "A is sorted" is not an invariant for insertion sort at the beginning; only the processed prefix is sorted.'
        },
        {
          type: 'heading',
          text: 'Counter-example: a too-weak invariant gives a fake proof',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'It is instructive to see what goes wrong when the invariant is missing a clause. Consider a "buggy insertion sort" whose maintenance step accidentally drops the key instead of inserting it. With the weak invariant "A[1..j−1] is sorted" the proof appears to go through. With the right invariant ("A[1..j−1] is sorted and is a permutation of the original first j−1 elements") the maintenance step fails — exposing the bug.'
        },
        {
          type: 'table',
          caption: 'Two attempts at insertion-sort invariants',
          columns: ['Invariant', 'Maintenance attempt', 'Verdict'],
          rows: [
            ['"A[1..j−1] is sorted" (weak)',  'Sortedness is preserved by shifting elements right.', 'Misleading: an array of zeros is also sorted. The buggy code passes.'],
            ['"A[1..j−1] is sorted AND a permutation of the original A[1..j−1]"',  'Permutation is preserved only if exactly one shift per displaced element and a final write of key.', 'Maintenance fails for the buggy version — the bug is caught.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Lesson',
          text: 'A correct proof of a wrong algorithm means your invariant is too weak. Strengthen it until the maintenance step actually pins down what the loop body does to the data.'
        },
        {
          type: 'heading',
          text: 'Common invariant patterns',
          level: 3
        },
        {
          type: 'table',
          caption: 'A reference catalogue',
          columns: ['Loop shape', 'Typical invariant', 'Example'],
          rows: [
            ['Scan a prefix; accumulate', 'partial result equals f(processed prefix)', 'sum, max, count, hash'],
            ['Search a prefix; early return', 'target not found in processed prefix', 'linear search'],
            ['Maintain a sorted prefix', 'processed prefix is sorted permutation of original prefix', 'insertion sort'],
            ['Two-pointer scan', 'all "interesting" pairs lie between left and right pointers', 'sorted-array pair sum'],
            ['Binary search on a range', 'target, if present, is in the current interval', 'binary search, lower_bound'],
            ['Divide-and-conquer recursion', 'a recursive call produces a correct answer for its subinput', 'merge sort, quicksort']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Hoare logic for the curious',
          text: 'In formal program verification, an invariant {I} sits between a loop\'s pre- and post-conditions: {pre} loop {post}, with {I} forced before and after each iteration. The three-step proof you are using is the practical core of Hoare logic.'
        },
        {
          type: 'heading',
          text: 'Runtime and space complexity',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Correctness proofs and runtime analysis answer different questions. A loop invariant proves the algorithm returns the right answer. It does not by itself tell you how many operations the loop performs.'
        },
        {
          type: 'table',
          caption: 'Correctness vs complexity',
          columns: ['Question', 'Tool', 'Typical evidence'],
          rows: [
            ['Does the algorithm return the right output?', 'Loop invariant', 'Initialization, maintenance, termination'],
            ['Does the algorithm halt?', 'Loop bound or decreasing measure', 'i increases to n, or problem size shrinks'],
            ['How fast is it?', 'RAM-model counting', 'Line execution counts and asymptotic notation'],
            ['How much memory does it use?', 'Space analysis', 'Extra variables and auxiliary data structures']
          ]
        },
        {
          type: 'heading',
          text: 'Practice',
          level: 2
        },
        {
          type: 'list',
          items: [
            'State and prove a loop invariant for SUM-ARRAY.',
            'State and prove a loop invariant for finding the minimum element.',
            'For binary search, what should the invariant say about the search interval?',
            'Find the missing part: "At the start of iteration i, total equals ____."',
            'Explain why "the algorithm is correct so far" is not a useful invariant.',
            'Give a decreasing measure for the inner while-loop of insertion sort and prove it works.',
            'For Euclidean gcd (a, b) → gcd(b, a mod b), state both an invariant and a termination measure.'
          ]
        },
        { type: 'interactive', artifact: 'loop-invariant-builder' },
        {
          type: 'heading',
          text: 'Summary',
          level: 2
        },
        {
          type: 'list',
          items: [
            'A loop invariant is a property that holds at the top of every loop iteration. The proof has three parts: Initialization (base case), Maintenance (inductive step), Termination (post-condition).',
            'The technique is mathematical induction in algorithm clothing — a loop invariant is the inductive hypothesis on the loop counter.',
            'For while-loops, also exhibit a decreasing measure that is bounded below; otherwise the loop may never terminate.',
            'A good invariant is strong enough to imply the postcondition at termination but simple enough to maintain through one iteration.',
            'A correct proof of a wrong algorithm means the invariant is too weak — strengthen it until maintenance actually constrains the loop body.',
            'Common patterns: prefix scan, prefix search, sorted prefix, two-pointer, binary-search interval, divide-and-conquer recursion.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'You are ready for the next lesson',
          text: 'Now that we can prove an algorithm is correct, the next lesson formalizes how we compare them by speed: the asymptotic notation O, Θ, Ω.'
        }
      ],
      content: teachingArc({
        bigIdea: 'prove a loop correct by stating an invariant and showing it survives every iteration.',
        problem: 'we need a small, repeatable argument that we can apply to any algorithm with a loop.',
        intuition: 'invariant = "the partial result so far has the structure we want". If it is true at the start, stays true through the body, and gives us the final answer at the end, we are done.',
        formal: 'Initialisation: invariant holds before iteration 1. Maintenance: if it holds at iteration i, it holds at iteration i+1. Termination: when the loop exits, the invariant implies the goal.',
        algorithm: 'pick a property that is (a) implied by the goal at termination, (b) easy to prove preserved by one iteration, (c) trivially true at the start.',
        worked: 'for INSERTION-SORT: invariant "A[1..j-1] is sorted and is a permutation of the original first j-1 elements." All three steps are immediate.',
        correctness: 'loop invariants are an instance of mathematical induction; the invariant is your inductive hypothesis.',
        complexity: 'choosing the invariant does not affect runtime, only correctness.',
        trace: 'try to write the invariant for LINEAR-SEARCH and prove correctness using it.',
        takeaways: 'the invariant is half art, half discipline. It must be true at start, after every iteration, and strong enough at end.',
        practice: 'state and prove the invariant for "find the maximum element of A".'
      }),
      practice: [
        mcq('algods-u1-l4-q1', 'Which step of the loop-invariant proof corresponds to the inductive hypothesis?',
          ['Initialisation', 'Maintenance', 'Termination', 'There is no inductive hypothesis in this proof technique.'],
          1, 'Maintenance is exactly the inductive step: assume the invariant at iteration i, prove it at iteration i+1.'),
        mcq('algods-u1-l4-q2', 'Why must the loop invariant be strong enough at termination?',
          ['So that the algorithm halts.', 'So that the invariant implies the algorithm met its specification.', 'So that the body has constant cost.', 'So that the loop is non-empty.'],
          1, 'Termination of the proof requires the invariant, plus the loop exit condition, to imply the goal.')
      ]
    },
    {
      title: 'Asymptotic notation: O, Θ, Ω',
      durationMinutes: 40,
      type: 'video',
      summary: 'How to compare runtimes across constants and lower-order terms.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Asymptotic notation is the language we use to compare algorithms by growth rate. It deliberately ignores constant factors and lower-order terms so that we can talk about scalability: what happens when n becomes large?'
        },
        {
          type: 'diagram',
          title: 'Common growth-rate hierarchy',
          caption: 'Growth increases from left to right. For large n, every step to the right eventually dominates every step to its left.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 260" role="img" aria-label="Growth rate hierarchy">
  <defs>
    <marker id="growth-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f8a61"/>
    </marker>
  </defs>
  <text x="440" y="34" text-anchor="middle" font-size="22" font-weight="800" fill="#0f2038">Growth rates</text>
  <line x1="70" y1="132" x2="810" y2="132" stroke="#0f8a61" stroke-width="4" marker-end="url(#growth-arrow)"/>
  <g font-size="16" font-weight="700" text-anchor="middle">
    <rect x="46" y="82" width="72" height="44" rx="12" fill="#eef8f3" stroke="#0f8a61"/>
    <text x="82" y="110" fill="#0f2038">1</text>
    <rect x="132" y="82" width="96" height="44" rx="12" fill="#eef8f3" stroke="#0f8a61"/>
    <text x="180" y="110" fill="#0f2038">log n</text>
    <rect x="242" y="82" width="72" height="44" rx="12" fill="#eef8f3" stroke="#0f8a61"/>
    <text x="278" y="110" fill="#0f2038">n</text>
    <rect x="328" y="82" width="104" height="44" rx="12" fill="#fff8e8" stroke="#d8a03a"/>
    <text x="380" y="110" fill="#0f2038">n log n</text>
    <rect x="446" y="82" width="80" height="44" rx="12" fill="#fff8e8" stroke="#d8a03a"/>
    <text x="486" y="110" fill="#0f2038">n²</text>
    <rect x="540" y="82" width="80" height="44" rx="12" fill="#fff8e8" stroke="#d8a03a"/>
    <text x="580" y="110" fill="#0f2038">n³</text>
    <rect x="634" y="82" width="80" height="44" rx="12" fill="#fff0f0" stroke="#cc3838"/>
    <text x="674" y="110" fill="#0f2038">2ⁿ</text>
    <rect x="728" y="82" width="80" height="44" rx="12" fill="#fff0f0" stroke="#cc3838"/>
    <text x="768" y="110" fill="#0f2038">n!</text>
  </g>
  <text x="210" y="178" text-anchor="middle" font-size="15" fill="#60708a">usually feasible</text>
  <text x="486" y="178" text-anchor="middle" font-size="15" fill="#60708a">watch input size</text>
  <text x="720" y="178" text-anchor="middle" font-size="15" fill="#60708a">explodes quickly</text>
  <path d="M130 196 C220 232 365 230 444 196" fill="none" stroke="#d8a03a" stroke-width="2" stroke-dasharray="6 6"/>
  <text x="287" y="238" text-anchor="middle" font-size="14" fill="#60708a">constant factors matter for small n, but growth wins eventually</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Assume f and g are eventually nonnegative functions. The notation describes how f(n) compares to g(n) for all sufficiently large n.'
        },
        {
          type: 'table',
          caption: 'The main asymptotic symbols',
          columns: ['Notation', 'Meaning', 'Intuition'],
          rows: [
            ['f(n) = O(g(n))', 'f is eventually at most a constant times g', 'Upper bound: f grows no faster than g'],
            ['f(n) = Ω(g(n))', 'f is eventually at least a positive constant times g', 'Lower bound: f grows at least as fast as g'],
            ['f(n) = Θ(g(n))', 'Both O(g) and Ω(g)', 'Tight bound: same growth class'],
            ['f(n) = o(g(n))', 'f/g tends to 0', 'Strictly smaller growth'],
            ['f(n) = ω(g(n))', 'f/g tends to infinity', 'Strictly larger growth']
          ]
        },
        {
          type: 'formula',
          latex: 'f(n) = O(g(n)) \\iff \\exists c>0, \\exists n_0, \\forall n\\ge n_0:\\ 0\\le f(n)\\le c g(n)',
          display: true,
          caption: 'Big-O is an eventual upper bound.'
        },
        {
          type: 'formula',
          latex: 'f(n) = \\Omega(g(n)) \\iff \\exists c>0,\\exists n_0,\\forall n\\ge n_0:\\ 0\\le c g(n)\\le f(n)',
          display: true,
          caption: 'Big-Ω is an eventual lower bound.'
        },
        {
          type: 'formula',
          latex: 'f(n) = \\Theta(g(n)) \\iff f(n)=O(g(n)) \\text{ and } f(n)=\\Omega(g(n))',
          display: true,
          caption: 'Big-Θ is the tight-growth statement to use whenever the upper and lower asymptotic bounds match.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Read the equals sign carefully',
          text: 'The expression f(n) = O(g(n)) is standard notation, but it really means f belongs to the set O(g). It is not symmetric like ordinary equality.'
        },
        {
          type: 'heading',
          text: 'Set-membership view: O, Θ, Ω as nested classes',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'Each notation defines a set of functions. Big-O collects everything that grows no faster than g; Big-Ω collects everything that grows at least as fast; Big-Θ is the intersection. This view is often clearer than the inequality definitions when you are reasoning about families of functions.'
        },
        {
          type: 'diagram',
          title: 'O(g), Ω(g), and Θ(g) as sets of functions',
          caption: 'Θ(g) is the set of functions whose growth matches g exactly up to constants. O(g) is everything that does not grow faster; Ω(g) is everything that does not grow slower.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 760 280" role="img" aria-label="O Ω Θ as sets">
  <text x="380" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="#0f2038">Asymptotic classes are sets of functions</text>
  <ellipse cx="240" cy="170" rx="200" ry="80" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="100" y="90"  font-size="14" font-weight="700" fill="#166534">O(g)</text>
  <text x="100" y="108" font-size="11" fill="#475569">grows ≤ c·g</text>
  <ellipse cx="520" cy="170" rx="200" ry="80" fill="#fef9c3" stroke="#ca8a04" stroke-width="2"/>
  <text x="660" y="90"  font-size="14" font-weight="700" fill="#854d0e">Ω(g)</text>
  <text x="608" y="108" font-size="11" fill="#475569">grows ≥ c·g</text>
  <text x="380" y="170" text-anchor="middle" font-size="16" font-weight="700" fill="#0f2038">Θ(g)</text>
  <text x="380" y="190" text-anchor="middle" font-size="11" fill="#475569">O(g) ∩ Ω(g)</text>
  <g font-size="11" fill="#0f2038">
    <text x="80"  y="240">3n + 5</text><text x="80"  y="256" fill="#475569">∈ O(n²) only</text>
    <text x="370" y="240" text-anchor="middle">2n²</text><text x="370" y="256" text-anchor="middle" fill="#475569">∈ Θ(n²)</text>
    <text x="660" y="240" text-anchor="end">n³ + n²</text><text x="660" y="256" text-anchor="end" fill="#475569">∈ Ω(n²) only</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Limit-based shortcut',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'When the limit lim_{n→∞} f(n)/g(n) exists, asymptotic class follows immediately. This is the fastest tool for "is f in O(g)?" questions in practice.'
        },
        {
          type: 'table',
          caption: 'Reading the limit',
          columns: ['lim_{n→∞} f(n)/g(n)', 'Conclusion', 'Symbol'],
          rows: [
            ['0',                       'f grows strictly slower than g',     'f = o(g) — and therefore f = O(g) but not Θ(g) or Ω(g).'],
            ['c, with 0 < c < ∞',      'f and g grow at the same rate',       'f = Θ(g) — and therefore both O(g) and Ω(g).'],
            ['∞',                       'f grows strictly faster than g',     'f = ω(g) — and therefore f = Ω(g) but not Θ(g) or O(g).'],
            ['Does not exist',          'No conclusion from this test alone', 'Use the inequality definition or split into cases.']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A textbook test',
          text: 'For ratios of polynomials, exponentials, or logarithms, the limit either exists or is plus/minus infinity. L\'Hopital\'s rule helps when both functions tend to infinity: replace the ratio with the ratio of derivatives.'
        },
        {
          type: 'heading',
          text: 'Properties of asymptotic notation',
          level: 3
        },
        {
          type: 'table',
          caption: 'Algebraic rules you can rely on',
          columns: ['Rule', 'Statement', 'Example'],
          rows: [
            ['Reflexivity', 'f = Θ(f), f = O(f), f = Ω(f)', 'n² = Θ(n²)'],
            ['Symmetry of Θ', 'f = Θ(g) iff g = Θ(f)', '3n² = Θ(n²) ↔ n² = Θ(3n²)'],
            ['Transpose symmetry', 'f = O(g) iff g = Ω(f)', 'n = O(n²) ↔ n² = Ω(n)'],
            ['Transitivity',  'f = O(g) and g = O(h) ⇒ f = O(h)', 'n = O(n log n) and n log n = O(n²) ⇒ n = O(n²)'],
            ['Sum rule',      'O(f) + O(g) = O(max(f, g))', 'O(n) + O(n²) = O(n²)'],
            ['Product rule',  'O(f) · O(g) = O(f · g)', 'O(log n) · O(n) = O(n log n)']
          ]
        },
        {
          type: 'heading',
          text: 'Intuition first',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'If f(n) = 3n² + 5n + 100, the n² term eventually dominates the 5n and 100 terms. Also, the factor 3 only stretches the graph vertically. Asymptotic notation keeps the part that matters for growth: n².'
        },
        {
          type: 'table',
          caption: 'What we ignore and what we keep',
          columns: ['Expression', 'Dominant growth', 'Tight class'],
          rows: [
            ['7n + 20', 'n', 'Θ(n)'],
            ['3n² + 5n + 100', 'n²', 'Θ(n²)'],
            ['n log n + 50n', 'n log n', 'Θ(n log n)'],
            ['2n³ + 100n² + 10', 'n³', 'Θ(n³)'],
            ['5 * 2ⁿ + n¹⁰', '2ⁿ', 'Θ(2ⁿ)']
          ]
        },
        {
          type: 'heading',
          text: 'Formal proof method',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'To prove a Θ bound, prove both an upper bound and a lower bound by choosing constants. The constants do not need to be tight; they only need to work from some n0 onward.'
        },
        {
          type: 'list',
          items: [
            'To prove f = O(g): find c and n0 such that f(n) <= c g(n) for all n >= n0.',
            'To prove f = Ω(g): find c and n0 such that f(n) >= c g(n) for all n >= n0.',
            'To prove f = Θ(g): prove both directions.',
            'To disprove f = O(g): show f(n)/g(n) is unbounded, or show no constant c can work.'
          ]
        },
        {
          type: 'heading',
          text: 'Worked example: polynomial bound',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Let f(n) = 3n² + 5n + 100. We prove f(n) = Θ(n²).'
        },
        {
          type: 'formula',
          latex: '\\text{For } n\\ge 1:\\quad 3n^{2} + 5n + 100 \\le 3n^{2} + 5n^{2} + 100n^{2} = 108n^{2}',
          display: true,
          caption: 'This proves f(n) = O(n²) with c = 108 and n0 = 1.'
        },
        {
          type: 'formula',
          latex: '\\text{For } n\\ge 1:\\quad 3n^{2} + 5n + 100 \\ge 3n^{2}',
          display: true,
          caption: 'This proves f(n) = Ω(n²) with c = 3 and n0 = 1.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Conclusion',
          text: 'Since f is both O(n²) and Ω(n²), f is Θ(n²).'
        },
        {
          type: 'heading',
          text: 'Worked example: exponential trap',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Decide whether 2²ⁿ = O(2ⁿ). Divide the two functions.'
        },
        {
          type: 'formula',
          latex: '\\frac{2^{2n}}{2^{n}} = 2^{n} \\to \\infty',
          display: true,
          caption: 'The ratio is unbounded, so no constant c can make 2²ⁿ <= c 2ⁿ for all large n.'
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Result',
          text: '2²ⁿ is not O(2ⁿ). Exponents are especially unforgiving: doubling the exponent is not a constant factor.'
        },
        {
          type: 'heading',
          text: 'Logarithm base does not matter (asymptotically)',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'A common worry is "should I write log₂ n or log₁₀ n or ln n?". Asymptotically, the choice is irrelevant: all logarithms of n differ by a constant factor.'
        },
        {
          type: 'formula',
          latex: 'log_a n = frac{log_b n}{log_b a}',
          display: true,
          caption: 'Change-of-base identity. The factor 1 / log_b(a) is a positive constant, so log_a n and log_b n are within constant factors of each other.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Practical convention',
          text: 'In algorithm analysis we usually write "log n" without a base — by default it means log₂ n. The Θ-statement is unaffected by the choice.'
        },
        {
          type: 'heading',
          text: 'Hierarchy of growth — proven, not just claimed',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'Three facts to memorize and to be able to justify when asked: logs grow slower than every polynomial; polynomials grow slower than every exponential; exponentials grow slower than n!.'
        },
        {
          type: 'formula',
          latex: '\\forall c > 0:\\quad \\log n = o(n^{c})',
          display: true,
          caption: 'Logarithms grow strictly slower than any positive power of n. Proof sketch: by L\'Hopital, lim (log n) / n? = lim 1/(c ? n?) = 0.'
        },
        {
          type: 'formula',
          latex: '\\forall c > 0, \\forall a > 1:\\quad n^{c} = o(a^{n})',
          display: true,
          caption: 'Every polynomial is dominated by every exponential with base > 1. Proof sketch: take the ratio nᶜ / aⁿ; ln of the ratio is c · ln n − n · ln a → −∞.'
        },
        {
          type: 'formula',
          latex: 'a^{n} = o(n!)',
          display: true,
          caption: 'Every fixed-base exponential is dominated by n!. The factorial eventually multiplies by larger and larger factors, while aⁿ keeps multiplying by the same a.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Stirling\'s approximation — a useful asymptote for n!',
          text: 'n! ~ sqrt(2*pi*n) · (n/e)ⁿ. Equivalently, log(n!) = Θ(n log n). This is why comparison-based sorting needs Ω(n log n) comparisons in the worst case — there are n! permutations, and a binary decision tree of depth d has only 2ᵈ leaves.'
        },
        {
          type: 'heading',
          text: 'Concrete graph picture: c₁·g, c₂·g, n₀',
          level: 3
        },
        {
          type: 'diagram',
          title: 'Sandwich definition of Θ(g)',
          caption: 'For n ≥ n_0, the function f sits between c₁·g(n) (lower) and c₂·g(n) (upper). Before n_0 anything goes — only the asymptotic behavior matters.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 320" role="img" aria-label="Θ sandwich diagram">
  <line x1="60"  y1="280" x2="690" y2="280" stroke="#475569" stroke-width="2"/>
  <line x1="60"  y1="280" x2="60"  y2="20"  stroke="#475569" stroke-width="2"/>
  <text x="700" y="285" font-size="12" fill="#475569">n</text>
  <text x="50"  y="20"  font-size="12" fill="#475569" text-anchor="end">value</text>
  <path d="M 60 280 Q 240 230 690 60"  fill="none" stroke="#16a34a" stroke-width="3"/>
  <path d="M 60 280 Q 240 240 690 100" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-dasharray="6 3"/>
  <path d="M 60 280 Q 240 250 690 140" fill="none" stroke="#0ea5e9" stroke-width="2.5" stroke-dasharray="6 3"/>
  <line x1="270" y1="20" x2="270" y2="280" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4 4"/>
  <text x="270" y="300" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">n₀</text>
  <text x="540" y="60"  font-size="13" font-weight="700" fill="#16a34a">f(n)</text>
  <text x="600" y="105" font-size="12" font-weight="700" fill="#0ea5e9">c₂ · g(n)</text>
  <text x="600" y="155" font-size="12" font-weight="700" fill="#0ea5e9">c₁ · g(n)</text>
  <rect x="270" y="100" width="420" height="120" fill="#0ea5e9" fill-opacity="0.06" stroke="#0ea5e9" stroke-width="1" stroke-dasharray="2 4"/>
  <text x="480" y="160" text-anchor="middle" font-size="13" fill="#475569" font-style="italic">f trapped here for all n ≥ n₀</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'Runtime meaning',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Asymptotic notation is not just algebra. It tells us how an algorithm scales. For small n, constants can dominate. For large n, a better growth class usually wins.'
        },
        {
          type: 'table',
          caption: 'Rough operation counts',
          columns: ['n', 'n', 'n log₂ n', 'n²', '2ⁿ'],
          rows: [
            ['10', '10', 'about 33', '100', '1,024'],
            ['100', '100', 'about 664', '10,000', 'huge'],
            ['1,000', '1,000', 'about 9,966', '1,000,000', 'astronomical'],
            ['1,000,000', '1,000,000', 'about 19,931,569', '10¹²', 'impossible']
          ]
        },
        {
          type: 'heading',
          text: 'Common mistakes',
          level: 2
        },
        {
          type: 'table',
          caption: 'Pitfalls to avoid',
          columns: ['Mistake', 'Why it is wrong', 'Better habit'],
          rows: [
            ['Saying O(n³) for insertion sort and stopping', 'Technically true but not tight', 'Use Θ(n²) for worst case'],
            ['Treating O like equality', 'O is a set-like upper-bound relation', 'Read f = O(g) as f is in O(g)'],
            ['Ignoring the words best, worst, average', 'The same algorithm can have different bounds by case', 'State which case you are analyzing'],
            ['Comparing only constants', 'Constants matter at small n but vanish asymptotically', 'Compare dominant terms for large n'],
            ['Claiming n² = O(n log n)', 'n/log n grows without bound', 'Use ratios to test suspicious claims']
          ]
        },
        {
          type: 'heading',
          text: 'Practice',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Prove 7n + 20 = Θ(n) by choosing constants.',
            'Prove n log n = O(n²). Is it also Ω(n²)?',
            'Decide whether 2ⁿ⁺¹ = O(2ⁿ).',
            'Order these from slowest to fastest growth: n, log n, n², n log n, 2ⁿ.',
            'Give a true but useless Big-O statement for merge sort, then give the tight one.',
            'Use the limit test to show n² + 100n = Θ(n²) and to show that n / log n is in ω(1) but in o(n).',
            'Find c₁, c₂, and n₀ that witness 5n log n + 3n² = Θ(n²).'
          ]
        },
        { type: 'interactive', artifact: 'growth-rate-explorer' },
        {
          type: 'heading',
          text: 'Constants matter at small n — a worked comparison',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'Asymptotic notation throws away constants on purpose. In practice, two algorithms with very different constants can swap places at small n. Suppose algorithm A runs in 100 · n operations and algorithm B runs in 2 · n². Asymptotically A wins (linear beats quadratic). For small n the picture is reversed.'
        },
        {
          type: 'table',
          caption: 'A (100n) vs B (2n²) — head-to-head',
          columns: ['n', 'A: 100n', 'B: 2n²', 'Winner'],
          rows: [
            ['1', '100', '2', 'B'],
            ['10', '1 000', '200', 'B'],
            ['50', '5 000', '5 000', 'tie'],
            ['100', '10 000', '20 000', 'A'],
            ['1 000', '100 000', '2 000 000', 'A'],
            ['1 000 000', '10⁸', '2·10¹²', 'A by far']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Why hybrid algorithms exist',
          text: 'A real implementation often runs the asymptotically slower algorithm on small inputs (insertion sort under ~16 elements) and switches to the asymptotically faster algorithm beyond that. The crossover point is exactly the n where the constant-factor advantage of the slower algorithm runs out.'
        },
        {
          type: 'heading',
          text: 'Summary',
          level: 2
        },
        {
          type: 'list',
          items: [
            'O(g), Ω(g), Θ(g) are sets of functions defined by inequalities for all sufficiently large n. The "=" sign in f = O(g) is set membership.',
            'Use the limit lim f(n)/g(n): 0 ⇒ f = o(g); finite positive ⇒ f = Θ(g); ∞ ⇒ f = ω(g).',
            'Logarithms in any base are equivalent up to constant factors, so "log n" is unambiguous in asymptotic statements.',
            'Standard hierarchy: log n = o(nᶜ) for any c > 0; nᶜ = o(aⁿ) for any a > 1; aⁿ = o(n!).',
            'Stirling: log(n!) = Θ(n log n) — the lower bound for comparison-based sorting.',
            'Constants and lower-order terms vanish asymptotically, but they decide the winner for small n. Hybrid algorithms exploit both regimes.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'You are ready for the next lesson',
          text: 'Next we apply this vocabulary to compare best-case, worst-case, and average-case behavior of an algorithm — the three runtime "measures" you must always state explicitly.'
        }
      ],
      content: teachingArc({
        bigIdea: 'compare functions by their growth rate for large n; ignore constant factors and small terms.',
        problem: 'we want a vocabulary that lets us say "this algorithm is faster" without committing to a specific machine.',
        intuition: 'O = no faster than (upper bound). Ω = at least as fast (lower bound). Θ = exactly as fast (tight, both sides).',
        formal: 'f = O(g) iff there exist c, n0 such that f(n) <= c*g(n) for all n >= n0; analogous for Ω; Θ = O and Ω together.',
        algorithm: 'to prove f = Θ(g), prove both directions by exhibiting constants c1, c2, n0.',
        worked: 'show 3n² + 5n + 100 = Θ(n²): upper bound at c=108, lower bound at c=3.',
        correctness: 'asymptotic notation is just a quantifier game; the constants need not be tight.',
        complexity: 'asymptotic class affects scalability; constant factors affect throughput.',
        trace: 'classify several common functions: log n, n log n, n², 2ⁿ, n!.',
        takeaways: 'use Θ when you can, O only as an upper estimate; remember the growth-rate hierarchy.',
        practice: 'decide whether 2ⁿ⁺¹ = O(2ⁿ), 2²ⁿ = O(2ⁿ), n² = O(n log² n), and justify each.'
      }),
      practice: [
        mcq('algods-u1-l5-q1', 'Which is the tightest description of f(n) = 3n² + 5n + 100?',
          ['Θ(n)', 'Θ(n²)', 'Θ(n³)', 'Θ(n log n)'],
          1, 'The leading term dominates; constants drop. f = Θ(n²).'),
        mcq('algods-u1-l5-q2', 'True or false: 2²ⁿ = O(2ⁿ).',
          ['True', 'False'],
          1, '2²ⁿ / 2ⁿ = 2ⁿ which goes to infinity, so no constant c bounds 2²ⁿ by c*2ⁿ. False.'),
        mcq('algods-u1-l5-q3', 'Which is correct ordering by growth?',
          ['n log n < n < n²', 'log n < n² < n log n', 'log n < n < n log n < n²', 'n² < n log n < n'],
          2, 'log n grows slower than n; n log n is between n and n².')
      ]
    },
    {
      title: 'Worst-case, best-case, average-case',
      durationMinutes: 25,
      type: 'video',
      summary: 'Why we usually report the worst case, and when expected-time matters.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The same algorithm can run for different amounts of time on different inputs of the same size. Insertion sort is fast on an already sorted array and slow on a reverse sorted array. Linear search is fast if the target is first and slow if the target is absent. Best-case, worst-case, average-case, and expected-time analysis are ways to say exactly which input behavior we are measuring.'
        },
        {
          type: 'diagram',
          title: 'Runtime over all inputs of size n',
          caption: 'For a fixed input size n, each valid input has its own running time. Best case is the minimum; worst case is the maximum; average or expected case needs a probability model.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 330" role="img" aria-label="Best worst average case runtime diagram">
  <line x1="82" y1="272" x2="780" y2="272" stroke="#8ba0b8" stroke-width="2"/>
  <line x1="82" y1="272" x2="82" y2="42" stroke="#8ba0b8" stroke-width="2"/>
  <text x="420" y="312" text-anchor="middle" font-size="15" fill="#52627a">inputs of the same size n</text>
  <text x="32" y="154" text-anchor="middle" font-size="15" fill="#52627a" transform="rotate(-90 32 154)">running time</text>
  <polyline points="108,236 170,216 232,228 294,186 356,198 418,156 480,166 542,112 604,132 666,78 728,96" fill="none" stroke="#0f8a61" stroke-width="4"/>
  <g>
    <circle cx="108" cy="236" r="7" fill="#0f8a61"/>
    <circle cx="666" cy="78" r="7" fill="#cc3838"/>
    <circle cx="410" cy="170" r="7" fill="#d8a03a"/>
  </g>
  <line x1="104" y1="236" x2="744" y2="236" stroke="#0f8a61" stroke-dasharray="6 6" stroke-width="2"/>
  <line x1="104" y1="78" x2="744" y2="78" stroke="#cc3838" stroke-dasharray="6 6" stroke-width="2"/>
  <line x1="104" y1="170" x2="744" y2="170" stroke="#d8a03a" stroke-dasharray="6 6" stroke-width="2"/>
  <rect x="555" y="214" width="190" height="40" rx="12" fill="#eef8f3" stroke="#0f8a61"/>
  <text x="650" y="240" text-anchor="middle" font-size="15" font-weight="700" fill="#0f2038">best case: minimum</text>
  <rect x="555" y="56" width="190" height="40" rx="12" fill="#fff0f0" stroke="#cc3838"/>
  <text x="650" y="82" text-anchor="middle" font-size="15" font-weight="700" fill="#0f2038">worst case: maximum</text>
  <rect x="555" y="148" width="190" height="40" rx="12" fill="#fff8e8" stroke="#d8a03a"/>
  <text x="650" y="174" text-anchor="middle" font-size="15" font-weight="700" fill="#0f2038">average/expected</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'formula',
          latex: 'T_{text{worst}}(n)=max_{|I|=n} T(I)',
          display: true,
          caption: 'Worst-case time is the largest running time over all inputs of size n.'
        },
        {
          type: 'formula',
          latex: 'T_{text{best}}(n)=min_{|I|=n} T(I)',
          display: true,
          caption: 'Best-case time is the smallest running time over all inputs of size n.'
        },
        {
          type: 'formula',
          latex: 'T_{text{avg}}(n)=sum_{|I|=n} Pr[I],T(I)',
          display: true,
          caption: 'Average or expected time needs probabilities on the inputs or on the algorithm choices.'
        },
        {
          type: 'table',
          caption: 'Which case answers which question?',
          columns: ['Measure', 'Question it answers', 'When it is useful'],
          rows: [
            ['Worst case', 'How bad can it get?', 'Default when stating guarantees'],
            ['Best case', 'How lucky can it get?', 'Understanding adaptivity, but rarely enough alone'],
            ['Average case', 'What happens under a stated input distribution?', 'When the distribution is realistic and explicit'],
            ['Expected time', 'What is the average over random choices?', 'Randomized algorithms such as randomized quicksort']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Default assumption',
          text: 'If a problem asks for the runtime and gives no input distribution, state the worst-case bound unless it clearly asks for best-case, average-case, or expected time.'
        },
        {
          type: 'heading',
          text: 'Why worst-case is the default measure',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'CLRS gives three reasons we report worst case unless told otherwise. Reading them once is enough to settle most "which case should I report?" debates.'
        },
        {
          type: 'table',
          caption: 'Three reasons to report worst-case time',
          columns: ['Reason', 'Explanation'],
          rows: [
            ['It is an upper guarantee', 'A worst-case bound holds for every input of size n. A user can plan around it; a best- or average-case bound makes no such promise.'],
            ['Worst-case inputs occur in practice', 'Real systems see adversarial or pathological inputs more often than uniform-random ones (think malicious users hitting a hash table).'],
            ['Average case is often ≈ worst case', 'For sorting, searching, and many other problems, the asymptotic average and worst-case classes are the same — so worst case loses no precision but gains a guarantee.']
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'When best case is interesting',
          text: 'Best-case time matters when an algorithm is "adaptive" — faster on inputs that are already partly solved. Insertion sort runs in Θ(n) on sorted input, which is why hybrid sorts trigger it on nearly-sorted subarrays.'
        },
        {
          type: 'heading',
          text: 'Adversarial inputs — the worst-case made vivid',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'A useful mental model is to imagine an adversary who, after watching your algorithm, hands you the worst possible input. The worst-case bound is what your algorithm guarantees against that adversary. Real attacks on hash tables, regex engines, and sorting routines have all exploited algorithmic worst cases — so this is not just a theoretical worry.'
        },
        {
          type: 'table',
          caption: 'Famous adversarial inputs',
          columns: ['System', 'Algorithm', 'Adversarial input', 'Effect'],
          rows: [
            ['Web servers (2003)', 'Hash tables with predictable hash', 'Many keys colliding into one bucket', 'O(n) lookup, denial of service'],
            ['Regex backtracking', 'NFA simulation by backtracking', 'Strings forcing exponential branches', 'ReDoS — minutes per request'],
            ['Quicksort (deterministic pivot)', 'Pivot = first element', 'Already-sorted input', 'Θ(n²) sort time']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Defense by randomization',
          text: 'For each of the attacks above, the standard fix is to randomize: random hash seeds, random pivot, or random salt. After randomization, the worst-case input no longer exists from the attacker\'s point of view — what matters is the expected time over the algorithm\'s coin flips.'
        },
        {
          type: 'heading',
          text: 'Intuition first',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Think of an algorithm as a route through a maze. Some inputs take a short route, some take a long route, and some are in between. Worst-case analysis asks for the longest route you might be forced to take. Average-case analysis asks for the average route length, but only after someone tells you how likely each route is.'
        },
        {
          type: 'heading',
          text: 'Worked example: linear search',
          level: 2
        },
        {
          type: 'code',
          title: 'LINEAR-SEARCH(A, v)',
          language: 'pseudocode',
          code: `LINEAR-SEARCH(A, v)
  for i = 1 to A.length
      if A[i] == v
          return i
  return NIL`
        },
        {
          type: 'table',
          caption: 'Linear search cases',
          columns: ['Case', 'Input situation', 'Comparisons', 'Runtime'],
          rows: [
            ['Best case', 'A[1] = v', '1', 'Θ(1)'],
            ['Worst case', 'v absent or at A[n]', 'n', 'Θ(n)'],
            ['Average case, successful search', 'v equally likely at any position', '(n + 1) / 2', 'Θ(n)'],
            ['Average case, unsuccessful search', 'v absent', 'n', 'Θ(n)']
          ]
        },
        {
          type: 'formula',
          latex: '\\mathbb{E}[\\text{comparisons}] = \\frac{1+2+\\cdots+n}{n}=\\frac{n+1}{2}=\\Theta(n)',
          display: true,
          caption: 'Successful linear search with a uniformly random target position.'
        },
        {
          type: 'heading',
          text: 'Worked example: insertion sort',
          level: 2
        },
        {
          type: 'table',
          caption: 'Insertion sort cases',
          columns: ['Case', 'Input situation', 'Why', 'Runtime'],
          rows: [
            ['Best case', 'Already sorted', 'The inner while-loop stops immediately each time', 'Θ(n)'],
            ['Worst case', 'Reverse sorted', 'Each key shifts through the entire sorted prefix', 'Θ(n²)'],
            ['Average case', 'Random order', 'About half the prefix shifts on average', 'Θ(n²)']
          ]
        },
        {
          type: 'formula',
          latex: '\\sum_{j=2}^{n}(j-1)=\\frac{n(n-1)}{2}=\\Theta(n^{2})',
          display: true,
          caption: 'Reverse-sorted insertion sort shifts as many elements as possible.'
        },
        {
          type: 'heading',
          text: 'Worked example: quicksort — where the three measures really differ',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'For insertion sort and linear search the average-case Θ class equals the worst-case Θ class. Quicksort is the textbook counter-example: a Θ(n²) worst case but a Θ(n log n) average case. This is why quicksort is the algorithm that motivates probabilistic analysis in CLRS Ch. 7.'
        },
        {
          type: 'table',
          caption: 'Quicksort across the three cases',
          columns: ['Case', 'Pivot situation each call', 'Recursion shape', 'Runtime'],
          rows: [
            ['Best case',  'Pivot splits the array into two halves of equal size', 'Balanced binary tree of depth log n', 'Θ(n log n)'],
            ['Worst case', 'Pivot is the smallest or largest element each call',  'Unbalanced — one subproblem of size n−1, one empty', 'Θ(n²)'],
            ['Average case (uniformly random input, deterministic pivot)', 'Pivot is roughly the median in expectation', 'Mostly balanced — total work ≈ n log n', 'Θ(n log n) average'],
            ['Expected case (random pivot, any input)', 'Same analysis but randomness is the algorithm\'s, not the input\'s', 'Same depth distribution', 'Θ(n log n) expected — independent of input order']
          ]
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why the average is so much better than the worst',
          text: 'A pivot is a "bad split" only if it lands in the smallest 25% or largest 25% of the array. In a uniformly random input, this happens with probability 1/2. So even fairly unbalanced splits give a recursion depth of about 2·log₂ n. The total work at each depth level is Θ(n), giving Θ(n log n) total — even though the worst single split could be Θ(n).'
        },
        {
          type: 'heading',
          text: 'Probabilistic analysis: a small taste of indicator variables',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'A clean way to compute averages of complicated quantities is to break them into simpler pieces using indicator random variables. For each event of interest, define an indicator that is 1 when the event happens and 0 otherwise. The expected value of an indicator equals the probability of the event.'
        },
        {
          type: 'formula',
          latex: 'X_{ij} = \\begin{cases} 1 & \\text{if event } E_{ij} \\text{ occurs} \\\\ 0 & \\text{otherwise} \\end{cases} \\quad \\Rightarrow \\quad \\mathbb{E}[X_{ij}] = \\Pr[E_{ij}]',
          display: true,
          caption: 'The defining identity. Linearity of expectation lets you sum these without worrying about independence.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'How quicksort uses this',
          text: 'For each pair of elements (i, j) define X_{ij} = 1 if quicksort ever compares them. Total comparisons = ∑ X_{ij}. Each pair is compared at most once, with probability 2/(j−i+1) under random pivots. Summing the probabilities gives the famous 2n·H_n ≈ 2n·ln n bound — that is the Θ(n log n) average.'
        },
        {
          type: 'heading',
          text: 'Expected time vs average case',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Average-case analysis usually averages over a distribution of inputs. Expected-time analysis for a randomized algorithm often averages over the algorithm randomness for a fixed input. The formulas look similar, but the probability space is different.'
        },
        {
          type: 'table',
          caption: 'Do not mix these ideas',
          columns: ['Term', 'Randomness comes from', 'Example'],
          rows: [
            ['Average case', 'Input distribution', 'Linear search where target position is uniform'],
            ['Expected time', 'Algorithm choices or input distribution', 'Randomized quicksort pivot choices'],
            ['Worst case expected time', 'Worst input, average over algorithm randomness', 'Randomized algorithms with adversarial inputs'],
            ['Worst case', 'No probability needed', 'A deterministic upper guarantee']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common mistake',
          text: 'Average case is not the same as "the input feels typical." You must state or be given a probability distribution.'
        },
        {
          type: 'heading',
          text: 'Case study: hash tables and the worst/expected gap',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'Hash tables are the most-used data structure where the gap between worst-case and expected-case time is large enough to change architectural decisions. The same operations have very different bounds depending on which case you measure.'
        },
        {
          type: 'table',
          caption: 'Hash-table operation costs',
          columns: ['Operation', 'Worst case', 'Expected (under simple uniform hashing)', 'Why the gap'],
          rows: [
            ['Insert',     'Θ(n)', 'Θ(1)', 'All keys could collide into the same bucket.'],
            ['Lookup',     'Θ(n)', 'Θ(1)', 'Same — a long bucket chain is searched linearly.'],
            ['Delete',     'Θ(n)', 'Θ(1)', 'Same.'],
            ['Build a table of n keys', 'Θ(n²)', 'Θ(n)', 'Worst case: every insertion is Θ(n).']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Engineering takeaway',
          text: 'When a textbook says hash tables are "Θ(1) per operation", read that as expected time under random keys or random hash functions. The worst case is Θ(n), and that is the bound an attacker can force unless you randomize the hash. Choose the right measure for the threat model.'
        },
        {
          type: 'heading',
          text: 'Decision checklist',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Does the question say worst, best, average, or expected?',
            'If not, report worst case by default.',
            'If average case is requested, identify the input distribution.',
            'If expected time is requested, identify the random choices.',
            'Keep correctness separate from runtime: a slow algorithm can still be correct.'
          ]
        },
        {
          type: 'heading',
          text: 'Practice',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Give best-case and worst-case runtimes for linear search when the target may be absent.',
            'For insertion sort, name one best-case input and one worst-case input of length 6.',
            'Explain why selection sort has Θ(n²) comparisons even in the best case.',
            'For a randomized algorithm, distinguish expected time from worst-case time in one sentence.',
            'Suppose search targets are twice as likely to be near the beginning of the array. What must be specified before computing an average?',
            'Construct an adversarial input that forces deterministic-pivot quicksort into its Θ(n²) worst case.',
            'Explain in one or two lines why randomizing the pivot turns the Θ(n²) worst case of quicksort into a Θ(n log n) expected time, and why an adversary can no longer force the worst case.'
          ]
        },
        { type: 'interactive', artifact: 'case-analysis-sim' },
        {
          type: 'heading',
          text: 'Summary',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Best, worst, and average are three different runtime measures over the set of inputs of size n. Best is min, worst is max, average is an expectation under a stated distribution.',
            'Worst-case is the default: it gives an upper guarantee, often occurs in practice, and is usually asymptotically equal to the average for typical algorithms.',
            'Average-case analysis requires an explicit distribution; without one, "average" is not well-defined.',
            'Expected time is the average over the algorithm\'s own random choices and is the right measure for randomized algorithms.',
            'Quicksort is the canonical example where worst (Θ(n²)) and expected (Θ(n log n)) genuinely differ.',
            'Adversarial inputs are real (hash flooding, ReDoS, sorted-input quicksort). Randomization is the standard defense — once the algorithm is random, no fixed input is "the" worst case.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'You are ready for the next lesson',
          text: 'Lesson 7 puts the asymptotic vocabulary to a different use: it shows how a smarter data structure plus geometric insight turns an obvious Θ(n²) closest-pair search into a Θ(n log n) plane-sweep algorithm.'
        }
      ],
      content: teachingArc({
        bigIdea: 'characterise an algorithm by its behaviour over the worst, best, or expected input.',
        problem: 'an algorithm runs different times on different inputs; pick the meaningful one.',
        intuition: 'worst case = upper guarantee; best case = lucky lower bound; average = realistic forecast under a probability distribution.',
        formal: 'T_worst(n) = max_{|I|=n} T(I); T_best(n) = min over the same; E[T(n)] = expectation under a stated input distribution.',
        algorithm: 'identify which kind of analysis the question is asking about; do not mix.',
        worked: 'insertion sort: best Θ(n), worst Θ(n²), average Θ(n²). Linear search: best Θ(1), worst Θ(n), average Θ(n) (assuming the key is present uniformly at random).',
        correctness: 'no proof here, just precise definitions.',
        complexity: 'unstated assumption "uniform random input" can change the answer.',
        trace: 'classify: which distribution turns quicksort from Θ(n²) worst to Θ(n log n) expected?',
        takeaways: 'worst case is the default; expected time appears with randomised algorithms (chapter 3).',
        practice: 'design a worst-case input for selection sort. Is it the same as for insertion sort?'
      }),
      practice: [
        mcq('algods-u1-l6-q1', 'When is "expected time" rather than "worst-case time" the right metric?',
          ['When the algorithm is recursive.', 'When the algorithm is deterministic on every input.', 'When the algorithm uses randomness, or the problem comes with an input distribution.', 'When the algorithm is in-place.'],
          2, 'Expected time is meaningful when randomness is involved or the input distribution is given.')
      ]
    },
    {
      title: 'Plane sweep — a first taste',
      durationMinutes: 20,
      type: 'video',
      summary: 'Why O(n log n) "feels different" from O(n²): a brief look at sweep-line for closest pair.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Plane sweep is a strategy for geometric problems: sort events from left to right, move an imaginary vertical line across the plane, and maintain only the information that can still affect the answer. In this first taste, the goal is not to master the full closest-pair algorithm yet. The goal is to see how sorting plus a data structure can turn an obvious quadratic search into an n log n algorithm.'
        },
        {
          type: 'diagram',
          title: 'Sweep line intuition',
          caption: 'The vertical sweep line moves left to right. The active set keeps only points close enough in x-coordinate to still improve the current best distance delta.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 360" role="img" aria-label="Plane sweep closest pair diagram">
  <defs>
    <marker id="sweep-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f8a61"/>
    </marker>
  </defs>
  <rect x="50" y="42" width="760" height="260" rx="18" fill="#fbfcfe" stroke="#d8e1ec" stroke-width="2"/>
  <line x1="430" y1="54" x2="430" y2="290" stroke="#0f8a61" stroke-width="4"/>
  <text x="430" y="28" text-anchor="middle" font-size="16" font-weight="800" fill="#0b6d4d">sweep line</text>
  <rect x="305" y="56" width="125" height="232" fill="#eef8f3" opacity=".75"/>
  <text x="367" y="316" text-anchor="middle" font-size="15" fill="#0b6d4d" font-weight="700">active strip width delta</text>
  <line x1="430" y1="316" x2="305" y2="316" stroke="#0f8a61" stroke-width="2" marker-end="url(#sweep-arrow)"/>
  <g fill="#214a84" stroke="#ffffff" stroke-width="2">
    <circle cx="112" cy="224" r="8"/>
    <circle cx="170" cy="108" r="8"/>
    <circle cx="246" cy="180" r="8"/>
    <circle cx="322" cy="92" r="8"/>
    <circle cx="356" cy="210" r="8"/>
    <circle cx="404" cy="154" r="8"/>
    <circle cx="506" cy="116" r="8"/>
    <circle cx="590" cy="238" r="8"/>
    <circle cx="690" cy="142" r="8"/>
    <circle cx="748" cy="256" r="8"/>
  </g>
  <g fill="#d8a03a" stroke="#ffffff" stroke-width="2">
    <circle cx="322" cy="92" r="10"/>
    <circle cx="356" cy="210" r="10"/>
    <circle cx="404" cy="154" r="10"/>
  </g>
  <path d="M452 82 C512 70 568 72 624 92" fill="none" stroke="#0f8a61" stroke-width="3" marker-end="url(#sweep-arrow)"/>
  <text x="542" y="65" text-anchor="middle" font-size="15" fill="#60708a">move left to right</text>
  <text x="630" y="314" text-anchor="middle" font-size="14" fill="#60708a">future points are not inserted yet</text>
  <text x="190" y="314" text-anchor="middle" font-size="14" fill="#60708a">old points outside strip are discarded</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'A short history of plane-sweep algorithms',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The sweep-line technique entered computer science through computational geometry in the 1970s. Two foundational results set the pattern that hundreds of later algorithms follow: sort the events, sweep, and maintain a data structure that captures only what is still relevant.'
        },
        {
          type: 'table',
          caption: 'Landmark sweep-line algorithms',
          columns: ['Year', 'Authors', 'Problem', 'Improvement over naive'],
          rows: [
            ['1975', 'Shamos & Hoey', 'Closest pair of n points',           'Θ(n²) → Θ(n log n)'],
            ['1979', 'Bentley & Ottmann', 'Find all k intersections of n line segments', 'Θ(n²) → Θ((n + k) log n)'],
            ['1986', 'Fortune', 'Compute the Voronoi diagram of n points',  'Θ(n²) → Θ(n log n)'],
            ['~1990', 'Various', 'Map overlay, polygon clipping, hidden-surface removal in graphics', 'Sweep + interval tree']
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'The pattern',
          text: 'Plane sweep is a meta-strategy, not a single algorithm. It says: turn a 2D problem into a 1D problem indexed by time, by walking through events in sorted order and maintaining only the cross-section of objects that intersect the sweep line right now.'
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'list',
          items: [
            'A plane-sweep algorithm processes geometric events in sorted coordinate order.',
            'The sweep line is an imaginary line that moves across the plane, usually left to right.',
            'The active set stores objects near the sweep line that can still affect future answers.',
            'For closest pair, delta is the best distance found so far.',
            'A balanced binary search tree can keep the active set sorted by y-coordinate.',
            'The closest-pair problem asks for the pair of points with minimum Euclidean distance.'
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Why this appears in Unit 1',
          text: 'The FSU order uses plane sweep as motivation for asymptotic thinking. You are not expected to know balanced BST implementation yet; that comes later. Here, focus on why O(n²) and O(n log n) behave very differently.'
        },
        {
          type: 'heading',
          text: 'Intuition first',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The naive closest-pair algorithm compares every point with every other point. Plane sweep avoids most comparisons. Once the sweep line has moved far enough, an old point cannot form a closer pair than the current best distance delta, so it can be removed from consideration.'
        },
        {
          type: 'table',
          caption: 'Naive search vs sweep-line thinking',
          columns: ['Approach', 'What it compares', 'Main cost'],
          rows: [
            ['Naive', 'Every pair of points', 'Θ(n²) distance checks'],
            ['Sweep line', 'Only nearby active candidates', 'Sort + active-set updates'],
            ['Sweep line with balanced BST', 'Candidates by y-coordinate inside the strip', 'Θ(n log n) total time']
          ]
        },
        {
          type: 'heading',
          text: 'The naive Θ(n²) baseline, written out',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'Before designing a clever algorithm, write down the naive one and see exactly what it costs. The naive closest-pair algorithm is a double loop over all unordered pairs.'
        },
        {
          type: 'code',
          title: 'CLOSEST-PAIR-NAIVE(P)',
          language: 'pseudocode',
          code: `CLOSEST-PAIR-NAIVE(P)
  delta = infinity
  best  = NIL
  for i = 1 to P.length - 1
      for j = i + 1 to P.length
          d = distance(P[i], P[j])
          if d < delta
              delta = d
              best  = (P[i], P[j])
  return (best, delta)`
        },
        {
          type: 'formula',
          latex: '\\binom{n}{2} = \\frac{n(n-1)}{2} = \\Theta(n^{2})',
          display: true,
          caption: 'Number of unordered pairs — the inner-loop body executes this many times.'
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Why Θ(n²) breaks at scale',
          text: 'At n = 10⁵ points (a small geographic dataset) the naive algorithm performs ~5·10⁹ distance computations. At ~10⁹ ops/sec this is ~5 seconds in the best case and minutes once cache and floating-point overhead are counted. At n = 10⁶ it becomes infeasible.'
        },
        {
          type: 'heading',
          text: 'Formal version',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'For closest pair, sort points by x-coordinate. Sweep from left to right. Maintain an active set containing only points whose x-coordinate differs from the current point by at most delta. Store the active set ordered by y-coordinate so nearby candidates can be found efficiently.'
        },
        {
          type: 'formula',
          latex: 'delta = min{text{distance of any pair seen so far}}',
          display: true,
          caption: 'The current best distance defines the active strip.'
        },
        {
          type: 'heading',
          text: 'Step-by-step algorithm idea',
          level: 2
        },
        {
          type: 'code',
          title: 'SWEEP-CLOSEST-PAIR sketch',
          language: 'pseudocode',
          code: `SWEEP-CLOSEST-PAIR(P)
  sort P by x-coordinate
  delta = infinity
  active = empty set ordered by y-coordinate
  for each point p in sorted order
      remove points q from active with p.x - q.x > delta
      candidates = points in active with |q.y - p.y| <= delta
      for each q in candidates
          delta = min(delta, distance(p, q))
      insert p into active
  return delta`
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'What is being hidden for now',
          text: 'The hard geometric fact is that only a constant number of candidates need to be checked inside the delta-by-2delta region. The proof uses a packing argument and is easier once the data structures are familiar.'
        },
        {
          type: 'heading',
          text: 'The packing argument — why ≤ 7 candidates suffice',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'The single fact that turns plane sweep from "interesting heuristic" into a Θ(n log n) algorithm is geometric. When the algorithm processes point p, candidates can only sit inside a δ × 2δ rectangle — δ wide on the left of p and 2δ tall around p in y. Inside that rectangle, no two candidates can be closer than δ to each other (otherwise δ would already be smaller). Counting how many points can pack into that rectangle without violating the δ-spacing rule gives a constant bound — at most 7 in the standard analysis.'
        },
        {
          type: 'diagram',
          title: 'A δ × 2δ rectangle holds at most a constant number of candidates',
          caption: 'Each candidate must sit at least δ away from every other candidate. The 6 grey grid cells (each δ/2 wide) can each contain at most one candidate, capping the total at 7 (the bound is a packing-argument exercise).',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 320" role="img" aria-label="Packing argument rectangle">
  <text x="300" y="22" text-anchor="middle" font-size="15" font-weight="800" fill="#0f2038">Why ≤ 7 candidates: a δ × 2δ rectangle to the left of p</text>
  <rect x="60" y="60" width="240" height="240" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <line x1="180" y1="60"  x2="180" y2="300" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"/>
  <line x1="60"  y1="180" x2="300" y2="180" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"/>
  <line x1="60"  y1="120" x2="300" y2="120" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"/>
  <line x1="60"  y1="240" x2="300" y2="240" stroke="#94a3b8" stroke-width="1" stroke-dasharray="4 4"/>
  <text x="180" y="50"  text-anchor="middle" font-size="12" fill="#1d4ed8">width = δ</text>
  <text x="40"  y="180" text-anchor="middle" font-size="12" fill="#1d4ed8" transform="rotate(-90 40 180)">height = 2δ</text>
  <circle cx="350" cy="180" r="8" fill="#dc2626" stroke="#991b1b" stroke-width="2"/>
  <text x="350" y="160" text-anchor="middle" font-size="13" fill="#991b1b" font-weight="700">point p</text>
  <line x1="350" y1="60"  x2="350" y2="300" stroke="#dc2626" stroke-width="2"/>
  <text x="350" y="50"  text-anchor="middle" font-size="12" fill="#dc2626">sweep line</text>
  <g fill="#7c3aed" stroke="#fff" stroke-width="1.5">
    <circle cx="100" cy="100" r="6"/>
    <circle cx="220" cy="140" r="6"/>
    <circle cx="120" cy="220" r="6"/>
    <circle cx="240" cy="270" r="6"/>
  </g>
  <text x="180" y="316" text-anchor="middle" font-size="12" fill="#475569">candidates inside the rectangle (each ≥ δ apart from each other)</text>
  <g transform="translate(420, 90)" font-size="12" fill="#0f2038">
    <text font-weight="700" y="0">Argument</text>
    <text y="22" fill="#475569">• Subdivide the rectangle into</text>
    <text y="40" fill="#475569">  6 cells of side δ/2.</text>
    <text y="62" fill="#475569">• Two points in one cell would be</text>
    <text y="80" fill="#475569">  closer than δ — contradiction.</text>
    <text y="102" fill="#475569">• So at most 6 candidates per call,</text>
    <text y="120" fill="#475569">  plus p itself ⇒ constant work.</text>
  </g>
</svg>`
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'The crucial consequence',
          text: 'Each new point triggers only O(1) distance computations against the active set. Multiplied by n points and amortized with the BST, the total work is O(n log n) — a definite improvement over O(n²).'
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Trace the sweep on a concrete 6-point set sorted by x: P = [(1, 5), (2, 1), (4, 4), (7, 2), (8, 3), (9, 6)]. The sweep maintains the active set (points still within δ in x of the next point) and updates δ whenever a closer pair is found.'
        },
        {
          type: 'table',
          caption: 'Step-by-step plane sweep on P',
          columns: ['Step', 'Process p', 'Trim active set', 'Candidates near p in y', 'New δ', 'Closest pair so far'],
          rows: [
            ['1', '(1, 5)', '— (active set empty)', 'none',                   '∞',           '—'],
            ['2', '(2, 1)', '(1, 5) stays (Δx = 1 ≤ ∞)', '(1, 5)',             '√17 ≈ 4.12',  '(1, 5)–(2, 1)'],
            ['3', '(4, 4)', '(1, 5) stays (Δx = 3 ≤ 4.12); (2, 1) stays', '(1, 5), (2, 1)', '√10 ≈ 3.16',  '(1, 5)–(4, 4)'],
            ['4', '(7, 2)', '(1, 5) and (2, 1) drop (Δx > 3.16); (4, 4) stays', '(4, 4) — within Δy ≤ 3.16', '√13 ≈ 3.61 → no update; δ stays 3.16', '(1, 5)–(4, 4)'],
            ['5', '(8, 3)', '(4, 4) drops (Δx = 4 > 3.16); (7, 2) stays', '(7, 2)',          '√2 ≈ 1.41',  '(7, 2)–(8, 3)'],
            ['6', '(9, 6)', '(7, 2) stays (Δx = 2 ≤ 1.41 is false → drop); (8, 3) stays', '(8, 3) — Δy = 3 > 1.41 → no candidate', '√10 ≈ 3.16 → no update; δ stays 1.41', '(7, 2)–(8, 3)']
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'What the trace shows',
          text: 'After step 5, δ collapses from ~3.16 to ~1.41. From that point on, the active set is much smaller — most older points have been trimmed out because they sit more than 1.41 to the left in x. This is the engine of the n log n bound: as δ shrinks, the active set shrinks with it.'
        },
        {
          type: 'heading',
          text: 'Correctness intuition',
          level: 2
        },
        {
          type: 'list',
          items: [
            'When processing p, any point farther than delta in x-coordinate cannot make a pair closer than delta with p.',
            'Therefore removing those old points cannot remove a better answer.',
            'Any pair closer than the current delta must lie inside the active strip when the rightmost point of the pair is processed.',
            'The active set ordered by y lets the algorithm find the only candidates that could improve delta.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space complexity',
          level: 2
        },
        {
          type: 'table',
          caption: 'Cost breakdown',
          columns: ['Part', 'Cost with balanced BST', 'Reason'],
          rows: [
            ['Sort by x', 'Θ(n log n)', 'Comparison sorting lower bound appears later in the course'],
            ['Insert/delete active points', 'O(log n) each', 'Balanced BST update'],
            ['Candidate lookup by y', 'O(log n + k)', 'Range query plus candidates'],
            ['Total', 'Θ(n log n)', 'n events, logarithmic updates, constant candidate bound']
          ]
        },
        {
          type: 'formula',
          latex: '\\Theta(n^{2}) \\quad \\text{vs.} \\quad \\Theta(n\\log n)',
          display: true,
          caption: 'Both solve the same problem, but the growth rates separate dramatically.'
        },
        {
          type: 'table',
          caption: 'Why the asymptotic improvement matters',
          columns: ['n', 'n² pair checks', 'n log₂ n scale'],
          rows: [
            ['1,000', '1,000,000', 'about 9,966'],
            ['100,000', '10,000,000,000', 'about 1,660,964'],
            ['1,000,000', '1,000,000,000,000', 'about 19,931,569']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common mistake',
          text: 'Do not say "sort makes it faster" by itself. Sorting costs Θ(n log n), but the win comes from sorting plus maintaining a small active set with a data structure.'
        },
        {
          type: 'heading',
          text: 'Other Θ(n log n) approaches to closest pair',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'Plane sweep is not the only way to reach Θ(n log n) for closest pair. Knowing the alternative is useful because each technique generalizes to a different family of problems.'
        },
        {
          type: 'table',
          caption: 'Two routes to Θ(n log n) closest pair',
          columns: ['Approach', 'Outline', 'Generalizes to'],
          rows: [
            ['Plane sweep + balanced BST', 'Sort by x, sweep with an active set ordered by y. O(log n) per insertion/query.', 'Bentley–Ottmann line-segment intersection, Fortune\'s Voronoi diagram, segment intersection.'],
            ['Divide and conquer', 'Split the points by x into two halves, recurse, then merge by checking only points within δ of the dividing line.', 'Convex hull (CLRS Ch. 33), counting inversions, generic D&C with combine-step Θ(n).']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Divide-and-conquer in one line',
          text: 'Closest-pair-DnC: T(n) = 2 T(n/2) + Θ(n) by the merge step → T(n) = Θ(n log n) by the master theorem. We will derive this carefully when we get to recurrences in Unit 2.'
        },
        {
          type: 'heading',
          text: 'Other plane-sweep applications',
          level: 3
        },
        {
          type: 'list',
          items: [
            'Bentley–Ottmann: report all k intersections of n line segments in Θ((n + k) log n).',
            'Fortune\'s algorithm: build the Voronoi diagram of n points in Θ(n log n) — used in motion planning and graphics.',
            'Map overlay: combine two planar subdivisions into one in Θ((n + k) log n) where k is the number of intersections.',
            'Skyline (rectangle silhouette): merge n rectangles of varying heights in Θ(n log n) using the active set of "currently visible" rectangles.',
            'Interval scheduling: with sorted endpoints, sweep across time and choose non-overlapping intervals greedily.'
          ]
        },
        {
          type: 'heading',
          text: 'Practice',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Explain why a point with x-coordinate less than p.x - delta can be removed from the active set.',
            'For n = 100,000, compare the scale of n² and n log n.',
            'Name the data structure that keeps the active set ordered by y-coordinate.',
            'Why is this lesson only a first taste rather than the full proof?',
            'Give another situation where sorting first might reduce repeated comparisons later.',
            'Walk through the 6-point trace above on paper and verify the final closest pair is (7, 2)–(8, 3).',
            'Sketch the δ × 2δ rectangle for p = (8, 3) when δ = 3.16, and identify which earlier points fall inside it.'
          ]
        },
        { type: 'interactive', artifact: 'sweep-line-viz' },
        {
          type: 'heading',
          text: 'Summary',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Plane sweep is a meta-strategy: turn a 2D problem into a sequence of 1D events processed in sorted order, maintaining only the active cross-section.',
            'For closest pair, the naive Θ(n²) algorithm is replaced by sort-by-x, sweep, and an active set ordered by y.',
            'The geometric packing argument bounds the number of candidates per insertion by a constant (≤ 7), making the per-point work O(log n) — total Θ(n log n).',
            'Adversarial inputs cannot break this bound: the analysis is purely deterministic.',
            'Divide-and-conquer is an alternative Θ(n log n) approach to the same problem, generalizing differently than plane sweep does.',
            'The same sweep idea solves Bentley–Ottmann line-segment intersections, Fortune\'s Voronoi diagram, map overlay, and skyline merging.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Where Unit 1 takes you',
          text: 'You now have the full toolbox: an algorithmic vocabulary, a cost model, a correctness method, an asymptotic language, and a glimpse of how a smarter data structure changes the cost class. Unit 2 starts with recurrence relations — the technique that lets us analyze divide-and-conquer algorithms like merge sort and the closest-pair D&C variant mentioned above.'
        }
      ],
      content: teachingArc({
        bigIdea: 'sweeping a vertical line across points and maintaining a balanced BST gives O(n log n) closest pair.',
        problem: 'given n points in the plane, find the two closest. Naive O(n²) is impractical at n = 10⁵.',
        intuition: 'sort by x; sweep left to right; maintain points within the current best distance in a y-sorted set; only check a constant number of nearby candidates per insertion.',
        formal: 'maintain an active set sorted by y. For each new point, look up O(1) points within delta in y; update delta if a closer pair is found.',
        algorithm: 'sort by x; for each point in order, query and insert into a balanced BST keyed by y; trim the active set on the left.',
        worked: 'we will revisit the BST in chapter 4 when we have the data structure to make this fast.',
        correctness: 'the constant-candidate-per-insertion bound comes from a packing argument in a delta x delta box.',
        complexity: 'Θ(n log n) under a balanced BST.',
        trace: 'imagine the sweep on a small set of 6 points, mark the active set at each step.',
        takeaways: 'an asymptotic improvement comes from a smarter data structure plus a geometric insight; both ingredients matter.',
        practice: 'sketch the active set on the sample 6-point input and identify when delta updates.'
      }),
      practice: [
        mcq('algods-u1-l7-q1', 'Why does plane sweep beat O(n²) for closest pair?',
          ['It uses a faster CPU.', 'It maintains a structured active set so each new point queries only O(log n) candidates.', 'It precomputes the answer.', 'It uses parallelism.'],
          1, 'The sorted active set + balanced BST means each step is O(log n) work, summed over n points.')
      ]
    },
    {
      title: 'Unit 1 review and exercises',
      durationMinutes: 60,
      type: 'practice',
      summary: 'Concept map of Unit 1, full cheat sheet, and a graduated CLRS-style exercise set with worked solutions.',
      richContent: [
        {
          type: 'heading',
          text: 'How to use this lesson',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'You have finished Unit 1. This lesson is the consolidation pass. It walks you through a one-page summary of the seven lessons, hands you a graduated set of exercises (easy → medium → hard), and provides full solutions in a separate section so you can attempt everything first without temptation.'
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A learning protocol',
          text: 'Read the refresher; close the page; reproduce the cheat-sheet from memory; only then attempt the exercises. The act of regenerating the summary is what builds long-term recall — not re-reading.'
        },
        {
          type: 'heading',
          text: 'What this lesson contains',
          level: 2
        },
        {
          type: 'diagram',
          title: 'Unit 1 review path',
          caption: 'Three games in order, then 17 paper exercises (Easy → Medium → Hard) with full solutions, then a 13-question Boss Round MCQ set at the end. Aim to complete all three games before touching paper.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 200" role="img" aria-label="Lesson roadmap">
  <defs>
    <marker id="path-ar" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed"/>
    </marker>
  </defs>
  <text x="440" y="22" text-anchor="middle" font-size="15" font-weight="800" fill="#0f2038">Your path through this lesson</text>

  <!-- nodes -->
  <g font-family="-apple-system, system-ui, sans-serif">
    <rect x="30"  y="50" width="150" height="68" rx="14" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="105" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Refresher</text>
    <text x="105" y="98" text-anchor="middle" font-size="11" fill="#475569">concept map +</text>
    <text x="105" y="112" text-anchor="middle" font-size="11" fill="#475569">cheat-sheet</text>

    <rect x="195" y="50" width="150" height="68" rx="14" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
    <text x="270" y="74" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Game 1</text>
    <text x="270" y="92" text-anchor="middle" font-size="11" fill="#475569">complexity match</text>
    <text x="270" y="108" text-anchor="middle" font-size="11" fill="#475569">8 algorithms</text>

    <rect x="360" y="50" width="150" height="68" rx="14" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
    <text x="435" y="74" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Game 2</text>
    <text x="435" y="92" text-anchor="middle" font-size="11" fill="#475569">inversion counter</text>
    <text x="435" y="108" text-anchor="middle" font-size="11" fill="#475569">live visualization</text>

    <rect x="525" y="50" width="150" height="68" rx="14" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
    <text x="600" y="74" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Game 3</text>
    <text x="600" y="92" text-anchor="middle" font-size="11" fill="#475569">spot the proof bug</text>
    <text x="600" y="108" text-anchor="middle" font-size="11" fill="#475569">3 scenarios</text>

    <rect x="690" y="50" width="160" height="68" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="770" y="74" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Boss Round</text>
    <text x="770" y="92" text-anchor="middle" font-size="11" fill="#475569">17 paper exercises</text>
    <text x="770" y="108" text-anchor="middle" font-size="11" fill="#475569">+ 13 MCQs</text>

    <line x1="180" y1="84" x2="195" y2="84" stroke="#7c3aed" stroke-width="2" marker-end="url(#path-ar)"/>
    <line x1="345" y1="84" x2="360" y2="84" stroke="#7c3aed" stroke-width="2" marker-end="url(#path-ar)"/>
    <line x1="510" y1="84" x2="525" y2="84" stroke="#7c3aed" stroke-width="2" marker-end="url(#path-ar)"/>
    <line x1="675" y1="84" x2="690" y2="84" stroke="#7c3aed" stroke-width="2" marker-end="url(#path-ar)"/>

    <text x="440" y="160" text-anchor="middle" font-size="12" fill="#475569" font-style="italic">Recommended time: ~45 minutes for the games, ~90 minutes for the paper exercises.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Concept map: Unit 1 in one picture',
          level: 2
        },
        {
          type: 'diagram',
          title: 'How the seven lessons connect',
          caption: 'Each block is one lesson. Arrows show conceptual dependency: the next block builds directly on the previous one.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 400" role="img" aria-label="Unit 1 concept map">
  <defs>
    <marker id="map-ar" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed"/>
    </marker>
  </defs>
  <text x="440" y="26" text-anchor="middle" font-size="16" font-weight="800" fill="#0f2038">Unit 1 — algorithms, costs, correctness, growth</text>

  <!-- L1 -->
  <rect x="40" y="60" width="200" height="64" rx="14" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="140" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L1 What is an algorithm?</text>
  <text x="140" y="106" text-anchor="middle" font-size="11" fill="#475569">Knuth\'s 5 properties</text>

  <!-- L2 -->
  <rect x="320" y="60" width="200" height="64" rx="14" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="420" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L2 The RAM model</text>
  <text x="420" y="106" text-anchor="middle" font-size="11" fill="#475569">T(n) = ∑ c_i · t_i(n)</text>

  <!-- L3 -->
  <rect x="600" y="60" width="200" height="64" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="700" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L3 Insertion sort</text>
  <text x="700" y="106" text-anchor="middle" font-size="11" fill="#475569">first real algorithm</text>

  <!-- L4 -->
  <rect x="600" y="170" width="200" height="64" rx="14" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
  <text x="700" y="196" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L4 Loop invariants</text>
  <text x="700" y="216" text-anchor="middle" font-size="11" fill="#475569">init / maintain / terminate</text>

  <!-- L5 -->
  <rect x="320" y="170" width="200" height="64" rx="14" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
  <text x="420" y="196" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L5 O / Θ / Ω</text>
  <text x="420" y="216" text-anchor="middle" font-size="11" fill="#475569">growth-rate vocabulary</text>

  <!-- L6 -->
  <rect x="40" y="170" width="200" height="64" rx="14" fill="#fee2e2" stroke="#b91c1c" stroke-width="2"/>
  <text x="140" y="196" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L6 Worst/best/avg/expected</text>
  <text x="140" y="216" text-anchor="middle" font-size="11" fill="#475569">which case to report</text>

  <!-- L7 -->
  <rect x="320" y="280" width="240" height="64" rx="14" fill="#cffafe" stroke="#0891b2" stroke-width="2"/>
  <text x="440" y="306" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L7 Plane sweep</text>
  <text x="440" y="326" text-anchor="middle" font-size="11" fill="#475569">Θ(n²) → Θ(n log n) closest pair</text>

  <line x1="240" y1="92" x2="316" y2="92" stroke="#7c3aed" stroke-width="2" marker-end="url(#map-ar)"/>
  <line x1="520" y1="92" x2="596" y2="92" stroke="#7c3aed" stroke-width="2" marker-end="url(#map-ar)"/>
  <line x1="700" y1="124" x2="700" y2="166" stroke="#7c3aed" stroke-width="2" marker-end="url(#map-ar)"/>
  <line x1="596" y1="200" x2="524" y2="200" stroke="#7c3aed" stroke-width="2" marker-end="url(#map-ar)"/>
  <line x1="316" y1="200" x2="244" y2="200" stroke="#7c3aed" stroke-width="2" marker-end="url(#map-ar)"/>
  <line x1="240" y1="234" x2="380" y2="276" stroke="#7c3aed" stroke-width="2" marker-end="url(#map-ar)"/>
  <line x1="420" y1="234" x2="440" y2="276" stroke="#7c3aed" stroke-width="2" marker-end="url(#map-ar)"/>
</svg>`
        },
        {
          type: 'heading',
          text: 'Quick refresher — the seven lessons in one table',
          level: 2
        },
        {
          type: 'table',
          caption: 'One row per lesson; the "you should be able to" column is the learning checklist.',
          columns: ['Lesson', 'Central idea', 'You should be able to'],
          rows: [
            ['L1', 'Algorithm = finite, definite, effective procedure with input/output contract.', 'State Knuth\'s 5 properties; classify a procedure as algorithm vs heuristic; write CLRS pseudocode.'],
            ['L2', 'RAM model: each primitive op is unit cost; T(n) = ∑ c_i · t_i(n).', 'Build a line-by-line cost table for any pseudocode; sum arithmetic / geometric series.'],
            ['L3', 'Insertion sort: extend a sorted prefix one key at a time.', 'Write the pseudocode; trace on any input; state the invariant; give best/worst/avg.'],
            ['L4', 'Loop invariant proofs: initialization, maintenance, termination.', 'Write a correctness proof for SUM-ARRAY, MAXIMUM, LINEAR-SEARCH, BINARY-SEARCH.'],
            ['L5', 'Asymptotic notation O / Θ / Ω, plus o / ω.', 'Apply the limit test; use the algebraic rules; place a function in the growth hierarchy.'],
            ['L6', 'Best, worst, average, expected — four distinct measures.', 'Pick the right measure for a problem; recognize when worst ≠ average (quicksort).'],
            ['L7', 'Plane sweep: sort + active set + balanced BST = Θ(n log n).', 'Explain why naive closest-pair is Θ(n²) and how the packing argument bounds candidates.']
          ]
        },
        {
          type: 'heading',
          text: 'Cheat sheet — formulas you must know cold',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\sum_{k=1}^{n} 1 = n,\\quad \\sum_{k=1}^{n} k = \\tfrac{n(n+1)}{2},\\quad \\sum_{k=0}^{n-1} 2^{k} = 2^{n} - 1',
          display: true,
          caption: 'The three sums that appear in almost every RAM analysis.'
        },
        {
          type: 'formula',
          latex: 'f = O(g) \\iff \\exists c > 0,\\ \\exists n_0:\\quad 0 \\le f(n) \\le c \\cdot g(n) \\quad \\text{for all } n \\ge n_0',
          display: true,
          caption: 'Big-O — the eventual upper bound.'
        },
        {
          type: 'formula',
          latex: '\\log n = o(n^{c}) \\ \\text{for } c>0,\\quad n^{c} = o(a^{n}) \\ \\text{for } a>1,\\quad a^{n} = o(n!)',
          display: true,
          caption: 'The standard hierarchy of growth.'
        },
        {
          type: 'table',
          caption: 'Algorithm property cheat-sheet for Unit 1',
          columns: ['Algorithm', 'Best', 'Worst', 'Average', 'Space', 'Stable?'],
          rows: [
            ['Linear search',    'Θ(1)',    'Θ(n)',    'Θ(n)',    'Θ(1)', '—'],
            ['Binary search',    'Θ(1)',    'Θ(log n)','Θ(log n)','Θ(1)', '—'],
            ['Maximum scan',     'Θ(n)',    'Θ(n)',    'Θ(n)',    'Θ(1)', '—'],
            ['Insertion sort',   'Θ(n)',    'Θ(n²)',   'Θ(n²)',   'Θ(1)', 'Yes'],
            ['Selection sort',   'Θ(n²)',   'Θ(n²)',   'Θ(n²)',   'Θ(1)', 'No'],
            ['Bubble sort',      'Θ(n)',    'Θ(n²)',   'Θ(n²)',   'Θ(1)', 'Yes'],
            ['Quicksort (det.)', 'Θ(n log n)','Θ(n²)','Θ(n log n)','Θ(log n)', 'No'],
            ['Closest-pair sweep','Θ(n log n)','Θ(n log n)','Θ(n log n)','Θ(n)', '—']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Memorize this row',
          text: 'Insertion sort: Θ(n) best, Θ(n²) worst and average, Θ(1) extra space, stable, and in-place. This row connects the unit’s cost, correctness, and asymptotic-analysis ideas.'
        },
        {
          type: 'heading',
          text: 'The growth ladder — climb it from memory',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Before you start the exercises, sketch this ladder on a blank page. Knowing the ordering by heart is the single biggest leverage point for asymptotic problems.'
        },
        {
          type: 'diagram',
          title: 'Common growth classes, slowest to fastest',
          caption: 'Each rung dominates every rung below it asymptotically. Hover-equivalent: ask "how many ops at n = 1 000?" — the green band stays under a million; the red rungs explode.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 360" role="img" aria-label="Growth-rate ladder">
  <text x="440" y="26" text-anchor="middle" font-size="15" font-weight="800" fill="#0f2038">Growth ladder — n = 1 000 reference</text>
  <line x1="80" y1="320" x2="80" y2="60" stroke="#94a3b8" stroke-width="2"/>
  <g font-family="-apple-system, system-ui, sans-serif">
    <!-- rungs -->
    <g>
      <rect x="80"  y="300" width="160" height="22" fill="#dcfce7" stroke="#16a34a"/><text x="160" y="316" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Θ(1)</text><text x="252" y="316" font-size="12" fill="#475569">≈ 1 op</text>
      <rect x="80"  y="270" width="180" height="22" fill="#dcfce7" stroke="#16a34a"/><text x="170" y="286" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Θ(log n)</text><text x="270" y="286" font-size="12" fill="#475569">≈ 10 ops</text>
      <rect x="80"  y="240" width="220" height="22" fill="#dcfce7" stroke="#16a34a"/><text x="190" y="256" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Θ(n)</text><text x="310" y="256" font-size="12" fill="#475569">≈ 1 000 ops</text>
      <rect x="80"  y="210" width="280" height="22" fill="#fef9c3" stroke="#ca8a04"/><text x="220" y="226" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Θ(n log n)</text><text x="370" y="226" font-size="12" fill="#475569">≈ 10 000 ops</text>
      <rect x="80"  y="180" width="360" height="22" fill="#fef9c3" stroke="#ca8a04"/><text x="260" y="196" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Θ(n²)</text><text x="450" y="196" font-size="12" fill="#475569">≈ 10⁶ ops — minutes</text>
      <rect x="80"  y="150" width="500" height="22" fill="#ffe4e6" stroke="#dc2626"/><text x="330" y="166" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Θ(n³)</text><text x="590" y="166" font-size="12" fill="#475569">≈ 10⁹ ops — hours</text>
      <rect x="80"  y="120" width="640" height="22" fill="#ffe4e6" stroke="#dc2626"/><text x="400" y="136" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Θ(2ⁿ)</text><text x="730" y="136" font-size="12" fill="#475569">infeasible past n ≈ 30</text>
      <rect x="80"  y="90"  width="780" height="22" fill="#ffe4e6" stroke="#dc2626"/><text x="470" y="106" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Θ(n!)</text><text x="200" y="106" font-size="12" fill="#475569">infeasible past n ≈ 12</text>
    </g>
    <!-- right-side band labels -->
    <text x="780" y="260" font-size="12" fill="#16a34a" font-weight="700" text-anchor="end">scalable (green)</text>
    <text x="780" y="200" font-size="12" fill="#ca8a04" font-weight="700" text-anchor="end">watch input size (yellow)</text>
    <text x="780" y="80" font-size="12" fill="#dc2626" font-weight="700" text-anchor="end">explosive (red)</text>
    <!-- arrow -->
    <line x1="80" y1="60" x2="80" y2="50" stroke="#0f2038" stroke-width="2"/>
    <polygon points="74,50 86,50 80,40" fill="#0f2038"/>
    <text x="100" y="55" font-size="11" fill="#475569" font-style="italic">faster growth</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Game 1 — Match each algorithm to its complexity',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A quick warm-up: drag your eyes between the two columns and pair them up. This forces you to recall the cheat-sheet rows in a different order than you learned them — much better for memory than re-reading.'
        },
        { type: 'interactive', artifact: 'complexity-match' },
        {
          type: 'heading',
          text: 'Game 2 — Inversion counter',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The number of inversions in an array directly determines insertion-sort runtime: T(n) = Θ(n + I). Type any array and watch the red arcs jump on every out-of-order pair. The runtime estimate updates live.'
        },
        { type: 'interactive', artifact: 'inversion-counter' },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'What this widget teaches',
          text: 'Try the four presets and watch the I value. Sorted = 0, reverse = n(n−1)/2 (the maximum). "Almost sorted" gives a tiny I — confirming why hybrid sorts use insertion sort on nearly-sorted subarrays. Quick mental model: each red arc costs one shift in the inner loop.'
        },
        {
          type: 'heading',
          text: 'Exercises — easy (warm-up)',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'These exercises only check that the vocabulary has stuck. If you cannot answer them in under 30 seconds each, re-read the relevant lesson before going on. Click "Show solution" only after you have your own answer on paper.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'E1',
              source: 'L3 · trace',
              question: 'Trace INSERTION-SORT on A = [12, 5, 9, 1, 8]. Write A after each outer iteration j = 2, 3, 4, 5.',
              solution: '[12, 5, 9, 1, 8] → j=2: [5, 12, 9, 1, 8] → j=3: [5, 9, 12, 1, 8] → j=4: [1, 5, 9, 12, 8] → j=5: [1, 5, 8, 9, 12].'
            },
            {
              id: 'E2',
              source: 'L5 · classify',
              question: 'Give the tightest Θ-class of f(n) = n³/1000 − 100·n² − 100·n + 3.',
              solution: 'Θ(n³). The leading term is n³/1000; the constant 1/1000 is irrelevant; the lower-order terms −100n² and −100n are eventually dominated by n³/1000.'
            },
            {
              id: 'E3',
              source: 'L5 · ordering',
              question: 'Order from slowest to fastest growth: log n, n, n log n, n², 2ⁿ.',
              solution: 'log n < n < n log n < n² < 2ⁿ. Justified pairwise by the limit test or the standard hierarchy from L5.'
            },
            {
              id: 'E4',
              source: 'L1 · algorithm vs heuristic',
              question: 'Decide algorithm or not: "Try random pivots and stop after 100 attempts; report the best result so far."',
              solution: 'Algorithm. The procedure has a clear input (something to optimize), a clear output (the best result), runs for a finite (≤ 100) number of steps, and every step is unambiguous. It is a randomized algorithm — the output may not be the global best, but the procedure itself satisfies all five Knuth properties.'
            },
            {
              id: 'E5',
              source: 'L6 · case',
              question: 'What is the best-case time of LINEAR-SEARCH(A, v) when v is in A and the array has length n? Why?',
              solution: 'Θ(1). The best case occurs when v is at A[1]; the for-loop returns on its first comparison.'
            },
            {
              id: 'E6',
              source: 'L2 · cost',
              question: 'A double for-loop runs i = 1..n, j = 1..n with one constant-cost line in the body. How many times is the body executed?',
              solution: 'n² body executions. Both loops run exactly n times independently of each other, so the body is hit n · n = n² times.'
            }
          ]
        },
        {
          type: 'heading',
          text: 'Exercises — medium (one-step proof or analysis)',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'These exercises are adapted from CLRS Chapters 2 and 3. They require a short proof or a careful trace, but no new techniques beyond what Unit 1 introduced.'
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'M1',
              source: 'CLRS 2.1-3 · adapted',
              question: 'Write LINEAR-MIN(A) that returns the index of the smallest element of A[1..n]. State a loop invariant about A[1..i−1] and prove initialization, maintenance, termination.',
              solution: 'Pseudocode: LINEAR-MIN(A): m ← 1; for i = 2 to A.length: if A[i] < A[m] then m ← i; return m. Invariant: at the start of iteration i, m is the index of the minimum of A[1..i−1]. Initialization: i = 2, m = 1, and A[1..1] = {A[1]} has minimum A[1]. Maintenance: assume m is the min index of A[1..i−1]. If A[i] < A[m] we update m ← i; otherwise A[m] ≤ A[i] still, so m is also a min index of A[1..i]. Termination: at exit i = n+1, so m is the min index of A[1..n]. ✓'
            },
            {
              id: 'M2',
              source: 'CLRS 2.2-2 · adapted',
              question: 'SELECTION-SORT picks the minimum of A[i..n] and swaps it with A[i] for i = 1..n−1. State a loop invariant for the outer loop, and explain in two sentences why the inner-loop cost is independent of the input — i.e. why best, worst, and average are all Θ(n²).',
              solution: 'Outer-loop invariant: at the start of iteration i, A[1..i−1] is sorted and contains the i−1 smallest elements of the original array. Inner-loop cost: the inner loop scans A[i..n] for its minimum, doing exactly n−i comparisons regardless of element values. Sum over i = 1 to n−1 of (n − i) = n(n−1)/2 = Θ(n²). The count is data-independent, so best = worst = average = Θ(n²).'
            },
            {
              id: 'M3',
              source: 'CLRS 3.1-1 · adapted',
              question: 'Let f and g be eventually nonnegative. Prove that max(f(n), g(n)) = Θ(f(n) + g(n)).',
              solution: 'For all n with f(n), g(n) ≥ 0: max(f(n), g(n)) ≤ f(n) + g(n) (one term is at most the sum), and max(f(n), g(n)) ≥ ½ · (f(n) + g(n)) (because max ≥ average of two values). So with c₁ = ½, c₂ = 1, n₀ = 1 we have c₁(f + g) ≤ max(f, g) ≤ c₂(f + g), giving max(f, g) = Θ(f + g). ✓'
            },
            {
              id: 'M4',
              source: 'L2 · triangular loop',
              question: 'Consider the loop "for i = 1 to n: for j = i to n: do constant work". Compute the exact number of body executions and conclude its Θ-class.',
              solution: 'Body executions = Σ from i=1 to n of (n − i + 1) = n + (n−1) + ... + 1 = n(n+1)/2 = Θ(n²). The triangular shape gives the same Θ-class as a square loop, only with half the constant.'
            },
            {
              id: 'M5',
              source: 'L4 · binary-search invariant',
              question: 'State a loop invariant for BINARY-SEARCH(A, v) on a sorted array, and write a one-line termination measure. Hint: the invariant is about the search interval; the measure is hi − lo + 1.',
              solution: 'Invariant: at the start of each iteration of the while-loop, if v is in A then v is in A[lo..hi]. Termination measure: hi − lo + 1, which strictly decreases each iteration (because either lo grows or hi shrinks) and is bounded below by 0. When the measure reaches 0 the loop exits.'
            },
            {
              id: 'M6',
              source: 'L6 · adversarial',
              question: 'Construct an input that forces deterministic-pivot QUICKSORT (pivot = first element) into Θ(n²) on n = 6 elements. Then explain in one line why randomizing the pivot defeats this adversary.',
              solution: 'Adversarial input for n = 6: any sorted array, e.g. [1, 2, 3, 4, 5, 6]. With pivot = first element, the partition produces a left part of size 0 and a right part of size n−1 — recursion is unbalanced at every level, giving 6 + 5 + 4 + 3 + 2 + 1 = 21 = Θ(n²) work. After randomizing the pivot, the adversary cannot pre-arrange the array to force this — the choice of pivot is independent of input order.'
            }
          ]
        },
        {
          type: 'heading',
          text: 'Game 3 — Spot the bug in the proof',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Three loop-invariant proofs each contain one mistake. Read carefully and click the step that is wrong — or click the invariant itself if it is too weak. This exercise develops the habit of finding proof errors before they spread.'
        },
        { type: 'interactive', artifact: 'proof-error-finder' },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Strategy when you grade your own proofs',
          text: 'In every loop-invariant proof, ask three questions: (1) Is the invariant strong enough to imply the postcondition? (2) Does each step actually use the loop body — or only its surface? (3) Does termination give a useful conclusion when the loop exits? Many incomplete proofs come from skipping question (1).'
        },
        {
          type: 'heading',
          text: 'Exercises — hard (multi-step / proof-flavored)',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'These problems combine several Unit-1 ideas. Complete them confidently before moving on to recurrences.'
        },
        {
          type: 'exercises',
          difficulty: 'hard',
          exercises: [
            {
              id: 'H1',
              source: 'CLRS 3.1-4 · adapted',
              question: 'Decide each of the following and justify with the inequality definition. (a) Is 2ⁿ⁺¹ = O(2ⁿ)? (b) Is 2²ⁿ = O(2ⁿ)?',
              solution: '(a) YES. 2ⁿ⁺¹ = 2 · 2ⁿ, so with c = 2 and n₀ = 1, 2ⁿ⁺¹ ≤ c · 2ⁿ. (b) NO. 2²ⁿ = (2ⁿ)². The ratio 2²ⁿ / 2ⁿ = 2ⁿ → ∞, so no constant c can satisfy 2²ⁿ ≤ c · 2ⁿ for all large n. Doubling the exponent is not a constant factor.'
            },
            {
              id: 'H2',
              source: 'CLRS 2-1 hybrid sort · adapted',
              question: 'Modify merge sort so that subarrays of size at most k are sorted by insertion sort instead. Show that the resulting algorithm runs in Θ(nk + n · log(n/k)) worst-case time. Then find the value of k (as a Θ-function of n) for which the hybrid achieves the same Θ class as plain merge sort.',
              solution: 'Insertion sort on a subarray of size k costs Θ(k²). There are n/k such subarrays, so the total insertion-sort phase costs (n/k) · Θ(k²) = Θ(nk). Now merge the n/k sorted subarrays. The merge tree has log(n/k) levels and Θ(n) work per level, giving Θ(n · log(n/k)) for the merging phase. Total: Θ(nk + n · log(n/k)). For k = Θ(log n) we get Θ(n log n + n · log(n/log n)) = Θ(n log n) — same Θ-class as plain merge sort. (Practical Timsort uses k ≈ 16–32.)'
            },
            {
              id: 'H3',
              source: 'CLRS 3-2 · adapted',
              question: 'Order the following six functions from slowest to fastest growth, justifying every adjacent comparison with one line: log log n, (log n)ˡᵒᵍ ⁿ, n, n¹⁄ˡᵒᵍ ⁿ, n!, (3/2)ⁿ.',
              solution: 'Slowest to fastest: log log n < n¹⁄ˡᵒᵍ ⁿ < (log n)ˡᵒᵍ ⁿ < n < (3/2)ⁿ < n!. (i) n¹⁄ˡᵒᵍ ⁿ = 2 (constant!), and log log n → ∞, so log log n < n¹⁄ˡᵒᵍ ⁿ eventually. (ii) (log n)ˡᵒᵍ ⁿ = 2^((log n)·(log log n)), which dominates any constant. (iii) (log n)ˡᵒᵍ ⁿ is sub-polynomial: its log is (log n)·(log log n) = o(log n²), so the function is o(nᶜ) for any c > 0; thus < n. (iv) n < (3/2)ⁿ by the polynomial-vs-exponential rule. (v) (3/2)ⁿ < n! by Stirling: log(n!) = Θ(n log n) which dominates n · log(3/2).'
            },
            {
              id: 'H4',
              source: 'L3 + L6 · inversions',
              question: 'Recall T(n) = Θ(n + I) for insertion sort, where I is the number of inversions. Compute I exactly for the permutation [4, 1, 5, 2, 6, 3]. Then state and verify the worst-case bound I ≤ n(n−1)/2 for general permutations of length n.',
              solution: 'Inversions of [4, 1, 5, 2, 6, 3]: pairs (i, j) with i < j and A[i] > A[j]. Enumerate: (4,1), (4,2), (4,3), (5,2), (5,3), (6,3) — six inversions. So I = 6. The maximum over permutations of n elements is n(n−1)/2 (every pair inverted, i.e. the reverse-sorted permutation). Verification: the maximum number of unordered pairs in {1,..,n} is C(n,2) = n(n−1)/2, and each pair contributes at most 1 inversion, so I ≤ n(n−1)/2. ✓'
            },
            {
              id: 'H5',
              source: 'L7 · plane sweep cost',
              question: 'Argue, without diving into the BST mechanics, why the plane-sweep closest-pair algorithm is Θ(n log n). Identify which step contributes the n log n factor and which step contributes the log n per insertion.',
              solution: 'The sort-by-x phase is Θ(n log n) — that is one of the two log factors. The sweep itself processes n events; for each one, the algorithm performs O(log n) operations on the active-set BST (insert + at most a constant number of range queries by the packing argument). So the sweep itself is Θ(n · log n) = Θ(n log n). Adding the two phases gives Θ(n log n) total. The packing argument (≤ 7 candidates per insertion) is what keeps the candidate-check cost bounded — without it, we could not amortize to log n per point.'
            }
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Self-grading protocol',
          text: 'Try each problem on paper first. Only then click "Show solution" on the corresponding card to compare. If your reasoning differs from the model answer in any non-trivial way, mark that exercise and revisit it tomorrow.'
        },
        {
          type: 'heading',
          text: 'Common pitfalls — what graders see most often',
          level: 2
        },
        {
          type: 'table',
          caption: 'Mistakes to avoid in the Unit 1 review',
          columns: ['Mistake', 'Why it costs marks', 'How to fix'],
          rows: [
            ['Stating O(...) when Θ(...) is required',  'Loose bounds are technically true but lose tightness marks.', 'After every Big-O, ask: can I also prove Big-Ω?'],
            ['Tracing one example as a "correctness proof"', 'A trace demonstrates one input; correctness needs an argument over all inputs.', 'Always reach for the loop invariant.'],
            ['Forgetting "permutation" in the insertion-sort invariant', 'The proof appears to succeed on a buggy implementation that loses elements.', 'Add the permutation clause explicitly.'],
            ['Reporting average without naming a distribution', 'Average is undefined without a probability model.', 'Either state the input distribution or default to worst case.'],
            ['Counting only the loop body, not the loop test', 'Loop tests typically run n+1 times; missing them gives constants that are off by 1.', 'Always include the test in the line-by-line cost table.'],
            ['"O(n log n) is faster than O(n)" because of constants', 'For all sufficiently large n, fewer ops > more ops.', 'Asymptotic class wins eventually; do not over-trust constants.']
          ]
        },
        {
          type: 'heading',
          text: 'How to review Unit 1',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Reproduce the cheat-sheet table on a blank page from memory. If you cannot, the gap tells you which lesson to revisit.',
            'For one specific algorithm of your choice (e.g. LINEAR-MIN), write the pseudocode, the line-by-line cost table, the invariant, the three-step proof, and the asymptotic bounds — all on one page, all in 10 minutes.',
            'Practice the easy exercises until you can finish all six in under 4 minutes.',
            'Practice the medium exercises with full proofs in roughly 30 minutes total.',
            'Use the hard exercises as the timed challenge: 90 minutes, no notes, then self-grade against the solutions.',
            'Replay the L3 (insertion sort) and L7 (sweep line) interactive widgets at least once to lock the visual memory of the algorithms.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Closing thought',
          text: 'Unit 1 gave you the language: pseudocode, RAM, asymptotic notation, invariants, the four cases. Unit 2 puts that language to work on recurrence relations — the technique that lets you analyze divide-and-conquer algorithms like merge sort, quicksort, and the closest-pair recursion mentioned in L7.'
        }
      ],
      content: [
        block('Mix the techniques you have learned: count operations, classify them with asymptotic notation, and prove correctness with loop invariants.'),
        tip('Try every exercise on paper before peeking at any solution. Many avoidable mistakes come from skipping the trace.'),
        example('Example exercise: prove that selection sort is Θ(n²) in both the best and the worst case. (Hint: the inner loop runs (n - i) times regardless of the data.)')
      ],
      practice: [
        // ─── Easy (warm-up — 4 questions) ────────────────────────────────────
        mcq('algods-u1-l8-q1', '[Easy · L1] Which of the following is NOT one of Knuth\'s five properties of an algorithm?',
          ['Finiteness', 'Definiteness', 'Optimality', 'Effectiveness'],
          2, 'Optimality is desirable but not required. The five properties are Finiteness, Definiteness, Input, Output, Effectiveness.'),
        mcq('algods-u1-l8-q2', '[Easy · L5] Pick the correct strict-inequality fact.',
          ['n = o(n log n)', 'n log n = o(n)', 'n² = o(n log n)', 'log n = o(1)'],
          0, 'n grows strictly slower than n log n. The other three reverse the correct direction or compare a growing function to a constant.'),
        mcq('algods-u1-l8-q3', '[Easy · L3] Selection sort makes how many comparisons in the worst case?',
          ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(2ⁿ)'],
          2, 'It always does (n−1) + (n−2) + ... + 1 = n(n−1)/2 = Θ(n²) comparisons regardless of input.'),
        mcq('algods-u1-l8-q4', '[Easy · L6] What is the best-case time of LINEAR-SEARCH(A, v) when v occurs in A?',
          ['Θ(1)', 'Θ(log n)', 'Θ(n)', 'Θ(n²)'],
          0, 'The best case is v at A[1]: one comparison and the procedure returns. Therefore Θ(1).'),

        // ─── Medium — 5 questions ────────────────────────────────────────────
        mcq('algods-u1-l8-q5', '[Medium · L5] Which is the tightest description of f(n) = n³/1000 − 100·n² − 100·n + 3?',
          ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(n³)'],
          3, 'The leading n³/1000 term dominates for large n; constants and lower-order terms vanish. f = Θ(n³).'),
        mcq('algods-u1-l8-q6', '[Medium · L4] Which is the strongest correct invariant for INSERTION-SORT?',
          ['"A[1..j-1] is sorted."',
           '"A[1..j-1] is sorted and is a permutation of the original A[1..j-1]."',
           '"A is a permutation of the input."',
           '"A[1..n] is sorted."'],
          1, 'Sortedness alone allows a buggy implementation that loses elements. The permutation clause is necessary; the postcondition (option 4) is too strong as an invariant.'),
        mcq('algods-u1-l8-q7', '[Medium · L2] A loop runs i = 1..n with an inner loop j = i..n doing constant work. The total number of inner-loop body executions is:',
          ['n', 'n − 1', 'n(n+1)/2', 'n²'],
          2, 'Σ_{i=1..n} (n − i + 1) = n + (n−1) + ... + 1 = n(n+1)/2.'),
        mcq('algods-u1-l8-q8', '[Medium · L6] When is "expected time" the right metric instead of "worst-case time"?',
          ['When the algorithm is recursive.',
           'When the algorithm uses randomness, or when the problem comes with an explicit input distribution.',
           'When the algorithm runs in linear time.',
           'When the input is sorted.'],
          1, 'Expected time meaningfully averages over either algorithm-randomness or a stated input distribution. Without one of those, "expected" is undefined.'),
        mcq('algods-u1-l8-q9', '[Medium · L5] Which statement is true?',
          ['n² = O(n³) and n³ = O(n²)',
           'n² = O(n³) but n³ ≠ O(n²)',
           'Neither is in O of the other',
           '2ⁿ = O(n²)'],
          1, 'n² grows slower than n³, so n² = O(n³). The reverse fails because n³/n² = n → ∞.'),

        // ─── Hard — 4 questions ──────────────────────────────────────────────
        mcq('algods-u1-l8-q10', '[Hard · L5] Which of the following is true?',
          ['2ⁿ⁺¹ = O(2ⁿ) AND 2²ⁿ = O(2ⁿ)',
           '2ⁿ⁺¹ = O(2ⁿ) but 2²ⁿ ≠ O(2ⁿ)',
           '2²ⁿ = O(2ⁿ) but 2ⁿ⁺¹ ≠ O(2ⁿ)',
           'Neither is in O(2ⁿ)'],
          1, '2ⁿ⁺¹ = 2·2ⁿ, so it is O(2ⁿ) with c = 2. But 2²ⁿ / 2ⁿ = 2ⁿ → ∞, so 2²ⁿ is NOT O(2ⁿ).'),
        mcq('algods-u1-l8-q11', '[Hard · L3 + L6] Insertion sort\'s tighter time bound is Θ(n + I), where I is the number of inversions. The number of inversions in [4, 1, 5, 2, 6, 3] is:',
          ['3', '5', '6', '15'],
          2, 'Inverted pairs: (4,1), (4,2), (4,3), (5,2), (5,3), (6,3). Count = 6.'),
        mcq('algods-u1-l8-q12', '[Hard · L5 hierarchy] Which is the correct ordering from slowest to fastest growth?',
          ['log log n < n¹⁄ˡᵒᵍ ⁿ < n < (3/2)ⁿ < n!',
           'log log n < n < n¹⁄ˡᵒᵍ ⁿ < n! < (3/2)ⁿ',
           'n¹⁄ˡᵒᵍ ⁿ < log log n < n < (3/2)ⁿ < n!',
           '(3/2)ⁿ < n < n! < n¹⁄ˡᵒᵍ ⁿ < log log n'],
          0, 'n¹⁄ˡᵒᵍ ⁿ = 2 (a constant), which beats log log n (→ ∞) but is dominated by every nᶜ with c > 0; n < (3/2)ⁿ by the polynomial-vs-exponential rule; (3/2)ⁿ < n! by Stirling.'),
        mcq('algods-u1-l8-q13', '[Hard · L7] In plane-sweep closest pair, the per-point cost is O(log n) because:',
          ['The active set is reset every iteration.',
           'A balanced BST gives O(log n) insert + the packing argument bounds candidate distance-checks by a constant.',
           'Distances are computed in constant time using a hash table.',
           'Sorting alone makes the rest free.'],
          1, 'The two ingredients of the Θ(n log n) bound are: O(log n) BST updates per point and the geometric packing argument (≤ 7 candidates per insertion) that keeps distance checks constant.')
      ]
    }
  ]
};

u1.lessons.forEach((lesson, lessonIndex) => {
  let diagramIndex = 0;
  lesson.richContent?.forEach((blockItem) => {
    if (blockItem.type !== 'diagram') {
      return;
    }
    const replacementSvg = unit1CleanDiagramSvgs[lessonIndex]?.[diagramIndex];
    if (replacementSvg) {
      blockItem.svg = replacementSvg;
    }
    diagramIndex += 1;
  });
});

const u2 = {
  id: 'algods-u2',
  title: 'Recurrences',
  summary: 'Solve T(n) recurrences with iteration, recursion trees, substitution, variable transformation, and the Master theorem.',
  lessons: [
    // ═══════════════════════════════════════════════════════════════════════
    // L1 — The Iteration Method
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'The iteration method',
      durationMinutes: 30,
      type: 'video',
      summary: 'Unfold a recurrence by hand to a closed form.',
      richContent: [
        // ── 1. Big picture ──────────────────────────────────────────────
        {
          type: 'heading',
          text: 'What does "solving a recurrence" mean?',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A recurrence relation defines T(n) in terms of T on smaller inputs. "Solving" it means finding a closed-form expression — one that involves only n and constants, with no recursive reference to T — and showing that it is asymptotically equivalent. The iteration method is the most mechanical approach: substitute the recurrence into itself repeatedly, identify the resulting sum, and evaluate it.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Why this matters',
          text: 'Every divide-and-conquer algorithm produces a recurrence. Solving it is how you turn "T(n) = 2 T(n/2) + n" into "merge sort is Θ(n log n)". Iteration is the first tool in your kit.'
        },
        // ── 2. The mechanical procedure ─────────────────────────────────
        {
          type: 'heading',
          text: 'The unrolling procedure',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Start with the recurrence T(n) = (recursive part) + (non-recursive cost).',
            'Replace the T(...) on the right-hand side using the same recurrence.',
            'Repeat until you reach the base case T(1) or T(0).',
            'Collect the non-recursive costs into a single sum over all levels.',
            'Evaluate the sum using a known series identity (arithmetic, geometric, etc.).',
            'State the result in Θ-notation.'
          ]
        },
        // ── 3. Worked example 1 ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Worked example 1: T(n) = T(n − 1) + n',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'This recurrence arises from algorithms that do n work, then recurse on a problem of size n − 1 (for example, selection sort or naive polynomial evaluation).'
        },
        {
          type: 'code',
          title: 'Unrolling step by step',
          code: 'T(n) = T(n-1) + n\n     = T(n-2) + (n-1) + n\n     = T(n-3) + (n-2) + (n-1) + n\n     ...\n     = T(1) + 2 + 3 + ... + (n-1) + n\n     = c  + sum from k=2 to n of k\n     = 1 + 2 + 3 + ... + n   (absorbing the base-case constant)\n     = n(n+1)/2'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\sum_{k=1}^{n} k = \\frac{n(n+1)}{2} = \\Theta(n^{2})',
          display: true,
          caption: 'The arithmetic series gives a quadratic closed form.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Useful shortcut',
          text: 'Whenever unrolling produces 1 + 2 + ... + n, the answer is Θ(n²). Memorize this series identity — it appears constantly.'
        },
        // ── 4. Worked example 2 ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Worked example 2: T(n) = 2 T(n/2) + 1',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'This recurrence appears when a divide-and-conquer algorithm splits the problem in half but does only constant work at each level (for example, counting nodes in a balanced binary tree).'
        },
        {
          type: 'code',
          title: 'Unrolling',
          code: 'T(n) = 2 T(n/2) + 1\n     = 2 [2 T(n/4) + 1] + 1         = 4 T(n/4) + 2 + 1\n     = 4 [2 T(n/8) + 1] + 2 + 1     = 8 T(n/8) + 4 + 2 + 1\n     ...\nAfter i steps:  T(n) = 2ⁱ T(n/2ⁱ) + (2ⁱ - 1)\nBase case at n/2ⁱ = 1  =>  i = lg n\n     T(n) = n * T(1) + (n - 1) = n * c + n - 1'
        },
        {
          type: 'formula',
          latex: 'T(n) = n \\cdot T(1) + (n - 1) = \\Theta(n)',
          display: true,
          caption: 'The geometric series 1 + 2 + 4 + ... + n/2 = n − 1 gives a linear closed form.'
        },
        // ── 5. Worked example 3 ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Worked example 3: T(n) = T(n − 1) + n²',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Same structure as example 1, but the per-level cost is quadratic instead of linear.'
        },
        {
          type: 'code',
          title: 'Unrolling',
          code: 'T(n) = T(n-1) + n²\n     = T(n-2) + (n-1)² + n²\n     ...\n     = T(1) + 2² + 3² + ... + n²\n     = sum from k=1 to n of k²\n     = n(n+1)(2n+1)/6'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\sum_{k=1}^{n} k^{2} = \\frac{n(n+1)(2n+1)}{6} = \\Theta(n^{3})',
          display: true,
          caption: 'The sum of squares gives a cubic closed form.'
        },
        // ── 6. Pattern table ────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Common recurrence patterns',
          level: 2
        },
        {
          type: 'table',
          caption: 'Recurrences you can solve by inspection after memorizing the series.',
          columns: ['Recurrence', 'Unrolled sum', 'Closed form'],
          rows: [
            ['T(n) = T(n−1) + c',     'c + c + ... + c  (n terms)',     'Θ(n)'],
            ['T(n) = T(n−1) + n',     '1 + 2 + ... + n',                'Θ(n²)'],
            ['T(n) = T(n−1) + n²',    '1² + 2² + ... + n²',            'Θ(n³)'],
            ['T(n) = T(n−1) + nᵏ',    '1ᵏ + 2ᵏ + ... + nᵏ',            'Θ(nᵏ⁺¹)'],
            ['T(n) = 2 T(n/2) + 1',   '1 + 2 + 4 + ... + n',           'Θ(n)'],
            ['T(n) = 2 T(n/2) + n',   'n + n + ... + n  (log n terms)', 'Θ(n log n)'],
            ['T(n) = 2 T(n/2) + n²',  'n² + n²/2 + n²/4 + ...',        'Θ(n²)'],
            ['T(n) = 3 T(n/3) + n',   'n + n + ... + n  (log₃ n terms)','Θ(n log n)'],
            ['T(n) = T(n/2) + 1',     '1 + 1 + ... + 1  (log n terms)', 'Θ(log n)']
          ]
        },
        // ── 7. Common pitfalls ──────────────────────────────────────────
        {
          type: 'heading',
          text: 'Common pitfalls',
          level: 2
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Watch out for these mistakes',
          text: '(1) Forgetting the base case: the constant T(1) vanishes inside Θ but you must include it to get the algebra right. (2) Mis-identifying the series: 1 + 2 + 4 + ... + 2ᵏ is geometric (sum = 2ᵏ⁺¹ − 1), not arithmetic. (3) Confusing the number of levels with the cost per level: for T(n) = 2T(n/2) + n there are log n levels, but the cost per level is n, not log n.'
        },
        // ── 8. Exercises ────────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Exercises',
          level: 2
        },
        {
          type: 'interactive',
          artifact: 'iteration-unroller-lab'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u2l1-E1',
              source: 'L1 · unrolling',
              question: 'Solve T(n) = T(n − 1) + 5 with T(1) = 5 by iteration.',
              solution: 'Unroll: T(n) = T(n−1) + 5 = T(n−2) + 5 + 5 = ... = T(1) + 5(n−1) = 5 + 5(n−1) = 5n. So T(n) = Θ(n).'
            },
            {
              id: 'u2l1-E2',
              source: 'L1 · series',
              question: 'Identify the sum that results from unrolling T(n) = T(n − 1) + 3n, and give the Θ-class.',
              solution: 'Unrolling gives 3·1 + 3·2 + ... + 3n = 3 · n(n+1)/2 = Θ(n²). The factor 3 disappears inside Θ.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u2l1-M1',
              source: 'L1 · divide-and-conquer',
              question: 'Solve T(n) = 4 T(n/2) + n by iteration. Show the per-level cost, count the levels, and identify the dominating term.',
              solution: 'Level 0: cost n. Level 1: 4 · (n/2) = 2n. Level 2: 16 · (n/4) = 4n. Level i: 2ⁱ · n. There are log₂ n levels. The costs form a geometric series n(1 + 2 + 4 + ... + 2^{log n − 1}) = n(n − 1) = Θ(n²). The last level (the leaves) dominates. T(n) = Θ(n²).'
            },
            {
              id: 'u2l1-M2',
              source: 'L1 · sum of cubes',
              question: 'Solve T(n) = T(n − 1) + n³ with T(1) = 1 and express the answer in Θ-notation.',
              solution: 'Unrolling gives 1³ + 2³ + ... + n³ = [n(n+1)/2]² = Θ(n⁴). The sum of cubes equals the square of the arithmetic series.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'expand T(n) -> T(n-1) -> T(n-2) -> ... until you spot the pattern.',
        problem: 'given a recurrence, find a non-recursive Θ-form for it.',
        intuition: 'unrolling reveals a sum that is often a familiar series.',
        formal: 'replace T(n-1) recursively until the base case appears; collect the work into a sum.',
        algorithm: '1. Substitute T(n-1) into T(n). 2. Repeat. 3. Identify the pattern in the unrolled sum.',
        worked: 'T(n) = T(n-1) + n unrolls to n + (n-1) + ... + 1 = n(n+1)/2 = Θ(n²).',
        correctness: 'each substitution is just algebra; spotting the closed form is the only "creative" step.',
        complexity: 'works whenever the recurrence has small additive structure.',
        trace: 'unroll T(n) = 2 T(n/2) + 1 fully and find its closed form.',
        takeaways: 'use iteration as a sanity check; for divide-and-conquer recurrences prefer recursion trees.',
        practice: 'apply iteration to T(n) = T(n-1) + n².'
      }),
      practice: [
        mcq('algods-u2-l1-q1', 'T(n) = T(n-1) + n unrolls to which sum?',
          ['n', '1 + 2 + ... + n', 'n²', '2ⁿ'],
          1, 'Each unrolling adds one extra term equal to the current n; the total is the standard arithmetic series.'),
        mcq('algods-u2-l1-q2', 'What is the closed form of T(n) = 2 T(n/2) + 1 with T(1) = 1?',
          ['Θ(log n)', 'Θ(n)', 'Θ(n log n)', 'Θ(n²)'],
          1, 'Unrolling gives a geometric series 1 + 2 + 4 + ... + n/2 = n − 1, plus n · T(1) = n. Total is Θ(n).')
      ]
    },
    // ═══════════════════════════════════════════════════════════════════════
    // L2 — The Recursion-Tree Method
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'The recursion-tree method',
      durationMinutes: 35,
      type: 'interactive',
      summary: 'Draw the call tree and sum the work per level.',
      richContent: [
        // ── 1. Visual idea ──────────────────────────────────────────────
        {
          type: 'heading',
          text: 'The visual idea',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A recursion tree turns the recurrence T(n) = a T(n/b) + f(n) into a picture. The root represents the original problem of size n, whose non-recursive cost is f(n). It has a children, each representing a subproblem of size n/b. The tree continues until subproblems reach the base case (size 1). Each node "pays" a cost equal to f applied to its subproblem size, and the total cost is the sum of all nodes.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Key insight',
          text: 'Instead of summing node-by-node, sum level-by-level. At level i there are aⁱ nodes, each doing f(n/bⁱ) work. The total cost is the sum over all levels.'
        },
        // ── 2. Per-level cost formula ───────────────────────────────────
        {
          type: 'heading',
          text: 'Per-level cost formula',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\text{Level } i: \\quad a^{i} \\cdot f\\!\\left(\\frac{n}{b^{i}}\\right), \\quad i = 0, 1, \\ldots, \\log_b n',
          display: true,
          caption: 'At level i the tree has aⁱ nodes, each working on a subproblem of size n/bⁱ.'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\sum_{i=0}^{\\log_b n} a^{i} \\cdot f\\!\\left(\\frac{n}{b^{i}}\\right) + \\Theta(n^{\\log_b a})',
          display: true,
          caption: 'Total cost = internal-node work + leaf cost. The number of leaves is n^{log_b a}.'
        },
        // ── 3. Three patterns ───────────────────────────────────────────
        {
          type: 'heading',
          text: 'Three patterns that emerge',
          level: 2
        },
        {
          type: 'table',
          caption: 'Which part of the tree dominates?',
          columns: ['Pattern', 'Per-level cost trend', 'Who dominates?', 'Result'],
          rows: [
            ['Uniform',    'Same at every level',  'All levels equally',  'Θ(f(n) · log n)'],
            ['Root-heavy', 'Decreasing geometrically', 'Root (level 0)', 'Θ(f(n))'],
            ['Leaf-heavy', 'Increasing geometrically', 'Leaves (last level)', 'Θ(n^{log_b a})']
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quick check',
          text: 'Compare level 0 cost f(n) with level 1 cost a · f(n/b). If they are equal, the pattern is uniform. If level 0 is larger, root-heavy. If level 1 is larger, leaf-heavy. This ratio stays the same at every adjacent pair.'
        },
        // ── 4. Merge-sort recursion tree diagram ────────────────────────
        {
          type: 'heading',
          text: 'Visual: merge sort recursion tree',
          level: 2
        },
        {
          type: 'diagram',
          title: 'T(n) = 2 T(n/2) + n — uniform pattern',
          caption: 'Each level contributes exactly n total work. There are log₂ n levels, so T(n) = Θ(n log n).',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 820 340" role="img" aria-label="Merge sort recursion tree">
  <defs>
    <marker id="rt-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="796" height="316" rx="20" fill="#f8f7ff" stroke="#d8e1ec"/>
  <text x="410" y="38" text-anchor="middle" font-size="15" font-weight="800" fill="#0f2038">Recursion tree for T(n) = 2T(n/2) + n</text>

  <!-- Level 0 -->
  <rect x="340" y="56" width="140" height="36" rx="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
  <text x="410" y="80" text-anchor="middle" font-size="14" font-weight="700" fill="#0f2038">n</text>
  <text x="710" y="80" text-anchor="middle" font-size="13" fill="#7c3aed" font-weight="700">cost = n</text>

  <!-- edges L0→L1 -->
  <line x1="375" y1="92" x2="240" y2="126" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="445" y1="92" x2="580" y2="126" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- Level 1 -->
  <rect x="170" y="126" width="140" height="36" rx="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
  <text x="240" y="150" text-anchor="middle" font-size="14" font-weight="700" fill="#0f2038">n/2</text>
  <rect x="510" y="126" width="140" height="36" rx="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
  <text x="580" y="150" text-anchor="middle" font-size="14" font-weight="700" fill="#0f2038">n/2</text>
  <text x="710" y="150" text-anchor="middle" font-size="13" fill="#7c3aed" font-weight="700">cost = n</text>

  <!-- edges L1→L2 -->
  <line x1="205" y1="162" x2="145" y2="196" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="275" y1="162" x2="335" y2="196" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="545" y1="162" x2="485" y2="196" stroke="#94a3b8" stroke-width="1.5"/>
  <line x1="615" y1="162" x2="675" y2="196" stroke="#94a3b8" stroke-width="1.5"/>

  <!-- Level 2 -->
  <rect x="100" y="196" width="90" height="32" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="145" y="217" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">n/4</text>
  <rect x="290" y="196" width="90" height="32" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="335" y="217" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">n/4</text>
  <rect x="440" y="196" width="90" height="32" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="485" y="217" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">n/4</text>
  <rect x="630" y="196" width="90" height="32" rx="8" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.5"/>
  <text x="675" y="217" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">n/4</text>
  <text x="710" y="250" text-anchor="middle" font-size="13" fill="#7c3aed" font-weight="700">cost = n</text>

  <!-- dots -->
  <text x="410" y="260" text-anchor="middle" font-size="20" fill="#475569">⋮</text>

  <!-- leaves -->
  <text x="410" y="290" text-anchor="middle" font-size="13" fill="#475569">n leaves, each cost Θ(1)</text>
  <text x="710" y="290" text-anchor="middle" font-size="13" fill="#7c3aed" font-weight="700">cost = n</text>

  <!-- summary -->
  <text x="410" y="320" text-anchor="middle" font-size="14" font-weight="700" fill="#0f2038">log₂ n levels × n per level = Θ(n log n)</text>
</svg>`
        },
        // ── 5. Interactive ──────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Try it yourself',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Use the interactive recursion-tree builder below. Enter any recurrence of the form T(n) = a T(n/b) + f(n) and watch the tree expand level by level, with per-level costs annotated on the right.'
        },
        { type: 'interactive', artifact: 'recursion-tree-builder' },
        // ── 6. Worked example: T(n) = 3T(n/4) + cn² ────────────────────
        {
          type: 'heading',
          text: 'Worked example: T(n) = 3 T(n/4) + cn²',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'This is a root-heavy recurrence. At each level the per-level cost shrinks geometrically.'
        },
        {
          type: 'code',
          title: 'Level-by-level costs',
          code: 'Level 0:  1 node  × c·n²           = c·n²\nLevel 1:  3 nodes × c·(n/4)²        = 3·c·n²/16 = (3/16)·c·n²\nLevel 2:  9 nodes × c·(n/16)²       = 9·c·n²/256 = (3/16)²·c·n²\n...\nLevel i:  3ⁱ nodes × c·(n/4ⁱ)²     = (3/16)ⁱ · c·n²\n\nTotal internal cost = c·n² · Σ (3/16)ⁱ from i=0 to log₄ n\n                    = c·n² · 1/(1 - 3/16)        [geometric series, ratio < 1]\n                    = c·n² · 16/13\n                    = Θ(n²)'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(n^{2})',
          display: true,
          caption: 'The root dominates because the per-level costs form a convergent geometric series with ratio 3/16 < 1.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Root-heavy indicator',
          text: 'If the ratio of level-(i+1) cost to level-i cost is a/b² < 1 (for f(n) = n²), the root dominates and T(n) = Θ(f(n)).'
        },
        // ── 7. Comparison table ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Pattern comparison',
          level: 2
        },
        {
          type: 'table',
          caption: 'Three classic recurrences and their tree patterns.',
          columns: ['Recurrence', 'a', 'b', 'f(n)', 'Per-level ratio', 'Pattern', 'Result'],
          rows: [
            ['T(n) = 2T(n/2) + n',    '2', '2', 'n',   '2·(1/2) = 1', 'Uniform',    'Θ(n log n)'],
            ['T(n) = 3T(n/4) + n²',   '3', '4', 'n²',  '3/16 < 1',    'Root-heavy', 'Θ(n²)'],
            ['T(n) = 4T(n/2) + n',    '4', '2', 'n',   '4·(1/2) = 2', 'Leaf-heavy', 'Θ(n²)'],
            ['T(n) = 7T(n/2) + n²',   '7', '2', 'n²',  '7/4 > 1',     'Leaf-heavy', 'Θ(n^{lg 7})'],
            ['T(n) = T(n/2) + 1',     '1', '2', '1',   '1·1 = 1',     'Uniform',    'Θ(log n)']
          ]
        },
        // ── 8. Exercises ────────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Exercises',
          level: 2
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u2l2-E1',
              source: 'L2 · level cost',
              question: 'For T(n) = 3 T(n/3) + n, what is the total cost at level 1 of the recursion tree?',
              solution: '3 nodes each doing n/3 work = 3 · (n/3) = n. The per-level cost is uniform.'
            },
            {
              id: 'u2l2-E2',
              source: 'L2 · tree depth',
              question: 'How many levels does the recursion tree for T(n) = 2 T(n/4) + 1 have?',
              solution: 'The subproblem size at level i is n/4ⁱ. Base case when n/4ⁱ = 1, so i = log₄ n. The tree has log₄ n + 1 levels (including level 0).'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u2l2-M1',
              source: 'L2 · leaf-heavy',
              question: 'Use a recursion tree to solve T(n) = 4 T(n/2) + n. Show the per-level cost at levels 0, 1, 2 and identify the pattern.',
              solution: 'Level 0: n. Level 1: 4·(n/2) = 2n. Level 2: 16·(n/4) = 4n. Level i: 2ⁱ·n. The costs double each level (ratio = 2 > 1), so the tree is leaf-heavy. Number of leaves = 4^{log₂ n} = n². Total ≈ Θ(n²).'
            },
            {
              id: 'u2l2-M2',
              source: 'L2 · Strassen',
              question: 'Draw (or describe) the recursion tree for Strassen: T(n) = 7 T(n/2) + Θ(n²). Compute the per-level ratio and determine whether the tree is root-heavy, uniform, or leaf-heavy.',
              solution: 'Level 0 cost: cn². Level 1 cost: 7·c·(n/2)² = (7/4)·cn². Ratio = 7/4 > 1, so the costs increase. The tree is leaf-heavy. Number of leaves = 7^{log₂ n} = n^{lg 7} ≈ n^{2.81}. Therefore T(n) = Θ(n^{lg 7}).'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'visualise the work of a divide-and-conquer recurrence and sum it level by level.',
        problem: 'how much work does T(n) = a T(n/b) + f(n) actually do?',
        intuition: 'each node is a subproblem; root work is f(n); level i has aⁱ nodes each of size n/bⁱ.',
        formal: 'total work = sum over levels i of aⁱ * f(n/bⁱ).',
        algorithm: 'compute work per level, multiply by number of nodes, sum across log_b n levels.',
        worked: 'merge sort: T(n) = 2 T(n/2) + n. Each level has total work n; there are log_2 n levels => Θ(n log n).',
        correctness: 'the tree is a faithful expansion of the recurrence; summing gives an exact count up to constants.',
        complexity: 'works for any recurrence you can draw; especially intuitive when work per level is uniform.',
        trace: 'draw the tree for T(n) = 3 T(n/2) + n² and sum.',
        takeaways: 'level work pattern dictates the answer; uniform => n*levels, geometric => leaves dominate or root dominates.',
        practice: 'derive Θ(nˡᵍ ⁷) for Strassen via the tree of T(n) = 7 T(n/2) + Θ(n²).'
      }),
      practice: [
        mcq('algods-u2-l2-q1', 'For T(n) = 2 T(n/2) + n, what dominates the total work?',
          ['The root.', 'The leaves.', 'Every level contributes the same total work.', 'No level dominates; the sum is geometric.'],
          2, 'Each level does n total work, and there are log n levels: Θ(n log n).'),
        mcq('algods-u2-l2-q2', 'For T(n) = 3 T(n/4) + cn², the recursion tree is:',
          ['Leaf-heavy: leaves dominate.', 'Root-heavy: the root level dominates.', 'Uniform: each level does the same work.', 'Cannot be determined without knowing c.'],
          1, 'The per-level ratio is 3/16 < 1, so costs shrink geometrically. The root (level 0) dominates. T(n) = Θ(n²).'),
        mcq('algods-u2-l2-q3', 'How many leaves does the recursion tree for T(n) = a T(n/b) + f(n) have?',
          ['log_b n', 'a · log_b n', 'n^{log_b a}', 'aⁿ'],
          2, 'The tree has log_b n levels, and the number of nodes multiplies by a at each level: a^{log_b n} = n^{log_b a}.')
      ]
    },
    // ═══════════════════════════════════════════════════════════════════════
    // L3 — The Substitution Method
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'The substitution method',
      durationMinutes: 30,
      type: 'video',
      summary: 'Guess a bound, then prove it by induction. Includes the lower-order trick.',
      richContent: [
        // ── 1. Big picture ──────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Guess and verify by induction',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The substitution method has two steps: (1) guess the form of the solution, and (2) use mathematical induction to prove that the guess is correct. The guess often comes from a recursion tree or from experience with similar recurrences. The proof is where the rigor lives.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'When to use substitution',
          text: 'Use substitution when you need a formal proof — for example, when the recursion tree gave you a guess but a formal solution requires a proof by induction, or when the Master theorem does not apply.'
        },
        // ── 2. The method step by step ──────────────────────────────────
        {
          type: 'heading',
          text: 'Step-by-step procedure',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Guess that T(n) ≤ c · g(n) for some function g and constant c > 0.',
            'Assume the inductive hypothesis: T(k) ≤ c · g(k) for all k < n.',
            'Substitute the IH into the recurrence and simplify.',
            'Show that the result is ≤ c · g(n) for a suitable choice of c.',
            'Verify the base case: T(n₀) ≤ c · g(n₀).'
          ]
        },
        // ── 3. Worked example 1 ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Worked example: T(n) = 2T(⌊n/2⌋) + n, prove O(n log n)',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Guess: T(n) ≤ c · n · lg n for some constant c > 0.'
        },
        {
          type: 'code',
          title: 'Inductive step',
          code: 'Assume T(⌊n/2⌋) ≤ c · ⌊n/2⌋ · lg(⌊n/2⌋).\n\nT(n) = 2 T(⌊n/2⌋) + n\n     ≤ 2 · c · (n/2) · lg(n/2) + n\n     = c · n · (lg n − 1) + n\n     = c · n · lg n − c · n + n\n     = c · n · lg n − (c − 1) · n\n     ≤ c · n · lg n          [holds when c ≥ 1]'
        },
        {
          type: 'formula',
          latex: 'T(n) le c \\cdot n \\cdot \\lg n - (c - 1) \\cdot n le c \\cdot n \\cdot \\lg n',
          display: true,
          caption: 'The residual −(c − 1)n is negative for c ≥ 1, which completes the inductive step.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Base case caveat',
          text: 'T(1) = c₀ but c · 1 · lg 1 = 0. The bound fails at n = 1! Fix: choose n₀ = 2 as the base case instead, and pick c large enough that T(2) ≤ c · 2 · lg 2 = 2c. This is a standard move.'
        },
        // ── 4. The lower-order trick ────────────────────────────────────
        {
          type: 'heading',
          text: 'The lower-order trick',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Sometimes the naive guess "T(n) ≤ c · g(n)" almost works but leaves a residual additive term. The fix is to strengthen the inductive hypothesis by subtracting a lower-order term.'
        },
        {
          type: 'paragraph',
          text: 'For example, suppose you try to prove T(n) = 2T(n/2) + 1 ≤ cn and get T(n) ≤ cn + 1. The +1 breaks the proof. Instead, guess T(n) ≤ cn − d for a constant d. Then T(n) ≤ 2(c(n/2) − d) + 1 = cn − 2d + 1 ≤ cn − d when d ≥ 1. The subtracted term absorbs the residual.'
        },
        {
          type: 'formula',
          latex: 'text{Strengthened IH: } T(n) le c \\cdot g(n) - d \\cdot h(n)',
          display: true,
          caption: 'The trick: subtract a lower-order term d · h(n) to absorb the residual from the inductive step.'
        },
        // ── 5. Another example ──────────────────────────────────────────
        {
          type: 'heading',
          text: 'Worked example: T(n) = T(n − 1) + n, prove O(n²)',
          level: 2
        },
        {
          type: 'code',
          title: 'Inductive step',
          code: 'Guess: T(n) ≤ c · n².\nAssume T(n-1) ≤ c · (n-1)².\n\nT(n) = T(n-1) + n\n     ≤ c(n-1)² + n\n     = cn² − 2cn + c + n\n     = cn² − (2c − 1)n + c\n     ≤ cn²          [holds when (2c − 1)n ≥ c, i.e. n ≥ c/(2c − 1)]\n\nFor c = 1: need n ≥ 1.  ✓\nBase case: T(1) = Θ(1) ≤ c · 1² for large enough c.  ✓'
        },
        // ── 6. Common pitfalls ──────────────────────────────────────────
        {
          type: 'heading',
          text: 'Common pitfalls',
          level: 2
        },
        {
          type: 'table',
          caption: 'Mistakes students make with the substitution method.',
          columns: ['Pitfall', 'What goes wrong', 'Fix'],
          rows: [
            ['Wrong constant', 'Choosing c too small so the base case fails.', 'Pick c last, after the inductive step determines the constraint.'],
            ['Too-weak IH', '"T(n) ≤ cn" for a recurrence that is n log n.', 'Use a recursion tree first to get the right asymptotic form.'],
            ['Ignoring base cases', 'T(1) = 1 but c · g(1) = 0.', 'Start induction at n₀ = 2 or n₀ = 3 and absorb small cases into c.'],
            ['Dropping the wrong sign', 'Writing ≤ cn lg n + n and claiming the proof works.', 'You need ≤ cn lg n, not ≤ cn lg n + (positive term). The residual must be ≤ 0.'],
            ['Circular reasoning', 'Assuming what you want to prove for T(n) instead of T(smaller).', 'The IH is only on k < n. Substitute it into T(n) via the recurrence.']
          ]
        },
        // ── 7. Exercises ────────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Exercises',
          level: 2
        },
        {
          type: 'interactive',
          artifact: 'substitution-proof-lab'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u2l3-E1',
              source: 'L3 · setup',
              question: 'State the inductive hypothesis for proving T(n) = 3T(n/3) + n is O(n log n). What must the inductive step show?',
              solution: 'IH: Assume T(k) ≤ ck lg k for all k < n. The inductive step must show T(n) = 3T(n/3) + n ≤ cn lg n. Substituting: 3·c(n/3)lg(n/3) + n = cn lg(n/3) + n = cn lg n − cn lg 3 + n ≤ cn lg n when c ≥ 1/lg 3.'
            },
            {
              id: 'u2l3-E2',
              source: 'L3 · base case',
              question: 'Why does the proof T(n) ≤ cn lg n fail at n = 1, and how do you fix it?',
              solution: 'At n = 1, cn lg 1 = 0, but T(1) > 0. Fix: start the induction at n₀ = 2 and choose c large enough so that T(2) ≤ 2c lg 2 = 2c.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u2l3-M1',
              source: 'L3 · lower-order trick',
              question: 'Prove T(n) = 2T(n/2) + 1 = O(n) using the lower-order trick. Show that the naive guess T(n) ≤ cn fails, then fix it.',
              solution: 'Naive: T(n) ≤ 2·c(n/2) + 1 = cn + 1. This is NOT ≤ cn. Fix: guess T(n) ≤ cn − d. Then T(n) ≤ 2(c(n/2) − d) + 1 = cn − 2d + 1 ≤ cn − d when d ≥ 1. Pick d = 1, any c ≥ 1 covering the base case.'
            },
            {
              id: 'u2l3-M2',
              source: 'L3 · unequal split',
              question: 'Use substitution to prove T(n) = T(n/3) + T(2n/3) + n is O(n log n). Where does the constant lg(3/2) appear?',
              solution: 'Guess T(n) ≤ cn lg n. IH: T(n/3) ≤ c(n/3)lg(n/3), T(2n/3) ≤ c(2n/3)lg(2n/3). Sum: c(n/3)(lg n − lg 3) + c(2n/3)(lg n − lg(3/2)) + n = cn lg n − c(n/3)lg 3 − c(2n/3)lg(3/2) + n. The negative terms equal −cn·[lg 3/3 + 2lg(3/2)/3] < 0. For c large enough the −cn(...) absorbs the +n.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'guess T(n) <= c g(n) and prove it by induction.',
        problem: 'we want a clean proof when iteration or recursion trees gave a guess.',
        intuition: 'the inductive step "T(n) <= c g(n)" follows from the recurrence and the IH on smaller inputs.',
        formal: 'show T(n/2) <= c g(n/2) implies T(n) <= c g(n) given T(n) = a T(n/b) + f(n).',
        algorithm: '1. Guess g. 2. Substitute. 3. If the algebra fails by a low-order term, weaken the IH to "c g(n) - low order".',
        worked: 'T(n) = 2 T(n/2) + n. Guess T(n) <= c n log n. Substitute: 2 (c (n/2) log(n/2)) + n = c n log n - c n + n. For c >= 1 this is <= c n log n.',
        correctness: 'the proof is real induction; the lower-order trick is a standard refinement.',
        complexity: 'proves an upper bound; flip inequalities to prove a lower bound.',
        trace: 'try guessing T(n) = O(n log n) for T(n) = T(n/3) + T(2n/3) + n.',
        takeaways: 'when the obvious guess "almost works", subtract a lower-order term inside the IH.',
        practice: 'prove T(n) = T(n-1) + n is O(n²) by substitution.'
      }),
      practice: [
        mcq('algods-u2-l3-q1', 'When the substitution method "almost works" but leaves a residual term, what should you do?',
          ['Pick a different guess g(n).', 'Subtract a lower-order term from the inductive hypothesis.', 'Switch to iteration.', 'Use a tighter big-O constant.'],
          1, 'Strengthening the IH with a -d n term is the textbook trick for absorbing a residual.'),
        mcq('algods-u2-l3-q2', 'To prove T(n) = 2T(⌊n/2⌋) + n = O(n log n), the inductive step shows:',
          ['T(n) ≤ cn log n + n, which is O(n log n).',
           'T(n) ≤ cn log n − (c−1)n ≤ cn log n for c ≥ 1.',
           'T(n) = cn log n exactly.',
           'T(n) ≤ cn² because n log n < n².'],
          1, 'The key step is that the residual −(c−1)n is negative for c ≥ 1, making the inequality tight.')
      ]
    },
    // ═══════════════════════════════════════════════════════════════════════
    // L4 — Variable Transformation
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Variable transformation',
      durationMinutes: 25,
      type: 'video',
      summary: 'Reduce unusual recurrences to standard ones via substitution m = lg n.',
      richContent: [
        // ── 1. When to use ──────────────────────────────────────────────
        {
          type: 'heading',
          text: 'When to use variable transformation',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Some recurrences have subproblem sizes that are not n/b but instead √n, n^{1/3}, or 2^{√(lg n)}. These do not fit the standard divide-and-conquer form directly. The trick is to change the variable so that the recurrence becomes one you already know how to solve.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'The core idea',
          text: 'If the recurrence halves √n at each step, then setting m = lg n converts "halving √n" into "halving m/2" — a standard form. Solve in m-space, then translate back.'
        },
        // ── 2. The m = lg n substitution ────────────────────────────────
        {
          type: 'heading',
          text: 'The m = lg n substitution',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Set m = lg n, so n = 2ᵐ.',
            'Define S(m) = T(2ᵐ) = T(n).',
            'Rewrite the recurrence in terms of S and m.',
            'Solve S(m) using any method (Master theorem, iteration, etc.).',
            'Substitute back: replace m with lg n in the final answer.'
          ]
        },
        {
          type: 'paragraph',
          text: 'The key identity: if the recurrence refers to T(√n), then √n = 2^{m/2}, so T(√n) = T(2^{m/2}) = S(m/2). This is exactly the "divide by 2" pattern.'
        },
        // ── 3. Worked example 1 ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Worked example 1: T(n) = 2 T(√n) + lg n',
          level: 2
        },
        {
          type: 'code',
          title: 'Transformation',
          code: 'Let m = lg n, so n = 2ᵐ and √n = 2 raised to m/2.\nDefine S(m) = T(2ᵐ).\n\nOriginal: T(n) = 2 T(√n) + lg n\nBecomes:  S(m) = 2 S(m/2) + m\n\nThis is the merge-sort recurrence!\nBy Master theorem (a=2, b=2, f(m)=m): case 2 ⟹ S(m) = Θ(m log m).\n\nSubstitute back: m = lg n\nT(n) = Θ(lg n · lg lg n)'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(\\lg n \\cdot \\lg \\lg n)',
          display: true,
          caption: 'The double-log appears because the original recurrence halves the exponent at each step.'
        },
        // ── 4. Worked example 2 ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Worked example 2: T(n) = T(√n) + 1',
          level: 2
        },
        {
          type: 'code',
          title: 'Transformation',
          code: 'Let m = lg n.  S(m) = T(2ᵐ).\n\nOriginal: T(n) = T(√n) + 1\nBecomes:  S(m) = S(m/2) + 1\n\nThis is the binary-search recurrence!\nS(m) = Θ(log m) = Θ(lg m).\n\nSubstitute back: m = lg n\nT(n) = Θ(lg lg n)'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(\\lg \\lg n)',
          display: true,
          caption: 'Each recursive call square-roots n, so the depth is how many times you can take lg before reaching a constant — that is lg lg n.'
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Quick pattern',
          text: 'T(n) = T(√n) + c always gives Θ(lg lg n). T(n) = 2T(√n) + lg n gives Θ(lg n · lg lg n). These two are useful reference patterns, so they are worth memorizing.'
        },
        // ── 5. Exercises ────────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Exercises',
          level: 2
        },
        {
          type: 'interactive',
          artifact: 'variable-transform-lab'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u2l4-E1',
              source: 'L4 · substitution',
              question: 'After substituting m = lg n, what does T(n) = 4 T(√n) + lg²n become?',
              solution: 'S(m) = 4 S(m/2) + m². Now a = 4, b = 2, f(m) = m². log₂ 4 = 2, f(m) = m² = Θ(m²), so case 2 of the Master theorem: S(m) = Θ(m² log m). Back-substitute: T(n) = Θ(lg²n · lg lg n).'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u2l4-M1',
              source: 'L4 · cube root',
              question: 'Solve T(n) = T(n^{1/3}) + 1 by a suitable variable transformation. What is the depth of the recursion?',
              solution: 'Let m = lg n. Then n^{1/3} = 2^{m/3}, so S(m) = S(m/3) + 1. This is a binary-search-like recurrence with base 3: S(m) = Θ(log₃ m) = Θ(lg m). Therefore T(n) = Θ(lg lg n). The depth is log₃(lg n).'
            },
            {
              id: 'u2l4-M2',
              source: 'L4 · harder transform',
              question: 'Solve T(n) = 3 T(√n) + n by transformation. Note: the additive term is n, not lg n.',
              solution: 'Let m = lg n. S(m) = 3 S(m/2) + 2ᵐ. The additive term 2ᵐ grows exponentially in m, which dominates n^{log₂ 3}. By case 3 of Master theorem (with regularity check): S(m) = Θ(2ᵐ). Back-substitute: T(n) = Θ(n).'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'transform the index to turn an awkward recurrence into a standard divide-and-conquer.',
        problem: 'recurrences like T(n) = 2 T(sqrt(n)) + lg n do not fit the Master theorem directly.',
        intuition: 'let m = lg n; rewrite T as a function of m; solve; substitute back.',
        formal: 'set S(m) = T(2ᵐ); the recurrence may now be solvable by Master theorem.',
        algorithm: '1. Substitute m = lg n. 2. Solve S(m). 3. Translate back via n = 2ᵐ.',
        worked: 'T(n) = 2 T(sqrt(n)) + lg n becomes S(m) = 2 S(m/2) + m, which is Θ(m log m). Substitute back: Θ(lg n * lg lg n).',
        correctness: 'algebraic identity; nothing about the algorithm changed.',
        complexity: 'works for sqrt(n)-style splits and exponential indices.',
        trace: 'transform T(n) = T(sqrt n) + 1 and solve.',
        takeaways: 'when stuck, try the substitution m = lg n; the recurrence often becomes textbook.',
        practice: 'solve T(n) = T(sqrt(n)) + 1 by transformation.'
      }),
      practice: [
        mcq('algods-u2-l4-q1', 'After substituting m = lg n, T(n) = 2 T(sqrt(n)) + lg n becomes:',
          ['S(m) = 2 S(m/2) + m', 'S(m) = S(m/2) + 1', 'S(m) = 2 S(m) + m', 'S(m) = m'],
          0, 'sqrt(n) corresponds to m/2 in the lg-index; the additive lg n becomes m.')
      ]
    },
    // ═══════════════════════════════════════════════════════════════════════
    // L5 — Master Theorem
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Master theorem',
      durationMinutes: 35,
      type: 'interactive',
      summary: 'A three-case "shortcut" for divide-and-conquer recurrences.',
      richContent: [
        // ── 1. Intuition ────────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Leaves vs root — who does more work?',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The Master theorem for T(n) = aT(n/b) + f(n) boils down to one question: is the total work dominated by the leaves (bottom of the recursion tree), by the root (top of the tree), or is it evenly spread across all levels? The answer depends on comparing f(n) — the non-recursive work — to n^{log_b a} — the number of leaves.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Think of it as a tug-of-war',
          text: 'f(n) represents work done at each split. n^{log_b a} represents the raw expansion of subproblems. If f grows slower, the leaves win (Case 1). If f grows at the same rate, it is a tie — you get an extra log factor (Case 2). If f grows faster, the root wins (Case 3).'
        },
        // ── 2. Formal statement ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Formal statement',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Let a ≥ 1, b > 1, and let T(n) = aT(n/b) + f(n) with T(1) = Θ(1). Define the critical exponent c* = log_b a.'
        },
        {
          type: 'formula',
          latex: 'c^* = \\log_b a',
          display: true,
          caption: 'The critical exponent — compare f(n) to n^{c*}.'
        },
        {
          type: 'table',
          caption: 'The three cases of the Master theorem.',
          columns: ['Case', 'Condition on f(n)', 'Result'],
          rows: [
            ['Case 1 (leaf-heavy)', 'f(n) = O(n^{c* − ε}) for some ε > 0', 'T(n) = Θ(n^{c*})'],
            ['Case 2 (balanced)',    'f(n) = Θ(n^{c*} · logᵏ n), k ≥ 0',   'T(n) = Θ(n^{c*} · log^{k+1} n)'],
            ['Case 3 (root-heavy)',  'f(n) = Ω(n^{c* + ε}) for some ε > 0, and a·f(n/b) ≤ δ·f(n) for δ < 1', 'T(n) = Θ(f(n))']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The regularity condition',
          text: 'Case 3 requires an extra check: a · f(n/b) ≤ δ · f(n) for some δ < 1 and all sufficiently large n. This is called the regularity condition. Most "natural" functions f satisfy it, but you must mention it in a formal solution.'
        },
        // ── 2b. Formal case formulas ────────────────────────────────────
        {
          type: 'heading',
          text: 'Case 1 — leaves dominate',
          level: 3
        },
        {
          type: 'formula',
          latex: 'f(n) = O(n^{\\log_b a - \\varepsilon}) \\quad \\Rightarrow \\quad T(n) = \\Theta(n^{\\log_b a})',
          display: true,
          caption: 'f grows polynomially slower than the leaf count. The total work is determined by the leaves.'
        },
        {
          type: 'heading',
          text: 'Case 2 — balanced',
          level: 3
        },
        {
          type: 'formula',
          latex: 'f(n) = \\Theta(n^{\\log_b a} \\cdot \\log^{k} n) \\quad \\Rightarrow \\quad T(n) = \\Theta(n^{\\log_b a} \\cdot \\log^{k+1} n)',
          display: true,
          caption: 'f grows at the same polynomial rate as the leaf count (up to a log factor). An extra log factor appears.'
        },
        {
          type: 'heading',
          text: 'Case 3 — root dominates',
          level: 3
        },
        {
          type: 'formula',
          latex: 'f(n) = \\Omega(n^{\\log_b a + \\varepsilon}) \\text{ and } a \\cdot f(n/b) le \\delta \\cdot f(n) \\quad \\Rightarrow \\quad T(n) = \\Theta(f(n))',
          display: true,
          caption: 'f grows polynomially faster than the leaf count, and the regularity condition holds.'
        },
        {
          type: 'paragraph',
          text: 'The three formulas above are the complete Master theorem. In practice, most problems reduce to: compute log_b a, compare it to the degree of f(n), and pick the matching case. The only subtlety is verifying regularity for Case 3 and recognizing "gap" functions that fall between cases.'
        },
        // ── 2c. Three-case visual ────────────────────────────────────────
        {
          type: 'diagram',
          title: 'The three cases at a glance',
          caption: 'Left: leaf-heavy (Case 1). Center: balanced (Case 2). Right: root-heavy (Case 3). The shaded region shows where the work concentrates.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 220" role="img" aria-label="Master theorem three cases">
  <text x="440" y="22" text-anchor="middle" font-size="15" font-weight="800" fill="#0f2038">Master theorem — where does the work go?</text>
  <g font-family="-apple-system, system-ui, sans-serif">
    <!-- Case 1 -->
    <rect x="20" y="40" width="260" height="160" rx="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <text x="150" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="#0f2038">Case 1 — leaf-heavy</text>
    <text x="150" y="90" text-anchor="middle" font-size="12" fill="#475569">f(n) grows slower than n^{c*}</text>
    <text x="150" y="110" text-anchor="middle" font-size="12" fill="#475569">Leaves do most of the work</text>
    <rect x="60" y="130" width="180" height="28" rx="8" fill="#16a34a" fill-opacity="0.2" stroke="#16a34a"/>
    <text x="150" y="149" text-anchor="middle" font-size="13" font-weight="700" fill="#16a34a">T(n) = Θ(n^{log_b a})</text>
    <text x="150" y="180" text-anchor="middle" font-size="11" fill="#475569" font-style="italic">e.g. T = 4T(n/2) + n → Θ(n²)</text>

    <!-- Case 2 -->
    <rect x="310" y="40" width="260" height="160" rx="16" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="440" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="#0f2038">Case 2 — balanced</text>
    <text x="440" y="90" text-anchor="middle" font-size="12" fill="#475569">f(n) ≈ n^{c*} (± log factors)</text>
    <text x="440" y="110" text-anchor="middle" font-size="12" fill="#475569">All levels contribute equally</text>
    <rect x="350" y="130" width="180" height="28" rx="8" fill="#d97706" fill-opacity="0.2" stroke="#d97706"/>
    <text x="440" y="149" text-anchor="middle" font-size="13" font-weight="700" fill="#d97706">extra log factor</text>
    <text x="440" y="180" text-anchor="middle" font-size="11" fill="#475569" font-style="italic">e.g. T = 2T(n/2) + n → Θ(n log n)</text>

    <!-- Case 3 -->
    <rect x="600" y="40" width="260" height="160" rx="16" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
    <text x="730" y="68" text-anchor="middle" font-size="14" font-weight="700" fill="#0f2038">Case 3 — root-heavy</text>
    <text x="730" y="90" text-anchor="middle" font-size="12" fill="#475569">f(n) grows faster than n^{c*}</text>
    <text x="730" y="110" text-anchor="middle" font-size="12" fill="#475569">Root does most of the work</text>
    <rect x="640" y="130" width="180" height="28" rx="8" fill="#be185d" fill-opacity="0.2" stroke="#be185d"/>
    <text x="730" y="149" text-anchor="middle" font-size="13" font-weight="700" fill="#be185d">T(n) = Θ(f(n))</text>
    <text x="730" y="180" text-anchor="middle" font-size="11" fill="#475569" font-style="italic">e.g. T = 3T(n/4) + n² → Θ(n²)</text>
  </g>
</svg>`
        },
        // ── 3. Decision flowchart ───────────────────────────────────────
        {
          type: 'heading',
          text: 'Decision flowchart',
          level: 2
        },
        {
          type: 'table',
          caption: 'Follow these steps for any T(n) = aT(n/b) + f(n).',
          columns: ['Step', 'Action'],
          rows: [
            ['1', 'Compute c* = log_b a.'],
            ['2', 'Identify f(n) and compare its polynomial degree to c*.'],
            ['3', 'If deg(f) < c*: Case 1. Answer: Θ(n^{c*}).'],
            ['4', 'If deg(f) = c*: check for a logᵏ n factor. Case 2. Answer: Θ(n^{c*} log^{k+1} n).'],
            ['5', 'If deg(f) > c*: Case 3. Verify regularity. Answer: Θ(f(n)).'],
            ['6', 'If none of the three cases apply (e.g. f = n^{c*}/log n): Master theorem does NOT apply. Use another method.']
          ]
        },
        // ── 4. Interactive ──────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Master theorem calculator',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Enter a, b, and the degree of f(n) below. The calculator identifies the case and gives the asymptotic answer instantly.'
        },
        { type: 'interactive', artifact: 'master-theorem-calc' },
        // ── 5. Worked examples ──────────────────────────────────────────
        {
          type: 'heading',
          text: 'Worked examples',
          level: 2
        },
        {
          type: 'heading',
          text: 'Merge sort: T(n) = 2T(n/2) + n',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'a = 2, b = 2, c* = log₂ 2 = 1. f(n) = n = Θ(n¹ · log⁰ n). Since deg(f) = c* = 1 and k = 0, this is Case 2.'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(n \\log n)',
          display: true,
          caption: 'Case 2 with k = 0: multiply by one extra log factor.'
        },
        {
          type: 'heading',
          text: 'Strassen: T(n) = 7T(n/2) + Θ(n²)',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'a = 7, b = 2, c* = log₂ 7 ≈ 2.807. f(n) = n² = O(n^{2.807 − ε}) for ε ≈ 0.807. This is Case 1.'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(n^{\\lg 7}) \\approx \\Theta(n^{2.807})',
          display: true,
          caption: 'Case 1: leaves dominate. The answer is the leaf count.'
        },
        {
          type: 'heading',
          text: 'Binary search: T(n) = T(n/2) + 1',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'a = 1, b = 2, c* = log₂ 1 = 0. f(n) = 1 = Θ(n⁰ · log⁰ n). Case 2 with k = 0.'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(\\log n)',
          display: true,
          caption: 'Case 2: balanced. One extra log factor on top of n⁰ = 1.'
        },
        {
          type: 'heading',
          text: 'T(n) = 4T(n/2) + n²',
          level: 3
        },
        {
          type: 'paragraph',
          text: 'a = 4, b = 2, c* = log₂ 4 = 2. f(n) = n² = Θ(n² · log⁰ n). Case 2 with k = 0.'
        },
        {
          type: 'formula',
          latex: 'T(n) = \\Theta(n^{2} \\log n)',
          display: true,
          caption: 'Case 2 again: f and leaf count tie, add a log.'
        },
        // ── 6. When Master theorem does NOT apply ───────────────────────
        {
          type: 'heading',
          text: 'When the Master theorem does NOT apply',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The Master theorem requires a polynomial gap between f(n) and n^{c*}. It fails when: (1) f(n) = n^{c*} / log n — there is no ε > 0 making f = O(n^{c*−ε}), and the log is in the denominator so it is not Case 2 either. (2) The recurrence has unequal splits, like T(n) = T(n/3) + T(2n/3) + n. (3) f(n) oscillates (e.g., f(n) = n · sin²(n)). In these cases, use substitution or the Akra-Bazzi method.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Floors and ceilings',
          text: 'CLRS states that floors and ceilings do not affect the Master theorem result. You can treat T(⌊n/b⌋) and T(⌈n/b⌉) the same as T(n/b) for the purpose of applying the theorem. Mention this in a formal solution if asked.'
        },
        // ── 7. Classic algorithms table ─────────────────────────────────
        {
          type: 'heading',
          text: 'Classic algorithms and their Master-theorem classification',
          level: 2
        },
        {
          type: 'table',
          caption: 'Memorize these rows — they appear in many recurrence exercises.',
          columns: ['Algorithm', 'Recurrence', 'a', 'b', 'c* = log_b a', 'f(n)', 'Case', 'Result'],
          rows: [
            ['Binary search',     'T(n) = T(n/2) + 1',       '1', '2', '0',    '1',     '2', 'Θ(log n)'],
            ['Merge sort',        'T(n) = 2T(n/2) + n',      '2', '2', '1',    'n',     '2', 'Θ(n log n)'],
            ['Karatsuba',         'T(n) = 3T(n/2) + n',      '3', '2', '1.58', 'n',     '1', 'Θ(n^{1.58})'],
            ['Strassen',          'T(n) = 7T(n/2) + n²',     '7', '2', '2.81', 'n²',    '1', 'Θ(n^{lg 7})'],
            ['Naive multiply',    'T(n) = 4T(n/2) + n',      '4', '2', '2',    'n',     '1', 'Θ(n²)'],
            ['T = 4T(n/2) + n²',  'T(n) = 4T(n/2) + n²',    '4', '2', '2',    'n²',    '2', 'Θ(n² log n)'],
            ['T = 4T(n/2) + n³',  'T(n) = 4T(n/2) + n³',    '4', '2', '2',    'n³',    '3', 'Θ(n³)'],
            ['Median of medians', 'T(n) = T(n/5) + T(7n/10) + n', '—', '—', '—', 'n', 'N/A', 'Θ(n) (Akra-Bazzi)'],
            ['Closest pair',      'T(n) = 2T(n/2) + n',      '2', '2', '1',    'n',     '2', 'Θ(n log n)'],
            ['Matrix chain (DC)', 'T(n) = 2T(n/2) + n²',     '2', '2', '1',    'n²',    '3', 'Θ(n²)']
          ]
        },
        // ── 8. Exercises ────────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Exercises',
          level: 2
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u2l5-E1',
              source: 'L5 · identify case',
              question: 'Classify T(n) = 9T(n/3) + n using the Master theorem. State a, b, c*, and the case.',
              solution: 'a = 9, b = 3, c* = log₃ 9 = 2. f(n) = n = O(n^{2−ε}) for ε = 1. Case 1: T(n) = Θ(n²).'
            },
            {
              id: 'u2l5-E2',
              source: 'L5 · case 2',
              question: 'Apply the Master theorem to T(n) = 2T(n/2) + n log n.',
              solution: 'a = 2, b = 2, c* = 1. f(n) = n log n = Θ(n¹ · log¹ n), so Case 2 with k = 1. T(n) = Θ(n log² n).'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u2l5-M1',
              source: 'L5 · case 3',
              question: 'Classify T(n) = 3T(n/4) + n² using the Master theorem. Verify the regularity condition.',
              solution: 'a = 3, b = 4, c* = log₄ 3 ≈ 0.79. f(n) = n² = Ω(n^{0.79+ε}) for ε ≈ 1.2. Case 3. Regularity: a · f(n/b) = 3(n/4)² = 3n²/16 ≤ (3/16)n² = δ · f(n) with δ = 3/16 < 1. ✓ T(n) = Θ(n²).'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'hard',
          exercises: [
            {
              id: 'u2l5-H1',
              source: 'L5 · does not apply',
              question: 'Explain why T(n) = 2T(n/2) + n/log n cannot be solved by the Master theorem.',
              solution: 'c* = log₂ 2 = 1. f(n) = n/log n. For Case 1: n/log n is not O(n^{1−ε}) for any ε > 0 (it is larger than n^{1−ε} for any ε > 0). For Case 2: n/log n ≠ Θ(n · logᵏ n) for any k ≥ 0 (k = −1 is not allowed). For Case 3: n/log n is not Ω(n^{1+ε}). The function falls in the "gap" between cases. Use Akra-Bazzi or direct analysis: T(n) = Θ(n · log log n).'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'compare f(n) to nˡᵒᵍ_ᵇ ᵃ; the larger one (or a tie up to log) wins.',
        problem: 'avoid drawing the tree for every divide-and-conquer recurrence.',
        intuition: 'leaves vs internal work: which dominates?',
        formal: 'for T(n) = a T(n/b) + f(n) with a >= 1, b > 1: case 1 if f = O(nˡᵒᵍ_ᵇ ᵃ ⁻ ᵉᵖˢ) => Θ(nˡᵒᵍ_ᵇ ᵃ); case 2 if f = Θ(nˡᵒᵍ_ᵇ ᵃ logᵏ n) => Θ(nˡᵒᵍ_ᵇ ᵃ logᵏ⁺¹ n); case 3 if f = Θ(nˡᵒᵍ_ᵇ ᵃ ⁺ ᵉᵖˢ) AND regularity holds => Θ(f(n)).',
        algorithm: '1. Compute log_b a. 2. Compare with f(n). 3. Pick the matching case.',
        worked: 'merge sort: a=2, b=2, log_b a = 1, f(n) = n => case 2 with k=0 => Θ(n log n).',
        correctness: 'theorem statement is what it is; proofs are in CLRS chapter 4.',
        complexity: 'covers most algorithms in chapters 3, 7.',
        trace: 'classify Strassen T(n) = 7 T(n/2) + n². log_2 7 ~ 2.81, so case 1 => Θ(nˡᵍ ⁷).',
        takeaways: 'check the regularity condition for case 3; do not skip it.',
        practice: 'classify T(n) = 4 T(n/2) + n² (case 2: Θ(n² log n)).'
      }),
      practice: [
        mcq('algods-u2-l5-q1', 'For T(n) = 2 T(n/2) + n the Master theorem says:',
          ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Master theorem does not apply.'],
          1, 'log_2 2 = 1, f(n) = n = Θ(n¹), so case 2 with k=0 gives Θ(n log n).'),
        mcq('algods-u2-l5-q2', 'For T(n) = 7 T(n/2) + n² (Strassen):',
          ['Θ(n²)', 'Θ(n² log n)', 'Θ(nˡᵍ ⁷)', 'Θ(n³)'],
          2, 'log_2 7 ~ 2.81 > 2; case 1 gives Θ(nˡᵍ ⁷).'),
        mcq('algods-u2-l5-q3', 'Which case of the Master theorem requires checking a "regularity condition"?',
          ['Case 1', 'Case 2', 'Case 3', 'All three cases'],
          2, 'Only Case 3 requires the regularity condition: a · f(n/b) ≤ δ · f(n) for some δ < 1.'),
        mcq('algods-u2-l5-q4', 'T(n) = 4T(n/2) + n². What is the result?',
          ['Θ(n²)', 'Θ(n² log n)', 'Θ(n³)', 'Θ(n⁴)'],
          1, 'c* = log₂ 4 = 2, f(n) = n² = Θ(n²), Case 2 with k=0: Θ(n² log n).'),
        mcq('algods-u2-l5-q5', 'T(n) = T(n/2) + n. The Master theorem gives:',
          ['Θ(log n)', 'Θ(n)', 'Θ(n log n)', 'Θ(n²)'],
          1, 'a=1, b=2, c*=0. f(n) = n = Ω(n^{0+1}). Case 3 with regularity: 1·(n/2) ≤ (1/2)n. T(n) = Θ(n).')
      ]
    },
    // ═══════════════════════════════════════════════════════════════════════
    // L6 — Unit 2 Review
    // ═══════════════════════════════════════════════════════════════════════
    {
      title: 'Unit 2 review',
      durationMinutes: 40,
      type: 'practice',
      summary: 'Consolidate all five recurrence-solving methods with exercises, a cheat-sheet, and interactive tools.',
      richContent: [
        // ── 1. How to use this lesson ───────────────────────────────────
        {
          type: 'heading',
          text: 'How to use this lesson',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'You have finished the five recurrence-solving methods. This lesson consolidates them into a single reference, gives you a method-selection decision tree, and provides graded exercises from easy through hard. Work through it in order: read the refresher, close the page, reproduce the cheat-sheet from memory, then attempt the exercises.'
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'A learning protocol',
          text: 'Read the refresher; close the page; reproduce the cheat-sheet from memory; only then attempt the exercises. The act of regenerating the summary is what builds long-term recall — not re-reading.'
        },
        // ── 1b. Review path diagram ─────────────────────────────────────
        {
          type: 'heading',
          text: 'What this lesson contains',
          level: 2
        },
        {
          type: 'diagram',
          title: 'Unit 2 review path',
          caption: 'Refresher and cheat-sheet first, then 16 graded exercises (Easy → Medium → Hard), then 11 MCQs at the end. Target time: 40 minutes.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 180" role="img" aria-label="Lesson roadmap">
  <defs>
    <marker id="u2r-ar" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed"/>
    </marker>
  </defs>
  <text x="440" y="22" text-anchor="middle" font-size="15" font-weight="800" fill="#0f2038">Your path through this lesson</text>
  <g font-family="-apple-system, system-ui, sans-serif">
    <rect x="30"  y="50" width="170" height="68" rx="14" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
    <text x="115" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Refresher</text>
    <text x="115" y="98" text-anchor="middle" font-size="11" fill="#475569">concept map +</text>
    <text x="115" y="112" text-anchor="middle" font-size="11" fill="#475569">cheat-sheet + formulas</text>

    <rect x="220" y="50" width="170" height="68" rx="14" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
    <text x="305" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Interactive</text>
    <text x="305" y="98" text-anchor="middle" font-size="11" fill="#475569">recursion-tree builder</text>
    <text x="305" y="112" text-anchor="middle" font-size="11" fill="#475569">+ master-theorem calc</text>

    <rect x="410" y="50" width="160" height="68" rx="14" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <text x="490" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Exercises</text>
    <text x="490" y="98" text-anchor="middle" font-size="11" fill="#475569">6 easy + 5 medium</text>
    <text x="490" y="112" text-anchor="middle" font-size="11" fill="#475569">+ 5 hard</text>

    <rect x="590" y="50" width="160" height="68" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="670" y="78" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">Boss Round</text>
    <text x="670" y="98" text-anchor="middle" font-size="11" fill="#475569">11 MCQs</text>
    <text x="670" y="112" text-anchor="middle" font-size="11" fill="#475569">(easy → hard)</text>

    <line x1="200" y1="84" x2="216" y2="84" stroke="#7c3aed" stroke-width="2" marker-end="url(#u2r-ar)"/>
    <line x1="390" y1="84" x2="406" y2="84" stroke="#7c3aed" stroke-width="2" marker-end="url(#u2r-ar)"/>
    <line x1="570" y1="84" x2="586" y2="84" stroke="#7c3aed" stroke-width="2" marker-end="url(#u2r-ar)"/>

    <text x="440" y="150" text-anchor="middle" font-size="12" fill="#475569" font-style="italic">Recommended time: ~10 min refresher, ~25 min exercises, ~5 min MCQs.</text>
  </g>
</svg>`
        },
        // ── 2. Method-selection decision tree ───────────────────────────
        {
          type: 'heading',
          text: 'Which method should I use?',
          level: 2
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Method-selection decision tree',
          text: '(1) Is it T(n) = aT(n/b) + f(n) with constant a, b? → Try the Master theorem first. If it applies, you are done in 30 seconds. (2) Does the Master theorem not apply (gap condition fails, unequal splits)? → Draw the recursion tree and sum per-level costs. (3) Do you have a guess from the tree but need a formal proof? → Use the substitution method. (4) Is the recurrence non-standard (T(√n), T(n^{1/3}))? → Use variable transformation to reduce it to standard form. (5) Is it a simple linear recurrence T(n-1) + f(n)? → Use iteration (unrolling).'
        },
        // ── 3. Concept map ──────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Concept map: Unit 2 in one picture',
          level: 2
        },
        {
          type: 'diagram',
          title: 'How the five methods connect',
          caption: 'Arrows show typical workflow: start with the Master theorem or recursion tree, fall back to substitution for a formal proof, and use variable transformation for non-standard recurrences.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 880 320" role="img" aria-label="Unit 2 concept map">
  <defs>
    <marker id="u2-ar" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#7c3aed"/>
    </marker>
  </defs>
  <text x="440" y="26" text-anchor="middle" font-size="16" font-weight="800" fill="#0f2038">Unit 2 — solving recurrences</text>

  <!-- L1 Iteration -->
  <rect x="30" y="60" width="180" height="64" rx="14" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
  <text x="120" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L1 Iteration</text>
  <text x="120" y="106" text-anchor="middle" font-size="11" fill="#475569">unroll + sum series</text>

  <!-- L2 Recursion tree -->
  <rect x="240" y="60" width="180" height="64" rx="14" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
  <text x="330" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L2 Recursion tree</text>
  <text x="330" y="106" text-anchor="middle" font-size="11" fill="#475569">per-level cost sums</text>

  <!-- L3 Substitution -->
  <rect x="450" y="60" width="180" height="64" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
  <text x="540" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L3 Substitution</text>
  <text x="540" y="106" text-anchor="middle" font-size="11" fill="#475569">guess + induction</text>

  <!-- L4 Variable transform -->
  <rect x="660" y="60" width="190" height="64" rx="14" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
  <text x="755" y="86" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2038">L4 Var. transform</text>
  <text x="755" y="106" text-anchor="middle" font-size="11" fill="#475569">m = lg n trick</text>

  <!-- L5 Master theorem -->
  <rect x="330" y="180" width="220" height="64" rx="14" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
  <text x="440" y="206" text-anchor="middle" font-size="14" font-weight="700" fill="#0f2038">L5 Master theorem</text>
  <text x="440" y="226" text-anchor="middle" font-size="11" fill="#475569">3 cases — instant answer</text>

  <!-- arrows -->
  <line x1="210" y1="92" x2="236" y2="92" stroke="#7c3aed" stroke-width="2" marker-end="url(#u2-ar)"/>
  <line x1="420" y1="92" x2="446" y2="92" stroke="#7c3aed" stroke-width="2" marker-end="url(#u2-ar)"/>
  <line x1="630" y1="92" x2="656" y2="92" stroke="#7c3aed" stroke-width="2" marker-end="url(#u2-ar)"/>
  <line x1="330" y1="124" x2="400" y2="176" stroke="#7c3aed" stroke-width="2" marker-end="url(#u2-ar)"/>
  <line x1="540" y1="124" x2="480" y2="176" stroke="#7c3aed" stroke-width="2" marker-end="url(#u2-ar)"/>
  <line x1="755" y1="124" x2="550" y2="190" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="6 4" marker-end="url(#u2-ar)"/>

  <text x="440" y="276" text-anchor="middle" font-size="13" fill="#475569" font-style="italic">Tree or iteration provides the guess → substitution provides the proof → Master theorem provides the shortcut.</text>
</svg>`
        },
        // ── 4. Cheat-sheet table ────────────────────────────────────────
        {
          type: 'heading',
          text: 'Cheat sheet — recurrences you must know cold',
          level: 2
        },
        {
          type: 'table',
          caption: 'Reproduce this table from memory during review.',
          columns: ['Recurrence', 'Method', 'Result'],
          rows: [
            ['T(n) = T(n−1) + c',           'Iteration',      'Θ(n)'],
            ['T(n) = T(n−1) + n',           'Iteration',      'Θ(n²)'],
            ['T(n) = T(n−1) + n²',          'Iteration',      'Θ(n³)'],
            ['T(n) = 2T(n/2) + 1',          'Iteration/Master','Θ(n)'],
            ['T(n) = 2T(n/2) + n',          'Master (Case 2)', 'Θ(n log n)'],
            ['T(n) = 2T(n/2) + n²',         'Master (Case 3)', 'Θ(n²)'],
            ['T(n) = 3T(n/4) + n²',         'Master (Case 3)', 'Θ(n²)'],
            ['T(n) = 4T(n/2) + n',          'Master (Case 1)', 'Θ(n²)'],
            ['T(n) = 4T(n/2) + n²',         'Master (Case 2)', 'Θ(n² log n)'],
            ['T(n) = 7T(n/2) + n²',         'Master (Case 1)', 'Θ(n^{lg 7})'],
            ['T(n) = T(n/2) + 1',           'Master (Case 2)', 'Θ(log n)'],
            ['T(n) = T(n/2) + n',           'Master (Case 3)', 'Θ(n)'],
            ['T(n) = T(n/3) + T(2n/3) + n', 'Substitution',   'Θ(n log n)'],
            ['T(n) = 2T(√n) + lg n',        'Var. transform',  'Θ(lg n · lg lg n)'],
            ['T(n) = T(√n) + 1',            'Var. transform',  'Θ(lg lg n)']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Memorize these identities',
          text: 'Arithmetic: Σk = n(n+1)/2. Geometric: Σ rᵏ = (rⁿ−1)/(r−1). Sum of squares: Σk² = n(n+1)(2n+1)/6. Number of leaves in a recursion tree: n^{log_b a}. These four facts solve 90% of recurrence problems.'
        },
        // ── 4b. Key formulas ─────────────────────────────────────────────
        {
          type: 'heading',
          text: 'Key formulas to know cold',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2} = \\Theta(n^{2})',
          display: true,
          caption: 'Arithmetic series — appears in T(n) = T(n−1) + n.'
        },
        {
          type: 'formula',
          latex: '\\sum_{k=0}^{m} r^{k} = \\frac{r^{m+1} - 1}{r - 1} = \\begin{cases} \\Theta(r^{m}) & \\text{if } r > 1 \\\\\\\\ \\Theta(m) & \\text{if } r = 1 \\\\\\\\ \\Theta(1) & \\text{if } 0 < r < 1 \\end{cases}',
          display: true,
          caption: 'Geometric series — the backbone of recursion-tree analysis.'
        },
        {
          type: 'formula',
          latex: '\\sum_{k=1}^{n} k^{2} = \\frac{n(n+1)(2n+1)}{6} = \\Theta(n^{3})',
          display: true,
          caption: 'Sum of squares — appears in T(n) = T(n−1) + n².'
        },
        {
          type: 'formula',
          latex: '\\text{Leaves of the recursion tree for } T(n) = a\\,T(n/b) + f(n): \\quad a^{\\log_b n} = n^{\\log_b a}',
          display: true,
          caption: 'The identity a^{log_b n} = n^{log_b a} is used constantly in the Master theorem.'
        },
        // ── 4c. Quick refresher per lesson ──────────────────────────────
        {
          type: 'heading',
          text: 'Quick refresher — the five methods in one table',
          level: 2
        },
        {
          type: 'table',
          caption: 'One row per method; the "when to use" column is the key decision criterion.',
          columns: ['Method', 'Central idea', 'When to use', 'Limitation'],
          rows: [
            ['Iteration', 'Unroll T(n) → T(n−1) → ... → T(1) and sum the costs.', 'Simple linear recurrences T(n) = T(n−1) + f(n).', 'Hard to apply when f is complex or branching > 1.'],
            ['Recursion tree', 'Draw the tree; sum work per level.', 'Divide-and-conquer recurrences. Great for building intuition.', 'Informal — the sum needs verification by substitution for a proof.'],
            ['Substitution', 'Guess T(n) ≤ cg(n), prove by induction.', 'When you need a formal proof, or when Master does not apply.', 'Requires a good guess. The lower-order trick is needed frequently.'],
            ['Var. transform', 'Set m = lg n to convert √n splits into m/2 splits.', 'Non-standard recurrences: T(√n), T(n^{1/3}).', 'Only useful for specific subproblem-size patterns.'],
            ['Master theorem', 'Compare f(n) to n^{log_b a}. Three cases.', 'Standard D&C recurrences T(n) = aT(n/b) + f(n).', 'Fails when there is no polynomial gap between f and n^{c*}.']
          ]
        },
        // ── 5. Interactive tools ────────────────────────────────────────
        {
          type: 'heading',
          text: 'Interactive tools',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Use these tools to check your work on the exercises below.'
        },
        { type: 'interactive', artifact: 'recurrence-method-review' },
        { type: 'interactive', artifact: 'recursion-tree-builder' },
        { type: 'interactive', artifact: 'master-theorem-calc' },
        // ── 6. Easy exercises ───────────────────────────────────────────
        {
          type: 'heading',
          text: 'Exercises — easy (warm-up)',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'These exercises check that the vocabulary and basic procedures have stuck. If you cannot answer them in under a minute each, re-read the relevant lesson before continuing.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u2l6-E1',
              source: 'L1 · iteration',
              question: 'Solve T(n) = T(n − 1) + 7 with T(1) = 7 by iteration.',
              solution: 'Unrolling: T(n) = 7n. Each step adds 7, and there are n − 1 steps plus the base case T(1) = 7. So T(n) = 7n = Θ(n).'
            },
            {
              id: 'u2l6-E2',
              source: 'L5 · Master identify',
              question: 'For T(n) = 9T(n/3) + n, state a, b, c*, and the Master theorem case.',
              solution: 'a = 9, b = 3, c* = log₃ 9 = 2. f(n) = n = O(n^{2−1}). Case 1. T(n) = Θ(n²).'
            },
            {
              id: 'u2l6-E3',
              source: 'L2 · tree depth',
              question: 'How many levels does the recursion tree for T(n) = 3T(n/3) + n have (including the root)?',
              solution: 'Subproblem size at level i is n/3ⁱ. Base case when n/3ⁱ = 1, so i = log₃ n. Total levels = log₃ n + 1.'
            },
            {
              id: 'u2l6-E4',
              source: 'L4 · transform setup',
              question: 'After setting m = lg n, what does T(√n) become in terms of S?',
              solution: '√n = 2^{m/2}, so T(√n) = T(2^{m/2}) = S(m/2).'
            },
            {
              id: 'u2l6-E5',
              source: 'L3 · substitution setup',
              question: 'To prove T(n) = 2T(n/2) + n = O(n log n), what is the inductive hypothesis?',
              solution: 'IH: For all k < n, T(k) ≤ c · k · lg k, where c > 0 is a constant to be determined.'
            },
            {
              id: 'u2l6-E6',
              source: 'L5 · case identification',
              question: 'T(n) = T(n/2) + 1. State the Master theorem case and result.',
              solution: 'a = 1, b = 2, c* = 0. f(n) = 1 = Θ(n⁰ log⁰ n). Case 2, k = 0. T(n) = Θ(log n).'
            }
          ]
        },
        // ── 7. Medium exercises ─────────────────────────────────────────
        {
          type: 'heading',
          text: 'Exercises — medium (one-step analysis)',
          level: 2
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u2l6-M1',
              source: 'L1 + L5 · compare methods',
              question: 'Solve T(n) = 2T(n/2) + n by both iteration and the Master theorem. Verify they agree.',
              solution: 'Iteration: Level i cost = n. Levels = log₂ n. Total = n · log₂ n = Θ(n log n). Master: a=2, b=2, c*=1, f=n=Θ(n), Case 2, k=0. Result: Θ(n log n). ✓ They agree.'
            },
            {
              id: 'u2l6-M2',
              source: 'L5 · case 3 regularity',
              question: 'Apply the Master theorem to T(n) = 2T(n/4) + √n. State the case and verify regularity if needed.',
              solution: 'a=2, b=4, c*=log₄ 2=0.5. f(n)=√n=n^{0.5}=Θ(n^{c*}). This is Case 2 with k=0. T(n) = Θ(√n · log n). No regularity check needed for Case 2.'
            },
            {
              id: 'u2l6-M3',
              source: 'L3 · substitution proof',
              question: 'Prove T(n) = T(n/2) + 1 = O(log n) using the substitution method.',
              solution: 'Guess T(n) ≤ c lg n. IH: T(n/2) ≤ c lg(n/2). T(n) = T(n/2) + 1 ≤ c lg(n/2) + 1 = c(lg n − 1) + 1 = c lg n − c + 1 ≤ c lg n when c ≥ 1. Base: T(2) = T(1) + 1 = Θ(1) ≤ c lg 2 = c for large enough c. ✓'
            },
            {
              id: 'u2l6-M4',
              source: 'L2 · tree pattern',
              question: 'Draw (describe) the recursion tree for T(n) = 4T(n/2) + n² and identify whether it is root-heavy, uniform, or leaf-heavy.',
              solution: 'Level 0: n². Level 1: 4·(n/2)² = n². Level 2: 16·(n/4)² = n². Every level costs n². The pattern is uniform with log₂ n levels. T(n) = Θ(n² log n).'
            },
            {
              id: 'u2l6-M5',
              source: 'L4 · variable transform',
              question: 'Solve T(n) = 4T(√n) + 1 by variable transformation.',
              solution: 'Let m = lg n. S(m) = 4S(m/2) + 1. Master: a=4, b=2, c*=2. f(m)=1=O(m^{2−ε}), Case 1. S(m) = Θ(m²). Back-substitute: T(n) = Θ(lg² n).'
            }
          ]
        },
        // ── 8. Hard exercises ───────────────────────────────────────────
        {
          type: 'heading',
          text: 'Exercises — hard (multi-step / proof)',
          level: 2
        },
        {
          type: 'exercises',
          difficulty: 'hard',
          exercises: [
            {
              id: 'u2l6-H1',
              source: 'L3 · lower-order trick',
              question: 'Prove T(n) = 4T(n/2) + n = O(n²) by substitution. Show that the naive guess fails and apply the lower-order trick.',
              solution: 'Naive: guess T(n) ≤ cn². T(n) = 4·c(n/2)² + n = cn² + n. This is NOT ≤ cn². Apply the trick: guess T(n) ≤ cn² − dn. T(n) = 4(c(n/2)² − d(n/2)) + n = cn² − 2dn + n = cn² − (2d−1)n ≤ cn² − dn when d ≥ 1. Pick d = 1, and choose c large enough for the base case. ✓'
            },
            {
              id: 'u2l6-H2',
              source: 'L5 · gap case',
              question: 'Show that T(n) = 2T(n/2) + n/log n cannot be classified by the Master theorem. Then use a recursion tree to argue T(n) = Θ(n log log n).',
              solution: 'c* = 1. f(n) = n/log n. Not O(n^{1−ε}) for any ε>0 (Case 1 fails). Not Θ(n logᵏ n) for k ≥ 0 (Case 2 fails — k would be −1). Not Ω(n^{1+ε}) (Case 3 fails). Tree: level i cost = n/(log n − i). Sum over log n levels ≈ n · Σ 1/(log n − i) = n · H_{log n} = Θ(n log log n).'
            },
            {
              id: 'u2l6-H3',
              source: 'L3 · unequal split',
              question: 'Prove T(n) = T(n/3) + T(2n/3) + n is O(n log n) by substitution. What constant in the log base makes the proof cleanest?',
              solution: 'Guess T(n) ≤ cn lg_{3/2} n. T(n) ≤ c(n/3)lg_{3/2}(n/3) + c(2n/3)lg_{3/2}(2n/3) + n. Use lg_{3/2}(n/3) = lg_{3/2} n − 1 and lg_{3/2}(2n/3) = lg_{3/2} n − 1. Then T(n) ≤ cn lg_{3/2} n − cn + n ≤ cn lg_{3/2} n for c ≥ 1. The log base 3/2 arises because the deeper branch shrinks by factor 2/3 — taking log_{3/2} gives depth exactly.'
            },
            {
              id: 'u2l6-H4',
              source: 'L2 + L5 · compare',
              question: 'Use both a recursion tree and the Master theorem to solve T(n) = 3T(n/2) + n. Verify the leaf count formula n^{log_b a}.',
              solution: 'Master: a=3, b=2, c*=lg 3≈1.585. f(n)=n=O(n^{1.585−ε}), Case 1. T(n)=Θ(n^{lg 3}). Tree: Level i cost = 3ⁱ·(n/2ⁱ) = n·(3/2)ⁱ. Geometric with ratio 3/2>1 (leaf-heavy). Leaves = 3^{lg n} = n^{lg 3}. Leaf cost dominates. Both methods agree: Θ(n^{lg 3}).'
            },
            {
              id: 'u2l6-H5',
              source: 'L4 · advanced transform',
              question: 'Solve T(n) = 2T(√n) + 1 by variable transformation. Compare the result with T(n) = 2T(√n) + lg n.',
              solution: 'For T(n) = 2T(√n) + 1: let m = lg n. S(m) = 2S(m/2) + 1. Master: a=2, b=2, c*=1, f=1=O(m^{1−1}), Case 1. S(m) = Θ(m). T(n) = Θ(lg n). For T(n) = 2T(√n) + lg n: S(m) = 2S(m/2) + m. Case 2: S(m) = Θ(m log m). T(n) = Θ(lg n · lg lg n). The additive lg n term upgrades the answer by a lg lg n factor.'
            }
          ]
        },
        // ── 9. Common pitfalls ──────────────────────────────────────────
        {
          type: 'heading',
          text: 'Common pitfalls — what graders see most often',
          level: 2
        },
        {
          type: 'table',
          caption: 'Mistakes to avoid in the Unit 2 review.',
          columns: ['Mistake', 'Why it costs marks', 'How to fix'],
          rows: [
            ['Applying Master theorem when it does not apply', 'The "gap" cases (e.g. n/log n) are not covered. Wrong case = 0 marks.', 'Check that f is polynomially larger/smaller, not just asymptotically so.'],
            ['Forgetting the regularity condition for Case 3', 'The theorem requires a · f(n/b) ≤ δ f(n). Skipping it is incomplete.', 'Always write one line verifying regularity for Case 3.'],
            ['Substitution: residual of wrong sign', 'T(n) ≤ cn lg n + n is NOT a valid bound. The +n must be absorbed.', 'The residual must be ≤ 0. If not, use the lower-order trick.'],
            ['Confusing n^{log_b a} with nᵃ', 'The exponent is log_b a, not a itself. For a=7, b=2 this is ~2.81, not 7.', 'Always compute log_b a explicitly. Write it out.'],
            ['Variable transform: forgetting to back-substitute', 'Solving S(m) = Θ(m log m) is only half the answer. You need T(n) = Θ(lg n · lg lg n).', 'Always end with "substitute m = lg n back".'],
            ['Iteration: wrong series identity', '1 + 2 + 4 + ... + 2ᵏ is geometric (2^{k+1} − 1), not arithmetic (k(k+1)/2).', 'Label each sum as arithmetic or geometric before evaluating.']
          ]
        },
        // ── 10. practice preparation ────────────────────────────────────────
        {
          type: 'heading',
          text: 'How to review Unit 2',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Reproduce the cheat-sheet table on a blank page from memory. Every row you miss tells you which lesson to revisit.',
            'For each of the five methods, write a one-paragraph description explaining when and how to use it.',
            'Practice the easy exercises until you can finish all six in under 5 minutes.',
            'Work through the medium exercises with full derivations in about 30 minutes.',
            'Use the hard exercises as a timed challenge: 60 minutes, no notes, then self-grade.',
            'Use the recursion-tree builder and Master-theorem calculator to verify your manual answers.',
            'For the substitution method, practice the lower-order trick on at least two recurrences until the algebra is automatic.'
          ]
        },
        {
          type: 'callout',
          tone: 'tip',
          title: 'Closing thought',
          text: 'Unit 2 gave you five tools for solving recurrences — the language that lets you analyze any divide-and-conquer algorithm. Unit 3 puts these tools to work on sorting algorithms (merge sort, quicksort, heapsort) and selection, where the recurrences from this unit appear directly in the runtime proofs.'
        }
      ],
      content: [
        block('Consolidate the five recurrence-solving methods: iteration, recursion trees, substitution, variable transformation, and the Master theorem.'),
        tip('Try every exercise on paper before checking the solution. Many avoidable mistakes come from skipping the algebra.'),
        example('Example exercise: solve T(n) = 3T(n/4) + cn² by the Master theorem, stating the case and verifying regularity.')
      ],
      practice: [
        // ─── Easy (4 questions) ──────────────────────────────────────────
        mcq('algods-u2-l6-q1', '[Easy · L1] T(n) = T(n − 1) + n² unrolls to which series?',
          ['1 + 2 + ... + n', '1² + 2² + ... + n²', 'n + n + ... + n', '2ⁿ'],
          1, 'Each unrolling adds k² for k = n, n−1, ..., 1. The result is the sum of squares.'),
        mcq('algods-u2-l6-q2', '[Easy · L5] T(n) = 8T(n/2) + n². Master theorem gives:',
          ['Θ(n²)', 'Θ(n² log n)', 'Θ(n³)', 'Θ(n⁴)'],
          2, 'c* = log₂ 8 = 3. f(n) = n² = O(n^{3−1}). Case 1. T(n) = Θ(n³).'),
        mcq('algods-u2-l6-q3', '[Easy · L2] The recursion tree for T(n) = T(n/2) + n has how many levels?',
          ['n', 'log₂ n', 'n/2', '2ⁿ'],
          1, 'The subproblem size halves at each level. After log₂ n levels, the size reaches 1.'),
        mcq('algods-u2-l6-q4', '[Easy · L4] After m = lg n, T(n) = T(√n) + 1 becomes:',
          ['S(m) = S(m/2) + 1', 'S(m) = 2S(m/2) + m', 'S(m) = S(m²) + 1', 'S(m) = S(m − 1) + 1'],
          0, '√n = 2^{m/2}, so T(√n) = S(m/2). The constant +1 stays. S(m) = S(m/2) + 1.'),

        // ─── Medium (4 questions) ────────────────────────────────────────
        mcq('algods-u2-l6-q5', '[Medium · L5] T(n) = 3T(n/2) + n. Which case and what is the result?',
          ['Case 1: Θ(n^{lg 3})', 'Case 2: Θ(n log n)', 'Case 3: Θ(n)', 'Does not apply.'],
          0, 'c* = lg 3 ≈ 1.585. f(n) = n = O(n^{1.585 − ε}). Case 1: leaves dominate. T(n) = Θ(n^{lg 3}).'),
        mcq('algods-u2-l6-q6', '[Medium · L3] In the substitution proof of T(n) = 2T(n/2) + n = O(n log n), the residual −(c−1)n must be:',
          ['Positive, to strengthen the bound.', 'Zero, for equality.', 'Negative (≤ 0), so the inequality holds.', 'It does not matter.'],
          2, 'For the inductive step to succeed, we need T(n) ≤ cn lg n. The residual −(c−1)n must be ≤ 0, which requires c ≥ 1.'),
        mcq('algods-u2-l6-q7', '[Medium · L2] For T(n) = 4T(n/2) + n², what is the per-level cost pattern?',
          ['Uniform — each level costs n².', 'Root-heavy — level 0 dominates.', 'Leaf-heavy — leaves dominate.', 'Alternating.'],
          0, 'Level i: 4ⁱ · (n/2ⁱ)² = 4ⁱ · n²/4ⁱ = n². Every level costs exactly n². Uniform pattern.'),
        mcq('algods-u2-l6-q8', '[Medium · L1] T(n) = T(n − 1) + 2ⁿ. The unrolled sum is dominated by:',
          ['The first term (2ⁿ).', 'The middle terms.', 'The last term (2¹).', 'All terms contribute equally.'],
          0, 'The sum is 2¹ + 2² + ... + 2ⁿ = 2^{n+1} − 2. The last term 2ⁿ is half the total. T(n) = Θ(2ⁿ).'),

        // ─── Hard (3 questions) ──────────────────────────────────────────
        mcq('algods-u2-l6-q9', '[Hard · L5] T(n) = 2T(n/2) + n/log n. Master theorem says:',
          ['Case 1: Θ(n)', 'Case 2: Θ(n log n)', 'Case 3: Θ(n/log n)', 'Does not apply — f(n) falls in the gap.'],
          3, 'f(n) = n/log n is asymptotically smaller than n but not polynomially smaller (no ε > 0 with f = O(n^{1−ε})). It also is not Θ(n logᵏ n) for any k ≥ 0. Master theorem does not apply.'),
        mcq('algods-u2-l6-q10', '[Hard · L3 + L5] To prove T(n) = 4T(n/2) + n is O(n²) by substitution, the lower-order trick subtracts which term?',
          ['−d log n', '−d n', '−d n²', '−d'],
          1, 'Naive guess T(n) ≤ cn² gives cn² + n. Subtract dn: guess T(n) ≤ cn² − dn. Then 4c(n/2)² − 4d(n/2) + n = cn² − 2dn + n ≤ cn² − dn when d ≥ 1.'),
        mcq('algods-u2-l6-q11', '[Hard · L4] Solve T(n) = 2T(√n) + 1 by variable transformation. The result is:',
          ['Θ(log n)', 'Θ(lg n · lg lg n)', 'Θ(lg lg n)', 'Θ(√n)'],
          0, 'Let m = lg n. S(m) = 2S(m/2) + 1. Master: a=2, b=2, c*=1, f=1=O(m^{1−1}). Case 1: S(m) = Θ(m). Back-substitute: T(n) = Θ(lg n).')
      ]
    }
  ]
};

const u3 = {
  id: 'algods-u3',
  title: 'Sorting and Selection',
  summary: 'Merge sort, heapsort, quicksort, randomization, lower bounds, counting/radix sort, selection.',
  lessons: [
    {
      title: 'Merge sort',
      durationMinutes: 40,
      type: 'interactive',
      summary: 'Divide-and-conquer sort with the MERGE subroutine.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Merge sort is the cleanest example of divide and conquer in sorting. It does not try to fix the whole array at once. It splits the input into two halves, recursively sorts each half, and then performs one linear merge step. The important promise is this: if the two halves are already sorted, combining them is easy.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'The core split',
          text: 'The recursive calls solve smaller sorting problems. MERGE is the only place where the algorithm actually compares elements and writes the sorted output.'
        },
        {
          type: 'diagram',
          title: 'Divide first, merge upward',
          caption: 'Every leaf is a one-element sorted array. The work happens while merging sorted pieces back together.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 360" role="img" aria-label="Merge sort split and merge diagram">
  <defs>
    <marker id="u3ms-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="836" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="44" text-anchor="middle" font-size="22" font-weight="800" fill="#0f2038">MERGE-SORT on [5, 2, 4, 7, 1, 3, 2, 6]</text>
  <g font-family="Inter, Arial, sans-serif" font-size="15" text-anchor="middle">
    <rect x="250" y="70" width="360" height="46" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="430" y="99" font-weight="800" fill="#0f2038">[5, 2, 4, 7, 1, 3, 2, 6]</text>
    <line x1="380" y1="116" x2="250" y2="158" stroke="#64748b" stroke-width="2" marker-end="url(#u3ms-arrow)"/>
    <line x1="480" y1="116" x2="610" y2="158" stroke="#64748b" stroke-width="2" marker-end="url(#u3ms-arrow)"/>
    <rect x="120" y="160" width="260" height="42" rx="11" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
    <text x="250" y="187" font-weight="800" fill="#0f2038">[5, 2, 4, 7]</text>
    <rect x="480" y="160" width="260" height="42" rx="11" fill="#f0fdf4" stroke="#16a34a" stroke-width="2"/>
    <text x="610" y="187" font-weight="800" fill="#0f2038">[1, 3, 2, 6]</text>
    <rect x="130" y="230" width="240" height="40" rx="10" fill="#fff7ed" stroke="#f59e0b" stroke-width="2"/>
    <text x="250" y="256" font-weight="800" fill="#0f2038">[2, 4, 5, 7]</text>
    <rect x="490" y="230" width="240" height="40" rx="10" fill="#fff7ed" stroke="#f59e0b" stroke-width="2"/>
    <text x="610" y="256" font-weight="800" fill="#0f2038">[1, 2, 3, 6]</text>
    <line x1="250" y1="270" x2="380" y2="302" stroke="#64748b" stroke-width="2" marker-end="url(#u3ms-arrow)"/>
    <line x1="610" y1="270" x2="480" y2="302" stroke="#64748b" stroke-width="2" marker-end="url(#u3ms-arrow)"/>
    <rect x="250" y="296" width="360" height="42" rx="11" fill="#ecfdf5" stroke="#059669" stroke-width="2"/>
    <text x="430" y="323" font-weight="900" fill="#064e3b">[1, 2, 2, 3, 4, 5, 6, 7]</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'table',
          caption: 'Vocabulary used in merge sort.',
          columns: ['Term', 'Meaning', 'Learning note'],
          rows: [
            ['Divide', 'Split A[p..r] into A[p..q] and A[q+1..r].', 'The split is by index, not by value.'],
            ['Conquer', 'Recursively sort both halves.', 'Base case: a subarray of length 0 or 1 is already sorted.'],
            ['Combine', 'MERGE the two sorted halves into one sorted segment.', 'This costs Θ(r - p + 1).'],
            ['Stable sort', 'Equal keys keep their original relative order.', 'Merge sort is stable if MERGE chooses from the left half when keys tie.']
          ]
        },
        {
          type: 'heading',
          text: 'Formal version',
          level: 2
        },
        {
          type: 'code',
          title: 'MERGE-SORT and MERGE',
          language: 'pseudocode',
          code: `MERGE-SORT(A, p, r)
    if p >= r
        return
    q = floor((p + r) / 2)
    MERGE-SORT(A, p, q)
    MERGE-SORT(A, q + 1, r)
    MERGE(A, p, q, r)

MERGE(A, p, q, r)
    L = A[p..q]
    R = A[q+1..r]
    i = 1
    j = 1
    for k = p to r
        if j > length(R) or (i <= length(L) and L[i] <= R[j])
            A[k] = L[i]
            i = i + 1
        else
            A[k] = R[j]
            j = j + 1`
        },
        {
          type: 'formula',
          latex: 'T(n) = 2T(n/2) + cn',
          display: true,
          caption: 'Two recursive halves plus one linear merge.'
        },
        {
          type: 'heading',
          text: 'Worked example: one merge step',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The merge step only works because both input lists are already sorted. Compare the front elements, output the smaller one, and advance only the pointer that supplied the output value.'
        },
        {
          type: 'table',
          caption: 'Merging L = [2, 4, 5, 7] and R = [1, 2, 3, 6].',
          columns: ['Step', 'Front of L', 'Front of R', 'Chosen', 'Output so far'],
          rows: [
            ['1', '2', '1', '1 from R', '[1]'],
            ['2', '2', '2', '2 from L', '[1, 2]'],
            ['3', '4', '2', '2 from R', '[1, 2, 2]'],
            ['4', '4', '3', '3 from R', '[1, 2, 2, 3]'],
            ['5', '4', '6', '4 from L', '[1, 2, 2, 3, 4]'],
            ['6', '5', '6', '5 from L', '[1, 2, 2, 3, 4, 5]'],
            ['7', '7', '6', '6 from R', '[1, 2, 2, 3, 4, 5, 6]'],
            ['8', '7', 'empty', '7 from L', '[1, 2, 2, 3, 4, 5, 6, 7]']
          ]
        },
        {
          type: 'interactive',
          artifact: 'merge-sort-viz'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'MERGE loop invariant',
          text: 'Before each iteration k, A[p..k-1] contains the k-p smallest elements from L and R, in sorted order. The next output is the smaller current front element, so the invariant is maintained.'
        },
        {
          type: 'list',
          items: [
            'Initialization: before the first copy, the output prefix is empty, so it is sorted and contains the zero smallest elements.',
            'Maintenance: choosing the smaller front element appends the next smallest remaining item.',
            'Termination: after r-p+1 copies, the output prefix is the whole segment A[p..r], sorted and containing exactly the input elements.',
            'Recursive correctness: by induction on subarray length, the two recursive calls sort the halves, and MERGE combines them correctly.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'formula',
          latex: 'T(n) = 2T(n/2) + \\Theta(n) = \\Theta(n\\log n)',
          display: true,
          caption: 'Master theorem case 2: every recursion level costs Θ(n), and there are log₂ n levels.'
        },
        {
          type: 'table',
          caption: 'Merge sort properties.',
          columns: ['Property', 'Value', 'Why'],
          rows: [
            ['Worst-case time', 'Θ(n log n)', 'Splits are always balanced.'],
            ['Best-case time', 'Θ(n log n)', 'Standard merge sort still merges every level.'],
            ['Extra space', 'Θ(n)', 'MERGE uses auxiliary arrays or one auxiliary buffer.'],
            ['Stable?', 'Yes', 'Choose the left item first on equal keys.'],
            ['In-place?', 'Usually no', 'The simple efficient merge uses extra memory.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Know MERGE-SORT pseudocode, the MERGE invariant, and the recurrence T(n) = 2T(n/2) + Θ(n). Do not claim Θ(n) best case unless the algorithm has a special optimization that detects sorted runs.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u3l1-E1',
              source: 'Merge trace',
              question: 'Merge L = [1, 4, 9] and R = [2, 3, 10]. What is the output after four copies?',
              solution: 'Compare fronts: 1, then 2, then 3, then 4. After four copies the output is [1, 2, 3, 4].'
            },
            {
              id: 'u3l1-E2',
              source: 'Stability',
              question: 'Why does choosing from the left half first on equal keys make merge sort stable?',
              solution: 'An equal key that originally appeared earlier is in the left half when the tie crosses the split. Taking the left copy first preserves that relative order.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u3l1-M1',
              source: 'Recurrence',
              question: 'Solve T(n) = 2T(n/2) + n using a recursion-tree argument.',
              solution: 'At level i there are 2ⁱ subproblems of size n/2ⁱ, so total merge work per level is 2ⁱ * (n/2ⁱ) = n. There are log₂ n levels, so total work is Θ(n log n).'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'sort halves recursively, then merge.',
        problem: 'sort an array in worst-case O(n log n) time.',
        intuition: 'two sorted halves can be combined in linear time by walking pointers.',
        formal: 'MERGE-SORT(A, p, r): if p < r, q = (p+r)/2; recurse on (p,q) and (q+1,r); MERGE(A, p, q, r).',
        algorithm: 'MERGE walks two sorted subarrays with pointers, copies the smaller into the output, advances the chosen pointer.',
        worked: 'on [5, 2, 4, 7, 1, 3, 2, 6] the recursion bottoms out at length 1; merge upward to [1, 2, 2, 3, 4, 5, 6, 7].',
        correctness: 'MERGE invariant: the output is sorted and a permutation of the merged inputs.',
        complexity: 'T(n) = 2 T(n/2) + Θ(n) = Θ(n log n). Stable. Θ(n) extra space.',
        trace: 'animate the merge phase on the sample input above.',
        takeaways: 'classic Θ(n log n) baseline; the recurrence is the canonical Master case 2.',
        practice: 'modify MERGE to count inversions while it runs.'
      }),
      practice: [
        mcq('algods-u3-l1-q1', 'Merge sort uses how much extra memory beyond the input?',
          ['O(1)', 'O(log n)', 'Θ(n)', 'Θ(n²)'],
          2, 'The merge subroutine uses an auxiliary array of size up to n.')
      ]
    },
    {
      title: 'Heap operations',
      durationMinutes: 35,
      type: 'interactive',
      summary: 'MAX-HEAPIFY and BUILD-MAX-HEAP on the array representation.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A binary heap is a nearly complete binary tree stored inside an array. The tree shape is fixed by the array length, so there are no left or right pointers. MAX-HEAPIFY repairs one local violation by pushing a small key downward until the max-heap property is restored.'
        },
        {
          type: 'diagram',
          title: 'Array indices are the tree',
          caption: 'With 1-indexing, children of i are 2i and 2i+1. Parent of i is floor(i/2).',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 360" role="img" aria-label="Binary heap array to tree mapping">
  <rect x="12" y="12" width="816" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="420" y="42" text-anchor="middle" font-size="22" font-weight="800" fill="#0f2038">Max-heap array representation</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <g transform="translate(68 72)">
      <text x="0" y="14" font-size="13" fill="#64748b" text-anchor="start">A</text>
      <g font-size="14" font-weight="800">
        <rect x="34" y="0" width="54" height="42" rx="9" fill="#dcfce7" stroke="#16a34a"/><text x="61" y="27">16</text>
        <rect x="92" y="0" width="54" height="42" rx="9" fill="#eff6ff" stroke="#2563eb"/><text x="119" y="27">14</text>
        <rect x="150" y="0" width="54" height="42" rx="9" fill="#eff6ff" stroke="#2563eb"/><text x="177" y="27">10</text>
        <rect x="208" y="0" width="54" height="42" rx="9" fill="#fff7ed" stroke="#f59e0b"/><text x="235" y="27">8</text>
        <rect x="266" y="0" width="54" height="42" rx="9" fill="#fff7ed" stroke="#f59e0b"/><text x="293" y="27">7</text>
        <rect x="324" y="0" width="54" height="42" rx="9" fill="#fff7ed" stroke="#f59e0b"/><text x="351" y="27">9</text>
        <rect x="382" y="0" width="54" height="42" rx="9" fill="#fff7ed" stroke="#f59e0b"/><text x="409" y="27">3</text>
      </g>
      <g font-size="11" fill="#64748b">
        <text x="61" y="62">1</text><text x="119" y="62">2</text><text x="177" y="62">3</text><text x="235" y="62">4</text><text x="293" y="62">5</text><text x="351" y="62">6</text><text x="409" y="62">7</text>
      </g>
    </g>
    <g transform="translate(0 142)">
      <line x1="420" y1="42" x2="295" y2="102" stroke="#94a3b8" stroke-width="2"/>
      <line x1="420" y1="42" x2="545" y2="102" stroke="#94a3b8" stroke-width="2"/>
      <line x1="295" y1="132" x2="215" y2="190" stroke="#94a3b8" stroke-width="2"/>
      <line x1="295" y1="132" x2="375" y2="190" stroke="#94a3b8" stroke-width="2"/>
      <line x1="545" y1="132" x2="485" y2="190" stroke="#94a3b8" stroke-width="2"/>
      <line x1="545" y1="132" x2="625" y2="190" stroke="#94a3b8" stroke-width="2"/>
      <g font-size="16" font-weight="900" fill="#0f2038">
        <circle cx="420" cy="40" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="420" y="46">16</text>
        <circle cx="295" cy="118" r="28" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="295" y="124">14</text>
        <circle cx="545" cy="118" r="28" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="545" y="124">10</text>
        <circle cx="215" cy="206" r="25" fill="#fff7ed" stroke="#f59e0b" stroke-width="2"/><text x="215" y="212">8</text>
        <circle cx="375" cy="206" r="25" fill="#fff7ed" stroke="#f59e0b" stroke-width="2"/><text x="375" y="212">7</text>
        <circle cx="485" cy="206" r="25" fill="#fff7ed" stroke="#f59e0b" stroke-width="2"/><text x="485" y="212">9</text>
        <circle cx="625" cy="206" r="25" fill="#fff7ed" stroke="#f59e0b" stroke-width="2"/><text x="625" y="212">3</text>
      </g>
    </g>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'table',
          caption: 'Heap operations and index rules.',
          columns: ['Concept', 'Definition', 'Cost'],
          rows: [
            ['Max-heap property', 'For every node i except the root, A[parent(i)] >= A[i].', 'A structural invariant.'],
            ['parent(i)', 'floor(i/2)', 'Θ(1)'],
            ['left(i)', '2i', 'Θ(1)'],
            ['right(i)', '2i + 1', 'Θ(1)'],
            ['MAX-HEAPIFY(A, i)', 'Assuming the left and right subtrees are heaps, repair the subtree rooted at i.', 'O(log n)'],
            ['BUILD-MAX-HEAP(A)', 'Call MAX-HEAPIFY bottom-up from floor(n/2) down to 1.', 'Θ(n)']
          ]
        },
        {
          type: 'heading',
          text: 'Step-by-step algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'MAX-HEAPIFY and BUILD-MAX-HEAP',
          language: 'pseudocode',
          code: `MAX-HEAPIFY(A, i)
    l = left(i)
    r = right(i)
    largest = i
    if l <= heap-size[A] and A[l] > A[largest]
        largest = l
    if r <= heap-size[A] and A[r] > A[largest]
        largest = r
    if largest != i
        exchange A[i] with A[largest]
        MAX-HEAPIFY(A, largest)

BUILD-MAX-HEAP(A)
    heap-size[A] = length[A]
    for i = floor(length[A] / 2) downto 1
        MAX-HEAPIFY(A, i)`
        },
        {
          type: 'interactive',
          artifact: 'heapify-viz'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'MAX-HEAPIFY claim',
          text: 'If the left and right subtrees of i are max-heaps before the call, then the subtree rooted at i is a max-heap after MAX-HEAPIFY(A, i).'
        },
        {
          type: 'list',
          items: [
            'If A[i] is already at least both children, the max-heap property holds at i and the subtrees were already heaps.',
            'Otherwise, swap A[i] with the larger child. The larger child becomes the parent of the three involved keys, so heap order is fixed at i.',
            'The only possible new violation is lower in the child subtree where the smaller key moved. The recursive call repairs exactly that subtree.',
            'BUILD-MAX-HEAP processes internal nodes in reverse level order. When node i is processed, both children roots are already heaps, so MAX-HEAPIFY is valid.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\text{MAX-HEAPIFY height cost} = O(h) = O(\\log n)',
          display: true,
          caption: 'A sift-down path can move at most from the root to a leaf.'
        },
        {
          type: 'formula',
          latex: '\\sum_{h=0}^{\\lfloor \\log n \\rfloor} \\left\\lceil \\frac{n}{2^{h+1}} \\right\\rceil O(h) = O(n)',
          display: true,
          caption: 'BUILD-MAX-HEAP is linear because most nodes are near the leaves and have small height.'
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common pitfalls',
          text: 'Calling MAX-HEAPIFY n times and saying each call costs O(log n) gives O(n log n), but that is only a loose upper bound. The tight bound for BUILD-MAX-HEAP is Θ(n).'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u3l2-E1',
              source: 'Index arithmetic',
              question: 'In a 1-indexed heap array, what are the children of index 6?',
              solution: 'left(6) = 12 and right(6) = 13. If those indices exceed heap-size, the node has no such child.'
            },
            {
              id: 'u3l2-E2',
              source: 'Heap property',
              question: 'Is [16, 14, 10, 8, 7, 9, 3] a max-heap?',
              solution: 'Yes. 16 >= 14,10; 14 >= 8,7; 10 >= 9,3. Every parent is at least its children.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u3l2-M1',
              source: 'Build heap',
              question: 'Why does BUILD-MAX-HEAP start at floor(n/2) rather than n?',
              solution: 'Indices floor(n/2)+1 through n are leaves. A leaf is already a heap of size 1, so calling MAX-HEAPIFY on leaves is unnecessary.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'a binary heap is an array; parent-child relations are index arithmetic.',
        problem: 'maintain a heap so that "largest" is always at the root in O(log n) time.',
        intuition: 'sift-down: if a node violates heap order, swap with the larger child and recurse.',
        formal: 'parent(i) = floor(i/2); left(i) = 2i; right(i) = 2i+1.',
        algorithm: 'MAX-HEAPIFY(A, i): pick the largest of A[i], A[left(i)], A[right(i)]; if not i, swap and recurse.',
        worked: 'BUILD-MAX-HEAP from [4, 1, 3, 2, 16, 9, 10, 14, 8, 7] runs MAX-HEAPIFY at i = 5..1 and ends with [16, 14, 10, 8, 7, 9, 3, 2, 4, 1].',
        correctness: 'invariant: when MAX-HEAPIFY(A, i) returns, the subtree rooted at i is a max-heap.',
        complexity: 'MAX-HEAPIFY: O(log n). BUILD-MAX-HEAP: Θ(n) (tighter than the obvious n log n).',
        trace: 'animate sift-down on a 10-element heap; see why BUILD is linear.',
        takeaways: 'array representation makes heaps cache-friendly; BUILD-MAX-HEAP is Θ(n), not Θ(n log n).',
        practice: 'argue why BUILD-MAX-HEAP is Θ(n) using the height-based summation.'
      }),
      practice: [
        mcq('algods-u3-l2-q1', 'BUILD-MAX-HEAP runs in:',
          ['Θ(n²)', 'Θ(n log n)', 'Θ(n)', 'Θ(log n)'],
          2, 'A tight summation over heights gives Θ(n).')
      ]
    },
    {
      title: 'Heapsort',
      durationMinutes: 30,
      type: 'interactive',
      summary: 'Sort in place using a max-heap.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Heapsort turns a max-heap into a sorted array. The largest remaining item is always at A[1]. Swap it to the end, shrink the heap by one, and repair the root with MAX-HEAPIFY. The array is split into two regions: a heap prefix and a sorted suffix.'
        },
        {
          type: 'diagram',
          title: 'Heap prefix, sorted suffix',
          caption: 'After each extraction, the heap gets smaller and the sorted suffix grows from right to left.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 260" role="img" aria-label="Heapsort heap prefix and sorted suffix">
  <rect x="12" y="12" width="816" height="236" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="420" y="44" text-anchor="middle" font-size="22" font-weight="800" fill="#0f2038">HEAPSORT keeps two regions inside the same array</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <text x="255" y="82" font-size="14" font-weight="800" fill="#2563eb">heap prefix: not sorted, but A[1] is maximum</text>
    <text x="626" y="82" font-size="14" font-weight="800" fill="#b45309">sorted suffix: final positions</text>
    <g font-size="17" font-weight="900">
      <rect x="80" y="108" width="62" height="54" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="111" y="142">14</text>
      <rect x="150" y="108" width="62" height="54" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="181" y="142">8</text>
      <rect x="220" y="108" width="62" height="54" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="251" y="142">10</text>
      <rect x="290" y="108" width="62" height="54" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="321" y="142">4</text>
      <rect x="360" y="108" width="62" height="54" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="391" y="142">7</text>
      <rect x="438" y="108" width="62" height="54" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="469" y="142">16</text>
      <rect x="508" y="108" width="62" height="54" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="539" y="142">18</text>
      <rect x="578" y="108" width="62" height="54" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="609" y="142">21</text>
      <rect x="648" y="108" width="62" height="54" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="679" y="142">30</text>
    </g>
    <line x1="428" y1="96" x2="428" y2="178" stroke="#64748b" stroke-width="2" stroke-dasharray="6 4"/>
    <text x="428" y="200" font-size="13" fill="#475569">heap-size boundary</text>
    <text x="420" y="230" font-size="15" font-weight="800" fill="#0f2038">Repeat: swap root with last heap cell, shrink heap-size, heapify root.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Step-by-step algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'HEAPSORT',
          language: 'pseudocode',
          code: `HEAPSORT(A)
    BUILD-MAX-HEAP(A)
    for i = length[A] downto 2
        exchange A[1] with A[i]
        heap-size[A] = heap-size[A] - 1
        MAX-HEAPIFY(A, 1)`
        },
        {
          type: 'interactive',
          artifact: 'heapsort-viz'
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'table',
          caption: 'First iterations after BUILD-MAX-HEAP on [4, 1, 3, 2, 16, 9, 10, 14, 8, 7].',
          columns: ['Iteration', 'Action', 'Heap prefix after repair', 'Sorted suffix'],
          rows: [
            ['Start', 'Build heap', '[16, 14, 10, 8, 7, 9, 3, 2, 4, 1]', '[]'],
            ['1', 'Move 16 to the end, heapify size 9', '[14, 8, 10, 4, 7, 9, 3, 2, 1]', '[16]'],
            ['2', 'Move 14 to the end, heapify size 8', '[10, 8, 9, 4, 7, 1, 3, 2]', '[14, 16]'],
            ['3', 'Move 10 to the end, heapify size 7', '[9, 8, 3, 4, 7, 1, 2]', '[10, 14, 16]']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Loop invariant',
          text: 'At the start of each loop iteration with index i, A[1..i] is a max-heap containing the remaining unsorted elements, and A[i+1..n] contains the largest elements in sorted order.'
        },
        {
          type: 'list',
          items: [
            'Initialization: after BUILD-MAX-HEAP, A[1..n] is a max-heap and the sorted suffix is empty.',
            'Maintenance: A[1] is the largest remaining element, so swapping it with A[i] places it into its final position. MAX-HEAPIFY repairs the reduced heap A[1..i-1].',
            'Termination: when i = 1, the suffix A[2..n] is sorted and contains the largest n-1 elements, so A[1..n] is sorted.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\Theta(n) + (n-1)\\,O(\\log n) = \\Theta(n\\log n)',
          display: true,
          caption: 'Build heap is Θ(n), then there are n-1 heapify calls of height O(log n).'
        },
        {
          type: 'table',
          caption: 'How heapsort compares with earlier sorts.',
          columns: ['Algorithm', 'Worst-case time', 'Extra space', 'Stable?', 'Main advantage'],
          rows: [
            ['Insertion sort', 'Θ(n²)', 'Θ(1)', 'Yes', 'Fast on nearly sorted small arrays.'],
            ['Merge sort', 'Θ(n log n)', 'Θ(n)', 'Yes', 'Stable and predictable.'],
            ['Heapsort', 'Θ(n log n)', 'Θ(1)', 'No', 'Worst-case optimal and in-place.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Heapsort is in-place and worst-case Θ(n log n), but not stable. The proof is a loop invariant on the heap prefix and sorted suffix.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u3l3-E1',
              source: 'One extraction',
              question: 'In a max-heap, why does swapping A[1] with A[heap-size] put one element into final sorted position?',
              solution: 'A[1] is the maximum of the heap. In ascending order, the maximum belongs at the far right of the remaining unsorted region.'
            },
            {
              id: 'u3l3-E2',
              source: 'Stability',
              question: 'Why is heapsort not stable in its standard form?',
              solution: 'Heap swaps can move equal keys across each other. The algorithm preserves heap order, not the original relative order of equal keys.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u3l3-M1',
              source: 'Invariant proof',
              question: 'State the heapsort loop invariant in terms of the heap prefix and sorted suffix.',
              solution: 'At the start of each iteration, A[1..i] is a max-heap containing exactly the elements not yet placed, and A[i+1..n] contains the largest original elements in increasing order. The next swap places the maximum of A[1..i] at A[i].'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'BUILD-MAX-HEAP, then repeatedly extract max into the back of the array.',
        problem: 'sort in O(n log n) worst case using O(1) extra space.',
        intuition: 'the heap shrinks by one each step; the array suffix becomes the sorted output.',
        formal: 'HEAPSORT(A): BUILD-MAX-HEAP(A); for i = n..2: swap A[1] and A[i]; heap-size --; MAX-HEAPIFY(A, 1).',
        algorithm: 'see formal section.',
        worked: 'on a 10-element array we extract 10 maxima one by one.',
        correctness: 'heap invariant ensures A[1] is always the max of the remaining heap; suffix grows sorted.',
        complexity: 'Θ(n log n) worst case. In-place. Not stable.',
        trace: 'walk three iterations of the extract loop.',
        takeaways: 'heapsort matches merge sort asymptotically and is in-place, but is not stable.',
        practice: 'compare to merge sort empirically: which has lower constant factors?'
      }),
      practice: [
        mcq('algods-u3-l3-q1', 'Is heapsort stable?',
          ['Yes.', 'No.', 'Only on sorted input.', 'Only with a tie-breaker.'],
          1, 'Heap operations move equal keys past each other arbitrarily; heapsort is not stable.')
      ]
    },
    {
      title: 'Quicksort',
      durationMinutes: 40,
      type: 'interactive',
      summary: 'Partition around a pivot and recurse.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Quicksort sorts by choosing a pivot, rearranging the subarray so smaller keys are on the left and larger keys are on the right, and then recursively sorting the two sides. Unlike merge sort, quicksort does the rearranging before the recursive calls. Once the pivot is placed between the two regions, that pivot is in its final sorted position.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'The central idea',
          text: 'Partition is the whole engine. If partition returns a pivot index q, then every key left of q is at most the pivot and every key right of q is greater than the pivot. The recursive calls never need to touch the pivot again.'
        },
        {
          type: 'diagram',
          title: 'Partition first, then recurse',
          caption: 'The pivot separates the problem into two independent subproblems.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 260" role="img" aria-label="Quicksort partition diagram">
  <rect x="12" y="12" width="836" height="236" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">PARTITION around pivot 4</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-size="16">
    <text x="430" y="82" fill="#52627a">Input A[p..r] = [2, 8, 7, 1, 3, 5, 6, 4]</text>
    <rect x="78" y="112" width="74" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="115" y="143" font-weight="900">2</text>
    <rect x="160" y="112" width="74" height="50" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="197" y="143" font-weight="900">8</text>
    <rect x="242" y="112" width="74" height="50" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="279" y="143" font-weight="900">7</text>
    <rect x="324" y="112" width="74" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="361" y="143" font-weight="900">1</text>
    <rect x="406" y="112" width="74" height="50" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="443" y="143" font-weight="900">3</text>
    <rect x="488" y="112" width="74" height="50" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="525" y="143" font-weight="900">5</text>
    <rect x="570" y="112" width="74" height="50" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="607" y="143" font-weight="900">6</text>
    <rect x="652" y="112" width="74" height="50" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="689" y="143" font-weight="900">4</text>
    <text x="430" y="198" fill="#0f2038" font-weight="800">After partition: [2, 1, 3]  |  4  |  [7, 5, 6, 8]</text>
    <text x="245" y="226" fill="#047857" font-weight="700">left side <= pivot</text>
    <text x="430" y="226" fill="#b45309" font-weight="700">pivot fixed</text>
    <text x="618" y="226" fill="#b91c1c" font-weight="700">right side > pivot</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Formal version',
          level: 2
        },
        {
          type: 'code',
          title: 'QUICKSORT with Lomuto partition',
          language: 'pseudocode',
          code: `QUICKSORT(A, p, r)
    if p < r
        q = PARTITION(A, p, r)
        QUICKSORT(A, p, q - 1)
        QUICKSORT(A, q + 1, r)

PARTITION(A, p, r)
    x = A[r]
    i = p - 1
    for j = p to r - 1
        if A[j] <= x
            i = i + 1
            exchange A[i] with A[j]
    exchange A[i + 1] with A[r]
    return i + 1`
        },
        {
          type: 'interactive',
          artifact: 'quicksort-partition-viz'
        },
        {
          type: 'heading',
          text: 'Worked partition trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Lomuto partition on [2, 8, 7, 1, 3, 5, 6, 4], pivot x = 4.',
          columns: ['Scan j', 'A[j]', 'Action', 'Array state'],
          rows: [
            ['1', '2', '2 <= 4, keep it in the <= region', '[2, 8, 7, 1, 3, 5, 6, 4]'],
            ['2', '8', '8 > 4, leave it in the > region', '[2, 8, 7, 1, 3, 5, 6, 4]'],
            ['3', '7', '7 > 4, leave it in the > region', '[2, 8, 7, 1, 3, 5, 6, 4]'],
            ['4', '1', '1 <= 4, swap with first > item 8', '[2, 1, 7, 8, 3, 5, 6, 4]'],
            ['5', '3', '3 <= 4, swap with first > item 7', '[2, 1, 3, 8, 7, 5, 6, 4]'],
            ['6', '5', '5 > 4, leave it in the > region', '[2, 1, 3, 8, 7, 5, 6, 4]'],
            ['7', '6', '6 > 4, leave it in the > region', '[2, 1, 3, 8, 7, 5, 6, 4]'],
            ['final', 'pivot 4', 'swap pivot with first > item 8', '[2, 1, 3, 4, 7, 5, 6, 8]']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Partition loop invariant',
          text: 'At the start of each iteration j, A[p..i] contains keys at most x, A[i+1..j-1] contains keys greater than x, A[j..r-1] is unexamined, and A[r] is the pivot x.'
        },
        {
          type: 'list',
          items: [
            'Initialization: before the scan, both classified regions are empty, so the invariant is true.',
            'Maintenance: if A[j] <= x, the algorithm expands the <= region by swapping A[j] after A[i]. If A[j] > x, it simply expands the > region.',
            'Termination: after the scan, all non-pivot keys are classified. Swapping A[i+1] with A[r] places the pivot between the <= and > regions.',
            'Recursive correctness: by induction, quicksort correctly sorts the left and right subarrays; the pivot already sits between them in final position.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'formula',
          latex: 'T(n) = T(k) + T(n-k-1) + \\Theta(n)',
          display: true,
          caption: 'Partition is linear; k is the number of elements placed left of the pivot.'
        },
        {
          type: 'table',
          caption: 'Quicksort cases for one fixed pivot rule.',
          columns: ['Split pattern', 'Recurrence shape', 'Runtime'],
          rows: [
            ['Perfectly balanced', 'T(n) = 2T(n/2) + Θ(n)', 'Θ(n log n)'],
            ['Constant-fraction split, such as 1/4 and 3/4', 'T(n) = T(n/4) + T(3n/4) + Θ(n)', 'Θ(n log n)'],
            ['Always smallest or largest pivot', 'T(n) = T(n-1) + Θ(n)', 'Θ(n²)']
          ]
        },
        {
          type: 'table',
          caption: 'Quicksort properties.',
          columns: ['Property', 'Value', 'Why'],
          rows: [
            ['Best-case time', 'Θ(n log n)', 'Balanced partitions at every level.'],
            ['Average-case time', 'Θ(n log n)', 'Random input usually gives balanced-enough pivots.'],
            ['Worst-case time', 'Θ(n²)', 'A deterministic bad pivot can leave one side empty repeatedly.'],
            ['Extra space', 'Θ(log n) average, Θ(n) worst', 'The recursion stack depth follows the partition depth.'],
            ['Stable?', 'No in the standard in-place version', 'Partition swaps can move equal keys across each other.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Be precise about which partition scheme you are using. In Lomuto partition the pivot ends at its final index. In Hoare partition the returned index is a split point, not necessarily the pivot final position.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u3l4-E1',
              source: 'Partition trace',
              question: 'Run Lomuto partition on [3, 2, 5, 1, 4] with pivot 4. What array is returned after the final pivot swap?',
              solution: 'The values 3, 2, and 1 are at most 4; 5 is greater. The final array is [3, 2, 1, 4, 5], and the pivot index is 4 in 1-based indexing.'
            },
            {
              id: 'u3l4-E2',
              source: 'Worst case',
              question: 'Why does choosing the first element as pivot make sorted input bad?',
              solution: 'On an increasing sorted array, the first element is always the smallest remaining key. Partition produces one empty side and one side of size n-1, so the recurrence is T(n) = T(n-1) + Θ(n) = Θ(n²).'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u3l4-M1',
              source: 'Recurrence',
              question: 'Solve T(n) = T(n/4) + T(3n/4) + cn using a recursion-tree intuition.',
              solution: 'Every level of the recursion tree does at most cn total partition work because subproblem sizes on the same level sum to at most n. The longest path repeatedly takes the 3n/4 side, so the depth is O(log n). Thus T(n) = O(n log n), and every element participates in Ω(log n) levels for balanced-enough splits, giving Θ(n log n).'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'partition the array around a pivot, then sort the two halves recursively.',
        problem: 'sort fast in the average case with a small constant factor.',
        intuition: 'pick any element as pivot; rearrange so smaller elements are left, larger right; recurse.',
        formal: 'QUICKSORT(A, p, r): if p < r, q = PARTITION(A, p, r); QUICKSORT(A, p, q-1); QUICKSORT(A, q+1, r).',
        algorithm: 'Lomuto: scan with two indices, swap when smaller than pivot; final swap places pivot. Hoare: two pointers move toward each other.',
        worked: 'on [2, 8, 7, 1, 3, 5, 6, 4] with pivot 4 (Lomuto), final partition is [2, 1, 3, 4, 7, 5, 6, 8].',
        correctness: 'PARTITION invariant: A[p..i] <= pivot and A[i+1..j-1] > pivot.',
        complexity: 'best/average Θ(n log n); worst Θ(n²) on already-sorted input with first-element pivot.',
        trace: 'animate Lomuto partition with a step counter for swaps.',
        takeaways: 'pivot choice is everything; bad pivots make quicksort quadratic.',
        practice: 'identify which input makes Lomuto partition with a first-element pivot quadratic.'
      }),
      practice: [
        mcq('algods-u3-l4-q1', 'Quicksort with a "first element" pivot has worst-case time:',
          ['Θ(n)', 'Θ(n log n)', 'Θ(n²)', 'Θ(n³)'],
          2, 'Already-sorted input forces unbalanced partitions on every recursive call.')
      ]
    },
    {
      title: 'Randomised quicksort',
      durationMinutes: 30,
      type: 'video',
      summary: 'Random pivots give Θ(n log n) expected time on every fixed input.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Deterministic quicksort can be tricked by an input that repeatedly gives the worst pivot. Randomised quicksort changes the question: before partitioning, it chooses a pivot uniformly at random from the current subarray. The input is no longer enough to determine the recursion tree.'
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Important precision',
          text: 'Randomisation does not remove the Θ(n²) worst possible run. It removes the fixed adversarial input: for every fixed input, the expected running time over the algorithm\'s random pivot choices is Θ(n log n).'
        },
        {
          type: 'diagram',
          title: 'Random pivot before partition',
          caption: 'The random index is swapped into the pivot position, then the usual partition routine runs.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 300" role="img" aria-label="Randomised quicksort pivot diagram">
  <defs>
    <marker id="u3rq-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="836" height="276" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">RANDOMIZED-PARTITION(A, p, r)</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <text x="430" y="82" font-size="15" fill="#52627a">Pick i uniformly from p..r, swap A[i] with A[r], then partition.</text>
    <rect x="90" y="118" width="92" height="52" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="136" y="150" font-size="19" font-weight="900">3</text>
    <rect x="190" y="118" width="92" height="52" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="236" y="150" font-size="19" font-weight="900">1</text>
    <rect x="290" y="118" width="92" height="52" rx="12" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="336" y="150" font-size="19" font-weight="900">4</text>
    <rect x="390" y="118" width="92" height="52" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="436" y="150" font-size="19" font-weight="900">1</text>
    <rect x="490" y="118" width="92" height="52" rx="12" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="536" y="150" font-size="19" font-weight="900">5</text>
    <rect x="590" y="118" width="92" height="52" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="636" y="150" font-size="19" font-weight="900">9</text>
    <line x1="350" y1="184" x2="610" y2="184" stroke="#64748b" stroke-width="2" marker-end="url(#u3rq-arrow)"/>
    <text x="480" y="211" font-size="14" fill="#52627a">swap chosen key with A[r]</text>
    <rect x="90" y="230" width="92" height="38" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="136" y="255" font-size="14" font-weight="800">left</text>
    <rect x="288" y="230" width="92" height="38" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="334" y="255" font-size="14" font-weight="800">pivot</text>
    <rect x="486" y="230" width="92" height="38" rx="10" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="532" y="255" font-size="14" font-weight="800">right</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'RANDOMIZED-QUICKSORT',
          language: 'pseudocode',
          code: `RANDOMIZED-QUICKSORT(A, p, r)
    if p < r
        q = RANDOMIZED-PARTITION(A, p, r)
        RANDOMIZED-QUICKSORT(A, p, q - 1)
        RANDOMIZED-QUICKSORT(A, q + 1, r)

RANDOMIZED-PARTITION(A, p, r)
    i = RANDOM(p, r)
    exchange A[i] with A[r]
    return PARTITION(A, p, r)`
        },
        {
          type: 'interactive',
          artifact: 'randomized-quicksort-viz'
        },
        {
          type: 'heading',
          text: 'Why the expected time is Θ(n log n)',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'One intuitive proof is the good-split argument. A pivot whose rank lies in the middle half of the subarray leaves both sides with size at most 3n/4. A uniformly random pivot lands in that middle half with probability at least 1/2, so long chains of bad splits are unlikely.'
        },
        {
          type: 'formula',
          latex: '\\Pr[\\text{middle-half pivot}] \\ge \\frac{1}{2}',
          display: true,
          caption: 'A constant probability of a constant-factor split is enough for logarithmic expected depth.'
        },
        {
          type: 'paragraph',
          text: 'The cleaner CLRS proof counts comparisons directly. Sort the input conceptually as z1 < z2 < ... < zn. Two keys zi and zj are compared only if the first pivot chosen from the set zi, zi+1, ..., zj is one of those two endpoints.'
        },
        {
          type: 'formula',
          latex: '\\Pr[z_i\\text{ is compared with }z_j] = \\frac{2}{j-i+1}',
          display: true,
          caption: 'Only the two endpoints cause the pair to be compared.'
        },
        {
          type: 'formula',
          latex: '\\mathbb{E}[X] = \\sum_{1\\le i<j\\le n} \\frac{2}{j-i+1} = 2(n+1)H_n - 4n = \\Theta(n\\log n)',
          display: true,
          caption: 'Expected comparisons over all pairs.'
        },
        {
          type: 'table',
          caption: 'Deterministic versus randomised quicksort.',
          columns: ['Version', 'Bad input?', 'Worst run', 'Expected time'],
          rows: [
            ['Fixed first-element pivot', 'Sorted or reverse-sorted input', 'Θ(n²)', 'Depends on the input distribution.'],
            ['Fixed last-element pivot', 'Sorted or reverse-sorted input', 'Θ(n²)', 'Depends on the input distribution.'],
            ['Random pivot', 'No fixed input forces it', 'Θ(n²) is still possible', 'Θ(n log n) for every fixed input.']
          ]
        },
        {
          type: 'heading',
          text: 'What randomisation does and does not prove',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Correctness is unchanged: any chosen pivot gives a valid partition, so the recursive correctness proof from ordinary quicksort still applies.',
            'Expected time is over the algorithm\'s random choices, not necessarily over random inputs.',
            'The worst-case running time of a particular unlucky run remains Θ(n²).',
            'The probability of repeatedly choosing extreme pivots is tiny, which is why randomised quicksort is robust in practice.'
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Say "expected Θ(n log n) for every fixed input" rather than "worst-case Θ(n log n)". Randomisation protects against input order, not against every possible sequence of coin flips.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u3l5-E1',
              source: 'Random pivot',
              question: 'What changes between QUICKSORT and RANDOMIZED-QUICKSORT?',
              solution: 'Before partitioning, RANDOMIZED-PARTITION chooses an index uniformly at random from p..r and swaps that element into the pivot position. The rest of partition and recursion is the same.'
            },
            {
              id: 'u3l5-E2',
              source: 'Expected versus worst',
              question: 'Does randomised quicksort have Θ(n log n) worst-case time?',
              solution: 'No. A run that repeatedly chooses the smallest or largest remaining key still takes Θ(n²). The guarantee is expected Θ(n log n) over random pivot choices.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u3l5-M1',
              source: 'Indicator variables',
              question: 'For sorted ranks zi and zj with i < j, why is Pr[zi and zj are compared] = 2/(j-i+1)?',
              solution: 'The pair can be compared only when one of zi or zj is selected as pivot before any element with rank between them. Among the j-i+1 elements from zi through zj, the first selected pivot is uniformly random. The favorable choices are exactly the two endpoints, so the probability is 2/(j-i+1).'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'choose a random pivot; expected runtime is Θ(n log n).',
        problem: 'eliminate adversarial inputs that make deterministic quicksort quadratic.',
        intuition: 'on average a random pivot lands somewhere in the middle two-thirds of the array; recursion is balanced enough.',
        formal: 'expected number of comparisons is O(n log n); proof uses indicator random variables.',
        algorithm: 'identical to QUICKSORT but pivot index = uniform random in [p, r].',
        worked: 'expected comparisons over a random pivot are sum of 2/(j-i+1) which gives 2 H_n n = O(n log n).',
        correctness: 'works with any input distribution because the algorithm itself is randomised.',
        complexity: 'expected Θ(n log n); worst case still Θ(n²) but with vanishing probability.',
        trace: 'simulate three random pivot choices on [3, 1, 4, 1, 5, 9, 2, 6, 5, 3].',
        takeaways: 'randomness moves "worst case" from "this input" to "this run".',
        practice: 'derive the expected number of comparisons via indicator variables.'
      }),
      practice: [
        mcq('algods-u3-l5-q1', 'Why is randomised quicksort robust to adversarial inputs?',
          ['It is in-place.', 'The pivot is a random function of the run, not of the input.', 'It uses merging.', 'It does not compare elements.'],
          1, 'Adversaries cannot guess the random pivot, so they cannot force the worst case.')
      ]
    },
    {
      title: 'Lower bound for comparison sorting',
      durationMinutes: 25,
      type: 'video',
      summary: 'Decision-tree argument: comparison sorting needs Ω(n log n) comparisons in the worst case.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Merge sort, heapsort, and good quicksort runs all achieve Θ(n log n). The comparison-sorting lower bound explains why that is the best possible asymptotic worst-case guarantee if the algorithm learns about keys only by comparing two keys at a time.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Comparison sort',
          text: 'A comparison sort may inspect key order only through questions such as "is A[i] <= A[j]?". It may move items, swap items, and use memory, but all information about the relative order of keys comes from comparisons.'
        },
        {
          type: 'diagram',
          title: 'Decision tree fragment',
          caption: 'Each internal node is a comparison. A complete correct tree needs at least one leaf for each possible input order.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 330" role="img" aria-label="Decision tree lower bound diagram">
  <defs>
    <marker id="u3lb-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="836" height="306" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Comparison sorting as a binary decision tree</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <rect x="365" y="70" width="130" height="42" rx="12" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="430" y="97" font-size="15" font-weight="800">compare a,b</text>
    <line x1="395" y1="112" x2="270" y2="158" stroke="#64748b" stroke-width="2" marker-end="url(#u3lb-arrow)"/>
    <line x1="465" y1="112" x2="590" y2="158" stroke="#64748b" stroke-width="2" marker-end="url(#u3lb-arrow)"/>
    <rect x="205" y="162" width="130" height="42" rx="12" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <text x="270" y="189" font-size="15" font-weight="800">compare b,c</text>
    <rect x="525" y="162" width="130" height="42" rx="12" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <text x="590" y="189" font-size="15" font-weight="800">compare a,c</text>
    <line x1="245" y1="204" x2="150" y2="250" stroke="#64748b" stroke-width="2" marker-end="url(#u3lb-arrow)"/>
    <line x1="295" y1="204" x2="360" y2="250" stroke="#64748b" stroke-width="2" marker-end="url(#u3lb-arrow)"/>
    <line x1="565" y1="204" x2="500" y2="250" stroke="#64748b" stroke-width="2" marker-end="url(#u3lb-arrow)"/>
    <line x1="615" y1="204" x2="710" y2="250" stroke="#64748b" stroke-width="2" marker-end="url(#u3lb-arrow)"/>
    <g font-size="14" font-weight="900">
      <rect x="88" y="256" width="124" height="36" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="150" y="279">one leaf</text>
      <rect x="298" y="256" width="124" height="36" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="360" y="279">one leaf</text>
      <rect x="438" y="256" width="124" height="36" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="500" y="279">one leaf</text>
      <rect x="648" y="256" width="124" height="36" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="710" y="279">one leaf</text>
    </g>
    <text x="430" y="310" font-size="14" fill="#52627a">This is only a fragment; for n distinct keys, a correct full tree needs at least n! leaves.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Decision-tree model',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Each internal node is one comparison between two keys.',
            'The two outgoing edges represent the two possible answers to that comparison.',
            'Each root-to-leaf path is one possible execution of the sorting algorithm.',
            'For distinct input keys, a correct comparison sort must be able to output all n! possible sorted orders.'
          ]
        },
        {
          type: 'interactive',
          artifact: 'comparison-sort-lower-bound-viz'
        },
        {
          type: 'heading',
          text: 'The lower-bound proof',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A binary tree of height h has at most 2^h leaves. A correct comparison sort needs at least n! leaves, because each permutation of distinct keys must lead to a leaf that identifies the right sorted order. Therefore the height, which is the worst-case number of comparisons, must be at least lg(n!).'
        },
        {
          type: 'formula',
          latex: '2^h \\ge n! \\quad\\Longrightarrow\\quad h \\ge \\lg(n!)',
          display: true,
          caption: 'The tree needs enough leaves to distinguish all permutations.'
        },
        {
          type: 'formula',
          latex: '\\lg(n!) = \\Theta(n\\log n)',
          display: true,
          caption: 'This follows from Stirling\'s approximation, or from summing logs.'
        },
        {
          type: 'formula',
          latex: 'h = \\Omega(n\\log n)',
          display: true,
          caption: 'Every comparison sort has a worst-case input requiring this many comparisons.'
        },
        {
          type: 'table',
          caption: 'What the lower bound says.',
          columns: ['Question', 'Answer', 'Reason'],
          rows: [
            ['Does it apply to merge sort?', 'Yes', 'Merge sort is comparison-based.'],
            ['Does it apply to heapsort?', 'Yes', 'Heap order is discovered by comparisons.'],
            ['Does it apply to counting sort?', 'No', 'Counting sort uses key values as array indices, not only comparisons.'],
            ['Does it rule out Θ(n) best cases?', 'No', 'A decision tree may have shallow leaves; the bound is about worst-case height.'],
            ['Does it prove optimality?', 'Yes for comparison sorting', 'Merge sort and heapsort match the Ω(n log n) lower bound with O(n log n) upper bounds.']
          ]
        },
        {
          type: 'heading',
          text: 'A direct bound without Stirling',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'For n >= 2, the last n/2 factors in n! are all at least n/2. Therefore n! >= (n/2)^(n/2), so lg(n!) >= (n/2) lg(n/2) = Ω(n log n). Stirling gives the sharper asymptotic expression, but this simpler inequality is enough for the lower bound.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'State the model first. The Ω(n log n) lower bound is for comparison sorting with distinct keys. Linear-time integer sorts escape the bound by using extra information about key ranges.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u3l6-E1',
              source: 'Leaves',
              question: 'Why must the decision tree have at least n! leaves?',
              solution: 'There are n! possible input permutations of n distinct keys. A correct comparison sort must distinguish enough cases to output the correct ordering for each permutation, so the tree needs at least one reachable leaf per permutation.'
            },
            {
              id: 'u3l6-E2',
              source: 'Scope',
              question: 'Why does this proof not apply to counting sort?',
              solution: 'Counting sort does not learn only through pairwise comparisons. It uses integer key values to index a count array, so it is outside the comparison-tree model.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u3l6-M1',
              source: 'Lower-bound derivation',
              question: 'Use n! >= (n/2)^(n/2) to show lg(n!) = Ω(n log n).',
              solution: 'Taking lg of both sides gives lg(n!) >= lg((n/2)^(n/2)) = (n/2)lg(n/2) = (n/2)(lg n - 1), which is Ω(n log n).'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'a comparison sort is a decision tree on n!; worst-case depth is at least lg(n!) = Ω(n log n).',
        problem: 'is Θ(n log n) the best possible for comparison-based sorts?',
        intuition: 'each comparison gives one bit; you need lg(n!) bits to distinguish n! permutations.',
        formal: 'the decision tree has at least n! leaves; binary trees with n! leaves have depth >= lg(n!).',
        algorithm: 'no algorithm here; this is a lower-bound argument.',
        worked: 'lg(n!) = n lg n - n lg e + O(log n) by Stirling.',
        correctness: 'every comparison sort can be modelled as a decision tree.',
        complexity: 'lower bound: Ω(n log n) comparisons in the worst case.',
        trace: 'draw the decision tree for sorting 3 elements; verify depth >= 3.',
        takeaways: 'merge sort, heapsort, randomised quicksort are all asymptotically optimal among comparison sorts.',
        practice: 'argue why "best case" can be O(n) (the decision tree has shallow leaves) but "worst case" cannot beat Ω(n log n).'
      }),
      practice: [
        mcq('algods-u3-l6-q1', 'The Ω(n log n) lower bound applies to:',
          ['All sorts.', 'Comparison-based sorts only.', 'In-place sorts only.', 'Stable sorts only.'],
          1, 'It is a decision-tree bound for algorithms whose only access to data is via key comparisons.')
      ]
    },
    {
      title: 'Counting sort and radix sort',
      durationMinutes: 30,
      type: 'video',
      summary: 'Linear-time sorting when keys come from a small range.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The comparison-sorting lower bound from the previous lesson does not apply when the algorithm can use more information about the keys. Counting sort assumes the keys are integers in a small range. Instead of discovering order through comparisons, it counts how many times each key occurs, converts those counts into final positions, and scatters the input into an output array.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'When counting sort is appropriate',
          text: 'Use counting sort when every key is an integer in a known range 0..k and k is not much larger than n. The running time is Θ(n + k), so the method is linear only when the key range is small enough.'
        },
        {
          type: 'diagram',
          title: 'Count, prefix-sum, scatter',
          caption: 'The prefix-sum array turns counts into final output positions.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 330" role="img" aria-label="Counting sort count prefix scatter diagram">
  <rect x="12" y="12" width="836" height="306" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">COUNTING-SORT on [2, 5, 3, 0, 2, 3, 0, 3]</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <text x="106" y="92" font-size="14" font-weight="800" fill="#52627a">key</text>
    <text x="106" y="142" font-size="14" font-weight="800" fill="#52627a">count</text>
    <text x="106" y="192" font-size="14" font-weight="800" fill="#52627a">prefix</text>
    <g font-size="16" font-weight="900">
      <rect x="150" y="70" width="54" height="36" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="177" y="94">0</text>
      <rect x="214" y="70" width="54" height="36" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="241" y="94">1</text>
      <rect x="278" y="70" width="54" height="36" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="305" y="94">2</text>
      <rect x="342" y="70" width="54" height="36" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="369" y="94">3</text>
      <rect x="406" y="70" width="54" height="36" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="433" y="94">4</text>
      <rect x="470" y="70" width="54" height="36" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="497" y="94">5</text>
      <rect x="150" y="120" width="54" height="36" rx="9" fill="#f3e8ff" stroke="#8b5cf6"/><text x="177" y="144">2</text>
      <rect x="214" y="120" width="54" height="36" rx="9" fill="#f3e8ff" stroke="#8b5cf6"/><text x="241" y="144">0</text>
      <rect x="278" y="120" width="54" height="36" rx="9" fill="#f3e8ff" stroke="#8b5cf6"/><text x="305" y="144">2</text>
      <rect x="342" y="120" width="54" height="36" rx="9" fill="#f3e8ff" stroke="#8b5cf6"/><text x="369" y="144">3</text>
      <rect x="406" y="120" width="54" height="36" rx="9" fill="#f3e8ff" stroke="#8b5cf6"/><text x="433" y="144">0</text>
      <rect x="470" y="120" width="54" height="36" rx="9" fill="#f3e8ff" stroke="#8b5cf6"/><text x="497" y="144">1</text>
      <rect x="150" y="170" width="54" height="36" rx="9" fill="#ccfbf1" stroke="#14b8a6"/><text x="177" y="194">2</text>
      <rect x="214" y="170" width="54" height="36" rx="9" fill="#ccfbf1" stroke="#14b8a6"/><text x="241" y="194">2</text>
      <rect x="278" y="170" width="54" height="36" rx="9" fill="#ccfbf1" stroke="#14b8a6"/><text x="305" y="194">4</text>
      <rect x="342" y="170" width="54" height="36" rx="9" fill="#ccfbf1" stroke="#14b8a6"/><text x="369" y="194">7</text>
      <rect x="406" y="170" width="54" height="36" rx="9" fill="#ccfbf1" stroke="#14b8a6"/><text x="433" y="194">7</text>
      <rect x="470" y="170" width="54" height="36" rx="9" fill="#ccfbf1" stroke="#14b8a6"/><text x="497" y="194">8</text>
    </g>
    <rect x="590" y="94" width="190" height="132" rx="16" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <text x="685" y="122" font-size="15" font-weight="900" fill="#064e3b">stable output</text>
    <text x="685" y="158" font-size="20" font-weight="900" fill="#0f2038">[0, 0, 2, 2]</text>
    <text x="685" y="188" font-size="20" font-weight="900" fill="#0f2038">[3, 3, 3, 5]</text>
    <text x="430" y="280" font-size="15" fill="#52627a">Right-to-left scatter is what preserves the order of equal keys.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Counting sort algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'Stable COUNTING-SORT',
          language: 'pseudocode',
          code: `COUNTING-SORT(A, k)
    let B[1..length(A)] be a new output array
    let C[0..k] be a new count array

    for i = 0 to k
        C[i] = 0
    for j = 1 to length(A)
        C[A[j]] = C[A[j]] + 1
    for i = 1 to k
        C[i] = C[i] + C[i - 1]
    for j = length(A) downto 1
        B[C[A[j]]] = A[j]
        C[A[j]] = C[A[j]] - 1
    return B`
        },
        {
          type: 'interactive',
          artifact: 'counting-radix-sort-viz'
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'table',
          caption: 'Counting sort on A = [2, 5, 3, 0, 2, 3, 0, 3], with k = 5.',
          columns: ['Step', 'Array meaning', 'Values'],
          rows: [
            ['Initial counts', 'Number of keys equal to each value 0..5', '[2, 0, 2, 3, 0, 1]'],
            ['Prefix sums', 'Number of keys at most each value 0..5', '[2, 2, 4, 7, 7, 8]'],
            ['Scatter from right', 'Place each A[j] into B[C[A[j]]] and decrement', 'B = [0, 0, 2, 2, 3, 3, 3, 5]'],
            ['Result', 'Sorted output', '[0, 0, 2, 2, 3, 3, 3, 5]']
          ]
        },
        {
          type: 'heading',
          text: 'Why stability matters',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A stable sorting algorithm keeps equal keys in their original relative order. Counting sort becomes stable because the scatter loop scans A from right to left. The last copy of a key claims the last available position for that key, the previous copy claims the position before it, and so on.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Counting-sort correctness',
          text: 'After prefix sums, C[v] is the number of input keys at most v, so it is the final right boundary for value v. Each scatter step places one copy of A[j] into the next free correct position for that value. When all copies are placed, B is sorted and contains exactly the input multiset.'
        },
        {
          type: 'formula',
          latex: 'T(n,k) = \\Theta(k) + \\Theta(n) + \\Theta(k) + \\Theta(n) = \\Theta(n+k)',
          display: true,
          caption: 'Initialize counts, count input, prefix-sum counts, and scatter input.'
        },
        {
          type: 'table',
          caption: 'Counting sort properties.',
          columns: ['Property', 'Value', 'Reason'],
          rows: [
            ['Time', 'Θ(n + k)', 'The algorithm scans A twice and C twice.'],
            ['Extra space', 'Θ(n + k)', 'Output array B and count array C.'],
            ['Stable?', 'Yes, with right-to-left scatter', 'Equal keys are placed into positions from right to left.'],
            ['In-place?', 'No in the standard version', 'It builds an output array B.'],
            ['Restriction', 'Integer keys in a known small range', 'The count array is indexed by key value.']
          ]
        },
        {
          type: 'heading',
          text: 'Radix sort',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Radix sort sorts multi-digit integer keys one digit at a time. The usual least-significant-digit version sorts by the ones digit, then tens digit, then hundreds digit, and so on. Each digit pass must be stable, otherwise a later pass would destroy the order established by earlier, less significant digits.'
        },
        {
          type: 'code',
          title: 'LSD RADIX-SORT',
          language: 'pseudocode',
          code: `RADIX-SORT(A, d)
    for digit = 1 to d
        use a stable sort to sort A by this digit`
        },
        {
          type: 'table',
          caption: 'LSD radix sort on [329, 457, 657, 720, 355, 436].',
          columns: ['Pass', 'Digit used', 'Array after stable pass'],
          rows: [
            ['1', 'ones', '[720, 355, 436, 457, 657, 329]'],
            ['2', 'tens', '[720, 329, 436, 355, 457, 657]'],
            ['3', 'hundreds', '[329, 355, 436, 457, 657, 720]']
          ]
        },
        {
          type: 'formula',
          latex: '\\Theta(d(n+b))',
          display: true,
          caption: 'With d digits and digit base b, each stable counting-sort pass costs Θ(n + b).'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Counting sort beats the comparison lower bound only because it uses key values as array indices. Radix sort is correct only if the digit-sorting subroutine is stable.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u3l7-E1',
              source: 'Counts',
              question: 'For A = [1, 3, 1, 0, 2, 1] and k = 3, what is the count array before prefix sums?',
              solution: 'There is one 0, three 1s, one 2, and one 3, so C = [1, 3, 1, 1].'
            },
            {
              id: 'u3l7-E2',
              source: 'Stability',
              question: 'Why does stable counting sort scan A from right to left during scatter?',
              solution: 'The prefix sum gives the last available position for each key. Scanning from right to left places the later equal key later in B, so earlier equal keys remain earlier.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u3l7-M1',
              source: 'Radix correctness',
              question: 'Why would LSD radix sort fail if its digit sort were not stable?',
              solution: 'After sorting by a less significant digit, equal values in a later more significant digit must remain ordered by the earlier digit. An unstable sort could reorder those equal more-significant-digit keys and destroy the ordering already built.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'when keys are integers from a small range k, sort in Θ(n + k) using buckets.',
        problem: 'sort faster than n log n when the input is restricted.',
        intuition: 'count occurrences, prefix-sum to get positions, scatter into the output.',
        formal: 'COUNTING-SORT(A, B, k): C[0..k] = 0; for j: C[A[j]]++; prefix-sum C; for j = n..1: B[C[A[j]]] = A[j]; C[A[j]]--.',
        algorithm: 'see formal.',
        worked: 'sort [2, 5, 3, 0, 2, 3, 0, 3] with k = 5.',
        correctness: 'walking j from n to 1 keeps counting sort stable.',
        complexity: 'Θ(n + k). Stable. Not in-place.',
        trace: 'animate the prefix-sum and scatter steps.',
        takeaways: 'use counting sort as a subroutine for radix sort; combined gives Θ(d(n+k)) for d-digit keys.',
        practice: 'sort 4-digit decimal numbers using radix sort with counting sort as the inner step.'
      }),
      practice: [
        mcq('algods-u3-l7-q1', 'Counting sort is asymptotically:',
          ['Θ(n log n)', 'Θ(n²)', 'Θ(n + k)', 'Θ(n log k)'],
          2, 'Counting sort runs in Θ(n + k) where k is the maximum key value.')
      ]
    },
    {
      title: 'Selection: median-of-medians',
      durationMinutes: 35,
      type: 'interactive',
      summary: 'Find the i-th smallest element in worst-case linear time.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The selection problem asks for the i-th smallest key without sorting the whole array. Sorting would take Θ(n log n), but selection can be done in linear time. Randomised QuickSelect is linear in expectation. Median-of-medians gives the stronger guarantee: O(n) in the worst case.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'The problem with ordinary QuickSelect',
          text: 'QuickSelect is fast if the pivot is good, but a bad deterministic pivot can leave a subproblem of size n-1 repeatedly. Median-of-medians spends linear work to choose a pivot that is guaranteed to discard a constant fraction.'
        },
        {
          type: 'diagram',
          title: 'Groups of five create a safe pivot',
          caption: 'The median of group medians is not necessarily the true median, but it is good enough.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 350" role="img" aria-label="Median of medians grouping diagram">
  <rect x="12" y="12" width="836" height="326" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Median-of-medians selection</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <text x="430" y="78" font-size="15" fill="#52627a">Group into fives, take group medians, then recursively select the median of those medians.</text>
    <g font-size="14" font-weight="900">
      <rect x="84" y="110" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="109" y="134">3</text>
      <rect x="140" y="110" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="165" y="134">4</text>
      <rect x="196" y="110" width="50" height="38" rx="9" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="221" y="134">5</text>
      <rect x="252" y="110" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="277" y="134">7</text>
      <rect x="308" y="110" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="333" y="134">12</text>
      <rect x="84" y="166" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="109" y="190">1</text>
      <rect x="140" y="166" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="165" y="190">2</text>
      <rect x="196" y="166" width="50" height="38" rx="9" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="221" y="190">19</text>
      <rect x="252" y="166" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="277" y="190">23</text>
      <rect x="308" y="166" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="333" y="190">26</text>
      <rect x="84" y="222" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="109" y="246">6</text>
      <rect x="140" y="222" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="165" y="246">8</text>
      <rect x="196" y="222" width="50" height="38" rx="9" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="221" y="246">10</text>
      <rect x="252" y="222" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="277" y="246">14</text>
      <rect x="308" y="222" width="50" height="38" rx="9" fill="#e0f2fe" stroke="#38bdf8"/><text x="333" y="246">17</text>
    </g>
    <rect x="500" y="126" width="80" height="46" rx="12" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="540" y="155" font-size="17" font-weight="900">5</text>
    <rect x="610" y="126" width="80" height="46" rx="12" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="650" y="155" font-size="17" font-weight="900">19</text>
    <rect x="720" y="126" width="80" height="46" rx="12" fill="#f3e8ff" stroke="#a855f7" stroke-width="2"/><text x="760" y="155" font-size="17" font-weight="900">10</text>
    <text x="650" y="102" font-size="14" font-weight="800" fill="#6b21a8">group medians</text>
    <rect x="610" y="220" width="80" height="54" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="650" y="254" font-size="20" font-weight="900">10</text>
    <text x="650" y="298" font-size="15" font-weight="900" fill="#b45309">pivot = median of medians</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Order statistics',
          level: 2
        },
        {
          type: 'table',
          caption: 'Selection vocabulary.',
          columns: ['Term', 'Meaning', 'Example'],
          rows: [
            ['Minimum', '1st order statistic', 'smallest element'],
            ['Maximum', 'n-th order statistic', 'largest element'],
            ['Median', 'middle order statistic', 'rank ceil(n/2) for the upper median convention'],
            ['Selection problem', 'Find the i-th smallest key', 'i = 4 asks for the fourth smallest key']
          ]
        },
        {
          type: 'heading',
          text: 'Algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'SELECT with median of medians',
          language: 'pseudocode',
          code: `SELECT(A, i)
    if length(A) is small
        sort A directly and return A[i]

    divide A into groups of 5
    sort each group and collect its median
    x = SELECT(medians, ceil(length(medians) / 2))
    partition A around x

    let k = rank of x in the partitioned array
    if i == k
        return x
    else if i < k
        return SELECT(elements less than x, i)
    else
        return SELECT(elements greater than x, i - k)`
        },
        {
          type: 'interactive',
          artifact: 'median-of-medians-viz'
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Use A = [12, 3, 5, 7, 4, 19, 26, 23, 2, 1, 17, 8, 14, 6, 10] and ask for i = 9. After grouping into fives and sorting each group, the medians are 5, 19, and 10. The median of those medians is 10.'
        },
        {
          type: 'table',
          caption: 'Example trace for i = 9.',
          columns: ['Step', 'Result'],
          rows: [
            ['Group medians', '[5, 19, 10]'],
            ['Pivot', '10'],
            ['Less than 10', '[3, 5, 7, 4, 2, 1, 8, 6]'],
            ['Equal to 10', '[10]'],
            ['Greater than 10', '[12, 19, 26, 23, 17, 14]'],
            ['Rank of pivot', '9th smallest if ranks are 1-based, because 8 keys are smaller'],
            ['Decision for i = 9', 'Return the pivot 10']
          ]
        },
        {
          type: 'heading',
          text: 'Why the pivot is good',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'At least half of the group medians are at least the median-of-medians pivot. In each full group whose median is at least the pivot, at least three elements are at least that group median, and therefore at least the pivot. Symmetrically, at least about 3n/10 elements are at most the pivot. Ignoring small constant terms from leftover groups, the recursive partition side has size at most about 7n/10.'
        },
        {
          type: 'formula',
          latex: 'T(n) \\le T(\\lceil n/5\\rceil) + T(7n/10 + O(1)) + \\Theta(n)',
          display: true,
          caption: 'One recursive call selects the pivot among medians; one recursive call continues after partitioning.'
        },
        {
          type: 'formula',
          latex: '\\frac{1}{5} + \\frac{7}{10} = \\frac{9}{10} < 1',
          display: true,
          caption: 'The recursive subproblem fractions add to less than 1, so the linear work dominates.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Substitution proof sketch',
          text: 'Assume T(m) <= cm for all m < n. Then T(n) <= c(n/5) + c(7n/10 + O(1)) + an = 0.9cn + O(c) + an. Choose c large enough and handle small n in the base case; then T(n) <= cn.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'list',
          items: [
            'The chosen pivot x is an element of A.',
            'Partition places all keys less than x before x and all keys greater than x after x.',
            'If i equals the pivot rank, x is exactly the i-th smallest key.',
            'If i is smaller, the answer lies entirely in the left partition.',
            'If i is larger, the answer lies entirely in the right partition with its rank adjusted by the number of discarded keys.'
          ]
        },
        {
          type: 'table',
          caption: 'Selection algorithms compared.',
          columns: ['Algorithm', 'Worst-case time', 'Expected time', 'Main use'],
          rows: [
            ['Sort then index', 'Θ(n log n)', 'Θ(n log n)', 'Simple when you need all sorted keys anyway.'],
            ['Randomised QuickSelect', 'Θ(n²)', 'Θ(n)', 'Fast practical selection.'],
            ['Median-of-medians SELECT', 'Θ(n)', 'Θ(n)', 'Worst-case guarantee and theory.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Do not say the pivot is always the true median. It is a guaranteed good pivot: enough elements are known to be below and above it to make the recurrence linear.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u3l8-E1',
              source: 'Order statistic',
              question: 'What is the 4th smallest element of [12, 3, 5, 7, 4]?',
              solution: 'Sorted order is [3, 4, 5, 7, 12]. The 4th smallest element is 7.'
            },
            {
              id: 'u3l8-E2',
              source: 'Pivot meaning',
              question: 'Is the median of medians always the exact median of A?',
              solution: 'No. It is selected from the medians of small groups. It is guaranteed to be good enough to discard a constant fraction, but it need not be the exact median of the whole input.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u3l8-M1',
              source: 'Recurrence',
              question: 'Why does T(n) <= T(n/5) + T(7n/10) + cn imply T(n) = O(n)?',
              solution: 'By substitution, assume T(m) <= am for smaller m. Then T(n) <= a(n/5) + a(7n/10) + cn = 0.9an + cn. Choose a >= 10c so 0.9an + cn <= an. Base cases absorb rounding and constants.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'choose a "good" pivot via groups of 5 medians; recurse on the smaller side.',
        problem: 'select the i-th order statistic without sorting all of A.',
        intuition: 'splitting into groups of 5, taking each median, then the median of medians, guarantees a constant fraction is below and above the pivot.',
        formal: 'SELECT(A, i): partition into groups of 5; recursively find median of medians; PARTITION around it; recurse on the side containing rank i.',
        algorithm: 'see formal.',
        worked: 'on [12, 3, 5, 7, 4, 19, 26, 23, 2, 1] with i=4 we walk through grouping, median-of-medians, partition, and recursion.',
        correctness: 'pivot has rank between 0.3n and 0.7n, so the recurrence is T(n) = T(n/5) + T(7n/10) + O(n).',
        complexity: 'T(n) = O(n) by substitution (the constants 1/5 + 7/10 = 9/10 < 1).',
        trace: 'animate the groups-of-5 step and median-of-medians.',
        takeaways: 'this is the only "always linear time" selection algorithm; randomised QuickSelect is linear in expectation only.',
        practice: 'derive T(n) = O(n) from T(n) = T(n/5) + T(7n/10) + O(n) by substitution.'
      }),
      practice: [
        mcq('algods-u3-l8-q1', 'Median-of-medians selection runs in:',
          ['O(n²) worst case', 'O(n log n) worst case', 'O(n) worst case', 'O(n) expected only'],
          2, 'The groups-of-5 trick guarantees worst-case linear time; QuickSelect is linear only in expectation.')
      ]
    }
  ]
};

const u4 = {
  id: 'algods-u4',
  title: 'Search Trees',
  summary: 'Binary search trees, traversals, queries, mutations, and red-black balance.',
  lessons: [
    {
      title: 'Binary search tree property',
      durationMinutes: 30,
      type: 'video',
      summary: 'Definition, traversals, sorted in-order property.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A binary search tree stores a dynamic ordered set in a linked tree. Each node has a key, a left child, a right child, and usually a parent pointer. The tree shape can change after insertions and deletions, but the search-order rule must always stay true.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'BST property',
          text: 'For every node x, every key in the left subtree of x is at most key[x], and every key in the right subtree of x is at least key[x]. Many courses assume distinct keys; then replace "at most" and "at least" by "less than" and "greater than".'
        },
        {
          type: 'diagram',
          title: 'One binary search tree',
          caption: 'Every subtree is itself a BST. The root 15 separates smaller keys from larger keys.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 360" role="img" aria-label="Binary search tree property diagram">
  <rect x="12" y="12" width="836" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">BST property: left subtree <= node <= right subtree</text>
  <g stroke="#94a3b8" stroke-width="2">
    <line x1="430" y1="92" x2="260" y2="158"/>
    <line x1="430" y1="92" x2="600" y2="158"/>
    <line x1="260" y1="158" x2="160" y2="224"/>
    <line x1="260" y1="158" x2="350" y2="224"/>
    <line x1="350" y1="224" x2="420" y2="290"/>
    <line x1="600" y1="158" x2="525" y2="224"/>
    <line x1="600" y1="158" x2="700" y2="224"/>
  </g>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-size="18" font-weight="900">
    <circle cx="430" cy="82" r="30" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/><text x="430" y="89">15</text>
    <circle cx="260" cy="158" r="28" fill="#ecfdf5" stroke="#10b981" stroke-width="3"/><text x="260" y="165">6</text>
    <circle cx="600" cy="158" r="28" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/><text x="600" y="165">18</text>
    <circle cx="160" cy="224" r="26" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="160" y="231">3</text>
    <circle cx="350" cy="224" r="26" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="350" y="231">7</text>
    <circle cx="420" cy="290" r="24" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="420" y="297">13</text>
    <circle cx="525" cy="224" r="26" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="525" y="231">17</text>
    <circle cx="700" cy="224" r="26" fill="#fee2e2" stroke="#ef4444" stroke-width="2"/><text x="700" y="231">20</text>
  </g>
  <text x="260" y="330" text-anchor="middle" font-size="15" font-weight="800" fill="#047857">all keys here are <= 15</text>
  <text x="600" y="330" text-anchor="middle" font-size="15" font-weight="800" fill="#b91c1c">all keys here are >= 15</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core definitions',
          level: 2
        },
        {
          type: 'table',
          caption: 'BST vocabulary.',
          columns: ['Term', 'Meaning', 'Why it matters'],
          rows: [
            ['Root', 'The top node of the tree.', 'All searches start here.'],
            ['Subtree', 'A node together with all of its descendants.', 'The BST property must hold recursively in every subtree.'],
            ['Height h', 'The length of the longest downward path from the root to a leaf.', 'BST operation time is usually Θ(h).'],
            ['In-order traversal', 'Visit left subtree, then node, then right subtree.', 'It outputs keys in sorted order.'],
            ['Dynamic set', 'A set that supports updates such as insert and delete.', 'BSTs are useful because the tree can change.']
          ]
        },
        {
          type: 'heading',
          text: 'In-order traversal',
          level: 2
        },
        {
          type: 'code',
          title: 'INORDER-TREE-WALK',
          language: 'pseudocode',
          code: `INORDER-TREE-WALK(x)
    if x != NIL
        INORDER-TREE-WALK(left[x])
        print key[x]
        INORDER-TREE-WALK(right[x])`
        },
        {
          type: 'interactive',
          artifact: 'bst-tree-visualizer'
        },
        {
          type: 'table',
          caption: 'Traversal orders on the example tree.',
          columns: ['Traversal', 'Visit order', 'Use'],
          rows: [
            ['In-order', '3, 6, 7, 13, 15, 17, 18, 20', 'Sorted output for a BST.'],
            ['Pre-order', '15, 6, 3, 7, 13, 18, 17, 20', 'Useful for copying or serializing tree shape.'],
            ['Post-order', '3, 13, 7, 6, 17, 20, 18, 15', 'Useful for deleting/freeing subtrees.']
          ]
        },
        {
          type: 'heading',
          text: 'Why in-order is sorted',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Induction proof',
          text: 'For a node x, the left subtree prints in sorted order by induction, then key[x] prints, then the right subtree prints in sorted order by induction. The BST property guarantees every printed left key is <= key[x] and every printed right key is >= key[x].'
        },
        {
          type: 'heading',
          text: 'Height controls performance',
          level: 2
        },
        {
          type: 'table',
          caption: 'Same keys, different tree shapes.',
          columns: ['Shape', 'Height', 'Effect'],
          rows: [
            ['Balanced tree', 'Θ(log n)', 'Search, insert, delete can be logarithmic.'],
            ['Completely skewed tree', 'Θ(n)', 'Operations degrade to linear time, like a linked list.'],
            ['Red-black tree', 'Θ(log n)', 'Later lessons maintain balance automatically.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'The BST property is local at every node but has global consequences: in-order traversal gives sorted order, and every query follows one downward path whose length is at most the height h.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u4l1-E1',
              source: 'Traversal',
              question: 'What is the in-order traversal of a BST with root 8, left child 3, and right child 10?',
              solution: 'Visit left, root, right: 3, 8, 10.'
            },
            {
              id: 'u4l1-E2',
              source: 'Property check',
              question: 'Can a node with key 12 appear in the left subtree of a root with key 10 if keys are distinct?',
              solution: 'No. With distinct keys, every key in the left subtree must be strictly less than the root key.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u4l1-M1',
              source: 'Proof',
              question: 'Prove in one paragraph that INORDER-TREE-WALK prints a BST in nondecreasing order.',
              solution: 'Use induction on subtree size. The left subtree prints in nondecreasing order, then the root prints, then the right subtree prints. By the BST property, all left keys are at most the root key and all right keys are at least it, so concatenating the three outputs is nondecreasing.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'each node\'s left subtree has smaller keys; right subtree has larger keys.',
        problem: 'support search/insert/delete in O(h) on a single linked structure.',
        intuition: 'classic binary search but as a navigable structure you can also modify.',
        formal: 'for every node x: y in left subtree => key[y] <= key[x]; y in right subtree => key[y] >= key[x].',
        algorithm: 'INORDER-TREE-WALK visits left, root, right; outputs the keys in sorted order.',
        worked: 'inorder of (5 (3 2 4) (8 _ 9)) is 2 3 4 5 8 9.',
        correctness: 'follows directly from the BST property by induction on height.',
        complexity: 'all operations O(h); h can be Θ(n) in the worst case.',
        trace: 'predict the inorder traversal of a small BST.',
        takeaways: 'BST height is the bottleneck; chapters 4.6+ keep h logarithmic via balance.',
        practice: 'build a BST from the insertion sequence 41, 38, 31, 12, 19, 8 and list its inorder.'
      }),
      practice: [
        mcq('algods-u4-l1-q1', 'In-order traversal of a BST yields:',
          ['Pre-order', 'Sorted order of the keys', 'Reverse-sorted order', 'BFS order'],
          1, 'In-order = left, root, right = sorted.')
      ]
    },
    {
      title: 'Search, minimum, maximum',
      durationMinutes: 25,
      type: 'video',
      summary: 'Three queries that all run in O(h).',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The BST property turns search into a path-following problem. At each node, one comparison tells you whether to stop, go left, or go right. Minimum and maximum are even simpler: the minimum is the leftmost node, and the maximum is the rightmost node.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'One subtree disappears per comparison',
          text: 'If k < key[x], then k cannot be in the right subtree of x. If k > key[x], then k cannot be in the left subtree of x. This is the same elimination idea as binary search, but on a linked tree.'
        },
        {
          type: 'diagram',
          title: 'Search path for key 13',
          caption: 'The search visits 15, then 6, then 7, then 13. No other subtree needs to be inspected.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 340" role="img" aria-label="BST search path diagram">
  <rect x="12" y="12" width="836" height="316" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">TREE-SEARCH(root, 13)</text>
  <g stroke="#94a3b8" stroke-width="2">
    <line x1="430" y1="92" x2="260" y2="158"/>
    <line x1="430" y1="92" x2="600" y2="158"/>
    <line x1="260" y1="158" x2="160" y2="224"/>
    <line x1="260" y1="158" x2="350" y2="224"/>
    <line x1="350" y1="224" x2="420" y2="288"/>
    <line x1="600" y1="158" x2="525" y2="224"/>
    <line x1="600" y1="158" x2="700" y2="224"/>
  </g>
  <g stroke="#f59e0b" stroke-width="5" stroke-linecap="round">
    <line x1="420" y1="96" x2="270" y2="150"/>
    <line x1="270" y1="166" x2="340" y2="216"/>
    <line x1="360" y1="232" x2="410" y2="280"/>
  </g>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-size="18" font-weight="900">
    <circle cx="430" cy="82" r="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><text x="430" y="89">15</text>
    <circle cx="260" cy="158" r="28" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><text x="260" y="165">6</text>
    <circle cx="600" cy="158" r="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="600" y="165">18</text>
    <circle cx="160" cy="224" r="26" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="160" y="231">3</text>
    <circle cx="350" cy="224" r="26" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><text x="350" y="231">7</text>
    <circle cx="420" cy="288" r="26" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/><text x="420" y="295">13</text>
    <circle cx="525" cy="224" r="26" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="525" y="231">17</text>
    <circle cx="700" cy="224" r="26" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="700" y="231">20</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Search algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'Recursive TREE-SEARCH',
          language: 'pseudocode',
          code: `TREE-SEARCH(x, k)
    if x == NIL or k == key[x]
        return x
    if k < key[x]
        return TREE-SEARCH(left[x], k)
    else
        return TREE-SEARCH(right[x], k)`
        },
        {
          type: 'code',
          title: 'Iterative TREE-SEARCH',
          language: 'pseudocode',
          code: `ITERATIVE-TREE-SEARCH(x, k)
    while x != NIL and k != key[x]
        if k < key[x]
            x = left[x]
        else
            x = right[x]
    return x`
        },
        {
          type: 'interactive',
          artifact: 'bst-tree-visualizer'
        },
        {
          type: 'heading',
          text: 'Minimum and maximum',
          level: 2
        },
        {
          type: 'code',
          title: 'TREE-MINIMUM and TREE-MAXIMUM',
          language: 'pseudocode',
          code: `TREE-MINIMUM(x)
    while left[x] != NIL
        x = left[x]
    return x

TREE-MAXIMUM(x)
    while right[x] != NIL
        x = right[x]
    return x`
        },
        {
          type: 'table',
          caption: 'Queries on the example tree.',
          columns: ['Query', 'Visited nodes', 'Answer'],
          rows: [
            ['TREE-SEARCH(root, 13)', '15 -> 6 -> 7 -> 13', 'node 13'],
            ['TREE-SEARCH(root, 14)', '15 -> 6 -> 7 -> 13 -> NIL', 'not found'],
            ['TREE-MINIMUM(root)', '15 -> 6 -> 3', 'node 3'],
            ['TREE-MAXIMUM(root)', '15 -> 18 -> 20', 'node 20']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Search invariant',
          text: 'At every step, if key k is present in the original tree, then it is present in the current subtree rooted at x. The comparison at x discards only a subtree that cannot contain k by the BST property.'
        },
        {
          type: 'list',
          items: [
            'For search, equality returns the target node immediately.',
            'If k < key[x], all keys in the right subtree are at least key[x], so the right subtree cannot contain k.',
            'If k > key[x], all keys in the left subtree are at most key[x], so the left subtree cannot contain k.',
            'For minimum, any node with a left child cannot be minimum because the left child subtree contains a smaller or equal key. The first node with no left child is the minimum.',
            'Maximum is symmetric: follow right children until none exists.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime',
          level: 2
        },
        {
          type: 'formula',
          latex: 'T(h) = \\Theta(h)',
          display: true,
          caption: 'Each operation follows one downward path of length at most the tree height h.'
        },
        {
          type: 'table',
          caption: 'Height cases.',
          columns: ['Tree shape', 'Height h', 'Search/min/max time'],
          rows: [
            ['Balanced', 'Θ(log n)', 'Θ(log n)'],
            ['Skewed', 'Θ(n)', 'Θ(n)'],
            ['Red-black tree', 'Θ(log n)', 'Θ(log n) guaranteed']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Do not answer O(log n) for an arbitrary BST unless the tree is known to be balanced. The correct general bound is O(h), and h can be n.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u4l2-E1',
              source: 'Search trace',
              question: 'In the example tree, what path does TREE-SEARCH(root, 17) follow?',
              solution: 'Compare 17 with 15 and go right to 18. Compare 17 with 18 and go left to 17. The path is 15 -> 18 -> 17.'
            },
            {
              id: 'u4l2-E2',
              source: 'Extremum',
              question: 'Why is the minimum the leftmost node?',
              solution: 'If a node has a left child, the left subtree contains keys no larger than that node. So the node cannot be minimum. Keep going left until no left child exists.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u4l2-M1',
              source: 'Correctness',
              question: 'State the invariant for iterative TREE-SEARCH.',
              solution: 'At the start of every loop iteration, if k occurs in the original tree, then k occurs in the current subtree rooted at x. Each comparison preserves this by discarding only a subtree that cannot contain k.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'walk left for minimum, right for maximum, branch left/right by comparison for search.',
        problem: 'fast existence and extremum queries.',
        intuition: 'BST property is exactly what binary search exploits; just follow the obvious child.',
        formal: 'TREE-SEARCH(x, k): if x = NIL or k = key[x]: return x; if k < key[x]: TREE-SEARCH(left[x], k) else TREE-SEARCH(right[x], k).',
        algorithm: 'iterative variant uses a single while-loop and constant memory.',
        worked: 'search for 19 in our example tree; minimum is the leftmost node; maximum the rightmost.',
        correctness: 'BST property eliminates one subtree per comparison.',
        complexity: 'O(h).',
        trace: 'trace TREE-SEARCH(root, 19).',
        takeaways: 'three operations, identical pattern: descend the tree.',
        practice: 'rewrite TREE-SEARCH iteratively.'
      }),
      practice: [
        mcq('algods-u4-l2-q1', 'Where is the minimum key in a non-empty BST?',
          ['At the root.', 'At the leftmost node.', 'At the rightmost node.', 'At any leaf.'],
          1, 'Walk left children until you cannot.')
      ]
    },
    {
      title: 'Predecessor and successor',
      durationMinutes: 25,
      type: 'video',
      summary: 'Find the next-smaller / next-larger key in O(h).',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The successor of a node is the next node in in-order traversal: the smallest key strictly larger than that node. The predecessor is the previous node in in-order traversal: the largest key strictly smaller than that node. These queries are useful for sorted iteration, range queries, and deletion.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Assumption for this lesson',
          text: 'We use the standard distinct-key version of predecessor and successor. If duplicates are allowed, the answer depends on the course\'s duplicate-placement policy and whether "next" means next node or next distinct key.'
        },
        {
          type: 'diagram',
          title: 'Two successor cases',
          caption: 'If a right subtree exists, go right once then left as far as possible. Otherwise climb until you leave a left edge.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 360" role="img" aria-label="BST successor cases diagram">
  <rect x="12" y="12" width="836" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">TREE-SUCCESSOR has two structural cases</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <rect x="52" y="82" width="350" height="238" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="227" y="112" font-size="16" font-weight="900" fill="#0f2038">Case 1: x has a right subtree</text>
    <g stroke="#94a3b8" stroke-width="2">
      <line x1="227" y1="154" x2="160" y2="214"/>
      <line x1="227" y1="154" x2="294" y2="214"/>
      <line x1="294" y1="214" x2="250" y2="272"/>
    </g>
    <circle cx="227" cy="150" r="25" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="227" y="157" font-size="17" font-weight="900">15</text>
    <circle cx="160" cy="214" r="23" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="160" y="221" font-size="15" font-weight="900">10</text>
    <circle cx="294" cy="214" r="23" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="294" y="221" font-size="15" font-weight="900">20</text>
    <circle cx="250" cy="272" r="23" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/><text x="250" y="279" font-size="15" font-weight="900">17</text>
    <text x="227" y="304" font-size="14" fill="#047857" font-weight="800">successor(15) = minimum(right subtree) = 17</text>

    <rect x="458" y="82" width="350" height="238" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="633" y="112" font-size="16" font-weight="900" fill="#0f2038">Case 2: x has no right subtree</text>
    <g stroke="#94a3b8" stroke-width="2">
      <line x1="633" y1="154" x2="560" y2="214"/>
      <line x1="560" y1="214" x2="615" y2="272"/>
    </g>
    <circle cx="633" cy="150" r="25" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/><text x="633" y="157" font-size="17" font-weight="900">15</text>
    <circle cx="560" cy="214" r="23" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="560" y="221" font-size="15" font-weight="900">6</text>
    <circle cx="615" cy="272" r="23" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="615" y="279" font-size="15" font-weight="900">13</text>
    <text x="633" y="304" font-size="14" fill="#047857" font-weight="800">successor(13) = first ancestor reached from a left edge = 15</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Successor algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'TREE-SUCCESSOR',
          language: 'pseudocode',
          code: `TREE-SUCCESSOR(x)
    if right[x] != NIL
        return TREE-MINIMUM(right[x])
    y = parent[x]
    while y != NIL and x == right[y]
        x = y
        y = parent[y]
    return y`
        },
        {
          type: 'interactive',
          artifact: 'bst-tree-visualizer'
        },
        {
          type: 'heading',
          text: 'The two successor cases',
          level: 2
        },
        {
          type: 'table',
          caption: 'Successor cases on the example tree.',
          columns: ['Node x', 'Right subtree?', 'Rule', 'Successor'],
          rows: [
            ['15', 'Yes: subtree rooted at 18', 'TREE-MINIMUM(right[15])', '17'],
            ['13', 'No', 'Climb until x is a left child of its parent', '15'],
            ['20', 'No', 'Climb past right edges until NIL', 'NIL; 20 is maximum'],
            ['6', 'Yes: subtree rooted at 7', 'TREE-MINIMUM(right[6])', '7']
          ]
        },
        {
          type: 'heading',
          text: 'Predecessor by symmetry',
          level: 2
        },
        {
          type: 'code',
          title: 'TREE-PREDECESSOR',
          language: 'pseudocode',
          code: `TREE-PREDECESSOR(x)
    if left[x] != NIL
        return TREE-MAXIMUM(left[x])
    y = parent[x]
    while y != NIL and x == left[y]
        x = y
        y = parent[y]
    return y`
        },
        {
          type: 'table',
          caption: 'Predecessor cases on the example tree.',
          columns: ['Node x', 'Left subtree?', 'Rule', 'Predecessor'],
          rows: [
            ['15', 'Yes: subtree rooted at 6', 'TREE-MAXIMUM(left[15])', '13'],
            ['17', 'No', 'Climb until x is a right child of its parent', '15'],
            ['3', 'No', 'Climb past left edges until NIL', 'NIL; 3 is minimum'],
            ['18', 'Yes: subtree rooted at 17', 'TREE-MAXIMUM(left[18])', '17']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why successor works',
          text: 'If x has a right subtree, every key in that subtree is larger than x, and the smallest such key is the next in sorted order. If x has no right subtree, the successor must be an ancestor. Climbing past right-child links skips ancestors smaller than x; the first ancestor reached from a left child is the smallest ancestor larger than x.'
        },
        {
          type: 'list',
          items: [
            'Case 1 does not inspect the whole tree; it only finds the leftmost node of the right subtree.',
            'Case 2 uses parent pointers. Without parent pointers, an implementation can track the last larger candidate during a search from the root.',
            'The predecessor proof is the mirror image: right becomes left, minimum becomes maximum, and "larger" becomes "smaller".',
            'If the function returns NIL, no larger key exists for successor or no smaller key exists for predecessor.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\Theta(h)',
          display: true,
          caption: 'Both successor and predecessor move along one downward path or one upward path of length at most h.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Memorize the two-case pattern. Successor: right subtree means minimum of right; otherwise climb until you come from a left child. Predecessor is exactly symmetric.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u4l3-E1',
              source: 'Successor',
              question: 'In the example tree, what is successor(15)?',
              solution: 'Node 15 has a right subtree rooted at 18. The minimum of that right subtree is 17, so successor(15) = 17.'
            },
            {
              id: 'u4l3-E2',
              source: 'Predecessor',
              question: 'In the example tree, what is predecessor(15)?',
              solution: 'Node 15 has a left subtree rooted at 6. The maximum of that left subtree is 13, so predecessor(15) = 13.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u4l3-M1',
              source: 'No right subtree',
              question: 'Explain why successor(13) is 15 in the example tree.',
              solution: 'Node 13 has no right subtree. Climb to 7: 13 is a right child, so 7 is smaller and cannot be the successor. Climb to 6: 7 is a right child, so 6 is also smaller. Climb to 15: 6 is a left child of 15, so 15 is the first larger ancestor and therefore the successor.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'successor lives in the right subtree if it exists; otherwise climb until you turn left.',
        problem: 'in-order neighbour queries without traversing the whole tree.',
        intuition: 'mirror image of search.',
        formal: 'TREE-SUCCESSOR(x): if right[x] != NIL: return TREE-MINIMUM(right[x]); else y = parent[x]; while y != NIL and x = right[y]: x = y; y = parent[y]; return y.',
        algorithm: 'see formal.',
        worked: 'successor of 15 in (20 (10 _ 15) 30) is 20; predecessor of 15 is 10.',
        correctness: 'two cases by tree structure.',
        complexity: 'O(h).',
        trace: 'trace successor and predecessor on a small example.',
        takeaways: 'parent pointers (or recursive call) make this elegant.',
        practice: 'state the predecessor algorithm by symmetry.'
      }),
      practice: [
        mcq('algods-u4-l3-q1', 'Successor of x when x has a right child is:',
          ['Parent of x', 'TREE-MINIMUM of right[x]', 'Right child of x', 'Sibling of x'],
          1, 'The smallest node in the right subtree is the next inorder node.')
      ]
    },
    {
      title: 'BST insert',
      durationMinutes: 25,
      type: 'video',
      summary: 'Walk down to a NIL position, then attach the new leaf.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Insertion is the update version of search. To insert a new node z, search for key[z] until the search falls off the tree at a NIL child pointer. That NIL pointer is exactly where z belongs, so z is attached as a new leaf.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'BST insertion goal',
          text: 'Given a binary search tree T and a node z whose left and right children are NIL, modify parent and child pointers so that z is in T and the BST property remains true at every node.'
        },
        {
          type: 'diagram',
          title: 'Inserting key 13',
          caption: 'The search path for 13 is 15 -> 6 -> 7. Since 13 > 7 and right[7] is NIL, attach 13 as the right child of 7.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 860 350" role="img" aria-label="BST insertion diagram">
  <rect x="12" y="12" width="836" height="326" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="430" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Insert 13: descend, then attach at a NIL slot</text>
  <g stroke="#94a3b8" stroke-width="2">
    <line x1="430" y1="88" x2="260" y2="154"/>
    <line x1="430" y1="88" x2="600" y2="154"/>
    <line x1="260" y1="154" x2="160" y2="220"/>
    <line x1="260" y1="154" x2="350" y2="220"/>
    <line x1="600" y1="154" x2="525" y2="220"/>
    <line x1="600" y1="154" x2="700" y2="220"/>
  </g>
  <g stroke="#f59e0b" stroke-width="5" stroke-linecap="round">
    <line x1="420" y1="94" x2="270" y2="146"/>
    <line x1="270" y1="162" x2="340" y2="212"/>
  </g>
  <line x1="350" y1="220" x2="420" y2="286" stroke="#22c55e" stroke-width="5" stroke-linecap="round" stroke-dasharray="8 8"/>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-size="18" font-weight="900">
    <circle cx="430" cy="82" r="30" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><text x="430" y="89">15</text>
    <circle cx="260" cy="154" r="28" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><text x="260" y="161">6</text>
    <circle cx="600" cy="154" r="28" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="600" y="161">18</text>
    <circle cx="160" cy="220" r="26" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="160" y="227">3</text>
    <circle cx="350" cy="220" r="26" fill="#fef3c7" stroke="#f59e0b" stroke-width="3"/><text x="350" y="227">7</text>
    <circle cx="525" cy="220" r="26" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="525" y="227">17</text>
    <circle cx="700" cy="220" r="26" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="700" y="227">20</text>
    <circle cx="420" cy="286" r="26" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/><text x="420" y="293">13</text>
  </g>
  <text x="430" y="324" text-anchor="middle" font-size="15" font-weight="800" fill="#047857">new node is a leaf: left[13] = NIL and right[13] = NIL</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'TREE-INSERT',
          language: 'pseudocode',
          code: `TREE-INSERT(T, z)
    y = NIL
    x = root[T]
    while x != NIL
        y = x
        if key[z] < key[x]
            x = left[x]
        else
            x = right[x]
    parent[z] = y
    if y == NIL
        root[T] = z
    else if key[z] < key[y]
        left[y] = z
    else
        right[y] = z`
        },
        {
          type: 'interactive',
          artifact: 'bst-tree-visualizer'
        },
        {
          type: 'table',
          caption: 'Trace for inserting 13.',
          columns: ['Step', 'x', 'y', 'Comparison', 'Move'],
          rows: [
            ['Start', '15', 'NIL', '13 < 15', 'set y = 15; go left'],
            ['Next', '6', '15', '13 > 6', 'set y = 6; go right'],
            ['Next', '7', '6', '13 > 7', 'set y = 7; go right'],
            ['Stop', 'NIL', '7', 'right[7] is NIL', 'attach 13 as right[7]']
          ]
        },
        {
          type: 'heading',
          text: 'Definitions and conventions',
          level: 2
        },
        {
          type: 'table',
          caption: 'Pointer roles in insertion.',
          columns: ['Symbol', 'Meaning', 'Why it is needed'],
          rows: [
            ['z', 'The new node to insert.', 'Its key determines the descent path; its children start as NIL.'],
            ['x', 'The current node during descent.', 'When x becomes NIL, the search has found the insertion slot.'],
            ['y', 'The parent of x from the previous step.', 'When x is NIL, y is the parent that must receive z.'],
            ['root[T]', 'The root pointer of the whole tree.', 'If the tree was empty, z becomes the root.']
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Duplicate keys',
          text: 'CLRS sends key[z] >= key[x] to the right in this pseudocode. Other courses may send duplicates left or store a count in the node. The important rule is consistency: the BST property and every operation must use the same convention.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Search-path invariant',
          text: 'At the start of every loop iteration, all comparisons already made prove that z belongs somewhere inside the subtree rooted at x, or at the NIL child position reached from its parent y. The next comparison preserves that fact by choosing the only child subtree whose key range can contain key[z].'
        },
        {
          type: 'list',
          items: [
            'When the loop stops, x is NIL, so no existing node is overwritten.',
            'If z is attached as left[y], then key[z] < key[y], and all earlier comparisons also place z in the correct ancestor ranges.',
            'If z is attached as right[y], then key[z] >= key[y] under the CLRS duplicate convention, again with all ancestor comparisons respected.',
            'No other subtree changes, so every old BST relationship remains true.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'formula',
          latex: 'T(h) = \\Theta(h)',
          display: true,
          caption: 'Insertion follows one downward path whose length is at most the tree height h.'
        },
        {
          type: 'table',
          caption: 'Insertion costs.',
          columns: ['Tree shape', 'Height h', 'Insertion time', 'Extra space'],
          rows: [
            ['Balanced', 'Theta(log n)', 'Theta(log n)', 'Theta(1) iterative'],
            ['Skewed', 'Theta(n)', 'Theta(n)', 'Theta(1) iterative'],
            ['Empty tree', '0', 'Theta(1)', 'Theta(1)']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'BST insertion does not rebalance an ordinary BST. It only attaches a new leaf at the NIL position reached by search, so the general bound is O(h), not automatically O(log n).'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u4l4-E1',
              source: 'Trace',
              question: 'Starting from root 10 with left child 5 and right child 15, where is key 12 inserted?',
              solution: 'Compare 12 with 10 and go right to 15. Compare 12 with 15 and go left. The left child of 15 is NIL, so 12 is inserted as left[15].'
            },
            {
              id: 'u4l4-E2',
              source: 'Empty tree',
              question: 'What happens when TREE-INSERT is called on an empty tree?',
              solution: 'The while loop never runs because root[T] is NIL. Thus y stays NIL, and the algorithm sets root[T] = z.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u4l4-M1',
              source: 'Build a tree',
              question: 'Insert 50, 30, 70, 20, 40, 60, 80 into an initially empty BST. What is the final shape?',
              solution: '50 is the root. 30 is left of 50 and 70 is right of 50. Then 20 and 40 become the left and right children of 30; 60 and 80 become the left and right children of 70.'
            },
            {
              id: 'u4l4-M2',
              source: 'Correctness',
              question: 'Why is it enough to check only the path followed by insertion?',
              solution: 'Only pointers on the final parent-child attachment change. All subtrees not on the search path are untouched, and every ancestor comparison on the path records the key range in which z must lie. Therefore the old BST property remains true everywhere else, and z is placed consistently with each ancestor.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'find the unique NIL position by binary descent and link the new node there.',
        problem: 'maintain BST property after inserting a new key.',
        intuition: 'every key has a unique "would-be" location; just walk to it.',
        formal: 'TREE-INSERT(T, z): walk x from root, tracking parent y; descend by comparison; attach z as left/right child of y.',
        algorithm: 'see formal.',
        worked: 'insert 41 into our example tree.',
        correctness: 'BST property holds because z is attached at a NIL slot consistent with comparisons.',
        complexity: 'O(h).',
        trace: 'animate inserting four keys into an initially empty BST.',
        takeaways: 'duplicates can go either side by convention; pick one and stick with it.',
        practice: 'insert 50, 30, 70, 20, 40, 60, 80 in that order; show the resulting tree.'
      }),
      practice: [
        mcq('algods-u4-l4-q1', 'BST insert always places the new node at:',
          ['The root.', 'A leaf position.', 'A random internal node.', 'The deepest existing node.'],
          1, 'It descends to a NIL slot — i.e., a leaf attachment.')
      ]
    },
    {
      title: 'BST delete',
      durationMinutes: 35,
      type: 'interactive',
      summary: 'Three cases handled with TRANSPLANT.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Deletion removes a node z while preserving the in-order order of the remaining keys. The easy cases remove z directly. The two-child case replaces z by its successor y, because y is the smallest key larger than z and therefore fits between z\'s left and right subtrees.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'TRANSPLANT',
          text: 'TRANSPLANT(T, u, v) replaces the subtree rooted at u with the subtree rooted at v in u\'s parent. It changes parent-child links only around u, v, and parent[u]; it does not repair v\'s children.'
        },
        {
          type: 'code',
          title: 'TRANSPLANT',
          language: 'pseudocode',
          code: `TRANSPLANT(T, u, v)
    if parent[u] == NIL
        root[T] = v
    else if u == left[parent[u]]
        left[parent[u]] = v
    else
        right[parent[u]] = v
    if v != NIL
        parent[v] = parent[u]`
        },
        {
          type: 'heading',
          text: 'The three deletion cases',
          level: 2
        },
        {
          type: 'diagram',
          title: 'Delete by structural case',
          caption: 'Cases 0 and 1 remove z directly. Case 2 moves z\'s successor y into z\'s position.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 390" role="img" aria-label="BST delete cases diagram">
  <rect x="12" y="12" width="876" height="366" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="450" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">BST delete: 0 child, 1 child, 2 children</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <rect x="38" y="76" width="250" height="260" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="163" y="106" font-size="16" font-weight="900" fill="#0f2038">0 children</text>
    <line x1="163" y1="150" x2="105" y2="208" stroke="#94a3b8" stroke-width="2"/>
    <line x1="163" y1="150" x2="220" y2="208" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="163" cy="146" r="25" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="163" y="153" font-size="17" font-weight="900">8</text>
    <circle cx="105" cy="208" r="23" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/><text x="105" y="215" font-size="15" font-weight="900">5</text>
    <circle cx="220" cy="208" r="23" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="220" y="215" font-size="15" font-weight="900">9</text>
    <text x="163" y="274" font-size="14" fill="#334155">TRANSPLANT(T, 5, NIL)</text>
    <text x="163" y="302" font-size="14" fill="#047857" font-weight="800">just remove the leaf</text>

    <rect x="324" y="76" width="250" height="260" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="449" y="106" font-size="16" font-weight="900" fill="#0f2038">1 child</text>
    <line x1="449" y1="150" x2="390" y2="208" stroke="#94a3b8" stroke-width="2"/>
    <line x1="390" y1="208" x2="350" y2="266" stroke="#22c55e" stroke-width="4" stroke-dasharray="8 8"/>
    <circle cx="449" cy="146" r="25" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="449" y="153" font-size="17" font-weight="900">12</text>
    <circle cx="390" cy="208" r="23" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/><text x="390" y="215" font-size="15" font-weight="900">10</text>
    <circle cx="350" cy="266" r="23" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/><text x="350" y="273" font-size="15" font-weight="900">9</text>
    <text x="449" y="302" font-size="14" fill="#047857" font-weight="800">child 9 moves into 10's place</text>

    <rect x="610" y="76" width="250" height="260" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="735" y="106" font-size="16" font-weight="900" fill="#0f2038">2 children</text>
    <line x1="735" y1="150" x2="675" y2="208" stroke="#94a3b8" stroke-width="2"/>
    <line x1="735" y1="150" x2="792" y2="208" stroke="#94a3b8" stroke-width="2"/>
    <line x1="792" y1="208" x2="748" y2="266" stroke="#22c55e" stroke-width="4" stroke-dasharray="8 8"/>
    <circle cx="735" cy="146" r="25" fill="#fee2e2" stroke="#ef4444" stroke-width="3"/><text x="735" y="153" font-size="17" font-weight="900">15</text>
    <circle cx="675" cy="208" r="23" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="675" y="215" font-size="15" font-weight="900">6</text>
    <circle cx="792" cy="208" r="23" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/><text x="792" y="215" font-size="15" font-weight="900">18</text>
    <circle cx="748" cy="266" r="23" fill="#dcfce7" stroke="#22c55e" stroke-width="3"/><text x="748" y="273" font-size="15" font-weight="900">17</text>
    <text x="735" y="302" font-size="14" fill="#047857" font-weight="800">successor 17 replaces 15</text>
  </g>
</svg>`
        },
        {
          type: 'code',
          title: 'TREE-DELETE',
          language: 'pseudocode',
          code: `TREE-DELETE(T, z)
    if left[z] == NIL
        TRANSPLANT(T, z, right[z])
    else if right[z] == NIL
        TRANSPLANT(T, z, left[z])
    else
        y = TREE-MINIMUM(right[z])
        if parent[y] != z
            TRANSPLANT(T, y, right[y])
            right[y] = right[z]
            parent[right[y]] = y
        TRANSPLANT(T, z, y)
        left[y] = left[z]
        parent[left[y]] = y`
        },
        {
          type: 'interactive',
          artifact: 'bst-tree-visualizer'
        },
        {
          type: 'table',
          caption: 'Deletion cases in CLRS order.',
          columns: ['Condition', 'What happens', 'Why it preserves order'],
          rows: [
            ['left[z] == NIL', 'Replace z by right[z]. This includes the zero-child case when right[z] is also NIL.', 'Every key in right[z] is greater than or equal to key[z], and z had no left subtree that must stay below it.'],
            ['right[z] == NIL', 'Replace z by left[z].', 'Every key in left[z] is less than or equal to key[z], and z had no right subtree that must stay above it.'],
            ['Both children exist', 'Let y be TREE-MINIMUM(right[z]), the successor of z. Move y into z\'s position.', 'All keys in left[z] are less than y, and all keys in right[z] except y are greater than or equal to y.']
          ]
        },
        {
          type: 'heading',
          text: 'Worked two-child example',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Delete z = 15 from a tree whose right subtree is rooted at 18 and whose successor is y = 17. The successor is the leftmost node in z\'s right subtree, so it has no left child. It may still have a right child, and the algorithm handles that child with TRANSPLANT(T, y, right[y]).'
        },
        {
          type: 'table',
          caption: 'Trace when successor is not the direct right child.',
          columns: ['Step', 'Pointer operation', 'Effect'],
          rows: [
            ['1', 'y = TREE-MINIMUM(right[15])', 'Find y = 17. Since it is leftmost in the right subtree, left[17] = NIL.'],
            ['2', 'TRANSPLANT(T, 17, right[17])', 'Remove 17 from its old position. If 17 has a right child, that child moves up into 17\'s old spot.'],
            ['3', 'right[17] = right[15]', 'Give 17 the old right subtree of 15.'],
            ['4', 'TRANSPLANT(T, 15, 17)', 'Move 17 into 15\'s old position.'],
            ['5', 'left[17] = left[15]', 'Give 17 the old left subtree of 15.']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common mistake',
          text: 'The successor of z has no left child, but it is not necessarily a leaf. It can have a right child. That is why the two-child algorithm first transplants y with right[y] when y is not z\'s direct right child.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why the successor fits',
          text: 'When z has two children, y = TREE-MINIMUM(right[z]) is the smallest key larger than z. Therefore every key in left[z] is less than y. Also, because y came from right[z] and was its minimum, every remaining key in z\'s old right subtree is at least y. Placing y where z was preserves the BST split.'
        },
        {
          type: 'list',
          items: [
            'Case 0 is covered by left[z] == NIL and right[z] == NIL: replace z by NIL.',
            'Case 1 replaces z by its only child; that child subtree already lies entirely on the correct side of every ancestor of z.',
            'Case 2 removes successor y from its old location, where y has no left child, then gives y both old children of z.',
            'TRANSPLANT updates parent pointers around the replaced root; the explicit assignments in TREE-DELETE update y\'s new children.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'formula',
          latex: 'T(h) = \\Theta(h)',
          display: true,
          caption: 'The only unbounded walk is TREE-MINIMUM(right[z]) in the two-child case; it descends at most h edges.'
        },
        {
          type: 'table',
          caption: 'Deletion costs.',
          columns: ['Case', 'Number of tree walks', 'Pointer work', 'Asymptotic time'],
          rows: [
            ['0 children', '0', 'Constant', 'Theta(1) after z is known'],
            ['1 child', '0', 'Constant', 'Theta(1) after z is known'],
            ['2 children', 'Find successor inside right subtree', 'Constant after successor is found', 'Theta(h)'],
            ['Including search for z by key', 'One search path plus possible successor path', 'Constant extra state', 'Theta(h) total']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Write delete using TRANSPLANT. For two children, use the successor, not an arbitrary right-subtree node. Remember: the successor has no left child, but may have a right child.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u4l5-E1',
              source: 'Cases',
              question: 'If z has no children, which TREE-DELETE branch applies?',
              solution: 'The first branch applies because left[z] == NIL. It calls TRANSPLANT(T, z, right[z]); since right[z] is also NIL, z is simply removed.'
            },
            {
              id: 'u4l5-E2',
              source: 'Successor child',
              question: 'Can the successor used in BST deletion have a right child?',
              solution: 'Yes. The successor is the minimum of z\'s right subtree, so it has no left child, but it can have a right child. CLRS handles this with TRANSPLANT(T, y, right[y]).'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u4l5-M1',
              source: 'Two-child delete',
              question: 'In a BST, node 20 has left subtree keys {5, 12, 17} and right subtree keys {25, 23, 30}. Which key replaces 20 under CLRS deletion, and why?',
              solution: 'The successor replaces 20. It is the minimum key in the right subtree, which is 23. Since 23 is larger than every key in the left subtree and no larger right-subtree key needs to move below it, it can preserve the BST split at 20\'s old position.'
            },
            {
              id: 'u4l5-M2',
              source: 'Trace',
              question: 'Suppose z has two children and its successor y is not right[z]. Explain the purpose of TRANSPLANT(T, y, right[y]) before y replaces z.',
              solution: 'That call removes y from its old location. Since y is the leftmost node in right[z], y has no left child, so its right child, if present, can move into y\'s old position without violating the BST property. After that, y is free to replace z and receive z\'s old left and right children.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'no children: snip; one child: pull child up; two children: replace by successor.',
        problem: 'remove a node and keep BST property.',
        intuition: 'the only hard case is two children; using the successor preserves invariants.',
        formal: 'TRANSPLANT(T, u, v) replaces the subtree rooted at u with the subtree rooted at v in u\'s parent.',
        algorithm: 'TREE-DELETE(T, z): three cases as above; case 3 splices in successor.',
        worked: 'delete a leaf, a one-child node, and a two-child node from a 7-node tree.',
        correctness: 'verify BST property in each of the three cases.',
        complexity: 'O(h).',
        trace: 'animate the three cases with arrows for parent pointer updates.',
        takeaways: 'TRANSPLANT is the helper you should remember; it removes most of the bookkeeping.',
        practice: 'delete 5 from a tree where 5 has two children with successor 6; sketch the resulting tree.'
      }),
      practice: [
        mcq('algods-u4-l5-q1', 'Why does BST delete with two children use the successor?',
          ['It is the easiest to find.', 'Successor has no left child, so its old position has at most one child.', 'Successor is always a leaf.', 'Successor is always the root.'],
          1, 'Successor lies in the right subtree and has no left child; it may still have a right child, which TRANSPLANT handles.')
      ]
    },
    {
      title: 'Red-black tree invariants',
      durationMinutes: 30,
      type: 'video',
      summary: 'Five properties that bound height by 2 lg(n+1).',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A red-black tree is a binary search tree with one extra bit of information per node: a color, red or black. The colors are constrained so that no path becomes much longer than any other. The reward is guaranteed logarithmic height after arbitrary updates.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Red-black tree',
          text: 'A red-black tree is a BST satisfying five color properties: every node is red or black; the root is black; every NIL leaf is black; every red node has black children; and every simple path from a node to its descendant NIL leaves has the same number of black nodes.'
        },
        {
          type: 'diagram',
          title: 'A small red-black tree',
          caption: 'NIL leaves are real black sentinel leaves for the invariants, even when drawings omit most of them.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 410" role="img" aria-label="Red-black tree invariants diagram">
  <rect x="12" y="12" width="876" height="386" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="450" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Red-black invariants keep all root-to-NIL paths balanced</text>
  <g stroke="#94a3b8" stroke-width="2">
    <line x1="450" y1="92" x2="290" y2="168"/>
    <line x1="450" y1="92" x2="610" y2="168"/>
    <line x1="290" y1="168" x2="205" y2="244"/>
    <line x1="290" y1="168" x2="375" y2="244"/>
    <line x1="610" y1="168" x2="525" y2="244"/>
    <line x1="610" y1="168" x2="695" y2="244"/>
    <line x1="205" y1="244" x2="165" y2="318"/>
    <line x1="205" y1="244" x2="245" y2="318"/>
    <line x1="375" y1="244" x2="335" y2="318"/>
    <line x1="375" y1="244" x2="415" y2="318"/>
    <line x1="525" y1="244" x2="485" y2="318"/>
    <line x1="525" y1="244" x2="565" y2="318"/>
    <line x1="695" y1="244" x2="655" y2="318"/>
    <line x1="695" y1="244" x2="735" y2="318"/>
  </g>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-size="17" font-weight="900">
    <circle cx="450" cy="86" r="30" fill="#111827" stroke="#111827" stroke-width="3"/><text x="450" y="93" fill="#ffffff">10</text>
    <circle cx="290" cy="168" r="27" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="290" y="175" fill="#ffffff">5</text>
    <circle cx="610" cy="168" r="27" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="610" y="175" fill="#ffffff">15</text>
    <circle cx="205" cy="244" r="25" fill="#111827" stroke="#111827" stroke-width="3"/><text x="205" y="251" fill="#ffffff">2</text>
    <circle cx="375" cy="244" r="25" fill="#111827" stroke="#111827" stroke-width="3"/><text x="375" y="251" fill="#ffffff">7</text>
    <circle cx="525" cy="244" r="25" fill="#111827" stroke="#111827" stroke-width="3"/><text x="525" y="251" fill="#ffffff">12</text>
    <circle cx="695" cy="244" r="25" fill="#111827" stroke="#111827" stroke-width="3"/><text x="695" y="251" fill="#ffffff">18</text>
    <rect x="141" y="302" width="48" height="32" rx="10" fill="#111827"/><text x="165" y="324" fill="#ffffff" font-size="13">NIL</text>
    <rect x="221" y="302" width="48" height="32" rx="10" fill="#111827"/><text x="245" y="324" fill="#ffffff" font-size="13">NIL</text>
    <rect x="311" y="302" width="48" height="32" rx="10" fill="#111827"/><text x="335" y="324" fill="#ffffff" font-size="13">NIL</text>
    <rect x="391" y="302" width="48" height="32" rx="10" fill="#111827"/><text x="415" y="324" fill="#ffffff" font-size="13">NIL</text>
    <rect x="461" y="302" width="48" height="32" rx="10" fill="#111827"/><text x="485" y="324" fill="#ffffff" font-size="13">NIL</text>
    <rect x="541" y="302" width="48" height="32" rx="10" fill="#111827"/><text x="565" y="324" fill="#ffffff" font-size="13">NIL</text>
    <rect x="631" y="302" width="48" height="32" rx="10" fill="#111827"/><text x="655" y="324" fill="#ffffff" font-size="13">NIL</text>
    <rect x="711" y="302" width="48" height="32" rx="10" fill="#111827"/><text x="735" y="324" fill="#ffffff" font-size="13">NIL</text>
  </g>
  <text x="450" y="374" text-anchor="middle" font-size="15" font-weight="800" fill="#334155">Each root-to-NIL path contains the same number of black nodes.</text>
</svg>`
        },
        {
          type: 'heading',
          text: 'The five properties',
          level: 2
        },
        {
          type: 'table',
          caption: 'CLRS red-black properties.',
          columns: ['#', 'Property', 'What to check'],
          rows: [
            ['1', 'Every node is either red or black.', 'There is no third color and no uncolored internal node.'],
            ['2', 'The root is black.', 'The top internal node must be black.'],
            ['3', 'Every leaf NIL is black.', 'The sentinel leaves count as black leaves.'],
            ['4', 'If a node is red, then both its children are black.', 'No red node may have a red parent or red child.'],
            ['5', 'For each node, all simple paths from that node to descendant NIL leaves contain the same number of black nodes.', 'This common count is the node\'s black-height.']
          ]
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Black-height',
          text: 'The black-height bh(x) is the number of black nodes on any simple path from, but not including, node x down to a descendant NIL leaf. Property 5 makes this number well-defined.'
        },
        {
          type: 'interactive',
          artifact: 'rb-tree-visualizer'
        },
        {
          type: 'heading',
          text: 'Checking an example',
          level: 2
        },
        {
          type: 'table',
          caption: 'Invariant audit for the diagram.',
          columns: ['Property', 'Status', 'Reason'],
          rows: [
            ['Colors', 'OK', 'Every internal node is drawn red or black.'],
            ['Root black', 'OK', 'The root 10 is black.'],
            ['NIL leaves black', 'OK', 'All sentinel leaves are black rectangles.'],
            ['Red nodes have black children', 'OK', 'The red nodes 5 and 15 each have black children.'],
            ['Equal black-height', 'OK', 'From root 10 to any NIL leaf, the path contains two black nodes after the root: one black child and one NIL.']
          ]
        },
        {
          type: 'heading',
          text: 'Why height is logarithmic',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Two facts create the height bound. First, property 4 says at least half the nodes on any root-to-leaf path are black, because red nodes cannot be adjacent. Second, property 5 says a subtree with black-height b contains many internal nodes.'
        },
        {
          type: 'formula',
          latex: '\\text{If } bh(x)=b, \\text{ then the subtree rooted at } x \\text{ contains at least } 2^b-1 \\text{ internal nodes.}',
          display: true,
          caption: 'This is proved by induction on black-height.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Height proof sketch',
          text: 'Let h be the height of a red-black tree with n internal nodes. Since red nodes cannot be adjacent, the root-to-leaf path of length h contains at least h/2 black nodes below the root, so bh(root) >= h/2. The subtree-size lemma gives n >= 2^(bh(root)) - 1 >= 2^(h/2) - 1. Rearranging gives h <= 2 lg(n + 1).'
        },
        {
          type: 'formula',
          latex: 'h \\le 2\\lg(n+1) = O(\\log n)',
          display: true,
          caption: 'Therefore search, minimum, maximum, predecessor, successor, insert, and delete can all be kept logarithmic when updates restore the invariants.'
        },
        {
          type: 'heading',
          text: 'What rotations will preserve',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The next red-black lessons use recoloring and rotations to restore these properties after updates. A rotation changes a local parent-child relationship but preserves the BST in-order order and the set of keys. Recoloring changes only colors. Together they repair red-black violations without changing sorted order.'
        },
        {
          type: 'list',
          items: [
            'Search-tree order is still the ordinary BST property.',
            'NIL leaves are black and participate in black-height counts.',
            'A red node can have a black parent, but it cannot have a red parent because red-red edges are illegal.',
            'Not every balanced-looking colored BST is a red-black tree; every one of the five properties must hold.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Consequences of the invariants.',
          columns: ['Operation family', 'Ordinary BST bound', 'Red-black tree bound', 'Reason'],
          rows: [
            ['Queries', 'O(h)', 'O(log n)', 'Height is at most 2 lg(n+1).'],
            ['Insertion', 'O(h)', 'O(log n)', 'BST insert plus logarithmic fix-up.'],
            ['Deletion', 'O(h)', 'O(log n)', 'BST delete plus logarithmic fix-up.'],
            ['Per node storage', 'key, children, parent', 'same plus one color bit', 'The balancing information is only a color.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'State all five properties exactly. The root is black, NIL leaves are black, red nodes have black children, and black-height is equal on all paths from each node to its descendant NIL leaves. The standard height bound is h <= 2 lg(n+1).'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u4l6-E1',
              source: 'Properties',
              question: 'Can a red node have one red child and one black child in a red-black tree?',
              solution: 'No. Property 4 says that if a node is red, then both of its children are black.'
            },
            {
              id: 'u4l6-E2',
              source: 'NIL leaves',
              question: 'What color are NIL leaves?',
              solution: 'NIL leaves are black. They are sentinel leaves and are counted when checking black-height.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u4l6-M1',
              source: 'Height bound',
              question: 'Use the red-node property to explain why a root-to-leaf path of height h has at least h/2 black nodes.',
              solution: 'Red nodes cannot be adjacent, because every red node must have black children. Thus along any path, red nodes can appear only between black nodes. At least half of the nodes on the path, up to constant endpoint details, must be black, so the black-height is at least h/2.'
            },
            {
              id: 'u4l6-M2',
              source: 'Invariant audit',
              question: 'A tree has a black root, red left child, red right child, and all four grandchildren black NIL leaves. Is it a valid red-black tree?',
              solution: 'Yes. The root is black; NIL leaves are black; both red internal nodes have black NIL children; and every root-to-NIL path has the same black count.'
            },
            {
              id: 'u4l6-M3',
              source: 'Invalid example',
              question: 'A tree has black root 10 with a red left child 5 and a red right child 15. Node 5 has a red left child 2. Which red-black property fails?',
              solution: 'Property 4 fails: node 5 is red, but its left child 2 is also red, so a red node has a red child. Property 5 is also at risk because the path through 2 carries fewer black internal nodes than the path through 15. Recoloring 5 and 15 black (and 10 red, then root black) repairs it — exactly what RB-INSERT-FIXUP Case 1 does.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'colour nodes red or black so that black-height is the same on every root-to-leaf path.',
        problem: 'keep BST height O(log n) under any insertion/deletion sequence.',
        intuition: 'no two consecutive reds; equal black-height to all NIL leaves.',
        formal: '(1) every node is red or black; (2) root is black; (3) every leaf NIL is black; (4) red node has black children; (5) every root-to-leaf path has the same number of black nodes.',
        algorithm: 'no algorithm yet — just the invariants.',
        worked: 'show a small RB tree and verify all 5 properties.',
        correctness: 'the invariants imply height <= 2 lg(n+1) by counting black nodes.',
        complexity: 'all operations O(log n) under these invariants.',
        trace: 'check whether a given tree satisfies all five.',
        takeaways: 'the height bound is what makes RB trees important.',
        practice: 'prove the bound h <= 2 lg(n+1) using black-height.'
      }),
      practice: [
        mcq('algods-u4-l6-q1', 'Which is the tightest known height bound for a red-black tree of n nodes?',
          ['lg n', '2 lg(n+1)', 'sqrt(n)', 'log_3 n'],
          1, 'A standard induction on black-height yields h <= 2 lg(n+1).')
      ]
    },
    {
      title: 'Rotations',
      durationMinutes: 30,
      type: 'interactive',
      summary: 'LEFT-ROTATE and RIGHT-ROTATE: the only structural moves.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A rotation is a constant-time local rewrite of a binary search tree. It changes which node is the parent of another node, but it does not change the sorted order of the keys. Balanced search trees use rotations because they can shorten one side of a tree and lengthen the other while preserving the BST property.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Rotation',
          text: 'A left rotation at x assumes right[x] is not NIL. Let y = right[x]. After the rotation, y moves into x\'s old position, x becomes y\'s left child, and y\'s old left subtree becomes x\'s right subtree. A right rotation is the mirror image.'
        },
        {
          type: 'diagram',
          title: 'LEFT-ROTATE(T, x)',
          caption: 'The middle subtree beta moves from left[y] to right[x]. The in-order sequence alpha, x, beta, y, gamma is unchanged.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 420" role="img" aria-label="Left rotation diagram">
  <defs>
    <marker id="rotate-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="896" height="396" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Rotation preserves in-order order</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <text x="230" y="82" font-size="16" font-weight="900" fill="#334155">before</text>
    <line x1="230" y1="130" x2="140" y2="210" stroke="#94a3b8" stroke-width="2"/>
    <line x1="230" y1="130" x2="320" y2="210" stroke="#94a3b8" stroke-width="2"/>
    <line x1="320" y1="210" x2="270" y2="294" stroke="#94a3b8" stroke-width="2"/>
    <line x1="320" y1="210" x2="370" y2="294" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="230" cy="126" r="29" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/><text x="230" y="133" font-size="18" font-weight="900">x</text>
    <circle cx="320" cy="210" r="29" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="320" y="217" font-size="18" font-weight="900">y</text>
    <path d="M92 236 Q140 186 188 236 L172 318 L108 318 Z" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <text x="140" y="276" font-size="18" font-weight="900">alpha</text>
    <path d="M222 320 Q270 270 318 320 L302 374 L238 374 Z" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <text x="270" y="346" font-size="18" font-weight="900">beta</text>
    <path d="M322 320 Q370 270 418 320 L402 374 L338 374 Z" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <text x="370" y="346" font-size="18" font-weight="900">gamma</text>

    <line x1="420" y1="220" x2="500" y2="220" stroke="#0f766e" stroke-width="4" marker-end="url(#rotate-arrow)"/>
    <text x="460" y="202" font-size="15" font-weight="900" fill="#0f766e">left rotate</text>

    <text x="690" y="82" font-size="16" font-weight="900" fill="#334155">after</text>
    <line x1="690" y1="130" x2="600" y2="210" stroke="#94a3b8" stroke-width="2"/>
    <line x1="690" y1="130" x2="780" y2="210" stroke="#94a3b8" stroke-width="2"/>
    <line x1="600" y1="210" x2="550" y2="294" stroke="#94a3b8" stroke-width="2"/>
    <line x1="600" y1="210" x2="650" y2="294" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="690" cy="126" r="29" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="690" y="133" font-size="18" font-weight="900">y</text>
    <circle cx="600" cy="210" r="29" fill="#eff6ff" stroke="#2563eb" stroke-width="3"/><text x="600" y="217" font-size="18" font-weight="900">x</text>
    <path d="M502 320 Q550 270 598 320 L582 374 L518 374 Z" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <text x="550" y="346" font-size="18" font-weight="900">alpha</text>
    <path d="M602 320 Q650 270 698 320 L682 374 L618 374 Z" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <text x="650" y="346" font-size="18" font-weight="900">beta</text>
    <path d="M732 236 Q780 186 828 236 L812 318 L748 318 Z" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
    <text x="780" y="276" font-size="18" font-weight="900">gamma</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'LEFT-ROTATE pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'LEFT-ROTATE',
          language: 'pseudocode',
          code: `LEFT-ROTATE(T, x)
    y = right[x]
    right[x] = left[y]
    if left[y] != NIL
        parent[left[y]] = x
    parent[y] = parent[x]
    if parent[x] == NIL
        root[T] = y
    else if x == left[parent[x]]
        left[parent[x]] = y
    else
        right[parent[x]] = y
    left[y] = x
    parent[x] = y`
        },
        {
          type: 'code',
          title: 'RIGHT-ROTATE by symmetry',
          language: 'pseudocode',
          code: `RIGHT-ROTATE(T, y)
    x = left[y]
    left[y] = right[x]
    if right[x] != NIL
        parent[right[x]] = y
    parent[x] = parent[y]
    if parent[y] == NIL
        root[T] = x
    else if y == right[parent[y]]
        right[parent[y]] = x
    else
        left[parent[y]] = x
    right[x] = y
    parent[y] = x`
        },
        {
          type: 'interactive',
          artifact: 'rb-tree-visualizer'
        },
        {
          type: 'heading',
          text: 'What changes and what stays fixed',
          level: 2
        },
        {
          type: 'table',
          caption: 'Local pointer effects of LEFT-ROTATE(T, x).',
          columns: ['Object', 'Before', 'After'],
          rows: [
            ['x', 'Parent of y; right child is y.', 'Left child of y; right child becomes beta.'],
            ['y', 'Right child of x; left child is beta.', 'Moves into x\'s old parent position.'],
            ['beta = left[y]', 'Between x and y in sorted order.', 'Becomes right[x].'],
            ['alpha, gamma', 'Outer subtrees.', 'Remain attached to x and y respectively.'],
            ['In-order keys', 'alpha, x, beta, y, gamma.', 'Exactly alpha, x, beta, y, gamma.']
          ]
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'table',
          caption: 'Rotate left at x = 10.',
          columns: ['Before subtree', 'Operation', 'After subtree'],
          rows: [
            ['10 has left subtree A and right child 20.', 'Let y = 20.', '20 will become the new local root.'],
            ['20 has left subtree 15 and right subtree C.', 'Move 15 to right[10].', '10 keeps A on the left and receives 15 on the right.'],
            ['10 was attached to parent p.', 'Replace 10 by 20 under p.', '20 now has left child 10 and right subtree C.']
          ]
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Correctness by in-order preservation',
          text: 'Before the left rotation, all keys in alpha are less than x, all keys in beta lie between x and y, and all keys in gamma are greater than y. After the rotation, alpha is still left of x, beta is still between x and y, and gamma is still right of y. Therefore the BST property is preserved.'
        },
        {
          type: 'heading',
          text: 'Runtime and use',
          level: 2
        },
        {
          type: 'formula',
          latex: 'T_{\\text{rotate}} = \\Theta(1)',
          display: true,
          caption: 'A rotation updates a constant number of child and parent pointers.'
        },
        {
          type: 'list',
          items: [
            'A rotation is legal only when the required child exists: right[x] for a left rotation, left[y] for a right rotation.',
            'Rotations do not compare keys, allocate nodes, delete nodes, or change colors by themselves.',
            'Red-black insert fix-up uses at most two rotations; red-black delete fix-up uses at most three rotations.',
            'AVL trees, red-black trees, splay trees, and treaps all rely on rotations in different ways.'
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Know the pointer order: save y, move beta, attach y to x\'s old parent, then make x the left child of y. The one-line proof is that in-order traversal is unchanged.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u4l7-E1',
              source: 'Legality',
              question: 'When is LEFT-ROTATE(T, x) illegal?',
              solution: 'It is illegal when right[x] is NIL, because the rotation needs y = right[x] to move into x\'s position.'
            },
            {
              id: 'u4l7-E2',
              source: 'Invariant',
              question: 'Does a rotation change the set of keys in the tree?',
              solution: 'No. It only changes pointers among existing nodes and subtrees; no key is inserted or removed.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u4l7-M1',
              source: 'Trace',
              question: 'Suppose x = 10, right[x] = y = 20, and left[y] = 15. After LEFT-ROTATE(T, x), where is 15?',
              solution: 'The subtree rooted at 15 becomes right[x], so 15 is the right child or right subtree of 10 after the rotation.'
            },
            {
              id: 'u4l7-M2',
              source: 'Proof',
              question: 'Explain why beta can safely become right[x] in a left rotation.',
              solution: 'Before rotation, beta = left[y]. Since y was right[x], every key in beta is greater than key[x]. Since beta was left[y], every key in beta is less than key[y]. Thus beta belongs between x and y, so it is valid as x\'s right subtree after y moves above x.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'a rotation rebalances a tree locally without breaking BST order.',
        problem: 'modify height while preserving the BST property.',
        intuition: 'pivot a parent-child pair; reattach the dangling subtree.',
        formal: 'LEFT-ROTATE(T, x): y = right[x]; right[x] = left[y]; if left[y] != NIL: parent[left[y]] = x; parent[y] = parent[x]; (replace x in parent); left[y] = x; parent[x] = y.',
        algorithm: 'see formal; RIGHT-ROTATE is symmetric.',
        worked: 'rotate around node 5 in (3 _ (5 _ 7)) to get ((3 _ 5) _ 7).',
        correctness: 'in-order traversal is unchanged.',
        complexity: 'Θ(1) per rotation.',
        trace: 'rotate left then right; verify the inorder is preserved.',
        takeaways: 'rotations are the basic building blocks of every balanced BST.',
        practice: 'rotate left in a tree where x is the root.'
      }),
      practice: [
        mcq('algods-u4-l7-q1', 'A rotation changes:',
          ['The inorder traversal.', 'The set of keys.', 'The local structure but not the inorder.', 'Heights only when the tree is balanced.'],
          2, 'Rotations preserve the inorder; they reshape the tree.')
      ]
    },
    {
      title: 'RB-INSERT and RB-DELETE',
      durationMinutes: 40,
      type: 'interactive',
      summary: 'Three insertion-fix cases and the four deletion-fix cases.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Red-black updates start with the ordinary BST update, then repair any color-property violations. Insert is conceptually simpler: insert the new node as red, then repair possible red-red violations. Delete is harder because removing a black node can reduce black-height on one side; CLRS tracks that missing blackness with a fix-up pointer x.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Why insert red?',
          text: 'A red new node does not change black-height, so property 5 remains safe. The only possible new violation is property 4: the new red node may have a red parent.'
        },
        {
          type: 'heading',
          text: 'RB-INSERT',
          level: 2
        },
        {
          type: 'code',
          title: 'RB-INSERT',
          language: 'pseudocode',
          code: `RB-INSERT(T, z)
    TREE-INSERT(T, z)
    color[z] = RED
    left[z] = NIL
    right[z] = NIL
    RB-INSERT-FIXUP(T, z)`
        },
        {
          type: 'code',
          title: 'RB-INSERT-FIXUP, left-side cases',
          language: 'pseudocode',
          code: `RB-INSERT-FIXUP(T, z)
    while color[parent[z]] == RED
        if parent[z] == left[parent[parent[z]]]
            y = right[parent[parent[z]]]        // uncle
            if color[y] == RED                 // Case 1
                color[parent[z]] = BLACK
                color[y] = BLACK
                color[parent[parent[z]]] = RED
                z = parent[parent[z]]
            else
                if z == right[parent[z]]       // Case 2
                    z = parent[z]
                    LEFT-ROTATE(T, z)
                color[parent[z]] = BLACK       // Case 3
                color[parent[parent[z]]] = RED
                RIGHT-ROTATE(T, parent[parent[z]])
        else
            same cases with left and right exchanged
    color[root[T]] = BLACK`
        },
        {
          type: 'diagram',
          title: 'Insertion fix-up cases',
          caption: 'Case 1 recolors and moves the problem upward. Cases 2 and 3 rotate and finish locally.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 930 430" role="img" aria-label="Red-black insertion fixup cases">
  <rect x="12" y="12" width="906" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="465" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">RB-INSERT-FIXUP: uncle color decides the move</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <rect x="38" y="76" width="262" height="296" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="169" y="106" font-size="16" font-weight="900" fill="#0f2038">Case 1: uncle red</text>
    <line x1="169" y1="150" x2="110" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <line x1="169" y1="150" x2="228" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <line x1="110" y1="214" x2="82" y2="282" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="169" cy="146" r="25" fill="#111827"/><text x="169" y="153" font-size="15" font-weight="900" fill="#fff">G</text>
    <circle cx="110" cy="214" r="23" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="110" y="221" font-size="15" font-weight="900" fill="#fff">P</text>
    <circle cx="228" cy="214" r="23" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="228" y="221" font-size="15" font-weight="900" fill="#fff">U</text>
    <circle cx="82" cy="282" r="23" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="82" y="289" font-size="15" font-weight="900" fill="#fff">z</text>
    <text x="169" y="332" font-size="14" font-weight="800" fill="#334155">recolor P,U black; G red</text>

    <rect x="334" y="76" width="262" height="296" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="465" y="106" font-size="16" font-weight="900" fill="#0f2038">Case 2: triangle</text>
    <line x1="465" y1="150" x2="406" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <line x1="465" y1="150" x2="524" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <line x1="406" y1="214" x2="440" y2="282" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="465" cy="146" r="25" fill="#111827"/><text x="465" y="153" font-size="15" font-weight="900" fill="#fff">G</text>
    <circle cx="406" cy="214" r="23" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="406" y="221" font-size="15" font-weight="900" fill="#fff">P</text>
    <circle cx="524" cy="214" r="23" fill="#111827"/><text x="524" y="221" font-size="15" font-weight="900" fill="#fff">U</text>
    <circle cx="440" cy="282" r="23" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="440" y="289" font-size="15" font-weight="900" fill="#fff">z</text>
    <text x="465" y="332" font-size="14" font-weight="800" fill="#334155">rotate at P to make a line</text>

    <rect x="630" y="76" width="262" height="296" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="761" y="106" font-size="16" font-weight="900" fill="#0f2038">Case 3: line</text>
    <line x1="761" y1="150" x2="702" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <line x1="761" y1="150" x2="820" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <line x1="702" y1="214" x2="674" y2="282" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="761" cy="146" r="25" fill="#111827"/><text x="761" y="153" font-size="15" font-weight="900" fill="#fff">G</text>
    <circle cx="702" cy="214" r="23" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="702" y="221" font-size="15" font-weight="900" fill="#fff">P</text>
    <circle cx="820" cy="214" r="23" fill="#111827"/><text x="820" y="221" font-size="15" font-weight="900" fill="#fff">U</text>
    <circle cx="674" cy="282" r="23" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="674" y="289" font-size="15" font-weight="900" fill="#fff">z</text>
    <text x="761" y="332" font-size="14" font-weight="800" fill="#334155">recolor P/G, rotate at G</text>
  </g>
</svg>`
        },
        {
          type: 'table',
          caption: 'Insertion fix-up case table.',
          columns: ['Case', 'Condition', 'Action', 'Effect'],
          rows: [
            ['1', 'Parent and uncle are red.', 'Recolor parent and uncle black; recolor grandparent red; continue at grandparent.', 'Black-height is preserved; violation may move upward.'],
            ['2', 'Parent red, uncle black, z is an inner child.', 'Rotate at parent.', 'Converts the triangle into Case 3.'],
            ['3', 'Parent red, uncle black, z is an outer child.', 'Recolor parent black and grandparent red; rotate at grandparent.', 'Eliminates the red-red violation locally.']
          ]
        },
        {
          type: 'interactive',
          artifact: 'rb-tree-visualizer'
        },
        {
          type: 'heading',
          text: 'RB-DELETE',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Red-black deletion begins with the same structural deletion as BST delete. The key bookkeeping variable is y-original-color: the color of the node actually removed from its original tree position. If that color was red, no black-height changed. If it was black, one path has lost a black node and RB-DELETE-FIXUP repairs the deficit.'
        },
        {
          type: 'code',
          title: 'RB-DELETE outline',
          language: 'pseudocode',
          code: `RB-DELETE(T, z)
    y = z
    y-original-color = color[y]
    if left[z] == NIL
        x = right[z]
        RB-TRANSPLANT(T, z, right[z])
    else if right[z] == NIL
        x = left[z]
        RB-TRANSPLANT(T, z, left[z])
    else
        y = TREE-MINIMUM(right[z])
        y-original-color = color[y]
        x = right[y]
        if parent[y] == z
            parent[x] = y
        else
            RB-TRANSPLANT(T, y, right[y])
            right[y] = right[z]
            parent[right[y]] = y
        RB-TRANSPLANT(T, z, y)
        left[y] = left[z]
        parent[left[y]] = y
        color[y] = color[z]
    if y-original-color == BLACK
        RB-DELETE-FIXUP(T, x)`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'NIL sentinel matters',
          text: 'CLRS uses a shared black NIL sentinel with a parent pointer during deletion fix-up. That is why the pseudocode can refer to parent[x] even when x is NIL.'
        },
        {
          type: 'heading',
          text: 'Delete fix-up cases',
          level: 2
        },
        {
          type: 'table',
          caption: 'RB-DELETE-FIXUP cases when x is a left child; mirror left and right for the symmetric cases.',
          columns: ['Case', 'Sibling w', 'Children of w', 'Action'],
          rows: [
            ['1', 'w is red', 'Therefore parent[x] is black and w\'s children are black.', 'Recolor w black and parent[x] red; left-rotate parent[x]. This converts to one of Cases 2-4.'],
            ['2', 'w is black', 'Both children of w are black.', 'Recolor w red and move x up to parent[x]. The missing blackness moves upward.'],
            ['3', 'w is black', 'left[w] red, right[w] black.', 'Recolor left[w] black and w red; right-rotate w. This converts to Case 4.'],
            ['4', 'w is black', 'right[w] red.', 'Give w parent[x]\'s color, color parent[x] black, color right[w] black, left-rotate parent[x], and finish.']
          ]
        },
        {
          type: 'diagram',
          title: 'Deletion fix-up idea',
          caption: 'The extra black at x is pushed upward, rotated away, or absorbed by a red child depending on the sibling case.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 360" role="img" aria-label="Red-black delete fixup idea">
  <rect x="12" y="12" width="876" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="450" y="44" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">RB-DELETE-FIXUP repairs a missing black node</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <circle cx="450" cy="100" r="28" fill="#111827"/><text x="450" y="107" fill="#fff" font-size="16" font-weight="900">P</text>
    <line x1="450" y1="128" x2="315" y2="205" stroke="#94a3b8" stroke-width="2"/>
    <line x1="450" y1="128" x2="585" y2="205" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="315" cy="205" r="28" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/><text x="315" y="212" fill="#0f2038" font-size="16" font-weight="900">x</text>
    <circle cx="585" cy="205" r="28" fill="#111827"/><text x="585" y="212" fill="#fff" font-size="16" font-weight="900">w</text>
    <line x1="585" y1="233" x2="530" y2="296" stroke="#94a3b8" stroke-width="2"/>
    <line x1="585" y1="233" x2="640" y2="296" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="530" cy="296" r="24" fill="#111827"/><text x="530" y="303" fill="#fff" font-size="14" font-weight="900">L</text>
    <circle cx="640" cy="296" r="24" fill="#dc2626" stroke="#991b1b" stroke-width="3"/><text x="640" y="303" fill="#fff" font-size="14" font-weight="900">R</text>
    <rect x="76" y="92" width="180" height="74" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="166" y="122" font-size="14" font-weight="900" fill="#0f2038">x is double black</text>
    <text x="166" y="146" font-size="13" fill="#334155">one path is short</text>
    <rect x="650" y="92" width="180" height="74" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="740" y="122" font-size="14" font-weight="900" fill="#0f2038">sibling decides</text>
    <text x="740" y="146" font-size="13" fill="#334155">red child can absorb</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Correctness ideas',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Insertion invariant',
          text: 'During RB-INSERT-FIXUP, the tree remains a BST and property 5 remains true. The only possible violation is a red node with a red parent. Case 1 moves that violation upward; Cases 2 and 3 eliminate it with at most two rotations. Finally the root is recolored black.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Deletion invariant',
          text: 'During RB-DELETE-FIXUP, x represents a subtree that is short by one black node. Each case preserves the BST property and preserves black-height if the extra black on x is counted. The loop either moves the deficit upward, transforms to a later case, or eliminates the deficit and terminates.'
        },
        {
          type: 'heading',
          text: 'Runtime and rotation counts',
          level: 2
        },
        {
          type: 'table',
          caption: 'Red-black update costs.',
          columns: ['Operation', 'Tree walk', 'Fix-up iterations', 'Rotation bound', 'Total time'],
          rows: [
            ['RB-INSERT', 'BST insert: O(log n)', 'O(log n) recolor steps', 'At most 2 rotations', 'O(log n)'],
            ['RB-DELETE', 'BST delete plus successor: O(log n)', 'O(log n) fix-up steps', 'At most 3 rotations', 'O(log n)'],
            ['Search/min/max', 'Ordinary BST query', 'No fix-up', '0 rotations', 'O(log n)']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'For insertion, memorize uncle red = recolor and move up; uncle black triangle = rotate to line; uncle black line = recolor and rotate. For deletion, know why a removed black node creates the hard case, and know that CLRS fix-up is organized by the sibling w.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u4l8-E1',
              source: 'Insertion',
              question: 'Why does RB-INSERT initially color the new node red?',
              solution: 'Coloring the new node red keeps black-height unchanged. The only possible violation is then a red-red edge between the new node and its parent.'
            },
            {
              id: 'u4l8-E2',
              source: 'Rotation count',
              question: 'How many rotations can RB-INSERT-FIXUP perform in one insertion?',
              solution: 'At most two rotations. Case 2 performs one rotation to form a line, then Case 3 performs one more rotation and terminates.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u4l8-M1',
              source: 'Case selection',
              question: 'In RB-INSERT-FIXUP, parent[z] is red, the uncle y is red, and the grandparent is black. What case is this and what happens?',
              solution: 'This is Case 1. Recolor parent[z] and y black, recolor the grandparent red, and set z to the grandparent. The red-red problem may move upward, but black-height remains unchanged.'
            },
            {
              id: 'u4l8-M2',
              source: 'Deletion',
              question: 'Why does RB-DELETE call RB-DELETE-FIXUP only when y-original-color is black?',
              solution: 'Removing a red node cannot change the number of black nodes on any root-to-NIL path. Removing a black node can reduce black-height on paths through the removed position, so the fix-up is needed only in the black case.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'insert as red, then re-establish red-black invariants by recolours and rotations up the tree.',
        problem: 'every insertion can violate property 4 (red has black children); fix locally.',
        intuition: 'the problem walks up the tree until it disappears (at most O(log n) steps).',
        formal: 'INSERT-FIXUP three cases (uncle red; uncle black + zig-zag; uncle black + zig-zig) plus symmetric mirrors.',
        algorithm: 'see CLRS chapter 13 for full pseudocode; the cases reduce to constant-time fixes.',
        worked: 'insert into an example tree showing each case once.',
        correctness: 'each case provably reduces to a smaller violation; overall O(log n) iterations.',
        complexity: 'O(log n) per insertion; at most two rotations per insertion.',
        trace: 'animate the case selector through three insertions.',
        takeaways: 'know the case analysis; know the rotation count.',
        practice: 'insert 10, 20, 30, 15, 25 into an empty RB tree and show every fix.'
      }),
      practice: [
        mcq('algods-u4-l8-q1', 'Maximum number of rotations in RB-INSERT-FIXUP?',
          ['0', '1', '2', 'O(log n)'],
          2, 'At most two rotations are needed to terminate the fixup.')
      ]
    }
  ]
};

const u5 = {
  id: 'algods-u5',
  title: 'Hashing',
  summary: 'Direct addressing, chaining, hash functions, universal hashing, open addressing.',
  lessons: [
    {
      title: 'Direct addressing',
      durationMinutes: 20,
      type: 'video',
      summary: 'Use the key as the array index when the universe is small.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Direct addressing is the clean baseline for dictionary operations. If every possible key is a small integer in a known universe U, store each element directly at array position key[x]. Search, insert, and delete become constant-time array operations.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Direct-address table',
          text: 'A direct-address table T has one slot for every key in the universe U. Slot T[k] stores the element whose key is k, or NIL if no such element is currently in the dynamic set.'
        },
        {
          type: 'diagram',
          title: 'Keys as array indices',
          caption: 'For a small universe U = {0, ..., 9}, key 6 is stored directly in T[6]. Empty keys have NIL slots.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 310" role="img" aria-label="Direct addressing table diagram">
  <rect x="12" y="12" width="896" height="286" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Direct addressing: index equals key</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <g font-size="13" font-weight="800" fill="#475569">
      <text x="102" y="92">0</text><text x="174" y="92">1</text><text x="246" y="92">2</text><text x="318" y="92">3</text><text x="390" y="92">4</text>
      <text x="462" y="92">5</text><text x="534" y="92">6</text><text x="606" y="92">7</text><text x="678" y="92">8</text><text x="750" y="92">9</text>
    </g>
    <g font-size="14" font-weight="900">
      <rect x="72" y="104" width="60" height="72" rx="10" fill="#ffffff" stroke="#cbd5e1"/><text x="102" y="146" fill="#94a3b8">NIL</text>
      <rect x="144" y="104" width="60" height="72" rx="10" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="174" y="136" fill="#064e3b">A</text><text x="174" y="158" fill="#064e3b" font-size="12">key 1</text>
      <rect x="216" y="104" width="60" height="72" rx="10" fill="#ffffff" stroke="#cbd5e1"/><text x="246" y="146" fill="#94a3b8">NIL</text>
      <rect x="288" y="104" width="60" height="72" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="318" y="136" fill="#1e3a8a">B</text><text x="318" y="158" fill="#1e3a8a" font-size="12">key 3</text>
      <rect x="360" y="104" width="60" height="72" rx="10" fill="#ffffff" stroke="#cbd5e1"/><text x="390" y="146" fill="#94a3b8">NIL</text>
      <rect x="432" y="104" width="60" height="72" rx="10" fill="#ffffff" stroke="#cbd5e1"/><text x="462" y="146" fill="#94a3b8">NIL</text>
      <rect x="504" y="104" width="60" height="72" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="534" y="136" fill="#92400e">C</text><text x="534" y="158" fill="#92400e" font-size="12">key 6</text>
      <rect x="576" y="104" width="60" height="72" rx="10" fill="#ffffff" stroke="#cbd5e1"/><text x="606" y="146" fill="#94a3b8">NIL</text>
      <rect x="648" y="104" width="60" height="72" rx="10" fill="#fce7f3" stroke="#db2777" stroke-width="2"/><text x="678" y="136" fill="#831843">D</text><text x="678" y="158" fill="#831843" font-size="12">key 8</text>
      <rect x="720" y="104" width="60" height="72" rx="10" fill="#ffffff" stroke="#cbd5e1"/><text x="750" y="146" fill="#94a3b8">NIL</text>
    </g>
    <text x="460" y="226" font-size="16" font-weight="900" fill="#0f2038">SEARCH(6) reads exactly T[6]</text>
    <text x="460" y="254" font-size="14" fill="#475569">No probing, no comparison tree, no collision handling.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Operations',
          level: 2
        },
        {
          type: 'code',
          title: 'Direct-address dictionary operations',
          language: 'pseudocode',
          code: `DIRECT-ADDRESS-SEARCH(T, k)
    return T[k]

DIRECT-ADDRESS-INSERT(T, x)
    T[key[x]] = x

DIRECT-ADDRESS-DELETE(T, x)
    T[key[x]] = NIL`
        },
        {
          type: 'table',
          caption: 'Operation trace with U = {0, ..., 9}.',
          columns: ['Operation', 'Array access', 'Result'],
          rows: [
            ['INSERT object A with key 1', 'T[1] = A', 'Slot 1 now stores A.'],
            ['INSERT object C with key 6', 'T[6] = C', 'Slot 6 now stores C.'],
            ['SEARCH(3)', 'read T[3]', 'Return B if B is stored there, otherwise NIL.'],
            ['DELETE(C)', 'T[6] = NIL', 'Key 6 becomes absent.']
          ]
        },
        {
          type: 'heading',
          text: 'When it is perfect',
          level: 2
        },
        {
          type: 'list',
          items: [
            'The key universe is small enough to allocate one slot per possible key.',
            'Keys are already integers or can be mapped to a small integer range without collisions.',
            'Each key has at most one active element, or the slot stores a small secondary structure for duplicates.',
            'The application values predictable worst-case O(1) operations over memory savings.'
          ]
        },
        {
          type: 'heading',
          text: 'The space problem',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The weakness is not speed; it is space. If U is huge and the actual set K is small, most slots are NIL. Hash tables keep the array size closer to the number of stored keys and use a hash function to map the large universe into fewer slots.'
        },
        {
          type: 'formula',
          latex: '\\text{Direct-address space} = \\Theta(|U|)',
          display: true,
          caption: 'Space depends on the universe size, not on the number n of stored keys.'
        },
        {
          type: 'table',
          caption: 'Direct addressing versus hashing.',
          columns: ['Feature', 'Direct addressing', 'Hash table'],
          rows: [
            ['Index rule', 'Use k directly as the index.', 'Use h(k) as the index.'],
            ['Collisions', 'Impossible if each key has its own slot.', 'Possible; must be resolved.'],
            ['Worst-case operation time', 'Theta(1)', 'Depends on collision strategy and assumptions.'],
            ['Space', 'Theta(|U|)', 'Usually Theta(m), where m is the table size.'],
            ['Best use case', 'Small dense key universe.', 'Large sparse key universe.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why search is correct',
          text: 'The representation invariant says T[k] contains exactly the element with key k, or NIL if no such element is present. INSERT establishes this by writing x into T[key[x]]. DELETE preserves it by setting the deleted element\'s slot to NIL. Therefore SEARCH(k), which returns T[k], returns exactly the stored element with key k or NIL.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Cost summary.',
          columns: ['Operation', 'Worst-case time', 'Extra note'],
          rows: [
            ['SEARCH', 'Theta(1)', 'One array read.'],
            ['INSERT', 'Theta(1)', 'One array write, assuming key is valid.'],
            ['DELETE', 'Theta(1)', 'One array write.'],
            ['Space', 'Theta(|U|)', 'One slot for every possible key.']
          ]
        },
        { type: 'interactive', artifact: 'hash-direct-address' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Direct addressing is the baseline for hashing. It gives worst-case constant-time operations, but only when the universe is small enough for Theta(|U|) space.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u5l1-E1',
              source: 'Operations',
              question: 'In a direct-address table, where is an element with key 17 stored?',
              solution: 'It is stored in T[17]. The key itself is the array index.'
            },
            {
              id: 'u5l1-E2',
              source: 'Search',
              question: 'What does DIRECT-ADDRESS-SEARCH(T, k) return if key k is absent?',
              solution: 'It returns NIL, because the representation invariant says absent keys have NIL slots.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u5l1-M1',
              source: 'Space',
              question: 'You store 1,000 student IDs, but IDs are 9-digit numbers from 0 to 999,999,999. Why is direct addressing a poor fit?',
              solution: 'The universe has one billion possible keys, so a direct-address table needs Theta(1,000,000,000) slots even though only 1,000 are used. The table is extremely sparse; hashing is designed for this situation.'
            },
            {
              id: 'u5l1-M2',
              source: 'Design',
              question: 'Give one realistic case where direct addressing is a good solution.',
              solution: 'Counting frequencies of lowercase English letters is a good fit: the universe has only 26 keys, so an array count[0..25] gives constant-time updates with tiny space.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'when keys are small integers, an array indexed by key gives O(1) operations.',
        problem: 'extreme storage cost when the universe is much larger than the actual key set.',
        intuition: 'a 32-bit-key direct table is 4 GB; almost always wasteful.',
        formal: 'array T[0..|U|-1]; INSERT(x): T[key[x]] = x; SEARCH(k): return T[k]; DELETE(x): T[key[x]] = NIL.',
        algorithm: 'see formal.',
        worked: 'a counter table for ASCII characters: T[A]++; etc.',
        correctness: 'trivial.',
        complexity: 'all O(1); space O(|U|).',
        trace: 'identify scenarios where direct addressing is acceptable (small enums) vs wasteful (32-bit IDs).',
        takeaways: 'direct addressing is the baseline; hashing fixes the space waste.',
        practice: 'build a direct-address counter for a 26-letter alphabet.'
      }),
      practice: [
        mcq('algods-u5-l1-q1', 'Direct addressing is impractical when:',
          ['Keys are small integers.', 'Keys are unique.', 'The key universe is much larger than the actual data set.', 'There are duplicate keys.'],
          2, 'Direct addressing wastes space proportional to the universe.')
      ]
    },
    {
      title: 'Hashing with chaining',
      durationMinutes: 30,
      type: 'interactive',
      summary: 'Buckets store linked lists; analysis under simple uniform hashing.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Hashing replaces the huge direct-address array by a smaller table. A hash function h maps a key k into one of m slots. When two keys land in the same slot, chaining stores all elements for that slot in a linked list or another small container.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hash table with chaining',
          text: 'A chained hash table is an array T[0..m-1]. Each T[j] points to a list of elements whose keys satisfy h(key[x]) = j. The load factor is alpha = n/m, where n is the number of stored elements.'
        },
        {
          type: 'diagram',
          title: 'Chaining stores collisions in buckets',
          caption: 'With h(k) = k mod 5, keys 12 and 7 collide in bucket 2 because both have remainder 2.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 390" role="img" aria-label="Hash table chaining diagram">
  <defs>
    <marker id="chain-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="896" height="366" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Hashing with chaining, m = 5</text>
  <g font-family="Inter, Arial, sans-serif" font-size="15">
    <g text-anchor="middle" font-weight="900">
      <text x="106" y="93" fill="#475569">slot</text>
      <text x="106" y="138">0</text><text x="106" y="188">1</text><text x="106" y="238">2</text><text x="106" y="288">3</text><text x="106" y="338">4</text>
    </g>
    <g>
      <rect x="138" y="110" width="88" height="36" rx="8" fill="#ffffff" stroke="#cbd5e1"/><text x="182" y="133" text-anchor="middle" fill="#94a3b8" font-weight="800">NIL</text>
      <rect x="138" y="160" width="88" height="36" rx="8" fill="#ffffff" stroke="#cbd5e1"/><text x="182" y="183" text-anchor="middle" fill="#94a3b8" font-weight="800">NIL</text>
      <rect x="138" y="210" width="88" height="36" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="182" y="233" text-anchor="middle" fill="#1e3a8a" font-weight="900">head</text>
      <rect x="138" y="260" width="88" height="36" rx="8" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="182" y="283" text-anchor="middle" fill="#064e3b" font-weight="900">head</text>
      <rect x="138" y="310" width="88" height="36" rx="8" fill="#ffffff" stroke="#cbd5e1"/><text x="182" y="333" text-anchor="middle" fill="#94a3b8" font-weight="800">NIL</text>
      <line x1="226" y1="228" x2="290" y2="228" stroke="#64748b" stroke-width="2" marker-end="url(#chain-arrow)"/>
      <rect x="294" y="206" width="84" height="44" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="336" y="233" text-anchor="middle" fill="#1e3a8a" font-weight="900">7</text>
      <line x1="378" y1="228" x2="442" y2="228" stroke="#64748b" stroke-width="2" marker-end="url(#chain-arrow)"/>
      <rect x="446" y="206" width="84" height="44" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="488" y="233" text-anchor="middle" fill="#1e3a8a" font-weight="900">12</text>
      <line x1="530" y1="228" x2="594" y2="228" stroke="#64748b" stroke-width="2" marker-end="url(#chain-arrow)"/>
      <rect x="598" y="206" width="84" height="44" rx="10" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/><text x="640" y="233" text-anchor="middle" fill="#1e3a8a" font-weight="900">22</text>
      <line x1="226" y1="278" x2="290" y2="278" stroke="#64748b" stroke-width="2" marker-end="url(#chain-arrow)"/>
      <rect x="294" y="256" width="84" height="44" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="336" y="283" text-anchor="middle" fill="#064e3b" font-weight="900">18</text>
      <line x1="378" y1="278" x2="442" y2="278" stroke="#64748b" stroke-width="2" marker-end="url(#chain-arrow)"/>
      <rect x="446" y="256" width="84" height="44" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/><text x="488" y="283" text-anchor="middle" fill="#064e3b" font-weight="900">3</text>
    </g>
    <text x="694" y="150" font-size="15" font-weight="900" fill="#0f2038">alpha = n/m</text>
    <text x="694" y="178" font-size="14" fill="#475569">Here n = 5, m = 5, alpha = 1.</text>
    <text x="694" y="214" font-size="14" fill="#475569">Expected bucket length is alpha</text>
    <text x="694" y="238" font-size="14" fill="#475569">under simple uniform hashing.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Operations',
          level: 2
        },
        {
          type: 'code',
          title: 'CHAINED-HASH operations',
          language: 'pseudocode',
          code: `CHAINED-HASH-INSERT(T, x)
    insert x at the head of list T[h(key[x])]

CHAINED-HASH-SEARCH(T, k)
    search for an element with key k in list T[h(k)]

CHAINED-HASH-DELETE(T, x)
    delete x from list T[h(key[x])]`
        },
        {
          type: 'table',
          caption: 'Trace with h(k) = k mod 5.',
          columns: ['Key', 'h(k)', 'Bucket after insertion'],
          rows: [
            ['12', '2', 'T[2]: 12'],
            ['7', '2', 'T[2]: 7 -> 12 if inserted at head'],
            ['18', '3', 'T[3]: 18'],
            ['3', '3', 'T[3]: 3 -> 18'],
            ['22', '2', 'T[2]: 22 -> 7 -> 12']
          ]
        },
        {
          type: 'heading',
          text: 'Simple uniform hashing',
          level: 2
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Simple uniform hashing assumption',
          text: 'Each key is equally likely to hash to any of the m slots, independently of where other keys hash. This is an analysis model, not a guarantee supplied by an arbitrary hash function.'
        },
        {
          type: 'formula',
          latex: '\\alpha = n/m',
          display: true,
          caption: 'The load factor alpha is the average number of stored elements per bucket.'
        },
        {
          type: 'formula',
          latex: 'E[\\text{length of bucket } h(k)] = \\alpha',
          display: true,
          caption: 'Under simple uniform hashing, expected chain length is the load factor.'
        },
        {
          type: 'table',
          caption: 'Expected performance under simple uniform hashing.',
          columns: ['Operation', 'Expected time', 'Reason'],
          rows: [
            ['INSERT', 'Theta(1)', 'Compute h(k) and prepend to a list.'],
            ['UNSUCCESSFUL-SEARCH', 'Theta(1 + alpha)', 'Check the target bucket and scan its expected alpha elements.'],
            ['SUCCESSFUL-SEARCH', 'Theta(1 + alpha)', 'The searched item is in its bucket; expected scan length is proportional to alpha.'],
            ['DELETE', 'Theta(1) if given a pointer and doubly linked lists', 'Unlink directly after computing the bucket. Otherwise first search.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Bucket invariant',
          text: 'For every stored element x, x appears in exactly one list: T[h(key[x])]. INSERT places x in that list. SEARCH(k) inspects exactly the list where any key-k element must appear. DELETE removes x from that same list. Therefore chaining implements the dictionary operations correctly.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Chaining costs.',
          columns: ['Quantity', 'Bound', 'Notes'],
          rows: [
            ['Worst-case search', 'Theta(n)', 'All keys may collide in one bucket.'],
            ['Expected search', 'Theta(1 + alpha)', 'Requires simple uniform hashing or a comparable guarantee.'],
            ['Space', 'Theta(m + n)', 'm bucket headers plus n stored elements.'],
            ['Constant load factor', 'alpha = Theta(1)', 'Expected dictionary operations are O(1).']
          ]
        },
        { type: 'interactive', artifact: 'hash-chaining' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Always name the assumption. Chaining has worst-case Theta(n) search, but expected Theta(1 + alpha) under simple uniform hashing. If alpha is kept constant by resizing, expected search is O(1).'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u5l2-E1',
              source: 'Load factor',
              question: 'A chained hash table has n = 24 elements and m = 8 buckets. What is alpha?',
              solution: 'alpha = n/m = 24/8 = 3. The average bucket length is 3.'
            },
            {
              id: 'u5l2-E2',
              source: 'Bucket',
              question: 'With h(k) = k mod 7, which bucket stores key 31?',
              solution: '31 mod 7 = 3, so key 31 belongs in bucket T[3].'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u5l2-M1',
              source: 'Analysis',
              question: 'Why is unsuccessful search expected Theta(1 + alpha) under simple uniform hashing?',
              solution: 'The algorithm computes h(k), then scans the whole chain in that bucket. Under simple uniform hashing, the expected number of elements in any bucket is alpha, so the expected work is one bucket access plus alpha list nodes: Theta(1 + alpha).'
            },
            {
              id: 'u5l2-M2',
              source: 'Worst case',
              question: 'Give a worst-case input pattern for chaining.',
              solution: 'Any set of n keys that all hash to the same bucket gives one chain of length n. Searching for an absent key in that bucket, or for the last key in the chain, takes Theta(n).'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'map keys to buckets via h(k); resolve collisions with a per-bucket list.',
        problem: 'shrink the storage to size proportional to the keys actually used.',
        intuition: 'expected list length = load factor alpha = n/m.',
        formal: 'INSERT/SEARCH/DELETE walk the bucket list; expected work O(1 + alpha) under simple uniform hashing.',
        algorithm: 'INSERT: prepend to bucket list. SEARCH: scan bucket list. DELETE: unlink from list.',
        worked: 'insert 5 keys into m=4 buckets and watch chaining.',
        correctness: 'simple uniform hashing assumes h distributes uniformly and independently.',
        complexity: 'expected O(1 + alpha); worst case O(n) when all keys collide.',
        trace: 'animate three insertions and one search.',
        takeaways: 'when alpha is constant, chaining is expected O(1).',
        practice: 'rehash when alpha exceeds a threshold; analyse the amortised cost.'
      }),
      practice: [
        mcq('algods-u5-l2-q1', 'Expected SEARCH time on a chained hash table with load factor alpha is:',
          ['Θ(1)', 'Θ(1 + alpha)', 'Θ(log n)', 'Θ(n)'],
          1, 'Expected list length is alpha; total work is the bucket dereference plus list scan.')
      ]
    },
    {
      title: 'Hash functions',
      durationMinutes: 25,
      type: 'video',
      summary: 'Division and multiplication methods; what makes a hash function "good".',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A hash function compresses a large key universe into m table slots. A good hash function is fast to compute and spreads the keys used by the application roughly evenly across the table. A bad one turns the hash table back into a long-list search problem.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Hash function',
          text: 'A hash function h maps keys from a universe U to table indices {0, 1, ..., m-1}. Because |U| is usually larger than m, collisions are unavoidable; the goal is to make collisions well distributed.'
        },
        {
          type: 'diagram',
          title: 'Compression from universe to table',
          caption: 'Many keys must map into fewer table slots. The quality question is whether that compression is evenly spread.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 350" role="img" aria-label="Hash function maps key universe to table slots">
  <defs>
    <marker id="hash-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="876" height="326" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="450" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">h: U -> {0, ..., m-1}</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <rect x="70" y="92" width="230" height="190" rx="20" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="185" y="122" font-size="16" font-weight="900" fill="#0f2038">large universe U</text>
    <g font-size="14" font-weight="900">
      <circle cx="122" cy="164" r="24" fill="#dbeafe" stroke="#2563eb"/><text x="122" y="169">123</text>
      <circle cx="206" cy="164" r="24" fill="#dcfce7" stroke="#22c55e"/><text x="206" y="169">821</text>
      <circle cx="162" cy="226" r="24" fill="#fef3c7" stroke="#d97706"/><text x="162" y="231">44</text>
      <circle cx="246" cy="226" r="24" fill="#fce7f3" stroke="#db2777"/><text x="246" y="231">999</text>
    </g>
    <line x1="318" y1="186" x2="438" y2="186" stroke="#64748b" stroke-width="3" marker-end="url(#hash-arrow)"/>
    <rect x="456" y="142" width="112" height="88" rx="18" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="512" y="178" font-size="22" font-weight="900" fill="#1e3a8a">h(k)</text>
    <text x="512" y="204" font-size="13" fill="#475569">fast, uniform</text>
    <line x1="586" y1="186" x2="706" y2="186" stroke="#64748b" stroke-width="3" marker-end="url(#hash-arrow)"/>
    <g font-size="14" font-weight="900">
      <rect x="724" y="96" width="76" height="34" rx="8" fill="#ffffff" stroke="#cbd5e1"/><text x="762" y="118">0</text>
      <rect x="724" y="138" width="76" height="34" rx="8" fill="#dbeafe" stroke="#2563eb"/><text x="762" y="160">1</text>
      <rect x="724" y="180" width="76" height="34" rx="8" fill="#dcfce7" stroke="#22c55e"/><text x="762" y="202">2</text>
      <rect x="724" y="222" width="76" height="34" rx="8" fill="#fef3c7" stroke="#d97706"/><text x="762" y="244">3</text>
      <rect x="724" y="264" width="76" height="34" rx="8" fill="#fce7f3" stroke="#db2777"/><text x="762" y="286">4</text>
    </g>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Division method',
          level: 2
        },
        {
          type: 'formula',
          latex: 'h(k) = k \\bmod m',
          display: true,
          caption: 'The table index is the remainder after division by m.'
        },
        {
          type: 'table',
          caption: 'Division method example with m = 11.',
          columns: ['k', 'k mod 11', 'Bucket'],
          rows: [
            ['123', '2', 'T[2]'],
            ['44', '0', 'T[0]'],
            ['82', '5', 'T[5]'],
            ['93', '5', 'T[5], collision with 82']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Choosing m',
          text: 'For the division method, avoid powers of 2 when low-order key patterns are meaningful, because h(k) = k mod 2^p keeps only the lowest p bits. CLRS commonly recommends choosing m as a prime not too close to a power of 2.'
        },
        {
          type: 'heading',
          text: 'Multiplication method',
          level: 2
        },
        {
          type: 'formula',
          latex: 'h(k) = \\left\\lfloor m\\,(kA \\bmod 1) \\right\\rfloor, \\quad 0 < A < 1',
          display: true,
          caption: 'Here kA mod 1 means the fractional part of kA.'
        },
        {
          type: 'paragraph',
          text: 'The multiplication method first multiplies the key by a constant A, keeps the fractional part, and scales that fraction into the table range. A common CLRS-friendly choice is A approximately (sqrt(5) - 1) / 2.'
        },
        {
          type: 'table',
          caption: 'Division versus multiplication.',
          columns: ['Method', 'Formula', 'Strength', 'Caution'],
          rows: [
            ['Division', 'h(k) = k mod m', 'Simple and fast.', 'm must be chosen carefully.'],
            ['Multiplication', 'floor(m fractional_part(kA))', 'Less sensitive to some table sizes.', 'Choice of A matters.'],
            ['Universal hashing', 'Choose h randomly from a family.', 'Protects against fixed adversarial inputs in expectation.', 'Requires random setup and a family proof.']
          ]
        },
        {
          type: 'heading',
          text: 'What makes a hash function good',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Deterministic for a fixed table: the same key must map to the same slot during search.',
            'Fast enough that hashing does not dominate the dictionary operation.',
            'Uniform on the key distribution that actually appears in the program.',
            'Insensitive to common input patterns such as consecutive IDs, powers of two, or shared prefixes.',
            'Compatible with the table size and collision strategy.'
          ]
        },
        {
          type: 'heading',
          text: 'Correctness and limitations',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Correctness is separate from quality',
          text: 'Any deterministic h with the same collision-resolution rules can implement a correct dictionary: INSERT and SEARCH use the same h(k), so a key is looked up in the place where it was stored. Performance depends on distribution quality, not on this basic correctness fact.'
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Why universal hashing comes next',
          text: 'No fixed hash function can be good for every possible adversarial input. If an attacker or unlucky data source can choose many keys with the same h(k), worst-case search is linear. Universal hashing randomizes the function choice so every fixed input has bounded expected collisions.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Hash-function costs.',
          columns: ['Cost', 'Typical bound', 'Comment'],
          rows: [
            ['Evaluate h(k)', 'Theta(1)', 'Assumes word-size arithmetic.'],
            ['Table storage', 'Theta(m)', 'The hash function decides which of m slots is used.'],
            ['Chained search with good distribution', 'Theta(1 + alpha) expected', 'The hash function affects alpha-local chain lengths.'],
            ['Worst case for a fixed bad h', 'Theta(n)', 'All keys may collide.']
          ]
        },
        { type: 'interactive', artifact: 'hash-function-explorer' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Know the division and multiplication formulas. For division, choose m carefully, often a prime not close to a power of 2. Also remember: a hash function can be correct but still produce terrible performance.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u5l3-E1',
              source: 'Division',
              question: 'Compute h(123) for h(k) = k mod 11.',
              solution: '123 = 11*11 + 2, so h(123) = 2.'
            },
            {
              id: 'u5l3-E2',
              source: 'Collision',
              question: 'With m = 10 and h(k) = k mod 10, why do 37 and 107 collide?',
              solution: 'Both have remainder 7 modulo 10, so both map to slot 7.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u5l3-M1',
              source: 'Choice of m',
              question: 'Why can m = 2^p be dangerous for the division method?',
              solution: 'Then h(k) = k mod 2^p depends only on the lowest p bits of k. If the data have patterns in those low bits, many keys may collide even if the high bits differ.'
            },
            {
              id: 'u5l3-M2',
              source: 'Method comparison',
              question: 'Why does a good hash function not eliminate the need for collision handling?',
              solution: 'If the universe U is larger than the table size m, the pigeonhole principle guarantees that some distinct keys map to the same slot. A good hash function reduces clustering, but collisions remain possible.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'a hash function should spread keys roughly uniformly and be cheap to compute.',
        problem: 'choose a function that resists worst-case patterns in real data.',
        intuition: 'a small change in the key should drastically change h(k).',
        formal: 'division method: h(k) = k mod m. Multiplication method: h(k) = floor(m * (k * A mod 1)) for irrational A.',
        algorithm: 'choose m to be a prime not too close to a power of 2 for the division method.',
        worked: 'h(123) with m=11 = 123 mod 11 = 2.',
        correctness: 'no worst-case guarantee for any single function; this motivates universal hashing.',
        complexity: 'O(1) per evaluation.',
        trace: 'compare division-method dispersion against the multiplication method on a synthetic keyset.',
        takeaways: 'avoid m = 2ᵏ for division method; the high-order bits of k get ignored.',
        practice: 'compute multiplication-method values for A = (sqrt(5) - 1)/2.'
      }),
      practice: [
        mcq('algods-u5-l3-q1', 'For the division method h(k) = k mod m, m should typically be:',
          ['A power of 2.', 'A prime not close to a power of 2.', 'Even.', 'Equal to n.'],
          1, 'Powers of two ignore high-order bits; primes give better dispersion.')
      ]
    },
    {
      title: 'Universal hashing',
      durationMinutes: 30,
      type: 'video',
      summary: 'Pick a function at random from a universal family; expected collisions are bounded for any input.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Universal hashing changes the source of randomness. Instead of hoping that the input keys are random, we choose the hash function randomly from a carefully designed family. Then even a fixed adversarial set of keys has a small expected number of collisions.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Universal family',
          text: 'A finite family H of hash functions from U to {0, ..., m-1} is universal if, for every pair of distinct keys x and y, the number of functions h in H with h(x) = h(y) is at most |H|/m. Equivalently, if h is chosen uniformly from H, Pr[h(x) = h(y)] <= 1/m.'
        },
        {
          type: 'diagram',
          title: 'Randomize the function, not the input',
          caption: 'The key set is fixed. The algorithm chooses one h from H at table creation time and then uses that h consistently.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 360" role="img" aria-label="Universal hashing family diagram">
  <defs>
    <marker id="univ-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="896" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Universal hashing protects every fixed input in expectation</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <rect x="70" y="96" width="190" height="160" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="165" y="126" font-size="16" font-weight="900" fill="#0f2038">fixed keys</text>
    <text x="165" y="164" font-size="15" fill="#334155">{12, 29, 41, 58}</text>
    <text x="165" y="198" font-size="13" fill="#64748b">input need not be random</text>
    <line x1="278" y1="176" x2="390" y2="176" stroke="#64748b" stroke-width="3" marker-end="url(#univ-arrow)"/>
    <rect x="408" y="80" width="220" height="192" rx="18" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
    <text x="518" y="112" font-size="16" font-weight="900" fill="#1e3a8a">choose random h in H</text>
    <rect x="456" y="136" width="124" height="30" rx="8" fill="#ffffff" stroke="#bfdbfe"/><text x="518" y="157" font-size="13">h1</text>
    <rect x="456" y="176" width="124" height="30" rx="8" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="518" y="197" font-size="13" font-weight="900">h2 selected</text>
    <rect x="456" y="216" width="124" height="30" rx="8" fill="#ffffff" stroke="#bfdbfe"/><text x="518" y="237" font-size="13">h3</text>
    <line x1="646" y1="176" x2="758" y2="176" stroke="#64748b" stroke-width="3" marker-end="url(#univ-arrow)"/>
    <rect x="776" y="96" width="82" height="160" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="817" y="124" font-size="14" font-weight="900" fill="#0f2038">table</text>
    <rect x="796" y="142" width="42" height="22" rx="6" fill="#dcfce7" stroke="#22c55e"/>
    <rect x="796" y="172" width="42" height="22" rx="6" fill="#dbeafe" stroke="#2563eb"/>
    <rect x="796" y="202" width="42" height="22" rx="6" fill="#fef3c7" stroke="#d97706"/>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'A CLRS universal family',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Let p be a prime larger than every key in the universe. Choose a uniformly from {1, ..., p-1} and b uniformly from {0, ..., p-1}. Then define h by reducing modulo p and then into m buckets.'
        },
        {
          type: 'formula',
          latex: 'h_{a,b}(k) = ((ak + b) \\bmod p) \\bmod m',
          display: true,
          caption: 'The family contains one function for every choice of a != 0 and b modulo p.'
        },
        {
          type: 'table',
          caption: 'Example with p = 17, m = 5, a = 3, b = 4.',
          columns: ['k', '(3k + 4) mod 17', 'h(k)'],
          rows: [
            ['2', '10', '0'],
            ['5', '2', '2'],
            ['9', '14', '4'],
            ['12', '6', '1']
          ]
        },
        {
          type: 'heading',
          text: 'Why the collision probability is small',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Proof sketch',
          text: 'Fix distinct keys x and y. As a and b vary uniformly with a != 0, the pair ((ax+b) mod p, (ay+b) mod p) is uniformly distributed over ordered distinct residues modulo p. For any first residue, at most a 1/m fraction of the possible second residues have the same value after the final mod m reduction. Therefore Pr[h(x) = h(y)] <= 1/m.'
        },
        {
          type: 'formula',
          latex: 'E[\\text{collisions involving a fixed key } x] \\le \\alpha',
          display: true,
          caption: 'Sum the at-most 1/m collision probability over the other n-1 keys.'
        },
        {
          type: 'heading',
          text: 'Expected search with chaining',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Universal hashing is powerful because the expectation is over the random function choice, not over a random input. Once h is chosen, the table is deterministic, but before that choice every fixed pair of keys has collision probability at most 1/m.'
        },
        {
          type: 'table',
          caption: 'Universal hashing consequences.',
          columns: ['Question', 'Answer'],
          rows: [
            ['What is random?', 'The selected function h from H.'],
            ['Can the input be adversarial?', 'Yes, the bound holds for every fixed distinct pair of keys.'],
            ['Expected collisions with one key', 'At most alpha, up to the current load factor.'],
            ['Expected chained search', 'Theta(1 + alpha).'],
            ['Worst case after h is chosen', 'Still can be Theta(n), but the bad choice is unlikely for any fixed input.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Dictionary correctness',
          text: 'After the table chooses h, all operations use that same h. INSERT puts a key in bucket h(k), SEARCH looks in bucket h(k), and DELETE removes from bucket h(k). Universal hashing improves the expected chain lengths; the dictionary representation invariant is the same as ordinary chaining.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Costs with universal hashing and chaining.',
          columns: ['Operation', 'Expected time', 'Condition'],
          rows: [
            ['INSERT', 'Theta(1)', 'Prepend to the chosen bucket.'],
            ['UNSUCCESSFUL-SEARCH', 'Theta(1 + alpha)', 'Expectation over h chosen from a universal family.'],
            ['SUCCESSFUL-SEARCH', 'Theta(1 + alpha)', 'Expected number of colliding keys is bounded by load factor.'],
            ['DELETE', 'Theta(1) with a direct list pointer', 'Otherwise include search cost.'],
            ['Space', 'Theta(m + n)', 'Bucket table plus stored elements.']
          ]
        },
        { type: 'interactive', artifact: 'hash-universal' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Universal means pairwise collision probability at most 1/m. The input does not have to be random. The expectation is over the random choice of h, and with chaining this gives expected O(1 + alpha) search.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u5l4-E1',
              source: 'Definition',
              question: 'In a universal family with m buckets, what is the maximum allowed collision probability for two fixed distinct keys?',
              solution: 'At most 1/m, where the probability is over the random choice of h from the family.'
            },
            {
              id: 'u5l4-E2',
              source: 'Construction',
              question: 'For h_{a,b}(k) = ((ak+b) mod p) mod m, why must p be larger than all keys?',
              solution: 'The arithmetic first treats keys as distinct residues modulo p. Choosing p larger than the universe keeps distinct keys distinct before the random linear map is applied.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u5l4-M1',
              source: 'Expected collisions',
              question: 'A table has m = 50 buckets and stores n = 200 keys using universal hashing. What upper bound does the standard argument give for the expected number of keys colliding with a fixed key?',
              solution: 'Each other key collides with probability at most 1/50. There are 199 other keys, so the expected number is at most 199/50 = 3.98, which is Theta(alpha) since alpha = 200/50 = 4.'
            },
            {
              id: 'u5l4-M2',
              source: 'Assumption',
              question: 'Does universal hashing make worst-case search impossible after the function has been chosen?',
              solution: 'No. Once h is fixed, a particular unlucky table can still have a long chain. Universal hashing says that for every fixed input, the expected behavior over the random choice of h is good.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'randomise the function, not the data; bound expected collisions for every input.',
        problem: 'fixed hash functions have adversarial worst-case inputs.',
        intuition: 'pick h uniformly from a family H; for any pair (x, y), Pr[h(x) = h(y)] <= 1/m.',
        formal: 'H is universal iff for all distinct x, y: |{h in H : h(x) = h(y)}| <= |H|/m.',
        algorithm: 'classic construction: h_{a,b}(k) = ((a*k + b) mod p) mod m, p prime > universe.',
        worked: 'show that h_{a,b} forms a universal family.',
        correctness: 'count pairs (a, b) that cause a collision.',
        complexity: 'expected O(1 + alpha) regardless of the input.',
        trace: 'fix a, b; compute h_{a,b} on three keys; vary a, b; observe collisions.',
        takeaways: 'use universal hashing whenever inputs may be adversarial.',
        practice: 'verify universality of (a*k + b) mod p mod m for small p, m.'
      }),
      practice: [
        mcq('algods-u5-l4-q1', 'Universality means: for any distinct x, y, Pr[h(x) = h(y)] is bounded by:',
          ['1', '1/m', '1/n', '1/(m*n)'],
          1, 'A universal family caps collision probability at 1/m.')
      ]
    },
    {
      title: 'Open addressing — linear probing',
      durationMinutes: 25,
      type: 'video',
      summary: 'Resolve collisions by probing the next slot; suffers primary clustering.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Open addressing stores all keys directly inside the hash table array. There are no external chains. If the first slot is occupied, the algorithm probes other slots according to a deterministic probe sequence until it finds the key, an empty slot, or a place to insert.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Linear probing',
          text: 'Linear probing is the open-addressing scheme h(k, i) = (h prime of k + i) mod m for i = 0, 1, 2, ..., m-1. On a collision, it checks the next table slot, then the next, wrapping around modulo m.'
        },
        {
          type: 'diagram',
          title: 'A cluster forms under linear probing',
          caption: 'With m = 11 and h prime of k = k mod 11, keys 76, 26, 37, 59, and 21 create a run of occupied slots. Later probes that hit the run must walk through it.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 930 360" role="img" aria-label="Linear probing cluster diagram">
  <defs>
    <marker id="lp-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="906" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="465" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Linear probing scans consecutive slots</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <g font-size="13" font-weight="800" fill="#475569">
      <text x="98" y="96">0</text><text x="168" y="96">1</text><text x="238" y="96">2</text><text x="308" y="96">3</text><text x="378" y="96">4</text><text x="448" y="96">5</text>
      <text x="518" y="96">6</text><text x="588" y="96">7</text><text x="658" y="96">8</text><text x="728" y="96">9</text><text x="798" y="96">10</text>
    </g>
    <g font-size="15" font-weight="900">
      <rect x="68" y="110" width="60" height="64" rx="9" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="98" y="147" fill="#064e3b">21</text>
      <rect x="138" y="110" width="60" height="64" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="168" y="147" fill="#94a3b8">NIL</text>
      <rect x="208" y="110" width="60" height="64" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="238" y="147" fill="#94a3b8">NIL</text>
      <rect x="278" y="110" width="60" height="64" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="308" y="147" fill="#94a3b8">NIL</text>
      <rect x="348" y="110" width="60" height="64" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="378" y="147" fill="#94a3b8">NIL</text>
      <rect x="418" y="110" width="60" height="64" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="448" y="147" fill="#1e3a8a">26</text>
      <rect x="488" y="110" width="60" height="64" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="518" y="147" fill="#1e3a8a">37</text>
      <rect x="558" y="110" width="60" height="64" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="588" y="147" fill="#1e3a8a">59</text>
      <rect x="628" y="110" width="60" height="64" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="658" y="147" fill="#1e3a8a">76</text>
      <rect x="698" y="110" width="60" height="64" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="728" y="147" fill="#94a3b8">NIL</text>
      <rect x="768" y="110" width="60" height="64" rx="9" fill="#ffffff" stroke="#cbd5e1"/><text x="798" y="147" fill="#94a3b8">NIL</text>
    </g>
    <line x1="448" y1="202" x2="658" y2="202" stroke="#0f766e" stroke-width="5" marker-end="url(#lp-arrow)"/>
    <text x="553" y="232" font-size="15" font-weight="900" fill="#0f766e">primary cluster</text>
    <rect x="120" y="260" width="690" height="48" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="465" y="290" font-size="15" font-weight="800" fill="#334155">A future key hashing to slot 5, 6, 7, or 8 must scan through part of this run.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Probe sequence',
          level: 2
        },
        {
          type: 'formula',
          latex: 'h(k,i) = (h^{\\prime}(k) + i) \\bmod m',
          display: true,
          caption: 'The i-th probe starts at the auxiliary hash value and moves one slot at a time.'
        },
        {
          type: 'table',
          caption: 'Probe sequence with m = 11 and h prime of 76 = 10.',
          columns: ['i', 'h(76, i)', 'Slot checked'],
          rows: [
            ['0', '(10 + 0) mod 11 = 10', '10'],
            ['1', '(10 + 1) mod 11 = 0', '0'],
            ['2', '(10 + 2) mod 11 = 1', '1'],
            ['3', '(10 + 3) mod 11 = 2', '2']
          ]
        },
        {
          type: 'heading',
          text: 'Operations',
          level: 2
        },
        {
          type: 'code',
          title: 'HASH-INSERT with linear probing',
          language: 'pseudocode',
          code: `HASH-INSERT(T, k)
    i = 0
    repeat
        j = h(k, i)
        if T[j] == NIL or T[j] == DELETED
            T[j] = k
            return j
        i = i + 1
    until i == m
    error "hash table overflow"`
        },
        {
          type: 'code',
          title: 'HASH-SEARCH with linear probing',
          language: 'pseudocode',
          code: `HASH-SEARCH(T, k)
    i = 0
    repeat
        j = h(k, i)
        if T[j] == k
            return j
        i = i + 1
    until T[j] == NIL or i == m
    return NIL`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Deletion needs tombstones',
          text: 'In open addressing, simply replacing a deleted key by NIL can break future searches, because NIL means "the probe sequence stops here." Instead, deletion usually writes a special DELETED marker, also called a tombstone.'
        },
        {
          type: 'heading',
          text: 'Worked insertion trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Insert keys 76, 26, 37, 59, 21 with m = 11 and h prime of k = k mod 11.',
          columns: ['Key', 'Home slot', 'Probe path', 'Inserted at'],
          rows: [
            ['76', '10', '10 is empty', '10'],
            ['26', '4', '4 is empty', '4'],
            ['37', '4', '4 occupied by 26; 5 empty', '5'],
            ['59', '4', '4 occupied; 5 occupied; 6 empty', '6'],
            ['21', '10', '10 occupied by 76; 0 empty after wraparound', '0']
          ]
        },
        {
          type: 'heading',
          text: 'Primary clustering',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Linear probing has excellent cache locality because it scans adjacent array cells. Its weakness is primary clustering: once a run of occupied slots forms, future keys that hash anywhere into or just before that run tend to extend it. The cluster becomes a larger target, so it grows faster.'
        },
        {
          type: 'table',
          caption: 'Open addressing vocabulary.',
          columns: ['Term', 'Meaning', 'Linear probing consequence'],
          rows: [
            ['Home slot', 'The first probe h(k, 0).', 'Colliding keys start scanning from this slot.'],
            ['Probe sequence', 'The ordered slots checked for a key.', 'For linear probing it is consecutive modulo m.'],
            ['Load factor alpha', 'n/m for open addressing, always less than or equal to 1.', 'As alpha approaches 1, probe lengths grow quickly.'],
            ['Primary cluster', 'A contiguous run of occupied slots.', 'The main performance problem for linear probing.'],
            ['Tombstone', 'A marker for a deleted slot.', 'Preserves search paths but can slow future searches.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Search invariant',
          text: 'For a key k, insertion stores k in the first available slot along k\'s probe sequence. Search checks that same probe sequence in the same order. If search reaches NIL, insertion would have stopped there before reaching any later slot, so k cannot appear later in the sequence. Tombstones are not NIL, so they do not incorrectly stop the search.'
        },
        {
          type: 'list',
          items: [
            'The probe sequence visits every slot exactly once for linear probing because adding 1 modulo m cycles through all m residues.',
            'INSERT fails only when all m slots are occupied or blocked from reuse.',
            'SEARCH must stop at NIL, not at DELETED.',
            'A table using open addressing must keep alpha below 1; in practice it resizes earlier.'
          ]
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Linear probing costs.',
          columns: ['Situation', 'Expected probes under uniform hashing model', 'Interpretation'],
          rows: [
            ['Unsuccessful search', 'About 1 / (1 - alpha)', 'Blows up as alpha approaches 1.'],
            ['Successful search', 'About (1 / alpha) ln(1 / (1 - alpha))', 'Also grows with load, but more slowly.'],
            ['Worst case', 'Theta(n)', 'A single long cluster can force a long scan.'],
            ['Space', 'Theta(m)', 'All elements live in the table array; no linked lists.']
          ]
        },
        {
          type: 'formula',
          latex: '\\alpha = n/m < 1',
          display: true,
          caption: 'Open addressing cannot store more than one key per slot.'
        },
        { type: 'interactive', artifact: 'hash-linear-probing' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Linear probing uses consecutive slots: h(k,i) = (h prime of k + i) mod m. It is simple and cache-friendly, but it suffers from primary clustering. Deletion requires tombstones, and performance depends strongly on the load factor alpha.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u5l5-E1',
              source: 'Probe sequence',
              question: 'With m = 7 and h prime of k = 5, what are the first four linear-probing slots?',
              solution: 'They are 5, 6, 0, 1, because the probe sequence adds i and wraps modulo 7.'
            },
            {
              id: 'u5l5-E2',
              source: 'Deletion',
              question: 'Why should deletion use DELETED instead of NIL in open addressing?',
              solution: 'NIL stops a search. If a deleted key in the middle of a probe sequence were replaced by NIL, searches for keys placed later in that sequence could stop too early. A DELETED tombstone preserves the probe path.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u5l5-M1',
              source: 'Trace',
              question: 'Insert 10, 21, 32 into a table of size 11 using h prime of k = k mod 11 and linear probing. Where do they land?',
              solution: 'All three have home slot 10. Insert 10 at slot 10. Key 21 probes 10 then 0, so it lands at 0. Key 32 probes 10, 0, then 1, so it lands at 1.'
            },
            {
              id: 'u5l5-M2',
              source: 'Clustering',
              question: 'Explain in one paragraph why primary clusters tend to grow.',
              solution: 'A cluster is a contiguous occupied run. Any key whose home slot lies inside the cluster, or just before it, must scan through the cluster and usually inserts at the first empty slot after it. That extends the cluster, making it an even larger target for future probe sequences.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'no chains; on collision, scan forward to the next free slot.',
        problem: 'collisions are inevitable; avoid extra memory for chains.',
        intuition: 'long runs of occupied slots ("clusters") slow down all probes.',
        formal: 'h(k, i) = (h prime of k + i) mod m for i = 0, 1, 2, ...',
        algorithm: 'INSERT: probe until empty slot. SEARCH: probe until match or empty. DELETE needs tombstones.',
        worked: 'insert 5 keys with collisions and watch the clusters form.',
        correctness: 'requires that the probe sequence is a permutation of [0..m-1].',
        complexity: 'expected O(1/(1-alpha)) for unsuccessful search under uniform hashing.',
        trace: 'animate three collisions and the resulting cluster.',
        takeaways: 'simple but suffers clustering at high load factors.',
        practice: 'insert keys 76, 26, 37, 59, 21 with h(k) = k mod 11.'
      }),
      practice: [
        mcq('algods-u5-l5-q1', 'Linear probing\'s key weakness is:',
          ['It needs more memory than chaining.', 'Primary clustering.', 'It is unstable.', 'It cannot delete keys.'],
          1, 'Long runs of consecutive occupied slots slow every probe.')
      ]
    },
    {
      title: 'Open addressing — quadratic probing',
      durationMinutes: 25,
      type: 'video',
      summary: 'Add quadratic offsets; reduces primary clustering, suffers secondary clustering.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Quadratic probing is an open-addressing collision strategy that avoids scanning one consecutive run of cells. Instead of trying h prime of k, then the next slot, then the next, it jumps by a quadratic function of the probe number. This breaks primary clusters, but keys with the same first hash still follow the same probe sequence.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Quadratic probing',
          text: 'Quadratic probing uses h(k, i) = (h prime of k + c1 i + c2 i squared) mod m, where i = 0, 1, 2, ... and c1, c2 are constants chosen with the table size m.'
        },
        {
          type: 'diagram',
          title: 'Quadratic jumps',
          caption: 'For c1 = 0, c2 = 1, the offsets are 0, 1, 4, 9, 16, ... rather than consecutive steps.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 340" role="img" aria-label="Quadratic probing jump diagram">
  <rect x="12" y="12" width="896" height="316" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Quadratic probing jumps away from the home slot</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <g font-size="13" font-weight="800" fill="#475569">
      <text x="92" y="98">0</text><text x="152" y="98">1</text><text x="212" y="98">2</text><text x="272" y="98">3</text><text x="332" y="98">4</text>
      <text x="392" y="98">5</text><text x="452" y="98">6</text><text x="512" y="98">7</text><text x="572" y="98">8</text><text x="632" y="98">9</text>
      <text x="692" y="98">10</text><text x="752" y="98">11</text><text x="812" y="98">12</text>
    </g>
    <g font-size="15" font-weight="900">
      <rect x="304" y="112" width="56" height="58" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="332" y="147" fill="#1e3a8a">i=0</text>
      <rect x="364" y="112" width="56" height="58" rx="9" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="392" y="147" fill="#064e3b">i=1</text>
      <rect x="544" y="112" width="56" height="58" rx="9" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="572" y="147" fill="#92400e">i=2</text>
      <rect x="64" y="112" width="56" height="58" rx="9" fill="#fce7f3" stroke="#db2777" stroke-width="2"/><text x="92" y="147" fill="#831843">i=3</text>
    </g>
    <text x="460" y="224" font-size="16" font-weight="900" fill="#0f2038">Home slot 4 probes: 4, 5, 8, 0, ... modulo 13</text>
    <text x="460" y="254" font-size="14" fill="#475569">The jumps reduce primary clustering, but equal home slots still share this entire path.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Formula and parameters',
          level: 2
        },
        {
          type: 'formula',
          latex: 'h(k,i) = (h^{\\prime}(k) + c_1 i + c_2 i^2) \\bmod m',
          display: true,
          caption: 'The probe sequence depends on the home slot and the constants c1, c2.'
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Parameter choice matters',
          text: 'Quadratic probing does not automatically visit every table slot for every m, c1, and c2. Courses often use special choices of m and constants, or require the load factor to stay below a threshold, to guarantee insertion succeeds when enough empty slots exist.'
        },
        {
          type: 'code',
          title: 'Quadratic-probing insertion',
          language: 'pseudocode',
          code: `QUADRATIC-HASH-INSERT(T, k)
    i = 0
    repeat
        j = (hPrime(k) + c1*i + c2*i*i) mod m
        if T[j] == NIL or T[j] == DELETED
            T[j] = k
            return j
        i = i + 1
    until i == m
    error "hash table overflow"`
        },
        {
          type: 'table',
          caption: 'Example with m = 13, c1 = 0, c2 = 1, and h prime of k = 4.',
          columns: ['i', 'Offset i squared', 'Probe slot'],
          rows: [
            ['0', '0', '(4 + 0) mod 13 = 4'],
            ['1', '1', '(4 + 1) mod 13 = 5'],
            ['2', '4', '(4 + 4) mod 13 = 8'],
            ['3', '9', '(4 + 9) mod 13 = 0'],
            ['4', '16', '(4 + 16) mod 13 = 7']
          ]
        },
        {
          type: 'heading',
          text: 'Primary versus secondary clustering',
          level: 2
        },
        {
          type: 'table',
          caption: 'Clustering comparison.',
          columns: ['Scheme', 'Probe pattern', 'Clustering behavior'],
          rows: [
            ['Linear probing', 'Consecutive slots.', 'Suffers primary clustering: long occupied runs grow.'],
            ['Quadratic probing', 'Quadratic offsets from the home slot.', 'Avoids primary clustering, but keys with the same home slot have the same probe sequence.'],
            ['Double hashing', 'Key-dependent stride.', 'Reduces secondary clustering because different keys can have different probe sequences.']
          ]
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Secondary clustering',
          text: 'Secondary clustering occurs when two distinct keys with the same initial hash value follow exactly the same probe sequence. Quadratic probing has this problem because the rest of the sequence depends only on i, c1, c2, and m.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Search invariant',
          text: 'As in all open addressing, insertion and search use the same probe sequence for a key k. If search reaches NIL, then insertion would have stopped there before placing k later in the sequence. Tombstones must not stop search, because later keys may have been inserted past the deleted slot.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Quadratic probing costs.',
          columns: ['Aspect', 'Bound or behavior', 'Note'],
          rows: [
            ['Worst-case operation', 'Theta(n)', 'A long probe sequence can still occur.'],
            ['Expected behavior', 'Often good at moderate load factors', 'Depends on hashing assumptions and parameters.'],
            ['Space', 'Theta(m)', 'All keys live in the table array.'],
            ['Deletion', 'Needs tombstones', 'Same reason as linear probing.']
          ]
        },
        { type: 'interactive', artifact: 'hash-quadratic-probing' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Quadratic probing reduces primary clustering but does not remove secondary clustering. Always mention that full table coverage depends on the choice of m, c1, and c2.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u5l6-E1',
              source: 'Probe sequence',
              question: 'With m = 13, c1 = 0, c2 = 1, and h prime of k = 4, what are the first three probe slots?',
              solution: 'For i = 0, 1, 2 the offsets are 0, 1, and 4. The slots are 4, 5, and 8.'
            },
            {
              id: 'u5l6-E2',
              source: 'Clustering',
              question: 'Which type of clustering remains in quadratic probing?',
              solution: 'Secondary clustering remains: keys with the same initial hash follow the same probe sequence.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u5l6-M1',
              source: 'Coverage',
              question: 'Why is it not enough to write a quadratic probing formula without discussing m, c1, and c2?',
              solution: 'The probe sequence might not visit every slot. If the parameter choices are bad, insertion can fail even when empty slots exist because the sequence cycles through only part of the table.'
            },
            {
              id: 'u5l6-M2',
              source: 'Comparison',
              question: 'Explain why quadratic probing avoids primary clustering better than linear probing.',
              solution: 'Linear probing walks through consecutive cells, so occupied runs grow when new keys hash into or before the run. Quadratic probing jumps away from the home slot, so it does not simply append to the same consecutive run.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'use h(k, i) = (h prime of k + c1 i + c2 i squared) mod m to break up clusters.',
        problem: 'kill the long runs created by linear probing.',
        intuition: 'jumping by quadratic increments scatters keys more evenly.',
        formal: 'choose c1, c2, m so that the sequence visits all slots.',
        algorithm: 'standard probing loop, with quadratic offsets.',
        worked: 'insert with c1 = 0, c2 = 1: probes are h, h+1, h+4, h+9, ...',
        correctness: 'careful parameter choice ensures full slot coverage.',
        complexity: 'better than linear probing in practice; secondary clustering remains for keys with the same initial hash.',
        trace: 'compare linear vs quadratic probe sequences on a small load.',
        takeaways: 'quadratic probing fixes primary but not secondary clustering.',
        practice: 'find c1, c2 for m = 8 that hit every slot.'
      }),
      practice: [
        mcq('algods-u5-l6-q1', 'Quadratic probing eliminates primary clustering but suffers from:',
          ['Linear clustering.', 'Secondary clustering: keys with the same initial hash.', 'Tombstone overflow.', 'Slow hashing.'],
          1, 'Two keys that hash to the same initial value follow identical probe sequences.')
      ]
    },
    {
      title: 'Open addressing — double hashing',
      durationMinutes: 25,
      type: 'video',
      summary: 'Two hash functions; closest to ideal uniform probing in practice.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Double hashing is an open-addressing method that gives each key its own probe stride. The first hash function chooses the home slot. The second hash function chooses how far to jump each time. This greatly reduces secondary clustering compared with quadratic probing.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Double hashing',
          text: 'Double hashing uses h(k, i) = (h1(k) + i h2(k)) mod m. To be able to reach every slot, h2(k) must be relatively prime to m for every key k.'
        },
        {
          type: 'diagram',
          title: 'Key-dependent probe strides',
          caption: 'Two keys may have the same home slot but different h2 values, so their later probes separate.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 360" role="img" aria-label="Double hashing probe stride diagram">
  <rect x="12" y="12" width="896" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Double hashing: each key gets its own stride</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <text x="240" y="92" font-size="16" font-weight="900" fill="#1e3a8a">key a: h1=3, h2=2</text>
    <text x="680" y="92" font-size="16" font-weight="900" fill="#92400e">key b: h1=3, h2=5</text>
    <g font-size="13" font-weight="800" fill="#475569">
      <text x="90" y="134">0</text><text x="140" y="134">1</text><text x="190" y="134">2</text><text x="240" y="134">3</text><text x="290" y="134">4</text><text x="340" y="134">5</text><text x="390" y="134">6</text>
      <text x="530" y="134">0</text><text x="580" y="134">1</text><text x="630" y="134">2</text><text x="680" y="134">3</text><text x="730" y="134">4</text><text x="780" y="134">5</text><text x="830" y="134">6</text>
    </g>
    <g font-size="14" font-weight="900">
      <rect x="215" y="148" width="50" height="50" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="240" y="179" fill="#1e3a8a">i0</text>
      <rect x="315" y="148" width="50" height="50" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="340" y="179" fill="#1e3a8a">i1</text>
      <rect x="65" y="148" width="50" height="50" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="90" y="179" fill="#1e3a8a">i2</text>
      <rect x="655" y="148" width="50" height="50" rx="9" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="680" y="179" fill="#92400e">i0</text>
      <rect x="555" y="148" width="50" height="50" rx="9" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="580" y="179" fill="#92400e">i1</text>
      <rect x="805" y="148" width="50" height="50" rx="9" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="830" y="179" fill="#92400e">i2</text>
    </g>
    <rect x="160" y="244" width="600" height="54" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="460" y="277" font-size="15" font-weight="800" fill="#334155">Same home slot, different stride: secondary clustering is reduced.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Formula',
          level: 2
        },
        {
          type: 'formula',
          latex: 'h(k,i) = (h_1(k) + i h_2(k)) \\bmod m',
          display: true,
          caption: 'h1 chooses the home slot; h2 chooses the stride.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Full-period condition',
          text: 'The probe sequence visits all m slots exactly when gcd(h2(k), m) = 1. A common safe design is to make m prime and choose h2(k) in {1, ..., m-1}.'
        },
        {
          type: 'code',
          title: 'Double-hashing insertion',
          language: 'pseudocode',
          code: `DOUBLE-HASH-INSERT(T, k)
    i = 0
    repeat
        j = (h1(k) + i*h2(k)) mod m
        if T[j] == NIL or T[j] == DELETED
            T[j] = k
            return j
        i = i + 1
    until i == m
    error "hash table overflow"`
        },
        {
          type: 'table',
          caption: 'Example with m = 13, h1(k) = k mod 13, h2(k) = 1 + (k mod 11).',
          columns: ['k', 'h1(k)', 'h2(k)', 'First probes'],
          rows: [
            ['18', '5', '8', '5, 0, 8, 3, ...'],
            ['31', '5', '10', '5, 2, 12, 9, ...'],
            ['44', '5', '1', '5, 6, 7, 8, ...']
          ]
        },
        {
          type: 'heading',
          text: 'Why coprime matters',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Period argument',
          text: 'The probes add h2(k) modulo m. This modular walk has period m exactly when h2(k) and m are relatively prime. If their gcd is d > 1, the sequence can visit only m/d slots, so insertion may fail even with empty slots elsewhere.'
        },
        {
          type: 'table',
          caption: 'Good and bad strides for m = 12.',
          columns: ['Stride h2', 'gcd(h2, 12)', 'Slots reachable from 0'],
          rows: [
            ['5', '1', 'All 12 slots'],
            ['7', '1', 'All 12 slots'],
            ['4', '4', 'Only 0, 4, 8'],
            ['6', '6', 'Only 0, 6']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Search invariant',
          text: 'Insertion and search compute the same key-specific probe sequence. If search reaches NIL, then insertion would have placed k at or before that NIL if k were present. Tombstones preserve the probe sequence after deletions. The coprime stride condition ensures the sequence can inspect every slot before reporting overflow.'
        },
        {
          type: 'heading',
          text: 'Runtime and comparison',
          level: 2
        },
        {
          type: 'table',
          caption: 'Open-addressing comparison.',
          columns: ['Method', 'Probe rule', 'Main weakness'],
          rows: [
            ['Linear probing', 'h prime plus i', 'Primary clustering.'],
            ['Quadratic probing', 'h prime plus quadratic offset', 'Secondary clustering and parameter sensitivity.'],
            ['Double hashing', 'h1 plus i times h2', 'Needs h2 coprime to m; still degrades at high load.']
          ]
        },
        {
          type: 'formula',
          latex: 'E[\\text{unsuccessful probes}] \\approx \\frac{1}{1-\\alpha}',
          display: true,
          caption: 'Under the uniform-hashing idealization, open addressing slows rapidly as alpha approaches 1.'
        },
        { type: 'interactive', artifact: 'hash-double-hashing' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Double hashing reduces secondary clustering because the stride depends on the key. The essential condition is gcd(h2(k), m) = 1, which makes the probe sequence capable of reaching all table slots.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u5l7-E1',
              source: 'Coprime condition',
              question: 'For m = 13 and h2(k) = 5, can the probe sequence visit all slots?',
              solution: 'Yes. Since 13 is prime and 5 is not divisible by 13, gcd(5, 13) = 1, so the sequence has period 13.'
            },
            {
              id: 'u5l7-E2',
              source: 'Formula',
              question: 'With m = 11, h1(k) = 3, and h2(k) = 4, what are the first three probe slots?',
              solution: 'For i = 0, 1, 2 the slots are 3, 7, and 0 modulo 11.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u5l7-M1',
              source: 'Bad stride',
              question: 'For m = 12 and h2(k) = 4, starting from slot 1, which slots can be reached?',
              solution: 'The sequence is 1, 5, 9, 1, ... because adding 4 modulo 12 has period 3. It reaches only slots congruent to 1 modulo 4.'
            },
            {
              id: 'u5l7-M2',
              source: 'Comparison',
              question: 'Why does double hashing reduce secondary clustering compared with quadratic probing?',
              solution: 'In quadratic probing, keys with the same home slot have identical later probes. In double hashing, those keys can have different h2 values, so their probe sequences can diverge after the first collision.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'h(k, i) = (h1(k) + i * h2(k)) mod m, with h2 chosen so its values are coprime to m.',
        problem: 'eliminate secondary clustering.',
        intuition: 'each key has its own probe stride.',
        formal: 'choose h2(k) coprime to m so the probe sequence covers all slots.',
        algorithm: 'standard probe loop; offset is i * h2(k).',
        worked: 'with m = 13, h1 = k mod 13, h2 = 1 + (k mod 11) we cover every slot.',
        correctness: 'gcd(h2(k), m) = 1 implies a full-period probe.',
        complexity: 'closest to the theoretical 1/(1-alpha) bound.',
        trace: 'compare double hashing vs quadratic on the same load.',
        takeaways: 'double hashing is the production-grade open-addressing scheme.',
        practice: 'verify gcd(h2, m) = 1 for the suggested choice on m = 13.'
      }),
      practice: [
        mcq('algods-u5-l7-q1', 'Why must h2(k) be coprime with m in double hashing?',
          ['So h2 is fast.', 'So the probe sequence covers all m slots.', 'So h2(k) = 0 cannot happen.', 'So the table can be resized.'],
          1, 'Coprimality ensures the additive walk through slots has period m.')
      ]
    }
  ]
};

const u6 = {
  id: 'algods-u6',
  title: 'Binomial Heaps',
  summary: 'Mergeable heaps built from binomial trees; all operations O(log n).',
  lessons: [
    {
      title: 'Binomial trees and heap structure',
      durationMinutes: 30,
      type: 'video',
      summary: 'B_k has 2ᵏ nodes and height k; root list = forest of binomial trees.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A binomial heap is a mergeable priority queue built from a forest of binomial trees. The structure is designed so that UNION is fast: two heaps can be combined by merging root lists and linking trees of the same degree, much like carrying bits in binary addition.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Binomial tree B_k',
          text: 'B_0 is a single node. For k >= 1, B_k is formed by linking two B_{k-1} trees, making one root the leftmost child of the other. Thus B_k has 2^k nodes, height k, and root degree k.'
        },
        {
          type: 'diagram',
          title: 'Recursive shape of binomial trees',
          caption: 'Each B_k is made by linking two copies of B_{k-1}.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 390" role="img" aria-label="Binomial trees diagram">
  <rect x="12" y="12" width="896" height="366" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Binomial trees grow by linking equal-degree trees</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-size="14" font-weight="900">
    <text x="120" y="92" fill="#0f2038">B0</text>
    <circle cx="120" cy="145" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="120" y="150">1</text>
    <text x="120" y="212" fill="#475569">1 node</text>
    <text x="300" y="92" fill="#0f2038">B1</text>
    <line x1="300" y1="145" x2="300" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="300" cy="145" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="300" y="150">r</text>
    <circle cx="300" cy="214" r="22" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="300" y="219">c</text>
    <text x="300" y="282" fill="#475569">2 nodes</text>
    <text x="510" y="92" fill="#0f2038">B2</text>
    <line x1="510" y1="145" x2="455" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <line x1="510" y1="145" x2="565" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <line x1="455" y1="220" x2="455" y2="282" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="510" cy="145" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="510" y="150">r</text>
    <circle cx="455" cy="220" r="22" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="455" y="225">B1</text>
    <circle cx="565" cy="220" r="22" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="565" y="225">B0</text>
    <circle cx="455" cy="282" r="18" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="455" y="287">.</text>
    <text x="510" y="334" fill="#475569">4 nodes</text>
    <text x="750" y="92" fill="#0f2038">B3</text>
    <line x1="750" y1="145" x2="670" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <line x1="750" y1="145" x2="750" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <line x1="750" y1="145" x2="830" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="750" cy="145" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="750" y="150">r</text>
    <circle cx="670" cy="220" r="25" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/><text x="670" y="225">B2</text>
    <circle cx="750" cy="220" r="23" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="750" y="225">B1</text>
    <circle cx="830" cy="220" r="21" fill="#fce7f3" stroke="#db2777" stroke-width="2"/><text x="830" y="225">B0</text>
    <text x="750" y="298" fill="#475569">8 nodes, height 3</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Structural facts',
          level: 2
        },
        {
          type: 'table',
          caption: 'Facts about B_k.',
          columns: ['Property', 'Value', 'Reason'],
          rows: [
            ['Number of nodes', '2^k', 'Each B_k links two B_{k-1} trees.'],
            ['Height', 'k', 'Each link adds one level on the longest path.'],
            ['Root degree', 'k', 'The root has children B_{k-1}, B_{k-2}, ..., B_0.'],
            ['Nodes at depth i', 'binomial coefficient C(k, i)', 'This is where the name binomial tree comes from.']
          ]
        },
        {
          type: 'formula',
          latex: '|B_k| = 2^k',
          display: true,
          caption: 'Immediate by induction: B_k contains two copies of B_{k-1}.'
        },
        {
          type: 'heading',
          text: 'Binomial heap structure',
          level: 2
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Binomial heap',
          text: 'A binomial heap is a collection of binomial trees that satisfy min-heap order, with at most one tree of each degree. The tree roots are kept in a root list sorted by increasing degree.'
        },
        {
          type: 'table',
          caption: 'Heap size as binary representation.',
          columns: ['n', 'Binary', 'Trees present'],
          rows: [
            ['1', '1', 'B_0'],
            ['5', '101', 'B_0 and B_2'],
            ['13', '1101', 'B_0, B_2, and B_3'],
            ['20', '10100', 'B_2 and B_4']
          ]
        },
        {
          type: 'paragraph',
          text: 'The at-most-one-tree-of-each-degree rule mirrors binary numbers: if n has a 1 in bit position k, the heap has one B_k tree. This is why a heap of n nodes has only O(log n) root-list trees.'
        },
        {
          type: 'heading',
          text: 'Linking equal-degree trees',
          level: 2
        },
        {
          type: 'code',
          title: 'BINOMIAL-LINK',
          language: 'pseudocode',
          code: `BINOMIAL-LINK(y, z)
    // y and z are roots of B_k trees, and key[z] <= key[y]
    parent[y] = z
    sibling[y] = child[z]
    child[z] = y
    degree[z] = degree[z] + 1`
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Binary carry analogy',
          text: 'Two B_k trees cannot both remain in one binomial heap. Linking them produces one B_{k+1}, just like adding 1 + 1 in bit k creates a carry into bit k+1.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Induction on k',
          text: 'B_0 has one node, height 0, and root degree 0. If B_{k-1} has 2^{k-1} nodes and height k-1, linking two copies gives 2^k nodes. One copy becomes a child of the other root, increasing the longest path and the root degree by one, so B_k has height k and root degree k.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Heap-order preservation',
          text: 'When linking roots y and z, make the larger-key root a child of the smaller-key root. Each original tree already satisfied min-heap order, and the new parent has key no larger than the child root, so the linked tree also satisfies min-heap order.'
        },
        {
          type: 'heading',
          text: 'Runtime and space implications',
          level: 2
        },
        {
          type: 'table',
          caption: 'Why the structure matters.',
          columns: ['Fact', 'Consequence'],
          rows: [
            ['At most one B_k per degree', 'The root list has at most floor(log2 n) + 1 trees.'],
            ['Each root is the minimum of its tree', 'The global minimum is somewhere in the root list.'],
            ['Linking two equal-degree trees is constant time', 'UNION can work by repeated local links.'],
            ['Children of a B_k root have degrees k-1 down to 0', 'EXTRACT-MIN can turn those children back into a valid binomial heap root list.']
          ]
        },
        {
          type: 'formula',
          latex: '\\#\\text{trees in a binomial heap of size } n \\le \\lfloor \\lg n \\rfloor + 1',
          display: true,
          caption: 'There is one possible tree per binary digit of n.'
        },
        { type: 'interactive', artifact: 'binomial-tree-explorer' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Memorize B_k: 2^k nodes, height k, root degree k, children B_{k-1} through B_0. A binomial heap is a min-heap-ordered forest with at most one tree of each degree.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u6l1-E1',
              source: 'Tree size',
              question: 'How many nodes does B_5 contain?',
              solution: 'B_5 contains 2^5 = 32 nodes.'
            },
            {
              id: 'u6l1-E2',
              source: 'Heap roots',
              question: 'A binomial heap has n = 13 nodes. Which tree degrees appear?',
              solution: '13 in binary is 1101, so the heap has B_0, B_2, and B_3: degrees 0, 2, and 3.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u6l1-M1',
              source: 'Linking',
              question: 'What tree is produced by linking two B_3 trees?',
              solution: 'Linking two B_3 trees produces one B_4 tree. The root with larger key becomes a child of the root with smaller key to preserve min-heap order.'
            },
            {
              id: 'u6l1-M2',
              source: 'Proof',
              question: 'Why does a binomial heap of n nodes have O(log n) trees?',
              solution: 'There is at most one tree of each degree, and B_k has 2^k nodes. No degree larger than floor(log2 n) can appear, so there are at most floor(log2 n) + 1 roots.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'build heaps out of binomial trees; merge by linking trees of equal degree.',
        problem: 'support heap UNION in O(log n) — binary heaps need O(n).',
        intuition: 'binomial trees of degree k have a recursive doubling structure.',
        formal: 'B_0 = single node; B_k = two B_{k-1} linked at the root. |B_k| = 2ᵏ, height k.',
        algorithm: 'a binomial heap is a forest of pairwise distinct B_k satisfying min-heap order.',
        worked: 'draw B_0, B_1, B_2, B_3 and verify counts.',
        correctness: 'follows by induction.',
        complexity: 'O(log n) trees in any heap of size n.',
        trace: 'build B_3 from two B_2.',
        takeaways: 'the binomial tree structure makes UNION cheap.',
        practice: 'count node count and degree of B_4.'
      }),
      practice: [
        mcq('algods-u6-l1-q1', 'B_k has how many nodes?',
          ['k', 'k!', '2ᵏ', 'k²'],
          2, 'By induction; B_k consists of two B_{k-1}.')
      ]
    },
    {
      title: 'MAKE-HEAP and MINIMUM',
      durationMinutes: 20,
      type: 'video',
      summary: 'Empty forest; minimum lives at the root of some tree.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'MAKE-HEAP and MINIMUM are the small operations that reveal the whole binomial-heap design. MAKE-HEAP creates an empty ordered root list. MINIMUM does not search every node; because every binomial tree is min-heap ordered, it only scans the roots.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Representation invariant',
          text: 'A binomial heap is represented by a root list sorted by strictly increasing degree. Each root is the root of a min-heap-ordered binomial tree, and no two roots have the same degree.'
        },
        {
          type: 'diagram',
          title: 'Minimum is found among the roots',
          caption: 'The roots are ordered by degree, not by key. The smallest key can be at any root-list position.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 360" role="img" aria-label="Binomial heap minimum root scan diagram">
  <defs>
    <marker id="u6l2-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="896" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Scan the ordered root list, not every node</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <line x1="176" y1="126" x2="344" y2="126" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l2-arrow)"/>
    <line x1="416" y1="126" x2="584" y2="126" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l2-arrow)"/>
    <circle cx="140" cy="126" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="140" y="132" font-size="18" fill="#1e3a8a">18</text>
    <circle cx="380" cy="126" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="380" y="132" font-size="18" fill="#064e3b">6</text>
    <circle cx="620" cy="126" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="620" y="132" font-size="18" fill="#92400e">14</text>
    <text x="140" y="84" font-size="14" fill="#475569">degree 0</text>
    <text x="380" y="84" font-size="14" fill="#475569">degree 2</text>
    <text x="620" y="84" font-size="14" fill="#475569">degree 3</text>
    <line x1="380" y1="154" x2="330" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <line x1="380" y1="154" x2="430" y2="214" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="330" cy="214" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="330" y="220" font-size="15" fill="#334155">22</text>
    <circle cx="430" cy="214" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="430" y="220" font-size="15" fill="#334155">9</text>
    <line x1="620" y1="154" x2="555" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <line x1="620" y1="154" x2="620" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <line x1="620" y1="154" x2="685" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="555" cy="220" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="555" y="226" font-size="15" fill="#334155">25</text>
    <circle cx="620" cy="220" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="620" y="226" font-size="15" fill="#334155">19</text>
    <circle cx="685" cy="220" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="685" y="226" font-size="15" fill="#334155">31</text>
    <rect x="200" y="274" width="520" height="46" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="460" y="303" font-size="15" fill="#334155">Root key 6 is the global minimum because every other tree minimum is also at its root.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Operations',
          level: 2
        },
        {
          type: 'code',
          title: 'MAKE-BINOMIAL-HEAP',
          language: 'pseudocode',
          code: `MAKE-BINOMIAL-HEAP()
    H.head = NIL
    return H`
        },
        {
          type: 'code',
          title: 'BINOMIAL-HEAP-MINIMUM',
          language: 'pseudocode',
          code: `BINOMIAL-HEAP-MINIMUM(H)
    y = NIL
    x = H.head
    min = infinity
    while x != NIL
        if x.key < min
            min = x.key
            y = x
        x = x.sibling
    return y`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Roots are sorted by degree, not key',
          text: 'The root list order is structural: B_0, then B_1, then B_2, and so on for degrees that are present. MINIMUM must scan all roots unless the implementation maintains an extra pointer to the current minimum.'
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Scanning roots with keys 18, 6, and 14.',
          columns: ['Step', 'Root degree', 'Root key', 'Best root so far'],
          rows: [
            ['Initialize', '-', '-', 'NIL with min = infinity'],
            ['Visit first root', '0', '18', '18'],
            ['Visit second root', '2', '6', '6 replaces 18'],
            ['Visit third root', '3', '14', '6 remains best'],
            ['Return', '-', '-', 'root with key 6']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Root-minimum lemma',
          text: 'In a min-heap-ordered tree, every child has key at least its parent key. Repeating this along the path from the root to any node shows that the root key is at most every key in that tree.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Scan invariant',
          text: 'After scanning any prefix of the root list, y points to a root with minimum key among exactly those roots. Initialization is empty, each comparison preserves the claim, and at termination the prefix is the whole root list. By the root-minimum lemma, the smallest root is the smallest node in the heap.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Costs for the two primitive operations.',
          columns: ['Operation', 'Worst-case time', 'Extra space', 'Reason'],
          rows: [
            ['MAKE-BINOMIAL-HEAP', 'Theta(1)', 'Theta(1)', 'Create an empty head pointer.'],
            ['BINOMIAL-HEAP-MINIMUM', 'Theta(log n)', 'Theta(1)', 'There are at most floor(log2 n) + 1 roots.'],
            ['MINIMUM with maintained min pointer', 'Theta(1)', 'Theta(1)', 'Optional augmentation; updates are handled by other operations.']
          ]
        },
        {
          type: 'formula',
          latex: 'r(H) \\le \\lfloor \\lg n \\rfloor + 1',
          display: true,
          caption: 'The number of roots r(H) is bounded by the number of binary digits of n.'
        },
        { type: 'interactive', artifact: 'binomial-heap-anatomy' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'To find the minimum, scan roots only. Do not search inside subtrees. Do not assume the first root is minimum, because the root list is ordered by degree rather than key.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u6l2-E1',
              source: 'Root scan',
              question: 'A binomial heap has roots of degrees 0, 2, and 4 with keys 11, 3, and 17. Which root does MINIMUM return?',
              solution: 'It returns the degree-2 root with key 3, because MINIMUM scans the root keys and chooses the smallest one.'
            },
            {
              id: 'u6l2-E2',
              source: 'Empty heap',
              question: 'What does MAKE-BINOMIAL-HEAP store in the root-list head pointer?',
              solution: 'It stores NIL, representing an empty root list.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u6l2-M1',
              source: 'Proof',
              question: 'Why is it enough to compare only root keys when finding the global minimum?',
              solution: 'Each binomial tree is min-heap ordered, so the minimum element of each tree is at its root. The heap is a forest of such trees, so the global minimum is the smallest among those tree minima, hence among the roots.'
            },
            {
              id: 'u6l2-M2',
              source: 'Complexity',
              question: 'A binomial heap has n = 41 nodes. What is the maximum number of roots that MINIMUM may inspect?',
              solution: 'Since floor(log2 41) = 5, it may inspect at most 6 roots. Equivalently, degrees 0 through 5 are the only possible root degrees.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'minimum is among the root list, scan in O(log n).',
        problem: 'find the smallest key.',
        intuition: 'min-heap order keeps each tree\'s minimum at its root; one of them is global min.',
        formal: 'BINOMIAL-MINIMUM scans the root list and returns the smallest root.',
        algorithm: 'see formal.',
        worked: 'on a heap with three roots [3, 7, 1] return 1.',
        correctness: 'min-heap order in each tree.',
        complexity: 'O(log n).',
        trace: 'identify minimum across trees.',
        takeaways: 'a min pointer can amortise this to O(1) but is optional.',
        practice: 'maintain a min pointer that updates after every operation.'
      }),
      practice: [
        mcq('algods-u6-l2-q1', 'BINOMIAL-MINIMUM has cost:',
          ['O(1)', 'O(log n)', 'O(n)', 'O(log log n)'],
          1, 'Scan the O(log n) root list.')
      ]
    },
    {
      title: 'BINOMIAL-HEAP-UNION',
      durationMinutes: 35,
      type: 'interactive',
      summary: 'Merge two root lists; link trees of equal degree.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'UNION is the central operation. It takes two valid binomial heaps, merges their root lists by increasing degree, and then removes duplicate degrees by linking equal-degree trees. This is the heap analogue of binary addition with carries.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'What UNION must preserve',
          text: 'The output root list must be ordered by increasing degree, have at most one root of each degree, and every tree must remain min-heap ordered.'
        },
        {
          type: 'diagram',
          title: 'Merge first, then consolidate carries',
          caption: 'After merging by degree, equal-degree roots are linked. Three equal degrees are handled by advancing once so the root list stays ordered.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Binomial heap union merge and carry diagram">
  <defs>
    <marker id="u6l3-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="46" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">UNION behaves like binary addition with tree carries</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="130" y="92" font-size="15" fill="#475569">H1 degrees</text>
    <rect x="72" y="108" width="56" height="48" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="100" y="138" fill="#1e3a8a">0</text>
    <rect x="148" y="108" width="56" height="48" rx="9" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="176" y="138" fill="#1e3a8a">2</text>
    <text x="130" y="206" font-size="15" fill="#475569">H2 degrees</text>
    <rect x="34" y="222" width="56" height="48" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="62" y="252" fill="#064e3b">0</text>
    <rect x="110" y="222" width="56" height="48" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="138" y="252" fill="#064e3b">1</text>
    <rect x="186" y="222" width="56" height="48" rx="9" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="214" y="252" fill="#064e3b">2</text>
    <line x1="270" y1="188" x2="370" y2="188" stroke="#0f766e" stroke-width="4" marker-end="url(#u6l3-arrow)"/>
    <text x="320" y="172" font-size="14" fill="#0f766e">merge</text>
    <text x="502" y="92" font-size="15" fill="#475569">Merged root list</text>
    <rect x="346" y="118" width="54" height="48" rx="9" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="373" y="148" fill="#075985">0</text>
    <rect x="412" y="118" width="54" height="48" rx="9" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="439" y="148" fill="#075985">0</text>
    <rect x="478" y="118" width="54" height="48" rx="9" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="505" y="148" fill="#075985">1</text>
    <rect x="544" y="118" width="54" height="48" rx="9" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="571" y="148" fill="#075985">2</text>
    <rect x="610" y="118" width="54" height="48" rx="9" fill="#e0f2fe" stroke="#0284c7" stroke-width="2"/><text x="637" y="148" fill="#075985">2</text>
    <text x="505" y="198" font-size="14" fill="#475569">Two 0s link to one 1; then two 1s link to one 2.</text>
    <text x="505" y="222" font-size="14" fill="#475569">When three 2s appear, skip the first and link the last two.</text>
    <line x1="680" y1="188" x2="780" y2="188" stroke="#0f766e" stroke-width="4" marker-end="url(#u6l3-arrow)"/>
    <text x="730" y="172" font-size="14" fill="#0f766e">link</text>
    <text x="845" y="92" font-size="15" fill="#475569">Final root list</text>
    <rect x="772" y="134" width="58" height="54" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="801" y="168" fill="#92400e">2</text>
    <rect x="860" y="134" width="58" height="54" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="889" y="168" fill="#92400e">3</text>
    <text x="845" y="232" font-size="14" fill="#475569">Strictly increasing degrees again</text>
    <rect x="230" y="318" width="500" height="48" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="348" font-size="15" fill="#334155">Link direction is chosen by key: the smaller-key root remains the parent.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'BINOMIAL-HEAP-MERGE',
          language: 'pseudocode',
          code: `BINOMIAL-HEAP-MERGE(H1, H2)
    merge the root lists of H1 and H2 into one list
    sort by nondecreasing degree
    return the merged root-list head`
        },
        {
          type: 'code',
          title: 'BINOMIAL-LINK',
          language: 'pseudocode',
          code: `BINOMIAL-LINK(y, z)
    // y and z are roots of equal-degree trees, and z.key <= y.key
    y.parent = z
    y.sibling = z.child
    z.child = y
    z.degree = z.degree + 1`
        },
        {
          type: 'code',
          title: 'BINOMIAL-HEAP-UNION',
          language: 'pseudocode',
          code: `BINOMIAL-HEAP-UNION(H1, H2)
    H = MAKE-BINOMIAL-HEAP()
    H.head = BINOMIAL-HEAP-MERGE(H1, H2)
    if H.head == NIL
        return H
    prevX = NIL
    x = H.head
    nextX = x.sibling
    while nextX != NIL
        if x.degree != nextX.degree or
           (nextX.sibling != NIL and nextX.sibling.degree == x.degree)
            prevX = x
            x = nextX
        else if x.key <= nextX.key
            x.sibling = nextX.sibling
            BINOMIAL-LINK(nextX, x)
        else
            if prevX == NIL
                H.head = nextX
            else
                prevX.sibling = nextX
            BINOMIAL-LINK(x, nextX)
            x = nextX
        nextX = x.sibling
    return H`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The three-root case',
          text: 'If x, nextX, and nextX.sibling all have the same degree, CLRS advances instead of linking x with nextX. Linking the first two would create a larger-degree tree before an unprocessed smaller-degree root, breaking root-list order.'
        },
        {
          type: 'heading',
          text: 'Worked union trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Union H1 degrees {0, 2} with H2 degrees {0, 1, 2}. Root keys are shown only where they decide link direction.',
          columns: ['Stage', 'Root list as (degree:key)', 'Action'],
          rows: [
            ['After merge', '(0:12), (0:3), (1:18), (2:7), (2:5)', 'Sorted by degree, but duplicate degrees remain.'],
            ['Link degree 0', '(1:3), (1:18), (2:7), (2:5)', 'Key 3 remains root; key 12 becomes its child.'],
            ['Link degree 1', '(2:3), (2:7), (2:5)', 'Key 3 remains root; key 18 becomes its child.'],
            ['Three degree-2 roots', '(2:3), (2:7), (2:5)', 'Advance past the first degree-2 root.'],
            ['Link last two degree-2 roots', '(2:3), (3:5)', 'Key 5 remains root; key 7 becomes its child.'],
            ['Done', '(2:3), (3:5)', 'Degrees are strictly increasing.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Loop invariant',
          text: 'At the start of each iteration, the root list is ordered by nondecreasing degree, and all roots before x already have unique degrees smaller than or equal to degree[x]. The algorithm only links adjacent equal-degree roots, and the special three-root test preserves list order before a carry is formed.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Heap order is preserved',
          text: 'BINOMIAL-LINK compares the two equal-degree roots and makes the larger-key root a child of the smaller-key root. The two input trees were already min-heap ordered, and the new parent is no larger than the new child root, so the combined tree is min-heap ordered.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'UNION cost breakdown.',
          columns: ['Phase', 'Time', 'Why'],
          rows: [
            ['Merge root lists', 'O(log n)', 'Each input has O(log n) roots.'],
            ['Consolidation pass', 'O(log n)', 'The merged list has O(log n) roots, and each iteration advances or links.'],
            ['Each BINOMIAL-LINK', 'Theta(1)', 'Only a constant number of pointers and one degree field change.'],
            ['Extra space', 'Theta(1)', 'Aside from the output heap object, nodes are rearranged in place.']
          ]
        },
        {
          type: 'formula',
          latex: 'T_{\\text{union}}(n) = O(\\lg n)',
          display: true,
          caption: 'Here n is the total number of nodes in the two input heaps.'
        },
        { type: 'interactive', artifact: 'binomial-heap-union' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'UNION is merge-by-degree plus one consolidation pass. Root lists are ordered by degree, not key. Every link is between two equal-degree roots, and the smaller key stays on top.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u6l3-E1',
              source: 'Link direction',
              question: 'Two B_2 roots have keys 9 and 4. After BINOMIAL-LINK, which key is at the root and what degree does the result have?',
              solution: 'Key 4 remains the root, key 9 becomes a child, and the result is one B_3 tree of degree 3.'
            },
            {
              id: 'u6l3-E2',
              source: 'Merge list',
              question: 'What degree sequence results from merging root lists with degrees 0, 3 and 1, 3 before any linking?',
              solution: 'The merged nondecreasing degree sequence is 0, 1, 3, 3.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u6l3-M1',
              source: 'Carry trace',
              question: 'A merged root list has degrees 1, 1, 1, 3. Which two degree-1 roots should be linked first by the CLRS union pass?',
              solution: 'The pass advances over the first degree-1 root because there are three equal degrees. It then links the second and third degree-1 roots, producing a degree-2 tree after the first degree-1 root.'
            },
            {
              id: 'u6l3-M2',
              source: 'Invariant',
              question: 'Why does UNION not link two roots of different degree?',
              solution: 'Linking is defined only for two B_k trees of the same degree; it creates one B_{k+1}. Different degrees would not produce a binomial tree of the required recursive form.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'walk both root lists in increasing degree, link trees with the same degree.',
        problem: 'combine two heaps in O(log n).',
        intuition: 'mirror of binary addition: two B_k\'s "carry" into a B_{k+1}.',
        formal: 'BINOMIAL-LINK(y, z) makes y a child of z when key[y] >= key[z].',
        algorithm: 'BINOMIAL-HEAP-UNION: merge two root lists by degree; pass through with a sliding window of three roots.',
        worked: 'union of two heaps with degrees {0, 2} and {0, 1, 3}.',
        correctness: 'invariants on root list; binomial trees are linked carefully.',
        complexity: 'O(log n).',
        trace: 'animate UNION on two small heaps; observe carries.',
        takeaways: 'this is the operation that makes all others cheap.',
        practice: 'union two heaps of sizes 5 and 3 step by step.'
      }),
      practice: [
        mcq('algods-u6-l3-q1', 'Linking two B_k trees produces:',
          ['Two B_k trees', 'A B_{k+1} tree', 'A B_{k-1} tree', 'A null tree'],
          1, 'One root becomes a child of the other; the result is one tree of degree k+1.')
      ]
    },
    {
      title: 'INSERT, EXTRACT-MIN, DECREASE-KEY, DELETE',
      durationMinutes: 35,
      type: 'video',
      summary: 'All in O(log n) by reduction to UNION and bubble-up.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The full binomial-heap priority-queue API is built from two ideas: UNION handles structural consolidation, and DECREASE-KEY repairs a local heap-order violation by moving the smaller key upward. The operations are simple once the root-list invariant is respected.'
        },
        {
          type: 'table',
          caption: 'Operation reductions.',
          columns: ['Operation', 'Main idea', 'Worst-case time'],
          rows: [
            ['INSERT', 'Make a one-node heap and UNION it with H.', 'O(log n)'],
            ['EXTRACT-MIN', 'Remove the minimum root, reverse its children, then UNION.', 'O(log n)'],
            ['DECREASE-KEY', 'Lower the key and bubble it upward through parents.', 'O(log n)'],
            ['DELETE', 'Decrease to negative infinity, then EXTRACT-MIN.', 'O(log n)']
          ]
        },
        {
          type: 'diagram',
          title: 'EXTRACT-MIN reverses the removed root children',
          caption: 'The children of a B_k root are stored from high degree to low degree. Reversing them produces a valid increasing-degree root list before UNION.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 440" role="img" aria-label="Binomial heap extract min child reversal diagram">
  <defs>
    <marker id="u6l4-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="416" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Removing the minimum root turns its children into a heap</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="190" y="88" font-size="15" fill="#475569">Before removal: root list</text>
    <circle cx="92" cy="135" r="25" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="92" y="141" fill="#1e3a8a">11</text>
    <circle cx="190" cy="135" r="27" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="190" y="141" fill="#991b1b">2</text>
    <circle cx="310" cy="135" r="25" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="310" y="141" fill="#92400e">19</text>
    <line x1="117" y1="135" x2="163" y2="135" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l4-arrow)"/>
    <line x1="217" y1="135" x2="283" y2="135" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l4-arrow)"/>
    <text x="92" y="96" font-size="13" fill="#475569">B0</text>
    <text x="190" y="96" font-size="13" fill="#475569">B3 min</text>
    <text x="310" y="96" font-size="13" fill="#475569">B4</text>
    <line x1="190" y1="162" x2="126" y2="228" stroke="#94a3b8" stroke-width="2"/>
    <line x1="190" y1="162" x2="190" y2="228" stroke="#94a3b8" stroke-width="2"/>
    <line x1="190" y1="162" x2="254" y2="228" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="126" cy="228" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="126" y="234" fill="#334155">8</text>
    <circle cx="190" cy="228" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="190" y="234" fill="#334155">17</text>
    <circle cx="254" cy="228" r="20" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="254" y="234" fill="#334155">25</text>
    <text x="126" y="266" font-size="13" fill="#475569">degree 2</text>
    <text x="190" y="266" font-size="13" fill="#475569">degree 1</text>
    <text x="254" y="266" font-size="13" fill="#475569">degree 0</text>
    <line x1="388" y1="210" x2="502" y2="210" stroke="#0f766e" stroke-width="4" marker-end="url(#u6l4-arrow)"/>
    <text x="445" y="192" font-size="14" fill="#0f766e">reverse children</text>
    <text x="650" y="88" font-size="15" fill="#475569">New child heap root list</text>
    <circle cx="560" cy="210" r="22" fill="#ffffff" stroke="#16a34a" stroke-width="3"/><text x="560" y="216" fill="#064e3b">25</text>
    <circle cx="650" cy="210" r="24" fill="#ffffff" stroke="#16a34a" stroke-width="3"/><text x="650" y="216" fill="#064e3b">17</text>
    <circle cx="750" cy="210" r="26" fill="#ffffff" stroke="#16a34a" stroke-width="3"/><text x="750" y="216" fill="#064e3b">8</text>
    <line x1="584" y1="210" x2="622" y2="210" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l4-arrow)"/>
    <line x1="676" y1="210" x2="722" y2="210" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l4-arrow)"/>
    <text x="560" y="254" font-size="13" fill="#475569">degree 0</text>
    <text x="650" y="254" font-size="13" fill="#475569">degree 1</text>
    <text x="750" y="254" font-size="13" fill="#475569">degree 2</text>
    <rect x="250" y="336" width="460" height="48" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="366" font-size="15" fill="#334155">Then UNION this child heap with the remaining roots.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'BINOMIAL-HEAP-INSERT',
          language: 'pseudocode',
          code: `BINOMIAL-HEAP-INSERT(H, x)
    H2 = MAKE-BINOMIAL-HEAP()
    x.parent = NIL
    x.child = NIL
    x.sibling = NIL
    x.degree = 0
    H2.head = x
    H = BINOMIAL-HEAP-UNION(H, H2)
    return H`
        },
        {
          type: 'code',
          title: 'BINOMIAL-HEAP-EXTRACT-MIN',
          language: 'pseudocode',
          code: `BINOMIAL-HEAP-EXTRACT-MIN(H)
    find the root x with minimum key, keeping its previous root
    remove x from the root list of H
    H2 = MAKE-BINOMIAL-HEAP()
    H2.head = REVERSE-LIST(x.child)
    for each root r in H2
        r.parent = NIL
    H = BINOMIAL-HEAP-UNION(H, H2)
    return x`
        },
        {
          type: 'code',
          title: 'BINOMIAL-HEAP-DECREASE-KEY',
          language: 'pseudocode',
          code: `BINOMIAL-HEAP-DECREASE-KEY(H, x, k)
    if k > x.key
        error "new key is greater than current key"
    x.key = k
    y = x
    z = y.parent
    while z != NIL and y.key < z.key
        exchange y.key with z.key
        exchange any satellite data that belongs with the key
        y = z
        z = y.parent`
        },
        {
          type: 'code',
          title: 'BINOMIAL-HEAP-DELETE',
          language: 'pseudocode',
          code: `BINOMIAL-HEAP-DELETE(H, x)
    BINOMIAL-HEAP-DECREASE-KEY(H, x, -infinity)
    BINOMIAL-HEAP-EXTRACT-MIN(H)`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'DECREASE-KEY implementation detail',
          text: 'CLRS presents DECREASE-KEY by swapping keys, usually together with satellite data. If an implementation exposes stable node handles, it may instead move the decreased item upward while repairing parent and child pointers. In both versions, the smaller key bubbles toward the root until heap order is restored.'
        },
        {
          type: 'heading',
          text: 'Worked traces',
          level: 2
        },
        {
          type: 'table',
          caption: 'EXTRACT-MIN on roots (0:11), (3:2), (4:19).',
          columns: ['Phase', 'State', 'Reason'],
          rows: [
            ['Scan roots', 'minimum root is (3:2)', 'Only roots can be tree minima.'],
            ['Remove root', 'remaining root list is (0:11), (4:19)', 'Detach the B_3 tree root.'],
            ['Expose children', 'children are degrees 2, 1, 0', 'Children of a B_3 root are B_2, B_1, B_0 in decreasing degree order.'],
            ['Reverse children', 'new root list is degrees 0, 1, 2', 'A binomial heap root list must increase by degree.'],
            ['Union', 'UNION remaining roots with child heap', 'Consolidates any duplicate degrees.']
          ]
        },
        {
          type: 'table',
          caption: 'DECREASE-KEY bubble-up example.',
          columns: ['Step', 'Node key', 'Parent key', 'Action'],
          rows: [
            ['Start', '20 decreases to 4', '7', '4 violates heap order with parent 7.'],
            ['Swap once', '7 moves down, 4 moves up', '5', '4 also violates heap order with parent 5.'],
            ['Swap twice', '5 moves down, 4 moves up', 'NIL or key <= 4', 'Stop when at root or parent key is no larger.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'INSERT',
          text: 'A one-node heap is a valid binomial heap containing a B_0 tree. UNION preserves the binomial-heap invariants, so inserting by unioning a singleton is correct.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'EXTRACT-MIN',
          text: 'The removed root is the global minimum by the MINIMUM argument. Its children are roots of binomial trees with distinct degrees. Reversing them creates an increasing-degree root list, resetting their parents makes them roots, and UNION restores the one-tree-per-degree invariant.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'DECREASE-KEY and DELETE',
          text: 'After lowering a key, the only possible violation is between that node and its parent. Swapping upward removes that violation and may create the same kind one level higher; when the loop stops, every parent-child edge satisfies heap order. DELETE first makes the target smaller than every key, so EXTRACT-MIN removes it.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Why all four operations are logarithmic.',
          columns: ['Operation', 'Dominant work', 'Worst-case time', 'Extra space'],
          rows: [
            ['INSERT', 'UNION with one B_0 root', 'O(log n)', 'Theta(1)'],
            ['EXTRACT-MIN', 'Root scan, child reversal, UNION', 'O(log n)', 'Theta(1)'],
            ['DECREASE-KEY', 'At most one swap per tree level', 'O(log n)', 'Theta(1)'],
            ['DELETE', 'DECREASE-KEY plus EXTRACT-MIN', 'O(log n)', 'Theta(1)']
          ]
        },
        {
          type: 'formula',
          latex: 'h(B_k) = k \\le \\lfloor \\lg n \\rfloor',
          display: true,
          caption: 'The height bound gives the DECREASE-KEY bubble-up cost.'
        },
        { type: 'interactive', artifact: 'binomial-heap-operations' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'For EXTRACT-MIN, always reverse the removed root children before unioning. For DECREASE-KEY, repair only the upward path. For DELETE, decrease to negative infinity and then extract the minimum.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u6l4-E1',
              source: 'Insert',
              question: 'Why is INSERT implemented using a one-node heap?',
              solution: 'A new item by itself is a valid B_0 binomial heap. Unioning it with H performs the necessary carry/link work while preserving all binomial-heap invariants.'
            },
            {
              id: 'u6l4-E2',
              source: 'Extract-min',
              question: 'A removed minimum root has children of degrees 3, 2, 1, 0 in that order. What order should they have before UNION?',
              solution: 'They should be reversed to degrees 0, 1, 2, 3 so they form a valid root list ordered by increasing degree.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u6l4-M1',
              source: 'Decrease-key',
              question: 'A node with key 30 has parent key 18 and grandparent key 7. If its key is decreased to 5, what swaps occur in the CLRS key-swap implementation?',
              solution: 'Key 5 first swaps with 18, then swaps with 7. The decreased key ends at the grandparent position, and the old ancestor keys move one level down along that path.'
            },
            {
              id: 'u6l4-M2',
              source: 'Delete',
              question: 'Explain why DELETE can be implemented as DECREASE-KEY to negative infinity followed by EXTRACT-MIN.',
              solution: 'After the decrease, the target key is smaller than every other key. DECREASE-KEY bubbles it to a root position, and then EXTRACT-MIN removes that root from the heap.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'reduce most operations to UNION; the rest are constant-time tree mutations.',
        problem: 'support a full priority-queue API.',
        intuition: 'INSERT = UNION(H, single-node); EXTRACT-MIN = remove root, UNION children back.',
        formal: 'each child of an extracted root is itself a binomial tree; reverse them and treat as a heap.',
        algorithm: 'see formal; DECREASE-KEY bubbles up like a binary heap.',
        worked: 'extract-min from a 3-tree heap; reattach children as a new heap; UNION.',
        correctness: 'invariants survive each step.',
        complexity: 'O(log n) for all operations.',
        trace: 'animate EXTRACT-MIN.',
        takeaways: 'know the reduction to UNION.',
        practice: 'show INSERT 5 followed by EXTRACT-MIN on a heap of 7 elements.'
      }),
      practice: [
        mcq('algods-u6-l4-q1', 'Time complexity of INSERT in a binomial heap?',
          ['O(1)', 'O(log n)', 'O(n)', 'O(log log n)'],
          1, 'INSERT is implemented as UNION with a single-node heap; UNION is O(log n).')
      ]
    },
    {
      title: 'Unit 6 review',
      durationMinutes: 20,
      type: 'practice',
      summary: 'Mixed practice on binomial heap operations.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A binomial heap is a disciplined forest. The degree structure follows binary representation, heap order puts each tree minimum at its root, and UNION works by the same carry logic as binary addition. Most review questions are variations on those three facts.'
        },
        {
          type: 'diagram',
          title: 'Unit 6 concept map',
          caption: 'The operations are easiest to remember as reductions to structure plus UNION.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 420" role="img" aria-label="Binomial heap concept map">
  <defs>
    <marker id="u6l5-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="916" height="396" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="470" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Binomial heaps: structure drives every operation</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <rect x="70" y="98" width="180" height="72" rx="14" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
    <text x="160" y="128" fill="#1e3a8a">Binomial trees</text>
    <text x="160" y="152" font-size="13" fill="#1e3a8a">B_k has 2^k nodes</text>
    <rect x="380" y="98" width="180" height="72" rx="14" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <text x="470" y="128" fill="#064e3b">Heap forest</text>
    <text x="470" y="152" font-size="13" fill="#064e3b">one root per degree</text>
    <rect x="690" y="98" width="180" height="72" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="780" y="128" fill="#92400e">UNION</text>
    <text x="780" y="152" font-size="13" fill="#92400e">merge and link carries</text>
    <line x1="250" y1="134" x2="378" y2="134" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l5-arrow)"/>
    <line x1="560" y1="134" x2="688" y2="134" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l5-arrow)"/>
    <rect x="150" y="250" width="170" height="72" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <text x="235" y="280" fill="#334155">MINIMUM</text>
    <text x="235" y="304" font-size="13" fill="#475569">scan roots</text>
    <rect x="385" y="250" width="170" height="72" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <text x="470" y="280" fill="#334155">INSERT</text>
    <text x="470" y="304" font-size="13" fill="#475569">UNION singleton</text>
    <rect x="620" y="250" width="170" height="72" rx="14" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <text x="705" y="280" fill="#334155">EXTRACT-MIN</text>
    <text x="705" y="304" font-size="13" fill="#475569">remove, reverse, UNION</text>
    <line x1="780" y1="170" x2="705" y2="248" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l5-arrow)"/>
    <line x1="780" y1="170" x2="470" y2="248" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l5-arrow)"/>
    <line x1="470" y1="170" x2="235" y2="248" stroke="#0f766e" stroke-width="3" marker-end="url(#u6l5-arrow)"/>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core facts to memorize',
          level: 2
        },
        {
          type: 'table',
          caption: 'Structural facts and operation costs.',
          columns: ['Item', 'Fact'],
          rows: [
            ['B_k size', '2^k nodes.'],
            ['B_k height', 'k.'],
            ['B_k root children', 'B_{k-1}, B_{k-2}, ..., B_0.'],
            ['Heap root list', 'Sorted by increasing degree, with at most one root per degree.'],
            ['Heap order', 'Every parent key is at most each child key.'],
            ['MAKE-HEAP', 'Theta(1).'],
            ['MINIMUM', 'O(log n) by root scan, or O(1) with an optional min pointer.'],
            ['UNION', 'O(log n).'],
            ['INSERT, EXTRACT-MIN, DECREASE-KEY, DELETE', 'O(log n).']
          ]
        },
        {
          type: 'heading',
          text: 'Operation checklist',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Before UNION, merge root lists by nondecreasing degree.',
            'During UNION, link only equal-degree roots.',
            'During a link, the smaller-key root remains parent to preserve min-heap order.',
            'When three roots of the same degree appear, advance once before linking.',
            'During EXTRACT-MIN, remove the minimum root and reverse its child list before unioning.',
            'During DECREASE-KEY, repair heap order along the path to the root.'
          ]
        },
        {
          type: 'heading',
          text: 'Trace practice',
          level: 2
        },
        {
          type: 'table',
          caption: 'Starting from empty, insert keys 12, 7, 25, 15, 28, 33, 41. This table tracks only heap size and possible degrees.',
          columns: ['After insert', 'n', 'Binary n', 'Root degrees present'],
          rows: [
            ['12', '1', '1', '{0}'],
            ['7', '2', '10', '{1}'],
            ['25', '3', '11', '{0, 1}'],
            ['15', '4', '100', '{2}'],
            ['28', '5', '101', '{0, 2}'],
            ['33', '6', '110', '{1, 2}'],
            ['41', '7', '111', '{0, 1, 2}']
          ]
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'How to draw the actual heap',
          text: 'The degree set comes from the binary size, but the root keys come from link decisions. When inserting 7 after 12, the two B_0 roots link and 7 becomes the B_1 root because 7 is smaller than 12.'
        },
        {
          type: 'heading',
          text: 'Correctness template',
          level: 2
        },
        {
          type: 'table',
          caption: 'Reusable proof ideas.',
          columns: ['Claim', 'Proof idea'],
          rows: [
            ['MINIMUM returns the smallest key', 'Each tree minimum is at its root; scan all roots.'],
            ['BINOMIAL-LINK preserves heap order', 'Make the smaller-key root the parent.'],
            ['UNION produces a binomial heap', 'Merge keeps degree order; linking removes duplicate degrees; heap order is preserved by each link.'],
            ['EXTRACT-MIN is correct', 'Remove the smallest root, turn its children into a heap by reversing, then use UNION correctness.'],
            ['DECREASE-KEY is correct', 'The only violation moves upward and disappears when the parent key is small enough.']
          ]
        },
        {
          type: 'heading',
          text: 'Common mistakes',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Sorting the root list by key instead of by degree.',
            'Forgetting that heap order is min-heap order in this unit.',
            'Linking roots of different degree.',
            'Forgetting the three-root case in UNION.',
            'Unioning extracted children without reversing them.',
            'Saying DECREASE-KEY scans the root list; it follows parent pointers upward.'
          ]
        },
        {
          type: 'formula',
          latex: 'n = \\sum_{k \\in D} 2^k',
          display: true,
          caption: 'The set D of root degrees is exactly the set of 1-bits in n.'
        },
        { type: 'interactive', artifact: 'binomial-heap-review' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'If you can track degrees like binary digits and preserve min-heap order when linking, you can reconstruct every binomial-heap operation under time pressure.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u6l5-E1',
              source: 'Binary size',
              question: 'Which root degrees can appear in a binomial heap with n = 29 nodes?',
              solution: '29 = 16 + 8 + 4 + 1, so the root degrees are 0, 2, 3, and 4.'
            },
            {
              id: 'u6l5-E2',
              source: 'Operation choice',
              question: 'Which operation must reverse a list of children?',
              solution: 'EXTRACT-MIN. After removing the minimum root, its children are in decreasing degree order, so they are reversed before UNION.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u6l5-M1',
              source: 'Union trace',
              question: 'After merging two root lists, the degrees are 0, 0, 1, 1. What degree sequence remains after full consolidation?',
              solution: 'First link the two degree-0 roots to make one degree-1 root. Now there are three degree-1 roots. The CLRS pass advances over the first and links the next two, producing degrees 1 and 2.'
            },
            {
              id: 'u6l5-M2',
              source: 'Extract-min reasoning',
              question: 'Why does reversing the removed root children not break min-heap order inside those child trees?',
              solution: 'Reversal changes only the sibling order among child roots. It does not change parent-child relationships inside any child subtree, so each child tree remains min-heap ordered.'
            },
            {
              id: 'u6l5-M3',
              source: 'Runtime proof',
              question: 'Give one sentence explaining why DECREASE-KEY is O(log n).',
              solution: 'The decreased key moves up at most one level per iteration, and a binomial tree containing at most n nodes has height at most floor(log2 n).'
            }
          ]
        }
      ],
      content: [
        block('Binomial heaps are the natural mergeable heap; they reduce most operations to UNION + small constant work.'),
        tip('Watch the carries during UNION carefully; they are the trickiest part of the algorithm.'),
        example('Practice: starting from an empty heap, INSERT keys 12, 7, 25, 15, 28, 33, 41 and draw the heap after each step.')
      ],
      practice: [
        mcq('algods-u6-l5-q1', 'A binomial heap of 13 nodes contains binomial trees of degrees:',
          ['{0, 1, 2, 3}', '{0, 2, 3}', '{1, 3}', '{0, 1, 3}'],
          1, '13 = 1 + 4 + 8 = 2⁰ + 2² + 2³, so the heap has B_0, B_2, B_3 — degrees {0, 2, 3}.')
      ]
    }
  ]
};

const u7 = {
  id: 'algods-u7',
  title: 'Amortized Analysis',
  summary: 'Aggregate, accounting, and potential methods; multipop and binary counter.',
  lessons: [
    {
      title: 'Aggregate / accounting intuition',
      durationMinutes: 25,
      type: 'video',
      summary: 'Average per-operation cost over a worst-case sequence.',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Amortized analysis studies the total cost of a worst-case sequence of operations. It is not average-case analysis, and it does not require random inputs. The point is that a data structure may have rare expensive operations, but those expensive operations can only happen after enough cheap operations have prepared or paid for them.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Amortized cost',
          text: 'For a sequence of m operations with actual costs c_1, c_2, ..., c_m, an amortized analysis assigns charges so that the sum of charges upper-bounds the sum of actual costs for every operation prefix. The amortized cost per operation is then a worst-case sequence average.'
        },
        {
          type: 'diagram',
          title: 'Spiky real costs, smooth amortized budget',
          caption: 'A single operation can be expensive. Amortized analysis asks whether every long sequence is still cheap in total.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 370" role="img" aria-label="Amortized analysis cost spikes diagram">
  <rect x="12" y="12" width="896" height="346" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Amortized analysis controls total cost over a sequence</text>
  <g font-family="Inter, Arial, sans-serif">
    <line x1="96" y1="292" x2="826" y2="292" stroke="#94a3b8" stroke-width="2"/>
    <line x1="96" y1="88" x2="96" y2="292" stroke="#94a3b8" stroke-width="2"/>
    <g text-anchor="middle" font-size="13" fill="#475569" font-weight="800">
      <text x="146" y="318">1</text><text x="216" y="318">2</text><text x="286" y="318">3</text><text x="356" y="318">4</text>
      <text x="426" y="318">5</text><text x="496" y="318">6</text><text x="566" y="318">7</text><text x="636" y="318">8</text>
      <text x="706" y="318">9</text><text x="776" y="318">10</text>
    </g>
    <g fill="#dbeafe" stroke="#2563eb" stroke-width="2">
      <rect x="126" y="260" width="40" height="32" rx="7"/>
      <rect x="196" y="260" width="40" height="32" rx="7"/>
      <rect x="266" y="156" width="40" height="136" rx="7"/>
      <rect x="336" y="260" width="40" height="32" rx="7"/>
      <rect x="406" y="260" width="40" height="32" rx="7"/>
      <rect x="476" y="236" width="40" height="56" rx="7"/>
      <rect x="546" y="112" width="40" height="180" rx="7"/>
      <rect x="616" y="260" width="40" height="32" rx="7"/>
      <rect x="686" y="260" width="40" height="32" rx="7"/>
      <rect x="756" y="260" width="40" height="32" rx="7"/>
    </g>
    <line x1="116" y1="224" x2="806" y2="224" stroke="#16a34a" stroke-width="4" stroke-dasharray="12 9"/>
    <text x="812" y="218" font-size="14" font-weight="900" fill="#16a34a">constant amortized charge</text>
    <text x="130" y="86" font-size="14" font-weight="800" fill="#475569">actual cost</text>
    <rect x="214" y="80" width="492" height="44" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="460" y="108" text-anchor="middle" font-size="15" font-weight="800" fill="#334155">Rare spikes are allowed if earlier cheap operations pay for them.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Three CLRS methods',
          level: 2
        },
        {
          type: 'table',
          caption: 'The three standard ways to prove amortized bounds.',
          columns: ['Method', 'What you prove', 'Typical use'],
          rows: [
            ['Aggregate analysis', 'Every sequence of m operations costs T(m), so the amortized cost is T(m) / m.', 'Fast first proof for stacks and counters.'],
            ['Accounting method', 'Assign charges to operations and store credit on objects; credit never goes negative.', 'Useful when cheap operations visibly prepay expensive ones.'],
            ['Potential method', 'Choose a potential Phi(D) and prove telescoping over the sequence.', 'Most flexible method; used heavily for Fibonacci heaps.']
          ]
        },
        {
          type: 'formula',
          latex: '\\sum_{i=1}^{m} c_i \\le \\sum_{i=1}^{m} \\hat{c}_i',
          display: true,
          caption: 'The assigned amortized charges must upper-bound actual cost for every prefix of the sequence.'
        },
        {
          type: 'heading',
          text: 'What amortized does not mean',
          level: 2
        },
        {
          type: 'table',
          caption: 'Amortized analysis versus nearby ideas.',
          columns: ['Analysis type', 'Question answered', 'Randomness needed?'],
          rows: [
            ['Worst-case per operation', 'How bad can one operation be?', 'No.'],
            ['Average-case', 'What is the expected cost over a probability distribution of inputs?', 'Yes, a distribution is part of the model.'],
            ['Expected randomized time', 'What is the expected cost over the algorithm\'s random choices?', 'Yes, from the algorithm.'],
            ['Amortized', 'How expensive can a worst-case sequence be on average per operation?', 'No.']
          ]
        },
        {
          type: 'heading',
          text: 'Accounting method',
          level: 2
        },
        {
          type: 'code',
          title: 'Accounting proof checklist',
          language: 'pseudocode',
          code: `ACCOUNTING-PROOF(sequence)
    choose an amortized charge for each operation type
    decide where extra credit is stored
    prove credit is never negative after any prefix
    conclude total actual cost <= total amortized charge`
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'The bank-account picture',
          text: 'If an operation is charged more than its actual cost, the surplus becomes credit. If a later operation is charged less than its actual cost, it spends stored credit. The proof is the invariant that the bank balance never becomes negative.'
        },
        {
          type: 'heading',
          text: 'Worked mini-sequence',
          level: 2
        },
        {
          type: 'table',
          caption: 'Suppose we charge 3 units to every operation in this toy sequence.',
          columns: ['Operation', 'Actual cost', 'Amortized charge', 'Balance after operation'],
          rows: [
            ['op 1', '1', '3', '2'],
            ['op 2', '1', '3', '4'],
            ['op 3', '6', '3', '1'],
            ['op 4', '1', '3', '3'],
            ['op 5', '1', '3', '5'],
            ['op 6', '8', '3', '0']
          ]
        },
        {
          type: 'paragraph',
          text: 'This table is not a complete proof for a real data structure, because it checks only one sequence. It shows the bookkeeping idea: a constant charge can cover spikes if the invariant says the balance is never negative for every possible prefix.'
        },
        {
          type: 'heading',
          text: 'Correctness of the bound',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Prefix invariant',
          text: 'If after every prefix the stored credit is nonnegative, then actual cost paid so far is at most total amortized charge paid so far. Therefore the amortized analysis gives a valid upper bound on the true worst-case total cost.'
        },
        {
          type: 'heading',
          text: 'Runtime interpretation',
          level: 2
        },
        {
          type: 'table',
          caption: 'How to read an amortized bound.',
          columns: ['Statement', 'Meaning'],
          rows: [
            ['An operation costs O(1) amortized.', 'Any sequence of m such operations costs O(m) total.'],
            ['One operation may cost Theta(n) actual time.', 'That does not contradict an O(1) amortized bound.'],
            ['The sequence is worst-case.', 'No probability distribution is being assumed.'],
            ['The first operation can be expensive.', 'Then the potential/accounting proof must already have enough initial credit, or the bound must include that cost.']
          ]
        },
        { type: 'interactive', artifact: 'amortized-bank' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Always state whether you are using aggregate, accounting, or potential analysis. Then prove a sequence bound, not just a story about one expensive operation.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u7l1-E1',
              source: 'Vocabulary',
              question: 'Does amortized analysis require random inputs?',
              solution: 'No. It bounds the total cost of every worst-case operation sequence. Average-case and randomized expected-time analyses are the ones that require probability.'
            },
            {
              id: 'u7l1-E2',
              source: 'Sequence average',
              question: 'If 10 operations have total actual cost 35, what is the average actual cost per operation for that sequence?',
              solution: 'The average actual cost is 35 / 10 = 3.5. An amortized proof would need to show such an average bound for every valid sequence, not just this one.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u7l1-M1',
              source: 'Accounting proof',
              question: 'Why is it not enough to say "cheap operations pay for expensive operations" without an invariant?',
              solution: 'Because the expensive operation might occur before enough cheap operations have happened. The invariant, usually nonnegative stored credit after every prefix, proves that the payment scheme works for all possible sequences.'
            },
            {
              id: 'u7l1-M2',
              source: 'Interpretation',
              question: 'If an operation has O(1) amortized cost over m operations, what total cost bound follows?',
              solution: 'The total cost of any sequence of m operations is O(m). The claim is about the sequence total, not about every individual operation.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'amortise expensive operations across cheap ones to get a meaningful per-op average.',
        problem: 'a single operation may be expensive but the worst-case sequence is cheap.',
        intuition: 'banking metaphor: prepay for future expensive ops.',
        formal: 'amortised cost cb satisfies sum cb_i >= sum c_i over any sequence.',
        algorithm: 'no algorithm; analysis only.',
        worked: 'a stack with PUSH, POP, MULTIPOP: any sequence of n ops costs O(n) total.',
        correctness: 'the amortised charge upper-bounds true cost.',
        complexity: 'amortised constant per op for the stack.',
        trace: 'show amortised counts on a sequence of 5 ops.',
        takeaways: 'know the difference between worst case and amortised.',
        practice: 'show that MULTIPOP cost averages to O(1) per operation.'
      }),
      practice: [
        mcq('algods-u7-l1-q1', 'Amortised analysis bounds:',
          ['Average over random inputs.', 'Worst-case total cost over a sequence, divided by sequence length.', 'Expected time of a randomised algorithm.', 'Best-case time.'],
          1, 'Amortised analysis says: in the worst sequence of n ops, the average per op is X.')
      ]
    },
    {
      title: 'Stack operations and multipop',
      durationMinutes: 25,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'MULTIPOP can remove many items at once, so one operation can be expensive. But no stack item can be popped unless it was previously pushed, and once it is popped it is gone. That one-to-one relationship between pushes and future pops is exactly what amortized analysis exploits.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Stack operation costs',
          text: 'We count PUSH and POP as cost 1. MULTIPOP(S, k) costs the number of items actually popped, which is min(k, current stack size).'
        },
        {
          type: 'diagram',
          title: 'Each pushed item carries credit for one future pop',
          caption: 'Charge PUSH two units: one pays for the push now, and one sits on the item until it is popped.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 390" role="img" aria-label="Stack multipop accounting diagram">
  <rect x="12" y="12" width="896" height="366" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Accounting for MULTIPOP: credit travels with stack items</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="170" y="92" font-size="15" fill="#475569">After PUSH A, PUSH B, PUSH C</text>
    <rect x="100" y="122" width="140" height="48" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="170" y="153" fill="#1e3a8a">C + 1 credit</text>
    <rect x="100" y="176" width="140" height="48" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="170" y="207" fill="#064e3b">B + 1 credit</text>
    <rect x="100" y="230" width="140" height="48" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="170" y="261" fill="#92400e">A + 1 credit</text>
    <rect x="82" y="286" width="176" height="18" rx="9" fill="#64748b"/>
    <text x="460" y="190" font-size="18" fill="#0f766e">MULTIPOP(S, 2)</text>
    <path d="M270 146 C360 116, 490 116, 590 146" fill="none" stroke="#0f766e" stroke-width="4"/>
    <path d="M270 200 C360 230, 490 230, 590 200" fill="none" stroke="#0f766e" stroke-width="4"/>
    <text x="460" y="238" font-size="14" fill="#475569">The stored dollars pay for the two actual pops.</text>
    <text x="720" y="92" font-size="15" fill="#475569">After the multipop</text>
    <rect x="650" y="230" width="140" height="48" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="720" y="261" fill="#92400e">A + 1 credit</text>
    <rect x="632" y="286" width="176" height="18" rx="9" fill="#64748b"/>
    <rect x="590" y="132" width="250" height="76" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="715" y="162" font-size="15" fill="#334155">No popped item is ever charged twice.</text>
    <text x="715" y="188" font-size="15" fill="#334155">Total pops &lt;= total pushes.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS stack pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'PUSH, POP, and MULTIPOP',
          language: 'pseudocode',
          code: `PUSH(S, x)
    S.top = S.top + 1
    S[S.top] = x

POP(S)
    if STACK-EMPTY(S)
        error "underflow"
    S.top = S.top - 1
    return S[S.top + 1]

MULTIPOP(S, k)
    while not STACK-EMPTY(S) and k > 0
        POP(S)
        k = k - 1`
        },
        {
          type: 'heading',
          text: 'Aggregate analysis',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'In any sequence of m stack operations, there can be at most m pushes. Across the entire sequence, the total number of popped items is at most the total number of pushed items. Therefore all pops, including the pops performed inside MULTIPOP, contribute only O(m) total cost.'
        },
        {
          type: 'formula',
          latex: '\\sum \\text{actual cost} \\le \\#\\text{PUSH} + \\#\\text{popped items} \\le 2m',
          display: true,
          caption: 'Every item is pushed at most once and popped at most once.'
        },
        {
          type: 'heading',
          text: 'Accounting analysis',
          level: 2
        },
        {
          type: 'table',
          caption: 'One valid charging scheme.',
          columns: ['Operation', 'Actual cost', 'Amortized charge', 'Credit action'],
          rows: [
            ['PUSH', '1', '2', 'Pay 1 for the push and store 1 credit on the item.'],
            ['POP', '1', '0', 'Use the item\'s stored credit to pay for the pop.'],
            ['MULTIPOP', 'number popped', '0', 'Each popped item spends its own stored credit.']
          ]
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Credit invariant',
          text: 'Every item currently on the stack has exactly one unit of credit. No other credit is needed. PUSH creates an item and its credit; POP or MULTIPOP removes items and spends their credits. The total credit never becomes negative.'
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Sequence: PUSH A, PUSH B, PUSH C, MULTIPOP(S,2), PUSH D, POP.',
          columns: ['Operation', 'Actual cost', 'Amortized charge', 'Stack after operation', 'Stored credit'],
          rows: [
            ['PUSH A', '1', '2', 'A', '1'],
            ['PUSH B', '1', '2', 'A, B', '2'],
            ['PUSH C', '1', '2', 'A, B, C', '3'],
            ['MULTIPOP(S,2)', '2', '0', 'A', '1'],
            ['PUSH D', '1', '2', 'A, D', '2'],
            ['POP', '1', '0', 'A', '1']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness of the bound',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Aggregate proof',
          text: 'Consider any sequence of m operations. PUSH operations cost at most m in total. Every POP step, whether from POP or MULTIPOP, removes a distinct item that was pushed earlier, so the total number of such steps is at most the number of pushes, at most m. Hence total cost is at most 2m.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Actual and amortized costs.',
          columns: ['Operation', 'Worst-case actual time', 'Amortized time'],
          rows: [
            ['PUSH', 'Theta(1)', 'Theta(1)'],
            ['POP', 'Theta(1)', 'Theta(1)'],
            ['MULTIPOP(S, k)', 'Theta(min(k, stack size))', 'Theta(1)'],
            ['Sequence of m operations', 'Can contain expensive individual calls', 'Theta(m) total']
          ]
        },
        { type: 'interactive', artifact: 'multipop-stack' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Do not try to bound one MULTIPOP by a constant actual cost. Bound the whole sequence: each pushed item can be popped at most once.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u7l2-E1',
              source: 'Actual cost',
              question: 'If the stack currently has 3 items, what is the actual cost of MULTIPOP(S, 10)?',
              solution: 'It pops only the 3 available items, so the actual cost is 3.'
            },
            {
              id: 'u7l2-E2',
              source: 'Accounting',
              question: 'In the accounting scheme above, how much amortized cost is charged to PUSH?',
              solution: 'PUSH is charged 2 units: one pays for the actual push and one is stored on the pushed item for its future pop.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u7l2-M1',
              source: 'Sequence bound',
              question: 'A sequence has 40 stack operations total. What upper bound does the aggregate proof give for total actual cost?',
              solution: 'At most 80, because total PUSH cost is at most 40 and total popped items is at most the number of pushes, also at most 40.'
            },
            {
              id: 'u7l2-M2',
              source: 'Invariant',
              question: 'Why can POP have amortized charge 0 without making the analysis invalid?',
              solution: 'A successful POP removes an item that was previously pushed. That item carries one unit of stored credit from its PUSH, and that credit pays for the actual POP.'
            }
          ]
        }
      ],
      summary: 'Multipop\'s real cost can be Θ(k) but its amortised cost is O(1).',
      content: teachingArc({
        bigIdea: 'each PUSH "pays for" its eventual POP.',
        problem: 'why does a stack stay O(1) per operation despite O(k) MULTIPOPs?',
        intuition: 'MULTIPOP can only POP what was previously PUSHed; total POPs <= total PUSHes.',
        formal: 'aggregate analysis: any n-op sequence has total cost <= 2n.',
        algorithm: 'no algorithm; analysis only.',
        worked: '20 PUSH, 1 MULTIPOP(20): real cost 40, amortised cost 2/op over 21 ops = 1.9.',
        correctness: 'each pop is paid for by a prior push.',
        complexity: 'amortised O(1) per stack op.',
        trace: 'simulate a 10-op mixed sequence.',
        takeaways: 'this is the canonical first amortised example.',
        practice: 'modify the analysis if MULTIPOP could pop k items not yet pushed.'
      }),
      practice: [
        mcq('algods-u7-l2-q1', 'Amortised cost of a stack operation under aggregate analysis is:',
          ['O(1)', 'O(log n)', 'O(n)', 'It depends on n.'],
          0, 'Total cost <= 2n for any n operations; per-op average is O(1).')
      ]
    },
    {
      title: 'Binary counter',
      durationMinutes: 25,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A binary counter is the canonical example where worst-case and amortized costs differ sharply. One INCREMENT can flip many bits, for example 011111 to 100000. But long carry chains are rare: a high-order bit flips only after many lower-order increments.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Binary counter model',
          text: 'A counter is stored in an array A[0..k-1] of bits, where A[0] is the least significant bit. The cost of INCREMENT is the number of bit flips.'
        },
        {
          type: 'diagram',
          title: 'Carries are rare at high bit positions',
          caption: 'Bit 0 flips every increment, bit 1 every second increment, bit 2 every fourth increment, and so on.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 410" role="img" aria-label="Binary counter bit flip frequency diagram">
  <rect x="12" y="12" width="916" height="386" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="470" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Binary counter increments: lower bits flip more often</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle">
    <g font-size="13" font-weight="800" fill="#475569">
      <text x="118" y="92">increment</text>
      <text x="218" y="92">1</text><text x="298" y="92">2</text><text x="378" y="92">3</text><text x="458" y="92">4</text>
      <text x="538" y="92">5</text><text x="618" y="92">6</text><text x="698" y="92">7</text><text x="778" y="92">8</text>
    </g>
    <g font-size="14" font-weight="900">
      <text x="118" y="136" fill="#475569">bit 0</text>
      <text x="118" y="186" fill="#475569">bit 1</text>
      <text x="118" y="236" fill="#475569">bit 2</text>
      <text x="118" y="286" fill="#475569">bit 3</text>
      <g fill="#dbeafe" stroke="#2563eb" stroke-width="2">
        <rect x="196" y="112" width="44" height="34" rx="8"/><rect x="276" y="112" width="44" height="34" rx="8"/><rect x="356" y="112" width="44" height="34" rx="8"/><rect x="436" y="112" width="44" height="34" rx="8"/>
        <rect x="516" y="112" width="44" height="34" rx="8"/><rect x="596" y="112" width="44" height="34" rx="8"/><rect x="676" y="112" width="44" height="34" rx="8"/><rect x="756" y="112" width="44" height="34" rx="8"/>
      </g>
      <g fill="#dcfce7" stroke="#16a34a" stroke-width="2">
        <rect x="276" y="162" width="44" height="34" rx="8"/><rect x="436" y="162" width="44" height="34" rx="8"/><rect x="596" y="162" width="44" height="34" rx="8"/><rect x="756" y="162" width="44" height="34" rx="8"/>
      </g>
      <g fill="#fef3c7" stroke="#d97706" stroke-width="2">
        <rect x="436" y="212" width="44" height="34" rx="8"/><rect x="756" y="212" width="44" height="34" rx="8"/>
      </g>
      <g fill="#fee2e2" stroke="#dc2626" stroke-width="2">
        <rect x="756" y="262" width="44" height="34" rx="8"/>
      </g>
      <g fill="#0f2038">
        <text x="218" y="135">flip</text><text x="298" y="135">flip</text><text x="378" y="135">flip</text><text x="458" y="135">flip</text>
        <text x="538" y="135">flip</text><text x="618" y="135">flip</text><text x="698" y="135">flip</text><text x="778" y="135">flip</text>
        <text x="298" y="185">flip</text><text x="458" y="185">flip</text><text x="618" y="185">flip</text><text x="778" y="185">flip</text>
        <text x="458" y="235">flip</text><text x="778" y="235">flip</text>
        <text x="778" y="285">flip</text>
      </g>
    </g>
    <rect x="230" y="330" width="480" height="44" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="470" y="358" font-size="15" font-weight="800" fill="#334155">Total flips in 8 increments: 8 + 4 + 2 + 1 = 15.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS increment pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'INCREMENT',
          language: 'pseudocode',
          code: `INCREMENT(A)
    i = 0
    while i < A.length and A[i] == 1
        A[i] = 0
        i = i + 1
    if i < A.length
        A[i] = 1`
        },
        {
          type: 'heading',
          text: 'Aggregate analysis',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Over n increments starting from zero, bit j flips once every 2^j increments. Summing by bit position gives a geometric series. Even though one increment may flip Theta(log n) bits, all n increments together flip fewer than 2n bits.'
        },
        {
          type: 'formula',
          latex: '\\sum_{j=0}^{\\lfloor \\lg n \\rfloor} \\left\\lfloor \\frac{n}{2^j} \\right\\rfloor \\le 2n',
          display: true,
          caption: 'Count flips column by column rather than increment by increment.'
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Eight increments from 0000. Bits are shown as b3 b2 b1 b0.',
          columns: ['Increment', 'Before', 'After', 'Bits flipped', 'Cost'],
          rows: [
            ['1', '0000', '0001', 'b0', '1'],
            ['2', '0001', '0010', 'b0, b1', '2'],
            ['3', '0010', '0011', 'b0', '1'],
            ['4', '0011', '0100', 'b0, b1, b2', '3'],
            ['5', '0100', '0101', 'b0', '1'],
            ['6', '0101', '0110', 'b0, b1', '2'],
            ['7', '0110', '0111', 'b0', '1'],
            ['8', '0111', '1000', 'b0, b1, b2, b3', '4']
          ]
        },
        {
          type: 'heading',
          text: 'Potential intuition',
          level: 2
        },
        {
          type: 'callout',
          tone: 'intuition',
          title: 'Ones store future work',
          text: 'A 1-bit is a carry waiting to happen. When an increment changes trailing 1s to 0s, it spends the potential stored in those 1s. When it turns the first 0 into 1, it creates one new unit of future work.'
        },
        {
          type: 'heading',
          text: 'Correctness of the bound',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Column-count proof',
          text: 'For each bit position j, that bit flips at most floor(n / 2^j) times in the first n increments. Summing this over all positions gives at most n(1 + 1/2 + 1/4 + ...) < 2n flips. Therefore the total cost is O(n), so each increment costs O(1) amortized.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Binary counter costs.',
          columns: ['Operation view', 'Cost'],
          rows: [
            ['Single INCREMENT worst case', 'Theta(k), where k is the number of bits.'],
            ['n increments from zero', 'Theta(n) total bit flips.'],
            ['Amortized INCREMENT', 'Theta(1).'],
            ['Storage', 'Theta(k) bits for a k-bit counter.']
          ]
        },
        { type: 'interactive', artifact: 'binary-counter-amortized' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'The easy proof counts flips by bit position. Bit j flips every 2^j increments, so the total is a geometric series bounded by 2n.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u7l3-E1',
              source: 'Worst case',
              question: 'How many bits flip when a counter goes from 0111 to 1000?',
              solution: 'Four bits flip: the three trailing 1s become 0, and the next 0 becomes 1.'
            },
            {
              id: 'u7l3-E2',
              source: 'Frequency',
              question: 'In the first 16 increments from zero, how many times does bit 3 flip?',
              solution: 'Bit 3 flips every 2^3 = 8 increments, so it flips floor(16 / 8) = 2 times.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u7l3-M1',
              source: 'Total flips',
              question: 'Use the column-count method to upper-bound the total bit flips in the first 32 increments.',
              solution: 'The bound is 32 + 16 + 8 + 4 + 2 + 1 = 63 if we include bits 0 through 5. This is less than 2 * 32 = 64.'
            },
            {
              id: 'u7l3-M2',
              source: 'Amortized conclusion',
              question: 'Why does a Theta(log n) worst-case increment not contradict O(1) amortized cost?',
              solution: 'The Theta(log n) increment occurs only after many cheaper increments. The total cost over n increments is O(n), so the average cost per increment in any such sequence is O(1).'
            }
          ]
        }
      ],
      summary: 'Each INCREMENT flips O(log n) bits worst case; n increments cost O(n) total.',
      content: teachingArc({
        bigIdea: 'most increments flip 1 bit; the occasional cascade is rare enough.',
        problem: 'is INCREMENT O(log n) per call?',
        intuition: 'bit i flips every 2ⁱ increments; total flips after n increments = sum n/2ⁱ ~ 2n.',
        formal: 'amortised cost per INCREMENT is O(1).',
        algorithm: 'no algorithm; analysis.',
        worked: 'increment from 0 to 16 and count flips per step.',
        correctness: 'aggregate count of bit flips = O(n) over n increments.',
        complexity: 'amortised O(1) per increment.',
        trace: 'sum bit flips for n = 8 by columns.',
        takeaways: 'doubling structure gives constant amortised work.',
        practice: 'compute total flips for n = 32.'
      }),
      practice: [
        mcq('algods-u7-l3-q1', 'Amortised cost of one INCREMENT on a binary counter is:',
          ['O(1)', 'O(log n)', 'O(n)', 'O(2ⁿ)'],
          0, 'Sum of n/2ⁱ ~ 2n flips over n increments => O(1) per increment.')
      ]
    },
    {
      title: 'Potential method',
      durationMinutes: 30,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The potential method is a formal version of the accounting method. Instead of manually placing credit on individual objects, we define a potential function Phi(D) that measures stored work in the entire data-structure state D. Expensive operations are allowed when potential drops enough to pay for them.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Potential function',
          text: 'A potential function maps each data-structure state D_i to a nonnegative real number Phi(D_i). We require Phi(D_0) = 0 and Phi(D_i) >= 0 for all i, so amortized total cost upper-bounds actual total cost.'
        },
        {
          type: 'diagram',
          title: 'Actual cost plus change in stored potential',
          caption: 'If potential rises, the operation deposits credit. If potential falls, the operation withdraws credit to pay for real work.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 390" role="img" aria-label="Potential method deposit and withdraw diagram">
  <defs>
    <marker id="u7l4-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
    <marker id="u7l4-arrow2" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#d97706"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="916" height="366" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="470" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Potential method: charge actual work plus potential change</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <rect x="78" y="100" width="230" height="84" rx="16" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
    <text x="193" y="133" fill="#1e3a8a">Cheap operation</text>
    <text x="193" y="160" font-size="14" fill="#1e3a8a">actual cost low</text>
    <rect x="78" y="220" width="230" height="84" rx="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <text x="193" y="253" fill="#064e3b">Potential increases</text>
    <text x="193" y="280" font-size="14" fill="#064e3b">deposit for later</text>
    <path d="M193 184 L193 218" stroke="#0f766e" stroke-width="4" marker-end="url(#u7l4-arrow)"/>
    <rect x="632" y="100" width="230" height="84" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
    <text x="747" y="133" fill="#991b1b">Expensive operation</text>
    <text x="747" y="160" font-size="14" fill="#991b1b">actual cost high</text>
    <rect x="632" y="220" width="230" height="84" rx="16" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="747" y="253" fill="#92400e">Potential decreases</text>
    <text x="747" y="280" font-size="14" fill="#92400e">withdraw to pay</text>
    <path d="M747 218 L747 184" stroke="#d97706" stroke-width="4" marker-end="url(#u7l4-arrow2)"/>
    <rect x="330" y="140" width="280" height="126" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="470" y="177" fill="#0f2038">amortized cost</text>
    <text x="470" y="208" font-size="16" fill="#334155">= actual cost</text>
    <text x="470" y="236" font-size="16" fill="#334155">+ change in potential</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core formula',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\hat{c}_i = c_i + \\Phi(D_i) - \\Phi(D_{i-1})',
          display: true,
          caption: 'The amortized cost of operation i is actual cost plus potential change.'
        },
        {
          type: 'formula',
          latex: '\\sum_{i=1}^{m} \\hat{c}_i = \\sum_{i=1}^{m} c_i + \\Phi(D_m) - \\Phi(D_0) \\ge \\sum_{i=1}^{m} c_i',
          display: true,
          caption: 'The potential terms telescope. Nonnegative final potential makes the amortized sum an upper bound.'
        },
        {
          type: 'heading',
          text: 'How to use the method',
          level: 2
        },
        {
          type: 'code',
          title: 'Potential-method proof checklist',
          language: 'pseudocode',
          code: `POTENTIAL-PROOF(sequence)
    define a state D_i after each operation i
    choose Phi(D_i) with Phi(D_0) = 0 and Phi(D_i) >= 0
    compute c_i for each operation type
    compute DeltaPhi = Phi(D_i) - Phi(D_{i-1})
    bound c_i + DeltaPhi for each operation type
    sum the amortized costs to bound total actual cost`
        },
        {
          type: 'heading',
          text: 'Worked example: binary counter',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'For the binary counter, choose Phi(D) to be the number of 1-bits currently in the counter. Suppose one INCREMENT resets t trailing 1-bits to 0 and then sets one 0-bit to 1. The actual cost is t + 1, while potential changes by 1 - t.'
        },
        {
          type: 'table',
          caption: 'Potential analysis of one binary-counter increment.',
          columns: ['Quantity', 'Value', 'Reason'],
          rows: [
            ['t', 'number of trailing 1-bits', 'These bits reset to 0.'],
            ['Actual cost c_i', 't + 1', 'Flip t ones plus one zero.'],
            ['Potential change', '1 - t', 'Lose t one-bits, gain one one-bit.'],
            ['Amortized cost', '2', '(t + 1) + (1 - t).']
          ]
        },
        {
          type: 'formula',
          latex: '\\hat{c}_i = (t+1) + (1-t) = 2',
          display: true,
          caption: 'Every increment has constant amortized cost under this potential.'
        },
        {
          type: 'heading',
          text: 'Worked example: stack',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'For the MULTIPOP stack, choose Phi(D) to be the number of items currently on the stack. PUSH increases potential by 1. POP and each item removed by MULTIPOP decrease potential by the number of removed items.'
        },
        {
          type: 'table',
          caption: 'Potential analysis for stack operations with Phi = stack size.',
          columns: ['Operation', 'Actual cost', 'Potential change', 'Amortized cost'],
          rows: [
            ['PUSH', '1', '+1', '2'],
            ['POP', '1', '-1', '0'],
            ['MULTIPOP popping p items', 'p', '-p', '0']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Telescoping proof',
          text: 'Summing the amortized costs makes all intermediate potential terms cancel. Because initial potential is zero and final potential is nonnegative, the amortized total is at least the actual total. Thus bounding amortized costs bounds the true sequence cost.'
        },
        {
          type: 'heading',
          text: 'Choosing a good potential',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Potential should measure stored work, not arbitrary size.',
            'Cheap operations that create future expensive work should increase potential.',
            'Expensive operations that clean up stored work should decrease potential.',
            'Potential must remain nonnegative for every reachable state.',
            'A weak potential still gives a correct bound, but possibly not the tight one.'
          ]
        },
        { type: 'interactive', artifact: 'potential-method' },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Write the formula, state Phi(D_0) = 0 and Phi(D_i) >= 0, then show the telescoping sum. After that, analyze each operation by actual cost plus change in potential.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u7l4-E1',
              source: 'Formula',
              question: 'If an operation has actual cost 5 and potential change -3, what is its amortized cost?',
              solution: 'The amortized cost is 5 + (-3) = 2.'
            },
            {
              id: 'u7l4-E2',
              source: 'Counter',
              question: 'For a binary counter, if an increment resets t = 3 trailing ones and sets one zero to one, what is the potential change when Phi is the number of one-bits?',
              solution: 'The potential change is 1 - t = 1 - 3 = -2.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u7l4-M1',
              source: 'Stack potential',
              question: 'Using Phi = stack size, compute the amortized cost of MULTIPOP(S, k) when it actually pops p items.',
              solution: 'The actual cost is p and the potential change is -p, so the amortized cost is p - p = 0.'
            },
            {
              id: 'u7l4-M2',
              source: 'Validity',
              question: 'Why is a potential function that can become negative dangerous?',
              solution: 'If final potential can be negative, the telescoping equation may make the amortized total smaller than the actual total. Then the amortized charges no longer necessarily upper-bound real cost.'
            }
          ]
        }
      ],
      summary: 'Choose Phi(D), then ĉ_i = c_i + Phi(D_i) - Phi(D_{i-1}).',
      content: teachingArc({
        bigIdea: 'pre-pay future work via a potential function whose changes track real cost.',
        problem: 'we want a single bookkeeping device that proves amortised bounds for many algorithms.',
        intuition: 'Phi is "money in the bank"; expensive ops withdraw, cheap ones deposit.',
        formal: 'amortised cost ĉ_i = c_i + Phi(D_i) - Phi(D_{i-1}); Phi(D_0) = 0; Phi(D_i) >= 0.',
        algorithm: 'design Phi to make ĉ_i bounded; then sum ĉ_i to get amortised total.',
        worked: 'binary counter: Phi(D) = number of 1-bits; INCREMENT costs ĉ_i = (1 + flip count) + (1 - flip count) = 2.',
        correctness: 'sum_i ĉ_i = sum_i c_i + Phi(D_n) - Phi(D_0) >= sum_i c_i.',
        complexity: 'amortised costs are tight when Phi is chosen well.',
        trace: 'apply Phi = number-of-ones to the counter and verify ĉ_i = 2.',
        takeaways: 'the Fibonacci-heap chapter is one big potential-method exercise.',
        practice: 'design Phi for the stack and re-derive ĉ = O(1).'
      }),
      practice: [
        mcq('algods-u7-l4-q1', 'In the potential method, Phi(D_0) is required to be:',
          ['Zero.', 'Maximum.', 'A constant >= 0.', 'Any real number.'],
          0, 'Phi(D_0) is set to 0 by convention.')
      ]
    }
  ]
};

const u8 = {
  id: 'algods-u8',
  title: 'Fibonacci Heaps',
  summary: 'A potential-method tour de force; supports DECREASE-KEY in O(1) amortised.',
  lessons: [
    {
      title: 'Structure and potential',
      durationMinutes: 35,
      type: 'video',
      summary: 'Forest of trees, marked nodes, Phi = t(H) + 2 m(H).',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A Fibonacci heap is a lazy mergeable heap. Like a binomial heap, it is a forest of min-heap-ordered trees. Unlike a binomial heap, it does not immediately force one tree per degree after every operation. It lets the root list grow, records child losses with mark bits, and pays for delayed cleanup with a potential function.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Fibonacci heap state',
          text: 'A Fibonacci heap H stores a pointer H.min to a minimum root, a root list of min-heap-ordered trees, the total node count n[H], each node degree, parent and child pointers, left and right sibling pointers, and a mark bit for non-root nodes that have lost a child since becoming a child themselves.'
        },
        {
          type: 'diagram',
          title: 'A lazy forest with marks',
          caption: 'The root list may contain many trees. Marked non-root nodes record one lost child; a second loss triggers cascading cuts.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 940 420" role="img" aria-label="Fibonacci heap forest with marked nodes diagram">
  <defs>
    <marker id="u8l1-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="916" height="396" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="470" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Fibonacci heaps keep a loose min-heap-ordered forest</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <line x1="162" y1="120" x2="358" y2="120" stroke="#0f766e" stroke-width="3" marker-end="url(#u8l1-arrow)"/>
    <line x1="442" y1="120" x2="638" y2="120" stroke="#0f766e" stroke-width="3" marker-end="url(#u8l1-arrow)"/>
    <circle cx="120" cy="120" r="27" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="120" y="126" fill="#1e3a8a">7</text>
    <circle cx="400" cy="120" r="30" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="400" y="126" fill="#064e3b">3</text>
    <circle cx="680" cy="120" r="27" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="680" y="126" fill="#92400e">18</text>
    <text x="400" y="78" font-size="14" fill="#0f766e">H.min</text>
    <line x1="400" y1="150" x2="330" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <line x1="400" y1="150" x2="470" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="330" cy="220" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="330" y="226" fill="#334155">12</text>
    <circle cx="470" cy="220" r="24" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="470" y="226" fill="#991b1b">9</text>
    <text x="470" y="264" font-size="13" fill="#dc2626">marked</text>
    <line x1="120" y1="148" x2="120" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="120" cy="220" r="23" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="120" y="226" fill="#334155">24</text>
    <line x1="680" y1="148" x2="620" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <line x1="680" y1="148" x2="740" y2="220" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="620" cy="220" r="23" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="620" y="226" fill="#334155">31</text>
    <circle cx="740" cy="220" r="23" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="740" y="226" fill="#334155">22</text>
    <rect x="176" y="318" width="588" height="50" rx="15" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="470" y="349" font-size="15" fill="#334155">Potential: Phi(H) = number of root trees + 2 times number of marked nodes.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Key invariants',
          level: 2
        },
        {
          type: 'table',
          caption: 'What a Fibonacci heap guarantees immediately and what it delays.',
          columns: ['Feature', 'Invariant', 'Why it matters'],
          rows: [
            ['Heap order', 'Every child key is at least its parent key.', 'The minimum of every tree is at its root.'],
            ['Root list', 'All tree roots are in a doubly linked list.', 'INSERT and UNION can splice lists in O(1) actual time.'],
            ['Minimum pointer', 'H.min points to a smallest root.', 'MINIMUM is O(1).'],
            ['Degree field', 'degree[x] counts children of x.', 'CONSOLIDATE links equal-degree roots after EXTRACT-MIN.'],
            ['Mark bit', 'A non-root node is marked after losing one child.', 'A second child loss causes a cut, keeping degrees logarithmic.']
          ]
        },
        {
          type: 'formula',
          latex: '\\Phi(H) = t(H) + 2m(H)',
          display: true,
          caption: 'CLRS potential: t(H) is the number of root-list trees and m(H) is the number of marked nodes.'
        },
        {
          type: 'heading',
          text: 'Why the potential is shaped this way',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The t(H) term pays for future consolidation: many roots mean EXTRACT-MIN will have many roots to inspect and link. The 2m(H) term pays for cascading cuts: a marked node has already lost one child, so if it loses another, it may be cut and trigger a chain of cuts upward.'
        },
        {
          type: 'table',
          caption: 'Potential changes you will use repeatedly.',
          columns: ['Event', 'Change in t(H)', 'Change in m(H)', 'Interpretation'],
          rows: [
            ['Insert a new singleton root', '+1', '0', 'Potential deposits one unit for future consolidation.'],
            ['Link one root under another', '-1', 'usually 0', 'Potential drops and helps pay for the link.'],
            ['Mark an unmarked non-root', '0', '+1', 'Potential stores two units for a possible future cut.'],
            ['Cut a marked node to the root list', '+1', '-1', 'Potential drops by one overall, helping pay for the cut.']
          ]
        },
        {
          type: 'heading',
          text: 'Operation costs preview',
          level: 2
        },
        {
          type: 'table',
          caption: 'Fibonacci heap amortized costs.',
          columns: ['Operation', 'Amortized cost', 'Source of the bound'],
          rows: [
            ['MAKE-HEAP', 'Theta(1)', 'Create empty fields.'],
            ['INSERT', 'Theta(1)', 'Splice one root; potential increases by 1.'],
            ['MINIMUM', 'Theta(1)', 'Return H.min.'],
            ['UNION', 'Theta(1)', 'Concatenate two root lists.'],
            ['EXTRACT-MIN', 'O(log n)', 'Promote children and consolidate roots.'],
            ['DECREASE-KEY', 'Theta(1)', 'Potential pays for cascading cuts.'],
            ['DELETE', 'O(log n)', 'DECREASE-KEY to negative infinity, then EXTRACT-MIN.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness intuition',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why the minimum is a root',
          text: 'Every tree is min-heap ordered, so each tree minimum is at its root. H.min is maintained as the smallest root, so it is the smallest key in the whole forest.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why laziness is still safe',
          text: 'Fibonacci heaps postpone degree consolidation, but they never postpone heap order. Operations may leave many roots, yet each root is still a tree minimum and H.min still identifies the global minimum.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Memorize Phi(H) = t(H) + 2m(H). The roots pay for EXTRACT-MIN consolidation; marked nodes pay for cascading cuts. Fibonacci heaps are lazy about structure, not about min-heap order.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u8l1-E1',
              source: 'Potential',
              question: 'A Fibonacci heap has 5 root-list trees and 3 marked nodes. What is Phi(H)?',
              solution: 'Phi(H) = t(H) + 2m(H) = 5 + 2 * 3 = 11.'
            },
            {
              id: 'u8l1-E2',
              source: 'Minimum',
              question: 'Why can MINIMUM return H.min in O(1) time?',
              solution: 'Every tree is min-heap ordered, so the global minimum is one of the roots. The heap explicitly maintains H.min as the smallest root.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u8l1-M1',
              source: 'Potential change',
              question: 'If a marked non-root is cut and moved to the root list, how does Phi = t + 2m change?',
              solution: 'The number of roots increases by 1 and the number of marked nodes decreases by 1 when the cut node is unmarked. Thus Delta Phi = +1 + 2(-1) = -1.'
            },
            {
              id: 'u8l1-M2',
              source: 'Comparison',
              question: 'What structural rule do binomial heaps maintain eagerly that Fibonacci heaps postpone?',
              solution: 'Binomial heaps maintain at most one root of each degree after UNION. Fibonacci heaps allow many roots of the same degree and consolidate them later during EXTRACT-MIN.'
            }
          ]
        }
      ],
      content: teachingArc({
        bigIdea: 'lazy operations + a clever potential give DECREASE-KEY in O(1) amortised.',
        problem: 'binary and binomial heaps charge O(log n) amortised for DECREASE-KEY; we want better.',
        intuition: 'leave work undone; pay for it later when EXTRACT-MIN consolidates.',
        formal: 'forest of min-heap-ordered trees in a doubly-linked root list; mark bits track "lost a child".',
        algorithm: 'data layout: parent, child, sibling, mark, degree.',
        worked: 'sketch a Fibonacci heap with 8 nodes after a few operations.',
        correctness: 'the F-heap invariants are looser than binomial heap invariants.',
        complexity: 'all operations O(1) amortised except EXTRACT-MIN and DELETE which are O(log n) amortised.',
        trace: 'track Phi after a sequence of inserts.',
        takeaways: 'the potential function is what makes the analysis work.',
        practice: 'compute Phi for a 10-node F-heap with 4 trees and 2 marked nodes.'
      }),
      practice: [
        mcq('algods-u8-l1-q1', 'The Fibonacci heap potential function is:',
          ['Phi = t(H)', 'Phi = m(H)', 'Phi = t(H) + 2 m(H)', 'Phi = 2 t(H) + m(H)'],
          2, 'Standard CLRS: t (number of trees) plus twice the number of marked nodes.')
      ]
    },
    {
      title: 'INSERT and UNION',
      durationMinutes: 20,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'INSERT and UNION are where Fibonacci heaps look almost too good to be true. They do not consolidate roots. INSERT creates a one-node tree and splices it into the root list. UNION concatenates two root lists. The delayed work is paid later by EXTRACT-MIN.'
        },
        {
          type: 'diagram',
          title: 'Insert is a root-list splice',
          caption: 'The new node becomes a degree-0 unmarked root. H.min is updated only if the new key is smaller.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 360" role="img" aria-label="Fibonacci heap insert root list splice diagram">
  <defs>
    <marker id="u8l2-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="896" height="336" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="460" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Fibonacci heap INSERT does not consolidate</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="230" y="92" font-size="15" fill="#475569">Before</text>
    <circle cx="110" cy="145" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="110" y="151" fill="#1e3a8a">8</text>
    <circle cx="230" cy="145" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="230" y="151" fill="#064e3b">4</text>
    <circle cx="350" cy="145" r="26" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="350" y="151" fill="#92400e">17</text>
    <line x1="136" y1="145" x2="202" y2="145" stroke="#0f766e" stroke-width="3" marker-end="url(#u8l2-arrow)"/>
    <line x1="258" y1="145" x2="322" y2="145" stroke="#0f766e" stroke-width="3" marker-end="url(#u8l2-arrow)"/>
    <text x="230" y="195" font-size="14" fill="#0f766e">H.min = 4</text>
    <line x1="430" y1="145" x2="512" y2="145" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l2-arrow)"/>
    <text x="471" y="128" font-size="14" fill="#0f766e">insert 2</text>
    <text x="690" y="92" font-size="15" fill="#475569">After</text>
    <circle cx="550" cy="145" r="26" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="550" y="151" fill="#1e3a8a">8</text>
    <circle cx="650" cy="145" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="650" y="151" fill="#064e3b">4</text>
    <circle cx="750" cy="145" r="28" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="750" y="151" fill="#991b1b">2</text>
    <circle cx="850" cy="145" r="26" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="850" y="151" fill="#92400e">17</text>
    <line x1="576" y1="145" x2="622" y2="145" stroke="#0f766e" stroke-width="3" marker-end="url(#u8l2-arrow)"/>
    <line x1="678" y1="145" x2="722" y2="145" stroke="#0f766e" stroke-width="3" marker-end="url(#u8l2-arrow)"/>
    <line x1="778" y1="145" x2="822" y2="145" stroke="#0f766e" stroke-width="3" marker-end="url(#u8l2-arrow)"/>
    <text x="750" y="195" font-size="14" fill="#dc2626">H.min = 2</text>
    <rect x="200" y="255" width="520" height="46" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="460" y="284" font-size="15" fill="#334155">No linking happens here; potential increases because the root count increases.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'MAKE-FIB-HEAP',
          language: 'pseudocode',
          code: `MAKE-FIB-HEAP()
    H.min = NIL
    H.n = 0
    return H`
        },
        {
          type: 'code',
          title: 'FIB-HEAP-INSERT',
          language: 'pseudocode',
          code: `FIB-HEAP-INSERT(H, x)
    x.degree = 0
    x.parent = NIL
    x.child = NIL
    x.mark = false
    add x to the root list of H
    if H.min == NIL or x.key < H.min.key
        H.min = x
    H.n = H.n + 1`
        },
        {
          type: 'code',
          title: 'FIB-HEAP-UNION',
          language: 'pseudocode',
          code: `FIB-HEAP-UNION(H1, H2)
    H = MAKE-FIB-HEAP()
    H.min = H1.min
    concatenate the root list of H2 with the root list of H
    if H1.min == NIL or (H2.min != NIL and H2.min.key < H1.min.key)
        H.min = H2.min
    H.n = H1.n + H2.n
    return H`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'No eager linking',
          text: 'In a binomial heap, INSERT reduces to UNION and may trigger O(log n) linking. In a Fibonacci heap, INSERT and UNION merely modify root lists. Consolidation is delayed until EXTRACT-MIN.'
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Insert keys 8, 4, 17, 2 into an empty Fibonacci heap.',
          columns: ['Operation', 'Root keys after operation', 'H.min', 't(H)', 'm(H)', 'Phi(H)'],
          rows: [
            ['INSERT 8', '8', '8', '1', '0', '1'],
            ['INSERT 4', '8, 4', '4', '2', '0', '2'],
            ['INSERT 17', '8, 4, 17', '4', '3', '0', '3'],
            ['INSERT 2', '8, 4, 17, 2', '2', '4', '0', '4']
          ]
        },
        {
          type: 'heading',
          text: 'Amortized analysis',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\Delta\\Phi_{\\text{INSERT}} = 1',
          display: true,
          caption: 'INSERT adds one unmarked root, so t(H) increases by one and m(H) is unchanged.'
        },
        {
          type: 'table',
          caption: 'Actual cost plus potential change.',
          columns: ['Operation', 'Actual cost', 'Delta Phi', 'Amortized cost'],
          rows: [
            ['MAKE-FIB-HEAP', 'Theta(1)', '0', 'Theta(1)'],
            ['INSERT', 'Theta(1)', '+1', 'Theta(1)'],
            ['MINIMUM', 'Theta(1)', '0', 'Theta(1)'],
            ['UNION', 'Theta(1)', '0', 'Theta(1)']
          ]
        },
        {
          type: 'paragraph',
          text: 'For UNION, the number of roots and marked nodes in the new heap are exactly the sums from the two input heaps, so the potential of the combined heap is the sum of the input potentials. The actual list concatenation is constant time with circular doubly linked root lists.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'INSERT correctness',
          text: 'A singleton node is a min-heap-ordered tree. Adding it to the root list preserves heap order for all existing trees. Updating H.min when needed ensures H.min is still the smallest root.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'UNION correctness',
          text: 'Concatenating root lists preserves every tree unchanged, so all trees remain min-heap ordered. The minimum of the union is the smaller of the two old minimum roots, which the algorithm stores in H.min.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Fibonacci heap INSERT and UNION are O(1) amortized because they avoid consolidation. Every insert adds one root and therefore one unit of potential.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u8l2-E1',
              source: 'Insert potential',
              question: 'If H has t = 6 roots and m = 2 marked nodes, what is Phi after inserting a new key?',
              solution: 'Before insert Phi = 6 + 2 * 2 = 10. Insert adds one unmarked root, so Phi becomes 7 + 2 * 2 = 11.'
            },
            {
              id: 'u8l2-E2',
              source: 'Union minimum',
              question: 'H1.min has key 5 and H2.min has key 9. What is the min pointer after UNION?',
              solution: 'The new H.min points to the old H1.min with key 5.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u8l2-M1',
              source: 'Comparison',
              question: 'Why is Fibonacci-heap INSERT O(1) amortized while binomial-heap INSERT is O(log n) worst case?',
              solution: 'A Fibonacci heap just adds a singleton root and updates H.min. A binomial heap must union the singleton with the existing heap, which may trigger a chain of links across root degrees.'
            },
            {
              id: 'u8l2-M2',
              source: 'Potential',
              question: 'Two heaps have potentials 7 and 4. Assuming UNION only concatenates root lists, what is the potential immediately after UNION?',
              solution: 'It is 11, the sum of the two potentials, because root counts and marked-node counts simply add.'
            }
          ]
        }
      ],
      summary: 'Both O(1) amortised — just splice into the root list.',
      content: teachingArc({
        bigIdea: 'do almost no work; defer to EXTRACT-MIN.',
        problem: 'O(1) per insert and union.',
        intuition: 'create a new tree of degree 0 and add it to the root list.',
        formal: 'INSERT(H, x): make x a single-node tree; concatenate root lists. UNION(H1, H2): concatenate root lists.',
        algorithm: 'see formal.',
        worked: 'insert 10 keys; root list has 10 trees of degree 0.',
        correctness: 'min-heap order preserved trivially.',
        complexity: 'O(1) actual + Phi delta of +1 (per INSERT) => O(1) amortised.',
        trace: 'animate three inserts.',
        takeaways: 'F-heaps trade real work for clever potential.',
        practice: 'compare to binomial-heap INSERT (O(log n)) and explain the difference.'
      }),
      practice: [
        mcq('algods-u8-l2-q1', 'Amortised cost of F-heap INSERT?',
          ['O(1)', 'O(log n)', 'O(n)', 'O(log log n)'],
          0, 'Just splice in; Phi increases by 1.')
      ]
    },
    {
      title: 'EXTRACT-MIN and CONSOLIDATE',
      durationMinutes: 35,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'EXTRACT-MIN is where Fibonacci heaps pay for their laziness. The operation removes the minimum root, promotes all of its children to the root list, and then consolidates roots so that no two remaining roots have the same degree. This is deliberately similar to binomial-heap linking, but it happens only during EXTRACT-MIN.'
        },
        {
          type: 'diagram',
          title: 'Remove min, promote children, consolidate roots',
          caption: 'Children of the removed minimum become roots. CONSOLIDATE repeatedly links equal-degree roots.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Fibonacci heap extract min consolidate diagram">
  <defs>
    <marker id="u8l3-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">EXTRACT-MIN performs the deferred linking work</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="178" y="90" font-size="15" fill="#475569">1. remove H.min</text>
    <circle cx="82" cy="135" r="25" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="82" y="141" fill="#1e3a8a">8</text>
    <circle cx="178" cy="135" r="28" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="178" y="141" fill="#991b1b">3</text>
    <circle cx="284" cy="135" r="25" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="284" y="141" fill="#92400e">15</text>
    <line x1="178" y1="164" x2="130" y2="225" stroke="#94a3b8" stroke-width="2"/>
    <line x1="178" y1="164" x2="226" y2="225" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="130" cy="225" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="130" y="231" fill="#334155">11</text>
    <circle cx="226" cy="225" r="22" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="226" y="231" fill="#334155">19</text>
    <line x1="340" y1="190" x2="438" y2="190" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l3-arrow)"/>
    <text x="389" y="173" font-size="14" fill="#0f766e">promote</text>
    <text x="590" y="90" font-size="15" fill="#475569">2. children join root list</text>
    <circle cx="470" cy="175" r="24" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/><text x="470" y="181" fill="#1e3a8a">8</text>
    <circle cx="550" cy="175" r="24" fill="#ffffff" stroke="#16a34a" stroke-width="3"/><text x="550" y="181" fill="#064e3b">11</text>
    <circle cx="630" cy="175" r="24" fill="#ffffff" stroke="#16a34a" stroke-width="3"/><text x="630" y="181" fill="#064e3b">19</text>
    <circle cx="710" cy="175" r="24" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="710" y="181" fill="#92400e">15</text>
    <text x="590" y="230" font-size="14" fill="#475569">Many roots may now share a degree.</text>
    <line x1="760" y1="190" x2="842" y2="190" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l3-arrow)"/>
    <text x="801" y="173" font-size="14" fill="#0f766e">link</text>
    <text x="852" y="278" font-size="15" fill="#475569">3. distinct root degrees</text>
    <circle cx="810" cy="330" r="25" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="810" y="336" fill="#064e3b">8</text>
    <circle cx="890" cy="330" r="25" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="890" y="336" fill="#92400e">15</text>
    <line x1="810" y1="356" x2="810" y2="386" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="810" cy="394" r="16" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="810" y="399" font-size="12" fill="#334155">11</text>
    <rect x="270" y="306" width="390" height="44" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="465" y="334" font-size="15" fill="#334155">The smaller-key root stays above the larger-key root.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'FIB-HEAP-EXTRACT-MIN',
          language: 'pseudocode',
          code: `FIB-HEAP-EXTRACT-MIN(H)
    z = H.min
    if z != NIL
        for each child x of z
            add x to the root list of H
            x.parent = NIL
        remove z from the root list of H
        if z == z.right
            H.min = NIL
        else
            H.min = z.right
            CONSOLIDATE(H)
        H.n = H.n - 1
    return z`
        },
        {
          type: 'code',
          title: 'CONSOLIDATE',
          language: 'pseudocode',
          code: `CONSOLIDATE(H)
    let A[0..D(H.n)] be a new array filled with NIL
    for each node w in the root list of H
        x = w
        d = x.degree
        while A[d] != NIL
            y = A[d]
            if x.key > y.key
                exchange x with y
            FIB-HEAP-LINK(H, y, x)
            A[d] = NIL
            d = d + 1
        A[d] = x
    H.min = NIL
    for i = 0 to D(H.n)
        if A[i] != NIL
            add A[i] to the root list of H
            if H.min == NIL or A[i].key < H.min.key
                H.min = A[i]`
        },
        {
          type: 'code',
          title: 'FIB-HEAP-LINK',
          language: 'pseudocode',
          code: `FIB-HEAP-LINK(H, y, x)
    remove y from the root list of H
    make y a child of x
    x.degree = x.degree + 1
    y.mark = false`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Snapshot the root list',
          text: 'In implementation, the loop over roots in CONSOLIDATE should iterate over the roots that exist at the start of consolidation. The root list is being modified by links, so production code often first collects the roots into a temporary list.'
        },
        {
          type: 'heading',
          text: 'Worked consolidation trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Consolidating root degrees 0, 0, 1, 1, 2 with root keys shown.',
          columns: ['Step', 'Array conflict', 'Action', 'Resulting root'],
          rows: [
            ['1', 'A[0] already holds key 8 when key 5 arrives', 'Link degree-0 roots; 5 stays root', 'one degree-1 tree rooted at 5'],
            ['2', 'A[1] already holds key 12', 'Link degree-1 roots; 5 stays root', 'one degree-2 tree rooted at 5'],
            ['3', 'A[1] empty for key 7', 'Store key 7 in A[1]', 'degree-1 root remains'],
            ['4', 'A[2] already holds key 5 when key 3 arrives', 'Link degree-2 roots; 3 stays root', 'one degree-3 tree rooted at 3'],
            ['Done', 'No two occupied A entries have same index', 'Rebuild root list from A', 'root degrees are distinct']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why EXTRACT-MIN removes the right node',
          text: 'Before extraction, H.min is the smallest root and therefore the smallest node in the heap. Promoting its children cannot reveal a smaller key, because each child key is at least z.key. Thus returning z is correct.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'CONSOLIDATE invariant',
          text: 'The array A has at most one root of each degree among the roots already processed. When a second root of degree d appears, the smaller-key root becomes the parent and the result has degree d+1; the algorithm repeats until it reaches an empty array slot.'
        },
        {
          type: 'heading',
          text: 'Amortized analysis',
          level: 2
        },
        {
          type: 'table',
          caption: 'Cost components for EXTRACT-MIN.',
          columns: ['Component', 'Actual contribution', 'Potential effect'],
          rows: [
            ['Promote children of z', 'O(degree[z])', 'Adds roots, but z was a root removed.'],
            ['Scan roots during CONSOLIDATE', 'O(t(H) + D(n))', 'Each link reduces t(H) by 1.'],
            ['Rebuild root list and min pointer', 'O(D(n))', 'After consolidation, at most D(n) + 1 roots remain.'],
            ['Overall amortized', 'O(D(n)) = O(log n)', 'The drop in root-list potential pays for the old many-root list.']
          ]
        },
        {
          type: 'formula',
          latex: 'D(n) = O(\\lg n)',
          display: true,
          caption: 'The maximum degree bound comes from the Fibonacci-number subtree-size argument introduced later.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'EXTRACT-MIN is the expensive Fibonacci-heap operation. Children of the removed minimum become roots, then CONSOLIDATE links equal-degree roots using an array indexed by degree.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u8l3-E1',
              source: 'Link direction',
              question: 'CONSOLIDATE finds two degree-3 roots with keys 14 and 6. Which root becomes the parent?',
              solution: 'The root with key 6 becomes the parent, because Fibonacci heaps preserve min-heap order.'
            },
            {
              id: 'u8l3-E2',
              source: 'Promotion',
              question: 'What happens to the children of the extracted minimum root?',
              solution: 'They are added to the root list and their parent pointers are set to NIL.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u8l3-M1',
              source: 'Degree array',
              question: 'Why does CONSOLIDATE use an array indexed by degree?',
              solution: 'The array detects when two roots have the same degree. A conflict at A[d] means two degree-d roots must be linked, producing a degree-(d+1) root that may conflict again.'
            },
            {
              id: 'u8l3-M2',
              source: 'Potential',
              question: 'Why can an EXTRACT-MIN that starts with many roots still have O(log n) amortized cost?',
              solution: 'Many roots mean high potential t(H). CONSOLIDATE links roots, reducing t(H); that potential drop pays for scanning and linking the large old root list, leaving only O(D(n)) roots.'
            }
          ]
        }
      ],
      summary: 'The expensive op; CONSOLIDATE pairs trees of equal degree.',
      content: teachingArc({
        bigIdea: 'remove min, promote its children, then consolidate equal-degree trees.',
        problem: 'all the deferred work happens here.',
        intuition: 'we pay for many cheap inserts in one go.',
        formal: 'EXTRACT-MIN: remove min root; add its children to root list; CONSOLIDATE links trees of equal degree.',
        algorithm: 'CONSOLIDATE uses a degree-indexed array A[d]; if A[d] is occupied, link the two trees and try A[d+1].',
        worked: 'extract min from an F-heap with 4 trees and observe consolidation.',
        correctness: 'after consolidation, root list has all distinct degrees.',
        complexity: 'O(log n) amortised; real work bounded by D(n) = O(log n).',
        trace: 'animate CONSOLIDATE on a small heap.',
        takeaways: 'CONSOLIDATE is the heart of the analysis.',
        practice: 'consolidate a 6-tree root list with degrees {0, 0, 1, 1, 2, 3}.'
      }),
      practice: [
        mcq('algods-u8-l3-q1', 'Amortised cost of EXTRACT-MIN in an F-heap?',
          ['O(1)', 'O(log n)', 'O(n)', 'O(sqrt n)'],
          1, 'CONSOLIDATE costs O(log n) amortised; real cost is paid by the potential drop.')
      ]
    },
    {
      title: 'DECREASE-KEY, CUT, CASCADING-CUT',
      durationMinutes: 30,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'DECREASE-KEY is the reason Fibonacci heaps are famous. If lowering a key violates heap order, the node is cut from its parent and moved to the root list. If its parent had already lost a child before, the parent is cut too, and the process cascades upward. The mark bit is the memory of one tolerated child loss.'
        },
        {
          type: 'diagram',
          title: 'First child loss marks; second child loss cuts',
          caption: 'An unmarked parent that loses a child becomes marked. A marked parent that loses another child is cut and moved to the root list.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" role="img" aria-label="Fibonacci heap cascading cut diagram">
  <defs>
    <marker id="u8l4-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="396" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Cascading cuts keep child loss under control</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="190" y="90" font-size="15" fill="#475569">Heap-order violation</text>
    <circle cx="190" cy="130" r="27" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="190" y="136" fill="#1e3a8a">10</text>
    <line x1="190" y1="158" x2="190" y2="226" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="190" cy="250" r="27" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="190" y="256" fill="#991b1b">4</text>
    <text x="190" y="292" font-size="13" fill="#dc2626">decreased node</text>
    <line x1="260" y1="205" x2="386" y2="205" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l4-arrow)"/>
    <text x="323" y="188" font-size="14" fill="#0f766e">CUT</text>
    <text x="520" y="90" font-size="15" fill="#475569">Cut node joins roots</text>
    <circle cx="470" cy="150" r="27" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="470" y="156" fill="#1e3a8a">10</text>
    <circle cx="570" cy="150" r="27" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="570" y="156" fill="#991b1b">4</text>
    <text x="470" y="196" font-size="13" fill="#475569">parent y</text>
    <text x="570" y="196" font-size="13" fill="#dc2626">new root</text>
    <rect x="390" y="236" width="260" height="62" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="520" y="262" font-size="14" fill="#334155">If y was unmarked: mark y and stop.</text>
    <text x="520" y="284" font-size="14" fill="#334155">If y was marked: cut y too.</text>
    <line x1="668" y1="205" x2="790" y2="205" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l4-arrow)"/>
    <text x="729" y="188" font-size="14" fill="#0f766e">maybe cascade</text>
    <text x="840" y="90" font-size="15" fill="#475569">Cascading cut</text>
    <circle cx="840" cy="150" r="27" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="840" y="156" fill="#991b1b">10</text>
    <text x="840" y="196" font-size="13" fill="#dc2626">marked parent becomes root</text>
    <rect x="690" y="310" width="300" height="48" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="840" y="340" font-size="15" fill="#334155">Roots are never marked after cuts.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'FIB-HEAP-DECREASE-KEY',
          language: 'pseudocode',
          code: `FIB-HEAP-DECREASE-KEY(H, x, k)
    if k > x.key
        error "new key is greater than current key"
    x.key = k
    y = x.parent
    if y != NIL and x.key < y.key
        CUT(H, x, y)
        CASCADING-CUT(H, y)
    if x.key < H.min.key
        H.min = x`
        },
        {
          type: 'code',
          title: 'CUT',
          language: 'pseudocode',
          code: `CUT(H, x, y)
    remove x from the child list of y
    y.degree = y.degree - 1
    add x to the root list of H
    x.parent = NIL
    x.mark = false`
        },
        {
          type: 'code',
          title: 'CASCADING-CUT',
          language: 'pseudocode',
          code: `CASCADING-CUT(H, y)
    z = y.parent
    if z != NIL
        if y.mark == false
            y.mark = true
        else
            CUT(H, y, z)
            CASCADING-CUT(H, z)`
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Mark-bit meaning',
          text: 'A non-root node is unmarked when it first becomes a child. If it later loses one child, it becomes marked. If it loses another child while marked, it is cut from its parent. Roots are kept unmarked.'
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Decrease a node x from key 20 to key 4 below parent y with key 10.',
          columns: ['Step', 'Condition', 'Action', 'Potential effect'],
          rows: [
            ['Lower key', '4 < 10 violates heap order', 'CUT x from y and add x to root list', 't(H) increases by 1; x becomes unmarked.'],
            ['Check y', 'If y was unmarked and y is not a root', 'Set y.mark = true and stop', 'm(H) increases by 1.'],
            ['Check y', 'If y was already marked', 'CUT y from its parent z', 't(H) increases; m(H) decreases because y is unmarked.'],
            ['Continue upward', 'If z was marked too', 'Repeat the cut', 'Stored mark potential pays for the chain.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Heap order after DECREASE-KEY',
          text: 'After decreasing x.key, the only possible heap-order violation is between x and its parent y. CUT removes that edge and makes x a root. All other parent-child edges are unchanged, and the root list has no parent edge above x, so heap order is restored.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why cascading cuts are structural',
          text: 'A node is allowed to lose one child without being cut. Losing a second child would weaken the subtree-size lower bound used to prove D(n) = O(log n), so the marked node is cut. This preserves the degree bound needed by CONSOLIDATE.'
        },
        {
          type: 'heading',
          text: 'Amortized analysis',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'If a decrease causes c cuts, the actual work is O(c). The root count increases by c, but most cut nodes were marked and become unmarked, so marked-node potential drops. The potential drop cancels the long cut chain.'
        },
        {
          type: 'formula',
          latex: '\\Delta \\Phi \\le 4 - c',
          display: true,
          caption: 'For c cuts in the standard CLRS analysis, enough mark potential is released to pay for all but constant work.'
        },
        {
          type: 'formula',
          latex: '\\hat{c} = O(c) + \\Delta\\Phi = O(1)',
          display: true,
          caption: 'This is the core reason Fibonacci-heap DECREASE-KEY is O(1) amortized.'
        },
        {
          type: 'table',
          caption: 'Actual versus amortized behavior.',
          columns: ['Operation', 'Worst-case actual time', 'Amortized time', 'Why'],
          rows: [
            ['DECREASE-KEY without a cut', 'Theta(1)', 'Theta(1)', 'Only lower key and maybe update H.min.'],
            ['DECREASE-KEY with one cut', 'Theta(1)', 'Theta(1)', 'Move x to root list and mark/check parent.'],
            ['DECREASE-KEY with many cascading cuts', 'Theta(c)', 'Theta(1)', 'Marked-node potential pays for the cut chain.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'DECREASE-KEY cuts x only if heap order is violated. CASCADING-CUT marks an unmarked parent on first child loss, but cuts an already marked parent and continues upward.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u8l4-E1',
              source: 'Mark bit',
              question: 'A non-root node y is unmarked and loses one child. What does CASCADING-CUT do to y?',
              solution: 'It marks y and stops, unless y is a root. The first child loss is tolerated.'
            },
            {
              id: 'u8l4-E2',
              source: 'Cut result',
              question: 'After CUT(H, x, y), what are x.parent and x.mark?',
              solution: 'x.parent is NIL because x is now a root, and x.mark is false.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u8l4-M1',
              source: 'Cascading trigger',
              question: 'A marked non-root y loses a child x due to DECREASE-KEY. What happens next?',
              solution: 'x is cut to the root list. Since y was already marked, y is also cut from its parent and moved to the root list, then CASCADING-CUT continues with y\'s former parent.'
            },
            {
              id: 'u8l4-M2',
              source: 'Amortized intuition',
              question: 'Why can a DECREASE-KEY with many actual cuts still be O(1) amortized?',
              solution: 'The long chain consists mostly of marked nodes. Cutting marked nodes unmarks them and releases the 2 units of mark potential stored on each, which pays for the actual cut work.'
            }
          ]
        }
      ],
      summary: 'Decrease, cut subtree, cascade if the parent was already marked.',
      content: teachingArc({
        bigIdea: 'limit how many children each node can lose without being cut from its parent.',
        problem: 'O(1) amortised DECREASE-KEY without sacrificing EXTRACT-MIN bound.',
        intuition: 'mark on first child loss; cut on second.',
        formal: 'DECREASE-KEY: lower the key; if heap order violated, CUT to root list and CASCADING-CUT the parent.',
        algorithm: 'see formal.',
        worked: 'decrease a deep node\'s key; observe CUT then CASCADING-CUT chain of length 2.',
        correctness: 'mark-and-cut bounds tree degrees logarithmically.',
        complexity: 'O(1) amortised; potential pays for cuts.',
        trace: 'animate decrease and cascading cut.',
        takeaways: 'this is what makes Dijkstra and Prim run in O(m + n log n) on F-heaps.',
        practice: 'run DECREASE-KEY on a node 4 levels deep; count cuts.'
      }),
      practice: [
        mcq('algods-u8-l4-q1', 'CASCADING-CUT triggers when a parent\'s mark bit is:',
          ['Already set.', 'Cleared.', 'NIL.', 'The root.'],
          0, 'Marked parents are cut and their parent is checked next.')
      ]
    },
    {
      title: 'DELETE and why D(n) = O(log n)',
      durationMinutes: 30,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Fibonacci-heap DELETE is not a new primitive. CLRS deletes a node x by first decreasing its key to a value smaller than every legal key, then extracting the minimum. The deeper question is why this costs only O(log n) amortized: EXTRACT-MIN is controlled by the maximum degree D(n), and D(n) is logarithmic because every degree-k node must contain a large Fibonacci-sized subtree.'
        },
        {
          type: 'diagram',
          title: 'DELETE reduces to DECREASE-KEY plus EXTRACT-MIN',
          caption: 'Lower x below every other key, let DECREASE-KEY repair heap order, then EXTRACT-MIN removes x.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 420" role="img" aria-label="Fibonacci heap delete reduction and degree bound diagram">
  <defs>
    <marker id="u8l5-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="396" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">DELETE is a reduction; D(n) is a structural theorem</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="180" y="90" font-size="15" fill="#475569">1. Choose node x</text>
    <circle cx="180" cy="142" r="27" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="180" y="148" fill="#1e3a8a">26</text>
    <line x1="180" y1="169" x2="180" y2="230" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="180" cy="254" r="23" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="180" y="260" fill="#334155">41</text>
    <line x1="235" y1="190" x2="335" y2="190" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l5-arrow)"/>
    <text x="285" y="172" font-size="14" fill="#0f766e">decrease to</text>
    <text x="285" y="210" font-size="14" fill="#0f766e">negative infinity</text>
    <text x="430" y="90" font-size="15" fill="#475569">2. x becomes the minimum root</text>
    <circle cx="430" cy="142" r="29" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="430" y="148" fill="#991b1b">-inf</text>
    <circle cx="352" cy="142" r="23" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="352" y="148" fill="#064e3b">7</text>
    <circle cx="508" cy="142" r="23" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="508" y="148" fill="#92400e">18</text>
    <line x1="545" y1="190" x2="645" y2="190" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l5-arrow)"/>
    <text x="595" y="172" font-size="14" fill="#0f766e">extract min</text>
    <text x="740" y="90" font-size="15" fill="#475569">3. x is removed</text>
    <circle cx="700" cy="142" r="23" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="700" y="148" fill="#064e3b">7</text>
    <circle cx="790" cy="142" r="23" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><text x="790" y="148" fill="#92400e">18</text>
    <rect x="102" y="310" width="756" height="52" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="342" font-size="15" fill="#334155">The O(log n) amortized cost comes from EXTRACT-MIN and the logarithmic degree bound.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'FIB-HEAP-DELETE',
          language: 'pseudocode',
          code: `FIB-HEAP-DELETE(H, x)
    FIB-HEAP-DECREASE-KEY(H, x, -infinity)
    FIB-HEAP-EXTRACT-MIN(H)`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'What negative infinity means',
          text: 'The value negative infinity is a conceptual sentinel smaller than every ordinary key. After the decrease, x must be selected by EXTRACT-MIN. Implementations often avoid storing an actual sentinel by deleting by node identity, but the CLRS reduction is the same.'
        },
        {
          type: 'heading',
          text: 'Worked DELETE trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Delete node x with key 26 from a Fibonacci heap.',
          columns: ['Step', 'Action', 'Invariant after the step', 'Cost view'],
          rows: [
            ['1', 'Call DECREASE-KEY(H, x, negative infinity).', 'x.key is smaller than every other key.', 'Actual cost may include cascading cuts; amortized cost is O(1).'],
            ['2', 'If heap order is violated, CUT moves x to the root list and CASCADING-CUT repairs ancestors.', 'All parent-child edges again satisfy min-heap order.', 'Mark potential pays for a long cut chain.'],
            ['3', 'Update H.min to x.', 'The global minimum pointer identifies x.', 'Constant actual work after the cuts.'],
            ['4', 'Call EXTRACT-MIN(H).', 'x is removed; its children, if any, become roots and roots are consolidated.', 'O(D(n)) amortized, hence O(log n).']
          ]
        },
        {
          type: 'heading',
          text: 'Why D(n) is logarithmic',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Let D(n) be the largest degree of any node in an n-node Fibonacci heap. The proof is not that CONSOLIDATE artificially caps degrees. Instead, the mark-and-cut rule forces every high-degree node to have many descendants.'
        },
        {
          type: 'formula',
          latex: 'D(n) = \\max_{x \\in H} \\deg(x)',
          display: true,
          caption: 'Maximum node degree in the current heap.'
        },
        {
          type: 'diagram',
          title: 'Child-loss rule behind the Fibonacci lower bound',
          caption: 'Order the children by the time they were linked to x. A child can lose at most one child before it is cut.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Fibonacci heap subtree size lower bound diagram">
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">A degree-k node contains a Fibonacci-sized subtree</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <circle cx="480" cy="110" r="30" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="480" y="116" fill="#1e3a8a">x</text>
    <text x="480" y="72" font-size="14" fill="#475569">degree k</text>
    <line x1="480" y1="140" x2="210" y2="230" stroke="#94a3b8" stroke-width="2"/>
    <line x1="480" y1="140" x2="350" y2="230" stroke="#94a3b8" stroke-width="2"/>
    <line x1="480" y1="140" x2="510" y2="230" stroke="#94a3b8" stroke-width="2"/>
    <line x1="480" y1="140" x2="650" y2="230" stroke="#94a3b8" stroke-width="2"/>
    <line x1="480" y1="140" x2="790" y2="230" stroke="#94a3b8" stroke-width="2"/>
    <circle cx="210" cy="250" r="26" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="210" y="256" fill="#064e3b">y1</text>
    <circle cx="350" cy="250" r="26" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="350" y="256" fill="#064e3b">y2</text>
    <circle cx="510" cy="250" r="26" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="510" y="256" fill="#064e3b">y3</text>
    <circle cx="650" cy="250" r="26" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="650" y="256" fill="#064e3b">...</text>
    <circle cx="790" cy="250" r="26" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/><text x="790" y="256" fill="#064e3b">yk</text>
    <text x="210" y="302" font-size="13" fill="#334155">degree at least 0</text>
    <text x="350" y="302" font-size="13" fill="#334155">degree at least 0</text>
    <text x="510" y="302" font-size="13" fill="#334155">degree at least 1</text>
    <text x="650" y="302" font-size="13" fill="#334155">...</text>
    <text x="790" y="302" font-size="13" fill="#334155">degree at least k - 2</text>
    <rect x="168" y="345" width="624" height="46" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="374" font-size="15" fill="#334155">If a non-root child loses two children, cascading cut removes it from x.</text>
  </g>
</svg>`
        },
        {
          type: 'table',
          caption: 'The CLRS child-degree argument.',
          columns: ['Fact', 'Reason'],
          rows: [
            ['List the children y1, y2, ..., yk in the order they were linked to x.', 'Each link happened during CONSOLIDATE between equal-degree roots.'],
            ['When yi was linked to x, x already had at least i - 1 earlier children.', 'So yi had degree at least i - 1 at the moment of linking.'],
            ['Since then, yi can have lost at most one child while remaining a child of x.', 'On the second child loss, CASCADING-CUT would cut yi from x.'],
            ['Therefore current degree[yi] is at least i - 2 for i >= 2, and at least 0 for i = 1.', 'This creates the Fibonacci recurrence for minimum subtree size.']
          ]
        },
        {
          type: 'formula',
          latex: 's_0 \\ge 1, \\quad s_1 \\ge 2, \\quad s_k \\ge 2 + \\sum_{i=0}^{k-2} s_i \\quad (k \\ge 2)',
          display: true,
          caption: 's_k is the minimum possible size of a subtree rooted at a degree-k node.'
        },
        {
          type: 'formula',
          latex: 's_k \\ge F_{k+2} \\ge \\varphi^k',
          display: true,
          caption: 'With F_0 = 0, F_1 = 1, and golden ratio phi, the subtree size grows exponentially in k.'
        },
        {
          type: 'formula',
          latex: 'n \\ge s_k \\ge \\varphi^k \\quad \\Longrightarrow \\quad k \\le \\log_{\\varphi} n = O(\\lg n)',
          display: true,
          caption: 'Thus D(n), the maximum possible degree, is O(log n).'
        },
        {
          type: 'heading',
          text: 'Actual versus amortized cost',
          level: 2
        },
        {
          type: 'table',
          caption: 'DELETE inherits both the cheap amortized DECREASE-KEY and the logarithmic amortized EXTRACT-MIN.',
          columns: ['Part of DELETE', 'Worst-case actual behavior', 'Amortized behavior'],
          rows: [
            ['DECREASE-KEY to negative infinity', 'Can perform c cascading cuts, so actual cost is O(c).', 'O(1), because mark potential pays for the cuts.'],
            ['EXTRACT-MIN on x', 'Can scan many roots and promote degree[x] children.', 'O(D(n)), because root-list potential pays for old roots.'],
            ['Degree bound', 'Not an operation cost by itself.', 'D(n) = O(log n), from the subtree-size lower bound.'],
            ['DELETE total', 'A single call can do more than logarithmic actual work if the heap has many roots or cuts.', 'O(log n) amortized.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why the right node is removed',
          text: 'After FIB-HEAP-DECREASE-KEY sets x.key to negative infinity, x is smaller than every ordinary key. DECREASE-KEY restores heap order and updates H.min to x. Therefore the following EXTRACT-MIN removes exactly x.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why the degree proof needs mark bits',
          text: 'The child-degree lower bound depends on the statement that a node cannot remain a child after losing two children. Mark bits record the first child loss; cascading cuts enforce removal on the second. Without this rule, a high-degree node could keep many children that had been hollowed out by losses, breaking the Fibonacci lower bound.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'State DELETE as DECREASE-KEY to negative infinity followed by EXTRACT-MIN. For D(n) = O(log n), prove that degree k implies at least F_{k+2} descendants, then solve n >= F_{k+2}.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u8l5-E1',
              source: 'Delete reduction',
              question: 'What two Fibonacci-heap operations implement DELETE(H, x) in CLRS?',
              solution: 'First call FIB-HEAP-DECREASE-KEY(H, x, negative infinity), then call FIB-HEAP-EXTRACT-MIN(H).'
            },
            {
              id: 'u8l5-E2',
              source: 'Degree lower bound',
              question: 'Using F_0 = 0 and F_1 = 1, what lower bound does the theorem give for a node of degree 5?',
              solution: 'A degree-5 node has at least F_{5+2} = F_7 = 13 nodes in its subtree.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u8l5-M1',
              source: 'Child-degree proof',
              question: 'Why is the i-th child yi of x guaranteed to have current degree at least i - 2 for i >= 2?',
              solution: 'When yi was linked to x, x already had at least i - 1 children, and the two roots being linked had equal degree. Thus yi had degree at least i - 1 at linking time. Since yi can lose at most one child while remaining a child of x, its current degree is at least i - 2.'
            },
            {
              id: 'u8l5-M2',
              source: 'Actual versus amortized',
              question: 'Can one DELETE operation take more than O(log n) actual time? Why does this not contradict the O(log n) amortized bound?',
              solution: 'Yes. The DECREASE-KEY part can trigger many actual cuts, and EXTRACT-MIN can scan many roots. The amortized analysis includes the potential drop from marked nodes and root-list consolidation, so the charged cost over any sequence is still O(log n) for DELETE.'
            }
          ]
        }
      ],
      summary: 'DELETE is DECREASE-KEY to -inf followed by EXTRACT-MIN; max degree is logarithmic.',
      content: teachingArc({
        bigIdea: 'a Fibonacci-number lower bound on subtree sizes makes max degree O(log n).',
        problem: 'why is the EXTRACT-MIN amortised bound only O(log n)?',
        intuition: 'a tree of degree k has at least F_{k+2} >= phiᵏ nodes.',
        formal: 'D(n) = O(log_phi n) = O(log n).',
        algorithm: 'no algorithm; structural property.',
        worked: 'compute the lower bound for k = 5: F_7 = 13.',
        correctness: 'induction on the order in which children were attached.',
        complexity: 'logarithmic max degree.',
        trace: 'count node lower bounds for various degrees.',
        takeaways: 'the Fibonacci numbers earn the heap its name.',
        practice: 'verify F_{k+2} >= phiᵏ for k = 0..5.'
      }),
      practice: [
        mcq('algods-u8-l5-q1', 'Why is D(n) = O(log n) for Fibonacci heaps?',
          ['Each tree has degree O(1).', 'A tree of degree k has at least F_{k+2} nodes.', 'F-heaps store keys in sorted order.', 'CONSOLIDATE explicitly limits degrees.'],
          1, 'The Fibonacci lower bound on subtree sizes pins the degree at O(log n).')
      ]
    },
    {
      title: 'Unit 8 review',
      durationMinutes: 20,
      type: 'practice',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Unit 8 is a complete amortized-analysis story. Fibonacci heaps get O(1) amortized INSERT, UNION, and DECREASE-KEY by postponing consolidation and using potential to pay for the postponed work. EXTRACT-MIN and DELETE remain O(log n) amortized because the mark-bit rule keeps every node degree logarithmic.'
        },
        {
          type: 'diagram',
          title: 'How the Fibonacci heap pieces fit together',
          caption: 'Cheap operations add roots or perform cuts; EXTRACT-MIN consolidates; mark bits preserve the degree theorem.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Fibonacci heap unit review concept map">
  <defs>
    <marker id="u8l6-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Fibonacci heaps: lazy structure plus stored potential</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <rect x="70" y="100" width="210" height="78" rx="16" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
    <text x="175" y="130" font-size="16" fill="#1e3a8a">Root-list laziness</text>
    <text x="175" y="154" font-size="13" fill="#1e3a8a">INSERT and UNION splice lists</text>
    <rect x="375" y="100" width="210" height="78" rx="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <text x="480" y="130" font-size="16" fill="#064e3b">Potential</text>
    <text x="480" y="154" font-size="13" fill="#064e3b">Phi = roots + 2 marks</text>
    <rect x="680" y="100" width="210" height="78" rx="16" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="785" y="130" font-size="16" fill="#92400e">CONSOLIDATE</text>
    <text x="785" y="154" font-size="13" fill="#92400e">links equal-degree roots</text>
    <rect x="220" y="265" width="230" height="78" rx="16" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>
    <text x="335" y="294" font-size="16" fill="#991b1b">Mark bits</text>
    <text x="335" y="318" font-size="13" fill="#991b1b">first loss marks, second cuts</text>
    <rect x="535" y="265" width="230" height="78" rx="16" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>
    <text x="650" y="294" font-size="16" fill="#4c1d95">Degree bound</text>
    <text x="650" y="318" font-size="13" fill="#4c1d95">subtree size at least Fibonacci</text>
    <line x1="280" y1="139" x2="375" y2="139" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l6-arrow)"/>
    <line x1="585" y1="139" x2="680" y2="139" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l6-arrow)"/>
    <line x1="785" y1="178" x2="680" y2="265" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l6-arrow)"/>
    <line x1="450" y1="304" x2="535" y2="304" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l6-arrow)"/>
    <line x1="480" y1="178" x2="365" y2="265" stroke="#0f766e" stroke-width="4" marker-end="url(#u8l6-arrow)"/>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Core definitions and formulas',
          level: 2
        },
        {
          type: 'formula',
          latex: '\\Phi(H) = t(H) + 2m(H)',
          display: true,
          caption: 't(H) is the number of root-list trees; m(H) is the number of marked nodes.'
        },
        {
          type: 'formula',
          latex: 'D(n) = O(\\lg n)',
          display: true,
          caption: 'A degree-k node has at least F_{k+2} nodes in its subtree.'
        },
        {
          type: 'table',
          caption: 'Operation summary.',
          columns: ['Operation', 'Main action', 'Amortized cost', 'Most important invariant'],
          rows: [
            ['MAKE-FIB-HEAP', 'Initialize empty heap fields.', 'Theta(1)', 'H.min = NIL and H.n = 0.'],
            ['INSERT', 'Add one unmarked singleton root.', 'Theta(1)', 'H.min is updated if the new key is smaller.'],
            ['UNION', 'Concatenate root lists.', 'Theta(1)', 'All old trees remain heap ordered.'],
            ['MINIMUM', 'Return H.min.', 'Theta(1)', 'The minimum is always a root.'],
            ['EXTRACT-MIN', 'Remove min, promote children, consolidate roots.', 'O(log n)', 'After consolidation, root degrees are distinct.'],
            ['DECREASE-KEY', 'Cut x if heap order is violated; maybe cascade.', 'Theta(1)', 'Marked nodes have lost exactly one child since becoming children.'],
            ['DELETE', 'DECREASE-KEY to negative infinity, then EXTRACT-MIN.', 'O(log n)', 'The decreased node becomes the minimum.']
          ]
        },
        {
          type: 'heading',
          text: 'Worked review trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'One small sequence. The exact root order is irrelevant; the counts are the point.',
          columns: ['Operation', 'Structural effect', 't(H)', 'm(H)', 'Phi(H)'],
          rows: [
            ['INSERT 7', 'Add root 7.', '1', '0', '1'],
            ['INSERT 3', 'Add root 3 and update min.', '2', '0', '2'],
            ['INSERT 18', 'Add root 18.', '3', '0', '3'],
            ['EXTRACT-MIN', 'Remove 3; link the two degree-0 roots.', '1', '0', '1'],
            ['DECREASE-KEY 18 to 2', 'Cut 18 from parent 7 and make it a root.', '2', '0', '2'],
            ['DELETE 7', 'Decrease 7 to negative infinity, then extract it.', '1', '0', '1']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness checklist',
          level: 2
        },
        {
          type: 'table',
          caption: 'Use these invariants when proving operations correct.',
          columns: ['Invariant', 'Where it is used'],
          rows: [
            ['Every tree is min-heap ordered.', 'MINIMUM, EXTRACT-MIN, DECREASE-KEY correctness.'],
            ['H.min points to a smallest root.', 'O(1) MINIMUM and correct extraction.'],
            ['Roots have parent NIL and are unmarked.', 'CUT, UNION, and root-list maintenance.'],
            ['A non-root marked node has lost one child since it became a child.', 'CASCADING-CUT and the degree proof.'],
            ['After CONSOLIDATE, no two roots have the same degree.', 'Bounding the number of roots after EXTRACT-MIN.']
          ]
        },
        {
          type: 'heading',
          text: 'Common pitfalls',
          level: 2
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Actual cost is not amortized cost',
          text: 'A single DECREASE-KEY can perform many actual cuts, and a single EXTRACT-MIN can scan many roots. The unit result is about the charged cost over every operation sequence.'
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'DELETE is not just removing a pointer',
          text: 'You must first make the target node the minimum by decreasing its key below all others. Then EXTRACT-MIN performs the structural cleanup.'
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The degree bound depends on cascading cuts',
          text: 'The Fibonacci-number subtree lower bound is true because nodes cannot keep losing children indefinitely while remaining under the same parent.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Fibonacci heap cost table.',
          columns: ['Operation', 'Worst-case actual time', 'Amortized time'],
          rows: [
            ['INSERT, UNION, MINIMUM', 'Theta(1)', 'Theta(1)'],
            ['DECREASE-KEY', 'Can be Theta(n) actual in a long cascade', 'Theta(1)'],
            ['EXTRACT-MIN', 'Can scan Theta(n) roots actual', 'O(log n)'],
            ['DELETE', 'Can include a long cascade and a large root scan', 'O(log n)'],
            ['Space', 'Theta(n) nodes and pointers', 'Theta(n)']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'If you can state Phi(H), explain mark bits, write DECREASE-KEY/CUT/CASCADING-CUT, and reproduce the F_{k+2} degree proof, you have the core of Unit 8.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u8l6-E1',
              source: 'Potential',
              question: 'A Fibonacci heap has 9 roots and 4 marked nodes. What is Phi(H)?',
              solution: 'Phi(H) = t(H) + 2m(H) = 9 + 2 * 4 = 17.'
            },
            {
              id: 'u8l6-E2',
              source: 'Costs',
              question: 'Which Fibonacci-heap operations have O(log n) amortized cost in this unit?',
              solution: 'EXTRACT-MIN and DELETE have O(log n) amortized cost. INSERT, UNION, MINIMUM, and DECREASE-KEY are O(1) amortized.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u8l6-M1',
              source: 'Invariant repair',
              question: 'After decreasing x.key, why is the only possible heap-order violation between x and its parent?',
              solution: 'Only x.key changes. Since the key decreases, edges from x to its children remain valid because x is now no larger than before. Edges elsewhere are unchanged. Thus only the parent edge can violate heap order.'
            },
            {
              id: 'u8l6-M2',
              source: 'Degree theorem',
              question: 'Explain in two sentences why a node of high degree must have many descendants.',
              solution: 'When the i-th child was linked to the node, that child already had large enough degree because the two linked roots had equal degree. Since a child can lose at most one child before cascading cuts remove it, those child subtrees remain large, giving the Fibonacci lower bound.'
            }
          ]
        }
      ],
      summary: 'Mixed practice on F-heap amortised costs.',
      content: [
        block('Fibonacci heaps are the high point of amortised analysis: you must reason about Phi at every step.'),
        tip('Always state the change in Phi alongside real cost when computing amortised cost.'),
        example('Practice: walk a sequence of INSERT, INSERT, INSERT, DECREASE-KEY, EXTRACT-MIN, and account for amortised costs.')
      ],
      practice: [
        mcq('algods-u8-l6-q1', 'Which operation has different amortised cost in a Fibonacci heap vs a binary heap?',
          ['INSERT', 'EXTRACT-MIN', 'DECREASE-KEY', 'BUILD-HEAP'],
          2, 'F-heap DECREASE-KEY is O(1) amortised vs O(log n) for a binary heap.')
      ]
    }
  ]
};

const u9 = {
  id: 'algods-u9',
  title: 'Union-Find',
  summary: 'Disjoint sets with union-by-rank and path compression; nearly constant amortised time.',
  lessons: [
    {
      title: 'Disjoint sets and forest representation',
      durationMinutes: 25,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The disjoint-set data structure maintains a partition of objects into nonoverlapping sets. The operations are MAKE-SET, FIND-SET, and UNION. In the forest representation, each set is a rooted tree of parent pointers, and the root is the representative returned by FIND-SET.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Disjoint-set abstract data type',
          text: 'MAKE-SET(x) creates a new singleton set containing x. FIND-SET(x) returns the representative of the set containing x. UNION(x, y) replaces the two sets containing x and y by their union; if x and y are already in the same set, the partition is unchanged.'
        },
        {
          type: 'diagram',
          title: 'Parent-pointer forest representation',
          caption: 'Each root points to itself. All nodes in the same tree share the same root representative.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Union find forest representation diagram">
  <defs>
    <marker id="u9l1-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Disjoint sets as rooted forests</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="230" y="90" font-size="15" fill="#475569">Set {a, b, d}; representative a</text>
    <circle cx="230" cy="135" r="27" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="230" y="141" fill="#1e3a8a">a</text>
    <line x1="190" y1="220" x2="220" y2="163" stroke="#64748b" stroke-width="3" marker-end="url(#u9l1-arrow)"/>
    <line x1="270" y1="220" x2="240" y2="163" stroke="#64748b" stroke-width="3" marker-end="url(#u9l1-arrow)"/>
    <circle cx="190" cy="245" r="25" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="190" y="251" fill="#334155">b</text>
    <circle cx="270" cy="245" r="25" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="270" y="251" fill="#334155">d</text>
    <path d="M230 108 C255 80, 285 92, 270 122" fill="none" stroke="#2563eb" stroke-width="3" marker-end="url(#u9l1-arrow)"/>
    <text x="230" y="306" font-size="13" fill="#475569">parent[a] = a</text>
    <text x="560" y="90" font-size="15" fill="#475569">Set {c, e}; representative c</text>
    <circle cx="560" cy="135" r="27" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="560" y="141" fill="#064e3b">c</text>
    <line x1="560" y1="220" x2="560" y2="164" stroke="#64748b" stroke-width="3" marker-end="url(#u9l1-arrow)"/>
    <circle cx="560" cy="245" r="25" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="560" y="251" fill="#334155">e</text>
    <path d="M560 108 C585 80, 615 92, 600 122" fill="none" stroke="#16a34a" stroke-width="3" marker-end="url(#u9l1-arrow)"/>
    <text x="560" y="306" font-size="13" fill="#475569">FIND-SET(e) returns c</text>
    <text x="790" y="90" font-size="15" fill="#475569">Singleton set {f}</text>
    <circle cx="790" cy="135" r="27" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="790" y="141" fill="#92400e">f</text>
    <path d="M790 108 C815 80, 845 92, 830 122" fill="none" stroke="#d97706" stroke-width="3" marker-end="url(#u9l1-arrow)"/>
    <text x="790" y="188" font-size="13" fill="#475569">parent[f] = f</text>
    <rect x="180" y="350" width="600" height="42" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="377" font-size="15" fill="#334155">A set is a tree; a representative is the root, not necessarily the smallest element.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Representation invariant',
          level: 2
        },
        {
          type: 'table',
          caption: 'Fields and meanings.',
          columns: ['Object x', 'Meaning'],
          rows: [
            ['x.p', 'Parent pointer. If x is a root, x.p = x.'],
            ['Root r', 'Representative of exactly one set.'],
            ['Tree containing x', 'All elements in the same disjoint set as x.'],
            ['Forest', 'The current partition of all elements.']
          ]
        },
        {
          type: 'heading',
          text: 'Baseline forest pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'MAKE-SET',
          language: 'pseudocode',
          code: `MAKE-SET(x)
    x.p = x`
        },
        {
          type: 'code',
          title: 'FIND-SET without path compression',
          language: 'pseudocode',
          code: `FIND-SET(x)
    while x != x.p
        x = x.p
    return x`
        },
        {
          type: 'code',
          title: 'Naive UNION',
          language: 'pseudocode',
          code: `UNION(x, y)
    rx = FIND-SET(x)
    ry = FIND-SET(y)
    if rx != ry
        ry.p = rx`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Operation semantics versus implementation choice',
          text: 'UNION(x, y) is defined on arbitrary elements, not just roots. The implementation first finds the two roots. The naive version above attaches one root under the other; the next lesson replaces this arbitrary choice with union by rank.'
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Naive forest operations on a, b, c, d. UNION attaches the second root under the first root.',
          columns: ['Operation', 'Parent pointers that change', 'Sets after operation', 'Representative facts'],
          rows: [
            ['MAKE-SET(a), MAKE-SET(b), MAKE-SET(c), MAKE-SET(d)', 'a.p=a, b.p=b, c.p=c, d.p=d', '{a}, {b}, {c}, {d}', 'Every element is its own representative.'],
            ['UNION(a, b)', 'b.p = a', '{a,b}, {c}, {d}', 'FIND-SET(b) returns a.'],
            ['UNION(c, d)', 'd.p = c', '{a,b}, {c,d}', 'FIND-SET(d) returns c.'],
            ['UNION(b, d)', 'c.p = a', '{a,b,c,d}', 'FIND-SET(d) walks d -> c -> a and returns a.'],
            ['FIND-SET(a)', 'none', '{a,b,c,d}', 'The representative remains a.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'FIND-SET correctness',
          text: 'Parent pointers always lead upward in a rooted tree, and the root points to itself. FIND-SET follows parent pointers until it reaches that self-parent root, so it returns the representative of exactly the tree containing x.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'UNION correctness',
          text: 'UNION first finds the roots rx and ry of the two input sets. If they are equal, x and y are already in the same set. If they differ, making one root point to the other connects exactly those two trees and leaves all other trees unchanged.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Cost of the unoptimized forest.',
          columns: ['Operation', 'Worst-case time', 'Reason'],
          rows: [
            ['MAKE-SET', 'Theta(1)', 'Set one parent pointer.'],
            ['FIND-SET', 'Theta(h)', 'Walk from x to the root of a tree of height h.'],
            ['UNION', 'Theta(h_x + h_y)', 'Run two finds, then change one root parent.'],
            ['Worst-case height', 'Theta(n)', 'Naive unions can build a chain.'],
            ['Space', 'Theta(n)', 'One parent pointer per element.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'The representative is the root of the parent-pointer tree. FIND-SET returns a root; UNION must link roots, not arbitrary interior nodes.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u9l1-E1',
              source: 'Semantics',
              question: 'After MAKE-SET(x), what is x.p and what does FIND-SET(x) return?',
              solution: 'x.p = x, so x is a singleton root and FIND-SET(x) returns x.'
            },
            {
              id: 'u9l1-E2',
              source: 'Representatives',
              question: 'If parent pointers are d.p = c, c.p = a, and a.p = a, what does FIND-SET(d) return?',
              solution: 'It follows d -> c -> a and returns a, the root representative.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u9l1-M1',
              source: 'Naive worst case',
              question: 'Give a sequence of naive UNION operations that can create a chain on elements 1, 2, 3, 4 if each union attaches the first root under the second root.',
              solution: 'UNION(1,2), UNION(2,3), UNION(3,4) can create 1 -> 2 -> 3 -> 4, depending on the chosen naive link direction. Then FIND-SET(1) takes linear time in the chain length.'
            },
            {
              id: 'u9l1-M2',
              source: 'Partition invariant',
              question: 'Why does changing the parent of one root during UNION not accidentally move only part of a set?',
              solution: 'All nodes in that set reach the root through parent pointers. When the root points to the other root, every node in the old tree now reaches the new representative, so the entire tree moves as one set.'
            }
          ]
        }
      ],
      summary: 'MAKE-SET, FIND-SET, UNION operations; trees rooted at the canonical element.',
      content: teachingArc({
        bigIdea: 'represent each set as a tree pointing to its root.',
        problem: 'maintain a partition under merge and "which set is x in?" queries.',
        intuition: 'find the root by walking parent pointers; union joins two roots.',
        formal: 'each element x has parent[x]; root r has parent[r] = r.',
        algorithm: 'MAKE-SET(x): parent[x] = x. FIND-SET(x): walk parents up. UNION(x, y): connect the roots.',
        worked: 'after MAKE-SETs and a UNION, draw the resulting forest.',
        correctness: 'each connected component is one tree.',
        complexity: 'naive: O(n) per operation in the worst case.',
        trace: 'walk a sequence of 5 operations.',
        takeaways: 'this is the unoptimised baseline; chapters 9.4-9.5 fix the cost.',
        practice: 'execute MAKE-SET on five elements then UNION (1, 2) and UNION (3, 4).'
      }),
      practice: [
        mcq('algods-u9-l1-q1', 'In the forest representation, FIND-SET(x) returns:',
          ['The leftmost element of x\'s set.', 'The largest element.', 'The root of x\'s tree.', 'The element x itself.'],
          2, 'The root is the canonical representative.')
      ]
    },
    {
      title: 'Union by rank',
      durationMinutes: 25,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Union by rank is the first balancing rule for disjoint-set forests. Instead of attaching roots arbitrarily, LINK attaches the lower-rank root under the higher-rank root. If the ranks tie, either root may become the parent, and its rank increases by one.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Rank',
          text: 'In union by rank, rank[x] is an upper bound on the height of the subtree rooted at x while x is a root. With no path compression, rank equals the height for roots under the CLRS linking rule. After path compression is added later, ranks are not decreased, so rank remains an upper bound rather than an exact height.'
        },
        {
          type: 'diagram',
          title: 'Attach lower rank under higher rank',
          caption: 'Only equal-rank links increase a rank. Unequal-rank links keep all ranks unchanged.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Union by rank linking diagram">
  <defs>
    <marker id="u9l2-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Union by rank prevents tall naive chains</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="245" y="90" font-size="15" fill="#475569">Unequal ranks</text>
    <circle cx="175" cy="145" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="175" y="151" fill="#1e3a8a">r=3</text>
    <circle cx="315" cy="145" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="315" y="151" fill="#92400e">r=1</text>
    <line x1="315" y1="173" x2="200" y2="153" stroke="#0f766e" stroke-width="4" marker-end="url(#u9l2-arrow)"/>
    <text x="245" y="220" font-size="14" fill="#334155">rank 1 root becomes child of rank 3 root</text>
    <text x="245" y="244" font-size="14" fill="#334155">rank 3 does not change</text>
    <text x="705" y="90" font-size="15" fill="#475569">Equal ranks</text>
    <circle cx="635" cy="145" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="635" y="151" fill="#064e3b">r=2</text>
    <circle cx="775" cy="145" r="28" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="775" y="151" fill="#4c1d95">r=2</text>
    <line x1="635" y1="173" x2="750" y2="153" stroke="#0f766e" stroke-width="4" marker-end="url(#u9l2-arrow)"/>
    <circle cx="705" cy="285" r="32" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="705" y="291" fill="#4c1d95">r=3</text>
    <text x="705" y="346" font-size="14" fill="#334155">tie: choose one root and increment its rank</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'MAKE-SET with rank',
          language: 'pseudocode',
          code: `MAKE-SET(x)
    x.p = x
    x.rank = 0`
        },
        {
          type: 'code',
          title: 'FIND-SET for this lesson',
          language: 'pseudocode',
          code: `FIND-SET(x)
    while x != x.p
        x = x.p
    return x`
        },
        {
          type: 'code',
          title: 'UNION and LINK by rank',
          language: 'pseudocode',
          code: `UNION(x, y)
    LINK(FIND-SET(x), FIND-SET(y))

LINK(x, y)
    if x.rank > y.rank
        y.p = x
    else
        x.p = y
        if x.rank == y.rank
            y.rank = y.rank + 1`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'LINK receives roots',
          text: 'The LINK procedure assumes x and y are roots returned by FIND-SET. Comparing ranks of arbitrary non-root nodes is not the union-by-rank operation.'
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Build one set from eight singleton elements. On ties, the second root becomes the parent, matching the pseudocode above.',
          columns: ['Operation', 'Ranks before linking', 'Parent change', 'New root rank'],
          rows: [
            ['UNION(a, b)', '0 and 0', 'a.p = b', 'rank[b] = 1'],
            ['UNION(c, d)', '0 and 0', 'c.p = d', 'rank[d] = 1'],
            ['UNION(e, f)', '0 and 0', 'e.p = f', 'rank[f] = 1'],
            ['UNION(g, h)', '0 and 0', 'g.p = h', 'rank[h] = 1'],
            ['UNION(a, c)', 'rank[b] = 1 and rank[d] = 1', 'b.p = d', 'rank[d] = 2'],
            ['UNION(e, g)', 'rank[f] = 1 and rank[h] = 1', 'f.p = h', 'rank[h] = 2'],
            ['UNION(a, e)', 'rank[d] = 2 and rank[h] = 2', 'd.p = h', 'rank[h] = 3']
          ]
        },
        {
          type: 'heading',
          text: 'Why rank stays small',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A rank only increases when two roots of equal rank are linked. That means a rank-r root is born by combining two disjoint trees that already had rank r - 1. This doubling fact bounds ranks logarithmically.'
        },
        {
          type: 'formula',
          latex: '\\text{If } x \\text{ is a root of rank } r, \\text{ then its tree has at least } 2^r \\text{ nodes.}',
          display: true,
          caption: 'Rank-size lower bound for union by rank without path compression.'
        },
        {
          type: 'formula',
          latex: '2^r \\le n \\quad \\Longrightarrow \\quad r \\le \\lfloor \\lg n \\rfloor',
          display: true,
          caption: 'Therefore every root rank is at most logarithmic in the number of elements.'
        },
        {
          type: 'heading',
          text: 'Correctness and invariants',
          level: 2
        },
        {
          type: 'table',
          caption: 'What union by rank preserves.',
          columns: ['Invariant', 'Reason it holds'],
          rows: [
            ['Each set is represented by one rooted tree.', 'LINK changes only one root parent pointer.'],
            ['The root is the representative returned by FIND-SET.', 'FIND-SET still follows parent pointers to a self-parent root.'],
            ['Ranks are used only to choose the new parent root.', 'UNION calls LINK on FIND-SET results.'],
            ['A root of rank r has at least 2^r nodes.', 'Ranks rise only after linking equal-rank roots.'],
            ['Rank is an upper bound on height.', 'Unequal-rank links go under taller-rank roots; equal-rank links increase the new root rank.']
          ]
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Rank-size induction',
          text: 'For rank 0, a singleton root has one node. A rank increases from r - 1 to r only when two roots of rank r - 1 are linked, and by induction each tree has at least 2^(r - 1) nodes. The new tree therefore has at least 2^r nodes.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Union by rank without path compression.',
          columns: ['Operation', 'Worst-case time', 'Why'],
          rows: [
            ['MAKE-SET', 'Theta(1)', 'Initialize parent and rank.'],
            ['FIND-SET', 'O(log n)', 'Tree height is at most the root rank, and rank is at most lg n.'],
            ['UNION', 'O(log n)', 'Two FIND-SET calls plus constant-time LINK.'],
            ['LINK on roots', 'Theta(1)', 'Compare two ranks and change one parent pointer.'],
            ['Space', 'Theta(n)', 'One parent pointer and one rank per element.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Attach lower rank under higher rank. Increment rank only on a tie. Rank is a height upper bound; after path compression arrives, it should not be read as the exact current height.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u9l2-E1',
              source: 'Link direction',
              question: 'Root x has rank 4 and root y has rank 2. Under union by rank, which root becomes the parent and do any ranks change?',
              solution: 'x becomes the parent because it has higher rank. No rank changes when the ranks are unequal.'
            },
            {
              id: 'u9l2-E2',
              source: 'Tie case',
              question: 'Two roots both have rank 3. If LINK makes y the parent, what is y.rank after the link?',
              solution: 'y.rank becomes 4 because ranks increase exactly when equal-rank roots are linked.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u9l2-M1',
              source: 'Rank-size bound',
              question: 'What is the minimum number of nodes in a tree whose root has rank 5 under union by rank?',
              solution: 'At least 2^5 = 32 nodes, by the rank-size induction.'
            },
            {
              id: 'u9l2-M2',
              source: 'Rank versus height',
              question: 'Why is it safer to call rank an upper bound on height rather than the exact height?',
              solution: 'With union by rank alone, root rank tracks height under the standard rule. But after path compression is introduced, FIND-SET can shorten paths without decreasing ranks, so ranks may overestimate the actual height.'
            }
          ]
        }
      ],
      summary: 'Always attach the shorter tree under the taller one.',
      content: teachingArc({
        bigIdea: 'a "rank" bounds tree height; smaller-rank tree becomes child.',
        problem: 'naive UNION can grow trees too tall.',
        intuition: 'union the small under the big; the big\'s rank only grows when they tie.',
        formal: 'rank[x] is an upper bound on the tree\'s height; LINK joins by comparing ranks.',
        algorithm: 'LINK(x, y): if rank[x] > rank[y] swap; parent[x] = y; if equal ranks, rank[y]++.',
        worked: 'union sequence on 8 elements; observe rank growth.',
        correctness: 'tree of rank r has at least 2ʳ nodes; height bounded by lg n.',
        complexity: 'O(log n) per operation with rank only.',
        trace: 'track ranks across 6 unions.',
        takeaways: 'rank is an upper bound on height, not exact height (with path compression below).',
        practice: 'show that after k UNIONs, max rank <= log_2 k.'
      }),
      practice: [
        mcq('algods-u9-l2-q1', 'Rank in union-by-rank is:',
          ['Exact height.', 'An upper bound on height.', 'Number of children.', 'Always 0.'],
          1, 'Rank is an upper bound; path compression lowers actual heights without changing rank.')
      ]
    },
    {
      title: 'Path compression',
      durationMinutes: 25,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Path compression is the second major union-find heuristic. A FIND-SET call still walks parent pointers until it reaches the root representative, but on the way back it rewires every visited node to point directly to that root. The partition of elements does not change; only the shape of the trees becomes flatter.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Path compression',
          text: 'During FIND-SET(x), after the root r is found, every node on the original search path from x to r has its parent pointer set to r. The representative returned is still the root of x\'s set.'
        },
        {
          type: 'diagram',
          title: 'One FIND flattens the searched path',
          caption: 'FIND-SET(a) follows a -> b -> c -> d -> r, returns r, then points a, b, c, and d directly at r.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Union find path compression diagram">
  <defs>
    <marker id="u9l3-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
    </marker>
    <marker id="u9l3-green" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Path compression changes tree shape, not set membership</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="250" y="90" font-size="15" fill="#475569">Before FIND-SET(a)</text>
    <circle cx="250" cy="125" r="25" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="250" y="131" fill="#1e3a8a">r</text>
    <circle cx="250" cy="190" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="250" y="196" fill="#334155">d</text>
    <circle cx="250" cy="255" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="250" y="261" fill="#334155">c</text>
    <circle cx="250" cy="320" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="250" y="326" fill="#334155">b</text>
    <circle cx="250" cy="385" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="250" y="391" fill="#334155">a</text>
    <line x1="250" y1="361" x2="250" y2="344" stroke="#64748b" stroke-width="3" marker-end="url(#u9l3-arrow)"/>
    <line x1="250" y1="296" x2="250" y2="279" stroke="#64748b" stroke-width="3" marker-end="url(#u9l3-arrow)"/>
    <line x1="250" y1="231" x2="250" y2="214" stroke="#64748b" stroke-width="3" marker-end="url(#u9l3-arrow)"/>
    <line x1="250" y1="166" x2="250" y2="149" stroke="#64748b" stroke-width="3" marker-end="url(#u9l3-arrow)"/>
    <path d="M250 100 C275 72, 308 87, 291 119" fill="none" stroke="#2563eb" stroke-width="3" marker-end="url(#u9l3-arrow)"/>
    <line x1="405" y1="245" x2="555" y2="245" stroke="#0f766e" stroke-width="5" marker-end="url(#u9l3-green)"/>
    <text x="480" y="224" font-size="15" fill="#0f766e">compress path</text>
    <text x="710" y="90" font-size="15" fill="#475569">After FIND-SET(a)</text>
    <circle cx="710" cy="125" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="710" y="131" fill="#1e3a8a">r</text>
    <circle cx="605" cy="260" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="605" y="266" fill="#334155">a</text>
    <circle cx="675" cy="260" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="675" y="266" fill="#334155">b</text>
    <circle cx="745" cy="260" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="745" y="266" fill="#334155">c</text>
    <circle cx="815" cy="260" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="815" y="266" fill="#334155">d</text>
    <line x1="615" y1="238" x2="690" y2="149" stroke="#0f766e" stroke-width="3" marker-end="url(#u9l3-green)"/>
    <line x1="680" y1="236" x2="702" y2="153" stroke="#0f766e" stroke-width="3" marker-end="url(#u9l3-green)"/>
    <line x1="740" y1="236" x2="718" y2="153" stroke="#0f766e" stroke-width="3" marker-end="url(#u9l3-green)"/>
    <line x1="805" y1="238" x2="730" y2="149" stroke="#0f766e" stroke-width="3" marker-end="url(#u9l3-green)"/>
    <rect x="555" y="330" width="310" height="44" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="710" y="358" font-size="15" fill="#334155">All five nodes are still in the same set.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'Recursive FIND-SET with path compression',
          language: 'pseudocode',
          code: `FIND-SET(x)
    if x != x.p
        x.p = FIND-SET(x.p)
    return x.p`
        },
        {
          type: 'code',
          title: 'Two-pass iterative version',
          language: 'pseudocode',
          code: `FIND-SET-ITERATIVE(x)
    r = x
    while r != r.p
        r = r.p
    while x != r
        next = x.p
        x.p = r
        x = next
    return r`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Ranks are not recomputed',
          text: 'Path compression may make a tree much shorter, but it does not decrease rank fields. With path compression, rank should be read as an upper bound and a linking guide, not as the exact current height.'
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Run FIND-SET(a) on parent chain a -> b -> c -> d -> r.',
          columns: ['Phase', 'Current node', 'Action', 'Parent pointers afterward'],
          rows: [
            ['Search down', 'a', 'a.p is b, so recurse on b.', 'No pointers changed yet.'],
            ['Search down', 'b', 'b.p is c, so recurse on c.', 'No pointers changed yet.'],
            ['Search down', 'c', 'c.p is d, so recurse on d.', 'No pointers changed yet.'],
            ['Search down', 'd', 'd.p is r, so recurse on r.', 'No pointers changed yet.'],
            ['Base case', 'r', 'r.p is r, so return r.', 'r remains the representative.'],
            ['Compress up', 'd, c, b, a', 'Set each visited node parent to r.', 'a.p = r, b.p = r, c.p = r, d.p = r.']
          ]
        },
        {
          type: 'heading',
          text: 'What changes and what does not',
          level: 2
        },
        {
          type: 'table',
          caption: 'Path compression is a representation change, not a set operation.',
          columns: ['Feature', 'Before FIND-SET(a)', 'After FIND-SET(a)'],
          rows: [
            ['Representative', 'r', 'r'],
            ['Set membership', '{a, b, c, d, r}', '{a, b, c, d, r}'],
            ['Parent of a', 'b', 'r'],
            ['Tree height along this path', 'Large', 'One edge from each visited node to r'],
            ['Ranks', 'Existing rank values', 'Unchanged']
          ]
        },
        {
          type: 'formula',
          latex: '\\text{FIND-SET}(x) \\text{ returns the same root before and after compression.}',
          display: true,
          caption: 'Compression preserves representatives.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Representative is preserved',
          text: 'The first phase of FIND-SET follows existing parent pointers to the old root r. The compression step then points visited nodes to r, not to a different node. Therefore every visited node still reaches the same representative.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Partition is preserved',
          text: 'Changing a parent pointer from an ancestor on the same path to the root r cannot connect the node to another set. It only skips intermediate ancestors that already belonged to the same tree.'
        },
        {
          type: 'heading',
          text: 'Runtime and amortized view',
          level: 2
        },
        {
          type: 'table',
          caption: 'Cost perspective for path compression.',
          columns: ['Question', 'Answer'],
          rows: [
            ['Actual time of one FIND-SET', 'Theta(length of the path to the root), because the call must visit the path it compresses.'],
            ['Immediate benefit', 'Every visited non-root node becomes a direct child of the representative.'],
            ['Future benefit', 'Later finds from those nodes or their descendants encounter much shorter paths.'],
            ['With union by rank', 'A sequence of operations has O(alpha(n)) amortized cost per operation; the proof is the next lesson.'],
            ['Space', 'No extra asymptotic storage beyond parent and rank fields; recursion uses call-stack space proportional to the path length.']
          ]
        },
        {
          type: 'formula',
          latex: 'm \\text{ operations on } n \\text{ elements with rank and compression cost } O(m\\alpha(n))',
          display: true,
          caption: 'This is the CLRS theorem used in applications; the next lesson explains the inverse-Ackermann bound.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'FIND-SET with path compression returns the root and rewires the searched path to that root. It changes tree shape, not the represented partition. Rank fields are left unchanged.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u9l3-E1',
              source: 'Compression result',
              question: 'Suppose parent pointers are x.p = y, y.p = z, and z.p = z. What pointers change after FIND-SET(x) with path compression?',
              solution: 'FIND-SET(x) returns z. The call sets x.p = z and y.p = z. z.p remains z.'
            },
            {
              id: 'u9l3-E2',
              source: 'Partition',
              question: 'Does path compression merge two different sets?',
              solution: 'No. It only changes parent pointers inside one existing tree, pointing visited nodes to their own root representative.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u9l3-M1',
              source: 'Rank fields',
              question: 'After path compression, a root with rank 4 may have actual height 1. Is this a contradiction?',
              solution: 'No. Once path compression is used, rank is no longer required to equal actual height. It remains an upper bound and is still useful for future UNION decisions.'
            },
            {
              id: 'u9l3-M2',
              source: 'Correctness',
              question: 'Why is it safe to set every visited node parent directly to the root r?',
              solution: 'Each visited node was already on a parent-pointer path to r, so it already belonged to r\'s set. Replacing its parent with r skips intermediate nodes but preserves the same representative and the same set membership.'
            }
          ]
        }
      ],
      summary: 'During FIND-SET, point every visited node directly to the root.',
      content: teachingArc({
        bigIdea: 'flatten the tree on every FIND.',
        problem: 'reduce future FIND costs.',
        intuition: 'amortise: deep finds pay to flatten; future finds are cheap.',
        formal: 'FIND-SET(x): if parent[x] != x: parent[x] = FIND-SET(parent[x]); return parent[x].',
        algorithm: 'see formal; iterative version uses two passes.',
        worked: 'find on a chain of length 5; tree flattens.',
        correctness: 'each visited node points to root after the call.',
        complexity: 'with rank: O(alpha(n)) amortised per op.',
        trace: 'animate FIND on a deep chain.',
        takeaways: 'rank + path compression = effectively constant time per op for any practical n.',
        practice: 'apply path compression to a chain of length 6 and draw the result.'
      }),
      practice: [
        mcq('algods-u9-l3-q1', 'Path compression changes:',
          ['The set membership.', 'The tree shape, but not the partition.', 'The set count.', 'Nothing.'],
          1, 'Each node points to the same root, so partition is unchanged.')
      ]
    },
    {
      title: 'Amortised analysis: O(alpha(n))',
      durationMinutes: 25,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Union by rank keeps trees shallow; path compression flattens paths after they are used. Together they give one of the strongest data-structure bounds in standard algorithms: any sequence of m MAKE-SET, UNION, and FIND-SET operations on n elements runs in O(m alpha(n)) time, where alpha is the inverse Ackermann function. For every practical input size, alpha(n) is at most a tiny constant.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'What the theorem says',
          text: 'Starting from n MAKE-SET operations, a sequence of m disjoint-set operations implemented with union by rank and path compression takes O(m alpha(n)) total time. Equivalently, the amortized time per operation is O(alpha(n)).'
        },
        {
          type: 'diagram',
          title: 'Why the bound is so small',
          caption: 'Rank prevents repeated tall growth; compression makes expensive paths disappear after they are charged.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Union find amortized analysis intuition diagram">
  <defs>
    <marker id="u9l4-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#0f766e"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Rank plus compression: expensive paths do not stay expensive</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <rect x="70" y="95" width="230" height="78" rx="16" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
    <text x="185" y="126" font-size="16" fill="#1e3a8a">Union by rank</text>
    <text x="185" y="150" font-size="13" fill="#1e3a8a">low rank attaches under high rank</text>
    <rect x="365" y="95" width="230" height="78" rx="16" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <text x="480" y="126" font-size="16" fill="#064e3b">Path compression</text>
    <text x="480" y="150" font-size="13" fill="#064e3b">visited nodes point to the root</text>
    <rect x="660" y="95" width="230" height="78" rx="16" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="775" y="126" font-size="16" fill="#92400e">Amortized theorem</text>
    <text x="775" y="150" font-size="13" fill="#92400e">m ops cost O(m alpha(n))</text>
    <line x1="300" y1="134" x2="365" y2="134" stroke="#0f766e" stroke-width="4" marker-end="url(#u9l4-arrow)"/>
    <line x1="595" y1="134" x2="660" y2="134" stroke="#0f766e" stroke-width="4" marker-end="url(#u9l4-arrow)"/>
    <circle cx="480" cy="275" r="38" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="480" y="282" font-size="18" fill="#4c1d95">alpha(n)</text>
    <text x="480" y="335" font-size="15" fill="#334155">grows more slowly than log n, log log n, and log* n</text>
    <rect x="250" y="360" width="460" height="42" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="387" font-size="15" fill="#334155">For any realistic n, alpha(n) is at most about 4.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'The inverse Ackermann function',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The Ackermann function grows extraordinarily fast. Its inverse alpha(n) asks how many times we must move up that growth hierarchy before reaching n. Since the forward function explodes, the inverse grows almost not at all.'
        },
        {
          type: 'formula',
          latex: '\\text{Total time for } m \\text{ operations} = O(m\\alpha(n))',
          display: true,
          caption: 'Union by rank plus path compression.'
        },
        {
          type: 'table',
          caption: 'Growth-rate intuition.',
          columns: ['Function', 'Growth intuition', 'Compared with alpha(n)'],
          rows: [
            ['log n', 'Slow, but visibly grows with n.', 'Much larger.'],
            ['log log n', 'Very slow.', 'Still larger in the usual hierarchy.'],
            ['log* n', 'Number of times to apply log until the value is at most 1.', 'Also tiny, but alpha(n) is even more stubbornly small in this setting.'],
            ['alpha(n)', 'Inverse Ackermann growth.', 'Treated as constant for practical inputs, but not literally constant asymptotically.']
          ]
        },
        {
          type: 'heading',
          text: 'Why the proof works',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The full Tarjan proof is technical, but the core structure is approachable. Rank partitions nodes into levels. A FIND-SET path can pass through only a limited number of rank levels before compression rewires the path. Once a node jumps closer to a much higher-ranked ancestor, it cannot be charged for the same kind of jump many times.'
        },
        {
          type: 'table',
          caption: 'Proof ingredients to remember.',
          columns: ['Ingredient', 'Role in the analysis'],
          rows: [
            ['Ranks never decrease', 'They give a monotone measure along parent pointers.'],
            ['Parent rank increases along a parent chain', 'A node points only to a root or ancestor with strictly larger rank, except roots point to themselves.'],
            ['Few nodes have high rank', 'A rank-r root represents at least 2^r nodes, so high ranks are rare.'],
            ['Path compression changes parents upward', 'Future finds skip nodes that were already charged.'],
            ['Rank levels are grouped by Ackermann thresholds', 'The number of level changes gives the alpha(n) factor.']
          ]
        },
        {
          type: 'heading',
          text: 'Worked comparison',
          level: 2
        },
        {
          type: 'table',
          caption: 'Same operation family, different heuristics.',
          columns: ['Implementation', 'Worst-case per operation', 'Sequence behavior'],
          rows: [
            ['Naive parent-pointer forest', 'Theta(n)', 'A bad UNION sequence can build a chain.'],
            ['Union by rank only', 'O(log n)', 'Rank-size doubling bounds height.'],
            ['Path compression only', 'Good in many sequences, but rank proof is missing', 'Compression helps finds, but unions can still make awkward shapes.'],
            ['Union by rank + path compression', 'One operation can still walk a long path', 'O(alpha(n)) amortized per operation.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness versus analysis',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Correctness is simple',
          text: 'UNION links roots, so it merges exactly two sets. FIND-SET follows parent pointers to the root representative. Path compression points visited nodes to the same root they already reached, so it preserves the partition.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'The hard part is only the time bound',
          text: 'The O(alpha(n)) result is not needed to prove that the operations return the right representatives. It proves that the total cost of a whole operation sequence is tiny after amortization.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Final union-find complexity table.',
          columns: ['Operation', 'Amortized time with both heuristics', 'Space'],
          rows: [
            ['MAKE-SET', 'O(1)', 'One parent and rank field for the new element.'],
            ['FIND-SET', 'O(alpha(n))', 'No extra asymptotic storage; recursive version uses stack frames.'],
            ['UNION', 'O(alpha(n))', 'Two finds plus constant-time LINK.'],
            ['m-operation sequence', 'O(m alpha(n)) total', 'Theta(n) total structure space.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Do not say union-find is exactly O(1). The CLRS theorem is O(alpha(n)) amortized. Also do not recompute ranks after path compression; ranks remain upper bounds used by LINK.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u9l4-E1',
              source: 'Theorem',
              question: 'With union by rank and path compression, what is the total time for m operations on n elements?',
              solution: 'The total time is O(m alpha(n)), so the amortized time per operation is O(alpha(n)).'
            },
            {
              id: 'u9l4-E2',
              source: 'Practical size',
              question: 'Why do programmers often call union-find operations effectively constant time?',
              solution: 'Because alpha(n) grows so slowly that it is at most a very small constant for any realistic input size, even though the asymptotic theorem is not literally O(1).'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u9l4-M1',
              source: 'Heuristic roles',
              question: 'What distinct jobs do union by rank and path compression perform?',
              solution: 'Union by rank controls how trees grow during UNION by attaching lower rank under higher rank. Path compression shortens paths during FIND-SET by making visited nodes point directly to the root.'
            },
            {
              id: 'u9l4-M2',
              source: 'Amortized meaning',
              question: 'Can a single FIND-SET take more than O(alpha(n)) actual time? Explain.',
              solution: 'Yes. A single FIND-SET can walk a long path. The O(alpha(n)) statement is amortized: across the whole sequence, expensive finds flatten paths and make later operations cheaper.'
            }
          ]
        }
      ],
      summary: 'Inverse Ackermann is effectively a constant for any input.',
      content: teachingArc({
        bigIdea: 'with both heuristics, m operations on n elements cost O(m alpha(n)).',
        problem: 'how cheap can union-find get?',
        intuition: 'alpha(n) <= 4 for n up to 10⁸⁰ — it does not grow.',
        formal: 'Tarjan\'s analysis using charge schemes; we sketch the result.',
        algorithm: 'no algorithm; theorem.',
        worked: 'plug n = 10⁹ into the alpha bound: still <= 4.',
        correctness: 'see CLRS chapter 21 for the full proof.',
        complexity: 'O(alpha(n)) amortised per op.',
        trace: 'compare to a naive forest where m operations could cost O(mn).',
        takeaways: 'the practical takeaway: it is effectively O(1) per op.',
        practice: 'measure operation counts on a sequence of 10⁵ random unions and finds.'
      }),
      practice: [
        mcq('algods-u9-l4-q1', 'For practical n, alpha(n) is bounded by approximately:',
          ['log n', 'log log n', '4', 'sqrt(n)'],
          2, 'alpha(n) <= 4 for n up to 10⁸⁰.')
      ]
    }
  ]
};

const u10 = {
  id: 'algods-u10',
  title: 'Graph Algorithms',
  summary: 'Representations, BFS, DFS, topological sort, MST (Kruskal/Prim), shortest paths.',
  lessons: [
    {
      title: 'Graph representations',
      durationMinutes: 25,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Before running BFS, DFS, shortest paths, or spanning-tree algorithms, we must choose how to store the graph. The two standard CLRS representations are adjacency lists and adjacency matrices. The right choice depends mostly on graph density and the operations you need to support.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Graph notation',
          text: 'A graph is G = (V, E), where V is the set of vertices and E is the set of edges. Let n = |V| and m = |E|. A graph is sparse when m is much smaller than n^2 and dense when m is close to n^2.'
        },
        {
          type: 'diagram',
          title: 'Same directed graph, two representations',
          caption: 'Adjacency lists store outgoing neighbors. An adjacency matrix stores a table entry for every ordered pair.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 980 460" role="img" aria-label="Adjacency list and matrix graph representation diagram">
  <defs>
    <marker id="u10l1-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="956" height="436" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="490" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Adjacency lists versus adjacency matrix</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="180" y="84" font-size="15" fill="#475569">Graph</text>
    <circle cx="180" cy="150" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="180" y="156" fill="#1e3a8a">A</text>
    <circle cx="90" cy="275" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="90" y="281" fill="#064e3b">B</text>
    <circle cx="270" cy="275" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="270" y="281" fill="#92400e">C</text>
    <circle cx="180" cy="375" r="28" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="180" y="381" fill="#991b1b">D</text>
    <line x1="166" y1="174" x2="106" y2="251" stroke="#334155" stroke-width="3" marker-end="url(#u10l1-arrow)"/>
    <line x1="194" y1="174" x2="254" y2="251" stroke="#334155" stroke-width="3" marker-end="url(#u10l1-arrow)"/>
    <line x1="104" y1="291" x2="160" y2="357" stroke="#334155" stroke-width="3" marker-end="url(#u10l1-arrow)"/>
    <line x1="270" y1="303" x2="205" y2="362" stroke="#334155" stroke-width="3" marker-end="url(#u10l1-arrow)"/>
    <line x1="180" y1="347" x2="180" y2="182" stroke="#334155" stroke-width="3" marker-end="url(#u10l1-arrow)"/>
    <text x="470" y="84" font-size="15" fill="#475569">Adjacency lists</text>
    <g text-anchor="start" font-size="15" fill="#0f2038">
      <rect x="360" y="108" width="220" height="44" rx="10" fill="#ffffff" stroke="#dbe4ef"/><text x="378" y="136">A: B, C</text>
      <rect x="360" y="162" width="220" height="44" rx="10" fill="#ffffff" stroke="#dbe4ef"/><text x="378" y="190">B: D</text>
      <rect x="360" y="216" width="220" height="44" rx="10" fill="#ffffff" stroke="#dbe4ef"/><text x="378" y="244">C: D</text>
      <rect x="360" y="270" width="220" height="44" rx="10" fill="#ffffff" stroke="#dbe4ef"/><text x="378" y="298">D: A</text>
    </g>
    <text x="775" y="84" font-size="15" fill="#475569">Adjacency matrix</text>
    <g font-size="14">
      <text x="690" y="122" fill="#475569">A</text><text x="745" y="122" fill="#475569">B</text><text x="800" y="122" fill="#475569">C</text><text x="855" y="122" fill="#475569">D</text>
      <text x="640" y="170" fill="#475569">A</text><text x="640" y="220" fill="#475569">B</text><text x="640" y="270" fill="#475569">C</text><text x="640" y="320" fill="#475569">D</text>
      <g fill="#ffffff" stroke="#dbe4ef">
        <rect x="670" y="140" width="45" height="40"/><rect x="725" y="140" width="45" height="40"/><rect x="780" y="140" width="45" height="40"/><rect x="835" y="140" width="45" height="40"/>
        <rect x="670" y="190" width="45" height="40"/><rect x="725" y="190" width="45" height="40"/><rect x="780" y="190" width="45" height="40"/><rect x="835" y="190" width="45" height="40"/>
        <rect x="670" y="240" width="45" height="40"/><rect x="725" y="240" width="45" height="40"/><rect x="780" y="240" width="45" height="40"/><rect x="835" y="240" width="45" height="40"/>
        <rect x="670" y="290" width="45" height="40"/><rect x="725" y="290" width="45" height="40"/><rect x="780" y="290" width="45" height="40"/><rect x="835" y="290" width="45" height="40"/>
      </g>
      <g fill="#0f2038" font-weight="900">
        <text x="692" y="166">0</text><text x="747" y="166">1</text><text x="802" y="166">1</text><text x="857" y="166">0</text>
        <text x="692" y="216">0</text><text x="747" y="216">0</text><text x="802" y="216">0</text><text x="857" y="216">1</text>
        <text x="692" y="266">0</text><text x="747" y="266">0</text><text x="802" y="266">0</text><text x="857" y="266">1</text>
        <text x="692" y="316">1</text><text x="747" y="316">0</text><text x="802" y="316">0</text><text x="857" y="316">0</text>
      </g>
    </g>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Precise definitions',
          level: 2
        },
        {
          type: 'table',
          caption: 'Representations in CLRS terms.',
          columns: ['Representation', 'Structure', 'Space', 'Best at'],
          rows: [
            ['Adjacency list', 'Array Adj where Adj[u] stores the vertices adjacent from u.', 'Theta(n + m)', 'Sparse graphs and iterating neighbors.'],
            ['Adjacency matrix', 'n by n table A where A[u, v] records whether edge (u, v) exists, or stores its weight.', 'Theta(n^2)', 'Dense graphs and O(1) edge lookup.'],
            ['Undirected list', 'Each undirected edge {u, v} appears in both Adj[u] and Adj[v].', 'Theta(n + m)', 'Traversal still scans total list length Theta(n + m).'],
            ['Weighted graph', 'Store weights in list nodes or matrix entries.', 'Same asymptotic space', 'Needed for MST and shortest paths.']
          ]
        },
        {
          type: 'formula',
          latex: '\\sum_{u \\in V} |Adj[u]| = \\begin{cases} m & \\text{directed graph} \\\\ 2m & \\text{undirected graph} \\end{cases}',
          display: true,
          caption: 'This identity is why adjacency-list graph traversal is linear in n + m.'
        },
        {
          type: 'heading',
          text: 'Common operations',
          level: 2
        },
        {
          type: 'table',
          caption: 'Operation costs.',
          columns: ['Operation', 'Adjacency list', 'Adjacency matrix'],
          rows: [
            ['List all neighbors of u', 'Theta(deg(u))', 'Theta(n), scan row u'],
            ['Test whether edge (u, v) exists', 'O(deg(u)) unless hashed', 'Theta(1)'],
            ['Iterate all edges', 'Theta(n + m)', 'Theta(n^2)'],
            ['Add edge', 'O(1) if list insertion is unsorted', 'Theta(1)'],
            ['Remove edge', 'O(deg(u)) in a simple list', 'Theta(1)']
          ]
        },
        {
          type: 'heading',
          text: 'CLRS-style traversal skeleton',
          level: 2
        },
        {
          type: 'code',
          title: 'Iterating all outgoing edges with adjacency lists',
          language: 'pseudocode',
          code: `for each vertex u in V
    for each vertex v in Adj[u]
        process edge (u, v)`
        },
        {
          type: 'code',
          title: 'Iterating all outgoing edges with an adjacency matrix',
          language: 'pseudocode',
          code: `for each vertex u in V
    for each vertex v in V
        if A[u, v] != 0
            process edge (u, v)`
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Adjacency-list invariant',
          text: 'For every directed edge (u, v), v appears exactly once in Adj[u] in a simple graph. Therefore scanning all adjacency lists visits exactly the edge set, with undirected edges appearing once from each endpoint.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Adjacency-matrix invariant',
          text: 'For every pair of vertices u and v, A[u, v] stores the edge information for that ordered pair. Thus checking A[u, v] answers edge-existence in constant time.'
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Most CLRS graph algorithms are stated with adjacency lists because BFS and DFS need to scan outgoing edges efficiently. Use matrices when the graph is dense or edge-existence queries dominate.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u10l1-E1',
              source: 'Space',
              question: 'A directed graph has n vertices and m edges. What is the space usage of an adjacency list?',
              solution: 'Theta(n + m): one array slot per vertex plus one list entry per directed edge.'
            },
            {
              id: 'u10l1-E2',
              source: 'Edge lookup',
              question: 'Which representation gives O(1) lookup for whether edge (u, v) exists?',
              solution: 'An adjacency matrix, because edge existence is stored directly in A[u, v].'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u10l1-M1',
              source: 'Traversal',
              question: 'Why do BFS and DFS run in O(n + m) time with adjacency lists?',
              solution: 'Each vertex is initialized or discovered a constant number of times, and the algorithm scans each adjacency-list entry once. The total number of entries is m for directed graphs and 2m for undirected graphs.'
            },
            {
              id: 'u10l1-M2',
              source: 'Choosing representation',
              question: 'You need to answer millions of queries of the form "is there an edge from u to v?" on a dense graph. Which representation is more natural and why?',
              solution: 'An adjacency matrix is more natural because it uses Theta(n^2) space, which is acceptable for dense graphs, and answers each edge-existence query in Theta(1) time.'
            }
          ]
        }
      ],
      summary: 'Adjacency list vs adjacency matrix.',
      content: teachingArc({
        bigIdea: 'list when the graph is sparse; matrix when it is dense or you need O(1) edge lookup.',
        problem: 'storage and traversal speed depend on the representation.',
        intuition: 'list = O(n + m) memory; matrix = O(n²) memory.',
        formal: 'adjacency list: array of lists Adj[u] of neighbours. Adjacency matrix: M[u][v] = weight or 0.',
        algorithm: 'choose by graph density and operation profile.',
        worked: 'an n=4 graph in both representations.',
        correctness: 'each represents the same edge set.',
        complexity: 'BFS/DFS are O(n + m) on lists, O(n²) on matrices.',
        trace: 'fill in the matrix and the list for the same small graph.',
        takeaways: 'most courses use adjacency lists by default.',
        practice: 'pick the right representation for: a road network (sparse) and a complete tournament (dense).'
      }),
      practice: [
        mcq('algods-u10-l1-q1', 'Adjacency list memory is:',
          ['Θ(n²)', 'Θ(n + m)', 'Θ(m²)', 'Θ(m log n)'],
          1, 'One slot per vertex plus list nodes per edge.')
      ]
    },
    {
      title: 'BFS — breadth-first search',
      durationMinutes: 30,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Breadth-first search explores a graph in waves from a source vertex s. First it visits all vertices at distance 1, then all vertices at distance 2, and so on. In an unweighted graph, this layer order is exactly what makes BFS compute shortest-path distances from s.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'BFS distance',
          text: 'For a source s, BFS computes d[v], the minimum number of edges on any path from s to v, for every vertex reachable from s. If v is unreachable, d[v] remains infinity.'
        },
        {
          type: 'diagram',
          title: 'BFS explores by layers',
          caption: 'The queue contains the frontier between fully explored vertices and undiscovered vertices.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="BFS layer and queue diagram">
  <defs>
    <marker id="u10l2-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Breadth-first search discovers shortest unweighted distances</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <circle cx="130" cy="215" r="30" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="130" y="221" fill="#1e3a8a">s</text>
    <circle cx="300" cy="135" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="300" y="141" fill="#064e3b">a</text>
    <circle cx="300" cy="295" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="300" y="301" fill="#064e3b">b</text>
    <circle cx="500" cy="105" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="500" y="111" fill="#92400e">c</text>
    <circle cx="500" cy="215" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="500" y="221" fill="#92400e">d</text>
    <circle cx="500" cy="325" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="500" y="331" fill="#92400e">e</text>
    <circle cx="705" cy="215" r="28" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="705" y="221" fill="#991b1b">f</text>
    <line x1="158" y1="202" x2="273" y2="148" stroke="#334155" stroke-width="3" marker-end="url(#u10l2-arrow)"/>
    <line x1="158" y1="228" x2="273" y2="282" stroke="#334155" stroke-width="3" marker-end="url(#u10l2-arrow)"/>
    <line x1="328" y1="131" x2="472" y2="109" stroke="#334155" stroke-width="3" marker-end="url(#u10l2-arrow)"/>
    <line x1="326" y1="153" x2="475" y2="198" stroke="#334155" stroke-width="3" marker-end="url(#u10l2-arrow)"/>
    <line x1="326" y1="282" x2="475" y2="232" stroke="#334155" stroke-width="3" marker-end="url(#u10l2-arrow)"/>
    <line x1="328" y1="299" x2="472" y2="321" stroke="#334155" stroke-width="3" marker-end="url(#u10l2-arrow)"/>
    <line x1="528" y1="215" x2="677" y2="215" stroke="#334155" stroke-width="3" marker-end="url(#u10l2-arrow)"/>
    <text x="130" y="270" font-size="14" fill="#1e3a8a">d=0</text>
    <text x="300" y="84" font-size="14" fill="#064e3b">d=1</text>
    <text x="300" y="350" font-size="14" fill="#064e3b">d=1</text>
    <text x="500" y="70" font-size="14" fill="#92400e">d=2</text>
    <text x="500" y="270" font-size="14" fill="#92400e">d=2</text>
    <text x="500" y="380" font-size="14" fill="#92400e">d=2</text>
    <text x="705" y="270" font-size="14" fill="#991b1b">d=3</text>
    <rect x="740" y="95" width="170" height="58" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="825" y="120" font-size="13" fill="#475569">Queue example</text>
    <text x="825" y="143" font-size="15" fill="#0f2038">c, d, e</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'BFS',
          language: 'pseudocode',
          code: `BFS(G, s)
    for each vertex u in G.V - {s}
        u.color = WHITE
        u.d = infinity
        u.pi = NIL
    s.color = GRAY
    s.d = 0
    s.pi = NIL
    Q = empty queue
    ENQUEUE(Q, s)
    while Q is not empty
        u = DEQUEUE(Q)
        for each v in G.Adj[u]
            if v.color == WHITE
                v.color = GRAY
                v.d = u.d + 1
                v.pi = u
                ENQUEUE(Q, v)
        u.color = BLACK`
        },
        {
          type: 'table',
          caption: 'Color meanings.',
          columns: ['Color', 'Meaning'],
          rows: [
            ['WHITE', 'Undiscovered.'],
            ['GRAY', 'Discovered and currently in the queue; some outgoing edges may remain unscanned.'],
            ['BLACK', 'Finished; all outgoing adjacency-list entries have been scanned.']
          ]
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Run BFS from s with adjacency lists s: a,b; a: c,d; b: d,e; d: f.',
          columns: ['Step', 'Queue before', 'Dequeue', 'New discoveries', 'Distances set'],
          rows: [
            ['0', 's', '-', 's initialized', 'd[s] = 0'],
            ['1', 's', 's', 'a, b', 'd[a] = 1, d[b] = 1'],
            ['2', 'a, b', 'a', 'c, d', 'd[c] = 2, d[d] = 2'],
            ['3', 'b, c, d', 'b', 'e', 'd[e] = 2; d already discovered'],
            ['4', 'c, d, e', 'c', 'none', 'no changes'],
            ['5', 'd, e', 'd', 'f', 'd[f] = 3'],
            ['6', 'e, f', 'e', 'none', 'no changes'],
            ['7', 'f', 'f', 'none', 'finished']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Queue invariant',
          text: 'The queue stores discovered vertices in nondecreasing distance from s. When u is dequeued, every vertex currently in the queue has distance either d[u] or d[u] + 1, and every newly discovered neighbor receives distance d[u] + 1.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Shortest-path argument',
          text: 'BFS discovers vertices by increasing path length. A vertex v first discovered from u gets a path of length d[u] + 1. Any shorter path to v would have ended at a vertex on an earlier layer, which BFS would have processed before u and would have discovered v earlier.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'BFS complexity with adjacency lists.',
          columns: ['Component', 'Cost'],
          rows: [
            ['Initialization', 'Theta(n)'],
            ['Queue operations', 'Theta(n), because each vertex is enqueued at most once'],
            ['Adjacency scans', 'Theta(m) for directed graphs, Theta(2m) for undirected graphs'],
            ['Total time', 'Theta(n + m)'],
            ['Extra space', 'Theta(n) for colors, distances, parents, and queue']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'BFS gives shortest paths only when every edge has equal weight, usually treated as weight 1. The parent pointers pi form a breadth-first tree rooted at s.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u10l2-E1',
              source: 'Distance',
              question: 'If BFS discovers v while scanning u, and d[u] = 4, what distance is assigned to v?',
              solution: 'BFS sets d[v] = d[u] + 1 = 5.'
            },
            {
              id: 'u10l2-E2',
              source: 'Queue',
              question: 'How many times can a vertex be enqueued in CLRS BFS?',
              solution: 'At most once. A vertex is enqueued only when it is WHITE, and it immediately becomes GRAY.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u10l2-M1',
              source: 'Correctness',
              question: 'Why does BFS not need to update d[v] if it later finds another path to an already GRAY vertex v?',
              solution: 'The first discovery of v occurs from the earliest possible layer. Any later edge scanned comes from a vertex with distance at least as large, so it cannot produce a shorter unweighted path.'
            },
            {
              id: 'u10l2-M2',
              source: 'Representation',
              question: 'How would the BFS time change on an adjacency matrix?',
              solution: 'For each dequeued vertex, BFS must scan a full row of n possible neighbors. Over n vertices this gives Theta(n^2) time, regardless of the number of actual edges.'
            }
          ]
        }
      ],
      summary: 'Queue-based traversal that computes shortest unweighted distances.',
      content: teachingArc({
        bigIdea: 'visit vertices in increasing distance from the source.',
        problem: 'shortest paths in unweighted graphs.',
        intuition: 'expand a frontier outward, one ring at a time.',
        formal: 'BFS(G, s): colour all white; queue Q; enqueue s as grey; while Q non-empty: dequeue u, for each neighbour v: if white, set distance and parent, enqueue.',
        algorithm: 'see formal.',
        worked: 'BFS from s in a 6-node graph; record distances.',
        correctness: 'the queue invariant ensures distance order.',
        complexity: 'O(n + m).',
        trace: 'animate BFS layer by layer.',
        takeaways: 'distances are exact for unweighted graphs.',
        practice: 'run BFS on a sample graph and list the BFS tree.'
      }),
      practice: [
        mcq('algods-u10-l2-q1', 'BFS computes:',
          ['Shortest paths in unweighted graphs.', 'Shortest paths with negative edges.', 'Topological order.', 'Articulation points.'],
          0, 'BFS gives exact distances when all edges have weight 1.')
      ]
    },
    {
      title: 'DFS — depth-first search',
      durationMinutes: 30,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Depth-first search explores as far as possible along one branch before backtracking. Unlike BFS, DFS is not primarily a shortest-path algorithm. Its power comes from the structure it records: parent pointers, discovery times, finish times, and edge classifications.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'DFS timestamps',
          text: 'Each vertex u receives a discovery time d[u] when it first becomes GRAY and a finish time f[u] when all of its outgoing edges have been explored and it becomes BLACK.'
        },
        {
          type: 'diagram',
          title: 'DFS intervals are nested or disjoint',
          caption: 'A descendant finishes before its ancestor. Vertices in different DFS subtrees have disjoint time intervals.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="DFS timestamp interval diagram">
  <defs>
    <marker id="u10l3-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">DFS records discovery and finish structure</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="230" y="88" font-size="15" fill="#475569">DFS tree</text>
    <circle cx="230" cy="130" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="230" y="136" fill="#1e3a8a">u</text>
    <circle cx="140" cy="235" r="26" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="140" y="241" fill="#064e3b">v</text>
    <circle cx="320" cy="235" r="26" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="320" y="241" fill="#92400e">w</text>
    <circle cx="140" cy="335" r="24" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/><text x="140" y="341" fill="#334155">x</text>
    <line x1="212" y1="152" x2="158" y2="213" stroke="#334155" stroke-width="3" marker-end="url(#u10l3-arrow)"/>
    <line x1="248" y1="152" x2="302" y2="213" stroke="#334155" stroke-width="3" marker-end="url(#u10l3-arrow)"/>
    <line x1="140" y1="261" x2="140" y2="311" stroke="#334155" stroke-width="3" marker-end="url(#u10l3-arrow)"/>
    <text x="650" y="88" font-size="15" fill="#475569">Intervals [d, f]</text>
    <line x1="500" y1="150" x2="870" y2="150" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="520" y="125" width="320" height="38" rx="12" fill="#dbeafe" stroke="#2563eb" stroke-width="2"/>
    <text x="680" y="150" font-size="14" fill="#1e3a8a">u: [1, 8]</text>
    <rect x="560" y="190" width="150" height="38" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>
    <text x="635" y="215" font-size="14" fill="#064e3b">v: [2, 5]</text>
    <rect x="590" y="255" width="80" height="34" rx="10" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>
    <text x="630" y="278" font-size="13" fill="#334155">x: [3,4]</text>
    <rect x="735" y="190" width="70" height="38" rx="12" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>
    <text x="770" y="215" font-size="14" fill="#92400e">w: [6,7]</text>
    <text x="680" y="340" font-size="15" fill="#334155">Nested: x inside v inside u. Disjoint: v and w.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'DFS and DFS-VISIT',
          language: 'pseudocode',
          code: `DFS(G)
    for each vertex u in G.V
        u.color = WHITE
        u.pi = NIL
    time = 0
    for each vertex u in G.V
        if u.color == WHITE
            DFS-VISIT(G, u)

DFS-VISIT(G, u)
    time = time + 1
    u.d = time
    u.color = GRAY
    for each v in G.Adj[u]
        if v.color == WHITE
            v.pi = u
            DFS-VISIT(G, v)
    u.color = BLACK
    time = time + 1
    u.f = time`
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Run DFS with vertex order u, v, w, x and adjacency u: v,w; v: x. Times depend on adjacency order.',
          columns: ['Event', 'Time', 'Color change', 'Parent'],
          rows: [
            ['discover u', '1', 'u: WHITE -> GRAY', 'u.pi = NIL'],
            ['discover v from u', '2', 'v: WHITE -> GRAY', 'v.pi = u'],
            ['discover x from v', '3', 'x: WHITE -> GRAY', 'x.pi = v'],
            ['finish x', '4', 'x: GRAY -> BLACK', 'x.pi = v'],
            ['finish v', '5', 'v: GRAY -> BLACK', 'v.pi = u'],
            ['discover w from u', '6', 'w: WHITE -> GRAY', 'w.pi = u'],
            ['finish w', '7', 'w: GRAY -> BLACK', 'w.pi = u'],
            ['finish u', '8', 'u: GRAY -> BLACK', 'u.pi = NIL']
          ]
        },
        {
          type: 'heading',
          text: 'Parenthesis theorem',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'The theorem',
          text: 'For any two vertices u and v in a DFS forest, their intervals [d[u], f[u]] and [d[v], f[v]] are either disjoint or one is contained inside the other. The nested case means one vertex is a descendant of the other in the DFS forest.'
        },
        {
          type: 'table',
          caption: 'Interval interpretation.',
          columns: ['Interval relationship', 'DFS meaning'],
          rows: [
            ['[d[v], f[v]] contained in [d[u], f[u]]', 'v is a descendant of u in the DFS forest.'],
            ['[d[u], f[u]] contained in [d[v], f[v]]', 'u is a descendant of v.'],
            ['Intervals are disjoint', 'Neither vertex is a descendant of the other.']
          ]
        },
        {
          type: 'heading',
          text: 'Edge classification',
          level: 2
        },
        {
          type: 'table',
          caption: 'For directed graphs, DFS classifies edges by the state or interval relationship of the endpoint.',
          columns: ['Edge type', 'Meaning'],
          rows: [
            ['Tree edge', 'Discovers a WHITE vertex.'],
            ['Back edge', 'Goes to an ancestor that is currently GRAY; indicates a directed cycle.'],
            ['Forward edge', 'Goes to a descendant that was already discovered.'],
            ['Cross edge', 'Goes between different DFS branches or subtrees.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Discovery coverage',
          text: 'DFS starts a visit from every WHITE vertex in the outer loop. Each DFS-VISIT recursively follows every edge to WHITE neighbors. Therefore every vertex is eventually discovered, including vertices in disconnected components.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why intervals nest',
          text: 'Once DFS discovers u, u remains GRAY until every recursive call started from u has finished. Any descendant v must be discovered after u and finished before u, producing a nested interval. If v is not discovered during u\'s active period, the intervals are disjoint.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'DFS complexity with adjacency lists.',
          columns: ['Component', 'Cost'],
          rows: [
            ['Initialization and outer loop', 'Theta(n)'],
            ['DFS-VISIT calls', 'Each vertex is visited once'],
            ['Adjacency scans', 'Theta(m), or Theta(2m) for undirected graphs'],
            ['Total time', 'Theta(n + m)'],
            ['Extra space', 'Theta(n) for colors, parents, times, and recursion stack']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'DFS is the engine behind topological sort, strongly connected components, articulation-style reasoning, and cycle detection. Always state that timestamps depend on vertex and adjacency-list order.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u10l3-E1',
              source: 'Timestamps',
              question: 'When does DFS set f[u]?',
              solution: 'DFS sets f[u] after all vertices in Adj[u] have been examined and all recursive visits from u have returned.'
            },
            {
              id: 'u10l3-E2',
              source: 'Colors',
              question: 'What does GRAY mean in DFS?',
              solution: 'The vertex has been discovered, but DFS has not finished exploring all outgoing edges from it. It is still active on the recursion stack.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u10l3-M1',
              source: 'Parenthesis theorem',
              question: 'If d[u] < d[v] < f[v] < f[u], what is the relationship between u and v?',
              solution: 'v is a descendant of u in the DFS forest, because v\'s interval is strictly nested inside u\'s interval.'
            },
            {
              id: 'u10l3-M2',
              source: 'Cycle detection',
              question: 'Why does finding a back edge in a directed DFS imply a cycle?',
              solution: 'A back edge (u, v) goes from u to an ancestor v that is still GRAY. The DFS tree already contains a path from v down to u, and the edge u -> v closes a directed cycle.'
            }
          ]
        }
      ],
      summary: 'Stack-based traversal with discovery and finish times.',
      content: teachingArc({
        bigIdea: 'go deep first; backtrack when stuck.',
        problem: 'discover structure (cycles, components, topological order).',
        intuition: 'mirror of how you explore a maze; carry a clock.',
        formal: 'DFS(G): time = 0; for each vertex u: if white, DFS-VISIT(u). DFS-VISIT(u): time++; d[u] = time; explore neighbours; time++; f[u] = time.',
        algorithm: 'see formal.',
        worked: 'DFS on a 6-node graph; record d[u], f[u].',
        correctness: 'parenthesis theorem on intervals [d[u], f[u]].',
        complexity: 'O(n + m).',
        trace: 'animate the timestamping.',
        takeaways: 'the timestamps are gold for many algorithms (topological sort, SCC).',
        practice: 'run DFS on a small graph and check the parenthesis theorem.'
      }),
      practice: [
        mcq('algods-u10-l3-q1', 'In DFS, the parenthesis theorem says intervals [d, f] for u and v are:',
          ['Always overlapping.', 'Always disjoint.', 'Either disjoint or nested.', 'Neither.'],
          2, 'Disjoint when neither is descendant of the other; nested otherwise.')
      ]
    },
    {
      title: 'Topological sort',
      durationMinutes: 25,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A topological ordering places the vertices of a directed graph in an order that respects all directed dependencies. If an edge u -> v means "u must come before v", then u must appear earlier than v in the output. Such an ordering exists exactly for directed acyclic graphs, or DAGs.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Topological ordering',
          text: 'A topological sort of a directed graph G = (V, E) is a linear order of all vertices such that for every directed edge (u, v) in E, u appears before v.'
        },
        {
          type: 'diagram',
          title: 'Dependencies point left to right',
          caption: 'One valid topological order is undershirt, shirt, belt, jacket, tie, shoes for this small clothing DAG fragment.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Topological sort DAG and linear order diagram">
  <defs>
    <marker id="u10l4-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Topological sort orders a DAG by dependencies</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <circle cx="150" cy="120" r="38" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="150" y="126" fill="#1e3a8a" font-size="13">undershirt</text>
    <circle cx="330" cy="120" r="34" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="330" y="126" fill="#064e3b" font-size="14">shirt</text>
    <circle cx="500" cy="120" r="34" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="500" y="126" fill="#92400e" font-size="14">belt</text>
    <circle cx="680" cy="120" r="36" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="680" y="126" fill="#991b1b" font-size="14">jacket</text>
    <circle cx="500" cy="250" r="34" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="500" y="256" fill="#4c1d95" font-size="14">tie</text>
    <circle cx="680" cy="250" r="34" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/><text x="680" y="256" fill="#075985" font-size="14">shoes</text>
    <line x1="188" y1="120" x2="296" y2="120" stroke="#334155" stroke-width="3" marker-end="url(#u10l4-arrow)"/>
    <line x1="364" y1="120" x2="466" y2="120" stroke="#334155" stroke-width="3" marker-end="url(#u10l4-arrow)"/>
    <line x1="534" y1="120" x2="645" y2="120" stroke="#334155" stroke-width="3" marker-end="url(#u10l4-arrow)"/>
    <line x1="354" y1="144" x2="476" y2="226" stroke="#334155" stroke-width="3" marker-end="url(#u10l4-arrow)"/>
    <line x1="524" y1="226" x2="654" y2="144" stroke="#334155" stroke-width="3" marker-end="url(#u10l4-arrow)"/>
    <line x1="150" y1="158" x2="640" y2="244" stroke="#334155" stroke-width="3" marker-end="url(#u10l4-arrow)"/>
    <rect x="96" y="335" width="768" height="50" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="366" font-size="15" fill="#334155">Every edge points from an earlier item to a later item in the order.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'DFS-based algorithm',
          level: 2
        },
        {
          type: 'code',
          title: 'TOPOLOGICAL-SORT',
          language: 'pseudocode',
          code: `TOPOLOGICAL-SORT(G)
    call DFS(G) to compute finishing times f[v] for each vertex v
    as each vertex is finished, insert it onto the front of a linked list
    return the linked list of vertices`
        },
        {
          type: 'paragraph',
          text: 'Equivalently, run DFS and then output vertices in decreasing finish time. Prepending each vertex when it finishes constructs that decreasing-finish-time order directly.'
        },
        {
          type: 'formula',
          latex: '(u,v) \\in E \\quad \\Rightarrow \\quad f[u] > f[v]',
          display: true,
          caption: 'The central DFS fact behind topological sort.'
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'table',
          caption: 'A possible DFS finish-time trace for a DAG.',
          columns: ['Vertex', 'Outgoing edges', 'Finish time f[v]', 'Position in reverse finish order'],
          rows: [
            ['undershirt', 'shirt, shoes', '12', '1'],
            ['shirt', 'belt, tie', '10', '2'],
            ['belt', 'jacket', '8', '3'],
            ['tie', 'jacket', '6', '4'],
            ['jacket', 'none', '5', '5'],
            ['shoes', 'none', '3', '6']
          ]
        },
        {
          type: 'paragraph',
          text: 'The exact finish times depend on DFS vertex order and adjacency-list order. The important invariant is not the particular order above; it is that every edge goes from a larger finish time to a smaller finish time in a DAG.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Why reverse finish order works',
          text: 'Consider any edge (u, v) in a DAG. During DFS, if u is discovered before v and v is still white, then v becomes a descendant of u and finishes before u. If v was already discovered, the absence of cycles rules out v being a gray ancestor of u. In all cases, f[u] > f[v], so ordering by decreasing finish time places u before v.'
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cycle warning',
          text: 'A directed graph with a cycle cannot have a topological order: following the cycle would require v1 before v2 before ... before v1. In DFS, a back edge is the standard signal that the graph is not a DAG.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Topological-sort costs with adjacency lists.',
          columns: ['Component', 'Cost'],
          rows: [
            ['DFS', 'Theta(n + m)'],
            ['Prepending or sorting by finish time', 'Theta(n) if prepending during DFS'],
            ['Total time', 'Theta(n + m)'],
            ['Extra space', 'Theta(n) for colors, parents, times, recursion stack, and output list']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Topological sort is for directed acyclic graphs. The DFS proof is the finish-time inequality: every edge (u, v) goes from larger f to smaller f.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u10l4-E1',
              source: 'Definition',
              question: 'In a topological ordering, where must u appear relative to v if the graph has edge (u, v)?',
              solution: 'u must appear before v.'
            },
            {
              id: 'u10l4-E2',
              source: 'Existence',
              question: 'What kind of directed graph admits a topological sort?',
              solution: 'Exactly a directed acyclic graph, or DAG.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u10l4-M1',
              source: 'Finish times',
              question: 'Suppose a DFS of a DAG gives f[a] = 9, f[b] = 4, and edge (a, b). Is this consistent with topological sort by reverse finish time?',
              solution: 'Yes. Since f[a] > f[b], reverse finish order places a before b, respecting the edge.'
            },
            {
              id: 'u10l4-M2',
              source: 'Cycle obstruction',
              question: 'Why can the directed cycle a -> b -> c -> a not be topologically sorted?',
              solution: 'The edges require a before b, b before c, and c before a simultaneously, which is impossible in a linear order.'
            }
          ]
        }
      ],
      summary: 'For DAGs: list vertices so that every edge goes left to right.',
      content: teachingArc({
        bigIdea: 'output the reverse of the DFS finish order.',
        problem: 'order tasks by dependency.',
        intuition: 'a vertex finishes only when all of its descendants have.',
        formal: 'TOPO-SORT(G): DFS(G); as each vertex\'s f[v] is set, prepend it to a list.',
        algorithm: 'see formal.',
        worked: 'topo-sort a 6-node DAG.',
        correctness: 'follows from the DFS parenthesis theorem.',
        complexity: 'O(n + m).',
        trace: 'show finish-time list and verify edges go left to right.',
        takeaways: 'topo-sort exists iff the graph has no cycles.',
        practice: 'detect a back edge during DFS and conclude the graph is cyclic.'
      }),
      practice: [
        mcq('algods-u10-l4-q1', 'A graph admits a topological sort iff it:',
          ['Is connected.', 'Has at least one source.', 'Has no cycle.', 'Is bipartite.'],
          2, 'A topological sort exists exactly for DAGs.')
      ]
    },
    {
      title: 'Minimum spanning trees — Kruskal',
      durationMinutes: 30,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'A minimum spanning tree connects all vertices of a connected, undirected, weighted graph with minimum possible total edge weight. Kruskal\'s algorithm grows a forest: scan edges from cheapest to most expensive and add an edge exactly when it connects two different components.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Minimum spanning tree',
          text: 'For a connected, undirected graph G = (V, E) with edge weights w, an MST is a subset T of E that connects all vertices, has no cycles, contains |V| - 1 edges, and has minimum total weight among all spanning trees.'
        },
        {
          type: 'diagram',
          title: 'Kruskal accepts safe edges and skips cycle edges',
          caption: 'The edge c-d is cheap enough to inspect, but it is skipped if c and d are already in the same union-find set.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Kruskal minimum spanning tree edge selection diagram">
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Kruskal scans edges from lightest to heaviest</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <circle cx="170" cy="135" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="170" y="141" fill="#1e3a8a">a</text>
    <circle cx="360" cy="135" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="360" y="141" fill="#064e3b">b</text>
    <circle cx="170" cy="300" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="170" y="306" fill="#92400e">c</text>
    <circle cx="360" cy="300" r="28" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="360" y="306" fill="#991b1b">d</text>
    <line x1="198" y1="135" x2="332" y2="135" stroke="#0f766e" stroke-width="5"/><text x="265" y="116" font-size="14" fill="#0f766e">1 accept</text>
    <line x1="170" y1="163" x2="170" y2="272" stroke="#0f766e" stroke-width="5"/><text x="128" y="220" font-size="14" fill="#0f766e">2 accept</text>
    <line x1="360" y1="163" x2="360" y2="272" stroke="#0f766e" stroke-width="5"/><text x="410" y="220" font-size="14" fill="#0f766e">3 accept</text>
    <line x1="198" y1="300" x2="332" y2="300" stroke="#dc2626" stroke-width="4" stroke-dasharray="10 8"/><text x="265" y="330" font-size="14" fill="#dc2626">4 skip: cycle</text>
    <line x1="190" y1="155" x2="340" y2="280" stroke="#94a3b8" stroke-width="3"/><text x="280" y="235" font-size="14" fill="#475569">5</text>
    <rect x="540" y="105" width="320" height="210" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="700" y="135" font-size="16" fill="#0f2038">Sorted edge scan</text>
    <text x="700" y="170" font-size="14" fill="#0f766e">1: a-b accepted</text>
    <text x="700" y="202" font-size="14" fill="#0f766e">2: a-c accepted</text>
    <text x="700" y="234" font-size="14" fill="#0f766e">3: b-d accepted</text>
    <text x="700" y="266" font-size="14" fill="#dc2626">4: c-d skipped</text>
    <text x="700" y="298" font-size="14" fill="#475569">stop after |V|-1 edges</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'MST-KRUSKAL',
          language: 'pseudocode',
          code: `MST-KRUSKAL(G, w)
    A = empty set
    for each vertex v in G.V
        MAKE-SET(v)
    sort the edges of G.E into nondecreasing order by weight w
    for each edge (u, v) in sorted order
        if FIND-SET(u) != FIND-SET(v)
            A = A union {(u, v)}
            UNION(u, v)
    return A`
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Kruskal trace on the diagram above.',
          columns: ['Edge', 'Weight', 'FIND-SET result', 'Decision', 'Forest after decision'],
          rows: [
            ['a-b', '1', 'different sets', 'accept', '{a,b}, {c}, {d}'],
            ['a-c', '2', 'different sets', 'accept', '{a,b,c}, {d}'],
            ['b-d', '3', 'different sets', 'accept', '{a,b,c,d}'],
            ['c-d', '4', 'same set', 'skip', '{a,b,c,d}; adding c-d would create a cycle'],
            ['any later edge inside the component', 'larger', 'same set', 'skip', 'would create a cycle']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Cycle test is union-find, not weight alone',
          text: 'Kruskal does not skip an edge because it is locally unattractive. It skips exactly when both endpoints already have the same representative, which means the edge would create a cycle in the current forest.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Cut property',
          text: 'For any cut that respects the edges already chosen, a lightest edge crossing that cut is safe: adding it keeps the partial solution extendable to some MST. Kruskal\'s next accepted edge is the lightest edge connecting two different components, so it is a lightest edge across the cut separating one component from the rest.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Acyclic and spanning',
          text: 'The union-find test accepts only edges connecting different components, so A remains acyclic. Each accepted edge reduces the number of components by one. In a connected graph, after |V| - 1 accepted edges, all vertices are connected and A is a spanning tree.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Kruskal complexity.',
          columns: ['Component', 'Cost'],
          rows: [
            ['MAKE-SET for all vertices', 'Theta(n)'],
            ['Sort all edges', 'O(m log m)'],
            ['Union-find operations', 'O(m alpha(n)) with rank and path compression'],
            ['Total time', 'O(m log m), usually written O(m log n) because m <= n^2'],
            ['Extra space', 'Theta(n) for union-find plus storage for selected edges']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Kruskal is the MST algorithm that pairs directly with union-find. The proof uses the cut property; the implementation uses FIND-SET to avoid cycles.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u10l5-E1',
              source: 'Cycle test',
              question: 'Kruskal is considering edge (u, v). FIND-SET(u) equals FIND-SET(v). What should the algorithm do?',
              solution: 'It should skip the edge, because adding it would create a cycle in the current forest.'
            },
            {
              id: 'u10l5-E2',
              source: 'Tree size',
              question: 'How many edges does any spanning tree on n vertices contain?',
              solution: 'Exactly n - 1 edges.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u10l5-M1',
              source: 'Complexity',
              question: 'Why is Kruskal usually dominated by sorting the edges?',
              solution: 'Sorting costs O(m log m). The union-find work is O(m alpha(n)), which is asymptotically smaller than sorting for standard comparison sorting, so sorting dominates.'
            },
            {
              id: 'u10l5-M2',
              source: 'Correctness',
              question: 'In one sentence, why is the next accepted Kruskal edge safe?',
              solution: 'It is the lightest edge crossing a cut between two current components, and by the cut property such an edge is safe for some MST.'
            }
          ]
        }
      ],
      summary: 'Sort edges; add cheapest non-cycle-forming edge; use union-find.',
      content: teachingArc({
        bigIdea: 'greedily add the cheapest safe edge.',
        problem: 'spanning tree of minimum total weight.',
        intuition: 'cycle-property: the heaviest edge of a cycle is never in an MST.',
        formal: 'KRUSKAL(G): sort edges by weight; for each (u, v) in order: if FIND-SET(u) != FIND-SET(v): add edge; UNION(u, v).',
        algorithm: 'see formal.',
        worked: 'Kruskal on a 5-node weighted graph.',
        correctness: 'cut property: the cheapest edge crossing any cut is safe.',
        complexity: 'O(m log m) for sort + O(m alpha(n)) for union-find = O(m log n).',
        trace: 'animate edge addition; show union-find merges.',
        takeaways: 'Kruskal pairs perfectly with chapter 9 union-find.',
        practice: 'run Kruskal on a 6-node weighted graph; verify total weight.'
      }),
      practice: [
        mcq('algods-u10-l5-q1', 'Kruskal\'s correctness rests on which property?',
          ['Triangle inequality.', 'Cut property.', 'Bellman-Ford relaxation.', 'Topological sort.'],
          1, 'The cheapest edge across any cut is in some MST.')
      ]
    },
    {
      title: 'Minimum spanning trees — Prim',
      durationMinutes: 30,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Prim\'s algorithm grows one tree instead of a forest. Starting from a root r, it repeatedly adds the cheapest edge that connects the current tree to a vertex outside the tree. The algorithm is usually implemented with a min-priority queue keyed by the cheapest known edge for attaching each outside vertex.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Prim key value',
          text: 'For a vertex v not yet in the tree, key[v] is the weight of the cheapest edge currently known that connects v to a vertex already chosen for the MST. parent[v] stores the tree endpoint of that cheapest edge.'
        },
        {
          type: 'diagram',
          title: 'Prim grows across the current cut',
          caption: 'At each step, choose the lightest edge crossing from the selected set A to the unselected vertices.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Prim MST cut frontier diagram">
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Prim grows one tree using the cheapest frontier edge</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <rect x="70" y="86" width="390" height="284" rx="26" fill="#ecfdf5" stroke="#16a34a" stroke-width="3" stroke-dasharray="10 8"/>
    <text x="265" y="115" font-size="15" fill="#064e3b">selected set A</text>
    <circle cx="180" cy="190" r="30" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="180" y="196" fill="#1e3a8a">r</text>
    <circle cx="340" cy="190" r="30" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="340" y="196" fill="#064e3b">u</text>
    <circle cx="260" cy="300" r="30" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="260" y="306" fill="#92400e">x</text>
    <line x1="210" y1="190" x2="310" y2="190" stroke="#0f766e" stroke-width="5"/><text x="260" y="172" font-size="14" fill="#0f766e">2</text>
    <line x1="200" y1="212" x2="240" y2="278" stroke="#0f766e" stroke-width="5"/><text x="205" y="258" font-size="14" fill="#0f766e">4</text>
    <circle cx="620" cy="135" r="30" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="620" y="141" fill="#991b1b">v</text>
    <circle cx="710" cy="275" r="30" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="710" y="281" fill="#4c1d95">w</text>
    <circle cx="820" cy="165" r="30" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/><text x="820" y="171" fill="#075985">z</text>
    <line x1="365" y1="177" x2="592" y2="143" stroke="#dc2626" stroke-width="5"/><text x="480" y="145" font-size="14" fill="#dc2626">3 choose next</text>
    <line x1="362" y1="210" x2="684" y2="262" stroke="#94a3b8" stroke-width="3"/><text x="540" y="250" font-size="14" fill="#475569">7</text>
    <line x1="288" y1="297" x2="681" y2="277" stroke="#94a3b8" stroke-width="3"/><text x="500" y="312" font-size="14" fill="#475569">6</text>
    <line x1="646" y1="150" x2="792" y2="162" stroke="#94a3b8" stroke-width="3"/><text x="720" y="140" font-size="14" fill="#475569">5</text>
    <rect x="530" y="330" width="330" height="44" rx="14" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="695" y="358" font-size="15" fill="#334155">The cut is A versus V - A.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style pseudocode',
          level: 2
        },
        {
          type: 'code',
          title: 'MST-PRIM',
          language: 'pseudocode',
          code: `MST-PRIM(G, w, r)
    for each vertex u in G.V
        u.key = infinity
        u.pi = NIL
    r.key = 0
    Q = G.V
    while Q is not empty
        u = EXTRACT-MIN(Q)
        for each v in G.Adj[u]
            if v in Q and w(u, v) < v.key
                v.pi = u
                v.key = w(u, v)`
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Prim from r on the diagram. Keys describe cheapest known attachment costs.',
          columns: ['Step', 'Extracted vertex', 'New/updated keys', 'Chosen tree edge'],
          rows: [
            ['0', '-', 'key[r] = 0; all others infinity', 'none'],
            ['1', 'r', 'key[u] = 2, key[x] = 4', 'root has no parent edge'],
            ['2', 'u', 'key[v] = 3, key[w] = 7', '(r, u)'],
            ['3', 'v', 'key[z] = 5', '(u, v)'],
            ['4', 'x', 'key[w] improves from 7 to 6', '(r, x)'],
            ['5', 'z', 'no useful decrease', '(v, z)'],
            ['6', 'w', 'finished', '(x, w)']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Cut property again',
          text: 'At every iteration, let A be the vertices already extracted into the tree. Prim chooses the lightest edge crossing the cut (A, V - A). By the cut property, that edge is safe to add to some MST.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Key invariant',
          text: 'For every vertex v still in Q, key[v] is the minimum weight among edges connecting v to a vertex already in A. The relaxation step after extracting u preserves this invariant by checking every edge from the newly added vertex u.'
        },
        {
          type: 'heading',
          text: 'Runtime and priority queues',
          level: 2
        },
        {
          type: 'table',
          caption: 'Prim complexity depends on the priority queue implementation.',
          columns: ['Priority queue', 'Cost'],
          rows: [
            ['Adjacency matrix + simple array', 'Theta(n^2), often good for dense graphs.'],
            ['Binary heap + adjacency lists', 'O(m log n), because DECREASE-KEY costs O(log n).'],
            ['Fibonacci heap + adjacency lists', 'O(m + n log n), because DECREASE-KEY is O(1) amortized and EXTRACT-MIN is O(log n).'],
            ['Space', 'Theta(n + m) for adjacency lists plus Theta(n) queue state.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Kruskal sorts global edges; Prim grows one connected tree from a root. Both use the cut property, but Prim relies on a min-priority queue rather than union-find.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u10l6-E1',
              source: 'Key update',
              question: 'In Prim, what does key[v] mean before v is extracted?',
              solution: 'It is the cheapest currently known edge weight connecting v to the tree already built.'
            },
            {
              id: 'u10l6-E2',
              source: 'Root',
              question: 'What is parent[r] for Prim\'s starting root r?',
              solution: 'parent[r] is NIL because r starts the tree and has no attaching edge.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u10l6-M1',
              source: 'Comparison',
              question: 'Why does Prim not need union-find to avoid cycles?',
              solution: 'Prim only adds edges from the selected set A to a vertex outside A. Such an edge always adds a new vertex to the tree, so it cannot create a cycle.'
            },
            {
              id: 'u10l6-M2',
              source: 'Fibonacci heaps',
              question: 'Why does a Fibonacci heap improve Prim\'s asymptotic bound?',
              solution: 'Prim may perform O(m) DECREASE-KEY operations. Fibonacci heaps make those O(1) amortized, leaving O(n log n) for EXTRACT-MIN operations and O(m) for edge scans.'
            }
          ]
        }
      ],
      summary: 'Grow from a root; add the cheapest edge crossing the current set.',
      content: teachingArc({
        bigIdea: 'BFS-style growth using a min-priority queue keyed by attaching edge cost.',
        problem: 'same as Kruskal but with a different greedy frontier.',
        intuition: 'always extend with the cheapest edge that adds a new vertex.',
        formal: 'PRIM(G, r): key[r] = 0; key[v] = inf otherwise; Q = priority queue; while Q non-empty: u = EXTRACT-MIN; for each neighbour v: if v in Q and weight(u, v) < key[v]: parent[v] = u; key[v] = weight(u, v).',
        algorithm: 'see formal.',
        worked: 'Prim on a 5-node weighted graph from root r.',
        correctness: 'cut property again, with the cut being "in tree" vs "not in tree".',
        complexity: 'with binary heap: O(m log n). With Fibonacci heap: O(m + n log n).',
        trace: 'animate Prim and the priority queue.',
        takeaways: 'F-heap implementation is asymptotically optimal here.',
        practice: 'compare Prim and Kruskal on the same graph; both should give the same total weight.'
      }),
      practice: [
        mcq('algods-u10-l6-q1', 'With a Fibonacci heap, Prim\'s running time is:',
          ['O(n²)', 'O(m log n)', 'O(m + n log n)', 'O(m alpha(n))'],
          2, 'EXTRACT-MIN costs O(log n) amortised; DECREASE-KEY is O(1) amortised.')
      ]
    },
    {
      title: 'Shortest paths — Dijkstra and Bellman-Ford',
      durationMinutes: 30,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Single-source shortest paths ask for the minimum path distance from a source s to every vertex. Dijkstra and Bellman-Ford both use relaxation, but they schedule relaxations differently. Dijkstra is faster but requires nonnegative edge weights. Bellman-Ford is slower but handles negative edges and detects reachable negative-weight cycles.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Relaxation',
          text: 'Relaxing edge (u, v) checks whether the best known path to v improves by going through u. If d[v] > d[u] + w(u, v), set d[v] = d[u] + w(u, v) and parent[v] = u.'
        },
        {
          type: 'diagram',
          title: 'Relaxation updates an overestimate',
          caption: 'If the route through u is better than the current d[v], relaxation lowers d[v] and records u as predecessor.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Shortest path relaxation diagram">
  <defs>
    <marker id="u10l7-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Relaxation: improve v by going through u</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <circle cx="260" cy="215" r="42" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="260" y="210" fill="#1e3a8a">u</text><text x="260" y="232" font-size="13" fill="#1e3a8a">d=7</text>
    <circle cx="610" cy="215" r="42" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="610" y="210" fill="#991b1b">v</text><text x="610" y="232" font-size="13" fill="#991b1b">d=15</text>
    <line x1="302" y1="215" x2="568" y2="215" stroke="#334155" stroke-width="4" marker-end="url(#u10l7-arrow)"/>
    <text x="435" y="190" font-size="16" fill="#334155">w(u,v)=3</text>
    <rect x="270" y="315" width="420" height="52" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="346" font-size="15" fill="#334155">7 + 3 < 15, so set d[v] = 10 and parent[v] = u.</text>
    <text x="480" y="105" font-size="15" fill="#475569">All d-values are upper bounds until the algorithm proves them final.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Shared initialization and relaxation',
          level: 2
        },
        {
          type: 'code',
          title: 'INITIALIZE-SINGLE-SOURCE and RELAX',
          language: 'pseudocode',
          code: `INITIALIZE-SINGLE-SOURCE(G, s)
    for each vertex v in G.V
        v.d = infinity
        v.pi = NIL
    s.d = 0

RELAX(u, v, w)
    if v.d > u.d + w(u, v)
        v.d = u.d + w(u, v)
        v.pi = u`
        },
        {
          type: 'heading',
          text: 'Dijkstra',
          level: 2
        },
        {
          type: 'code',
          title: 'DIJKSTRA',
          language: 'pseudocode',
          code: `DIJKSTRA(G, w, s)
    INITIALIZE-SINGLE-SOURCE(G, s)
    S = empty set
    Q = G.V
    while Q is not empty
        u = EXTRACT-MIN(Q)
        S = S union {u}
        for each vertex v in G.Adj[u]
            RELAX(u, v, w)`
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Dijkstra requires nonnegative weights',
          text: 'Dijkstra finalizes a vertex when it is extracted from the priority queue. This is safe only when all edge weights are nonnegative; a later path through an unprocessed vertex cannot become cheaper by using a negative edge.'
        },
        {
          type: 'heading',
          text: 'Bellman-Ford',
          level: 2
        },
        {
          type: 'code',
          title: 'BELLMAN-FORD',
          language: 'pseudocode',
          code: `BELLMAN-FORD(G, w, s)
    INITIALIZE-SINGLE-SOURCE(G, s)
    for i = 1 to |G.V| - 1
        for each edge (u, v) in G.E
            RELAX(u, v, w)
    for each edge (u, v) in G.E
        if v.d > u.d + w(u, v)
            return false
    return true`
        },
        {
          type: 'heading',
          text: 'Worked comparison',
          level: 2
        },
        {
          type: 'table',
          caption: 'Which algorithm should you use?',
          columns: ['Situation', 'Dijkstra', 'Bellman-Ford'],
          rows: [
            ['All weights nonnegative', 'Preferred: faster with a good priority queue.', 'Correct but usually slower.'],
            ['Some negative edges, no negative cycle', 'Not safe.', 'Correct; computes shortest paths.'],
            ['Reachable negative-weight cycle', 'Not designed to detect it.', 'Detects it with the final extra pass.'],
            ['Unweighted graph', 'Works, but BFS is simpler and linear.', 'Works, but overkill.']
          ]
        },
        {
          type: 'table',
          caption: 'Bellman-Ford invariant by passes.',
          columns: ['After pass i', 'Guarantee'],
          rows: [
            ['0', 'Only s has distance 0; all others are infinity.'],
            ['1', 'All shortest paths using at most 1 edge are correct.'],
            ['2', 'All shortest paths using at most 2 edges are correct.'],
            ['|V| - 1', 'All simple shortest paths are correct if no reachable negative cycle exists.']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Dijkstra induction',
          text: 'Assume all extracted vertices have final shortest distances. The next extracted vertex u has the smallest tentative distance. With nonnegative edges, any path to another unextracted vertex and then back to u cannot be cheaper, so u.d is final.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Bellman-Ford path-length induction',
          text: 'After i full passes over all edges, every shortest path that uses at most i edges has been fully relaxed in order. Any simple shortest path has at most |V| - 1 edges, so |V| - 1 passes suffice unless a negative cycle is reachable.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Shortest-path costs.',
          columns: ['Algorithm', 'Time', 'When to use'],
          rows: [
            ['BFS', 'Theta(n + m)', 'Unweighted graphs or equal edge weights.'],
            ['Dijkstra with binary heap', 'O((n + m) log n), often written O(m log n)', 'Nonnegative weights.'],
            ['Dijkstra with Fibonacci heap', 'O(m + n log n)', 'Nonnegative weights, theoretical improvement.'],
            ['Bellman-Ford', 'O(nm)', 'Negative edges and negative-cycle detection.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'Relaxation is the common primitive. Dijkstra is faster but requires nonnegative weights. Bellman-Ford is slower but handles negative edges and reports reachable negative cycles.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u10l7-E1',
              source: 'Relaxation',
              question: 'If d[u] = 6, w(u, v) = 4, and d[v] = 13, what happens when RELAX(u, v, w) runs?',
              solution: 'Since 6 + 4 = 10 < 13, relaxation sets d[v] = 10 and parent[v] = u.'
            },
            {
              id: 'u10l7-E2',
              source: 'Algorithm choice',
              question: 'Which algorithm should you choose if a graph may contain negative edges but no negative cycles?',
              solution: 'Bellman-Ford. Dijkstra is not safe with negative edge weights.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u10l7-M1',
              source: 'Negative cycle',
              question: 'Why does Bellman-Ford perform one extra pass after |V| - 1 relaxation rounds?',
              solution: 'If any edge can still be relaxed, then some reachable path can keep getting cheaper beyond the length of a simple path, which implies a reachable negative-weight cycle.'
            },
            {
              id: 'u10l7-M2',
              source: 'Dijkstra condition',
              question: 'Why do nonnegative weights matter for Dijkstra\'s correctness?',
              solution: 'Once a vertex has the smallest tentative distance, any path reaching it later through unprocessed vertices would add only nonnegative edge weights, so it cannot become smaller. Negative edges break this finalization argument.'
            }
          ]
        }
      ],
      summary: 'Single-source shortest paths under non-negative or general weights.',
      content: teachingArc({
        bigIdea: 'relax edges in a smart order: by current best distance (Dijkstra) or by repeated rounds (Bellman-Ford).',
        problem: 'shortest distance from a source to every vertex.',
        intuition: 'Dijkstra: monotonic frontier of "settled" vertices. Bellman-Ford: V-1 rounds of edge relaxations.',
        formal: 'Dijkstra(G, s): same as Prim but with key d[v] = current best distance. Bellman-Ford(G, s): for V-1 rounds: relax every edge; final round detects negative cycles.',
        algorithm: 'see formal.',
        worked: 'Dijkstra on a 5-node non-negative graph; Bellman-Ford on a graph with one negative edge.',
        correctness: 'Dijkstra: induction on settle order. Bellman-Ford: shortest paths have at most V-1 edges.',
        complexity: 'Dijkstra: O(m + n log n) with F-heap. Bellman-Ford: O(n * m).',
        trace: 'animate the relaxations.',
        takeaways: 'use Dijkstra unless you have negative edges.',
        practice: 'detect a negative cycle by running an extra Bellman-Ford round.'
      }),
      practice: [
        mcq('algods-u10-l7-q1', 'Bellman-Ford is preferred over Dijkstra when:',
          ['The graph is dense.', 'You need O(m + n log n).', 'Edge weights may be negative.', 'You need parallelism.'],
          2, 'Dijkstra requires non-negative weights; Bellman-Ford handles negatives and detects negative cycles.')
      ]
    }
  ]
};

const u11 = {
  id: 'algods-u11',
  title: 'Dynamic Programming',
  summary: 'Optimal substructure, overlapping subproblems; LCS, Kadane, parenthesisation.',
  lessons: [
    {
      title: 'Optimal substructure and overlapping subproblems',
      durationMinutes: 25,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Dynamic programming is what you reach for after a plain recursive solution keeps solving the same smaller problems. The method has two separate ingredients: the recurrence must be correct because of optimal substructure, and caching or tabulation must be useful because the subproblems overlap.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Optimal substructure',
          text: 'A problem has optimal substructure when an optimal solution to the whole instance can be assembled from optimal solutions to smaller instances. The usual proof is a cut-and-paste argument: if one chosen part were not optimal, replacing it with a better part would improve the whole solution.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Overlapping subproblems',
          text: 'A problem has overlapping subproblems when the natural recursion revisits the same subinstances many times. Overlap does not make a recurrence true; it makes memoization or tabulation worthwhile.'
        },
        {
          type: 'diagram',
          title: 'From repeated recursion tree to subproblem DAG',
          caption: 'DP collapses repeated calls into one stored answer per distinct subproblem.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Dynamic programming recursion tree and subproblem DAG diagram">
  <defs>
    <marker id="u11l1-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">DP stores each distinct subproblem once</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="245" y="88" font-size="15" fill="#475569">naive recursion repeats work</text>
    <circle cx="245" cy="125" r="30" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="245" y="131" fill="#1e3a8a">F5</text>
    <circle cx="155" cy="210" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="155" y="216" fill="#064e3b">F4</text>
    <circle cx="335" cy="210" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="335" y="216" fill="#92400e">F3</text>
    <circle cx="95" cy="305" r="26" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="95" y="311" fill="#991b1b">F3</text>
    <circle cx="215" cy="305" r="26" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="215" y="311" fill="#4c1d95">F2</text>
    <circle cx="295" cy="305" r="26" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="295" y="311" fill="#991b1b">F2</text>
    <circle cx="375" cy="305" r="26" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/><text x="375" y="311" fill="#075985">F1</text>
    <line x1="223" y1="147" x2="177" y2="190" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="267" y1="147" x2="313" y2="190" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="137" y1="232" x2="110" y2="283" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="173" y1="232" x2="202" y2="283" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="321" y1="234" x2="306" y2="282" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="349" y1="234" x2="364" y2="282" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <text x="195" y="360" font-size="14" fill="#dc2626">F3 and F2 appear more than once</text>

    <text x="705" y="88" font-size="15" fill="#475569">DP subproblem graph stores one value</text>
    <circle cx="705" cy="125" r="30" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="705" y="131" fill="#1e3a8a">F5</text>
    <circle cx="610" cy="210" r="28" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="610" y="216" fill="#064e3b">F4</text>
    <circle cx="800" cy="210" r="28" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="800" y="216" fill="#92400e">F3</text>
    <circle cx="705" cy="300" r="26" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="705" y="306" fill="#4c1d95">F2</text>
    <circle cx="840" cy="300" r="26" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/><text x="840" y="306" fill="#075985">F1</text>
    <line x1="683" y1="147" x2="632" y2="190" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="727" y1="147" x2="778" y2="190" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="632" y1="229" x2="682" y2="281" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="779" y1="232" x2="724" y2="281" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <line x1="818" y1="232" x2="828" y2="277" stroke="#334155" stroke-width="3" marker-end="url(#u11l1-arrow)"/>
    <text x="735" y="360" font-size="14" fill="#0f766e">each Fk is computed once, then reused</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'A CLRS anchor: rod cutting',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'In rod cutting, a rod of length n may be sold whole or cut into pieces. If p[i] is the price of a piece of length i, the best revenue r[n] chooses the first cut length i and then optimally solves the remaining length n - i.'
        },
        {
          type: 'formula',
          latex: 'r_n = \\max_{1 \\le i \\le n}(p_i + r_{n-i}), \\quad r_0 = 0',
          display: true,
          caption: 'Rod-cutting recurrence: choose the first piece, then solve the leftover optimally.'
        },
        {
          type: 'code',
          title: 'CUT-ROD',
          language: 'pseudocode',
          code: `CUT-ROD(p, n)
    if n == 0
        return 0
    q = -infinity
    for i = 1 to n
        q = max(q, p[i] + CUT-ROD(p, n - i))
    return q`
        },
        {
          type: 'table',
          caption: 'Worked rod-cutting values for prices p[1..4] = [1, 5, 8, 9].',
          columns: ['n', 'Best split considered by the recurrence', 'r[n]'],
          rows: [
            ['0', 'empty rod', '0'],
            ['1', '1', '1'],
            ['2', '2 beats 1+1', '5'],
            ['3', '3 beats 1+2 and 2+1', '8'],
            ['4', '2+2 beats 4', '10']
          ]
        },
        {
          type: 'table',
          caption: 'Separate the two DP signals.',
          columns: ['Question', 'What it checks', 'Rod-cutting answer'],
          rows: [
            ['Can the optimal answer be built from optimal smaller answers?', 'optimal substructure', 'Yes. After choosing first piece i, the leftover length n - i must itself have maximum revenue.'],
            ['Does the recursion solve the same subproblem more than once?', 'overlapping subproblems', 'Yes. Lengths such as 1, 2, and 3 are reached through many different first-cut histories.'],
            ['Does overlap prove the recurrence?', 'no', 'No. The recurrence is justified by the cut-and-paste argument; overlap only tells us caching helps.']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Do not confuse the two ingredients',
          text: 'Optimal substructure is a statement about correctness of the recurrence. Overlapping subproblems is a statement about repeated computation. A problem can have optimal substructure without much overlap, and then DP may not buy much.'
        },
        {
          type: 'heading',
          text: 'Correctness reasoning',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Cut-and-paste for rod cutting',
          text: 'Take an optimal solution for length n and let its first piece have length i. If the remaining pieces were not optimal for length n - i, replacing them by a better solution for that remaining length would increase the total revenue, contradicting optimality. Therefore the recurrence may combine p[i] with r[n - i].'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'What changes when we store subproblem answers?',
          columns: ['Approach', 'Distinct subproblems', 'Repeated work', 'Typical cost for rod cutting'],
          rows: [
            ['Plain recursion', 'n + 1 lengths', 'massive; the same lengths are recomputed many times', 'exponential time'],
            ['Memoized top-down DP', 'n + 1 lengths', 'none after the first visit', 'Theta(n^2) time, Theta(n) table plus recursion stack'],
            ['Bottom-up DP', 'n + 1 lengths', 'none', 'Theta(n^2) time, Theta(n) table']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'For a DP proof, first state the subproblem, then prove the recurrence by optimal substructure, then explain that the number of distinct subproblems and transitions gives the runtime. Mention overlap only when justifying memoization or tabulation.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u11l1-E1',
              source: 'Definitions',
              question: 'Which DP ingredient justifies replacing a part of an optimal solution with an optimal solution to the corresponding subproblem?',
              solution: 'Optimal substructure. The replacement argument says a nonoptimal part would let us improve the whole solution.'
            },
            {
              id: 'u11l1-E2',
              source: 'Overlap',
              question: 'In Fibonacci recursion, why is F(3) an overlapping subproblem when computing F(5)?',
              solution: 'F(3) is reached from F(5) through F(4) and also directly as the second child of F(5), so the naive recursion computes it more than once.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u11l1-M1',
              source: 'Rod cutting',
              question: 'For p[1..4] = [1, 5, 8, 9], compute r[4] using r[n] = max over i of p[i] + r[n-i].',
              solution: 'r[0]=0, r[1]=1, r[2]=5, r[3]=8. For n=4: max(1+r[3], 5+r[2], 8+r[1], 9+r[0]) = max(9,10,9,9) = 10.'
            },
            {
              id: 'u11l1-M2',
              source: 'DP diagnosis',
              question: 'A recursion has optimal substructure but every recursive call is to a unique subproblem that is never revisited. Is dynamic programming still the main win?',
              solution: 'Usually no. The recurrence may be correct, but without overlap there is little repeated work to remove. A divide-and-conquer algorithm may already be efficient.'
            }
          ]
        }
      ],
      summary: 'The two prerequisites for DP.',
      content: teachingArc({
        bigIdea: 'when an optimal answer is built from optimal answers to sub-instances and those sub-instances repeat, tabulate.',
        problem: 'recognise when a brute-force recursion is exponentially redundant.',
        intuition: 'memoise sub-instances; reuse instead of recompute.',
        formal: 'optimal substructure: optimal solution to the whole composes optimal solutions to parts. Overlapping subproblems: parts repeat.',
        algorithm: 'no algorithm; criterion.',
        worked: 'check Fibonacci numbers: optimal substructure trivial, overlap massive.',
        correctness: '"cut and paste" argument: if a part were not optimal, replace it and improve the whole.',
        complexity: 'reduces exponential recursion to polynomial.',
        trace: 'identify subproblem reuse in a Fibonacci recursion tree.',
        takeaways: 'always ask "do parts of my problem repeat?".',
        practice: 'argue why LCS has optimal substructure.'
      }),
      practice: [
        mcq('algods-u11-l1-q1', 'DP requires that the problem has:',
          ['Greedy choice property.', 'Optimal substructure and overlapping subproblems.', 'Monotone weights.', 'Symmetry.'],
          1, 'Both criteria are needed; greedy alone is a different paradigm.')
      ]
    },
    {
      title: 'Top-down vs bottom-up',
      durationMinutes: 20,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Once the recurrence is correct, dynamic programming is mostly about evaluation order. Top-down memoization keeps the recursive shape and stores answers as they are discovered. Bottom-up tabulation chooses an order that guarantees every dependency is already available before it is used.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Top-down memoization',
          text: 'Memoization adds a cache to the recursive algorithm. The first call for a subproblem computes and stores the answer; later calls return the stored value immediately.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Bottom-up tabulation',
          text: 'Tabulation fills a table from smaller subproblems to larger subproblems. It avoids recursion and makes the dependency order explicit in loops.'
        },
        {
          type: 'diagram',
          title: 'Same recurrence, different evaluation order',
          caption: 'Top-down follows demand from the query; bottom-up fills all smaller entries first.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Top down memoization versus bottom up tabulation diagram">
  <defs>
    <marker id="u11l2-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Memoization and tabulation compute the same DP values</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="245" y="92" font-size="16" fill="#1e3a8a">top-down: call what is needed</text>
    <rect x="80" y="120" width="330" height="220" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <circle cx="245" cy="160" r="28" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="245" y="166" fill="#1e3a8a">r5</text>
    <circle cx="155" cy="235" r="25" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="155" y="241" fill="#064e3b">r4</text>
    <circle cx="245" cy="235" r="25" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="245" y="241" fill="#92400e">r3</text>
    <circle cx="335" cy="235" r="25" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="335" y="241" fill="#4c1d95">r2</text>
    <circle cx="200" cy="300" r="23" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="200" y="306" fill="#991b1b">r1</text>
    <circle cx="290" cy="300" r="23" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/><text x="290" y="306" fill="#075985">r0</text>
    <line x1="225" y1="181" x2="174" y2="216" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <line x1="245" y1="188" x2="245" y2="210" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <line x1="265" y1="181" x2="318" y2="216" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <line x1="228" y1="253" x2="210" y2="280" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <line x1="262" y1="253" x2="280" y2="280" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <text x="245" y="372" font-size="14" fill="#475569">recursive stack plus memo table</text>

    <text x="705" y="92" font-size="16" fill="#0f766e">bottom-up: fill dependency order</text>
    <rect x="540" y="120" width="330" height="220" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <g font-size="15">
      <rect x="585" y="180" width="52" height="52" rx="10" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/><text x="611" y="212" fill="#075985">r0</text>
      <rect x="646" y="180" width="52" height="52" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="3"/><text x="672" y="212" fill="#991b1b">r1</text>
      <rect x="707" y="180" width="52" height="52" rx="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="733" y="212" fill="#4c1d95">r2</text>
      <rect x="768" y="180" width="52" height="52" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="794" y="212" fill="#92400e">r3</text>
      <rect x="646" y="255" width="52" height="52" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="672" y="287" fill="#064e3b">r4</text>
      <rect x="707" y="255" width="52" height="52" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="733" y="287" fill="#1e3a8a">r5</text>
    </g>
    <line x1="637" y1="206" x2="646" y2="206" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <line x1="698" y1="206" x2="707" y2="206" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <line x1="759" y1="206" x2="768" y2="206" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <line x1="794" y1="232" x2="698" y2="268" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <line x1="698" y1="281" x2="707" y2="281" stroke="#334155" stroke-width="3" marker-end="url(#u11l2-arrow)"/>
    <text x="705" y="372" font-size="14" fill="#475569">loop order makes dependencies available</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'CLRS-style rod-cutting implementations',
          level: 2
        },
        {
          type: 'code',
          title: 'MEMOIZED-CUT-ROD',
          language: 'pseudocode',
          code: `MEMOIZED-CUT-ROD(p, n)
    let r[0..n] be a new array
    for i = 0 to n
        r[i] = -infinity
    return MEMOIZED-CUT-ROD-AUX(p, n, r)

MEMOIZED-CUT-ROD-AUX(p, n, r)
    if r[n] >= 0
        return r[n]
    if n == 0
        q = 0
    else
        q = -infinity
        for i = 1 to n
            q = max(q, p[i] + MEMOIZED-CUT-ROD-AUX(p, n - i, r))
    r[n] = q
    return q`
        },
        {
          type: 'code',
          title: 'BOTTOM-UP-CUT-ROD',
          language: 'pseudocode',
          code: `BOTTOM-UP-CUT-ROD(p, n)
    let r[0..n] be a new array
    r[0] = 0
    for j = 1 to n
        q = -infinity
        for i = 1 to j
            q = max(q, p[i] + r[j - i])
        r[j] = q
    return r[n]`
        },
        {
          type: 'table',
          caption: 'Bottom-up trace for p[1..5] = [1, 5, 8, 9, 10].',
          columns: ['j', 'Candidates p[i] + r[j-i]', 'r[j]'],
          rows: [
            ['1', '1 + r[0] = 1', '1'],
            ['2', '1 + r[1] = 2; 5 + r[0] = 5', '5'],
            ['3', '1 + r[2] = 6; 5 + r[1] = 6; 8 + r[0] = 8', '8'],
            ['4', '1 + r[3] = 9; 5 + r[2] = 10; 8 + r[1] = 9; 9 + r[0] = 9', '10'],
            ['5', '1 + r[4] = 11; 5 + r[3] = 13; 8 + r[2] = 13; 9 + r[1] = 10; 10 + r[0] = 10', '13']
          ]
        },
        {
          type: 'heading',
          text: 'Choosing a style',
          level: 2
        },
        {
          type: 'table',
          caption: 'Memoization and tabulation usually share the same asymptotic bound but differ in engineering tradeoffs.',
          columns: ['Feature', 'Top-down memoization', 'Bottom-up tabulation'],
          rows: [
            ['Starting point', 'Natural recursive recurrence', 'Dependency graph or table order'],
            ['Subproblems computed', 'Only subproblems reached by the initial query', 'Usually every table entry in the chosen region'],
            ['Overhead', 'Recursive calls and stack frames', 'Loop overhead, often better cache locality'],
            ['Failure mode', 'Deep recursion can overflow the call stack', 'Wrong loop order reads uninitialized dependencies'],
            ['When it feels best', 'Sparse reachable state space or complex branching', 'Dense tables with simple dependencies']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Bottom-up order must respect dependencies',
          text: 'A table is not automatically a DP. The loop order is correct only if every entry is filled after all entries it depends on. For rod cutting, r[j] depends only on r[0..j-1], so increasing j is safe.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Same recurrence, same values',
          text: 'Both implementations compute the recurrence for r[j]. Memoization computes r[j] the first time it is requested and reuses it afterward. Tabulation proves by induction on j that r[0], r[1], ..., r[j-1] are correct before computing r[j], so every candidate p[i] + r[j-i] uses a correct subanswer.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Rod-cutting cost comparison.',
          columns: ['Implementation', 'Time', 'Extra space', 'Reason'],
          rows: [
            ['Memoized top-down', 'Theta(n^2)', 'Theta(n) table plus O(n) recursion depth', 'Each length j is solved once, and solving j scans i = 1..j.'],
            ['Bottom-up', 'Theta(n^2)', 'Theta(n) table', 'The nested loops perform 1 + 2 + ... + n transitions.'],
            ['Plain recursion', 'exponential', 'O(n) recursion depth', 'It recomputes the same lengths many times.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'When asked to convert a recurrence to DP, identify the table index, initialize base cases, choose an order that satisfies dependencies, and count table entries times transitions per entry.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u11l2-E1',
              source: 'Vocabulary',
              question: 'Which DP style keeps the recursive program shape and adds a cache?',
              solution: 'Top-down memoization.'
            },
            {
              id: 'u11l2-E2',
              source: 'Dependency order',
              question: 'Why does bottom-up rod cutting fill r[1], r[2], ..., r[n] in increasing order?',
              solution: 'Because r[j] depends on smaller entries r[j-i], all of which have indices less than j.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u11l2-M1',
              source: 'Complexity',
              question: 'Explain why BOTTOM-UP-CUT-ROD is Theta(n^2), not Theta(n).',
              solution: 'There are n outer iterations, but iteration j scans j possible first cuts. The total number of transitions is 1 + 2 + ... + n = Theta(n^2).'
            },
            {
              id: 'u11l2-M2',
              source: 'Tradeoffs',
              question: 'Give one case where top-down memoization may compute fewer states than bottom-up tabulation.',
              solution: 'If the recurrence has a large table region but the initial query reaches only a small subset of states, memoization computes only that reachable subset, while a simple bottom-up loop may fill the whole region.'
            }
          ]
        }
      ],
      summary: 'Memoization and tabulation; tradeoffs.',
      content: teachingArc({
        bigIdea: 'either cache recursive calls (top-down) or fill a table iteratively (bottom-up).',
        problem: 'pick the implementation style.',
        intuition: 'top-down is closer to the recursion you wrote; bottom-up is closer to the table you would draw.',
        formal: 'top-down: recursive function with a memo. Bottom-up: nested loops over the DP table.',
        algorithm: 'see formal.',
        worked: 'compute fib(10) both ways; both are O(n).',
        correctness: 'identical answers; different evaluation order.',
        complexity: 'same asymptotic time, different constant factors.',
        trace: 'compare call counts.',
        takeaways: 'bottom-up wins on cache locality; top-down wins on partial computation.',
        practice: 'rewrite Fibonacci both ways and benchmark on n = 10⁵.'
      }),
      practice: [
        mcq('algods-u11-l2-q1', 'Compared to memoization, tabulation:',
          ['Has worse asymptotic complexity.', 'Has better cache locality and avoids recursion overhead.', 'Always uses less memory.', 'Cannot solve overlapping subproblems.'],
          1, 'Tabulation iterates the table linearly; memoization pays for recursion frames and pointer chasing.')
      ]
    },
    {
      title: 'Longest common subsequence',
      durationMinutes: 30,
      type: 'interactive',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The longest common subsequence problem asks for the longest sequence that appears in two strings in the same relative order, not necessarily contiguously. LCS is a model 2D dynamic program: define a subproblem for every pair of prefixes, fill a table of lengths, and optionally follow back-pointers to recover an actual subsequence.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Subsequence versus substring',
          text: 'A subsequence may skip characters while preserving order. For example, BCA is a subsequence of ABCBDAB. A substring must be contiguous, so BCA is not a substring of ABCBDAB.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'LCS subproblem',
          text: 'Let c[i,j] be the length of an LCS of the prefix X[1..i] and the prefix Y[1..j]. The answer for the full strings X[1..m] and Y[1..n] is c[m,n].'
        },
        {
          type: 'diagram',
          title: 'Each LCS cell looks left, up, and diagonal',
          caption: 'The diagonal is used when the current characters match; otherwise the table chooses the better of dropping one current character.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Longest common subsequence dynamic programming grid">
  <defs>
    <marker id="u11l3-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">LCS fills a prefix-by-prefix table</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <text x="190" y="98" font-size="15" fill="#475569">Y prefix index j</text>
    <text x="80" y="225" font-size="15" fill="#475569" transform="rotate(-90 80 225)">X prefix index i</text>
    <g font-size="15">
      <rect x="130" y="120" width="70" height="55" fill="#ffffff" stroke="#cbd5e1"/><text x="165" y="153" fill="#334155">c[i-1,j-1]</text>
      <rect x="200" y="120" width="70" height="55" fill="#ffffff" stroke="#cbd5e1"/><text x="235" y="153" fill="#334155">c[i-1,j]</text>
      <rect x="130" y="175" width="70" height="55" fill="#ffffff" stroke="#cbd5e1"/><text x="165" y="208" fill="#334155">c[i,j-1]</text>
      <rect x="200" y="175" width="70" height="55" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="235" y="208" fill="#1e3a8a">c[i,j]</text>
      <line x1="168" y1="158" x2="212" y2="190" stroke="#16a34a" stroke-width="4" marker-end="url(#u11l3-arrow)"/>
      <line x1="235" y1="175" x2="235" y2="162" stroke="#d97706" stroke-width="4" marker-end="url(#u11l3-arrow)"/>
      <line x1="200" y1="203" x2="187" y2="203" stroke="#dc2626" stroke-width="4" marker-end="url(#u11l3-arrow)"/>
    </g>
    <rect x="390" y="105" width="430" height="220" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="605" y="140" font-size="17" fill="#0f2038">Recurrence decision at c[i,j]</text>
    <text x="605" y="185" font-size="15" fill="#16a34a">If X[i] = Y[j]: take diagonal + 1.</text>
    <text x="605" y="230" font-size="15" fill="#dc2626">If X[i] != Y[j]: drop X[i] or drop Y[j].</text>
    <text x="605" y="275" font-size="15" fill="#475569">Backtracking reverses these choices to print a sequence.</text>
    <rect x="180" y="310" width="600" height="52" rx="16" fill="#ecfdf5" stroke="#16a34a"/>
    <text x="480" y="342" font-size="15" fill="#064e3b">Optimal substructure comes from the last-character case split.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'The recurrence',
          level: 2
        },
        {
          type: 'formula',
          latex: 'c[i,0] = c[0,j] = 0',
          display: true,
          caption: 'The empty prefix has LCS length 0 with any prefix.'
        },
        {
          type: 'formula',
          latex: 'c[i,j] = c[i-1,j-1] + 1 \\quad \\text{if } X_i = Y_j',
          display: true,
          caption: 'Matching last characters must be used together in this case.'
        },
        {
          type: 'formula',
          latex: 'c[i,j] = \\max(c[i-1,j], c[i,j-1]) \\quad \\text{if } X_i \\ne Y_j',
          display: true,
          caption: 'When the last characters differ, at least one of them is not used by an LCS.'
        },
        {
          type: 'code',
          title: 'LCS-LENGTH',
          language: 'pseudocode',
          code: `LCS-LENGTH(X, Y)
    m = X.length
    n = Y.length
    let b[1..m, 1..n] and c[0..m, 0..n] be new tables
    for i = 1 to m
        c[i, 0] = 0
    for j = 0 to n
        c[0, j] = 0
    for i = 1 to m
        for j = 1 to n
            if X[i] == Y[j]
                c[i, j] = c[i - 1, j - 1] + 1
                b[i, j] = "diag"
            else if c[i - 1, j] >= c[i, j - 1]
                c[i, j] = c[i - 1, j]
                b[i, j] = "up"
            else
                c[i, j] = c[i, j - 1]
                b[i, j] = "left"
    return c and b`
        },
        {
          type: 'code',
          title: 'PRINT-LCS',
          language: 'pseudocode',
          code: `PRINT-LCS(b, X, i, j)
    if i == 0 or j == 0
        return
    if b[i, j] == "diag"
        PRINT-LCS(b, X, i - 1, j - 1)
        print X[i]
    else if b[i, j] == "up"
        PRINT-LCS(b, X, i - 1, j)
    else
        PRINT-LCS(b, X, i, j - 1)`
        },
        {
          type: 'heading',
          text: 'Worked table',
          level: 2
        },
        {
          type: 'table',
          caption: 'LCS length table for X = ABCBDAB and Y = BDCABA. The final answer is c[7,6] = 4.',
          columns: ['X prefix / Y prefix', '-', 'B', 'D', 'C', 'A', 'B', 'A'],
          rows: [
            ['-', '0', '0', '0', '0', '0', '0', '0'],
            ['A', '0', '0', '0', '0', '1', '1', '1'],
            ['AB', '0', '1', '1', '1', '1', '2', '2'],
            ['ABC', '0', '1', '1', '2', '2', '2', '2'],
            ['ABCB', '0', '1', '1', '2', '2', '3', '3'],
            ['ABCBD', '0', '1', '2', '2', '2', '3', '3'],
            ['ABCBDA', '0', '1', '2', '2', '3', '3', '4'],
            ['ABCBDAB', '0', '1', '2', '2', '3', '4', '4']
          ]
        },
        {
          type: 'table',
          caption: 'One backtracking path that prints BCBA.',
          columns: ['Cell', 'Characters compared', 'Decision', 'Output effect'],
          rows: [
            ['c[7,6]', 'B versus A', 'tie goes up', 'no character yet'],
            ['c[6,6]', 'A versus A', 'diag', 'print A after recursive call'],
            ['c[5,5]', 'D versus B', 'up', 'skip D'],
            ['c[4,5]', 'B versus B', 'diag', 'print B after recursive call'],
            ['c[3,4]', 'C versus A', 'left', 'skip A from Y'],
            ['c[3,3]', 'C versus C', 'diag', 'print C after recursive call'],
            ['c[2,2]', 'B versus D', 'left', 'skip D from Y'],
            ['c[2,1]', 'B versus B', 'diag', 'print B after recursive call']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Matching last characters',
          text: 'If X[i] equals Y[j], some LCS of the two prefixes can end with that character. Removing that final matched character leaves an LCS of X[1..i-1] and Y[1..j-1], so the length is c[i-1,j-1] + 1.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Different last characters',
          text: 'If X[i] and Y[j] differ, an LCS cannot use both as its final matched character. Therefore at least one is omitted, so the optimum is the larger of the two subproblems that drop X[i] or drop Y[j].'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Backtracking',
          text: 'The b table records which recurrence case produced each c value. Following those arrows from c[m,n] to a base row or column visits exactly the matched diagonal choices, and printing them after the recursive calls restores the left-to-right order.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'LCS complexity.',
          columns: ['Task', 'Cost'],
          rows: [
            ['Fill c and b tables', 'Theta(mn) time'],
            ['Store all lengths and back-pointers', 'Theta(mn) space'],
            ['Compute only the LCS length', 'Theta(mn) time and Theta(min(m,n)) space with two rows'],
            ['Recover an actual LCS using b', 'O(m + n) backtracking time after the table is filled']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'State the prefix subproblem first. The LCS recurrence is diagonal plus one on a match; otherwise max of up and left. Length-only optimization can use two rows, but printing a sequence needs backtracking information or recomputation.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u11l3-E1',
              source: 'Definitions',
              question: 'Is ACE a subsequence of ABCDE? Is it a substring?',
              solution: 'ACE is a subsequence because A, C, and E occur in order. It is not a substring because the characters are not contiguous.'
            },
            {
              id: 'u11l3-E2',
              source: 'Base cases',
              question: 'What is c[i,0] in the LCS table, and why?',
              solution: 'c[i,0] = 0 because any string and the empty string have no common nonempty subsequence.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u11l3-M1',
              source: 'Small LCS',
              question: 'Compute the LCS length of X = ABC and Y = BAC.',
              solution: 'The LCS length is 2. Examples include AC and BC.'
            },
            {
              id: 'u11l3-M2',
              source: 'Backtracking',
              question: 'If X[i] equals Y[j] during LCS backtracking, which cell do you visit next and what character is included?',
              solution: 'Visit c[i-1,j-1] next and include X[i] (the same as Y[j]) in the LCS, printed after the recursive call so the order is correct.'
            }
          ]
        }
      ],
      summary: 'Θ(mn) table; back-pointers recover the LCS itself.',
      content: teachingArc({
        bigIdea: 'c[i, j] = length of LCS of X[1..i], Y[1..j].',
        problem: 'find the longest sequence common to two strings.',
        intuition: 'either align both last chars (X[i] == Y[j]) or drop one of them.',
        formal: 'c[i, j] = c[i-1, j-1] + 1 if X[i] = Y[j]; else max(c[i-1, j], c[i, j-1]).',
        algorithm: 'fill table row by row; trace back from c[m, n] to recover the LCS.',
        worked: 'X = ABCBDAB, Y = BDCAB; LCS length 4 (e.g., BCBA).',
        correctness: 'cut-and-paste argument on the recurrence.',
        complexity: 'Θ(mn) time, Θ(mn) space (or Θ(min(m, n)) with row-only storage).',
        trace: 'animate the table fill and backtrace.',
        takeaways: 'classic 2D DP; the back-pointers recover the actual sequence.',
        practice: 'compute LCS for two short strings of your choice.'
      }),
      practice: [
        mcq('algods-u11-l3-q1', 'LCS table size is:',
          ['m + n', 'mn', 'm log n', 'min(m, n)'],
          1, 'A standard DP table indexed by both prefixes is mn.')
      ]
    },
    {
      title: 'Maximum subarray (Kadane)',
      durationMinutes: 25,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The maximum subarray problem asks for a contiguous, nonempty segment of an array with maximum possible sum. Kadane turns the problem into a one-state dynamic program: at each index, the best subarray ending here either extends the best subarray ending at the previous index or starts fresh at the current element.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Maximum subarray',
          text: 'Given A[1..n], find indices low and high with 1 <= low <= high <= n that maximize A[low] + A[low+1] + ... + A[high]. This lesson uses the nonempty version, so an all-negative array returns the least negative element.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Kadane invariant',
          text: 'After processing A[i], ending_sum is the maximum sum of any nonempty subarray that ends exactly at i, and best_sum is the maximum sum of any nonempty subarray seen anywhere in A[1..i].'
        },
        {
          type: 'diagram',
          title: 'Extend or restart',
          caption: 'For the standard example, the best segment is A[4..7] = [4, -1, 2, 1] with sum 6.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Kadane maximum subarray diagram">
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Kadane keeps the best subarray ending at the current index</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <g font-size="16">
      <rect x="95" y="145" width="76" height="66" rx="12" fill="#ffffff" stroke="#cbd5e1"/><text x="133" y="183" fill="#334155">-2</text><text x="133" y="232" font-size="13" fill="#64748b">1</text>
      <rect x="180" y="145" width="76" height="66" rx="12" fill="#ffffff" stroke="#cbd5e1"/><text x="218" y="183" fill="#334155">1</text><text x="218" y="232" font-size="13" fill="#64748b">2</text>
      <rect x="265" y="145" width="76" height="66" rx="12" fill="#ffffff" stroke="#cbd5e1"/><text x="303" y="183" fill="#334155">-3</text><text x="303" y="232" font-size="13" fill="#64748b">3</text>
      <rect x="350" y="145" width="76" height="66" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="388" y="183" fill="#064e3b">4</text><text x="388" y="232" font-size="13" fill="#64748b">4</text>
      <rect x="435" y="145" width="76" height="66" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="473" y="183" fill="#064e3b">-1</text><text x="473" y="232" font-size="13" fill="#64748b">5</text>
      <rect x="520" y="145" width="76" height="66" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="558" y="183" fill="#064e3b">2</text><text x="558" y="232" font-size="13" fill="#64748b">6</text>
      <rect x="605" y="145" width="76" height="66" rx="12" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="643" y="183" fill="#064e3b">1</text><text x="643" y="232" font-size="13" fill="#64748b">7</text>
      <rect x="690" y="145" width="76" height="66" rx="12" fill="#ffffff" stroke="#cbd5e1"/><text x="728" y="183" fill="#334155">-5</text><text x="728" y="232" font-size="13" fill="#64748b">8</text>
      <rect x="775" y="145" width="76" height="66" rx="12" fill="#ffffff" stroke="#cbd5e1"/><text x="813" y="183" fill="#334155">4</text><text x="813" y="232" font-size="13" fill="#64748b">9</text>
    </g>
    <path d="M350 260 H681" stroke="#16a34a" stroke-width="7" stroke-linecap="round"/>
    <text x="516" y="295" font-size="16" fill="#064e3b">best_sum = 4 + (-1) + 2 + 1 = 6</text>
    <rect x="198" y="330" width="564" height="48" rx="16" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="360" font-size="15" fill="#334155">At each cell: extend previous ending_sum, or restart at this element.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'One-state recurrence',
          level: 2
        },
        {
          type: 'formula',
          latex: 'E_i = \\max(A[i], E_{i-1} + A[i])',
          display: true,
          caption: 'E_i is the best nonempty subarray sum ending exactly at i.'
        },
        {
          type: 'formula',
          latex: 'B_i = \\max(B_{i-1}, E_i)',
          display: true,
          caption: 'B_i is the best nonempty subarray sum anywhere in the prefix A[1..i].'
        },
        {
          type: 'code',
          title: 'KADANE-MAXIMUM-SUBARRAY',
          language: 'pseudocode',
          code: `KADANE-MAXIMUM-SUBARRAY(A)
    ending_sum = A[1]
    best_sum = A[1]
    current_low = 1
    best_low = 1
    best_high = 1
    for i = 2 to A.length
        if ending_sum + A[i] < A[i]
            ending_sum = A[i]
            current_low = i
        else
            ending_sum = ending_sum + A[i]
        if best_sum < ending_sum
            best_sum = ending_sum
            best_low = current_low
            best_high = i
    return (best_low, best_high, best_sum)`
        },
        {
          type: 'heading',
          text: 'Worked trace',
          level: 2
        },
        {
          type: 'table',
          caption: 'Trace on A = [-2, 1, -3, 4, -1, 2, 1, -5, 4].',
          columns: ['i', 'A[i]', 'Decision for ending_sum', 'ending_sum', 'best_sum and interval'],
          rows: [
            ['1', '-2', 'initialize', '-2', '-2 at [1,1]'],
            ['2', '1', 'restart at 1', '1', '1 at [2,2]'],
            ['3', '-3', 'extend: 1 + (-3)', '-2', '1 at [2,2]'],
            ['4', '4', 'restart at 4', '4', '4 at [4,4]'],
            ['5', '-1', 'extend: 4 + (-1)', '3', '4 at [4,4]'],
            ['6', '2', 'extend: 3 + 2', '5', '5 at [4,6]'],
            ['7', '1', 'extend: 5 + 1', '6', '6 at [4,7]'],
            ['8', '-5', 'extend: 6 + (-5)', '1', '6 at [4,7]'],
            ['9', '4', 'extend: 1 + 4', '5', '6 at [4,7]']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'The zero-reset variant solves a different convention',
          text: 'Some presentations set ending_sum = max(0, ending_sum + A[i]). That allows the empty subarray and returns 0 on an all-negative input. CLRS-style maximum subarray is usually nonempty, so initialize from A[1] and compare against A[i].'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Ending-at-i invariant',
          text: 'Every nonempty subarray ending at i either consists only of A[i] or extends a nonempty subarray ending at i - 1. By the induction hypothesis, ending_sum before the update is the best possible extension source, so max(A[i], ending_sum + A[i]) gives the best subarray ending at i.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Global best invariant',
          text: 'After computing the best subarray ending at i, the best subarray in A[1..i] is either the previous global best in A[1..i-1] or this new ending-at-i subarray. Updating best_sum with max(best_sum, ending_sum) preserves the invariant.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Maximum-subarray algorithms.',
          columns: ['Algorithm', 'Time', 'Extra space', 'Note'],
          rows: [
            ['Brute force all intervals with prefix sums', 'Theta(n^2)', 'Theta(n) or Theta(1)', 'Checks every low, high pair.'],
            ['CLRS divide-and-conquer', 'Theta(n log n)', 'Theta(log n) recursion stack', 'Uses best crossing subarray.'],
            ['Kadane DP', 'Theta(n)', 'Theta(1)', 'One pass, constant state.']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'State the invariant exactly: ending_sum is best among subarrays that must end at the current index. The global answer is a second variable. Initialize with A[1] for the nonempty version.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u11l4-E1',
              source: 'One update',
              question: 'Suppose ending_sum = 3 and the next value is A[i] = -5. What is the new ending_sum for the nonempty Kadane recurrence?',
              solution: 'max(A[i], ending_sum + A[i]) = max(-5, 3 - 5) = max(-5, -2) = -2, so it extends.'
            },
            {
              id: 'u11l4-E2',
              source: 'All negative',
              question: 'For A = [-5, -2, -7], what should nonempty Kadane return?',
              solution: 'It should return -2 at interval [2,2], the maximum sum over all nonempty contiguous subarrays.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u11l4-M1',
              source: 'Trace',
              question: 'Run Kadane on [3, -2, 5, -1, 6, -3]. What interval and sum are returned?',
              solution: 'The best interval is [1,5] with sum 11: 3 - 2 + 5 - 1 + 6 = 11. Extending through the final -3 lowers ending_sum to 8, so best_sum remains 11.'
            },
            {
              id: 'u11l4-M2',
              source: 'Invariant',
              question: 'Why is it not enough to store only best_sum without ending_sum?',
              solution: 'best_sum may describe an interval that ended earlier and cannot necessarily be extended to the current index. To decide whether to extend or restart at i, we need the best subarray constrained to end at i - 1.'
            }
          ]
        }
      ],
      summary: 'Linear-time algorithm using a one-state DP.',
      content: teachingArc({
        bigIdea: 'best[i] = max(best[i-1] + A[i], A[i]).',
        problem: 'find the contiguous subarray with maximum sum.',
        intuition: 'either extend the current subarray or start a new one at i.',
        formal: 'maintain best ending at i (single variable) and global best (single variable).',
        algorithm: 'one pass: for each A[i], update best_here and best_global.',
        worked: 'on [-2, 1, -3, 4, -1, 2, 1, -5, 4] the answer is 6 = 4 + (-1) + 2 + 1.',
        correctness: 'Kadane invariant: best_here is the max sum of a subarray ending at the current index.',
        complexity: 'Θ(n) time, Θ(1) space.',
        trace: 'walk through the example by hand.',
        takeaways: 'beats divide-and-conquer (Θ(n log n)) by a log factor.',
        practice: 'find the maximum subarray of [3, -2, 5, -1, 6, -3].'
      }),
      practice: [
        mcq('algods-u11-l4-q1', 'Kadane runs in:',
          ['Θ(n²)', 'Θ(n log n)', 'Θ(n)', 'Θ(log n)'],
          2, 'A single linear pass with constant state.')
      ]
    },
    {
      title: 'Boolean parenthesisation',
      durationMinutes: 30,
      type: 'video',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Boolean parenthesisation is an interval dynamic program. Given a sequence of Boolean operands and binary operators, count how many fully parenthesized expressions evaluate to true. The top-level split of any full parenthesization is some operator k, so the recurrence tries every possible split and combines counts from the left and right intervals.'
        },
        {
          type: 'callout',
          tone: 'definition',
          title: 'Interval subproblem',
          text: 'Let T[i,j] be the number of ways to parenthesize operands i through j so the interval evaluates to true. Let F[i,j] be the number of ways for the same interval to evaluate to false.'
        },
        {
          type: 'diagram',
          title: 'Split the interval at the root operator',
          caption: 'Every full parenthesization has exactly one top-level operator k. Count all choices of k, then combine left and right truth counts according to that operator.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Boolean parenthesization interval dynamic programming split diagram">
  <defs>
    <marker id="u11l5-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Boolean parenthesisation is interval DP</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <rect x="110" y="115" width="120" height="64" rx="14" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="170" y="153" fill="#1e3a8a">i..k</text>
    <rect x="420" y="115" width="110" height="64" rx="14" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="475" y="153" fill="#92400e">op[k]</text>
    <rect x="710" y="115" width="120" height="64" rx="14" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="770" y="153" fill="#064e3b">k+1..j</text>
    <line x1="230" y1="147" x2="420" y2="147" stroke="#334155" stroke-width="3" marker-end="url(#u11l5-arrow)"/>
    <line x1="530" y1="147" x2="710" y2="147" stroke="#334155" stroke-width="3" marker-end="url(#u11l5-arrow)"/>
    <rect x="110" y="245" width="720" height="82" rx="20" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="470" y="278" font-size="16" fill="#334155">left counts: T[i,k], F[i,k]   +   right counts: T[k+1,j], F[k+1,j]</text>
    <text x="470" y="310" font-size="16" fill="#334155">operator &amp;, |, or XOR decides which combinations make the whole interval true.</text>
    <text x="470" y="370" font-size="15" fill="#475569">Try every k from i to j-1; the cases are disjoint because k is the unique root operator.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Base cases and combinations',
          level: 2
        },
        {
          type: 'table',
          caption: 'Base cases for one operand.',
          columns: ['Operand value', 'T[i,i]', 'F[i,i]'],
          rows: [
            ['true', '1', '0'],
            ['false', '0', '1']
          ]
        },
        {
          type: 'table',
          caption: 'Combining counts for a split k. Write LT = T[i,k], LF = F[i,k], RT = T[k+1,j], RF = F[k+1,j].',
          columns: ['Operator', 'True combinations added', 'False combinations added'],
          rows: [
            ['AND', 'LT * RT', 'LT * RF + LF * RT + LF * RF'],
            ['OR', 'LT * RT + LT * RF + LF * RT', 'LF * RF'],
            ['XOR', 'LT * RF + LF * RT', 'LT * RT + LF * RF']
          ]
        },
        {
          type: 'code',
          title: 'BOOLEAN-PARENTHESIZATION',
          language: 'pseudocode',
          code: `BOOLEAN-PARENTHESIZATION(value[1..n], op[1..n-1])
    let T[1..n, 1..n] and F[1..n, 1..n] be new tables
    for i = 1 to n
        if value[i] == true
            T[i, i] = 1
            F[i, i] = 0
        else
            T[i, i] = 0
            F[i, i] = 1
    for length = 2 to n
        for i = 1 to n - length + 1
            j = i + length - 1
            T[i, j] = 0
            F[i, j] = 0
            for k = i to j - 1
                LT = T[i, k]; LF = F[i, k]
                RT = T[k + 1, j]; RF = F[k + 1, j]
                if op[k] == AND
                    T[i, j] = T[i, j] + LT * RT
                    F[i, j] = F[i, j] + LT * RF + LF * RT + LF * RF
                else if op[k] == OR
                    T[i, j] = T[i, j] + LT * RT + LT * RF + LF * RT
                    F[i, j] = F[i, j] + LF * RF
                else if op[k] == XOR
                    T[i, j] = T[i, j] + LT * RF + LF * RT
                    F[i, j] = F[i, j] + LT * RT + LF * RF
    return T[1, n]`
        },
        {
          type: 'heading',
          text: 'Worked example',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'Use the expression true OR false AND true XOR true. There are four operands, so there are Catalan(3) = 5 full parenthesizations in total.'
        },
        {
          type: 'table',
          caption: 'Short intervals for true OR false AND true XOR true.',
          columns: ['Interval', 'Expression fragment', 'T', 'F'],
          rows: [
            ['[1,1]', 'true', '1', '0'],
            ['[2,2]', 'false', '0', '1'],
            ['[3,3]', 'true', '1', '0'],
            ['[4,4]', 'true', '1', '0'],
            ['[1,2]', 'true OR false', '1', '0'],
            ['[2,3]', 'false AND true', '0', '1'],
            ['[3,4]', 'true XOR true', '0', '1']
          ]
        },
        {
          type: 'table',
          caption: 'Longer intervals and final answer.',
          columns: ['Interval', 'Splits considered', 'T', 'F'],
          rows: [
            ['[1,3]', 'split at OR gives true; split at AND gives true', '2', '0'],
            ['[2,4]', 'split at AND gives false; split at XOR gives true', '1', '1'],
            ['[1,4]', 'split at OR contributes 2 true; split at AND contributes 1 false; split at XOR contributes 2 false', '2', '3']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Counts must add to a Catalan number',
          text: 'For an interval containing m operands, T[i,j] + F[i,j] should equal Catalan(m - 1). In the example with four operands, the final counts are 2 true and 3 false, summing to 5.'
        },
        {
          type: 'heading',
          text: 'Correctness',
          level: 2
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Exhaustive root split',
          text: 'Every full parenthesization of operands i through j has a unique root operator k between i and j. The left and right subexpressions are then independently parenthesized intervals [i,k] and [k+1,j]. Trying all k counts every possible full parenthesization.'
        },
        {
          type: 'callout',
          tone: 'proof',
          title: 'Disjoint cases',
          text: 'Parenthesizations with different root operators are disjoint. For a fixed root operator, the truth-table combinations are disjoint by the truth values of the left and right intervals. Therefore summing the products of counts neither misses nor double-counts any parenthesization.'
        },
        {
          type: 'heading',
          text: 'Runtime and space',
          level: 2
        },
        {
          type: 'table',
          caption: 'Boolean parenthesisation complexity for n operands.',
          columns: ['Component', 'Cost'],
          rows: [
            ['Number of intervals', 'Theta(n^2)'],
            ['Splits per interval', 'O(n)'],
            ['Work per split', 'Theta(1) arithmetic combinations'],
            ['Total time', 'Theta(n^3)'],
            ['Extra space', 'Theta(n^2) for T and F']
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'This is an interval DP like matrix-chain multiplication. The table is indexed by i and j, and the third loop tries the root split k. Always check that true plus false counts equal the number of full parenthesizations for the interval.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u11l5-E1',
              source: 'Base case',
              question: 'For a single operand false at position i, what are T[i,i] and F[i,i]?',
              solution: 'T[i,i] = 0 and F[i,i] = 1.'
            },
            {
              id: 'u11l5-E2',
              source: 'One operator',
              question: 'How many true parenthesizations does true XOR false have?',
              solution: 'Exactly 1. With two operands there is only one parenthesization, and true XOR false evaluates to true.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u11l5-M1',
              source: 'Combination formula',
              question: 'For an OR split with LT = 2, LF = 1, RT = 3, RF = 4, how many true and false combinations are added?',
              solution: 'For OR, true combinations are LT*RT + LT*RF + LF*RT = 2*3 + 2*4 + 1*3 = 17. False combinations are LF*RF = 1*4 = 4.'
            },
            {
              id: 'u11l5-M2',
              source: 'Complexity',
              question: 'Why is the Boolean parenthesisation DP Theta(n^3) rather than Theta(n^2)?',
              solution: 'There are Theta(n^2) intervals, but each interval may try up to O(n) root split positions k. The work per split is constant, so the total is Theta(n^3).'
            }
          ]
        }
      ],
      summary: 'Counting parenthesisations of a Boolean expression that evaluate to true.',
      content: teachingArc({
        bigIdea: 'split the expression at each operator; combine truth counts of left and right.',
        problem: 'how many ways to parenthesise so the expression evaluates true?',
        intuition: 'classic interval DP.',
        formal: 'T[i, j], F[i, j] = number of true and false parenthesisations on operators i..j.',
        algorithm: 'fill by interval length; combine via the operator at the split.',
        worked: 'expression true OR false AND true XOR true has 2 true parenthesisations and 3 false parenthesisations.',
        correctness: 'mutually-exclusive split positions and disjoint cases.',
        complexity: 'Θ(n³).',
        trace: 'fill the T, F tables for n = 4.',
        takeaways: 'interval DPs are common (matrix chain, optimal BST).',
        practice: 'count parenthesisations for a 5-symbol expression.'
      }),
      practice: [
        mcq('algods-u11-l5-q1', 'The Boolean parenthesisation DP runs in:',
          ['Θ(n)', 'Θ(n²)', 'Θ(n³)', 'Θ(2ⁿ)'],
          2, 'Interval DP with three indices: i, j, split k.')
      ]
    },
    {
      title: 'Unit 11 review',
      durationMinutes: 20,
      type: 'practice',
      richContent: [
        {
          type: 'heading',
          text: 'Big picture',
          level: 2
        },
        {
          type: 'paragraph',
          text: 'The dynamic-programming unit has one recurring workflow: define the state, prove the recurrence, choose an evaluation order, and count states times transitions. The examples differ in table shape, but the proof habits are the same.'
        },
        {
          type: 'diagram',
          title: 'DP workflow checklist',
          caption: 'A reliable DP solution moves from modeling to proof to implementation.',
          svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 430" role="img" aria-label="Dynamic programming review workflow diagram">
  <defs>
    <marker id="u11l6-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L8,3 z" fill="#334155"/>
    </marker>
  </defs>
  <rect x="12" y="12" width="936" height="406" rx="24" fill="#f8fafc" stroke="#dbe4ef"/>
  <text x="480" y="48" text-anchor="middle" font-size="23" font-weight="800" fill="#0f2038">Dynamic programming solution workflow</text>
  <g font-family="Inter, Arial, sans-serif" text-anchor="middle" font-weight="900">
    <rect x="60" y="135" width="160" height="92" rx="18" fill="#dbeafe" stroke="#2563eb" stroke-width="3"/><text x="140" y="172" fill="#1e3a8a">state</text><text x="140" y="198" font-size="13" fill="#1e3a8a">what is stored?</text>
    <rect x="280" y="135" width="160" height="92" rx="18" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/><text x="360" y="172" fill="#064e3b">recurrence</text><text x="360" y="198" font-size="13" fill="#064e3b">why is it true?</text>
    <rect x="500" y="135" width="160" height="92" rx="18" fill="#fef3c7" stroke="#d97706" stroke-width="3"/><text x="580" y="172" fill="#92400e">order</text><text x="580" y="198" font-size="13" fill="#92400e">dependencies first</text>
    <rect x="720" y="135" width="160" height="92" rx="18" fill="#ede9fe" stroke="#7c3aed" stroke-width="3"/><text x="800" y="172" fill="#4c1d95">cost</text><text x="800" y="198" font-size="13" fill="#4c1d95">states x transitions</text>
    <line x1="220" y1="181" x2="280" y2="181" stroke="#334155" stroke-width="3" marker-end="url(#u11l6-arrow)"/>
    <line x1="440" y1="181" x2="500" y2="181" stroke="#334155" stroke-width="3" marker-end="url(#u11l6-arrow)"/>
    <line x1="660" y1="181" x2="720" y2="181" stroke="#334155" stroke-width="3" marker-end="url(#u11l6-arrow)"/>
    <rect x="160" y="295" width="640" height="54" rx="18" fill="#ffffff" stroke="#dbe4ef"/>
    <text x="480" y="328" font-size="15" fill="#334155">Correctness comes from the recurrence; speed comes from storing repeated states.</text>
  </g>
</svg>`
        },
        {
          type: 'heading',
          text: 'Pattern summary',
          level: 2
        },
        {
          type: 'table',
          caption: 'The Unit 11 examples by state shape.',
          columns: ['Problem', 'State', 'Transition shape', 'Time', 'Space'],
          rows: [
            ['Rod cutting', 'r[j]', 'try first cut i', 'Theta(n^2)', 'Theta(n)'],
            ['LCS', 'c[i,j]', 'match diagonal or max of up/left', 'Theta(mn)', 'Theta(mn), or two rows for length only'],
            ['Maximum subarray', 'ending_sum and best_sum', 'extend or restart', 'Theta(n)', 'Theta(1)'],
            ['Boolean parenthesisation', 'T[i,j], F[i,j]', 'try root split k and combine truth counts', 'Theta(n^3)', 'Theta(n^2)']
          ]
        },
        {
          type: 'heading',
          text: 'Correctness templates',
          level: 2
        },
        {
          type: 'table',
          caption: 'Use the right proof shape for the DP.',
          columns: ['DP shape', 'Proof idea', 'Example'],
          rows: [
            ['Prefix DP', 'Induct on prefix length; all dependencies are shorter prefixes.', 'Rod cutting, LCS rows and columns'],
            ['Interval DP', 'Induct on interval length; every split uses smaller intervals.', 'Boolean parenthesisation'],
            ['One-state scan DP', 'Maintain a loop invariant after processing each index.', 'Kadane'],
            ['Backtracking table', 'Stored arrows replay the recurrence choices.', 'PRINT-LCS']
          ]
        },
        {
          type: 'callout',
          tone: 'warning',
          title: 'Common pitfalls',
          text: 'Do not say overlapping subproblems proves correctness; it only explains the speedup. Do not use the empty-subarray Kadane variant when the problem asks for a nonempty subarray. Do not forget that LCS backtracking needs arrows or enough information to reconstruct choices. In interval DPs, do not count only the endpoints; the split loop is usually where the extra factor of n appears.'
        },
        {
          type: 'heading',
          text: 'Implementation checklist',
          level: 2
        },
        {
          type: 'list',
          items: [
            'Name the state in one sentence, including what each index means.',
            'Write base cases before the recurrence.',
            'For bottom-up DP, state an order where every dependency has already been computed.',
            'For top-down DP, memoize by exactly the state variables.',
            'Count the number of states and multiply by the work per state.',
            'If the problem asks for the actual solution, store parent choices or explain how to backtrack.'
          ]
        },
        {
          type: 'callout',
          tone: 'practice',
          title: 'Key takeaways',
          text: 'A good DP answer is not just code. It includes state definition, recurrence, base cases, evaluation order, correctness argument, and complexity. Those six pieces are the grading backbone.'
        },
        {
          type: 'exercises',
          difficulty: 'easy',
          exercises: [
            {
              id: 'u11l6-E1',
              source: 'State choice',
              question: 'For LCS, why is one index not enough for the state?',
              solution: 'The answer depends on both prefixes, one from X and one from Y. We need c[i,j] to know how much of each string is available.'
            },
            {
              id: 'u11l6-E2',
              source: 'Kadane',
              question: 'What does ending_sum mean immediately after processing A[i]?',
              solution: 'It is the maximum sum of any nonempty subarray that ends exactly at index i.'
            }
          ]
        },
        {
          type: 'exercises',
          difficulty: 'medium',
          exercises: [
            {
              id: 'u11l6-M1',
              source: 'Runtime',
              question: 'A DP has Theta(n^2) states and each state tries O(n) choices. What is the running time if each choice is O(1)?',
              solution: 'Theta(n^3), because states times transitions per state is Theta(n^2) * O(n), and in the usual dense case this is Theta(n^3).'
            },
            {
              id: 'u11l6-M2',
              source: 'Top-down versus bottom-up',
              question: 'When might memoization be preferable to tabulation even if both have the same worst-case asymptotic bound?',
              solution: 'Memoization can be preferable when the reachable state space is sparse or awkward to order, because it computes only states reached by the initial query and keeps the recursive structure close to the recurrence.'
            },
            {
              id: 'u11l6-M3',
              source: 'Interval DP',
              question: 'Why does Boolean parenthesisation use both T[i,j] and F[i,j] instead of only T[i,j]?',
              solution: 'The truth of a larger expression may depend on false subexpressions, especially for XOR and OR/AND false cases. We need both true and false counts to combine intervals correctly.'
            }
          ]
        }
      ],
      summary: 'Mixed dynamic-programming practice with review questions.',
      content: [
        block('Look for optimal substructure first; only then write the recurrence.'),
        tip('When the recurrence is correct but the runtime is exponential, check for repeated subproblems and tabulate.'),
        example('Practice: solve the rod-cutting problem (CLRS chapter 15) and compare top-down memoization with bottom-up tabulation.')
      ],
      practice: [
        mcq('algods-u11-l6-q1', 'Which is NOT a typical sign of a DP problem?',
          ['Optimal substructure.', 'Overlapping subproblems.', 'Greedy choice always works.', 'Recurrence on prefixes or intervals.'],
          2, 'Greedy choice property is what makes a problem solvable by greedy, not DP.')
      ]
    }
  ]
};

// Combine all units ----------------------------------------------------------

const units = [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11];

const lessonCount = units.reduce((acc, u) => acc + u.lessons.length, 0);
const ALGODS_LESSON_COUNT = lessonCount;

const algorithmsAndDataStructuresCourse = {
  id: courseId,
  title: 'Algorithms and Data Structures',
  subjectId: 'computer-science',
  level: 'university',
  language: 'English',
  summary:
    'A university-level Computer Science course covering algorithm analysis, sorting, search trees, hashing, heaps, union-find, graph algorithms, and dynamic programming through interactive examples, proofs, and practice exercises.',
  coverColor: 'linear-gradient(135deg,#7c3aed,#0ea5e9)',
  estimatedHours: 100,
  units
};

export {
  algorithmsAndDataStructuresCourse,
  ALGODS_LESSON_COUNT
};
