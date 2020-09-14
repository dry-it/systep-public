import { Component, OnInit, Input } from '@angular/core';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'pv-mp-probes',
  templateUrl: './mp-probes.component.html',
  styleUrls: ['./mp-probes.component.scss']
})
export class MpProbesComponent implements OnInit {

  @Input() id:string

  mp$: Observable<any>

  constructor(private statService: StateService) { }

  form = new FormGroup({
    name: new FormControl(''),
    calibrationDate: new FormControl(''),
    selfcheckDate: new FormControl(''),
    controlUnit: new FormControl(''),

  })

  ngOnInit(): void {
    this.statService.getMp(this.id)
    .subscribe((mp:any) => {

      if (mp.probe) {
        let lastSelfCheck = mp.probe.calibration.selfChecks[mp.probe.calibration.selfChecks.length - 1].date

        this.form.patchValue({
          name: mp.probe.name,
          calibrationDate: mp.probe.calibration.date,
          selfcheckDate: lastSelfCheck,
          controlUnit: mp.probe.calibration.controlUnit.serial
        })
      }

/*       this.form.patchValue(
        {
          name: mp.name,
          placement: mp.placement,
          rhLimit: mp.rhLimit,
          result: result,
          temp: temp,
          date: date,
        }
      ) */
    })
  }

}
