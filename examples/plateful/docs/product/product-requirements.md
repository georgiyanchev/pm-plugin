*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

```yaml
title: Plateful
slug: plateful
kind: product
complexity: medium
sources:
  run: ideas/plateful-20260914 (CP3 GO recorded 2026-09-16)
  prototype: prototype/
  product_context: docs/product.md
  competitors: docs/competitors/
phase1_cap: 10
decision: approved
decision_date: 2026-10-12
created: 2026-10-05
updated: 2026-10-12
```

# Plateful: product requirements

Excerpt. Shown: sections 1 to 5, 7 to 11 and 13, the coverage check and the gate, Phase 1 only. Omitted: section 6 (use cases), the full traceability matrix, appendices. Enhancers applied: E06, E18 and E26 (consumer mobile). Section 9 specifies one core screen in full; in the real file every core screen has the same structure.

## 1. Executive summary

- **Product name:** Plateful. **Request type:** New product. **Candidate:** original, as seeded (run call: proceed). **Platform:** mobile app, iOS and Android from one Expo codebase.
- **Summary:** A weekly meal planner for two people who cook at home. The pair plans the week's dinners in five minutes, shares one shopping list, carries leftovers into the next meal and sees what they can cook from the fridge.
- **Impact (targets from `docs/product.md`):** 1,000 weekly active pairs this year; 40% of pairs still planning after 8 weeks; fewer than one item a week thrown away, as reported by the pair at week 4.
- **Discovery status:** opportunity verdict GO with conditions (decision memo, CP3 GO 2026-09-16). The run authorizes a learning prototype; production planning needs this PRD approved.

## 2. Problem statement

Pairs who cook at home decide dinner night by night, buy what looks good, and throw away what they did not use. Mira and Tom spend about ten minutes a day on "what do we eat" and lose a few items a week to the bin `[ASSUMPTION]`.

### Current alternatives

| Alternative | What the pair does | Falls short on | Evidence |
|---|---|---|---|
| Shared note or chat thread | One person types the week; the other adds groceries | Nothing links meals to the list or the fridge; goes stale by Wednesday | stated (two TestFlight testers, 2026-09) |
| Family meal-planning app | Plans for a household of four and scales servings | Recipes and portions sized for families; no leftover handling | run: example evidence E-04 |
| Recipe site with a planner | Pins recipes to days | One account; no shared list for two; no fridge | run: example evidence E-07 |
| Deciding at 18:00 | Opens the fridge and improvises | Decision fatigue; overbuying on the way home | `[UNVERIFIED]` |

## 3. Goals and non-goals

| ID | Goal | Metric | Baseline | Target | Timeframe | How measured | Priority |
|---|---|---|---|---|---|---|---|
| G-01 | Pairs plan together every week | Weekly active pairs (either partner opens the plan or the list in the week) | 0 | 1,000 | end of 2026 | `plan_opened` and `list_opened` events, weekly report | Primary |
| G-02 | Pairs keep the habit | Share of pairs still planning in week 8 | unknown (plan: first 50 pairs) | 40% | 8 weeks after each pair's first plan | cohort view | Primary |
| G-03 | Less food thrown away | Pairs reporting fewer than one item a week in the bin | unknown (plan: week-4 check on the first cohort) | 50% of answering pairs | at week 4 | two-question in-app check | Secondary |

**Non-goals:** grocery delivery, calorie tracking, a social feed, a family mode, plans for meal-prep athletes or restaurants.

## 4. Target users

Segment S-01 (cohabiting pairs who cook most nights). Flat-sharing pairs use the same flows in Phase 1 and are not a separate persona yet `[ASSUMPTION]`.

| ID | Persona | What differs here |
|---|---|---|
| P-01 | Mira (33) and Tom (36), mid-size city. Both work, shop twice a week, hate waste. | Primary and only persona. Uses the app on the sofa on Sunday, in the shop one-handed, and in front of the fridge midweek. Red lines: nagging notifications, a list that differs between phones, a paywall on the shared list. |

## 5. Jobs to be done

- **J-01** (core) When the week starts, we want to decide the dinners together in one sitting, so we stop asking "what do we eat?" every night.
- **J-02** (core) When we are in the shop, we want to see what is already at home, so we never buy it twice.
- **J-03** (related) When there is half a pot left midweek, we want to use it before it goes off, so we waste less food and money.

## 7. Functional requirements (Phase 1: five, all P0)

**FR-001 Plan the week together.** As Mira, I want Tom and me to fill the week's dinners in one sitting so that we are done in five minutes.
- Given two phones paired with an invite code, when either adds a dinner to a day, then the other sees it within 5 seconds.
- Given a week with two or more empty days, when the user taps "Suggest a week", then dinners for 2 portions fill every empty day and each can be swapped.
- Given reminders turned on in Settings, when it is Sunday 18:00 local time, then one notification "Plan next week?" is sent; no other reminder exists.
- Rules: one pair per account; up to 7 dinners a week; portions fixed at 2 in Phase 1. Offline: "You are offline. Changes will sync when you reconnect."
- Class: stated. Traceability: UC: UC-001 · Goal: G-01, G-02 · Screens: SCR-01, SCR-02, SCR-03

