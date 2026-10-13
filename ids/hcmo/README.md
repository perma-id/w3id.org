# /hcmo/

Permanent identifier namespace for the **HCMO — Home-Cage Monitoring Ontology**.

The ontology is developed and maintained at
<https://github.com/dhuzard/HCMO>.

## Identifiers

| IRI | Resolves to |
| --- | --- |
| `https://w3id.org/hcmo/` | Source repository (landing page) |
| `https://w3id.org/hcmo/ontology/hcm` | Ontology (content negotiated) |
| `https://w3id.org/hcmo/ontology/hcm#` | Base namespace |
| `https://w3id.org/hcmo/ontology/hcm/bio#` | Biological module |
| `https://w3id.org/hcmo/ontology/hcm/env#` | Environmental module |
| `https://w3id.org/hcmo/ontology/hcm/obs#` | Observational module |
| `https://w3id.org/hcmo/ontology/hcm/tech#` | Technology module |
| `https://w3id.org/hcmo/ontology/hcm/<version>` | Version IRI (e.g. `/0.4.1`) |
| `https://w3id.org/hcmo/id/vocab/<scheme>[/<concept>]` | SKOS vocabulary of the scheme (file formats, data-access methods, vendors, systems) |
| `https://w3id.org/hcmo/ontology/profile/bfo-sosa-bridge` | Optional BFO/SOSA bridge profile |
| `https://w3id.org/hcmo/ontology/external/upper-presentation` | Upper-level presentation module |

## Content negotiation

Requests are redirected (HTTP `303`) according to the `Accept` header. RDF is
served from **GitHub Pages** (`https://dhuzard.github.io/HCMO/`), which holds
byte-identical copies of the GitHub release assets and serves them with RDF
media types. (GitHub release downloads are served as
`application/octet-stream`, which RDF crawlers such as LOV do not parse.)

| `Accept` | Latest (`…/hcm`) | Versioned (`…/hcm/<version>`) |
| --- | --- | --- |
| `text/html` (browsers) | WIDOCO docs on GitHub Pages | release page `releases/tag/v<version>` |
| `application/rdf+xml` | `dist/latest/hcmo.owl` | `dist/<version>/hcmo.owl` |
| `text/turtle` (default) | `dist/latest/hcmo.ttl` | `dist/<version>/hcmo.ttl` |
| `application/ld+json` | `dist/latest/hcmo.jsonld` | `dist/<version>/hcmo.jsonld` |

The merged distributions contain all modules, so the `bio`/`env`/`obs`/`tech`
module IRIs resolve to the same merged graph. A version segment is any path
segment beginning with a digit (e.g. `…/hcm/0.4.1`); it matches the GitHub
release tag `v<version>` and the Pages folder `dist/<version>/`. Vocabulary
IRIs (scheme or concept) resolve to `vocab/<scheme>.ttl`; browsers are sent to
the vocabularies folder of the repository. The Pages copies are produced by the
HCMO documentation workflow (`tooling/publish_rdf.py`).

## Contact

This space is administered by:

- **Damien Huzard** — <damien@metadatapp.net> — GitHub: [@dhuzard](https://github.com/dhuzard)
