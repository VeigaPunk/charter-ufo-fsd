# M-audit-early-0020 — Foreign-host packed-runtime portability + host-CLI installation

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
The cluster's lead artifact is an honest gap record, not a capability: `06e96a21` (6 files +117/−8) emits a carryable air-gapped bundle (`NONET_BUNDLE=<dir>` — tarballs, warmed npm cache, INSTALL.md) "out of the same warm phase the gate just verified, so the operator artifact and the proof cannot describe different content", and states that the audits had carried "each package works outside this checkout" as if it covered an operator host with no registry access — "It did not: every pack behind that row installs with `--offline=false`. Both audits now separate the two claims", plus that "the committed three-real-CLI artifact came from a concurrent lane's host, not from this VM". `0418957b` (4 files +317/−100) then makes that bundle self-sufficient and proves it from the bundle alone: `export_foreign_host_seed` carries the real trilogy/WWKD/lanes bytes into the bundle, a new phase installs, seeds and self-iters inside the same no-network namespace (`verifiedBundleOnly`), and doctor resolution moves from a `node_modules/@ufo/substrate-*` glob to published package names, which had skipped `@ufo/hangar-ufo-fsd` entirely. `90350af5` (1 file +32/−1) pins each seeded posture byte to the same `vendor/last-known-good` gold the repo fidelity check holds the repo to, because "Presence of each seated surface was checked; fidelity was not". The installability work: `1718dbc4` (1 file +10/−2) packs `@ufo/orch`, whose unpublished-but-declared status sent npm to `registry.npmjs.org` for `@ufo%2forch` and returned E404 before the first substrate — "silently: the npm output goes to a log inside the work directory that the exit trap deletes, so the run ended with no diagnostic at all"; `fa4a24b8`/`b44abfc3` and `281f78f1` (1 file +36/−3) follow with the remaining unpublished peers (`umwelt-plan`, `plazir-handoff`, the cursor/codex hangars, `@ufo/substrate-lib`), and `682b90f7` (1 file +8) ships the two tip materials the packed consumer is held to; `22e060c4` (26 files +567/−417) splits total from partial tip absence so a foreign host is reported `tipWire.applicable` instead of failed for this monorepo's tips, while `a917ebb7`/`9f511759` stop the runtime's own bundled tips from counting as corpus evidence (that guard was true wherever it could run) and make the refusal per-material — the decision being that a checkout still owes every tip and a packed install owes only what its own packs carry, rather than relaxing the assertion. `cbf5bb0f`/`604a1084` let a packed substrate dispatch and inject the kimi tip skill off-monorepo; `735244ed` (12 files +605/−70) seats live-host PATH inject and offline L3 in orch judge rounds; `d48e98ff` (10 files +197/−36) installs public host CLIs plus `fnm` certified-64, and `77b7fb51` adds Cloud Agent `environment.json` with an idempotent install bootstrap. `3cc1918e` (8 files +1049/−11) turns each substrate's declared status into a measurement taken outside the checkout under `unshare -rn`, which surfaced three defects visible only off-checkout (an unconditional `../..` repo-root resolution, `--live` accepted and ignored with `dryRun` hardcoded true, a local runner that never emitted `phaseLog`); `45ed26dd` (254 files +9274/−65) ships cursor-agent orch and surface tooling into the Origin-private alpha; `f3729834`, `4f2a2184`, `a6b9c352`, `918d4699`, `63980650` (20 files +1280/−70) and `1098fea7` seat the packed specialist/wheel surfaces and prove the TS/Rust cores from `npm pack`/`cargo package` installs in a clean `/tmp` tree — "Surfaces that still need SSoT fail closed with `XBGST_ROOT` rather than silently claiming independence". Roster/parity work: `8ec88a94`, `91d67d4d`, `79f40d34`, `c1f904cd`, `61c81f15`, `c3595bce`, `835647ed` (honest `peakConcurrent`), `3dddaef6`, `168bc02c`, `611e7e7c`, `f3a44eef`.

## Gate
```
# cwd = repo root
for s in 22e060c4 168bc02c 8ec88a94 91d67d4d 79f40d34 735244ed cbf5bb0f 604a1084 835647ed 1718dbc4 682b90f7 d48e98ff 281f78f1 fa4a24b8 a917ebb7 9f511759 b44abfc3 c1f904cd c3595bce 61c81f15 06e96a21 f3729834 0418957b 90350af5 3dddaef6 77b7fb51 611e7e7c f3a44eef 3cc1918e 45ed26dd 4f2a2184 a6b9c352 918d4699 63980650 1098fea7 0be37d56 2b4586fa 2bc9424e 55eda29e 641ddc46 6fbccf1e 78a19ade 9e992ab5 b0749f13 b6c65c38 da6c13c6 dfdd314b e12cd9d2 e78e22d4; do git cat-file -e ${s}^{commit} >/dev/null && echo ok; done | sort | uniq -c
git log --no-walk --pretty="%h %s" 1718dbc4
git log --no-walk --shortstat --pretty="%h %s" 1718dbc4 | tail -1
git log --no-walk --pretty="%h %s" 06e96a21
```
Expected: `35 ok` (one cat-file -e per Touches SHA, no failures); the anchor line prints its Touches
subject verbatim with scale `1 file changed, 10 insertions(+), 2 deletions(-)`.
Actual (2026-09-18, HEAD 4adedde6): loop counted `35 ok`; cross-check printed
`1718dbc4 Pack @ufo/orch too, or the packed runtime 404s on a foreign host` ·
`1 file changed, 10 insertions(+), 2 deletions(-)`; `06e96a21 Emit a carryable air-gapped bundle and
record the portability gap honestly`. All as expected.
Wave-4 re-run (2026-09-18, HEAD 4adedde6): extended loop counted 49 ok, no failures.

