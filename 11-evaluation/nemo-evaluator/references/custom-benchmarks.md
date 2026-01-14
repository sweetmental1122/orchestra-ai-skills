# Custom Benchmark Integration

NeMo Evaluator supports adding custom benchmarks and integrating proprietary datasets.

## Overview

Custom benchmarks can be added at three levels:

1. **Task-level**: Add tasks to existing harnesses
2. **Harness-level**: Integrate new evaluation frameworks
3. **Container-level**: Build custom evaluation containers

## Task-Level Customization

### Using Existing Harness with Custom Data

For harnesses that support custom datasets (like lm-evaluation-harness):

```yaml
evaluation:
  tasks:
    - name: custom_mmlu
      nemo_evaluator_config:
        config:
          task_config:
            dataset_path: /data/custom_mmlu.jsonl
            dataset_name: null  # Use file path instead of HF dataset
            num_fewshot: 5
```

### Custom Prompt Templates

Override default prompts for existing tasks:

```yaml
evaluation:
  tasks:
    - name: gsm8k
      nemo_evaluator_config:
        config:
          task_config:
            prompt_template: |
              Solve this math problem step by step:

              Question: {question}

              Show your work and give the final answer.
```

### Custom Metrics

Add custom scoring functions:

```yaml
evaluation:
  tasks:
    - name: custom_task
      nemo_evaluator_config:
        config:
          metrics:
            - name: exact_match
            - name: fuzzy_match
              config:
                threshold: 0.8
            - name: custom_metric
              config:
                script_path: /data/metrics/custom_scorer.py
```

## Framework Definition Files

Each evaluation harness uses Framework Definition Files (FDFs) to define tasks:

### FDF Structure

```yaml
# framework_def.yaml
name: custom-benchmark
version: 1.0.0

tasks:
  custom_task_1:
    description: "Custom evaluation task"
    endpoint_type: chat
    required_env_vars: []

    dataset:
      type: jsonl
      path: /data/custom_task_1.jsonl
      # OR
      huggingface:
        path: my-org/my-dataset
        split: test

    prompt:
      template: |
        {instruction}

        {input}
      input_fields:
        - instruction
        - input

    metrics:
      - type: exact_match
        field: expected_output
      - type: contains
        field: expected_output

    generation:
      max_new_tokens: 512
      temperature: 0.0
      stop_sequences:
        - "\n\n"
        - "###"
```

### Dataset Formats

**JSONL Format**:
```jsonl
{"instruction": "Solve the problem", "input": "2+2=?", "expected_output": "4"}
{"instruction": "Solve the problem", "input": "3+3=?", "expected_output": "6"}
```

**HuggingFace Dataset**:
```yaml
dataset:
  huggingface:
    path: my-org/my-dataset
    name: default       # Dataset config name
    split: test
    trust_remote_code: true
```

## Harness-Level Integration

### Adding New Evaluation Framework

Create a new harness by implementing the harness interface:

```python
# custom_harness/__init__.py
from nemo_evaluator.harness import BaseHarness, HarnessConfig

class CustomHarnessConfig(HarnessConfig):
    custom_param: str = "default"

class CustomHarness(BaseHarness):
    def __init__(self, config: CustomHarnessConfig):
        self.config = config

    def load_tasks(self) -> list[str]:
        """Return list of available task names."""
        return ["custom_task_1", "custom_task_2"]

    def run_task(self, task_name: str, model_fn, params: dict) -> dict:
        """Run evaluation for a single task."""
        # Load dataset
        dataset = self.load_dataset(task_name)

        # Run evaluation
        results = []
        for sample in dataset:
            prompt = self.format_prompt(sample)
            response = model_fn(prompt, **params)
            score = self.score_response(sample, response)
            results.append(score)

        # Aggregate metrics
        return {
            "accuracy": sum(results) / len(results),
            "total_samples": len(results)
        }
```

### Register Harness in mapping.toml

After creating a custom harness, add it to the task registry:

```toml
# Custom entry in mapping.toml
[custom-harness]
container = "my-registry/custom-harness:1.0"

[custom-harness.tasks.chat.custom_task_1]
required_env_vars = []

[custom-harness.tasks.chat.custom_task_2]
required_env_vars = ["CUSTOM_API_KEY"]
```

## Container-Level Customization

### Building Custom Evaluation Container

Create a Dockerfile for custom evaluation:

```dockerfile
# Dockerfile.custom-eval
FROM nvcr.io/nvidia/eval-factory/base:25.10

# Install custom harness
COPY custom_harness/ /opt/custom_harness/
RUN pip install /opt/custom_harness/

# Install custom dependencies
RUN pip install my-custom-package==1.0.0

# Copy framework definitions
COPY framework_def.yaml /opt/framework_def.yaml

# Copy custom datasets (or mount at runtime)
COPY data/ /opt/data/

# Set entrypoint
ENTRYPOINT ["nemo-evaluator"]
```

