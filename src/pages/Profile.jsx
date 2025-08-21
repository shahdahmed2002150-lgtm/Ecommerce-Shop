import React, { useContext, useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Tab, Tabs, Badge, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, updateProfile, orders, logout, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: {
      street: user?.address?.street || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      zipcode: user?.address?.zipcode || '',
      country: user?.address?.country || ''
    }
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSaveProfile = () => {
    updateProfile(formData);
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCancelEdit = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address
    });
    setIsEditing(false);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'processing': return 'info';
      case 'shipped': return 'primary';
      case 'delivered': return 'success';
      case 'cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div className="profile-page py-5">
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="fw-bold">My Account</h1>
            <p className="text-muted">Manage your profile and view your orders</p>
          </Col>
        </Row>

        {showAlert && (
          <Alert variant="success" className="fade-in mb-4">
            <i className="bi bi-check-circle me-2"></i>
            Profile updated successfully!
          </Alert>
        )}

        <Row>
          <Col lg={3} className="mb-4">
            {/* Profile Sidebar */}
            <Card className="shadow-sm">
              <Card.Body className="text-center">
                <div className="profile-avatar mb-3">
                  <i className="bi bi-person-circle display-1 text-primary-custom"></i>
                </div>
                <h5 className="fw-bold">{user.name}</h5>
                <p className="text-muted small">{user.email}</p>
                <Badge bg="success" className="mb-3">
                  <i className="bi bi-check-circle me-1"></i>
                  Verified
                </Badge>
                <div className="d-grid gap-2">
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => setActiveTab('profile')}
                  >
                    <i className="bi bi-person me-1"></i>
                    Profile
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => setActiveTab('orders')}
                  >
                    <i className="bi bi-bag me-1"></i>
                    Orders ({orders.length})
                  </Button>
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right me-1"></i>
                    Logout
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col lg={9}>
            <Tabs 
              activeKey={activeTab} 
              onSelect={(k) => setActiveTab(k)}
              className="mb-4"
            >
              {/* Profile Tab */}
              <Tab eventKey="profile" title={<><i className="bi bi-person me-2"></i>Profile Information</>}>
                <Card className="shadow-sm">
                  <Card.Header className="bg-white d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Personal Information</h5>
                    {!isEditing ? (
                      <Button 
                        variant="outline-primary" 
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <i className="bi bi-pencil me-1"></i>
                        Edit
                      </Button>
                    ) : (
                      <div>
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="me-2"
                          onClick={handleSaveProfile}
                        >
                          <i className="bi bi-check me-1"></i>
                          Save
                        </Button>
                        <Button 
                          variant="outline-secondary" 
                          size="sm"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Full Name</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Email Address</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Phone Number</Form.Label>
                            <Form.Control
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">Member Since</Form.Label>
                            <Form.Control
                              type="text"
                              value={formatDate(user.joinDate)}
                              disabled
                            />
                          </Form.Group>
                        </Col>
                      </Row>

                      <h6 className="fw-bold mt-4 mb-3">Address Information</h6>
                      
                      <Form.Group className="mb-3">
                        <Form.Label className="fw-bold">Street Address</Form.Label>
                        <Form.Control
                          type="text"
                          name="address.street"
                          value={formData.address.street}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                        />
                      </Form.Group>

                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">City</Form.Label>
                            <Form.Control
                              type="text"
                              name="address.city"
                              value={formData.address.city}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">State</Form.Label>
                            <Form.Control
                              type="text"
                              name="address.state"
                              value={formData.address.state}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={3}>
                          <Form.Group className="mb-3">
                            <Form.Label className="fw-bold">ZIP Code</Form.Label>
                            <Form.Control
                              type="text"
                              name="address.zipcode"
                              value={formData.address.zipcode}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab>

              {/* Orders Tab */}
              <Tab eventKey="orders" title={<><i className="bi bi-bag me-2"></i>Order History</>}>
                {orders.length === 0 ? (
                  <Card className="shadow-sm">
                    <Card.Body className="text-center py-5">
                      <i className="bi bi-bag-x display-1 text-muted mb-3"></i>
                      <h4>No Orders Yet</h4>
                      <p className="text-muted mb-4">You haven't placed any orders yet.</p>
                      <Button 
                        variant="primary"
                        onClick={() => navigate('/')}
                      >
                        Start Shopping
                      </Button>
                    </Card.Body>
                  </Card>
                ) : (
                  <div className="orders-list">
                    {orders.map((order) => (
                      <Card key={order.id} className="shadow-sm mb-3">
                        <Card.Header className="bg-white">
                          <Row className="align-items-center">
                            <Col md={3}>
                              <strong>Order #{order.id}</strong>
                            </Col>
                            <Col md={3}>
                              <small className="text-muted">
                                {formatDate(order.date)}
                              </small>
                            </Col>
                            <Col md={3}>
                              <Badge bg={getStatusBadgeVariant(order.status)}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </Badge>
                            </Col>
                            <Col md={3} className="text-end">
                              <strong>{formatPrice(order.total)}</strong>
                            </Col>
                          </Row>
                        </Card.Header>
                        <Card.Body>
                          <Row>
                            <Col md={8}>
                              <h6 className="fw-bold mb-2">Items ({order.items.length})</h6>
                              {order.items.slice(0, 3).map((item, index) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                  <img 
                                    src={item.image} 
                                    alt={item.title}
                                    style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                                    className="rounded me-3"
                                  />
                                  <div>
                                    <div className="fw-bold small">{item.title.substring(0, 30)}...</div>
                                    <small className="text-muted">Qty: {item.quantity}</small>
                                  </div>
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <small className="text-muted">
                                  +{order.items.length - 3} more items
                                </small>
                              )}
                            </Col>
                            <Col md={4}>
                              <div className="text-end">
                                <Button variant="outline-primary" size="sm" className="mb-2 w-100">
                                  <i className="bi bi-eye me-1"></i>
                                  View Details
                                </Button>
                                {order.status === 'delivered' && (
                                  <Button variant="outline-secondary" size="sm" className="w-100">
                                    <i className="bi bi-arrow-repeat me-1"></i>
                                    Reorder
                                  </Button>
                                )}
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                )}
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

