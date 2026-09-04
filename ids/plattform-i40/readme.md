# Plattform Industrie 4.0
Redirects for ontologies developed in working groups of Plattform Industrie 4.0.

## Overview
Working groups of Plattform Industrie 4.0 develop information models that are sometimes implemented as OWL ontologies. The .htaccess files in the subdirectories of this directory set up redirects for such ontologies so that ontology IRIs can be resolved to proper URLs.
Content-Negotiation is supported which means:
- If you try to open ontology IRIs with a browser (i.e. request an HTML document), the request is redirected to the corresponding Github repository page / readme.
- If you request a ttl or rdf-xml version (e.g. when importing an ontology through a tool like Protege), the request will be redirected to the actual ontology file. Versions are also taken into account so that you may import an ontology with a specific version IRI.

List of ontologies that are currently redirected:
- CSSE: Lightweight ontology module to formally represent effects of manufacturing operations in the context of capabilities, skills and services (see [whitepaper](https://www.plattform-i40.de/IP/Redaktion/EN/Downloads/Publikation/CapabilitiesSkillsServices.html) for more info)

## Maintainers
- Aljosha Köcher (@aljoshakoecher)
- Tobias Klausmann (@tobijk2)
- Michael Winter (@winterIAT)
