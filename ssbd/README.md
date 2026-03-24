# SSbD
This [W3ID](https://w3id.org) repository provides a persistent namespace for IRIs for the Safety and Sustainability by Design (SSbD) community.

## Redirection rules


### Substitutions
Variable names used in the IRIs below.

* **{VERSION}**: Version number. Must start with a digit, e.g. "0.5.3".
* **{NAME}**: Name of SSbD domain or application ontology.
* **{TERM}**: Final component of the IRI of an ontological concept.
* **{PATH}**: Directory path.
* **{MODULE}**: Name of a (sub-)ontology module.
* **{CONTEXTNAME}**: Name of an additional JSON-LD context.
* **{NAMESPACE}**: IRI to a namespace, see below.


### IRIs to namespaces
These must follow any of the following patterns:

* https://w3id.org/ssbd -> SSbD Core Ontology, latest
* https://w3id.org/ssbd/{VERSION} -> SSbD Core Ontology, given version
* https://w3id.org/ssbd/domain/{NAME} -> SSbD domain ontology, latest
* https://w3id.org/ssbd/domain/{NAME}/{VERSION} -> SSbD domain ontology, given version
* https://w3id.org/ssbd/application/{NAME} -> SSbD application ontology, latest
* https://w3id.org/ssbd/application/{NAME}/{VERSION} -> SSbD application ontology, given version

The IRI can have an optional trailing slash.
If the request comes from a browser, the redirection will be to a html file, otherwise to a turtle file.


### IRIs to ontological terms
These must follow any of the following patterns:

* https://w3id.org/ssbd/{TERM} -> Term in the SSbD Core Ontology, latest
* https://w3id.org/ssbd/{VERSION}/{TERM} -> Term in the SSbD Core Ontology, given version
* https://w3id.org/ssbd/domain/{NAME}/{TERM} -> Term in a SSbD domain ontology, latest
* https://w3id.org/ssbd/domain/{NAME}/{VERSION}/{TERM} -> Term in a SSbD domain ontology, given version
* https://w3id.org/ssbd/application/{NAME}/{TERM} -> Term in a SSbD application ontology, latest
* https://w3id.org/ssbd/application/{NAME}/{VERSION}/{TERM} -> Term in a SSbD application ontology, given version

Note that there is no trailing slash.
If the request comes from a browser, the redirection will be to a html file, otherwise to a turtle file.


### IRIs to asserted ontologies (modules)

* https://w3id.org/ssbd/{PATH}/{MODULE} -> Module in the SSbD Core Ontology, latest
* https://w3id.org/ssbd/{VERSION}/{PATH}/{MODULE} -> Module in the SSbD Core Ontology, latest
* https://w3id.org/ssbd/domain/{NAME}/{PATH}/{MODULE} -> Module in domain ontology, latest
* https://w3id.org/ssbd/domain/{NAME}/{VERSION}/{PATH}/{MODULE} -> Module in domain ontology, given version
* https://w3id.org/ssbd/application/{NAME}/{PATH}/{MODULE} -> Module in application ontology, latest
* https://w3id.org/ssbd/application/{NAME}/{VERSION}/{PATH}/{MODULE} -> Module in application ontology, given version

Note that there is no trailing slash.
Will always be redirected to turtle files in the GitHub repo.


### Special redirections

* {NAMESPACE}/html/ -> Always redirect to HTML documentation
* {NAMESPACE}/turtle/ -> Always redirect to turtle file
* {NAMESPACE}/inferred/ -> Inferred ontology
* {NAMESPACE}/dependencies/ -> Dependencies. Turtle file that imports all imported ontologies
* {NAMESPACE}/context/ -> JSON-LD context
* {NAMESPACE}/context/{CONTEXTNAME} -> Additional named JSON-LD context



## Contacts
This space is maintained by the [PINK Project](https://pink-project.eu/).
Contact email: [contact@pink-project.eu](mailto:contact@pink-project.eu)

Current maintainers:
* [Jesper Friis](https://github.com/jesper-friis)
* [Francesca L. Bleken](https://github.com/francescalb)
* [Joh Dokler](https://github.com/joahim)
