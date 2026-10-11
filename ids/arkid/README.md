# `arkid`

Provides a persistent, high level entry point for [Archival Resource Key (ARK) identifiers](https://arks.org/).

## Contact

```yaml
---
- maintainer:
    name: Dave Vieglais
    id:
      - email:vieglais@ku.edu
      - github:datadavev
      - orcid:0000-0002-6513-4996
- maintainer:
    name: Donny Winston
    id:
      - email:donny@polyneme.xyz
      - github:dwinston
      - orcid:0000-0002-8424-0604
- maintainer:
    name: John Kunze
    id:
      - email:jakkbl@gmail.com
      - github:jkunze
      - orcid:0000-0001-7604-8041
- maintainer:
    name: Greg Janée
    id:
      - email:gjanee@ucsb.edu
      - github:gjanee
      - orcid:0000-0001-8785-0021
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
curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arkid/"
302: https://arks.org/

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arkid/ark:/12148/bpt6k10733944"
302: https://n2t.net/ark:/12148/bpt6k10733944

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arkid/ark:12148/bpt6k10733944"
302: https://n2t.net/ark:/12148/bpt6k10733944

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arkid/12148/bpt6k10733944"
302: https://n2t.net/ark:/12148/bpt6k10733944

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arkid/spec"
302: https://datatracker.ietf.org/doc/draft-kunze-ark/

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arkid/naan"
302: https://n2t.net/e/pub/naan_registry.txt

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arkid/registry"
302: https://n2t.net/e/pub/naan_registry.txt

curl -s -o /dev/null -w "%{response_code}: %{redirect_url}" "http://localhost:6080/arkid/register"
302: http://n2t.net/e/naan_request
```

## Examples for Testing

| Value | Expected |
| -- | -- |
| https://w3id.org/arkid/ | https://arks.org/ |
| https://w3id.org/arkid/spec | https://datatracker.ietf.org/doc/draft-kunze-ark/ |
| https://w3id.org/arkid/ark[:] | https://datatracker.ietf.org/doc/draft-kunze-ark/ |
| https://w3id.org/arkid/ark:/12148/bpt6k10733944 | https://n2t.net/ark:/12148/bpt6k10733944 |
| https://w3id.org/arkid/12148/bpt6k10733944 | https://n2t.net/ark:12148/bpt6k10733944 |
| https://w3id.org/arkid/naans | https://n2t.net/e/pub/naan_registry.txt |
| https://w3id.org/arkid/register | http://n2t.net/e/naan_request |

Anything not matching above patterns is directed to https://arks.org/

