import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { EMPTY, Observable } from 'rxjs';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';

import { Project } from '../reducers/dryfix.reducer'
import * as ProtocolActions from '../actions/protocol.actions'

import { FireBaseService } from '../../services/firebase.service'
import { Action } from '@ngrx/store';

@Injectable()
export class protocolsEffects {

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
  queryProtocols$ = this.actions$.pipe(
    ofType('[Dryfix-Protocol] query protocols'),
    map((action: ProtocolActions.Query) => action),
    switchMap(data => {
      console.log(data.id)
      return this.fireBaseService.getProtocols(data.id)
    }),
    mergeMap(actions => actions),
    map(action => {
      const data: any = action.payload.doc.data()
      return {
        type: `[Dryfix-Protocol] ${action.type}`,
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