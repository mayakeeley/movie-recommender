import {Action} from '@ngrx/store';
import {ConfigModel} from '../../models';
import {NavigationExtras} from '@angular/router';

export const MOVIES_START = '[Movies] start';
export const MOVIES_START_SUCCESS = '[Movies] start success';
export const MOVIES_START_FAIL = '[Movies] start fail';

export const MOVIES_NAVIGATE = '[Movies] navigate';


export class MoviesStart implements Action {
  public readonly type = MOVIES_START;
}

export class MoviesStartSuccess implements Action {
  public readonly type = MOVIES_START_SUCCESS;

  constructor(public payload: ConfigModel) {
  }

}

export class MoviesStartFail implements Action {
  public readonly type = MOVIES_START_FAIL;

  constructor(public payload: any) {
  }
}

export class MoviesNavigate implements Action {
  public readonly type = MOVIES_NAVIGATE;

  constructor(public payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }) {
  }
}

export type MoviesAction =
  MoviesStart
  | MoviesStartSuccess
  | MoviesStartFail;
