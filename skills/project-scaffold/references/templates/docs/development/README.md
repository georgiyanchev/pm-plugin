# Development

All development material lives here, in one folder: architecture proposals and their reviews, options comparisons, and any other technical notes. Do not create a separate `architecture/` folder beside it.

Options comparisons and reviews are dated: `YYYY-MM-DD-<topic>.md` or `<topic>-options.md`. Each compares the choices with the constraints from `../product.md`, recommends one, and names what the recommendation costs. The decision itself, once the owner makes it, goes in `../decisions.md` with the date; the document here is the argument, not the record.

`delivery-architecture` (the `pm` plugin) writes `YYYY-MM-DD-<slug>-architecture.md` here with its `.brief.md` (interview and accepted stack) and `.review.md` (the independent review); `feature-prd` reads the adopted one for size L features.
