# OSO namespace at w3id.org

This subpath provides persistent identifiers and content negotiation
for the Observatories of the Seas Ontology (OSO) and related metadata artifacts.

## Maintainer

Steven Piel / @spiel-ifremer  
https://github.com/spiel-ifremer

## Scope

- `/earthsemantics/OSO`
- `/earthsemantics/OSO/void`
- `/earthsemantics/OSO/dcat`
- `/earthsemantics/OSO/sparql`
- `/earthsemantics/OSO/ui`
- `/earthsemantics/OSO/<version>/ontology`
- `/earthsemantics/OSO/<version>/instances`
- `/earthsemantics/OSO/<version>/complete`
- `/earthsemantics/OSO/<version>/shacl`
- `/earthsemantics/OSO/<version>/void`
- `/earthsemantics/OSO/<version>/dcat`

## Features

- Persistent ontology IRIs
- Versioned IRIs for every release (1.0.0 onwards), resolved by generic rules
- RDF content negotiation (303 for explicit, 302 for O'FAIRe compatibility)
- Multiple RDF serializations (Turtle, RDF/XML, JSON-LD, JSON, N-Triples, N3, TriG)
- Distribution paths: ontology (TBox), instances (ABox), complete (TBox+ABox)
- Metadata artifacts: VoID, DCAT, SHACL for every version
- SPARQL endpoint access
- Content-Type headers on 302 redirects for O'FAIRe compliance

## Supported serializations

- Turtle (`text/turtle`)
- RDF/XML (`application/rdf+xml`)
- JSON-LD (`application/ld+json`)
- JSON (`application/json`)
- N-Triples (`application/n-triples`)
- N3 (`text/n3`)
- TriG (`application/trig`)

## Recommended OSO URLs

Main persistent ontology IRI (latest release deployed on Virtuoso):

- https://w3id.org/earthsemantics/OSO

Human-readable documentation:

- https://w3id.org/earthsemantics/OSO/

Explicit RDF serializations:

- https://w3id.org/earthsemantics/OSO/OSO.ttl
- https://w3id.org/earthsemantics/OSO/OSO.owl
- https://w3id.org/earthsemantics/OSO/OSO.jsonld
- https://w3id.org/earthsemantics/OSO/OSO.json
- https://w3id.org/earthsemantics/OSO/OSO.nt
- https://w3id.org/earthsemantics/OSO/OSO.n3
- https://w3id.org/earthsemantics/OSO/OSO.trig

Metadata artifacts (latest version):

- https://w3id.org/earthsemantics/OSO/void
- https://w3id.org/earthsemantics/OSO/dcat

SPARQL endpoint:

- https://w3id.org/earthsemantics/OSO/sparql

Virtuoso interface:

- https://w3id.org/earthsemantics/OSO/ui

## Versioned URLs

Every published release is available as
`https://w3id.org/earthsemantics/OSO/<version>`, for example
https://w3id.org/earthsemantics/OSO/1.2.2. The list of releases is
https://github.com/emso-eric/oso-ontology/releases.

The rules are generic: a new release resolves as soon as it is deployed on
Virtuoso, without changing this directory. Only the legacy versions without a
separate TBox/ABox (1.0.0, 1.0.1, 1.0.3, 1.0.4, 1.0.5, 1.1.0) are listed
explicitly; they are served from their complete `OSO.ttl`.

### Versioned distribution paths

For each version, the following sub-paths are available:

- `/<version>/ontology` — TBox (ontology model)
- `/<version>/instances` — ABox (instance data)
- `/<version>/complete` — complete graph (TBox + ABox) with full content negotiation
- `/<version>/shacl` — SHACL validation profile
- `/<version>/void` — VoID metadata description
- `/<version>/dcat` — DCAT catalog description

Example:

- https://w3id.org/earthsemantics/OSO/1.2.2/ontology
- https://w3id.org/earthsemantics/OSO/1.2.2/instances
- https://w3id.org/earthsemantics/OSO/1.2.2/complete
- https://w3id.org/earthsemantics/OSO/1.2.2/shacl
- https://w3id.org/earthsemantics/OSO/1.2.2/void
- https://w3id.org/earthsemantics/OSO/1.2.2/dcat

### Explicit versioned serializations

- https://w3id.org/earthsemantics/OSO/1.2.2.ttl
- https://w3id.org/earthsemantics/OSO/1.2.2.owl
- https://w3id.org/earthsemantics/OSO/1.2.2.jsonld
- https://w3id.org/earthsemantics/OSO/1.2.2.nt
- https://w3id.org/earthsemantics/OSO/1.2.2.n3
- https://w3id.org/earthsemantics/OSO/1.2.2.trig

## Backend

All RDF content is served by a Virtuoso instance at Ifremer:

- Production: https://virtuoso.ifremer.fr/oso-versions/
- Versioned files: https://virtuoso.ifremer.fr/oso-versions/<version>/
- Latest release: https://virtuoso.ifremer.fr/oso-versions/latest/ (the
  release pinned by the deployment, byte-identical to its versioned files);
  target of the main ontology IRI and of the non-versioned paths

The Virtuoso image serves the files of the published GitHub releases,
checked against SHA-256 checksums, with the MIME type of each serialization.

## Important note

The maintained OSO namespace is:

- https://w3id.org/earthsemantics/OSO/

Top-level file-style URLs such as:

- https://w3id.org/earthsemantics/OSO.owl
- https://w3id.org/earthsemantics/OSO.ttl

are not part of the maintained OSO namespace.

## Target project

https://github.com/emso-eric/oso-ontology

## Notes

This subpath is maintained independently and does not modify other earthsemantics namespaces.
