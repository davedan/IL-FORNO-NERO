# Development Handoff — Il Forno Nero

> External Architect → Development handoff, prepared 7 November 2026. Status: `READY` for the standard BMSF GitHub delivery process.

## Inputs pinned

- Project repository and branch: `davedan/IL-FORNO-NERO`, `main`, `6ec139c248f92f87041f58af476a44fb488ccb62`.
- Product baseline: `PDD.md`, blob `f046ed0718cadcea36a67ac8ca74563fae13ad06`, approved by Product Owner for Architecture review.
- Functional baseline: `docs/requirements/FUNCTIONAL-REQUIREMENTS.md`, blob `3117e7067a107a97dfec4add403f278275096b36`, approved by Product Owner for Architecture review.
- Architecture: `docs/architecture/ARCHITECTURE-CONTRACT.md` and `ADR-0001-certified-astro-payload-route.md` in this revision.
- Target: `public-website → website@1.0.0 → custom-web → astro-payload@0.1.0`, source binding `b0a8319431396e8d6c9fc852d5335411a0a5f7f1`, manifest SHA-256 `d31e7018c7025594c75f77764d091315bf9adb1905a83317eaeeb7da47ee23b0`.

## Handoff result

The obsolete local-adapter blocker is **resolved** for Development. Development proceeds via Codex/GitHub and GitHub Actions; it must not create a local target adapter, use Docker or start any infrastructure/deployment work.

## Required delivery evidence

1. Establish the GitHub Actions build/test gate before merging implementation work; no project workflow/status evidence existed at the revalidation commit.
2. Lockfile-pinned supported Astro, Payload and SQLite3 dependencies; no secrets in Git.
3. CI build and project tests, including public flows, CMS authorization, approval flow, reservation/order validation and simulated-payment wording.
4. WCAG 2.2 AA, responsive, navigation/link, SEO and performance evidence required by the Website target.
5. Independent QA evidence and explicit disposition of project dependency-security findings before a release claim.
6. Project-specific hosting, recovery, monitoring and legal/privacy approvals before production deployment.

## Out of scope for this handoff

Production deployment, Docker, real payment, automatic notifications, customer accounts, marketing, price-changing customizations and any PDD/FR change.
