import { ActionReducerMap } from '@ngrx/store';
import * as fromMovies from './movies.reducer';

export interface MoviesState {
  movies: fromMovies.MoviesReducer;
}

export const reducers: ActionReducerMap<MoviesState> = {
  movies: fromMovies.reducer,
};

export const getMovies = (state: MoviesState) => state.movies;
