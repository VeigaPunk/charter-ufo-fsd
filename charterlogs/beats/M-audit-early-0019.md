# M-audit-early-0019 — Refuse invented or undeclared runtime values

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
Twenty-eight commits (2026-08-26 02:36:08 → 18:43:58 UTC) remove the runtime's ability to be told
facts it did not measure. `d04eec26` rejects NaN and ±Inf before Pareto comparison on the Python,
TypeScript and Rust dual-runtime gates, with verdict `rejected_malformed`; the decision recorded
there is explicit about the residue — it "kills M-R1-NON-FINITE; M-REASON-PROSE and M-AXIS-ORDER
stay honest survivors", so no full mutation kill rate is claimed. `58cd16aa` makes roster resolvers
in all three languages fail closed when a mix invents a name not already in the tip catalog,
propose mix or planner wave: mid-run adapt may enable a declared type but may not mint one
(14 files +282). `49388a93` fail-closes TS `kappaAccept` when a stale N-API binding claims
`accepted=true` on a vector the TS Pareto gate rejected, under the rule stated in its body:
"Native may still be stricter; it cannot invent an admit" (2 files +71). The same clamp lands on
the frontier envelope (`8f690d43`), mid-run adapt (`4fe0611b`), specialist roster (`08eb26a8`),
score delta (`1722c10c`), `scoresNearlyEqual` (`96709292`), distilled duplicates (`7d9d3693`), a
Python roster invented by a stale Rust CLI (`2a3fc4e0`) and N-API use at all when the memory
backend is ts-sqlite (`512a68e6`); `098d77ba` refuses ambient `CURSOR_AGENT` as
`cursor_cloud_runtime`. `aff2d130` converts `i64`→`u32` on `events.round` and run counters with
`try_from` and fails integrity, because a damaged or hostile row could otherwise become `u32::MAX`
and still look like a legal hash-chain event. `dc99bcc8` stops the status surface overstating the
Rust floor (README asked 1.98 while Cargo.toml declares 1.85, which is what edition 2024 needs)
and writes the server's three routes down instead of the seven a curl sweep suggests. Provenance
gating clamps implementation scoring: `f0dc89fe` scores 1.0 only for tip-byte provenance,
`d75b83d0` keeps paper-parity LoopDriver from scoring implementation complete, `90b247c6` clamps
under paper-parity provenance; `a0ba6c2c` refuses `SYNTHESIS_READY` from a stub distiller;
`91de49f5`/`424f37a7`/`960195c0`/`7f22ce0c`/`d65ae7cd`/`4eaf0937`/`16fe5ed6` seat evidence-claim
admission and semantic content-assertion; `75f00831` turns the Python root list into a ratchet
instead of a claim; `6322a620` seats the progressive-emphasis Rust twin whose body pins the
declared-κ target and "selfIteration never a score key". Cluster scale peaks at `4eaf0937`
(21 files +1662/−24) and `ae50da71` (20 files +1479/−11, the scaffold `58cd16aa` then closes).

## Gate
```
for s in dc99bcc8 75f00831 f0dc89fe d75b83d0 90b247c6 a0ba6c2c 512a68e6 098d77ba 49388a93 8f690d43 4fe0611b 08eb26a8 7d9d3693 1722c10c 4eaf0937 96709292 16fe5ed6 2a3fc4e0 7f22ce0c d65ae7cd aff2d130 960195c0 424f37a7 ae50da71 58cd16aa d04eec26 91de49f5 6322a620; do git cat-file -e ${s}^{commit} && n=$((n+1)) || echo "MISSING $s"; done; echo ok=$n/28
git log --no-walk --pretty="%h %s" d04eec26 58cd16aa 49388a93 aff2d130 dc99bcc8
git show --shortstat --oneline 4eaf0937 | tail -1
```
Expected: 28/28 resolve; five subjects verbatim as quoted; `4eaf0937` scale reads 21 files
+1662/−24.
Actual: `ok=28/28`; subjects verbatim as quoted; `4eaf0937` → ` 21 files changed, 1662
insertions(+), 24 deletions(-)`. Observed 2026-09-18 at HEAD 4adedde6, no MISSING lines.