## Touches
- `22e060c4` Distinguish a foreign host from a stripped tree in the tip wire — 26 files +567/−417
- `168bc02c` Fix kimi Node>=22.19 health; document secret-injection blockers. — 11 files +461/−143
- `8ec88a94` Derive the hangar-parity roster instead of listing seven of twelve — 3 files +70/−9
- `91d67d4d` Derive the substrate-portability roster too — 1 file +15/−14
- `79f40d34` Key the Rust substrate roster on the hangar too — 16 files +114/−109
- `735244ed` Seat live-host PATH inject and offline L3 in orch judge rounds. — 12 files +605/−70
- `cbf5bb0f` Let a packed substrate dispatch without this monorepo's kimi tip — 3 files +72/−27
- `604a1084` Ship the kimi tip skill so a packed runtime can inject it off-monorepo — 7 files +473/−4
- `835647ed` Prove portable pack e2e and honest parallel peakConcurrent. — 12 files +579/−83
- `1718dbc4` Pack @ufo/orch too, or the packed runtime 404s on a foreign host — 1 file +10/−2
- `682b90f7` Ship the tip materials the foreign-host consumer is asked to have — 1 file +8
- `d48e98ff` feat(host): public CLIs + fnm certified-64 + one-command dev-verify — 10 files +197/−36
- `281f78f1` Hand ci-pack every unpublished peer the packed runtime now needs — 1 file +36/−3
- `fa4a24b8` Let the packed runtime install and run on a host that has only the runtime — 4 files +48/−6
- `a917ebb7` Stop the runtime's own tips from making it demand its peers' tips — 3 files +43/−3
- `9f511759` Ask a packed host only for the tips it could actually have — 3 files +142/−7
- `b44abfc3` Stop requiring an unpublished sibling to install the packed runtime — 3 files +72/−4
- `c1f904cd` Teach the portability gate the hangar ufo-fsd bin name — 1 file +9/−1
- `c3595bce` Add Python/Rust per-round hangar dry capture parity. — 13 files +987/−53
- `61c81f15` Finish the hangar-ufo-fsd bin rename in the portability checker — 1 file +19/−5
- `06e96a21` Emit a carryable air-gapped bundle and record the portability gap honestly — 6 files +117/−8
- `f3729834` Fix the framework-agents resolver so a .agent.md lane prompt is found — 2 files +110/−14
- `0418957b` Make the air-gapped bundle self-sufficient and prove it from the bundle alone — 4 files +317/−100
- `90350af5` Pin the bundle's seeded posture bytes to the last-known-good gold — 1 file +32/−1
- `3dddaef6` Wire tip-shaped ufo-core-runtime with paper-parity fill for SRC-PARTIAL — 81 files +5525/−84
- `77b7fb51` Add Cloud Agent environment.json and idempotent install bootstrap — 4 files +205/−16
- `611e7e7c` Give the hangar-dry artifact's two facts two keys — 1 file +1/−1
- `f3a44eef` Give the hangar-dry-fix artifact's slug and description distinct keys — 1 file +1/−1
- `3cc1918e` Make each substrate's declared status a measurement, off-checkout — 8 files +1049/−11
- `45ed26dd` Ship cursor-agent orch + surface tooling into Origin-private alpha. — 254 files +9274/−65
- `4f2a2184` Fix packed substrate bins to import makeBin from in-package lib — 7 files +7/−7
- `a6b9c352` fix: distinct Python cores and packed XBGST_ROOT seating — 51 files +1892/−87
- `918d4699` Seat packed specialist agent briefs for cold orch/wheel installs — 105 files +7319/−129
- `63980650` feat: prove TS/Rust cores from packed installs outside checkout — 20 files +1280/−70
- `1098fea7` fix(pack): copy published ufo_core src+pyproject, not tests/ — 2 files +36/−4
- `0be37d56` Make the portability gate cover every substrate and read back its own evidence — 4 files +113−28; wave-4 fold: portability gate covers every substrate and reads back its own evidence
- `2b4586fa` fix(substrates): selfcheck orch-dist must resolve @ufo/orch off-monorepo — 1 file +25−4; wave-4 fold: selfcheck resolves @ufo/orch off-monorepo (packed install)
- `2bc9424e` fix(smoke): accept honest exit 2 from kimi substrate doctor — 1 file +7−1; wave-4 fold: smoke accepts honest exit 2 from the kimi substrate doctor
- `55eda29e` Raise the evidence bar one rung per round, and honour the width a round chose — 9 files +1162−441; wave-4 fold: raises the evidence bar one rung per round and honours the round’s width
- `641ddc46` Make the portability axis measure the portable surface instead of six directories — 2 files +201−8; wave-4 fold: makes the portability axis measure the portable surface, not six directories
- `6fbccf1e` Let the substrate doctors report dry-only without failing the gate — 1 file +22−3; wave-4 fold: substrate doctors report dry-only without failing the gate
- `78a19ade` fix(portability): E7-aware foreign-host seed for CI pack gate — 4 files +35−21; wave-4 fold: E7-aware foreign-host seed for the CI pack gate
- `9e992ab5` Densify clause-3 hangars and harden outside-cloud packaging. — 77 files +11928−125; wave-4 fold: densifies clause-3 hangars and hardens outside-cloud packaging (new portability scripts)
- `b0749f13` fix(portability): seed ufo-fsd overlay judgeId=xbgst for CI pack — 5 files +29−11; wave-4 fold: seeds judgeId=xbgst in the CI pack so clean-temp dry self-iter stays green
- `b6c65c38` fix(scripts): let the offline smoke pass offline — 1 file +27−4; wave-4 fold: offline smoke passes offline (exit-2 doctors)
- `da6c13c6` Make the substrate selfcheck ask where the orchestrator resolved, not for a dist path — 4 files +70−22; wave-4 fold: selfcheck asks where the orchestrator resolved, not for a dist file
- `dfdd314b` Let the packed run stop when it runs out of questions, not rounds — 1 file +13−2; wave-4 fold: packed run stops when it runs out of questions, not rounds
- `e12cd9d2` Let the evidence ladder ask its questions on a foreign host — 39 files +1418−302; wave-4 fold: evidence ladder asks its questions on a foreign host
- `e78e22d4` fix(smoke): tolerate honest exit 2 from grok substrate doctor — 1 file +5−2; wave-4 fold: same honest exit-2 tolerance for the grok substrate doctor
- Paths (as of 2026-08-26; several deleted on 2026-08-29 — the deleting commit is cited in Findings): `scripts/ci-pack-clean-temp.sh`, `scripts/foreign-host-pack.sh`, `scripts/pack-substrates.sh`, `packages/xbgst-runtime`, `packages/substrate-*`, `crates/ufo-core`, `.cursor/environment.json`

