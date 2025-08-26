# Culture Information Model (Culture IM)
- The Culture IM, previously known as the Datenraum Kultur Information Model (DRK IM), is being developed in the [Datenraum Kultur (Culture Dataspace) Project](http://datenraumkultur.de/).
- It is a Semantic Information Model that aims to define formal specifications of concepts, relationships, and constraints (application profiles) within the culture dataspace. This formalization provides a structured framework for understanding and organizing information within the DRK project. In addition, this forms a basis for representing information in DRK in the form of a Knowledge Graph (Culture KG) with more advanced querying, inference, and reasoning capabilities.
- The Culture IM contains the Culture Ontology, and various controlled vocabularies from the culture domain.

## Culture (DRK) Ontology

- The Culture Ontology currently models concepts for Performing Arts Theater Showtimes.
- The primary redirection target of the w3id namespace `drk` provisions documentation for the Culture Ontology. 

### Persistent Identifier (PID)

- Namespace for the Culture Ontology: `https://w3id.org/drk/`

### Current Redirections

- The Culture (DRK) Ontology
  - Latest: https://w3id.org/drk OR https://w3id.org/drk/ontology -> With content negotiation enabled, it serves either
    - the HTML docs (https://fraunhofer-fit-dsai.github.io/drk-information-model/latest/index.html) or 
    - the TTL/JSONLD/OWL/NT file, as requested through the `Accept` header (https://fraunhofer-fit-dsai.github.io/drk-information-model/latest/ontology.{ttl,jsonld,owl,nt})
  - Versioned: https://w3id.org/drk/ontology/{version} -> https://fraunhofer-fit-dsai.github.io/drk-information-model/{version}/ontology.ttl
- Controlled vocabularies
  - Theatrical genres vocabulary: https://w3id.org/drk/vocabs/theatrical-genres -> https://fraunhofer-fit-dsai.github.io/drk-information-model/vocabs/theatrical-genres.ttl
  - Theatrical production types vocabulary: https://w3id.org/drk/vocabs/theatrical-production-types -> https://fraunhofer-fit-dsai.github.io/drk-information-model/vocabs/theatrical-production-types.ttl
  - Theatrical event types vocabulary: https://w3id.org/drk/vocabs/theatrical-event-types -> https://fraunhofer-fit-dsai.github.io/drk-information-model/vocabs/theatrical-event-types.ttl
  - Character types vocabulary: https://w3id.org/drk/vocabs/character-types -> https://fraunhofer-fit-dsai.github.io/drk-information-model/vocabs/character-types.ttl
  - Performer types vocabulary: https://w3id.org/drk/vocabs/performer-types -> https://fraunhofer-fit-dsai.github.io/drk-information-model/vocabs/performer-types.ttl
  - Personal profile for accessibility vocabulary: https://w3id.org/drk/vocabs/personal-profile-for-accessibility -> https://fraunhofer-fit-dsai.github.io/drk-information-model/vocabs/personal-profile-for-accessibility.ttl

## Contacts

- [Rohit A. Deshmukh](https://github.com/rohitadeshmukh13) <rohit.deshmukh@fit.fraunhofer.de>
- [Daham Mustafa](https://gitlab.com/Daham-Mustaf) <daham.mohammed.mustafa@fit.fraunhofer.de>
- [Christoph Lange](https://gitlab.com/langec) <christoph.lange-bever@fit.fraunhofer.de>

## Future Updates

We plan to update this README with more detailed documentation and other relevant information as the project progresses. Stay tuned for future enhancements to the DRK Ontology and its associated resources.
