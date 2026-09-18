# M-audit-late-0020 — Pack P5-axes: executable axes + subjective-axis protocol (spec 05 + A-05)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 5bd0584d (2026-09-17 23:01 -0300): the P5-axes pack lane (spec 05 + A-05) — `Axis.measurement` frozen with the axis set so the content hash covers it, with three kinds (executable = a bounded subprocess check usable in the fixture loop only; evidence = native-only and judge-computed from handoff evidence; subjective = a two-sided symmetric argument, otherwise the claim clamps to baseline plus a flag), an absent measurement failing validation by naming the axis ("unmeasurable axes are not axes"), proposals gaining OPTIONAL `subjective_axes` and `candidate_writes` (bounded 64 files / 256KiB decoded, canonical hand-rolled base64, repo-relative paths shared with `touched_paths`, v1 freeze rejections on the native path), the new `axis_checks.rs` running bounded scratch copies (256MiB budget, `.git`/`target`/`node_modules`/`.ufo` excluded, 1MiB file cap with budget exceedance reported as UNKNOWN rather than a panic), candidate-write application with escape refusal, and `sh -c` checks under a scrubbed env, process group, deadline and bounded output, baseline measured once per wave, and the judge's effective-score pre-pass letting a computed delta override advisory claims on executable axes (CONTRADICTED records carrying both raw metrics), UNKNOWN clamping to baseline (never regression cover, never phantom gain), a material UNKNOWN producing `GateDecision::RejectInsufficientEvidence`, and the subjective protocol shared by both paths. Why: the pack's Pareto-admissibility rule becomes a computed claim wherever an axis is executable and an explicitly argued symmetric claim everywhere else, closing the Goodhart gap between movement and improvement.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 5bd0584d
```
Expected: commit resolves; subject `ufo pack P5-axes: executable axes + subjective-axis protocol (spec 05 + A-05)`; dated 2026-09-17.
Actual:
```
5bd0584d34c105a2a2ce9d0c7126948ba68551c0|2026-09-17 23:01:21 -0300|ufo pack P5-axes: executable axes + subjective-axis protocol (spec 05 + A-05)
```

## Touches
- 5bd0584d34c105a2a2ce9d0c7126948ba68551c0 — 56 files, +2996/-969. Key paths: `crates/ufo-core-runtime/src/axis_checks.rs` (new, 490 lines), `axes.rs` (+291), `loop_driver.rs` (+726), `proposal.rs` (+197), `native.rs`, `native_tests.rs` (+283), `report.rs`, `gate.rs`, `config.rs`, `crates/ufo-core-runtime/tests/conformance.rs`, `crates/ufo-core-runtime/tests/loop_driver.rs`, `conformance/vectors/config/validators.json` (453 lines changed), `conformance/fixtures/native-handoff/handoff.json` (-687) with `planner-01-transcript.jsonl` / `distiller-01-transcript.jsonl`, `drills/d-axis-exec.drill.json`, `drills/d-axis-override.drill.json`, `drills/d-axis-subjective.drill.json`, `drills/d-axis-unmeasured.drill.json`, `drills/d-axis-phase0.drill.json`, `drills/d-herd.drill.json`, `drills/fixtures/loop_specialist.py` (new) + `fixtures/loop_specialist.py` (new), `scripts/collect-omp-native-handoff.mjs`, `scripts/run-omp-native-trial.mjs`, `skills/ufo/SKILL.md` (+5) and `skills/ufo/references/run-logic.md` (+20) with all packaged mirrors, `skills/SHA256SUMS`, `ufo-deps.lock`
- `docs/advisory/2026-09-17-ufo-improvement-pack/05-executable-axes.md` (new, 41 lines) and `docs/advisory/2026-09-17-ufo-improvement-pack/16-amendments-to-specs-00-09.md` (+15) — the spec lane this commit lands
- `k28asia-plan.md` (new, 72 lines, repo root) — unrelated stray planning file; see Findings

## Out-of-scope
- The sibling pack lanes P5-membrane (commit 52898c0b, beat M-audit-late-0019) and P6 (commit 1d1f95d4, beat M-audit-late-0021)
- The k28asia mission content itself (its planning prose is outside the improvement-pack contract docs)
- Any re-execution of the recorded gates or drills (audit is read-only)

## Findings
- `k28asia-plan.md` (72 lines) landed at repo root in this commit — an "Asian-Source Intelligence Sweep Plan" scoping a Kimi 2.8 Preview source-density mission with sibling lanes: a stray planning file outside the contract docs structure, unrelated to the P5-axes spec lane. `git show 5bd0584d --stat -- k28asia-plan.md` shows a single pure addition (`1 file changed, 72 insertions(+)`)`, the path's only commit in history, and it is still present at HEAD (`git cat-file -e HEAD:k28asia-plan.md` succeeds).
- Verdict and report fields are additive (`axis_measurements` + `subjective_flags` on the fixture path, `axis_kinds` + `subjective_flags` on the native path), omitted when empty; existing digests stay byte-identical, pinned by a test (commit body).
- The commit body records that the phase exposed two pre-existing drill couplings, both fixed here: the regenerated native fixture carries repo-relative evidence paths again (absolute paths had bypassed the drill shadow patch), and `d-herd` declares subjective measurements.
- Recorded gates for this commit: `gates.sh 21/21 PASS`; drills 41 pass / 13 pending-mechanism (commit body).
- `candidate_writes` never serializes when absent and shares repo-relative path validation with `touched_paths` (commit body).

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 52898c0ba465b7772964db0bb7f62f0ef0e0dc8c
- Next: M-audit-late-0021
