---
name: project-scaffold
description: Use when starting a new product or project folder, or when checking an existing one for the product documents, agent guidance, and conventions it still lacks.
---

# Project Scaffold

## Overview

Sets up the product side of a project (not the code): the folders and documents every project of the owner's ends up with, pre-filled with the owner's standing conventions and `TBD:` where project facts belong. On an existing project it creates only what is missing and reports what is still a template. One input: the target folder. The checklist is [manifest.md](references/manifest.md); the conventions baked into the templates are in [lessons.md](references/lessons.md).

## Procedure

1. **Folder.** The argument is the project root; with none, the current folder. The script creates it if absent.
2. **Scaffold.** Run `powershell -NoProfile -ExecutionPolicy Bypass -File "<this skill folder>\scripts\project-scaffold.ps1" -Root "<folder>"`. Show the report as printed. `-Check` reports without creating. The script never overwrites. A `skipped` row or the note `CLAUDE.md holds guidance` needs the owner: offer to move that guidance into `AGENTS.md` and make `CLAUDE.md` the pointer; do it only when they say so.
3. **Fill what the user said.** When the message carried product facts (name, one line, audience, platform), write them into `README.md`, `AGENTS.md` (the title and first paragraph; platform goes there and in `docs/product.md` Constraints, never in Stack), and `docs/product.md`. Replace only the `TBD:` line that asks for the fact; when a line asks for several facts and the user gave some, write the known ones and leave one `TBD:` line for the rest. A rephrasing of the user's words is theirs; anything they did not say is `[assumption]`. Edit with the Edit tool so LF and UTF-8 without BOM survive. Read no source files, search nothing.
3b. **From discovery.** When the user names a discovery run or a Development handoff, fill the context files per [from-discovery.md](references/from-discovery.md): every line tagged with source and claim class, hypotheses `[hypothesis]`, competitor research exported with `export-competitors`. An adopted architecture document in the run folder with `pending_records` is moved and its records applied (same file).
4. **Next.** A row is a template when its TBD count is above zero, whatever the state says. List those in this order: `docs/product.md`, `AGENTS.md` (hard rules, out of scope, stack, commands), `docs/product/voice.md`, `docs/product/target-audience.md`, `docs/hosting.md`, then the rest. Name the optional rows still empty so the owner can delete what does not apply. `docs/terminology/` starts empty by design: it fills as sessions learn the owner's terms (see `AGENTS.md` → Product terminology), so an empty state there is not a gap. Say which skills now work on the folder: `feature-pipeline`, `feature-quick`, `capability-gap-audit`. Offer to draft any section.

## Outputs

The manifest's rows in the project folder, the report in chat, the user's facts in the three context files. The folder is pipeline-ready.

## Common mistakes

- Overwriting or "improving" an existing file. The script never does; neither does the skill.
- Asking for the stack, platform, or name before running the scaffold. It needs only the folder.
- Treating an optional row that is `empty` as a gap. It is a candidate for deletion.
- Reading source files to fill `AGENTS.md`. Facts come from the user; Stack stays `TBD:`.
- Presenting a drafted line as the owner's. Drafted lines keep `[assumption]` until the owner edits them.

## Harness notes

- Claude Code: `/pm:project-scaffold [folder]`; script at `${CLAUDE_PLUGIN_ROOT}/skills/project-scaffold/scripts/project-scaffold.ps1`. No question picker needed.
- Codex or any harness reading `~/.agents/skills/project-scaffold`: run the same script from that folder's `scripts/`; manifest and templates sit beside it under `references/`.
