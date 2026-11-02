*Example output of the `pm` plugin for Plateful, a synthetic product. Shortened for reading.*

# Build review: Plateful technical prototype

```yaml
---
stem: prototype
milestone: prototype
round: 0
report: docs/plan/prototype-report.md
prompt: docs/plan/prototype-implementation-prompt.md
branch: prototype
base: 3f9a1c2
head: b71e0d4
previous_review: null
limitations: [story US-4 has a timing threshold, not a content check]
reviewed: 2026-10-25
reviewer: fable
verdict: provisional fix
closed: accepted
closed_date: 2026-10-27
superseded_by: null
---
```

Evidence: `docs/plan/prototype-review-evidence.md` (commands E-01 to E-09, then the fixed blocks for diff stat, `STUB:` files, skipped tests, lockfile and `.env` status, test count).

## 1. Verdict

Provisional fix: 2 findings (0 Critical, 1 High, 0 Medium, 1 Low; the High is the major finding, the Low the minor one), device script about 15 minutes.

The three things to know:

1. The pairing flow works in the tests, but the invite code is never invalidated after the second member joins, so anyone holding an old code can join a third phone to the pair (F-01).
2. Four of four stories are confirmed by their commands; the report is accurate on what was done and on the one stub.
3. The test count rose from 0 to 41; nothing was skipped.

(sections 2 and 3 shortened in this example)

## 2. Claims versus code (excerpt)

| Story | Report claims | Command (exit) | Files in diff | Verdict | Evidence |
|---|---|---|---|---|---|
| US-1 Scaffold | done | `npm run check && ! grep -rE "TBD:" AGENTS.md README.md` (0) | `package.json`, `AGENTS.md`, `README.md` | confirmed | E-01, diff `AGENTS.md` |
| US-2 Schema and policies | done | `npm run test:policies` (0) | `db/migrations/001_init.sql`, `db/tests/policies.test.ts` | confirmed | E-03 |
| US-3 Session and pairing | done | `npm run test -- auth && npm run test:policies` (0) | `src/auth/`, `app/pair.tsx` | overstated: join works, code reuse not covered | E-04, diff `src/auth/pair.ts` lines 40-71 |
| US-4 Sync spike | done | `npm run test:e2e -- sync` (0, 11.2 s) | `src/sync/`, `e2e/sync.spec.ts` | confirmed | E-05 |

## 4. Guardrails

| Guardrail | Result | Evidence |
|---|---|---|
| Test count (baseline 14 after US-2) | pass: 41 | E-01, test-count block |
| Lockfile committed, no force flags | pass | lockfile block, diff of `package.json` scripts |
| `.env` untracked, no key-shaped strings | pass | `.env` block; key-shaped scan of the diff found none |
| Stubs marked `STUB:` and listed in the report | pass: one stub, `src/auth/email-upgrade.ts`, in both | `STUB:` block |
| Skipped or pending tests | pass: none found | skipped-tests block |
| One branch, no push, one commit per story | pass: 4 story commits plus the docs commit | `git log` in E-09 |
| `AGENTS.md` and `README.md` match the stack | pass | E-01 grep exit 0 |

## 5. Findings

### F-01: Invite code stays valid after pairing
- **Severity:** High
- **Category:** Security
- **Files:** `src/auth/pair.ts`, `db/migrations/001_init.sql`, `db/tests/policies.test.ts`
- **Depends on:** none

**Problem:** `joinPair()` accepts any code that exists in `pair.invite_code`; nothing clears or expires the code once a second member has joined.

**Current behaviour:** `src/auth/pair.ts` lines 40-71 look up the pair by code and insert a `member` row with no check on the member count. A third anonymous session with the old code joins the pair and can read the shared plan, list and fridge.

**Required change:** set `invite_code` to null in the same transaction that inserts the second member, and reject a join when the pair already has two members (a database constraint plus a clear error in the pairing screen).

**Acceptance criteria:**
- [ ] a policy test shows a third session using the old code is rejected: `npm run test:policies`
- [ ] the pairing screen shows "This code has already been used" for that case: `npm run test -- pair-screen`

### F-02: Pairing screen drops the typed code on rotation
- **Severity:** Low
- **Category:** State
- **Files:** `app/pair.tsx`
- **Depends on:** none

**Problem:** the invite code input is local component state that resets when the screen remounts.

**Current behaviour:** `app/pair.tsx` line 22 holds the code in `useState`; the report notes the layout remounts on rotation.

**Required change:** keep the draft code in the pairing store already used for the step, and clear it on success.

**Acceptance criteria:**
- [ ] a component test types a code, remounts the screen and finds the code still entered: `npm run test -- pair-screen`

## 6. Device script

Total: about 15 minutes. Setup: from the report, start the dev server with `npx expo start --dev-client`, open the Plateful development client on the phone, and use a second device or simulator as Tom.

1. [ ] Install and open the app on the phone: expect the plan screen to appear with no sign-up prompt.
2. [ ] Add a dinner for Monday: expect it to show on the plan immediately.
3. [ ] Force-quit and reopen: expect Monday's dinner to still be there.
4. [ ] Tap "Pair with someone": expect an invite code and a share button.
5. [ ] On the second device, enter the code: expect the shared plan to open with Monday's dinner.
6. [ ] On the second device, add Tuesday's dinner: expect it to appear on the phone within a few seconds.
7. [ ] Switch the phone to airplane mode, add Wednesday's dinner, switch back: expect it to reach the second device within a minute.
8. [ ] On a third device or simulator, enter the same code: expect a refusal (this fails today; it is F-01).
9. [ ] Force-quit the phone app and reopen: expect it to open straight to the shared plan, still paired.

(section 7, readiness audit: not run for this milestone)

## 8. Closing record

Closed: 2026-10-27, accepted
Device script: 1 pass; 2 pass; 3 pass; 4 pass; 5 pass; 6 pass; 7 pass; 8 fail ("the third phone got in"); 9 pass
Waivers: waived: F-01 and step 8: the third-phone join is only reachable with a code the owner shared themselves, and invite handling is rebuilt in the beta milestone's pairing rework (High waived: flagged for the next review)
Appended findings: F-03 [owner-observed] from step 8, merged into F-01
Next: delivery-build beta
