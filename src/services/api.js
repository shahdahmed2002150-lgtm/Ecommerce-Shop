const API_BASE_URL = 'https://fakestoreapi.com';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

// Products API
export const productsAPI = {
  // Get all products
  getAll: () => apiRequest('/products'),
  
  // Get single product by ID
  getById: (id) => apiRequest(`/products/${id}`),
  
  // Get products by category
  getByCategory: (category) => apiRequest(`/products/category/${category}`),
  
  // Get all categories
  getCategories: () => apiRequest('/products/categories'),
  
  // Get limited products (for pagination)
  getLimited: (limit = 10) => apiRequest(`/products?limit=${limit}`),
  
  // Sort products
  getSorted: (sort = 'asc') => apiRequest(`/products?sort=${sort}`),
};

// Users API (for authentication simulation)
export const usersAPI = {
  // Get all users
  getAll: () => apiRequest('/users'),
  
  // Get single user
  getById: (id) => apiRequest(`/users/${id}`),
  
  // Login simulation
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  // Add new user (registration simulation)
  register: (userData) => apiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
};

// Carts API
export const cartsAPI = {
  // Get all carts
  getAll: () => apiRequest('/carts'),
  
  // Get single cart
  getById: (id) => apiRequest(`/carts/${id}`),
  
  // Get user carts
  getUserCarts: (userId) => apiRequest(`/carts/user/${userId}`),
  
  // Add new cart
  add: (cartData) => apiRequest('/carts', {
    method: 'POST',
    body: JSON.stringify(cartData),
  }),
  
  // Update cart
  update: (id, cartData) => apiRequest(`/carts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(cartData),
  }),
  
  // Delete cart
  delete: (id) => apiRequest(`/carts/${id}`, {
    method: 'DELETE',
  }),
};

// Utility functions
export const utils = {
  // Format price to currency
  formatPrice: (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  },
  
  // Capitalize first letter
  capitalize: (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  
  // Truncate text
  truncateText: (text, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  },
  
  // Generate random ID
  generateId: () => {
    return Math.random().toString(36).substr(2, 9);
  },
  
  // Debounce function for search
  debounce: (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
};

export default {
  products: productsAPI,
  users: usersAPI,
  carts: cartsAPI,
  utils,
};

