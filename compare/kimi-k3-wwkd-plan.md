# State

Phase 0 data walk executed first-hand (all read-only probes, this session):

- obs [certain]: wave64 closed out — 64/64 slots, `DISTILL.md` ends `SYNTHESIS_READY`, COMPILE gate re-run → `WAVE64_COMPILE_OK`. No Pareto, no APPROVED; 13 CONFLICTS_RELAY unarbitrated.
- obs [certain]: verify-inplace plan landed — `.xbgst/runs/verify-inplace-m01..m08` + mut-pin-test evidence; pin mailbox ELF **present** (`abb9323e`, target/ rebuilt 22:02, symlink correct); grok-marketplace HEAD `7791c0e` (hardcap 64 + planner civic-timeout pin shipped).
- obs [certain]: surface-kimi plan landed — M1 log exists; M2 on disk (`grep -c 'tmux 0'` = 0, still unstaged per hold); M3 script `.xbgst/fixtures/check-speedrun-venue.sh` re-run → 3× PASS, exit 0.
- obs [certain]: live marketplace SKILL Godspeed list **includes** distiller at step 4 — the "distiller skip" carried-forward item is resolved at HEAD.
- obs [certain]: drift remains in 4 places: 6 hangar sibling judge files (floor-8/BAN-1–7 locks), kimi agents floor-4 sentence (`the-judge.md:50`, `orch.md:58`, `commands/xbgst.md:9` — 8–16 already softened to heuristic), `xbgst-codex/scripts/xask-dispatch.sh:192` ALLOW=1+180, stale SKILL mirrors (cache `8ac6b299`, xbrd-grok `bb6ddd49` — inf [moderate], from COMPILE, not re-hashed this walk).
- obs [certain]: plugin suites still don't pin BAN 4/5 / TIMEOUT=0 (slot-63 12/12 SURVIVED, per COMPILE).
- risk: `grok plugin update` re-wipes pin `target/` (proved 21:40). risk: naive `rg '1–7|floor 8'` FAILs correct files (negation trap) — all gates below are polarity-aware.

# Unknowns

- Whether `xbgst-codex` ALLOW=1/180 is deliberate surface policy or drift → judge (M5 is escalate-first).
- Whether kimi tree (published `ff37343`) agent edits ship this wave → judge.
- Kimi venue JSON disposition (fixed, unstaged; charter hold `no git add speedrun/`) → L1.

# Artifact: plan

