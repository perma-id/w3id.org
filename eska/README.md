# ESKA permanent identifier configuration

This directory is the prepared upstream contribution payload for:

```text
https://w3id.org/eska
```

Project:

- **Executable Semantic Knowledge Architecture (ESKA)**
- Repository: `GerhardBalz/executable-semantic-knowledge-architecture`
- Point of contact: **Gerhard Balz** — GitHub `@GerhardBalz`

## Status

**Prepared, not active.**

The authoritative ESKA ontology source still uses the provisional term namespace:

```text
urn:eska:core:
```

The adopted permanent target namespace is:

```text
https://w3id.org/eska#
```

The `.htaccess` file in this directory must be submitted to the upstream `perma-id/w3id.org` repository under `eska/.htaccess` and merged before ESKA source ontology IRIs are migrated.

## Initial redirects

The prepared routing package provides:

- vocabulary base / hash-namespace document;
- human-readable namespace/publication documentation;
- combined Turtle distribution;
- stable unversioned module routes for `core`, `capability`, `service`, `agent`, and `deployment`;
- content negotiation for `text/turtle` on the vocabulary base and module routes.

Versioned module routes are intentionally **not** configured yet. They will be added only when immutable governed release targets exist.

## Activation order

```text
1. Merge ESKA backend publication targets
2. Verify public GitHub HTML/RDF backend URLs
3. Fork perma-id/w3id.org
4. Copy this directory to w3id.org/eska/
5. Submit W3ID PR
6. Wait for upstream merge
7. Verify https://w3id.org/eska externally
8. Only then migrate ESKA terms/ontology IRIs atomically
```

This ordering prevents the repository from claiming persistent semantic identifiers before the redirect infrastructure actually exists.
