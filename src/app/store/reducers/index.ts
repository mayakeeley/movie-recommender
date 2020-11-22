import {
  createFeatureSelector,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import * as fromMovies from './movies.reducer';
import {
  sessionStorageMiddleware,
  setExpiresAfter,
  setReducersToStore,
} from '../../helpers/reducer-session-storage.helper';

export interface MoviesState {
  movies: fromMovies.MoviesReducer;
}

export const reducers: ActionReducerMap<MoviesState> = {
  movies: fromMovies.reducer,
};

export const getMovies = createFeatureSelector<MoviesState>('movies');

// half hour
setExpiresAfter(1800000);

setReducersToStore(['movies']);

export const metaReducers: MetaReducer<MoviesState>[] = [
  sessionStorageMiddleware,
];
