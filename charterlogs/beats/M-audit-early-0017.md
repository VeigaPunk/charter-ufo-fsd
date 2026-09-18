# M-audit-early-0017 — E1–E5 godspeed pin + membrane purity in the self-iter control plane

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
The godspeed bytes are pinned and the membrane — which payload actually crossed the boundary — is
checked inside the self-iteration loop. `d7ec5313` lands the E1–E5 membrane/godspeed rebase
(13 files +1125/−91, 18:55:50) and `19f32355` lands the same family again twelve minutes later
(15 files +1006/−76, 19:07:58): pin `vendor/` + `packages/` godspeed filter to the SSoT SHA, load the
judge trilogy with SHA verification and judge-only posture (directive-only to specialists), remove the
pre-gate gain-sum/weighted-rank scalar distill, drop synthetic plateau selection, and align the
reported exit to `ExitVerdict` `budget_exhausted` so a budget stop is not a saturation. `e3dc99dc`
re-pins the filter SSoT and the `budget_exhausted` taxonomy (7 files +73/−5) because the rebase left
tip gaps behind — its body states the fix "Close[s] tip gaps after executor merge", i.e. the pin and
the exit label were regressed by the merge and restored. `cce664db` exports `assertSaturationNotBudget`
for E4 exit purity plus a D2 budget-masquerade `classifyExit` path (4 files +73/−9), coupling this
cluster to the saturation-exit family. `12a558b9` wires `axis_versions` and the godspeed filter into
the self-iter control plane (14 files +765/−146): Round-0 axes and proposal lineage persist on the
unified DB, the judge fail-closes without a godspeed trilogy, and hangar agent briefs resolve offline.
`a28d1002` restores `filter.md` to the `VeigaPunk/godspeed-core` upstream SHA `09957d08` across the
SSoT/vendor/live copies so `ufo-conformance` coherence passes, and points the paper battery gates at
`cargo -p ufo-cli` (1 file +15/−9). E-numbering note: **E1–E5** is this godspeed-pin/membrane family;
**E6/E7** are the dual-orch R1–R4 conformance and WWKD fail-closed pair in `defdf825`
(M-audit-early-0012); a third, round-indexed list (R2–R5 fleet rounds) lives in the historical notes
indexed by `docs/EVIDENCE-INDEX.md`. One line of reasoning: a pin is only meaningful with a membrane
check, so the byte-pin and the purity probe land in the same commits and a degraded pin is reported
as degraded rather than passed.

## Gate
```
for s in 19f32355 d7ec5313 e3dc99dc cce664db 12a558b9 a28d1002; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 19f32355
git show --shortstat --format= 19f32355 | tail -1
git show 19f32355 --stat --format= | grep -iE "godspeed|SHA256|self-iter"
git log --oneline -1 --format='%h %ad %s' --date=short -- packages/godspeed_core
```
Expected: 6x "ok"; the E1–E5 subject verbatim at 15 files +1006/−76; the pin/purity surfaces
(vendor + packages SHA256SUMS, filter.md, self-iter) in the same commit; the last-touch of the
package pin copy.
Actual (observed 2026-09-18, HEAD 4adedde6): 6/6 ok; "19f32355 feat(runtime): land E1–E5 godspeed pin
+ membrane purity"; "15 files changed, 1006 insertions(+), 76 deletions(-)"; grep printed
`packages/godspeed_core/SHA256SUMS`, `packages/xbgst-runtime/src/{self-iter.ts,self-iter.test.ts}`,
`vendor/godspeed-core/SHA256SUMS`, `vendor/godspeed-core/filter.md`; last touch of
`packages/godspeed_core` printed "96a4b6b4 2026-08-29 refocus UFO runtime on native OMP routing".

## Touches
- `19f32355` feat(runtime): land E1–E5 godspeed pin + membrane purity — 15 files +1006/−76
- `d7ec5313` feat(runtime): land E1–E5 membrane/godspeed rebase — 13 files +1125/−91
- `e3dc99dc` fix(e1-e5): re-pin godspeed filter SSoT + budget_exhausted taxonomy — 7 files +73/−5
- `cce664db` fix(core): export assertSaturationNotBudget for E4 exit purity — 4 files +73/−9
- `12a558b9` Wire axis_versions and godspeed filter into the self-iter control plane. — 14 files +765/−146
- `a28d1002` Align godspeed filter.md to upstream pin; fix gates ufo-cli batteries — 1 file +15/−9
- Paths (as of the cited commits): vendor/godspeed-core/{SHA256SUMS,filter.md},
  packages/godspeed_core/SHA256SUMS, packages/xbgst-runtime/src/{self-iter.ts,saturation-fixture.ts},
  packages/ufo-core/src/policy.ts, scripts/gates.sh

## Out-of-scope
- The godspeed `filter.md` SSoT pin war across the tree (`2dc18f67`, `60e424d0`, and the honesty-lane
  fix wave) — M-audit-early-0015; only the ufo-cli battery fix inside `a28d1002` is this cluster's.
- Anti-pattern hard gates R1–R4 and the E6/E7 conformance pair (`defdf825`) — M-audit-early-0012.
- Saturation vs budget-halt exit semantics — M-audit-early-0016.
- WWKD plan-on-disk tokens — M-audit-early-0008.
- Site ingestion (L0-owned) and the sibling window after 2026-09-10.

## Findings
- Honest failure: E1–E5 landed twice within twelve minutes (`d7ec5313` then `19f32355`) with
  `filter.md` byte churn across copies, and the pin was regressed again by the executor merge —
  `e3dc99dc` exists to "re-pin godspeed filter SSoT" ("Close tip gaps after executor merge"). The
  family reaches a stable upstream SHA only at `a28d1002`: `09957d08`, restored "across
  SSoT/vendor/live copies so ufo-conformance coherence passes".
- Boundary: the pin-war commits that fight over the same bytes are the honesty lane's beats, not
  listed here; this beat cites only the commits whose subject ties them to the self-iter control
  plane, the E4 exit-purity export and the ufo-cli battery fix.
- E-numbering disambiguation, verbatim from source: this cluster is E1–E5 (godspeed pin/membrane);
  `defdf825` is "E6 dual-orch R1–R4 conformance + E7 WWKD fail-closed"; the round-indexed third list
  ("R2–R5") is the historical evidence notes, of which `docs/EVIDENCE-INDEX.md` says "This index
  summarizes the deleted R2–R5 notes" and "A mock reported as 'live' remains mock evidence."
- As-of: `vendor/godspeed-core/` and `packages/godspeed_core/SHA256SUMS` are described at the cited
  commits; both are absent at HEAD — the package copy's last touch is `96a4b6b4` (2026-08-29,
  "refocus UFO runtime on native OMP routing") and the downstream vendor mirror was purged at
  `e47ab329` (2026-09-08, "purge downstream vendor mirrors and port staging"). Pins are cited by
  commit, not as current state.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-gates-report.md` (C6)
- Prior tip: `3bb2c17a` — anchor of M-audit-early-0016
- Next: M-audit-early-0018
