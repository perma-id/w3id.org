# Biopragmatics

This [W3ID](https://w3id.org/) provides a persistent URI namespace for artifacts in the [Biopragmatics project](https://biopragmatics.github.io/).

This initially includes:

1. Making persistent URIs for ontologies created by converting various biomedical databases in the https://github.com/biopragmatics/obo-db-ingest repository.
2. Make Biomappings resources available
3. Make Bioregistry contexts available as top-level resources, like https://w3id.org/biopragmatics/bioregistry.epm.json

## Uses

Biomedical databases such as the [HUGO Gene Nomenclature Committee (HGNC)](https://www.genenames.org/) and the [Universal Protein Resource (UniProt)](https://www.uniprot.org/) are widely used in translational research. However, they are not natively distributed as ontologies and therefore can not be readily integrated into ontologies e.g., in the Open Biological and Biomedical Foundry community.

The https://github.com/biopragmatics/obo-db-ingest repository on GitHub solves this issue by converting these and several other databases into ontology formats, running updates on a chronological basis. W3ID PURLs make these ontology artifacts more accessible.

Concretely, this W3ID entry makes ontology artifacts in the "export" folder (https://github.com/biopragmatics/obo-db-ingest/tree/main/export) resolvable. For example, https://w3id.org/biopragmatics/resources/interpro/92.0/interpro.obo redirects to https://github.com/biopragmatics/obo-db-ingest/raw/main/export/interpro/92.0/interpro.obo

## Contact

Charles Tapley Hoyt  
Email: cthoyt@gmail.com  
GitHub: [@cthoyt](https://github.com/cthoyt/)  
ORCID: [0000-0003-4423-4370](https://orcid.org/0000-0003-4423-4370)
