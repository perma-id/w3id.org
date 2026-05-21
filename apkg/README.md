# The Application Package Metadata Application Profile V1.0 - APKG-MAP
Profile of an OGC API Records record describing one Application Package (APKG) entry in the ILIAD registry hosted at https://iliad-registry.inesctec.pt/collections/apkg.

https://github.com/ILIAD-ocean-twin/APKG

# Performed tests
```console
> curl -i -v http://<host>/apkg/

HTTP/1.1 301 Moved Permanently
Location: http://localhost/apkg/
```
```console
> curl -i -v http://<host>/apkg/terms

HTTP/1.1 303 See Other
Location: https://raw.githubusercontent.com/ILIAD-ocean-twin/APKG/refs/heads/main/terms/apkg-ms.ttl
```
```console
> curl -i -v http://<host>/apkg/map

HTTP/1.1 303 See Other
Location: https://github.com/ILIAD-ocean-twin/APKG/tree/main
```
```console
> curl -i -v http://<host>/apkg/examples

HTTP/1.1 303 See Other
Location: https://github.com/ILIAD-ocean-twin/APKG/tree/main/AP-examples
```
```console
> curl -i -v http://<host>/apkg/SHACL

HTTP/1.1 303 See Other
Location: https://github.com/ILIAD-ocean-twin/APKG/tree/main/SHACL
```
```console
> curl -i -v -H Accept:text/turtle http://<host>/apkg/SHACL

HTTP/1.1 303 See Other
Location: https://raw.githubusercontent.com/ILIAD-ocean-twin/APKG/refs/heads/main/SHACL/APKG-shacl.ttl
```


Contacts
* Mariana Curado Malta : <mariana.c.malta@inesctec.pt> (GitHub: [@marianamalta](https://github.com/marianamalta))
* Mafalda Castro : <mafalda.r.castro@inesctec.pt> (Github: [@mafaldarc](https://github.com/mafaldarc))
* Miguel Correia : <miguel.r.correia@inesctec.pt> (Github: [@miguelcorreira19](https://github.com/miguelcorreira19))
* João Campos : <joao.campos@inesctec.pt> (Github: [@pastilhas](https://github.com/pastilhas))
* Marco Amaro Oliveira : <marco.a.oliveira@inesctec.pt> (Github: [@MarcoOliveira](https://github.com/marcoamarooliveira))