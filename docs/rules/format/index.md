---
title: File format rules
---

# File format rules

Encoding, line endings and whitespace. Everything here applies to any file
under `ids/`.

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
