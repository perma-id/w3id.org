# NEDT persistent identifier

This directory registers the persistent namespace
[`https://w3id.org/nedt#`](https://w3id.org/nedt#) for the National Energy
Digital Twin (NEDT) ontology.

The namespace redirects to the canonical OWL/Turtle ontology maintained at
<https://github.com/buildinginformaticslab/nedt-ontology>. Hash-term IRIs are
intended to remain stable across repository and hosting changes.

## Contact and maintenance

- Project organisation: [Building Informatics Lab](https://github.com/buildinginformaticslab)
- Source repository: <https://github.com/buildinginformaticslab/nedt-ontology>
- Maintenance contact: open an issue at
  <https://github.com/buildinginformaticslab/nedt-ontology/issues>

## Maintainers

[Divyanshu Sood](https://github.com/divyanshusood)

## Redirect behaviour

Browser requests are redirected to the human-readable GitHub ontology page.
Turtle, RDF/XML, JSON-LD, and default non-browser requests are redirected with
HTTP 303 to the canonical Turtle serialisation. The ontology currently has no
separate JSON-LD or RDF/XML release; those requests deliberately receive the
canonical Turtle document rather than a fabricated representation.
