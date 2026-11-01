# IproK persistent identifier

`https://w3id.org/iprok/` identifies the Integrated Project Knowledge ontology.
The canonical namespace uses lowercase `iprok`; path case is significant.

- Browser requests open the [visual schema atlas](https://konevenkatesh.github.io/iprok-explorer/).
- RDF clients receive Turtle, RDF/XML, JSON-LD or N-Triples via their Accept header.
- `/draft/0.2.0` identifies the explicitly proposed expanded draft.
- Module paths such as `/schedule`, `/resource` and `/building` resolve to module documentation or their requested RDF representation.
- `/shapes` resolves to the associated SHACL graph. Explicit representation filenames also work.
- `/0.1.0` retains the original published graph and documentation. Other pre-existing numeric aliases retain their former IprokDoc destinations; they do not identify independently frozen releases.

The source files and release/migration information are hosted in [iprok-explorer](https://github.com/konevenkatesh/iprok-explorer). This directory holds redirects only. The historical uppercase namespace remains documented in the retained original source; the new draft has an explicit migration map.

## Maintainer

Venkatesh Kone

- GitHub username: [konevenkatesh](https://github.com/konevenkatesh)
- Email: konevenkatesh92@gmail.com
- [ORCID](https://orcid.org/0000-0002-6398-5850)
