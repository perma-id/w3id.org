# /mlca/ — Medieval London Customs Accounts

Permanent identifiers for entities in the Medieval London Customs Accounts
digital humanities project.

## Maintainer

- **Stephen Gadd** — <https://github.com/docuracy>

## Homepage

<https://docuracy.github.io/London_Customs_Accounts/>

## URI patterns

| Pattern | Entity type | Example |
|---------|-------------|---------|
| `/mlca/{lading-id}` | Lading record | `/mlca/4-11-B-0001` |
| `/mlca/{lading-id}-{seq}` | Cargo within a lading | `/mlca/4-11-B-0001-0001` |
| `/mlca/glossary/{term}` | Commodity glossary term | `/mlca/glossary/cloth` |
| `/mlca/context` | JSON-LD context document | `/mlca/context` |

## Content negotiation

- `Accept: application/ld+json` or `application/json` → 303 redirect to
  static JSON(-LD) files on GitHub Pages (`application/json` Content-Type).
- Default → 303 redirect to an HTML entity resolver page.

