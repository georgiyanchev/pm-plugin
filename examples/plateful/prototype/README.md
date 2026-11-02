*Example output of the `pm` plugin for Plateful, a synthetic product.*

# Plateful prototype

A clickable concept prototype of Plateful, a weekly meal planner for two people who cook at home. For the owner first, to decide whether the idea holds together on a screen; then for whoever the owner shows it to. Sample data throughout; nothing here is a live service, and nothing authorizes a build, spend or contact.

Built in autonomous mode on 2026-11-02 from a chat description: no discovery run, product.md, brief or PRD existed. The build spec is `prototype-brief.md`; every choice is in `decisions.md`.

## Flow coverage

| Flow | Job | Built | Steps |
|---|---|---|---|
| FLOW-01 Plan the week in one sitting | J-01 | core, end to end | Pair up → This week → Pick a meal (Wednesday) → This week |
| FLOW-02 Shop without buying what we have | J-02 | core, end to end | This week → Shopping list |
| FLOW-03 Use what is left before it goes off | J-03 | core, end to end | This week → Meal (roast chicken) → Meal (chicken tacos) |
| FLOW-04 What can we cook now | the fridge view | core, end to end | Fridge → Meal (shakshuka) |
| FLOW-05 Cook tonight's meal | | supporting | Meal → Cook |

What works on the happy path: the pair-up form submits and carries the names; picking a meal fills the night and the docked action moves to the next empty night; the shopping list recomputes from the plan, in two shops, with the fridge items the plan uses skipped and counted; ticks persist for the session; the leftovers carry-over can be turned off, and the next meal's list then gains the cooked chicken; Cook now opens a meal and "Put it on Saturday" places it; search filters the suggestions.

Happy path only, by decision: no empty, loading, error or validation states. A later round may add them.

## Screen tiers

| Tier | Screens |
|---|---|
| core | Pair up `/start` (entry), This week `/week`, Pick a meal `/pick/:night`, Meal `/meal/:id`, Shopping list `/list`, Fridge `/fridge` |
| supporting | Cook `/cook/:id`, Add to the fridge `/fridge/add` |
| placeholder | Invite partner `/invite`, Settings `/settings`, Plateful Plus `/plus`, Help `/help` |

## Open hypotheses

Badges (the dashed `?`) sit next to the element that embodies each claim. Hover for the claim. The toolbar toggle hides them all for a stakeholder walkthrough; the choice persists in the browser.

| ID | Claim | Where |
|---|---|---|
| H-01 | Pairs will set up on one phone together rather than each installing first | Pair up, partner row |
| H-02 | Five minutes is enough when suggestions lead with leftovers and fridge contents | This week, fill action |
| H-03 | Pairs keep the fridge current enough to trust the skipped section of the list | Shopping list, skipped section |
| H-04 | Carrying leftovers into a named next meal beats a generic leftovers night | Meal, leftovers block |
| H-05 | Cook now from fridge contents gets used on unplanned nights | Fridge, cook-now section |

None of these has evidence yet. `discovery-prove-idea` is the skill that tests them.

## Decision summary

Autonomous run: every decision was taken as the recommended answer and logged `[auto]`. Any line can be overridden in a rerun. The ones that shape what you see:

- Entry screen is Pair up, designed as the first-week screen; the hero action is "Plan our first week".
- Bottom tabs, four items: Week, List, Fridge, Settings.
- Six core screens, two supporting, four placeholders; fridge and "cook now" are one screen.
- Shopping list grouped into the week's two shops, with a counted "skipped, already in the fridge" section.
- Leftovers carry into a named next meal, shown on This week and on both meal screens.
- Direction pick: 02 Market ledger, with the serif headline from 01 Sunday paper merged in. The round is in `directions/index.html`.
- Light-first, dark derived; white page with warm linen surfaces; terracotta does one job (the action), sage does one job (already have it, leftovers, status).
- System font stacks only and seven inline SVG icons: nothing loads from the network, a publishing constraint the owner stated. The skill's Google Fonts allowance was not used.
- Art-directed SVG plates with `data-art` on each, no photos.
- Pairing a second phone, the paid tier, delivery, calories and a social feed are placeholders or absent.

The full list is `decisions.md`.

## What was checked and what was not

- `check_prototype.py`: 0 findings. Every brief screen has a section, every link resolves, every placeholder carries its label, every core flow is in the tour.
- In a desktop Chromium browser, both themes, 390 and 360 wide: no horizontal overflow on any of the 14 routes; every link, button and input is at least 44 px tall and wide, except the 24 px checkboxes, which sit inside full-width labels of 48 px or more; text contrast computed from the tokens is 4.5:1 or better for every text-on-surface pair in both themes.
- Not verified: rendering on a real phone, iOS Safari and Android Chrome specifically; the system font stacks resolve differently per device, so line breaks will differ; screen-reader behaviour.

## Next step

`product-one-pager` if a sponsor must sign off; `discovery-prove-idea` to test H-01 to H-05 before any build; `project-scaffold` then `product-prd` when the owner decides to build.

## Open

Double-click `index.html`. Everything works offline: no web fonts, no network requests. The `directions/index.html` gallery opens the same way.

## Share

Zip the whole prototype folder, not `index.html` alone, and send it. The viewer sees the concept banner at the top; the Hypothesis badges toggle in the toolbar hides the dashed `?` markers for a walkthrough. The Tour button opens the five flows with a hint per step.
