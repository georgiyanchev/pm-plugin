---
name: feature-quick
description: Use when a small feature or enhancement on an existing product should skip discovery and the brief, when the user asks for the quick track, or when a filled quick-feature template is pasted.
---

# Feature Quick

## Overview

The quick track for size S work: one intake, a product check on value, usability, viability, and feasibility, three stops (four when the check's call is not proceed), then build. The user's input is collected and confirmed before any work starts, then saved to `docs/product/quick/` in the product repo. Size M or L escalates to `feature-discovery`.

## Procedure

1. **Resume.** List `docs/product/quick/`. When the argument names a record there, follow the resume rules in [record.md](references/record.md). Otherwise go to 2.
2. **Interview.** Follow [intake-interview.md](references/intake-interview.md). Pre-fill from the user's text and the repo's context files. Ask only the missing sections, one per message. Accept `skip` and `draft`.
3. **Confirm.** Print the filled template as the summary, then ask: start, edit, or cancel. Apply each edit and reprint until the user says start. STOP here every time; before start there is no source reading, no web search, no subagent, no assessment.
4. **Record.** Write `docs/product/quick/<YYYY-MM-DD>-<slug>.md`, `status: confirmed`, per record.md.
5. **Check.** Task step 1: run [product-check.md](references/shared/product-check.md). Append `## Assessment` with `### Product check` and present it. Call proceed: go to 6. Any other call: STOP; the user picks proceed anyway, reshape, escalate, or cancel, per record.md.
6. **Assess.** Task steps 2–5 of [quick-feature-template.md](references/quick-feature-template.md). Size the work with [sizing.md](references/shared/sizing.md). Add the size and the rest of the assessment. M or L: `status: escalated`, stop, propose `feature-discovery` with the record as intake. S: STOP for approval of the revised requirements, then `status: approved`.
7. **Plan.** Task step 6. Append `## Plan`. STOP for approval, then `status: planned`.
8. **Build.** Task step 7. Append `## Shipped`. `status: shipped`.

## Outputs

One record per quick feature in `docs/product/quick/`, updated at every step. No INDEX.md row.

## Common mistakes

- Reading source files or assessing the idea while the interview is still open. The summary plays the input back; it does not judge it.
- Asking for a section the user already supplied, or for tags one requirement at a time.
- Treating a drafted section as the user's words. Drafted lines keep `[assumed]` until the user edits them.
- Taking "looks good, but change X" as start or as approval. It is an edit: apply, show again, ask again.
- Writing `approved` or `planned` because the assessment or plan was presented. The user states each approval.
- Carrying on with size M work because the interview is already done. Escalate; the record becomes the intake.
- Judging only feasibility because the code is the easiest evidence to read. Value and viability come first and draw on `docs/product.md` and the project's memory.
- Folding a `weak` value or viability verdict into the gaps list and carrying on. Any call other than proceed is a stop.

## Harness notes

- Claude Code: `/pm:feature-quick <idea, slug, or pasted template>`. Choices (platform, start/edit/cancel, approvals) use the AskUserQuestion picker; prose sections are plain chat prompts.
- Codex or any harness without a question picker: same sections, same order, every question in plain chat.
