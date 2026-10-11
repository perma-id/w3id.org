# /dmfo

Permanent identifier namespace for the **DMFO** ontology
(*A Modular Alignment Architecture for Situationally Interpretable
State Representations*) — an OWL 2 DL Ontology Design Pattern
Network in which a *situation* decomposes into six dimensional slots
(Identity, State, Location, Activity, Context, Evidence) connected
by typed bridge relations binding domain classes to PROV-O,
SOSA/SSN, DUL/DnS, GeoSPARQL, and OWL-Time.

## Maintainer

- **Name:** Jan Christian Redlich
- **Affiliation:** Bonn Systems GmbH, Bonn, Germany
- **E-mail:** jan.redlich@bonnsystems.com
- **GitHub:** [@JanChristianRedlich](https://github.com/JanChristianRedlich)

## Person submitting this PR

Jan Christian Redlich (same as maintainer).

## Upstream resources

- **Repository (source of truth):** https://github.com/JanChristianRedlich/DMFO
- **License:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
- **Versioning:** Semantic Versioning. Each ontology release is tagged
  `vX.Y.Z` in the repository (current: `v1.0.0`).
- **Citation:** Redlich, Kloke, Bosse (2026). *DMFO: A Modular
  Alignment Architecture for Situationally Interpretable State
  Representations.* Manuscript.

## Resolution scheme

| Pattern | Resolves to |
| --- | --- |
| `https://w3id.org/dmfo` | aggregated TBox (`ontology/dmfo-full.ttl`, main branch) |
| `https://w3id.org/dmfo#TimeVaryingEntity` (and other term IRIs) | same as above; HTTP layer strips the fragment, the client resolves the term in the returned Turtle |
| `https://w3id.org/dmfo/full/1.0.0` | aggregated TBox at git tag `v1.0.0` |
| `https://w3id.org/dmfo/{module}` | module TBox on main branch |
| `https://w3id.org/dmfo/{module}/1.0.0` | module TBox at git tag `v1.0.0` |
| `https://w3id.org/dmfo/profiles/{profile}` | profile TBox on main branch |
| `https://w3id.org/dmfo/profiles/{profile}/1.0.0` | profile TBox at git tag `v1.0.0` |

**Modules:** `identity`, `state`, `evidence`, `context`, `activity`,
`location`, `identity-deriv`.
**Profiles:** `maritime`, `food`.

HTML clients (browsers sending `Accept: text/html`) are redirected to
the GitHub repository as the human-readable landing page; all other
Accept headers — including `text/turtle`, `application/rdf+xml`,
`application/ld+json`, and `*/*` — receive the Turtle source from
`raw.githubusercontent.com`.

## Verification

After this PR is merged, the following should return HTTP 302 to the
documented targets:

```bash
curl -sI https://w3id.org/dmfo                    # → dmfo-full.ttl (main)
curl -sI https://w3id.org/dmfo/full/1.0.0         # → dmfo-full.ttl (tag v1.0.0)
curl -sI https://w3id.org/dmfo/identity           # → dmfo-identity.ttl (main)
curl -sI https://w3id.org/dmfo/identity/1.0.0     # → dmfo-identity.ttl (tag v1.0.0)
curl -sI https://w3id.org/dmfo/profiles/maritime  # → mar-tbox.ttl (main)

# HTML landing
curl -sI -H "Accept: text/html" https://w3id.org/dmfo
# → https://github.com/JanChristianRedlich/DMFO
```
