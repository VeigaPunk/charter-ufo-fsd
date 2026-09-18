# M-audit-early-0030 — Wrong-referent landing: literal Full Self-Driving stack under fsd/

**Status:** COMPLETE | **Date:** 2026-08-27 | **Session:** audit-early

## Does
`f6d7d183` (2026-08-27 02:02:29 -0300, single parent `2a3c8fd2`, child `e434b1c6`) lands
39 files / +2,193 with every changed path under `fsd/`: a dependency-light Python autonomy
package (`fsd/src/fsd/{common,perception,planning,control,simulation}`, five pytest files,
five design docs, `requirements.txt` = numpy/matplotlib/pillow/pytest, plus `main.py` and
`pyproject.toml`) whose README opens `# ufo-fsd — a minimal Full Self-Driving stack`. This is a
**wrong-referent landing of the repository's own callsign**: `ufo-fsd` names an orchestration
framework here, and the payload literalises the description string the tree already carried —
"Umwelt-Frontier Orchestrator Full Self-Driving Stack" at `plugin.json:4`, present since
`e34a4256` (2026-08-25 18:19:41 +0000, outside this slice) — into an actual driving stack.
No decision reasoning is recorded: the commit body is the subject line only, and all 39 changed
paths sit inside `fsd/`, so no gate, ledger, or manifest line accompanied the landing and
nothing in the tree forced it to be reconciled. It was undisclosed at commit time —
`git grep -n -i -e 'self-driving' -e 'autonomous' -e 'fsd/' 234a689c -- NEXT.md handoff.json`
exits 1 (no hit), while those same files carry the `ufo-fsd` callsign throughout. The tree
remained on `main` and `origin/main` until 2026-08-29 20:28–20:29, when `e9aec0ed` (20:28:55,
"checkpoint:") and the `96a4b6b4`/`5409f6b6` pair (identical subject and author date, same single
parent `6a1ab01d`) each delete exactly 39 `fsd/` paths — collateral of the 9,677-file "refocus
UFO runtime on native OMP routing" nuke, not a self-revert of the wrong referent.
`git log --all --oneline -- fsd/` returns those four commits and no others: only four commits
ever touched the tree, and none survives at HEAD (`git ls-tree -r --name-only HEAD -- fsd/` = 0).

## Gate
```
for s in f6d7d183 96a4b6b4 5409f6b6 e9aec0ed; do git cat-file -e ${s}^{commit} && echo "$s ok"; done
git show --shortstat --no-walk --pretty="%h %s" f6d7d183
git show --pretty="" --name-only f6d7d183 | grep -cv '^fsd/'            # changed paths outside fsd/
git log --all --oneline -- fsd/
for r in 96a4b6b4 5409f6b6 e9aec0ed; do git show --pretty="" --name-only "$r" -- fsd/ | grep -c 'fsd/'; done
git show f6d7d183:fsd/README.md | head -1
git grep -n -i -e 'self-driving' -e 'autonomous' -e 'fsd/' 234a689c -- NEXT.md handoff.json; echo "exit=$?"
git cat-file -e e34a4256^{commit} && git grep -n 'Full Self-Driving' e34a4256 -- plugin.json
git ls-tree -r --name-only HEAD -- fsd/ | wc -l
```
Expected: four `ok`; 39 files / +2,193; 0 changed paths outside `fsd/`; exactly four commits in
the `fsd/` log; 39 `fsd/` paths touched by each removal; README line 1 =
`# ufo-fsd — a minimal Full Self-Driving stack`; disclosure grep `exit=1`; `e34a4256` resolves
with the description string at `plugin.json:4`; 0 `fsd/` paths at HEAD.
Actual: observed exactly as expected (2026-09-18, HEAD `4adedde6`): 4x `ok`;
`39 files changed, 2193 insertions(+)`; `0`; the four commits `96a4b6b4 5409f6b6 e9aec0ed
f6d7d183`; `39` / `39` / `39`; `# ufo-fsd — a minimal Full Self-Driving stack`; `exit=1`;
`e34a4256:plugin.json:4:  "description": "Umwelt-Frontier Orchestrator Full Self-Driving Stack",`;
`0`.

