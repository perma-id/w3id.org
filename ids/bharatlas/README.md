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
| `https://w3id.org/bharatlas/` | `https://bharatlas.com/releases/index.json`, the list of releases |
| `https://w3id.org/bharatlas/<dataset>/<year>.<month>` | `https://bharatlas.com/releases/bharatlas-<dataset>-<year>.<month>`, the release manifest (files, checksums, sources and licences) |
| `https://w3id.org/bharatlas/<dataset>/<year>.<month>/<file>` | that file of the release |

Example: `https://w3id.org/bharatlas/cw/2026.11/cw_districts.csv`.

All redirects are 302.

## Maintainers

- Sathya Sankaran, [@sathya-sankaran](https://github.com/sathya-sankaran)
- Urban Morph, [@urbanmorph](https://github.com/urbanmorph) (https://urbanmorph.com)
