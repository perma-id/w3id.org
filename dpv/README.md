# /dpv

This [w3id](https://w3id.org/) provides a persistent URI namespace for Data Privacy Vocabulary (DPV) and other DPVCG resources. The Data Privacy Vocabulary (DPV) provides concepts to describe and represent information about processing of personal data.

## Uses

```
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| prefix             | w3id                                         | HTML                                                                 | RDF                                                                 |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| dpv                | https://w3id.org/dpv                         | https://w3c.github.io/dpv/2.0/dpv                                    | https://w3c.github.io/dpv/2.0/dpv/dpv.rdf                           |
| dpv-owl            | https://w3id.org/dpv/owl                     | https://w3c.github.io/dpv/2.0/dpv/dpv-owl.html                       | https://w3c.github.io/dpv/2.0/dpv/dpv-owl.rdf                       |
| dpv                | https://w3id.org/dpv/1.0                     | https://w3c.github.io/dpv/1.0/dpv                                    | https://w3c.github.io/dpv/1.0/dpv/dpv.rdf                           |
| dpv-owl            | https://w3id.org/dpv/1.0/dpv-owl             | https://w3c.github.io/dpv/1.0/dpv-owl                                | https://w3c.github.io/dpv/1.0/dpv-owl/dpv.rdf                       |
| dpv                | https://w3id.org/dpv/2.0                     | https://w3c.github.io/dpv/2.0/dpv                                    | https://w3c.github.io/dpv/2.0/dpv/dpv.rdf                           |
| dpv-owl            | https://w3id.org/dpv/2.0/owl                 | https://w3c.github.io/dpv/2.0/dpv/dpv-owl.html                       | https://w3c.github.io/dpv/2.0/dpv/dpv-owl.rdf                       |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| pd                 | https://w3id.org/dpv/pd                      | https://w3c.github.io/dpv/2.0/pd                                     | https://w3c.github.io/dpv/2.0/pd/pd.rdf                             |
| pd-owl             | https://w3id.org/dpv/pd/owl                  | https://w3c.github.io/dpv/2.0/pd/pd-owl.html                         | https://w3c.github.io/dpv/2.0/pd/pd-owl.rdf                         |
| pd                 | https://w3id.org/dpv/1.0/dpv-pd              | https://w3c.github.io/dpv/1.0/dpv-pd                                 | https://w3c.github.io/dpv/1.0/dpv-pd/dpv-pd.rdf                     |
| pd-owl             | https://w3id.org/dpv/1.0/dpv-owl/dpv-pd      | https://w3c.github.io/dpv/1.0/dpv-owl/dpv-pd                         | https://w3c.github.io/dpv/1.0/dpv-owl/dpv-pd/dpv-pd.rdf             |
| pd                 | https://w3id.org/dpv/2.0/pd                  | https://w3c.github.io/dpv/2.0/pd                                     | https://w3c.github.io/dpv/2.0/pd/pd.rdf                             |
| pd-owl             | https://w3id.org/dpv/2.0/pd/owl              | https://w3c.github.io/dpv/2.0/pd/pd-owl.html                         | https://w3c.github.io/dpv/2.0/pd/pd-owl.rdf                         |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| tech               | https://w3id.org/dpv/tech                    | https://w3c.github.io/dpv/2.0/tech                                   | https://w3c.github.io/dpv/2.0/tech/tech.rdf                         |
| tech-owl           | https://w3id.org/dpv/tech/owl                | https://w3c.github.io/dpv/2.0/tech/tech-owl.html                     | https://w3c.github.io/dpv/2.0/tech/tech-owl.rdf                     |
| tech               | https://w3id.org/dpv/1.0/dpv-tech            | https://w3c.github.io/dpv/1.0/dpv-tech                               | https://w3c.github.io/dpv/1.0/dpv-tech/dpv-tech.rdf                 |
| tech-owl           | https://w3id.org/dpv/1.0/dpv-owl/dpv-tech    | https://w3c.github.io/dpv/1.0/dpv-owl/dpv-tech                       | https://w3c.github.io/dpv/1.0/dpv-owl/dpv-tech/dpv-tech.rdf         |
| tech               | https://w3id.org/dpv/2.0/tech                | https://w3c.github.io/dpv/2.0/tech                                   | https://w3c.github.io/dpv/2.0/tech/tech.rdf                         |
| tech-owl           | https://w3id.org/dpv/2.0/tech/owl            | https://w3c.github.io/dpv/2.0/tech/tech-owl.html                     | https://w3c.github.io/dpv/2.0/tech/tech-owl.rdf                     |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| loc                | https://w3id.org/dpv/loc                     | https://w3c.github.io/dpv/2.0/loc                                    | https://w3c.github.io/dpv/2.0/loc/loc.rdf                           |
| loc-owl            | https://w3id.org/dpv/loc/owl                 | https://w3c.github.io/dpv/2.0/loc/loc-owl.html                       | https://w3c.github.io/dpv/2.0/loc/loc-owl.rdf                       |
| loc                | https://w3id.org/dpv/2.0/loc                 | https://w3c.github.io/dpv/2.0/loc                                    | https://w3c.github.io/dpv/2.0/loc/loc.rdf                           |
| loc-owl            | https://w3id.org/dpv/2.0/loc/owl             | https://w3c.github.io/dpv/2.0/loc/loc-owl.html                       | https://w3c.github.io/dpv/2.0/loc/loc-owl.rdf                       |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| risk               | https://w3id.org/dpv/risk                    | https://w3c.github.io/dpv/2.0/risk                                   | https://w3c.github.io/dpv/2.0/risk/risk.rdf                         |
| risk-owl           | https://w3id.org/dpv/risk/owl                | https://w3c.github.io/dpv/2.0/risk/risk-owl.html                     | https://w3c.github.io/dpv/2.0/risk/risk-owl.rdf                     |
| risk               | https://w3id.org/dpv/1.0/risk                | https://w3c.github.io/dpv/1.0/risk                                   | https://w3c.github.io/dpv/1.0/risk/risk.rdf                         |
| risk-owl           | https://w3id.org/dpv/1.0/dpv-owl/risk        | https://w3c.github.io/dpv/1.0/dpv-owl/risk                           | https://w3c.github.io/dpv/1.0/dpv-owl/risk/risk.rdf                 |
| risk               | https://w3id.org/dpv/2.0/risk                | https://w3c.github.io/dpv/2.0/risk                                   | https://w3c.github.io/dpv/2.0/risk/risk.rdf                         |
| risk-owl           | https://w3id.org/dpv/2.0/risk/owl            | https://w3c.github.io/dpv/2.0/risk/risk-owl.html                     | https://w3c.github.io/dpv/2.0/risk/risk-owl.rdf                     |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| legal              | https://w3id.org/dpv/legal                   | https://w3c.github.io/dpv/2.0/legal                                  | https://w3c.github.io/dpv/2.0/legal/legal.rdf                       |
| legal-owl          | https://w3id.org/dpv/legal/owl               | https://w3c.github.io/dpv/2.0/legal/legal-owl.html                   | https://w3c.github.io/dpv/2.0/legal/legal-owl.rdf                   |
| legal              | https://w3id.org/dpv/1.0/dpv-legal           | https://w3c.github.io/dpv/1.0/dpv-legal                              | https://w3c.github.io/dpv/1.0/dpv-legal/dpv-legal.rdf               |
| legal-owl          | https://w3id.org/dpv/1.0/dpv-owl/dpv-legal   | https://w3c.github.io/dpv/1.0/dpv-owl/dpv-legal                      | https://w3c.github.io/dpv/1.0/dpv-owl/dpv-legal/dpv-legal.rdf       |
| legal              | https://w3id.org/dpv/2.0/legal               | https://w3c.github.io/dpv/2.0/legal                                  | https://w3c.github.io/dpv/2.0/legal/legal.rdf                       |
| legal-owl          | https://w3id.org/dpv/2.0/legal/owl           | https://w3c.github.io/dpv/2.0/legal/legal-owl.html                   | https://w3c.github.io/dpv/2.0/legal/legal-owl.rdf                   |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| legal-[a-z]{2}     | https://w3id.org/dpv/legal/[a-z]{2}          | https://w3c.github.io/dpv/2.0/legal/[a-z]{2}                         | https://w3c.github.io/dpv/2.0/legal/[a-z]{2}/legal-[a-z]{2}.rdf     |
| legal-[a-z]{2}-owl | https://w3id.org/dpv/legal/[a-z]{2}/owl      | https://w3c.github.io/dpv/2.0/legal/[a-z]{2}/legal-[a-z]{2}-owl.html | https://w3c.github.io/dpv/2.0/legal/[a-z]{2}/legal-[a-z]{2}-owl.rdf |
| legal-[a-z]{2}     | https://w3id.org/dpv/2.0/legal/[a-z]{2}      | https://w3c.github.io/dpv/2.0/legal/[a-z]{2}                         | https://w3c.github.io/dpv/2.0/legal/[a-z]{2}/legal-[a-z]{2}.rdf     |
| legal-[a-z]{2}-owl | https://w3id.org/dpv/2.0/legal/[a-z]{2}/owl  | https://w3c.github.io/dpv/2.0/legal/[a-z]{2}/legal-[a-z]{2}-owl.html | https://w3c.github.io/dpv/2.0/legal/[a-z]{2}/legal-[a-z]{2}-owl.rdf |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| eu-gdpr            | https://w3id.org/dpv/legal/eu/gdpr           | https://w3c.github.io/dpv/2.0/legal/eu/gdpr                          | https://w3c.github.io/dpv/2.0/legal/eu/gdpr/eu-gdpr.rdf             |
| eu-gdpr-owl        | https://w3id.org/dpv/legal/eu/gdpr/owl       | https://w3c.github.io/dpv/2.0/legal/eu/gdpr/eu-gdpr-owl.html         | https://w3c.github.io/dpv/2.0/legal/eu/gdpr/eu-gdpr-owl.rdf         |
| eu-gdpr            | https://w3id.org/dpv/1.0/dpv-gdpr            | https://w3c.github.io/dpv/1.0/dpv-gdpr                               | https://w3c.github.io/dpv/1.0/dpv-gdpr/dpv-gdpr.rdf                 |
| eu-gdpr-owl        | https://w3id.org/dpv/1.0/dpv-owl/dpv-gdpr    | https://w3c.github.io/dpv/1.0/dpv-owl/dpv-gdpr                       | https://w3c.github.io/dpv/1.0/dpv-owl/dpv-gdpr/dpv-gdpr.rdf         |
| eu-gdpr            | https://w3id.org/dpv/2.0/legal/eu/gdpr       | https://w3c.github.io/dpv/2.0/legal/eu/gdpr                          | https://w3c.github.io/dpv/2.0/legal/eu/gdpr/eu-gdpr.rdf             |
| eu-gdpr-owl        | https://w3id.org/dpv/2.0/legal/eu/gdpr/owl   | https://w3c.github.io/dpv/2.0/legal/eu/gdpr/eu-gdpr-owl.html         | https://w3c.github.io/dpv/2.0/legal/eu/gdpr/eu-gdpr-owl.rdf         |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| eu-dga             | https://w3id.org/dpv/legal/eu/dga            | https://w3c.github.io/dpv/2.0/legal/eu/dga                           | https://w3c.github.io/dpv/2.0/legal/eu/dga/eu-dga.rdf               |
| eu-dga-owl         | https://w3id.org/dpv/legal/eu/dga/owl        | https://w3c.github.io/dpv/2.0/legal/eu/dga/eu-dga-owl.html           | https://w3c.github.io/dpv/2.0/legal/eu/dga/eu-dga-owl.rdf           |
| eu-dga             | https://w3id.org/dpv/2.0/legal/eu/dga        | https://w3c.github.io/dpv/2.0/legal/eu/dga                           | https://w3c.github.io/dpv/2.0/legal/eu/dga/eu-dga.rdf               |
| eu-dga-owl         | https://w3id.org/dpv/2.0/legal/eu/dga/owl    | https://w3c.github.io/dpv/2.0/legal/eu/dga/eu-dga-owl.html           | https://w3c.github.io/dpv/2.0/legal/eu/dga/eu-dga-owl.rdf           |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| eu-aiact           | https://w3id.org/dpv/legal/eu/aiact          | https://w3c.github.io/dpv/2.0/legal/eu/aiact                         | https://w3c.github.io/dpv/2.0/legal/eu/aiact/eu-aiact.rdf           |
| eu-aiact-owl       | https://w3id.org/dpv/legal/eu/aiact/owl      | https://w3c.github.io/dpv/2.0/legal/eu/aiact/eu-aiact-owl.html       | https://w3c.github.io/dpv/2.0/legal/eu/aiact/eu-aiact-owl.rdf       |
| eu-aiact           | https://w3id.org/dpv/2.0/legal/eu/aiact      | https://w3c.github.io/dpv/2.0/legal/eu/aiact                         | https://w3c.github.io/dpv/2.0/legal/eu/aiact/eu-aiact.rdf           |
| eu-aiact-owl       | https://w3id.org/dpv/2.0/legal/eu/aiact/owl  | https://w3c.github.io/dpv/2.0/legal/eu/aiact/eu-aiact-owl.html       | https://w3c.github.io/dpv/2.0/legal/eu/aiact/eu-aiact-owl.rdf       |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| eu-nis2            | https://w3id.org/dpv/legal/eu/nis2           | https://w3c.github.io/dpv/2.0/legal/eu/nis2                          | https://w3c.github.io/dpv/2.0/legal/eu/nis2/eu-nis2.rdf             |
| eu-nis2-owl        | https://w3id.org/dpv/legal/eu/nis2/owl       | https://w3c.github.io/dpv/2.0/legal/eu/nis2/eu-nis2-owl.html         | https://w3c.github.io/dpv/2.0/legal/eu/nis2/eu-nis2-owl.rdf         |
| eu-nis2            | https://w3id.org/dpv/2.0/legal/eu/nis2       | https://w3c.github.io/dpv/2.0/legal/eu/nis2                          | https://w3c.github.io/dpv/2.0/legal/eu/nis2/eu-nis2.rdf             |
| eu-nis2-owl        | https://w3id.org/dpv/2.0/legal/eu/nis2/owl   | https://w3c.github.io/dpv/2.0/legal/eu/nis2/eu-nis2-owl.html         | https://w3c.github.io/dpv/2.0/legal/eu/nis2/eu-nis2-owl.rdf         |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| eu-rights          | https://w3id.org/dpv/legal/eu/rights         | https://w3c.github.io/dpv/2.0/legal/eu/rights                        | https://w3c.github.io/dpv/2.0/legal/eu/rights/eu-rights.rdf         |
| eu-rights-owl      | https://w3id.org/dpv/legal/eu/rights/owl     | https://w3c.github.io/dpv/2.0/legal/eu/rights/eu-rights-owl.html     | https://w3c.github.io/dpv/2.0/legal/eu/rights/eu-rights-owl.rdf     |
| eu-rights          | https://w3id.org/dpv/1.0/rights/eu           | https://w3c.github.io/dpv/1.0/rights/eu                              | https://w3c.github.io/dpv/1.0/rights/eu/rights-eu.rdf               |
| eu-rights-owl      | https://w3id.org/dpv/1.0/dpv-owl/rights/eu   | https://w3c.github.io/dpv/1.0/dpv-owl/rights/eu                      | https://w3c.github.io/dpv/1.0/dpv-owl/rights/eu/rights-eu.rdf       |
| eu-rights          | https://w3id.org/dpv/2.0/legal/eu/rights     | https://w3c.github.io/dpv/2.0/legal/eu/rights                        | https://w3c.github.io/dpv/2.0/legal/eu/rights/eu-rights.rdf         |
| eu-rights-owl      | https://w3id.org/dpv/2.0/legal/eu/rights/owl | https://w3c.github.io/dpv/2.0/legal/eu/rights/eu-rights-owl.html     | https://w3c.github.io/dpv/2.0/legal/eu/rights/eu-rights-owl.rdf     |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| ai                 | https://w3id.org/dpv/ai                      | https://w3c.github.io/dpv/2.0/ai                                     | https://w3c.github.io/dpv/2.0/ai/ai.rdf                             |
| ai-owl             | https://w3id.org/dpv/ai/owl                  | https://w3c.github.io/dpv/2.0/ai/ai-owl.html                         | https://w3c.github.io/dpv/2.0/ai/ai-owl.rdf                         |
| ai                 | https://w3id.org/dpv/2.0/ai                  | https://w3c.github.io/dpv/2.0/ai                                     | https://w3c.github.io/dpv/2.0/ai/ai.rdf                             |
| ai-owl             | https://w3id.org/dpv/2.0/ai/owl              | https://w3c.github.io/dpv/2.0/ai/ai-owl.html                         | https://w3c.github.io/dpv/2.0/ai/ai-owl.rdf                         |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| justifications     | https://w3id.org/dpv/justifications          | https://w3c.github.io/dpv/2.0/justifications                         | https://w3c.github.io/dpv/2.0/justifications/justifications.rdf     |
| justifications-owl | https://w3id.org/dpv/justifications/owl      | https://w3c.github.io/dpv/2.0/justifications/justifications-owl.html | https://w3c.github.io/dpv/2.0/justifications/justifications-owl.rdf |
| justifications     | https://w3id.org/dpv/2.0/justifications      | https://w3c.github.io/dpv/2.0/justifications                         | https://w3c.github.io/dpv/2.0/justifications/justifications.rdf     |
| justifications-owl | https://w3id.org/dpv/2.0/justifications/owl  | https://w3c.github.io/dpv/2.0/justifications/justifications-owl.html | https://w3c.github.io/dpv/2.0/justifications/justifications-owl.rdf |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|
| primer             | https://w3id.org/dpv/primer                  | https://w3c.github.io/dpv/primer                                     | NIL                                                                 |
| guides             | https://w3id.org/dpv/guides                  | https://w3c.github.io/dpv/guides                                     | NIL                                                                 |
| examples           | https://w3id.org/dpv/examples                | https://w3c.github.io/dpv/examples                                   | https://w3c.github.io/dpv/examples/.*X.rdf                          |
| use-cases          | https://w3id.org/dpv/use-cases               | https://w3c.github.io/dpv/use-cases                                  | https://w3c.github.io/dpv/use-cases/.*X.rdf                         |
|--------------------+----------------------------------------------+----------------------------------------------------------------------+---------------------------------------------------------------------|

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

**Beatriz Esteves**

Contributor, [W3C Data Privacy Vocabularies and Controls Communit Group (DPVCG)](https://www.w3.org/community/dpvcg/)

Senior Researcher, [UGent](https://www.ugent.be/), [imec](https://www.imec-int.com/en), Belgium

email: [beatriz.esteves@ugent.be](mailto:beatriz.esteves@ugent.be)
