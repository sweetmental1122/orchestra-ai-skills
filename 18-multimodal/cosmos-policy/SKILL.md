---
name: evaluating-cosmos-policy
description: Evaluates and benchmarks NVIDIA Cosmos Policy on LIBERO and RoboCasa simulation environments. Use when setting up cosmos-policy for robot manipulation evaluation, running headless GPU evaluations with EGL rendering, comparing KV cache settings, or profiling inference latency on cluster or local GPU machines.
version: 1.0.0
author: Orchestra Research
license: MIT
tags: [Cosmos Policy, VLA, Robotics, LIBERO, RoboCasa, Simulation, Evaluation, Benchmarking, KV Cache, EGL Rendering]
dependencies: [torch>=2.1.0, mujoco>=3.0.0, robosuite>=1.4.0, robocasa>=0.2.0, transformers>=4.40.0, "cosmos-policy @ git+https://github.com/NVlabs/cosmos-policy.git"]
---

# Cosmos Policy Evaluation

Evaluation and benchmarking workflows for NVIDIA Cosmos Policy on LIBERO and RoboCasa simulation environments. Covers setup, headless GPU evaluation, inference profiling, and cross-attention KV cache A/B comparison.

## Quick start

Run a minimal LIBERO evaluation using the official public eval module:

```bash
uv run --extra cu128 --group libero --python 3.10 \
  python -m cosmos_policy.experiments.robot.libero.run_libero_eval \
    --config cosmos_predict2_2b_480p_libero__inference_only \
    --ckpt_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B \
    --config_file cosmos_policy/config/config.py \
    --use_wrist_image True \
    --use_proprio True \
    --normalize_proprio True \
    --unnormalize_actions True \
    --dataset_stats_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B/libero_dataset_statistics.json \
    --t5_text_embeddings_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B/libero_t5_embeddings.pkl \
    --trained_with_image_aug True \
    --chunk_size 16 \
    --num_open_loop_steps 16 \
    --task_suite_name libero_10 \
    --num_trials_per_task 1 \
    --local_log_dir cosmos_policy/experiments/robot/libero/logs/ \
    --seed 195 \
    --randomize_seed False \
    --deterministic True \
    --run_id_note smoke \
    --ar_future_prediction False \
    --ar_value_prediction False \
    --use_jpeg_compression True \
    --flip_images True \
    --num_denoising_steps_action 5 \
    --num_denoising_steps_future_state 1 \
    --num_denoising_steps_value 1 \
    --data_collection False
```

## Core concepts

**What Cosmos Policy is**: NVIDIA Cosmos Policy is a vision-language-action (VLA) model that uses Cosmos Tokenizer to encode visual observations into discrete tokens, then predicts robot actions conditioned on language instructions and visual context. It supports cross-attention KV caching for faster autoregressive inference.

**Key architecture choices**:

| Component | Design |
|-----------|--------|
| Visual encoder | Cosmos Tokenizer (discrete tokens) |
| Language conditioning | Cross-attention to language embeddings |
| Action prediction | Autoregressive action token generation |
| KV cache | Optional cross-attention cache for inference speedup |

**Cross-attention KV cache**: The underlying model architecture uses cross-attention and related caching optimizations, but the public eval CLI does not currently expose a stable one-flag KV cache toggle. If you need cache A/B experiments, treat them as repo-specific automation rather than assuming a portable upstream command.

## Compute requirements

| Task | GPU | VRAM | Typical wall time |
|------|-----|------|-------------------|
| LIBERO smoke eval (1 trial) | 1x A40/A100 | ~16 GB | 5-10 min |
| LIBERO full eval (50 trials) | 1x A40/A100 | ~16 GB | 2-4 hours |
| RoboCasa single-task (2 trials) | 1x A40/A100 | ~18 GB | 10-15 min |
| RoboCasa all-tasks | 1x A40/A100 | ~18 GB | 4-8 hours |
| KV cache A/B benchmark | 1x A40/A100 | ~20 GB | 30-60 min |

