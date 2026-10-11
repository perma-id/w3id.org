# /json-rpc-ld/

`https://w3id.org/json-rpc-ld/` is the permanent namespace for **JSON-RPC-LD**,
a Linked Data extension for [JSON-RPC 2.0](https://www.jsonrpc.org/specification).

The core OWL 2 vocabulary defines `Envelope`, `Operation` and `Outcome`
(`Result` / `Error`), plus the identity and idempotency datatype properties
(`operationId`, `jsonRpcVersion`, `methodName`, `reason`, `because`). OWL states
meaning; a profile states closed operational validity in SHACL.

This ontology is the root of its import chain — it imports nothing, and a
profile that specializes JSON-RPC-LD imports it.

* Specification and ontology — <https://github.com/laquereric/json-rpc-ld>

## Identifiers

| IRI | Purpose |
|---|---|
| `https://w3id.org/json-rpc-ld/ns#` | term namespace (`jrl:`), e.g. `jrl:Envelope` |
| `https://w3id.org/json-rpc-ld/ontology/core/1.0.0` | ontology IRI and `owl:versionIRI` |

## Redirects

* An RDF request (`text/turtle`, `application/x-turtle`, `text/n3`,
  `application/rdf+xml`) for `/json-rpc-ld/`, `/json-rpc-ld/ns` or
  `/json-rpc-ld/ontology/core/...` is redirected (303) to the Turtle ontology
  `ontology/json-rpc-ld-core.ttl`.
* Every other request is redirected (302) to the specification repository.

## Maintainer

Eric Laquer — GitHub: [@laquereric](https://github.com/laquereric)
