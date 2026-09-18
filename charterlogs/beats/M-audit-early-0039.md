# M-audit-early-0039 — Wrong-referent nuke: oh-my-posh port removed; omp is omp² (omp.sh)

**Status:** COMPLETE | **Date:** 2026-08-28 | **Session:** audit-early

## Does
This is the day's causal spine and its honest failure. At 11:10:02 `853cedaf` lands "oh-my-posh
substrate port + grok-only lanes + seat batteries and landing-wave work" — 171 files, +10952/−402,
adding `packages/substrate-omp/` (PORT.md, README.md, SKILLS.md, `bin/ufo-omp.mjs`, `config/omp.json`,
`install.sh`, vendored godspeed-core, hangar, lib, skills, substrate.json, upstream), the
`ports/{omp,oh-my-posh,ufo-omp,xbgst-omp}` copies, `substrates/omp/`, eight `test-omp*` /
`test-substrate-omp*` batteries and `scripts/assert-omp-port-mesh.mjs`. Fourteen minutes later, at
11:24:07, `c34f3666` deletes all of it: "chore: nuke oh-my-posh port (1/2) — wrong referent; omp is
the omp² agentic harness (omp.sh). Host binary+config+themes removed; package/ports/substrate dirs +
batteries + mesh assert removed. Follow-up commit must scrub live refs (see handoff.json ompNuke)"
— 64 files, 3959 deletions, no insertions. The rationale is not in the commits (both are
subject-only); it is in the handoff records written minutes later. `6b96e1ad` (11:16:20, `handoff.json`
+2/−1) writes the rebootNote, whose `postRebootAutoRun` reads "NONE — kimi-auth-proxy autostart
disabled at operator request 2026-08-28" (the re-enable command it carries is an operational
runbook detail and is omitted from this public beat). `735ead86` (11:24:38, `handoff.json` +17) writes `ompNuke`,
whose `status` is "1/2 done at operator reboot (commit c34f3666)", whose `note` is "omp == omp2
agentic harness per https://omp.sh/ (operator correction). Install via curl -fsSL
https://omp.sh/install | sh only when operator green-lights the real port.", and whose
`remainingForNextSpin` lists seven items ending "then commit as 'chore: nuke oh-my-posh port (2/2)
— live refs scrubbed'". `33dce885` (11:27:01, `handoff.json` +11) writes `stackDirective`, quoting
the operator verbatim: "we work ONLY on the ufo stack. ufo-fsd-alpha is the sole skill stack and
framework going forward. ufo is upstream now. do NOT keep working on xbgst files — they are
heritage/read-only context, not work targets." — with `purpose` "make ufo-fsd-alpha work on itself
(self-hosting) after a clean rebase, landing locally from cloud to plazir27 (the operator's local
surface)". The mandated 2/2 scrub lands at 20:19:29: `1d31b708` neutralizes six `scripts/gates.sh`
check lines that referenced scripts the nuke deleted, and its body states the reasoning — "The
oh-my-posh nuke commit's own message mandates a follow-up scrub of live refs; these six check lines
... failed by file-not-found on every battery run. Neutralized with provenance comments, not
deleted, so the battery's history stays legible." Decision line (quoted from the nuke's handoff
note): the referent was wrong — `omp` was taken for the oh-my-posh prompt theme when it is the omp²
agentic harness — so the port was torn out rather than repaired, and the correct harness was wired
later the same day (M-audit-early-0041).

## Gate
```
for s in 853cedaf c34f3666 6b96e1ad 735ead86 33dce885 1d31b708; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git log --no-walk --pretty="%h %ad %s" --date=format:'%H:%M' 853cedaf c34f3666 6b96e1ad 735ead86 33dce885 1d31b708
git show --shortstat --pretty=%h c34f3666
git cat-file -e 735ead8c^{commit}
```
Expected: 6x "ok"; 853cedaf at 11:10 and c34f3666 at 11:24 (a 14-minute window); `c34f3666` scale 64
files, 3959 deletions; `735ead8c` must **not** resolve (the SHA carried by the older notes).
Actual (2026-09-18, HEAD 4adedde6): 6x ok. Times: `853cedaf` 11:10, `6b96e1ad` 11:16, `c34f3666`
11:24, `735ead86` 11:24, `33dce885` 11:27, `1d31b708` 20:19. Shortstat: " 64 files changed, 3959
deletions(-)". The typo check printed `fatal: Not a valid object name 735ead8c^{commit}`. The
handoff quotes above were read from the diffs of `6b96e1ad`, `735ead86` and `33dce885`; the
`1d31b708` quotes from its commit body.

