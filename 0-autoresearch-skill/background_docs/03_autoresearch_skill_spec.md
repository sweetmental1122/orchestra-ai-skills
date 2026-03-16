# Autoresearch Skill Specification

## What the Skill Provides

A structured prompt and scaffolding system for AI coding agents (Claude Code, OpenClaw) to autonomously conduct ML research — running experiments, synthesizing results, and producing publishable findings without constant human intervention.

---

## The Skill File Structure

```
autoresearch_skill/
├── SKILL.md              ← this spec (what agents read first)
├── program.md            ← research direction (human-written per project)
├── experiment.py         ← baseline experiment with fixed eval harness
├── papers/               ← PDFs/text of key background papers
│   ├── superposition_scaling.md
│   ├── overtrained_models.md
│   ├── sdpo.md
│   └── sdft.md
├── experiments/          ← agent writes here
│   ├── run_001/
│   │   ├── config.json
│   │   ├── results.json
│   │   └── notes.md
│   └── ...
├── findings.md           ← agent maintains this
└── paper_draft.md        ← agent generates this
```

---

## SKILL.md Template (What the Agent Reads)

```markdown
# Autoresearch Skill

You are an autonomous research agent. Your goal is to make genuine 
scientific discoveries in ML/AI research that would be publishable 
and interesting to the community.

## Your Loop

### Inner loop (every experiment):
1. Read `program.md` for current research direction
2. Read `findings.md` for what's been tried
3. Propose ONE change based on a concrete hypothesis
4. Run `experiment.py` — do not modify the eval harness
5. Record result in `experiments/run_N/results.json`
6. Update `findings.md` with what you learned

### Outer loop (every 10 experiments or when you notice a pattern):
1. Review all results in `experiments/`
2. Identify: which changes worked? Is there a pattern?
3. Form 3-5 new hypotheses based on patterns
4. Update `program.md` with new directions
5. Write a "current understanding" section in `findings.md`

## Rules

- You cannot modify the eval harness in `experiment.py`
- You cannot install new packages without checking first  
- Every change you make must have a stated hypothesis
- If a change works, ask: WHY did it work? Write this down
- If a change doesn't work, ask: what does this rule out?
- A good research agent does not just optimize metrics — it builds understanding

## What Makes a Good Hypothesis

Bad: "Try learning rate 1e-4 instead of 1e-3"
Good: "Reducing LR may help because the ETF structure of the LM head 
       is sensitive to large gradient steps — test if lower LR reduces
       post-training variance in pairwise token overlaps"

## Output Quality Bar

After 50 experiments, you should be able to write a 2-paragraph 
"Key Finding" that:
- States what you discovered
- Explains WHY it happens mechanistically  
- Notes what this implies for practitioners
- Identifies the next open question

If you cannot write this, the inner loop is metric hacking, not research.
```

---

## program.md Template (Human-Written Per Project)

```markdown
# Research Direction: [Project Name]

## The Core Question
[One sentence: what are we trying to discover?]

## Background (must read)
See papers/ directory. Key papers:
- [Paper 1]: [one-line summary of what's relevant]
- [Paper 2]: [one-line summary]

## Proxy Metric
[Exactly what to measure. How to compute it. What "better" means.]
Example: etf_var = overlaps.var() where overlaps = (W_n @ W_n.T).pow(2)
Lower is more crystallized. We're tracking whether this predicts fine-tune perf.

## Current Hypothesis Space
[List of things worth trying, roughly ordered by expected impact]
1. [Hypothesis 1 — prediction + why]
2. [Hypothesis 2 — prediction + why]
3. ...

## Out of Scope
[What NOT to try, to avoid wasted cycles]
- Don't modify the eval harness
- Don't change model architecture (this is analysis, not training)
- ...

## The Paper Claim (Draft)
[What we're trying to prove, even if unvalidated]
"[Finding] because [mechanism], which implies [practical implication]"
```

---

## Experiment Harness Template

The `experiment.py` eval harness is **frozen** — the agent modifies everything else but not this.

```python
# experiment.py — FROZEN EVAL HARNESS
# Agent: you may add functions ABOVE this line
# Agent: do NOT modify anything below the "### FROZEN ###" marker

import json, sys, time
from pathlib import Path

# ============ Agent-modifiable section above ============
# Add your modifications here
# ============ FROZEN below ============

def run_eval(config: dict) -> dict:
    """
    Runs the fixed evaluation. Returns metrics dict.
    config: dict of hyperparameters / model settings
    """
    start = time.time()
    
    # Load model with config
    model = load_model(config)
    
    # Fixed eval: never changes
    metrics = {
        "proxy_metric": compute_proxy(model),
        "baseline_comparison": compare_to_baseline(model),
        "wall_time": time.time() - start,
        "config": config,
    }
    
    return metrics

if __name__ == "__main__":
    config = json.loads(sys.argv[1])
    result = run_eval(config)
    run_id = f"experiments/run_{get_next_id():03d}"
    Path(run_id).mkdir(parents=True)
    json.dump(result, open(f"{run_id}/results.json", "w"), indent=2)
    print(f"Result: {result['proxy_metric']:.4f} (baseline: {result['baseline_comparison']:+.4f})")
```

