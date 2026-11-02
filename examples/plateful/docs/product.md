*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

# Plateful

A weekly meal planner for two people who cook at home: plan the week together in five minutes, share one shopping list, and use leftovers before they go off.

## Audience and jobs
Couples and flat-sharing pairs, 25 to 45, who cook dinner at home four or more nights a week. Both work, shop twice a week, and hate throwing food away. They want to decide the week's dinners in one sitting (J-01), never buy what is already in the fridge (J-02), and use what is left before it goes off (J-03). Detail and personas: `docs/product/target-audience.md`.

## Goals this year
- 1,000 weekly active pairs by the end of the year (a pair is active when either partner opens the plan or the list in a week).
- 40 percent of pairs still planning after 8 weeks.
- Pairs report that fewer than one item a week goes in the bin (asked in a two-question in-app check at week 4).

## Constraints
- Platform: mobile app, Expo (React Native), iOS and Android from one codebase.
- Budget: free to run at launch; only free tiers of backend services until there are 1,000 pairs. A paid tier comes later.
- Team: one founder, part-time, about 10 hours a week.
- Brand: calm, warm, two accent colours (terracotta and sage), large type, works one-handed.
- Legal: no health or calorie claims; store privacy labels kept current; account data deletable on request.

## Metrics source
Product analytics events from the app, read in the analytics dashboard's weekly report; store ratings from the two app store consoles. Pull weekly active pairs and 8-week retention every Monday and note them in `docs/product/INDEX.md`. A figure without a pull date is an estimate.

## Design system
Tokens and shared components live in `src/design/`. Rules, palette and anti-patterns: `docs/design/DESIGN.md`.

## Out of scope
- Grocery delivery or ordering.
- Calorie or nutrition tracking.
- A social feed or public profiles. Sharing a single meal with a friend is allowed; a feed is not.
- Plans for families with kids, meal-prep athletes, or restaurants.

Keep in step with the out-of-scope list in `AGENTS.md`.

## Related docs
- Features and status: `docs/product/INDEX.md`
- Voice: `docs/product/voice.md`; audience: `docs/product/target-audience.md`
- Competitor research: docs/competitors/
- Design: `docs/design/DESIGN.md`; development (architecture and technical notes): `docs/development/`; decisions: `docs/decisions.md`
