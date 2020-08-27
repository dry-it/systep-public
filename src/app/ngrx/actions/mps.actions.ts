
import { Action } from '@ngrx/store';
import { Project } from '../reducers/dryfix.reducer'

export const QUERY =    '[Dryfix-MP] query mps'

export const ADDED =    '[Dryfix-MP] added'
export const MODIFIED = '[Dryfix-MP] modified'
export const REMOVED =  '[Dryfix-MP] removed'

export const UPDATE =   '[Dryfix-MP] update'
export const SUCCESS =   '[Dryfix-MP] update success'

export class Query implements Action {
    readonly type = QUERY;
    constructor(public id:string) {}
}

export class Added implements Action {
    readonly type = ADDED;
    constructor(public payload: Project) {}
}

export class Modified implements Action {
    readonly type = MODIFIED;
    constructor(public payload: Project) {}
}

export class Removed implements Action {
    readonly type = REMOVED;
    constructor(public payload: Project) {}
}

export class Update implements Action {
    readonly type = UPDATE;
    constructor(
        public id: string,
        public changes: Partial<Project>) {}
}

export class Success implements Action {
    readonly type = SUCCESS;
    constructor() {}
}

export type ProjectActions = 
Query |
Added |
Modified |
Removed |
Success;