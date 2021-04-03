import {Action} from '@ngrx/store';
import {MovieModel, ConfigModel} from '../../models';

export const MOVIES_GET = '[Movies] Get';
export const MOVIES_GET_SUCCESS = '[Movies] Get success';
export const MOVIES_GET_FAIL = '[Movies] Get fail';

export const MOVIES_SELECT = '[Movies] select';
export const MOVIES_DESELECT = '[Movies] deselect';

export const MOVIES_CONFIRM_SELECTION = '[Movies] confirm selection';
export const MOVIES_CONFIRM_SELECTION_SUCCESS =
  '[Movies] confirm selection success';
export const MOVIES_CONFIRM_SELECTION_FAIL = '[Movies] confirm selection fail';

export const MOVIES_RESTART = '[Movies] restart';

export const MOVIES_START = '[Movies] start';
export const MOVIES_START_SUCCESS = '[Movies] start success';
export const MOVIES_START_FAIL = '[Movies] start fail';

export class MoviesGet implements Action {
  public readonly type = MOVIES_GET;
}

export class MoviesGetSuccess implements Action {
  public readonly type = MOVIES_GET_SUCCESS;

  constructor(public payload: any) {
  }
}

export class MoviesGetFail implements Action {
  public readonly type = MOVIES_GET_FAIL;

  constructor(public payload: any) {
  }
}

export class MoviesSelect implements Action {
  public readonly type = MOVIES_SELECT;

  constructor(public payload: MovieModel) {
  }
}

export class MoviesDeselect implements Action {
  public readonly type = MOVIES_DESELECT;

  constructor(public payload: MovieModel) {
  }
}

export class MoviesConfirmSelection implements Action {
  public readonly type = MOVIES_CONFIRM_SELECTION;
}

export class MoviesConfirmSelectionSuccess implements Action {
  public readonly type = MOVIES_CONFIRM_SELECTION_SUCCESS;

  constructor(
    public payload: {
      scoredMovies: MovieModel[];
      keywords: { id: string; name: string; frequency: number }[];
      genres: { id: string; name: string; frequency: number }[];
    }
  ) {
  }
}

export class MoviesConfirmSelectionFail implements Action {
  public readonly type = MOVIES_CONFIRM_SELECTION_FAIL;

  constructor(public payload: any) {
  }
}

export class MoviesRestart implements Action {
  public readonly type = MOVIES_RESTART;
}

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

export type MoviesAction =
  | MoviesGet
  | MoviesGetSuccess
  | MoviesGetFail
  | MoviesSelect
  | MoviesDeselect
  | MoviesConfirmSelection
  | MoviesConfirmSelectionSuccess
  | MoviesConfirmSelectionFail
  | MoviesRestart
  | MoviesStart
  | MoviesStartSuccess
  | MoviesStartFail;
