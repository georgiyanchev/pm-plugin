<#
.SYNOPSIS
Scaffold the product-side folders and documents of a project, and report what it still lacks.

.DESCRIPTION
Reads ..\references\manifest.md, creates every missing row from ..\references\templates\<path>,
never overwrites an existing file, and prints a status report: one row per manifest path with
its state (created, missing, template, populated, empty, in use, skipped), the count of TBD:
lines, the template headings an existing file lacks, and a note when the owner has to act.

.EXAMPLE
powershell -File project-scaffold.ps1 -Root "C:\projects\new-product"
powershell -File project-scaffold.ps1 -Root "C:\projects\existing" -Check
#>
[CmdletBinding()]
param(
    [string]$Root = (Get-Location).Path,
    [switch]$Check
)

$ErrorActionPreference = "Stop"
$utf8 = New-Object System.Text.UTF8Encoding $false
$referencesDir = Join-Path $PSScriptRoot "..\references"
$manifestPath = Join-Path $referencesDir "manifest.md"
$templatesDir = Join-Path $referencesDir "templates"

function Fail($message) { Write-Output "project-scaffold: $message"; exit 1 }

# --- root ---------------------------------------------------------------------
if (Test-Path -LiteralPath $Root -PathType Leaf) { Fail "root is a file, not a folder: $Root" }
if (-not (Test-Path -LiteralPath $Root)) {
    if ($Check) { Fail "root does not exist (nothing to check): $Root" }
    New-Item -ItemType Directory -Force -Path $Root | Out-Null
}
$Root = (Resolve-Path -LiteralPath $Root).Path

