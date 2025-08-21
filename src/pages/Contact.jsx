import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: 'bi-geo-alt',
      title: 'Address',
      details: ['123 Commerce Street', 'Business District', 'New York, NY 10001']
    },
    {
      icon: 'bi-telephone',
      title: 'Phone',
      details: ['Customer Service: (555) 123-4567', 'Business Hours: Mon-Fri 9AM-6PM']
    },
    {
      icon: 'bi-envelope',
      title: 'Email',
      details: ['support@shophub.com', 'business@shophub.com']
    },
    {
      icon: 'bi-clock',
      title: 'Business Hours',
      details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM', 'Sunday: Closed']
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      errors.subject = 'Subject must be at least 5 characters';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setShowAlert(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide alert after 5 seconds
      setTimeout(() => setShowAlert(false), 5000);
    }, 1000);
  };

  return (
    <div className="contact-page py-5">
      <Container>
        {/* Header */}
        <Row className="text-center mb-5">
          <Col>
            <h1 className="fw-bold mb-3">Contact Us</h1>
            <p className="text-muted lead">
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </Col>
        </Row>

        {/* Success Alert */}
        {showAlert && (
          <Alert variant="success" className="fade-in mb-4">
            <i className="bi bi-check-circle me-2"></i>
            Thank you for your message! We'll get back to you within 24 hours.
          </Alert>
        )}

        <Row className="g-5">
          {/* Contact Form */}
          <Col lg={8}>
            <Card className="shadow-sm border-0">
              <Card.Header className="bg-primary-custom text-white">
                <h4 className="mb-0">
                  <i className="bi bi-envelope me-2"></i>
                  Send us a Message
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <i className="bi bi-person me-2"></i>
                          Full Name *
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          isInvalid={!!formErrors.name}
                          disabled={isSubmitting}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">
                          <i className="bi bi-envelope me-2"></i>
                          Email Address *
                        </Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email"
                          isInvalid={!!formErrors.email}
                          disabled={isSubmitting}
                        />
                        <Form.Control.Feedback type="invalid">
                          {formErrors.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label className="fw-bold">
                      <i className="bi bi-chat-text me-2"></i>
                      Subject *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What is this regarding?"
                      isInvalid={!!formErrors.subject}
                      disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.subject}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-bold">
                      <i className="bi bi-chat-dots me-2"></i>
                      Message *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your inquiry..."
                      isInvalid={!!formErrors.message}
                      disabled={isSubmitting}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.message}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      size="lg"
                      disabled={isSubmitting}
                      className="d-flex align-items-center justify-content-center"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="spinner-border spinner-border-sm me-2" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send me-2"></i>
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* Contact Information */}
          <Col lg={4}>
            <div className="contact-info">
              <h4 className="fw-bold mb-4">Get in Touch</h4>
              
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-0 bg-light mb-3 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-start">
                      <div className="contact-icon me-3">
                        <i className={`bi ${info.icon} text-primary-custom fs-4`}></i>
                      </div>
                      <div>
                        <h6 className="fw-bold mb-2">{info.title}</h6>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted small mb-1">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}

              {/* Social Media */}
              <Card className="border-0 bg-primary-custom text-white">
                <Card.Body className="p-3 text-center">
                  <h6 className="fw-bold mb-3">Follow Us</h6>
                  <div className="d-flex justify-content-center gap-3">
                    <a href="#" className="text-white text-decoration-none">
                      <i className="bi bi-facebook fs-4"></i>
                    </a>
                    <a href="#" className="text-white text-decoration-none">
                      <i className="bi bi-twitter fs-4"></i>
                    </a>
                    <a href="#" className="text-white text-decoration-none">
                      <i className="bi bi-instagram fs-4"></i>
                    </a>
                    <a href="#" className="text-white text-decoration-none">
                      <i className="bi bi-linkedin fs-4"></i>
                    </a>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="mt-5">
          <Col>
            <Card className="border-0 bg-light">
              <Card.Body className="p-5">
                <h3 className="fw-bold text-center mb-4">Frequently Asked Questions</h3>
                <Row>
                  <Col md={6}>
                    <div className="faq-item mb-4">
                      <h6 className="fw-bold mb-2">
                        <i className="bi bi-question-circle me-2 text-primary-custom"></i>
                        What are your shipping options?
                      </h6>
                      <p className="text-muted small">
                        We offer free standard shipping on orders over $50. Express shipping is available for an additional fee.
                      </p>
                    </div>
                    
                    <div className="faq-item mb-4">
                      <h6 className="fw-bold mb-2">
                        <i className="bi bi-question-circle me-2 text-primary-custom"></i>
                        How can I track my order?
                      </h6>
                      <p className="text-muted small">
                        Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account.
                      </p>
                    </div>
                  </Col>
                  
                  <Col md={6}>
                    <div className="faq-item mb-4">
                      <h6 className="fw-bold mb-2">
                        <i className="bi bi-question-circle me-2 text-primary-custom"></i>
                        What is your return policy?
                      </h6>
                      <p className="text-muted small">
                        We accept returns within 30 days of purchase. Items must be in original condition with tags attached.
                      </p>
                    </div>
                    
                    <div className="faq-item mb-4">
                      <h6 className="fw-bold mb-2">
                        <i className="bi bi-question-circle me-2 text-primary-custom"></i>
                        Do you offer customer support?
                      </h6>
                      <p className="text-muted small">
                        Yes! Our customer support team is available 24/7 via email, phone, or live chat to assist you.
                      </p>
                    </div>
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

export default Contact;

