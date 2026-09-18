# M-audit-late-0017 — Pack P8: invariant drill-matrix harness + dependency closure (spec 09/15, A-08/A-09)
**Status:** COMPLETE | **Date:** 2026-09-18 | **Session:** audit-late

## Does
Audit beat for the P8 cluster: 81591492 (2026-09-17 19:22:07) is the P8-prep satellite — the `drills.enabled` config key in `config/ufo.json` plus the bundled copy (8 lines), the switch the new gates.sh stage is gated on; 285fc692 (20:14:56) lands the harness itself: the `drills/` matrix (commit body records 52 rows — 24 wired, 23 pending-mechanism, 5 referenced to T03–T07) with `scripts/ufo-drills.mjs` (+641, new) executors for self-iter / sync-check / cargo-test / node-test / judge-handoff / shell, a `drills:` stage in `scripts/gates.sh` (+14) running after the mutation battery and only when `drills.enabled` is true, `scripts/sync-ufo-contracts.mjs` (+299) extending the sync gate to mirror `ssot/` + `wwkd` into every packaged target and adding the `deps:closure` step (execution mode fails closed naming a missing locked dep; review mode resolves the lock and reports an advisory), the new `ufo-deps.lock` (contract revision pin plus `godspeed-directive` and `wwkd-skill` file-set pins), `skills/SHA256SUMS` (+9, covering the `ufo/**` entries), and `packages/substrate-omp/package.json` (+17); 87590b11 (20:14:59) is the fleet-dispatch record — the new `config/mission-pack-p8.yml` (26 lines) queuing the pack-p8-structural mission (spec 15 closure plus spec 09 drill harness; `fleetL1Route` SWE-2 L1, the six mechanical L2 seats on `alibaba-token-plan/deepseek-v4.1-flash:max`, thinking seats on `devin/swe-2:max`, advisor disabled, `task.maxConcurrency: 16`).

## Gate
```
git log --no-walk --date=iso --format='%H|%ad|%s' 81591492 285fc692 87590b11
```
Expected: all three cluster commits resolve; `--no-walk` prints them newest-first in git's own order (87590b11, 285fc692, 81591492); subjects and dates as given in the beat spec, all dated 2026-09-17.
Actual:
```
87590b11a9b9678c463074b45d82ff3acc770c8c|2026-09-17 20:14:59 -0300|fleet: dispatch pack-p8-structural mission config (spec 15 closure + spec 09 drill harness, SWE-2 L1, flash mechanical L2)
285fc6920f818dc1f6adf600e4b52539ab07c256|2026-09-17 20:14:56 -0300|ufo pack P8: drill matrix harness + dependency closure (spec 09/15, A-08/A-09)
8159149229574120a337cf38e46c6504abe892d9|2026-09-17 19:22:07 -0300|ufo pack P8-prep: drills.enabled config key (spec 09 harness enablement)
```

## Touches
- 8159149229574120a337cf38e46c6504abe892d9 — 2 files, +8: `config/ufo.json` and `crates/ufo-core-runtime/bundled/config.json` (`drills: { "enabled": true, note }`; the note states the gates.sh drills stage runs after the mutation battery and drill evidence lands under `.ufo/drills/<id>/`)
- 285fc6920f818dc1f6adf600e4b52539ab07c256 — 97 files, +4529/-10. Key paths: `drills/*.drill.json`, `drills/fixtures/loop_specialist.py` (+184, new), `scripts/ufo-drills.mjs` (+641, new), `scripts/gates.sh` (+14, `drills:` stage gated on `drills.enabled`), `scripts/sync-ufo-contracts.mjs` (+299, mirror targets + `deps:closure`), `ufo-deps.lock` (new, 30 lines), `skills/SHA256SUMS` (+9), `packages/*/skills/wwkd/SKILL.md` + `SHA256SUMS`, `packages/*/ssot/godspeed-core/directive.md`, `.cursor`/`.omp` `skills/wwkd` + `ssot/godspeed-core`, `packages/substrate-omp/package.json`
- 87590b11a9b9678c463074b45d82ff3acc770c8c — 1 file, +26: `config/mission-pack-p8.yml` (new fleet mission overlay; `modelRoles.m_deepseek` / `m_swe2` bound to the flash and SWE-2 seats)
- `ufo-deps.lock` (new at 285fc692) — `schema: ufo-deps-lock-v1`; contract revision pin plus file-set pins

## Out-of-scope
- The P3 cluster 2c087de6 / 9b825505 (beat M-audit-late-0016) and P4 10e39d85 (beat M-audit-late-0018), despite git interleaving with this cluster
- Live drill execution, gates.sh, and cargo — no gate or suite was re-run for this beat
- The P8-docs restructure 8e9116d9 (beat M-audit-late-0023), which continues the `deps:closure` / docs work

## Findings
- Git order interleaves the P3 and P8 clusters (mirror of beat 0016): 81591492 is the git parent of 2c087de6, and 9b825505 (P3 satellite) is the git child of 87590b11 — ancestry reads 81591492 -> 2c087de6 -> 285fc692 -> 87590b11 -> 9b825505 -> 10e39d85. The Prior tip / Next pointers here are audit-chain pointers, not git-parent order.
- Row accounting is not a 1:1 file count: the commit body records 52 matrix rows (24 wired / 23 pending-mechanism / 5 referenced), while the `drills/` tree at 285fc692 carries 59 `*.drill.json` files (`git ls-tree -r 285fc692 drills/`).
- The `ufo-deps.lock` contract revision sha256 `20acbb6e973f422a112fdb30dc90ce05d81452c89fd2c4f165d702bd3641fd9f` matches the `ufo/references/run-logic.md` entry in `skills/SHA256SUMS` at this commit — lock binding and shipped sums agree.
- The 285fc692 commit body carries no gates.sh count; the drills stage is conditional on `config/ufo.json` `drills.enabled` (the key landed first in 81591492), so the harness could not have run before the prep commit.

## Links
- Plan: `.ufo/scopes/audit-late/plan.md` (ufo-fsd-alpha repo)
- Prior tip: 9b825505c7929ed87be3d992842633f107bf448f
- Next: M-audit-late-0018
