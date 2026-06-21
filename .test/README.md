# Redirect test

Tests running directly on the source .htaccess files. It does only test the redirect, not the existance of the resource redirected to.
This is done by mounting the w3id.org repo in an apache docker and test the redirects with curl.

Test specifications are currently extracted from .htaccess file comments, e.g. 
```
##TESTv1 '/mypath --header "Accept: text/html"' "https://my-target-domain.com/test.html"
```

## Run the test as Github Action
1. Navigate to `https://github.com/<your fork>/w3id.org/actions/workflows/redirect_tests.yml` (example see [here](https://github.com/OpenSemanticWorld/w3id.org/actions/workflows/redirect_tests.yml))
1. Select 'Run workflow'
1. Accept the master branch, or select your custom branch
1. Change the subpath to your subpath, e.g., `/mypath`
1. Click 'Run workflow'
1. After completion, click on the run entry to view details (example see [here](https://github.com/OpenSemanticWorld/w3id.org/actions/runs/7224639650/job/19686349546))

## Run the test locally
Note: replace `/*` with your own trusted subpath, e.g. `/mypath`, otherwise all subpaths are tested which may create security issues
```bash
docker stop apache && docker rm apache
docker run -dit --name apache -e SEARCH_PATH='/*' -v "$PWD":/usr/local/apache2/htdocs/ -v "$PWD"/.test/conf/httpd.conf:/usr/local/apache2/conf/httpd.conf httpd:2.4
docker exec -i apache sh -c "apt-get update && apt-get install curl"
docker exec -i apache bash < .test/test.sh
```

## Run a singe test
```bash
docker exec -i apache sh -c 'curl -sL -o /dev/null -w "%{url_effective}\n" --resolve www.w3id.org:80:127.0.0.1 www.w3id.org:80/subpath --header "Accept: application/rdf+xml"'
```

