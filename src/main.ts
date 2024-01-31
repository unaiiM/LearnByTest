import { app, BrowserWindow } from 'electron';
import { ADDRESS, PORT } from './server.js';

let window : BrowserWindow;

let createWindow : () => void = () => {
    window = new BrowserWindow({
        width: 1200,
        height: 1000,
        title: "LearnByTest",
        resizable: false,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true
        }
    });
    
    window.loadURL(`http://${(ADDRESS === '0.0.0.0') ? '127.0.0.1' : ADDRESS}:${PORT}/index.html`);

    window.setMenu(null);

    //window.webContents.openDevTools();

    window.on("closed", () => {
        window = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    };
});