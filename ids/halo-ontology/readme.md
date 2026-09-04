HALO is built to serve as a standard stucture and model for hallucinations in generative AI. We stored ontology and entities related to hallucination in modern generative models.

Our ontology can help us answer include: 

1. Are LLMs relatively uniform in which prompts they hallucinate on, or are there significant differences between
LLMs?

2. What kinds of hallucination categories are most common?
  
3. Furthermore, given longitudinal data, can we determine if LLMs are ‘improving’ on some
categories of hallucinations, compared to others?

HALO is structured into two principal modules: **(1) the Hallucination module**, and **(2) the Metadata module**

**The Metadata module** represents the core concepts and properties of the prompts and answers we gathered such as Generative AI models, LLMs, Prompts_id, Answer_id, etc.

**The Hallucination module** contains classes for each of the hallucination categories and subcategories defined as follows:

1. _Factuality Hallucinations_ refers to errors in LLMs outputs by misrepresenting real-world facts. These errors manifest in two distinct ways: _Factual Inconsistency_ and _Factual Fabrication_
2. _Faithfulness Hallucination_ refers to LLM outputs that fail to align
faithfully with user instructions, when provided with context, including wellknown logical rules based in objective fields like math or physics, for example.
We further sub-categorize it into three subtypes: _Instruction Inconsistency_, _Context Inconsistency_, and _Logical Inconsistency_


Link to our paper: https://arxiv.org/abs/2312.05209

Contact information: Navapat Nananukul (nananuku@isi.edu) [@navapatn](https://github.com/navapatn) 
