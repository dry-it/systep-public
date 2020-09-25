import { app, BrowserWindow, screen, ipcMain, ipcRenderer, remote, shell } from 'electron';
import * as path from 'path';
import * as url from 'url';

import * as createDoc from './doc-creater/doc-creater'
import * as https from 'https'
import * as fs from 'fs'

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
    vibrancy: 'light',
    transparent: true,
    backgroundColor: '#0000000',
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

try {

  app.allowRendererProcessReuse = true;

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

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


