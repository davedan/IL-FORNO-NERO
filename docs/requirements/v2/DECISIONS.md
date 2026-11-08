# V2 Business Analysis Decisions — Il Forno Nero

> This record preserves the Product Owner decisions in `docs/v2/DECISIONS.md` and records their functional interpretation. It does not alter product scope or select technical implementation.

| ID | Functional interpretation | State | Source |
| --- | --- | --- | --- |
| V2-BA-DEC-0001 | The cart is a current-visit interaction only; no recovery expectation exists after reload or browser closure. | CONFIRMED | V2-DEC-0006 |
| V2-BA-DEC-0002 | Duplicate prevention applies to repeated clicks, retries and replays of one checkout attempt, not merely visual button state. | CONFIRMED | V2-DEC-0009 |
| V2-BA-DEC-0003 | Owner and global administrator have direct public-content CRUD; employee has none for gallery, reviews and FAQ. | CONFIRMED | V2-DEC-0005 |
| V2-BA-DEC-0004 | Manual reviews use Google-like display fields but do not imply a Google integration. | CONFIRMED | V2-DEC-0003 |
| V2-BA-DEC-0005 | Spanish-only V2 behavior supersedes the V1 locale-preservation expectation for V2 public journeys. | CONFIRMED | V2-DEC-0011 |
| V2-BA-DEC-0006 | Free-text observation without price impact supersedes configured customisation options for V2 orders. | CONFIRMED | V2-DEC-0012 |
