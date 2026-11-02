# TBD: product name design reference

The one design reference for this product. Read it before you touch anything a user sees. Values live in TBD: path to the token file; if this file and the tokens disagree, the tokens win; fix this file.

Last reviewed: TBD: YYYY-MM-DD. Owner: the product owner, who approves any new colour, typeface, or change of mood.

## 1. Brand mood and the owner's preferences

- TBD: the mood in three or four lines (what it should feel like, what it must never feel like).
- TBD: theme (dark only, light only, both) and the reason.
- TBD: imagery rule (photographs, illustration, none) and what is never used.
- Copy follows `../product/voice.md`.

## 2. Rejected directions

Colours, styles, and moods the owner has rejected for this product, so no round proposes them again:

- TBD:

## 3. Colour palette

Use the token name, never the value, in code.

| Token | Value | Use |
|---|---|---|
| TBD: `bg` | | Page background |
| TBD: `ink` | | Primary text |
| TBD: `accent` | | The action colour |

## 4. Typography

| Role | Face | Size | Line height | Use |
|---|---|---|---|---|
| TBD: display | | | | |
| TBD: body | | | | |

## 5. Spacing, radii, and layout

- TBD: spacing scale, gutter, tap target minimum, icon size and stroke, radii.
- TBD: layout rules (one column, max width, safe areas).

## 6. Component rules

- TBD: one entry per shared component: what it is for, its states, and what it never does.

## 7. Motion and imagery

- TBD: what moves, how long, and what never animates.
- TBD: image treatment (scrims, placeholders, aspect ratios).

## 8. Accessibility

- Text contrast at least 4.5:1; tap targets at least 44 px; every image has `alt` text; every control has a label.
- TBD: reduced-motion behaviour, dynamic type, screen-reader order.

## 9. Anti-patterns

- TBD: the mistakes seen in reviews so far, each with the rule that replaces it.

## 10. Usage guidelines for agents

- Read sections 1, 2, and 9 before proposing anything; propose within the tokens, never with literals.
- A new colour, face, or mood is a proposal to the owner (`YYYY-MM-DD-<topic>.md` beside this file), not a change.
- Keep this file and the tokens in step in the same commit.

## 11. Open questions

- TBD: owner to confirm: open questions for the owner, removed as they are answered; the heading stays.
