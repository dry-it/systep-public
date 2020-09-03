
import { Action } from '@ngrx/store';

export const QUERY =    '[Project] query project'
export const ADD =      '[Project] add project'

export class Query implements Action {
    readonly type = QUERY;
    constructor(public id:string) {}
}

export class Add implements Action {
    readonly type = ADD;
    constructor(public payload: any) {}
}

export type ProjectActions = 
Query |
Add 