```markdown
# Plan — wave64 drift burn-down + r0 closeout
**Session:** r1 | **Dispatched by:** xbgst (L1 Grok) | **Date:** 2026-08-24
**Spec:** `.xbgst/wave64/COMPILE.md` carried-forward + CONFLICTS_RELAY; `.xbgst/plan-r0-surface-kimi.md`; `.xbgst/plan-r0-verify-inplace-xask-notimeout.md`
**Author:** wwkd posture, 2026-08-24 (cursor consult lane, kimi-k3, --mode ask)

## Phase 0 — State map
- Exists: wave64 64/64 + DISTILL + COMPILE (gate green); verify-inplace M01–M08 evidence + pin mailbox ELF restored; surface-kimi M1–M3 (venue JSON fixed on disk, drift-check script passing); marketplace HEAD 7791c0e; PATH xask force-0 d1d082ad; tmux 0/1/2 alive, 1:1.1 kimi-code; marketplace SKILL distiller-skip resolved.
- Missing: 6 sibling judge files unaligned; kimi agents floor-4 sentence; xbgst-codex ALLOW=1/180; stale cache/clone SKILL mirrors; test pins for BAN 4/5 + TIMEOUT=0; wave64 Pareto/arbitration; NEXT retarget; venue JSON disposition.
- Risk: plugin-update wipes pin target/; grep polarity trap on negated doctrine; kimi/codex trees are separate repos (ship decisions, not local edits); hangar root not a git repo (`.xbgst/` has no commit vehicle).

## WWKD
1. **What:** Burn down the wave64 carried-forward drift (4 sites), pin the doctrine in tests so mutation can't survive, arbitrate the 13 conflicts, close out both r0 plans. Success = polarity gates green on all 4 drift sites + mutant-killing test pins + `wave64-pareto.md` + NEXT retargeted. Boundary: no `git add speedrun/`, no ufo-fsd writes, no livepatch 0006/0007, no tmux nuke, grok-bot dirt stays unstaged, no recrown, PATH xask never ALLOW=1.
2. **Why:** COMPILE lists 6 carried-forward items + 13 conflicts; two r0 plans are executed-but-unclosed; drift sites retrain L1 toward floor-8/min-dispatch every reload (the exact needle NEXT.md names).
3. **Assumptions/Risks:** wave-floor.md is the doctrine SSoT for siblings (obs: aligned with live SKILL). codex ALLOW=1 may be intentional — escalate before edit. Cache refresh via `grok plugin update` triggers the pin-wipe risk — M7 sequenced last with re-restore gate.
4. **How:** Baseline battery (M1) → overfit one sibling file (M2) → generalize siblings (M3) → widen to kimi tree (M4) → codex timeout policy (M5, escalate-first) → test pins (M6) → mirror refresh + pin re-restore (M7) → judge arbitration (M8, parallel, L1-only) → closeout (M_final).
5. **Escalation points:** (a) codex ALLOW=1 deliberate? (b) kimi agents edit = publish decision; (c) NEXT retarget + venue JSON disposition = L1; (d) any commit/push = judge APPROVED only; (e) cache refresh method (update vs manual copy) due to pin-wipe.

## Milestones
| # | Title | Gate command | Expected output | Executor |
|---|---|---|---|---|
| M01 | Skeleton: baseline battery on current disk | `cd ~/Projects/xbgst && bash .xbgst/fixtures/check-speedrun-venue.sh && bash xbgst-cursor-agent-surface/bin/xbgst-cursor-agent-surface-ping.sh && python3 -c "from pathlib import Path; p=Path('.xbgst/wave64'); assert len(list(p.glob('[0-9][0-9]-*.md')))==64; assert (p/'DISTILL.md').read_text().strip().endswith('SYNTHESIS_READY'); print('WAVE64_COMPILE_OK')"` | 3× PASS venue; `xbgst-cursor-agent-surface armed`; `WAVE64_COMPILE_OK` (planner ran all three this Phase 0) | gx-labrat-baseline |
| M02 | Overfit one: align `.xbgst/judge/executor-skill-wave-floor.md` to wave-floor.md doctrine | `python3 - <<'PY'\nimport re\nt=open('.xbgst/judge/executor-skill-wave-floor.md').read()\nbad=[l for l in t.splitlines() if re.search(r'1–7\|floor 8\|≥ ?8\|below 4',l) and not re.search(r'not\|never\|[Dd]o not',l)]\nassert not bad, bad\nassert re.search(r'BAN.{0,20}4.{0,10}5',t)\nprint('M02_ONE_FILE_OK')\nPY` | `M02_ONE_FILE_OK`; every 1–7/floor-8 mention negated; BAN 4/5 present | gx-executor-floor |
| M03 | Generalize: remaining 5 siblings (critic, review, simplifier, connector-r1, mutation) | same polarity script over `.xbgst/judge/*wave-floor*.md` (7 files incl. wave-floor.md) | `M03_SIBLINGS_OK` — 7/7 pass, wave-floor.md byte-untouched | gx-executor-floor |
| M04 | Widen: kimi agents floor-4 excision (`the-judge.md`, `orch.md`, `commands/xbgst.md`) | polarity script over the 3 files (pattern `below 4\|8–16` must be negated/heuristic-marked) + `bash xbgst-kimi/<gates>.sh` if present | `M04_KIMI_OK`; gates green. **Escalate (b) before write** — published repo | gx-executor-kimi |
| M05 | Widen: xbgst-codex timeout policy | **escalate (a) first.** If drift: edit → `! grep -q 'XASK_ALLOW_TIMEOUT=1' xbgst-codex/scripts/xask-dispatch.sh && bash -n xbgst-codex/scripts/xask-dispatch.sh` | `M05_CODEX_OK` or `M05_ESCAPED deliberate-policy` | gx-scout-codex → gx-executor-codex |
| M06 | Test pins: BAN 4/5 + TIMEOUT=0 kill mutants | extend `test-xask-dispatch-modes.sh`/`smoke-gates.sh`; re-run slot-63 mutants → 0 SURVIVED; suites green on clean tree | `GATE_INSTALL_HOST_PIN_OK` + `smoke-gates PASSED` + mutant run `0/12 SURVIVED` | gx-mutation-pins |
| M07 | Mirror refresh + pin re-restore | refresh cache/clone SKILL to live sha; then `test -x ~/.grok/installed-plugins/xbgst-stack-abb9323e/integrations/gx-teams/mailbox/target/release/xbgst-mailbox && xbgst-mailbox --help \| grep -q append` | `M07_MIRRORS_OK` + `MAILBOX_PIN_OK` (re-prove after any plugin update — wipe risk) | gx-executor-mirrors |
| M08 | Judge arbitration: 13 CONFLICTS_RELAY → Pareto | `.xbgst/judge/wave64-pareto.md` exists; per-conflict resolution line each; ends `AXES FINAL STATE` | file exists, 13/13 resolved or explicitly carried | **L1 only** (not an executor) |
| M_final | Closeout: NEXT retarget + scribe | `cat .xbgst/NEXT.md` names a live existing plan; closeout note under `.xbgst/handoff/`; venue JSON disposition recorded | both exist; no `git add speedrun/` | gx-scribe-closeout + L1 |

## Dependencies
M01 → all. M02 → M03. M03 ∥ M04 ∥ M05 (disjoint trees). M03 → M06 (doctrine stable before pinning). M06 → M07 (pins green before touching mirrors; wipe re-restore last). M08 parallel after M01, L1-owned. M_final after M03–M08.
```

## Refusal checklist (wwkd)
- Phase 0 done first-hand: every Exists claim above was executed this session (venue check, wave64 gate, ELF probe, greps), not read from specs.
- No write-everything-then-test milestone; M01 is a runnable e2e slice, M02 is one file bit-for-bit.
- No novel architecture: doctrine SSoT (`wave-floor.md`), drift script, and test suites already exist; this plan sequences them.
- Every milestone has a command-level gate; M01 is a user-visible slice (baseline green), not scaffolding.

| godspeed
