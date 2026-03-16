# Autoresearch Domains: Specific Ideas and Experiment Designs

## Domain Selection Criteria Recap

Before diving into domains, the key filter applied to all candidates:
- **Iteration speed:** sub-1-hour cycles on 8× H100
- **Proxy metric exists:** something the inner loop can optimize
- **Territory is open:** tooling exists but systematic investigation hasn't happened
- **Synthesis required:** the real paper contribution can't be extracted from the metric alone
- **Twitter virality:** the finding compresses into a shareable result

---

## Cluster 1: Superposition Geometry & Scaling Laws

### Background
The NeurIPS 2025 Best Paper Runner-Up ("Superposition Yields Robust Neural Scaling," Liu et al.) proved that LLMs operate in "strong superposition" — feature vectors in the LM head arrange into an ETF (Equiangular Tight Frame) structure where pairwise squared overlaps converge to 1/m. This makes the scaling law L ∝ 1/m a geometric inevitability, not a statistical accident. Real LLMs across OPT, GPT2, Qwen, Pythia all confirmed.

### Idea A: ETF Crystallization Predicts LoRA Fine-tuning Brittleness

**The one-sentence claim:** As pretraining continues, the LM head crystallizes into a tighter ETF (variance of pairwise overlaps → 0), and this crystallization directly predicts how hard the model is to fine-tune — connecting the "Superposition" paper to the ICML 2025 "Overtrained Language Models Are Harder to Fine-Tune" paper.

**Why it's novel:** The overtrained paper documents brittleness empirically but has no geometric explanation. The superposition paper measures ETF structure but doesn't connect it to fine-tuning. Nobody has linked them.

**The experiment:**
```python
# Measurement: ~5 lines, no GPU needed, run on Pythia checkpoints
W = model.lm_head.weight          # [vocab_size × hidden_dim]
W_n = W / W.norm(dim=-1, keepdim=True)
overlaps = (W_n @ W_n.T).pow(2)
etf_score = overlaps.mean()   # → 1/m in strong superposition
etf_var   = overlaps.var()    # → 0 as ETF crystallizes; lower = more crystallized
```

**The protocol:**
1. Take all 154 Pythia checkpoints per model size (70M–12B) — free on HuggingFace
2. Compute `etf_var` per checkpoint (CPU only, seconds each)
3. Apply rank-4 LoRA for 200 steps on Alpaca-1k at each checkpoint
4. Measure instruction-following performance and forgetting (val perplexity)
5. Plot `etf_var` vs fine-tuning performance → expect anti-correlation

**Compute:** ~2 hours on 8× H100. Pythia checkpoint analysis is CPU-only.

**The viral tweet:** "We found a geometric signature in model weights that predicts how hard a model is to fine-tune — before you run a single fine-tuning step."

---

### Idea B: SLDAgent on the Superposition Toy Model

**The one-sentence claim:** Use the scaling law discovery agent (SLDAgent, "Can Language Models Discover Scaling Laws?") to discover a unified formula L(m, α, γ) for the superposition toy model that covers the full parameter space including the phase transition the authors couldn't solve analytically.

**Why it's novel:** The superposition paper's authors explicitly flag the phase transition between weak and strong superposition regimes as unsolved. They derived L ∝ 1/m in the even-frequency strong superposition limit and L ∝ m^{-(α-1)} in the power-law weak superposition limit but never unified them. Symbolic regression on synthetic data from the toy model can find the formula.

**The experiment:**
1. Implement the superposition toy model (50 lines, already open source)
2. Sweep (m ∈ [10,200], α ∈ [0.5,3], γ ∈ [-1,1]) → ~5,000 (variables → loss) tuples, ~30 min
3. Feed to SLDAgent: discover L = f(m, α, γ)
4. Check: does the discovered formula collapse to known limits?
5. Validate on Pythia/OPT/Qwen LM head overlap data

**Key open extension:** Add depth (ℓ) as a variable. The superposition paper explicitly says f_ℓ(ℓ) (depth-limited scaling) is an open problem. An agent discovering how both width and depth jointly determine loss would close a major open question.

**Proxy metric:** R² of discovered formula on held-out (m, α, γ) → L test set, compared to paper's hand-derived formulas.

**The viral tweet:** "An AI agent discovered a unified theory of neural scaling laws across the full superposition spectrum — the formula human researchers couldn't derive."

---

## Cluster 2: RL Training Internals

