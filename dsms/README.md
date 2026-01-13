# DSMS Persistent Identifiers

This directory defines persistent HTTP identifiers for vocabularies
published by the **Data Space Management System (DSMS)**.

The identifiers are hosted under `https://w3id.org/dsms/` and are intended
to be stable, long-term URIs for RDF vocabularies and terms.

---

## URI Pattern

The following URI patterns are supported:

- https://w3id.org/dsms/<namespace>/<term>
- https://w3id.org/dsms/<namespace>/<usecase>/<term>
  
Where:

- `<namespace>` is the vocabulary namespace (e.g. `steel`, `battery`)
- `<usecase>` is an optional grouping or application context
- `<term>` is the vocabulary term identifier

Examples:

- https://w3id.org/dsms/steel/Material
- https://w3id.org/dsms/steel/Gleeble/Strain

## URI Pattern

All DSMS identifiers redirect to human-readable documentation hosted at:

https://kiran.materials-data.space/vocabulary/docs/

The redirection rules are:

| w3id URI | Redirects to |
|:--------:|:-------------:|
| `/dsms/steel/Material` | `/vocabulary/docs/steel#Material` |
| `/dsms/steel/gleeble/Strain` | `/vocabulary/docs/steel#Strain` |

Notes:

- The optional `<usecase>` path segment is ignored for documentation
- The `<term>` is mapped to a fragment identifier (`#term`)
- The documentation is publicly accessible over HTTPS

---

## RDF Usage

The canonical identifiers for RDF **must use w3id.org URIs**, not the
documentation URLs.

Example (Turtle):

```turtle
@prefix dsms: <https://w3id.org/dsms/steel/> .

dsms:Material a owl:Class ;
  rdfs:label "Material" ;
  rdfs:isDefinedBy <https://w3id.org/dsms/steel/> ;
  rdfs:seeAlso <https://kiran.materials-data.space/vocabulary/docs/steel#Material> .
```

## Maintenance Commitment

The DSMS team commits to:

- Maintaining the redirection rules under w3id.org/dsms/
- Keeping documentation URLs stable
- Preserving the meaning of published identifiers over time

Changes to hosting or documentation infrastructure will be handled
exclusively via updates to redirection targets, without modifying
the published w3id.org identifiers.

## Contact

Maintained by the DSMS team.

For questions or issues, please open an issue in the DSMS GitHub organization
or contact the maintainers directly.

- Yoav Nahshon (Fraunhofer IWM) <yoav.nahshon@iwm.fraunhofer.de>
- Kiran Kumaraswamy (Fraunhofer IWM) <kiran.kumaraswamy@iwm.fraunhofer.de>
  