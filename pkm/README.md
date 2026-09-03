# pkm

A persistent URI namespace at https://w3id.org/pkm with Linked Data resources on
Personal Knowledge Management (PKM) for the Knowledge System Architecture (KSA)
project, which integrates Obsidian, Neo4j, Claude, diabetes data, Python, and Swift.

Redirects to GitHub Pages at https://dpw67.github.io/pkm/, with content
negotiation: `Accept: text/turtle` gets RDF, anything else gets HTML.

## What resolves today

| URI | Contents |
| --- | --- |
| `/vocab` | SKOS concept scheme — 223 concepts, 18 collections |
| `/vocab/{Term}` | An individual concept or collection, 303 to its Turtle file |
| `/agents#{Name}` | People and software credited in the vocabulary |
| `/resources#{Name}` | Documents the vocabulary cites |
| `/ontology`, `/taxonomy` | Declared and resolving; no terms minted yet |

Planned, described but not yet populated: `/shapes` (SHACL, JSON Schema),
`/examples`, `/graph` (Neo4j, Cypher), `/tools`.

Vocabulary version 0.1.1. Terms are an early draft and may change before 1.0.0.
Nothing is deleted outright — a retired URI keeps resolving, marked
`owl:deprecated` and pointed at its replacement with `dcterms:isReplacedBy`.

## Contact

This space is administered by Doug Warren.
Email: doug@warrenweb.net (GitHub: @dpw67)

Source: https://github.com/dpw67/pkm
Additional information: https://blog.warrenweb.net

## Maintainers
- @dpw67