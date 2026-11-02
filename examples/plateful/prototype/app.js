// Plateful prototype: sample data, in-memory state, hash router, tour, badge toggle.
// Static files, no build step. Everything inside #app is the product; the mockup chrome is in index.html.
(function () {
  "use strict";

  // ---------- Sample data (from prototype-brief.md) ----------
  var DAYS = [
    { id: "mon", short: "Mon", name: "Monday", date: "2 Nov" },
    { id: "tue", short: "Tue", name: "Tuesday", date: "3 Nov" },
    { id: "wed", short: "Wed", name: "Wednesday", date: "4 Nov" },
    { id: "thu", short: "Thu", name: "Thursday", date: "5 Nov" },
    { id: "fri", short: "Fri", name: "Friday", date: "6 Nov" },
    { id: "sat", short: "Sat", name: "Saturday", date: "7 Nov" },
    { id: "sun", short: "Sun", name: "Sunday", date: "8 Nov" }
  ];
  var SHOP_1 = ["mon", "tue", "wed"];

  var FRIDGE = [
    { id: "coconut-milk", name: "Half a tin of coconut milk", days: 2 },
    { id: "kale", name: "A bag of kale", days: 2 },
    { id: "peppers", name: "Two red peppers", days: 3 },
    { id: "spring-onions", name: "Spring onions", days: 3 },
    { id: "feta", name: "Half a block of feta", days: 4 },
    { id: "soured-cream", name: "Soured cream", days: 5 },
    { id: "lemon", name: "A lemon", days: 7 },
    { id: "eggs", name: "Three eggs", days: 9 },
    { id: "potatoes", name: "Potatoes, 1 kg", days: 10 },
    { id: "red-onion", name: "A red onion", days: 12 }
  ];
  var FRIDGE_SHORT = { "coconut-milk": "coconut milk", kale: "kale", peppers: "the peppers", "spring-onions": "spring onions", feta: "feta", "soured-cream": "soured cream", lemon: "the lemon", eggs: "eggs", potatoes: "potatoes", "red-onion": "the red onion" };

  var MEALS = {
    "roast-chicken": { name: "Roast chicken, potatoes and kale", time: "1 h 10", food: "#C9742E", green: "#6E8A5E",
      art: "roast chicken with potatoes and kale on a cream stoneware plate, overhead, warm evening light, dark wood table",
      uses: ["potatoes", "kale", "lemon"], cupboard: ["olive oil", "garlic"], needs: ["Whole chicken"],
      leftovers: { what: "Half a chicken", to: "tue", meal: "chicken-tacos" },
      steps: ["Heat the oven to 200. Rub the chicken with oil, salt and the lemon.", "Roast 1 h, potatoes around it for the last 45 min.", "Rest the chicken 10 min; wilt the kale in the pan juices.", "Carve one side for tonight. The other half is Tuesday's tacos."] },
    "chicken-tacos": { name: "Chicken tacos with pickled onion", time: "25 min", food: "#D9A066", green: "#7A9A6D",
      art: "three chicken tacos with pink pickled onion on a cream plate, overhead, warm light",
      uses: ["red-onion", "soured-cream"], cupboard: ["spices"], needs: ["Tortillas × 8", "Two limes", "Coriander"],
      usesLeftovers: { from: "mon", meal: "roast-chicken", what: "half a roast chicken" },
      steps: ["Slice the red onion, cover with lime juice and a pinch of salt.", "Shred Monday's chicken; warm it with the spices.", "Warm the tortillas in a dry pan.", "Build: chicken, pickled onion, soured cream, coriander."] },
    "mushroom-risotto": { name: "Mushroom risotto", time: "40 min", food: "#D8C8A8", green: "#8A7A5E",
      art: "mushroom risotto in a shallow bowl, overhead, warm light",
      uses: [], cupboard: ["olive oil", "garlic"], needs: ["Chestnut mushrooms, 300 g", "Parmesan", "Arborio rice", "Parsley"],
      steps: ["Fry the mushrooms hard; set aside.", "Soften garlic, add the rice, then stock a ladle at a time for 20 min.", "Stir in the mushrooms and parmesan.", "Parsley on top. Serves two, nothing left."] },
    "lentil-soup": { name: "Red lentil soup with flatbread", time: "35 min", food: "#D9772E", green: "#7A9A6D",
      art: "red lentil soup in a deep bowl with a torn flatbread, overhead, warm light",
      uses: ["red-onion", "lemon"], cupboard: ["spices", "olive oil"], needs: ["Red lentils, 250 g", "Flatbreads × 4"],
      leftovers: { what: "Two bowls", to: null, label: "Monday lunch" },
      steps: ["Soften the onion with the spices.", "Add lentils and 1 litre of water; simmer 25 min.", "Blend half, squeeze in the lemon.", "Warm the flatbreads. Two bowls go in the fridge for Monday lunch."] },
    "chickpea-curry": { name: "Chickpea and spinach curry", time: "30 min", food: "#C98A2E", green: "#5E8A4E",
      art: "chickpea and spinach curry in a bowl with rice, overhead, warm light",
      uses: ["coconut-milk", "lemon"], cupboard: ["rice", "garlic", "spices"], needs: ["Spinach", "One tin of chickpeas"],
      steps: ["Fry garlic and spices for a minute.", "Add the chickpeas and the coconut milk; simmer 15 min.", "Stir the spinach in until it wilts; finish with lemon.", "Serve on rice."] },
    "pepper-pasta": { name: "Pasta with roasted peppers and feta", time: "25 min", food: "#C85A3A", green: "#6E8A5E",
      art: "pasta with roasted red peppers and crumbled feta, overhead, warm light",
      uses: ["peppers", "feta"], cupboard: ["pasta", "olive oil", "garlic"], needs: [],
      steps: ["Roast the peppers at 220 for 20 min.", "Cook the pasta.", "Toss with the peppers, garlic and oil.", "Crumble the feta over."] },
    "shakshuka": { name: "Shakshuka", time: "20 min", food: "#C44A2E", green: "#6E8A5E",
      art: "shakshuka in a black pan, three eggs, feta, overhead, warm light",
      uses: ["eggs", "feta", "red-onion"], cupboard: ["tinned tomatoes", "spices", "olive oil"], needs: [],
      steps: ["Soften the onion with the spices.", "Add the tomatoes; simmer 8 min.", "Make three wells, crack in the eggs, lid on for 5 min.", "Feta over the top. Eat from the pan."] },
    "bean-stew": { name: "Tomato and white bean stew", time: "30 min", food: "#C9552E", green: "#5E8A4E",
      art: "tomato and white bean stew with kale in a bowl, overhead, warm light",
      uses: ["kale", "red-onion"], cupboard: ["tinned tomatoes", "garlic", "olive oil"], needs: ["One tin of white beans"],
      steps: ["Soften the onion and garlic.", "Add tomatoes and beans; simmer 15 min.", "Stir the kale in for the last 5 min.", "Oil on top, bread if there is any."] },
    "egg-fried-rice": { name: "Egg fried rice", time: "15 min", food: "#E0C27A", green: "#5E8A4E",
      art: "egg fried rice with spring onions in a bowl, overhead, warm light",
      uses: ["eggs", "spring-onions"], cupboard: ["rice", "olive oil"], needs: [],
      steps: ["Cook the rice, or use cold rice from the fridge.", "Scramble the eggs in a hot pan; set aside.", "Fry the rice hard, add the eggs and spring onions.", "Salt, serve."] },
    "halloumi-traybake": { name: "Halloumi and vegetable traybake", time: "35 min", food: "#D9A066", green: "#6E8A5E",
      art: "halloumi traybake with peppers, potatoes and red onion on a baking tray, overhead, warm light",
      uses: ["peppers", "potatoes", "red-onion"], cupboard: ["olive oil", "spices"], needs: ["Halloumi"],
      steps: ["Heat the oven to 220.", "Cut the vegetables, oil and spice them; roast 25 min.", "Add the halloumi for the last 10 min.", "Serve from the tray."] },
    "baked-potatoes": { name: "Baked potatoes with cheddar and leeks", time: "1 h", food: "#C9A066", green: "#5E8A4E",
      art: "two baked potatoes with cheddar and buttered leeks, overhead, warm light",
      uses: ["potatoes", "soured-cream"], cupboard: ["olive oil"], needs: ["Cheddar", "Two leeks"],
      steps: ["Bake the potatoes at 200 for 55 min.", "Soften the leeks slowly in butter.", "Split, fill with leeks and cheddar; back in for 5 min.", "Soured cream on top."] },
    "salmon-noodles": { name: "Salmon noodles", time: "20 min", food: "#E08A6E", green: "#5E8A4E",
      art: "salmon fillet on noodles with spring onion and lemon, overhead, warm light",
      uses: ["spring-onions", "lemon"], cupboard: ["soy sauce"], needs: ["Two salmon fillets", "Egg noodles"],
      steps: ["Cook the noodles.", "Pan-fry the salmon 3 min a side.", "Toss the noodles with soy, lemon and spring onions.", "Salmon on top."] }
  };
  var PICK_ORDER = ["chickpea-curry", "pepper-pasta", "shakshuka", "bean-stew", "egg-fried-rice", "halloumi-traybake", "baked-potatoes", "salmon-noodles"];
  var COOK_NOW = ["shakshuka", "pepper-pasta", "egg-fried-rice", "halloumi-traybake"];

  // ---------- State (lives for the session) ----------
  var state = {
    names: { you: "Mira", partner: "Tom" },
    nights: 5,
    plan: { mon: "roast-chicken", tue: "chicken-tacos", wed: null, thu: "mushroom-risotto", fri: "out", sat: null, sun: "lentil-soup" },
    carry: { "roast-chicken": true, "lentil-soup": true },
    ticked: {}
  };
  window.DATA = { days: DAYS, fridge: FRIDGE, meals: MEALS, state: state };

  // ---------- Helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function day(id) { for (var i = 0; i < DAYS.length; i++) if (DAYS[i].id === id) return DAYS[i]; return null; }
  function fridgeItem(id) { for (var i = 0; i < FRIDGE.length; i++) if (FRIDGE[i].id === id) return FRIDGE[i]; return null; }
  function plate(id, size) {
    var m = MEALS[id];
    return '<svg class="plate" width="' + size + '" height="' + size + '" style="--food:' + m.food + ';--green:' + m.green + '" data-art="' + esc(m.art) + '" aria-hidden="true"><use href="#plate"/></svg>';
  }
  function joinList(items) {
    if (items.length <= 1) return items.join("");
    return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
  }
  function emptyNights() { return DAYS.filter(function (d) { return state.plan[d.id] === null; }); }
  function plannedCount() { return DAYS.filter(function (d) { return state.plan[d.id] && state.plan[d.id] !== "out"; }).length; }
  function nightOf(mealId) { for (var i = 0; i < DAYS.length; i++) if (state.plan[DAYS[i].id] === mealId) return DAYS[i]; return null; }

  // The shopping list follows the plan: what each planned meal needs, split into the week's two shops,
  // plus the fridge items the plan uses (skipped, never bought twice).
  function shoppingList() {
    var shop1 = [], shop2 = [], skipped = {};
    DAYS.forEach(function (d) {
      var id = state.plan[d.id];
      if (!id || id === "out") return;
      var m = MEALS[id];
      var needs = m.needs.slice();
      if (m.usesLeftovers && !state.carry[m.usesLeftovers.meal]) needs.push("Cooked chicken, 300 g");
      needs.forEach(function (n) { (SHOP_1.indexOf(d.id) >= 0 ? shop1 : shop2).push({ name: n, day: d.short, key: d.id + ":" + n }); });
      m.uses.forEach(function (f) { skipped[f] = true; });
    });
    return { shop1: shop1, shop2: shop2, skipped: FRIDGE.filter(function (f) { return skipped[f.id]; }) };
  }

  // ---------- Renderers, one per core or supporting screen ----------
  function renderStart() {
    $("#you").value = state.names.you;
    $("#partner").value = state.names.partner;
    $$(".nights button").forEach(function (b) { b.setAttribute("aria-pressed", String(Number(b.textContent) === state.nights)); });
  }

  function renderWeek() {
    var rows = DAYS.map(function (d) {
      var id = state.plan[d.id], m = id && id !== "out" ? MEALS[id] : null, tag = "";
      if (m && m.usesLeftovers && state.carry[m.usesLeftovers.meal]) tag = '<small><span class="leftover-tag">' + esc(day(m.usesLeftovers.from).name) + "'s chicken</span></small>";
      if (m && m.leftovers && state.carry[id]) tag = '<small><span class="leftover-tag">' + esc(m.leftovers.what) + " for " + esc(m.leftovers.to ? day(m.leftovers.to).name : m.leftovers.label) + "</span></small>";
      if (m) return '<a class="row week-row" href="#/meal/' + id + '"><span class="day">' + d.short + "</span>" + plate(id, 36) + '<span class="meal">' + esc(m.name) + tag + '</span><span class="min">' + m.time + "</span></a>";
      if (id === "out") return '<a class="row week-row out" href="#/pick/' + d.id + '"><span class="day">' + d.short + '</span><span class="meal">Out</span><span class="min">Change</span></a>';
      return '<a class="row week-row empty" href="#/pick/' + d.id + '"><span class="day">' + d.short + '</span><span class="meal">Pick a meal</span><span class="min">Choose</span></a>';
    }).join("");
    $(".week-rows").innerHTML = rows;
    var empties = emptyNights(), n = plannedCount();
    $(".week-status").textContent = empties.length ? n + " planned, " + joinList(empties.map(function (d) { return d.name; })) + " to fill" : n + " nights planned, nothing left to fill";
    var action = $("#week-action");
    if (empties.length) { action.textContent = "Fill " + empties[0].name; action.setAttribute("href", "#/pick/" + empties[0].id); }
    else { action.textContent = "Open the shopping list"; action.setAttribute("href", "#/list"); }
  }

  function renderPick(night) {
    var d = day(night) || DAYS[2];
    $(".pick-title").textContent = d.name;
    $(".pick-date").textContent = d.date + ". Suggestions lead with what is in the fridge.";
    $("#pick-out").textContent = "Mark " + d.name + " as out";
    $("#pick-out").dataset.night = d.id;
    $("#pick-search").value = "";
    var html = PICK_ORDER.map(function (id) {
      var m = MEALS[id];
      var uses = m.uses.map(function (f) { return FRIDGE_SHORT[f]; });
      var sub = (uses.length ? "Uses " + joinList(uses) : "Nothing from the fridge") + " · " + (m.needs.length ? m.needs.length + " to buy" : "nothing to buy");
      return '<button type="button" class="row pick-row" data-pick="' + id + '" data-night="' + d.id + '" data-name="' + esc(m.name.toLowerCase()) + '">' + plate(id, 36) + '<span class="meal">' + esc(m.name) + "<small>" + esc(sub) + '</small></span><span class="min">' + m.time + "</span></button>";
    }).join("");
    $(".pick-rows").innerHTML = html;
  }

  function renderMeal(id) {
    var m = MEALS[id] || MEALS["roast-chicken"]; id = MEALS[id] ? id : "roast-chicken";
    var night = nightOf(id);
    $(".meal-plate").innerHTML = plate(id, 120);
    $(".meal-title").textContent = m.name;
    $(".meal-meta").textContent = m.time + " · serves two" + (night ? " · " + night.name : "");
    var lo = $(".leftovers"), loHtml = "";
    if (m.leftovers) {
      var dest = m.leftovers.to ? day(m.leftovers.to).name : m.leftovers.label;
      loHtml = '<p class="lo-line"><strong>' + esc(m.leftovers.what) + "</strong> carries to " + esc(dest) + ".</p>" +
        (m.leftovers.meal ? '<a class="lo-link" href="#/meal/' + m.leftovers.meal + '">' + esc(day(m.leftovers.to).name) + ": " + esc(MEALS[m.leftovers.meal].name) + " →</a>" : "") +
        '<label class="check"><input type="checkbox" data-carry="' + id + '"' + (state.carry[id] ? " checked" : "") + "> Carry the leftovers to " + esc(dest) + "</label>";
    } else if (m.usesLeftovers) {
      var src = m.usesLeftovers;
      loHtml = '<p class="lo-line">Uses <strong>' + esc(day(src.from).name) + "'s leftovers</strong>: " + esc(src.what) + "." + (state.carry[src.meal] ? "" : " The carry-over is off, so cooked chicken is on the list.") + "</p>" +
        '<a class="lo-link" href="#/meal/' + src.meal + '">' + esc(day(src.from).name) + ": " + esc(MEALS[src.meal].name) + " →</a>";
    } else {
      loHtml = '<p class="lo-line">Serves two, nothing left over.</p>';
    }
    $(".lo-body", lo).innerHTML = loHtml;
    var inFridge = m.uses.map(function (f) { return fridgeItem(f).name; });
    var needs = m.needs.slice();
    if (m.usesLeftovers && !state.carry[m.usesLeftovers.meal]) needs.push("Cooked chicken, 300 g");
    $(".ing-fridge").innerHTML = inFridge.length ? inFridge.map(function (n) { return '<li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>' + esc(n) + "</li>"; }).join("") : '<li class="muted">Nothing from the fridge</li>';
    $(".ing-cupboard").textContent = m.cupboard.length ? "In the cupboard: " + joinList(m.cupboard) + "." : "";
    $(".ing-list").innerHTML = needs.length ? needs.map(function (n) { return '<li><svg class="icon" aria-hidden="true"><use href="#i-basket"/></svg>' + esc(n) + "</li>"; }).join("") : '<li class="muted">Nothing to buy</li>';
    $(".ing-list-title").textContent = needs.length ? "On the list (" + needs.length + ")" : "On the list";
    $(".start-cooking").setAttribute("href", "#/cook/" + id);
    var swap = $("#meal-swap");
    if (night) { swap.textContent = "Swap " + night.name + "'s meal"; swap.setAttribute("href", "#/pick/" + night.id); swap.removeAttribute("data-put"); }
    else {
      var empties = emptyNights();
      swap.textContent = empties.length ? "Put it on " + empties[0].name : "Put it on the plan";
      swap.setAttribute("href", "#/week"); swap.dataset.put = id; swap.dataset.night = empties.length ? empties[0].id : "";
    }
  }

  function renderList() {
    var l = shoppingList();
    function rows(items) {
      return items.map(function (it) {
        var on = !!state.ticked[it.key];
        return '<label class="row list-row' + (on ? " done" : "") + '"><input type="checkbox" data-tick="' + esc(it.key) + '"' + (on ? " checked" : "") + '><span class="meal">' + esc(it.name) + "<small>" + it.day + "</small></span></label>";
      }).join("");
    }
    $(".shop-1").innerHTML = rows(l.shop1);
    $(".shop-2").innerHTML = rows(l.shop2);
    var total = l.shop1.length + l.shop2.length, done = Object.keys(state.ticked).filter(function (k) { return state.ticked[k]; }).length;
    $(".list-status").textContent = total + " to buy, " + l.skipped.length + " skipped" + (done ? ", " + done + " in the basket" : "");
    $(".skipped-count").textContent = "Skipped, already in the fridge (" + l.skipped.length + ")";
    $(".skipped-rows").innerHTML = l.skipped.map(function (f) { return '<li><svg class="icon" aria-hidden="true"><use href="#i-check"/></svg>' + esc(f.name) + "</li>"; }).join("");
  }

  function renderFridge() {
    $(".fridge-rows").innerHTML = FRIDGE.map(function (f) {
      var soon = f.days <= 2;
      return '<li class="row fridge-row' + (soon ? " soon" : "") + '"><span class="meal">' + esc(f.name) + (soon ? '<small><span class="leftover-tag">Use soon</span></small>' : "") + '</span><span class="min">' + f.days + " days</span></li>";
    }).join("");
    $(".cook-rows").innerHTML = COOK_NOW.map(function (id) {
      var m = MEALS[id];
      var sub = m.needs.length ? "Missing " + m.needs.join(", ").toLowerCase() : "Everything is in";
      return '<a class="row cook-row" href="#/meal/' + id + '">' + plate(id, 36) + '<span class="meal">' + esc(m.name) + "<small>" + esc(sub) + '</small></span><span class="min">' + m.time + "</span></a>";
    }).join("");
  }

  function renderCook(id) {
    var m = MEALS[id] || MEALS["roast-chicken"]; id = MEALS[id] ? id : "roast-chicken";
    $(".cook-title").textContent = m.name;
    $(".cook-meta").textContent = m.time + " · serves two";
    $(".steps").innerHTML = m.steps.map(function (s, i) { return "<li><span class=\"step-n\">" + (i + 1) + "</span><span>" + esc(s) + "</span></li>"; }).join("");
    $$(".cook-back").forEach(function (a) { a.setAttribute("href", "#/meal/" + id); });
  }

  var RENDER = { "/start": renderStart, "/week": renderWeek, "/pick/:night": function (p) { renderPick(p.night); }, "/meal/:id": function (p) { renderMeal(p.id); }, "/list": renderList, "/fridge": renderFridge, "/cook/:id": function (p) { renderCook(p.id); } };

  // ---------- Router ----------
  var sections = $$("#app .screen");
  var entry = sections[0].dataset.route;
  function match(hash, pattern) {
    var a = hash.split("?")[0].replace(/^\/|\/$/g, "").split("/"), b = pattern.replace(/^\/|\/$/g, "").split("/"), params = {};
    if (a.length !== b.length) return null;
    for (var i = 0; i < a.length; i++) {
      if (b[i].charAt(0) === ":") params[b[i].slice(1)] = decodeURIComponent(a[i]);
      else if (a[i] !== b[i]) return null;
    }
    return params;
  }
  function route() {
    var hash = location.hash.replace(/^#/, "") || entry, hit = null, params = {};
    sections.forEach(function (s) { if (!hit) { var p = match(hash, s.dataset.route); if (p) { hit = s; params = p; } } });
    if (!hit) { hit = sections[0]; params = {}; hash = entry; }
    sections.forEach(function (s) { s.classList.toggle("is-active", s === hit); });
    if (RENDER[hit.dataset.route]) RENDER[hit.dataset.route](params);
    document.body.dataset.nav = hit.dataset.route === "/start" ? "off" : "on";
    var top = hash.split("/")[1];
    $$(".bottom-nav a").forEach(function (a) {
      var mine = a.getAttribute("href").replace("#/", "");
      var active = mine === top || (mine === "week" && (top === "pick" || top === "meal" || top === "cook"));
      if (active) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
    $("#screen").scrollTop = 0;
    document.title = "Plateful · " + hit.dataset.title;
    tourAfterRoute();
  }
  window.addEventListener("hashchange", route);

  // ---------- Interaction (happy path only) ----------
  document.addEventListener("click", function (e) {
    var go = e.target.closest("[data-go]");
    if (go) { e.preventDefault(); location.hash = "#" + go.dataset.go; return; }
    var pick = e.target.closest("[data-pick]");
    if (pick) { state.plan[pick.dataset.night] = pick.dataset.pick; location.hash = "#/week"; return; }
    var put = e.target.closest("[data-put]");
    if (put && put.dataset.night) { state.plan[put.dataset.night] = put.dataset.put; return; }
    var out = e.target.closest("#pick-out");
    if (out) { state.plan[out.dataset.night] = "out"; location.hash = "#/week"; return; }
    var night = e.target.closest(".nights button");
    if (night) { state.nights = Number(night.textContent); renderStart(); }
  });
  document.addEventListener("change", function (e) {
    var t = e.target;
    if (t.dataset.carry) { state.carry[t.dataset.carry] = t.checked; renderMeal(t.dataset.carry); }
    if (t.dataset.tick) { state.ticked[t.dataset.tick] = t.checked; renderList(); }
  });
  document.addEventListener("input", function (e) {
    if (e.target.id === "pick-search") {
      var q = e.target.value.trim().toLowerCase();
      $$(".pick-row").forEach(function (r) { r.hidden = q && r.dataset.name.indexOf(q) < 0; });
    }
  });
  $("#pair-form").addEventListener("submit", function (e) {
    e.preventDefault();
    state.names.you = $("#you").value.trim() || "Mira";
    state.names.partner = $("#partner").value.trim() || "Tom";
    $$(".partner-name").forEach(function (el) { el.textContent = state.names.partner; });
    location.hash = "#/week";
  });

  // ---------- Decide-and-show layer: badges, theme, width, tour ----------
  var body = document.body, root = document.documentElement;
  function read(k, d) { try { return localStorage.getItem(k) || d; } catch (err) { return d; } }
  function write(k, v) { try { localStorage.setItem(k, v); } catch (err) { /* private window or blocked storage: the toggle still works for the session */ } }
  body.dataset.hyp = read("plateful.hyp", "on");
  root.dataset.theme = read("plateful.theme", "light");
  function syncToolbar() {
    $("#t-hyp").setAttribute("aria-pressed", String(body.dataset.hyp === "on"));
    $("#t-theme").setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
    $$("[data-width]").forEach(function (b) { b.setAttribute("aria-pressed", String(root.style.getPropertyValue("--frame-w") === b.dataset.width + "px" || (!root.style.getPropertyValue("--frame-w") && b.dataset.width === "390"))); });
  }
  $("#t-hyp").addEventListener("click", function () { body.dataset.hyp = body.dataset.hyp === "on" ? "off" : "on"; write("plateful.hyp", body.dataset.hyp); syncToolbar(); });
  $("#t-theme").addEventListener("click", function () { root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark"; write("plateful.theme", root.dataset.theme); syncToolbar(); });
  $$("[data-width]").forEach(function (b) { b.addEventListener("click", function () { root.style.setProperty("--frame-w", b.dataset.width + "px"); syncToolbar(); }); });

  var tour = { flow: null, step: 0 };
  var panel = $("#tour"), tourList = $("#tour-list"), tourStep = $("#tour-step");
  function clearTarget() { $$(".tour-target").forEach(function (el) { el.classList.remove("tour-target"); }); }
  function tourAfterRoute() {
    clearTarget();
    if (!tour.flow) return;
    var s = tour.flow.steps[tour.step];
    if (!s || !match(location.hash.replace(/^#/, "") || entry, s.route)) return;
    if (s.target) { var el = $(s.target, $("#app")); if (el) { el.classList.add("tour-target"); if (el.scrollIntoView) el.scrollIntoView({ block: "center" }); } }
  }
  function showStep() {
    var s = tour.flow.steps[tour.step];
    $("#tour-flow").textContent = tour.flow.name;
    $("#tour-count").textContent = (tour.step + 1) + " / " + tour.flow.steps.length;
    $("#tour-hint").textContent = s.hint;
    $("#tour-back").disabled = tour.step === 0;
    $("#tour-next").disabled = tour.step === tour.flow.steps.length - 1;
    tourStep.hidden = false;
    if ((location.hash.replace(/^#/, "") || entry) === s.route) tourAfterRoute(); else location.hash = "#" + s.route;
  }
  function startFlow(f) { tour.flow = f; tour.step = 0; showStep(); }
  window.FLOWS.forEach(function (f) {
    var b = document.createElement("button"); b.type = "button"; b.className = "tour-item"; b.textContent = f.name;
    b.setAttribute("aria-label", "Start the tour " + f.name);
    b.addEventListener("click", function () { startFlow(f); });
    tourList.appendChild(b);
  });
  $("#tour-next").addEventListener("click", function () { if (tour.step < tour.flow.steps.length - 1) { tour.step++; showStep(); } });
  $("#tour-back").addEventListener("click", function () { if (tour.step > 0) { tour.step--; showStep(); } });
  $("#t-tour").addEventListener("click", function () { var open = panel.hidden; panel.hidden = !open; $("#t-tour").setAttribute("aria-expanded", String(open)); });
  $("#tour-close").addEventListener("click", function () { panel.hidden = true; $("#t-tour").setAttribute("aria-expanded", "false"); tour.flow = null; tourStep.hidden = true; clearTarget(); });

  syncToolbar();
  route();
})();
