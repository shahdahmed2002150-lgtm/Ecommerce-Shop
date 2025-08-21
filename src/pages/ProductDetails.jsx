import React, { useContext, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Badge, Card, Form, Alert } from 'react-bootstrap';
import { useProduct, useProductsByCategory } from '../hooks/useProducts';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const { addToCart, getItemQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [showAlert, setShowAlert] = useState(false);

  // Get related products from the same category
  const { products: relatedProducts } = useProductsByCategory(product?.category);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const currentQuantityInCart = getItemQuantity(parseInt(id));

  if (loading) {
    return <LoadingSpinner text="Loading product details..." />;
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <h4>Error Loading Product</h4>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="py-5">
        <Alert variant="warning">
          <h4>Product Not Found</h4>
          <p>The product you're looking for doesn't exist.</p>
          <Button variant="outline-warning" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div className="product-details-page py-5">
      <Container>
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/" className="text-decoration-none">Home</Link>
            </li>
            <li className="breadcrumb-item text-capitalize">
              <Link to="#" className="text-decoration-none">{product.category}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {product.title.substring(0, 30)}...
            </li>
          </ol>
        </nav>

        {/* Alert for successful add to cart */}
        {showAlert && (
          <Alert variant="success" className="fade-in">
            <i className="bi bi-check-circle me-2"></i>
            Product added to cart successfully!
          </Alert>
        )}

        {/* Product Details */}
        <Row className="mb-5">
          <Col lg={6} className="mb-4">
            {/* Product Image */}
            <Card className="border-0 shadow-sm">
              <Card.Img 
                variant="top" 
                src={product.image} 
                alt={product.title}
                style={{ 
                  height: '500px', 
                  objectFit: 'contain',
                  padding: '2rem'
                }}
                className="fade-in"
              />
            </Card>
          </Col>
          
          <Col lg={6}>
            <div className="product-info slide-in-right">
              {/* Category Badge */}
              <Badge bg="primary" className="mb-3 px-3 py-2 text-capitalize">
                {product.category}
              </Badge>
              
              {/* Product Title */}
              <h1 className="fw-bold mb-3">{product.title}</h1>
              
              {/* Rating */}
              {product.rating && (
                <div className="d-flex align-items-center mb-3">
                  <div className="text-warning me-2">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`bi ${i < Math.floor(product.rating.rate) ? 'bi-star-fill' : 'bi-star'}`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-muted">
                    {product.rating.rate} ({product.rating.count} reviews)
                  </span>
                </div>
              )}
              
              {/* Price */}
              <div className="price-section mb-4">
                <h2 className="text-primary-custom fw-bold mb-0">
                  {formatPrice(product.price)}
                </h2>
                <small className="text-muted">Free shipping on orders over $50</small>
              </div>
              
              {/* Description */}
              <div className="description-section mb-4">
                <h5 className="fw-bold mb-3">Description</h5>
                <p className="text-muted">{product.description}</p>
              </div>
              
              {/* Quantity and Add to Cart */}
              <div className="purchase-section">
                <Row className="align-items-center mb-3">
                  <Col sm={6}>
                    <Form.Group>
                      <Form.Label className="fw-bold">Quantity</Form.Label>
                      <Form.Select 
                        value={quantity} 
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-auto"
                      >
                        {[...Array(10)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>{i + 1}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    {currentQuantityInCart > 0 && (
                      <small className="text-muted">
                        {currentQuantityInCart} in cart
                      </small>
                    )}
                  </Col>
                </Row>
                
                <div className="d-grid gap-3">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    onClick={handleAddToCart}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-cart-plus me-2"></i>
                    Add to Cart
                  </Button>
                  
                  <Button 
                    variant="success" 
                    size="lg" 
                    onClick={handleBuyNow}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <i className="bi bi-lightning me-2"></i>
                    Buy Now
                  </Button>
                </div>
              </div>
              
              {/* Additional Info */}
              <div className="additional-info mt-4 p-3 bg-light rounded-custom">
                <Row className="g-3">
                  <Col sm={6}>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-truck text-primary-custom me-2"></i>
                      <small>Free shipping</small>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-arrow-clockwise text-primary-custom me-2"></i>
                      <small>30-day returns</small>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-shield-check text-primary-custom me-2"></i>
                      <small>Secure payment</small>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-headset text-primary-custom me-2"></i>
                      <small>24/7 support</small>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 1 && (
          <section className="related-products">
            <h3 className="fw-bold mb-4">Related Products</h3>
            <Row className="g-4">
              {relatedProducts
                .filter(p => p.id !== product.id)
                .slice(0, 4)
                .map((relatedProduct, index) => (
                  <Col lg={3} md={6} key={relatedProduct.id} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <ProductCard product={relatedProduct} />
                  </Col>
                ))}
            </Row>
          </section>
        )}
      </Container>
    </div>
  );
};

export default ProductDetails;

