# RockWorx Acquisition Ontology

This namespace hosts permanent identifiers for the **RockWorx Acquisition Ontology**: an open, BFO/CCO-conformant ontology of the U.S. Department of Defense acquisition lifecycle (DoDI 5000.85) and its 2025 Warfighting Acquisition System / JFRP reform, together with a working SysML v2 integration and a legislative-horizon layer.

- Source repository: https://github.com/RockWorx/acquisition-ontology
- Documentation: https://rockworx.github.io/acquisition-ontology/

## Identifiers

Each identifier performs content negotiation. An `Accept: text/turtle` request returns the Turtle serialization; `Accept: application/rdf+xml` returns RDF/XML; an HTML (browser) request is redirected to the documentation.

| Identifier | Module |
| --- | --- |
| `https://w3id.org/rockworx/acq` | Base module (acquisition-lifecycle core) |
| `https://w3id.org/rockworx/acq/transform` | Warfighting Acquisition System / JFRP transform overlay |
| `https://w3id.org/rockworx/acq/sysml` | SysML v2-to-ontology link bridge |
| `https://w3id.org/rockworx/acq/horizon` | Legislative-horizon layer (prospective changes) |

## Contacts

- RockWorx Aerospace <mike@rockworx.io> (GitHub: [@RockWorx](https://github.com/RockWorx))
