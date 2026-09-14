# timefuncs
This `/timefuncs/` path segment within `w3id.org` is used as the base IRI for a vocabulary of [SPARQL](https://www.w3.org/TR/sparql11-query/) functions that correspond to predicates within the  [Time ontology in OWL](https://www.w3.org/TR/owl-time/), which is a W3C recommendation for representing time.

The time functions identified using this namespace are defined using [SKOS](https://www.w3.org/TR/skos-reference/) vocabulary formalisms.

Individual functions have IRIs like this:

* <https://w3id.org/timefuncs/isBefore>
    * function correspnding to a check for `time:before`

The vocabulary as a whole (a SKOS `ConceptScheme`) is identified with the IRI:

* <https://w3id.org/timefuncs/voc>


## Implementations
So far the functions identified using this namespace have been implemented in Python code for use with the [RDFlib](https://pypi.org/project/rdflib/) Python RDF manipulation library. See <https://github.com/RDFLib/timefuncs>.


### Contacts
**Nicholas Car**  
*Data Systems Architect*  
SURROUND Australia Pty Ltd &  
*Adjunct Senior Lecturer*  
Australian National University  
<nicholas.car@surroundaustralia.com>  
<http://surroundaustralia.com>  
<https://orcid.org/0000-0002-8742-7730>  