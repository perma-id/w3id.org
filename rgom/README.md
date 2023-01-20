# Reference Generalized Ontological Model

Reference Generalized Ontological Model is a Smart Manufacturing ontology that provides a detailed unified model which takes the I4.0 domain knowledge from rawmaterial to finished product including supply to the customeras well as monitoring the different situations of machines and processes. Machines and products are separated from the Resource ontology proposed by [1], to form a machine ontology and a product ontology to accommodate more concepts and relations. For instance, the product ontology specifies the concepts such as product (production of product) and service (maintenance usage) adopted from RAMI4.0 and identified concepts such as sales ontology are coupled in instance. This helps to provide a full view that the order is placed for a service or for the manufacturing, depending on the order the either the service or the resources in the manufacturing production line will be reconfigured. RGOM has reused the existing vocabulary i.e., the machine which is a manufacturing facility and is associated with the workstation by reusing the isPartOf property from Dublin core vocabulary. The process(s) happening at different times and locations is linked to the manufacturing resources by process ontology using performProcess property. It describes the basic taxonomy of all kinds of processes from manufacturing to launching, human and logistic operations. Sales ontology defines customer orders concepts for the product. The order can have various concepts such as design, quantity, delivery date etc. Supply chainontology can assist in monitoring the delivery of the manufactured product to the customer. Thus, the context of the core ontologies alone would not be able to answer why, where and what type of questions, but the RGOM is able to infer all the contextual information ranging from a particular entity situation to the complete production line.

# Vocabulary Usage
@prefix smo: http://www.semanticweb.org/manufacturingproductionline# . \
@prefix dc: http://purl.org/dc/elements/1.1# . \
@prefix tm: http://www.w3.org/2006/time# . \
@prefix owl: http://www.w3.org/2002/07/owl# . \
@prefix rdf: http://www.w3.org/1999/02/22-rdf-syntax-ns# . \
@prefix ssn: http://purl.oclc.org/NET/ssnx/ssn# . \
@prefix xml: http://www.w3.org/XML/1998/namespace . \
@prefix xsd: http://www.w3.org/2001/XMLSchema# . \
@prefix rdfs: http://www.w3.org/2000/01/rdf-schema# . \
@prefix sosa: http://www.w3.org/ns/sosa# . 



# Contact: 
### Muhammad Yahya:
m.yahya1@nuigalway.ie \  
muhammad.yahya@insight-centre.org\  

### John Breslin
john.breslin@nuigalway.ie \  

### Ali Intizar
ali.intizar@dcu.ie

