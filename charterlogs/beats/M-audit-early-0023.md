# M-audit-early-0023 — Charter-CLI surface becomes a packaged, provable contract

**Status:** COMPLETE | **Date:** 2026-08-26 | **Session:** audit-early

## Does
The charter's named CLIs stop being a hand-listed eight and become a derived, shippable, doctor-answering surface. `2f842bda` (6 files +43/−4) gives the Rust control plane first-class argv and package artifacts for charter L2 xask and L3 sekhmet — "Tests cover the contracts only; live OAuth is still not claimed"; `aac85773` (4 files +132/−23) degrades an absent xask/sekhmet host to the deterministic executor, records `substrate_fallback` and still saturates, under the same not-claimed line, and `da700a85` extends local-dry degradation to Grok/Kimi/Codex/Cursor/OpenCode/xask/sekhmet. `a7da46ed` (29 files +300/−94) deletes the hardcoded pack roster: published bins point at `bin/cli.mjs` so a packed install can answer doctor and capabilities, and the pack gate derives its roster from `docs/charter-named-clis.json` and runs each tarball in a clean consumer; `784e5938` (18 files +1566/−64) proves the result — package verbs no longer require `@ufo/orch`, and a clean tarball consumer with orch hidden still gets `neverFakeLive` JSON on all 35 charter-named CLIs, recorded by `pack-substrates.sh` and a new `gates.sh` check. `1536930e` (29 files +502/−19) then seats honest dry adapters for the four live charter names that had no substrate package and sat outside the completeness need-list (grok-build-config-builder, plazir18, burnerchrome, plazir-15-site), each refusing Gemini, forbidden from judging, and stating its unsupported native behavior; it also adds plazirhangar and PATH xask to the need-list and freezes the named inventory. `f27f008a` (16 files +1101/−46) has the charter-dry harness walk every named CLI, fail closed if `docs/charter-named-clis.json` shrinks or drops an id, and expose the `ufo-control` CLI. The tarballs had not worked before any of this: `7414cd37` (127 files +2467/−2004) — every `substrates/<id>/bin/cli.mjs` imported `../../_lib/cli-runtime.mjs`, a parent path npm cannot put in a tarball, so "all eight packed charter CLIs died with ERR_MODULE_NOT_FOUND on their first verb" — moves the shared runtime to `@ufo/substrate-runtime` and makes `scripts/pack-substrates.sh` install its own tarballs into a clean consumer instead of stopping at `npm pack --dry-run`; `96f1b583` resolves the loop CLI through a hoisted install (`@ufo/cli` declares only `bin`) and wires that script into `gates.sh`, "which is why eight unstartable tarballs went unnoticed"; `adbfd811` makes `substrates/*` the workspace roster after a hand-picked list dropped new charter CLIs at ERR_MODULE_NOT_FOUND; `48e201ff`/`9c1b583a` select a substrate CLI by "whether it ships an executable" and keep each roster keyed on a property the gate it belongs to does not itself check, so no gate can be satisfied by deleting what it exists to check. Bootstrapping fixes: `b5153d45` (16 files +289/−21) replaces `probeHostClis` spawnSync("command"), "which always ENOENTs because command is a shell builtin" and made `ufo doctor` report every host missing; `fa1c4e89` points doctors at the published `@ufo/substrate-lib` export; `dc2fe829` keeps missing-host doctors ok (exit 2 only when the host binary is absent); `cc6cf913` renames the `@ufo/hangar-ufo-fsd` bin to hangar-ufo-fsd so charter keeps `ufo-fsd`; `b7db22a6` (5 files +390/−1) resolves the charter slot → served-package map, mutation-checked on a renamed package, an unmapped id, a missing install-local and a deleted bin, where nothing in the suite had opened `docs/CHARTER-CLI-MAP.md`. Contract seating: `8031919e` (16 files +986/−82) raises LoopDriver to real process specialists and pins argv/doctor/install for every charter-named CLI; `444555ef` wires port-local xask/sekhmet/prime/xbreed PATH wrappers with `UFO_HOST_MODE` labels; `a6dd4fc7` proves cardinality and installs 35 charter packs in batch, documenting the port-local unlock; `052e00b2` says how to satisfy the host-CLI gate when it fails; `f507d6c6` seats status/doctor on pack and wheel fingerprints and stops climbing into a parent checkout; `ed84e475` closes the other door onto the adapt expansion pool (`ufo-memory adapt-between-rounds` forwarded the body untouched, so Rust got the hand-thin six-lane pool while TS got the tip's sixteen); `db14aacd` expands the Rust/TS/Py rosters to all 12 dense charter packages. Twins and seatings: `4c715b70`/`fc7a0142` add the Python and TypeScript charter-dry missing-host twins of the Rust helper, `ff1a663d`/`3c19134d` pack TS/Python/Rust cold-tree charter-dry parity with host CLIs stripped from PATH, `81aeba0d` (named inventory 33), `f0c27ce7` (33→34) and `6f123d89` (34→35) un-collapse grok-web, grok-titanium and xbreed-team-slash into their own packs, `6e13ac58`/`8eef7ead` fix those doctors' declared host roles, `15908629` densifies thin aliases, `64ef1a8e` labels cursor L1-port substrates `runnable-thin`, `1215c241` seats pack-local dry on six named-CLI holes ("35/35 pass. Green map is not a live L3 claim"), `8d10c5ba` (12 files +365/−78) closes the crates.io-XOR-offline detached `ufo-cli` pack and keeps "crates.io publish independence … claim_forbidden", and `24dbdc96` completes the loop's exposure of substrate CLIs.

