import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireBaseService } from '../../../services/firebase.service';

@Component({
  selector: 'dryfix-create-protocol',
  templateUrl: './df-create-protocol.component.html',
  styleUrls: ['./df-create-protocol.component.css']
})
export class DfCreateProtocolComponent implements OnInit {

  @Input() id:string

  constructor(private fireBaseService: FireBaseService) { }

  protocolForm = new FormGroup({
    name: new FormControl('', Validators.required),
    desc: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
  }


  onSubmit() {
    this.fireBaseService.addDocument(`testarea/dryfix/projects/${this.id}/protocols`, this.protocolForm.value)
    .then(() => console.log('Protocol Created'))
  }

}
