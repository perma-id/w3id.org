# EMMO
This [W3ID](https://w3id.org) provides a persistent URI namespace for the [Elementary Multiperspective Material Ontology (EMMO)](https://github.com/emmo-repo/EMMO/) and its domain ontologies.

## Redirection Rules
This section contains a general summary of the logic behind the redirection rules.  

1. `https://w3id.org/emmo`
   - If the user is accessing this from a browser: redirect to github pages documentation of this IRI. Otherwise, redirect to the `{DOMAIN}.ttl` file in the root of the master branch  

2. `https://w3id.org/emmo#{NAME}`
   - If the user is accessing this from a browser: redirect to github pages documentation of this IRI. Otherwise, redirect to the `{DOMAIN}.ttl` file in the root of the master branch  

3. `https://w3id.org/emmo/`
   - `{DOMAIN}.ttl` file in the root of the master branch  

4. `https://w3id.org/emmo/{VERSION}`
   - Given version of EMMO  

5. `https://w3id.org/emmo/{VERSION}/{PATH}/{MODULE}`
   - Given version and module of EMMO  

6. `https://w3id.org/emmo/{DOMAIN}`
   - If the user is accessing this from a browser: redirect to github pages documentation of this IRI. Otherwise, redirect to the `{DOMAIN}.ttl` file in the root of the master branch  

7. `https://w3id.org/emmo/{DOMAIN}#{NAME}`
   - If the user is accessing this from a browser: redirect to github pages documentation of this IRI. Otherwise, redirect to the `{DOMAIN}.ttl` file in the root of the master branch  

8. `https://w3id.org/emmo/{DOMAIN}/`
   - `{DOMAIN}.ttl` file in the root of the master branch  

9. `https://w3id.org/emmo/{DOMAIN}/{VERSION}`
   - `{DOMAIN}.ttl` file in the root of the branch `{VERSION}`  

10. `https://w3id.org/emmo/{DOMAIN}/{VERSION}/{PATH}/{MODULE}`
    - `{PATH}/{MODULE}.ttl` file in branch `{VERSION}` (`{PATH}` may be empty if the module .ttl file is in the repository root)  

11. `https://w3id.org/emmo/{DOMAIN}/{PATH}/{MODULE}`
    - `{PATH}/{MODULE}.ttl` file in master branch  
  
Meaning of placeholders:  
`{NAME}`: Name part of an IRI, i.e. what follows after the hash sign.  
`{VERSION}`; Version number. Must start with a digit to distinguish it from domain or path names.  
`{PATH}`: Directory path within a github repository  
`{MODULE}`: Filename of turtle file with the final .ttl stripped off  
`{DOMAIN}`: Name of domain ontology  


## Contacts
This space is maintained by the [European Materials Modelling Council (EMMC)](http://emmc.eu).
You can contact the EMMO Authors via emmo@emmc.eu
