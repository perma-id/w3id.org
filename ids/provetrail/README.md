# Provetrail

Permanent identifier namespace for **Provetrail**, an open, vendor-neutral standard for verifiable execution provenance: a portable, third-party-verifiable record of what an agent did, in what order, and under what governance.

The namespace is used as the stable `predicateType` identifier for Provetrail statements, so records that embed it keep resolving even if the project's hosting changes.

- `https://w3id.org/provetrail/predicates/run-provenance/v0.1` resolves (303) to the versioned predicate definition. Content is negotiated: a client sending `Accept: text/markdown` (or `text/plain`) receives the raw markdown document; any other client receives the rendered page.
- `https://w3id.org/provetrail` and any other path redirect to the standard's repository.

Versioned predicate paths are immutable: a released path keeps resolving to the definition of exactly that version. The repository target is temporary until provetrail.org serves the canonical documents; only the redirect target will change, never an identifier.

Project: https://github.com/ionalpha/provetrail

## Maintainer

Ion Alpha

- GitHub: [@ion-alpha-dev](https://github.com/ion-alpha-dev)
- Email: contact@ionalpha.io
