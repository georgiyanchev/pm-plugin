# Quick feature template

Use this for small features and enhancements that do not need the full `/pm` pipeline. Two ways in:

- **Interview.** Run `/pm:feature-quick <idea>` (Codex: invoke `feature-quick`). The skill fills the template with you per [intake-interview.md](intake-interview.md), confirms it, saves it, then runs "Your task".
- **Paste-in.** Copy everything between the two rules below, fill it in, and paste it into a Claude or Codex session. Keep the headings and their order; the model relies on them. With the skill installed, a pasted template counts as supplied input and goes straight to the confirmation summary.

Rules of thumb:

- Tag every requirement `[must]`, `[should]`, or `[nice]`.
- Put ideation asks ("propose other channels") in "Your task", not in the requirements.
- Keep the whole thing under about 40 lines. Longer templates get skipped sections.
- If the model's assessment finds the work is size M or L, stop and run `/pm feature-discovery` instead.

---

# Quick feature: <one-line title>

Track: quick (skip the /pm pipeline; escalate to /pm feature-discovery if the assessment finds size M or L)
Product: <name> — repo <path>, context <docs/product.md or equivalent>
Platform: <web | iOS | Android | all>

## Problem
<2–4 sentences: who hurts, how, and why it matters to the product>

## Evidence
<optional: requests, tickets, reviews, analytics, your own observation; "none" is a valid answer>

## User story
As a <user> (`P-xx` from `docs/product/target-audience.md` when it exists), I can <action>, so that <outcome>.

## Requirements
1. [must] <requirement>
2. [must] <requirement>
3. [nice] <requirement>

## Constraints and non-goals
- <no backend changes | must use the existing design system | ship in one PR | ...>
- Out of scope: <...>

## Done when
<observable outcome or metric; "button present and share lands on the target network with prefilled text" is enough>

## Open questions / known unknowns
- <your doubts, platform limits, design gaps>

## Your task
1. Product check. For value (will people want it, does it move a product goal), usability (can they find it and finish), viability (fits the product's goals, constraints, budget, rules, and the owner's priorities, using docs/product.md and what you remember about this project), and feasibility, give a verdict (strong, adequate, weak, unknown), a one-line reason, and the evidence (my input, a repo file, your memory of this project, or assumed). Then one call: proceed, reshape, validate first, or drop. If the call is not proceed, STOP and wait for my decision.
2. Assess the problem, story, and requirements. List the gaps behind the check, ranked and short.
3. Propose improvements and new ideas only where they change scope, effort, or value. Mark each adopt / optional / reject with a one-line reason.
4. Draft one acceptance criterion per requirement.
5. Ask at most 3 blocking questions. Otherwise state your assumptions and continue.
STOP. Wait for my approval of the revised requirement list.
6. Write a short plan: files touched, steps, tests.
STOP. Wait for plan approval.
7. Implement and run the tests. Report what shipped versus what was planned, which tests ran and their result, what could not be verified, and anything that needs my decision.

---

## Example

# Quick feature: Share recipe on social media

Track: quick
Product: Plateful (weekly meal planner for two) — repo <path>, context docs/product.md
Platform: web

## Problem
There is no way to share a recipe. We lose free exposure, and users cannot show friends what they are making.

## Evidence
Two TestFlight testers asked how to send a recipe to a friend.

## User story
As a user, I can share any recipe with a short message to social media, so that my friends see what I am cooking.

## Requirements
1. [must] Share options on every recipe page, at the bottom of the page, one icon per network matching our design language.
2. [must] Tapping an icon opens the target network at its post or compose screen.
3. [nice] The compose field is pre-filled: "Check out the <recipe name> I just cooked with Plateful."
4. [must] Networks: Facebook, Instagram, TikTok at minimum.

## Constraints and non-goals
- No new backend. No share analytics in this iteration.
- Use the existing icon set if one exists.

## Done when
Share icons are visible on the recipe page; a tap lands on the network's compose screen; prefill works where the network allows it.

## Open questions / known unknowns
- Instagram and TikTok likely have no text prefill on web. Fallback: copy to clipboard, native share sheet, or an image card?
- Which networks beyond the three? Propose.

## Your task
(as in the template above)
