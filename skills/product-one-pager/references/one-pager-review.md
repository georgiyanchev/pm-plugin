# One-pager review checklist

Run after the draft and before it is shown to the owner. Dispatch a general-purpose subagent with this file's path and the one-pager's path when a subagent tool exists; otherwise apply it inline. Read the one-pager and every path in its frontmatter `sources` before judging. Report one finding per line:

`<blocker|major|minor> | <section> | <problem> | <fix>`

Then one line: `words: <n> (body, excluding frontmatter, tables, Sources, Decision log)`.

Fix every blocker and major before the page goes to the owner. Minors are listed for the owner.

## Items

| # | Check | Severity |
|---|---|---|
| 1 | Frontmatter per the template: `kind: one-pager`, `scope`, `audience`, `sources` with a path or `null` per key, `decision: pending` until the owner reports a decision | blocker |
| 2 | Every heading in the template is present, in order, with the exact wording; none is empty | blocker |
| 3 | Body under 700 words (frontmatter, tables, Sources and Decision log excluded) | blocker |
| 4 | Every line that states something about the world ends with a claim tag (`[fact: ...]`, `[inference: ...]`, `[hypothesis]`, `[stated]`, `[ASSUMPTION]`); a `[fact: ...]` or `[inference: ...]` names a source that exists in the frontmatter sources or the repo | blocker |
| 5 | Problem names no feature, screen, tool or solution; it says who, in what situation, cannot do what, and what it costs | major |
| 6 | Who it is for says who it is not for, and names the buyer when the buyer is not the user | major |
| 7 | Why solve it has why now, why us, the cost of doing nothing and the goal it moves; a missing goal is written as `none found [ASSUMPTION]`, not left out | major |
| 8 | Vision describes the user's world, not a list of features or a roadmap | major |
| 9 | Value proposition follows the For / who / is a / that / Unlike / it form and ends with the tag of its differentiator claim; the alternatives table has at least two rows, each a real alternative the user has today, with a tag; competitor names appear nowhere else | major |
| 10 | Three to six capabilities, each "a <user> can <do what> so that <outcome>", tagged; none contains an implementation noun: API, database, schema, model, service, backend, frontend, integration, pipeline, endpoint, webhook, microservice, infrastructure, framework, library, algorithm | blocker |
| 11 | Not in the first version has three to five bullets, each with a reason; none contradicts a capability | major |
| 12 | Success looks like has two or three rows; each measure is a user or business outcome with a target (or `unknown (plan: ...)`) and a window; none measures that something exists or a system property | major |
| 13 | Riskiest assumptions has exactly three rows ordered by how much a wrong answer changes the decision; each has a cheapest way to learn that is a method, not "research more" | major |
| 14 | Cost and timeline class gives a class per line with a tag; no phases, week numbers, sprint plans, interview counts, team charts or hiring plans anywhere on the page | blocker |
| 15 | The ask names one decision, what a yes commits (people, money, time) and what it does not commit until the next gate; the next step is in plain words a sponsor understands (no skill names, IDs or checkpoint codes in the body) | blocker |
| 16 | Sources lists every path in the frontmatter and nothing is restated from them that a link would do: no sizing arithmetic, scores, Porter's forces or screen specs | major |
| 17 | The page does not promote a hypothesis to a fact because it reads well; the riskiest assumption is not hidden behind confident prose in Problem or Vision | major |
| 18 | No trade dress, copied copy, screenshots or feature-by-feature comparison of a named competitor | major |
| 19 | No sentence authorizes building, spending, hiring or contacting people; the recommendation, where present, is the owner's and tagged `[stated]` | blocker |
| 20 | Scope matches the input: `feature` for a brief, PRD or named slug, `product` otherwise; the title names one product, never a blend of candidates | major |
| 21 | Tone fits the audience line: no process jargon (claim class, checkpoint, FR-ID) in the body; tags are the only markup | minor |
| 22 | Decision log present and append-only; `updated` equals the date of the last body change | minor |
