# Artifact conventions

Every feature that goes through the pipeline leaves its artifacts in the product repo. The plugin holds the process; the repo holds the record. The pipeline derives state from these files and their frontmatter, never from conversation memory.

## Folder layout

```
docs/
  product.md                 one-page product context (see product-context-template.md)
  product/product-requirements.md   whole-product PRD for a new product (product-prd); gate decision in its frontmatter
  product/one-pager.md       one-page executive pitch for the product (product-one-pager); sponsor decision in its frontmatter
  product/
    INDEX.md                 one row per feature
    <slug>/
      00-intake.md           five intake fields
      01-brief.md            feature brief; Gate 1 decision lives here
      02-prd.md              requirements (lite or full); Gate 2 decision lives here
      03-design/             concept pages, README.md with chosen directions
      03-design/prototype/   clickable prototype of the feature (product-prototype), when one was built
      one-pager.md           feature-scope executive pitch (product-one-pager); out-of-band, no INDEX.md row
      04-plan.md             implementation plan, or a link to the plan the harness produced
      05-retro.md            results against the brief
      audits/                feature-scope capability gap audits, dated
    audits/                  product-scope capability gap audits, dated
    quick/                   quick-track records, one dated file per small feature
    prototypes/<slug>/       product-scope clickable prototypes (product-prototype); out-of-band, no INDEX.md row
    capabilities.md          living capability inventory, refreshed by each audit
  competitors/               competitor knowledge base; read first, appended last by capability-gap-audit
```

## Slug

Kebab-case from the feature name: lowercase letters, digits, single hyphens. `my-bar`, `recipe-sharing`, `bulk-export`. The slug is the folder name and appears in every artifact's frontmatter. `audits` and `quick` are reserved folder names and cannot be slugs.

## Frontmatter schemas

### 00-intake.md

```yaml
title: string
slug: kebab-case
created: YYYY-MM-DD
```

### 01-brief.md

```yaml
title: string
slug: kebab-case
status: draft | validating | approved | specced | designed | planned | building | shipped | iterating | stopped | rejected
decision: pending | go | validate-first | no-go
decision_date: YYYY-MM-DD | null
size: S | M | L | null
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

### 02-prd.md

```yaml
title: string
slug: kebab-case
tier: lite | full
decision: pending | approved | cut | hold
decision_date: YYYY-MM-DD | null
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

### one-pager.md

```yaml
title: string
slug: kebab-case
kind: one-pager
scope: product | feature
audience: string
sources: {run, prototype, brief, prd, product_context}  # path or null each
decision: pending | approved | revise | declined
decision_date: YYYY-MM-DD | null
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

Written by `product-one-pager` at `docs/product/one-pager.md` (product scope) or `docs/product/<slug>/one-pager.md` (feature scope); without a product repo, beside the discovery run in the ideas root. Out-of-band: no INDEX.md row, no change to a brief's `status`. The sponsor's decision is recorded only when the owner reports it; a page with a recorded decision is not rewritten, a new pitch is a new dated file (`one-pager-<YYYY-MM-DD>.md`) beside it. Template and rules: `skills/product-one-pager/references/one-pager-template.md`.

### 05-retro.md

```yaml
title: string
slug: kebab-case
shipped_on: YYYY-MM-DD
reviewed_on: YYYY-MM-DD
```

### quick/<YYYY-MM-DD>-<slug>.md

```yaml
title: string
slug: kebab-case
track: quick
status: confirmed | approved | planned | shipped | escalated | cancelled
size: S | M | L | null
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

Written by `feature-quick` once the user confirms the interview summary. Body: the confirmed input under the quick-feature template's headings, then `## Assessment` (opening with `### Product check`), `## Plan`, and `## Shipped` appended as each step completes, then `## Decision log`. Layout and resume rules: record.md (full edition).

| Status | Meaning |
|---|---|
| confirmed | input confirmed by the user; record written; the product check and assessment are added under this status |
| approved | revised requirements approved |
| planned | plan approved |
| shipped | built and reported |
| escalated | sized M or L, or escalated from the product check, and handed to `feature-discovery` |
| cancelled | stopped by the user after confirmation |

Quick records are out-of-band: no INDEX.md row, and the pipeline's status report does not read them.

