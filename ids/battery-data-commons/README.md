# Battery Data Commons

This [W3ID](https://w3id.org) provides a persistent URI namespace for [Battery Data Commons (BDC)](https://github.com/BatteryCommons/BatteryDataCommons), a curated metadata registry of public battery datasets and battery-data software tools. Identifiers under this namespace resolve to the human-readable catalogue at [batterydatacommons.org](https://batterydatacommons.org) and to machine-readable RDF expressed in terms of the [EMMO battery domain ontology (BattINFO)](https://w3id.org/emmo/domain/battery).

## Redirection Rules

This section contains a general summary of the logic behind the redirection rules.

1. `https://w3id.org/battery-data-commons --> https://batterydatacommons.org/{index.html|releases/battinfo/bdc.ttl}`
   - Alias: `https://w3id.org/battery-data-commons/`
   - If the user is accessing this from a browser, redirect to the catalogue website.
   - Otherwise, redirect to the current Turtle graph of the whole catalogue.

2. `https://w3id.org/battery-data-commons/turtle --> https://batterydatacommons.org/releases/battinfo/bdc.ttl`
   - The current Turtle graph, regardless of `Accept` header.

3. `https://w3id.org/battery-data-commons/source --> https://raw.githubusercontent.com/BatteryCommons/BatteryDataCommons/main/releases/battinfo/bdc.ttl`
   - Alias: `https://w3id.org/battery-data-commons/latest`
   - Target: the Turtle graph on the `main` branch of the repository.

4. `https://w3id.org/battery-data-commons/raw/{PATH} --> https://raw.githubusercontent.com/BatteryCommons/BatteryDataCommons/main/{PATH}`
   - Any file in the repository, as stored on `main`.

5. `https://w3id.org/battery-data-commons/schema/{FILE} --> https://raw.githubusercontent.com/BatteryCommons/BatteryDataCommons/main/schemas/{FILE}`
   - JSON Schema and mapping files, e.g. `canonical_record.schema.json`, `mappings/bdc_value_mapping.sssom.tsv`.

6. `https://w3id.org/battery-data-commons/dataset/{ID} --> https://batterydatacommons.org/{dataset.html?id={ID}|releases/battinfo/records/{ID}.jsonld}`
   - If the user is accessing this from a browser, redirect to the dataset page on the website.
   - Otherwise, redirect to the JSON-LD description of that record.

7. `https://w3id.org/battery-data-commons/tool/{ID} --> https://batterydatacommons.org/{tools.html#{ID}|releases/battinfo/records/{ID}.jsonld}`
   - Software-tool records. Browsers go to the tools catalogue with the identifier as fragment; machines get the JSON-LD description.

8. `https://w3id.org/battery-data-commons/vocab --> https://batterydatacommons.org/{vocab.html|releases/battinfo/vocab.ttl}`
   - Alias: `https://w3id.org/battery-data-commons/vocab/`
   - The small BDC-owned vocabulary (data groups, categories, curation flags), a SKOS concept scheme with mappings to the EMMO battery ontology.
   - Term: `https://w3id.org/battery-data-commons/vocab/{TERM} --> https://batterydatacommons.org/{vocab.html#{TERM}|releases/battinfo/vocab.ttl}`

9. `https://w3id.org/battery-data-commons/{VERSION} --> https://batterydatacommons.org/releases/versions/{VERSION}/{index.html|bdc.ttl}`
   - Alias: `https://w3id.org/battery-data-commons/{VERSION}/`
   - A named catalogue release, e.g. `v1309.2026`. Browsers get the release notes; machines get the Turtle graph as it was in that release.
   - Versioned record: `https://w3id.org/battery-data-commons/{VERSION}/dataset/{ID} --> .../releases/versions/{VERSION}/records/{ID}.jsonld` (likewise `tool/{ID}`).
   - Versioned vocabulary: `https://w3id.org/battery-data-commons/{VERSION}/vocab --> .../releases/versions/{VERSION}/vocab.ttl`.

## Meaning of placeholders

- `{ID}`: a BDC record identifier, `bdc_` followed by six digits for datasets or `bdc_sw_` followed by three digits for tools.
- `{VERSION}`: a catalogue release version as used by the repository's release manifest: `v` followed by a digit (e.g. `v1309.2026`).
- `{TERM}`: a vocabulary term name.
- `{PATH}` / `{FILE}`: a path inside the repository.

## Notes

- Content negotiation is the browser/machine split on the `Accept` header: HTML for browsers, Turtle for whole graphs and JSON-LD for single records otherwise.
- Versioned artefacts live in one folder per release under `releases/versions/{VERSION}/`; unversioned paths always resolve to the latest release.
- Identifiers are never reused. A record that is withdrawn or merged keeps its identifier and its description states what replaced it.
- The Linked Data targets (`releases/battinfo/` and versioned folders) are being introduced in the repository; the website and record pages are live.

## Contacts

This space is maintained by the Battery Data Commons project.
For any questions or issues, please contact [Simon Clark](mailto:simon.clark@sintef.no).

Current maintainers:
- [Simon Clark](https://github.com/jsimonclark)
- [Shiyun Liu](https://github.com/shiyunliu-battery)
- [Marwan Hassini](https://github.com/HassiniMarwan)
