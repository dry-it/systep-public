import { Component, OnInit, Input } from '@angular/core';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { FireBaseService } from 'app/services/firebase.service';
import { auditTime } from 'rxjs/operators';

@Component({
  selector: 'pv-mp-overview',
  templateUrl: './mp-overview.component.html',
  styleUrls: ['./mp-overview.component.scss']
})
export class MpOverviewComponent implements OnInit {

  @Input() id: string

  mp$: Observable<any>

  constructor(private statService: StateService, private fireBaseService: FireBaseService) { }

  form = new FormGroup({
    name: new FormControl(''),
    placement: new FormControl(''),
    rhLimit: new FormControl(''),
    result: new FormControl(''),
    temp: new FormControl(''),
    date: new FormControl(''),
  })

  ngOnInit(): void {
    this.statService.getMp(this.id)
      .subscribe((mp: any) => {

        let result
        let temp
        let date

        if (!mp.readout) {
          result = null
          temp = null
          date = null
        } else {
          result = mp.readout.result
          temp = mp.readout.temp
          date = mp.readout.readoutDate
        }

        this.form.patchValue(
          {
            name: mp.name,
            placement: mp.placement,
            rhLimit: mp.rhLimit,
            result: result,
            temp: temp,
            date: date,
          }
        )
      })



  }

  update() {
    const value = this.form.value
    this.fireBaseService.updateDocument('testarea/dryfix/measurementpoints', this.id, {
      name: value.name,
      placement: value.placement,
      rhLimit: value.rhLimit,
      'readout.temp': value.temp,
      'readout.readoutDate': value.date,
    }).then(() => console.log('MP updated!'))
  }



}
