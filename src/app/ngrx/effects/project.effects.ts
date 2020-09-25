import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { Project } from '../reducers/dryfix.reducer'
import * as ProjectActions from '../actions/project.actions'

import { FireBaseService } from '../../services/firebase.service'
import { Action } from '@ngrx/store';
import { StateService } from '../../services/state.service';

@Injectable()
export class ProjectEffects {

  /*     @Effect()
  getData$ = this.fireBaseService.getCollectionStateChanges('testarea/dryfix/projects').pipe(
    mergeMap(actions => actions),
    map(action => {
        const data:any = action.payload.doc.data()
      return {
        type: `[DryfixData] ${action.type}`,
        payload: { 
          id: action.payload.doc.id, 
          ...data
        }
      };
    })
  ); */

  @Effect()
  queryProject$ = this.actions$.pipe(
    ofType('[Project] query project'),
    map((action: ProjectActions.Query) => action),
    switchMap(data => {
      this.stateService.setLoadingState(true)
      return this.fireBaseService.getDocumentValueChanges('projects', data.id)
    }),
    map((action: any) => {
      const d: any = action.payload
      return {
        type: `[Project] add project`,
        payload: {
          ...action
        }
      }
    })
  )





  constructor(
    private actions$: Actions,
    private fireBaseService: FireBaseService,
    private stateService: StateService
  ) { }
}