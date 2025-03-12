$mic = Get-CimInstance Win32_PnPEntity | Where-Object { $_.Name -match "Microphone" }

if ($mic) {
    $status = $mic.Status
    $deviceId = $mic.PNPDeviceID

    if ($status -eq "OK") {
        Write-Output "🔇 Desativando microfone..."
        pnputil /disable-device "$deviceId"
    } else {
        Write-Output "🎤 Ativando microfone..."
        pnputil /enable-device "$deviceId"
    }
} else {
    Write-Output "❌ Nenhum microfone encontrado."
}