import * as actions from '../actions/users.actions';
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

export const userAdapter = createEntityAdapter<any>();
export interface State extends EntityState<any> { }

// Deafault data / initial state

const defaultProject = {
    ids: [],
    entities: {}
}

export const initialState: State = userAdapter.getInitialState();

export function usersReducer(
    state: State = initialState,
    action: actions.ProjectActions) {

    switch (action.type) {

        case actions.QUERY:
            return initialState

        case actions.ADDED:
            return userAdapter.addOne(action.payload, state)

        case actions.MODIFIED:
            return userAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state)

        case actions.REMOVED:
            return userAdapter.removeOne(action.payload.id, state)

        default:
            return state
    }
}

export const getUsersState = createFeatureSelector<State>('users')

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = userAdapter.getSelectors(getUsersState);

export const selectEntity = createSelector(
    selectEntities,
    (entities, props) => entities[props.id]
  );
