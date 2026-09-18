# M-audit-early-0018 — In-env/offline-L3 seating and multi-substrate c64 waves

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
Thirty-four commits (2026-08-26 00:14:48 → 18:15:09 UTC) change the loop's own dispatch
substrate. Multi-substrate dry/protocol slots now spread across kimi/codex/cursor/opencode/grok
under the c64 ceiling with godspeed+kimi tip injection and mid-run failover to another package
or protocol-dry via `adapt_apply` instead of aborting the wave (`e5b981d8`, Rust, 12 files
+810/−95; `4962629d`, Python twin, 12 files +779/−90). The decision in `4370574f`/`b7949c36` is
to read the expansion pool from the tip xbgst-stack catalog on both sides with one
`SPECIALIST_MIX_CEILING` constant, because the drift being fixed (TS expanding a 3-lane mix to
16 from the tip catalog, Rust to 9 from a frozen six-lane offline fallback, mix caps 16 vs 12)
was invisible while both pools were smaller than either bound; `f47000ab` restores
`DEFAULT_WAVE_SIZE=64` so a tip roster cannot shrink the host ceiling. `27b3cbee` seats in-env
live-subagent multi-round WWKD→κ→adapt rounds on SQLite evidence with no host API keys (25 files
+1912/−119, the cluster's largest commit), leaving host-CLI live and private-clone paths blocked;
`6035c3eb` seats protocol-shaped offline L3 mocks and kimi tip skill injection (21 files
+1298/−112); `73cd4f68`/`78884bfb`/`941ea55c` seat paper preferred-execution probes, mid-walk
axis freeze and the PLAN#6 walk-boundary second-order auditor fail-closed across runtimes.
Ban and roster enforcement: `0acd49b3` extracts the post-empty-round widening rule because
`Math.min(16, concurrency + 4)` returns 4 or 5 when a round opens at 0 or 1 and could dispatch one
of the two charter-refused vanilla waves; `c7192b64` stops seating the two generic-subagent lanes
the livepatch overlay exists to ban and collapses the adapt pool; `2764424c` holds the same ban on
the Rust roster path; `640a9fa7` dispatches the registry's per-round roster instead of reporting
the registry's ask. Two correctness bugs are self-reported in-commit: `4d4c8565` (a
`the-`-stripped alias overwriting the exact lane id in `rosterFromIds`, so the whole propose-phase
wave dispatched briefs the registry had not named) and `5e6128d5` (a fatal stdin write before
stdout was drained, which discarded good answers and misreported a lane that plainly `exit 42`ed
as a broken pipe).

## Gate
```
for s in c7192b64 2764424c d0c45490 f47000ab 4370574f b7949c36 27b3cbee 0acd49b3 3c539d0f 529e5e36 73cd4f68 78884bfb d962c71e 6035c3eb 5e6128d5 e5b981d8 28bfdf47 6c743842 4962629d 6b49b220 ed2ffc01 75cfafe0 1005d6c4 640a9fa7 ddf06773 4d4c8565 ecbd7821 25ec695d 941ea55c ec15cd04 d4c99b8b 48d8e7bd fe7ead15 4ad61a26 01c4fbfe 08f06b46 20adf9af 2b0d3260 339782ae 386da314 7c0ea248 9663d108 9d3b96b4 a155c34d b90e75c5 dcf18ffa e852450e ed55aaa4 fe380029; do git cat-file -e ${s}^{commit} && n=$((n+1)) || echo "MISSING $s"; done; echo ok=$n/49
git log --no-walk --pretty="%h %s" 27b3cbee e5b981d8 4962629d 4370574f 4d4c8565 5e6128d5
git show --shortstat --oneline 27b3cbee | tail -1
```
Expected: 34/34 resolve; the six cross-checked subjects match the ones quoted in Touches; the
`27b3cbee` scale reads 25 files +1912/−119.
Actual: `ok=34/34`; all six subjects verbatim as quoted; `27b3cbee` → ` 25 files changed,
1912 insertions(+), 119 deletions(-)`. Observed 2026-09-18 at HEAD 4adedde6, no MISSING lines.
Wave-4 re-run (2026-09-18, HEAD 4adedde6): extended loop printed ok=49/49, no MISSING lines.

