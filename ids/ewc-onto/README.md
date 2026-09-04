# European Waste Catalogue Ontology

## Intoduction

The ewc-onto is the translation of the [European Waste Catalogue](http://data.europa.eu/eli/dec/2014/955/oj) (EWC) into an ontology. The hierarchy and the names of the classes were completely preserved from the EWC, which means the ontology includes the 20 top-level categories (waste classes), subordinated the waste groups per waste class, and as lowes level the residues per waste group. This structure results in 990 classes in the ontology. These classes are named by their waste code from the EWC, which is two numbers per layer, and by their human understandable description from EWC. Additionally, the waste code can be given as a data property. 

The information about the hazardousness, which is also included in the EWC, is implemented as an additional class in the ontology with two subclasses (*hazardous* and *non-hazardous*). The third layer of the waste tree (residues) is connected to the second layer of the hazardousness tree via an object property.

In the current version (v1.0) English and German language are available. Additionally, four examplary instrances are included in the ontology. In the next version we plan to include more biogenic residues as instances. 

## Versions

- v1.0 - EWC implementation + exemplary instances, last modified: July 2025, published on [Zenodo](https://doi.org/10.5281/zenodo.15348556) and [GitHub](https://github.com/kschmidt-at-dbfz/ewc-onto) 

## How to use

The ontology was developed with [Protégé](https://protege.stanford.edu/) and can be openend and transformed into other data types (owl, rdf) there without any problems.

New instances can be included in ewc-onto and by using the reasoner the waste instances can be assigned to the correct residue class.

## References
- [European Wase Catalogue](http://data.europa.eu/eli/dec/2014/955/oj) (2014/955/EU: Commission Decision of 18 December 2014 amending Decision 2000/532/EC on the list of waste pursuant to Directive 2008/98/EC of the European Parliament and of the Council Text with EEA relevance) from December 30 2014
- [Abfallverzeichnis-Verordnung](https://www.gesetze-im-internet.de/avv/AVV.pdf) (Verordnung über das Europäische Abfallverzeichnis (Abfallverzeichnis-Verordnung - AVV)) from 30 June 2020
- [Protégé](https://protege.stanford.edu/)

## See also
- [An ontology to identify biogenic wastes and residues from bioeconomy](https://doi.org/10.37307/j.1863-9763.2025.06.03), published June 11 2025, publication language German
- [An Ontology Classifying Residues from the Bioeconomy](https://ceur-ws.org/Vol-3967/PD_paper_178.pdf), published May 24 2025, publication language English
