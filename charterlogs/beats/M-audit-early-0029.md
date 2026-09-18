# M-audit-early-0029 — Operator pin divergence carved out of tip byte-parity

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
The operator pins and tip byte-parity stopped fighting on 2026-08-26. `7a417318`
(1 file +5/−1, `packages/xbgst-runtime/src/tip-wire.ts`) is the decision, verbatim:
"The kimi-k3-max ban + cursor L2 volume pins (05ff018d, ce122fc5, d22e2c3b)
intentionally diverged packages/cursor/skills/xbgst-cursor/SKILL.md from the tip
LKG bytes, blocking every dry self-iter round on tip-seat parity. Same doctrine as
ufo-fsd's overlay/: the local arming surface reseats to the operator pin; the tip
stays byte-pinned upstream (ports/ -> hangar/upstream/plugins mirrors still
enforced, LKG provenance untouched)." So the carve-out splits the two duties:
local arming surfaces follow the operator pin, upstream tip bytes stay SHA-pinned.
The five member commits are the divergence evidence that made the carve-out
necessary. `be76e542` (5 files +12/−8) seats the default non-Gemini pin —
"Planner, judge, and specialist defaults now prefer the requested Cursor Grok 4.6
Fast CLI-id, keep 4.5 as fallback, and still refuse Gemini. Also expose `npm run
doctor` on the existing local CLI" — across `packages/ufo-orch/src/model-policy.ts`
(+ test) and `packages/xbgst-runtime/src/{cli,lane-registry,model-policy}.ts`.
`8c5967ae` (12 files +52/−45) moves the seat to the other model inside a repair
commit — "Pin cloud orchestrator seat to composer-2.5 in config/seat/portable
pack" plus a synthetic-evidence regex fix, verbatim verification "pytest 184
passed; bash scripts/smoke-ufo-core.sh green". `126bd0b2` (2 files +2/−2) then
aligns the Rust/TS pin with that seat and records the exact gate failure, verbatim:
"charter-dry still compared the live config read to the stale
cursor-grok-4.6-high-fast constant, so charter_dry_report_walks_orch_and_named
failed (left composer-2.5, right cursor-grok-4.6-high-fast). Charter L1 crown
remains Grok." `310f11a3` (15 files +166/−19) flips it back — verbatim: "Seated
orchestrator identity is cursor-grok-4.6-high-fast again after a concurrent lane
wrote composer-2.5. Python Frontier.admit and kappa_accept reject NaN/Inf as
rejected_malformed before comparison; @ufo/core admitMove does the same. Gemini
remains fail-closed." `165160f8` (4 files +34/−10) closes the sequence by pinning
the test to the crown rather than to a lane: "test_pinned_model_is_grok_not_gemini
now asserts cursor-grok-4.6-high-fast, Gemini refuse, and the documented L1 crown.
Transient recovery bcIds are not hardcoded. Orch pin already restored; goal stays
OPEN."

## Gate
```
for s in 7a417318 be76e542 8c5967ae 126bd0b2 310f11a3 165160f8; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=short 7a417318 be76e542 8c5967ae 126bd0b2 310f11a3 165160f8
git show --shortstat --format="" 7a417318
git show --shortstat --format="" 310f11a3
```
Expected: 6x "ok"; all six subject dates 2026-08-26; `7a417318` = 1 file +5/−1;
`310f11a3` = 15 files +166/−19.
Actual (2026-09-18, HEAD 4adedde6): 6x ok; dates all 2026-08-26; "1 file changed,
5 insertions(+), 1 deletion(-)"; "15 files changed, 166 insertions(+), 19
deletions(-)" — observed exactly as expected.

## Touches
- `7a417318` tip-wire: carve packages/cursor seating out of byte-parity (operator pin divergence) — 1 file +5/−1; packages/xbgst-runtime/src/tip-wire.ts
- `be76e542` Seat cursor-grok-4.6-high-fast as the default non-Gemini pin. — 5 files +12/−8; packages/ufo-orch/src/model-policy.ts, packages/xbgst-runtime/src/{cli,lane-registry,model-policy}.ts
- `8c5967ae` fix: composer-2.5 seat pin and semantic evidence gate repair — 12 files +52/−45; config/orchestrator.json, packages/ufo_core/src/ufo_core/{seat,portable_pack}.py
- `126bd0b2` fix: align Rust/TS orch pin with composer-2.5 seat — 2 files +2/−2; crates/ufo-control-plane/src/charter_cli.rs, packages/ufo-orch/src/charter-dry.ts
- `310f11a3` fix: restore grok orch pin and refuse non-finite Pareto scores — 15 files +166/−19; config/orchestrator.{json,toml}, packages/ufo-core/src/pareto.ts, packages/ufo_core/src/ufo_core/{frontier,kappa}.py
- `165160f8` fix(seat): pin orch test to grok model + L1, not this_lane — 4 files +34/−10; packages/ufo_core/src/ufo_core/seat.py, packages/ufo_core/tests/test_seat.py

## Out-of-scope
- The cursor-surface volume pins (05ff018d / ce122fc5 / d22e2c3b) and the routing
  SSOT — beat 0027; the carve-out cites them, it does not re-decide them.
- The swarm-recovery typed posture — beat 0028.
- The END-RUN LOCK of the same evening — beat 0026.
- godspeed filter.md / membrane byte-pin machinery (rejected family R6) and
  tip-SHA restamps (R3) — other lanes' beats.
- Site ingestion (L0-owned).

## Findings
- The pin ping-pong is recorded, not inferred: composer-2.5 seat (`8c5967ae`,
  15:19:30) → grok-4.6 restore (`310f11a3`, 15:31:04) → composer-2.5-fast volume
  pin (`d22e2c3b`, 21:11:35) → dual-pin MIX (`2a3c8fd2`, 22:12:49); the carve-out
  `7a417318` (21:18:56) sits between the volume pin and the MIX. `310f11a3` names
  the cause ("after a concurrent lane wrote composer-2.5").
- `7a417318` states the consequential failure it fixes (parity blocked every dry
  self-iter round) and carries its verification, verbatim: "Verified (fnm node24):
  tip-wire.test.js + self-iter.test.js all green (incl. real-repo self-iter
  saturates + self-iter loop). Independent L2 review (composer-2.5): no other code
  path, fixture, or mirror-count test depends on the removed entry."
- Subject-vs-diff note: `8c5967ae`'s subject advertises a seat pin and an evidence
  gate repair, but its diff also clears vendor merge conflicts, refreshes
  package-lock.json and adds tests/conftest.py — the pin landed inside a repair
  commit rather than as a dedicated pin commit.
- `126bd0b2` preserves the failing gate text in-body (left composer-2.5, right
  cursor-grok-4.6-high-fast) with "Charter L1 crown remains Grok" — the seat that
  the tests call the crown is Grok, while the config at that moment read
  composer-2.5.
- As-of framing: the identity restored here (cursor-grok-4.6-high-fast) is demoted
  two days later by `03b20d42` (2026-08-28) — verbatim: "grok-4.5 everywhere
  (substantially better than 4.6, no context-cost increase after 200k tokens)";
  the fleet-wide xbgst-to-ufo rename at `23b209b7` (2026-08-28) moves
  packages/xbgst-runtime to packages/ufo-runtime, so the file path modified by
  `7a417318` exists under that name only in-window; `96a4b6b4` (2026-08-29)
  re-charters routing natively. Nothing in this beat is current state.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-pins-report.md` (C3)
- Prior tip: `b1043f13` — anchor of M-audit-early-0028
- Next: M-audit-early-0030
