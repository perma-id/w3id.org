# Policy Type Vocabulary


The **Policy Type Vocabulary (PTV)** was developed as a domain-specific ontology for defining and classifying different types of policies in a structured and machine-readable way. It establishes a hierarchy of policy types, ranging from general Policy concepts to more specific types such as DataPolicy, AccessPolicy, ResearchDataPolicy, or DataAccessPolicy. The vocabulary also defines relevant asset types, including data, content, applications, services, materials, and organisations, which are modelled as subclasses of odrl:Asset.

To ensure interoperability with existing Semantic Web standards, the PTV builds on DCTERMS, ODRL, SKOS, OWL, and RDFS. DCTERMS is used for metadata, ODRL for policies and assets, and SKOS for preferred and alternative labels. Overall, the PTV provides a common semantic structure for consistently identifying, classifying, and relating different policy types.

This approach also allows policies to be referenced either as conventional documents, such as web pages, or directly as ODRL documents and instances. By embedding metadata as JSON-LD in HTML pages, the resource type can be explicitly and unambiguously identified, enabling machines to distinguish between different policy types and representations.

For data archives, this enables a simpler implementation of the Data on the Web recommendations by allowing policies to be linked directly from DCAT metadata using *odrl:hasPolicy*.


This vocabulary was developped during the **EOSC EDEN Project** (grant agreement 101188015)


Maintainer: Robert Huber (rhuber@uni-bremen.de https://github.com/huberrob)

Namespace URI: https://w3id.org/ptv/
