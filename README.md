Permanent Identifiers for the Web
=================================

This repository holds the website source code for <https://w3id.org/>.

[![Build Status](https://travis-ci.org/perma-id/w3id.org.svg)](https://travis-ci.org/perma-id/w3id.org)

#### Content

* [Purpose](#purpose)
* [Management](#management)
* [System Operations](#system-operations)
* [**Creating a New Identifier**](#new)
* [Naming Policy](#naming-policy)
* [W3ID Community](#w3id-community)
* [Disclaimer](#disclaimer)

### Purpose

The purpose of this website is to provide a secure, permanent
[URL](https://en.wikipedia.org/wiki/URL) re-direction service for Web
applications. This service is run by the
[W3C Permanent Identifier Community Group](https://www.w3.org/community/perma-id/).

Web applications that deal with
[Linked Data](https://en.wikipedia.org/wiki/Linked_data) often need to
specify and use URLs that are very stable. They utilize services such
as this one to ensure that applications using their URLs will always
be re-directed to a working website. This website operates like a
[switchboard](https://en.wikipedia.org/wiki/Telephone_switchboard),
connecting requests for information with the true location of the
information on the Web. The switchboard can be reconfigured to point
to a new location if the old location stops working.

### Management

There is a growing group of organizations in a consortium that have pledged
responsibility to ensure the operation of this website. These organizations
are:

* [Digital Bazaar](https://www.digitalbazaar.com/)
* [3 Round Stones](http://3roundstones.com/)
* [OpenLink Software](https://www.openlinksw.com/)
* [Applied Testing and Technology](https://www.aptest.com/)
* [Bosatsu Consulting](https://bosatsu.net/)
* [KurrawongAI](https://kurrawong.ai)

They are responsible for all
administrative tasks associated with operating the service. The social
contract between these organizations gives each of them full access to
all information required to maintain and operate the website. The
agreement is setup such that a number of these companies could fail,
lose interest, or become unavailable for long periods of time without
negatively affecting the operation of the site.

#### Joining the Management consortium

To join the management consortium, please make yourself known to the
W3ID community via participation in the mailing list (see the
[W3ID Community](#w3id-community) section below) and then, if you are
still keen to join, please submit an Issue to the
[GitHub Issue Tracker](https://github.com/perma-id/w3id.org/issues)
with the title *Seeking to join the W3ID Consortium* and include
your details.

### System Operations

This website operates in HTTPS-only mode to ensure end-to-end security.
This means that it may be used for Linked Data applications that require
high levels of security such as those found in the financial, medical,
and public infrastructure sectors.

All identifiers associated with this website are intended to be around
for as long as the Web is around. This means decades, if not centuries.
If the final destination for popular identifiers used by this service
fail in such a way as to be a major inconvenience or danger to the Web,
the community will mirror the information for the popular identifier
and setup a working redirect to restore service to the rest of the Web.

<a id="new"></a>
## Creating a New Identifier

If you would like to add or update a permanent identifier of the form
`https://w3id.org/...`, the preferred procedure is to perform the
following steps:

1. _Fork_ [the _Repository_ for this system](https://github.com/perma-id/w3id.org)
   on GitHub.
2. Add or update a new redirect entry and commit your changes.
   1. If it does not yet exist, create a new directory with an intended permanent
      identifer name (see [Naming Policy](#naming-policy) below).
   2. If they do not yet exist, add `.htaccess` and `README.md` files to the directory.
      * `.htaccess` contains redirection rules, for computer to read and perform.
      * `README.md` contains more identifier info and contact info, for human to read.
      * See [w3id.org/examples](https://github.com/perma-id/w3id.org/tree/master/examples)
      for examples of `.htaccess` and `README.md`.
3. Submit a _Pull Request_ for your changes.

The maintainers of this system will then act on that _Pull Request_ and
merge it into this system's content. You will then be able to see your
changes in the repository and via resolution of the identifier you
created or edited.

If the terms _Fork_ and _Pull Request_ are new to you, you need to
familiarize yourself with the [Git](https://git-scm.com/) version
control system and [GitHub](https://github.com/), the platform used
to host this system. Please see this documentation:

* [Forking a Repository](https://docs.github.com/en/github-ae@latest/github/getting-started-with-github/fork-a-repo)
* [Creating a Pull Request across Forks](https://docs.github.com/en/github-ae@latest/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request-from-a-fork)

#### Suitable PR content

Please help out the maintainers of the service with the following in your
Pull Requests:

* **Contact info** in a `README.md` or `.htaccess` comment.
* **Test your changes** with a local checkout of the site.
* **_Squash_ multiple commits** into one commit before a pull request
  if appropriate.
  * Here is information on _squashing_ commits:
    [How to Squash Commits in Git](https://www.git-tower.com/learn/git/faq/git-squash/)
* **Use descriptive commit messages**. In particular, include your project
  name in the commit message. For those using the GitHub interface, please
  modify the default "Create/Update/Delete `.htaccess`" message.

You can also send a request to add a redirect to the
[public-perma-id@w3.org](https://lists.w3.org/Archives/Public/public-perma-id/)
mailing list. Make sure to include the URL that you want on w3id.org, the
URL that you want to redirect to, and the HTTP code that you want to use
when redirecting. An administrator will then create the redirect for you.

### Naming Policy

There is no official policy on identifier names. The current practice
is to claim a top-level directory name and add project specific second
level identifiers. For instance, `https://w3id.org/PROJECT-ID/SUB-ID...`.
Shared top-levels are also available such as
`https://w3id.org/people/PERSON-ID`. There is no official list or policy
for reserved identifiers. However, the administrators may deny requests
for identifiers that are too generic, could cause confusion, are
inappropriate or offensive, or otherwise may be needed for future
service expansion.

### W3ID Community

If you wish to engage the community in discussion about this service for
your Web application, please send an e-mail to the
[public-perma-id@w3.org mailing list](https://lists.w3.org/Archives/Public/public-perma-id/).

* * *

### Disclaimer

The letters 'w3' in the domain name for this site stand for "World Wide
Web". Other than hosting the software for the Permanent Identifier
Community Group, the "World Wide Web Consortium" (W3C) is not involved
in the support or management of this website in any way.
