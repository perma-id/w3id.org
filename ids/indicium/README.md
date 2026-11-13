# Indicium

Permanent identifiers for Indicium, a standard for typed scientific claims bound to
their evidence, published by the Holobiomics Lab (CNRS / Université Côte d'Azur).

## Namespace

* `https://w3id.org/indicium/` is the schema namespace (slash form), for example
  `https://w3id.org/indicium/IndiciumDocument`. A request for the namespace or a term is
  redirected (303) to `https://holobiomicslab.cnrs.fr/ns/indicium`, which answers by
  content negotiation with the OWL ontology (Turtle), the JSON-LD context
  (`application/ld+json`), RDF/XML or the documentation (any other `Accept`).
* `https://w3id.org/indicium/context.jsonld`, `indicium.owl.ttl`, `indicium.shapes.ttl`
  and `indicium.schema.json` are the current files on the main branch.
* `https://w3id.org/indicium/<X.Y.Z>/<file>` is the same file as tagged in release X.Y.Z.

The SuperPattern terms (`asb:Claim`, `asb:subject`, ...) live under
`https://w3id.org/asb#`, registered separately.

## Homepages

* https://github.com/HolobiomicsLab/indicium (source, releases)
* https://holobiomicslab.github.io/indicium/ (documentation)

## Contact

* Louis-Félix Nothias, louis-felix.nothias AT cnrs DOT fr, @lfnothias
* Issues: https://github.com/HolobiomicsLab/indicium/issues
