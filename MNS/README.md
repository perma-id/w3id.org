About Modelling and Standards Ontology (MnS)
===================
While MnS extends the foundational work of the EC3 BIM Standards Landscape Explorer by enbling the development of an OWL-based representation of the dataset, it also bridges the gap between natural language documentation of standards and machine-readable, queryable representations.

In essence, the MnS ontology reuses other ontologies when possible. The intention was to add value by focusing on the way the data makes sense to practitioners in the built environment had they need to use a BIM standard, not on just making an ontology to make standards metadata machine-readable. Therefore, the mns ontology makes the BIM standards data and metadata findable, accessible, interoperable, and reusable (FAIR). The rationale behind developing an ontology was to (1) enable our existing relational dataset to become a knowledge graph and easily accessible and linked to the existing data on the Web, and (2) enable others to understand and query our data for their progress in using BIM and digital construction standards. 

Current Link (to be updated):
https://z-arghavan.github.io/MnSOntology/

Motivation
==========
Despite the critical role of standards in the construction industry, their adoption is hindered by accessibility challenges, natural language complexity, and a lack of machine-readable formats. The BIM Landscape Stanadrds Explorer initiative by the M&S committee aimed to address parts of these issues/ BIM Landscape Stanadrds Explorer is connected to a carefully anlysed and curated dataset of BIM stndards and their metadata, shaped through significant over the past couple of years. However, the data was structured in a relational database on the one hand. One  other hand, the data was not machine-readble, not connected to the other datasets and not easily queryable despite being publicly available.
The MnS Ontology aims to:

* Provide a formal, semantic structure for BIM-related standards, although it can be also adapted by other domains.
* Facilitate querying and exploration of (BIM and releted) standards' metadata and relationships.
* Promote interoperability and integration of standards with other datasets.
* Establish a Link between the metadata of standards and the exisitng ontologies in the construction domain.
* In the long-term, MnS ontology aims to bridge the BIM Stnadards Landscape Explorer data and tool with the Built Environment Lookup Service (BE-OLS), which is also dveloped by the M&S committee.

  <img src="images/Modelling and Standards (MNS) ontology.png">


Object Properties
==========

The following table shows how different properties are reused from the STO and OMV ontologies, as well as the new MnS object properties. 
| Property                      | SubProperty                        | Domain             | Range                 |
|-------------------------------|-------------------------------------|--------------------|-----------------------|
| mns:relatedToPhase            |                                     | sto:publication    | mns:projectPhase      |
| mns:relatedToRole             |                                     | sto:publication    | mns:role              |
| mns:relatedToTopic            |                                     | sto:publication or omv:ontology | mns:topic |
|                               | mns:essentiallyRelatedToTopic       | sto:publication    | mns:topic             |
|                               | mns:implicitlyRelatedToTopic        | sto:publication    | mns:topic             |
|                               | mns:relevantlyRelatedToTopic        | sto:publication    | mns:topic             |
| mns:references                |                                     | sto:publication    | sto:publication       |
|                               | mns:informativelyReferences         | sto:publication    | sto:publication       |
|                               | mns:normativelyReferences           | sto:publication    | sto:publication       |
| sto:hasTechnicalCommittee     |                                     | sto:publication    | sto:TechnicalCommittee|
| sto:hasDomain                 |                                     | sto:publication    | sto:domain            |
| omv:hasDomain                 |                                     | omv:ontology       | omv:ontologyDomain    |

Data Properties
==========

| Datatype Property            | Domain         | Range        |
|------------------------------|----------------|--------------|
| mns:hasAbstract              | sto:standard   | xsd:string   |
| mns:hasCurrentPublicationDate| sto:standard   | xsd:date     |
| mns:hasFirstPublicationDate  | sto:standard   | xsd:date     |
| mns:hasStandardNumber        | sto:standard   | xsd:string   |
| mns:contributesToSDG         | sto:standard   | xsd:integer  |
| mns:isCEN                    | sto:standard   | xsd:boolean  |
| mns:isISO                    | sto:standard   | xsd:boolean  |
| sto:hasOntology              | sto:publication| xsd:string   |
| sto:hasOfficialResource      | sto:publication| xsd:anyURI   |


Individuals
==========

| dica:agent (mns:Role) | mns:Phase                | mns:Topic                     | mns:Topic                     | sto:Technical Committee | sto:Domain              |
|------------------------|--------------------------|--------------------------------|--------------------------------|-------------------------|-------------------------|
| mns:Client            | mns:Briefing            | mns:InformationDeliveryManual | mns:BIMExecutionPlan          | mns:CEN/TC442           | mns:Construction        |
| mns:Contractor        | mns:Decommissioning     | mns:InformationDeliveryPlan   | mns:Classification            | mns:ISO/TC10/SC8       | mns:FM                  |
| mns:Designer          | mns:Design              | mns:InformationDeliverySpecification | mns:COBie                | mns:ISO/TC59/SC13      | mns:GIS                 |
| mns:FacilityManager   | mns:Handover            | mns:InformationManagement     | mns:CommonDataEnvironment     |                         | mns:HIS                 |
| mns:Manufacturer      | mns:ManufacturingConstruction | mns:InformationModel    | mns:DataDictionary             |                         | mns:IndustrialAutomation|
| mns:PermitAgency      | mns:OperationMaintenance | mns:InformationRequirements | mns:DataTemplate               |                         | mns:Other               |
| mns:ProjectManager    | mns:Procurement         | mns:LevelOfInformationNeed   | mns:GeographicInformationSystem |                         | mns:PM                  |
| mns:SoftwareDeveloper | mns:StrategicDefinition | mns:LinkedData               | mns:IFC                        |                         | mns:QualityManagement   |
|                        |                          | mns:InformationContainer     |                                |                         | mns:Sustainability      |
|                        |                          | mns:TechnicalProductDescription |                             |                         |  mns:BIM               |
|                        |                          | mns:BIM                     |                                |                         |                         |


