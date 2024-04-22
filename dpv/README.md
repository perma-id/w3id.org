# /dpv

This [w3id](https://w3id.org/) provides a persistent URI namespace for Data Privacy Vocabulary (DPV) and other DPVCG resources. The Data Privacy Vocabulary (DPV) provides concepts to describe and represent information about processing of personal data.

## Uses

```
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| prefix             | w3id                                     | HTML                                                        | RDF                                                             |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| dpv                | https://w3id.org/dpv                     | https://w3c.github.io/dpv/dpv                               | https://w3c.github.io/dpv/dpv/dpv.rdf                           |
| dpv-owl            | https://w3id.org/dpv/owl                 | https://w3c.github.io/dpv/dpv/dpv-owl                       | https://w3c.github.io/dpv/dpv/dpv-owlrdf                        |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| pd                 | https://w3id.org/dpv/pd                  | https://w3c.github.io/dpv/pd                                | https://w3c.github.io/dpv/pd/pd.rdf                             |
| pd-owl             | https://w3id.org/dpv/pd/owl              | https://w3c.github.io/dpv/pd/pd-owl                         | https://w3c.github.io/dpv/pd/pd-owl.rdf                         |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| tech               | https://w3id.org/dpv/tech                | https://w3c.github.io/dpv/tech                              | https://w3c.github.io/dpv/tech/tech.rdf                         |
| tech-owl           | https://w3id.org/dpv/tech/owl            | https://w3c.github.io/dpv/tech/tech-owl                     | https://w3c.github.io/dpv/tech/tech-owl.rdf                     |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| loc                | https://w3id.org/dpv/loc                 | https://w3c.github.io/dpv/loc                               | https://w3c.github.io/dpv/loc/loc.rdf                           |
| loc-owl            | https://w3id.org/dpv/loc/owl             | https://w3c.github.io/dpv/loc/loc-owl                       | https://w3c.github.io/dpv/loc/loc-owl.rdf                       |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| risk               | https://w3id.org/dpv/risk                | https://w3c.github.io/dpv/risk                              | https://w3c.github.io/dpv/risk/risk.rdf                         |
| risk-owl           | https://w3id.org/dpv/risk/owl            | https://w3c.github.io/dpv/risk/risk-owl                     | https://w3c.github.io/dpv/risk/risk-owl.rdf                     |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| tech               | https://w3id.org/dpv/tech                | https://w3c.github.io/dpv/tech                              | https://w3c.github.io/dpv/tech/tech.rdf                         |
| tech-owl           | https://w3id.org/dpv/tech/owl            | https://w3c.github.io/dpv/tech/tech-owl                     | https://w3c.github.io/dpv/tech/tech-owl.rdf                     |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| legal              | https://w3id.org/dpv/legal               | https://w3c.github.io/dpv/legal                             | https://w3c.github.io/dpv/legal/legal.rdf                       |
| legal-owl          | https://w3id.org/dpv/legal/owl           | https://w3c.github.io/dpv/legal/legal-owl                   | https://w3c.github.io/dpv/legal/legal-owl.rdf                   |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| legal-[a-z]{2}     | https://w3id.org/dpv/legal/[a-z]{2}      | https://w3c.github.io/dpv/legal/[a-z]{2}                    | https://w3c.github.io/dpv/legal/[a-z]{2}/legal-[a-z]{2}.rdf     |
| legal-[a-z]{2}-owl | https://w3id.org/dpv/legal/[a-z]{2}/owl  | https://w3c.github.io/dpv/legal/[a-z]{2}/legal-[a-z]{2}-owl | https://w3c.github.io/dpv/legal/[a-z]{2}/legal-[a-z]{2}-owl.rdf |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| eu-gdpr            | https://w3id.org/dpv/legal/eu/gdpr       | https://w3c.github.io/dpv/legal/eu/gdpr                     | https://w3c.github.io/dpv/legal/eu/gdpr/eu-gdpr.rdf             |
| eu-gdpr-owl        | https://w3id.org/dpv/legal/eu/gdpr/owl   | https://w3c.github.io/dpv/legal/eu/gdpr/eu-gdpr-owl         | https://w3c.github.io/dpv/legal/eu/gdpr/eu-gdpr-owl.rdf         |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| eu-dga             | https://w3id.org/dpv/legal/eu/dga        | https://w3c.github.io/dpv/legal/eu/dga                      | https://w3c.github.io/dpv/legal/eu/dga/eu-dga.rdf               |
| eu-dga-owl         | https://w3id.org/dpv/legal/eu/dga/owl    | https://w3c.github.io/dpv/legal/eu/dga-owl                  | https://w3c.github.io/dpv/legal/eu/dga/eu-dga-owl.rdf           |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| eu-aiact           | https://w3id.org/dpv/legal/eu/aiact      | https://w3c.github.io/dpv/legal/eu/aiact                    | https://w3c.github.io/dpv/legal/eu/aiact/eu-aiact.rdf           |
| eu-aiact-owl       | https://w3id.org/dpv/legal/eu/aiact/owl  | https://w3c.github.io/dpv/legal/eu/aiact-owl                | https://w3c.github.io/dpv/legal/eu/aiact/eu-aiact-owl.rdf       |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| eu-rights          | https://w3id.org/dpv/legal/eu/rights     | https://w3c.github.io/dpv/legal/eu/rights                   | https://w3c.github.io/dpv/legal/eu/rights/eu-rights.rdf         |
| eu-rights-owl      | https://w3id.org/dpv/legal/eu/rights/owl | https://w3c.github.io/dpv/legal/eu/rights-owl               | https://w3c.github.io/dpv/legal/eu/rights/eu-rights-owl.rdf     |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|
| primer             | https://w3id.org/dpv/primer              | https://w3c.github.io/dpv/primer                            | NIL                                                             |
| guides             | https://w3id.org/dpv/guides              | https://w3c.github.io/dpv/guides                            | NIL                                                             |
| examples           | https://w3id.org/dpv/examples            | https://w3c.github.io/dpv/examples                          | https://w3c.github.io/dpv/examples/.*X.rdf                      |
| use-cases          | https://w3id.org/dpv/use-cases           | https://w3c.github.io/dpv/use-cases                         | https://w3c.github.io/dpv/use-cases/.*X.rdf                     |
|--------------------+------------------------------------------+-------------------------------------------------------------+-----------------------------------------------------------------|

|-----------------------------------------+----------------------------------------|
| old url                                 | redirect url                           |
|-----------------------------------------+----------------------------------------|
| https://w3id.org/dpv/dpv-skos           | https://w3id.org/dpv                   |
| https://w3id.org/dpv/dpv-skos/dpv-pd    | https://w3id.org/dpv/pd                |
| https://w3id.org/dpv/dpv-skos/dpv-gdpr  | https://w3id.org/dpv/legal/eu/gdpr     |
| https://w3id.org/dpv/dpv-skos/dpv-dga   | https://w3id.org/dpv/legal/eu/dga      |
| https://w3id.org/dpv/dpv-skos/dpv-tech  | https://w3id.org/dpv/tech              |
| https://w3id.org/dpv/dpv-skos/dpv-legal | https://w3id.org/dpv/loc               |
| https://w3id.org/dpv/dpv-owl            | https://w3id.org/dpv/owl               |
| https://w3id.org/dpv/dpv-owl/dpv-pd     | https://w3id.org/dpv/pd/owl            |
| https://w3id.org/dpv/dpv-owl/dpv-gdpr   | https://w3id.org/dpv/legal/eu/gdpr/owl |
| https://w3id.org/dpv/dpv-owl/dpv-dga    | https://w3id.org/dpv/legal/eu/dga/owl  |
| https://w3id.org/dpv/dpv-owl/dpv-tech   | https://w3id.org/dpv/tech/owl          |
| https://w3id.org/dpv/dpv-owl/dpv-legal  | https://w3id.org/dpv/loc/owl           |
|-----------------------------------------+----------------------------------------|
```

# Contacts

**Harshvardhan J. Pandit**

Chair, [W3C Data Privacy Vocabularies and Controls Communit Group (DPVCG)](https://www.w3.org/community/dpvcg/)

Assistant Professor, [ADAPT Centre](https://www.adaptcentre.ie/), [Dublin City University](https://www.dcu.ie/), Ireland

email: [me@harshp.com](mailto:me@harshp.com)
