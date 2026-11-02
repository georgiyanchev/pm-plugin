// Plateful prototype: the brief's flows as tour steps. Read by app.js.
window.FLOWS = [
  { id: "FLOW-01", name: "Plan the week in one sitting", steps: [
    { route: "/start", hint: "Both names are in. Tap Plan our first week.", target: ".hero-action" },
    { route: "/week", hint: "Four nights are suggested. Wednesday is empty: tap Fill Wednesday.", target: ".docked-action .hero-action" },
    { route: "/pick/wed", hint: "Suggestions lead with what is in the fridge. Tap Chickpea and spinach curry.", target: "[data-pick=\"chickpea-curry\"]" },
    { route: "/week", hint: "Wednesday is set and its two missing items are on the list. Saturday is the only night left.", target: ".week-rows" }
  ] },
  { id: "FLOW-02", name: "Shop without buying what we have", steps: [
    { route: "/week", hint: "The plan is the list. Tap List in the bottom bar.", target: ".bottom-nav a[href=\"#/list\"]" },
    { route: "/list", hint: "Two shops this week. Scroll down: the fridge items the plan uses are skipped and counted, not bought again.", target: ".skipped" }
  ] },
  { id: "FLOW-03", name: "Use what is left before it goes off", steps: [
    { route: "/week", hint: "Tap Monday's roast chicken.", target: "a[href=\"#/meal/roast-chicken\"]" },
    { route: "/meal/roast-chicken", hint: "Half a chicken carries to Tuesday. Tap Chicken tacos to see where it goes.", target: ".leftovers" },
    { route: "/meal/chicken-tacos", hint: "Tuesday uses Monday's leftovers, so only tortillas, limes and coriander are on the list.", target: ".ingredients" }
  ] },
  { id: "FLOW-04", name: "What can we cook now", steps: [
    { route: "/fridge", hint: "Coconut milk and kale go off in two days. Cook now lists what is makeable tonight from what is in.", target: ".cook-now" },
    { route: "/meal/shakshuka", hint: "Everything is in. Put it on tonight or start cooking.", target: ".start-cooking" }
  ] },
  { id: "FLOW-05", name: "Cook tonight's meal", steps: [
    { route: "/meal/shakshuka", hint: "Tap Start cooking.", target: ".start-cooking" },
    { route: "/cook/shakshuka", hint: "Steps one at a time, large enough to read from the hob.", target: ".steps" }
  ] }
];
