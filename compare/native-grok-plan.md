# Plan — Enact judge loop + Pareto on remaining live gaps
**Session:** r0 | **Dispatched by:** the-judge | **Date:** 2026-08-24
**Spec:** judge handoff (enact judge + Pareto; do not farm L1 context) · skill `xbgst` Godspeed steps 3–5 · prior `.xbgst/plan-r0-verify-inplace-xask-notimeout.md`
**Author:** wwkd posture, 2026-08-24
**[planner-gate: advisory, risks-open]**

```
xask mapping consult: PATH xask --provider cursor --model-id kimi-k3-max --gs … wwkd
<raw_output>
obs [certain]: wave64 closed out — 64/64 slots, `DISTILL.md` ends `SYNTHESIS_READY`, COMPILE gate re-run → `WAVE64_COMPILE_OK`. No Pareto, no APPROVED; 13 CONFLICTS_RELAY unarbitrated.
</raw_output>
```

Mapping consult is **not** SSoT for this wave's write-set. It proposed a 64-wide drift burn-down (sibling floor-8 files, kimi agents, codex ALLOW=1, cache mirrors). Data-walk below **drops** that as pad: last 64-wide fleet on ufo-fsd was cheap and nuked-on-spawn; COMPILE already recorded no Pareto. This plan's success boundary is a **real judge loop** on remaining evidence-bearing product/process gaps, not another 64-file overlay.

## Data walk (Phase 0, inspected not designed)

Hangar `/home/vgpnk/Projects/xbgst` is **not** a git repo. Ship vehicles: `grok-marketplace` `7791c0e` = `origin/main` ("Raise gx-teams hardcap to 64 and pin planner civic bash timeout."); `plazirhangar` `9251659` origin/main (`max_concurrent = 64`); hangar `gx-teams` `2ad7567` origin/main (`HARDCAP=64`). Pin `xbgst-stack-abb9323e` **v1.1.33**; overlays (8) realpath → pin; PATH `gx-teams` and `xbgst-mailbox` → pin. Pin SKILL/planner/install-host/pin-test **byte-identical** to hangar marketplace (sha SKILL `06cb9051…`, planner `3b0dd09e…`, install-host `d91e3a29…`, pin-test `4d3b1f77…`). Marketplace-cache SKILL now matches pin (`06cb9051…`) — wave64 COMPILE's cache `8ac6b299` / live `f5bd1002` / HEAD `5024cf4` are **stale vs this walk**.

Mailbox pin ELF **present** (1251464 B, 22:02, `MAILBOX_PIN_OK` in `.xbgst/runs/verify-inplace-m02.txt`); pin vs hangar ELF **different bytes** (no hangar copy). `xbgst-mailbox --help` lists `append`. Plugin details `updated` 21:40 local; `grok plugin update` still wipes gitignored `mailbox/target/`. install-host: skip cargo when pin ELF executable, else `cargo --release` on `$OVERLAY_ROOT` (the pin).

`tests/test-install-host-pin.sh` **plants** pin+hangar ELF stubs (`echo pin-mailbox`). Isolated missing-ELF mutant (Cargo.toml+src, no `target/release`) **SURVIVED**: `MUTANT_RC=0`, still `GATE_INSTALL_HOST_PIN_OK`, cargo compiled into the pin fixture (`.xbgst/runs/mut-pin-test/evidence/install-pin.log` `Compiling xbgst-mailbox` under `installed-plugins/xbgst-stack-aaa`). Hangar test sha unchanged. False green: GATE does not distinguish skip-cargo vs cargo-into-pin vs hangar ELF steal.

Civic timeout: `agents/the-planner.md` has `FIRST xask bash must pass timeout 300000 or timeout 0 + background true` (pin=hangar). `agents/scout.md` and `agents/connector.md` **NO_CIVIC**. Grok bash schema still advertises FG 120s (`schema_default_timeout_ms` → `Some(120_000)`). PATH xask sha `d1d082ad…` force `XASK_TIMEOUT_SECS=0`. This planner's mapping consult survived with bash timeout 300000.

Process: live SKILL Godspeed step 3–5 **already** is freeze-roster → wait DESPAWN → distiller → evidence-first Pareto → COMPILE. Distiller agent exists. wave64: 64/64 + `DISTILL.md` ends `SYNTHESIS_READY` + `COMPILE.md` **no Pareto / no APPROVED**; `.xbgst/judge/wave64-pareto.md` **absent**. User roast matches disk: L1 skipped Pareto; L1 edited plazirhangar/gx-teams after interrupt (those 16→64 ships are now on `origin/main` — do not redo). `.xbgst/NEXT.md` still names `plan-r0-surface-kimi.md` (stale crown).

