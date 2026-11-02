# Filling a scaffold from discovery

Use when the owner points at a discovery run (`<ideas-root>/<run_id>/`) or a Development handoff (`<run>/handoff/development-handoff.json`) while scaffolding or shortly after. The run's JSON is the source; its Markdown is a view. Fill only `TBD:` lines; never overwrite an owner's words. Every line you write ends with a source tag and keeps the run's claim class: `[discovery <run_id>: validated_fact]`, `[discovery <run_id>: evidence_backed_inference]`, or `[hypothesis]` for `product_hypothesis` and `unresolved`. A handoff that is `draft`, `invalidated` or `closed` may still fill context; it never grants build authority, and the tag says `draft`.

## Mapping

| Scaffold line | Handoff field (preferred) | Assessment run fallback |
|---|---|---|
| `docs/product.md` one sentence | `overview.summary` | intake `success_definition` plus the seed idea |
| `docs/product.md` Audience and jobs | `problem_and_customer.target_customer`, `job_to_be_done`, `current_behavior`, `desired_outcome` | intake `primary_user`, `primary_job`; synthesis `judgment.objective_fit` |
| `docs/product.md` Goals this year | `outcomes_and_metrics` (one line per metric) | intake `success_criteria` |
| `docs/product.md` Constraints | `delivery_guardrails`, `business_and_gtm.economics_summary` | intake `constraints`, `monthly_cost_ceiling`, `maintenance_hours_per_month` |
| `docs/product.md` Out of scope | `non_goals` | synthesis `prd_review` rows with action `remove` or `defer` |
| `docs/product/target-audience.md` A. Recommendation and Primary segment (`S-01`) | `problem_and_customer` (who, what, from where today) | normalizer `selected_opportunity.target_customer` and `problem_statement` |
| `docs/product/target-audience.md` A. Jobs to be done (`J-xx`) | `problem_and_customer.main_scenarios`, `job_to_be_done` | research `user_outcomes` |
| `docs/product/target-audience.md` A. Personas and B. Persona cards (`P-xx`) | `problem_and_customer.target_customer`; a `product-requirements.md` or `one-pager.md` beside the run keeps the IDs it minted | normalizer `selected_opportunity.target_customer` |
| `docs/product/target-audience.md` B. Sources and Updates | handoff id and version, run path | run path, `grade_card.md` |
| `docs/decisions.md` | `validation_history` entries with their checkpoint decisions | none; assessment records no decisions |
| `docs/competitors/` | `python <plugin root>/skills/discovery-pipeline/scripts/discovery_runner.py export-competitors --run <run> --output <repo>/docs/competitors` | same command |

## Architecture document

When the run folder holds `<date>-<slug>-architecture.md` with `status: adopted` and a `pending_records` line (written by `delivery-architecture` before the repo existed): move it with the brief and review files that share its stem (`<stem>.md`, `<stem>.brief.md`, `<stem>.review.md`) into `docs/development/`; apply the records it names: one `docs/decisions.md` row per stack summary line (`Decided by: owner, on the <date> review`), the `AGENTS.md` Stack and Commands `TBD:` lines from the stack summary and the document's commands, the `docs/hosting.md` → This project slots the document decided; then clear `pending_records`. A document without `status: adopted` is moved but no record is written.

## Rules

- Personas, voice, design, hosting and stack stay `TBD:`; discovery does not know them.
- Representative examples from a handoff are patterns to consider, never a feature list. Mention them in `docs/competitors/` through the export, not in `docs/product.md`.
- Market sizing, scores and confidence numbers stay in the run; do not copy them into product context.
- After filling, re-run the scaffold script with `-Check` and report which rows are still templates.
