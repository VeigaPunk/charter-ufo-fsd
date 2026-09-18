# M-audit-early-0009 — Divergent runtimes reconciled: quarantine, not deletion

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
`3c339133` (18:40:19 +0000, 11 files +35/-10) reconciles the two runtimes that the merge storm
left coexisting: "Concurrent merges had left main uncompilable. Two incompatible model layers
were both present: the SQLite control plane (model/orchestrator/store/adapter) and a parallel
JSONL-audit runtime (config/gate/audit) whose `AxisSpec`/`GateVerdict` types the merge had
clobbered out of model.rs. Five test files referenced a `ufo_fsd` crate and `tokio`, neither of
which the manifest declares, so nothing built." The resolution is a quarantine, not a deletion:
seven `R100` renames with 0 content delta move `src/audit.rs`, `src/config.rs`, `src/gate.rs` and
`tests/{config_regime,degradation,gate_invariants,orchestration_e2e}.rs` to
`docs/quarantine/<name>.divergent`, with `src/lib.rs`, `src/package.rs` and
`tests/package_bundles.rs` edited to keep one green tree; the body states the grounds —
"Resolved toward the SQLite control plane, on two grounds. It is the substrate the paper §6
explicitly favours — local structured persistence when memory is a control-plane cache rather
than a user-visible product — and it is the half that verifiably runs end to end. The divergent
half is moved to docs/quarantine/ rather than deleted, so the work is recoverable and the
decision is inspectable" — and it adopts `package.rs`/`hash.rs` from the discarded branch
because "both are self-contained and `package.rs` is the per-substrate bundle verifier the
charter's five CLI targets need", after its skill-invariant gate was found rejecting four of its
own five bundles on case and line-wrap. `8832baec` (18:44:40, merge, 3264 files +439441/-3612)
then applies the same rule to Rust: "The remote had grown a real cargo workspace at crates/ +
adapters/ while this side still declared a single root package over src/. Both cannot be the
core. Resolving the manifests toward the workspace keeps the eight members that actually compile
and the 18 tests that actually run", with the displaced root `src/*.rs` "now outside the build
graph and dealt with next rather than left looking authoritative". The rest of the day collapses
each remaining dual-runtime fork to one implementation — frontier/roster/adapter-honesty
(`6385dc41`), WWKD/filter (`31dd0370`), κ and `adaptBetweenRounds` via Rust CLI/NAPI (`0cd92888`),
orch↔Store schema v2 and score (`1e6fa4fe`), the capability SSoT (`d5a4d317`) — and pins the same
contracts in all three languages: `24059a8d` ports RFC8785-JCS canonicalization and the transport
taxonomy "Verified byte-for-byte identical output against the actual node script (not just
self-consistent Rust)", and `26bdf08e`/`ec14f042` replace the one-at-a-time fold with
composition — "Python already froze the baseline before judging, then folded the survivors one at
a time anyway... Both reproduce the TS defect: with one lane per axis, only one axis can advance
per round" — verified by mutation ("restoring the fold in each language fails 6/9 Rust, 4/10 TS
and 4/15 Python cases in the new suite").

## Gate
```
for s in 3c339133 0cd92888 1e6fa4fe 24059a8d 26bdf08e 31dd0370 6385dc41 8832baec \
         d5a4d317 ec14f042 \
         05c61587 0748e8cb 13efe309 1cdbdaba 244de7e3 29d88303 37ceaab0 3d61b61e \
         47af2ffa 4a53f864 5ffe73bc 6a73501d 8a505c1d 8b91504c a3a3ed11 b622da81 \
         b9653e8d ba76b6c4 c43f27f2 c7259ba7 d83ecfe3 e62c61d6 e82214d9 f837164b \
         fa19ab09; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git show --name-status --format= 3c339133 | grep -c '^R100'
git show --stat --format= 3c339133 | tail -1
git ls-tree HEAD docs/quarantine | wc -l
git log --full-history --pretty='%h %s' -- docs/quarantine
```
Expected: 10x `ok`; 7 `R100` renames; `11 files changed, 35 insertions(+), 10 deletions(-)`; 0
entries for `docs/quarantine` at HEAD; the only reachable commits touching that path are the
creator `3c339133` and one later merge.
Actual: observed 2026-09-18 at HEAD `4adedde6` — 10 lines `ok`; `7`; `11 files changed, 35 insertions(+),
10 deletions(-)`; `0`; `82306e23 Merge origin/main: adopt the upstream cargo workspace as
authoritative` and `3c339133 fix: reconcile the two divergent runtimes into one green tree`.

Wave-4 re-run (2026-09-18, HEAD 4adedde6): 35/35 `ok` — extended cat-file loop (10 original + 25 folded SHAs) exited 0, no unresolved token.

