---
title: File and directory rules
---

# File and directory rules

What an identifier directory may contain, what its files are called, and how
they are recorded.

| Rule | Severity | What |
| --- | --- | --- |
| [`files/only-allowed-names`](./only-allowed-names) | error | Only `.htaccess` and a README — no content files, and the rules file must be named exactly |
| [`files/no-empty-htaccess`](./no-empty-htaccess) | error | An `.htaccess` with no directives resolves to 404 |
| [`files/no-executable-bit`](./no-executable-bit) | error | A file that is not a program must not be executable |
| [`files/htaccess-required`](./htaccess-required) | warning | Something in the directory must answer requests |
| [`files/prefer-readme-md`](./prefer-readme-md) | warning | Write it as Markdown, called `README.md` |

Back to the [rule catalogue](../).
