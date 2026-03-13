# /smn/

Salmon Domain Ontology shared namespace (`smn:`).

[`https://w3id.org/smn`](https://w3id.org/smn) is intended to be the persistent base for the shared Salmon Domain Ontology layer.

## Canonical IRIs

- Latest ontology IRI: `https://w3id.org/smn`
- Term namespace: `https://w3id.org/smn/`
- Module namespace: `https://w3id.org/smn/modules/<module-name>`
- Research build: `https://w3id.org/smn/research`
- Case-study build: `https://w3id.org/smn/rda-case-study`
- Profile roots:
  - `https://w3id.org/smn/profile/hakai/`
  - `https://w3id.org/smn/profile/neville/`
  - `https://w3id.org/smn/profile/rda-case-study/`

## Current redirect behavior

This first registration uses conservative `303` redirects to the current published Turtle artifacts in the maintainer repository.

It currently supports:
- the main shared ontology
- module paths
- research and case-study builds
- profile bridge paths
- term-path redirects into the main shared graph

A future follow-up may replace these raw-GitHub Turtle redirects with the fuller DFO-style publication pattern (HTML/Turtle/RDFXML/JSON-LD plus versioned release redirects) once those public targets exist.

## Maintainer repository

- <https://github.com/salmon-data-mobilization/salmon-domain-ontology>

## Contact

This space is administered by:

**Brett Johnson**  
GitHub: [Br-Johnson](https://github.com/Br-Johnson)
