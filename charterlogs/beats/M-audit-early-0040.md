# M-audit-early-0040 — ufo seated single L1 skill fleet-wide; xbgst disabled; cloud→local rebase

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
`23b209b7` (16:10:54, 7719 files +217241/−130495) is the fleet's re-charter. It authors
`skills/ufo/SKILL.md` as the SSoT — "godspeed frame, wwkd stance, judged round loop,
degrade-never-die, honesty brake, I10 local-first" — plus the vendored run-logic contract, JSON
schemas, protocol references and role briefs, and seats it with byte parity on kimi, codex, cursor
(`packages/cursor/skills` and `packages/cursor/.cursor/skills`), opencode, grok and the desk surface
(`overlay/ufo-fsd`, "mustNotJudge kept"). It renames the xbgst trees fleet-wide
(`ports/xbgst-*`→`ports/ufo-*`, `plugins/xbgst-*`→`plugins/ufo-*`,
`runtime/xbgst-stack`→`runtime/ufo-stack`, `packages/xbgst-runtime`→`packages/ufo-runtime`) with
argv builders emitting `/ufo`, `$ufo` or `ufo`, and sweeps manifests, hooks, agents and configs to
ufo. The rebase itself is quoted: "Cloud->local rebase: orchestrator crowns ufo (model local),
cloud seats, token-plan routing, and the sekhmet L3 tier removed with justification; fleet routes
through local lane CLIs; bootstrapper wraps the in-repo scanner (deps/bootstrapper)." Its validation
paragraph claims "zero-xbgst battery across active wiring; 7 lane doctors judgeId=ufo; substrate-runtime 44/44; ufo-runtime 273/274; adapter tests 17/17; self-iter 38/38; fsd 19 passed +
sim PASS; cargo clean on all six adapters" — the single `ufo-runtime` red is unexplained in the
body. `3fe03f5a` (16:17:24, 8 files +96/−102) re-syncs the public lane mirrors and makes the pin
check offline-first: "a pin mismatch against a remote that no longer exists (renamed/unpublished
public repo) now reports skipped with the offline mirror kept, instead of a hard violation.
Reachable remote with different bytes stays a violation." `cff52e40` (16:40:56, 5 files +224/−194)
logs the landing on the charter site with a receipt: "the full local rebase — one ufo skill seated
as L1 on every charter CLI, xbgst unwired to zero active matches, configs rebased off the cloud —
landed on plazir27 in a single Kimi session after grok, codex, and a qwen x deepseek mix could not
fully land it", with `docs/charter-ufo-fsd/receipts/2026-08-28-plazir27-kimi-local-landing.png`
attached and the en locale plus `.receipt` style added. `a696ac03` (11:08:13, 1 file +239) is the
compile-time landing record of the same run, written while the fleet was halted; it is a pre-nuke
document — committed two minutes before `853cedaf` and invalidated 16 minutes later by `c34f3666`
(see Findings and M-audit-early-0039). Decision line (quoted from `23b209b7`): the fleet runs one
skill stack with ufo upstream and routes through local lane CLIs, so cloud seats, token-plan routing
and the sekhmet L3 tier are removed rather than kept dormant.

