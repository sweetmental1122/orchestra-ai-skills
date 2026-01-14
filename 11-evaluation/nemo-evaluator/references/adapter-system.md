# Adapter and Interceptor System

NeMo Evaluator uses an adapter system to process requests and responses between the evaluation engine and model endpoints.

## Architecture Overview

```
┌───────────────────────────────────────────────────────────────┐
│                     Adapter Pipeline                           │
│                                                                │
│  Request  ───►  [Interceptor 1]  ───►  [Interceptor 2]  ───►  │
│                                                                │
│                        │                      │                │
│                        ▼                      ▼                │
│                  ┌───────────────────────────────────┐         │
│                  │         Model API Endpoint         │        │
│                  │     /v1/chat/completions           │        │
│                  └───────────────────────────────────┘         │
│                                                                │
│  Response  ◄───  [Interceptor 3]  ◄───  [Interceptor 4]  ◄─── │
│                                                                │
└───────────────────────────────────────────────────────────────┘
```

## Request Interceptors

### System Message Interceptor

Injects a system message into chat requests:

```yaml
adapter_config:
  interceptors:
    - name: system_message
      config:
        system_message: "You are a helpful assistant. Answer concisely."
```

**Effect**:
```json
// Before
{
  "messages": [
    {"role": "user", "content": "What is 2+2?"}
  ]
}

// After
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant. Answer concisely."},
    {"role": "user", "content": "What is 2+2?"}
  ]
}
```

### Request Logging Interceptor

Logs outbound requests for debugging:

```yaml
adapter_config:
  interceptors:
    - name: request_logging
      config:
        max_logged_requests: 100
        log_path: "./logs/requests.jsonl"
        log_full_content: true  # Include full message content
        redact_patterns:        # Redact sensitive data
          - "api_key"
          - "password"
```

### Caching Interceptor

Caches responses to avoid repeated API calls:

```yaml
adapter_config:
  interceptors:
    - name: caching
      config:
        cache_dir: "./cache"
        cache_ttl: 3600           # TTL in seconds (0 = forever)
        cache_key_fields:          # Fields to use in cache key
          - "messages"
          - "temperature"
          - "model"
```

**Cache key generation**:
- Hash of request content (messages, model, temperature)
- Stored as JSON files in cache directory
- Cache hits skip API call entirely

## Response Interceptors

### Reasoning Extractor Interceptor

Extracts and optionally removes reasoning tokens from responses:

```yaml
adapter_config:
  interceptors:
    - name: reasoning
      config:
        start_reasoning_token: "<think>"
        end_reasoning_token: "</think>"
        strip_reasoning: true     # Remove from final output
        store_reasoning: true     # Save reasoning separately
```

**Effect**:
```json
// Original response
{
  "content": "<think>Let me calculate step by step. 2+2 is basic addition.</think>The answer is 4."
}

// After processing (strip_reasoning: true)
{
  "content": "The answer is 4.",
  "reasoning": "Let me calculate step by step. 2+2 is basic addition."
}
```

### Response Logging Interceptor

Logs API responses:

```yaml
adapter_config:
  interceptors:
    - name: response_logging
      config:
        max_logged_responses: 100
        log_path: "./logs/responses.jsonl"
        log_metrics: true         # Include latency, token counts
```

### Progress Tracking Interceptor

Reports evaluation progress:

```yaml
adapter_config:
  interceptors:
    - name: progress_tracking
      config:
        report_interval: 10       # Report every N samples
        output_path: "./progress.jsonl"
```

## Interceptor Chain Execution

Interceptors execute in order defined:

```yaml
adapter_config:
  interceptors:
    # Request processing order (top to bottom)
    - name: system_message      # 1. Add system message
    - name: request_logging     # 2. Log request
    - name: caching             # 3. Check cache (may skip API)

    # Response processing order (bottom to top after API call)
    - name: reasoning           # 4. Extract reasoning
    - name: response_logging    # 5. Log response
    - name: progress_tracking   # 6. Update progress
```

## Custom Interceptors

Create custom interceptors by implementing the `Interceptor` interface:

