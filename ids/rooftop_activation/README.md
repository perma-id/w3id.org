# Rooftop Activation Ontology

[![Documentation](https://img.shields.io/badge/docs-GitHub%20Pages-blue)](https://YOUR-USER.github.io/REPO-NAME/)
[![License: CC BY 4.0](https://img.shields.io/badge/license-CC%20BY%204.0-lightgrey)](LICENSE)
[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.XXXXXXX-blue)](https://doi.org/10.5281/zenodo.XXXXXXX)

The Rooftop Activation Ontology describes how building rooftops can be activated
through colour-coded activation types (blue, green, yellow, red, purple, orange
and gray) defined by the functions they host, such as water management,
vegetation, energy generation, social use or mobility. It links rooftops and
buildings to their attributes, owners, urban districts and the urban challenges
they address, and classifies the incentives that regions implement to support
activation by nature, function, funding source, allocation mechanism, obligation
attachment and project stage. Users can register weighted associations between
rooftop activation types, urban challenges, owner types and incentive types,
optionally per region.

| Item | Value |
|---|---|
| Ontology name | Rooftop Activation Ontology |
| Ontology IRI | `https://w3id.org/rooftop_activation` |
| Version IRI | `https://w3id.org/rooftop_activation/2.0.0` |
| Prefix | `rooftop_activation` |
| Namespace URI | `https://w3id.org/rooftop_activation#` |
| Current version | 2.0.0 |
| Status | Published |
| Documentation | https://alejandro3500.github.io/Rooftop_activation_ontology/README.md |
| Serialisations | [Turtle](https://alejandro3500.github.io/Rooftop_activation_ontology/ontology.ttl), [RDF/XML](https://alejandro3500.github.io/Rooftop_activation_ontology/ontology.xml), [JSON-LD](https://alejandro3500.github.io/Rooftop_activation_ontology/ontology.jsonld), [N-Triples](https://alejandro3500.github.io/Rooftop_activation_ontology/ontology.nt) |
| Licence | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| Creator | Alejandro Morales Hernandez ([ORCID 0000-0003-0053-4902](https://orcid.org/0000-0003-0053-4902)) |
| Publisher | [Université libre de Bruxelles](https://ror.org/01r9htc13) |
| Repository | https://github.com/alejandro3500/Rooftop_activation_ontology.git |

## Namespace and prefix

```turtle
@prefix rooftop_activation: <https://w3id.org/rooftop_activation#> .
```

## Scope

The ontology covers five areas:

- **Rooftops and buildings.** Rooftops (`Rooftop`) are parts of buildings and are classified by activation type (`Blue_Rooftop`, `Green_Rooftop`, `Yellow_Rooftop`, `Red_Rooftop`, `Purple_Rooftop`, `Orange_Rooftop`, `Gray_Rooftop`), defined by the functions they host (`Rooftop_Function`), and by geometry (`Rooftop_Type`). Buildings have attributes such as construction era, material, height, location and primary use. The construction era is derived from the construction year.
- **Urban context.** Buildings are located in districts (`District`), classified by function and density, which belong to regions (`Region`).
- **Owners.** Owner types (`Owner`), such as home owner associations, housing corporations, landlords or private individuals, aligned with `foaf:Person` and `org:Organization`.
- **Urban challenges.** Challenges (`Urban_Challenge`) grouped into themes such as climate adaptation, affordable housing, decarbonising energy systems, mobility or governance.
- **Incentives.** Incentive instruments (`Incentive`) classified by nature, function, funding source, allocation mechanism, obligation attachment and project stage.

Weighted links between these types are registered as individuals of `Rooftop_Challenge_Association`, `Owner_Rooftop_Association` and `Incentive_Owner_Association`, each carrying a degree from 0 to 1 and optionally a region. See [docs/association_degrees_documentation.md](docs/association_degrees_documentation.md) for how to register associations and query them.

## Repository structure

```
.
├── .github/workflows/publish-docs.yml   CI that builds the docs and deploys GitHub Pages
├── ontology/
│   ├── rooftop_activation_ontology.rdf          the ontology (RDF/XML), edited in Protege
│   ├── rooftop_activation_ontology.properties   WIDOCO configuration file
│   ├── catalog-v001.xml                         Protege catalog redirecting imports to local copies
│   ├── geo.ttl                                  local copy of GeoSPARQL 1.1, used by the catalog
│   ├── metadata-template.ttl                    annotations to paste into the ontology header
│   └── README.md                                notes on the files in this folder
├── docs/
│   └── association_degrees_documentation.md   how to register and query association degrees
├── examples/                            example instance data
├── queries/                             competency questions as SPARQL
├── w3id/                                .htaccess to submit to w3id.org
├── scripts/build-docs.sh                local documentation build
├── CITATION.cff
├── CONTRIBUTING.md
├── BE-OLS-SUBMISSION.md                 pre-filled submission form for the BE-OLS catalogue
└── LICENSE
```

## Reusing the ontology

Import it directly:

```turtle
@prefix owl: <http://www.w3.org/2002/07/owl#> .
<https://example.org/my-dataset> a owl:Ontology ;
    owl:imports <https://w3id.org/rooftop_activation> .
```

Or download a serialisation from the documentation page.

The ontology imports the BIMERR Building ontology and GeoSPARQL 1.1, so both
must be reachable when the ontology is loaded with its imports.

## Building the documentation locally

```bash
./scripts/build-docs.sh
```

Requires Java 11 or newer. The script downloads WIDOCO and writes the site to
`site/`. See [docs/DOCUMENTATION.md](DOCUMENTATION.md) for the full procedure.

## Related ontologies

Imported:

- [BIMERR Building ontology](http://bimerr.iot.linkeddata.es/def/building#): `Rooftop` is a subclass of its `Roof` class, and its `Building` class is used for buildings.
- [GeoSPARQL 1.1](http://www.opengis.net/ont/geosparql): `District` and `Region` are subclasses of `geo:Feature`.

Aligned (referenced, not imported):

- [W3C Organization Ontology](http://www.w3.org/ns/org#): organisational owner types are subclasses of `org:Organization`.
- [FOAF](http://xmlns.com/foaf/0.1/): individual owner types are subclasses of `foaf:Person`.

Metadata vocabularies: [DCMI Metadata Terms](http://purl.org/dc/terms/), [VANN](http://purl.org/vocab/vann/), [BIBO](http://purl.org/ontology/bibo/).

## Citation

See [CITATION.cff](CITATION.cff), or cite as:

> Morales Hernandez, A. (2026). *Rooftop Activation Ontology* (Version 2.0.0).
> Université libre de Bruxelles. https://w3id.org/rooftop_activation

## Acknowledgements

This ontology has been developed as part of
[MultiRoofs](https://multiroofs.nweurope.eu/), an Interreg North-West Europe
project co-funded by the European Union.

## Licence

The ontology and this documentation are licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Code in `scripts/`
is licensed under the MIT licence.

## Contact

Alejandro Morales Hernandez, Université libre de Bruxelles <br>
ORCID: [0000-0003-0053-4902](https://orcid.org/0000-0003-0053-4902) <br>
E-mail: alejandro.morales.hernandez@ulb.be, alejandro.morales.hern2014@gmail.com <br>
Issues: https://github.com/alejandro3500/Rooftop_activation_ontology/issues
