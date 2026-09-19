# w3id.org local server

Runs the repository's `ids/` directory under a real Apache, configured the way
the live service configures it, so a redirect can be tested before it is
merged.

```sh
cd tools/server && docker compose up
```

Then `http://localhost:8080/my-project/` serves `ids/my-project/`, and

```sh
tools/server/bin/resolve-identifier my-project
```

reports what the server does with it.

If you have no Docker and no root, `bin/build-httpd` then `bin/run-server`
does the same thing with an Apache you own.

Contributor-facing instructions, including the native Apache setup, the
unprivileged one and the TLS options, are in
[`docs/guides/local-server.md`](../../docs/guides/local-server.md).
This file is about how the configuration is put together and why.

## Why it works the way it does

**A local server that disagrees with the live one is worse than none.** It
produces a confident answer that does not hold after merge, which is the single
most expensive kind of wrong in this repository. Every decision below follows
from that.

**So the configuration is shared, not copied.** `conf/w3id.conf` holds
everything that defines w3id.org's behaviour and nothing about where Apache
keeps its files. Each setup adds a thin wrapper supplying only its own layout —
server root, module paths, listener, log destinations — and then includes that
one file. Several hand-maintained configs would drift, and the drift would be
invisible until someone's redirect broke in production.

That the wrappers are interchangeable is what made adding a fourth cheap:
`conf/rootless.conf` differs from the container's wrapper only in where the
modules are, where the pid file and logs go, and in having no `User`/`Group`,
because a server an ordinary user starts is already running as that user and
cannot drop privilege to anyone else.

Every directive in `conf/w3id.conf` is valid in both server config and virtual
host context. That is what lets one file serve every wrapper, and it is a
constraint to respect when editing it: a directive that is server-config-only
would break the native path, which includes the file inside a `<VirtualHost>`.

**The module list is a restriction, not a convenience.** The official
`httpd:2.4` image is built with `--enable-mods-shared=reallyall`, so every
Apache module is present on disk as a shared object and the configuration alone
decides what loads. `conf/httpd.conf` loads exactly the set the live server
enables, minus TLS and the auth modules nothing uses.

This means a contributor who reaches for a directive from a module production
does not run gets a 500 locally, at the moment they write it, rather than a
passing local test and a broken deployment. Adding a `LoadModule` line to make
your own `.htaccess` work is therefore the wrong fix — the live server will not
have it.

`bin/build-httpd` reproduces that property rather than approximating it: its
prefix ends up holding about ninety shared modules, so `conf/rootless.conf`
alone decides what loads, exactly as in the container. It stops short of
`reallyall` only because that demands lua, ldap and openssl headers, which a
machine with a plain toolchain need not have; the cost is no `mod_ssl`, so
that path cannot serve HTTPS. This is also the reason `bin/run-server` prefers
the Apache it built over one the system provides — a distribution links some
modules into the binary, where no configuration can unload them, and the
restriction silently stops being a restriction.

`mod_autoindex` and `mod_negotiation` are loaded despite nothing in the tree
needing them directly, because production's document root sets `Indexes` and
`MultiViews`. Without those two modules the Options would silently do nothing,
and the local server would quietly disagree with the real one.

**`AllowOverride All` is required, not lazy.** Per-directory `.htaccess` files
are the service. A small number of them additionally use `<IfModule>`, `<If>`
and `<Files>`, which no narrower override class permits, so narrowing it would
turn those directories into 500s.

## Files

```
conf/w3id.conf          shared behaviour; included by every wrapper
conf/httpd.conf         container wrapper, upstream layout
conf/w3id-site.conf     native Debian wrapper, for sites-available/
conf/docker-direct.conf overlay for running the stock image unbuilt
conf/rootless.conf      wrapper for an Apache an ordinary user runs
Dockerfile              FROM httpd:2.4; installs nothing
compose.yaml            mounts ../../ids read-only, publishes 8080
bin/build-httpd         builds an Apache into the user's cache directory
bin/run-server          runs it against this checkout's ids/
bin/resolve-identifier  makes the requests and prints what came back
```

## Departures from production

Two, both deliberate, both commented where they occur.

**No HTTPS redirect.** The live `*:80` virtual host is a blanket
`Redirect permanent / https://w3id.org/`. Reproduced locally it would bounce
every test request to the real service, so you would be testing the deployed
rules instead of your own. The local config serves HTTP directly. Rewrite
behaviour does not depend on the scheme.

**No TLS.** It is opt-in; see the guide. Rewrite rules do not behave
differently by scheme unless they test `%{HTTPS}` or `%{SERVER_PORT}`
themselves.

## The unbuilt path

`conf/docker-direct.conf` runs the stock `httpd:2.4` image with no build step,
by appending one `Include` to the image's own configuration. It exists because
`docker build` is a slow first step for someone who wants to check one rule.

It is the less faithful path, and the file says so: because the stock
configuration still runs first, it does not give the restricted module set, so
an `.htaccess` that works under it can still fail in production. Prefer
`docker compose up` when the answer matters.

## Not a production image

The `Dockerfile` serves plain HTTP and expects `ids/` to be bind-mounted rather
than baked in. A real deployment image would copy the tree in at build time so
it is immutable, and would want `AllowOverride` reconsidered: with a
per-directory config file in nearly every directory of the tree, Apache stats
one in every parent directory of every request, which is the dominant
per-request cost.

## Tests

There is no automated test suite here, and adding one would mean starting a
container from a test process. What exists instead:

```sh
sh -n bin/resolve-identifier      # shell syntax
sh -n bin/build-httpd
sh -n bin/run-server
bin/run-server test               # `httpd -t` against the real tree
docker build -t w3id-local .      # runs `httpd -t` as a build step, so a
                                  # config typo fails the build
```

The `httpd -t` line in the `Dockerfile` is deliberate. It parses both config
files against an empty document root, which also proves the configuration does
not depend on the tree being mounted in order to load. It has already earned
itself once, catching a missing `mod_logio` at build time rather than as a
container that exits on startup.

Everything else is checked by hand. All four setups have been run against the
real tree and produce the same answers: rules fire, `Accept` negotiation varies
the target, the bare form takes the extra 301 hop, `302` and `303` are
preserved distinctly, a missing identifier is a 404, and a request for an
`.htaccess` is refused with 403.

For the rootless setup that means: `bin/build-httpd` from nothing on Ubuntu
24.04 with no Apache, no `sudo` and no apt metadata; `bin/run-server test`
reporting `Syntax OK` against all 2879 `.htaccess` files in the tree; the
`start`/`status`/`stop` cycle; `W3ID_PORT` on a second port; and
`bin/resolve-identifier` unchanged against it. The error log came up clean —
no warning about the missing `User`/`Group`, and byte counts in the access log,
which is `%O` and therefore `mod_logio`, working.

One option in that setup has never been run: `W3ID_ALLOW_SYSTEM_HTTPD=1`,
because the machine it was developed on had no system Apache to fall back to.
The `<IfModule>` guards in `conf/rootless.conf` and the module-directory probe
in `bin/run-server` exist for that path and are both untested.

That the container and a native Debian Apache agree is the result worth
re-checking after any change to `conf/w3id.conf`, because it is the claim the
shared-fragment design rests on. It also confirms the context constraint holds
in practice: every directive in that file is accepted inside a `<VirtualHost>`,
which is what lets the native wrapper include it. A directive that is
server-config-only would fail there with `AH00526: not allowed here` while the
container carried on working.