**FR-002 One shared shopping list.** As Tom, I want the list built from the plan so that I shop once.
- Given a planned week, when either partner opens the list, then every ingredient of every planned dinner appears once, grouped under four headings: Produce, Dairy and eggs, Pantry, Other.
- Given an item checked in the shop, then it moves to "Bought" on both phones within 5 seconds and the app offers "Add to fridge".
- Class: evidence_backed_inference. Traceability: UC: UC-002 · Goal: G-01 · Screens: SCR-04

**FR-003 Know what is in the fridge.** As Mira, I want the app to know what we have so that we never buy it twice.
- Given an ingredient in the fridge, when the list is built, then it is struck from the list with the line "In the fridge: 2 onions".
- Given an item added to the fridge, then it carries a use-by date the pair can edit; defaults are 5 days for produce and 7 days for dairy `[ASSUMPTION]`.
- Class: product_hypothesis (R-001). Traceability: UC: UC-003 · Goal: G-01, G-03 · Screens: SCR-05

**FR-004 Leftovers carried into the next meal.** As Tom, I want leftovers planned into a coming dinner so that we eat them before they go off.
- Given a dinner marked cooked, when the user enters "Portions left: 2", then the app offers the next day with a free dinner slot and a one-tap "Plan it".
- Given leftovers planned, then the list of the next meal's ingredients is reduced by the portions the leftovers cover.
- Class: product_hypothesis (R-002). Traceability: UC: UC-004 · Goal: G-03 · Screens: SCR-02, SCR-07

**FR-005 What can we cook now.** As Mira, at 18:00 with nothing planned, I want dinners that fit what we have so that we do not order in.
- Given 8 or more fridge items, when the user opens "Cook now", then at least 3 dinners needing at most 2 missing ingredients are shown, fewest missing first.
- Given fewer than 3 matches, then the screen reads "Not much to go on yet. Add what is in the fridge." with a button to open the fridge.
- Class: product_hypothesis (R-003). Traceability: UC: UC-005 · Goal: G-01, G-03 · Screens: SCR-06

## 8. Information architecture

| ID | Screen | Route | Tier | Flows |
|---|---|---|---|---|
| SCR-01 | Welcome and pairing | `/welcome` | supporting | FLOW-01 |
| SCR-02 | Week plan | `/` | core | FLOW-01, FLOW-03 |
| SCR-03 | Pick a dinner (sheet) | `/pick` | core | FLOW-01 |
| SCR-04 | Shopping list | `/list` | core | FLOW-02 |
| SCR-05 | Fridge | `/fridge` | core | FLOW-02, FLOW-04 |
| SCR-06 | Cook now | `/cook-now` | core | FLOW-04 |
| SCR-07 | Dinner cooked (sheet) | `/cooked` | core | FLOW-03 |
| SCR-08 | Settings | `/settings` | supporting | none (opened from SCR-02) |
| SCR-09 | Plateful Plus | `/plus` | placeholder | none; the paid tier is explained here later |

Navigation: bottom tabs Week, List, Fridge, Cook now. Back closes a sheet first, then returns to the Week tab; back on the Week tab leaves the app.

## 9. UI/UX requirements

Design system (prototype tokens, calm and warm, large type): background `#FAF7F2`; text `#2B2B2B`; primary action `#B5502F` (terracotta, white text, contrast 5.1 to 1); secondary surface `#DDE8DB` (sage tint); warning `#C9772B`; error `#9E2F2F`; body 17 sp, headings 24 sp semibold; spacing unit 8; corner radius 12. Palette picks confirmed by the owner are stated; the remaining values are `[ASSUMPTION]`.

### SCR-02 Week plan (core, NEW)

- **Purpose:** see and edit the week's dinners together.
- **Entry points:** app launch, Week tab, the Sunday reminder.
- **Layout, top to bottom:** header with the week range ("Mon 2 to Sun 8 Nov") and two partner initials at the right; seven day cards, 72 pt high, full width, each with the day at the left, the dinner title in bold and one grey line ("40 min, 2 portions"); below them a full-width primary button "Suggest a week", shown when two or more days are empty.
- **Components and states:**
  - Day card. Default: title and grey line. Empty: dashed outline and "Nothing planned. Tap to pick." Leftover: sage chip "Leftovers: 2 portions". Loading: grey bar for at most 3 seconds, then the error state.
  - Screen. First run: the line "Fill the week together. Tom's changes show up here." once. Offline: banner "You are offline. Changes will sync when you reconnect." Error: "Could not load the week." with the button "Try again". Notifications denied: Settings shows "Reminders are off. Turn them on in your phone's settings."