Build and push:
```bash
docker build -t my-registry/custom-eval:1.0 -f Dockerfile.custom-eval .
docker push my-registry/custom-eval:1.0
```

### Using Custom Container

Reference custom container in configuration:

```yaml
evaluation:
  tasks:
    - name: custom_task_1
      container_override: my-registry/custom-eval:1.0
```

Or update local mapping.toml:
```bash
# ~/.nemo-evaluator/mapping.toml
[custom-harness]
container = "my-registry/custom-eval:1.0"
```

## Proprietary Dataset Integration

### Secure Dataset Handling

For sensitive datasets, use volume mounts instead of baking into containers:

```yaml
execution:
  docker_args:
    - "-v /secure/data:/data:ro"

evaluation:
  tasks:
    - name: proprietary_benchmark
      nemo_evaluator_config:
        config:
          task_config:
            dataset_path: /data/proprietary.jsonl
```

### Dataset Format Requirements

All custom datasets should follow this schema:

```jsonl
{
  "id": "unique_id",
  "input": "The prompt or question",
  "expected_output": "The expected answer",
  "metadata": {
    "category": "optional category",
    "difficulty": "optional difficulty"
  }
}
```

### Dataset Validation

Validate dataset before evaluation:

```python
import json

def validate_dataset(path):
    required_fields = ["id", "input", "expected_output"]
    errors = []

    with open(path) as f:
        for i, line in enumerate(f):
            sample = json.loads(line)
            for field in required_fields:
                if field not in sample:
                    errors.append(f"Line {i+1}: missing '{field}'")

    if errors:
        raise ValueError(f"Dataset validation failed:\n" + "\n".join(errors))

    print(f"Dataset valid: {i+1} samples")
```

## Custom Metrics

### Built-in Metrics

| Metric | Description | Config |
|--------|-------------|--------|
| `exact_match` | Exact string match | `normalize: true` |
| `contains` | Substring match | `case_sensitive: false` |
| `regex_match` | Regex pattern match | `pattern: "..."` |
| `bleu` | BLEU score | `max_order: 4` |
| `rouge` | ROUGE score | `type: rouge-l` |
| `pass_at_k` | Code execution | `k: [1, 10, 100]` |

### Custom Metric Implementation

```python
# custom_metrics/my_metric.py
from nemo_evaluator.metrics import BaseMetric, MetricConfig

class MyMetricConfig(MetricConfig):
    threshold: float = 0.5

class MyMetric(BaseMetric):
    def __init__(self, config: MyMetricConfig):
        self.config = config

    def score(self, prediction: str, reference: str) -> float:
        """Return score between 0 and 1."""
        # Custom scoring logic
        similarity = compute_similarity(prediction, reference)
        return 1.0 if similarity >= self.config.threshold else 0.0

    def aggregate(self, scores: list[float]) -> dict:
        """Aggregate individual scores."""
        return {
            "accuracy": sum(scores) / len(scores),
            "total": len(scores),
            "passed": sum(1 for s in scores if s > 0)
        }
```

Register custom metric:

```yaml
evaluation:
  tasks:
    - name: custom_task
      nemo_evaluator_config:
        config:
          metrics:
            - name: custom_metric
              config:
                script_path: /data/custom_metrics/my_metric.py
                threshold: 0.8
```

## Testing Custom Benchmarks

### Local Testing

Test custom benchmark before production:

```bash
# Validate dataset
python validate_dataset.py /data/custom.jsonl

# Run with limited samples
nemo-evaluator-launcher run \
  --config-dir . \
  --config-name custom_config \
  -o +evaluation.nemo_evaluator_config.config.params.limit_samples=10

# Check results
cat results/<id>/custom_task/artifacts/results.yml
```

### Dry Run

Validate configuration without execution:

```bash
nemo-evaluator-launcher run \
  --config-dir . \
  --config-name custom_config \
  --dry-run
```

## Best Practices

1. **Version datasets**: Include version in dataset file names
2. **Document metrics**: Clearly document what each metric measures
3. **Reproducibility**: Pin all dependencies in container
4. **Validation**: Always validate datasets before evaluation
5. **Incremental testing**: Test with small samples first
6. **Secure handling**: Never bake sensitive data into containers

## Example: Complete Custom Benchmark

```yaml
# custom_benchmark_config.yaml
defaults:
  - execution: local
  - deployment: none
  - _self_

execution:
  output_dir: ./custom_results
  docker_args:
    - "-v /data/benchmarks:/benchmarks:ro"

target:
  api_endpoint:
    model_id: my-model
    url: http://localhost:8000/v1/chat/completions

evaluation:
  tasks:
    - name: domain_knowledge
      container_override: my-registry/domain-eval:1.0
      nemo_evaluator_config:
        config:
          task_config:
            dataset_path: /benchmarks/domain_v2.jsonl
          params:
            temperature: 0.0
            max_new_tokens: 256
          metrics:
            - name: exact_match
              config:
                normalize: true
            - name: custom_domain_score
              config:
                script_path: /benchmarks/metrics/domain_scorer.py
```
