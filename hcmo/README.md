# /hcmo/

Permanent identifier namespace for the **HCMO — Home Cage Monitoring Ontology**.

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
| `https://w3id.org/hcmo/ontology/hcm/<version>` | Version IRI (e.g. `/0.9`) |

## Content negotiation

Requests to the ontology IRI are redirected (HTTP `303`) according to the
`Accept` header. RDF is served from **GitHub Release assets**:

| `Accept` | Latest (`…/hcm`) | Versioned (`…/hcm/<version>`) |
| --- | --- | --- |
| `text/html` (browsers) | WIDOCO docs on GitHub Pages | release page `releases/tag/v<version>` |
| `application/rdf+xml` | `releases/latest/download/hcmo.owl` | `releases/download/v<version>/hcmo.owl` |
| `text/turtle` (default) | `releases/latest/download/hcmo.ttl` | `releases/download/v<version>/hcmo.ttl` |
| `application/ld+json` | `releases/latest/download/hcmo.json` | `releases/download/v<version>/hcmo.json` |

The merged distributions contain all modules, so the `bio`/`env`/`obs` module
IRIs resolve to the same merged graph. A version segment is any path segment
beginning with a digit (e.g. `…/hcm/0.9`) and is mapped to the GitHub release
tag `v<version>`.

> **Note — version tag vs. manifest:** the ontology manifest (`hcmo.yaml`)
> currently declares `version: 0.0.1`, but the latest published release is
> `v0.9`. Consequently `…/hcm/0.9` resolves, while the declared version IRI
> `…/hcm/0.0.1` will 303 to a `v0.0.1` release that does not exist. Reconcile
> by bumping the manifest to the release tag scheme, or by cutting a matching
> release.

## Contact

This space is administered by:

- **Damien Huzard** — <damien@metadatapp.net> — GitHub: [@dhuzard](https://github.com/dhuzard)
