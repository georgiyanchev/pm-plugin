*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

# Plateful technical prototype: implementation prompt

Review gate: first milestone

## Launch gate (owner, before starting the session)

Tick each line or write `deferred: <reason>`; a deferred line becomes a stub for the agent.

- [ ] H-01 Create the database project: host console, region near the first users, copy the project URL and public key into `.env`. 15 minutes. Hands back: both values in `.env`.
- [ ] H-02 Set the auth redirect allowlist to the app scheme and the development URL; enable anonymous sign-in. 10 minutes. Hands back: confirmation in chat.
- [ ] H-03 Install the Expo development client on your phone and put the phone on the same Wi-Fi as the computer. 20 minutes. Hands back: the client version shown in its settings.
- [ ] Keep-awake on, laptop plugged in, permission mode set to run installs, writes and git without prompts.

## Role

Act as a highly experienced React Native software engineer. Your goal is to plan and then build the technical prototype of Plateful in this repository, working unattended after Phase 0.

## Inputs

Read all of these before planning.

- Product requirements: `docs/product/product-requirements.md`
- Architecture: `docs/development/2026-10-20-plateful-architecture.md` (adopted 2026-10-21)
- Repository guidance: `AGENTS.md`
- Designs: `docs/design/README.md` and the final versions it links: `docs/design/plan-week-v3.png` (plan the week), `docs/design/pairing-v2.png` (pairing step), `docs/design/shopping-list-v2.png` (shared list)

**Precedence when these disagree:** this prompt beats the architecture document, which beats the product requirements, which beat the designs. The architecture describes every milestone; take its stack, folder structure, data model and working rules, and take the scope from this prompt.

## Decisions already made

- **Stack:** Expo (managed workflow, current SDK, pinned), TypeScript strict, Expo Router, React Native core components with one theme file, hosted Postgres with row-level security and realtime, anonymous auth upgraded to email on pairing, Jest for logic and policies, cloud builds.
- **Development loop:** the Expo development client on the owner's iPhone over the same Wi-Fi; the dev server runs on the default port; the client SDK version must match the project's.
- **Hosted services:** one database project on the free tier for development; used for data, auth and realtime; not used for file storage or server functions.
- **Secrets:** keys live in `.env` (untracked) with `.env.example` committed; you may read variable names, never print values; the service-role key never enters the app.
- **Identity:** app name Plateful, slug `plateful`, scheme `plateful`, bundle identifier `app.plateful.mobile`.
- **Existing code:** fresh scaffold; preserve everything under `docs/`.
- **Content and images:** placeholder artwork through one `Artwork` component; no real photos.
- **Test accounts and migrations:** you apply migrations through the database CLI; test users are created by the policy tests and deleted after.
- **Platform order:** iOS first; do not break Android, do not test it.

## Phase 0: pre-flight (while the owner is still here)

The owner is at the computer and leaves once pre-flight is settled. This is the only point where you stop and wait. Keep it to 15 minutes; do not read the designs in depth, plan or scaffold before sending the pre-flight message.

**Step 1. Check everything you can check yourself, without asking.**

- Tooling: Node at the pinned version, package manager, git installed; registry reachable; git user configured.
- Repository: branch and working tree state; every input file above exists; no `prototype` branch exists.
- Services: credentials present in `.env`; the database answers a request; list the tables so the owner can confirm it is the right project.
- Write access: whether you can apply migrations (CLI, or neither).
- Auth setting: anonymous sign-in is enabled; read it from the public settings endpoint, else ask.
- Development loop: which SDK the installed development client supports.
- Permissions: run one harmless example of each action kind the build needs (install, `npx`, a file write, a git write, a database call, a web fetch) so any approval prompt appears now. Report anything that prompted.
- Keep-awake: report the machine's sleep setting; do not change it.

**Step 2. Send one consolidated message** with a status list of the checks (pass, fail or needs-owner with the exact action) and these questions, each with its default:

- Who applies migrations? Default: you.
- Smoke test now? Scaffold the bare app, start the dev server and have the owner open it on the phone so SDK match, network and firewall are proven. Default: yes, about ten minutes.
- Anything the checks found that only the owner can resolve.

**Step 3. Wait for the reply.** Apply the answers, use defaults for anything skipped, re-check what the owner says they fixed. "go" means proceed on defaults. After that, ask nothing else. Record the results and answers at the top of the final report.

## Phase 1: plan (write these files first)

