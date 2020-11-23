import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FireBaseService } from 'app/services/firebase.service';
import { StateService } from 'app/services/state.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {

  project$: Observable<any> = this.stateService.returnCurrentProject();
  projectSubscription: Subscription
  project: any
  message: string

  projectForm = new FormGroup({
    name: new FormControl(''),
    pNumber: new FormControl(''),
    company: new FormControl(''),
    owner: new FormControl(''),
    type: new FormControl('sm'),
    ended: new FormControl(false)
  });

  constructor(
    private stateService: StateService,
    private firebaseService: FireBaseService,
    private router: Router) { }


  ngOnInit(): void {
    this.projectSubscription = this.project$.subscribe((project: any) => {
      this.project = project;
      this.projectForm.patchValue(project);
    })
  }

  ngOnDestroy() {
    this.projectSubscription.unsubscribe()
  }

  onSubmit() {
    this.firebaseService.updateDocument('projects', this.project.id, this.projectForm.value)
      .then(() => this.message = 'Project updated!')

  }

  deleteProject() {
    this.firebaseService.updateDocument('projects', this.project.id, { deleted: true })
      .then(() => {
        this.message = 'PROJECT WAS DELETED'
        setTimeout(() => {
          this.router.navigateByUrl('');
        }, 2000)
      })
  }

  unDeleteProject() {
    this.firebaseService.updateDocument('projects', this.project.id, { deleted: false })
      .then(() => this.message = 'PROJECT WAS UN-DELETED')
  }



}
