import { Injectable } from '@angular/core';

import { Store, select } from '@ngrx/store';

import * as projectsActions from '../ngrx/actions/dryfix.actions'
import * as projectActions from '../ngrx/actions/project.actions'
import * as userActions from '../ngrx/actions/user.actions'
import * as usersActions from '../ngrx/actions/users.actions'
import * as mpActions from '../ngrx/actions/mps.actions'
import * as protocolActions from '../ngrx/actions/protocol.actions'
import * as fromProjects from '../ngrx/reducers/dryfix.reducer'
import * as fromUsers from '../ngrx/reducers/users.reducer'
import * as fromProject from '../ngrx/reducers/project.reducer'
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

  constructor(private store: Store<any>) {
  }

  getProjects = () => {
    this.store.dispatch(new projectsActions.Query())
    return this.store.select(fromProjects.selectAll)
  }

  getProject = (id: string) => {
    return this.store.select(fromProjects.selectEntity, { id: id })
  }

  loadProject = (id: string) => {
    this.store.dispatch(new projectActions.Query(id))
  }

  loadMps = (protocolID: string) => {
    this.store.dispatch(new mpActions.Query(protocolID))
  }

  loadUser = (id: string) => {
    this.store.dispatch(new userActions.Query(id));
  }

  loadUsers = () => {
    this.store.dispatch(new usersActions.Query());
  }

  getUser = (id: string) => {
    return this.store.select(fromUsers.selectEntity, { id: id })
  }

  getUsers = () => {
    return this.store.select(fromUsers.selectAll)
  }

  returnCurrentProject() {
    return this.store.pipe(select('currentProject'))
  }

  returnCurrentUser() {
    return this.store.pipe(select('currentUser'))
  }

  queryMps = (protocolID: string) => {
    //this.store.dispatch(new mpActions.Query(protocolID))
    return this.store.select(fromMps.selectAll)
  }

  queryMpsIds = (protocolID: string) => {
    //this.store.dispatch(new mpActions.Query(protocolID))
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
    return this.store.select(fromProtocols.selectEntity, { id: id })
  }

}
