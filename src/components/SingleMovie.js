import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import Loader from 'react-loader-spinner';

import { fetchSingleMovie } from '../reducer/SingleMovie/action';
import { get_movies_from_storage } from '../reducer/BookmarkStorage/action';

import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';

function SingleMovie(props) {
  const dispatch = useDispatch();

  const { movie, isLoading, error } = useSelector((state) => state.getSingle);

  const getStorage = useSelector((state) => state.getLS.movieStorage);

  useEffect(() => {
    let currentItemID = new URLSearchParams(window.location.search).get('id');
    dispatch(fetchSingleMovie(currentItemID));
  }, []);

  const {
    id,
    poster_path,
    title,
    overview,
    genres,
    imdb_id,
    release_date,
    production_countries,
    production_companies,
  } = movie;

  const checkItem = getStorage.find((movie) => movie.id === id);

  let showData = null;
  if (isLoading) {
    showData = (
      <Loader
        style={{ width: '100%', minHeight: '90vh' }}
        className='d-flex justify-content-center align-items-center'
        type='Oval'
        color='#00BFFF'
        height={100}
        width={100}
      />
    );
  } else {
    if (error === '') {
      showData = (
        <Container className='mt-5 mb-5'>
          <Row>
            <Col md={6} lg={6}>
              {poster_path ? (
                <Image
                  src={'https://image.tmdb.org/t/p/original/' + poster_path}
                  style={{
                    width: '100%',
                    maxWidth: '450px',
                    height: '100%',
                    maxHeight: '500px',
                  }}
                />
              ) : (
                ''
              )}
            </Col>
            <Col md={6} className='d-flex flex-column '>
              <Card.Title>{title}</Card.Title>
              <div className='overview mb-2'>{overview}</div>
              <div className='genres d-flex'>
                <p className='mr-2 m-0 font-weight-bold'>Genres:</p>

                {genres ? (
                  <ul style={{ padding: '0', marginBottom: '0' }}>
                    {genres.map((genre, index) => {
                      return (
                        <li style={liStyle} key={genre.id}>
                          {index ? '/ ' + genre.name : '' + genre.name}
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </div>
              <p className=' mt-1 mb-1 '>
                <span className='font-weight-bold'>Release Date:</span>{' '}
                {release_date}
              </p>

              <div className='production_companies d-flex mt-1 mb-1'>
                {production_companies ? (
                  <>
                    <p className='mb-0 mr-2 font-weight-bold'>
                      {production_companies.length > 1
                        ? 'Production Companies: '
                        : 'Production Company: '}
                    </p>
                    <ul className='mb-0'>
                      {production_companies.map((company, index) => {
                        return (
                          <li style={liStyle} key={company.id}>
                            {index ? '/ ' + company.name : '' + company.name}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : null}
              </div>

              <div className='production_countries d-flex'>
                {production_countries ? (
                  <>
                    <p className='mb-0 mr-2 font-weight-bold'>
                      {production_countries.length > 1
                        ? 'Production Countries: '
                        : 'Production Country: '}
                    </p>
                    <ul className='mb-0'>
                      {production_countries.map((country, index) => {
                        return (
                          <li style={liStyle} key={country.iso_3166_1}>
                            {index ? '/ ' + country.name : '' + country.name}
                          </li>
                        );
                      })}
                    </ul>
                  </>
                ) : null}
              </div>
              <div className='imbd mt-1 mb-1'>
                <a
                  style={imdbLink}
                  href={'https://www.imdb.com/title/' + imdb_id}
                  rel='noreferrer'
                  target='_blank'
                >
                  IMBD LINK
                </a>
              </div>
              <div className='buttons mt-2'>
                <Button
                  variant='warning'
                  style={{ marginRight: '10px' }}
                  onClick={() => props.history.goBack()}
                >
                  Go Back
                </Button>
                {checkItem ? (
                  <Button variant='success' disabled>
                    Saved for Later
                  </Button>
                ) : (
                  <Button
                    variant='success'
                    onClick={() => dispatch(get_movies_from_storage(movie))}
                  >
                    Save to Bookmarks
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      );
    } else {
      showData = (
        <Redirect
          to={props.location.pathname + 'error/' + props.location.search}
        />
      );
    }
  }

  return showData;
}

export default withRouter(SingleMovie);

const liStyle = {
  display: 'inline-block',
  listStyle: 'none',
  marginRight: '8px',
  fontStyle: 'italic',
};

const imdbLink = {
  color: 'blue',
  textDecoration: 'none',
};
