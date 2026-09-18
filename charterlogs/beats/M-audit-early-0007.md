# M-audit-early-0007 — LIVE/DRY Task fan-out telemetry; overlay/Table5/hangar-parity arming

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
`f9e4f9c9` wires the LIVE/DRY Task fan-out and deepens substrate LKG ports (219 files
+13050/−334, 18:26): a `task-fanout` path into self-iter/specialists behind a `UFO_MODE` switch, a
live-probe script, enriched substrate doctor/install CLIs, and MCP-mirrored private LKG content under
`ports/` and `upstream/`. `7df8f627` passes the parent Task fan-out count into self-iter telemetry
(`UFO_AGENT_TASK_FANOUT_COUNT`, 8 files +784/−35) and records the LIVE-strict evidence set — "T2
blocked, D3 LIVE→DRY, budget_exhausted≠success dry run" — while `68cb9770` restores the matching
`agentTaskFanoutCount` and report fields so the TypeScript build matches that wiring (1 file +6/−1).
Fan-out width becomes declared rather than inferred: `29f4fbed` refuses R≥1 waves carrying fewer than
two unique specialist lanes in both TS and Rust, and requires `authorizedBy` plus a replay-shaped
reason when `round0Replay` mutates axes (10 files +353/−28). The arming leg is `45f8a864`: it wires
`overlay/ufo-fsd` as a non-judge self-iter participant, adds the offline Table 5 JSONL-vs-service A/B
into `@ufo/core` and self-iter, and enforces hangar/livepatch scaffold parity across substrate
packages (19 files +559/−34); `overlay/ufo-fsd/arming.json` at that commit reads
`"status": "armed-participant", "mustNotJudge": true, "l1Judge": "xbgst", "host": "grok-build"`, and
`e8f73661` rewrites the plugin description to match — "armed non-judge fleet overlay. L1 remains
xbgst. Participates in WWKD/self-iter; refuses to judge." — adding the `armed-participant` keyword
(1 file +3/−2). The telemetry then lied twice and was corrected on 08-26: `63a25731` stops labelling
in-env fan-out as host-CLI live (4 files +46/−5) and `ab969088` stops counting a leftover
`status=live` as `fanout nodeLiveOk` (2 files +47/−1). One line of reasoning: an overlay may
participate in WWKD and self-iter but may not judge, so it is armed with `mustNotJudge` rather than
seated as a second judge.

## Gate
```
for s in f9e4f9c9 7df8f627 45f8a864 e8f73661 68cb9770 29f4fbed 63a25731 ab969088 0ca47bed 10a2e3fc 9f14b058 b6f4890e f51802a5; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" f9e4f9c9
git show --shortstat --format= f9e4f9c9 | tail -1
git show 45f8a864:overlay/ufo-fsd/arming.json
```
Expected: 8x "ok"; the anchor subject verbatim at 219 files +13050/−334; arming.json carrying
`mustNotJudge: true` and `"status": "armed-participant"`.
Actual (observed 2026-09-18, HEAD 4adedde6): 8/8 ok; "f9e4f9c9 Wire LIVE/DRY Task fan-out and
deepen substrate LKG ports"; "219 files changed, 13050 insertions(+), 334 deletions(-)"; arming.json
printed `{"armedAt": "2026-08-25T19:02:55.633Z", "status": "armed-participant", "mustNotJudge": true,
"l1Judge": "xbgst", "host": "grok-build"}`.

Wave-4 re-run (2026-09-18, HEAD 4adedde6): 13/13 `ok` — extended cat-file loop (8 original + 5 folded SHAs) exited 0, no unresolved token.

