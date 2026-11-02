*Example output of the `pm` plugin for Plateful, a synthetic product.*

# Decisions — Plateful prototype

Mode: autonomous (set 2026-11-02)

- 2026-11-02 — [auto] — mode — autonomous — the owner asked for every decision to be made and logged
- 2026-11-02 — [auto] — output folder — the example folder the owner named — no product repo, no discovery run
- 2026-11-02 — [auto] — platform — mobile, 390×844 frame, must fit 360 — the owner said Expo on iOS and Android
- 2026-11-02 — [auto] — moment — Sunday evening on the sofa, one phone, ten minutes; mid-week 6 pm in the kitchen one-handed — derived from P-01 and J-01 to J-03
- 2026-11-02 — [auto] — entry screen — Pair up (/start), designed as the first-week screen with the hero action and a preview of the week beneath — the happy path starts with pairing; the preview gives the direction round enough to judge
- 2026-11-02 — [auto] — hero action — "Plan our first week", landing on This week with one empty night — J-01 is the core offering; the empty night is the first thing to do
- 2026-11-02 — [auto] — pairing on one phone — both names entered on one phone; the invite to a second phone is a placeholder — simplest happy path; badged H-01
- 2026-11-02 — [auto] — navigation — bottom tabs, four items: Week, List, Fridge, Settings — one-handed use, three core areas plus the usual settings
- 2026-11-02 — [auto] — tier split — core: Pair up, This week, Pick a meal, Meal, Shopping list, Fridge; supporting: Cook, Add to the fridge; placeholder: Invite, Settings, Plus, Help — the four jobs need six screens; everything else exists so no link dead-ends
- 2026-11-02 — [auto] — fridge and cook now — one screen with two sections rather than two screens — the owner wrote them as one view; mid-week the question is "what can we cook now" and the answer is on the same screen
- 2026-11-02 — [auto] — shopping list grouping — two shops per week (Monday, Thursday) with a counted "skipped, already in" section — P-01 shops twice a week; the skipped section is J-02 made visible
- 2026-11-02 — [auto] — leftovers model — leftovers carry into a named next meal (Monday's chicken → Tuesday's tacos), shown on This week and on both meal screens — the owner's core; badged H-04
- 2026-11-02 — [auto] — second role — none; the partner is the same role on another phone, not shown — no admin or provider in the product
- 2026-11-02 — [auto] — business model on screen — free; Plateful Plus as a placeholder page with no feature list — the owner said paid tier later
- 2026-11-02 — [auto] — deferred features — delivery, calories, social feed absent; recipe import, ratings, history, real photos absent — the owner's out-of-scope list plus nothing the input does not support
- 2026-11-02 — [auto] — hypotheses — five, one per core promise (H-01 to H-05) — nothing in the input is tested; each badge sits on the element that embodies the claim
- 2026-11-02 — [auto] — theme stance — light-first, dark derived — calm and warm reads as daylight; the kitchen at 6 pm is lit
- 2026-11-02 — [auto] — page surface — white page with warm linen section surfaces, not a cream page — the direction-round rules ban an off-white page by default; warmth comes from the surfaces and plates
- 2026-11-02 — [auto] — accents — terracotta does one job (the primary action), sage does one job (already have it, leftovers, status) — two accents, never the same job
- 2026-11-02 — [auto] — fonts — system font stacks only (a serif display stack, a humanist sans stack); the skill's Google Fonts allowance is not used — the owner's publishing constraint: static files, nothing loads from the network
- 2026-11-02 — [auto] — icons — seven line icons drawn inline as SVG symbols, no icon set downloaded — same constraint; the set is small
- 2026-11-02 — [auto] — imagery — art-directed plates: SVG plate in each meal's real colours with `data-art` for a later shoot — no photos supplied, no download approved
- 2026-11-02 — [auto] — voice — "Monday's chicken is Tuesday's tacos." as the sample line; copy short, verb-first, no exclamation marks — calm and practical
- 2026-11-02 — [auto] — sample data — Mira and Tom, week of 2 to 8 November 2026, five cooking nights, ten fridge items, eight suggestions, twelve list items — plausible for a working pair who shop twice a week
- 2026-11-02 — [auto] — cupboard staples — pasta, rice, tins, oil, garlic and spices assumed in and not listed — a shopping list that names salt is not the persona's list
- 2026-11-02 — [auto] — direction pick — 02 Market ledger, with 01 Sunday paper's serif headline merged in — list-first suits every core screen (seven nights, a list, a fridge); the serif keeps the warmth the owner asked for
- 2026-11-02 — [auto] — states — happy path only; no empty, loading, error or validation states — build rules; a later round may add them
- 2026-11-02 — [auto] — frame — the device frame scrolls inside a fixed 844 px height; no separate fold line in the build — the frame edge is the fold; the direction files keep the dashed fold line
- 2026-11-02 — [auto] — browser checks — overflow, tap targets and contrast checked in a desktop Chromium browser at 390 and 360, both themes; terracotta as text got a lighter ink token for the dark theme after it measured 3.6:1 — see the README for what was and was not verified
