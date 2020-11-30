import * as fromMovies from '../actions/movies.action';
import { MovieModel } from '../../models/movie.model';

export interface MoviesReducer {
  allMovies: { [key: string]: MovieModel };
  selectedMovie: {};
  loading: boolean;
  loaded: boolean;
  message: string;
}

export const initialState: MoviesReducer = {
  allMovies: {},
  selectedMovie: undefined,
  loading: false,
  loaded: false,
  message: undefined,
};

export function reducer(
  state = initialState,
  action: fromMovies.MoviesAction
): MoviesReducer {
  switch (action.type) {
    case fromMovies.MOVIES_GET: {
      return {
        ...state,
        loading: true,
        loaded: false,
        message: 'Fetching movie data',
      };
    }
    case fromMovies.MOVIES_GET_SUCCESS: {
      const movies = action.payload.data;
      const allMovies = movies
        .filter((item) => item.id !== undefined)
        .reduce((allData, data) => {
          const { id, ...movieData } = data;
          return {
            ...allData,
            [id]: movieData,
          };
        }, {});
      return {
        ...state,
        allMovies,
        loading: false,
        loaded: true,
        message: undefined,
      };
    }
    case fromMovies.MOVIES_GET_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
        message: 'Looks like something went wrong',
      };
    }
  }
  return state;
}

export const getAllMovies = (state: MoviesReducer) => state.allMovies;
export const getLoading = (state: MoviesReducer) => state.loading;
export const getLoaded = (state: MoviesReducer) => state.loaded;
export const getLoadingMessage = (state: MoviesReducer) => state.message;
