# Changelog

Both editions share one version number. The free edition carries the four skills listed in the README; the full edition carries all eighteen.

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
