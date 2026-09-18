# M-audit-late-0009 — Swarm-wave inline spec sources + run verb; catalog membership advisory
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for two 2026-09-13 commits. `45de8753` (09:23:15 -0300) ports the swarm-wave operator surface: `scripts/ufo-swarm-wave.mjs` `plan` gains `--spec -` (stdin, same 1 MiB `MAX_SPEC_BYTES` fail-closed bound as file and literal sources) and `--spec-json <json>` (inline literal, exactly one source per invocation), and a new `run` verb emits `ufo-swarm-wave-dispatch-v1` (`SWARM_DISPATCH_SCHEMA`) as `{taskCall, resumeSends}` — one batched `task` call for spawn lanes plus one `hub send` per resume lane, one-swarm-per-wave structural, `taskCall` null on resume-only waves; the same commit makes `scripts/fleet-dispatcher.mjs` enqueue non-catalog typed routes as bare primaries / single-step frozen chains with `route_catalog_advisory` telemetry while reordered or mismatched explicit chains still fail closed, and re-syncs `skills/ufo/SKILL.md` + `skills/ufo/references/run-logic.md` swarm sections into every packaged mirror, with dated notes added to `docs/L2-L3-ROUTING.md` and `docs/BEHAVIOR-MATRIX.md`. The folded satellite `51b51129` (09:36:22) records the matching doctrine in `docs/L2-L3-ROUTING.md` under "Catalog membership is advisory, not a gate". Why: operator directive 2026-09-13 — the catalog is a nudge, not a hard rule — so a typed noncatalog `provider/model:effort` selector enqueues as a bare primary with advisory telemetry instead of being refused.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 45de8753 51b51129
```
Expected: both commits resolve; subjects `swarm-port: inline spec sources + run verb; dispatcher: catalog as advisory nudge` and `docs: L2-L3 routing — catalog membership is advisory, not a gate`; both dated 2026-09-13.
Actual:
```
51b5112979f98078d5f1e0155ed8e2e0f3349d60|2026-09-13 09:36:22 -0300|docs: L2-L3 routing — catalog membership is advisory, not a gate
45de87539e7180e0eb9dee0d84b6b624f5cb287a|2026-09-13 09:23:15 -0300|swarm-port: inline spec sources + run verb; dispatcher: catalog as advisory nudge
```
(`git log --no-walk` orders by commit date, newest first; the SHAs were passed oldest first.)

## Touches
- 45de87539e7180e0eb9dee0d84b6b624f5cb287a — 29 files, +408/-95. Key paths: `scripts/ufo-swarm-wave.mjs` (`plan`/`run` surface, `SWARM_DISPATCH_SCHEMA`, shared `MAX_SPEC_BYTES` bound), `scripts/fleet-dispatcher.mjs` (`route_catalog_advisory` log), `skills/ufo/SKILL.md` + `skills/ufo/references/run-logic.md` and their packaged mirrors (`.cursor/`, `.omp/`, `packages/codex/`, `packages/contract-support/assets/ufo/`, `packages/cursor/`, `packages/devin/`, `packages/grok/`, `packages/kimi/`, `packages/opencode/`, `packages/substrate-omp/`), `docs/L2-L3-ROUTING.md` (+9), `docs/BEHAVIOR-MATRIX.md` (+11), `crates/ufo-core-runtime/bundled/config.json` (swarm `note` re-escaped, no semantic change).
- 51b5112979f98078d5f1e0155ed8e2e0f3349d60 — 1 file, +9/-5: `docs/L2-L3-ROUTING.md` (catalog-advisory section).
- `docs/BEHAVIOR-MATRIX.md` — the 2026-09-13 "Working tree (swarm-port)" note landed in 45de8753; the 2026-09-16 correction annotating both commits is later work.

## Out-of-scope
- `tests/ufo-swarm-wave.test.js` — untracked working-tree file at both commits; not part of either commit.
- The same-day doctrine sync to the Devin Astra advisor and 1024 ceiling propagation (beat M-audit-late-0010).
- Whether the mirrored skill prose stayed current after the 2026-09-15 re-charter (beat M-audit-late-0011).

## Findings
- Commit body of 45de8753 records `gates.sh: 16/16 PASS` (recorded claim; not re-run in this audit).
- 51b51129 commit body, quote: "L0 L1 selection is nudged by the catalog, not refused by it. Matches fleet-dispatcher deriveRouteChain."
- Dispatcher telemetry verbatim at 45de8753: `log("route_catalog_advisory", { route, fleet: fleet ?? null });` (`scripts/fleet-dispatcher.mjs:544`).
- `docs/L2-L3-ROUTING.md` states "Catalog membership is advisory, not a gate (2026-09-13 operator directive)": a typed selector outside `l1Context.eligibleRoutes` enqueues as a single-step frozen chain (`[route]`, no derivable fallbacks) with `route_catalog_advisory` telemetry; malformed selectors and mismatched explicit chains still fail closed.
- `run` refuses `--emit-tasks`: `scripts/ufo-swarm-wave.mjs` returns usage error "run always emits the full dispatch payload; --emit-tasks is plan-only" — rejected, not silently ignored.
- `crates/ufo-core-runtime/bundled/config.json` changed only in the swarm `note` string (unicode escape normalized); the documented semantics (one batched task call per wave, no per-lane model param, `devin/swe-2:max` pinned) are unchanged.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: dbad47b5b1878796e0e2718d910f35f1e0a2c122
- Next: M-audit-late-0010
