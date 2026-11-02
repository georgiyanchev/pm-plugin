# pm — product pipeline plugin for Claude Code and Codex

A repeatable product process as skills: scaffold a project, explore and validate an idea, pitch it on one page, see it as a clickable prototype, write the PRD, get an architecture proposal with an independent review, hand a coding agent one implementation prompt per milestone, review the build with a device script, audit capability gaps, and run small features on a quick track. Each skill is a methodology with templates, checklists and gates; the AI does the work, you make the calls.

Built and used daily by one product manager since mid 2026: two consumer apps and a web SaaS run through it end to end, version by version ([CHANGELOG](CHANGELOG.md)).

**Free edition** (this repository): four skills, installable today. **Full edition**: all eighteen skills and sixteen agents, available at [georgiyanchev.com/pm-plugin](https://georgiyanchev.com/pm-plugin/). The full command table below documents both; the Edition column says which is which, and every full-edition row links to a real example of what it produces.

## Install the free edition

**Claude Code (user scope, loads in every project):**

```
claude plugin marketplace add georgiyanchev/pm-plugin --scope user
claude plugin install pm@pm-plugin --scope user
```

**Codex and other runtimes that read `~/.agents/skills`** (clone first):

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\install.ps1 -Codex
```

Creates a junction per skill under `~/.agents/skills/` and adds a pointer line to `~/.codex/AGENTS.md`. Idempotent.

To try a clone without installing: `claude --plugin-dir "<this folder>"`.

The full edition installs the same way from its own folder (`install.ps1 -All`); it replaces the free edition under the same plugin name, so the commands below keep working.

## Commands

Open a product repo, then type a slash command or say what you want in plain words. Arguments in angle brackets are required, in square brackets optional.

| Command | What it does | Edition | Example output |
|---|---|---|---|
| `/pm:project-scaffold [folder] [check only]` | New project setup from the product side: creates the folders and documents (`AGENTS.md`, product context, voice, target audience, competitors, design, marketing, ops, release checklist, decisions, lessons, hosting) pre-filled with your conventions and `TBD:` slots, never overwriting anything, then reports every row as created, template, populated, empty, in use, missing or skipped. Run it again on an existing project to see what is still missing. | Free | [product.md](examples/plateful/docs/product.md), [target-audience.md](examples/plateful/docs/product/target-audience.md) |
| `/pm:feature-quick <idea, slug or pasted template>` | Quick track for size S work: a short interview that asks only for what is missing, a confirmation summary, a saved record, then product check, assessment, plan and build with a stop before each. Escalates to discovery at size M or L. | Free | [quick record](examples/plateful/docs/product/quick/2026-10-28-share-recipe.md) |
| `/pm:product-prototype <run, product.md, brief, PRD, template or idea> [autonomous]` | Clickable, end-to-end HTML prototype from a discovery run, `docs/product.md`, a brief, a PRD, a quick template or a described idea. Derives a prototype brief, shows three or four directions of the entry screen, then builds the chosen one for every screen: happy path on core screens, placeholder pages elsewhere, a tour panel for showing and hypothesis badges for deciding. Asks about blocking choices in batches, or makes them all when told to, and logs each one. | Free | [prototype](examples/plateful/prototype/) ([open it](https://georgiyanchev.github.io/pm-plugin/examples/plateful/prototype/)) |
| `/pm:product-one-pager <run, prototype, product.md, brief, PRD or idea> [for <audience>]` | One-page executive pitch for sign-off before anything is specified: problem, who it is for, why solve it, vision, value proposition against today's alternatives, three to six capabilities from the user's side, success outcomes, the three riskiest assumptions, cost and timeline class, one decision asked for. Every claim tagged by its class. Review by checklist, then approved, revise or declined. | Free | [one-pager](examples/plateful/docs/product/one-pager.md) |
| `/pm:discovery-pipeline <idea, industry or question>` | Hub for discovery before a product or feature exists: routes to review or prove, runs one stage ad hoc (competitors, trends, problem evidence, demand), reports run status. Deterministic runner, stage contracts, research on a fast model and analysis on a strong one. | Full | [decision memo](examples/plateful/discovery/decision-memo.md) |
| `/pm:discovery-explore <country, region, sector or shift>` | Greenfield: a landscape scan ranks five to ten sectors inside the scope with why-now evidence, demand, saturation and a dig, watch or skip call; you pick one, then ideation and the prove-idea checkpoints continue from there. | Full | [decision memo](examples/plateful/discovery/decision-memo.md) |
| `/pm:discovery-review-idea <idea or PRD path>` | Bounded assessment of a supplied idea or PRD: intake questions, user outcomes and competitor landscape, then a synthesis with a product check, near-equivalent analysis, ranked opportunities and keep, change or defer. No checkpoints; nothing authorized. | Full | [decision memo](examples/plateful/discovery/decision-memo.md) |
| `/pm:discovery-prove-idea <industry or idea>` | Formal validation with human decisions at five checkpoints: ideation or seeded idea, problem evidence, market research, decision memo, experiment plan, observed-results review; a GO closes with the one-pager. | Full | [decision memo](examples/plateful/discovery/decision-memo.md) |
| `/pm:product-prd <run, prototype, product.md or concept>` | Whole-product requirements document for a new product: every persona, flow, screen with its prototype tier, state and copy line a coding agent can build from, technical decisions left out. Phase 1 capped at ten functional requirements. Ends with a product gate. | Full | [product PRD](examples/plateful/docs/product/product-requirements.md) |
| `/pm:delivery-architecture [PRD path or slug] [review only]` | Between an approved PRD and the plan: an interview, a two-page stack proposal to accept or reject, the full architecture document (stack, decision table, data model, agent operating model, tasks with verification commands, risks), an independent review on the strongest model, one revision, and your call: adopt, adopt with changes or rethink. | Full | [architecture](examples/plateful/docs/development/2026-10-20-plateful-architecture.md) |
| `/pm:delivery-build [architecture] [prototype, beta or release] [fix]` | Turns an adopted architecture into one implementation prompt per milestone that a fresh coding session runs unattended: launch gate, inputs with precedence, pre-flight, plan files, stories with verification commands, done criteria, working rules, final report. | Full | [build prompt](examples/plateful/docs/plan/prototype-implementation-prompt.md) |
| `/pm:delivery-review [milestone or report] [close]` | The gate after an unattended build: every done-criteria command re-run into an evidence file, a read-only reviewer tests each claim against the code and the outputs, guardrail checks, findings as task blocks, and a device script for what only you can see. You run the script and close it. The release milestone adds a production-readiness audit. | Full | [build review](examples/plateful/docs/plan/prototype-build-review.md) |
| `/pm:capability-gap-audit [slug]` | Capability inventory, competitor matrix, demand evidence, ranked gaps. Product scope without a slug, feature scope with one. Reads and appends your competitor research folder. | Full | [gap audit](examples/plateful/docs/product/audits/2026-10-15-capability-gaps.md) |
| `/pm:feature-pipeline <idea or slug>` | Entry point for features on an existing product: reads `docs/product/<slug>/`, reports status, runs the next step. | Full | [feature brief](examples/plateful/docs/product/leftovers-view/01-brief.md) |
| `/pm:feature-discovery <idea or slug>` | Intake, product check, failure analysis, assumptions, alternatives, sizing, brief. Gate 1. | Full | [feature brief](examples/plateful/docs/product/leftovers-view/01-brief.md) |
| `/pm:feature-prd <slug>` | Repo scan, PRD (lite for size M, full for size L), review. Gate 2. | Full | [PRD-lite](examples/plateful/docs/product/leftovers-view/02-prd.md) |
| `/pm:feature-design <slug>` | Concept rounds as HTML for the new and changed screens in the PRD, then a final version per screen. | Full | [prototype](examples/plateful/prototype/) (same engine) |
| `/pm:feature-retro <slug>` | Goals versus actual, shipped versus planned, product check verdicts graded, next step. | Full | [quick record](examples/plateful/docs/product/quick/2026-10-28-share-recipe.md) (shipped note) |

The free edition installs the four Free rows. The Full rows are documented here and included in the full edition; nothing in this repository stubs them.

## What the pipeline writes

```
docs/
  product.md                 one-page product context
  product/
    target-audience.md       segments, personas, jobs (S-xx, P-xx, J-xx); every document cites by ID
    one-pager.md             executive pitch; sponsor decision in its frontmatter
    prototypes/<slug>/       clickable prototypes (brief, decisions, directions, index.html)
    quick/                   quick-track records, one dated file per small feature
    product-requirements.md  whole-product PRD (full edition)
    audits/                  capability gap audits, dated (full edition)
    <slug>/                  00-intake  01-brief  02-prd  03-design/  04-plan  05-retro (full edition)
  development/               architecture proposals and reviews (full edition)
  plan/                      implementation prompts, build reviews (full edition)
  competitors/               competitor knowledge base (full edition)
```

Every document with its sections, template, checklist, output path, writers, readers and gate, in stage order: [TEMPLATES.md](TEMPLATES.md). Templates for the full-edition documents are named there and shown in the examples; their files ship with the full edition.

## Examples

[examples/plateful/](examples/plateful/) is one synthetic product, a weekly meal planner for two, run through the pipeline: product context and target audience (scaffold), a quick-track record, a [clickable prototype](https://georgiyanchev.github.io/pm-plugin/examples/plateful/prototype/), a one-pager, a discovery decision memo, a product PRD, a feature brief and PRD-lite, an architecture proposal with its review, a build prompt, a build review with device script, and a capability gap audit. Every file is shortened for reading and marked as an example.

## How it works

- **Product check** in every track: value, usability, viability, feasibility, each with a verdict, a reason and its evidence, then one call: proceed, reshape, validate first or drop. A weak verdict rules out proceed unless you override it, and the override is logged.
- **Sizing**: S (one screen or component, no data-model change) goes through the quick track; M (new screens or data model) gets a brief and a PRD-lite; L (new subsystem, integration or persona) gets the full PRD, design, architecture review and plan.
- **Gates are yours.** Skills stop at a brief, a PRD, a stack proposal, an architecture, a build review. They record only the decision you state.
- **Models.** Research runs on a fast model, analysis on a strong one, the architecture reviewer on the strongest available; your session's model drives the orchestration.
- **Codex.** The same skills run as plain skills; where the plugin would use subagents, the skill says what to run inline.

## Full edition

All eighteen skills, sixteen agents, the discovery runner and the validator, with updates for twelve months and support through the issues here: [georgiyanchev.com/pm-plugin](https://georgiyanchev.com/pm-plugin/).

## Who built this

[Georgi Yanchev](https://georgiyanchev.com), a product manager who builds with AI agents. Fifteen years of products from zero to one and at Fortune 100 scale; since 2026 building full time with coding agents, every product through this plugin. [LinkedIn](https://www.linkedin.com/in/georgiyanchev).

Issues and questions: open an issue in this repository.
