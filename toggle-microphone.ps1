$mic = Get-CimInstance Win32_PnPEntity | Where-Object { $_.Name -match "Microphone" }

if ($mic) {
    if ($mic.Status -eq 'OK') {
        Write-Output "Desativando microfone..."
        Disable-PnpDevice -InstanceId $mic.PNPDeviceID -Confirm:$false
    } else {
        Write-Output "Ativando microfone..."
        Enable-PnpDevice -InstanceId $mic.PNPDeviceID -Confirm:$false
    }
} else {
    Write-Output "Nenhum microfone encontrado."
}