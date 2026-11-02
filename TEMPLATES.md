# Document map

Every document the pipeline writes, in stage order: its main sections, where it lands, the template that shapes it with the checklist that judges it and the rules that fill it (links show the file name; the skill is in the link; one block per document, grouped by stage), who writes it, who reads it, and the gate it carries. Templates stay inside the skill that owns them (a skill must run from its own folder in Codex); this page is the view across them. In the full edition `validate.py` fails when a `*-template.md` under `skills/` is missing here or a plugin path here does not exist.

`<repo>` is the product repo, `<run>` is `<ideas-root>/<run_id>/`, `<slug>` a feature folder under `docs/product/`.

## Setup

### Product context

- **Sections:** one sentence · Audience and jobs · Goals this year · Constraints · Metrics source · Design system · Out of scope · Related docs
- **Output:** `<repo>/docs/product.md`
- **Template:** [templates/docs/product.md](skills/project-scaffold/references/templates/docs/product.md) (duplicate: product-context-template.md (full edition), consolidation item 1)
- **Rules:** [manifest.md](skills/project-scaffold/references/manifest.md), [from-discovery.md](skills/project-scaffold/references/from-discovery.md)
- **Written by:** project-scaffold
- **Read by:** every skill's product check, product-prd, product-one-pager, product-prototype

### Target audience (segments `S-xx`, personas `P-xx`, jobs `J-xx`)

- **Sections:** A. Summary: recommendation, primary segment, jobs to be done, not the target, personas · B. Insights: why this audience, secondary segments, persona cards, reach signals, updates, sources
- **Output:** `<repo>/docs/product/target-audience.md`
- **Template:** [templates/docs/product/target-audience.md](skills/project-scaffold/references/templates/docs/product/target-audience.md)
- **Checklist:** brief-review 20, prd-review 19
- **Rules:** artifact-conventions.md (full edition) (Target audience), [from-discovery.md](skills/project-scaffold/references/from-discovery.md)
- **Written by:** project-scaffold; appended by feature-discovery, feature-prd, product-prd
- **Read by:** every brief, PRD, prototype brief, one-pager, quick record, marketing plan

### Voice

- **Sections:** In one line · Four traits · Who speaks, to whom · How much play, where · Do · Don't · Examples · Change log
- **Output:** `<repo>/docs/product/voice.md`
- **Template:** [templates/docs/product/voice.md](skills/project-scaffold/references/templates/docs/product/voice.md)
- **Written by:** project-scaffold
- **Read by:** anything that writes user-facing copy

### Feature index

- **Sections:** one row per feature (slug, title, size, status, updated, next step) · Parked for later
- **Output:** `<repo>/docs/product/INDEX.md`
- **Template:** [templates/docs/product/INDEX.md](skills/project-scaffold/references/templates/docs/product/INDEX.md)
- **Rules:** artifact-conventions.md (full edition)
- **Written by:** feature-pipeline, feature-discovery
- **Read by:** feature-pipeline

### Design reference

- **Sections:** Brand mood and owner preferences · Rejected directions · Colour palette · Typography · Spacing, radii, layout · Component rules · Motion and imagery · Accessibility · Anti-patterns · Usage guidelines for agents · Open questions
- **Output:** `<repo>/docs/design/DESIGN.md`
- **Template:** [templates/docs/design/DESIGN.md](skills/project-scaffold/references/templates/docs/design/DESIGN.md)
- **Written by:** project-scaffold
- **Read by:** feature-design, product-prototype

### The rest of the scaffold (AGENTS.md, README, marketing plan, release checklist, decisions, lessons, hosting, folder READMEs)

- **Sections:** per file · see the manifest's Purpose column
- **Output:** per `skills/project-scaffold/references/manifest.md`
- **Template:** [templates/](skills/project-scaffold/references/templates/)
- **Rules:** [manifest.md](skills/project-scaffold/references/manifest.md)
- **Written by:** project-scaffold
- **Read by:** owner, agents

## Discovery

### Discovery scope brief

- **Sections:** industry · scope · country · currency · as-of date · validation budget and days · ethical boundaries · prohibited research actions · missing inputs
- **Output:** `<run>/stages/discovery_brief.json` and `.md`
- **Template:** discovery-brief.md (full edition), discovery_brief.schema.json (full edition)
- **Checklist:** contract.md (full edition)
- **Rules:** workflow.md (full edition)
- **Written by:** runner, discovery-stage-extractor
- **Read by:** every later stage

