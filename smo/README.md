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

## Initial activation scope

This initial W3ID request activates only current governed publication routes:

- browser requests for `https://w3id.org/smo` → project repository;
- Turtle requests for `https://w3id.org/smo` → `main/model/smo.ttl`;
- `https://w3id.org/smo/docs` → namespace/publication documentation;
- `https://w3id.org/smo/dist/smo.ttl` → current authoritative Turtle.

The ontology declares `owl:versionIRI <https://w3id.org/smo/0.1.0>`, but no immutable version redirect is included in this activation request. That route will be added only after the governed `smo-v0.1.0` release tag exists, so an immutable identifier never points to a mutable or nonexistent backend.

GitHub and raw GitHub URLs are replaceable publication backends, not SMO semantic identities.
