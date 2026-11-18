# /cdif

Persistent URI namespace for the [Cross-Domain Interoperability Framework](https://cdif.codata.org/).
[`https://w3id.org/cdif`](https://w3id.org/cdif/) redirects to [`https://cdif.codata.org/`](https://cdif.codata.org/).

**Contacts:**
* simon@codata.org
* Stephen Richard smrtucson  gmail.com - GitHub: [@smrgeoinfo](https://github.com/smrgeoinfo), ORCID:0000-0001-6041-5302

GitHub organisation: [Cross-Domain-Interoperability-Framework](https://github.com/Cross-Domain-Interoperability-Framework)

## Conformance URIs

CDIF specification components have persistent conformance URIs that metadata records declare in
`dcterms:conformsTo`:

| URI | Specification component |
|-----|------------------------|
| `https://w3id.org/cdif/core/1.1/` | CDIF Core (mandatory properties) |
| `https://w3id.org/cdif/discovery/1.1/` | CDIF Discovery (optional properties) |
| `https://w3id.org/cdif/data_description/1.1/` | CDIF Data Description |
| `https://w3id.org/cdif/data_structure/1.1/` | CDIF Data Structure |
| `https://w3id.org/cdif/manifest/1.1/` | CDIF Manifest (archive distribution) |
| `https://w3id.org/cdif/provenance/1.1/` | CDIF Provenance |
| `https://w3id.org/cdif/conceptscheme/1.1/` | CDIF Concept Scheme |
| `https://w3id.org/cdif/codelist/1.1/` | CDIF Codelist |
| `https://w3id.org/cdif/niaid/1.0/` | CDIF NIAID (NIAID Data Discovery Portal records) |
| `https://w3id.org/cdif/xasCore/1.0/` | CDIF XAS Core (mandatory tier) |
| `https://w3id.org/cdif/xasOptional/1.0/` | CDIF XAS Optional (optional tier) |
| `https://w3id.org/cdif/dde/1.0/{profileName}` | DDE domain profiles (Deep-time Digital Earth), 11 of them |

Versioned conformance URIs redirect with HTTP 303. Unversioned aliases use 302 because their
target moves with each release, so an unversioned URI must never appear in `dcterms:conformsTo`.

DDE is the first domain naming a **set** of profiles rather than one component, so its URIs carry
the version in the middle and the register item name verbatim as `{profileName}` -- `DDEDataset`,
`DDECollection`, `DDEImage` and eight more. A record declares its profile alongside the CDIF
components it builds on, each a separate `dcterms:conformsTo` entry. These resolve into the
[ddeBuildingBlocks](https://github.com/usgin/ddeBuildingBlocks) register, with sub-paths `schema`,
`resolved`, `shacl` and `context`; `1.0` tracks that register's `main` branch until DDE adopts
release tags.

## Building block identifiers

CDIF metadata building blocks have persistent identifiers under `https://w3id.org/cdif/bbr/metadata/`:

| URI | For |
|-----|-----|
| `https://w3id.org/cdif/bbr/metadata` | register viewer home |
| `https://w3id.org/cdif/bbr/metadata/{category}/{name}` | a property block |
| `https://w3id.org/cdif/bbr/metadata/profiles/{family}/{name}` | a profile |

Domain categories and profile families redirect to their own registers --
`adaProperties` and `profiles/adaProfiles` to
[geochemBuildingBlocks](https://github.com/usgin/geochemBuildingBlocks), `DDEproperties` and
`profiles/DDEProfiles` to [ddeBuildingBlocks](https://github.com/usgin/ddeBuildingBlocks),
`ecrrProperties` and `profiles/ecrrProfiles` to
[ecrrBuildingBlocks](https://github.com/usgin/ecrrBuildingBlocks). Everything else falls through
to [metadataBuildingBlocks](https://github.com/Cross-Domain-Interoperability-Framework/metadataBuildingBlocks),
which holds `schemaorgProperties`, `cdifProperties`, `provProperties`, `qualityProperties`,
`xasProperties` and the rest.

A building block URI and a conformance URI both serve several representations by content
negotiation, defaulting to the HTML landing page for browsers:

| Accept header | Returns |
|---------------|---------|
| `text/html` | landing page |
| `application/schema+json` | JSON Schema (JSON) |
| `application/yaml` | JSON Schema (YAML) |
| `text/turtle` | SHACL validation rules |
| `application/ld+json` | JSON-LD context |
| `application/json` | full JSON documentation |

Each also accepts a `profile` parameter, for example
`Accept: text/turtle; profile="http://www.w3.org/ns/shacl#"`.

Appending `/schema`, `/resolved`, `/shacl` or `/context` returns that resource regardless of the
`Accept` header, and `https://w3id.org/cdif/bbr/metadata` is the register viewer home.

```bash
# landing page (browser default)
curl -L https://w3id.org/cdif/core/1.1/

# JSON Schema, then SHACL, by content negotiation
curl -L -H "Accept: application/schema+json" https://w3id.org/cdif/core/1.1/
curl -L -H "Accept: text/turtle" https://w3id.org/cdif/core/1.1/

# the same for a building block, and by explicit sub-path
curl -L -H "Accept: application/schema+json" https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person
curl -L https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person/shacl
```

## Versioning

**A versioned conformance URI must keep resolving to the version it names.** Rules for a current
version point at GitHub Pages, which serves each release repo's newest release, so when a newer
minor version ships the outgoing version must be repointed to its release tag on
`raw.githubusercontent.com`. Miss that and the URI quietly serves the wrong spec, with no error
anywhere. The policy, the checklist for cutting a version, and the weekly automated check are in
[CDIF/validation `docs/w3id-redirect-policy.md`](https://github.com/Cross-Domain-Interoperability-Framework/validation/blob/main/docs/w3id-redirect-policy.md).
