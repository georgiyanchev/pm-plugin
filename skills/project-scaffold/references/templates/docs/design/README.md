# Design

`DESIGN.md` is the one design reference: read it before touching anything a user sees. Everything else in this folder supports it:

- `concepts/`: concept rounds per screen (`feature-design` writes here), previous rounds kept.
- Image and photo prompts (`*.prompt.md`): the prompts that produced the product's imagery, so they can be re-run.
- Dated proposals (`YYYY-MM-DD-<topic>.md`): a direction put to the owner; once decided, the rule moves into `DESIGN.md` and the decision into `../decisions.md`.

The values themselves (tokens) live in code; `DESIGN.md` names the file. If the two disagree, the tokens win; fix the document.
