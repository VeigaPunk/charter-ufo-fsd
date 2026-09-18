# M-audit-early-0008 — WWKD plan-on-disk token required before every judge round

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
WWKD stops being a posture and becomes a gate: a run must write its own plan on disk for the round it
is judged in. `6e55c3e1` enforces gated WWKD planning evidence (8 files +259/−15) and `fe122d6f` runs
the executable WWKD→godspeed→specialist self-iter e2e loop (15 files +942/−12) with the Round-0
planner, trilogy pin, dry xask and parallel specialist waves. `13ef0ae2` seats the write-before-judge
requirement on the xbgst-runtime judged paths (5 files +150/−15), because those paths "only minted a
Round-0 plan, then judged later rounds against leftover r0 words". `15143ac7` then binds the Round-0
plan to the run that wrote it (2 files +82/−5): the body records that existence plus `/wwkd/i` plus
`/Phase 0/i` at a fixed path "are satisfied by a plan an earlier run left there. A hand-written
three-line file cleared it." `5aeb6235` stamps a per-round UUID into `.xbgst/plan-rN.md` and refuses
leftover or swapped plans that only contain the words wwkd and Phase 0 (4 files +174/−11), and
`5b2aca25` ports the leftover-token invariant across the language cores so each independently usable
core refuses a leftover plan and a stale token after a newer write (16 files +527/−14). The same
token gates paper claims: `d7f08a65` refuses fabricated mutation kills and requires a WWKD plan token
before judge (3 files +315/−11), closing a path where "leftover 'wwkd / Phase 0' files would have
satisfied any later check" and where `MutationBattery::run_smoke` "invented a 100% kill from one stub
row (paper M10)". `ec710ebf` closes the family on 08-26 17:00 by tokenizing `plan-r0.md` and
fail-closing leftover words, leftover tokens, swapped files and the JSON dump (8 files +322/−51).
One line of reasoning: a plan is evidence only if it was written by the run under judgement, so the
gate had to distinguish "this round" from "a previous round" instead of checking file existence.

## Gate
```
for s in 6e55c3e1 fe122d6f 13ef0ae2 15143ac7 5aeb6235 5b2aca25 ec710ebf d7f08a65; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 15143ac7
git show --shortstat --format= 15143ac7 | tail -1
git show -s --format=%B 13ef0ae2 | head -3
```
Expected: 8x "ok"; the bind-the-plan subject verbatim at 2 files +82/−5; the 13ef0ae2 body sentence
naming "leftover r0 words".
Actual (observed 2026-09-18, HEAD 4adedde6): 8/8 ok; "15143ac7 Bind the WWKD round-0 plan to the run
that wrote it"; "2 files changed, 82 insertions(+), 5 deletions(-)"; body excerpt observed as
"fix(xbgst-runtime): write WWKD before every judge round … then judged later rounds against leftover
r0 words."

## Touches
- `6e55c3e1` Enforce gated WWKD planning evidence — 8 files +259/−15
- `fe122d6f` feat: executable WWKD→godspeed→specialist self-iter e2e loop — 15 files +942/−12
- `13ef0ae2` fix(xbgst-runtime): write WWKD before every judge round — 5 files +150/−15
- `15143ac7` Bind the WWKD round-0 plan to the run that wrote it — 2 files +82/−5
- `5aeb6235` feat(xbgst): F-C5 WWKD plan-on-disk token before every judge round — 4 files +174/−11
- `5b2aca25` feat(runtimes): F-C5 WWKD write-before-judge tokens across language cores — 16 files +527/−14
- `ec710ebf` fix(ufo-runtime): refuse leftover WWKD as this-round evidence — 8 files +322/−51
- `d7f08a65` Refuse fabricated mutation kills and require a WWKD plan token before judge. — 3 files +315/−11
- Paths (as of the cited commits): crates/ufo-core/src/runtime.rs, crates/ufo-runtime/src/wwkd.rs,
  crates/ufo-core-runtime/src/loop_driver.rs, crates/ufo-control-plane/src/{overlay_fsd.rs,self_iter.rs},
  packages/xbgst-runtime/src/self-iter.ts, packages/ufo_core/src/ufo_core/planner.py

## Out-of-scope
- Paper battery/ablation execution and computed kill rates — M-audit-early-0011.
- Saturation vs budget-halt exit semantics — M-audit-early-0016.
- E1–E5 godspeed pin/membrane and the WWKD fail-closed E7 conformance pair (`defdf825`) —
  M-audit-early-0017 and 0012.
- LIVE/DRY Task fan-out telemetry — M-audit-early-0007.
- 08-27 F-C3/F-C5 charter-parity extensions — sibling lane (08-27 window).
- Site ingestion (L0-owned) and the sibling window after 2026-09-10.

## Findings
- Honest failure, quoted from `15143ac7`: "the fail-closed rule 'judge rounds forbidden before Round
  0' was enforced by writeWwkdPlan and assertPlanBeforeJudge happening to sit in that order in
  runSelfIter: reorder or drop the write and every gate stays green on last run's artifact." The gate
  was ordering luck, not a check, until the token was bound to the writing run.
- The family was not closed on 08-25: `ec710ebf` (2026-08-26 17:00:44) is the last in-window member,
  tokenizing `plan-r0.md` and fail-closing the JSON dump. Its body also states the parent goal stays
  OPEN ("not live OAuth, tip-bytes, F-C3, or crates.io-publish").
- The plan token doubles as an anti-fabrication gate for paper claims in `d7f08a65`: the same commit
  replaces a stub-row 100% kill with three named mutants executed against the seated Pareto gate.
- As-of: `crates/ufo-runtime`, `crates/ufo-core-runtime`, `crates/ufo-control-plane` and
  `packages/xbgst-runtime` are described as of the cited commits; the crates were deleted 2026-08-29
  by `96a4b6b4` "refocus UFO runtime on native OMP routing" and the xbgst-runtime path left the tree
  at 2026-08-28 `23b209b7`.
- Cluster tail recorded but not duplicated in Touches: the scout cluster lists 17 further members
  (fix/evidence rounds around the same token). Two carry distinct adjacent contracts and are named
  here: `ffcfff35` Make the WWKD planner and the charter refusals work on a foreign host (6 files
  +217/−13) and `71e8c327` Wire tip-stack lanes into registry and round-aware self-iter dispatch.
  (16 files +3179/−186). The remaining tail members are fix/evidence rounds on the cited token
  contract and carry no distinct WWKD-token contract of their own.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-gates-report.md` (C3)
- Prior tip: `f9e4f9c9` — anchor of M-audit-early-0007
- Next: M-audit-early-0009
