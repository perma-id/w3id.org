# xny

Namespace for the `did:xny` DID method — a W3C-registered DID method whose
documents are anchored on Base.

- Method specification: https://github.com/humanbased-ai/xny-did/blob/main/docs/xny-did-method.md
- DID method registry entry: https://github.com/w3c/did-extensions/blob/main/methods/xny.json
- Source: https://github.com/humanbased-ai/xny-did

## Identifiers

| Identifier | Resolves to |
|---|---|
| `https://w3id.org/xny` | the method specification; also the base for vocabulary IRIs such as `https://w3id.org/xny#owner` |
| `https://w3id.org/xny/v1` | the JSON-LD context defining this method's terms, served as `application/ld+json` |

`https://w3id.org/xny/v1` is immutable. Terms may be added in a later version,
but a published version URL will never change an existing term's IRI or
definition; a breaking change gets a new version URL.

## Maintainers

- George Huang (@chababa9) · george@inductive.network