## When to use vs alternatives

**Use this skill when:**
- Evaluating NVIDIA Cosmos Policy on LIBERO or RoboCasa benchmarks
- Profiling inference latency and throughput for Cosmos Policy
- Running A/B comparisons of cross-attention KV cache configurations
- Setting up headless EGL rendering for robot simulation on GPU clusters

**Use alternatives when:**
- Training or fine-tuning Cosmos Policy from scratch (use official Cosmos training docs)
- Working with OpenVLA-based policies (use `fine-tuning-openvla-oft`)
- Working with Physical Intelligence pi0 models (use `fine-tuning-serving-openpi`)
- Running real-robot evaluation rather than simulation

---

## Workflow 1: LIBERO evaluation

Copy this checklist and track progress:

```text
LIBERO Eval Progress:
- [ ] Step 1: Install environment and dependencies
- [ ] Step 2: Configure headless EGL rendering
- [ ] Step 3: Run smoke evaluation
- [ ] Step 4: Validate outputs and parse results
- [ ] Step 5: Run full benchmark if smoke passes
```

**Step 1: Install environment**

```bash
conda create -n cosmos-policy python=3.10 -y
conda activate cosmos-policy
pip install -e .
pip install robosuite==1.4.0
```

**Step 2: Configure headless rendering**

```bash
export CUDA_VISIBLE_DEVICES=0
export MUJOCO_EGL_DEVICE_ID=0
export MUJOCO_GL=egl
export PYOPENGL_PLATFORM=egl
```

**Step 3: Run smoke evaluation**

```bash
uv run --extra cu128 --group libero --python 3.10 \
  python -m cosmos_policy.experiments.robot.libero.run_libero_eval \
    --config cosmos_predict2_2b_480p_libero__inference_only \
    --ckpt_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B \
    --config_file cosmos_policy/config/config.py \
    --use_wrist_image True \
    --use_proprio True \
    --normalize_proprio True \
    --unnormalize_actions True \
    --dataset_stats_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B/libero_dataset_statistics.json \
    --t5_text_embeddings_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B/libero_t5_embeddings.pkl \
    --trained_with_image_aug True \
    --chunk_size 16 \
    --num_open_loop_steps 16 \
    --task_suite_name libero_10 \
    --num_trials_per_task 1 \
    --local_log_dir cosmos_policy/experiments/robot/libero/logs/ \
    --seed 195 \
    --randomize_seed False \
    --deterministic True \
    --run_id_note smoke \
    --ar_future_prediction False \
    --ar_value_prediction False \
    --use_jpeg_compression True \
    --flip_images True \
    --num_denoising_steps_action 5 \
    --num_denoising_steps_future_state 1 \
    --num_denoising_steps_value 1 \
    --data_collection False
```

**Step 4: Validate and parse results**

```python
import json
import glob

# Find latest evaluation result from the official log directory
log_files = sorted(glob.glob("cosmos_policy/experiments/robot/libero/logs/**/*.json", recursive=True))
with open(log_files[-1]) as f:
    results = json.load(f)

print(results)
```

**Step 5: Scale up**

Run across all four LIBERO task suites with 50 trials:

```bash
for suite in libero_spatial libero_object libero_goal libero_10; do
  uv run --extra cu128 --group libero --python 3.10 \
    python -m cosmos_policy.experiments.robot.libero.run_libero_eval \
      --config cosmos_predict2_2b_480p_libero__inference_only \
      --ckpt_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B \
      --config_file cosmos_policy/config/config.py \
      --use_wrist_image True \
      --use_proprio True \
      --normalize_proprio True \
      --unnormalize_actions True \
      --dataset_stats_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B/libero_dataset_statistics.json \
      --t5_text_embeddings_path nvidia/Cosmos-Policy-LIBERO-Predict2-2B/libero_t5_embeddings.pkl \
      --trained_with_image_aug True \
      --chunk_size 16 \
      --num_open_loop_steps 16 \
      --task_suite_name "$suite" \
      --num_trials_per_task 50 \
      --local_log_dir cosmos_policy/experiments/robot/libero/logs/ \
      --seed 195 \
      --randomize_seed False \
      --deterministic True \
      --run_id_note "suite_${suite}" \
      --ar_future_prediction False \
      --ar_value_prediction False \
      --use_jpeg_compression True \
      --flip_images True \
      --num_denoising_steps_action 5 \
      --num_denoising_steps_future_state 1 \
      --num_denoising_steps_value 1 \
      --data_collection False
done
```

