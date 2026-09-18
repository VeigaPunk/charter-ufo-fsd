# M-audit-early-0013 — LIVE-strict harness + D2–D5 decoy tests

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
Raises the testing axis from "green" to "a decoy cannot pass green" across two
commits two minutes apart. `8a155ec0` (18:50:10 +0000) announces the ladder but
delivers only a one-line import swap (`injectGodspeed` → `loadGodspeedDirective`
in `packages/xbgst-runtime/src/self-iter.ts`, 1 file +1/−1). `54945509` (18:52:11
+0000) lands the contract (8 files +212/−166): `packages/ufo-core/src/policy.ts`
`classifyExit` rejects budget-exit masquerade (D2 — `improved=true` at
`maxRounds` is `kind=budget_exhausted`, `success=false`);
`packages/xbgst-runtime/src/task-fanout.ts` introduces `FanoutLayer =
"agent-task" | "node-probe"` and `buildHonestFanoutTelemetry` so LIVE→DRY
fallback never counts as `liveOk` (D3), Node-probe results never inflate
`agentTaskFanoutCount` (D4), and `UFO_LIVE_STRICT=1` returns `status=blocked`
instead of silent dry-fallback (T2); `packages/ufo-core/src/pareto.test.ts` D5
rejects a cross-Umwelt score paste with empty evidence as `missing_evidence`;
`scripts/live-probe.sh` is the executable contract (exit 0 = live, 2 = dry
fallback, 3 = blocked strict). Decision: strict mode fails closed; a Node probe
is not an agent Task; dry fallback may never be recorded as live.

## Gate
```
for s in 8a155ec0 54945509 5642154d a86b3a32; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 8a155ec0 54945509
git show --shortstat --format="" 8a155ec0 54945509
```
Expected: 2x ok; subjects match Touches; scales 1 file +1/−1 and 8 files
+212/−166.
Actual: both ok; subjects and shortstats match exactly (2026-09-18).
Wave-4 re-run (2026-09-18, HEAD 4adedde6): extended loop (4 SHAs) printed 4x ok, no failures.

## Touches
- `8a155ec0` Raise testing axis: LIVE-strict harness, D2–D5 decoys, honest Task telemetry — 1 file +1/−1
- `54945509` Land LIVE-strict node-probe telemetry and D2–D5 decoy tests — 8 files +212/−166
- `5642154d` Apply round2 scoring to specialist-wave Pareto distillation. — 1 file +4−4; wave-4 fold: round2 applied to the cx-critic-decoy author scores in self-iter.ts
- `a86b3a32` Round polish: full FRAMEWORK, FRICTIONS register, score rounding. — 5 files +272−22; wave-4 fold: introduces round2 and applies it to the frontier score fold; ports FRAMEWORK/FRICTIONS registers
- Paths: packages/ufo-core/src/policy.ts, packages/ufo-core/src/pareto.test.ts, packages/xbgst-runtime/src/task-fanout.ts, packages/xbgst-runtime/src/self-iter.ts, packages/xbgst-runtime/src/self-iter.test.ts, scripts/live-probe.sh, docs/evidence/live-agent-rounds/

## Out-of-scope
- LIVE/DRY Task fan-out telemetry arming and `7df8f627` (UFO_AGENT_TASK_FANOUT_COUNT
  wiring) — M-audit-early-0007 (Gates C7; L1 collision ruling).
- Saturation-vs-budget machine-distinct exits beyond the D2 decoy test —
  M-audit-early-0016 (Gates C4).
- Anti-pattern hard gates R1–R4 — M-audit-early-0012.
- Godspeed filter.md pin war — M-audit-early-0015.
- fix(honesty) live-seat wave — M-audit-early-0025.
- Merge `467dacbb` of branch `cursor/testing-live-strict-decoy-5b75` (excluded by
  `--no-merges`).

## Findings
- Subject-vs-diff drift on `8a155ec0`: the subject claims the full LIVE-strict /
  D2–D5 / honest-Task ladder; the diff is a one-line import rename. The harness
  lands two minutes later in `54945509`. Recorded as commit-hygiene, not a
  destructive honesty event.
- Decoy inventory (as of `54945509`): D2 = budget-exit masquerade rejected as
  non-success; D3 = LIVE→DRY records `dryFallback` and never `liveOk`; D4 =
  `agentTaskFanoutCount` is parent-supplied, never derived from node-probe
  results; D5 = empty-evidence score paste → `missing_evidence`; T2 =
  `UFO_LIVE_STRICT=1` → `status=blocked` with a blocker string.
- Self-iter also writes a synthetic "Scalar confidence decoy" proposal each round
  (`rN-decoy-confidence`, author `cx-critic-decoy`) and emits
  `.xbgst/fanout-telemetry.json` via `buildHonestFanoutTelemetry`.
- Wave-4 coverage remediation: 2 member(s) folded from the mis-adjudicated F9-ORCH and F8-GATES rejection(s) (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha .ufo/scopes/audit-early/plan-r1.md + scout-honesty-report.md (C4)
- Prior tip: 2c97c26e — anchor of M-audit-early-0012
- Next: M-audit-early-0014