## Touches
- `3c339133` fix: reconcile the two divergent runtimes into one green tree — anchor, 11 files +35/-10 (7 `R100` renames src/* + tests/* -> docs/quarantine/*.divergent)
- `8832baec` Merge origin/main and take the crates/ workspace as the authoritative Rust graph — merge, 3264 files +439441/-3612
- `24059a8d` feat(ufo-core): protocol-faithful specialist output parsing with real cross-language parity — 8 files +2830 (crates/ufo-core/src/{protocol,audit_v2}.rs, fixtures/protocol/*, tests/protocol_parity.rs)
- `1e6fa4fe` Unify orch↔Store control-plane schema v2 and collapse score dual-runtime. — 20 files +1363/-260
- `d5a4d317` Anchor the capability SSoT in all three language runtimes — 5 files +755
- `31dd0370` Deepen LKG→runtime fidelity and collapse WWKD/filter dual-runtime. — 44 files +1582/-605
- `0cd92888` Collapse κ and adapt dual-runtime forks via Rust CLI/NAPI. — 26 files +1833/-112
- `6385dc41` Collapse frontier, roster, and adapter-honesty dual-runtime forks. — 26 files +2588/-156
- `26bdf08e` Compose a round's admitted moves instead of folding them one at a time — 4 files +332/-9
- `ec14f042` Give Python and Rust the same composed-set round semantics — 7 files +709/-30
- `05c61587` Publish real-process spawn evidence in a reproducible order — 2 files +75/-57; wave-4 fold: publishes real-process spawn evidence in a reproducible order (race removed)
- `0748e8cb` Refuse a damaged control plane in Rust too, and stop downgrading past it — 4 files +188/-2; wave-4 fold: Rust twin of the damaged-plane refusal; no downgrade past it
- `13efe309` align verification gates with current Rust CLI — 3 files +12; wave-4 fold: aligns the gate CLI example fixtures with the canonical Rust CLI
- `1cdbdaba` fix(orch): scope phase and adapt listings to the asking run — 5 files +145/-18; wave-4 fold: scopes phase/adapt listings to the asking run
- `244de7e3` Move the round-evidence writer out of the test body — 1 file +22/-13; wave-4 fold: moves the round-evidence writer out of the test body (byte-identical)
- `29d88303` feat(ufo-core): real-process Provider wired into planner->specialists->judge->adaptation, plus round-state schema parity — 10 files +2650/-79; wave-4 fold: real-process Provider wired into planner->specialists->judge->adapt (protocol parity)
- `37ceaab0` test(orch): name the stale artifact instead of throwing from inside it — 1 file +40/-14; wave-4 fold: run-scoping fix: names the stale NAPI artifact instead of throwing from it
- `3d61b61e` Use checked SQLite sequence conversions — 1 file +7/-3; wave-4 fold: checked SQLite sequence conversions in the surviving store
- `47af2ffa` Isolate the control plane per test run and stop two SQLite builds sharing one file — 7 files +411/-108; wave-4 fold: isolates the control plane per test run; two SQLite builds stop sharing one file
- `4a53f864` Align verification gates with canonical runtime — 15 files +106/-540; wave-4 fold: re-points the verification scripts at the canonical runtime; adds the Rust runtime_e2e test
- `5ffe73bc` Scope recentFindings to its run as well — 4 files +78/-67; wave-4 fold: scopes recentFindings to its run (scoped-reader family)
- `6a73501d` fix(sqlite): make hash-chained event append atomic under real concurrent writers — 2 files +134/-84; wave-4 fold: makes the hash-chained event append atomic under real concurrent writers
- `8a505c1d` Scope the orch control-plane readers to their own run — 10 files +376/-140; wave-4 fold: scopes the orch control-plane readers to their own run
- `8b91504c` Stop two orch tests from reporting on state that is not the run under test — 2 files +35/-4; wave-4 fold: run-scoping fix: two orch tests stop reporting on another run's rows
- `a3a3ed11` Add in-process ufo-memory-napi and prefer it for orch memory. — 22 files +1244/-150; wave-4 fold: in-process ufo-memory-napi preferred for orch memory
- `b622da81` Add end-to-end distillation audit coverage — 2 files +40; wave-4 fold: end-to-end distillation audit coverage in the py runtime tests
- `b9653e8d` Link hash-chained audit plane into NAPI orch memory. — 13 files +653/-119; wave-4 fold: links the hash-chained audit plane into NAPI orch memory
- `ba76b6c4` Refuse a stale ufo-memory rather than let it speak for the Rust source — 3 files +291/-11; wave-4 fold: refuses a stale ufo-memory rather than let it speak for the Rust source
- `c43f27f2` fix(adapters): let a refused model say why it was refused — 7 files +65/-11; wave-4 fold: a refused model says why it was refused (adapter-honesty)
- `c7259ba7` test(py): resolve both rosters from the same tree — 1 file +7/-1; wave-4 fold: py test resolves both rosters from the same tree (memory-binary scope)
- `d83ecfe3` Refuse a damaged control plane at open instead of failing a later query — 2 files +66; wave-4 fold: refuses a damaged control plane at open instead of failing a later query
- `e62c61d6` feat(adapters): refuse to build a command for a banned model — 4 files +295/-9; wave-4 fold: adapters refuse to build a command for a banned model
- `e82214d9` test(orch): scope the lineage assertion to the run that just happened — 1 file +16/-4; wave-4 fold: run-scoping fix: lineage assertion scoped to the run that just happened
- `f837164b` Add ufo-memory Rust sidecar and dual-backend orch memory. — 20 files +1214/-259; wave-4 fold: adds the ufo-memory Rust sidecar + dual-backend orch memory
- `fa19ab09` fix(store): name duplicate run ids and drop the unused hash helper — 3 files +26/-14; wave-4 fold: store names duplicate run ids; unused hash helper dropped
- Paths: docs/quarantine/*.divergent, docs/PORT-NOTES.md, src/{lib,package}.rs, tests/package_bundles.rs, crates/ufo-sqlite/src/*, crates/ufo-memory-napi/src/lib.rs, crates/ufo-control-plane/src/store.rs, crates/ufo-core/src/{protocol.rs,audit_v2.rs}, crates/ufo-core/fixtures/protocol/*, crates/ufo-core/tests/protocol_parity.rs, conformance/vectors/{score,adapt}/*, packages/ufo-core/src/{orchestrator,pareto,types}.ts

## Out-of-scope
- The fifteen-lane fork, the merge storm and the choice of the root layout — M-audit-early-0002.
- Rust workspace membership and seating mechanics — M-audit-early-0003.
- Portable-pack / charter-CLI surface and the doctrine registry — M-audit-early-0004 and
  M-audit-early-0005.
- Node package identity and workspace enumeration — M-audit-early-0006.
- Merge-damage restore commits (F4-RESTORE) and conformance-boundary bookkeeping
  (F7-CONFORMANCE) as families — mechanical, accounted in the mission result report.
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- `docs/quarantine/` does not exist at HEAD: `git ls-tree HEAD docs/quarantine` returns 0 entries
  at HEAD `4adedde6`. The 7 `.divergent` files are described as of `3c339133` only. The only
  other reachable commit `git log --full-history -- docs/quarantine` lists is the merge
  `82306e23` "Merge origin/main: adopt the upstream cargo workspace as authoritative"
  (18:59:06 +0000), 18m47s after the archive was created, so the archive left the reachable tree
  the same hour it was made.
- The quarantine commit carries one unrelated artifact: `A uploads/UFO_arxiv_style_paper__1__3__6359.pdf`
  is part of the same 11-file change set.
- The reasoning is recoverable from the commit, not from a path: the decision text is in
  `3c339133`'s body and recorded as conflict C8 in `docs/PORT-NOTES.md`, which still exists at
  HEAD (1 entry).
- `8832baec` is a partial reconciliation, not a full one: it keeps "the eight members that
  actually compile and the 18 tests that actually run" and explicitly leaves the displaced root
  `src/*.rs` outside the build graph.
- The same defect existed in three languages at once: the composed-set fold is fixed in Rust
  (`26bdf08e`), then in Python and Rust with a shared property (`ec14f042`), whose mutation check
  reports "restoring the fold in each language fails 6/9 Rust, 4/10 TS and 4/15 Python cases".
- `24059a8d` claims parity only after comparison with the external reference: "Verified
  byte-for-byte identical output against the actual node script (not just self-consistent Rust)".
- Path currency: at HEAD, `crates/ufo-sqlite`, `crates/ufo-memory-napi`,
  `crates/ufo-core/src/{protocol,audit_v2}.rs`, `conformance/vectors/{score,adapt}` and
  `src/{lib,package}.rs` all return 0 entries from `git ls-tree -r HEAD`;
  `packages/ufo-core/src/{orchestrator,pareto}.ts` and `docs/PORT-NOTES.md` return 1 each.

- Wave-4 coverage remediation: 25 member(s) folded from the mis-adjudicated F9-ORCH/F8-GATES/F11-DOCS rejections (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-init-report.md` (C5)
- Prior tip: `6e55c3e1` — anchor of M-audit-early-0008
- Next: M-audit-early-0010
