# audit-logs-early — result report

Mission: audit-early | Fleet: auditlogs | Run: gq8834f69e421cf2f6 | Session: omp-gq8834f69e421cf2f6
Window: 2026-08-24 → 2026-09-10 inclusive (ufo-fsd-alpha). Vault: ../charterlogs/beats/.
Axes (frozen): evidence_integrity (executable), coverage (subjective), voice (subjective).

## Outcome
53 beats written: M-audit-early-0001 … M-audit-early-0053 (0001 = L1 exemplar; 0002–0053 via
10 executor lanes). Mechanical verifier: `node .ufo/scopes/audit-early/verify-beats.mjs` →
FINAL gates (2026-09-18, HEAD 4adedde6): verify-beats.mjs → ALL PASS (53 file(s)); check-crossbeat.mjs → CROSS-BEAT ALL PASS (53 files, 677 unique bullet-lead Touches SHAs = 554 original + 123 wave-4 folds; contiguity 0001..0053; Next-chain intact incl. terminal M-audit-late-0001). Receipt: audit-logs-early.md.receipt.json.

## Window facts
- Commits in window: 1874 total, 1357 non-merge (master inventory .ufo/scopes/audit-early/commits-nonmerge.txt).
- Repository root f43c757c (2026-08-25 15:05 -0300) — window start 08-24 precedes the repo;
  the trail begins at init. Window tip 5f52e03a (2026-09-08); next commit 9644f95a (2026-09-11);
  zero commits 09-09/09-10 and 09-01..09-07 (activity bursts: 08-25/26 bootstrap storm,
  08-27, 08-28 re-charter day, 08-29, 08-31, 09-08).
- Timezone hazard adjudicated: 96a4b6b4 author 08-29 / commit 08-30; 102-commit local-tz leak
  band (08-26 00:00–02:59 UTC) adjudicated by ScoutResidual (69 of them residual-assigned).

## Coverage accounting (coverage axis)
1357 = 892 verbatim-cited across seven scout reports + 465 residual, and
465 = 198 (seven new clusters N-A..N-G → beats 0018-0024) + 65 (mapped to existing families)
+ 202 (churn) + 0 unexplained. Merges (517) excluded as mechanical by policy; merge anchors
cited in beats where they carry evidence (e.g. 4d84a59a layout decision).
Churn rejection ledger (families with counts, examples, member lists): scout-init-report.md
(F1–F13), scout-gates-report.md (F1–F8), scout-honesty-report.md (R1–R4), scout-pins-report.md
(R1–R12), scout-aug27-report.md (3 SHAs), scout-residual-report.md (CH-* families, 202).
Predicate-audit finding (recorded honestly): sibling churn counts are curated themes, not
closed sets — only three reproduce exactly (honesty filter 335=335, ^fix(honesty) 43=43,
Init F12 6=6); ScoutHonesty C3-extended (163/165) is a hand-union, not one predicate.
Per-SHA closure is provided by the residual adjudication, not by the curated counts.

**Wave-4 corrected closure (final).** The critic proved the "verbatim-cited ⇒ covered" premise false
for the scouts' thematic-handoff families (the named owner often never claimed the members). Final
closure: 1357 non-merge = 677 beat-Touches bullet-leads (554 + 123 folds) + churn rejections +
Findings-only citations, with EVERY SHA dispositioned per-SHA in one of: a beat's Touches,
orphan-dispositions.md (165 rows: 123 FOLD + 42 REJECT, 0 undecided), scout-residual-report.md
(465 rows), or the scouts' enumerated member lists — and the single-adjudicator churn families
sample-confirmed (24 SHAs, all churn). Zero unexplained, zero undecided.

