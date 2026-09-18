# M-audit-late-0023 — Pack P8-docs + P9 machinery: contract-docs restructure, sync-gate steps, successor rounds
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 8e9116d9 (2026-09-18 02:33): two improvement-pack halves landed together — P8-docs (spec 08, `docs/advisory/2026-09-17-ufo-improvement-pack/08-contract-docs-restructure.md`) and P9 successor-round machinery (spec 13 §3, T02) — 54 files, +2886/-1116. P8-docs: CHANGELOG rows for the 2026-09-11 output policy, the 2026-09-11 Sekhmet/L3 shelving, and the 2026-09-18 P5–P7 pack entry; normative prose de-dated so SKILL.md output-policy + L3 sentences and run-logic §1 header / §6 override references are timeless with the CHANGELOG carrying dates; the garbled A-08/F21 `A rejected handoff / Completion` transition rewritten; `ssot/godspeed-core/filter.md` + `velocity.md` (and their bundled mirrors) carry dated bridge notes pointing at the operative contract (annotate, never rewrite); SKILL.md gains a wwkd clause in load-order item 3 (§5 normative, external wwkd enrichment-only) and an advisory-mode section for when no substrate is present. The sync gate gains `constants:unique` (declared-site allowlist; new restatements fail naming file:line — it found and fixed the steer-text 4000 vs unified 4096 divergence) and `docs:dates` (normative prose timeless, provenance block exempt); drills `d-constants` + `d-docs-dates` wired (commit body records 51 pass / 11 pending-mechanism). A `concurrencyCeiling` drift was repaired to 32 in `config/ufo.json`, `crates/ufo-core-runtime/bundled/config.json`, and `.omp/config.yml`, with the conformance vector (`conformance/vectors/native/omp-route-yaml.json`) following the corrected contract — the P0/P1 value 128 was never operative because the judge rejects >32 handoffs. P9 machinery (spec 13 §3): launcher gains `--round N` + `--predecessor-run <runId>`; successor rounds read `.ufo/receipts/<predId>/round-chain.json` with typed refusals and carry `baseline_after` (null falls back to `baseline_before` — a zero-accept predecessor moves nothing, never a fabricated vector), binding the Main plan to `baseline_digest` (receipt-digests serialization stated verbatim), `predecessor_plan`, and a T02 citation of the predecessor's accepted digests plus a prior reject/failure; round-chain entries nest the predecessor verbatim under O_EXCL and dispatch snapshots key on `(runId, round)`. The judge requires round>1 handoffs to ride `plan_digest`+`plan_path`, with the plan's `baseline_digest` equal to the handoff baseline digest and `predecessor_plan` matching a round-(N-1) chain entry beneath the contract root; mismatches are named, an absent chain is rejected, and round-1 is unchanged. Commit body records gates.sh 21/21 PASS.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 8e9116d9ef4563d7e5af2472e5eade1b0cefa4ed
```
Expected: commit resolves; subject `ufo pack P8-docs + P9 machinery: doc restructure, gate steps, successor rounds`; dated 2026-09-18.
Actual:
```
8e9116d9ef4563d7e5af2472e5eade1b0cefa4ed|2026-09-18 02:33:49 -0300|ufo pack P8-docs + P9 machinery: doc restructure, gate steps, successor rounds
```

## Touches
- 8e9116d9ef4563d7e5af2472e5eade1b0cefa4ed — 54 files, +2886/-1116. Key paths: `scripts/run-omp-native-trial.mjs` (+254), `scripts/sync-ufo-contracts.mjs` (+113), `tests/run-omp-native-trial.test.js` (+289), `crates/ufo-core-runtime/src/native_evidence.rs` (+143), `crates/ufo-core-runtime/src/native_tests.rs` (+176), `config/ufo.json`, `crates/ufo-core-runtime/bundled/config.json`, `.omp/config.yml`, `conformance/vectors/native/omp-route-yaml.json`
- `docs/advisory/2026-09-17-ufo-improvement-pack/08-contract-docs-restructure.md` (+28) — spec 08 touch
- `skills/ufo/SKILL.md`, `skills/ufo/references/CHANGELOG.md` (new rows), `skills/ufo/references/run-logic.md` and packaged mirrors (`.cursor/`, `.omp/`, `packages/{codex,cursor,devin,grok,kimi,opencode,substrate-omp}/`), `ssot/godspeed-core/filter.md` + `velocity.md` and bundled mirrors, `skills/SHA256SUMS`, `ufo-deps.lock`
- `drills/d-constants.drill.json`, `drills/d-docs-dates.drill.json` (new)

## Out-of-scope
- The live two-round capstone run (deferred; beat M-audit-late-0024 annotations record it as quota-blocked)
- Other improvement-pack commits (beats M-audit-late-0016..0022)
- Recorded gates.sh / drill counts were not re-run in this audit beat; they are attributed to the commit body
- Whether the de-dated prose remains internally consistent beyond the landed edits

## Findings
- Commit body records drills 51 pass / 11 pending-mechanism and gates.sh 21/21 PASS (recorded, not re-run here).
- `concurrencyCeiling` 128 (P0/P1 checkpoint) was never operative; the judge rejects >32 handoffs and the pre-drift pair was 32/32 — restored to 32 in config, bundled mirror, and `.omp/config.yml`.
- The `constants:unique` step is a real-drift catcher, not a formality: it surfaced the steer-text 4000 vs unified 4096 divergence in this commit.
- P9 round-chain nesting is O_EXCL and dispatch snapshots are keyed on `(runId, round)`; `baseline_after` null falling back to `baseline_before` is the anti-fabrication rule for a zero-accept predecessor.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 241ec3a295c12be2764b05997c5b2aaa856902f6
- Next: M-audit-late-0024
