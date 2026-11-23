# /ontodisinfo/

Permanent URL for the **OntoDisinfo-Electoral** ontology, an OWL-DL modular
ontology for representation of electoral disinformation in social media,
developed at the Center for Informatics (CIn) of the Federal University of
Pernambuco (UFPE), Brazil.

## Redirect map

| W3ID URL | Redirects to |
|----------|--------------|
| `https://w3id.org/ontodisinfo/` | Integrated ontology (`ontodis-full.ttl`, latest release tag); documentation site for browsers |
| `https://w3id.org/ontodisinfo/latest` | Integrated ontology (alias, latest release tag) |
| `https://w3id.org/ontodisinfo/core` | Core module (social media ecosystem) |
| `https://w3id.org/ontodisinfo/ml` | Machine Learning pipeline module |
| `https://w3id.org/ontodisinfo/electoral` | Brazilian political-electoral context module |
| `https://w3id.org/ontodisinfo/legal` | Normative framework module |
| `https://w3id.org/ontodisinfo/inference` | Defined classes with OWL-DL axioms |
| `https://w3id.org/ontodisinfo/alignments` | Alignments with SIOC, schema.org, Dublin Core, PROV-O, FOAF, LKIF-Core, SKOS |
| `https://w3id.org/ontodisinfo/gufo-alignment` | Top-level alignment with UFO / gUFO (ISO/IEC 21838) |
| `https://w3id.org/ontodisinfo/policy` | Policy module (operational thresholds and time windows) |
| `https://w3id.org/ontodisinfo/policy/rules` | Policy rules (SHACL rules that read the policy parameters) |
| `https://w3id.org/ontodisinfo/full` | Integrated ontology (explicit) |
| `https://w3id.org/ontodisinfo/docs` | Human-readable HTML documentation (hosted on GitLab Pages) |
| `https://w3id.org/ontodisinfo/<module>/<X.Y.Z>` | Version IRI of a module, as declared by `owl:versionIRI`, pinned to Git tag `v<X.Y.Z>` |
| `https://w3id.org/ontodisinfo/<X.Y.Z>` | Version IRI of the integrated ontology, pinned to Git tag `v<X.Y.Z>` |
| `https://w3id.org/ontodisinfo/<X.Y.Z>/<module>` | Versioned IRIs of the earlier registrations, pinned to Git tag `v<X.Y.Z>` |

All ontology-file redirects are HTTP 302 and target raw Turtle files on
https://gitlab.com/gustavosouto/ontodisinfo-electoral. The `/docs` redirect
targets the Pages site at
https://gustavosouto.gitlab.io/ontodisinfo-electoral/.

- **License:** Creative Commons Attribution 4.0 International (CC BY 4.0)
- **Serialization:** Turtle (`.ttl`)
- **Profile:** OWL 2 DL

## Maintainer

- **Name:** Gustavo Souto Silva de Barros Santos
- **Affiliation:** MSc student, Center for Informatics (CIn), Federal University
  of Pernambuco (UFPE), Brazil
- **Email:** gssbs@cin.ufpe.br
- **GitHub:** [@gustavosouto](https://github.com/gustavosouto)
- **GitLab:** [@gustavosouto](https://gitlab.com/gustavosouto)

## Source repository

https://gitlab.com/gustavosouto/ontodisinfo-electoral

## Persistence commitment

The maintainer commits to keeping these redirects functional for at least 5
years. If the source repository relocates (e.g., migration to GitHub or
institutional hosting), a follow-up PR will be submitted to update the
redirect targets.
