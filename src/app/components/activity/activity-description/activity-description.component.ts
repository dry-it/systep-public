import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import { DocumentService } from 'app/services/document.service';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';
import * as normal from '../descriptions-normal'

@Component({
  selector: 'app-activity-description',
  templateUrl: './activity-description.component.html',
  styleUrls: ['./activity-description.component.scss']
})
export class ActivityDescriptionComponent implements OnInit {

  content: string
  currentProject$: Observable<any>

  @Input() activity: any

  constructor(
    private stateService: StateService,
    private data: DataService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {

    this.currentProject$ = this.stateService.returnCurrentProject()

    console.log(this.activity)

    if (this.activity.identity === 'startup') {
      this.content = normal.startup
    }
  }

  generateDocument(template: string, project: any) {

    this.stateService.getUser(project.owner).subscribe((owner) => {
      this.data.createDocument('generate', { data: { project: { ...project, owner: owner } }, template: template }, 'Uppdragsplan')
        .then(() => console.log('skapades'))
    })

  }

}
