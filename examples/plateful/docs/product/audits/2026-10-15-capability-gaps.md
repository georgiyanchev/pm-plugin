*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

```yaml
title: Plateful capability gaps
scope: product
slug: null
audited_on: 2026-10-15
competitors: [Family planner, Recipe site, Pantry app]
gaps:
  table_stakes: 2
  differentiator: 2
  depth: 1
  unmet: 1
prior_audit: null
```

# Plateful capability gaps, 2026-10-15

All competitor names are invented and generic. Competitor and demand data below are example data, cited to example files; no real source is claimed.

## Scope boundary

In scope = jobs A decide the week's dinners (J-01), B know what is at home (J-02), C shop (J-02), D use what is left (J-03), E use the app where the pair uses it. Source: `docs/product.md` audience and `docs/product/product-requirements.md`. `prd:` the product PRD, approved 2026-10-12.

## Competitor set

| Competitor | Tier | Why included | Source |
|---|---|---|---|
| Family planner (a family meal-planning app) | direct | Plans for households of four; named as the main rival in the run | `docs/competitors/family-planner.md` |
| Recipe site (a recipe site with a planner) | direct | Pin-to-day planner with one account | `docs/competitors/recipe-site-planner.md` |
| Pantry app (a home inventory app) | adjacent | Tracks what is at home; shows the fridge side of J-02 | `docs/competitors/pantry-app.md` |

Left out: a notes app with a shared list, a substitute the run named; it has no capability rows beyond C1.

## Capability matrix

| ID | Capability | Ours | Family planner | Recipe site | Pantry app | Source |
|---|---|---|---|---|---|---|
| A1 | Shared week plan on two phones | have | has | has | none | `docs/competitors/family-planner.md#plan` |
| A3 | Dietary and allergy filters | missing | has | has | none | `docs/competitors/recipe-site-planner.md#filters` |
| B1 | Fridge list entered by hand | have | none | none | has | `docs/competitors/pantry-app.md#add` |
| B2 | Add by barcode scan | missing | none | none | has | `docs/competitors/pantry-app.md#add` |
| B3 | Quantities, not only presence | partial | none | none | has | `docs/competitors/pantry-app.md#quantity` |
| C1 | One shared list, synced | have | has | has | has | `docs/competitors/family-planner.md#list` |
| C2 | Skip items already in the fridge | have | none | none | partial | `docs/competitors/pantry-app.md#list` |
| C3 | Group the list by store aisle | missing | has | has | none | `docs/competitors/family-planner.md#list` |
| C4 | Send the list to grocery delivery | missing | has | has | none | `docs/competitors/recipe-site-planner.md#delivery` |
| D1 | Dinners from what is in the fridge | have | none | partial | partial | `docs/competitors/recipe-site-planner.md#search` |
| D2 | Leftovers recorded after cooking | have | none | none | none | `docs/competitors/family-planner.md#cooking` |
| D3 | Leftovers carried into the next meal | partial | none | none | none | `docs/competitors/family-planner.md#cooking` |
| D4 | Calorie and nutrition tracking | missing | has | has | none | `docs/competitors/family-planner.md#nutrition` |
| E1 | Works offline in the shop | missing | has | unknown | has | `docs/competitors/pantry-app.md#offline` |

Ours, read from the clickable prototype (`prototype/index.html`) and the PRD: A1 and C1 on product SCR-02 and SCR-04; B1 and B3 on SCR-05 (B3 shows presence, no quantity); C2 on SCR-04; D1 on SCR-06; D2 and D3 on SCR-07 (the prompt and the "Plan it" chip, no list of leftovers). Prices appear as notes only: the Family planner gates A3 and C3 behind its paid plan `(P)`.

## Gaps

Live direct set: Family planner and Recipe site. Majority threshold: more than half, so 2 of 2. Only `has` cells count.

### table-stakes
| Gap | Competitors that have it | Evidence |
|---|---|---|
| A3 Dietary and allergy filters | Family planner, Recipe site (2 of 2) | prior (`docs/competitors/family-planner.md`, 2026-10-14) |
| C3 Group the list by store aisle | Family planner, Recipe site (2 of 2) | prior (`docs/competitors/recipe-site-planner.md`, 2026-10-14) |

### differentiator
| Gap | Competitors that have it | Evidence |
|---|---|---|
| B2 Add by barcode scan | Pantry app; reviews praise it | prior (`docs/competitors/pantry-app.md`, 2026-10-14) |
| E1 Works offline in the shop | Family planner, Pantry app; reviews name signal loss in shops | prior (`docs/competitors/pantry-app.md`, 2026-10-14) |

### depth
| Gap | Competitors that have it | Evidence |
|---|---|---|
| B3 Quantities, not only presence | Pantry app tracks amounts left; ours records presence and a use-by date | prior (`docs/competitors/pantry-app.md`, 2026-10-14) |

