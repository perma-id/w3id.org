# /hector/
This [W3ID](https://w3id.org) provides a persistent URI namespace for [*HECTOR*](https://github.com/docuracy/hector/blob/main/README.md):
## Historical Economic Commodities: Terminologies, Ontologies, & Rates

| HECTOR Vector      | Behaviour |
|--------------------|-----------|
| `/about/`   | Redirects to the GitHub repository [docuracy/hector](https://github.com/docuracy/hector). |
| `/context/` | Returns the JSON-LD context (`context/hector.jsonld`) to support JSON-LD processing. |
| `/*`        | Default access: returns the JSON-LD representation of the ontology (`ontology.json`) for semantic clients. Browsers are redirected to a SPA entry point (`index.html`). |

> **Note:** Content negotiation is used to serve JSON-LD to semantic clients and HTML to browsers. RDF formats are planned for future implementation.

## Contact

**[Stephen Gadd](https://www.wikidata.org/wiki/Q7609282)**<br/>
[Docuracy Ltd](https://docuracy.co.uk)<br/>
[Rotherhithe, UK](https://www.wikidata.org/wiki/Q2886632)<br/>
<stephen@docuracy.co.uk>  <br/>
GitHub: [docuracy](https://github.com/docuracy)<br/>
ORCID: [0000-0003-3060-0181](https://orcid.org/0000-0003-3060-0181)<br/>
