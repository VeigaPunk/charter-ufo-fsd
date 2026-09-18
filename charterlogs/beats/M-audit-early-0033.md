# M-audit-early-0033 — Charter-parity: kimi cursor-surface → dual-pin MIX composer-2.5-fast

**Status:** COMPLETE | **Date:** 2026-08-27 | **Session:** audit-early

## Does
Seven commits over three hours migrate the cursor surface off the banned `kimi-k3-max` default
onto the dual-pin MIX, `composer-2.5-fast` + `cursor-grok-4.5-high-fast`, per posture commit
`2a3c8fd2` (2026-08-26). `c5efe7ff` (23:06:12, 18 files +116/−42) is the migration proper: the
five-file pin set (`scripts/cursor-surface-{run,xask,ping}.sh`,
`skills/xbgst-cursor-agent-surface/SKILL.md`,
`cursor-surface/.cursor/skills/xbgst-cursor-agent-surface/SKILL.md`) rewritten in all three kimi
trees — `packages/kimi/`, `ports/xbgst-kimi/`, `plugins/xbgst-kimi/` — for 15 parity files plus
`docs/HANDOFF.md` in the plugins and ports trees and a new
`scripts/spawn-l2-seat8-recovery-gen30.sh`. Decision reasoning: retire the banned default at the
surface rather than only in the roster, so the issued argv is what the policy says. `3700bd77`
(20:14:04, 2 files +16/−6) commits the `xbgst-cursor` tip file and its intra-port copy,
completing the `db0775b9` tip→mirror STOP-banner parity; `5f88e4e0` (20:26:21, 3 files +24/−9)
extends that banner to the off-wire `.cursor` copies (`packages/substrate-cursor/{hangar/lkg-mirror,upstream}`,
`plugins/xbgst-cursor`); `3634eb45` (20:39:06, 1 file +8/−8) byte-syncs
`plugins/xbgst-cursor/agents/roster.json` to the MIX, removing 6 `kimi-k3-max` pins (model_pin +
5 roles) and moving `executor`/`labrat` from bare `composer-2.5` to `composer-2.5-fast`;
`42be72e8` (22:22:12, 3 files ±15) is the atomic roster-truth rewrite of
`{packages/cursor,ports/xbgst-cursor,plugins/xbgst-cursor}/docs/CURSOR-MODELS.md` — all three
post-images are byte-identical (`02b614e3`) — retiring `kimi-k3-max` as the documented default;
`2726b43f` (22:28:50, 7 files ±7) syncs the bundle to the same truth (`cursor.plugin.json`,
`install.sh`, `sync-catalog-from-xask.sh`, `tests/test-identity.sh` × plugins+ports, described as
"test-identity RED->GREEN x2"); `d657515f` (22:55:23, 36 files +63/−61) sweeps 61 line-anchored
`kimi-k3-max`→`composer-2.5-fast` edits across agents/skills/commands/examples/docs. The
hangar/vendor LKG mirrors are deliberately left frozen — `c5efe7ff`'s subject records the
doctrine (`doNotDensifyHangarThisLoop`) — so the migration is complete only across live trees.

