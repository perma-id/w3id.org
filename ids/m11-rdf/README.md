# /m11-rdf/

Permanent identifiers for a draft RDF rendering of ICH M11 protocol
elements and sections.

## What this is

`https://w3id.org/m11-rdf/` is the namespace for
[kerfors/m11-rdf](https://github.com/kerfors/m11-rdf): one IRI per ICH M11
protocol element and section, rendered from the ICH M11 Technical
Specification (Step 4) and the ICH M11 Terminology published by NCI EVS,
with mapping statements from M11 elements to
[usdm-rdf](https://github.com/kerfors/usdm-rdf) classes and attributes
(`https://w3id.org/cdisc/usdm/v4/`).

An element IRI is `<namespace codelist>.<concept code>`, for example
`https://w3id.org/m11-rdf/C217356.C132352`: the (namespace, concept) pair
as stated in the Technical Specification. A section IRI is
`C217272.<section term code>`. No version segment; each release has a
version IRI (`https://w3id.org/m11-rdf/0.1.0`).

The redirect targets are the repository's GitHub Pages site (one page per
IRI; the whole graph as Turtle, N-Triples, RDF/XML, and JSON-LD) and, for
version IRIs, the Turtle at the release tag.

## Status

Draft, not normative. Not an ICH, CDISC, or HL7 artifact, and not endorsed
by them. The name names neither organisation on purpose. If ICH or CDISC
mint official IRIs for M11 elements, the IRIs here get `owl:sameAs` to
them and `owl:deprecated true`.

## Contact

- Kerstin Forsberg
- kerstin.l.forsberg@gmail.com
- GitHub username: kerfors
