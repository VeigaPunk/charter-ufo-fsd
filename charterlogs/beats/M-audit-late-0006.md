# M-audit-late-0006 — Fleet overview pane + 32-wide L2 + 512 runner ceiling; partial Main->Astra revert
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commits 9685fa4c (2026-09-12 14:08 -0300) and its folded follow-up 9c24a942 (14:19 -0300): the sighting layer gains a live per-mission overview pane (L1/L2/L3, phase, age, reservation, title), event-driven via `fs.watch` over the state dir and marked `@ufo_overview`, spared from mission reaping and deduped on refresh; the wave overlay treats 32 as the parallel ceiling (`task.maxConcurrency 32`, called out as the OMP and native-protocol max) and `sighting.dispatch.globalRunnerCeiling` moves 16 -> 512; and the same commit partially reverts the 7c1f9468 swe-everywhere flatten — Main returns to `openai-codex/gpt-6-astra:max` with an empty fallback array, `l1Context.minimumTokens` returns to 1000000 with the five-route catalog (SWE-2 removed), the dormant DeepSeek override suffix is reordered to `[devin/kimi-k3:max, openai-codex/gpt-6-astra:max]`, `.omp/config.yml` `default`/`ufo_astra` resolve to Astra/max again — while all thirteen L2 roles stay on `devin/swe-2:max` with terminal-empty fallbacks. Why: the partial revert is a deliberate, logged split between the L1 and L2 seats, and the routing log fixes the sequence so later reads cannot misattribute it — `2026-09-12 17:08 UTC (commit 9685fa4c, 14:08 -0300)` records the partial revert, and the later entry states the rule verbatim: `7c1f9468` flatten -> `9685fa4c` partial Main->Astra + 1M/five-route + ceiling 512 -> `cb388b72` seat re-pin only (`docs/L2-L3-ROUTING.md`).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 9685fa4c 9c24a942
```
Expected: both cluster commits resolve (git emits `--no-walk` output in default reverse-chronological order, so 9c24a942 precedes 9685fa4c); subjects `feat(sighting): fleet overview pane + 32-wide L2 + 512 runner ceiling` and `fix(sighting): overview pane watches state dir (rename-safe) and spans full window width`; both dated 2026-09-12.
Actual:
```
9c24a942a99bcdf63005c8af99d2b55f79f2fa1c|2026-09-12 14:19:08 -0300|fix(sighting): overview pane watches state dir (rename-safe) and spans full window width
9685fa4c96b32af9905405c8315e5767eb42399d|2026-09-12 14:08:15 -0300|feat(sighting): fleet overview pane + 32-wide L2 + 512 runner ceiling
```

## Touches
- 9685fa4c96b32af9905405c8315e5767eb42399d — 106 files, +10100/-1596. Key paths: `scripts/ufo-sighting.mjs` (overview pane, `@ufo_overview` marker, `fs.watch` state-dir watching, reap/dedup handling), `scripts/ufo-sighting` (verb wiring), `config/ufo.json` (`globalRunnerCeiling` 16 -> 512; Main -> `openai-codex/gpt-6-astra:max` with `[]`; `l1Context.minimumTokens` -> 1000000; five-route catalog; DeepSeek override suffix reorder), `.omp/config.yml` (`modelRoles.default` -> `@ufo_astra`, `ufo_astra: openai-codex/gpt-6-astra:max`; `task.maxConcurrency: 32`; fallback-chain reorder), `crates/ufo-core-runtime/src/lane_overlay.rs` (1 MiB overlay ceiling, `MAX_PARALLEL_CAP` 64), `conformance/vectors/native/omp-route-yaml.json` (`maxConcurrency: 32`, `default: "@ufo_astra"`, `ufo_astra` pin asserted), `scripts/fleet-dispatcher.mjs` (+237), `scripts/collect-omp-native-handoff.mjs` (+132), `scripts/sync-ufo-contracts.mjs` (+143), `scripts/run-omp-native-trial.mjs` (+282), `scripts/omp-native-shutdown.mjs` / `scripts/omp-role-work.mjs` / `scripts/omp-wave-context.mjs` (new), `scripts/the-tick-ping.mjs` / `scripts/the-tick-config.mjs`, `scripts/ufo-mission-result.mjs` (+104), `crates/ufo-core-runtime/tests/loop_driver.rs` (+830), `tests/ufo-sighting.test.js` (+288), `tests/fleet-dispatcher.test.js` (+270), `docs/L2-L3-ROUTING.md`
- 9c24a942a99bcdf63005c8af99d2b55f79f2fa1c — 1 file, +8/-8 (`scripts/ufo-sighting.mjs`): the overview pane watches the state dir rename-safely and spans the full window width (folded satellite of this cluster)

## Out-of-scope
- The 7c1f9468 flatten itself (beat M-audit-late-0005) and the cb388b72 seat re-pin + 1024 ceiling (beat M-audit-late-0007)
- Commits before 2026-09-11 (sibling audit-early window) and the remaining 2026-09-13..18 pack commits (beats 0008..0024)
- Whether the 32-ceiling and ceiling-512 values survive later doctrine changes (tracked in later beats)

## Findings
- Commit body records the `cap0912` assessment: "no hard cap of 2; sessions freeze maxConcurrency at launch" (recorded claim, not re-derived here).
- The commit spans more than the sighting pane: the touched path list includes the fleet-dispatcher, collector, sync-gate, trial-runner and tick scripts, so this cluster's config surface (Main->Astra, 1M/five-route, ceiling 512) is the audit-relevant part of a broader fleet integration commit.
- The routing log dates the revert entry `2026-09-12 17:08 UTC` while the commit timestamp is `2026-09-12 14:08:15 -0300` (17:08:15 UTC); the two spellings in this beat refer to the same commit.
- All thirteen L2 roles remain `devin/swe-2:max` with `[]` fallbacks after this commit; the flatten is reverted for Main only — the sequence-honesty rule in the routing log (`7c1f9468` flatten -> `9685fa4c` partial Main->Astra + 1M/five-route + ceiling 512 -> `cb388b72` seat re-pin only) is preserved verbatim here so the later re-pin is not read as a second flatten.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 7c1f9468534f1bdd49801dab62da6ea8e8118fa1
- Next: M-audit-late-0007
