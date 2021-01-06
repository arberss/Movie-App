import axios from 'axios';

import { key } from '../rootReducer';

import {
  FETCH_MOVIES_SINGLE_REQUEST,
  FETCH_MOVIES_SINGLE_SUCCESS,
  FETCH_MOVIES_SINGLE_FAILURE,
} from './actionTypes';

export function fetch_movies_single_request() {
  return {
    type: FETCH_MOVIES_SINGLE_REQUEST,
  };
}

export function fetch_movies_single_succes(data) {
  return {
    type: FETCH_MOVIES_SINGLE_SUCCESS,
    payload: data,
  };
}

export function fetch_movies_single_failure(error) {
  return {
    type: FETCH_MOVIES_SINGLE_FAILURE,
    payload: error,
  };
}

export const fetchSingleMovie = (id) => {
  return function (dispatch) {
    dispatch(fetch_movies_single_request());

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`
      )
      .then((response) => {
        let data = response.data;
        dispatch(fetch_movies_single_succes(data));
      })
      .catch((error) => {
        dispatch(fetch_movies_single_failure(error.message));
      });
  };
};
