# M-audit-early-0027 — Seat-routing policy: kimi-k3-max banned, dual-pin MIX landed

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
The 2026-08-26 seat-routing arc, from the morning orch seat to the evening routing
policy and its same-evening reversal. The day opened with `c88abd8a` (21 files
+120/−31), which seated the godspeed UFO-FSD orchestrator on
cursor-grok-4.5-high-fast — verbatim: "Pin the allowed non-rate-limited
Cursor-pool CLI-id as the default for planner/judge/specialist seats across orch
policy, xbgst-runtime, substrate CLIs, and lanes/registry.yaml. Record empirical
self-iter evidence." — and `a0dfee13` (1 file +1/−1), which restored this_lane
to the grok 4.6 recovery seat after "Incoming rematch rewrote this_lane to the
concurrent 4.5 resume. orch_model stays cursor-grok-4.6-high-fast. Concurrent
swarm/L3 seats kept." The evening arc is three sequential operator steers on the
Cursor L2 volume pin, each landed in lockstep across `packages/cursor/agents/
roster.json`, `catalog-agentic.json`, `packages/cursor/bin/xbgst-cursor-run.sh`,
the surface gates + catalog sync and the docs/rules/skills pin references
(15 files, +36/−36 / +38/−38 / +37/−37 respectively, same token swapped, no
prose rewrite): `05ff018d` bans kimi-k3-max and pins all cursor L2 spawns to
cursor-grok-4.5-high-fast — body: "Operator steer 2026-08-26
(ban-kimi-k3-max-push-origin)" with argv verification "cursor-agent -p --trust
--output-format text --model cursor-grok-4.5-high-fast ..."; `ce122fc5` makes
composer-2.5 the L2 volume pin — "Operator steer 2026-08-26 (l2-composer-2.5,
supersedes the 4.5 volume pin): route ALL L2 workers through Cursor composer-2.5
by default", with the refuse-list hardened so "gemini*/bard*/palm*/kimi-k3-max now
explicitly refused alongside auto/Claude (bans hold)" and grok-4.5/4.6 "reserved
for the steer#3 ERROR recovery bucket"; `d22e2c3b` makes it a hard ALWAYS pin on
the fast variant — "Operator steer 2026-08-26 (l2-composer-2.5-fast), supersedes
composer-2.5: every L2 cursor-agent spawn pins composer-2.5-fast", with the allow
list untouched (both composer ids remain allowed) and the refuse-list unchanged.
The policy then became config: `169fe43c` (9 files +249/−2) ships the local seat
routing policy SSOT — verbatim: "L1 PEAK pin: cursor-agent
cursor-grok-4.5-high-fast (NOT composer for L1); L2 volume: cursor-agent
composer-2.5-fast ALWAYS; L1 off-peak (UTC-3 11:00-21:00 / Asia/Shanghai
22:00-08:00): codex -p qwen38 (qwen3.8-max) — supersedes the ds-pro offpeak rule;
L3 sekhmet: gpt-5.3-codex-spark fast; fallback gpt-5.6-luna-low-fast; bans hold
... Token Plan never for L2; guardrail escape always qwen38" — as
`config/orchestrator.{json,toml}` `local_seat_stack` plus seven
`.ufo/local-dispatch/*.md` artifacts force-added over the `/.ufo/` ignore by
explicit operator ship order (secret-scanned clean). 2m43s later
`2a3c8fd2` (4 files +62/−7) supersedes composer-only L2: verbatim "EVERY L2
fan-out uses BOTH models — round-robin across spawns or task-shape routing (bulk
codegen -> composer; long-horizon/review/connector -> grok); no all-Composer or
all-Grok waves unless recovering a hard limit on one lane", fast variants only,
steer#3 bucket unchanged; scope was the policy artifact, the `l2_mix` json/toml
config and a mix-contract comment in `xbgst-cursor-run.sh`, with the no-flag
default staying composer-2.5-fast because the mix is dispatcher-side via `--model`.

## Gate
```
for s in 05ff018d ce122fc5 d22e2c3b 169fe43c 2a3c8fd2 c88abd8a a0dfee13; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=short 05ff018d ce122fc5 d22e2c3b 169fe43c 2a3c8fd2 c88abd8a a0dfee13
git show --shortstat --format="" 169fe43c
git show --shortstat --format="" 2a3c8fd2
```
Expected: 7x "ok"; all seven subject dates 2026-08-26; `169fe43c` = 9 files
+249/−2; `2a3c8fd2` = 4 files +62/−7.
Actual (2026-09-18, HEAD 4adedde6): 7x ok; dates all 2026-08-26; "9 files changed,
249 insertions(+), 2 deletions(-)"; "4 files changed, 62 insertions(+), 7
deletions(-)" — observed exactly as expected.

