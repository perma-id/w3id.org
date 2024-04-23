## Redirect for the Genomics Standards Consortium

The Genomic Standards Consortium currently has two w3id namespaces:
- `gensc`
- `mixs`

The `mixs` namespace is more actively maintained, but some resources, like [Darwin Core](https://dwc.tdwg.org/) may need to temporarily use the `gensc` namespace.

Therefore, this `.htaccess` file redirects URLs in the form https://w3id.org/gensc/terms/MIXS:0000002 to https://w3id.org/mixs/0000002

That is in turn redirected according to the `mixs` namespace rules.

maintainers of this w3id:
- Ramona Walls <rlwalls2008@gmail.org> (@ramonawalls)
- Mark Andrew Miller <MAM@lbl.gov> (@turbomam)

Questions should be directed to https://github.com/GenomicsStandardsConsortium/mixs/issues.
