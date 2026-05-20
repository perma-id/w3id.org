# LBCO: Lightweight BatCAT Core Ontologies

LBCO is a set of ontologies developed to cover use cases on vanadium redox-flow batteries and lithium-ion batteries,
within the Horizon Europe project [BatCAT](https://www.batcat.info/) (Battery Cell Assembly Twin).
BatCAT considers three major and interconnected aspects of batteries’ life cycle:
Battery design, battery manufacturing, and battery operation (“in-use”).
The central focus of the project is providing a digital twin of battery manufacturing,
integrating (physics-based and data-driven) modelling, characterization and sensor data.

The list of LBCO modules and strucure is given below. It is followed by the connection of LBCO to other assets, including
ontologies and answer set programming (ASP), a method for logic-based optimization.

## LBCO modules

- Higher level concept (-> higher.ttl)

Transversal modules:
- Optimization, decision support, design (-> optimization.ttl)
- Twinning (-> twinning.ttl)
- Data & metadata (-> data.ttl)

Vertical modules:
- Modelling and simulation (-> modelling.ttl)
- Characterization (-> characterization.ttl)
- Manufacturing (-> manufacturing.ttl)

Battery specific modules:
- Battery (LiB and RFB) (-> battery.ttl)

For more details on the scope of each module, see [Overview of LBCO](overview.md). For
convenience, a file containing all modules is given [here](all_LBCO_modules_combined/all_LBCO_modules_combined.ttl).

## Mappings and alignments of LBCO

### Alignment directory

It contains alignments of LBCO higher.ttl module to top-level or mid-level external ontologies

- Alignment to EMMO (-> alignment-with-ecb.ttl)
- (Draft) Alignment to DOLCE-LITE (-> abdul.ttl) 
- (Draft) Alignment to EMMO-LITE (-> abel.ttl)
- (Draft) Alignment to EVMPO and VIPRS (-> abovemp.ttl)

### Mappings directory:

It contains mappings of ontologies to ASP and between ontologies (LBCO and external)

- [Mapping from OWL/TTL to Answer Set Programming (ASP).](mappings/map2asp)
- Example mapping of LBCO to GPO (-> map2gpo.ttl)
- Example mapping of LBCO to CHAMEO (-> map2chameo.ttl)

### External directory:

It contains snpashots of and references to relevant external ontologies LBCO connects to. It includes:

- BVCO
- ECB (Standing for: EMMO, Battery, Electrochemistry, Chemical Substance and BTO)
- GPO
- OSMO

## Funding

This work has received funding from the European Union’s Horizon Europe
research and innovation programme and from UK Research and Innovation
(UKRI) under the UK government’s Horizon Europe funding guarantee, grant
agreement no. 101137725 (BatCAT – Battery Cell Assembly Twin).

The project timeframe is 2024-2027.

## Recommended literature citation

S. Chiacchiera, M. Gebser, G. Goldbeck, M. Petit, D. Toti, F. Al Machot, I. E. Castelli, S. Drvarič Talian, P. Dubatouka, M. El Bahnasawi, L. Liu, C. Nieto-Draghi, S. Stephan, I. T. Todorov, N. Vizcaino, X. Zhang, & M. T. Horsch (2025). BatCAT deliverable 4.4: Semantic artefacts, schema alignments and mappings. BatCAT consortium. [DOI](https://doi.org/10.5281/zenodo.18059132)