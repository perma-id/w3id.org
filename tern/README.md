# TERN Persistent URIs


## TERN's Linked Data home page.

- https://w3id.org/tern -> http://linkeddata.tern.org.au/


## A register of TERN ontologies

- https://w3id.org/tern/ontologies/ -> register of TERN ontologies


## Media types for an ontology


### Ontology resource as Turtle

- https://w3id.org/tern/ontologies/org -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.ttl (Accept: text/turtle)
- https://w3id.org/tern/ontologies/org.ttl -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.ttl
- https://w3id.org/tern/ontologies/org?_format=text/turtle -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.ttl


### Ontology resource as RDF/XML

- https://w3id.org/tern/ontologies/org -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.rdf (Accept: application/rdf+xml)
- https://w3id.org/tern/ontologies/org.rdf -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.rdf
- https://w3id.org/tern/ontologies/org?_format=application/rdf+xml -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.rdf


### Ontology resource as N-Triples

- https://w3id.org/tern/ontologies/org -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.nt (Accept: application/n-triples)
- https://w3id.org/tern/ontologies/org.nt -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.nt
- https://w3id.org/tern/ontologies/org?_format=application/n-triples -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.nt


### Ontology resource as JSON-LD

- https://w3id.org/tern/ontologies/org -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.jsonld (Accept: application/ld+json)
- https://w3id.org/tern/ontologies/org.jsonld -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.jsonld
- https://w3id.org/tern/ontologies/org?_format=application/ld+json -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.jsonld


### Ontology resource as Notation3

- https://w3id.org/tern/ontologies/org -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.n3 (Accept: text/n3)
- https://w3id.org/tern/ontologies/org.n3 -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.n3
- https://w3id.org/tern/ontologies/org?_format=text/n3 -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.n3


### Ontology resource with .owl file extension

- https://w3id.org/tern/ontologies/org.owl -> https://raw.githack.com/ternaustralia/ontology_tern-org/master/docs/tern-org.ttl 


### Ontology resource as HTML

- https://w3id.org/tern/ontologies/org -> https://ternaustralia.github.io/ontology_tern-org/ (Accept: text/html) - Default catch all


## Run tests with Docker

We use the `Dockerfile` to create a container for the Apache HTTP server containing our `.htaccess` rules. A second Dockerfile in `tests/Dockerfile` will be used to run tests against the Apache container. 


### Apache container

Create a Docker network for the Apache container and the test container to communicate.

```
docker network create test
```

Build the Docker image from the Dockerfile in the **current** directory.

```
docker build -t httpd .
```

Run the Docker image as a container.

```
docker run -dit --rm --name httpd -p 8000:80 --network test httpd
```

The redirects should work on `localhost:8000`. E.g. try going to `localhost:8000/tern/ontologies/org`. 


### Test scripts container

Follow the instructions in [test/README.md](test/README.md). 


## Contact

Edmond Chuc  
e.chuc@uq.edu.au  