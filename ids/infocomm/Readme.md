# Information Communication Ontology (infocomm)

This namespace exposes persistent IRIs for the Information Communication Ontology (Infocomm), the LFDT CA2-SIG Standards Working Group vocabulary for modelling communication events, their participants, and the media, formats, and protocols that govern information exchange.

## Redirect targets

- HTML documentation (`text/html`, browsers) → https://aiaont.github.io/infocomm/infocomm.html
- JSON-LD (`application/ld+json`) → https://cdn.jsdelivr.net/gh/aiaont/infocomm@main/infocomm.jsonld
- Turtle (`text/turtle`) → https://cdn.jsdelivr.net/gh/aiaont/infocomm@main/infocomm.ttl
- RDF/XML (default fallback) → https://cdn.jsdelivr.net/gh/aiaont/infocomm@main/infocomm.owl

Versioned requests (e.g. `https://w3id.org/infocomm/?v1.0.0`) are rewritten to the artefacts tagged with the matching version in the repository. The HTML redirect appends `?v=<version>` to the GitHub Pages URL so browsers fetch the correct release.

## Scope

Key resources delivered through this namespace include:

- Classes for `CommunicationEvent`, `CommunicationParty`, `Information`, `Medium`, `Format`, and `Protocol`
- Properties such as `hasSender`, `hasRecipient`, `transmits`, `hasMedium`, `hasFormat`, `isGovernedBy`/`governs`
- Constraints that keep the communication model consistent (disjoint core classes, functional links between events and their components)

## Source

Canonical repository and issue tracker: https://github.com/aiaont/infocomm

## Contacts

- LFDT CA2-SIG Standards WG – [@aiaont](https://github.com/aiaont)
- Christiaan Pauw – [@christiaanpauw](https://github.com/christiaanpauw)
