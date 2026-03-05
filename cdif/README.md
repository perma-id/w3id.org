# /cdif

Redirect home for Cross-Domain Interoperability Framework identifier redirects.

[`https://w3id.org/cdif`](https://w3id.org/cdif/) redirects to [`https://cdif.codata.org/`](https://cdif.codata.org/).

## Building Block Identifiers

CDIF metadata building blocks have persistent identifiers under `https://w3id.org/cdif/bbr/metadata/`. Each building block maps to the OGC Building Blocks identifier `cdif.bbr.metadata.{category}.{name}`.

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

`schemaorgProperties`, `cdifProperties`, `adaProperties`, `provProperties`, `qualityProperties`, `ddiProperties`, `xasProperties`, `DDEproperties`, `ecrrProperties`

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
