# M-audit-early-0035 — Parent-harvest finding: 1,982-path probe-noise bucket pushed to Origin

**Status:** COMPLETE | **Date:** 2026-08-27 | **Session:** audit-early

## Does
The commit that closed the day's "avalanche" run shipped a probe-noise quarantine into history.
`234a689c` (22:05:17, single parent `61c36775`) changes 2,280 files / +362,237 / −17,860; of them
2,037 are newly added paths under `docs/artifacts/` (tracked-artifact count 313 → 2,350 at that
revision), and exactly **1,982** of those added paths match the probe-noise classifier globs
(`docs/artifacts/*probe*`, `*test-loop*`, `composer-*`, `connector-r*`, `cursor-*`) — the ADR-003
quarantine bucket, measured first-party here. The same commit deletes two scripts added earlier
the same day (`scripts/test-fc3-serial-probe.sh`, from `1f24ae34`; `scripts/spawn-l2-seat5-recovery-gen7.sh`,
from `db0775b9`), neither of which exists at HEAD. The finding is that this commit was pushed:
the writable Origin's `main` carried `234a689c` as tip (ls-remote/reflog evidence recorded in the
landed doc), and the ancestry half is verified here: `234a689c` is an ancestor of `origin/main`
today, so the noise is in published history and no seat held authority to rewrite it —
the doc records that option 4, "Authorized tmp-Origin history remediation (rewrite + force-update)",
is "outside every seat's standing authority; not performed by any seat this run". The remedy landed
in two commits the same evening: `2dff1ac1` (22:45:31, 10 files +484/−9) adds the `historyAudit`
classifier and guards to the parent-harvest manifest generator, provenance keys `headSha` /
`originMainSha` / `commitsAheadOfOriginMain`, two frozen snapshot twins, and the merged finding doc;
`4db1d80f` (22:55:17, 15 files +956/−90) makes provenance `git -C "$ROOT"`-anchored (a
CWD-independent probe, fixing a false `unknown`), lands the operator-ack contract
(`ACK_PENDING` gates-safe, `PH_REQUIRE_ACK=1` ship-block until `acked:true` and
`historyNoiseBaseline >= trackedProbeNoise`), adds `scripts/assert-no-empty-tracked-artifacts.sh`
for the zero-byte class, and takes its own battery from 8 to 14 (`TESTS_OK`). Decision reasoning,
stated in the finding's own words: the dirty-surface manifest "cannot see committed noise", so a
push ships the bucket regardless of the quarantine — the fix is therefore detection and an
operator gate, not a rewrite.

## Gate
```
for s in 234a689c 2dff1ac1 4db1d80f; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git show --shortstat --no-walk --pretty="%h %s" 234a689c
for r in 61c36775 234a689c d069c8c3 HEAD; do printf '%s ' "$r"; git ls-tree -r --name-only "$r" -- docs/artifacts | wc -l; done
git show --pretty="" --name-only --diff-filter=A 234a689c | grep -Ec '^docs/artifacts/(.*probe.*|.*test-loop.*|composer-.*|connector-r.*|cursor-.*)'
git show --pretty="" --name-status --diff-filter=D 234a689c
git log --no-walk --pretty="%h %p" 234a689c
git merge-base --is-ancestor 234a689c origin/main && echo "234a689c is an ancestor of origin/main"
git show 2dff1ac1:docs/artifacts/parent-harvest-bundles-gen28.md | grep -n -e 'cannot see committed noise' -e 'was FALSE and is retracted' -e 'not performed by any seat'
git grep -n -e 'ACK_PENDING' -e 'PH_REQUIRE_ACK' 4db1d80f -- scripts/assert-parent-harvest-manifest.sh | head -4
```
Expected: three `ok`; 2,280 files / +362,237 / −17,860; the artifact-count series 313 / 2,350 /
2,345 / 191; classifier count 1,982; exactly two deletions; single parent `61c36775`; ancestor
true; the three quoted doc lines present; the ACK lines present.
Actual: observed exactly as expected (2026-09-18, HEAD `4adedde6`): 3x `ok`; `2280 files changed,
362237 insertions(+), 17860 deletions(-)`; `313`, `2350`, `2345`, `191`; `1982`;
`D scripts/spawn-l2-seat5-recovery-gen7.sh`, `D scripts/test-fc3-serial-probe.sh`;
`234a689c 61c36775`; `234a689c is an ancestor of origin/main`; "The dirty-surface manifest cannot
see committed noise.", "The first draft's "tmp Origin untouched / history-local" claim was FALSE
and is retracted.", "outside every seat's standing authority; not performed by any seat this run.";
`74:  print(f"ACK_PENDING: {noise} probe-storm artifacts tracked at HEAD ...")` and
`67:  require = os.environ.get("PH_REQUIRE_ACK") == "1"`.

