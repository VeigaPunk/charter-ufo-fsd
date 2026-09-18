# M-audit-early-0001 — Repository init on an empty root; first LKG port content lands

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
Retrospective audit beat for the founding of ufo-fsd-alpha. `f43c757c` "Initialize project"
(15:05:15 -0300) is an **empty root** — `git ls-tree -r f43c757c | wc -l` = 0 (tree
4b825dc6) — and the only human-authored commit of the day (João Veiga; the other 468
non-merge commits on 2026-08-25 are Cursor Agent). First content landed 6m13s later (UTC) at
`a169a54c` (18:11:28 +0000): portable @ufo/core exclusion-topology Pareto runtime,
@ufo/xbgst-runtime WWKD/self-iter harness with xask-dry fallback, vendored godspeed/wwkd
specialist lanes, gates/smoke, docs/LKG-SOURCES + PAPER-SUMMARY + FRAMEWORK (73 files,
+5014). Parallel first-port commits from the same LKG (last-known-good xbgst/xbrd) stack:
`04afe6dc` (κ_accept, SQLite memory, WWKD→specialists→judge loop, 84 files +5478),
`7594a7db` (grok-marketplace xbgst-stack as runtime SSoT, 542 files +53685, Gemini ban on
packages/ufo-core), `c5add6ae` (Phase 1 rebase of core runtime + deps, 78 files +6378),
`a400fafe` (UFO pattern layer port, 11 files +1415), `c041176b` (public xbgst source
provenance record). `785d53f1` is the cluster's contract decision: ssot/godspeed-core
becomes normal in-tree files + SHA256SUMS instead of a nested gitlink, so the SSoT bytes
are pinned by the repository, not by a submodule pointer.

## Gate
```
for s in f43c757c a169a54c 04afe6dc 7594a7db 785d53f1 a400fafe c041176b c5add6ae; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git ls-tree -r f43c757c | wc -l
git log --no-merges --since="2026-08-25T00:00:00+00:00" --until="2026-08-25T23:59:59+00:00" --pretty="%an" | sort | uniq -c
```
Expected: 8x "ok"; empty-root count 0; author split 468 Cursor Agent / 1 João Veiga.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): 8x ok, 0, "468 Cursor
Agent / 1 João Veiga".

## Touches
- `f43c757c` Initialize project — empty root, 2026-08-25 15:05:15 -0300
- `a169a54c` Port UFO/xbgst core runtime and Cursor substrate deps from LKG. — 73 files +5014
- `04afe6dc` Initial UFO core runtime port from LKG (xbgst/xbrd) with dry orch loop. — 84 files +5478/−48
- `7594a7db` Scaffold UFO/xbgst core runtime from LKG stack — 542 files +53685/−31
- `c5add6ae` Phase 1: rebase UFO core runtime and core deps from LKG. — 78 files +6378/−11
- `a400fafe` ufo-core: port the UFO pattern layer from last known good — 11 files +1415/−1
- `c041176b` Record public xbgst source provenance — docs/provenance.md, 1 file +24/−6
- `785d53f1` Fix godspeed-core SSoT as normal files instead of nested gitlink. — ssot/godspeed-core/{README.md,SHA256SUMS,directive.md,filter.md,velocity.md}, 6 files +170
- Paths: packages/ufo-core, packages/xbgst-runtime, plugins/xbgst-cursor, ssot/godspeed-core, vendor/, docs/LKG-SOURCES.md, docs/FRAMEWORK.md, docs/PAPER-SUMMARY.md, docs/SOURCE-MAP.md, scripts/gates.sh, scripts/smoke.sh

## Out-of-scope
- The 15-lane fan-out off the empty root and the merge storm that picked one layout —
  next beat (M-audit-early-0002).
- Batteries, honesty, pins, hangar work later on 08-25/26 — later beats in this session.
- Merge commits, lockfile refreshes, fmt sweeps (mechanical churn families; listed in the
  mission result report, not beats).
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- Three bootstrap lanes forked the root but never landed (not HEAD-reachable):
  `60eb1f60`, `b2696a13`, `e85f10ae` — part of the fan-out story, recorded in
  M-audit-early-0002.
- The Gemini ban on packages/ufo-core is present from day one (`7594a7db` body).
- The parallel first-port commits carried divergent layouts (SQLite control plane vs
  JSONL-audit runtime); reconciliation happened later the same day at `3c339133`
  (see the reconciliation beat).

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-init-report.md` (C1)
- Prior tip: none — `f43c757c` is the repository root
- Next: M-audit-early-0002