- **Key copy:** title "This week"; button "Suggest a week"; toast "Dinner added for Wednesday"; partner toast "Tom swapped Thursday to Mushroom risotto".
- **Interactions:** tap a card to open SCR-03; long-press and drag a card to another day to swap, with a light haptic on drop.
- **Platform:** same layout on both platforms; touch targets at least 44 x 44 pt (iOS) and 48 x 48 dp (Android); text scales to 200% and the grey line then wraps to two lines.
- **Accessibility:** each card reads "Wednesday, Mushroom risotto, 2 portions, double tap to change"; contrast WCAG 2.2 AA; transitions off when the phone's reduce-motion setting is on.

SCR-03 to SCR-07 follow the same structure in the full file. Supporting screens list layout, default state and the states a flow reaches. SCR-09 holds one line of copy: "Plateful Plus is coming. We will tell you before anything changes."

## 10. User flows and edge cases

- **FLOW-01 Plan the week.** SCR-01 enter the invite code ⚠️ (pairing is the first friction) → SCR-02 tap an empty day → SCR-03 pick a dinner → SCR-02 card filled, partner sees it ✨ → repeat, or "Suggest a week".
- **FLOW-02 Shop.** SCR-04 list built from the plan → check items in the shop → "Add to fridge" → SCR-05.
- **FLOW-03 Cook and carry leftovers.** SCR-02 open tonight's card → "Mark as cooked" → SCR-07 "Portions left" → "Plan it" → SCR-02 leftover chip on the chosen day ✨.
- **FLOW-04 Cook now.** Cook now tab → SCR-06 three matches → open one → "Mark as cooked".

| ID | Scenario | What the user sees and can do | FR |
|---|---|---|---|
| EC-01 | Partner has not joined | "Waiting for Tom. Plan now; he will see it when he joins." | FR-001 |
| EC-02 | Both edit the same day | Last change wins; the other phone shows a toast naming the change | FR-001 |
| EC-03 | Offline in the shop | List readable and checkable; changes sync later | FR-002 |
| EC-04 | Planned dinner cooked from Cook now | Card marked cooked; its ingredients leave the list | FR-005 |
| EC-05 | Fridge item past its use-by date | Amber badge "Past its date"; left out of Cook now | FR-003 |
| EC-06 | Leftovers entered with no free slot this week | "No free dinner this week. Add to next week?" | FR-004 |
| EC-07 | Portions left set to 0 | No leftover is created | FR-004 |
| EC-08 | A partner leaves the pair | The remaining partner keeps the plan; message "Tom left this plan." | FR-001 |

Constraints: no account wall before pairing; no delivery integration; the notification permission is asked after the first completed plan, never at launch; store privacy labels kept current; account data deletable on request.

## 11. Scope and phasing

- **Phase 1 (five FRs, cap 10):** FR-001 to FR-005, all P0.
- **Phase 2:** dietary filters, store-aisle order on the list, expiry reminders, the paid tier.
- **Phase 3:** barcode add, offline-first sync, widgets.
- **Out of scope:** grocery delivery (a separate business), calorie tracking (health claims), a social feed (moderation cost), family mode (breaks the two-person flow).
- **Rationale:** FR-001 and FR-004 carry G-02 and G-03 and the two riskiest rows (R-001, R-002). Everything else waits until week-8 retention is measured.

## 13. Assumptions and risks (top four, by likelihood x impact)

| ID | Description | Type | Likelihood | Impact | Mitigation | Validation plan |
|---|---|---|---|---|---|---|
| R-001 | Pairs will keep the fridge list current | value | high | high | "Add to fridge" prompt in the shop; accept a rough list | Prototype test, 5 pairs, 2 weeks; count fridge updates per week |
| R-002 | Pairs will plan leftovers into a meal instead of eating them ad hoc | value | medium | high | One-tap "Plan it" | Fake-door on SCR-07; proceed if 4 of 10 pairs tap it |
| R-003 | Fridge matches are good enough to cook from | feasibility | medium | medium | Cap at 2 missing ingredients | Review 20 matches with 5 pairs |
| R-004 | The Sunday reminder is read as nagging | usability | low | medium | Off until turned on; one tap to turn off | Opt-out rate below 20% |

Traceability coverage: Goals without FRs: none · Screens without flows: none (SCR-08 and SCR-09 are tiered supporting and placeholder and are reached from the Week plan).

## Gate

Candidate: Plateful, original. Complexity: medium. Phase 1: FR-001 to FR-005. Riskiest rows: R-001, R-002, R-003. Open questions that block build: none. **Owner decision: approve, 2026-10-12.** This PRD authorizes nothing by itself; the next step is `delivery-architecture`.
