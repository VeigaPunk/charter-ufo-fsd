# M-audit-early-0053 — L2/L3 routing: plan → sibling landing → honest grounding

**Status:** COMPLETE | **Date:** 2026-09-08 | **Session:** audit-early

## Does
Three commits in 4m57s (21:12:22 → 21:17:19 -0300) are the window's only written routing policy for
the level hierarchy. `e706c4f9` (1 file, +269, new `docs/L2-L3-ROUTING.md`, "Author: WWKD posture,
2026-09-08") opens with seven axes and a data walk that fixes the vocabulary: **L0** = the
interactive operator surface, outside the mission hierarchy and not a wall pane (`--relay` is L0
provenance, see beat M-audit-early-0051); **L1** = one wall mission, sole orchestrator, one pane;
**L2** = any specialist spawned by an L1 through OMP task/Agent Hub, including native depth-1 seats
and the executor-owned depth-2 labrat, where `level` is the accounting tier and `nativeDepth`
preserves OMP parentage; **L3** = one Sekhmet spark/swarm worker, bounded read-only instrumentation.
The document states the correction explicitly — "This vocabulary intentionally corrects a current
naming collision" — because the collector prints `l2: 8, l3: 1` for the eight depth-1 non-Main seats
plus the depth-2 labrat, while under the plan the same ten-seat wave is "**one L1 plus nine L2
processes**". Routing authority is decided as: "`config/ufo.json` is the canonical routing table.
`.omp/config.yml` is a tracked OMP transport projection, not a second source of truth", with launcher
literals and Rust constants demoted to checked projections and the ban "Never preserve two routing
authorities". The target route table is per level (L1 operator-seated and inheriting the observed
session model, with no operator-specific model id in the table; L2 reasoning/synthesis →
`alibaba-token-plan/qwen3.8-max:xhigh`; L2 correctness/security →
`alibaba-token-plan/deepseek-v4-pro:max`; L2 fast/mechanical/probe →
`alibaba-token-plan/deepseek-v4-flash:low`; L3 the fixed Codex-OAuth chain
`openai-codex/gpt-5.3-codex-spark:low` → `openai-codex/gpt-5.6-sol:max` on transport `sekhmet`,
evidence-only), and the autonomy rule states: "L0 may choose the L1 it launches, but neither L0 nor
L1 supplies an ad hoc model pinpoint for an L2/L3 dispatch." Four ceilings are separated — 16
aggregate L1+L2 runners (operator-permitted, "never a target"), 64 shared Sekhmet sparks (not charged
as L1/L2 runners), 15 wall panes (display only, "made explicit rather than derived from geometry"),
with OMP `maxConcurrency: 32` called out as transport capability, not permission. The registry
decision bumps the manifest to `ufo-sighting-wall-v2` with per-process rows (`parentMissionId`,
`parentProcessId`, `nativeDepth`, `role`, `transport`, `route`, `requestedModel`, `resolvedModel`,
`fallback`, monotonic `reserved → running → settled|failed`), a one-shot v1→v2 migration and "No
permanent dual-schema compatibility path", and L3 as bounded batch rows rather than 64 permanent
spark rows. Nine bans follow ("Never let L2 or L3 judge" through "Never replay the append-only
ledger as the sole live capacity source"), and milestones M1–M4 each carry Does/Touches/a bash gate
with Expected sentence, ending in one `bash scripts/gates.sh` run after M4. `8b121a70` (2 files,
+312/−4) then lands L1/L2/L3 counting on the wall status — `levelStatus` returning
`levels: {l1,l2,l3}` plus `levelDetails`, L2 derived per mission by tail-reading the newest OMP
session transcript (2 MiB cap, `MAX_OMP_TRANSCRIPT_BYTES`), L3 by counting active-status `meta.json`
files under the spark state root (64 KiB cap), and `@ufo_l1/@ufo_l2/@ufo_l3` on the session
status-right — but it is a **sibling mission's** landing, not this plan's implementation.
`701bfe64` (1 file, +46) records that honestly: the addendum opens "This plan's data walk was
measured against the tree at e706c4f9. Four minutes after this document was committed, the sibling
`level-counts` mission landed …" and corrects two statements "rather than rewritten, so the
measurement date stays honest" (the stale "No child count is returned", and shifted
`ufo-sighting.mjs` line anchors, roughly +205). It then lists what the landing does not change: the
manifest is still v1 with L1-only rows, the fleet ledger is still L1-dispatch-only, no dispatch-time
ceiling check exists, the routing-table decision is untouched, and an M4-shaped display surface
arrived before M1–M3 exist.

