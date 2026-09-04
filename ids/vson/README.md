# /vson/

Permanent identifiers for **VSON — Visual Scene Ontology Notation**: an
Apache-2.0 OWL 2 RL ontology plus SHACL shapes and three concrete syntaxes
(Turtle-star, Penman, VSON-X) for representing visual scenes — entities,
qualities, RCC-8 spatial topology, Allen interval relations, events, and
perspectival framing — as validatable RDF graphs.

Source repository: <https://github.com/yamancan/visual-scene-ontology>

## Redirects

All targets live at <https://vson.pages.dev/>, a static site assembled from
the repository's `ontology/`, `shapes/`, and `tools/schema/` directories.

| w3id path | Accept | Target |
|---|---|---|
| `/vson/v1/ontology` | `text/turtle` (default) | `…/v1/ontology.ttl` (303) |
| `/vson/v1/ontology` | `text/html` | landing page `#ontology` (303) |
| `/vson/v1/{rcc8,allen,shapes,shapes-relaxed}` | as above | `…/v1/$1.ttl` (303) |
| `/vson/v1/context.jsonld` | — | `…/v1/context.jsonld` (302) |
| `/vson/v1/schema/*.schema.json` | — | `…/v1/schema/*` (302) |
| anything else under `/vson/` | — | landing page (302) |

The namespaces are hash-based (`https://w3id.org/vson/v1/ontology#Composition`),
so a single rule per document serves both term and document IRIs. Content
types (`text/turtle`, `application/ld+json`, `application/schema+json`) and
`Access-Control-Allow-Origin: *` are set on the target side.

## Maintainer

- Yamancan — GitHub: [@yamancan](https://github.com/yamancan)