Frozen still dirty and **must not be touched**: ufo-fsd `artifacts/2026-08-23-host-restore/{README.md,grok.config.toml,identity.env}` modified; grok-marketplace grok-bot 3 files `M` (33 insertions); ds4cc speedrun hold; livepatch 0006 exists standalone only (pin patches 0001–0005); tmux `0`/`1`/`2` attached.

## Phase 0 — State map
- Exists: unique pin `abb9323e` 1.1.33; 8 overlays → pin; PATH mailbox ELF on pin (`MAILBOX_PIN_OK`); PATH xask never-timeout; planner civic-timeout sentence; SKILL already encodes PROPOSE→wait→distiller→Pareto→COMPILE + BAN 4/5 + ceiling 64 + connector mandatory + DESPAWN; plazirhangar+gx-teams HARDCAP/ceiling 64 shipped `origin/main`; wave64 64/64 + SYNTHESIS_READY + COMPILE (filter-exempt, **no Pareto**); verify-inplace M01–M08 run logs; pin-test `GATE_INSTALL_HOST_PIN_OK` (false-green on missing-ELF); grok-bot dirt unstaged.
- Missing: a **this-activation** freeze-roster + wait-all + distiller `SYNTHESIS_READY` + evidence-first Pareto KEEP/DROP + COMPILE on remaining gaps; pin-test case with pin `Cargo.toml` and **no** planted ELF; civic-timeout sentence on `scout.md` + `connector.md`; `.xbgst/judge/wave64-pareto.md` (13 CONFLICTS_RELAY unarbitrated); honest NEXT crown onto this plan.
- Risk: `grok plugin update` wipes pin `target/` again (frozen mid-wave). Missing-ELF assertion polarity: CHANGELOG 1.1.33 designs cargo-on-pin when ELF absent vs mutation-tester "GATE must fail if cargo ran against OVERLAY_ROOT" — **escalate before executor writes the test**. Host `get_command_or_subagent_output` arity max **20** ids — split waits, still wait ALL before distiller. Filling to 64 without unique contracts repeats the ufo-fsd cheap fleet. L1 editing product during PROPOSE is the 200k-context failure mode. Process fix is **this L1 following existing SKILL**, not a new SKILL novel.

## WWKD
1. **What:** Run one real xbgst judge loop on remaining live gaps: PROPOSE freeze-roster of named `gx-*` (BAN sizes 4 and 5; do not treat 16 as a cap; fill toward 64 **only when rows have unique work**; connector mandatory) → wait DESPAWN set (split `get_command_or_subagent_output` at 20 ids, wait ALL) → distiller (grok) `SYNTHESIS_READY` → Pareto (drop moves missing `evidence:`; keep moves that improve ≥1 axis and harm none) → scribe COMPILE concurrent with Pareto. Success = that loop's artifacts exist **and** KEEP'd product gates are green. Boundary: L1 does not edit product files during PROPOSE (user interrupt is the only L1-implement exception). No ufo-fsd writes, no livepatch 0006/0007, no grok-bot stage, no gh repo delete, no hangar `rm -rf`, no ds4cc `git add`, no tmux 0/1/2 nuke, no `grok plugin update` mid-wave.
2. **Why:** User: enact judge and Pareto filtering rounds; another `/xbreed-team`; do not farm L1 context. Evidence: wave64 COMPILE `no Pareto`; L1 did specialist work (~200k) and skipped distiller+Pareto last activation; 64-wide ufo-fsd fleet was cheap/nuked-on-spawn. Remaining product with disk evidence: pin-test missing-ELF false green; plugin-wipe mailbox ELF; civic timeout missing on scout/connector. plazirhangar/gx-teams 64 already shipped — DROP redo.
3. **Assumptions/Risks:** SKILL L316–325 is already the loop — do not author a process SKILL rewrite. R1 PROPOSE is evidence-only (no product writes) so mutation and executor do not race. Default missing-ELF KEEP = extend the test to exercise cargo-on-pin + hangar-not-linked (CHANGELOG), **not** refuse-cargo, unless judge flips escalation (a). Civic timeout is a one-sentence copy from planner onto scout then connector. Pin steal after KEEP is hangar marketplace edit + pin `install-host.sh`, never `grok plugin update`. Advisory planner-gate: if judge does not ACK in one dispatch cycle, executors may proceed with this marker on R1 **evidence** rows only — still no L1 product edit.
4. **How:** M01 skeleton = freeze R1 roster (12 named, ≠4 ≠5, connector in) + spawn + wait-all + distiller + Pareto + COMPILE with **zero** product edits. M02 overfit the one live mutant (missing-ELF pin-test) only after KEEP. M03 plugin-wipe recovery gate (no plugin update). M04 civic scout.md. M05 civic connector.md. M06 frozen/hygiene continuous. M_final NEXT/scribe. Round 2 PROPOSE (after M01 Pareto) holds the executors; fill toward 64 only if KEEP created more unique rows.
5. **Escalation points:** (a) missing-ELF assertion: cargo-on-pin (default, CHANGELOG 1.1.33) vs refuse-cargo-into-pin (mutation-tester rec) — judge before M02 write; (b) kimi agents "below 4 prohibited" / 8–16 — published repo, not this hangar write-set; (c) `xbgst-codex/scripts/xask-dispatch.sh` ALLOW=1+180 — deliberate vs drift, escalate-first; (d) hangar `.xbgst/judge/*wave-floor*` sibling floor-8 notes — hangar not a git repo, do not treat as ship; (e) wave64 13 CONFLICTS_RELAY — do not re-fleet 64; judge may KEEP a subset as context; (f) plugin-suite BAN 4/5 / TIMEOUT=0 pins (slot 63 12/12 SURVIVED) — second round only if axes remain after M01–M05; (g) grok bash `schema_default_timeout_ms` / livepatch 0007 — frozen; (h) recrown `.xbgst/NEXT.md` onto this plan — L1 after M01 loop exists; (i) any `APPROVED` commit/push — judge only, grok-bot stays unstaged.

