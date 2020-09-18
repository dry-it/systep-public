import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { Project } from '../reducers/dryfix.reducer'
import * as MpActions from '../actions/mps.actions'

import { FireBaseService } from '../../services/firebase.service'
import { Action } from '@ngrx/store';
import { StateService } from 'app/services/state.service';

@Injectable()
export class MpsEffects {

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
  queryMps$ = this.actions$.pipe(
    ofType('[Dryfix-MP] query mps'),
    map((action: MpActions.Query) => action),
    switchMap(data => {
      this.stateService.setLoadingState(true)
      return this.fireBaseService.getMps(data.id)
    }),
    mergeMap(actions => {
      this.stateService.setLoadingState(false)
      return actions
    }),
    map(action => {
      const data: any = action.payload.doc.data()
      return {
        type: `[Dryfix-MP] ${action.type}`,
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