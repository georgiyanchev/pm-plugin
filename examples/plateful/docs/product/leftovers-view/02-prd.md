*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

```yaml
title: Leftovers view
slug: leftovers-view
tier: lite
decision: approved
decision_date: 2026-11-02
created: 2026-10-31
updated: 2026-11-02
```

# Leftovers view: requirements (PRD-lite, size M)

Brief: `01-brief.md` (Gate 1 approved 2026-10-30). Enhancers applied: E02 (feature on an existing product). Feature-level IDs restart at 001; the product PRD's IDs are written as "product FR-004" and "product SCR-02". Sections 4, 5, 6, 8, 12 and 14 are dropped in the lite tier; the persona is `P-01` and the job `J-03` (with `J-01`), both defined in `docs/product/target-audience.md`.

## 1. Executive summary

- **Feature name:** Leftovers view. **Request type:** New feature on existing product.
- **Summary:** A screen that lists what is left from cooked dinners, soonest use-by first, so a pair can plan it into a coming dinner, eat it tonight or throw it away.
- **Impact (targets, 60 days after launch):**
  - 50% of logged leftover portions planned into a meal within 3 days of cooking.
  - 30% of weekly plans carry at least one leftover.
  - Fewer than 20% of logged portions discarded unused.

## 2. Problem statement

Mira and Tom cook for two and often have half a pot left. Today they note it in a chat, or not at all, and by the third day it is thrown away while the plan asks them to cook a new dinner. Cost: roughly one meal's food and a night's cooking each time `[ASSUMPTION]`. Baseline rates are unknown; the first 50 pairs of the beta set them (brief, goals).

### Current State

What exists, from the repo and the clickable prototype:

- Data: `fridge_item.from_leftover` and `plan_day.cooked_at` exist (`db/migrations/001_init.sql`). There is no leftover status and no use-by default for cooked food.
- Sync: plan, list and fridge sync between the two phones (`src/sync/`, test `e2e/sync.spec.ts`); the leftover will use the same path.
- Screens (prototype, `prototype/index.html`): product SCR-07 "Dinner cooked" asks "Portions left" and offers "Plan it", which sets the leftover chip on product SCR-02. Product SCR-05 Fridge lists items with use-by dates and has no leftover section.
- Known complaint: two testers said they forgot leftovers by the next day (`docs/research/testflight-2026-09.md`).

## 3. Goals and success metrics

| Goal ID | Goal | Metric | Baseline | Target | Timeframe | How measured | Priority |
|---|---|---|---|---|---|---|---|
| G-01 | Leftovers get eaten | Logged portions planned within 3 days | unknown (plan: first 50 pairs, weeks 1 to 4) | 50% | 60 days after launch | `leftover_planned` / `leftover_logged` | Primary |
| G-02 | Leftovers show up in plans | Weekly plans with at least one leftover | unknown (same plan) | 30% | 60 days after launch | `plan_saved.has_leftover` | Primary |
| G-03 | Less thrown away | Logged portions discarded unused | unknown (same plan) | below 20% | 60 days after launch | `leftover_discarded` / `leftover_logged` | Secondary |

**Non-goals:** automatic planning; push reminders about use-by dates; nutrition or portion advice; sharing leftovers with friends.

## 7. Functional requirements (Phase 1: five, all P0)

**FR-001 Log what is left after cooking.** As Tom, I want to say how many portions are left so that the app can remember them.
- Given a dinner marked cooked, when the "Dinner cooked" sheet opens, then "Portions left" shows 2 as the default with a stepper from 0 to 6.
- Given 0 portions, then no leftover is created and the sheet closes.
- Given 1 to 6 portions, then a leftover is saved with a use-by date 3 days after the cook date `[ASSUMPTION]`, editable on the leftover row.
- Errors: no connection saves the entry on the phone and shows "Saved on this phone. Will sync soon."
- Traceability: UC: UC-401 · Goal: G-01, G-03 · Screens: SCR-07

