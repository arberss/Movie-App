import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Link to='/'>
          <Navbar.Brand>Movie-Redux</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            <Link to='/' style={linkStyle}>
              Home
            </Link>
            <Link to='/bookmarks' style={linkStyle}>
              Bookmarks
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

const linkStyle = {
  color: 'black',
  fontSize: '20px',
  marginRight: '15px',
};
