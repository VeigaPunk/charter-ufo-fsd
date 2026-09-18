# M-audit-early-0014 — Hangar parity fail-closed; substrate hangars deepened past credential boundary

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
Hangar parity became fail-closed, then every substrate package was deepened with
byte-pinned hangar/livepatch/upstream trees on 2026-08-25. `5c84d111` (4 files
+68/−14) makes `scripts/hangar-parity.mjs` verify livepatch patch digests against
`vendor/last-known-good/xbgst-stack` and require `hangar/plazirhangar` + `FIDELITY`
per substrate, with `REQUIRED_HANGAR` = README.md/STATUS.md/install-local.sh/
charter-ref/lkg-mirror/FIDELITY.md and `REQUIRED_PATCHES` = the six 0001-0006
stack patches; the FIDELITY.md rows for codex/cursor/kimi land in the same commit.
`db0412cf` (652 files +77085/−160) is the largest byte movement of the window:
plazirhangar, public LKG (opencode/xbrd-grok/sekhmet-l3/unifirf), ports/MCP stubs,
livepatch and charter-ref are mirrored into each `packages/substrate-*/{hangar,
livepatch}` tree, and the commit adds the `UFO_LIVE` switch
(`packages/ufo_core/src/ufo_core/live_llm.py` + `tests/test_live_llm.py`, `cli.py`,
`specialists.py`) so an opt-in live specialist path exists while dry stays the
default — decision, verbatim: "Wire UFO_LIVE=1 live specialist path (dry by
default); document access blockers and remaining live OAuth/private-clone gates
honestly." The access turn behind it is recorded as a credential boundary: what
MCP read access unlocked (private repository file trees, the public hangar, local
ports, livepatch) versus what stayed blocked at the shell (private-LKG clone auth,
live specialist/OAuth tokens, host-certified-64 live), documented in
`docs/ACCESS.md` rather than claimed as live capability. Deepening continued the
same afternoon: `1c544c70` (75 files +3949/−171) ports codex audit-v2/doctor
scripts, kimi pre-tool-guard + plugin/SYSTEM, cursor roster/catalog, the ufo-fsd
slash set + install-host-persist, grok-bot Cargo/README and livepatch systemd tips
across all seven substrates, and loosens the self-iter dry_bias adapt trigger;
`fd1ddffa` (113 files +9607/−311) mirrors remaining private LKG via MCP into
`ports/` and `packages/substrate-*/upstream/` (kimi marketplace+config+hooks
audit+cursor-surface; codex plugin/hooks/marketplace/config), clones the public
mold pack (216 files), adds the restore pack + titanium discovery, and hardens the
shared doctor/install to require real upstream files, with MCP-vs-clone gaps
documented in SOURCE-MAP and evidence/portability; `ae2d17a3` (48 files +895/−131)
ports hooks/config/bin/ufo-fsd/umwelt MCP artifacts into the hangars and raises
self-iter default concurrency to 64 with mid-run dry/saturation adaptation events.
Three gap-closure commits close the same family: `9d5ceadf` (119 files +11508/−47)
materializes kimi pre-tool-guard and codex xbgst-guard via MCP into ports/upstream,
lands host-restore and titanium-host packs, deepens codex references/roles/schemas
and tightens doctor required files; `08e322a8` (78 files +8298/−44) re-enables
crates/ufo-core property/process/store tests via AxisSpec root exports, mirrors
xbgst-kimi hooks/scripts and the ufo-fsd overlay into ports/, vendors a public mold
stand-in and adds a substrate contract verifier; `f9b1f7e5` (21 files +5568/−10)
closes remaining LKG/Rust/gates gaps after the portable ufo-core merge (schema +
judge + store merged with the Runtime API, ablation CLI batteries restored, missing
xbgst-kimi/ufo-fsd surfaces ported, self-iter controls deepened).

