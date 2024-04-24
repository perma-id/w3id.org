
# /isample/vocabulary/sampledfeature/

**Name of the project:** [iSamples](https://isamplesorg.github.io/home/)

**Description:** redirects for the iSamples sampled feature vocabulary

request to https://w3id.org/isample/vocabulary/sampledfeature will return the ESIP COR pylode view of the vocabulary

catches https://w3id.org/isample/vocabulary/sampledfeature/{term}
or  https://w3id.org/isample/vocabulary/sampledfeature/0.9/{term}

redirects are handled by resolver at the ESIP Community Ontology Registry; the http://cor.esipfed.org/ont/api/v0/ont endpoint can handle content negotiation with accept values: text/html, text/turtle, text/csv, application/rdf+xml. see http://cor.esipfed.org/ontapi/.


**Contacts:**
* Stephen Richard <smrTucson@gmail.com> - GitHub: https://github.com/smrgeoinfo
* Dave Vieglais <dave.vieglais@gmail.com>  