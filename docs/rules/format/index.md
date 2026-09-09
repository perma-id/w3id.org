---
title: File format rules
---

# File format rules

Encoding, line endings and whitespace. Everything here applies to the text
files an identifier directory may hold: the `.htaccess`, and the README in
whatever name and format it carries — `README.md`, `README.MD`, a bare
`README`, or any of the other formats GitHub renders.

That last part is deliberate. If a README name is accepted by
[`files/only-allowed-names`](../files/only-allowed-names), it is checked
here too; a file the repository is willing to keep should not escape these
rules by being spelled unusually.

| Rule | Severity | What |
| --- | --- | --- |
| [`format/no-bom`](./no-bom) | error | No byte order mark — it makes Apache return 500 |
| [`format/no-crlf`](./no-crlf) | warning | Unix line endings, not CRLF |
| [`format/final-newline`](./final-newline) | warning | End the file with a newline |
| [`format/no-trailing-whitespace`](./no-trailing-whitespace) | warning | No trailing whitespace that does nothing |

Only the first of these can break an identifier. The other three are diff
hygiene, and your editor can handle all of them for you — see the note about
EditorConfig on any of those pages.

Back to the [rule catalogue](../).
