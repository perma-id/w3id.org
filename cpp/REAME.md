## 🧬 Cell Penetrating Peptide Uptake Mechanisms (CPP-Mechanisms)

Version: 1.0
License: CC BY 4.0

Created: 2025-10-19

Maintainer: Maria Gomez

Contact: maria.castillo@kaust.edu.sa

Base namespace: https://w3id.org/cpp/schema#
Dataset IRI: https://w3id.org/cpp/dataset/mechanisms

## 📘 Overview

The CPP-Mechanisms Knowledge Base is a structured RDF dataset describing the endocytic molecular mechanisms through which cell-penetrating peptides (CPPs) and related cargos enter cells such as macropinocytosis, phagocytosis, clathrin mediated and caveolae mediated endocytosis.

Each mechanism aggregates:

Core and regulatory genes (Ensembl identifiers)

Relevant pathways (GO, Reactome, KEGG, MSigDB)

Known chemical inhibitors (mapped to ChEBI and MeSH)

Literature-based evidence (DOIs)

The dataset is published as FAIR, machine-readable RDF and can be queried with SPARQL or reused in ontology-driven analyses.

## 🗂️ Directory structure
cpp-mechanisms/
├── data/
│   ├── mechanisms.json          # Original JSON input
│   ├── mechanisms.ttl           # RDF Turtle serialization
│   ├── mechanisms.jsonld        # RDF JSON-LD serialization
├── metadata/
│   └── dataset.ttl              # DCAT/PROV metadata file
├── shapes/
│   └── mechanism.shacl.ttl      # SHACL validation shapes
├── src/
│   └── json_to_rdf.py           # JSON → RDF conversion script
├── docs/
│   └── index.html               # Optional landing page for GitHub Pages
└── README.md                    # This file

## 🔍 Data model

Main classes and relationships used:

Entity	Description	Example
ex:Mechanism	Cellular uptake mechanism (e.g. macropinocytosis)	mech:Macropinocytosis
ex:GateCoreEntry	Core gene enabling internalization	ensembl:ENSG00000121879 (PIK3CA)
ex:RegulatorEntry	Regulator gene that modulates pathway activity	ensembl:ENSG00000124181 (PLCG1)
ex:ContextNegativeEntry	Drug or chemical that inhibits the mechanism	chebi:CHEBI_47499 (Imipramine)
ex:hasExternalRef	Links to GO, KEGG, Reactome, MSigDB	obo:GO_0044351
ex:evidence	Literature reference (DOI or PubMed link)	<https://doi.org/10.1111/bph.14439>

All identifiers are dereferenceable (e.g., Ensembl, ChEBI, Reactome) following the Identifiers.org
 scheme.
