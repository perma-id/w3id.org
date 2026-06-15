# /mhm/ — Mapping Hebrew Manuscripts (MHM)

This [W3ID](https://w3id.org) namespace provides persistent URIs for the
**Mapping Hebrew Manuscripts (MHM)** project — a doctoral research project at
Bar-Ilan University that converts Hebrew manuscript catalog records (MARC)
into a CIDOC-CRM / LRMoo aligned ontology (HMO) and publishes the result to
both Wikidata and a project-owned Wikibase Cloud instance.

The MHM pipeline emits `https://w3id.org/mhm/manuscript/<nli-control-number>`
as the value of Wikidata property `P2888` (exact match) on every manuscript
item it projects to Wikidata, bridging the public Wikidata projection to the
project's canonical HMO graph.

## Resolved URIs

| URI pattern                                      | Target                                                                 |
|--------------------------------------------------|------------------------------------------------------------------------|
| `w3id.org/mhm/`                                  | https://mhm-hmo.wikibase.cloud/                                        |
| `w3id.org/mhm/manuscript/<nli-control-number>`   | https://mhm-hmo.wikibase.cloud/wiki/MS_<nli-control-number>            |
| `w3id.org/mhm/person/<id>`                       | https://mhm-hmo.wikibase.cloud/wiki/Person_<id>                        |
| `w3id.org/mhm/work/<id>`                         | https://mhm-hmo.wikibase.cloud/wiki/Work_<id>                          |
| `w3id.org/mhm/ontology`                          | https://raw.githubusercontent.com/alexandergolbergwix/pipeline/main/ontology/hebrew-manuscripts.ttl |

## Related resources

- Project repository: <https://github.com/alexandergolbergwix/pipeline>
- HMO ontology (Turtle): <https://github.com/alexandergolbergwix/pipeline/blob/main/ontology/hebrew-manuscripts.ttl>
- Wikibase Cloud instance: <https://mhm-hmo.wikibase.cloud>
- Institution: Bar-Ilan University

## Maintainers

- Alexander Goldberg
    - [@alexandergolbergwix](https://github.com/alexandergolbergwix)
    - <alexandergo@wix.com>
    - Bar-Ilan University
