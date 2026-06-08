Validation- and Verification Benchmarks
==============================

General documentation:
* https://github.com/Simulation-Benchmarks

Redirections:
* HTML: Visit general documentation
  * `https://w3id.org/nfdi4ing/benchmarks`
  * --> `https://github.com/Simulation-Benchmarks`
* HTML: Visit specific documentation of benchmark with id 'bid' (replace by id of specific benchmark)
  * `https://w3id.org/nfdi4ing/benchmarks/<bid>`
  * --> `https://github.com/Simulation-Benchmarks/<bid>/blob/main/docs/<bid>.md`

* JSON-LD: Access semantic representation of a specific benchmark
  * via content negotiation
    * `https://w3id.org/nfdi4ing/benchmarks/<bid>` with HTTP-Header `Accept: application/ld+json` for JSON-LD (`.jsonld`)
    * --> `https://raw.githubusercontent.com/Simulation-Benchmarks/<bid>/refs/heads/main/docs/<bid>.md 
  * or via direct redirect of the filename
    * `https://w3id.org/nfdi4ing/benchmarks/<bid>.jsonld`
    * --> `https://raw.githubusercontent.com/Simulation-Benchmarks/linear-elastic-plate-with-hole/refs/heads/main/docs/plate-with-hole.md`

Support:
Archetype Betty (NFDI4Ing)

Contacts:
* [Jörg Unger](https://github.com/joergfunger) <joerg.unger@bam.de>
* [Dorothea Iglezakis](https://github.com/doigl) <dorothea.iglezakis@ub.uni-stuttgart.de>
* [Vasily Seibert](https://github.com/VasiliySeibert) <vasiliy.seibert@tu-clausthal.de>
* [Bernd Flemisch](https://github.com/berndflemisch) <bernd.flemisch@iws.uni-stuttgart.de>
