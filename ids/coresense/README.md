# /coresense/

Permanent identifiers for the **CORESENSE** project — an EU Horizon Europe
project (grant #101070254) on cognitive architectures for robot autonomy,
building understanding-based robot systems.

* Project website: <https://www.coresense.eu>
* GitHub organisation: <https://github.com/CoreSenseEU>

## Identifiers

| Identifier | Resolves to | Purpose |
| --- | --- | --- |
| `https://w3id.org/coresense/cso` | <https://coresenseeu.github.io/cso/> | The CoreSense Ontology (CSO), latest version |
| `https://w3id.org/coresense/cso/YYYY-MM-DD` | `https://coresenseeu.github.io/cso/YYYY-MM-DD/` | A specific, immutable release of CSO |

### The CoreSense Ontology (CSO)

CSO is an OWL 2 ontology, serialized in Turtle, describing model-based cognition
in autonomous systems: entities, systems and their environments; models,
modelets and the engines that exert them; goals, tasks, missions and
capabilities; and the action-control pipeline.

Term IRIs are hash-style — `https://w3id.org/coresense/cso#Modelet`,
`#Engine`, `#exerts` — so the fragment is never sent to the server and a single
pair of rules resolves the whole vocabulary.

Content is negotiated on `Accept`:

| `Accept` | Served |
| --- | --- |
| `text/html` (or a `Mozilla/*` user agent) | HTML documentation |
| `text/turtle` | `cso.ttl` |
| `application/rdf+xml` | `cso.owl` |
| `application/ld+json` | `cso.jsonld` |
| `application/n-triples` | `cso.nt` |
| anything else, or no `Accept` | `cso.ttl` (the canonical serialization) |

The redirect target is a GitHub Pages site published from
[CoreSenseEU/cso](https://github.com/CoreSenseEU/cso), which is generated on
every release from the ontology source in
[CoreSenseEU/ontology](https://github.com/CoreSenseEU/ontology).

Released under the Apache License 2.0.
Copyright © 2022–2026 The CORESENSE Consortium.

## Contact

This space is administered by:

**Ricardo Sanz** <ricardo.sanz@upm.es>
Autonomous Systems Laboratory, Universidad Politécnica de Madrid
GitHub username: [rsanz](https://github.com/rsanz)
