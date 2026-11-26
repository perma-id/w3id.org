# OSDi Ontology namespace

This namespace is created to host the **OSDi ontology**, developed at the [University of La Laguna](https://www.ull.es), Spain.  

The namespace provides persistent and resolvable IRIs for the ontology and its terms.  
Each request is redirected to the corresponding resources hosted in the [ontologies-ULL GitHub organization](https://github.com/ontologies-ULL/OSDi).
Content negotiation is supported, so different representations (HTML documentation, Turtle, RDF/XML, etc.) are served depending on the client's request.


---

## Access

- `https://w3id.org/ontologies-ULL/OSDi` → Persistent IRI for the ontology  
  - **HTML**: Shown in web browsers (Widoco documentation).  
  - **Turtle / RDF/XML / JSON-LD**: Returned to semantic web clients via content negotiation.
- `https://w3id.org/ontologies-ULL/OSDi/X.Y` → A specific version (e.g., `1.3`), with the same content negotiation.
- `https://w3id.org/ontologies-ULL/OSDi/individuals/<name>` and `.../OSDi/X.Y/individuals/<name>` → The Turtle file of a set of individuals (e.g., `PBD`). Paths with the file name (`<name>.ttl`) also work.
- `https://w3id.org/ontologies-ULL/OSDi/examples/<case>` and `.../OSDi/X.Y/examples/<case>` → A validation example (e.g., `evans1997-migraine`).
  - **HTML**: Its description on GitHub (for `X.Y`, that of the release tag `vX.Y`).
  - **Any other client**: Its ontology in Turtle.
  - The other files of an example are available at `.../examples/<case>/<file>`.

---

## Contact

**Iván Castilla Rodríguez**  
- 📧 [icasrod@ull.edu.es](mailto:icasrod@ull.edu.es)  
- 🐙 [GitHub Organization: ontologies-ULL](https://github.com/ontologies-ULL)  
- 👤 [GitHub User: icasrod](https://github.com/icasrod)
