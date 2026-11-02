<#
.SYNOPSIS
Install the pm product-pipeline plugin for Claude Code (user scope) and/or expose its skills to Codex.

.EXAMPLE
powershell -File install.ps1 -All
powershell -File install.ps1 -Claude
powershell -File install.ps1 -Codex
#>
[CmdletBinding()]
param(
    [switch]$Claude,
    [switch]$Codex,
    [switch]$All
)

$ErrorActionPreference = "Stop"
$pluginRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$marketplaceName = "pm-local"
$pluginId = "pm@$marketplaceName"

if ($All) { $Claude = $true; $Codex = $true }
if (-not $Claude -and -not $Codex) {
    Write-Output "Usage: install.ps1 [-Claude] [-Codex] [-All]"
    Write-Output "  -Claude  register $pluginRoot as marketplace '$marketplaceName' and install '$pluginId' at user scope"
    Write-Output "  -Codex   junction each skills/<name> into ~/.agents/skills and add a pointer to ~/.codex/AGENTS.md"
    exit 0
}

function Step($label, $result) { Write-Output ("{0,-60} {1}" -f $label, $result) }

if ($Claude) {
    Write-Output "== Claude Code =="
    $claudeCmd = Get-Command claude -ErrorAction SilentlyContinue
    if (-not $claudeCmd) {
        Write-Output "claude CLI not found on PATH; skipping Claude install."
    } else {
        # Native commands write warnings to stderr; under ErrorActionPreference=Stop
        # that would abort the script, so run them with Continue and check exit codes.
        $ErrorActionPreference = "Continue"
        $failed = $false
        $markets = (& claude plugin marketplace list) -join "`n"
        if ($markets -match [regex]::Escape($marketplaceName)) {
            Step "marketplace add $marketplaceName" "skipped (already present)"
        } else {
            & claude plugin marketplace add $pluginRoot --scope user | Out-Null
            if ($LASTEXITCODE -ne 0) { Step "marketplace add $marketplaceName" "FAILED (exit $LASTEXITCODE)"; $failed = $true }
            else { Step "marketplace add $marketplaceName" "done" }
        }
        if (-not $failed) {
            $plugins = (& claude plugin list) -join "`n"
            if ($plugins -match [regex]::Escape($pluginId)) {
                Step "install $pluginId" "skipped (already present)"
            } else {
                & claude plugin install $pluginId --scope user | Out-Null
                if ($LASTEXITCODE -ne 0) { Step "install $pluginId" "FAILED (exit $LASTEXITCODE)"; $failed = $true }
                else { Step "install $pluginId" "done" }
            }
        }
        $ErrorActionPreference = "Stop"
        if ($failed) { exit 1 }
    }
}

if ($Codex) {
    Write-Output "== Codex / cross-runtime skills =="
    $agentsSkills = Join-Path $HOME ".agents\skills"
    New-Item -ItemType Directory -Force -Path $agentsSkills | Out-Null
    Get-ChildItem -Directory (Join-Path $pluginRoot "skills") | ForEach-Object {
        $target = $_.FullName
        $link = Join-Path $agentsSkills $_.Name
        if (Test-Path $link) {
            $item = Get-Item $link -Force
            $existingTarget = $null
            if ($item.LinkType) { $existingTarget = ($item.Target | Select-Object -First 1) }
            if ($existingTarget -and ((Resolve-Path $existingTarget).Path -eq $target)) {
                Step "junction $($_.Name)" "skipped (already present)"
            } else {
                Step "junction $($_.Name)" "WARNING: exists and points elsewhere ($link); left unchanged"
            }
        } else {
            New-Item -ItemType Junction -Path $link -Target $target | Out-Null
            Step "junction $($_.Name)" "done"
        }
    }
    # Stale junctions: links into this plugin's skills folder whose skill was renamed or removed.
    # Only junctions are touched, only ones that point into this plugin, and only the link is removed.
    $skillsRoot = Join-Path $pluginRoot "skills"
    Get-ChildItem -LiteralPath $agentsSkills -Force | Where-Object { $_.LinkType -eq "Junction" } | ForEach-Object {
        $existingTarget = ($_.Target | Select-Object -First 1)
        if (-not $existingTarget) { return }
        $insidePlugin = $existingTarget.StartsWith($skillsRoot + "\", [System.StringComparison]::OrdinalIgnoreCase)
        if ($insidePlugin -and -not (Test-Path -LiteralPath $existingTarget)) {
            cmd /c "rmdir ""$($_.FullName)""" | Out-Null
            if (Test-Path -LiteralPath $_.FullName) { Step "stale junction $($_.Name)" "WARNING: could not remove" }
            else { Step "stale junction $($_.Name)" "removed (target gone: $existingTarget)" }
        }
    }
    $codexDir = Join-Path $HOME ".codex"
    New-Item -ItemType Directory -Force -Path $codexDir | Out-Null
    $codexAgents = Join-Path $codexDir "AGENTS.md"
    $skillNames = (Get-ChildItem -Directory $skillsRoot | ForEach-Object { $_.Name }) -join ", "
    $pointer = "See $pluginRoot\AGENTS.md for the pm product pipeline (skills: $skillNames)."
    $utf8 = New-Object System.Text.UTF8Encoding $false
    if (Test-Path $codexAgents) {
        $existing = Get-Content $codexAgents -Raw -Encoding UTF8
        if ($existing -match [regex]::Escape($pointer)) {
            Step "pointer in ~/.codex/AGENTS.md" "skipped (already present)"
        } elseif ($existing -match [regex]::Escape($pluginRoot)) {
            $updated = [regex]::Replace($existing, "^.*" + [regex]::Escape($pluginRoot) + ".*$", [System.Text.RegularExpressions.MatchEvaluator]{ param($m) $pointer }, "Multiline")
            [System.IO.File]::WriteAllText($codexAgents, $updated, $utf8)
            Step "pointer in ~/.codex/AGENTS.md" "updated (skill list changed)"
        } else {
            [System.IO.File]::AppendAllText($codexAgents, $pointer + "`n", $utf8)
            Step "pointer in ~/.codex/AGENTS.md" "done"
        }
    } else {
        [System.IO.File]::AppendAllText($codexAgents, $pointer + "`n", $utf8)
        Step "pointer in ~/.codex/AGENTS.md" "done"
    }
}

exit 0
