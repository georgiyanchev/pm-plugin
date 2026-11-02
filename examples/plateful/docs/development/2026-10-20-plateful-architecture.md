*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

# Plateful architecture proposal

Updated: 2026-10-21
status: adopted (with changes)
decided: 2026-10-21
scope: product
sources: docs/product/product-requirements.md (approved); docs/development/2026-10-20-plateful-architecture.brief.md; docs/product.md; docs/design/README.md
pending_records: decisions, agents-stack, hosting

Evidence labels: **Observed** (inspected in the repository, path given), **Documented** (a primary source, linked, with the date checked), **Estimated** (an assumption to validate; its basis stated). A version, price, limit or policy without a Documented source is marked unverified.

## 0. Stack summary

| Area | Choice | Version | Why | Runner-up |
|---|---|---|---|---|
| Platform and framework | Expo (React Native), managed workflow | current SDK at build start, pinned | One codebase for iOS and Android (PRD 2.1); cloud builds, so no Mac needed for daily work | Flutter |
| Language | TypeScript, strict | pinned in lockfile | Compiler feedback catches agent mistakes before a device does | JavaScript |
| UI and styling | React Native core components, one theme file | n/a | Fewest moving parts an agent can get wrong (PRD 5, five-minute planning) | A UI kit |
| Data store | Hosted Postgres, local cache on the device | managed, pinned client | Two people share one plan (PRD 3.2), so a shared remote store is required | Local-only with file sync |
| Backend and hosting | Database policies plus one scheduled job; no server code | n/a | Owner is not an engineer; less code to maintain | A small API server |
| Auth | Anonymous session, upgraded to email at pairing | n/a | Nobody signs up before seeing value (PRD 4.1) | Email first |
| Build, release, updates | Cloud builds, over-the-air updates for JS changes | n/a | No local native toolchain | Local builds |
| Testing | Jest for logic, policy tests against a local database, one end-to-end sync flow | pinned | Every task needs a command that exits non-zero | Manual only |
| Observability | Crash reporting (vendor decision Q-3), database logs | n/a | Pair sync failures must be visible | None |

- **Feasibility:** feasible with one scope cut: realtime sync is limited to plan, list and fridge; recipe images are bundled, not uploaded. Provisional assumption: the owner has about 10 hours a week.
- **Cost:** about 0 to 25 USD a month at 500 users (Estimated: free tiers plus one paid database tier when the free one pauses); one-time 99 USD for the Apple developer programme and 25 USD for the Android store account (Documented, checked 2026-10-20).
- **Effort:** 60 to 90 operator hours and 40 to 60 agent sessions to a technical prototype and complete beta (Estimated).
- **Most valuable spike:** task A-04 below, two simulated clients editing one plan through the policies.

(section shortened in this example)

## 1. Scope and constraints

Confirmed by the owner: solo, part-time, not an engineer; builds with AI coding agents; phone-first; budget under 50 USD a month before revenue. Provisional: iOS first, Android after the prototype passes; English only; no grocery delivery, calorie tracking or social feed (PRD 1.4).

(section shortened in this example)

## 3. Decision table

| Area | Recommendation | Runner-up | Why | Cost or risk |
|---|---|---|---|---|
| Navigation | Expo Router, file-based | React Navigation | Folder equals route; agents get it right | Low |
| Server state | Query library with a per-table cache | Hand-written fetch | Retries and cache invalidation come built in | Low |
| Client state | One small store for the open plan and the pairing step | Context only | Less re-rendering during edits | Low |
| Auth and session | Anonymous session upgraded to email by magic link | Email and password | One screen less (J-01) | Redirect allowlist is a HUMAN task |
| Data store | Postgres with row-level security; every table carries a `pair_id` | Per-user tables with sharing | One rule protects everything | A wrong policy exposes another pair's data; policy tests are mandatory |
| Integrations | None in Phase 1 | n/a | Delivery is out of scope | N/A |
| Testing | Jest plus policy tests run in CI | Manual | Policies are the main security surface | CI minutes |
| Observability | Crash reporting and a sync-failure counter | Logs only | The owner cannot read logs | Vendor open (Q-3) |
| Security and privacy | No health data; email stored only after pairing; account deletion removes the pair | n/a | Fits the audience (PRD 6) | Store privacy labels to fill in |

(section shortened in this example)

## 4. Data model

| Entity | Key fields | Where |
|---|---|---|
| pair | id, created_at, invite_code | synced |
| member | user_id, pair_id, display_name | synced |
| plan_day | pair_id, date, meal_id, cooked_at | synced |
| meal | id, pair_id, title, ingredients (list), servings | synced |
| list_item | pair_id, name, quantity, checked_by, source_meal_id | synced |
| fridge_item | pair_id, name, quantity, expires_on, from_leftover | synced |
| settings | user_id, reminder_time | local only |

Every synced row carries `pair_id`; row-level security allows access only to members of that pair. Sync is last-write-wins per row with an `updated_at` stamp, because two people rarely edit the same dinner within seconds; a conflict screen would cost more than it saves. Deletions are soft (`deleted_at`) for 30 days so the second phone learns of them. Before pairing, the data lives on the device under the anonymous session; pairing moves it to the pair. Offline edits queue locally and send when the connection returns. Account deletion removes the member, and the pair when the last member leaves.

