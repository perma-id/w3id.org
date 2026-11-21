# /collabri/

This [W3ID](https://w3id.org) namespace provides persistent URIs for schemas
published by the Collabri open-source community
([github.com/collabri-community](https://github.com/collabri-community)).

## Uses

The namespace resolves locally-minted terms in Collabri's LinkML schemas.
Terms whose identity already lives in an external ontology (FIBO, ODRL,
FRAPO, PROV-O, PAV, SPAR/FaBiO, DCAT, DOAP, IAO, ADMS, schema.org, etc.) are
referenced by their canonical IRIs and are not minted under `/collabri/`.

Current schemas:

- **Core** &mdash; `https://w3id.org/collabri/core/`
  Foundational LinkML schema for contract-scoped Statements of Work:
  TaskTeam → Task → recursive Subtask → typed Deliverable subclasses
  (Activity, Data, Method, NarrativeDocument, Software, Standard);
  structured Objective / Metric / AcceptanceCriterion evaluation;
  datestamped BudgetEntry snapshots covering proposed / awarded / working /
  actual / encumbrance views; Milestone-gated Payment obligations; and a
  ChangeProposal / Approval layer ("GitHub for contracts"). Aligned with
  FIBO Contracts, ODRL, FRAPO, PROV-O, PAV, and others.
  Source: [collabri-community/core](https://github.com/collabri-community/core)

Term URIs resolve to per-term documentation pages in the LinkML-generated
schema browser hosted at
[collabri-community.github.io](https://collabri-community.github.io/).

## Contact

This namespace is administered by the following GitHub-handle maintainers
at [TISLab](https://tislab.org/):

- [@jmcmurry](https://github.com/jmcmurry)
- [@mellybelly](https://github.com/mellybelly)

Open an issue on [perma-id/w3id.org](https://github.com/perma-id/w3id.org)
or ping either maintainer on GitHub.
