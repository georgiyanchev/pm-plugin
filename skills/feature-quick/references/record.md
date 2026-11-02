# Quick-feature record

One file per quick feature, in the product repo. It is written when the user says start and updated at every step after that, so a lost session can pick up where it stopped.

## Path

`docs/product/quick/<YYYY-MM-DD>-<slug>.md`; create the folder when missing. The date is the day the input was confirmed. The slug is kebab-case from the title, five words at most: drop articles and connecting words (a, the, of, as, to, for) before cutting, so the distinguishing words survive (`export-items-list-csv`, not `export-the-items-list-as`). When a record with that slug exists, ask whether to resume it or save under a different slug.

## Layout

```markdown
---
title: <one-line title>
slug: <kebab-case>
track: quick
status: confirmed
size: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

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

## Decision log
- YYYY-MM-DD input confirmed
```

The header lines and the seven sections are the confirmed summary, unchanged. `[assumed]` and `[inferred]` stay so the assessment knows what the user did not say; the `?` on proposed tags is dropped. The frontmatter `title` and the H1 carry no marker. Schema and status values: [artifact-conventions.md](shared/artifact-conventions.md).

After writing the file, tell the user in one line, with the repo-relative path: `Saved to <path>. Assessing.`

## Sections appended later

Each goes above `## Decision log`. Refresh `updated` on every write.

### Assessment

Written in two parts. The product check comes first and is presented on its own; the rest is added once the check's call is proceed or the user chooses to go on.

```markdown
## Assessment

### Product check
<table and call per product-check.md>

### Size
<S|M|L> — <the sizing signals that drove it, one line>

### Gaps
### Ideas
### Revised requirements
### Assumptions
### Blocking questions
```

- Product check: format, verdicts, evidence tags, and call rules in [product-check.md](shared/product-check.md). The `[assumed]` and `[inferred]` markers in the input tell the check what the user did not say; an empty Evidence section is itself a finding for the value row.
- Call proceed: add a decision-log line (`product check: proceed`) and continue with the size.
- Any other call: STOP. Present the check and ask the user to pick one:
  - **Proceed anyway.** Ask for the reason in chat; the decision-log line records the call and the reason. Continue with the size.
  - **Reshape.** Go back to the edit loop in [intake-interview.md](intake-interview.md) with the confirmed input and the call's suggested change shown under the summary. On start, overwrite the input sections, replace `### Product check` with a fresh check, and add a decision-log line `input reshaped`.
  - **Escalate.** `status: escalated`, per Escalation below.
  - **Cancel.** `status: cancelled`, a decision-log line with the call.
- The size subsection is written for every size, so an escalated record carries its reason. For M or L, write the product check, the size, and `### Gaps` only, then stop.
- Gaps: what lies behind the check's verdicts, ranked, short. A requirement that conflicts with a constraint is a gap and a blocking question. A usability gap names the acceptance criterion that closes it.
- Ideas: each marked adopt, optional, or reject with a one-line reason.
- Revised requirements: numbered, tagged, one acceptance criterion each. This list supersedes `## Requirements`, which stays as the user's original input. The plan and the build follow the revised list.
- Blocking questions: three at most; write `none` when there are none.

Present the assessment, then ask for approval of the revised requirements. The user answers the blocking questions in the same reply. An answer or a requested change that alters the list, or the size, is a revision: update the section, present it again, ask again. On a stated approval set `status: approved` and add a decision-log line.

### Plan

`## Plan`: files touched, steps, tests. Same approval rule: a change is a revision, not an approval. On a stated approval set `status: planned` and add a decision-log line.

### Shipped

`## Shipped`: each revised requirement as shipped, changed, or dropped, with a one-line note; the tests run and their result. When the repo has no test runner, write `no test runner` and the manual check that was done instead. Then `Not verified:` (anything that could not be checked, or `none`) and `Needs decision:` (or `none`). Set `status: shipped`.

## Escalation

Size M or L, or the user picks escalate after the product check: set `size` when it is known, `status: escalated`, add a decision-log line, and stop. Propose `feature-discovery` and name the record as its intake: Problem answers "Who has the problem", Evidence answers "Evidence" when it was provided, Done when answers "What success looks like", Constraints carry over; discovery asks for the current workaround, and for evidence when the section is empty. A product check already in the record is the starting point for discovery's own check.

## Resume

An argument is a resume request when it equals a record's slug or file name, or is a path to one. Several records with the same slug: take the latest date. Anything else is a new idea.

| Record state | Continue with |
|---|---|
| `confirmed`, no `## Assessment` | product check |
| `confirmed`, `### Product check` only, call not proceed and no decision-log line for it | present the check again and ask for the user's choice; do not redo it |
| `confirmed`, `### Product check` only, proceed recorded | size and the rest of the assessment |
| `confirmed`, `### Revised requirements` present | present the assessment again and ask for approval; do not redo it |
| `approved`, no `## Plan` | plan |
| `approved`, `## Plan` present | present the plan again and ask for approval |
| `planned` | build |
| `shipped`, `escalated`, `cancelled` | report the status and stop |
