# TBD: project name — agent guidance

Single source of truth for every agent working in this repository (Claude Code, Codex, Cursor, and any other tool). `CLAUDE.md` points here. Do not duplicate this content in other agent files; add a line here whenever the owner gives a standing instruction.

TBD: one paragraph: what the product is, for whom, and what it does today. Scope and status live in `docs/product.md` and `docs/product/INDEX.md`.

## Owner environment

- **Editor: Visual Studio Code. Shell: Windows PowerShell 5.1** (Windows 11). The owner does not use Git Bash.
- **Every command handed to the owner is PowerShell 5.1.** This covers chat replies, hand-off prompts, PR descriptions, and runbook steps for this machine. An agent's own tooling may still use POSIX syntax; the rule is about what the owner pastes.
- **No `&&` or `||`.** PowerShell 5.1 rejects them. Chain with `;` (runs the next command even if the first fails) or `A; if ($?) { B }` when B must wait for A to succeed.
- **Windows paths in double quotes** (`"C:\projects\..."`, never `/c/projects/...`). Run an executable by quoted path with the call operator: `& "C:\Program Files\...\x.exe"`.
- **Environment variables:** `$env:NAME = 'value'; node script.js`, not `NAME=value node script.js`. `export` does not exist.
- **No bash-only tools** in commands for the owner: no `grep`, `sed`, `head`, `tail`, `$(...)`, heredocs, `/dev/null`. Use `Select-String`, `Get-Content -Tail N`, `Select-Object -First N`, a here-string `@'...'@`, `$null`, or write the script to a file.
- **Quoting for native programs** (`node -e`, `git`): double quotes outside, single quotes inside. A bare `--` is dropped before it reaches a native executable; write it as `'--'`.
- **Binary pipes** (`tar`, images) must not pass through PowerShell 5.1, which re-encodes them as text: wrap the pipeline in `cmd /c '<pipeline>'`.
- **One command per fenced block tagged `powershell`**, no `$` prompt and no output inside the fence. Commands for a Linux host stay bash, and the message says which host they run on.

## Stack

TBD: runtime and versions, framework, data store, hosting, test runner, lint. One line each. Pin versions that matter and name the file they are read from.

## Hard rules

TBD: the rules that never bend in this project. Examples from the owner's other projects: which folder is the only one allowed to import a backend client; which file owns navigation; no colour literals outside the theme; URLs never change; secrets never in the repository.

**Out of scope, do not add, not even as a placeholder:** TBD: list. When the owner lifts an item, record it here with the date, for example "(lifted by the owner on YYYY-MM-DD; see `docs/product/<slug>/`)".

## Commands

```powershell
TBD: install
TBD: run locally
TBD: check (lint, typecheck, tests) — run before declaring any task done
TBD: build
```

## Structure

```
TBD: the folder tree with one line per folder saying what lives there
docs/   product, design, competitors, ops, release, plan — see "Where things are decided"
```

## Product terminology

Terms the owner uses without explanation, one line each with a link to its reference card in [docs/terminology/](docs/terminology/README.md) (URLs, code paths, gotchas, tests). Read the card before exploring that area instead of re-deriving it.

**Populate this proactively.** When the owner uses a term you had to ask about or look up, or a session spends real effort mapping an area that the next session would need again, add or update its card and its line here in the same session. Unwritten knowledge is paid for again by every session.

- (no terms yet)

## Working rules

- **Commit explicit paths** (`git add <files>`), never `git add -A` or `git commit -a`. Check `git diff --cached --stat` before committing and commit soon after staging: other agent sessions may share this checkout, and their commit takes whatever is staged at that moment.
- **Do not push unless the owner says so.** One logical commit at a time, with a clear message.
- **Keep changes inside the files a task names**; say so when you have to go outside them.
- **Be concise.** Report what failed and what was skipped. Do not paste file bodies, CSVs, or JSON into replies: write a script that prints one summary line and puts the detail in a file.
- **Verify by measuring** (the DOM, the check scripts, a command's exit code), not by screenshots. Take a screenshot only when the owner asks.
- **Record a decision before acting on it**: `docs/decisions.md`, with the date and who decided. Unrecorded decisions get re-litigated.
- **Dated files are never overwritten.** Research and audits are append-only: a new dated file or a dated `## Update` section. Working files (scripts, raw dumps, drafts) never sit in a deliverable folder.
- **Markers:** `TBD: owner to confirm` for a fact only the owner can supply; `[assumption]` for a line an agent inferred. Never present a drafted line as the owner's words.
- **If the same error survives three different attempts**, stub the piece behind its interface, mark it `STUB:` in code, record it in the build report under `docs/plan/`, and move on. Never remove authentication or persistence to make a build pass.
- The owner confirms on the real device or site anything that cannot be verified from the command line; say plainly which checks were run.

## Production

- **Ask before every production action** (deploy, DNS, server config, database change) and wait for a clear yes. Approval for one action does not carry to the next.
- **Name the target host in every command** you give the owner ("Run on `survey-latest`"). A production and staging mix-up has happened before.
- **Back up a file before editing it** on a server (timestamped copy), run `nginx -t` before `systemctl reload nginx`, and keep a one-command rollback.
- **Secrets never appear in commands, files, or chat.** `.env` is untracked; `.env.example` is tracked. Anything with a public prefix (for example `EXPO_PUBLIC_`, `NEXT_PUBLIC_`, `VITE_`) is bundled into the client and is public: never put a service-role or secret key there. Never enter credentials for the owner. When auditing a credential, print its length, prefix, and a hash, never the value.
- Shared server layout, Cloudflare settings, deploy and rollback patterns: `docs/hosting.md`.

## Where things are decided

- Product context, audience, goals, constraints, out of scope: `docs/product.md`
- Features and their status, parked ideas: `docs/product/INDEX.md`; each feature in `docs/product/<slug>/` (intake, brief, PRD, design, plan, retro)
- Small features without a brief: `docs/product/quick/`
- How the product sounds: `docs/product/voice.md`; who it is for: `docs/product/target-audience.md`
- Competitor facts: `docs/competitors/`; capability gaps: `docs/product/**/audits/`, inventory in `docs/product/capabilities.md`
- How it looks and the UI rules: `docs/design/DESIGN.md`
- Marketing and content: `docs/marketing/`
- Operator checklists and logs: `docs/ops/`
- Release checklist, privacy policy, store listing: `docs/release/`
- Development material (architecture proposals, options, reviews, technical notes): `docs/development/`
- Hand-off prompts and the build report: `docs/plan/`
- What the owner's product terms mean and where their code lives: `docs/terminology/`
- Decisions: `docs/decisions.md`; lessons: `docs/lessons.md`; hosting: `docs/hosting.md`
- Superseded documents: `docs/archive/` (historical only)

## Things that are easy to get wrong here

This section grows. Add an entry whenever an agent loses time to something that was not obvious: what it is, what to do instead, and where the rule is enforced.

## Decisions

Every decision with a date and who decided goes in `docs/decisions.md`. A rule in this file that came from a decision cites the date inline, for example "(owner's decision, YYYY-MM-DD)".
