# M-audit-early-0015 — Godspeed filter.md SSoT pin war: upstream bytes + archive exemption

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
One arc across two rounds: the tree asserted byte-exact Godspeed injection twice
with two different answers, then two gates demanded opposite bytes for the same
files. Round 1 (08-25 ~18:58–19:25): `54937ab3` (11 files +869/−34) resolves the
`filter.md` fork — one blank line, two authorities (`posture.rs` pinned content
hash 09957d08 while four `SHA256SUMS` manifests pinned 6c6e6c9f) — and lands
`crates/ufo-conformance/tests/coherence.rs` + `gate_agreement.rs` so drift is
detectable. `fcde8515` self-corrects ("which is not the copy I normalized onto"):
upstream `VeigaPunk/godspeed-core@main` is 3240 B at sha256
09957d08a7d4e037…, byte-identical to `vendor/godspeed-core/filter.md`; the
`ssot/` copy was the grok-marketplace snapshot missing the trailing blank line.
`dd94791a` restores upstream bytes into the live set; `dc9f83ed` anchors the
checksum manifests; `6cb99fc2` (2 files +194/−1) replaces nine hand-fixes with
`scripts/sync-godspeed.sh`. Round 2 (08-25 22:08 → 08-26 07:08): two gates still
fought — `coherence.rs` wanted vendor bytes, `verify-private-provenance.mjs`
wanted the private-upstream blob SHA1 — so no tree state satisfied both and the
repair looped. `8201a25f` (9 files +216/−95) ends it: a file pinned in
`docs/PRIVATE-PROVENANCE-MANIFEST.json` is an archive, not a live copy
(`provenance_pinned` / `is_pinned`); only pinned files, never directories;
`plugins/**`, `vendor/`, `ssot/`, `packages/godspeed_core` stay byte-exact to the
SSoT. Decision: the fork is upstream, not ours — normalize onto upstream and do
not move the pin to follow drift; provenance-pinned ports are archives. Pin
timestamp: as of window tip `5fd73fd1` (08-26 19:42:59), `ssot/godspeed-core/
filter.md` is still sha256 09957d08a7d4e037… (3240 B) and the tree holds 45
`filter.md` files — 31 byte-equal to SSoT, 14 differ by design (the provenance
archives). The pin is not current: `8e9116d9` (2026-09-18) rewrites the file to
sha256 ddfabdcb5ca4… (3646 B).

## Gate
```
for s in 54937ab3 fcde8515 2dc18f67 f82b5ba4 bef299b1 dd94791a dc9f83ed 6cb99fc2 \
  c3187b37 fdc93332 a09868f2 e2b5b40b fc0ecec4 60e424d0 dd3e3eca 5478e8a4 2c7a7ff0 \
  340e5ed2 0e9b66ec 75e9a428 f39fba3e 359ec187 21479379 5c96cc0d 8201a25f f823573b \
  451daa71 4d841586 46367e44; do
  git cat-file -e ${s}^{commit} && echo "$s ok"
done
git log --no-walk --pretty="%h %s" 54937ab3 8201a25f dd94791a 6cb99fc2 fcde8515
# pin footprint at window tip 5fd73fd1 (as-of check, not a Touches member)
ssot=$(git rev-parse 5fd73fd1:ssot/godspeed-core/filter.md)
git show 5fd73fd1:ssot/godspeed-core/filter.md | sha256sum
git ls-tree -r 5fd73fd1 | awk -v s="$ssot" '$4 ~ /(^|\/)filter\.md$/ {t++; if($3==s) e++; else d++} END{print "total="t" equal="e" differ="d}'
```
Expected: 29x ok; subjects match Touches anchors; ssot sha256 starts 09957d08…;
footprint total=45 equal=31 differ=14.
Actual: all 29 ok; sha256
09957d08a7d4e0375a2f86571c025faaa5a148e8c46e377e6b477ac6bb48da72; total=45
equal=31 differ=14 (2026-09-18). Differ paths are exactly the provenance-pinned
archives under ports/, packages/substrate-*/hangar/lkg-mirror/, vendor/{godspeed-mode-tip,last-known-good,lkg}/.

