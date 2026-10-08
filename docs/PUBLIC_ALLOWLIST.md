# Public inclusion allowlist

Only these independently authored paths are intended for public history:
`src/`, `tests/`, `docs/`, `.github/workflows/ci.yml`, `.gitignore`,
`index.html`, `package.json`, `package-lock.json`, `tsconfig.json`,
`vite.config.ts`, `vitest.config.ts`, `playwright.config.ts`, `eslint.config.js`,
`README.md`, `SECURITY.md`, `CONTRIBUTING.md`, `LICENSE`.

No files are copied from a private project. No private commits or `.git` directories
are imported. Build output, caches, local environment files and dependencies are excluded.
Screenshots in `docs/` contain only this edition's synthetic UI.
