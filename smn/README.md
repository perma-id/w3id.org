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

Root and SemVer version IRIs keep the current DFO-style content negotiation contract:

- root IRI serves HTML by default
- root IRI serves Turtle / RDF/XML / JSON-LD via the HTTP `Accept` header
- version IRIs (`/X.Y.Z`) serve release HTML by default
- version IRIs serve versioned Turtle / RDF/XML / JSON-LD via the HTTP `Accept` header
- `/latest` is intentionally not part of this public contract

Canonical shared-term IRIs are now human-friendly by default while still negotiable for machines:

- browser/default request for `/Term` redirects to the matching WIDOCO anchor, e.g. `https://salmon-data-mobilization.github.io/salmon-domain-ontology/#/Escapement`
- `Accept: text/turtle` on `/Term` redirects to the latest Turtle serialization
- `Accept: application/rdf+xml` on `/Term` redirects to the latest RDF/XML serialization
- `Accept: application/ld+json` on `/Term` redirects to the latest JSON-LD serialization

Secondary surfaces remain supported and Turtle-first for now:

- `/research`
- `/rda-case-study`
- `/modules/*`
- `/profile/*`

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

## Verification examples

```bash
curl -I https://w3id.org/smn/Escapement
curl -I -H 'Accept: text/turtle' https://w3id.org/smn/Escapement
curl -I -H 'Accept: application/rdf+xml' https://w3id.org/smn/Escapement
curl -I -H 'Accept: application/ld+json' https://w3id.org/smn/Escapement
```

Expected after merge:

- default term request → `303` to `https://salmon-data-mobilization.github.io/salmon-domain-ontology/#/Escapement`
- Turtle → `303` to `https://salmon-data-mobilization.github.io/salmon-domain-ontology/smn.ttl`
- RDF/XML → `303` to `https://salmon-data-mobilization.github.io/salmon-domain-ontology/smn.owl`
- JSON-LD → `303` to `https://salmon-data-mobilization.github.io/salmon-domain-ontology/smn.jsonld`

## Maintainer repository

- <https://github.com/salmon-data-mobilization/salmon-domain-ontology>

## Contact

This space is administered by:

**Brett Johnson**  
GitHub: [Br-Johnson](https://github.com/Br-Johnson)
