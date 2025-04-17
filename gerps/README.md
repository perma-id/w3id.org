
# openDVA: German Public Services
This repo (which replaces the legacy GerPS-onto) is the home for all GerPS (German Public Services)-related redirects, which currently only includes our ontologies.

## Redirect

Redirects:
- https://w3id.org/gerps/ontology -> https://fusion-jena.github.io/gerps-onto-landingpage/#
- https://w3id.org/gerps/ontology/process -> https://fusion-jena.github.io/GerPS-Process/ (with RDF content negotiation and versioning support)
- https://w3id.org/gerps/ontology/datafield -> https://fusion-jena.github.io/GerPS-Datafield/ (with RDF content negotiation and versioning support)
- https://w3id.org/gerps/ontology/software -> https://fusion-jena.github.io/GerPS-Software/ (with RDF content negotiation and versioning support)

### Versioning support

Versioning support is enabled via regex. We currently use Github Pages for hosting our ontologies and thus need to do the redirects for each version here.
We use the scheme `^w3id.org/gerps/ontology/datafield/(\d+\.\d+\/)?.*$` -> `https://fusion-jena.github.io/GerPS-Datafield/$1index-en.html`
EG a request for HTML: `w3id.org/gerps/ontology/datafield/1.0/GOD_00000001`->`https://fusion-jena.github.io/GerPS-Datafield/1.0/index-en.html`

## Contact
| Maintainer           | Institute                           | Email                            | ORCID                                 | Location                                         | Phone | Github-ID                                     |
| -------------------- | ----------------------------------- | -------------------------------- | ------------------------------------- | ------------------------------------------------ | ----- | --------------------------------------------- |
| Maximilian Enderling | Friedrich-Schiller-Universität Jena | maximilian.enderling@uni-jena.de | https://orcid.org/0009-0007-5039-8538 | 07743 Jena; Leutragraben 1, JenTower, Room 18N03 | ---   | [BMI24](https://github.com/BMI24)             |
| Marianne Mauch       | Friedrich-Schiller-Universität Jena | marianne.mauch@uni-jena.de       | https://orcid.org/0000-0003-1478-1867 | 07743 Jena; Leutragraben 1, JenTower, Room 18N01 | ---   | [gitmagit](https://github.com/gitmagit)       |
