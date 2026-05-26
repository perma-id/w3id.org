# /collabri/

This [W3ID](https://w3id.org) namespace provides persistent URIs for schemas
published by Collabri ([github.com/collabri-io](https://github.com/collabri-io)).

## Uses

The namespace resolves locally-minted terms in Collabri's LinkML schemas.
Terms whose identity already lives in an external ontology (FIBO, ODRL,
FRAPO, PROV-O, PAV, SPAR/FaBiO, DCAT, DOAP, IAO, ADMS, schema.org, etc.) are
referenced by their canonical IRIs and are not minted under `/collabri/`.

Current schemas:

- **Statement of Work (SOW)** &mdash; `https://w3id.org/collabri/sow/`
  LinkML schema for contract-scoped Statements of Work: TaskTeam (root) →
  Task → recursive Subtasks → typed Deliverables, with PROV/PAV versioning
  and a ChangeProposal / Approval layer (&ldquo;GitHub for contracts&rdquo;).
  Aligned with FIBO Contracts, ODRL, FRAPO, PROV-O, PAV, and others.

Term URIs resolve to per-term documentation pages in the LinkML-generated
schema browser hosted at
[collabri-io.github.io](https://collabri-io.github.io/).

## Contact

This namespace is administered by the following GitHub-handle maintainers
at [TISLab](https://tislab.org/):

- [@jmcmurry](https://github.com/jmcmurry)
- [@mellybelly](https://github.com/mellybelly)

Open an issue on [perma-id/w3id.org](https://github.com/perma-id/w3id.org)
or ping either maintainer on GitHub.
