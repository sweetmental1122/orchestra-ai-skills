# Autoresearch Skill: Overview, Motivation, and Design

## What We're Building

An **autoresearch skill** for AI coding agents (Claude Code, OpenClaw, etc.) that enables autonomous ML/AI research — generating genuinely novel findings, running experiments overnight, and synthesizing results into publishable research. This goes beyond Karpathy's `autoresearch` (metric optimization on a fixed codebase) toward open-ended scientific discovery.

---

## Motivation: What Karpathy Proved and What's Next

In March 2026, Karpathy open-sourced `autoresearch` — a 630-line tool where an AI agent iterates on a small transformer training script using **validation loss as the sole proxy metric**. Running for ~2 days on a depth-12 model, the agent found ~20 additive changes that improved "Time to GPT-2" from 2.02h → 1.80h (11% improvement) on top of Karpathy's own extensive manual tuning. The repo hit ~25K stars in 5 days; the tweet reached 8.6M views. Shopify's CEO reproduced it internally and reported 19% gains.

**What made it viral:** a legendary ML practitioner publicly admitting an AI agent found real bugs he'd missed, with quantitative proof the improvements transferred to larger models.

**The limitation:** Karpathy's loop only works when there's a clean scalar signal and a fixed experimental box. It cannot handle open-ended research problems where the contribution requires connecting experimental results into a scientific narrative.

**What we're building is different.** Our autoresearch skill targets research domains where:
1. An agent can optimize a **proxy metric** in a tight inner loop (15–60 min per experiment)
2. But the **real contribution** requires holistic synthesis across experiments
3. The output is a **research paper**, not just a better metric

This is analogous to mechanistic interpretability research: optimizing SAE training loss is only part of the pipeline. The actual research contribution comes from interpreting what the SAE features reveal.

---

## Design Philosophy: Two Loops, Not One

```
INNER LOOP (Karpathy-style):
  modify → run → measure proxy metric → keep/revert
  (agent operates autonomously, ~15-60 min cycles)

OUTER LOOP (new):
  review accumulated results → identify patterns → 
  form hypotheses → propose new experiments → 
  synthesize into narrative
  (agent + human or agent alone with richer context)
```

The inner loop is pure autoresearch. The outer loop is where novelty comes from — connecting multiple experimental results into a claim that no single metric captures.

---

## Resource Profile

- **Compute:** 8× H100 nodes → enables parallelism, sub-hour cycles on 1–7B models
- **Target output:** Twitter/X virality (Karpathy-style shareable result)
- **Quality bar:** Genuine novelty, not incremental — results that would surprise the community
- **Researcher background:** MEGa memory architecture (LoRA + embedding gating), mechanistic interpretability, LLM architecture, theoretical physics

---

## What Domains Work for Autoresearch

A domain is autoresearch-optimal when it has all four:

| Property | Why It Matters |
|---|---|
| **Sub-hour experiment cycles** | Agent can run 100+ experiments overnight |
| **Clear proxy metric** | Agent knows which direction is better |
| **Metric ≠ real contribution** | Forces synthesis beyond optimization |
| **High novelty density** | Mature tooling but unexplored territory |

Domains that satisfy all four (from our research): developmental interpretability, LoRA × mech interp, SAE architecture, scaling laws, model merging, RL training internals, ICL mechanics, self-distillation for continual learning.

---

## The Autoresearch Skill Architecture

### Inputs to the Skill
1. **A `program.md`** — research direction, key papers, hypothesis space, proxy metric definition
2. **An `experiment.py`** — runnable baseline experiment with fixed eval harness
3. **A `papers/` directory** — PDFs of key papers the agent should internalize

### Inner Loop (per experiment, ~15–60 min)
1. Read current `program.md` and experiment history
2. Propose one change (architecture, training objective, hyperparameter, data preprocessing)
3. Run fixed-budget experiment
4. Measure proxy metric; compute delta vs baseline
5. If positive: commit to `experiments/run_N/`, update running notes
6. If negative: revert, log why it was tried

### Outer Loop (every K experiments, or on demand)
1. Review all committed experiments and their deltas
2. Cluster by type (architecture changes vs optimizer vs data)
3. Identify: what patterns explain which changes worked?
4. Generate 3–5 new hypotheses based on patterns
5. Update `program.md` with new directions
6. Optionally: generate a draft "findings so far" section

### Output
- `results/` — all experimental data, scripts, logs
- `findings.md` — synthesized narrative (what worked, why, what it means)
- `paper_draft.md` — scaffold for a research paper

---

## Key Difference from Prior Systems

| System | Strength | Limitation |
|---|---|---|
| Karpathy autoresearch | Fast, focused, minimal overhead | Only metric optimization, no synthesis |
| Sakana AI Scientist | Full pipeline including paper writing | 42% experiment failure rate, hallucinates results |
| AIDE (Weco) | Strong on ML engineering tasks | Optimizes metrics, not scientific understanding |
| AutoResearchClaw | Full 23-stage pipeline, PIVOT/REFINE loop, real literature APIs, citation verification | Linear workflow assumes research is sequential; literature frozen upfront; agent controls eval harness (gameable) |
| **Our skill** | Synthesis loop is continuous; frozen eval harness; domain internalization over extraction | Requires expert domain spec upfront; less general |

See `05_prior_art_autoresearchclaw.md` for a full analysis of AutoResearchClaw's pipeline,
what it gets right, where linear workflows break down in practice, and how the two
approaches can compose.

The key architectural decision is separating the **inner loop** (fully autonomous, pure metric optimization) from the **outer loop** (requires scientific reasoning, may involve human oversight). Most prior systems try to do both in one pass — that's why they fail at the synthesis step.

---

## Research Constraints for the Skill

For a domain to be included in the skill's repertoire:

- Experiment cycle time: **< 1 hour** on 8× H100
- Proxy metric: **computable in < 5 min** post-training  
- Ground truth check: **falsifiable prediction** (not just "interesting pattern")
- Paper contribution: requires **≥ 2 conceptual leaps** beyond the experiments themselves

Domains that fail on any of these are moved to "future work" or require human-in-the-loop oversight.
