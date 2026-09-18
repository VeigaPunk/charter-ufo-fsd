# M-audit-late-0012 — Pack P2: per-lane deadlines, wave settle, dispatch idempotency (spec 02)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 7f08c003 (2026-09-17 17:01 -0300), "ufo pack P2: per-lane deadlines, wave settle, dispatch idempotency (spec 02)": 36 files, +4090/-382, implementing improvement-pack spec 02 across four surfaces. Runtime gains `RouteAttemptOutcome::LaneTimeout` with typed fixture deadline telemetry and the recorded D1a rule applied as exactly one same-identity retry for the distiller seat in the fixture loop, where a second stall leaves the round unsound without judgment. The judge (`crates/ufo-core-runtime/src/native.rs`, +792) gains a `lane_timeout` telemetry kind with the `lane_failure` field set and `critical:<role>` groups for core seats, deadline reciprocity in both directions derived from config deadlines, critical-seat `lane_timeout` invalidating the round for judgment, and `double_dispatch` rejection on a repeated `wave_token`. The collector binds `wave_token` to the pre-dispatch snapshot and adds typed `double_dispatch` and `missing_seats` rejections plus `lane_timeout` synthesis (an over-deadline seat becomes failed with a typed event, its proposal is excluded, and timed-out seats drop out of `correlated_unavailability`). The launcher anchors an `O_EXCL` pre-dispatch snapshot before dispatch, emits a `wave_token` context line, and pairs crash-resume state (the preflight keeps in-flight transcripts and wave state; the Main transcript is disambiguated by mtime) so that the same run-id always resumes and a fresh wave needs a fresh run-id. Config gains `nativeProfiles.omp-native-v1.deadlines` with six seat-class tiers and `orchestratorMs` 7200000, deliberately under the launcher's 2h5m hard bound; drills D-timeout, D-timeout-critical (x2), D-settle, D-double and D-idem are added, and the commit body records "gates.sh 20/20 PASS" (attributed to the body, not re-run here).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 7f08c003
```
Expected: commit resolves; subject `ufo pack P2: per-lane deadlines, wave settle, dispatch idempotency (spec 02)`; dated 2026-09-17.
Actual:
```
7f08c003be21bed8d84913e0e82c130dff6f4334|2026-09-17 17:01:21 -0300|ufo pack P2: per-lane deadlines, wave settle, dispatch idempotency (spec 02)
```

## Touches
- 7f08c003be21bed8d84913e0e82c130dff6f4334 — 36 files, +4090/-382. Key paths: `crates/ufo-core-runtime/src/native.rs` (+792), `crates/ufo-core-runtime/src/loop_driver.rs`, `crates/ufo-core-runtime/src/state.rs`, `crates/ufo-core-runtime/bundled/config.json`, `config/ufo.json` (`deadlines` block, 9 lines), `scripts/collect-omp-native-handoff.mjs` (+351), `scripts/run-omp-native-trial.mjs`, `fixtures/loop_specialist.py`, `skills/ufo/references/run-logic.md` (§4.1 LaneTimeout arm, §4.2 post-hoc deadline admission + idempotency, §4.3 settle definition) plus `skills/ufo/SKILL.md` and every packaged mirror, `tests/collect-omp-native-handoff.test.js`, `tests/omp-wave-context.test.js`, `tests/run-omp-native-trial.test.js`
- `docs/advisory/2026-09-17-ufo-improvement-pack/02-dispatch-deadlines-and-atomicity.md` — the governing spec; edited in this commit (134 insertions / 45 deletions) with the spec 02 data-walk corrections, so spec and implementation land together
- `docs/advisory/2026-09-17-ufo-improvement-pack/DECISIONS.md` (landed one commit earlier in fbfd8767) — the recorded D1a rule this commit implements

## Out-of-scope
- P0/P1 staging and the re-charter bytes (fbfd8767, beat 0011); sibling pack specs 03-16 (beats 0013-0024)
- Re-running `scripts/gates.sh`, the drills, or `cargo` (mission constraint); the "gates.sh 20/20 PASS" line is attributed to the commit body
- Untracked `.ufo/` run state produced by the fixture drills

## Findings
- Routing pins are untouched by this commit: the `config/ufo.json` diff is confined to the added `deadlines` block (9 lines), so the 2026-09-15 re-charter bytes carried forward unchanged.
- The `deadlines` block's own `note` records the rationale that deadline exceed is `lane_timeout` telemetry — never a capacity event and never a route-chain advance (I6) — and that `orchestratorMs` is 7200000 because the launcher's `OMP_RUN_TIMEOUT_MS` (2h5m, `scripts/run-omp-native-trial.mjs:85-91`) would otherwise kill a longer-bounded orchestrator lane first, leaving a 4h draft value as dead code; it also maps seat classes: main to `orchestratorMs`, planner to `plannerMs`, distiller to `distillerMs`, labrat to `labratMs`, thinking proposal roles (critic, connector, revenger, reviewer, sentinel) to `thinkingMs`, mechanical proposal roles (executor, mutation-tester, scout, simplifier, scribe) to `mechanicalMs`.
- The governing spec resolves at this commit (`git cat-file -t 7f08c003:docs/advisory/2026-09-17-ufo-improvement-pack/02-dispatch-deadlines-and-atomicity.md` → `blob`) and is modified here, so the spec text and the implemented behavior are in the same commit.
- The commit body records `gates.sh 20/20 PASS`, the same recorded figure as the P0/P1 commit; it was not independently re-run in this audit.
- D1a as applied here is exactly one same-identity, same-route retry with typed telemetry for a critical seat; `DECISIONS.md` records the same rule for the critical set (planner, probeParent, labrat, distiller) with capacity-chain semantics unchanged.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: fbfd87674ad8cd9a11cce3775c0506c766ce9cb8
- Next: M-audit-late-0013
