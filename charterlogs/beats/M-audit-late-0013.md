# M-audit-late-0013 — Pack PC-A: omp-native-v2 evidence backbone, A-07 typed round plan, outcome triple
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 4043a7e7 (2026-09-17 17:41 -0300): pack PC-A admits a second judge handoff profile `omp-native-v2` while `omp-native-v1` is frozen — v2-only fields reject under v1 naming the freeze; v2 adds optional `plan_digest` + `acceptance_criteria` (string or axis_threshold) and a one-hop `extends` resolution in the profile resolver; the judge now reports an outcome triple (round_validity/loop_stop/mission_goal) with criteria-derived goal assessment and the D2a clean-round downgrade carried in reported `loop_stop`; the collector emits v2 with `plan_digest` + acceptance criteria sourced from a validated `ufo-round-plan-v1` artifact; the launcher cuts its PROFILE over to `omp-native-v2` and requires Main's plan artifact, with round-chain receipt scaffolding under `.ufo/receipts`; `config/ufo.json` carries `nativeProfiles.omp-native-v2` as a one-hop extends pointer (no copied constants).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 4043a7e7
```
Expected: commit resolves; subject `ufo pack PC-A: omp-native-v2 evidence backbone, A-07 typed round plan, outcome triple`; dated 2026-09-17.
Actual:
```
4043a7e72b7791f6a7eb67083150e1ae4a78f2e0|2026-09-17 17:41:34 -0300|ufo pack PC-A: omp-native-v2 evidence backbone, A-07 typed round plan, outcome triple
```

## Touches
- 4043a7e72b7791f6a7eb67083150e1ae4a78f2e0 — 42 files, +4850/-2069. Key paths: `crates/ufo-core-runtime/src/native.rs` (v2 admission, plan/criteria admission, outcome triple), `crates/ufo-core-runtime/src/native_tests.rs` (test module split out of `native.rs`), `crates/ufo-core-runtime/tests/native_handoff.rs`, `crates/ufo-cli/src/main.rs` (status reports `admittedProfiles`), `scripts/collect-omp-native-handoff.mjs`, `scripts/run-omp-native-trial.mjs`, `scripts/ufo-mission-result.mjs`, `config/ufo.json`, `crates/ufo-core-runtime/bundled/config.json`, `conformance/vectors/handoff/agent-gates.json`, `skills/ufo/references/run-logic.md` (+ all packaged mirrors), `skills/ufo/SKILL.md`
- `docs/advisory/2026-09-17-ufo-improvement-pack/10-fallback-admissibility-and-effort.md` (§5 effort rule; spec patches marked landed)
- `docs/advisory/2026-09-17-ufo-improvement-pack/12-effective-launch-attestation.md` (§5 output policy; spec patches marked landed)
- `docs/advisory/2026-09-17-ufo-improvement-pack/13-goal-status-and-round-two.md`, `16-amendments-to-specs-00-09.md` (status/amendment updates landing with PC-A)
- Tests: `tests/collect-omp-native-handoff.test.js`, `tests/run-omp-native-trial.test.js`, `tests/ufo-mission-result.test.js`

## Out-of-scope
- Commits 1bddc7b3 and c166c8cd (PC-B/PC-C) and the sibling packs (beats M-audit-late-0014..0024)
- Prior beat 0012 / earlier pack commits (M-audit-late-0001..0012)
- Whether the recorded gate run stays green on later trees — each beat's gate is its own commit pointer
- The 2026-09-15 operator re-charter seats already audited at beat 0011

## Findings
- `omp-native-v1` is frozen, not removed: v2-only fields under v1 produce a typed rejection that names the freeze. `ufo-cli status` reports `admittedProfiles` as `[v1, v2]`.
- The wrong-profile conformance vector was retargeted to `omp-native-v3` (a profile that is not admitted) so the vector still exercises a rejection rather than a now-valid profile.
- `native.rs` was split into `native_tests.rs` in this commit to stay under the 256KiB contract-file ceiling on native contract files.
- Exit-code logic was left untouched: only `loop_stop` drives exit codes.
- Commit body records `gates.sh 20/20 PASS` (recorded, not re-run by this audit).

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 7f08c003be21bed8d84913e0e82c130dff6f4334
- Next: M-audit-late-0014
