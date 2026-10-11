headwater
=========

Namespace for Headwater, a documentation governance system. Identifiers under
this namespace appear in taxonomy schemas and validation shapes that the tool
emits, so they have to outlive any domain the project happens to rent.

Prefixes
* https://w3id.org/headwater/taxonomy/ -- taxonomy schemas (LinkML)
* https://w3id.org/headwater/shapes/ -- validation shapes (SHACL)

Homepages
* https://headwater.tools/ -- project home
* https://headwater.tools/ns/ -- namespace documentation

Docs
* https://github.com/headwater-ai/headwater -- source and specification

Contact
* James Baxter james AT baxter DOT consulting @jameswbaxter

Notes
* Redirects are temporary (302) while the site settles, and become permanent
  (301) after that.
* Requests for text/turtle or application/rdf+xml resolve to a .ttl
  serialization. Everything else resolves to the documentation.
