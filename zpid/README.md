# /zpid/
This [W3ID](https://w3id.org) provides a persistent URI namespace for Leibniz Institute for Psychology (ZPID) resources.

## Uses
We are a non-profit public organization provinding research infrastructures for psychology, with a main focus on the German-speaking world.
The namespace will mainly be used to provide persistent identifiers for the controlled vocabularies we use to index records in our research databases (e.g. PSYNDEX).

- Vocabulary concept uris that will be redirected to our Skosmos instance follow this format:
https://w3id.org/zpid/vocabs/{vocid}/{Concept} will be redirected to https://skosmos.stg.zpid.org/{vocid}/page/{Concept}
Example: https://w3id.org/zpid/vocabs/terms/5 -> https://skosmos.stg.zpid.org/terms/page/5
- Uris of concept schemes (vocabularies) themselves go to the scheme'S homepage on Skosmos: https://w3id.org/zpid/vocabs/terms/ -> https://skosmos.stg.zpid.org/terms/
- the root URL will redirect to our Skosmos instance's homepage: https://w3id.org/zpid/ -> https://skosmos.stg.zpid.org (may change when there is more linked open data available from us, for now there are just the vocabularies).

**Note:** Any URLs to Skosmos are currently only accessible through our internal VPN, since Skosmos is still in testing for us. In the future, the redirects will be changed to an open Skosmos instance.

## Contact
This space is administered by:

**Tina Trillitzsch**  
email: ttr@leibniz-psychology.org  
GitHub: [schlawiner](https://github.com/schlawiner)

**Florian Grässle**  
email: fg@@leibniz-psychology.org  
GitHub: [holehan](https://github.com/holehan)

both at:
[Leibniz Institute for Psychology](https://leibniz-psychology.org/)  
Trier, Germany