## Gate
```
# cwd = repo root
for s in 7414cd37 ed84e475 96f1b583 9c1b583a 48e201ff db14aacd b5153d45 cc6cf913 444555ef a6dd4fc7 052e00b2 b7db22a6 1536930e 2f842bda adbfd811 aac85773 da700a85 8031919e a7da46ed 4c715b70 fc7a0142 dc2fe829 f27f008a f507d6c6 ff1a663d 24dbdc96 3c19134d fa1c4e89 64ef1a8e 81aeba0d 6e13ac58 f0c27ce7 15908629 6f123d89 8eef7ead 784e5938 1215c241 8d10c5ba; do git cat-file -e ${s}^{commit} >/dev/null && echo ok; done | sort | uniq -c
git log --no-walk --pretty="%h %s" 1536930e
git log --no-walk --shortstat --pretty="%h %s" 1536930e | tail -1
git log --no-walk --pretty="%h %s" 784e5938
```
Expected: `38 ok` (one cat-file -e per Touches SHA, no failures); the anchor prints its Touches subject
verbatim with scale `29 files changed, 502 insertions(+), 19 deletions(-)`.
Actual (2026-09-18, HEAD 4adedde6): loop counted `38 ok`; cross-check printed
`1536930e Add honest dry adapters for remaining charter-named CLIs.` ·
`29 files changed, 502 insertions(+), 19 deletions(-)`; `784e5938 Prove every named CLI packed bin
answers doctor/capabilities/help.`. All as expected.

## Touches
- `7414cd37` Ship the shared charter-CLI runtime inside the tarballs that need it — 127 files +2467/−2004
- `ed84e475` Close the CLI door on the adapt expansion pool — 4 files +191/−51
- `96f1b583` Resolve the loop CLI through a hoisted install, and gate the packed shape — 3 files +142/−9
- `9c1b583a` Identify a charter surface by a property the gate does not itself check — 8 files +59/−36
- `48e201ff` Select substrate CLIs by whether they ship an executable — 1 file +39/−19
- `db14aacd` feat(core): Rust multi-substrate + full 12-charter wave map — 11 files +909/−219
- `b5153d45` fix(orch): make host-cli doctor and portable packs work for local users — 16 files +289/−21
- `cc6cf913` Fix hangar/charter ufo-fsd bin clash; clear plazir markers; pack napi. — 199 files +57/−1657
- `444555ef` Wire port-local xask/sekhmet/prime/xbreed PATH wrappers honestly. — 10 files +699/−21
- `a6dd4fc7` Prove charter CLI cardinality and document port-local host unlock. — 3 files +120/−53
- `052e00b2` Say how to satisfy the real-host-CLI gate when it fails — 1 file +6/−1
- `b7db22a6` Resolve the charter slot -> served package map instead of asserting it — 5 files +390/−1
- `1536930e` Add honest dry adapters for remaining charter-named CLIs. — 29 files +502/−19
- `2f842bda` Seat xask and sekhmet as control-plane CLI contracts. — 6 files +43/−4
- `adbfd811` Seat every charter substrate as a workspace package. — 3 files +461/−16
- `aac85773` Degrade missing xask/sekhmet hosts to a local dry run. — 4 files +132/−23
- `da700a85` Degrade every packaged charter CLI to local dry when the host is missing. — 4 files +37/−14
- `8031919e` Raise LoopDriver to real process specialists and pin CLI contracts. — 16 files +986/−82
- `a7da46ed` Pack every charter-named CLI, not a hardcoded eight. — 29 files +300/−94
- `4c715b70` Add Python charter-dry missing-host twin of the Rust helper. — 7 files +711/−1
- `fc7a0142` Add TypeScript charter-dry missing-host twin of the Python/Rust helpers. — 10 files +888/−2
- `dc2fe829` fix(cli): remaining named CLI doctors stay ok when host is missing — 3 files +64/−6
- `f27f008a` feat(charter-dry): walk every named CLI and expose ufo-control CLI — 16 files +1101/−46
- `f507d6c6` feat(ufo_core): seat status/doctor on pack and wheel fingerprints — 14 files +754/−134
- `ff1a663d` feat: TS/Rust cold-tree portable charter-dry pack parity — 17 files +1065/−34
- `24dbdc96` Remove scalar weights from the orch loop and expose substrate CLIs. — 1 file +1
- `3c19134d` feat(portability): cold-tree Py/TS/Rust charter-dry parity — 13 files +807/−66
- `fa1c4e89` fix(substrates): resolve doctor via @ufo/substrate-lib — 8 files +14/−7
- `64ef1a8e` fix: label cursor L1-port substrates runnable-thin — 2 files +2/−2
- `81aeba0d` feat(substrates): seat charter CLI grok-web as its own package — 24 files +546/−39
- `6e13ac58` fix(grok-web): use declared cdp role; assert argv0 not sibling names — 2 files +5/−2
- `f0c27ce7` Seat charter CLI grok-titanium as its own local pack. — 21 files +568/−23
- `15908629` Seat grok-titanium charter CLI and densify thin aliases. — 57 files +1395/−90
- `6f123d89` feat(charter): seat xbreed-team-slash as own slash pack — 21 files +596/−24
- `8eef7ead` fix(charter): host role for xbreed-team-slash doctor — 7 files +13/−14
- `784e5938` Prove every named CLI packed bin answers doctor/capabilities/help. — 18 files +1566/−64
- `1215c241` fix(charter): seat pack-local dry on six named CLI holes — 39 files +1154/−162
- `8d10c5ba` fix(portability): close crates.io XOR offline detached ufo-cli pack — 12 files +365/−78
- Paths (as of 2026-08-26; several deleted on 2026-08-29 — the deleting commit is cited in Findings): `docs/charter-named-clis.json`, `docs/CHARTER-CLI-MAP.md`, `substrates/`, `packages/substrate-runtime`, `packages/substrate-lib`, `packages/ufo-control`, `scripts/pack-substrates.sh`, `scripts/assert-charter-cli-map.mjs`, `crates/ufo-control-plane`

