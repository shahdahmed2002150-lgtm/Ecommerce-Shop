import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Checkout = () => {
  const { cartItems, getCartSummary, clearCart } = useContext(CartContext);
  const { user, addOrder, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingData, setShippingData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipcode || '',
    country: user?.address?.country || 'USA'
  });
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    billingAddress: 'same'
  });
  
  const [formErrors, setFormErrors] = useState({});
  const cartSummary = getCartSummary();

  // Redirect if not authenticated or cart is empty
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, cartItems.length, navigate]);

  if (!isAuthenticated || cartItems.length === 0) {
    return null;
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const handleInputChange = (section, field, value) => {
    if (section === 'shipping') {
      setShippingData(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear field error when user starts typing
    const errorKey = `${section}.${field}`;
    if (formErrors[errorKey]) {
      setFormErrors(prev => ({
        ...prev,
        [errorKey]: ''
      }));
    }
  };

  const formatCardNumber = (value) => {
    // Remove all non-digits
    const cardNumber = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    return cardNumber.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiryDate = (value) => {
    // Remove all non-digits
    const expiry = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (expiry.length >= 2) {
      return expiry.substring(0, 2) + '/' + expiry.substring(2, 4);
    }
    return expiry;
  };

  const validateShipping = () => {
    const errors = {};
    
    if (!shippingData.firstName.trim()) errors['shipping.firstName'] = 'First name is required';
    if (!shippingData.lastName.trim()) errors['shipping.lastName'] = 'Last name is required';
    if (!shippingData.email.trim()) errors['shipping.email'] = 'Email is required';
    if (!shippingData.phone.trim()) errors['shipping.phone'] = 'Phone is required';
    if (!shippingData.address.trim()) errors['shipping.address'] = 'Address is required';
    if (!shippingData.city.trim()) errors['shipping.city'] = 'City is required';
    if (!shippingData.state.trim()) errors['shipping.state'] = 'State is required';
    if (!shippingData.zipCode.trim()) errors['shipping.zipCode'] = 'ZIP code is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePayment = () => {
    const errors = {};
    
    if (!paymentData.cardNumber.replace(/\s/g, '')) errors['payment.cardNumber'] = 'Card number is required';
    if (!paymentData.expiryDate) errors['payment.expiryDate'] = 'Expiry date is required';
    if (!paymentData.cvv) errors['payment.cvv'] = 'CVV is required';
    if (!paymentData.cardName.trim()) errors['payment.cardName'] = 'Cardholder name is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && validateShipping()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePayment()) {
      setCurrentStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const orderData = {
        items: cartItems,
        total: cartSummary.total,
        shippingAddress: shippingData,
        paymentMethod: `**** **** **** ${paymentData.cardNumber.slice(-4)}`
      };
      
      addOrder(orderData);
      clearCart();
      setIsProcessing(false);
      setShowModal(true);
    }, 2000);
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/profile?tab=orders');
  };

  return (
    <div className="checkout-page py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">Checkout</h1>
            <p className="text-muted">Complete your purchase</p>
          </Col>
        </Row>

        {/* Progress Steps */}
        <Row className="mb-4">
          <Col>
            <div className="checkout-steps d-flex justify-content-center">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <div className="step-number">1</div>
                <div className="step-label">Shipping</div>
              </div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <div className="step-number">2</div>
                <div className="step-label">Payment</div>
              </div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                <div className="step-number">3</div>
                <div className="step-label">Review</div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary-custom text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-truck me-2"></i>
                    Shipping Information
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">First Name *</Form.Label>
                          <Form.Control
                            type="text"
                            value={shippingData.firstName}
                            onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                            isInvalid={!!formErrors['shipping.firstName']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['shipping.firstName']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">Last Name *</Form.Label>
                          <Form.Control
                            type="text"
                            value={shippingData.lastName}
                            onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                            isInvalid={!!formErrors['shipping.lastName']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['shipping.lastName']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">Email *</Form.Label>
                          <Form.Control
                            type="email"
                            value={shippingData.email}
                            onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                            isInvalid={!!formErrors['shipping.email']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['shipping.email']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">Phone *</Form.Label>
                          <Form.Control
                            type="tel"
                            value={shippingData.phone}
                            onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                            isInvalid={!!formErrors['shipping.phone']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['shipping.phone']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Address *</Form.Label>
                      <Form.Control
                        type="text"
                        value={shippingData.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        isInvalid={!!formErrors['shipping.address']}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors['shipping.address']}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">City *</Form.Label>
                          <Form.Control
                            type="text"
                            value={shippingData.city}
                            onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                            isInvalid={!!formErrors['shipping.city']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['shipping.city']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">State *</Form.Label>
                          <Form.Control
                            type="text"
                            value={shippingData.state}
                            onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                            isInvalid={!!formErrors['shipping.state']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['shipping.state']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={4}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">ZIP Code *</Form.Label>
                          <Form.Control
                            type="text"
                            value={shippingData.zipCode}
                            onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
                            isInvalid={!!formErrors['shipping.zipCode']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['shipping.zipCode']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-flex justify-content-end">
                      <Button variant="primary" onClick={handleNextStep}>
                        Continue to Payment
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary-custom text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-credit-card me-2"></i>
                    Payment Information
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Card Number *</Form.Label>
                      <Form.Control
                        type="text"
                        value={paymentData.cardNumber}
                        onChange={(e) => handleInputChange('payment', 'cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        isInvalid={!!formErrors['payment.cardNumber']}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors['payment.cardNumber']}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">Expiry Date *</Form.Label>
                          <Form.Control
                            type="text"
                            value={paymentData.expiryDate}
                            onChange={(e) => handleInputChange('payment', 'expiryDate', formatExpiryDate(e.target.value))}
                            placeholder="MM/YY"
                            maxLength="5"
                            isInvalid={!!formErrors['payment.expiryDate']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['payment.expiryDate']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="fw-bold">CVV *</Form.Label>
                          <Form.Control
                            type="text"
                            value={paymentData.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value.replace(/\D/g, ''))}
                            placeholder="123"
                            maxLength="4"
                            isInvalid={!!formErrors['payment.cvv']}
                          />
                          <Form.Control.Feedback type="invalid">
                            {formErrors['payment.cvv']}
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold">Cardholder Name *</Form.Label>
                      <Form.Control
                        type="text"
                        value={paymentData.cardName}
                        onChange={(e) => handleInputChange('payment', 'cardName', e.target.value)}
                        placeholder="Name as it appears on card"
                        isInvalid={!!formErrors['payment.cardName']}
                      />
                      <Form.Control.Feedback type="invalid">
                        {formErrors['payment.cardName']}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <div className="d-flex justify-content-between">
                      <Button variant="outline-secondary" onClick={() => setCurrentStep(1)}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Shipping
                      </Button>
                      <Button variant="primary" onClick={handleNextStep}>
                        Review Order
                        <i className="bi bi-arrow-right ms-2"></i>
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card className="shadow-sm mb-4">
                <Card.Header className="bg-primary-custom text-white">
                  <h5 className="mb-0">
                    <i className="bi bi-check-circle me-2"></i>
                    Review Your Order
                  </h5>
                </Card.Header>
                <Card.Body className="p-4">
                  <div className="order-review">
                    <h6 className="fw-bold mb-3">Shipping Address</h6>
                    <p className="mb-3">
                      {shippingData.firstName} {shippingData.lastName}<br />
                      {shippingData.address}<br />
                      {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                      {shippingData.phone}
                    </p>

                    <h6 className="fw-bold mb-3">Payment Method</h6>
                    <p className="mb-3">
                      **** **** **** {paymentData.cardNumber.slice(-4)}<br />
                      {paymentData.cardName}
                    </p>

                    <div className="d-flex justify-content-between">
                      <Button variant="outline-secondary" onClick={() => setCurrentStep(2)}>
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Payment
                      </Button>
                      <Button 
                        variant="success" 
                        onClick={handlePlaceOrder}
                        disabled={isProcessing}
                        className="d-flex align-items-center"
                      >
                        {isProcessing ? (
                          <>
                            <div className="spinner-border spinner-border-sm me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            Processing...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle me-2"></i>
                            Place Order
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>

          {/* Order Summary */}
          <Col lg={4}>
            <Card className="shadow-sm sticky-top" style={{ top: '100px' }}>
              <Card.Header className="bg-light">
                <h5 className="mb-0">Order Summary</h5>
              </Card.Header>
              <Card.Body>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                      className="rounded me-3"
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb-1 small">{item.title.substring(0, 30)}...</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <div className="text-end">
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                ))}
                
                <hr />
                
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartSummary.subtotal)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>{cartSummary.shipping === 0 ? 'FREE' : formatPrice(cartSummary.shipping)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tax</span>
                  <span>{formatPrice(cartSummary.tax)}</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <strong>Total</strong>
                  <strong className="text-primary-custom">{formatPrice(cartSummary.total)}</strong>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Success Modal */}
        <Modal show={showModal} onHide={handleModalClose} centered>
          <Modal.Body className="text-center p-5">
            <i className="bi bi-check-circle-fill text-success display-1 mb-3"></i>
            <h3 className="fw-bold mb-3">Order Placed Successfully!</h3>
            <p className="text-muted mb-4">
              Thank you for your purchase. You will receive an email confirmation shortly.
            </p>
            <Button variant="primary" onClick={handleModalClose}>
              View Order History
            </Button>
          </Modal.Body>
        </Modal>
      </Container>

      <style jsx>{`
        .checkout-steps {
          display: flex;
          align-items: center;
          gap: 2rem;
        }
        
        .step {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }
        
        .step:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 15px;
          left: 100%;
          width: 2rem;
          height: 2px;
          background-color: #e2e8f0;
        }
        
        .step.active:not(:last-child)::after {
          background-color: var(--primary-color);
        }
        
        .step-number {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background-color: #e2e8f0;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        
        .step.active .step-number {
          background-color: var(--primary-color);
          color: white;
        }
        
        .step-label {
          font-size: 0.875rem;
          color: #64748b;
        }
        
        .step.active .step-label {
          color: var(--primary-color);
          font-weight: 600;
        }
      `}</style>
    </div>
  );
};

export default Checkout;

