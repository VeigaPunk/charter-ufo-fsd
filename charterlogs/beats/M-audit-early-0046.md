# M-audit-early-0046 — Runtime refocused on native OMP routing (re-charter)

**Status:** COMPLETE | **Date:** 2026-08-29 | **Session:** audit-early

## Does
`96a4b6b4` "refocus UFO runtime on native OMP routing" is the window's re-charter, landing as one
squashed commit (9677 files, +28156/−811242) with a subject-only message: every decision below is
read from the diff. `config/ufo.json` (74+/59−) collapses the `orchestrator` to
`{"route":"local/fixture-primary","role":"portable contract fixture; not the canonical judge"}`,
declares `"automaticSubstrate": "omp"`, and replaces the six xask-protocol transports with
local-fixture routes; `nativeProfiles["omp-native-v1"]` becomes the real profile — transport
`omp/task`, `judgeCommand: ufo judge-handoff`, `concurrencyCeiling: 32`, planner + six proposal
roles (scout, reviewer, critic, connector, sentinel, executor) + distiller + a depth-2 labrat probe
parented on `executor`, per-role `modelRoutes` (`openai-codex/gpt-daybreak-blue-latest:max` for the
thinking seats, `xai-oauth/grok-4.5:low` for scout/executor/labrat), `l3Evidence {transport:
sekhmet, authority: evidence-only, concurrencyCeiling: 64}` and `credentialAuthority: omp-native`;
every lane row flips `substrate: "local"` → `"omp"`. `.omp/config.yml` (+20) carries the transport
projection: `task.maxConcurrency: 32`, `maxRecursionDepth: 2`, `@ufo_thinking`/`@ufo_mechanical`
model roles, and 13 `.omp/agents/*` role files are added. `docs/BEHAVIOR-MATRIX.md` (7+/7−) rewrites
the codex/opencode boundaries — stock `codex` owns the Codex port (previously BANNED in favour of
`codex-titanium`), `codex-titanium` is demoted to an optional Sekhmet L3 worker binary, `opencode`
becomes explicit-only and the repository no longer mutates its host config. The deletion side is the
decision: `crates/` goes from 13 directories to 2 (only `ufo-cli` and `ufo-core-runtime` survive;
11 crate directories — xbreed, ufo-core, ufo-control-plane, ufo-pattern, ufo-selfaudit, ufo-runtime,
ufo-sqlite, ufo-conformance, ufo-adapters, ufo-fixture, ufo-memory-napi — lose every file), the
Python `fsd/` stack (39 files) and the substrate/plugin/port surface (`packages/substrate-*`,
`plugins/ufo-*`, `ports/xbrd-gdsp-fknpft`, `runtime/ufo-stack`, `overlay/ufo-fsd`) go with it, and
`.github/workflows/gates.yml` (+30: checkout, node 22, python 3.12, rust stable → `npm ci` →
`bash scripts/gates.sh`) replaces `core-presence.yml`. Native-side additions:
`crates/ufo-core-runtime/src/native.rs` (+2480), `execution_profile.rs` (+765),
`crates/ufo-cli/src/titanium.rs` (+1034), `crates/ufo-cli/tests/cli_contract.rs` (+485),
`scripts/ufo-sighting.mjs` (+2620), `scripts/collect-omp-native-handoff.mjs` (+755),
`scripts/run-omp-native-trial.mjs` (+375); `scripts/gates.sh` is reworked (87+/289−).

## Gate
```
for s in 96a4b6b4; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=iso 96a4b6b4
git show --shortstat --format= 96a4b6b4 | tail -1
git ls-tree --name-only 96a4b6b4 crates/
```
Expected: SHA resolves; subject "refocus UFO runtime on native OMP routing" at author date
2026-08-29 20:29:17 -0300; shortstat 9677 files, +28156/−811242; `crates/` listing 2 entries.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): 96a4b6b4 ok;
"96a4b6b4 2026-08-29 20:29:17 -0300 refocus UFO runtime on native OMP routing";
"9677 files changed, 28156 insertions(+), 811242 deletions(-)"; crates/ = ufo-cli, ufo-core-runtime.

## Touches
- `96a4b6b4` refocus UFO runtime on native OMP routing — 9677 files +28156/−811242; adds `.omp/agents/*` (13), `.omp/config.yml`, `.github/workflows/gates.yml`, `config/ephemeral-l1.machine.json`, `config/the-tick.machine.json`, `crates/ufo-core-runtime/src/{native.rs,execution_profile.rs,operator_guidance.rs}`, `crates/ufo-cli/src/titanium.rs`; modifies `config/ufo.json` (74+/59−), `docs/BEHAVIOR-MATRIX.md` (7+/7−), `scripts/gates.sh`; deletes `crates/` 11 crate directories, `fsd/**` (39 files), `packages/substrate-*`, `plugins/ufo-*`, `.github/workflows/core-presence.yml`
- Paths: config/ufo.json, .omp/config.yml, .omp/agents/, docs/BEHAVIOR-MATRIX.md, crates/ufo-core-runtime, crates/ufo-cli, scripts/ufo-sighting.mjs, scripts/run-omp-native-trial.mjs, scripts/collect-omp-native-handoff.mjs, scripts/gates.sh, .github/workflows/gates.yml, fsd/

## Out-of-scope
- The 08-31 routing re-charter that replaces these model ids (`64f2f9ad`, beat M-audit-early-0048)
  and the charter-scribe wire (beat M-audit-early-0047).
- The qwen-seat directive campaign (M-audit-early-0049), fleet-dispatcher (0050), sighting lifecycle
  (0051) and the 09-08 purge sweep (0052) — separate clusters held by later beats.
- Churn families inside this commit: SKILL-mirror byte-syncs and the `Cargo.lock` (1257 lines) /
  `Cargo.toml` (41 lines) crate-graph consequences of the deletions — listed in the mission result
  report, not beats.
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- `96a4b6b4` has no commit body (`git show -s --format=%B` returns the subject line only). No
  rationale is quotable from the message; the re-charter decisions above are diff-read.
- Dual dating hazard: author date 2026-08-29 20:29:17 -0300, **commit date 2026-08-30 03:44:52
  -0300** (~7h later). This beat is dated by author date; a sweep keyed on commit date and starting
  2026-08-30 also matches it, so it must not be counted twice.
- Crate-count drift against the assignment shorthand "five legacy crates": measured, `crates/` goes
  13 → 2 and 11 crate directories lose every file. The five directories named by the prior-window
  handoff (`ufo-control-plane`, `ufo-pattern`, `ufo-selfaudit`, `ufo-runtime`, `ufo-sqlite`) are a
  subset of the 11; the deleted `ufo-control-plane`/`ufo-core` battery and invariant test surfaces
  are the terminal state of 08-25/08-26 beats (cross-ref M-audit-early-0030 and 0010–0017, as-of
  framing).
- Model routes here are as-of this SHA only: `64f2f9ad` (2026-08-31) supersedes
  `gpt-daybreak-blue-latest`/`grok-4.5` with the four-family table (beat M-audit-early-0048).
- The CI workflow added here is deleted 10 days later by `942a384c` (2026-09-08, beat
  M-audit-early-0052) — the CI window is exactly 10 days.
- `config/ufo.json` `sighting.triggers` (three phrases, `twinMaxDepth: 1`) is established here as
  the canonical trigger list; later beats reference it rather than restate it.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-late-report.md` (C1)
- Prior tip: `1af2d83e` (anchor of M-audit-early-0045)
- Next: M-audit-early-0047
