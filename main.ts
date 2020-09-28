import { app, BrowserWindow, screen, ipcMain, ipcRenderer, remote, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';

import * as createDoc from './doc-creater/doc-creater'
import * as https from 'https'
import * as fs from 'fs'

import { autoUpdater } from "electron-updater"



export default class AppUpdater {
  constructor() {
    const log = require("electron-log")
    log.transports.file.level = "debug"
    autoUpdater.logger = log
    autoUpdater.checkForUpdatesAndNotify()
  }
}



let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');


function createWindow(): BrowserWindow {


  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  let frame = false

  console.log(process.platform)

  if (process.platform !== 'darwin') {
    frame = true
  }

  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    hasShadow: true,
    frame: frame,
    resizable: true,
    titleBarStyle: 'hiddenInset',
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
      zoomFactor: 0.9
    },
  });

  if (serve) {

    win.webContents.openDevTools({ mode: 'undocked' })

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }


  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

let load: BrowserWindow = null;

function createLoadingWindow(): BrowserWindow {



  // Create the browser window.
  load = new BrowserWindow({
    width: 539,
    height: 379,
    hasShadow: true,
    frame: false,
    transparent: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });

  if (serve) {

    load.webContents.openDevTools({ mode: 'undocked' })

    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    load.loadURL('http://localhost:4200/index.html#/load');

  } else {
    load.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html#/load'),
      protocol: 'file:',
      slashes: true
    }));
  }


  // Emitted when the window is closed.
  load.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    load = null;
  });

  return load;
}



function sendStatusToWindow(text) {
  autoUpdater.logger.info(text)
  load.webContents.send('message', text);
}


try {

  app.allowRendererProcessReuse = true;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(() => {
    //createWindow()
    createLoadingWindow()
  }, 400));

  app.on('ready', function () {


    ipcMain.on('load', (event, message) => {
      console.log(message)
      const sendMessage = (text) => {
        event.sender.send('listening', text)
      }

      autoUpdater.checkForUpdates();

      if (!serve) {
        autoUpdater.on('checking-for-update', () => {
          sendMessage('checking for update');
        })
        autoUpdater.on('update-available', (info) => {
          sendMessage('update found');
        })
        autoUpdater.on('update-not-available', (info) => {
          sendMessage('No update avalible');
          createWindow()
          setTimeout(() => {
            load.close()
          }, 1000)
          
        })
        autoUpdater.on('error', (err) => {
          sendMessage(err)
        })
        autoUpdater.on('download-progress', (progressObj) => {
        })
        autoUpdater.on('update-downloaded', (info) => {
          sendMessage('update downloaded, closing app to install')
          autoUpdater.quitAndInstall();
        })
    
      } else {
        createWindow()
          setTimeout(() => {
            load.close()
          }, 1000)
      }


    })

    setTimeout(() => {
      sendStatusToWindow('App ready...');
      if (!serve) {
        // sendStatusToWindow('App ready...');
        autoUpdater.checkForUpdates();
      }

      //load.webContents.send('message', 'test');

    }, 1000)
  });

  



  app.on('ready', () => {



    const openProtocol = (projectID, protocolID) => {


      // Create a browser window
      var win = new BrowserWindow({
        width: 1600,
        height: 1000,
        center: true,
        hasShadow: true,
        frame: false,
        vibrancy: 'light',
        transparent: true,
        backgroundColor: '#0000000',
        titleBarStyle: 'hiddenInset',
      });
      // Load the page + route
      win.loadURL(`http://localhost:4200/index.html#/protocol-viewer/${projectID}/${protocolID}`);
    }

    ipcMain.on('create-doc', (event, args) => {

      createDoc.createDoc({ path: args.path, data: args.data })
        .then((res) => {
          console.log(res)
          shell.openPath(res)
            .then(() => console.log('file opened'))
            .catch((err) => console.error(err))
          event.sender.send('reply', res);
        })
        .catch((err) => console.error(err))
    })

    ipcMain.on('testDoc', (event, args) => {
      createDoc.testTemplate(args)
    })

    ipcMain.on('createFromTemplate', (event, args) => {

      const userData = app.getPath('userData');
      const templateFilePath = path.join(userData, 'risk.docx')

      const file = fs.createWriteStream(templateFilePath);

      https.get("https://firebasestorage.googleapis.com/v0/b/systep-26719.appspot.com/o/templates%2Frisk.docx?alt=media&token=ed29c742-642c-4fab-9aed-ace26e33d27f", response => {
        response.pipe(file);
        //const filePath = path.join(__dirname, 'templates', 'risk.docx')
        console.log(templateFilePath);
        setTimeout(() => {
          createDoc.fromTemplate({ ...args, templateFilePath: templateFilePath })
            .then((res) => {
              console.log(res)
              shell.openPath(res)
                .then(() => console.log('file opened'))
                .catch((err) => {
                  event.sender.send('error', err);
                })
            })
        }, 1000)

      });

    });


    ipcMain.on('open-protocol', (event, args) => {
      console.log('window loaded')
      openProtocol(args.projectID, args.protocolID)
    })
  })

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}


