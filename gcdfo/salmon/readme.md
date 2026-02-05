# `/gcdfo/salmon/`

This [W3ID](https://w3id.org) space provides a persistent IRI namespace for the **GC DFO Salmon Ontology**.

## Canonical IRIs

- Ontology IRI (latest): `https://w3id.org/gcdfo/salmon`
- Term namespace (hash IRIs): `https://w3id.org/gcdfo/salmon#`
- Version IRIs: `https://w3id.org/gcdfo/salmon/X.Y.Z`

## Redirect targets (current)

The canonical IRIs above redirect (303) to the project’s GitHub Pages site:

- HTML docs (latest): `https://dfo-pacific-science.github.io/dfo-salmon-ontology/`
- Serializations (latest): `https://dfo-pacific-science.github.io/dfo-salmon-ontology/gcdfo.{ttl,owl,jsonld}`
- Version snapshots: `https://dfo-pacific-science.github.io/dfo-salmon-ontology/releases/X.Y.Z/`

## Content negotiation

Clients can retrieve a specific representation by setting the HTTP `Accept` header.

Examples:

```bash
curl -I https://w3id.org/gcdfo/salmon/
curl -I -H 'Accept: text/turtle' https://w3id.org/gcdfo/salmon/
curl -I -H 'Accept: application/rdf+xml' https://w3id.org/gcdfo/salmon/
curl -I -H 'Accept: application/ld+json' https://w3id.org/gcdfo/salmon/

curl -I https://w3id.org/gcdfo/salmon/0.0.999
curl -I -H 'Accept: application/ld+json' https://w3id.org/gcdfo/salmon/0.0.999
```

## Contact
This space is administered by:  

**Data Stewardship Unit, Fishery & Assessment Data Section**  
*Fisheries and Oceans Canada - Pacific Region*  

Brett Johnson, GitHub: [Br-Johnson](https://github.com/Br-Johnson)  
Melissa Morrison, GitHub: [mkmor](https://github.com/mkmor)


For questions and contributions, please submit a ticket or email us at:

GitHub issues: [dfo-salmon-ontology](https://github.com/dfo-pacific-science/dfo-salmon-ontology/issues)
Email: [FADS Data Stewardship Unit](mailto:FADSDataStewardship-GestiondesdonneesSFDA@dfo-mpo.gc.ca)
