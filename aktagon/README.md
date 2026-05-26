# aktagon

Permanent identifiers for the aktagon ontology family
(`https://w3id.org/aktagon/`). These IRIs resolve to the canonical
Turtle/JSON-LD served at <https://ontology.aktagon.com/>.

## Namespace structure

| IRI pattern                                      | Purpose                                            |
| ------------------------------------------------ | -------------------------------------------------- |
| `https://w3id.org/aktagon/{domain}#`             | Vocabulary (T-Box), e.g. `writing#`, `operations#` |
| `https://w3id.org/aktagon/{domain}/{module}#`    | Multi-module vocabulary, e.g. `ui/core#`           |
| `https://w3id.org/aktagon/id/{domain}/{id}`      | Instance data (A-Box)                              |
| `https://w3id.org/aktagon/example/{domain}/{id}` | Examples and fixtures                              |

Versions are pinned via `owl:versionIRI`
(`https://w3id.org/aktagon/{domain}/{YYYY-MM-DD}`); the unversioned IRI is
the stable identifier.

## Contact

Christian Hellsten — christian@aktagon.com