## Touches
- `54937ab3` Resolve the Godspeed filter.md fork and give the drifting claims a second anchor — 11 files +869/−34
- `fcde8515` Pin Godspeed to the upstream repository, which is not the copy I normalized onto — 10 files +61/−28
- `2dc18f67` Restore byte-exact Godspeed filter.md across the tree — 15 files +15/−1
- `f82b5ba4` Align live Godspeed trilogy copies to vendor/godspeed-core bytes. — 43 files +3178/−3
- `bef299b1` Sync all live godspeed filter.md copies to ssot hash. — 14 files +0/−14
- `dd94791a` Restore upstream godspeed filter.md bytes (hash 09957d08). — 20 files +20/−1
- `dc9f83ed` Settle the Godspeed filter.md fork against upstream and anchor the checksum manifests — 9 files +405/−6
- `6cb99fc2` Give the Godspeed drift a repair path instead of nine hand-fixes — 2 files +194/−1
- `c3187b37` fix(godspeed): align packages pin + ssot-first resolve; evidence E6–E7 — 6 files +85/−6
- `fdc93332` fix(conformance): stop the Godspeed SSoT gate depending on untracked local state — 2 files +9/−1
- `a09868f2` Fix remaining xbgst-stack godspeed filter.md copy to upstream hash. — 1 file +1/−0
- `e2b5b40b` fix(coherence): re-pin plugins/xbgst-stack godspeed filter.md to vendor SSOT bytes — 1 file +1/−0
- `fc0ecec4` Align godspeed filter pin and surface adapt_events in CLI. — 5 files +6/−4
- `60e424d0` Repoint the Godspeed copies upstream added, and tighten the boundary — 5 files +6/−11
- `dd3e3eca` Pin xbgst-stack filter.md to upstream; refresh private LKG sync trees — 26 files +794/−55
- `5478e8a4` Restore godspeed filter.md to SHA256SUMS pin (fix pytest) — 2 files +2/−0
- `2c7a7ff0` Restore the vendored Godspeed clone and repoint every live copy at it — 2 files +2/−0
- `340e5ed2` Discover Godspeed copies by filename so a new port cannot escape the repair — 3 files +9/−53
- `0e9b66ec` Treat the ported godspeed-mode tip as the archive it says it is — 40 files +1295/−376
- `75e9a428` fix: restore ports/godspeed-mode/{directive,filter}.md from the untouched tip copy — 2 files +52/−3
- `f39fba3e` Restore the godspeed-mode tip bytes the repair script flattened — 13 files +150/−302
- `359ec187` The runtime's shipped godspeed-mode tip is an archive, not a live copy — 2 files +81/−33
- `21479379` Make the Godspeed repair also refresh the manifest that pins the bytes — 19 files +472/−374
- `5c96cc0d` Restore godspeed filter tip SHA1 after concurrent port drift. — 9 files +2/−9
- `8201a25f` End the Godspeed ping-pong: provenance-pinned ports are archives, not live copies — 9 files +216/−95
- `f823573b` Repair plugins/ back to the SSoT and say which way the repair goes — 9 files +225/−45
- `451daa71` Repair plugins/ trilogy to the SSoT after the merge brought tip bytes back — 3 files +3/−1
- `4d841586` Refresh REMAINING after LKG-core rebase; reseat godspeed SSoT. — 11 files +11/−5
- `46367e44` Make the TS planner resolve godspeed from the run's workDir, not the CWD — 14 files +202/−104
- Paths: crates/ufo-conformance/tests/coherence.rs, crates/ufo-conformance/tests/gate_agreement.rs, scripts/sync-godspeed.sh, ssot/godspeed-core/, vendor/godspeed-core/, docs/CONFORMANCE-FINDINGS.md (F-C4), docs/PRIVATE-PROVENANCE-MANIFEST.json, ports/godspeed-mode/, ports/xbgst-{kimi,codex}/, plugins/, packages/godspeed_core/

