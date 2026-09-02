# AIAS Ontologies

[![Format](https://img.shields.io/badge/Format-JSON_LD-blue.svg)](https://schiesem.github.io/aias/alignment/aias/v1.0.0/docs/ontology.jsonld) [![Format](https://img.shields.io/badge/Format-RDF/XML-blue.svg)](https://schiesem.github.io/aias/alignment/aias/v1.0.0/docs/ontology.owl) [![Format](https://img.shields.io/badge/Format-N_Triples-blue.svg)](https://schiesem.github.io/aias/alignment/aias/v1.0.0/docs/ontology.nt) [![Format](https://img.shields.io/badge/Format-TTL-blue.svg)](https://schiesem.github.io/aias/alignment/aias/v1.0.0/docs/ontology.ttl)

AIAS is an information model for describing artificial intelligence
applications in automated plants, together with the plant they run in and the
technical process they observe or steer. It consists of four ontology design
patterns, one per subdomain, and an alignment ontology tying them together.

## Key Features

Three standards describe an AI application in a plant, and each describes a
part of it. The questions that matter cross the boundaries, and the alignment
is what lets them be asked. The model covers the following key features:

* Describes the technical process (VDI/VDE 3682), the communication
  (ISO/IEC 7498-1), the control (IEC 60050-351) and the artificial
  intelligence (ISO/IEC 22989) of a plant in one connected model
* Places a process step and an inference under one function class, so a single
  assignment states which resource carries out which function, whichever
  subdomain that function comes from
* Distinguishes open-loop from closed-loop control by structure rather than by
  name, following the action path and action of IEC 60050-351
* Records the direction of a communication, so a model can say which component
  sends and which receives
* Traces a model back to the data it was trained on and to the device that
  recorded that data

## Namespace

| IRI | Resolves to |
|---|---|
| `https://w3id.org/aias` | the alignment ontology, current version |
| `https://w3id.org/aias/1.0.0` | the alignment ontology, that version |
| `https://w3id.org/aias/odp/<name>` | a pattern, current version |
| `https://w3id.org/aias/odp/<name>/<version>` | a pattern, that version |

`<name>` is one of `vdi3682`, `iso7498`, `iso22989`, `iec60050`. An IRI
without a version resolves to 1.0.0, the published one.

A browser is served the documentation, a reasoner the ontology in whichever
serialization it accepts, both through an HTTP 303 redirect.

## Contact

Marvin Schieseck<br>
Email: marvin.schieseck@hsu.hamburg<br>
GitHub: https://github.com/schiesem<br>
Institute: Helmut-Schmidt-Universität / Universität der Bundeswehr Hamburg

## Documentation

The ontology specifications were generated with the help of the WIDOCO wizard.

| Pattern | Documentation | Visualization |
|---|---|---|
| VDI 3682 ODP | [![Documentation](https://img.shields.io/badge/Documentation-Ontology_Specification-blue.svg)](https://schiesem.github.io/aias/odps/vdi3682/v1.0.0/docs/index-en.html) | [![WebVowl](https://img.shields.io/badge/Visualize_with-WebVowl-blue.svg)](https://schiesem.github.io/aias/odps/vdi3682/v1.0.0/docs/webvowl/index.html#) |
| ISO/IEC 7498-1 ODP | [![Documentation](https://img.shields.io/badge/Documentation-Ontology_Specification-blue.svg)](https://schiesem.github.io/aias/odps/iso7498/v1.0.0/docs/index-en.html) | [![WebVowl](https://img.shields.io/badge/Visualize_with-WebVowl-blue.svg)](https://schiesem.github.io/aias/odps/iso7498/v1.0.0/docs/webvowl/index.html#) |
| ISO/IEC 22989 ODP | [![Documentation](https://img.shields.io/badge/Documentation-Ontology_Specification-blue.svg)](https://schiesem.github.io/aias/odps/iso22989/v1.0.0/docs/index-en.html) | [![WebVowl](https://img.shields.io/badge/Visualize_with-WebVowl-blue.svg)](https://schiesem.github.io/aias/odps/iso22989/v1.0.0/docs/webvowl/index.html#) |
| IEC 60050-351 ODP | [![Documentation](https://img.shields.io/badge/Documentation-Ontology_Specification-blue.svg)](https://schiesem.github.io/aias/odps/iec60050/v1.0.0/docs/index-en.html) | [![WebVowl](https://img.shields.io/badge/Visualize_with-WebVowl-blue.svg)](https://schiesem.github.io/aias/odps/iec60050/v1.0.0/docs/webvowl/index.html#) |
| AIAS Alignment | [![Documentation](https://img.shields.io/badge/Documentation-Ontology_Specification-blue.svg)](https://schiesem.github.io/aias/alignment/aias/v1.0.0/docs/index-en.html) | [![WebVowl](https://img.shields.io/badge/Visualize_with-WebVowl-blue.svg)](https://schiesem.github.io/aias/alignment/aias/v1.0.0/docs/webvowl/index.html#) |

Sources: https://github.com/schiesem/aias

## How to cite

If you want to use these ontologies in your own research, please cite as:

```
Schieseck, M., Topalis, P., Reinpold, L., Gehlhoff, F., & Fay, A. (2024).
A Formal Model for Artificial Intelligence Applications in Automation Systems.
2024 IEEE 29th International Conference on Emerging Technologies and Factory
Automation (ETFA), Padova, Italy. IEEE. https://doi.org/10.1109/ETFA61755.2024.10710890
```

If you are using a BiBTeX file, you can copy the following:

```
@inproceedings{Schieseck2024FormalModel,
  author    = {Marvin Schieseck and Philip Topalis and Lasse Reinpold and
               Felix Gehlhoff and Alexander Fay},
  title     = {A Formal Model for Artificial Intelligence Applications in
               Automation Systems},
  booktitle = {2024 IEEE 29th International Conference on Emerging Technologies
               and Factory Automation (ETFA)},
  year      = {2024},
  address   = {Padova, Italy},
  month     = sep,
  publisher = {IEEE},
  doi       = {10.1109/ETFA61755.2024.10710890}
}
```

[![DOI](https://img.shields.io/badge/DOI-10.1109/ETFA61755.2024.10710890-blue.svg)](https://doi.org/10.1109/ETFA61755.2024.10710890)

## License

All resources are licensed under Creative Commons Attribution 4.0
International.

[![License](https://img.shields.io/badge/License-CC_BY_4.0-blue.svg)](https://creativecommons.org/licenses/by/4.0/)