### Assessment intake

- **Sections:** objective · success definition · primary user · primary job · product state · success criteria · cost ceiling · maintenance hours · constraints · requested deliverables · question log
- **Output:** `<run>/context.json` (`assessment_intake`)
- **Template:** assessment-intake.schema.json (full edition)
- **Rules:** assessment.md (full edition)
- **Written by:** discovery-review-idea
- **Read by:** synthesis stage

### Discovery report and grade card

- **Sections:** report: conditional judgment, product check, objective fit, competitive conclusion, ranked opportunities, keep/change/defer, constraints, mind-changing tests, stage reports, checkpoint decisions, evidence ledger · grade card: score per criterion, verdict
- **Output:** `<run>/discovery_report.md`, `<run>/grade_card.md`
- **Template:** human-readable-outputs.md (full edition)
- **Checklist:** run-grader.md (full edition)
- **Rules:** scoring-and-evidence.md (full edition)
- **Written by:** runner, discovery-run-grader
- **Read by:** owner, product-one-pager, product-prototype, product-prd
- **Gate:** CP1, PAIN_GATE, CP2, CP3, CP4 (prove-idea)

### Development handoff

- **Sections:** readiness · overview · problem and customer · evidence and rationale · outcomes and metrics · product hypotheses · representative examples · user journeys · requirements · non-goals · risks · validation history · business and GTM · delivery guardrails · open questions · traceability
- **Output:** `<run>/handoff/development-handoff.json` and `.md`
- **Template:** development-handoff.schema.json (full edition)
- **Checklist:** `validate-handoff` (runner)
- **Rules:** development-handoff.md (full edition)
- **Written by:** runner after CP3 or CP4 GO
- **Read by:** product-prd, project-scaffold
- **Gate:** `approve-handoff`

## Product

### One-pager (executive pitch)

- **Sections:** pitch line and decision requested · Problem · Who it is for · Why solve it · Vision · Value proposition (alternatives table) · Core capabilities · Not in the first version · Success looks like · Riskiest assumptions · Cost and timeline class · The ask · Sources · Decision log
- **Output:** `<repo>/docs/product/one-pager.md` or `<run>/one-pager.md`
- **Template:** [one-pager-template.md](skills/product-one-pager/references/one-pager-template.md)
- **Checklist:** [one-pager-review.md](skills/product-one-pager/references/one-pager-review.md)
- **Rules:** [input-mapping.md](skills/product-one-pager/references/input-mapping.md)
- **Written by:** product-one-pager (closing step of a discovery GO)
- **Read by:** sponsor; product-prototype, product-prd
- **Gate:** sponsor: approved / revise / declined

### Prototype brief and prototype

- **Sections:** brief: Product · Persona and moment · Jobs and flows · Hero action · Screens (tiers) · Hypotheses on screen · Deferred and out of bounds · Brand and taste · Roles · Sample data · Sources. Prototype: decisions.md, directions/, index.html, tokens.css, README
- **Output:** `<repo>/docs/product/prototypes/<slug>/` or `<run>/prototype/`
- **Template:** [prototype-brief-template.md](skills/product-prototype/references/prototype-brief-template.md)
- **Checklist:** [prototype-checklist.md](skills/product-prototype/references/prototype-checklist.md)
- **Rules:** [input-mapping.md](skills/product-prototype/references/input-mapping.md), [decision-policy.md](skills/product-prototype/references/decision-policy.md), [direction-round.md](skills/product-prototype/references/direction-round.md), [build-rules.md](skills/product-prototype/references/build-rules.md)
- **Written by:** product-prototype
- **Read by:** owner, product-prd, feature-prd, feature-design
- **Gate:** together-mode stops (brief, direction)

### Product PRD

