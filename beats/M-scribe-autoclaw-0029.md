# M-scribe-autoclaw-0029 — charter beat
**Status:** AMENDED (correction shipped same day) | **Date:** 2026-09-28 | **Session:** autoclaw (charter-website-maintenance seat)

## Does
Synced the charter with the ufo-fsd-alpha **Origin** (`origin.cursor.com/jo-o-veiga/ufo-fsd-alpha`)
window `4adedde6..ee907f1cf` — **4,523 main-branch commits (2026-09-18 → 2026-09-27)** —
and retracted the same-day first version of this entry, which had been sourced from
the GitHub mirror `VeigaPunk/ufo-fsd-alpha` and was wrong: the mirror's tip
`72ab84a8` does not exist on the Origin, and its M0–M4 milestone line is absent
from Origin main. The Origin is the only source of record.

## Amendment history (kept, not erased)
- **First ship (0c767c2):** "1,531-commit window" through mirror tip `72ab84a8`
  (2026-09-25), M0–M4 sprint closing at "M4 r04". Read path: GitHub mirror,
  lineage-checked only against `4adedde6` — which the mirror shares with the
  Origin before the divergence point. Failed the gate when the operator ruled
  the Origin authoritative: count wrong (4,523 ≠ 1,531), tip wrong
  (`ee907f1cf` ≠ `72ab84a8`), tail of the arc wrong (nc8/nc9/magga omitted;
  M0–M4 not on the Origin).
- **This amendment:** entry rewritten from the Origin clone; head metas carry
  current art 2026-09-27, tip `ee907f1cf`; mirror retracted by name.

## Gate
```bash
# evidence — true-Origin lineage + window + rebuild (seat host + WSL, 2026-09-28)
# in WSL Ubuntu-24.04, clone made with `origin repo clone` (Cursor credential):
git -C /root/work/ufo-fsd-alpha remote get-url origin
#   -> https://origin.cursor.com/jo-o-veiga/ufo-fsd-alpha.git
git -C /root/work/ufo-fsd-alpha merge-base --is-ancestor 4adedde6 main   # exit 0
git -C /root/work/ufo-fsd-alpha rev-list --count 4adedde6..main          # 4523
git -C /root/work/ufo-fsd-alpha log -1 --format='%h %ad %s' --date=iso main
#   -> ee907f1cf 2026-09-27 nc9-docs-ii r06: record docs audit
git -C /root/work/ufo-fsd-alpha cat-file -t 72ab84a8                     # not found on Origin
git -C /root/work/ufo-fsd-alpha log --grep='M4 r04' --format='%h' -1 main # no match (mirror-only)
node build.js                                                            # baked, exit 0
```
Expected: ancestor check 0; count 4523; tip ee907f1cf; `72ab84a8` absent; build writes index.html.
Actual: all observed as expected; corrected entry present exactly once in baked
index.html, after the 2026-09-18 audit entry; section structure intact; sitemap
XML valid; live page re-fetched (200) showing the corrected entry and metas.

## Touches
- `build.js` + `src/index.template.html` — overlay chain entry replaced with the
  Origin-sourced text (kept in sync in both copies, per the bump-together rule).
- `index.html` — rebuilt via `node build.js` (gold snapshot + overlay chain).
- `src/index.template.html` head — description / og:description / twitter:description
  now read current art 2026-09-27, tip `ee907f1cf`, "on the Cursor Origin".
- `sitemap.xml` — charter lastmod 2026-09-28 (unchanged; entry date unchanged).
- `next-run.md` — dated section rewritten for the Origin window (supersedes the
  mirror version; superseded-not-erased convention).
- Seat repo — `VAULT.md` read-source section rewritten: Origin is the only
  source of record; GitHub mirrors non-authoritative.

## Out-of-scope
- The writable Origin itself — read-only honored; no push, no history rewrite,
  no swarm-state touch. `origin repo clone` + read-only git only.
- `VeigaPunk/ufo-fsd` and `VeigaPunk/ufo-fsd-alpha` (GitHub mirrors) — not
  pushed to, not deleted (operator's call; the Origin rule is recorded).
- The 2026-09-18 audit entry's counts (34 window / 1357 non-merge) — stand as
  written: they are closed-interval commit counts, internally consistent with
  the Origin chain; not defects.

## Findings
- True window shape (Origin): nc3 (2026-09-20→22, swarm + guidance + the
  canonical `/skill:ufo` invocation) → nc5 (09-24, magga-2 OMP fleet on an
  isolated `$HOME`/`/scratch` clone, bare audit-only `origin`; PrimeAgent
  assimilation r25) → nc6 synthesis (09-24, shared with the mirror line) →
  magga fleet rounds (09-25→27) → **nc8 super-wave (09-26→27: docs continuum
  + runtime/verify/e2e/sighting/iterate/orchestration/substrate lanes; ~960
  commits on main by author date)**
  → **nc9 audit waves (09-27)** → tip `ee907f1cf`.
- The GitHub mirror shares the Origin chain only up to nc6 and then diverges;
  everything past nc6 on the mirror (nc7-era, M0–M4 milestones) is not on
  Origin main. Mirror reads are barred for this seat going forward.
- Gate honesty: the first ship's beat gate was reproducible but sourced from a
  non-authoritative clone — a reproducible wrong answer. Lineage checks must
  bind to the declared source of record, not just to the audited base.

## Links
- Prior: M-scribe-grok-web-2528
- Vault: `../VAULT.md` (seat repo `charter-website-maintenance`)
- Mission: `charter-website-maintenance/deliverables/mission-001-seat-the-shokunin.md`
