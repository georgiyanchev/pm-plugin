*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

```yaml
title: Leftovers view
slug: leftovers-view
status: approved
decision: go
decision_date: 2026-10-30
size: M
created: 2026-10-28
updated: 2026-10-30
```

# Leftovers view

## Problem

Two people cook dinner for two, and half a pot is often left. By Thursday nobody remembers it, nothing in the plan mentions it, and it goes in the bin. The pair loses a meal's worth of food and money each time, and plans a new dinner they did not need. The app knows what was cooked and when, but today shows the leftovers only as a prompt right after cooking, then forgets them.

## Who and evidence

`P-01` Mira and Tom, caught on a Wednesday night looking at a half-full container of chili and a plan that says "Pasta" for tomorrow. Job: `J-03`, with `J-01` affected (the plan should absorb the leftover).

- Capability gap audit, 2026-10-15: carrying leftovers into the next meal is ranked 1; no competitor in the set offers it; demand strength 3 of 3 (example data). Source: `docs/product/audits/2026-10-15-capability-gaps.md`.
- Two TestFlight testers named leftovers as the main thing they would pay attention to (stated, 2026-09). Source: `docs/research/testflight-2026-09.md`.
- No usage data yet: the leftovers prompt is not in a released build. Finding: the baselines below are `unknown`.

## Goals and metrics

| Goal | Metric | Baseline | Target | Timeframe | How measured |
|---|---|---|---|---|---|
| Leftovers get eaten | Share of logged leftover portions planned into a meal within 3 days of cooking | unknown (plan: events from the first 50 pairs, week 1 to 4) | 50% | first 60 days after launch | `leftover_planned` over `leftover_logged` |
| Leftovers show up in plans | Share of pairs' weekly plans with at least one carried-over leftover | unknown (same plan) | 30% of plans | first 60 days after launch | `plan_saved` where `has_leftover` is true |
| Less thrown away | Share of logged leftover portions discarded unused | unknown (same plan) | below 20% | first 60 days after launch | `leftover_discarded` over `leftover_logged` |

"Pair" and "weekly active" follow `docs/product.md`: a pair is active in a week when either partner opens the plan or the list.

## Solution outline

A Leftovers view on the Fridge tab, opened from a chip at the top ("Leftovers: 3"). It lists each leftover with what it is, portions left, the cook date and a use-by date, soonest first. Three actions per row: "Plan it" (puts it into the next free dinner and shortens that dinner's shopping), "Eat tonight" and "Throw away". The Week plan marks the planned day with a leftover chip. Left out of the first version: automatic planning, freezing, photos, reminders.

## Non-goals

- No automatic planning of leftovers; the pair decides. (Auto-planning removes the choice they asked for.)
- No push reminders about use-by dates. (Nagging is a recorded red line for P-01.)
- No nutrition or portion-size advice. (Calorie tracking is out of scope.)
- No sharing leftovers with friends. (Not a goal of this view.)

## Product check

| Lens | Verdict | Why | Evidence |
|---|---|---|---|
| Value | adequate | Demand is ranked 1 in the audit and testers raised it unprompted; no usage data on whether pairs will log portions after cooking | repo: `docs/product/audits/2026-10-15-capability-gaps.md`; stated |
| Usability | adequate | Reached in one tap from the Fridge tab and the Week plan; the open risk is the extra step of entering portions after cooking, closed by a default of "2" and a skip | repo: `docs/product/product-requirements.md` (SCR-07); assumed |
| Viability | strong | Fits G-03 and J-03, adds no cost or service, stays inside the out-of-scope list | repo: `docs/product.md`; memory: free tiers only until 1,000 pairs |
| Feasibility | strong | `fridge_item.from_leftover` and `plan_day.cooked_at` already exist; one status field and one screen to add | repo: `docs/development/2026-10-20-plateful-architecture.md` (data model) |

Call: proceed. No lens is weak. The usability risk goes into the PRD as acceptance criteria (default value, skip), and the value risk is tested after the first build, not before.

## Riskiest assumptions

| Assumption | Class | Evidence | Test | Success criterion | Effort |
|---|---|---|---|---|---|
| Pairs will enter portions left after cooking, unprompted | value | untested | Count portions entries in the beta build, no new UI | we proceed to the view's polish if at least 40% of cooked dinners with food left get a portions entry | 2 days |
| Pairs will plan a leftover rather than eat it ad hoc | value | weak | Prototype test with 5 pairs over 1 week | we keep "Plan it" as the main action if at least 3 of 5 use it twice | 4 days |
| A use-by date for a leftover is accurate enough to trust | usability | untested | Review 20 entries with 5 pairs | we keep the date if at most 3 of 20 are changed by the pair | 1 day |

## Alternatives considered

| Option | What the user does | What changes | Cost class | Why not chosen |
|---|---|---|---|---|
| Chip only | Sees "Leftovers" chip on the plan card; no list | Nothing new to build beyond the prompt | S | Cannot show use-by order or act on a leftover; the pair still forgets |
| Section on the Fridge screen | Scrolls the fridge list to find leftovers | Section added above the fridge items | S | The Fridge screen already carries add, edit and use-by; three actions per leftover crowd it |
| **Leftovers view (chosen)** | Taps the chip, sees leftovers soonest first, plans one | One screen, one status field | M | Chosen: room for three actions and a use-by order |
| Auto-plan the leftover into the next dinner | Confirms or rejects a ready-made plan | Planner changes dinners without being asked | M | Takes the choice from the pair; adds a rule that will be wrong for dinners already liked |
| Evening text message (concierge) | Gets a message at 17:00 listing what is left | A scheduled message; no screen | S | Nagging risk, and the pair cannot act from the message |

## Size

M. New screen: the Leftovers view (SCR-10). Data-model change: a leftover status (`planned`, `eaten`, `discarded`) on the existing fridge item. No new service; existing sync suffices. Not S because two surfaces change (Fridge tab, Week plan); not L because no new subsystem or integration.

## Recommendation

Proceed. The call is proceed, the largest risk is behavioural (whether pairs log portions), and the cheapest test needs the beta build the pair will use anyway. The three tests above run in the first weeks of the beta and can reshape the view without redoing the build.

## Decision log

- 2026-10-28 - Brief started from audit rank 1 - owner - leftovers are the product's stated difference
- 2026-10-30 - go, size M - owner - the product check has no weak lens; tests run in the beta
