# RoBivaL

## Description

This namespace provides permanent [IRIs](https://www.rfc-editor.org/rfc/rfc3987) for data from the [RoBivaL project](https://robotik.dfki-bremen.de/en/research/projects/robival).
The data is modeled as a network of [RDF](https://www.w3.org/RDF/) nodes which are published as [FDOs](https://fairdo.org/).
These are intended as a substitute for a previous [monolithic version of the RoBivaL data corpus](https://doi.org/10.5281/zenodo.8424932).

The namespace is divided into multiple levels reflecting the hierarchical design of the RoBivaL data model.

```txt
RoBivaL/
    FDOProfile/
        ${FDO_PROFILE_NAME}
    FDORecord/
        Payload/
            Run/
                ${RUN_NAME}
        Specification/
            ExperimentParameter/
                ${EXPERIMENT_PARAMETER_NAME}
            ExperimentType/
                ${EXPERIMENT_TYPE_NAME}
            Hardware/
                ${HARDWARE_NAME}
```

## Maintainers

### Christian Backe

- Name: Christian Backe
- Affiliation: [DFKI Robotics Innovation Center](https://robotik.dfki-bremen.de/en/about-us/dfki-robotics-innovation-center/), Bremen, Germany
- Email: christian.backe@dfki.de
- GitHub: [cbacke](https://github.com/cbacke)
- ORCID: [0009-0002-7114-0687](https://orcid.org/0009-0002-7114-0687)
