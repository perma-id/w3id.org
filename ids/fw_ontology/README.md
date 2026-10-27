# w3id.org/fw_ontology

Redirections for the FW Ontology (classes and properties for uncertain, vague and fuzzy/wobbly data, NFDI4Objects TWG
FuzzyWobblySW). Copy the file `.htaccess` of this folder into the folder `fw_ontology/` of a fork of
[perma-id/w3id.org](https://github.com/perma-id/w3id.org) and open a pull request. If that folder exists already,
compare first and merge by hand.

| Address | Leads to |
|---|---|
| https://w3id.org/fw_ontology/ | https://caa-datadragons.github.io/FW_Ontology/ (HTML); Turtle, RDF/XML and JSON-LD by content negotiation (`ontology.ttl`, `.rdf`, `.jsonld`) |
| https://w3id.org/fw_ontology/UncertainValue (any term) | the HTML page at that term (`#UncertainValue`); for RDF the whole ontology file |

The GitHub Pages site exists only after the workflow `Documentation` has run once on `main`, with
Settings, Pages, Source set to "GitHub Actions".

## Contacts

- Florian Thiery, florian.thiery@leiza.de, @florianthiery
