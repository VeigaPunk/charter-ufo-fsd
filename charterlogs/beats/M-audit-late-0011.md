# M-audit-late-0011 — Checkpoint: repo debloat + dispatcher spawn-close fix + ufo pack P0/P1 (2026-09-15 re-charter landed)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for commit fbfd8767 (2026-09-17 13:32 -0300), "checkpoint: debloat + dispatcher spawn-close fix + ufo pack P0/P1": a three-part checkpoint. The debloat removes the historical `docs/artifacts/**` evidence corpus — whole commit 2435 files, +14475/-342148, of which 2158 are `docs/artifacts/` deletions — leaving `docs/EVIDENCE-INDEX.md` as the citation index in place of the retained dump. P0 stages the improvement pack at `docs/advisory/2026-09-17-ufo-improvement-pack/` (`00-work-order.md`, specs 00-16, `DECISIONS.md`; decisions D1a/D2a/D3a/D4a/D5b recorded; a five-lane data walk integrated at `.ufo/pack-datawalk/datawalk-report.md`, which is gitignored and therefore not in the commit; 10 spec corrections applied). P1 (spec 01 + A-01) lands the implementation: the `sighting-surface-v1` verb plus a `surfaceDigest` sync gate, steer-control hash-only logging, tick heartbeat with `freshness_ping`/`heartbeat_stale`, a `wall_probe` stage 0 in `scripts/gates.sh`, `textMaxBytes` unified at 4096, and the tick timeout floor promoted into `config/ufo.json`; the commit body records "Gates 20/20" (attributed to the body, not re-run here). The same commit carries the 2026-09-15 operator re-charter in `config/ufo.json` (`omp-native-v1.modelRoutes`, line 104): main plus the thinking seats critic/revenger/reviewer/connector/sentinel on `devin/swe-2:max` (empty fallbacks), planner on `alibaba-token-plan/qwen3.8-max:xhigh` (2026-09-16 amendment), distiller on `alibaba-token-plan/deepseek-v4.1-flash:high`, and scout/executor/labrat/mutation-tester/simplifier/scribe on `alibaba-token-plan/deepseek-v4.1-flash:max`, with no advisor entry (advisor disabled per the routing log).
Why: the re-charter supersedes the 2026-09-12 seat flatten and the same-day flash-main interlude, restoring a split policy — Devin SWE-2 for Main and the thinking seats, Token Plan deepseek-v4.1-flash chains for distiller and mechanical seats — in place of the swe-everywhere-only interval.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' fbfd8767
```
Expected: commit resolves; subject `checkpoint: debloat + dispatcher spawn-close fix + ufo pack P0/P1`; dated 2026-09-17.
Actual:
```
fbfd87674ad8cd9a11cce3775c0506c766ce9cb8|2026-09-17 13:32:22 -0300|checkpoint: debloat + dispatcher spawn-close fix + ufo pack P0/P1
```

## Touches
- fbfd87674ad8cd9a11cce3775c0506c766ce9cb8 — 2435 files, +14475/-342148. Key paths: `docs/artifacts/**` (2158 deletions), `docs/advisory/2026-09-17-ufo-improvement-pack/**` (new: `00-work-order.md`, `01-sighting-surface-and-tick.md`, `02-dispatch-deadlines-and-atomicity.md` … `16-amendments-to-specs-00-09.md`, `DECISIONS.md`), `config/ufo.json`, `scripts/gates.sh`, `scripts/ufo-sighting` + `scripts/ufo-sighting.mjs`, `skills/ufo/SKILL.md` + `skills/ufo/references/run-logic.md` and every packaged mirror (`.cursor/`, `.omp/`, `packages/{codex,cursor,devin,grok,kimi,opencode,substrate-omp}/…`), `docs/EVIDENCE-INDEX.md`, `docs/L2-L3-ROUTING.md`
- `config/ufo.json` — re-charter bytes verified at this commit via `git show fbfd8767:config/ufo.json | grep -B2 -A16 '"modelRoutes"'`: canonical `omp-native-v1.modelRoutes` (line 104) carries the provider-qualified pins listed in Does; a second `modelRoutes` block (line 279) sits inside the `devin-native-v1` profile and carries bare names (`swe-2-max`)
- `config/ufo.json` line 19 — `sighting.surfaceDigest` = `sha256:6decb091…` present in the committed bytes, corroborating the P1 surfaceDigest gate
- `docs/L2-L3-ROUTING.md` — line 375 dated entry `2026-09-15 (operator re-charter superseding the 2026-09-12 seat flatten and the same-day flash-main interlude)`; line 3 header declares the file a handwritten projection "Current as of 2026-09-15"

## Out-of-scope
- Beat M-audit-late-0010 cluster (6a7baf71, 7831cea7) and earlier — sibling beats
- Beat M-audit-late-0012 cluster (7f08c003) and later, including whether pack specs 03-16 were implemented (they land in the P-cluster beats 0013-0024)
- Re-running `scripts/gates.sh`, drills, or `cargo` (mission constraint); the "Gates 20/20" line is attributed to the commit body
- Untracked `.ufo/` working state (pack data-walk report, mission snapshots) beyond the path named in the commit body

## Findings
- Debloat scale measured from real git output at this commit: `git show --stat fbfd8767` → `2435 files changed, 14475 insertions(+), 342148 deletions(-)`; `git show --name-status fbfd8767` → 2229 deletions repo-wide, of which 2158 are under `docs/artifacts/` and 7 under `uploads/`. The dossier's "2145 docs/artifacts evidence files" figure did not reproduce: `--name-status` deletions under `docs/artifacts/` number 2158, and pure-deletion files (zero insertions, `--numstat`) under that prefix number 2157. The measured value is 2158.
- The flash-main interlude is doc-recorded only, never landed: `git log --oneline -S'"main": "alibaba-token-plan/deepseek-v4.1-flash' -- config/ufo.json` returns no commit, and `config/ufo.json` at both the prior tip 7831cea7 and at fbfd8767 carries `"main": "devin/swe-2:max"`. It survives only as the superseded-interlude phrase in the 2026-09-15 routing entry.
- The 2026-09-15 entry records the 2026-09-16 planner amendment (`alibaba-token-plan/qwen3.8-max:xhigh`, `[]`) as "the only deviation from this table"; the committed bytes at fbfd8767 match that reading, and the entry's mechanical-seat fallback lists extend the config pins (`devin/deepseek-v4-1-flash:high`, `xai-oauth/grok-4.5:low`, `devin/swe-2:max`).
- Advisor: routing-log line 3 records the advisor as DISABLED and absent from `omp-native-v1`, and the canonical `modelRoutes` block at this commit contains no advisor key.
- `docs/EVIDENCE-INDEX.md` is retained and self-describes as historical ("Historical — 2026-08-25"; 2026-09-11 capacity evidence indexed in its second half) — a citation index, not a fresh verdict.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 7831cea715fbe3b02b929a082f634e693fded1aa
- Next: M-audit-late-0012
