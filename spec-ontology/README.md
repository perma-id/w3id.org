# /spec-ontology/
This [W3ID](https://w3id.org) provides a persistent URI namespace for the Specifications Ontology (SPEC). 

The Specifications Ontology (SPEC) is a formal and structured representation of knowledge that defines concepts, relationships, and properties of requirements. It serves as a shared vocabulary or framework for describing and organizing requirements in a way that computers can understand and process, also known as machine-readable requirements.

SPEC aims to extend the Semantic Publishing and Referencing Ontologies ([SPAR](http://www.sparontologies.net/)) to enable all aspects of the standards development process to be described in machine-readable metadata statements, encoded using RDF.

**Documentation**: https://docs.crow.nl/spec-ontology

**Contributors**: [Robert Matousek](https://kweri.nl), [Rik](https://crow.nl), [Redmer Kronemeijer](https://crow.nl), [Herman Drenth](https://ketenstandaard.nl), [Jos Hebing](https://ketenstandaard.nl)

**License:** [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/legalcode)

**Cite as:** Matousek, R., Rik (CROW), Kronemeijer, R., Drenth, H., Hebing, J. (2023). The Specifications Ontology (SPEC).

## Uses
The ontology defines terms like 
`Requirement`,
`Statement`,
`Bindingness`,
`Margin`,
`Condition`,
`Performance`.

The ontology refers mainly to the [SPAR](http://www.sparontologies.net/) ontologies. 

The ontology can be browsed from [https://docs.crow.nl/spec-ontology/](https://docs.crow.nl/spec-ontology/), where the constituent files may also be downloaded from. 

## Preferred Prefixes
```turtle
prefix spec:        <http://purl.org/nen/spec/> .
prefix spec-bind:   <http://purl.org/nen/spec-bind/> .
prefix spec-cat:    <http://purl.org/nen/spec-cat> .
prefix spec-doco:   <http://purl.org/nen/spec-doco> .
prefix c4o:         <http://purl.org/spar/c4o/> .
prefix dc:          <http://purl.org/dc/elements/1.1/> .
prefix doco:        <http://purl.org/spar/doco/> .
prefix frbr:        <http://purl.org/vocab/frbr/core#> .
prefix nen2660:     <https://w3id.org/nen2660/def#>
prefix po:          <http://purl.org/spar/po/>
```

## Contact
This space is administered by:

- **Stichting CROW**   
E-mail: <data@crow.nl>  
GitHub: [@redmer](https://github.com/redmer)
GitHub: [@RiX012](https://github.com/RiX012)
Github: [@rmatousek](https://github.com/robert-matousek)
