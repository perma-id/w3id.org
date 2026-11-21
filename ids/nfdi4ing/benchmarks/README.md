Validation- and Verification Benchmarks
==============================

General documentation:
* https://github.com/Simulation-Benchmarks

Redirections:
* HTML (text/html): Visit general documentation
  * `https://w3id.org/nfdi4ing/benchmarks`
  * --> `https://github.com/Simulation-Benchmarks`

* HTML (text/html): Visit specific documentation of benchmark with id 'bid' (replace by id of specific benchmark)
  * `https://w3id.org/nfdi4ing/benchmarks/<bid>`
  * --> `https://github.com/Simulation-Benchmarks/<bid>/blob/main/docs/benchmark-documentation.md`

* JSON-LD (application/json or application/ld+json): Access semantic representation of a specific benchmark
  * via content negotiation
    * `https://w3id.org/nfdi4ing/benchmarks/<bid>` with HTTP-Header `Accept: application/ld+json` for JSON-LD (`.jsonld`)
    * --> `https://raw.githubusercontent.com/Simulation-Benchmarks/<bid>/refs/heads/main/provenance/benchmark.json

* Jupyter notebook (application/x-ipynb\+json): Access results of benchmark in form of an IPythonNotebook
  * via content negotiation
    * `https://w3id.org/nfdi4ing/benchmarks/<bid>` with HTTP-Header `Accept: application/x-ipynb+json` 
    * --> `https://raw.githubusercontent.com/Simulation-Benchmarks/<bid>/refs/heads/main/notebooks/benchmark-results.ipynb

* RO-Crate (zip-File) including the configuration files and the semantic representation of the benchmark
  * specific redirect by benchmark
    * `https://w3id.org/nfdi4ing/benchmarks/<bid>` with HTTP-Header `Accept: application/zip` 
    * --> `https://www.rohub.org/<RO-Hub-ID-of-RO-Crate>



Support:
Archetype Betty (NFDI4Ing)

Contacts:
* [Jörg F. Unger](https://github.com/joergfunger) <joerg.unger@bam.de>
* [Dorothea Iglezakis](https://github.com/doigl) <dorothea.iglezakis@ub.uni-stuttgart.de>
* [Vasily Seibert](https://github.com/VasiliySeibert) <vasiliy.seibert@tu-clausthal.de>
* [Bernd Flemisch](https://github.com/berndflemisch) <bernd.flemisch@iws.uni-stuttgart.de>
