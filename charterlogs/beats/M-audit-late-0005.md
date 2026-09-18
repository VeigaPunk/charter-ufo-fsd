# M-audit-late-0005 — SWE-everywhere uniform seat + universal /ufo dispatch prefix
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit 7c1f9468 (2026-09-12 00:10 -0300): the swe-everywhere routing flatten — every native seat from Main through the mechanical roles moves to `devin/swe-2:max` with empty fallback arrays, and Kimi K3/Astra/Daybreak/Spark/Luna/SOL/Grok leave the active graph; the L1 doctrine flips from max-context to availability-first (config `l1Context.minimumTokens` 1000000 -> 262144, eligibility catalog gains SWE-2 as a sixth route, and the dispatcher/sync validators now require the 262144 extended-context policy); `deriveRouteChain` drops the fleet-field requirement for the fleet L1 route (swe-2 is universal, Main included); the dispatcher injects one literal `/ufo` skill-invocation line at the snapshot layer (idempotent, source prompt files stay digest-pinned) while `promptEvidence` admits exactly one leading `/ufo\n` line before the canonical Godspeed directive bytes; and conformance vectors/fixtures are reconciled to the flattened graph. Why: operator-instructed swe-everywhere sync — the routing log records the flatten, its doctrine flip, and the sweep fallout as it happened (`docs/L2-L3-ROUTING.md`, entry `2026-09-12 swe-everywhere sync (operator-instructed)`).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 7c1f9468
```
Expected: commit resolves; subject `feat(routing): swe-everywhere uniform seat + universal /ufo dispatch prefix`; dated 2026-09-12.
Actual:
```
7c1f9468534f1bdd49801dab62da6ea8e8118fa1|2026-09-12 00:10:38 -0300|feat(routing): swe-everywhere uniform seat + universal /ufo dispatch prefix
```

## Touches
- 7c1f9468534f1bdd49801dab62da6ea8e8118fa1 — 85 files, +6423/-1474. Key paths: `config/ufo.json` (`l1Context.minimumTokens` 1000000 -> 262144, sixth eligible route `devin/swe-2:max`, all `modelRoutes` seats -> `devin/swe-2:max`, `modelFallbacks` emptied), `scripts/fleet-dispatcher.mjs` (snapshot `/ufo` prefix at the write layer; `promptEvidence` single-leading-`/ufo` admission; `deriveRouteChain` fleet-field gate removed, 262144 policy check), `scripts/sync-ufo-contracts.mjs` (OMP projection mirrors the 262144 policy + swe-2 selector), `conformance/` (12 entries: 11 vectors + 1 fixture, incl. `native/judge-wave.json` +1124, `handoff/agent-gates.json` +598, `handoff/transcript-events.json` +373, `native/local-ship.json` +426, `native/execution-profile.json` +215, `native/l3-reroute.json`, `handoff/dispatch-pairing.json`, `handoff/roster-and-agents.json`, `native/lane-overlay.json`, `native/mutation-battery.json`), `conformance/fixtures/native-handoff/handoff.json`, `crates/ufo-core-runtime/tests/conformance.rs` (+980), `crates/ufo-core-runtime/src/native.rs`, `scripts/collect-omp-native-handoff.mjs` (+216), `skills/ufo/SKILL.md` + `skills/ufo/references/run-logic.md` and their packaged mirrors (`packages/**`, `.omp/`, `.cursor/`), `tests/fleet-dispatcher.test.js`, `tests/collect-omp-native-handoff.test.js` (+157), `docs/L2-L3-ROUTING.md` (+48)
- `docs/L2-L3-ROUTING.md` — the `2026-09-12 swe-everywhere sync (operator-instructed)` entry is the decision record cited by this beat's Why.

## Out-of-scope
- Commit 9644f95a and the 2026-09-11 commits (beats M-audit-late-0001..0004)
- Later 2026-09-12 commits 9685fa4c / 9c24a942 (beat 0006) and the cb388b72 merge (beat 0007)
- Whether the flatten held as written: 9685fa4c partially reverts it and cb388b72 re-pins the seats — audited in beats 0006 and 0007

## Findings
- Commit body records `Gates: ALL COMPLETE` (recorded claim, not re-run here) and states the conformance reconciliation as "38 files, ~480 cases" (recorded).
- Routing log fallout for this commit (attributed to the log entry, not re-derived): `ufo_kimi_devin` alias left unused but retained in code; the native capacity-continuity acceptance test deleted (no advanceable chains in the native profile); Rust capacity-advance tests now drive the Codex compatibility chains; the queue swe-2 floor is enforced by `minimumTokens: 262144`.
- The `/ufo` line is applied only to the written dispatch snapshot (`scripts/fleet-dispatcher.mjs` snapshot write), so source prompt digests stay byte-stable; the validator tolerates exactly one leading `/ufo\n` line and rejects any other `/ufo`-prefixed variant as a canonical-envelope violation.
- The fleet-field throw for the swe-2 route is removed in this commit and re-added on-tree in 9685fa4c (beat 0006) — the removal was not durable. The routing log attributes the re-add to cb388b72; `git log -S` corrects it (beat 0007 Findings).

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 3c72886012109c935519d1f767d54192141d61df
- Next: M-audit-late-0006
