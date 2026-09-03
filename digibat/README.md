# DIGIBAT

This [W3ID](https://w3id.org) provides a persistent URI namespace for the DIGIBAT
platform ontology (Imperial College London, Department of Chemical Engineering): an
application ontology for automated battery and electrocatalysis research workflows,
built on EMMO and BattINFO.

Source repository: https://github.com/<ORG>/digibat-ontology
Documentation and serialisations: https://<ORG>.github.io/digibat-ontology/

## Redirection rules

1. `https://w3id.org/digibat`                    --> `https://digibatatimperial.github.io/digibat-ontology/digibat{.html|.ttl}`
   Browser requests receive the HTML documentation; RDF requests receive the Turtle file.
   Alias: `https://w3id.org/digibat/`
2. `https://w3id.org/digibat/{VERSION}`          --> `https://digibatatimperial.github.io/digibat-ontology/versions/{VERSION}/digibat{.html|.ttl}`
   `{VERSION}` starts with a digit (e.g. `0.1.0`).
3. `https://w3id.org/digibat/item/{ID}`          --> `https://digibatatimperial.github.io/digibat-ontology/item.html#{ID}`
   Persistent identifiers for physical items and runs (e.g. `P042-CEL-7`).

## Contacts

Maintainers:
- Jingyu Feng ([Jingyu2020](https://github.com/Jingyu2020))

Contact: <group email>
- digibat@imperial.ac.uk
