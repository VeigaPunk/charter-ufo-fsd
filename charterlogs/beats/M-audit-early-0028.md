# M-audit-early-0028 — steer#3 swarm-recovery model-reroute posture composed with local pins

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
Swarm recovery stopped being prose and became typed config plus code on
2026-08-26. `50033957` (19 files +2780) adds `config/swarm-recovery.json` with its
schema, `docs/SWARM-REROUTE.md`, `packages/ufo-orch/src/swarm-reroute.ts` (+ test),
`packages/ufo_core/src/ufo_core/swarm_reroute.py` (+ test),
`scripts/swarm-reroute.mjs` and four evidence artifacts — decision, verbatim:
"L1 recovers existing Background Composer bcIds onto the configured Grok/Composer
bucket instead of minting replacements. Rate-limit is fail-as-data. Gemini stays
banned. Orch and self-iter inherit the path." The seats that make that path real
landed the same day: `f670f330` (13 files +242/−10) pins the recovery orch seat to
cursor-grok-4.6-high-fast and adds `packages/ufo_core/src/ufo_core/seat.py` + test
— "Refuse Gemini as planner/judge/orchestrator, record the L1 seat in config and
ufo status, and keep coordination on commits instead of new cloud agents";
`af699235` (11 files +55/−5) pins this Grok recovery lane as `this_lane` and
"restore[s] claims/fallback/identity fields so ufo-control-plane builds again"
(the SQLite control plane recompiles); `65bd0ee8` (3 files +44/−1) records, in
`docs/artifacts/lane-recovery-godspeed.json`, the iteration-23 lane recovery onto
composer-2.5 after usage-limit ERRORs on inherited premium models — "Resumed
direct foreground work on composer-2.5 only: no cloud subagents, no
gpt-5.6-*/luna/sol routing." `b1043f13` (2 files +57/−15) then composes the
operator steer#3 posture with the local pins in `config/swarm-recovery.json` +
schema — verbatim: "bannedModelSubstrings += kimi-k3-max (banned everywhere
incl. recovery); defaultCursorL2Pin = cursor-grok-4.5-high-fast (composition
field); recoveryBucketIsNotCasualDefault = true (bucket only for
ERROR/usage-limit); postureSource records the steer lineage", with typed schema
properties for the three new keys (additionalProperties unchanged); the recovery
bucket itself is unchanged (cursor-grok-4.6-high-fast / cursor-grok-4.5-high-fast
/ composer-2.5) and "rerouteNotRespawn stays true; reroute existing seats, never
mint." `ddc34d76` (3 files +9/−2) repairs the surrounding wiring: doctrine gates
(assert-wave-policy / ufo-fsd-non-l1 / paper-antipatterns / doctrine) back into
`scripts/gates.sh` so goal-audit Prove rows stop regressing, and
swarm-recovery.json resolved from the repo root in the orch test when cwd is the
package workspace.

## Gate
```
for s in b1043f13 50033957 f670f330 af699235 65bd0ee8 ddc34d76; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=short b1043f13 50033957 f670f330 af699235 65bd0ee8 ddc34d76
git show --shortstat --format="" b1043f13
git show --shortstat --format="" 50033957
```
Expected: 6x "ok"; all six subject dates 2026-08-26; `b1043f13` = 2 files
+57/−15; `50033957` = 19 files +2780.
Actual (2026-09-18, HEAD 4adedde6): 6x ok; dates all 2026-08-26; "2 files changed,
57 insertions(+), 15 deletions(-)"; "19 files changed, 2780 insertions(+)"
observed exactly as expected.

## Touches
- `b1043f13` swarm recovery: ship steer#3 model-reroute posture composed with local pins — 2 files +57/−15; config/swarm-recovery.{json,schema.json}
- `50033957` Add swarm-native model reroute for rate-limit ERROR lanes — 19 files +2780; config/swarm-recovery.{json,schema.json}, docs/SWARM-REROUTE.md, packages/ufo-orch/src/swarm-reroute.ts, packages/ufo_core/src/ufo_core/swarm_reroute.py, scripts/swarm-reroute.mjs, evidence/swarm-reroute-*.json
- `f670f330` Pin recovery orch seat to cursor-grok-4.6-high-fast. — 13 files +242/−10; config/orchestrator.{json,toml}, packages/ufo_core/src/ufo_core/seat.py, docs/LANE-STATUS.md
- `af699235` pin this Grok recovery lane and compile the SQLite control plane — 11 files +55/−5; crates/ufo-control-plane/src/{store,batteries,ablation,mutation}.rs, config/orchestrator.json
- `65bd0ee8` Record godspeed lane recovery on composer-2.5 (iteration 23) — 3 files +44/−1; docs/artifacts/lane-recovery-godspeed.json, docs/GOAL-STATUS.md, docs/REMAINING.md
- `ddc34d76` fix: restore doctrine gates and swarm-recovery test root path — 3 files +9/−2; scripts/gates.sh, packages/ufo-orch/test/swarm-reroute.test.ts, docs/REMAINING.md

## Out-of-scope
- The Cursor L2 volume pins and the local seat-routing SSOT — beat 0027.
- The tip byte-parity carve-out that unblocked self-iter rounds — beat 0029.
- The END-RUN LOCK of the same evening — beat 0026.
- General swarm dispatch / wave-shape bans and the dry-L3 swarm CLIs — rejected
  families R1/R7 in the scout report, other lanes' beats.
- Site ingestion (L0-owned).

## Findings
- `b1043f13` records an environment gap instead of a green claim, verbatim:
  "Env gap noted: pytest absent on host py3.14 (py unit suite not runnable here)";
  its runtime verification is limited to "orch swarm-reroute test 1/1,
  swarm-reroute.mjs --dry ok, ufo_core.cli swarm-reroute ok (fnm node24)".
- The lane recovery in `65bd0ee8` is a documented ERROR recovery, not a planned
  route: the lane was ERROR after usage-limit failures on inherited premium
  models, and coordination stayed on artifacts ("L1 orch seat ... coordinates via
  this artifact and GOAL-STATUS, not new agent spawns").
- "banned everywhere incl. recovery" holds for 2026-08-26/27 only. `03b20d42`
  (2026-08-28) reverses it — verbatim: "advisor = kimi-k3-max as the wrapped
  hard-task escalation; kimi routes ONLY through OAuth — the moonshot API key was
  purged from the vault (account suspended)" — and also demotes grok-4.6 to
  grok-4.5 ("grok-4.5 everywhere (substantially better than 4.6 ...)"), so the
  recovery bucket seats named here are not current. `23b209b7` (2026-08-28)
  renames the fleet xbgst-to-ufo and drops the sekhmet L3 tier; `96a4b6b4`
  (2026-08-29) re-charters routing natively. The composer-2.5 / grok-4.5
  composition field and every path cited above are as-of 08-26.
- The kimi-k3-max ban's originating reason is not recorded in-window; the nearest
  evidence is the 08-28 suspension note quoted above.
- Gemini-stays-banned is stated independently in `50033957` ("Gemini stays
  banned.") and `f670f330` ("Refuse Gemini as planner/judge/orchestrator") —
  continuity, not a new decision in this beat.
- `ddc34d76` shows the door this machinery came through: adding the new
  swarm-recovery config also dropped doctrine/anti-pattern gates out of
  `scripts/gates.sh` and broke repo-root path resolution, both repaired three
  hours later.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-pins-report.md` (C4)
- Prior tip: `05ff018d` — anchor of M-audit-early-0027
- Next: M-audit-early-0029
