# Product check

Four lenses on one idea: value, usability, viability, feasibility. Each gets a verdict, a reason, and its evidence; together they produce one call. The check is presented to the user every time, including when the call is proceed. It is feedback on the idea, not a gate the skill decides alone.

Used by `feature-quick` (first part of the assessment, before sizing), `feature-discovery` (before the failure analysis; the table goes into the brief), and `feature-retro` (grades each verdict against what happened).

## Sources

Read these before judging, and only these:

- The user's input: the quick record's sections, or the discovery intake.
- `docs/product.md`: audience, goals this year, constraints, out of scope.
- `AGENTS.md` or `CLAUDE.md` in the product repo: hard rules, scope decisions.
- Memory the harness loaded for this project (Claude Code auto memory, Codex memories): business rules, cost ceilings, owner preferences, decisions and their dates. Use what bears on the idea; do not open other projects' memory.
- Usability and feasibility only: the screens, components, and data the change touches.

When a memory fact and a repo document disagree, the repo document wins and the disagreement is a finding in the Why column.

## Lenses

| Lens | Core question | Check |
|---|---|---|
| Value | Will people want it, and does it matter to the product? | Who is affected, how often, how badly. What they do today instead and why they would switch. Which goal in `docs/product.md` it moves; none is a finding. Whether Done when measures an outcome for the user or the business, or only that something exists. What evidence was supplied. |
| Usability | Can they find it and get it done? | Steps from intent to result, against today. Found where the user already is, without explanation. What they must know, own, or enter first. Empty, loading, error, offline, permission-denied, and first-use states. Platform conventions; accessibility (labels, contrast, touch targets, screen reader). |
| Viability | Does it work for the business and its owner? | Fits the goals, constraints, and out-of-scope list. Running cost and upkeep against the budget: a new service, quota, or paid tier. Legal, privacy, store, platform-policy, and brand rules. What it displaces: other work on this product, the owner's time, recorded priorities. Conflicts with decisions already recorded in memory, decision logs, or earlier briefs. |
| Feasibility | Can we build it within the constraints? | Data, integrations, and algorithms it depends on. Platform limits. Whether anything like it exists in the repo. |

A usability risk that one acceptance criterion closes is not `weak`; note it and carry the criterion into the revised requirements. `weak` usability means the interaction itself fails as designed.

## Verdicts

| Verdict | Meaning |
|---|---|
| strong | Evidence supports it; no open risk in this lens. |
| adequate | Plausible; the risks are minor and do not change scope. |
| weak | A named risk would make the feature fail, harm the product, or break a recorded rule. |
| unknown | No evidence either way. The Why column says what would settle it. Not a polite `weak` or a hopeful `adequate`. |

Evidence tags, one or more per row:

- `stated`: the user's input.
- `repo: <path>`: a file in the product repo.
- `memory: <fact>`: a fact from the project's memory, in a few words.
- `web: <source>`: discovery only, from a scan.
- `assumed`: judgement with no source.

A verdict that rests only on `assumed` cannot be `strong`.

## Format

```markdown
### Product check
| Lens | Verdict | Why | Evidence |
|---|---|---|---|
| Value | <verdict> | <one line> | <tags> |
| Usability | <verdict> | <one line> | <tags> |
| Viability | <verdict> | <one line> | <tags> |
| Feasibility | <verdict> | <one line> | <tags> |

Call: <proceed | reshape | validate first | drop> — <one or two lines; for reshape the change, for validate first the test>
```

In a brief the heading is `## Product check`.

## Call

| Call | When | Discovery recommendation |
|---|---|---|
| proceed | No lens is `weak` | proceed |
| reshape | A `weak` lens is fixed by changing the scope or the solution; name the change | redesign the concept |
| validate first | Value or viability is `weak` or `unknown` in a way that decides whether to build at all, and a cheap test can settle it; name the test from the method menu in failure-analysis.md (full edition) | validate first |
| drop | Value or viability is `weak` and no reshape fixes it | abandon |

When several rows apply, the first of drop, validate first, reshape wins. An `unknown` that would change details but not whether to build becomes an assumption or a blocking question and does not block proceed. Any `weak` verdict rules out proceed. The user may override any call; the override and the user's reason go in the decision log.

## Example

```markdown
### Product check
| Lens | Verdict | Why | Evidence |
|---|---|---|---|
| Value | adequate | Shares give free reach; no signal on how often users want to share | assumed |
| Usability | weak | Two of three networks have no web prefill, so a tap lands on an empty composer | stated, repo: src/screens/Recipe.tsx |
| Viability | unknown | Fits "free, no paid backend"; age rules for alcohol content on the target networks not checked | repo: docs/product.md |
| Feasibility | strong | One component, no backend | repo: src/components/ |

Call: reshape — use the native share sheet plus copy-to-clipboard instead of one icon per network.
```
