import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import * as projectActions from '../ngrx/actions/dryfix.actions'
import * as mpActions from '../ngrx/actions/mps.actions'
import * as protocolActions from '../ngrx/actions/protocol.actions'
import * as fromProject from '../ngrx/reducers/dryfix.reducer'
import * as fromMps from '../ngrx/reducers/mps.reducer'
import * as fromProtocols from '../ngrx/reducers/protocol.reducer'
import { map, single, mergeMap, filter } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  projects: any

  constructor(private store: Store<fromProject.State>) {
    this.store.dispatch(new projectActions.Query())
  }

  getProjects = () => {
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

  getMP = (id: string) => {
    console.log(id)
    return this.store.select(fromMps.selectEntity, { id: id })
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





// this.projects$ = this.store.select(fromProject.selectAll)
// this.store.dispatch(new actions.Query());
// this.store.dispatch(new mpActions.Query('U3anVouPLzU9kPdSEqux'));