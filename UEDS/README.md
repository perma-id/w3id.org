# UEDS-ODRL

*An ODRL 2.2 Profile for Urban Energy Data Spaces*

**Contact**: Iason Sotiropoulos,  isotiropoulos@singularlogic.eu

**Redirects to**: 
https://ueds.singularspace.eu/

Final Specification - Vocabulary, SHACL Conformance, JSON-LD Context, Examples

Version 2.0 (Final draft) - 29 April 2026  
Namespace: https://w3id.org/ueds# (prefix: ueds:)  
Extends: W3C ODRL Profile for Data Spaces (https://w3id.org/dspace/2024/1/)  
Aligned with: DPV, DPV-GDPR, DCAT-AP, QUDT, PROV-O, CityGML EnergyADE  
Author: Iason Sotiropoulos  
License: CC-BY 4.0

**Abstract -** UEDS-ODRL is an ODRL 2.2 profile that extends the W3C ODRL Profile for Data Spaces with domain-specific terms for the access-, usage-, security-, regulatory- and economic-control patterns that recur in urban energy data spaces. v2.0 finalises the profile by aligning all generic terms with the W3C Data Privacy Vocabulary (DPV), aligning catalog metadata with DCAT-AP, adding QUDT-typed units and CityGML EnergyADE pointers, formalising encryption-at-rest, retention, sub-processor disclosure, special-category data, Schrems-II transfer mechanisms, and quality dimensions, and publishing twenty-three SHACL shapes plus a JSON-LD context and a positive/negative test corpus. Three conformance levels (L1 vocabulary, L2 SHACL Violation, L3 PEP enforcement) tier the obligations. The deliverable bundle - profile, shapes, context, examples and this specification - is sufficient for a connector implementer to enforce every policy pattern documented in the urban-energy literature without redefining any term in the dspace: namespace.

# Change Log

| **Version**       | **Summary**                                                                                                                                                                                                                                                                                                                                                                   |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| v1.0 - 2026-04-29 | Initial draft: vocabulary, ten SHACL shapes, mapping table covering 60+ patterns from the urban-energy literature, DPV / DPV-GDPR / DCAT-AP / QUDT / PROV-O / EnergyADE alignment. New patterns: encryption at rest, retention, sub-processor disclosure, special-category data, Schrems-II transfer, key rotation, vulnerability scan, data quality dimensions. Conformance levels L1/L2/L3. JSON-LD context and full positive/negative example corpus. Twenty-three SHACL shapes. |


# Table of Contents

1\. Scope

2\. Conformance and conformance levels (L1, L2, L3)

3\. Namespaces and conventions

4\. Relationship to the W3C ODRL Profile for Data Spaces

5\. Alignment with DPV, DCAT-AP, QUDT, PROV-O, EnergyADE

6\. Profile architecture and PEP behaviour table

7\. Asset classes

8\. Action vocabulary

9\. LeftOperand vocabulary

10\. Concept schemes (right operands)

11\. Mapping: every policy pattern to UEDS terms

12\. SHACL conformance shapes (S0-S22)

13\. Worked examples (Turtle and JSON-LD)

14\. Test corpus and validation procedure

15\. Implementation guidance for connectors

16\. References

17\. Acknowledgments

18\. Index of terms

# 1. Scope {#scope}

This document specifies UEDS-ODRL v2.0, an ODRL 2.2 profile that extends the W3C ODRL Profile for Data Spaces (the \"DSP profile\", https://w3id.org/dspace/2024/1/, prefix dspace:) with terms required to encode the access-, usage-, security-, regulatory- and economic-control patterns that recur in urban energy data spaces. UEDS-ODRL is layered on top of three normative documents - the ODRL Information Model 2.2, the DSP profile and the W3C Data Privacy Vocabulary (DPV) - and inherits all of their terms by reference.

In scope: (a) a controlled vocabulary in Turtle (ueds-profile-v2.ttl) introducing instances of odrl:Action, odrl:LeftOperand, odrl:RightOperand, plus SKOS-clustered concept schemes and policy sub-classes, all mapped via skos:exactMatch / skos:broader to DSP and DPV terms wherever an analogue exists; (b) twenty-three SHACL shapes (ueds-shapes-v2.ttl) tiered by conformance level; (c) a JSON-LD @context (ueds-context.jsonld) for connector consumption; (d) a positive/negative test corpus (ueds-examples.ttl, ueds-examples.jsonld); (e) this specification document. Out of scope: any redefinition of ODRL core, DSP or DPV terms, negotiation protocols (covered by IDSA / Eclipse DSP), trust frameworks (Gaia-X, IDS-RAM), payment-channel implementations, and the underlying energy ontologies (SAREF, Brick, CIM, OGC CityGML / EnergyADE).

# 2. Conformance and Conformance Levels {#conformance-and-conformance-levels}

Throughout this specification the key words MUST, MUST NOT, SHOULD, SHOULD NOT and MAY are interpreted per BCP 14 (RFC 2119 / RFC 8174). UEDS-ODRL defines three cumulative conformance levels.

| **Level**      | **Requirement**                                                                                                                                   | **Verifier**            |
|----------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| L1 Vocabulary  | Policy uses UEDS terms drawn from this profile and declares both the UEDS and DSP profile URIs.                                                   | Self-claim              |
| L2 Shapes      | Policy passes all SHACL Violation-tier shapes in ueds-shapes-v2.ttl; Warning-tier failures may be accepted under operator override.               | SHACL processor         |
| L3 Enforcement | PEP implements the enforcement actions documented per pattern in section 11 (PEP behaviour column) and the implementation guidance in section 15. | Connector certification |

# 3. Namespaces and Conventions {#namespaces-and-conventions}

All IRIs in inline code style refer to terms in the namespace identified by the corresponding prefix.

| **Prefix** | **IRI**                               | **Use**                                |
|------------|---------------------------------------|----------------------------------------|
| ueds       | https://w3id.org/ueds#                | Profile namespace (this specification) |
| dspace     | https://w3id.org/dspace/2024/1/       | W3C ODRL Profile for Data Spaces       |
| odrl       | http://www.w3.org/ns/odrl/2/          | ODRL 2.2 Common Vocabulary             |
| dpv        | https://w3id.org/dpv#                 | W3C Data Privacy Vocabulary            |
| dpv-gdpr   | https://w3id.org/dpv/legal/eu/gdpr#   | DPV GDPR extension                     |
| dcat       | http://www.w3.org/ns/dcat#            | DCAT 3 / DCAT-AP                       |
| qudt       | http://qudt.org/schema/qudt/          | QUDT units / quantity kinds            |
| unit       | http://qudt.org/vocab/unit/           | QUDT unit vocabulary                   |
| prov       | http://www.w3.org/ns/prov#            | PROV-O                                 |
| sh         | http://www.w3.org/ns/shacl#           | SHACL                                  |
| skos       | http://www.w3.org/2004/02/skos/core#  | Concept schemes                        |
| xsd        | http://www.w3.org/2001/XMLSchema#     | Datatypes                              |
| saref      | https://saref.etsi.org/core/          | ETSI SAREF                             |
| s4ener     | https://saref.etsi.org/saref4ener/    | SAREF4ENER                             |
| s4bldg     | https://saref.etsi.org/saref4bldg/    | SAREF4BLDG                             |
| brick      | https://brickschema.org/schema/Brick# | Brick schema                           |
| energy-ade | https://w3id.org/citygml/energyade#   | CityGML EnergyADE                      |

# 4. Relationship to the W3C ODRL Profile for Data Spaces {#relationship-to-the-w3c-odrl-profile-for-data-spaces}

UEDS-ODRL is an extension profile. UEDS does not redefine any term in the dspace: namespace. DSP supplies the general action set (Query, Publish, Train, Evaluate, Anonymize, Aggregate, Transform) and the party functions (Provider, Consumer, Controller, Broker); UEDS reuses DSP actions directly and, for energy-specific specialisations, declares ueds: actions with skos:broader pointing back at the DSP analogue.

| **DSP term**      | **UEDS treatment**                                                                                                  |
|-------------------|---------------------------------------------------------------------------------------------------------------------|
| dspace:Anonymize  | Refined by ueds:applyAnonymization, ueds:applyKAnonymity, ueds:applyDifferentialPrivacy, ueds:applyPseudonymization |
| dspace:Aggregate  | Refined by ueds:aggregate, ueds:applyAggregation                                                                    |
| dspace:Train      | Refined by ueds:trainFederated                                                                                      |
| dspace:Evaluate   | Refined by ueds:PredictEnergyUse                                                                                    |
| dspace:Query      | Reused as-is for read-style access on grid / EMS data                                                               |
| dspace:Publish    | Reused as-is for publication of aggregated profiles                                                                 |
| dspace:Transform  | Reused as-is for downsampling, projection, redaction                                                                |
| dspace:Provider   | Played per exchange by the UEDS role acting as data source                                                          |
| dspace:Consumer   | Played per exchange by the UEDS role receiving data                                                                 |
| dspace:Controller | Reused as-is (data controller role)                                                                                 |
| dspace:Broker     | Reused as-is (catalog / clearing-house actor)                                                                       |

Conformance shape S0 (section 12) requires that any policy declaring odrl:profile \<https://w3id.org/ueds\> also declare odrl:profile \<https://w3id.org/dspace/2024/1/\>. This guarantees DSP-aware connectors can interpret policy structure even when they have not yet been extended with UEDS-specific validators.

# 5. Alignment with DPV, DCAT-AP, QUDT, PROV-O, EnergyADE {#alignment-with-dpv-dcat-ap-qudt-prov-o-energyade}

## 5.1 W3C Data Privacy Vocabulary (DPV) {#w3c-data-privacy-vocabulary-dpv}

UEDS aligns generic privacy terms via skos:exactMatch / skos:broader to DPV. Use these alignments to bridge UEDS policies with DPV-only tooling (e.g., DPIA generators, ROPA registers).

| **Term**                        | **Description**                           |
|---------------------------------|-------------------------------------------|
| ueds:applyAnonymization         | skos:broader dpv:Anonymisation            |
| ueds:applyDifferentialPrivacy   | skos:broader dpv:Anonymisation            |
| ueds:applyKAnonymity            | skos:broader dpv:Anonymisation            |
| ueds:applyPseudonymization      | skos:broader dpv:Pseudonymisation         |
| ueds:aggregate                  | skos:broader dpv:Aggregation              |
| ueds:UrbanPlanning              | skos:exactMatch dpv:UrbanPlanning         |
| ueds:NonCommercialResearch      | skos:exactMatch dpv:AcademicResearch      |
| ueds:GDPRArt6_1a..f             | skos:exactMatch dpv-gdpr:A6-1-a .. A6-1-f |
| ueds:AdequacyDecision           | skos:exactMatch dpv-gdpr:A45-3            |
| ueds:StandardContractualClauses | skos:exactMatch dpv-gdpr:A46-2-c          |
| ueds:BindingCorporateRules      | skos:exactMatch dpv-gdpr:A47              |
| ueds:Derogation                 | skos:exactMatch dpv-gdpr:A49              |

## 5.2 DCAT-AP for catalog metadata {#dcat-ap-for-catalog-metadata}

Datasets registered via the ueds:register obligation MUST be described using DCAT-AP. The recommended minimum descriptor is dcat:Dataset with dct:title, dct:description, dct:publisher, dcat:contactPoint, dcat:accessRights, dcat:keyword, dcat:distribution and a back-link odrl:hasPolicy to the UEDS Policy.

## 5.3 QUDT units {#qudt-units}

Numeric leftOperands carry a QUDT unit annotation in the vocabulary; right-operand literals SHOULD be xsd:decimal in the canonical unit. ueds:samplingRate is in unit:HZ; ueds:dataVolumePerMonth in unit:GibiBYTE; ueds:maxJoulesPerInference in unit:J; ueds:gridCarbonIntensity is in gCO2/kWh (no canonical QUDT unit; qudt:hasQuantityKind quantityKind:CarbonIntensity is recommended).

## 5.4 PROV-O for provenance {#prov-o-for-provenance}

The ueds:attachProvenance duty SHOULD attach a prov:Activity for each derivation step with prov:wasDerivedFrom edges to source datasets and prov:wasAssociatedWith edges to the operating party.

## 5.5 CityGML EnergyADE {#citygml-energyade}

Building archetypes referenced by ueds:ResidentialBuilding and ueds:CommercialBuilding SHOULD use CityGML EnergyADE classes (energy-ade:BuildingType, energy-ade:UsageZone) for thermal and occupancy parameters.

# 6. Profile Architecture and PEP Behaviour Table {#profile-architecture-and-pep-behaviour-table}

UEDS-ODRL sits inside an ODRL Information Model graph and is evaluated by a Policy Decision Point (PDP) co-located with a Policy Enforcement Point (PEP) inside the connector. The PEP applies one of the following enforcement verdicts to each request, derived from the matched Permissions, Prohibitions and Duties.

| **Verdict** | **Action**                                                      | **Trigger constraint / duty**                                                                      |
|-------------|-----------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| ALLOW       | Forward request unchanged.                                      | All matched constraints satisfied; no transformation needed.                                       |
| DENY        | Reject with structured error code referencing the failing rule. | A Prohibition matched, or a hard precondition (KYC, certification, transfer mechanism) is missing. |
| REDACT      | Project results to allowedProperties whitelist.                 | ueds:allowedProperties or ueds:datasetScope constraint.                                            |
| DOWNSAMPLE  | Aggregate or downsample time-series before egress.              | ueds:temporalGranularity, ueds:samplingInterval, ueds:streamFrequency.                             |
| AGGREGATE   | Apply group-by with cell-size enforcement.                      | ueds:aggregate / ueds:applyAggregation duty + minGroupSize / k.                                    |
| PERTURB     | Apply DP / k-anonymity / pseudonymisation.                      | Privacy duties (DP, k-anonymity, pseudonymisation).                                                |
| SEAL        | Release sealed data only to attested TEE.                       | ueds:processingEnvironment + ueds:remoteAttestation.                                               |
| WATERMARK   | Inject per-contract watermark.                                  | ueds:applyWatermark.                                                                               |
| THROTTLE    | Enforce rate / volume / count quotas.                           | ueds:requestRate, ueds:dataVolumePerMonth, ueds:count.                                             |
| LOG         | Emit structured audit + clearing-house event.                   | All requests; mandatory side-effect.                                                               |
| SCHEDULE    | Queue ML training until trigger condition met.                  | ueds:scheduleGreenTime + ueds:gridCarbonIntensity.                                                 |
| REVOKE      | Atomically disable contract on incident.                        | ueds:revokeOnBreach.                                                                               |

# 7. Asset Classes {#asset-classes}

| **IRI**                      | **Description**                                            |
|------------------------------|------------------------------------------------------------|
| ueds:CityDistrict            | District spatial unit; right-operand for spatialCoverage.  |
| ueds:ResidentialBuilding     | s4bldg:Building specialised to dwellings.                  |
| ueds:CommercialBuilding      | s4bldg:Building specialised to commercial premises.        |
| ueds:School                  | s4bldg:Building - educational facility.                    |
| ueds:CriticalBuilding        | Hospital, data centre, government, emergency facility.     |
| ueds:CriticalBuildingProfile | Energy profile of a CriticalBuilding (default-restricted). |
| ueds:MeterStream             | Generic smart-meter time series.                           |
| ueds:HouseholdLoadSeries     | Per-household active-power series; personal data.          |
| ueds:SubMeterStream          | Apartment / circuit-level sub-meter.                       |
| ueds:RawMeterStream          | Untransformed meter readings.                              |
| ueds:AggregatedProfile       | Output of a certified aggregation pipeline.                |
| ueds:ThermalImagery          | Façade IR / thermal scans.                                 |
| ueds:EVChargingSession       | EV charging-session record.                                |
| ueds:PVProfile               | PV generation / self-consumption profile.                  |
| ueds:HeatPumpFleet           | Aggregated heat-pump fleet telemetry.                      |
| ueds:IEQStream               | Indoor environmental quality stream.                       |
| ueds:BEMSData                | BEMS telemetry.                                            |
| ueds:BEMSController          | BEMS write-capable endpoint.                               |
| ueds:DHControlLoop           | District-heating control loop.                             |
| ueds:GridTopology            | CIM-encoded grid topology.                                 |
| ueds:PMUStream               | Phasor-measurement-unit stream.                            |
| ueds:TariffStream            | Dynamic-tariff / market price stream.                      |
| ueds:DRDispatch              | OpenADR VTN-VEN demand-response signal.                    |
| ueds:TariffDecisionStream    | Tariff-decision output of an ML model.                     |
| ueds:RetrofitScore           | Retrofit-targeting model output.                           |
| ueds:DRLController           | DRL controller output.                                     |
| ueds:RetrofitScoringModel    | Model asset for retrofit targeting.                        |
| ueds:LoadForecastModel       | Load forecast model asset.                                 |
| ueds:DRLGridAgent            | DRL agent for grid management.                             |
| ueds:EPCRecord               | EPC record.                                                |
| ueds:DigitalBuildingLogbook  | EPBD-recast digital building logbook scope.                |
| ueds:BIMModel                | BIM / IFC model.                                           |
| ueds:EPCFinancialBaseline    | ESCO / EPC financial baseline.                             |

# 8. Action Vocabulary {#action-vocabulary}

## 8.1 Inference / disclosure (default-prohibited) {#inference-disclosure-default-prohibited}

| **Term**                    | **Description**                                           |
|-----------------------------|-----------------------------------------------------------|
| ueds:identifyOccupants      | Infer identity of natural persons from energy / IEQ data. |
| ueds:disaggregateLoad       | Run NILM / event detection on aggregated meter data.      |
| ueds:fingerprintTenant      | Behavioural fingerprint from sub-meter data.              |
| ueds:inferOccupancy         | Infer occupancy from IR / thermal.                        |
| ueds:inferIncome            | Infer income / socio-economic status.                     |
| ueds:benchmarkAgainstPeers  | 1-to-1 peer benchmarking.                                 |
| ueds:joinWithDataset        | Join with another dataset.                                |
| ueds:exposeControlSetpoints | Public exposure of control setpoints.                     |
| ueds:exfiltrateRaw          | Move raw data outside the holder.                         |
| ueds:writeSetpoint          | Write a setpoint to operational equipment.                |
| ueds:internalUse            | Internal use within the assignee organisation only.       |

## 8.2 Privacy-enhancing duties (broader to dspace:Anonymize / dpv:Anonymisation) {#privacy-enhancing-duties-broader-to-dspaceanonymize-dpvanonymisation}

| **Term**                      | **Description**                                                |
|-------------------------------|----------------------------------------------------------------|
| ueds:aggregate                | Apply aggregation. broader dspace:Aggregate / dpv:Aggregation. |
| ueds:applyAggregation         | Run the full aggregation pipeline.                             |
| ueds:applyDifferentialPrivacy | Apply DP. broader dspace:Anonymize / dpv:Anonymisation.        |
| ueds:applyKAnonymity          | Apply k-anonymity.                                             |
| ueds:applyAnonymization       | Apply documented anonymisation.                                |
| ueds:applyPseudonymization    | Pseudonymise at source. broader dpv:Pseudonymisation.          |
| ueds:applyWatermark           | Inject per-contract watermark.                                 |
| ueds:useSyntheticIfSufficient | Default to synthetic data when admissible.                     |

## 8.3 Provenance / accountability duties {#provenance-accountability-duties}

| **Term**                   | **Description**                                                  |
|----------------------------|------------------------------------------------------------------|
| ueds:attachProvenance      | Attach PROV-O metadata to delivered records.                     |
| ueds:attachCalibration     | Attach calibration metadata (instrument, last cal, uncertainty). |
| ueds:flagAnomaly           | Run anomaly detector and flag suspect records.                   |
| ueds:obtainConsent         | Verify consent / lawful basis.                                   |
| ueds:propagateErasure      | Propagate Art. 17 erasure downstream.                            |
| ueds:enableDSAR            | Maintain DSAR endpoint (Art. 15-16).                             |
| ueds:enablePortability     | Enable Art. 20 portability.                                      |
| ueds:enableObjection       | Enable Art. 21 objection.                                        |
| ueds:notifyBreach          | Notify breach within deadline.                                   |
| ueds:logIncident           | Log incident in STIX 2.1.                                        |
| ueds:notify                | Generic notify (combined with trigger).                          |
| ueds:revokeOnBreach        | Auto-revoke on incident severity threshold.                      |
| ueds:register              | Register dataset in dataspace catalog.                           |
| ueds:compensate            | Compensate via clearing channel.                                 |
| ueds:applyRetention        | Apply retention period and auto-delete.                          |
| ueds:disclosePIA           | Disclose DPIA / PIA outcome.                                     |
| ueds:discloseSubProcessors | Disclose sub-processor chain (Art. 28).                          |

## 8.4 Security duties {#security-duties}

| **Term**                    | **Description**                                  |
|-----------------------------|--------------------------------------------------|
| ueds:useTLS                 | Use TLS in transit.                              |
| ueds:mutualAuth             | Establish mTLS with dataspace trust anchors.     |
| ueds:signCommand            | Digitally sign control commands.                 |
| ueds:digitallySign          | Digitally sign (generic; e.g., OpenADR XMLDSig). |
| ueds:encryptAtRest          | Encrypt at rest with approved scheme.            |
| ueds:rotateKeys             | Rotate cryptographic keys per defined period.    |
| ueds:scanVulnerabilities    | Vulnerability scan / pentest attestation.        |
| ueds:applySecureAggregation | Apply secure aggregation in FL.                  |

## 8.5 Interoperability duties {#interoperability-duties}

| **Term**       | **Description**                                |
|----------------|------------------------------------------------|
| ueds:useNgsiLd | Use NGSI-LD with @context (Smart Data Models). |
| ueds:useSaref  | Annotate with SAREF / SAREF4ENER.              |
| ueds:useCim    | Use CIM (IEC 61968 / 61970) profile.           |
| ueds:useBacnet | Expose BACnet (ISO 16484-5) objects.           |
| ueds:useDLMS   | Encode meter data in DLMS / COSEM (IEC 62056). |

## 8.6 AI lifecycle (broader to dspace:Train / Evaluate) {#ai-lifecycle-broader-to-dspacetrain-evaluate}

| **Term**                   | **Description**                                       |
|----------------------------|-------------------------------------------------------|
| ueds:PredictEnergyUse      | AI inference on energy data. broader dspace:Evaluate. |
| ueds:trainFederated        | Train via FL. broader dspace:Train.                   |
| ueds:publishModelCard      | Publish model card (HuggingFace / ALTAI schema).      |
| ueds:monitorDrift          | Monitor drift and fairness metrics.                   |
| ueds:scheduleGreenTime     | Schedule training in low-carbon windows.              |
| ueds:disclosureAIGenerated | Disclose AI-generated content.                        |

# 9. LeftOperand Vocabulary {#leftoperand-vocabulary}

## 9.1 Spatial / temporal {#spatial-temporal}

| **IRI**                  | **Description**                       | **Right-operand**       |
|--------------------------|---------------------------------------|-------------------------|
| ueds:spatialCoverage     | Asset spatial scope.                  | IRI (CityDistrict)      |
| ueds:processingLocation  | Region of assignee processing.        | IRI (Region)            |
| ueds:transferMechanism   | Schrems-II transfer mechanism.        | IRI (TransferMechanism) |
| ueds:temporalGranularity | Permitted granularity.                | IRI / xsd:duration      |
| ueds:temporalScope       | Maximum historical window.            | xsd:duration            |
| ueds:samplingInterval    | Minimum interval between samples.     | xsd:duration            |
| ueds:samplingRate        | Maximum sampling rate (Hz).           | xsd:decimal             |
| ueds:streamFrequency     | Maximum subscription update interval. | xsd:duration            |
| ueds:dataAge             | Maximum age of delivered records.     | xsd:duration            |
| ueds:retentionPeriod     | Maximum retention period.             | xsd:duration            |

## 9.2 Schema, projection, quotas {#schema-projection-quotas}

| **IRI**                   | **Description**                    | **Right-operand** |
|---------------------------|------------------------------------|-------------------|
| ueds:allowedProperties    | Whitelist of ontology properties.  | List of IRIs      |
| ueds:assetClass           | Permitted asset rdf:types.         | List of IRIs      |
| ueds:datasetScope         | Logbook / scope IRI.               | IRI               |
| ueds:otherDatasetCategory | External dataset category.         | IRI               |
| ueds:dataKind             | Real \| Synthetic \| Aggregated.   | IRI               |
| ueds:specialCategory      | GDPR Art. 9 special-category data. | IRI               |
| ueds:requestRate          | Maximum requests per period.       | xsd:decimal       |
| ueds:dataVolumePerMonth   | Maximum monthly volume (GiB).      | xsd:decimal       |
| ueds:count                | Max copies / downloads.            | xsd:integer       |
| ueds:maxInferencesPerHour | Cap on AI invocations.             | xsd:integer       |

## 9.3 Privacy controls {#privacy-controls}

| **IRI**                        | **Description**                                  | **Right-operand**  |
|--------------------------------|--------------------------------------------------|--------------------|
| ueds:k                         | k-anonymity threshold.                           | xsd:integer (\>=2) |
| ueds:lDiversity                | l-diversity.                                     | xsd:integer (\>=1) |
| ueds:tCloseness                | t-closeness.                                     | xsd:decimal (\>0)  |
| ueds:minGroupSize              | Minimum group size in aggregation.               | xsd:integer        |
| ueds:minPeerSetSize            | Minimum peer-set size in benchmarking.           | xsd:integer        |
| ueds:epsilon                   | Per-query DP budget.                             | xsd:decimal (\>0)  |
| ueds:totalEpsilonBudget        | Cumulative DP budget per dataset / period.       | xsd:decimal (\>0)  |
| ueds:reidentificationRiskLevel | Cross-dataset re-identification risk level.      | IRI                |
| ueds:keyHolder                 | Key-holder identity (must differ from assignee). | IRI                |

## 9.4 Purpose, legal, organisational {#purpose-legal-organisational}

| **IRI**                     | **Description**                             | **Right-operand** |
|-----------------------------|---------------------------------------------|-------------------|
| ueds:purpose                | Declared purpose (DPV-aligned).             | IRI               |
| ueds:legalBasis             | GDPR Art. 6 lawful basis.                   | IRI               |
| ueds:aiActCategory          | AI-Act risk class.                          | IRI               |
| ueds:nis2EntityType         | NIS2 essential / important.                 | IRI               |
| ueds:consentToken           | Consent token reference (EED Art. 21).      | IRI / xsd:string  |
| ueds:assigneeRole           | Assignee role (DSO/TSO/\...).               | IRI               |
| ueds:assigneeKYC            | KYC / LEI verified.                         | xsd:boolean       |
| ueds:assigneeCertification  | ISMS / privacy certification.               | IRI               |
| ueds:assigneeClassification | NIS2 entity classification.                 | IRI               |
| ueds:nda                    | NDA on record.                              | xsd:boolean       |
| ueds:flexibilityProgram     | Active flexibility-programme participation. | xsd:boolean       |
| ueds:conformityAssessment   | AI-Act conformity assessment present.       | xsd:boolean       |
| ueds:legalEntityIdentifier  | GLEIF LEI.                                  | xsd:string        |

## 9.5 Security and processing environment {#security-and-processing-environment}

| **IRI**                    | **Description**                          | **Right-operand** |
|----------------------------|------------------------------------------|-------------------|
| ueds:tlsMinVersion         | Minimum TLS version.                     | xsd:decimal       |
| ueds:cipherSuite           | Cipher suite class.                      | IRI               |
| ueds:keyAlg                | Signing key algorithm.                   | IRI               |
| ueds:clientCertIssuer      | Trusted issuer set for mTLS.             | IRI               |
| ueds:processingEnvironment | TEE / ConfidentialContainer / Commodity. | IRI               |
| ueds:remoteAttestation     | Remote-attestation required.             | xsd:boolean       |
| ueds:securityLevel         | IEC 62443 SL.                            | IRI               |
| ueds:zoneTier              | IEC 62443 zone tier.                     | IRI               |
| ueds:incidentSeverity      | Trigger threshold for revoke-on-breach.  | IRI               |
| ueds:logFormat             | Required log format.                     | IRI               |
| ueds:atRestEncryption      | At-rest encryption scheme.               | IRI               |
| ueds:keyManagementScheme   | Key management scheme.                   | IRI / xsd:string  |
| ueds:keyRotationPeriod     | Key rotation period.                     | xsd:duration      |
| ueds:lastVulnerabilityScan | Date of last vulnerability scan.         | xsd:dateTime      |

## 9.6 Time-bounding, AI / sustainability, quality, economic, processor-chain {#time-bounding-ai-sustainability-quality-economic-processor-chain}

| **IRI**                       | **Description**                                    | **Right-operand** |
|-------------------------------|----------------------------------------------------|-------------------|
| ueds:noticeWindow             | Notification window for sub-processor change.      | xsd:duration      |
| ueds:respondWithin            | Required DSAR response time.                       | xsd:duration      |
| ueds:within                   | Generic deadline.                                  | xsd:duration      |
| ueds:contractStart            | Contract validity start.                           | xsd:dateTime      |
| ueds:contractEnd              | Contract validity end.                             | xsd:dateTime      |
| ueds:lastCalibration          | Maximum age since last calibration.                | xsd:duration      |
| ueds:maxParams                | Model parameter cap.                               | xsd:integer       |
| ueds:maxJoulesPerInference    | Energy budget per inference.                       | xsd:decimal       |
| ueds:gridCarbonIntensity      | Max grid carbon intensity for green-time training. | xsd:decimal       |
| ueds:fairnessMetric           | Selected fairness metric.                          | IRI               |
| ueds:fairnessMetricThreshold  | Trigger threshold for fairness metric.             | xsd:decimal       |
| ueds:driftStatistic           | Selected drift statistic.                          | IRI               |
| ueds:trainingSchedule         | Allowed training schedule.                         | xsd:string / IRI  |
| ueds:modelCardSchema          | Required model-card schema.                        | IRI               |
| ueds:completeness             | Reporting completeness ratio.                      | xsd:decimal (0-1) |
| ueds:accuracy                 | Reporting accuracy.                                | xsd:decimal (0-1) |
| ueds:timeliness               | Reporting timeliness.                              | xsd:decimal (0-1) |
| ueds:consistency              | Reporting consistency.                             | xsd:decimal (0-1) |
| ueds:qualityFlag              | Per-record quality flag.                           | IRI               |
| ueds:amount                   | Compensation amount.                               | xsd:decimal       |
| ueds:currency                 | Compensation currency.                             | IRI / xsd:string  |
| ueds:paymentChannel           | Required payment channel.                          | IRI               |
| ueds:watermarkScheme          | Watermark scheme to apply.                         | IRI               |
| ueds:catalog                  | Catalog reference.                                 | IRI               |
| ueds:processorChain           | Sub-processor chain attestation reference.         | IRI / xsd:string  |
| ueds:subProcessorJurisdiction | Jurisdiction of sub-processor.                     | IRI               |

# 10. Concept Schemes (Right-Operand Vocabularies) {#concept-schemes-right-operand-vocabularies}

| **Scheme**                   | **Members**                                                                                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| ueds:PurposeScheme           | UrbanPlanning, LoadForecast, RetrofitPlanning, Settlement, ConsumerInformation, NonCommercialResearch, PublicTask, HFTLikeUse, RetrofitTargeting, DemoEducation |
| ueds:LegalBasisScheme        | GDPRArt6_1a..f (skos:exactMatch dpv-gdpr:A6-1-a..f)                                                                                                             |
| ueds:TransferMechanismScheme | AdequacyDecision, StandardContractualClauses, BindingCorporateRules, Derogation                                                                                 |
| ueds:AIActScheme             | MinimalRisk, LimitedRisk, HighRisk, Unacceptable                                                                                                                |
| ueds:NIS2Scheme              | NIS2-Essential, NIS2-Important                                                                                                                                  |
| ueds:SecurityLevelScheme     | SL0..SL4 (IEC 62443); plus DMZ, CorpIT, OTZone                                                                                                                  |
| ueds:CertificationScheme     | ISO27001, ISO27701, SOC2TypeII, GaiaXLabel                                                                                                                      |
| ueds:RoleScheme              | DSO, TSO, CertifiedAggregator, ESCOPartner, Owner, PublicAuthority, Researcher                                                                                  |
| ueds:StandardScheme          | smart-data-models, SAREF4ENER, CIM-EU-Profile, CGMES, ASHRAE-135-Allowed, IEC62056-x, OpenADR2_0b, EnergyADE                                                    |
| ueds:ProcEnvScheme           | TEE, ConfidentialContainer, CommodityCloud                                                                                                                      |
| ueds:DataKindScheme          | Real, Synthetic, Aggregated                                                                                                                                     |
| ueds:DatasetCategoryScheme   | OpenZoning, MobilityTraces, CensusMicrodata                                                                                                                     |
| ueds:WatermarkScheme         | C2PA, Steganographic                                                                                                                                            |
| ueds:KeyAlgScheme            | Ed25519, ECDSA-P256, ECDSA-P384                                                                                                                                 |
| ueds:RegionScheme            | EEA, EU                                                                                                                                                         |
| ueds:EncryptionScheme        | AES-256-GCM, ChaCha20Poly1305, KMS-HSM                                                                                                                          |
| ueds:TriggerScheme           | ConsentRevoked, SubProcessorChanged, CertificateExpiring                                                                                                        |

# 11. Mapping: Every Policy Pattern to UEDS Terms {#mapping-every-policy-pattern-to-ueds-terms}

The table below maps every policy pattern documented in the urban-energy literature to the UEDS-ODRL encoding required to express it and the PEP enforcement verdict (column 3, see section 6).

| **Policy pattern**                                           | **Encoding in UEDS-ODRL**                                                                                           | **PEP verdict**            |
|--------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------|----------------------------|
| Spatial scope (district-level)                               | permission action odrl:use; constraint(ueds:spatialCoverage isPartOf ueds:CityDistrict)                             | REDACT / DENY              |
| Temporal granularity (hourly)                                | constraint(ueds:temporalGranularity eq ueds:Hourly)                                                                 | DOWNSAMPLE                 |
| Bounded historical window                                    | constraint(ueds:temporalScope lt P3Y)                                                                               | DOWNSAMPLE / DENY          |
| Attribute projection / property whitelist                    | constraint(ueds:allowedProperties isAnyOf \[\...\])                                                                 | REDACT                     |
| Purpose limitation - no occupant ID                          | prohibition ueds:identifyOccupants; constraint(ueds:purpose neq ueds:UrbanPlanning)                                 | DENY                       |
| Rate / volume control                                        | constraint(ueds:requestRate lteq 1000); constraint(ueds:dataVolumePerMonth lteq 10)                                 | THROTTLE                   |
| Streaming frequency                                          | constraint(ueds:streamFrequency lteq PT1H)                                                                          | DOWNSAMPLE                 |
| Aggregation / minimum group size                             | duty ueds:aggregate; constraint(ueds:minGroupSize gteq 5)                                                           | AGGREGATE                  |
| Provenance + consent logging                                 | duty ueds:attachProvenance; duty ueds:obtainConsent                                                                 | LOG                        |
| Asset-class scoping                                          | constraint(ueds:assetClass isAnyOf \[ueds:ResidentialBuilding, ueds:School\])                                       | DENY / REDACT              |
| Cross-dataset mixing                                         | prohibition ueds:joinWithDataset; constraint(ueds:otherDatasetCategory neq ueds:OpenZoning)                         | DENY                       |
| Purpose-limited AI                                           | permission ueds:PredictEnergyUse; constraint(ueds:purpose isAnyOf \[\...\])                                         | DENY / LOG                 |
| Aggregation duty before ML                                   | duty ueds:applyAggregation, ueds:applyAnonymization; output ueds:AggregatedProfile                                  | AGGREGATE / PERTURB        |
| Fairness on ML decisions                                     | duty ueds:monitorDrift; constraint(ueds:fairnessMetric, ueds:fairnessMetricThreshold)                               | REVOKE on threshold breach |
| AI compute / energy budget                                   | constraint(ueds:maxJoulesPerInference); constraint(ueds:trainingSchedule)                                           | SCHEDULE / THROTTLE        |
| Regulatory scope (EPBD / AI Act / CRA)                       | constraint(ueds:legalBasis isAnyOf \[\...\]); constraint(ueds:aiActCategory eq ueds:HighRisk)                       | DENY                       |
| NILM prohibition                                             | prohibition ueds:disaggregateLoad; constraint(ueds:samplingInterval lteq PT1S)                                      | DOWNSAMPLE / DENY          |
| Differential-privacy budget                                  | duty ueds:applyDifferentialPrivacy; constraint(ueds:epsilon lteq 1.0); constraint(ueds:totalEpsilonBudget lteq 5.0) | PERTURB                    |
| k-anonymity / l-diversity                                    | duty ueds:applyKAnonymity; constraint(ueds:k gteq 5); constraint(ueds:lDiversity gteq 3)                            | PERTURB                    |
| Synthetic-data substitution                                  | permission constraint(ueds:dataKind eq ueds:Synthetic); duty ueds:useSyntheticIfSufficient                          | SUBSTITUTE                 |
| Pseudonymisation at source                                   | duty ueds:applyPseudonymization; constraint(ueds:keyHolder neq assignee)                                            | PERTURB                    |
| Data sovereignty / EEA                                       | constraint(ueds:processingLocation isPartOf ueds:EEA)                                                               | DENY                       |
| Lawful-basis declaration                                     | constraint(ueds:legalBasis isAnyOf \[GDPRArt6_1b, \...\])                                                           | DENY                       |
| Right-to-erasure propagation                                 | duty ueds:propagateErasure; constraint(ueds:within eq PT24H)                                                        | REVOKE / LOG               |
| DSAR enablement                                              | duty ueds:enableDSAR; constraint(ueds:respondWithin eq P30D)                                                        | LOG                        |
| AI-Act risk-class declaration                                | constraint(ueds:aiActCategory isAnyOf \[LimitedRisk, HighRisk\]); ueds:conformityAssessment = true                  | DENY                       |
| EED Art. 21 smart-meter consent                              | constraint(ueds:consentToken eq ueds:Granular15min)                                                                 | DENY                       |
| EPBD digital building logbook                                | constraint(ueds:datasetScope isPartOf ueds:DigitalBuildingLogbook)                                                  | REDACT                     |
| TLS in transit                                               | duty ueds:useTLS; constraint(ueds:tlsMinVersion gteq 1.3); constraint(ueds:cipherSuite eq ueds:NIST_Approved)       | ENFORCE                    |
| mTLS                                                         | duty ueds:mutualAuth; constraint(ueds:clientCertIssuer eq ueds:DataspaceTrustAnchors)                               | ENFORCE                    |
| TEE / confidential compute                                   | constraint(ueds:processingEnvironment isAnyOf \[TEE, ConfidentialContainer\]); ueds:remoteAttestation = true        | SEAL / DENY                |
| Encryption at rest                                           | duty ueds:encryptAtRest; constraint(ueds:atRestEncryption isAnyOf \[AES-256-GCM, ChaCha20Poly1305, KMS-HSM\])       | ENFORCE                    |
| Key rotation                                                 | duty ueds:rotateKeys; constraint(ueds:keyRotationPeriod lteq P90D)                                                  | LOG / REVOKE               |
| Vulnerability scan attestation                               | duty ueds:scanVulnerabilities; constraint(ueds:lastVulnerabilityScan gteq now-P30D)                                 | DENY on stale              |
| Assignee security certification                              | constraint(ueds:assigneeCertification isAnyOf \[ISO27001, SOC2TypeII\])                                             | DENY                       |
| NIS2 entity classification                                   | constraint(ueds:nis2EntityType isAnyOf \[Essential, Important\])                                                    | DENY                       |
| IEC 62443 zone / SL                                          | constraint(ueds:securityLevel gteq SL2); constraint(ueds:zoneTier in \[DMZ, CorpIT\])                               | DENY                       |
| Read-only on SCADA / EMS                                     | permission action in {odrl:read, odrl:display}; prohibition {odrl:modify, ueds:writeSetpoint}                       | DENY on write              |
| Signed BACS commands                                         | duty ueds:signCommand; constraint(ueds:keyAlg isAnyOf \[Ed25519, ECDSA-P256\])                                      | ENFORCE                    |
| Signed DR dispatch (OpenADR)                                 | duty ueds:digitallySign; constraint(profile = OpenADR2_0b)                                                          | ENFORCE                    |
| Grid topology to DSO/TSO                                     | constraint(ueds:assigneeRole isAnyOf \[DSO, TSO, CertifiedAggregator\])                                             | REDACT for non-DSO         |
| DH control opaqueness                                        | prohibition ueds:exposeControlSetpoints (target ueds:DHControlLoop)                                                 | REDACT                     |
| BIM no-derivative                                            | permission odrl:read; prohibition odrl:derive                                                                       | DENY on derive             |
| ESCO commercial NDA                                          | constraint(ueds:assigneeRole isAnyOf \[Owner, ESCOPartner\]); ueds:nda = true                                       | DENY                       |
| Anti sub-licensing                                           | prohibition odrl:transfer; permission ueds:internalUse                                                              | DENY                       |
| Non-commercial research only                                 | constraint(ueds:purpose eq ueds:NonCommercialResearch)                                                              | DENY                       |
| Royalty / per-access compensation                            | duty ueds:compensate; constraint(ueds:amount, ueds:currency, ueds:paymentChannel = DataspaceClearing)               | THROTTLE / REVOKE          |
| Watermarking                                                 | duty ueds:applyWatermark; constraint(ueds:watermarkScheme = C2PA)                                                   | WATERMARK                  |
| Anti-competitive benchmarking                                | prohibition ueds:benchmarkAgainstPeers; permission with constraint(ueds:minPeerSetSize gteq 10)                     | AGGREGATE                  |
| Validity period                                              | constraint(ueds:contractStart, ueds:contractEnd)                                                                    | DENY on out-of-window      |
| KYC / counter-party verification                             | constraint(ueds:assigneeKYC eq true); ueds:legalEntityIdentifier required                                           | DENY                       |
| Auto-revoke on breach                                        | duty ueds:revokeOnBreach; constraint(ueds:incidentSeverity gteq ueds:High)                                          | REVOKE                     |
| Sub-processor change notification                            | duty ueds:notify; trigger ueds:SubProcessorChanged; constraint(ueds:noticeWindow eq P30D)                           | LOG / REVOKE on miss       |
| Sub-processor disclosure                                     | obligation ueds:discloseSubProcessors; constraint(ueds:processorChain, ueds:subProcessorJurisdiction)               | DENY on missing            |
| Schrems-II transfer mechanism                                | constraint(ueds:transferMechanism isAnyOf \[SCCs, BCRs, AdequacyDecision\])                                         | DENY                       |
| Special-category data (Art. 9)                               | constraint(ueds:specialCategory); constraint(ueds:legalBasis = dpv-gdpr:A9-2-\...)                                  | DENY without basis         |
| Max copies                                                   | constraint(ueds:count lteq 3)                                                                                       | THROTTLE                   |
| Retention period                                             | duty ueds:applyRetention; constraint(ueds:retentionPeriod lteq P3Y)                                                 | REVOKE / LOG               |
| EV charging x mobility                                       | prohibition ueds:joinWithDataset (rightOperand ueds:MobilityTraces)                                                 | DENY                       |
| PV income inference                                          | prohibition ueds:inferIncome; permission at district level                                                          | DENY / AGGREGATE           |
| Heat-pump fleet aggregation                                  | constraint(ueds:assigneeRole eq ueds:CertifiedAggregator); ueds:flexibilityProgram = true                           | DENY                       |
| Sub-meter tenant fingerprinting                              | prohibition ueds:fingerprintTenant (target ueds:SubMeterStream)                                                     | AGGREGATE / DENY           |
| IR / thermal occupancy inference                             | prohibition ueds:inferOccupancy (target ueds:ThermalImagery)                                                        | AGGREGATE / DENY           |
| NGSI-LD compliance                                           | duty ueds:useNgsiLd; constraint(profile = ueds:smart-data-models)                                                   | ENFORCE                    |
| SAREF / SAREF4ENER                                           | duty ueds:useSaref; constraint(profile superset ueds:SAREF4ENER)                                                    | ENFORCE                    |
| CIM (IEC 61968 / 61970)                                      | duty ueds:useCim; constraint(profile = ueds:CIM-EU-Profile)                                                         | ENFORCE                    |
| BACnet / ISO 16484                                           | duty ueds:useBacnet; constraint(objectType subset ueds:ASHRAE-135-Allowed)                                          | ENFORCE                    |
| DLMS / COSEM for meter data                                  | duty ueds:useDLMS; constraint(cosemProfile = ueds:IEC62056-x)                                                       | ENFORCE                    |
| Federated learning required                                  | duty ueds:trainFederated; prohibition ueds:exfiltrateRaw                                                            | SEAL / DENY                |
| Model card publication                                       | duty ueds:publishModelCard; constraint(ueds:modelCardSchema)                                                        | DENY without card          |
| Drift / fairness monitoring                                  | duty ueds:monitorDrift; constraint(ueds:fairnessMetricThreshold, ueds:driftStatistic)                               | REVOKE on breach           |
| Model size / inference-energy cap                            | constraint(ueds:maxParams lteq 1e9); constraint(ueds:maxJoulesPerInference lteq 0.5)                                | THROTTLE / DENY            |
| Green-time training                                          | duty ueds:scheduleGreenTime; constraint(ueds:gridCarbonIntensity lteq 200)                                          | SCHEDULE                   |
| Sensor calibration metadata                                  | duty ueds:attachCalibration; constraint(ueds:lastCalibration lteq P12M)                                             | LOG / DEGRADE              |
| Data freshness                                               | constraint(ueds:dataAge lteq PT24H)                                                                                 | DENY on stale              |
| Anomaly flagging                                             | duty ueds:flagAnomaly (target ueds:MeterStream)                                                                     | LOG / DEGRADE              |
| Reporting completeness / accuracy / timeliness / consistency | constraint(ueds:completeness, ueds:accuracy, ueds:timeliness, ueds:consistency)                                     | DEGRADE / DENY             |
| GDPR Art. 33 breach notification                             | duty ueds:notifyBreach; constraint(ueds:within eq PT72H)                                                            | REVOKE on miss             |
| Clearing-house incident logging (STIX)                       | duty ueds:logIncident; constraint(ueds:logFormat = ueds:STIX2_1)                                                    | LOG                        |
| PMU sub-second grid stability                                | constraint(ueds:assigneeClassification eq ueds:NIS2-Essential); ueds:samplingRate lteq 50                           | DOWNSAMPLE / DENY          |
| Critical-building profile sharing                            | prohibition odrl:share (target ueds:CriticalBuildingProfile); aggregated district only                              | AGGREGATE / DENY           |
| Real-time tariff / market data                               | constraint(ueds:purpose isAnyOf \[Settlement, ConsumerInformation\]); prohibition ueds:HFTLikeUse                   | THROTTLE / DENY            |
| Dataset registration in catalog                              | duty ueds:register; constraint(ueds:catalog = ueds:DataspaceCatalog)                                                | DENY without registration  |
| Public-task / open-data exemption                            | constraint(ueds:assigneeRole eq ueds:PublicAuthority); ueds:purpose = ueds:PublicTask                               | ALLOW + LOG                |

# 12. SHACL Conformance Shapes (S0 - S22) {#shacl-conformance-shapes-s0---s22}

Twenty-three SHACL NodeShapes are distributed in ueds-shapes-v2.ttl. Severity column distinguishes Violation (must reject) from Warning (SHOULD surface).

| **Shape**                     | **Severity** | **Rule**                                                                       |
|-------------------------------|--------------|--------------------------------------------------------------------------------|
| S0 DSPExtensionShape          | Violation    | Co-declare UEDS + DSP profile URIs.                                            |
| S1 ConstraintLeftOperandShape | Violation    | leftOperand IRI, ODRL operator, right-operand.                                 |
| S2 PersonalDataAssetShape     | Violation    | Personal-data assets need DP / k-anon / agg / pseud / FL duty.                 |
| S3 OperationalAssetShape      | Violation    | Operational assets need mTLS + signing duties.                                 |
| S4 AIPolicyShape              | Violation    | AI policy needs lawful-basis + AI-Act + purpose.                               |
| S5 Datatype shapes            | Violation    | Right-operands typed correctly (xsd:duration / numeric).                       |
| S6 ValidityPeriodShape        | Violation    | contractStart \< contractEnd.                                                  |
| S7 PrivacyParameterShape      | Violation    | k\>=2, l\>=1, t\>0, eps\>0, totalEps\>0.                                       |
| S8 PMUStreamShape             | Violation    | PMU streams require NIS2-Essential.                                            |
| S9 SubLicensingShape          | Warning      | DataSharingAgreement should explicitly handle odrl:transfer.                   |
| S10 CatalogRegistrationShape  | Warning      | ueds:register obligation.                                                      |
| S11 EncryptionAtRestShape     | Violation    | Personal-data assets need encryptAtRest with approved scheme.                  |
| S12 RetentionPeriodShape      | Violation    | Personal-data policies need applyRetention + retentionPeriod.                  |
| S13 SubProcessorDisclosure    | Violation    | All DataSharingAgreements need discloseSubProcessors.                          |
| S14 SpecialCategoryShape      | Violation    | Special-category data needs legalBasis.                                        |
| S15 SchremsIITransferShape    | Violation    | Cross-border transfer needs transferMechanism.                                 |
| S16 BIMNoDerivativeShape      | Violation    | BIM models require prohibition odrl:derive.                                    |
| S17 ESCONDAShape              | Violation    | EPC financial baselines require nda = true.                                    |
| S18 CriticalBuildingShape     | Violation    | Critical-building profiles must be k-anonymised k\>=5.                         |
| S19 GreenAIBudgetShape        | Warning      | Large model policies SHOULD declare maxJoulesPerInference.                     |
| S20 KeyAlgorithmShape         | Violation    | ueds:signCommand needs approved keyAlg.                                        |
| S21 DataQualityShape          | Warning      | MeterStream / IEQStream policies SHOULD declare \>=2 quality dimensions.       |
| S22 PublicTaskExemptionShape  | Violation    | Public-task permission needs both PublicAuthority role AND PublicTask purpose. |

# 13. Worked Examples {#worked-examples}

Three positive and three negative examples are provided in ueds-examples.ttl (Turtle) and ueds-examples.jsonld (JSON-LD using the published @context). Below is the most complete positive case (E1) in both serialisations.

## 13.1 E1 - Smart-meter retrofit access (Turtle) {#e1---smart-meter-retrofit-access-turtle}

ex:E1-RetrofitAgreement a ueds:DataSharingAgreement ;  
odrl:profile \<https://w3id.org/ueds\> , \<https://w3id.org/dspace/2024/1/\> ;  
odrl:permission \[  
odrl:target ex:District4-Households ;  
odrl:action ueds:PredictEnergyUse ;  
odrl:constraint  
\[ odrl:leftOperand ueds:purpose ; odrl:operator odrl:eq ; odrl:rightOperand ueds:RetrofitPlanning \] ,  
\[ odrl:leftOperand ueds:legalBasis ; odrl:operator odrl:eq ; odrl:rightOperand ueds:GDPRArt6_1e \] ,  
\[ odrl:leftOperand ueds:processingLocation; odrl:operator odrl:isPartOf ; odrl:rightOperand ueds:EEA \] ;  
odrl:duty  
\[ odrl:action ueds:applyDifferentialPrivacy ;  
odrl:constraint \[ odrl:leftOperand ueds:epsilon ; odrl:operator odrl:lteq ; odrl:rightOperand 1.0 \] \] ,  
\[ odrl:action ueds:encryptAtRest ;  
odrl:constraint \[ odrl:leftOperand ueds:atRestEncryption ; odrl:operator odrl:eq ; odrl:rightOperand ueds:AES-256-GCM \] \] ,  
\[ odrl:action ueds:applyRetention ;  
odrl:constraint \[ odrl:leftOperand ueds:retentionPeriod ; odrl:operator odrl:lteq ; odrl:rightOperand \"P3Y\"\^\^xsd:duration \] \] ;  
\] ;  
odrl:obligation \[ odrl:action ueds:discloseSubProcessors \] ,  
\[ odrl:action ueds:register \] .

## 13.2 E1 - Smart-meter retrofit access (JSON-LD) {#e1---smart-meter-retrofit-access-json-ld}

{ \"@context\": \[ \"https://w3id.org/ueds.jsonld\" \],  
\"@type\": \"DataSharingAgreement\",  
\"profile\": \[ \"https://w3id.org/ueds\", \"https://w3id.org/dspace/2024/1/\" \],  
\"permission\": \[{  
\"target\": \"ex:District4-Households\",  
\"action\": \"PredictEnergyUse\",  
\"constraint\": \[  
{ \"leftOperand\": \"purpose\", \"operator\": \"eq\", \"rightOperand\": \"RetrofitPlanning\" },  
{ \"leftOperand\": \"legalBasis\", \"operator\": \"eq\", \"rightOperand\": \"ueds:GDPRArt6_1e\" },  
{ \"leftOperand\": \"processingLocation\", \"operator\": \"isPartOf\", \"rightOperand\": \"ueds:EEA\" }  
\],  
\"duty\": \[  
{ \"action\": \"applyDifferentialPrivacy\",  
\"constraint\": \[ { \"leftOperand\": \"epsilon\", \"operator\": \"lteq\", \"rightOperand\": 1.0 } \] },  
{ \"action\": \"encryptAtRest\",  
\"constraint\": \[ { \"leftOperand\": \"atRestEncryption\", \"operator\": \"eq\", \"rightOperand\": \"ueds:AES-256-GCM\" } \] },  
{ \"action\": \"applyRetention\",  
\"constraint\": \[ { \"leftOperand\": \"retentionPeriod\", \"operator\": \"lteq\",  
\"rightOperand\": { \"@type\": \"xsd:duration\", \"@value\": \"P3Y\" } } \] }  
\]  
}\],  
\"obligation\": \[ { \"action\": \"discloseSubProcessors\" }, { \"action\": \"register\" } \] }

# 14. Test Corpus and Validation Procedure {#test-corpus-and-validation-procedure}

ueds-examples.ttl ships three positive (E1, E2, E3) and six negative (N1-N6) policies. The expected validation outcome is summarised below. Connector implementers MUST reproduce these outcomes when running ueds-shapes-v2.ttl over the corpus with any compliant SHACL processor.

| **Test**             | **Outcome** | **Reason**                                            |
|----------------------|-------------|-------------------------------------------------------|
| E1 RetrofitAgreement | PASS        | All Violation shapes pass.                            |
| E2 BEMSAgreement     | PASS        | All Violation shapes pass; transfer prohibited.       |
| E3 DSARAgreement     | PASS        | All Violation shapes pass.                            |
| N1 MissingDP         | FAIL        | S2 Violation: missing privacy duty.                   |
| N2 UnsignedBEMS      | FAIL        | S3 Violation: missing signing duty.                   |
| N3 BareAI            | FAIL        | S4 Violation: missing legal-basis / AI-Act / purpose. |
| N4 NoDSP             | FAIL        | S0 Violation: missing DSP profile URI.                |
| N5 BadPeriod         | FAIL        | S6 Violation: contractStart \>= contractEnd.          |
| N6 BadK              | FAIL        | S7 Violation: k \< 2.                                 |

# 15. Implementation Guidance for Connectors {#implementation-guidance-for-connectors}

Connectors implementing UEDS-ODRL at L3 SHOULD: (i) load the Turtle vocabulary and SHACL shapes at startup; (ii) accept policies in JSON-LD using the published context; (iii) implement the verdicts in the PEP behaviour table (section 6); (iv) publish a DCAT-AP catalog entry per registered dataset; (v) emit STIX 2.1 incident events to the dataspace clearing-house; (vi) maintain a DSAR / erasure-propagation webhook; (vii) implement a DP accountant per consumer per dataset; (viii) verify mTLS client certificates against dataspace trust anchors; (ix) verify TEE attestation quotes when ueds:processingEnvironment is set; (x) integrate with a carbon-intensity feed for ueds:scheduleGreenTime.

Reference open-source connectors known to be compatible architectures: Eclipse Dataspace Components (EDC), FIWARE TRUE Connector, Pontus-X. UEDS-ODRL terms can be loaded into their policy engines as an additional Profile without code changes; PEP behaviour requires extending the connector\'s enforcement adapters per the table in section 6.

# 16. References {#references}

1.  ODRL Information Model 2.2, W3C Recommendation, 15 February 2018.

2.  ODRL Vocabulary and Expression 2.2, W3C Recommendation, 15 February 2018.

3.  ODRL Profile for Data Spaces, W3C ODRL Community Group, https://w3c.github.io/odrl/profile-dataspaces/.

4.  ODRL V2.2 Profile Best Practices, W3C ODRL CG, https://w3c.github.io/odrl/profile-bp/.

5.  Data Privacy Vocabulary (DPV), W3C, https://w3c.github.io/dpv/dpv/.

6.  DPV-GDPR, W3C, https://w3c.github.io/dpv/dpv/dpv-gdpr/.

7.  DCAT-AP (Application Profile of DCAT), https://semiceu.github.io/DCAT-AP/.

8.  QUDT - Quantities, Units, Dimensions and Types, http://qudt.org/.

9.  PROV-O - The PROV Ontology, W3C Recommendation, 30 April 2013.

10. SHACL - Shapes Constraint Language, W3C Recommendation, 20 July 2017.

11. SKOS Reference, W3C Recommendation, 18 August 2009.

12. ETSI SAREF / SAREF4ENER / SAREF4BLDG ontologies.

13. Brick Schema, https://brickschema.org.

14. FIWARE Smart Data Models - Energy and Building.

15. OGC CityGML 3.0 / EnergyADE.

16. IEC 61968 / 61970 - Common Information Model (CIM).

17. ISO 16484-5 - BACnet Building Automation.

18. IEC 62056 (DLMS / COSEM) - Smart-meter data exchange.

19. IEC 62443 - Industrial communication networks: security.

20. OpenADR 2.0b Profile Specification.

21. Regulation (EU) 2016/679 (GDPR).

22. Regulation (EU) 2024/1689 (AI Act).

23. Directive (EU) 2022/2555 (NIS2).

24. Directive (EU) 2023/1791 (EED Recast), Article 21.

25. Directive (EU) 2024/1275 (EPBD Recast) - Digital Building Logbook.

26. Regulation (EU) 2024/2847 (Cyber Resilience Act).

27. International Data Spaces Reference Architecture Model (IDS-RAM).

28. Gaia-X Trust Framework.

29. Eclipse Dataspace Protocol (DSP).

30. C2PA - Content Provenance and Authenticity.

31. STIX 2.1 - Structured Threat Information Expression.

# 17. Acknowledgments {#acknowledgments}

This profile builds on the W3C ODRL Community Group draft for Data Spaces and on the W3C DPV Community Group\'s Data Privacy Vocabulary. The pattern catalogue is synthesised from the urban-energy and dataspaces literature cited in section 16 and in the policy-pattern table that drives the mapping in section 11. Feedback from connector implementers (EDC, FIWARE, Pontus-X) is welcomed at the project repository.

# 18. Index of Terms {#index-of-terms}

Compact alphabetical index. For each term the section that defines it is given.

| **Term**                            | **Section** |
|-------------------------------------|-------------|
| aggregate (action)                  | 8.2         |
| aiActCategory (left-operand)        | 9.4         |
| AggregatedProfile (asset)           | 7           |
| applyDifferentialPrivacy (action)   | 8.2         |
| applyKAnonymity (action)            | 8.2         |
| applyPseudonymization (action)      | 8.2         |
| applyRetention (action)             | 8.3         |
| applyWatermark (action)             | 8.2         |
| assigneeCertification (left-op)     | 9.4         |
| assigneeKYC (left-op)               | 9.4         |
| atRestEncryption (left-op)          | 9.5         |
| BEMSController (asset)              | 7           |
| BIMModel (asset)                    | 7           |
| CityDistrict (asset)                | 7           |
| compensate (action)                 | 8.3         |
| contractEnd / contractStart (left)  | 9.6         |
| DataSharingAgreement (policy class) | 3           |
| DataspaceCatalog (concept)          | 10          |
| DataspaceTrustAnchors (concept)     | 10          |
| DRDispatch (asset)                  | 7           |
| DSP profile (relationship)          | 4           |
| encryptAtRest (action)              | 8.4         |
| epsilon / totalEpsilonBudget (left) | 9.3         |
| fairnessMetric (left-op)            | 9.6         |
| GDPRArt6_1a..f (concept)            | 10          |
| HouseholdLoadSeries (asset)         | 7           |
| legalBasis (left-op)                | 9.4         |
| logIncident (action)                | 8.3         |
| monitorDrift (action)               | 8.6         |
| mutualAuth (action)                 | 8.4         |
| NIS2-Essential / Important          | 10          |
| NonCommercialResearch (concept)     | 10          |
| PMUStream (asset)                   | 7           |
| PredictEnergyUse (action)           | 8.6         |
| processingEnvironment (left-op)     | 9.5         |
| processingLocation (left-op)        | 9.1         |
| propagateErasure (action)           | 8.3         |
| publishModelCard (action)           | 8.6         |
| register (action)                   | 8.3         |
| retentionPeriod (left-op)           | 9.1         |
| revokeOnBreach (action)             | 8.3         |
| samplingInterval (left-op)          | 9.1         |
| scheduleGreenTime (action)          | 8.6         |
| signCommand (action)                | 8.4         |
| specialCategory (left-op)           | 9.2         |
| temporalGranularity / Scope (left)  | 9.1         |
| transferMechanism (left-op)         | 9.1         |
| trainFederated (action)             | 8.6         |
| UrbanPlanning (concept)             | 10          |
| watermarkScheme (left-op)           | 9.6         |
