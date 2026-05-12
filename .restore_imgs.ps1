$OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Add-Type -AssemblyName System.IO.Compression.FileSystem

$pptx = Get-ChildItem 'C:\Users\pixxiao\Desktop' -Filter *.pptx | Select-Object -First 1
$ext = 'C:\Users\pixxiao\Desktop\升级版作品集\.pptx_extracted'
if (Test-Path $ext) { Remove-Item $ext -Recurse -Force }
[System.IO.Compression.ZipFile]::ExtractToDirectory($pptx.FullName, $ext)

$src = Join-Path $ext 'ppt\media'
$dst = 'C:\Users\pixxiao\Desktop\升级版作品集\src\assets\portfolio'
if (-not (Test-Path $dst)) { New-Item -ItemType Directory -Path $dst -Force | Out-Null }

$map = @{
  'image-4-2.png'  = 'tod-01.png'
  'image-5-2.png'  = 'tod-02.png'
  'image-6-2.png'  = 'tod-03.png'
  'image-7-2.png'  = 'tod-04.png'
  'image-8-2.png'  = 'tod-05.png'
  'image-9-2.png'  = 'tod-06.png'
  'image-10-2.png' = 'tod-07.png'
  'image-11-2.png' = 'tod-08.png'
  'image-12-2.png' = 'tod-09.png'
  'image-13-2.png' = 'tod-10.png'
  'image-14-2.png' = 'tod-11.png'
  'image-15-2.png' = 'tod-12.png'
  'image-15-3.png' = 'tod-13.png'
  'image-17-1.png' = 'relight-01.png'
  'image-17-2.png' = 'relight-02.png'
  'image-18-2.png' = 'relight-03.png'
  'image-18-3.png' = 'relight-04.png'
  'image-19-2.png' = 'relight-05.png'
  'image-19-3.png' = 'relight-06.png'
  'image-20-2.png' = 'relight-07.png'
  'image-20-3.png' = 'relight-08.png'
  'image-21-2.png' = 'relight-09.png'
  'image-21-3.png' = 'relight-10.png'
  'image-22-2.png' = 'relight-11.png'
  'image-22-3.png' = 'relight-12.png'
  'image-22-4.png' = 'relight-13.png'
  'image-22-5.png' = 'relight-14.png'
  'image-23-2.png' = 'relight-15.png'
  'image-23-3.png' = 'relight-16.png'
  'image-25-2.png' = 'jp-garden-01.png'
  'image-26-2.png' = 'jp-garden-02.png'
  'image-27-2.png' = 'jp-garden-03.png'
  'image-28-2.png' = 'jp-garden-04.png'
  'image-29-1.png' = 'jp-garden-05.png'
  'image-29-2.png' = 'jp-garden-06.png'
  'image-29-3.png' = 'jp-garden-07.png'
  'image-30-1.png' = 'jp-garden-08.png'
  'image-30-2.png' = 'jp-garden-09.png'
  'image-32-2.png' = 'char-light-01.png'
  'image-34-1.png' = 'bamboo-01.png'
  'image-35-1.png' = 'env-01.png'
  'image-36-1.png' = 'env-02.png'
  'image-37-1.png' = 'church-01.png'
  'image-38-1.png' = 'church-02.png'
}

$ok = 0; $miss = 0
foreach ($k in $map.Keys) {
  $s = Join-Path $src $k
  if (Test-Path $s) {
    Copy-Item $s (Join-Path $dst $map[$k]) -Force
    $ok++
  } else { $miss++ }
}
Write-Host ("Copied: $ok  Missing: $miss")
Remove-Item $ext -Recurse -Force
Get-ChildItem $dst | Measure-Object | ForEach-Object { Write-Host ("Total in src/assets/portfolio: " + $_.Count) }