Alignment with Upper Ontologies and Domain Onotologies
==========
* Ontology Acronym: STO
  * Name: Standards Ontology
  * Description: Captures and connects various standards, their publishers and content. It has a good coverage of terminologies. But data properties can be sometimes difficult to use.
  * This is an established ontology.
  * Type: Upper Otnology


* Ontology Acronym: SSOS
    * Name: The Standards Specific Ontology
    * Description: Defines specific aspects of standards. It has good data properties but few classes and object properties.
    * This is a proposed ontology.
    * Type: N/A

* Ontology Acronym: DICA
    * Name: Digital Construction - agents
    * Description: Focuses on roles and responsibilities within digital construction processes and projects.
    * This is an established ontology.
    * Domain: Built Environment
    * Type: Domain Otnology


* Ontology Acronym: OMV
    * Name: Ontology Metadata Vocabularies
    * Description: Provides metadata properties to describe and manage ontologies.
    * This is an established ontology.
    * Type: Upper Otnology

* Ontology Acronym: FOAF
    * Name: Friend of a Friend
    * Description: Models social networks, people and their activities.
    * This is an established ontology.
    * Type: Upper Otnology

Example SPARQL Queries
==========
QUERY_1 (Get all standards)
    PREFIX mns: <http://example.org/ontology#>
    PREFIX sto: <https://w3id.org/i40/sto#>
    PREFIX base: <http://example.org/data#>

    SELECT ?standard ?title
    WHERE {
      ?standard a sto:standard ;
                mns:hasTitle ?title .
    }


-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_2 (Get CEN standards)

    SELECT ?standard ?title
    WHERE {
    ?standard a sto:standard ;
                mns:hasTitle ?title ;
                mns:isCEN ?isCEN .
    FILTER(?isCEN = "Yes")
    }


-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_3 (Get ISO standards that are not CEN)

    SELECT ?standard ?number
    WHERE {
      ?standard a sto:standard ;
                mns:hasStandardNumber ?number ;
                mns:isISO "Yes" .
      FILTER NOT EXISTS { ?standard mns:isCEN "Yes" . }
    }


-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_4 (Find standards related to role)

    SELECT ?standard ?title
    WHERE {
      ?standard a sto:standard ;
                mns:hasTitle ?title ;
                mns:relatedToRole mns:Client .
    }
-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_5 (Find standards related to phase)

    SELECT ?standard ?number
    WHERE {
      ?standard a sto:standard ;
                mns:hasStandardNumber ?number ;
                mns:relatedToPhase mns:Decommissioning .
    }


-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_6 (Find all standards that are informatively referenced in ISO 19650-1).

    SELECT DISTINCT ?referencedStandard ?title
    WHERE {
    base:ISO_19650-1 mns:InformativelyReferences ?referencedStandard .
    OPTIONAL { ?referencedStandard mns:hasTitle ?title . }
    }


-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_7 (Find standards that are essentially related to a specific topic but not related to another one at all)
    
    SELECT DISTINCT ?standard ?number ?title
    WHERE {
      ?standard a sto:standard ;
                mns:hasStandardNumber ?number ;
                mns:hasTitle ?title ;
                mns:EssentiallyRelatedToTopic mns:Data_Dictionary .
      FILTER NOT EXISTS { ?standard mns:relatedToTopic mns:Information_Container . }
    }


-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_8 (Find all ontologies that are relevant to a standard related to a specific topic). 
    PREFIX mns: <http://example.org/ontology#>
    PREFIX sto: <https://w3id.org/i40/sto#>
    PREFIX omv: <http://omv.ontoware.org/2005/05/ontology#>
    PREFIX base: <http://example.org/data#>
    
    SELECT DISTINCT ?ontology ?name ?description
    WHERE {
      ?ontology a omv:Ontology ;
                omv:name ?name ;
                omv:description ?description ;
                mns:relatedToTopic mns:Data_Dictionary .
      FILTER EXISTS {
        ?standard a sto:standard ;
                  mns:relatedToTopic mns:Data_Dictionary .
      }
    }



-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_9 (Find all standards in the BIM domain that are published before 2018). 

    SELECT ?standard ?number ?firstPublicationDate
    WHERE {
      ?standard a sto:standard ;
                mns:hasStandardNumber ?number ;
                mns:hasFirstPublicationDate ?firstPublicationDate ;
                sto:hasDomain base:BIM .
      FILTER (?firstPublicationDate < "2018-01-01"^^xsd:date)
}


-------------------------------------------------------------------------------------------------
-------------------------------------------------------------------------------------------------
QUERY_10 (Which standards are normatively referenced by a standard that is related to the phase X?).

    SELECT DISTINCT ?normativelyReferencedStandard ?number
    WHERE {
    ?standard a sto:standard ;
                mns:relatedToPhase mns:Decommissioning ;
                mns:NormativelyReferences ?normativelyReferencedStandard .
    ?normativelyReferencedStandard mns:hasStandardNumber ?number.
    }



Disclaimer
==========
This ontology does not use or reuse any part of the copyrighted content of the ISO or CEN standards. It relies solely on our own analysis, interpretations, and publicly available data.

Contact Us
==========
For any queries, questions, sugestions and comments, please contact us here: 
https://ec-3.org/governance/technical-committees/modelling-standards-committee/

References
==========
* BIM Standards Landscape Explorer: https://ec-3.org/BIM-Standards-Landscape-Explorer.html
* Built Environment Ontology Lookup Service: https://cyberbuildlab.github.io/BE-OLS/
