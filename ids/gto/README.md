# /gto/

Persistent identifiers for the resources published by
[GoTriple](https://www.gotriple.eu), the discovery platform for the social
sciences and humanities built by the [TRIPLE](https://project.gotriple.eu)
project.

    https://w3id.org/gto/{type}/{reference}

| segment | value |
|---|---|
| `{type}` | the entity type spelled out: `document`, `dataset`, `media-object`, `semantic-artefact`, `project`, `profile` |
| `{reference}` | the ARK name of the resource, without its NAAN |

`{reference}` is deliberately the same string as the last segment of the
resource's ARK, so `<https://w3id.org/gto/document/x54g7>` and
`ark:64989/x54g7` denote the same resource by construction rather than by a
lookup table.

## Resolution

This space holds a single rule: every request is forwarded with a `302` to the
resource's **complete ARK** on the GoTriple knowledge graph, path and `Accept` header
untouched.

    https://w3id.org/gto/document/x54g7
      302 -> https://kg.gotriple.eu/ark:64989/x54g7

The `{type}` segment is not carried over: the ARK name is already unique inside
NAAN `64989`, so it identifies the resource on its own. Content negotiation
(HTML for people, RDF for machines) and the `404` of an unknown name are decided
by the knowledge graph, not here.

The target and the NAAN are deployment facts rather than naming decisions, and
changing them is a routine pull request against this repository; the
`w3id.org/gto/…` IRIs themselves never move, which is the point of this
indirection.

The prefix root, `https://w3id.org/gto/`, is not a resource: it redirects to
<https://kg.gotriple.eu>, the knowledge graph these identifiers belong to. The
rules that govern the space are the
[URI conventions](https://github.com/atrium-research/triple-ontology/blob/main/URI-CONVENTIONS.md)
of the TRIPLE ontology.

## Not in this space

The TRIPLE ontology is a **different namespace on purpose**: terms
(`triple:Document`, `triple:hasContentType`) live at
`https://gotriple.eu/ontology/triple/` and are versioned with the ontology,
while resource IRIs are minted continuously and must survive independently of
any ontology release. The ontology is documented at
<https://github.com/atrium-research/triple-ontology> and is not served from
here.

## Contact

This space is administered by:

Alessandro Bertozzi — GitHub username:
[AlessandroBertozzi](https://github.com/AlessandroBertozzi)
