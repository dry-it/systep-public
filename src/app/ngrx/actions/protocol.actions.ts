
import { Action } from '@ngrx/store';
import { Project } from '../reducers/dryfix.reducer'

export const QUERY =    '[Dryfix-Protocol] query protocols'

export const ADDED =    '[Dryfix-Protocol] added'
export const MODIFIED = '[Dryfix-Protocol] modified'
export const REMOVED =  '[Dryfix-Protocol] removed'

export const UPDATE =   '[Dryfix-Protocol] update'
export const SUCCESS =   '[Dryfix-Protocol] update success'

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