## Beats written (53)
| Beat | Date | Cluster | Anchor | Title |
|---|---|---|---|---|
| M-audit-early-0001 | 2026-08-25 | I1 | `f43c757c` | Repository init on an empty root; first LKG port content |
| M-audit-early-0002 | 2026-08-25 | I2 | `345fab9b` | Fifteen lanes fork the root; merge storm; one layout authoritative |
| M-audit-early-0003 | 2026-08-25 | I3 | `84d11d0e` | Rust hot path seated beside TS/Python; dependency-free baseline |
| M-audit-early-0004 | 2026-08-25 | X | `6bd0c472` | Charter-CLI portable surface: packs, entry-point repairs, desk reversal |
| M-audit-early-0005 | 2026-08-25 | I6 | `226de348` | Doctrine, lane registry, substrate package map declared |
| M-audit-early-0006 | 2026-08-25 | I4 | `046e9cbb` | npm workspace identity: @ufo/orch rename, project references |
| M-audit-early-0007 | 2026-08-25 | G7 | `f9e4f9c9` | LIVE/DRY Task fan-out telemetry; overlay/Table5/hangar-parity arming |
| M-audit-early-0008 | 2026-08-25 | G3 | `6e55c3e1` | WWKD plan-on-disk token required before every judge round |
| M-audit-early-0009 | 2026-08-25 | I5 | `3c339133` | Divergent runtimes reconciled: quarantine, not deletion |
| M-audit-early-0010 | 2026-08-25 | G5 | `a83301b2` | ufo-selfaudit: rounds act on the tree; rejected moves cannot stay |
| M-audit-early-0011 | 2026-08-25 | G1 | `33de2378` | Paper mutation/ablation batteries execute instead of transcribing |
| M-audit-early-0012 | 2026-08-25 | G2 | `2c97c26e` | Anti-pattern hard gates R1–R4 land in the runtime path |
| M-audit-early-0013 | 2026-08-25 | H3 | `8a155ec0` | LIVE-strict harness + D2–D5 decoy tests |
| M-audit-early-0014 | 2026-08-25 | P4 | `db0412cf` | Hangar parity fail-closed; substrate hangars deepened past credential boundary |
| M-audit-early-0015 | 2026-08-25 | H1 | `54937ab3` | Godspeed filter.md SSoT pin war: upstream bytes + archive exemption |
| M-audit-early-0016 | 2026-08-25 | G4 | `3bb2c17a` | Saturation vs budget halt become machine-distinct exits |
| M-audit-early-0017 | 2026-08-25 | G6 | `19f32355` | E1–E5 godspeed pin + membrane purity in the self-iter control plane |
| M-audit-early-0018 | 2026-08-26 | N-A | `4370574f` | In-env/offline-L3 seating and multi-substrate c64 waves |
| M-audit-early-0019 | 2026-08-26 | N-D | `dc99bcc8` | Refuse invented or undeclared runtime values |
| M-audit-early-0020 | 2026-08-26 | N-F | `1718dbc4` | Foreign-host packed-runtime portability + host-CLI installation |
| M-audit-early-0021 | 2026-08-26 | N-G | `653a4c2f` | F-C finding series F-C2..F-C7: filings, harness, gate-attribution fixes |
| M-audit-early-0022 | 2026-08-26 | N-E | `d6b4822e` | Tree-confined resolution: no checkout/import.meta climb |
| M-audit-early-0023 | 2026-08-26 | N-B | `1536930e` | Charter-CLI surface becomes a packaged, provable contract |
| M-audit-early-0024 | 2026-08-26 | N-C | `95208744` | Hang bounds: group-kill so a hung host cannot be read as live |
| M-audit-early-0025 | 2026-08-26 | H2 | `bcefb151` | fix(honesty): live-seat semantics — PATH-available ≠ invoked |
| M-audit-early-0026 | 2026-08-26 | P5 | `5466d904` | END-RUN LOCK: wall freeze, harvest seated, wakes frozen |
| M-audit-early-0027 | 2026-08-26 | P1 | `05ff018d` | Seat-routing policy: kimi-k3-max banned, dual-pin MIX landed |
| M-audit-early-0028 | 2026-08-26 | P3 | `b1043f13` | steer#3 swarm-recovery model-reroute posture composed with local pins |
| M-audit-early-0029 | 2026-08-26 | P2 | `7a417318` | Operator pin divergence carved out of tip byte-parity |
| M-audit-early-0030 | 2026-08-27 | A1 | `f6d7d183` | Wrong-referent landing: literal Full Self-Driving stack under fsd/ |
| M-audit-early-0031 | 2026-08-27 | A2 | `e434b1c6` | F-C3 concurrency: race classes → repro-backed fixes → declared check |
| M-audit-early-0032 | 2026-08-27 | A3 | `db0775b9` | Gates-green axis: runner closure as git objects, fail-closed judge |
| M-audit-early-0033 | 2026-08-27 | A4 | `3700bd77` | Charter-parity: kimi cursor-surface → dual-pin MIX composer-2.5-fast |
| M-audit-early-0034 | 2026-08-27 | A5 | `61c36775` | Evidence machinery: consolidator v3 + gate-evidence-reproducible green |
| M-audit-early-0035 | 2026-08-27 | A6 | `234a689c` | Parent-harvest finding: 1,982-path probe-noise bucket pushed to Origin |
| M-audit-early-0036 | 2026-08-28 | RC1 | `d0bbf0fd` | Overnight cursor-identity/availability evidence wave |
| M-audit-early-0037 | 2026-08-28 | RC2 | `8c8664a5` | Pre-reboot preservation; mirror-drift provenance pins; Gemini L2 hard block |
| M-audit-early-0038 | 2026-08-28 | RC3 | `ebf44d1f` | Fleet-evidence rollup byte identity; F-C3 hung-tmux isolation |
| M-audit-early-0039 | 2026-08-28 | RC4 | `853cedaf` | Wrong-referent nuke: oh-my-posh port removed; omp is omp² (omp.sh) |
| M-audit-early-0040 | 2026-08-28 | RC5 | `23b209b7` | ufo seated single L1 skill fleet-wide; xbgst disabled; cloud→local rebase |
| M-audit-early-0041 | 2026-08-28 | RC6 | `ccd5f0db` | omp wired as sixth charter CLI, then live on plazir27 |
| M-audit-early-0042 | 2026-08-28 | RC7 | `86a0add1` | ufo agent roster seated as single L2 SSoT; ufo-sighting; tool policy |
| M-audit-early-0043 | 2026-08-28 | RC8 | `14d81aef` | gpt-5.2/.claude retired; chatgpt routes always sol-fast |
| M-audit-early-0044 | 2026-08-28 | RC9 | `253dfd53` | Mirror-drift family closed; gates-record run 1 |
| M-audit-early-0045 | 2026-08-28 | RC10 | `1af2d83e` | omp live: four providers, delegation cascades, kimi dropped from cascades |
| M-audit-early-0046 | 2026-08-29 | L1 | `96a4b6b4` | Runtime refocused on native OMP routing (re-charter) |
| M-audit-early-0047 | 2026-08-31 | L3 | `1cbf9a10` | charter-scribe: scheduled 6h beat wire to the charter page |
| M-audit-early-0048 | 2026-08-31 | L2 | `64f2f9ad` | Four-family autonomous L1 routing; kimi-code OAuth; wall auto-open |
| M-audit-early-0049 | 2026-08-31 | L4 | `89e35be9` | qwen-seat dispatch-directive campaign: 7 ordered commits, prompt→mechanical |
| M-audit-early-0050 | 2026-08-31 | L5 | `ec6d85bf` | fleet-dispatcher: long-haul autonomy for the native fleet |
| M-audit-early-0051 | 2026-09-08 | L6 | `927f947b` | Sighting provenance + graceful despawn: relay flag, complete verb |
| M-audit-early-0052 | 2026-09-08 | L7 | `59d49b1a` | Local-only posture: vendor purge, GitHub desync, local GPU helper |
| M-audit-early-0053 | 2026-09-08 | L8 | `e706c4f9` | L2/L3 routing: plan → sibling landing → honest grounding |