**FR-002 See leftovers in one place.** As Mira, I want a list of what is left so that I remember it.
- Given at least one leftover, when the user opens the Fridge tab, then a chip "Leftovers: 3" shows above the item list and opens the Leftovers view.
- Given the view open, then each leftover shows its name, portions, cook date and use-by date, ordered by use-by date, soonest first.
- Given no leftovers, then the view reads "Nothing left over. Nice." with the line "When you cook, we'll ask what's left."
- Traceability: UC: UC-401 · Goal: G-01, G-03 · Screens: SCR-05, SCR-10

**FR-003 Plan a leftover.** As Mira, I want to put a leftover into a coming dinner so that we eat it.
- Given a leftover row, when the user taps "Plan it", then it is placed in the next day with an empty dinner slot and a toast reads "Chili planned for Thursday".
- Given no empty slot this week, then a sheet lists the seven days and the user picks one to replace.
- Given a leftover planned, then the Week plan card for that day shows the sage chip "Leftovers: 2 portions" and the shopping list drops the ingredients the leftover covers.
- Traceability: UC: UC-402 · Goal: G-01, G-02 · Screens: SCR-02, SCR-10

**FR-004 Eat tonight or throw away.** As Tom, I want to close a leftover so that the list stays true.
- Given a leftover row, when the user taps "Eat tonight", then its status becomes eaten and a toast reads "Enjoy. Marked as eaten." with "Undo" for 5 seconds.
- Given "Throw away", then a confirmation "Throw away 2 portions of chili?" with "Throw away" and "Keep" appears; confirming sets the status discarded.
- Given a leftover past its use-by date, then its row shows an amber badge "Past its date" and the question "Still good?" with "Keep" and "Throw away".
- Traceability: UC: UC-403 · Goal: G-03 · Screens: SCR-10

**FR-005 Measure the goals.** As the founder, I want the three events recorded so that I can read the goals.
- Given each action in FR-001 to FR-004, then one event is sent: `leftover_logged` (portions, hours since cooking), `leftover_planned` (days until planned), `leftover_discarded` (days after use-by), plus `has_leftover` on `plan_saved`.
- Events carry no meal names and no partner identity; the pair is identified by an anonymous pair ID only.
- Traceability: UC: UC-404 · Goal: G-01, G-02, G-03 · Screens: none

## 9. UI/UX requirements

Screens: **SCR-10 Leftovers view** (NEW); **product SCR-05 Fridge** (CHANGED: chip added); **product SCR-02 Week plan** (CHANGED: leftover chip, already specified there); **product SCR-07 Dinner cooked** (CHANGED: default and range for portions). UNCHANGED: Shopping list (its rows follow the existing rule, only the ingredient count changes), Cook now, Settings, Plateful Plus.

Design system: Plateful tokens in `src/design/` (terracotta `#B5502F` for primary actions, sage tint `#DDE8DB` for leftover chips, warning `#C9772B`).

### SCR-10 Leftovers view (NEW)

- **Purpose:** decide what to do with each leftover.
- **Entry points:** the chip on the Fridge tab; the leftover chip on a Week plan card (opens the view at that row).
- **Layout, top to bottom:** header "Leftovers" with a back arrow; a one-line summary "3 leftovers, 5 portions"; a vertical list of cards, each 96 pt high. Each card: the name in bold, a grey line "2 portions, cooked Mon", the use-by date at the right ("Use by Thu"), and below them two buttons side by side, "Plan it" (primary) and "Eat tonight" (secondary), with a text link "Throw away" at the end of the card.
- **States:**
  - Default: cards as above. Loading: three grey skeleton cards. Empty: "Nothing left over. Nice." Error: "Could not load leftovers." and "Try again". Offline: the list from the phone, with the banner "You are offline. Changes will sync when you reconnect."
  - Card, planned: the buttons are replaced by the line "Planned for Thursday" and a link "Change". Card, past date: amber badge "Past its date" and "Still good?" with "Keep" and "Throw away".
