# Business Rules — Il Forno Nero V2

> External Business Analysis package. Source: `docs/v2/PDD.md` and `FUNCTIONAL-REQUIREMENTS.md` in this directory.

## Permission matrix

| Operation | Global administrator | Owner | Employee | Visitor |
| --- | --- | --- | --- | --- |
| View public gallery, reviews and FAQ | Yes | Yes | Yes | Yes |
| CRUD gallery, reviews and FAQ | Yes | Yes | No | No |
| Immediate publication of those contents | Yes | Yes | No | No |
| Add/edit/remove the visit cart | No | No | No | Yes |
| Confirm simulated guest order | No | No | No | Yes |
| View/operate orders and reservations | Yes | Yes | Yes | No |

## Rules

- **V2-BR-0001:** Carta, Carrito and Click & Collect represent one cart only while the current visit exists; reloading or closing the browser discards it.
- **V2-BR-0002:** Cart quantities and total are consistent in every public cart representation during the visit.
- **V2-BR-0003:** A visitor can change quantity or remove an item before checkout.
- **V2-BR-0004:** An item marked unavailable after it enters the cart remains visible but disabled and blocks checkout until removed.
- **V2-BR-0005:** A product observation is one free-text note per ordered item and never changes the price.
- **V2-BR-0006:** Checkout is exclusively on Carrito and requires name, email, telephone and pickup choice of 30 or 45 minutes.
- **V2-BR-0007:** One checkout attempt produces at most one order. A repeat or replay returns no second order.
- **V2-BR-0008:** A successful order starts as `pagado` with payment explicitly identified as simulated; it never represents a real charge.
- **V2-BR-0009:** Owner and global-administrator changes to gallery, reviews and FAQ publish directly; employee changes are not allowed in these areas.
- **V2-BR-0010:** A review requires author name, profile image, text and a rating in the inclusive range one to five.
- **V2-BR-0011:** Gallery title/description and FAQ question/answer are Spanish content in V2.
- **V2-BR-0012:** The reservation remains on the home page and preserves V1 contact, slot, status and internal-operation rules.
- **V2-BR-0013:** Public V2 journeys are Spanish only; absent locales and selector must not be exposed as active public controls.
- **V2-BR-0014:** Google Reviews is not an active integration in V2; reviews are manually managed content.
