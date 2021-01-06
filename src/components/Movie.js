import React, { useState, useEffect } from 'react';
import '../App.css';

import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Loader from 'react-loader-spinner';

import { fetchMovies, searchMovie } from '../reducer/AllMovies/action';
import { fetchSingleMovie } from '../reducer/SingleMovie/action';

import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';

function Movie() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const fetchedData = useSelector((state) => state.getData);

  useEffect(() => {
    dispatch(fetchMovies());
  }, []);

  let { data, filteredMovies, isLoading } = fetchedData;

  let arr = [];
  const handleClick = () => {
    for (let i = 1; i <= filteredMovies.total_pages; i++) {
      arr.push(i);
    }
  };

  const handlePage = (arr) => {
    let selected = arr.selected;

    if (text.trim() === '') {
      dispatch(fetchMovies(selected + 1));
    } else {
      dispatch(searchMovie(data, text, selected + 1));
    }
  };
  if (!isLoading && arr.length < 1) {
    handleClick();
  }

  const handleInput = (movies, e) => {
    setText(e.target.value);
    dispatch(searchMovie(movies, text));
  };

  return (
    <>
      <Form.Control
        className='mt-4'
        type='text'
        placeholder='Search Movie'
        name='search'
        value={text}
        onChange={(e) => {
          handleInput(data, e);
        }}
      />

      <Row>
        {isLoading ? (
          <Loader
            style={{ width: '100%', minHeight: '90vh' }}
            className='d-flex justify-content-center align-items-center'
            type='Oval'
            color='#00BFFF'
            height={100}
            width={100}
          />
        ) : (
          filteredMovies.results.map((item) => {
            return (
              <Col className='mt-5 mb-5' key={item.id}>
                <Card
                  style={{
                    width: '18rem',
                    margin: '0 auto',
                  }}
                >
                  <Card.Img
                    style={{ width: '100%', height: '300px' }}
                    variant='top'
                    src={
                      'https://image.tmdb.org/t/p/original/' + item.poster_path
                    }
                  />
                  <Card.Body>
                    <Card.Title
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.title}
                    </Card.Title>
                    <Card.Text style={{ height: '100px', overflow: 'hidden' }}>
                      {item.overview.length > 100
                        ? item.overview.slice(0, 100) + '...'
                        : item.overview}
                    </Card.Text>
                    <Link
                      to={{
                        pathname: `/movie/`,
                        search: `?id=${item.id}`,
                      }}
                      onClick={() => {
                        dispatch(fetchSingleMovie(item.id));
                      }}
                    >
                      <Button variant='primary'>Read More</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        )}
      </Row>

      {filteredMovies.results ? (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={filteredMovies.total_pages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePage}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      ) : null}
    </>
  );
}

export default Movie;
