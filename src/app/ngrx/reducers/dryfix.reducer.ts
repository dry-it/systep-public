import * as actions from '../actions/dryfix.actions';
import { EntityState, createEntityAdapter } from '@ngrx/entity'
import { createFeatureSelector, createSelector } from '@ngrx/store'

// Main Data Interface

export interface Project {
    id: string
    name: string
    company: string
    adress: string
    pNumber: string
    rbkNumber: string
}

// Entity adapter

export const projectAdapter = createEntityAdapter<Project>();

export interface State extends EntityState<Project> { }

// Deafault data / initial state

const defaultProject = {
    ids: [],
    entities: {}
}

export const initialState: State = projectAdapter.getInitialState();

export function dryfixReducer(
    state: State = initialState,
    action: actions.ProjectActions) {

    switch (action.type) {

        case actions.ADDED:
            return projectAdapter.addOne(action.payload, state)

        case actions.MODIFIED:
            return projectAdapter.updateOne({
                id: action.payload.id,
                changes: action.payload
            }, state)
         
        case actions.REMOVED:
            return projectAdapter.removeOne(action.payload.id, state)
        


        default:
            return state
    } 
}




export const getProjectState = createFeatureSelector<State>('dryfix')

export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal
} = projectAdapter.getSelectors(getProjectState);

export const selectEntity = createSelector(
    selectEntities,
    (entities, props) => entities[props.id]
  );
