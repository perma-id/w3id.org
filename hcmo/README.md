# /hcmo/

Permanent identifier namespace for the **HCMO — MAPP Ontology**.

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
| `https://w3id.org/hcmo/ontology/hcm/0.0.1` | Version IRI |

## Content negotiation

Requests to the ontology IRI are redirected (HTTP `303`) according to the
`Accept` header:

| `Accept` | Target |
| --- | --- |
| `text/html` (browsers) | WIDOCO documentation on GitHub Pages |
| `application/rdf+xml` | `dist/hcmo.owl` |
| `text/turtle` (default) | `dist/hcmo.ttl` |
| `application/ld+json` | `dist/hcmo.json` |

The merged distributions contain all modules, so the module and version IRIs
resolve to the same merged graph.

## Contact

This space is administered by:

- **Damien Huzard** — <damien@metadatapp.net> — GitHub: [@dhuzard](https://github.com/dhuzard)