## Process lock (non-negotiable — judge copies this)

Round N **PROPOSE** is a freeze-roster of named `gx-*` only.

- BAN wave sizes **4** and **5**. Do **not** ban 1–7 as a range. Do **not** treat **16** as a cap.
- Fill toward **64** when rows have unique work, an observable gate, and an evidence schema. **Do not pad.** Last 64-wide ufo-fsd wave is the anti-pattern.
- Connector **mandatory** every PROPOSE after Round 0.
- Distiller and scribe are **not** PROPOSE rows. Distiller after the DESPAWN set. Scribe COMPILE **concurrent with Pareto**.
- L1 does **not** edit product files during PROPOSE (`grok-marketplace/plugins/`, `plazirhangar/`, `gx-teams/`, `ufo-fsd/`). Hangar `.xbgst/` loop artifacts only. User interrupt = only L1-implement exception.
- Wait: `get_command_or_subagent_output` on roster ids. Host wait tool max **20** ids — split (e.g. 20+20+…); still wait **ALL** ids before spawning distiller. R1 below has 12 ids → one wait is enough; the split rule is for later fill-toward-64.
- Then distiller (grok / grok-4.6-low per SKILL) emits `SYNTHESIS_READY`.
- Then Pareto: drop moves missing required `evidence:`; keep moves that improve ≥1 axis and harm none.
- Do not narrate per-child completions. Do not `/feedback`. Do not farm L1 context by doing specialist work.

### R1 freeze-roster (evidence-only; copy into `.xbgst/r1-judge-pareto/ROSTER.md`)

N=12 (not 4, not 5). Connector in. No ufo-fsd. No pad to 64.

| slot | name | contract (write `.xbgst/r1-judge-pareto/{slot}-{role}.md` only) |
|---|---|---|
| 00 | gx-labrat-baseline | overlays→pin; pin mailbox ELF executable; pin-test **current** `GATE_INSTALL_HOST_PIN_OK`; file stdout |
| 01 | gx-mutation-pin-elf | isolated copy only: missing-ELF mutant still SURVIVES; do not edit hangar test |
| 02 | gx-scout-wipe | plugin-update wipe of pin `target/` + install-host cargo recovery; **do not** `grok plugin update` |
| 03 | gx-reviewer-pin-test | CHANGELOG 1.1.33 skip-cargo-when-present vs mutant "refuse cargo"; recommend KEEP polarity; no write |
| 04 | gx-labrat-civic-gap | planner has civic-timeout sentence; scout.md + connector.md do not; polarity-aware grep |
| 05 | gx-reviewer-civic-agents | one-sentence copy-fit onto scout then connector FIRST bullets; no write this round |
| 06 | gx-critic-process | attack: L1-implement during PROPOSE, skip distiller/Pareto, 64-pad, skill-novel for 200k context |
| 07 | gx-simplifier-no-skill-novel | process already in SKILL L25–26 / L316–325; DROP new skill text for L1 context |
| 08 | gx-sentinel-frozen | ufo-fsd / 0006 / 0007 / grok-bot / gh-delete / hangar-rm / ds4cc-add / tmux 0/1/2 / plugin-update |
| 09 | gx-sentinel-grokbot | grok-bot 3 files stay `M` unstaged |
| 10 | gx-labrat-hardcap-drop | plazirhangar `max_concurrent=64` + gx-teams `HARDCAP=64` already `origin/main` → DROP redo |
| 11 | gx-connector-r1 | mandatory; cross-axis: false-green test × plugin-wipe × civic gap × process-already-in-skill |

