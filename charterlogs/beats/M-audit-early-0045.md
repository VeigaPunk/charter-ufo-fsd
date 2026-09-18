# M-audit-early-0045 — omp live: four providers, delegation cascades, kimi dropped from cascades

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
`1af2d83e` (20:31:32 -0300; 1 file, +4/−4) turns the lane seated 3h04m earlier into a credentialed
one: the operator's existing OAuth is imported into omp's auth-broker vault via
`omp auth-broker import` (field-shape conversion from the opencode auth.json; `openai-codex` and
`xai-oauth` land live, the import's temp files are destroyed after landing), and the M2 gate is a
real invocation — "a real `omp -p "Reply with exactly one word: hatch"` answered "hatch" with a
session transcript under `~/.omp/agent/sessions/`" while the lane doctor reports judgeId=ufo
`credentialBlocked=false`; no credential material is reproduced anywhere in this beat — the fact of
the import and the provider names are the record. `d7139b52` (20:45:14; 1 file, +1/−1) completes the
provider matrix: `opencode-go` plus `alibaba-token-plan` as three account profiles from the
operator's api-juggling store, each key validated at paste (the flow hides a region prompt that
defeats piped stdin), with the provider's own 429 stating the weekly pool is exhausted until
2026-08-29 23:48 UTC — "the juggling then works without further action". `03b20d42` (21:24:42;
21 files, +31/−23) sets the route posture: grok-4.5 everywhere, on the operator's judgement that it
is "substantially better than 4.6, no context-cost increase after 200k tokens", wired into the
matrix, bootstrapper chains, orchestrator note and the 16 SKILL.md seats; omp's `config.yml`
(`modelRoleStorage: global`) makes default/smol/slow/plan `xai-oauth/grok-4.5` and the advisor
"kimi-k3-max as the wrapped hard-task escalation", with kimi routing ONLY through OAuth (the moonshot
API key was purged from the vault after account suspension) — this UN-BANS kimi-k3-max for this
seat as an OAuth-only wrapped escalation, qualifying the ban recorded in M-audit-early-0027 (repo
example of that ban family: `05ff018d`, 2026-08-26, "cursor surface: ban kimi-k3-max"); the same
commit records that grok pins must carry the `xai-oauth/` prefix because the opencode-go gateway
400s on omp's built-in `web_search` tool name for grok-4.5, and wires burnerchrome dispatch
preference (interactive+CDP for single-use, headless for multi-window fan-out). `292e6b15`
(21:28:36; 1 file, +132) writes the resume artifact `docs/handoffs/2026-08-28-l0-l1-auto-routing.md`
(wwkd data walk from that session's measurements, the L0→L1 tmux dispatch contract, cascade
semantics per lane class, per-L1 file ownership with no overlap, M1–M4 milestones with gates,
honesty invariants and stop rules; L2 routing goes through each substrate's own subagent mechanism).
`6bc44614` (22:28:09; 76 files, +1469/−403) generalizes `lanes/registry.yaml` `model_routes` to
per-class ordered cascades with grok-first heads per the operator burn directive, moving
`deps/bootstrapper` `LIVE_CHAINS` in the same edit (zero drift, 13/13 lanes), and wires each
substrate's native surface with dissected ownership: kimi pool-alias pins with grok as the
Outside-FIRST xask consult, omp modelRoles plus 16-agent cascade pins under the `xai-oauth/` prefix
rule, grok seat pins, cursor dry-labeled `cascade_policy` with the Cloudflare re-arm path documented
(grant-exhausted), codex skills-seat routing notes naming codex-titanium as the codex-class
invocation (stock codex node shim banned by operator directive); operator mid-run amendments are
recorded, not smoothed — opencode paused and cursor stood down, fleet released to its own charter.
`6a1ab01d` (22:32:19; 2 files, +10/−10) applies the night-run charter and drops kimi from every
cascade: the depth head moves from `kimi/kimi-k3-max` to `grok/grok-4.5` with the codex/chatgpt
runner second, the planner chain moves in the same edit, and kimi-k3-max leaves all class cascades
with the history retained in `class_notes` ("NIGHT-RUN DROPPED (operator 2026-08-29). Was OAuth-only
wrapped depth; depth now grok/grok-4.5. Do not route."), verified as zero drift across all 13 lanes.

## Gate
```
for s in 1af2d83e d7139b52 03b20d42 292e6b15 6bc44614 6a1ab01d; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 1af2d83e d7139b52 03b20d42 292e6b15 6bc44614 6a1ab01d
git show --shortstat --format= 1af2d83e
git show 1af2d83e -- substrates/omp/substrate.json | grep -E '^[-+]  "credentialBlocked"'
git show 6a1ab01d^:lanes/registry.yaml | grep -c 'kimi-k3-max'
git show 6a1ab01d:lanes/registry.yaml | grep -c 'kimi-k3-max'
git show 6a1ab01d -- lanes/registry.yaml | grep -E '^[-+].*(depth:|planner:)'
```
Expected: 6x ok; six subjects verbatim; 1 file changed, 4 insertions(+), 4 deletions(−) for the
anchor; `credentialBlocked` true → false; kimi-k3-max presence in the registry falling to the
retained history note only; the depth/planner head swap visible as a diff.
Actual: observed exactly (2026-09-18, HEAD 4adedde6): 6x ok; subjects as in Touches; "1 file changed,
4 insertions(+), 4 deletions(-)"; `-  "credentialBlocked": true,` / `+  "credentialBlocked":
false,`; 4 → 1; and the diff shows `-    depth:     ["kimi/kimi-k3-max", "grok/grok-4.5"]` /
`+    depth:     ["grok/grok-4.5", "chatgpt/gpt-5.6-sol-fast"]` with the planner row moved to
`primary: "grok/grok-4.5"` and `note: "NIGHT kimi DROPPED; depth=grok-4.5"`.

## Touches
- `1af2d83e` omp goes live: auth-broker credentials imported, real invocation verified — 1 file +4/−4; substrates/omp/substrate.json (`credentialBlocked` true→false + live note)
- `d7139b52` Wire all four omp providers: 3-profile alibaba juggling pool in the vault — 1 file +1/−1; substrates/omp/substrate.json (provider matrix note)
- `03b20d42` Gravy-first delegation on omp: grok-4.5 daily lanes, kimi-k3-max wrapped — 21 files +31/−23; lanes/registry.yaml, deps/bootstrapper/the-bootstrapper, config/orchestrator.json, substrates/{omp,burnerchrome}/substrate.json, 16 SKILL.md seats
- `292e6b15` Handoff: L0 kimi -> per-substrate omp L1s, auto-routing with cascades — 1 file +132; docs/handoffs/2026-08-28-l0-l1-auto-routing.md (new)
- `6bc44614` Wire per-substrate model-delegation cascades across the UFO fleet — 76 files +1469/−403; lanes/registry.yaml, deps/bootstrapper/the-bootstrapper, docs/{BEHAVIOR-MATRIX.md,SUPPORTED-SUBSTRATES.md}, docs/artifacts/2026-08-28-{codex,grok,kimi}-auto-routing-walk.md (new) + regenerated artifacts, substrate seat pins
- `6a1ab01d` Drop kimi from every cascade: night-run charter (codex+grok only) — 2 files +10/−10; lanes/registry.yaml, deps/bootstrapper/the-bootstrapper
- Paths: substrates/omp/substrate.json, lanes/registry.yaml (model_routes / class_notes), deps/bootstrapper/the-bootstrapper (LIVE_CHAINS), config/orchestrator.json, docs/handoffs/2026-08-28-l0-l1-auto-routing.md, docs/artifacts/2026-08-28-{codex,grok,kimi}-auto-routing-walk.md

## Out-of-scope
- The un-credentialed wiring of this lane (install, skill seat, argv pin) — M-audit-early-0041; the
  gate closure that lands 12 minutes before this cluster starts — M-audit-early-0044.
- The GPT/sol-fast family and the sekhmet lane's codex-spark pick — M-audit-early-0043; the kimi
  ban beat itself — M-audit-early-0027 (cross-referenced, not re-recorded).
- Other lanes' own auto-routing walks beyond the socket they plug into (per-substrate L1 work);
  the 2026-08-29 refocus (`96a4b6b4`) and site ingestion (L0-owned).

## Findings
- Route decisions here were 2-of-2 operator reversals the same evening: `03b20d42` installs
  `kimi-k3-max` as the omp advisor (wrapped escalation) at 21:24, and `6a1ab01d` removes kimi from
  every cascade at 22:32 — 1h08m. The un-ban at 21:24 is not a repeal of the cursor-surface ban
  recorded in M-audit-early-0027; it is seat-scoped and OAuth-only, and it is itself superseded the
  same night.
- Honest partial states, kept as partial: `1af2d83e` carries the live claim in `credentialBlocked`
  + note while `status` stays `installable-local` (the status-earned rule), and `d7139b52` records
  a quota wall rather than a working quota — the alibaba pool is "exhausted until 2026-08-29 23:48
  UTC per the provider 429 — wiring complete, quota external".
- Credential handling facts only: import went through `omp auth-broker import` with field-shape
  conversion and the import's temp files destroyed; the moonshot API key was purged from the vault
  (account suspended); two providers were operator-pasted through the interactive TUI because
  auth-broker import is OAuth-only. No key, token or vault value appears in any of these commits'
  diffs beyond the provider names.
- `6bc44614` changes 76 files, 71 of them modifications, and states that "the pre-run dirty sweep
  (regenerated evidence artifacts, SKILL.md env-contract tables) rides along, classified in
  .ufo/plans/2026-08-28-l0-data-walk.md" — verdicts and gate transcripts for this commit live under
  the gitignored `.ufo/`, so the repo record for it is the walk artifacts plus that classification.
- Two of the six fleet lanes are stood down in the same commit that wires everyone else: "opencode
  paused and cursor stood down by the operator; fleet released to its own charter (no mothership
  reporting)" — so the 13-lane zero-drift claim is a routing-table claim, not a liveness claim.
- `6a1ab01d`'s registry note is dated 2026-08-29 while the commit is authored 2026-08-28 22:32:19
  -0300: the charter was written for the night spilling into the next date; the beat date here is
  the author date of the anchor, per the beat's own dating rule.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C10)
- Prior tip: `253dfd53` — anchor of M-audit-early-0044
- Next: M-audit-early-0046
