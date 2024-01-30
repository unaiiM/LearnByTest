"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const express_1 = __importDefault(require("express"));
const PORT = 1266;
const ADDRESS = '0.0.0.0';
const serv = (0, express_1.default)();
serv.use('/', express_1.default.static(__dirname + '/../ui/dist/ui/browser/'));
serv.listen(PORT, ADDRESS, () => console.log('Server started successfully!'));
let window;
let createWindow = () => {
    window = new electron_1.BrowserWindow({
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
};
electron_1.app.on("ready", createWindow);
electron_1.app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
    ;
});
