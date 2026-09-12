# M-scribe-grok-web-1713 — 6h charter beat
**Status:** COMPLETE (transcription only) | **Date:** 2026-09-12 | **Session:** grok-web

## Does
Landed the one-paragraph harvest overlay on the charter-ufo-fsd page. No completion claim.

## Gate
```bash
# executor evidence block
```
Expected: bit-exact `evidence:` from executor
Actual: Gate: BLOCKED — executor provided no evidence

## Touches
- `index.html` harvestNote `<p>` after `M-scribe-grok-web-0519` / `0520`
- operator constraint: plain text with optional `<b>`/`<code>` only; max 3 sentences
- operator named the truncated object: `the` (charter-ufo-fsd page, per prior beats)
- charter prior beat: `c287699705a2c7967e2115aebda521dff31ec6e8` (M-scribe-grok-web-1712)

## Out-of-scope
- locale JSON i18n of the new paragraph
- gold snapshot rewrite
- next-run.md edits
- recrown / parent close

## Findings
- operator named the truncated object: `the`
- overlay still injects after gold string `so the page never 404s.</p>`
- paragraph records pastes `9c24a942` dirty 138, `9685fa4c`, loop-state fixture/`round_cap`/0, `gates tail: FAIL`
- L1 crown = Kimi K3 Max since 2026-08-29; Gemini banned; parent goal OPEN

## Links
- Plan: next-run.md (read-only)
- Prior: M-scribe-grok-web-1712
- Next: M-scribe-grok-web-1714
