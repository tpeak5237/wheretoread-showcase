# Local release evidence — 2026-10-08

Target: independent static showcase. Environment: macOS, Node 24, npm, Chromium.

| Command / inspection | Observed result |
|---|---|
| `npm ci` | Successful clean install from committed lockfile |
| `npm run lint` | Passed |
| `npm run typecheck` | Passed |
| `npm test` | 5 unit tests passed |
| `npm run build` | Passed; static output, no source maps |
| `npm audit --audit-level=high` | 0 vulnerabilities at release check |
| `PREVIEW=1 npm run test:e2e` | 9 Chromium tests passed against production build |
| Gitleaks 8.30.1 source + build scan, redacted output | No detected secrets |
| Manual inclusion, source, configuration and runtime asset review | Original independent source, synthetic data, no backend/config/credentials copied |
| Runtime license review | React/React DOM/Scheduler MIT and Lucide ISC notices retained |
| Browser network/error checks | Primary journeys: no external HTTP requests, no page errors |
| axe + responsive + keyboard | Checked at 1440/1024/390; dialog focus/dismissal and recovery exercised |
| Independent read-only code review | Storage getter crash found, patched, browser regression now passes |

Browser workflows include bilingual search, intersecting filters, place details, favorites
across reload, empty results, schematic selection, loading/error recovery, and denied
localStorage property access without a crash. Screenshots use synthetic UI only.

The publication gate additionally verifies a single fresh initial commit, scans that Git
history, compares staged paths with the inclusion allowlist, then creates/pushes the public
repository. Remote visibility, tree identity, README rendering and GitHub CI must be checked
separately after push; this local evidence does not assert their outcome.

No hosted application, production backend, authenticated workflow, real map, location data
or external provider is deployed or live-verified by these checks. Dependency scan results
are a dated known-vulnerability snapshot, not a blanket security guarantee.
