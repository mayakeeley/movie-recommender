import * as fromMovies from '../reducers/movies.reducer';
import { createSelector } from '@ngrx/store';
import { getMovies } from '../reducers';

export const getAllMovies = createSelector(getMovies, fromMovies.getAllMovies);
export const getLoading = createSelector(getMovies, fromMovies.getLoading);
export const getLoadingMessage = createSelector(
  getMovies,
  fromMovies.getLoadingMessage
);
export const getSelectedMovies = createSelector(
  getMovies,
  fromMovies.getSelectedMovies
);
export const getConfirmedSelection = createSelector(
  getMovies,
  fromMovies.getConfirmedSelection
);
export const getPopularMovies = createSelector(
  getMovies,
  fromMovies.getPopularMovies
);
export const getRemainingMovies = createSelector(
  getMovies,
  fromMovies.getRemainingMovies
);
export const getScoredMovies = createSelector(
  getMovies,
  fromMovies.getScoredMovies
);
