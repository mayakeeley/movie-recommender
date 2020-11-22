import * as fromMovies from '../actions/movies.action';

export interface MoviesReducer {
  movies: any[];
  sending: boolean;
  sent: boolean;
}

export const initialState: MoviesReducer = {
  movies: [],
  sending: false,
  sent: false,
};

export function reducer(
  state = initialState,
  action: fromMovies.MoviesAction
): MoviesReducer {
  switch (action.type) {
    case fromMovies.MOVIES_GET: {
      return {
        ...state,
        sending: true,
        sent: false,
      };
    }
    case fromMovies.MOVIES_GET_SUCCESS: {
      return {
        movies: action.payload,
        sending: false,
        sent: true,
      };
    }
    case fromMovies.MOVIES_GET_FAIL: {
      return {
        ...state,
        sending: false,
        sent: false,
      };
    }
  }
  return state;
}

export const getAllMovies = (state: MoviesReducer) => state.movies;
export const getSent = (state: MoviesReducer) => state.sent;
export const getSending = (state: MoviesReducer) => state.sending;
