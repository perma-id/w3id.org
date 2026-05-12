# comicslod

Linked Open Data namespace for the Italian Comics RDA-informed dataset, produced
within the PhD project of Valerio De Luce at the Università degli Studi di Macerata.

## Steward

- Valerio De Luce
- ORCID: https://orcid.org/0009-0006-6190-6406
- Email: uricchio@gmail.com
- Affiliation: Università degli Studi di Macerata, PhD candidate XL cycle

## Purpose

Permanent identifier namespace for resources, ontology terms, and software
identifiers of the "comicslod" project, which produces RDA-informed (Resource
Description and Access) Linked Open Data from photographs of Italian comic
books, via Vision-Language Models (VLM) benchmark D162.

## Resolution

Resource URIs resolve via the SPARQL endpoint at:
https://armchair-angriness-prelaw.ngrok-free.dev/comicslod/sparql

Each `resource/...` URI returns a Turtle representation via DESCRIBE query
(303 redirect, content-negotiation aware).

Endpoint hosted on a self-managed Apache Jena Fuseki instance with a
reverse tunnel (ngrok). Endpoint stability depends on the project lifecycle;
long-term stewardship will be transferred to a UNIMC institutional URL
upon paper publication.

## License

The dataset is released under Creative Commons Attribution 4.0 (CC BY 4.0).
The codebase is released under the MIT License.
