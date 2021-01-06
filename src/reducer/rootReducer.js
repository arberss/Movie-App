import { combineReducers } from 'redux';
import allMoviesReducer from './AllMovies/allMoviesReducer';
import singleMovieReducer from './SingleMovie/singleMovieReducer';
import bookmarkReducer from './BookmarkStorage/bookmarkReducer';

export const key = 'd929648396d4baf2b997c1abe353a26e';

const rootReducer = combineReducers({
  getData: allMoviesReducer,
  getSingle: singleMovieReducer,
  getLS: bookmarkReducer,
});

export default rootReducer;