# --- manifest -----------------------------------------------------------------
if (-not (Test-Path -LiteralPath $manifestPath)) { Fail "manifest not found: $manifestPath" }
$rowPattern = '^\|\s*(?<path>[^|]+?)\s*\|\s*(?<required>yes|optional)\s*\|\s*(?<create>always|new repo only)\s*\|\s*(?<purpose>[^|]*?)\s*\|\s*(?<readby>[^|]*?)\s*\|$'
$rows = @()
foreach ($line in [System.IO.File]::ReadAllLines($manifestPath, $utf8)) {
    if ($line -match $rowPattern -and $Matches.path -ne 'Path') {
        $path = $Matches.path
        $isFolder = $path.EndsWith('/')
        $templateRel = if ($isFolder) { $path + 'README.md' } else { $path }
        $rows += [pscustomobject]@{
            Path = $path
            Required = $Matches.required
            Create = $Matches.create
            IsFolder = $isFolder
            TemplateRel = $templateRel
            Template = Join-Path $templatesDir ($templateRel -replace '/', '\')
            Target = Join-Path $Root ($path.TrimEnd('/') -replace '/', '\')
        }
    }
}
if ($rows.Count -eq 0) { Fail "no rows parsed from $manifestPath" }

# every template must exist before anything is written
foreach ($row in $rows) {
    if (-not (Test-Path -LiteralPath $row.Template -PathType Leaf)) { Fail "template missing for $($row.Path): $($row.TemplateRel)" }
}

# a .git entry in the root or any ancestor means the project sits inside a repository with history
$hasGit = $false
$probe = $Root
while ($probe) {
    if (Test-Path -LiteralPath (Join-Path $probe ".git")) { $hasGit = $true; break }
    $parent = Split-Path -Parent $probe
    if (-not $parent -or $parent -eq $probe) { break }
    $probe = $parent
}
$manifestPaths = @{}
foreach ($row in $rows) { $manifestPaths[$row.Path.TrimEnd('/')] = $true; if ($row.IsFolder) { $manifestPaths[$row.Path + 'README.md'] = $true } }

# --- helpers ------------------------------------------------------------------
function Write-Template($row, $targetFile) {
    $text = [System.IO.File]::ReadAllText($row.Template, $utf8) -replace "`r`n", "`n"
    $dir = Split-Path -Parent $targetFile
    if (-not (Test-Path -LiteralPath $dir)) { New-Item -ItemType Directory -Force -Path $dir | Out-Null }
    [System.IO.File]::WriteAllText($targetFile, $text, $utf8)
}
function Count-Tbd($file) {
    $n = 0
    foreach ($l in [System.IO.File]::ReadAllLines($file, $utf8)) { if ($l -match 'TBD:') { $n++ } }
    return $n
}
function Headings($file) {
    $out = @()
    foreach ($l in [System.IO.File]::ReadAllLines($file, $utf8)) { $t = $l.TrimEnd("`r"); if ($t -match '^## ') { $out += ($t.Substring(3).Trim() -replace '^\d+\.\s*', '') } }
    return $out
}
function Missing-Sections($row, $file) {
    $want = Headings $row.Template
    if ($want.Count -eq 0) { return "" }
    $have = Headings $file
    $missing = @($want | Where-Object { $have -notcontains $_ })
    return ($missing -join ", ")
}
function Folder-State($row) {
    $prefix = $row.Path
    $other = Get-ChildItem -LiteralPath $row.Target -Force | Where-Object {
        $rel = $prefix + $_.Name + $(if ($_.PSIsContainer) { '/' } else { '' })
        -not $manifestPaths.ContainsKey($rel.TrimEnd('/')) -and -not $manifestPaths.ContainsKey($rel)
    }
    if (@($other).Count -gt 0) { return "in use" } else { return "empty" }
}

# --- walk ---------------------------------------------------------------------
$claudeHasGuidance = $false
$claudePath = Join-Path $Root "CLAUDE.md"
if (Test-Path -LiteralPath $claudePath -PathType Leaf) {
    $nonEmpty = @([System.IO.File]::ReadAllLines($claudePath, $utf8) | Where-Object { $_.Trim() -ne "" })
    $claudeHasGuidance = $nonEmpty.Count -gt 3
}

$report = @()
foreach ($row in $rows) {
    $state = ""; $tbd = ""; $sections = ""; $note = ""
    if ($row.IsFolder) {
        $readme = Join-Path $row.Target "README.md"
        $existedBefore = Test-Path -LiteralPath $row.Target -PathType Container
        if (-not $existedBefore) {
            if ($Check) { $state = "missing" }
            else { Write-Template $row $readme; $state = "created" }
        } else {
            if (-not (Test-Path -LiteralPath $readme -PathType Leaf)) {
                if ($Check) { $note = "README missing" } else { Write-Template $row $readme; $note = "README created" }
            }
            $state = Folder-State $row
        }
    } else {
        $target = $row.Target
        if (Test-Path -LiteralPath $target -PathType Leaf) {
            $n = Count-Tbd $target
            $tbd = "$n"
            $state = if ($n -gt 0) { "template" } else { "populated" }
            $sections = Missing-Sections $row $target
        } elseif ($row.Create -eq "new repo only" -and $hasGit) {
            $state = "skipped"; $note = "new repo only: the folder already has .git"
        } elseif ($Check) {
            $state = "missing"
        } else {
            Write-Template $row $target
            $state = "created"
            $tbd = "$(Count-Tbd $target)"
            if ($row.Path -eq "AGENTS.md" -and $claudeHasGuidance) { $note = "CLAUDE.md holds guidance; move it into AGENTS.md and make CLAUDE.md a pointer" }
        }
    }
    $report += [pscustomobject]@{ Path = $row.Path; Required = $row.Required; State = $state; Tbd = $tbd; Sections = $sections; Note = $note }
}

# --- print --------------------------------------------------------------------
function Print-Table($title, $items) {
    Write-Output ""
    Write-Output "## $title"
    Write-Output ""
    Write-Output "| Path | State | TBD | Sections missing | Note |"
    Write-Output "|---|---|---|---|---|"
    foreach ($i in $items) { Write-Output "| $($i.Path) | $($i.State) | $($i.Tbd) | $($i.Sections) | $($i.Note) |" }
}
Write-Output "Scaffold report for $Root"
Print-Table "Required" @($report | Where-Object { $_.Required -eq "yes" })
Print-Table "Optional" @($report | Where-Object { $_.Required -eq "optional" })
$counts = @{}
foreach ($s in "created", "template", "populated", "empty", "in use", "missing", "skipped") { $counts[$s] = @($report | Where-Object { $_.State -eq $s }).Count }
Write-Output ""
Write-Output ("created {0}, template {1}, populated {2}, empty {3}, in use {4}, missing {5}, skipped {6}" -f $counts["created"], $counts["template"], $counts["populated"], $counts["empty"], $counts["in use"], $counts["missing"], $counts["skipped"])
exit 0
