# Intellicat namespace

Permanent identifiers for ontologies and vocabularies published by
Intellicat.

## Identifiers

| IRI | Resource |
|-----|----------|
| `https://w3id.org/intellicat/caveat` | CAVEAT ontology (hash namespace) |
| `https://w3id.org/intellicat/caveat/modules/<module>` | Ontology modules |
| `https://w3id.org/intellicat/caveat/imports/<excerpt>` | BFO and IAO excerpts |
| `https://w3id.org/intellicat/caveat/examples/<file>` | ABox usage examples |
| `https://w3id.org/intellicat/caveat/vocabularies/<file>` | Controlled vocabularies |

CAVEAT (Controlled Annotation Vocabulary for Epistemic Aberration Types) is
an OWL 2 ontology classifying unreliable scientific literature and the
observable markers used to detect it. Source and issue tracker:
https://github.com/intellicat-ai/caveat

Content negotiation is supported on the namespace root: `text/turtle` and
`application/rdf+xml` resolve to serialisations, everything else resolves to
human-readable documentation.

## Maintainers

| Name | GitHub |
|------|--------|
| Valentin Rodionov | @vrodionov |