## Touches
- `c7192b64` Stop seating the two lanes the overlay exists to ban, and collapse the adapt pool — 5 files +155/−13
- `2764424c` Hold the generic-subagent ban on the Rust roster path too — 1 file +51
- `d0c45490` Fold the stray probe header into the codex live-probe JSON — 1 file +2/−1
- `f47000ab` fix(orch): restore DEFAULT_WAVE_SIZE=64; tip roster must not shrink ceiling — 11 files +221/−41
- `4370574f` Make the mid-run mix expansion agree across Rust and TypeScript — 5 files +90/−15
- `b7949c36` Let Rust expand the specialist mix from the same roster TS reads — 4 files +196/−50
- `27b3cbee` Add in-env live-subagent multi-round e2e without host API keys. — 25 files +1912/−119
- `0acd49b3` Stop the in-env widening step from reaching a banned wave — 6 files +59/−19
- `3c539d0f` Make the roster-exhaustion test actually exhaust the roster — 1 file +32/−4
- `529e5e36` Raise in-env frontier via parallel specialists and pack fix. — 7 files +495/−187
- `73cd4f68` Seat paper preferred-execution probes fail-closed across orch runtimes. — 8 files +647/−23
- `78884bfb` Seat mid-walk axis-freeze and append-only compensating records. — 9 files +520/−25
- `d962c71e` Make the node_tests axis say why it went red — 1 file +101/−2
- `6035c3eb` feat(l3): protocol-shaped offline mocks + tip kimi skill injection — 21 files +1298/−112
- `5e6128d5` A specialist that answers without reading the request has answered — 4 files +161/−22
- `e5b981d8` feat(runtime): multi-substrate c64 waves with mid-run failover — 12 files +810/−95
- `28bfdf47` Score the axis set Orchestrator.create actually declares — 1 file +17/−10
- `6c743842` Assert the sum applyScoreDelta computes, not the decimal it resembles — 1 file +9/−2
- `4962629d` feat(ufo_core): Python multi-substrate waves + failover portability — 12 files +779/−90
- `6b49b220` Give the score-delta arrival value the same float tolerance as its neighbours — 1 file +6/−2
- `ed2ffc01` Compare the no-amp sum to a tolerance, not an exact decimal — 1 file +8/−2
- `75cfafe0` Prove wide dispatch from overlapping lane intervals, not total duration — 3 files +108/−6
- `1005d6c4` Distinguish a walk that proposed nothing from one it could not verify — 3 files +82
- `640a9fa7` Dispatch the registry's per-round roster instead of reporting it — 3 files +159/−11
- `ddf06773` Correct the round tables that read the registry's ask as dispatch — 2 files +53/−16
- `4d4c8565` Stop a `the-` alias from capturing the exact lane id it shadows — 2 files +29/−5
- `ecbd7821` fix(ufo-core-py): seed declared axes so the portable demo can admit — 2 files +13
- `25ec695d` Seat live-LLM parse hooks; refresh host degrade evidence; F-C3 6/6 no SIGSEGV — 16 files +701/−83
- `941ea55c` feat(pattern): seat PLAN#6 walk-boundary second-order axis auditor — 17 files +973/−45
- `ec15cd04` fix: dispatch fail-closed without orch dist; pair harness rebuilds ufo-memory — 4 files +71/−38
- `d4c99b8b` feat: offline auto-ship closed-loop with LOCAL commit proof — 15 files +789/−31
- `48d8e7bd` fix(ufo-runtime): keep L3 pulse jobs=1 off the process env — 2 files +65/−10
- `fe7ead15` Seat overlay/ufo-fsd arming on the real local dry orch loop. — 16 files +841/−3
- `4ad61a26` Fix orch overlay-fsd loop-summary syntax so tsc returns a LoopResult. — 1 file +1/−1
- `01c4fbfe` Fix planner-wave phase audit and dedupe Round-0 connector lanes. — 2 files +27−12; wave-4 fold: planner-wave phase audit + Round-0 connector lane dedupe
- `08f06b46` Refuse vanilla wave 4 on charter local-runner dispatch. — 2 files +9−4; wave-4 fold: refuses vanilla wave 4 on charter local-runner dispatch
- `20adf9af` Bound kimi tip injection by whether a tip corpus could exist — 9 files +159−30; wave-4 fold: bounds kimi tip injection by whether a tip corpus could exist
- `2b0d3260` feat(orch): load specialist roster from tip xbgst-stack LKG — 14 files +889−55; wave-4 fold: loads the specialist roster from the tip xbgst-stack LKG
- `339782ae` Add ufo-control swarm-reroute and refresh-swarm-mcp dry CLI twins. — 10 files +2377−24; wave-4 fold: swarm-reroute + refresh-swarm-mcp dry CLI twins (plan-only, fail-closed)
- `386da314` fix(wave): stop dispatching the vanilla wave the ban forbids — 3 files +60−6; wave-4 fold: stops dispatching the wave the ban forbids
- `7c0ea248` fix(wave): sweep every call site for banned wave 4/5, not a hand-listed few — 2 files +61−6; wave-4 fold: sweeps every call site for banned wave 4/5, not a hand-listed few
- `9663d108` fix(charter): isolate dispatch work dirs under concurrent probes — 7 files +307−134; wave-4 fold: isolates dispatch work dirs under concurrent probes
- `9d3b96b4` Raise planner-wave Round-0 fidelity and densify hangar coverage. — 68 files +3308−108; wave-4 fold: Round-0 planner+connector lanes first-class; default dry waves to c64
- `a155c34d` feat: public lane mirrors, escalating specialists, hangar_reconfig — 49 files +2547−96; wave-4 fold: public lane mirrors, escalating specialist roster, mid-run hangar_reconfig
- `b90e75c5` Stop orch tests from dispatching vanilla wave 4 or importing dist. — 2 files +6−6; wave-4 fold: orch tests stop dispatching vanilla wave 4 or importing dist
- `dcf18ffa` feat(iter12): land iter11 dispatch fix + MCP densify private LKG doctor paths — 114 files +10257−6; wave-4 fold: cherry-picks the dispatch work-dir isolation (SQLite) and extends the LKG doctor path
- `e852450e` Wire real sekhmet swarm --dry-run -j 64 into orch/gates. — 12 files +501−59; wave-4 fold: wires real sekhmet swarm --dry-run -j 64 into orch/gates
- `ed55aaa4` feat(ufo-orch): seat dry L3 swarm on the TS default orch loop — 9 files +202−4; wave-4 fold: seats the dry L3 swarm on the TS default orch loop (jobs=64, never live)
- `fe380029` feat(runtime): wire executeLane into specialist waves (iter 4) — 8 files +127−70; wave-4 fold: wires executeLane into specialist waves
- Paths: packages/ufo-core, packages/ufo-orch, packages/xbgst-runtime, plugins/xbgst-stack, plugins/xbgst-cursor, scripts/self-iter.sh, evidence/

