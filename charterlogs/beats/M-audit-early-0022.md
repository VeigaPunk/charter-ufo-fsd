# M-audit-early-0022 — Tree-confined resolution: no checkout/import.meta climb

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
Twelve commits (2026-08-26 03:57:22 → 17:47:55 UTC) make a tree that claims to be judging itself
resolve its fixtures, mocks, policies and agents inside itself. The root commit `d6b4822e` is the
disclosure: `resolveCore` checked two `repoRoot`-relative paths and then fell back to
`createRequire`/`import.meta.resolve`, both of which resolve from the module's own location rather
than from `repoRoot`, so "on any tree without its own copy, the ladder found the developer's monorepo
instead and scored against it" — "a completely empty directory passing three of the four
implementation rungs -- including rung 1, whose id is literally
`the-runtime-under-test-is-the-one-installed-here`, reporting 'imported the membrane from
/workspace/packages/ufo-core/dist/index.js' while judging an empty temp dir". Both fallbacks are now
confined to `repoRoot` and return null outside it; the empty tree scores 0/4 rungs. The rest of the
cluster closes the same climb in each resolution site: `c3e4f4ef` (swarm mock from the work tree
only; portable TS and Python packs must carry `scripts/mock-sekhmet.sh`), `ecd01d5b` (loop fixture,
dropping `Path(__file__).parents[4]` and `import.meta` climbs), `1055be62` (`resolveAgentsDir`,
`resolveStackRoot`, paper-probes `repoRoot` search cwd + explicit `XBGST_ROOT`/`UFO_ROOT` + packaged
`bundled/` only), `cd901009` (napi/rust memory lookup and `findMonorepo` no longer seeded from
`import.meta`; OAuth schema is cwd/env/repoRoot with no parent walk), `d4060e0d` (dual-orch fixture),
`bceedc84` (`l3_mock` default root no longer from `__file__`), `63c4eee9` (loop fixture Py/TS parity:
`CARGO_MANIFEST_DIR`/cwd climb refused), `933a7d74` (four tip mirrors across PaperParity, with the tip
`lib.rs` tip-byte preserved and a ratchet in gates.sh), `8c08da47` (sqlite `policy_ssot` repo-root
candidates and orch kappa default axes), `05501d13` (portable-pack from nested empty or `packRoot`)
and `1035c633` (isolate PATH so a host-installed `~/.local/bin/sekhmet` cannot make absent-host tests
path-dry, and prefer the work-tree mock over a PATH-found one). The decision recorded in the root
commit is that "a core outside repoRoot is not 'installed here' however resolvable it is" — the rung
fails closed rather than silently changing which tree it is talking about.

## Gate
```
for s in d6b4822e 1055be62 8c08da47 63c4eee9 933a7d74 1035c633 bceedc84 d4060e0d cd901009 ecd01d5b c3e4f4ef 05501d13; do git cat-file -e ${s}^{commit} && n=$((n+1)) || echo "MISSING $s"; done; echo ok=$n/12
git log --no-walk --pretty="%h %s" d6b4822e 1055be62 8c08da47 63c4eee9
git show --shortstat --oneline d6b4822e | tail -1
```
Expected: 12/12 resolve; four subjects verbatim as quoted; `d6b4822e` → 1 file +18/−3.
Actual: `ok=12/12`; subjects verbatim as quoted; `d6b4822e` → ` 1 file changed, 18 insertions(+),
3 deletions(-)`. Observed 2026-09-18 at HEAD 4adedde6, no MISSING lines.

## Touches
- `d6b4822e` Confine core resolution to the tree the rung claims to be judging — 1 file +18/−3
- `1055be62` fix(orch): stop import.meta climbs for specialist agent dirs — 6 files +216/−83
- `8c08da47` fix(runtime): sqlite policy and orch kappa must not climb to checkout — 7 files +254/−22
- `63c4eee9` fix(core): refuse loop-fixture checkout climb (Py/TS parity) — 8 files +198/−70
- `933a7d74` fix(core): tip-mirror loop_fixture no-climb across PaperParity mirrors — 13 files +620/−99
- `1035c633` fix(l3): isolate PATH for absent-host; prefer work-tree mock — 4 files +71/−17
- `bceedc84` fix(ufo_core): l3_mock default root must not climb from __file__ — 5 files +190/−16
- `d4060e0d` fix(core): dual-orch fixture must not climb import.meta into /workspace — 4 files +156/−6
- `cd901009` fix(runtime): stop /workspace climbs for memory bins and oauth schema — 8 files +265/−43
- `ecd01d5b` fix(specialists): resolve loop fixture from the work tree only — 6 files +61/−15
- `c3e4f4ef` fix(l3): resolve swarm mock from the work tree only — 12 files +241/−42
- `05501d13` fix(orch): portable-pack must not climb from nested empty or packRoot — 5 files +135/−17
- Paths: packages/ufo-core, packages/ufo-orch, packages/xbgst-runtime, crates, scripts/, fixtures/, evidence/

## Out-of-scope
- The value-refusal cluster (N-D, beat 0019): a climb is a resolution-path defect, an invented value
  is an admission defect; adjacent but not the same rule.
- Dispatch substrate (N-A, beat 0018), hang bounds (N-C, beat 0024), the F-C series (N-G, beat 0021),
  CLI packaging (N-B) and foreign-host portability (N-F, beat 0020) — the portable-pack climb here is
  the resolution half only; pack contents and install proof stay with N-F.
- Churn families CH-TIPDOC/CH-FMT/CH-HANGAR-DENSIFY, merge/restore sweeps, sibling mission window
  (audit-late) and site ingestion.

## Findings
- Self-reported false-pass class, quoted from `d6b4822e`: an empty directory passed three of four
  implementation rungs and the frontier "moved on evidence about a different tree". The commit names
  the rung id it fooled rather than only the mechanism. Its own measured side effect: "npm test -w
  @ufo/xbgst-runtime -> 129 pass, 0 fail (was 128/1)" — the single pre-existing failure was this bug.
- Headline-vs-scope honesty: several members state the remaining hole in the same commit that closes
  one. `1055be62` ends "Parent goal OPEN"; `63c4eee9` "Parent goal stays OPEN"; `933a7d74` "TipByte 12
  and live creds remain OPEN"; `8c08da47` notes "orch_ssot and tip-published probe/live
  CARGO_MANIFEST_DIR left as tests" — i.e. deliberate exceptions, listed as left-open rather than fixed.
- `1035c633` is the counter-case to a naive no-climb rule: the work-tree preference was inverted by a
  host-installed `~/.local/bin/sekhmet` making absent-host tests path-dry, so work-tree resolution had
  to win over PATH resolution rather than merely forbidding climbs.
- As-of framing: these are the same-tree-resolution rules in force on 2026-08-26; later repository
  refocus (`96a4b6b4`, 2026-08-29) removes parts of the surrounding runtime, and nothing here is
  claimed about HEAD paths.
- One member carries an incidental artifact caveat: `c891d509` (beat 0021) later records that a
  paper-anti-pattern invocation depends on `--import tsx` to resolve `packages/ufo-orch/src/kappa.js`;
  that is a loader dependency, not a tree climb, and is recorded there.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-residual-report.md` (N-E)
- Prior tip: `653a4c2f` — anchor of M-audit-early-0021
- Next: M-audit-early-0023