## Gate
```
for s in c5efe7ff 3700bd77 5f88e4e0 3634eb45 42be72e8 2726b43f d657515f; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git show --shortstat --no-walk --pretty="%h %s" c5efe7ff
for f in scripts/cursor-surface-run.sh scripts/cursor-surface-xask.sh scripts/cursor-surface-ping.sh skills/xbgst-cursor-agent-surface/SKILL.md cursor-surface/.cursor/skills/xbgst-cursor-agent-surface/SKILL.md; do
  a=$(git rev-parse c5efe7ff:packages/kimi/$f); b=$(git rev-parse c5efe7ff:ports/xbgst-kimi/$f); c=$(git rev-parse c5efe7ff:plugins/xbgst-kimi/$f)
  [ "$a" = "$b" ] && [ "$b" = "$c" ] && echo "PARITY $f" || echo "DIVERGENT $f"; done
for t in packages/cursor ports/xbgst-cursor plugins/xbgst-cursor; do git rev-parse 42be72e8:$t/docs/CURSOR-MODELS.md; done
git show d657515f | grep -c '^-.*kimi-k3-max'
git show 3634eb45 --stat --pretty="" 
for t in packages/cursor ports/xbgst-cursor plugins/xbgst-cursor; do printf '%s ' "$t"; git show 3634eb45:$t/agents/roster.json | sha256sum | cut -c1-8; git show 3634eb45:$t/agents/roster.json | grep -c 'kimi-k3-max'; done
```
Expected: seven `ok`; 18 files +116/−42; five `PARITY` lines (the 15-file set is byte-identical
across the three trees); three identical blob ids for `CURSOR-MODELS.md`; 61 removed
`kimi-k3-max` lines in `d657515f`; one file changed by `3634eb45`; and the roster probe expected
to agree across the three trees.
Actual: seven `ok`; `18 files changed, 116 insertions(+), 42 deletions(-)`; `PARITY` x5; post-image
blob `02b614e3083878dcee197563970110199e0707b8` for all three `CURSOR-MODELS.md`; `61`;
`1 file changed, 8 insertions(+), 8 deletions(-)`; roster probe **disagrees at `3634eb45`** —
`packages/cursor dedc19bd / 0`, `ports/xbgst-cursor df075eae / 6`, `plugins/xbgst-cursor
dedc19bd / 0`. Recorded as a Finding, not smoothed.

## Touches
- `c5efe7ff` charter-parity gen30 (seat8): kimi cursor-surface dual-pin migration — kimi-k3-max banned defaults/recipe/refusal strings -> composer-2.5-fast across 15 live files x3 trees (packages/ports/plugins, byte-parity cmp-proved), example argv de-hosted (sibling-repo path -> <checkout>), HANDOFF stale-directive correction line (history preserved verbatim), dated report + CURSOR-TRUST provenance taxonomy kept as fact, hangar/vendor LKG mirrors intentionally frozen per doNotDensifyHangarThisLoop; print-mode probes rc=0 show composer-2.5-fast argv; gen30 16-role wave driver + WWKD plan + 7 steer-queue drains; local commit, no Origin push — 18 files +116/−42; 5 pin files byte-identical across `packages/kimi`, `ports/xbgst-kimi`, `plugins/xbgst-kimi`; parent `6b5cdf52`
- `3700bd77` charter-parity: commit xbgst-cursor tip file + intra-port copy — completes db0775b9 tip->mirror STOP-banner parity (seat3 gen27; local commit, no Origin push) — 2 files +16/−6 (`ports/xbgst-cursor/{.cursor/skills,skills}/xbgst-cursor/SKILL.md`)
- `5f88e4e0` charter-parity: extend STOP banner to off-wire .cursor xbgst-cursor copies (hangar/upstream/plugins; seat3 gen27 r2; local commit, no Origin push) — 3 files +24/−9 (`packages/substrate-cursor/hangar/lkg-mirror/.cursor/skills/xbgst-cursor/SKILL.md`, `packages/substrate-cursor/upstream/.cursor/skills/xbgst-cursor/SKILL.md`, `plugins/xbgst-cursor/.cursor/skills/xbgst-cursor/SKILL.md`)
- `3634eb45` cursor-pin: byte-sync plugins/xbgst-cursor roster to dual-pin MIX (fix-now per sol adjudication s3g27r2) — 1 file +8/−8 (`plugins/xbgst-cursor/agents/roster.json`); 6 `kimi-k3-max` pins removed
- `42be72e8` charter-parity: atomic dual-pin MIX rewrite of CURSOR-MODELS.md x3 — kimi-k3-max default retired to match roster truth (seat2 gen28; local commit, no Origin push) — 3 files +15/−15; all three post-images byte-identical
- `2726b43f` charter-parity: sync cursor bundle to dual-pin truth — test-identity RED->GREEN x2, sync-catalog default, install.sh example, plugin manifest flags (seat2 gen28; local commit, no Origin push) — 7 files +7/−7 (`plugins/xbgst-cursor/{cursor.plugin.json,install.sh,scripts/sync-catalog-from-xask.sh,tests/test-identity.sh}`, `ports/xbgst-cursor/{install.sh,scripts/sync-catalog-from-xask.sh,tests/test-identity.sh}`)
- `d657515f` charter-parity r3: guidance sweep — 61 line-anchored kimi-k3-max->composer-2.5-fast edits (agents/skills/commands/examples/docs), mdc x2 converged to ports bytes, TUNING ban rows kept as fact (seat2 gen28; test-trust pre-existing host red attributed; local commit, no Origin push) — 36 files +63/−61
- Paths: `{packages/kimi,ports/xbgst-kimi,plugins/xbgst-kimi}/scripts/cursor-surface-*.sh`, `.../skills/xbgst-cursor-agent-surface/SKILL.md`, `.../cursor-surface/.cursor/skills/xbgst-cursor-agent-surface/SKILL.md`, `{packages/cursor,ports/xbgst-cursor,plugins/xbgst-cursor}/docs/CURSOR-MODELS.md`, `plugins/xbgst-cursor/agents/roster.json`, `plugins/xbgst-cursor/{agents,commands,examples,docs,.cursor/rules}/*`, `ports/xbgst-cursor/{agents,docs,examples,skills,.cursor/skills}/*`

