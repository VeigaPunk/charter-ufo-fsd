# M-audit-late-0002 — Sighting L0 interaction membrane + standing L0 regime (review-night fleet integrations)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for the 2026-09-11 review-night integration pair (77f35f39, 57508532) with its log line folded (e3b6afd9). 77f35f39 lands the L0 interaction membrane on the wall: `scripts/ufo-sighting.mjs` gains `steer` (one-line send-keys injection, `MAX_STEER_BYTES=4000`, `--text`/`--text-file`, `INVALID_STEER_TEXT` on empty/multi-line input) and `peek` (capture-pane readback, `DEFAULT_PEEK_LINES=80` / `MAX_PEEK_LINES=400`) as display-level interaction only, plus per-mission `steerCount`/`lastSteerAt`/`lastSteerBytes` manifest validation and a `docs/LANE-STATUS.md` refresh; `config/ufo.json` declares `sighting.dispatch.fleetL1Route` = `devin/swe-2:max` for fleet-scoped queue tasks, enforced in `scripts/fleet-dispatcher.mjs::deriveRouteChain` ("queue fleet L1 route requires a fleet field") while the 1M L1 gate stays unchanged for non-fleet routes. 57508532 lands the standing L0 regime: advisor `openai-codex/gpt-6-astra:max` projected for all OMP sessions (`nativeProfiles.omp-native-v1.advisor` -> `.omp/config.yml` through `crates/ufo-core-runtime/src/native.rs` renderers), a fleet sibling-manifest overlay injected at dispatch (`buildFleetSiblingManifestBlock` prepended to the served snapshot prompt only, `fleet_manifest_unavailable` on a malformed row, digest untouched), and a launcher hold that fails closed on any Token Plan route while pinning the dormant `alibaba-token-plan/deepseek-v4-pro:max` override suffix (`scripts/run-omp-native-trial.mjs`); the same commit carries the review-night doc integrations (BEHAVIOR-MATRIX currency, agent-card corrections for planner/labrat/executor/mutation-tester/critic/scribe, EPHEMERAL/EVIDENCE-INDEX/REQUIREMENTS audit marks, substrate READMEs, devin shim mode, tick config aligned to the live backend). Why: the review-night fleet returned 16 missions with all receipts validated, so its wave-1 findings were integrated as a standing L0 regime with a recorded wave-2 backlog rather than as one-off patches (`docs/L2-L3-ROUTING.md`, entry `2026-09-11 review night`).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 77f35f39 57508532 e3b6afd9
```
Expected: three commits resolve; subjects `feat(sighting): L0 interaction membrane + swe-2 fleet fill`, `feat(fleet): standing L0 regime + review-night integrations`, `docs: review-night log entry in L2-L3 routing`; all dated 2026-09-11.
Actual:
```
e3b6afd90e5fa25b80b007c524a49e9acc22d6ce|2026-09-11 20:22:10 -0300|docs: review-night log entry in L2-L3 routing
5750853250e24e485cbf36a2081cef10db95a3b6|2026-09-11 20:13:46 -0300|feat(fleet): standing L0 regime + review-night integrations
77f35f39317c407ba00827951b819d805bd42be2|2026-09-11 19:39:35 -0300|feat(sighting): L0 interaction membrane + swe-2 fleet fill
```

## Touches
- 77f35f39317c407ba00827951b819d805bd42be2 — 19 files, +421/-20. Key paths: `scripts/ufo-sighting.mjs` (+130, `steer`/`peek` verbs), `scripts/fleet-dispatcher.mjs` (+42, `deriveRouteChain` fleet-field gate), `config/ufo.json` (+3, `sighting.dispatch.fleetL1Route`), `crates/ufo-core-runtime/bundled/config.json`, `skills/ufo/SKILL.md` + 11 packaged mirrors (12 `SKILL.md` copies), `docs/LANE-STATUS.md`, `tests/ufo-sighting.test.js` (new), `tests/fleet-dispatcher.test.js`
- 5750853250e24e485cbf36a2081cef10db95a3b6 — 57 files, +596/-147. Key paths: `scripts/fleet-dispatcher.mjs` (+62, sibling-manifest overlay), `scripts/run-omp-native-trial.mjs` (+34, Token Plan hold + dormant override suffix pin), `crates/ufo-core-runtime/src/native.rs` (+30, advisor renderers), `config/ufo.json` + `crates/ufo-core-runtime/bundled/config.json` (advisor block), `.omp/config.yml`, agent cards `.omp/agents/{planner,labrat,executor,mutation-tester,critic,scribe}.md` + `agents/**` + `packages/**` mirrors, `docs/{BEHAVIOR-MATRIX,EVIDENCE-INDEX,REQUIREMENTS,EPHEMERAL-L1-MISSIONS,LOCAL-RUN-ADAPTER,SWARM-REROUTE,L2-L3-ROUTING}.md`, `substrates/devin/bin/cli.mjs` (mode change), `config/the-tick.machine.json`, `scripts/sync-ufo-contracts.mjs`
- e3b6afd90e5fa25b80b007c524a49e9acc22d6ce — 1 file, +1: `docs/L2-L3-ROUTING.md`
- `docs/L2-L3-ROUTING.md` — dated entry `2026-09-11 review night` (16-mission fleet, all receipts validated; wave-2 backlog of 9 missions listed)

## Out-of-scope
- Commit 9644f95a and earlier (beat M-audit-late-0001; sibling audit-early window)
- The remaining 2026-09-11 commits de585c70 / e8695602 / b19d5d5f / 3c728860 (beats 0003-0004)
- The `.ufo` 16-mission package template itself (commit body records it as gitignored; not present in the diff)
- Whether the advisor projection survived the 2026-09-15 operator re-charter (beat 0011)

## Findings
- 77f35f39 introduced the `fleetL1Route` fleet-field requirement in `deriveRouteChain`; the routing log records it removed in 7c1f9468 (beat 0005) and re-added in `cb388b72`, but `git log -S 'queue fleet L1 route requires a fleet field' -- scripts/fleet-dispatcher.mjs` places the on-tree re-add in `9685fa4c` (beat 0006) — three states of the same gate in-window; beat 0007 Findings records the correction.
- The routing entry records probe-confirmed Token Plan exhaustion with provider reset `2026-09-18T14:18:00Z` as the hold's "new reset evidence" bar, and states reinstatement still requires an explicit next-launch contract sync.
- e3b6afd9 is doc-only (+1 line), no behavior change; it is folded here because it logs exactly this cluster.
- The sibling-manifest overlay is per-dispatch and applies to the served snapshot prompt only; the prompt digest still binds the raw spec bytes, and the `fleet_manifest_unavailable` failure code covers unreadable sibling rows.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 9644f95a886a604fd639fc759905ab459f814a07
- Next: M-audit-late-0003
