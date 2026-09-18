# M-audit-early-0021 — F-C finding series F-C2..F-C7: filings, harness, gate-attribution fixes

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
Thirty-seven commits (2026-08-26 00:37:11 → 18:11:56 UTC) are the day's own numbered finding series
and the gate changes it forced. The gate-honesty spine: `140886cc` reports that thirteen
`scripts/assert-*` gates were invoked by no runner (including two added the previous turn whose
gates.sh wiring never reached a commit) while the docs cited
`evidence/gates-iter23-substrate-status.txt`, "whose 292 PASS include 'titanium livepatch semantics'
and 'substrate status earned off-checkout' - checks the committed runner has never contained.
Re-running the committed suite at that tip gives 155 PASS and different phases." Its fix is
mechanical rather than documentary: gates.sh stamps its own blob SHA1 into the transcript, two new
gates make an unrunnable gate and an unattributable transcript impossible
(`assert-gate-reachability.mjs`, `assert-gate-evidence-reproducible.mjs`), and all 16 previously
unreachable or smoke-only gates are wired in (7 files +419). `e881e16f` makes the runner state its
own results — gates.sh emits a GATES-CHECKS-BEGIN/END index from an EXIT trap so a run cut short by
`set -e` still says what it managed to check, the evidence gate compares index to declared check set
in both directions, and exactly one bootstrap check name is excluded so transcripts converge (F-C8;
15 mutations checked in an isolated tree, all killed). `82df8aa0` fixes the convergence flaw in the
other direction: a shell redirect truncated `evidence/gates-current.txt` before the meta gate could
read a complete prior transcript, so `scripts/gates-record.sh` copies the prior complete transcript
and tees internally (second run green, 103 checks, self-check PASS). `d2b443a3` records F-C4's root
cause: gates.sh ran `sync-private-lkg.sh` before the coherence suite, and that sync mirrored
provenance-pinned `ports/` bytes onto `plugins/`, so "a clean tree went in, 'PASS private LKG sync'
printed, and the coherence test failed a few hundred checks later on files the sync had just
rewritten" — the gate suite was re-arming its own failure. Filing content: `b34687ed` files F-C2
(process runtime lost, misattributed and wedged on answers it had); `653a4c2f` files F-C3 open (one
pair run at `9576ad08` crashed two Node processes, rate about one in six full pairs, below the
resolution of every narrower harness, and no fix was picked among plausible mechanisms); `6533e740`
files F-C5 (fail-closed checks reading any run's evidence) with `27a58a81` folding the third instance
in and `8bef54a2` closing leftover gaps in Rust/orch/xbgst CLI; `b2aeb168` files F-C6; `16b65f65`
files F-C7 — five instances of a field, filename or flag stating a property nothing in the tree opens,
"so there is no check to fail". The F-C3 arc proper is harvest-then-correct: `f8925ca8` rules out
dual-SQLite coexistence as the mechanism, `a041940c` adds a reproduction harness that can capture the
crash, `a5463e86` pins Node's fatal-error report dir and stops losing cores to a missing gdb,
`5f3dfa11` tests the collector instead of promising it, and `45d87073` corrects F-C3's own mechanism
claim (one crashed process ran `UFO_MEMORY_BACKEND=ts-sqlite` and never opened the N-API SQLite, so
"holding both builds is not even a shared property of the crashes"; "no core dump" was `ulimit -c 0`)
and publishes `evidence/concurrent-pair-runs.json`. Measures follow: `14207c02` (FC3_RUNS=12, 0
SIGSEGV, `allGreen=false` from non-SIGSEGV flakes), `748f3a1e` (restore the 6/6 allGreen gdb
collector), `47bf3076` (FC3_RUNS=2, 0 SIGSEGV, cargo 685/0 x2), with `b71dcd50`/`648a471b`/`9a280e14`
closing concurrent cargo/npm flake classes explicitly "without greenwashing SIGSEGV" and
`931e4ba4`/`45b87a32`/`11b7b1c8` recording the results. Two audits re-measure published numbers
rather than carrying them: `25e22f38` re-verifies five judged rounds against the first run and
corrects a false claim that no specialist CLI was on PATH; `c891d509` re-audits at that tip
(cargo 449/52→477/54, npm 321/69→342/70, python 108→131, paper anti-patterns 11 gates/13 probes→19/20,
F-C3 rate 1 in 12→1 in 18 pairs) and moves the self-labelled-closed F-C5 filing under Resolved.
`a74899d0` audits the titanium livepatch by what it does rather than who agrees on it, and `fa48fa44`
adds the completion-audit tooling (Prove-regression fail only).

## Gate
```
for s in a6d15b10 42cb0dfd 5001cd52 b34687ed 653a4c2f f8925ca8 a041940c 45d87073 a5463e86 5f3dfa11 fa48fa44 d2b443a3 6533e740 27a58a81 b2aeb168 25e22f38 c891d509 a74899d0 16b65f65 40e920b9 eef5a239 23e347e9 a80a18c6 11b7b1c8 8bef54a2 140886cc e881e16f 82df8aa0 748f3a1e 931e4ba4 45b87a32 b71dcd50 9a280e14 14207c02 648a471b 47bf3076 44b42004 03bf0910 086282a0 7dec000f 7e0678dd 955313c1 9d9566a9 a72095bb b29de3dc b4c6887b c2ee5226 ccefe70e e4d18a89 f7d381f0; do git cat-file -e ${s}^{commit} && n=$((n+1)) || echo "MISSING $s"; done; echo ok=$n/50
git log --no-walk --pretty="%h %s" 140886cc d2b443a3 e881e16f 82df8aa0 16b65f65 a74899d0 25e22f38 c891d509
git show --shortstat --oneline 25e22f38 | tail -1
git show --shortstat --oneline 140886cc | tail -1
```
Expected: 37/37 resolve; eight subjects verbatim as quoted in Touches; `25e22f38` → 14 files
+1401/−1977 and `140886cc` → 7 files +419.
Actual: `ok=37/37`; subjects verbatim as quoted; `25e22f38` → ` 14 files changed, 1401 insertions(+),
1977 deletions(-)`; `140886cc` → ` 7 files changed, 419 insertions(+)`. Observed 2026-09-18 at HEAD
4adedde6, no MISSING lines.
Wave-4 re-run (2026-09-18, HEAD 4adedde6): extended loop printed ok=50/50, no MISSING lines.

## Touches
- `a6d15b10` docs: name the gates that described work instead of doing it — 1 file +36
- `42cb0dfd` Run the fmt gate first instead of after 250 presence gates — 1 file +25/−17
- `5001cd52` Fix critic must-not-judge overlay check (markdown) and re-verify gates. — 4 files +95/−32
- `b34687ed` Record F-C2: the process runtime lost, misattributed, and wedged on answers it had — 1 file +78
- `653a4c2f` Record F-C3 open: a rare SIGSEGV in Node processes holding both SQLite builds — 1 file +66
- `f8925ca8` Rule out dual-SQLite coexistence as the F-C3 mechanism — 2 files +125/−16
- `a041940c` Add an F-C3 reproduction harness that can actually capture the crash — 1 file +89
- `45d87073` Correct F-C3's mechanism claim and publish the concurrent-pair result — 4 files +322/−28
- `a5463e86` F-C3 harness: pin Node's fatal-error report dir and stop losing cores to a missing gdb — 1 file +31/−4
- `5f3dfa11` Test the F-C3 collector instead of promising it, and correct what it collects — 2 files +108/−10
- `fa48fa44` Add ufo audit completion-audit tooling (Prove-regression fail only). — 12 files +1162/−5
- `d2b443a3` Record the F-C4 root cause: the gate suite was re-arming its own failure — 2 files +27/−1
- `6533e740` Record F-C5: fail-closed checks that read any run's evidence — 1 file +67
- `27a58a81` Fold the third F-C5 instance into the finding — 1 file +19/−9
- `b2aeb168` Record F-C6: a fixture blind to a new requirement, and an unsatisfiable refusal — 1 file +74
- `25e22f38` Re-verify five judged rounds, and stop claiming a bare PATH — 14 files +1401/−1977
- `c891d509` Re-audit at this tip, and file the closed finding under Resolved — 3 files +410/−22
- `a74899d0` Audit what the titanium livepatch does, not who agrees on it — 2 files +272
- `16b65f65` File F-C7: status fields, patch names and a --live flag that decided nothing — 1 file +70
- `40e920b9` fix: wire doctrine gates into gates.sh; refresh audit evidence — 7 files +134/−152
- `eef5a239` fix(gates): scope clippy to warn-only and run wave policy via tsx — 2 files +6/−4
- `23e347e9` Restore doctrine gates dropped from gates.sh (iteration 24) — 3 files +37/−26
- `a80a18c6` fix(gates): build TypeScript packages before doctrine probes — 1 file +11
- `11b7b1c8` Record F-C3 6/6 pair repro and iteration 25 goal status — 4 files +32/−20
- `8bef54a2` fix(runtimes): close leftover F-C5 gaps in Rust, orch, and xbgst CLI — 7 files +305/−10
- `140886cc` Make a gate nothing runs impossible, and a transcript attributable to its runner — 7 files +419
- `e881e16f` Have the runner state its own check results, not just print them — 4 files +140/−31
- `82df8aa0` fix: gate-evidence transcript convergence via gates-record.sh — 7 files +74/−32
- `748f3a1e` evidence: restore F-C3 6/6 allGreen gdb collector (revert degraded tip measure) — 1 file +41/−45
- `931e4ba4` docs: record fc3 freshness helper test results — 1 file +3/−2
- `45b87a32` Record armed F-C3 measure and fix fail-note classifier — 7 files +117/−163
- `b71dcd50` fix(fc3): close cargo concurrent flakes without greenwashing SIGSEGV — 17 files +285/−80
- `9a280e14` docs(fc3): record EnvGuard overlay + kill-spawn cargo flake closes — 1 file +11
- `14207c02` evidence: FC3×12 extended measure + fc3-repro @ufo/orch rebuild — 7 files +176/−30
- `648a471b` fix(fc3): pkill -P fallback + isolate npm L3/dual-orch flakes — 18 files +87/−9
- `47bf3076` evidence(fc3): FC3_RUNS=2 sample — 0 SIGSEGV, cargoAllGreen — 4 files +85/−194
- `44b42004` Split flaky targets off red ones, and name the tests that failed — 4 files +174/−24
- `03bf0910` fix(gates): build the ufo-memory binary the memory tests execute — 2 files +19−2; wave-4 fold: gates.sh builds the ufo-memory binary the memory tests execute
- `086282a0` fix(gates): build every run, and refuse to grade a tree that did not compile — 1 file +24−19; wave-4 fold: gates.sh builds every run and refuses to grade a tree that did not compile
- `7dec000f` fix(gates): build @ufo/orch dist before ufo-fsd refusal gate — 1 file +7−32; wave-4 fold: gates.sh builds @ufo/orch dist before the ufo-fsd refusal gate
- `7e0678dd` fix(docs): the outside-cloud instructions named a package that does not exist — 3 files +126−1; wave-4 fold: fixes the outside-cloud instructions and adds scripts/assert-local-install-doc.mjs to gates.sh
- `955313c1` Stop failed TypeScript builds from leaving importable output — 44 files +3583−1520; wave-4 fold: tsc noEmitOnError so a failed TS build stops leaving importable stale output
- `9d9566a9` Record F-C1's mechanism and the concurrent-load result — 3 files +145−46; wave-4 fold: records F-C1’s mechanism and the concurrent-load result (CONFORMANCE-FINDINGS)
- `a72095bb` fix(scripts): add check function definition to gates.sh — 1 file +11−0; wave-4 fold: adds the missing check-function definition to gates.sh
- `b29de3dc` Record the shared control-plane corruption with its reproduction — 1 file +49−4; wave-4 fold: records the shared control-plane corruption with its reproduction (F-C1 filing)
- `b4c6887b` fix(python): make pytest self-installing so gates.sh is reproducible from a fresh clone — 2 files +11−0; wave-4 fold: pytest self-installing so gates.sh is reproducible from a fresh clone
- `c2ee5226` gates: run node and python suites, and let the python CLI test work from a checkout — 3 files +68−0; wave-4 fold: gates.sh runs the node and python suites it never executed
- `ccefe70e` feat: harden core presence, offline L3 mocks, certified-64 host checks — 69 files +2130−98; wave-4 fold: adds .github/workflows/core-presence.yml + core-presence guard, offline L3 mocks, certified-64 host checks; the workflow is dead at HEAD — 0032 narrows scripts/assert-core-presence.sh to the ssot/ godspeed surface, 0046 replaces it with .github/workflows/gates.yml (bash scripts/gates.sh), and 0052 deletes that workflow on the GitHub desync
- `e4d18a89` fix(gates): run the fmt check the docs already promise — 1 file +20−7; wave-4 fold: gates.sh runs the fmt check the docs promise
- `f7d381f0` fix(gates): build TypeScript dist before the gates that execute it — 1 file +23−7; wave-4 fold: gates.sh builds TS dist before the checks that execute it
- Paths: scripts/gates.sh, scripts/gates-record.sh, scripts/assert-gate-reachability.mjs, scripts/assert-gate-evidence-reproducible.mjs, scripts/assert-livepatch-semantics.mjs, evidence/, docs/CONFORMANCE-FINDINGS.md, crates, packages/ufo-orch

## Out-of-scope
- F-C3's fix half (08-27, `e434b1c6` "gates: F-C3 mitigation — serial retry after parallel workspace
  test failure" and the `1f24ae34`/`103dd1fe`/`d069c8c3` family) — M-audit-early-0031; the 08-28
  hung-tmux isolation that leaves F-C3 OPEN — M-audit-early-0038. Distinct clusters; their members
  are not absorbed here.
- The dispatch-substrate cluster (N-A, beat 0018), value refusal (N-D, beat 0019), tree-confined
  resolution (N-E, beat 0022), hang bounds (N-C, beat 0024), CLI packaging (N-B) and portability (N-F).
- Churn families CH-TIPDOC/CH-FMT/CH-HANGAR-DENSIFY and the merge/restore sweeps; sibling mission
  window (audit-late, after 2026-09-10); site ingestion.

## Findings
- The cluster's headline is a misattribution, quoted from `140886cc`: a cited transcript claimed
  "292 PASS" that "include 'titanium livepatch semantics' and 'substrate status earned off-checkout'
  - checks the committed runner has never contained", while "re-running the committed suite at that
  tip gives 155 PASS and different phases". Headline-vs-evidence mismatch, self-reported, and the
  remedy is a gate rather than a note.
- `140886cc` also reports that two gates added the previous turn were never run because "their
  gates.sh wiring never reached a commit" — i.e. the unreachable-gate class was still growing while
  being audited.
- `e881e16f` discloses a convergence hazard it had to carve out: "the bootstrap transcript
  necessarily carries this gate's own failure, since the run producing a transcript judges the
  previous one. That one check name is excluded and nothing broader."
- `82df8aa0` was committed with unresolved conflict markers recorded in its message body
  (`docs/GOAL-AUDIT.md`, `docs/GOAL-STATUS.md`, `docs/artifacts/goal-audit-latest.json`,
  `evidence/gates-current.txt`) — the commit landed with the conflict trailer in `%B`.
- `d2b443a3` states the failure mode plainly: "The drift returned within minutes of each repair,
  which is not how a human ping-pong behaves", and names the mechanism (gates.sh runs
  `sync-private-lkg.sh` before the coherence suite).
