import * as fromMovies from '../reducers/movies.reducer';
import { createSelector } from '@ngrx/store';
import { getMovies } from '../reducers';

export const getAllMovies = createSelector(
  getMovies,
  fromMovies.getAllMovies
);
export const getLoading = createSelector(getMovies, fromMovies.getLoading);
export const getLoaded = createSelector(getMovies, fromMovies.getLoaded);
export const getLoadingMessage = createSelector(
  getMovies,
  fromMovies.getLoadingMessage
);
