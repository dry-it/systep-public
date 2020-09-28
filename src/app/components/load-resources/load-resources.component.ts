import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'app/core/services';
import { SamplePipe } from 'ngx-pipes';

@Component({
  selector: 'app-load-resources',
  templateUrl: './load-resources.component.html',
  styleUrls: ['./load-resources.component.scss'],
  providers: [SamplePipe]
})
export class LoadResourcesComponent implements OnInit {

  messages = [
    'Kalibrerar fuktrondsprotokoll',
    'Granskar radondosor',
    'Specificerar Certifieringsorgan',
    'Reviderar protimetrar',
    'Organiserar platschef'
  ]

  message: string;
  realMessage: string

  constructor(private sample: SamplePipe, private electron: ElectronService) { }

  ngOnInit(): void {

    this.electron.ipcRenderer.send('load', 'loading')
    this.electron.ipcRenderer.on('listening', (event, message) => {
      this.realMessage = message
    })

    setInterval(() => {
      this.message = this.sample.transform(this.messages, 1)[0]
    }, 5000)



  }

}
