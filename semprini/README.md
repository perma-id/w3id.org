# /semprini/

This W3ID space is the namespace of the **Semprini metamodel ontology**.

Semprini is an openly licensed compiler that turns the business models and taxonomies an
organization already maintains — in modelling tools and spreadsheets — into a governed RDF
knowledge graph held in a Git repository. Each adopting organization runs its own instance,
with its own base IRI for its own content, but every instance binds to one shared metamodel:
the `sem:` vocabulary published here. A SPARQL query, a SHACL shape or an agent written
against `sem:` therefore works against every instance.

That shared metamodel is the reason the namespace lives on w3id.org rather than on a company
domain: resolution must not depend on any single organization keeping a registration alive.

* Source repository: <https://github.com/JuhaKor/semprini>
* Published by: Datakor Consulting Oy, Finland
* Licence: the ontology is CC BY 4.0; the compiler is Apache-2.0

## Identifiers in this space

Metamodel terms are hash IRIs — for example `https://w3id.org/semprini/ontology#Entity`,
`https://w3id.org/semprini/ontology#Relationship`, `https://w3id.org/semprini/ontology#sourceRef`.
The fragment is not sent to the server, so every term request resolves the ontology document.

| URL | Resolves to |
|---|---|
| `https://w3id.org/semprini/` | Project home |
| `https://w3id.org/semprini/ontology` | The current ontology — see negotiation below |
| `https://w3id.org/semprini/ontology/X.Y.Z` | That released version of the ontology |
| `https://w3id.org/semprini/ontology/sem.ttl` | The Turtle document, bypassing negotiation |
| `https://w3id.org/semprini/ontology/X.Y.Z/sem.ttl` | That version's Turtle document, bypassing negotiation |
| anything else under `/semprini/` | The same path on the project site |

## Content negotiation

`https://w3id.org/semprini/ontology` is negotiated on the `Accept` header:

| `Accept` | Response |
|---|---|
| `text/turtle`, `application/x-turtle`, `application/rdf+xml`, `application/ld+json`, `application/n-triples`, `text/n3` | `ontology/sem.ttl` |
| anything else, including browsers and clients sending `*/*` | the HTML documentation |

The ontology is published in Turtle only, so all RDF media types resolve to the same Turtle
document. Clients expressing no preference get the documentation, which links to it.

```console
$ curl -sIL -H 'Accept: text/turtle' https://w3id.org/semprini/ontology
$ curl -sIL -H 'Accept: text/html'   https://w3id.org/semprini/ontology
```

## Versioning

The ontology carries its own version (`owl:versionInfo`), incremented independently of the
compiler that reads it. `https://w3id.org/semprini/ontology` always names the current version;
`https://w3id.org/semprini/ontology/X.Y.Z` names a frozen release, so a deployment can cite the
exact metamodel it was compiled against. Released version documents are never changed or
removed, and metamodel IRIs are permanent — terms are deprecated in place, never deleted or
reused.

Redirects use `302` rather than `301`, since the hosting location may change while the
identifiers may not.

## Maintainers

| Name | GitHub | Contact |
|---|---|---|
| Juha Korpela | [@JuhaKor](https://github.com/JuhaKor) | juha.korpela@datakor.fi |

Maintained on behalf of Datakor Consulting Oy. Please open an issue on the
[Semprini repository](https://github.com/JuhaKor/semprini/issues) for questions about the
vocabulary itself, and a pull request here for changes to the redirects.
