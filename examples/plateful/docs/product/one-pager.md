---
title: Plateful
slug: plateful
kind: one-pager
scope: product
audience: Founder's advisory board (two advisors, one former grocery-sector operator)
sources:
  run: null
  prototype: prototype/
  brief: null
  prd: docs/product/product-requirements.md
  product_context: docs/product.md
decision: approved
decision_date: 2026-10-29
created: 2026-10-27
updated: 2026-10-29
---

*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

# Plateful: a weekly meal planner that two people who cook at home plan together in five minutes

**Decision requested:** Approve a limited public beta for 200 pairs, so that the 8-week retention goal can be measured with real users. Terms under The ask.

## Problem
Two people who cook at home most nights decide dinner late, one message at a time. They buy what is already in the fridge, and food from the last meal goes in the bin because nothing connects it to the next one. A pair that wastes one item a week loses real money and a few evenings of avoidable argument. [inference: `docs/product/target-audience.md`, two testers' shared-note workaround]

## Who it is for
Mira and Tom (`P-01`): both work, cook four or more nights a week, shop twice a week and hate waste. Flat-sharing pairs are a smaller second group (`S-02`). The buyer is the user. Size signal: about a third of households have two people, launch markets not yet counted. [hypothesis]
Not for families with kids, meal-prep athletes or restaurants. [stated]

## Why solve it
- Why now: phone-first planning with a shared list is normal for couples, and food prices make waste visible. [hypothesis]
- Why us: the founder cooks for two and ran the first tests with eleven pairs. [stated]
- Cost of doing nothing: no free reach and no proof of retention before the paid tier is designed. [inference: `docs/product.md` goals]
- Goal it moves: 1,000 weekly active pairs, 40 percent still planning after 8 weeks. [stated]

## Vision
A pair opens the app on Sunday evening, fills the week in five minutes, and does not think about dinner again until they cook it. Midweek, what is left from Tuesday is already waiting in Thursday's plan, and the list in the shop shows only what they do not have.

## Value proposition
For couples and flat-sharing pairs who cook at home, Plateful is a weekly meal planner that gets two people to one agreed plan, one list and no waste. Unlike planners built for one person or a family, it plans for two and carries leftovers into the next meal. [hypothesis]

| Alternative today | What the user does with it | Where it falls short | Tag |
|---|---|---|---|
| Shared note or chat thread | Types the week's dinners and a list | Nothing links meals to the list or to leftovers; goes stale | [stated] |
| Single-user meal planner | One person plans and shops | The partner is outside the plan; no leftovers | [inference: competitor scan, `docs/competitors/README.md`] |
| Family planner | Scales servings up or down | Built around kids and batch cooking; heavy for two | [inference: competitor scan, `docs/competitors/README.md`] |
| Deciding each evening | Looks in the fridge at 6 pm | Decision fatigue, overbuying | [stated] |

## Core capabilities
- **Plan together:** a pair can fill the week's dinners in one sitting, both on their own phones, so that nobody asks "what do we eat?" nightly. [hypothesis]
- **One list:** either partner can add and tick off items on one shared list in the shop so that nothing is bought twice. [stated]
- **Leftovers carried over:** a cook can mark a meal as having leftovers and see them offered in the next day's plan so that they are eaten. [hypothesis]
- **What can we cook now:** a pair can tell the app what is in the fridge and see meals they can make from it so that food is used before it goes off. [hypothesis]
- **Send a meal to a friend:** either partner can send one planned meal to a friend as a readable page so that the friend gets the recipe without retyping. [stated]

## Not in the first version
- Grocery delivery: it adds partners and cost the part-time founder cannot carry.
- Calorie tracking: a different audience and health claims we do not want to make.
- A social feed: it adds moderation and pulls the product away from two people at a table.
- Plans for families: it breaks the two-person flow.

## Success looks like
| Outcome | Measure | Target | By when | Tag |
|---|---|---|---|---|
| Pairs keep planning | Pairs still planning | 40 percent | 8 weeks after first use | [stated] |
| The product reaches pairs, not single users | Pairs with both partners active in a week | 60 percent of active pairs | 6 weeks after first use | [ASSUMPTION] |
| Less food is wasted | Pairs reporting fewer than one item a week in the bin | unknown (plan: two-question in-app check at week 4) | 4 weeks after first use | [hypothesis] |

## Riskiest assumptions
| Assumption | If wrong | Cheapest way to learn | Tag |
|---|---|---|---|
| Both partners keep using it, not just one | It becomes a single-user planner and loses its edge | Watch how many beta pairs have both partners active in week 3 | [hypothesis] |
| Leftovers and the fridge view change what pairs cook | The core difference is not noticed and the product is one more planner | Ask ten beta pairs to cook one week from the fridge view and compare with their usual week | [hypothesis] |
| Pairs will pay a small yearly fee later | The paid tier does not fund the work | Show a price on a beta screen and count taps, without charging | [ASSUMPTION] |

## Cost and timeline class
- Size: M, one founder at about 10 hours a week. [stated]
- Running cost class: low, free tiers of backend services until 1,000 pairs. [stated]
- Time to the first user in hands: now, the app is already in a closed test with eleven pairs. [fact: TestFlight sessions, `docs/product/target-audience.md`]

## The ask
- Decision: approve a limited public beta for 200 pairs so that 8-week retention can be measured.
- Yes commits: the founder's part-time hours, the free service tiers, and a small invitation post in two communities for pairs who cook.
- Yes does not commit: any paid marketing, hiring, or work on the paid tier until the 8-week number is in.

## Sources
- Product context: `docs/product.md`
- Audience: `docs/product/target-audience.md`
- Prototype: `prototype/`
- Competitor scan: `docs/competitors/README.md`

## Decision log
- 2026-10-27 - drafted - founder - first version for the advisory board
- 2026-10-29 - approved - founder, reporting the board's answer - "go ahead with 200 pairs, report the week-3 number"
