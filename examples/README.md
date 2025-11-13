# /examples/

This permanent W3ID is meant to be a place to host examples for publishing things on w3id.org.

* [.htaccess](#htaccess)
  * [What is .htaccess?](#what-is-htaccess)
  * [Put ID info and maintainer info inside .htaccess](#put-id-info-and-maintainer-info-inside-htaccess)
  * [Quick intro to URL writing rules](#quick-intro-to-url-rewriting-rules)
  * [Example 1: Minimalist (grouping)](#example-1-minimalist-grouping)
  * [Example 2: Supporting multiple media types (MIME types)](#example-2-supporting-multiple-media-types-mime-types)
  * [Example 3: Dealing with query string](#example-3-dealing-with-query-string)
  * [Example 4: Publish vocabularies with W3ID](#example-4-publish-vocabularies-with-w3id)
  * [Example 5: Version-aware URIs of ontologies](#example-5-version-aware-uris-of-ontologies)
  * [Example 6: Redirection based on a file extension in the URL](#example-6-redirection-based-on-a-file-extension-in-the-url)
* [README.md](#readmemd)


## .htaccess

`.htaccess` file is the key to the working of URL redirection service of W3ID.
Without it, redirection cannot be done.

### What is `.htaccess`?

From [Wikipedia](https://en.wikipedia.org/wiki/.htaccess):
> An .htaccess (hypertext access) file is a directory-level configuration file
supported by several web servers, used for configuration of website-access
issues, such as URL redirection, URL shortening, access control (for different
web pages and files), and more. The 'dot' (period or full stop) before the
file name makes it a hidden file in Unix-based environments. 

In the W3ID context, `.htaccess` is used primarily for URL redirection. This
file is where you can put URL rewriting rules. A set of URL rewriting rules
will work together and effectively make URL redirection happen.

### Put ID info and maintainer info inside .htaccess

Maintainers of an ID are requested to put brief ID info and maintainer info
in the comments (lines staring with `#` character) of an `.htaccess` file.

Including contact info and GitHub usernames helps ease the overall
maintenance process.

```ApacheConf
# Example
#
# https://w3id.org/examples/simple/ redirects to https://example.com/
#
# ## Contact
# This space is administered by:
#
# Firstname Secondname
# email@example.com
# GitHub username: xxx

RewriteEngine on
RewriteRule ^ https://example.com/ [R=302,L]
```

### Quick intro to URL rewriting rules

A simple `.htaccess` file for URL redirection can look like this:
```ApacheConf
RewriteEngine on
RewriteRule ^ https://example.com/ [R=302,L]
```

`RewriteEngine on` in the first line tells the web server to turn URL rewriting engine on.

While the second line, starting with `RewriteRule`, is the actual rewriting rule.

This is the syntax of the *RewriteRule* directive:
```ApacheConf
RewriteRule Pattern Substitution [Flag1,Flag2,Flag3]
```

* *Pattern* is a Perl compatible regular expression, which means you can specify a sequence of characters to match pattern in the URL.
  * For example, `^` matches the beginning of the text, `$` matches the end of the text, `.` matches any single character ("a", "7", or any character, one time), and `*` repeats the previous match zero or more times (so `.*` matches "a", "7", "xyz42", and an empty string).
  * What this Pattern is compared against varies depending on where the RewriteRule directive is defined. In W3ID context, where a per-directory `.htaccess` is used, if the full requested URL is `https://w3id.org/examples/subdir/file.html`, the text to be compared against will be `subdir/file.html`.
* *Substitution* is the string that replaces the text that was matched by Pattern. It can be part of the URL (URL-path) to be combined with the hostname later or it can be a full URL (absolute URL).
  * In W3ID context, the Substitution tends to be an absolute URL to an external (non w3id.org) resource.
* *Flags* set [special actions](https://httpd.apache.org/docs/current/rewrite/flags.html) to be performed. Flags is a comma-separated list, surround by square brackets. They are optional. Common flags include `R` (redirect), `L` (last, stop processing the rule set), and `NE` (no character escape).

So in our first example:
```ApacheConf
RewriteRule ^ https://example.com/ [R=302,L]
```
It means:
* *Pattern:* `^` -- if a beginning of a string is found in the requested URL (it will always find, as every string must have a beginning):
* *Substitution:* `https://example.com/` -- replace the whole URL with https://example.com/
* *Flag1:* `R=302` -- issue a HTTP redirect, with [status code 302](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes), to the client
* *Flag2:* `L` -- stop processing the rule set

You can have more than one *RewriteRule* in a single `.htaccess` file.

See [Apache HTTP Server documentation](https://httpd.apache.org/docs/current/rewrite/intro.html) for more details about *RewriteRule*, regular expressions, and other directives.


### Example 1: Minimalist (grouping)

This 3 lines of code from [/mircat/.htaccess](https://github.com/perma-id/w3id.org/blob/master/mircat/.htaccess) redirects `https://w3id.org/mircat/<ANYTHING>` to `https://fairsharing.github.io/mircat/<ANYTHING>`.

The URL rewriting rule for that is:
```ApacheConf
RewriteRule ^(.*)$ https://fairsharing.github.io/mircat/$1 [R=302,L]
```

A sequence of characters matches inside a pair of parentheses, or "grouping", will be put in a computer memory and can be recalled by using a special character `$` followed with a group number (`$1`, `$2`, `$15`). A group number is starting from one.

So in the example above, every characters between the beginning of the string (`^`) and the end of the string (`$`) will be stored in group one and can be recalled by a character sequence `$1`.

If the request URL is `https://w3id.org/mircat/subdir/`, the *Pattern* `^(.*)$` will matched with the whole `subdir/`. As `.*` is inside parentheses, `subdir/` will be stored in group one.

When the *Substitution* `https://fairsharing.github.io/mircat/$1` is evaluated, `$1` will be replaced by `subdir/`, resulting a string `https://fairsharing.github.io/mircat/subdir`. This final string will be used for the redirection.


### Example 2: Supporting multiple media types (MIME types)

A single resource, located by the same URL, can have multiple representations.
For example, an image can can be represented in both GIF and PNG formats.

A web server can be configured to return a different media type or file format
depending on the client's request or capability. We call this mechanism
"[content negotiation](https://en.wikipedia.org/wiki/Content_negotiation)".

[/ppop/.htaccess](https://github.com/perma-id/w3id.org/blob/master/ppop/.htaccess) demonstrates the use of `RewriteCond %{HTTP_ACCEPT}` to check which [media types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_Types) the client accepts or expects to be returned by the server.

A simplified version of the URL rewriting rules in that file will look like this:
```ApacheConf
AddType text/turtle .ttl

RewriteEngine on

# Rewrite rule to serve HTML content
RewriteCond %{HTTP_ACCEPT} text/html
RewriteRule ^$ https://protect.oeg.fi.upm.es/ppop/ppop.html [R=303,L]

# Rewrite rule to serve TTL content
RewriteCond %{HTTP_ACCEPT} text/turtle
RewriteRule ^$ https://protect.oeg.fi.upm.es/ppop/ppop.ttl [R=303,L]
```

The rule set utilizes the *RewriteCond* directive, which "defines a rule
condition. One or more RewriteCond can precede a RewriteRule directive. The
following rule is then only used if both the current state of the URI matches
its pattern, and if these conditions are met"
([Apache HTTP Server documentation](https://httpd.apache.org/docs/current/mod/mod_rewrite.html#rewritecond)).

The above example will have this behavior:
* If `%{HTTP_ACCEPT}` matches `text/html`, the server will return an HTML
document (`ppop.html`)
* If `%{HTTP_ACCEPT}` matches `text/turtle`, the server will return a Turtle
document (`ppop.ttl`)

The syntax of `RewriteCond` directive is:
```ApacheConf
RewriteCond TestString CondPattern [Flags]
```

Where *CondPattern* is a regular expresssion to match pattern in *TestString*.

In this case, *TestString* is `%{HTTP_ACCEPT}` which value is taken from
an `Accept` field in the HTTP request header. The `Accept` field can be a
string like this:

```HTTP
Accept: text/html, application/xhtml+xml, application/xml, image/webp
```

Each media type will be presented, separated by a comma. We can then use
*CondPattern* to match media types in this string.


### Example 3: Dealing with query string

Everything after the question mark (`?`) in the URL, but not that `?` itself,
is a query string.

For example, for the URL `https://en.wikipedia.org/w/index.php?title=Web`,
the query string is `title=Web`.

As the query string is not included in the string that the *Pattern* of
*RewriteRule* will compared against, you cannot use *Pattern* to match them.

To find a pattern in the query string, use `%{QUERY_STRING}` as a *TestString*
in *RewriteCond*.

As an example, if you would like to redirect the URL
`https://w3id.org/examples?a=1&b=2` to
`https://example.com/path/file.php?a=1&b=2`, you can use this set of rules:

```ApacheConf
RewriteCond %{QUERY_STRING} (.*)
RewriteRule ^ https://example.com/path/file.php?%1? [R=302,L]
```

In this example, the *CondPattern* `(.*)` in *RewriteCond* will match every
character in the query string (`a=1&b=2`) and put it in group one. This group
one (`%1`) is used later in the *Substitution* of *RewriteRule*.

Note that the special character to recall groups from *CondPattern* of
*RewriteCond* is `%` (unlike the special character to recall groups from
*Pattern* of *RewriteRule*, which is `$`).

The character `?` at the end of the *Substitution* of *RewriteRule* tells the
server not to pass the query string to the final URL after rewrite.


### Example 4: Publish vocabularies with W3ID

If you plan to publish a vocabulary/ontology with W3ID,
see [`/example/.htaccess`](https://github.com/perma-id/w3id.org/blob/master/example/.htaccess)
and https://w3id.org/example/.


### Example 5: Version-aware URIs of ontologies

See [`/OWLunit/.htaccess`](https://github.com/perma-id/w3id.org/blob/master/OWLunit/.htaccess).


### Example 6: Redirection based on a file extension in the URL

Check for the pattern of a file extension (like `.json`, `.png`, `.rdf`, `.html`)
in the requested URL, and rewrite the URL accordingly.

This technique can complement `RewriteCond %{HTTP_ACCEPT}` rules (explained
in [Example 2](#example-2-supporting-multiple-media-types-mime-types)).

See [`/SocDOnt/.htaccess`](https://github.com/perma-id/w3id.org/blob/master/SocDOnt/.htaccess).


## README.md

Each ID hosted on W3ID is required to have a file named `README.md` containing
information about the ID itself and information about the maintainer(s).
This can be more elaborate than the information inside `.htaccess`.

The `.md` file extension at the end of the file name indicates that the file
uses Markdown markup language for text formatting. You can have tables and
images as well, if needed.

GitHub will automatically display the content of a `README.md` to repository
visitors.

An example of a good README file:
[`w3id.org/dggs/README.md`](https://github.com/perma-id/w3id.org/blob/master/dggs/README.md)
