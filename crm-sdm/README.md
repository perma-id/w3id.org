# CRM-SDM: An OWL 2 Ontology for Firm-Level Stress Testing of Critical Raw Material Supply Chains

[![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)
[![OWL 2 DL](https://img.shields.io/badge/W3C-OWL_2_DL-blue.svg)](https://www.w3.org/TR/owl2-overview/)
[![SHACL](https://img.shields.io/badge/Validation-SHACL-green.svg)](https://www.w3.org/TR/shacl/)
[![Reasoner: HermiT](https://img.shields.io/badge/Reasoner-HermiT-orange.svg)](http://www.hermit-reasoner.com/)

Official repository for **CRM-SDM**, an OWL 2 DL ontology and companion knowledge graph designed for firm-level stress testing of Critical Raw Material (CRM) trade networks (focusing on tungsten supply chains).

---

## 📌 Overview

European monitoring frameworks for Critical Raw Materials typically rely on country-level statistics, whereas supply chain disruptions propagate between individual firms. **CRM-SDM** addresses this gap by reconstructing a granular trade network while maintaining a strict formal distinction between empirical (observed) and synthetic (reconstructed) market entities through provenance tracking (`PROV-O`).

### Key Contributions & Features
* **Formal Epistemic Separation**: `sdm:EmpiricalTrader` and `sdm:SyntheticTrader` are declared as disjoint classes, linked to their respective provenance sources (`prov:hadPrimarySource` vs. `prov:wasGeneratedBy`).
* **Synthetic Provenance**: Downscaling activities are modeled as first-class entities (`sdm:DownscalingActivity`), recording generation parameters for reproducibility.
* **Declarative Reasoning**: Identifies systemically relevant intermediaries (`sdm:StableCriticalIntermediary`) using OWL 2 DL reasoning (e.g., HermiT) based on multi-hop transitive reachability, governance scores, and local structural conditions.
* **Validation & Constraints**: Accompanied by a dedicated SHACL constraint suite enforcing closed-world integrity and domain rules (e.g., column-stochastic import shares).

---

## 📊 Knowledge Graph Statistics

| Metric | Count | Description |
| :--- | :--- | :--- |
| **Total Triples** | 54,790 | Combined TBox and ABox merged graph |
| **Classes** | 12 | 10 primitive classes, 2 defined classes (`FavorableGovernanceCountry`, `StableCriticalIntermediary`) |
| **Properties** | 35 | 10 object properties, 25 data properties |
| **Traders** | 192 | 6 empirical (`sdm:EmpiricalTrader`), 186 synthetic (`sdm:SyntheticTrader`) |
| **Countries** | 154 | Reified with ISO 3166-1 alpha-3 codes and EU Authority List alignments |
| **Trade Flows** | 5,568 | Reified directed supply connections carrying value, mass, and import shares |

---

## 📁 Repository Structure

```text
crm-sdm/
├── ontology/     # TBox: OWL 2 DL ontology schema (Turtle format)
├── kg/           # ABox: Instantiated Knowledge Graph (Triples / Turtle)
├── data/         # Operational property graph inputs and generation parameters
├── validation/   # Companion SHACL shape suite for structural validation
└── README.md     # Repository documentation
