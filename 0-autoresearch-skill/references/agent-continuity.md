# Agent Continuity: Keeping Research Running

Autonomous research requires agents that keep working across long time spans — hours, overnight, or days. This reference covers how to maintain continuity on different platforms.

## The Key Distinction

Your research has two time scales:

- **Experiment time**: how long each inner/outer loop cycle takes (15 min to hours)
- **Wall-clock time**: when `/loop` or heartbeat fires (fixed interval, 10-30 min)

These will not be in sync. That's expected and fine. The wall-clock timer is a prompt to keep working, not a research phase boundary.

## Claude Code: /loop

### Setup

After bootstrapping the research project, set up continuous operation:

```
/loop 15m
```

This runs your prompt every 15 minutes. Adjust based on experiment speed:
- Fast experiments (< 10 min): `/loop 10m`
- Medium experiments (15-30 min): `/loop 15m`
- Slow experiments (30-60 min): `/loop 30m`

### What to Do on Each Tick

```
1. Read research-state.yaml — where are you?
2. Check: is an experiment still running?
   - Yes → check on it (logs, progress, errors)
   - No → process results if just finished
3. Decide: inner loop or outer loop?
   - Enough results accumulated → outer loop reflection
   - Otherwise → start next inner loop experiment
4. Execute the action
5. Update research-state.yaml and research-log.md
6. If meaningful progress → git commit
7. If something worth showing → generate report, run: open reports/progress-N.html
```

### Handling Long Experiments

If an experiment takes longer than your /loop interval:
- On the next tick, check if it's done
- If still running: monitor for errors, do lightweight work (update notes, search related papers)
- Don't restart or duplicate the experiment
- Don't adjust the /loop interval just because one experiment is slow

### Context Recovery

Your primary memory between ticks is `research-state.yaml`. Keep it updated with:
- Current hypothesis being tested
- Experiment status (running, finished, failed)
- Last outer loop direction decision
- What to do next

If you lose context, read research-state.yaml and research-log.md to reconstruct where you are.

## OpenClaw: System Heartbeat

### How OpenClaw Heartbeat Works

OpenClaw injects the contents of a system HEARTBEAT.md file into your context at regular intervals (configurable, typically 15-30 min). This is your only reliable way to maintain context between heartbeat cycles.

**If you don't write to HEARTBEAT.md, you lose continuity.** The agent wakes up with no memory of what it was doing.

### What to Write in HEARTBEAT.md

After every significant action, update the system HEARTBEAT.md with:

```markdown
## Research Status
Phase: [inner loop iteration 14 / outer loop cycle 3 / bootstrap / finalizing]
Project: [project name and question, 1 line]
Active hypothesis: [H3 — testing whether cosine warmup improves convergence]
Last completed: [run_013 — metric improved from 0.812 to 0.847 (+0.035)]
Experiment status: [running run_014 / idle / waiting for results]

## Next Action
[Be specific — this is what you'll read next time]
[e.g., "Check if run_014 completed. If yes, record results and compare against
run_013. If metric > 0.85, this direction is promising — queue H3.1 sub-experiment.
If metric plateaued, trigger outer loop reflection."]

## State Files
[Point to your workspace]
- research-state.yaml: /path/to/project/research-state.yaml
- findings.md: /path/to/project/findings.md
- Current experiment: /path/to/project/experiments/H3-cosine-warmup/

## Human Update
[Nothing to report right now]
[OR: Progress report generated at reports/progress-002.pdf — found that
learning rate warmup consistently improves convergence by 3-5%]
```

### The Heartbeat as a Reflection Moment

Each heartbeat is a natural point to briefly zoom out:

- Is the research direction still promising?
- Are experiments failing silently (NaN, OOM, stalled training)?
- Have enough inner loop results accumulated for an outer loop?
- Is there something worth reporting to the human?

Don't force a full reflection every heartbeat. If the inner loop is progressing well, just update HEARTBEAT.md with status and continue. But if something feels off — stalled progress, repeated failures, surprising results — use the heartbeat as a trigger to step back and think.

### Modifying Heartbeat Interval

If your experiments are consistently faster or slower than the heartbeat interval, adjust it in OpenClaw settings. The maximum useful interval is about 30 minutes — longer than that and you risk losing too much context between cycles.

### PDF Progress Reports

OpenClaw can't `open` HTML files locally like Claude Code can. When you have something to report to the human:

1. Generate a PDF progress summary (use Python with reportlab, matplotlib, or similar)
2. Include: research question, key results, optimization trajectory plot, current understanding, next steps
3. Note the PDF path in HEARTBEAT.md under "Human Update"
4. The human receives this in their next interaction with the system

## Research State as Ground Truth

Both platforms share the same ground truth: the research workspace files.

| File | Purpose | Update Frequency |
|---|---|---|
| `research-state.yaml` | Machine-readable state | After every experiment and reflection |
| `research-log.md` | Decision timeline | After every significant action |
| `findings.md` | Narrative understanding | After every outer loop |
| `experiments/*/results/` | Raw experimental data | After every experiment |

The platform-specific continuity mechanism (/loop or heartbeat) is just the trigger. The workspace files are the memory. Keep them current.
