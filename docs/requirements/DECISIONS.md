# Decisions Register — Il Forno Nero

> External Business Analysis proposal. Source PDD content: `f046ed0718cadcea36a67ac8ca74563fae13ad06`.

## Confirmed

| ID | Decision |
| --- | --- |
| DEC-0001 | Project type is `public-website`. |
| DEC-0002 | Delivery route is `website@1.0.0 → custom-web → astro-payload@0.1.0`. |
| DEC-0003 | Customers use guest journeys; customer accounts are deferred. |
| DEC-0004 | Reservations and orders require name, email and telephone. |
| DEC-0005 | Visitors cannot cancel; internal users manually edit or cancel after customer contact. |
| DEC-0006 | Internal staff manually resolve overlapping reservation requests. |
| DEC-0007 | Products remain visible as unavailable and cannot be ordered. |
| DEC-0008 | Multiple campaigns may appear sequentially on every entry when active and scheduled. |
| DEC-0009 | Internal accounts use manually delivered temporary passwords and mandatory first-login replacement. |
| DEC-0010 | Deactivated accounts lose access immediately. |
| DEC-0011 | Contact records are retained indefinitely, pending legal validation. |
| DEC-0020 | SQLite3 is the selected MVP persistence engine; PostgreSQL is not part of this solution unless a superseding architecture decision is approved. |

## Deferred

| ID | Deferred decision |
| --- | --- |
| DEC-0012 | Campaign priority configuration. |
| DEC-0013 | Customer accounts and profiles. |
| DEC-0014 | Real payments, refunds and reconciliation. |
| DEC-0015 | Automated email, WhatsApp and telephone communications. |
| DEC-0016 | Marketing communications and consent. |
| DEC-0017 | Price-changing product customizations. |

## Architecture-owned dependencies

| ID | Decision |
| --- | --- |
| DEC-0018 | Hosting, deployment, domain/TLS, rollback and production operations. |
| DEC-0019 | Technical design for authentication, session security, persistence, observability and recovery within the selected target. |
