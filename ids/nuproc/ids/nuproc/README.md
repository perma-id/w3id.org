# NuProc Ontology

Permanent identifiers for the **NuProc Ontology**: an OWL 2 ontology, SKOS vocabularies and SHACL shapes for
engagement events in nuclear new-build procurement.

- Repository: <https://github.com/bonjwanim/nuprockg>
- Licence of the ontology: CC BY 4.0

## Redirects

| Request | Goes to |
|---|---|
| `/nuproc/ns` (term IRIs `https://w3id.org/nuproc/ns#…`) | the core module (Turtle), which declares the classes and properties; the shape IRIs in this namespace are declared in the shapes module |
| `/nuproc/core`, `/nuproc/codebook`, `/nuproc/alignments`, `/nuproc/shapes` | the module in Turtle for RDF requests (`text/turtle`, `application/rdf+xml`, `application/n-triples`, `application/ld+json`), otherwise the HTML documentation (one page, generated from the core, codebook and alignments modules) |
| `/nuproc/<module>/<version>`, from 0.9.0 | the module file at the release tag `tbox-v<version>` |
| `/nuproc/<module>/0.1.0` to `0.8.0` | the *Earlier versions* section of the repository README (these versions were not released) |
| `/nuproc/adr/ADR-NNNN` | the *Design records* section of the repository README |
| `/nuproc/<vocabulary>/…` (SKOS concept schemes and concepts) | the codebook module (Turtle) |
| `/nuproc/ext/plover/…` (placeholder IRIs for PLOVER event types) | the alignments module (Turtle) |
| `/nuproc/demo/…`, `/nuproc/rule/…` | the synthetic demonstration graph (Turtle) |
| `/nuproc/fixture/…` (individuals of the SHACL test graphs) | the README of the test materials |
| anything else | the repository |

## Maintainer

This space is administered by **Wonbae Park**.

- GitHub: [@bonjwanim](https://github.com/bonjwanim)
