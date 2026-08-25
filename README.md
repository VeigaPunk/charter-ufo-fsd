# charter-ufo-fsd

The ufo-fsd charter — the Plazir frontier operation site, live at
**https://veigapunk.github.io/charter-ufo-fsd/** (Pages: deploy from `main` / root).

Centralized, reachable from any substrate. Iterate on it here.

## What's inside

- **Doctrine** — ufo-fsd: the golden map (three-layer substrate, xask dry, iterate cheap
  in parallel, cache-on-spawn, pins, self-improvement loop, wwkd) + the splits
  (do-not-collapse rules) + escape velocity framing.
- **The conversation** — the distilled dispatch log.
- **Current art** — the xbgst stack mapped by layer: L1 crown (grok-marketplace),
  core mold, L1 ports, desk, L2 consult, L3 fan-out, FSD overlay, posture,
  host/livepatch, CDP adapters, site gold. Public repos linked; private named only.
- **Substrate map** — model-class routing topology, public-safe.
- **Frontier log** — dated entries, on the record.
- **The dream** — the vessel + the A.A.OM tag.
- **Research paper** — *The Umwelt-Frontier Orchestrator* (PDF), direct:
  https://veigapunk.github.io/charter-ufo-fsd/papers/umwelt-frontier-orchestrator.pdf

## Stack

Plain static HTML/CSS/JS. `index.html` + `style.css` + `main.js` + `i18n.js`.
The vessel art ships as `vessel.webp` (lazy-loaded `<img>`, extracted from the old
base64 `dream.js`). PDF under `papers/`. `.nojekyll` — Pages serves as-is.

## i18n + badge (2026-08-25)

- `i18n.js` — vanilla locale engine: `locales/{lng}.json` fetched on demand, `[data-i18n]`
  innerHTML binding, `localStorage('plazir-lang')` persistence, navigator-language autodetect,
  en fallback. Switcher lives in the nav; `<html lang>`, `<title>`, and meta description localize too.
- Locales: en (SSoT, 194 keys) · zh-CN · ja · id · ms · th · vi · fil · my · km.
  Brand/technical tokens (PLAZIR, Kimi, ufo-fsd, xask, repo names) stay untranslated by rule;
  `<pre>` ASCII blocks stay English (terminal artifacts, alignment is load-bearing).
- Badge: `PLAZIR runs on Kimi™` — fixed bottom-right, localized like everything else.
- Parity gate: every locale must match en.json key-for-key with identical HTML tag sequences.


## Mapping rules

Named GitHub remotes are gold. Hangar is cache, not SSoT. If two named remotes
disagree, stop and escalate. Do not recrown L1: the seated judge is xbgst on
Grok Build; kimi is a live L1 candidate, not the crown.

On 2026-08-24 the operator praise lands in the frontier log: Kimi is the best model
right now; Grok bought Cursor and is handling it on a silver platter; Kimi is the
side dish better than the main course. Kimi K3 Max fast inference via Cursor Ultra OAuth; PATH
`xask --provider cursor --model-id kimi-k3-max`. Fast is Ultra metering, not a
service-tier flag. `xbgst-cursor-agent-surface` is the usage surface; `xbgst-cursor` is
the FSD orch port. Hangar cheap FIRST stays Token Plan. L1 crown stays xbgst on
Grok Build.

> Frontier is not a place. Its a perpetual. It is the practice of keeping the map true
> while everything underneath it changes.

No prior art. Only current art, done live.
