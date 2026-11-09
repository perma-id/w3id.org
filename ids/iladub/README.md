# /iladub/

Persistent namespace root for **iladub** — the document-carrier that compiles
unstructured documents into FAIR, contract-defined semantic knowledge graphs.
`iladub = a thin epistemic core + etkl (the K-transform) + dec (decidability)`, aligned
to the W3C Holon CG substrate (HGA).

| Persistent IRI | Resolves to |
| --- | --- |
| `https://w3id.org/iladub` | iladub core — assertion/proposition epistemics |
| `https://w3id.org/iladub/etkl` | ET(K)L method (knowledge-first transform) |
| `https://w3id.org/iladub/etkl/holons` | the doc-holon fabric |
| `https://w3id.org/iladub/dec` | `dec` — decidability / decision-context vocabulary |
| `https://w3id.org/iladub/risk` | contextual-risk vocabulary |
| `https://w3id.org/iladub/hga-alignment` | iladub/etkl ↔ HGA alignment |
| `https://w3id.org/iladub/dec/hga-alignment` | dec ↔ HGA alignment |
| `https://w3id.org/iladub/risk/hga-alignment` | risk ↔ HGA alignment |
| `https://w3id.org/iladub/governance-shapes` | governance SHACL shapes |

Requests are **content-negotiated**: clients asking for RDF (`Accept: text/turtle`,
`application/rdf+xml`, `application/ld+json`, …) are redirected to the Turtle files in the
source repository; browsers are redirected to the documentation site.

This supersedes the former `w3id.org/etkl` layout, whose paths now 301-redirect here.

- **Documentation:** https://iladub.dev
- **Source & ontologies:** https://github.com/iladub/iladub (under `vocab/`)
- **License:** ontologies are CC-BY-4.0; code is Apache-2.0.

## Maintainer

- **François Rosselet**
- GitHub: [@Frosselet](https://github.com/Frosselet)
