// Require som parts of electron
// app = the application
// BrowserWindow = a class that lets us create rendering/browser windows
const { app, BrowserWindow } = require("electron");

const isMac = process.platform === 'darwin';


// Require path that let us build file path os independtly
//const path = require("path");
function createWindow() {
    // create a new browser window
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      title:"The Shoe Shop"
      //https://leverans.rubinbarclay.dev/
    });
  mainWindow.loadURL("http://localhost:3000");
  isMac && app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  
}
    
    // load an URL in the window

app.whenReady().then(createWindow);
// Listen for if all windows have closed
// if not a Mac the close the app
app.on('window-all-closed', () => {
  !isMac && app.quit;
});
