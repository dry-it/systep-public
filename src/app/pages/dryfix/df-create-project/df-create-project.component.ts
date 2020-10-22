import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireBaseService } from '../../../services/firebase.service'

@Component({
  selector: 'dryfix-create-project',
  templateUrl: './df-create-project.component.html',
  styleUrls: ['./df-create-project.component.css']
})
export class DfCreateProjectComponent implements OnInit {

  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    rbkNumber: new FormControl('', Validators.required),
    pNumber: new FormControl('', Validators.required),
  })

  constructor(private fireBaseService: FireBaseService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.fireBaseService.addDocument('testarea/dryfix/projects', this.projectForm.value)
      .then(() => console.log('project created'))
  }

}
