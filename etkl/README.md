# /etkl/

Persistent namespace for the **ET(K)L** method — *Extract, Transform-with-(K)nowledge,
Load* — and its ontology modules. Knowledge engineering is the first milestone of the
pipeline: a semantic data contract declares the target semantics and a knowledge module
is passed as an argument to the transform.

| Persistent IRI | Resolves to |
| --- | --- |
| `https://w3id.org/etkl` | ET(K)L method + umbrella vocabulary |
| `https://w3id.org/etkl/hol` | `hol` — holonic decision-context vocabulary |
| `https://w3id.org/etkl/iladub` | `iladub` — assertion/proposition vocabulary |

Requests are **content-negotiated**: clients asking for RDF (`Accept: text/turtle`,
`application/rdf+xml`, `application/ld+json`, …) are redirected to the Turtle ontology
files in the source repository; browsers are redirected to the documentation site.

- **Documentation:** https://iladub.dev
- **Source & ontologies:** https://github.com/iladub/iladub (under `vocab/ontology/`)
- **License:** ontologies are CC-BY-4.0; code is Apache-2.0.

## Maintainer

- **François Rosselet**
- GitHub: [@Frosselet](https://github.com/Frosselet)
