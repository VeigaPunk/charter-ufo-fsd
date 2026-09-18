# M-audit-early-0016 — Saturation vs budget halt become machine-distinct exits

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
Paper R4 is a contract distinction, not wording: `saturated` (no admissible proposal) is the only
success exit, and a round-cap or budget stop is a graceful halt. `3bb2c17a` makes the self-iteration
loop actually reach saturation (11 files +1808/−181) — the script aborted at
`python3 -m ufo_core.cli doctor` because the Python twin had no doctor command, and then the body
records the real cause: "the loop ran but always ended budget_exhausted, so the script's APPROVED
assertion could never pass. Cause: 12 roster lanes each contribute one distinct admissible move and
the loop dedups by evidence, so it needs ~10 rounds". `9a921f9d` splits the exits and certifies local
8/16/32/64 dry workers (56 files +759/−115): "Self-iter now exits saturated only after a judged
no-admit round; budget_halt is a distinct unsuccessful label." `44b5dd20` makes the split fail-closed
on all three language loops (18 files +476/−57) — "A max-round, token, or compute stop is a budget
halt, never saturation. SaturationDetector no longer treats hitting max_rounds as saturated;
classifiers prefer halt flags over a saturated claim; tests fail if someone remaps halt → saturated
again." `8526acf3` closes the budget-exit masquerade in the orchestrator (4 files +121/−19): "It set
exit = 'ship' at the end of every improving round, so falling out of the round budget with the
frontier still climbing reported 'ship' … An operator reading the result could not tell a converged
run from a truncated one -- the budget-exit masquerade." `6473c5f0` repairs the inherited runtime
build and closes a further budget-exit masquerade (2 files +17/−9), `217586d1` stops
`budget_exhausted` from fake-passing paper gates by strengthening `judgeVerdict` to require saturated
plus battery/table5 gates (11 files +429/−152), and `80613c8e` refuses a stale N-API binding that
invents `saturated` on a liveness exit (2 files +129/−9). The second-order leg follows: `d2fcfe16`
wires a saturation auditor into the stagnation exit (6 files +244/−19) so that "Genuine exhaustion
(honest no_proposal rounds) still exits Saturated; vacuous correlated rejections exit Failed with
terminal_saturation_vacuous and κ_liveness — never successful_completion", and `60133052` seats
`classify_saturation` in the Python and TS self-iter paths so vacuous or unverifiable stagnation no
longer masquerades as saturated success (22 files +648/−131). One line of reasoning: saturation ↔
success is a machine invariant, so a round-cap hit while the frontier is still improving has to be
reported as a halt rather than as a ship.

## Gate
```
for s in 3bb2c17a 9a921f9d 44b5dd20 8526acf3 6473c5f0 60133052 d2fcfe16 217586d1 80613c8e 4c5542cc d00a72a1; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 8526acf3
git show --shortstat --format= 8526acf3 | tail -1
git show 217586d1:packages/ufo-core/src/policy.ts | sed -n '149,157p'
```
Expected: 9x "ok"; the budget-halt subject verbatim at 4 files +121/−19; policy.ts at 08-26 refusing
`budget_exhausted` marked success and `success` on a non-saturated kind.
Actual (observed 2026-09-18, HEAD 4adedde6): 9/9 ok; "8526acf3 fix(orch): report a round cap hit
while improving as budget_halt, not ship"; "4 files changed, 121 insertions(+), 19 deletions(-)";
policy.ts printed the two refusal branches with messages "R4 anti-pattern: budget_exhausted marked
success — budgets are halts, not completion" and "R4 anti-pattern: success=true only allowed for
saturated exit".
Wave-4 re-run (2026-09-18, HEAD 4adedde6): extended loop (11 SHAs) printed 11x ok, no failures.

