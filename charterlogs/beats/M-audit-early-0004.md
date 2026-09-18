# M-audit-early-0004 — Charter-CLI portable surface: packs, entry-point repairs, desk reversal

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
Merged beat over three source clusters (gates C8 portable baseline, init-C6 pack members, pins-C6
substrate/desk portability). `6bd0c472` "build portable UFO FSD orchestration baseline" (20 files
+1598/−18, 18:14) opens the portable FSD line, carried by `a275b520` Round 2 (13 files +1059/−29),
`ab2a7978` Round 3 (1510 files +2,039,860/−20, LKG trees) and `5ba76003` Round 4 (532 files
+45627/−17). The charter-CLI surface lands in stages: `53e368bc` adds the last-known-good remotes,
xbreed core deps and the remaining charter CLIs (2249 files +345800/−1), `3abb230b` recreates the
substrates CLI packages for charter ports (25 files +333), `7d54d65a` widens `TargetCli` from 8 to 11
seams — `pub const ALL: [Self; 11]` adds `xbgst-stack`, `xbreed`, `xbrd-spark` (4 files +22/−8) —
`3f60d604` builds the portable pack of vendored lib + published upstream files + standalone install
(62 files +3607/−425) with the stated decision "Raise portability without lowering frontier scores"
and "No new remote fork.", and `b0ca96d1` gives "every charter CLI a local doctor/loop runner that
degrades honestly without host OAuth" (54 files +1025/−871). `2c719d4f` wires private LKG sync,
XBGST_LIVE wave hooks and sekhmet -j gates (200 files +14156/−294); `44ba6ab6` is the r5 64-pane
stress / saturation-probe / npm+port-smoke lane (32 files +3428/−1367) merged into the tree at
`a27bc038` (merge of `44ba6ab6` and `f8ac2db4`; 767 files +84048/−2856). Pack proof follows:
`ecf07631` proves packed installs work outside the monorepo (27 files +433/−63), `846922f2` adds the
CI clean-temp npm-pack → doctor + dry self-iter gate (2 files +388), `f550086f` proves the packed
packages install and saturate with no network at all (6 files +439/−40), `4fc36145` proves the
off-checkout pack and the crates.io exclusive-or (21 files +925/−41). The loop itself becomes
pack-runnable on 08-26: `98d5493b` spawns `loop_specialist.py` as real child processes (5 files
+209/−5), `d14743f2` runs it on a hostless cold tree in Python (10 files +631/−15), `2eb8b602` in
TypeScript (13 files +704/−12), `da8db685` in Rust (13 files +769/−49), `34521438` fixes the
loop-specialist fixture resolution (2 files +12/−1), `f0ef586c` isolates the packed-seat doctor PATH
and pins the sekhmet bin (12 files +195/−31). The desk cluster reverses inside 3m43s: `9d6fd8ae`
seats the ufo-desk adapter (4 files +16/−1, 19:03:56), `8239af45` drops the judging desk adapter
(15 files +315/−823, 19:07:39) with the body "Desk remains must-not-judge (no ufo-desk crate)."
Evidence-only members close the surface: `e9de0f3b` (1 file +16), `bc7cf250` (3 files +11/−4),
`f4f3ac40` (1 file +5). One line of reasoning: portability was raised by publishing upstream files
and vendoring the shared lib per package rather than by opening a new remote fork.

## Gate
```
for s in 6bd0c472 a275b520 ab2a7978 5ba76003 53e368bc 3abb230b 3f60d604 7d54d65a b0ca96d1 2c719d4f 44ba6ab6 a27bc038 9d6fd8ae 8239af45 ecf07631 846922f2 8685f688 f0ef586c 98d5493b d14743f2 2eb8b602 da8db685 34521438 f550086f 4fc36145 e9de0f3b bc7cf250 f4f3ac40 32b58825 367b16c4 6d53b1a0 7b2b2774 ab6d4c2b d148293e fb992b34; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %s" 8685f688
git show --shortstat --format= 8685f688 | tail -1
git show 7d54d65a^:src/adapters.rs | sed -n '/pub const ALL/,/];/p' | grep -c "Self::"   # 8 before
git show 7d54d65a:src/adapters.rs | sed -n '/pub const ALL/,/];/p' | grep -c "Self::"   # 11 after (seam table only; whole-file count is 22)
```
Expected: 28x "ok"; the entry-point repair subject verbatim and its 2-file/+171 scale; TargetCli seam
count 8 → 11.
Actual (observed 2026-09-18, HEAD 4adedde6): 28/28 ok (`f0ef586c ok`, `e9de0f3b ok`, `bc7cf250 ok`,
`f4f3ac40 ok` at the tail); "8685f688 fix(substrates): repair 15/26 native charter CLI entry points
broken under real invocation"; "2 files changed, 171 insertions(+), 1 deletion(-)"; seam counts 8 and
11.

