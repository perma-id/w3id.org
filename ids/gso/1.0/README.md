
# /gso/1.0

**Name of the project:** [GeoScienceOntology Loop3d version 1.0](https://github.com/Loop3D/GKM)

**Description:** redirects for Geoscience Ontology.  This ontology for describes Geologic features, properties and relationships.

catches https://w3id.org/gso/1.0/....

Redirects /, /ontology and /ontology.html to pyLODE generated html pages in the Loop3D.github.io/GKM site.
/{class or property} gets redirected to the html page for the containing module
Accept text/turtle in header or /ontology.ttl gets the turtle file for the module. Use [githack](https://raw.githack.com/) production URLs to return .ttl files with proper HTTP headers.

**Contacts:**
* Stephen Richard <smrTucson@gmail.com> - GitHub: https://github.com/smrgeoinfo
* Boyan Brodaric  