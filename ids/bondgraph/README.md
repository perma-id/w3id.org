# /bondgraph/

Permanent IRIs for the **Bond Graph Ontology** — an OWL 2 DL axiomatisation of the
bond graph formalism, used for describing physiological processes.

Source: <https://github.com/CellDL/bondgraph-ontology>.
Published site: <https://celldl.github.io/bondgraph-ontology/>.
Ontology CC BY 4.0; tooling Apache-2.0.

## What resolves

| IRI | Redirects to |
| --- | --- |
| `/bondgraph/core` | the core module, in the syntax asked for |
| `/bondgraph/biochem`, `/bondgraph/hydraulic`, `/bondgraph/thermal` | that domain module |
| `/bondgraph/bfo` | the Basic Formal Ontology bridge |
| `/bondgraph/<module>/<version>` | the Turtle at git tag `v<version>` |
| `/bondgraph/examples/<name>` | `examples/<name>.ttl` |
| `/bondgraph/tests/<name>` | `tests/test-<name>.ttl` |
| anything else | the site index |

The ontology namespaces are the hash forms, `https://w3id.org/bondgraph/core#` and so
on; a fragment is not sent to the server, so they resolve by the module rules above.

## How it resolves

A module IRI is content negotiated with 303 and answers in the syntax requested:

| `Accept` | served as |
| --- | --- |
| `text/turtle`, `application/x-turtle`, `text/n3` | `text/turtle` |
| `application/rdf+xml` | `application/rdf+xml` |
| `application/ld+json` | `application/ld+json` |
| `application/n-triples`, `application/n-quads` | `application/n-triples` |
| anything else | `text/html` — that module's documentation |

The published site returns each file with its correct media type. A browser following
a module IRI lands on the generated documentation for that module, which includes a
WebVOWL visualisation and links to all four syntaxes.

The Turtle is the authored source, comments included. The other syntaxes are generated
from it by CI, which converts through the OWL API and therefore normalises as it goes:
two-member disjointness axioms come back in a different form, and declaration triples
are added. They are checked logically equivalent to the Turtle on every build — mutual
entailment, decided by a reasoner — rather than isomorphic to it, which normalised
output cannot be.

Version IRIs negotiate Turtle only, from the matching git tag, because the site serves
only the current version and older tags predate the generated serialisations. A
non-Turtle request at a version IRI therefore gets the site index.

## Contact

Maintained by David Brooks (GitHub: **dbrnz**) for the CellDL organisation,
<https://github.com/CellDL>.
