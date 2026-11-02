# SEO workspace: agent instructions

This folder holds SEO audits and keyword research for TBD: product name, one folder per market.
Root: TBD: absolute path of this folder.

## Precedence

These rules override the default output paths in every SEO skill, plugin, and subagent (audit folders, PDF reports, findings files, keyword research, content plans). Plugin state and config directories under the user profile are fine; leave them where the plugins put them.

## Markets

| Code | Site | File slug |
|------|------|-----------|
| TBD: ISO country code | TBD: domain | TBD: slug |

If the market for a task is unclear, ask before writing files. For a new market, create `Audits/<CODE>/` and `Keywords/<CODE>/` with the ISO country code. A single-market product uses one row.

## Where files go

```
Audits/<CODE>/      final audit reports
Keywords/<CODE>/    final keyword lists and keyword reports
research/<slug>/    working files: scripts, raw crawls, SERP and autocomplete dumps, intermediate JSON
prompts/            reusable prompts
```

### Audits
- Single-file audit: `Audits/<CODE>/<slug>-seo-audit-YYYY-MM-DD.md`
- Multi-file audit: `Audits/<CODE>/<slug>-audit-YYYY-MM-DD/`, containing the full report, action plan, PDF, and `findings/`. Do not create an audit folder in the current working directory.

### Keywords
- Final deliverables only: keyword lists (`.csv`, `.xlsx`), keyword reports and plans (`.md`), page maps.
- Name files `<slug>-<type>-YYYY-MM-DD.<ext>`.
- Add subfolders when a market accumulates many files (for example `Keywords/<CODE>/Final/`).

### Working files
- Never put scripts (`.py`, `.js`, `.mjs`), raw data dumps (`.json`, `.tsv`, `.txt`), or intermediate drafts in `Audits/` or `Keywords/`.
- Put them in `research/<slug>/`, or in the session scratchpad if they are throwaway.

## Rules for every task

1. Use absolute paths when writing outputs. Relative paths resolve against whatever the current shell or subagent directory happens to be.
2. When delegating to a subagent, put the absolute output folder in its prompt. Subagents may not see this file.
3. When running a plugin script that writes files, pass an explicit output path under `Audits/<CODE>/` or `Keywords/<CODE>/`.
4. Use today's date (`YYYY-MM-DD`) in filenames. Never overwrite an earlier dated report; write a new dated file instead.
5. At the end of a task, list the absolute path of every final file you saved.
