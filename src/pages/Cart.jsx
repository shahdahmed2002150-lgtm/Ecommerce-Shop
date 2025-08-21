import React, { useContext } from 'react';
import { Container, Row, Col, Card, Button, Form, Alert, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getCartSummary 
  } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const cartSummary = getCartSummary();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col lg={8} className="text-center">
            <div className="empty-cart py-5">
              <i className="bi bi-cart-x display-1 text-muted mb-4"></i>
              <h2 className="fw-bold mb-3">Your Cart is Empty</h2>
              <p className="text-muted mb-4">
                Looks like you haven't added any items to your cart yet. 
                Start shopping to fill it up!
              </p>
              <Button 
                as={Link} 
                to="/" 
                variant="primary" 
                size="lg"
                className="px-5"
              >
                <i className="bi bi-arrow-left me-2"></i>
                Continue Shopping
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <div className="cart-page py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">Shopping Cart</h1>
            <p className="text-muted">
              {cartSummary.itemsCount} {cartSummary.itemsCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* Cart Items */}
            <Card className="shadow-sm mb-4">
              <Card.Header className="bg-white">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Cart Items</h5>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={clearCart}
                  >
                    <i className="bi bi-trash me-1"></i>
                    Clear Cart
                  </Button>
                </div>
              </Card.Header>
              <Card.Body className="p-0">
                {/* Desktop View */}
                <div className="d-none d-md-block">
                  <Table responsive className="mb-0">
                    <thead className="bg-light">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img 
                                src={item.image} 
                                alt={item.title}
                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                className="rounded me-3"
                              />
                              <div>
                                <h6 className="mb-1">{item.title.substring(0, 50)}...</h6>
                                <small className="text-muted text-capitalize">{item.category}</small>
                              </div>
                            </div>
                          </td>
                          <td className="align-middle">
                            <strong>{formatPrice(item.price)}</strong>
                          </td>
                          <td className="align-middle">
                            <div className="d-flex align-items-center">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <i className="bi bi-dash"></i>
                              </Button>
                              <span className="mx-3 fw-bold">{item.quantity}</span>
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <i className="bi bi-plus"></i>
                              </Button>
                            </div>
                          </td>
                          <td className="align-middle">
                            <strong>{formatPrice(item.price * item.quantity)}</strong>
                          </td>
                          <td className="align-middle">
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>

                {/* Mobile View */}
                <div className="d-md-none">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-3 border-bottom">
                      <Row className="align-items-center">
                        <Col xs={3}>
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="img-fluid rounded"
                            style={{ maxHeight: '80px', objectFit: 'cover' }}
                          />
                        </Col>
                        <Col xs={9}>
                          <h6 className="mb-1">{item.title.substring(0, 40)}...</h6>
                          <p className="text-muted small mb-2 text-capitalize">{item.category}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                <i className="bi bi-dash"></i>
                              </Button>
                              <span className="mx-2 fw-bold">{item.quantity}</span>
                              <Button 
                                variant="outline-secondary" 
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              >
                                <i className="bi bi-plus"></i>
                              </Button>
                            </div>
                            <div className="text-end">
                              <div className="fw-bold">{formatPrice(item.price * item.quantity)}</div>
                              <Button 
                                variant="outline-danger" 
                                size="sm"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </div>
              </Card.Body>
            </Card>

            {/* Continue Shopping */}
            <Button 
              as={Link} 
              to="/" 
              variant="outline-primary"
              className="mb-4"
            >
              <i className="bi bi-arrow-left me-2"></i>
              Continue Shopping
            </Button>
          </Col>

          <Col lg={4}>
            {/* Order Summary */}
            <Card className="shadow-sm sticky-top" style={{ top: '100px' }}>
              <Card.Header className="bg-primary-custom text-white">
                <h5 className="mb-0">
                  <i className="bi bi-receipt me-2"></i>
                  Order Summary
                </h5>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({cartSummary.itemsCount} items)</span>
                  <span>{formatPrice(cartSummary.subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span className={cartSummary.shipping === 0 ? 'text-success' : ''}>
                    {cartSummary.shipping === 0 ? 'FREE' : formatPrice(cartSummary.shipping)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax</span>
                  <span>{formatPrice(cartSummary.tax)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between mb-3">
                  <strong>Total</strong>
                  <strong className="text-primary-custom">
                    {formatPrice(cartSummary.total)}
                  </strong>
                </div>

                {cartSummary.shipping > 0 && (
                  <Alert variant="info" className="small">
                    <i className="bi bi-info-circle me-1"></i>
                    Add {formatPrice(50 - cartSummary.subtotal)} more for free shipping!
                  </Alert>
                )}

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={handleCheckout}
                  >
                    <i className="bi bi-credit-card me-2"></i>
                    Proceed to Checkout
                  </Button>
                  
                  {!isAuthenticated && (
                    <small className="text-muted text-center">
                      <Link to="/login" className="text-decoration-none">
                        Sign in
                      </Link> for faster checkout
                    </small>
                  )}
                </div>
              </Card.Body>
            </Card>

            {/* Security Features */}
            <Card className="mt-3 border-0 bg-light">
              <Card.Body className="text-center">
                <Row className="g-3">
                  <Col xs={4}>
                    <i className="bi bi-shield-check text-success display-6"></i>
                    <div className="small mt-1">Secure</div>
                  </Col>
                  <Col xs={4}>
                    <i className="bi bi-truck text-primary display-6"></i>
                    <div className="small mt-1">Fast Shipping</div>
                  </Col>
                  <Col xs={4}>
                    <i className="bi bi-arrow-clockwise text-info display-6"></i>
                    <div className="small mt-1">Easy Returns</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Cart;