- **Key copy:** "Plan it"; "Eat tonight"; "Throw away"; "Chili planned for Thursday"; "Enjoy. Marked as eaten."; "Throw away 2 portions of chili?"; "No free dinner this week. Pick a day to replace." 
- **Interactions:** swipe a card left to reveal "Throw away"; light haptic on "Plan it"; the undo toast lasts 5 seconds.
- **Platform:** same on iOS and Android; targets at least 44 x 44 pt and 48 x 48 dp; text scales to 200% and the two buttons then stack.
- **Accessibility:** each card reads "Chili, 2 portions, cooked Monday, use by Thursday"; buttons are labelled with the leftover's name ("Plan chili"); amber badge also carries the text, not colour alone; contrast WCAG 2.2 AA; no motion with reduce-motion on.
- **Fridge tab (CHANGED), before and after:** before, no leftover entry point; after, a sage chip "Leftovers: 3" above the item list, hidden at 0.

## 10. User flows and edge cases

- **FLOW-01 Cook and log.** [Week plan] open tonight's card → "Mark as cooked" → [Dinner cooked] "Portions left: 2" → "Save" → toast "Saved. 2 portions of chili left." ✨
- **FLOW-02 Plan it.** [Fridge] tap "Leftovers: 3" → [Leftovers view] "Plan it" on chili → toast "Chili planned for Thursday" → [Week plan] chip on Thursday ✨. ⚠️ If no empty slot: the day picker adds one step.
- **FLOW-03 Close it.** [Leftovers view] "Throw away" → confirm → card leaves the list; goal G-03 counts it.

| ID | Scenario | What the user sees and can do | FR |
|---|---|---|---|
| EC-01 | Portions set to 0 | Sheet closes; no leftover | FR-001 |
| EC-02 | Both partners log the same dinner | The second entry shows "Tom already logged 2 portions. Add more?" | FR-001 |
| EC-03 | Planned day later cleared by the partner | The leftover returns to the list with "Planned day was cleared" | FR-003 |
| EC-04 | No empty dinner this week | Day picker "Pick a day to replace"; replaced dinner is kept as a fridge note | FR-003 |
| EC-05 | Use-by date passes while planned | Card shows the amber badge on the plan day too; the pair decides | FR-004 |
| EC-06 | Offline in the kitchen | Logging and closing work on the phone and sync later | FR-001, FR-004 |

Constraints: no push notifications for this feature (brief non-goal); free tier only, no new service; anonymous event data only.

## 11. Scope and phasing

- **Phase 1:** FR-001 to FR-005. **Phase 2:** use-by suggestions by food type, freezing, leftover photos. **Out of scope:** auto-planning, reminders, sharing, nutrition.
- **Rationale:** G-01 and G-02 need FR-001 to FR-003; G-03 needs FR-004; FR-005 makes all three readable. Riskiest rows: R-001 and R-002.
- **Open questions:** Q-01 is 3 days the right default use-by? Default assumed: 3 days; reviewed with the first 50 pairs. Q-02 does a partner's edit need a notice? Default assumed: no notice, shown on next open.

## 13. Assumptions and risks (top five, by likelihood x impact)

| ID | Description | Type | Likelihood | Impact | Mitigation | Validation plan |
|---|---|---|---|---|---|---|
| R-001 | Pairs skip the portions step after cooking | value | high | high | Default of 2; one tap to save | Portions entries per cooked dinner; proceed if 40% |
| R-002 | Pairs eat leftovers ad hoc and never tap "Plan it" | value | medium | high | "Plan it" is the primary button | 3 of 5 pairs use it twice in one week |
| R-003 | Existing flows regress (Fridge tab, Week plan chip) | regression | medium | medium | Changed screens keep their current tests | Run the existing tests in CI |
| R-004 | The 3-day default use-by is wrong for some foods | usability | medium | medium | Editable on the row | 3 or fewer of 20 changed |
| R-005 | Beta pairs do not notice the new chip | habit | low | medium | First-use line on the chip, shown once: "Leftovers live here." | Share of pairs who open the view in week 1 |

Goals without FRs: none · Screens without flows: none
