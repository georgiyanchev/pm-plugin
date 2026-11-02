*Example output of the `pm` plugin for Plateful, a synthetic product.*

---
title: Plateful
slug: plateful
source: chat
source_call: n/a
product_choice: n/a
mode: autonomous
platform: mobile
created: 2026-11-02
updated: 2026-11-02
---

# Plateful — prototype brief

## Product
A weekly meal planner for two people who cook at home: plan the week's dinners together in five minutes, shop from one shared list, carry leftovers into the next meal, and see what can be cooked now from what is in the fridge. Free; a paid tier comes later and shows only as a placeholder page. `[stated]`

## Persona and moment
**P-01 Mira and Tom.** A couple in their thirties, both working, cooking four or more nights a week, shopping twice a week, and tired of throwing food away. Comfortable with phones, no interest in a cooking hobby app. `[stated]`

The moment: Sunday evening on the sofa, one phone between them, ten minutes before something else starts. They want the week decided, the first shop listed, and nothing wasted from last week. Mid-week the moment is 6 pm in the kitchen, one hand free, asking "what can we cook now". `[assumed]`

Secondary audience: flat-sharing pairs who split cooking; the same screens serve them. `[stated]`

## Jobs and flows
| ID | Job, in the user's words | Steps (screens in order) | Tier |
|---|---|---|---|
| FLOW-01 | J-01 Decide the week's dinners in one sitting | SCR-01 → SCR-02 → SCR-03 → SCR-02 | core |
| FLOW-02 | J-02 Never buy what is already in the fridge | SCR-02 → SCR-05 | core |
| FLOW-03 | J-03 Use what is left before it goes off | SCR-02 → SCR-04 → SCR-04 (next meal) | core |
| FLOW-04 | What can we cook now, from what is in | SCR-06 → SCR-04 | core |
| FLOW-05 | Cook tonight's meal | SCR-04 → SCR-07 | supporting |

`[stated]` for the jobs; the step order is `[assumed]`.

## Hero action
"Plan our first week" on the pair-up screen, landing on This week with four nights already suggested and one empty night to fill. `[assumed]`

## Screens
| ID | Screen | Route | Tier | Flows | Primary action | Notes |
|---|---|---|---|---|---|---|
| SCR-01 | Pair up | /start | core | FLOW-01 | Plan our first week | entry screen; two names, nights per week `[assumed]` |
| SCR-02 | This week | /week | core | FLOW-01, FLOW-02, FLOW-03 | Fill Wednesday | seven nights, leftover arrows, one empty night `[assumed]` |
| SCR-03 | Pick a meal | /pick/:night | core | FLOW-01 | Tap a meal | suggestions ordered by what is in the fridge; search filters the list `[assumed]` |
| SCR-04 | Meal | /meal/:id | core | FLOW-03, FLOW-04, FLOW-05 | Carry leftovers to the next meal | ingredients split into in the fridge / on the list `[assumed]` |
| SCR-05 | Shopping list | /list | core | FLOW-02 | Tick items | grouped by the two shops of the week; items already in the fridge are skipped and counted `[assumed]` |
| SCR-06 | Fridge | /fridge | core | FLOW-04 | Cook now | what is in, soonest to go off first; meals makeable now `[assumed]` |
| SCR-07 | Cook | /cook/:id | supporting | FLOW-05 | Back to the meal | numbered steps, default state `[assumed]` |
| SCR-08 | Add to the fridge | /fridge/add | supporting | | Add it | one form, default state `[assumed]` |
| SCR-09 | Invite partner | /invite | placeholder | | | second-device pairing deferred `[assumed]` |
| SCR-10 | Settings | /settings | placeholder | | | |
| SCR-11 | Plateful Plus | /plus | placeholder | | | paid tier, later `[stated]` |
| SCR-12 | Help | /help | placeholder | | | |

