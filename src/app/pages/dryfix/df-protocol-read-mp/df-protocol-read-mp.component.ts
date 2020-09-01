import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FireBaseService } from 'app/services/firebase.service';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'dryfix-protocol-read-mp',
  templateUrl: './df-protocol-read-mp.component.html',
  styleUrls: ['./df-protocol-read-mp.component.css']
})
export class DfProtocolReadMpComponent implements OnInit {

  @Input() mp: any

  expanded: boolean
  edit: boolean
  duplicate: boolean

  mp$: Observable<any>

  readForm = new FormGroup({
    rhRead: new FormControl(null),
    temp: new FormControl(null),
    readoutDate: new FormControl('')
  })

  constructor(private fireBaseService: FireBaseService, private stateService:StateService) { }

  ngOnInit(): void {
    this.mp$ = this.stateService.getMp(this.mp)
    this.mp$.subscribe((mp) => {
      if (mp.readout) {
        const readout = mp.readout
        this.readForm.patchValue(readout)
      }
    })
 
  }

  delete() {
    // Delete hete
  }

  updateRh() {
    const rh = this.readForm.value.rhRead


    this.fireBaseService.updateDocument('testarea/dryfix/measurementpoints', this.mp, { 'readout.rhRead': rh })
      .then(() => console.log('MP rh updated'))

  }

  updateTemp() {
    const temp = this.readForm.value.temp


    this.fireBaseService.updateDocument('testarea/dryfix/measurementpoints', this.mp, { 'readout.temp': temp })
      .then(() => console.log('MP temp updated'))

  }

  updateDate() {
    const date = this.readForm.value.readoutDate


    this.fireBaseService.updateDocument('testarea/dryfix/measurementpoints', this.mp, { 'readout.readoutDate': date })
      .then(() => console.log('MP readout date updated'))

  }

  onSubmit() {
    // do something
  }
}
