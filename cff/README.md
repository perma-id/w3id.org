# /cff/

This [W3ID](https://w3id.org) provides a persistent URI namespace for Citation File Format (CFF) resources.

## Contact

This space is administered by:

*Stephan Druskat*
Berlin, Germany
<stephan.druskat@dlr.de>
GitHub: [sdruskat](https://github.com/sdruskat)
ORCID: [0000-0003-4925-7248](https://orcid.org/0000-0003-4925-7248)

## Redirection Rules

This section contains a general summary of the logic behind the redirection rules.

- `https://w3id.org/cff`:
  - `application/[schema+]json` --> *latest schema, raw*: `https://raw.githubusercontent.com/citation-file-format/citation-file-format/refs/heads/main/schema.json`
  - HTML: project website
- `https://w3id.org/cff/schema`:
  - `application/[schema+]json` --> *latest schema, raw*: `https://raw.githubusercontent.com/citation-file-format/citation-file-format/refs/heads/main/schema.json`
  - HTML: latest schema reference
- `https://w3id.org/cff/(schema/)?<schema-version>`:
  - `application/[schema+]json` --> *schema version, raw*: `https://raw.githubusercontent.com/citation-file-format/citation-file-format/refs/tags/<schema-version>/schema.json`
  - HTML: schema reference for version
- all others: project website
