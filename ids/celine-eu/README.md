# /celine-eu

Persistent URI namespace for the **CELINE Core Ontology** — a lightweight
orchestration profile for Renewable Energy Communities (RECs) and Digital
Twin workflows connecting PECO, SAREF, SOSA/SSN and CIM.

CELINE is a Horizon Europe project (Grant Agreement No. 101160667).

## What this namespace identifies

**The ontology, and nothing else.** Terms live in a hash namespace,
`https://w3id.org/celine-eu#Term`, so dereferencing a term fetches the whole
ontology; the HTML target is the WIDOCO document, whose per-term anchors let the
fragment land on the term. Instances — communities, meters, observations — are
*not* identified here and get their own namespace.

## Redirects

Everything is served from GitHub Pages, which returns the correct `Content-Type`
for each serialization.

### `https://w3id.org/celine-eu`

| Accept | Target |
|---|---|
| `text/turtle`, `application/x-turtle`, `text/n3` | `…/ontologies/ontology.ttl` |
| `application/rdf+xml` | `…/ontologies/ontology.owl` |
| `application/ld+json` | `…/ontologies/ontology.jsonld` |
| `application/n-triples` | `…/ontologies/ontology.nt` |
| anything else, including browsers | `…/ontologies/index-en.html` |

`…` is `https://celine-eu.github.io`.

Because `mod_rewrite` cannot compare q-values, each block matches the requested
type first as the *first-listed* type and then as *present anywhere*, so a client
that accepts both RDF and HTML gets RDF while a browser still gets HTML.

### `https://w3id.org/celine-eu/vX.Y`

The same negotiation against that version's directory, so a versioned IRI
resolves to that version rather than to the current one.

### `https://w3id.org/celine-eu/<file>`

The unversioned artifacts, which follow `current` — the same promise the release
model already makes, where `specs/current` and `releases/current` are byte copies
of the newest version.

| IRI | Is |
|---|---|
| `…/celine.jsonld` | the latest JSON-LD context |
| `…/celine.shacl.ttl` | the latest SHACL shapes |
| `…/celine.schema.json` | the latest JSON Schema |
| `…/ontology.{ttl,owl,jsonld,nt}` | the latest serializations |

Use the versioned form below for a stable pin. That is the whole difference
between the two.

### `https://w3id.org/celine-eu/vX.Y/<file>`

Addressed by name, no negotiation — the extension already says what it is.

| IRI | Is |
|---|---|
| `…/vX.Y/celine.jsonld` | the JSON-LD context |
| `…/vX.Y/celine.schema.json` | the JSON Schema (`$id`) |
| `…/vX.Y/celine.shacl.ttl` | the SHACL shapes |
| `…/vX.Y/ontology.{ttl,owl,jsonld,nt}` | the serializations |

## References

- Project website: https://www.celineproject.eu/
- GitHub organisation: https://github.com/celine-eu
- Documentation: https://celine-eu.github.io/

## Contact

This space is administered by the CELINE project team.

GitHub organisation: [celine-eu](https://github.com/celine-eu)

**lc-spxl** (SPXL), https://github.com/lc-spxl

**mpavan23** (SPXL), https://github.com/mpavan23

**ewidl** (AIT), https://github.com/ewidl
