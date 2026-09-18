# M-audit-early-0050 — fleet-dispatcher: long-haul autonomy for the native fleet

**Status:** COMPLETE | **Date:** 2026-08-31 | **Session:** audit-early

## Does
`ec6d85bf` adds `scripts/fleet-dispatcher.mjs` (1 file, +82) and converts the sighting wall from
operator-driven trials into an unattended loop: under systemd with `Restart=always` it keeps
`FLEET_SIZE` live missions topped up indefinitely. Measured constants: `FLEET_SIZE = UFO_FLEET_SIZE
|| 6`, `POLL_SEC = 120`, `STAGGER_SEC = 8`, run ids `autoroute<N>` from a persisted counter
(`.ufo/fleet-counter.json`, starting at 100), telemetry appended to `.ufo/fleet-ledger.jsonl` as
JSONL (stdout plus best-effort append). The loop shells `node scripts/ufo-sighting.mjs status` for
active run ids; a failed probe logs `wall_probe_failed` and skips the round, a below-target wall logs
`wave_dispatch {active, dispatching}` and then spawns `scripts/run-omp-native-trial.mjs --run-id <id>`
per missing slot (180s timeout, 8s stagger), logging `trial_dispatched` / `trial_dispatch_failed` and
breaking the batch on the first failure ("wall error: stop the batch, retry next poll"); after a
top-up it re-probes immediately, otherwise it sleeps one poll interval. The stated decision is
single-authority: "One authority: it only launches the canonical launcher; the Rust runtime stays the
sole judge", and the body adds that it is "Enabled with linger for unattended weeks-long operation."
The latent failure is structural and was documented eight days later in the data walk of
`e706c4f9` (2026-09-08, beat M-audit-early-0053): `scripts/fleet-dispatcher.mjs` "has no settlement event and
no L2/L3 identity" — the code confirms it, since the only kinds it can emit are `dispatcher_crash`, `dispatcher_start`,
`wall_probe_failed`, `wave_dispatch`, and the `trial_dispatched`/`trial_dispatch_failed` pair, with
nothing recording what happened to a dispatched trial afterwards. The same data walk measured the
ledger the loop produced and is the only surviving record of it: "`.ufo/fleet-ledger.jsonl` had
**16,619** lines. Event counts were: `trial_dispatched=9,670`, `trial_dispatch_failed=1,135`,
`wave_dispatch=3,873`, `wall_probe_failed=1,930`, `dispatcher_start=9`,
`bounty_fleet_dispatched=1`, `farmscout_dispatched=1`" — i.e. a ~10.5% dispatch-failure rate and a
~19% wall-probe-failure rate that the wall itself could not surface. Those numbers are the measured
basis for the L2/L3 process-accounting plan in beat M-audit-early-0053.

## Gate
```
git cat-file -e ec6d85bf^{commit} && echo "ec6d85bf ok"
git log --no-walk --pretty="%h %ad %s" --date=iso ec6d85bf
git show --shortstat --format= ec6d85bf | tail -1
git show ec6d85bf:scripts/fleet-dispatcher.mjs | grep -oE 'log\("[a-z_]+"' | sort -u
git show e706c4f9:docs/L2-L3-ROUTING.md | grep -n '16,619'
```
Expected: SHA resolves; subject "fleet-dispatcher: long-haul autonomy for the native fleet" at
2026-08-31 23:49:59 -0300; 1 file, +82 insertions; the literal event kinds `dispatcher_crash`,
`dispatcher_start`, `wall_probe_failed`, `wave_dispatch`; the 16,619-line ledger sentence present in
the 09-08 plan document.
Actual: all observed exactly as expected (2026-09-18, HEAD 4adedde6): ec6d85bf ok; "ec6d85bf
2026-08-31 23:49:59 -0300 fleet-dispatcher: long-haul autonomy for the native fleet"; "1 file
changed, 82 insertions(+)"; `log("dispatcher_crash" log("dispatcher_start" log("wall_probe_failed"
log("wave_dispatch"`; `37:- .ufo/fleet-ledger.jsonl had **16,619** lines. Event counts were:
trial_dispatched=9,670, trial_dispatch_failed=1,135, wave_dispatch=3,873, wall_probe_failed=1,930,
dispatcher_start=9, bounty_fleet_dispatched=1, farmscout_dispatched=1.`

## Touches
- `ec6d85bf` fleet-dispatcher: long-haul autonomy for the native fleet — 1 file, +82, new `scripts/fleet-dispatcher.mjs`; runtime state `.ufo/fleet-counter.json`, `.ufo/fleet-ledger.jsonl` (not committed)
- Paths: scripts/fleet-dispatcher.mjs, scripts/ufo-sighting.mjs (probed via `status`), scripts/run-omp-native-trial.mjs (canonical launcher it spawns)

## Out-of-scope
- The dispatch-directive campaign that immediately precedes it (`a93d23b7`, 64m earlier, beat
  M-audit-early-0049) — the launcher it calls, not the contract it composes.
- The L2/L3 process-accounting plan and its ledger lifecycle events (`e706c4f9`, beat
  M-audit-early-0053) — cited here, drafted there.
- The sighting mission-row changes (`927f947b`, `5f52e03a`, beat M-audit-early-0051) and the 09-08
  purge sweep (0052).
- Post-window ledger rotation and fleet self-healing work (absent at this SHA) and the sibling
  window after 2026-09-10 — outside this beat.

## Findings
- The systemd unit for this loop is **not in the repository**: the commit adds only the script, so
  the `Restart=always`, linger and enablement claims live in the commit body and on the host, while
  the analogous charter-scribe units are committed (beat M-audit-early-0047). Nothing in-tree pins
  the dispatcher's service definition at this SHA.
- The 16,619-line ledger snapshot is not reproducible at HEAD: the live `.ufo/fleet-ledger.jsonl`
  read on 2026-09-18 held 1,012 lines (1,013 on a re-read moments later — it is a live append file)
  with different event kinds (`process_spawned`, `process_settled`, `process_failed`, `queue_*`),
  i.e. the L2/L3 accounting schema that landed after this window. The counts above are therefore
  cited from the committed data walk in `e706c4f9`, not re-measured.
- Failure visibility is the cluster's real defect, stated in the code's own comment: "wall error:
  stop the batch, retry next poll" — a failed dispatch aborts the remaining batch and the next poll
  re-probes, so a persistently failing wall silently under-fills the fleet with no terminal record.
  The measured ~10.5% dispatch-failure rate is the ledger's evidence of that, not the wall's.
- The loop writes the counter file before dispatching (`nextRunId` persists `counter + 1`, then
  `dispatchTrial` runs), so a crashed or failed dispatch still consumes a run id — visible in the
  ledger as ids with no matching success event.
- Both this beat and the preceding campaign commit are the same evening's operator session (22:45 and
  23:49 -0300); the fleet exists to run the qwen-seat contract unattended, which is why the
  directive campaign's residue (seat-level yield compliance) matters to the fleet's failure rate.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-late-report.md` (C5)
- Prior tip: `89e35be9` (anchor of M-audit-early-0049)
- Next: M-audit-early-0051
