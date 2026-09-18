# M-audit-early-0047 — charter-scribe: scheduled 6h beat wire to the charter page

**Status:** COMPLETE | **Date:** 2026-08-31 | **Session:** audit-early

## Does
`1cbf9a10` wires the first automated, scheduled cross-repo reporting lane (7 files, +711/−1). A
systemd user timer runs the beat every 6 hours (`OnBootSec=10min`, `OnUnitActiveSec=6h`,
`Persistent=true`, `AccuracySec=60`) against a oneshot service (`TimeoutStartSec=600`, `Nice=10`)
that executes `scripts/charter-scribe/sync.mjs` (+483) with the repository as working directory.
The worker's declared sequence (sync.mjs header) is: collect local ufo-fsd-alpha state (git log for
the last 8h, HEAD, gates tail, loop state — evidence only, never invented); compose the charter
thread-note by firing a `the-scribe` prompt through `grok-web` (CDP port 9222, mode Expert, 240s
wait ceiling, 4000-char prompt cap); on route failure degrade to the deterministic local template
with typed telemetry (four typed causes in code: `grok-web binary missing`, `cdp_down`, non-zero
`grok-web` exit, empty-or-ceiling response); inject/replace one idempotent beat note between
`<!-- charter-scribe-beat:begin -->`/`end` markers in the charter page's index.html; pull `--ff-only`
then commit and push the charter repo; and only after a successful push task the-kimiraikkoner
(`kimi-instant-high`, 120s timeout) with `prompts/kimi-update.prompt.txt` (+17). The decision is
that the reporter is a reporter: it never judges, never pushes ufo-fsd-alpha itself, and never
spawns another orchestrator, and the notifier is gated on the push. Two bounds make model output
safe for an HTML/JS template: the sanitizer allows a fixed tag set (`b`, `i`, `em`, `strong`,
`code`, `br`) and neutralizes `${` so the note cannot break out of the page's template literal;
entry size and subject are capped at 6000 bytes / 160 chars (`scripts/charter-scribe/config.json`,
+30). Telemetry appends to `.ufo/charter-scribe/ledger.jsonl` plus `latest.json`.
`tests/charter-scribe.test.js` (+153) adds six describe blocks (bridge-chatter stripping, HTML
sanitizer, marker injection, kimi prompt rendering, fallback composition, config sanity) and is
appended to `npm run test:portable` in `package.json` — no network, no git, no CDP. The commit
body carries its own live proof, quoted verbatim: "proven live: beat pushed to
VeigaPunk/charter-ufo-fsd (a578f0f), kimi fired, timer-triggered run exit 0; bash scripts/gates.sh
ALL GREEN".

## Gate
```
git cat-file -e 1cbf9a10^{commit} && echo "1cbf9a10 ok"
git log --no-walk --pretty="%h %ad %s" --date=iso 1cbf9a10
git show --shortstat --format= 1cbf9a10 | tail -1
git show 1cbf9a10:scripts/charter-scribe/systemd/charter-scribe.timer | grep OnUnitActiveSec
git show --name-status --format= 1cbf9a10
```
Expected: SHA resolves; subject "wire charter-scribe: 6h the-scribe beat on grok-web ->
charter-ufo-fsd page + kimi instant high" at 2026-08-31 14:31:38 -0300; 7 files, +711/−1;
timer line `OnUnitActiveSec=6h`; all seven files added except `package.json` modified.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): 1cbf9a10 ok;
"1cbf9a10 2026-08-31 14:31:38 -0300 wire charter-scribe: 6h the-scribe beat on grok-web ->
charter-ufo-fsd page + kimi instant high"; "7 files changed, 711 insertions(+), 1 deletion(-)";
`OnUnitActiveSec=6h`; name-status = M package.json + A sync.mjs, config.json,
prompts/kimi-update.prompt.txt, systemd/charter-scribe.{service,timer}, tests/charter-scribe.test.js.

## Touches
- `1cbf9a10` wire charter-scribe: 6h the-scribe beat on grok-web -> charter-ufo-fsd page + kimi instant high — 7 files +711/−1; adds `scripts/charter-scribe/{sync.mjs,config.json,prompts/kimi-update.prompt.txt,systemd/charter-scribe.service,systemd/charter-scribe.timer}`, `tests/charter-scribe.test.js`; modifies `package.json` (`test:portable`)
- Paths: scripts/charter-scribe/sync.mjs, scripts/charter-scribe/config.json, scripts/charter-scribe/prompts/kimi-update.prompt.txt, scripts/charter-scribe/systemd/charter-scribe.timer, scripts/charter-scribe/systemd/charter-scribe.service, tests/charter-scribe.test.js, package.json, .ufo/charter-scribe/ledger.jsonl (runtime, telemetry)

## Out-of-scope
- The routing re-charter two days earlier on 2026-08-29 (`96a4b6b4`, beat M-audit-early-0046) and the
  four-family routing/OAuth re-charter 32 minutes later (`64f2f9ad`, beat M-audit-early-0048).
- The qwen-seat directive campaign (M-audit-early-0049) — the scribe prompt templates are not part
  of it.
- The 09-08 local-only sweep (M-audit-early-0052): the scribe writes to a separate charter repo and
  is not affected by the alpha-repo vendor purge.
- Site ingestion of the pushed charter page and the sibling window (after 2026-09-10) — L0-owned.
- Absolute local paths in `config.json` and the systemd unit (binary, repo, charter-repo locations)
  are deliberately not reproduced here.

## Findings
- The commit body's live proof is self-reported inside the commit: the pushed beat `a578f0f` and
  the timer-triggered exit 0 live in the charter repository, not in this one, so they are quoted as
  the commit's claim and not independently re-verified here (no cross-repo gate was run).
- `config.json` and the systemd service pin absolute local paths for the node binary, the working
  directory, the charter checkout and the grok-web/kimi bridges; the repository therefore carries
  host-specific literals for this lane. Only the repo-relative shapes are cited in this beat
  (public-safety).
- The lane is the mechanism that produces the charter/page beats downstream: later reporting work
  in the sibling window inherits this timer and its degrade contract.
- Trigger phrases are not defined here; `config/ufo.json` `sighting.triggers` (from `96a4b6b4`) is
  the canonical list and the scribe does not consume it.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-late-report.md` (C3)
- Prior tip: `96a4b6b4` (anchor of M-audit-early-0046)
- Next: M-audit-early-0048
