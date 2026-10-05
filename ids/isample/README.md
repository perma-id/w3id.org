
# /isample/

**Name of the project:** [iSamples](https://isamplesorg.github.io/home/)

**Description:** redirects for resources related to sample registration and description.  Includes vocabularies for high level physical sample categorization--material type, sampled feature, and specimen type.

requests to https://w3id.org/isample will redirect to the isample home page


directory structure-- there are folders for each resource type, subfolders for subtypes within that resource type. Folders for different versions are nested within the folder for the resource that is versioned. 

We are starting with vocabularies.

Example:

```
-isample
    -- vocabulary
        --- material
           ---- 0.9
```

the corresponding URIs are then like 
https://w3id.org/isample/vocabulary/material/0.9/{termtoken}

uris without the version number will be redirected to the most current version. 
e.g. https://w3id.org/isample/vocabulary/material/{termtoken}
This will require updating redirects when new vocabs are published

This would redirect to the Earth Science Information Partners (ESIP) Community Ontology Repository (COR) where the vocabularies are hosted:
http://cor.esipfed.org/ont?iri=https://w3id.org/isamples/vocabulary/material/0.9/{termtoken}

**Contacts:**
* Stephen Richard <smrTucson@gmail.com> - GitHub: https://github.com/smrgeoinfo
* Dave Vieglais <dave.vieglais@gmail.com>  
