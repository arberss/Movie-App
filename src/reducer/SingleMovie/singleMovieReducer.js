import {
  FETCH_MOVIES_SINGLE_REQUEST,
  FETCH_MOVIES_SINGLE_SUCCESS,
  FETCH_MOVIES_SINGLE_FAILURE,
} from './actionTypes';

const initialState = {
  movie: {},
  isLoading: true,
  error: '',
};

const singleMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_SINGLE_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    case FETCH_MOVIES_SINGLE_SUCCESS:
      return {
        ...state,
        error: '',
        movie: action.payload,
        isLoading: false,
      };
    case FETCH_MOVIES_SINGLE_FAILURE:
      return {
        ...state,
        movie: {},
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default singleMovieReducer;
