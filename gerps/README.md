
# openDVA: German Public Services
This repo (which replaces the legacy GerPS-onto) is the home for all GerPS (German Public Services)-related redirects, which currently only includes our ontologies.

## Redirect

Redirects:
- https://w3id.org/gerps/ -> https://opendva.de/
- https://w3id.org/gerps/ontology -> https://fusion-jena.github.io/gerps-onto-landingpage/#
- https://w3id.org/gerps/ontology/process -> https://fusion-jena.github.io/GerPS-Process/ (with content negotiation, versioning, and fragment rewrites)
- https://w3id.org/gerps/ontology/datafield -> https://fusion-jena.github.io/GerPS-Datafield/ (with content negotiation, versioning, and fragment rewrites)
- https://w3id.org/gerps/ontology/software -> https://fusion-jena.github.io/GerPS-Software/ (with content negotiation, versioning, and fragment rewrites)
- https://w3id.org/gerps/ontology/law -> https://fusion-jena.github.io/GerPS-Law/ (with content negotiation, versioning, and fragment rewrites)

### Content Negotiation & Versioning

All ontology endpoints support HTTP content negotiation (303 redirects) with versioning via regex patterns:
- **RDF Formats**: JSON-LD, RDF/XML (.owl), Turtle (.ttl), N-Triples (.nt)
- **HTML Documentation**: English (default) or German (via `Accept-Language: de`)
- **Versioning**: Optional version numbers in URL path (e.g., `/1.0/`)
- **Fragment Support**: Term-level redirects (e.g., `/1.0/SomeTerm` -> `index-en.html#SomeTerm`)

**Examples:**
- HTML (English): `w3id.org/gerps/ontology/process` -> `https://fusion-jena.github.io/GerPS-Process/index-en.html`
- HTML (German): `w3id.org/gerps/ontology/process` + `Accept-Language: de` -> `https://fusion-jena.github.io/GerPS-Process/index-de.html`
- Turtle: `w3id.org/gerps/ontology/process` + `Accept: text/turtle` -> `https://fusion-jena.github.io/GerPS-Process/ontology.ttl`
- JSON-LD (versioned): `w3id.org/gerps/ontology/process/1.0/` + `Accept: application/ld+json` -> `https://fusion-jena.github.io/GerPS-Process/1.0/ontology.jsonld`
- Term fragment: `w3id.org/gerps/ontology/datafield/1.0/GPD_00000001` -> `https://fusion-jena.github.io/GerPS-Datafield/1.0/index-en.html#GPD_00000001`

## Contact
| Maintainer           | Institute                           | Email                            | ORCID                                 | Location                                         | Phone | Github-ID                                     |
| -------------------- | ----------------------------------- | -------------------------------- | ------------------------------------- | ------------------------------------------------ | ----- | --------------------------------------------- |
| Maximilian Enderling | Friedrich-Schiller-Universität Jena | maximilian.enderling@uni-jena.de | https://orcid.org/0009-0007-5039-8538 | 07743 Jena; Leutragraben 1, JenTower, Room 18N03 | ---   | [BMI24](https://github.com/BMI24)             |
| Marianne Mauch       | Friedrich-Schiller-Universität Jena | marianne.mauch@uni-jena.de       | https://orcid.org/0000-0003-1478-1867 | 07743 Jena; Leutragraben 1, JenTower, Room 18N01 | ---   | [gitmagit](https://github.com/gitmagit)       |
