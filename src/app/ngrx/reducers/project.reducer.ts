import * as actions from '../actions/project.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'

// Main Data Interface

// Entity adapter

export const protocolAdapter = createEntityAdapter<any>();
export interface State extends EntityState<any> { }

// Deafault data / initial state

const defaultProject = {
    ids: [],
    entities: {}
}

export const initialState: State = protocolAdapter.getInitialState();

export function projectReducer(
    state: any = { },
    action: actions.ProjectActions) {

    switch (action.type) {

        case actions.ADD:
            return action.payload

        default:
            return state
    } 
}

export const getProtocolsState = createFeatureSelector<State>('protocols')

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = protocolAdapter.getSelectors(getProtocolsState);

export const selectEntity = createSelector(
    selectEntities,
    (entities, props) => entities[props.id]
  );

