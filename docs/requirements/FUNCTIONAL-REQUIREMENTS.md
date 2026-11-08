# Functional Requirements — Il Forno Nero

> External functional baseline, **APPROVED_BY_PRODUCT_OWNER** for Development on 7 November 2026. Source: `PDD.md`; approval is external-project evidence and does not constitute canonical BMSF artifact adoption.

## Baseline

- Project type: `public-website`.
- Selected route: `website@1.0.0 → custom-web → astro-payload@0.1.0`.
- Status: `APPROVED_FOR_DEVELOPMENT`; PDD and FR are the approved external-project baseline. Canonical BMSF adoption remains a separate process.

## Requirements

### FR-0001 — Preserve the public experience

**Source:** PR-0001, CAP-0001.
**Actors:** visitor.
**Requirement:** The public website shall preserve all current public pages, languages, navigation, visual identity and existing informational content unless an approved MVP capability replaces an area.

**Acceptance criteria**

- Given a visitor uses desktop or mobile, when navigating the migrated site, then the established palette, typography, imagery, home structure and navigation style are retained.
- Given an existing public page or locale, when the migration is released, then it remains reachable or has an approved replacement or redirect.
- Given a new reservation, ordering or campaign interaction is needed, when it is displayed, then it follows the established visual language while remaining usable.

### FR-0002 — Guest contact capture

**Source:** PR-0004, PR-0005, PR-0009, CAP-0005 to CAP-0007.
**Actors:** visitor.
**Requirement:** The website shall allow a visitor without an account to submit a reservation or click-and-collect order using required name, email and telephone.

**Acceptance criteria**

- Given a visitor omits name, email or telephone, when submitting, then the request is rejected with a field-specific validation message.
- Given a visitor provides valid required contact data, when submitting a valid reservation or order, then the corresponding record is created.
- Given a visitor submits the form again after a recoverable failure, when the original request is already recorded, then the business must not receive an unintended duplicate record.

### FR-0003 — Internal account lifecycle and authorization

**Source:** PR-0002, PR-0012, CAP-0002, CAP-0008.
**Actors:** global administrator, owner, employee.
**Requirement:** The CMS shall enforce the role matrix in `BUSINESS-RULES.md` for every internal operation.

**Acceptance criteria**

- Given a global administrator, when managing users, then they may create, modify or deactivate owners and employees.
- Given an owner, when managing users, then they may create, modify or deactivate employees but cannot manage owners or global administrators.
- Given a new internal account, when it first signs in with a temporary password, then it must set a new password before normal CMS access.
- Given an account is deactivated, when its session attempts any protected action, then access is denied immediately.
- Given an employee attempts an action outside its permissions, when the request reaches the server, then it is denied regardless of UI state.

### FR-0004 — Manage the menu and product availability

**Source:** PR-0002, PR-0003, PR-0008, CAP-0003.
**Actors:** employee, owner, visitor.
**Requirement:** The CMS shall manage categories, products and non-price-changing customizations that feed the public menu and ordering experience.

**Product data:** name, description, price, category, image, ingredients, allergens, dietary labels, temporary availability and product-specific customizations.

**Acceptance criteria**

- Given an employee creates or edits menu content, when saved, then the change becomes pending rather than publicly visible.
- Given an owner approves a pending change, when publication completes, then the public menu reflects it.
- Given an owner rejects a pending change, then the previously published version remains public.
- Given a product is unavailable, when a visitor views the menu, then it remains visible as unavailable and cannot be added to an order.
- Given a product has customizations, when a visitor orders it, then only its configured customizations can be selected and none changes price in the MVP.

### FR-0005 — Publish menu and campaign changes

**Source:** PR-0006, CAP-0003, CAP-0004.
**Actors:** employee, owner.
**Requirement:** Employees shall submit menu and campaign changes for approval; owners shall approve or reject them without mandatory comments or advanced revision history.

**Acceptance criteria**

- Given an employee submits a change, when it is pending, then it is not publicly visible.
- Given an owner approves or rejects a pending change, then its resulting publication state is visible to internal users.
- Given an owner changes published menu or campaign content, then they may publish it directly.

### FR-0006 — Configure and display flash campaigns

**Source:** PR-0007, PR-0011, CAP-0004.
**Actors:** employee, owner, visitor.
**Requirement:** The CMS shall configure flash campaigns with text, image, call to action, active state, date range, weekdays and daily time range.

