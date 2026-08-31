# MODAVIS permanent identifiers

This directory defines the W3ID namespace for the [MODAVIS Ontology
Network](https://github.com/modavis-project/modavis-ontology-network) and the
[Virtual Acoustic Object (VAO) Standard](https://github.com/modavis-project/vao-standard).

The namespace root is:

```text
https://w3id.org/modavis/
```

The ontology-network routes cover ontology modules, controlled vocabularies,
JSON-LD context, SHACL profiles, and release metadata. Stable ontology and
vocabulary identifiers resolve to the current compatible release; identifiers
that include `0.1.0` resolve to immutable versioned representations. Content
negotiation is available for HTML, Turtle, JSON-LD, and RDF/XML where those
representations are published.

VAO uses the child namespace `https://w3id.org/modavis/vao/`. Its versioned
schema, profile, vocabulary, context, mapping, and specification identifiers
are maintained in [`vao/`](vao/).

## Maintainer

- Dominik Ukolov — [ORCID 0000-0002-7904-3892](https://orcid.org/0000-0002-7904-3892)
- GitHub: [@modavis-project](https://github.com/modavis-project)
- Affiliation: Digital Humanities (Image/Object), Friedrich Schiller University
  Jena; Research Group DIGITAL ORGANOLOGY, Leipzig University
