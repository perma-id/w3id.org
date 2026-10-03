# /hector/
This [W3ID](https://w3id.org) provides a persistent URI namespace for [*HECTOR*](https://github.com/docuracy/hector/blob/main/README.md):
## Historical Economic Commodities: Terminologies, Ontologies, & Rates

| HECTOR Vector | Behaviour |
|---|---|
| `/about` | Redirects to the GitHub repository [docuracy/hector](https://github.com/docuracy/hector). |
| `/context` | The JSON-LD context (`context/hector.jsonld`). |
| `/dump` | Every record in one gzipped Turtle file (`dump/hector.ttl.gz`). |
| `/<path>` or `/<path>/` (a record, e.g. `/commodity/saffron`, `/unit/pound`, `/ontology`) | Content negotiation: `application/ld+json` or `application/json` → `<path>/ontology.json`; `text/turtle` → `<path>/ontology.ttl`; `application/rdf+xml` → `<path>/ontology.rdf`; anything else (browsers) → the site, `index.html?path=<path>`, which shows the record. mod_rewrite cannot weigh q-values, so a client listing several formats gets the first in that order. |
| `/<path>.<ext>` (a file: ledgers, the dump, the search index, a record's `ontology.json`) | Passed straight through to the same path on the site. |
| `/` | The site's landing page, whatever the `Accept` header. |

All targets are on GitHub Pages at <https://docuracy.github.io/hector/>. HECTOR is currently an
**alpha**: its records and URIs may change until its first tagged release.

## Contact

**[Stephen Gadd](https://www.wikidata.org/wiki/Q7609282)**<br/>
[Docuracy Ltd](https://docuracy.co.uk)<br/>
[Rotherhithe, UK](https://www.wikidata.org/wiki/Q2886632)<br/>
<stephen@docuracy.co.uk>  <br/>
GitHub: [docuracy](https://github.com/docuracy)<br/>
ORCID: [0000-0003-3060-0181](https://orcid.org/0000-0003-3060-0181)<br/>
