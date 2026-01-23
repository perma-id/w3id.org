# MQTT4SSN Ontology

[![Format](https://img.shields.io/badge/Format-JSON_LD-blue.svg)](https://doernern.github.io/MQTT4SSNOntology/documentation/ontology.jsonld) [![Format](https://img.shields.io/badge/Format-RDF/XML-blue.svg)](https://doernern.github.io/MQTT4SSNOntology/documentation/ontology.owl) [![Format](https://img.shields.io/badge/Format-N_Triples-blue.svg)](https://doernern.github.io/MQTT4SSNOntology/documentation/ontology.nt) [![Format](https://img.shields.io/badge/Format-TTL-blue.svg)](https://doernern.github.io/MQTT4SSNOntology/documentation/ontology.ttl)

MQTT4SSN is an ontology representing the MQTT transport protocol, containing the transmitted data. It extends the W3C SSN/SOSA ontology with the MQTT transport protocol component and uses the WoT MQTT to RDF draft as an ontology design pattern.

## Key Features

The ontology captures the essential elements of MQTT, such as the network entities broker and client, the various control packets and their payloads, the topics that organize communication, and the interrelations between these components. The ontology covers the following key features:

* Supports all MQTT 5.0 control packets
* Enables representation of heterogeneous payload formats and character encodings
* Alignment with the well-established W3C SSN/SOSA ontology
* Models the relation between MQTT topic naming and SOSA elements such as FeatureOfInterest, Property, Actuation, ActuationCollection, Observation, and ObservationCollection

## Contact

Niklas Doerner<br>
Email: doernern@hsu-hh.de<br>
GitHub: https://github.com/doernern<br>
ORCID: https://orcid.org/0009-0004-0088-8633

## Documentation

An Ontology Specification Draft was automatically generated with the help of the WIDOCO wizard.

[![Documentation](https://img.shields.io/badge/Documentation-Ontology_Specification_Draft-blue.svg)](https://doernern.github.io/MQTT4SSNOntology/documentation/index-en.html)

## Visualization

[![Visualize with](https://img.shields.io/badge/Visualize_with-WebVowl-blue.svg)](https://doernern.github.io/MQTT4SSNOntology/documentation/webvowl/index.html#)

## How to cite
If you want to use this ontology in your own research, please cite as:
```
Doerner, N., & Maleshkova, M. (2025). MQTT4SSN: An Ontology for the MQTT Message Protocol. In F. Novakazi & A. S. Dalal (Eds.), Joint Proceedings of the 16th Workshop on Ontology Design and Patterns (WOP 2025) and the 1st Workshop on Bridging Hybrid Intelligence and the Semantic Web (HAIBRIDGE 2025), co-located with ISWC 2025 (CEUR Workshop Proceedings, Vol. 4093, pp. 57–70). CEUR-WS.org. https://doi.org/10.5281/zenodo.16704302
```
If you are using a BiBTex-file, you can copy the following:
```
@inproceedings{DoernerMaleshkova2025MQTT4SSN,
  author    = {Niklas Doerner and Maria Maleshkova},
  title     = {MQTT4SSN: An Ontology for the MQTT Message Protocol},
  booktitle = {Joint Proceedings of the 16th Workshop on Ontology Design and Patterns (WOP 2025)
               and the 1st Workshop on Bridging Hybrid Intelligence and the Semantic Web (HAIBRIDGE 2025),
               co-located with the 24th International Semantic Web Conference (ISWC 2025)},
  editor    = {Fjoll{\"e} Novakazi and Aryan Singh Dalal},
  series    = {CEUR Workshop Proceedings},
  volume    = {4093},
  pages     = {57--70},
  year      = {2025},
  address   = {Nara, Japan},
  month     = nov,
  publisher = {CEUR-WS.org},
  doi       = {10.5281/zenodo.16704302},
  url       = {https://ceur-ws.org/Vol-4093/paper7.pdf}
}
```
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.16805970.svg)](https://doi.org/10.5281/zenodo.16704302) 

## License
All resources are licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International.

[![License](https://img.shields.io/badge/License-https://creativecommons.org/licenses/by_nc_sa/4.0/-blue.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)