# M-audit-early-0006 — npm workspace identity: @ufo/orch rename, project references

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
`046e9cbb` (18:15:15 +0000, 24 files +61/-19) is the identity decision: `packages/core` becomes
`packages/ufo-orch` under the name `@ufo/orch` — `R096 packages/core/package.json ->
packages/ufo-orch/package.json` and `R100` for `src/{frontier,godspeed,index,judge,kappa,memory,
orchestrator,planner,specialists,types}.ts`, `test/{kappa,orchestrator}.test.ts` and
`tsconfig.json` — while `packages/cli`, `README.md`, the root `package.json` and six
`substrates/*/substrate.json` manifests are repointed; the subject carries the reason: "Rename
full orch package to @ufo/orch to avoid colliding with @ufo/core." The composite project
reference for `@ufo/cli` is then toggled twice inside 65 seconds — `efe4bd43` (18:16:14, 1 file
+1/-2) "Drop composite project reference so @ufo/cli builds cleanly." and `a7afa2c7` (18:17:19,
1 file +1) "fix: enable composite orch project reference" — with `f4adacea` (18:30:37, 2 files
+15) reconciling the shared type contracts afterwards, `58941bb3` (2 files +1/-1) fixing the
portable CLI typecheck, `1c7a0697` (3 files +3) fixing Node type configuration, and `906bf38b`
(18:39:28, 1 file +1) accepting registry.yaml 1.1 and restoring the `packages/*` workspaces.
The workspace enumeration is fixed at `935157cd` (21:09:50, 1 file +1), replacing a hand-listed
four — "The root test script named @ufo/core, @ufo/orch, @ufo/cli and @ufo/xbgst-runtime one at a
time, so a workspace added later runs its tests nowhere until someone remembers this line" — with
`--workspaces --if-present`. Three independent broken-workspace repairs land the same evening:
`6e3ff5e9` (18:43:44, 26 files +280/-972), `7dc37864` (18:53:04, 10 files +515/-222) and
`fcf7536d` (20:02:40, 8 files +374/-10) — 9m20s, then 69m36s apart, 78m56s end to end; the brief's
"three repairs in 19 minutes" does not survive the timestamps (Findings). Three one-line
TypeScript build-metadata refreshes (`49809265`, `ccc487b8`, `8b36b1ed`) ride along.

## Gate
```
for s in 046e9cbb 1c7a0697 49809265 58941bb3 6e3ff5e9 7dc37864 8b36b1ed 906bf38b \
         935157cd a7afa2c7 ccc487b8 efe4bd43 f4adacea fcf7536d; do
  git cat-file -e ${s}^{commit} && echo "$s ok"
done
git log --no-walk --pretty='%h %ad %s' --date=iso 6e3ff5e9 7dc37864 fcf7536d
git log --no-walk --pretty='%h %at' 6e3ff5e9 7dc37864 fcf7536d
git show --name-status --format= 046e9cbb | head -3
git show --name-status --format= 7dc37864
```
Expected: 14x `ok`; the three repairs at 18:43:44 / 18:53:04 / 20:02:40 +0000 with epoch deltas
560 s and 4176 s (78m56s total, not 19 minutes); `046e9cbb` opening with the `packages/core` ->
`packages/ufo-orch` renames; `7dc37864` deleting three files under `packages/ufo-core/`.
Actual: observed 2026-09-18 at HEAD `4adedde6` — 14 lines `ok`; the three timestamps above (author time
zone +0000); deltas `560` and `4176`; `R096 packages/core/package.json ->
packages/ufo-orch/package.json`; `7dc37864` = `D packages/ufo-core/src/frontier.ts`,
`D packages/ufo-core/src/kappa.ts`, `D packages/ufo-core/test/kappa.test.ts`, plus
`A packages/xbgst-runtime/src/empirical.ts` and `A packages/xbgst-runtime/src/skills-seat.ts`.

