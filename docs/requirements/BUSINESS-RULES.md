# Business Rules — Il Forno Nero

> External Business Analysis proposal. Source PDD content: `f046ed0718cadcea36a67ac8ca74563fae13ad06`.

## Role matrix

| Operation | Global administrator | Owner | Employee |
| --- | --- | --- |
| View reservations and orders | Yes | Yes | Yes |
| Update reservation/order details and state | Yes | Yes | Yes |
| Create/edit menu or campaign drafts | Yes | Yes | Yes |
| Approve/reject employee changes | Yes | Yes | No |
| Publish direct content changes | Yes | Yes | No |
| Manage employees | Yes | Yes | No |
| Manage owners | Yes | No | No |
| Manage global administrators | Yes | No | No |

## Rules

- **BR-0001:** Public visitors are guests and cannot access the CMS.
- **BR-0002:** Name, email and telephone are mandatory for every reservation and order.
- **BR-0003:** Customer data is used only for manual operational contact in the MVP; no automated messages or marketing are sent.
- **BR-0004:** Reservation and order contact data is retained indefinitely pending legal validation.
- **BR-0005:** A temporary password is delivered manually; it must be changed before normal CMS use.
- **BR-0006:** Password reset is manual and produces a new temporary password.
- **BR-0007:** A deactivated account loses access immediately, including an active session.
- **BR-0008:** Employee menu and campaign changes require owner approval; approval or rejection needs no comment.
- **BR-0009:** Owners may publish direct content changes.
- **BR-0010:** A product marked unavailable remains visible but cannot enter a new order.
- **BR-0011:** Product customizations are limited to options configured for that product and never alter price in the MVP.
- **BR-0012:** A reservation begins as `solicitada`; only internal users change it to `confirmada`, `cancelada` or `completada`.
- **BR-0013:** An order begins as `pagado` only after simulated checkout; `pagado` must not represent a real charge.
- **BR-0014:** Only internal users cancel or change an existing reservation or order after customer contact.
- **BR-0015:** Visitors choose 30- or 45-minute pickup; staff may later change the pickup time.
- **BR-0016:** Owners configure booking slots and exceptional closures. Conflicting reservations are manually resolved by staff.
- **BR-0017:** A campaign is displayable only when approved, active and within its configured date, weekday and time schedule.
- **BR-0018:** Every displayable campaign is shown sequentially on each website entry. Campaign order is not configurable in the MVP.
- **BR-0019:** Inactive, pending or out-of-schedule campaigns never display publicly.
- **BR-0020:** Real payment, notification delivery, customer accounts and marketing remain out of scope.