## Touches
- `05ff018d` cursor surface: ban kimi-k3-max; pin all cursor L2 spawns to cursor-grok-4.5-high-fast — 15 files +36/−36; packages/cursor/agents/{roster,catalog-agentic}.json, bin/xbgst-cursor-run.sh, scripts/gates.sh
- `ce122fc5` cursor surface: composer-2.5 is the L2 volume pin; bans hardened — 15 files +38/−38
- `d22e2c3b` cursor surface: hard volume pin composer-2.5-fast ALWAYS for L2 — 15 files +37/−37
- `169fe43c` local seat routing policy: L1 peak = cursor-grok-4.5-high-fast; L2 = composer-2.5-fast; offpeak L1 = qwen38 — 9 files +249/−2; config/orchestrator.{json,toml}, .ufo/local-dispatch/*.md
- `2a3c8fd2` L2 posture: dual-pin MIX composer-2.5-fast + cursor-grok-4.5-high-fast (supersedes composer-only) — 4 files +62/−7; config/orchestrator.{json,toml}, packages/cursor/bin/xbgst-cursor-run.sh
- `c88abd8a` Seat godspeed UFO-FSD orch on cursor-grok-4.5-high-fast — 21 files +120/−31; orch policy, packages/xbgst-runtime/, substrate CLIs, lanes/registry.yaml
- `a0dfee13` fix: restore this_lane to grok 4.6 recovery seat — 1 file +1/−1; config/orchestrator.json

## Out-of-scope
- Swarm-recovery typed posture and the rate-limit reroute path — beat 0028.
- The tip byte-parity carve-out and the orch-seat ping-pong evidence — beat 0029.
- The END-RUN LOCK of the same evening — beat 0026.
- The 08-27 cursor-surface follow-up and the 08-28 fleet re-charter beats —
  0033 and 0040/0041–0045.
- Site ingestion (L0-owned).

## Findings
- These pins lived about two days. The paths they touch
  (`packages/cursor/*`, `config/orchestrator.json`) and the routing idiom exist
  under these names only inside the 08-25/26 window; nothing here is current.
  Superseded by `23b209b7` (2026-08-28, "Seat ufo as the single L1 skill fleet-
  wide; disable xbgst; rebase cloud->local": xbgst-to-ufo fleet rename, cloud-to-
  local rebase, "the sekhmet L3 tier removed with justification"), `03b20d42`
  (2026-08-28) and `96a4b6b4` (2026-08-29, "refocus UFO runtime on native OMP
  routing").
- The kimi-k3-max ban was reversed two days later: `03b20d42` verbatim —
  "grok-4.5 everywhere (substantially better than 4.6, no context-cost increase
  after 200k tokens) ... advisor = kimi-k3-max as the wrapped hard-task
  escalation; kimi routes ONLY through OAuth — the moonshot API key was purged
  from the vault (account suspended)". The ban's originating reason is not
  recorded in-window: `05ff018d`'s body carries only the steer id
  "(ban-kimi-k3-max-push-origin)"; the compositional reasoning lives in
  `b1043f13` (beat 0028).
- `05ff018d` records an honest pre-existing gap: "Pre-existing gap noted (not
  this commit): packages/cursor install.sh absent."
- `2a3c8fd2` records an unverified claim rather than coding it: "Grok 'unlimited'
  is UNVERIFIED — bias Grok up for extra slots when meter unclear; verify honestly
  via Cursor spending dashboard; never fake unlimited claims in code."
- Both `169fe43c` and `2a3c8fd2` state the SSOT artifacts were force-added over
  the `/.ufo/` ignore by explicit operator ship order and secret-scanned clean —
  the policy files are operator-shipped, not discovered by tooling.
- The volume-pin sequence (grok-4.5 → composer-2.5 → composer-2.5-fast → MIX)
  landed across 1h30m of author time (20:42:44, 21:07:02, 21:11:35, 22:12:49
  -0300) — the ping-pong is visible in the commit clock, not only in the bodies.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-pins-report.md` (C1+C2, merged)
- Prior tip: `5466d904` — anchor of M-audit-early-0026
- Next: M-audit-early-0028
