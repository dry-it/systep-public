
import { Action } from '@ngrx/store';
import { Project } from '../reducers/dryfix.reducer'

export const QUERY =    '[Users] query users'

export const ADDED =    '[Users] added'
export const MODIFIED = '[Users] modified'
export const REMOVED =  '[Users] removed'

export const UPDATE =   '[Dryfix-MP] update'
export const SUCCESS =   '[Dryfix-MP] update success'

export class Query implements Action {
    readonly type = QUERY;
    constructor() {}
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