## Gate
```
for s in e706c4f9 8b121a70 701bfe64; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=iso e706c4f9 8b121a70 701bfe64
git show --shortstat --format= e706c4f9 | tail -1
git show --shortstat --format= 8b121a70 | tail -1
git show --shortstat --format= 701bfe64 | tail -1
git show 701bfe64:docs/L2-L3-ROUTING.md | grep -nE 'sibling|Four minutes'
git show 701bfe64:docs/L2-L3-ROUTING.md | grep -c '^- \*\*Never '
```
Expected: 3x ok; subjects "docs: L2/L3 routing and process accounting plan" (21:12:22),
"feat(sighting): ufo_L1/L2/L3 level counting on the wall status" (21:16:04), "docs: ground L2/L3 plan
against level-counts landing (8b121a70)" (21:17:19); scales +269, +312/−4, +46; the addendum naming
the sibling; the ban-list count.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): e706c4f9 ok; 8b121a70 ok;
701bfe64 ok; the three subjects at 21:12:22 / 21:16:04 / 21:17:19 -0300; "1 file changed, 269
insertions(+)"; "2 files changed, 312 insertions(+), 4 deletions(-)"; "1 file changed, 46
insertions(+)"; `273:This plan's data walk was measured against the tree at e706c4f9. Four minutes`,
`274:after this document was committed, the sibling level-counts mission landed`; ban count `9`.

## Touches
- `e706c4f9` docs: L2/L3 routing and process accounting plan — 1 file +269, new `docs/L2-L3-ROUTING.md` (vocabulary, data walk, four ceilings, manifest v2, nine bans, M1–M4)
- `8b121a70` feat(sighting): ufo_L1/L2/L3 level counting on the wall status — 2 files +312/−4; `scripts/ufo-sighting.mjs` (+212), `tests/ufo-sighting.test.js` (+104); sibling mission `level-counts`
- `701bfe64` docs: ground L2/L3 plan against level-counts landing (8b121a70) — 1 file +46, addendum to `docs/L2-L3-ROUTING.md`
- Paths: docs/L2-L3-ROUTING.md, scripts/ufo-sighting.mjs, tests/ufo-sighting.test.js, config/ufo.json (cited policy surface), .omp/config.yml (cited projection)

## Out-of-scope
- Implementing M1–M4: no milestone code lands in this window; the plan is documentation plus a
  sibling's counting surface.
- The fleet ledger statistics this plan measures (beat M-audit-early-0050) and the sighting lifecycle
  commits (beat M-audit-early-0051) — cited as inputs.
- The 09-08 purge sweep and local GPU helper (beat M-audit-early-0052), the qwen directive campaign
  (0049) and routing re-charter (0048).
- Post-window work: from 2026-09-09 onward (repository-wide zero non-merge commits on 09-09/09-10) and
  the sibling window audit-late — handed off, not covered.

## Findings
- The landing must never be read as this plan's implementation: `8b121a70` is a sibling mission's
  work, and `701bfe64` names it that way — "the sibling `level-counts` mission landed
  `feat(sighting): ufo_L1/L2/L3 level counting on the wall status`". The three commits are three
  different agents-of-record on one evening, ordered 3m42s and 1m15s apart.
- Stale claim corrected, not rewritten, quoted from the addendum: the plan's "No child count is
  returned" is marked "stale" and superseded by `levels: { l1, l2, l3 }` plus `levelDetails`; the
  original measurement date is preserved deliberately. That is the honest-handling decision the L0
  chain should read this beat for.
- Counting and accounting are different things, per the addendum: `levelStatus` is "a status-time
  projection: unsettled-only, transcript-tail-derived, fail-open to zero per mission, with no role,
  route, model, spawn/settle timestamps, or terminal history". At HEAD the live manifest still
  reports `schema: ufo-sighting-wall-v1`, so M1's v2 registry remains unimplemented.
- Ban-list count drift against the assignment shorthand "8-item ban list": measured, the document
  carries **nine** `Never` bans (judgment, second orchestrator, Sekhmet evidence in native handoffs,
  OMP depth vs accounting level, per-operator pinpoints, wall geometry as authority, silent batch
  lowering, ledger as sole live capacity source, two routing authorities).
- The plan cites `Spec: .ufo/dispatch/l23-plan.md`, which is **not tracked** in the repository at
  `e706c4f9` (or at HEAD) — the plan's own input spec exists only on disk, so the document is the
  committed record.
- The addendum concedes sequencing risk: the sibling delivered "an M4-shaped display surface before
  M1-M3 exist", acceptable only as an "interim honest projection (it counts what is observable and
  degrades to zero, never fakes)".
- Projection drift since: at HEAD 4adedde6 `.omp/config.yml` maps reviewer/critic/connector/sentinel
  to an `ufo_swe2` alias and the mechanical seats to `alibaba-token-plan/deepseek-v4.1-flash:max`,
  none of which exist at `e706c4f9` — consistent with the projection role the plan assigns it, and
  evidence that the canonical-vs-projection check M2 specifies is still owed.
- Handoff to the next window: `5f52e03a` (21:40:44, beat M-audit-early-0051) made `completed` a legal
  mission status 23m25s after the landing, in the same file the v2 migration must rewrite; the
  manifest v2 decision therefore must absorb a status value that did not exist when it was written.
  The late window ends here — no non-merge commits repo-wide on 2026-09-09 or 2026-09-10.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-late-report.md` (C8)
- Prior tip: `59d49b1a` (anchor of M-audit-early-0052)
- Next: M-audit-late-0001 (sibling window, pending) — handoff note: window tip is `5f52e03a` (2026-09-08 21:40:44 -0300); open items handed over are M1–M4 (registry v2, canonical routing table, lifecycle telemetry, wall counts), the CI/local-only posture of beat M-audit-early-0052, and the qwen-seat yield residue of beat M-audit-early-0049.
