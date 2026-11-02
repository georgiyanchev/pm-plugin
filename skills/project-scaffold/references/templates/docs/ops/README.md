# Operations

The owner's checklists and logs for running the product. One file per process, in plain steps the owner can follow without the agent.

A runbook (`<process>.md`) has three parts: **owner's steps, once** (setup, in order, each with what it unlocks), **recurring steps** (what to do when a request, alert, or report arrives), and **what to check** (how to confirm it worked). Every step that needs a credential says where the owner enters it; the value never appears in the file.

A log (`<process>-log.md`) is a dated table of what happened, appended, never rewritten. Examples from other projects: handling an emailed account-deletion request and its log; reading and clearing user feedback; rotating a key.
