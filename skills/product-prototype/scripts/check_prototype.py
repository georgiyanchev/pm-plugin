"""Check a product-prototype folder: routes, links, flow coverage, placeholders.

Usage: python check_prototype.py <prototype folder>

Reads `prototype-brief.md` (Screens table), `index.html` (sections with
data-route / data-tier, links as href="#/..." or data-go="/...") and
`flows.js` (route: "..." per step). Prints one finding per line:

    <blocker|major|minor> | <file> | <problem> | <fix>

Exit 0 when there is no blocker, 1 otherwise.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

BRIEF_ROW = re.compile(
    r"^\|\s*(?P<id>SCR-\d+)\s*\|\s*(?P<name>[^|]+?)\s*\|\s*(?P<route>/[^|\s]*)\s*\|"
    r"\s*(?P<tier>core|supporting|placeholder)\s*\|"
)
SECTION_TAG = re.compile(r"<section\b[^>]*>", re.I)
LINK = re.compile(r'(?:href="#(?P<href>/[^"#]*)"|data-go="(?P<go>/[^"]*)")')
FLOW_ROUTE = re.compile(r"""route:\s*["'](?P<route>/[^"']*)["']""")
FLOW_ID = re.compile(r"""id:\s*["'](?P<id>FLOW-\d+)["']""")
BRIEF_FLOW = re.compile(r"^\|\s*(?P<id>FLOW-\d+)\s*\|[^|]*\|[^|]*\|\s*(?P<tier>core|supporting)\s*\|")
PLACEHOLDER_LABEL = "Out of prototype scope"
PLACEHOLDER_TEXT = re.compile(r"lorem ipsum|\bItem \d\b|\bTest User\b|example@test\.com", re.I)
EXTERNAL = re.compile(r'(?:src|href)="(?P<url>https?://[^"]+)"')
ALLOWED_HOSTS = ("fonts.googleapis.com", "fonts.gstatic.com")

Finding = tuple[str, str, str, str]


def attr(tag: str, name: str) -> str | None:
    m = re.search(rf'{name}="([^"]*)"', tag)
    return m.group(1) if m else None


def route_matches(route: str, pattern: str) -> bool:
    a = route.split("?")[0].strip("/").split("/")
    b = pattern.strip("/").split("/")
    return len(a) == len(b) and all(y.startswith(":") or x == y for x, y in zip(a, b))


def brief_screens(text: str) -> list[dict]:
    rows = []
    for line in text.splitlines():
        m = BRIEF_ROW.match(line)
        if m:
            rows.append(m.groupdict())
    return rows


def brief_flows(text: str) -> dict[str, str]:
    flows = {}
    for line in text.splitlines():
        m = BRIEF_FLOW.match(line)
        if m:
            flows[m["id"]] = m["tier"]
    return flows


def sections(html: str) -> list[dict]:
    tags = list(SECTION_TAG.finditer(html))
    out = []
    for i, m in enumerate(tags):
        route = attr(m.group(0), "data-route")
        if route is None:
            continue
        end = tags[i + 1].start() if i + 1 < len(tags) else len(html)
        out.append({
            "route": route,
            "tier": attr(m.group(0), "data-tier"),
            "body": html[m.end():end],
        })
    return out


def check(folder: Path) -> list[Finding]:
    findings: list[Finding] = []
    brief_path = folder / "prototype-brief.md"
    index_path = folder / "index.html"
    flows_path = folder / "flows.js"

    if not brief_path.is_file():
        return [("blocker", "prototype-brief.md", "missing", "write the brief before building")]
    if not index_path.is_file():
        return [("blocker", "index.html", "missing", "build the prototype per build-rules.md")]

    brief = brief_path.read_text(encoding="utf-8")
    html = index_path.read_text(encoding="utf-8")
    rows = brief_screens(brief)
    secs = sections(html)
    if not rows:
        findings.append(("blocker", "prototype-brief.md", "no Screens table rows found",
                         "use the template's Screens table: | SCR-xx | name | /route | tier | ..."))
        return findings

    patterns = [s["route"] for s in secs]

    # 1. every brief screen has a section with the same tier
    for row in rows:
        match = next((s for s in secs if s["route"] == row["route"]), None)
        if match is None:
            findings.append(("blocker", "index.html",
                             f"{row['id']} {row['name']} ({row['route']}) has no section",
                             f'add <section class="screen" data-route="{row["route"]}" data-tier="{row["tier"]}">'))
        elif match["tier"] != row["tier"]:
            findings.append(("major", "index.html",
                             f"{row['route']} tier is {match['tier']!r}, brief says {row['tier']!r}",
                             "align data-tier with the brief or change the brief and log it"))

    # 2. every section is in the brief
    brief_routes = {r["route"] for r in rows}
    for s in secs:
        if s["route"] not in brief_routes:
            findings.append(("major", "index.html", f"section {s['route']} is not in the brief",
                             "add a Screens row or remove the section"))

    # 3. links resolve; 4. reachability
    inbound: dict[str, int] = {p: 0 for p in patterns}
    for m in LINK.finditer(html):
        target = m.group("href") or m.group("go")
        hit = next((p for p in patterns if route_matches(target, p)), None)
        if hit is None:
            findings.append(("blocker", "index.html", f"dead link to {target}",
                             "point it at an existing data-route or add the screen"))
        else:
            inbound[hit] += 1
    entry = next((r["route"] for r in rows if r["tier"] == "core"), rows[0]["route"])
    for p, n in inbound.items():
        if n == 0 and p != entry:
            findings.append(("major", "index.html", f"no link reaches {p}",
                             "link it from the screen before it in its flow"))

    # 5. placeholders carry the label
    for s in secs:
        if s["tier"] == "placeholder" and PLACEHOLDER_LABEL not in s["body"]:
            findings.append(("major", "index.html", f"placeholder {s['route']} lacks its label",
                             f'add <p class="placeholder-label">… {PLACEHOLDER_LABEL}.</p> and a back link'))

    # 6. flows
    if flows_path.is_file():
        flows_js = flows_path.read_text(encoding="utf-8")
        for m in FLOW_ROUTE.finditer(flows_js):
            if not any(route_matches(m["route"], p) for p in patterns):
                findings.append(("blocker", "flows.js", f"step route {m['route']} has no section",
                                 "fix the route or add the screen"))
        declared = {m["id"] for m in FLOW_ID.finditer(flows_js)}
        for fid, tier in brief_flows(brief).items():
            if tier == "core" and fid not in declared:
                findings.append(("major", "flows.js", f"core flow {fid} is not in the tour",
                                 "add it to window.FLOWS with one step per screen"))
    else:
        findings.append(("major", "flows.js", "missing", "write window.FLOWS per build-rules.md"))

    # 7. placeholder text; 8. external dependencies
    for m in PLACEHOLDER_TEXT.finditer(html):
        findings.append(("major", "index.html", f"placeholder text {m.group(0)!r}",
                         "replace with real copy or the brief's sample data"))
    for m in EXTERNAL.finditer(html):
        if not any(h in m["url"] for h in ALLOWED_HOSTS):
            findings.append(("minor", "index.html", f"external dependency {m['url']}",
                             "inline it or move it to assets/"))
    return findings


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("folder", type=Path)
    args = parser.parse_args(argv)
    findings = check(args.folder)
    for sev, where, problem, fix in findings:
        print(f"{sev} | {where} | {problem} | {fix}")
    blockers = sum(1 for f in findings if f[0] == "blocker")
    print(f"{len(findings)} finding(s), {blockers} blocker(s)")
    return 1 if blockers else 0


if __name__ == "__main__":
    sys.exit(main())
