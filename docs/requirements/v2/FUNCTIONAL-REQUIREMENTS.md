# Functional Requirements — Il Forno Nero V2

> External Business Analysis package. Source: `docs/v2/PDD.md` at project commit `d366f01317b2c639d63e443c888c24e4c5d6db3f`. Status: `READY_FOR_PRODUCT_OWNER_APPROVAL`; it is not a canonical BMSF artifact.

## Baseline and scope change

This package supplements the approved V1 requirements. It supersedes V1 only where the V2 PDD explicitly says so: public Spanish-only delivery for V2 and a free-text, no-price-impact product observation rather than configured product options. All V1 reservation, order-operation, campaign, account and privacy rules remain in force unless stated otherwise.

### V2-FR-0001 — Public navigation and visit-scoped cart

**Source:** V2-PR-0001, V2-PR-0002, V2-PR-0010.  
**Actors:** visitor.  
**Requirement:** The public website shall expose Carta and Carrito as separate pages. Carta, Carrito and the Click & Collect summary shall show one cart state for the current visit only.

**Acceptance criteria**

- Given an item or quantity is changed, when the visitor moves between Carta, Carrito and Click & Collect during the same visit, then the items, quantities and total match.
- Given the visitor reloads the page or opens a new browser session, when returning to the website, then the cart is empty.
- Given public navigation, when the visitor selects Carta or Carrito, then the corresponding page opens; no new subpages are introduced for Nosotros, Delivery or Noticias.

### V2-FR-0002 — Edit cart and handle unavailable items

**Source:** V2-PR-0003, V2-CAP-0002.  
**Actors:** visitor.  
**Requirement:** A visitor shall add available products, change each quantity, remove items and add one free-text observation per item without changing its price.

**Acceptance criteria**

- Given an available product, when added, then it appears in the cart and the total updates.
- Given a cart item, when its quantity changes or it is removed, then all cart summaries and the total update.
- Given an item becomes unavailable after being added, when the cart is viewed or checkout is attempted, then the item remains visible but disabled and checkout is blocked until it is removed.
- Given an observation is entered, when the order is submitted, then it is recorded with that item and does not alter the price.

### V2-FR-0003 — Submit one simulated pickup order

**Source:** V2-PR-0004, V2-PR-0005.  
**Actors:** visitor; employee, owner and global administrator as recipients of the operation.  
**Preconditions:** non-empty cart with no unavailable items.  
**Requirement:** Carrito shall be the only public checkout surface. It shall require name, email, telephone and pickup in 30 or 45 minutes, state that payment is simulated, and create one order with state `pagado` for internal operation.

**Acceptance criteria**

- Given missing or invalid contact data, no pickup choice or an invalid cart, when confirmation is attempted, then field-specific feedback is shown and no order is created.
- Given a valid checkout, when simulated payment is confirmed, then exactly one order is created as `pagado` and the visitor receives a Spanish confirmation with its summary and chosen pickup time.
- Given repeated activation, a delayed response, a retry or a replay of the same checkout, then it must not create a second order for that checkout attempt.
- Given the order appears in CMS, then authorised internal users can see and operate it under the V1 order rules.

### V2-FR-0004 — Manage gallery content

**Source:** V2-PR-0006.  
**Actors:** owner, global administrator, employee, visitor.  
**Requirement:** Owners and global administrators shall create, read, update and delete gallery entries with image, Spanish title and Spanish description. Their changes publish immediately; employees have no gallery management permission.

**Acceptance criteria**

- Given an owner or global administrator creates, edits or deletes an entry, then the public gallery reflects that change without further approval.
- Given an employee attempts the same action, then the action is denied by the server.
- Given a visitor opens the home-page gallery, then only publicly available entries and their title/description are shown.

### V2-FR-0005 — Manage and display reviews

**Source:** V2-PR-0007.  
**Actors:** owner, global administrator, employee, visitor.  
**Requirement:** Owners and global administrators shall create, read, update and delete manual reviews with author name, profile image, text and rating from one to five stars. The home page shall display them in an animated, accessible carousel. Employees cannot manage them.

**Acceptance criteria**

- Given a review is saved, then author name, profile image, text and a rating from one through five are required.
- Given an owner or global administrator creates, edits or deletes a review, then the public carousel reflects it immediately.
- Given a visitor uses a keyboard or does not use animation, then they can operate controls and consult every review.
- Given an employee attempts review management, then the server denies it.

### V2-FR-0006 — Manage FAQ content

**Source:** V2-PR-0008.  
**Actors:** owner, global administrator, employee, visitor.  
**Requirement:** Owners and global administrators shall create, read, update and delete Spanish FAQ questions and answers. Their changes publish immediately on the home page; employees cannot manage them.

**Acceptance criteria**

- Given an owner or global administrator creates, edits or deletes a FAQ, then the home-page FAQ reflects the change without further approval.
- Given an employee attempts FAQ management, then the server denies it.

### V2-FR-0007 — Preserve home-page reservations

**Source:** V2-PR-0009.  
**Actors:** visitor, employee, owner, global administrator.  
**Requirement:** The public reservation form shall remain on the home page and retain all V1 validation, state and internal-operation rules.

**Acceptance criteria**

- Given a valid reservation submission, then it is created as `solicitada` and visible in the CMS Reservations area.
- Given the visitor uses the new navigation, then the reservation form remains reachable from the home page.

### V2-FR-0008 — Spanish-only V2 public experience

**Source:** V2-PR-0011.  
**Actors:** visitor, owner, global administrator.  
**Requirement:** V2 public routes and V2-managed content shall be delivered in Spanish. The public language selector and non-Spanish V2 locales are deferred.

**Acceptance criteria**

- Given a visitor completes Carta, Carrito, reservation, gallery, reviews or FAQ journeys, then they are presented in Spanish.
- Given no non-Spanish locale is available in V2, then public navigation exposes no inactive locale selector or broken locale link.

## Explicit exclusions

Customer profiles, cart recovery, Google Reviews integration, real payment, automated communication, price-changing options, further public subpages and non-Spanish locales remain outside V2.
