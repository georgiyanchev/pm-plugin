"""Validate the pm plugin: skills, agents, and manifests.

Usage: python scripts/validate.py [--root <plugin root>]
Exit 0 when clean; exit 1 with one finding per line (`path: message`).
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

import yaml

MAX_BODY_BYTES = 5000
MAX_DESCRIPTION_CHARS = 500
MAX_FRONTMATTER_CHARS = 1024
HARNESS_HEADING = "## Harness notes"
LINK_RE = re.compile(r"\]\(([^)\s#]+)(?:#[^)]*)?\)")
FRONTMATTER_RE = re.compile(r"\A---\r?\n(.*?)\r?\n---\r?\n?(.*)\Z", re.S)
TEMPLATES_MAP = "TEMPLATES.md"
MAP_PATH_RE = re.compile(r"`(skills/[^`<>*\s]+)`|\]\((skills/[^)\s]+)\)")


def parse_frontmatter(text: str) -> tuple[dict, str]:
    """Split a Markdown document into (frontmatter dict, body)."""
    match = FRONTMATTER_RE.match(text)
    if not match:
        return {}, text
    data = yaml.safe_load(match.group(1)) or {}
    if not isinstance(data, dict):
        data = {}
    return data, match.group(2)


def check_enum(value: str, allowed: set[str], field: str) -> list[str]:
    if value in allowed:
        return []
    return [f"{field} '{value}' not in: {', '.join(sorted(allowed))}"]


def _broken_links(body: str, base: Path) -> list[str]:
    findings = []
    for target in LINK_RE.findall(body):
        if re.match(r"^[a-z][a-z0-9+.-]*:", target):  # URL scheme
            continue
        if not (base / target).exists():
            findings.append(f"broken link: {target}")
    return findings


def check_skill(skill_dir: Path) -> list[str]:
    skill_file = skill_dir / "SKILL.md"
    prefix = f"{skill_dir.name}/SKILL.md"
    if not skill_file.exists():
        return [f"{prefix}: missing SKILL.md"]
    text = skill_file.read_text(encoding="utf-8")
    match = FRONTMATTER_RE.match(text)
    if not match:
        return [f"{prefix}: missing frontmatter"]
    fm, body = parse_frontmatter(text)
    findings: list[str] = []
    if len(match.group(1)) > MAX_FRONTMATTER_CHARS:
        findings.append(f"frontmatter exceeds {MAX_FRONTMATTER_CHARS} chars")
    name = str(fm.get("name", ""))
    if name != skill_dir.name:
        findings.append(f"name '{name}' does not match folder '{skill_dir.name}'")
    if not re.fullmatch(r"[a-z0-9-]+", name):
        findings.append(f"name '{name}' must use lowercase letters, digits, hyphens")
    desc = str(fm.get("description", ""))
    if not desc.startswith("Use when"):
        findings.append("description must start with 'Use when'")
    if len(desc) > MAX_DESCRIPTION_CHARS:
        findings.append(f"description exceeds {MAX_DESCRIPTION_CHARS} chars")
    if len(body.encode("utf-8")) > MAX_BODY_BYTES:
        findings.append(f"body exceeds {MAX_BODY_BYTES} bytes")
    findings.extend(_broken_links(body, skill_dir))
    if HARNESS_HEADING not in body:
        findings.append(f"missing '{HARNESS_HEADING}' section")
    return [f"{prefix}: {f}" for f in findings]


def check_agent(agent_file: Path, root: Path) -> list[str]:
    prefix = f"agents/{agent_file.name}"
    text = agent_file.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(text)
    findings: list[str] = []
    for key in ("name", "description"):
        if not fm.get(key):
            findings.append(f"missing frontmatter field '{key}'")
    refs = re.findall(r"skills/[\w-]+/references/[\w-]+\.md", body)
    if not refs:
        findings.append("body must reference a skills/<skill>/references/*.md checklist")
    for ref in refs:
        if not (root / ref).exists():
            findings.append(f"referenced checklist missing: {ref}")
    return [f"{prefix}: {f}" for f in findings]


def check_templates_map(root: Path) -> list[str]:
    """Every *-template.md under skills/ is listed in TEMPLATES.md; every plugin path listed there exists."""
    map_file = root / TEMPLATES_MAP
    if not map_file.exists():
        return [f"{TEMPLATES_MAP}: missing"]
    text = map_file.read_text(encoding="utf-8")
    findings: list[str] = []
    for template in sorted((root / "skills").rglob("*-template.md")):
        rel = template.relative_to(root).as_posix()
        if rel not in text:
            findings.append(f"{TEMPLATES_MAP}: template not listed: {rel}")
    for listed in sorted({a or b for a, b in MAP_PATH_RE.findall(text)}):
        if not (root / listed).exists():
            findings.append(f"{TEMPLATES_MAP}: listed path missing: {listed}")
    return findings


def check_manifest(root: Path) -> list[str]:
    findings: list[str] = []
    plugin = root / ".claude-plugin" / "plugin.json"
    market = root / ".claude-plugin" / "marketplace.json"
    try:
        if not json.loads(plugin.read_text(encoding="utf-8")).get("name"):
            findings.append("plugin.json: missing 'name'")
    except (OSError, ValueError) as exc:
        findings.append(f"plugin.json: {exc}")
    try:
        data = json.loads(market.read_text(encoding="utf-8"))
        if not data.get("name"):
            findings.append("marketplace.json: missing 'name'")
        plugins = data.get("plugins") or []
        if len(plugins) != 1 or plugins[0].get("source") != "./":
            findings.append("marketplace.json: expected one plugin with source './'")
    except (OSError, ValueError) as exc:
        findings.append(f"marketplace.json: {exc}")
    return findings


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args(argv)
    root: Path = args.root
    findings = check_manifest(root)
    findings.extend(check_templates_map(root))
    for skill_dir in sorted(p for p in (root / "skills").glob("*") if p.is_dir()):
        findings.extend(check_skill(skill_dir))
    for agent_file in sorted((root / "agents").glob("*.md")):
        findings.extend(check_agent(agent_file, root))
    for line in findings:
        print(line)
    print(f"validate: {len(findings)} finding(s)")
    return 1 if findings else 0


if __name__ == "__main__":
    sys.exit(main())