## Out-of-scope
- The charter-named CLI packaging/doctor surface proved in the same hours — N-B, its own beat;
  N-F portability is M-audit-early-0020.
- Hang bounds (N-C, beat 0024), value refusal (N-D, beat 0019), tree-confined resolution
  (N-E, beat 0022), the F-C finding series (N-G, beat 0021) — adjacent clusters, separate beats.
- Churn families rejected by the residual adjudication: CH-TIPDOC, CH-FMT, CH-HANGAR-DENSIFY,
  CH-LOCK, CH-RESTORE, CH-TEST, CH-HYGIENE (bookkeeping, format and sync sweeps).
- Merge commits and the sibling mission window (audit-late, after 2026-09-10); site ingestion.

## Findings
- Honest failure, in-commit: `4d4c8565` — "The whole propose-phase wave was dispatching briefs the
  registry had not named: `scout` -> `the-scout`, `simplifier` -> `the-simplifier`, and so on for
  every lane with a `the-` twin." Cause: `rosterFromIds` wrote exact ids and aliases into one map,
  last-writer-wins, and the alias write came later. Its own side effect was also disclosed: the
  framework-agents gate had reported `the-bootstrapper.agent.md` missing while that exact file was
  on disk, because `.agent.md` was folded to `.md` only for directory entries.
- Honest failure, in-commit: `5e6128d5` — a lane that "plainly `exit 42`ed was blamed on 'failed to
  write tool request: Broken pipe'". Writing stdin before anything drained stdout was worse than
  misattribution: "wait_timeout is downstream of the write, so the deadline never starts …
  Measured on the pre-fix runtime, the new guard for this hung past 300s on a 20s budget."
- Headline-vs-evidence drift, self-corrected within the cluster: `640a9fa7` reports that the
  `dispatchedLanes` field was `proposeRoster(registry, round)` — the registry's ask — while the wave
  ran `defaultRoundRoster()`, a fixed 12-capped list of every lane in the tree. Artifacts showed a
  roster growing 8→9→10 with `the-revenger` arriving at round 4; `the-revenger` "was in fact never
  dispatched at all", and `distiller`/`scribe` were authoring moves as proposers every round.
  `ddf06773` re-tabulated from a post-fix run: widths 8/8/9/10/10, admitted 7/8/8/8/0, and the
  frontier identical at every round — the frontier never rested on the two non-proposing lanes.
- The wave-fingerprint gate that flagged `0acd49b3` found the literal, not the defect: "the
  arithmetic was wrong on substance too."
- As-of framing: the in-env live-round and offline-mock surfaces seated by `27b3cbee`/`6035c3eb`
  were removed on 2026-08-29 by `96a4b6b4` "refocus UFO runtime on native OMP routing". They are
  described here as of 2026-08-26.
- `25ec695d` carries F-C3 6/6 no-SIGSEGV evidence inside this cluster; the F-C3 series itself is
  beat 0021 (N-G), not duplicated here.
- Wave-4 coverage remediation: 15 member(s) folded from the mis-adjudicated F9-ORCH, Pins R1/R8 and F5-HANGAR rejection(s) (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-residual-report.md` (N-A)
- Prior tip: `19f32355` — anchor of M-audit-early-0017
- Next: M-audit-early-0019
