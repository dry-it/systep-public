import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'dryfix-protocol-read-mp',
  templateUrl: './df-protocol-read-mp.component.html',
  styleUrls: ['./df-protocol-read-mp.component.css']
})
export class DfProtocolReadMpComponent implements OnInit {

  @Input() mp: any

  expanded:boolean
  edit: boolean
  duplicate: boolean

  readForm = new FormGroup({
    rh: new FormControl(null),
    temp: new FormControl(null),
    readoutDate: new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

  delete() {
    // Delete hete
  }

  onSubmit() {
    // do something
  }
}
