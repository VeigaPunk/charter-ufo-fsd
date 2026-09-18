# M-audit-early-0043 — gpt-5.2/.claude retired; chatgpt routes always sol-fast

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
`14d81aef` (18:37:55 -0300; 15 files, +117/−20) executes two operator directives: Claude Code is
retired (the host `~/.claude` tree is "nuked (staged to volatile /tmp, gone on reboot)", the
bootstrapper's default rosters become `~/.config/opencode/agents` + `~/.omp/agent/agents`, and the
claude source branch, `CLAUDE_ROUTE_MAP` and the claude doc reference are removed from
`deps/bootstrapper/the-bootstrapper`, verified here 2 → 0 occurrences), and the first GPT-fallback
pick is `chatgpt/gpt-5.6-luna-fast` in `lanes/registry.yaml` `model_routes`, the bootstrapper
`LIVE_CHAINS`, `config/orchestrator.json` `outside_model_matrix` and the skill model-identity table
as 11 re-propagated SKILL.md seats (11 counted in the diff); the walk artifact
`docs/artifacts/2026-08-28-seating-sighting-walk.md` is created here, recording both directives
under divergences. `b3c29ab9` (18:56:45; 25 files, +87/−87) reverts that pick under operator
correction — "luna-fast was the wrong GPT pick" — to the sol family as of this SHA: depth lanes fall
back to `chatgpt/gpt-5.6-sol` (thinking variant), volume lanes to `chatgpt/gpt-5.6-sol-fast`
(low/fast), scout/distiller primary `gpt-5.6-sol-fast`, and the sekhmet lane (labrat) becomes
`chatgpt/gpt-5.3-codex-spark` at low effort as primary with `gpt-5.6-luna-fast` as fallback; gpt-5.2
is scrubbed from `lanes/registry.yaml`, `config/orchestrator.json`, the cursor catalogs, 11 SKILL.md
seats and 14 further files. `0a695ef2` (19:37:10; 1 file, +1/−1) scrubs what it calls "the last
literal gpt-5.2 string" from the orchestrator matrix note (its body carries only the
`Co-authored-by` trailer — no rationale in-commit), and `251b52d4` (19:39:07; 14 files, +15/−26)
drops the plain-sol depth variant created 42 minutes earlier: "sol-fast is the single chatgpt model
everywhere", i.e. `chatgpt routes are always gpt-5.6-sol-fast`, while the sekhmet lane keeps
codex-spark low primary with luna-fast fallback. The moving parts of the decision were operator-side
(host disk pressure from an uninstalled CLI, and a GPT tier judged wrong), so the commits are route
edits plus a re-propagation sweep rather than a design change.

## Gate
```
for s in 14d81aef b3c29ab9 0a695ef2 251b52d4; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 14d81aef b3c29ab9 0a695ef2 251b52d4
git show --shortstat --format= 14d81aef
git show 14d81aef^:deps/bootstrapper/the-bootstrapper | grep -c CLAUDE_ROUTE_MAP
git show 14d81aef:deps/bootstrapper/the-bootstrapper | grep -c CLAUDE_ROUTE_MAP
git show --name-only --format= 14d81aef | grep -c 'SKILL.md$'
git show --name-status --format= b3c29ab9 | grep -c '^D\b'
git show --name-status --format= b3c29ab9 | wc -l
```
Expected: 4x ok; four subjects verbatim; 15 files changed, 117 insertions(+), 20 deletions(−);
`CLAUDE_ROUTE_MAP` 2 before / 0 after; 11 SKILL.md seats; b3c29ab9 deletes nothing (0 `D` rows in
25).
Actual: observed exactly (2026-09-18, HEAD 4adedde6): 4x ok; subjects as in Touches; "15 files
changed, 117 insertions(+), 20 deletions(-)"; 2; 0; 11; 0; 25.

