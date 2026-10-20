# taco-rdf

Persistent identifier namespace for **taco-rdf**: the Brazilian Food Composition
Table (TACO), 4th edition (NEPA-UNICAMP, 2011), published as an RDF knowledge
graph.

- Vocabulary (classes/properties): `https://w3id.org/taco-rdf/vocab#`
- Instance data (foods, groups, nutrients, measurements): `https://w3id.org/taco-rdf/id/`

IRIs redirect (303) to static documents on <https://victoria125.github.io/taco-rdf/>,
chosen by the `Accept` header: `text/turtle` -> Turtle, `application/ld+json` ->
JSON-LD, anything else -> HTML. Measurement IRIs redirect to their food's document.
Everything else goes to the landing page.

Source: <https://github.com/Victoria125/taco-rdf>

## Contact

- Vitória Maia
- GitHub: [@Victoria125](https://github.com/Victoria125)
- Email: vitoriamaia19@gmail.com
