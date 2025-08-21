import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      bio: 'Passionate about creating exceptional shopping experiences.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      bio: 'Leading our technology vision and innovation.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      bio: 'Creating beautiful and intuitive user experiences.'
    },
    {
      name: 'David Kim',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      bio: 'Ensuring smooth operations and customer satisfaction.'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers' },
    { number: '10K+', label: 'Products Sold' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const values = [
    {
      icon: 'bi-heart',
      title: 'Customer First',
      description: 'We put our customers at the center of everything we do, ensuring their satisfaction is our top priority.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Quality Assurance',
      description: 'Every product is carefully selected and tested to meet our high standards of quality and reliability.'
    },
    {
      icon: 'bi-lightning',
      title: 'Innovation',
      description: 'We continuously innovate to provide the latest technology and trends to our customers.'
    },
    {
      icon: 'bi-people',
      title: 'Community',
      description: 'Building a strong community of satisfied customers who trust us for their shopping needs.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-50">
            <Col lg={6} className="hero-content">
              <h1 className="display-4 fw-bold mb-4 slide-in-left text-white">
                About ShopHub
              </h1>
              <p className="lead mb-4 slide-in-left text-white" style={{ animationDelay: '0.2s' }}>
                We're passionate about bringing you the best products at amazing prices. 
                Since our founding, we've been committed to providing exceptional customer 
                service and a seamless shopping experience.
              </p>
              <div className="slide-in-left" style={{ animationDelay: '0.4s' }}>
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="light" 
                  size="lg"
                  className="px-4 py-3 me-3"
                >
                  <i className="bi bi-envelope me-2"></i>
                  Contact Us
                </Button>
                <Button 
                  as={Link} 
                  to="/" 
                  variant="outline-light" 
                  size="lg"
                  className="px-4 py-3"
                >
                  Start Shopping
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center slide-in-right">
              <div className="hero-image-placeholder bg-white bg-opacity-10 rounded-custom p-5">
                <i className="bi bi-building display-1 text-white"></i>
                <h3 className="text-white mt-3">Our Story</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center">
            {stats.map((stat, index) => (
              <Col lg={3} md={6} key={index} className="mb-4 fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="border-0 bg-transparent">
                  <Card.Body>
                    <h2 className="display-4 fw-bold text-primary-custom mb-2">{stat.number}</h2>
                    <p className="text-muted mb-0">{stat.label}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Our Story Section */}
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <h2 className="fw-bold mb-4">Our Story</h2>
              <p className="mb-4">
                Founded in 2020, ShopHub started as a small team with a big vision: to create 
                the most user-friendly and reliable online shopping platform. We believed that 
                shopping online should be simple, secure, and enjoyable.
              </p>
              <p className="mb-4">
                What began as a passion project has grown into a thriving marketplace serving 
                thousands of customers worldwide. We've carefully curated our product selection 
                to include only the highest quality items from trusted brands and suppliers.
              </p>
              <p className="mb-4">
                Today, we continue to innovate and improve our platform, always keeping our 
                customers' needs at the forefront of everything we do. Our commitment to 
                excellence has earned us the trust and loyalty of our growing community.
              </p>
            </Col>
            <Col lg={6}>
              <div className="story-image-placeholder bg-primary-custom bg-opacity-10 rounded-custom p-5 text-center">
                <i className="bi bi-graph-up-arrow display-1 text-primary-custom"></i>
                <h4 className="mt-3 text-primary-custom">Growing Together</h4>
                <p className="text-muted">Building success through customer satisfaction</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Values Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Our Values</h2>
              <p className="text-muted">The principles that guide everything we do</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {values.map((value, index) => (
              <Col lg={3} md={6} key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <div className="value-icon mb-3">
                      <i className={`bi ${value.icon} display-4 text-primary-custom`}></i>
                    </div>
                    <h5 className="fw-bold mb-3">{value.title}</h5>
                    <p className="text-muted">{value.description}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Meet Our Team</h2>
              <p className="text-muted">The passionate people behind ShopHub</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            {teamMembers.map((member, index) => (
              <Col lg={3} md={6} key={index} className="fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <Card className="h-100 border-0 shadow-sm text-center">
                  <Card.Body className="p-4">
                    <div className="team-member-image mb-3">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="rounded-circle"
                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                      />
                    </div>
                    <h5 className="fw-bold mb-1">{member.name}</h5>
                    <p className="text-primary-custom fw-bold mb-3">{member.role}</p>
                    <p className="text-muted small">{member.bio}</p>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Mission Section */}
      <section className="py-5 bg-primary-custom text-white">
        <Container>
          <Row className="text-center">
            <Col lg={8} className="mx-auto">
              <h2 className="fw-bold mb-4">Our Mission</h2>
              <p className="lead mb-4">
                To provide an exceptional online shopping experience that combines quality products, 
                competitive prices, and outstanding customer service. We strive to make shopping 
                convenient, secure, and enjoyable for everyone.
              </p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center">
                <Button 
                  as={Link} 
                  to="/" 
                  variant="light" 
                  size="lg"
                  className="px-4"
                >
                  <i className="bi bi-shop me-2"></i>
                  Start Shopping
                </Button>
                <Button 
                  as={Link} 
                  to="/contact" 
                  variant="outline-light" 
                  size="lg"
                  className="px-4"
                >
                  <i className="bi bi-chat-dots me-2"></i>
                  Get in Touch
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold mb-3">Why Choose ShopHub?</h2>
              <p className="text-muted">Here's what makes us different</p>
            </Col>
          </Row>
          
          <Row className="g-4">
            <Col lg={4} md={6} className="fade-in">
              <div className="feature-item text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-truck display-4 text-primary-custom"></i>
                </div>
                <h5 className="fw-bold mb-3">Fast & Free Shipping</h5>
                <p className="text-muted">
                  Free shipping on orders over $50. Most orders arrive within 2-3 business days.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="feature-item text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-shield-check display-4 text-primary-custom"></i>
                </div>
                <h5 className="fw-bold mb-3">Secure Shopping</h5>
                <p className="text-muted">
                  Your personal and payment information is protected with industry-standard encryption.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="feature-item text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-arrow-clockwise display-4 text-primary-custom"></i>
                </div>
                <h5 className="fw-bold mb-3">Easy Returns</h5>
                <p className="text-muted">
                  Not satisfied? Return any item within 30 days for a full refund, no questions asked.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="feature-item text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-headset display-4 text-primary-custom"></i>
                </div>
                <h5 className="fw-bold mb-3">24/7 Support</h5>
                <p className="text-muted">
                  Our customer support team is available around the clock to help with any questions.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="feature-item text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-star display-4 text-primary-custom"></i>
                </div>
                <h5 className="fw-bold mb-3">Quality Products</h5>
                <p className="text-muted">
                  We carefully curate our selection to include only high-quality products from trusted brands.
                </p>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="feature-item text-center p-4">
                <div className="feature-icon mb-3">
                  <i className="bi bi-tags display-4 text-primary-custom"></i>
                </div>
                <h5 className="fw-bold mb-3">Best Prices</h5>
                <p className="text-muted">
                  We work hard to offer competitive prices and regular promotions to save you money.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;

