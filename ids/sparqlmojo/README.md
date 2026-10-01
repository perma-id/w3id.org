# SPARQLMojo

Permanent identifiers for vocabularies published by the
[SPARQLMojo](https://gitlab.com/gitterdan/sparqlmojo) project, an MIT-licensed
SQLAlchemy-like ORM for SPARQL endpoints.

## Identifiers

| Identifier | What it is |
|---|---|
| `https://w3id.org/sparqlmojo/temporal#` | **Temporal Graph Vocabulary** — a small vocabulary for bitemporal RDF: when a triple held in the world (valid time) and when a record said so (transaction time), in plain RDF 1.1 with no dependency on RDF-star or RDF 1.2. |

`https://w3id.org/sparqlmojo/temporal` content-negotiates: an RDF request
(`text/turtle`, `application/rdf+xml`, `application/n-triples`,
`application/ld+json`) resolves to the Turtle serialisation, anything else to the
human-readable reference page.

The Temporal Graph Vocabulary mints only four interval bounds. Triple identity
reuses classic W3C reification (`rdf:subject`/`rdf:predicate`/`rdf:object` on an
`rdf:Statement`), and the two transaction-time bounds carry
`rdfs:subPropertyOf` alignments to `prov:generatedAtTime` and
`prov:invalidatedAtTime`, so a consumer unfamiliar with this vocabulary can still
interpret the provenance half.

## Contact

Oliver Sampson — GitHub username: [MrSampson](https://github.com/MrSampson)
