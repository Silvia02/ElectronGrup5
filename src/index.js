const {
  app,
  BrowserWindow,
  Menu
} = require('electron');
const remoteMain = require('@electron/remote/main');
remoteMain.initialize();
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/icon.ico',
    webPreferences: {
      nativeWindowOpen: true,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    }
  });

  //mainWindow.webContents.openDevTools();

  remoteMain.enable(mainWindow.webContents);
  mainWindow.loadURL('https://leverans.rubinbarclay.dev/', {
    userAgent: 'Electron'
  });
  mainWindow.show();
  mainWindow.on('closed', function () {
    mainWindow = null
  })

}

function createMenu() {
  let template = require('./menu-choices/menu.json');
  let mac = require('./menu-choices/mac-specific.json');
  if (process.platform === 'darwin') {
    template.unshift(mac.appMenu);
    let editMenu = template.find(x => x.label === 'Edit');
    editMenu.submenu = [...editMenu.submenu, ...mac.speechChoices];
    let windowMenu = template.find(x => x.role === 'window');
    windowMenu.submenu = mac.windowChoices;
  }
  JSON.stringify(template, function (key, val) {
    if (key === 'label' && !this.submenu && !this.role) {
      this.click = (...args) => menuClickHandler(...args);
    }
    if (key === 'accelerator' && val instanceof Array) {
      this.accelerator = process.platform === 'darwin' ? val[0] : val[1];
    }
    return val;
  });

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function menuClickHandler(menuItem) {
  mainWindow.webContents.send('menuChoice', menuItem.label);
}
app.on('ready', createWindow);
app.on('ready', createMenu);
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
});
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
