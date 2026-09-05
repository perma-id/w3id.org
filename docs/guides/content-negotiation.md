# Content negotiation

If you are publishing a vocabulary or ontology, you probably want one IRI —
`https://w3id.org/my-vocab/` — to give a human-readable HTML page to a browser
and machine-readable RDF to a triple store.

That is [content negotiation](https://en.wikipedia.org/wiki/Content_negotiation):
the client says what it can handle in the `Accept` header, and the server
responds accordingly.

This is the most error-prone thing people do on this service. Rule *ordering*
alone accounts for more corrective commits than any other single problem in the
repository's history. Read this page carefully, and [test](./testing) what you
write.

## How it works here

w3id.org does not serve your content, so it cannot negotiate in the ordinary
sense. What it does is inspect the `Accept` header and **redirect to a different
URL** depending on what it finds.

```
Accept: text/html          →  303 → https://example.org/vocab/index.html
Accept: text/turtle        →  303 → https://example.org/vocab/vocab.ttl
Accept: application/ld+json→  303 → https://example.org/vocab/vocab.jsonld
```

Use **303 See Other** for this. The identifier names a concept; the thing you
are redirecting to is a *document about* that concept. That distinction is what
303 exists for, and it is long-standing practice for ontology IRIs.

## A worked example

```apache
# # /my-vocab/
#
# Content-negotiated IRIs for the My Vocabulary ontology.
#
# ## Contact
# This space is administered by:
#
# Firstname Lastname
# firstname@example.org
# GitHub username: exampleuser

RewriteEngine on

# Turtle
RewriteCond %{HTTP_ACCEPT} text/turtle
RewriteRule ^$ https://example.org/vocab/vocab.ttl [R=303,L]

# JSON-LD
RewriteCond %{HTTP_ACCEPT} application/ld\+json
RewriteRule ^$ https://example.org/vocab/vocab.jsonld [R=303,L]

# RDF/XML
RewriteCond %{HTTP_ACCEPT} application/rdf\+xml
RewriteRule ^$ https://example.org/vocab/vocab.rdf [R=303,L]

# N-Triples
RewriteCond %{HTTP_ACCEPT} application/n-triples
RewriteRule ^$ https://example.org/vocab/vocab.nt [R=303,L]

# Anything else, including browsers and clients that send */*, gets the
# human-readable documentation. This rule has no condition, so it always
# matches -- which is exactly what a default is for.
RewriteRule ^$ https://example.org/vocab/index.html [R=303,L]
```

Note the `\+` in `application/ld\+json` and `application/rdf\+xml`. The
condition pattern is a regular expression, and `+` is a repetition operator.
Unescaped, `application/ld+json` means "`application/l`, then one or more `d`,
then `json`", which does not match the header you were aiming for.

## The two rules that matter

### 1. Order most specific first, default last

`RewriteCond`/`RewriteRule` pairs are evaluated top to bottom, and the first
match with `L` wins. So the ordering has to go from most specific to least.

The failure mode is putting a rule that matches broadly near the top. A browser
sends something like:

```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
```

A `RewriteCond %{HTTP_ACCEPT} text/html` placed above your RDF rules is fine.
But a condition matching `\*/\*` placed above them will catch **every browser
request too**, because `*/*` appears in that header. Put broad matches last.

### 2. The default must be a real response

Always end with an unconditional rule that redirects somewhere useful.

::: danger Do not add a 406 catch-all
This pattern gets copied from ontology templates and it is a trap:

```apache
# Do not do this
RewriteCond %{HTTP_ACCEPT} .+
RewriteRule ^$ - [R=406,L]
```

`.+` matches any non-empty `Accept` header — which is all of them. Placed
anywhere it can be reached, it returns **406 Not Acceptable** to every real
client, including browsers. See
[`htaccess/no-406-fallback`](/rules/htaccess/no-406-fallback).

If a client asks for something you do not have, giving it your HTML
documentation is a far better answer than an error.
:::

## Declaring media types

`AddType` tells Apache what content type to associate with a file extension.
You only need it if w3id.org itself is serving a file with that extension —
which, since you are redirecting to your own host, it usually is not.

Where it does matter is on **your** server: make sure *it* serves
`vocab.ttl` as `text/turtle` and not `text/plain` or
`application/octet-stream`. Many static hosts get this wrong by default, and a
correct redirect to a badly-typed file still fails for the client.

If you do need them:

```apache
AddType text/turtle .ttl
AddType application/rdf+xml .rdf .owl
AddType application/n-triples .nt
AddType application/ld+json .jsonld
```

## Version-aware IRIs

A common layout is a "latest" IRI plus explicit version IRIs:

```
https://w3id.org/my-vocab/           →  the current release
https://w3id.org/my-vocab/1.2.0      →  that specific release
```

```apache
RewriteEngine on

# --- Latest release ---------------------------------------------------

RewriteCond %{HTTP_ACCEPT} text/turtle
RewriteRule ^$ https://example.org/vocab/latest/vocab.ttl [R=303,L]

RewriteCond %{HTTP_ACCEPT} application/ld\+json
RewriteRule ^$ https://example.org/vocab/latest/vocab.jsonld [R=303,L]

RewriteRule ^$ https://example.org/vocab/latest/index.html [R=303,L]

# --- A specific release -----------------------------------------------
# ^([0-9]+(\.[0-9]+)*)$ so that only things shaped like version numbers
# match, rather than any sub-path at all.

RewriteCond %{HTTP_ACCEPT} text/turtle
RewriteRule ^([0-9]+(\.[0-9]+)*)$ https://example.org/vocab/$1/vocab.ttl [R=303,L]

RewriteCond %{HTTP_ACCEPT} application/ld\+json
RewriteRule ^([0-9]+(\.[0-9]+)*)$ https://example.org/vocab/$1/vocab.jsonld [R=303,L]

RewriteRule ^([0-9]+(\.[0-9]+)*)$ https://example.org/vocab/$1/index.html [R=303,L]
```

Constrain the version pattern rather than using `^(.+)$`. A bare `.+` will also
capture typos, trailing slashes, and paths you never intended to serve, and
send them somewhere that 404s.

## Dispatching on a file extension instead

Content negotiation is not the only option, and it is not always the best one.
Letting people ask for a format explicitly in the URL is simpler, easier to
debug, easier to paste into a bug report, and works with clients that send
unhelpful `Accept` headers:

```apache
RewriteEngine on

RewriteRule ^vocab\.(ttl|jsonld|rdf|nt)$ https://example.org/vocab/vocab.$1 [R=303,L]
```

The two approaches combine well: negotiate on the bare IRI, and also honour an
explicit extension when one is given.

## CORS

If browser-based applications need to fetch your vocabulary with JavaScript,
the **origin serving the content** needs to send CORS headers. That is your
host, not w3id.org — a redirect response is not what the browser is reading the
data from.

You may see this in `.htaccess` files here:

```apache
Header set Access-Control-Allow-Origin "*"
```

It is harmless on the redirect, but it is not what makes cross-origin fetching
work. Configure CORS where the file is actually served.

::: danger Do not copy the Access-Control-Allow-Headers line
A truncated, malformed `Access-Control-Allow-Headers` value was added to one
file in this repository years ago and has since been copied into **hundreds of
others**. It ends mid-word. If you copy an `.htaccess` from elsewhere in this
repository and it contains a line ending in `If-Modified$`, delete it. See
[`htaccess/valid-cors-header`](/rules/htaccess/valid-cors-header).
:::

## Browser detection

Some older templates in this repository sniff the `User-Agent` header:

```apache
RewriteCond %{HTTP_USER_AGENT} ^Mozilla/.*
```

This was a workaround for browsers with unhelpful `Accept` headers. It is
fragile — essentially every HTTP client on earth claims to be Mozilla,
including `curl` when told to, and many RDF tools. Prefer negotiating on
`Accept` and ending with a sensible HTML default, which achieves the same thing
without guessing.

## Test it

Content negotiation is the easiest thing on this service to get subtly wrong,
and the errors are invisible until somebody's triple store gets an HTML page.

```sh
curl -sI -H 'Accept: text/turtle'         https://w3id.org/my-vocab/
curl -sI -H 'Accept: application/ld+json' https://w3id.org/my-vocab/
curl -sI -H 'Accept: text/html'           https://w3id.org/my-vocab/
curl -sI -H 'Accept: */*'                 https://w3id.org/my-vocab/
curl -sI                                   https://w3id.org/my-vocab/
```

Check every one of those, including the last two. See
[Testing your changes](./testing) for how to run this against your rules before
they are merged.
