# High-Quality Skill Creation Guide

**Last Updated**: November 6, 2025
**Status**: Required reading for all skill creators

---

## 🎯 The Problem We Solved

### What Went Wrong (November 2025)

We initially created 16 skills using automated scraping:
- ❌ **9 GitHub-scraped skills** (54-68 lines each) - DELETED for being useless
  - Just linked to README/CHANGELOG/GitHub issues
  - No actual guidance or workflows
  - Not helpful for AI agents or humans
  - **Total waste**

- ⚠️ **5 Doc-scraped skills** (70-151 lines) - KEPT but need improvement
  - Better than GitHub scrapes, but still basic
  - Some real content, but lacking depth

- ✅ **1 Hand-crafted skill** (569 lines) - GOLD STANDARD
  - GRPO-RL-Training: Complete implementation guide
  - Step-by-step workflows with code
  - Troubleshooting, pitfalls, performance tips
  - **This is what ALL skills should be**

### Lessons Learned

1. **Automated scraping doesn't work** for creating useful skills
2. **GitHub README + Issues ≠ Skill** (it's just documentation links)
3. **Quality > Quantity**: 1 great skill > 10 mediocre ones
4. **Skills need expert curation**, not automation

---

## ✅ The New Approach

### Phase 1: Research & Analysis (Human + AI)

**Goal**: Deeply understand the tool/framework before writing

1. **Read official documentation thoroughly**
   - Not just scraping - actually reading and understanding
   - Focus on: tutorials, quickstart, common patterns
   - Identify what users struggle with (check issues, forums, Stack Overflow)

2. **Analyze real-world usage**
   - Look for blog posts, tutorials, video guides
   - Check GitHub issues for common problems
   - Find production codebases using the tool

3. **Identify key concepts**
   - What's the core value proposition?
   - When should you use it vs alternatives?
   - What are the common gotchas?

**Output**: Research notes (50-100 lines) covering:
- Core concepts
- Common use cases
- Known pitfalls
- Best practices from community

### Phase 2: Structure Planning

**Goal**: Outline the skill before writing

Create an outline with:
1. **When to Use This Skill** (10-20 lines)
   - Specific use cases
   - When NOT to use (equally important)

2. **Core Concepts** (30-50 lines)
   - 3-5 key ideas users must understand
   - Brief explanations with examples

3. **Implementation Workflow** (100-200 lines)
   - Step-by-step guide with code
   - At least 3-5 complete examples
   - Cover beginner → intermediate → advanced

4. **Troubleshooting** (30-50 lines)
   - 5-10 common issues with solutions
   - Based on real GitHub issues / Stack Overflow

5. **Best Practices** (20-40 lines)
   - Production tips
   - Performance optimization
   - Common pitfalls

**Target**: 300-600 lines total (like GRPO skill)

### Phase 3: Writing with Claude

**Recommended Process**:

```markdown
# Step 1: Provide Research to Claude
"I want to create a skill for [Tool]. Here's my research:

[Paste research notes]

Please help me create a comprehensive SKILL.md following the structure in SKILL_TEMPLATE.md"

# Step 2: Iterate on Structure
"The core concepts section needs more depth. Add examples for [concept]"

# Step 3: Add Code Examples
"Add a complete working example for [use case] with step-by-step comments"

# Step 4: Add Troubleshooting
"Based on these GitHub issues [links], create troubleshooting entries"

# Step 5: Review and Refine
"Review the full skill. Where can we add more practical guidance?"
```

### Phase 4: Quality Validation

**Checklist before submitting**:
- [ ] SKILL.md is 100+ lines (ideally 300+)
- [ ] Has 5+ complete code examples with comments
- [ ] Includes "When to use" AND "When NOT to use"
- [ ] Has troubleshooting section (5+ issues)
- [ ] Includes performance tips / best practices
- [ ] Code examples are tested (if possible)
- [ ] No "see the docs" cop-outs
- [ ] Actually useful to someone implementing the tool

---

## 🎓 Skill Quality Tiers

### ⭐⭐⭐⭐⭐ Gold Standard (Target)
**Example**: `06-post-training/grpo-rl-training/` (569 lines)

- 300-600 lines of expert guidance
- 10+ code examples with detailed explanations
- Complete implementation workflow (setup → config → train → debug → deploy)
- Troubleshooting guide with solutions
- Performance optimization tips
- Common pitfalls with workarounds
- Best practices checklist
- References to official docs (not just links)

### ⭐⭐⭐⭐ Excellent (Acceptable)
**Example**: `03-fine-tuning/axolotl/` (151 lines)

- 150-300 lines of useful content
- 5+ code examples
- Step-by-step workflow
- Some troubleshooting
- Best practices section
- When to use guidance

### ⭐⭐⭐ Good (Needs Improvement)
**Example**: `08-distributed-training/deepspeed/` (132 lines)

- 100-150 lines
- 3-5 code examples
- Basic workflow
- Limited troubleshooting
- Some best practices
- **Should be upgraded to Excellent**

### ⭐⭐ Poor (Not Acceptable)
**Example**: Old GitHub-scraped skills (54-68 lines) - DELETED

- 50-100 lines
- Generic template
- Few real examples
- No troubleshooting
- Just links to docs
- **Will be rejected**

### ⭐ Terrible (Immediate Rejection)
- Under 50 lines
- No code examples
- "See the docs"
- Copy-pasted README

---

## 🛠️ Tools and Resources

### For Research

**Official Documentation**:
- Primary source for concepts and APIs
- Focus on tutorials, not just API reference

**GitHub Issues**:
- Filter by label: "bug", "help wanted", "question"
- Look for frequently asked questions
- Identify common pain points

**Stack Overflow**:
- Search for `[tool-name]` questions
- Sort by votes to find common issues
- Note recurring themes

**Community Resources**:
- Blog posts, tutorials, YouTube videos
- Production codebases on GitHub
- Discord/Slack discussions (if accessible)

### For Writing

**Claude Code** (this tool):
- Use for drafting skill content
- Iterate on structure and examples
- Review and refine

**Skill Seeker MCP** (if useful):
- Can fetch documentation for analysis
- NOT for auto-generating skills
- Use as research aid only

### For Validation

**Manual Review**:
- Read the skill as a first-time user
- Would this help you implement the tool?
- Are examples complete and runnable?

**Peer Review**:
- Have another developer review
- Ask: "Is this useful? What's missing?"

---

## 📋 Skill Creation Checklist

### Before Starting
- [ ] Read official documentation (minimum 1 hour)
- [ ] Analyze 10+ GitHub issues for common problems
- [ ] Find 3-5 real-world usage examples
- [ ] Create research notes document

### During Creation
- [ ] Follow SKILL_TEMPLATE.md structure
- [ ] Write 300+ lines of content
- [ ] Include 5+ complete code examples
- [ ] Add troubleshooting section (5+ issues)
- [ ] Include performance tips
- [ ] Add "when NOT to use" guidance

### Before Submitting
- [ ] Validate all code examples work
- [ ] Check for typos and formatting
- [ ] Ensure 300+ lines of useful content
- [ ] Compare to GRPO skill quality
- [ ] Remove any "see the docs" cop-outs
- [ ] Test SKILL.md readability

---

## 🚫 Anti-Patterns to Avoid

### ❌ The README Linker
```markdown
## Usage

See README.md for complete usage instructions.
```
**Why it's bad**: Not a skill, just a pointer. WRITE THE ACTUAL GUIDANCE.

### ❌ The Issue Dumper
```markdown
## Known Issues

- Issue #123: Build fails on MacOS
- Issue #456: OOM error with large datasets
- Issue #789: Incompatible with Python 3.12
```
**Why it's bad**: No context, no solutions. EXPLAIN THE PROBLEM AND HOW TO FIX IT.

### ❌ The API Listing
```markdown
## Functions

- `model.train()` - Trains the model
- `model.eval()` - Evaluates the model
- `model.save()` - Saves the model
```
**Why it's bad**: Just lists APIs. SHOW HOW TO USE THEM IN REAL WORKFLOWS.

### ❌ The Documentation Scraper
```markdown
Copied from official docs:
[5000 lines of scraped content]
```
**Why it's bad**: Not curated, not organized. SYNTHESIZE AND ADD VALUE.

---

## ✅ Good Patterns to Follow

### ✅ The Problem Solver
```markdown
## Common Issue: OOM During Training

**Problem**: Training crashes with "CUDA out of memory" error.

**Root Cause**: Batch size too large or model doesn't fit in GPU.

**Solution**:
1. Reduce batch size:
   `training_args.per_device_train_batch_size = 1`
2. Enable gradient checkpointing:
   `model.gradient_checkpointing_enable()`
3. Use gradient accumulation:
   `training_args.gradient_accumulation_steps = 4`

**Example**:
\`\`\`python
from transformers import TrainingArguments

args = TrainingArguments(
    per_device_train_batch_size=1,
    gradient_accumulation_steps=4,  # Effective batch = 4
    fp16=True,  # Use mixed precision
)
\`\`\`
```

### ✅ The Workflow Guide
```markdown
## Step 1: Dataset Preparation

Prepare your data in the correct format:

\`\`\`python
from datasets import Dataset

# Raw data
data = [
    {"text": "Example 1", "label": 0},
    {"text": "Example 2", "label": 1}
]

# Convert to Dataset
dataset = Dataset.from_list(data)

# Split into train/test
dataset = dataset.train_test_split(test_size=0.2)
\`\`\`

**Pro Tip**: Always validate your data before training:
\`\`\`python
print(dataset['train'][0])  # Check first example
assert all(len(x['text']) > 0 for x in dataset['train'])  # Validate
\`\`\`
```

### ✅ The Comparison Guide
```markdown
## When to Use This vs Alternatives

**Use [Tool] when**:
- You need [specific capability]
- Your dataset is [size/format]
- You have [resource constraints]

**Use [Alternative] instead when**:
- You need [different capability]
- You have [different constraints]

**Example**: For fine-tuning Llama 3:
- **Axolotl**: Best for YAML-based config, multi-GPU setups
- **Unsloth**: Best for single GPU, QLoRA, speed optimization
- **TRL**: Best for RLHF, custom reward functions
```

---

## 📈 Success Metrics

**A high-quality skill should enable someone to**:
1. ✅ Understand when to use the tool (5 minutes)
2. ✅ Set up and run their first example (15 minutes)
3. ✅ Implement a real use case (30-60 minutes)
4. ✅ Troubleshoot common issues (without Googling)
5. ✅ Follow best practices (avoid common pitfalls)

**If your skill can't do this, it's not ready.**

---

## 🎯 Next Steps

1. **Read this guide thoroughly**
2. **Study the GRPO skill** (`06-post-training/grpo-rl-training/SKILL.md`)
3. **Choose a tool to document** (see PROJECT_ANALYSIS.md for priorities)
4. **Do 1-2 hours of research** before writing
5. **Write iteratively with Claude**
6. **Validate quality** (300+ lines, 5+ examples, troubleshooting)
7. **Submit for review**

---

**Remember**: One excellent skill is worth more than ten mediocre ones. Take the time to do it right.
