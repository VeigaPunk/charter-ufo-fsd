# M-audit-early-0038 — Fleet-evidence rollup byte identity; F-C3 hung-tmux isolation

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
The fleet rollup stops accepting unverifiable claims, and the F-C3 spawn path gains a real degrade
contract without a speculative runtime edit. `ebf44d1f` (02:07:15, 4 files +158/−3) adds per-seat
`inputSha256` + `snapshotSha256` to `scripts/consolidate-fleet-evidence.sh` — the body calls this
"identity, not freshness" — with v6r2 failing present-but-unreadable inputs as data rather than
skipping them; 16/12 focused tests green. `ba3bf3ac` (02:52:26, 5 files +204/−2) extends the binding
to the visible residuals: openResiduals inherit freshness certification flags so they "no longer
look certified when the source seat is schema-invalid or older-gen", while schema-valid unranked
generations stay in the snapshot as stale-gen data instead of aborting consolidation. `b5cd361e`
(09:23:21, 5 files +296/−3) lands consolidator v8: schema-v2 presence now matches the extractor
fallbacks (`writtenAt|at`, `recoveryGen|round`, `parentGoal|openAxis.parentGoal`) so live seats that
timestamp under `at` stop false-redding as schema-invalid; identity stays `path:digest`; the
skill-pack documents the contract; `crates/ufo-core-runtime/src/proposal.rs` gains tests-only
coverage while the commit states "tip bytes remain OPEN". `3abf30bc` (09:26:41, 8 files +531/−52)
covers production `spawn_one` with a hung-tmux degrade test (fast `-V`, hung new-session), makes the
parallel repro wait each job once and flock like the serial probe, and forbids the hermetic stub
battery from publishing allGreen on mixed 0/1 codes — and states plainly "F-C3 stays OPEN."
`2c2f1010` (03:48:00, 13 files +4466/−3872) records the seat-2 leftover converge in `NEXT.md` and
the evidence artifacts: "Pass 5 published 149/149 with EXIT=0 after pass 4's sole meta red", with
the hung_tmux test now driving `spawn_tmux_direct` from a captured `TmuxDirect` request so fleet
fork pressure cannot skip the timeout path, and `scripts/sync-tip-mirrors.mjs` parsing
`--apply/--json` after the prefix strip. Decision line (quoted from `ebf44d1f`): a rollup is bound
to exact input bytes, so an unreadable seat input is data about the seat, not a parse problem to
skip.