## Hypotheses on screen
| ID | Claim | Class | Shows on |
|---|---|---|---|
| H-01 | Pairs will set up on one phone together rather than each installing first | hypothesis | SCR-01 pair-up form |
| H-02 | Five minutes is enough when suggestions lead with leftovers and fridge contents | hypothesis | SCR-02 fill action |
| H-03 | Pairs keep the fridge current enough to trust "skipped, already in" on the list | hypothesis | SCR-05 skipped section |
| H-04 | Carrying leftovers into a named next meal beats a generic leftovers night | hypothesis | SCR-04 leftovers block |
| H-05 | "Cook now" from fridge contents gets used on unplanned nights | hypothesis | SCR-06 cook-now section |

All five are `[hypothesis]`: the owner's description names them as the core, nothing has been tested.

## Deferred and out of bounds
- Grocery delivery, calorie tracking, social feed: not shown anywhere. `[stated]`
- Paid tier: placeholder page only, no feature list. `[stated]`
- Pairing a second phone by invite link: placeholder (SCR-09). `[assumed]`
- Recipe import, ratings, cooking history, photos of real dishes: not shown. `[assumed]`
- Empty, loading, error and validation states: out of scope by decision; happy path only.

## Brand and taste
- Personality in three words: calm, warm, practical `[stated]`
- Voice, one sample line: "Monday's chicken is Tuesday's tacos." `[assumed]`
- Named characters or assistants, with tone: none `[assumed]`
- Existing brand assets or design system: none, open brief `[stated]`
- Apps or brands whose feel the owner likes, and what exactly about each: none named; the taste block asks for large type and one-handed use, read as few elements per screen and the primary action within thumb reach `[stated]`
- Dislikes, and what each means: none named; read from the taste block as no dense dashboards, no gamification, no third accent `[assumed]`
- Colours or moods to avoid: cold blues, neon, anything that reads as a diet app `[assumed]`
- Colours or moods to prioritise: terracotta for actions, sage for "already have it" and leftovers, warm neutrals `[stated]`
- Theme stance: light-first; dark derived `[assumed]`
- Imagery: plates of the week's meals, art-directed plates (simple SVG, real food colours) `[assumed]`
- Fonts: system font stacks only; no web fonts load, a publishing constraint the owner stated `[stated]`

## Roles
One role: either person of the pair, on either phone. No admin, no provider. The partner's phone is not shown; SCR-09 marks where the invite would go. `[assumed]`

## Sample data
- The pair: Mira and Tom. Week of Monday 2 to Sunday 8 November 2026. They cook five nights; Friday is out; Wednesday and Saturday start empty. `[assumed]`
- Planned nights: Monday roast chicken, potatoes and kale (1 h 10); Tuesday chicken tacos with pickled onion (25 min, uses half of Monday's chicken); Thursday mushroom risotto (40 min); Sunday red lentil soup with flatbread (35 min, two bowls carry to Monday lunch).
- Suggestions for an empty night (eight): chickpea and spinach curry · pasta with roasted peppers and feta · shakshuka · egg fried rice · halloumi and vegetable traybake · salmon noodles · tomato and white bean stew · baked potatoes with cheddar and leeks.
- Fridge (ten items, days left): half a tin of coconut milk 2 · a bag of kale 2 · two red peppers 3 · spring onions 3 · half a block of feta 4 · soured cream 5 · a lemon 7 · three eggs 9 · potatoes, 1 kg 10 · a red onion 12.
- Cupboard staples assumed in and never listed: pasta, rice, tinned tomatoes, olive oil, garlic, spices.
- Shopping list once Wednesday is filled with the curry: Shop 1 (Monday): whole chicken, tortillas × 8, two limes, coriander, spinach, one tin of chickpeas. Shop 2 (Thursday): chestnut mushrooms 300 g, parmesan, arborio rice, parsley, red lentils 250 g, flatbreads × 4. Skipped because already in: potatoes, kale, lemon, red onion, soured cream, coconut milk (six). Before Wednesday is filled: ten to buy, five skipped.
- Cook now from the fridge: shakshuka (everything in), pasta with roasted peppers and feta (everything in), egg fried rice (everything in), halloumi traybake (missing halloumi).
- Add to the fridge, default state: "Half a jar of pesto", 5 days.

## Sources
- Chat: the owner's description of Plateful (problem, core, audience P-01, jobs J-01 to J-03, out of scope, design taste, platform, business model, publishing constraints). No run, product.md, brief or PRD exists.
