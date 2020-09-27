import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FireBaseService } from 'app/services/firebase.service';
import { StateService } from 'app/services/state.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  projects$: Observable<any>

  filterString: string

  constructor(private fireBasService: FireBaseService, private stateService: StateService, private router: Router) { }

  ngOnInit(): void {

    this.projects$ = this.fireBasService.queryAllProjects('modifiedDate')

  }

  getOwner$(id: string) {
    return this.stateService.getUser(id)
  }

  openProject(id: string) {
    this.router.navigateByUrl(`/home/projectview/${id}/project`)
  }


}
