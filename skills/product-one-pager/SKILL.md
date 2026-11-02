---
name: product-one-pager
description: "Use when a product, an idea or a large feature needs a one-page pitch that an executive sponsor, a founder's board or a client can sign off on before anything is specified or built: problem, audience, rationale, vision, value proposition, user-side capabilities, success, riskiest assumptions, cost class and the decision asked for. Works from a discovery run, a prototype, docs/product.md, a brief, a PRD or a described idea. Not for requirements (product-prd, feature-prd) or a status update."
---

# Product one-pager

## Overview

Writes the Amazon-style one-pager: the page a sponsor reads to decide whether an idea deserves the next step. It sits beside the pipeline, after a discovery run, a prototype or a brief and before `product-prd` or `feature-prd`, and can also be the first document written from a described idea. The shape is fixed by [one-pager-template.md](references/one-pager-template.md); sources fill it per [input-mapping.md](references/input-mapping.md); [one-pager-review.md](references/one-pager-review.md) judges the draft. Every claim carries its class, capabilities are written from the user's side, and the page ends with one decision. The sponsor's answer is recorded only when the owner reports it; the page authorizes nothing by itself.

## From a discovery run

`discovery-prove-idea` runs this skill as its closing step after a recorded CP3 or CP4 GO (skipped only when the user says so); `discovery-review-idea` offers it when its call is proceed, reshape or validate first. The page lands at `<run>/one-pager.md`; the ask follows the run's state (approve validation after an assessment; approve the learning prototype after CP3 GO; approve production planning after CP4 GO); the Decision log opens with the checkpoint decision or call in the user's words. The sponsor's later decision never changes a checkpoint.

## Inputs

Any of: a discovery run (assessment, validation or handoff; JSON canonical), a `product-prototype` folder, `docs/product.md`, a feature `01-brief.md` or `02-prd.md`, a described idea. The owner's answers in chat are `[stated]`.

## Procedure

1. **Sources and scope.** Resolve the run through `discovery-pipeline` (ideas root), the prototype folder, the brief or PRD, `docs/product.md`; read everything in full. Which product: the mapping's "Which product" rule; never blend candidates. Scope `product` or `feature` per the mapping.
2. **Ask once.** One batched message: who signs off and what they weigh (growth, cost, risk, strategic fit), the decision the owner wants approved and the next step it unlocks, the cost and timeline class when no source holds it, facts no source answers. Record answers as `[stated]`; what stays unanswered becomes `[ASSUMPTION]`.
3. **Draft** against the template: headings exact, body under 700 words, every claim tagged, three to six capabilities as "a <user> can ... so that ...", competitors only in the alternatives table, no phases or week numbers, one decision in The ask. Run numbers are linked, not restated.
4. **Review.** Dispatch a general-purpose subagent with the checklist path and the one-pager path when a subagent tool exists; otherwise apply the checklist inline. Fix every blocker and major; report the word count and the minors.
5. **Present.** Show the page, name the riskiest assumption and the ask, and ask whether it is ready to put in front of the sponsor. Nothing is recorded. When the harness has a `docx` or `pdf` skill, offer a rendered copy for circulation.
6. **Decision.** When the owner reports the sponsor's answer, set `decision` (`approved`, `revise`, `declined`), `decision_date`, a Decision log line in their words. Approved: name the next step (`discovery-prove-idea` when the riskiest assumption is `[hypothesis]`, `product-prototype`, `product-prd`; at feature scope `feature-discovery` or `feature-prd`). Revise: list the sections named, redraft, bump `updated`. Declined: the reason in the log. A page with a recorded decision is not rewritten; a new pitch is a new dated file beside it.

## Outputs

Product scope: `docs/product/one-pager.md`. Feature scope: `docs/product/<slug>/one-pager.md`, out-of-band, no INDEX.md row. Without a repo: `<ideas-root>/<run_id>/one-pager.md` with a run, `<ideas-root>/<slug>-<YYYYMMDD>/one-pager.md` without one; `project-scaffold` moves it into the repo later. Frontmatter per the template.

## Common mistakes

- Writing the plan: phases, weeks, interview counts, team charts. Those come after the yes.
- Capabilities as a backlog ("job-board API", "candidate database"). The sponsor reads what the user can do.
- Restating the run: sizing, scores, forces. Link the report; quote one number with its evidence ID at most.
- A confident Problem built on a `[hypothesis]`. The tag goes on the line, and the assumption goes first in the table.
- Two asks in one page (validate and build). Two one-pagers.
- Recording the sponsor's decision from the owner's silence.

## Harness notes

- Claude Code: `/pm:product-one-pager <run, prototype folder, docs/product.md, brief, PRD or idea> [for <audience>]`; review via a general-purpose subagent given the checklist path and the page path.
- Codex or any harness without subagents: run the checklist inline; resolve the ideas root with the discovery runner as `discovery-pipeline` describes.
