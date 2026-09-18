# M-audit-early-0032 — Gates-green axis: runner closure as git objects, fail-closed judge

**Status:** COMPLETE | **Date:** 2026-08-27 | **Session:** audit-early

## Does
Six commits move the gate surface itself. `db0775b9` (20:04:09, 13 files +623/−12) adds the seat
runner plus kimi-dispatch and reroute-ledger gates: new `config/reroute-ledger.schema.json`,
`scripts/assert-reroute-ledgers.mjs`, `scripts/dispatch-kimi-local.sh`,
`scripts/test-dispatch-kimi-local.sh`, `scripts/reap-stale-gates-wrappers.sh`,
`scripts/test-reap-stale-gates-wrappers.sh`, edits to `scripts/gates.sh`/`scripts/gates-record.sh`,
and xbgst-cursor tip→mirror parity across the three `skills/xbgst-cursor/SKILL.md` copies plus
`.cursor/skills/xbgst-cursor/SKILL.md`. `c52217ea` (11:43:29) is lockfile-only —
`package-lock.json` +426 — but changed real build behavior: its body records that cloud build
`bld-20260827-09ab7181` failed `INSTALL_FAILED` because `npm ci` required a lock entry for
workspace pack `@ufo/xbreed-team-slash@0.1.0`, so it is mapped rather than rejected as a
lockfile refresh. `22fe29ab` (20:26:33, 3 files +112/−9) states the rule the axis rests on —
"Runner must be a git object for the gate-evidence-reproducible stamp (precedent `e434b1c6`)":
`scripts/gates-record.sh` gains a fleet flock on `.ufo/gates-record.lock` plus stale-wrapper and
zombie reap, `scripts/assert-core-presence.sh` is narrowed to the canonical `ssot/` godspeed
trilogy, `scripts/dev-verify.sh` wires `assert-parent-harvest-manifest.sh` (closing a
gate-reachability orphan), and `scripts/gates-converge.sh` is added. `9eb308a1` (20:26:12,
5 files +367/−38) rebases the composed frontier and makes `judge_wave` fail closed: empty and
partial score vectors are rejected as `RejectMalformed` with no baseline backfill of missing
observations, direction-aware `compose_admitted` folded in (frozen baseline, union of compatible
survivors), default lanes luna volume / sol review, round.rs initialization and serde tests.
`6b5cdf52` (23:02:14, 4 files +406/−4) wires the Prompt-3 TP `usage_limit` reroute ladder into
`scripts/dispatch-l2-local.sh` with hermetic drills (`scripts/test-l2-reroute-ladder.sh`,
`scripts/test-dispatch-l2-reroute.sh`) beside the reroute-ledger schema `db0775b9` added. `7f00603e` (23:09:06, 7 files +438/−3) adds the mirror-fill
drift gate `scripts/assert-mirror-fill-drift.mjs` + `scripts/test-mirror-fill-drift.sh`
(classes sync/additive-tests/tip-shape/tip-vendored, count map 9/2/1/6 in
`docs/artifacts/mirror-fill-drift.json`), and corrects the SRC-PARTIAL measurement — a measured
fix, not a claim: `ports/ufo-core-runtime/SRC-PARTIAL.json` goes from
`"cargo test -p ufo-core-runtime --lib (65 passed)"` to `"(119 passed, 0 failed)"` with
`testsMeasuredAt`/`testsMeasuredBy` added. Decision reasoning, where the change was a decision:
a gate that cannot name its runner cannot be reproduced, and a judge that backfills missing
observations is not judging — so runner deps become tracked git objects and `judge_wave` refuses
malformed score vectors outright.

## Gate
```
for s in db0775b9 c52217ea 22fe29ab 9eb308a1 6b5cdf52 7f00603e; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git show --shortstat --no-walk --pretty="%h %s" 7f00603e
git show --pretty="" --name-status 22fe29ab                                  # own diff = 3 files
git show --pretty="" --name-status db0775b9 | grep -c '^A'                   # added runner deps
git show 7f00603e -- ports/ufo-core-runtime/SRC-PARTIAL.json | grep -n -e '119 passed' -e 'testsMeasuredAt'
git show 7f00603e:docs/artifacts/mirror-fill-drift.json | head -14
git show -s --format=%B 9eb308a1 | grep -n 'RejectMalformed'
git show -s --format=%B c52217ea | grep -n 'bld-20260827-09ab7181'
```
Expected: six `ok`; `7 files changed, 438 insertions(+), 3 deletions(-)`; `22fe29ab`'s own diff
is 3 files; `db0775b9` adds 7 paths; the SRC-PARTIAL hunk shows `119 passed, 0 failed` and
`testsMeasuredAt`; the drift artifact opens with `ok/kind/generatedAt` and a `counts` map;
`RejectMalformed` present in `9eb308a1`; the cloud build id present in `c52217ea`.
Actual: observed exactly as expected (2026-09-18, HEAD `4adedde6`): 6x `ok`; `7 files changed,
438 insertions(+), 3 deletions(-)`; `M scripts/assert-core-presence.sh`, `M scripts/dev-verify.sh`,
`A scripts/gates-converge.sh`; `7`; `-"tests": "cargo test -p ufo-core-runtime --lib (65 passed)"`
/ `+"tests": "cargo test -p ufo-core-runtime --lib (119 passed, 0 failed)"` /
`+"testsMeasuredAt": "2026-08-28T02:00Z"`; `"ok": true, "kind": "mirror-fill-drift", "counts":
{"sync": 9, "additive-tests": 2, "tip-shape-divergence": 1, "tip-vendored": 6}`; `judge_wave
rejects empty and partial score vectors as RejectMalformed`; `Cloud Agent build
bld-20260827-09ab7181 failed INSTALL_FAILED`.

