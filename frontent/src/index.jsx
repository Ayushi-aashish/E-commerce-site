
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store.js';
import App from './App.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const container = document.getElementById('root');
const root = createRoot(container); // ✅ Correct API for React 18

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
       <App/>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
