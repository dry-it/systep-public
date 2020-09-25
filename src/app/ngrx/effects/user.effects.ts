import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { Project } from '../reducers/dryfix.reducer'
import * as UserActions from '../actions/user.actions'

import { FireBaseService } from '../../services/firebase.service'
import { Action } from '@ngrx/store';
import { StateService } from '../../services/state.service';

@Injectable()
export class UserEffects {

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
  queryUser$ = this.actions$.pipe(
    ofType('[User] query user'),
    map((action: UserActions.Query) => action),
    switchMap(data => {
      this.stateService.setLoadingState(true)
      return this.fireBaseService.getDocumentValueChanges('users', data.id)
    }),
    map((action: any) => {
      const d: any = action.payload
      return {
        type: `[User] add user`,
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