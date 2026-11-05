# BattINFO

This [W3ID](https://w3id.org) provides a persistent URI namespace for the [Battery Interface Ontology (BattINFO)](https://github.com/BIG-MAP/BattINFO), and for BattINFO-governed persistent object identifiers, which resolve through the [BattINFO registry](https://github.com/battery-genome/battinfo-registry) resolver to machine-readable Linked Data and human landing pages on the [Battery Genome](https://www.battery-genome.org).

## Redirection Rules

This section contains a general summary of the logic behind the redirection rules.

1. `https://w3id.org/battinfo --> https://big-map.github.io/BattINFO/battinfo{.html|.ttl}`
   - Alias: `https://w3id.org/battinfo/`
   - If the user is accessing this from a browser, redirect to HTML documentation on GitHub Pages.
   - Otherwise, redirect to the squashed `.ttl` file on GitHub Pages.
   - Special case for inferred ontology:
     `https://w3id.org/battinfo/inferred --> https://big-map.github.io/BattINFO/battinfo-inferred.ttl`

2. `https://w3id.org/battinfo/source --> https://raw.githubusercontent.com/BIG-MAP/BattINFO/master/battinfo.ttl`
   - Alias: `https://w3id.org/battinfo/latest`
   - Target: `battinfo.ttl` file in the root of the `master` branch.

3. `https://w3id.org/battinfo/{VERSION} --> https://big-map.github.io/BattINFO/battinfo/versions/{VERSION}/battinfo{.html|.ttl}`
   - Alias: `https://w3id.org/battinfo/{VERSION}/`
   - If the user is accessing this from a browser, redirect to HTML documentation for the given version on GitHub Pages.
   - Otherwise, redirect to the squashed `.ttl` file for the given version on GitHub Pages.
   - Special case for inferred ontology:
     `https://w3id.org/battinfo/{VERSION}/inferred --> https://big-map.github.io/BattINFO/battinfo/versions/{VERSION}/battinfo-inferred.ttl`

4. `https://w3id.org/battinfo/{PATH} --> https://battinfo-registry.onrender.com/w3id/{PATH}`
   - Everything not matched by the ontology rules above forwards, path preserved, to the BattINFO registry resolver, which handles all further resolution: object identifiers `{TYPE}/{ID}` (303 by content negotiation — JSON-LD / Turtle for machines, Battery Genome landing pages for browsers; legacy segments stay aliased; withdrawn records get `owl:deprecated` tombstones, never 404), the records JSON-LD context (`context/records/v1.json`), record-layer vocabulary terms, and reserved sub-paths (e.g. `twin/`).
   - Example: `https://w3id.org/battinfo/spec/7d9k-2m4p-8t3x-6nq5 --> 303 --> .../w3id/spec/7d9k-2m4p-8t3x-6nq5 --> 303 --> JSON-LD, Turtle, or landing page by Accept header`

## Meaning of placeholders

- `{VERSION}`: Version number. Must start with a digit to distinguish it from domain or path names.
- `{PATH}`: Any path not claimed by the ontology rules — object identifiers (`{TYPE}/{ID}`, e.g. `spec`, `cell`, `test`, `dataset`, `material`, `equipment`, `channel` + an opaque 16-character ID), the records context, vocabulary terms, and reserved sub-paths.


## Notes

- Special BattINFO routes such as `/raw`, `/latest`, `/source`, `/turtle`, `/inferred`, and versioned paths are handled before the generic `{PATH}` wildcard.
- All object-identifier resolution intelligence (content negotiation, aliases, tombstones) lives in the deployed resolver, not in this file by design, this file should rarely need to change.

## Contacts

This space is maintained by [SINTEF](https://www.sintef.no/en/).
For any questions or issues, please contact [BattINFO Team](mailto:simon.clark@sintef.no).

Current maintainers:
- [Simon Clark](https://github.com/jsimonclark)
