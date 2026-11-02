# Release checklist

Tick an item with the date it became true. `n/a` needs a reason. Items marked `TBD:` have not been looked at. The owner performs every step that needs their store, hosting, payment, or DNS credentials; agents prepare, draft, and check.

## Before the listing or launch

- [ ] TBD: Legal entity, seller name, and address decided for the store and the policy (company or individual; EU trader declaration for EU storefronts).
- [ ] TBD: Data inventory written (`data-inventory.md`): every personal data type, where stored, why, retention, processor.
- [ ] TBD: Privacy policy published at a public URL; every `TBD: owner to confirm` in it closed; data-processing terms with each processor accepted or consciously waived.
- [ ] TBD: Analytics and consent decided: what is collected, whether anonymous, whether a consent step is needed where the users are (the owner's company is in the EU, so GDPR applies to every user).
- [ ] TBD: Account deletion path exists in the product and is named in the review notes.
- [ ] TBD: Support address works end to end (send a mail, see it arrive) and a support page is live.
- [ ] TBD: Store listing copy drafted in the product's voice: name, subtitle, description, keywords, category, support and privacy URLs, screenshots plan, age rating answers.
- [ ] TBD: Reviewer or demo account created by the owner, never signed in by a one-time code, credentials kept only in the password manager.
- [ ] TBD: Trademark search for the product name in the markets it launches in.
- [ ] TBD: Release notes and the version number set; the build reproducible from a clean checkout.

## Before traffic moves

- [ ] TBD: Manual pass on at least one real environment, over real TLS, with real credentials, before any user is exposed. Do not cut this for time; automated gates did not see the failures it found last time.
- [ ] TBD: Secrets validated by shape (length, prefix, hash), never by presence; a placeholder passes a presence check.
- [ ] TBD: Every route or endpoint whose caller cannot have a session (webhooks, callbacks, health checks) declared public explicitly and asserted statically; test-mode bypasses hide this.
- [ ] TBD: TLS and the proxy's SSL mode set before DNS changes; the HTTP-to-HTTPS redirect added only after.
- [ ] TBD: Rollback written as one command and rehearsed; the previous version kept next to the live one.
- [ ] TBD: Backups taken and verified by count and bytes, not by the tool's summary.
- [ ] TBD: Bulk data pre-seeded outside the cutover window.
- [ ] TBD: Runbook read top to bottom by someone who did not write it; a step corrected two paragraphs later is a defect.
- [ ] TBD: Which host each command runs on is named in the runbook.

## After

- [ ] TBD: Smoke checks on the live URL: every public page answers, every listing URL returns 200, no console errors, no leftover `TBD` text.
- [ ] TBD: Logs and error reporting watched for the first day; a fix exposes the next defect, so re-verify the surface, not just the fixed rule.
- [ ] TBD: Lessons written to `../lessons.md` while they are fresh.
- [ ] TBD: Old environments, keys, and hosting accounts decommissioned only after everything they served is confirmed elsewhere.
