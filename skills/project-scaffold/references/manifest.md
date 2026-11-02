# Scaffold manifest

Every folder and file the scaffold knows. The script creates what is missing from `templates/<Path>` and reports the state of every row; this table is also the checklist a project is measured against.

- `Path` is relative to the project root. A trailing `/` is a folder row; its README comes from `templates/<Path>README.md` and belongs to the row.
- `Required`: `yes` or `optional`. Optional rows are reported apart so they can be deleted when they do not apply.
- `Create`: `always`, or `new repo only` (skipped when the project already has a `.git` entry).
- `Purpose` is the one line the report and the folder README use. `Read by` names who consumes the file.

| Path | Required | Create | Purpose | Read by |
|---|---|---|---|---|
| AGENTS.md | yes | always | Single source of truth for every agent: stack, rules, commands, structure, where things are decided | every agent; CLAUDE.md points here |
| CLAUDE.md | yes | always | Three-line pointer to AGENTS.md | Claude Code |
| README.md | yes | always | What the project is, in one line, and where to read next | people |
| .env.example | yes | always | Every environment variable with a comment; the tracked twin of the untracked .env | owner, agents |
| .gitignore | yes | always | Baseline ignore list: secrets, dependencies, build output, OS and editor files | git |
| .gitattributes | yes | new repo only | LF line endings for every text file | git |
| docs/product.md | yes | always | One-page product context: audience, goals, constraints, metrics, design system, out of scope | pm feature-pipeline, feature-quick, capability-gap-audit |
| docs/product/ | yes | always | Product material: one folder per feature, the feature index, quick-track records, audits, the capability inventory | pm skills |
| docs/product/INDEX.md | yes | always | One row per feature with status and next step, plus ideas parked for later | pm feature-pipeline |
| docs/product/voice.md | yes | always | How the product sounds: the only voice reference for every piece of user-facing text | agents writing copy, reviewers |
| docs/product/target-audience.md | yes | always | The only place segments, personas and jobs are defined (`S-xx`, `P-xx`, `J-xx`): section A summary cited by every brief, PRD, prototype brief and one-pager, section B evidence | agents, pm feature-discovery, feature-prd, product-prd, product-one-pager, product-prototype |
| docs/product/quick/ | optional | always | Quick-track records, one dated file per small feature | pm feature-quick |
| docs/competitors/ | yes | always | Competitor knowledge base: dated, append-only facts with an index README | pm capability-gap-audit, feature-discovery |
| docs/design/ | yes | always | The design reference and the concept rounds and image prompts beside it | agents touching UI, pm feature-design |
| docs/design/DESIGN.md | yes | always | The one design reference: mood, owner preferences, tokens, type, components, accessibility, anti-patterns | agents touching UI |
| docs/design/concepts/ | optional | always | Concept rounds per screen, previous rounds kept, credits for borrowed assets | pm feature-design |
| docs/marketing/ | yes | always | Marketing plan, content pipeline, channels, launch notes | owner, agents writing content |
| docs/marketing/plan.md | yes | always | Positioning, channels, launch plan, content pipeline, measurement | owner, agents writing content |
| docs/SEO/ | optional | always | SEO workspace: audits, keyword research, working files, with its own agent rules | SEO skills and plugins |
| docs/SEO/AGENTS.md | optional | always | Where SEO files go and the rules every SEO task follows; overrides plugin defaults | SEO skills and plugins |
| docs/ops/ | yes | always | Operator checklists and logs: one runbook per process, one log per process | owner |
| docs/release/ | yes | always | Release artifacts: the checklist, the privacy policy, store listing copy, submission hand-offs | owner, agents preparing a release |
| docs/release/checklist.md | yes | always | What must be true before a listing, before traffic moves, and after | owner |
| docs/terminology/ | yes | always | One reference card per product term the owner uses (URLs, code paths, gotchas, tests), indexed from AGENTS.md; grows as sessions learn | every agent before exploring an area |
| docs/development/ | yes | always | All development material in one folder: architecture proposals and reviews, dated options comparisons, other technical notes; decisions themselves go in docs/decisions.md | agents, pm feature-prd, pm delivery-architecture |
| docs/plan/ | yes | always | Implementation prompts per milestone, hand-off prompts and the build reports | agents picking up work, pm delivery-build |
| docs/archive/ | yes | always | Historical record only, never current status; move here, never delete | nobody by default |
| docs/decisions.md | yes | always | Dated decision log: what, who decided, where applied | every agent before acting |
| docs/lessons.md | yes | always | Dated lessons from this project; harvested into the scaffold skill by hand | owner, the next project |
| docs/hosting.md | yes | always | The owner's shared server and Cloudflare layout, pre-filled, with this project's slots to fill | agents deploying |
