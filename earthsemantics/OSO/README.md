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
- Versioned IRIs for all historical releases (1.0.0 – 1.2.0)
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

Main persistent ontology IRI (pinned to latest version, currently 1.2.0):

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

All versions from 1.0.0 to 1.2.0 are available:

- https://w3id.org/earthsemantics/OSO/1.0.0
- https://w3id.org/earthsemantics/OSO/1.0.1
- https://w3id.org/earthsemantics/OSO/1.0.2
- https://w3id.org/earthsemantics/OSO/1.0.3
- https://w3id.org/earthsemantics/OSO/1.0.4
- https://w3id.org/earthsemantics/OSO/1.0.5
- https://w3id.org/earthsemantics/OSO/1.1.0
- https://w3id.org/earthsemantics/OSO/1.2.0

### Versioned distribution paths

For each version, the following sub-paths are available:

- `/<version>/ontology` — TBox (ontology model)
- `/<version>/instances` — ABox (instance data)
- `/<version>/complete` — complete graph (TBox + ABox) with full content negotiation
- `/<version>/shacl` — SHACL validation profile
- `/<version>/void` — VoID metadata description
- `/<version>/dcat` — DCAT catalog description

Example:

- https://w3id.org/earthsemantics/OSO/1.2.0/ontology
- https://w3id.org/earthsemantics/OSO/1.2.0/instances
- https://w3id.org/earthsemantics/OSO/1.2.0/complete
- https://w3id.org/earthsemantics/OSO/1.2.0/shacl
- https://w3id.org/earthsemantics/OSO/1.2.0/void
- https://w3id.org/earthsemantics/OSO/1.2.0/dcat

### Explicit versioned serializations

- https://w3id.org/earthsemantics/OSO/1.2.0.ttl
- https://w3id.org/earthsemantics/OSO/1.2.0.owl
- https://w3id.org/earthsemantics/OSO/1.2.0.jsonld
- https://w3id.org/earthsemantics/OSO/1.2.0.nt
- https://w3id.org/earthsemantics/OSO/1.2.0.n3
- https://w3id.org/earthsemantics/OSO/1.2.0.trig

## Backend

All RDF content is served by a Virtuoso instance at Ifremer:

- Production: https://virtuoso.ifremer.fr/oso-versions/
- Versioned files: https://virtuoso.ifremer.fr/oso-versions/<version>/

The Virtuoso image generates all RDF serializations from the authoritative
Turtle source on GitHub, ensuring correct MIME types for every format.

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
