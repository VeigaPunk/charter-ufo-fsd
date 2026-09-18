# M-audit-early-0048 — Four-family autonomous L1 routing; kimi-code OAuth; wall auto-open

**Status:** COMPLETE | **Date:** 2026-08-31 | **Session:** audit-early

## Does
`64f2f9ad` re-charters model routing (34 files, +1264/−315). Ten native seats are pinned to four
task-aware families: `main`/`connector` = `openai-codex/gpt-5.6-sol:max`,
`planner`/`critic`/`distiller` = `alibaba-token-plan/qwen3.8-max:xhigh`,
`reviewer`/`sentinel` = `alibaba-token-plan/deepseek-v4-pro:max`,
`scout`/`executor`/`labrat` = `xai-oauth/grok-4.6:low` (`config/ufo.json`, 49+/14−). Each role gains
a typed same-substrate `modelFallbacks` chain (e.g. main → qwen3.8-max → deepseek-v4-pro →
grok-4.6), duplicated as the `LIVE_CHAINS` table in `deps/bootstrapper/the-bootstrapper` and as Rust
constants plus a route/fallback pinning test in
`crates/ufo-core-runtime/src/execution_profile.rs` (102+/22−); `.omp/config.yml` (17+/15−) carries
the byte projection (`@ufo_qwen`, `@ufo_deepseek`, `@ufo_sol`, `@ufo_grok` replace
`@ufo_thinking`/`@ufo_mechanical`). The decision is stated in the canonical skill: routing is
autonomous and "the operator never pinpoints a model per dispatch" — dispatch-time model pinning is
abolished in favour of pinned route + typed fallback chain. Two lanes are added to the portable
roster (`mutation-tester`, `revenger`, the latter on `gpt-5.6-sol:max`). `sighting.autoOpenL1: true`
makes the trial launcher auto-open every native L1 into the sighting wall, degrading in-process when
the wall is unavailable. Kimi is wired on OMP through Kimi Code OAuth (`kimi-code` provider: models
`kimi-for-coding`, `kimi-for-coding-highspeed`, `k3`, `k3-256k`) with `routedLanes: false` and the
moonshot API-key route disabled; each kimi-code model declares a token-plan fallback first in its
cascade, gated on the new `scripts/probe-token-plan-kimi.mjs` (+93). `docs/BEHAVIOR-MATRIX.md` is a
one-line rewrite of the `ufo-omp` row to the four-family description. 11 `skills/ufo/SKILL.md`
mirrors and 11 `references/run-logic.md` mirrors are byte-synced; `tests/bootstrapper-routes`,
`collect-omp-native-handoff` and `orchestrator` tests are updated (+51/−14 across the three).

## Gate
```
git cat-file -e 64f2f9ad^{commit} && echo "64f2f9ad ok"
git log --no-walk --pretty="%h %ad %s" --date=iso 64f2f9ad
git show --shortstat --format= 64f2f9ad | tail -1
git show 64f2f9ad:config/ufo.json | jq -c '.nativeProfiles["omp-native-v1"].modelRoutes, .nativeProfiles["omp-native-v1"].kimiOAuth.tokenPlanFallback.available, .sighting.autoOpenL1'
```
Expected: SHA resolves; subject "ufo: four-family autonomous L1 routing, new lanes, wall auto-open,
kimi-code OAuth wiring" at 2026-08-31 15:03:37 -0300; 34 files, +1264/−315; the four families as
listed; `tokenPlanFallback.available false`; `autoOpenL1 true`.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): 64f2f9ad ok;
"64f2f9ad 2026-08-31 15:03:37 -0300 ufo: four-family autonomous L1 routing, new lanes, wall
auto-open, kimi-code OAuth wiring"; "34 files changed, 1264 insertions(+), 315 deletions(-)";
modelRoutes printed with the four families (sol/qwen3.8-max/deepseek-v4-pro/grok-4.6);
`false`; `true`.

## Touches
- `64f2f9ad` ufo: four-family autonomous L1 routing, new lanes, wall auto-open, kimi-code OAuth wiring — 34 files +1264/−315; modifies `config/ufo.json` (49+/14−), `.omp/config.yml` (17+/15−), `crates/ufo-core-runtime/src/{execution_profile.rs,native.rs}`, `scripts/collect-omp-native-handoff.mjs`, `scripts/run-omp-native-trial.mjs`, `deps/bootstrapper/the-bootstrapper`, `docs/BEHAVIOR-MATRIX.md` (1+/1−), `skills/ufo/SKILL.md` (SSoT) + 10 seat mirrors; adds `scripts/probe-token-plan-kimi.mjs` (+93)
- Paths: config/ufo.json, .omp/config.yml, crates/ufo-core-runtime/src/execution_profile.rs, crates/ufo-core-runtime/src/native.rs, scripts/run-omp-native-trial.mjs, scripts/collect-omp-native-handoff.mjs, scripts/probe-token-plan-kimi.mjs, deps/bootstrapper/the-bootstrapper, docs/BEHAVIOR-MATRIX.md, skills/ufo/SKILL.md, tests/{bootstrapper-routes,collect-omp-native-handoff,orchestrator}.test.js

## Out-of-scope
- The 08-29 profile these routes replace (`96a4b6b4`, beat M-audit-early-0046) — cited there as-of.
- The qwen-seat dispatch-directive campaign that begins 5h11m later (`89e35be9` … `a93d23b7`, beat
  M-audit-early-0049): this commit selects the qwen family, it does not tune its prompts.
- The fleet-dispatcher (M-audit-early-0050), the sighting lifecycle changes (0051) and the 09-08
  routing-plan document for L2/L3 (`e706c4f9`, beat M-audit-early-0053).
- Mirror byte-sync churn (22 files here) and the sibling window after 2026-09-10 — noted in the
  mission result report, not restated.

## Findings
- Honest gap shipped inside a green commit, quoted from the body: "Singapore token plan currently
  surfaces no Kimi ids - slot inactive". It is persisted as configuration, not as prose:
  `kimiOAuth.tokenPlanFallback.available: false` with `availabilityProbe:
  scripts/probe-token-plan-kimi.mjs`. The canonical skill states the same bound: "As of 2026-08-31
  the Singapore Token Plan does not surface those Kimi ids (probe:
  `scripts/probe-token-plan-kimi.mjs`), so the slot is declared but inactive until the probe reports
  them served."
- The probe resolves its credential from an Alibaba config file or the OMP credential store and
  prints a JSON verdict (exit 0 when at least one Kimi model is served, exit 2 otherwise); the
  credential itself is not recorded in the repository.
- `routedLanes: false` plus the skill's "Kimi is for testing only and is not a routed native lane"
  mean the OAuth wiring is declared capability, not a seat route: neither kimi-code model appears in
  `modelRoutes` or `modelFallbacks`.
- Route-table duplication is by design here (config, bootstrapper script, Rust constants, `.omp`
  projection); the single-authority decision that demotes all but `config/ufo.json` to checked
  projections is written four days later in `e706c4f9` (beat M-audit-early-0053).
- `64f2f9ad` touches `tests/bootstrapper-routes.test.js` (+77/−8) and `85c21e38` (2026-09-08, beat
  M-audit-early-0052) deletes that file because its subject binary was purged — the test outlives its
  subject by 8 days.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-late-report.md` (C2)
- Prior tip: `1cbf9a10` (anchor of M-audit-early-0047)
- Next: M-audit-early-0049
