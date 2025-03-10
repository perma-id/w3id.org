# NETZSCH Resource PURLs

This repository contains the .htaccess file to set up Persistent Uniform Resource Locators (PURLs) for linked data resources related to **[NETZSCH](https://www.netzsch.com/en)** equipment.

## Project Information
This work is initialized as part of the BATMACHINE Innovation Action in Horizon Europe

- Project Title: BATMACHINE Boosting Europe’s sustainable battery cell industrial manufacturing value chain by developing an optimised machinery with intelligent control processes to minimise costs, scrap and energy consumption
- Grant Agreement No.: 101104246
- Website: [BATMACHINE](http://batmachineproject.eu/)

## Purpose

The .htaccess file provided in this repository is intended to be used with the w3id.org Persistent URL (PURL) service. It redirects requests made to specific paths within the NETZSCH Application Ontology to corresponding pages on the project website.

## Redirect Rules

The .htaccess file implements the following redirect rules:

1. **Base URL Redirect**
   - **Rule:** Redirect the base URL to the index page.
   - **Pattern:** `^$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/index.html`
   - **Type:** Permanent (301)

2. **Specific Page Redirect**
   - **Rule:** Redirect term IRI to human-readable documentation.
   - **Pattern:** `^(public/)?ontology(|#(.*))$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/pages/NETZSCH.html$2`
   - **Type:** Permanent (301)

3. **Versioned TTL File Redirect**
   - **Rule:** Redirect versioned URLs to the corresponding TTL file.
   - **Pattern:** `^(public/)?ontology/([0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?)\/?$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/version/$2/NETZSCH.ttl`
   - **Type:** Permanent (301)

4. **Latest TTL File Redirect**
   - **Rule:** Redirect latest URLs to the corresponding TTL file.
   - **Pattern:** `^(public/)?ontology/latest\/?$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/NETZSCH.ttl`
   - **Type:** Permanent (301)

5. **Inferred Versioned TTL File Redirect**
   - **Rule:** Redirect versioned URLs to the corresponding inferred TTL file.
   - **Pattern:** `^(public/)?ontology/([0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?)/inferred\/?$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/version/$2/NETZSCH-inferred.ttl`
   - **Type:** Permanent (301)

6. **Latest Inferred TTL File Redirect**
   - **Rule:** Redirect latest URLs to the corresponding inferred TTL file.
   - **Pattern:** `^(public/)?ontology/latest/inferred\/?$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/NETZSCH-inferred.ttl`
   - **Type:** Permanent (301)

7. **Context JSON File Redirect**
   - **Rule:** Redirect to the context JSON file.
   - **Pattern:** `^(public/)?ontology/context\/?$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/context/context.json`
   - **Type:** Permanent (301)

8. **Versioned Context JSON File Redirect**
   - **Rule:** Redirect versioned URLs to the corresponding context JSON file.
   - **Pattern:** `^(public/)?ontology/([0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?)/context\/?$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/version/$2/context/context.json`
   - **Type:** Permanent (301)

9. **Versioned Documentation Redirect**
   - **Rule:** Redirect to the versioned documentation.
   - **Pattern:** `^(public/)?ontology/([0-9]+\.[0-9]+\.[0-9]+(-[a-zA-Z0-9]+)?)/doc\/?$`
   - **Redirect To:** `https://heu-batmachine.github.io/NETZSCH-public-resources/version/$2/pages/NETZSCH.html`
   - **Type:** Permanent (301)

For detailed information about each redirect rule, please refer to the comments within the .htaccess file.

---

For any questions or issues, please contact [BATMACHINE Project Team](mailto:sridevi.krishnamurthi@sintef.no).

W3ID Maintainer: [@sksintef](https://github.com/sksintef)
