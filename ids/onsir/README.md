# OnSIR — Ontology for Seed Irradiation Research

`https://w3id.org/onsir`

An OWL 2 DL ontology for gamma and X-ray irradiation of plant seeds. It covers irradiation
treatments, absorbed dose and dose rate as typed QUDT quantities, measured endpoints and endpoint
categories, dose–response models, and taxon-specific dose windows expressed as OWL 2 datatype
facets so that a reasoner derives where a numeric dose falls relative to the statistics reported
for a given taxon. It ships with an ABox curated from a 28-study systematic review, SPARQL
competency questions, and external alignments to BFO, PO, NCBITaxon, ChEBI, PATO, ENVO and QUDT.

- **Canonical repository:** <https://github.com/lfmalves/OnSIR>
- **Documentation:** <https://lfmalves.github.io/OnSIR/>
- **Licence:** CC BY 4.0

## Redirects

| Request | Accept | Resolves to |
| --- | --- | --- |
| `/onsir` | `text/html` | the generated documentation |
| `/onsir` | `text/turtle` | `OnSIR.ttl` |
| `/onsir` | `application/rdf+xml` | `OnSIR.owl` |
| `/onsir/<Term>` | `text/html` | that term in the documentation |
| `/onsir/<Term>` | RDF | the ontology defining the term |
| `/onsir/abox` | any | the curated ABox, Turtle or RDF/XML |
| `/onsir/<x.y.z>` | any | that release, from the matching git tag `v<x.y.z>` |

Term IRIs are slash IRIs. Version IRIs (`owl:versionIRI`) resolve to an annotated git tag, so a
version IRI keeps denoting the release it was minted for while the unversioned IRI tracks the
current one.

All redirects are 303 See Other.

## Contact

Luis Felipe Medeiro Alves — GitHub [@lfmalves](https://github.com/lfmalves),
ORCID [0009-0005-4227-5568](https://orcid.org/0009-0005-4227-5568)
