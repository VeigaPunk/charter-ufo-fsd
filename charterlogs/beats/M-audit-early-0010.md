# M-audit-early-0010 — ufo-selfaudit: rounds act on the tree; rejected moves cannot stay

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
A new crate turns the self-iteration machinery on this repository instead of on simulated scores.
`a83301b2` lands the empirical loop plus boundary conformance vectors (7 files +1107): each axis is
measured by executing something — conformance runs `run-all.sh`, `rust_tests`/`node_tests` parse real
test output, `dead_modules` counts `src/*.rs` files no `lib.rs` declares — lanes dispatch in parallel
threads with a per-lane timeout, and a lane that cannot run degrades to a dry measurement instead of
failing the round. `e86d6dc1` closes the loop so rounds act on the tree rather than only reading it
(3 files +690/−108): the body records that every round previously "re-read a tree nothing had
changed, so the second measurement was the first one again and no proposal could ever be admissible.
It was proving that measurement is deterministic." `6da65b72` adds the invariant that a round cannot
end with a rejected move still applied (2 files +136/−17) after the first real walk panicked past its
revert and left an applied `Cargo.toml` edit in the tree. `1501795c` seats the crate in the workspace
so its 19 tests actually run (3 files +13/−3): "It appeared in neither `members` nor `exclude`, so
cargo never saw it. 1677 lines and 19 tests, none of them running, and nothing in the tree said so."
Three honesty repairs follow: `fa4deece` widens an axis set that was too weak to see a red workspace
(5 files +140/−6) after it readmitted a crate whose manifest says it cannot build green in a sandbox;
`2cbc78c9` merges the two test axes into one cargo pass (4 files +141/−174) because two concurrent
cargo invocations contended for the build lock and "the racing lane invented a regression"; and
`fb687ee5` serializes the cargo-invoking lanes and names the crate behind a degraded axis (2 files
+35/−1). One line of reasoning: an auditor whose axis set cannot see a red workspace is not an
auditor, and a round that only reads the tree is not the loop — both had to be fixed before the walk
meant anything.

## Gate
```
for s in a83301b2 e86d6dc1 6da65b72 1501795c fa4deece 2cbc78c9 fb687ee5 618e4531; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 1501795c
git show --shortstat --format= 1501795c | tail -1
git show e86d6dc1 --stat --format= | tail -3
```
Expected: 7x "ok"; the seating subject verbatim at 3 files +13/−3; e86d6dc1 touching
crates/ufo-selfaudit/src/moves.rs.
Actual (observed 2026-09-18, HEAD 4adedde6): 7/7 ok; "1501795c Seat ufo-selfaudit in the workspace so
its 19 tests actually run"; "3 files changed, 13 insertions(+), 3 deletions(-)"; e86d6dc1 stat
showed `crates/ufo-selfaudit/src/moves.rs` among 3 files changed, 690 insertions(+), 108 deletions(-).

Wave-4 re-run (2026-09-18, HEAD 4adedde6): 8/8 `ok` — extended cat-file loop (7 original + 1 folded SHA) exited 0, no unresolved token.

## Touches
- `a83301b2` selfaudit: empirical self-iteration loop + boundary conformance vectors — 7 files +1107
- `e86d6dc1` selfaudit: close the loop — the rounds now act on the tree, not just read it — 3 files +690/−108
- `6da65b72` selfaudit: a round can no longer leave a rejected move in the tree — 2 files +136/−17
- `1501795c` Seat ufo-selfaudit in the workspace so its 19 tests actually run — 3 files +13/−3
- `fa4deece` selfaudit: the walk found the axis set was too weak to see a red workspace — 5 files +140/−6
- `2cbc78c9` selfaudit: one cargo pass reports both test axes; the racing lane invented a regression — 4 files +141/−174
- `fb687ee5` selfaudit: serialize the cargo-invoking lanes and name the crate behind a degraded axis — 2 files +35/−1
- `618e4531` merge: drop the walk's score declaration, now redundant — 3 files +97/-66; wave-4 fold: self-audit walk drops a now-redundant module declaration; stale orphan regressions named
- Paths (as of the cited commits): crates/ufo-selfaudit/src/{main,lanes,memory,probe}.rs,
  crates/ufo-selfaudit/src/moves.rs (added at `e86d6dc1`), conformance/vectors/boundary.json, Cargo.toml

## Out-of-scope
- Paper mutation/ablation batteries and their computed kill rate — M-audit-early-0011.
- Saturation vs budget-halt exits and the second-order saturation auditor — M-audit-early-0016.
- Workspace seating generally (Cargo workspace root, members, toolchain) — M-audit-early-0003.
- 08-26 probe wall-clock bounds (`2274f5d5`, `c3f01459`) are the same crate's later hardening; they
  are the cluster tail, recorded in Findings, not duplicated in Touches.
- Site ingestion (L0-owned) and the sibling window after 2026-09-10.

## Findings
- Honest failure, quoted from `6da65b72`: "The first real walk panicked in round 1. The registration
  record refused the move id … and the panic unwound straight past the revert, leaving the applied
  Cargo.toml edit in the working tree. Every measurement after that would have been against a tree
  nobody chose, and the loop would have had no way to know."
- Honest failure, quoted from `fa4deece`: "one of them was wrong. It readmitted crates/xbreed, whose
  manifest comment said plainly that the crate shells out to a codex binary and cannot build green in
  a sandbox … the only test axis counted passing tests and xbreed brought ninety-four of those along
  with three failures. The axis went up, no other axis moved, and strict Pareto admissibility did
  exactly what it was asked to do."
- New-crate cost: 1677 lines and 19 tests existed without running until `1501795c`; the body notes
  "It needed no changes to compile", i.e. it was unreferenced rather than blocked work.
- Segmented decision: the two measured axes were merged back into one cargo pass (`2cbc78c9`) rather
  than kept as parallel lanes, because the duplication produced a self-inflicted false regression.
- As-of: `crates/ufo-selfaudit` is described as of the cited commits; the crate is absent at HEAD,
  deleted 2026-08-29 by `96a4b6b4` "refocus UFO runtime on native OMP routing" (its previous touch
  was a 2026-08-26 fix round).
- Cluster tail recorded but not duplicated in Touches: `6fb92f97`, `60967022`, `cf35f848`,
  `70c1946c`, `2274f5d5`, `c3f01459`, `dac70ade` are later walk fixes and probe-bound evidence for
  the same crate.

- Wave-4 coverage remediation: 1 member(s) folded from the mis-adjudicated F8-GATES rejections (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-gates-report.md` (C5)
- Prior tip: `3c339133` — anchor of M-audit-early-0009
- Next: M-audit-early-0011