## Rejected candidates (material-looking, no beat) — with reasons

### Named SHA rejections (per-scout, with reasons)
- 11de9153, a668f48f — NEXT.md/handoff.json delta bookkeeping (ScoutAug27; no behavior change).
- f65bc149 — named-inventory floor 32→35 alignment to existing SSOT; assert semantics unchanged (ScoutAug27).
- 60eb1f60, b2696a13, e85f10ae — three bootstrap lanes forked off the empty root that are NOT
  HEAD-reachable (never landed); recorded as Findings in beat 0002, never Touches-primary (ScoutInit).
- aeb71032 — cited in c891d509's body as a prior re-verification source; does NOT resolve in this repo;
  recorded as an observed failure in beat 0021 Findings, kept out of Touches (ExecResidualB).
- 735ead8c — nonexistent SHA (typo in older planning notes); real commit 735ead86 (ScoutRecharter;
  beat 0039 records the typo + git's "Not a valid object name" as observed).

### Family-level rejections (churn ledgers; full member lists in the scout reports)
- ScoutInit F1–F13 (394): lockfiles 9, fmt 13, tip-SHA/evidence bookkeeping 47, post-merge restores 38,
  hangar densify 62 (→Pins theme), godspeed pin churn 19 (→Honesty theme), conformance bookkeeping 20,
  gates machinery 95 (→Gates theme), orch runtime behavior 52 (→Residual themes), portability doctor
  machinery 18, docs-truth repairs 9 (→Honesty theme), hygiene 6, rustdep one-liners 6.
- ScoutGates F1–F8 (55): docs/evidence/tip refresh 26, hangar densify 10, fmt/compile/lock 6, test
  fixture alignment 2, R15 probe bound 1, oauth PATH markers 2, self-iter log capture 7, workspace seating 1.
- ScoutHonesty R1–R4 (132): tip-SHA bookkeeping 68, fmt/chore 6, sibling-owned 8, adjacent-theme generic 50.
- ScoutPins R1–R12 (113): swarm-reroute/dry-L3/MCP machinery 33, honesty predicates 8, tip-SHA 2,
  rustfmt 2, lockfile 8, godspeed pin 9, wave-shape bans 9, timeout hardening 8, paper gates 3,
  dispatch/registry wiring 13, docs/evidence records 15, conflict-marker noise 3.
- ScoutResidual CH-* (202): tip-doc/evidence refresh 127, hangar densify 30, fmt 28, restore 10,
  test-only 4, hygiene 2, lock 1.
- Merges (517 of 1874): mechanical by policy; merge anchors cited inside beats where they carry
  layout/decision evidence (4d84a59a, 8832baec, be955018, c7482f80, 7a91d077, 0d08cd42, 4ce68180 —
  all verified HEAD ancestors; the three unreachable lane roots excluded).

### Predicate-audit disclosure (ScoutResidual, verbatim conclusion)
Sibling churn counts are curated themes, not closed SHA sets: only three predicates reproduce exactly
(ScoutHonesty full filter 335=335; ^fix(honesty) core 43=43; ScoutInit F12 6=6); other family
predicates over-match their curated counts (e.g. Gates F1 305 vs 26, Init F3 306 vs 47, Pins R8 109 vs 8).
Per-SHA closure therefore rests on the residual adjudication (every one of the 465 assigned exactly
once, 0 unexplained), NOT on the curated counts. ScoutHonesty's C3-extended 163/165 claim is a
hand-union of four sub-families and is recorded as unverifiable-as-predicate (not refuted).

### Uncommitted/WIP
None observed: the window is fully committed history; no beat documents WIP (mission rule).

## Wave 3 — verification round (roles per taxonomy + mission overlay routes)

### 3a findings and L1 adjudication (Pareto: accept defect-fixes that regress nothing)
- ReviewerA (0001–0018): 13 SOUND; 4 MUST-FIX + 1 SHOULD-FIX → ALL APPLIED:
  0004 Gate after-side seam command range-restricted (whole-file 22 vs seam-table 11; Actual 8→11 kept, verified by L1);
  0012 b42d8d96 false scale 19/+2780/−2510 → measured 15/+407/−137 (Does + Touches, L1 re-measured);
  0014 sibling-window date 2026-08-26 → 2026-09-10;
  0015 dd94791a subject restored to git-verbatim "(hash 09957d08)." (full sha256 stays in Findings);
  0018 Gate placeholder → all 34 Touches SHAs inlined (copy-paste runnable).
- ReviewerB (0019–0036): 18/18 SOUND, 0 defects (262 Touches bullets re-derived; 0025/0033/0035 extra scrutiny exact).
- ReviewerC (0037–0053): 16 SOUND; 1 MUST-FIX → APPLIED: 0051 Gate Actual garbled by harness shell-junk
  (__omp_shell fragment) → replaced with L1-re-executed grep output (816/2185/2186 lines, byte-identical).
- CriticCoverage (devin/swe-2:max, 36m): 53/53 beats individually SOUND; verdict DEFECTS at the
  ADJUDICATION layer — 8 MUST-FIX (D1–D8): the "thematic handoff" rejections named owners that never
  claimed ~150 members (~100 verified material). Remediated in wave 4 (section below). Its
  SHOULD-FIX candidate (0030 HEAD-unreachable twins) was confirmed by L1 git check and fixed
  pre-emptively with the Reachability-note (I4) bullet.
- ConnectorCoherence: crossbeat ALL PASS; 318 cross-refs scanned; 1 MUST-FIX → APPLIED (0047
  "earlier the same day" → "two days earlier on 2026-08-29"); 4 SHOULD-FIX xref gaps → APPLIED
  (0030 callsign→0002 lane-root era; 0017 names 0015; 0021↔0031/0038 F-C saga refs added both directions).
  All 8 narrative chains COHERENT/SOUND. Aspect-splits (96a4b6b4, 1d31b708) confirmed intentional.
- SentinelExposure (public-safety): 0 MUST-FIX; 1 SHOULD-FIX → APPLIED (0039 systemctl re-enable
  runbook line redacted, fact kept); 45 CLEAN + 7 ACCEPTABLE-WITH-NOTE (plazir27 hostname + tz window
  + THE TICK ports = repo-recorded public facts, kept per evidence axis; 0045 credential narrative
  value-free = gold pattern). Injection-shaped content: historical data only, nothing relayed as directive.
- Distiller (flash:high, report-only): voice axis CONVERGED — 44 CLEAN, long Does paragraphs ruled
  ON-AXIS (compression would drop evidence), zero cosmetic edits, honest zero-accept; 9 git-adjudicated
  coherence defects reported (all applied by L1, see wave 3b/4 section) + placeholder-Gate flag adopted.

### Gate-change disclosure (single, mid-run)
verify-beats.mjs gained one documented exemption: hex tokens preceded by "hash " in Touches are
content hashes, not git-object claims (trigger: dd94791a's git-verbatim subject "(hash 09957d08)").
Applied to keep BOTH axes: verbatim subjects (evidence) AND resolvable-Touches (executable gate).
No other gate semantics changed; both gates re-run green after every edit batch.

### Post-fix gate state (superseded by the final post-wave-4 run in Outcome)
- verify-beats.mjs → ALL PASS (53 file(s)); check-crossbeat.mjs → ALL PASS (554 uniques at that point).

## Evidence integrity (executable axis)
- Per-beat gate: cat-file resolution of every Touches SHA + observed-output paste.
- Mission gate: verify-beats.mjs over all 53 files (section order, status-line shape, date
  window, SHA resolution, numbering contiguity, /home/ + credential screening) → ALL PASS (53 file(s)).
- L1 spot-checks: 5409f6b6/e9aec0ed removal twins verified; 0d42bf12 gates-record
  divergence pinned (subject 167/167 vs body 164/3 vs transcript counts — recorded in beat 0044).

## Wave telemetry

### Wave 1 — scouts (role=scout, flash route): 8/8 completed, 0 reroutes, 0 unavailable
- ScoutInit 469=75+394 (13 families, full member lists); tz-leak finding (102 commits) → residual scout scope.
- ScoutGates 198 matched/150 claimed/55 rejected; hint correction (6bd0c472 vs 6b0d1e15).
- ScoutHonesty 335 matched/205 claimed/132 rejected; pin timestamping contract.
- ScoutPins 396=283+113 (12 families) + 4 outside-filter claims; pins-lived-2-days finding.
- ScoutAug27 27=24+3; fsd/ wrong-referent fully traced (landed f6d7d183, removed 96a4b6b4/5409f6b6/e9aec0ed).
- ScoutRecharter 52/52; gates-record discrepancy found; brief typo 735ead8c→735ead86 caught.
- ScoutLate 21/21; docs decisions extracted; double-date hazard on 96a4b6b4.
- ScoutResidual (dispatched after L1 mechanical reconciliation exposed the 465-commit residual):
  465 = 198 new (N-A..N-G) + 65 family-mapped + 202 churn + 0 unexplained; predicate audits
  (3 exact reproductions; curated-theme over-matches recorded).

### Wave 2 — executors (role=executor, flash route): 10 lanes, 52 beats drafted + L1 exemplar 0001
- ExecInit 5/5 (65 SHAs; CORRECTED L1 brief: "3 repairs in 19 min" → measured 78m56s span, densest 13m36s).
- ExecGates 8/8 (87 SHAs; R/E-numbering disambiguated; saturation-invariant honest supersession: literal
  success===kind=="saturated" form is post-window dbad47b5 — in-window form is classifyExit + 2 refusals).
- ExecHonesty 3/3 (75 SHAs; 0025 carries 44 Touches; lane exited 1 AFTER artifacts landed and verifier-PASSed
  — I4 telemetry: process-exit post-yield, no reroute needed, artifacts accepted on verified state).
- ExecPins 5/5 (28 SHAs; supersession chains verbatim from bodies).
- ExecResidualA 2/2 (73 SHAs byte-checked subjects+scales).
- ExecResidualB 5/5 (125 SHAs; found aeb71032 cited in c891d509's body does not resolve — recorded, kept out of Touches).
- ExecAug27 6/6 (39 SHAs; NEW discrepancy first-party: 3634eb45's stated byte-sync source was the lagging copy;
  corrected L1's "merge/checkpoint twins" wording — removals are single-parent).
- ExecRecharterA 5/5 (29 SHAs; headline-vs-artifact 149/148+1FAIL recorded; 735ead8c typo confirmed non-existent).
- ExecRecharterB 5/5 (26 SHAs; 0044 counting command: PASS-prefix=365 FAIL-prefix=27 PASS-table=153 FAIL-table=14
  checks-block=167(153P/14F); b3c29ab9 body-vs-diff drift found: claims 2 deleted artifacts, 0 D rows).
- ExecLate 8/8 (21+1 SHAs; ledger counts cited from committed data walk with non-re-measurability recorded;
  CI window measured both ways: 10d0h12m author / 9d16h56m commit).
- Host bug: harness write tool failed (hashlineIsReadTruncationNotice) in L1 + multiple lanes;
  reported via xd://report_issue; all lanes fell back to eval/bash writes. No lane lost, no artifact impact.

### L1 integration pass (post-wave-2, pre-wave-3a)
- Duplicate bullet-lead Touches resolved per .ufo/scopes/audit-early/dup-rulings.md: 96a4b6b4→0046
  (0030 keeps removal-aspect via twins + Findings primary-citation note); 1d31b708→0039 (0044 keeps
  Gate/Findings cite + primary note); 1501795c→0010 (0003 Findings cross-ref); 9a0aa561→0012 (0002
  keeps Does/Gate parent-role inline); a169a54c→0001, 6bd0c472→0004 (fixed by ExecInit itself).
- Wrong nuke cross-refs (0040→0039) fixed in 0041 (3 sites) and 0042 (1 site); 0041's Prior-tip ref to
  0040 and 0042's seating ref to 0040 verified CORRECT and kept.
- Checker refinement (recorded for L0): bullet-lead uniqueness rule; inline verbatim-subject/parent-child
  hex mentions are legal context. Verifier limitation noted: 8-hex date-like tokens (20260828) in Touches
  fail cat-file — executors kept such paths in Gate/Findings (no verifier change mid-round, contract freeze).
- Gates after integration: verify-beats.mjs → ALL PASS (53 files); check-crossbeat.mjs → CROSS-BEAT ALL
  PASS (53 files, 554 unique bullet-lead Touches SHAs, contiguity 0001..0053, Next-chain incl. terminal
  M-audit-late-0001 handoff).

## Wave 3b + Wave 4 — distiller and coverage-critic remediation

### Distiller (report-only, flash:high): voice axis CONVERGED; 9 coherence fixes applied
- 44 beats CLEAN, 8 CLEAN-with-defect-reported, 1 admissible edit; 554 Touches bullets re-resolved,
  pairwise disjoint; all 16 path-currency claims + all cluster windows + ~30 anchor scales re-verified exact.
- Long Does paragraphs (0021/0023/0045/0053) ruled ON-AXIS (all facts+SHAs; compression would drop evidence).
  Paths-bullet "gap" (0026-0029) ruled non-defect (paths inline). Zero cosmetic edits proposed — honest zero-accept.
- 9 L1-applied fixes (each git-verified by L1 before applying): 0050 event-kind list completed
  (dispatcher_crash, per its own Gate + ec6d85bf:scripts/fleet-dispatcher.mjs L80); 0001 tz-naive
  "3h06m" → 6m13s UTC; 0027 "Twelve minutes" → 2m43s and "29 minutes" → 1h30m; 0045 "inside one hour"
  → "the same evening" (its own 1h08m kept); 0052 deps/bootstrapper purge misattributed to the 9s
  neighbor e47ab329 → corrected to 59d49b1a at 7m51s (3 sites); 0048 Touches "+ 11 mirrors" →
  "(SSoT) + 10 seat mirrors" (git: 11 SKILL.md paths = SSoT + 10); 0011 unsupported "below the
  transcribed claim" → "computed from measured outcomes rather than asserted" (both rates 11/13=84.6%
  Rust / 10/13=76.9% Python per the beats' own numbers); 0014 xref range 0026-0029 → 0027-0029.
- Non-actionable flag adopted by L1: placeholder Gate loops ("for s in <the N Touches SHAs>") in
  0019/0021/0022/0024 inlined after proving each expanded loop resolves ok=N/N (28/37/12/14) —
  same standard ReviewerA applied to 0018. All Gates now copy-paste runnable.

### CriticCoverage (devin/swe-2:max, 36m): beats individually SOUND (53/53); coverage axis DEFECTS at the adjudication layer
- Structural finding (root cause): the scouts' "thematic handoff" rejections (F5/F7/F8/F9/F10/F11,
  Pins R1/R8, residual CH-HANGAR) named an owning lane that never SHA-claimed the members, and the
  residual adjudication only covered NON-cited SHAs — so cited-but-unclaimed orphans (~150, ≈100
  verified material) had no valid disposition. "verbatim-cited ⇒ covered" was false.
- Defects D1–D8 (MUST-FIX, adjudication layer): F9-ORCH 41 orphans (~39 material: sqlite atomic
  append, per-run isolation, checkpoint pause/resume, tool-timeout kill, wave-ban enforcement…);
  F8-GATES 31 (~24 material incl. ccefe70e core-presence.yml CI landing); F10-PORTABILITY 14 (all
  material); F7-CONFORMANCE 15 (~11 material incl. 8e24ad0d +767-line build_graph.rs suite);
  F11-DOCS 7 (incl. 7e0678dd NEW gate script); F5-HANGAR 3 material (d148293e/10a2e3fc/df2e52a2);
  Pins R1/R8 4 material (339782ae +1878 swarm_reroute.rs, ed55aaa4, e852450e, 20adf9af);
  residual CH-HANGAR 2 misclassified (8d434a33 NEW tri-language real_host_cli.rs +1143; 481dd9e0
  live.rs +257 group-kill bound = N-C contract).
- D9 SHOULD-FIX → APPLIED (0008: ffcfff35 + 71e8c327 named with scales; loose "none carries a
  distinct contract" corrected). D10 SHOULD-FIX → ledger note below + scout sample confirmation.
  D11/D12 NOTEs → no action (merge-as-anchor convention consistent; twins disclosure adequate).
- Remediation (wave 4, EXECUTED): ScoutOrphans (flash, 16m) re-adjudicated every orphan with
  per-SHA git evidence: 165 distinct SHAs (117 ledger D1–D8 + 51 D6 re-derivation − 3 overlap)
  = 123 FOLD + 42 REJECT + 0 undecided; 202/202 cited tokens cat-file-verified; zero fold/reject
  overlap. D6 correction: the ledger's "~34 churn-grade" undercounted materiality by 17 (23 of 51
  F5-HANGAR orphans are material, e.g. eda6691c floor changes + dropped hangar assertions).
  D10 samples (24 SHAs across F3-TIPDOC/F4-RESTORE/F2-FMT/F1-LOCK/F12-HYGIENE): all churn confirmed.
  L1 spot-checks of REJECT dispositions (48323fbc, b3f28cba): docs-only diffs confirmed.
  ExecOrphans A/B (disjoint beat sets) apply the 123 folds to 16 beats: 0003+15, 0004+7, 0005+3,
  0007+5, 0009+25, 0010+1, 0011+3, 0012+5, 0013+2, 0014+10, 0016+2, 0018+15, 0020+14, 0021+13,
  0024+2, 0025+1; each fold = verified Touches bullet + extended Gate loop + re-observed Actual
  (original Expected/Actual lines preserved) + Findings remediation bullet. No new beats, no
  renumbering (all orphans are 08-25/26 and fold into same-era thematic beats). 0020's
  Out-of-scope line corrected to match its folds; ccefe70e fold carries the CI death-note
  (narrowed by 0032, replaced by 0046's gates.yml, CI dropped by 0052).
- Coverage-ledger correction (D10, honest): the init-only-cited churn families were
  SINGLE-ADJUDICATOR; wave-4 sampled 24 SHAs across the five families (all churn confirmed) and
  the full per-SHA ledger now lives in .ufo/scopes/audit-early/orphan-dispositions.md.
  Corrected closure statement: 1357 non-merge = 677 beat-Touches bullet-leads (554 original +
  123 wave-4 folds) + named-family churn rejections (per-SHA dispositioned across
  orphan-dispositions.md + scout-residual-report.md + the scouts' enumerated member lists) +
  Findings-only citations; zero undecided, zero unexplained.

### Wave 4 executor telemetry
- ExecOrphansA 5m02s: 64 folds / 8 beats (0003+15, 0004+7, 0005+3, 0007+5, 0009+25, 0010+1, 0011+3, 0012+5); extended loops observed ok=N/N; originals byte-intact; batch ALL PASS.
- ExecOrphansB 5m42s: 59 folds / 8 beats (0013+2, 0014+10, 0016+2, 0018+15, 0020+14, 0021+13, 0024+2, 0025+1); 0020 Out-of-scope corrected to match folds; ccefe70e CI death-note carried; all PASS.
- Final dual gate: ALL PASS (53) + CROSS-BEAT ALL PASS (677 uniques).

## Cross-window findings for L0
- 96a4b6b4 carries author date 08-29 but commit date 08-30T03:44 — any commit-date-windowed audit
  starting 08-30 will pull it in; assign it exactly once (this trail: beat 0046).
- CI reversal pair: gates.yml added by 96a4b6b4 (08-29), deleted by 942a384c (09-08, "gold standard
  stays local-only") — the CI window was 10d0h12m by author dates / 9d16h56m by commit dates.
- 5f52e03a (window tip) shifts mission-status semantics ('completed' legal, retained history) which
  the L2/L3 routing plan's M1 manifest-v2 migration (docs/L2-L3-ROUTING.md, beat 0053) must absorb.
- fsd/ removal twins 5409f6b6/e9aec0ed are HEAD-unreachable (checkpoint/pre-launchpad-reset-20260830);
  mainline removal is 96a4b6b4 — reachability disclosed in beat 0030.
- docs/ufo-fsd-alpha-landing-compilation-20260828.md (a696ac03) is marked "Superseded 2026-09-11" in-tree.
- The godspeed filter.md SSoT pin (09957d08 as of window tip) changed again post-window (8e9116d9,
  2026-09-18) — beats timestamp their pins; L0 should not read any in-window pin as current.
- Sibling-vault concurrency: ../charterlogs/beats/ also received M-audit-late-* files during this run;
  this mission wrote only M-audit-early-* (scope separation held; verifier/checker filter by prefix).
- Fleet-ledger failure statistics (basis of beat 0053's plan): 16,619 lines; trial_dispatched=9,670;
  trial_dispatch_failed=1,135; wave_dispatch=3,873; wall_probe_failed=1,930 — cited from e706c4f9's
  committed data walk; not re-measurable at HEAD (live ledger rotated).

## Honest gaps
- Uncommitted/WIP work: none beat-eligible observed (window is fully committed history).
- docs/ACCESS.md: zero commits in window (last touch 23b209b7 08-28 — content covered by beat 0040); not a gap.
- ExecHonesty lane exited 1 after its artifacts landed verifier-green (accepted on verified state; recorded as I4 telemetry).
- The host write-tool bug (hashlineIsReadTruncationNotice) persisted all mission; every affected lane used the documented eval/bash fallback. Reported via xd://report_issue.
- Beat-level residual risk: fold bullets carry scout-disposition reasons; where a fold's theme tag could be read as a cluster-membership claim, the wave-4 Findings bullet in each beat names the remediation provenance.
