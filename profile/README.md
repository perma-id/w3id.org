# Profile
This `/profile/` path segment within `w3id.org` is used for creating persistent URIs for *profiles*.

A *profile* is:

> A specification that constrains, extends, combines, or provides guidance or explanation about the usage of other data specifications.

> This definition includes what are sometimes called "application profiles", "metadata application profiles", or "metadata profiles".
- *defintion from the [W3C's Profiles Vocabulary](https://w3c.github.io/dxwg/prof/)*


## Catalogue
Individual profile URI may be created (`https://w3id.org/profile/XXX`) and pointed anywhere - wherever the profile content is hosted - however expected use is for profiles to be allocated URIs and metadata for them listed in a profiles catalogue. See the catalogue entry point:

* <https://w3id.org/profile/catalogue>

So, to request a URI for a profile and to add to the Profiles Catalogue, please submit profile metadata, in the form of [DCAT2](https://www.w3.org/TR/vocab-dcat/) metadata entries, as RDF files to the catalogue's content repository:

* <https://github.com/surroundaustralia/catprez-overlay-profcat>

See the existing example in the repository for guidance.


## Just URIs
If you really, really just want a URI for a profile but don't want it listed in the Profile Catalogue, please just ask via the contact details below.


## Motivation
This persistent URI namespace has been created to support users of both the [W3C's Profiles Vocabulary](https://w3c.github.io/dxwg/prof/) and also the [W3C's Content Negotiation by Profile](https://w3c.github.io/dxwg/conneg-by-ap/) and the related [IETF's Indicating and Negotiating Profiles in HTTP](https://profilenegotiation.github.io/I-D-Profile-Negotiation/I-D-Profile-Negotiation), all of which require URIs for profiles.


### Contacts
**Nicholas Car**  
*Data Systems Architect*  
SURROUND Australia Pty Ltd  
<nicholas.car@surroundaustralia.com>  
<http://surroundaustralia.com>  
<https://orcid.org/0000-0002-8742-7730>  