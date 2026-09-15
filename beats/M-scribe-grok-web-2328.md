# M-scribe-grok-web-2328 — harvest paragraph
**Status:** COMPLETE (transcription only) | **Date:** 2026-09-15 | **Session:** grok-web

## Does
Replaced the harvest overlay paragraph with a three-sentence record of beats 2324–2327. No completion claim.

## Gate
```bash
# executor evidence block
```
Expected: bit-exact `evidence:` from executor
Actual: Gate: BLOCKED — executor provided no evidence

## Touches
- `index.html` harvestNote `<p class="thread-note rv" data-i18n="s3.scribeBeat">` inside `<!-- charter-scribe-beat -->`
- operator constraint: one short paragraph, max 3 sentences, for `the` (charter-ufo-fsd page)
- prior charter tip: `90db09bb174dc0d307ec826668138652b33be49e` (M2327)

## Out-of-scope
- locale JSON i18n of the paragraph
- gold snapshot rewrite
- next-run.md edits
- recrown / parent close

## Findings
- paragraph text cites operator quotes from M2324–M2327 only
- L1 crown = Kimi K3 Max since 2026-08-29; Gemini banned; parent goal OPEN

## Links
- Plan: next-run.md (read-only)
- Prior: M-scribe-grok-web-2327
- Next: M-scribe-grok-web-2329