## Gate
```
for s in ebf44d1f ba3bf3ac 2c2f1010 b5cd361e 3abf30bc; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" ebf44d1f ba3bf3ac 2c2f1010 b5cd361e 3abf30bc
git show --shortstat --pretty=%h ebf44d1f
git show 2c2f1010:docs/artifacts/gate-evidence-reproducible.json | head -12
git show 2c2f1010:NEXT.md | grep -o "Pass 5 149/149 EXIT=0[^;]*" | head -1
```
Expected: 5x "ok"; subjects verbatim; `ebf44d1f` scale 4 files/+158/−3; the committed evidence
artifact and `NEXT.md` carry the pass-5 record.
Actual (2026-09-18, HEAD 4adedde6): 5x ok; subjects matched — `3abf30bc` "fix(fc3): cover spawn_one
hung-tmux and wait-capture once", `b5cd361e` "feat(evidence): consolidator v8 alias presence +
proposal tests-only", `2c2f1010` "Record seat 2 leftover gates-green two-run converge and hung_tmux
isolation.", `ba3bf3ac` "Bind fleet-rollup openResiduals to freshness certification flags.",
`ebf44d1f` "Bind fleet rollup to exact input bytes via digests"; shortstat " 4 files changed, 158
insertions(+), 3 deletions(-)"; the artifact at `2c2f1010` reads `"ok": true`, `"generatedAt":
"2026-08-28T06:46:09.960Z"`, `"declaredChecks": 149`, `"transcriptChecksPassed": 148`,
`"transcriptChecksFailed": ["cited gate evidence is reproducible|FAIL"]`; `NEXT.md` carries "Pass 5
149/149 EXIT=0 at 06:46:10Z: ... `cited gate evidence is reproducible` PASS" — i.e. the committed
artifact is the pre-meta snapshot taken one second before the meta check passed in that same pass
(see Findings).

## Touches
- `ebf44d1f` Bind fleet rollup to exact input bytes via digests — `scripts/consolidate-fleet-evidence.sh` + `scripts/test-consolidate-fleet-evidence.sh`, 4 files +158/−3
- `ba3bf3ac` Bind fleet-rollup openResiduals to freshness certification flags. — `scripts/consolidate-fleet-evidence.sh`, `NEXT.md`, 5 files +204/−2
- `2c2f1010` Record seat 2 leftover gates-green two-run converge and hung_tmux isolation. — `crates/ufo-runtime/src/spawn.rs`, `scripts/sync-tip-mirrors.mjs`, `docs/artifacts/gate-evidence-reproducible.json`, `evidence/gates-{current,evidence-prior}.txt`, `NEXT.md`, 13 files +4466/−3872
- `b5cd361e` feat(evidence): consolidator v8 alias presence + proposal tests-only — `scripts/consolidate-fleet-evidence.sh`, `config/skill-pack.json`, `crates/ufo-core-runtime/src/proposal.rs`, 5 files +296/−3
- `3abf30bc` fix(fc3): cover spawn_one hung-tmux and wait-capture once — `crates/ufo-runtime/src/spawn.rs`, `scripts/fc3-parallel-repro.sh`, `scripts/fc3-serial-probe.sh`, `scripts/test-fc3-parallel-repro-codes.sh` (new), `handoff.json`, `NEXT.md`, 8 files +531/−52
- Paths: also `packages/substrate-ufo-fsd/hangar/lkg-mirror/ufo-core-runtime/SRC-PARTIAL.json`, `ports/ufo-core-runtime/SRC-PARTIAL.json`, `vendor/lkg/ufo-core-runtime/SRC-PARTIAL.json`, `tests/charter-tip-mirror-parity.test.js`, `docs/artifacts/tip-wire-{assert,report}.json`

## Out-of-scope
- The drift-pin provenance work (`3db8fd6c`, `372169fe`) and the pre-reboot snapshot — previous beat
  (M-audit-early-0037). The L1 brief groups those provenance pins with this beat; they are recorded
  where their cluster lives.
- The F-C finding series' origin (M-audit-early-0021) and the F-C3 concurrency race classes
  (M-audit-early-0031) — cross-referenced, not re-argued here.
- The evening mirror-drift family closure and gates-record run 1 (`253dfd53`, `e71d9f9b`,
  `77a960dd`, `70c1fc5b`, `c81295e6`, `116cfc72`, `0d42bf12`) — M-audit-early-0044.
- The `scripts/spawn-l2-seat*-recovery-*.sh` scaffolding files (F2) and regenerated artifacts (F4)
  beyond the named commits; the sibling audit-late window and site ingestion.

## Findings
- `3abf30bc` leaves **F-C3 OPEN by its own text** ("Cover ... without a speculative runtime edit ...
  F-C3 stays OPEN. Local only; no Origin push."). Cross-ref: M-audit-early-0021 (F-C2..F-C7 filings,
  harness, gate-attribution) and M-audit-early-0031 (F-C3 race classes → repro-backed fixes →
  declared check).
- Headline-vs-artifact, verified rather than asserted: the evidence artifact committed inside
  `2c2f1010` was generated at 2026-08-28T06:46:09.960Z and records 149 declared / **148** passed
  with its single FAIL being the meta check `cited gate evidence is reproducible|FAIL`, while
  `NEXT.md` records the same pass as 149/149 EXIT=0 at 06:46:10Z with that check PASS. Both readings
  are real; a reader quoting only the artifact would call the pass red, and a reader quoting only
  `NEXT.md` would call the artifact green.
- `2c2f1010`'s diff is mostly regenerated evidence (13 files, +4466/−3872 ≈ the F4 churn family);
  the behavioral change in it is the `spawn.rs` hung_tmux isolation plus the `--apply/--json` flag
  parse. Its headline is a record of a converge, not a feature.
- `b5cd361e` closes a false-red class rather than a false-green one: live seats that timestamp under
  `at` were being marked schema-invalid. It leaves "tip bytes remain OPEN".
- Three of the five commits carry a `scripts/spawn-l2-seat*-recovery-*.sh` scaffolding file (F2
  family); those files are dispatch scaffolding, and the reviewed behavior is in the consolidator
  and `spawn.rs` changes.
- These five commits are the direct antecedents of the evening gate-family closure (M-audit-early-0044),
  where the mirror-drift pins are re-adjudicated and the transcript is re-stamped.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C3)
- Prior tip: `8c8664a5` (anchor of M-audit-early-0037)
- Next: M-audit-early-0039
