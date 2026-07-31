$files = Get-ChildItem -Path "src" -Recurse -Include "*.tsx","*.ts"
$replacements = @(
    @{Pattern = '#4CAF50'; Replacement = '#059669'},
    @{Pattern = '#59C22E'; Replacement = '#10B981'},
    @{Pattern = '#22c55e'; Replacement = '#059669'},
    @{Pattern = '#16a34a'; Replacement = '#047857'},
    @{Pattern = '#4ade80'; Replacement = '#34D399'},
    @{Pattern = '#2E7D32'; Replacement = '#065F46'},
    @{Pattern = '#2F7A18'; Replacement = '#065F46'},
    @{Pattern = '#7ED957'; Replacement = '#34D399'},
    @{Pattern = '#66BB6A'; Replacement = '#10B981'},
    @{Pattern = '#F8FAFC'; Replacement = '#F5F5F7'},
    @{Pattern = '#F3F4F6'; Replacement = '#F5F5F7'},
    @{Pattern = '#f4f4f5'; Replacement = '#F5F5F7'},
    @{Pattern = '#0f172a'; Replacement = '#1C1C1E'},
    @{Pattern = '#111827'; Replacement = '#1C1C1E'},
    @{Pattern = '#020617'; Replacement = '#0A0A0B'},
    @{Pattern = 'rgba\(\s*34\s*,\s*197\s*,\s*94\s*,'; Replacement = 'rgba(5, 150, 105,'},
    @{Pattern = 'rgba\(\s*76\s*,\s*175\s*,\s*80\s*,'; Replacement = 'rgba(5, 150, 105,'},
    @{Pattern = 'rgba\(\s*89\s*,\s*194\s*,\s*46\s*,'; Replacement = 'rgba(16, 185, 129,'},
    @{Pattern = 'rgba\(\s*11\s*,\s*15\s*,\s*10\s*,'; Replacement = 'rgba(28, 28, 30,'},
    @{Pattern = 'rgba\(\s*17\s*,\s*24\s*,\s*39\s*,'; Replacement = 'rgba(28, 28, 30,'}
)

$count = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $original = $content
    foreach ($r in $replacements) {
        $content = $content -ireplace $r.Pattern, $r.Replacement
    }
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($file.FullName, $content)
        $count++
        Write-Host "Updated: $($file.Name)"
    }
}
Write-Host "Total files updated: $count"