## Touches
- `14d81aef` Retire .claude and gpt-5.2; GPT fallback is gpt-5.6-luna-fast everywhere — 15 files +117/−20; lanes/registry.yaml, deps/bootstrapper/the-bootstrapper, config/orchestrator.json, docs/artifacts/2026-08-28-seating-sighting-walk.md (new), 11 SKILL.md seats
- `b3c29ab9` Retire gpt-5.2 fully; route GPT lanes to sol variants, sekhmet lane to codex-spark — 25 files +87/−87; lanes/registry.yaml, deps/bootstrapper/the-bootstrapper, config/orchestrator.json, docs/BEHAVIOR-MATRIX.md, docs/artifacts/{2026-08-28-seating-sighting-walk.md,lane-coverage.json}, packages/cursor/{agents/catalog-agentic.json,docs/CURSOR-MODELS.md}, ports/ufo-opencode/*, substrates/{kimi,opencode}/substrate.json, 11 SKILL.md seats
- `0a695ef2` Scrub the last literal gpt-5.2 string from the orchestrator matrix note — 1 file +1/−1; config/orchestrator.json
- `251b52d4` chatgpt routes are always gpt-5.6-sol-fast — 14 files +15/−26; lanes/registry.yaml, deps/bootstrapper/the-bootstrapper, config/orchestrator.json, 11 SKILL.md seats
- Paths: lanes/registry.yaml (model_routes), deps/bootstrapper/the-bootstrapper (LIVE_CHAINS), config/orchestrator.json (outside_model_matrix), packages/cursor/{agents/catalog-agentic.json,docs/CURSOR-MODELS.md}, skills/ufo/SKILL.md + seats, docs/artifacts/2026-08-28-seating-sighting-walk.md

## Out-of-scope
- The L2 agent-roster seating whose SKILL.md seats these commits re-propagate — M-audit-early-0042.
- The gate fixes the walk artifact later carries — M-audit-early-0044; the omp provider pool and the
  grok-4.5 / kimi-k3-max route decisions — M-audit-early-0045.
- The cursor-surface kimi-k3-max ban family (2026-08-25/26) and the cloud->local rebase — earlier
  beats; the 2026-08-29 refocus (`96a4b6b4`) and site ingestion (L0-owned).

## Findings
- Recorded tooling incident, not hidden: `b3c29ab9` — "Incident recorded in the walk artifact: a
  greedy regex mangled the bootstrapper mid-edit; caught by compile-check + drift verification and
  restored from git before re-applying line-scoped." No commit in this cluster reports the mangled
  state as landed.
- Body-vs-diff drift: `b3c29ab9`'s body says the cursor model catalogs "and the two stale
  bootstrapper run artifacts are deleted", but the commit's diff is 25 rows, all `M` — no `D` row
  exists, and `packages/cursor/agents/catalog-agentic.json` / `packages/cursor/docs/CURSOR-MODELS.md`
  are modified in place. The two run artifacts are not deleted by this commit.
- Both routing picks here were short-lived and are superseded: `gpt-5.6-luna-fast` as the GPT
  fallback held 19 minutes (18:37:55 → 18:56:45), the plain-sol `depth` variant held 42 minutes
  (18:56:45 → 19:39:07). The state that survives the day is `251b52d4`'s: chatgpt routes are always
  `gpt-5.6-sol-fast`, sekhmet lane `gpt-5.3-codex-spark` low with `gpt-5.6-luna-fast` fallback.
  Later model churn (grok-4.5 daily lanes, cascade rewrites) belongs to M-audit-early-0045.
- The "last literal gpt-5.2" claim is not singular: `116cfc72` (19:36:37, M-audit-early-0044)
  removes another literal from a `lanes/registry.yaml` prose note 33 seconds earlier
  (`effort_variants: "...; gpt-5.2 is retired everywhere"`), so two commits in the same minute each
  treat their own string as the last.
- `14d81aef` states "zero drift vs registry routes" for 13 routed agents across 3 authenticated
  providers; that count is as of this SHA only and is re-asserted, not re-measured, by the two later
  commits in this cluster.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C8)
- Prior tip: `86a0add1` — anchor of M-audit-early-0042
- Next: M-audit-early-0044
