# UK Curriculum Ontology (UKCO) Namespace

This permanent [w3id.org](https://w3id.org) namespace provides stable, persistent identifiers for the **UK Curriculum Ontology (UKCO)** and related resources published by **Oak National Academy**.

The namespace is intended to support linked data applications, educational resource discovery, and interoperability across curriculum datasets.

**Namespace:** [https://w3id.org/uk/curriculum/](https://w3id.org/uk/curriculum/)  
**Redirects to:** [https://github.com/oaknational/uk-curriculum-ontology/](https://github.com/oaknational/uk-curriculum-ontology/)

## Purpose

This namespace provides permanent URIs for:
- Curriculum entities such as subjects, key stages, units, lessons, and concepts.
- Relationships between curriculum elements (e.g., *teaches*, *requires*, *isPartOf*).
- Metadata about educational resources aligned to the National Curriculum.

It ensures that identifiers remain stable even if the underlying data or hosting platform changes.

## Scope

The scope of Oak National Academy's UKCO Project is the National Curriculum in England. 


## Maintainer

**Mark Hodierne**  
Oak National Academy  
📧 eng.mhodierne@thenational.academy  
🔗 [https://github.com/oaknational](https://github.com/oaknational)


# UK National Curriculum Ontology

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)]()
[![License](https://img.shields.io/badge/MIT-License-green.svg)]()

## What is this?

A machine-readable representation of the UK National Curriculum, covering England, Wales, Scotland, and Northern Ireland.

## Quick Start
```turtle
# Example: Find all KS3 Mathematics topics
PREFIX curric: <http://curriculum.gov.uk/ontology/>
SELECT ?topic WHERE {
  ?topic curric:inSubject curric:Mathematics ;
         curric:taughtAtLevel curric:KeyStage3 .
}
```

## Documentation

- [User Guide](documentation/user-guide.md) - How to use this ontology
- [Technical Specification](documentation/technical-specification.md) - Detailed reference
- [Decision Log](DECISIONS.md) - Why we made specific design choices
- [Competency Questions](documentation/competency-questions.md) - What questions this answers

## Current Status: Stage 1 Complete

✅ Core structure (Key Stages, Subjects, Topics)  
⏳ Metadata layer (next: add Dublin Core)  
⏳ Learning outcomes  
⏳ Sequencing  

See [DECISIONS.md](DECISIONS.md) for our incremental development approach.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to propose changes.

## License

Unless stated otherwise, the codebase is released under the [MIT License][mit]. This covers both the codebase and any sample code in the documentation. Where any Oak National Academy trademarks or logos are included, these are not released under the [MIT License][mit] and should be used in line with [Oak National Academy brand guidelines][brand].

Any documentation included is © [Oak National Academy][oak] and available under the terms of the [Open Government Licence v3.0][ogl], except where otherwise stated.

[mit]: LICENCE
[oak]: https://www.thenational.academy/
[ogl]: https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
[brand]: https://support.thenational.academy/using-the-oak-brand
