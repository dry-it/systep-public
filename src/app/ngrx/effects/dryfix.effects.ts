import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { Project } from '../reducers/dryfix.reducer'
import * as projectActions from '../actions/dryfix.actions'

import { FireBaseService } from '../../services/firebase.service'
import { Action } from '@ngrx/store';

@Injectable()
export class DryfixEffects {

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
  loadDryfix$ = this.actions$.pipe(
    ofType('[DRYFIX] Load Projects'),
    mergeMap((action: any) =>
      this.fireBaseService.getCollectionStateChanges('testarea/dryfix/projects').pipe(
        mergeMap(actions => actions),
        map(action => {
          const data: any = action.payload.doc.data()
          return {
            type: `[DryfixData] ${action.type}`,
            payload: {
              id: action.payload.doc.id,
              ...data
            }
          };
        })
      )
    )
  );


  @Effect()
  query$: Observable<Action> = this.actions$.pipe(
    ofType(projectActions.QUERY),
    switchMap(action => {
      console.log(action)
      return this.fireBaseService.getCollectionStateChanges('testarea/dryfix/projects')
    }),
    mergeMap(actions => actions),
    map(action => {
      const data: any = action.payload.doc.data()
      return {
        type: `[Dryfix] ${action.type}`,
        payload: {
          ...data,
          id: action.payload.doc.id
        }
      }
    })
  )


  constructor(
    private actions$: Actions,
    private fireBaseService: FireBaseService
  ) { }
}