# /astra/

Namespace IRI for the **ASTRA** specification — *Agentic Schema for Transparent Research Analysis* — a declarative format for scientific analyses defined in [LinkML](https://linkml.io).

- Specification site: [astra-spec.org](https://astra-spec.org)
- Source repository: [LightconeResearch/astra-spec](https://github.com/LightconeResearch/astra-spec)
- Schema license: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

## Versioning

The spec site is versioned with [mike](https://github.com/jimporter/mike): each release is deployed to its own subdirectory of `astra-spec.org` (e.g. `/0.0.8/`), with `/latest/` tracking the most recent release. The redirects default to `latest`; a version segment may be inserted to pin to a specific release.

## Redirection policy

| Request | Redirects to |
|---|---|
| `https://w3id.org/astra/` | `https://astra-spec.org/` |
| `https://w3id.org/astra/X.Y.Z/...` | `https://astra-spec.org/X.Y.Z/...` (version pin) |
| `https://w3id.org/astra/latest/...` | `https://astra-spec.org/latest/...` |
| `https://w3id.org/astra/schema/<file>` | `https://astra-spec.org/latest/schema/<file>` |
| `https://w3id.org/astra/elements/<term>/` | `https://astra-spec.org/latest/elements/<term>/` |
| `https://w3id.org/astra/<Term>` | `https://astra-spec.org/latest/elements/<Term>/` |
| `https://w3id.org/astra/<section>` (`about`, `cli`, `community`, `getting-started`, `specification`, `assets`) | `https://astra-spec.org/latest/<section>` |

All redirects use HTTP 302.

## Contact

This space is administered by:

**Francois Lanusse**
GitHub: [eiffl](https://github.com/eiffl)
