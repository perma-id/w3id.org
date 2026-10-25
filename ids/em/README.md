# /em — legacy alias of /extendedmatrix

**Not opened. The pull request is E.D.'s to open.**

This directory is ready to be copied to `ids/em/` in a fork of
[perma-id/w3id.org](https://github.com/perma-id/w3id.org) for one small pull
request.

## Why

The Extended Matrix space on w3id is `/extendedmatrix`
(perma-id/w3id.org#6722, merged 21 September 2026). Before it existed, the
tools emitted IRIs under `/em`, which nobody registered:

| IRI under /em | where it is | can it change? |
|---|---|---|
| `https://w3id.org/em/ontology#…` (CRMem, prefix `em:`) | every RDF export since 2026 | no: delivered RDF carries it |
| `https://w3id.org/em/id/graph/<g>/node/<n>` | node IRIs of the RDF export | no: delivered RDF carries it |
| `https://w3id.org/em/schemas/em.v1.schema.json` | `$id` of the frozen em.json 1.0 schema | no: the schema is frozen |
| `https://w3id.org/em/s3dgraphy#…` | qualia, units, minted CRS in RDF | moved to `/extendedmatrix/s3dgraphy#` (24 Oct 2026); the old ones remain in delivered RDF |

## What the PR says

w3id's naming policy turns down identifiers that are too generic, and `em`
alone would be one. So the request is **not** a new namespace: it is an
**alias** of a namespace already registered, owned by the same maintainer, so
that IRIs already published resolve. Every path under `/em` redirects (302) to
the same path under `/extendedmatrix`.

Suggested title: *Add /em as a legacy alias of /extendedmatrix*.

Suggested body:

> `/em` is a legacy alias of `/extendedmatrix` (#6722, same maintainer). The
> Extended Matrix tools emitted IRIs under `/em` before `/extendedmatrix` was
> registered — the CRMem ontology (`https://w3id.org/em/ontology#`) and the node
> IRIs of exported RDF — and those IRIs are in data already published. The
> `.htaccess` only redirects every path to the same path under
> `/extendedmatrix`; no new content, no new namespace.

## Check after the merge

    curl -sI https://w3id.org/em/ontology                         # 302 → /extendedmatrix/ontology
    curl -sIL https://w3id.org/em/schemas/em.v1.schema.json       # ends 200 on extendedmatrix.org
