# Petro KGraph as a FAIR Resource

Data collected from _tabela de poços_, a table describing basic properties of wells perforated in Brazil.
Original source is from ANP, the Brazilian National Agency for Petroleum, Natural Gas and Biofuels, in public domain: https://cdp.anp.gov.br/ords/r/cdp_apex/consulta-dados-publicos-cdp/consulta-de-po%C3%A7os, accessed in 09/19/2025.

Other available data are derived from PetroNLP, a comprehensive set of natural language processing and information extraction resources for the oil and gas industry in Portuguese. The paper "Petro NLP: Resources for natural language processing and information extraction for the oil and gas industry." describe all resources. This repository targets two datasets from PetroNLP:
1.	The public version of Petro KGraph, a knowledge graph populated with domain entities and their relations, originally obtained from tables of data https://github.com/Petroles/Petro_KGraph/tree/main/KnowledgeGraph. Petro KGraph is in OWL format.
2.	PetroNER, a gold standard corpus annotated with named entities, built from a set of 11 Technical Reports. : https://petroles.puc-rio.ai/files/Corpora/petroner-uri.zip. The PetroNER corpus is cleaned transformed and converted to RDF.

This repository’s cleaned dataset, RDF conversion, and metadata are dedicated to the public domain under CC0 1.0.
ANP does not endorse any analysis or conclusions presented here.

- **Data**: `` (sample 1k rows used for demo/testing).
- **Metadata**: DCAT at ``; optional catalog at `metadata/catal og.ttl`.
- **Shapes**: SHACL constraints at ``.
- **Diagram**: `` (+ PNG export).

## Distributions
- Sample CSV (this repo): ``
- RDF (Turtle): `` 
- Full CSV: see ANP data source (linked above) — included as a DCAT distribution via `accessURL`.


## Source & License
- **Original data**: ANP, the Brazilian National Agency for Petroleum, Natural Gas and Biofuels (public domain).
- **This repo (cleaned CSV, RDF, SHACL/metadata, docs)**: **CC0 1.0 Public Domain Dedication** — see [LICENSE](./LICENSE).

Please cite as: “tabela de pocos ANP, from Brazilian National Agency for Petroleum, Natural Gas and Biofuels, in public domain, accessed 19-09-2025; cleaned and republished by <Patricia Ferreira da Silva/ University of Twente>.”