# CDMO — Ontology Requirements Specification & Engineering Methodology

**Ontology:** Critical Decision-Making Ontology (CDMO)
**IRI:** `https://w3id.org/cdmo#` · **Version:** 1.0.0
**Document type:** Ontology Requirements Specification Document (ORSD) + engineering methodology
**Methodology:** HCOME / LLM-centered extension (SimX-HCOME+)

---

## 1. Purpose

CDMO provides a **domain-independent schema (TBox)** for representing the structure of
decision-making in complex, safety-critical environments, so that a large language model can
be *grounded* on it: the LLM reasons within the CDMO vocabulary and emits an instance graph
(ABox) that is SHACL-validated, queryable, and **auditable**. The ontology is the means by
which the knowledge graph is produced reliably and consistently across domains — not an end in
itself. Its purpose is therefore to make the *reasoning chain* of a generative decision-support
system explicit, inspectable, and reusable.

## 2. Scope

**In scope.** The generic, cross-domain anatomy of a decision episode: the situation and its
context; the agents, roles and authorities involved; goals, constraints and values; the
decision core (problems, options, actions, decisions); the reasoning and argument that justify a
decision; uncertainty and risk; evaluation and outcomes; causal and temporal relations; and the
provenance and trustworthiness of the knowledge used.

**Out of scope.** Domain-specific facts and taxonomies (e.g. medical conditions, military unit
types, hazard catalogues). These are introduced by *specialising* CDMO per domain
(emergency medicine, border security, disaster management, …). CDMO is deliberately empty of
such facts so it can be reused as an upper/mid-level layer.

**Implementation language.** OWL 2 (serialised in Turtle). Reuses **PROV-O** for provenance and
**OWL-Time** for temporal entities.

## 3. Intended uses and end-users

| Intended use | End-user |
|---|---|
| Grounding an LLM to generate decision-support KGs | AI / KG engineers |
| Auditing an automated recommendation (trace observation → assessment → decision → outcome) | Analysts, reviewers, oversight bodies |
| Validating LLM output against a schema (SHACL) | Knowledge engineers |
| Reusing a decision-modelling layer in a new domain | Domain modellers |
| Querying decision episodes (competency questions, §6) | Decision-support system users |

## 4. Stakeholders and roles

Following HCOME, the engineering community combines three classes of human role, augmented in
this work by an LLM acting as a co-engineering agent:

- **Ontology engineers / knowledge engineers** — responsible for conceptualisation, formalisation,
  reuse (PROV-O, OWL-Time), and consistency. 
- **Domain experts** — provide and validate the decision-making knowledge for each evaluation
  domain: emergency medicine, border security, and disaster management. *
- **Knowledge workers / knowledge engineers / project supervisors** — frame the requirements and arbitrate consensus.


End-users are stakeholders of the *product* rather than the engineering process, but their
needs drive the non-functional requirements (auditability, reusability).

## 5. Non-functional requirements

1. **Domain independence** — no requirement shall presuppose a single application domain.
2. **Auditability** — every decision must be traceable to the observations, evidence, and
   reasoning that produced it, with provenance to a source.
3. **Validatability** — the schema must support SHACL shapes that constrain a conformant ABox.
4. **Reusability & FAIR** — resolvable IRI (`w3id.org/cdmo`), versioned, documented (HTML), and
   openly licensed (CC BY 4.0); reuse established vocabularies rather than reinventing them.
5. **Modularity** — organised into coherent modules (§ below) that can be adopted selectively.
6. **LLM-friendliness** — labels and definitions written so a language model can populate the
   schema with low ambiguity.

## 6. Functional requirements — Competency Questions (CQs)

The functional requirements are expressed as competency questions, grouped by module. Each CQ is
answerable by traversing the indicated terms; together they were used to drive and to test the
conceptualisation (§9).

**M1 · Situation & Context**
- CQ1.1 What entities are present in a situation, and in what environment does it unfold? — `Situation`, `involvesEntity`, `inEnvironment`
- CQ1.2 Which observations support a given situation assessment, and who made them? — `SituationAssessment`, `basedOnObservation`, `observes`
- CQ1.3 At which awareness level is an assessment (perception / comprehension / projection)? — `Perception`, `Comprehension`, `Projection`
- CQ1.4 What is the current state of an entity? — `hasState`, `State`

**M2 · Agents & Roles**
- CQ2.1 Which agent holds the authority for a decision? — `madeBy`, `DecisionAuthority`
- CQ2.2 What roles and capabilities does an agent have? — `performsRole`, `hasCapability`
- CQ2.3 Who are the stakeholders of a decision problem? — `hasStakeholder`, `Stakeholder`
- CQ2.4 Is the agent human, AI, or organisational? — `HumanAgent`, `AIAgent`, `OrganizationalAgent`

**M3 · Goals, Constraints & Values**
- CQ3.1 What objectives does a decision problem pursue? — `pursuesObjective`
- CQ3.2 Which constraints restrict the options, and which are hard vs soft? — `constrainedBy`, `HardConstraint`, `SoftConstraint`
- CQ3.3 What defines success for an objective? — `SuccessCriterion`
- CQ3.4 Which values inform the preference among options? — `Value`

