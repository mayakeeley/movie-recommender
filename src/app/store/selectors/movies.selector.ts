import * as fromMovies from '../reducers/movies.reducer';
import { createSelector } from '@ngrx/store';
import { getMovies } from '../reducers';

export const getAllMovies = createSelector(getMovies, fromMovies.getAllMovies);
export const getLoading = createSelector(getMovies, fromMovies.getLoading);
export const getLoaded = createSelector(getMovies, fromMovies.getLoaded);
export const getLoadingMessage = createSelector(
  getMovies,
  fromMovies.getLoadingMessage
);
export const getMoviesById = createSelector(
  getMovies,
  fromMovies.getMoviesById
);
export const getSelectedMovies = createSelector(
  getMovies,
  fromMovies.getSelectedMovies
);
export const getConfirmedSelection = createSelector(
  getMovies,
  fromMovies.getConfirmedSelection
);
