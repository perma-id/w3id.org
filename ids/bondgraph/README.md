# /bondgraph/

Permanent IRIs for the **Bond Graph Ontology** — an OWL 2 DL axiomatisation of the
bond graph formalism, used for describing physiological processes.

Source: <https://github.com/CellDL/bondgraph-ontology> (ontology CC BY 4.0, tooling
Apache-2.0).

## What resolves

| IRI | Redirects to |
| --- | --- |
| `/bondgraph/core` | `src/bondgraph-core.ttl` on the default branch |
| `/bondgraph/biochem`, `/bondgraph/hydraulic`, `/bondgraph/thermal` | `src/domains/bondgraph-<name>.ttl` |
| `/bondgraph/bfo` | `src/bondgraph-bfo.ttl` |
| `/bondgraph/<module>/<version>` | the same file at git tag `v<version>` |
| `/bondgraph/examples/<name>` | `examples/<name>.ttl` |
| `/bondgraph/tests/<name>` | `tests/test-<name>.ttl` |
| anything else | the repository front page |

The ontology namespaces are the hash forms, `https://w3id.org/bondgraph/core#` and
so on; a fragment is not sent to the server, so they resolve by the module rules
above.

## How it resolves

Requests carrying an RDF media type in `Accept` get a 303 to the Turtle source.
Everything else — browsers, and clients sending `*/*` — gets a 303 to the repository
front page, which renders the README.

Version IRIs point at a git tag rather than a branch, so `/bondgraph/core/0.1.0`
keeps naming the same bytes once `main` has moved on.

## Contact

Maintained by David Brooks (GitHub: **dbrnz**) for the CellDL organisation,
<https://github.com/CellDL>.
