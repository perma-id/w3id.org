# A local w3id.org server, for testing .htaccess rules before opening a pull
# request. Not a production image -- see the note at the bottom.
#
# Build and run from this directory with `docker compose up`, or by hand from
# the repository root:
#
#   docker build -t w3id-local tools/server
#   docker run --rm -p 8080:80 -v "$PWD/ids:/usr/local/apache2/htdocs:ro" w3id-local
#
# The official image is built with --enable-mods-shared=reallyall, so every
# Apache module the tree could need is already present as a shared object.
# Nothing has to be installed or compiled here; conf/httpd.conf simply decides
# which of them load, and it loads exactly the set the live server enables.
FROM httpd:2.4

# conf/httpd.conf replaces the image's stock configuration and includes
# conf/w3id.conf, which is shared verbatim with the native Debian setup.
COPY conf/httpd.conf conf/w3id.conf /usr/local/apache2/conf/

# Fail the build rather than ship an image that cannot start. This catches a
# typo in either config file, and -- because the document root is empty at
# build time -- it also proves the configuration does not depend on the tree
# being mounted in order to parse.
RUN httpd -t

EXPOSE 80

# NOT FOR PRODUCTION. This image serves plain HTTP, has no TLS, and expects
# the identifier tree to be bind-mounted rather than baked in. A real
# deployment image would also need the tree copied in at build time so it is
# immutable, and would want AllowOverride reconsidered -- with more than two
# thousand .htaccess files, Apache stats a per-directory config in every parent
# directory of every request, which is the dominant per-request cost.
