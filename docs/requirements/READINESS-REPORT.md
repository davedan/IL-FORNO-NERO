# Functional Requirements Readiness Report — Il Forno Nero

> External Business Analysis preflight against PDD content `9e54d1350525f2fee540e77e0d5d83d133e0897e`; not a BMSF approval.

## Result

**Status: NEEDS_DECISIONS.** The package provides coverage for every in-scope PDD capability and testable paths for public, employee, owner and global-administrator journeys. It can inform preliminary Architecture analysis, but it is not ready for a formal architecture handoff or implementation baseline.

## Coverage

- PDD capabilities CAP-0001 through CAP-0008 have mapped functional requirements.
- Role permissions, public flows, state transitions, approval flow, content availability, campaign scheduling and account lifecycle are specified.
- Explicit exclusions and future debt are preserved.

## Findings

| ID | Severity | Finding | Owner / disposition |
| --- | --- | --- | --- |
| FIND-0001 | BLOCKING | The PDD and this functional package are external documents, not formally registered BMSF artifacts with canonical metadata and approval evidence. | BMSF adoption workflow required. |
| FIND-0002 | HIGH | Indefinite retention of personal data needs Product Owner legal validation before release. | Product Owner; open. |
| FIND-0003 | HIGH | The selected configuration supports CMS and public rendering, but deployment is unknown and no adapter is available. | Software Architect; target dependency. |
| FIND-0004 | HIGH | Simulated checkout must be visibly separated from real payment and cannot imply a financial transaction. | Architecture and QA; open. |
| FIND-0005 | MEDIUM | Reservation conflicts are intentionally manual; operational pilot evidence is needed before release. | Product Owner and QA; open. |
| FIND-0006 | MEDIUM | Campaign ordering is unspecified when multiple campaigns are active. | Accepted MVP limitation; deferred. |

## Recommended next step

1. Publish and review this package as the external BA baseline.
2. Request BMSF adoption/validation if available.
3. Allow Architecture to conduct preliminary design with the listed blockers and target dependencies explicit.
4. Do not authorize production deployment until the blocking/high findings are resolved or formally accepted.
