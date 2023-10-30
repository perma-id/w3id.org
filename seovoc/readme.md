![WordLift Logo](https://github.com/wordlift/wl-ontology/raw/main/img/220px-Wl-logo-horizontal.png)

# SEOntology

## Description

THe **SEOntology** is framework developed by WordLift and other SEOs for **content optimization**. Think of it as an operating system for your content strategy. This is an early draft.

## Features

- **Main Classes**: Our ontology provides a comprehensive coverage of various SEO elements, such as:
  - `WebPage`: The primary entity representing a specific webpage.
  - `Internal_Links`: Central to SEO, encompassing elements like `AnchorText`, `Backlink`, `Menu`, `MetaDescription`, `MetaTitle`, and `Query`.
  - `E_E_A_T`: Representing Expertise, Authoritativeness, and Trustworthiness, which includes sub-classes like `Author`, `Organization`, and `Publisher`.
  - `User_Experience`: Focused on elements ensuring optimal user experience, including `UserExperienceElement`.
  - `SocialMedia`: Capturing aspects of social media presence, including `SocialShare`.
  - And more: Including `Crawlability`, `EmailStrategy`, `Image`, `Schema`, `Video` and more.

- **Object Properties**: These define relationships between classes. For instance:
  - `containsImage` and `containsVideo`: To indicate media content in a `WebPage`.
  - `hasAuthor`, `hasPublisher`: Indicating authorship and publishing entities for content.
  - `hasBacklink`, `hasMenu`, `hasMetaDescription`, `hasMetaTitle`, `hasQuery`, `hasSocialShare`: Various properties associating a `WebPage` with different `Internal_Links` elements.
  - `implementsUserExperience`: Connects a `WebPage` with elements ensuring user experience.
  - And more: Including properties like `followsEmailStrategy`, `usesAnchorText`, `usesSchema`, `usesSocialMedia` that capture various other relationships.

- **Data Properties**: These properties store specific values related to classes. Notably:
  - `Google_Search_Console`: Integrating insights from Google Search Console.
  - `anchorTextContent`, `metaDescriptionContent`, `metaTitleContent`: Content-related attributes.
  - `isCrawlable`, `hasOptimizedImage`, `hasUniqueContent`: Booleans to capture certain features or states of a `WebPage`.
  - `publishingDate`, `bounceRate`, `clickDepth`, `fontSize`, `pageLoadTime`: Specific metrics and attributes for a `WebPage`.
  - Clicks & Impressions Metrics: `7DaysClicks`, `7DaysImpressions`, `28_Days_Clicks`, `28_Days_Impressions`, `90_Days_Clicks`, `90_Days_Impressions` for tracking webpage performance over time.

## Getting Started

### Prerequisites

- [Protege](https://protege.stanford.edu/) or any other ontology editing tool
- Basic knowledge of [OWL/RDF/SPARQL/any other relevant technology]

### Installation & Setup

1. Clone this repository:
   ```bash
   git clone [URL to your repo]
   ```
2. Open the ontology file in Protege or your preferred ontology editor.

## How to Contribute

1. Fork this repository.
2. Create a new branch for your changes.
3. Make and commit your changes.
4. Push your branch to your fork.
5. Open a pull request from your fork to this repository.
6. After review and discussion, if your changes are approved, they will be merged.

## Versioning

We use [Semantic Versioning](http://semver.org/) for this project.

## Communication & Discussion

- [Thread on X](https://x.com/cyberandy/status/1715853285838430358?s=20)
- For issues, use the GitHub [issues](https://github.com/wordlift/wl-ontology/issues) page.

## Contact
This space is administered by:  

**David Riccitelli**  
*Cofounder and CTO*  
[WordLift](https://wordlift.io)  
<david@wordlift.io>  
GitHub: [wordlift](https://github.com/wordlift)