## Out-of-scope
- Sibling residual clusters: N-F foreign-host packed-runtime portability (beat 0020) is the same packing theme but a different contract; N-A in-env/offline-L3 seating, N-C hang bounds, N-D refuse-invented-values (beat 0019), N-E tree-confined resolution (beat 0022), N-G F-C finding series.
- The 08-25 pack landing is beat 0004; this beat is the 08-26 hardening that turns that landed surface into a provable per-name contract.
- Churn families (hangar/plazir densify, tip-SHA bookkeeping, fmt sweeps, restore, lockfile) and the tz-boundary leak accounting.
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- Subject-vs-diff drift worth quoting: `24dbdc96` is titled "Remove scalar weights from the orch loop and expose substrate CLIs." and its body states "κ_accept stays Pareto-only … saturation is the success exit", but the diff is a single added line in `package.json` (`"doctor": "node packages/cli/dist/cli.js doctor"`), 1 file +1, 0 deletions. The described removals are not in this commit.
- The named inventory is a moving number on this day: `81aeba0d` records it as 33 (grok-web un-collapsed), `f0c27ce7` 33→34 (grok-titanium), `6f123d89` 34→35 (xbreed-team-slash). Every "all 35 named CLIs" claim in this cluster is therefore as-of 17:58 UTC on 08-26, not of the day's start (`1536930e` froze the inventory earlier the same day).
- Honesty ceiling is stated by the cluster itself and never exceeded in these commits: `2f842bda` "Tests cover the contracts only; live OAuth is still not claimed"; `aac85773`/`da700a85` "Live OAuth is still not claimed"; `f27f008a` "Not a live OAuth or L3 claim"; `1215c241` "Green map is not a live L3 claim"; `8d10c5ba` "crates.io publish independence remains claim_forbidden" with "Goal stays OPEN".
- Two upstream defects are recorded in-commit as reasons the surface had never been provable: `7414cd37` (every packed charter CLI died on its first verb; `pack-substrates.sh` "described a tarball it never ran") and `96f1b583` (`pack-substrates.sh` "had only ever been an npm script", so the eight broken tarballs passed unnoticed).
- As-of discipline: `96a4b6b4` (2026-08-29) deleted the `packages/substrate-*` tree (6,239 paths), `scripts/pack-substrates.sh`, `scripts/assert-charter-cli-map.mjs` and `crates/ufo-control-plane/src/charter_cli.rs`; `docs/charter-named-clis.json` and `docs/CHARTER-CLI-MAP.md` still exist at HEAD. Everything above is described as of 08-26.
- `1536930e` also refreshed LKG SHAs from reference clones kept outside this tree; that refresh is a pin event, not a charter-surface decision.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-residual-report.md` (N-B)
- Prior tip: d6b4822e — anchor of M-audit-early-0022
- Next: M-audit-early-0024
