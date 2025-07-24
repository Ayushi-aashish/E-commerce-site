import { useState } from 'react'
import {Container}from 'react-bootstrap'
import { Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/Homescreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/cartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'


const App=() =>{
  

  return (
    <>
    <Header />
    <main className='py-3'>
    <Container>
      <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
          
      <Route path='/' element={<HomeScreen />}  exact/>
      <Route path='/product/:id' element={<ProductScreen/>} />
      <Route path='/cart/:id?' element={<CartScreen />} />
      
  </Routes>
    </Container>
    </main>
  <Footer />      
    </>
  );
};

export default App
