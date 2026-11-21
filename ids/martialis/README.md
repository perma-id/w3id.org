# Martialis

Permanent identifiers for the Martialis martial arts lineage ontology
and its SKOS controlled vocabularies.

## Redirects

The following endpoints are included, all 302 (we are pointing to the
ontology/vocab/shapes):

- `https://w3id.org/martialis/ontology`: ontology (OWL/Turtle), also
  the base for its `#fragment` class and property terms.
- `https://w3id.org/martialis/ontology/shapes`: SHACL shapes namespace
  (`#fragment` terms), separate from the ontology's own so that a bare
  dereference lands on the page that documents it.
- `https://w3id.org/martialis/vocab`: merged SKOS vocabulary index,
  and `https://w3id.org/martialis/vocab/<scheme>[/<concept>]` for an
  individual concept scheme or concept.
- `https://w3id.org/martialis/context.jsonld`: JSON-LD context for the
  Martialis data.
- `https://w3id.org/martialis/` redirects to the homepage.

The ontology, vocabulary and context redirects go to the same paths on
`martial.is`. The ontology and vocabulary paths perform content
negotiation there (Turtle, HTML). Entity data
(`https://martial.is/entity/<ULID>`, `/agent/<ULID>`) remains on
`martial.is` and is not part of this registration.

## Maintainer

Frederico Muñoz (https://github.com/fsmunoz), Martialis Project
Homepage: https://martial.is
