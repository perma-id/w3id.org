# BattINFO

This [W3ID](https://w3id.org) provides a persistent URI namespace for the [Battery Interface Ontology (BattINFO)](https://github.com/BIG-MAP/BattINFO), and for BattINFO-governed persistent object identifiers that resolve to the [Battery Genome](https://www.battery-genome.org) registry.

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

4. `https://w3id.org/battinfo/{TYPE}/{ID} --> https://www.battery-genome.org/registry/{TYPE}/{ID}`
   - BattINFO object IRIs use a generic two-segment pattern.
   - The `TYPE` segment is preserved when redirecting into Battery Genome.
   - This keeps BattINFO persistent identifiers aligned with Battery Genome registry URLs.
   - Examples:
     - `https://w3id.org/battinfo/cell-type/pge5-wer6-2q82-v9k0`
       `--> https://www.battery-genome.org/registry/cell-type/pge5-wer6-2q82-v9k0`
     - `https://w3id.org/battinfo/material/abc123`
       `--> https://www.battery-genome.org/registry/material/abc123`

## Meaning of placeholders

- `{VERSION}`: Version number. Must start with a digit to distinguish it from domain or path names.
- `{TYPE}`: BattINFO object type slug, for example `cell`, `cell-type`, `material`, `protocol`, `dataset`, or `model`.
- `{ID}`: Persistent local identifier for the referenced object.

## Notes

- Special BattINFO routes such as `/raw`, `/latest`, `/source`, `/turtle`, `/inferred`, and versioned paths are handled before the generic `{TYPE}/{ID}` redirect.
- The generic object redirect assumes that Battery Genome supports the route pattern:
  `https://www.battery-genome.org/registry/{TYPE}/{ID}`

## Contacts

This space is maintained by [SINTEF](https://www.sintef.no/en/).
For any questions or issues, please contact [BattINFO Team](mailto:simon.clark@sintef.no).

Current maintainers:
- [Simon Clark](https://github.com/jsimonclark)
