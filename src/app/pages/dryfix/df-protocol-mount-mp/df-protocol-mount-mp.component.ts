import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FireBaseService } from 'app/services/firebase.service';
import { Observable } from 'rxjs';
import { StateService } from 'app/services/state.service';

@Component({
  selector: 'dryfix-protocol-mount-mp',
  templateUrl: './df-protocol-mount-mp.component.html',
  styleUrls: ['./df-protocol-mount-mp.component.css']
})
export class DfProtocolMountMpComponent implements OnInit {

  @Input() mp: any
  expanded: boolean
  edit: boolean
  duplicate: boolean

  mp$: Observable<any>

  mountForm = new FormGroup({
    probeName: new FormControl(''),
    mountDate: new FormControl(''),
  })

  constructor(private fireBaseService: FireBaseService, private stateService: StateService) { }

  ngOnInit(): void {

    this.mp$ = this.stateService.getMp(this.mp)


    this.mp$.subscribe((mp: any) => {
      if (mp.probe) {
        this.mountForm.patchValue({ probeName: mp.probe.name })
      }

      if (mp.mountDate) {
        this.mountForm.patchValue({ mountDate: mp.mountDate })
      }
    })


  }

  getProbe() {
    const probeName = this.mountForm.value.probeName
    if (probeName.length > 1) {
      this.fireBaseService.getProbe(probeName)
        .then((probe: any) => {
          this.fireBaseService.updateDocument(`testarea/dryfix/measurementpoints`, this.mp, { 'probe': probe })
            .then(() => console.log('mp updated the ID was: ' + this.mp))
        })
    }
  }

  setMountDate() {
    console.log(this.mountForm.value.mountDate)
    this.fireBaseService.updateDocument(`testarea/dryfix/measurementpoints`, this.mp, { mountDate: this.mountForm.value.mountDate })
      .then(() => console.log('mp updated the ID was: ' + this.mp))
  }

  onSubmit() {
    // do something
  }

  delete() {
    // Delete hete
  }
}
