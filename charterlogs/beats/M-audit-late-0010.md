# M-audit-late-0010 — Advisor reroute to Devin Astra with 75%-usage Grok successor; 1024 ceiling doctrine sync
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for two 2026-09-13 commits. `6a7baf71` (18:04:59 -0300) repins the advisor from `openai-codex/gpt-6-astra:max` (OpenAI OAuth) to `devin/gpt-6-astra:max` (Devin OAuth) across the materialized config surfaces — `config/ufo.json`, `.omp/config.yml`, `crates/ufo-core-runtime/bundled/config.json`, and the `conformance/vectors/native/omp-route-yaml.json` assertion — and propagates the doctrine prose, including the operator policy "(2026-09-13): when the Devin advisor account reaches 75% usage, the advisor model swaps to `xai-oauth/grok-4.6:xhigh` on xAI OAuth", through `skills/ufo/SKILL.md` and `skills/ufo/references/run-logic.md` into every packaged mirror; the folded satellite `7831cea7` (18:26:31) then performs that swap for the OMP watchdog advisor `UFO Quality` in `.omp/WATCHDOG.yml` (one line: `openai-codex/gpt-6-astra:max` → `xai-oauth/grok-4.6:xhigh`). Why: the usage-threshold succession was decided in advance so the swap is a mechanical operator gesture rather than an ad hoc model change under pressure.

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 6a7baf71 7831cea7
```
Expected: both commits resolve; subjects `doctrine sync: 1024 global runner ceiling, advisor to devin/gpt-6-astra:max on Devin OAuth with 75% swap to grok-4.6:xhigh, mirror propagation` and `watchdog: UFO Quality advisor to xai-oauth/grok-4.6:xhigh (75% Devin-usage successor)`; both dated 2026-09-13.
Actual:
```
6a7baf71f3d5045d63ae7ad56ef73755e3bfec0b|2026-09-13 18:04:59 -0300|doctrine sync: 1024 global runner ceiling, advisor to devin/gpt-6-astra:max on Devin OAuth with 75% swap to grok-4.6:xhigh, mirror propagation
7831cea715fbe3b02b929a082f634e693fded1aa|2026-09-13 18:26:31 -0300|watchdog: UFO Quality advisor to xai-oauth/grok-4.6:xhigh (75% Devin-usage successor)
```

## Touches
- 6a7baf71f3d5045d63ae7ad56ef73755e3bfec0b — 29 files, +149/-89. Key paths: `config/ufo.json` (advisor `model`), `.omp/config.yml` (`advisor:`), `crates/ufo-core-runtime/bundled/config.json` (advisor `model`), `conformance/vectors/native/omp-route-yaml.json` (advisor assertion), `skills/ufo/SKILL.md` + `skills/ufo/references/run-logic.md` and their packaged mirrors (`.cursor/`, `.omp/`, `packages/codex/`, `packages/contract-support/assets/ufo/`, `packages/cursor/`, `packages/devin/`, `packages/grok/`, `packages/kimi/`, `packages/opencode/`, `packages/substrate-omp/`).
- 7831cea715fbe3b02b929a082f634e693fded1aa — 1 file, +1/-1: `.omp/WATCHDOG.yml`, advisor `UFO Quality` `model` field.
- `config/ufo.json:36` — `"globalRunnerCeiling": 1024` is the ceiling the commit subject names; the value itself landed in cb388b72 (beat M-audit-late-0007).

## Out-of-scope
- `globalRunnerCeiling` value change: landed in cb388b72 (beat M-audit-late-0007); this commit's verified byte diff carries no ceiling edit.
- Advisor disablement by the 2026-09-15 operator re-charter (beat M-audit-late-0011).
- Stash-resident WIP (`refs/stash`, 2026-09-13 13:27) — not beat material per dossier; recorded in Findings.

## Findings
- Verified byte diff of 6a7baf71 is advisor-only plus prose: `"model": "openai-codex/gpt-6-astra:max"` → `"devin/gpt-6-astra:max"` in `config/ufo.json` and `crates/ufo-core-runtime/bundled/config.json`; `advisor: "openai-codex/gpt-6-astra:max"` → `"devin/gpt-6-astra:max"` in `.omp/config.yml`; the matching `omp-route-yaml.json` assertion; and the Devin-OAuth / 75%-successor prose in `skills/ufo/SKILL.md` + `references/run-logic.md` across all mirrors. No `1024` line was added or removed despite the subject's "1024 global runner ceiling" clause — the ceiling was already doctrine at 1024 in this tree.
- Mirror prose states the succession explicitly: "Operator policy (2026-09-13): when the Devin advisor account reaches 75% usage, the advisor model swaps to `xai-oauth/grok-4.6:xhigh` on xAI OAuth" (`skills/ufo/SKILL.md`), with `run-logic.md` carrying the same rule for the Astra/max advisor.
- 7831cea7 executes the pre-declared successor: `.omp/WATCHDOG.yml` advisor `UFO Quality` goes `openai-codex/gpt-6-astra:max` → `xai-oauth/grok-4.6:xhigh`. That file is not among the 29 files of 6a7baf71, so the watchdog moved directly from the OpenAI OAuth pin to the successor without an intermediate `devin/gpt-6-astra:max` state.
- Stash check: `git log -1 --format='%h|%ad|%s' refs/stash` → `6db9878a|Sun Sep 13 13:27:17 2026 -0300|On main: pre-reset-1024: advisor swap + in-flight work`. Parent lines: `51b51129` (main, beat M-audit-late-0009 tip), `94656206` (index), `5e1fb15b` (untracked), all stamped 2026-09-13 13:27:17 -0300. `refs/stash` only — never landed on HEAD; uncommitted WIP, out of beat scope.
- The 75% successor is a doctrine-level reroute; no usage-threshold telemetry or enforcement hook is added in either commit (the prose declares the policy, the watchdog edit applies it).

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 51b5112979f98078d5f1e0155ed8e2e0f3349d60
- Next: M-audit-late-0011
