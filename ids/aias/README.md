# AIAS Ontologies

This namespace is for the AIAS ontologies, an information model for artificial
intelligence applications in automated plants. It consists of four ontology
design patterns, after VDI/VDE 3682, ISO/IEC 7498-1, ISO/IEC 22989 and
IEC 60050-351, and an alignment ontology tying them together.

Sources, documentation and everything else:
https://github.com/schiesem/aias

## Namespace

| IRI | Resolves to |
|---|---|
| `https://w3id.org/aias` | the alignment ontology, current version |
| `https://w3id.org/aias/<version>` | the alignment ontology, that version |
| `https://w3id.org/aias/odp/<name>` | a pattern, current version |
| `https://w3id.org/aias/odp/<name>/<version>` | a pattern, that version |

`<name>` is one of `vdi3682`, `iso7498`, `iso22989`, `iec60050`. An IRI
without a version resolves to 1.0.0, the published one.

A browser is served the documentation, a reasoner the ontology in whichever
serialization it accepts, both through an HTTP 303 redirect.

## Contacts

* Marvin Schieseck <marvin.schieseck@hsu.hamburg> (GitHub: schiesem),
  Helmut-Schmidt-Universität / Universität der Bundeswehr Hamburg
