# European Business Wallet Vocabulary

Perma-Links for the European Business Wallet Vocabulary which is maintained at:

Terminology: https://sanastot.suomi.fi/en/terminology/webuild \
Vocabulary: https://webuild-consortium.github.io/wp4-semantics-group/ebwv

## Structure

```

└── ebwv                // European Business Wallet Vocabulary in HTML, turtle and jsonld format (mime type)
    ├── terminology     // EBWV overarching terminology in HTML, turtle and jsonld format (mime type)
    ├── v0.1            // context version (SNAPSHOT)
    ├── v1              // context version (PUBLISHED)
    ├── sub1            // EBWV sub vocabulary 1 in HTML, turtle and jsonld format (mime type)
    │   ├── v0.1        // context version of sub voc 1 (SNAPSHOT)
    │   └── v1          // context version of sub voc 1 (PUBLISHED)
   ...
    └── subn            // EBWV sub vocabulary n in HTML, turtle and jsonld format (mime type)
        ├── v0.1        // context version of sub voc n (SNAPSHOT)
        └── v1          // context version of sub voc n (PUBLISHED)

```

## Examples

Terminology: https://w3id.org/ebwv/terminology \
Vocabulary: https://w3id.org/ebwv \
Term: https://w3id.org/ebwv#legalName \
Context: https://w3id.org/ebwv/v0.1

## Usage

European Business Wallet Owner ID credential (without proof):

``` json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://w3id.org/ebwv/v0.1"
  ],
  "@id": "urn:uuid:f0adc5fe-3558-40f8-b1e2-97713ec44dff",
  "@type": [
    "VerifiableCredential",
    "ElectronicAttestationOfAttributes"
  ],
  "attestationLegalCategory": "QEAA",
  "credentialSubject": {
    "@id": "did:key:$publicKeyOfHolder$",
    "@type": "EuropeanBusinessWalletOwnerId",
    "legalIdentifier": "NOFOR.987654321",
    "legalName": "acme Corporation"
  },
  "validUntil": "2029-12-03T12:19:52Z",
  "validFrom": "2019-12-03T12:19:52Z",
  "issuer": "did:key:$publicKeyOfIssuer$"
}
```

## Maintainers

- Ronald Koenig (@rkxx)
- Mikael af Hällström (@jgmikael)