Wave-4 re-run (2026-09-18, HEAD 4adedde6): 35/35 `ok` — extended cat-file loop (28 original + 7 folded SHAs) exited 0, no unresolved token.

## Touches
- `6bd0c472` build portable UFO FSD orchestration baseline — 20 files +1598/−18
- `a275b520` feat: Round 2 — xask dry, spawn hooks, sekhmet L3, mold fallback — 13 files +1059/−29
- `ab2a7978` feat: Round 3 — observability axis, gx-teams tmux, sekhmet live — 1510 files +2,039,860/−20
- `5ba76003` feat: Round 4 — velocity axis, parallel gx-teams wave, xask mock live — 532 files +45627/−17
- `53e368bc` Add last-known-good remotes, xbreed core deps, and remaining charter CLIs. — 2249 files +345800/−1
- `3abb230b` Recreate substrates CLI packages for charter ports. — 25 files +333
- `7d54d65a` Cover complete charter CLI portability surface — 4 files +22/−8; src/adapters.rs `TargetCli::ALL` 8 → 11
- `3f60d604` feat(substrates): portable pack — vendored lib, upstream files, standalone install — 62 files +3607/−425
- `b0ca96d1` Seat paper rules, empirical specialists, and shared substrate runners. — 54 files +1025/−871
- `2c719d4f` feat(iter-6): private LKG sync, XBGST_LIVE wave hooks, sekhmet -j gates — 200 files +14156/−294
- `44ba6ab6` feat(r5): 64-pane stress, saturation probe, npm + port smoke — 32 files +3428/−1367
- `a27bc038` feat(r5): merge 64-pane stress, saturation probe, npm + port smoke — merge, 767 files +84048/−2856
- `9d6fd8ae` Seat ufo-desk adapter and pin hangar Godspeed copies to SSoT. — 4 files +16/−1
- `8239af45` Restore a coherent Rust ufo-core API, pin live Godspeed copies to SSoT, and drop the judging desk adapter. — 15 files +315/−823
- `ecf07631` Prove packed installs work outside the monorepo. — 27 files +433/−63
- `846922f2` feat(portability): CI clean-temp npm pack → doctor + dry self-iter gate — 2 files +388
- `8685f688` fix(substrates): repair 15/26 native charter CLI entry points broken under real invocation — 2 files +171/−1
- `f0ef586c` fix(fc3-node): packed-seat doctor PATH isolation + sekhmet bin pin — 12 files +195/−31
- `98d5493b` feat(self-iter): spawn loop_specialist.py as real child processes — 5 files +209/−5
- `d14743f2` feat(ufo_core): portable pack runs self-iter on a hostless cold tree — 10 files +631/−15
- `2eb8b602` feat: pack-runnable TypeScript self-iter loop (dry/mock) — 13 files +704/−12
- `da8db685` feat: pack-runnable rust ufo-control self-iter — 13 files +769/−49
- `34521438` fix(self-iter): resolve loop specialist fixture from seated monorepo — 2 files +12/−1
- `f550086f` Prove the packed packages install and saturate with no network at all — 6 files +439/−40
- `4fc36145` feat: prove off-checkout ufo self-iter pack and crates.io exclusive-or — 21 files +925/−41
- `e9de0f3b` Add ufo-core-py doctor/demo evidence log — 1 file +16
- `bc7cf250` fix local substrate reporting and verification gate — 3 files +11/−4
- `f4f3ac40` Note merged Node Cursor substrate in SOURCE-MAP — 1 file +5
- `32b58825` fix(build): give the ufo-fsd dry CLI a name of its own — 5 files +179/-5; wave-4 fold: gives the ufo-fsd dry CLI its own name (charter-CLI surface)
- `367b16c4` fix(scripts): build @ufo/cli after the packages it imports — 1 file +8/-2; wave-4 fold: build order for scripts/triple-lang-gates.sh, the gate d148293e adds
- `6d53b1a0` Fix Python CLI module entrypoint — 1 file +4; wave-4 fold: Python CLI module entrypoint repair — the charter-CLI entry-point class
- `7b2b2774` fix(cli): accept the argv the rest of the tree already sends — 2 files +191/-34; wave-4 fold: ufo-cli accepts the argv the tree already sends — entry-point repair
- `ab6d4c2b` Raise iter weight: mid-run tree adaptations + charter packages. — 132 files +16636/-29; wave-4 fold: mid-run tree adaptations + the charter packages they adapt to
- `d148293e` Port py/ts/rs orch surface + densify sparse charter hangars. — 76 files +4845/-175; wave-4 fold: aligns @ufo/cli and ufo-cli on shared status/plan/gates/self-iter nouns; adds scripts/triple-lang-gates.sh
- `fb992b34` Add honest L2/L3 xask+sekhmet probes, charter packs, and public LKG fidelity. — 24 files +648/-30; wave-4 fold: honest L2/L3 xask+sekhmet probes + charter packs + public LKG fidelity
- Paths (as of the cited commits): src/adapters.rs, packages/substrate-*/{upstream,install.sh},
  packages/_substrate-lib/doctor.mjs, substrates/*/bin/cli.mjs, scripts/{gates.sh,self-iter.sh},
  crates/ufo-control-plane/tests/cold_tree_pack.rs, packages/ufo_core/src/ufo_core/specialists.py,
  fixtures/loop_specialist.py, adapters/ufo-desk/src/main.rs

## Out-of-scope
- Doctrine docs, lane registry and the substrates package map (`226de348`) — M-audit-early-0005.
- Fifteen-lane fork off the empty root and the merge storm — M-audit-early-0002.
- npm workspace identity and project references — M-audit-early-0006.
- Gate/battery/self-iter semantics (paper batteries, R1–R4, WWKD, saturation exits, selfaudit)
  — M-audit-early-0010 through 0017.
- Site ingestion (L0-owned) and the sibling window after 2026-09-10.

## Findings
- Honest failure, quoted from `8685f688`: "bash tests/charter_completeness.sh now genuinely passes
  26/26 with a correctly captured exit code (previously this repo's own docs/REMAINING.md '26/26
  PASS' claim was not reproducible on this tree: 15/26 failed on invocation)." Two independent causes
  are named in the body: `substrates/_lib/local-runner.mjs` hardcoded `concurrency:4`, one of the
  charter's banned vanilla wave sizes, and `@ufo/xbgst-runtime`'s `dist/` was never built.
- Desk reversal, detailed: `8239af45` removes the crate path while its body states "Desk remains
  must-not-judge (no ufo-desk crate)". The dropped seat never carried judge logic — the adapter
  source at `9d6fd8ae` is a six-line dry stub printing `"mustNotJudge":true`. The path reappears at
  `f5352f07` (2026-08-25 19:19:49, "Merge origin/main; restore the desk port and re-anchor Godspeed
  on upstream bytes") with the identical stub, and overlay arming keeps `mustNotJudge` at `23b209b7`
  (2026-08-28). The reversal is of the seat, not of the port.
- Cross-refs (owned elsewhere, deliberately not in Touches): `2591aec0` "Build durable non-Gemini
  xbgst runtime" → M-audit-early-0002; `6e3ff5e9` "Repair npm workspace: extract @ufo/core pattern
  layer, enforce non-Gemini model policy" → M-audit-early-0006; `2cc16187` "Give each charter CLI its
  role's real command surface" and `cc5f2ebf` "Unify the six lane-alias CLIs and add a parallel
  capability conformance probe" → M-audit-early-0005 by lens-owner ruling.
- As-of: `adapters/ufo-desk`, the substrate CLI packages and the pack-runnable crate tests cited
  here are absent at HEAD; they were deleted 2026-08-29 by `96a4b6b4` "refocus UFO runtime on native
  OMP routing". This beat describes that surface as of 2026-08-25/26 and cites commits, not paths.
- Cluster tail recorded but not duplicated in Touches: C8's iteration/evidence members `709ab44e`,
  `da56fe4e`, `6a68cd9a`, `c5c0c74e`, `f2c09ef7`, `52062dc3`, `78b30049`, `5dea4ba2` capture
  verification rounds of the same portable loop; they are catalogued in the scout report.

- Wave-4 coverage remediation: 7 member(s) folded from the mis-adjudicated F9-ORCH/F5-HANGAR rejections (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-gates-report.md` (C8), `.ufo/scopes/audit-early/scout-init-report.md` (C6 pack members), `.ufo/scopes/audit-early/scout-pins-report.md` (C6)
- Prior tip: `84d11d0e` — anchor of M-audit-early-0003
- Next: M-audit-early-0005
