# M-audit-late-0007 — Fleet L1/L2 merge: seat re-pin, 1024 runner ceiling, conformance expansion
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit cb388b72 (2026-09-12 20:51 -0300): the fleet-produced L1/L2 merge candidate — 238 files, +26008/-4543, produced by 16 L1 missions on `devin/swe-2:max` with up to 32 L2 lanes each — integrated as the new base. Landed surface: `crates/ufo-core-runtime` judge/handoff/loop-driver hardening (native evidence membrane, mutation battery, lane overlay, process group), `packages/ufo-core` orchestrator/pareto/policy/saturation/table5/wave plus conformance vector expansion (34 files under `conformance/`, including the exit round-stop truth table, handoff agent-table/integrity-bindings, native execution-profile/judge-wave/omp-route-yaml, proposal admit-receipts, retry advance-matrix and rules audit vectors), scripts collector/dispatcher/launcher/sighting-wall/tick/sync, the empirical/lanes/planner/shutdown/wave-context/ephemeral-L1/devin-subagents JS suites (15 files under `tests/`), `skills/ufo` with every packaged mirror, and ~61 docs synced to implemented behavior. Config: `modelRoutes.main` and all thirteen seats restored to `devin/swe-2:max` with `[]` fallbacks, advisor left at `openai-codex/gpt-6-astra:max`, `l1Context` deliberately NOT re-flattened (`minimumTokens` 1000000, five-route eligible catalog still excluding SWE-2), `sighting.dispatch.globalRunnerCeiling` raised 512 -> 1024 on operator directive 2026-09-12. Why: the commit is the third step of a documented sequence-honesty chain — `7c1f9468` swe-everywhere flatten, `9685fa4c` partial Main->Astra revert with 1M/five-route and ceiling 512, then this commit re-pinning the seats only and leaving the L1 context catalog at the 1M/five-route posture (`docs/L2-L3-ROUTING.md`, entry `grep -n 'committed in .cb388b72' docs/L2-L3-ROUTING.md`).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' cb388b72
```
Expected: commit resolves; subject `merge: fleet L1/L2 output — runtime, dispatch, guidance, conformance expansion`; dated 2026-09-12.
Actual:
```
cb388b72879a6c69726d5752ffed05d4848fcd71|2026-09-12 20:51:38 -0300|merge: fleet L1/L2 output — runtime, dispatch, guidance, conformance expansion
```

## Touches
- cb388b72879a6c69726d5752ffed05d4848fcd71 — 238 files, +26008/-4543. Single parent `9c24a942a99bcdf63005c8af99d2b55f79f2fa1c` despite the `merge:` subject (`git log -1 --format=%P cb388b72`; `cb388b72^2` does not resolve). Key paths: `config/ufo.json` (+44), `scripts/fleet-dispatcher.mjs` (769 insertions / 188 deletions), `scripts/collect-omp-native-handoff.mjs` (932), `scripts/ufo-sighting.mjs` (477), `scripts/sync-ufo-contracts.mjs` (223), `scripts/gates.sh` (25), `crates/ufo-core-runtime/src/native.rs` (291) plus `axes.rs`, `mutation.rs` (91), `loop_driver.rs`, `gate.rs`, `execution_profile.rs`, `crates/ufo-core-runtime/src/l3_swarm.rs`, `crates/ufo-core-runtime/tests/loop_driver.rs`, `packages/ufo-core/src/{orchestrator,pareto,policy,saturation,table5,wave}.ts`, `conformance/vectors/**` (34 files), `tests/**` (15 files), `skills/ufo/SKILL.md` (+229) and `skills/ufo/references/run-logic.md` (+240) across all packaged mirrors, `docs/L2-L3-ROUTING.md` (+81)
- `config/ufo.json` — omp-native `modelRoutes`: `main` + 13 seats all `devin/swe-2:max`; `modelFallbacks`: all `[]`; `advisor.model` = `openai-codex/gpt-6-astra:max` (`enabled: true`); `l1Context.minimumTokens` = 1000000 with the five-route eligible catalog (`openai-codex/gpt-6-astra:max`, `alibaba-token-plan/qwen3.8-max:xhigh`, `kimi-code/k3:max`, `alibaba-token-plan/deepseek-v4-pro:max`, `devin/kimi-k3:max` — no SWE-2); `sighting.dispatch.globalRunnerCeiling` = 1024; `sighting.dispatch.fleetL1Route` = `devin/swe-2:max`; devin-native seats all `swe-2-max` with `swe-2-medium` fallbacks and `contractProvenance` naming the 2026-09-12 operator contract
- `scripts/fleet-dispatcher.mjs` — `deriveRouteChain` enforces the fleet-scope exception: the fleet L1 route bypasses the 1M-eligibility check only for tasks carrying a `fleet` field, else `queue fleet L1 route requires a fleet field` (line 489)
- `docs/L2-L3-ROUTING.md` — this commit rewrites the doc header (partial re-flatten after `9685fa4c`) and corrects the `globalRunnerCeiling` table row 16 -> 512; the dated entry naming this commit was written later (beat 0008)

## Out-of-scope
- Commits before 2026-09-12 (beats M-audit-late-0001..0006)
- `9685fa4c` / `9c24a942` (the sighting overview pane, 32-wide L2 and the 512 runner ceiling — beat 0006)
- The later 2026-09-13 nx-* rounds and wrap consolidation (beat 0008)
- Whether the merged handwritten doc projections stayed current (later beats)

## Findings
- The commit body records: "Phase-0 gates green on the merged tree: contract mirrors, cargo build+test, full npm test, seven seat fixtures." Recorded claim from the commit body — no gate evidence was re-run in this audit.
- Single-parent check: `git log -1 --format=%P cb388b72` returns only `9c24a942a99bcdf63005c8af99d2b55f79f2fa1c`; `git rev-parse cb388b72^2` fails. The fleet output was squashed into a one-parent commit under a `merge:` subject.
- Fleet-field attribution is recorded but not on-tree accurate: the routing log entry naming this commit (HEAD line 370) says the same merge "re-added the `fleetL1Route` fleet-field requirement" removed in `7c1f9468`. On-tree, the guard string is already present in the parent tree (`9c24a942:422`), and `git log -S "queue fleet L1 route requires a fleet field"` shows add in `77f35f39`, removal in `7c1f9468`, re-add in `9685fa4c`. The dated entry itself also landed later: `git log -S 'committed in `cb388b72` in backticks' -- docs/L2-L3-ROUTING.md` returns `dbad47b5` — beat 0008.
- Ceiling history on the tree: 48 -> 16 (W3, 2026-09-11), 16 -> 512 (`9685fa4c`), 512 -> 1024 (this commit, operator directive 2026-09-12) — consistent with the routing-log row at HEAD.
- `l1Context` non-re-flatten is the deliberate asymmetry of this commit: every seat requests `devin/swe-2:max` while the non-fleet L1 eligibility catalog still lists five routes that exclude SWE-2. The routing log states the asymmetry explicitly rather than aligning the catalog silently.
- Change shape: 34 conformance files, 15 JS suites under `tests/`, 65 paths under `docs/`, 10 packaged mirrors of the ufo skill.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 9c24a942a99bcdf63005c8af99d2b55f79f2fa1c
- Next: M-audit-late-0008
