# EUDPP
This namespace is for the resources related to the EU dpp developed in the Cirpass-2 project (https://cirpass2.eu/)

This folder defines (currently draft) persistent IRIs under: `https://w3id.org/eudpp`

Requests to the namespace IRIs are redirected to the canonical, hosted ontology artefacts (Turtle `ttl`) on `dpp.vocabulary-hub.eu`.

## Redirect behavior

If a user enters an IRI in the **Module IRI** column, they are redirected to the URL in the **Redirect** column.

All redirects are currently implemented as **HTTP 303 (See Other)**.

### Core ontology (base IRI)

- `https://w3id.org/eudpp`
  → `https://dpp.vocabulary-hub.eu/api/ontology-version/OntologyVersion_086dd88c-15a4-4139-9b98-928d3d6b5b57/export?format=ttl`

### Modules

- `https://w3id.org/eudpp/CON`
  → `https://dpp.vocabulary-hub.eu/api/ontology-version/OntologyVersion_a50b649e-28cc-4107-a8e6-b69c3a401944/export?format=ttl`

- `https://w3id.org/eudpp/P_DPP`
  → `https://dpp.vocabulary-hub.eu/api/ontology-version/OntologyVersion_ab5a976e-95f4-4363-87c9-3abd11ee556b/export?format=ttl`

- `https://w3id.org/eudpp/ACTOR`
  → `https://dpp.vocabulary-hub.eu/api/ontology-version/OntologyVersion_e11d0f5e-fe86-4d51-86c4-53f9f66ac536/export?format=ttl`

- `https://w3id.org/eudpp/SOC`
  → `https://dpp.vocabulary-hub.eu/api/ontology-version/OntologyVersion_11fcca33-b738-476a-a029-be53a333d81b/export?format=ttl`

- `https://w3id.org/eudpp/LCA`
  → `https://dpp.vocabulary-hub.eu/api/ontology/-/version/OntologyVersion_f007b19e-b148-417a-8930-3b58e50fe7c7/export?format=ttl`

- `https://w3id.org/eudpp/COMP`
  → `https://dpp.vocabulary-hub.eu/api/ontology/-/version/OntologyVersion_1122b719-2ff4-4109-9620-22ae3ddee508/export?format=ttl`

- `https://w3id.org/eudpp/EVENT`
  → `https://dpp.vocabulary-hub.eu/api/ontology/-/version/OntologyVersion_d3d95451-f2ac-4b4d-b2d0-5b413754591b/export?format=ttl`

- `https://w3id.org/eudpp/MAT`
  → `https://dpp.vocabulary-hub.eu/api/ontology/-/version/OntologyVersion_978009d5-042d-4d13-9ed6-7885433c1bce/export?format=ttl`

- `https://w3id.org/eudpp/IDENT`
  → `https://dpp.vocabulary-hub.eu/api/ontology/-/version/OntologyVersion_c9a6ebca-870e-424c-9ed5-9a210d1b6558/export?format=ttl`

| Module name              | Module shortname | Developer/Accountable | Filename        |
|--------------------------|------------------|------------------------|-----------------|
| EU DPP Core Ontology     | CORE             | TalTech                | core.owl        |
| Connector                | Connector        | TalTech                | connector.owl   |
| Product and DPP          | P_DPP            | TalTech                | p_dpp.owl       |
| Actors                   | ACTOR            | TalTech                | actor.owl       |
| Substance of Concern     | SOC              | TalTech                | soc.owl         |
| Life Cycle Assessment    | LCA              | CEA                    | lca.rdf         |
| Compliance               | COMP             | PTB                    | compliance.owl  |
| Life Cycle Events        | EVENT            | GS1                    | event.tll       |
| Material                 | MAT              | TalTech                | material.owl    |
| Identifiers              | IDENT            | TalTech                | identifier.owl  |


Contacts
* Theodor Chirvasuta <theodor.chirvasuta@tno.nl> (GitHub: chirvasutatc)
