# /whg/
This [W3ID](https://w3id.org) provides a persistent URI namespace for the World Historical Gazetteer (WHG) identifiers.
## World Historical Gazetteer

A resolver namespace for WHG place identifiers. Identifiers resolve via a 303 redirect to the WHG Entity API.

| WHG Vector      | Behaviour |
|----------------|-----------|
| `/`            | If the client accepts HTML, redirects (303) to `https://whgazetteer.org/`. If the client accepts JSON/JSON-LD, redirects (303) to `https://whgazetteer.org/api/schema/`. Otherwise returns HTTP 404. |
| `/id/{id}`     | If the client accepts HTML, redirects (303) to `https://whgazetteer.org/entity/{id}/`. If the client accepts JSON/JSON-LD, redirects (303) to `https://whgazetteer.org/entity/{id}/api`. Otherwise returns HTTP 404. |
| `*`            | Returns HTTP 404 (no fallback to the main website). |

> **Note:** Identifiers are path-style. For example, `whg:place:169687` expands to `https://w3id.org/whg/id/place:169687`.

## Contact

**[Stephen Gadd](https://www.wikidata.org/wiki/Q7609282)**<br/>
[Docuracy Ltd](https://docuracy.co.uk)<br/>
[Rotherhithe, UK](https://www.wikidata.org/wiki/Q2886632)<br/>
<stephen@docuracy.co.uk>  <br/>
GitHub: [docuracy](https://github.com/docuracy)<br/>
ORCID: [0000-0003-3060-0181](https://orcid.org/0000-0003-3060-0181)<br/>
