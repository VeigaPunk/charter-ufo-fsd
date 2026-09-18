# M-audit-early-0041 — omp wired as sixth charter CLI, then live on plazir27

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
`ccd5f0db` (16:58:36 -0300; 57 files, +4535/−29) makes the six-CLI charter real — a new
`adapters/ufo-omp` Cargo workspace member (`Cargo.toml` lists `"adapters/ufo-omp"`) whose argv
builder emits `omp <task>` with `--model=` only when overridden and no default model, since "the
harness carries its own provider config"; the `substrates/omp` lane alias (judgeId ufo), a thin
`packages/substrate-omp` hangar package seating the skills/ufo SSoT, and the registry/policy rows
in `lanes/registry.yaml`, `adapters/registry.json`, `config/skill-pack.json`,
`config/orchestrator.{json,toml}`, `docs/BEHAVIOR-MATRIX.md`, `docs/SUPPORTED-SUBSTRATES.md`,
`docs/charter-digest.md`. The body names its own cause verbatim: "omp was absent because
c34f3666 nuked the wrong referent (the oh-my-posh prompt theme); this wires the agentic harness
itself" — the wrong-referent removal 5h34m earlier (`c34f3666` 11:24:07, beat M-audit-early-0039)
is what this commit repairs, and the seat note itself says "NOT the oh-my-posh prompt theme
(wrong referent removed in c34f3666)". `fd7afc15` (17:27:17; 7 files, +46/−21) then wires the
measured host: omp2 ("oh-my-pi v18.0.10") installed user-local at `~/.local/bin/omp`, the ufo
skill seated at `~/.omp/agent/skills/ufo` after discovering the load path empirically, argv pinned
from measured `omp --help` (`-p`/`--print` non-interactive, positional messages, `--model` fuzzy
pin) into the `crates/ufo-adapters` Omp arm and `packages/ufo-runtime/src/lane-executor.ts` (omp
case, SubstrateId, alias map, token keys, probeSubstrates entry), moving the lane doctor to
hostAvailable+invoked (evidenceKind real). `6788bb34` (17:32:17; 34 files, +456) adds the
wwkd-format resume handoff `docs/handoffs/2026-08-28-omp-opencode-fsd-live.md` and etches the
terminology into `skills/ufo/SKILL.md` plus 33 seated copies: "fsd = the CLI vendors' "auto" mode
— the ufo loop unattended until convergence/honesty brake; never means pretend-auto." The live
state stayed honestly pending, never faked: `ccd5f0db` reported "neither omp nor oh-my-posh is
installed on plazir27 — the omp doctor reports hostAvailable=false, dry-only, never fake live",
and after `fd7afc15` the host exists but `--live` is "PENDING operator provider auth (`omp
/login` or a provider API key env): no keys exist on plazir27's shell env and the OAuth flow is
interactive. Never fake live — dry is labeled mock." (the pending flag is cleared 3h04m later by
`1af2d83e`, beat M-audit-early-0045).

## Gate
```
for s in ccd5f0db fd7afc15 6788bb34; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" ccd5f0db fd7afc15 6788bb34
git show --shortstat --format= ccd5f0db
git show ccd5f0db:substrates/omp/substrate.json | grep -n '"note"'
```
Expected: 3x ok; three subjects verbatim; 57 files changed, 4535 insertions(+), 29 deletions(-);
the seat note disambiguating omp2 from oh-my-posh.
Actual: observed exactly (2026-09-18, HEAD 4adedde6): 3x ok; subjects as in Touches; "57 files
changed, 4535 insertions(+), 29 deletions(-)"; note line 13 = "Alias of ufo-omp — the omp2 agentic
harness (omp.sh), NOT the oh-my-posh prompt theme (wrong referent removed in c34f3666). Host CLI
required for live; dry is labeled mock. Charter six: kimi, codex, cursor-agent, opencode, grok,
omp."

## Touches
- `ccd5f0db` Wire omp as the sixth charter CLI — the omp2 agentic harness (omp.sh) — 57 files +4535/−29; adapters/ufo-omp/{Cargo.toml,src/main.rs} (new), packages/substrate-omp/* (new hangar package + skills/ufo seat), substrates/omp/{bin/cli.mjs,substrate.json}, lanes/registry.yaml, adapters/registry.json, config/{orchestrator.json,orchestrator.toml,skill-pack.json}, crates/ufo-adapters/{src/lib.rs,tests/commands.rs}, docs/{BEHAVIOR-MATRIX.md,SUPPORTED-SUBSTRATES.md,charter-digest.md}
- `fd7afc15` Wire omp live on plazir27: install omp2, seat ufo skill, pin argv — 7 files +46/−21; crates/ufo-adapters/{src/lib.rs,tests/commands.rs}, packages/ufo-runtime/src/{lane-executor.ts,lane-executor.test.ts}, substrates/omp/substrate.json, docs/{BEHAVIOR-MATRIX.md,SUPPORTED-SUBSTRATES.md}
- `6788bb34` Handoff: omp+opencode live wiring plan; etch fsd=auto into the ufo SSoT — 34 files +456; docs/handoffs/2026-08-28-omp-opencode-fsd-live.md (new) + skills/ufo/SKILL.md and 33 seated copies
- Paths: adapters/ufo-omp, packages/substrate-omp, substrates/omp, crates/ufo-adapters, packages/ufo-runtime/src/lane-executor.ts, lanes/registry.yaml, adapters/registry.json, config/, docs/handoffs/, skills/ufo/SKILL.md

## Out-of-scope
- The wrong-referent nuke itself, its handoff state and the ufo-only stack directive —
  M-audit-early-0039 (cluster C4).
- ufo agent-roster seating as the L2 SSoT, ufo-sighting, tool policy — M-audit-early-0042.
- Model retirement and chatgpt routing — M-audit-early-0043; gate closure — M-audit-early-0044;
  omp's live credentials, provider pool and delegation cascades — M-audit-early-0045.
- The oh-my-posh heritage trees deleted on 2026-08-29 by `96a4b6b4` ("refocus UFO runtime on
  native OMP routing") and site ingestion (L0-owned).

## Findings
- `omp` is ambiguous by path across 2026-08-28 and both referents coexist in-tree that day: before
  `c34f3666` (11:24) `omp` meant oh-my-posh; from `ccd5f0db` (16:58) it means the agentic harness
  (omp.sh), while the surviving `packages/substrate-omp`, `substrates/omp` paths form a third,
  package-named surface. Only the commit date+subject disambiguates.
- Losers of the day's re-charter kept no beat of their own here: `853cedaf` (the wrong oh-my-posh
  port) belongs to M-audit-early-0039 (C4).
- `fd7afc15` seats the skill at a host path (`~/.omp/agent/skills/ufo`) that is not reproducible
  from the repo; the in-repo evidence is the seat copy under `packages/substrate-omp/skills/ufo`
  plus the pinned argv in `crates/ufo-adapters`.
- The `--live` pending state was carried in the seat note rather than in the status word:
  `substrates/omp/substrate.json` keeps `status` installable-local (`credentialBlocked` flips to
  false only at `1af2d83e`), so no commit in this cluster claims a live lane.
- `6788bb34`'s 33 SKILL.md copies include vendored `hangar/lkg-mirror` and `upstream` seats, which
  the same-day no-densify policy later treats as frozen history (see M-audit-early-0042).

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C6)
- Prior tip: `23b209b7` — anchor of M-audit-early-0040
- Next: M-audit-early-0042
