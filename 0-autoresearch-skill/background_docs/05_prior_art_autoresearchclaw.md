# Prior Art: AutoResearchClaw and the Limits of Linear Pipelines

## What AutoResearchClaw Is

AutoResearchClaw (github.com/aiming-lab/AutoResearchClaw) is an OpenClaw-compatible
autonomous research system that takes a topic string and outputs a conference-ready LaTeX
paper. It runs 23 stages across 8 phases with multi-agent debate, real API literature
collection (arXiv + Semantic Scholar), 4-layer citation verification, hardware-aware
sandbox experiments, and self-healing code repair. It is genuinely impressive engineering.

The workflow:

```
Phase A: Research Scoping          Phase E: Experiment Execution
  1. TOPIC_INIT                      12. EXPERIMENT_RUN
  2. PROBLEM_DECOMPOSE               13. ITERATIVE_REFINE  ← self-healing

Phase B: Literature Discovery      Phase F: Analysis & Decision
  3. SEARCH_STRATEGY                 14. RESULT_ANALYSIS    ← multi-agent
  4. LITERATURE_COLLECT  ← real API  15. RESEARCH_DECISION  ← PIVOT/REFINE
  5. LITERATURE_SCREEN   [gate]
  6. KNOWLEDGE_EXTRACT               Phase G: Paper Writing
                                     16. PAPER_OUTLINE
Phase C: Knowledge Synthesis         17. PAPER_DRAFT
  7. SYNTHESIS                       18. PEER_REVIEW        ← evidence check
  8. HYPOTHESIS_GEN    ← debate      19. PAPER_REVISION

Phase D: Experiment Design         Phase H: Finalization
  9. EXPERIMENT_DESIGN   [gate]      20. QUALITY_GATE      [gate]
 10. CODE_GENERATION                 21. KNOWLEDGE_ARCHIVE
 11. RESOURCE_PLANNING               22. EXPORT_PUBLISH     ← LaTeX
                                     23. CITATION_VERIFY    ← relevance check
```

Notable features:
- **Gate stages** (5, 9, 20) pause for human approval or auto-approve
- **PIVOT/REFINE loop** at Stage 15: agent can route back to Stage 8 (new hypothesis) or Stage 13 (refine experiments) with artifact versioning
- **Multi-agent debate** at hypothesis generation and result analysis
- **Self-healing** at Stage 13: NaN/Inf detection, targeted LLM code repair
- **Self-learning**: lessons extracted per run with 30-day time-decay; future runs learn from past mistakes
- **Knowledge base** built across 6 categories (decisions, experiments, findings, literature, questions, reviews)
- **Sentinel watchdog**: background quality monitor for paper-evidence consistency and citation relevance

It is the most complete existing system for automated research. The PIVOT/REFINE loop at Stage 15 is a genuine insight — it's the first system to explicitly encode "the research might need to change direction" into the workflow.

---

## What the Linear Pipeline Gets Right

AutoResearchClaw's 23-stage structure captures the *nominal* research workflow accurately.
Most papers do follow roughly this sequence: you scope a problem, read literature, form a
hypothesis, design an experiment, run it, analyze results, and write. The explicit gates
at Stages 5, 9, and 20 acknowledge that a human needs to sanity-check before proceeding to
expensive compute or irreversible outputs.

The self-healing loop at Stage 13 is important and correct: experiments fail, code breaks,
and the system needs to recover gracefully rather than abort. The 4-layer citation
verification is essential — one of the core failure modes of Sakana AI Scientist was
hallucinated references, and AutoResearchClaw clearly addresses this.

**The PIVOT mechanism at Stage 15 is the most honest part of the design.** It admits that
experiments can fail not just technically but scientifically — the hypothesis might be
wrong, and the agent needs to know how to respond to that.

---

## What Real Research Looks Like (and Where Linear Pipelines Break)

The 23-stage linear model assumes research proceeds in one direction: scope → literature →
hypothesis → experiment → analyze → write. In practice, expert researchers violate this
constantly and productively:

### 1. Experiments reshape the hypothesis retroactively

You run Experiment 1 expecting result A. You get result B. Result B is more interesting than
A. The research question itself changes. In AutoResearchClaw, the PIVOT at Stage 15 sends
you back to hypothesis generation (Stage 8) — but the new hypothesis is now informed by
experimental data, which means the literature review (Phase B) might also need to be
redone. Real pivots are not just "try a new hypothesis with the same literature"; they often
require re-scoping what you're even reading.

### 2. Literature reading is continuous, not front-loaded

The AutoResearchClaw model runs literature collection in Phase B before experiments start.
But expert researchers read papers throughout the project — a surprising experimental result
triggers a new literature search, a reviewer comment surfaces a related paper, a Slack
message from a collaborator points to something relevant. The knowledge base in
AutoResearchClaw accumulates across runs (30-day decay), but within a single run, the
literature is frozen after Phase B.

### 3. Internalization takes time and iteration

The most valuable thing a researcher does with a paper is not extract its findings — it's
internalize the *structure of the argument*: what was assumed, what was left open, what
the toy model actually implies about the full system. AutoResearchClaw extracts "knowledge
cards" (Stage 6) and synthesizes them (Stage 7), but extraction and internalization are
not the same thing. A researcher who has truly internalized the Superposition paper will
notice that its Discussion section is a research agenda, and will design experiments to
test the things the authors explicitly flagged as unsolved. An agent doing keyword
extraction from the same paper will not.

