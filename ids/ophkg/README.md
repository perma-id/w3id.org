# OphKG — Ophthalmology Knowledge Graph and Ontology

Persistent identifier: <https://w3id.org/ophkg/>

OphKG is an ophthalmology-domain ontology and knowledge graph. This identifier
provides stable IRIs for the OphKG core ontology, its individual (ABox) data, and
its SHACL shapes.

## Redirect targets

| w3id IRI | Resolves to |
|---|---|
| `https://w3id.org/ophkg/core` | `https://raw.githubusercontent.com/hearAsk/w3id/main/ontologies/ophkg-core.owl` |
| `https://w3id.org/ophkg/0.6.0/core` | `https://raw.githubusercontent.com/hearAsk/w3id/main/ontologies/ophkg-core.owl` (current version) |
| `https://w3id.org/ophkg/individuals` | `https://raw.githubusercontent.com/hearAsk/w3id/main/ontologies/ophkg-individuals.ttl` |
| `https://w3id.org/ophkg/ind/<local>` | `https://raw.githubusercontent.com/hearAsk/w3id/main/ontologies/ophkg-individuals.ttl` |
| `https://w3id.org/ophkg/shapes` | `https://raw.githubusercontent.com/hearAsk/w3id/main/shapes/ophkg-shapes.ttl` |
| any other path | `https://github.com/hearAsk/w3id` |

The rules that are actually executed are in `.htaccess` in this directory; this
file is the human-readable summary of them.

## Contact

This space is administered by:

- KNeyeInno Maintainer
- 744535612@qq.com
- GitHub username: hearAsk

## Notes

- Ontology version 0.6.0. Namespaces: `https://w3id.org/ophkg/core#` for
  terms, `https://w3id.org/ophkg/ind/` for individuals.
- Files with the `.owl` suffix are serialized as RDF Turtle.
- License: CC BY 4.0 (declared in the ontology itself via `dcterms:license`).
