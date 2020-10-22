import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { StateService } from 'app/services/state.service';
import { auditTime } from 'rxjs/operators';
import { FireBaseService } from 'app/services/firebase.service';

@Component({
  selector: 'pv-mp-mount',
  templateUrl: './mp-mount.component.html',
  styleUrls: ['./mp-mount.component.scss']
})
export class MpMountComponent implements OnInit {

  @Input() id: string

  mp$: Observable<any>

  constructor(private statService: StateService, private fireBaseService: FireBaseService) { }

  form = new FormGroup({
    name: new FormControl(''),
    thickness: new FormControl(''),
    vct: new FormControl(''),
    levelingScreed: new FormControl(''),
    dehydration: new FormControl(''),
    ekvDepth: new FormControl(''),
    depth: new FormControl(''),
    drillDate: new FormControl(''),
    placement: new FormControl(''),
  })


  ngOnInit(): void {
    this.statService.getMp(this.id)
      .subscribe((mp: any) => {
        if (mp) {
          this.form.patchValue(mp)
        }

      })

  }

  update() {
    this.fireBaseService.updateDocument('testarea/dryfix/measurementpoints', this.id, {
      ...this.form.value
    }).then(() => console.log('MP updated!'))
  }

}
