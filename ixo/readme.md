# ixo

Permanent-identifier redirects for the **IXO namespace** — the interpretation
layer for entities, claims, credentials and linked resources on the IXO Spatial
Web. Open protocols for the Internet of Impact. [ixo.world](https://ixo.world)

This directory configures `https://w3id.org/ixo/*`. The vocabularies,
contexts, SKOS concept schemes, JSON Schemas and SHACL shapes themselves live
in **[ixofoundation/ns](https://github.com/ixofoundation/ns)** and are served
from `https://ixofoundation.github.io/ns/`. See that repo's
[`README`](https://github.com/ixofoundation/ns#readme) for the namespace layout.

## Canonical URI form

```
https://w3id.org/ixo/<path>
```

There is **one** canonical form, with no `ns/` prefix. For example:

| Resource | Canonical IRI |
| --- | --- |
| Umbrella context | `https://w3id.org/ixo/context/v1` |
| Core vocabulary | `https://w3id.org/ixo/vocab/v1` |
| A SKOS scheme | `https://w3id.org/ixo/vocab/entity-types/v1` |
| A concept in it | `https://w3id.org/ixo/vocab/entity-types/v1#project` |
| A JSON Schema | `https://w3id.org/ixo/schemas/v1/domainCard` |
| A SHACL shape | `https://w3id.org/ixo/shapes/v1/DomainCardShape` |

The legacy `https://w3id.org/ixo/ns/<path>` variant is collapsed to the
canonical bare form with a single **301**. Do not use it in new code.

## Redirect-code policy

- **303 See Other** for every namespace IRI. These IRIs identify abstract
  resources (a context, a class, a property, a concept), not the documents that
  describe them, so a 303 points the client at the describing document. This
  replaces the previous configuration's incorrect 302s.
- **301 Moved Permanently** for the legacy `ns/` prefix → canonical bare form.
- Every rule targets a concrete file (`…/index.jsonld` or `…/<name>.json`),
  never a directory — a directory target lands on a GitHub Pages listing or a
  404.
- Trailing slashes are tolerated (`…/v1` and `…/v1/` resolve identically).

## Version policy

Vocabularies are versioned with a `v1/` path segment. Non-breaking additions
are made in place; breaking changes go to a new `v2/` (with `owl:deprecated`
markers on superseded terms in `ixofoundation/ns`). A versionless
`…/context` resolves to the current major (`v1`).

## Content type

`w3id.org` only issues redirects; the `Content-Type` of the served document is
set by the **content host**. The current deployment serves `.jsonld` documents
as `application/ld+json` — verified against `ixofoundation.github.io/ns` — so
content negotiation is satisfied for contexts, vocabularies, SKOS schemes and
shapes.

JSON Schema documents (`schemas/v1/*.json`) are served as `application/json`.
Emitting the more specific `application/schema+json` is an optional refinement
that can only be configured on the content host (a redirect cannot set it); the
test script accepts `application/json` and enforces a specific type only under
`STRICT=1`.

## Testing

[`tests/validate-redirects.sh`](./tests/validate-redirects.sh) exercises every
rule class — first-hop status (303 / 301) and Location for all of them, plus a
full follow-through (200, body size, `Content-Type`) for paths whose content
already exists.

```sh
tests/validate-redirects.sh                       # test against w3id.org/ixo
tests/validate-redirects.sh https://staging.host  # test rules before go-live
STRICT=1 tests/validate-redirects.sh              # fail on wrong Content-Type
```

Run it in CI once these rules are deployed. SKOS-scheme and schema/shape paths
are checked structurally now and become full content checks as their documents
land (Phases 3 and 5 in `ixofoundation/ns`).

## Contacts

- Shaun Conway
  - email: contact@emerging.eco
  - github: ig-shaun
- Michael Pretorius
  - email: michael@ixo.world
  - github: Michael-Ixo
