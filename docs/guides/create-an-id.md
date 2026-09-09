# Creating an identifier

This guide takes you from "I want a permanent URL" to a merged pull request.

Before you start, make sure w3id.org is actually the right tool — read
[Scope](/overview/scope). The most common reason a pull request is rejected is
that it asked the service to do something it does not do.

## What you are actually creating

An identifier is a **directory under `ids/`** in the
[perma-id/w3id.org](https://github.com/perma-id/w3id.org) repository,
containing an `.htaccess` file with Apache rewrite rules.

```
ids/
└── my-project/
    ├── .htaccess     redirect rules — the part that does the work
    └── README.md     identifier and maintainer information (optional)
```

The directory name is the identifier: `ids/my-project/` becomes
`https://w3id.org/my-project/`.

That is the entire structure. Nothing else belongs in that directory — see
[`files/only-allowed-names`](/rules/files/only-allowed-names).

A README in any format GitHub renders is accepted, but `README.md` is the
convention and what you should reach for. See
[`files/prefer-readme-md`](/rules/files/prefer-readme-md).

## 1. Choose a name

Read the [naming section of Scope](/overview/scope#naming) first. In short:

- Claim **one top-level directory** for your project and put everything under
  it. Do not claim several.
- Use **lowercase**, digits, and hyphens. See
  [`tree/no-case-collision`](/rules/tree/no-case-collision).
- Avoid generic words, and avoid anything that could be confused with an
  existing identifier or a well-known organisation.
- For a personal identifier, use the shared
  [`/people/`](https://github.com/perma-id/w3id.org/tree/master/ids/people)
  namespace rather than a new top-level directory.

Check the name is free by browsing
[`ids/`](https://github.com/perma-id/w3id.org/tree/master/ids) — and check for
**case variants** too, because `ids/Foo/` and `ids/foo/` cannot coexist.

If you are unsure whether a name will be acceptable, ask on the
[mailing list](https://lists.w3.org/Archives/Public/public-perma-id/) before
writing anything. That is much cheaper than a rejected pull request.

## 2. Have your redirect target ready

Your content needs to already be live somewhere you control, over HTTPS,
before you open the pull request. Reviewers check this.

An identifier pointing at a URL that does not resolve yet will be asked to wait.
An identifier pointing at a URL that never resolves is a permanent broken link
with your project's name on it.

## 3. Fork and create the directory

Fork [perma-id/w3id.org](https://github.com/perma-id/w3id.org) on GitHub and
create `ids/<your-id>/.htaccess`.

::: warning Creating a dot-file in the GitHub web interface
The GitHub web editor will not let you create a file whose name *starts* with a
dot by typing `.htaccess` into an empty filename box.

The workaround: use **Add file → Create new file**, and type the **whole path**
into the filename box —

```
ids/my-project/.htaccess
```

Typing the path with the directories in front makes GitHub accept the leading
dot.

Do **not** work around this by naming the file `htaccess.txt` and renaming it
later. Correcting that mistake after the fact is one of the more common
follow-up commits in this repository. See [`files/only-allowed-names`](/rules/files/only-allowed-names).
:::

## 4. Write the redirect

The smallest thing that works — everything under your identifier goes to one
place:

```apache
# # /my-project/
#
# https://w3id.org/my-project/ and everything under it redirects to
# https://my-project.example.org/
#
# ## Contact
# This space is administered by:
#
# Firstname Lastname
# firstname@example.org
# GitHub username: exampleuser

RewriteEngine on
RewriteRule ^(.*)$ https://my-project.example.org/$1 [R=302,L]
```

That is a complete, valid identifier. Note what is *not* there: no `Options`
line, no `RewriteBase`, no `AddType`, no `RewriteCond`. Do not add directives
you do not need — see [`htaccess/no-options-directive`](/rules/htaccess/no-options-directive).

If you want everything to land on a single page rather than preserving the path:

```apache
RewriteEngine on
RewriteRule ^ https://my-project.example.org/ [R=302,L]
```

For anything more involved — matching specific sub-paths, handling query
strings, serving different formats to browsers and machines — read
[Writing .htaccess rules](./htaccess) and
[Content negotiation](./content-negotiation).

### Choosing the redirect status code

| Code | Use it for |
| --- | --- |
| **302** Found | The default. Plain redirects, grouping, anything you might change later. |
| **303** See Other | Content-negotiated ontology IRIs, where the identifier names a *concept* and you are redirecting to a *document about it*. |
| **307** Temporary Redirect | When the request method must be preserved. Rare here. |
| **301** Moved Permanently | Avoid. |

**Avoid 301.** Browsers and caches honour it indefinitely, and many will never
re-check. If you get a 301 wrong, you cannot take it back for the users who
already cached it — and this is a service designed for identifiers that live for
decades. Use 302 unless you have a specific reason not to.

## 5. Add maintainer contact information

Every identifier needs a way to reach whoever is responsible for it. Put it in
`.htaccess` comments, in a `README.md`, or both — either is fine.

It must include a **GitHub username**. This is the most frequent single review
comment on this repository. Without it, a reviewer cannot tell whether a future
pull request touching your directory is legitimate, and cannot tag you to
approve it. See [`meta/maintainer-github-username`](/rules/meta/maintainer-github-username).

A `README.md` is optional. If you add one, keep it to identifier and maintainer
information and link out to your real documentation:

```markdown
# /my-project/

Permanent identifiers for the My Project vocabulary.

`https://w3id.org/my-project/` redirects to <https://my-project.example.org/>.

Documentation: <https://my-project.example.org/docs/>

## Contact

- Firstname Lastname
- <firstname@example.org>
- GitHub: [@exampleuser](https://github.com/exampleuser)
```

::: tip Write the contact block as a list
Contact blocks are usually written as a stack of lines glued together with
invisible markup — two trailing spaces, a trailing backslash, or `<br>`. Use a
bulleted list instead, as above.

Two reasons. This repository trims trailing whitespace, so the two-space style
silently stops working. And with any of them, the next person to edit the block
cannot see what is holding it apart, so deleting a marker reflows three lines
into one paragraph without anyone noticing in the diff.

See [`markdown/prefer-list-over-line-breaks`](/rules/markdown/prefer-list-over-line-breaks).
:::

## 6. Test it

Do not skip this. Automated checks will catch a malformed rule — a syntax error
in `.htaccess` returns **500 for every URL in that directory**, not just the one
you got wrong — but nothing can tell you whether the redirect goes where you
actually meant it to.

Run the checks and resolve the identifier yourself:

```sh
cd tools/check && npm ci
cd ../.. && node tools/check/bin/w3id-check.js
```

See [Testing your changes](./testing) for the full recipe, including how to run
the rules against a local Apache.

## 7. Open the pull request

- **One identifier per pull request.** Do not bundle unrelated changes.
- **Squash your commits.** A new identifier should be one commit. If you are not
  comfortable squashing, say so in the pull request and a maintainer can do it —
  but be aware you will then need to resync your fork before your next
  contribution.
- **Write a real commit message.** Include your project name. `Update .htaccess`
  tells a reviewer nothing, and it is already the single most common commit
  message in this repository by a wide margin. Something like
  `my-project: add redirect for vocabulary namespace` is what you want.
- **Only touch your own directory.** Do not modify the repository root
  `README.md`, other people's identifiers, or anything under `ids/` that is not
  yours. See [`tree/only-own-identifier`](/rules/tree/only-own-identifier).

### Checklist

- [ ] The directory is under `ids/`, lowercase, and the name is free
- [ ] The file is named exactly `.htaccess`
- [ ] The redirect target is live and uses HTTPS
- [ ] No content files are committed — redirect rules and contact info only
- [ ] Maintainer contact includes a GitHub username
- [ ] The rules have been tested
- [ ] Commits are squashed and the message is descriptive
- [ ] No files outside your identifier directory are modified

## 8. After it is merged

A maintainer reviews and merges the pull request, and the change is deployed to
the service. It is normally live shortly afterwards. Check it:

```sh
curl -sIL https://w3id.org/my-project/
```

If it does not work, open an issue — do not open a second pull request changing
the same thing until you know what went wrong.

## The alternative: ask by email

If Git and GitHub are unfamiliar and you do not want to learn them for this, you
can send a request to the
[public-perma-id@w3.org mailing list](https://lists.w3.org/Archives/Public/public-perma-id/)
instead. Include:

- the w3id.org URL you want,
- the URL it should redirect to,
- the HTTP status code you want,
- your contact details, including a GitHub username if you have one.

An administrator will create the redirect. This is slower than a pull request,
but it is a perfectly legitimate route.

If you would like to learn the pull request workflow, GitHub's own
documentation covers it:
[Forking a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo)
and
[Creating a pull request from a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork).
