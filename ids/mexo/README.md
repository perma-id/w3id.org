# MEXO — Metaheuristic Experiment Ontology

This directory defines the persistent W3ID namespace for **MEXO (Metaheuristic Experiment Ontology)**.

## Persistent identifier

**Namespace**

https://w3id.org/mexo/

The namespace is intended to provide stable and persistent IRIs for the MEXO ontology and its terms.

Examples:

- `https://w3id.org/mexo/`
- `https://w3id.org/mexo/MetaheuristicAlgorithm`
- `https://w3id.org/mexo/OptimizationProblem`
- `https://w3id.org/mexo/Experiment`

## Project repository

The MEXO source files and project materials are maintained at:

https://github.com/SYNAPSE-RG/MEXO-Ont

## Purpose

MEXO provides a semantic representation for concepts related to metaheuristic optimization experiments, including algorithms, optimization problems, configurations, executions, parameters, and experimental results.

The W3ID namespace decouples the persistent identifiers used by MEXO from the physical location in which the ontology is hosted. If the hosting location changes in the future, the W3ID redirection rules can be updated without changing the ontology IRIs.

## Redirection policy

Requests under:

`https://w3id.org/mexo/`

are redirected using HTTP status **303 (See Other)** to the current canonical MEXO repository.

The redirection configuration is defined in the `.htaccess` file in this directory.

A future version of the redirection rules may implement HTTP content negotiation so that clients can obtain HTML documentation or RDF serializations such as Turtle, RDF/XML, or JSON-LD from the same persistent namespace.

## Maintainer

### Primary maintainer

**Julio-Noe**

GitHub username:

`@Julio-Noe`

GitHub profile:

https://github.com/Julio-Noe

The GitHub username above identifies the maintainer authorized to request and submit future updates to the MEXO W3ID configuration.

**SYNAPSE Research Group**

GitHub organization:

https://github.com/SYNAPSE-RG

MEXO repository:

https://github.com/SYNAPSE-RG/MEXO-Ont

For questions, maintenance requests, or changes to the W3ID redirection, please use the issue tracker of the MEXO GitHub repository.

## License

The W3ID configuration files in this directory are provided for the maintenance of the MEXO persistent namespace. The license of the MEXO ontology itself is defined in the MEXO project repository.
