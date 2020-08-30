import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as projectActions from '../ngrx/actions/dryfix.actions'
import * as mpActions from '../ngrx/actions/mps.actions'
import * as protocolActions from '../ngrx/actions/protocol.actions'
import * as fromProject from '../ngrx/reducers/dryfix.reducer'
import * as fromMps from '../ngrx/reducers/mps.reducer'
import * as fromProtocols from '../ngrx/reducers/protocol.reducer'
import { map, single, mergeMap, filter } from 'rxjs/operators';
import { of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  projects: any
  loading = new BehaviorSubject(false)

  constructor(private store: Store<fromProject.State>) {
  }

  getProjects = () => {
    this.store.dispatch(new projectActions.Query())
    return this.store.select(fromProject.selectAll)
  }

  getProject = (id: string) => {
    console.log(id)
    return this.store.select(fromProject.selectEntity, { id: id })
  }

  queryMps = (protocolID: string) => {
    this.store.dispatch(new mpActions.Query(protocolID))
    return this.store.select(fromMps.selectAll)
  }

  queryMpsIds = (protocolID: string) => {
    this.store.dispatch(new mpActions.Query(protocolID))
    return this.store.select(fromMps.selectIds)
  }

  getMp = (id: string) => {
    return this.store.select(fromMps.selectEntity, { id: id })
  }

  setLoadingState = (state: boolean) => {
    this.loading.next(state)
  }

  queryProtocols = (id: string) => {
    this.store.dispatch(new protocolActions.Query(id))
    return this.store.select(fromProtocols.selectAll)
  }

  getProtocol = (id: string) => {
    console.log(id)
    return this.store.select(fromProtocols.selectEntity, { id: id })
  }

}
