import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Badge, Offcanvas } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <Navbar expand="lg" className="navbar sticky-top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            <i className="bi bi-shop me-2"></i>
            ShopHub
          </Navbar.Brand>
          
          <div className="d-flex align-items-center d-lg-none">
            <Link to="/cart" className="btn btn-outline-primary me-2 position-relative">
              <i className="bi bi-cart3"></i>
              {cartItemsCount > 0 && (
                <Badge 
                  bg="danger" 
                  pill 
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
            <Navbar.Toggle 
              aria-controls="offcanvasNavbar" 
              onClick={handleShow}
              className="border-0"
            />
          </div>

          <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/products">Products</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            
            <Nav className="d-flex align-items-center">
              <Link to="/cart" className="btn btn-outline-primary me-3 position-relative">
                <i className="bi bi-cart3 me-1"></i>
                Cart
                {cartItemsCount > 0 && (
                  <Badge 
                    bg="danger" 
                    pill 
                    className="position-absolute top-0 start-100 translate-middle"
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </Link>
              
              {user ? (
                <div className="dropdown">
                  <button 
                    className="btn btn-primary dropdown-toggle" 
                    type="button" 
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    {user.name}
                  </button>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              ) : (
                <div>
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                    Register
                  </Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Mobile Offcanvas Menu */}
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Home</Nav.Link>
            <Nav.Link as={Link} to="/products" onClick={handleClose}>Products</Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
            <Nav.Link as={Link} to="/contact" onClick={handleClose}>Contact</Nav.Link>
            <hr />
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" onClick={handleClose}>
                  <i className="bi bi-person-circle me-2"></i>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={() => { handleLogout(); handleClose(); }}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleClose}>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" onClick={handleClose}>
                  <i className="bi bi-person-plus me-2"></i>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;

