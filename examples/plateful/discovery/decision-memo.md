*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

# Plateful: go / no-go decision memo (stage `go_no_go_memo`, checkpoint CP3)

Run: validation mode, industry "home cooking and meal planning", seed idea "a weekly meal planner for two people who cook at home". Currency USD, as of 2026-09-14. Budget 500 units, 14 days.

**Every figure below is an example estimate.** Inputs are stated so each number can be rebuilt; none is claimed to come from a source. In a real run each carries evidence IDs and a verification state.

## Verdict

**GO, with conditions.** Opportunity verdict: Go (no fatal gate, average score 7.0, no score below 6, problem and demand both at least 7). Execution readiness is judged separately: **partial** (one part-time founder, no paid acquisition budget). A partial readiness does not lower the opportunity score; it sets the conditions below.

The recommendation is not a decision. Only the owner's stated GO at CP3 reaches `validation_planner`, and nothing here authorizes building or spending.

## Why, in five lines

1. Pairs who cook at home plan dinners nightly, buy twice a week and bin what is left. The pain is frequent and costs money.
2. Planners aimed at one person or a family exist; none carries leftovers into the next meal.
3. The product is small enough for one person: a mobile app, no delivery, no logistics, no content team.
4. The market is modest. It supports a lifestyle business, not a venture return.
5. The riskiest belief is that pairs keep planning after the novelty ends.

## Market sizing (example estimates)

Unit: pairs (two-person households), price $4 per month per pair, $48 per year.

| Layer | Formula | Result |
|---|---|---|
| TAM, top-down | 30,000,000 adult two-person households aged 25 to 45 in launch markets x 40% cooking 4+ nights a week = 12,000,000 pairs; x $48 | $576M a year |
| SAM | 12,000,000 pairs x 15% who use a planning or shopping app on a phone = 1,800,000 pairs; x $48 | $86.4M a year |
| SOM, year 3, top-down | 1,800,000 x 0.5% share = 9,000 paying pairs; x $48 | $432K a year |
| SOM, year 3, bottom-up | 36,000 activated pairs in 3 years x 40% still planning at 8 weeks = 14,400 active x 25% paying = 3,600 pairs; x $48 | $173K a year |

Variance: top-down is 2.5 times bottom-up. The top-down figure assumes a share that needs paid channels; the bottom-up figure is capped by one part-time owner's organic reach (referral inside the pair, app store search, two content channels). **Base case uses the lower figure.** SOM is 0.2% of SAM pairs in the base case, far under the 10% ceiling.

## Economics (example, year 3, annual)

| Case | Paying pairs | Revenue | Running cost | Margin |
|---|---|---|---|---|
| Low | 1,800 (half of base) | $86K | $30K | $56K |
| Base | 3,600 | $173K | $30K | $143K |
| High | 9,000 (top-down) | $432K | $60K | $372K |

Running cost base: $30K = hosting and data $6K, app store and tooling $4K, recipe content licence $10K, support and legal $10K. High case adds $30K of paid acquisition. The founder's time is unpaid in all cases. Break-even is 625 paying pairs in the base cost structure ($30K / $48).

## Competition (Porter's forces, short)

| Force | Rating | Reason (example) |
|---|---|---|
| Direct rivals | moderate | Family-oriented planners and recipe sites with a planner; none plans for two or reuses leftovers |
| Substitutes | high | A notes app, a shared grocery list, a habit of "deciding at 6 pm" |
| New entrants | high | Low build cost; a family planner could add a two-person mode |
| Buyer power | high | Switching cost is low; free tiers are common |
| Supplier power | low | Recipe content is licensable from several providers |

## Regulatory flags (example)

App store subscription rules and refund handling in each launch market; consumer privacy rules for household and dietary data; no health claims (calorie tracking is out of scope, which avoids the strictest category).

## Scorecard (0 to 10, example)

| Dimension | Score | Note |
|---|---|---|
| Problem | 8 | Frequent, costly, already worked around with notes and lists |
| Demand | 7 | Pairs ask for a two-person mode and for leftover handling in reviews of existing apps (example) |
| Market | 6 | Modest; SOM supports one person |
| Competition | 7 | Crowded but no one serves the pair |
| Economics | 7 | Positive margin in all three cases |
| Objective feasibility | 8 | Standard mobile stack; no regulated or novel technology |
| Distribution | 6 | Organic only; no proven channel yet |
| **Average** | **7.0** | Go rule: at least 7, none below 6, problem and demand at least 7 |

**Fatal gates:** unvalidated problem: not triggered (see condition 1). Missing beachhead: not triggered (S-01, cohabiting pairs who cook most nights). Uncrossable regulation or technical barrier: not triggered. Negative base economics: not triggered. Decision-critical sourcing gap: not triggered in this example.

## Confidence (example)

Confidence = evidence quality x source coverage x freshness, each 0 to 1.

| Section | Quality | Coverage | Freshness | Confidence |
|---|---|---|---|---|
| Problem | 0.7 | 0.8 | 1.0 | 0.56 |
| Market size | 0.5 | 0.6 | 1.0 | 0.30 |
| Demand | 0.6 | 0.7 | 0.9 | 0.38 |
| Economics | 0.5 | 0.7 | 1.0 | 0.35 |

Market size and economics are the weakest and are inputs to condition 3.

## Critical assumption and the observation that would change the decision

**Critical assumption:** at least 40% of pairs who plan in week 1 are still planning in week 8 (this is also the year's retention goal).

**Single observation that would most change the decision:** fewer than 25% of a first cohort of pairs still planning at week 4 in the concierge test below. That reads as Refine (pricing or scope), not Kill.

## Conditions on the GO

1. **Prove the pain with pairs before building.** Run the concierge test in the validation plan: 20 pairs, a weekly plan and shared list made by hand for 4 weeks. Proceed to a build only if at least 12 of the 20 pairs are still using the plan in week 4.
2. **Keep the scope at the pair.** No family mode, no delivery, no calorie tracking, no social feed. Each is a different business.
3. **Re-size after the test.** Replace the example inputs (share who cook 4+ nights, share who use a planning app, paying rate) with figures observed in the test and recompute the table above.
4. **Limit spend to the budget.** 500 units and 14 days for validation; no paid acquisition until the retention condition holds.

## Execution readiness (separate judgment)

**Partial.** Gaps: build time (one part-time founder), no paid acquisition budget, no recipe content yet. Actions named, not scored: license a recipe set, limit the first release to one platform if time runs short, recruit the 20 pairs from the founder's own network.

## Next

If the owner states GO at CP3, the run continues to `validation_planner` (concierge test, a fake-door page for the leftovers promise, five short interviews). The owner runs the experiments and supplies observations; `validation_results_review` and CP4 follow.
