# Conference Paper Checklists / 会议论文清单

This reference documents the mandatory checklist requirements for major ML/AI and Systems conferences. All major venues now require paper checklists—missing them results in desk rejection.
本参考文档记录了主要 ML/AI 和系统会议的必需清单要求。

---

## Contents / 目录

- [NeurIPS Paper Checklist](#neurips-paper-checklist)
- [ICML Paper Checklist](#icml-paper-checklist)
- [ICLR Requirements](#iclr-requirements)
- [ACL Requirements](#acl-requirements)
- [OSDI 2026 Requirements](#osdi-2026-requirements)
- [NSDI 2027 Requirements](#nsdi-2027-requirements)
- [ASPLOS 2027 Requirements](#asplos-2027-requirements)
- [SOSP 2026 Requirements](#sosp-2026-requirements)
- [Universal Pre-Submission Checklist](#universal-pre-submission-checklist)

---

## NeurIPS Paper Checklist

### Mandatory Components

All NeurIPS submissions must include a completed paper checklist. Papers lacking this element face **automatic desk rejection**. The checklist appears after references and supplemental material, outside the page limit.

### 16 Required Checklist Items

#### 1. Claims Alignment
Authors must verify that abstract and introduction claims match theoretical and experimental results, with clearly stated contributions, assumptions, and limitations.

**What to check:**
- [ ] Abstract claims match actual results
- [ ] Introduction doesn't overclaim
- [ ] Contributions are specific and falsifiable

#### 2. Limitations Discussion
Papers should include a dedicated "Limitations" section addressing strong assumptions, robustness to violations, scope constraints, and performance-influencing factors.

**What to include:**
- [ ] Dedicated Limitations section
- [ ] Honest assessment of scope
- [ ] Conditions where method may fail

#### 3. Theory & Proofs
Theoretical contributions require full assumption statements and complete proofs (main paper or appendix with proof sketches for intuition).

**What to check:**
- [ ] All assumptions stated formally
- [ ] Complete proofs provided (main text or appendix)
- [ ] Proof sketches for intuition in main text

#### 4. Reproducibility
Authors must describe steps ensuring results verification through code release, detailed instructions, model access, or checkpoints appropriate to their contribution type.

**What to provide:**
- [ ] Clear reproducibility statement
- [ ] Code availability information
- [ ] Model checkpoints if applicable

#### 5. Data & Code Access
Instructions for reproducing main experimental results should be provided (supplemental material or URLs), including exact commands and environment specifications.

**What to include:**
- [ ] Exact commands to run experiments
- [ ] Environment specifications (requirements.txt, conda env)
- [ ] Data access instructions

#### 6. Experimental Details
Papers must specify training details: data splits, hyperparameters, and selection methods in the main paper or supplementary materials.

**What to document:**
- [ ] Train/val/test split details
- [ ] All hyperparameters used
- [ ] Hyperparameter selection method

#### 7. Statistical Significance
Results require error bars, confidence intervals, or statistical tests with clearly stated calculation methods and underlying assumptions.

**What to include:**
- [ ] Error bars or confidence intervals
- [ ] Number of runs/seeds
- [ ] Calculation method (std dev vs std error)

#### 8. Compute Resources
Specifications needed: compute worker types (CPU/GPU), memory, storage, execution time per run, and total project compute requirements.

**What to document:**
- [ ] GPU type and count
- [ ] Training time per run
- [ ] Total compute used

#### 9. Ethics Code Compliance
Authors confirm adherence to the NeurIPS Code of Ethics, noting any necessary deviations.

**What to verify:**
- [ ] Read NeurIPS Code of Ethics
- [ ] Confirm compliance
- [ ] Note any deviations with justification

#### 10. Broader Impacts
Discussion of potential negative societal applications, fairness concerns, privacy risks, and possible mitigation strategies when applicable.

**What to address:**
- [ ] Potential negative applications
- [ ] Fairness considerations
- [ ] Privacy implications
- [ ] Mitigation strategies

#### 11. Safeguards
High-risk models (language models, internet-scraped datasets) require controlled release mechanisms and usage guidelines.

**What to consider:**
- [ ] Release strategy for sensitive models
- [ ] Usage guidelines if needed
- [ ] Access controls if appropriate

#### 12. License Respect
All existing assets require creator citations, license names, URLs, version numbers, and terms-of-service acknowledgment.

**What to document:**
- [ ] Dataset licenses cited
- [ ] Code licenses respected
- [ ] Version numbers included

#### 13. Asset Documentation
New releases need structured templates documenting training details, limitations, consent procedures, and licensing information.

**For new datasets/models:**
- [ ] Datasheet or model card
- [ ] Training data documentation
- [ ] Known limitations

#### 14. Human Subjects
Crowdsourcing studies must include participant instructions, screenshots, compensation details, and comply with minimum wage requirements.

**What to include:**
- [ ] Task instructions
- [ ] Compensation details
- [ ] Time estimates

#### 15. IRB Approvals
Human subjects research requires documented institutional review board approval or equivalent, with risk descriptions disclosed (maintaining anonymity at submission).

**What to verify:**
- [ ] IRB approval obtained
- [ ] Risk assessment completed
- [ ] Anonymized at submission

#### 16. LLM Declaration
Usage of large language models as core methodology components requires disclosure; writing/editing use doesn't require declaration.

**What to disclose:**
- [ ] LLM used as core methodology component
- [ ] How LLM was used
- [ ] (Writing assistance doesn't require disclosure)

### Response Format

Authors select "yes," "no," or "N/A" per question, with optional 1-2 sentence justifications.

**Important:** Reviewers are explicitly instructed not to penalize honest limitation acknowledgment.

---

## ICML Paper Checklist

### Broader Impact Statement

ICML requires a Broader Impact Statement at the end of the paper, before references. This does NOT count toward the page limit.

**Required elements:**
- Potential positive impacts
- Potential negative impacts
- Mitigation strategies
- Who may be affected

### ICML Specific Requirements

#### Reproducibility Checklist

- [ ] Data splits clearly specified
- [ ] Hyperparameters listed
- [ ] Search ranges documented
- [ ] Selection method explained
- [ ] Compute resources specified
- [ ] Code availability stated

#### Statistical Reporting

- [ ] Error bars on all figures
- [ ] Standard deviation vs standard error specified
- [ ] Number of runs stated
- [ ] Significance tests if comparing methods

#### Anonymization

- [ ] No author names in paper
- [ ] No acknowledgments
- [ ] No grant numbers
- [ ] Prior work cited in third person
- [ ] No identifiable repository URLs

---

## ICLR Requirements

### LLM Disclosure Policy (New for 2026)

ICLR has a specific LLM disclosure requirement:

> "If LLMs played a significant role in research ideation and/or writing to the extent that they could be regarded as a contributor, authors must describe their precise role in a separate appendix section."

**When disclosure is required:**
- LLM used for significant research ideation
- LLM used for substantial writing
- LLM could be considered a contributor

**When disclosure is NOT required:**
- Grammar checking
- Minor editing assistance
- Code completion tools

**Consequences of non-disclosure:**
- Desk rejection
- Potential post-publication issues

### ICLR Specific Requirements

#### Reproducibility Statement (Optional but Recommended)

Add a statement referencing:
- Supporting materials
- Code availability
- Data availability
- Model checkpoints

#### Ethics Statement (Optional)

Address potential concerns in ≤1 page. Does not count toward page limit.

#### Reciprocal Reviewing

- Authors on 3+ papers must serve as reviewers for ≥6 papers
- Each submission needs ≥1 author registered to review ≥3 papers

---

## ACL Requirements

### Limitations Section (Mandatory)

ACL specifically requires a Limitations section:

**What to include:**
- Strong assumptions made
- Scope limitations
- When method may fail
- Generalization concerns

**Important:** The Limitations section does NOT count toward the page limit.

### ACL Specific Checklist

#### Responsible NLP

- [ ] Bias considerations addressed
- [ ] Fairness evaluated if applicable
- [ ] Dual-use concerns discussed

#### Multilingual Considerations

If applicable:
- [ ] Language diversity addressed
- [ ] Non-English languages included
- [ ] Translation quality verified

#### Human Evaluation

If applicable:
- [ ] Annotator details provided
- [ ] Agreement metrics reported
- [ ] Compensation documented

---

## OSDI 2026 Requirements / OSDI 2026 要求

OSDI focuses on innovative research and quantified/insightful experiences in systems design and implementation.
OSDI 专注于系统设计与实现中的创新研究和量化/深入的经验。

### Submission Tracks / 提交赛道

- **Research Track**: Comparable to previous OSDIs, for novel systems research / 研究赛道，展示新颖系统研究
- **Operational Systems Track** (New in 2026): For design, implementation, analysis, and experience of operational systems / 运营系统赛道（新增），展示部署系统的设计、实现和经验

### OSDI Pre-Submission Checklist / OSDI 提交前清单

#### Formatting / 格式
- [ ] ≤12 pages (excluding references) / 不超过 12 页（不含参考文献）
- [ ] 8.5" x 11" pages, 10pt on 12pt leading, two-column, Times Roman
- [ ] 7" wide x 9" deep text block
- [ ] Pages are numbered / 页面已编号
- [ ] Figures and tables legible in black and white / 图表黑白可读
- [ ] Paper is the right length (not padded; <6pp unlikely to receive full consideration) / 长度适中

#### Content / 内容
- [ ] Motivates a significant problem / 激励了一个重要问题
- [ ] Proposes interesting and compelling solution / 提出有趣且令人信服的解决方案
- [ ] Demonstrates practicality and benefits / 展示实用性和收益
- [ ] Draws appropriate conclusions / 得出适当结论
- [ ] Clearly describes contributions / 清晰描述贡献
- [ ] Clearly articulates advances beyond previous work / 明确阐明超越先前工作的进展

#### Anonymization / 匿名化
- [ ] Double-blind: no author names, affiliations / 双盲：无作者姓名、单位
- [ ] Anonymized project/system name (different from arXiv/talks) / 匿名化项目/系统名称
- [ ] No NDA forms attached / 未附加保密协议
- [ ] **Operational Systems track exception**: May use real company/system names for context / 运营系统赛道可使用真实公司/系统名称

#### Track-Specific / 赛道特定
- [ ] Track indicated on title page and submission form / 在标题页和提交表单上标注赛道
- [ ] Operational Systems papers: title ends with "(Operational Systems)" / 标题以"(Operational Systems)"结尾
- [ ] Max 8 submissions per author / 每位作者最多 8 篇

#### AI Policy / AI 政策
- [ ] Work NOT wholly or largely generated by AI (AI editing tools are acceptable) / 工作非 AI 生成（AI 编辑工具可接受）

---

## NSDI 2027 Requirements / NSDI 2027 要求

NSDI focuses on design principles, implementation, and practical evaluation of networked and distributed systems.
NSDI 专注于网络和分布式系统的设计原理、实现和实际评估。

### Submission Tracks / 提交赛道

- **Traditional Research Track**: Novel ideas with thorough evaluations / 传统研究赛道：新颖想法+全面评估
- **Frontiers Track** (New): Bold ideas without necessarily complete evaluation / 前沿赛道（新增）：大胆想法，无需完整评估
- **Operational Systems Track**: Deployed systems with lessons learned / 运营系统赛道：部署系统的经验教训

### Prescreening Phase / 预筛选阶段

Reviewers read only the Introduction to check:
审稿人仅阅读 Introduction 检查：

- [ ] Subject falls within NSDI scope / 主题在 NSDI 范围内
- [ ] Exposition understandable by NSDI PC member / NSDI PC 成员可理解
- [ ] Track-specific criteria articulated in Introduction / Introduction 中阐明了赛道特定标准
  - Research: novel idea + evaluation evidence / 新颖想法+评估证据
  - Frontiers: novel non-incremental idea / 新颖非增量想法
  - Operational: deployment setting, scale, lessons learned / 部署设置、规模、经验教训

### NSDI Pre-Submission Checklist / NSDI 提交前清单

#### Formatting / 格式
- [ ] ≤12 pages (excluding references), USENIX format
- [ ] Two-column, 10pt, Times Roman
- [ ] Double-blind anonymized / 双盲匿名化

#### Content Scope / 内容范围
- [ ] Contributions to networked systems design / 对网络系统设计的贡献
- [ ] NOT out-of-scope topics (hardware architecture, physical layer, sensing, UI) / 非范围外主题
- [ ] Track indicated on title page and submission form / 标注赛道

#### Resubmission Rules / 重投规则
- [ ] Not rejected from previous NSDI deadline without one-shot revision option / 非上一轮 NSDI 被拒论文
- [ ] One-shot revision includes: highlighted changes + explanation of major changes / 一次修改重投包括标记变更+主要变更说明

---

## ASPLOS 2027 Requirements / ASPLOS 2027 要求

ASPLOS focuses on the intersection of computer architecture, programming languages, and operating systems.
ASPLOS 专注于计算机体系结构、编程语言和操作系统的交叉领域。

### Rapid Review Round / 快速评审轮

**This is unique to ASPLOS and critically important. 这是 ASPLOS 独有的重要环节。**

- Reviewers only read the **first 2 pages** / 审稿人仅阅读**前 2 页**
- Evaluates how work advances Architecture/PL/OS research / 评估对体系结构/PL/OS 的推进
- Majority of submissions may not advance past this stage / 多数提交可能无法通过此阶段
- Papers lacking suitable reviewers returned early / 缺乏合适审稿人的论文会被提前退回

### ASPLOS Pre-Submission Checklist / ASPLOS 提交前清单

#### First 2 Pages (CRITICAL for Rapid Review) / 前 2 页（快速评审关键）
- [ ] Self-contained: clearly states problem, approach, and contribution / 自成体系：明确阐述问题、方法和贡献
- [ ] Advances Architecture, PL, and/or OS research / 推进体系结构/PL/OS 研究
- [ ] Not just advances in another domain using arch/PL/OS / 不仅仅是使用体系结构/PL/OS 推进其他领域

#### Formatting / 格式
- [ ] ACM SIGPLAN format (`\documentclass[sigplan,10pt]{acmart}`) 
- [ ] ≤12 pages (excluding references)
- [ ] Double-blind anonymized / 双盲匿名化
- [ ] No identifying info in submitted documents / 提交文档中无身份信息

#### Submission Rules / 提交规则
- [ ] Max 4 submissions per author per cycle / 每人每轮最多 4 篇
- [ ] Resubmission note describing changes (if applicable) / 重投说明（如适用）
- [ ] Not resubmitted from immediate previous ASPLOS cycle / 非上一轮 ASPLOS 被拒论文
- [ ] Accurate topic selection for reviewer assignment / 准确选择主题以便分配审稿人

---

## SOSP 2026 Requirements / SOSP 2026 要求

SOSP seeks innovative research related to design, implementation, analysis, evaluation, and deployment of computer systems software.
SOSP 寻求与计算机系统软件设计、实现、分析、评估和部署相关的创新研究。

### SOSP Pre-Submission Checklist / SOSP 提交前清单

#### Formatting / 格式
- [ ] ACM SIGPLAN format (`\documentclass[sigplan,10pt]{acmart}`)
- [ ] ≤12 pages technical content (excluding references)
- [ ] A4 or US letter, 178×229mm (7×9") text block
- [ ] Two-column, 8mm separation, 10pt on 12pt leading
- [ ] Pages numbered, references hyperlinked / 页面编号，参考文献超链接
- [ ] Figures/tables readable without magnification, encouraged in color but grayscale-readable / 图表无需放大即可阅读

#### Content / 内容
- [ ] Motivates a significant problem / 激励重要问题
- [ ] Proposes and implements compelling solution / 提出并实现令人信服的解决方案
- [ ] Demonstrates practicality and benefits / 展示实用性和收益
- [ ] Clearly describes contributions and advances / 清晰描述贡献和进展

#### Anonymization / 匿名化
- [ ] Double-blind: paper ID instead of author names / 双盲：使用论文 ID 代替作者名
- [ ] Anonymized system/project name / 匿名化系统/项目名称
- [ ] Own work cited in third person / 自己的工作用第三人称引用
- [ ] No acknowledgments or grant numbers / 无致谢或基金编号

#### Artifact Evaluation (Optional) / Artifact 评估（可选）
- [ ] Plan for artifact submission after acceptance / 接受后的 artifact 提交计划
- [ ] Reproducibility materials prepared / 准备可重现性材料

#### Author Response / 作者回复
- [ ] Response limited to: correcting factual errors + addressing reviewer questions / 回复限于：纠正事实错误+回答审稿人问题
- [ ] No new experiments or additional work in response / 回复中不包含新实验或额外工作
- [ ] Recommended: keep under 500 words / 建议保持在 500 字以内

---

## Systems Conferences Common Requirements / 系统会议通用要求

### What All Systems Venues Look For / 所有系统会议关注的内容

- [ ] **System design and implementation** - not just algorithms / 系统设计和实现，不仅仅是算法
- [ ] **Real workloads and evaluation** - microbenchmarks are insufficient / 真实工作负载和评估
- [ ] **Practical benefits demonstrated** - latency, throughput, cost, energy / 展示实际收益
- [ ] **Comparison with state-of-the-art systems** / 与最新系统对比
- [ ] **No simultaneous submission to other venues** / 不同时提交到其他会议
- [ ] **Prior arXiv/tech reports permitted** / 允许先前的 arXiv/技术报告



### Before Every Submission

#### Paper Content

- [ ] Abstract ≤ word limit (usually 250-300 words)
- [ ] Main content within page limit
- [ ] References complete and verified
- [ ] Limitations section included
- [ ] All figures/tables have captions
- [ ] Captions are self-contained

#### Formatting

- [ ] Correct template used (venue + year specific)
- [ ] Margins not modified
- [ ] Font sizes not modified
- [ ] Double-blind requirements met
- [ ] Page numbers (for review) or none (camera-ready)

#### Technical

- [ ] All claims supported by evidence
- [ ] Error bars included
- [ ] Baselines appropriate
- [ ] Hyperparameters documented
- [ ] Compute resources stated

#### Reproducibility

- [ ] Code will be available (or justification)
- [ ] Data will be available (or justification)
- [ ] Environment documented
- [ ] Commands to reproduce provided

#### Ethics

- [ ] Broader impacts considered
- [ ] Limitations honestly stated
- [ ] Licenses respected
- [ ] IRB obtained if needed

#### Final Checks

- [ ] PDF compiles without errors
- [ ] All figures render correctly
- [ ] All citations resolve
- [ ] Supplementary material organized
- [ ] Conference checklist completed

---

## Quick Reference: Page Limits / 页数限制速查

### ML/AI Conferences / ML/AI 会议

| Conference | Main Content | References | Appendix |
|------------|-------------|------------|----------|
| NeurIPS 2025 | 9 pages | Unlimited | Unlimited (checklist separate) |
| ICML 2026 | 8 pages (+1 camera) | Unlimited | Unlimited |
| ICLR 2026 | 9 pages (+1 camera) | Unlimited | Unlimited |
| ACL 2025 | 8 pages (long) | Unlimited | Unlimited |
| AAAI 2026 | 7 pages (+1 camera) | Unlimited | Unlimited |
| COLM 2025 | 9 pages (+1 camera) | Unlimited | Unlimited |

### Systems Conferences / 系统会议

| Conference | Main Content | Camera-Ready | References | Format |
|------------|-------------|--------------|------------|--------|
| OSDI 2026 | 12 pages | 14 pages | Unlimited | USENIX |
| NSDI 2027 | 12 pages | varies | Unlimited | USENIX |
| ASPLOS 2027 | 12 pages | varies | Unlimited | ACM SIGPLAN |
| SOSP 2026 | 12 pages | varies | Unlimited | ACM SIGPLAN |

---

## Template Locations

All conference templates are in the `templates/` directory:

```
templates/
├── icml2026/       # ICML 2026 official
├── iclr2026/       # ICLR 2026 official
├── neurips2025/    # NeurIPS 2025
├── acl/            # ACL style files
├── aaai2026/       # AAAI 2026
├── colm2025/       # COLM 2025
├── osdi2026/       # OSDI 2026 (USENIX)
├── nsdi2027/       # NSDI 2027 (USENIX)
├── asplos2027/     # ASPLOS 2027 (ACM SIGPLAN)
└── sosp2026/       # SOSP 2026 (ACM SIGPLAN)
```
