# Sizing

Decided at Gate 1, recorded in the brief's frontmatter `size` field and `## Size` section. Size selects how much of the pipeline runs. When in doubt, pick the larger size; it is cheaper to skip a PRD section than to discover a missing data model mid-build.

| Size | Signals (any one is enough for that size or larger) | Path |
|---|---|---|
| S | One screen or component touched; no data-model change; no new dependency or service; roughly a day of agent work | brief → plan (bounded) → build → retro |
| M | New screen(s) or a data-model change; no new subsystem; existing services suffice | brief → PRD-lite → optional design → plan → build → retro |
| L | New subsystem, external integration, new persona or role, or a cross-cutting change touching many flows | brief → full PRD → design → architecture review → plan → build → retro |

## How to state it

In the brief's `## Size` section write the size and the signals that drove it, one line each. Example: "M — adds an ingredients table and a new My Bar screen; recipe filtering reuses the existing query layer."

## Overrides

The user may override the size. Record the override and the reason in the brief's decision log.
