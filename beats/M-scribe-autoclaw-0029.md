# M-scribe-autoclaw-0029 — charter beat
**Status:** COMPLETE | **Date:** 2026-09-28 | **Session:** autoclaw (charter-website-maintenance seat)

## Does
Synced the charter with the ufo-fsd-alpha window the site had not yet recorded:
`4adedde6..72ab84a8`, **1,531 main-branch commits (2026-09-18 → 2026-09-25)**, read
from the public mirror `VeigaPunk/ufo-fsd-alpha` after lineage verification.
Baked one dated log entry into the static page, refreshed the served head metas
(current art 2026-09-13 → 2026-09-25), bumped the sitemap lastmod, and recorded
the surface survey in the seat vault.

## Gate
```bash
# evidence — lineage + window + rebuild (run on the seat host, 2026-09-28)
git clone --filter=blob:none --single-branch --branch main \
  https://github.com/VeigaPunk/ufo-fsd-alpha.git repos/_scratch/ufo-fsd-alpha
git -C repos/_scratch/ufo-fsd-alpha merge-base --is-ancestor 4adedde6 main   # exit 0
git -C repos/_scratch/ufo-fsd-alpha rev-list --count 4adedde6..main          # 1531
git -C repos/_scratch/ufo-fsd-alpha log -1 --format='%h %ad' main            # 72ab84a8 2026-09-25
node build.js                                                                # baked, exit 0
```
Expected: ancestor check 0; count 1531; tip 72ab84a8; build writes index.html.
Actual: all four observed as expected; entry present in baked index.html once;
no local-secret tokens (panes, `$HOME` internals, host paths) in the served page.

## Touches
- `build.js` + `src/index.template.html` — overlay chain gains the 2026-09-28
  window entry (kept in sync in both copies, per the bump-together rule).
- `index.html` — rebuilt via `node build.js` (gold snapshot + overlay chain).
- `src/index.template.html` head — description / og:description / twitter:description
  now read current art 2026-09-25, tip `72ab84a8`.
- `sitemap.xml` — charter lastmod 2026-08-25 → 2026-09-28.
- `next-run.md` — new dated section (current art), superseding-not-erasing prior eras.
- Seat repo — `VAULT.md` (per-surface standing record, 7 surfaces) + ledger line.

## Out-of-scope
- The writable Cursor Origin (`tmp-d1cb8c062407c7a9`) — read-only honored; no
  push, no history rewrite, no swarm-state touch. Native `origin` CLI is
  macOS/Linux/WSL-only; no auth token exists on this Windows seat, so the
  public mirror (lineage-verified) served as the read source this beat.
- `VeigaPunk/ufo-fsd` (the August mirror) — not pushed to; its staleness is
  recorded, not repaired (private-history questions stay with the operator).
- Recrown / parent-goal claims — none made; parent goal stays OPEN per tip docs.

## Findings
- Window shape: nc3 nightcall wave 2026-09-21/22 (~540: swarm mechanics,
  guidance re-pins, L2/L3 routing doctrine) → nc5 2026-09-24 (~910: magga-2
  OMP fleet on an isolated `$HOME`/`/scratch` clone with bare audit-only
  `origin`; PrimeAgent assimilation r25) → nc6 synthesis (72-lane verification)
  → M0–M4 milestone sprint closing at M4 r04 `72ab84a8`.
- Tip doctrine (unchanged, now mirrored): dispatch OMP-only;
  `crates/ufo-core-runtime` sole judge; open clauses = authenticated live-LLM
  specialist evidence + private LKG byte-identical clone.
- Seat-surface survey: 7 surfaces; 6 live; `vgn-bounty-lab-pub` has no Pages
  (repo-only). The `canonical-links/charter-ufo-fsd` copy is a stale shallow
  clone on an unpushed `fleet/canonical-vault-links` branch — workspace
  `repos/charter-ufo-fsd` is current art for this seat.
- Same-day sibling lane: `d69dd22` landed the og:/twitter head block (judged
  KEEP) while this beat was in flight; built on top of it, no clobber.

## Links
- Prior: M-scribe-grok-web-2528
- Vault: `../VAULT.md` (seat repo `charter-website-maintenance`)
- Mission: `charter-website-maintenance/deliverables/mission-001-seat-the-shokunin.md`
