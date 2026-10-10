$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$outputParent = [IO.Path]::GetFullPath((Join-Path $projectRoot '..'))
$archivePath = [IO.Path]::GetFullPath((Join-Path $outputParent 'clone-v1-norte-autoral.zip'))
if ([IO.Path]::GetDirectoryName($archivePath) -ne $outputParent) { throw 'Destino fora da pasta prevista.' }

$allFiles = @(Get-ChildItem -LiteralPath $projectRoot -Recurse -File | Where-Object {
    $relative = $_.FullName.Substring($projectRoot.Length + 1).Replace('\', '/')
    -not ($relative.StartsWith('node_modules/') -or $relative.StartsWith('references/assets-cache/') -or $relative.StartsWith('backups/') -or $relative.EndsWith('.zip'))
})
$stream = [IO.File]::Open($archivePath, [IO.FileMode]::Create, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
try {
    $zip = [IO.Compression.ZipArchive]::new($stream, [IO.Compression.ZipArchiveMode]::Create, $true)
    try {
        foreach ($file in $allFiles) {
            $relative = $file.FullName.Substring($projectRoot.Length + 1).Replace('\', '/')
            [IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $file.FullName, ('clone v1/' + $relative), [IO.Compression.CompressionLevel]::Optimal) | Out-Null
        }
    } finally { $zip.Dispose() }
} finally { $stream.Dispose() }
$archive = Get-Item -LiteralPath $archivePath
[pscustomobject]@{ File = $archive.FullName; Entries = $allFiles.Count; Bytes = $archive.Length }