1. `docs/plan/prototype-user-stories.md`: the stories below with acceptance criteria, dependencies, the sequence, and which can run in parallel once the scaffold has landed. With the `superpowers` skills present, `writing-plans` produces the plan and this file links it.
2. `docs/plan/handoffs/01-scaffold.md` and onward, one per story: goal, files in scope, requirements, acceptance criteria, verification command, complete enough for a fresh agent with no other context.

## Phase 2: implement, in sequence

The stories are the architecture's AGENT tasks for this milestone, in its order (A-05 to A-14 shortened in this example).

1. **US-1 Scaffold and rewrite guidance (A-01).** Create the Expo project with the pinned stack; rewrite `AGENTS.md`, `README.md` and setup documents so no stale description survives. Files: project skeleton, `AGENTS.md`, `README.md`. Prerequisite: none. Verify: `npm run check && ! grep -rE "TBD:" AGENTS.md README.md`. 1 session.
2. **US-2 Schema and policies (A-02).** One migration for the seven entities in architecture section 4, row-level security keyed on `pair_id`, and policy tests: a member reads and writes their pair's rows, a non-member reads nothing. Files: `db/migrations/001_init.sql`, `db/tests/policies.test.ts`. Prerequisite: H-01. Verify: `npm run test:policies`. 2 sessions. Write the test-count baseline into the report when this passes.
3. **US-3 Anonymous session and pairing (A-03).** Anonymous sign-in at first launch, a pairing screen that creates a pair and shows an invite code, a second device joining with the code, and the email upgrade by magic link. Files: `src/auth/`, `app/pair.tsx`. Prerequisite: US-2, H-02. Verify: `npm run test -- auth && npm run test:policies`. 2 sessions.
4. **US-4 Sync spike (A-04).** Two simulated clients on one pair; the second sees the first's plan edit through realtime. Files: `src/sync/`, `e2e/sync.spec.ts`. Prerequisite: US-3. Verify: `npm run test:e2e -- sync` (exits non-zero if the second client does not converge within 30 seconds; print the observed time). 2 sessions.

The first story rewrites `AGENTS.md`, `README.md` and the setup documents so no stale description survives, with the command above that fails on stale references (architecture section 5).

## Out of scope

Shopping list screen with check-off sync, leftovers carry-over, the "what can we cook now" view, the scheduled leftover-expiry job, account deletion, crash reporting, store submission, Android testing (all in later milestones; task names in architecture section 6). Do not build them; do not leave placeholders for them in the UI unless a story says so.

## What "done" means

- `npm run check` passes (lint, typecheck, unit tests).
- `npm run test:policies` passes and covers the non-member case.
- `npx expo export --platform ios` completes without errors.
- A new install creates an anonymous session and shows the plan screen without asking for an email (PRD 4.1).
- A second client joined by invite code sees the first client's plan edit (PRD 3.2).
- Agent-verified: lint, types, unit, policy and sync tests. CI-verified: the same on the branch. Owner-verified on the phone: install, pairing between two devices, edit appearing on the second.

Verify everything that can be verified from the command line; spend no more than 20 minutes making a simulator run. State plainly in the report which checks ran and which are left for the owner.

## Working rules

- Branch `prototype`. Commit uncommitted `docs/` files unchanged as the first commit. One commit per story. No push, no pull request.
- Pin dependencies through the stack's installer and commit the lockfile. Never force past a peer-dependency error.
- No accounts created, nothing bought, no secrets in the repository. `.env` stays untracked.
- Run each story's verification before starting the next. Test count never decreases.
- Escalation budget: 3 attempts or 30 minutes on the same error before switching approach; the router, query library and database client are never removed to make a build pass.
- Subagents allowed for independent stories once the scaffold is on the branch.

## Autonomy

Once Phase 0 is settled the owner is away for an extended period and will not answer. Make your best judgment, record each non-obvious decision in the report, keep going until every story is implemented. If something blocks you (a missing credential, a failing install, the same error after the escalation budget), stub that piece behind its interface, mark it `STUB:` in code and in the report, and continue. A missing key is a reason to stub the adapter, not to stop.

## Final report

Finish by writing `docs/plan/prototype-report.md` and summarizing it in your last message:

- Phase 0 results and the owner's answers
- What is done, story by story, with the verification run and its result
- Placeholders and stubs, and why
- What was blocked and what was tried
- Decisions the owner may want to reverse
- Exact steps for the owner to run the build on their phone
- Everything that remains before the next milestone, including the out-of-scope list above
- Three lessons for `docs/lessons.md` (date, lesson, where it bit); append them there

(fix-round section omitted: not used in a first-milestone prompt)
