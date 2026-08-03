# CENSO — an ontology for censored environmental observations

`https://w3id.org/censo/`

## What it is

CENSO extends SOSA/SSN for measurements produced by a method that has a limit of
detection. Its single modelling commitment is that **the detection limit belongs
to the analytical run, not to the instrument**. Because the limit travels with
the result, a non-detection can be typed as the interval `[0, LOD]` it actually
establishes rather than stored as a zero, and compliance becomes four-valued:
*compliant*, *exceeding*, *possibly exceeding*, and *cannot be determined*.

The fourth outcome is not a convenience. Article of the consolidated
Directive 2008/105/EC requires that a result reported as below the limit of
quantification, where that limit exceeds the environmental quality standard,
"shall not be considered for the purposes of assessing the overall chemical
status of that water body". A two-valued data model cannot express that
requirement, so it cannot be audited.

## Contents

| IRI | What it resolves to |
|---|---|
| `https://w3id.org/censo/` | the vocabulary (Turtle, RDF/XML or JSON-LD by content negotiation) |
| `https://w3id.org/censo/1.0.0` | that specific release |
| `https://w3id.org/censo/reg/` | the regulation-package vocabulary |
| `https://w3id.org/censo/reg/tr-ysky-2016` | Turkish surface water standards, 434 thresholds |
| `https://w3id.org/censo/reg/eu-2008-105-2026` | EU Annex I as in force 10 May 2026, 114 thresholds |
| `https://w3id.org/censo/shapes` | SHACL shapes for validation and materialisation |

Regulation packages contribute individuals only — no class, no property — which
is what makes one safe to load in place of, or alongside, another.

## Licence

CC BY 4.0.

## Maintainer

Recep Can Altınbağ
Boğaziçi University, Institute of Environmental Sciences, Istanbul, Türkiye
recep.altinbag@bogazici.edu.tr
GitHub: [@recepcanaltinbag](https://github.com/recepcanaltinbag)
