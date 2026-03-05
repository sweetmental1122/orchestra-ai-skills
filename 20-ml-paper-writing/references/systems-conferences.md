# Systems Conference Guide: OSDI, NSDI, ASPLOS, SOSP

# 系统会议指南：OSDI、NSDI、ASPLOS、SOSP

This reference provides comprehensive details for top systems conferences, including deadlines, formatting requirements, track descriptions, and submission strategies.

本参考文档提供顶级系统会议的详细信息，包括截稿日期、格式要求、赛道描述和投稿策略。

---

## Conference Overview / 会议概览

| Conference | Full Name | Page Limit | Template | Tracks |
|------------|-----------|------------|----------|--------|
| **OSDI 2026** | 20th USENIX Symposium on Operating Systems Design and Implementation | 12 pages (+2 camera-ready) | USENIX `usenix-2020-09.sty` | Research + Operational Systems |
| **NSDI 2027** | 24th USENIX Symposium on Networked Systems Design and Implementation | 12 pages | USENIX `usenix-2020-09.sty` | Research / Frontiers / Operational |
| **ASPLOS 2027** | ACM International Conference on Architectural Support for Programming Languages and Operating Systems | 12 pages (ACM) | ACM SIGPLAN `acmart.cls` | Single track, dual review cycles |
| **SOSP 2026** | 32nd ACM Symposium on Operating Systems Principles | 12 pages | ACM SIGPLAN `acmart.cls` | Single track |

> **OSDI 2026**: 第 20 届 USENIX 操作系统设计与实现研讨会。新增"运营系统"赛道，每位作者最多提交 8 篇论文，鼓励论文长度适中（不要注水至 12 页），目标接收率 ≥20%，取消作者回复期，用"有条件接收"取代修改重投。
>
> **NSDI 2027**: 第 24 届 USENIX 网络系统设计与实现研讨会。两轮截稿（Spring/Fall），新增"前沿赛道"（Frontiers Track），所有论文先经 Introduction 预筛选，被拒论文可获"一次性修改重投"机会。
>
> **ASPLOS 2027**: ACM 体系结构支持编程语言与操作系统国际会议。两轮截稿（April/September），新增快速评审轮（仅看前 2 页），明确评估论文对体系结构/PL/OS 核心领域的推进，每位作者每轮最多提交 4 篇。
>
> **SOSP 2026**: 第 32 届 ACM 操作系统原理研讨会。使用 ACM SIGPLAN 格式，支持可选的 Artifact Evaluation，双盲评审，鼓励突破性方向的研究。

---

## Deadlines & Key Dates / 截稿日期

### OSDI 2026 (Seattle, WA, USA | July 13–15, 2026)

| Milestone / 里程碑 | Date / 日期 |
|-----------|------|
| Abstract registration / 摘要注册 | December 4, 2025, 5:59 PM EST |
| Full paper submission / 全文提交 | December 11, 2025, 5:59 PM EST |
| Notification / 结果通知 | March 26, 2026 |
| Camera-ready / 终稿 | June 9, 2026 |

### NSDI 2027 (Providence, RI, USA | May 11–13, 2027)

**Spring Deadline / 春季截稿:**

| Milestone / 里程碑 | Date / 日期 |
|-----------|------|
| Titles and abstracts / 标题和摘要 | April 16, 2026, 11:59 PM EDT |
| Full paper / 全文 | April 23, 2026, 11:59 PM EDT |
| Notification / 通知 | July 23, 2026 |
| Camera-ready / 终稿 | October 20, 2026 |

**Fall Deadline / 秋季截稿:**

| Milestone / 里程碑 | Date / 日期 |
|-----------|------|
| Titles and abstracts / 标题和摘要 | September 10, 2026, 11:59 PM EDT |
| Full paper / 全文 | September 17, 2026, 11:59 PM EDT |
| Notification / 通知 | December 8, 2026 |
| Camera-ready / 终稿 | March 4, 2027 |

### ASPLOS 2027

**April Cycle / 4 月轮次:**

| Milestone / 里程碑 | Date / 日期 |
|-----------|------|
| Full paper submission / 全文提交 | April 15, 2026 (AoE) |
| Author response / 作者回复 | July 6–9, 2026 |
| Notification / 通知 | July 27, 2026 |

**September Cycle / 9 月轮次:**

| Milestone / 里程碑 | Date / 日期 |
|-----------|------|
| Full paper submission / 全文提交 | September 9, 2026 (AoE) |
| Author response / 作者回复 | December 1–4, 2026 |
| Notification / 通知 | December 21, 2026 |

### SOSP 2026 (September 30, 2026)

