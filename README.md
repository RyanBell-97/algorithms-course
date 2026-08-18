# Algorithms and Data Structures

A free, self-contained university course for learning how algorithms work, how to prove them correct, and how to analyze their efficiency.

[Open the course website](https://ryanbell-97.github.io/algorithms-course/) · [Report a problem](https://github.com/RyanBell-97/algorithms-course/issues) · [License guide](LICENSES.md)

## What is included

- 11 units and 69 lessons
- 42 interactive visualizers and learning labs
- 1,700+ structured learning blocks with diagrams, formulas, proofs, tables, and code
- worked examples, graduated exercises, full solutions, and multiple-choice knowledge checks
- local progress tracking without an account, analytics, or a backend
- responsive, keyboard-friendly presentation with KaTeX math rendering

The repository contains only the course application. It does not include the tutoring platform, authentication code, user data, operational material, or third-party textbook and lecture-note PDFs from the original workspace.

## Syllabus

| Unit | Topic | Lessons |
| ---: | --- | ---: |
| 1 | Introduction and Algorithm Analysis | 8 |
| 2 | Recurrences | 6 |
| 3 | Sorting and Selection | 8 |
| 4 | Search Trees | 8 |
| 5 | Hashing | 7 |
| 6 | Binomial Heaps | 5 |
| 7 | Amortized Analysis | 4 |
| 8 | Fibonacci Heaps | 6 |
| 9 | Union-Find | 4 |
| 10 | Graph Algorithms | 7 |
| 11 | Dynamic Programming | 6 |

## Run locally

Requirements: Node.js 22 and npm.

```bash
npm install
npm start
```

Open `http://localhost:4200`.

Before submitting a change, run:

```bash
npm run verify
```

This checks the course inventory, rich lesson content, artifact count, public-content policy, and production build.

## Reusing the course and artifacts

Yes—you can use the interactive artifacts outside this site or adapt them for another learning application.

- Educational content in `src/app/course-data.ts`, including original prose, exercises, diagrams, and course-specific tables, is licensed under [CC BY 4.0](LICENSE-CONTENT.md).
- Software in `src/`, including all interactive artifact components, is licensed under the [MIT License](LICENSE).

CC BY 4.0 requires attribution when you share or adapt the educational material. MIT permits broad reuse of the software as long as its copyright and permission notice are preserved. See [LICENSES.md](LICENSES.md) for the practical boundary between the two.

The artifact components are Angular standalone components. The dispatcher is located at:

```text
src/app/components/interactive-artifacts/algo-ds-artifacts/
```

Individual labs live beside it in unit-specific folders. Their public API is a short artifact identifier such as `insertion-sort-viz`, `master-theorem-calc`, or `rb-tree-visualizer`.

## Project layout

```text
src/app/course-data.ts                 Course content and lesson structure
src/app/course-page/                   Standalone learner interface
src/app/components/formula-renderer/   KaTeX display rendering
src/app/components/math-text/          Inline math-aware text rendering
src/app/components/interactive-artifacts/
                                       The 42 interactive learning tools
scripts/check-course.mjs               Content and inventory checks
.github/workflows/                     Verification and GitHub Pages deployment
```

## Academic references and source policy

The course uses standard algorithms terminology and was informed by established university-level references, including *Introduction to Algorithms* by Cormen, Leiserson, Rivest, and Stein, and an Algorithmen und Datenstrukturen lecture script used for topic sequencing. See [ATTRIBUTION.md](ATTRIBUTION.md).

No source book, scan, or lecture-note PDF is distributed here. Reference names are descriptive and do not imply affiliation or endorsement.

## Contributing

Corrections, clearer explanations, accessibility improvements, new exercises, and additional interactive tools are welcome. Read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.
