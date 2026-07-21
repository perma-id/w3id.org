# Semantic Access Layer (w3id.org/sal)

Semantic Access Layer (SAL) provides stable identifiers under 
`https://w3id.org/sal/`, letting anyone publish an ontology
on GitHub using a consistent pattern and have it served via GitHub Pages.

## Redirect behavior

Pattern:

```
https://w3id.org/sal/<repo>/<path>
```

Redirects to:

```
https://<repo>.github.io/<path>
```

Examples:

- `https://w3id.org/sal/cgs-earth` -> `https://cgs-earth.github.io/`
- `https://w3id.org/sal/cgs-earth/ontology` -> `https://cgs-earth.github.io/ontology`

Note: URL fragments like `#ontology` are handled by the browser and will be
preserved after the redirect.

## Owner and contact

- Maintainer: Center for Geospatial Solutions
- Contact: [webb-ben](https://github.com/webb-ben)
- Contact: [C-Loftus](https://github.com/C-Loftus)
