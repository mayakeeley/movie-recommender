import * as fromFeature from '../reducers';
import * as fromMovies from '../reducers/movies.reducer';
import { createSelector } from '@ngrx/store';

export const getMoviesState = createSelector(
  fromFeature.getMovies,
  (state: fromFeature.MoviesState) => state.movies
);

export const getAllMovies = createSelector(getMoviesState, fromMovies.getAllMovies);
export const getSent = createSelector(getMoviesState, fromMovies.getSent);
export const getSending = createSelector(getMoviesState, fromMovies.getSending);
