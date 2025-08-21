import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-4">
            <h5 className="fw-bold">
              <i className="bi bi-shop me-2"></i>
              ShopHub
            </h5>
            <p className="mb-3">
              Your one-stop destination for quality products at amazing prices. 
              We're committed to providing the best shopping experience with 
              fast delivery and excellent customer service.
            </p>
            <div className="d-flex gap-3">
              <a href="#" className="text-decoration-none">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/">Home</Link>
              </li>
              <li className="mb-2">
                <Link to="/about">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact">Contact</Link>
              </li>
              <li className="mb-2">
                <a href="#">FAQ</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#">Shipping Info</a>
              </li>
              <li className="mb-2">
                <a href="#">Returns & Exchanges</a>
              </li>
              <li className="mb-2">
                <a href="#">Size Guide</a>
              </li>
              <li className="mb-2">
                <a href="#">Track Your Order</a>
              </li>
            </ul>
          </Col>
          
          <Col lg={3} md={6} className="mb-4">
            <h5>Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                123 Commerce Street, City, State 12345
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                (555) 123-4567
              </li>
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                support@shophub.com
              </li>
              <li className="mb-2">
                <i className="bi bi-clock me-2"></i>
                Mon - Fri: 9AM - 6PM
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" style={{ borderColor: '#374151' }} />
        
        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-0">
              &copy; 2024 ShopHub. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-md-end">
            <div className="d-flex justify-content-md-end gap-3 mt-3 mt-md-0">
              <a href="#" className="text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-decoration-none">Terms of Service</a>
              <a href="#" className="text-decoration-none">Cookie Policy</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

