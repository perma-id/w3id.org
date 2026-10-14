RailClass
=========

RailClass describes railway vehicle classes (types of rolling stock) as linked data,
built from Wikidata, with 3D models and IIIF Presentation 4.0 Manifests for some of them.

Identifiers:
* `https://w3id.org/railclass/<cid>` a vehicle class (`<cid>` is a Wikidata Q number, `era-<ERATV type>` or `tb-<name>`)
* `https://w3id.org/railclass/model/<id>` a 3D model
* `https://w3id.org/railclass/vocab#<term>` the vocabulary
* `https://w3id.org/railclass/` the dataset

Each answers by the Accept header: text/turtle and application/ld+json get RDF, anything else the HTML page.

Homepage:
* https://railclass.ldas.jp/

Source:
* https://github.com/nakamura196/railclass

Contact:
* [Satoru Nakamura](https://github.com/nakamura196) <nakamura.satoru@mail.u-tokyo.ac.jp>
