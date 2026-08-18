# Contributing

Thank you for helping make the course clearer and more useful.

## Good contributions

- correct a mathematical, algorithmic, or language error;
- clarify a proof or worked example;
- improve accessibility, keyboard behavior, or responsive layout;
- add a focused exercise with a complete solution;
- add or improve an interactive visualization;
- improve automated checks without coupling the course to a backend.

## Content principles

- Teach durable understanding rather than predicting a particular assessment.
- Keep claims precise and distinguish worst-case, average-case, expected, and amortized bounds.
- Use original wording and original diagrams. Do not paste material from books or lecture notes.
- Cite academic references when a non-obvious fact or historical claim benefits from attribution.
- Keep third-party PDFs, scans, answer keys, and proprietary course files out of the repository.

## Development

```bash
npm install
npm start
```

Run the full verification before opening a pull request:

```bash
npm run verify
```

For visual changes, test a narrow mobile viewport and a desktop viewport. For artifact changes, test every artifact identifier handled by the edited component.

By contributing, you agree that your software contribution is available under MIT and your original educational-content contribution is available under CC BY 4.0, as described in [LICENSES.md](LICENSES.md).
