# Hebrew Manuscripts Ontology (HMO)

## Namespace

- Base namespace: `https://w3id.org/hebrew-manuscripts/`
- Maintainer: Alexander Goldberg
- Project repository: https://github.com/alexandergolbergwix/pipeline
- Zenodo deposit: https://doi.org/10.5281/zenodo.19560383

## Project Description

The **Hebrew Manuscripts Ontology (HMO)** is an OWL ontology for representing Hebrew manuscripts as Linked Open Data. Developed by the Mapping Hebrew Manuscripts (MHM) project at Bar-Ilan University, HMO integrates a cataloging-bibliographic layer (LRMoo Work / Expression / Manifestation Singleton), a philological layer (TextTradition, TransmissionWitness), and an epistemological layer (Attribution, EpistemologicalStatus), aligned with CIDOC CRM and LRMoo.

The ontology supports structural granularity through Bibliographic Unit / Codicological Unit / Paleographical Unit (BU-CU-PU) and adopts event-centric modelling for production, transfer, and ownership.

## Content negotiation

| Accept header | Response |
|---|---|
| `text/turtle` | Turtle serialisation |
| `application/rdf+xml` | OWL/RDF-XML serialisation |
| `text/html` | GitHub repository page |

## License

The ontology is released under [CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Contact

- **Name:** Alexander Goldberg
- **GitHub:** [@alexandergolbergwix](https://github.com/alexandergolbergwix)
- **ORCID:** [0009-0004-5967-9377](https://orcid.org/0009-0004-5967-9377)
- **Email:** shvedbook@gmail.com
- **Affiliation:** Bar-Ilan University, Ramat-Gan, Israel
