# M-audit-early-0025 — fix(honesty): live-seat semantics — PATH-available ≠ invoked

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
Closes the window's largest single decision thread: what every doctor, lane,
wave and pack may assert about being "live". A seat now requires an *invoked*
vendor host with digit `--version` identity plus a token; `available`,
`kind=real`, `status=live`, `probe.live`, `live_ok`, `honesty=live`,
fixture/shim captures, leftover artifacts, generic LLM keys, and
`preferRealReady` are evidence *kinds*, never seats. Core is a 43-commit
subject-prefixed `fix(honesty):` burst 08-26 16:33:30 → 19:42:59 UTC (3 h 09 m),
ending the run (zero `fix(honesty):` commits after 08-26 23:59:59). Anchor
`bcefb151` (18:36:13, 3 files +69/−7): "doctor available stays path; invoked is
the seat". Preceding the prefix, `1b1d1158` (08-25 19:18:14, 5 files +98/−70)
sets the same contract for surfaces: "tmux/chrome must not authorize model
hosts." Core semantics named across the 43: PATH-available ≠ invoked
(`35639af2`, `2b8419f8`, `bcefb151`); `kind=real` / leftover / omitted are not
seats (`908bb9aa`, `bdc0353b`, `45d0c3aa`, `5c4084cd`); OAuth identity is token +
vendor host, not generic keys (`aa958def`, `aeaaaa03`); liveHost64 incompleteness
gets a precise reason (`279328c5`/`82319d04`/`74ce48a3`); packed doctor /
ufo-control require the Godspeed trilogy (`19a1e44d`, `a4c99083`, `5fd73fd1`);
ufo-runtime Live needs token + digit `--version` (`a3c4c707`). Spans TS/Python/
Rust and packed-doctor surfaces. Decision: a live seat is invoked + vendor digit
`--version` + token; everything else is an evidence kind.

## Gate
```
for s in 1b1d1158 f8f1d69a 95c7e3a0 6a493e16 aa958def 217cd086 2bca9edd 2f3c5a1e \
  81a2bb9e 908bb9aa cff71ddf 2b8419f8 1c7857ff 5319d0ec 3376bb03 3173f3cd 8e136d68 \
  11b7705e cc60aa09 367839e3 1226945c 69c48401 bff3ccce 1ed79872 6985b639 bcefb151 \
  099011fb 35639af2 6f892c3a bdc0353b 5c4084cd 2030d131 a6729b00 45d0c3aa 9666c78a \
  19a1e44d aeaaaa03 279328c5 10c134e4 a3c4c707 a4c99083 82319d04 74ce48a3 5fd73fd1 8d434a33; do
  git cat-file -e ${s}^{commit} && echo "$s ok"
done
git log --no-walk --pretty="%h %ad %s" --date=iso bcefb151 f8f1d69a 5fd73fd1 1b1d1158
# prefix-core count in window (must be 43)
git log --no-merges --since="2026-08-26 00:00" --until="2026-08-26 23:59:59" \
  --pretty=%s | awk '/^fix\(honesty\):/ {n++} END{print "prefix_core="n}'
git show --shortstat --format="" bcefb151 1b1d1158 a3c4c707
```
Expected: 44x ok; first core `f8f1d69a` 16:33:30, last `5fd73fd1` 19:42:59;
anchor `bcefb151` 18:36:13; prefix_core=43; scales match Touches.
Actual: all 44 ok; prefix_core=43; subjects/shortstats match (2026-09-18).
Wave-4 re-run (2026-09-18, HEAD 4adedde6): extended loop printed 45x ok, no failures.