---

## Workflow 2: RoboCasa evaluation

Copy this checklist and track progress:

```text
RoboCasa Eval Progress:
- [ ] Step 1: Install RoboCasa assets and verify macros
- [ ] Step 2: Run single-task smoke evaluation
- [ ] Step 3: Validate outputs
- [ ] Step 4: Expand to multi-task runs
```

**Step 1: Install RoboCasa**

```bash
pip install robocasa
python -m robocasa.scripts.setup_macros
python -m robocasa.scripts.download_kitchen_assets
```

Verify `macros_private.py` exists and paths are correct.

**Step 2: Single-task smoke evaluation**

```bash
uv run --extra cu128 --group robocasa --python 3.10 \
  python -m cosmos_policy.experiments.robot.robocasa.run_robocasa_eval \
    --config cosmos_predict2_2b_480p_robocasa_50_demos_per_task__inference \
    --ckpt_path nvidia/Cosmos-Policy-RoboCasa-Predict2-2B \
    --config_file cosmos_policy/config/config.py \
    --use_wrist_image True \
    --num_wrist_images 1 \
    --use_proprio True \
    --normalize_proprio True \
    --unnormalize_actions True \
    --dataset_stats_path nvidia/Cosmos-Policy-RoboCasa-Predict2-2B/robocasa_dataset_statistics.json \
    --t5_text_embeddings_path nvidia/Cosmos-Policy-RoboCasa-Predict2-2B/robocasa_t5_embeddings.pkl \
    --trained_with_image_aug True \
    --chunk_size 32 \
    --num_open_loop_steps 16 \
    --task_name TurnOffMicrowave \
    --obj_instance_split A \
    --num_trials_per_task 2 \
    --local_log_dir cosmos_policy/experiments/robot/robocasa/logs/ \
    --seed 195 \
    --randomize_seed False \
    --deterministic True \
    --run_id_note smoke \
    --use_variance_scale False \
    --use_jpeg_compression True \
    --flip_images True \
    --num_denoising_steps_action 5 \
    --num_denoising_steps_future_state 1 \
    --num_denoising_steps_value 1 \
    --data_collection False
```

**Step 3: Validate outputs**

- Confirm the eval log prints the expected task name, object split, and checkpoint/config values.
- Inspect the final `Success rate:` line in the log.

**Step 4: Expand scope**

Increase `--num_trials_per_task` or add more tasks. Keep `--obj_instance_split` fixed across repeated runs for comparability.

---

## Workflow 3: Benchmarking note

Use this workflow to avoid inventing a public benchmark CLI that does not exist.

```text
Benchmarking Progress:
- [ ] Step 1: Confirm whether you are using upstream public commands or repo-local automation
- [ ] Step 2: Run one deterministic smoke eval and save logs
- [ ] Step 3: Only then layer on any custom A/B benchmarking wrapper
```

**Step 1: Pick the right command surface**

- If you are using the public upstream repo, stick to `cosmos_policy.experiments.robot.*.run_*_eval` and do not invent `--enable-cross-attn-kv-cache` or `--output-dir` flags.
- If you are using a local research repo that adds wrappers or patched configs, document that repo-specific command beside the upstream command.

**Step 2: Save one deterministic smoke run first**

