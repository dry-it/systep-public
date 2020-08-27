import * as actions from '../actions/mps.actions';
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

export const mpAdapter = createEntityAdapter<any>();
export interface State extends EntityState<any> { }

// Deafault data / initial state

const defaultProject = {
    ids: [],
    entities: {}
}

export const initialState: State = mpAdapter.getInitialState();

export function mpsReducer(
    state: State = initialState,
    action: actions.ProjectActions) {

    switch (action.type) {

        case actions.QUERY:
            return initialState

        case actions.ADDED:
            return mpAdapter.addOne(action.payload, state)

        case actions.MODIFIED:
            return mpAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state)

        case actions.REMOVED:
            return mpAdapter.removeOne(action.payload.id, state)

        default:
            return state
    }
}

export const getMpsState = createFeatureSelector<State>('mps')

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = mpAdapter.getSelectors(getMpsState);

export const selectEntity = createSelector(
    selectEntities,
    (entities, props) => entities[props.id]
  );
