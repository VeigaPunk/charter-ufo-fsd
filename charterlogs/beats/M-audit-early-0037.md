# M-audit-early-0037 — Pre-reboot preservation; mirror-drift provenance pins; Gemini L2 hard block

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
A machine reboot splits the night, and the cluster is what was preserved before it plus two
contract hardenings after. `8c8664a5` (00:56:10, 124 files +16065/−7153) snapshots local state at
2026-08-28T03:55Z — gen27–gen31 seat recovery scripts (55 paths under `scripts/`), 24 docs
artifacts, 17 crates (including `crates/ufo-control-plane/src/swarm_reroute.rs` and
`crates/ufo-core-runtime/src/provenance.rs`), 12 gate transcripts, and the `NEXT.md`/`handoff.json`
pair — and says so plainly: "Gates not re-run for this snapshot (preservation, not a green claim);
parent goal remains OPEN." `ae17f379` (00:58:18, 2 files +25) adds the structured twin: matching
entries in `NEXT.md` and `handoff.json` (`preRebootSnapshot20260828`) carrying state anchors,
reboot/rebase procedure, open residuals, and kimi session and config restore pointers. `3db8fd6c`
(01:57:52, 6 files +217/−2) binds the drift pins to provenance: the pinned digests in
`scripts/assert-mirror-fill-drift.mjs` are cross-checked in both directions against
`ports/ufo-core-runtime/MIRROR-DRIFT-ADJUDICATION.json`, which "must carry a full 40-hex
adjudicationCommit verified against git history when a .git tree is present"; the mutation battery
is recorded 20/20 TESTS_OK (T15 pin-only update, T16 record tamper, T17 missing record, T18
malformed commit, T19 fabricated commit all die). `647f395c` (02:07:36, 7 files +96) hard-blocks
Gemini-family pins in `scripts/dispatch-l2-local.sh` — "gemini* pins hard-blocked (exit 4) in both
routing branches, mirroring the Kimi block; pre-fix leak (`--pin gemini-pro` rc=0) closed" — offline
battery 9/9, and gives five generic outer launchers a bash-boundary scratch ingress so non-login
dispatch resolves TMPDIR below `/scratch` (battery 8/8, thin substrates stay inheritance-only).
`4281bdad` (02:49:18, 4 files +159/−69) copies the crates Harbor TMPDIR contract onto the live
`ports/xbrd-gdsp-fknpft` port, which had still hard-coded `/tmp` and advertised that in its
mutation-tester template (battery 22/22 TESTS_OK). `372169fe` (02:55:33, 7 files +234/−62) closes
the leftover: by its own body it "closed a false-green where ae17f379 existed but did not contain
MIRROR-DRIFT-ADJUDICATION.json, then killed committed empty/divergent pins (T20–T22)". Decision
line (quoted from `3db8fd6c`): a pinned digest is evidence only when the record that declares it is
itself pinned to a commit git can resolve.

## Gate
```
for s in 8c8664a5 ae17f379 3db8fd6c 647f395c 4281bdad 372169fe; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 8c8664a5 ae17f379 3db8fd6c 647f395c 4281bdad 372169fe
git show --shortstat --pretty=%h 8c8664a5
git ls-tree -r ae17f379 --name-only | grep -c "MIRROR-DRIFT-ADJUDICATION.json"
git ls-tree -r 3db8fd6c --name-only | grep -c "MIRROR-DRIFT-ADJUDICATION.json"
```
Expected: 6x "ok"; subjects verbatim; `8c8664a5` scale 124 files/+16065/−7153; the adjudication
record absent at `ae17f379` (0) and present at `3db8fd6c` (1), which is what the `372169fe` body
claims.
Actual (2026-09-18, HEAD 4adedde6): 6x ok; subjects matched — `372169fe` "Bind mirror-drift
adjudicationCommit to the record tree and its pins.", `4281bdad` "seat4 leftover r4: mirror Harbor
TMPDIR contract onto the live xbrd-gdsp-fknpft port", `647f395c` "seat4 gen31 continuation:
Gemini-family L2 hard block + outer-launcher scratch ingress", `3db8fd6c` "Bind mirror drift pins
to adjudication provenance record", `ae17f379` "Add pre-reboot continuation handoff", `8c8664a5`
"Snapshot pre-reboot local state"; shortstat " 124 files changed, 16065 insertions(+), 7153
deletions(-)"; the adjudication-record counts came back 0 at `ae17f379` and 1 at `3db8fd6c`. Quotes
above are from the commit bodies themselves.

