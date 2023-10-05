# EMMO
This [W3ID](https://w3id.org) provides a persistent URI namespace for the [Elementary Multiperspective Material Ontology (EMMO)](https://github.com/emmo-repo/EMMO/) and its domain ontologies.

## Redirection Rules
This section contains a general summary of the logic behind the redirection rules.

1. `https://w3id.org/emmo`
   - If the user is accessing this from a browser: redirect to documentation of corresponding IRI (`https://w3id.org/emmo#{NAME}`).
     Ex: http://industryportal.enit.fr/ontologies/EMMO?p=classes&conceptid=http%3A%2F%2Femmo.info%2Femmo%23EMMO_eb3a768e_d53e_4be9_a23b_0714833c36de

   - Otherwise, redirect to squashed ontology on GitHub Pages:
[https://raw.githubusercontent.com/emmo-repo/emmo-repo.github.io/master/latest/emmo.ttl](https://raw.githubusercontent.com/emmo-repo/emmo-repo.github.io/master/versions/1.0.0-beta5/emmo.ttl)

2. `https://w3id.org/emmo/`
   - `emmo.ttl` file in the root of the master branch: https://raw.githubusercontent.com/emmo-repo/EMMO/master/emmo.ttl

3. `https://w3id.org/emmo/{VERSION}`
   - If the user is accessing this from a browser: redirect to documentation of given version corresponding IRI (`https://w3id.org/emmo/{VERSION}#{NAME}`).

     Otherwise, redirect to squashed ontology on GitHub Pages:
https://raw.githubusercontent.com/emmo-repo/emmo-repo.github.io/master/versions/{VERSION}/emmo.ttl


4. `https://w3id.org/emmo/{VERSION}/`
   - `emmo.ttl` file in the root of branch for the given version: https://raw.githubusercontent.com/emmo-repo/EMMO/{VERSION}/emmo.ttl

5. `https://w3id.org/emmo/{PATH}/{MODULE}`
   - Turtle file for given module of EMMO:
   https://raw.githubusercontent.com/emmo-repo/EMMO/{PATH}/{MODULE}.ttl

6. `https://w3id.org/emmo/{VERSION}/{PATH}/{MODULE}`
   - Turtle file for given version and module of EMMO: https://raw.githubusercontent.com/emmo-repo/EMMO/{VERSION}/{PATH}/{MODULE}.ttl

7. `https://w3id.org/emmo/{DOMAIN}`
   - If the user is accessing this from a browser: redirect to github pages documentation of corresponding IRI (`https://w3id.org/emmo/{DOMAIN}#{NAME}`).
     Ex: http://emmo.info/electrochemistry#electrochemistry_214d925c_76c4_4f69_9afc_056a1ea82fc6

   - Otherwise, redirect to squashed ontology on GitHub Pages:
     https://emmo-repo.github.io/domain-electrochemistry/latest/{DOMAIN}.ttl

8. `https://w3id.org/emmo/{DOMAIN}/`
   - `{DOMAIN}.ttl` file in the root of the master branch.

9. `https://w3id.org/emmo/{DOMAIN}/{VERSION}`
   - If the user is accessing this from a browser: redirect to github pages documentation of corresponding IRI for given version (`https://w3id.org/emmo/{DOMAIN}/{VERSION}#{NAME}`).

   - Otherwise, redirect to squashed ontology on GitHub Pages:
     https://emmo-repo.github.io/domain-electrochemistry/versions/{VERSION}/{DOMAIN}.ttl

10. `https://w3id.org/emmo/{DOMAIN}/{VERSION}/`
   - `{DOMAIN}.ttl` file in the root of the branch `{VERSION}`

   - `{DOMAIN}.ttl` file in the root of branch for the given version: https://raw.githubusercontent.com/emmo-repo/{DOMAIN}/{VERSION}/{DOMAIN}.ttl

11. `https://w3id.org/emmo/{DOMAIN}/{PATH}/{MODULE}`
    - `{PATH}/{MODULE}.ttl` file in master branch:
https://raw.githubusercontent.com/emmo-repo/{DOMAIN}/master/{PATH}/{MODULE}.ttl

12. `https://w3id.org/emmo/{DOMAIN}/{VERSION}/{PATH}/{MODULE}`
    - `{PATH}/{MODULE}.ttl` file in branch `{VERSION}` (`{PATH}` may be empty if the module .ttl file is in the repository root):
https://raw.githubusercontent.com/emmo-repo/{DOMAIN}/{VERSION}/{PATH}/{MODULE}.ttl


Meaning of placeholders:
`{NAME}`: Name part of an IRI, i.e. what follows after the hash sign.
`{VERSION}`; Version number. Must start with a digit to distinguish it from domain or path names.
`{PATH}`: Directory path within a github repository
`{MODULE}`: Filename of turtle file with the final .ttl stripped off
`{DOMAIN}`: Name of domain ontology. Initial `domain-` is stripped off.


## Contacts
This space is maintained by the [European Materials Modelling Council (EMMC)](http://emmc.eu).
You can contact the EMMO Authors via emmo@emmc.eu
