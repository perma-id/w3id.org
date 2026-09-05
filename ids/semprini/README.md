# /semprini/

The namespace of the **Semprini metamodel ontology** — the shared `sem:` vocabulary that every
Semprini deployment binds to. It is on w3id.org so that resolution does not depend on any single
organization's domain.

Documentation, the vocabulary and the project: <https://juhakor.github.io/semprini/>

| URL | Resolves to |
|---|---|
| `https://w3id.org/semprini/ontology` | the ontology — Turtle for RDF `Accept` headers, HTML documentation otherwise |
| `https://w3id.org/semprini/ontology/X.Y.Z` | the same, for a frozen release |
| either of those + `/sem.ttl` | the Turtle document, bypassing negotiation |
| anything else under `/semprini/` | the same path on the project site |

Terms are hash IRIs (`…/ontology#Entity`), so every term request resolves the ontology document.
Only Turtle is published, so all RDF media types resolve to it. Redirects are `302`: the hosting
may move, the identifiers may not.

## Maintainer

Juha Korpela — [@JuhaKor](https://github.com/JuhaKor) — juha.korpela@datakor.fi, on behalf of
Datakor Consulting Oy, Finland.

Questions about the vocabulary belong on the
[project repository](https://github.com/JuhaKor/semprini/issues); changes to these redirects, in a
pull request here.
