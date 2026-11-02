# Intake interview

Collects the input for [quick-feature-template.md](quick-feature-template.md) before any work starts. Four phases: pre-fill, ask the gaps, summary, edit loop. Nothing is assessed, searched, or planned until the user says start. What happens after start is in [record.md](record.md).

## 1. Pre-fill

Two sources, in this order:

1. **What the user already wrote.** The invocation text and anything earlier in the conversation. A pasted, filled-in template counts: every section in it is `provided`.
2. **The repo, for the header only.** List the repo root and `docs/product/quick/`. Read `AGENTS.md` or `CLAUDE.md`, `docs/product.md`, and the top-level manifest (`package.json`, `pubspec.yaml`, `app.json`, `*.csproj`, or equivalent) when they exist. Take:
   - Product: the product's name.
   - Context: `docs/product.md`, else `AGENTS.md` or `CLAUDE.md`, else `none`.
   - Platform: one or more of web, iOS, Android, from the stack those files name (React Native or Flutter is iOS and Android; a web framework is web).

   End each header line that holds a repo value with one `[inferred]`.

Read nothing else in the product repo: no source files, no code search, no web search, no subagents.

### Splitting free text

Assign each sentence to a section by meaning:

| Cue | Section |
|---|---|
| Who hurts, what goes wrong, why it matters | Problem |
| Who asked and how often; tickets, reviews, data, something the user saw | Evidence |
| "As a ... I can ..." | User story |
| What the product has to do: "add", "must", "should", "needs to", "ideally", "if possible" | Requirements |
| "No backend", "not now", "out of scope", "without" | Constraints and non-goals |
| "Works when", "done when", a metric | Done when |
| A doubt or a question | Open questions / known unknowns |

The sentence that states the change ("Add a dark mode toggle on Settings") is the first requirement, and the Title is drawn from it.

Keep the user's wording. Do not improve it, extend it, or fill in what they left out. Two exceptions:

- **Title.** Write a title of eight words or fewer from the user's text and mark it `[inferred]`.
- **List sections.** Requirements, constraints, and open questions are split into one item per line, first letter capitalised.

A section with any user text is `provided`, however short. One exception: when the only requirement is the one drawn from the sentence that states the change, Requirements is still asked, with that line shown as `Captured so far:` above the prompt, so a one-line idea gets a chance to grow. `skip` keeps it as is.

## 2. Ask the gaps

Go through the sections in the order below. Skip every section that is `provided` or `[inferred]`. Count the sections left; that number is `<total>` and stays fixed for the interview.

Open the first message with one line saying what was captured, so the user sees the pre-fill worked:

> Captured: <every section in the table below that is filled, from the user or the repo, comma-separated>. <total> to go.

When nothing is left to ask, go straight to the summary.

Ask one section per message and wait for the reply. Each prompt has this shape and nothing more:

> **<n> of <total> · <Section>**
> <what belongs here, one line from the table>
> Example: <the first line of that section in the template's example>
> Reply with your text, `skip`, or `draft`.

| Section | What belongs here | Asked as |
|---|---|---|
| Title | One line naming the change | chat |
| Product | The product's name | chat |
| Platform | One or more of web, iOS, Android | choice: web, iOS, Android, plus skip; no `draft` |
| Problem | 2–4 sentences: who hurts, how, why it matters to the product | chat |
| Evidence | Requests, tickets, reviews, analytics, or your own observation; `none` is a valid answer | chat; no `draft` |
| User story | As a <user>, I can <action>, so that <outcome> | chat |
| Requirements | A list, one per line, in any form | chat |
| Constraints and non-goals | What rules options out; what is out of scope | chat |
| Done when | An observable outcome or metric | chat |
| Open questions / known unknowns | Doubts, platform limits, design gaps | chat |

Prose sections are plain chat prompts because a question picker's free-text field holds one line. A choice uses the picker when the harness has one; its options replace the "Reply with" line. A section marked no `draft` drops `draft` from the "Reply with" line.

### Replies

| Reply | Result | State |
|---|---|---|
| Text | Stored as written | `provided` |
| `skip` | Section left empty; written as `not provided` | `empty` |
| `draft` | Written from the sections already provided and the context files read in pre-fill (who the users are, what the product does); every drafted line ends with `[assumed]`. With nothing to draft from, say so and ask again. Not offered for Platform or Evidence: evidence that was drafted would be invented | `assumed` |
| `back` | Return to the previous section | unchanged |
| `skip rest` | The current section and every later one become `empty`; go to the summary | `empty` |

A draft is not shown for approval during the interview. It appears in the summary, where the user can change it.

### Requirements

Number them in the order given. A tag in brackets that the user typed (`[must]`) is kept. Every other requirement gets a proposed tag marked with a question mark: `[must?]` by default, `[should?]` for "should", `[nice?]` for "ideally", "if possible", "nice to have". Once tagged, drop that leading cue word from the text so tag and wording cannot disagree: "Ideally follows the system theme" becomes `[nice?] Follows the system theme`. Do not ask for tags one by one.

### Floor

Problem or Requirements must be `provided`; a draft does not count. When both are `empty` or `assumed` after the last section, name the two sections and ask once for either. If the user declines, stop: nothing saved, nothing run.

## 3. Summary

Print the filled template and nothing else above it:

```markdown
# Quick feature: <title>

Product: <name> — context <doc>
Platform: <platforms>

## Problem
## Evidence
## User story
## Requirements
## Constraints and non-goals
## Done when
## Open questions / known unknowns
```

Keep the markers: `[inferred]`, `[assumed]`, `[must?]`. An empty section's body is the single line `not provided`. Leave out "Your task", the Track line, and the repo path.

Under the template, two lines:

> Sections: provided <n>, assumed <n>, not provided <n> (of the seven above).
> Tags ending in `?` are my proposals; they become final when you start. Edit can change or add to any section.

The summary is the user's input played back. It holds no assessment, no suggestions, and no opinion on the idea; those come after start.

End with one question: **Start**, **Edit**, or **Cancel**.

## 4. Edit loop

- **Edit.** The user names a section and a change in any form: "problem: drop the second sentence", "requirement 2 is nice, not must", "add a constraint: no new dependency". Apply exactly what was said. Edited lines lose their `[assumed]`, `[inferred]`, or `?` marker. Reprint the whole summary and ask the same question again. When the user picks Edit without saying what, ask "What should change?" in chat.
- A reply that approves and changes something in the same message is an edit: apply it, reprint, ask again.
- **Cancel.** Stop. Write nothing.
- **Start.** Only an explicit start (or yes, go, confirmed) moves on. Write the record per [record.md](record.md).
