# GAIA-X 4 PLC AAD Research Project Ontologies

Ontologies developed as part of the GAIA-X 4 PLC AAD research project.

## Homepage

- <https://www.gaia-x4futuremobility.de/en/projects/plc-aad>

## Ontologies

| Ontology     | Description                             | IRI                                                          |
| ------------ | --------------------------------------- | ------------------------------------------------------------ |
| general      | Common properties for simulation assets | `https://w3id.org/gaia-x4plcaad/ontologies/general/v3/`      |
| vv-report    | Verification & Validation reports       | `https://w3id.org/gaia-x4plcaad/ontologies/vv-report/v2/`    |
| service      | Service descriptions                    | `https://w3id.org/gaia-x4plcaad/ontologies/service/v1/`      |
| leakage-test | Leakage test methodology                | `https://w3id.org/gaia-x4plcaad/ontologies/leakage-test/v2/` |
| tzip21       | Tezos TZIP-21 token metadata            | `https://w3id.org/gaia-x4plcaad/ontologies/tzip21/v1/`       |

## URL Patterns

- `https://w3id.org/gaia-x4plcaad/ontologies/{ontology}/v{version}/` - Ontology namespace (for prefix)
- `https://w3id.org/gaia-x4plcaad/ontologies/{ontology}/v{version}` - Ontology IRI (for owl:Ontology)
- `https://w3id.org/gaia-x4plcaad/ontologies/{ontology}/v{version}/shapes` - SHACL shapes

## Content Negotiation

- `Accept: text/turtle` - Returns Turtle serialization (.ttl)
- `Accept: application/ld+json` - Returns JSON-LD instance example (.json)
- Default - Returns GitHub repository page

## GitHub Repository

- <https://github.com/GAIA-X4PLC-AAD/ontology-management-base>

## Contacts

- Carlo van Driesten (GitHub: [@2w2cs](https://github.com/2w2cs))
- GAIA-X 4 PLC AAD Project Team
