# Welcome — AI Research Skills

You now have access to **86 production-ready skills** covering the entire AI research lifecycle: literature survey, ideation, model training, evaluation, interpretability, paper writing, and more.

## Step 1: Install All Skills

Run this once to install all skills to your agent permanently:

```bash
npx @orchestra-research/ai-research-skills install --all
```

This auto-detects your coding agent (Claude Code, OpenClaw, Cursor, etc.) and installs 86 skills across 22 categories.

## Step 2: Start Researching

Load the **autoresearch** skill — it orchestrates the entire research workflow and routes to all other skills as needed:

```
Read 0-autoresearch-skill/SKILL.md and follow its instructions.
```

Autoresearch will:
- Set up continuous operation (/loop or cron job)
- Bootstrap your research question with literature search
- Run experiments using domain-specific skills (training, eval, interpretability, etc.)
- Synthesize results and track progress
- Show you research presentations along the way
- Write the paper when ready

You don't need to know all 86 skills upfront. Autoresearch finds and invokes the right ones for you.

## That's It

Install → load autoresearch → go. Everything else is progressive disclosure — skills teach what you need, when you need it.
