import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useFeaturedProducts, useCategories } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const { products: featuredProducts, loading: productsLoading } = useFeaturedProducts(8);
  const { categories, loading: categoriesLoading } = useCategories();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6} className="hero-content">
              <h1 className="display-4 fw-bold mb-4 slide-in-left">
                Welcome to ShopHub
              </h1>
              <p className="lead mb-4 slide-in-left" style={{ animationDelay: '0.2s' }}>
                Discover amazing products at unbeatable prices. From electronics to fashion, 
                we have everything you need with fast shipping and excellent customer service.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 slide-in-left" style={{ animationDelay: '0.4s' }}>
                <Button 
                  as={Link} 
                  to="#featured" 
                  variant="light" 
                  size="lg"
                  className="px-4 py-3"
                >
                  <i className="bi bi-arrow-down me-2"></i>
                  Shop Now
                </Button>
                <Button 
                  as={Link} 
                  to="/about" 
                  variant="outline-light" 
                  size="lg"
                  className="px-4 py-3"
                >
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center slide-in-right">
              <div className="hero-image-placeholder bg-white bg-opacity-10 rounded-custom p-5">
                <i className="bi bi-shop display-1 text-white"></i>
                <h3 className="text-white mt-3">Your Shopping Destination</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Search Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <Form onSubmit={handleSearch}>
                <InputGroup size="lg">
                  <Form.Control
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 shadow-sm"
                  />
                  <Button 
                    variant="primary" 
                    type="submit"
                    className="px-4"
                  >
                    <i className="bi bi-search"></i>
                  </Button>
                </InputGroup>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Shop by Category</h2>
              <p className="text-muted">Browse our wide selection of products</p>
            </Col>
          </Row>
          
          {categoriesLoading ? (
            <LoadingSpinner text="Loading categories..." />
          ) : (
            <Row className="g-4">
              {categories.map((category, index) => (
                <Col lg={3} md={6} key={category} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="category-card text-center p-4 h-100 bg-white rounded-custom shadow-sm">
                    <div className="category-icon mb-3">
                      <i className={`bi ${getCategoryIcon(category)} display-4 text-primary-custom`}></i>
                    </div>
                    <h5 className="fw-bold text-capitalize">{category}</h5>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      onClick={() => navigate(`/products?category=${category}`)}
                    >
                      Browse
                    </Button>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Featured Products</h2>
              <p className="text-muted">Check out our most popular items</p>
            </Col>
          </Row>
          
          {productsLoading ? (
            <LoadingSpinner text="Loading products..." />
          ) : (
            <Row className="g-4">
              {featuredProducts.map((product, index) => (
                <Col lg={3} md={6} key={product.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
          
          <Row className="text-center mt-5">
            <Col>
              <Button 
                as={Link} 
                to="/products" 
                variant="primary" 
                size="lg"
                className="px-5"
              >
                View All Products
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">Why Choose ShopHub?</h2>
              <Row className="g-4">
                <Col sm={6}>
                  <div className="feature-item text-center">
                    <div className="feature-icon mb-3">
                      <i className="bi bi-truck display-5 text-primary-custom"></i>
                    </div>
                    <h5>Fast Shipping</h5>
                    <p className="text-muted small">Free shipping on orders over $50</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="feature-item text-center">
                    <div className="feature-icon mb-3">
                      <i className="bi bi-shield-check display-5 text-primary-custom"></i>
                    </div>
                    <h5>Secure Payment</h5>
                    <p className="text-muted small">Your payment information is safe</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="feature-item text-center">
                    <div className="feature-icon mb-3">
                      <i className="bi bi-arrow-clockwise display-5 text-primary-custom"></i>
                    </div>
                    <h5>Easy Returns</h5>
                    <p className="text-muted small">30-day return policy</p>
                  </div>
                </Col>
                <Col sm={6}>
                  <div className="feature-item text-center">
                    <div className="feature-icon mb-3">
                      <i className="bi bi-headset display-5 text-primary-custom"></i>
                    </div>
                    <h5>24/7 Support</h5>
                    <p className="text-muted small">We're here to help anytime</p>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <div className="about-image-placeholder bg-primary-custom bg-opacity-10 rounded-custom p-5 text-center">
                <i className="bi bi-people display-1 text-primary-custom"></i>
                <h4 className="mt-3 text-primary-custom">Trusted by Thousands</h4>
                <p className="text-muted">Join our community of satisfied customers</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Newsletter Section */}
      <section className="py-5 bg-primary-custom text-white">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="fw-bold mb-3">Stay Updated</h2>
              <p className="mb-4">Subscribe to our newsletter for the latest deals and updates</p>
              <Form className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow-1"
                  style={{ maxWidth: '400px' }}
                />
                <Button variant="light" type="submit" className="px-4">
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

// Helper function to get category icons
const getCategoryIcon = (category) => {
  const iconMap = {
    "men's clothing": "bi-person-fill",
    "women's clothing": "bi-person-dress",
    "jewelery": "bi-gem",
    "electronics": "bi-laptop"
  };
  return iconMap[category] || "bi-bag";
};

export default Home;

