# Decision policy

Two modes, three decision classes, one log.

## Modes

| Mode | Set when | Blocking and impactful decisions | Stops |
|---|---|---|---|
| `together` (default) | no instruction, or the owner wants to be involved | asked, batched, one message, a recommended answer per question | after the brief; after the direction round; at the end |
| `autonomous` | the owner says "make all decisions", "autonomous", "just build it" or equivalent | taken as the recommended answer, logged `[auto]` | none; one report at the end |

The mode is recorded in the brief's frontmatter and in the first line of `decisions.md`. The owner can switch mode at any stop; the switch is a decision line.

## Classes

| Class | What it covers | together | autonomous |
|---|---|---|---|
| blocking | the input does not say which product, the platform, the primary persona, or the core flow; the source call is `drop` | ask before the brief | take the recommendation; for `drop`, stop and report |
| impactful | visual direction; navigation model (tabs, drawer, top bar, sidebar); the core / supporting / placeholder split; a second role's screens; any feature, screen or claim not in the input; a copy change to PRD copy; any download; theme stance when unstated | two batches: everything the brief records (navigation model, tier split, roles, theme stance, imagery source) goes in the same message as the blocking questions, before the brief; whatever surfaces later goes in one message between the direction pick and the build | decide, log `[auto]` |
| routine | copy inside the brand voice; sample data; colours, type and spacing inside the taste block and the design system; component details; placeholder wording; file names | never asked | never asked |

A question is asked once. If the owner does not answer a together-mode question, the skill waits; silence is not an answer. Mid-build, a together-mode question is asked only when a flow cannot be wired without it; everything else is logged as a routine decision or deferred to the end report.

## Asking well

- One message per batch. Each question has the recommended answer and a one-line reason. Three questions or fewer where possible; never more than seven.
- Questions about taste quote the taste block back ("you said 'like Apple'; I read that as restraint and few elements; right?").
- Contradictions are questions, not silent fixes: a liked brand that conflicts with a dislike, a mood that conflicts with the persona, a taste rule that conflicts with the repo's design system.
- Do not ask what the source answers, what the owner already said, or what the skill can decide well.

## The log: `decisions.md`

```markdown
# Decisions — <product> prototype

Mode: together | autonomous (set YYYY-MM-DD)

- YYYY-MM-DD — [asked] — product choice — reshaped (event-first web) — call was reshape; owner confirmed
- YYYY-MM-DD — [auto] — navigation — bottom tabs, four items — mobile persona, three core flows plus account
- YYYY-MM-DD — [auto] — imagery — art-directed plates — no download approval on file
```

One line per decision: date, tag, topic, decision, reason. Append-only; a reversed decision is a new line. The README's decision summary lists the `[auto]` lines so an autonomous run can be reviewed and any line overridden in a rerun.
