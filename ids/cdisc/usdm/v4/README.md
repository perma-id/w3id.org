# /cdisc/usdm/v4/

Permanent identifier for a draft Turtle (RDF/OWL) rendering of CDISC USDM v4.

## What this is

`https://w3id.org/cdisc/usdm/v4#` is the namespace for a mechanical
conversion of CDISC USDM v4 (the data model published in
[cdisc-org/DDF-RA](https://github.com/cdisc-org/DDF-RA)) to Turtle
RDF/OWL. The conversion is automated from `dataStructure.yml` and
`USDM_CT.xlsx` and is re-runnable per DDF-RA release tag.

The current redirect target is the `usdm_v4.ttl` artifact at the
`v0.2.0` tag of [kerfors/usdm-rdf](https://github.com/kerfors/usdm-rdf).

## Status

Draft. Not a normative CDISC artifact. The repository
[kerfors/usdm-rdf](https://github.com/kerfors/usdm-rdf) maintains the
artifact and the conversion pipeline; CDISC has not yet been formally
engaged on adoption.

## CDISC governance handoff

This permanent identifier is offered for transfer to CDISC governance.
The transfer mechanism is the redirect, not the artifact: at any
point, CDISC can take over by hosting `usdm_v4.ttl` (and any related
artifacts) under their own infrastructure and submitting a PR to this
`.htaccess` to change the redirect target. No minted IRI changes; no
consumer of the namespace needs to refetch.

Design rationale and the handoff plan are in
[docs/iri-and-governance.md](https://github.com/kerfors/usdm-rdf/blob/main/docs/iri-and-governance.md).

## Contact

- Kerstin Forsberg
- kerstin.l.forsberg@gmail.com
- GitHub username: kerfors
