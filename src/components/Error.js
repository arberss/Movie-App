import React from 'react';

import { Container } from 'react-bootstrap';

function Error() {
  return (
    <Container className='mt-5 text-center'>
      <h1>Error 404</h1>
      <h3>This page does not exist!</h3>
    </Container>
  );
}

export default Error;
