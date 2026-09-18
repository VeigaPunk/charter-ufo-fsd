# M-audit-late-0018 — Pack P4: routing tiers, failure domains, domain probes, lane-health ledger (spec 04 + A-04 + spec 08 §1/§2)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for 10e39d85 (2026-09-17 20:55:58 -0300). Config: `routeTiers` (5 tiers: orchestrator / planner / thinking / distiller / mechanical), `seatTiers` (15 seats: `main` + the 14 roles) and `failureDomains` (4 provider domains: `devin_oauth`, `alibaba_token_plan`, `openai_codex`, `xai_oauth`) land inside `nativeProfiles.omp-native-v1` in `config/ufo.json` (+38, mirrored in `crates/ufo-core-runtime/bundled/config.json`), generated mechanically from the existing pins by a throwaway script that byte-verified tier-chain equality; `modelRoutes` / `modelFallbacks` are untouched and remain the consumed surface. Sync gate: a `routes:equivalence` step in `scripts/sync-ufo-contracts.mjs` (+201) resolves every seat through `seatTiers` -> `routeTiers` and byte-compares the resolved chain against the pins (the 14 roles + `main` through `seatTiers`, `sighting.dispatch.fleetL1Route` checked in the same pass), halting in all sync modes on divergence and naming seat + tier + both values; `CHANGELOG.md` joins the skill mirror set with a fail-closed canonical-presence check. Contract hash: `skills/ufo/references/CHANGELOG.md` (new, 52 lines) joins `NATIVE_CONTRACT_FILES` (37) and `PROJECT_OMP_MIRRORS` (19) in `crates/ufo-core-runtime/src/native.rs`, with the pinned-inventory asserts recomputed. Launcher (`scripts/run-omp-native-trial.mjs` +367): per-domain Phase 0 probes on real launches only — domains serving a no-fallback tier (`devin_oauth`, `alibaba_token_plan`), cheapest serving route (lowest chain index, effort tie-break), <=4 KiB / 60 s bounds, `devin_oauth` `operator_attested`; a dead domain halts pre-dispatch naming domain + killed seats + stranded hops with the dispatch snapshot rolled back; transport errors are typed halts; `phase0ProbeTokens` over-budget halts before any probe; the fixture seam `UFO_TEST_DOMAIN_PROBES` keeps tests live-call-free. Lane health: the collector (`scripts/collect-omp-native-handoff.mjs` +217) appends one `.ufo/routing-health.jsonl` row per seat attempt (hops get per-attempt rows with window-attributed usage; pre-spawn failures get a typed failure), with `quality_degraded` for blank-artifact completions, and `ufo routing-health [--since]` (`crates/ufo-cli/src/main.rs` +152) aggregates attempts / outcomes / p50 / p95 / tokens per route. Prose: the run-logic §6 prose routing table is DELETED (invariant paragraph, generated failure-domain kill analysis and effort rule remain); dated routing passages moved to the new canonical `skills/ufo/references/CHANGELOG.md` (spec 08 §1 routing rows; §2 doc-side edits complete); mirrors + `skills/SHA256SUMS` + `ufo-deps.lock` regenerated. Drills: `d-equiv`, `d-tier-resolve`, `d-brake-actual`, `d-brake-projected`, `d-interrupted`, `d-ledger-gap`, `d-health` wired (commit body records 31 pass / 23 pending-mechanism), `d-domain-kill` / `d-domain-partial` still pending; the commit body records gates.sh 21/21 PASS including `routes:equivalence` and the drills stage.
Why: the 2026-09-17 improvement-pack entry in the new `CHANGELOG.md` records the rationale — three re-charters in five days proved the route table the most volatile artifact in the most expensive format, so tier indirection plus the equivalence gate replace prose restatements and the config becomes the sole statement.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 10e39d85
```
Expected: the commit resolves; subject `ufo pack P4: routing tiers, failure domains, domain probes, lane-health ledger (spec 04 + A-04 + spec 08 §1/§2)`; dated 2026-09-17.
Actual:
```
10e39d8565bc8143cea022662be9db90736b6706|2026-09-17 20:55:58 -0300|ufo pack P4: routing tiers, failure domains, domain probes, lane-health ledger (spec 04 + A-04 + spec 08 §1/§2)
```

## Touches
- 10e39d8565bc8143cea022662be9db90736b6706 — 62 files, +3401/-852. Key paths: `config/ufo.json` (+38) and `crates/ufo-core-runtime/bundled/config.json` (+38, `routeTiers`/`seatTiers`/`failureDomains` under `nativeProfiles.omp-native-v1`), `scripts/sync-ufo-contracts.mjs` (+201, `routes:equivalence` + mirror set), `scripts/run-omp-native-trial.mjs` (+367, Phase 0 domain probes), `scripts/collect-omp-native-handoff.mjs` (+217, routing-health ledger), `crates/ufo-cli/src/main.rs` (+152, `ufo routing-health`), `crates/ufo-cli/tests/cli_contract.rs` (+124), `crates/ufo-core-runtime/src/native.rs` (contract inventories), `native_tests.rs` (+60), `skills/ufo/references/CHANGELOG.md` (new canonical) + `skills/ufo/SKILL.md` + `references/run-logic.md` and every packaged mirror, `ufo-deps.lock`, `skills/SHA256SUMS`, `tests/run-omp-native-trial.test.js` (+365), `tests/sync-ufo-contracts.test.js` (+299), `tests/collect-omp-native-handoff.test.js` (+199), `drills/{d-equiv,d-tier-resolve,d-health,d-brake-actual,d-brake-projected,d-interrupted,d-ledger-gap}.drill.json`, `docs/advisory/2026-09-17-ufo-improvement-pack/04-routing-tiers-and-failure-domains.md` (+57), `.../08-contract-docs-restructure.md` (+14), `.../16-amendments-to-specs-00-09.md` (+9)
- `config/ufo.json` failure-domain kill analysis (recorded there): `devin_oauth` down kills orchestrator + thinking seats outright and strands mechanical / distiller chains at their devin hops (`mechanical[1]`/`[3]`, `distiller[1]`); `alibaba_token_plan` down kills the planner critical seat and every mechanical / distiller primary — both single-domain mission kills named as typed outcomes
- `.ufo/routing-health.jsonl` — per-attempt lane-health ledger consumed by the `ufo routing-health` verb

## Out-of-scope
- The P3 cluster 2c087de6 / 9b825505 (beat M-audit-late-0016) and P8 cluster 81591492 / 285fc692 / 87590b11 (beat M-audit-late-0017)
- Packs P5+ (beats M-audit-late-0019..0024) and the P8-docs gate-step work (beat 0023)
- Live provider probes and gates.sh / cargo — none re-run; the 21/21 record is the commit body's claim
- Whether the tiers stayed byte-equivalent to the pins after later pack commits (checked by the gate in each commit, per-beat across this audit)

## Findings
- Seat counting: `seatTiers` carries 15 keys (`main` + the 14 roles); the commit body's "seatTiers (16 seats)" folds `sighting.dispatch.fleetL1Route` — checked separately by `routes:equivalence`, which additionally reports `seats: Object.keys(seatTiers).length`.
- Spec 04 §4's hand-written `devin_oauth` serves index was wrong; the generated data corrects it to `mechanical[1]`/`[3]` (not `[2]`), and the commit body records the correction as owned in the spec annotation with the generated data authoritative.
- `d-domain-kill` / `d-domain-partial` remain pending-mechanism because the launcher-entry fixture is not exposed to the drill harness (commit body).
- `skills/ufo/references/CHANGELOG.md` is now a tracked canonical doc: it rides the contract-sync mirror set and the native contract hash, and carries the dated re-charter history extracted from normative prose.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 87590b11a9b9678c463074b45d82ff3acc770c8c
- Next: M-audit-late-0019
