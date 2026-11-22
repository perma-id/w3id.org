# /geolabs
This [W3ID](https://w3id.org) provides a persistent URI namespace for the [GeoLabs](https://www.geolabs.fr).

The following sub-namespaces are defined:

* `/ospd` — OGC Open Science Persistent Demonstrator (OSPD) registers
  * `/ospd/data-formats/` — formats and representations register ([published](https://geolabs.github.io/bblocks-data-formats/), [source](https://github.com/GeoLabs/bblocks-data-formats)); each IRI redirects to Turtle (`Accept: text/turtle` or `?format=ttl`), Markdown (`Accept: text/markdown` or `?format=md`) or the building blocks viewer page
  * `/ospd/generic-profiles/` — generic and implementation profiles register ([published](https://geolabs.github.io/bblocks-generic-profiles/), [source](https://github.com/GeoLabs/bblocks-generic-profiles))
  * `/ospd/process-profiles/` — process types register ([published](https://geolabs.github.io/bblocks-process-profiles/), [source](https://github.com/GeoLabs/bblocks-process-profiles))
  * `/ospd/data-types/` — data types register ([published](https://geolabs.github.io/bblocks-data-types/), [source](https://github.com/GeoLabs/bblocks-data-types))

  These three also redirect to the JSON Schema of the building block (`Accept: application/schema+json` or `?format=schema`). An inner IRI (an input, an output, a version or a register action of an item) redirects to the documents of its item.

## Contact
This space is administered by:

**Gérald Fenoy** (@gfenoy)
<gerald.fenoy@geolabs.fr>
