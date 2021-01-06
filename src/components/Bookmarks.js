import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  remove_movie_from_storage,
  clear_all_storage,
} from '../reducer/BookmarkStorage/action';
import { fetchSingleMovie } from '../reducer/SingleMovie/action';

import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

function Bookmarks() {
  const dispatch = useDispatch();
  let storageData = useSelector((state) => state.getLS.movieStorage);

  let showData = null;
  if (storageData) {
    if (storageData.length > 0) {
      showData = (
        <Container className='mt-3 mb-3'>
          {storageData.map((item) => {
            return (
              <div className='singleMovie mb-3' key={item.id}>
                <hr />
                <Row>
                  <Col md={3}>
                    <Image
                      style={{ width: '150px', height: '150px' }}
                      src={
                        'https://image.tmdb.org/t/p/original/' +
                        item.poster_path
                      }
                    />
                  </Col>

                  <Col md={7}>
                    <div className='info'>
                      <div className='mb-2'>{item.title}</div>
                      <div className='overview'>
                        <div className='overview-scroll'>
                          {item.overview.split(' ').slice(0, 50).join(' ') +
                            '...'}
                        </div>
                      </div>
                      <ul className='mt-2 text-break'>
                        Genres:
                        {item.genres.map((genre) => {
                          return (
                            <li
                              style={{ whiteSpace: 'pre' }}
                              className='list-unstyled d-inline ml-2'
                              key={genre.id}
                            >
                              {genre.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </Col>
                  <Col
                    md={2}
                    className='d-flex justify-content-center align-items-center'
                  >
                    <Link
                      to={{
                        pathname: `/movie/`,
                        search: `?id=${item.id}`,
                      }}
                      onClick={() => {
                        dispatch(fetchSingleMovie(item.id));
                      }}
                    >
                      <Button variant='success' className='mr-1'>
                        Details
                      </Button>
                    </Link>

                    <Button
                      variant='danger'
                      onClick={() => {
                        dispatch(remove_movie_from_storage(item.id));
                      }}
                    >
                      X
                    </Button>
                  </Col>
                </Row>
                <hr />
              </div>
            );
          })}
          <Button
            variant='danger'
            className='w-50 d-block mx-auto'
            onClick={() => dispatch(clear_all_storage())}
          >
            Clear
          </Button>
        </Container>
      );
    } else {
      showData = (
        <h1 className='text-center mt-5'>
          You do not have any movie in bookmark!
        </h1>
      );
    }
  }

  return showData;
}

export default Bookmarks;
