// Require som parts of electron
// app = the application
// BrowserWindow = a class that lets us create rendering/browser windows
const { app, BrowserWindow } = require("electron");

// Require path that let us build file path os independtly
//const path = require("path");
function createWindow() {
    // create a new browser window
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      //https://leverans.rubinbarclay.dev/
    });
     mainWindow.loadURL("http://localhost:3000");  
}
    
    // load an URL in the window

app.whenReady().then(createWindow);