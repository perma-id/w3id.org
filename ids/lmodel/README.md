# /lmodel/

Perma-id service for https://github.com/lmodel

# Layouts

Repositories publish LinkML either at the repository root (`src/<stem>/schema/`,
`project/`) or, for forks of upstream projects, in a `.linkml/` sidecar directory
(`.linkml/src/<stem>/schema/`, `.linkml/project/`). The sidecar layout is selected
per repository in `.htaccess` with `E=SIDECAR:.linkml/`, and is the convention
proposed to the upstream projects (see [/finos/](../finos/)).

# Testing

[https://github.com/lmodel/w3id_smoke_test](https://github.com/lmodel/w3id_smoke_test)

## Maintainer

Noel McLoughlin (noel.mcloughlin AT gmail.com)
https://github.com/noelmcloughlin

