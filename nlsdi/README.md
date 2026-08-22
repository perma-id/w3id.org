# w3id.org/nlsdi — permanent identifier for the NL-SDI ontology

This README accompanies the `.htaccess` in a PR to
[perma-id/w3id.org](https://github.com/perma-id/w3id.org) creating the
`/nlsdi/` namespace. (Copy of the text intended for `w3id.org/nlsdi/README.md`.)

## What this namespace identifies

`https://w3id.org/nlsdi/` is the base IRI of the **NL-SDI Energy-District
Knowledge Graph Ontology** — a standards-grounded ontology (GeoSPARQL, SOSA/SSN,
QUDT, DCAT, CityGML 3.0 + Energy ADE, IEC CIM, SAREF4BLDG/ENER, BAG, CBS) for
the Dutch building-stock / district-energy knowledge graph developed at
TU Delft. The ontology, SHACL shapes, and documentation are generated from a
single mapping registry and published on GitHub Pages.

## Redirect behaviour (303, slash namespace)

| Request | Accept | Target |
|---|---|---|
| `/nlsdi/` | `text/turtle` | `ontology.ttl` |
| `/nlsdi/` | `application/rdf+xml` | `ontology.owl` |
| `/nlsdi/` | `application/ld+json` | `ontology.jsonld` |
| `/nlsdi/` | anything else (browsers) | WIDOCO `index-en.html` |
| `/nlsdi/shapes` | RDF types | `shapes.ttl` |
| `/nlsdi/shapes` | `text/html` | docs `#shapes` |
| `/nlsdi/<Term>` | RDF types | full ontology serialization |
| `/nlsdi/<Term>` | `text/html` | docs `#<Term>` anchor |

## Redirect targets — all verified 200 before submission

Served from <https://amin-jalilzadeh-tu.github.io/nlsdi/>
(repo: <https://github.com/amin-jalilzadeh-tu/nlsdi>), checked 2026-08-19:

| target | status | media type |
|---|---|---|
| `/` · `/index-en.html` | 200 | `text/html` |
| `/ontology.ttl` | 200 | `text/turtle` |
| `/ontology.owl` | 200 | `application/rdf+xml` |
| `/ontology.jsonld` | 200 | `application/ld+json` |
| `/shapes.ttl` | 200 | `text/turtle` |
| `/mappings/` | 200 | `text/html` |
| `/v3/` · `/v3/index-en.html` | 200 | `text/html` |
| `/v3/ontology.{ttl,owl,jsonld}` | 200 | as above |
| `/v3/shapes.ttl` | 200 | `text/turtle` |

`/v3/id/…` and `/v3/cbs/…` return **404 by design**: they identify buildings, observations and
code individuals in the instance graph, which the ontology does not define. 303-ing them to the
ontology would return a document that says nothing about the resource requested.

## Contact / maintainer

Amin Jalilzadeh — PhD researcher, Delft University of Technology
(aminjalilzade1@gmail.com, GitHub: amin-jalilzadeh-tu).

## License

Ontology and documentation: CC BY 4.0 (see the repository LICENSE; source
data carry upstream terms and are not part of this namespace).
