# ADR-0001 — Use the certified Astro + Payload website route

> External project ADR. Status: `ACCEPTED_FOR_PROJECT_ARCHITECTURE` on 7 November 2026; canonical BMSF adoption remains separate.

## Context

The approved PDD and FR select `public-website → website@1.0.0 → custom-web → astro-payload@0.1.0`. An earlier external review treated the configuration's unavailable local adapter as a Development blocker.

The current BMSF certification record, approved through PR [#38](https://github.com/davedan/BMSF-Arquitecture/pull/38) and activated through PR [#51](https://github.com/davedan/BMSF-Arquitecture/pull/51), distinguishes local execution from the normal GitHub delivery route.

## Decision

Use Astro for the public frontend and Payload as the headless CMS through the certified **BMSF → Codex/GitHub → GitHub Actions → QA** route. Use SQLite3 for MVP persistence as already selected in `DEC-0020`.

`adapter.status: UNAVAILABLE` and `adapter.operations: []` remain unchanged. They prohibit local target execution; they do not block GitHub-based development, CI or QA. Docker is prohibited unless separately authorized by the Owner.

## Consequences

- Development can begin through the normal BMSF/GitHub handoff without a local adapter.
- This decision does not authorize production hosting, deployment, real payment, notifications, new infrastructure or a clean strict dependency audit claim.
- The project must produce its own build, QA, accessibility, SEO, performance and security-disposition evidence before release.

## Superseded interpretation

**Historical finding:** the unpublished initial external architecture review classified the unavailable local adapter as a development blocker.

**Resolution:** superseded by the certified route evidence above. The finding is resolved only for standard GitHub-based Development; local adapter operations remain unavailable by design.
