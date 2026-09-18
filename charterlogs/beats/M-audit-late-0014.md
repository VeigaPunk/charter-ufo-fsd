# M-audit-late-0014 — Pack PC-B: spec 10 resilient profile — attempt ledger + authorized capacity hops
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 1bddc7b3 (2026-09-17 18:28 -0300): pack PC-B admits a third judge handoff profile `omp-native-resilient-v1` — the v2 schema plus an additive optional `attempt_ledger` that is required for any seat whose completion involved a route hop; ledger entries are validated for declared-in-order chain hops, capacity-only `typed_failure` causes, frozen scope/assignment hash identity across attempts, final-attempt evidence gates, and exact declared effort per hop, where any mismatch is the typed `effort_unverifiable` rejection (T07) rather than silent clamping; `attempt_ledger` under v1/v2 is a typed rejection naming the freeze, and hop evidence with no ledger entry rejects even under resilient (T05); the collector reconstructs per-seat route continuity from transcripts and emits the ledger only under the resilient profile, while strict profiles keep the documented T03 die and unreconstructable hops die naming the missing evidence; the launcher takes `--profile omp-native-v2|omp-native-resilient-v1` (default strict v2) pinned into the launch manifest and policy inputs; `config/ufo.json` carries `nativeProfiles.omp-native-resilient-v1` as a one-hop extends pointer over `omp-native-v1`, no copied constants.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 1bddc7b3
```
Expected: commit resolves; subject `ufo pack PC-B: spec 10 resilient profile — attempt ledger + authorized capacity hops`; dated 2026-09-17.
Actual:
```
1bddc7b30fbd7ec40191f661565df95783a44f8e|2026-09-17 18:28:21 -0300|ufo pack PC-B: spec 10 resilient profile — attempt ledger + authorized capacity hops
```

## Touches
- 1bddc7b30fbd7ec40191f661565df95783a44f8e — 23 files, +3085/-154. Key paths: `crates/ufo-core-runtime/src/native.rs` (third-profile admission, ledger validation, T03/T05/T07 rejections), `crates/ufo-core-runtime/src/native_tests.rs` (ledger admission/rejection vectors), `crates/ufo-cli/src/main.rs` (`--profile` plumbing), `scripts/collect-omp-native-handoff.mjs` (ledger reconstruction under resilient only), `scripts/run-omp-native-trial.mjs`, `config/ufo.json`, `crates/ufo-core-runtime/bundled/config.json`, `crates/ufo-core-runtime/src/lib.rs`, `skills/ufo/references/run-logic.md` (+ all packaged mirrors)
- `docs/advisory/2026-09-17-ufo-improvement-pack/10-fallback-admissibility-and-effort.md` (§4.2 admission-profiles; sections marked landed including the T03–T07 fixture-variant map)
- Tests: `tests/collect-omp-native-handoff.test.js`, `tests/run-omp-native-trial.test.js`

## Out-of-scope
- Commits 4043a7e7 (PC-A, beat 0013) and c166c8cd (PC-C, beat 0015)
- Later packs (P3 and onward, beats M-audit-late-0016..0024)
- Deciding whether resilient is the right default — strict v2 stays the default by construction; the resilient profile is the operator re-charter path
- Re-running the recorded suite; this beat's gate is the commit pointer only

## Findings
- Ledger validation is closed by construction: entries must declare chain hops in order, only capacity-caused `typed_failure` reasons are admissible, scope/assignment hashes must be identity-stable across attempts, the final attempt must satisfy evidence gates, and per-hop effort must match exactly — mismatches are typed rejections, never clamped.
- Strict profiles retain the documented T03 die: `role <role> completed with route continuity; exact-primary evidence cannot include continuity`.
- T05 (hop evidence with no ledger entry) rejects under the resilient profile too; resilience admits declared hops, not undeclared ones.
- The resilient config entry extends `omp-native-v1` (one-hop), so the bundled and repo configs carry a pointer rather than duplicated constants.
- Commit body records `gates.sh 20/20 PASS` (recorded, not re-run by this audit).

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 4043a7e72b7791f6a7eb67083150e1ae4a78f2e0
- Next: M-audit-late-0015
