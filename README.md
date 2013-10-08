Permanent Identifiers for the Web
=================================

This repository holds the website source code for https://w3id.org/

The purpose of w3id.org is to provide a secure, permanent URL re-direction
service for Web applications. This service is run by the [W3C Permanent
Identifier Community Group](http://www.w3.org/community/perma-id/).

Web applications that deal with Linked Data often need to specify and use URLs 
that are very stable. They utilize services such as this one to ensure that 
applications using their URLs will always be re-directed to a working 
website. This website operates like a switchboard, connecting requests for 
information with the true location of the information on the Web. The 
switchboard can be reconfigured to point to a new location if the old 
location stops working.

There are a growing group of organizations that have pledged responsibility 
to ensure the operation of this website. These organizations are: 
Digital Bazaar, 3 Round Stones, OpenLink Software, Applied Testing and 
Technology, Openspring, and Bosatsu Consulting. 
They are responsible for all administrative 
tasks associated with operating the service. The social contract between 
these organizations gives each of them full access to all information required 
to maintain and operate the website. The agreement is setup such that a 
number of these companies could fail, lose interest, or become unavailable 
for long periods of time without negatively affecting the operation of the site.

This website operates in HTTPS-only mode to ensure end-to-end security. 
This means that it may be used for Linked Data applications that require 
high levels of security such as those found in the financial, medical, and 
public infrastructure sectors.

All identifiers associated with this website are intended to be around for 
as long as the Web is around. This means decades, if not centuries. If the 
final destination for popular identifiers used by this service fail in 
such a way as to be a major inconvenience or danger to the Web, the community 
will mirror the information for the popular identifier and setup a working 
redirect to restore service to the rest of the Web.

Adding a Permanent Identifier to w3id.org
=========================================

For the technically savvy, the preferred way to create the redirect yourself is
by following these steps:

1. Fork this source code repository.
2. Add a new re-direct entry. Look in the '/security/.htaccess' file for a
   simple example.
3. Commit your changes and submit a pull request.
4. w3id.org administrators will review your pull request and merge it if 
   everything looks correct. Once the pull request is merged, the changes go
   live immediately.

You can also send a request to add a redirect to the 
[public-perma-id@w3.org](http://lists.w3.org/Archives/Public/public-perma-id/)
mailing list. Make sure to include the URL that you want on w3id.org, the
URL that you want to redirect to, and the HTTP code that you want to use
when redirecting. An administrator will then create the redirect for you.