### Background
GRPO (DeepSeek-R1's optimization algorithm) is the hottest RL method in LLMs. No published work compares what PPO, GRPO, and DPO do to model internals at the circuit or feature level. This is the single largest gap in RL interpretability.

### Idea: The RL Algorithm Brain Scan

**The one-sentence claim:** PPO, GRPO, and DPO modify fundamentally different circuits in the same base model — characterizable by the SVD spectrum of weight deltas and SAE feature overlap scores.

**Why it's novel:** Zero competition. GRPO has an acknowledged length bias (Dr. GRPO paper). DPO only modifies final layers (known empirically). PPO spreads changes broadly. Nobody has put these on the same canvas mechanistically.

**The experiment:**
```python
# After training: compute weight delta SVD per layer
delta_W = W_trained - W_base
U, S, Vh = torch.linalg.svd(delta_W)
# Plot singular value spectrum: is it low-rank or diffuse?

# SAE feature overlap score (Jaccard index)
features_before = get_active_features(model_base, prompts)
features_after  = get_active_features(model_trained, prompts)
overlap = jaccard(features_before, features_after)
```

**Protocol:**
1. Start from same Qwen2.5-1.5B base
2. Train to similar GSM8K accuracy with PPO, GRPO, DPO (~20 min each on 8× H100)
3. For each: compute ΔW SVD spectrum per layer, SAE feature Jaccard, attention pattern shift
4. Plot: which layers change most? Is the change low-rank (DPO-style) or diffuse (PPO-style)?

**Proxy metric:** SAE feature Jaccard similarity pre/post + weight delta Frobenius norm per layer

**The viral tweet:** "We ran the same model through PPO, GRPO, and DPO and took brain scans. They're completely different algorithms at the circuit level."

---

## Cluster 3: Self-Distillation RL and Continual Learning

### Background
Two papers from January 2026 define the frontier:

**SDFT** (Shenfeld et al., 2601.19897): Self-Distillation Fine-Tuning enables continual learning from demonstrations — the model conditioned on a demonstration acts as its own teacher, generating on-policy training signals. Works for skill learning; struggles with genuinely new knowledge.

**SDPO** (Hübotter et al., 2601.20802): Self-Distillation Policy Optimization for RL — uses rich textual feedback (compiler errors, test traces) to construct token-level advantages without an external teacher. Solves the credit assignment bottleneck in RLVR. Reasoning traces 11× shorter than GRPO. Avoids catastrophic forgetting naturally.

**Key mechanistic insight of SDPO:** The model + feedback in context = self-teacher. The KL between original rollout tokens and self-teacher tokens = token-level advantage signal. No sampling overhead — just a longer forward pass.

**The fundamental gap both papers leave open:** Knowledge acquisition. RL shapes behavior but can't inject new facts. SFT injects facts but is off-policy and forgets. Neither handles: "teach the model something it genuinely doesn't know, without degrading what it already knows."

---

### Idea A: Self-Teacher Entropy as a Real-Time Forgetting Detector

**The one-sentence claim:** During sequential SDPO training, the entropy of the self-teacher's token-level advantage distribution over old tasks increases before behavioral forgetting appears in benchmark scores — providing a real-time forgetting signal inside the training loop.

**Why it's novel:** Nobody has measured self-teacher confidence calibration dynamics during continual training. If this works, practitioners get a forgetting detector that runs inside training with zero overhead.

**The experiment:**
1. Sequential SDPO: task A (chemistry QA) → task B (code) → task C (math)
2. During each task's training, measure self-teacher entropy on a fixed held-out set of old task prompts every 100 steps
3. Also measure held-out benchmark performance every 100 steps
4. Does entropy increase precede benchmark drops? By how many steps?

**Proxy metric:** Spearman correlation between self-teacher entropy spike timing and benchmark degradation timing across 5 seeds.

**The viral tweet:** "We can detect forgetting before it appears in benchmarks — there's a warning signal inside the model's own training loop."

---

### Idea B: SDPO with Document-as-Feedback for Knowledge Acquisition

**The one-sentence claim:** For knowledge acquisition tasks (post-cutoff facts), using source documents as the "feedback" context for the self-teacher — rather than compiler errors or reward signals — enables SDPO to inject genuine new knowledge while preserving behavioral capabilities.

**Why it's novel:** SDFT and SDPO both fail at knowledge acquisition (both acknowledge this). Retrieval-augmented SDPO hasn't been tried. The self-teacher conditioned on (question + source passage) becomes a knowledgeable teacher without requiring any external model.

**The experiment:**
1. Take SDFT's knowledge acquisition setup: Wikipedia 2025 disaster articles (200K tokens, post-cutoff)
2. Baseline A: vanilla SFT on QA pairs
3. Baseline B: SDFT (demonstration-conditioned)
4. Proposed: SDPO where "feedback" = retrieved source passage, self-teacher = model + passage
5. Evaluate: new task accuracy + backward transfer on IFEval/MMLU-Pro

**Why it works theoretically:** The document shifts the self-teacher's next-token distribution toward factually grounded tokens. The KL loss propagates this factual grounding into model weights with token-level resolution — much more targeted than SFT loss.

**The viral tweet:** "We taught a model new facts it didn't know — without forgetting anything — by letting it be its own teacher with access to the source."

---

### Idea C: KL Direction as a Forgetting-Type Dial (Quick Win)

**The one-sentence claim:** Forward KL (α=0) in SDPO better preserves factual knowledge; reverse KL (α=1) better preserves behavioral skills — giving practitioners a single hyperparameter to tune based on what type of knowledge they care about preserving.

**Why it's tractable:** SDPO already exposes an `alpha` parameter controlling KL direction. This is a one-line change. The experiment is a full sweep with clear prediction.

**The experiment:**
- Sequential tasks: skill A → knowledge B → skill C  
- Sweep α ∈ {0, 0.25, 0.5, 0.75, 1.0}
- Measure backward transfer on A and B separately
- Prediction: crossed interaction — lower α better preserves B (knowledge), higher α better preserves A (skill)

**Compute:** ~10 runs × 30 min = 5 hours. Fully automatable as autoresearch inner loop.

---

### Idea D: MEGa + SDFT — Adapter Isolation for Behavioral vs Factual Memory

**The one-sentence claim:** Combining SDFT's on-policy signal with MEGa-style per-task LoRA adapters separates behavioral preservation (shared weights, SDFT gradient) from factual injection (isolated adapters, standard SFT), solving the problem both systems fail at independently.

**Why it's the MEGa connection:** This is the natural extension of the MEGa architecture to the continual learning setting. SDFT preserves behavioral circuits in shared weights. MEGa adapters absorb per-domain facts without polluting shared representation. The embedding-similarity gate routes at inference.

**The experiment:**
1. Sequential: domain A (skill) → domain B (knowledge) → domain C (skill)
2. Condition A: vanilla SDFT (shared weights only)
3. Condition B: SDFT on shared weights + SFT on per-domain LoRA adapters
4. Condition C: MEGa-gated SDFT (embedding-similarity routing at inference)
5. Metrics: backward transfer per task type (behavioral vs factual), adapter growth rate

**This is the full paper.** Conditions A–C form a clean ablation story.

---

## Cluster 4: ICL Mechanics

### Background
Task vectors extracted from ICL demonstrations occupy a ~6-dimensional subspace per attention head in LLMs. Function vectors (ICLR 2024) show a small number of attention heads implement ICL. The dual-mode theory (ICML 2024) explains the ICL risk curve: early examples trigger wrong pretrained skill, more examples switch to task-learning mode.

### Idea: Task Vector → LoRA Distillation

**The one-sentence claim:** ICL task vectors (extracted from few-shot demonstrations) can be distilled into rank-4 LoRA adapters with equivalent accuracy but 10× faster inference — and the 6D task vector subspace directly predicts which LoRA rank achieves parity.

**Why it's novel:** The task vector and LoRA literatures haven't intersected. The dimensional alignment (6D task vectors, rank-4 LoRA ≈ 4D) is suggestive but unproven. This bridges two active literatures.

**Proxy metric:** ICL accuracy recovery percentage. Cycle time: ~30 min per variant.

**MEGa connection:** Validates MEGa's theoretical foundation — each MEGa adapter IS a stored task vector.

---

## Cluster 5: Neuroscience × Grokking

### Background
Grokking (delayed generalization long after memorization) maps precisely onto memory consolidation theory. The mapping: memorization phase = hippocampal fast encoding; generalization phase = neocortical slow consolidation; weight decay driving transition = sleep-dependent synaptic downscaling; Grokfast showed that spectral filtering of gradients accelerates grokking by >50×. Nobody has written the paper explicitly connecting these.

### Idea: Sleep-Phase Training

**The experiment:** Train small transformer on modular arithmetic until memorization. Insert "sleep phases" — replay with elevated weight decay and oscillatory learning rates (mimicking slow-wave sleep). Measure grokking acceleration vs standard training.

**Cycle time:** 5–15 min on 8× H100. Fastest experiment in this entire document.

**The viral tweet:** "Neural networks dream to learn, just like brains."

---

## Summary Table: All Ideas

| Idea | Cluster | Cycle Time | Proxy Metric | Novelty | Virality |
|---|---|---|---|---|---|
| ETF crystallization → LoRA brittleness | Superposition | ~2h setup, CPU analysis | etf_var vs fine-tune perf | High | High |
| SLDAgent on superposition toy model | Scaling laws | ~30 min data gen | R² of discovered formula | Very High | Very High |
| RL algorithm brain scan (PPO/GRPO/DPO) | RL internals | ~20 min per run | SVD spectrum + SAE Jaccard | Very High | Very High |
| Self-teacher entropy forgetting detector | Self-distillation | ~45 min per seq. run | Spearman corr (entropy, perf) | High | High |
| Document-as-feedback SDPO | Self-distillation | ~45 min per run | New task acc + backward transfer | High | High |
| KL direction as forgetting dial | Self-distillation | ~30 min per run | Backward transfer per task type | Medium | Medium |
| MEGa + SDFT adapter isolation | MEGa / continual | ~60 min per run | Backward transfer, adapter growth | High | Medium |
| Task vector → LoRA distillation | ICL | ~30 min per run | ICL accuracy recovery % | Medium | Medium |
| Sleep-phase training (grokking) | NeuroAI | **5–15 min** | Steps to grokking | High | Very High |
