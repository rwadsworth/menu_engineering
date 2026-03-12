---
applyTo: "docs/**,dashboard/src/pages/docs/**"
---

# Documentation — Schema & Contract Sync

## Why This File Exists

* This repo has two documentation surfaces: Markdown docs and rendered dashboard docs pages.
* API and data-shape edits can quickly make one surface stale if updates are not paired.
* Documentation is used as implementation guidance, so examples must be contract-accurate.

## Synchronization Rules

* When API payload fields or endpoint shapes change, update both:
  * `docs/**` Markdown schema docs
  * `dashboard/src/pages/docs/**` rendered docs pages
* Keep sample payloads aligned with real key names and casing from backend responses.
* Keep the Bella Napoli domain language and menu taxonomy consistent with mock-data instructions.

## Documentation Quality Rules

* Prefer explicit field definitions with type and meaning over prose-only descriptions.
* Include at least one minimal valid sample payload for each documented endpoint/entity.
* Do not document speculative fields as required; mark optional fields clearly.
* Keep naming stable across files (`menu_item_id` in source docs vs. `itemName` in API response docs).

## Change Checklist

* If a docs update references endpoint behavior, verify that behavior in backend code before finalizing.
* If a schema update changes consumer expectations, include corresponding dashboard/backend edits in the same PR.
