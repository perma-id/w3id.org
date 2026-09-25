Quilt data packaging identifiers
================================

`https://w3id.org/quilt/` is used by [Quilt Data, Inc.](https://quiltdata.com/) for stable
identifiers relating to Quilt data packaging.

Profiles:

* https://w3id.org/quilt/ro-crate - Quilt RO-Crate profile, latest version
* https://w3id.org/quilt/ro-crate/0.1 - version 0.1 of the profile

Terms (namespace `https://w3id.org/quilt/ro-crate#`):

* https://w3id.org/quilt/ro-crate#packageName
* https://w3id.org/quilt/ro-crate#packageNamespace
* https://w3id.org/quilt/ro-crate#ELNEntry

Term IRIs are intentionally unversioned while the profile URI is versioned, so that term
identifiers stay stable across profile revisions. This follows the pattern used by the
Common Provenance Model profile, whose terms sit at `https://w3id.org/cpm/ro-crate#...`
while the profile itself versions.

Content negotiation
-------------------

`application/ld+json` returns the machine-readable
[Profile Crate](https://www.researchobject.org/ro-crate/specification/1.2/profiles.html);
anything else returns the HTML specification. An RO-Crate profile URI must resolve to a
human-readable description and may additionally resolve to a Profile Crate, and GitHub
Pages cannot perform content negotiation, so it is done here.

Source and hosting
------------------

* Source: https://github.com/quiltdata/quilt-ro-crate-profile
* Served from GitHub Pages at https://quiltdata.github.io/quilt-ro-crate-profile/

Contact
-------

Ernest Prabhakar <ernest@quilt.bio>, Quilt Data, Inc. GitHub username: drernie
