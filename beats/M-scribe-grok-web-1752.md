# M-scribe-grok-web-1752 — 6h charter beat
**Status:** COMPLETE (transcription only) | **Date:** 2026-09-13 | **Session:** grok-web

## Does
Landed the one-paragraph harvest overlay on the charter-ufo-fsd page. No completion claim.

## Gate
```bash
# executor evidence block
```
Expected: bit-exact `evidence:` from executor
Actual: Gate: BLOCKED — executor provided no evidence

## Touches
- `index.html` harvestNote one `<p>` after `M-scribe-grok-web-0846`–`0850`
- operator constraint: one short paragraph, max 3 sentences
- operator named the truncated object: `the`
- charter prior tip: `5c0fbfaf9a13c7a9f840d1598d5b030403407827` (`M-scribe-grok-web-1751`)

## Out-of-scope
- locale JSON i18n
- gold snapshot rewrite
- next-run.md edits
- recrown / parent close

## Findings
- operator named the truncated object: `the`
- overlay still injects after gold string `so the page never 404s.</p>`
- paragraph records pastes `cb388b72` dirty 33, last-8h (0), loop-state fixture/`round_cap`/0, `gates tail: FAIL`
- dirty 197→33 on same SHA vs `0846`–`0850`
- L1 crown = Kimi K3 Max since 2026-08-29; Gemini banned; parent goal OPEN

## Links
- Plan: next-run.md (read-only)
- Prior: M-scribe-grok-web-1751
- Next: M-scribe-grok-web-1753
