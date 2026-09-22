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
| `https://w3id.org/croissant-policy/0.1.0/<term>` | the profile document defining that term |

All redirects are `303 See Other` to
`https://doytsujin.github.io/ok-croissant-policy-profile/ns/`.

Versions are never changed in place. Extending the profile's operator set is a
version bump, because a conforming evaluator must refuse an operator it does not
implement — so a term silently added to an existing version would turn a permit
into a refusal for older consumers.

### Source

Specification, reference implementation, conformance validator, and measured
overhead: <https://github.com/doytsujin/ok-croissant-policy-profile>

Archived at [doi:10.5281/zenodo.22018156](https://doi.org/10.5281/zenodo.22018156),
which resolves to the newest released version.

Emitted documents are checked against MLCommons' `mlcroissant` validator.

Maintainer: Alexander Chernov (@doytsujin)
