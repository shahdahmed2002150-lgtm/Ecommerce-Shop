import React, { createContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  isLoading: false,
  error: null,
};

// Action types
const CART_ACTIONS = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CALCULATE_TOTALS: 'CALCULATE_TOTALS',
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART: {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== id),
        };
      }
      
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };

    case CART_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case CART_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case CART_ACTIONS.CALCULATE_TOTALS: {
      const { totalAmount, totalQuantity } = state.cartItems.reduce(
        (totals, item) => {
          totals.totalAmount += item.price * item.quantity;
          totals.totalQuantity += item.quantity;
          return totals;
        },
        { totalAmount: 0, totalQuantity: 0 }
      );

      return {
        ...state,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        totalQuantity,
      };
    }

    default:
      return state;
  }
};

// Create context
export const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shophub_cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        cartData.forEach(item => {
          dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: item });
        });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('shophub_cart', JSON.stringify(state.cartItems));
    dispatch({ type: CART_ACTIONS.CALCULATE_TOTALS });
  }, [state.cartItems]);

  // Action creators
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_TO_CART, payload: product });
    
    // Show success notification (you can replace this with a toast library)
    console.log(`${product.title} added to cart!`);
  };

  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_FROM_CART, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id: productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    localStorage.removeItem('shophub_cart');
  };

  const setLoading = (loading) => {
    dispatch({ type: CART_ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error });
  };

  // Get item quantity
  const getItemQuantity = (productId) => {
    const item = state.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Check if item is in cart
  const isInCart = (productId) => {
    return state.cartItems.some(item => item.id === productId);
  };

  // Get cart summary
  const getCartSummary = () => {
    return {
      itemsCount: state.totalQuantity,
      subtotal: state.totalAmount,
      tax: state.totalAmount * 0.08, // 8% tax
      shipping: state.totalAmount > 50 ? 0 : 9.99, // Free shipping over $50
      total: state.totalAmount + (state.totalAmount * 0.08) + (state.totalAmount > 50 ? 0 : 9.99),
    };
  };

  const value = {
    // State
    cartItems: state.cartItems,
    totalAmount: state.totalAmount,
    totalQuantity: state.totalQuantity,
    isLoading: state.isLoading,
    error: state.error,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    setLoading,
    setError,
    
    // Utilities
    getItemQuantity,
    isInCart,
    getCartSummary,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

