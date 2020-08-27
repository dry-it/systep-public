import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'dryfix-protocol-mount-mp',
  templateUrl: './df-protocol-mount-mp.component.html',
  styleUrls: ['./df-protocol-mount-mp.component.css']
})
export class DfProtocolMountMpComponent implements OnInit {

  @Input() mp: any
  expanded:boolean
  edit: boolean
  duplicate: boolean

  mountForm = new FormGroup({
    probeName: new FormControl(''),
    mountDate: new FormControl(''),
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    // do something
  }

  delete() {
    // Delete hete
  }
}
