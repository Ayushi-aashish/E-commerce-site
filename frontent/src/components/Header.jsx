import React from 'react'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container ,NavDropdown} from 'react-bootstrap'
import { logout } from '../actions/userActions' // Import the logout action
import { useSelector,useDispatch } from 'react-redux'

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  }
    
  return (
    <header>
      <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
        <Container>
          <Link to='/'><Navbar.Brand>ProShop</Navbar.Brand></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to='/cart'>
  <i className='fas fa-shopping-cart'></i>Cart
</Nav.Link>
{userInfo ? ( 
              <NavDropdown title={userInfo.name} id='username'>
                <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : ( <Nav.Link as={Link} to='/login'>
  <i className='fas fa-user'></i>Sign In
</Nav.Link>)}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;