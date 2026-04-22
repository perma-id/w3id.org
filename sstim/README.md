# sstim — Sensory Stimulation Ontology

Persistent identifier (PID) home for the **SSTIM** (Sensory Stimulation)
ontology, developed and maintained as part of the open-source
[**BSC Lab**](https://github.com/laBioSynCare/laBioSynCare.github.io)
project.

- **Base PID:** <https://w3id.org/sstim>
- **Target (GitHub Pages):** <https://labiosyncare.github.io/ontology/>
- **Maintainer:** Renato Fabbri — `renato.fabbri@gmail.com` —
  ORCID [0000-0002-9699-629X](https://orcid.org/0000-0002-9699-629X)

SSTIM is an OWL ontology with a companion SKOS vocabulary and SHACL
validation shapes, describing stimulation protocols (auditory,
visual, haptic), their parameters (frequency bands, voice types,
breathing models), evidence chains, and session instances. It is
designed to be reusable by any sensory-stimulation research or
application project — not specific to BSC Lab or BioSynCare.

## Resolvable resources

| PID                                   | Content                                           | Format |
|---------------------------------------|---------------------------------------------------|--------|
| `https://w3id.org/sstim`              | Core ontology — OWL classes and properties        | Turtle |
| `https://w3id.org/sstim/vocab`        | SKOS vocabulary — frequency bands, groups, tiers  | Turtle |
| `https://w3id.org/sstim/shapes`       | SHACL validation shapes                           | Turtle |
| `https://w3id.org/sstim/alignments`   | External alignments (BFO, OBI, IAO, Wikidata, …)  | Turtle |

Fragment IRIs such as `https://w3id.org/sstim#Preset` or
`https://w3id.org/sstim/vocab#alpha` resolve to the same base
document; the fragment is resolved client-side by the RDF tool.

## Content negotiation

The `.htaccess` dispatches on the `Accept` header:

| `Accept` header                      | Response                                           |
|--------------------------------------|----------------------------------------------------|
| `text/turtle` (and unspecified)      | The corresponding `.ttl` file                      |
| `text/html`, `application/xhtml+xml` | BSC Lab landing page (<https://labiosyncare.github.io/>) |

**Planned (Phase 1):** HTML requests will redirect to WIDOCO-generated
ontology documentation, which will allow anchor navigation to
individual terms.

## Project

- **Source repository:** <https://github.com/laBioSynCare/laBioSynCare.github.io>
  (open-source — ontology and documentation under CC BY 4.0; application
  code under a permissive OSI-approved license, both being finalized in Phase 1)
- **Scope:** BSC Lab is the open scientific infrastructure for sensory
  stimulation: ontology, evidence framework, and a planned multi-engine
  audiovisual stimulation application (Web Audio, AudioWorklets, PixiJS).
  The SSTIM ontology is designed to be reusable beyond BSC Lab by any
  project in this domain.
- **Related commercial project:** BioSynCare (React Native app, separate
  closed-source repository) will consume BSC Lab's exported preset catalog
  as JSON; it does not use or import the ontology namespace directly.

## Contact

- PID redirection issues → open an issue at
  <https://github.com/laBioSynCare/laBioSynCare.github.io/issues>
- Upstream `w3id.org` configuration issues →
  <https://github.com/perma-id/w3id.org/issues>