## Gate
```
for s in 5c84d111 db0412cf 1c544c70 fd1ddffa ae2d17a3 9d5ceadf 08e322a8 f9b1f7e5 171d7c55 572d6acb 84510939 87855491 a08e529f df2e52a2 df5bb778 e070d965 eda6691c fe18036a; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=short 5c84d111 db0412cf 1c544c70 fd1ddffa ae2d17a3 9d5ceadf 08e322a8 f9b1f7e5
git show --shortstat --format="" db0412cf
git show --shortstat --format="" 08e322a8
```
Expected: 8x "ok"; all eight subject dates 2026-08-25; `db0412cf` = 652 files
+77085/−160; `08e322a8` = 78 files +8298/−44.
Actual (2026-09-18, HEAD 4adedde6): 8x ok; dates all 2026-08-25; "652 files
changed, 77085 insertions(+), 160 deletions(-)"; "78 files changed, 8298
insertions(+), 44 deletions(-)" — observed exactly as expected.
Wave-4 re-run (2026-09-18, HEAD 4adedde6): extended loop (18 SHAs) printed 18x ok, no failures.

## Touches
- `5c84d111` Deepen hangar parity: require FIDELITY, plazirhangar, LKG SHA256 — 4 files +68/−14; scripts/hangar-parity.mjs, packages/substrate-{codex,cursor,kimi}/hangar/FIDELITY.md
- `db0412cf` Deepen substrate hangars past credential boundary; add UFO_LIVE switch — 652 files +77085/−160; packages/substrate-*/{hangar,livepatch}/, docs/ACCESS.md, packages/ufo_core/src/ufo_core/{live_llm,specialists,cli}.py
- `1c544c70` Deepen substrate hangars via MCP private byte-pins. — 75 files +3949/−171
- `fd1ddffa` Deepen substrate LKG portability: kimi hooks/marketplace, mold, restore, titanium — 113 files +9607/−311; packages/substrate-*/upstream/, vendor/grok-build-livepatch/, ports/xbgst-kimi/
- `ae2d17a3` MCP-deepen private hangars; adapt64 self-iter; goal audit draft — 48 files +895/−131
- `9d5ceadf` Materialize LKG hooks, restore pins, and codex reference trees — 119 files +11508/−47
- `08e322a8` Close LKG/Rust/substrate gaps: restore proptest tests, port private trees. — 78 files +8298/−44
- `f9b1f7e5` Close remaining LKG/Rust/gates gaps after portable ufo-core merge. — 21 files +5568/−10
- `171d7c55` feat(provenance): live-verify + close xbgst-grok-bot byte parity gap — 5 files +161−14; wave-4 fold: live-verifies and closes the xbgst-grok-bot byte-parity gap; extends scripts/verify-private-provenance.mjs
- `572d6acb` Exhaust public hangar/LKG densify and document credential blockers. — 52 files +4404−83; wave-4 fold: strengthens LKG fidelity asserts (31 checks) and public hangar densify
- `84510939` feat: close plazir r4 snap t6 tip gaps (118/118) — 781 files +27322−128; wave-4 fold: escalates the mcp-tip-residual assert floors as the densify closes them
- `87855491` Materialize private tip trees via GitHub MCP into ports and hangars. — 111 files +7703−342; wave-4 fold: materialises private tips and wires them into runtime resolution + LKG fidelity asserts
- `a08e529f` Advance plazir t6-calls tip-byte fidelity and live/private LKG promote paths. — 201 files +3479−247; wave-4 fold: t6-calls tip-byte fidelity + dry->live auto-promote paths for private LKG
- `df2e52a2` feat: close MCP tip residuals (codex/ufo/umwelt) + assert gate — 40 files +1559−18; wave-4 fold: closes MCP tip residuals and adds scripts/mcp-tip-fetch.py + the assert-mcp-tip-residuals gate
- `df5bb778` Pin intentional mold LKG for deleted xbgst-gdsd-fknpft. — 8 files +256−85; wave-4 fold: pins intentional mold LKG for a deleted upstream and adds scripts/verify-mold-lkg.mjs
- `e070d965` Densify more private tip trees via GitHub MCP into ports and hangars. — 359 files +21028−5520; wave-4 fold: tip-syncs kimi/ufo-fsd/godspeed/prime into ports and hangar mirrors; seats skills
- `eda6691c` feat: plazir r4 t6 tip densify 118/118 + mold fail-soft pin — 954 files +16050−73; wave-4 fold: adjusts the mcp-tip-residual assert thresholds and drops two hangar-count assertions after the densify; adds the mold fail-soft pin check
- `fe18036a` Densify plazir/prime/.xbgst/ufo tip residuals via GitHub MCP. — 1182 files +77831−74; wave-4 fold: lands plazir/prime/.xbgst/ufo tips and extends the LKG fidelity asserts
- Paths: scripts/hangar-parity.mjs, packages/substrate-{kimi,cursor,codex,opencode,xask,sekhmet,xbrd-grok}/{hangar,livepatch,upstream}/, packages/ufo_core/src/ufo_core/, vendor/grok-build-livepatch/, ports/xbgst-{kimi,codex}/, overlay/ufo-fsd/, docs/ACCESS.md, docs/SOURCE-MAP.md, docs/evidence/portability/