## Touches
- `1b1d1158` Fix --live honesty: tmux/chrome must not authorize model hosts. — 5 files +98/−70
- `f8f1d69a` fix(honesty): MemorySwarmHost leftover is not a live seat — 11 files +148/−16
- `95c7e3a0` fix(honesty): dry artifacts refuse leftover unknown-token live — 4 files +112/−19
- `6a493e16` fix(honesty): preferRealReady is not a live seat without token — 4 files +48/−6
- `aa958def` fix(honesty): GitHub/LLM keys are not sekhmet/xask OAuth — 4 files +72/−8
- `217cd086` fix(honesty): dummy xask/sekhmet is not pair prefer-real live — 4 files +120/−12
- `2bca9edd` fix(honesty): Python invoked host needs digit version identity — 2 files +33/−5
- `2f3c5a1e` fix(honesty): Rust invoked host needs digit version identity — 1 file +28/−9
- `81a2bb9e` fix(honesty): doctorOk requires invoked digit identity — 5 files +38/−5
- `908bb9aa` fix(honesty): prefer-real requires invoked, not kind=real — 3 files +51/−11
- `cff71ddf` fix(honesty): leftover l3-swarm.json is not this-run evidence — 15 files +751/−142
- `2b8419f8` fix(honesty): evidence kinds split path-real from invoked — 7 files +114/−7
- `1c7857ff` fix(honesty): lane-executor tests require invoked, not kind=real — 1 file +60/−4
- `5319d0ec` fix(honesty): hangar dry surfaces skipped realHostProbe — 2 files +57/−15
- `3376bb03` fix(honesty): leftover charter-capabilities.json is not this-run evidence — 9 files +216/−9
- `3173f3cd` fix(honesty): multi-substrate wave JSON uses evidence kinds — 2 files +97/−10
- `8e136d68` fix(honesty): Python wave JSON uses evidence kinds — 2 files +69/−3
- `11b7705e` fix(honesty): leftover foreign-host-pack.json is not this-run evidence — 9 files +245/−12
- `cc60aa09` fix(honesty): dispatch artifact probes use evidence kinds — 5 files +83/−3
- `367839e3` fix(honesty): substrate plan-r0 receipts need this-run tokens — 12 files +404/−85
- `1226945c` fix(honesty): executeLane JSON uses evidence probe kinds — 3 files +23/−4
- `69c48401` fix(honesty): packed selfcheck answers without orch throw — 9 files +377/−71
- `bff3ccce` fix(honesty): lane result toJSON remaps path-only kind — 3 files +63/−21
- `1ed79872` fix(honesty): packed roster gate probes selfcheck — 8 files +553/−20
- `6985b639` fix(honesty): multiWave toJSON remaps path-only probe kinds — 3 files +113/−1
- `bcefb151` fix(honesty): doctor available stays path; invoked is the seat — 3 files +69/−7
- `099011fb` fix(honesty): packed roster gate probes version — 8 files +469/−10
- `35639af2` fix(honesty): orch PATH available is not an invoked seat — 6 files +215/−1
- `6f892c3a` fix(honesty): leftover live_ok needs an invoked host seat — 2 files +54/−3
- `bdc0353b` fix(honesty): sekhmet kind=real is not a live seat — 3 files +34/−4
- `5c4084cd` fix(honesty): leftover honesty=live is not a lane seat — 3 files +37/−4
- `2030d131` fix(honesty): ratchet charter-dry named inventory floor to 35 — 14 files +163/−22
- `a6729b00` fix(honesty): dummy xask PATH + token is not live — 4 files +114/−7
- `45d0c3aa` fix(honesty): omitted invoked cannot authorize a live seat — 12 files +260/−131
- `9666c78a` fix(honesty): Rust xask_live needs digit --version — 1 file +69/−3
- `19a1e44d` fix(honesty): ufo-core-py packed doctor requires Godspeed trilogy — 6 files +150/−10
- `aeaaaa03` fix(honesty): fleet probe.live is not an OAuth seat — 1 file +53/−3
- `279328c5` fix(honesty): liveHost64 incomplete gets a precise reason — 18 files +544/−37
- `10c134e4` fix(honesty): leftover live+stdout is not SYNTHESIS_READY — 2 files +122/−9
- `a3c4c707` fix(honesty): ufo-runtime Live needs token + digit --version — 11 files +370/−59
- `a4c99083` fix(honesty): ufo_core doctor requires Godspeed trilogy — 8 files +240/−22
- `82319d04` fix(honesty): Python liveHost64 names why it is incomplete — 7 files +400/−1
- `74ce48a3` fix(honesty): Rust liveHost64 names why it is incomplete — 7 files +562/−1
- `5fd73fd1` fix(honesty): ufo-control doctor requires Godspeed trilogy — 5 files +186/−4
- `8d434a33` feat(orch): densify prefer-real with doctor/auth-list (TS/Py/Rust) — 12 files +1143−188; wave-4 fold: densifies prefer-real probes (--version + doctor/auth list) and mirrors real_host_cli in TS/Py/Rust
- Paths (as-of 08-26; several crates deleted later — see Findings): packages/xbgst-runtime/src/{lane-executor,real-host-cli,tip-wire}.ts, packages/substrate-runtime/src/{host-status,host-probe,lane-cli}.mjs, packages/ufo-orch/src/{adapters,portable-pack}.ts, crates/ufo-core/src/real_host_cli.rs, crates/ufo-core-runtime/src/fleet.rs, crates/ufo-runtime/src/xask.rs, crates/ufo-control-plane/src/charter_cli.rs, packages/ufo_core/src/ufo_core/real_host_cli.py, packages/ufo-core-py/ufo_core_py/xbgst_root.py

