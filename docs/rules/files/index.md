---
title: File and directory rules
---

# File and directory rules

What an identifier directory may contain, and what its files are called.

| Rule | Severity | What |
| --- | --- | --- |
| [`files/only-allowed-names`](./only-allowed-names) | error | Only `.htaccess` and a README — no content files, and the rules file must be named exactly |
| [`files/no-empty-htaccess`](./no-empty-htaccess) | error | An `.htaccess` with no directives resolves to 404 |
| [`files/htaccess-required`](./htaccess-required) | warning | Something in the directory must answer requests |
| [`files/readme-required`](./readme-required) | warning | Say what the identifier is and who maintains it |
| [`files/readme-canonical-name`](./readme-canonical-name) | warning | Call it `README.md` |

Back to the [rule catalogue](../).
