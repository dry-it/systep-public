import { Injectable } from '@angular/core';
import { ElectronService } from '../core/services';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private electronService: ElectronService, private router: Router) { }

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


}
