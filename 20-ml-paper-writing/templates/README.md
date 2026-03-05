# LaTeX Templates for ML/AI & Systems Conferences
# ML/AI 与系统会议 LaTeX 模板

This directory contains official LaTeX templates for major machine learning, AI, and systems conferences.
本目录包含主要机器学习、AI 和系统会议的官方 LaTeX 模板。

---

## Compiling LaTeX to PDF

### Option 1: VS Code with LaTeX Workshop (Recommended)

**Setup:**
1. Install [TeX Live](https://www.tug.org/texlive/) (full distribution recommended)
   - macOS: `brew install --cask mactex`
   - Ubuntu: `sudo apt install texlive-full`
   - Windows: Download from [tug.org/texlive](https://www.tug.org/texlive/)

2. Install VS Code extension: **LaTeX Workshop** by James Yu
   - Open VS Code → Extensions (Cmd/Ctrl+Shift+X) → Search "LaTeX Workshop" → Install

**Usage:**
- Open any `.tex` file in VS Code
- Save the file (Cmd/Ctrl+S) → Auto-compiles to PDF
- Click the green play button or use `Cmd/Ctrl+Alt+B` to build
- View PDF: Click "View LaTeX PDF" icon or `Cmd/Ctrl+Alt+V`
- Side-by-side view: `Cmd/Ctrl+Alt+V` then drag tab

**Settings** (add to VS Code `settings.json`):
```json
{
  "latex-workshop.latex.autoBuild.run": "onSave",
  "latex-workshop.view.pdf.viewer": "tab",
  "latex-workshop.latex.recipes": [
    {
      "name": "pdflatex → bibtex → pdflatex × 2",
      "tools": ["pdflatex", "bibtex", "pdflatex", "pdflatex"]
    }
  ]
}
```

### Option 2: Command Line

```bash
# Basic compilation
pdflatex main.tex

# With bibliography (full workflow)
pdflatex main.tex
bibtex main
pdflatex main.tex
pdflatex main.tex

# Using latexmk (handles dependencies automatically)
latexmk -pdf main.tex

# Continuous compilation (watches for changes)
latexmk -pdf -pvc main.tex
```

### Option 3: Overleaf (Online)

1. Go to [overleaf.com](https://www.overleaf.com)
2. New Project → Upload Project → Upload the template folder as ZIP
3. Edit online with real-time PDF preview
4. No local installation needed

### Option 4: Other IDEs

| IDE | Extension/Plugin | Notes |
|-----|------------------|-------|
| **Cursor** | LaTeX Workshop | Same as VS Code |
| **Sublime Text** | LaTeXTools | Popular, well-maintained |
| **Vim/Neovim** | VimTeX | Powerful, keyboard-driven |
| **Emacs** | AUCTeX | Comprehensive LaTeX environment |
| **TeXstudio** | Built-in | Dedicated LaTeX IDE |
| **Texmaker** | Built-in | Cross-platform LaTeX editor |

### Troubleshooting Compilation

**"File not found" errors:**
```bash
# Ensure you're in the template directory
cd templates/icml2026
pdflatex example_paper.tex
```

**Bibliography not appearing:**
```bash
# Run bibtex after first pdflatex
pdflatex main.tex
bibtex main        # Uses main.aux to find citations
pdflatex main.tex  # Incorporates bibliography
pdflatex main.tex  # Resolves references
```

**Missing packages:**
```bash
# TeX Live package manager
tlmgr install <package-name>

# Or install full distribution to avoid this
```

---

## Available Templates / 可用模板

### ML/AI Conferences / ML/AI 会议

| Conference | Directory | Year | Source |
|------------|-----------|------|--------|
| ICML | `icml2026/` | 2026 | [Official ICML](https://icml.cc/Conferences/2026/AuthorInstructions) |
| ICLR | `iclr2026/` | 2026 | [Official GitHub](https://github.com/ICLR/Master-Template) |
| NeurIPS | `neurips2025/` | 2025 | Community template |
| ACL | `acl/` | 2025+ | [Official ACL](https://github.com/acl-org/acl-style-files) |
| AAAI | `aaai2026/` | 2026 | [AAAI Author Kit](https://aaai.org/authorkit26/) |
| COLM | `colm2025/` | 2025 | [Official COLM](https://github.com/COLM-org/Template) |

### Systems Conferences / 系统会议

| Conference | Directory | Year | Template Type | Source |
|------------|-----------|------|---------------|--------|
| OSDI | `osdi2026/` | 2026 | USENIX | [OSDI '26 CFP](https://www.usenix.org/conference/osdi26/call-for-papers) |
| NSDI | `nsdi2027/` | 2027 | USENIX | [NSDI '27 CFP](https://www.usenix.org/conference/nsdi27/call-for-papers) |
| ASPLOS | `asplos2027/` | 2027 | ACM SIGPLAN | [ASPLOS '27 CFP](https://www.asplos-conference.org/asplos2026/call-for-papers-asplos27/) |
| SOSP | `sosp2026/` | 2026 | ACM SIGPLAN | [SOSP '26 CFP](https://sigops.org/s/conferences/sosp/2026/cfp.html) |

## Usage

### ICML 2026

```latex
\documentclass{article}
\usepackage{icml2026}  % For submission
% \usepackage[accepted]{icml2026}  % For camera-ready

\begin{document}
% Your paper content
\end{document}
```

Key files:
- `icml2026.sty` - Style file
- `icml2026.bst` - Bibliography style
- `example_paper.tex` - Example document

### ICLR 2026

```latex
\documentclass{article}
\usepackage[submission]{iclr2026_conference}  % For submission
% \usepackage[final]{iclr2026_conference}  % For camera-ready

\begin{document}
% Your paper content
\end{document}
```

Key files:
- `iclr2026_conference.sty` - Style file
- `iclr2026_conference.bst` - Bibliography style
- `iclr2026_conference.tex` - Example document

### ACL Venues (ACL, EMNLP, NAACL)

```latex
\documentclass[11pt]{article}
\usepackage[review]{acl}  % For review
% \usepackage{acl}  % For camera-ready

\begin{document}
% Your paper content
\end{document}
```

Key files:
- `acl.sty` - Style file
- `acl_natbib.bst` - Bibliography style
- `acl_latex.tex` - Example document

### AAAI 2026

```latex
\documentclass[letterpaper]{article}
\usepackage[submission]{aaai2026}  % For submission
% \usepackage{aaai2026}  % For camera-ready

\begin{document}
% Your paper content
\end{document}
```

Key files:
- `aaai2026.sty` - Style file
- `aaai2026.bst` - Bibliography style

### COLM 2025

```latex
\documentclass{article}
\usepackage[submission]{colm2025_conference}  % For submission
% \usepackage[final]{colm2025_conference}  % For camera-ready

\begin{document}
% Your paper content
\end{document}
```

Key files:
- `colm2025_conference.sty` - Style file
- `colm2025_conference.bst` - Bibliography style

---

### OSDI 2026 / NSDI 2027 (USENIX Format / USENIX 格式)

OSDI and NSDI both use the USENIX LaTeX style. The format requires 12 pages max (excluding references), two-column, 10pt on 12pt leading, Times Roman font.

OSDI 和 NSDI 均使用 USENIX LaTeX 样式。格式要求最多 12 页（不含参考文献），双栏，10pt 字体，Times Roman。

```latex
\documentclass[letterpaper,twocolumn,10pt]{article}
\usepackage{usenix-2020-09}  % USENIX style file

\begin{document}
\title{Your Paper Title}

\author{Paper \#XXX}  % Anonymized for submission / 提交时匿名化

\maketitle

\begin{abstract}
Your abstract here.
\end{abstract}

% Your paper content

{\footnotesize \bibliographystyle{acm}
\bibliography{references}}

\end{document}
```

Key files:
- `usenix-2020-09.sty` - USENIX style file
- `main.tex` - Example document

**OSDI 2026 Specific / OSDI 2026 特殊要求:**
- Submission: ≤12 pages; Camera-ready: ≤14 pages
- Two tracks: Research and Operational Systems / 两个赛道：研究 和 运营系统
- Operational Systems track: title must end with "(Operational Systems)" / 运营系统赛道标题须以"(Operational Systems)"结尾
- Max 8 submissions per author / 每位作者最多 8 篇提交

**NSDI 2027 Specific / NSDI 2027 特殊要求:**
- Same USENIX format, ≤12 pages
- Three tracks: Research, Frontiers, Operational Systems / 三个赛道
- Prescreening based on Introduction / 基于 Introduction 的预筛选
- Spring and Fall deadlines / 春季和秋季两次截稿

### ASPLOS 2027 (ACM SIGPLAN Format / ACM SIGPLAN 格式)

ASPLOS uses the ACM `acmart` document class with `sigplan` option. 12 pages max (excluding references), two-column, 10pt.

ASPLOS 使用 ACM `acmart` 文档类，`sigplan` 选项。最多 12 页（不含参考文献），双栏，10pt。

```latex
\documentclass[sigplan,10pt]{acmart}

\renewcommand\footnotetextcopyrightpermission[1]{}
\settopmatter{printfolios=true}

\begin{document}
\title{Your Paper Title}

\author{Paper \#XXX}  % Anonymized for submission / 提交时匿名化
\affiliation{}

\begin{abstract}
Your abstract here.
\end{abstract}

\maketitle
\pagestyle{plain}

% Your paper content

\bibliographystyle{ACM-Reference-Format}
\bibliography{references}

\end{document}
```

Key files:
- `acmart.cls` - ACM document class (download from [ACM](https://www.acm.org/publications/proceedings-template))
- `ACM-Reference-Format.bst` - Bibliography style
- `main.tex` - Example document

**ASPLOS 2027 Specific / ASPLOS 2027 特殊要求:**
- Rapid review round: reviewers only read first 2 pages / 快速评审轮：审稿人仅看前 2 页
- **First 2 pages must be self-contained** / **前 2 页必须自成体系**
- Two cycles: April and September / 两轮截稿：4 月和 9 月
- Max 4 submissions per author per cycle / 每人每轮最多 4 篇
- Major Revision decision available / 支持"重大修改"决定

### SOSP 2026 (ACM SIGPLAN Format / ACM SIGPLAN 格式)

SOSP uses the same ACM SIGPLAN format as ASPLOS. 12 pages max, A4 or US letter, 178×229mm text block.

SOSP 使用与 ASPLOS 相同的 ACM SIGPLAN 格式。最多 12 页，A4 或 US letter，178×229mm 文本区域。

```latex
\documentclass[sigplan,10pt]{acmart}

\renewcommand\footnotetextcopyrightpermission[1]{}
\settopmatter{printfolios=true}

\begin{document}
\title{Your Paper Title}

\author{Paper \#XXX}  % Anonymized / 匿名化
\affiliation{}

\begin{abstract}
Your abstract here.
\end{abstract}

\maketitle
\pagestyle{plain}

% Your paper content

\bibliographystyle{ACM-Reference-Format}
\bibliography{references}

\end{document}
```

**SOSP 2026 Specific / SOSP 2026 特殊要求:**
- Optional Artifact Evaluation / 可选的 Artifact 评估
- Author response period / 作者回复期
- Supplementary material allowed (not required to read) / 允许补充材料（审稿人不要求阅读）
- Anonymized system name required / 需要匿名化系统名称

## Page Limits Summary / 页数限制概览

### ML/AI Conferences / ML/AI 会议

| Conference | Submission | Camera-Ready | Notes |
|------------|-----------|--------------|-------|
| ICML 2026 | 8 pages | 9 pages | +unlimited refs/appendix |
| ICLR 2026 | 9 pages | 10 pages | +unlimited refs/appendix |
| NeurIPS 2025 | 9 pages | 9 pages | +checklist outside limit |
| ACL 2025 | 8 pages (long) | varies | +unlimited refs/appendix |
| AAAI 2026 | 7 pages | 8 pages | +unlimited refs/appendix |
| COLM 2025 | 9 pages | 10 pages | +unlimited refs/appendix |

### Systems Conferences / 系统会议

| Conference | Submission | Camera-Ready | Format | Notes |
|------------|-----------|--------------|--------|-------|
| OSDI 2026 | 12 pages | 14 pages | USENIX (8.5×11", 10pt, two-col) | +unlimited refs; encourages concise papers 鼓励精练 |
| NSDI 2027 | 12 pages | varies | USENIX (same as OSDI) | +unlimited refs/appendix |
| ASPLOS 2027 | 12 pages | varies | ACM SIGPLAN (10pt, two-col) | +unlimited refs |
| SOSP 2026 | 12 pages | varies | ACM SIGPLAN (10pt, two-col, 7×9" block) | +unlimited refs; supplementary allowed |

## Common Issues

### Compilation Errors

1. **Missing packages**: Install full TeX distribution (TeX Live Full or MikTeX)
2. **Bibliography errors**: Use the provided `.bst` file with `\bibliographystyle{}`
3. **Font warnings**: Install `cm-super` or use `\usepackage{lmodern}`

### Anonymization

For submission, ensure:
- No author names in `\author{}`
- No acknowledgments section
- No grant numbers
- Use anonymous repositories
- Cite own work in third person

### Common LaTeX Packages

```latex
% Recommended packages (check compatibility with venue style)
\usepackage{amsmath,amsthm,amssymb}  % Math
\usepackage{graphicx}                 % Figures
\usepackage{booktabs}                 % Tables
\usepackage{hyperref}                 % Links
\usepackage{algorithm,algorithmic}    % Algorithms
\usepackage{natbib}                   % Citations
```

## Updating Templates / 更新模板

Templates are updated annually. Check official sources before each submission:
模板每年更新。提交前请查看官方来源：

**ML/AI:**
- ICML: https://icml.cc/
- ICLR: https://iclr.cc/
- NeurIPS: https://neurips.cc/
- ACL: https://github.com/acl-org/acl-style-files
- AAAI: https://aaai.org/
- COLM: https://colmweb.org/

**Systems / 系统会议:**
- OSDI: https://www.usenix.org/conference/osdi26/call-for-papers
- NSDI: https://www.usenix.org/conference/nsdi27/call-for-papers
- ASPLOS: https://www.asplos-conference.org/asplos2026/call-for-papers-asplos27/
- SOSP: https://sigops.org/s/conferences/sosp/2026/cfp.html
- USENIX Templates: https://www.usenix.org/conferences/author-resources/paper-templates
- ACM Templates: https://www.acm.org/publications/proceedings-template
