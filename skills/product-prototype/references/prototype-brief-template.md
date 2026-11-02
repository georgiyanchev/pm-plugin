# Prototype brief template (`prototype-brief.md`)

The build spec for one prototype, one to two pages. It is not a business brief: no problem statement, no metrics, no product check. Those stay in the source (`docs/product.md`, `01-brief.md`, `02-prd.md`, the discovery run) and are linked under Sources. Every derived line ends with a source tag:

| Tag | Meaning |
|---|---|
| `[validated_fact]` | the run's claim class `validated_fact` |
| `[evidence_backed_inference]` | the run's claim class `evidence_backed_inference` |
| `[hypothesis]` | the run's `product_hypothesis` or `unresolved`; a PRD `[ASSUMPTION]`; a brief's untested assumption |
| `[stated]` | the owner said it, in the source or in chat |
| `[assumed]` | the skill chose it; the choice is also a line in `decisions.md` |

An assessment run validates nothing: its report labels `fact` and `inference` map to `[evidence_backed_inference]`, `estimate` and `hypothesis` to `[hypothesis]`. `[validated_fact]` comes only from a validation run's `validated_fact` claim class.

```markdown
---
title: <Product name>
slug: <slug>
source: <path to the run, product.md, brief or PRD; or "chat">
source_call: <proceed | reshape | narrow | validate first | n/a>
product_choice: <original | reshaped | OPP-xx | n/a>
mode: <together | autonomous>
platform: <iOS | Android | mobile | mobile web | web | desktop tool>
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# <Product name> — prototype brief

## Product
One sentence: who it is for and what it lets them do. The business model only when it shows on screen (free, per ticket, subscription).

## Persona and moment
`P-xx` from `docs/product/target-audience.md`, or from the one-pager, brief or PRD the prototype is built from, with the name; who they are, how skilled. The moment they open the product: where they are, what they want, how rushed. Secondary audiences in one line; the design serves the primary persona.

## Jobs and flows
| ID | Job, in the user's words | Steps (screens in order) | Tier |
|---|---|---|---|
| FLOW-01 | ... | SCR-01 → SCR-03 → SCR-04 | core |

Three to five flows, ranked. FLOW-01 is the core offering. A `core` flow is built end to end on its happy path; a `supporting` flow gets its screens in default state with the links wired.

## Hero action
The one thing the entry screen must make easiest, and the screen it lands on.

## Screens
| ID | Screen | Route | Tier | Flows | Primary action | Notes |
|---|---|---|---|---|---|---|
| SCR-01 | Home | /home | core | FLOW-01, FLOW-02 | ... | entry screen |
| SCR-09 | Password reset | /reset-password | placeholder | | | |

Tiers: `core` (happy path, real copy, forms accept input and submit), `supporting` (default state, static content, links wired), `placeholder` (the direction's chrome, a centred label, a way back). Routes are unique, start with `/`, and use `:id` for a parameter (`/event/:id`). The first `core` row is the entry screen.

## Hypotheses on screen
| ID | Claim | Class | Shows on |
|---|---|---|---|
| H-01 | Members will pre-pay for an activity outing | hypothesis | SCR-03 booking |

Each row becomes a badge next to the element that embodies the claim.

## Deferred and out of bounds
What the source cut or deferred, and whether it appears as a placeholder page or not at all. Features, claims, ratings, social activity the source does not support: never shown.

## Brand and taste
- Personality in three words:
- Voice, one sample line:
- Named characters or assistants, with tone:
- Existing brand assets or design system: <path> or "none, open brief"
- Apps or brands whose feel the owner likes, and what exactly about each:
- Dislikes, and what each means:
- Colours or moods to avoid:
- Colours or moods to prioritise:
- Theme stance: <dark-first | light-first | designer's choice>
- Imagery: subject, and source (<files at path> | <download approved from ...> | art-directed plates)

## Roles
The primary role the prototype is built for. Any other role the product needs to work (organizer, admin, provider, reviewer): its screens listed in the Screens table as `supporting` or `placeholder`, or "not shown" with the reason.

## Sample data
The names, places, amounts and dates the whole prototype uses. Realistic, consistent, plausible for the persona and the moment. Fictional people get invented names and plate or initial avatars, never a real person's photo. Per-item numbers (a price, seats left, a date) are sample data; aggregate social proof (member counts, ratings, testimonials, press) is out of bounds unless the source supports it.

## Sources
Each path read, with the sections or stage files used.
```

## Rules

- Keep the headings and table columns as given; `scripts/check_prototype.py` reads the Screens table (ID, Screen, Route, Tier) and `flows.js` is written from Jobs and flows.
- Three to five flows, six to fifteen screens. A larger product means more placeholder rows, not more core rows.
- Every line that neither the owner stated nor the source contained is `[assumed]` and has a line in `decisions.md`.
- Platform decides the frame: `mobile`, `iOS`, `Android` and `mobile web` build in the 390×844 frame (and must fit 360); `web` and `desktop tool` build at 1280 (and must lay out at 1024). A `mobile web` product is also opened once at 1024 to confirm it does not break.
- A second role is an impactful question when the owner is that role's user (an organizer running their own events); otherwise its screens are supporting at most.
- An empty taste line is a blocking question in together mode. In autonomous mode the skill fills it from the product's world and tags it `[assumed]`.
- `updated` changes whenever the body changes. A confirmed brief is not rewritten during the build; a change the build needs is a new question (together) or a new `[auto]` decision (autonomous) and an edit with a new `updated` date.
