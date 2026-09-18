# M-audit-early-0036 — Overnight cursor-identity/availability evidence wave

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
The 00:14–00:42 (-0300) overnight wave turns the cursor seat's identity claims into executable
evidence and makes the seat-7 charter-parity review resumable. `9b9a2829` (00:14:01, 6 files
+38/−2) sets executable mode (100644→100755) on `install.sh`, `scripts/sync-catalog-from-xask.sh`
and `tests/test-identity.sh` in the plugins and ports cursor copies, and replaces the loose
`--model composer-2.5` grep with a token parser that fails unless argv's `--model` value is exactly
`composer-2.5-fast`, plus a negative near-match probe so a `composer-2.5` argv cannot pass.
`3e359ef1` (00:16:15, 17 files +18/−18) strips the unbacked availability claim from
operator-facing text: sentinel row `kimi-k3-high` `Ultra gravy` becomes `catalog-listed; account
availability unverified`, and `Cursor Ultra grants` becomes `agentic -p --trust; account
availability unverified`. `237ef6b1` (00:17:13, 3 files +48) gates that wording across
PROTOCOL.md, `agents/catalog-agentic.json`, `scripts/sync-catalog-from-xask.sh`, docs
{CURSOR-MODELS,TUNING,FRAMEWORK,CONFIGURATION}.md and the seated SKILL.md. `d0bbf0fd` (00:18:49,
new `scripts/spawn-l2-seat7-recovery-gen31.sh`, +88) adds the resumable review wave, whose header
carries the operator steer verbatim: "The 429 steer tightens this to <=2 live Token Plan calls per
seat, >=60s stagger, and >=90s cooldown after a 429." `b1c91920` (00:20:21, +6/−1) adds the
fail-closed branch — skip only when the named report already exists — and hardens the Sol prompt
("EXECUTE NOW; returning without the named report is failure"). `60b7c386` (00:21:32, +19/−1)
lands the same executable-mode and exact-token checks in `packages/cursor/tests/test-identity.sh`;
`db5d07d3` (00:23:17, 1 line) extends the review prompt's input list to "commits 9b9a2829,
3e359ef1, 237ef6b1, and 60b7c386" so the review covers the complete stack; `d1e6305d` (00:42:06,
3 files +30/−6) replaces the literal grep with an awk scan that fails only when an
`ultra grants`/`ultra gravy` claim is **not** qualified
("account availability unverified|not a spawn budget|parked|unverified|banned"), and unsets
`XBGST_CURSOR_MODEL`/`UFO_CURSOR_MODEL` around the argv probe so the pin has to be real. Decision
line: the account's availability is not observable from inside the repo, so every claim is labeled
unverified and a missing review report fails the wave rather than passing by absence.

## Gate
```
for s in d0bbf0fd 9b9a2829 3e359ef1 237ef6b1 b1c91920 60b7c386 db5d07d3 d1e6305d; do
  git cat-file -e ${s}^{commit} && echo "$s ok"
done
git log --no-walk --pretty="%h %s" d0bbf0fd 9b9a2829 3e359ef1 237ef6b1 b1c91920 60b7c386 db5d07d3 d1e6305d
git show --shortstat --pretty=%h 3e359ef1
```
Expected: 8x "ok"; subjects exactly as in Touches; `3e359ef1` scale 17 files changed, 18
insertions(+), 18 deletions(-).
Actual (observed 2026-09-18, HEAD 4adedde6): 8x ok. Subjects matched verbatim — `d1e6305d` "Harden
cursor identity evidence gates", `db5d07d3` "Review complete cursor parity stack", `60b7c386`
"Align package cursor identity exactness", `b1c91920` "Fail closed on missing charter review
artifacts", `d0bbf0fd` "Add resumable charter parity review wave", `237ef6b1` "Gate cursor
availability wording", `3e359ef1` "Qualify cursor catalog availability claims", `9b9a2829` "Fix
cursor identity executable and exact-pin checks". `3e359ef1` → " 17 files changed, 18 insertions(+),
18 deletions(-)". The header/prompt strings quoted above were read out of the file diffs, not from
commit bodies (see Findings).

