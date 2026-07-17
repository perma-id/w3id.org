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
| `/sstim/specialist/synthetic-alex-rivera` | Synthetic ecosystem person fixture |
| `/sstim/organization/synthetic-aurora-lab` | Synthetic ecosystem organization fixture |
| `/sstim/organization/synthetic-resonance-coop` | Synthetic ecosystem organization fixture |
| Six exact `/sstim/ecosystem-record/relationship/{id}` routes | Synthetic qualified relationships |
| Fourteen exact `/sstim/ecosystem-record/activity/{id}` routes | Synthetic engagement activities |
| Exact reviewed `/sstim/specialist`, `/organization`, and `/ecosystem-record/{relationship,activity,role}` routes | Mutable live-only ecosystem projection |
| `/sstim/void`              | VoID + DCAT dataset description (Turtle only)    |
| `/sstim/{major.minor.patch}` | Versioned immutable snapshots (Turtle only)    |

The base and ontology-module routes negotiate Turtle (default), JSON-LD
(`application/ld+json`), and RDF/XML (`application/rdf+xml`); HTML requests
redirect to the project landing page. VoID, versioned snapshots, and the
instance routes below are Turtle resources. Fragment IRIs such as
`/sstim#Preset` resolve to the base document.

Audited static catalog routes send RDF clients to the owning Turtle instance
file. Synthetic ecosystem routes remain isolated in the fixture graph. Exact
reviewed real-subject routes instead send RDF clients to the mutable,
live-only `current.ttl` projection; they never reuse the synthetic graph. HTML
requests reach the project landing page in all three cases.

Real-subject paths are identifying configuration metadata recorded in Git and
registry review history. Removing a live record therefore requires removing
its active rules, but cannot erase historical path traces, third-party caches,
or previously downloaded copies. The mutable projection is not part of a
Zenodo ontology snapshot and carries no archival-consent implication.

Redirect issues: open an issue at
<https://github.com/laBioSynCare/laBioSynCare.github.io/issues>.
