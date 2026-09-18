# M-audit-late-0019 — Pack P5-membrane: authority_boundary sign-off + artifact trust screening (spec 06 + A-06)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 52898c0b (2026-09-17 21:34 -0300): the P5-membrane pack lane (spec 06 + A-06) — `Proposal.touched_paths` as an OPTIONAL field with repo-relative shape validation single-sourced in `proposal.rs` (glob `*` stem is a prefix match; over-match seals, never under-match), an admitted accept whose touched paths intersect `membrane.paths` emitting `LoopOutcome::AuthorityBoundary` (exit 2) with the work still landing and the checkpoint persisting `stop_reason` plus accept digests, a `.ufo/membrane-seal.json` root seal (`ufo-membrane-seal-v1`, atomic, 0600) that makes further rounds refuse fail-closed naming `ufo charter sign`, that verb landing as the first operator-interactive CLI verb (stdin+stdout TTY via `std::io::IsTerminal`; no `unsafe`, no new crate; typed refusals; a full bounded Phase 0 re-pass — contracts + build + drills — before the seal lifts; `membrane_signoff` artifact on both outcomes), a launcher that refuses fresh dispatch against a standing seal with zero mutation while resume/prepare-only stays unaffected, and collector override-pattern screening of proposal artifacts and report sidecars in five classes (including A-06's `directive_task_data`, T24) whose flags ride the `NativeProposal` wrapper so the proposal body stays byte-equal to the hashed artifact and are never an auto-reject. Why: self-modification of the membrane is an operator-owned decision, so the lane makes touching the authority boundary an explicitly recorded, sign-off-gated event instead of a silent loop outcome.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 52898c0b
```
Expected: commit resolves; subject `ufo pack P5-membrane: authority_boundary sign-off + artifact trust screening (spec 06 + A-06)`; dated 2026-09-17.
Actual:
```
52898c0ba465b7772964db0bb7f62f0ef0e0dc8c|2026-09-17 21:34:24 -0300|ufo pack P5-membrane: authority_boundary sign-off + artifact trust screening (spec 06 + A-06)
```

## Touches
- 52898c0ba465b7772964db0bb7f62f0ef0e0dc8c — 52 files, +2963/-305. Key paths: `crates/ufo-core-runtime/src/proposal.rs`, `loop_driver.rs`, `config.rs`, `lib.rs`, `state.rs`, `report.rs`, `native.rs`, `native_tests.rs`, `crates/ufo-cli/src/main.rs`, `crates/ufo-cli/tests/cli_contract.rs`, `config/ufo.json` (+27, optional `membrane{paths,action}`), `scripts/collect-omp-native-handoff.mjs`, `scripts/run-omp-native-trial.mjs`, `tests/collect-omp-native-handoff.test.js`, `tests/run-omp-native-trial.test.js`, `drills/d-membrane.drill.json`, `drills/d-membrane-negative.drill.json`, `drills/d-sign-auth.drill.json`, `drills/d-screen.drill.json`, `drills/d-screen-clean.drill.json`, `skills/ufo/SKILL.md` (+11) and `skills/ufo/references/run-logic.md` (+29) with all packaged mirrors, `skills/SHA256SUMS`, `ufo-deps.lock`
- `docs/advisory/2026-09-17-ufo-improvement-pack/06-membrane-signoff-and-artifact-trust.md` (new, 53 lines) and `docs/advisory/2026-09-17-ufo-improvement-pack/16-amendments-to-specs-00-09.md` (+6) — the spec lane this commit lands

## Out-of-scope
- The sibling pack lanes P5-axes (commit 5bd0584d, beat M-audit-late-0020) and P6 (commit 1d1f95d4, beat M-audit-late-0021)
- Whether a seal ever lifted in-window (no operator sign-off is recorded in this cluster)
- Any re-execution of the recorded gates or drills (audit is read-only)

## Findings
- Screening flags are advisory provenance only: they ride the `NativeProposal` wrapper (omitted under v1) so the proposal body stays byte-equal to the hashed artifact, and the collector never auto-rejects on a flag.
- The commit body records that the tests caught a real fence-anchor bug, fixed in this commit (attributed, not re-run).
- Recorded gates for this commit: `gates.sh 21/21 PASS`; drills 36 pass / 18 pending-mechanism (commit body).
- `ufo charter sign` is the first operator-interactive verb in `ufo-cli`; the TTY check uses `std::io::IsTerminal`, so the crate keeps its no-`unsafe` posture without adding a dependency.
- `touched_paths` is OPTIONAL and never serialized when absent, so proposal digests of pre-existing artifacts stay byte-stable (commit body).

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 10e39d8565bc8143cea022662be9db90736b6706
- Next: M-audit-late-0020
