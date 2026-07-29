# w3id.org/bsdo — Battery Swap Domain Ontology

BSDO is an OWL 2 DL domain ontology for battery swap ecosystems for electric two-wheelers. It models
a battery pack as a persistent object with an identity of its own, its changing location over time,
the separation of ownership from physical custody, and the exchange of a pack as a transfer of an
object rather than a transfer of energy.

Entity IRIs are minted under `https://w3id.org/bsdo#`.

## Redirects

| Identifier | Resolves to |
|---|---|
| `https://w3id.org/bsdo` | terminology (TBox) |
| `https://w3id.org/bsdo/abox` | population (ABox) |

Both identifiers negotiate on content type: HTML for browsers, RDF/XML when requested, Turtle
otherwise. All targets are served from GitHub Pages with the correct media types (`text/turtle` and
`application/rdf+xml`).

Two rules are required rather than one: the population document declares
`owl:imports <https://w3id.org/bsdo>`, so the terminology identifier must resolve for the import to
be satisfied.

## Where the files live

- Repository: https://github.com/sidodea-IE/BSDO
- Documents: https://sidodea-ie.github.io/BSDO/
- Archived release: https://doi.org/10.5281/zenodo.21683493

## Licence

The ontology is published under Creative Commons Attribution 4.0 International (CC BY 4.0).

## Contact

Sido Dea Auvia — ORCID [0009-0006-9730-6541](https://orcid.org/0009-0006-9730-6541)
GitHub: [@sidodea-IE](https://github.com/sidodea-IE)
