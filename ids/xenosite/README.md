# /xenosite/

Permanent identifier namespace for [XenoSite](https://xenosite.org/), a research
project developing computational methods for xenobiotic metabolism and chemical
reactivity, and for [XenoBase](https://swami.wustl.edu/xenobase/), its curated
reaction atlas.

## Purpose and status

`https://w3id.org/xenosite/` is the IRI namespace for XenoSite resources.

- **XenoBase catalogue accessions** under
  `https://w3id.org/xenosite/xenobase/` resolve to the live XenoBase site
  (see [`xenobase/`](xenobase/)).
- **Everything else** under `/xenosite/` still redirects to
  https://xenosite.org/ (interim landing) until further resource-specific
  resolution is added.

## XenoBase CURIEs

| CURIE | IRI | Page |
| --- | --- | --- |
| `xbr:…` | `https://w3id.org/xenosite/xenobase/reaction/…` | reaction |
| `xbm:…` | `https://w3id.org/xenosite/xenobase/molecule/…` | molecule |
| `xbn:…` | `https://w3id.org/xenosite/xenobase/network/…` | network |
| `xbs:…` | `https://w3id.org/xenosite/xenobase/site/…` | sites-of-metabolism table |

## Project background

XenoSite is an established research project from the Swamidass laboratory at
Washington University in St. Louis. Publications documenting the project include:

- Zaretzki, Matlock, and Swamidass (2013). *XenoSite: Accurately Predicting CYP-Mediated Sites of Metabolism with Neural Networks*. https://doi.org/10.1021/ci400518g
- Matlock, Hughes, and Swamidass (2015). *XenoSite server: a web-available site of metabolism prediction tool*. https://doi.org/10.1093/bioinformatics/btu761
- Hughes, Dang, Miller, and Swamidass (2016). *Modeling Reactivity to Biological Macromolecules with a Deep Multitask Network*. https://doi.org/10.1021/acscentsci.6b00162
- Dang, Matlock, Hughes, and Swamidass (2020). *The Metabolic Rainbow: Deep Learning Phase I Metabolism in Five Colors*. https://doi.org/10.1021/acs.jcim.9b00836

## Maintainer

#### S. Joshua Swamidass
- GitHub username: [swamidass](https://github.com/swamidass)
- Organization: [swamidasslab](https://github.com/swamidasslab)
- Contact: https://github.com/swamidasslab/w3id.org/issues
