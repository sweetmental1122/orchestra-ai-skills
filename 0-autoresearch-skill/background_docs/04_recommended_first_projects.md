# Recommended First Projects for Autoresearch Skill

These are ranked by tractability × novelty × connection to Orchestra's existing work.
Each can be started within a week with the right setup.

---

## Project 1: ETF Crystallization Study ⭐ RECOMMENDED START

**Why first:** Zero new infrastructure. Analysis runs on CPU. Pythia checkpoints are free.
Directly connects NeurIPS 2025 Best Paper Runner-Up to ICML 2025 paper.
Produces a finding with a clear viral narrative.

**What to build:**
1. A Pythia checkpoint loader that computes `etf_var` per checkpoint
2. A LoRA fine-tuning harness (10 min runs, fixed eval)
3. The correlation plot

**Expected timeline:** 1 week to first result, 3 weeks to paper-ready finding

**The autoresearch loop:**
- Inner: sweep checkpoints × LoRA ranks × model sizes
- Outer: agent identifies where correlation breaks down, proposes explanatory variables

**Risk:** ETF crystallization and fine-tune performance might not correlate. That's still publishable ("ETF structure does NOT predict fine-tuning difficulty; here's what does instead").

---

## Project 2: RL Algorithm Brain Scan ⭐ HIGH IMPACT

**Why second:** Hottest area in ML right now (DeepSeek-R1, GRPO). Zero competition.
SAELens + TransformerLens + trl make the tooling stack complete.
Results are visually dramatic (layer-by-layer weight delta spectra).

**What to build:**
1. Three training scripts: PPO, GRPO, DPO on GSM8K with Qwen2.5-1.5B
2. Weight delta analyzer (SVD per layer, SAE feature Jaccard)
3. Visualization pipeline (heatmaps of which layers changed how)

**Expected timeline:** 3 days to first comparison, 1 week to interesting finding

**The autoresearch loop:**
- Inner: vary RL algorithm, task difficulty, number of training steps
- Outer: identify which layer/circuit patterns explain behavioral differences

**Key questions to answer:**
- Does GRPO's length bias correspond to specific MLP layers activating more?
- Does DPO's "only modifies last layers" claim hold for different base models?
- What's the minimum circuit change that produces the "aha moment" in reasoning?

---

## Project 3: SDPO + Knowledge Acquisition ⭐ MEGa CONNECTION

**Why third:** Directly extends MEGa's thesis. The SDFT paper explicitly names knowledge 
acquisition as the unsolved problem. This is the natural "MEGa meets self-distillation" paper.

**What to build:**
1. SDFT baseline (already has code: github.com/idanshen/SDFT)
2. SDPO with document-as-feedback modification (one forward pass change)
3. Wikipedia 2025 disaster articles dataset (SDFT paper provides this)

**Expected timeline:** 1 week to baseline, 2 weeks to full comparison

**The autoresearch loop:**
- Inner: vary document retrieval quality, self-teacher conditioning, LoRA rank
- Outer: characterize which types of knowledge inject successfully vs fail

**The MEGa angle:** Each domain gets its own LoRA adapter (knowledge store).
SDFT's on-policy gradient keeps shared weights from forgetting behavior.
MEGa routing activates the right knowledge adapter at inference.

---

## Project 4: Grokking as Memory Consolidation 🚀 FASTEST/VIRAL

**Why fourth:** 5-15 minute experiment cycles. Zero infrastructure. Immediately
understandable to anyone (neural networks dream to learn). The neuroscience crossover
narrative is inherently viral.

**What to build:**
1. Modular arithmetic training loop with grokking detection (progress measure from Nanda et al.)
2. "Sleep phase" insertion: elevated weight decay + oscillatory LR schedule
3. Grokfast baseline for comparison

**Expected timeline:** 2 days to first result

**Key questions:**
- Do "sleep phases" accelerate grokking by >2× vs standard training?
- Does the spectral content of gradients during sleep phases match Grokfast's filtered component?
- Does the memory consolidation analogy hold quantitatively (complexity curves match CLS theory)?

---

## What NOT to Start With

**Skip for now:**
- SAE architecture innovations (SAEBench already comprehensive; hard to stand out)
- Model merging mechanistic study (slow eval cycles)
- Prompt sensitivity atlas (interesting but not clear paper contribution)
- Scaling laws with SLDAgent (requires SLDAgent setup; best as Project 5 after others)

---

## Infrastructure the Team Needs

### For all projects:
- HuggingFace account with Pythia/Qwen access (free)
- `transformers`, `torch`, `trl`, `peft` base stack

### For Projects 1-2 (interpretability):
- `TransformerLens` (pip install transformer-lens)
- `SAELens` (pip install sae-lens)
- Gemma Scope 2 pretrained SAEs (HuggingFace)

### For Projects 3 (SDFT/SDPO):
- SDFT codebase: github.com/idanshen/SDFT
- SDPO codebase: github.com/lasgroup/SDPO (built on verl)
- Reasoning Gym: pip install reasoning-gym (for verifiable task environments)

### For Project 4 (grokking):
- Minimal — just torch + matplotlib
- Grokfast: pip install grokfast

---

## How to Know If the Autoresearch Skill Is Working

**Good signs:**
- Agent proposes hypotheses with mechanistic reasoning (not just "try X")
- Agent's `findings.md` builds a coherent narrative across experiments
- Agent notices when it's wrong and updates its model
- After 30 experiments, a human can read `findings.md` and understand what was learned

**Bad signs:**
- Agent only does hyperparameter sweeps without interpretation
- Agent's hypotheses are generic ("try higher LR")
- `findings.md` is a list of results without explanation
- Agent never updates its priors based on failed experiments

**The test:** After the autoresearch run, give the `findings.md` to a researcher not involved.
Can they write the abstract of a paper based on it? If yes: success. If no: the outer loop isn't working.

---

## Connection to Orchestra's Broader Mission

Each of these projects generates **expert research decision trajectories** — the exact data
Orchestra is designed to capture and curate. The autoresearch skill simultaneously:

1. **Produces research outputs** (papers, findings, code)
2. **Generates training data** for future AI research agents
3. **Demonstrates Orchestra's value proposition**: AI-native research platform that captures
   not just results but the reasoning behind each experimental decision

The most valuable data from these projects isn't the final results — it's the moments where
the agent was wrong, updated its model, and made a better decision. That's the data that
trains the next generation of research agents.
