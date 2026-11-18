# BattINFO

This [W3ID](https://w3id.org) provides a persistent URI namespace for the [Battery Interface Ontology (BattINFO)](https://github.com/BIG-MAP/BattINFO), and for BattINFO-governed persistent object identifiers, which resolve through the BattINFO registry resolver to machine-readable Linked Data and human landing pages on the [Battery Genome](https://www.battery-genome.org).

## Redirection Rules

This section contains a general summary of the logic behind the redirection rules.

1. `https://w3id.org/battinfo --> https://big-map.github.io/BattINFO/battinfo{.html|.ttl}`
   - Alias: `https://w3id.org/battinfo/`
   - If the user is accessing this from a browser, redirect to HTML documentation on GitHub Pages.
   - Otherwise, redirect to the squashed `.ttl` file on GitHub Pages.
   - Special case for inferred ontology:
     `https://w3id.org/battinfo/inferred --> https://big-map.github.io/BattINFO/battinfo-inferred.ttl`

2. `https://w3id.org/battinfo/source --> https://raw.githubusercontent.com/BIG-MAP/BattINFO/main/battinfo.ttl`
   - Alias: `https://w3id.org/battinfo/latest`
   - Target: `battinfo.ttl` file in the root of the `main` branch.
   - `https://w3id.org/battinfo/raw/{PATH} --> https://raw.githubusercontent.com/BIG-MAP/BattINFO/main/{PATH}`: a file on `main`, which changes as `main` does.
   - `https://w3id.org/battinfo/raw/{VERSION}/{PATH} --> https://raw.githubusercontent.com/BIG-MAP/BattINFO/v{VERSION}/{PATH}`: the file at release tag `v{VERSION}`, which does not change.

3. `https://w3id.org/battinfo/{VERSION} --> https://big-map.github.io/BattINFO/battinfo/versions/{VERSION}/battinfo{.html|.ttl}`
   - Alias: `https://w3id.org/battinfo/{VERSION}/`
   - Alias: `https://w3id.org/battinfo/{VERSION}/battinfo`, the version IRI (`owl:versionIRI`) that releases from 0.8.0-beta declare.
   - If the user is accessing this from a browser, redirect to HTML documentation for the given version on GitHub Pages.
   - Otherwise, redirect to the squashed `.ttl` file for the given version on GitHub Pages.
   - Special case for inferred ontology:
     `https://w3id.org/battinfo/{VERSION}/inferred --> https://big-map.github.io/BattINFO/battinfo/versions/{VERSION}/battinfo-inferred.ttl`
   - Releases 0.2.0, 0.5.0 and 0.6.0 predate the `versions/` tree and redirect to `battinfo.ttl` at release tag `v{VERSION}`.

4. `https://w3id.org/battinfo/def/{PREFIX} --> https://big-map.github.io/BattINFO/def/{PREFIX}/`
   - Alias: `https://w3id.org/battinfo/def/{PREFIX}/`
   - A publisher's vocabulary, built from the `def/` folder of the BattINFO repository. If the user is accessing this from a browser, redirect to the page of its newest release; otherwise, redirect to that release's file, `def/{PREFIX}/vocab.ttl`.
   - `https://w3id.org/battinfo/def/{PREFIX}/{VERSION} --> https://big-map.github.io/BattINFO/def/{PREFIX}/{VERSION}/{index.html|vocab.ttl}`: one release.
   - `https://w3id.org/battinfo/def/{PREFIX}/{TERM} --> https://big-map.github.io/BattINFO/def/{PREFIX}/#{TERM}`, or `def/{PREFIX}/vocab.ttl` when not from a browser: a term, in the newest release.
   - Any other path under `def/` falls through to rule 5.
   - Example: `https://w3id.org/battinfo/def/1002/DurabilityData`

5. `https://w3id.org/battinfo/{PATH} --> https://battinfo-registry.onrender.com/w3id/{PATH}`
   - Everything not matched by the ontology rules above forwards, path preserved, to the BattINFO registry resolver, which handles all further resolution: object identifiers `{TYPE}/{ID}` (303 by content negotiation — JSON-LD / Turtle for machines, Battery Genome landing pages for browsers; legacy segments stay aliased; withdrawn records get `owl:deprecated` tombstones, never 404), the records JSON-LD context (`context/records/v1.json`), record-layer vocabulary terms, and reserved sub-paths (e.g. `twin/`).
   - Example: `https://w3id.org/battinfo/spec/nm6t-ceph-frax-1mk1 --> 303 --> .../w3id/spec/nm6t-ceph-frax-1mk1 --> 303 --> JSON-LD, Turtle, or landing page by Accept header`

## Meaning of placeholders

- `{VERSION}`: Version number. Must start with a digit to distinguish it from domain or path names.
- `{PREFIX}`: A publisher's number in the BattINFO prefix register: four or more digits, the first not 0.
- `{TERM}`: A term's local name: a letter, then letters, digits or underscores.
- `{PATH}`: Any path not claimed by the ontology rules — object identifiers (`{TYPE}/{ID}`, e.g. `spec`, `cell`, `test`, `dataset`, `material`, `equipment`, `channel` + an opaque 16-character ID), the records context, vocabulary terms, and reserved sub-paths.


## Notes

- Special BattINFO routes such as `/raw`, `/latest`, `/source`, `/turtle`, `/inferred`, `/def/`, and versioned paths are handled before the generic `{PATH}` wildcard.
- All object-identifier resolution intelligence (content negotiation, aliases, tombstones) lives in the deployed resolver, not in this file by design, this file should rarely need to change.

## Contacts

This space is maintained by [SINTEF](https://www.sintef.no/en/).
For any questions or issues, please contact [BattINFO Team](mailto:simon.clark@sintef.no).

Current maintainers:
- [Simon Clark](https://github.com/jsimonclark)
