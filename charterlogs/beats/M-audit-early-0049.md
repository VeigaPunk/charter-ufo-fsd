# M-audit-early-0049 — qwen-seat dispatch-directive campaign: 7 ordered commits, prompt→mechanical

**Status:** COMPLETE | **Date:** 2026-08-31 | **Session:** audit-early

## Does
Seven commits in 2h30m12s (20:14:49 → 22:45:01 -0300) engineer one dispatch contract for the
qwen-seated lanes (planner, critic, distiller) inside `scripts/run-omp-native-trial.mjs`; the
sequence is an iteration ledger in which each measured field failure forced the next step, and the
failures are the evidence. Step 1 `89e35be9` adds `--print-thoughts --auto-approve` to every native
trial (comment: "Operator directive 2026-08-31: maximize verbosity; tools_allowed {*} / tools_deny
{} … auto-approve") plus a `# 语言规则` block on qwen seats (Chinese CoT, Chinese natural-language
output, English JSON contract keys, single terminal `| godspeed` marker), duplicated into 11
`skills/ufo/SKILL.md` mirrors. Step 2 `01f935d4` hoists the rule to the assignment head because the
tail placement "lacked salience: autoroute7 planner reasoned 0/6 chunks in Chinese"; step 3
`5e5e4560` adds a closing `再次确认` reminder (sandwich) because the hoist alone still measured
"1/5 Chinese chunks with head-only placement" on autoroute8, and freezes the contract. Step 4
`e8e60221` adds a Yield-discipline block after the root cause of autoroute3-5/7-10 BLOCKED was
diagnosed: qwen seats submit the first yield with `result` as a JSON string, OMP rejects it, the seat
retries, and the collector's single-yield integrity rule fails closed. Step 5 `eb8f2c8d` removes the
extra separator and collapses 3+ newline runs (`composed.replace(/\n{3,}/g, "\n\n")`) because
OMP normalizes triple-newline junctions when delivering a task to a child session, breaking the
collector's byte-match on autoroute11/12. Step 6 `7230a5d6` adds a wrong-vs-right contrast plus a
three-item pre-call checklist because "autoroute21/25 critics still stringified the first yield
result despite the shape rule" — two critic failures in the fleet, all other qwen seats clean. Step
7 `a93d23b7` concedes the prompt-only route and switches to a mechanical contract: prompt-only
yield-shape rules "plateaued at ~2/3 critic compliance", so `qwenYieldBlock(role)` embeds the exact
valid yield arguments (`{"result":{"data":{"role":…,"status":"completed"}}}`) for the seat to copy
verbatim — the same byte-reliable pattern already used for labrat; the collector and Rust judge
require exactly one successful yield, and its payload shape is contract-fixed. Steps 2–7 touch only
`scripts/run-omp-native-trial.mjs`; no test file is added in the campaign.

## Gate
```
for s in 89e35be9 01f935d4 5e5e4560 e8e60221 eb8f2c8d 7230a5d6 a93d23b7; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=iso 89e35be9 01f935d4 5e5e4560 e8e60221 eb8f2c8d 7230a5d6 a93d23b7
git show --shortstat --format= a93d23b7 | tail -1
git show --shortstat --format= 89e35be9 | tail -1
```
Expected: 7x ok; the seven subjects "dispatch directives…", "hoist Chinese language rule…",
"sandwich the Chinese language rule…", "add yield-shape discipline rule…", "fix qwen-seat
composition…", "strengthen yield discipline…", "embed-and-copy yield arguments…", ordered
20:14→22:45; a93d23b7 = 1 file, +15/−6; 89e35be9 = 12 files, +77/−14.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): 7x ok; the seven subjects at
20:14:49, 20:18:56, 20:24:42, 20:49:02, 21:09:29, 22:03:17, 22:45:01 -0300; "1 file changed, 15
insertions(+), 6 deletions(-)"; "12 files changed, 77 insertions(+), 14 deletions(-)".

