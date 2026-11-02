# /aegis/

Permanent identifiers for Aegis, an open, standards-based digital identity
platform built by Protoworks, a one-person startup in Cape Town, South Africa,
working on secure digital identity for all South Africans.

`https://w3id.org/aegis/` redirects to <https://ns.aegis.protoworks.dev/>.

## Identifiers

- `https://w3id.org/aegis/didcomm/v1`: the Aegis DIDComm JSON-LD context,
  version 1. It defines the DIDComm service terms used in DID documents
  (`did-communication`, `DIDCommMessaging`, `priority`, `recipientKeys`,
  `routingKeys`, `accept`, `uri`), each with the meaning given by the
  specification that defines it: Aries RFC 0067 (DIDComm DID document
  conventions) and DIDComm Messaging v2.0.
  - `Accept: application/ld+json` or `application/json`, or any other
    client: 302 to <https://ns.aegis.protoworks.dev/didcomm/v1>
  - `Accept: text/html`: 303 to <https://ns.aegis.protoworks.dev/didcomm/>
- `https://w3id.org/aegis/didcomm#<term>`: the vocabulary those terms expand
  to; 303 to <https://ns.aegis.protoworks.dev/didcomm/>, which documents every
  term at its anchor.

## Contact

- Richard Peters
- GitHub: [@Executioner1939](https://github.com/Executioner1939)