### audits/<YYYY-MM-DD>-capability-gaps.md

```yaml
title: string
scope: product | feature
slug: kebab-case | null
audited_on: YYYY-MM-DD
competitors: [list]
gaps:
  table_stakes: integer
  differentiator: integer
  depth: integer
  unmet: integer
prior_audit: path | null
```

`slug` is null for product scope. The skill asks where to save the audit. Default: `docs/product/audits/` (product) or `docs/product/<slug>/audits/` (feature) in the product repo. When the session is not inside a product repo (no `docs/product.md` and no `docs/product/`), the default is `<current folder>/docs/audits/` and the skill says so. Audits are out-of-band: they do not change the brief's `status`. A `*.progress.md` file in an audit folder is a run's working state per the capability-gap-audit `progress-file.md`; it has no frontmatter and the status report skips it.

### capabilities.md

```yaml
title: string
updated: YYYY-MM-DD
last_audit: path
```

Body: the taxonomy table from the capability-gap-audit skill with `Ours` in `have | partial | missing`.

## Status transitions

| From | To | Set by | When |
|---|---|---|---|
| (none) | draft | feature-discovery | brief written |
| draft | validating | feature-discovery | Gate 1 = validate-first |
| draft, validating | approved | feature-discovery | Gate 1 = go |
| draft, validating | rejected | feature-discovery | Gate 1 = no-go |
| approved | specced | feature-prd | Gate 2 = approved |
| specced, approved | designed | feature-design | design README written |
| approved, specced, designed | planned | feature-pipeline | 04-plan.md exists |
| planned | building | feature-pipeline | user says implementation started |
| building | shipped | feature-retro | retro written, next = done |
| shipped | iterating | feature-retro | retro next = iterate or expand |
| any | stopped | feature-retro or user | work abandoned after approval |

Size S skips `specced` and `designed`.

## INDEX.md

```
| Slug | Title | Size | Status | Updated | Next step |
```

`Next step` is the skill or external step that should run next (`discovery`, `prd`, `design`, `architecture`, `plan`, `build`, `retro`, `done`). An empty size is written as `-`.

## Competitor knowledge base

`docs/competitors/` holds the product's competitor research in whatever layout the owner uses (by market, by topic, dated files). The audit asks the user for one or more research folders first; `Competitor research: <path>[, <path>]` under `## Related docs` in `docs/product.md` answers that question without asking. When none exists the audit researches from scratch and creates the default folder. The capability-gap-audit skill reads the folder before any web search and appends new facts after review. Append only: dated `## Update` sections, new dated files, a `README.md` index; prior prose is never edited. Rules in knowledge-base.md (full edition).

## Target audience

`docs/product/target-audience.md` is the single source for segments (`S-xx`), personas (`P-xx`) and jobs (`J-xx`). Section A (summary: recommendation, primary segment, who decides and who pays, jobs table, not the target, persona index with confidence) is what every skill reads; section B (insights: why, segment comparison, secondary segments, pains and current alternatives, persona cards, questions and search language, channels, reach signals, confidence and open questions, dated Updates, sources) is the evidence. The `audience-research` skill fills the file from research: each claim line ends with a tag (`[fact: E-..]`, `[inference: E-..]`, `[stated]`, `[hypothesis]`) pointing at the ledger in `docs/product/audience-research/<date>/evidence.md`, and each segment, persona and job carries a confidence (`validated`, `supported`, `thin`, `hypothesis`); a skill that cites a `thin` or `hypothesis` persona says so. Briefs, PRDs, prototype briefs, one-pagers and quick records cite the IDs and add only what is specific to them (the moment, the delta). A new segment, persona or job found anywhere is appended to the file (card, row, Updates line with its source and tag) before the document cites it. Without a product repo the document mints the IDs and `project-scaffold` carries them into the file. Template: `skills/project-scaffold/references/templates/docs/product/target-audience.md`.

## Rules

- An invalid enum value in any frontmatter field is reported with the file and field, and the run stops. Do not guess the intended value.
- Gate decisions are recorded only when the user states them. The skill proposes; the user decides.
- `updated` changes whenever the file body changes.
- Artifacts are Markdown. Tables for metrics, risks, and requirements; bullets for scope lists.
