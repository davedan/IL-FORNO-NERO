# Use Cases — Il Forno Nero V2

> External Business Analysis package. V1 use cases remain applicable where V2 does not supersede them.

## UC-V2-0001 — Build and alter a visit cart

**Actor:** visitor.  
**Precondition:** a public product is available.

1. The visitor opens Carta and adds an available product, optionally writing a free-text observation.
2. Carta, Click & Collect and Carrito show the same item, quantity and total during the visit.
3. The visitor changes a quantity or removes an item in Carrito.
4. The updated state is shown in every cart representation.

**Alternatives:** if the item becomes unavailable, it remains visible but is disabled; the visitor removes it before checkout. Refreshing or reopening the browser produces an empty cart.

## UC-V2-0002 — Confirm a simulated pickup order

**Actor:** visitor.  
**Precondition:** a non-empty cart without unavailable items.

1. The visitor opens Carrito.
2. They provide name, email, telephone and pickup in 30 or 45 minutes.
3. They confirm the simulated payment once.
4. The service validates the current cart and records one `pagado` order.
5. The visitor receives a Spanish confirmation containing the summary and pickup time.

**Alternatives:** invalid fields, a stale unavailable item or a repeat/replay do not create a second order. The visitor corrects validation errors or removes the unavailable item.

## UC-V2-0003 — Manage gallery content

**Actor:** owner or global administrator.  
**Precondition:** active authenticated internal account.

1. The actor creates, edits or deletes a gallery entry with image, title and description.
2. The change publishes directly.
3. The public home-page gallery reflects the current entry set.

**Alternative:** an employee attempting the operation is denied.

## UC-V2-0004 — Manage and browse reviews

**Actors:** owner or global administrator; visitor.

1. The internal actor creates, edits or deletes a review with author, profile image, text and one-to-five-star rating.
2. The change publishes directly.
3. A visitor browses the review carousel by available controls, regardless of animation.

**Alternative:** employee management and any Google data import are unavailable.

## UC-V2-0005 — Manage FAQ

**Actor:** owner or global administrator.  
**Precondition:** active authenticated internal account.

1. The actor creates, edits or deletes a Spanish question and answer.
2. The change publishes directly.
3. Visitors see the revised FAQ on the home page.

**Alternative:** employee management is denied.

## UC-V2-0006 — Request a reservation from the home page

**Actor:** visitor.

1. The visitor opens the home page and completes the existing reservation form.
2. The V1 rules validate the contact data and current slot.
3. The service records the request as `solicitada` in CMS Reservations.

**Alternative:** no route reorganisation removes this form or changes its V1 internal operation flow.
