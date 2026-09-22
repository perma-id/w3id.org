# w3id.org/adiro

Permanent, resolvable identifiers for **ADIRO** — *AEC Drawing Information
Representation Ontologies*: an open bundle of OWL/TTL ontologies that make
Architecture / Engineering / Construction drawings machine-readable (drawing
metadata, cross-discipline symbols, and domain-specific symbols).

| | |
|---|---|
| **Project / source** | https://github.com/BuroHappoldMachineLearning/ADIRO |
| **Documentation** | https://burohappoldmachinelearning.github.io/ADIRO/ |
| **Maintainer** | Buro Happold — Machine Learning R&D |

## Resolution

`.htaccess` performs HTTP `Accept`-header content negotiation, redirecting (302)
to the ADIRO GitHub Pages site:

- `https://w3id.org/adiro/<module>` — the latest ontology IRI:
  - RDF clients (`Accept: text/turtle`, `application/rdf+xml`, …) → the Turtle file;
  - browsers (`Accept: text/html`) → the HTML documentation.
- `https://w3id.org/adiro/<module>/<x.y.z>` — a specific version → that version's Turtle.
- explicit file URLs (`…/<module>.ttl`, `…/<module>.html`) are passed through unchanged.

## Maintainers / contact

Buro Happold — Machine Learning R&D:

- Alessio Lombardi — [@alelom](https://github.com/alelom) &lt;alessio.lombardi@burohappold.com&gt;
- Ahmed Elnagar — [@AhmedElnagar1](https://github.com/AhmedElnagar1) &lt;ahmed.elnagar@burohappold.com&gt;
- Sepehr Najjarpour — [@sn-bh](https://github.com/sn-bh) &lt;sepehr.najjarpour@burohappold.com&gt;
- Tianyang Huang — [@BH-Tianyang](https://github.com/BH-Tianyang) &lt;tianyang.huang@burohappold.com&gt;
- Ahmed Zalouk — [@Zaalouk122576](https://github.com/Zaalouk122576) &lt;ahmed.zalouk@burohappold.com&gt;
