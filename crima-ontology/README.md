# CRIMA Ontology

Permanent identifier for the [CRIMA Ontology](https://github.com/crima-ontology/ontology) for evidence-based management of climate risks.

## URI Patterns

Rules in file `.htaccess` match W3ID URIs of the form `https://w3id.org/crima-ontology/[{version}]/{module}[.{ext}]`, where

* `{module}` is mandatory and identifies a module of the CRIMA ontology, e.g., `ccore`
* `{version}` can be omitted, defaulting to `latest`
* `{ext}` can be omitted, triggering content negotiation

Requests to these URIs are redirected (HTTP 303) to ontology module files published at https://crima-ontology.github.io/.

## Maintainers

* Alessandro Mosca - [@al3barna](https://github.com/al3barna)
* Greta Adamo - [@gretaAd](https://github.com/gretaAd)
* Davide Lanti - [@tirrolo](https://github.com/tirrolo)
* Maria Assunta Cappelli - [@MariaWaria1](https://github.com/MariaWaria1)
* Francesco Corcoglioniti - [@fracorco](https://github.com/fracorco)