## Gate
```
for s in 23b209b7 3fe03f5a cff52e40 a696ac03; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 23b209b7 3fe03f5a cff52e40 a696ac03
git show --shortstat --pretty=%h 23b209b7
git show --no-renames --name-status --format= 23b209b7 | grep -E "skills/ufo/SKILL.md" | head -20
git ls-tree -r cff52e40 --name-only | grep receipts
git show HEAD:docs/ufo-fsd-alpha-landing-compilation-20260828.md | grep -n -A5 "Superseded"
```
Expected: 4x "ok"; subjects verbatim; `23b209b7` scale 7719 files/+217241/−130495; the ufo skill
seated on each substrate tree; the landing receipt present at `cff52e40`; a "Superseded 2026-09-11"
block on the landing compilation at HEAD.
Actual (2026-09-18, HEAD 4adedde6): 4x ok; subjects matched — `cff52e40` "charter site: log the
plazir27 local landing with receipt", `3fe03f5a` "Re-sync public lane mirrors; offline-first check
for gone remotes", `23b209b7` "Seat ufo as the single L1 skill fleet-wide; disable xbgst; rebase
cloud->local", `a696ac03` "docs(landing): compilation of the 2026-08-28 run — 17 tasks x [had to do
/ got done / needs doing], family-aggregated, proof-pointed"; shortstat " 7719 files changed, 217241
insertions(+), 130495 deletions(-)"; 20 seat paths observed under `packages/{codex,cursor,grok,kimi,
opencode}/skills/ufo/`, `packages/cursor/.cursor/skills/ufo/`, `overlay/ufo-fsd/skills/ufo/` plus
the substrate `hangar/lkg-mirror` and `upstream` mirrors; the receipt resolves at `cff52e40`; the
banner at HEAD reads "**Superseded 2026-09-11.** This is a dated 2026-08-28 compile-time record. The
're-runnable now' proof commands and NEEDS DOING queue below name the deleted tree
(`packages/substrate-omp/install.sh`, `scripts/dispatch-l2-local.sh`, `ports/ufo-omp`,
`scripts/test-substrate-omp-verbs.sh`, `ufo_core` — removed 2026-08-29, `96a4b6b4`) and a halted
grok-fleet state that no longer exists."

## Touches
- `23b209b7` Seat ufo as the single L1 skill fleet-wide; disable xbgst; rebase cloud->local — 7719 files +217241/−130495
- `3fe03f5a` Re-sync public lane mirrors; offline-first check for gone remotes — `scripts/sync-public-lane-mirrors.mjs` + `docs/artifacts/public-lkg/lane-mirrors.{json,md}` + hangar mirror copies, 8 files +96/−102
- `cff52e40` charter site: log the plazir27 local landing with receipt — `docs/charter-ufo-fsd/{README.md,index.html,locales/en.json,style.css}` + `docs/charter-ufo-fsd/receipts/2026-08-28-plazir27-kimi-local-landing.png` (new), 5 files +224/−194
- `a696ac03` docs(landing): compilation of the 2026-08-28 run — 17 tasks x [had to do / got done / needs doing], family-aggregated, proof-pointed — 1 file +239 (exact path in Findings)
- Paths: `skills/ufo/SKILL.md` + its seats under `packages/{kimi,codex,cursor,opencode,grok}/skills/ufo`, `packages/cursor/.cursor/skills/ufo`, `overlay/ufo-fsd/skills/ufo` and the substrate `hangar/lkg-mirror`/`upstream` mirrors; renamed `ports/ufo-*`, `runtime/ufo-stack`, `packages/ufo-runtime`; `lanes/registry.yaml`, `adapters/registry.json`, `config/{orchestrator.json,orchestrator.toml,skill-pack.json}`; `docs/ufo-fsd-alpha-landing-compilation-<date>.md`

## Out-of-scope
- The wrong-referent nuke and the handoff directives that precede this rebase — previous beat
  (M-audit-early-0039).
- `omp` wired as the sixth charter CLI (M-audit-early-0041), the roster seating and tool policy
  (0042), model retirement (0043), the gate-family closure including the five gates this seating
  itself broke (0044), and the delegation cascades (0045).
- The 11-seat SKILL.md byte-parity re-propagation commits (F1 family) that follow: they are counted
  inside their parent clusters, not here.
- Later purges that change the paths named here (2026-08-29 `96a4b6b4`; 2026-09-08 vendor purge
  `59d49b1a`) and the sibling audit-late window; site ingestion is L0-owned.

## Findings
- Superseded-soon fact: the landing compilation `docs/ufo-fsd-alpha-landing-compilation-20260828.md`
  carries a "**Superseded 2026-09-11**" block at HEAD naming a tree deleted 2026-08-29 by
  `96a4b6b4`; its last touch is `cb388b72` (2026-09-12). It was already partly wrong when written:
  it was committed at 11:08:13, two minutes before the oh-my-posh port and 16 minutes before the
  nuke that deleted that work, so its "GOT DONE" rows for `omp` describe a port that no longer
  existed by mid-day; `handoff.json` `ompNuke` later listed a correction block there (see
  M-audit-early-0039).
- Headline-vs-evidence gap carried forward, not flattened: `23b209b7` reports "ufo-runtime 273/274"
  alongside "self-iter 38/38" and explains neither the single red nor the mix. The evening's gate
  work classifies the remaining reds and the five gates this seating broke (M-audit-early-0044, whose
  body states "Five were caused by the single-SSoT seating itself and are fixed here").
- The rebase is a local-only landing at this point: the compilation records fleet state "halted. 0
  active seats, 0 model processes" and "9 commits ahead of `origin/main`, 0 pushed"; `cff52e40`
  receipts the operator-surface landing rather than a published release.
- `3fe03f5a` is a deliberate loosening with a bounded edge: absent remote ⇒ skipped with the offline
  mirror kept, reachable remote with different bytes ⇒ still a violation. Its body also notes that
  the hangar public-mirror copies intentionally carried pre-rename upstream bytes "until the operator
  republishes the public repos".
- The `a696ac03` file's provenance table is the day's evidence index (run ledger, L0 continuation
  heartbeat, git state, per-seat evidence + rollup); read as-of 2026-08-28, not against HEAD.
- Paths in Touches are named as of this commit; the renamed trees are re-purged later (see
  Out-of-scope), so no path here should be read as a current-HEAD claim.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C5)
- Prior tip: `853cedaf` (anchor of M-audit-early-0039)
- Next: M-audit-early-0041
