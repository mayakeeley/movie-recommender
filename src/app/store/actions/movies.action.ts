import { Action } from '@ngrx/store';

export const MOVIES_GET = '[Movies] Get';
export const MOVIES_GET_SUCCESS = '[Movies] Get success';
export const MOVIES_GET_FAIL = '[Movies] Get fail';

export class MoviesGet implements Action {
  public readonly type = MOVIES_GET;
}

export class MoviesGetSuccess implements Action {
  public readonly type = MOVIES_GET_SUCCESS;

  constructor(public payload: any) {}
}

export class MoviesGetFail implements Action {
  public readonly type = MOVIES_GET_FAIL;
}

export type MoviesAction = MoviesGet | MoviesGetSuccess | MoviesGetFail;