## Touches
- `8c8664a5` Snapshot pre-reboot local state — 124 files +16065/−7153 (`NEXT.md`, `handoff.json`, `scripts/`, `docs/artifacts/`, `evidence/`, `crates/`)
- `ae17f379` Add pre-reboot continuation handoff — `NEXT.md` + `handoff.json` (`preRebootSnapshot20260828`), 2 files +25
- `3db8fd6c` Bind mirror drift pins to adjudication provenance record — `ports/ufo-core-runtime/MIRROR-DRIFT-ADJUDICATION.json` (new) + `scripts/assert-mirror-fill-drift.mjs` + `scripts/test-mirror-fill-drift.sh` + `docs/artifacts/mirror-fill-drift.json`, 6 files +217/−2
- `647f395c` seat4 gen31 continuation: Gemini-family L2 hard block + outer-launcher scratch ingress — `scripts/dispatch-{alpha,kimi,l1,l2}-local.sh`, `scripts/l0-dispatch.sh`, `scripts/test-dispatch-gemini-block.sh` (new), `scripts/test-dispatch-scratch-ingress.sh` (new), 7 files +96
- `4281bdad` seat4 leftover r4: mirror Harbor TMPDIR contract onto the live xbrd-gdsp-fknpft port — `ports/xbrd-gdsp-fknpft/scripts/mutation-harbor-scaffold.sh` + `ports/xbrd-gdsp-fknpft/templates/agents/mutation-tester.md` + `scripts/test-mutation-harbor-tmpdir.sh`, 4 files +159/−69
- `372169fe` Bind mirror-drift adjudicationCommit to the record tree and its pins. — `scripts/assert-mirror-fill-drift.mjs`, `ports/ufo-core-runtime/MIRROR-DRIFT-ADJUDICATION.json`, `scripts/test-mirror-fill-drift.sh`, `NEXT.md`, `.ufo/local-dispatch/l1-fleet-6-evidence.json`, 7 files +234/−62
- Paths: also `crates/ufo-control-plane/src/swarm_reroute.rs` and `crates/ufo-core-runtime/src/provenance.rs` (inside the `8c8664a5` snapshot), `docs/artifacts/mirror-fill-drift.json`

## Out-of-scope
- Fleet-rollup byte identity and freshness (`ebf44d1f`, `ba3bf3ac`), consolidator v8 (`b5cd361e`),
  the F-C3 hung-tmux isolation (`3abf30bc`) and the seat-2 converge record (`2c2f1010`) — next beat
  (M-audit-early-0038). The L1 brief groups those rollup members with this beat; they are recorded
  where their cluster lives.
- The seat-6/seat-4 `scripts/spawn-l2-seat*-recovery-gen*.sh` scaffolding files (F2 family) beyond
  the named commits.
- The 11:24 wrong-referent nuke and the handoff directives (0039), the cloud→local rebase (0040),
  and all later 08-28 clusters (0041–0045).
- The evening mirror-drift family closure (`e71d9f9b`, `77a960dd`, `70c1fc5b`, `c81295e6`) — the
  re-adjudication that follows this provenance work — M-audit-early-0044.
- Sibling mission audit-late window and site ingestion.

## Findings
- `372169fe` is itself the repair of a false-green introduced with `ae17f379`. Verified
  independently, not taken from the body: `git ls-tree -r ae17f379` has no
  `MIRROR-DRIFT-ADJUDICATION.json` (0 matches); the file first exists at `3db8fd6c` (1 match). The
  tree at `ae17f379` predates `3db8fd6c`, so the missing file there is expected — what the
  false-green was is that the pre-reboot handoff was taken as carrying adjudication provenance it
  did not carry [INFERENCE].
- `647f395c` records an honest partial failure: "Sol review lane interrupted twice (fail-as-data);
  independent battery re-runs green in reviewer log before interruption. Parent goal OPEN." Both
  seat-4 commits end with "Local commit only, no Origin push."
- `8c8664a5` is explicitly **not** a green claim: "Gates not re-run for this snapshot
  (preservation, not a green claim)". Its 124-file diff mixes real snapshot content with
  regenerated artifacts (F4 family); the decision it records is to preserve state, not to assert it.
- Cluster boundary note: `ebf44d1f` (02:07:15) and `ba3bf3ac` (02:52:26) land within the same hour
  as this cluster but belong to the fleet-evidence rollup line — recorded in M-audit-early-0038,
  cited here only as a cross-reference.
- `4281bdad` is a **mirror, not a fix**: the crates Harbor scaffold already honored TMPDIR,
  explicit MUT_HARBOR_ROOT and fail-closed roots; the live port was the copy that had drifted. The
  commit copies the crates pair byte-for-byte and leaves `hangar/vendor/LKG/mold` frozen.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C2)
- Prior tip: `d0bbf0fd` (anchor of M-audit-early-0036)
- Next: M-audit-early-0038
