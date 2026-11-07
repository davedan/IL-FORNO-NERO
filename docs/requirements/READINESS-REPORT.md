# Functional Requirements Readiness Report — Il Forno Nero

> External Business Analysis preflight against the Product Owner-approved PDD and FR baseline; canonical BMSF adoption remains separate.

## Result

**Status: APPROVED_FOR_ARCHITECTURE_REVIEW.** The Product Owner has approved the PDD and FR as the project's external baseline. The package provides coverage for every in-scope PDD capability and testable paths for public, employee, owner and global-administrator journeys. It is ready for Architecture review; canonical BMSF adoption and target execution readiness remain separate gates.

## Coverage

- PDD capabilities CAP-0001 through CAP-0008 have mapped functional requirements.
- Role permissions, public flows, state transitions, approval flow, content availability, campaign scheduling and account lifecycle are specified.
- Explicit exclusions and future debt are preserved.

## Findings

| ID | Severity | Finding | Owner / disposition |
| --- | --- | --- | --- |
| FIND-0001 | HIGH | The approved PDD and FR are external project artifacts, not formally registered BMSF artifacts with canonical metadata. | BMSF adoption workflow required before a canonical BMSF development baseline. |
| FIND-0002 | HIGH | Indefinite retention of personal data needs Product Owner legal validation before release. | Product Owner; open. |
| FIND-0003 | HIGH | The selected configuration supports CMS and public rendering, but deployment is unknown and no adapter is available. | Software Architect; target dependency. |
| FIND-0004 | HIGH | Simulated checkout must be visibly separated from real payment and cannot imply a financial transaction. | Architecture and QA; open. |
| FIND-0005 | MEDIUM | Reservation conflicts are intentionally manual; operational pilot evidence is needed before release. | Product Owner and QA; open. |
| FIND-0006 | MEDIUM | Campaign ordering is unspecified when multiple campaigns are active. | Accepted MVP limitation; deferred. |

## Recommended next step

1. Use this approved package as the external Architecture baseline.
2. Request BMSF adoption/validation if a canonical BMSF development baseline is required.
3. Allow Architecture to conduct design with the listed release blockers and target dependencies explicit.
4. Do not authorize production deployment until the blocking/high findings are resolved or formally accepted.