**Acceptance criteria**

- Given a campaign is inactive, pending, outside its date range, outside its weekday or outside its time range, when a visitor enters the website, then it is not displayed.
- Given one or more approved active campaigns match the current schedule, when a visitor enters the website, then every matching campaign is displayed sequentially.
- Given the visitor closes a campaign, when another matching campaign remains, then the next campaign can be shown.
- Given the visitor enters the website again, then matching campaigns may be displayed again.

### FR-0007 — Submit and operate reservations

**Source:** PR-0005, PR-0009, PR-0010, CAP-0005.
**Actors:** visitor, employee, owner, global administrator.
**Requirement:** A visitor shall request a reservation using available dates, configured time slots and number of diners. Internal users shall manage the record manually.

**Reservation states:** `solicitada`, `confirmada`, `cancelada`, `completada`.

**Acceptance criteria**

- Given a date and time slot is closed or unavailable, when a visitor attempts to submit it, then the reservation is not created.
- Given a valid reservation is submitted, then it is recorded as `solicitada`.
- Given an internal user receives a customer call, when modifying the reservation details or state, then the changes are saved and visible to all internal users.
- Given a visitor wants to cancel, then the public website directs them to contact the business; it does not expose self-service cancellation.
- Given simultaneous requests use the same slot, then the requests remain subject to manual staff handling; the system does not promise automatic capacity confirmation.

### FR-0008 — Submit and operate click-and-collect orders

**Source:** PR-0006, PR-0008 to PR-0010, CAP-0006.
**Actors:** visitor, employee, owner, global administrator.
**Requirement:** A visitor shall create a click-and-collect order from available products, select pickup in 30 or 45 minutes and complete a simulated payment.

**Order states:** `pagado`, `en preparación`, `listo para recoger`, `recogido`, `cancelado`.

**Acceptance criteria**

- Given a visitor selects unavailable content, when attempting to order, then the order cannot be submitted with that product.
- Given a visitor completes the simulated checkout, then the order is created as `pagado`, visibly marked as simulated rather than a real financial charge.
- Given an internal user receives a customer call, when changing products, quantities, customizations or pickup time, then the changes are saved and visible to all internal users.
- Given a visitor wants to cancel, then self-service cancellation is unavailable and the visitor is directed to call the business.

### FR-0009 — Internal operational view

**Source:** PR-0002, PR-0010, CAP-0002, CAP-0005, CAP-0006.
**Actors:** employee, owner, global administrator.
**Requirement:** All active internal roles shall view all reservations and orders of the business and update permitted details and states.

**Acceptance criteria**

- Given an authenticated employee, owner or global administrator, when opening operations, then they can view all reservation and order records of the business.
- Given an unauthenticated visitor, when attempting to access operations, then no reservation or order data is exposed.
- Given an internal user changes an order or reservation, when another internal user refreshes the record, then the current saved state is shown.

### FR-0010 — Contact-data use and retention

**Source:** PR-0005, PR-0009, CAP-0007.
**Actors:** visitor, internal users.
**Requirement:** The service shall retain name, email and telephone with reservations and orders indefinitely for manual operational contact, without automated communications or marketing in the MVP.

**Acceptance criteria**

- Given an internal user views an operation, then its recorded contact data is available.
- Given the MVP is used, then no automated email, WhatsApp, telephone or marketing workflow is triggered from the stored contact data.
- Given retention is implemented, then the policy is documented as indefinite pending the Product Owner's legal validation.

### FR-0011 — Website quality baseline

**Source:** CAP-0001 and selected Website target.
**Actors:** all visitors.
**Requirement:** Public journeys shall remain accessible, responsive, localized and SEO-ready in accordance with the selected Website target's applicable quality gates.

**Acceptance criteria**

- Given a supported locale, when a visitor uses the site, then public navigation and migrated content are available in that locale.
- Given a keyboard-only or assistive-technology visitor, when using public navigation, forms and campaign dialogs, then they can access and operate the journey without relying on pointer-only interaction.
- Given release validation, then responsive, navigation-link, SEO and performance evidence is produced against agreed project thresholds.

## Explicit exclusions

Real payment, refunds, automatic communications, customer accounts, marketing, price-changing customizations, campaign priority configuration and advanced editorial audit are outside this functional package.
