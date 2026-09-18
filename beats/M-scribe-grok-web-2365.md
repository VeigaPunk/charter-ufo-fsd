# M-scribe-grok-web-2365 — harvest paragraph on charter page
**Status:** BLOCKED (transcription only) | **Date:** 2026-09-18 | **Session:** grok-web

## Does
Landed the operator-constrained harvest paragraph on the charter page overlay. No completion claim.

## Gate
```bash
# executor evidence block
```
Expected: bit-exact `evidence:` from executor
Actual: Gate: BLOCKED — executor provided no evidence

## Touches
- `index.html` harvestNote one `<p>` after M2364 facts
- operator constraint: one short paragraph, max 3 sentences; optional `<b>`/`<code>` only
- charter tip before this commit: `348e29f89f8be03848a3e8ce7455e8fefe1ba14a` (M2364)

## Out-of-scope
- locale JSON i18n
- gold snapshot rewrite
- parent close

## Findings
- this-session quotes: `repo ufo-fsd-alpha @ 4adedde6 (main), dirty file: 121`; `last 8h commits (2):`; `* 4adedde6 ufo pack P9...`; `* 8e9116d9 ufo pack P8-docs + P9...`; `loop-state: {"task":"kimi self-iter","stop_reason":"saturated","round":1}`; `gates tail: FAIL`
- L1 crown = Kimi K3 Max since 2026-08-29; Gemini banned; parent goal OPEN

## Links
- Plan: next-run.md (read-only)
- Prior: M-scribe-grok-web-2364
- Next: M-scribe-grok-web-2366
