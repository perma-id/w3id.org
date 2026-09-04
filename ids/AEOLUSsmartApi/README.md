# AEOLUS-SmartAPI
Project: Build a [smartAPI](http://smart-api.info/website/) for a Spontaneus Reporting System (SRS) for drug safety research purposes. More specifically FAERS data that was standardized and currated as the [OHDSI](https://www.ohdsi.org/) resource A curated and standardized adverse drug event resource to accelerate drug safety research (AEOLUS) published in [Nature Scientific data](https://www.nature.com/articles/sdata201626).

Authors: [Juan M. Banda](http://jmbanda.com/)

   [Cynthia Khan](www.linkedin.com/in/khancynthia)

Available at (temporary location): 

Documentation (temporary location): 

## Project Goals

* **Spec out an API for the AEOLUS resource:** Based on the most common queries received about the resource, provide API calls to answer these queries. 
* **Make the API a smartAPI v3.0:** This will allow the API to be discoverable and reusable while providing rich documentation about its functionality.
* **Make output be JSONLD v1.1 compliant:** While most researchers will just need/want a basic JSON output to their queries. This resource will provide additional semantics in the JSONLD for potential re-use of the data returned. 
* **Register API with the smartAPI registry:** As part of the process of making the resource discoverable and available to the wider audience, the API will be registered in the registry.

## Repository content

* **AEOLUSsrsAPI-v2.0.json** Main JSON file with the smartAPI specification
* **spring-server** This folder contains the Swagger generated Java/Spring server. Instructions on how to build and deploy the server are listed below. 

## Important
The API server is programmed to connect to AEOLUS schemas, therefore connection to AEOLUS database is necessary for the API methods to return results. The AEOLUS data files can be downloaded from [Dryad](http://datadryad.org/resource/doi:10.5061/dryad.8q0s4)

## Instructions to build the Spring Server

This project requires Java 7 or greater and Maven.

To build, go to the /spring-server folder and type:

```
mvn clean package
```

This produces an exectuable jar in the `target` folder.

To run:

```
mvn spring-boot:run
```

The swagger-ui can then be accessed from http://ec2-34-201-242-178.compute-1.amazonaws.com:8080