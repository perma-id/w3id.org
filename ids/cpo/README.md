# Construction Project Typology Ontology (CPO)

Persistent identifiers for the Construction Project Typology Ontology (CPO), an OWL ontology of building projects, their phases, the products installed in their buildings, and the requirements on their spaces. It is developed at Jönköping University for the course TADS23 Advanced Building Information Delivery.

Redirection: https://w3id.org/cpo -> https://richzele.github.io/cpo/

### Routes

- `https://w3id.org/cpo` resolves to the composed ontology, and `https://w3id.org/cpo/project`, `/product` and `/requirement` to its modules. Browsers get the HTML documentation, made with WIDOCO; RDF clients get RDF/XML, JSON-LD, N-Triples or Turtle by content negotiation, with Turtle as the default.
- Terms use the hash namespace `https://w3id.org/cpo#`, so they resolve through the ontology.
- `https://w3id.org/cpo/data` resolves to the example data, and `https://w3id.org/cpo/data/<id>` to the data file that describes that individual.
- `https://w3id.org/cpo/duplex/<id>`, `https://w3id.org/cpo/class/<scheme>/<code>`, `https://w3id.org/cpo/shapes/<name>` and `https://w3id.org/cpo/lecture7` resolve to the files of the information delivery cycle: the duplex model converted from IFC, the classes written for the course, the SHACL shapes and the ontology with the SWRL rules. Browsers get the section of the website that lists them; RDF clients get the Turtle file.
- `https://w3id.org/cpo/repo` resolves to the source repository: https://github.com/RichZele/cpo

### Maintainer
- [Rahel Kebede](https://ju.se/en/personinfo?id=3691), [@RichZele](https://github.com/RichZele), rahel.kebede@ju.se
