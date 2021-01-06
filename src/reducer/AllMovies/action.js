import ReactDOM from 'react-dom';
import axios from 'axios';

import { key } from '../rootReducer';

import {
  FILTER_MOVIE_INPUT,
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
} from './actionTypes';

export function filter_movie_input(title) {
  return {
    type: FILTER_MOVIE_INPUT,
    payload: title,
  };
}

export function fetch_movies_request() {
  return {
    type: FETCH_MOVIES_REQUEST,
  };
}

export function fetch_movies_succes(data) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    payload: data,
  };
}

export function fetch_movies_failure(error) {
  return {
    type: FETCH_MOVIES_FAILURE,
    payload: error,
  };
}

export const fetchMovies = (page = 1) => {
  return function (dispatch) {
    dispatch(fetch_movies_request());

    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=${page}`
      )
      .then((response) => {
        let data = response.data;
        dispatch(fetch_movies_succes(data));
        window.scrollTo(0, 0);
      })
      .catch((error) => {
        dispatch(fetch_movies_failure(error.message));
      });
  };
};

export const searchMovie = (movies, title, page = 1) => {
  return function (dispatch) {
    dispatch(fetch_movies_request());
    if (title.trim() === '') {
      dispatch(filter_movie_input(movies));
    } else {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${title}&page=${page}&include_adult=false`
        )
        .then((response) => {
          let data = response.data;
          dispatch(filter_movie_input(data));
          window.scrollTo(0, 0);
        })

        .catch((error) => {
          dispatch(fetch_movies_failure(error.message));
        });
    }
  };
};
