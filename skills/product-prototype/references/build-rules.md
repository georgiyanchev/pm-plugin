# Build rules

The chosen direction, every screen in the brief, clickable end to end. Static files that open by double-click from any folder, including OneDrive, with no build step and no server.

## Files

| File | Holds |
|---|---|
| `index.html` | every screen as one `<section>`; the mockup chrome; the tour panel; the badge toggle |
| `tokens.css` | the chosen direction's `:root` custom properties and `[data-theme]` override, copied from its header and `:root` block; component CSS may live here or inline in `index.html` |
| `app.js` | the hash router, the tour, the badge toggle, form handling, the in-memory state |
| `flows.js` | `window.FLOWS`: the brief's flows as route steps with a hint per step |
| `assets/` | SVG plates, supplied photos, `CREDITS.md` when photos are used |
| `directions/` | the direction round, untouched after the pick |

Allowed external dependencies: Google Fonts and one icon set inlined as SVG. Nothing else loads from the network. No frameworks, no bundlers.

## Routing contract

`scripts/check_prototype.py` depends on this shape.

```html
<main id="app">
  <section class="screen" data-route="/home" data-tier="core" data-title="Home">…</section>
  <section class="screen" data-route="/event/:id" data-tier="core" data-title="Event">…</section>
  <section class="screen placeholder" data-route="/reset-password" data-tier="placeholder" data-title="Password reset">
    <p class="placeholder-label">Password reset. Out of prototype scope.</p>
    <a href="#/sign-in" class="back">Back</a>
  </section>
</main>
```

- One `<section>` per Screens-table row; `data-route` equals the row's Route; `data-tier` equals its Tier.
- Navigation is `<a href="#/route">` or any element with `data-go="/route"`. `app.js` listens to `hashchange`, matches the hash against `data-route` patterns (`:id` matches one segment), shows that section, hides the rest, scrolls to the top, and updates the tour. An unknown hash shows the entry screen.
- A parameterised route reads its parameter from the hash and fills the screen from the sample data in `app.js` (`DATA.events[id]`). Links use real ids from the sample data.
- Every screen has at least one way forward or back. The checker reports a route no link reaches and a link no route serves.
- The first core row's route is the entry screen; `index.html` opens there.

## Tiers

| Tier | Built | Not built |
|---|---|---|
| core | populated default state; real copy; forms accept typing and submit into the next step of the flow; selections and bookings persist in memory for the session so later screens reflect them; the hero action works | empty, loading, error and validation states; a state switcher |
| supporting | default state with real content; links wired | interaction beyond navigation |
| placeholder | the direction's chrome (nav, header); a centred `.placeholder-label` with the screen name and "Out of prototype scope."; a back link | anything else |

Happy path only is a decision, not an omission: the README says so. A later round may add states.

## Content

- Copy in the brand voice. PRD Key copy verbatim. No lorem ipsum, no "Item 1", no "Test User", no `example@test.com`.
- Sample data from the brief, consistent across screens: six to ten rows where a list exists, varied and plausible for the persona.
- Verb-first buttons ("Book a place", "Reveal matches"). Destructive actions name the object.
- No feature, claim, rating, aggregate count or social activity the brief does not list. Per-item sample numbers from the brief (a price, seats left, a date) are fine; member counts, ratings, testimonials and press are not. The deferred list is honoured: deferred features are placeholders or absent, as the brief says.
- Fictional people: invented names from the brief's sample data, plate or initial avatars, never a real face. No competitor is named on screen; competitor patterns inform flows only.
- Named characters or assistants appear with one line of dialogue where the brief gives them an entry point.

## Decide-and-show layer

- **Tour panel.** A toolbar button opens a panel listing `window.FLOWS` by name. Choosing a flow navigates to its first step and shows the hint; Next and Back move through the steps; a step counter shows `2 / 5`; the element the hint names gets a `.tour-target` outline when the hint carries a selector. Closing the tour leaves the current screen in place.
- **Hypothesis badges.** Each row of the brief's Hypotheses table is a `<span class="hyp" data-hyp-id="H-01" title="<claim> (<class>)">?</span>` next to the element that embodies it. A toolbar toggle sets `data-hyp="on|off"` on `<body>`; on by default for the owner, off hides every badge for a stakeholder walkthrough. The toggle state persists in `localStorage`.
- **Concept banner.** A one-line strip in the mockup chrome: "Concept prototype. Sample data. Not a live service." It stays on in every mode; it is the honest frame for a friend or stakeholder.
- **Mockup chrome.** Toolbar (tour, badges, theme when two themes exist, width 390 / 360 on mobile), the device frame, and the fold line live in one block marked `<!-- mockup chrome: do not port -->`. Everything inside `#app` is the product.

```js
// flows.js
window.FLOWS = [
  { id: "FLOW-01", name: "Book an outing", steps: [
    { route: "/home", hint: "Tap the Saturday hike", target: ".hero-action" },
    { route: "/event/12", hint: "Read the plan, then book", target: ".book" },
    { route: "/booking/12", hint: "Pick a ticket and confirm" },
    { route: "/confirmation/12", hint: "Done; matches arrive after the event" }
  ] }
];
```

Every core flow in the brief is in `flows.js` with every step route resolving to a section.

## Imagery

- Default: art-directed plates. A solid or duotone colour plate in the subject's real colour, a simple SVG silhouette, and `data-art="<subject, angle, lighting, background>"` on the element for the real shoot later.
- Photos only when the brief names supplied files or an approved download. Then: local files in `assets/`, one art-directed set (same lighting mood, same background family), `assets/CREDITS.md` with file, used as, photographer, source id, licence, and a note where a photo stands in for the exact subject. No hot-linked images. No identifiable real person's face for a fictional character or an AI.
- Text over imagery sits on a scrim or a solid plate.

## Constraints

- Mobile, including `mobile web`: 390×844 frame with status bar and home indicator, no horizontal overflow at 360. Web and desktop tool: 1280 content width, no horizontal overflow at 1024.
- Tap targets at least 44×44 px; visible `:focus-visible` on web controls; labels on form inputs; `aria-label` on icon-only controls.
- Text contrast at least 4.5:1.
- Status is not conveyed by colour alone.
- Everything in the direction's tokens; no colour literals in component CSS.
- The product's design system, when the repo has one, wins over the direction wherever they conflict; the conflict is a line in `decisions.md`.

## README: open and share

`README.md` ends with two short sections. **Open**: double-click `index.html`; web fonts need a network connection, everything else works offline. **Share**: zip the whole prototype folder (not `index.html` alone) and send it, or, when the harness can publish an artifact and the owner asks, publish `index.html` with `tokens.css`, `app.js`, `flows.js` and `assets/` as its files and give the link; say that the badge toggle and the concept banner are what the viewer sees. The README names its audience: the owner first, then whoever they show it to.

## Rerun

Before writing a new build into a folder that has one, move `index.html`, `tokens.css`, `app.js`, `flows.js` and `README.md` to `_previous-round-N/` (next free N). `directions/`, `prototype-brief.md` and `decisions.md` stay. Nothing is deleted.
