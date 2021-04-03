import * as fromMovies from '../actions/movies.action';
import {ConfigModel, MovieModel} from '../../models';

export interface MoviesReducer {
  steps: ConfigModel[];
  stepNumber: number;
  currentStep: ConfigModel;
  suggestedMovies: MovieModel[];
  loading: boolean;
  loaded: boolean;
}

export const initialState: MoviesReducer = {
  steps: [],
  stepNumber: 0,
  currentStep: undefined,
  suggestedMovies: [],
  loading: false,
  loaded: false
};

export function reducer(state = initialState, action: fromMovies.MoviesAction): MoviesReducer {
  switch (action.type) {
    case fromMovies.MOVIES_START: {
      return {
        ...state,
        loading: true,
        loaded: false
      };
    }
    case fromMovies.MOVIES_START_SUCCESS: {
      return {
        ...state,
        currentStep: action.payload,
        steps: [action.payload],
        loading: false,
        loaded: true
      };
    }
    case fromMovies.MOVIES_START_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }
  return state;
}

export const getSteps = (state: MoviesReducer) => state.steps;
export const getStepNumber = (state: MoviesReducer) => state.stepNumber;
export const getCurrentStep = (state: MoviesReducer) => state.currentStep;
export const getSuggestedMovies = (state: MoviesReducer) => state.suggestedMovies;
export const getLoading = (state: MoviesReducer) => state.loading;
export const getLoaded = (state: MoviesReducer) => state.loaded;
