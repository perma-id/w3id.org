# w3id.org/odrl-legal

Permanent identifier for the **ODRL Legal Profile (ODRL-L)**, an OWL profile of
ODRL 2.2 that grounds ODRL permissions, prohibitions, and duties in UFO-L legal
positions.

- Namespace IRI: https://w3id.org/odrl-legal/
- Documentation: https://daham-mustaf.github.io/odrl-ufol-grounding/
- Ontology (Turtle): https://daham-mustaf.github.io/odrl-ufol-grounding/ontology/odrl-legal-profile.ttl
- Source & benchmark: https://github.com/Daham-Mustaf/odrl-ufol-grounding

The `.htaccess` performs content negotiation: RDF clients receive the ontology,
browsers receive the HTML documentation, and term IRIs (e.g. `/odrl-legal/Power`)
resolve to their definition anchor in the docs. All redirects use HTTP 303.

Maintainer: Daham M. Mustafa (@Daham-Mustaf), RWTH Aachen University / Fraunhofer FIT.