## Touches
- `046e9cbb` Rename full orch package to @ufo/orch to avoid colliding with @ufo/core. — anchor, 24 files +61/-19 (`R096`/`R100` renames `packages/core` -> `packages/ufo-orch`)
- `efe4bd43` Drop composite project reference so @ufo/cli builds cleanly. — 1 file +1/-2
- `a7afa2c7` fix: enable composite orch project reference — 1 file +1
- `58941bb3` fix portable CLI node typecheck — 2 files +1/-1
- `1c7a0697` fix workspace Node type configuration — 3 files +3
- `49809265` refresh workspace TypeScript build metadata — 1 file +1/-1
- `ccc487b8` refresh orchestrator TypeScript build metadata — 1 file +1/-1
- `8b36b1ed` refresh orchestrator TypeScript build metadata — 1 file +1/-1
- `f4adacea` fix orchestrator shared type contracts — 2 files +15
- `906bf38b` Accept registry.yaml 1.1 and restore packages/* workspaces. — 1 file +1
- `6e3ff5e9` Repair npm workspace: extract @ufo/core pattern layer, enforce non-Gemini model policy — 26 files +280/-972 (pattern layer moves to packages/ufo-core, packages/ufo-orch/src/model-policy.ts, packages/xbgst-runtime retired)
- `7dc37864` Fix broken npm build: reconcile @ufo/orch generations, author two missing modules — 10 files +515/-222
- `fcf7536d` unbreak the node workspace: duplicate package name, and a test importing dist — 8 files +374/-10
- `935157cd` test: let npm enumerate the workspaces instead of hand-listing four — 1 file +1
- Paths: package.json, package-lock.json, packages/*/package.json, packages/ufo-orch/{src,test,tsconfig.json}, packages/ufo-core/{src,test,tsconfig.json}, packages/cli/*, packages/xbgst-runtime/src/*, substrates/*/substrate.json, substrates/ufo-fsd/*, docs/CHARTER-CLI-MAP.md, docs/SELF-AUDIT.md, overlay/ufo-fsd/arming.json, .gitignore

## Out-of-scope
- The lane fork and the layout choice that produced these two package trees — M-audit-early-0002.
- The Cargo workspace seating of the Rust runtime — M-audit-early-0003.
- The portable-pack and charter-CLI portability members of the same day — M-audit-early-0004, and
  the doctrine/registry declaration they build on — M-audit-early-0005.
- The control-plane schema unification and dual-runtime collapse — M-audit-early-0009.
- Lockfile refreshes (F1-LOCK: `87b76a5c`, `0d163782`, …) and generated TypeScript build
  metadata hygiene (F12-HYGIENE: `14aebe49`) as families — mechanical, accounted in the mission
  result report; the three single-line tsbuildinfo refreshes inside this cluster are listed only
  as cluster members.
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- The briefed frame "three repairs in 19 minutes" does not hold. Author timestamps (+0000):
  `6e3ff5e9` 18:43:44, `7dc37864` 18:53:04, `fcf7536d` 20:02:40 — 560 s between the first two,
  4176 s before the third, 4736 s (78m56s) end to end. The densest three-commit run of workspace
  repairs on this day is `906bf38b` 18:39:28 -> `6e3ff5e9` 18:43:44 -> `7dc37864` 18:53:04, i.e.
  13m36s. The honest failure stands; the duration in the brief does not.
- `7dc37864` partially reverts `6e3ff5e9`: 9m20s after `6e3ff5e9` moves the pattern layer
  (`frontier.ts`, `kappa.ts`, `test/kappa.test.ts`) into `packages/ufo-core/` with `R100`
  renames, `7dc37864` deletes those three paths from `packages/ufo-core/` and restores the lost
  members in `packages/ufo-orch/src/types.ts`. The extraction and its rollback are both in the
  same hour.
- `7dc37864` states the build was broken by absent history, not by a coding error:
  "packages/xbgst-runtime imported ./skills-seat.js and ./empirical.js, which were never
  committed in any revision. Author both."
- `fcf7536d` states the workspace would not even resolve: "`npm install` and `npm test` both
  refused to run at all. Two packages claimed the name `@ufo/substrate-ufo-fsd`" — resolved by
  following the existing `substrates/xask` precedent — and that the remaining failure was a test
  importing a build output: "dist/ is a build output that is not committed, so that test could
  only pass on a machine that had happened to run `npm run build` first". Its result line: "Node
  suite: 150 passing, 0 failing, across four workspaces."
- `6e3ff5e9` makes the model policy a runtime check rather than a document: the Gemini ban is
  "now a runtime check on every seat instead of a docs claim, and is recorded in run artifacts
  for audit", and the pattern layer is extracted "so the gate cannot take a dependency on the
  orchestration it constrains".
- Project-reference churn is measurable: `efe4bd43` (18:16:14) drops the composite reference and
  `a7afa2c7` (18:17:19) re-enables it, 65 seconds apart, both at 1 file.
- Path currency: at HEAD `4adedde6`, `packages/ufo-orch`, `packages/xbgst-runtime`,
  `substrates/ufo-fsd` and `packages/substrate-ufo-fsd` return 0 entries from
  `git ls-tree -r HEAD`; `packages/ufo-core` returns 20. The package identity above is stated as
  of its own SHAs.
- Collision ruling applied: `6e3ff5e9` is documented here; M-audit-early-0004 cross-references it.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-init-report.md` (C4)
- Prior tip: `226de348` — anchor of M-audit-early-0005
- Next: M-audit-early-0007
