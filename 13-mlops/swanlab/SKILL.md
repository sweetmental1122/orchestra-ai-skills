---
name: experiment-tracking-swanlab
description: Provides guidance for experiment tracking with SwanLab. Use when you need open-source run tracking, local or self-hosted dashboards, and lightweight media logging for ML workflows.
version: 1.0.0
author: Orchestra Research
license: MIT
tags: [MLOps, SwanLab, Experiment Tracking, Open Source, Visualization, PyTorch, Transformers, PyTorch Lightning, Fastai, Self-Hosted]
dependencies: ["swanlab[media,dashboard]>=0.7.11"]
---

# SwanLab: Open-Source Experiment Tracking

## When to Use This Skill

Use SwanLab when you need to:
- Track training and evaluation metrics with a lightweight API
- Compare runs across configs, seeds, and checkpoints
- Keep dashboards local or self-hosted instead of depending on a managed SaaS
- Log images, audio, text, GIFs, point clouds, and molecules during experiments
- Integrate tracking into PyTorch, Transformers, PyTorch Lightning, or Fastai

Choose other tools when you specifically need:
- Mature artifact registries and file lineage: see `13-mlops/mlflow/`
- Team-heavy collaboration and hosted workflows: see `13-mlops/weights-and-biases/`
- Simple local scalar curves only: see `13-mlops/tensorboard/`

## Installation

```bash
# Base package plus media helpers used by Image/Audio/Video/Molecule examples
pip install "swanlab[media,dashboard]>=0.7.11"

# Optional framework integrations
pip install transformers pytorch-lightning fastai

# Log in only when you want cloud or self-hosted sync
swanlab login
```

`swanlab[media,dashboard]` adds the media dependencies used by Image/Audio/Video/Molecule examples and the local dashboard dependency required by `mode="local"` and `swanlab watch`.

## Quick Start

```python
import swanlab

run = swanlab.init(
    project="my-project",
    experiment_name="baseline",
    config={
        "learning_rate": 1e-3,
        "epochs": 10,
        "batch_size": 32,
        "model": "resnet18",
    },
)

for epoch in range(run.config.epochs):
    train_loss = train_epoch()
    val_loss = validate()

    swanlab.log(
        {
            "train/loss": train_loss,
            "val/loss": val_loss,
            "epoch": epoch,
        }
    )

run.finish()
```

## Core Workflow

### 1. Initialize runs and configs

```python
import swanlab

run = swanlab.init(
    project="image-classification",
    experiment_name="resnet18-seed42",
    description="Baseline run on ImageNet subset",
    tags=["baseline", "resnet18"],
    config={
        "model": "resnet18",
        "seed": 42,
        "batch_size": 64,
        "learning_rate": 3e-4,
    },
)

print(run.id)
print(run.config.learning_rate)
```

### 2. Log metrics with stable names

```python
swanlab.log({"loss": 0.42, "accuracy": 0.91})

swanlab.log(
    {
        "train/loss": train_loss,
        "train/accuracy": train_acc,
        "val/loss": val_loss,
        "val/accuracy": val_acc,
        "lr": current_lr,
    },
    step=global_step,
)
```

### 3. Save checkpoints locally

SwanLab `0.7.11` does not expose a generic file artifact helper. Save checkpoints yourself and log the associated metadata you need for comparison.

```python
import torch
import swanlab

checkpoint_path = "checkpoints/best.pth"
torch.save(model.state_dict(), checkpoint_path)

swanlab.log(
    {
        "best/val_accuracy": best_val_accuracy,
        "artifacts/checkpoint_path": swanlab.Text(checkpoint_path),
    }
)
```

## Media Logging

```python
import numpy as np
import swanlab

# Images
image = np.random.randint(0, 255, (224, 224, 3), dtype=np.uint8)
swanlab.log({"examples/image": swanlab.Image(image, caption="Augmented sample")})

# Audio: path or numpy array
wave = np.sin(np.linspace(0, 8 * np.pi, 16000)).astype("float32")
swanlab.log({"examples/audio": swanlab.Audio(wave, sample_rate=16000)})

# Text
swanlab.log({"examples/text": swanlab.Text("Training notes for this run.")})

# GIF video only in SwanLab 0.7.11
swanlab.log({"examples/video": swanlab.Video("predictions.gif", caption="Validation rollout")})

# 3D point cloud from numpy
points = np.random.rand(128, 3).astype("float32")
swanlab.log({"examples/point_cloud": swanlab.Object3D(points, caption="Point cloud sample")})

# 3D model from GLB
swanlab.log({"examples/model": swanlab.Object3D("mesh.glb", caption="Mesh preview")})

# Molecule via helper constructors
swanlab.log({"examples/molecule": swanlab.Molecule.from_smiles("CCO", caption="Ethanol")})
```

