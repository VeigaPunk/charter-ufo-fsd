# M-audit-early-0002 — Fifteen lanes fork the root; merge storm; one layout authoritative

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
Fifteen non-merge commits fork directly off the empty root `f43c757c` (sole parent), each a
self-contained duplicate port of the same runtime — twelve of them in HEAD history: `345fab9b`
(the beat anchor, 19 files +1030), `73802f61` (17 files +1491), `e34a4256` (52 files +3808),
`63353606` (31 files +3783), `87046b44` (25 files +3681), `a08a248b` (41 files +3960),
`f6c36f15` (12 files +2520), `3dbb6aed` (31 files +3841), `51ed0419` (44 files +6879),
`2591aec0` (35 files +4515), `6818f367` (76 files +5081) and `a169a54c` (claimed by
M-audit-early-0001) — plus three that never landed (Findings); their lane-internal follow-ups
`8e9a82f6` (44 files +2862/-420) and `9a0aa561` (4 files +97/-150) sit on top of lanes, and the
day's 268 merges then pick among the layouts. `4d84a59a` "Merge the lane trees and make one
layout authoritative" is the decision: `git diff --name-status 3179b983 4d84a59a | wc -l` is 3
(`M Cargo.toml`, `A rust-toolchain.toml`, `M src/orchestrator.rs`) against its second parent
`3179b983` versus 1557 paths against its first parent `9a0aa561`, so the `3179b983` tree became
the merge result; the body gives the grounds — "The root package is authoritative because it is
the only tree here that has been observed to compile and pass its tests on a stock toolchain",
naming the pattern "the oscillating-frontier failure the paper pins to removing the ratchet:
every round moves, no round retains" — and states that the parallel trees stay on disk, held out
of the build graph via `workspace exclude`. The surrounding merges of the same hour are
`c7482f80` (78 files +5174/-17), `7a91d077` (3213 files +433604/-1567), `0d08cd42` (3249 files
+437629/-2333) and `4ce68180` (2664 files +4136/-389836). The layout choice did not hold:
`be955018`, 94 seconds after `4d84a59a`, diffs 1563 paths / +117 / -2,044,314 against it, and
`8832baec` later names the `crates/` workspace authoritative instead (M-audit-early-0009).

## Gate
```
for s in 345fab9b 73802f61 e34a4256 63353606 87046b44 a08a248b f6c36f15 3dbb6aed \
         51ed0419 2591aec0 6818f367 8e9a82f6 9a0aa561 c7482f80 7a91d077 0d08cd42 \
         4d84a59a be955018 4ce68180 60eb1f60 b2696a13 e85f10ae; do
  git cat-file -e ${s}^{commit} && echo "$s ok"
done
git diff --name-status 3179b983 4d84a59a | wc -l
git diff --name-status 9a0aa561 4d84a59a | wc -l
git log --merges    --since=2026-08-25T00:00:00+00:00 --until=2026-08-25T23:59:59+00:00 --pretty=%H | wc -l
git log --no-merges --since=2026-08-25T00:00:00+00:00 --until=2026-08-25T23:59:59+00:00 --pretty=%H | wc -l
```
Expected: 22x `ok`; diffs 3 and 1557; 268 merges / 469 non-merge in the UTC day; the three
unreachable lanes fail `git merge-base --is-ancestor` (checked separately, Findings).
Actual: observed 2026-09-18 at HEAD `4adedde6` — 22 lines `ok`; `3` and `1557`; `268` and `469`. The
3-path diff is exactly `M Cargo.toml / A rust-toolchain.toml / M src/orchestrator.rs`. The
ancestor check printed 12x `reachable` (the lane roots listed in Touches plus `a169a54c`) and
`60eb1f60 UNREACHABLE`, `b2696a13 UNREACHABLE`, `e85f10ae UNREACHABLE`.

