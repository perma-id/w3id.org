# Religious Education Vocabulary (reliedu)

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-sa/4.0/)
[![SKOS](https://img.shields.io/badge/Format-SKOS-blue.svg)](http://www.w3.org/2004/02/skos/)
[![AMB](https://img.shields.io/badge/Standard-AMB-green.svg)](https://w3id.org/kim/amb/)

**Permanent URL:** `https://w3id.org/reliedu/` (geplant)

**Version:** 0.2 (2025-10-13)

**Status:** 🚧 In Entwicklung | 📋 Bereit für w3id.org Submission

---

## 🌍 Übersicht

Das **Religious Education Vocabulary (reliedu)** ist ein AMB-konformes, kontrolliertes Vokabular zur Erschließung religionspädagogischer Bildungsressourcen. Es erweitert offizielle Standards (AMB, OpenEduHub, KIM) um religionsdidaktische Spezifika und ermöglicht präzise Metadaten für religionspädagogische Materialien.

### Kernbestandteile

- **13 religionsdidaktische Labels** (Subjektorientierung, Korrelation, etc.)
- **5 prozessbezogene Kompetenzen** (nach KMK-Bildungsstandards)
- **6 inhaltsbezogene Kompetenzbereiche**
- **8 religionspädagogische Ressourcentypen**
- **4 spezifische Unterrichtsmethoden**
- **8 religionspädagogische Lernorte**
- **50+ SKOS Mappings** zu OpenEduHub und KIM Vokabularen

---

## 📊 Standards & Compliance

Das Vokabular ist vollständig kompatibel mit:

| Standard | Version | Verwendung |
|----------|---------|------------|
| **AMB** | v20231019 | Metadatenprofil für Bildungsressourcen |
| **SKOS** | W3C Recommendation | Vokabularstruktur |
| **OpenEduHub** | 28 Vokabulare | learningResourceType, discipline, audience |
| **KIM educationalLevel** | ISCED 2011 | Bildungsstufen (AMB-Pflicht) |
| **KIM HCRT** | Hochschul-Ressourcentypen | Alternative zu OpenEduHub new_lrt |
| **schema.org** | LearningResource | JSON-LD @context |

---

## 🗂️ Namespace-Struktur

```
https://w3id.org/reliedu/
├── didactics/            # 13 religionsdidaktische Labels
│   ├── subjektorientierung
│   ├── korrelation
│   ├── elementarisierung
│   └── ...
├── resourcetype/         # Religionspädagogische Ressourcentypen
│   ├── bibeltext
│   ├── glaubenszeugnis
│   └── ...
├── competency/           # 5 prozessbezogene Kompetenzen
│   ├── wahrnehmung
│   ├── deutung
│   └── ...
├── content/              # 6 Inhaltsbereiche
│   ├── mensch-welt
│   ├── bibel
│   └── ...
├── method/               # 4 Unterrichtsmethoden
│   └── bibelgespraech
└── location/             # 8 Lernorte
    └── kirchenraum
```

---

## 📁 Repository-Struktur

```
reliedu-vocabulary/
├── README.md                                    # Diese Datei
├── vocab.ttl                                    # SKOS Vokabular (Turtle)
├── vocab.jsonld                                 # JSON-LD Serialisierung
├── vocab.rdf                                    # RDF/XML Serialisierung
├── index.html                                   # HTML Dokumentation
├── w3id-redirect-setup.md                       # w3id.org Setup-Anleitung
├── tools/
│   └── religious-education-curation-tool-v02-amb.html
├── examples/
│   └── gleichnisse-jesu-example.jsonld
├── docs/
│   ├── didactics.md                             # Religionsdidaktische Labels
│   ├── competencies.md                          # Kompetenzen
│   ├── mappings.md                              # OpenEduHub/KIM Mappings
│   └── amb-compliance.md                        # AMB-Konformität
└── mappings/
    ├── openeduhub_religionspaedagogik_mapping_v2_amb.md
    └── amb_standard_analyse.md
```

---

## 🚀 Verwendung

### Als AMB-Metadaten (JSON-LD)

```json
{
  "@context": [
    "https://w3id.org/kim/amb/context.jsonld",
    {
      "reliedu": "https://w3id.org/reliedu/"
    }
  ],
  "id": "https://example.org/gleichnisse-jesu",
  "type": "LearningResource",
  "name": "Gleichnisse Jesu verstehen",
  "about": [
    "http://w3id.org/openeduhub/vocabs/discipline/520",
    "https://w3id.org/reliedu/didactics/subjektorientierung",
    "https://w3id.org/reliedu/didactics/biblisch"
  ],
  "audience": [{
    "type": "Audience",
    "id": "http://w3id.org/openeduhub/vocabs/intendedEndUserRole/teacher"
  }],
  "educationalLevel": [
    "https://w3id.org/kim/educationalLevel/level_2"
  ],
  "learningResourceType": [
    "http://w3id.org/openeduhub/vocabs/new_lrt/0d23ff13-9d92-4944-92fa-2b5fe1dde80b"
  ],
  "teaches": [
    {
      "id": "https://w3id.org/reliedu/competency/deutung"
    },
    {
      "id": "https://w3id.org/reliedu/content/bibel"
    }
  ]
}
```

### Als SPARQL Query

```sparql
PREFIX reliedu: <https://w3id.org/reliedu/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

SELECT ?concept ?label ?definition
WHERE {
  ?concept skos:inScheme reliedu: .
  ?concept skos:prefLabel ?label .
  FILTER(lang(?label) = "de")
  OPTIONAL { ?concept skos:definition ?definition }
}
```

---

## 🛠️ Tools

### Web-Tool: Religious Education Curation Tool

Ein interaktives HTML-Tool zur Generierung AMB-konformer Metadaten:

👉 **[religious-education-curation-tool-v02-amb.html](tools/religious-education-curation-tool-v02-amb.html)**

**Features:**
- 5-Schritt Wizard
- AMB-Pflichtfelder (title, url, audience, educationalLevel)
- OpenEduHub new_lrt Integration (volle UUIDs)
- KIM educationalLevel (AMB-konform)
- 13 reliedu-didactics Labels
- JSON-LD Export

---

## 📖 Dokumentation

### Die 13 religionsdidaktischen Labels

1. **Subjektorientierung** - Individuelle Erfahrungen der Lernenden
2. **Korrelationsdidaktik** - Glaube ↔ Leben verbinden
3. **Elementarisierung** - Reduktion auf Kernaussagen
4. **Performatives Lernen** - Durch Handeln und Erleben
5. **Theologisieren mit Kindern** - Eigene theologische Fragen entwickeln
6. **Interreligiöses Lernen** - Dialog mit anderen Religionen
7. **Biblische Didaktik** - Umgang mit biblischen Texten
8. **Symboldidaktik** - Religiöse Symbole erschließen
9. **Kirchenraumpädagogik** - Kirchenräume als Lernorte
10. **Ästhetisches Lernen** - Kunst, Musik, sinnliche Zugänge
11. **Inklusive Religionspädagogik** - Heterogenität berücksichtigen
12. **Konfessionelle Kooperation** - Ökumenisches Lernen
13. **Digitale Religionsdidaktik** - Digitale Medien sinnvoll einsetzen

Detaillierte Beschreibungen: [docs/didactics.md](docs/didactics.md)

---

## 🤝 Beitragen

Dieses Vokabular ist ein Community-Projekt. Feedback und Verbesserungsvorschläge sind willkommen!

**Kontakt:**
- **Maintainer:** Jörg Lohrer
- **Email:** [Ihre Email]
- **Issues:** [GitHub Issues](https://github.com/yourusername/reliedu-vocabulary/issues)

**Mitarbeit:**
1. Fork des Repositories
2. Feature Branch erstellen (`git checkout -b feature/neue-konzepte`)
3. Änderungen committen (`git commit -m 'Add: Neue Konzepte'`)
4. Push zum Branch (`git push origin feature/neue-konzepte`)
5. Pull Request erstellen

---

## 📜 Lizenz

**CC BY-SA 4.0** - [Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/)

**Sie dürfen:**
- ✅ Teilen - das Material in jedwedem Format oder Medium vervielfältigen und weiterverbreiten
- ✅ Bearbeiten - das Material remixen, verändern und darauf aufbauen

**Unter folgenden Bedingungen:**
- **Namensnennung** - Sie müssen angemessene Urheber- und Rechteangaben machen
- **Weitergabe unter gleichen Bedingungen** - Wenn Sie das Material remixen, verändern oder darauf aufbauen, müssen Sie Ihre Beiträge unter derselben Lizenz verbreiten

---

## 🔗 Verwandte Projekte

- **DINI-AG-KIM Kompendium:** https://github.com/dini-ag-kim/kompendium
- **OpenEduHub Vocabs:** http://w3id.org/openeduhub/vocabs/
- **KIM Hochschulbibliothekszentrum:** https://www.kim-forum.org/
- **AMB Standard:** https://w3id.org/kim/amb/
- **SKOS Primer:** https://www.w3.org/TR/skos-primer/

---

## 📅 Versionshistorie

| Version | Datum | Änderungen |
|---------|-------|------------|
| **0.2** | 2025-10-13 | AMB-Compliance, reliedu-Namespace, internationale Ausrichtung |
| **0.1** | 2024 | Initiale Version (relipaed-Namespace, 703 Zeilen) |

---

## 🎯 Roadmap

- [x] SKOS Vokabular erstellen (Turtle)
- [x] AMB-Compliance sicherstellen
- [x] OpenEduHub + KIM Mappings
- [x] Internationale Ausrichtung (reliedu)
- [x] Web-Tool entwickeln
- [ ] w3id.org Redirect einrichten
- [ ] JSON-LD Konversion
- [ ] HTML Dokumentation generieren (SKOS Play / Widoco)
- [ ] Beispiele & Use Cases sammeln
- [ ] Community Feedback einholen
- [ ] v1.0 Release

---

**Erstellt:** 2025-10-13  
**Maintainer:** Jörg Lohrer  
**Powered by:** DINI-AG-KIM, OpenEduHub, KIM, SKOS
