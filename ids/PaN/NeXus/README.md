# NeXus Ontology

This folder uses .htaccess rules to provide stable, resolvable URIs for the
NeXus Ontology.

## Description

Github repository:
- /PaN/NeXus/ → https://github.com/FAIRmat-NFDI/NeXusOntology

NeXus Ontology:
- /PaN/NeXus/definitions → documentation for the latest release
- /PaN/NeXus/definitions/latest → same as above
- /PaN/NeXus/definitions/v2026.01 (or any other release, e.g. v2025.11) →
  documentation for that specific version
- /PaN/NeXus/definitions/NeXusOntology.{owl,ttl,nt,jsonld} → the latest
  release's ontology file, in the given format
- /PaN/NeXus/definitions/vX.Y/NeXusOntology.{owl,ttl,nt,jsonld} → same, for
  that specific version
- /PaN/NeXus/definitions/NeXusOntology_reasoned.owl → the latest release's
  ontology with inferred axioms materialized (via a reasoner), not just
  asserted ones
- /PaN/NeXus/definitions/vX.Y/NeXusOntology_reasoned.owl → same, for that
  specific version
- Content negotiation (`Accept: text/turtle`, `application/rdf+xml`,
  `application/n-triples`, `application/ld+json`) is supported on both the
  latest and versioned namespaces; browsers get the HTML documentation

Entity IRIs are hash IRIs, e.g. /PaN/NeXus/definitions#NXentry, and resolve
to that entity's own section of the documentation.

## Contact

* Heike Görzig (heike.goerzig@helmholtz-berlin.de),
[Helmholtz Zentrum Berlin](https://www.helmholtz-berlin.de/), Germany, [@hgoerzig](https://github.com/hgoerzig)

* Aaron Brewster (NIAC Chair) (nexus-committee@nexusformat.org),
[Lawrence Berkeley National Laboratory](https://www.lbl.gov/), USA, [@phyy-nx](https://github.com/phyy-nx)
