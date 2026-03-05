# Reviewer Guidelines & Evaluation Criteria / 审稿人指南与评估标准

This reference documents how reviewers evaluate papers at major ML/AI and Systems conferences, helping authors anticipate and address reviewer concerns.
本参考文档记录了 ML/AI 和系统会议审稿人如何评估论文，帮助作者预判和解决审稿人关切的问题。

---

## Contents / 目录

- [Universal Evaluation Dimensions](#universal-evaluation-dimensions)
- [NeurIPS Reviewer Guidelines](#neurips-reviewer-guidelines)
- [ICML Reviewer Guidelines](#icml-reviewer-guidelines)
- [ICLR Reviewer Guidelines](#iclr-reviewer-guidelines)
- [ACL Reviewer Guidelines](#acl-reviewer-guidelines)
- [Systems Conference Reviewer Guidelines](#systems-conference-reviewer-guidelines)
- [What Makes Reviews Strong](#what-makes-reviews-strong)
- [Common Reviewer Concerns](#common-reviewer-concerns)
- [How to Address Reviewer Feedback](#how-to-address-reviewer-feedback)

---

## Universal Evaluation Dimensions

All major ML conferences assess papers across four core dimensions:

### 1. Quality (Technical Soundness)

**What reviewers ask:**
- Are claims well-supported by theoretical analysis or experimental results?
- Are the proofs correct? Are the experiments properly controlled?
- Are baselines appropriate and fairly compared?
- Is the methodology sound?

**How to ensure high quality:**
- Include complete proofs (main paper or appendix with sketches)
- Use appropriate baselines (not strawmen)
- Report variance/error bars with methodology
- Document hyperparameter selection process

### 2. Clarity (Writing & Organization)

**What reviewers ask:**
- Is the paper clearly written and well organized?
- Can an expert in the field reproduce the results?
- Is notation consistent? Are terms defined?
- Is the paper self-contained?

**How to ensure clarity:**
- Use consistent terminology throughout
- Define all notation at first use
- Include reproducibility details (appendix acceptable)
- Have non-authors read before submission

### 3. Significance (Impact & Importance)

**What reviewers ask:**
- Are the results impactful for the community?
- Will others build upon this work?
- Does it address an important problem?
- What is the potential for real-world impact?

**How to demonstrate significance:**
- Clearly articulate the problem's importance
- Connect to broader research themes
- Discuss potential applications
- Compare to existing approaches meaningfully

### 4. Originality (Novelty & Contribution)

**What reviewers ask:**
- Does this provide new insights?
- How does it differ from prior work?
- Is the contribution non-trivial?

**Key insight from NeurIPS guidelines:**
> "Originality does not necessarily require introducing an entirely new method. Papers that provide novel insights from evaluating existing approaches or shed light on why methods succeed can also be highly original."

---

## NeurIPS Reviewer Guidelines

### Scoring System (1-6 Scale)

| Score | Label | Description |
|-------|-------|-------------|
| **6** | Strong Accept | Groundbreaking, flawless work; top 2-3% of submissions |
| **5** | Accept | Technically solid, high impact; would benefit the community |
| **4** | Borderline Accept | Solid work with limited evaluation; leans accept |
| **3** | Borderline Reject | Solid but weaknesses outweigh strengths; leans reject |
| **2** | Reject | Technical flaws or weak evaluation |
| **1** | Strong Reject | Well-known results or unaddressed ethics concerns |

### Reviewer Instructions

Reviewers are explicitly instructed to:

1. **Evaluate the paper as written** - not what it could be with revisions
2. **Provide constructive feedback** - 3-5 actionable points
3. **Not penalize honest limitations** - acknowledging weaknesses is encouraged
4. **Assess reproducibility** - can the work be verified?
5. **Consider ethical implications** - potential misuse or harm

### What Reviewers Should Avoid

- Superficial, uninformed reviews
- Demanding unreasonable additional experiments
- Penalizing authors for honest limitation acknowledgment
- Rejecting for missing citations to reviewer's own work

### Timeline (NeurIPS 2025)

- Bidding: May 17-21
- Reviewing period: May 29 - July 2
- Author rebuttals: July 24-30
- Discussion period: July 31 - August 13
- Final notifications: September 18

---

## ICML Reviewer Guidelines

### Review Structure

ICML reviewers provide:

1. **Summary** - Brief description of contributions
2. **Strengths** - Positive aspects
3. **Weaknesses** - Areas for improvement
4. **Questions** - Clarifications for authors
5. **Limitations** - Assessment of stated limitations
6. **Ethics** - Any concerns
7. **Overall Score** - Recommendation

### Scoring Guidelines

ICML uses a similar 1-6 scale with calibration:
- Top 25% of accepted papers: Score 5-6
- Typical accepted paper: Score 4-5
- Borderline: Score 3-4
- Clear reject: Score 1-2

### Key Evaluation Points

1. **Reproducibility** - Are there enough details?
2. **Experimental rigor** - Multiple seeds, proper baselines?
3. **Writing quality** - Clear, organized, well-structured?
4. **Novelty** - Non-trivial contribution?

---

## ICLR Reviewer Guidelines

### OpenReview Process

ICLR uses OpenReview with:
- Public reviews (after acceptance decisions)
- Author responses visible to reviewers
- Discussion between reviewers and ACs

### Scoring

ICLR reviews include:
- **Soundness**: 1-4 scale
- **Presentation**: 1-4 scale
- **Contribution**: 1-4 scale
- **Overall**: 1-10 scale
- **Confidence**: 1-5 scale

### Unique ICLR Considerations

1. **LLM Disclosure** - Reviewers assess whether LLM use is properly disclosed
2. **Reproducibility** - Emphasis on code availability
3. **Reciprocal Reviewing** - Authors must also serve as reviewers

---

## ACL Reviewer Guidelines

### ACL-Specific Criteria

ACL adds NLP-specific evaluation:

1. **Linguistic soundness** - Are linguistic claims accurate?
2. **Resource documentation** - Are datasets/models properly documented?
3. **Multilingual consideration** - If applicable, is language diversity addressed?

### Limitations Section

ACL specifically requires a Limitations section. Reviewers check:
- Are limitations honest and comprehensive?
- Do limitations undermine core claims?
- Are potential negative impacts addressed?

### Ethics Review

ACL has a dedicated ethics review process for:
- Dual-use concerns
- Data privacy issues
- Bias and fairness implications

---

## Systems Conference Reviewer Guidelines / 系统会议审稿指南

Systems conferences (OSDI, NSDI, ASPLOS, SOSP) evaluate papers differently from ML/AI venues. Understanding these differences is critical for cross-venue submissions.
系统会议的评审标准与 ML/AI 会议不同。理解这些差异对跨会议提交至关重要。

### Core Evaluation Criteria for Systems / 系统论文核心评估标准

| Criterion | What Reviewers Look For | 审稿人关注点 |
|-----------|------------------------|-----------|
| **Novelty** | New system design, not just incremental improvement | 新颖的系统设计，非增量改进 |
| **Significance** | Solves important practical problem | 解决重要实际问题 |
| **System Design** | Sound architecture, clear design decisions | 合理的架构、清晰的设计决策 |
| **Implementation** | Working prototype, not just simulation | 可工作的原型，而非仅仅仿真 |
| **Evaluation** | Real workloads, end-to-end performance | 真实工作负载、端到端性能 |
| **Clarity** | Clear writing, reproducible | 清晰写作、可重现 |

### OSDI 2026 Reviewer Perspective / OSDI 2026 审稿视角

**What reviewers evaluate:**
- Topic relevance to computer systems / 与计算机系统的相关性
- Potential to impact future systems research and practices / 对未来系统研究和实践的影响潜力
- Interest to substantial portion of OSDI attendees / 对 OSDI 与会者的吸引力
- Papers with little PC overlap are less likely accepted / 与 PC 兴趣重叠少的论文不易被接受

**Research Track criteria:**
- Novelty, significance, clarity, relevance, correctness
- Quantified or insightful experiences in systems

**Operational Systems Track criteria / 运营系统赛道标准:**
- Real-world deployment at meaningful scale / 有意义规模的真实部署
- Lessons that deepen understanding of existing problems / 加深对现有问题的理解
- Disproves or strengthens existing assumptions / 证伪或加强现有假设
- Novel research ideas NOT required / 不要求新颖研究想法

**New in 2026 / 2026 新变化:**
- No author response period / 无作者回复期
- Conditional accept replaces revise-and-resubmit / "有条件接受"取代修改重投
- Target acceptance rate ≥20% / 目标接受率 ≥20%
- Reviewers encouraged to down-rank padded papers / 审稿人被鼓励降低注水论文评分

### NSDI 2027 Reviewer Perspective / NSDI 2027 审稿视角

**Prescreening (Introduction only) / 预筛选（仅 Introduction）:**

Reviewers check three criteria in the prescreening phase:
审稿人在预筛选阶段检查三个标准：

1. **Scope**: Subject within NSDI topics / 主题在 NSDI 范围内
2. **Accessibility**: Understandable by PC member / PC 成员可理解
3. **Track alignment**: Meets track-specific criteria / 符合赛道标准

**Track-specific review / 赛道特定评审:**

| Track | Key Criterion | 关键标准 |
|-------|---------------|----------|
| Research | Novel idea + compelling evaluation evidence | 新颖想法+有力评估证据 |
| Frontiers | Bold non-incremental idea (complete evaluation not required) | 大胆非增量想法（无需完整评估） |
| Operational | Deployment context, scale, lessons for community | 部署背景、规模、对社区的经验教训 |

**One-shot revision / 一次性修改重投:**
- Rejected papers may receive a list of issues to address / 被拒论文可能收到需解决的问题列表
- Authors can resubmit revision at next deadline / 作者可在下一个截稿日提交修改版
- Same reviewers review the revision (to extent possible) / 尽可能由同一审稿人评审

### ASPLOS 2027 Reviewer Perspective / ASPLOS 2027 审稿视角

**Rapid Review Round / 快速评审轮:**
- Reviewers read ONLY first 2 pages / 审稿人仅阅读前 2 页
- Evaluates: Does this advance Architecture, PL, or OS research? / 评估：是否推进体系结构/PL/OS 研究？
- Majority of submissions may not advance past this stage / 多数提交可能不会通过此阶段
- Similar to Nature/Science early screening model / 类似 Nature/Science 的早期筛选模式

**Full Review criteria / 全面评审标准:**
- Advances in core ASPLOS disciplines (not just using them) / 推进 ASPLOS 核心学科
- Quality of system design and implementation / 系统设计和实现质量
- Major Revision decision available / 可获得"重大修改"决定

### SOSP 2026 Reviewer Perspective / SOSP 2026 审稿视角

**Core evaluation / 核心评估:**
- Novelty, significance, interest, clarity, relevance, correctness
- Encourages groundbreaking work in significant new directions / 鼓励重大新方向的突破性工作
- Different evaluation criteria for new problems vs established areas / 新问题与成熟领域的评估标准不同

**Author Response / 作者回复:**
- Limited to: correcting factual errors + addressing reviewer questions / 仅限于纠正事实错误+回答问题
- NO new experiments or additional work / 不包含新实验或额外工作
- Keep under 500 words / 保持在 500 字以内

**Artifact Evaluation / Artifact 评估:**
- Optional but encouraged / 可选但被鼓励
- Cooperative process: authors can fix issues during evaluation / 合作过程，作者可在评估期间修复问题
- Register within days of acceptance notification / 接受通知后数天内注册

### ML vs Systems: Key Review Differences / ML 与系统会议评审关键差异

| Aspect | ML/AI Venues | Systems Venues | 差异说明 |
|--------|-------------|---------------|----------|
| **Page limit** | 7-9 pages | 12 pages | 系统论文更长，包含更多实现细节 |
| **Evaluation focus** | Benchmarks, ablations, metrics | End-to-end system performance, real workloads | 系统强调端到端性能和真实工作负载 |
| **Implementation** | Code often optional | Working system expected | 系统会议期望可工作的系统 |
| **Novelty** | New methods/insights | New system designs/approaches | 不同类型的创新 |
| **Reproducibility** | Checklist-based | Artifact evaluation (optional) | 不同的可重现性机制 |
| **Template** | Venue-specific `.sty` | USENIX `.sty` or ACM `acmart.cls` | 不同模板系统 |
| **Review process** | Single deadline | Often dual deadlines | 系统会议常有两次截稿 |

---

## Systems-Specific Common Concerns / 系统会议特有的常见关切

| Concern | How to Pre-empt | 如何预防 |
|---------|-----------------|----------|
| "Just an ML paper, not systems" | Emphasize system design, architecture decisions, deployment challenges | 强调系统设计、架构决策、部署挑战 |
| "Evaluation only on microbenchmarks" | Include end-to-end evaluation with real workloads | 包含真实工作负载的端到端评估 |
| "No working prototype" | Build and evaluate a real system, not just simulate | 构建并评估真实系统 |
| "Deployment not realistic" | Show real-world applicability, discuss practical constraints | 展示真实世界适用性 |
| "Not relevant to systems community" | Frame contributions in systems terms, cite systems papers | 用系统术语构建贡献，引用系统论文 |
| "ASPLOS: Not advancing arch/PL/OS" | Explicitly state how work advances core disciplines | 明确说明工作如何推进核心学科 |



### Following Daniel Dennett's Rules

Good reviewers follow these principles:

1. **Re-express the position fairly** - Show you understand the paper
2. **List agreements** - Acknowledge what works well
3. **List what you learned** - Credit the contribution
4. **Only then critique** - After establishing understanding

### Review Structure Best Practices

**Strong Review Structure:**
```
Summary (1 paragraph):
- What the paper does
- Main contribution claimed

Strengths (3-5 bullets):
- Specific positive aspects
- Why these matter

Weaknesses (3-5 bullets):
- Specific concerns
- Why these matter
- Suggestions for addressing

Questions (2-4 items):
- Clarifications needed
- Things that would change assessment

Minor Issues (optional):
- Typos, unclear sentences
- Formatting issues

Overall Assessment:
- Clear recommendation with reasoning
```

---

## Common Reviewer Concerns

### Technical Concerns

| Concern | How to Pre-empt |
|---------|-----------------|
| "Baselines too weak" | Use state-of-the-art baselines, cite recent work |
| "Missing ablations" | Include systematic ablation study |
| "No error bars" | Report std dev/error, multiple runs |
| "Hyperparameters not tuned" | Document tuning process, search ranges |
| "Claims not supported" | Ensure every claim has evidence |

### Novelty Concerns

| Concern | How to Pre-empt |
|---------|-----------------|
| "Incremental contribution" | Clearly articulate what's new vs prior work |
| "Similar to [paper X]" | Explicitly compare to X in Related Work |
| "Straightforward extension" | Highlight non-obvious aspects |

### Clarity Concerns

| Concern | How to Pre-empt |
|---------|-----------------|
| "Hard to follow" | Use clear structure, signposting |
| "Notation inconsistent" | Review all notation, create notation table |
| "Missing details" | Include reproducibility appendix |
| "Figures unclear" | Self-contained captions, proper sizing |

### Significance Concerns

| Concern | How to Pre-empt |
|---------|-----------------|
| "Limited impact" | Discuss broader implications |
| "Narrow evaluation" | Evaluate on multiple benchmarks |
| "Only works in restricted setting" | Acknowledge scope, explain why still valuable |

---

## How to Address Reviewer Feedback

### Rebuttal Best Practices

**Do:**
- Thank reviewers for their time
- Address each concern specifically
- Provide evidence (new experiments if possible)
- Be concise—reviewers are busy
- Acknowledge valid criticisms

**Don't:**
- Be defensive or dismissive
- Make promises you can't keep
- Ignore difficult criticisms
- Write excessively long rebuttals
- Argue about subjective assessments

### Rebuttal Template

```markdown
We thank the reviewers for their thoughtful feedback.

## Reviewer 1

**R1-Q1: [Quoted concern]**
[Direct response with evidence]

**R1-Q2: [Quoted concern]**
[Direct response with evidence]

## Reviewer 2

...

## Summary of Changes
If accepted, we will:
1. [Specific change]
2. [Specific change]
3. [Specific change]
```

### When to Accept Criticism

Some reviewer feedback should simply be accepted:
- Valid technical errors
- Missing important related work
- Unclear explanations
- Missing experimental details

Acknowledge these gracefully: "The reviewer is correct that... We will revise to..."

### When to Push Back

You can respectfully disagree when:
- Reviewer misunderstood the paper
- Requested experiments are out of scope
- Criticism is factually incorrect

Frame disagreements constructively: "We appreciate this perspective. However, [explanation]..."

---

## Pre-Submission Reviewer Simulation

Before submitting, ask yourself:

**Quality:**
- [ ] Would I trust these results if I saw them?
- [ ] Are all claims supported by evidence?
- [ ] Are baselines fair and recent?

**Clarity:**
- [ ] Can someone reproduce this from the paper?
- [ ] Is the writing clear to non-experts in this subfield?
- [ ] Are all terms and notation defined?

**Significance:**
- [ ] Why should the community care about this?
- [ ] What can people do with this work?
- [ ] Is the problem important?

**Originality:**
- [ ] What specifically is new here?
- [ ] How does this differ from closest related work?
- [ ] Is the contribution non-trivial?