- **Sections:** 1 Executive summary · 2 Problem and current alternatives · 3 Goals and non-goals · 4 Target users · 5 JTBD · 6 Use cases · 7 Functional requirements · 8 Information architecture · 9 UI/UX · 10 Flows, edge cases, constraints · 11 Scope and phasing · 12 Open questions · 13 Risks · 14 Traceability · appendices A glossary, B comparable products, C prototyping prompts
- **Output:** `<repo>/docs/product/product-requirements.md` or `<run>/product-requirements.md`
- **Template:** prd-template.md (full edition) with template-delta.md (full edition)
- **Checklist:** prd-review.md (full edition) with the delta's review rows
- **Rules:** input-mapping.md (full edition), enhancers.md (full edition)
- **Written by:** product-prd
- **Read by:** delivery-architecture, delivery-build
- **Gate:** product gate: approve / cut / hold

### Capability gap audit and inventory

- **Sections:** Scope boundary · Competitor set · Capability matrix · Gaps · Ranked gaps · Deliberate no · Unmet hypotheses · Diff against prior audit · Method notes · Not checked. Inventory: taxonomy table with have / partial / missing
- **Output:** `<repo>/docs/product/audits/<date>-capability-gaps.md`, `<repo>/docs/product/capabilities.md` (feature scope: `<slug>/audits/`)
- **Template:** audit-template.md (full edition)
- **Checklist:** audit-review.md (full edition)
- **Rules:** taxonomy.md (full edition), gap-classification.md (full edition), competitor-knowledge.md (full edition), demand-evidence.md (full edition)
- **Written by:** capability-gap-audit
- **Read by:** feature-discovery

## Feature

### Intake

- **Sections:** Who has the problem · Evidence · What they do today · What success looks like · Constraints
- **Output:** `<repo>/docs/product/<slug>/00-intake.md`
- **Template:** intake-template.md (full edition)
- **Written by:** feature-discovery (scaffolded by `scripts/new-feature.ps1`)
- **Read by:** the brief
- **Gate:** — (consolidation item 2: fold into the brief)

### Feature brief

- **Sections:** Problem · Who and evidence · Goals and metrics · Solution outline · Non-goals · Product check · Riskiest assumptions · Alternatives considered · Size · Recommendation · Decision log
- **Output:** `<repo>/docs/product/<slug>/01-brief.md`
- **Template:** brief-template.md (full edition)
- **Checklist:** brief-review.md (full edition)
- **Rules:** product-check.md (full edition), failure-analysis.md (full edition), alternatives.md (full edition), sizing.md (full edition), competitor-scan.md (full edition)
- **Written by:** feature-discovery
- **Read by:** feature-prd, feature-design, feature-retro, product-one-pager
- **Gate:** Gate 1: go / validate-first / no-go, size S/M/L

### Feature PRD (lite for M, full for L)

- **Sections:** full: the 14 sections and 3 appendices as the product PRD. Lite keeps 1, 2, 3, 7, 9, 10, 11, 13 and a one-line coverage check
- **Output:** `<repo>/docs/product/<slug>/02-prd.md`
- **Template:** prd-template.md (full edition), prd-lite.md (full edition)
- **Checklist:** prd-review.md (full edition)
- **Rules:** enhancers.md (full edition), repo-context-scan.md (full edition)
- **Written by:** feature-prd
- **Read by:** feature-design, plan, delivery-architecture (size L)
- **Gate:** Gate 2: approve / cut / hold

### Design rounds

- **Sections:** per screen: Purpose · Primary action · Entry points · Content hierarchy · States required · Exact copy · Design system constraints · For CHANGED screens · Audience and personality · Out of bounds. Then concept rounds and a README with the chosen directions
- **Output:** `<repo>/docs/product/<slug>/03-design/`
- **Template:** design-brief-template.md (full edition)
- **Checklist:** review-checklist.md (full edition)
- **Rules:** concept-rounds.md (full edition)
- **Written by:** feature-design
- **Read by:** plan, build

### Plan

- **Sections:** per plan-handoff.md: goal, scope from the PRD, tasks in order, verification per task, risks, done criteria
- **Output:** `<repo>/docs/product/<slug>/04-plan.md`
- **Template:** none; contents listed in plan-handoff.md (full edition)
- **Written by:** external (superpowers `writing-plans`)
- **Read by:** build

### Retro

- **Sections:** Goals vs actual · Shipped vs planned · Assumptions · Product check (verdicts graded) · Learnings · Next · Metrics source
- **Output:** `<repo>/docs/product/<slug>/05-retro.md`
- **Template:** retro-template.md (full edition)
- **Rules:** product-check.md (full edition) (verdicts graded)
- **Written by:** feature-retro
- **Read by:** owner

