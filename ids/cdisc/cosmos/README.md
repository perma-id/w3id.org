# /cdisc/cosmos/

Permanent identifiers for a draft RDF/OWL rendering of CDISC COSMoS
(Biomedical Concepts and SDTM Dataset Specializations) and an authored
overlay of qualified biomedical concepts.

## What this is

`https://w3id.org/cdisc/cosmos/` is the namespace for
[kerfors/cosmos-rdf](https://github.com/kerfors/cosmos-rdf): a mechanical
conversion of the two COSMoS LinkML models and two CSV exports published
in [cdisc-org/COSMoS](https://github.com/cdisc-org/COSMoS) to OWL, JSON-LD
contexts, SHACL shapes and an instance graph, pinned to one upstream
commit SHA, plus an overlay graph that qualifies published concepts by
scale, specimen and result type and links back to them with `skos:broader`.

The namespace names the ontologies, their instance graphs and their
releases, and the IRIs the repository mints under them. The class and
property IRIs of the core rendering are the ones CDISC published
(`https://www.cdisc.org/cosmos/...`) and are not served here.

Segments: `bc/` (BC ontology), `bc/instances/` (BC instance graph),
`sdtm/` (SDTM ontology), `qbc/` (overlay ontology), `qbc/instances/`
(overlay instance graph). `dss/` is reserved and not yet registered: the
Dataset Specialization instance graph is deferred, and the IRIs already
minted under it are stable identity that will resolve when that layer
lands.

The redirect targets are the repository's GitHub Pages site, rebuilt
from every release tag; the pinned release is `v0.3.0`. Every IRI
resolves to the graph that describes it — a term to the ontology, an
individual to the instance graph — with content negotiation over Turtle,
N-Triples, RDF/XML and JSON-LD; version IRIs resolve to their own
release through one generic rule per graph.

## Status

Draft. Not a normative CDISC artifact. The repository maintains the
artifacts and the notebook pipeline that regenerates them from the pinned
source; CDISC has not yet been formally engaged on adoption.

## CDISC governance handoff

This permanent identifier is offered for transfer to CDISC governance.
The transfer mechanism is the redirect, not the artifact: at any point,
CDISC can take over by hosting the graphs under their own infrastructure
and submitting a PR to this `.htaccess` to change the redirect targets.
No minted IRI changes; no consumer of the namespace needs to refetch.

Design rationale and the handoff plan are in
[docs/iri-and-governance.md](https://github.com/kerfors/cosmos-rdf/blob/main/docs/iri-and-governance.md).

## Contact

- Kerstin Forsberg
- kerstin.l.forsberg@gmail.com
- GitHub username: kerfors