## Touches
- `345fab9b` feat: add evidence-first xbgst orchestration foundation — lane root, 19 files +1030 (src/xbgst/*.py, config/specialist-lanes.toml, skills/{godspeed,wwkd-planner}/SKILL.md, pyproject.toml)
- `73802f61` Build portable xbgst orchestration foundation — lane root, 17 files +1491
- `e34a4256` feat(ufo-fsd): implement core runtime, strict Pareto gate, exclusion topology, and multi-CLI stack — lane root, 52 files +3808
- `63353606` Implement local-first UFO core runtime — lane root, 31 files +3783
- `87046b44` Implement durable strict-Pareto UFO runtime — lane root, 25 files +3681
- `a08a248b` Implement local-first UFO core runtime — lane root, 41 files +3960
- `f6c36f15` Implement local UFO orchestration kernel — lane root, 12 files +2520
- `3dbb6aed` Implement provider-neutral UFO orchestration baseline — lane root, 31 files +3841
- `51ed0419` feat(ufo-core): port the UFO pattern layer from paper spec and LKG xbgst-stack — lane root, 44 files +6879
- `2591aec0` Build durable non-Gemini xbgst runtime — lane root, 35 files +4515
- `6818f367` Implement portable UFO-FSD core runtime — lane root, 76 files +5081
- `8e9a82f6` integrate durable tool-driven UFO runtime — lane-internal, 44 files +2862/-420
- `c7482f80` merge: reconcile remote xbgst runtime port — merge, 78 files +5174/-17
- `7a91d077` Merge complete remote UFO implementation — merge, 3213 files +433604/-1567
- `0d08cd42` Merge canonical UFO runtime and complete OpenCode adapter — merge, 3249 files +437629/-2333
- `4d84a59a` Merge the lane trees and make one layout authoritative — merge, 1557 files, +2,044,110 insertions; 3 paths from `3179b983`
- `be955018` merge: take the lane R4 wording and keep the portable dependency pins — merge, 1563 paths / +117 / -2,044,314 against `4d84a59a`
- `4ce68180` Integrate canonical local-first UFO control plane — merge, 2664 files +4136/-389836
- Paths: Cargo.toml, Cargo.lock, rust-toolchain.toml, crates/*, packages/*, root src/*.rs, config/*, lanes/registry.yaml, tests/* (many of these lane paths no longer exist at HEAD — see Findings)
- Cross-ref: `a169a54c` (Port UFO/xbgst core runtime and Cursor substrate deps from LKG., 73 files +5014) is the twelfth reachable lane root and is claimed by M-audit-early-0001; `6bd0c472` (build portable UFO FSD orchestration baseline, 20 files +1598/-18) is claimed by M-audit-early-0004.

## Out-of-scope
- The repository root and the first LKG port content — M-audit-early-0001.
- The portable orchestration baseline `6bd0c472` — M-audit-early-0004.
- Rust workspace membership/seating after a layout existed — M-audit-early-0003.
- Reconciliation of the divergent runtimes to one tree per concern (quarantine, dual-runtime
  collapse, `8832baec`) — M-audit-early-0009.
- Merge-damage restore family (F4-RESTORE: `3179b983`, `c62acbe1`, `795c902a`, …), lockfile
  refreshes (F1-LOCK), fmt sweeps (F2-FMT), tip/evidence bookkeeping (F3-TIPDOC), Rust
  dependency one-liners (F13-RUSTDEP) — mechanical churn, accounted in the mission result
  report rather than in beats.
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- Three bootstrap lanes forked the root but are not ancestors of HEAD (`git cat-file -e`
  passes, `git merge-base --is-ancestor <sha> HEAD` is false): `60eb1f60` Build dependency-light
  UFO orchestration runtime — 15 files +1013, 2026-08-25 18:11:31 +0000; `b2696a13` Bootstrap
  UFO core runtime from charter-ufo-fsd and last-known-good fleet sources — 27 files +2669,
  18:13:51; `e85f10ae` feat: scaffold UFO core runtime from LKG (Pareto gate, mock lanes,
  self-iteration loop) — 27 files +2298, 18:14:28. They carry no beat in HEAD-reachable history.
- Lane scale range across the fifteen forks is 1013-6879 insertions (min `60eb1f60`,
  unreachable; max `51ed0419`); the twelve reachable lane roots span 1030-6879.
- `4d84a59a` is titled "make one layout authoritative" and its body calls the choice final, but
  authority moved again 94 seconds later (`be955018`) and then to the `crates/` workspace at
  `8832baec`. The root-package layout is authoritative only as of its own SHA.
- Of the six merge anchors here, only `7a91d077` is on HEAD's first-parent chain
  (`git rev-list --first-parent HEAD`); the other five are ancestors of HEAD but not on it.
- `be955018`'s direction was checked, not assumed: `git diff --name-status 4d84a59a be955018`
  reports those 1563 paths as `D`, i.e. much of the union admitted by `4d84a59a` was dropped
  again by the next merge on that chain.
- Day accounting for this window is UTC-bound: 469 non-merge / 268 merges on 2026-08-25 UTC.
  A machine-timezone reading of the window returns 571 non-merge commits and leaks commits from
  2026-08-26 02:00-02:59 UTC.
- Path currency: at HEAD `4adedde6` the lane layouts are gone from the working tree —
  `crates/ufo-runtime`, `crates/ufo-control-plane`, `crates/ufo-selfaudit`, `packages/ufo-orch`,
  `packages/xbgst-runtime`, `lanes/registry.yaml` and `deps.manifest.json` all return 0 entries
  from `git ls-tree -r HEAD`. Everything above is stated as of its own SHA.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-init-report.md` (C2)
- Prior tip: `f43c757c` — anchor of M-audit-early-0001
- Next: M-audit-early-0003
