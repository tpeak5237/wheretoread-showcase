# Architecture

`src/main.tsx` mounts the application. `src/App.tsx` owns view state and accessible controls.
`src/model.ts` defines typed fixtures and pure domain operations. `src/styles.css` defines
semantic tokens, responsive composition, focus and reduced-motion behavior.
Unit tests exercise model invariants; Playwright exercises the actual browser workflow,
network boundary, accessibility, and responsive overflow at 1440, 1024, and 390 pixels.

There are no API routes, server functions, credentials, deployment bindings, or database files.
The Vite server is a local development tool, not an application backend. Refresh resets
session state except explicitly local favorites. Client role switches cannot enforce permissions.
