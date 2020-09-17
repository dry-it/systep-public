import { Injectable } from '@angular/core';
import { ElectronService } from '../core/services';
import { Router } from '@angular/router';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(
    private electronService: ElectronService, 
    private router: Router,
    private stateService: StateService) { }

  openDoc(file) {

    const filepath = './assets/md/' + file

    if (this.electronService.isElectron) {
      const f = filepath.replace(/[/]/g, "%2F")
      const BrowserWindow = this.electronService.remote.BrowserWindow;

      // Create a browser window
      var win = new BrowserWindow({
        width: 800,
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
      win.loadURL(`http://localhost:4200/index.html#/doc;file=${f}`);
    } else {
      this.router.navigate(['doc', { file: filepath }])
    }

  }

  generateProtocol(projectID:string, protocolID:string) {

    this.stateService.getProject(projectID)
    .subscribe((project:any)=> {
      this.electronService.remote.dialog.showSaveDialog({})
      .then((res) => {
        if (!res.canceled) {
          this.electronService.ipcRenderer.send('create-doc', { path: res.filePath, data: project })
        }
      })


      this.electronService.ipcRenderer.on('reply', (event, args) => {
        console.log(args)
        //this.electronService.shell.openPath(args)
      })
    } )

    

  }

  createFromTemplate(data: any) {

    // Select template
    this.electronService.remote.dialog.showOpenDialog({})
    .then((open) => {
      if (!open.canceled && open.filePaths) {
        return open.filePaths[0]
      }
    })
    .then((filePath) => {
      this.electronService.remote.dialog.showSaveDialog({})
      .then((save) => {
        if (!save.canceled) {
          this.electronService.ipcRenderer.send('createFromTemplate', {data: data, template: filePath, savePath: save.filePath})
        }
      })
    })

    

  }

  openProtocol(projectID, protocolID) {
    if (this.electronService.isElectron) {
      this.electronService.ipcRenderer.send('open-protocol', { projectID: projectID, protocolID: protocolID })
    } else {
      this.router.navigateByUrl(`/protocol-viewer/${projectID}/${protocolID}`)
    }

  }


}
