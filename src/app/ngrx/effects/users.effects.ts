import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { Project } from '../reducers/dryfix.reducer'
import * as UsersActions from '../actions/users.actions'

import { FireBaseService } from '../../services/firebase.service'
import { Action } from '@ngrx/store';
import { StateService } from '../../services/state.service';

@Injectable()
export class UsersEffects {

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
  queryUsers$ = this.actions$.pipe(
    ofType('[Users] query users'),
    map((action: UsersActions.Query) => action),
    switchMap(data => {
      this.stateService.setLoadingState(true)
      return this.fireBaseService.getUsers()
    }),
    mergeMap(actions => {
      this.stateService.setLoadingState(false)
      return actions
    }),
    map(action => {
      const data: any = action.payload.doc.data()
      return {
        type: `[Users] ${action.type}`,
        payload: {
          ...data,
          id: action.payload.doc.id
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