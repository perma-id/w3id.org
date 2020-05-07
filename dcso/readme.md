# DMP Common Standard Ontology (DCSO)

This ontology aims to represent the DMP Common Standard model, through the usage of semantic web technology. It represents the DMP Common Standard model using the [Web Ontology Language (OWL)](https://www.w3.org/OWL/).

This is still a work in progress. The idea behind having the DMP Common Standard model represented in OWL, is to explore the potential behing a machine-readable version of the model.

<!--The following is a diagram of the DCSO: -->

<!--![DCSO Diagram](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/blob/master/ontologies/diagrams/dcso30.png) -->

## Exploring the ontology

There are many tools that allow for the viewing of OWL ontologies. We recomend that you use [Protégé](https://protege.stanford.edu/), to open and view the ontology file.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

Versions available:

* v1.0.0 [2019.05.09] - Initial release, modelling the [DMP Common Standard model 2019.03.25](https://github.com/RDA-DMP-Common/RDA-DMP-Common-Standard/blob/master/docs/diagrams/RDA-DMP-Common-Model-Diagram-190325.pdf).
* v1.1.1 [2019.09.12] - Fixed some consistency issues. Added cross references to the foaf, dcat and dct data properties.
* v1.1.2 [2019.09.19] - Added the hostID object property, that now allows Host entities to be identified through TypeIdentifier entities.
* v2.0.0 [2020.04.22] - Compliant with the published version of the RDA's DMP Common Standard. Namespaces fixed to allow for URL opening.
* v2.0.1 [2020.05.01] - Corrected the lack of certain datatype entity associations.
* v2.0.2 [2020.05.07] - Corrected the hasFunder_id object property, and changed the namespace to be compliant with the w3id.

## Authors

* **[João Cardoso](https://github.com/JoaoMFCardoso)**

## Acknowledgments

* Daniel Faria 
* Tomasz Miksa
* Diogo Proença
