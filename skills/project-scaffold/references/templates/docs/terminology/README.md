# Product terminology

One reference card per term the owner uses without explanation ("the builder", "the take page", "marketing pages"). The one-line definitions live in `AGENTS.md` → Product terminology; the cards hold what an agent needs to start work in that area without re-exploring the code: URLs, routes, code paths, data, access rules, gotchas, tests and checks. An agent reads a card only when its task touches that area, so `AGENTS.md` stays short.

| Term | Card |
|---|---|

## Adding or updating a term

1. **When.** The owner uses a term an agent had to ask about or look up, or a session spends real effort mapping an area (where a feature lives, how a request flows, why something breaks) that the next session would need again. Write it down in the same session, not later.
2. **Card.** `<term>.md` in this folder: a one-paragraph definition in the owner's words, how it relates to the other terms, then URLs, code paths, behaviour, gotchas, tests. Paths relative to the project root. Put `Verified YYYY-MM-DD` under the definition.
3. **Index.** Add a row to the table above and a one-line entry, with the card link, to `AGENTS.md` → Product terminology.
4. **Keep it true.** A change that moves files or routes a card names updates the card in the same commit. A fact you could not confirm is marked `[unverified]`, never stated as fact.