## Touches
- `853cedaf` feat(omp): oh-my-posh substrate port + grok-only lanes + seat batteries and landing-wave work — 171 files +10952/−402 (11:10:02; the wrong port, removed 14 minutes later)
- `c34f3666` chore: nuke oh-my-posh port (1/2) — wrong referent; omp is the omp² agentic harness (omp.sh). Host binary+config+themes removed; package/ports/substrate dirs + batteries + mesh assert removed. Follow-up commit must scrub live refs (see handoff.json ompNuke) — 64 files, −3959
- `6b96e1ad` chore(handoff): rebootNote — clean boot, nothing auto-runs, manual resume only — `handoff.json`, 1 file +2/−1
- `735ead86` chore(handoff): ompNuke continuation state for next L0 spin — `handoff.json` `ompNuke`, 1 file +17
- `33dce885` chore(handoff): stackDirective — ufo-only, xbgst heritage/read-only, self-hosting goal on plazir27 — `handoff.json` `stackDirective`, 1 file +11
- `1d31b708` Scrub six stale gates.sh refs to scripts deleted by the c34f3666 nuke — `scripts/gates.sh` + `docs/artifacts/2026-08-28-seating-sighting-walk.md`, 2 files +42/−6 (20:19:29)
- Paths (as of 2026-08-28; deleted by `c34f3666`): `packages/substrate-omp/*`, `ports/{omp,oh-my-posh,ufo-omp,xbgst-omp}`, `substrates/omp`, `scripts/assert-omp-port-mesh.mjs`, eight `scripts/test-omp*`/`test-substrate-omp*` batteries; surviving: `handoff.json`, `scripts/gates.sh`

## Out-of-scope
- The correct harness: `omp` wired as the sixth charter CLI (M-audit-early-0041) and its live
  providers/cascades (0045). `ccd5f0db` (16:58) is the counter-commit that names `c34f3666` as its
  cause.
- The landing compilation of the same day (`a696ac03`, 11:08) — recorded in M-audit-early-0040.
- The evening gate-family closure and the five self-inflicted gate fixes (`253dfd53`, `e71d9f9b`,
  `77a960dd`, `70c1fc5b`, `c81295e6`, `116cfc72`, `0d42bf12`) — M-audit-early-0044.
- The overnight clusters before the nuke (M-audit-early-0036..0038) and the rest of 08-28
  (0042–0043); the sibling audit-late window; site ingestion.

## Findings
- Honest failure, stated without softening: a 171-file port shipped on a **name collision**
  (`omp` = oh-my-posh prompt theme vs the omp² agentic harness), was deleted 14 minutes later, and
  the deletion declared itself "1/2". The mandated live-ref scrub landed at 20:19:29 — 8h55m after
  the nuke — leaving the tree carrying references to deleted scripts across every battery run in
  between.
- Bad SHA in the incoming notes: the brief/older notes cite `735ead8c`, which does not exist
  (`fatal: Not a valid object name 735ead8c^{commit}`). The real commit is `735ead86` (ompNuke
  continuation state, 17 insertions). Any downstream citation must use `735ead86`.
- Both nuke commits are subject-only: `853cedaf` and `c34f3666` carry no body, so the reason for
  the removal is quotable only from `handoff.json` (`ompNuke.note`, written 31 seconds after the
  nuke). The subject itself is the only in-commit record of the referent correction.
- The 2/2 scrub is narrower than the 1/2 mandate: `ompNuke.remainingForNextSpin` names seven
  surfaces (including `scripts/apply-scratch-io-routing.sh`, `config/skill-pack.json`, the landing
  compilation's T5–T8 rows, `NEXT.md`, `ports/README.md`, `docs/artifacts/charter-cli-map.json` and
  `.ufo/local-dispatch` steers) while `1d31b708` touches `scripts/gates.sh` and the walk artifact
  only. The rest is documented-but-pending at the time of the beat.
- `1d31b708` also corrects the record rather than the code: its walk-artifact block replaces the
  earlier "164/167" tail-read tally with a full-transcript "167 checks, 15 FAIL" and a
  classification (fixed / scrubbed here / pre-existing). That correction and the gate-family closure
  are M-audit-early-0044's subject.
- Ambiguity warning for downstream beats: on 2026-08-28 `omp` names two different things — the
  deleted oh-my-posh port before 11:24 and the omp² harness after 16:58. Disambiguate by subject and
  time, never by path name.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-recharter-report.md` (C4)
- Prior tip: `ebf44d1f` (anchor of M-audit-early-0038)
- Next: M-audit-early-0040
