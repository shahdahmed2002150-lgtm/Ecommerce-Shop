import React, { createContext, useReducer, useEffect } from 'react';
import { usersAPI } from '../services/api';

// Initial state
const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  orders: [],
};

// Action types
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  REGISTER_START: 'REGISTER_START',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  ADD_ORDER: 'ADD_ORDER',
  SET_ORDERS: 'SET_ORDERS',
};

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
    case AUTH_ACTIONS.REGISTER_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGIN_FAILURE:
    case AUTH_ACTIONS.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
        orders: [],
      };

    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case AUTH_ACTIONS.ADD_ORDER:
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case AUTH_ACTIONS.SET_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };

    default:
      return state;
  }
};

// Create context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('shophub_user');
    const savedOrders = localStorage.getItem('shophub_orders');
    
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userData });
      } catch (error) {
        console.error('Error loading user from localStorage:', error);
        localStorage.removeItem('shophub_user');
      }
    }

    if (savedOrders) {
      try {
        const ordersData = JSON.parse(savedOrders);
        dispatch({ type: AUTH_ACTIONS.SET_ORDERS, payload: ordersData });
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
        localStorage.removeItem('shophub_orders');
      }
    }
  }, []);

  // Save user to localStorage whenever user changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('shophub_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('shophub_user');
    }
  }, [state.user]);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (state.orders.length > 0) {
      localStorage.setItem('shophub_orders', JSON.stringify(state.orders));
    }
  }, [state.orders]);

  // Login function
  const login = async (credentials) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      // Since FakeStore API login doesn't return user details, we'll simulate it
      const response = await usersAPI.login(credentials);
      
      if (response.token) {
        // Simulate user data (in real app, you'd get this from the API)
        const userData = {
          id: 1,
          name: 'John Doe',
          email: credentials.username,
          phone: '(555) 123-4567',
          address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipcode: '12345',
            country: 'USA'
          },
          token: response.token,
          joinDate: new Date().toISOString(),
        };
        
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: userData });
        return { success: true, user: userData };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const errorMessage = error.message || 'Login failed. Please try again.';
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Register function
  const register = async (userData) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER_START });
    
    try {
      // Simulate registration (FakeStore API doesn't have real registration)
      const response = await usersAPI.register(userData);
      
      if (response.id) {
        const newUser = {
          id: response.id,
          name: `${userData.name.firstname} ${userData.name.lastname}`,
          email: userData.email,
          phone: userData.phone || '(555) 123-4567',
          address: userData.address || {
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipcode: '12345',
            country: 'USA'
          },
          token: 'fake-jwt-token',
          joinDate: new Date().toISOString(),
        };
        
        dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: newUser });
        return { success: true, user: newUser };
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      const errorMessage = error.message || 'Registration failed. Please try again.';
      dispatch({ type: AUTH_ACTIONS.REGISTER_FAILURE, payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    localStorage.removeItem('shophub_user');
    localStorage.removeItem('shophub_orders');
  };

  // Add order function
  const addOrder = (orderData) => {
    const order = {
      id: Date.now().toString(),
      userId: state.user?.id,
      items: orderData.items,
      total: orderData.total,
      status: 'pending',
      date: new Date().toISOString(),
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
    };
    
    dispatch({ type: AUTH_ACTIONS.ADD_ORDER, payload: order });
    return order;
  };

  // Update user profile
  const updateProfile = (updatedData) => {
    const updatedUser = { ...state.user, ...updatedData };
    dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: updatedUser });
    return updatedUser;
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  // Set loading
  const setLoading = (loading) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: loading });
  };

  const value = {
    // State
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    isLoading: state.isLoading,
    error: state.error,
    orders: state.orders,
    
    // Actions
    login,
    register,
    logout,
    addOrder,
    updateProfile,
    clearError,
    setLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

