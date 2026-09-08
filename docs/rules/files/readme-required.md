---
id: files/readme-required
title: An identifier should have a README
severity: warning
status: enforced
applies-to: "ids/**"
---

# `files/readme-required`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

A top-level identifier directory should contain a `README.md` saying what the
identifier is for and who maintains it.

A README anywhere in the identifier counts — it does not have to sit in every
sub-directory.

## Why

Somebody arriving at `ids/my-project/` a decade from now needs to know what
this identifier resolves to and who to ask about it. The `.htaccess` answers
the first question badly and the second not at all.

This is a warning rather than an error because the maintainer information is
what actually matters, and a commented `.htaccess` can carry it — see
[`meta/maintainer-github-username`](../meta/maintainer-github-username), which
accepts either. A README is simply the better place for a human to find it.

## Wrong

```
ids/my-project/
└── .htaccess
```

## Right

```
ids/my-project/
├── .htaccess
└── README.md
```

## How to fix

```markdown
# my-project

Permanent identifiers for the My Project vocabulary.

<https://w3id.org/my-project/> redirects to <https://example.org/>.

## Contact

- Firstname Lastname, <firstname@example.org>,
  GitHub: [@exampleuser](https://github.com/exampleuser)
```

Keep it to what the identifier is and who looks after it. Project
documentation belongs with the project — see
[`files/only-allowed-names`](./only-allowed-names).

## Checked by

`files/readme-required`, in this repository's checker:

```sh
node tools/checker/bin/w3id-check.js ids/my-project
```

## See also

- [`meta/maintainer-github-username`](../meta/maintainer-github-username)
- [`files/readme-canonical-name`](./readme-canonical-name)
