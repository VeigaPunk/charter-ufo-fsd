# M-audit-early-0011 — Paper mutation/ablation batteries execute instead of transcribing

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
The paper's internal-validation layer stops being a transcribed table and starts executing.
`7f297217` replaces the transcription (4 files +1567): the body names the failure — "The Python
batteries this replaces report outcomes as literals: mutation targets carry a hardcoded
actual_outcome, and run_single_node_ablation returns is_load_bearing=True unconditionally. Both keep
reporting the same numbers after the rule they guard is deleted." `51e72277` turns the mutation
battery into a harness with a computed kill rate (2 files +633/−12) because "tests/mutations.rs
checks five rules inside one test function, so the first failure hides the other four and no kill rate
exists anywhere." Wiring follows into every control plane: `33de2378` into the Rust runtime and TS
self-iter (18 files +1063/−43, fail-closed `PaperBatteries` before planner plus `ufo-cli batteries`
commands), `875686f3` into the root ufo control plane (12 files +674/−25, keeping `budget_halt`
reasons machine-distinct from saturation), `0f87f43a` as self-iter e2e exit criteria (61 files
+3422/−15) and `db94fe03` as CLI commands (2 files +20). The gates then have to read their own
output: `a6bd78fa` (8 files +156/−114) records that "All three sent the battery to /dev/null and then
echoed a fixed result line, so the gate proved the command exited 0 while announcing counts it had
never looked at", and `d0fad7f7` re-reads the battery's new envelope and holds it to the payload it
summarizes (30 files +1088/−417) after `gates.sh` failed with `KeyError: 'total_mutations'`.
`601cccb5` moves the pack gates onto executed numbers (7 files +458/−56), routing ufo-control gates
and pack self-iter through the battery modules so the recorded artifact carries executed kill-rate,
surviving ids and diverging witnesses rather than the old transcription. The Python twins follow on
08-26: `4dae6785` executes the mutation battery against `Frontier.admit` / `kappa_accept_local`
(6 files +692/−117) and `a8f1426e` executes lineage/pair-removal in code (7 files +654/−81), where
"Pair complementary is a count, not the paper's 9/1 split." One line of reasoning: a gate is only
evidence if it reads this run's payload, so the kill rate is computed from measured outcomes instead
of copied from the manuscript.

## Gate
```
for s in 7f297217 51e72277 33de2378 875686f3 0f87f43a db94fe03 a6bd78fa d0fad7f7 601cccb5 4dae6785 a8f1426e 1e559809 22dd29fc fa1a1803; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 4dae6785
git show --shortstat --format= 4dae6785 | tail -1
git show 23f7c216:docs/LANE-STATUS.md | grep -n "survivors"
git show 4dae6785:docs/KNOWN-GAPS.md | grep -n "hardcoded 76.9"
```
Expected: 11x "ok"; the executed Python battery subject verbatim at 6 files +692/−117; a survivor
line recorded after the 08-26 non-finite refusal; the "not a hardcoded 76.9" provenance sentence.
Actual (observed 2026-09-18, HEAD 4adedde6): 11/11 ok; "4dae6785 feat: execute Python mutation
battery against kappa_accept/frontier"; "6 files changed, 692 insertions(+), 117 deletions(-)";
LANE-STATUS at 23f7c216 printed "**11/13 = 84.6%**; survivors `M-REASON-PROSE`, `M-AXIS-ORDER`";
KNOWN-GAPS at 4dae6785 printed "those observations, not a hardcoded 76.9. Tests fail if".

Wave-4 re-run (2026-09-18, HEAD 4adedde6): 14/14 `ok` — extended cat-file loop (11 original + 3 folded SHAs) exited 0, no unresolved token.

