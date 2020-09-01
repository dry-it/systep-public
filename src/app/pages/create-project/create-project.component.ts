import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FireBaseService } from '../../services/firebase.service';
import { Observable } from 'rxjs';
import { activities} from './standard-activities'

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

    this.fireBaseService.getDocumentValueChanges('users', newProject.owner)
      .subscribe((owner: any) => {
        newProject.owner = owner
        this.fireBaseService.addDocument('projects', { ...newProject, owner: owner })
          .then((doc) => {
            console.log(doc)
            console.log(doc.id)
            for (let i = 0; i < activities.length; i++) {

              this.fireBaseService.setDocumentPath(`projects/${doc.id}/activities/${i}`, { ...activities[i], blocks: [] })
                .then((res) => {
                  if (activities[i].blocks) {
                    for (let j = 0; j < activities[i].blocks.length; j++) {
                      this.fireBaseService.setDocumentPath(`projects/${doc.id}/activities/${i}/blocks/${j}`, { ...activities[i].blocks[j], checkPoints: [] })
                        .then(() => {
                          if (activities[i].blocks[j].checkPoints) {
                            for (let k = 0; k < activities[i].blocks[j].checkPoints.length; k++) {
                              this.fireBaseService.setDocumentPath(`projects/${doc.id}/activities/${i}/blocks/${j}/checkpoints/${k}`, { ...activities[i].blocks[j].checkPoints[k] })
                                .then(() => console.log('done'))
                            }
                          }


                        })
                    }
                  }

                })

              /*   this.fireBaseService.addDocumentActivities('projects', doc.id, 'activities', i.toString(), {...this.activities[i], blocks: undefined})
                .then((res) => {
        
                }) */
            }
          })
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
