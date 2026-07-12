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
| `/sstim/void`              | VoID + DCAT dataset description (Turtle only)    |
| `/sstim/{major.minor.patch}` | Versioned immutable snapshots (Turtle only)    |

Content negotiation on each route: Turtle (default), JSON-LD
(`application/ld+json`), RDF/XML (`application/rdf+xml`); HTML requests
redirect to the project landing page. Fragment IRIs such as
`/sstim#Preset` resolve to the base document.

Redirect issues: open an issue at
<https://github.com/laBioSynCare/laBioSynCare.github.io/issues>.