## Out-of-scope
- Model pins/bans and the seat-routing policy of 08-26 — beats 0027-0029.
- The C6 portable substrate / charter-CLI pack surface (Rust adapter enum vs node
  charter bins) — beats 0004/0023, not this beat.
- The C7 END-RUN LOCK (beat 0026) and the testing-axis work of `8a155ec0`
  (beat 0013).
- Family churn: merge commits, lockfile refreshes, rustfmt sweeps, tip-SHA
  restamps (mission result report, not beats).
- Anything after 2026-09-10 (sibling window audit-late) and site ingestion
  (L0-owned).

## Findings
- The deepening is explicitly partial by design: `db0412cf` and `fd1ddffa` leave
  access blockers, live OAuth and private-clone gates open and document them
  (docs/ACCESS.md, docs/SOURCE-MAP.md, evidence/portability) instead of faking
  live capability; `UFO_LIVE=1` without keys keeps specialists dry.
- `9d5ceadf` tightens doctor required-files after the fact, i.e. earlier hangar
  packs were admitted with files missing — the parity/doctor strictness here is a
  same-day repair of the later packs.
- `1c544c70` loosens the self-iter dry_bias adapt trigger ("Loosen self-iter
  dry_bias adapt trigger") to keep the dry loop honest rather than to widen scope.
- `packages/substrate-kimi/hangar/FIDELITY.md` states "Private byte-identical
  hangars remain credential-blocked" — the credential-boundary concept is
  recorded in the tree, not inferred here.
- As-of framing: `hangar/`, `livepatch/` and `ports/xbgst-*` exist under these
  names only inside the 08-25/26 window; the fleet-wide xbgst-to-ufo rename with
  the sekhmet L3 tier dropped at `23b209b7` (2026-08-28) and the native-OMP
  re-charter at `96a4b6b4` (2026-08-29) move the tree. Cite commits, not current
  paths.
- Scope deviation from the assignment, recorded honestly: the assignment
  enumerated `5c84d111`, `db0412cf`, `1c544c70`, `fd1ddffa`, `ae2d17a3`; this
  beat covers the full scout-pins C5 set, adding the three same-family
  gap-closure commits `9d5ceadf`, `08e322a8`, `f9b1f7e5` (all verified above,
  all 2026-08-25) so no C5 member is left uncovered.
- Wave-4 coverage remediation: 10 member(s) folded from the mis-adjudicated F5-HANGAR rejection(s) (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-pins-report.md` (C5)
- Prior tip: `8a155ec0` — anchor of M-audit-early-0013
- Next: M-audit-early-0015