**M4 · Decision Core**
- CQ4.1 What alternative courses of action exist for a decision problem? — `hasAlternative`, `CourseOfAction`
- CQ4.2 Which course of action did a decision select, and who proposed it? — `selectsCourseOfAction`, `proposedBy`
- CQ4.3 What actions comprise a course of action, with what preconditions and effects? — `comprisesAction`, `hasPrecondition`, `hasEffect`
- CQ4.4 Which decision resolved a given problem? — `resolvesDecisionProblem`

**M5 · Reasoning, Evidence & Argument**
- CQ5.1 What rationale justifies a decision? — `justifiedBy`, `Rationale`
- CQ5.2 What evidence supports a claim, and what warrant licenses the inference? — `supportedBy`, `hasWarrant`
- CQ5.3 Under what conditions would the claim not hold? — `hasRebuttal`
- CQ5.4 What assumptions does an argument rest on? — `basedOnAssumption`

**M6 · Uncertainty & Risk**
- CQ6.1 What is the confidence in a claim or assessment? — `hasConfidence`, `level`
- CQ6.2 What risks attach to a course of action, with what probability and severity? — `hasRisk`, `probability`, `severity`
- CQ6.3 Which threats exploit which vulnerabilities? — `posedByThreat`, `exploitsVulnerability`
- CQ6.4 What uncertainty is attached to an observation or projection? — `carriesUncertainty`

**M7 · Evaluation & Outcome**
- CQ7.1 How does each course of action score on each criterion? — `hasEvaluation`, `onCriterion`, `score`
- CQ7.2 What trade-offs exist between criteria? — `involvesTradeoff`
- CQ7.3 What was the realised outcome of a decision? — `hasOutcome`
- CQ7.4 What feedback did an outcome generate? — `generatesFeedback`

**M8 · Causality & Time**
- CQ8.1 What causal relations hold between events and states? — `causes`, `CausalRelation`
- CQ8.2 What are the preconditions and effects of an action? — `Precondition`, `Effect`
- CQ8.3 When did an event, observation, or decision occur? — `atTime`

**M9 · Provenance & Trust**
- CQ9.1 From which source is a piece of evidence derived? — `derivedFrom`, `Source`
- CQ9.2 How reliable or trustworthy is a source? — `hasReliability`, `Trustworthiness`
- CQ9.3 To which agent is an observation attributed? — PROV attribution