## Touches
- `89e35be9` dispatch directives: max verbosity, full tools, Chinese CoT on qwen seats — 12 files +77/−14; `scripts/run-omp-native-trial.mjs` (`--print-thoughts`, `--auto-approve`), `skills/ufo/SKILL.md` + 10 mirrors
- `01f935d4` hoist Chinese language rule to qwen-seat assignment head — `scripts/run-omp-native-trial.mjs`, 1 file +10/−6
- `5e5e4560` sandwich the Chinese language rule on qwen seats — `scripts/run-omp-native-trial.mjs`, 1 file +6/−4
- `e8e60221` add yield-shape discipline rule for qwen seats — `scripts/run-omp-native-trial.mjs`, 1 file +5/−1
- `eb8f2c8d` fix qwen-seat composition: OMP collapses 3+ newline junctions — `scripts/run-omp-native-trial.mjs`, 1 file +6/−2
- `7230a5d6` strengthen yield discipline with wrong-vs-right contrast — `scripts/run-omp-native-trial.mjs`, 1 file +3/−2
- `a93d23b7` embed-and-copy yield arguments for qwen seats — `scripts/run-omp-native-trial.mjs` (`qwenYieldBlock`), 1 file +15/−6
- Paths: scripts/run-omp-native-trial.mjs (all seven), skills/ufo/SILL.md + 10 mirrors (step 1 only)

## Out-of-scope
- The routing re-charter that seats these lanes on `alibaba-token-plan/qwen3.8-max:xhigh`
  (`64f2f9ad`, beat M-audit-early-0048) — 5h11m earlier, separate decision.
- The fleet-dispatcher (`ec6d85bf`, 64m after the campaign closes, beat M-audit-early-0050), the
  sighting lifecycle (0051) and the 09-08 L2/L3 plan (0053).
- Root-cause archaeology of the named autoroute waves beyond what the commit bodies state; the run
  directories are runtime state, not beat evidence.
- Mirror byte-sync churn and the sibling window after 2026-09-10 — mission result report.

## Findings
- The cluster's own ledger is the measurable spine, quoted verbatim from commit bodies: step 2
  "autoroute7 planner reasoned 0/6 chunks in Chinese"; step 3 "autoroute8 overfit showed 1/5
  Chinese chunks with head-only placement"; step 4 "Root cause of autoroute3-5/7-10 BLOCKED: qwen
  planner/critic/distiller submit the first yield with result as a JSON string; OMP rejects it, the
  seat retries, and the collector's single-yield integrity rule fails closed (correctly)"; step 5
  "autoroute11/12 root cause: RULE(\n) + separator(\n) + body(\n# Target) created a triple-newline
  junction; OMP normalized it when delivering the task to the child session, breaking the collector
  byte-match"; step 6 "autoroute21/25 critics still stringified the first yield result despite the
  shape rule. Two critic failures in the fleet; all other qwen seats clean"; step 7 "Prompt-only
  yield-shape rules plateaued at ~2/3 critic compliance (autoroute21/25/32/33/37 all blocked on
  critic stringified yield)".
- The campaign ends in a concession, not a triumph: steps 4–6 are prompt interventions that did not
  close the defect, and step 7 replaces the prompt contract with a mechanical copy-block whose code
  comment states the plateau was measured "across three waves (autoroute9-37)". The qwen yield
  contract is therefore a workaround for seat behaviour, not a fixed instruction-following bug.
- Step 1's verification claims ("portable tests 39/39 green, 138 runtime tests green, autoroute7
  launched with rules active") are self-reported in the commit body; no test file is added or
  changed by any of the seven commits, so the campaign ships without a regression pin for the yield
  contract.
- Steps 2–7 are one-file edits with no other surface touched: the contract lives entirely in the
  generated assignment text. The assignment is byte-hashed into the collector's integrity check,
  which is why step 5's whitespace normalization had to be fixed rather than tolerated.
- Rule coverage was never the gap: step 4's `QWEN_YIELD_RULE` already states the required shape
  ("result 必须是对象，result.data 也必须是对象或值，绝不能把 result 或 result.data 提交为 JSON
  字符串") — a complete prose statement of the defect. Steps 6 and 7 record that the critic seat
  stringified the result anyway (~1/3 of critic runs), so the residue is seat compliance, not a
  missing instruction.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-late-report.md` (C4)
- Prior tip: `64f2f9ad` (anchor of M-audit-early-0048)
- Next: M-audit-early-0050
