# SMO — Semantic Modeling Ontology

Permanent identifier namespace for the Semantic Modeling Ontology (SMO):

```text
https://w3id.org/smo
```

## Maintainer

- Gerhard Balz — GitHub [`@GerhardBalz`](https://github.com/GerhardBalz)

## Canonical project

- Repository: `GerhardBalz/semantic-modeling-ontology`
- Term namespace: `https://w3id.org/smo#`
- Ontology IRI: `https://w3id.org/smo`

## Current routes

The current W3ID namespace was activated through `perma-id/w3id.org#6538`:

- browser requests for `https://w3id.org/smo` → project repository;
- Turtle requests for `https://w3id.org/smo` → `main/model/smo.ttl`;
- `https://w3id.org/smo/docs` → current namespace/publication documentation;
- `https://w3id.org/smo/dist/smo.ttl` → current authoritative Turtle.

## Governed immutable v0.1.0 release

The first governed repository release exists as:

```text
release tag     smo-v0.1.0
release commit  e6ab3f8cf14bafae466a0150ad356547f164bdab
```

The ontology declares:

```text
owl:versionIRI <https://w3id.org/smo/0.1.0>
```

The immutable version routes resolve only to the governed `smo-v0.1.0` release tag:

- browser requests for `https://w3id.org/smo/0.1.0` → tagged `model/smo.ttl` on GitHub;
- Turtle requests for `https://w3id.org/smo/0.1.0` → tagged raw `model/smo.ttl`;
- `https://w3id.org/smo/0.1.0/dist/smo.ttl` → tagged raw `model/smo.ttl`.

No immutable route targets mutable `main`.

GitHub and raw GitHub URLs are replaceable publication backends, not SMO semantic identities.
