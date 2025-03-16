const { app, globalShortcut, Notification, Tray, Menu, BrowserWindow, nativeImage } = require("electron");
const { exec } = require("child_process");
const path = require('path');
const os = require("os");

let isMuted = false;
let tray = null;

const isMac = os.platform() === "darwin";
const isWindows = os.platform() === "win32";

function toggleMicrophone() {
    isMuted = !isMuted;

    if (isMac) {
        // 🔹 Para macOS - Mutando todos os microfones corretamente com delay
        exec("SwitchAudioSource -a -t input", (error, stdout) => {
            if (error) {
                console.error("Erro ao listar dispositivos de áudio:", error);
                return;
            }

            const devices = stdout.split("\n").filter(device => device.trim() !== "" && !device.toLowerCase().trim().includes("iphone"));

            console.log("Dispositivos de entrada detectados:", devices);
            
            function processDevice(index) {
                if (index >= devices.length) {
                    return;
                }

                const device = devices[index];
                const switchCommand = `SwitchAudioSource -t input -s "${device}"`;

                exec(switchCommand, (error) => {
                    if (error) {
                        console.error(`Erro ao alternar para o microfone ${device}:`, error);
                    } else {
                        console.log(`Microfone alternado para: ${device}`);

                        setTimeout(() => {
                            const volumeCommand = `osascript -e 'set volume input volume ${isMuted ? "0" : "100"}'`;
                            exec(volumeCommand, (error) => {
                                if (error) {
                                    console.error(`Erro ao mutar microfone ${device}:`, error);
                                } else {
                                    console.log(`Microfone ${device} ${isMuted ? "mutado" : "ativado"} com sucesso.`);
                                }
                                processDevice(index + 1); // Processa o próximo microfone após um pequeno atraso
                            });
                        }, 200); // Pequeno atraso para garantir que a mudança foi aplicada antes de mutar
                    }
                });
            }

            processDevice(0); // Inicia a mutação dos microfones em sequência
        });
    } else if (isWindows) {
        // 🔹 Para Windows - Mutando todos os microfones corretamente
        const volumeCommand = `powershell -Command "Get-AudioDevice -Playback | ForEach-Object {Set-AudioDevice -PlaybackMute ${isMuted}}"`;
        exec(volumeCommand, (error, stdout, stderr) => {
            if (error || stderr) {
                console.error("Erro ao mutar microfones no Windows:", error || stderr);
            } else {
                console.log("Todos os microfones no Windows foram " + (isMuted ? "mutados" : "ativados"));
            }
        });
    } else {
        console.error("Sistema operacional não suportado!");
        return;
    }

    new Notification({
        title: "Microfone",
        body: isMuted ? "Todos os Microfones Mutados 🔇" : "Todos os Microfones Ativados 🎤",
    }).show();
}

app.whenReady().then(() => {
    console.log('App is ready')
    if (isMac) globalShortcut.register("Command+Shift+M", toggleMicrophone);
    else globalShortcut.register("Control+Alt+M", toggleMicrophone);

    const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'icon.png')).resize({ width: 16, height: 16 })

    tray = new Tray(trayIcon);
    const contextMenu = Menu.buildFromTemplate([
        { label: "Alternar Microfone", click: toggleMicrophone, },
        { type: "separator" },
        { label: "Sair", role: "quit" }
    ]);

    tray.setToolTip("MicMuter - Clique para alternar");
    tray.setContextMenu(contextMenu);

    if (isMac) {
        app.dock.setIcon(path.join(__dirname, "icon-dock.png"));
    }
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
});