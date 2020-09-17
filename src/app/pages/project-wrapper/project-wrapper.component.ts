import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'app/services/state.service';

@Component({
  selector: 'app-project-wrapper',
  templateUrl: './project-wrapper.component.html',
  styleUrls: ['./project-wrapper.component.scss']
})
export class ProjectWrapperComponent implements OnInit {

  project$: Observable<any>
  id: string

  constructor(public _location: Location, private route: ActivatedRoute, private stateService:StateService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.stateService.loadProject(this.id)
    this.project$ = this.stateService.returnCurrentProject()
  }

  openSpecial() {
    this.router.navigate([`/home/projectview/${this.id}/template-tool`, {template: 'test-template'}])
  }

  owner(id:string) {
    return this.stateService.getUser(id)
  }



}
