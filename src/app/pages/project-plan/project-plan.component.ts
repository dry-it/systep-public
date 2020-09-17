import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-plan',
  templateUrl: './project-plan.component.html',
  styleUrls: ['./project-plan.component.scss']
})
export class ProjectPlanComponent implements OnInit {

  get aliases() {
    return this.profileForm.get('aliases') as FormArray;
  }

  constructor(private fb: FormBuilder) { }

  activityTemplate = this.fb.group({
    name: this.fb.control('What happens now!'),
    dateStart: this.fb.control(''),
    dateEnd: this.fb.control('')
  })

  profileForm = this.fb.group({
    description: ['', Validators.required],
       aliases: this.fb.array([this.activityTemplate])
  });

  addAlias() {
    this.aliases.push(this.activityTemplate);
  }

  ngOnInit(): void {

  }

}
