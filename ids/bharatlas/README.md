# bharatlas

Permanent identifiers for the dated data releases of
[bharatlas](https://bharatlas.com), an open atlas of India's geographic data:
administrative boundaries with LGD codes, city wards, and environment and
infrastructure layers.

Each release has a code `bharatlas-<dataset>-<year>.<month>`, is pinned by a
SHA-256 checksum, and is never changed once published.

## Redirects

| Identifier | Redirects to |
| --- | --- |
| `https://w3id.org/bharatlas/` | `https://bharatlas.com/releases`, the list of releases |
| `https://w3id.org/bharatlas/<dataset>` | `https://bharatlas.com/releases/<dataset>`, every release of the dataset |
| `https://w3id.org/bharatlas/<dataset>/latest` | the dataset's newest release (resolved by bharatlas.com) |
| `https://w3id.org/bharatlas/<dataset>/latest/<file>` | that file of the newest release |
| `https://w3id.org/bharatlas/<dataset>/<year>.<month>` | `https://bharatlas.com/releases/bharatlas-<dataset>-<year>.<month>`, the release manifest (files, checksums, sources and licences) |
| `https://w3id.org/bharatlas/<dataset>/<year>.<month>/<file>` | that file of the release |

A dataset is a layer id (for example `lgd_states`) or a short code (for example `cw`).

Examples: `https://w3id.org/bharatlas/cw`, `https://w3id.org/bharatlas/cw/latest`,
`https://w3id.org/bharatlas/cw/2026.11/cw_districts.csv`.

All redirects are 302.

## Maintainers

- Sathya Sankaran, [@sathya-sankaran](https://github.com/sathya-sankaran)
- Urban Morph, [@urbanmorph](https://github.com/urbanmorph) (https://urbanmorph.com)
