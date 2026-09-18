# M-audit-early-0034 — Evidence machinery: consolidator v3 + gate-evidence-reproducible green

**Status:** COMPLETE | **Date:** 2026-08-27 | **Session:** audit-early

## Does
Two commits in the last hour of the working day give the fleet its disk-truth rollup and close the
reproducibility meta-gate. `61c36775` (20:58:50, 2 files +349) adds
`scripts/consolidate-fleet-evidence.sh` (232 lines, new) plus `scripts/test-consolidate-fleet-evidence.sh`.
v3 adds the three fields later honesty work depends on, pinned in the script's own header —
"v3 (seat4 gen27 r5): + l2Landing status (drift-5), livenessMarker (drift-6), blockers with
disk-truth evidenceRefs (drift-12)" — where the liveness taxonomy is
never-fake-live / declared-dry / declared-live / unverified, `blockers[]` carries disk-truth
`evidenceRefs` including `concreteDelta.honestRed`, and v2's presence-vs-validity split stands:
"seatsFound = filenames encountered; seatsValid = parse-ok AND schemaV2-ok", with schema-v2
required keys `kind, seat, recoveryGen, writtenAt, parentGoal`. The script declares itself
observe-only ("never starts gates-record, never pushes Origin"), and its battery goes 10→11 with a
v3 mutation fixture. `db7f502b` (20:50:20, 1 file +18) lands
`evidence/gate-evidence-reproducible-offline-green.json`: `ok:true`, `exit:0`, `treeCommit
"103dd1fe"`, `runnerSha "26c429cf5f2ce68e25380197b79eeb41017783d9"`, `stampKnownToGit:true`,
`citedTranscript "evidence/gates-evidence-prior.txt"`, `declaredChecks 142` =
`transcriptChecksPassed 142`, `problems []`, and the honesty pair `live:false`,
`neverFakeLive:true`. Decision reasoning, where the change was a decision: the rollup counts
arrival separately from validity so a never-written seat cannot be read as a passing one, and the
green is claimed offline only, because the first fully-green live transcript did not exist yet.

## Gate
```
for s in 61c36775 db7f502b; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git show --shortstat --no-walk --pretty="%h %s" 61c36775
git show 61c36775:scripts/consolidate-fleet-evidence.sh | wc -l
git show 61c36775:scripts/consolidate-fleet-evidence.sh | sed -n '4,6p;8,9p;13p'
git show db7f502b:evidence/gate-evidence-reproducible-offline-green.json | jq -c '{kind,exit,ok,treeCommit,runnerSha,stampKnownToGit,declaredChecks,transcriptChecksPassed,problems,live,neverFakeLive}'
git show db7f502b:evidence/gate-evidence-reproducible-offline-green.json | jq -r '.note'
git cat-file -t 26c429cf
```
Expected: two `ok`; `2 files changed, 349 insertions(+)`; 232 lines; the observe-only line and the
v3/v2 header bullets present; the JSON keys exactly as landed with 142 = 142 and empty
`problems[]`; the note recording that record1 exited 1 on the self-referential meta-gate and that
the first live transcript is still pending; and `26c429cf` resolving as a **blob**, not a commit.
Actual: observed exactly as expected (2026-09-18, HEAD `4adedde6`): 2x `ok`; `2 files changed,
349 insertions(+)`; `232`; `# Observe-only: never starts gates-record, never pushes Origin.` and
`# v3 (seat4 gen27 r5): + l2Landing status (drift-5), livenessMarker (drift-6),` …;
`{"kind":"gate-evidence-reproducible-offline-verification","exit":0,"ok":true,"treeCommit":"103dd1fe","runnerSha":"26c429cf5f2ce68e25380197b79eeb41017783d9","stampKnownToGit":true,"declaredChecks":142,"transcriptChecksPassed":142,"problems":[],"live":false,"neverFakeLive":true}`;
note verbatim: "Two-run refresh protocol complete: record1 (20:39 local, exit=1 only on the
self-referential meta-gate) produced the prior transcript stamped with the committed runner blob;
this offline run proves the meta-gate now passes 0-problem. Next live gates-record run records the
first fully-green transcript."; `blob`.

## Touches
- `61c36775` evidence-scribe (seat4 gen27 r5, laggard-kill beat): consolidator v3 closes frontier drifts 5/6/12 — l2Landing status (dispatch-vs-landing), livenessMarker (never-fake-live/declared-dry/declared-live/unverified), blockers[] with disk-truth evidenceRefs incl concreteDelta.honestRed; battery 10->11 green incl v3 mutation fixture; fleet rollup re-run 8 found/4 valid, parentGoal OPEN (local commit, no Origin push) — 2 files +349 (`scripts/consolidate-fleet-evidence.sh` 232 lines new, `scripts/test-consolidate-fleet-evidence.sh`)
- `db7f502b` evidence: gate-evidence-reproducible offline green (0 problems, 142/142) — two-run refresh complete at 103dd1fe — 1 file +18 (`evidence/gate-evidence-reproducible-offline-green.json`)
- Paths: `scripts/consolidate-fleet-evidence.sh`, `scripts/test-consolidate-fleet-evidence.sh`, `evidence/gate-evidence-reproducible-offline-green.json`, `evidence/gates-evidence-prior.txt` (cited transcript), `.ufo/local-dispatch/fleet-evidence-rollup.json` (default `--out`, self-ignored)

## Out-of-scope
- The F-C3 declared check and the retry contract the cited transcript measures — M-audit-early-0031;
  `103dd1fe`, the pinned `treeCommit`, is a beat-0031 member and is cited here only as the pin.
- The gates-green surface (`db0775b9`, `22fe29ab`, `9eb308a1`, `7f00603e`) — M-audit-early-0032.
- Later consolidator versions and the 08-28 rollup byte-identity work — M-audit-early-0038; not claimed.
- The parent-harvest ship manifest (`2dff1ac1`/`4db1d80f`) — M-audit-early-0035.
- Site ingestion (L0-owned) and the sibling window (audit-late).

## Findings
- **Self-disclosure, stated not smoothed.** `61c36775`'s own subject reports the rollup outcome as
  "fleet rollup re-run 8 found/4 valid, parentGoal OPEN" — half the seats' evidence did not parse
  or validate, and the parent goal is recorded as open rather than closed.
- **`runnerSha` is a blob.** `26c429cf` resolves as `blob` (`git cat-file -e 26c429cf^{commit}`
  fails, exit 128); it is exactly `103dd1fe:scripts/gates.sh`. The evidence records it under the
  key `runnerSha` with `stampKnownToGit:true`, so the stamp pins a file revision rather than a
  commit — the same object `cdb85f46` names as its poisoned prior (M-audit-early-0031).
- **Green is offline only, and says so.** The evidence file carries `live:false` /
  `neverFakeLive:true` and its own note records that the first fully-green **live** transcript was
  still pending; the 142/142 `declaredChecks` figure is measured against the cited prior transcript,
  not against a live run.
- **Ordering note.** `db7f502b` (20:50:20) lands before `61c36775` (20:58:50) but anchors this
  beat; the consolidator does not consume the reproducibility evidence — they are parallel
  evidence-machinery commits, not a chain.
- Cross-ref: the v3 `livenessMarker` taxonomy is the rollup-side counterpart of the
  `live:false`/`neverFakeLive:true` convention this same evening's evidence files use.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-aug27-report.md` (C5)
- Prior tip: `3700bd77` — anchor of M-audit-early-0033
- Next: M-audit-early-0035
