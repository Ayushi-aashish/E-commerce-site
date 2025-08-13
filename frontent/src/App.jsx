import React from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/Homescreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/cartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/orderScreen.js';
import UserListScreen from './screens/UserListScreen.js';
import UserEditScreen from './screens/UserEditScreen.js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';



const App = () => {
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || 'fallback-test';
console.log("PayPal Client ID:", clientId);

  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
           <Route
              path='/order/:id'
              element={
                clientId ? (
                  <PayPalScriptProvider options={{ 'client-id': clientId }}>
                    <OrderScreen />
                  </PayPalScriptProvider>
                ) : (
                  <p style={{ color: 'red' }}>❌ PayPal Client ID not found. Please check .env</p>
                )
              }
            />
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/admin/userlist' element={<UserListScreen/>} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

          </Routes>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
