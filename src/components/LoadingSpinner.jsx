import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ size = 'md', text = 'Loading...', center = true }) => {
  const spinnerSize = {
    sm: { width: '1rem', height: '1rem' },
    md: { width: '2rem', height: '2rem' },
    lg: { width: '3rem', height: '3rem' }
  };

  const containerClass = center 
    ? 'd-flex justify-content-center align-items-center flex-column' 
    : 'd-flex align-items-center';

  return (
    <div className={containerClass} style={{ minHeight: center ? '200px' : 'auto' }}>
      <Spinner 
        animation="border" 
        variant="primary" 
        style={spinnerSize[size]}
        className="mb-2"
      />
      {text && (
        <p className="text-muted mb-0">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;