## 5. Agent operating model

- **Done means:** `npm run check` (lint, typecheck, unit tests) and `npm run test:policies` exit 0.
- **Conventions:** pinned Node version, lockfile committed, `.env` untracked with `.env.example` in the repo, one branch scheme `task/<id>-<slug>`, no force flags on installs.
- **AGENTS.md** holds: stack and versions, the commands above, the branch scheme, the escalation budget, the files agents must not edit (migrations once applied).
- **Verification ladder:** the agent runs lint, types, unit and policy tests; CI repeats them on every branch; the operator alone checks pairing on two real phones and the install on a device.
- **Secrets:** keys live in `.env` and in the host's secret store; agents reference variable names, never values; the service-role key never ships in the app.
- **Guardrails:** test count never drops below the baseline written after A-02; no API is used that is not in the pinned docs (the agent names the doc page in the commit); no skipped tests without a line in the report; no new dependency without a reason in the commit.
- **Escalation:** 3 attempts or 30 minutes on one error, then switch approach; essential modules (router, query library, database client) are never removed to pass a build.
- **Vendors:** database and auth, build service, crash reporting (open, Q-3).

(section shortened in this example)

## 6. Delivery plan, technical prototype

The folder tree and the later milestones are shortened. Tasks for the first milestone, in order:

**H-01 HUMAN: Create the database project.** Console of the chosen host, region near the first users; copy the project URL and the public key into `.env`. Hands back: both values. 15 minutes.

**H-02 HUMAN: Set the auth redirect allowlist** to the app scheme and the development URL; enable anonymous sign-in. Hands back: confirmation. 10 minutes.

**A-01 AGENT: Scaffold and rewrite guidance.** Files: project skeleton, `AGENTS.md`, `README.md`. Prerequisite: none. Verify: `npm run check && ! grep -rE "TBD:" AGENTS.md README.md`. 1 session.

**A-02 AGENT: Schema and policies.** Files: `db/migrations/001_init.sql`, `db/tests/policies.test.ts`. Prerequisite: H-01. Verify: `npm run test:policies` (fails if a non-member can read any row). 2 sessions.

**A-03 AGENT: Anonymous session and pairing.** Files: `src/auth/`, `app/pair.tsx`. Prerequisite: A-02, H-02. Verify: `npm run test -- auth && npm run test:policies`. 2 sessions.

**A-04 AGENT: Sync spike.** Two simulated clients edit one plan; the second sees the first's change. Files: `src/sync/`, `e2e/sync.spec.ts`. Prerequisite: A-03. Verify: `npm run test:e2e -- sync` (exits non-zero if the second client does not converge within 30 seconds; the observed time is printed). 2 sessions.

**H-03 HUMAN: Run the development build on your phone** and open the pairing screen. Hands back: "it opens" or the error text. 20 minutes.

(tasks A-05 to A-14 shortened in this example)

## Independent review

Reviewer: Fable. Document: 2026-10-20-plateful-architecture.md, updated 2026-10-20. Date: 2026-10-21.

**Verdict:** adopt with changes. Confidence: medium. The one fact that would change it: if the free database tier pauses idle projects within the first week, the scheduled job and the free-tier plan both break (improvement 2).

**Scorecard**

| Criterion | Score | Reason |
|---|---|---|
| Feasibility for this operator with agents | strong | Managed workflow, no server code, no Mac needed (sections 0, 5) |
| Fit with the PRD and constraints | strong | Pairing and sync map to PRD 3.2 and 4.1 |
| Cost | adequate | Free tiers are cheap but have named failure modes (section 0) |
| Time to milestone | adequate | 60 to 90 hours at about 10 a week is 6 to 9 weeks |
| Maintainability without an engineer | strong | Fewest parts; one scheduled job |
| Security and privacy | adequate | Policy-first is right; no test yet for account deletion (section 4) |
| Lock-in and migration | adequate | Standard Postgres; the portability claim has no restore rehearsal |
| Over-engineering | strong | No sync framework, no conflict UI |
| Verification coverage | adequate | Every task has a command; A-04 originally relied on a 5-second threshold |
| Agent buildability | strong | One console task per service |

**Ranked improvements**

1. Add a restore rehearsal task and a weekly backup job before the beta (change before starting the beta). The portability claim in section 3 is a promise until a dump has been restored into an empty database. Effort: one session.
2. Add keep-alive and monitoring for the free-tier database, including the test project (change during build). Free projects pause when idle; a paused test project looks like a broken build. Effort: half a session.
3. Replace the fixed 5-second convergence threshold in A-04 with a 30-second timeout and print the observed time (change during build). A tight threshold fails on a slow CI machine and teaches the agent to loosen the test. Effort: minutes.

The fact-check, alternatives and decisions for the owner are shortened in this example.

## Owner decision

Adopt with changes, 2026-10-21. Changes named by the owner: improvements 1 and 2 become tasks in the beta milestone; improvement 3 is applied now (A-04 above already shows it); the crash reporting vendor stays open as Q-3 with a deadline of the end of the prototype. No new review.

(section A, review record, shortened in this example)
