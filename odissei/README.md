# ODISSEI
[ODISSEI](https://odissei-data.nl) (Open Data Infrastructure for Social Science and Economic Innovations) is the national research infrastructure for the Dutch social sciences.


Project github repository:
- https://github.com/odissei-data

Contacts: 

- Andre Valdestilhas <a.valdestilhas@vu.nl> https://github.com/firmao
- Jacco van Ossenbruggen <jacco.van.ossebruggen@vu.nl> https://github.com/jrvosse
- Margherita Martorana <m.martorana@vu.nl> https://github.com/ritamargherita

## ODISSEI Linked data redirection basics

We aim to use persistent identifiers for the linked data that we publish in the ODISSEI project. To decouple the URIs we use as identifiers from the location where the data is currently hosted, we use the https://w3id.org/ redirection service. All such URIs will start with the https://w3id.org/odissei/ prefix. The general configuration of how these links redirect to our platforms is explained at the https://w3id.org/ homepage.  Our fork of the github repository discussed in there is at https://github.com/odissei-data/w3id.org/.  If you would like to update the https://w3id.org/odissei/ namespace, you need to make a pull request to the original repository at https://github.com/perma-id/w3id.org. Before you do so, please discuss this first with one of the people listed under "contacts" above, or ask them to check your modifications and make the pull request for you.


Currently, most of the identifiers we use redirect to the triply.cc platform at https://kg.odissei.nl/.
For example, https://w3id.org/odissei/ns/mcal/id/a/W04 is used as an identifier for (the annotations of) a specific academic paper, while https://w3id.org/odissei/cv/contentAnalysisType/v0.1/CAT0 is used as an identifier for a SKOS concepts that is used in these annotations. To update the configuration of the incoming redirects at https://kg.odissei.nl/, feel free to contact Jacco van Ossenbruggen <jacco.van.ossebruggen@vu.nl>.
