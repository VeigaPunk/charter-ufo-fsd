# M-audit-late-0021 — Pack P6: enforcement below the prompt — writer lease, apply journal, evidence originals (spec 14)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 1d1f95d4 (2026-09-17 23:50 -0300): the P6 pack lane (spec 14) — the new `lease.rs` mission-scoped writer lease with fencing epochs (`.ufo/writer-lease.json`, `ufo-writer-lease-v1`, atomic `create_new` acquisition with a post-write re-read, `/proc` pid liveness where EPERM counts as alive and a probe failure fails closed, dead-holder takeover bumping the epoch, and `guarded_write` rejecting stale epochs by naming the current one), with `LoopDriver::open` attempting acquisition without letting `HeldBy` block open, checkpoint finalization, membrane seals and baseline promotion all requiring the held epoch, and resume fencing the predecessor via same-pid takeover; `local_ship.rs` gaining a journaled transactional apply (per-op `.ufo/apply-journal/<op>.json` plus preimage bytes, 0600, atomic, preimage written before the pending entry) whose `recover_apply_journal` rolls back only digest-owned pending operations — `live==candidate` restores the preimage, `live==before` is a no-op, and `live==neither` is a user edit marked `preexisting_conflict` that is never touched (T31) — replay-safe with malformed entries as typed errors, and the CLI verb recovering first; and evidence originals (F18/T32), where the collector preserves each protected raw transcript beside its normalized copy and emits per-agent `evidence_originals {canonicalizer_version, raw_path, raw_digest, derived_digest, redaction_map{uniquified_task_ids, uniquified_count, truncated_lines, truncated_fields}}` whose raw-to-derived binding the judge validates (path beneath the contract root, non-symlink, digest equality, canonicalizer version equality cross-pinned by a node test, well-formed redaction map), additive OPTIONAL under v2+resilient with typed freeze rejection under v1, and the intake helpers moving to `native_evidence.rs` as `native.rs` hit the 256KiB contract-file ceiling. Why: enforcement below the prompt — checkpoint finalization, seals, baseline promotion and file application now require a held fencing epoch and a journaled preimage, so concurrent or stale writers cannot corrupt canonical state regardless of what any prompt claims.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 1d1f95d4
```
Expected: commit resolves; subject `ufo pack P6: enforcement below the prompt — lease, apply journal, evidence originals (spec 14)`; dated 2026-09-17.
Actual:
```
1d1f95d4623b86ce4b77330a55d04bd0bcfa28e2|2026-09-17 23:50:30 -0300|ufo pack P6: enforcement below the prompt — lease, apply journal, evidence originals (spec 14)
```

## Touches
- 1d1f95d4623b86ce4b77330a55d04bd0bcfa28e2 — 29 files, +2428/-156. Key paths: `crates/ufo-core-runtime/src/lease.rs` (new, 529 lines), `local_ship.rs` (+644), `loop_driver.rs` (+143), `native_evidence.rs` (new, 317), `native.rs`, `native_tests.rs`, `lib.rs`, `crates/ufo-core-runtime/tests/conformance.rs`, `crates/ufo-cli/src/main.rs` (+23), `scripts/collect-omp-native-handoff.mjs` (+110), `tests/collect-omp-native-handoff.test.js` (+110), `drills/d-lease.drill.json`, `drills/d-apply-journal.drill.json`, `drills/d-raw-evidence.drill.json` (all new), `skills/ufo/references/run-logic.md` (+18) with all packaged mirrors, `skills/SHA256SUMS`, `ufo-deps.lock`
- `docs/advisory/2026-09-17-ufo-improvement-pack/14-enforcement-below-the-prompt.md` (new, 71 lines) — the spec lane this commit lands

## Out-of-scope
- The sibling pack lanes P5-membrane (commit 52898c0b, beat M-audit-late-0019) and P5-axes (commit 5bd0584d, beat M-audit-late-0020)
- The A/B promotion machinery named in the spec front (F12 promotion is cited as doctrine prose here, not a new mechanism)
- Any re-execution of the recorded gates or drills (audit is read-only)

## Findings
- T16/T17 stay NOT_RUN in this lane — the commit body marks them as an unproven OMP spawn-policy dependency and says so explicitly rather than claiming coverage; T34 is covered by the P5-membrane drills and T28 predates the pack.
- The `preexisting_conflict` case is deliberately non-destructive: recovery never touches a live tree that matches neither the preimage nor the candidate, because that state is attributable to the user (T31).
- Recorded gates for this commit: `gates.sh 21/21 PASS`; drills 44 pass / 13 pending-mechanism (commit body).
- `evidence_originals` is additive OPTIONAL under v2 and resilient profiles and a typed freeze rejection under v1; the canonicalizer version equality is cross-pinned by a node test (commit body).
- The lease tolerates a held-by-other lease at open (`HeldBy` never blocks open); only the state-mutating sites — checkpoint finalization, membrane seals, baseline promotion — require the held epoch (commit body).

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 5bd0584d34c105a2a2ce9d0c7126948ba68551c0
- Next: M-audit-late-0022
