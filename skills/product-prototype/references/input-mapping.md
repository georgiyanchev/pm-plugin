# Deriving the prototype brief from each input

Read the source in full before writing a line. JSON is canonical in a discovery run; its Markdown is a view. Fill every section of the template; a section the source cannot fill is a question (together) or an `[assumed]` line (autonomous).

## Which product, from a discovery run

A run can hold several candidate products: the supplied concept, a reshaped recommendation, and ranked opportunities. The brief names one. Propose by the synthesis call:

| Call | Proposal | `product_choice` |
|---|---|---|
| proceed | the supplied concept | original |
| reshape, narrow | the reshaped product: the keep/change/defer rows with action `keep` or `change` (their proposed behaviour), plus the top-ranked opportunity as FLOW-01 | reshaped |
| validate first | the supplied concept, every untested claim badged | original |
| drop | stop; ask whether to prototype anyway and which candidate. In autonomous mode, stop and report; a dropped idea is the owner's call | n/a |

Together mode: present the proposal with the other candidates in one line each, and wait. Autonomous mode: take the proposal and log it `[auto]`. Never blend candidates without saying so in the brief and in `decisions.md`.

## Mapping

| Brief section | Assessment run (`discovery-review-idea`) | Validation run or handoff (`discovery-prove-idea`) | `docs/product.md` | `01-brief.md` | `02-prd.md` | Quick template or chat |
|---|---|---|---|---|---|---|
| Product | normalizer `selected_opportunity`, intake seed idea; reshaped: `prd_review` rows | handoff `overview.summary` | the one sentence | Solution outline, first line | 1. Executive Summary | Title, Problem |
| Persona and moment | intake `primary_user`, `primary_job`; research `user_outcomes` | `problem_and_customer.target_customer`, `job_to_be_done`, `current_behavior` | Audience and jobs | Who and evidence | 4. Target Users | User story |
| Jobs and flows | opportunities (`proposed_improvement`, `decisive_test`), ranked | `problem_and_customer.main_scenarios`, `journeys` | Goals this year, Audience jobs | Solution outline | 5. Jobs-To-Be-Done, 10. User Flows (Phase 1 flows are core) | Requirements tagged `[must]` |
| Hero action | top opportunity's user action | first journey's first step | first job | Solution outline | 10. first flow's first action | first `[must]` |
| Screens | invented from the flows; tag `[assumed]`; every screen a flow needs, plus the usual placeholders | `journeys` steps, `representative_examples` tagged UI; tag `[assumed]` where invented | invented from jobs | screens named in Solution outline | 8. Information Architecture, 9. UI/UX Requirements (NEW and CHANGED screens; UNCHANGED screens are supporting) | invented |
| Hypotheses on screen | claims classed `product_hypothesis` or `unresolved`; `decisive_test` of each opportunity | requirements with claim class `product_hypothesis` or `unresolved`; `product_hypotheses` | lines marked `[assumption]` | Riskiest assumptions table, rows `untested` or `weak` | 13. Assumptions, `[ASSUMPTION]` and `[UNVERIFIED]` tags | Open questions |
| Deferred and out of bounds | `prd_review` rows with action `defer` or `remove`; constraints | `non_goals`, `delivery_guardrails` | Out of scope, Constraints | Non-goals | 11. Scope & Phasing (Phase 2 and later), non-goals | Constraints and non-goals |
| Brand and taste | not in the run; ask or assume | not in the run; ask or assume | Personality and voice lines; `docs/design/` or tokens when present | `docs/product.md` | 9. design tokens; repo design system | ask or assume |
| Sample data | research facts (real places, prices, formats) | evidence entries | repo fixtures | repo fixtures | 9. example data, Appendix C sample data | invented, plausible |

## Rules

- A run's Markdown reports are views; read `stages/*.json` (assessment: `idea_normalizer`, `assessment_research`, `assessment_synthesis`; validation: the committed stages and `handoff/development-handoff.json`). When only Markdown exists, say so in Sources.
- Market sizing, scores, confidence numbers and competitor names stay in the run; no competitor is named on screen. Competitor capabilities inform flows as patterns, never as copied screens, trade dress or copy.
- A product that needs a second role to work (organizer, admin, provider) gets a Roles line in the brief. Its screens are supporting or placeholder unless the owner is that role's user, which is an impactful question.
- A PRD's exact copy (section 9, Key copy) is kept verbatim on its screens. A brief or run has no copy; the skill writes it in the brand voice and tags it `[assumed]`.
- Platform: from the source when stated. A run that defers mobile makes the prototype web; a run that says mobile-first makes it mobile. Otherwise a blocking question.
- Design system present in the repo (`docs/design/`, tokens file, shared components): its tokens are the direction round's constants; directions vary within them.
- Sign-in, sign-up, password reset, settings, legal, help, notifications: placeholder tier unless a core flow passes through them (a booking that needs an account makes sign-up supporting, never core).
