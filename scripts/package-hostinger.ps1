param(
    [Parameter(Mandatory = $true)][string]$PublicRoot,
    [Parameter(Mandatory = $true)][string]$ArchivePath,
    [Parameter(Mandatory = $true)][string]$ExclusionsPath
)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [Text.UTF8Encoding]::new($false)
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$expectedPublic = [IO.Path]::GetFullPath((Join-Path $projectRoot 'public'))
$publicPath = [IO.Path]::GetFullPath($PublicRoot)
$outputParent = [IO.Path]::GetFullPath((Join-Path $projectRoot '..'))
$archivePathResolved = [IO.Path]::GetFullPath($ArchivePath)
if ($publicPath -ne $expectedPublic) { throw 'A origem precisa ser a pasta public deste projeto.' }
if ([IO.Path]::GetDirectoryName($archivePathResolved) -ne $outputParent) { throw 'O ZIP precisa ficar na pasta do workspace.' }
if ([IO.Path]::GetFileName($archivePathResolved) -ne 'clone-v1-hostinger.zip') { throw 'O destino precisa ser clone-v1-hostinger.zip para preservar os arquivos de restauração.' }

$expectedExclusions = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot 'hostinger-exclusions.json'))
if ([IO.Path]::GetFullPath($ExclusionsPath) -ne $expectedExclusions) { throw 'Manifesto de exclusões fora do projeto.' }
$excludedPrefixes = Get-Content -LiteralPath $expectedExclusions -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($prefix in $excludedPrefixes) {
    if ($prefix -isnot [string] -or -not $prefix.EndsWith('/')) { throw 'Prefixo de exclusão inválido.' }
}
$allFiles = @(Get-ChildItem -LiteralPath $publicPath -Recurse -Force -File | Where-Object {
    $relative = $_.FullName.Substring($publicPath.Length + 1).Replace('\', '/')
    $include = $true
    foreach ($prefix in $excludedPrefixes) { if ($relative.StartsWith($prefix)) { $include = $false; break } }
    $include
} | Sort-Object FullName)
$stream = [IO.File]::Open($archivePathResolved, [IO.FileMode]::Create, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
try {
    $zip = [IO.Compression.ZipArchive]::new($stream, [IO.Compression.ZipArchiveMode]::Create, $true)
    try {
        foreach ($file in $allFiles) {
            $relative = $file.FullName.Substring($publicPath.Length + 1).Replace('\', '/')
            [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, $relative, [IO.Compression.CompressionLevel]::Optimal) | Out-Null
        }
    } finally { $zip.Dispose() }
} finally { $stream.Dispose() }

$archive = Get-Item -LiteralPath $archivePathResolved
$hash = (Get-FileHash -LiteralPath $archivePathResolved -Algorithm SHA256).Hash
$reader = [IO.Compression.ZipFile]::OpenRead($archivePathResolved)
try {
    $entryNames = @($reader.Entries | ForEach-Object { $_.FullName })
    foreach ($required in @('index.html', '.htaccess', 'robots.txt', 'sitemap.xml', '404.html', 'privacy.html', 'terms.html')) {
        if ($entryNames -notcontains $required) { throw "Arquivo ausente na raiz do ZIP: $required" }
    }
    if (@($entryNames | Where-Object { $_ -match '(^|/)(node_modules|backups|references|\.git)/|^clone v1/|^public/' }).Count -gt 0) {
        throw 'O ZIP de hospedagem contém uma pasta de projeto indevida.'
    }
} finally { $reader.Dispose() }

[pscustomobject]@{ File = $archive.FullName; Entries = $allFiles.Count; Bytes = $archive.Length; SHA256 = $hash; RootIndex = $true; ExcludedPrefixes = $excludedPrefixes } | ConvertTo-Json -Compress
