#!/bin/bash
set -euo pipefail

pushd "$(dirname "$0")" > /dev/null

echo "Assembling httpd service..."
image_name="inrupt_httpd"
podman build -t "${image_name}" . > /dev/null

# Use a random port to avoid clashes with other services on the host running the test
apache=$(podman run --rm --detach --publish "127.0.0.1::80" -v "$(pwd)/../":/usr/local/apache2/htdocs/inrupt/ "${image_name}")
local_host_and_port=$(podman port "${apache}" 80)
echo "httpd is running locally as ${local_host_and_port}"

echo "Running actions to gather data..."
readme_contents=$(curl --silent "http://${local_host_and_port}/inrupt/README.md")
request_vocab=$(curl -H "Accept: text/turtle" --silent --verbose "http://${local_host_and_port}/inrupt/namespace/vocab/care_and_feed/" 2>&1)
request_docs=$(curl -H "Accept: text/html" --silent --verbose "http://${local_host_and_port}/inrupt/namespace/vocab/care_and_feed/" 2>&1)

logs=$(podman logs "${apache}" 2>&1)

# Tidy up before possibly crashing out on bad assertions
podman rm -fv "${apache}" > /dev/null

echo "Running assertions..."

# Un-comment this if you need help debugging
# echo "${logs}"

grep 'Inrupt Namespace for Public Resources' <<< "{$readme_contents}" > /dev/null
grep "Location: https://storage.inrupt.com/ef6ef7d1-8fe0-4381-b87e-17b2bf0bb591/public/namespace/vocab/care_and_feed/care_and_feed" <<< "${request_vocab}" > /dev/null
grep "Location: https://storage.inrupt.com/ef6ef7d1-8fe0-4381-b87e-17b2bf0bb591/public/namespace/vocab/care_and_feed/care_and_feed.html" <<< "${request_docs}" > /dev/null
grep '"GET /inrupt/namespace/vocab/care_and_feed/ HTTP/1.1" 302'  <<< "${logs}" > /dev/null

echo "Done"

popd > /dev/null