import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FireBaseService } from '../../../services/firebase.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'app-df-project',
  templateUrl: './df-project.component.html',
  styleUrls: ['./df-project.component.css']
})
export class DfProjectComponent implements OnInit {

  id: string = this.route.snapshot.paramMap.get('id')
  project$: Observable<any> = this.stateService.getProject(this.id)

  constructor(private route: ActivatedRoute, private firebBaseService: FireBaseService, private stateService: StateService) { }

  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    adress: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    rbkNumber: new FormControl('', Validators.required),
    pNumber: new FormControl('', Validators.required),
  })

  ngOnInit(): void {
    this.project$.subscribe((project) => {
      this.projectForm.patchValue({ ...project })
    })

    this.firebBaseService.getProbe('u010')
      .then((res) => {
        console.log(res)
      })


  }

  onSubmit () {
    // do something
  }

}
