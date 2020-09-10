import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FireBaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { activities } from './standard-activities'

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  createProjectForm = new FormGroup({
    name: new FormControl(''),
    pNumber: new FormControl(''),
    company: new FormControl(''),
    owner: new FormControl('')
  });


  users$: Observable<any>

  newProject: any
  selectedOwner: any

  constructor(private fireBaseService: FireBaseService) { }


  ngOnInit(): void {

    this.createProjectForm.patchValue({ owner: localStorage.activated })

    this.users$ = this.fireBaseService.getCollectionSnapshot('users')

    this.newProject = {
      name: 'My test project',
      pNumber: 'P1234',
      flags: {
        order_confirmed: false,
        project_registered: false,
      }
    }
  }

  onSubmit() {
    const newProject = {
      ...this.createProjectForm.value,
      flags: {
        order_confirmed: false,
        project_registered: false,
      }
    }


    this.fireBaseService.addDocument('projects', {...this.createProjectForm.value, createdBy: localStorage.uid})
      .then((project: any) => {
        const projectID = project.id

        for (let i = 0; i < activities.length; i++) {
          const a = activities[i]
          if (a.checkPoints) {
            for (let j = 0; j < a.checkPoints.length; j++) {
              const checkPoint = a.checkPoints[j];
              this.fireBaseService.addDocument(`projects/${projectID}/checkPoints`, { ...checkPoint, activityID: i, order: j })
                .then((c: any) => {
                  console.log(`Checkpoint with id: ${c.id} added`)
                })
            }
          }
        }

        let strippedActivities = Object.assign(activities)
        for (let i = 0; i < strippedActivities.length; i++) {
          const a = strippedActivities[i]
          if (a.checkPoints) {
            a.hasCheckpoints = true
            delete a.checkPoints;
          }
        }

        this.fireBaseService.updateDocument('projects', projectID, {activities: strippedActivities})
        .then(() => console.log('Activities added!'))


      })
    console.log(newProject);
  }

  save(e, i) {
    // Save here
  }

  execute(e) {
    // execute
  }

}
