import React, { useLayoutEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Products, Navbar, Checkout } from './components'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { commerce } from './lib/commerce';
import Cart from './components/Cart/Cart';

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    const carts = await commerce.cart.retrieve();
    setCart(carts);
  };

  const handleAddToCart = async (product_id, quantity) => {
    const cart = await commerce.cart.add(product_id, quantity);
    setCart(cart);
  };

  const handleUpdateCartQty = async (product_id, quantity) => {
    const cart = await commerce.cart.update(product_id, { quantity });
    setCart(cart);
  };

  const handleRemoveFromCart = async (product_id) => {
    const cart = await commerce.cart.remove(product_id);
    setCart(cart);
  };

  const handleEmptyCart = async () => {
    const cart = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const inComingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(inComingOrder);
      refreshCart();
    } catch (error) {
      console.log(error);
      setErrorMessage(error.data.error.message);
    }
  }; 

  useLayoutEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);
  return (
    <BrowserRouter>
      <Navbar total_items={cart.total_items} />
      <Routes>
        <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart} />} />
        <Route 
          path='cart' 
          element={<Cart cart={cart} handleUpdateCartQty={handleUpdateCartQty} handleRemoveFromCart={handleRemoveFromCart} handleEmptyCart={handleEmptyCart} />} 
        />
        <Route path='/checkout' element={<Checkout order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} cart={cart} />} />
      </Routes>  
    </BrowserRouter>
  );
};

export default App;