## Touches
- `3bb2c17a` Make the self-iteration loop reach saturation, not just budget halt — 11 files +1808/−181
- `9a921f9d` Distinguish R4 saturation from budget halt and certify local 8/16/32/64 dry workers. — 56 files +759/−115
- `44b5dd20` fix(orch): fail-closed halt vs saturate on py/ts/rs loops — 18 files +476/−57
- `8526acf3` fix(orch): report a round cap hit while improving as budget_halt, not ship — 4 files +121/−19
- `6473c5f0` fix: repair the inherited runtime build and close a budget-exit masquerade — 2 files +17/−9
- `60133052` Seat classify_saturation in Python/TS self-iter paths; refresh F-C3 measure — 22 files +648/−131
- `d2fcfe16` feat(ufo-control-plane): wire second-order saturation auditor into stagnation exit — 6 files +244/−19
- `217586d1` fix(self-iter): budget_exhausted cannot fake-pass paper gates — 11 files +429/−152
- `80613c8e` fix: do not let stale N-API invent saturated on a budget halt — 2 files +129/−9
- `4c5542cc` feat(charter): empirical high-parallelism verification at real Charter substrate cardinality — 3 files +371−0; wave-4 fold: new scripts/charter-parallel-cardinality.mjs: real substrate child processes, one dry round each
- `d00a72a1` Certify child-process dry waves and honest host-missing doctors. — 33 files +400−92; wave-4 fold: certifies child-process dry waves (OS spawns replace worker threads); honest host-missing doctors
- Paths (as of the cited commits): packages/ufo-core/src/{policy,saturation,orchestrator}.ts,
  packages/ufo-orch/src/{exit,orchestrator,saturation}.ts,
  packages/ufo_core/src/ufo_core/{saturation,orchestrator,frontier}.py,
  crates/ufo-core/src/frontier.rs, crates/ufo-core-runtime/src/loop_driver.rs,
  packages/xbgst-runtime/src/parallel-cert.ts

## Out-of-scope
- Anti-pattern hard gates R1–R4 as a gate set — M-audit-early-0012.
- E1–E5 godspeed pin/membrane and the `assertSaturationNotBudget` export used for E4 exit purity
  (`cce664db`) — M-audit-early-0017.
- WWKD plan tokens before judge rounds — M-audit-early-0008.
- Paper battery execution and kill-rate provenance — M-audit-early-0011.
- Site ingestion (L0-owned) and the sibling window after 2026-09-10.

## Findings
- Invariant provenance, stated as-of: at `217586d1` (2026-08-26 00:48) the contract is enforced as
  `classifyExit`'s typed verdict plus two refusals in `assertSaturationNotBudget` — `budget_exhausted
  && success` and `success && kind !== "saturated"` — with the doc comment "True only when kind ===
  saturated (paper R4 success exit)". The literal biconditional `exit.success !== (exit.kind ===
  "saturated")` now visible in `packages/ufo-core/src/policy.ts` was introduced later, outside this
  window, by `dbad47b5` (2026-09-13) — the in-window form is the two-branch refusal, and this beat
  must not be read as claiming the biconditional landed on 08-25.
- Densest honesty family in the window: budget-exit masquerades closed three times (`6473c5f0`,
  `217586d1`, `80613c8e`), an R4 stretch where the saturation test itself misreported stagnation
  (`f93a2f3e`), and the second-order audit showing that first-order "saturated" was vacuous
  (`bbe9a948`, `d2fcfe16`) — which added `saturated_vacuous` / `saturated_unverifiable` as distinct
  kinds.
- Quoted from `80613c8e`: "classifyExit now fail-closes to the TypeScript R4 class when a stale
  binding invents saturated/ship/success (κ_commit) on a liveness exit. Saturation is not a budget
  halt. Native may stay stricter."
- As-of: `crates/ufo-control-plane`, `crates/ufo-pattern` and the `packages/xbgst-runtime` surfaces
  cited here are described at their cited commits; the crates were deleted 2026-08-29 by `96a4b6b4`
  "refocus UFO runtime on native OMP routing" and the xbgst-runtime path left the tree at 2026-08-28
  `23b209b7`. `crates/ufo-core-runtime/src/loop_driver.rs` is still present at HEAD.
- Cluster tail recorded but not duplicated in Touches: the scout cluster holds 33 SHAs; the 23 not
  cited here are `a7e93a41`, `c04242a7`, `484872ec`, `ff858493`, `cea43ec2`, `05f404ea`, `bbe9a948`,
  `37a29fe8`, `d03438f3`, `060e1b32`, `67283b43`, `64187156`, `f4a29267`, `b5339d4f`, `8029f66e`,
  `b761c945`, `5fe92716`, `2ac94b09`, `2ab09c43`, `ec35be5c`, `f93a2f3e`, `7935fc89`, `73d309ab`
  (`44ba6ab6`, the r5 stress lane, is recorded in M-audit-early-0004); none carries a distinct
  contract beyond the nine cited here.
- Wave-4 coverage remediation: 2 member(s) folded from the mis-adjudicated F10-PORTABILITY rejection(s) (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-gates-report.md` (C4)
- Prior tip: `54937ab3` — anchor of M-audit-early-0015
- Next: M-audit-early-0017
