# Claim Ontology (claimont)

This namespace provides persistent IRIs for the Claim Ontology (Claimont), the LFDT CA2-SIG Standards Working Group vocabulary for modelling defeasible claims, the entities that assert them, and the evidence that substantiates or challenges them. Claimont is designed to interoperate with AIAO, Impact Ontology, and Infocomm.

## Redirect targets

- HTML documentation (`text/html`, browsers) → https://aiaont.github.io/claimont/claimont.html
- JSON-LD (`application/ld+json`) → https://cdn.jsdelivr.net/gh/aiaont/claimont@main/claimont.jsonld
- Turtle (`text/turtle`) → https://cdn.jsdelivr.net/gh/aiaont/claimont@main/claimont.ttl
- RDF/XML (default fallback) → https://cdn.jsdelivr.net/gh/aiaont/claimont@main/claimont.owl

Versioned requests such as `https://w3id.org/claimont/?v1.0.0` are rewritten to the artefacts published under the matching tag in the repository via jsDelivr.

## Scope

Key resources exposed through this namespace cover:

- Core classes for `Claim`, `Claimant`, `Substantiation`, `Attestation`, `Attester`, `Subject`, `Predicate`, and `Object`
- Relationships such as `claimedBy`, `attestedBy`, `hasSubject`, `hasPredicate`, `hasObject`, `isSupportedBy`/`supports`, and `comprisesClaims`
- Constraints for modelling defeasible statements alongside the attestations and evidence that support or refute them

## Source

Canonical repository and issue tracker: https://github.com/aiaont/claimont

## Contacts

- LFDT CA2-SIG Standards WG – [@aiaont](https://github.com/aiaont)
- Christiaan Pauw – [@christiaanpauw](https://github.com/christiaanpauw)
