import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-wrapper',
  templateUrl: './project-wrapper.component.html',
  styleUrls: ['./project-wrapper.component.scss']
})
export class ProjectWrapperComponent implements OnInit {

  project$: Observable<any>
  id: string

  constructor(public _location: Location, private route: ActivatedRoute, private stateService:StateService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.stateService.loadProject(this.id)
    this.project$ = this.stateService.returnCurrentProject()
  }



}
