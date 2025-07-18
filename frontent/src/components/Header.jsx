import React from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
  return (<header>
     <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
      <Container>
        <Link to='/'><Navbar.Brand>ProShop</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to='/cart'>
            <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
            </Link>
            <Link to='/login'>
            <Nav.Link ><i className='fas fa-user'></i>Sign In</Nav.Link>
            </Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </header>  );
}

export default Header