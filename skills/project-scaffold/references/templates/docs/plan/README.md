# Plan

Work handed from one session to the next.

- `<milestone>-implementation-prompt.md`: the prompt a fresh coding session runs for one milestone (`prototype`, `beta`, `release`, or an owner stem such as `v1`), written by `delivery-build` (the `pm` plugin) from the adopted architecture; `<milestone>-user-stories.md` beside it is the build's own plan.
- `<stem>-review.md` and `<stem>-review-evidence.md`: the build review written by `delivery-review` (the `pm` plugin) after a milestone or fix round reports: verdict, findings as task blocks, the device script, the owner's close; the evidence file holds the command outputs the verdict rests on.
- `handoffs/NN-<slug>.md`: a hand-off prompt for one story or task, complete on its own: context, goal, files in scope, requirements, acceptance criteria, verification command. Numbered in the order they were written.
- `<milestone>-report.md`: the running build report for that milestone. Sections: what is done, story by story; placeholders and stubs (`STUB:`); blocked, and what was tried; decisions the owner may want to reverse; left for the owner to confirm; before a release. Appended, never rewritten.

Plans and specs produced by the planning skills (`docs/superpowers/plans/`, `docs/superpowers/specs/`) stay where those skills put them; this folder points at them from the report.
