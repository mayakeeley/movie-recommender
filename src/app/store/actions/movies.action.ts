import {Action} from '@ngrx/store';
import {ConfigModel, MovieModel, OutcomeModel} from '../../models';
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

export const MOVIES_ADD_OUTCOME = '[Movies] add outcome';
export const MOVIES_ADD_OUTCOME_SUCCESS = '[Movies] add outcome success';
export const MOVIES_ADD_OUTCOME_FAIL = '[Movies] add outcome fail';

export const MOVIES_REMOVE_OUTCOME = '[Movies] remove outcome';
export const MOVIES_REMOVE_OUTCOME_SUCCESS = '[Movies] remove outcome success';
export const MOVIES_REMOVE_OUTCOME_FAIL = '[Movies] remove outcome fail';

export const MOVIES_GET_RECOMMENDED = '[Movies] get recommended';
export const MOVIES_GET_RECOMMENDED_SUCCESS = '[Movies] get recommended success';
export const MOVIES_GET_RECOMMENDED_FAIL = '[Movies] get recommended fail';

export const MOVIES_RESTART = '[Movies] restart';


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

export class MoviesAddOutcome implements Action {
  public readonly type = MOVIES_ADD_OUTCOME;

  constructor(public payload: OutcomeModel) {
  }
}

export class MoviesAddOutcomeSuccess implements Action {
  public readonly type = MOVIES_ADD_OUTCOME_SUCCESS;

  constructor(public payload: OutcomeModel[]) {
  }
}

export class MoviesAddOutcomeFail implements Action {
  public readonly type = MOVIES_ADD_OUTCOME_FAIL;

  constructor(public payload: any) {
  }
}

export class MoviesRemoveOutcome implements Action {
  public readonly type = MOVIES_REMOVE_OUTCOME;

  constructor(public payload: string) {
  }
}

export class MoviesRemoveOutcomeSuccess implements Action {
  public readonly type = MOVIES_REMOVE_OUTCOME_SUCCESS;

  constructor(public payload: OutcomeModel[]) {
  }
}

export class MoviesRemoveOutcomeFail implements Action {
  public readonly type = MOVIES_REMOVE_OUTCOME_FAIL;

  constructor(public payload: any) {
  }
}

export class MoviesGetRecommended implements Action {
  public readonly type = MOVIES_GET_RECOMMENDED;
}

export class MoviesGetRecommendedSuccess implements Action {
  public readonly type = MOVIES_GET_RECOMMENDED_SUCCESS;

  constructor(public payload: MovieModel[]) {
  }
}

export class MoviesGetRecommendedFail implements Action {
  public readonly type = MOVIES_GET_RECOMMENDED_FAIL;

  constructor(public payload: any) {
  }
}

export class MoviesNavigate implements Action {
  public readonly type = MOVIES_NAVIGATE;

  constructor(public payload: { path: any[]; query?: object; extras?: NavigationExtras; }) {
  }
}

export class MoviesRestart implements Action {
  public readonly type = MOVIES_RESTART;
}

export type MoviesAction = MoviesStart
  | MoviesStartSuccess
  | MoviesStartFail
  | MoviesNextStep
  | MoviesNextStepSuccess
  | MoviesNextStepFail
  | MoviesPrevStep
  | MoviesPrevStepSuccess
  | MoviesPrevStepFail
  | MoviesAddOutcome
  | MoviesAddOutcomeSuccess
  | MoviesAddOutcomeFail
  | MoviesRemoveOutcome
  | MoviesRemoveOutcomeSuccess
  | MoviesRemoveOutcomeFail
  | MoviesGetRecommended
  | MoviesGetRecommendedSuccess
  | MoviesGetRecommendedFail
  | MoviesRestart;
