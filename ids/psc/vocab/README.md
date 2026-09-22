# `/psc/vocab/`

Persistent IRI namespace for the Pacific Salmon Commission's public salmon
controlled vocabularies.

The current alpha is provisional and is not an adopted PSC standard.

## Public authority

- Repository: <https://gitlab.com/pacific-salmon-commission/psc-data-systems/psc-salmon-vocabularies>
- Documentation: <https://pacific-salmon-commission.gitlab.io/psc-data-systems/psc-salmon-vocabularies/>
- Releases: `https://w3id.org/psc/vocab/release/{version}`
- Schemes: `https://w3id.org/psc/vocab/scheme/{scheme_id}`
- Concepts: `https://w3id.org/psc/vocab/concept/{concept_id}`
- Complete Turtle: `https://w3id.org/psc/vocab/psc-vocabularies.ttl`
- Complete JSON-LD: `https://w3id.org/psc/vocab/psc-vocabularies.jsonld`
- Scheme Turtle: `https://w3id.org/psc/vocab/scheme/{scheme_id}.ttl`
- Scheme JSON-LD: `https://w3id.org/psc/vocab/scheme/{scheme_id}.jsonld`
- Concept Turtle: `https://w3id.org/psc/vocab/concept/{concept_id}.ttl`
- Concept JSON-LD: `https://w3id.org/psc/vocab/concept/{concept_id}.jsonld`

Vocabulary and assignment data are published under CC BY 4.0; tooling is MIT.
All redirects use `303 See Other`.

Canonical namespace, scheme, and concept identifiers redirect to their public
HTML authority pages independently of the request's `Accept` header. Machine
representations use the explicit Turtle and JSON-LD identifiers above. This
avoids unsafe regex-based `Accept` handling (including incorrect `q=0` and
quality ordering) and keeps W3ID redirect responses invariant for shared
caches. The explicit scheme and concept identifiers resolve to focused
resource graphs; the complete identifiers resolve to the full released graph.

## Maintainer

Brett Johnson — GitHub: [Br-Johnson](https://github.com/Br-Johnson)
