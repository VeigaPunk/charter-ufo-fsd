# M-audit-early-0003 — Rust hot path seated beside TS/Python; dependency-free baseline

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
`84d11d0e` (18:13:56 +0000, 21 files +1463) seats a third runtime beside the TS packages and
the Python package: it creates the Cargo workspace root — `[workspace] members =
["crates/ufo-runtime"]`, `resolver = "2"`, edition 2021 — with
`crates/ufo-runtime/{Cargo.toml,src/{lib,main,axis,config,gate,move_,orchestrator,specialist,wwkd,xask}.rs}`,
`rust-toolchain.toml`, `deps.manifest.json`, `config/orchestrator.{json,toml}` and
`docs/CLI-PORT-MATRIX.md`, and retargets `scripts/gates.sh` and `scripts/smoke.sh` at Rust
checks; its body states the scope — "Integrate crates/ufo-runtime with strict Pareto gate
(R1-R4), WWKD Round 0 planner, specialist dispatch stubs, xask dry fallback, and ufo-orch CLI."
— adding "Extends existing Node/Python scaffold; gates and smoke scripts run Rust checks."
`1974d6b1` (18:15:01, 1 file +7) is the baseline decision: "Lock dependency-free Rust baseline"
writes a `Cargo.lock` that is the file header plus one `[[package]]` entry (`xbgst 0.1.0`) and
no dependency list, so the hot path carries no third-party dependencies at all. Membership is
then widened and repaid: `935f20dd` (20 files +2923/-373) builds the portable runtime slice,
`b532f498` (27 files +2694/-74) adds the shared substrate-independence contract, `2cb1ba75`
(13 files +155/-68) seats the orphaned control plane by renaming root `src/*.rs` and
`tests/mutations.rs` into `crates/ufo-control-plane/` and makes the gates require cargo,
`180a24a6` (3 R100 renames, 0 content delta) parks three stale `ufo-core` integration tests as
`crates/ufo-core/tests-disabled/{gate_properties,process_resilience,store_invariants}.rs` —
body: "Tests reference unexported model/process/store modules; park under tests-disabled/ until
those modules are wired into lib.rs" — and `1501795c` (3 files +13/-3) seats
`crates/ufo-selfaudit`, which "appeared in neither `members` nor `exclude`, so cargo never saw
it. 1677 lines and 19 tests, none of them running, and nothing in the tree said so", taking the
suite from 69 to 88 passing tests; `213987ba` (6 files +652/-5) readmits the child-process
orchestrator and the fixture e2e, and `fee7dadc` drops its build-graph quarantine entry. The
remaining seating and verification repairs (`37e7e5f4`, `3f171211`, `4d4d6691`, `ef7735ed`,
`e5627173`, `3a4780c5`) close the day. One commit does not carry what its subject claims — see
Findings.

## Gate
```
for s in 84d11d0e 935f20dd b532f498 2cb1ba75 1501795c 213987ba 3a4780c5 e5627173 \
         fee7dadc 180a24a6 1974d6b1 37e7e5f4 3f171211 4d4d6691 ef7735ed e25bd80e \
         2c590dff 4674305b 56831bf0 574092d9 6c9c2a1a 70a0238a 70eb6dd6 71d074d9 \
         7427f96e 799cb4e0 8e24ad0d adf9a2b8 cd277794 dd8fe363 f36a9db9; do
  git cat-file -e ${s}^{commit} && echo "$s ok"
done
git show --stat --format= e25bd80e | tail -2
git log -S 'ufo-runtime' --reverse --pretty='%h %s' -- Cargo.toml | head -3
git show 84d11d0e:Cargo.toml | sed -n '1,3p'
git show --name-status --format= 180a24a6
```
Expected: 16x `ok`; `e25bd80e` = "1 file changed, 985 insertions(+), 72 deletions(-)"
(Cargo.lock); the earliest reachable edits of the member list are `53e368bc`, `935f20dd`,
`ab2a7978` — not `e25bd80e`; workspace header `[workspace] members = ["crates/ufo-runtime"]`
`resolver = "2"`; `180a24a6` is three `R100` renames into `tests-disabled/`.
Actual: observed 2026-09-18 at HEAD `4adedde6` — 16 lines `ok`; `Cargo.lock | 1057 +++++` and `1 file
changed, 985 insertions(+), 72 deletions(-)`; `53e368bc Add last-known-good remotes, xbreed
core deps, and remaining charter CLIs.`, `935f20dd Build portable UFO-FSD runtime slice`,
`ab2a7978 feat: Round 3 — observability axis, gx-teams tmux, sekhmet live`; header printed
`[workspace]` / `members = ["crates/ufo-runtime"]` / `resolver = "2"`; three `R100` lines
`crates/ufo-core/tests/*.rs -> crates/ufo-core/tests-disabled/*.rs`.