- For LIBERO, keep `--num_trials_per_task 1` and a fixed seed such as `195`.
- For RoboCasa, keep `--num_trials_per_task 2`, fixed `--obj_instance_split`, and a fixed seed.

**Step 3: Treat A/B benchmarking as repo-specific**

- The public Cosmos Policy repo does not document a stable single-flag KV cache benchmark path.
- If you need cache A/B numbers, use checked-in local automation from the target repo or patch the config in a reproducible way and record that diff next to the command.

---

## Expected performance benchmarks

Reference values from official evaluation (tied to specific setup and seeds):

| Task Suite | Success Rate | Notes |
|-----------|-------------|-------|
| LIBERO-Spatial | ~90-95% | Easiest suite |
| LIBERO-Object | ~85-92% | Object manipulation focus |
| LIBERO-Goal | ~80-88% | Goal-conditioned, harder |
| LIBERO-10 | ~75-85% | 10 diverse long-horizon tasks |

**Benchmark note**: Any KV cache latency claim depends on repo-local implementation details. Record the exact script or config diff you used before comparing numbers across runs.

---

## Non-negotiable rules

- **EGL alignment**: Always set `CUDA_VISIBLE_DEVICES`, `MUJOCO_EGL_DEVICE_ID`, `MUJOCO_GL=egl`, and `PYOPENGL_PLATFORM=egl` together on headless GPU nodes.
- **Singularity on clusters**: Keep singularity/apptainer enabled on A40 or similar cluster nodes to avoid `GLIBC_2.29` and `transformer_engine` loader failures.
- **Cache consistency**: Use the same cache directory across setup and eval so Hugging Face and dependency caches are reused.
- **A/B comparability**: Keep task name, object split, seed, and trial count fixed across cache-on vs cache-off comparisons.

---

## Common issues

**Issue: `GLIBC_2.29` or `transformer_engine` loader failures on cluster nodes**

Fix: rerun with the default singularity/container path. Do not force host execution.

**Issue: LIBERO prompts for config path in a non-interactive shell**

Fix: pre-create `LIBERO_CONFIG_PATH/config.yaml`:

```python
import os, yaml

config_dir = os.path.expanduser("~/.libero")
os.makedirs(config_dir, exist_ok=True)
with open(os.path.join(config_dir, "config.yaml"), "w") as f:
    yaml.dump({"benchmark_root": "/path/to/libero/datasets"}, f)
```

**Issue: EGL initialization or shutdown noise**

Fix: align EGL environment variables first. Treat teardown-only `EGL_NOT_INITIALIZED` warnings as low-signal unless the job exits non-zero.

**Issue: Kitchen object sampling NaNs or asset lookup failures in RoboCasa**

Fix: rerun asset setup and confirm the patched robocasa install is intact:

```bash
python -m robocasa.scripts.download_kitchen_assets
python -c "import robocasa; print(robocasa.__file__)"
```

**Issue: MuJoCo rendering mismatch**

Fix: verify GPU device alignment:

```python
import os
cuda_dev = os.environ.get("CUDA_VISIBLE_DEVICES", "not set")
egl_dev = os.environ.get("MUJOCO_EGL_DEVICE_ID", "not set")
assert cuda_dev == egl_dev, f"GPU mismatch: CUDA={cuda_dev}, EGL={egl_dev}"
print(f"Rendering on GPU {cuda_dev}")
```

---

## Advanced topics

**LIBERO command matrix**: See [references/libero-commands.md](references/libero-commands.md)
**RoboCasa command matrix**: See [references/robocasa-commands.md](references/robocasa-commands.md)

## Resources

- Cosmos Policy repository: https://github.com/NVlabs/cosmos-policy
- LIBERO benchmark: https://github.com/Lifelong-Robot-Learning/LIBERO
- RoboCasa environment: https://github.com/robocasa/robocasa
- MuJoCo documentation: https://mujoco.readthedocs.io/
