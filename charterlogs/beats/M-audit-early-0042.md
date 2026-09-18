# M-audit-early-0042 — ufo agent roster seated as single L2 SSoT; ufo-sighting; tool policy

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
`86a0add1` (18:02:37 -0300; 429 files, +11602/−11788) collapses L2 to one roster: `agents/` is now
the agent SSoT with 16 ufo-format agents (the 11 core lanes plus planner, revenger, janitor,
musketeer, bootstrapper "converted from the registry-referenced the-* files"), landed through 19
renames (`agents/the-planner.md`→`agents/planner.md`, `the-revenger.md`→`revenger.md`,
`the-janitor.md`→`janitor.md`, `packages/ufo-orch/bundled/plugins/ufo-stack/agents/the-musketeer.md`→
`agents/musketeer.md`, `agents/the-bootstrapper.agent.md`→`bootstrapper.md`), 225 deletions that
clear the xbgst `the-*` roster from `agents/`, all `ports/`, `plugins/`, `packages/` seats, bundled
distribution payloads and the `deps/agents` fallback root, and 159 additions that seat the ufo
roster in those same places; `lanes/registry.yaml` and the ufo-control-plane `include_str!` paths
resolve the renamed files, and `skills/ufo/SKILL.md` "plus every byte-identical seat" now names the
mandatory Round 0 `planner` spawn. The decision was single-SSoT-over-per-substrate-rosters, with
host surfaces receiving copies (kimi via `extra_skill_dirs`/`extra_agent_dirs` in
`~/.kimi-code/config.toml`, where "the previous entries were stranded under a
[models.k3-max.overrides] table header and never applied"; opencode gets the 16 agents + `ufo.md`
in `~/.config/opencode/agents`, replacing its xbgst roster; `~/.grok/agents` is synced) while
"Codex and omp expose no measured file-based agent surface … and are documented as skills-only
seats". `d5794dd4` (18:31:24; 30 files, +1447/−4) extends the roster to omp in omp's discovered
subagent schema (frontmatter `name`/`description`/`ufo`, no `tools:` frontmatter so children
inherit the full parent surface) as 16 files under `packages/substrate-omp/agents` with the host
copy at `~/.omp/agent/agents`, deliberately omitting model pins — "omp has zero authenticated
providers until the operator completes `omp /login`, and dead pins are worse than host flags" —
adds `scripts/ufo-sighting.sh`, which replaces the ad-hoc wall tail session ("its tmux scrollback
grew to 20.5 GB") with ONE tmux session, one window per ufo L1 (kimi, codex, cursor, opencode,
grok, omp) tailing `.ufo/sighting/<substrate>.log` with `history-limit` hard-bounded at 1000 and
fed by a best-effort never-throwing hook in `packages/substrate-runtime/src/lane-cli.mjs`, and
declares the tool policy in `docs/SUPPORTED-SUBSTRATES.md`: "every substrate seat runs allowed
tools {*} / denied tools {}; denials are built from the ground up, only on explicit operator
request" (operator triggers "open the hatch" and "i want to see the vessels" are etched in the
skill SSoT and all 11 seats). `a509e00b` (19:44:13; 19 files, +624/−29) closes the seating's parity
sweep: `packages/cursor/skills/ufo` (a stale pre-`.cursor` seat), `packages/substrate-omp/skills/ufo`
(the registry's omp skill seat, "still naming the-planner") and `ports/ufo-{cursor,cursor-agent-surface,grok,opencode}`
skills were missed by the earlier propagation and are now byte-identical to `skills/ufo/SKILL.md`,
while vendored `hangar`/`upstream` mirrors keep their historical bytes by the no-densify policy.

## Gate
```
for s in 86a0add1 d5794dd4 a509e00b; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 86a0add1 d5794dd4 a509e00b
git show --shortstat --format= 86a0add1
git ls-tree --name-only 86a0add1 agents/ | wc -l
git ls-tree --name-only 86a0add1 agents/ | grep -c '^agents/the-'
git show --name-status --format= 86a0add1 | grep -cE '^D'
git ls-tree --name-only d5794dd4 packages/substrate-omp/agents/ | wc -l
```
Expected: 3x ok; three subjects verbatim; 429 files changed, 11602 insertions(+), 11788
deletions(−); 16 roster files with zero `the-*` survivors; 225 deletions; 16 omp agent seats.
Actual: observed exactly (2026-09-18, HEAD 4adedde6): 3x ok; subjects as in Touches; "429 files
changed, 11602 insertions(+), 11788 deletions(-)"; 16; 0; 225; 16.

## Touches
- `86a0add1` Seat the ufo agent roster as the single L2 SSoT on every substrate — 429 files +11602/−11788 (19 renames, 225 deletions, 159 additions); agents/*.md (16 files), ports/, plugins/, packages/{cursor,kimi,codex,grok,opencode}/agents, deps/agents, lanes/registry.yaml, crates/ufo-control-plane/src/model.rs, skills/ufo/SKILL.md, docs/SUPPORTED-SUBSTRATES.md
- `d5794dd4` Seat the ufo roster on omp, add ufo-sighting, and declare the tool policy — 30 files +1447/−4; packages/substrate-omp/agents/*.md (16 new), scripts/ufo-sighting.sh (new), packages/substrate-runtime/src/lane-cli.mjs, docs/SUPPORTED-SUBSTRATES.md, 11 SKILL.md seats
- `a509e00b` Sync six more ufo skill seats to the SSoT byte hash — 19 files +624/−29; packages/cursor/skills/ufo, packages/substrate-omp/skills/ufo, ports/ufo-{cursor,cursor-agent-surface,grok,opencode}/skills/ufo, plugins/*/skills/ufo, bundled ports copies
- Paths: agents/, packages/substrate-omp/agents, scripts/ufo-sighting.sh, packages/substrate-runtime/src/lane-cli.mjs, lanes/registry.yaml, docs/SUPPORTED-SUBSTRATES.md, skills/ufo/SKILL.md (+seats)

## Out-of-scope
- The omp CLI wiring that seated the package these agents ride on — M-audit-early-0041.
- Model retirement/routing — M-audit-early-0043; the gate fixes the seating forced — M-audit-early-0044;
  omp live credentials and delegation cascades — M-audit-early-0045.
- The xbgst `the-*` roster's own provenance — M-audit-early-0040; the wrong-referent nuke —
  M-audit-early-0039; the L1 (`skills/ufo`) seating on six CLIs — M-audit-early-0040's cluster,
  not this beat.
- Site ingestion (L0-owned) and the 2026-08-29 refocus (`96a4b6b4`).

## Findings
- `86a0add1` records the failures it did not fix: "cargo test --workspace --no-fail-fast green
  except five failures proven pre-existing on the pristine tree (stale from the 2026-08-28
  local-first rebase: three substrate-presence contract tests, one stale orch-model pin, one stale
  fixture digest)". Those five pre-date the seating per that body and are classified 1h12m later by
  `253dfd53`, which itself fixes five reds it attributes to the seating (M-audit-early-0044) — the
  two counts are different red sets and neither body reconciles them.
- `d5794dd4` states the omp seat is not verifiable live: model pins are omitted because the seat had
  "zero authenticated providers" at 18:31 — at that instant `substrates/omp/substrate.json` still
  carried `credentialBlocked: true` (flipped only at `1af2d83e`, 20:31, M-audit-early-0045).
- The omp roster seat and the omp skill seat live under `packages/substrate-omp` (and
  `substrates/omp`); as of the beat date those trees are in force — the 2026-08-29 commit
  `96a4b6b4` ("refocus UFO runtime on native OMP routing", 9677 files, +28156/−811242) removes them.
  Cite the commits, not today's paths.
- The parity sweep was not complete at `a509e00b` either: it names `packages/cursor/skills/ufo` and
  `packages/substrate-omp/skills/ufo` as seats "the earlier propagation missed", i.e. the
  byte-identity claim made inside `86a0add1`/`d5794dd4` was already false for those seats when made.
- Vendored seats are excluded from byte-parity by policy ("Vendored hangar and upstream mirrors
  under packages/substrate-*/ keep their historical bytes by the no-densify policy"), so any later
  parity count that includes them will disagree with this beat's "byte-identical" claim.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C7)
- Prior tip: `ccd5f0db` — anchor of M-audit-early-0041
- Next: M-audit-early-0043
