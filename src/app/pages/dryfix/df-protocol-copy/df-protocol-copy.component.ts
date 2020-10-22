import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'df-protocol-copy',
  templateUrl: './df-protocol-copy.component.html',
  styleUrls: ['./df-protocol-copy.component.scss']
})
export class DfProtocolCopyComponent implements OnInit {

  @Input() mps: any
  @Output() initiateCopy: EventEmitter<any> = new EventEmitter()

  newMps = []
  protocolName: string

  constructor() { }

  ngOnInit(): void {
    this.mps.forEach((mp) => {

      console.log(mp)

      if (mp.readout) {
        if (mp.readout.invalid) {
          this.newMps.push(Object.assign({ ...mp, copy: true }))
        } else {
          this.newMps.push(Object.assign({ ...mp, copy: false }))
        }
      } else {
        this.newMps.push(Object.assign({ ...mp, copy: true }))
      }




    })
  }

  cancel() {
    this.initiateCopy.emit({cancel: true})
  }


  copyMeasurement() {

    const mpsToCopy = []
    this.newMps.forEach((mp: any) => {
      if (mp.copy) {
        const m = Object.assign({ ...mp });
        delete mp.copy;
        delete m.id;
        delete m.protocolID;

        if (m.readout) {
          delete m.readout
        }

        if (m.mountDate) delete m.mountDate;
        if (m.probe) delete m.probe;
        if (m.drillDate) m.drilldate = new Date().toLocaleTimeString()

        mpsToCopy.push(m)
      }

      this.initiateCopy.emit({
        mps: mpsToCopy,
        protocolName: this.protocolName
      })


    })




  }

}
