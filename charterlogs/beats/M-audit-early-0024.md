# M-audit-early-0024 — Hang bounds: group-kill so a hung host cannot be read as live

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
Fourteen commits (2026-08-26 02:13:30 → 18:02:16 UTC) convert every unbounded wait a doctor,
adapter, probe or precheck made into a seen, killed timeout. The pattern is uniform and stated in
each body: the child runs in its own process group (`process_group(0)`) and is killed with
`kill -KILL -- -$pid`, so the whole subtree dies with the bound. `95208744` is the load-bearing
precedent — `CommandSpec` declares `timeout_secs` (default 60, `UFO_ADAPTER_TIMEOUT_SECS`) and
`188fd69c` adds the group kill, so "a hung specialist tree cannot outlive the bound" (the option
terminator is "the same load-bearing form as ufo-core process invoke"). From there the family ports
the same wall-clock + group-kill onto each remaining site: `35fbdc5f` (L3 pulse/swarm and xask
consult, with TS `AdapterCommandSpec` dry JSON declaring `timeoutSecs`/`timeout_secs`), `4781f02d`
(`spawn.rs` tmux/fnm probes and gx-teams/tmux execute), `61b707b6` (control-plane dry L3 swarm,
`UFO_L3_SWARM_TIMEOUT_SECS` default 120), `bdd113e0` (hangar-shim doctor wait, returning a labeled
dry capture with `timedOut` true), `194ef127` (`probe.rs --help/--version`, `UFO_PROBE_TIMEOUT_SECS`
default 8), `915bae71` and `3fa24353` (xbreed `list-panes`/`display-message` prechecks,
`XBREED_PRECHECK_TIMEOUT_SECS` default 5; interactive launch TTY stays operator-length), `e007de1d`
(paper-parity `python3_bin()`, which after the rebase was "the next same-class hole"), `c7e9ab23`
(auto-ship git probes: status/rev-parse/diff 8s, add/commit 20s, push 60s on both Python and TS) and
`3e14d433` (`resolveLiveHostPath`'s `command -v` and hangar shim install/uninstall, 2s and 20s).
Timeout always fails closed or degrades to a labeled dry/unavailable result rather than being read
as liveness. Two members bound something other than time: `a2de96b4` resizes the hang ceiling —
the old 8s budget could not distinguish a hang from a slow host, since dry dispatch measures 7.43s
on an idle box, so the ceiling became 180s and "the observed wall time is logged rather than
asserted on" — and `018b6b46` waits out `ETXTBSY` (bounded at 2s) instead of reporting a present,
merely busy lane as missing.

## Gate
```
for s in 018b6b46 a2de96b4 95208744 188fd69c 35fbdc5f 4781f02d 61b707b6 bdd113e0 194ef127 915bae71 3fa24353 e007de1d c7e9ab23 3e14d433 481dd9e0 4a1937f5; do git cat-file -e ${s}^{commit} && n=$((n+1)) || echo "MISSING $s"; done; echo ok=$n/16
git log --no-walk --pretty="%h %s" 188fd69c 95208744 194ef127 e007de1d 3e14d433 a2de96b4 018b6b46
git show --shortstat --oneline 35fbdc5f | tail -1
```
Expected: 14/14 resolve; seven subjects verbatim as quoted; `35fbdc5f` → 13 files +475/−66.
Actual: `ok=14/14`; subjects verbatim as quoted; `35fbdc5f` → ` 13 files changed, 475 insertions(+),
66 deletions(-)`. Observed 2026-09-18 at HEAD 4adedde6, no MISSING lines.
Wave-4 re-run (2026-09-18, HEAD 4adedde6): extended loop printed ok=16/16, no MISSING lines.

## Touches
- `018b6b46` Wait out ETXTBSY instead of calling the lane missing — 3 files +121/−11
- `a2de96b4` Size the hang ceiling to mean hung, not slow — 1 file +27/−6
- `95208744` Bound ufo-adapters --execute with a wall-clock timeout. — 5 files +133/−8
- `188fd69c` Kill the adapter execute process group on timeout. — 4 files +93/−43
- `35fbdc5f` fix: bound L3 pulse/swarm and xask with group-kill — 13 files +475/−66
- `4781f02d` fix: bound spawn.rs tmux/gx-teams waits with group-kill — 8 files +268/−76
- `61b707b6` fix: bound control-plane dry L3 swarm with group-kill — 7 files +325/−17
- `bdd113e0` fix(hangar): bound hangar-shim doctor wait and report timedOut — 5 files +309/−33
- `194ef127` fix(core-runtime): bound probe.rs --help with 8s group-kill — 4 files +264/−12
- `915bae71` fix(xbreed): bound tmux pane-cap precheck with 8s group-kill — 3 files +208/−9
- `3fa24353` fix(xbreed): bound precheck tmux probes; refresh F-C3 + xask dry-consult — 15 files +272/−117
- `e007de1d` Bound loop_driver python3 import probe with wall-clock timeout. — 3 files +123/−12
- `c7e9ab23` fix(runtime): bound auto-ship git probes so hung git cannot stall ship — 7 files +132/−3
- `3e14d433` fix(runtime): bound live-host-path PATH which() so hung command -v cannot stall doctor — 6 files +112/−2
- `481dd9e0` Densify four L2/L3 charter dry stubs; bound live.rs dispatch waits. — 29 files +983−136; wave-4 fold: closes unbounded live subprocess/OIDC waits with a wall-clock group-kill bound
- `4a1937f5` fix(core): stop the tool-timeout path from killing the orchestrator — 1 file +60−1; wave-4 fold: the tool-timeout path stops killing the orchestrator (bound semantics)
- Paths: crates (ufo-adapters, core-runtime, xbreed), packages/ufo-core, packages/ufo-orch, packages/xbgst-runtime, scripts/, evidence/

## Out-of-scope
- The refusal cluster (N-D, beat 0019) and tree-confined resolution (N-E, beat 0022): this beat covers
  only waiting, not what the runtime accepts as true or where it resolves from. The honesty
  dependency is cross-referenced, not absorbed — the "hung is not live" rule this family enables is
  claimed by the honesty beat (M-audit-early-0025).
- Dispatch substrate (N-A, beat 0018), the F-C finding series (N-G, beat 0021 — `3fa24353` also
  refreshes F-C3 evidence, which stays with that beat), CLI packaging (N-B) and portability (N-F).
- Churn families (including the `wait-timeout`/`hang` subject family that over-matches this theme),
  merge/restore sweeps, sibling mission window (audit-late) and site ingestion.

## Findings
- Each member names the previous hole rather than claiming completeness. `e007de1d`: "After rebase,
  xbreed precheck tmux list-panes/display-message was already bounded. This increment bounds the next
  same-class hole". `c7e9ab23`: "No remaining unblocked production checkout climb this hunt." Parent
  goals are left OPEN in `35fbdc5f`, `4781f02d`, `61b707b6`, `e007de1d` — incremental hole-closing,
  not a claim that nothing can hang.
- `a2de96b4` is a correction of a wrong bound rather than a new bound: the 8s regression ceiling had
  "six tenths of a second of headroom" (dry dispatch at 7.43s) and "went red under any concurrent
  load", which is how it failed when `npm test` ran its own suites beside it. The failure it exists to
  catch is "never exits", and "a hang and a slow host are opposite findings that an 8s budget cannot
  tell apart."
- `018b6b46` records a misreport of the same shape this family exists to remove, one level down: a
  stub codex that was present and merely busy surfaced as
  "failed to execute codex: Text file busy (os error 26) (is it on PATH?)" — "a lane reported as
  absent when it was present". The window is sub-millisecond and shows up under parallel dispatch.
- A leftover source-scan guard is load-bearing and is stated in `e007de1d`: "a source scan fails if
  `.output()` or `Command.status()` is restored" — i.e. the fix is defended by a gate, not by convention.
- Design carve-outs are explicit: `915bae71` keeps "Interactive launch TTY stays operator-length";
  `3fa24353` timeout "fail-opens as TmuxUnavailable"; `bdd113e0` reports a labeled dry capture with
  `timedOut` true and OAuth absent. Bounded ≠ succeeded in any of these.
- `3fa24353` carries an unrelated ridealong (refresh F-C3 concurrent-pair runs, pack xask dry-consult
  mock) and notes "Gemini unused"; F-C3 citations belong to beat 0021.
- Wave-4 coverage remediation: 2 member(s) folded from the mis-adjudicated F9-ORCH and CH-HANGAR-DENSIFY rejection(s) (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-residual-report.md` (N-C)
- Prior tip: `1536930e` — anchor of M-audit-early-0023
- Next: M-audit-early-0025