### unmet
- D3 Leftovers carried into the next meal: ours is partial; no competitor in the set has it (see Unmet hypotheses).

### edge
- C2 Skip items already in the fridge; D1 Dinners from what is in the fridge; D2 Leftovers recorded after cooking. Ours have them; no direct competitor has them.

### out-of-boundary
- None.

## Ranked gaps

| Rank | Gap | Class | Prevalence | Demand | Fit | Total | Cost | Evidence |
|---|---|---|---|---|---|---|---|---|
| 1 | D3 Leftovers carried into the next meal | unmet | 1 | 3 | 3 | 7 | M | prior (`docs/competitors/demand-signals-2026-10-14.md`, 2026-10-14) |
| 2 | A3 Dietary and allergy filters | table-stakes | 3 | 2 | 2 | 7 | L | prior (`docs/competitors/family-planner.md`, 2026-10-14); prior (`docs/competitors/recipe-site-planner.md`, 2026-10-14) |
| 3 | C3 Group the list by store aisle | table-stakes | 3 | 2 | 1 | 6 | S | prior (`docs/competitors/family-planner.md`, 2026-10-14); prior (`docs/competitors/recipe-site-planner.md`, 2026-10-14) |
| 4 | E1 Works offline in the shop | differentiator | 2 | 2 | 2 | 6 | M | prior (`docs/competitors/pantry-app.md`, 2026-10-14); prior (`docs/competitors/demand-signals-2026-10-14.md`, 2026-10-14) |
| 5 | B2 Add by barcode scan | differentiator | 1 | 3 | 2 | 6 | L | prior (`docs/competitors/pantry-app.md`, 2026-10-14); prior (`docs/competitors/demand-signals-2026-10-14.md`, 2026-10-14) |
| 6 | B3 Quantities, not only presence | depth | 1 | 2 | 2 | 5 | M | prior (`docs/competitors/pantry-app.md`, 2026-10-14) |

Ties are ordered by the cost guess (S, M, L signals from the sizing table); it is not a sizing decision. Hand-off: for rank 1, `/pm:feature-discovery "Leftovers carried into the next meal" for plateful; evidence: docs/product/audits/2026-10-15-capability-gaps.md, rank 1`. The audit records no decision.

## Demand evidence (example)

| ID | Capability | Demand signal | Source | Strength |
|---|---|---|---|---|
| D3 | Leftovers carried into the next meal | Community thread asks for it; three reviews of the Family planner mention wasted cooked food | prior (`docs/competitors/demand-signals-2026-10-14.md`, 2026-10-14) | 3 |
| B2 | Add by barcode scan | Two reviews of the Pantry app praise it; one thread asks for it | prior (same file, 2026-10-14) | 3 |
| A3 | Dietary and allergy filters | Reviews of both direct competitors | prior (same file, 2026-10-14) | 2 |
| E1 | Works offline | One thread on signal loss in shops | prior (same file, 2026-10-14) | 2 |
| C3, B3 | Aisle grouping; quantities | One source each | prior (same file, 2026-10-14) | 2 |

## Deliberate no

| Gap | Out of scope line | Competitors that have it |
|---|---|---|
| C4 Send the list to grocery delivery | `docs/product.md`: "Grocery delivery or ordering." | Family planner, Recipe site |
| D4 Calorie and nutrition tracking | `docs/product.md`: "Calorie or nutrition tracking." | Family planner, Recipe site |

## Unmet hypotheses

- Hypothesis: users who cook for two want to carry cooked leftovers into the next meal; evidence: community thread and three Family planner reviews (`docs/competitors/demand-signals-2026-10-14.md`, 2026-10-14); nobody in the set does it as of 2026-10-14.

## Diff against prior audit

none (first audit).

## Method notes

- Sources: competitor help pages, store listings, pricing pages and reviews, all example data dated 2026-10-14.
- Agents: competitor-knowledge-scanner run (digest: none, no earlier folder); capability-inventory-scanner run; competitor-capability-mapper run for Family planner, Recipe site, Pantry app; gap-audit-reviewer run.
- web: run. prd: `docs/product/product-requirements.md`.
- evidence check: prior only, 9 cells re-read, 0 downgraded.
- Files written: this audit, `docs/product/capabilities.md`, `docs/competitors/family-planner.md`, `docs/competitors/recipe-site-planner.md`, `docs/competitors/pantry-app.md`, `docs/competitors/demand-signals-2026-10-14.md`.
- Copy-versus-code mismatches: none. No app code existed at this date; the inventory reads the prototype.
- Recommendation: keep the `## Out of scope` section of `docs/product.md` current; two rows depend on it.

## Not checked

The set is three competitors in this excerpt (five to eight in a full run). Pages behind login not read. `unread (pdf)` files in `docs/competitors/`: none.
