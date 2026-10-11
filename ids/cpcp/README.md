# /cpcp/

`https://w3id.org/cpcp/` is the permanent namespace for the **Coordination
Protocol Contract Package (CPCP)** — a [JSON-RPC-LD](https://github.com/laquereric/json-rpc-ld)
profile that specifies envelopes, a refusal taxonomy, idempotency rules, layer
authority and operation identity for machine-to-machine coordination seams.

The normative contract, the OWL/Turtle ontology, and the method and seam
registries are published at:

* Contract and ontology — <https://github.com/laquereric/coordination-protocol-contract-package>
* Method and seam registries — <https://github.com/laquereric/cpcp_registry>

## Identifiers

| IRI shape | Purpose |
|---|---|
| `https://w3id.org/cpcp/ns#` | term namespace (JSON-LD `@vocab`), e.g. `cpcp:Note` |
| `https://w3id.org/cpcp/ontology/base/1.0.0` | ontology IRI and `owl:versionIRI` |
| `https://w3id.org/cpcp/osi8/<seam>#<Method>` | operation identity, e.g. `.../persist#path.set` |

## Redirects

`.htaccess` resolves requests as follows:

* An RDF request (`text/turtle`, `application/x-turtle`, `text/n3`,
  `application/rdf+xml`) for `/cpcp/`, `/cpcp/ns` or `/cpcp/ontology/base/…`
  is redirected (303) to the Turtle document `ontology/cpcp-base.ttl`.
* Every other request is redirected (302) to the contract repository.

## Maintainer

Eric Laquer — GitHub: [@laquereric](https://github.com/laquereric)