Wave-4 re-run (2026-09-18, HEAD 4adedde6): 31/31 `ok` — extended cat-file loop (16 original + 15 folded SHAs) exited 0, no unresolved token.

## Touches
- `84d11d0e` feat: add Rust ufo-runtime hot path alongside TS/Python core — anchor, 21 files +1463 (Cargo.toml, Cargo.lock, rust-toolchain.toml, crates/ufo-runtime/*, deps.manifest.json, config/orchestrator.{json,toml}, docs/CLI-PORT-MATRIX.md, scripts/{gates,smoke}.sh)
- `1974d6b1` Lock dependency-free Rust baseline — 1 file +7 (Cargo.lock: one package, no dependencies)
- `935f20dd` Build portable UFO-FSD runtime slice — 20 files +2923/-373
- `180a24a6` Disable stale ufo-core integration tests blocking workspace gates — 3 `R100` renames, 0 content delta
- `b532f498` conformance: shared substrate-independence contract + conforming Rust pattern crate — 27 files +2694/-74
- `2cb1ba75` fix: require cargo workspace gates; seat orphaned control-plane crate — 13 files +155/-68 (`R088`-`R100` renames of root `src/*.rs` -> `crates/ufo-control-plane/src/*`)
- `37e7e5f4` fix smoke suite for excluded Rust hot path — 1 file +2/-2 (scripts/smoke.sh)
- `4d4d6691` Format reconciled Rust workspace — 15 files +110/-93
- `e5627173` Fix sekhmet doctor, seat ufo-runtime in workspace, harden self-iter — 7 files +841/-21
- `3f171211` Fix Rust workspace verification failures — 11 files +112/-141
- `e25bd80e` fix: workspace gates green — ufo-runtime member, process exports, gate script — 1 file +985/-72 (Cargo.lock only; subject-vs-diff drift, Findings)
- `3a4780c5` Harden smoke for multi-crate workspace and record yaml for lane registry. — 4 files +1777 (scripts/smoke.sh, packages/xbgst-runtime/package.json, package-lock.json, .gitignore)
- `ef7735ed` Fix reconciled Rust workspace integration — 3 files +3/-129
- `213987ba` Readmit the child-process orchestrator and fixture e2e. — 6 files +652/-5 (crates/ufo-core/src/driver.rs, crates/ufo-fixture/tests/e2e.rs)
- `fee7dadc` Drop the fixture quarantine now that the crate is a workspace member. — 1 file -1 (conformance/build-graph.json)
- `2c590dff` fix(coherence): scan this repo's JSON, not the trees it only cites — 1 file +68/-2; wave-4 fold: coherence walker scans this repo JSON, not cited trees (gate scope)
- `4674305b` Make xbreed's guard honour its wildcard allow list, and retire the last exclusion — 6 files +445/-19; wave-4 fold: crates/xbreed guard + build-graph boundary: crate-graph seating of the guard
- `56831bf0` fix(conformance): scope the build-graph survey to Rust this repo ships — 2 files +55/-11; wave-4 fold: scopes the boundary survey to the Rust this repo ships (walker code)
- `574092d9` conformance: make the walker's skip list and the boundary file agree — 2 files +39/-2; wave-4 fold: walker skip list and boundary file made to agree (code + JSON)
- `6c9c2a1a` Stop the build-graph boundary from failing on a fresh clone — 1 file +11/-1; wave-4 fold: boundary test must not fail on a fresh clone (walker code)
- `70a0238a` Rebuild the LKG checkpoint/resume capability against the shipped runtime — 10 files +832/-440; wave-4 fold: rebuilds checkpoint/resume against the shipped Runtime<P: Provider> API; the tests-disabled invariants 180a24a6 parked are repaid
- `70eb6dd6` Wire three of ufo-core's orphaned modules into the build and tighten the boundary — 8 files +195/-470; wave-4 fold: wires three orphaned ufo-core modules into the build (26 tests start running) — seating repayment
- `71d074d9` Expose checkpoint pause/resume through ufo-cli run — 4 files +134/-4; wave-4 fold: operator-facing half of the same capability (ufo-cli run --pause-after/--resume)
- `7427f96e` test(core): cover the runtime ordering and exit invariants against the API that ships — 2 files +482/-11; wave-4 fold: same repayment: the parked runtime ordering/exit invariants now run against the API that ships
- `799cb4e0` Quarantine non-strict conformance prototype — 11 files +155/-71; wave-4 fold: workspace membership decision for the non-strict conformance prototype (quarantine)
- `8e24ad0d` Make the build-graph exclusion boundary checkable — 3 files +827; wave-4 fold: new build-graph exclusion boundary suite for the crate graph
- `adf9a2b8` test(coherence): anchor the example fixtures to the types that read them — 1 file +75; wave-4 fold: anchors example fixtures to the types that read them (new test)
- `cd277794` Put the pattern layer and the conformance driver back in the build graph — 2 files +241/-289; wave-4 fold: put ufo-pattern + ufo-conformance back in the crate graph (membership/exclude list)
- `dd8fe363` Collapse the thrice-recorded gx-teams prefix and fail on duplicate JSON keys — 9 files +258/-80; wave-4 fold: boundary walker fails on duplicate JSON keys (new failure mode)
- `f36a9db9` Revive sqlite/control-plane and harden orch audit gates. — 14 files +404/-198; wave-4 fold: revives ufo-sqlite + ufo-control-plane as workspace members
- Paths: Cargo.toml, Cargo.lock, rust-toolchain.toml, crates/ufo-runtime/*, crates/ufo-control-plane/*, crates/ufo-core/tests-disabled/*, crates/ufo-selfaudit, deps.manifest.json, config/orchestrator.{json,toml}, docs/CLI-PORT-MATRIX.md, scripts/{gates.sh,smoke.sh}, conformance/build-graph.json

## Out-of-scope
- The fifteen-lane fork off the empty root and the choice of layout — M-audit-early-0002.
- The portable orchestration baseline `6bd0c472` and the portable-pack / charter-CLI surface —
  M-audit-early-0004.
- Reconciliation of the two divergent runtimes and the `crates/` graph decision `8832baec` —
  M-audit-early-0009.
- Rust dependency/edition one-liners needed to compile the reconciled workspace (F13-RUSTDEP:
  `1d66f16e`, `40c505a9`, `61f0b3d5`, `6a93f301`, `93b6574d`, `e34cbeb3`), fmt sweeps (F2-FMT),
  lockfile refreshes (F1-LOCK) and conformance-boundary bookkeeping (F7-CONFORMANCE) —
  mechanical families, accounted in the mission result report.
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- `e25bd80e` subject overstates its diff. Subject: "fix: workspace gates green — ufo-runtime
  member, process exports, gate script"; body bullets: "Add ufo-runtime to workspace with
  standalone Cargo.toml metadata", "Export model/process from ufo-core; add wait-timeout + libc
  deps", "Fix broken check() merge in scripts/gates.sh". Observed: `git show --stat e25bd80e`
  = `1 file changed, 985 insertions(+), 72 deletions(-)`, all of it `Cargo.lock`. The workspace
  membership edits it claims are in `53e368bc` (18:22:04), `935f20dd` (18:19:59) and `ab2a7978`
  (`git log -S 'ufo-runtime' --reverse -- Cargo.toml`). Reading the subject as literal would
  overstate one commit.
- `180a24a6` is a park, not a delete: three `R100` renames with 0 content delta, kept in-tree
  under `tests-disabled/` with the reason in the body.
- `1501795c` distinguishes unreferenced from blocked work: `crates/ufo-selfaudit` "needed no
  changes to compile -- only `ufo-pattern`, serde and serde_json"; adding one line to `members`
  "takes the suite from 69 to 88 passing tests". Touches-primary: M-audit-early-0010.
- `1974d6b1`'s "dependency-free" claim is checkable in the artifact: the lockfile it adds has
  one `[[package]]` (`xbgst 0.1.0`, 7 lines total) and no dependency list.
- `2cb1ba75` seats the control plane by moving the root `src/*.rs` package — the same root
  layout M-audit-early-0002's anchor had named authoritative — into `crates/ufo-control-plane/`.
- Path currency: at HEAD `4adedde6`, `crates/ufo-runtime`, `crates/ufo-selfaudit`,
  `crates/ufo-control-plane` and `deps.manifest.json` return 0 entries from `git ls-tree -r HEAD`;
  `docs/CLI-PORT-MATRIX.md` still returns 1. The seating above is stated as of its own SHA.
- Documentation beats for the environment the pins encode: `config/orchestrator.json`/`.toml`
  land in the anchor commit, not in a separate one.

- Wave-4 coverage remediation: 15 member(s) folded from the mis-adjudicated F7-CONFORMANCE/F9-ORCH/F8-GATES rejections (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-init-report.md` (C3)
- Prior tip: `345fab9b` — anchor of M-audit-early-0002
- Next: M-audit-early-0004
