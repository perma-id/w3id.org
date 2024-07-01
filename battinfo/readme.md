# BattINFO
This [W3ID](https://w3id.org) provides a persistent URI namespace for the [Battery Interface Ontology (BattINFO)](https://github.com/BIG-MAP/BattINFO).

## Redirection Rules
This section contains a general summary of the logic behind the redirection rules.

1. `https://w3id.org/battinfo --> https://big-map.github.io/BattINFO/battinfo{.html|.ttl}`
   - Alias: https://w3id.org/battinfo/
   - If the user is accessing this from a browser, redirect to html documentation on GitHub Pages.
   - Otherwise, redirect to the squashed `.ttl` file on GitHub Pages.
   - Special case for inferred ontology: `https://w3id.org/battinfo/inferred --> https://big-map.github.io/BattINFO/battinfo-inferred.ttl`

2. `https://w3id.org/battinfo/source --> https://raw.githubusercontent.com/BIG-MAP/BattINFO/master/battinfo.ttl`
   - Alias: https://w3id.org/battinfo/latest
   - Target: `battinfo.ttl` file in the root of the master branch.

3. `https://w3id.org/battinfo/{VERSION} --> https://big-map.github.io/BattINFO/versions/{VERSION}/battinfo{.html|.ttl}`
   - Alias: https://w3id.org/battinfo/{VERSION}/
   - If the user is accessing this from a browser, redirect to html documentation for given version on GitHub Pages.
   - Otherwise, redirect to squashed `.ttl` file for given version on GitHub Pages.
   - Special case for inferred ontology: `https://w3id.org/battinfo/{VERSION}/inferred --> https://big-map.github.io/BattINFO/versions/{VERSION}/battinfo-inferred.ttl`

### Meaning of placeholders
- `{VERSION}`: Version number. Must start with a digit to distinguish it from domain or path names.

## Contacts
This space is maintained by [SINTEF](https://www.sintef.no/en/).
For any questions or issues, please contact [BattINFO Team](mailto:simon.clark@sintef.no).

Current maintainers:
[Simon Clark](https://github.com/jsimonclark)
