import {
  GET_MOVIES_FROM_STORAGE,
  REMOVE_MOVIE_FROM_STORAGE,
  CLEAR_ALL_STORAGE,
} from './actionTypes';

export function get_movies_from_storage(data) {
  return {
    type: GET_MOVIES_FROM_STORAGE,
    payload: data,
  };
}

export function remove_movie_from_storage(id) {
  return {
    type: REMOVE_MOVIE_FROM_STORAGE,
    payload: id,
  };
}

export function clear_all_storage() {
  return {
    type: CLEAR_ALL_STORAGE,
  };
}
