# `/seqmake/` — SeqMake permanent identifiers

`https://w3id.org/seqmake/parts/` is the permanent base IRI of the **SeqMake
Parts** catalog — a knowledge base of biological DNA parts projected to RDF
(SBOL3 + Sequence Ontology + SBO). These host-independent IRIs are what the data
publishes and cites; the [`.htaccess`](.htaccess) here forwards them to the live
site (currently GitHub Pages), so the host or repo name can change without
breaking any IRI. The `seqmake/` prefix is reserved for SeqMake datasets;
`parts/…` is the first.

## Resolution

| IRI | Redirects to |
|---|---|
| `https://w3id.org/seqmake/parts/` | catalog home |
| `https://w3id.org/seqmake/parts/part/<slug>` | that part's page |
| `https://w3id.org/seqmake/parts/collection/<id>` | that collection's page |
| `https://w3id.org/seqmake/parts/ns#<term>` | `catalog.ttl` (the `cat:` vocabulary) |
| `https://w3id.org/seqmake/parts/catalog.ttl` (`.jsonld` / `.json`) | the published artifact |

All redirects are `302` — the target host may change while the IRIs stay fixed.

## Contact

This space is administered by:

David Bikard
GitHub username: [dbikard](https://github.com/dbikard)
Source / maintenance: <https://github.com/dbikard/seqmake-parts> (`w3id/` directory)
