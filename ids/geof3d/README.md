# geof3d (W3ID)

This directory registers the permanent identifier (W3ID) namespace for **geof3d**:

- Canonical namespace: `https://w3id.org/geof3d#`

The namespace identifies the geof3D vocabulary (URIs for SPARQL 3D geometric functions and related terms).
Because URI fragments (`#...`) are not sent to servers, resolution is configured for the base resource:

- `https://w3id.org/geof3d`

## Redirect target

Requests are redirected to the public geof3D specification/ontology site:

- `https://diellzaelshani.github.io/geof3d/`

The base resource supports content negotiation (303 redirects) to serve:
- HTML documentation (default)
- Turtle ontology (`ontology/geof3d.ttl`)
- Optional RDF/XML (`ontology/geof3d.rdf`) and JSON-LD (`ontology/geof3d.jsonld`)

## Maintainers / Contact

Maintained by:
- Diellza Elshani
- Email: <dielshani@gmail.com>
- GitHub: https://github.com/DiellzaElshani

## Stability / Change policy

This W3ID space is intended to be stable. Redirect targets may evolve over time,
but the canonical namespace `https://w3id.org/geof3d#` should remain persistent.
