# /mlips/

Permanent identifier for the **MLIPs Ontology** — an OWL 2 DL
ontology for describing Machine Learning Interatomic Potentials.

* **Persistent IRI:** <https://w3id.org/mlips>
* **Currently hosted at:** <https://onto.degu.cl/mlips/>
* **Source repository:** <https://git.degu.cl/daniel/onto-mlips>
* **Licence:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
  (ontology and knowledge graph), Apache 2.0 (tooling)

## What it describes

The ontology covers the metadata needed to systematically compare,
reproduce, and reuse machine-learning interatomic potential studies:

* **Algorithm module** — MLIP algorithm families (BPNN, MTP, ACE,
  GAP, NequIP, MACE, foundation models), hyperparameters,
  implementations, software libraries.
* **Training-data module** — training datasets with their DFT or
  wavefunction-method provenance, atomic configurations, sampling
  strategy, covered properties.
* **Benchmark module** — benchmark studies, accuracy metrics,
  trained models, target materials.

It aligns with PROV-O, schema.org, the W3C Machine Learning Schema
(MLS), the Materials Design Ontology (MDO), and QUDT, reusing
established vocabularies rather than re-minting.

The ontology is being submitted as a Resources Track paper to
ISWC 2026.

## Content negotiation

The redirect target performs Accept-based content negotiation:

| `Accept` header | Returns |
|---|---|
| `text/html`, `application/xhtml+xml` | XHTML+RDFa documentation |
| `text/turtle` | Turtle (`mlips.ttl`) |
| `application/rdf+xml`, `application/owl+xml` | OWL/XML (`mlips.owl`) |

Verification at the time of submission:

```text
$ curl -sI -H 'Accept: text/turtle' https://onto.degu.cl/mlips/
HTTP/1.1 200 OK
Content-Type: text/turtle; charset=utf-8

$ curl -sI -H 'Accept: application/xhtml+xml' https://onto.degu.cl/mlips/
HTTP/1.1 200 OK
Content-Type: application/xhtml+xml; charset=utf-8
```

## Notes on the redirect target

`onto.degu.cl` is the maintainer's personal server, used as a
temporary host while a University of Stuttgart institutional URL
is being provisioned. The redirect target may change; the persistent
IRI `w3id.org/mlips` itself does not. Any change to the redirect
target will be a separate pull request to this repository preserving
the Accept-based content-negotiation contract above.

## Contact

* **Maintainer:** Daniel Hernandez
* **Email (primary):** <daniel@degu.cl>
* **Email (institutional):** <daniel.hernandez@ki.uni-stuttgart.de>
* **GitHub:** [@danielhz](https://github.com/danielhz)
* **Affiliation:** Institute for Artificial Intelligence (KI),
  University of Stuttgart, Germany
