# OntoJourney persistent identifiers

This directory defines persistent redirects for OntoJourney, a reference
ontology for narrative-heroic learning journeys.

## Identifiers

- `https://w3id.org/ontojourney/core` — ontology IRI
- `https://w3id.org/ontojourney/core#` — entity namespace
- `https://w3id.org/ontojourney/core/0.9` — immutable Core v0.9.0 version IRI
- `https://w3id.org/ontojourney/core/0.9.1` — Core v0.9.1 version IRI

The rules negotiate HTML, Turtle, RDF/XML, JSON-LD, and N-Triples. Entity
fragments such as `#JourneyModel` are resolved by the client after the base
ontology IRI is redirected.

The unversioned ontology IRI negotiates the current public release. Versioned
IRIs remain fixed: adding v0.9.1 does not change the v0.9 targets. The
post-deployment redirect test is maintained in the
[OntoJourney repository](https://github.com/luisfcosta2015/ontojourney/tree/main/w3id).

## Maintainer

- Luis Felipe Coimbra Costa — <https://github.com/luisfcosta2015>

## Project

- Repository: <https://github.com/luisfcosta2015/ontojourney>
- Documentation: <https://luisfcosta2015.github.io/ontojourney/>
- License: CC BY 4.0