| Milestone / 里程碑 | Date / 日期 |
|-----------|------|
| Abstract registration / 摘要注册 | March 26, 2026 (AoE) |
| Full paper submission / 全文提交 | April 1, 2026 (AoE) |
| Notification / 通知 | July 3, 2026 |
| Camera-ready / 终稿 | August 28, 2026 |
| Workshops / 工作坊 | September 29, 2026 |
| Conference / 会议 | September 30, 2026 |

---

## Track Descriptions / 赛道说明

### OSDI 2026 Tracks

**Research Track**: Broad interest in operating systems design, implementation, analysis, evaluation, and deployment. Topics include:
- Operating systems, their interaction with hardware/software, and their role as building blocks for other systems
- Virtualization, including virtual machine monitors, hypervisors, and OS-level virtualization
- File and storage systems, distributed systems, cloud computing
- Systems for machine learning/AI, security and privacy, embedded/real-time systems

**Operational Systems Track** (NEW / 新增):
- Papers describing deployed and operational systems with valuable lessons
- Title must end with "(Operational Systems)" / 标题须以"(Operational Systems)"结尾
- Evaluation criteria focus on deployment insights rather than novelty
- 评估标准侧重于部署洞察而非新颖性

### NSDI 2027 Tracks

**Research Track**: Original research on networked systems design and implementation.

**Frontiers Track** (NEW / 新增):
- For ambitious, forward-looking ideas in networked systems
- May have less complete evaluation but must present compelling vision
- 面向网络系统领域的前瞻性研究，评估可能不完整但需有远见

**Operational Track**: Systems deployed at scale with operational insights.

### ASPLOS 2027 Review Process

**Rapid Review Round** (NEW / 新增):
- Reviewers read ONLY the first 2 pages to decide if paper merits full review
- First 2 pages must be self-contained: problem, approach, key results, contribution
- Papers failing rapid review receive brief feedback and are rejected
- 审稿人仅看前 2 页决定是否进入全面评审；前 2 页须自成体系

**Full Review Round**:
- Standard double-blind review process
- Author response period
- Major revision available (not just accept/reject)
- 标准双盲评审，支持大修

### SOSP 2026 Features

- **Artifact Evaluation** (optional but encouraged): Submit artifacts for reproducibility
- **Author Response**: 500-word limit, no new experiments allowed
- **可选 Artifact 评估**: 提交实验工件以证明可复现性
- **作者回复**: 限 500 字，不允许包含新实验

---

## Formatting Requirements / 格式要求

### USENIX Format (OSDI, NSDI)

```latex
% USENIX format setup
\documentclass[letterpaper,twocolumn,10pt]{article}
\usepackage{usenix-2020-09}

% Key specifications:
% - Paper size: US Letter (8.5" x 11")
% - Font: Times Roman, 10pt on 12pt leading
% - Text block: 7" x 9"
% - Two columns, 0.33" column separation
% - Page limit: 12 pages (excluding references)
```

**USENIX 格式要点**:
- US Letter 纸张 (8.5" x 11")
- Times Roman 字体，10pt，行距 12pt
- 文本区域 7" x 9"
- 双栏，栏间距 0.33"
- 正文限 12 页（不含参考文献）

### ACM SIGPLAN Format (ASPLOS, SOSP)

```latex
% ACM SIGPLAN format setup
\documentclass[sigplan,10pt]{acmart}

% For submission (hide copyright block):
\setcopyright{none}
\settopmatter{printfolios=true, printccs=false, printacmref=false}
\renewcommand\footnotetextcopyrightpermission[1]{}

% Key specifications:
% - Paper size: US Letter
% - Font: 10pt
% - Text block: 178mm x 229mm
% - Two columns
% - Page limit: 12 pages (excluding references)
```

**ACM SIGPLAN 格式要点**:
- US Letter 纸张
- 10pt 字体
- 文本区域 178mm x 229mm
- 双栏
- 正文限 12 页（不含参考文献）

---

## Submission Rules / 投稿规则

### OSDI 2026