```python
from nemo_evaluator.adapters.base import Interceptor, InterceptorConfig
from nemo_evaluator.api import Request, Response

class MyInterceptorConfig(InterceptorConfig):
    custom_param: str = "default"

class MyInterceptor(Interceptor):
    def __init__(self, config: MyInterceptorConfig):
        self.config = config

    def process_request(self, request: Request) -> Request:
        """Process outbound request before API call."""
        # Modify request as needed
        return request

    def process_response(self, response: Response, request: Request) -> Response:
        """Process inbound response after API call."""
        # Modify response as needed
        return response
```

Register custom interceptor:

```python
from nemo_evaluator.adapters.registry import register_interceptor

@register_interceptor("my_interceptor")
class MyInterceptor(Interceptor):
    ...
```

## Error Handling

Configure error handling behavior:

```yaml
adapter_config:
  # Retry configuration
  retry_on_failure: true
  max_retries: 3
  retry_delay: 1.0            # Seconds between retries
  retry_backoff: 2.0          # Exponential backoff multiplier

  # Logging
  log_failed_requests: true
  error_log_path: "./logs/errors.jsonl"

  # Timeout
  request_timeout: 300        # Seconds
```

### Retry Logic

```
Request fails ───► Retry 1 (delay: 1s) ───► Retry 2 (delay: 2s) ───► Retry 3 (delay: 4s) ───► Fail
```

Retryable errors:
- HTTP 429 (Rate Limit)
- HTTP 500-599 (Server Errors)
- Connection timeouts
- Network errors

Non-retryable errors:
- HTTP 400 (Bad Request)
- HTTP 401 (Unauthorized)
- HTTP 403 (Forbidden)

## Structured Logging

The adapter system uses structured logging with automatic redaction:

```python
# Logs are written as structured JSON
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "INFO",
  "event": "api_request",
  "model_id": "llama-3.1-8b",
  "latency_ms": 1234,
  "tokens_in": 50,
  "tokens_out": 100,
  "status": "success"
}
```

### Redaction

Sensitive data is automatically redacted:

```yaml
adapter_config:
  redaction:
    enabled: true
    patterns:
      - "api_key"
      - "password"
      - "token"
      - "secret"
    replacement: "[REDACTED]"
```

## OpenAI API Compatibility

The adapter system supports OpenAI-compatible endpoints:

### Chat Completions

```yaml
target:
  api_endpoint:
    type: chat
    url: http://endpoint/v1/chat/completions
```

Request format:
```json
{
  "model": "model-name",
  "messages": [
    {"role": "user", "content": "Hello"}
  ],
  "temperature": 0.7,
  "max_tokens": 512
}
```

### Text Completions

```yaml
target:
  api_endpoint:
    type: completions
    url: http://endpoint/v1/completions
```

Request format:
```json
{
  "model": "model-name",
  "prompt": "Hello",
  "temperature": 0.7,
  "max_tokens": 512
}
```

### Vision-Language Models

```yaml
target:
  api_endpoint:
    type: vlm
    url: http://endpoint/v1/chat/completions
```

Request format:
```json
{
  "model": "model-name",
  "messages": [
    {
      "role": "user",
      "content": [
        {"type": "text", "text": "What's in this image?"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,..."}}
      ]
    }
  ]
}
```

### Embeddings

```yaml
target:
  api_endpoint:
    type: embedding
    url: http://endpoint/v1/embeddings
```

Request format:
```json
{
  "model": "model-name",
  "input": ["text to embed"]
}
```

## Debugging Adapters

### Enable Debug Logging

```yaml
adapter_config:
  debug: true
  debug_log_path: "./logs/debug.jsonl"
```

### Inspect Request/Response

```bash
# View logged requests
cat ./logs/requests.jsonl | jq .

# View logged responses
cat ./logs/responses.jsonl | jq .

# View errors
cat ./logs/errors.jsonl | jq .
```

### Common Issues

**Issue: System message not applied**

Ensure interceptor is in list:
```yaml
interceptors:
  - name: system_message
    config:
      system_message: "..."
```

**Issue: Cache not working**

Check cache directory exists and is writable:
```bash
ls -la ./cache/
```

**Issue: Reasoning not extracted**

Verify token patterns match model output:
```yaml
# For models using <think> tags
start_reasoning_token: "<think>"
end_reasoning_token: "</think>"

# For models using <reasoning> tags
start_reasoning_token: "<reasoning>"
end_reasoning_token: "</reasoning>"
```
