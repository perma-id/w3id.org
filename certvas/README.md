# w3id.org/certvas

Permanent identifiers for the **Certvas Ontology** — a CC0 LinkML schema describing company,
fundamentals, procurement and macro data for African and emerging markets.

## Identifiers

| IRI | resolves to |
|---|---|
| `https://w3id.org/certvas/ontology` | the human documentation (or the machine format, by content negotiation) |
| `https://w3id.org/certvas/ontology.yaml` | the LinkML source — the single source of truth |
| `https://w3id.org/certvas/ontology.jsonld` | the JSON-LD context |
| `https://w3id.org/certvas/ontology.json` | JSON Schema |
| `https://w3id.org/certvas/ontology.sql` | SQL DDL |
| `https://w3id.org/certvas/ontology/{Term}` | that class or slot's documentation page |

Content negotiation on `/ontology`: `application/ld+json` returns the JSON-LD context, `text/yaml`
returns the LinkML source, anything else returns the docs. Explicit extensions bypass negotiation,
because negotiation is fragile through proxies and impossible to paste into a chat message.

Redirects are **302, not 301**. A permanent redirect is cached by intermediaries indefinitely,
which would make a future hosting change take years to propagate — the opposite of what a permanent
identifier is for. The IRI is permanent; where it points today is not.

## Why the indirection

The IRI is the schema's `id:` and is baked into every generated JSON-LD context, the published
package and the Zenodo deposit. Pointing it at our own domain would mean a lapse, a rebrand or a
host migration breaks every document anyone ever produced against the schema.

## Project

- **Docs** — <https://certvas-ontology.pages.dev>
- **DOI** — <https://doi.org/10.5281/zenodo.21986492>
- **Package** — <https://pypi.org/project/certvas-ontology/>
- **Licence** — CC0-1.0. (The datasets the schema describes carry their own per-source terms; the
  schema being public domain is deliberate and separate.)

## Contact

R.T. Mandase — mandase@certvas.com — <https://certvas.com>
