# /smn/

Salmon Domain Ontology shared namespace (`smn:`).

[`https://w3id.org/smn`](https://w3id.org/smn) is the persistent base for the shared Salmon Domain Ontology layer.

## Canonical IRIs

- Latest ontology IRI: `https://w3id.org/smn`
- Version IRIs: `https://w3id.org/smn/X.Y.Z`
- Term namespace: `https://w3id.org/smn/`
- Module namespace: `https://w3id.org/smn/modules/<module-name>`
- Research build: `https://w3id.org/smn/research`
- Case-study build: `https://w3id.org/smn/rda-case-study`
- Profile roots:
  - `https://w3id.org/smn/profile/hakai/`
  - `https://w3id.org/smn/profile/neville/`
  - `https://w3id.org/smn/profile/rda-case-study/`

## Redirect behavior

This update makes the root and version IRIs follow the same content-negotiation pattern used by the live DFO Salmon Ontology redirects at `https://w3id.org/gcdfo/salmon`:

- root IRI serves HTML by default
- root IRI serves Turtle / RDF/XML / JSON-LD via the HTTP `Accept` header
- version IRIs (`/X.Y.Z`) serve release HTML by default
- version IRIs serve versioned Turtle / RDF/XML / JSON-LD via the HTTP `Accept` header
- `/latest` is intentionally not part of this updated contract

Existing secondary surfaces remain supported and Turtle-first for now:

- `/research`
- `/rda-case-study`
- `/modules/*`
- `/profile/*`
- term paths such as `/Stock`

## Redirect targets

GitHub Pages publication surface:

- HTML docs (latest): `https://salmon-data-mobilization.github.io/salmon-domain-ontology/`
- Turtle (latest): `https://salmon-data-mobilization.github.io/salmon-domain-ontology/smn.ttl`
- RDF/XML (latest): `https://salmon-data-mobilization.github.io/salmon-domain-ontology/smn.owl`
- JSON-LD (latest): `https://salmon-data-mobilization.github.io/salmon-domain-ontology/smn.jsonld`
- Version snapshot HTML: `https://salmon-data-mobilization.github.io/salmon-domain-ontology/releases/X.Y.Z/`
- Version snapshot Turtle: `.../releases/X.Y.Z/smn.ttl`
- Version snapshot RDF/XML: `.../releases/X.Y.Z/smn.owl`
- Version snapshot JSON-LD: `.../releases/X.Y.Z/smn.jsonld`

## Maintainer repository

- <https://github.com/salmon-data-mobilization/salmon-domain-ontology>

## Contact

This space is administered by:

**Brett Johnson**  
GitHub: [Br-Johnson](https://github.com/Br-Johnson)
