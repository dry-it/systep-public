import * as actions from '../actions/protocol.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'

// Main Data Interface

export interface Mp {
    id: string
    name: string
    company: string
    adress: string
    pNumber: string
    rbkNumber: string
}

// Entity adapter

export const protocolAdapter = createEntityAdapter<any>();
export interface State extends EntityState<any> { }

// Deafault data / initial state

const defaultProject = {
    ids: [],
    entities: {}
}

export const initialState: State = protocolAdapter.getInitialState();

export function protocolsReducer(
    state: State = initialState,
    action: actions.ProjectActions) {

    switch (action.type) {

        case actions.ADDED:
            return protocolAdapter.addOne(action.payload, state)

        case actions.MODIFIED:
            return protocolAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state)
         
        case actions.REMOVED:
            return protocolAdapter.removeOne(action.payload.id, state)

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

