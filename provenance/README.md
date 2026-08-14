# w3id.org/provenance

Persistent URIs for a CIDOC-CRM based provenance database
documenting artworks and their physical provenance features.

## Namespace

`https://w3id.org/provenance/`

## URI Patterns

| Pattern | Entity |
|---|---|
| `https://w3id.org/provenance/werk/{id}` | E22 Human-Made Object (artwork) |
| `https://w3id.org/provenance/kuenstler/{id}` | E39 Actor (artist) |
| `https://w3id.org/provenance/provenienzmerkmal/{id}` | E25 Human-Made Feature |
| `https://w3id.org/provenance/modifikationsprozess/{id}` | E11 Modification |
| `https://w3id.org/provenance/ontology` | Custom ontology properties |

## Content Negotiation

- `Accept: application/ld+json` or `application/json` → REST API (machine-readable)
- Default → HTML frontend (human-readable)

## Maintainer

- **Name:** David Witassek
- **Email:** david@witassek.ch
- **GitHub:** [dwitassek](https://github.com/dwitassek)
