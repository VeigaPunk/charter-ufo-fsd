# M-audit-early-0012 — Anti-pattern hard gates R1–R4 land in the runtime path

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
The paper's anti-pattern rules move from prose into enforced gates across TS and Rust, and the gate set
is then proven able to fail. `2c97c26e` hardens the paper anti-pattern gates (3 files +269/−3, adds a
206-line `policy.test.ts`): "Enforce confidence-never-an-axis, exclusion-topology score keys,
budget≠saturation exit labeling, and judgeVerdict that never APPROVES budget_exhausted." `8b4ad8ff`
implements them in the runtime path (4 files +116/−41), wiring `isBannedKey`,
`assertOnlyDeclaredAxisScores` and `assertSaturationNotBudget` into Pareto and the orchestrator and
"stop[ping] aliasing budget exhaustion as saturated". `d33b67ba` makes the fail-closed paper gate
capable of failing at all (9 files +1761/−389): "run_paper_batteries gates planner rounds, but every
input to it was a literal. LineageBattery::run_single_node_ablation returned is_load_bearing: true
unconditionally, PairRemovalBattery::run_all_pairs returned a hand-written 9-complementary/1-redundant
table, and 10 of 13 mutation rows carried a hardcoded actual_outcome. The gate reported nine-of-nine
and 84.6% whatever the runtime did, so the runtime walked on a guarantee nothing checked." `9a0aa561`
repairs the crate so its eleven tests can run and fixes the R4 masquerade those tests caught
(4 files +97/−150), and `b42d8d96` finishes the control-plane move so its 24 tests run and kills the
false R4 survivor (15 files +407/−137). `6b0d1e15` gives the dispatch gate axis directions and checks
all three gates against the conformance vectors (18 files +655/−607): "crates/ufo-runtime was promoted
into the workspace by a lane while its Axis carried no direction at all, so gate.rs compared raw score
values. Every minimised axis was therefore judged backwards … R1 running in reverse is worse than no
gate, because it looks like a gate." The non-finite hole is seated last: `ceed75fc` encodes R1
NaN/±Inf conformance vectors as `rejected_malformed` (16 files +406/−47) and `23f7c216` refuses
non-finite scores on the paper-crate R1 gate before comparison (7 files +55/−2), matching the
dual-runtime twins. `defdf825` closes the cross-language leg with E6 dual-orch R1–R4 conformance and
E7 WWKD fail-closed (14 files +882/−20). Numbering note: these are the **paper** R1–R4
(`docs/PAPER-SUMMARY.md`, landed `a169a54c`: R1 admit iff all axes non-regressive and at least one
strictly improves; R2 axes declared externally before the run; R3 no pre-specified terminal utility;
R4 saturation exit, budgets are halts not completion) — a different list from the R-numbered
requirement rows that `docs/REQUIREMENTS.md` carries elsewhere, whose R7 "Saturation is distinct from
budget halt and failure" merely restates paper R4. One line of reasoning: a fail-closed gate that
provably cannot fail is theater, so the conformance triple is checked against the same vectors in all
three languages instead of trusting each language's own gate.

## Gate
```
for s in 2c97c26e 8b4ad8ff d33b67ba 9a0aa561 b42d8d96 6b0d1e15 ceed75fc 23f7c216 defdf825 278a00b5 7162ea19 98f83710 aff7d294 e91daa93; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 6b0d1e15
git show --shortstat --format= 6b0d1e15 | tail -1
git show 2c97c26e:docs/PAPER-SUMMARY.md | sed -n '7,10p'
git show 2c97c26e:docs/REQUIREMENTS.md | grep -cE "^\| R[0-9]+ \|"   # 0 rows at this commit
git show 5f52e03a:docs/REQUIREMENTS.md | grep -cE "^\| R[0-9]+ \|"   # 18 rows at window tip
```
Expected: 9x "ok"; the axis-direction subject verbatim at 18 files +655/−607; paper R1–R4 lines; the
second numbering absent at 2c97c26e and present by the window tip.
Actual (observed 2026-09-18, HEAD 4adedde6): 9/9 ok; "6b0d1e15 Give the dispatch gate axis directions,
and check all three gates against the vectors"; "18 files changed, 655 insertions(+), 607
deletions(-)"; PAPER-SUMMARY printed the R1/R2/R3/R4 one-liners quoted above; REQUIREMENTS row counts
0 and 18.

Wave-4 re-run (2026-09-18, HEAD 4adedde6): 14/14 `ok` — extended cat-file loop (9 original + 5 folded SHAs) exited 0, no unresolved token.

