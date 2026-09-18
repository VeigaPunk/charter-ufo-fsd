# M-audit-early-0005 — Doctrine, lane registry, substrate package map declared

**Status:** COMPLETE | **Date:** 2026-08-25 | **Session:** audit-early

## Does
`226de348` (18:14:22 +0000, 9 files +200) is the anchor: it adds `docs/doctrine.md`,
`docs/anti-patterns.md`, `lanes/registry.yaml` (102 lines) and
`substrates/{codex,cursor,grok,kimi,opencode}/README.md`, and edits `docs/SOURCE-MAP.md`, with
the body stating the intent — "Encode UFO paper R1-R4 and charter anti-patterns in docs/. Add
machine-readable lanes/registry.yaml rebasing xbgst-stack agents and per-CLI substrate README
stubs aligned to charter-ufo-fsd targets." `2cc16187` (20:38:08, 12 files +1028/-131) then makes
the declared roles executable: new `schemas/substrate-capabilities.json` and
`substrates/_lib/{capabilities,role-verbs}.mjs`, plus `substrate.json` and
`substrates/_lib/{cli-runtime,local-runner}.mjs` updates for codex/cursor/desk/grok/kimi/
opencode/xask; the body records the defect it repairs — "Every substrate CLI answered the same
four generic verbs regardless of what the charter says it is, so an L3 fan-out surface and a
desk surface were indistinguishable at the command line. schemas/substrate-capabilities.json now
declares which verbs each charter role owns, and substrates/_lib/role-verbs.mjs implements them
against @ufo/orch for both CLI families." — plus two consequences of writing the doctrine down
("The judge seat now needs a WWKD plan receipt (.ufo/plan-r0-<id>.json) before it will run a
judged round, which puts the paper's ordering invariant at CLI granularity rather than only
inside the orchestrator") and two contradictions it exposed in the declared registry ("xask
declared no charter role and claimed a judge seat it must not hold; six manifests were missing
the Gemini ban"). `cc5f2ebf` (20:48:17, 8 files +632/-336) closes the surface: the six
lane-alias CLIs are collapsed onto `substrates/_lib/lane-cli.mjs`, which keeps only "the lane
executor entrypoint, aliasOf, spawnPrefix, surface" — because "codex/cursor/desk/grok/kimi/
opencode each carried its own copy of the same fifty lines and answered only doctor and
dispatch" — and `scripts/charter-capability-probe.mjs` tests the doctrine as behaviour, checking
"whether each CLI implements the verbs its role owns and refuses what the charter forbids with
the declared exit code" across "34 substrates, 286 cases".

## Gate
```
for s in 226de348 cc5f2ebf 2cc16187 0ba260ea b4ebaf24 f4ad5e04; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git show --stat --format= 226de348 | tail -1
git show 226de348:lanes/registry.yaml | wc -l
git show --name-status --format= 226de348
git show --stat --format= 2cc16187 | tail -1
git show --stat --format= cc5f2ebf | tail -1
```
Expected: 3x `ok`; `226de348` = "9 files changed, 200 insertions(+)"; registry 102 lines; one
`M docs/SOURCE-MAP.md`, three `A docs/*` and five `A substrates/*/README.md`; `2cc16187` =
12 files +1028/-131; `cc5f2ebf` = 8 files +632/-336.
Actual: observed 2026-09-18 at HEAD `4adedde6` — 3 lines `ok`; `9 files changed, 200 insertions(+)`; `102`;
`M docs/SOURCE-MAP.md`, `A docs/anti-patterns.md`, `A docs/doctrine.md`, `A lanes/registry.yaml`,
`A substrates/{codex,cursor,grok,kimi,opencode}/README.md`; `12 files changed, 1028
insertions(+), 131 deletions(-)`; `8 files changed, 632 insertions(+), 336 deletions(-)`.

Wave-4 re-run (2026-09-18, HEAD 4adedde6): 6/6 `ok` — extended cat-file loop (3 original + 3 folded SHAs) exited 0, no unresolved token.

## Touches
- `226de348` Add doctrine docs, lane registry, and substrate package map — anchor, 9 files +200 (docs/doctrine.md, docs/anti-patterns.md, docs/SOURCE-MAP.md, lanes/registry.yaml, substrates/{codex,cursor,grok,kimi,opencode}/README.md)
- `2cc16187` Give each charter CLI its role's real command surface — 12 files +1028/-131 (schemas/substrate-capabilities.json, substrates/_lib/{capabilities,role-verbs}.mjs, seven substrate.json manifests)
- `cc5f2ebf` Unify the six lane-alias CLIs and add a parallel capability conformance probe — 8 files +632/-336 (substrates/_lib/lane-cli.mjs, scripts/charter-capability-probe.mjs, six substrates/*/bin/cli.mjs)
- `0ba260ea` Resolve the duplicate hangar-cache role and hold the packed schema to the SSoT — 4 files +46/-17; wave-4 fold: resolves the duplicate hangar-cache role, holds the packed schema to the SSoT
- `b4ebaf24` Declare the hangar-cache role and stop stale probe evidence reading as fresh — 6 files +48/-6; wave-4 fold: declares the hangar-cache role in the capability SSoT and stops stale probe evidence reading as fresh
- `f4ad5e04` fix: declare hangar-cache role in capability SSoT for plazirhangar — 1 file +6; wave-4 fold: declares the hangar-cache role in schemas/substrate-capabilities.json
- Paths: docs/doctrine.md, docs/anti-patterns.md, docs/SOURCE-MAP.md, lanes/registry.yaml, schemas/substrate-capabilities.json, substrates/_lib/*.mjs, substrates/*/README.md, substrates/*/substrate.json, substrates/{codex,cursor,desk,grok,kimi,opencode}/bin/cli.mjs, scripts/charter-capability-probe.mjs

## Out-of-scope
- The portable-pack and portability members of the same scout cluster, which belong to
  M-audit-early-0004: `3f60d604` feat(substrates): portable pack — vendored lib, upstream files,
  standalone install (62 files +3607/-425); `3abb230b` Recreate substrates CLI packages for
  charter ports. (25 files +333); `53e368bc` Add last-known-good remotes, xbreed core deps, and
  remaining charter CLIs. (2249 files +345800/-1); `7d54d65a` Cover complete charter CLI
  portability surface (4 files +22/-8); `846922f2` feat(portability): CI clean-temp npm pack →
  doctor + dry self-iter gate (2 files +388); `8685f688` fix(substrates): repair 15/26 native
  charter CLI entry points broken under real invocation (2 files +171/-1); `b0ca96d1` Seat paper
  rules, empirical specialists, and shared substrate runners. (54 files +1025/-871);
  `bc7cf250` fix local substrate reporting and verification gate (3 files +11/-4); `e9de0f3b`
  Add ufo-core-py doctor/demo evidence log (1 file +16); `ecf07631` Prove packed installs work
  outside the monorepo. (27 files +433/-63); `f4f3ac40` Note merged Node Cursor substrate in
  SOURCE-MAP (1 file +5).
- The capability SSoT being anchored in the Python, TypeScript and Rust runtimes — the
  dual-runtime collapse beat, M-audit-early-0009 (`d5a4d317`).
- Portability/doctor gate machinery (F10-PORTABILITY, 18 members) and honesty docs repairs
  (F11-DOCS, 9 members) — sibling scout slices, accounted in the mission result report.
- Anything after 2026-09-10 (sibling mission audit-late) and site ingestion (L0-owned).

## Findings
- Declared before enforced: the registry/doctrine trio lands at 18:14:22, but nothing checks it
  at runtime until `schemas/substrate-capabilities.json` and the probe land at 20:38:08 and
  20:48:17 — 2h24m during which the declared role table is documentation only.
- `2cc16187` body records two live contradictions in the declared registry: a seat (`xask`)
  claiming a role it does not hold, and six manifests missing the Gemini ban. Both are stated in
  the commit, not inferred.
- The honest failure for this cluster belongs to a member owned by M-audit-early-0004:
  `8685f688` admits "15/26 native charter CLI entry points broken under real invocation" — the
  declared surface outran the working surface and was repaired afterwards. Cross-ref only.
- Path currency: at HEAD `4adedde6`, `lanes/registry.yaml`, `schemas/substrate-capabilities.json`
  and `substrates/_lib/lane-cli.mjs` return 0 entries from `git ls-tree -r HEAD`;
  `docs/doctrine.md` and `docs/anti-patterns.md` still return 1 each. The doctrine and CLI
  surface above are described as of their own SHAs.
- `docs/SOURCE-MAP.md` is the one file the anchor edits rather than adds: the package map is a
  declaration on top of an existing document, not a new one.

- Wave-4 coverage remediation: 3 member(s) folded from the mis-adjudicated F5-HANGAR rejections (critic defects D1–D8); disposition ledger in the mission result report.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md`, evidence `.ufo/scopes/audit-early/scout-init-report.md` (C6, doctrine/registry/package-map part)
- Prior tip: `6bd0c472` — anchor of M-audit-early-0004
- Next: M-audit-early-0006
