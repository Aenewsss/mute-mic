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
        // 🔹 Para macOS - Usando AppleScript
        command = isMuted
            ? `osascript -e 'set volume input volume 0'`   // 🔇 Mutar Microfone
            : `osascript -e 'set volume input volume 100'`; // 🎤 Ativar Microfone
    } else if (isWindows) {
        const scriptPath = `"${path.join(__dirname, 'toggle-microphone.ps1')}"`; // Caminho com aspas
        command = `powershell -ExecutionPolicy Bypass -File ${scriptPath}`;
    } else {
        console.error("Sistema operacional não suportado!");
        return;
    }

    exec(command, (error) => {
        if (error) {
            console.error("Erro ao alternar o microfone:", error);
            return;
        }
        new Notification({
            title: "Microfone",
            body: isMuted ? "Microfone Mutado 🔇" : "Microfone Ativado 🎤",
        }).show();
    });
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
    // tray.on("click", toggleMicrophone); // Permite ativar/mutar clicando no ícone

    if (isMac) {
        app.dock.setIcon(path.join(__dirname, "icon-dock.png"));
    }
});

app.on("will-quit", () => {
    globalShortcut.unregisterAll();
});