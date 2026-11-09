# OpenEvo ConceptBase (OECB)

Permanent identifier namespace for the OpenEvo Computational Curriculum Studies (CCS) Lab's ConceptBase — the shared ontology, JSON Schemas, and controlled vocabularies that let independently governed curriculum-knowledge repositories (Learning Progression Models, Strands, Collections) interoperate.

Homepage: https://w3id.org/openevo/
Source / issue tracker: https://github.com/openevo-ccs/conceptbase
Specification (source of truth): https://github.com/openevo-ccs/conceptbase/blob/main/docs/oecb_specifications.md

## Resolved sub-paths

| Path | Resolves to |
|---|---|
| `https://w3id.org/openevo/ontology` | The core ontology (raw YAML; `#ClassName` fragments select a class client-side) |
| `https://w3id.org/openevo/vocab/{name-with-version}` | A controlled vocabulary file, e.g. `vocab/BIO-CORE-v1.0.0` |
| `https://w3id.org/openevo/concept/{id}` | A single Concept instance as flat JSON, e.g. `concept/OE-CONCEPT-000102` |
| `https://w3id.org/openevo/competency/{id}` | A single Competency instance as flat JSON, e.g. `competency/OE-COMPETENCY-000150` |
| `https://w3id.org/openevo/alignment/{id}` | A cross-vocabulary alignment record as flat JSON |
| `https://w3id.org/openevo/lpm/{id}` | The dependent repository that owns a given Learning Progression Model identifier |
| `https://w3id.org/openevo/strand/{id}` | The dependent repository that owns a given Strand identifier |
| `https://w3id.org/openevo/schemas/{name}.schema.json` | A JSON Schema document (raw YAML) |

This is an intentional MVP: everything above resolves to something real today, but only as flat JSON / raw YAML — full content negotiation (JSON-LD, RDF, SPARQL) is planned (see the specification's phased roadmap) and will be added without changing any identifier or requiring a new PR to this repository, since redirect targets are keyed by stable URL patterns rather than per-identifier rules.

## Contact

This space is administered by:

**Dustin Eirdosh**
GitHub: [dustineirdosh](https://github.com/dustineirdosh)

OpenEvo Computational Curriculum Studies (CCS) Lab — https://openevo.eva.mpg.de
