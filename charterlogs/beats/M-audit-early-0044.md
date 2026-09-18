# M-audit-early-0044 — Mirror-drift family closed; gates-record run 1

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
`253dfd53` (19:14:59 -0300; 9 files, +96/−22) works the gate damage the day's own seating did: the
fresh full battery showed 12 red gates and "Five were caused by the single-SSoT seating itself", so
`assert-kimi-skills-depth` now asserts exactly the 16-agent ufo roster (it was hardcoded to the
21-file xbgst seat), `assert-lane-coverage` resolves tip extras through lanes' agent pointers
(janitor/musketeer/bootstrapper renames), `assert-charter-posture` expects `planner.md`, the five
drifted SKILL.md mirrors are synced to the tip byte hash, `substrates/{kimi,opencode}` revert to the
audited installable-local status word (live evidence stays in `credentialBlocked:false` + notes) and
`packages/substrate-omp` gains `hangar/install-local.sh` plus the agents roster in its published
files; "The remaining seven reds predate this work … and are recorded — not silently fixed — in the
walk artifact's classification section, per the goal's stop rule; each names its sanctioned
remediation." `e71d9f9b` (19:19:37; 5 files, +23/−13) re-adjudicates the drift pins instead of
weakening them — "The 2026-08-28 local-first rebase moved the workspace crate and mirror bytes
without re-pinning: DECLARED loop_driver.rs digests no longer matched either side" — re-verifying the
declared markers and forbiddens on the current bytes, re-pinning both digests in the gate table and
the adjudication record, and syncing the `vendor/lkg` loop_driver plus distill/fleet tip-published
copies back to the majority mirror bytes so the no-climb four-way byte identity holds. `77a960dd`
(19:19:37; 1 file, +1/−1) anchors that record at the re-pinning commit (subject-only, no body).
`70c1fc5b` (19:24:08; 3 files, +42/−15) closes the family: `proposal.rs` goes byte-identical to the
SSoT, the `godspeed.rs` lagger family re-converges on the majority bytes, and "the T15 tamper test
now targets the re-pinned loop_driver digest so the pin-only-update death path is exercised again
(23/23)". `c81295e6` (19:27:11; 9 files, +132/−202) records the second pass — mirror-drift family
re-adjudicated green, `substrate-status-earned` green on re-run, and "the remaining four reds
documented as blocked on the pruned private LKG (golds unrecoverable in-tree; see
LKG-PRIVATE-FALLBACK.md) with the gates-record re-record remedy in flight". `116cfc72` (19:36:37;
4 files, +60/−282) greens `packed-charter-bins` by fixing the gate rather than the data: named
`ufo-X` ids alias to bare-name substrate dirs ("ufo-kimi -> substrates/kimi"), eight ids
(`ufo-stack`, `ufo-grok-bot`, `ufo-cursor-agent-surface`, `xbrd-*`) get a `DECLARED_PORT_SEATED`
table whose every seat path is verified to exist, and the tarball count assertion is recalibrated to
the packable surface ("4 peers + 28 substrate dirs = 32"); the artifact that commit publishes records
`named: 35`, `packed: 32`, `failures: []`. `0d42bf12` (19:51:42; 3 files, +2652/−4607) publishes the
gates-record run 1 transcript (`evidence/gates-current.txt`, `evidence/gates-evidence-prior.txt`,
`docs/artifacts/gate-evidence-reproducible.json`), and `1d31b708` (20:19:29; 2 files, +42/−6)
executes the deferred half of the `c34f3666` nuke — six `scripts/gates.sh` check lines whose
scripts that commit deleted are neutralized with provenance comments ("Neutralized with provenance
comments, not deleted, so the battery's history stays legible").

## Gate
```
for s in 253dfd53 e71d9f9b 77a960dd 70c1fc5b c81295e6 116cfc72 0d42bf12 1d31b708; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 253dfd53 e71d9f9b 77a960dd 70c1fc5b c81295e6 116cfc72 0d42bf12 1d31b708
git show --shortstat --format= 0d42bf12
git rev-parse 0d42bf12:evidence/gates-current.txt HEAD:evidence/gates-current.txt
git show 0d42bf12:evidence/gates-current.txt | awk '
  /^PASS/{p++} /^FAIL/{f++} /[|]PASS$/{tp++} /[|]FAIL$/{tf++}
  /^GATES-CHECKS-BEGIN$/{blk=1; next} /^GATES-CHECKS-END$/{blk=0}
  blk{n++; if (/[|]PASS$/) bp++; else bf++}
  END{printf "PASS-prefix=%d FAIL-prefix=%d PASS-table=%d FAIL-table=%d checks-block=%d(%dP/%dF)\n",p,f,tp,tf,n,bp,bf}'
git show 0d42bf12:evidence/gates-current.txt | grep -c 'PASS '
git show 0d42bf12:evidence/gates-current.txt | grep -c 'FAIL'
```
Expected: 8x ok; eight subjects verbatim; 3 files changed, 2652 insertions(+), 4607 deletions(−);
the one counting command reporting PASS-prefix=365 FAIL-prefix=27 PASS-table=153 FAIL-table=14
checks-block=167(153P/14F); 367; 54.
Actual: observed exactly (2026-09-18, HEAD 4adedde6): 8x ok; subjects as in Touches; "3 files
changed, 2652 insertions(+), 4607 deletions(-)"; both rev-parse lines
`02c865b5e07f89fd03142e2c086503b847f32500` (the transcript blob is unchanged between `0d42bf12` and
HEAD); `PASS-prefix=365 FAIL-prefix=27 PASS-table=153 FAIL-table=14 checks-block=167(153P/14F)`;
367; 54. The 14 `FAIL` rows in the checks block are the six nuke-caused omp checks this cluster's
own `1d31b708` later neutralizes (`substrate-omp essence verbs`, `substrate-omp verbs`,
`substrate-omp pack files`, `substrate-omp pkg battery`, `omp port mesh identity`, `omp port mesh
battery`) plus `kimi local dispatcher tests`, `cargo fmt --check`, `cargo workspace all-features
F-C3 serial-retry contract`, `substrate gates ufo_core import`, `charter CLI completeness`,
`lkg runtime fidelity`, `titanium livepatch semantics`, `cited gate evidence is reproducible`.

## Touches
- `253dfd53` Fix the five gates this work introduced; classify the rest as pre-existing — 9 files +96/−22; scripts/assert-{charter-posture,kimi-skills-depth,lane-coverage}.mjs, packages/substrate-omp/{hangar/install-local.sh (new),package.json}, substrates/{kimi,opencode}/substrate.json, docs/artifacts/{2026-08-28-seating-sighting-walk.md,lane-coverage.json}
- `e71d9f9b` Re-adjudicate the loop_driver tip-shape drift pins to current bytes — 5 files +23/−13; scripts/assert-mirror-fill-drift.mjs, ports/ufo-core-runtime/MIRROR-DRIFT-ADJUDICATION.json, vendor/lkg/ufo-core-runtime/crates/ufo-core/src/{loop_driver.rs,distill.rs,fleet.rs}
- `77a960dd` Anchor the mirror-drift adjudication record at the re-pinning commit e71d9f9bc13ed42212cf3f2be7def4b9bbe5a124 — 1 file +1/−1; ports/ufo-core-runtime/MIRROR-DRIFT-ADJUDICATION.json
- `70c1fc5b` Close the mirror-drift gate family after re-adjudication — 3 files +42/−15; ports/ufo-core-runtime/crates/ufo-core/src/proposal.rs, vendor/lkg/ufo-core-runtime/crates/ufo-core/src/godspeed.rs, scripts/test-mirror-fill-drift.sh
- `c81295e6` Record the second-pass gate state: mirror family green, LKG-blocked rest — 9 files +132/−202; docs/artifacts/{2026-08-28-seating-sighting-walk.md,charter-posture.json,mirror-fill-drift.json,substrate-status-earned.json,tip-mirror-loop-fixture-no-climb.json,tip-wire-assert.json,tip-wire-report.json}, packages/substrate-{codex,kimi}/hangar/lkg-mirror/skills/ufo/SKILL.md
- `116cfc72` Green the packed-charter-bins gate with alias mapping + declared excursions — 4 files +60/−282; scripts/assert-packed-charter-bins.mjs, scripts/lib/charter-substrate-dirs.mjs, lanes/registry.yaml, docs/artifacts/packed-charter-bins.json
- `0d42bf12` Record gates-record run 1 transcript (167/167 checks, 3 known reds) — 3 files +2652/−4607; evidence/gates-current.txt, evidence/gates-evidence-prior.txt, docs/artifacts/gate-evidence-reproducible.json
- Paths: scripts/assert-*.mjs, scripts/lib/charter-substrate-dirs.mjs, scripts/gates.sh, scripts/test-mirror-fill-drift.sh, ports/ufo-core-runtime/{MIRROR-DRIFT-ADJUDICATION.json,crates/ufo-core/src/*}, vendor/lkg/ufo-core-runtime/crates/ufo-core/src/*, docs/artifacts/, evidence/gates-{current,evidence-prior}.txt

## Out-of-scope
- The seating that created the five self-inflicted reds — M-audit-early-0042 — and the model-route
  edits in between — M-audit-early-0043.
- omp live credentials, provider pool and delegation cascades — M-audit-early-0045 (they land 12
  minutes after this cluster's last commit).
- The `c34f3666` nuke itself and its continuation handoff — M-audit-early-0039; earlier mirror-drift
  provenance work (2026-08-28 00:56–03:48 wave) — the sibling cluster in the scout report's C2.
- Site ingestion (L0-owned); the 2026-08-29 refocus (`96a4b6b4`).

## Findings
- THE RECORD DOES NOT RECONCILE. `0d42bf12`'s subject says "167/167 checks, 3 known reds"; its body
  says "Fresh battery transcript published by gates-record run 1: 164 PASS / 3 FAIL"; the transcript
  it publishes has a 167-row checks block of 153 PASS / 14 FAIL, and no predicate over that file
  returns 164 PASS / 3 FAIL. The only observed "167" is the row count of the
  `GATES-CHECKS-BEGIN`…`GATES-CHECKS-END` block. The 3-of-14 subset the body names (lkg runtime
  fidelity, titanium livepatch semantics, gate-evidence self-check) exists inside the 14, but the
  other 11 rows — six of them caused by a nuke this same cluster then scrubs — are not accounted for
  in either headline. This divergence is recorded, not smoothed: it is the honest finding of this
  beat.
- L1's independent raw greps over the same blob (367 PASS-shaped / 54 FAIL-shaped) reproduce exactly
  as `grep -c 'PASS '` = 367 and `grep -c 'FAIL'` = 54 — two different shape predicates over one
  file. Transcript-derived counts in this window are only comparable when the predicate is stated,
  which is why the Gate above fixes one exact counting command.
- The transcript was never regenerated: `evidence/gates-current.txt` has the same blob
  (`02c865b5`) at `0d42bf12` and at HEAD, so the published evidence still shows the six omp FAIL
  rows that `1d31b708` neutralized 28 minutes later, and `c81295e6`'s "gates-record re-record remedy
  in flight" was still in flight at end of day.
- Self-inflicted damage is stated as such: `253dfd53` — "Five were caused by the single-SSoT seating
  itself"; the seven others "predate this work". Its pass/red arithmetic is not reconciled with
  `86a0add1`'s "five failures proven pre-existing" (M-audit-early-0042) — different red sets, no
  shared ledger.
- `1d31b708` is the deferred half of an earlier commit: "The oh-my-posh nuke commit's own message
  mandates a follow-up scrub of live refs" — the nuke is `c34f3666` (M-audit-early-0039), whose
  subject itself reads "nuke oh-my-posh port (1/2)". Touches-primary for `1d31b708` (2 files
  +42/−6; scripts/gates.sh, docs/artifacts/2026-08-28-seating-sighting-walk.md) is
  M-audit-early-0039; this beat's Gate and Findings cite it because it neutralizes six of the
  fourteen FAIL rows in the transcript published here, 28 minutes later.
- Cross-ref: the byte-parity seat batch `a509e00b` (M-audit-early-0042) is the seating's own parity
  sweep; the gate-driven SKILL.md mirror syncs counted in `253dfd53` are separate edits made here.
- Still-open at end of day: the four private-LKG-blocked reds (`c81295e6`: "golds unrecoverable
  in-tree") and F-C3, which `3abf30bc` earlier left OPEN (scout report C3, not this beat).

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C9)
- Prior tip: `14d81aef` — anchor of M-audit-early-0043
- Next: M-audit-early-0045
