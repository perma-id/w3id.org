# Archivarious archival records

The identifier root `https://w3id.org/teka-data/` redirects to the Archivarious search site.

A record identifier has the form `/{archive}/recordsets/{id}` under this root. `FOND-`, `INV-` and `FILE-` identify fonds, inventories and files. Each record URI redirects with HTTP 303 to its HTML card or to a description of that record from the public RDF graph.

Use `Accept: text/turtle`, `application/ld+json` or `application/rdf+xml` to request RDF. Requests without a supported RDF media type go to HTML. If a client accepts several supported RDF formats, the rules prefer Turtle, then JSON-LD, then RDF/XML.

Example identifier `https://w3id.org/teka-data/tsdavo/recordsets/FOND-21912`.

## Maintainers

- Roman Ravve (GitHub [@ravve](https://github.com/ravve))
- Illia (GitHub [@hryhorillia](https://github.com/hryhorillia))
