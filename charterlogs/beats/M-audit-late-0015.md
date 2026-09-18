# M-audit-late-0015 — Pack PC-C: specs 11+12 — recovery matrix, dispatch attempts, effective launch attestation
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit c166c8cd (2026-09-17 19:13 -0300): pack PC-C lands spec 11's recovery matrix and spec 12's effective-launch attestation — the judge admits `effective_launch` (`effective-launch-v1`, one record per topology seat, optional under v2+resilient, typed freeze rejection under v1) carrying exact seat coverage, requested route + resolved model binding, a `role_card` sha256 recomputed over `contract_root/agents/<role>.md`, and argv credential screening; `dispatch_attempts` (resilient-only) record pre-spawn failures with agent-XOR-attempt seat coverage and a `lane_failure` binding (`agent_id` null, same correlation group); the loop driver enforces the recovery matrix (temporary classes timeout/tool_failure/unknown get bounded same-route retry at maxAttempts=2 total with same identity, authentication/permission_denied map to `authorization_unavailable` with no retry or hop, invalid_request unavailable, capacity advance unchanged, D1a preserved) plus the herd rule cooling a route-provider domain (herdThreshold inside herdWindowMs -> domainCooldownMs; cooled lanes record typed domain-cooldown unavailability with zero attempts); the collector emits `effective_launch` with rebound role-card digests (dies on partial coverage, omits for legacy runs), resilient-only `dispatch_attempts`, synthesized `domain_cooldown`, and a T15 behavior census; the launcher writes per-seat effective-launch-v1 records into `launch.json` and runs a pre-dispatch drift gate that re-resolves policy after the snapshot write and dies naming the drifted layer (T14).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' c166c8cd
```
Expected: commit resolves; subject `ufo pack PC-C: specs 11+12 — recovery matrix, dispatch attempts, effective launch attestation`; dated 2026-09-17.
Actual:
```
c166c8cd93082a5d5cef446b4b91c6900a9d237b|2026-09-17 19:13:37 -0300|ufo pack PC-C: specs 11+12 — recovery matrix, dispatch attempts, effective launch attestation
```

## Touches
- c166c8cd93082a5d5cef446b4b91c6900a9d237b — 27 files, +4615/-335. Key paths: `crates/ufo-core-runtime/src/native.rs` (effective_launch / dispatch_attempts / domain_cooldown admission, credential screening), `crates/ufo-core-runtime/src/loop_driver.rs` (recovery matrix, retry budget, herd cooldown), `crates/ufo-core-runtime/src/config.rs` (recovery config shape in `native_profile_entry`), `crates/ufo-core-runtime/src/execution_profile.rs`, `crates/ufo-core-runtime/src/lib.rs`, `crates/ufo-core-runtime/src/native_tests.rs`, `crates/ufo-core-runtime/tests/loop_driver.rs`, `scripts/collect-omp-native-handoff.mjs`, `scripts/run-omp-native-trial.mjs`, `config/ufo.json` (`nativeProfiles.omp-native-v1.recovery`, inherited via extends), `crates/ufo-core-runtime/bundled/config.json`, `skills/ufo/references/run-logic.md` (§1 lane identity tuple, §4.1 failure-action matrix + backpressure, §4.2 attestation arms; + all packaged mirrors)
- `docs/advisory/2026-09-17-ufo-improvement-pack/11-recovery-contract-and-identity.md` (sections marked landed)
- `docs/advisory/2026-09-17-ufo-improvement-pack/12-effective-launch-attestation.md` (sections marked landed)
- Tests: `tests/collect-omp-native-handoff.test.js`, `tests/run-omp-native-trial.test.js`

## Out-of-scope
- Commits 4043a7e7 (PC-A, beat 0013) and 1bddc7b3 (PC-B, beat 0014)
- Later packs (P3 and onward, beats M-audit-late-0016..0024)
- Re-running the recorded suite; this beat's gate is the commit pointer only
- Runtime observations about host OMP path/version/sha256 freshness (launcher records them best-effort)

## Findings
- `effective_launch` covers topology seats exactly: partial coverage is a die in the collector, and legacy runs are omitted rather than back-filled with fabricated attestations.
- The role-card digest is recomputed by the judge over `contract_root/agents/<role>.md`, so a stale card cannot ride an attested launch.
- Recovery classes are split by cause, not by symptom: authentication/permission_denied become `authorization_unavailable` with no retry and no hop, keeping the retry budget for genuinely temporary failures.
- The herd rule is backpressure, not a failure: cooled lanes carry typed domain-cooldown unavailability and record zero attempts.
- The launcher's pre-dispatch drift gate re-resolves policy after the snapshot write and dies naming the drifted layer (T14), so a policy flip between resolution and dispatch cannot produce a silently mismatched launch.
- Commit body records `gates.sh 20/20 PASS` (recorded, not re-run by this audit).

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 1bddc7b30fbd7ec40191f661565df95783a44f8e
- Next: M-audit-late-0016
