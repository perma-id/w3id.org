# openllm-mis

This namespace provides persistent identifiers for the online interactive companion to the textbook *Open Large Language Models: MIS Perspectives on Theory, Methods, and Business Applications* (Chinese title: 《開源大型語言模型：資管觀點的理論、方法與商業應用》).

- Namespace: `https://w3id.org/openllm-mis/`
- Interactive site: `https://openllm-mis.jjhuang0703.chatgpt.site/`
- Maintainer: Jih-Jeng Huang ([@brite0703](https://github.com/brite0703))
- Contact: `jjhuang@scu.edu.tw`

The root identifier resolves to the interactive site. The chapter identifiers `ch01` through `ch16` resolve to the corresponding learning laboratories.

| Identifier | Destination path |
|---|---|
| `ch01` | `/labs/task-technology-fit` |
| `ch02` | `/labs/open-source-control-frontier` |
| `ch03` | `/labs/information-behavior` |
| `ch04` | `/labs/human-ai-work-allocation` |
| `ch05` | `/labs/data-knowledge-governance` |
| `ch06` | `/labs/is-value-evaluation` |
| `ch07` | `/labs/prompt-context-design` |
| `ch08` | `/labs/rag-evidence-chain` |
| `ch09` | `/labs/model-adaptation-choice` |
| `ch10` | `/labs/reasoning-verification` |
| `ch11` | `/labs/controlled-tool-workflow` |
| `ch12` | `/labs/solution-architecture` |
| `ch13` | `/labs/design-science` |
| `ch14` | `/labs/adoption-work-redesign` |
| `ch15` | `/labs/service-governance` |
| `ch16` | `/labs/capstone-decision` |

HTTP 302 is used intentionally so that the persistent identifiers remain unchanged if the hosting destination changes. The fallback rule preserves direct paths below the namespace.