## Out-of-scope
- LIVE-strict harness + D2–D5 decoys — M-audit-early-0013.
- Godspeed filter.md pin war / archive exemption — M-audit-early-0015;
  `359ec187` counted there.
- Hang bounds / group-kill so hung ≠ live — M-audit-early-0024 (honesty
  dependency, distinct contract).
- END-RUN LOCK — M-audit-early-0026.
- Paper task-regime classification `d0af1e00` — Gates C2 / M-audit-early-0012
  territory (L1-named C3 extra; not in the 43-prefix core).
- `cfb786b6` (sekhmet shim fixture stays dry) — fixture-dry sub-family edge;
  cited as family member, not re-listed as core.
- Denial-at-the-source family before the `fix(honesty):` prefix existed
  (08-26 13:43–16:25) and Gates C7 members `63a25731`/`ab969088` — sibling-owned
  per ScoutHonesty R3.
- Tip-SHA / fmt / hangar-portability churn families.

## Findings
- Two different sets, stated honestly. The 43-commit `^fix(honesty):` prefix
  core (08-26 16:33:30→19:42:59 UTC) is exactly reproducible and is what Touches
  quotes. The "165-family" / "163 extended" figure in scout-honesty-report.md is
  a curated union of four hand-defined sub-families (honesty-titled 76,
  live-authorization denial 53, named live-host/shim/OAuth extras 59,
  doctor-honesty extras 5; families overlap → union 163) plus two L1-named
  extras (`d0af1e00`, `cfb786b6`) = 165 — **not reducible to one executable
  predicate**. scout-residual-report.md MAP-HON re-ran a subject-level honesty
  predicate and got 138 in the shared window vs the scout's 162/163 claim
  (disagreement −24); residual marks the extended count unverifiable, not
  refuted. Do not treat 165 as a git-log one-liner.
- Residual twin wave (MAP-HON): 47 residual SHAs mapped into this same decision
  (predicate-level absorption, not a separate beat). Full MAP-HON residual range
  08-26 00:50:22→18:14:25; the concurrent `-honesty` / honesty-labelled twin of
  the prefix burst is 16:29:11→17:36:58 (`738868de` "leftover live_ok is not a
  live seat" through `d9c04a40` "grok/cursor leftover live needs version
  identity"), running alongside the 16:33 prefix core. Exemplars (not in
  Touches): `22f66fc9` "Stop reporting hostStatus=live for vendor chrome and
  tmux"; `02358ebd`/`ba039d7f`/`6b99d67b`/`7cc26041` refuse leftover adapt dumps
  as this-run evidence; `a5e3505c` "Shim the leftover _lib cli-runtime so it
  cannot claim live from PATH". Eight prefer-real / host-CLI-identity members
  also fall inside ScoutInit F10-PORTABILITY — filed here because the changed
  contract is what counts as a live seat (family-granularity dedupe; do not
  double-count).
- Self-corrections are findings, not embarrassments: `908bb9aa` (prefer-real
  keyed off `kind=real` — wrong); `a6729b00` (dummy `xask` on PATH plus a token
  still is not live); `5c4084cd` (leftover `honesty=live` was read as a lane
  seat); `10c134e4` (`live`+stdout was read as `SYNTHESIS_READY`);
  `279328c5`/`82319d04`/`74ce48a3` (bare liveHost64 boolean replaced with a
  precise incompleteness reason). Same contract, successive tightenings.
- As-of framing: keystone paths under `crates/ufo-control-plane`,
  `crates/ufo-runtime`, `crates/ufo-core-runtime` are described as of 08-26;
  `96a4b6b4` (08-29) deletes several of those crates — cite commits, not HEAD
  paths, for anything gone.
- Sharp wave boundary: the 43-commit burst *is* the ending of the run; C3 is a
  closed campaign, not an ongoing trend.
- Wave-4 coverage remediation: 1 member(s) folded from the mis-adjudicated CH-HANGAR-DENSIFY rejection(s) (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha .ufo/scopes/audit-early/plan-r1.md + scout-honesty-report.md (C3) + scout-residual-report.md (MAP-HON)
- Prior tip: 95208744 — anchor of M-audit-early-0024
- Next: M-audit-early-0026
