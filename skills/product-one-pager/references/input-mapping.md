# Filling the one-pager from each source

Read every source in full before writing a line. In a discovery run the JSON is canonical (`stages/*.json`, `handoff/development-handoff.json`); the Markdown reports are views. A prototype folder is read as a whole: `prototype-brief.md` names the product, persona, jobs and hypotheses, `decisions.md` gives each choice its provenance. A section no source can fill is a question in the one batched message, then an `[ASSUMPTION]`.

## Which product

A run may hold several candidates. Follow the prototype skill's rule (`skills/product-prototype/references/input-mapping.md`, "Which product, from a discovery run"): a prototype brief's `product_choice` wins when one exists; otherwise the synthesis call decides (proceed → the supplied concept; reshape or narrow → the keep/change rows plus the top opportunity; validate first → the concept with every untested claim as `[hypothesis]`; drop → stop and ask). Name the choice in the frontmatter `title` and never blend candidates.

## Scope

`product` when the input is a run, a prototype, `docs/product.md` or a described idea. `feature` when the input is a feature's `01-brief.md` or `02-prd.md`, or the user names a slug; the one-pager then pitches the feature to the sponsor and the brief stays the Gate 1 record.

## Mapping

| Section | Assessment run (`discovery-review-idea`) | Validation run or handoff (`discovery-prove-idea`) | Prototype folder | `docs/product.md` | Feature brief or PRD | Chat |
|---|---|---|---|---|---|---|
| Title and pitch | normalizer `selected_opportunity`; intake `objective` | handoff `overview` | brief Product line, `product_choice` | the one sentence | brief title; PRD section 1 Summary | the idea, `[stated]` |
| Decision requested | synthesis `recommendation`, `next_steps` | memo verdict (Go / Refine); handoff `readiness` | README next step | — | brief Recommendation | what the owner wants approved, `[stated]` |
| Problem | intake `primary_user`, `primary_job`; research `user_outcomes`, `counterevidence` | `problem_and_customer` (`problem`, `current_behavior`, `desired_outcome`) | Persona and moment | Audience and jobs | brief Problem; PRD section 2 | the owner's words |
| Who it is for | intake `primary_user`; research `user_outcomes` | `problem_and_customer.target_customer`; memo market quality (reachable customers) | Persona and moment, Roles | `docs/product/target-audience.md` section A first (`P-xx`, Not the target), then Audience and jobs | brief Who and evidence; PRD section 4 | `[stated]` |
| Why solve it | trends stage (why now); synthesis `product_check` viability row; intake `success_definition` | `evidence_and_rationale`; `business_and_gtm`; validation history | brief Hypotheses (why-now rows) | Goals this year; Constraints | brief Product check viability row; PRD section 1 Impact | why now, why us, `[stated]` |
| Vision | intake `success_definition`; normalizer `selected_opportunity` desired state | handoff `overview`, `outcomes_and_metrics` horizon | brief Product line and hero action | the one sentence; Goals this year | — (written, `[ASSUMPTION]` unless the brief states it) | `[stated]` |
| Value proposition and alternatives | research `comparison`, `current_alternative_ids`, `competition_conclusion`, each with `evidence_ids` | `representative_examples` (capability and workflow rows); memo competitive forces | Deferred and out of bounds (what was left to others) | Related docs, `docs/competitors/` | brief Alternatives considered; PRD section 2 Current State and Appendix B | named alternatives, `[hypothesis]` |
| Core capabilities | opportunities with `priority` ≤ 2: `proposed_improvement` in user terms; `prd_review` rows `keep` and `change` | `requirements` Must rows, user story only; `user_journeys` | brief Jobs and flows, core tier screens as what the user does there | — | brief Solution outline; PRD Phase 1 FRs, user story line only | `[stated]` |
| Not in the first version | `prd_review` rows `defer` and `remove` | `non_goals`; `delivery_guardrails.scope_boundary` | Deferred and out of bounds; placeholder tier | Out of scope | brief Non-goals; PRD Non-goals and Phase 2–3 | `[stated]` |
| Success looks like | intake `success_criteria` | `outcomes_and_metrics` | — | Goals this year; Metrics source | brief Goals and metrics; PRD section 3 | `[stated]` |
| Riskiest assumptions | opportunities `counterargument`, `validation_question`, `decisive_test`; research `counterevidence`; `product_check` lenses not pass | `product_hypotheses`, `risks`; memo critical assumption | brief Hypotheses (`H-xx`) | lines marked `[assumption]` | brief Riskiest assumptions; PRD section 13 | `[hypothesis]` |
| Cost and timeline class | opportunities `cost_and_maintenance`; synthesis `constraints` | feasibility stage economics (base scenario class only); `delivery_guardrails.timeline`; `execution_requirements` | brief screen count and tiers (size signal) | Constraints (budget, team) | brief Size and signals | `[stated]`, else `[ASSUMPTION]` |
| The ask | synthesis `next_steps` | memo verdict, `readiness`, `authorized_use` | README next step | — | brief Recommendation | `[stated]` |
| Sources | `discovery_report.md`, `grade_card.md` | `handoff/development-handoff.md`, memo report | `prototype/README.md`, `index.html` | `docs/product.md` | the brief or PRD path | — |

## Rules

- Run claims keep their class: `validated_fact` → `[fact: <evidence ID>]`; `evidence_backed_inference` → `[inference: <evidence ID>]`; `product_hypothesis`, `unresolved`, `estimate`, `hypothesis` → `[hypothesis]`; `stated` → `[stated]`. Market sizing, scores, forces and regulatory flags stay in the memo; the one-pager links the report and may quote one number with its evidence ID.
- Prototype content adds screens, copy and taste, never a fact about the market. A prototype `[assumed]` choice is `[ASSUMPTION]`; an owner-confirmed one is `[stated]`.
- `docs/product/target-audience.md` is read first for Who it is for; its `P-xx` is cited and its Not the target is kept as written.
- `docs/product/target-audience.md` is read first for Who it is for; its `P-xx` is cited and its Not the target is kept as written.
- `docs/product.md` lines that are `TBD:` are open questions; lines marked `[assumption]` are `[ASSUMPTION]`; everything else is `[stated]`.
- A brief's product check call and recommendation are reported in The ask as the owner's recommendation, not rewritten.
- A handoff's authority (`draft`, `approved_for_prototype`, `approved_for_production_planning`) is reported under The ask, not changed.
- When only Markdown reports exist for a run, say so under Sources and treat their tags as given.
- Nothing in the sources authorizes building, spending or contacting people; neither does this page.
