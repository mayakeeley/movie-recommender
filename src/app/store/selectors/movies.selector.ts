import * as fromMovies from '../reducers/movies.reducer';
import { createSelector } from '@ngrx/store';
import { getMovies } from '../reducers';

export const getSteps = createSelector(getMovies, fromMovies.getSteps);
export const getStepNumber = createSelector(getMovies, fromMovies.getStepNumber);
export const getCurrentStep = createSelector(getMovies, fromMovies.getCurrentStep);
export const getSuggestedMovies = createSelector(getMovies, fromMovies.getSuggestedMovies);
export const getMovieOutcomes = createSelector(getMovies, fromMovies.getMovieOutcomes);
export const getLoaded = createSelector(getMovies, fromMovies.getLoaded);
export const getLoading = createSelector(getMovies, fromMovies.getLoading);
