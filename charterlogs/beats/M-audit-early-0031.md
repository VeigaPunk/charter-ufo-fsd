# M-audit-early-0031 — F-C3 concurrency: race classes → repro-backed fixes → declared check

**Status:** COMPLETE | **Date:** 2026-08-27 | **Session:** audit-early

## Does
Five commits over 21 hours escalate one defect family (F-C3 / orch-1071: host-parallel workspace
test and L3-swarm races). `e434b1c6` (02:09:56, parent `f6d7d183`) is the mitigation: one file
(`scripts/gates.sh`, +7/−1) replaces the bare `cargo test --workspace --all-features` with
`_cargo_parallel_exit=0` plus `if ! cargo test --workspace --all-features; then
_cargo_parallel_exit=$?; echo "F-C3-MITIGATION: retrying serially after parallel failure ...";
cargo test --workspace --all-features -- --test-threads=1; fi`; its subject carries the rule the
rest of the day depends on — "runner must be a git object for the gate-evidence-reproducible
stamp". `1f24ae34` (12:53:59, 10 files +365/−66) closes the code-race subclasses: `cfg(test)
work_root()` returns a per-PID-unique root (Class O, cross-process dump/WWKD-plan race on a
shared cwd work-root) and `LAUNCH_ENV_LOCK` serializes the three tests mutating process-global
`XBREED_LAUNCH_*` env (Class X); the repro is stated in the body — pre-fix "94/100
concurrent-triple rounds red with the exact 'BLOCKED: l3-swarm stale — this-run token ... not in
...' signature; post-fix: 100/100 green on identical shapes", and 5/62 → 200/200 for Class X. It
also repairs a silent probe no-op ("fc3-serial-probe.sh orch-dry-swarm was a silent no-op (filter
matched a helper fn name, 0 tests); now runs the 4 real dump-seating tests"). `103dd1fe`
(20:45:25, 6 files +190/−5) is the same retry doctrine applied to raw spawn: transient
`EAGAIN`/`WouldBlock` from `command.spawn()` under fleet fork saturation was surfacing as
`host_kind "error"` in `l3_swarm::tests::pack_mock_executes_dry_argv`/`hung_mock_times_out_and_degrades`,
so `spawn_with_eagain_retry` is seated at five bounded run sites (`ufo-core-runtime/src/{l3_swarm,live,probe,bounded_fixture}.rs`,
`ufo-control-plane/src/l3_swarm.rs`). `d069c8c3` (22:26:16, 6 files +7/−1) removes five zero-byte
probe artifacts whose presence made the coherence scan fail deterministically in both modes, and
fixes the mis-recorded exit status in the retry block. `cdb85f46` (23:10:30, 1 file +28/−12)
converts the retry pair into a declared check — `_fc3_cargo_gate()` registered as
`check "cargo workspace all-features F-C3 serial-retry contract"`, emitting greppable
`F-C3-RECORD: parallel GREEN serial_retry=none` / `... -> serial GREEN (flake recorded, not
erased)` / `... -> serial FAIL exit N (hard red, not a host flake)` and returning 1 on hard red
instead of dying mid-suite under implicit `set -e` — and dedupes the exact-duplicate
`check "xbgst-kimi FRAMEWORK"` name for index coherence. Decision reasoning, where the change was
a decision: outcome visibility over mitigation speed — a retry that cannot be seen in the
transcript is not evidence, so the retry becomes an index-named check whose both outcomes are
machine-readable.

## Gate
```
for s in e434b1c6 1f24ae34 103dd1fe d069c8c3 cdb85f46; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git show --shortstat --no-walk --pretty="%h %s" e434b1c6
git show e434b1c6 -- scripts/gates.sh | grep -n 'if ! cargo'
git show -s --format=%B 1f24ae34 | grep -n '94/100'
git show -s --format=%B d069c8c3 | grep -n 'parallel exit 0'
git show cdb85f46 -- scripts/gates.sh | grep -n -e 'F-C3-RECORD' -e 'serial-retry contract'
git cat-file -t 26c429cf; git cat-file -e 26c429cf^{commit}; echo "commit-deref exit=$?"
git rev-parse 103dd1fe:scripts/gates.sh
```
Expected: five `ok`; `1 file changed, 7 insertions(+), 1 deletion(-)`; the `if ! cargo` line
present; the 94/100 pre-fix line present in `1f24ae34`'s body; the "negated status as
'parallel exit 0'" line present in `d069c8c3`'s body; `F-C3-RECORD` and the declared check name
present in `cdb85f46`'s diff; `26c429cf` is a **blob** and fails `^{commit}` dereference;
`103dd1fe:scripts/gates.sh` resolves to the same 40-hex blob.
Actual: observed exactly as expected (2026-09-18, HEAD `4adedde6`): 5x `ok`; `1 file changed,
7 insertions(+), 1 deletion(-)`; `+if ! cargo test --workspace --all-features; then`;
`Pre-fix repro: 94/100 concurrent-triple rounds red with the exact`; `negated status as 'parallel
exit 0' for real failures`; `+  local _serial_exit=0` … `+check "cargo workspace all-features
F-C3 serial-retry contract" _fc3_cargo_gate`; `blob` / `error: 26c429cf^{commit}: expected commit
type, but the object dereferences to blob type` / `commit-deref exit=128`;
`26c429cf5f2ce68e25380197b79eeb41017783d9`.

## Touches
- `e434b1c6` gates: F-C3 mitigation — serial retry after parallel workspace test failure (local commit; runner must be a git object for the gate-evidence-reproducible stamp) — 1 file +7/−1 (`scripts/gates.sh`); parent `f6d7d183`
- `1f24ae34` fix(fc3): close F-C3 code-race subclasses — repro-backed (seat6 gen4) — 10 files +365/−66 (`crates/ufo-runtime/src/{bounded_process,l3,orchestrator,spawn,xask}.rs`, `crates/xbreed/src/launch.rs`, `scripts/fc3-serial-probe.sh`, `scripts/test-fc3-serial-probe.sh`)
- `103dd1fe` fix(fc3): retry transient EAGAIN spawn in bounded runners — repro-backed (l3_swarm exit-101 gates flakes) — 6 files +190/−5 (`crates/ufo-core-runtime/src/{l3_swarm,live,probe,bounded_fixture}.rs`, `crates/ufo-control-plane/src/l3_swarm.rs`, `evidence/fc3-l3-swarm-spawn-retry.json`)
- `d069c8c3` fix(gates): untrack 5 empty probe JSON artifacts (coherence EOF) + capture true cargo parallel exit in F-C3 retry — 6 files +7/−1 (5 deletions under `docs/artifacts/`, `scripts/gates.sh`)
- `cdb85f46` fc3-concurrency (seat4 gen30): gates.sh F-C3 retry block becomes a declared check with recorded outcomes — parallel exit captured AND consumed; serial-retry failure sets fail=1 (completed transcript + GATES FAILED) instead of mid-suite errexit death; flake-with-serial-green emits greppable F-C3-RECORD; dedupe exact-duplicate 'xbgst-kimi FRAMEWORK' check name (index coherence for the bidirectional declared-set gate). Re-applied+durable after seat-7 7f00603e commit race over the 02:04Z worktree edit. Runner change: two-pass gates-record obligation stands for gates seats (pre-seeded by poisoned 39/147 PRIOR at 26c429cf, assert rc=1 before this edit too). Local commit, no Origin push — 1 file +28/−12 (`scripts/gates.sh`); parent `f65bc149`
- Paths: `scripts/gates.sh` (all five), `scripts/fc3-serial-probe.sh`, `scripts/test-fc3-serial-probe.sh`, `evidence/fc3-l3-swarm-spawn-retry.json`, `crates/ufo-runtime/src/*`, `crates/ufo-core-runtime/src/*`, `crates/ufo-control-plane/src/l3_swarm.rs`, `crates/xbreed/src/launch.rs`

## Out-of-scope
- The gates-green surface those checks register into (runner closure as git objects, reroute
  ledgers, mirror-drift gate, fail-closed `judge_wave`) — M-audit-early-0032.
- The `7f00603e` side of the commit race (mirror-drift gate, SRC-PARTIAL 65→119) —
  M-audit-early-0032; here it is cited only as the concurrent writer.
- The `26c429cf` blob's second life as the C5 evidence `runnerSha` — M-audit-early-0034.
- The F-C finding-series origin (08-26 filings F-C2..F-C7, gate-attribution fixes) —
  M-audit-early-0021; the 08-28 hung-tmux isolation that keeps F-C3 OPEN — M-audit-early-0038.
- Churn rejections from the scout report (`11de9153`, `a668f48f`, `f65bc149`) — no beat claimed.
- Site ingestion (L0-owned) and the sibling window (audit-late).

## Findings
- **Honest failure 1 — negated-status evidence bug.** `e434b1c6` wrote `if ! cargo test ...; then
  _cargo_parallel_exit=$?`, so the negation overwrote the status and every genuinely failed
  parallel pass was transcribed as "parallel exit 0". `d069c8c3` fixes it in place and states it:
  "gates.sh F-C3 retry recorded the negated status as 'parallel exit 0' for real failures", with
  the code comment "`$?` must be read inside the else-branch: under `if ! cmd` the negation
  overwrites the status and the transcript would claim "parallel exit 0" for a genuinely failed
  parallel pass (evidence-honesty bug, seat5 gen28)". Between 02:09 and 22:26 the retry
  transcript could not distinguish a flake from a real failure.
- **Honest failure 2 — re-apply after a same-file race.** `cdb85f46`'s own body: "Re-applied
  +durable after seat-7 7f00603e commit race over the 02:04Z worktree edit" — the worktree edit
  lost to a sibling commit and had to be re-landed. Same-day same-file concurrency hazard
  (cross-ref M-audit-early-0032).
- **`26c429cf` is a blob, not a commit.** `git cat-file -t 26c429cf` = `blob`;
  `git cat-file -e 26c429cf^{commit}` fails (exit 128); it is exactly
  `103dd1fe:scripts/gates.sh` (`26c429cf5f2ce68e25380197b79eeb41017783d9`). `cdb85f46`'s message
  names it as a runner ("poisoned 39/147 PRIOR at 26c429cf") and the C5 evidence records it as
  `runnerSha`; both refer to a file revision, not a commit.
- **Fast-forward note.** `e434b1c6`'s parent is `f6d7d183` (the beat-0030 landing), so the F-C3
  chain branches from the same morning state; `cdb85f46`'s parent is `f65bc149`, the numeric-floor
  commit the scout rejected as churn — the F-C3 re-apply landed on top of it.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-aug27-report.md` (C2)
- Prior tip: `f6d7d183` — anchor of M-audit-early-0030
- Next: M-audit-early-0032
