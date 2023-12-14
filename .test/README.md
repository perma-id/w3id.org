# Redirect test

Tests running directly on the source .htaccess files. It does only test the redirect, not the existance of the resource redirected to.
This is done by mounting the w3id.org repo in an apache docker and test the redirects with curl.

Test specifications are currently extracted from .htaccess file comments, e. g. 
```
##TESTv1 '/emmo/domain-test --header "Accept: text/html"' "https://emmo-repo.github.io/domain-test/test.html"
```

## Run the test locally
```bash
docker run -dit --name apache -p 8080:80 -v "$PWD":/usr/local/apache2/htdocs/ -v "$PWD"/.test/conf/httpd.conf:/usr/local/apache2/conf/httpd.conf httpd:2.4
docker exec -i apache sh -c "apt-get update && apt-get install curl"
docker exec -i apache bash < .test/test.sh
```

## Run a singe test
```bash
docker exec -i apache sh -c 'curl -sL -o /dev/null -w "%{url_effective}\n" --resolve www.w3id.org:80:127.0.0.1 www.w3id.org:80/subpath --header "Accept: application/rdf+xml"'
```