Avoid these patterns in SwanLab `0.7.11`:
- Raw-dictionary chart wrappers instead of real `swanlab.echarts.*` objects
- Generic file or histogram helper calls that do not exist in this release
- Inline 2D box annotations passed directly into the image helper
- MP4 paths passed into the video helper
- Direct OBJ or PLY file paths passed into the 3D object helper
- Direct SDF or SMILES strings passed into the molecule constructor

## Custom Charts

SwanLab chart logging is based on `pyecharts` objects exposed through `swanlab.echarts`.

```python
import swanlab

line = swanlab.echarts.Line()
line.add_xaxis(["epoch-1", "epoch-2", "epoch-3"])
line.add_yaxis("train/loss", [0.92, 0.61, 0.44])
line.set_global_opts(
    title_opts=swanlab.echarts.options.TitleOpts(title="Training Loss")
)

swanlab.log({"charts/loss_curve": line})
```

See [references/visualization.md](references/visualization.md) for more chart and media patterns.

## Framework Integrations

### Transformers

Use the non-deprecated callback module:

```python
from transformers import Trainer, TrainingArguments
from swanlab.integration.transformers import SwanLabCallback

training_args = TrainingArguments(
    output_dir="./results",
    per_device_train_batch_size=8,
    evaluation_strategy="epoch",
    logging_steps=50,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=eval_dataset,
    callbacks=[
        SwanLabCallback(
            project="hf-demo",
            experiment_name="bert-finetune",
            config={"model": "bert-base-uncased"},
        )
    ],
)

trainer.train()
```

### PyTorch Lightning

`SwanLabLogger` can initialize the run itself. Do not call `swanlab.init()` first unless you intentionally want to reuse an existing run.

```python
import pytorch_lightning as pl
from swanlab.integration.pytorch_lightning import SwanLabLogger

swanlab_logger = SwanLabLogger(
    project="lightning-demo",
    experiment_name="mnist-classifier",
    config={"batch_size": 64, "max_epochs": 10},
)

trainer = pl.Trainer(
    logger=swanlab_logger,
    max_epochs=10,
    accelerator="auto",
)

trainer.fit(model, train_loader, val_loader)
```

### Fastai

`SwanLabCallback` for Fastai also initializes SwanLab if no run exists.

```python
from fastai.vision.all import accuracy, resnet34, vision_learner
from swanlab.integration.fastai import SwanLabCallback

learn = vision_learner(dls, resnet34, metrics=accuracy)
learn.fit(
    5,
    cbs=[
        SwanLabCallback(
            project="fastai-demo",
            experiment_name="pets-classification",
            config={"arch": "resnet34", "epochs": 5},
        )
    ],
)
```

See [references/integrations.md](references/integrations.md) for fuller framework examples.

## Self-Hosted and Offline Workflows

### Self-hosted cloud endpoint

```python
import os
import swanlab

swanlab.login(
    api_key=os.environ["SWANLAB_API_KEY"],
    host="http://your-server:5092",
)

run = swanlab.init(project="self-hosted-demo", mode="cloud")
swanlab.log({"loss": 0.12})
run.finish()
```

### Local dashboard only

```python
import swanlab

run = swanlab.init(
    project="offline-demo",
    mode="local",
    logdir="./swanlog",
)

swanlab.log({"loss": 0.35, "epoch": 1})
run.finish()
```

View local logs:

```bash
swanlab watch ./swanlog
```

Sync a local run later:

```bash
swanlab sync ./swanlog
```

Or from Python:

```python
import swanlab

swanlab.sync("./swanlog")
```

## Common Issues

### `AttributeError` for media helpers

You are probably using an API name from an outdated example. In `0.7.11`, use:
- `swanlab.echarts.Line()` instead of the older raw-dictionary chart wrapper
- Local `torch.save(...)` plus metric/text logging instead of a non-existent generic file helper
- Scalar series or chart objects instead of a non-existent histogram helper

### `ImportError` for media logging

Install the media extras:

```bash
pip install "swanlab[media,dashboard]>=0.7.11"
```

### Self-hosted endpoint is ignored

Pass `host` to `swanlab.login(...)`, not `swanlab.init(...)`.

### Local runs need a dashboard

`mode="local"` writes logs locally. Use `swanlab watch ./swanlog` to inspect them, then `swanlab sync ./swanlog` when you want to upload.

## Resources

- [Official docs (Chinese)](https://docs.swanlab.cn)
- [Official docs (English)](https://docs.swanlab.cn/en)
- [GitHub repo](https://github.com/SwanHubX/SwanLab)
- [Self-hosted repo](https://github.com/SwanHubX/self-hosted)
- [Examples](https://github.com/SwanHubX/SwanLab/tree/main/examples)

## See Also

- [references/integrations.md](references/integrations.md) - Framework-specific examples
- [references/visualization.md](references/visualization.md) - Charts and media logging patterns
