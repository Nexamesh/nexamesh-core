# Release Notes — PhoenixRooivalk — 2026-03-25 (DRAFT)

> Covers changes since repository creation — 35+ PRs over the last 30 days  
> Review and edit before publishing.

## Features
- Add Drone Net Launcher documentation and update Phase 1 BOM (#773)
- Add counter-UAS threat assessment research — 3 comprehensive documents (#775)
- Add spare parts bin inventory from salvaged components (#776)
- Type-safe tier IDs — replace bare string identifiers with explicit unions (#660)
- Add Phase 1 ESP32 demo stack hardware specifications — 7 documentation pages (#664)

## Bug Fixes
- Re-export `ComputeTier` and `generateProductConfiguration` from `products.ts` (#661)
- Fix pnpm 10 packageManager in CI and add `@next/eslint-plugin-next` for marketing lint (#725)
- Throttle mousemove updates in threat simulator using `requestAnimationFrame` (#656)

## Security
- Mitigate XSS in JSON-LD script blocks — replace raw `JSON.stringify` with `serializeJsonLd` (#670)
- Remove hardcoded team member PII from DB seeding (#655)

## Tests
- Add unit tests for `checkIsAdmin` in docs service (#671)
- Add unit tests for `TrackPersistence` and `PersistentTracker` (#657, #669)
- Refactor marketing pages to client components with comprehensive integration tests (#624)

## Docs
- Migrate `docs/prd/` into Docusaurus — 6 PRD documents now accessible via sidebar (#658)
- Add docs-staging catalog structure for documentation refinery (#666)
- Add `README.md` to `src/data/products` and `src/data` for discoverability (#659)

## Infra / DevOps
- Reduce CodeQL to weekly + manual only (#768)
- Speed up CodeQL Rust analysis — remove redundant `cargo build`, add rust-cache (#673)
- Migrate ESLint to flat config format (`eslint.config.mjs`) (#642)
- Exclude Dependabot and Renovate from deployment workflow triggers (#730)
