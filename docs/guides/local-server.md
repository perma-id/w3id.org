# Running a local server

The only way to know what your `.htaccess` actually does is to serve it with a
real Apache. This page sets one up on your machine, configured the way the live
service is configured, so `ids/my-project/` answers at
`http://localhost:8080/my-project/`.

::: info What has been run
All three setups on this page have been run end to end against this
repository's own `ids/` directory, and they agree with each other: the
identifier root, the bare no-slash form, sub-paths, `Accept` negotiation, the
site root, a missing identifier and a request for an `.htaccess` file all
behave as described below.

That was on one machine, once. If something here does not work for you, or
works only after you change it, please
[open an issue](https://github.com/perma-id/w3id.org/issues) rather than
working around it quietly.
:::

You do not need this page for a simple redirect. Read your rules carefully,
[run the checks](./testing#run-the-checks), and confirm the target resolves. Come
here when a rule is not matching and you cannot see why, when you are doing
content negotiation, or when you want to be sure before asking a volunteer to
review it.

## What it emulates

The local server mirrors the live single-server configuration: the same Apache
modules, the same `AllowOverride`, the same document root layout, the same
`Options`. Two things are deliberately different.

- **No redirect to HTTPS.** The live server bounces all plain HTTP to
  `https://w3id.org/`. Locally that would send every test request to the real
  service, so you would be testing the deployed rules instead of your own.
- **No TLS.** Plain HTTP is enough, because rewrite rules do not behave
  differently by scheme. See [HTTPS](#https-and-certificates) if you need it
  anyway.

The module list is restricted on purpose, to exactly what the live server runs.
If you use a directive from some other Apache module, you get a 500 here rather
than a working local test and a broken deployment. Adding a `LoadModule` line
to make your own rules work is the wrong fix — production will not have it.

## With Docker

The recommended path. From the repository root:

```sh
cd tools/server
docker compose up
```

Leave it running. In another terminal:

```sh
curl -sI http://localhost:8080/my-project/
```

To stop it, press Ctrl-C, or run `docker compose down` from `tools/server/`.

Apache's logs go to the container's output, so the terminal running
`docker compose up` shows every request and every error. That log is the only
thing that names the file and line when an `.htaccess` fails to parse.

```sh
docker compose logs -f w3id      # if you started it with -d
```

The identifier tree is mounted read-only. The server cannot modify the files
you are about to commit.

### Without building an image

If you would rather not wait for a build, the stock Apache image can be pointed
at the tree directly. From the repository root:

```sh
docker run --rm -p 8080:80 \
  -v "$PWD/ids:/usr/local/apache2/htdocs:ro" \
  -v "$PWD/tools/server/conf:/w3id/conf:ro" \
  httpd:2.4 \
  httpd -D FOREGROUND -c "Include /w3id/conf/docker-direct.conf"
```

This is the less faithful path. Because the image's own configuration runs
first, it does **not** give you the restricted module set, so an `.htaccess`
that works this way can still fail in production. Use it to get moving; use
`docker compose up` when the answer matters.

## With a native Apache

Closest to how the service actually runs. On Debian or Ubuntu:

```sh
sudo apt install apache2
sudo a2enmod rewrite headers setenvif env mime dir alias autoindex negotiation \
  deflate filter reqtimeout access_compat
```

Copy the site configuration into place and edit one line in it — the
`Define W3ID_REPO` at the top must be the absolute path of your checkout:

```sh
sudo cp tools/server/conf/w3id-site.conf /etc/apache2/sites-available/
sudo editor /etc/apache2/sites-available/w3id-site.conf
sudo a2ensite w3id-site
sudo apache2ctl configtest
sudo systemctl reload apache2
```

`configtest` before reloading, every time. A syntax error in the site file
stops Apache from starting at all, rather than failing one directory.

Apache must be able to read your checkout. If it is under `/home`, either move
it somewhere like `/srv/w3id.org` or grant the `www-data` user traversal — a
403 on every URL usually means it cannot get through a parent directory.

Logs land in `/var/log/apache2/w3id-local-error.log`.

## Checking a redirect

There is a script for the requests worth making:

```sh
tools/server/bin/resolve-identifier my-project
```

It reports the status and `Location` for the identifier root, the bare form
with no trailing slash, and each of the `Accept` headers that matter, then
follows the whole chain to see where it ends up.

Give it sub-paths as extra arguments — including the ones you did **not** mean
to match, since a rule catching a request by accident is exactly what this
finds:

```sh
tools/server/bin/resolve-identifier my-project vocab vocab/Thing 1.2.0
```

For a first run, `examples` is a real identifier already in the tree, so it
works before you have written anything of your own:

```sh
tools/server/bin/resolve-identifier examples
```

Set `W3ID_BASE` if you changed the port:

```sh
W3ID_BASE=http://localhost:9000 tools/server/bin/resolve-identifier my-project
```

Everything the script does, you can do by hand — see
[What to check](./testing#what-to-check) in the testing guide for the
individual `curl` invocations.

## Reading the result

**A `302` or `303` with a `location:`** pointing where you intended is success.
Check the URL character by character; a redirect to the wrong place is still a
redirect.

**A `301` on the bare form** is normal. Because your identifier is a real
directory, Apache redirects `/my-project` to `/my-project/` before any of your
rules run, and your rule fires on the second request. Do not try to remove that
hop — the directives that appear to fix it cause a 403 instead. See
[`htaccess/no-options-directive`](/rules/htaccess/no-options-directive).

**A `500`** is a syntax error, and it affects every URL under that directory,
not just the rule you got wrong. The server log names the file and the line.
The usual cause is a space inside the flag brackets —
[`htaccess/no-flag-whitespace`](/rules/htaccess/no-flag-whitespace).

**A `404`, or your rule not firing at all**, usually means the pattern never
matched. The pattern is relative to the directory, so a leading slash or a
repeated directory name silently matches nothing —
[`htaccess/pattern-relative-to-dir`](/rules/htaccess/pattern-relative-to-dir).
An unescaped dot is the other common cause —
[`htaccess/escape-literal-dots`](/rules/htaccess/escape-literal-dots).

**A `406`** means a content-negotiation catch-all is matching real requests —
[`htaccess/no-406-fallback`](/rules/htaccess/no-406-fallback).

**A `403` on every URL** is a filesystem permission problem on the native
setup, not a rule problem.

When a rule will not match and you have run out of ideas, turn on mod_rewrite's
tracing and watch it decide:

```apache
LogLevel warn rewrite:trace3
```

Add that to the virtual host — not to your `.htaccess`, where it does not
belong and would not be accepted. It logs every rewrite Apache attempts, which
is verbose and worth it.

## HTTPS and certificates

**You almost certainly do not need this.** Rewrite rules do not behave
differently over HTTPS, so `http://localhost:8080` tests the same rules. The
one thing plain HTTP cannot exercise is a rule that inspects `%{HTTPS}` or
`%{SERVER_PORT}`, which is rare and discouraged.

If you do need it, generate a certificate for `localhost`. Run this from the
`tools/server` directory, which has a `tls/` entry in `.gitignore` — so a
private key generated there cannot be committed by accident:

```sh
cd tools/server
mkdir -p tls
openssl req -x509 -newkey rsa:2048 -nodes -days 365 \
  -keyout tls/localhost.key \
  -out tls/localhost.crt \
  -subj '/CN=localhost' \
  -addext 'subjectAltName=DNS:localhost,IP:127.0.0.1'
```

Then enable `mod_ssl` and point a `<VirtualHost *:8443>` at those two files
with `SSLEngine on`, including the same `conf/w3id.conf` as the HTTP host.

Be aware of what a self-signed certificate does and does not get you:

- **`curl` needs `-k`**, otherwise it refuses to connect. That also disables
  the check you might have been hoping to make.
- **Browsers show a full-page interstitial**, and there is no way to make a
  self-signed certificate simply look valid. Getting a green padlock means
  creating a local certificate authority, adding it to your operating system's
  trust store, and issuing a certificate from it — [`mkcert`] automates this.
  Trusting your own CA has real consequences for your machine; understand them
  before you do it.
- **Do not test HTTPS in a browser that has visited the real `w3id.org`.** The
  live service sends HSTS, so the browser may refuse to let you click through a
  certificate warning for that hostname at all. Use `localhost`, which is what
  the certificate above is for.

[`mkcert`]: https://github.com/FiloSottile/mkcert

## When it will not start

**`Address already in use`** — something already holds port 8080. Change the
host port in `tools/server/compose.yaml`, or, on the native setup, check
whether `/etc/apache2/ports.conf` also listens on 8080; the site file adds its
own `Listen`.

**Every URL returns 404, including `/`** — the document root is not pointing at
`ids/`. Under Docker, check you ran the command from the repository root so
`$PWD/ids` resolved. Under Apache, check `Define W3ID_REPO`.

**Your rules are completely ignored, but files are served** — `mod_rewrite` is
not loaded, or `AllowOverride` is not `All`. This is the failure that looks like
success: Apache serves the tree and silently discards every rule in it.

**Changes to an `.htaccess` seem not to take effect** — they should apply on the
next request, with no reload. If they do not, you are probably editing a
different file than the one being served; check the path the container has
mounted.

## What this cannot tell you

A local server proves what Apache does with your rules. It says nothing about
whether the answer is right.

It does not know where your identifier is supposed to point, and it does not
check that the target is alive — the redirect target is on the public internet
and is somebody else's server. Confirm that separately:

```sh
curl -sIL https://example.org/vocab.ttl | grep -iE '^(HTTP|content-type)'
```

And when the pull request is merged, check it for real, because the deployed
configuration is the only one that counts:

```sh
curl -sIL https://w3id.org/my-project/ | grep -iE '^(HTTP|location)'
```
