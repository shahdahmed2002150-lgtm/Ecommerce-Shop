import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { useProducts, useCategories } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'name');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { products, loading, error } = useProducts();
  const { categories } = useCategories();

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy !== 'name') params.set('sort', sortBy);
    setSearchParams(params);
  }, [searchTerm, selectedCategory, sortBy, setSearchParams]);

  // Filter and sort products
  useEffect(() => {
    if (!products) return;

    let filtered = [...products];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating.rate - a.rating.rate;
        case 'name':
        default:
          return a.title.localeCompare(b.title);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSortBy('name');
  };

  if (loading) {
    return <LoadingSpinner text="Loading products..." />;
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Error Loading Products</h4>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="products-page py-5">
      <Container>
        {/* Page Header */}
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">All Products</h1>
            <p className="text-muted">
              Discover our complete collection of amazing products
            </p>
          </Col>
        </Row>

        {/* Filters and Search */}
        <Row className="mb-4">
          <Col lg={8}>
            <Form onSubmit={handleSearchSubmit}>
              <Row className="g-3 align-items-end">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Search Products</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search by name or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Category</Form.Label>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group>
                    <Form.Label className="fw-bold">Sort By</Form.Label>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price-low">Price (Low to High)</option>
                      <option value="price-high">Price (High to Low)</option>
                      <option value="rating">Rating (High to Low)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col lg={4} className="text-lg-end">
            <div className="d-flex flex-column align-items-lg-end">
              <div className="mb-2">
                <strong>{filteredProducts.length}</strong> products found
              </div>
              {(searchTerm || selectedCategory || sortBy !== 'name') && (
                <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
                  <i className="bi bi-x-circle me-1"></i>
                  Clear Filters
                </Button>
              )}
            </div>
          </Col>
        </Row>

        {/* Active Filters */}
        {(searchTerm || selectedCategory) && (
          <Row className="mb-4">
            <Col>
              <div className="d-flex flex-wrap gap-2">
                <span className="text-muted">Active filters:</span>
                {searchTerm && (
                  <span className="badge bg-primary">
                    Search: "{searchTerm}"
                    <button
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: '0.7em' }}
                      onClick={() => setSearchTerm('')}
                    ></button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="badge bg-primary">
                    Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                    <button
                      className="btn-close btn-close-white ms-2"
                      style={{ fontSize: '0.7em' }}
                      onClick={() => setSelectedCategory('')}
                    ></button>
                  </span>
                )}
              </div>
            </Col>
          </Row>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <Row>
            <Col>
              <div className="text-center py-5">
                <i className="bi bi-search display-1 text-muted mb-3"></i>
                <h3>No products found</h3>
                <p className="text-muted mb-4">
                  Try adjusting your search criteria or browse all products.
                </p>
                <Button variant="primary" onClick={clearFilters}>
                  Show All Products
                </Button>
              </div>
            </Col>
          </Row>
        ) : (
          <Row className="g-4">
            {filteredProducts.map((product, index) => (
              <Col lg={3} md={4} sm={6} key={product.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}

        {/* Load More Button (for future pagination) */}
        {filteredProducts.length > 0 && (
          <Row className="mt-5">
            <Col className="text-center">
              <p className="text-muted">
                Showing all {filteredProducts.length} products
              </p>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Products;

