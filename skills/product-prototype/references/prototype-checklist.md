# Prototype review checklist

Apply to the finished build (`index.html`, `app.js`, `flows.js`) against `prototype-brief.md`, after `scripts/check_prototype.py` has run clean of blockers. Each failed item is one finding:

```
<blocker|major|minor> | <screen, file or flow> | <problem> | <fix>
```

Return findings only. If every item passes, return `no findings`.

| # | Item | Severity if failed |
|---|---|---|
| 1 | Every core flow in the brief can be clicked from its first step to its last without a dead end, in the order the brief gives | blocker |
| 2 | Every Screens-table row has a section with the same route and tier; no section exists that the brief does not list | blocker |
| 3 | Core screens show the populated happy path: real copy, the brief's sample data, forms that accept input and submit into the next step | blocker |
| 4 | Placeholder screens carry the direction's chrome, the `.placeholder-label` naming the screen with "Out of prototype scope.", and a way back | major |
| 5 | No feature, claim, rating, count or social activity beyond the brief; deferred items appear only as the brief says | blocker |
| 6 | PRD Key copy verbatim where a PRD is the source; otherwise copy in the brand voice with no placeholder strings | major |
| 7 | Every hypothesis row has a badge on the screen the brief names; the toggle hides all badges and persists | major |
| 8 | The tour lists every core flow; each step's route resolves; hints name what to do next | major |
| 9 | Design matches the chosen direction: same tokens, type pairing, layout model, imagery treatment; no second accent doing the same job | major |
| 10 | Tokens only: no colour, size or radius literal in component CSS | minor |
| 11 | Mobile: no horizontal overflow at 390 or 360; web: none at 1280 or 1024 | major |
| 12 | Tap targets at least 44×44 px; focus visible on web; labels on inputs; `aria-label` on icon-only controls | major |
| 13 | Text contrast at least 4.5:1, including over imagery | major |
| 14 | Imagery per build-rules.md: plates with `data-art`, or local photos with `CREDITS.md`; no hot-linked images; no banned defaults from direction-round.md | major |
| 15 | No network dependency except Google Fonts and the inlined icon set; the file opens from a local folder by double-click | major |
| 16 | Mockup chrome is in its marked block; nothing inside `#app` depends on it | minor |
| 17 | `decisions.md` has a line for every `[assumed]` brief line and every `[auto]` choice; `README.md` lists the `[auto]` lines, the flow coverage, how to open and share, and what was not verified | major |
| 19 | The concept banner is present; fictional people have invented names and no real face; no competitor is named; no aggregate social proof beyond the brief | major |
| 18 | Previous build, when one existed, is in `_previous-round-N/`; nothing was overwritten | major |

## What the reviewer cannot see

Items 11 to 13 need a browser. Without one, report them as `not verified` in the README rather than as passed.