## Touches
- `f6d7d183` fsd: minimal full self-driving stack (perception/planning/control + urban sim) — 39 files +2193, all under `fsd/`; parent `2a3c8fd2`, child `e434b1c6`
- `e9aec0ed` checkpoint: refocus UFO runtime on native OMP routing — 9,229 files +27,416/−758,466; deletes all 39 `fsd/` paths; parent `8a1bfb6f`
- `5409f6b6` refocus UFO runtime on native OMP routing — 9,677 files +28,020/−811,243; deletes 39 `fsd/` paths; same single parent `6a1ab01d` and same author date as `96a4b6b4`, different tree
- Paths: `fsd/README.md`, `fsd/main.py`, `fsd/pyproject.toml`, `fsd/requirements.txt`, `fsd/.gitignore`, `fsd/src/fsd/{common,perception,planning,control,simulation}/*`, `fsd/tests/test_{behavior,pid,lane_detector,planning_control,e2e_scenario}.py`, `fsd/docs/{architecture,simulation,perception,planning,control}.md`

## Out-of-scope
- The 2026-08-29 refocus nuke itself (`96a4b6b4`/`5409f6b6`/`e9aec0ed` as a 9,677-file event) —
  M-audit-early-0046; here they are cited only as the removal of this beat's referent.
- The 08-28 sibling wrong-referent case (oh-my-posh port, `c34f3666` nuke) —
  M-audit-early-0039; class-level comparison only.
- The earlier callsign/description history (`e34a4256` plugin string) — M-audit-early-0002
  lane-root era; cited here as context only, not claimed as Touches.
- Site ingestion (L0-owned) and the sibling window (audit-late).

## Findings
- **Honest failure (wrong referent).** The landing is a literal reading of the repo's own name,
  undisclosed in `NEXT.md`/`handoff.json` at `234a689c` (grep exit 1) and never explicitly
  reverted; it was removed only as collateral of an unrelated mass refocus two days later.
- **Evidence-shape note.** The landing added no gate, manifest, or ledger entry, and 0 of its
  39 paths fall outside `fsd/`, so no in-tree contract referenced it — nothing could fail while
  it was wrong, and nothing failed when it was deleted.
- **Not-a-merge note.** All three removal commits are single-parent; the `96a4b6b4`/`5409f6b6`
  pair are two distinct commits with the same subject, author date, and parent, and different
  trees (`96a4b6b4` → tree `11defd94`, `5409f6b6` → tree `ceefada5`). `ceefada5` is also
  `e9aec0ed`'s tree, so `e9aec0ed` and `5409f6b6` carry identical content reached through two
  different parents.
- **Reachability note (I4).** Of the three removal commits only `96a4b6b4` is an ancestor of HEAD
  (`git merge-base --is-ancestor 96a4b6b4 HEAD` → true); `5409f6b6` and `e9aec0ed` are NOT
  HEAD-reachable — they survive only on the ref `checkpoint/pre-launchpad-reset-20260830`
  (`git branch -a --contains 5409f6b6`). All three resolve as real objects (`git cat-file -e` ok)
  and each deletes the same 39 `fsd/` paths, so the removal fact holds; the mainline beat
  M-audit-early-0046 documents `96a4b6b4`, and the two checkpoint twins are cited here as
  reachable-only-via-ref corroboration, not as mainline history.
- **Primary citation.** `96a4b6b4` itself is documented by M-audit-early-0046 (the native-OMP
  re-charter); this beat cites only its `fsd/`-removal aspect (39 paths), checked in the Gate
  above and carried in Touches by its twin commits `5409f6b6`/`e9aec0ed`.
- Cross-ref: M-audit-early-0029 (`7a417318`) is the prior anchor; the `fsd/` tree appears nowhere
  else in the 08-27 slice.

## Links
- Plan: ufo-fsd-alpha `.ufo/scopes/audit-early/plan-r1.md` + `.ufo/scopes/audit-early/scout-aug27-report.md` (C1)
- Prior tip: `7a417318` — anchor of M-audit-early-0029
- Next: M-audit-early-0031
