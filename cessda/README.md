# CESSDA

This permanent w3id namespace is used for CESSDA identifiers and redirects, primarily for the SKG-IF (Scientific Knowledge Graphs Interoperability Framework).

## About CESSDA ERIC

CESSDA stands for Consortium of European Social Science Data Archives, and ERIC represents the European Research Infrastructure Consortium.

CESSDA offers extensive, integrated, and sustainable data services to the social sciences, uniting social science data archives across Europe. Its mission is to promote social science research results and support national and international research and cooperation.

## W3ID Redirects for SKG-IF

### Research Data Identifiers

Research data products are identified using the pattern:
```
https://w3id.org/cessda/cessda_product_research_data_<id>
```

These identifiers redirect to the corresponding study in the CESSDA Data Catalogue:
```
https://datacatalogue.cessda.eu/detail/<id>
```

**Example:**
- W3ID: `https://w3id.org/cessda/cessda_product_research_data_9c5f36c02cc7e0719d16bd7b15a44920de0618667616bd9b30870f5835a9000a`
- Redirects to: `https://datacatalogue.cessda.eu/detail/9c5f36c02cc7e0719d16bd7b15a44920de0618667616bd9b30870f5835a9000a`

### Literature/Publication Identifiers

Literature products are identified using the pattern:
```
https://w3id.org/cessda/cessda_product_literature_<id>
```

In CESSDA's SKG-IF, "literature" is an entity type used to represent publications that are related to research studies. These identifiers redirect back to the SKG-IF platform with the w3id URI as a parameter:
```
https://skg-if.cessda.eu/products/<w3id-uri>
```

**Example:**
- W3ID: `https://w3id.org/cessda/cessda_product_literature_524ec81b3007f121`
- Redirects to: `https://skg-if.cessda.eu/products/https://w3id.org/cessda/cessda_product_literature_524ec81b3007f121`

## Related Resources

- CESSDA Website: https://www.cessda.eu/
- CESSDA Data Catalogue: https://datacatalogue.cessda.eu/
- CESSDA SKG-IF: https://skg-if.cessda.eu/

## Maintainers

For inquiries about this w3id namespace, please contact:
- **Alen Vodopijevec** (CESSDA Main Office) - alen.vodopijevec@cessda.eu
- **Matthew Morris** (CESSDA Main Office) - matthew.morris@cessda.eu
- **Markus Tuominen** (Finnish Social Science Data Archive / Tampere University) - markus.tuominen@tuni.fi
