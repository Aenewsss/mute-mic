$mic = Get-PnpDevice | Where-Object { $_.FriendlyName -match 'Microphone' }
if ($mic.Status -eq 'OK') {
    $mic | Disable-PnpDevice -Confirm:$false
} else {
    $mic | Enable-PnpDevice -Confirm:$false
}