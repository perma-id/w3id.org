# /etkl/

> **Migrated 2026-07-01.** This namespace moved to the **iladub** root:
> [`https://w3id.org/iladub`](https://w3id.org/iladub). Every former `/etkl/*` IRI now
> 301-redirects to its new home under `/iladub/` (e.g. `/etkl/hol` → `/iladub/dec`,
> `/etkl/iladub` → `/iladub`, `/etkl` → `/iladub/etkl`). See the `/iladub/` entry.

Persistent namespace for the **ET(K)L** method — *Extract, Transform-with-(K)nowledge,
Load* — and its ontology modules. Knowledge engineering is the first milestone of the
pipeline: a semantic data contract declares the target semantics and a knowledge module
is passed as an argument to the transform.

| Former IRI | Now redirects to |
| --- | --- |
| `https://w3id.org/etkl` | `https://w3id.org/iladub/etkl` — ET(K)L method |
| `https://w3id.org/etkl/hol` | `https://w3id.org/iladub/dec` — `dec` decision vocabulary |
| `https://w3id.org/etkl/iladub` | `https://w3id.org/iladub` — iladub core (assertion/proposition) |

Requests are **content-negotiated** at the new `/iladub/` root: clients asking for RDF
(`Accept: text/turtle`, `application/rdf+xml`, `application/ld+json`, …) are redirected to the
Turtle ontology files in the source repository; browsers are redirected to the documentation site.

- **Documentation:** https://iladub.dev
- **Source & ontologies:** https://github.com/iladub/iladub (under `vocab/`)
- **License:** ontologies are CC-BY-4.0; code is Apache-2.0.

## Maintainer

- **François Rosselet**
- GitHub: [@Frosselet](https://github.com/Frosselet)