## Touches
- `2c97c26e` feat(ufo-core): harden paper anti-pattern gates (R1–R4) — 3 files +269/−3
- `8b4ad8ff` feat(ufo-core): implement anti-pattern hard gates in runtime path — 4 files +116/−41
- `d33b67ba` feat(batteries): make the fail-closed paper gate capable of failing — 9 files +1761/−389
- `9a0aa561` Make the crate compile, then fix the R4 masquerade its own test caught — 4 files +97/−150
- `b42d8d96` Finish the control-plane move so its 24 tests run, and kill the false R4 survivor — 15 files +407/−137
- `6b0d1e15` Give the dispatch gate axis directions, and check all three gates against the vectors — 18 files +655/−607
- `ceed75fc` Seat Paper R1 NaN/±Inf conformance vectors as rejected_malformed. — 16 files +406/−47
- `23f7c216` Refuse non-finite scores on the paper-crate R1 gate. — 7 files +55/−2
- `defdf825` feat(runtime): E6 dual-orch R1–R4 conformance + E7 WWKD fail-closed — 14 files +882/−20
- `278a00b5` Separate boundary agreement from reason attribution in the cross-gate check — 17 files +434/-125; wave-4 fold: separates boundary agreement from reason attribution in the cross-gate check (E6/E7 family)
- `7162ea19` fix(gates): cross-lang portability assert crashed when 'ufo' binary absent — 1 file +35/-11; wave-4 fold: cross-lang portability assert stops crashing when the CLI is absent
- `98f83710` Recognize hangar mirrors as archives wherever they land — 2 files +32/-8; wave-4 fold: boundary walker recognises hangar mirrors as archives wherever they land (code)
- `aff7d294` fix(cross-lang gate): run python from the tree, and report spawns that never start — 2 files +73/-23; wave-4 fold: cross-lang gate runs python from the tree and reports spawns that never started
- `e91daa93` feat: cross-lang hangar_reconfig + portability assert — 9 files +528/-25; wave-4 fold: cross-lang hangar_reconfig parity + assert-cross-lang-portability wired into gates/smoke/triple-lang
- Paths (as of the cited commits): packages/ufo-core/src/{policy,pareto}.ts,
  packages/xbgst-runtime/src/self-iter.ts, crates/ufo-core/src/gate.rs, crates/ufo-pattern/src/gate.rs,
  crates/ufo-conformance/tests/gate_agreement.rs, conformance/vectors/r1-dominance.json,
  packages/ufo-orch/src/judge.ts, scripts/assert-paper-antipatterns.mjs (added `d0af1e00`)

## Out-of-scope
- Battery execution and kill-rate provenance — M-audit-early-0011.
- Saturation vs budget-halt exit semantics (the R4 *exit* contract) — M-audit-early-0016.
- E1–E5 godspeed pin/membrane, and the E-numbering disambiguation — M-audit-early-0017.
- WWKD plan tokens — M-audit-early-0008.
- Site ingestion (L0-owned) and the sibling window after 2026-09-10.

## Findings
- Three distinct gate-honesty failures in this cluster: the gate could not fail (`d33b67ba`), an R4
  masquerade was caught by the crate's own test only after the crate was made to build
  (`9a0aa561`), and a false R4 survivor (`b42d8d96`). Quoted from `9a0aa561`: "HEAD did not build. Two
  independent reasons, and because it did not build, none of the eleven tests in tests/ had ever
  executed."
- The dispatch gate silently inverted on minimised axes until `6b0d1e15`; the quoted body is the
  clearest statement of the class: "R1 running in reverse is worse than no gate, because it looks like
  a gate."
- Numbering drift is real and dated: `docs/REQUIREMENTS.md` carried 20 R-numbered rows at `87046b44`
  (2026-08-25 18:22), is a 27-line "Requirement evidence map" without R-ids at `2c97c26e`
  (2026-08-25 18:48), and carries 18 R-numbered rows again at the window tip `5f52e03a`. Rules cited
  in this beat are therefore named as paper R1–R4, the numbering that `2c97c26e` and `8b4ad8ff`
  actually implement.
- E-numbering boundary: `defdf825` is E6/E7 (dual-orch conformance, WWKD fail-closed) and is not the
  E1–E5 godspeed-pin family of M-audit-early-0017; a third, round-indexed list lives in the
  `docs/EVIDENCE-R2..R5.md` notes indexed by `docs/EVIDENCE-INDEX.md`.
- As-of: `crates/ufo-pattern`, `crates/ufo-conformance`, `crates/ufo-runtime`,
  `crates/ufo-control-plane` and `scripts/assert-paper-antipatterns.mjs` are described as of their
  cited commits; they are absent at HEAD, deleted 2026-08-29 by `96a4b6b4` "refocus UFO runtime on
  native OMP routing" (the last commit touching the assert script). `packages/ufo-core/src/policy.ts`
  is still present at HEAD.
- Cluster tail recorded but not duplicated in Touches: `575901d2`, `edc39242` (paper R1–R4 policy in
  the live-round lane), `7b95dbee`, `54600c34` (gate-wave evidence), `1b3d59c4` (missing
  generic/L1/L2/distill gates), `c3924b32` (R13 claim firewall), `81e6fa48`, `d0af1e00` (task-regime
  classification), `71947115`, `a453425a`, `4313131d` (R1 non-finite results).

- Wave-4 coverage remediation: 5 member(s) folded from the mis-adjudicated F5-HANGAR/F8-GATES/F7-CONFORMANCE rejections (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-gates-report.md` (C2)
- Prior tip: `33de2378` — anchor of M-audit-early-0011
- Next: M-audit-early-0013
