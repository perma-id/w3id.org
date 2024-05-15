# POMEGA Resource PURLs

This repository contains the .htaccess file to set up Persistent Uniform Resource Locators (PURLs) for linked data resources related to **[POMEGA](https://tr.pomega.com/en/)** equipment.

## Project Information
This work is initialized as part of the BATMACHINE Innovation Action in Horizon Europe

- Project Title: BATMACHINE Boosting Europe’s sustainable battery cell industrial manufacturing value chain by developing an optimised machinery with intelligent control processes to minimise costs, scrap and energy consumption
- Grant Agreement No.: 101104246
- Website: [BATMACHINE](http://batmachineproject.eu/)

## Purpose

The .htaccess file provided in this repository is intended to be used with the w3id.org Persistent URL (PURL) service. It redirects requests made to specific paths within the POMEGA Application Ontology to corresponding pages on the project website.

## Redirect Rules

The .htaccess file implements the following redirect rules:

1. Redirects the base <https://w3id.org/pomega> to the **index** page <https://batmachine.github.io/POMEGA-public-resources/index.html>.
2. Redirects URIs for specific resources at <https://w3id.org/pomega/ontology#{ID}> to their respective pages on the project resource documentation <https://batmachine.github.io/pomega-public-resources/pomega.html#{ID}>.

For detailed information about each redirect rule, please refer to the comments within the .htaccess file.

---

For any questions or issues, please contact [BATMACHINE Project Team](mailto:simon.clark@sintef.no).

BIG-MAP W3ID Maintainer: [@jsimonclark](https://github.com/jsimonclark)
