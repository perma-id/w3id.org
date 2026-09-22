# w3id.org namespace: pr2graph

Persistent URI namespace for the **Pr²Graph** (Privacy Practice Graph) ontology, accompanying the ISWC 2026 Resource Track paper:

> *"A Semantic Resource Suite for Privacy Policy Formalization"* — Rui Zhao, Vladyslav Melnychuk, Jesse Wright, Jun Zhao, Nigel Shadbolt.

## Redirect

| w3id URI | Target | Description |
|---|---|---|
| `https://w3id.org/pr2graph` | `https://renyuneyun.github.io/pr2graph/pr2graph.ttl` | Pr²Graph schema ontology — classes (`DataPractice`, `PrivacyPolicy`, `Service`, `Recipient`) and properties |
| `https://w3id.org/pr2graph` (browser / HTML) | `https://renyuneyun.github.io/pr2graph/` | Human-readable landing page |

Content negotiation is handled in `.htaccess`: browsers (or clients whose `Accept` header includes HTML) get the landing page; RDF clients get the Turtle serialization.

This is a **hash namespace** — append `#ClassName` or `#propertyName` to resolve individual terms:

- `https://w3id.org/pr2graph#DataPractice`
- `https://w3id.org/pr2graph#data`
- `https://w3id.org/pr2graph#Recipient`

## Hosting

The ontology is hosted in the dedicated [pr2graph](https://github.com/renyuneyun/pr2graph) repository (`pr2graph.ttl` + `index.html`), served via GitHub Pages at `https://renyuneyun.github.io/pr2graph/`. GitHub Pages serves `.ttl` with `Content-Type: text/turtle`, which RDF tooling dereferences cleanly.

## Related resources

- Pr²Graph ontology repo: <https://github.com/renyuneyun/pr2graph>
- GitHub workflow (pp-analyzer): <https://github.com/renyuneyun/pp-analyzer>
- Enriched Policy-IE dataset: <https://doi.org/10.5281/zenodo.15392162>
- Pr²Graph KG + formal policies: <https://doi.org/10.5281/zenodo.20081062>

## Maintainer

- **Rui Zhao** — zhaorui@tju.edu.cn — GitHub: [renyuneyun](https://github.com/renyuneyun)