---

## Domain-Specific program.md Examples

### Example 1: ETF Crystallization Study

```markdown
# Research Direction: ETF Crystallization → Fine-tuning Brittleness

## The Core Question
Does ETF crystallization in the LM head (measured by variance of pairwise 
token embedding overlaps) predict how hard a model is to fine-tune?

## Proxy Metric
etf_var = (W_n @ W_n.T).pow(2).var()
where W_n = lm_head.weight / lm_head.weight.norm(dim=-1, keepdim=True)
Lower = more crystallized. Track across Pythia checkpoints.

## Background
- superposition_scaling.md: ETF structure, how to measure it, why LLMs are in strong superposition
- overtrained_models.md: catastrophic overtraining, progressive sensitivity, Gaussian noise test

## Hypothesis Space
1. etf_var decreases monotonically with training steps (basic crystallization check)
2. etf_var anti-correlates with LoRA fine-tune performance (the main claim)
3. The anti-correlation is stronger for higher LoRA rank (rank × m prediction)
4. Phase transitions in etf_var align with known Pythia capability emergence steps

## The Paper Claim
"ETF crystallization of the LM head during pretraining is the geometric mechanism 
behind catastrophic overtraining — and etf_var measured before fine-tuning is a 
better predictor of fine-tune difficulty than pretraining loss."
```

### Example 2: SDPO Forgetting Study

```markdown
# Research Direction: Self-Teacher Entropy as Forgetting Detector

## The Core Question
Does the entropy of SDPO's self-teacher advantage distribution over old task 
prompts increase BEFORE behavioral forgetting appears in benchmark scores?

## Proxy Metric
self_teacher_entropy = -sum(p * log(p)) over token-level advantage distribution
for a fixed set of held-out prompts from old tasks, measured every 100 steps.
Compare against: benchmark accuracy (IFEval, MMLU-Pro) measured every 100 steps.

## Background
- sdpo.md: how SDPO's self-teacher works, how advantages are computed
- sdft.md: SDFT continual learning results, what they found works/doesn't

## Hypothesis Space
1. Self-teacher entropy on old tasks increases before benchmark degradation (main claim)
2. The entropy signal leads benchmark degradation by at least 200 steps
3. Higher entropy = more forgetting in the subsequent 500 steps (predictive validity)
4. Entropy on new task starts high and decreases as learning stabilizes

## The Paper Claim
"The self-teacher's token-level confidence on old task prompts is a leading indicator 
of catastrophic forgetting, preceding behavioral degradation by N gradient steps — 
enabling real-time forgetting detection inside the training loop."
```

---

## Autoresearch Loop for Non-Training Domains

Not all research involves training. For analysis-heavy domains (ETF crystallization, scaling law discovery), the loop is:

```
Inner loop:
  1. Pick a new (m, α, γ) configuration or model checkpoint to analyze
  2. Run measurement script (CPU, seconds)
  3. Record (input_variables → output_metric)
  4. Update empirical dataset

Outer loop (every 50 data points):
  1. Fit current best formula to data
  2. Compute R² on held-out test set
  3. Identify where formula fails (residuals)
  4. Propose new variables or functional forms to try
  5. Update program.md with new search direction
```

For SLDAgent-style symbolic regression, the outer loop IS the agent — it proposes formulas, fits them, and reports the winner.

---

## Integration with Orchestra Research

The autoresearch skill is designed to generate **research decision trajectories** — the exact type of data Orchestra collects. Each experimental run captures:

- **Hypothesis** (why this change was proposed)
- **Implementation** (what was changed)  
- **Result** (proxy metric delta)
- **Interpretation** (what the agent learned)
- **Next action** (what the agent decided to try next)

This trajectory data is the ground truth for training long-horizon research agents. The autoresearch skill is simultaneously:
1. A research tool (produces publishable findings)
2. A data collection system (produces training data for future agents)

The most valuable trajectories are the ones where the agent is *wrong* — hypothesizes X, runs the experiment, finds Y, updates its model. That reasoning-under-uncertainty is exactly what distinguishes expert research trajectories from random exploration.
