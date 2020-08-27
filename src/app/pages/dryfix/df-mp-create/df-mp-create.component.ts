import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FireBaseService } from '../../../services/firebase.service';

@Component({
  selector: 'dryfix-mp-create',
  templateUrl: './df-mp-create.component.html',
  styleUrls: ['./df-mp-create.component.scss']
})
export class DfMpCreateComponent implements OnInit {

  @Input() mp: any
  @Input() duplicate: boolean
  @Output() done: EventEmitter<any> = new EventEmitter()

  projectID: string;
  protocolID: string

  mpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    placement: new FormControl('', Validators.required),
    flooring: new FormControl(''),
    rhLimit: new FormControl(null, Validators.required),
    constructionType: new FormControl('', Validators.required),
    concreteType: new FormControl(''),
    concreteAddons: new FormControl(''),
    castingDate: new FormControl(''),
    thickness: new FormControl(null, Validators.required),
    vct: new FormControl(null, Validators.required),
    levelingScreed: new FormControl(null),
    dehydration: new FormControl('', Validators.required),
    ekvDepth: new FormControl(null, Validators.required),
    depth: new FormControl(null, Validators.required),
    drillDate: new FormControl('', Validators.required),
    projectID: new FormControl(''),
    protocolID: new FormControl(''),
  })

  constructor(private route: ActivatedRoute, private fireBaseService: FireBaseService) { }

  ngOnInit(): void {

    this.mpForm.patchValue({ projectID: this.route.snapshot.paramMap.get('id'), protocolID: this.route.snapshot.paramMap.get('pid') })


    if (this.mp) {
      this.mpForm.patchValue(this.mp)
    }


  }

  cancel() {
    console.log('canceling')
    this.done.emit()
  }

  onSubmit() {

    if (this.mp && !this.duplicate) {
      this.fireBaseService.updateDocument('testarea/dryfix/measurementpoints', this.mp.id, this.mpForm.value)
        .then(() => console.log('mp Updated'))
    } else {
      this.fireBaseService.addDocument('testarea/dryfix/measurementpoints', this.mpForm.value)
        .then(() => {
          console.log('mp Created')
          this.done.emit()
        })
    }



  }

}
