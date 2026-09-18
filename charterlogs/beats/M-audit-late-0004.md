# M-audit-late-0004 — Dispatcher retryability, envelope /ufo line, wall-lock TOCTOU + conformance expansion
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for the late 2026-09-11 fixes plus the conformance corpus. b19d5d5f hoists the retryable-launch-code check ahead of failure classification for fresh dispatches (`scripts/fleet-dispatcher.mjs`), with a regression test in `tests/fleet-dispatcher.test.js`; durable-stopped and resume paths are unchanged (the commit body states the D20 pins hold). 3c728860 relaxes the canonical Godspeed envelope so a queue prompt may open with exactly one literal `/ufo` line before the directive bytes (a `/ufo` prefix that is not followed by a newline is still rejected, and the digest keeps binding the raw file bytes), makes the sighting operation lock treat a lock directory vanishing between the EEXIST and the follow-up stat as a lost race to retry instead of crashing `complete`, bounds mission-status row reads (4 MiB file / 8 KiB row / 2048 rows; an unobserved `source` becomes null), adds `scripts/ufo-native-names.mjs`, and lands the conformance corpus — 16 `conformance/vectors/**` files (exit round-stop truth table, handoff agent-gates / dispatch-topology / proposals-topology / correlated-unavailability, native classify-failure / omp-route-yaml / route-family, proposal admit-receipts, retry advance-matrix / lane-continue, rules audit, godspeed inject, config validators, misc pure-validators / receipt-digests), 31 `conformance/fixtures/native-handoff/**` files (ten seats × assignment/artifact/transcript + `handoff.json`), `crates/ufo-core-runtime/tests/native_handoff.rs` and `tests/native_support/mod.rs` — with `CODEOWNERS`, `README.md`, 42 `docs/` files and package manifests reconciled in the same commit (108 files, +7655/-214). e8695602 folds in as the one-line continuity-night lessons entry in `docs/L2-L3-ROUTING.md`. Why: the b19d5d5f body names live production evidence — continuation successors died as `budget_halt_timeout` when the wall launch timed out busy because `WALL_BUSY` was declared retryable but unreachable behind the pause-gated check — so the fix corrects code to the already-declared retry contract instead of inventing new behavior.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' e8695602 b19d5d5f 3c728860
```
Expected: three commits resolve; subjects `docs: continuity night lessons in L2-L3 routing log`, `fix(dispatcher): retryable launch codes outrank failure class on fresh dispatch`, `fix: envelope /ufo invocation line + wall lock TOCTOU + wall-busy retryability`; all dated 2026-09-11.
Actual:
```
3c72886012109c935519d1f767d54192141d61df|2026-09-11 22:47:21 -0300|fix: envelope /ufo invocation line + wall lock TOCTOU + wall-busy retryability
b19d5d5fc613c799200e1f4ed39cbf7cab424834|2026-09-11 22:02:15 -0300|fix(dispatcher): retryable launch codes outrank failure class on fresh dispatch
e8695602d6317206e37182d3277ab6d38f108c3d|2026-09-11 21:47:40 -0300|docs: continuity night lessons in L2-L3 routing log
```

## Touches
- b19d5d5fc613c799200e1f4ed39cbf7cab424834 — 2 files, +33/-12: `scripts/fleet-dispatcher.mjs` (retryable launch-code hoist for fresh dispatches), `tests/fleet-dispatcher.test.js` (+19 regression coverage)
- 3c72886012109c935519d1f767d54192141d61df — 108 files, +7655/-214. Key paths: `scripts/fleet-dispatcher.mjs` (leading `/ufo` envelope relaxation), `scripts/ufo-sighting.mjs` (lock TOCTOU retry + bounded status-row reads), `scripts/ufo-native-names.mjs` (new), `conformance/vectors/**` (16 files), `conformance/fixtures/native-handoff/**` (31 files), `crates/ufo-core-runtime/tests/native_handoff.rs` (new), `crates/ufo-core-runtime/tests/native_support/mod.rs` (new), `crates/ufo-core-runtime/tests/conformance.rs`, `crates/ufo-core-runtime/src/native.rs`, `CODEOWNERS`, `README.md`, `docs/**` (42 files), `fixtures/loop_specialist.py`, `scripts/{run-omp-native-trial,ufo-mission-lifecycle,ufo-mission-observation,collect-omp-native-handoff}.mjs`, `packages/*/package.json`
- e8695602d6317206e37182d3277ab6d38f108c3d — 1 file, +1: `docs/L2-L3-ROUTING.md`
- `docs/L2-L3-ROUTING.md` — `2026-09-12 continuity night` entry: membrane live, round budgets 8/6/8/6, lessons on daemon restart, prompt_drift, receipt source-byte binding, blocked-row scope tokens, per-dispatch manifest overlay

## Out-of-scope
- The 2026-09-12 swe-everywhere flatten and fleet-field gate changes (7c1f9468, `9685fa4c`; beats 0005 and 0006)
- The 2026-09-17/18 improvement-pack conformance expansion (beats 0011-0024)
- Whether every queued charter honored the one-line `/ufo` prefix (no repo-wide evidence collected here)
- Re-running the conformance runner or the project gate set

## Findings
- The `/ufo` relaxation is source-anchored: the new code comment dates the operator directive 2026-09-12, while the commit itself is 2026-09-11 22:47 -0300 (2026-09-12 01:47 UTC).
- The native-handoff fixture set covers ten seats — connector, critic, distiller, executor, labrat, main, planner, reviewer, scout, sentinel — with three files each plus `handoff.json`; `handoff.json` likewise carries ten agents, so the "14 handoff seats" phrasing in the L1 orientation does not match the landed fixture set.
- The wall-lock fix rewrites the stale-lock probe so the follow-up `stat` failure is caught and the owner loop retries; the same commit also narrows the status-row reader (row-level 8 KiB / 2048-row caps) and stops defaulting `source` to `manifest`.
- Both fix commits record the project gate set as landed ("Gates: ALL COMPLETE"); that claim is attributed to the commit bodies, not re-run in this audit.
- e8695602 is doc-only (+1 line) and is folded here because it logs the 2026-09-12 continuity night that this cluster's two fixes immediately followed.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: de585c7045815ba20ce306c0a9bc991c36448c66
- Next: M-audit-late-0005
