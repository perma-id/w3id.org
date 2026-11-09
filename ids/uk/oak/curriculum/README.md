# Oak Curriculum Ontology Namespace

This permanent [w3id.org](https://w3id.org) namespace provides stable, persistent identifiers for the **Oak Curriculum Ontology ** and related resources published by **Oak National Academy**.

The namespace is intended to support linked data applications, educational resource discovery, and interoperability across curriculum datasets.

**Namespace:** [https://w3id.org/uk/oak/curriculum/](https://w3id.org/uk/oak/curriculum/)  
**Redirects to:** [https://github.com/oaknational/oak-curriculum-ontology-public/](https://github.com/oaknational/oak-curriculum-ontology-public/)

## Purpose

This namespace provides permanent URIs for:
- Curriculum entities such as subjects, key stages, units, lessons, and concepts.
- Relationships between curriculum elements (e.g., *teaches*, *requires*, *isPartOf*).
- Metadata about educational resources aligned to the National Curriculum.

It ensures that identifiers remain stable even if the underlying data or hosting platform changes.

## Redirects

| URI Pattern | Redirects To |
|-------------|--------------|
| **Ontology** | |
| `/ontology/` | GitHub Pages (HTML) or oak-curriculum-ontology.ttl (RDF) |
| `/ontology.ttl` | oak-curriculum-ontology.ttl |
| `/ontology/shapes/` | oak-curriculum-constraints.ttl |
| `/ontology/shapes.ttl` | oak-curriculum-constraints.ttl |
| **National Curriculum Data** | |
| `/nationalcurriculum/temporal-structure` | data/temporal-structure.ttl |
| `/nationalcurriculum/{subject}-programme-structure` | data/subjects/{subject}/{subject}-programme-structure.ttl |
| `/nationalcurriculum/{subject}-knowledge-taxonomy` | data/subjects/{subject}/{subject}-knowledge-taxonomy.ttl |
| **Oak Curriculum Data** | |
| `/oakcurriculum/programme-structure` | data/programme-structure.ttl |
| `/oakcurriculum/threads` | data/threads.ttl |
| `/oakcurriculum/{subject}-key-stage-{n}` | data/subjects/{subject}/{subject}-key-stage-{n}.ttl |
| **Distributions** | |
| `/distributions/` | Release asset (content negotiated: ttl/jsonld/rdf/nt) |
| **Root** | |
| `/` | GitHub repo |

### Examples

- `https://w3id.org/uk/oak/curriculum/ontology/` → documentation or TTL
- `https://w3id.org/uk/oak/curriculum/nationalcurriculum/mathematics-programme-structure` → mathematics-programme-structure.ttl
- `https://w3id.org/uk/oak/curriculum/oakcurriculum/english-key-stage-2` → english-key-stage-2.ttl

## Scope

The scope of Oak National Academy's Project is the National Curriculum in England. 


## Maintainer

**Mark Hodierne**  
Oak National Academy  
📧 eng.mhodierne@thenational.academy
🔗 [https://github.com/markhodierne](https://github.com/markhodierne)