- `a74899d0` is the strongest single falsification in the cluster: replacing the LKG patch with an
  empty diff and re-syncing "keeps every gate green while the KNOWN-BEST-CLI pin … is gone", because
  hangar-parity compared copies against a reference living in the same tree. Its replacement gate
  reads diff bodies and fails seven hand-built mutations.
- `45d87073` corrects the cluster's own earlier claim: the F-C3 title had blamed "Node test processes
  that hold both SQLite builds", but one of the two crashed processes ran `ts-sqlite` and never
  opened the N-API SQLite; the "no core dump" inference was wrong because `ulimit -c 0` discarded
  cores before `core_pattern` was consulted.
- `c891d509` corrects a bookkeeping claim that changed a count: CONFORMANCE-FINDINGS filed F-C5
  under "## Open" while its own first line read "Closed, three instances", so "anyone counting open
  findings from the headings got two where there is one".
- Superseded-soon facts: the F-C3 measures in this cluster are samples (`14207c02` 12 runs,
  `47bf3076` 2 runs), not a closed rate; the finding stays open at this tip. `25e22f38`'s corrected
  PATH claim ("~/.local/bin/xask IS the real crates/xbreed/scripts/xask protocol script") is a
  correction of the earlier "no specialist CLI is on PATH" line, not a liveness claim — the honest
  boundary it names is that vendor OAuth is absent.
- One cited commit does not resolve in this repository: `c891d509`'s body says the audit was
  re-verified "at 25e22f38 rather than carried forward from aeb71032", and `aeb71032` is not an
  object here (`git cat-file -e aeb71032` fails). Recorded as observed; the re-verification target
  itself resolves.
- Wave-4 coverage remediation: 13 member(s) folded from the mis-adjudicated F8-GATES, F9-ORCH and F11-DOCS rejection(s) (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-residual-report.md` (N-G)
- Prior tip: `1718dbc4` — anchor of M-audit-early-0020
- Next: M-audit-early-0022
