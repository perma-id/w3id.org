---
id: meta/document-identifier-root
title: Document the root of an identifier
severity: warning
status: enforced
applies-to: "ids/**"
---

# `meta/document-identifier-root`

**Severity:** warning · **Status:** enforced · **Applies to:** `ids/**`

## What

The root directory of an identifier should record what the identifier is for
and who maintains it. Either of these satisfies the rule:

- a `README.md` at the root of the identifier, or
- maintainer details in the comments of the root `.htaccess`.

Both are in use across the tree and neither is preferred. The rule asks only
*where* the information is, never what shape it takes.

## Why

Recording a maintainer at the root **claims the identifier**. Ownership here
is inherited downward: a claim at `ids/my-project/` covers everything beneath
it, which is how requests to change an identifier have always been assessed.
Without one, nothing marks the rest of that tree as taken, and a later
contribution can add `ids/my-project/something-else/` under a different owner
with nothing to say it should not.

That matters more as the handling of contributions is automated. A person
reviewing a pull request might recognise that a directory belongs to somebody
else. A machine has only what is written down.

The identifiers here are also meant to outlive the people who create them.
Somebody arriving at `ids/my-project/` a decade from now needs to know what it
resolves to and who to ask about it.

## Ownership is hierarchical, in both directions

**Downward:** a claim at the root covers the whole tree, so sub-directories
need nothing of their own. `ids/my-project/v1/` with no README is perfectly
correct when `ids/my-project/` is documented.

**Upward: it does not work.** A README three levels down documents *that*
part of the tree. It says nothing about the identifier as a whole, and it
leaves the root unclaimed.

**A sub-directory may add its own maintainers**, and several identifiers work
this way. They are *additional* — read together with the root, not instead of
it:

```
ids/my-project/
├── .htaccess
├── README.md              ← claims the identifier: Firstname Lastname
└── datasets/
    ├── .htaccess
    └── README.md          ← adds a second maintainer for the datasets
```

This is supported, not merely tolerated. If you see this warning on an
identifier that already has a README in a sub-directory, **leave that README
where it is** and add a claim at the root as well. Moving it up to silence the
warning destroys a record of who looks after that part of the tree.

## Wrong

Documented, but the root is unclaimed:

```
ids/my-project/
├── .htaccess
└── datasets/
    ├── .htaccess
    └── README.md          ← names a maintainer for datasets only
```

Nothing anywhere:

```
ids/my-project/
└── .htaccess              ← redirects, but says nothing about who owns this
```

## Right

A README at the root:

```
ids/my-project/
├── .htaccess
└── README.md
```

Or the same information in the `.htaccess` comments, with no README at all:

```apache
# my-project -- permanent identifiers for the My Project vocabulary
#
# homepage:
# - https://example.org/my-project/
# maintainers:
# - @exampleuser

RewriteEngine on
RewriteRule ^$ https://example.org/my-project/ [R=302,L]
```

## How to fix

Add a `README.md` at the root of the identifier:

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
[`files/only-allowed-names`](../files/only-allowed-names).

Or, if you would rather not add a file, put the same details in comments at
the top of the root `.htaccess`, in the style shown above.

An identifier that exists only to group sub-identifiers has no redirect of its
own to serve. An `.htaccess` there holding nothing but comments is a
legitimate way to claim it — [`files/no-empty-htaccess`](../files/no-empty-htaccess)
makes an exception for exactly this case.

## Checked by

`meta/document-identifier-root`, in this repository's checker:

```sh
node tools/check/bin/w3id-check.js ids/my-project
```

A namespace whose sub-names belong to different people has no single
maintainer to record at its root. Those are listed under
`options: meta/document-identifier-root: sharedNamespaces` in
`.w3id-check.yaml`, which is a stopgap until a metadata format can express
ownership per entry.

## See also

- [`meta/maintainer-github-username`](./maintainer-github-username) — what the
  maintainer record should contain; this rule only asks where it is
- [`files/prefer-readme-md`](../files/prefer-readme-md)
- [`files/no-empty-htaccess`](../files/no-empty-htaccess)
