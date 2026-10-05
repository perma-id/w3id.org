# ITSMO: IT Service Management Ontology 
IT Service Management Ontology (ITSMO) is a formal RDF vocabulary  for describing resources related to IT Service Management best practices. 

The official https://w3id.org/itsmo URI supersedes the [old research project](http://ontology.it/itsmo), which must be considered deprecated.

ITSMO can be used with [PROV](https://www.w3.org/TR/prov-primer/) and [schema.org](https://schema.org/) vocabularies to provide a complete semantic framework for IT Service Management systems.


## The goals of ITSMO:
* Supporting IT Service Providers and product developers with a formal and shared vocabulary consistent with [ITIL glossaries](https://www.axelos.com/resource-hub/glossary/itil-v3-glossaries-of-terms) and [ISO 20000 standard](https://www.iso.org/standard/70636.html).
* Describing and publishing knowledge about IT managed assets.
* Being methodology agnostic.
* Being independent from tools and vendors, allowing flexibility in asset control.
* Enabling semantic web technologies to [infer](http://www.w3.org/standards/semanticweb/inference) useful insights about configuration items.
* Serving as a foundation for applications supporting automatic impact analysis and risk management.

Overall, ITSMO encapsulates a typical ITIL service management model: Services and SLAs are tracked as configuration items, they have defined relationships to providers and customers, and they go through provisioning and deployment processes that rely on underlying infrastructure. The structure highlights both accountability (who is responsible and who is the customer/provider) and the dependencies among CIs in a CMDB-like environment.


## Homepage
Latest Specification https://w3id.org/itsmo -> https://itsmo-efe4e5.gitlab.io/

- Project repository: https://gitlab.com/linkeddatacenter/coach
- User Guide: https://itsmo-efe4e5.gitlab.io/userguide/


## Vocabulary Usage
The ITSMO namespace  is `https://w3id.org/itsmo#` and its usual prefix is `itsmo`.

    @prefix itsmo: <https://w3id.org/itsmo#>


## Contacts
* Enrico Fagnoni <enrico@linkeddata.center>