## Out-of-scope
- The gates-green surface the parity checks serve (`db0775b9`, `22fe29ab`, `9eb308a1`) —
  M-audit-early-0032; `3700bd77` is cited here as completing that tip→mirror parity, not as a gate.
- The 2026-08-26 pin/route decision itself (`05ff018d`, M-audit-early-0027) and the operator
  pin-divergence carve-out (`7a417318`, M-audit-early-0029) — referenced, not claimed.
- The 08-28 re-charter continuation (exact-pin identity gates, kimi dropped from cascades) —
  M-audit-early-0036/0045; recorded as Findings only.
- Churn rejections from the scout report (`11de9153`, `a668f48f`, `f65bc149`).
- Site ingestion (L0-owned) and the sibling window (audit-late).

## Findings
- **Stated sync source was the lagging copy.** `3634eb45`'s body says it was a "byte-sync from
  `ports/xbgst-cursor/agents/roster.json` (sha256 dedc19bd..., identical to packages/cursor
  copy)", but measured at that commit the three copies are not in agreement: `packages/cursor` and
  `plugins/xbgst-cursor` are `dedc19bd…` with 0 `kimi-k3-max` lines, while
  `ports/xbgst-cursor` is `df075eae…` with 6 `kimi-k3-max` lines still present. `dedc19bd…` is the
  target bytes, not the ports bytes. The ports copy kept the retired default through
  `61c36775` (20:58) and was moved to the same bytes only by `234a689c` (22:05:17), which applies
  the identical roster hunk as part of the avalanche closeout.
- **Pin drift was corrected across seven commits, not one rewrite.** As of `3634eb45` the state
  was still mixed: roster stale in `ports/`, `CURSOR-MODELS.md` ×3 still carrying the retired
  default until `42be72e8` (22:22), `test-identity.sh` red in two trees until `2726b43f` (22:28),
  61 guidance/doc references still on the banned string until `d657515f` (22:55).
- **Deliberate freeze, honestly declared.** The hangar/vendor LKG mirrors are exempted by name in
  `c5efe7ff`'s subject (`doNotDensifyHangarThisLoop`), so the byte-parity proof covers live trees
  only and mirror parity is not claimed here.
- **One recorded non-fix.** `d657515f`'s subject records a "test-trust pre-existing host red
  attributed" — an attributed host failure that was not repaired in that commit.
- **As-of note / supersession.** `composer-2.5-fast` remains the cursor pin after this beat; what
  changed on 08-28 is enforcement and fleet routing, not the pin value — `9b9a2829` (2026-08-28
  00:14:01, "Fix cursor identity executable and exact-pin checks") makes the chosen token a
  fail-closed assertion, and `6a1ab01d` (2026-08-28 22:32:19, "Drop kimi from every cascade")
  removes kimi from the cascade paths entirely. Neither is claimed in this beat.
- Cross-ref M-audit-early-0027 (`05ff018d`, 2026-08-26 20:42:44) landed the ban this beat
  spreads across the live surface; the MIX posture commit named inside these diffs is `2a3c8fd2`.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-aug27-report.md` (C4)
- Prior tip: `db0775b9` — anchor of M-audit-early-0032
- Next: M-audit-early-0034
