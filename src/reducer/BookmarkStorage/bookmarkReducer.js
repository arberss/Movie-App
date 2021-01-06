import {
  GET_MOVIES_FROM_STORAGE,
  REMOVE_MOVIE_FROM_STORAGE,
  CLEAR_ALL_STORAGE,
} from './actionTypes';

const initialState = {
  movieStorage: [],
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MOVIES_FROM_STORAGE:
      return {
        ...state,
        movieStorage: state.movieStorage
          ? [...state.movieStorage, action.payload]
          : [],
      };
    case REMOVE_MOVIE_FROM_STORAGE:
      console.log(state.movieStorage);
      return {
        ...state,
        movieStorage: state.movieStorage.filter(
          (movie) => movie.id !== +action.payload
        ),
      };
    case CLEAR_ALL_STORAGE:
      return {
        ...state,
        movieStorage: [],
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
