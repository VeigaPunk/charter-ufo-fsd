# M-audit-late-0008 — nx-* continuous-improvement rounds + wrap consolidation
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit dbad47b5 (2026-09-13 08:59 -0300): the fleet's first self-iteration landing — 16 chartered nx-* iterate chains (perf, loop, conformance, dispatcher, sighting, evidence, trial, docs, website, contracts, substrates, tests, cli, gates, security, capability) ran 2-8 rounds each before the 256-task queue cap halted successor enqueues, and 10 one-shot wrap missions (5 `devin/kimi-k3:max` plus 5 `xai-oauth/grok-4.6:xhigh` L1s with SWE-2 L2s) consolidated and verified the landed state. 160 files, +11622/-3165: `crates/ufo-core-runtime/src/native.rs` (+810), `crates/ufo-cli/src/main.rs` (+557) with a new `crates/ufo-cli/tests/cli_contract.rs` (+320), `packages/ufo-core/src/{pareto,policy,saturation,orchestrator,table5,types,wave}.ts`, `packages/substrate-runtime/src/{lane-cli,self-iter-delegate,seat-skills,host-probe,capabilities}.mjs`, `scripts/fleet-dispatcher.mjs` (+486), `scripts/sync-ufo-contracts.mjs` (+651), `scripts/gates.sh` (+170), `scripts/ufo-sighting.mjs` (+456), the new `scripts/ufo-swarm-wave.mjs` (+521) with its `conformance/vectors/misc/swarm-wave.json` fixture (+537, duplicated into the packaged mirror), 46 doc paths, 24 skill/mirror paths. New config surface: `sighting.dispatch.swarm` (`maxLanes` 128, `minLanes` 2, `rampBatchSize` 5, `rampIntervalMs` 700) with a note pinning `devin/swe-2:max`, one batched task call per wave, resume lanes revived via hub send, and a taxonomy role on every spawn lane; `.omp/config.yml` gains `task`/`smol` = `@ufo_swe2` and `.omp/ufo-l1.yml` drops `ufo_luna`.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' dbad47b5
```
Expected: commit resolves; subject `fleet: nx-* continuous-improvement rounds + wrap consolidation`; dated 2026-09-13.
Actual:
```
dbad47b5b1878796e0e2718d910f35f1e0a2c122|2026-09-13 08:59:50 -0300|fleet: nx-* continuous-improvement rounds + wrap consolidation
```

## Touches
- dbad47b5b1878796e0e2718d910f35f1e0a2c122 — 160 files, +11622/-3165; parent `cb388b72879a6c69726d5752ffed05d4848fcd71`. Key paths: `config/ufo.json` (+94) and its bundled mirror `crates/ufo-core-runtime/bundled/config.json` (+94), `scripts/ufo-swarm-wave.mjs` (new, 521 lines), `conformance/vectors/misc/swarm-wave.json` (new, 537 lines), `crates/ufo-core-runtime/src/{native.rs,distill.rs,lanes.rs,loop_driver.rs,proposal.rs}`, `crates/ufo-cli/src/main.rs` / `titanium.rs`, `crates/ufo-core-runtime/tests/{conformance.rs,perf_probe.rs,native_support/mod.rs}`, `packages/ufo-core/src/**`, `packages/substrate-runtime/src/**`, `scripts/**`, `docs/**` (46 paths), `skills/ufo/**` + packaged mirrors
- `config/ufo.json` — `sighting.dispatch` gains the `swarm` block (`maxLanes` 128, `minLanes` 2, `rampBatchSize` 5, `rampIntervalMs` 700, self-describing `note`); `globalRunnerCeiling` stays 1024 and `queuePath` stays `.ufo/pending-work.json`
- `scripts/fleet-dispatcher.mjs` — `const MAX_QUEUE_TASKS = 256` with capacity relief before refusal: successor enqueue at capacity archives receipt-valid completed rows first, then records `budget_halt` with `queue_task_cap_reached`
- `.omp/config.yml`, `.omp/ufo-l1.yml`, `config/the-tick.machine.json` (`results` path added under the tick roots)

## Out-of-scope
- Commits before 2026-09-13 (beats M-audit-late-0001..0007)
- The 2026-09-13 swarm-port follow-up on `scripts/ufo-swarm-wave.mjs` (`45de8753`, `--spec`/`--spec-json` plus the `run` verb — beat 0009)
- The JS test suites the commit body excludes ("Test files intentionally excluded from this commit") — their absence is noted, not audited
- Later doctrine syncs (1024 ceiling propagation, advisor reroute — beat 0010)

## Findings
- Queue cap is an honest budget halt, not saturation: `MAX_QUEUE_TASKS = 256` bounds the pending-work queue, and the iterate membrane successor path (`queue.tasks.length >= MAX_QUEUE_TASKS`) first attempts lossless archive relief of receipt-valid completed rows, then returns `finish("budget_halt", { error: "queue_task_cap_reached" })`. Nothing marks a round saturated or invalid on that path; the commit body's "halted successors" is a budget stop at the enqueue bound. The constant was introduced in `cb388b72` and is unchanged here (`git log -S "MAX_QUEUE_TASKS = 256" -- scripts/fleet-dispatcher.mjs` returns only `cb388b72`).
- Verified against the commit body: no `tests/*.js` and no `*.test.ts` paths are present in this commit; four Rust test-crate files did land (`crates/ufo-cli/tests/cli_contract.rs`, `crates/ufo-core-runtime/tests/{conformance.rs,perf_probe.rs,native_support/mod.rs}`), so the exclusion applied to the JS harness suites. `perf_probe.rs` self-describes as a throwaway nx-perf measurement harness, not a regression test.
- The commit body records no gate tally for this commit — no PASS count is asserted here (unlike the later pack beats that record `gates.sh` results).
- Doc timing: this commit's own `docs/L2-L3-ROUTING.md` diff (+40) writes the retroactive 2026-09-12 entries, including the entry naming `cb388b72` and the fleet-field re-add attribution discussed in beat 0007 — the annotation post-dates the merge it describes.
- Swarm surface shape: one batched task call per wave, at most 128 lanes counting spawns and resumes together, two lanes minimum unless every lane is a resume, pairwise-distinct expanded prompts required, resumes preserve agent identity, and no per-lane model parameter (SWE-2 pinned) — mirrored into both the root and packaged conformance fixtures.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: cb388b72879a6c69726d5752ffed05d4848fcd71
- Next: M-audit-late-0009
