import * as fromMovies from '../actions/movies.action';
import { MovieModel } from '../../models/movie.model';

export interface MoviesReducer {
  allMovies: MovieModel[];
  moviesById: { [key: string]: MovieModel };
  selectedMovies: MovieModel[];
  loading: boolean;
  loaded: boolean;
  message: string;
  confirmedSelection: boolean;
  keywords: { id: string; name: string; frequency: number }[];
  genres: { id: string; name: string; frequency: number }[];
}

export const initialState: MoviesReducer = {
  allMovies: [],
  moviesById: {},
  selectedMovies: [],
  loading: false,
  loaded: false,
  message: undefined,
  confirmedSelection: false,
  keywords: undefined,
  genres: undefined,
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
      const allMovies = action.payload;
      const moviesById = allMovies
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
        allMovies: allMovies
          .slice()
          .sort((a, b) => b.popularity - a.popularity),
        moviesById,
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
    case fromMovies.MOVIES_SELECT: {
      return {
        ...state,
        selectedMovies: [...state.selectedMovies.concat(action.payload)],
      };
    }
    case fromMovies.MOVIES_DESELECT: {
      const index = state.selectedMovies.indexOf(action.payload);
      const newArr = [...state.selectedMovies];
      newArr.splice(index, 1);
      return {
        ...state,
        selectedMovies: newArr,
      };
    }
    case fromMovies.MOVIES_CONFIRM_SELECTION: {
      return {
        ...state,
        confirmedSelection: true,
      };
    }
    case fromMovies.MOVIES_CONFIRM_SELECTION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
  }
  return state;
}

export const getAllMovies = (state: MoviesReducer) => state.allMovies;
export const getMoviesById = (state: MoviesReducer) => state.moviesById;
export const getLoading = (state: MoviesReducer) => state.loading;
export const getLoaded = (state: MoviesReducer) => state.loaded;
export const getLoadingMessage = (state: MoviesReducer) => state.message;
export const getSelectedMovies = (state: MoviesReducer) => state.selectedMovies;
export const getConfirmedSelection = (state: MoviesReducer) =>
  state.confirmedSelection;
