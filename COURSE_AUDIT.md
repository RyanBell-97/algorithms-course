# Course audit

This document records the state of the course at its first public release.

## Coverage

- 11 units and 69 lessons
- 1,735 structured lesson blocks
- 50 interactive placements backed by 42 unique learning artifacts
- Topics spanning analysis, sorting, data structures, graphs, greedy methods,
  dynamic programming, strings, complexity, approximation, and randomized
  algorithms

Every lesson has structured reading material. Interactive artifacts currently
support the material in Units 1–7; Units 8–11 are complete as reading lessons
but do not yet have dedicated interactive labs.

## Public-release review

The public edition was separated from the original application and reviewed for
standalone use:

- Account, server, and application-specific dependencies were removed.
- Progress is stored only in the learner's browser.
- Assessment-specific predictions and coaching language were removed.
- Third-party textbooks and course PDFs were not redistributed.
- Lesson content and original media are licensed under CC BY 4.0.
- Application code is licensed under MIT.

## Quality safeguards

The repository includes an automated content check that verifies the expected
unit, lesson, and artifact counts; confirms that every lesson has structured
content; rejects assessment-specific wording; and prevents PDFs from being
bundled accidentally. Continuous integration runs that check and a production
build for each proposed change.

The initial release was also checked manually at desktop and mobile widths,
including navigation, lesson completion, a knowledge check, and an interactive
sorting artifact.

## Known opportunities

- Add purpose-built interactive artifacts for Units 8–11.
- Add automated browser tests for navigation, progress, knowledge checks, and
  representative artifacts.
- Continue reviewing lessons for clarity, accessibility, and mathematical
  notation as community feedback arrives.
