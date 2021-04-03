import * as fromMovies from '../actions/movies.action';
import {ConfigModel, MovieModel, OutcomeModel} from '../../models';

export interface MoviesReducer {
  steps: ConfigModel[];
  stepNumber: number;
  currentStep: ConfigModel;
  suggestedMovies: MovieModel[];
  movieOutcomes: { [key: string]: OutcomeModel };
}


export const initialState: MoviesReducer = {
  steps: [],
  stepNumber: 0,
  currentStep: undefined,
  suggestedMovies: [],
  movieOutcomes: {genreOutcome: undefined, budgetOutcome: undefined}
};

export function reducer(state = initialState, action: fromMovies.MoviesAction): MoviesReducer {
  switch (action.type) {
    case fromMovies.MOVIES_START_SUCCESS: {
      return {
        ...state,
        currentStep: action.payload,
        steps: [action.payload],
      };
    }
    case fromMovies.MOVIES_NEXT_STEP_SUCCESS: {
      return {
        ...state,
        steps: [...state.steps, action.payload],
        stepNumber: state.stepNumber + 1,
        currentStep: action.payload,
      };
    }
    case fromMovies.MOVIES_PREV_STEP_SUCCESS: {
      const steps = [...state.steps];
      steps.pop();
      return {
        ...state,
        steps,
        currentStep: action.payload,
        stepNumber: state.stepNumber >= 1 ? state.stepNumber - 1 : 0,
      };
    }
    case fromMovies.MOVIES_SET_OUTCOME: {
      return {
        ...state,
        movieOutcomes: {...state.movieOutcomes, ...action.payload}
      };
    }
    case fromMovies.MOVIES_REMOVE_OUTCOME: {
      const movieOutcomes = { ...state.movieOutcomes} ;
      delete movieOutcomes[action.payload];
      return {
        ...state,
        movieOutcomes
      };
    }
  }
  return state;
}

export const getSteps = (state: MoviesReducer) => state.steps;
export const getStepNumber = (state: MoviesReducer) => state.stepNumber;
export const getCurrentStep = (state: MoviesReducer) => state.currentStep;
export const getSuggestedMovies = (state: MoviesReducer) => state.suggestedMovies;
export const getMovieOutcomes = (state: MoviesReducer) => state.movieOutcomes;
