import {Action} from '@ngrx/store';
import {ConfigModel} from '../../models';
import {NavigationExtras} from '@angular/router';

export const MOVIES_START = '[Movies] start';
export const MOVIES_START_SUCCESS = '[Movies] start success';
export const MOVIES_START_FAIL = '[Movies] start fail';

export const MOVIES_NAVIGATE = '[Movies] navigate';

export const MOVIES_NEXT_STEP = '[Movies] next step';
export const MOVIES_NEXT_STEP_SUCCESS = '[Movies] next step success';
export const MOVIES_NEXT_STEP_FAIL = '[Movies] next step fail';

export const MOVIES_PREV_STEP = '[Movies] prev step';
export const MOVIES_PREV_STEP_SUCCESS = '[Movies] prev step success';
export const MOVIES_PREV_STEP_FAIL = '[Movies] prev step fail';


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

export class MoviesNextStep implements Action {
  public readonly type = MOVIES_NEXT_STEP;

  constructor(public payload: string) {
  }
}

export class MoviesNextStepSuccess implements Action {
  public readonly type = MOVIES_NEXT_STEP_SUCCESS;

  constructor(public payload: ConfigModel) {
  }
}

export class MoviesNextStepFail implements Action {
  public readonly type = MOVIES_NEXT_STEP_FAIL;

  constructor(public payload: any) {
  }
}

export class MoviesPrevStep implements Action {
  public readonly type = MOVIES_PREV_STEP;
}

export class MoviesPrevStepSuccess implements Action {
  public readonly type = MOVIES_PREV_STEP_SUCCESS;

  constructor(public payload: ConfigModel) {
  }
}

export class MoviesPrevStepFail implements Action {
  public readonly type = MOVIES_PREV_STEP_FAIL;

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

export type MoviesAction = MoviesStart
  | MoviesStartSuccess
  | MoviesStartFail
  | MoviesNextStep
  | MoviesNextStepSuccess
  | MoviesNextStepFail
  | MoviesPrevStep
  | MoviesPrevStepSuccess
  | MoviesPrevStepFail;
