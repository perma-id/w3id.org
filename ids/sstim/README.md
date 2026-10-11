# sstim — Sensory Stimulation Ontology

Persistent identifiers for **SSTIM**, an OWL ontology with a companion
SKOS vocabulary and SHACL validation shapes describing sensory
stimulation protocols (auditory, visual, haptic), their parameters, and
evidence chains. Developed through the
[W3C Sensory Stimulation Vocabulary Community Group](https://www.w3.org/groups/cg/sstim/)
in the open-source [SSTIM](https://github.com/w3c-cg/sstim) repository, and
previously published from the BSC Lab project.

- **Base PID:** <https://w3id.org/sstim>
- **Target:** <https://w3c-cg.github.io/sstim/ontology/>
- **Exception:** the frozen release manifests for 0.13.0 through 0.16.0 keep a
  target at <https://labiosyncare.github.io/ontology/>. Those four files state
  root-absolute paths and are immutable, so under a path-mounted deployment
  their own references would escape the mount and 404. Both origins serve the
  same tree and both remain published.

## Maintainer

**Renato Fabbri** — GitHub [@ttm](https://github.com/ttm) —
renato.fabbri@gmail.com —
ORCID [0000-0002-9699-629X](https://orcid.org/0000-0002-9699-629X)

Future PRs touching `sstim/` will be authored or approved by
[@ttm](https://github.com/ttm).

## Routes

Every unversioned route answers machines with the latest SSTIM release; the
development line has no persistent identifier. `/sstim/{major.minor.patch}`
pins one release. There are two exceptions. The BSC framework's vocabulary and
shapes are not part of SSTIM, so they are served from the framework's own
directory. The JSON-LD context serves the live context: terms are deprecated,
never deleted, so it only grows, and a document written against any release
still compacts and expands as it did.

| PID | Content |
|---|---|
| `/sstim` | Generated namespace catalogue for `sstim:` hash terms |
| `/sstim/kernel` | Exact dependency-free kernel distribution |
| `/sstim/profile/{kernel,core,core-plus,full}` | Conformance profile entry points, with W3C PROF metadata |
| `/sstim/manifest` | Machine-readable bill of materials (JSON) |
| `/sstim/manifest-schema/1` | JSON Schema for the manifest |
| `/sstim/{stimulus,common,technique,configuration,session,evidence,neuromodulation}` | Semantic concern modules |
| `/sstim/{neuromodulation-evidence,evidence-exposure,technique-exposure}` | Cross-concern bridge modules |
| `/sstim/{core-shapes,shapes}` | SHACL validation packages |
| `/sstim/vocab` | SKOS vocabulary |
| `/sstim/alignments` | External alignments (Wikidata and others) |
| `/sstim/patch-studio` | Patch Studio authoring-model vocabulary |
| `/sstim/exposure` | Generated namespace catalogue for `sstim/exposure:` hash terms |
| `/sstim/module/exposure` | Exact exposure module distribution |
| `/sstim/ecosystem` | Ecosystem relationships and consent lifecycle |
| `/sstim/framework/bsc` | BSC framework catalog record |
| `/sstim/framework/bsc/vocab` | The BSC framework's own vocabulary, not part of SSTIM (Turtle; browsers open the knowledge browser) |
| `/sstim/framework/bsc/shapes` | The BSC framework's SHACL shapes (Turtle only) |
| `/sstim/implementation/bsclab` | BSC Lab implementation catalog record |
| `/sstim/implementation/biosyncare` | BioSynCare application catalog record |
| `/sstim/implementation/bsclab/component/patch-studio` | Patch Studio software-component catalog record |
| `/sstim/specialist/{id}` and `/sstim/organization/{id}` namespaces (`synthetic-*` excluded) | Mutable live-only ecosystem projection |
| `/sstim/ecosystem-record/{relationship,activity,role}/{id}` namespaces (`synthetic-*` excluded) | Mutable live-only ecosystem projection |
| `/sstim/void` | VoID + DCAT dataset description (Turtle only) |
| `/sstim/context.jsonld` | SSTIM's JSON-LD context (the live one) |
| `/sstim/{major.minor.patch}` and `/sstim/{major.minor.patch}/{file.ttl}` | Versioned immutable snapshots; the version IRI negotiates, and its files are Turtle |
| `/sstim/{major.minor.patch}/manifest` and `/{major.minor.patch}/manifest.schema.json` | Frozen manifest and schema, where a release has them |

The namespace, kernel, module, and profile routes negotiate Turtle, JSON-LD
(`application/ld+json`) and RDF/XML (`application/rdf+xml`), and send HTML
requests to project documentation. mod_rewrite cannot rank by `q`, so the order
is fixed: Turtle when the client names it (`text/turtle` or
`application/x-turtle`), even among other types, then JSON-LD, RDF/XML and
HTML, and Turtle again for `*/*` or no `Accept`. A request whose `Accept`
header allows none of these receives `406`. A version IRI negotiates the same
way, with a release page for browsers, but never answers `406`: anything else
gets the Turtle it always got. The rules set `Vary: Accept`, but w3id.org
does not emit it on redirects; these `303` responses carry no caching headers,
so a conformant shared cache does not store them. The manifest and
schema are JSON; VoID, versioned snapshots, and the instance routes below are
Turtle resources.

`/sstim` and `/sstim/exposure` are namespace catalogues rather than single
files, because the terms in those two hash namespaces are spread across several
modules. That is what keeps `/sstim#Preset` and
`/sstim/exposure#StimulusChannel` resolving to their definitions. Consumers
wanting one exact module use `/sstim/kernel` or `/sstim/module/exposure`, and
consumers wanting a defined subset use a `/sstim/profile/` entry point.

Snapshot routes match any version-shaped path by pattern, so a new release
needs no change here. A version or file that was never published redirects and
then answers 404 at the target.

Audited static catalog routes send RDF clients to the owning Turtle instance
file. General live ecosystem namespace rules send RDF clients to the mutable,
live-only `current.ttl` projection. Current synthetic contract subjects reserve
a `synthetic-*` slug rejected by those rules and are available only through the
direct fixture artifact; there are no fixture-specific routes. Previously
published frozen snapshots remain unchanged. HTML requests reach the project
landing page for static catalog and live ecosystem identifiers.

The BSC vocabulary reuses the local names of the SSTIM terms it replaced, so
its HTML route passes the namespace as `?ns=bsc-v`. The browser re-attaches the
term's fragment, and the knowledge browser selects the BSC term rather than the
SSTIM one.

Dataset membership belongs to the live RDF projection, not the registry
configuration. Adding, correcting, or retracting a record therefore does not
require a person-specific w3id.org rule change. A syntactically valid but
unknown path may reach the aggregate, but it describes no resource unless the
requested IRI occurs as a subject in the current projection. Retraction removes
that subject and its approved public statements; it cannot erase third-party
caches or previously downloaded copies. The mutable projection is not part of
a Zenodo ontology snapshot and carries no archival-consent implication.

Redirect issues: open an issue at
<https://github.com/w3c-cg/sstim/issues>.