**Cross-cutting (the paper's headline requirements)**
- CQ-A Can the full chain *observation → assessment → decision → outcome* be reconstructed for audit?
- CQ-B Does grounding on CDMO improve the auditability and consistency of the LLM's recommendation versus an ungrounded baseline?

## 7. Engineering methodology

### 7.1 Why HCOME

CDMO was engineered with the **Human-Centered Ontology Engineering Methodology (HCOME)**
(Kotis & Vouros, 2006), chosen because it is human-centred, collaborative, and iterative; it
treats ontologies as *living* artefacts under continuous evolution; and it gives domain experts —
not only engineers — an active role in shaping the conceptualisation. These properties matter
here because the decision-making knowledge is owned by operational experts, and because the
ontology must keep evolving as it is exercised across domains.

### 7.2 Spaces

HCOME organises work into a **personal space**, where an individual develops, imports, and
improves a conceptualisation, and a **shared space**, where versions are inspected, compared,
criticised through argumentation, and agreed. CDMO moved repeatedly between the two.

### 7.3 Phase 1 — Specification

Requirements, scope (§2), intended uses and end-users (§3), and the competency questions (§6)
were elicited from real operational scenarios supplied by the domain experts. The output of this
phase is, essentially, sections 1–6 of this document. *[fill in: how requirements were gathered —
scenario walkthroughs, interviews, document analysis — and over how many sessions.]*

### 7.4 Phase 2 — Conceptualization

In personal space, the engineer produced successive versions of the nine modules, **reusing**
PROV-O (provenance, trust) and OWL-Time (causality & time) rather than re-modelling them, and
aligning agents/roles with PROV concepts. HCOME's *data-driven (bottom-up)* conceptualisation
(Kotis & Papasalouros, 2010) was applied by seeding concepts from real domain data — Greek
disaster-event records, border-security scenarios, and emergency-medicine cases — and lifting
recurring patterns into the schema. Versions were detailed, compared, and merged. *[fill in:
number of iterations / major versions.]*

### 7.4.1 Reused ontologies and vocabularies

CDMO follows the HCOME principle of *reuse before reinvention*. Reuse occurs at two levels.

**Model-level reuse** (external terms reused inside CDMO's own axioms, via `rdfs:subClassOf` /
`rdfs:subPropertyOf`, so CDMO instances inherit the semantics of the reused ontology):

| Ontology | IRI | Reused terms in CDMO | How it is reused |
|---|---|---|---|
| **PROV-O** (W3C Provenance Ontology) | `http://www.w3.org/ns/prov#` | `prov:Agent`, `prov:Entity`, `prov:wasDerivedFrom` | `cdmo:Agent ⊑ prov:Agent`; `cdmo:Observation`, `cdmo:Evidence`, `cdmo:Source ⊑ prov:Entity`; `cdmo:derivedFrom ⊑ prov:wasDerivedFrom`. Gives the provenance & trust module (M9) standard, interoperable provenance semantics. |
| **OWL-Time** (W3C Time Ontology) | `http://www.w3.org/2006/time#` | `time:TemporalEntity`, `time:hasTime` | `cdmo:atTime ⊑ time:hasTime` with range `time:TemporalEntity`. Lets the causality & time module (M8) anchor events, observations and decisions on the standard temporal model (instants/intervals). |

**Annotation & metadata vocabulary reuse** (used to describe and document terms, not to extend the
domain model):

| Vocabulary | IRI | Used for |
|---|---|---|
| **SKOS** | `http://www.w3.org/2004/02/skos/core#` | `skos:definition` on every term (78×) and `skos:altLabel` for synonyms (e.g. *Option*, *Impact*). |
| **Dublin Core Terms (DCMI)** | `http://purl.org/dc/terms/` | Ontology metadata: title, description, creator, contributor, publisher, created/modified dates, license, rights. |
| **VANN** | `http://purl.org/vocab/vann/` | Vocabulary-documentation hints: preferred namespace prefix and URI. |

**Foundational languages** (the representation languages, listed for completeness rather than as
domain reuse): RDF, RDFS, OWL 2, and XSD datatypes.

No other domain or upper ontologies are imported. CDMO intentionally does **not** reuse a heavy
foundational ontology (e.g. DOLCE, BFO) so that it stays lightweight and LLM-friendly; alignment
to such an upper ontology is left as optional future work. Reused ontologies are referenced by
their published IRIs and are **not** pulled in with `owl:imports`, keeping CDMO self-contained and
easy to load, while remaining semantically compatible with PROV-O and OWL-Time tooling.

### 7.5 Phase 3 — Exploitation & Evaluation

In shared space, candidate versions were inspected and **criticised through argumentation**
(IBIS-style issues / positions / arguments), and consensus was reached before a version was
promoted to "agreed". Evaluation activities are detailed in §9. The agreed v1.0.0 is the artefact
published here.


## 8. How the schema was built with the domain experts

The conceptualisation was driven by, and validated against, expert knowledge from the three
evaluation domains:

- **Emergency medicine** — triage and treatment decisions under time pressure and uncertainty.
- **Border security** — situational awareness and response decisions from surveillance data.
- **Disaster management** — resource allocation and response planning over evolving events
  (seeded with real Greek event data).

Experts contributed in three ways: **(a)** *elicitation* — supplying scenarios and the questions a
decision-support system must answer, which became the competency questions; **(b)** *review* — in
shared-space argumentation, judging whether the evolving classes and properties faithfully
captured how decisions are actually reasoned about in their domain, and proposing revisions; and
**(c)** *ground-truth validation* — checking that ABoxes populated over their scenarios were
correct and SHACL-conformant, and serving as the **human expert baseline** against which the
LLM-generated graphs were scored (precision / recall / F1). 

## 9. Evaluation

CDMO and its instances were evaluated by:

1. **Competency-question coverage** — every CQ in §6 is answerable via a SPARQL query over a
   populated graph.
2. **SHACL validation** — shape constraints (cardinality, datatype ranges such as confidence and
   probability in [0,1], required links) detect non-conformant ABoxes.
3. **Reasoner consistency** — the TBox is logically consistent (no unsatisfiable classes).
4. **Pitfall scanning** — checked with OOPS! (Ontology Pitfall Scanner) and common-pitfall review.
5. **Expert review** — domain experts ratified the agreed version (§8).
6. **Empirical task evaluation** — KG grounding on CDMO vs ungrounded baselines, across the three
   domains, with human expert baselines (the subject of the paper).

## 10. Maintenance and versioning

CDMO is a *living* ontology. Versions carry an `owl:versionIRI` (current:
`https://w3id.org/cdmo/1.0.0`); changes are tracked in the repository; and feedback from
exploitation (the `Feedback` concept, M7) feeds the next specification cycle — closing the HCOME
loop.

## References

- Kotis, K., & Vouros, G. A. (2006). *Human-centered ontology engineering: The HCOME methodology.*
  Knowledge and Information Systems, 10(1), 109–131. https://doi.org/10.1007/s10115-005-0227-4
- W3C. *PROV-O: The PROV Ontology.* https://www.w3.org/TR/prov-o/
- W3C. *Time Ontology in OWL (OWL-Time).* https://www.w3.org/TR/owl-time/
- W3C. *SKOS Simple Knowledge Organization System Reference.* https://www.w3.org/TR/skos-reference/
- DCMI. *Dublin Core Metadata Terms.* https://www.dublincore.org/specifications/dublin-core/dcmi-terms/
- VANN: *A vocabulary for annotating vocabulary descriptions.* https://vocab.org/vann/

