# HSU AUT
Redirects for ontologies developed by the Institute of Automation of Helmut Schmidt University in Hamburg, Germany. See https://www.hsu-hh.de/aut/ for infos about us.

## Overview
We develop and maintain a growing set of ontologies, mostly so-called ontology design patterns based on industry standards. The .htaccess file in this directory sets up redirects for these ontologies so that ontology IRIs can be resolved to proper URLs.
Content-Negotition is supported which means:
- If you try to open ontology IRIs with a browser (i.e. request an HTML document), the request is redirected to the corresponding Github repository page / readme.
- If you request a ttl or rdf-xml version (e.g. when importing an ontology through a tool like Protege), the request will be redirected to the actual ontology file. Versions are also taken into account so that you may import an ontology with a specific version IRI.

List of ontologies that are currently redirected:
- CSS: Ontology implementation of the abstract reference model for capabilities, skills and services
- CaSk: An ontology detailing the concepts of the CSS ontology
- CaSkMan: A more detailed ontology further extending the concepts of `CaSk` for the domain of manufacturing.
- IEEE 1872.2: Ontology implementation of the Standard for Autonomous Robotics (AuR)
- VDI 3682: Ontology implementation of the formalized process description based on VDI 3682 guideline 
- DIN 8580: Ontology implementation of taxonomy for manufacturing processes based on DIN 8580 standard 
- DIN EN 61360: Ontology implementation of the description of properties based on DIN EN 61360 standard 
- ISA88: Ontology implementation of concepts to describe general states and transitions of machines based on ISA88 standard
- WADL: Ontology implementation of description of HTTP-based applications based on WADL standard
- VDI 2860: Ontology implementation of taxonomy for handling operations based on VDI 2860 guideline
- VDI 2206: Ontology implementation of concepts for mechatronic systems based on VDI 2206 guideline
- ISO 22400-2: Ontology implementation of description of KPIs based on ISO 22400-2 standard 
- DIN EN 62264-2: 
- VDI 5100: Ontology implementation of system architecture of intralogistics plants based on VDI 5100

## Maintainers
- Aljosha Köcher (@aljoshakoecher)
- Luis Miguel Vieira da Silva (@Miguel2617)
- Tom Jeleniewski (@jelenito)