### 4. The writing is not separate from the thinking

Stage 16–19 (paper writing) in AutoResearchClaw happens after all experiments are done.
But experienced researchers write throughout the project. Writing a related work section
forces you to understand how your contribution differs from prior work. Writing a methods
section forces you to realize your experiment design has a flaw. The act of writing *is*
part of the research process, not a downstream output of it. Separating them architecturally
produces papers that feel assembled rather than argued.

### 5. The most important decisions happen in the gaps

Between Stage 14 (result analysis) and Stage 15 (research decision), there's a choice
that no automated system currently makes well: "Is this result publishable as-is, or does
it need to be part of a larger story?" A positive result on Experiment 1 might be
interesting alone, or it might only be interesting in the context of Experiments 2 and 3
that the agent hasn't run yet. The decision to keep going, consolidate what you have, or
pivot requires a theory of what makes a paper contribution — not just a metric.

---

## Our Design Choices in Response

Rather than fixing AutoResearchClaw's pipeline (which would require rewriting much of it),
we make different fundamental design choices:

### Choice 1: Domain-first, not topic-first

AutoResearchClaw takes any topic and runs the full pipeline. Our approach takes a
**deeply characterized research domain** — one where we've manually identified the open
questions, the proxy metrics, and the experimental infrastructure — and deploys autoresearch
within that domain.

This is less general but more reliable. A researcher who knows the Superposition paper,
Pythia's checkpoint structure, and the ETF measurement formula in advance can run 100
experiments overnight that would all fail if the agent had to figure out those things
from scratch.

The tradeoff: our skill requires human expertise upfront to define the domain, program.md,
and experiment harness. AutoResearchClaw requires less upfront but produces shallower results.

### Choice 2: Frozen eval harness

In AutoResearchClaw, the agent writes the experiment code (Stages 10–12) and the eval code.
This means it can write code that produces good-looking metrics without actually testing
what it claims to test — one of the core failure modes documented in Sakana AI Scientist
evaluations.

Our design separates: the agent modifies anything upstream of the eval harness, but the
eval harness itself is frozen and written by a human. The agent cannot cheat the metric
by rewriting the evaluation. This costs flexibility but gains scientific integrity.

### Choice 3: Synthesis loop is first-class

AutoResearchClaw's synthesis happens at Stage 7 (once) and implicitly via multi-agent
debate at Stage 8. Our outer loop runs continuously, every K experiments, asking: "What
do the results so far imply about the mechanism?" The agent is required to articulate a
mechanistic explanation, not just log metric deltas.

This is enforced via the `findings.md` quality check described in the skill spec: after
30 experiments, a human should be able to read `findings.md` and write the abstract of a
paper. If they can't, the outer loop is failing.

### Choice 4: Internalization over extraction

For domain background, we provide paper text to the agent and require it to engage with
the Discussion sections specifically — extracting unstudied predictions as hypotheses
rather than just extracting findings as knowledge cards.

The superposition paper's Discussion explicitly lists: (1) depth scaling unsolved, (2) RL
trainability unverified, (3) ETF dynamics during training unstudied. An agent that reads
those three sentences and generates experiments to test them is doing something categorically
different from one that extracts "ETF structure explains scaling laws" as a knowledge card.

---

## What We Can Use from AutoResearchClaw

Rather than competing with AutoResearchClaw, our skill can **compose with it**:

- Use AutoResearchClaw's **literature pipeline** (Stages 3–6) as the input to our
  domain specification process. Run it on a topic to get initial knowledge cards, then
  a human converts those into a structured `program.md` and `experiment.py`.

- Use AutoResearchClaw's **paper writing pipeline** (Stages 16–19) as the output stage
  after our autoresearch loops have produced experimental results and `findings.md`.

- Use AutoResearchClaw's **citation verification** (Stage 23) on whatever references
  our synthesis generates.

The pipelines are complementary: AutoResearchClaw is good at the bookend phases
(literature collection, paper writing), while our approach is better at the experimental
core (tight iteration, mechanistic synthesis, falsifiable findings). Combined, they cover
the full research pipeline more reliably than either does alone.

---

## Summary Comparison

| Dimension | AutoResearchClaw | Our Autoresearch Skill |
|---|---|---|
| **Generality** | Any topic | Domain-specific, pre-specified |
| **Eval harness** | Agent-generated | Human-written, frozen |
| **Literature** | Collected fresh each run | Pre-curated in `papers/` |
| **Synthesis** | Once, upfront | Continuous outer loop |
| **Pivot handling** | Stage 15 gate | Outer loop rewrites `program.md` |
| **Paper writing** | Built-in (LaTeX) | Separate, can use ARC |
| **Citation check** | 4-layer verification | Can use ARC |
| **Failure mode** | Metric gaming, shallow pivots | Narrow scope, needs expert setup |
| **Best for** | Exploratory, any domain | Deep domain exploration |
| **Experiment integrity** | Agent controls eval | Human-controlled eval harness |
| **Internalization** | Knowledge card extraction | Discussion-section hypothesis extraction |
