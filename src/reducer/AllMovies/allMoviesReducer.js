import {
  FILTER_MOVIE_INPUT,
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from './actionTypes';

const initialState = {
  data: [],
  filteredMovies: [],
  isLoading: true,
  error: '',
};

const allMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        filteredMovies: action.payload,
        isLoading: false,
        error: '',
      };
    case FILTER_MOVIE_INPUT:
      return {
        ...state,
        filteredMovies: action.payload,
        isLoading: false,
        error: '',
      };
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        data: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default allMoviesReducer;
