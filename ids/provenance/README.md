# w3id.org/provenance

Persistent URIs for a CIDOC-CRM based provenance database
documenting artworks, their physical provenance features and their
provenance chain (owners and custodians with sources).

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
| `https://w3id.org/provenance/actor/{id}` | E39 Actor (register of persons and corporate bodies: owners, custodians, archives, restorers, …) |
| `https://w3id.org/provenance/loose_part/{id}` | E22 Human-Made Object (loose part of an artwork, e.g. frame or mount) |
| `https://w3id.org/provenance/provenance_entry/{id}` | E7 Activity (one line of the provenance chain: E8 Acquisition or E10 Transfer of Custody) |
| `https://w3id.org/provenance/citation/{id}` | E31 Document (source reference documenting a provenance entry or the production) |
| `https://w3id.org/provenance/archival_document/{id}` | E22 Human-Made Object (archival document) |
| `https://w3id.org/provenance/literature/{id}` | E31 Document (publication) |
| `https://w3id.org/provenance/place/{id}` | E53 Place |
| `https://w3id.org/provenance/image/{id}` | E38 Image (of an artwork) |
| `https://w3id.org/provenance/technicalfeature_image/{id}` | E38 Image (of a provenance feature) |
| `https://w3id.org/provenance/loose_part_image/{id}` | E38 Image (of a loose part) |
| `https://w3id.org/provenance/vocab/{vocabulary}/{id}` | E55 Type / E57 Material (controlled vocabulary term) |
| `https://w3id.org/provenance/ontology#{Term}` | Custom classes and properties |
| `https://w3id.org/provenance/graph` | Named graph of the dataset |

## Content Negotiation

All requests are forwarded unchanged to the project's resolver
(`https://id.bermuda-solutions.com/provenance/…`), which redirects (303) to:

- `Accept: application/ld+json` or `application/json` → REST API (machine-readable)
- Default → HTML detail page (human-readable); provenance entries and citations
  → the provenance section of their artwork; images and vocabulary terms → REST API
- Nodes of a record (e.g. `…/object/{id}/title_n1`) → the record

## Maintainer

- **Name:** David Witassek
- **Email:** david@witassek.ch
- **GitHub:** [dwitassek](https://github.com/dwitassek)
