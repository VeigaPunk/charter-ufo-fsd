# M-audit-early-0052 — Local-only posture: vendor purge, GitHub desync, local GPU helper

**Status:** COMPLETE | **Date:** 2026-09-08 | **Session:** audit-early

## Does
Five commits in 31 minutes (20:37:40 → 21:09:12 -0300) execute a posture decision about where truth
and compute live. `59d49b1a` (63 files, −3875) removes the ingested downstream `xbgst`/`ds4cc`
mirrors under `deps/` — `deps/agents/*` (16 role files), `deps/plazirhangar/**` (20), `deps/sekhmet-l3/**`
(19), `deps/skills/**` (4), `deps/scripts/{xask.reference,xbreed-schema.sql}`, and
`deps/bootstrapper/the-bootstrapper`; nothing is re-pathed, the surfaces are dropped.
`942a384c` (1 file, −30) deletes `.github/workflows/gates.yml` outright; the subject carries the only
stated rationale: "gold standard stays local-only" — `scripts/gates.sh` remains the bar and GitHub
stops arbitrating it. `e47ab329` (7962 files, −656720) continues the sweep over the mirrors and port
staging: 3492 files under `vendor/` and 4470 under `ports/`, headed by `ports/plazir-hangar` (3355),
`vendor/last-known-good` (2073), `vendor/lkg` (1005), `ports/umwelt-frontier-orchestrator` (328) and
`vendor/grok-marketplace` (222); the staging data goes with it — 2098 files under
`ports/plazir-hangar/bench-r4`, 338 `*.ndjson`, 6 under `ports/godspeed-mode`. `85c21e38` (2 files,
+1/−135) is cleanup-in-sequence: `tests/bootstrapper-routes.test.js` is deleted and dropped from
`npm run test:portable` in `package.json` because its subject binary
(`deps/bootstrapper/the-bootstrapper`) was purged 7m51s earlier. `9530c816` (3 files, +497/−1)
adds the counterweight on the compute side: `scripts/local-helper.mjs` (+310) runs three bounded
mechanical tasks — `dedupe`, `digest`, `classify` — against a local llama-style endpoint (default
`http://127.0.0.1:34113`, overridable via `UFO_LOCAL_HELPER_URL`, `POST …/v1/chat/completions`,
model `Qwen3-Coder-30B-A3B-Instruct-UD-IQ2_XXS`), with fail-closed bounds (12 KiB input, 512
max `n-predict`, 120s max timeout, 1 MiB response cap), typed errors (`usage`, `input_invalid`,
`model_output_invalid`) and an evidence envelope carrying `inputSha256`; `tests/local-helper.test.js`
(+186, seven test declarations) is added to `test:portable`. The normative model source is not set
here: `config/the-tick.machine.json` (added 2026-08-29 by `96a4b6b4`) declares
`unsloth/Qwen3-Coder-30B-A3B-Instruct-GGUF` at revision `b17cb02dd882d5b6ab62fc777ad2995f19668350`
with a pinned GGUF `sha256`, two runner slots and the shared 8080 chat backend.

## Gate
```
for s in 59d49b1a 942a384c e47ab329 85c21e38 9530c816; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=iso 59d49b1a 942a384c e47ab329 85c21e38 9530c816
git show --shortstat --format= 59d49b1a | tail -1
git show --shortstat --format= e47ab329 | tail -1
git show --name-status --format= 942a384c
git show --shortstat --format= 96a4b6b4 -- .github/workflows/gates.yml | tail -1
```
Expected: 5x ok; the five subjects at 20:37/20:41/20:45:22/20:45:31/21:09 with "purge downstream
xbgst/ds4cc ingestion…", "desync from github…", "purge downstream vendor mirrors and port staging",
"drop obsolete bootstrapper route tests", "feat: local GPU helper…"; 63 files −3875; 7962 files
−656720; gates.yml deleted; the 08-29 add of the same file at 30 insertions.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): 5x ok; the five subjects in
that order; "63 files changed, 3875 deletions(-)"; "7962 files changed, 656720 deletions(-)";
`D .github/workflows/gates.yml`; "1 file changed, 30 insertions(+)".

