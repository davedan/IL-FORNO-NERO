# Use Cases — Il Forno Nero

> External Business Analysis proposal. Source PDD content: `9e54d1350525f2fee540e77e0d5d83d133e0897e`.

## UC-0001 — Request a reservation

**Actor:** visitor.
**Preconditions:** a public booking slot is available.

1. The visitor selects date, slot and diner count.
2. The visitor provides name, email and telephone.
3. The website validates all required data and current slot availability.
4. The system records the reservation as `solicitada`.

**Alternatives:** unavailable or closed slots cannot be submitted; a duplicate submission must not create an unintended second request.
**Postcondition:** internal users can view and operate the reservation.

## UC-0002 — Operate a reservation after a call

**Actor:** employee, owner or global administrator.
**Preconditions:** authenticated active account and existing reservation.

1. The internal user opens the reservation.
2. They update contact, date, time, diner count or state as agreed with the caller.
3. The system saves the current record for internal users.

**Alternatives:** visitor cancellation is not available on the public site; staff resolve conflicting slot requests manually.

## UC-0003 — Submit a pickup order

**Actor:** visitor.
**Preconditions:** selected products are available.

1. The visitor selects products, quantities and configured no-price-impact customizations.
2. The visitor selects pickup in 30 or 45 minutes.
3. The visitor provides name, email and telephone.
4. The visitor completes the simulated payment flow.
5. The system records the order as `pagado` and labels the payment as simulated.

**Alternatives:** unavailable products cannot be added; a visitor who wants cancellation is directed to contact the business.

## UC-0004 — Operate a pickup order after a call

**Actor:** employee, owner or global administrator.
**Preconditions:** authenticated active account and existing order.

1. The internal user opens the order.
2. They change products, quantities, customizations, pickup time or state.
3. The system saves the order and exposes the updated current state to internal users.

## UC-0005 — Propose and approve menu content

**Actors:** employee, owner.

1. An employee creates or edits a category, product, availability setting or customization.
2. The system stores the change as pending.
3. An owner approves or rejects it.
4. Approval publishes the new version; rejection preserves the current published version.

## UC-0006 — Configure and show campaigns

**Actors:** employee, owner, visitor.

1. An employee creates or edits campaign copy, image, call to action, active state and schedule.
2. An owner approves or rejects the campaign.
3. On every public entry, the website evaluates approved active campaigns against date, weekday and time.
4. All matching campaigns appear sequentially.

## UC-0007 — Create and recover an internal account

**Actors:** global administrator, owner, employee.

1. A global administrator creates an owner or employee; an owner creates an employee only.
2. The creator delivers a temporary password manually.
3. The new user signs in and must replace that password.
4. If access is forgotten, an authorized creator resets it and delivers a new temporary password.
5. If an account is deactivated, any subsequent protected action is denied.
