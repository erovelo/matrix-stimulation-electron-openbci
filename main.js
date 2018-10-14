const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow } = electron;

let win;
const createWindow = () => {
  win = new BrowserWindow({
    backgroundColor: '#FFFFFF',
    width: 1400,
    height: 800,
    fullscreen: true,
    toolbar: false,
    resizable: true
  });

  win.setResizable(true);
  win.loadURL('file://' + __dirname + '/app/index.html');

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