### Quick record (size S)

- **Sections:** Problem · Evidence · User story · Requirements · Constraints and non-goals · Done when · Open questions. Appended: Assessment (opens with the product check) · Plan · Shipped · Decision log
- **Output:** `<repo>/docs/product/quick/<date>-<slug>.md`
- **Template:** [quick-feature-template.md](skills/feature-quick/references/quick-feature-template.md)
- **Checklist:** product-check.md (full edition)
- **Rules:** [intake-interview.md](skills/feature-quick/references/intake-interview.md), [record.md](skills/feature-quick/references/record.md)
- **Written by:** feature-quick
- **Read by:** build
- **Gate:** stops: input, product check, requirements, plan (consolidation item 3: a brief tier)

### Feature one-pager

- **Sections:** as the product one-pager
- **Output:** `<repo>/docs/product/<slug>/one-pager.md`
- **Template:** as the product one-pager
- **Checklist:** as the product one-pager
- **Rules:** as the product one-pager
- **Written by:** product-one-pager
- **Read by:** sponsor
- **Gate:** sponsor decision (consolidation item 5: product scope only?)

## Delivery

### Architecture brief

- **Sections:** Owner profile · Project answers · Accepted stack proposal · Objections (per round)
- **Output:** `<repo>/docs/development/<date>-<slug>-architecture.brief.md`
- **Template:** interview.md (full edition)
- **Rules:** author-brief.md (full edition)
- **Written by:** delivery-architecture
- **Read by:** architecture-author
- **Gate:** stack proposal accepted

### Architecture and its review

- **Sections:** 0 Stack summary · 1 Scope and constraints · 2 Platform and framework selection · 3 Decision table · 4 Data model · 5 Agent operating model · 6 Delivery plan (AGENT/HUMAN tasks) · 7 Repository state · 8 PRD critique · 9 Risks · 10 Owner decisions · 11 Pre-implementation checklist · A Review record. Review: verdict, scorecard, fact-check, ranked improvements, alternatives, owner decisions
- **Output:** `<repo>/docs/development/<date>-<slug>-architecture.md`, `.review.md`
- **Template:** document-template.md (full edition)
- **Checklist:** review-checklist.md (full edition)
- **Written by:** architecture-author, architecture-reviewer (Fable)
- **Read by:** delivery-build, plan
- **Gate:** adopt / adopt with changes / rethink

### Implementation prompt

- **Sections:** Launch gate · Role · Inputs · Decisions already made · Phase 0 pre-flight · Phase 1 plan · Phase 2 implement · Out of scope · What done means · Working rules · Autonomy · Fix round · Final report
- **Output:** `<repo>/docs/plan/<milestone>-implementation-prompt.md`
- **Template:** prompt-template.md (full edition)
- **Rules:** interview.md (full edition)
- **Written by:** delivery-build
- **Read by:** a fresh coding session
- **Gate:** launch gate, Phase 0

### Build review and evidence

- **Sections:** Header · Evidence file · 1 Verdict · 2 Claims versus code · 3 Done criteria · 4 Guardrails · 5 Findings (F-NN task blocks) · 6 Device script · 7 Readiness audit · 8 Closing record. Evidence: E-NN blocks with command, output tail, outcome
- **Output:** `<repo>/docs/plan/<stem>-review.md`, `<stem>-review-evidence.md`
- **Template:** review-template.md (full edition)
- **Checklist:** review-checklist.md (full edition), readiness-audit.md (full edition)
- **Written by:** delivery-review, build-reviewer (Fable)
- **Read by:** owner, delivery-build (fix loop)
- **Gate:** owner closes: accepted / fix

## Conventions

- A document template file ends with `-template.md`; a judging checklist with `-review.md` or `-checklist.md`; a source-to-section table is `input-mapping.md`. New files follow this; existing names are renamed only when their skill is next touched.
- Templates live in the skill that writes the document, beside the checklist and mapping that change with them. This page links; it never copies.
- Known overlaps and the open consolidation list (duplicate product context, intake into brief, quick as a brief tier, feature one-pager scope, prototype brief by reference) are recorded in `docs/specs/2026-10-30-target-audience-single-source-design.md` under Not done.
