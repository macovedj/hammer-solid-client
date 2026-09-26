# Hammer Solid Client

A deliberately **client-side-only** SolidJS fixture for testing GitHub imports, dependency installation, dev-server startup, HMR, SPA fallback, browser data fetching, and production builds in edit-test.dev.

This is not SolidStart and it does not render HTML on a server. The checked-in `index.html` contains an empty `<div id="root"></div>`; `src/main.tsx` mounts the entire application in the browser with `solid-js/web`.

## Runtime and commands

- Node.js 20.19+ (Node 22 or 24 recommended)
- `npm install`
- `npm run dev` — Vite development server on `0.0.0.0`
- `npm run build` — strict TypeScript check and production bundle
- `npm run preview` — production preview on `0.0.0.0`
- `npm run check` — typecheck plus production bundle
- `npm run test:smoke` — build, self-start a production preview, and verify root, deep-link fallback, and local JSON

### Hammer built-in npm compatibility

The checked-in lockfile uses npm 10-compatible lockfile-v3 metadata and is normalized by Hammer's built-in npm. Newer npm 11 releases add `libc` selector metadata that is not part of Hammer's currently modeled lockfile surface; this lock preserves the same package versions, registry URLs, integrity hashes, and dependency graph without those fields.

The optional Rolldown WASI binding and `NAPI_RS_ENFORCE_VERSION_CHECK` environment setting let the same Vite commands run through Hammer's WJS runtime as well as a conventional Node.js installation. Vite uses its native loader for the JavaScript config, avoiding a Rolldown config-bundling callback before the server is ready. The Solid plugin stays on its ESM path, while the config explicitly supplies Solid Refresh's CommonJS Babel transform so WJS receives Babel's complete generated helper surface and component HMR remains enabled. Type checks use Hammer's `wjs check`/tsgo-WASM path under WJS and TypeScript's platform compiler under conventional Node.js. Keep the committed lockfile when importing the fixture.

## Test surfaces

| Route | Behavior under test |
| --- | --- |
| `/` | Empty-document CSR mount, static SVG asset, reactive counter |
| `/products` | Browser fetch from deterministic local JSON, loading/error states |
| `/products/anvil` | Direct/deep dynamic SPA route and route parameters |
| `/lazy` | Route-level dynamic import and `onMount` browser lifecycle |
| `/error` | Recoverable client render failure through `ErrorBoundary` |
| `/anything-else` | Client router fallback |

## Suggested edit-test.dev checks

1. Import the GitHub repository and run `npm run dev`.
2. Open `/products/anvil` directly (not by first visiting `/`) to verify history fallback.
3. Change the home heading or counter and confirm HMR preserves the surrounding shell.
4. Add a product to `public/data/products.json` and refetch it without restarting.
5. Visit `/lazy`, then inspect the network panel for a separate route chunk.
6. Trigger `/error`, recover via the boundary, and verify the navigation shell survives.
7. Run `npm run build`, then `npm run preview`, and repeat the deep-link check.

## Expected static-host behavior

Because this is an SPA, a deployment platform must rewrite unknown document requests to `/index.html`. Vite dev and preview do this automatically. A host that returns its own 404 for `/products/anvil` is testing host configuration rather than Solid routing.

No database, secret, external API, or account is required.
