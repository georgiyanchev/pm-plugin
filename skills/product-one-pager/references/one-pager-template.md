# One-pager template (`one-pager.md`)

One page a sponsor can decide from in five minutes. Headings exactly as below; later skills and the review read them by name. Body under 700 words, counted without frontmatter, tables, the Sources section and the Decision log. Sources are linked, never restated: sizing arithmetic, scores, deep dives and screens stay in the run, the prototype or the PRD.

Every line that states something about the world carries a claim tag at its end:

| Tag | Meaning |
|---|---|
| `[fact: <source>]` | a run `validated_fact`, a repo document, a cited page; the source is an evidence ID, a path or a short name |
| `[inference: <source>]` | a run `evidence_backed_inference`, or a conclusion the named evidence supports |
| `[hypothesis]` | a run `product_hypothesis`, a prototype badge, or a belief with no evidence yet |
| `[stated]` | the owner's words in chat or in `docs/product.md` |
| `[ASSUMPTION]` | filled by the writer because no source held it |

```markdown
---
title: <Product, idea or feature name>
slug: <slug>
kind: one-pager
scope: product | feature
audience: <who signs off, e.g. CEO and CFO; founder's advisory board>
sources:
  run: <run folder or null>
  prototype: <prototype folder or null>
  brief: <01-brief.md path or null>
  prd: <PRD path or null>
  product_context: <docs/product.md path or null>
decision: pending
decision_date: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# <Name>: <one-line pitch under twenty words: who gets what>

**Decision requested:** <one sentence: approve what, so that what can start>. Terms under The ask.

## Problem
Who, in what situation, cannot do what, and what it costs them. Three to five lines. No solution words.

## Who it is for
The primary persona (`P-xx` from `docs/product/target-audience.md` when the repo has it) in one line; the buyer when they differ; the segment with its size signal; who it is not for, as the file's Not the target says. Two to four lines.

## Why solve it
Why now: what changed. Why us: what the owner or company brings that others lack. The cost of doing nothing. The goal it moves (from `docs/product.md` or the company's stated goals). One line each.

## Vision
The user's world twelve to twenty-four months after this works. Two or three sentences. No feature list.

## Value proposition
For <user> who <need>, <name> is a <category> that <key benefit>. Unlike <alternatives>, it <differentiator>. <tag of the differentiator claim>

| Alternative today | What the user does with it | Where it falls short | Tag |
|---|---|---|---|
| ... | ... | ... | ... |

## Core capabilities
Three to six. Each: **<capability>**: a <user> can <do what> so that <outcome>, with its tag. From the user's side only.

## Not in the first version
Three to five bullets, each with its reason.

## Success looks like
| Outcome | Measure | Target | By when | Tag |
|---|---|---|---|---|
| ... | ... | number or `unknown (plan: ...)` | window after first use | ... |

## Riskiest assumptions
| Assumption | If wrong | Cheapest way to learn | Tag |
|---|---|---|---|
| ... | ... | ... | ... |

## Cost and timeline class
- Size: S / M / L (signals in `README.md` Sizing), or people × months. Tag.
- Running cost class: none / low / a paid service named. Tag.
- Time to the first user in hands. Tag.

## The ask
- Decision: <approve / fund / staff> <what> so that <next step, in plain words: talking to users, a clickable prototype, a requirements document> can start.
- Yes commits: <people>, <money>, <time>, one line each.
- Yes does not commit: <the build, the launch, the spend> until <the next gate>.

## Sources
- <name>: <path or link>, one line each.

## Decision log
- YYYY-MM-DD — <decision> — <who> — <reason>
```

## Rules

- **Problem before product.** The Problem section names no feature, screen or tool. "Cannot say who is in which stage" belongs there; "a stage board" does not.
- **Capabilities are the user's, not the builder's.** "A hiring owner can send the polite rejection in one tap so that no candidate is left waiting" is a capability. "Email API", "job-board integration", "database of candidates" are implementation and belong to the PRD and the architecture. The review scans for implementation nouns.
- **Vision is a picture, not a roadmap.** It says how the user's life differs, not which features ship in which quarter.
- **No plan.** Phases, week numbers, interview counts and team structure are the plan's, written after approval. The Cost and timeline class gives an order of magnitude only.
- **Three assumptions, ordered by how much a wrong answer changes the decision.** The first one is the one the sponsor should ask about.
- **Competitors appear only in the Value proposition table**, as what the user does today. No trade dress, no copied copy, no screenshots.
- **Metrics are outcomes.** "Employers hire their second person through it" counts; "the tool exists" and "API latency" do not.
- **One decision, in the reader's words.** The ask names one thing to approve and what a yes does and does not commit; the next step is said plainly ("validation with ten employers", "a clickable prototype"), and the skill that runs it goes in the Decision log line when the decision is recorded, not in the body. A pitch that asks for the build and the validation in one breath gets two one-pagers.
- **The page is a pitch, not a permission.** Nothing in it authorizes building, spending or contacting people; the sponsor's recorded decision is what the next skill reads.
- The decision log is append-only; `updated` changes whenever the body changes.
