import { Component, OnInit } from '@angular/core';
import { FireBaseService } from '../../../services/firebase.service';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as actions from '../../../ngrx/actions/dryfix.actions'
import * as mpActions from '../../../ngrx/actions/mps.actions'
import * as fromProject from '../../../ngrx/reducers/dryfix.reducer'
import { map, switchMap, mergeMap, flatMap, single } from 'rxjs/operators';
import { StateService } from '../../../services/state.service';

@Component({
  selector: 'dryfix-projects-list',
  templateUrl: './df-projects-list.component.html',
  styleUrls: ['./df-projects-list.component.css']
})
export class DfProjectsListComponent implements OnInit {

  projects$: Observable<any>

  constructor(private fireBaseService: FireBaseService, private router: Router, private store: Store<fromProject.State>, private stateService: StateService) { }

  ngOnInit(): void {
    this.projects$ = this.stateService.getProjects()



  }

  open(id) {
    this.router.navigateByUrl(`/home/dryfix/project/${id}`)
  }

}