## Touches
- `59d49b1a` purge downstream xbgst/ds4cc ingestion: remove deps/ vendored mirrors — 63 files −3875; deps/agents (16), deps/plazirhangar (20), deps/sekhmet-l3 (19), deps/skills (4), deps/scripts (2), deps/bootstrapper/the-bootstrapper, deps/umwelt-frontier-orchestrator (1)
- `942a384c` desync from github: drop CI workflow; gold standard stays local-only — 1 file −30, `.github/workflows/gates.yml` deleted
- `e47ab329` purge downstream vendor mirrors and port staging — 7962 files −656720; 3492 under vendor/, 4470 under ports/ (ports/plazir-hangar 3355, ports/umwelt-frontier-orchestrator 328), incl. 2098 bench-r4 staging files and 338 ndjson
- `85c21e38` drop obsolete bootstrapper route tests — 2 files +1/−135; deletes `tests/bootstrapper-routes.test.js`, edits `package.json` (`test:portable`)
- `9530c816` feat: local GPU helper for minimal tasks (dedupe/digest/classify on THE TICK second slot) — 3 files +497/−1; adds `scripts/local-helper.mjs` (+310), `tests/local-helper.test.js` (+186), edits `package.json`
- Paths: deps/, vendor/, ports/, .github/workflows/gates.yml, scripts/gates.sh, tests/bootstrapper-routes.test.js, scripts/local-helper.mjs, tests/local-helper.test.js, package.json, config/the-tick.machine.json (context, added 2026-08-29)

## Out-of-scope
- The routing re-charter that added `gates.yml` and edited `deps/bootstrapper/the-bootstrapper`
  (`96a4b6b4` and `64f2f9ad`, beats M-audit-early-0046/0048) — cited here only as the reversal pair.
- The L2/L3 routing plan and level-counting landing later the same evening (`e706c4f9`, `8b121a70`,
  `701bfe64`, beat M-audit-early-0053) and the sighting lifecycle commits (beat M-audit-early-0051).
- The content of the purged mirrors (downstream `xbgst`/`ds4cc` projects) — the act of de-vendoring is
  the decision; the deleted bytes are not evidence.
- `Cargo.lock`/lockfile churn, post-window local-inference work, and the sibling window after
  2026-09-10.

## Findings
- All five commits carry subject-only messages; the sole stated rationale in the sweep is the
  `942a384c` subject clause "gold standard stays local-only". Every other decision above is
  diff-read, and no commit in the sweep reports a verification step.
- CI reversal pair, measured: `gates.yml` is added by `96a4b6b4` (+30) and deleted by `942a384c`
  (−30). By author dates the CI lived 10 days 0h12m (2026-08-29 20:29:17 → 2026-09-08 20:41:20); by
  commit dates 9 days 16h56m, because `96a4b6b4`'s author and commit dates differ by ~7h (beat
  M-audit-early-0046).
- Cleanup-in-sequence, not churn: `85c21e38` deletes a test file that `64f2f9ad` had extended 8 days
  earlier in this same window (77+/8− at that path), because the binary the test spawned —
  `deps/bootstrapper/the-bootstrapper`, itself modified by `64f2f9ad` — was removed by `59d49b1a`
  7m51s before this commit. The routing table for that binary thus outlived the binary by 8 days,
  and the test outlived it by 7m51s.
- The local helper's default endpoint does not match the committed machine config:
  `scripts/local-helper.mjs` defaults to `http://127.0.0.1:34113` plus `/v1/chat/completions`, a port
  that appears nowhere else in the tree, while `config/the-tick.machine.json` declares the shared
  backend at `http://127.0.0.1:8080/v1/chat/completions` with `parallelSlots: 2` and two runner
  sockets under the runtime dir. The subject's "THE TICK second slot" is therefore a claim about host
  wiring that this commit does not pin in configuration; the helper can be pointed at the correct
  endpoint only by environment override.
- `9530c816` is the one commit in the sweep with a fail-closed contract: oversized input, out-of-bound
  generation/timeout values and malformed model output all exit 2 with a typed JSON error before or
  after any request (seven tests pin these). The purge commits ship no such gate.
- Posture split: the repository stops exporting (CI) and stops ingesting (deps/, vendor/, ports/)
  while local GPU inference becomes an in-tree capability — the same evening the fleet is running
  remote seats (beats M-audit-early-0049/0050).

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-late-report.md` (C7)
- Prior tip: `927f947b` (anchor of M-audit-early-0051)
- Next: M-audit-early-0053
