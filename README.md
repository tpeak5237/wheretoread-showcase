# อ่านไหนดี · WhereToRead

An independently implemented, Thai-first place-discovery frontend. Finding a quiet place to read should start with useful context, not a list of unexplained pins.

**Frontend demonstration · Synthetic data · No credentials, services or tracking.**

![Desktop demonstration](docs/screenshots/desktop.png)

## What you can explore

- Thai and English search with intersecting activity/amenity filters.
- Six synthetic locations, original illustrated room scenes and contextual detail dialogs.
- Browser-local favorites with malformed/disabled-storage recovery.
- Locally rendered schematic browsing; never a navigable or real map.
- Keyboard focus, reduced-motion support and responsive layouts.
- Explicit empty, loading and recoverable error demonstrations.

## Run locally

Requires Node.js 24 and npm. No environment file or account is required.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4311. `npm run build` writes the static artifact to `dist/`;
`npm run preview` serves it locally. Relative asset paths support static subdirectory hosting.
No hosted demo or production deployment is implied by this repository.

## Demo workflow

Search `Paper`, inspect บ้านกระดาษ, save it, reload, and open บันทึกไว้. Try ทำงาน + เงียบ; switch to แผนผัง and select a numbered place. Expand the state controls to demonstrate loading and recovery.

[Tablet screenshot](docs/screenshots/tablet.png) · [Mobile screenshot](docs/screenshots/mobile.png)

## Verify

```sh
npm run check
npm audit --audit-level=high
npx playwright install chromium
npm run test:e2e
```

`check` runs ESLint, TypeScript, unit tests and a production build. Browser tests exercise
primary interactions, zero external HTTP requests, runtime errors, keyboard dismissal,
axe accessibility and overflow at 1440, 1024 and 390 pixels. CI runs the same checks.
See [release evidence](docs/RELEASE_CHECKS.md) for commands actually executed; CI and
repository publication are separate from application deployment.

## Architecture

React, TypeScript and Vite. View state is local to React; pure typed functions define
filtering and workflow behavior. Original CSS/SVG and system Thai/Latin fonts avoid
remote visual assets. Lucide icons are ISC licensed (with retained Feather MIT attribution).

- [Architecture and boundaries](docs/ARCHITECTURE.md)
- [Decisions and provenance](docs/DECISIONS.md)
- [Explicit public allowlist](docs/PUBLIC_ALLOWLIST.md)
- [Security and privacy](SECURITY.md)
- [Contributing](CONTRIBUTING.md)

## Limits and privacy

All records are fictional and do not describe actual people, organizations, places or
availability. There is no backend, API, database, real authentication, payment, telemetry,
provider integration or production authorization. Browser-local favorites, where offered,
are editable by the user; task/session state resets on reload. LocalStorage is not an
appropriate place for secrets. This is a **prototype/showcase**, not production-ready software.

## Ownership and license

Owned by `tpeak5237`. Independently authored with AI-assisted development for this public
edition. No private source code, repository history, operational configuration, ranking
implementation, production records or third-party imagery was copied. MIT applies to the
new project code; dependencies retain their own licenses. See [LICENSE](LICENSE) and
[dependency notices](docs/THIRD_PARTY.md).
