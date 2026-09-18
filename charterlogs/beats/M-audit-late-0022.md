# M-audit-late-0022 — Pack P7: bounded round digests, plan coherence, saturation hygiene
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 241ec3a2 (2026-09-18 01:13): improvement-pack P7 (spec 07, `docs/advisory/2026-09-17-ufo-improvement-pack/07-round-cache-plan-digest-saturation.md`) — 48 files, +2291/-266. A new single-sourced `round_digest.rs` emits `ufo-round-digest-v1` per round at `.ufo/rounds/<runId>/r<NN>-digest.json` holding accepted/rejected as proposal hash references with reason codes, `lane_health`, `cost`, and `stop_evaluation`, under a 32768B default bound (fixture-overridable via `rounds.digestMaxBytes`, 1024..=1MiB), with declared `rejected_reason_counts` compression and post-compression overflow as a typed error, emitted atomically at mode 0600; the fixture loop emits after each round's stop outcome and the judge emits beside every native verdict (emission failure is typed, never swallowed). Plan coherence (spec 07 §4): the collector preserves the typed plan artifact in the evidence dir and carries additive v2 `plan_path` + `plan_wave_size` (digest<->path pairing mandatory, v1 freeze rejections), and the judge recomputes the plan digest, rejecting mismatches while naming both digests; wave-size drift lands `plan_wave_drift{declared, dispatched}` in verdict provenance — flagged, never a rejection. Saturation hygiene (spec 07 §5, D2a): the fixture loop mirrors the native clean-round rule caller-side so a degraded zero-accept round stays Running with additive `saturation_inconclusive` lane-health telemetry on the `IterationReport`, and fixes a cap-swallowing integration bug the drills caught (a degraded zero-accept FINAL round is `budget_halt`, never running beside exit 2), pinned by `saturation_demotion_preserves_the_round_cap`. Drills `d-digest-bound`, `d-plan-digest`, `d-plan-drift`, `d-sat-clean`, `d-sat-degraded` wired; `d-timeout`, `d-i3-lane-dies`, `d-i4-telemetry` re-pinned from the pre-spec-07 saturates-anyway expectation to the new contract (I3/I4 telemetry assertions intact) — the commit body records 49 pass / 11 pending-mechanism and gates.sh 21/21 PASS. Run-logic prose updated (§1 digest-chain cache mechanics, §4 `append_round_digest_and_continue`, §8 clean-round gate) and SKILL.md Planner-first binds the plan as evidence across the skill mirrors.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 241ec3a295c12be2764b05997c5b2aaa856902f6
```
Expected: commit resolves; subject `ufo pack P7: bounded round digests + plan coherence + saturation hygiene (spec 07)`; dated 2026-09-18.
Actual:
```
241ec3a295c12be2764b05997c5b2aaa856902f6|2026-09-18 01:13:48 -0300|ufo pack P7: bounded round digests + plan coherence + saturation hygiene (spec 07)
```

## Touches
- 241ec3a295c12be2764b05997c5b2aaa856902f6 — 48 files, +2291/-266. Key paths: `crates/ufo-core-runtime/src/round_digest.rs` (new, 204 lines), `crates/ufo-core-runtime/src/config.rs` (+119), `crates/ufo-core-runtime/src/loop_driver.rs` (+803), `crates/ufo-core-runtime/src/native_evidence.rs` (+375), `crates/ufo-core-runtime/src/native_tests.rs`, `crates/ufo-core-runtime/src/native.rs`, `crates/ufo-core-runtime/src/report.rs`, `crates/ufo-core-runtime/src/lib.rs`, `scripts/collect-omp-native-handoff.mjs` (+78), `tests/collect-omp-native-handoff.test.js`
- `drills/d-plan-digest.drill.json`, `drills/d-sat-clean.drill.json`, `drills/d-sat-degraded.drill.json` (new); `drills/d-digest-bound.drill.json`, `drills/d-plan-drift.drill.json`, `drills/d-timeout.drill.json`, `drills/d-i3-lane-dies.drill.json`, `drills/d-i4-telemetry.drill.json` (re-pinned)
- `docs/advisory/2026-09-17-ufo-improvement-pack/07-round-cache-plan-digest-saturation.md` (+46) — spec 07 touch
- `skills/ufo/SKILL.md`, `skills/ufo/references/run-logic.md` and packaged mirrors (`.cursor/`, `.omp/`, `packages/{codex,cursor,devin,grok,kimi,opencode,substrate-omp}/`), `skills/SHA256SUMS`, `ufo-deps.lock`

## Out-of-scope
- Other improvement-pack commits (beats M-audit-late-0016..0024)
- The recorded gates.sh / drill counts were not re-run in this audit beat; they are attributed to the commit body
- Whether the spec 07 prose is complete beyond the landed touch file

## Findings
- Commit body records drills 49 pass / 11 pending-mechanism and gates.sh 21/21 PASS (recorded, not re-run here).
- `rounds.digestMaxBytes` default 32768B, fixture-overridable 1024..=1MiB; overflow after compression is typed, not truncated.
- `plan_wave_drift` is provenance-only by design — wave-size drift never rejects a round.
- The saturation fix is an honest-failure correction: the drills caught a cap-swallowing integration bug where a degraded zero-accept FINAL round could run beside exit 2; `saturation_demotion_preserves_the_round_cap` pins the corrected contract.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 1d1f95d4623b86ce4b77330a55d04bd0bcfa28e2
- Next: M-audit-late-0023
