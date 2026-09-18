# M-audit-late-0016 — Pack P3: cost ledger, token budgets, honesty_brake + interrupted stops (spec 03 + A-03)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for the P3 cluster: 2c087de6 (2026-09-17 20:14:50 -0300) lands cost/token accounting and two new stop kinds, and its folded satellite 9b825505 (20:16:01, 14-line spec annotation) marks spec 03 §7 verification landed. Loop driver: `LoopOutcome` gains `honesty_brake` + `interrupted` with checkpoint mapping both ways (`crates/ufo-core-runtime/src/loop_driver.rs` +677, `state.rs` +155); `SpecialistOutput` usage becomes optional; per-round and mission-cumulative token books persist in the checkpoint; post-round exhaustion brake plus pre-dispatch p50 projection brake (zero dispatch, frozen wave never trimmed); wall-clock mission budget typed distinct from `lane_timeout` (T33); `maxAttemptsPerLane` bounds temporary retries and D1a; brake telemetry typed `budget_exhaustion` / `budget_projection` / `wall_clock`. `ufo-cli` gains a SIGINT handler (`crates/ufo-cli/src/main.rs` +39, `signal-hook = "0.4.4"` in `crates/ufo-cli/Cargo.toml`) wired through the driver interrupt check — the commit body records this as an approved deviation because `unsafe_code = "forbid"` vetoes raw `libc::signal` — writing `stop_reason=interrupted` with a partial-evidence pointer and exiting 2 through the existing non-saturated path; the exit set stays 0/1/2/3. Judge: `cost_ledger` OPTIONAL under v2+resilient (typed v1 freeze rejection) — exact topology coverage with `seat_label` spellings, recomputed `round_totals`, `mission_cumulative >= round`, a `usage_source` enum, degraded (>20% unavailable) recomputed-and-recorded but never admission-rejecting and never a SATURATED input, `usd` null-typed unless `budgets.rateCard` prices the route; the `budgets` block is REQUIRED in `config/ufo.json` on handoff load paths (key absent = config-invalid, never silently unlimited); the wire types and validators landed in `lib.rs` (+409) because `native.rs` sits at the 256 KiB contract-file ceiling. Collector (`scripts/collect-omp-native-handoff.mjs` +251): per-seat usage extraction typed `transcript` / `session_total` / `unavailable` — never fabricated zeros — mission_cumulative folded from digest-verified prior-round artifacts via the round-chain lineage, rateCard pricing with null for unrated routes, `cost_ledger` omitted under v1. Prose updated in `skills/ufo/SKILL.md` + `skills/ufo/references/run-logic.md` (§8 stop_condition cost rows, §1 stop_reason emission) and every packaged mirror; the commit body records gates.sh 21/21 PASS including the fleet's new invariant drill stage.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 2c087de6 9b825505
```
Expected: both cluster commits resolve; `--no-walk` prints them newest-first in git's own order (9b825505 then 2c087de6); subjects and dates as given in the beat spec, both dated 2026-09-17.
Actual:
```
9b825505c7929ed87be3d992842633f107bf448f|2026-09-17 20:16:01 -0300|ufo pack P3: spec 03 §7 verification landed annotation (fixture variant map)
2c087de60e4559fb35516aa6d234177e7681ab6f|2026-09-17 20:14:50 -0300|ufo pack P3: cost ledger, token budgets, honesty_brake + interrupted stops (spec 03 + A-03)
```

## Touches
- 2c087de60e4559fb35516aa6d234177e7681ab6f — 40 files, +2745/-238. Key paths: `crates/ufo-core-runtime/src/loop_driver.rs` (+677), `lib.rs` (+409, cost-ledger wire types + validators), `native.rs` (reworked), `native_tests.rs` (+393), `state.rs` (+155), `config.rs` (+146, budgets config), `bundled/config.json` (+9), `crates/ufo-cli/src/main.rs` (+39, SIGINT handler), `crates/ufo-cli/Cargo.toml` (`signal-hook`), `config/ufo.json` (+9, `budgets` block), `scripts/collect-omp-native-handoff.mjs` (+251), `tests/collect-omp-native-handoff.test.js` (+249), `crates/ufo-core-runtime/tests/conformance.rs`, `skills/ufo/SKILL.md` + `skills/ufo/references/run-logic.md` and the `.cursor`/`.omp`/`packages/*` mirrors, `docs/advisory/2026-09-17-ufo-improvement-pack/03-cost-ledger-and-stop-reasons.md`, `.../16-amendments-to-specs-00-09.md`
- 9b825505c7929ed87be3d992842633f107bf448f — 1 file, +14, annotation only: `docs/advisory/2026-09-17-ufo-improvement-pack/03-cost-ledger-and-stop-reasons.md` (spec 03 §7 "Landed (P3)" fixture-variant map: D-brake-actual, D-brake-projected — zero dispatch, typed `budget_projection` — D-interrupted plus ufo-cli's real-SIGINT flag test, D-ledger-gap — SATURATED untouched — and wall-clock; D-exitcodes observed unchanged 0 saturated / 1 error / 2 non-saturated stop / 3 reserved)
- `config/ufo.json` `budgets` block — `tokensPerRound`, `tokensPerMission`, `wallClockMsPerMission`, `maxAttemptsPerLane`, `phase0ProbeTokens` all 0 (= unlimited, explicit), `action: "honesty_brake"`; mirrored in `crates/ufo-core-runtime/bundled/config.json`

## Out-of-scope
- The P8 cluster 81591492 / 285fc692 / 87590b11 (beat M-audit-late-0017) and P4 10e39d85 (beat M-audit-late-0018), despite git interleaving with this cluster
- Re-running gates.sh, cargo, or the invariant drill stage — the commit body's 21/21 PASS is cited as a recorded claim, not re-verified here
- Whether `usd` estimates are ever populated (the shipped budgets block is all-zero and no rate card is priced in it)

## Findings
- Git order interleaves the P3 and P8 clusters: 81591492 (P8-prep `drills.enabled`, 19:22:07) is the git parent of 2c087de6, and 9b825505 is the git child of 87590b11 — ancestry reads 81591492 -> 2c087de6 -> 285fc692 -> 87590b11 -> 9b825505 -> 10e39d85. Beats 0016/0017 keep pack-narrative order; the Prior tip / Next pointers are audit-chain pointers, not git-parent order.
- The folded satellite 9b825505 is annotation-only (14 lines of spec text; no code, config, or test change).
- The commit body records the `lib.rs` placement as forced by the 256 KiB contract-file ceiling on `native.rs`, and the SIGINT handler as an approved deviation from the `unsafe_code = "forbid"` lint.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: c166c8cd93082a5d5cef446b4b91c6900a9d237b
- Next: M-audit-late-0017