## Out-of-scope
- SSoT first landing as normal files instead of nested gitlink (`785d53f1`) —
  M-audit-early-0001.
- E1–E5 godspeed pin + membrane purity in the self-iter control plane
  (`19f32355`, `d7ec5313`, `e3dc99dc`, `12a558b9`, `a28d1002`) — M-audit-early-0017
  (Gates C6); L1 notes coordinate E-numbering.
- Desk adapter seat/drop (`9d6fd8ae`, `8239af45`) — M-audit-early-0004 (Pins C6 /
  portable surface).
- Saturation/budget taxonomy side-car in `ff858493` — M-audit-early-0016.
- LIVE-strict decoys — M-audit-early-0013.
- fix(honesty) live-seat wave — M-audit-early-0025.
- Tip-SHA bookkeeping family (R1) and fmt/chore (R2).
- F-C4 gate-suite re-arming root cause (`d2b443a3`) — residual N-G /
  M-audit-early-0021 (distinct from the F-C4 ownership fix at `8201a25f`).

## Findings
- Honest failure, round 1: `6cb99fc2` records nine prior hand-fixes with two
  opposite resolutions ("no way to tell by eye which side is upstream");
  `fcde8515` reverses a ten-minute-earlier normalization onto the wrong copy
  (`2c7a7ff0`). Reasoning quote from `fcde8515`: "I had the direction backwards…
  The ssot/ copy is one blank line shorter because it descends from the snapshot
  vendored inside grok-marketplace's xbgst-stack, not from the source repo."
- Honest failure, round 2: F-C4 (`docs/CONFORMANCE-FINDINGS.md` at `8201a25f`) is
  a design failure, not a lane failure. Reasoning quote from `8201a25f`:
  "sync-godspeed.sh has carried a note since it was written blaming 'nine commits
  normalizing in opposite directions' on there being 'no way to eyeball which side
  is upstream'. That diagnosis was wrong: each of those commits correctly
  satisfied the gate in front of it and unavoidably broke the other one."
- Pin is window-local, not current. As-of `5fd73fd1` (also the last
  `fix(honesty):` commit of M-audit-early-0025): SSoT filter.md =
  09957d08a7d4e0375a2f86571c025faaa5a148e8c46e377e6b477ac6bb48da72 (3240 B),
  SHA256SUMS agrees, 45/31/14 footprint holds. Superseded post-window by
  `8e9116d9` (2026-09-18, "ufo pack P8-docs + P9 machinery…") →
  ddfabdcb5ca44a8367fc997cd499f35b0f6f4d57ec96cfa8e686e3ad60f2e87d (3646 B).
- `dd94791a` git subject abbreviates the content hash as `(hash 09957d08)`; the
  Touches line expands it to the full sha256 so the mission verifier (which
  requires every 7–40 hex token in Touches to resolve as a git object) does not
  treat the bare content-hash prefix as a commit SHA.
- `359ec187` also matches a C3 "not a live copy" denial predicate; counted once
  here (archive decision), not in M-audit-early-0025.
- C1 members not listed in Touches (competing primary owners or bootstrap):
  `785d53f1` (0001), `0bc76571` (iter-5 seating/desk stub), `6da1a05b` (LKG
  restore), `9d6fd8ae`/`8239af45` (0004 desk), `12a558b9`/`a28d1002` (0017 E1–E5),
  `ff858493` (0016), `31dd0370` (Gates WWKD / Init reconcile), `aa70692e` (late
  LKG gold fallback). Cross-ref only.

## Links
- Plan: ufo-fsd-alpha .ufo/scopes/audit-early/plan-r1.md + scout-honesty-report.md (C1+C2)
- Prior tip: db0412cf — anchor of M-audit-early-0014
- Next: M-audit-early-0016
