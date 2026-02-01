# ENVITED-X Simulation Asset Ontologies

ENVITED-X ontologies for describing simulation assets in the automotive domain.

## Homepage

- https://envited-x.net/

## Ontologies

| Ontology             | Description           | IRI                                                                  |
| -------------------- | --------------------- | -------------------------------------------------------------------- |
| hdmap                | HD Map assets         | `https://w3id.org/ascs-ev/envited-x/hdmap/v5/`                       |
| georeference         | Georeference data     | `https://w3id.org/ascs-ev/envited-x/georeference/v5/`                |
| scenario             | Driving scenarios     | `https://w3id.org/ascs-ev/envited-x/scenario/v5/`                    |
| ositrace             | OSI trace data        | `https://w3id.org/ascs-ev/envited-x/ositrace/v5/`                    |
| simulation-model     | Simulation models     | `https://w3id.org/ascs-ev/envited-x/simulation-model/v2/`            |
| surface-model        | Surface models        | `https://w3id.org/ascs-ev/envited-x/surface-model/v6/`               |
| environment-model    | Environment models    | `https://w3id.org/ascs-ev/envited-x/environment-model/v5/`           |
| simulated-sensor     | Simulated sensors     | `https://w3id.org/gaia-x4plcaad/ontologies/simulated-sensor/v2`      |
| automotive-simulator | Automotive simulators | `https://w3id.org/gaia-x4plcaad/ontologies/automotive-simulator/v1/` |
| survey               | Survey data           | `https://w3id.org/ascs-ev/envited-x/survey/v6/`                      |
| manifest             | Asset manifests       | `https://w3id.org/ascs-ev/envited-x/manifest/v5/`                    |
| envited-x            | ENVITED-X federation  | `https://w3id.org/ascs-ev/envited-x/envited-x/v3/`                   |

## URL Patterns

- `https://w3id.org/ascs-ev/envited-x/{ontology}/v{version}/` - Ontology namespace (for prefix)
- `https://w3id.org/ascs-ev/envited-x/{ontology}/v{version}` - Ontology IRI (for owl:Ontology)
- `https://w3id.org/ascs-ev/envited-x/{ontology}/v{version}/shapes` - SHACL shapes

## Content Negotiation

- `Accept: text/turtle` - Returns Turtle serialization (.ttl)
- `Accept: application/ld+json` - Returns JSON-LD instance example (.json)
- Default - Returns GitHub repository page

## GitHub Repository

- https://github.com/GAIA-X4PLC-AAD/ontology-management-base

## Contacts

- Carlo van Driesten (GitHub: [@2w2cs](https://github.com/2w2cs))
