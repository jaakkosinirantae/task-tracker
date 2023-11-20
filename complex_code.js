// Filename: complex_code.js
// Description: A complex JavaScript code that implements a virtual online shopping platform with multiple functionalities.

// Import necessary libraries
const moment = require('moment');
const axios = require('axios');
const fs = require('fs');

// Define global variables
let products = [];
let cart = [];
let users = [];

// Load products data from API
const loadProducts = async () => {
  try {
    const response = await axios.get('https://api.example.com/products');
    products = response.data;
  } catch (error) {
    console.error('Failed to load products:', error);
  }
};

// Load users data from file
const loadUsers = () => {
  try {
    const data = fs.readFileSync('users.json', 'utf-8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Failed to load users:', error);
  }
};

// Generate random user ID
const generateUserID = () => {
  const timestamp = moment().format('YYYYMMDDHHmmss');
  const randomDigits = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `USR_${timestamp}_${randomDigits}`;
};

// Register a new user
const registerUser = ({ name, email }) => {
  const newUser = {
    id: generateUserID(),
    name,
    email,
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  };
  users.push(newUser);
  saveUsers();
  return newUser;
};

// Add product to cart
const addToCart = (productId, quantity) => {
  const product = products.find((p) => p.id === productId);
  if (product) {
    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    };
    cart.push(item);
  } else {
    console.error('Product not found');
  }
};

// Checkout and place an order
const checkout = () => {
  if (cart.length === 0) {
    console.warn('Cart is empty');
    return;
  }
  
  const order = {
    id: `ORD_${moment().format('YYYYMMDDHHmmss')}`,
    items: [...cart],
    total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
  };
  
  console.log('Order placed:', order);
  cart = [];
};

// Save users data to file
const saveUsers = () => {
  fs.writeFileSync('users.json', JSON.stringify(users));
};

// Initialize the shopping platform
const initialize = async () => {
  await loadProducts();
  loadUsers();
  
  // Example usage of the functionalities
  const user1 = registerUser({ name: 'John Doe', email: 'john@example.com' });
  const user2 = registerUser({ name: 'Jane Smith', email: 'jane@example.com' });
  
  addToCart('PRODUCT_001', 2);
  addToCart('PRODUCT_002', 1);
  addToCart('PRODUCT_003', 3);
  
  checkout();
  
  console.log('Users:', users);
};

// Start the shopping platform
initialize();