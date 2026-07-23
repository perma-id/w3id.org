# /baseveda/

Permanent namespace for **BaseVeda**, a Type / Function / Value ontology in
which every type carries an explicit Function (what it is for) and an explicit
Value (how it is measured on a real scale).

## Why this identifier exists

BaseVeda is consumed by many independent, self-hosted deployments. If the
vocabulary namespace were derived from a deployment's own hostname, each
deployment would emit a different IRI for the same term and no two datasets
would join. A hostname-free `w3id.org` namespace gives every deployment the
identical, permanent string for the same meaning, and lets the target be
re-pointed by a one-line pull request if the serving host ever changes.

## URI pattern

Terms are hash URIs, one document per ontology module:

| IRI | Resolves to |
|---|---|
| `https://w3id.org/baseveda/vocab#Person` | core vocabulary document |
| `https://w3id.org/baseveda/planguage-core#File` | `planguage-core` module document |

The fragment is resolved client-side and never reaches the server, so this
identifier needs no per-term routes. Only module documents are redirected;
the path is preserved, so new modules resolve without changing `.htaccess`.

Documents are served as JSON-LD and describe their terms using these same
canonical `w3id.org/baseveda/...` IRIs as subjects.

## Maintainer

| Name | Contact | GitHub |
|---|---|---|
| Kai Gilb | kaigilb@mac.com | [@KaiGilb](https://github.com/KaiGilb) |
