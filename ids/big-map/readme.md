# BIG-MAP Project PURLs

This repository contains the .htaccess file to set up Persistent Uniform Resource Locators (PURLs) for the Horizon 2020 research project **BIG-MAP** (BATTERY INTERFACE GENOME - MATERIALS ACCELERATION PLATFORM).

## Project Information

- Project Title: BIG-MAP - BATTERY INTERFACE GENOME - MATERIALS ACCELERATION PLATFORM
- Grant Agreement No.: 957189
- Website: [BIG-MAP Project](https://www.big-map.eu/)

## Purpose

The .htaccess file provided in this repository is intended to be used with the w3id.org Persistent URL (PURL) service. It redirects requests made to specific paths within the BIG-MAP project to corresponding pages on the project website.

## Redirect Rules

The .htaccess file implements the following redirect rules:

1. Redirects the base <https://w3id.org/big-map> to the **index** page <https://big-map.github.io/ProjectKnowledgeGraph/index.html>.
2. Redirects specific URIs <https://w3id.org/big-map/{PATH}> to their respective html pages on the project resource documentation <https://big-map.github.io/ProjectKnowledgeGraph/{PATH}.html>.

For detailed information about each redirect rule, please refer to the comments within the .htaccess file.

---

For any questions or issues, please contact [BIG-MAP Project Team](mailto:simon.clark@sintef.no).

BIG-MAP W3ID Maintainer: [@jsimonclark](https://github.com/jsimonclark)