## Touches
- `d0bbf0fd` Add resumable charter parity review wave — `scripts/spawn-l2-seat7-recovery-gen31.sh` (new), 1 file +88
- `9b9a2829` Fix cursor identity executable and exact-pin checks — 6 files +38/−2
- `3e359ef1` Qualify cursor catalog availability claims — 17 files +18/−18
- `237ef6b1` Gate cursor availability wording — 3 files +48
- `b1c91920` Fail closed on missing charter review artifacts — 1 file +6/−1
- `60b7c386` Align package cursor identity exactness — 1 file +19/−1
- `db5d07d3` Review complete cursor parity stack — 1 file +1/−1
- `d1e6305d` Harden cursor identity evidence gates — 3 files +30/−6
- Paths: `packages/cursor/{tests/test-identity.sh,install.sh,scripts/sync-catalog-from-xask.sh,PROTOCOL.md,agents/catalog-agentic.json,docs/CURSOR-MODELS.md,docs/TUNING.md,docs/FRAMEWORK.md,docs/CONFIGURATION.md}`, the seated `SKILL.md` copies under `packages/cursor/{skills,.cursor/skills}`, `plugins/xbgst-cursor/*`, `ports/xbgst-cursor/*`, `scripts/spawn-l2-seat7-recovery-gen31.sh`

## Out-of-scope
- Pre-reboot snapshot, mirror-drift provenance pins and the seat-4 safety routes — next beat
  (M-audit-early-0037).
- Fleet-rollup byte identity/freshness (`ebf44d1f`, `ba3bf3ac`) and the F-C3 hung-tmux work
  (`3abf30bc`, `b5cd361e`, `2c2f1010`) — M-audit-early-0038.
- The rest of 2026-08-28: the 11:24 nuke and handoff directives (0039), the cloud→local rebase
  (0040), omp wiring/live (0041), roster seating (0042), model retirement (0043), gate-family
  closure (0044), cascades (0045).
- The F2 spawn-scaffolding churn family (`scripts/spawn-l2-seat*-recovery-gen*.sh` additions across
  seven commits) and F4 regenerated artifacts — recorded as families in the scout report, not as
  beats.
- Sibling mission audit-late window (2026-08-29→2026-09-08) and site ingestion (L0-owned).

## Findings
- All eight commits are **subject-only**: `git show -s --format=%B` returns the subject line and
  nothing else. Every rationale quoted in this beat therefore comes from file contents (script
  header, Sol prompt string, awk qualifier list), not from commit bodies; the scout report's F3
  note says the same.
- The wave operates on pre-rename surfaces (`plugins/xbgst-cursor`, `ports/xbgst-cursor`,
  `packages/cursor`). The fleet-wide xbgst→ufo rename lands later the same day (`23b209b7`,
  16:10, M-audit-early-0040); paths here are named as of this beat's date, not at HEAD.
- Subject-vs-diff drift inside the cluster: `db5d07d3` "Review complete cursor parity stack" is a
  one-line change — it adds `60b7c386` to the review prompt's commit list. Read alone it looks like
  a completed review; it is the scope edit that makes the review complete.
- The wording gate is deliberately qualifier-based, not ban-based: `d1e6305d` fails on an
  *unqualified* availability claim, so the docs may keep the words as long as they are labeled
  unverified. Nothing in this cluster probes a live cursor account.
- `b1c91920`'s fail-closed branch only guards the final review role (skip when
  `$LD/${TAG}-review-sol.md` is non-empty); the earlier wave roles still re-spawn on re-run, which
  is what makes the wave resumable rather than idempotent.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C1)
- Prior tip: `234a689c` (anchor of M-audit-early-0035)
- Next: M-audit-early-0037
