---
applyTo: "backend/**"
---

# Backend — API Stability & Data Semantics

## Why This File Exists

* The dashboard depends on a small set of backend endpoints with strict response shapes.
* Most frontend regressions come from silent contract drift, not rendering code.
* Deterministic responses improve testability and reduce noisy diffs.

## Endpoint Contract Rules

* Preserve existing endpoints unless a task explicitly includes a breaking change plan:
  * `GET /api/menu`
  * `GET /api/menu/timeseries`
  * `GET /api/menu/timeseries/daily`
* Preserve top-level response keys for time-series endpoints: `snapshots`, `filters`, `dimensions`.
* Preserve field naming conventions and case in payloads (`itemName`, `weekStart`, `day`, `quadrant`).

## Query & Validation Rules

* Parse and validate numeric query params (`weeks`, `days`) before use.
* Reject invalid ranges or malformed numeric params with a clear `400` response.
* Keep filtering behavior explicit and predictable (no hidden defaults beyond documented behavior).

## Determinism & Ordering

* Keep generated series deterministic for the same inputs.
* Return list-like fields in stable order (for example, sorted ISO dates and deduped dimensions).

## Cross-Repo Synchronization

* If backend payload shape changes, update dashboard hooks/components and docs in the same change.
* Keep category and naming semantics aligned with scoped mock-data instructions.
