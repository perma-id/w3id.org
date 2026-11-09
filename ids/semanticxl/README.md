# SemanticXL

Persistent identifiers for [SemanticXL](https://www.semanticxl.com), a
modelling suite for concepts (NL-SBB/SKOS), ArchiMate, BPMN, MIM and
registers.

* `https://w3id.org/semanticxl/kennismodel` is the vocabulary of the SemanticXL
  knowledge model (hash namespace `https://w3id.org/semanticxl/kennismodel#`,
  prefix `sxlkm:`). SemanticXL stores its knowledge model as SHACL; this
  vocabulary holds the terms SHACL does not have, such as the key under which a
  value is stored, which fields a layer switches off, and fields that only
  apply to an ArchiMate specialization.

RDF clients (`Accept: text/turtle`) are redirected to the Turtle file; browsers
to a readable page. Everything else under `/semanticxl/` goes to the website.

## Maintainer

* Jan Willem van Veen, GitHub: [@jwvveen](https://github.com/jwvveen)