## Touches
- `234a689c` Tooling rebase + avalanche run closeout (2026-08-27) — 2,280 files +362,237/−17,860; 2,037 added paths under `docs/artifacts/`, of which 1,982 match the probe-noise classifier; deletes `scripts/test-fc3-serial-probe.sh` and `scripts/spawn-l2-seat5-recovery-gen7.sh`; single parent `61c36775`
- `2dff1ac1` parent-harvest gen28 (seat4): history-audit finding — 234a689c committed+pushed 1,982-path probe-noise bucket to tmp Origin; historyAudit exact-classifier + guards + provenance keys; frozen snapshot twins; sol r1 REJECT remediated (rev3 merged doc); gates/battery green; local commit, no Origin push — 10 files +484/−9 (`scripts/{generate,assert,test}-parent-harvest-manifest.sh`, `docs/artifacts/parent-harvest-bundles-gen28.md`, two `docs/artifacts/parent-harvest-snapshot-*.json` twins, `NEXT.md`, `handoff.json`, `scripts/spawn-l2-seat4-recovery-gen28.sh`)
- `4db1d80f` parent-harvest (seat4 gen28): ROOT-anchored provenance + operator-ack contract (ACK_PENDING gates-safe / PH_REQUIRE_ACK ship-block) + exact-glob historyAudit + battery observe-only fix 8->14 + gates wiring + gen28 ship-readiness doc — local commit, no Origin push — 15 files +956/−90; adds `scripts/assert-no-empty-tracked-artifacts.sh`, `scripts/test-assert-no-empty-tracked-artifacts.sh`, `scripts/test-gates-record-atomic.sh`, `evidence/fc3-{parallel-repro-latest,serial-probe-latest}.json`
- Paths: `scripts/{generate,assert,test}-parent-harvest-manifest.sh`, `scripts/assert-no-empty-tracked-artifacts.sh`, `docs/artifacts/parent-harvest-bundles-gen28.md`, `docs/artifacts/parent-harvest-snapshot-*.json`, `docs/artifacts/*probe*`, `docs/artifacts/*test-loop*`, `docs/artifacts/composer-*`, `docs/artifacts/connector-r*`, `docs/artifacts/cursor-*`, `.ufo/local-dispatch/parent-harvest-operator-ack.json`, `scripts/gates.sh`, `scripts/dev-verify.sh`

## Out-of-scope
- The consumer of this contract, the beat that inherits the noise-detection rules — later in the
  window; the 08-27 side is these three commits only.
- The five zero-byte probe artifacts untracked by `d069c8c3` (a tip-cleanup step, part of
  M-audit-early-0031's commit set) — cited here only as the count series `2,350 → 2,345`.
- The 2026-08-29 refocus mass deletion that leaves `docs/artifacts/` at 191 paths —
  M-audit-early-0046; the count is cited as measured, not as this beat's work.
- The F-C3 script churn in `234a689c`'s deletions (M-audit-early-0031's family) — recorded as a
  Finding only.
- Site ingestion (L0-owned) and the sibling window (audit-late).

## Findings
- **The anchor is the failure.** `234a689c` is the single 08-27 commit whose own message claims a
  push ("Fleet evidence from the 24h run + the offpeak avalanche ... included per repo convention"),
  and it is the one that shipped the 1,982-path bucket. Every other 08-27 commit states "local
  commit, no Origin push".
- **Measured, not taken on trust.** The 1,982 figure is the doc's claim and is reproducible first-party
  (`git show --pretty="" --name-only --diff-filter=A 234a689c | grep -Ec '<classifier globs>'` = 1,982);
  the count series 313 → 2,350 → 2,345 → 191 is likewise measured per revision, and any "noise at
  tip" statement is only meaningful with its revision named.
- **A false posture was recorded and retracted.** The first draft of the finding claimed "tmp
  Origin untouched / history-local"; sol r1 REJECTed it. The landed doc states it verbatim: "The
  first draft's "tmp Origin untouched / history-local" claim was FALSE and is retracted." — and
  replaces it with the ls-remote/reflog-backed statement plus computed
  `commitsAheadOfOriginMain`. The related sol-F1 defect (provenance published a false `unknown`
  because it was not CWD-anchored) is fixed in `4db1d80f` by `git -C "$ROOT"` anchoring.
- **No history rewrite.** Option 4 (rewrite + force-update) was documented with target and effect
  separated and explicitly not performed by any seat; the operator-ack contract
  (`ACK_PENDING` observe-only vs `PH_REQUIRE_ACK=1` ship-block, with a monotonic
  `historyNoiseBaseline` budget) is the chosen remedy in its place. As of this beat the bucket
  remains in published history.
- **Collateral: two fresh scripts deleted.** The same commit removed
  `scripts/test-fc3-serial-probe.sh` (added 12:53 by `1f24ae34`) and
  `scripts/spawn-l2-seat5-recovery-gen7.sh` (added 20:04 by `db0775b9`); neither exists at HEAD and
  neither was re-added. Note the sibling file `scripts/fc3-serial-probe.sh` is a different path and
  survives (modified later by `4db1d80f`).
- **Self-declared scope.** The finding's doc states "No Origin push by this lane. No history
  rewrite. ... Parent goal OPEN" — the remedy commits are local; the failure they describe is not.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-aug27-report.md` (C6)
- Prior tip: `61c36775` — anchor of M-audit-early-0034
- Next: M-audit-early-0036