## Out-of-scope
- Sibling residual clusters from the same adjudication: N-A in-env/offline-L3 multi-substrate seating, N-C hang bounds, N-D refuse-invented-values (beat 0019), N-E tree-confined resolution (beat 0022), N-G F-C finding series. N-B (charter-CLI packaged contract) is beat 0023 and shares this cluster's day but not its SHAs.
- The 08-25 pack landing itself is not re-litigated here — see M-audit-early-0004; the same evening's portability gate/doctor machinery and evidence ladder are this beat's own content (folded above), not 0004's. This beat is the 08-26 foreign-host/portability hardening.
- Churn families from the adjudication (tip-SHA/GOAL bookkeeping, hangar densify, fmt sweeps, restore, lockfile) and the tz-boundary leak band accounting.
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- `06e96a21` is a self-reported claim-boundary correction, quoted above: "works outside this checkout" had been carried as if it covered a registry-less operator host, and the committed three-real-CLI evidence came from a concurrent lane's host.
- `0418957b` self-reports that its own documented flow could not complete before it: the bundle's INSTALL.md "told the operator to seat the orch surfaces with a repo script the bundle did not contain — on an air-gapped host there is no repo, so the documented flow could not complete. The cold phase never noticed because it seeded from `$ROOT`."
- Two failure modes in this cluster were silent by construction: `1718dbc4` (npm output in a log the exit trap deletes) and `281f78f1` (ci-pack "died before writing a summary, so the gate said nothing about why").
- `22e060c4` supersedes the earlier unconditional tip-wire fail-closed behaviour introduced by `31482de0`, which had made every packed self-iteration exit 1 while doctor still passed.
- `63980650` states "Parent goal remains OPEN" — the packed-install proof is a rung, not a completion claim.
- As-of discipline: `96a4b6b4` (2026-08-29) deleted `scripts/ci-pack-clean-temp.sh`, `scripts/foreign-host-pack.sh`, `scripts/pack-substrates.sh` and the `packages/substrate-*` tree (6,239 paths); this beat describes those surfaces as of 08-26 and cites commits, not HEAD paths.
- Scale drift inside the cluster is ordinary (roster derivations and twins); no subject-vs-diff contradiction was found in these 35 commits.
- Wave-4 coverage remediation: 14 member(s) folded from the mis-adjudicated F10-PORTABILITY, F8-GATES and F5-HANGAR rejection(s) (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-residual-report.md` (N-F)
- Prior tip: dc99bcc8 — anchor of M-audit-early-0019
- Next: M-audit-early-0021
