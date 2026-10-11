# /mediatype/
This [W3ID](https://w3id.org) provides a stable way to refer to Internet Media Types by by [URI](https://en.wikipedia.org/wiki/Uniform_Resource_Identifier).

A list of [Internet Media Types](https://en.wikipedia.org/wiki/Media_type), used to be called MIME types, sometimes called *formats*, are maintained by [IANA]() at <https://www.iana.org/assignments/media-types/media-types.xhtml>. We just read that list (in XML) and re-render it in wither HTML and RDF, according to [Linked Data](https://www.w3.org/standards/semanticweb/data) norms.

This is not new or groundbreaking stuff but previous attempts to make this information available in this way (e.g. <http://purl.org/NET/mediatypes/> seem to have be offline for quite some time.

## Uses
The initial reason for doing this is to allow users of the [Dublin Core Terms `format` property](http://www.dublincore.org/documents/dcmi-terms/#terms-format) to refer to stable, dereferenceable, URIs for Media Types rather than to uses non-resolving URIs or text strings.

## URIs
For every MIME type in [IANA's 'Media Types' list](https://www.iana.org/assignments/media-types/media-types.xml), the API this W3ID redirects to makes a URI like this:

* `https://w3id.org/mediatype/` + `{Media-Type-template}`

So for `text/html` we have:

* `https://w3id.org/mediatype/text/html`

It's not rocket surgery...


## Information available
For each Media Type and related Agent (the person or organisation that submitted it ti IANA), you get some very basic information like name and either contributor (for Media types) or contact info (email or web address for Agents). This is all the information that IANA lists.

We will consider adding in more information in this future, if people really want it!

## Contact
**Nicholas Car**  
*Senior Experimental Scientist*  
CSIRO Land & Water, Environmental Informatics Group  
Brisbane, Queensland  
<nicholas.car@csiro.au>  
ORCID: [0000-0002-8742-7730](https://orcid.org/0000-0002-8742-7730)  
