*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

# Plateful target audience

Status: decided 2026-09-12. Figures marked "estimate" are inferences, not measurements. The voice that speaks to this audience is in `voice.md`.

This file is the only place segments, personas and jobs are defined. Every other document (brief, PRD, prototype brief, one-pager, marketing plan) cites them by ID and adds only what is specific to itself. IDs are minted here and never reused: `S-xx` segments, `P-xx` personas, `J-xx` jobs. Section A is what agents read on every feature; section B is the evidence the IDs rest on. A is derived from B and never contradicts it. Lines the owner did not state are marked `[assumption]`.

## A. Summary

### Recommendation in one sentence

Plateful is for couples and flat-sharing pairs, 25 to 45, who cook at home most nights and today plan dinner from a chat thread, a shared note, or nothing at all.

### Primary segment

`S-01` Two adults who share a kitchen and a food budget, in a city flat or small house, both working. They cook four or more nights a week, shop twice a week, and decide dinner late in the day. They trust each other's taste more than any recipe site, and they delete apps that nag.

### Jobs to be done

| ID | When (situation) | I want to (action) | So I can (outcome) | Kind | Where the product answers it |
|---|---|---|---|---|---|
| J-01 | Sunday evening, before the week starts | decide the week's dinners together in one sitting | stop asking "what do we eat?" every night | core | Weekly plan, five-minute flow |
| J-02 | In the shop, or about to order a top-up | see what is already at home | never buy what is already in the fridge | core | Shared shopping list, fridge view |
| J-03 | Midweek, with half a pot of something left | use what is left before it goes off | waste less food and money | related | Leftovers carried into the next meal |

### Not the target

- Families with kids: they plan around picky eaters and school schedules, and bending the app that way would break the two-person flow.
- Meal-prep athletes: they plan macros and batch cooking, which means calorie tracking, which is out of scope.
- Restaurants: different workflow, different buyer.

### Personas

| ID | Name, age, place | Segment | What they want from the product, in their words |
|---|---|---|---|
| P-01 | Mira (33) and Tom (36), mid-size city | S-01 | "Just tell us what we are eating this week, and don't let us buy the same cream twice." |

## B. Insights

### Why this audience

- Where they are: two-person households are about a third of households in most large European and North American markets [estimate; national statistics not yet pulled for the launch markets].
- Who serves them today: planners built for one person or for a family, with servings scaled up or down; none carries leftovers into the next meal. Two testers named a shared note as their current tool [stated, TestFlight sessions, 2026-09].
- What they ask: "meal planner for two", "what to cook with what is in the fridge", "stop wasting food" [assumption; keyword check not yet run].
- Why they are worth serving: they already spend on groceries twice a week and will pay a small yearly fee for a tool that saves visible money [assumption].

### Secondary segments

`S-02` Flat-sharing pairs who are not a couple. Same as S-01 in the shared list and the weekly decision; differs in that they split costs per item and may cook separately two nights. Served by a "cooking alone tonight" toggle, not a separate product.

### Persona cards

#### P-01 - Mira and Tom, 33 and 36, mid-size city (primary)

- **Life stage:** both employed full time, no children, renting, a small kitchen.
- **What they want from the product:** one plan they both trust, a list that is always current, and no waste.
- **What they skip:** recipe discovery, long onboarding, anything that needs a photo of every meal.
- **Words they use:** "what's for dinner", "we still have", "leftovers", "the list".
- **Words they never use:** "macros", "meal prep", "optimise", "streak".
- **Where and when they use it:** Sunday evening on the sofa, in the shop with one hand on a trolley, midweek in front of the fridge.
- **Red lines:** nagging notifications, a list that differs between phones, a paywall on the shared list.

### How to tell whether the product reaches this audience

| Signal | Source | Target after 6 months |
|---|---|---|
| Pairs with both partners active in the same week | Analytics, weekly report | 60 percent of active pairs |
| Pairs still planning after 8 weeks | Analytics, cohort view | 40 percent |
| Plans containing a carried-over leftover | Analytics, plan events | 30 percent of plans |

If the users turn out to be someone else, revisit this document before changing the voice or the product.

### Updates

- 2026-09-12 - S-01, P-01, J-01 to J-03 added - owner interview - stated
- 2026-10-20 - S-02 added (flat-sharing pairs) - owner decision after two TestFlight sessions - stated

### Sources

- TestFlight session notes, 2026-09: `docs/research/testflight-2026-09.md`
- Competitor scan: `docs/competitors/README.md`
