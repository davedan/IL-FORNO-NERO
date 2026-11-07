# Traceability Matrix — Il Forno Nero

> External Business Analysis proposal. Source PDD content: `9e54d1350525f2fee540e77e0d5d83d133e0897e`.

| PDD reference | Functional requirements | Primary verification |
| --- | --- | --- |
| PR-0001 / CAP-0001 | FR-0001, FR-0011 | Visual, responsive, locale, navigation and SEO checks |
| PR-0002 / CAP-0002 | FR-0003, FR-0009 | Role authorization and operations access scenarios |
| PR-0003 / CAP-0003 | FR-0004, FR-0005 | Product CRUD, availability and approval scenarios |
| PR-0004 / CAP-0003–4 | FR-0005, FR-0006 | Pending/approve/reject publication scenarios |
| PR-0005 / CAP-0005 | FR-0002, FR-0007, FR-0010 | Reservation validation and internal-operation scenarios |
| PR-0006 / CAP-0006 | FR-0002, FR-0008–10 | Order checkout simulation and internal-operation scenarios |
| PR-0007 / CAP-0004 | FR-0006 | Campaign scheduling and display scenarios |
| PR-0008 / CAP-0003,6 | FR-0004, FR-0008 | Product customization scenarios |
| PR-0009 / CAP-0005–7 | FR-0002, FR-0007, FR-0008, FR-0010 | Required contact-data scenarios |
| PR-0010 / CAP-0005–6 | FR-0007–9 | Manual edit, cancellation and state-transition scenarios |
| PR-0011 / CAP-0004 | FR-0006 | Active state, schedule and multiple-campaign scenarios |
| PR-0012 / CAP-0002,8 | FR-0003 | Account lifecycle and immediate-revocation scenarios |

## Gaps

- Deployment, payment gateway, backup/recovery and production monitoring remain Architecture-owned dependencies.
- The Product Owner must validate legal conditions for indefinite retention before release.
- No customer-account requirements exist because customer accounts are deferred.