### R2 freeze-roster (only after M01 `SYNTHESIS_READY` + Pareto KEEP; judge may add unique rows toward 64)

Seed (N=8 if all three product KEEPs land; **not** 4 or 5; connector in):

| name | only if KEEP | write-set |
|---|---|---|
| gx-executor-pin-test | missing-ELF test KEEP | `grok-marketplace/plugins/xbgst-stack/tests/test-install-host-pin.sh` (+ overlay cmp if needed) |
| gx-labrat-retest | after executor | re-run pin-test + `scripts/smoke-gates.sh` |
| gx-executor-civic-scout | civic KEEP | `agents/scout.md` only (hangar marketplace) |
| gx-executor-civic-connector | after scout gate | `agents/connector.md` only |
| gx-reviewer-r2 | those writes | review + overlay identity |
| gx-connector-r2 | always | mandatory |
| gx-sentinel-frozen | always | holds |
| gx-critic-r2 | always | attack regressions |

If Pareto KEEPs fewer than 3 product moves, **do not** shrink to 4 or 5 by padding — drop empty executor rows and keep connector+sentinel+critic+reviewer+labrat so N∉{4,5}. If more unique KEEP rows appear, fill toward 64 with named contracts, never `general-purpose`/`explore`.

## KEEP / DROP (this walk — Pareto starts from this table)

| move | verdict | evidence |
|---|---|---|
| pin-test missing-ELF case | **KEEP** | mutant SURVIVED; test plants ELF; `Compiling` into pin fixture; GATE still OK |
| plugin-wipe mailbox ELF recovery | **KEEP** (process+gate, no `grok plugin update`) | 21:40 wipe; 22:02 pin cargo restore; install-host skip-vs-cargo |
| civic timeout scout.md then connector.md | **KEEP** | planner CIVIC; scout/connector NO_CIVIC; grok bash 120s still kills FIRST xask |
| L1 200k / skip Pareto | **KEEP as process** | SKILL already has the loop; wave64 COMPILE no Pareto; **DROP** new SKILL novel |
| plazirhangar 16→64 | **DROP** | `9251659` origin/main; `max_concurrent = 64` |
| gx-teams HARDCAP 16→64 | **DROP** | `2ad7567` + pin/marketplace `HARDCAP=64` |
| grok-bot dirt | **LEAVE** (hold, not a ship) | 3 files `M`; do not `git add` |
| 64-wide ufo-fsd re-fleet / sibling floor-8 burn-down | **DROP this wave** | roast + COMPILE already 64/64; hangar judge notes not a ship vehicle |
| kimi agents / xbgst-codex ALLOW=1 / livepatch 0007 | **ESCALATE** | not remaining hangar product with a cheap gate this activation |

