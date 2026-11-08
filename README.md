# Il Forno Nero

Rebuild of the public website for Il Forno Nero on the approved BMSF delivery route:

```text
public-website → website@1.0.0 → custom-web → astro-payload@0.1.0
```

The public experience is built with **Astro**. The internal CMS is **Payload 3** backed by **SQLite3**. There is no Docker, PostgreSQL, payment provider, external notification service or deployment configuration in this repository.

## Scope and status

- `PDD.md` and `docs/requirements/FUNCTIONAL-REQUIREMENTS.md` are approved by the Product Owner for Development.
- The original Horizons implementation remains under `apps/web` and `apps/api` as a migration reference; it is not the runtime application.
- The active application is `apps/site` (Astro) and `apps/cms` (Payload + SQLite3).
- Public visitors can browse the menu, prepare a click-and-collect order, request a reservation and see active flash campaigns.
- Internal users manage the menu, campaigns, reservations and orders through Payload. Employees create editorial drafts; owners or global administrators publish them.

## Requirements

- Node.js 20.9 or later (Node 24 is used in CI).
- npm.

No Bun or Docker is required for the active application.

## Local setup

Install each application independently:

```powershell
cd apps/site
npm ci --workspaces=false
cd ../cms
npm ci --workspaces=false --legacy-peer-deps
Copy-Item .env.example .env
```

Set a long, unique `PAYLOAD_SECRET` and the initial administrator credentials in `apps/cms/.env`. Then initialise SQLite and the baseline menu:

```powershell
cd apps/cms
$env:PAYLOAD_SECRET = 'replace-with-a-long-random-secret'
$env:INITIAL_ADMIN_EMAIL = 'owner@example.com'
$env:INITIAL_ADMIN_PASSWORD = 'a-long-temporary-password'
npm run seed
```

The seed is idempotent: it creates the administrator matching `INITIAL_ADMIN_EMAIL` only when that email is absent, and synchronises the reference catalogue. Change the temporary password at the first login.

Run the two applications in separate terminals:

```powershell
# Terminal 1
cd apps/cms
$env:PAYLOAD_SECRET = 'replace-with-a-long-random-secret'
npm run dev

# Terminal 2
cd apps/site
npm run dev
```

- Public site: `http://localhost:4321`
- CMS: `http://localhost:3001/admin`
- SQLite file: `apps/cms/data/il-forno-nero.db` (ignored by Git)

## Verification

```powershell
cd apps/site
npm run build

cd ../cms
npm test
$env:PAYLOAD_SECRET = 'replace-with-a-long-random-secret'
npm run generate:types
npm run build
```

GitHub Actions runs the same public build, CMS validation tests, Payload type generation and CMS build on pushes and pull requests.

## Product constraints retained in this MVP

- Orders are marked **paid (simulation)**: no real charge occurs.
- Reservations and orders are guest flows; customer accounts are deferred.
- Visitors cannot alter or cancel a submitted reservation or order. The internal team can do so after a call.
- Contact details are stored for operations only; automatic email, WhatsApp, calls and marketing are deferred.
- Legal validation of indefinite retention and release security disposition remain required before production release.

## Documentation

- [Product definition](PDD.md)
- [Functional requirements](docs/requirements/FUNCTIONAL-REQUIREMENTS.md)
- [Architecture contract](docs/architecture/ARCHITECTURE-CONTRACT.md)
- [Development handoff](docs/architecture/DEVELOPMENT-HANDOFF.md)
