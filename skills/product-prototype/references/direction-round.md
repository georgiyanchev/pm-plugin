# Direction round: the entry screen in three or four directions

One screen, the entry screen named in the brief (the first `core` row of the Screens table). The owner picks a direction here for the whole product, so this screen must be enough to judge layout, type, colour, imagery and personality. No other screen is drawn in this round.

## Before drawing

Write back, briefly, in chat:

- a) Five bullets: what the entry screen must do for the persona in the first five seconds.
- b) The module priority order you will use and why. Every module the brief requires stays in every direction.
- c) Your assumptions, and any brief requirement that hurts the screen. Flag these; do not drop them.
- d) If `directions/` or `_previous-round-N/` exists: the header comment of every earlier concept read, and a three-bullet diagnosis of why they did not land. No reference, font pairing or layout model from them is reused.
- e) The directions you intend to build, one line each.

Then continue without waiting unless a blocking question is open.

## The directions

Root each direction in a different real-world reference from the product's world (a printed menu, a ledger, a transit map, a field notebook, a gallery wall, a trading floor; examples, not a list). The reference informs material, typography, colour and pacing only: no literal props, no skeuomorphic objects, no costume.

Directions must differ in all of:

- layout model (full-bleed hero with feed, modular grid, paged carousel, list-first, conversational, split pane)
- how the hero action is presented and triggered
- typography pairing
- accent colour and surface material
- imagery treatment (crop, framing, scale)

All directions follow the brief's theme stance; the other theme is derived from it. Interaction stays conventional: standard navigation, scroll, tap, sheets. Innovation belongs in presentation and hierarchy, not in how people navigate. Personality shows in the copy: the brand voice in real strings, and any named character with a visible entry point and one line of dialogue.

Keep constant across directions: the same copy, the same sample data from the brief, the same viewport, the same modules. Show enough content below the fold to communicate scrolling.

## Hard constraints

- Mobile: 390×844 frame, and no horizontal overflow at 360 wide. Web: 1280 content width, no horizontal overflow at 1024.
- Safe areas respected; the primary action in the thumb zone on mobile.
- Tap targets at least 44×44 px in both dimensions; visible focus on web controls.
- Text contrast at least 4.5:1, measured against the worst case, including text over imagery (scrim or solid plate).
- The hero action visible above the fold.
- Real content only: real names, real amounts, the brief's sample data. No lorem ipsum, no "Item 1".
- Static. The only controls are the mockup's own toggles (theme, width). No navigation to other screens in this round.

## Banned

Purple, blue or pink gradients as decoration · glassmorphism or frosted cards · neon glow on black as the whole concept · a system or default font (Inter, Roboto, SF) as the brand font · emoji as icons · generic sparkle icons for AI · "Welcome back, [Name]!" hero headers · floating blobs or orbs · clip-art logos · identical rounded card grids as the only structure · everything centred · more than one accent colour doing the same job · drawn illustrations of a photographic subject · cream or off-white page backgrounds by default · italic accent words inside headings · numbered 01 / 02 / 03 section labels · monospace eyebrow labels · pill buttons by default · a row of three equal feature cards · anything in the brief's dislikes.

A product whose design system already uses one of these keeps it; the brief says so.

## Deliverables

In `<prototype folder>/directions/`:

- `01-<slug>.html` to `0N-<slug>.html`, each self-contained, no build step. Allowed external dependencies: Google Fonts and one icon set (Lucide or Phosphor) inlined as SVG. Imagery per build-rules.md.
  - Every design decision as a CSS custom property on `:root` (colour, type scale, spacing, sizes, radii, shadows, motion) with a `[data-theme]` override for the other theme. No magic numbers in component CSS.
  - Class names match components one to one (`.hero-action`, `.bottom-nav`, `.event-card`), so the build and a later implementation reuse them. Mockup chrome (device frame, toolbar, fold line) in a block marked `<!-- mockup chrome: do not port -->`.
  - The frame shows the full scroll length with a dashed line at the fold, and draws the navigation where it sits on first load.
  - Header comment: concept name, one-line idea, reference, why it suits the persona, font pairing, palette (hex and role, both themes), imagery treatment, component list, the direction's single biggest risk.
- `index.html`: all directions side by side in iframes, with shared toggles for theme and width, and under each: name, central idea, strengths, trade-offs, implementation notes.

## Self-check

Open every file. At both widths and both themes: no horizontal overflow, contrast passes, every required module present, nothing banned. Squint test: the directions are clearly different at a glance. Fix failures before showing; never report a failed check as done.

## In chat, then stop

1. Paths to the gallery and the files.
2. Comparison table: direction · core idea · strongest point · biggest risk · fit for the persona (1 to 5).
3. Two or three honest lines of critique per direction.
4. One recommendation, and which elements from other directions would merge into it.
5. Together mode: stop and wait for the pick. Autonomous mode: record the recommendation as the pick (`[auto]`) and continue to the build.

The pick and its reason go to `decisions.md`. The chosen file's tokens become `tokens.css`; the other directions stay in `directions/` as the record of the round.
