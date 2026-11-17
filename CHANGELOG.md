# Changelog

Both editions share one version number. The free edition carries the four skills listed in the README; the full edition carries all twenty skills and twenty agents.

## 0.19.0 (2026-11-17)
- New skill `audience-research`: researches the target audience of an idea, a product or a feature and fills `docs/product/target-audience.md`. One scoping message (geography is never assumed), your own data and prior research first, three to five candidate segments defined by situation and behaviour, four research lenses (people and sizes, voice, questions and search language, market and spend), one stop where you pick the primary segment. Every claim line ends with a tag pointing at an evidence ledger kept in `docs/product/audience-research/<date>/`; every segment, persona and job carries a confidence. Desk research tops out at `supported`: `validated` needs your own data or people you talked to, and each weak row names the cheapest next test. Depths quick, standard and deep.
- New agents `audience-scanner` (one per lens) and `audience-research-reviewer` (Fable, read-only), so the plugin has twenty skills and twenty agents. New script `audience_check.py` checks the file against its ledger before review.
- `audience-research`, after its first live run: a search route check before dispatch (when the search tool does not return local results, voice runs inline through a browser on the country's search engine); scanners write their own part files; a post counts only when its page was opened; a score above 1 and a confidence above `hypothesis` need a row someone read; a population with no rate for the job is a ceiling, one figure; personas are named by role unless a source gives a name, age or place; "no primary yet" and "pause until the data is read" are answers at the stop; a second review pass after a blocker. `audience_check.py` now also flags a `[fact]` on a computed or rounded figure, a ceiling written as a range, a claim about who pays that rests on vendor pages, a confidence resting on unread rows, and a persona ranked above its segment.
- The `target-audience.md` template gains Who decides and who pays, a Confidence column on personas, Segment comparison, Pains and current alternatives, Questions and search language, Channels and communities, Confidence and open questions, and three persona card lines (Trigger, Today they use, Evidence). Every earlier section is kept; a file made from the older template still works and the check names the sections it lacks.

## 0.18.0 (2026-11-12)
- `capability-gap-audit` and discovery now do all competitor research through `competitor-research`. New component `ratings`: one `competitor-profiler` per competitor rates the audit's capability list and reports capabilities the list lacks. The agent `competitor-capability-mapper` is retired, so the plugin has eighteen agents.
- Gap audit, notes: when prior research is Markdown, step 4 runs `competitor-knowledge-scanner` in `record` mode, so the facts in the notes reach the profilers as evidence rows they cite instead of opening the pages again. A URL a prior record already holds gets no second row.
- Gap audit, new rows: capabilities the profilers report are folded into the taxonomy first; then each live direct competitor gets one second `ratings` dispatch for its open and newly folded in-boundary rows. There is no third round. This costs more agents: in most audits, one more profiler per live direct competitor.
- Gap audit, unknown limit: it counts in-boundary rows only (an out-of-boundary row is marked `(out-of-boundary)` in the Capability cell). A direct column still over the limit after its second dispatch is named, with its cause, on a `second dispatch:` line in the method notes, which `audit-check.py` and the review accept. A complaint source is written `direct, complaint source` in the Tier cell and is exempt.
- `research_tool.py` gains a `cells` command that prints the audit matrix cells from a record, by one table (`Strong` and `Adequate` are `has`, `Weak` is `partial`, `Absent` is `none`). A rating may carry an optional `note` for a plan gate or restriction. A claim whose only evidence is unverified now prints `unknown`, where earlier audits showed a value tagged `unverified`, so a diff against an older audit shows such cells as changed.
- An evidence-check downgrade is written to the record: the rating becomes `?`, so the knowledge base and later runs do not carry it.
- `profile.ratings` entries are now checked by the schema: a record whose ratings hold a key the schema does not name, or a value outside the scale, fails `validate`. `check` reports a capability rated twice for one competitor or for the subject.
- Each audit keeps its research record in `<audit folder>/<date>-research/` (in place of `<date>-competitor-map.json`) and indexes that folder in the registry. A research run copies the cells of an audit that has a record with no translation; an older audit kept only as Markdown is still translated. An audit cites a research run's fresh evidence and carries a cell whose evidence is all fresh instead of looking it up again.
- Knowledge base: one file per competitor, `<competitor-id>.md`, for research runs, audits and discovery exports. `competitors-<date>.md` is no longer written; older ones are still read. The audit's demand table moves into `capabilities-<date>.md`.
- `export-competitors` writes one file per competitor and the README rows, and prints `written` as the list of files it changed. A later export of the same run writes a new section, headed with the export date, only for a competitor whose lines changed (after the deep dive is committed, or a stage is corrected); with nothing new it writes nothing. The deep dive's business model, target segment, moat and vulnerability now reach the file.
- Discovery: before the competitor identifier, in `discovery-prove-idea` and ad hoc, the session runs `map` and feeds the record to the stage. The identifier keeps at most fifteen competitors of a larger record (first those its own minimums need, then by level), names the rest, and keeps a restated verified row verified. The demand stage cites the deep dive's pricing and review evidence and opens a page again only when its evidence is stale.
- Prompt versions: competitor identifier 2.4.0, deep dive 2.2.1, customer demand 2.1.0. A pack prepared under 0.17.0 for one of these stages must be prepared again.
- Behaviour changes: a vendor's own page, read live, now supports a `has` cell; audit ratings run on the profiler's model (Opus), so with the second dispatch an audit costs more than under 0.17.0; `Absent` needs a list the page presents as complete; the `Prior status` column is gone, the diff section lists changed cells; the taxonomy keeps its row IDs from one audit to the next for the same scope.

## 0.17.0 (2026-11-12)
- New skill `competitor-research`: one place for all competitor research. Asks the purpose, reads prior research first, maps the buyer's alternatives across six levels, stops once to confirm which go deep, and writes a brief, a one-pager and print pages from one JSON record. Three presets (high-level, standard, deep).
- `research_tool.py` inside the skill: record schema and validation, merge of agent parts, reuse of prior research through a registry at the ideas root, all-in pricing and break-even, mechanical checks on the record and the brief, Markdown and HTML rendering.
- New agents `competitor-profiler`, `customer-voice-scanner` and `competitor-research-reviewer`; `competitor-scanner` gains map and moves modes; `competitor-knowledge-scanner` reads prior records and Markdown research.
- `feature-discovery` uses its scan, `capability-gap-audit` its reuse and map (and registers its audit folder), and the discovery deep dive its profiler: one `deep` part per approved competitor, in parallel, with prior evidence and pricing captured, not computed; the deep dive is assembled from the parts. The competitor identifier accepts a `map` record when one is supplied. Ad hoc stages see the evidence of stages already committed in their folder, and discovery runs add a registry line so later research finds them.
- `audit-check.py` flags a matrix row as a pricing tier only when its capability name is a tier label.

## 0.16.4 (2026-10-30)
- `TEMPLATES.md` document map rendered as one block per document, grouped by stage.

## 0.16.3 (2026-10-30)
- Document map readable on GitHub: file-name links, one section per line.

## 0.16.2 (2026-10-30)
- Main sections column in the document map.

## 0.16.1 (2026-10-30)
- `TEMPLATES.md`: every document the pipeline writes with its template, checklist, output path, writers, readers and gate; validated by `validate.py`.

## 0.16.0 (2026-10-30)
- `docs/product/target-audience.md` is the single source for segments, personas and jobs (`S-xx`, `P-xx`, `J-xx`); briefs, PRDs, prototype briefs and one-pagers cite by ID.

## 0.15.0 (2026-10-29)
- Competitor links in discovery outputs.

## 0.14.0 (2026-10-29)
- New skill `product-one-pager`: one-page executive pitch with sponsor decision (approve, revise, declined).

## 0.13.0 to 0.13.2 (2026-10-22)
- New skill `delivery-review`: evidence file, independent build reviewer, device script, owner close, fix loop through `delivery-build`.

## 0.12.0 (2026-10-22)
- New skill `delivery-build`: one implementation prompt per milestone from an adopted architecture, run unattended in a fresh coding session.

## 0.11.0 to 0.11.2 (2026-10-22)
- New skill `delivery-architecture`: interview, stack proposal, full architecture document, independent review, owner's adopt decision.

## 0.10.0 to 0.10.1 (2026-10-21)
- New skill `product-prd`: whole-product PRD from a discovery run, prototype or product context; Phase 1 capped at ten functional requirements, asks before going higher.

## 0.9.0 (2026-10-21)
- New skill `product-prototype`: clickable happy-path HTML prototype from a run, brief, PRD or described idea; direction round, decision log, tour panel, hypothesis badges, `check_prototype.py`.

## 0.8.0 to 0.8.6 (2026-10-20)
- New skill `discovery-explore`: landscape scan above the industry level.
- Discovery stages split into a Sonnet researcher and an Opus analyst; run-level model override; runner hardened after a real assessment run; correction provenance and stated claims recorded.
- `install.ps1` removes stale Codex junctions and refreshes the AGENTS pointer.

## 0.7.0 to 0.7.2 (2026-10-20)
- Discovery track merged into the plugin: `discovery-pipeline` (hub and deterministic runner), `discovery-review-idea`, `discovery-prove-idea`.

## 0.6.1 (2026-10-20)
- New skill `project-scaffold`: product-side project setup with pre-filled documents and a check mode.

## 0.5.0 to 0.5.1 (2026-10-17)
- Product check on value, usability, viability and feasibility in both tracks.
- `release.ps1` ships with the plugin.

## 0.4.0 to 0.4.1 (2026-10-11 to 2026-10-17)
- New skill `feature-quick`: quick track for size S work.
- Prompting guidance applied across skills.

## 0.3.0 to 0.3.1 (2026-10-09)
- New skill `capability-gap-audit`: inventory, competitor matrix, demand evidence, ranked gaps.

## 0.2.0 (2026-10-07)
- Feature pipeline: `feature-pipeline`, `feature-discovery`, `feature-prd`, `feature-design`, `feature-retro` with reviewer and scanner agents.

## 0.1.1 (2026-10-06)
- Plugin skeleton, validator, release procedure.