## Milestones
| # | Title | Gate command | Expected output | Executor |
|---|---|---|---|---|
| M01 | Skeleton: real R1 loop (roster → wait-all → distiller → Pareto → COMPILE). Evidence-only. L1 does not edit product. | `python3 - <<'PY'\nfrom pathlib import Path\nimport re\nr=Path('/home/vgpnk/Projects/xbgst/.xbgst/r1-judge-pareto')\nroster=(r/'ROSTER.md').read_text()\nnames=re.findall(r'gx-[a-z0-9-]+', roster)\nuniq=list(dict.fromkeys(names))\nassert 0 < len(uniq) != 4 and len(uniq) != 5, uniq\nassert any('connector' in n for n in uniq)\nassert (r/'DISTILL.md').read_text().strip().endswith('SYNTHESIS_READY')\ncomp=(r/'COMPILE.md').read_text()\nassert 'KEEP' in comp and 'DROP' in comp\nassert 'no Pareto' not in comp.lower() or 'PARETO' in comp\nprint('R1_LOOP_OK', 'n=', len(uniq))\nPY`  plus `git -C "$HOME/Projects/xbgst/grok-marketplace" diff --stat; git -C "$HOME/Projects/xbgst/plazirhangar" diff --stat; git -C "$HOME/Projects/xbgst/gx-teams" diff --stat; git -C "$HOME/Projects/xbgst/ufo-fsd" diff --stat` during PROPOSE must show **no new product hunks from L1** (ufo-fsd/grok-bot dirt may already exist — must not grow). | `R1_LOOP_OK n= 12` (or other N∉{4,5}); DISTILL last line `SYNTHESIS_READY`; COMPILE has KEEP/DROP from evidence; L1 product trees unchanged this PROPOSE. Wait tool: one `get_command_or_subagent_output` on the 12 ids (N≤20). Then spawn `gx-distiller-r1`. Spawn `gx-scribe-r1` concurrent with Pareto. | gx-labrat-baseline + R1 roster (table) → gx-distiller-r1 → **the-judge Pareto** + gx-scribe-r1 |
| M02 | Overfit one: missing-ELF pin-test (only after M01 KEEP of that row; default polarity = cargo-on-pin, hangar ELF not linked) | After KEEP (a)-default: extend `plugins/xbgst-stack/tests/test-install-host-pin.sh` with a second fixture: pin has `Cargo.toml`+`src`, **no** `target/release/xbgst-mailbox`; hangar has a stub ELF; run install-host; **FAIL** if PATH/link is hangar ELF; **PASS** if pin ELF exists after cargo on `$OVERLAY_ROOT`. Isolated mutant of "plant ELF again" must now be **killed**. Gate: `cd "$HOME/Projects/xbgst/grok-marketplace" && bash plugins/xbgst-stack/tests/test-install-host-pin.sh` | `GATE_INSTALL_HOST_PIN_OK`; missing-ELF path exercised; hangar ELF not selected. If judge flipped (a) to refuse-cargo, this gate is inverted — **stop and re-read KEEP**. Do not bump 1.1.34 unless L1. Overlay `cmp` pin↔hangar if `install-host.sh` unchanged (expected). | gx-executor-pin-test then gx-labrat-retest |
| M03 | Plugin-wipe recovery without `grok plugin update` | `PIN="$HOME/.grok/installed-plugins/xbgst-stack-abb9323e"; test -x "$PIN/integrations/gx-teams/mailbox/target/release/xbgst-mailbox"; test "$(readlink -f "$HOME/.local/bin/xbgst-mailbox")" = "$(readlink -f "$PIN/integrations/gx-teams/mailbox/target/release/xbgst-mailbox")"; xbgst-mailbox --help \| grep -q append; echo MAILBOX_PIN_STILL_OK` — recovery if ELF missing: pin `install-host.sh` cargo on `$OVERLAY_ROOT` only (same as verify-inplace M02). **Forbidden:** `grok plugin update`; hangar `cargo` under `grok-marketplace/` or `~/Projects/xbgst/gx-teams/`. | `MAILBOX_PIN_STILL_OK`. File stdout `.xbgst/r1-judge-pareto/m03.txt`. | gx-scout-wipe (evidence in R1) then gx-labrat-baseline (re-prove); restore executor only if ELF actually gone **and** KEEP |
| M04 | Civic timeout on **scout.md** only (one file, after KEEP) | Copy planner sentence onto hangar `plugins/xbgst-stack/agents/scout.md` xbgst-mode FIRST bullet: `FIRST xask bash must pass timeout 300000 or timeout 0 + background true.` Gate: `python3 - <<'PY'\nfrom pathlib import Path\ns=Path('/home/vgpnk/Projects/xbgst/grok-marketplace/plugins/xbgst-stack/agents/scout.md').read_text()\nassert 'timeout 300000' in s and 'timeout 0' in s and 'background true' in s\nassert "xask --provider cursor --model-id kimi-k3-max --gs" in s\nprint('M04_SCOUT_CIVIC_OK')\nPY` | `M04_SCOUT_CIVIC_OK`. Pin steal via pin `install-host.sh` after M05, not plugin update. | gx-executor-civic-scout |
| M05 | Widen civic timeout to **connector.md** (after M04 gate) | Same sentence on `agents/connector.md`. Gate: same python over connector.md → `M05_CONNECTOR_CIVIC_OK`. Then `cmp` hangar vs pin after steal, or pin install-host `--no-timer`. | `M05_CONNECTOR_CIVIC_OK`; pin scout+connector contain the sentence after steal. CHANGELOG Unreleased bullet only. | gx-executor-civic-connector then gx-reviewer-r2 |
| M06 | Frozen + grok-bot leave (continuous) | `git -C "$HOME/Projects/xbgst/grok-marketplace" status --porcelain \| grep -E 'grok-bot' >/dev/null; test -f "$HOME/Projects/xbgst/grok-build-livepatch/patches/0006-xbgst-mailbox-tools.patch"; test ! -e "$HOME/.grok/installed-plugins/grok-build-livepatch-47e53b28/patches/0006-xbgst-mailbox-tools.patch"; tmux ls \| grep -E '^[012]:'; test -d "$HOME/Projects/xbgst/ufo-fsd"; echo BOUNDARY_OK` | `BOUNDARY_OK`; grok-bot still dirty unstaged; 0006 not on live pin; tmux 0/1/2 listed. **Forbidden** list in What-boundary. | gx-sentinel-frozen + gx-sentinel-grokbot |
| M_final | COMPILE closeout + NEXT (L1/scribe after Pareto) | `test -f /home/vgpnk/Projects/xbgst/.xbgst/r1-judge-pareto/COMPILE.md && tail -n 1 /home/vgpnk/Projects/xbgst/.xbgst/r1-judge-pareto/DISTILL.md` — COMPILE ends with axis table + `AXES FINAL STATE` or next-PROPOSE seed. NEXT retarget is **escalation (h)**, not a silent rewrite. | DISTILL last line `SYNTHESIS_READY`; COMPILE has KEEP/DROP + gates; grok-bot unstaged; no ufo-fsd write from this loop. | gx-scribe-r1 + the-judge (not an executor for APPROVED) |

