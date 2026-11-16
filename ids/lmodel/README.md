# /lmodel/

Perma-id service for https://github.com/lmodel

# Layouts

Repositories publish LinkML either at the repository root (`src/<stem>/schema/`,
`project/`) or, for forks of upstream projects, in a `.linkml/` sidecar directory
(`.linkml/src/<stem>/schema/`, `.linkml/project/`). The sidecar layout is matched
per repository in `.htaccess` with `E=SIDECAR:.linkml/`, as as a convention.

# Endpoints

Repositories using linkml gen-project/copier generate a core set of outputs, and
`<repo>/<file>` redirects (303) to them: schema (`.yaml`, `schema/<module>`),
merged schema (`.merged.linkml.yaml`), OWL (`.owl.ttl`), RDF Turtle (`.ttl`),
JSON-LD and its context, JSON Schema, SHACL, ShEx, GraphQL, Protobuf, SQL DDL and
the prefix map. Excel, Java, TypeScript and the Python data model
(`<stem>_pydantic.py`, `<stem>.py`) redirect with 302. A bare `<repo>` or term IRI
negotiates by `Accept` among Turtle, JSON-LD, JSON Schema, SHACL, ShEx, YAML and
HTML (the generated docs).

Other LinkML generators (CSV, DBML, Go, Rust, SPARQL, SSSOM, etc) have 302 routes
also. Those that generate outputs are served without a change.

# Knowledge bundles

A repository with a LOKF knowledge bundle has `https://w3id.org/lmodel/<repo>/knowledge/`
and publishes its site at `https://lmodel.github.io/<repo>/knowledge/`. A concept's IRI
resolves to its page, its JSON-LD or its Markdown by the `Accept` header.

`schema-sidecar` holds Agent Skills rather than a schema, so everything under
`https://w3id.org/lmodel/schema-sidecar/` other than its bundle goes to its site.

# Testing

[https://github.com/lmodel/w3id_smoke_test](https://github.com/lmodel/w3id_smoke_test)

## Maintainer

Noel McLoughlin (noel.mcloughlin AT gmail.com)
https://github.com/noelmcloughlin

