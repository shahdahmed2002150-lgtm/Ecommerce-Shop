import React, { useContext } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const truncateTitle = (title, maxLength = 50) => {
    return title.length > maxLength ? title.substring(0, maxLength) + '...' : title;
  };

  return (
    <Card className="h-100 product-card fade-in">
      <div className="position-relative overflow-hidden">
        <Card.Img 
          variant="top" 
          src={product.image} 
          alt={product.title}
          style={{ 
            height: '250px', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />
        <div className="position-absolute top-0 end-0 m-2">
          <Badge bg="primary" className="px-2 py-1">
            {product.category}
          </Badge>
        </div>
        {product.rating && (
          <div className="position-absolute bottom-0 start-0 m-2">
            <Badge bg="warning" text="dark" className="px-2 py-1">
              <i className="bi bi-star-fill me-1"></i>
              {product.rating.rate} ({product.rating.count})
            </Badge>
          </div>
        )}
      </div>
      
      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">
          {truncateTitle(product.title)}
        </Card.Title>
        
        <Card.Text className="text-muted small flex-grow-1">
          {product.description.substring(0, 100)}...
        </Card.Text>
        
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="text-primary-custom mb-0 fw-bold">
              {formatPrice(product.price)}
            </h5>
          </div>
          
          <div className="d-grid gap-2">
            <Link 
              to={`/product/${product.id}`} 
              className="btn btn-outline-primary btn-sm"
            >
              <i className="bi bi-eye me-1"></i>
              View Details
            </Link>
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleAddToCart}
              className="d-flex align-items-center justify-content-center"
            >
              <i className="bi bi-cart-plus me-1"></i>
              Add to Cart
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;

