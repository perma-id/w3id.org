## Croissant Policy Profile

An additive policy layer for [Croissant](https://mlcommons.org/working-groups/data/croissant/)
dataset descriptors.

Croissant describes what a dataset *is*. It does not say what may be *done* with
it, by whom, in which state, or what happens when a consumer asks for something
the dataset does not permit. This profile adds a machine-checkable statement of
the operations a dataset admits and the conditions under which it admits them,
so that a gate in front of the data can permit or refuse a request from the
descriptor alone, and leave a record of why. Removing the profile's terms leaves
a valid Croissant 1.0 document.

**This is an independent profile built on Croissant. It is not an MLCommons
product and carries no endorsement from the Croissant project.**

### Redirects

| Request | Resolves to |
|---|---|
| `https://w3id.org/croissant-policy/` | the version index |
| `https://w3id.org/croissant-policy/0.1.0` | the human-readable profile document |
| `https://w3id.org/croissant-policy/0.1.0` with `Accept: application/ld+json` | `context.jsonld`, the term definitions |
| `https://w3id.org/croissant-policy/0.1.0/profile.jsonld` | the PROF description: which artifact plays which role |
| `https://w3id.org/croissant-policy/0.1.0/shapes.ttl` | SHACL shapes for the static conformance clauses |
| `https://w3id.org/croissant-policy/0.1.0/odrl` | the ODRL carrier profile, described in the same document |
| `https://w3id.org/croissant-policy/0.1.0/<term>` | the profile document defining that term |

All redirects are `303 See Other` to
`https://doytsujin.github.io/ok-croissant-policy-profile/ns/`.

Versions are never changed in place. Extending the profile's operator set is a
version bump, because a conforming evaluator must refuse an operator it does not
implement — so a term silently added to an existing version would turn a permit
into a refusal for older consumers.

### What resolves

| Artifact | Served as |
|---|---|
| Profile document | `text/html` |
| `context.jsonld` — the JSON-LD context | `application/ld+json` |
| `profile.jsonld` — a `prof:Profile` description of the profile's resources | `application/ld+json` |
| `shapes.ttl` — SHACL shapes for the profile's conformance clauses | `text/turtle` |
| `shapes-odrl.ttl` — the same clauses for the ODRL carrier | `text/turtle` |

All of them are live at the redirect target today; the redirect is the only
missing piece.

### Source

Specification, reference implementation, conformance validator, SHACL shapes and
measured overhead: <https://github.com/doytsujin/ok-croissant-policy-profile>

Archived at [doi:10.5281/zenodo.22018156](https://doi.org/10.5281/zenodo.22018156),
a concept DOI resolving to the newest released version.

Emitted documents are checked against MLCommons' `mlcroissant` validator, and
the rewrite rules in this directory are checked by
`tests/test_w3id_redirects.py` in the repository above, which applies them to
every path in the table at the top of this file.

### Contact

Alexander Chernov — GitHub [@doytsujin](https://github.com/doytsujin),
ORCID [0009-0007-3198-2712](https://orcid.org/0009-0007-3198-2712).
Issues on the repository above reach the maintainer and are the preferred route.