## Touches
- `dc99bcc8` Document the status surface and stop overstating the Rust floor — 1 file +25/−1
- `75f00831` Make the Python root list a ratchet instead of a claim — 1 file +53
- `f0dc89fe` fix: score implementation 1.0 only for tip-byte provenance — 1 file +27/−5
- `d75b83d0` Keep paper-parity LoopDriver from scoring implementation complete. — 1 file +5/−1
- `90b247c6` fix: clamp implementation scores under paper-parity provenance — 4 files +99/−25
- `a0ba6c2c` fix: do not emit SYNTHESIS_READY from a stub distiller — 1 file +54/−5
- `512a68e6` fix(orch): skip N-API when memory backend is ts-sqlite — 3 files +32
- `098d77ba` fix: do not treat ambient CURSOR_AGENT as cursor_cloud_runtime — 3 files +54/−28
- `49388a93` fix: do not let stale N-API invent a kappa admit — 2 files +71/−5
- `8f690d43` fix: do not let stale N-API invent a frontier envelope — 2 files +97/−4
- `4fe0611b` fix: do not let stale N-API invent a mid-run adapt — 2 files +113/−4
- `08eb26a8` fix: do not let stale N-API invent a specialist roster — 2 files +158/−27
- `7d9d3693` fix: do not let stale N-API keep distilled duplicates — 2 files +97/−3
- `1722c10c` fix: do not let stale N-API invent a score delta — 2 files +75/−3
- `4eaf0937` feat: offline semantic evaluator content-assertion (M-rho-002) — 21 files +1662/−24
- `96709292` fix: do not let stale N-API invent scoresNearlyEqual — 2 files +72/−3
- `16fe5ed6` feat: seat SRC-PARTIAL honesty, SQLite control-plane choice, local quality review — 24 files +1203/−17
- `2a3fc4e0` fix: do not let stale Rust CLI invent a Python specialist roster — 2 files +141/−7
- `7f22ce0c` seat semantic content-assertion on the Rust control-plane gate — 7 files +79/−3
- `d65ae7cd` fix: do not treat short locators as semantic spam — 3 files +5/−10
- `aff2d130` fix: refuse signed INTEGER wrap on the hash-chained audit plane — 2 files +155/−11
- `960195c0` fix: use evidence_claims in control-plane semantic runtime test — 1 file +2/−7
- `424f37a7` fix: accept evidence: synthetic shape without trailing word-boundary — 12 files +152/−72
- `ae50da71` feat: seat dynamic lane-type scaffold (fail-closed, walk-boundary) — 20 files +1479/−11
- `58cd16aa` Refuse undeclared lane types minted from proposal text. — 14 files +282/−6
- `d04eec26` Reject non-finite κ scores before Pareto comparison. — 9 files +82/−15
- `91de49f5` fix(semantic): admit evidence: stubs and sourced claims — 1 file +25/−13
- `6322a620` feat(rust): seat progressive-emphasis language twin on ufo-control — 11 files +509/−45
- Paths: packages/ufo-core, packages/ufo-orch, packages/xbgst-runtime, crates, scripts/, evidence/, docs/GOAL-STATUS.md

## Out-of-scope
- The dispatch-substrate changes in the same hours (N-A, beat 0018) and hang bounds (N-C, beat 0024):
  this beat covers only values the runtime refuses to accept, not how it dispatches or how long it waits.
- Tree-confined resolution (N-E, beat 0022) — a path climb is an adjacent but distinct refusal class.
- The F-C finding series filings/gate-attribution work (N-G, beat 0021); N-B CLI packaging; N-F portability.
- Churn families CH-TIPDOC, CH-FMT, CH-HANGAR-DENSIFY and the merge/lock/file-mode sweeps the
  residual adjudication rejected; sibling mission window (audit-late) and site ingestion.

## Findings
- Mutation honesty, quoted from `d04eec26`: "This kills M-R1-NON-FINITE; M-REASON-PROSE and
  M-AXIS-ORDER stay honest survivors." Two named survivors, one killed mutant — the beat does not
  claim a full kill rate. The same commit also drops "leftover merge markers from REMAINING.md",
  i.e. an unrelated cleanup ridealong.
- Overstated claims corrected inside the cluster: `49388a93` and `dc99bcc8` are both corrections of
  runtime/status claims already published. `dc99bcc8` states the Rust floor was inflated by the
  build host's toolchain ("the higher number only turns away toolchains that compile it fine") and
  that the status server's route count was wrong in the other direction.
- Seven commits spell the same rule as `fix: do not let stale N-API …` (`49388a93`, `8f690d43`,
  `4fe0611b`, `08eb26a8`, `7d9d3693`, `1722c10c`, `96709292`), each exactly 2 files changed; the
  eighth clamp, `2a3fc4e0`, applies it to a stale Rust CLI inventing a Python roster. `512a68e6`
  is the containment half of the same defect (do not consult the binding at all on a ts-sqlite
  backend).
- As-of framing: `ae50da71` seats the dynamic lane-type scaffold and `58cd16aa` closes it the same
  day — the scaffold is not the end state. Values here are described at their own SHAs, not at HEAD.
- `6322a620` is included for its stated pin ("declared-κ target … selfIteration never a score key"),
  which is the cluster's rule applied to Rust rather than a new admission path.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-residual-report.md` (N-D)
- Prior tip: `4370574f` — anchor of M-audit-early-0018
- Next: M-audit-early-0020
