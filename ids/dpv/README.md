# /dpv

This [w3id](https://w3id.org/) provides a persistent URI namespace for Data Privacy Vocabulary (DPV) and other DPVCG resources. The Data Privacy Vocabulary (DPV) provides concepts to describe and represent information about processing of personal data.

## Uses

```
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| prefix                 | w3id                                        | HTML                                             | RDF                                                        |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| dpv                    | https://w3id.org/dpv/dpv                    | https://w3c.github.io/dpv/dpv                    | https://w3c.github.io/dpv/dpv.rdf                          |
| dpv-skos               | https://w3id.org/dpv/dpv-skos               | https://w3c.github.io/dpv/dpv-skos               | https://w3c.github.io/dpv/dpv-skos/dpv.rdf                 |
| dpv-owl                | https://w3id.org/dpv/dpv-owl                | https://w3c.github.io/dpv/dpv-owl                | https://w3c.github.io/dpv/dpv-owl/dpv.rdf                  |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| dpv-pd                 | https://w3id.org/dpv/dpv-pd                 | https://w3c.github.io/dpv/dpv-pd                 | https://w3c.github.io/dpv/dpv-pd/dpv-pd.rdf                |
| dpv-skos/dpv-pd        | https://w3id.org/dpv/dpv-skos/dpv-pd        | https://w3c.github.io/dpv/dpv-skos/dpv-pd        | https://w3c.github.io/dpv/dpv-skos/dpv-pd/dpv-pd.rdf       |
| dpv-owl/dpv-pd         | https://w3id.org/dpv/dpv-owl/dpv-pd         | https://w3c.github.io/dpv/dpv-owl/dpv-pd         | https://w3c.github.io/dpv/dpv-owl/dpv-pd/dpv-pd.rdf        |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| dpv-gdpr               | https://w3id.org/dpv/dpv-gdpr               | https://w3c.github.io/dpv/dpv-gdpr               | https://w3c.github.io/dpv/dpv-gdpr/dpv-gdpr.rdf            |
| dpv-skos/dpv-gdpr      | https://w3id.org/dpv/dpv-skos/dpv-gdpr      | https://w3c.github.io/dpv/dpv-skos/dpv-gdpr      | https://w3c.github.io/dpv/dpv-skos/dpv-gdpr/dpv-gdpr.rdf   |
| dpv-owl/dpv-gdpr       | https://w3id.org/dpv/dpv-owl/dpv-gdpr       | https://w3c.github.io/dpv/dpv-owl/dpv-gdpr       | https://w3c.github.io/dpv/dpv-owl/dpv-gdpr/dpv-gdpr.rdf    |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| dpv-gdpr/dpia          | https://w3id.org/dpv/dpv-gdpr/dpia          | https://w3c.github.io/dpv/dpv-gdpr/dpia          | NIL                                                        |
| dpv-skos/dpv-gdpr/dpia | https://w3id.org/dpv/dpv-skos/dpv-gdpr/dpia | https://w3c.github.io/dpv/dpv-skos/dpv-gdpr/dpia | NIL                                                        |
| dpv-owl/dpv-gdpr/dpia  | https://w3id.org/dpv/dpv-owl/dpv-gdpr/dpia  | https://w3c.github.io/dpv/dpv-owl/dpv-gdpr/dpia  | NIL                                                        |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| dpv-tech               | https://w3id.org/dpv/dpv-tech               | https://w3c.github.io/dpv/dpv-tech               | https://w3c.github.io/dpv/dpv-tech/dpv-tech.rdf            |
| dpv-skos/dpv-tech      | https://w3id.org/dpv/dpv-skos/dpv-tech      | https://w3c.github.io/dpv/dpv-skos/dpv-tech      | https://w3c.github.io/dpv/dpv-skos/dpv-tech/dpv-tech.rdf   |
| dpv-owl/dpv-tech       | https://w3id.org/dpv/dpv-owl/dpv-tech       | https://w3c.github.io/dpv/dpv-owl/dpv-tech       | https://w3c.github.io/dpv/dpv-owl/dpv-tech/dpv-tech.rdf    |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| dpv-legal              | https://w3id.org/dpv/dpv-legal              | https://w3c.github.io/dpv/dpv-legal              | https://w3c.github.io/dpv/dpv-legal/dpv-legal.rdf          |
| dpv-skos/dpv-legal     | https://w3id.org/dpv/dpv-skos/dpv-legal     | https://w3c.github.io/dpv/dpv-skos/dpv-legal     | https://w3c.github.io/dpv/dpv-skos/dpv-legal/dpv-legal.rdf |
| dpv-owl/dpv-legal      | https://w3id.org/dpv/dpv-owl/dpv-legal      | https://w3c.github.io/dpv/dpv-owl/dpv-legal      | https://w3c.github.io/dpv/dpv-owl/dpv-legal/dpv-legal.rdf  |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| rights                 | https://w3id.org/dpv/rights                 | https://w3c.github.io/dpv/rights                 | NIL                                                        |
| rights-eu              | https://w3id.org/dpv/rights/eu              | https://w3c.github.io/dpv/rights/eu              | https://w3c.github.io/dpv/rights/eu.rdf                    |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| risk                   | https://w3id.org/dpv/risk                   | https://w3c.github.io/dpv/risk                   | https://w3c.github.io/dpv/risk/risk.rdf                    |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|
| primer                 | https://w3id.org/dpv/primer                 | https://w3c.github.io/dpv/primer                 | NIL                                                        |
| guides                 | https://w3id.org/dpv/guides                 | https://w3c.github.io/dpv/guides                 | NIL                                                        |
| examples               | https://w3id.org/dpv/examples               | https://w3c.github.io/dpv/examples               | https://w3c.github.io/dpv/examples/.*X.rdf                 |
| use-cases              | https://w3id.org/dpv/use-cases              | https://w3c.github.io/dpv/use-cases              | https://w3c.github.io/dpv/use-cases/.*X.rdf                |
|------------------------+---------------------------------------------+--------------------------------------------------+------------------------------------------------------------|

```

# Contacts

**Harshvardhan J. Pandit**

Chair, [W3C Data Privacy Vocabularies and Controls Communit Group (DPVCG)](https://www.w3.org/community/dpvcg/)

Postdoctoral Researcher, [ADAPT Centre](https://www.adaptcentre.ie/), [Trinity College Dublin](https://www.tcd.ie/), Ireland

email: [me@harshp.com](mailto:me@harshp.com)