- **Max submissions per author**: 8 papers / 每位作者最多 8 篇
- **No author response period** / 无作者回复期
- **Conditional accept** replaces major revision / "有条件接收"取代修改重投
- **Anonymization**: System name must differ from arXiv/talks / 系统名须匿名化，不同于 arXiv/演讲
- **Paper length**: Encouraged to be as short as needed (don't pad to 12 pages) / 鼓励适当长度
- **AI policy**: Generative AI tools allowed if disclosed; AI cannot be listed as author / AI 工具需披露，不得列为作者

### NSDI 2027

- **Prescreening via Introduction**: All papers first evaluated based on Introduction quality / 所有论文先经 Introduction 预筛选
- **One-shot revision**: Rejected papers may receive revision opportunity / 被拒论文可获一次修改重投机会
- **Dual deadlines**: Spring (April 2026) + Fall (September 2026) / 春季+秋季两轮
- **Track selection**: Must choose Research, Frontiers, or Operational at submission / 提交时须选择赛道

### ASPLOS 2027

- **Max submissions per author per cycle**: 4 papers / 每人每轮最多 4 篇
- **Rapid review**: Only first 2 pages reviewed initially / 快速评审仅看前 2 页
- **Dual cycles**: April + September / 4 月+9 月两轮
- **Resubmission note**: Required if previously submitted to ASPLOS / 若此前投过 ASPLOS 须注明
- **Must advance**: Architecture, Programming Languages, or Operating Systems research / 须推进 arch/PL/OS 研究

### SOSP 2026

- **Artifact Evaluation**: Optional but recommended / 可选但推荐
- **Author response**: 500-word limit, no new experiments / 限 500 字，禁止新实验
- **Anonymous system name**: Required, different from public versions / 须使用匿名系统名
- **Double-blind**: Authors must not be identifiable / 双盲评审

---

## Format Conversion: ML Venue → Systems Venue / 格式转换

When converting a paper from an ML venue to a systems venue, the changes go beyond template swapping:

从 ML 会议转投系统会议时，改动不仅限于模板替换：

| Aspect / 方面 | ML Venue | Systems Venue | Action / 操作 |
|-------|----------|---------------|--------|
| **Page limit** | 7-9 pages | 12 pages | Expand with system design details / 扩展系统设计细节 |
| **Evaluation** | Benchmarks, ablations | End-to-end + microbenchmarks | Add system-level evaluation / 添加系统级评估 |
| **Contribution framing** | Algorithmic novelty | System design + implementation | Reframe as systems contribution / 重新定位 |
| **Implementation** | Often secondary | Core contribution | Detail architecture, optimizations / 详述架构与优化 |
| **Deployment** | Rarely discussed | Highly valued (especially OSDI/NSDI) | Add deployment experience / 添加部署经验 |

### Specific Conversion Paths / 具体转换路径

| From → To | Key Adjustments |
|-----------|-----------------|
| ML → OSDI | USENIX template; reframe for systems; add design/implementation; emphasize deployment / 切换 USENIX 模板，重定位为系统贡献 |
| ML → NSDI | USENIX format; emphasize networked systems; choose track / 强调网络系统方面，选择赛道 |
| ML → ASPLOS | ACM SIGPLAN; self-contained first 2 pages (rapid review); frame for arch/PL/OS / 确保前 2 页自成体系 |
| ML → SOSP | ACM SIGPLAN; emphasize OS principles; system design/evaluation / 强调操作系统原理 |
| OSDI ↔ SOSP | USENIX ↔ ACM SIGPLAN template; similar page limits / 模板格式不同，页数相似 |
| OSDI ↔ NSDI | Same USENIX format; adjust scope (general vs networked) / 调整定位 |

---

## Systems Paper Structure / 系统论文结构

A typical systems paper follows this structure (differs from ML papers):

系统论文的典型结构（与 ML 论文有所不同）：

```text
1. Introduction          - Problem, approach, key results (CRITICAL for NSDI prescreening / ASPLOS rapid review)
2. Background/Motivation - System context, why existing solutions fail
3. Design                - System architecture, key design decisions
4. Implementation        - Implementation details, optimizations, engineering challenges
5. Evaluation            - End-to-end performance + microbenchmarks + scalability
6. Discussion            - Limitations, deployment lessons (optional but valued at SOSP)
7. Related Work          - Organized by approach, not chronologically
8. Conclusion            - Summary of contributions and impact
```

**Key differences from ML papers / 与 ML 论文的关键差异**:
- **Design section** replaces Methods: Focus on architecture and trade-offs / 设计节替代方法节
- **Implementation section** is a core contribution, not an afterthought / 实现节是核心贡献
- **Evaluation** includes both macro (end-to-end) and micro benchmarks / 评估含端到端和微基准测试
- **Discussion** section is common (especially SOSP) / 讨论节较常见

---

## Official CFP Links / 官方 CFP 链接

- **OSDI 2026**: <https://www.usenix.org/conference/osdi26/call-for-papers>
- **NSDI 2027**: <https://www.usenix.org/conference/nsdi27/call-for-papers>
- **ASPLOS 2027**: <https://www.asplos-conference.org/asplos2026/call-for-papers-asplos27/>
- **SOSP 2026**: <https://sigops.org/s/conferences/sosp/2026/cfp.html>
- **USENIX LaTeX Template**: <https://www.usenix.org/conferences/author-resources/paper-templates>
- **ACM SIGPLAN Template**: <https://www.acm.org/publications/proceedings-template>
