# sstim — Sensory Stimulation Ontology

Persistent identifiers for **SSTIM**, an OWL ontology with a companion
SKOS vocabulary and SHACL validation shapes describing sensory
stimulation protocols (auditory, visual, haptic), their parameters, and
evidence chains. Developed in the open-source
[BSC Lab](https://github.com/laBioSynCare/laBioSynCare.github.io) project.

- **Base PID:** <https://w3id.org/sstim>
- **Target:** <https://labiosyncare.github.io/ontology/>

## Maintainer

**Renato Fabbri** — GitHub [@ttm](https://github.com/ttm) —
renato.fabbri@gmail.com —
ORCID [0000-0002-9699-629X](https://orcid.org/0000-0002-9699-629X)

Future PRs touching `sstim/` will be authored or approved by
[@ttm](https://github.com/ttm).

## Routes

| PID                        | Content                                          |
|----------------------------|--------------------------------------------------|
| `/sstim`                   | Core OWL ontology                                |
| `/sstim/vocab`             | SKOS vocabulary                                  |
| `/sstim/shapes`            | SHACL validation shapes                          |
| `/sstim/alignments`        | External alignments (BFO, OBI, IAO, Wikidata, …) |
| `/sstim/patch-studio`      | Patch Studio authoring-model vocabulary          |
| `/sstim/exposure`          | Exposure, delivery, and modality vocabulary      |
| `/sstim/ecosystem`         | Ecosystem relationships and consent lifecycle    |
| `/sstim/framework/bsc`     | BSC framework catalog record                     |
| `/sstim/implementation/bsclab` | BSC Lab implementation catalog record        |
| `/sstim/implementation/biosyncare` | BioSynCare application catalog record    |
| `/sstim/implementation/bsclab/component/patch-studio` | Patch Studio software-component catalog record |
| `/sstim/specialist/{id}` and `/sstim/organization/{id}` namespaces (`synthetic-*` excluded) | Mutable live-only ecosystem projection |
| `/sstim/ecosystem-record/{relationship,activity,role}/{id}` namespaces (`synthetic-*` excluded) | Mutable live-only ecosystem projection |
| `/sstim/void`              | VoID + DCAT dataset description (Turtle only)    |
| `/sstim/{major.minor.patch}` | Versioned immutable snapshots (Turtle only)    |

The base and ontology-module routes negotiate Turtle (default), JSON-LD
(`application/ld+json`), and RDF/XML (`application/rdf+xml`); HTML requests
redirect to the project landing page. VoID, versioned snapshots, and the
instance routes below are Turtle resources. Fragment IRIs such as
`/sstim#Preset` resolve to the base document.

Audited static catalog routes send RDF clients to the owning Turtle instance
file. General live ecosystem namespace rules send RDF clients to the mutable,
live-only `current.ttl` projection. Current synthetic contract subjects reserve
a `synthetic-*` slug rejected by those rules and are available only through the
direct fixture artifact; there are no fixture-specific routes. The frozen
SSTIM 0.7.0 snapshot remains unchanged. HTML requests reach the project landing
page for static catalog and live ecosystem identifiers.

Dataset membership belongs to the live RDF projection, not the registry
configuration. Adding, correcting, or retracting a record therefore does not
require a person-specific w3id.org rule change. A syntactically valid but
unknown path may reach the aggregate, but it describes no resource unless the
requested IRI occurs as a subject in the current projection. Retraction removes
that subject and its approved public statements; it cannot erase third-party
caches or previously downloaded copies. The mutable projection is not part of
a Zenodo ontology snapshot and carries no archival-consent implication.

Redirect issues: open an issue at
<https://github.com/laBioSynCare/laBioSynCare.github.io/issues>.
