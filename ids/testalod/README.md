# TESTaLOD

TESTaLOD is a Web application designed for providing the XD methodology with a testing toolbox for supporting knowledge graph (KG) testing. XD is an iterative and incremental methodology, and involves different actors:

 - a designer team, in charge of modelling a KG;
 - a testing team, disjoint from the designer team, which takes care of testing the KG;
 - a customer team, who elicits the requirements that are translated into ontological commitments (i.e. competency questions and other constraints) that guide the KG development.

TESTaLOD uses the TestCase OWL meta model as the reference schema for representing unit tests, a means for validating ontology as well as data commitment. In such a schema, a unit test is modelled as a competency question (CQ) expressed in natural language and associated with a corresponding SPARQL query. Additionally, an expected result and a reference data sample can be provided. This allows one to validate the CQ by executing the SPARQL query with respect to the data sample, assessing the correspondence to the expected result. 

## Repository maintainers

 - Andrea Nuzzolese (anuzzolese)
 - Fabio Mariani (FabioMariani)