### M02 notes (executor; overfit this test only)

- Least disruption: add a **second** case; keep the existing planted-ELF case (skip-cargo-when-present still has to pass).
- Isolated mutation dir only for gx-mutation-pin-elf. Hangar file write is gx-executor-pin-test in **R2**.
- Default KEEP (a): cargo on pin is the designed recovery for plugin-wipe. Test must go **red** if hangar ELF is linked, **green** if pin cargo/link. Do not `CARGO_TARGET_DIR` invention unless judge asks.
- If KEEP flips to refuse-cargo: change `install-host.sh` **and** the test together; that is a different milestone — stop.

### M01 notes (judge; do not farm context)

- Freeze the 12-row table into `.xbgst/r1-judge-pareto/ROSTER.md` **before** `spawn_subagent`.
- One turn, all 12. Failed spawn retry-or-abandon immediately. Never trickle 1–2.
- Wait ALL 12 ids, then **one** distiller, then Pareto **in the judge**, scribe concurrent.
- Do not implement M02–M05 inside M01. That is the roast.
- wave64 files stay as prior-art; do not append this loop into `.xbgst/wave64/`.

## Dependencies
M01 is the skeleton (process e2e). M01 Pareto KEEP → M02 (overfit pin-test). M02 ∥ M03 (mailbox prove; restore only if ELF gone). M02+M04 share R2 PROPOSE; M04 → M05 (scout before connector). M06 continuous. M_final after M01; product COMPILE lines update after M02–M05 gates. Round 2 always runs if M01 improved the process axis (anti-premature-halt).

## Out of scope / frozen
- `/home/vgpnk/Projects/xbgst/ufo-fsd` writes (working 64-wide fleet vehicle — do not edit this wave).
- Livepatch 0006 apply; livepatch 0007 invent.
- `gh repo delete`; hangar `rm -rf`; ds4cc `git add` / `git add speedrun/`.
- Staging grok-bot bins/tests.
- `grok plugin update` / reinstall mid-wave.
- Recrown Cursor; tmux 0/1/2 nuke.
- New SKILL.md process novel for "don't farm L1 context".
- Redo plazirhangar / gx-teams 64 (already origin/main).
- kimi published agents; xbgst-codex ALLOW=1 (escalate).
- Civic xask consult as a product gate (this session's mapping consult already ran).

## Judge axes (proposed; judge names)
judge-loop-complete, pin-elf-honest, civic-timeout-hangar-first, l1-no-specialist-work, frozen-holds
