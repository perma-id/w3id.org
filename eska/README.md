# ESKA permanent identifier configuration

Permanent identifier namespace for **Executable Semantic Knowledge Architecture (ESKA)**:

```text
https://w3id.org/eska
```

Project:

- Repository: `GerhardBalz/executable-semantic-knowledge-architecture`
- Point of contact: **Gerhard Balz** — GitHub `@GerhardBalz`

## Status

**Active.** The ESKA namespace was activated by perma-id/w3id.org#6530 and externally verified before the ontology source migrated to the permanent term namespace:

```text
https://w3id.org/eska#
```

The former `urn:eska:core:` identifiers are retained only as historical predecessors in the ESKA namespace-migration record; they are not asserted `owl:sameAs`.

## Current routes

The unversioned routes represent the current governed ESKA publication and follow the repository `main` branch:

- vocabulary base / hash-namespace document;
- human-readable namespace/publication documentation;
- combined Turtle distribution;
- stable module routes for `core`, `capability`, `service`, `agent`, and `deployment`;
- content negotiation for `text/turtle` on the vocabulary base and module routes.

## Immutable version routes

Versioned ontology and distribution routes resolve only to immutable governed ESKA release tags.

The first governed repository release is `eska-v0.1.0`. It remains the immutable backend for:

- core `0.1.0`;
- capability `0.2.0`;
- service `0.4.0`;
- agent `0.3.0`;
- deployment `0.1.0`.

The second governed repository release is:

```text
eska-v0.2.0
```

It adds the immutable backend for core `0.2.0`:

```text
https://w3id.org/eska/model/core/0.2.0
https://w3id.org/eska/dist/0.2.0/eska-core.ttl
```

Both core `0.2.0` routes target only `eska-v0.2.0`; they do not target mutable `main`.

Repository release versions and ontology-module semantic versions are intentionally independent.