## Touches
- `7f297217` feat(gates): execute the paper's mutation and ablation batteries instead of transcribing them — 4 files +1567
- `51e72277` Run the paper's mutation battery as a harness with a computed kill rate — 2 files +633/−12
- `33de2378` Wire paper batteries into Rust runtime and TS self-iter — 18 files +1063/−43
- `875686f3` Wire paper batteries into root ufo control plane — 12 files +674/−25
- `0f87f43a` feat: wire mutation/pair-removal/Table5 gates into self-iter e2e — 61 files +3422/−15
- `db94fe03` Wire ablation, pair-removal, and mutation benchmark commands into ufo CLI — 2 files +20
- `a6bd78fa` Make the three battery gates read their own output — 8 files +156/−114
- `d0fad7f7` Read the mutation battery's new envelope, and hold it to the payload it summarizes — 30 files +1088/−417
- `601cccb5` feat: pack-gate paper numbers from executed mutation/ablation batteries — 7 files +458/−56
- `4dae6785` feat: execute Python mutation battery against kappa_accept/frontier — 6 files +692/−117
- `a8f1426e` feat: execute Python lineage/pair-removal instead of manuscript table — 7 files +654/−81
- `1e559809` docs: note main-churn risk; fix status paper/bench path probes — 19 files +1095/-360; wave-4 fold: fixes status paper/bench path probes in the py runtime and substrate CLIs
- `22dd29fc` Make the reviewer lane score scalar isolation by executing the gate — 11 files +1629/-1131; wave-4 fold: reviewer lane scores scalar isolation by executing the gate instead of asserting it
- `fa1a1803` Deepen orch with empirical local adapters, multi-round gates, and substrate CLIs. — 42 files +1451/-187; wave-4 fold: empirical local adapters + multi-round gates + substrate CLI doctor/loop bins
- Paths (as of the cited commits): crates/ufo-core/src/{mutation,lineage,batteries}.rs,
  crates/ufo-control-plane/src/batteries.rs, tests/mutation_battery.rs, crates/ufo-cli/src/main.rs,
  packages/ufo_core/src/ufo_core/{mutation,lineage,table5}.py

## Out-of-scope
- Anti-pattern hard gates R1–R4 and their falsifiability — M-audit-early-0012.
- Saturation vs budget-halt exits — M-audit-early-0016.
- WWKD plan tokens that gate mutation claims — M-audit-early-0008.
- Rust/Python/TS conformance vectors as such (`defdf825` E6/E7) — M-audit-early-0012.
- Site ingestion (L0-owned) and the sibling window after 2026-09-10.

## Findings
- Kill-rate provenance, quoted from `4dae6785`: "Kill-rate is computed (10/13 = 76.9% here; survivors
  M-R1-NON-FINITE, M-REASON-PROSE, M-AXIS-ORDER), not a hardcoded 76.9. Tests fail if
  actual_outcome='Killed' / killed=True rows are restored as the gate source." Eleven minutes later
  the recorded measure reads 11/13 = 84.6% with survivors `M-REASON-PROSE`, `M-AXIS-ORDER`
  (`docs/LANE-STATUS.md` at `23f7c216`) — the third survivor named at 15:23 is gone after that
  commit's non-finite refusal on the R1 gate. [INFERENCE: the two quoted counts are both observed;
  the attribution of the delta to `M-R1-NON-FINITE` follows from the subject and body of `23f7c216`,
  not from a printed survivor diff.]
- Honest survivors are reported, not repaired away: `M-REASON-PROSE` and `M-AXIS-ORDER` remain
  survivors at the window tip, so the executed kill rate is computed from measured outcomes rather
  than asserted, and the floor check is what it is.
- Honest failure, quoted from `a6bd78fa`: the gates "proved the command exited 0 while announcing
  counts it had never looked at", and from `d0fad7f7`: "the gate worked as intended: this is a schema
  change loudly breaking" an envelope read — the first-generation gates could not read their own
  output family.
- As-of: the battery crates and Python modules cited here are described as of the cited commits;
  `crates/ufo-core`, `crates/ufo-control-plane`, `crates/ufo-cli`'s battery surface and
  `scripts/assert-paper-antipatterns.mjs` were deleted 2026-08-29 by `96a4b6b4` "refocus UFO runtime
  on native OMP routing".
- Cluster tail recorded but not duplicated in Touches: `3908801f` (lint for evidence batteries),
  `8d1807f0` (control-plane modules into the build graph), `c4ee7c07` (battery SSoT reads src),
  `c1107ce5` (Rust Table5 + triple-lang mutation parity), `44db6534` (read the mutation matrix off
  the report, not the envelope), `6ed0f908` (unbreak the mutation gate's assertion message),
  `08821f73` (mutation gate shape), `ebddf5b1`, `f3203606`, `44cfbb57` (drop orphaned root-level
  ablation/mutation copies), `c42e6b34`, `f8d9d966`, `5680e9e6`.

- Wave-4 coverage remediation: 3 member(s) folded from the mis-adjudicated F8-GATES/F9-ORCH rejections (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-gates-report.md` (C1)
- Prior tip: `a83301b2` — anchor of M-audit-early-0010
- Next: M-audit-early-0012
