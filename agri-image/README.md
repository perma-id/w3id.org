# Agri-Image Ontology — w3id.org Permanent Identifier

This directory contains the configuration for the persistent identifier:

**https://w3id.org/agri-image/**

The purpose of this namespace is to provide **stable, permanent URIs** for the
**Agri-Image ontology**, its classes, and properties.  
All resources under this namespace are redirected to the maintained ontology
hosted on GitHub.

## Project Description

The *Agri-Image Ontology* defines semantic concepts and metadata structures
for agricultural image datasets, including cameras, platforms, plots,
crops, datasets, and image-level metadata.  
The ontology is developed as part of the *Agriculture Image Metadata*
initiative by Team Walabi.

The ontology is made available in **Turtle (TTL)** format. Additional RDF
serializations may be added in the future.

## Maintainer(s)

- **Joep Tummers**  
  Wageningen University & Research  
  Email: <walabi.wser@wur.nl>  
  GitHub: [@TeamWalabi](https://github.com/TeamWalabi)


## Redirects

This namespace redirects to the ontology resources stored at:

- https://github.com/TeamWalabi/agriculture-image-metadata/tree/main/ontology  

Primary ontology file:

- **ontology.ttl**  
  https://raw.githubusercontent.com/TeamWalabi/agriculture-image-metadata/main/ontology/ontology.ttl

## Content Negotiation

The `.htaccess` in this folder supports HTTP content negotiation.  
Because the ontology currently provides only Turtle serialization,
all media types are redirected to the `.ttl` file.

Examples:

- `curl -L -H "Accept: text/turtle" https://w3id.org/agri-image/ontology`  
- `curl -L -H "Accept: application/ld+json" https://w3id.org/agri-image/ontology`  
- `curl -L -H "Accept: application/rdf+xml" https://w3id.org/agri-image/ontology"`

All requests currently return the same Turtle file.

## Documentation

Project documentation, code, and the ontology source can be found at:

https://github.com/TeamWalabi/agriculture-image-metadata

## Persistence Commitment

This namespace is registered through **w3id.org**, a permanent identifier
service operated by the W3C Permanent Identifier Community Group.  
The maintainers commit to keeping the target resources available and to
updating redirects as necessary to maintain long-term persistence.

