# w3id.org/provenance

Persistent URIs for a CIDOC-CRM based provenance database
documenting artworks and their physical provenance features.

## Namespace

`https://w3id.org/provenance/`

## URI Patterns

IDs are language-neutral, 16 hexadecimal characters.

| Pattern | Entity |
|---|---|
| `https://w3id.org/provenance/object/{id}` | E22 Human-Made Object (artwork) |
| `https://w3id.org/provenance/production/{id}` | E12 Production (of an artwork) |
| `https://w3id.org/provenance/artist/{id}` | E39 Actor (artist) |
| `https://w3id.org/provenance/technical_feature/{id}` | E25 Human-Made Feature (provenance feature) |
| `https://w3id.org/provenance/modification/{id}` | E11 Modification |
| `https://w3id.org/provenance/actor/{id}` | E39 Actor (involved in a modification) |
| `https://w3id.org/provenance/image/{id}` | E38 Image (of an artwork) |
| `https://w3id.org/provenance/technicalfeature_image/{id}` | E38 Image (of a provenance feature) |
| `https://w3id.org/provenance/vocab/{vocabulary}/{id}` | E55 Type (controlled vocabulary term) |
| `https://w3id.org/provenance/ontology#{Term}` | Custom classes and properties |
| `https://w3id.org/provenance/graph` | Named graph of the dataset |

## Content Negotiation

- `Accept: application/ld+json` or `application/json` → REST API (machine-readable)
- Default → HTML detail page (human-readable); images and vocabulary terms
  currently resolve to the REST API in both cases

## Maintainer

- **Name:** David Witassek
- **Email:** david@witassek.ch
- **GitHub:** [dwitassek](https://github.com/dwitassek)
