# Extended Matrix

Permanent identifiers for the **Extended Matrix** ecosystem — an open
methodology and toolchain for archaeological and palaeontological
stratigraphy, source documentation and virtual reconstruction, developed at
CNR-ISPC (Institute of Heritage Science, Italy) and used across a number of
European research projects.

Homepage: <https://extendedmatrix.org>

## What lives under this prefix

### `/vocab/` — SKOS vocabulary modules

Small, self-contained controlled vocabularies that the Extended Matrix
ecosystem originates and maintains, published as SKOS in Turtle with a
human-readable page alongside.

The first module is `taph-weathering`: the six-stage bone weathering scale
after Behrensmeyer 1978. It is published because the scale has been the
working standard of taphonomy for nearly fifty years and has never had an
identifier — it exists as a table inside a paper. The stages are published
scientific findings; the definitions in the module are restatements rather
than transcriptions, and the source is cited on every concept.

- Module: <https://w3id.org/extendedmatrix/vocab/taph-weathering/>
- Concept: <https://w3id.org/extendedmatrix/vocab/taph-weathering/stage-3>

Modules are licensed CC BY 4.0 unless the module itself states otherwise.

## Resolution

Requests are redirected to <https://extendedmatrix.org>, a static site.

For vocabulary URIs, a client sending `Accept: text/html` receives the
human-readable page (303); any other client receives the Turtle
serialisation (303). Concept URIs use the slash convention and resolve to
their module's document. CORS is open so that browser-based tools can fetch
the serialisations directly.

## Contact

Emanuele Demetrescu — CNR-ISPC
<emanuel.demetrescu@cnr.it> · ORCID [0000-0002-5065-7970](https://orcid.org/0000-0002-5065-7970)
GitHub: [@zalmoxes-laran](https://github.com/zalmoxes-laran)
