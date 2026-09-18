# M-audit-early-0051 — Sighting provenance + graceful despawn: relay flag, complete verb

**Status:** COMPLETE | **Date:** 2026-09-08 | **Session:** audit-early

## Does
Two mission-row contract changes land 1h13m apart on `scripts/ufo-sighting.mjs`. `927f947b`
(13 files, +149/−7) makes L0 provenance first-class: an optional boolean `relay` on mission rows,
`validateMission` failing `MALFORMED_MANIFEST` on any non-boolean, `newMission` persisting
`relay: spec.relay === true`, a `--relay` boolean on both `launch` and `register` (usage lines
updated), and the flag surfaced three ways — `status` `missionView`, the pane option `@ufo_relay`
(`relay` / `direct`), and a `[relay]` pane-title suffix — with `@ufo_relay` added to the
`clearPaneMetadata` unset list. The commit body states the boundary rule verbatim: "twins never
inherit the flag", and the added test pins it ("relay flag marks L0-dispatched missions and never
crosses the twin boundary": relayed mission `relay: true`, `@ufo_relay` = `relay`, title
`Relayed [relay]`; a twin row must read `relay: false`). `5f52e03a` (13 files, +276/−16, window tip)
replaces pane-vanish reconciliation with a `complete` verb: `status` gains the third legal value
`completed`, which `validateMission` requires to carry a valid `completedAt` (plus optional
`finalNote` and `completedCapture`, both type-checked), and `complete --mission RUN_OR_MISSION
[--note TEXT]` records `completedAt`, the note, and the last `COMPLETED_CAPTURE_LINES = 40` captured
pane lines, is idempotent on an already-completed mission, and returns `MISSION_NOT_FOUND` otherwise.
Completed rows stay in the manifest as history up to `MAX_COMPLETED_MISSIONS = 50`, evicted
oldest-first, but are excluded everywhere activity is counted — pane-id uniqueness, active mission
lists, layout cap and idle-pane selection, claimed-pane sets, native-session dedupe, stale count —
and `status` reports `completedMissionCount` plus a `completed[]` view (missionId, title, runId,
completedAt, finalNote). Completing the last active mission respawns its pane as idle and kills the
other panes; otherwise the pane is killed and the grid re-laid out. The decision is to make
termination a recorded, retained lifecycle event instead of a reconciliation side effect, while
keeping `remove` as the hard-delete path (canonical skill: "the `remove` verb remains the hard-delete
path").

## Gate
```
for s in 927f947b 5f52e03a; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=iso 927f947b 5f52e03a
git show --shortstat --format= 927f947b | tail -1
git show --shortstat --format= 5f52e03a | tail -1
git show 5f52e03a:scripts/ufo-sighting.mjs | grep -nE 'MAX_COMPLETED_MISSIONS = |COMPLETED_CAPTURE_LINES = |value.status !== "completed"'
```
Expected: 2x ok; subjects "ufo-sighting: relay flag marks L0-dispatched missions" (20:27:48) and
"feat(sighting): graceful mission despawn — complete verb, retained completed history" (21:40:44);
13 files +149/−7 and 13 files +276/−16; the three status literals and the two constants.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): 927f947b ok; 5f52e03a ok;
"927f947b 2026-09-08 20:27:48 -0300 ufo-sighting: relay flag marks L0-dispatched missions";
"5f52e03a 2026-09-08 21:40:44 -0300 feat(sighting): graceful mission despawn — complete verb,
retained completed history"; "13 files changed, 149 insertions(+), 7 deletions(-)"; "13 files
changed, 276 insertions(+), 16 deletions(-)"; `816:  if (value.status !== "starting" && value.status
!== "running" && value.status !== "completed") {`; `2185:const MAX_COMPLETED_MISSIONS = 50;`;
`2186:const COMPLETED_CAPTURE_LINES = 40;`.

## Touches
- `927f947b` ufo-sighting: relay flag marks L0-dispatched missions — 13 files +149/−7; `scripts/ufo-sighting.mjs` (13+/6−), `tests/ufo-sighting.test.js` (48+/1−), `skills/ufo/SKILL.md` + 10 mirrors (8 lines each)
- `5f52e03a` feat(sighting): graceful mission despawn — complete verb, retained completed history — 13 files +276/−16; `scripts/ufo-sighting.mjs` (101+/16−), `tests/ufo-sighting.test.js` (109+, five new test declarations), `skills/ufo/SKILL.md` + 10 mirrors (6 lines each); window tip
- Paths: scripts/ufo-sighting.mjs, tests/ufo-sighting.test.js, skills/ufo/SKILL.md (+ mirrors in .cursor/, .omp/, packages/*)

## Out-of-scope
- The fleet-dispatcher whose trials these missions dispatch (`ec6d85bf`, beat M-audit-early-0050).
- The L2/L3 routing plan and level-counting landing (`e706c4f9`, `8b121a70`, `701bfe64`, beat
  M-audit-early-0053) — this beat cites them only where the manifest schema collides.
- The 09-08 purge sweep earlier the same evening (beats M-audit-early-0052 members) and the local
  GPU helper (`9530c816`).
- Mirror byte-sync churn (22 mirrored files here), post-window manifest work, and the sibling window
  after 2026-09-10.

## Findings
- `5f52e03a` has an empty commit body; every despawn decision above is read from the diff. Its
  sibling `927f947b` carries a full body (schema, CLI, surfaces, tests, guidance) and is the source
  of the quotable "twins never inherit the flag".
- Both commits correct a wall that could not previously distinguish an L0-dispatched mission from a
  twin, and could only lose a mission by having its pane vanish — with no recorded reason and no
  retained history.
- Retained history is partial in the status view: `completedCapture` (the last 40 pane lines) is
  persisted and type-validated but `status.completed[]` exposes only missionId, title, runId,
  completedAt and finalNote.
- The 50-row retention bound is implemented twice — `getStatus` slices the completed list
  `.slice(-50)` while `completeMissionLocked` evicts beyond `MAX_COMPLETED_MISSIONS = 50`; only one
  of the two is named.
- Manifest-schema collision with the neighbouring beat: `5f52e03a` lands 24 minutes after
  `8b121a70` on the same file and 28 minutes after the plan (`e706c4f9`, 21:12:22) that specifies a
  one-shot `ufo-sighting-wall-v2` migration. That migration must absorb `completed` as a legal
  status, which is why the plan's grounding note (beat M-audit-early-0053) treats the despawn as
  later-window input.
- Window tip: `5f52e03a` (2026-09-08 21:40:44 -0300) is the last non-merge commit of the late
  window; repository-wide there are no non-merge commits on 2026-09-09 or 2026-09-10 (see beat
  M-audit-early-0053 handoff).
- The relay flag identifies provenance class only — a boolean per mission; no L0 operator or session
  identity is recorded on the row.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-late-report.md` (C6)
- Prior tip: `ec6d85bf` (anchor of M-audit-early-0050)
- Next: M-audit-early-0052
