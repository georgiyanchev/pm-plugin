# Lessons the scaffold applies

Cross-project lessons from the owner's earlier products, each with the template that applies it. A project's own lessons accumulate in its `docs/lessons.md`; when one holds for every project, add it here and to the template it belongs in.

| Lesson | Source product class | Applied in |
|---|---|---|
| AGENTS.md is the single source of truth for agents; CLAUDE.md is a pointer, never a second copy | consumer app, content site, web SaaS | `AGENTS.md` first paragraph; `CLAUDE.md` |
| Every command for the owner is PowerShell 5.1: no `&&`, Windows paths, one command per fenced block | all three | `AGENTS.md` → Owner environment |
| Ask before every production action; approval does not carry to the next; name the target host in every command | content site, web SaaS, consumer app | `AGENTS.md` → Production; `docs/hosting.md` |
| Back up before editing a server file, `nginx -t` before reload, keep a one-command rollback | all three | `AGENTS.md` → Production; `docs/hosting.md` → Deploy pattern |
| Secrets never in commands, files, or chat; `.env` untracked, `.env.example` tracked; public-prefix variables are public | consumer app | `AGENTS.md` → Production; `.env.example`; `.gitignore` |
| Commit explicit paths, never `git add -A`; several agent sessions may share one checkout | consumer app, content site | `AGENTS.md` → Working rules |
| Keep an out-of-scope list in AGENTS.md and date every lift | consumer app | `AGENTS.md` → Hard rules; `docs/product.md` → Out of scope |
| One voice document and one audience document are the only voice references; never derive voice from legacy content | consumer app, content site | `docs/product/voice.md`; `docs/product/target-audience.md` |
| Dated files are never overwritten; research is append-only; working files never sit in deliverable folders | web SaaS (SEO), consumer app (competitors) | `AGENTS.md` → Working rules; `docs/competitors/README.md`; `docs/SEO/AGENTS.md` |
| Record a decision with its date and who decided before acting on it; unrecorded decisions get re-litigated | web SaaS | `docs/decisions.md`; `AGENTS.md` → Decisions |
| Scripts print one summary line and put detail in a file | content site, web SaaS | `AGENTS.md` → Working rules |
| Verify by measuring, not by screenshots | content site | `AGENTS.md` → Working rules |
| Do not cut the manual pass on one real environment over real TLS before traffic moves | web SaaS release | `docs/release/checklist.md` → Before traffic moves |
| Test-mode bypasses hide production behaviour: assert public-route declarations statically | web SaaS release | `docs/release/checklist.md` → Before traffic moves |
| Validate secrets by shape (length, prefix, hash), never by presence | web SaaS release | `AGENTS.md` → Production; `docs/release/checklist.md` |
| A fix exposes the next defect: re-verify the surface, not the fixed rule | web SaaS | `docs/release/checklist.md` → After |
| Set the proxy's SSL mode before DNS moves; add the HTTPS redirect after | web SaaS release, consumer app | `docs/hosting.md` → Cloudflare |
| A runbook step corrected two paragraphs later is a defect; name the host per command | web SaaS release | `docs/ops/README.md`; `docs/release/checklist.md` |
| `TBD: owner to confirm` and `[assumption]` are the two markers for gaps and guesses | consumer app | `AGENTS.md` → Working rules; every template |
| Operator checklists live beside the product, one runbook and one log per process | consumer app | `docs/ops/README.md` |
| Keep a product terminology index in AGENTS.md (one line per term) with a reference card per term in `docs/terminology/`, populated proactively whenever a session learns an area; sessions stop re-exploring the same code | web SaaS | `AGENTS.md` → Product terminology; `docs/terminology/README.md` |
| Superseded documents move to an archive with a note saying what replaced them; status snapshots are not current status | web SaaS | `docs/archive/README.md` |