## Touches
- `f9e4f9c9` Wire LIVE/DRY Task fan-out and deepen substrate LKG ports — 219 files +13050/−334
- `7df8f627` Wire UFO_AGENT_TASK_FANOUT_COUNT and capture LIVE-strict evidence — 8 files +784/−35
- `68cb9770` Fix SelfIterConfig/Report types for honest Task fan-out telemetry — 1 file +6/−1
- `29f4fbed` Seat homogeneous fan-out refusal and Round-0 replay auth evidence. — 10 files +353/−28
- `45f8a864` Arm ufo-fsd overlay, Table 5 A/B, and hangar parity gates — 19 files +559/−34
- `e8f73661` docs: mark ufo-fsd plugin as armed non-judge participant — 1 file +3/−2
- `63a25731` fix: do not label in-env fanout as host-CLI live — 4 files +46/−5
- `ab969088` fix: do not count leftover status=live as fanout nodeLiveOk — 2 files +47/−1
- `0ca47bed` Enforce ufo-fsd non-L1 crown; harden substrate dry-run portability — 25 files +730/-53; wave-4 fold: fail-closed ufo-fsd non-L1 crown guard (mustNotJudge/judgeId/role) + arming scripts
- `10a2e3fc` fix(plazirhangar): a hangar cache answers dry dispatch, and refusals name themselves — 2 files +12/-4; wave-4 fold: hangar cache answers dry dispatch; refusals name the claim they enforce
- `9f14b058` Let the hangar cache answer a dry dispatch — 1 file +3/-2; wave-4 fold: same claim split in the plazirhangar cache CLI (dry dispatch)
- `b6f4890e` Separate the judge-seat refusal from the orchestration refusal — 19 files +272/-151; wave-4 fold: splits the judge-seat refusal from the orchestration refusal (crown posture)
- `f51802a5` feat: charter posture gate, public hangar deepen, parallel-64 evidence — 32 files +1038/-66; wave-4 fold: charter posture gate (WWKD/godspeed/non-L1 ufo-fsd) + parallel-64 evidence
- Paths (as of the cited commits): packages/xbgst-runtime/src/task-fanout.ts,
  packages/xbgst-runtime/src/{overlay-fsd.ts,self-iter.ts},
  packages/ufo-core/src/table5.ts, overlay/ufo-fsd/{arming.json,plugin.json},
  scripts/hangar-parity.mjs, substrates/ufo-fsd/substrate.json

## Out-of-scope
- Paper battery/mutation/ablation gates and the Table 5 gate wiring inside self-iter e2e
  (`0f87f43a`) — M-audit-early-0011.
- WWKD plan-token gating of judge rounds — M-audit-early-0008.
- LIVE-strict D2–D5 harness and the live-seat honesty wave (`8a155ec0`, `54945509`) — honesty lane.
- Routing pins/bans and substrate content deepening — pins lane.
- Site ingestion (L0-owned) and the sibling window after 2026-09-10.

## Findings
- Honest failure, quoted from `63a25731`: "dispatchTaskFanout in-env / live-subagent is a recorded
  cursor-grok dispatch, not authenticated live. Status stays dry; specialists and self-iter only
  count task-live when mode=live node-probe actually authorized it." Quoted from `ab969088`:
  "buildHonestFanoutTelemetry treated status=live as a live seat. That label can be leftover or
  tokenless." Both are 08-26 corrections of 08-25 semantics, not new features.
- `7df8f627` belongs to this cluster by L1 ruling; its subject is the telemetry counter, which is
  the same surface as `f9e4f9c9`.
- As-of: `packages/xbgst-runtime/src/task-fanout.ts` and the `overlay/ufo-fsd` arming files are
  described at their cited commits; the xbgst-runtime path is absent at HEAD (2026-08-28 `23b209b7`
  "Seat ufo as the single L1 skill fleet-wide; disable xbgst; rebase cloud->local"). That later
  commit keeps the desk surface must-not-judge, so `mustNotJudge` survived the refocus.
- Cluster closure: the source cluster's claim set is exactly the eight SHAs in Touches. The related
  LIVE-strict harness commits are sibling-owned (named in Out-of-scope) and are not part of it.

- Wave-4 coverage remediation: 5 member(s) folded from the mis-adjudicated F5-HANGAR/F10-PORTABILITY/F8-GATES rejections (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-gates-report.md` (C7)
- Prior tip: `046e9cbb` — anchor of M-audit-early-0006
- Next: M-audit-early-0008
