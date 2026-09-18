# M-audit-late-0001 — W3 fleet consolidation rebase + 2026-09-11 routing contract syncs
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 9644f95a (2026-09-11 19:22 -0300): the W3 fleet consolidation rebase — devin substrate port (`packages/devin/`, `substrates/devin/`), route-health probe script, mission lifecycle/observation/activity/result scripts, evidence-only Sekhmet L3 swarm module (`l3_swarm.rs`), transactional local-ship module (`local_ship.rs`), crate `build.rs` config generation, and a +2924-line fleet-dispatcher expansion — plus four operator-instructed routing contract syncs the same day: reviewer/sentinel/connector to `devin/swe-2:max` (SOL demoted to fallback); K3 chain terminals to `devin/kimi-k3:max`; L1 Main terminal back to `kimi-code/k3:max`; planner/critic to `openai-codex/gpt-6-astra:max`, revenger to `openai-codex/gpt-daybreak-blue-latest:max`, distiller to `openai-codex/gpt-5.3-codex-spark:low` -> Luna/low -> Grok-4.5/low. Why: the syncs moved review seats onto operator-attested Devin routes and split K3 serving to assess metered Devin-subscription usage — decisions and probe evidence logged in `docs/L2-L3-ROUTING.md` (entries 2026-09-11 20:55 / 21:10 / 21:35 UTC and the fourth-sync entry).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 9644f95a
```
Expected: commit resolves; subject `rebase: W3 fleet consolidation + 2026-09-11 routing contract syncs`; dated 2026-09-11.
Actual:
```
9644f95a886a604fd639fc759905ab459f814a07|2026-09-11 19:22:38 -0300|rebase: W3 fleet consolidation + 2026-09-11 routing contract syncs
```

## Touches
- 9644f95a886a604fd639fc759905ab459f814a07 — 167 files, +27707/-5678. Key paths: `packages/devin/**` + `substrates/devin/**` (new substrate, 13 agent cards + skill mirror), `scripts/probe-ufo-route-health.mjs` (new, 817 lines), `scripts/fleet-dispatcher.mjs`, `scripts/ufo-mission-lifecycle.mjs` / `ufo-mission-observation.mjs` / `ufo-mission-activity.mjs` / `ufo-mission-result.mjs` (new), `crates/ufo-core-runtime/src/l3_swarm.rs` / `local_ship.rs` / `state.rs` / `lanes.rs` / `process_group.rs` (new), `crates/ufo-core-runtime/build.rs` (new), `config/ufo.json` (+399), `docs/L2-L3-ROUTING.md` (+450), `docs/PROVENANCE.md` (new; old `docs/provenance.md` removed), `docs/EVIDENCE-INDEX.md` (new; `EVIDENCE-R2..R5.md` removed)
- `docs/L2-L3-ROUTING.md` — dated 2026-09-11 decision entries; probe evidence cited there: `.ufo/capacity-0911/devin-swe2.json`, `.ufo/capacity-0911/devin-kimi-k3.json`, `.ufo/capacity-0911/daybreak-luna-fast.json`, `.ufo/capacity-0911/luna-pure.json`

## Out-of-scope
- Commits before 2026-09-11 (sibling audit-early window)
- Later 2026-09-11 commits 77f35f39..3c728860 (beats M-audit-late-0002..0004)
- Whether the handwritten doc projections stayed current (tracked in later beats)

## Findings
- Luna `-low-fast`/`-fast` spellings were probe-rejected (exit 1, unknown model); pure `gpt-5.6-luna:low` served exact-primary per the operator's pure-version steer (routing log, fourth-sync entry).
- `globalRunnerCeiling` was reduced 48 -> 16 in W3 (2026-09-11); raised again in-window at beats 0006 (512) and 0007 (1024).
- `l3_swarm.rs` landed as evidence-only compatibility data; Sekhmet/L3 stays shelved by operator doctrine — no spark dispatch.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 5f52e03a9f765476b63d2f2f54e29b72f22b6359 (2026-09-08, pre-window tip)
- Next: M-audit-late-0002