## Touches
- `db0775b9` gates: seat runner + kimi-dispatch/reroute-ledger gates; xbgst-cursor tip->mirror parity (seat6 gen27 gates-green) — 13 files +623/−12; adds `config/reroute-ledger.schema.json`, `scripts/{assert-reroute-ledgers.mjs,dispatch-kimi-local.sh,test-dispatch-kimi-local.sh,reap-stale-gates-wrappers.sh,test-reap-stale-gates-wrappers.sh,spawn-l2-seat5-recovery-gen7.sh}`
- `c52217ea` fix: add xbreed-team-slash to package-lock for npm ci — 1 file +426 (`package-lock.json`); unblocks the failed cloud build id recorded in its body (see Does)
- `22fe29ab` gates: seat runner closure as git objects (seat6 gen27, gates-green axis) — 3 files +112/−9 (`scripts/assert-core-presence.sh`, `scripts/dev-verify.sh`, `scripts/gates-converge.sh`)
- `9eb308a1` core-runtime: composed-frontier rebase + fail-closed judge_wave (seat6 gen27, gates-green axis) — 5 files +367/−38 (`crates/ufo-core-runtime/src/{gate,lane_overlay,loop_driver,round}.rs`, `crates/ufo-control-plane/src/lib.rs`)
- `6b5cdf52` feat(l2): Prompt-3 TP usage_limit reroute ladder + hermetic drills (seat 6 gen 30, local commit no Origin push) — 4 files +406/−4 (`scripts/dispatch-l2-local.sh`, `scripts/test-l2-reroute-ladder.sh`, `scripts/test-dispatch-l2-reroute.sh`, `scripts/verify-swarm-reroute-battery.sh`)
- `7f00603e` crates-mirror-truth (seat7 gen30): drift gate assert-mirror-fill-drift (sync/additive-tests/tip-shape/tip-vendored) 8/8 battery + SRC-PARTIAL 65->119 measured fix + gates wiring hunk-split + gen30 wave driver + NEXT delta — local commit, no Origin push — 7 files +438/−3 (`scripts/assert-mirror-fill-drift.mjs`, `scripts/test-mirror-fill-drift.sh`, `docs/artifacts/mirror-fill-drift.json`, `ports/ufo-core-runtime/SRC-PARTIAL.json`, `scripts/gates.sh`, `scripts/spawn-l2-seat7-recovery-gen30.sh`, `NEXT.md`)
- Paths: `scripts/{gates.sh,gates-record.sh,gates-converge.sh,dev-verify.sh,assert-core-presence.sh}`, `config/reroute-ledger.schema.json`, `crates/ufo-core-runtime/src/{gate,lane_overlay,loop_driver,round}.rs`, `crates/ufo-control-plane/src/lib.rs`, `docs/artifacts/mirror-fill-drift.json`, `ports/ufo-core-runtime/SRC-PARTIAL.json`, `package-lock.json`

## Out-of-scope
- The F-C3 retry chain that the declared checks extend (`e434b1c6` … `cdb85f46`) —
  M-audit-early-0031; cited here only through `22fe29ab`'s stated precedent.
- The cursor pin migration in the same three trees (`c5efe7ff` family) — M-audit-early-0033.
- The parent-harvest ship-manifest gate `22fe29ab` wires (`assert-parent-harvest-manifest.sh`) —
  M-audit-early-0035.
- Churn rejections from the scout report (`11de9153`, `a668f48f`, `f65bc149`) and the
  post-08-27 mirror-drift continuation (`e71d9f9b`, `70c1fc5b`) — M-audit-early-0044 territory.
- Site ingestion (L0-owned) and the sibling window (audit-late).

## Findings
- **Claim/diff drift in `22fe29ab`.** Its body bullet reads "untracked runner deps now tracked:
  `assert-reroute-ledgers.mjs`, `dispatch-kimi-local.sh`, `test-dispatch-kimi-local.sh`,
  `gates-converge.sh`, `reap-stale-gates-wrappers.sh`", but its own diff is 3 files
  (`scripts/assert-core-presence.sh`, `scripts/dev-verify.sh`, `scripts/gates-converge.sh`) — only
  `gates-converge.sh` appears in both. The other four are in fact tracked by its predecessor
  `db0775b9` (7 added paths). Low severity, no evidence consequence: the commit narrative
  overstates its own payload by attributing its predecessor's additions to itself.
- **`c52217ea` is a cure, not a regression.** It records a real failed cloud build
  (`bld-20260827-09ab7181`, `INSTALL_FAILED`) and is lockfile-only by construction; mapped rather
  than rejected as a lockfile-churn family member for that reason.
- **`7f00603e` is the concurrent writer on the other side of a same-file race.** It is the commit
  whose race over the 02:04Z worktree edit forced `cdb85f46` (M-audit-early-0031) to re-apply.
- **The 08-27 day is one linear chain, not six disjoint families.** Cluster boundaries here are
  thematic: `db0775b9`'s parent is `1f24ae34` and `c52217ea`'s parent is `e434b1c6` (both
  beat-0031 members), while `22fe29ab`'s parent (`5f88e4e0`) and `9eb308a1`'s parent (`3700bd77`)
  are beat-0033 members.
- **`7f00603e`'s `SRC-PARTIAL` change is a measured correction, and the measurement is dated
  08-28** (`testsMeasuredAt: 2026-08-28T02:00Z`, `testsMeasuredBy` seat7 recovery gen30) even
  though the commit's author date is 2026-08-27 23:09:06 — the estate was still writing into
  08-28 while the commit clock read 08-27.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-aug27-report.md` (C3)
- Prior tip: `e434b1c6` — anchor of M-audit-early-0031
- Next: M-audit-early-0033
