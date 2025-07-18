import { useState } from 'react'
import {Container}from 'react-bootstrap'
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/Homescreen'
import ProductScreen from './screens/ProductScreen'



const App=() =>{
  

  return (
    <>
    <Header />
    <main className='py-3'>
    <Container>
      <Routes>
      <Route path='/' element={<HomeScreen />}  exact/>
      <Route path='/product/:id' element={<ProductScreen/>} />
  </Routes>
    </Container>
    </main>
  <Footer />      
    </>
  );
};

export default App
