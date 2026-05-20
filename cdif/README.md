# /cdif

Redirect home for Cross-Domain Interoperability Framework identifier redirects.

[`https://w3id.org/cdif`](https://w3id.org/cdif/) redirects to [`https://cdif.codata.org/`](https://cdif.codata.org/).

## Conformance URIs

CDIF specification components have persistent conformance URIs that metadata records declare in `dcterms:conformsTo`:

| URI | Specification Component |
|-----|------------------------|
| `https://w3id.org/cdif/core/1.0/` | CDIF Core (mandatory properties) |
| `https://w3id.org/cdif/discovery/1.0/` | CDIF Discovery (optional properties) |
| `https://w3id.org/cdif/data_description/1.0/` | CDIF Data Description |
| `https://w3id.org/cdif/manifest/1.0/` | CDIF Manifest (archive distribution) |
| `https://w3id.org/cdif/provenance/1.0/` | CDIF Provenance |
| `https://w3id.org/cdif/xasDiscovery/1.0/` | CDIF XAS Discovery |
| `https://w3id.org/cdif/xasCore/1.0/` | CDIF XAS Core |

Each conformance URI supports the same content negotiation as building block identifiers (see below). The default (browser) redirect goes to the corresponding building block landing page.

```bash
# Landing page (browser default)
curl -L https://w3id.org/cdif/core/1.0/

# JSON Schema
curl -L -H "Accept: application/schema+json" https://w3id.org/cdif/core/1.0/

# YAML Schema
curl -L -H "Accept: application/yaml" https://w3id.org/cdif/core/1.0/

# SHACL rules
curl -L -H "Accept: text/turtle" https://w3id.org/cdif/core/1.0/

# JSON-LD context
curl -L -H "Accept: application/ld+json" https://w3id.org/cdif/core/1.0/
```

## Building Block Identifiers

CDIF metadata building blocks have persistent identifiers under `https://w3id.org/cdif/bbr/metadata/`. Building blocks are hosted across multiple repositories:

| Category | Repository | Identifier Prefix |
|----------|-----------|-------------------|
| `schemaorgProperties`, `cdifProperties`, `provProperties`, `qualityProperties`, `ddiProperties`, `xasProperties` | [metadataBuildingBlocks](https://github.com/Cross-Domain-Interoperability-Framework/metadataBuildingBlocks) | `cdif.bbr.metadata.` |
| `adaProperties`, `adaProfiles` | [geochemBuildingBlocks](https://github.com/usgin/geochemBuildingBlocks) | `ada.bbr.metadata.` |
| `DDEproperties`, `DDEProfiles` | [ddeBuildingBlocks](https://github.com/usgin/ddeBuildingBlocks) | `dde.bbr.metadata.` |
| `ecrrProperties`, `ecrrProfiles` | [ecrrBuildingBlocks](https://github.com/usgin/ecrrBuildingBlocks) | `ecrr.bbr.metadata.` |

All share the same URI pattern `https://w3id.org/cdif/bbr/metadata/{category}/{name}` but redirect to different GitHub Pages hosts based on the category.

### Content negotiation on the BB URI

A single URI like `https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person` serves different representations depending on the `Accept` header:

| Accept header | MIME type | Returns |
|---------------|-----------|---------|
| `text/html` | — | Landing page (HTML viewer) |
| `application/schema+json` | JSON Schema | Schema (JSON) |
| `application/yaml; profile="https://json-schema.org/draft/2020-12/schema"` | JSON Schema in YAML | Schema (YAML) |
| `application/yaml` | (fallback) | Schema (YAML) |
| `text/turtle; profile="http://www.w3.org/ns/shacl#"` | SHACL shapes | SHACL validation rules |
| `text/turtle` | (fallback) | SHACL validation rules |
| `application/ld+json; profile="http://www.w3.org/ns/json-ld#context"` | JSON-LD context | JSON-LD context |
| `application/ld+json` | (fallback) | JSON-LD context |
| `application/json` | JSON | Full JSON documentation |

### Explicit sub-path resources

These always resolve to the named resource regardless of `Accept` header:

| URL | Description |
|-----|-------------|
| `https://w3id.org/cdif/bbr/metadata` | Building block register (viewer home) |
| `https://w3id.org/cdif/bbr/metadata/{category}/{name}` | Content-negotiated (see above) |
| `https://w3id.org/cdif/bbr/metadata/{category}/{name}/schema` | JSON Schema (YAML default; JSON via `Accept: application/json`) |
| `https://w3id.org/cdif/bbr/metadata/{category}/{name}/resolved` | Resolved schema (all `$ref` inlined, JSON) |
| `https://w3id.org/cdif/bbr/metadata/{category}/{name}/shacl` | SHACL validation rules (Turtle) |
| `https://w3id.org/cdif/bbr/metadata/{category}/{name}/context` | JSON-LD context |

### Categories

Core: `schemaorgProperties`, `cdifProperties`, `provProperties`, `qualityProperties`, `ddiProperties`, `xasProperties`

Domain-specific (separate repos): `adaProperties`, `DDEproperties`, `ecrrProperties`

Profiles: `cdifProfiles`, `adaProfiles`, `DDEProfiles`, `ecrrProfiles`

### Examples

Content negotiation on the BB URI:
```bash
# Landing page (browser default)
curl -L -H "Accept: text/html" https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person

# JSON Schema (JSON format)
curl -L -H "Accept: application/schema+json" https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person

# JSON Schema (YAML format, with profile)
curl -L -H 'Accept: application/yaml; profile="https://json-schema.org/draft/2020-12/schema"' \
  https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person

# SHACL rules (with profile)
curl -L -H 'Accept: text/turtle; profile="http://www.w3.org/ns/shacl#"' \
  https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person

# JSON-LD context (with profile)
curl -L -H 'Accept: application/ld+json; profile="http://www.w3.org/ns/json-ld#context"' \
  https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person
```

Explicit sub-paths:
```bash
curl -L https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person/schema
curl -L https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person/resolved
curl -L https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person/shacl
curl -L https://w3id.org/cdif/bbr/metadata/schemaorgProperties/person/context
```

All redirects use HTTP 303 (See Other).

## Contacts:

- simon@codata.org

- Stephen Richard smrtucson  gmail.com ORCID:0000-0001-6041-5302

### GitHub:
[CDIF github](https://github.com/Cross-Domain-Interoperability-Framework)
