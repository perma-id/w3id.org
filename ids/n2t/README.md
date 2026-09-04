# `N2T`

Provides a persistent, high level entry point to the [N2T identifier resolution service](https://n2t.net/).


## Contact

```yaml
---
maintainer:
  name: Dave Vieglais
  id:
    - email:vieglais@ku.edu
    - github:datadavev
    - orcid:0000-0002-6513-4996
```

## Development and Testing

Use the [Apache .htaccess Tester](https://github.com/chaseconey/htaccess-tester)

In the parent of this folder (i.e. root of a checkout of https://github.com/perma-id/w3id.org.git):

1. Fire up docker:

```
cd w3id.org
docker run -p 6080:80 -v "$PWD:/usr/local/apache2/htdocs" chaseconey/htaccess-tester
```

2. Evaluate some links

```
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/n2t/"
302: https://n2t.net/

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/n2t/about.html"
302: https://n2t.net/about.html

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/n2t/ark:/13030/m5rx99d1"
302: http://n2t.net/ark:/13030/m5rx99d1

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/n2t/defn/ANVL"
301: https://github.com/CDLUC3/file-anvl
```

## Examples for Testing

| Value | Expected |
| -- | -- |
| https://w3id.org/n2t/ | https://n2t.net/ |
| https://w3id.org/n2t/about.html | https://n2t.net/about.html |
| https://w3id.org/n2t/ark:/13030/m5rx99d1 | https://n2t.net/ark:/13030/m5rx99d1 |
| https://w3id.org/n2t/igsn:AU1243 | https://n2t.net/igsn:AU1243 |

