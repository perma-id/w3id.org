# /sml/
This [W3ID](https://w3id.org) provides a persistent URI namespace for the normative CEN-EN 17632 resources.

[CEN-EN 17632][cen] is the European Standard “_Building information modelling (BIM) - Semantic modelling and linking (SML)_”.

[cen]: https://standards.cencenelec.eu/dyn/www/f?p=205:110:0::::FSP_PROJECT:67839&cs=13BE091B11208910B30E53F9215AFDE96

## Uses
This namespace contains 
SKOS terms,
an RDFS ontology,
an OWL extension,
and
SHACL shapes.

The ontology defines terms like 
`Activity`,
`AmountOfBulkMatter`,
`consistsOf`,
`DiscreteObject`,
`hasFunctionalPart`,
`hasUnit`,
`isImplementedBy`,
`PhysicalObject`.

The ontology refers to OWL Time, GeoSPARQL, and QUDT ontologies.

The ontology can be browsed from <https://docs.crow.nl/sml/>, where the constituent files may also be downloaded from. 

## Preferred Prefixes
```turtle
prefix sml-term: <https://w3id.org/sml/term#>
prefix sml:      <https://w3id.org/sml/def#>
```

## Contact
This space is administered by:

- **Stichting CROW**   
E-mail: <data@crow.nl>  
GitHub: [@redmer](https://github.com/redmer)
GitHub: [@RiX012](https://github.com/RiX012)
