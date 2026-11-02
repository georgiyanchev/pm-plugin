---
name: product-prototype
description: "Use when someone wants to see an idea as a clickable, end-to-end prototype before deciding whether to pursue it: after a discovery run, from docs/product.md, a feature brief, a PRD, a pasted quick-feature template or a described idea; to decide alone or to show others. Not for production code or a design system."
---

# Product prototype

## Overview

Static HTML prototype of a whole product, clickable from the entry screen to the end of every core flow. The skill derives a `prototype-brief.md` from whatever exists, runs one direction round on the entry screen, then builds the chosen direction for every screen. Core screens get the happy path only; non-value screens exist as placeholder pages so nothing dead-ends. The result is for deciding and showing. It authorizes no build, spend or contact.

## Inputs

A discovery run, `docs/product.md`, `01-brief.md`, `02-prd.md`, a pasted quick-feature template or a description; the owner's taste; a design system when the repo has one; the mode: `together` (default) or `autonomous` when the user says "make all decisions".

## Procedure

1. **Mode and folder.** Set the mode and resolve the output folder (Outputs). Every decision from here follows [decision-policy.md](references/decision-policy.md).
2. **Brief.** Derive `prototype-brief.md` per [input-mapping.md](references/input-mapping.md) into [prototype-brief-template.md](references/prototype-brief-template.md). From a run, propose which product to build. Ask the blocking questions in one message. Together: stop for confirmation. Log in `decisions.md`.
3. **Direction round.** Entry screen only, three or four directions, per [direction-round.md](references/direction-round.md): gallery, comparison table, recommendation. Together: stop for the pick. Autonomous: build the recommendation.
4. **Build.** Every screen in the brief in the chosen direction, per [build-rules.md](references/build-rules.md): one `index.html`, hash routing, tour panel, hypothesis badges, placeholder pages. Impactful questions that surfaced are asked once, before the build starts.
5. **Check.** `python scripts/check_prototype.py <folder>` for routes, dead links and coverage; the browser tool, when present, for overflow, tap targets and contrast. Apply [prototype-checklist.md](references/prototype-checklist.md) inline or through a subagent. Fix blockers and majors; say what was not verified.
6. **Record.** `README.md`: flow coverage, screen tiers, open hypotheses, decision summary, how to open and share, next step (`discovery-prove-idea`, `project-scaffold`, `product-one-pager` when a sponsor must sign off, `product-prd` for a new product, `feature-prd` or `feature-design` for a feature).

## Outputs

Folder: product repo present → `docs/product/prototypes/<slug>/` (product scope) or `docs/product/<slug>/03-design/prototype/` (feature input); otherwise the ideas root as `discovery-pipeline` resolves it → `<run_id>/prototype/` with a run, `<slug>-<YYYYMMDD>/prototype/` without. Inside: `prototype-brief.md`, `decisions.md`, `directions/`, `index.html`, `tokens.css`, `app.js`, `flows.js`, `assets/`, `README.md`. A rerun moves the previous build to `_previous-round-N/`.

## Common mistakes

- Building the supplied concept when the run's call is reshape, without saying so.
- Directions that differ only in colour; directions for more than the entry screen.
- Empty, loading, error or validation states: out of scope by decision.
- Placeholder copy, invented features, claims the input does not support.
- Asking routine questions; asking anything in autonomous mode.

## Harness notes

- Claude Code: `/pm:product-prototype <source or idea> [autonomous]`. Open `index.html` in the built-in browser for the walkthrough and the checks. Review via a general-purpose subagent given the checklist path.
- Codex or no subagents: run the checklist inline; give the file path to open.
