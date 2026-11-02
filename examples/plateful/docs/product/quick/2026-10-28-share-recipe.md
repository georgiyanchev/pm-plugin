---
title: Share a planned meal with a friend
slug: share-recipe
track: quick
status: shipped
size: S
created: 2026-10-28
updated: 2026-10-30
---

*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

# Quick feature: Share a planned meal with a friend

Product: Plateful - context docs/product.md
Platform: all

## Problem
Pairs cook meals they are proud of or want a friend to try, and there is no way to send one. Friends ask "what was that?" in a chat and the pair retypes the recipe from memory. Plateful loses free word-of-mouth, which matters because the goal this year is 1,000 weekly active pairs and there is no marketing budget.

## Evidence
Two TestFlight testers asked how to send a meal to a friend. [stated]

## User story
As Mira or Tom (`P-01`), I can send a planned meal to a friend from the plan, so that they get the recipe without me retyping it.

## Requirements
1. [must] A share action on every planned meal's detail screen.
2. [must] It opens the phone's native share sheet with a short message and a link; the message reads "Dinner idea from Plateful: <meal name>".
3. [must] The link opens a read-only web page with the meal name, ingredients and steps, and a store link. [inferred]
4. [should] A "copy link" option for apps the share sheet does not list.
5. [nice] The friend's page shows a "plan your week with Plateful" line. [assumed]

## Constraints and non-goals
- Free tier only; no new paid service.
- Out of scope: a feed, public profiles, comments, or following anyone (`docs/product.md`).
- No share analytics in this iteration.

## Done when
Tapping share on a planned meal opens the share sheet, and a friend without the app can open the link and read the recipe on a phone.

## Open questions / known unknowns
- Where the read-only page is hosted. [assumed: static hosting on the free tier]
- Whether to hide the pair's other meals from the page. [assumed: yes, one meal only]

## Assessment

### Product check
| Lens | Verdict | Why | Evidence |
|---|---|---|---|
| Value | adequate | Two testers asked for it and it gives free reach toward 1,000 weekly pairs; no signal yet on how often people would share | stated, repo: docs/product.md |
| Usability | adequate | One tap from the meal screen to the share sheet; the friend lands on a readable page without installing; the screen needs a clear label and a 48 px touch target to work one-handed | repo: docs/design/DESIGN.md |
| Viability | adequate | Fits "free to run" and is not a feed; the page must not expose the pair's account or other meals | repo: docs/product.md, memory: no social feed, owner decision 2026-09 |
| Feasibility | strong | The native share sheet is built into Expo; the page is one static file generated from the meal | repo: src/screens/MealDetail.tsx |

Call: proceed - no lens is weak; the one open risk, privacy of the shared page, is closed by a requirement below.

### Size
S - one screen touched plus one static page; no data-model change; no new service; about a day of agent work.

### Gaps
1. The shared page could expose more than the one meal. Closed by revised requirement 3.
2. No fallback when a friend opens the link on a laptop. The page must work at any width.
3. Requirement 5 reads as advertising inside someone else's recipe; keep it as a single quiet line.

### Ideas
- Share the shopping list instead of a meal: reject, it is a different job and needs accounts for the friend.
- Pre-fill the message with the pair's own note: optional, one text field, defer.
- Add an image card for chat apps: reject for now, needs image generation and adds upkeep.

### Revised requirements
1. [must] A "Share" button on the meal detail screen. Criterion: visible without scrolling, labelled, touch target at least 48 px.
2. [must] Tapping it opens the native share sheet with "Dinner idea from Plateful: <meal name>" and a link. Criterion: works on iOS and Android.
3. [must] The link opens a read-only page with that one meal only: name, ingredients, steps. Criterion: no pair name, no other meals, no account data in the page or its address.
4. [should] A "Copy link" action in the same sheet. Criterion: a confirmation shows for two seconds.
5. [nice] One quiet line under the recipe linking to the app's store page. Criterion: not shown above the recipe.

### Assumptions
- The page is hosted as a static file on a free tier. [assumed]
- Links stay valid for 90 days and then expire. [assumed]

### Blocking questions
none

## Plan

Files touched:
- `src/screens/MealDetail.tsx`: add the Share button and call the share sheet.
- `src/lib/shareLink.ts` (new): builds the meal's public link.
- `web/meal.html` (new): static read-only page template.
- `src/lib/shareLink.test.ts` (new): link tests.

Steps:
1. Build the link function and its tests (no account data in the address).
2. Add the button and the share sheet call.
3. Build the static page with the one-meal content and the quiet store line.
4. Check on one iOS and one Android device.

Tests: unit tests for the link; manual check of the sheet and the page on two phones and one laptop width.

## Shipped

| Requirement | Result | Note |
|---|---|---|
| 1 Share button | shipped | Visible without scrolling on a 6.1 inch screen |
| 2 Share sheet | shipped | Message and link as written |
| 3 One-meal page | shipped | Address holds a random token only |
| 4 Copy link | shipped | Confirmation shows for two seconds |
| 5 Store line | dropped | Left out until the store page exists |

Tests: 6 unit tests pass. Manual check on one iOS and one Android phone and a laptop width: passed.

Not verified: behaviour in chat apps that strip link previews.
Needs decision: none

## Decision log
- 2026-10-28 input confirmed
- 2026-10-28 product check: proceed
- 2026-10-28 size S; revised requirements approved
- 2026-10-29 plan approved
- 2026-10-30 shipped
